// Domain regressions run the actual component logic and source-derived fixtures.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const memory=new Map();
const ctx={window:{matchMedia:()=>({matches:false})},DCLogic:class{setState(x){Object.assign(this.state,typeof x==='function'?x(this.state):x)}},document:{getElementById:()=>null},localStorage:{getItem:k=>memory.get(k),setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)},Date,Intl,console,setTimeout:()=>0,clearTimeout(){}};
vm.createContext(ctx);
for(const f of ['store-seed.js','screen-catalog.js','business-data.js','workflow.js']) vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
const src=fs.readFileSync(path.join(root,'index.html'),'utf8').match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
vm.runInContext(src+'\nthis.App=Component;',ctx);
function app(){const a=new ctx.App();a.state.route='workspace';return a;}
const a=app(),catalog=ctx.window.BO_CATALOG.screens;
assert.equal(catalog.length,134);
assert.equal(a.state.records.products.length,61);
assert.equal(a.state.records.services.length,5);
for(const lang of ['th','en'])for(const p of catalog){a.state.lang=lang;a.openScreen(p.id);const v=a.renderVals();assert.equal(v.pageTitle,p.title[lang==='en'?1:0]);assert.ok(v.screenOptions.length);if(p.create)assert.ok(p.fields.every(f=>a.state.form[f.key]==='' || a.state.form[f.key]===false),'Creation fields are blank: '+p.id);}
const source=JSON.stringify(Object.fromEntries(ctx.window.BO_DATA.readonly.map(k=>[k,a.state.records[k]])));
a.openScreen('02-catalog/edit','WEB-p1');a.state.form.title='Edited web title';a.performSave();assert.equal(a.state.records.webProducts[0].title,'Edited web title');assert.equal(source,JSON.stringify(Object.fromEntries(ctx.window.BO_DATA.readonly.map(k=>[k,a.state.records[k]]))));
const m=app();m.switchActor('manager');m.openScreen('02-catalog/edit');const prev=JSON.stringify(m.state.records.webProducts);m.state.form.title='Unauthorized';m.performSave();assert.equal(JSON.stringify(m.state.records.webProducts),prev);
m.switchActor('admin');assert.equal(m.canRead('finance'),false);m.openScreen('01-dashboard/manager');assert.equal(m.renderVals().hasDashboard,false);
m.switchActor('sales');assert.ok(m.scopedRows('customers').every(c=>c.owner==='ST-01'));assert.ok(m.scopedRows('orders').every(o=>['C-01','C-02'].includes(o.customer)));
m.switchActor('warehouse');m.openScreen('01-dashboard/manager');assert.ok(m.renderVals().dashboardCards.every(c=>c.collection!=='payments' && c.collection!=='receivables'));m.openScreen('06-orders/warehouse-approve','SO-2569-0002');Object.assign(m.state.form,{order:'SO-2569-0002',owner:'ST-02',readyDate:'2026-10-12',reason:'Test'});assert.equal(m.validateContent(m.screenDef()),false);assert.ok(m.state.fieldErrors.order);assert.equal(m.state.records.orders[1].holds[0],'payment');
const b=app();b.openScreen('10-logistics/booking-create');Object.assign(b.state.form,{order:'SO-2569-0004',dispatchDate:'2026-10-13',carrier:'c5',round:'ROUND-01'});assert.equal(b.validateContent(b.screenDef()),true);const n=b.state.records.bookings.length;b.performSave();b.performSave();assert.equal(b.state.records.bookings.length,n,'Repeated save must not duplicate a new booking');
b.openScreen('10-logistics/booking-create');Object.assign(b.state.form,{order:'SO-2569-0008',dispatchDate:'2026-10-13',carrier:'c5',round:'ROUND-01'});assert.equal(b.validateContent(b.screenDef()),false,'Missing weight blocks booking');
b.openScreen('09-finance/mixed-payment');Object.assign(b.state.form,{customer:'C-03',transferPercent:60,chequePercent:50,terms:'Test',reason:'Test'});assert.equal(b.validateContent(b.screenDef()),false);
b.openScreen('06-orders/returns');Object.assign(b.state.form,{order:'SO-2569-0001',product:'p1',qty:2,reason:'Test'});assert.equal(b.validateContent(b.screenDef()),false);
b.openScreen('07-quotes/revision');const issued=JSON.stringify(b.state.records.quotes);Object.assign(b.state.form,{quote:'QT-2569-0001',change:'New quantity',reason:'Test',endDate:'2026-10-20'});b.performSave();assert.equal(JSON.stringify(b.state.records.quotes),issued,'Revision requests must preserve issued source snapshots');
const p=app();p.openScreen('09-finance/review','PAY-2569-0004');Object.assign(p.state.form,{amount:58850,reference:'DEMO-NEW-REF',receivedDate:'2026-10-10',bank:'Sample',invoice:'INV-2569-0004',allocation:70000,paymentState:'verified',reason:'Test'});assert.equal(p.validateContent(p.screenDef()),false);p.state.form.allocation=58850;assert.equal(p.validateContent(p.screenDef()),true);p.performSave();assert.equal(p.state.records.payments[3].status,'verified');const remaining=p.state.records.documents[3].remaining;p.performSave();assert.equal(p.state.records.documents[3].remaining,remaining,'Receipt must never reduce an invoice twice');
p.openScreen('09-finance/cheque-edit','CH-01');Object.assign(p.state.form,{chequeState:'cleared',depositDate:'2026-10-11',clearedDate:'2026-10-12',evidence:'Sample confirmation',reason:'Test'});const np=p.state.records.payments.length;p.performSave();p.performSave();assert.equal(p.state.records.payments.length,np+1,'Cleared cheque is posted once');
p.openScreen('08-services/job-edit','JOB-01');Object.assign(p.state.form,{owner:'ST-02',date:'2026-10-12',progress:'done',results:'Test OK',reason:'Test',acceptance:true,attachment:'handover.pdf'});const payment=p.state.records.jobs[0].payment;p.performSave();assert.equal(p.state.records.jobs[0].progress,'working','Saving metadata cannot skip workflow stages');for(const [from,to] of [['working','testing'],['testing','handover'],['handover','done']])assert.equal(p.advanceWorkflow({collection:'jobs',id:'JOB-01',from,to,note:'Test transition'}),true);assert.equal(p.state.records.jobs[0].progress,'done');assert.equal(p.state.records.jobs[0].payment,payment,'Job completion never marks payment paid');
p.openScreen('13-documents/draft-edit','INV-2569-0001');p.state.form.reason='Test';assert.equal(p.validateContent(p.screenDef()),false,'Issued documents cannot be edited');
const c=app();c.openScreen('05-customers/credit-decision','APP-01');Object.assign(c.state.form,{customer:'C-02',segment:'Partner',priceTier:'Partner',priceDecision:'rejected',creditLimit:500000,termDays:30,paymentMethod:'credit',creditDecision:'approved',reason:'Test'});c.performSave();assert.equal(c.state.records.customers[1].priceTier,'Retail');assert.equal(c.state.records.customers[1].creditLimit,500000,'Credit and price decisions are independent');
assert.ok(c.state.records.audit[0].before && c.state.records.audit[0].after,'Changes preserve before/after audit');
const q=app();q.openScreen('07-quotes/create');Object.assign(q.state.form,{customer:'C-01',reference:'MULTI-LINE',scope:'Test',terms:'Test',endDate:'2026-10-20',product:'p1',qty:2});q.addQuoteLine();Object.assign(q.state.form,{product:'p2',qty:3});q.addQuoteLine();assert.equal(q.state.draftLines.length,2);assert.equal(q.validateContent(q.screenDef()),true);q.performSave();const draft=q.state.records.quoteDrafts.find(r=>r.reference==='MULTI-LINE');assert.equal(draft.lines.length,2);assert.equal(draft.net,draft.lines.reduce((n,l)=>n+l.total,0));assert.equal(draft.amount,Math.round(draft.net*1.07*100)/100);q.performSave();assert.equal(q.state.records.quoteDrafts.filter(r=>r.reference==='MULTI-LINE').length,1);
const reset=app();reset._resetEligible=true;reset._resetExpires=Date.now()-1;reset.state.newPassword=reset.state.confirmPassword='NewDemoPass!';reset.submitReset({preventDefault(){}});assert.ok(reset.state.resetError);reset._resetExpires=Date.now()+10000;reset._resetUsed=true;reset.submitReset({preventDefault(){}});assert.ok(reset.state.resetError);
Object.assign(q.state.form,{product:'p1',qty:1});q.performSave();const updated=q.state.records.quoteDrafts.find(r=>r.reference==='MULTI-LINE');assert.equal(updated.lines[0].qty,3);const amount=updated.amount;q.performSave();assert.equal(q.state.records.quoteDrafts.find(r=>r.reference==='MULTI-LINE').amount,amount,'Repeated quote save never duplicates a pending product');
console.log('PASS: 134-screen schema, ownership, permissions, scope, holds, booking, immutable quotes/documents, payment/cheque idempotency, independent credit and job states');

// Role-controlled, sequential handoffs and the customer-safe status projection.
const w=app(),change=(collection,id,from,to,extra={})=>({collection,id,from,to,note:'Internal-only handoff note',...extra});
w.switchActor('warehouse');assert.equal(w.advanceWorkflow(change('orders','SO-2569-0002','packed','shipped')),false,'Hold prevents advancing');
assert.equal(w.advanceWorkflow(change('orders','SO-2569-0005','packed','delivered',{evidence:'POD'})),false,'Cannot skip a stage');
w.state.records.orders[4].tracking='DEMO-TRACK-5';assert.equal(w.advanceWorkflow(change('orders','SO-2569-0005','packed','shipped')),true);assert.equal(w.advanceWorkflow(change('orders','SO-2569-0005','packed','shipped')),false,'Stale/repeated handoff rejected');assert.equal(w.advanceWorkflow(change('orders','SO-2569-0005','shipped','delivered',{evidence:'POD'})),false,'Warehouse cannot confirm customer delivery');
w.switchActor('support');assert.equal(w.advanceWorkflow(change('orders','SO-2569-0005','shipped','delivered')),false,'Delivery needs evidence');assert.equal(w.advanceWorkflow(change('orders','SO-2569-0005','shipped','delivered',{evidence:'POD'})),true);assert.equal(w.state.records.orders[4].fulfillment,'delivered');assert.equal(w.state.records.orders[4].workflowHistory[1].role,'support');
w.switchActor('manager');assert.equal(w.advanceWorkflow(change('jobs','JOB-01','working','testing')),false,'Manager is read-only');
w.switchActor('admin');assert.equal(w.advanceWorkflow(change('jobs','JOB-01','working','testing')),false,'Admin menu grants do not make admin an engineer');
w.switchActor('engineer');assert.ok(w.scopedRows('jobs').some(j=>j.id==='JOB-01'));assert.equal(w.advanceWorkflow(change('jobs','JOB-01','working','testing')),true);assert.equal(w.advanceWorkflow(change('jobs','JOB-01','testing','handover')),true);assert.equal(w.advanceWorkflow(change('jobs','JOB-01','handover','done')),false,'Handover needs saved customer acceptance');
w.state.records.jobs[0].acceptance=true;w.state.records.jobs[0].attachment='acceptance.pdf';assert.equal(w.advanceWorkflow(change('jobs','JOB-01','handover','done')),true);assert.equal(w.state.records.jobs[0].payment,'verifying');
w.switchActor('sales');w.state.records.quotes[0].endDate='2099-12-31';const payload=JSON.stringify(w.state.records.quotes[0].lines);assert.equal(w.advanceWorkflow(change('quotes','QT-2569-0001','ready','sent')),true);assert.equal(w.advanceWorkflow(change('quotes','QT-2569-0001','sent','accepted')),false);assert.equal(w.advanceWorkflow(change('quotes','QT-2569-0001','sent','accepted',{evidence:'Customer reply'})),true);assert.equal(w.advanceWorkflow(change('quotes','QT-2569-0001','accepted','ordered')),false,'Do not fabricate a source order');assert.equal(JSON.stringify(w.state.records.quotes[0].lines),payload);
assert.equal(w.canWrite(w.screenDef('08-services/edit')),false,'Workflow grants do not grant sales service-catalog editing');
assert.equal(w.advanceWorkflow(change('rfqs','RFQ-QT-2569-0001','submitted','review')),true);assert.equal(w.advanceWorkflow(change('rfqs','RFQ-QT-2569-0001','review','prepared')),true);assert.equal(w.advanceWorkflow(change('rfqs','RFQ-QT-2569-0001','prepared','quoted')),true);
assert.equal(w.advanceWorkflow(change('quotes','QT-2569-0003','expired','sent')),false);assert.equal(w.advanceWorkflow(change('orders','SO-2569-0004','packed','shipped')),false,'Customer scope enforced');
w.state.records.roles.find(r=>r.role==='sales').grants={quotes:{read:true,write:false}};assert.equal(w.workflowAccess('quotes',w.state.records.quotes[1]),false,'Revoked write grant enforced');
const publicData=JSON.parse(memory.get(ctx.window.BO_WORKFLOW.trackingKey)),projection=publicData.records.find(r=>r.type==='orders' && r.id==='SO-2569-0005');assert.equal(projection.state,'delivered');assert.ok(!JSON.stringify(publicData).includes('Internal-only handoff note'));assert.ok(!('actor' in projection.history[0]) && !('amount' in projection));assert.ok(w.state.records.audit.some(a=>a.action==='workflow:shipped→delivered' && a.role==='support' && a.at));
console.log('PASS: sequential role handoffs, holds/evidence/scope/grants, no skipped or duplicate steps, immutable quote lines, customer-safe tracking and audit');

// The order detail editor unblocks the same order shown in the reported screen.
const detail=app();detail.switchActor('warehouse');detail.openScreen('06-orders/detail','SO-2569-0001');
assert.equal(detail.renderVals().workflowActionDisabled,true);
assert.equal(detail.renderVals().showWorkflowDetails,true);
detail.state.workflowDetails={tracking:'TRACK-DETAIL-001',status:'completed',fulfillment:'delivered',holds:[]};
assert.equal(detail.saveWorkflowDetails(),true);
assert.equal(detail.state.records.orders[0].tracking,'TRACK-DETAIL-001');
assert.equal(detail.state.records.orders[0].fulfillment,'packed','Metadata cannot advance status');
assert.equal(detail.renderVals().workflowActionDisabled,false);
assert.equal(detail.advanceWorkflow(change('orders','SO-2569-0001','packed','shipped')),true);
detail.switchActor('support');detail.openScreen('06-orders/detail','SO-2569-0001');
assert.equal(detail.saveWorkflowDetails(),false,'Support cannot edit dispatch metadata');
assert.equal(detail.advanceWorkflow(change('orders','SO-2569-0001','shipped','delivered',{evidence:'POD-DETAIL-001'})),true);
const restored=app();ctx.setInterval=()=>0;ctx.window.addEventListener=()=>{};restored.syncDocument=()=>{};restored.componentDidMount();assert.equal(restored.state.records.orders[0].fulfillment,'delivered','Reload retains delivery');
// Walk a fresh order through every role, using only the detail editor for prerequisites.
const full=app();const order=full.state.records.orders[0];Object.assign(order,{status:'submitted',fulfillment:'submitted',weight:null,tracking:'',checklist:'',workflowHistory:[]});
full.switchActor('sales');full.openScreen('06-orders/detail',order.id);
for(const [from,to] of [['submitted','confirmed'],['confirmed','incoming']])assert.equal(full.advanceWorkflow(change('orders',order.id,from,to)),true);
full.switchActor('warehouse');full.openScreen('06-orders/detail',order.id);
full.state.workflowDetails={weight:0};assert.equal(full.saveWorkflowDetails(),false);
full.state.workflowDetails={weight:301};assert.equal(full.saveWorkflowDetails(),false);
full.state.workflowDetails={weight:12};assert.equal(full.saveWorkflowDetails(),true);
assert.equal(full.advanceWorkflow(change('orders',order.id,'incoming','preparing')),true);
full.state.workflowDetails={checklist:'All items packed'};assert.equal(full.saveWorkflowDetails(),true);
assert.equal(full.advanceWorkflow(change('orders',order.id,'preparing','packed')),true);
full.state.workflowDetails={carrier:'missing',tracking:'TRACK',dispatchDate:'2026-10-13'};assert.equal(full.saveWorkflowDetails(),false);
full.state.workflowDetails={carrier:'c5',tracking:'TRACK',dispatchDate:'2026-02-30'};assert.equal(full.saveWorkflowDetails(),false);
full.state.workflowDetails={carrier:'c5',tracking:'TRACK',dispatchDate:'2026-10-13'};assert.equal(full.saveWorkflowDetails(),true);
full.state.workflowDetails={tracking:'UNSAVED'};full.state.workflowNote='Send';full.requestWorkflow();assert.equal(full.state.confirm,null,'Unsaved details cannot be submitted');
full.state.workflowDetails={};assert.equal(full.advanceWorkflow(change('orders',order.id,'packed','shipped')),true);
full.switchActor('support');assert.equal(full.advanceWorkflow(change('orders',order.id,'shipped','delivered',{evidence:'Customer receipt'})),true);
assert.equal(full.state.records.orders[0].workflowHistory.length,6);
assert.equal(full.state.records.orders[0].payment,order.payment);
full.switchActor('manager');full.openScreen('06-orders/detail','SO-2569-0004');assert.equal(full.renderVals().showWorkflowDetails,false);full.state.workflowDetails={tracking:'FORBIDDEN'};assert.equal(full.saveWorkflowDetails(),false);
console.log('PASS: detail prerequisites, validation, metadata allowlist, all six order transitions, delivery persistence and permissions');

const blockedDetails=app();blockedDetails.switchActor('warehouse');blockedDetails.openScreen('06-orders/detail','SO-2569-0002');blockedDetails.state.workflowDetails={tracking:'HOLD-TRACK'};assert.equal(blockedDetails.saveWorkflowDetails(),true);assert.equal(blockedDetails.state.records.orders[1].holds[0],'payment');assert.equal(blockedDetails.renderVals().workflowActionDisabled,true,'Metadata never clears a hold');
blockedDetails.state.records.roles.find(r=>r.role==='warehouse').grants={orders:{read:true,write:false}};blockedDetails.state.workflowDetails={tracking:'REVOKED'};assert.equal(blockedDetails.saveWorkflowDetails(),false,'Revoked write grant blocks inline save');assert.equal(blockedDetails.state.records.orders[1].tracking,'HOLD-TRACK');
console.log('PASS: inline metadata preserves holds and rechecks revoked write permissions');

// Cross-menu integration uses real saves and transitions, with no test-only progress changes.
const linked=app();linked.switchActor('warehouse');
assert.equal(linked.state.records.bookings.length,5,'Every packed order enters the logistics queue');
const orderId='SO-2569-0004',booking=linked.state.records.bookings.find(r=>r.order===orderId);
linked.openScreen('10-logistics/booking-edit',booking.id);Object.assign(linked.state.form,{dispatchDate:'2026-10-14',carrier:'c5',round:'ROUND-01',tracking:'LINKED-TRACK-004',reason:'Assign round'});linked.performSave();
let linkedOrder=linked.state.records.orders.find(o=>o.id===orderId);assert.equal(linkedOrder.tracking,'LINKED-TRACK-004');assert.equal(linkedOrder.dispatchDate,'2026-10-14');assert.equal(linked.renderVals().workflowActionDisabled,false);assert.equal(linked.renderVals().workflowRecordId,orderId);
linked.state.workflowNote='Dispatch from booking';linked.requestWorkflow();assert.equal(linked.state.confirm.id,orderId);linked.confirmAction();
assert.equal(linked.state.records.orders.find(o=>o.id===orderId).fulfillment,'shipped');assert.equal(linked.state.records.bookings.find(b=>b.order===orderId).status,'shipped');assert.equal(linked.state.records.shipments.find(b=>b.order===orderId).status,'shipped');
const ship=linked.state.records.shipments.find(b=>b.order===orderId);linked.openScreen('10-logistics/shipment-edit',ship.id);Object.assign(linked.state.form,{tracking:'LINKED-CORRECTED-004',dispatchDate:'2026-10-14',eta:'2026-10-15',evidence:'POD-004',reason:'Delivery evidence'});linked.performSave();
assert.equal(linked.state.records.orders.find(o=>o.id===orderId).tracking,'LINKED-CORRECTED-004');assert.equal(linked.state.records.orders.find(o=>o.id===orderId).fulfillment,'shipped','Warehouse evidence cannot confirm delivery');
// Support C-01 owns order 0005, so use it to test evidence from logistics to support.
linked.openScreen('10-logistics/shipment-create');Object.assign(linked.state.form,{order:'SO-2569-0005',carrier:'c5',tracking:'CREATE-SHIP-005',dispatchDate:'2026-10-14',eta:'2026-10-15',qty:1});linked.performSave();assert.equal(linked.state.records.orders[4].fulfillment,'shipped','Recording a shipment dispatches the linked order');
const createdShip=linked.state.records.shipments.find(b=>b.order==='SO-2569-0005');linked.openScreen('10-logistics/shipment-edit',createdShip.id);Object.assign(linked.state.form,{evidence:'CUSTOMER-POD-005',reason:'Customer received'});linked.performSave();
linked.switchActor('support');linked.openScreen('06-orders/detail','SO-2569-0005');linked.state.workflowNote='Confirm receipt';linked.requestWorkflow();linked.confirmAction();assert.equal(linked.state.records.orders[4].fulfillment,'delivered');assert.equal(linked.state.records.shipments.find(b=>b.order==='SO-2569-0005').status,'delivered');assert.equal(linked.state.records.bookings.find(b=>b.order==='SO-2569-0005').status,'delivered');
const pickupApp=app();pickupApp.switchActor('warehouse');pickupApp.openScreen('10-logistics/pickup-create');Object.assign(pickupApp.state.form,{order:'SO-2569-0001',date:'2026-10-14',slot:'10:00-11:00',recipient:'Customer',phone:'0815550000'});pickupApp.performSave();assert.equal(pickupApp.state.records.orders[0].deliveryMethod,'pickup');assert.equal(pickupApp.renderVals().workflowActionDisabled,false);pickupApp.state.workflowNote='Release pickup';pickupApp.requestWorkflow();pickupApp.confirmAction();assert.equal(pickupApp.state.records.orders[0].fulfillment,'shipped');assert.equal(pickupApp.state.records.pickups[0].status,'shipped');assert.ok(!pickupApp.state.records.shipments.some(r=>r.order==='SO-2569-0001' && r.status!=='cancelled'));
pickupApp.switchActor('support');pickupApp.openScreen('06-orders/detail','SO-2569-0001');pickupApp.state.workflowNote='Customer acceptance';pickupApp.state.workflowEvidence='SIGNED-PICKUP';pickupApp.requestWorkflow();pickupApp.confirmAction();assert.equal(pickupApp.state.records.pickups[0].status,'delivered');
const migration=ctx.window.BO_WORKFLOW.reconcile({...pickupApp.state.records,orders:[{...pickupApp.state.records.orders[0],deliveryMethod:'shipping',fulfillment:'packed',tracking:'',status:'confirmed'}],shipments:[{id:'OLD',order:'SO-2569-0001',status:'shipped',tracking:'LEGACY-TRACK',carrier:'c5',dispatchDate:'2026-10-14'}]},true);assert.equal(migration.orders[0].tracking,'LEGACY-TRACK');assert.equal(migration.orders[0].fulfillment,'packed','Legacy logistics metadata cannot skip order stages');assert.equal(migration.shipments[0].status,'draft');assert.equal(ctx.window.BO_WORKFLOW.reconcile(migration).bookings.length,migration.bookings.length,'Queue reconciliation is idempotent');
console.log('PASS: packed queue, booking/order/round metadata, dispatch from logistics, shipment creation, evidence handoff, delivery propagation, pickup and legacy migration');

const revokedLogistics=app();revokedLogistics.switchActor('warehouse');revokedLogistics.openScreen('10-logistics/booking-edit','BK-01');const unchanged=JSON.stringify(revokedLogistics.state.records.orders);revokedLogistics.state.records.roles.find(r=>r.role==='warehouse').grants={orders:{read:true,write:false},logistics:{read:true,write:true}};Object.assign(revokedLogistics.state.form,{tracking:'FORBIDDEN-CROSS-MENU',reason:'Attempt update'});revokedLogistics.performSave();assert.equal(JSON.stringify(revokedLogistics.state.records.orders),unchanged,'Logistics cannot bypass revoked order writes');
console.log('PASS: cross-menu writes enforce linked-order grants');

assert.doesNotThrow(()=>revokedLogistics.tableWorkflow(revokedLogistics.screenDef('10-logistics/bookings'),{id:'ORPHAN',order:'MISSING'}),'Missing legacy references must not break the logistics list');
