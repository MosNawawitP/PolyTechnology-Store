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
assert.equal(app.baht(5000), '5,000 บาท', 'Money is displayed with the baht unit after the amount');
assert.equal(app.baht(0), '0 บาท', 'Zero uses the same suffix format');

const uiFiles = fs.readdirSync(root)
  .filter(file => file === 'index.html' || file.endsWith('.dc.html'));

for (const file of uiFiles) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  assert.doesNotMatch(source, /฿|\bTHB\b/, `${file} does not contain a prefix currency marker`);
}

console.log('PASS: storefront money uses an amount followed by the baht unit');
