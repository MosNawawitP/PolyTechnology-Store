const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const detail = fs.readFileSync(path.join(root, 'AccountOrderDetail.dc.html'), 'utf8');
const orderList = fs.readFileSync(path.join(root, 'AccountOrders.dc.html'), 'utf8');
const summaryHeader = detail.match(/<h1[^>]*>\{\{ od\.id \}\}<\/h1>([\s\S]*?)<\/div>/);

assert.ok(summaryHeader, 'The order summary header is present');
assert.doesNotMatch(summaryHeader[1], /\{\{ od\.status \}\}/, 'The order status is not shown beside the order number');
assert.match(summaryHeader[1], /color:\{\{ od\.payColor \}\}[^>]*border-radius:[^>]*>\{\{ od\.pay \}\}/, 'The payment status is shown as a colored chip beside the order number');
assert.match(detail, /\{\{ lblPayStatus \}\}[\s\S]*?\{\{ od\.pay \}\}/, 'The payment status remains in the order details');
assert.doesNotMatch(orderList, /\{\{ o\.status \}\}/, 'Order cards do not use the fulfillment status as their primary chip');
assert.match(orderList, /color:\{\{ o\.payColor \}\}[^>]*border-radius:999px[^>]*>\{\{ o\.pay \}\}/, 'Order cards use the payment status as their colored chip');

console.log('PASS: order cards and order details use payment status chips');
