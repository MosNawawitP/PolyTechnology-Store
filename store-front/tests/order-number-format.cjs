const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const sandbox = {
  DCLogic: class {
    constructor() { this.props = {}; }
    setState(update) { Object.assign(this.state, typeof update === 'function' ? update(this.state) : update); }
  },
  window: { scrollTo() {}, matchMedia: () => ({ matches: false }) },
  document: { getElementById: () => null },
  localStorage: { getItem: () => null, setItem() {} },
  setTimeout: fn => { fn(); return 0; }, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  Date, Math, console,
};
vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);

const app = new sandbox.TestComponent();
const today = new Date();
const datePart = String(today.getFullYear()).slice(-2)
  + String(today.getMonth() + 1).padStart(2, '0')
  + String(today.getDate()).padStart(2, '0');

const productOrderId = app.nextOrderId('goods');
const serviceOrderId = app.nextOrderId('service');

assert.match(productOrderId, new RegExp('^P' + datePart + '[A-Z]{5}$'), 'Product orders use P, YYMMDD, and five random letters');
assert.match(serviceOrderId, new RegExp('^S' + datePart + '[A-Z]{5}$'), 'Service orders use S, YYMMDD, and five random letters');
app.state.orders = [{ id: productOrderId, kind: 'goods' }];
assert.notEqual(productOrderId, app.nextOrderId('goods'), 'A newly generated product order number does not reuse an existing number');

const seed = app.seed();
seed.orders.forEach(order => {
  const prefix = order.kind === 'service' ? 'S' : 'P';
  assert.match(order.id, new RegExp('^' + prefix + '\\d{6}[A-Z]{5}$'), 'Seed order ' + order.id + ' uses its type-specific format');
});
seed.quotes.filter(quote => quote.orderId).forEach(quote => {
  assert.ok(seed.orders.some(order => order.id === quote.orderId), 'Quote ' + quote.id + ' keeps a valid order reference');
});
seed.leads.filter(lead => lead.orderId).forEach(lead => {
  assert.ok(seed.orders.some(order => order.id === lead.orderId), 'Lead ' + lead.id + ' keeps a valid service order reference');
});

const migrated = app.migrateOrderNumbers({
  seeded: true,
  route: { p: 'account', oid: 'SO-2026-004812' },
  lastOrder: 'SO-2026-004812',
  orders: [
    { id: 'SO-2026-004812', kind: 'goods', date: '2026-09-20' },
    { id: 'SO-2026-009999', kind: 'service', date: '2026-10-14' },
  ],
  quotes: [{ id: 'QT-1', orderId: 'SO-2026-009999', history: [{ text: ['คำสั่งงาน SO-2026-009999', 'Service order SO-2026-009999'] }] }],
  leads: [{ id: 'LD-1', orderId: 'SO-2026-009999' }],
});
assert.equal(migrated.orders[0].id, 'P260920RTKLP', 'A persisted seeded product order maps to the current seed number');
assert.match(migrated.orders[1].id, /^S261014[A-Z]{5}$/, 'A persisted service order keeps its original date in the new format');
assert.equal(migrated.route.oid, migrated.orders[0].id, 'The selected persisted order reference is migrated');
assert.equal(migrated.lastOrder, migrated.orders[0].id, 'The last-order reference is migrated');
assert.equal(migrated.quotes[0].orderId, migrated.orders[1].id, 'A quote keeps its migrated order reference');
assert.equal(migrated.leads[0].orderId, migrated.orders[1].id, 'A lead keeps its migrated order reference');
assert.match(migrated.quotes[0].history[0].text[1], new RegExp(migrated.orders[1].id + '$'), 'Order numbers embedded in history text are migrated');

assert.doesNotMatch(JSON.stringify(seed), /SO-2026-/, 'The current storefront seed no longer contains legacy order numbers');

console.log('PASS: product and service order numbers use the new type and date format');
