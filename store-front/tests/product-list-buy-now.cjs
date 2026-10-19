const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const productsTemplate = fs.readFileSync(path.join(root, 'Products.dc.html'), 'utf8');
const script = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const timers = [];
const sandbox = {
  DCLogic: class {
    constructor() { this.props = {}; }
    setState(update) { Object.assign(this.state, typeof update === 'function' ? update(this.state) : update); }
  },
  window: { scrollTo() {}, matchMedia: () => ({ matches: false }) },
  document: { getElementById: () => null },
  localStorage: { getItem: () => null, setItem() {} },
  setTimeout: callback => { timers.push(callback); return timers.length; },
  clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  Date, console,
};
vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);

assert.equal(
  (productsTemplate.match(/onClick="\{\{ p\.buyNow \}\}"/g) || []).length,
  2,
  'Grid and list product cards expose the buy-now action'
);
assert.equal(
  (productsTemplate.match(/<sc-if value="\{\{ p\.showBuyNow \}\}">/g) || []).length,
  2,
  'Grid and list product cards only render buy now for eligible products'
);

const app = new sandbox.TestComponent();
app.say = () => {};
app.state.acct = 'walkin';
app.state.route = { p: 'products' };
app.state.ck.step = 3;

const buyCard = app.productVM(app.prod('p5'));
assert.equal(buyCard.showBuyNow, true);
assert.equal(buyCard.buyNowLabel, 'ซื้อสินค้าทันที');

let propagationStopped = false;
buyCard.buyNow({ stopPropagation() { propagationStopped = true; } });
while (timers.length) timers.shift()();

assert.equal(propagationStopped, true, 'Buy now does not also open the product detail page');
assert.equal(app.state.cart.find(line => line.id === 'p5').q, 1, 'Buy now adds one product to the cart');
assert.equal(app.state.route.p, 'checkout', 'Buy now opens checkout');
assert.equal(app.state.ck.step, 1, 'Buy now opens the buyer information step');

app.state.lang = 'en';
assert.equal(app.productVM(app.prod('p5')).buyNowLabel, 'Buy now');
assert.equal(app.productVM(app.prod('p11')).showBuyNow, false, 'Quote-only products do not show buy now');
assert.equal(app.productVM(app.prod('p13')).showBuyNow, false, 'Consultation products do not show buy now');

console.log('PASS: product-list buy now buttons and buyer-information checkout flow');
