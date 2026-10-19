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
app.SHOW_SERVICES = true;
app.state.lang = 'th';
const base = {
  id: 'LD-TEST-0001', acct: 'gradeA', svc: 's2', date: '2026-10-16', stage: 'submitted',
  contact: {}, goal: '', place: '', need: '', files: [], extra: {},
  survey: { fee: 0, need: false, paid: false, date: null },
};

assert.deepEqual(
  Array.from(app.leadStages(base), stage => stage[1][0]),
  ['ส่งคำขอแล้ว', 'ผู้เชี่ยวชาญติดต่อกลับ', 'จัดทำแนวทางและใบเสนอราคา', 'รับใบเสนอราคาแล้ว'],
  'Service requests expose only the four request lifecycle steps',
);

const survey = { ...base, stage: 'survey', survey: { ...base.survey, need: true } };
assert.equal(app.leadRequestStageKey(survey), 'survey', 'A site survey remains within proposal preparation');

const ordered = { ...base, stage: 'quoted', quoteId: 'QT-TEST-0001', orderId: 'SO-TEST-0001' };
app.state.orders = [{ id: ordered.orderId, status: 'done', holds: [] }];
assert.equal(app.leadRequestStageKey(ordered), 'quoted', 'Order progress does not extend the service-request lifecycle');

const detail = app.ldVM(ordered);
assert.equal(detail.stage, 'รับใบเสนอราคาแล้ว', 'The request detail stays at its terminal quotation status');
assert.equal(detail.stages.length, 4, 'The request detail renders four progress steps');
assert.equal(detail.hasQuote, true, 'The linked quotation remains available');
assert.equal(detail.hasOrder, true, 'The linked service order remains available');

const seeded = app.seed();
Object.assign(app.state, seeded, { acct: 'gradeA', lang: 'th', route: { p: 'account' }, tab: 'leads', stTab: {}, pg: {} });
const account = app.renderAllVals();
assert.deepEqual(
  Array.from(account.leadTabs, tab => tab.label),
  ['ทั้งหมด', 'ส่งคำขอแล้ว', 'ผู้เชี่ยวชาญติดต่อกลับ', 'จัดทำแนวทางและใบเสนอราคา', 'รับใบเสนอราคาแล้ว'],
  'The request list filters use the same four-step lifecycle',
);
assert.ok(account.leadRows.every(row => row.track.length === 4), 'Every request card renders the four-step progress track');
assert.ok(account.leadRows.some(row => row.hasCta), 'Quotation and service-order actions remain available on request cards');

app.state.lang = 'en';
assert.equal(app.ldVM(ordered).stage, 'Quotation received', 'The terminal request status supports English');

console.log('PASS: service requests stop at quotation receipt while linked quotation and order data remain available');
