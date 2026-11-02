const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = source.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
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
app.say = () => {};
const original = JSON.stringify([app.PRODUCTS, app.CATS, app.COUPONS]);
for (const lang of ['th', 'en']) {
  app.state.lang = lang;
  for (const acct of ['guest', 'walkin', 'bizNew', 'partner', 'gradeA']) {
    app.state.acct = acct;
    const values = app.renderAllVals();
    assert.equal(values.homeFlashProducts.length, 6);
    assert.equal(values.featuredProducts.length, 6);
    assert.equal(values.catCards.length, 6);
    assert.equal(values.homeCouponCards.map(c => c.id).join(','), 'SAVE500,SAVE8,FREIGHT0');
    for (const card of values.homeFlashProducts) {
      const product = app.prod(card.id);
      assert.equal(card.priceLabel, app.priceVM(product).priceLabel, 'Flash sale uses the existing account price');
      assert.equal(card.photo, app.photo(product));
      assert.equal(card.desc, app.tx(product.d));
      assert.equal(card.stockN, app.stockOf(product));
      assert.ok(card.soldProgress >= 0 && card.soldProgress <= 100);
      assert.equal(card.badge, card.showMember ? card.discountLabel : (lang === 'th' ? 'ดีลพิเศษ' : 'SPECIAL DEAL'));
    }
    for (const coupon of values.homeCouponCards) {
      const originalCoupon = app.COUPONS[coupon.id];
      assert.equal(coupon.value, app.tx(originalCoupon.ui.v));
      assert.equal(coupon.cond, app.tx(originalCoupon.ui.c));
      assert.ok(fs.existsSync(path.join(root, coupon.icon)));
    }
  }
}
assert.equal(JSON.stringify([app.PRODUCTS, app.CATS, app.COUPONS]), original);
app.state.acct = 'walkin';
app.renderAllVals().homeCouponCards[0].collect();
const collected = app.renderAllVals().homeCouponCards[0];
assert.equal(collected.off, true, 'Home coupon collection uses existing wallet behavior');
assert.equal(app.walletMap().SAVE500, 'ready');
console.log('PASS: reference home cards, existing prices/images/stock, coupon terms and collection in TH/EN for all accounts');
