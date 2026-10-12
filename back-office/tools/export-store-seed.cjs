// Refresh the prototype's read-only source fixtures from the existing storefront.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const html = fs.readFileSync(path.join(root, 'store-front/index.html'), 'utf8');
const script = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const sandbox = { DCLogic:class { constructor(){ this.props={}; } }, window:{}, Date, console };
vm.createContext(sandbox);
vm.runInContext(script + '\nthis.App=Component;',sandbox);
const app = new sandbox.App();
const data = {products:app.PRODUCTS, services:app.SERVICES, categories:app.CATS, groups:app.GROUPS, accounts:app.ACCOUNTS, carriers:app.CARRIERS, coupons:app.COUPONS};
fs.writeFileSync(path.join(root,'back-office/store-seed.js'),'// Storefront-derived mock fixtures. ERP connection is not active.\nwindow.BO_STORE = '+JSON.stringify(data,null,2)+';\n');
const assets = path.join(root,'back-office/assets/products');
fs.mkdirSync(assets,{recursive:true});
for (const p of app.PRODUCTS) {
  const file=path.join(root,'store-front/assets',p.sku+'.png');
  if (fs.existsSync(file)) fs.copyFileSync(file,path.join(assets,p.sku+'.png'));
}
console.log('Exported '+app.PRODUCTS.length+' products and '+app.SERVICES.length+' services.');
