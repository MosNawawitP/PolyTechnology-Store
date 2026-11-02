const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const homeTemplate = fs.readFileSync(path.join(root, 'Home.dc.html'), 'utf8');
const flashTemplate = fs.readFileSync(path.join(root, 'HomeFlashSale.dc.html'), 'utf8');
const productsTemplate = fs.readFileSync(path.join(root, 'Products.dc.html'), 'utf8');
const pdpTemplate = fs.readFileSync(path.join(root, 'Pdp.dc.html'), 'utf8');
const commerceCss = fs.readFileSync(path.join(root, 'commerce.css'), 'utf8');
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

assert.doesNotMatch(homeTemplate, /onClick="\{\{ p\.primary \}\}"/, 'Recommended products do not expose direct purchase controls');
assert.doesNotMatch(flashTemplate, /onClick="\{\{ p\.primary \}\}"/, 'Home flash products do not expose direct purchase controls');
assert.doesNotMatch(productsTemplate, /onClick="\{\{ p\.buyNow \}\}"|pt-catalog-buy/, 'Catalogue cards do not expose buy-now controls');
assert.equal(
  (productsTemplate.match(/<sc-if value="\{\{ p\.showListPrimary \}\}">/g) || []).length,
  2,
  'Grid and list catalogue views only show primary actions for non-purchase products'
);

const app = new sandbox.TestComponent();
assert.equal(app.productVM(app.prod('p5')).showListPrimary, false, 'Buyable products defer purchase actions to the PDP');
assert.equal(app.productVM(app.prod('p11')).showListPrimary, true, 'Quote-only products keep their quotation action');
assert.equal(app.productVM(app.prod('p13')).showListPrimary, true, 'Consultation products keep their consultation action');

assert.match(commerceCss, /\.pt-flash-card:hover[^}]*transform:translateY\(-4px\)/, 'Flash product cards lift on hover');
assert.match(commerceCss, /\.pt-recommend-card:hover[^}]*transform:translateY\(-4px\)/, 'Recommended product cards lift on hover');
assert.match(commerceCss, /\.pt-products \.pt-catalog-card:hover[^}]*transform:translateY\(-4px\)/, 'Catalogue product cards lift on hover');
assert.match(homeTemplate, /class="pt-home-row-card"/, 'Optional homepage category products use the shared hover treatment');
assert.match(pdpTemplate, /class="pt-related-card"/, 'Related PDP products use the shared hover treatment');
for (const selector of ['pt-flash-card', 'pt-recommend-card', 'pt-home-row-card', 'pt-products \\.pt-catalog-card', 'pt-related-card']) {
  assert.match(commerceCss, new RegExp('\\.' + selector + ':hover[^}]*border-color:#FF6B00'), selector + ' uses an orange hover border');
}
assert.match(commerceCss, /@media \(prefers-reduced-motion:reduce\)[\s\S]*\.pt-flash-card[\s\S]*\.pt-recommend-card[\s\S]*\.pt-catalog-card/, 'Product hover motion is disabled when reduced motion is preferred');

console.log('PASS: product lists defer purchasing to PDP and expose accessible hover feedback');
