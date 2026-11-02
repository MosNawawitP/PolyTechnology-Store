const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const homeTemplate = fs.readFileSync(path.join(root, 'Home.dc.html'), 'utf8');
const flashTemplate = fs.readFileSync(path.join(root, 'HomeFlashSale.dc.html'), 'utf8');
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


const productsTemplate = fs.readFileSync(path.join(root, 'Products.dc.html'), 'utf8');
for (const key of ['showMember', 'discountLabel', 'retailLabel', 'ratingLabel', 'soldLabel']) {
  assert.ok(productsTemplate.includes('p.' + key), 'Products template uses ' + key);
}
for (const key of ['showMember', 'discountLabel', 'retailLabel']) {
  assert.ok(homeTemplate.includes('p.' + key), 'Compact home card uses ' + key);
}
assert.ok(flashTemplate.includes('p.soldLabel'), 'Flash sale keeps the existing lifetime sales label');

const samples = {};
for (const lang of ['th', 'en']) {
  app.state.lang = lang;
  for (const account of ['guest', 'walkin', 'bizNew', 'partner', 'gradeA']) {
    app.state.acct = account;
    for (const p of app.catalogueProducts()) {
      const vmv = app.productVM(p);
      assert.equal(vmv.stockLabel, app.stockVM(p).label, 'stockLabel keeps its original meaning for other pages');
      if (p.type === 'buy') {
        assert.match(vmv.soldLabel, lang === 'th' ? /^ขายแล้ว [\d,]+ ชิ้น$/ : /^Sold [\d,]+ pcs$/);
        assert.ok(vmv.showRating && Number(vmv.ratingLabel) >= 4 && Number(vmv.ratingLabel) <= 4.9);
        assert.equal(vmv.ratingLabel, app.productVM(p).ratingLabel, 'mock rating is stable');
      }
      const segment = account === 'partner' || account === 'gradeA';
      const pct = p.pr[app.ACCOUNTS[account].priceIdx] === null ? 0 : Math.round((p.pr[0] - p.pr[app.ACCOUNTS[account].priceIdx]) / p.pr[0] * 100);
      assert.equal(vmv.showMember, segment && pct > 0, account + ' ' + p.id + ' member price flag');
      if (vmv.showMember) {
        assert.equal(vmv.discountLabel, '-' + pct + '%');
        assert.equal(vmv.retailLabel, app.baht(p.pr[0]));
        assert.equal(vmv.priceLabel, app.baht(p.pr[app.ACCOUNTS[account].priceIdx]));
      }
      if (lang === 'th' && p.id === 'p1') samples[account] = [vmv.priceLabel, vmv.retailLabel, vmv.discountLabel, vmv.showMember, vmv.ratingLabel, vmv.reviewsLabel, vmv.soldLabel];
    }
  }
}
console.log(JSON.stringify(samples));
console.log('Product card sales, rating and member price checks passed.');
