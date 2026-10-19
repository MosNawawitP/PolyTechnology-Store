const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const script = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const historyCalls = [];
const listeners = {};
const location = { pathname: '/', search: '', hash: '' };
const window = {
  location,
  history: {
    pushState(state, title, url) {
      historyCalls.push({ method: 'push', state, url });
      location.pathname = url;
    },
    replaceState(state, title, url) {
      historyCalls.push({ method: 'replace', state, url });
      location.pathname = url;
    },
  },
  scrollTo() {},
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  addEventListener(type, handler) { listeners[type] = handler; },
  removeEventListener(type) { delete listeners[type]; },
  innerWidth: 1440,
};
const sandbox = {
  DCLogic: class {
    constructor() { this.props = {}; }
    setState(update) {
      const previous = { ...this.state };
      Object.assign(this.state, typeof update === 'function' ? update(this.state) : update);
      if (this.componentDidUpdate) this.componentDidUpdate({}, previous);
    }
  },
  window,
  document: { getElementById: () => null, querySelector: () => null },
  localStorage: { getItem: () => null, setItem() {} },
  requestAnimationFrame: () => 0,
  setTimeout: () => 0,
  clearTimeout() {},
  setInterval: () => 0,
  clearInterval() {},
  Date,
  URLSearchParams,
  decodeURIComponent,
  encodeURIComponent,
  console,
};
vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);
const app = new sandbox.TestComponent();
app.measureHdr = () => {};
app.persist = () => {};
const plain = value => JSON.parse(JSON.stringify(value));

assert.match(html, /<base href="\/">/);
assert.ok(Array.isArray(vercel.rewrites), 'Vercel must serve index.html for direct clean-URL requests');
assert.ok(vercel.rewrites.some(rule => rule.source === '/products/:id' && rule.destination === '/index.html'));
assert.ok(vercel.rewrites.some(rule => rule.source === '/account/:path*' && rule.destination === '/index.html'));

const cases = [
  [{ p: 'home' }, 'profile', '/'],
  [{ p: 'products' }, 'profile', '/products'],
  [{ p: 'pdp', id: 'p3' }, 'profile', '/products/p3'],
  [{ p: 'services', svc: 's3' }, 'profile', '/services/s3'],
  [{ p: 'promos' }, 'profile', '/promotions'],
  [{ p: 'about' }, 'profile', '/about'],
  [{ p: 'contact' }, 'profile', '/contact'],
  [{ p: 'coupons' }, 'profile', '/coupons'],
  [{ p: 'cart' }, 'profile', '/cart'],
  [{ p: 'checkout' }, 'profile', '/checkout'],
  [{ p: 'success' }, 'profile', '/order-success'],
  [{ p: 'rfq' }, 'profile', '/request-a-quote'],
  [{ p: 'register', kind: 'company' }, 'profile', '/register/company'],
  [{ p: 'register', done: 'person' }, 'profile', '/register/person/success'],
  [{ p: 'account' }, 'profile', '/account'],
  [{ p: 'account' }, 'address', '/account/addresses'],
  [{ p: 'account' }, 'credit', '/account/credit'],
  [{ p: 'account' }, 'orders', '/account/orders'],
  [{ p: 'account', oid: 'P261005YUHNB' }, 'orders', '/account/orders/P261005YUHNB'],
  [{ p: 'account' }, 'quotes', '/account/quotes'],
  [{ p: 'account', qid: 'QT-2026-00231' }, 'quotes', '/account/quotes/QT-2026-00231'],
  [{ p: 'account' }, 'leads', '/account/consultations'],
  [{ p: 'account', lid: 'LD-2026-0142' }, 'leads', '/account/consultations/LD-2026-0142'],
  [{ p: 'account' }, 'docs', '/account/documents'],
  [{ p: 'account' }, 'notif', '/account/notifications'],
];

for (const [route, tab, expectedUrl] of cases) {
  assert.equal(app.urlForNavigation(route, tab), expectedUrl);
  const parsed = app.navigationFromPath(expectedUrl);
  assert.deepEqual(plain(parsed.route), route);
  assert.equal(parsed.tab, tab);
}

assert.deepEqual(plain(app.navigationFromPath('/does-not-exist').route), { p: 'home' });
assert.equal(app.urlForNavigation({ p: 'pdp', id: 'part / 1' }, 'profile'), '/products/part%20%2F%201');
assert.equal(app.navigationFromPath('/products/part%20%2F%201').route.id, 'part / 1');

app.componentDidMount();
historyCalls.length = 0;
app.state.route = { p: 'home' };
app.state.tab = 'profile';
location.pathname = '/';
app.go('products');
assert.equal(historyCalls.at(-1).method, 'push');
assert.equal(historyCalls.at(-1).url, '/products');

location.pathname = '/cart';
listeners.popstate();
assert.deepEqual(plain(app.state.route), { p: 'cart' });
assert.equal(app.state.tab, 'profile');
assert.equal(historyCalls.at(-1).url, '/products', 'Popstate must not create a replacement history entry');

console.log('PASS: clean storefront URLs, route parsing, History API navigation and popstate restoration');
