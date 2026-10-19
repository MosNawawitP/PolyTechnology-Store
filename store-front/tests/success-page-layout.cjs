const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const success = fs.readFileSync(path.join(root, 'Success.dc.html'), 'utf8');
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

const paidOrder = {
  ...app.state.orders.find(order => app.payKey(order) === 'paid'),
  id: 'P261019CYDSW',
  invoice: 'INV-2026-009999',
  pay: 'qr',
  payStatus: 'paid',
  holds: [],
};

for (const lang of ['th', 'en']) {
  app.state.lang = lang;
  const ok = app.okVM(paidOrder, {
    qr: { n: lang === 'th' ? 'QR Code' : 'Thai QR' },
  });

  assert.equal(ok.hasReceipt, true, 'A paid order exposes its receipt action');
  assert.equal(typeof ok.downloadReceipt, 'function', 'The receipt action is callable');
  assert.equal(ok.receiptLabel, lang === 'th' ? 'ดาวน์โหลดใบเสร็จรับเงิน' : 'Download receipt');
}

assert.match(success, /<dl[^>]*grid-template-columns:1fr/, 'Order summary cards are stacked in one column');
assert.doesNotMatch(success, /lblNextSteps|ok\.next/, 'The next-steps box is removed from the success page');
assert.match(success, /<sc-if value="\{\{ ok\.hasReceipt \}\}">[\s\S]*onClick="\{\{ ok\.downloadReceipt \}\}"/, 'The receipt button is conditionally rendered after successful payment');
assert.match(success, /font-size:14px;color:#6B6785">\{\{ bk\.k \}\}/, 'Bank transfer row labels use 14px text');

console.log('PASS: success summary, payment details and receipt actions render correctly');
