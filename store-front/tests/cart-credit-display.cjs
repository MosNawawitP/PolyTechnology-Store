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
  setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  Date, console,
};
vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);

const app = new sandbox.TestComponent();
app.state.cart = [{ id: 'p5', q: 1 }];
app.state.ck.quoteRef = null;

app.state.acct = 'walkin';
assert.equal(app.renderAllVals().showCartCredit, false, 'Prepaid customers do not see corporate credit');

app.state.acct = 'partner';
const partner = app.renderAllVals();
assert.equal(partner.showCartCredit, true, 'Partner customers see corporate credit');
assert.equal(partner.cartCredit.availablePct, 68, 'Partner available credit is 68 percent of the limit');
assert.equal(partner.cartCredit.availablePctLabel, '68%', 'The percentage is ready for display');
assert.equal(partner.cartCredit.availableLabel, '฿1,360,000', 'Available credit is shown as money');
assert.equal(partner.cartCredit.after, 1360000 - app.totals().total, 'After-order credit uses the cart total');
const overLimit = app.creditSummaryVM(1500000);
assert.equal(overLimit.hold, true, 'An order above available credit keeps the existing credit hold');
assert.equal(overLimit.afterTitle, 'เกินวงเงิน', 'An over-limit order is labelled clearly');

app.state.acct = 'gradeA';
const gradeA = app.renderAllVals();
assert.equal(gradeA.showCartCredit, true, 'Grade A customers see corporate credit');
assert.equal(gradeA.cartCredit.availablePct, 69, 'Grade A available credit rounds to 69 percent');

app.state.lang = 'en';
assert.equal(app.renderAllVals().lblCartCredit, 'Your corporate credit', 'Credit summary supports English');

assert.match(cartTemplate, /role="progressbar"/, 'Credit percentage is exposed as a progress bar');
assert.match(cartTemplate, /aria-valuenow="\{\{ cartCredit\.availablePct \}\}"/, 'Progress value is exposed to assistive technology');
assert.match(cartTemplate, /width:\{\{ cartCredit\.availablePctLabel \}\}/, 'The visible bar follows the available-credit percentage');

console.log('PASS: cart credit summary is limited to credit accounts and reflects available credit');
