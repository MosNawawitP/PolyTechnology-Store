const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const template = fs.readFileSync(path.join(__dirname, '..', 'Pdp.dc.html'), 'utf8');

const addButton = template.match(/<button type="button" onClick="\{\{ pdpAdd \}\}" style="([^"]+)"/);
const buyButton = template.match(/<button type="button" onClick="\{\{ pdpBuyNow \}\}" style="([^"]+)"/);
const relatedAddButton = template.match(/<button type="button" onClick="\{\{ p\.primary \}\}" style="([^"]+)"/);

assert.ok(addButton, 'PDP add-to-cart button exists');
assert.match(addButton[1], /background:#FFF4EA/, 'PDP add-to-cart button uses the light orange background');
assert.match(addButton[1], /border:1px solid #FF6B00/, 'PDP add-to-cart button uses the orange outline');
assert.match(addButton[1], /color:#A63C00/, 'PDP add-to-cart button uses readable orange text');

assert.ok(buyButton, 'PDP buy-now button exists');
assert.match(buyButton[1], /background:#FF6B00/, 'PDP buy-now button uses the solid orange background');
assert.match(buyButton[1], /border:1px solid #FF6B00/, 'PDP buy-now button keeps an orange border');
assert.match(buyButton[1], /color:#FFFFFF/, 'PDP buy-now button keeps white text');

assert.ok(relatedAddButton, 'Related-product add-to-cart button exists');
assert.match(relatedAddButton[1], /background:#FFF4EA/, 'Related-product add-to-cart button uses the light orange background');
assert.match(relatedAddButton[1], /border:1px solid #FF6B00/, 'Related-product add-to-cart button uses the orange outline');
assert.match(relatedAddButton[1], /color:#A63C00/, 'Related-product add-to-cart button uses readable orange text');

console.log('PASS: PDP and related-product purchase buttons use the orange treatment');
