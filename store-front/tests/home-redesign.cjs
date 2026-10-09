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
app.say = () => {};

assert.equal(app.homeHeroSlides().length, app.HERO.length + 1, 'Overview is followed by every existing campaign');
assert.equal(app.homeHeroSlides()[0].photo, './assets/homepage/hero-industrial-commerce.webp');
app.state.heroIdx = 4;
app.advanceHomeHero();
assert.equal(app.state.heroIdx, 0, 'Carousel wraps across all five slides');
app.state.heroPaused = true;
app.advanceHomeHero();
assert.equal(app.state.heroIdx, 0, 'Paused carousel stays on its current slide');
app.state.heroPaused = false;
app.state.heroHover = true;
app.advanceHomeHero();
assert.equal(app.state.heroIdx, 0, 'Hover prevents automatic rotation');
app.state.heroHover = false;
app.state.heroFocus = true;
app.advanceHomeHero();
assert.equal(app.state.heroIdx, 0, 'Keyboard focus prevents automatic rotation');
app.state.heroFocus = false;
app.state.heroReducedMotion = true;
app.advanceHomeHero();
assert.equal(app.state.heroIdx, 0, 'Reduced motion prevents automatic rotation');

app.state.filters = { cat: ['green'], grp: ['solar'], brand: ['Huawei'], type: ['buy'], min: '90000', max: '', avail: ['ready'], sort: 'pop' };
app.state.search = 'old query';
app.browseHomeCategory('gas');
assert.equal(app.state.route.p, 'products');
assert.deepEqual(Array.from(app.state.filters.cat), ['gas']);
assert.equal(app.state.search, '');
assert.equal(app.arr(app.state.filters.grp).length, 0);
assert.equal(app.arr(app.state.filters.brand).length, 0);
assert.ok(app.filtered().length > 0);
assert.ok(app.filtered().every(p => p.cat === 'gas'), 'Business selection clears stale filters and returns matching products');

for (const lang of ['th', 'en']) {
  app.state.lang = lang;
  for (const account of ['guest', 'walkin', 'bizNew', 'partner', 'gradeA']) {
    app.state.acct = account;
    const values = app.renderAllVals();
    assert.equal(values.catCards.length, app.CATS.length);
    assert.equal(values.serviceCards.length, app.SERVICES.length);
    assert.equal(values.featuredHome.length, 4);
    const expected = app.PRODUCTS.slice().sort((a, b) => b.pop - a.pop).slice(0, 4);
    assert.equal(values.featuredHome.map(p => p.id).join(','), expected.map(p => p.id).join(','));
    values.featuredHome.forEach((p, i) => {
      assert.equal(p.photo, app.photo(expected[i]), 'Recommended product keeps its original image');
      assert.equal(p.priceLabel, app.priceVM(expected[i]).priceLabel);
      assert.equal(p.stockLabel, app.stockVM(expected[i]).label);
    });
    const coupons = Object.keys(app.COUPONS).filter(k => !app.loggedIn || app.COUPONS[k].segs.includes(app.seg)).slice(0, 5);
    assert.equal(values.couponCards.length, coupons.length);
    values.couponCards.forEach((c, i) => assert.equal(c.value, app.tx(app.COUPONS[coupons[i]].ui.v)));
    values.catCards.forEach(c => assert.ok(fs.existsSync(path.join(root, c.photo))));
    values.serviceCards.forEach(s => assert.ok(fs.existsSync(path.join(root, s.photo))));
  }
}

app.state.acct = 'walkin';
app.state.route = { p: 'home' };
app.productVM(app.prod('p5')).primary();
assert.equal(app.state.route.p, 'home', 'Add to cart does not also open PDP');
assert.equal(app.state.cart.find(p => p.id === 'p5').q, 1);
app.productVM(app.prod('p11')).primary();
assert.equal(app.state.route.p, 'rfq', 'Quote-only product enters the existing quotation flow');
app.productVM(app.prod('p13')).primary();
assert.equal(app.state.route.p, 'services', 'Consultation product enters the existing service flow');

console.log('PASS: carousel, business filtering, 4 products, 6 categories, 5 services, segment pricing/coupons, TH/EN and product CTA flows');
