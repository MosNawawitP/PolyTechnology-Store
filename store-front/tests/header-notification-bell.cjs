const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const header = fs.readFileSync(path.join(root, 'Header.dc.html'), 'utf8');
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
Object.assign(app.state, app.seed());

app.state.acct = 'guest';
assert.equal(app.renderAllVals().showNotifBell, false, 'Guests do not see the notification bell');

app.state.acct = 'gradeA';
let view = app.renderAllVals();
assert.equal(view.showNotifBell, true, 'Signed-in accounts see the notification bell');
assert.equal(view.notifUnread, 3, 'Seeded notifications start unread');
assert.equal(view.notifBadge, '3', 'The badge shows the unread count');
assert.equal(view.notifItems.length, 3, 'The panel lists the visible notifications');
assert.equal(view.notifItems[0].dot, '#B23A2E', 'Unread items show a dot');
assert.match(view.notifBellLabel, /3/, 'The bell label announces the unread count');

view.notifItems[0].read();
view = app.renderAllVals();
assert.equal(view.notifUnread, 2, 'Opening one item marks only that item as read');
assert.equal(view.notifItems[0].dot, 'transparent', 'A read item loses its dot');

view.markAllNotifsRead();
view = app.renderAllVals();
assert.equal(view.notifUnread, 0, 'Mark all clears the unread count');
assert.equal(view.hasNotifUnread, false, 'The badge hides when everything is read');

app.state.notifs = Array.from({ length: 12 }, (_, n) => ({ id: 'x' + n, kind: 'order', date: app.addDays(0), text: ['คำสั่งซื้อ ' + n, 'Order ' + n] }));
view = app.renderAllVals();
assert.equal(view.notifBadge, '9+', 'Large counts are capped at 9+');
assert.equal(view.notifItems.length, 5, 'The panel shows the latest five items');

app.state.notifs = [{ id: 's1', kind: 'quote', date: app.addDays(0), text: ['ใบเสนอราคางานบริการ QT-1 พร้อมให้ตรวจสอบ', 'Service quotation QT-1 is ready'] }];
view = app.renderAllVals();
assert.equal(view.notifUnread, 0, 'Hidden service notifications are not counted');
assert.equal(view.noNotifItems, true, 'An empty panel shows the empty state');

app.state.notifOpen = true;
view = app.renderAllVals();
assert.equal(view.anyMenuOpen, true, 'The bell panel participates in the click-away overlay');
view.closeMenus();
assert.equal(app.state.notifOpen, false, 'closeMenus closes the bell panel');
view = app.renderAllVals();
view.toggleNotif();
view = app.renderAllVals();
view.toggleAcct();
assert.equal(app.state.notifOpen, false, 'Opening the account menu closes the bell panel');

view = app.renderAllVals();
view.goNotifSettings();
assert.equal(app.state.tab, 'notif', 'The settings link opens the notification tab');
assert.equal(app.state.route.p, 'account', 'The settings link opens the account page');

app.state.lang = 'en';
view = app.renderAllVals();
assert.equal(view.notifTitle, 'Notifications', 'The panel supports English');
assert.equal(view.lblMarkAllRead, 'Mark all as read', 'Mark all supports English');

assert.match(header, /<sc-if value="\{\{ showNotifBell \}\}">/, 'The bell is conditional on sign-in');
assert.match(header, /aria-label="\{\{ notifBellLabel \}\}"/, 'The bell has an accessible label');
assert.match(header, /aria-expanded="\{\{ notifOpenStr \}\}"/, 'The bell exposes its expanded state');
assert.ok(header.indexOf('toggleLangMenu') < header.indexOf('toggleNotif') && header.indexOf('toggleNotif') < header.indexOf('toggleAcct'), 'The bell sits between language and account');

console.log('PASS: notification bell is signed-in only, counts unread, marks read and closes with the other header menus');
