const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const productsTemplate = fs.readFileSync(path.join(__dirname, '..', 'Products.dc.html'), 'utf8');
const script = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const sandbox = {
  DCLogic:class {
    constructor() { this.props = {}; }
    setState(update) { Object.assign(this.state, typeof update === 'function' ? update(this.state) : update); }
  },
  window:{ scrollTo() {} }, document:{ getElementById:() => null },
  localStorage:{ getItem:() => null, setItem() {} },
  setTimeout:() => 0, clearTimeout() {}, setInterval:() => 0, clearInterval() {}, Date, console
};
vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);
const app = new sandbox.TestComponent();
const catalogue = JSON.stringify(app.PRODUCTS);
const prices = app.PRODUCTS.map(p => JSON.stringify(app.priceVM(p)));
const deadline = app.flashSaleEnd;
app.state.now = deadline - 3661000;
assert.equal(app.flashSaleVals().flashSale.units.map(u => u.value).join(':'), '01:01:01');
app.state.now += 1000;
assert.equal(app.flashSaleVals().flashSale.units.map(u => u.value).join(':'), '01:01:00');
for (const now of [deadline, deadline + 86400000]) {
  app.state.now = now;
  assert.equal(app.flashSaleVals().flashSale.units.map(u => u.value).join(':'), '00:00:00');
  assert.equal(app.flashSaleEnd, deadline, 'Expired round does not restart on render');
}
for (const lang of ['th', 'en']) {
  app.state.lang = lang;
  const sale = app.flashSaleVals().flashSale;
  assert.equal(sale.units.length, 3);
  assert.ok(sale.clockLabel && sale.note && sale.units.every(u => u.label));
  assert.match(sale.note, lang === 'th' ? /สาธิต/ : /Demo/);
  assert.match(sale.clockLabel, lang === 'th' ? /สิ้นสุดแล้ว/ : /ended/);
}
assert.equal(JSON.stringify(app.PRODUCTS), catalogue);
app.state.lang = 'th';
assert.deepEqual(app.PRODUCTS.map(p => JSON.stringify(app.priceVM(p))), prices);
app.flashSaleVals().flashSale.go();
assert.equal(app.state.route.p, 'promos');
app.flashSaleVals().flashSale.go();
assert.equal(app.state.route.p, 'products', 'Campaign page CTA opens catalogue');
assert.ok(!productsTemplate.includes('name="FlashSale"'), 'Product catalogue does not render the Flash Sale banner');
console.log('PASS: campaign countdown, expiry, TH/EN, navigation and unchanged product prices');
