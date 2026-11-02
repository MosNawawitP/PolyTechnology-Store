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
  setTimeout: () => 0,
  clearTimeout() {},
  setInterval: () => 0,
  clearInterval() {},
  Date,
  console,
};

vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);
const app = new sandbox.TestComponent();

for (const lang of ['th', 'en']) {
  app.state.lang = lang;
  const values = app.renderAllVals();
  assert.deepEqual(
    Array.from(values.fSections, section => section.key),
    ['cat', 'brand'],
    'Product filters omit the availability section in both languages',
  );
}

console.log('PASS: product filters omit the availability section');
