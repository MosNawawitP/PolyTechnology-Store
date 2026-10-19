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
  setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  Date, console,
};
vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);

const app = new sandbox.TestComponent();
const notices = [];
app.say = (message, kind) => notices.push({ message, kind });
app.state.stockAdj = {};
app.state.ck.quoteRef = null;

const product = app.prod('p5');
const ready = app.stockOf(product);

app.state.cart = [];
app.addToCart(product.id, ready + 5);
assert.equal(app.state.cart[0].q, ready, 'First add is capped at ready stock');
assert.equal(notices.at(-1).kind, 'warn', 'Capped add explains the stock limit');

app.state.cart = [{ id: product.id, q: ready - 1 }];
app.addToCart(product.id, 3);
assert.equal(app.state.cart[0].q, ready, 'Repeated add counts existing quantity and caps the total');

app.addToCart(product.id, 1);
assert.equal(app.state.cart[0].q, ready, 'Adding again at the stock limit does not increase quantity');

app.state.cart = [{ id: product.id, q: ready - 1 }];
app.setQty(product.id, ready + 10);
assert.equal(app.state.cart[0].q, ready, 'Cart quantity input is capped at ready stock');

app.state.stockAdj[product.id] = -product.stock;
app.state.cart = [];
app.addToCart(product.id, 1);
assert.equal(app.state.cart.length, 0, 'Out-of-stock products cannot be added to the cart');

console.log('PASS: add-to-cart and cart quantity changes never exceed ready stock');
