const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const template = fs.readFileSync(path.join(root, 'Contact.dc.html'), 'utf8');
const script = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
let persisted = null;
const sandbox = {
  DCLogic: class {
    constructor() { this.props = {}; }
    setState(update) { Object.assign(this.state, typeof update === 'function' ? update(this.state) : update); }
  },
  window: { scrollTo() {}, matchMedia: () => ({ matches: false }) },
  document: {
    getElementById: () => null,
    querySelector: () => null,
  },
  localStorage: {
    getItem: () => null,
    setItem: (key, value) => { persisted = JSON.parse(value); },
  },
  setTimeout: fn => { fn(); return 0; }, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
  Date, Math, console,
};

vm.createContext(sandbox);
vm.runInContext(script + '\nthis.TestComponent = Component;', sandbox);

assert.match(template, /<form[^>]*onSubmit="\{\{ contactSubmit \}\}"/, 'The Contact page uses a semantic form');
for (const name of ['contactName', 'contactCompany', 'contactEmail', 'contactPhone', 'contactTopic', 'contactReference', 'contactMessage', 'contactConsent']) {
  assert.match(template, new RegExp('name="' + name + '"'), name + ' is rendered');
}
assert.match(template, /aria-invalid="\{\{ contactNameInvalid \}\}"/, 'Fields expose validation state');
assert.match(template, /role="alert"/, 'The form provides an accessible validation summary');
assert.match(template, /role="status"/, 'The form provides an accessible success status');
assert.match(template, /<sc-if value="\{\{ contactShowReference \}\}">/, 'The reference field is conditional');

const app = new sandbox.TestComponent();
app.state.lang = 'th';
app.state.route = { p: 'contact' };
let view = app.renderAllVals();

assert.deepEqual(
  Array.from(view.contactTopics, topic => topic.id),
  ['product', 'information', 'order', 'delivery', 'other'],
  'Contact topics include general information while quotation, credit and hidden services are omitted',
);
assert.equal(view.contactTopics.find(topic => topic.id === 'information').label, 'สอบถามข้อมูล', 'The Thai information topic is available');

view.contactSubmit({ preventDefault() {} });
assert.equal(app.state.contactResult, null, 'An invalid form is not submitted');
assert.deepEqual(
  Object.keys(app.state.contactErrors).sort(),
  ['contactConsent', 'contactEmail', 'contactName', 'contactPhone', 'contactTopic', 'contactMessage'].sort(),
  'Required fields report validation errors',
);

const valid = {
  contactName: 'คุณสมชาย ใจดี',
  contactCompany: 'บริษัท ตัวอย่าง จำกัด',
  contactEmail: 'somchai@example.com',
  contactPhone: '+66 81-234-5678',
  contactTopic: 'order',
  contactReference: 'P261014RTKLP',
  contactMessage: 'ต้องการสอบถามสถานะการจัดส่งสินค้า',
  contactConsent: true,
};
app.state.contactForm = valid;
app.state.contactErrors = {};
view = app.renderAllVals();
assert.equal(view.contactShowReference, true, 'Order enquiries show the reference field');
view.contactSubmit({ preventDefault() {} });

assert.match(app.state.contactResult.id, /^CT-\d{8}-\d{4}$/, 'A successful mock submission creates a reference number');
assert.equal(app.state.contactForm.contactName, valid.contactName, 'Contact name remains available for another enquiry');
assert.equal(app.state.contactForm.contactEmail, valid.contactEmail, 'Contact email remains available for another enquiry');
assert.equal(app.state.contactForm.contactTopic, '', 'Topic is cleared after success');
assert.equal(app.state.contactForm.contactReference, '', 'Reference is cleared after success');
assert.equal(app.state.contactForm.contactMessage, '', 'Message is cleared after success');
assert.equal(app.state.contactForm.contactConsent, false, 'Consent is cleared after success');

const savedDraft = { ...app.state.contactForm, contactMessage: 'Draft that must remain private' };
app.state.contactForm = savedDraft;
app.state.lang = 'en';
view = app.renderAllVals();
assert.equal(view.contactMessage, savedDraft.contactMessage, 'Changing language preserves the draft');
assert.equal(view.contactTopics.find(topic => topic.id === 'information').label, 'General information', 'The English information topic is available');
app.persist();
assert.equal(Object.hasOwn(persisted, 'contactForm'), false, 'The contact draft is not persisted');
assert.equal(Object.hasOwn(persisted, 'contactResult'), false, 'The contact result is not persisted');

app.state.contactForm = valid;
app.resetIdentity();
assert.equal(app.state.contactForm.contactName, '', 'Changing account clears the previous contact identity');
assert.equal(app.state.contactForm.contactMessage, '', 'Changing account clears the previous contact message');

console.log('PASS: contact form layout, validation, mock submission and privacy behavior');
