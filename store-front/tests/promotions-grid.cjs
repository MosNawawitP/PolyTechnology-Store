const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const promosTemplate = fs.readFileSync(path.join(root, 'Promos.dc.html'), 'utf8');
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

for (const lang of ['th', 'en']) {
  app.state.lang = lang;
  const promos = app.promoList();
  assert.equal(promos.length, 4, 'The promotions page exposes four offers in total');
  assert.ok(promos.every(promo => promo.title && promo.body && promo.cta && promo.period), 'Every offer is localized and complete');
  assert.ok(promos.every(promo => promo.photo.endsWith('.webp')), 'Every offer uses an optimized promotion image');
}

assert.match(promosTemplate, /grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/, 'The promotion grid renders four cards per row');
assert.match(promosTemplate, /aspect-ratio:16\/9/, 'Promotion artwork stays compact in the four-column card');
assert.match(promosTemplate, /padding:18px/, 'Promotion card content uses compact spacing');

console.log('PASS: four localized promotions render in a compact four-column grid');
