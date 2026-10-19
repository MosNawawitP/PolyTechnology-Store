const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const rfqTemplate = fs.readFileSync(path.join(root, 'Rfq.dc.html'), 'utf8');
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

assert.doesNotMatch(rfqTemplate, /id="rfqPo"|id="rfqFiles"/, 'The RFQ form does not render PO or attachment inputs');
assert.doesNotMatch(rfqTemplate, /lblPo|lblRfqFiles|onRfqFiles/, 'The removed RFQ fields have no template bindings');

const app = new sandbox.TestComponent();
app.state.acct = 'partner';
app.state.rfq = {
  ...app.state.rfq,
  items: [{ id: 'p5', q: 1 }],
  po: 'STALE-RFQ-PO',
  files: ['stale-drawing.pdf'],
};
app.api = (key, delay, failureRate, onSuccess) => onSuccess();

const view = app.renderAllVals();
assert.equal(Object.hasOwn(view, 'rfqPo'), false, 'The RFQ view model does not expose a PO value');
assert.equal(Object.hasOwn(view, 'onRfqPo'), false, 'The RFQ view model does not expose a PO handler');
assert.equal(Object.hasOwn(view, 'onRfqFiles'), false, 'The RFQ view model does not expose an attachment handler');

app.submitRfq();
const submitted = app.state.quotes[0];
assert.equal(Object.hasOwn(submitted, 'po'), false, 'A new RFQ does not retain a hidden PO value');
assert.equal(Object.hasOwn(submitted, 'files'), false, 'A new RFQ does not retain hidden attachments');

console.log('PASS: RFQ form omits PO and attachment fields and does not retain hidden values');
