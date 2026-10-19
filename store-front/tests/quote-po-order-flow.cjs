const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const checkoutTemplate = fs.readFileSync(path.join(root, 'Checkout.dc.html'), 'utf8');
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

function appForOrder(quote) {
  const app = new sandbox.TestComponent();
  app.state.acct = 'gradeA';
  app.state.cart = [{ id: 'p5', q: 1 }];
  app.state.ck = { ...app.state.ck, pay: 'credit', quoteRef:quote ? { id:quote.id, rev:quote.rev } : null };
  app.state.form = { po:'STALE-CHECKOUT-PO', poDoc:'stale-checkout-file.pdf' };
  app.state.quotes = quote ? [quote] : [];
  app.api = (key, delay, failureRate, onSuccess) => onSuccess();
  return app;
}

function acceptedQuote(overrides) {
  return {
    id:'QT-TEST', acct:'gradeA', kind:'instant', rev:1, accRev:1, status:'accepted',
    items:[{ id:'p5', q:1 }], lines:[{ pid:'p5', q:1, unit:34500, list:34500, kind:'product' }],
    exp:'2099-12-31', method:'delivery', po:'', poDoc:'',
    ...overrides,
  };
}

assert.doesNotMatch(checkoutTemplate, /id="ckPo"|id="ckPoDoc"/, 'Buyer checkout no longer asks for PO information');

const directApp = appForOrder(null);
directApp.confirmOrder();
assert.equal(directApp.state.orders[0].po, '', 'A direct checkout ignores stale PO data');
assert.equal(directApp.state.orders[0].poDoc, '', 'A direct checkout ignores stale approval files');
assert.equal(directApp.state.orders[0].buyer.po, undefined, 'The buyer snapshot does not retain hidden checkout PO data');
assert.equal(directApp.state.orders[0].buyer.poDoc, undefined, 'The buyer snapshot does not retain hidden checkout approval files');
assert.equal(directApp.state.orders[0].holds.includes('approval'), false, 'A direct checkout does not create a PO approval hold');

const quotedApp = appForOrder(acceptedQuote({ po:'PO-QUOTE-001', poDoc:'approval.pdf' }));
quotedApp.confirmOrder();
assert.equal(quotedApp.state.orders[0].po, 'PO-QUOTE-001', 'A quoted order inherits its PO number from the quotation');
assert.equal(quotedApp.state.orders[0].poDoc, 'approval.pdf', 'A quoted order inherits its approval evidence from the quotation');
assert.equal(quotedApp.state.orders[0].holds.includes('approval'), false, 'Quotation evidence clears the approval hold');

const quotedWithoutApprovalApp = appForOrder(acceptedQuote());
quotedWithoutApprovalApp.confirmOrder();
assert.equal(quotedWithoutApprovalApp.state.orders[0].holds.includes('approval'), true, 'A Grade A quoted order without evidence waits for approval');

console.log('PASS: PO information belongs to quotation conversion, not direct checkout');
