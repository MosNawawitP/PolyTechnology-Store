const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const loginTemplate = fs.readFileSync(path.join(root, 'LoginModal.dc.html'), 'utf8');
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

let view = app.renderAllVals();
assert.deepEqual(Array.from(view.loginOptions, option => option.k), ['walkin', 'partner', 'gradeA'], 'Demo login offers exactly three customer groups');
assert.equal(view.loginOptions[1].chip, 'Partner');
assert.equal(view.loginOptions[1].name, 'บริษัท นวกิจ เอ็นจิเนียริ่ง จำกัด');
assert.equal(app.ACCOUNTS.partner.priceIdx, 1, 'Navakij receives Partner pricing');
assert.equal(app.ACCOUNTS.partner.credit.limit, 2000000, 'Navakij receives the Partner credit limit');

app.state.lang = 'en';
view = app.renderAllVals();
assert.equal(view.loginOptions[1].name, 'Navakij Engineering Co., Ltd.');
assert.equal(view.loginIntro.includes('three demo accounts'), true);

assert.match(loginTemplate, /hint-placeholder-count="3"/, 'The login account list reserves three placeholders');

console.log('PASS: demo login exposes three groups and assigns Navakij to Partner');
