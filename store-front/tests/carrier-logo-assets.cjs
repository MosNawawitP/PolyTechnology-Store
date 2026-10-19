const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const checkoutTemplate = fs.readFileSync(path.join(root, 'Checkout.dc.html'), 'utf8');
const script = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const sandbox = {
  DCLogic: class { constructor() { this.props = {}; } },
  window: { scrollTo() {}, matchMedia: () => ({ matches: false }) },
  document: { getElementById: () => null },
  localStorage: { getItem: () => null, setItem() {} },
  setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  Date, Math, console,
};
vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);

const app = new sandbox.TestComponent();
app.state.cart = [{ id:'p5', q:1 }];
app.state.ck = { ...app.state.ck, step:2, mode:'delivery' };
app.state.api.carriers = 'done';

for (const carrier of app.CARRIERS) {
  assert.match(carrier.logo.src, /^\.\/assets\/(?:carriers\/)?[a-z0-9-]+\.(?:svg|png)$/, `${carrier.name} uses a local logo image`);
  const assetPath = path.join(root, carrier.logo.src.replace('./', ''));
  assert.equal(fs.existsSync(assetPath), true, `${carrier.name} logo asset exists`);
}

const carriers = app.renderAllVals().carriers;
assert.equal(carriers.length, 4, 'The standard shipment exposes four eligible external carriers');
for (const carrier of carriers) {
  assert.match(carrier.logoSrc, /^\.\/assets\/(?:carriers\/)?[a-z0-9-]+\.(?:svg|png)$/, `${carrier.name} exposes its local logo`);
  assert.equal(carrier.logoAlt, `${carrier.name} logo`, `${carrier.name} has useful alternative text`);
}

app.state.cart = [{ id:'p5', q:10 }];
const ownDelivery = app.renderAllVals().carriers.find(carrier => carrier.id === 'c5');
assert.ok(ownDelivery, 'Polytechnology delivery appears when external carriers cannot take the weight');
assert.equal(ownDelivery.logoFrameWidth, '96px', 'Polytechnology receives a wider logo frame');
assert.equal(ownDelivery.logoFrameHeight, '76px', 'Polytechnology receives a taller logo frame');
assert.equal(ownDelivery.logoImageWidth, '60px', 'Polytechnology logo width fits inside its frame');
assert.equal(ownDelivery.logoImageHeight, '60px', 'Polytechnology logo height fits inside its frame');

assert.match(checkoutTemplate, /<img[^>]+src="\{\{ c\.logoSrc \}\}"[^>]+alt="\{\{ c\.logoAlt \}\}"/, 'Carrier cards render logo images with alternative text');
assert.match(checkoutTemplate, /width:\{\{ c\.logoFrameWidth \}\};height:\{\{ c\.logoFrameHeight \}\}/, 'Carrier cards use the per-logo frame dimensions');
assert.doesNotMatch(checkoutTemplate, /\{\{ c\.logoT \}\}/, 'Carrier cards no longer render placeholder logo text');

console.log('PASS: checkout carrier cards use local logo images');
