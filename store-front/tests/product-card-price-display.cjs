const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const productsTemplate = fs.readFileSync(
  path.join(__dirname, '..', 'Products.dc.html'),
  'utf8'
);

assert.equal(
  productsTemplate.includes('{{ p.priceNote }}'),
  false,
  'product cards must not show customer-segment price notes'
);

console.log('Product card price display checks passed.');
