const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const home = fs.readFileSync(path.join(root, 'Home.dc.html'), 'utf8');
const contact = fs.readFileSync(path.join(root, 'Contact.dc.html'), 'utf8');
const script = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const sandbox = {
  DCLogic: class {
    constructor() { this.props = {}; }
    setState(update) { Object.assign(this.state, typeof update === 'function' ? update(this.state) : update); }
  },
  window: { scrollTo() {}, matchMedia: () => ({ matches: false }) },
  document: { getElementById: () => null },
  localStorage: { getItem: () => null, setItem() {} },
  setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  Date, console,
};

vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);
const app = new sandbox.TestComponent();
app.say = () => {};

for (const lang of ['th', 'en']) {
  app.state.lang = lang;
  app.state.acct = 'gradeA';
  app.state.route = { p: 'home' };
  app.state.tab = 'profile';
  const values = app.renderAllVals();

  assert.equal(values.showServices, false, 'The storefront service section stays hidden');
  assert.ok(values.navItems.every(item => item.label !== app.tx(app.L.services)), 'The main menu excludes Services');
  assert.ok(values.footerSupport.every(item => item.label !== app.tx(app.L.services)), 'The footer excludes Services');
  assert.equal(values.serviceCards.length, 0, 'No service cards are exposed to templates');
  assert.equal(values.homeShortcuts.length, 4, 'The shortcut bar stays full after services are hidden');
  assert.deepEqual(
    Array.from(values.homeShortcuts, item => item.title),
    lang === 'th' ? ['ซื้อสินค้าออนไลน์', 'ขอใบเสนอราคา', 'โปรโมชั่น', 'ติดต่อเรา'] : ['Shop online', 'Request a quote', 'Promotions', 'Contact us'],
    'Promotions and Contact us replace the hidden service shortcuts',
  );
  assert.ok(values.homeShortcuts.every(item => !/consult|service|ปรึกษา|บริการ/i.test(item.title)), 'Home shortcuts exclude service actions');
  assert.ok(values.circleCats.every(item => !/service|บริการ/i.test(item.label)), 'Category links exclude Services');
  assert.ok(values.promos.every(item => !item.isService), 'Service promotions are hidden');
  assert.ok(values.productList.every(item => !['p13', 'p14', 'p16'].includes(item.id)), 'Service-only catalogue entries are hidden');
  assert.ok(values.acctTabs.every(item => item.k !== 'leads'), 'The account menu excludes consultation requests');
  assert.ok(values.recentOrders.every(item => item.kindLabel !== (lang === 'en' ? 'Service work' : 'งานบริการ')), 'Service orders are hidden from the account dashboard');
  assert.ok(values.contactRows.every(row => !/service@|ฝ่ายบริการ/i.test(row.k + ' ' + row.v)), 'Service contact details are hidden');
}

assert.match(home, /<sc-if value="\{\{ showServices \}\}">[\s\S]*pt-services/, 'The Home service section is guarded by the visibility flag');
assert.match(contact, /<sc-if value="\{\{ showServices \}\}">[\s\S]*goServices/, 'The Contact service action is guarded by the visibility flag');

app.state.route = { p: 'home' };
app.go('services', { svc: 's1' });
assert.equal(app.state.route.p, 'home', 'Direct service navigation returns to Home');

app.state.lang = 'th';
let shortcuts = app.renderAllVals().homeShortcuts;
shortcuts.find(item => item.title === 'โปรโมชั่น').go();
assert.equal(app.state.route.p, 'promos', 'The Promotions shortcut opens the promotions page');
app.go('home');
shortcuts = app.renderAllVals().homeShortcuts;
shortcuts.find(item => item.title === 'ติดต่อเรา').go();
assert.equal(app.state.route.p, 'contact', 'The Contact us shortcut opens the contact page');

app.go('pdp', { id: 'p13' });
assert.equal(app.state.route.p, 'products', 'Direct service-product navigation returns to Products');

app.state.cart = [{ id: 'p5', q: 1 }, { id: 'p16', q: 1 }];
assert.deepEqual(Array.from(app.cartRows(), row => row.p.id), ['p5'], 'Persisted service products stay hidden from the cart');
assert.equal(app.renderAllVals().cartCount, 1, 'Hidden service products are excluded from the cart badge');

app.state.notifs = [
  { id: 'service', kind: 'quote', date: '2026-10-19', text: ['ใบเสนอราคางานบริการพร้อมแล้ว', 'Service quotation is ready'] },
  { id: 'product', kind: 'order', date: '2026-10-19', text: ['คำสั่งซื้อพร้อมจัดส่ง', 'Product order is ready'] },
];
app.state.lang = 'th';
assert.deepEqual(Array.from(app.renderAllVals().notifs, item => item.text), ['คำสั่งซื้อพร้อมจัดส่ง'], 'Persisted service notifications stay hidden');

console.log('PASS: service menus, cards, offers, catalogue entries, account records and routes stay hidden');
