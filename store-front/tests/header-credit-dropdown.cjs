const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const header = fs.readFileSync(path.join(root, 'Header.dc.html'), 'utf8');
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

for (const account of ['walkin', 'bizNew']) {
  app.state.acct = account;
  assert.equal(app.renderAllVals().showAcctCredit, false, account + ' does not show credit in the profile dropdown');
}

app.state.acct = 'partner';
let view = app.renderAllVals();
assert.equal(view.showAcctCredit, true, 'Partner shows credit in the profile dropdown');
assert.equal(view.acctCredit.availablePct, 68, 'Partner has 68 percent available credit');
assert.equal(view.acctCredit.availablePctLabel, '68%', 'Partner percentage is formatted for display');
assert.equal(view.acctCredit.availableLabel, '฿1,360,000', 'Partner available credit amount is displayed');
assert.equal(view.acctCredit.limitLabel, '฿2,000,000', 'Partner credit limit is displayed');

app.state.acct = 'gradeA';
view = app.renderAllVals();
assert.equal(view.showAcctCredit, true, 'Grade A shows credit in the profile dropdown');
assert.equal(view.acctCredit.availablePct, 69, 'Grade A has 69 percent available credit');
assert.equal(view.acctCredit.availableLabel, '฿41,550,000', 'Grade A available credit amount is displayed');

app.state.lang = 'en';
view = app.renderAllVals();
assert.equal(view.acctCredit.title, 'Available credit', 'The credit summary supports English');

assert.match(header, /<sc-if value="\{\{ showAcctCredit \}\}">/, 'The credit section is conditional');
assert.match(header, /role="progressbar"[^>]*aria-valuenow="\{\{ acctCredit\.availablePct \}\}"/, 'The credit percentage is accessible');
assert.match(header, /width:\{\{ acctCredit\.availablePctLabel \}\}/, 'The progress bar reflects the available percentage');
assert.match(header, /\{\{ acctCredit\.availableLabel \}\}/, 'The available credit amount is rendered');
assert.match(header, /\{\{ acctCredit\.limitLabel \}\}/, 'The total credit limit is rendered');

console.log('PASS: profile dropdown credit is limited to credit accounts and shows percentage and amounts');
