const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const storefrontDir = path.resolve(__dirname, '..');
const pdpTemplate = fs.readFileSync(path.join(storefrontDir, 'Pdp.dc.html'), 'utf8');
const storefrontController = fs.readFileSync(path.join(storefrontDir, 'index.html'), 'utf8');

const removedBindings = [
  'lblEstWeight',
  'pdpTotalWeight',
  'lblReadyDate',
  'pdpReady'
];

for (const binding of removedBindings) {
  assert.equal(
    pdpTemplate.includes(binding),
    false,
    `Pdp.dc.html must not render ${binding}`
  );
  assert.equal(
    storefrontController.includes(`${binding}:`),
    false,
    `index.html must not expose the unused ${binding} view-model field`
  );
}

console.log('PDP fulfillment estimates are hidden.');
