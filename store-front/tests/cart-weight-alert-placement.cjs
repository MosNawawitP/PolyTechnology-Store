const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const cartTemplate = fs.readFileSync(path.join(root, 'Cart.dc.html'), 'utf8');
const chatTemplate = fs.readFileSync(path.join(root, 'ChatWidget.dc.html'), 'utf8');

const grandTotal = cartTemplate.indexOf('{{ lblGrand }}');
const weightLimit = cartTemplate.indexOf('{{ lblWeightCheck }}');
const weightAlert = cartTemplate.indexOf('<sc-if value="{{ wBlocked }}">');
const creditSummary = cartTemplate.indexOf('<sc-if value="{{ showCartCredit }}">');

assert.ok(grandTotal >= 0, 'The cart summary renders the grand total');
assert.ok(weightLimit > grandTotal, 'The weight-limit bar appears below the grand total');
assert.ok(weightAlert > weightLimit, 'The blocked-weight alert appears below the weight-limit bar');
assert.ok(weightAlert < creditSummary, 'The blocked-weight alert appears before secondary summary content');
assert.equal(
  cartTemplate.indexOf('<sc-if value="{{ wBlocked }}">', weightAlert + 1),
  -1,
  'The blocked-weight alert is rendered only once'
);

const actionBar = cartTemplate.indexOf('class="pt-cart-action-bar"');
const actionMarkup = cartTemplate.slice(actionBar);
const checkoutAction = actionMarkup.indexOf('onClick="{{ toCheckout }}"');
const quoteAction = actionMarkup.indexOf('onClick="{{ cartToRfq }}"');

assert.ok(actionBar >= 0, 'The cart renders a dedicated action bar');
assert.match(
  cartTemplate.slice(actionBar, actionBar + 220),
  /position:fixed;[^";]*bottom:0|position:fixed;[^"]*bottom:0/,
  'The action bar stays fixed to the bottom of the viewport'
);
assert.match(actionMarkup, /env\(safe-area-inset-bottom\)/, 'The action bar respects the device safe area');
assert.match(actionMarkup, /\{\{ cartActionSelection \}\}/, 'The action bar summarizes selected items');
assert.match(actionMarkup, /\{\{ cartActionWeight \}\}/, 'The action bar summarizes cart weight');
assert.match(actionMarkup, /\{\{ cartActionTotalTitle \}\}/, 'The action bar labels the payable total');
assert.match(
  actionMarkup,
  /class="pt-cart-action-context"[^>]*align-items:baseline/,
  'Selection and weight summaries share the same text baseline'
);
assert.ok(quoteAction >= 0, 'The quotation action is inside the fixed action bar');
assert.ok(checkoutAction > quoteAction, 'The primary checkout action is the rightmost action');
assert.equal(
  actionMarkup.indexOf('onClick="{{ toCheckout }}"', checkoutAction + 1),
  -1,
  'The checkout action is rendered only once'
);
assert.match(chatTemplate, /bottom:\{\{ chatBottom \}\}/, 'The chat widget clears the cart action bar');

console.log('PASS: cart totals and fixed bottom actions use the required layout');
