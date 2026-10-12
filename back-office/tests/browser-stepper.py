"""Sequential role handoffs through actual UI and live customer-safe projection."""
from pathlib import Path
import json, os, sys
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'verification/back-office'
sys.path.insert(0,str(OUT/'tools'))
from playwright.sync_api import sync_playwright, expect
BASE=os.environ.get('POLYTECH_BO_URL','http://127.0.0.1:8001/')
CHROME=os.environ.get('POLYTECH_TEST_CHROME',r'C:\Program Files\Google\Chrome\Application\chrome.exe')
source=(ROOT/'back-office/index.html').read_text(encoding='utf-8').replace('class Component extends DCLogic {','class Component extends DCLogic {\n constructor(props) { super(props); window.__qaApp=this; }',1)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=CHROME,headless=True);context=b.new_context(viewport={'width':1600,'height':1100});g=context.new_page();errors=[]
 # Optional local copies of the exact runtime URLs keep restricted test hosts usable.
 runtime_cache=os.environ.get('POLYTECH_TEST_RUNTIME_CACHE')
 if runtime_cache:
  for pattern,filename in [('https://unpkg.com/react@*/umd/react.production.min.js','react.js'),('https://unpkg.com/react-dom@*/umd/react-dom.production.min.js','react-dom.js'),('https://unpkg.com/@babel/standalone@*/babel.min.js','babel.js')]:
   context.route(pattern,lambda r,request,filename=filename:r.fulfill(path=str(Path(runtime_cache)/filename),content_type='application/javascript'))
  context.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(body='',content_type='text/css'))
 g.on('pageerror',lambda e:errors.append(str(e)));g.route(BASE,lambda r:r.fulfill(body=source,content_type='text/html'));g.goto(BASE,wait_until='networkidle');g.get_by_role('button',name='เข้าสู่ระบบ',exact=True).click();expect(g.locator('.bo-shell')).to_be_visible()
 def screen(id,record):
  g.evaluate('([id,record])=>window.__qaApp.openScreen(id,record)',[id,record]);expect(g.locator('.bo-screen-picker')).to_have_value(id);g.wait_for_function('document.querySelector(".bo-workspace .sc-placeholder")===null')
 def actor(role):
  g.get_by_role('button',name='เมนูบัญชีพนักงาน',exact=True).click();g.locator('#bo-persona').select_option(role)
 def advance(evidence=None):
  g.locator('.bo-workflow-action textarea').fill('Internal workflow note');
  if evidence:g.locator('.bo-workflow-action input').fill(evidence)
  g.locator('.bo-workflow-action button').click();expect(g.get_by_role('dialog')).to_be_visible();g.get_by_role('dialog').get_by_role('button',name='ยืนยัน',exact=True).click();expect(g.get_by_role('dialog')).not_to_be_visible()
 # Cross-menu regression: begin as a real submitted order fixture, then use saves and buttons only.
 g.evaluate("()=>{const app=window.__qaApp,order={...JSON.parse(JSON.stringify(window.BO_DATA.collections.orders[0])),id:'SO-UI-LINK',name:['SO-UI-LINK','SO-UI-LINK'],status:'submitted',fulfillment:'submitted',weight:12,tracking:'',checklist:'',workflowHistory:[]};app.setState({records:window.BO_WORKFLOW.reconcile({...app.state.records,orders:[...app.state.records.orders,order]})});}")
 actor('sales');screen('06-orders/detail','SO-UI-LINK');advance();advance()
 actor('warehouse');screen('06-orders/fulfillment','SO-UI-LINK');g.locator('#field-checklist').fill('Complete packing');g.get_by_role('button',name='บันทึกข้อมูล',exact=True).click();expect(g.get_by_role('status')).to_contain_text('บันทึกข้อมูลสาธิตแล้ว');advance();advance()
 booking=g.evaluate("window.__qaApp.state.records.bookings.find(b=>b.order==='SO-UI-LINK').id")
 screen('10-logistics/bookings','');expect(g.locator('.bo-data-table')).to_contain_text('SO-UI-LINK');expect(g.locator('.bo-data-table')).to_contain_text('แพ็กพร้อมส่ง')
 screen('10-logistics/booking-edit',booking);g.locator('#field-carrier').select_option('c5');g.locator('#field-round').select_option('ROUND-01');g.locator('#field-dispatchDate').fill('2026-10-14');g.locator('#field-reason').fill('Assign round and tracking');g.locator('#field-tracking').locator('xpath=ancestor::details').evaluate('(e)=>e.open=true');g.locator('#field-tracking').fill('UI-LINK-TRACK');g.get_by_role('button',name='บันทึกข้อมูล',exact=True).click();expect(g.get_by_role('status')).to_contain_text('บันทึกข้อมูลสาธิตแล้ว');expect(g.locator('.bo-workflow-action button')).to_be_enabled();advance()
 assert g.evaluate("window.__qaApp.state.records.orders.find(o=>o.id==='SO-UI-LINK').fulfillment")=='shipped'
 shipment=g.evaluate("window.__qaApp.state.records.shipments.find(r=>r.order==='SO-UI-LINK').id")
 screen('10-logistics/shipment-edit',shipment);g.locator('#field-tracking').fill('UI-LINK-CORRECTED');g.locator('#field-eta').fill('2026-10-15');g.locator('#field-evidence').locator('xpath=ancestor::details').evaluate('(e)=>e.open=true');g.locator('#field-evidence').fill('UI-LINK-POD');g.locator('#field-reason').fill('Customer delivery evidence');g.get_by_role('button',name='บันทึกข้อมูล',exact=True).click();expect(g.get_by_role('status')).to_contain_text('บันทึกข้อมูลสาธิตแล้ว')
 actor('support');screen('06-orders/detail','SO-UI-LINK');expect(g.locator('.bo-workflow-action input')).to_have_value('UI-LINK-POD');advance();expect(g.locator('.bo-workflow .is-current')).to_contain_text('ส่งมอบแล้ว')
 assert g.evaluate("['bookings','shipments'].every(k=>window.__qaApp.state.records[k].find(r=>r.order==='SO-UI-LINK').status==='delivered')")
 # Pickup shares the same order progress and uses appointment data instead of a parcel reference.
 g.evaluate("()=>{const app=window.__qaApp,order={...JSON.parse(JSON.stringify(window.BO_DATA.collections.orders[0])),id:'SO-UI-PICK',name:['SO-UI-PICK','SO-UI-PICK'],status:'confirmed',fulfillment:'packed',weight:12,tracking:'',workflowHistory:[]};app.setState({records:window.BO_WORKFLOW.reconcile({...app.state.records,orders:[...app.state.records.orders,order]})});}")
 actor('warehouse');screen('10-logistics/pickup-create','');g.locator('#field-order').select_option('SO-UI-PICK');g.locator('#field-date').fill('2026-10-14');g.locator('#field-slot').fill('10:00-11:00');g.locator('#field-recipient').fill('Customer');g.locator('#field-phone').fill('0815550000');g.get_by_role('button',name='บันทึกข้อมูล',exact=True).click();expect(g.get_by_role('status')).to_contain_text('บันทึกข้อมูลสาธิตแล้ว');advance()
 actor('support');screen('06-orders/detail','SO-UI-PICK');advance('SIGNED-PICKUP-UI');assert g.evaluate("window.__qaApp.state.records.pickups.find(r=>r.order==='SO-UI-PICK').status")=='delivered'
 # Start a fresh fixture and walk every order stage through the actual detail UI.
 g.evaluate("()=>Object.assign(window.__qaApp.state.records.orders[0],{status:'submitted',fulfillment:'submitted',weight:null,tracking:'',checklist:'',workflowHistory:[]})")
 actor('sales');screen('06-orders/detail','SO-2569-0001');advance();advance()
 actor('warehouse');screen('06-orders/detail','SO-2569-0001');expect(g.locator('.bo-workflow-action button')).to_be_disabled()
 g.locator('#workflow-weight').fill('12');g.get_by_role('button',name='บันทึกข้อมูลขั้นตอน',exact=True).click();expect(g.locator('.bo-workflow-action button')).to_be_enabled();advance()
 g.locator('#workflow-checklist').fill('Checked and packed');g.get_by_role('button',name='บันทึกข้อมูลขั้นตอน',exact=True).click();advance()
 expect(g.locator('.bo-workflow-action button')).to_be_disabled();g.locator('#workflow-carrier').select_option('c5');assert len(g.locator('#workflow-carrier option:checked').inner_text())>1;g.locator('#workflow-dispatch-date').fill('2026-10-13');g.locator('#workflow-tracking').fill('TRACK-DETAIL-001');g.get_by_role('button',name='บันทึกข้อมูลขั้นตอน',exact=True).click();expect(g.locator('.bo-workflow-action button')).to_be_enabled()
 g.screenshot(path=str(OUT/'order-detail-ready-to-ship.png'),full_page=True);advance();expect(g.locator('.bo-workflow .is-current')).to_contain_text('จัดส่งแล้ว')
 actor('support');screen('06-orders/detail','SO-2569-0001');advance('POD-DETAIL-001');expect(g.locator('.bo-workflow .is-current')).to_contain_text('ส่งมอบแล้ว')
 assert g.evaluate('window.__qaApp.state.records.orders[0].workflowHistory.length')==6
 actor('warehouse');screen('06-orders/detail','SO-2569-0002');expect(g.locator('.bo-workflow-action button')).to_be_disabled();expect(g.locator('.bo-workflow-summary')).to_contain_text('บัญชี')
 screen('06-orders/fulfillment','SO-2569-0005');expect(g.locator('#field-status')).to_have_count(0);g.locator('#field-checklist').fill('Packing checked')
 g.locator('#field-tracking').locator('xpath=ancestor::details').evaluate('(e)=>e.open=true');g.locator('#field-tracking').fill('DEMO-TRACK-005');g.get_by_role('button',name='บันทึกข้อมูล',exact=True).click();expect(g.get_by_role('status')).to_contain_text('บันทึกข้อมูลสาธิตแล้ว');assert g.evaluate('window.__qaApp.state.records.orders[4].fulfillment')=='packed'
 screen('06-orders/detail','SO-2569-0005');advance();expect(g.locator('.bo-workflow .is-current')).to_contain_text('จัดส่งแล้ว');expect(g.locator('.bo-workflow-summary')).to_contain_text('ลูกค้าสัมพันธ์');expect(g.locator('.bo-workflow-action button')).to_have_count(0)
 with g.expect_popup() as popup:g.get_by_role('link',name='เปิดมุมมองติดตามของลูกค้า').click()
 customer=popup.value;customer.wait_for_load_state();customer.on('pageerror',lambda e:errors.append(str(e)));expect(customer.locator('#tracking-status')).to_have_text('จัดส่งแล้ว');assert 'Internal workflow note' not in customer.locator('body').inner_text()
 actor('support');screen('06-orders/detail','SO-2569-0005');g.locator('.bo-workflow-action textarea').fill('Internal workflow note');g.locator('.bo-workflow-action button').click();expect(g.locator('.bo-workflow [role=alert]')).to_contain_text('หลักฐาน');advance('POD-DEMO-005');expect(g.locator('.bo-workflow .is-current')).to_contain_text('ส่งมอบแล้ว');expect(customer.locator('#tracking-status')).to_have_text('ส่งมอบแล้ว');assert 'POD-DEMO-005' not in customer.locator('body').inner_text();assert 'Internal workflow note' not in customer.locator('body').inner_text()
 actor('engineer');screen('08-services/job-detail','JOB-01');advance();expect(g.locator('.bo-workflow .is-current')).to_contain_text('กำลังทดสอบ');advance();expect(g.locator('.bo-workflow-action button')).to_be_disabled();screen('08-services/job-edit','JOB-01');expect(g.locator('#field-progress')).to_have_count(0)
 g.locator('#field-acceptance').locator('xpath=ancestor::details').evaluate('(e)=>e.open=true');g.locator('#field-acceptance').check();g.locator('#field-attachment').set_input_files({'name':'acceptance.pdf','mimeType':'application/pdf','buffer':b'demo'});g.locator('#field-reason').fill('Accepted work');g.get_by_role('button',name='บันทึกข้อมูล',exact=True).click();expect(g.get_by_role('status')).to_contain_text('บันทึกข้อมูลสาธิตแล้ว');advance();assert g.evaluate('window.__qaApp.state.records.jobs[0].progress')=='done';assert g.evaluate('window.__qaApp.state.records.jobs[0].payment')=='verifying'
 g.evaluate("()=>window.__qaApp.state.records.quotes[0].endDate='2099-12-31'");actor('sales');screen('07-quotes/detail','QT-2569-0001');advance();expect(g.locator('.bo-workflow .is-current')).to_contain_text('ส่งให้ลูกค้าแล้ว');advance('Customer accepted R1');expect(g.locator('.bo-workflow .is-current')).to_contain_text('ลูกค้าตอบรับแล้ว');expect(g.locator('.bo-workflow-action button')).to_be_disabled()
 screen('07-quotes/rfq','RFQ-QT-2569-0001');advance();advance();advance();expect(g.locator('.bo-workflow .is-current')).to_contain_text('มีใบเสนอราคาแล้ว')
 actor('manager');screen('06-orders/detail','SO-2569-0005');expect(g.locator('.bo-workflow-action button')).to_have_count(0);expect(g.locator('.bo-workflow-history')).to_contain_text('Internal workflow note')
 g.screenshot(path=str(OUT/'stepper-orders-th.png'),full_page=True)
 g.get_by_role('button',name='EN',exact=True).click();expect(g.locator('.bo-workflow .is-current')).to_contain_text('Delivered');g.screenshot(path=str(OUT/'stepper-orders-en.png'),full_page=True)
 for width in [768,375]:
  g.set_viewport_size({'width':width,'height':1000});assert g.evaluate('document.documentElement.scrollWidth<=innerWidth');g.screenshot(path=str(OUT/f'stepper-{width}.png'),full_page=True)
 customer.get_by_role('button',name='EN',exact=True).click();expect(customer.locator('#tracking-status')).to_have_text('Delivered');customer.screenshot(path=str(OUT/'stepper-customer.png'),full_page=True)
 g.reload(wait_until='networkidle');g.get_by_role('button',name='Sign in',exact=True).click();expect(g.locator('.bo-shell')).to_be_visible();screen('06-orders/detail','SO-2569-0005');expect(g.locator('.bo-workflow .is-current')).to_contain_text('Delivered')
 assert g.evaluate("['SO-UI-LINK','SO-UI-PICK'].every(id=>window.__qaApp.state.records.orders.find(o=>o.id===id).fulfillment==='delivered')")
 assert not errors,errors
 (OUT/'stepper-report.json').write_text(json.dumps({'passed':True,'checks':['cross-menu full lifecycle via fulfillment, booking, shipment evidence and support','pickup appointment to delivery','all six order transitions via detail UI and role handoffs','inline weight/checklist/carrier/date/tracking save unlocks next step','hold blocks workflow','metadata saves do not advance','warehouse to support handoff','delivery evidence required','engineer testing and handover acceptance','payment independent','quotation customer evidence and source order guard','RFQ sequential processing','read-only manager','customer live projection excludes internal notes and evidence','TH/EN','375/768/1600 layouts','persistence'],'errors':errors},indent=2),encoding='utf-8');b.close()
print('PASS: role stepper, evidence, handoffs, customer tracking, responsive layout and persistence')
