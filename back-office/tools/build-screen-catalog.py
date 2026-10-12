"""Compile the approved screen inventory into explicit, editable UI schemas.

The manifest supplies screen identity and reference paths, not executable rules.
Fields, page types and collections below are intentionally reviewed definitions.
"""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[2]
FIELDS = {}

def field(key, th, en, kind='text', options=None):
    FIELDS[key] = dict(key=key, label=[th,en], type=kind)
    if options: FIELDS[key]['options'] = options

for key,th,en in [
 ('name','ชื่อ','Name'),('nameEn','ชื่อภาษาอังกฤษ','English name'),('code','รหัสอ้างอิง','Reference code'),
 ('title','ชื่อเรื่อง','Title'),('titleEn','ชื่อเรื่องภาษาอังกฤษ','English title'),('email','อีเมล','Email'),('phone','โทรศัพท์','Phone'),
 ('recipient','ผู้รับ / ผู้ติดต่อ','Recipient / contact'),('taxId','เลขประจำตัวผู้เสียภาษี','Tax ID'),('branch','สาขา','Branch'),
 ('businessType','ประเภทธุรกิจ','Business type'),('sourceCode','รหัสต้นทาง','Source code'),('customerCode','รหัสลูกค้า SAP (จำลอง)','SAP customer code (mock)'),
 ('bank','ธนาคาร','Bank'),('accountName','ชื่อบัญชี','Account name'),('accountNumber','เลขบัญชี','Account number'),('chequeNumber','เลขเช็ค','Cheque number'),
 ('reference','เลขอ้างอิง','Reference'),('tracking','หมายเลขติดตาม','Tracking number'),('vehicle','ทะเบียนรถ / รถที่ใช้','Vehicle / registration'),('driver','ผู้ขับรถ','Driver'),
 ('province','จังหวัด','Province'),('district','อำเภอ / เขต','District'),('subdistrict','ตำบล / แขวง','Subdistrict'),('postcode','รหัสไปรษณีย์','Postcode'),
 ('alt','คำอธิบายภาพภาษาไทย','Thai image alt text'),('altEn','คำอธิบายภาพภาษาอังกฤษ','English image alt text'),('routeName','เส้นทาง','Route'),
 ('subject','หัวข้ออีเมล','Email subject'),('currency','สกุลเงิน','Currency'),('time','เวลา','Time'),('slot','ช่วงเวลารับสินค้า','Pickup slot'),
 ('latitude','ละติจูด','Latitude'),('longitude','ลองจิจูด','Longitude'),('cutoff','เวลาปิดรับงาน','Cutoff time'),('hours','เวลาเปิดรับสินค้า','Pickup hours'),
 ('invitation','อีเมลเชิญพนักงาน (จำลอง)','Staff invitation email (mock)'),('variables','ตัวแปรแม่แบบ','Template variables'),('cta','ปลายทางปุ่ม','Button destination'),
 ('filename','ชื่อไฟล์','File name'),('sla','เงื่อนไขบริการ / SLA','Service terms / SLA'),('expiryPolicy','อายุใบเสนอราคา','Quotation validity'),
 ('sequence','รูปแบบเลขเอกสาร','Document numbering'),('template','แม่แบบ','Template')]: field(key,th,en)
for key,th,en in [
 ('description','รายละเอียดภาษาไทย','Thai description'),('descriptionEn','รายละเอียดภาษาอังกฤษ','English description'),
 ('scope','ขอบเขตงาน','Scope of work'),('exclusions','สิ่งที่ไม่รวมในบริการ','Exclusions'),('reason','เหตุผล','Reason'),('note','หมายเหตุ','Notes'),
 ('message','ข้อความภาษาไทย','Thai message'),('messageEn','ข้อความภาษาอังกฤษ','English message'),('address','ที่อยู่','Address'),
 ('terms','เงื่อนไข','Terms'),('change','รายการที่เสนอแก้ไข','Proposed changes'),('evidence','หลักฐาน / ผลการตรวจ','Evidence / inspection outcome'),
 ('checklist','รายการตรวจสอบ','Checklist'),('bom','รายการอุปกรณ์ / BOM','Equipment / BOM'),('labor','ค่าแรงและขอบเขตงาน','Labor and scope'),
 ('results','ผลทดสอบ / ผลสำรวจ','Test / survey results'),('deliverables','รายการส่งมอบ','Deliverables'),('fields','รายการคำถามในฟอร์ม','Form fields'),
 ('closedDates','วันหยุดรับสินค้า','Pickup closed dates'),('before','ข้อมูลก่อนเปลี่ยน','Before'),('after','ข้อมูลหลังเปลี่ยน','After')]: field(key,th,en,'textarea')
for key,th,en in [
 ('amount','จำนวนเงิน (บาท)','Amount (THB)'),('allocation','ยอดจัดสรร (บาท)','Allocated amount (THB)'),('qty','จำนวน','Quantity'),
 ('shortage','จำนวนที่ขาด','Shortage quantity'),('displayOrder','ลำดับแสดง','Display order'),('weight','น้ำหนัก (กก.)','Weight (kg)'),
 ('maxKg','น้ำหนักสูงสุด (กก.)','Maximum weight (kg)'),('capacity','ความจุรอบที่เสนอ (กก.)','Proposed round capacity (kg)'),
 ('stops','จำนวนจุดส่งสูงสุด','Maximum delivery stops'),('base','ค่าขนส่งพื้นฐาน','Base freight'),('perKg','ค่าขนส่งต่อกิโลกรัม','Freight per kg'),
 ('surcharge','ค่าบริการเพิ่มเติม','Surcharge'),('surveyFee','ค่าสำรวจ (บาท)','Survey fee (THB)'),('creditLimit','วงเงินเครดิต (บาท)','Credit limit (THB)'),
 ('termDays','จำนวนวันเครดิต','Credit term (days)'),('discount','ส่วนลด (%)','Discount (%)'),('minSpend','ยอดซื้อขั้นต่ำ (บาท)','Minimum spend (THB)'),
 ('maxDiscount','ส่วนลดสูงสุด (บาท)','Maximum discount (THB)'),('perPerson','สิทธิ์ต่อคน','Uses per customer'),('totalLimit','จำนวนสิทธิ์รวม','Total uses'),
 ('retailMultiplier','ตัวคูณ Retail','Retail multiplier'),('partnerMultiplier','ตัวคูณ Partner','Partner multiplier'),('gradeMultiplier','ตัวคูณ Grade A','Grade A multiplier'),
 ('transferPercent','สัดส่วนโอน (%)','Transfer portion (%)'),('chequePercent','สัดส่วนเช็ค (%)','Cheque portion (%)'),('vat','VAT ตัวอย่าง (%)','Sample VAT (%)'),
 ('slotCapacity','จำนวนการรับต่อช่วงเวลา','Pickup slot capacity')]: field(key,th,en,'number')
for key,th,en in [
 ('date','วันที่','Date'),('startDate','วันเริ่มต้น','Start date'),('endDate','วันสิ้นสุด','End date'),('effectiveDate','วันที่มีผล','Effective date'),
 ('readyDate','วันที่พร้อมจัดเตรียม','Preparation ready date'),('dispatchDate','วันที่จัดส่ง','Dispatch date'),('eta','วันที่คาดว่าจะถึง','Expected delivery date'),
 ('receivedDate','วันที่รับ','Received date'),('depositDate','วันที่นำฝาก','Deposit date'),('clearedDate','วันที่เคลียร์','Cleared date'),('dueDate','วันครบกำหนด','Due date')]: field(key,th,en,'date')
SELECTS = {
 'product':('สินค้าจาก ERP','ERP product','@products'), 'customer':('ลูกค้า / บริษัท','Customer / company','@customers'),
 'order':('คำสั่งซื้อ','Order','@orders'), 'quote':('ใบเสนอราคา / ฉบับอ้างอิง','Quotation / revision','@quotes'),
 'lead':('คำขอบริการ','Service inquiry','@leads'), 'invoice':('ใบแจ้งหนี้','Invoice','@documents'),
 'owner':('ผู้รับผิดชอบ','Assignee','@staff'), 'carrier':('ผู้ขนส่ง','Carrier','@carriers'), 'round':('รอบจัดส่ง','Delivery round','@rounds'),
 'service':('บริการ','Service','@services'), 'entity':('รายการที่เกี่ยวข้อง','Related record','@orders'), 'booking':('Booking ที่จะจัดลงรอบนี้','Booking to assign to this round','@bookings'),
 'segment':('กลุ่มลูกค้า','Customer segment',['Retail','Partner','Grade A']), 'priceTier':('สิทธิ์รายการราคา','Price tier',['Retail','Partner','Grade A']),
 'type':('ประเภทสินค้า','Product type',['buy','rfq','consult','pkg']),
 'publication':('สถานะเผยแพร่','Publication',['draft','published','hidden','scheduled']),
 'category':('หมวดธุรกิจบนเว็บไซต์','Website business category',['green','auto','inst','gas','data','warehouse']),
 'group':('กลุ่มการขาย','Sales group',['ev','solar','battery','inverter','auto','instgas','infra']),
 'subgroup':('กลุ่มย่อย','Subgroup',['epc','accessory','install','cell']),
 'dimension':('ประเภทหมวดเว็บ','Taxonomy dimension',['category','group','subgroup']),
 'mediaType':('ประเภทสื่อ','Media type',['product','banner','service']),
 'paymentMethod':('วิธีชำระ','Payment method',['QR','transfer','credit','cheque']),
 'decision':('ผลพิจารณา','Decision',['approved','rejected']), 'priceDecision':('ผลอนุมัติรายการราคา','Price entitlement decision',['approved','rejected']), 'creditDecision':('ผลอนุมัติเครดิต','Credit decision',['approved','rejected']), 'paymentState':('ผลตรวจเงิน','Payment outcome',['verified','rejected']),
 'status':('สถานะ','Status',['draft','active','inactive']), 'chequeState':('สถานะเช็ค','Cheque state',['received','deposited','cleared','returned']),
 'progress':('ความคืบหน้างาน','Work progress',['scheduled','working','testing','handover','done']),
 'milestone':('งวดชำระ','Payment milestone',['30/40/30','100','50/50']), 'addressType':('ประเภทที่อยู่','Address type',['shipping','tax']),
 'role':('บทบาท','Role',['sales','warehouse','accounting','credit','engineer','support','admin','manager']),
 'dataScope':('ขอบเขตข้อมูล','Data scope',['assigned','warehouse','all']),
 'calculation':('วิธีคิดค่าบริการ','Calculation',['fixed','per-unit','percent','freight']),
 'event':('เหตุการณ์','Event',['order','PO','sourcing','quote-ready','quote-revised','quote-expired','survey','job','payment','shipping','invoice-due']),
 'channel':('ช่องทาง','Channel',['in-app','email']), 'language':('ภาษาเนื้อหา','Content language',['th','en']),
 'purpose':('ประเภทข้อความ','Message purpose',['transaction','promotion']),
 'sectionType':('ประเภทส่วนหน้าแรก','Homepage section',['hero','carousel','shortcuts','categories','featured','services','coupons','groups']),
 'documentType':('ประเภทเอกสาร','Document type',['quotation','invoice','receipt','tax','PO','survey','handover']),
 'source':('แหล่งข้อมูล','Source',['ERP','SAP','accounting','website-sample']),
 'fileAccess':('สิทธิ์ไฟล์','File access',['private','public-media']),
 'report':('รายงาน','Report',['orders-receipts','quote-conversion','lead-conversion','stock-reservation','aging','coupon','service-backlog'])
}
for k,(th,en,opts) in SELECTS.items(): field(k,th,en,'select',opts)
for k,th,en in [('image','รูปภาพ','Image'),('attachment','เอกสารแนบ','Attachment')]: field(k,th,en,'file')
for k,th,en in [('surveyRequired','ต้องสำรวจหน้างาน','Site survey required'),('isDefault','ที่อยู่หลัก','Default address'),('customerVehicle','ลูกค้าจัดรถเข้ามารับ','Customer-arranged vehicle'),('active','เปิดใช้งาน','Active'),('stackable','ใช้ร่วมโปรโมชั่นได้','Can stack with promotions'),('acceptance','มีหลักฐานการตรวจรับจากลูกค้า','Customer acceptance evidence available')]: field(k,th,en,'checkbox')

# Explicit screen definitions: kind | collection | fields (required suffix !).
DEFS = {}
def screens(module, entries):
    for slug,kind,collection,keys in entries:
        DEFS[module+'/'+slug] = dict(kind=kind,collection=collection,fields=keys.split())

screens('01-dashboard',[(s,'dashboard','orders','') for s in ['access-states','accounting','manager','sales','service','warehouse']])
screens('02-catalog',[
 ('list','list','products',''),('brands','list','brands',''),('erp-detail','detail','products',''),
 ('create','form','webProducts','product! title! description! descriptionEn image alt category! subgroup group! publication'),
 ('edit','form','webProducts','title! titleEn description! descriptionEn image! alt! altEn category! subgroup group! publication! note'),
 ('media','media','media',''),('media-edit','form','media','title! image alt! altEn displayOrder mediaType! note'),
 ('media-upload','form','media','image! title! mediaType! alt! altEn displayOrder note'),
 ('taxonomy','list','taxonomy',''),('taxonomy-create','form','taxonomy','dimension! code! name! nameEn group displayOrder image active'),
 ('taxonomy-edit','form','taxonomy','name! nameEn group displayOrder active reason!')])
screens('03-pricing',[
 ('list','list','prices',''),('approval','decision','discountRequests','quote! discount! reason! decision!'),
 ('create','form','priceMappings','sourceCode! priceTier! dataScope effectiveDate! reason!'),
 ('edit','form','priceMappings','sourceCode! priceTier! dataScope effectiveDate! reason!'),
 ('import','list','syncErrors',''),('preview','preview','products','')])
screens('04-inventory',[
 ('list','list','stock',''),('ledger','list','stockMovements',''),('return-receipt','detail','sourceReturns',''),
 ('sourcing','list','sourcing',''),('sourcing-create','form','sourcing','order! product! shortage! owner! readyDate! note message'),
 ('sourcing-edit','form','sourcing','shortage! owner! readyDate! message! reason!')])
screens('05-customers',[
 ('list','list','customers',''),('create','form','customers','name! email! phone! businessType taxId branch customerCode'),
 ('edit','form','customers','name! email! phone! businessType taxId branch customerCode reason!'),
 ('detail','detail','customers',''),('review','list','applications',''),
 ('credit-decision','decision','applications','customer! segment! priceTier! priceDecision! paymentMethod! creditLimit! termDays! creditDecision! reason!'),
 ('guest-link','form','guestLinks','lead! customer! evidence! reason!'),
 ('address-create','form','addresses','customer! addressType! recipient! phone! address! province! district! subdistrict! postcode! latitude longitude isDefault'),
 ('address-edit','form','addresses','recipient! phone! address! province! district! subdistrict! postcode! latitude longitude isDefault reason!')])
screens('06-orders',[
 ('list','list','orders',''),('detail','detail','orders',''),('holds','holds','orders',''),('warehouse-queue','list','orders',''),
 ('warehouse-approve','decision','orders','order! owner! readyDate! reason!'),
 ('fulfillment','form','orders','owner! readyDate! checklist! weight! carrier tracking dispatchDate attachment note'),
 ('amendment','form','amendments','order! change! reason! owner! attachment'),
 ('cancellation','decision','cancellations','order! reason! evidence! decision!'),
 ('returns','form','returns','order! product! qty! reason! attachment evidence')])
screens('07-quotes',[
 ('list','list','quotes',''),('detail','detail','quotes',''),('rfq','detail','rfqs',''),
 ('create','form','quoteDrafts','customer! reference! product! qty! scope! terms! endDate! email labor note'),
 ('edit','form','quoteDrafts','customer! reference! product! qty! scope! terms! endDate! email reason!'),
 ('revision','form','quoteRevisions','quote! change! reason! endDate! email'),
 ('sap-email','form','quoteDeliveries','quote! sourceCode! email! attachment note')])
screens('08-services',[
 ('list','list','services',''),('create','form','services','code! name! nameEn description! scope! exclusions image surveyRequired surveyFee template publication'),
 ('edit','form','services','name! nameEn description! scope! exclusions image surveyRequired surveyFee template publication'),
 ('form-builder','form','serviceForms','service! fields! bom labor note'),
 ('leads','list','leads',''),('lead-detail','detail','leads',''),('jobs','list','jobs',''),('job-detail','detail','jobs',''),
 ('job-edit','form','jobs','owner! date! results attachment deliverables acceptance milestone reason!'),
 ('survey-create','form','surveys','lead! owner! date! time! address! surveyFee checklist attachment'),
 ('survey-edit','form','surveys','owner! date! time! results! image attachment evidence note')])
screens('09-finance',[
 ('list','list','payments',''),('aging','list','receivables',''),('cheques','list','cheques',''),('credit-ledger','detail','credit',''),
 ('review','decision','payments','amount! reference! receivedDate! bank! invoice! allocation! paymentState! reason! attachment'),
 ('allocation-edit','form','allocations','reference! invoice! allocation! reason!'),
 ('cheque-create','form','cheques','bank! chequeNumber! amount! customer! invoice! receivedDate! dueDate! attachment'),
 ('cheque-edit','decision','cheques','chequeState! depositDate clearedDate evidence! reason!'),
 ('request-create','form','paymentRequests','customer! invoice! order amount! reference! paymentMethod! endDate!'),
 ('mixed-payment','form','mixedPolicies','customer! transferPercent! chequePercent! terms! reason!')])
screens('10-logistics',[
 ('list','list','carriers',''),('bookings','list','bookings',''),('rounds','list','rounds',''),
 ('booking-create','form','bookings','order! dispatchDate! carrier! round! note attachment'),
 ('booking-edit','form','bookings','dispatchDate! carrier! round! tracking reason!'),
 ('carrier-create','form','carriers','name! image base! perKg! surcharge maxKg! scope! eta active'),
 ('carrier-edit','form','carriers','name! base! perKg! surcharge maxKg! scope! eta active reason!'),
 ('pickup-create','form','pickups','order! date! slot! recipient! phone! customerVehicle vehicle driver note'),
 ('pickup-edit','form','pickups','date! slot! recipient! phone! customerVehicle vehicle driver evidence reason!'),
 ('round-create','form','rounds','date! time! carrier! vehicle! routeName! capacity! stops! owner! cutoff order'),
 ('round-edit','form','rounds','date! time! carrier! vehicle! routeName! capacity! stops! owner! booking displayOrder reason!'),
 ('shipment-create','form','shipments','order! carrier! tracking! dispatchDate! eta! qty! attachment'),
 ('shipment-edit','form','shipments','tracking! dispatchDate! eta! evidence reason!')])
screens('11-marketing',[
 ('list','list','campaigns',''),('wallet','list','wallet',''),
 ('campaign-create','form','campaigns','title! titleEn description! image product category service cta! terms startDate! endDate! segment! displayOrder publication'),
 ('campaign-edit','form','campaigns','title! titleEn description! image cta! terms startDate! endDate! segment! displayOrder publication reason!'),
 ('coupon-create','form','coupons','code! calculation! amount! minSpend! maxDiscount segment! perPerson! totalLimit! startDate! endDate! stackable'),
 ('coupon-edit','form','coupons','code! calculation! amount! minSpend! maxDiscount segment! perPerson! totalLimit! startDate! endDate! stackable reason!'),
 ('item-addon-create','form','itemAddons','name! nameEn calculation! amount! category product retailMultiplier partnerMultiplier gradeMultiplier'),
 ('item-addon-edit','form','itemAddons','name! nameEn calculation! amount! category product retailMultiplier partnerMultiplier gradeMultiplier effectiveDate! reason!'),
 ('order-addon-create','form','orderAddons','name! nameEn calculation! amount! carrier maxKg! startDate endDate terms!'),
 ('order-addon-edit','form','orderAddons','name! nameEn calculation! amount! carrier maxKg! terms! reason!')])
screens('12-content',[
 ('list','list','sections',''),('create','form','sections','sectionType! title! titleEn image alt! altEn cta! displayOrder! startDate endDate segment publication'),
 ('edit','form','sections','title! titleEn image alt! altEn cta! displayOrder! product service segment publication reason!'),
 ('history','history','contentVersions',''),('preview','preview','sections','')])
screens('13-documents',[
 ('list','list','documents',''),('files','list','files',''),('detail','document','documents',''),
 ('create','form','documents','documentType! source! entity! reference! title! attachment! fileAccess!'),
 ('draft-edit','form','documents','title! reference! date! template! entity! fileAccess! reason!'),
 ('revision-void','decision','documentRequests','reference! change! reason! decision!')])
screens('14-communication',[
 ('inbox','chat','conversations',''),('conversation','detail','conversations',''),('delivery','list','delivery',''),
 ('replies-list','list','replies',''),('replies-create','form','replies','title! category! language! message! messageEn active'),
 ('replies','form','replies','title! category! language! message! messageEn active'),
 ('template-list','list','templates',''),('template-create','form','templates','event! channel! language! subject! message! purpose! variables'),
 ('template-edit','form','templates','event! channel! language! subject! message! messageEn purpose! variables reason!')])
screens('15-settings',[
 ('overview','hub','staff',''),('audit','list','audit',''),('reports','dashboard','orders',''),('roles','roles','roles',''),
 ('staff-list','list','staff',''),('staff-create','form','staff','name! email! invitation role! dataScope! status!'),
 ('staff-edit','form','staff','name! email! role! dataScope! status! reason!'),
 ('role-create','form','roles','name! description! dataScope!'),('role-edit','form','roles','name! description! dataScope! reason!'),
 ('bank-create','form','banks','bank! accountName! accountNumber! branch currency! active effectiveDate!'),
 ('bank-edit','form','banks','bank! accountName! accountNumber! branch currency! active effectiveDate! reason!'),
 ('policies','form','policies','expiryPolicy! terms! milestone! stackable effectiveDate! reason!'),
 ('shop-edit','form','shop','name! nameEn currency! vat! address! maxKg! closedDates sequence!'),
 ('warehouse-edit','form','warehouseWeb','hours! closedDates slotCapacity! cutoff reason!'),
 ('imports','import','imports',''),('integrations','integrations','integrations','')])

EN = {'dashboard':'Dashboard','catalog':'Catalog','pricing':'Pricing','inventory':'Inventory','customers':'Customers','orders':'Orders','quotes':'Quotations','services':'Services','finance':'Finance','logistics':'Logistics','marketing':'Marketing','content':'Homepage content','documents':'Documents','communication':'Communication','settings':'Settings'}
MODULES = ['dashboard','catalog','pricing','inventory','customers','orders','quotes','services','finance','logistics','marketing','content','documents','communication','settings']
HOME = ['manager','list','list','list','list','list','list','list','list','bookings','list','list','list','inbox','overview']
TITLES = {'list':'List','create':'Create','edit':'Edit','detail':'Details','erp-detail':'ERP product details','approval':'Quotation discount review','import':'ERP price sync status','preview':'Preview','media':'Media library','media-upload':'Upload media','media-edit':'Edit media','taxonomy':'Website taxonomy','taxonomy-create':'Create website taxonomy','taxonomy-edit':'Edit subgroup','brands':'ERP brands','ledger':'Source warehouse history','return-receipt':'Source return inspection','sourcing':'Sourcing queue','sourcing-create':'Create sourcing task','sourcing-edit':'Edit sourcing task','review':'Review requests','credit-decision':'Company price and credit decision','guest-link':'Link guest contact','address-create':'Create customer address','address-edit':'Edit customer address','amendment':'Order amendment request','cancellation':'Cancellation request','fulfillment':'Prepare and pack goods','holds':'Holds and owners','returns':'Return and refund request','warehouse-approve':'Accept warehouse work','warehouse-queue':'Preparation queue','rfq':'RFQ details','revision':'Request quotation revision','sap-email':'SAP reference and email recipient','form-builder':'Service form and BOM','job-detail':'Job details and progress','job-edit':'Update service job','jobs':'Service jobs','lead-detail':'Service inquiry details','leads':'Service inquiries','survey-create':'Create survey appointment','survey-edit':'Edit survey and results','aging':'Receivables aging','allocation-edit':'Edit receipt allocation','cheque-create':'Receive cheque','cheque-edit':'Cheque deposit and clearance','cheques':'Cheque register','credit-ledger':'Company credit ledger','mixed-payment':'Transfer and cheque policy','request-create':'Create payment request','bookings':'Delivery bookings','booking-create':'Create delivery booking','booking-edit':'Edit delivery booking','carrier-create':'Create carrier','carrier-edit':'Edit carrier','pickup-create':'Create pickup booking','pickup-edit':'Edit pickup and handover','round-create':'Create delivery round','round-edit':'Edit delivery round','rounds':'Delivery rounds','shipment-create':'Record shipment','shipment-edit':'Amend tracking','campaign-create':'Create campaign','campaign-edit':'Edit campaign','coupon-create':'Create coupon','coupon-edit':'Edit coupon','item-addon-create':'Create item add-on','item-addon-edit':'Edit item add-on','order-addon-create':'Create order add-on','order-addon-edit':'Edit order add-on','wallet':'Coupon usage','history':'Publication history','files':'Private files and access','draft-edit':'Edit document draft','revision-void':'Document revision or void request','conversation':'Conversation follow-up','delivery':'Delivery log and preferences','inbox':'Customer support inbox','replies':'Edit canned reply','replies-list':'Canned replies','replies-create':'Create canned reply','template-create':'Create notification template','template-edit':'Edit notification template','template-list':'Notification templates','audit':'Audit history','bank-create':'Create receiving account','bank-edit':'Edit receiving account','imports':'Import website content','integrations':'Integration proposal','overview':'Settings, staff and reports','policies':'Commercial policies','reports':'Business reports','role-create':'Create role','role-edit':'Edit role','roles':'Roles and permissions','shop-edit':'Shop settings','staff-create':'Create staff member','staff-edit':'Edit staff access','staff-list':'Staff directory','warehouse-edit':'Pickup hours and dispatch cutoff','manager':'Manager overview','sales':'Sales overview','accounting':'Accounting overview','warehouse':'Warehouse overview','service':'Service team overview','access-states':'Report access states'}
manifest=json.loads((ROOT/'graphic/back-office/manifest.json').read_text(encoding='utf-8'))
result=[]
for s in manifest['screens']:
    if s['folder']=='00-auth': continue
    assert s['id'] in DEFS, 'Screen requires an explicit UI definition: '+s['id']
    definition=DEFS[s['id']]
    i=int(s['folder'].split('-')[0])-1; module=MODULES[i]
    fields=[]
    for token in definition['fields']:
        k=token.rstrip('!'); assert k in FIELDS,k
        fields.append(dict(FIELDS[k],required=token.endswith('!')))
    slug=s['slug']; en=TITLES[slug]
    if slug in ['list','create','edit','detail','preview']: en=EN[module]+' — '+en
    result.append(dict(id=s['id'],module=module,slug=slug,title=[s['title'],en],kind=definition['kind'],collection=definition['collection'],fields=fields,reference=s['path'],spec=s.get('spec',''),create=slug.endswith('create') or slug in ['create','media-upload'],home=slug==HOME[i]))
assert len(result)==134
catalog={'screens':result,'modules':[dict(id=m,folder=f'{i+1:02d}-'+m,home=next(s['id'] for s in result if s['module']==m and s['home'])) for i,m in enumerate(MODULES)]}
(ROOT/'back-office/screen-catalog.js').write_text('// Generated from explicit UI schemas and the approved 137-screen manifest.\nwindow.BO_CATALOG = '+json.dumps(catalog,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
lines=['# รายการหน้าจอ Back-office ที่สร้างแล้ว','',
       'ต้นแบบมีหน้า authentication 3 หน้า และ content 134 หน้า ใช้ schema ของแต่ละหน้ากับ presentation templates ร่วมกัน ไม่ได้ใช้ภาพ PNG แทน UI','',
       'ภาพอ้างอิงเป็นแนวทาง composition และสี ตัวเลข/SKU ใช้ข้อมูลสาธิตจาก storefront และ fixture ของ Back-office ระบบจริงและ field mapping ยังรอยืนยันตามแผน','',
       'หน้า authentication: `StaffLogin.dc.html`, `ForgotPassword.dc.html`, `ResetPassword.dc.html`','',
       'หน้า content ทั้งหมดเปิดผ่านเมนูหลักและ Select กลุ่มข้อมูล/งานใน Filter block ด้านบน; เส้นทางอยู่ใน `state.screen` ไม่ใช่ URL path','']
for module in MODULES:
    pages=[s for s in result if s['module']==module]
    lines += [f'## {module} — {len(pages)} หน้า','', '| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |','|---|---|---:|---|']
    for p in pages: lines.append(f'| {p["title"][0]} (`{p["id"]}`) | {p["kind"]} | {len(p["fields"])} | [ภาพ](../graphic/back-office/{p["reference"]}) |')
    lines += ['']
(ROOT/'back-office/SCREEN_COVERAGE.th.md').write_text('\n'.join(lines),encoding='utf-8')
print(f'Built {len(result)} content screens with {sum(len(s["fields"]) for s in result)} field definitions.')
