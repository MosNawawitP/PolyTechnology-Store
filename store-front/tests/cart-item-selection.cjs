const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const cartTemplate = fs.readFileSync(path.join(root, 'Cart.dc.html'), 'utf8');
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
  Date, console,
};
vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);

const app = new sandbox.TestComponent();
app.state.acct = 'partner';
app.state.route = { p: 'cart' };
app.state.ck.quoteRef = null;
app.state.cart = [{ id: 'p5', q: 1 }, { id: 'p6', q: 2, selected: false }];

const initial = app.totals();
assert.equal(initial.rows.length, 1, 'Only selected cart lines are included in totals');
assert.equal(initial.rows[0].p.id, 'p5', 'Legacy cart lines default to selected');
assert.equal(initial.sub, app.price(app.prod('p5')), 'Subtotal excludes an unselected cart line');
assert.equal(app.renderAllVals().cartRows.length, 2, 'Unselected lines remain visible in the cart');

app.toggleCartSelection('p6', true);
assert.equal(app.totals().rows.length, 2, 'Selecting a line adds it to checkout totals');
app.toggleCartSelection('p5', false);
assert.equal(app.totals().rows[0].p.id, 'p6', 'Clearing a checkbox removes that line from checkout totals');

app.state.cart = [{ id: 'p5', q: 1, selected: false }];
app.toCheckout();
assert.equal(app.state.route.p, 'cart', 'Checkout is blocked when no cart line is selected');

app.state.cart = [{ id: 'p5', q: 1, selected: true }, { id: 'p6', q: 2, selected: false }];
app.state.ck = { ...app.state.ck, quoteRef: null, mode: 'pickup', pay: 'credit' };
app.state.form = {};
app.api = (key, delay, failureRate, done) => done();
app.confirmOrder();
assert.equal(app.state.orders[0].items.length, 1, 'The order contains only checked cart lines');
assert.equal(app.state.orders[0].items[0].id, 'p5', 'The checked line is sent to the order');
assert.equal(app.state.cart.length, 1, 'Unchecked cart lines remain after placing the order');
assert.equal(app.state.cart[0].id, 'p6', 'The unchecked line is retained in the cart');

assert.doesNotMatch(cartTemplate, /savedRows|lblSaveLater|lblSaved|lblRestore/, 'Saved-for-later controls are removed');
assert.match(cartTemplate, /type="checkbox"/, 'Each cart line has a selection checkbox');
assert.ok(
  cartTemplate.indexOf('type="checkbox"') < cartTemplate.indexOf('{{ r.photo }}'),
  'The cart checkbox is the leftmost control before the product image'
);
assert.match(cartTemplate, /aria-label="\{\{ lblRemove \}\}"/, 'The trash button has an accessible remove label');
const removeButton = cartTemplate.match(/<button[^>]*onClick="\{\{ r\.remove \}\}"[\s\S]*?<\/button>/)[0];
assert.match(removeButton, /<svg/, 'The remove action uses a trash icon');
assert.doesNotMatch(removeButton, />\s*\{\{ lblRemove \}\}\s*<\/button>/, 'The cart remove action does not show text');

app.state.lang = 'th';
app.state.cart = [{ id: 'p5', q: 1, ad: ['program'] }];
const addOnHeader = app.rowAdVals(app.cartRows()[0]).adHeadLabel;
assert.match(addOnHeader, /\(1 รายการ\)$/, 'The add-on header counts selected services, not available services');
app.toggleCartAd('p5', 'program');
assert.match(app.rowAdVals(app.cartRows()[0]).adHeadLabel, /\(0 รายการ\)$/, 'The add-on count updates when a service is cleared');

console.log('PASS: cart checkboxes control totals and saved-for-later UI is removed');
