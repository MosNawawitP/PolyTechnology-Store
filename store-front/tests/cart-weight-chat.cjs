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
  Date, console,
};
vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);

const app = new sandbox.TestComponent();
app.state.route = { p: 'cart' };
app.state.lang = 'th';
const weightedProduct = app.PRODUCTS.find(product => product.type === 'buy' && product.w > 0);
app.state.cart = [{ id: weightedProduct.id, q:Math.floor(app.MAXW / weightedProduct.w) + 1 }];

const thaiTotals = app.totals();
assert.ok(thaiTotals.weight > app.MAXW, 'The test cart exceeds the 300 kg order limit');
app.consultFromCart();

assert.equal(app.state.route.p, 'cart', 'Weight consultation keeps the customer on the cart page');
assert.equal(app.state.chatOpen, true, 'Weight consultation opens the chat widget');
const thaiCustomer = app.state.chat.find(message => message.mine);
const thaiReply = app.state.chat.findLast(message => !message.mine);
assert.match(thaiCustomer.text, /ขอคำปรึกษา.*เกิน 300 กก./, 'The customer message explains the weight-limit issue');
assert.match(thaiCustomer.text, new RegExp(app.num(thaiTotals.weight, 1)), 'The customer message includes the actual cart weight');
assert.match(thaiReply.text, /แยก.*คำสั่งซื้อ|จัดส่งพิเศษ/, 'The mock reply offers relevant fulfilment options');
assert.match(thaiReply.text, /พื้นที่จัดส่ง|จังหวัด/, 'The mock reply asks for information needed to continue');

app.state.lang = 'en';
app.state.chat = null;
app.state.chatOpen = false;
app.consultFromCart();
const englishCustomer = app.state.chat.find(message => message.mine);
const englishReply = app.state.chat.findLast(message => !message.mine);
assert.match(englishCustomer.text, /consultation.*over 300 kg/i, 'The customer message supports English');
assert.match(englishReply.text, /split.*order|special delivery/i, 'The mock reply supports English');

console.log('PASS: overweight cart consultation opens chat with bilingual mock Q and A');
