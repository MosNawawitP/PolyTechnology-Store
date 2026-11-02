const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const checkoutTemplate = fs.readFileSync(path.join(root, 'Checkout.dc.html'), 'utf8');

const deliveryStepStart = checkoutTemplate.indexOf('<sc-if value="{{ showDelivery }}">');
const deliveryModeStart = checkoutTemplate.indexOf('<sc-if value="{{ isDelivery }}">', deliveryStepStart);
const shippingAddressList = checkoutTemplate.indexOf('<sc-for list="{{ ckShipList }}"', 0);
const billingAddressList = checkoutTemplate.indexOf('<sc-for list="{{ ckBillList }}"', 0);

assert.ok(deliveryStepStart >= 0, 'Checkout renders the delivery step');
assert.ok(deliveryModeStart > deliveryStepStart, 'Checkout renders the carrier delivery panel inside the delivery step');
assert.ok(shippingAddressList > deliveryModeStart, 'Shipping address selection is inside the carrier delivery panel');
assert.ok(billingAddressList >= 0 && billingAddressList < deliveryStepStart, 'Tax invoice address selection remains in buyer details');
assert.equal(checkoutTemplate.indexOf('<sc-for list="{{ ckShipList }}"', shippingAddressList + 1), -1, 'Shipping address selection is rendered only once');

console.log('PASS: checkout address selectors are placed in their intended steps');
