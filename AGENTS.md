# AGENTS.md — Polytechnology Commerce

คู่มือกลางสำหรับ repository ทั้งหมด: `store-front/`, `back-office/`, `verification/` และไฟล์ระดับ root จัดทำจาก source และสคริปต์ที่มีอยู่ ณ 12 ตุลาคม 2026 จำนวนข้อมูลและหน้าจอด้านล่างเป็น snapshot ปัจจุบัน ให้ตรวจโค้ดอีกครั้งเมื่อแก้ข้อมูลหรือ schema

## 1. วิธีใช้คู่มือนี้

- อ่านคู่มือนี้ก่อนเริ่มงาน และอ่าน `AGENTS.md` ที่อยู่ใต้โฟลเดอร์งานด้วย ปัจจุบันมีคู่มือเฉพาะใน `store-front/AGENTS.md`
- คำสั่งล่าสุดของผู้ใช้มีลำดับเหนือคำแนะนำในเอกสาร คู่มือย่อยเพิ่มข้อกำหนดเฉพาะพื้นที่; ถ้าข้อมูลเชิงข้อเท็จจริงขัดกัน ให้เทียบ implementation และ tests ปัจจุบันก่อนแก้
- ตอบผู้ใช้เป็นภาษาไทย กระชับ ระบุสิ่งที่เปลี่ยน ผลตรวจ และข้อจำกัดที่พบจริง
- แก้เฉพาะขอบเขตงาน รักษาพฤติกรรมของ flow อื่น ไม่เพิ่ม framework, backend หรือ build pipeline โดยไม่มีเหตุผลจากงาน
- ตรวจ `git status --short` ก่อนแก้และก่อนส่งงาน รักษาการเปลี่ยนแปลงเดิมของผู้ใช้ ไม่ reset, overwrite หรือ clean ไฟล์ที่ไม่ใช่งานของตน
- ไม่ commit, push หรือ deploy เองจนกว่าผู้ใช้จะสั่ง

## 2. ภาพรวมและขอบเขตระบบ

นี่คือต้นแบบ e-commerce ภาษาไทย/อังกฤษสำหรับ Polytechnology มีหน้าร้าน B2C/B2B และหลังบ้านพนักงาน เป็น static websites สองชุดที่เปิดและ deploy แยกกัน

- ไม่มี backend, database กลาง, server-side authentication/RBAC หรือการเชื่อม ERP/SAP/bank/carrier จริง
- ราคา สต็อก เครดิต การชำระเงิน ใบเสนอราคา เอกสาร อีเมล แชต และ workflow ทั้งหมดเป็นข้อมูล/การทำงานจำลองใน browser
- ไม่มี `package.json`, npm scripts หรือขั้น build ของ application; Node ใช้กับเครื่องมือและ tests, Python ใช้ serve static files และ browser/image checks
- ทั้งสองเว็บใช้ Design Component runtime ใน `support.js`, React 18.3.1/ReactDOM จาก CDN และ Sarabun; runtime มี Babel standalone สำหรับเส้นทางที่ต้อง transpile
- หน้าร้านใช้ Leaflet และ CARTO tiles ใน address modal และยังมี helper/reference รูปจาก Wikimedia จึงต้องเผื่อ external network dependencies ขณะ preview
- Routing หน้าร้านเก็บรายละเอียดใน application state และ sync หน้าหลัก/detail กับ clean URL ผ่าน History API; หลังบ้านยัง route ผ่าน state ส่วน `tracking.html` ใช้ query string

### การไหลของข้อมูล

```text
store-front/index.html: constants + Component state + business rules
  -> renderVals/renderAllVals -> props -> store-front/*.dc.html
  -> localStorage plt_proto_v2

store-front catalogue
  -> back-office/tools/export-store-seed.cjs (รันเองเมื่อจะ refresh fixtures)
  -> back-office/store-seed.js + assets/products/*.png
  -> business-data.js -> BO_DATA.collections

screen-catalog.js + BO_DATA + workflow.js
  -> back-office/index.html: Component controller
  -> renderVals/contentVM -> LayoutShell -> ContentOutlet -> shared templates
  -> editable records + audit -> localStorage plt_bo_content_v1
  -> publicRecord -> localStorage plt_bo_tracking_v1 -> tracking.html/tracking.js
```

การ export เป็นสำเนาทางเดียว ไม่ใช่ sync ขณะใช้งาน การแก้หลังบ้านไม่เผยแพร่ไปหน้าร้าน และบัญชี/เลขเอกสารของสองต้นแบบไม่ได้ใช้ identity กลางเดียวกัน

## 3. แผนที่ไฟล์และผู้รับผิดชอบ logic

| พื้นที่/ไฟล์ | หน้าที่และจุดแก้หลัก |
| --- | --- |
| `README.md` | วิธี preview/deploy หน้าร้านและภาพรวม repository |
| `CLAUDE.md` | handoff เก่า มีข้อมูลโครงสร้างเดิมและเลขบรรทัดประวัติ; ห้ามใช้เป็นตำแหน่งแก้โดยไม่ตรวจ source |
| `.gitignore` | ไม่ติดตาม lockfile, node_modules, secrets, cache และบางเอกสารประวัติ |
| `HOME_REDESIGN_PLAN.md` | แผน/ข้อกำหนด redesign ในเครื่อง ถูก ignore; ใช้ประกอบได้แต่ไม่ใช่ implementation |
| `store-front/index.html` | entry, global/page CSS, constants, state, route flags, handlers และ view models ของหน้าร้าน |
| `store-front/*.dc.html` | presentation templates รายหน้า/ส่วน ไม่มี domain state ของตัวเอง |
| `store-front/support.js` | generated runtime; ห้ามแก้ |
| `store-front/assets/` | ภาพสินค้า หมวด โลโก้ และภาพแต่ละหน้า |
| `store-front/PRODUCT_IMAGE_CATALOG.md` | mapping สินค้า/SKU/ภาพ ใช้เทียบกับ PRODUCTS ปัจจุบัน |
| `store-front/tests/` | Node regression, browser checks และเครื่องมือทำ WebP |
| `back-office/index.html` | auth จำลอง, navigation, permissions/scope, validation, workflow controller, CRUD และ view models |
| `back-office/styles.css` | tokens, auth, responsive shell, tables/forms, workflow/tracking และ print styles |
| `back-office/store-seed.js` | generated storefront snapshot ประกาศ `window.BO_STORE` |
| `back-office/business-data.js` | fixture collections, columns, roles, readonly collections, labels ประกาศ `window.BO_DATA` |
| `back-office/screen-catalog.js` | generated screen schema ประกาศ `window.BO_CATALOG` |
| `back-office/workflow.js` | sequential workflow definitions, resolver, customer projection และ logistics reconciliation ใน `window.BO_WORKFLOW` |
| `back-office/tracking.html`, `tracking.js` | หน้าลูกค้าดู projection สถานะใน browser/origin เดียวกัน |
| `back-office/*.dc.html` | auth, persistent shell และ shared presentation templates |
| `back-office/support.js` | generated runtime ของหลังบ้าน; ห้ามแก้หรือคัดลอกทับจากอีกเว็บเอง |
| `back-office/tools/` | export storefront seed และ generate screen catalog/coverage |
| `back-office/tests/` | domain regression และ browser workflow/auth/shell/filter checks |
| `back-office/README.th.md`, `SCREEN_COVERAGE.th.md` | คู่มือหลังบ้านและรายการ route/schema หน้าจอ |
| `verification/` | สคริปต์ตรวจเฉพาะหน้า ภาพ/JSON reports และ dependencies ชั่วคราว; ไม่ใช่ application source หรือ deployment root |
| `store-front/vercel.json`, `back-office/vercel.json` | static deploy config ของแต่ละเว็บ |

อย่าอ้างไฟล์ monolith/standalone รุ่นเก่าที่ถูกลบแล้ว ไม่มี application อยู่ที่ root `index.html`

## 4. ข้อตกลง Design Component

1. Entry ใช้ `<x-dc>` เป็น template และ `<script type="text/x-dc" data-dc-script>` ประกาศ `class Component extends DCLogic`.
2. Binding ใช้ `{{ expression }}`, `<sc-if value="{{ flag }}">`, `<sc-for list="{{ rows }}" as="row">` และ handlers เช่น `onClick="{{ row.pick }}"`.
3. Component import ใช้ `<dc-import name="Name" dcProps="{{ all }}"></dc-import>`; runtime fetch `Name.dc.html` ใน directory เดียวกับ entry ชื่อและ case ต้องตรงกันบน Linux.
4. ทั้งสอง Component คืน view model จาก `renderVals()` แล้วตั้ง `v.all = v`; ส่วนใหญ่ส่ง object นี้ไป child. ข้อยกเว้นหลังบ้านคือ `FormFields` รับ `requiredFormProps`/`optionalFormProps` ซึ่งมีเฉพาะ field-list และ props ที่ต้องใช้.
5. ค่าหรือ handler ที่ template อ้างต้องมีใน view model หรือ loop scope ห้ามสร้าง binding โดยไม่ได้ต่อค่าจาก controller.
6. รักษา document wrapper ของ child ที่มีอยู่ และเก็บ `.dc.html` ข้าง entry ไม่ย้ายเข้า subdirectory โดยพลการ.
7. รักษา CSS `#dc-root .sc-host .sc-host { display:contents; }` ทั้งสองเว็บ; nested host wrappers ต้องไม่เปลี่ยน grid/flex layout.
8. Logic, validation, การคำนวณ และสถานะอยู่ใน controller/helper; template รับค่าพร้อมแสดงและ callbacks ใช้ immutable `setState` กับ nested arrays/objects.
9. อย่าแก้ generated runtime เพื่อ workaround ปัญหาเฉพาะหน้า ทั้งสอง `support.js` ไม่จำเป็นต้องมีเนื้อหาเหมือนกันทุก byte.
10. ระวัง browser request URL interpolation ดิบก่อน runtime resolve โดยเฉพาะ `img` ใน conditional. ตรวจ error ใหม่แยกจาก benign initial request `{{ hero.photo }}` ที่เอกสารเดิมระบุไว้.
11. Quote detail ของหน้าร้านใช้ state/button toggles แทน dynamic `details open/onToggle` ที่เคยทำให้ runtime scope เสีย; หลังบ้านมี static `details` ใช้งานอยู่ อย่าขยายข้อห้ามนี้เป็นการห้าม element ทุกกรณี.

## 5. หน้าร้าน: โครงสร้างและ flow

### Routing และ presentation

`state.route.p` เลือก `home`, `products`, `pdp`, `services`, `promos`, `about`, `contact`, `coupons`, `cart`, `checkout`, `success`, `rfq`, `register`, `account`. ใช้ `go(page, extra)` ซึ่งปิดเมนูและ scroll; `go('login')` เปิด modal ไม่ใช่หน้า login ปกติ

- `urlForNavigation()` แปลง route/tab เป็น clean path, `navigationFromPath()` ทำงานย้อนกลับ และ `componentDidUpdate()` push history เมื่อหน้าเปลี่ยน; `popstate` คืน state สำหรับ Back/Forward.
- URL เป็น source of truth ตอนเปิดตรงหรือ refresh และ `vercel.json`/`store-front/serve.py` ต้องมี SPA fallback ไป `index.html`; รักษา `<base href="/">` เพื่อให้ assets และ `.dc.html` โหลดจาก deployment root.
- PDP อ้าง `route.id`; Services อ้าง `route.svc`.
- `Account.dc.html` เลือกแท็บผ่าน `state.tab`; detail อ้าง `route.oid`, `route.qid`, `route.lid`.
- Overlays อ้าง `loginModal`, `addrDraft`, `modal`; แชตและ toast มี state แยก.
- `DemoBar`, `Header`, `Footer`, `ChatWidget`, `Toast` เป็น shared chrome. ปัจจุบัน `DemoBar.dc.html` มี `display:none`; ไม่สมมติว่าผู้ใช้เปิด scenarios จาก UI ได้โดยตรง.

| กลุ่ม templates | หน้าที่ |
| --- | --- |
| `Home` | overview + campaign carousel, 4 shortcuts, 6 ธุรกิจ, 4 สินค้าแนะนำ, 5 บริการ, คูปอง และ optional `homeRows` |
| `Products`, `Pdp` | catalogue/search/filter/sort/pagination, grid/list, detail/gallery/spec/quantity/add-ons/CTA |
| `Services`, `Promos`, `Coupons`, `About`, `Contact` | บริการ/คำปรึกษา, segment offers, wallet และข้อมูลบริษัท |
| `Cart`, `Checkout`, `Success` | ตะกร้า/saved/add-ons/coupon, 4-step checkout, ผลสั่งซื้อและ payment panel |
| `Rfq`, `Register`, `LoginModal` | RFQ พร้อมรายการ/ไฟล์ชื่อจำลอง, สมัครบุคคล/บริษัท และ demo login |
| `AccountProfile`, `AccountAddresses`, `AccountCredit` | profile/address book/เครดิตและ invoices |
| `AccountOrders`, `AccountOrderDetail` | รายการ/detail, holds, tracking, milestones, payment และเอกสาร |
| `AccountQuotes`, `AccountQuoteDetail` | รายการ/detail, revision/history, accept/reject/renew และ conversion |
| `AccountLeads`, `AccountLeadDetail` | consultation/survey และ lead → quote → order |
| `AccountDocs`, `AccountNotifications` | ค้นหาเอกสาร และ notifications/preferences |
| `AddressModal`, `DocumentModal` | address editor/Leaflet และเอกสารตัวอย่าง/print |

ชื่อในตารางคือไฟล์ `.dc.html`. เมื่อต่อหน้าใหม่ต้องเพิ่ม template, route flag/import, view model/handler และตรวจเข้า-ออกหน้านั้นครบ

### Catalogue, taxonomy และราคา

- `PRODUCTS` มี 61 รายการ: ประกาศ `p1`–`p16` โดยตรง และเพิ่มอีก 45 รายการผ่าน `_np`/helper `P()`.
- Product types ปัจจุบัน: `buy` 53, `rfq` 5, `consult` 2, `pkg` 1. CTA ใช้ `productVM()`/`addToCart()` เพื่อเข้า flow ตาม type.
- ข้อมูลหลัก: stable `id`, `sku`, `brand`, `cat/grp/sub`, `type`, `w`, `stock`, `pop`, ชื่อ/หน่วย/คำอธิบาย `n/u/d`, ราคา `pr`, specs `sp`, optional MOQ/site.
- `pr` คือ retail/partner/gradeA; `null` หมายถึงไม่มีราคาซื้อตรง ไม่ใช่ราคา 0. ใช้ `price()`, `priceVM()`, `stockOf()`, `stockVM()` เป็นจุดคำนวณร่วม.
- `CATS` คือ 6 ธุรกิจ `green/auto/inst/gas/dc/wh`; `GROUPS` คือ 7 merchandising groups `ev/solar/battery/inverter/auto/inst/infra`; `SHOP_CATS` คือ 9 หมวด filter. อย่าใช้แทนกัน.
- `shopCategory()` แตกสินค้า `green` ตาม `grp`; `browseHomeCategory()` ใช้ `shopCategoriesFor()` และล้าง filters/search เก่า. หน้า Home คลิกธุรกิจแล้วต้องได้รายการตรงธุรกิจแม้มี filters ค้าง.
- ภาพสินค้าใช้ `assets/SKU.png` ผ่าน `photo()`; มี product shots 61 รายการ สำเนาหลังบ้านอยู่ `assets/products/`.

| บัญชีสาธิต | Price index | เงื่อนไขหลัก |
| --- | --- | --- |
| `guest` | 0 | ไม่ login; เก็บคูปอง/checkout ต้องเข้าสู่ระบบ |
| `walkin` | 0 | บุคคลทั่วไป ชำระทันที |
| `bizNew` | 0 | บริษัทใหม่ ชำระทันที/ขอราคา ยังไม่มีเครดิต |
| `partner` | 1 | เครดิต 30 วัน ตาม capability และวงเงิน |
| `gradeA` | 2 | เครดิต 45 วัน และ PO/approval/cheque ตาม capability |

ข้อความสองภาษาใช้ `[thai, english]` ผ่าน `tx()`, ข้อความเฉพาะจุดใช้ `m(th, en)`, คำร่วมอยู่ `L` แล้วแปลงเป็น `t`. ข้อความ UI ใหม่ต้องรองรับทั้งสองภาษา

### Cart, checkout และ payment

- Cart line ใช้ `id/q` และ optional `ad`; add-on selections ยังมี `pdpAd` และ checkout `ck.oAd`. `cartRows()` สร้าง rows และ `totals()` รวมสินค้า ส่วนลด add-ons ขนส่ง VAT และ total.
- น้ำหนักใช้ `weightOf()` และ `MAXW = 300`: 300 กก.ผ่าน, มากกว่า 300 หรือสินค้าที่ต้องชั่งแต่ไม่มีน้ำหนักถูก block. `pkg/consult` ไม่ถูกรวมน้ำหนักแบบสินค้า.
- Carriers `c1`–`c5` มีเพดานจำลอง 70/50/30/60/300 กก.; ต้องตรวจ `carrierOk()` แยกจากเพดาน order.
- Checkout `ck.step` คือ 1 ผู้ซื้อ/ที่อยู่, 2 delivery/pickup, 3 payment, 4 review. ก่อน confirm ต้อง login, ผ่าน weight/mixed-cart/stock/address/payment/credit checks.
- Mixed buy/RFQ cart ต้องแยกเข้าคำขอราคา; consulting items เข้าบริการ ไม่บังคับซื้อทันทีด้วย template.
- Item add-ons เลือกใน PDP/Cart; delivery add-ons ขึ้นกับ carrier/mode/น้ำหนักในขั้น 2. VAT ปัจจุบันคำนวณ 7% ผ่าน helpers.
- Coupon eligibility/ขั้นต่ำ/collected/used ผูก wallet ต่อบัญชี และใช้ `collectCoupon()`/`applyCode()`/`totals()`. Guest login แล้ว flow เก็บคูปองเดิมต้องต่อได้.
- `confirmOrder()` สร้าง snapshot และ references; payment progress กับ fulfillment เป็นคนละเรื่อง. Holds ได้แก่ `approval/seller/credit/payment/verify`; ปลดเฉพาะ hold ของการกระทำนั้น.
- QR/slip/transfer/credit/cheque และ verification เป็น simulation ห้ามอธิบายว่าเป็นการรับเงินจริง.

### Quotes และ services

- Instant cart quote, RFQ และ service quote มีเส้นทางต่างกัน; helpers หลักคือ `buildLines()`, `priceQuote()`, `serviceQuote()`, `quoteTotals()` และ `qStatus()`.
- รักษา `rev`, `accRev`, `history`, `exp`, accepted price snapshot และ references. อายุจาก `POLICY.quoteDays` ปัจจุบัน instant 7, RFQ 21, service 30, renew 14 วัน.
- `orderFromQuote()` ตรวจ accepted/expiry/weight/stock change และป้องกัน duplicate order. ตะกร้าที่อ้าง accepted quote ล็อกการแก้ lines/coupon/add-ons; เปลี่ยนรายการต้องกลับไป revision หรือยกเลิก quote reference.
- Services `s1`–`s5`: consulting/design, integration/installation, calibration/training, maintenance/after-sales, data-center solutions.
- `submitService()`/`leadNext()`/`createLeadQuote()` เชื่อม lead → survey → quote; `createServiceOrder()` เชื่อม quote → order ด้วย `leadId/quoteId/orderId`.
- `SVC_EXTRA` กำหนด fields รายบริการ, `SVC_QUOTE` เป็น BOM/labour, `POLICY` กำหนด survey fee และ milestone plans. งานเสร็จ/ตรวจรับไม่ได้แปลว่าจ่ายครบ.

### State, persistence และ lifecycle

- `componentDidMount()` โหลด `plt_proto_v2`; saved data ที่ seeded ถูก merge orders/quotes/leads จาก seed ตาม `id` เพื่อเติม fixtures ที่ยังไม่มี.
- `componentDidUpdate()` วัด header, reset identity เมื่อเปลี่ยน account, โหลด carriers เมื่อเข้า checkout ขั้น 2 และเรียก `persist()`.
- Persist จริงเฉพาะ `lang/acct/route/tab/cart/saved/coupon/wallet/orders/quotes/leads/notifs/ck/form/lastOrder/lastQuote/pendingApproval/regCo/seeded`.
- State บางอย่าง เช่น filters, address book, `pdpAd`, stock adjustments และ carousel controls ไม่ได้บันทึกใน payload ปัจจุบัน อย่าสมมติว่าทุก state อยู่หลัง refresh.
- เพิ่ม state ให้ตรวจ initial state, `resetDemo()`, `resetIdentity()` และ `persist()` ตามอายุข้อมูล; ไม่เปลี่ยน storage key เพื่อล้างปัญหาโดยไม่จำเป็น.
- Timers ปัจจุบัน: hero 7 วินาที, stock simulation 9 วินาที, clock 1 วินาที. Hero pause ขณะ hover/focus/manual pause/reduced motion; timer/listener ใหม่ต้อง cleanup.
- `scenarioDefs()` มี `sc1`–`sc16` สำหรับ B2C/B2B/credit/PO/quote/service/expiry/stock/weight/mixed cart/delivered credit. ใช้ logic/tests หรือ test-only hook เมื่อ DemoBar ถูกซ่อน.
- Editor prop ที่ใช้งานจริงคือ `showCategoryRows`; `showDemoBar/defaultSegment/maxOrderWeightKg` ยังไม่ได้เชื่อมกฎ/initial state ตามชื่อ prop.

### Layout และภาพหน้าร้าน

- ปัจจุบัน `html/body` และ `state.w` มีขั้นต่ำ 1240px; content จำกัดสูงสุด 1680px พร้อม gutter `clamp(24px,2.5vw,48px)`. หน้าจอเล็กเลื่อนแนวนอนโดยตั้งใจ ไม่ปรับกลับเป็น mobile layout ตามคำแนะนำเก่าเอง.
- รักษา Footer เดิม: ห้ามเปลี่ยน `Footer.dc.html`, shared CSS หรือ view model ให้รูปแบบ/เนื้อหา/ลิงก์/พฤติกรรม Footer เปลี่ยนในงานปรับหน้าอื่น เว้นแต่ผู้ใช้สั่งแก้ Footer โดยตรง.
- Home มี 5 slides (overview + 4 campaigns), 4 สินค้าเรียง `pop`, 6 ธุรกิจ, 5 บริการ และสูงสุด 5 coupons ตามสิทธิ์. อย่า hardcode ราคา/สถานะจากภาพ reference.
- ภาพ Home อยู่ `assets/homepage/`: PNG ต้นฉบับ 12 ภาพ + WebP 1280px/640px และ overview hero 2172px. ใช้ mapping stable id ใน view models.
- รักษา `srcSet/sizes`, lazy loading ภาพด้านล่างและ hero PNG fallback; `homeHeroImageError()` ต้องล้าง failed srcset ก่อนเปลี่ยน src.
- `assets/about/`, `contact/`, `services/`, `promotions/` มีภาพและเอกสาร/prompts ประกอบ เป็นภาพแนวคิด ไม่ใช่หลักฐานภาพบุคลากร/สถานที่จริง. ข้อความ ชื่อ ราคา และ CTA ต้องเป็น HTML สองภาษา.

## 6. หลังบ้าน: schema, permissions และ workflow

### Boot และหน้าจอ

โหลด scripts ตาม dependency: `store-seed.js` → `screen-catalog.js` → `business-data.js` → `workflow.js` → `support.js`. State เริ่มจาก deep clone fixtures แล้ว `BO_WORKFLOW.reconcile()`; อย่าแก้ source fixture ร่วมผ่าน reference ใน state

- `state.route` คือ `login/forgot/reset/workspace`; `state.menu` เลือก module, `state.screen` เลือก screen ID, `state.selected` เลือก record.
- `openScreen()` ตรวจ read permission/scope, เตรียม blank create form หรือ prefilled edit form และล้าง filters/drafts/confirmation ที่ควร reset.
- Login ปัจจุบันใช้ `staff@polytechnology.demo` / `PolytechDemo!` และ actor `demo`; credentials เป็น demo defaults ที่อยู่ใน source.
- Login ผิด 5 ครั้งล็อกจำลอง 30 วินาที; forgot resend 30 วินาที; reset grant ใน memory อายุ 10 นาที ใช้ครั้งเดียว รหัสใหม่ใช้เฉพาะแท็บจน refresh ไม่ส่งอีเมลจริง.
- ไม่เก็บ password/session ถาวร Refresh กลับ login. `LoginSuccess.dc.html` เป็น compatibility shim ของแท็บเก่า ใช้ sessionStorage `plt_bo_shell_upgrade` ครั้งเดียวแล้วลบ ไม่ใช่ auth route ใหม่.

Content มี 134 screens และ 561 field instances ใน generated catalog ปัจจุบัน (README เก่าระบุ 560). Auth 3 screens อยู่แยกจาก catalog

| Module ID | จำนวน content screens | งานหลัก |
| --- | ---: | --- |
| `dashboard` | 6 | metrics/report views ตามฝ่าย |
| `catalog` | 11 | ERP product read-only, web copy/media/taxonomy |
| `pricing` | 6 | ERP prices, customer tier mapping, discount review |
| `inventory` | 6 | source stock/history และ sourcing requests |
| `customers` | 9 | บริษัท/ใบสมัคร/ที่อยู่ และแยก price/credit decisions |
| `orders` | 9 | order details, holds, fulfillment, amendments/cancellation/returns |
| `quotes` | 7 | RFQ, SAP draft/revision/reference/delivery |
| `services` | 11 | services, leads/surveys/jobs และ forms/BOM |
| `finance` | 10 | payment verification, allocations, aging, cheque และ policies |
| `logistics` | 13 | carriers/bookings/rounds/shipment/pickup |
| `marketing` | 10 | campaigns/coupons/item/order add-ons/wallet |
| `content` | 5 | homepage sections, preview, versions/rollback |
| `documents` | 6 | snapshots/private files/draft/revision requests |
| `communication` | 9 | inbox/canned replies/notification templates/delivery logs |
| `settings` | 16 | users/roles/audit/reports/banks/policies/import/integrations |

`screen-catalog.js` นิยาม `id/module/slug/title/kind/collection/fields/create/home` และ reference metadata. URL ไม่เปลี่ยนตาม screen ID; สลับหน้าผ่าน controller

### Shared presentation

- `LayoutShell` มี `Sidebar`, `Topbar` และ `ContentOutlet` คง shell ระหว่างเปลี่ยน content.
- `ContentOutlet` แสดง heading/breadcrumb, `FilterBlock`, optional `WorkflowStepper` แล้วเลือก template ตาม page kind.
- `ListPage`/`DataTable` ใช้ table VM; `FormPage`/`FormFields` ใช้ field VM แบบหนึ่งคอลัมน์ required/optional; `DetailPage` รองรับ detail/holds/documents.
- `DashboardPage`, `InboxPage`, `MediaPage`, `PreviewPage`, `SettingsPage`, `RolesPage`, `IntegrationsPage`, `ImportPage` เป็น views ร่วม ไม่ใช้ภาพ PNG แทน UI.
- View models หลัก: `contentVM()`, `filterBlockVM()`, `tableVM()`, `dashboardVM()`, `reportsVM()`, `workflowVM()`, `workflowDetailsVM()`.
- Filter modes ต่างกัน: list/history กรอง records; detail เลือก record จากผลค้นหา; create/form ค้นหา screen/task โดยไม่เปลี่ยน draft; dashboard/report กรองข้อมูลที่ใช้ทำ metrics.
- Facets/options/CSV ต้องมาจาก `scopedRows()` และ `filteredRows()`; อย่าเอาข้อมูลนอก scope มาเติม select/count/related link.
- หลังบ้าน responsive จริง: sidebar collapse บน desktop และ overlay ที่จอ ≤900px; templates/table/stepper ปรับตาม CSS. อย่านำ minimum width 1240px ของหน้าร้านมาใช้หลังบ้าน.

### Permissions และ data ownership

- `roleDef()` รวม base role กับ grants จาก records; `canRead()`, `canWrite()`, `scopedRows()`, `workflowAccess()` ทำหน้าที่ต่างกัน ต้องตรวจทั้ง action และข้อมูลที่เข้าถึงได้.
- Roles: `demo/manager/sales/warehouse/accounting/credit/engineer/support/admin`. Manager อ่านอย่างเดียว; admin มีสิทธิ์ผู้ใช้/เนื้อหาแต่ไม่ได้สิทธิ์การเงินหรือ Engineer อัตโนมัติ.
- Scope คือ all/assigned/warehouse (`LLK`) และตรวจ linked order/customer. `actorId()` เป็น mapping staff แบบสาธิต ไม่ใช่ระบบบัญชีจริง.
- Readonly collections: `products/brands/prices/stock/stockMovements/sourceReturns/syncErrors/integrations`. แก้เนื้อหาเว็บใน `webProducts` แยกจาก ERP master.
- ผู้เสนอและผู้อนุมัติ decision ต้องคนละ actor. สิทธิ์เมนูไม่เพียงพอสำหรับการเงิน/credit/logistics/workflow; มี action-specific guards ใน controller.
- การบันทึก logistics ที่แก้ linked order ต้องมี read/write grants ของ orders ด้วย รวมถึงการตรวจสิทธิ์ซ้ำเมื่อ confirmation ถูกดำเนินการ.
- อย่าใช้ปุ่ม disabled เป็น guard เดียว Handler ต้องปฏิเสธการเรียกโดยไม่มีสิทธิ์ด้วย.

### การบันทึกและผลกระทบหลาย collection

เส้นทางทั่วไป: `updateForm/uploadFile` → `validateContent` → `saveContent` → confirmation สำหรับ decision → `performSave` → `commit` → `reconcile` → persist/audit/tracking

- `commit()` ในที่นี้คือบันทึก mock records ใน browser ไม่ใช่ Git commit; รวม related updates ผ่าน `other`, เก็บ audit before/after สูงสุด 200 รายการ.
- `saveStorage()` บันทึกเฉพาะ editable collections และ audit ด้วย `{ version:1, records }` ใน `plt_bo_content_v1`; readonly fixtures ถูกสร้างจาก source ใหม่เมื่อเปิดเว็บ.
- `plt_bo_lang` เก็บภาษา; `plt_bo_tracking_v1` เก็บ customer projection; `plt_bo_shell_upgrade` อยู่ sessionStorage เพื่อ migration ครั้งเดียว.
- Payment verification ลด remaining ของ invoice/receivable ครั้งเดียว และปลดเฉพาะ payment hold; verified evidence ห้ามถูกนับซ้ำ.
- Cheque received/deposited ยังไม่ใช่เงินรับแล้ว; เปลี่ยนเป็น cleared สร้าง receipt ครั้งเดียว.
- Price entitlement และ credit decision แยกผลลัพธ์; service completion กับ payment แยก state.
- SAP quote draft รองรับหลาย lines/VAT 7%; revision request ต้องไม่แก้ issued lines/amount snapshot. Documents download เป็น mock HTML/print ไม่ใช่ PDF/ใบกำกับภาษีจริง.
- การแก้ homepage sections สร้าง content version snapshot; rollback เปลี่ยน mock sections ในหลังบ้านเท่านั้น.
- Media image รับ PNG/JPEG/WebP ≤2 MB และเก็บ data URL ในเครื่อง; attachment อื่นเก็บชื่อไฟล์ ไม่มี upload server.
- Import รับ JSON array ≤100 records, file ≤2 MB, field allowlist เฉพาะ web content; สร้าง draft sections ไม่รับ SKU/price/stock ERP.
- CSV มี BOM/escaping และป้องกัน formula-prefix; HTML download escape ข้อมูล. รักษาข้อตกลงเหล่านี้เมื่อเพิ่ม fields/export.
- Fixtures/record dates บางจุด fix เป็น `2026-10-10`; เวลา workflow/audit ใช้ ISO timestamp และแสดง Asia/Bangkok. ไม่เปลี่ยน fixture dates ทั้งระบบเป็นวันนี้เพียงเพื่อให้เอกสารดูใหม่.

### Workflow และ logistics source of truth

| Collection | Sequential codes |
| --- | --- |
| `orders` | submitted → confirmed → incoming → preparing → packed → shipped → delivered |
| `rfqs` | submitted → review → prepared → quoted |
| `quotes` | review → ready → sent → accepted → ordered |
| `jobs` | pending → approved → scheduled → working → testing → handover → done |

- Definitions/next-role อยู่ `workflow.js`; `resolve()` แปลง status/fulfillment/progress และ terminal states. Delivered order เก็บ `status:completed`, `fulfillment:delivered`; ห้ามสมมติว่า status field เท่ากับ step code เสมอ.
- `requestWorkflow()` เก็บ from/to/note/evidence ใน confirmation; `advanceWorkflow()` ตรวจ role/grant/scope/current state/prerequisites ซ้ำ ป้องกันข้ามขั้น กดซ้ำและ stale confirmation.
- Order holds บล็อกขั้นตอน; preparing/packed/shipped ต้องน้ำหนักพร้อม ≤300; packed ต้อง checklist; shipped ต้อง active carrier/dispatch date/tracking หรือ pickup date/slot/recipient/phone; delivered ต้อง evidence.
- Quote ready/sent ต้อง source reference/revision/lines; ordered ต้อง linked order ของลูกค้าคนเดียวกัน; expired quote ไปต่อไม่ได้. RFQ quoted ต้อง linked SAP fixture quote.
- Job scheduled ต้องวัน/owner, testing/handover ต้อง results, done ต้อง acceptance/attachment.
- `saveWorkflowDetails()` บันทึก allowlisted metadata โดยไม่เปลี่ยนขั้น/holds; unsaved draft ล็อก next action. การ save order/job metadata ทั่วไปไม่เปลี่ยนสถานะ workflow.
- ข้อยกเว้นที่มีอยู่จริง: form `10-logistics/shipment-create` บันทึก dispatch จาก packed → shipped เมื่อผ่าน workflow guards; ห้ามลบทิ้งเพราะตีความว่า form save ทุกชนิดห้ามเปลี่ยนขั้น.
- Order เป็นข้อมูลหลัก; `reconcile()` สร้าง/อัปเดต bookings, shipments, pickups ตาม order และคง references. ไม่เพิ่ม state machine แยกให้ logistics.
- Booking/round edits ส่ง carrier/dispatch/tracking/pickup metadata กลับ order; reconciliation กระจายสถานะ shipped/delivered กลับรายการที่เชื่อม. การ refresh legacy import เติมข้อมูล shipment ที่ order ขาด แต่ไม่ยกขั้น order ตามสถานะเก่า.
- แยก carrier maxKg, order limit 300kg และ round capacity; จำนวนเหล่านี้ไม่ใช่กฎเดียวกัน.

### Customer tracking preview

`tracking.html?type=orders&id=SO-2569-0005` รองรับ `orders/rfqs/quotes/jobs`, optional `lang=en`. `publicRecord()` ส่งเฉพาะ id/type/state/labels/blocked/steps/timestamps/history labels; ไม่ส่ง internal note, staff identity, evidence, price หรือ payment detail

`tracking.js` อ่าน localStorage แล้ว update ผ่าน storage event และ polling 1.5 วินาที ใช้ได้เฉพาะ browser/profile/origin เดียวกัน ปอร์ต 8000 กับ 8001 เป็นคนละ origin. ไม่ใช่ลิงก์ติดตามข้ามเครื่องและยังไม่เชื่อม account หน้าร้าน

## 7. คำสั่งพัฒนาและ generated files

รันทุกคำสั่งจาก repository root เปิด HTTP server คนละ terminal; ห้ามเปิด entry ด้วย `file://` เพราะ component loader ต้อง fetch siblings

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory store-front
python -m http.server 8001 --bind 127.0.0.1 --directory back-office
```

เปิด `http://127.0.0.1:8000/` หรือ `http://127.0.0.1:8001/`. ใช้ host/port เดิมเมื่อตรวจ persistence เนื่องจาก storage แยกตาม origin

### Refresh storefront-derived seed

```powershell
node --preserve-symlinks-main back-office/tools/export-store-seed.cjs
```

เครื่องมือนี้ eval Component ผ่าน Node VM แล้ว export products/services/categories/groups/accounts/carriers/coupons ไป `store-seed.js` และคัดลอกภาพ SKU ที่มีอยู่ไปหลังบ้าน ไม่ export transaction state และไม่ลบภาพเก่าที่เลิกใช้เอง ต้อง review generated diff/assets และตรวจ fixture references/tests

### Generate screen schema

แก้ definitions ใน `back-office/tools/build-screen-catalog.py` แล้วสร้าง `screen-catalog.js` และ `SCREEN_COVERAGE.th.md` พร้อมกัน โดยคำสั่งคือ:

```powershell
python back-office/tools/build-screen-catalog.py
```

**ข้อจำกัดของ checkout นี้:** generator ต้องอ่าน `graphic/back-office/manifest.json` ซึ่งไม่มีในโฟลเดอร์ปัจจุบัน จึงรันไม่ได้จนกว่าจะนำ approved manifest กลับมา ไม่สร้าง manifest จากการเดาหรือรันทับ catalog ที่ใช้งานอยู่ README ยังอ้าง `docs/BACK_OFFICE_PLAN.th.md` และ graphic references ที่ไม่มีเช่นกัน; ไม่ใช่ runtime dependency เว็บใช้ generated catalog ที่มีอยู่ได้

แก้หน้า/field ให้รักษา stable IDs, TH/EN titles, collection, kind, required fields และ field options. หากจำเป็นต้องแก้ generated catalog โดยที่ manifest ยังขาด ให้บันทึกข้อจำกัดและรักษา definitions ใน generator ให้ตรงเพื่อไม่เสียเมื่อ regenerate

### สร้าง WebP ของ Home

```powershell
python store-front/tests/prepare-home-images.py
```

ต้องมี Pillow; คำสั่งเขียน WebP derivatives ใหม่ ไม่แก้ PNG ต้นฉบับ ไม่ต้องรัน generator ทั้งสามตอนเปิดเว็บหรือ deploy

## 8. การตรวจสอบตามพื้นที่ที่แก้

### Domain regressions ที่ไม่ต้องเปิด browser

```powershell
node --preserve-symlinks-main store-front/tests/home-redesign.cjs
node --preserve-symlinks-main back-office/tests/content-workflows.cjs
```

- Storefront check eval logic จริง: carousel, category filter clearing, featured products, local assets, TH/EN, account prices/coupons และ product CTA.
- Back-office check eval controller/fixtures จริง: 134-screen schema, scope/grants/ownership, readonly source, validation, booking, issued snapshots, payment/cheque idempotency, independent states, workflow/evidence/tracking, linked logistics/migration.
- Node flag ข้างบนช่วยหลีกเลี่ยง main-path realpath `EPERM` ใน Windows sandbox นี้; ไม่ต้องเปลี่ยน source/test เพื่อแก้ environment error.
- Tests เหล่านี้ไม่ได้ตรวจ DOM, CSS, HTTP component loading หรือ browser CDN behavior จึงใช้แทน browser checks ทั้งหมดไม่ได้.

### Browser checks

ต้องมี Python Playwright, Pillow สำหรับภาพเปรียบเทียบ และ Chrome. หากยังไม่มีและต้องรันงาน browser ให้ติดตั้งใน environment ทดสอบตามที่เหมาะสม ไม่เพิ่ม dependency/build pipeline ให้ static application:

```powershell
python -m pip install playwright pillow
```

สคริปต์หลักใช้ installed Chrome; `POLYTECH_TEST_CHROME` เปลี่ยน executable path ได้. Local tools lookup ใช้ `verification/home-redesign/tools` หรือ `verification/back-office/tools` ก่อน Python environment. ใช้ test-only request interception เพื่อ expose `window.__qaApp`; ห้ามใส่ hook ลง production

| งานตรวจ | Server / คำสั่ง | ขอบเขต |
| --- | --- | --- |
| Storefront layout/Home | serve `store-front` ที่ 8765; `python store-front/tests/browser-home-redesign.py` | TH/EN, widths 1240/1440/1920/2541/768, route shells/live resize, assets, hero ≤500px และ Footer เทียบ Git HEAD |
| Hero loading/fallback | server 8765; `python store-front/tests/browser-hero-image.py` | WebP สำเร็จ/404, PNG fallback, DPR 1/2, reload/carousel return |
| Auth/reset | server 8001; `python back-office/tests/browser-auth.py` | input validation, lockout, TH/EN, auth behavior |
| Shell/responsive | server 8001; `python back-office/tests/browser-shell.py` | shared shell, menus, collapse/mobile/keyboard |
| Legacy login upgrade | server 8001; `python back-office/tests/browser-shell-upgrade.py` | แท็บ entry เก่าเปลี่ยนเข้าสู่ shell ใหม่ |
| Content inventory | server 8001; `python back-office/tests/browser-content.py` | 134 routes และ TH/EN/shared presentation |
| Editable workflows | server 8001; `python back-office/tests/browser-workflows.py` | CRUD, persistence, scope, finance/logistics/import/reset |
| Sequential handoffs | server 8001; `python back-office/tests/browser-stepper.py` | stepper, guards, roles/evidence และ tracking projection |
| Shared filters | server 8001; `python back-office/tests/browser-filters.py` | list/detail/form/dashboard/report filters และ scoped options |
| Services/Promos/About/Contact | serve `store-front` ที่ 8766; `python verification/services/check.py`, `python verification/promotions/check.py`, `python verification/about/check.py`, `python verification/contact/check.py` | page-specific layout/assets/CTA/TH/EN; อ่าน assumptions ก่อนใช้ |

ตัวอย่าง server ของ storefront browser suite:

```powershell
python -m http.server 8765 --bind 127.0.0.1 --directory store-front
```

หลังบ้านเปลี่ยน base URL ได้ผ่าน `POLYTECH_BO_URL`. `browser-workflows.py`/`browser-stepper.py` รองรับ `POLYTECH_TEST_RUNTIME_CACHE` สำหรับ cache path ของ CDN fixtures ตาม script. สคริปต์เฉพาะหน้าใน verification ใช้ Chrome path แบบ hardcoded และบาง assertions มาจาก layout รุ่นก่อน ต้องเทียบข้อกำหนด 1240px ปัจจุบันก่อนตีความผล ไม่เปลี่ยนเว็บให้ตรงกับ stale test

Footer comparison ของ Home suite ต้องมี Git HEAD/source baseline; reports/screenshots ถูกเขียนใต้ verification และ ignore ตามไฟล์ `.gitignore` ที่เกี่ยวข้อง ไม่ stage tools, browser profiles หรือภาพทดสอบโดยไม่ตรวจ

### Manual acceptance เมื่อเปลี่ยน behavior

- ทุกหน้า: HTTP imports โหลดครบ, ไม่มี unresolved bindings/runtime errors ใหม่, TH/EN, focus/labels/buttons และ image 404.
- Catalogue: search/filter/sort/pagination, account price, stock, buy/RFQ/pkg/consult CTA และ Home category/service destinations.
- Checkout: 299/300/301kg, missing weight, mixed cart, carrier limits, delivery/pickup, coupons/add-ons/VAT, credit/PO/holds/payment.
- Quotes/services/account: list/detail/revision/expiry/conversion, duplicate actions, linked entities, milestones/documents, account switching.
- Back-office: Manager read-only, Admin ไม่มี finance/Engineer โดยอัตโนมัติ, assigned/warehouse scope, revoked grants, stale confirmation, immutable source/snapshots, receipt/cheque posting once.
- Persistence: refresh/reset ของพื้นที่ที่แก้; หลังบ้าน refresh ต้องกลับ login แต่ editable records ยังอยู่; tracking ต้องไม่เปิดเผย internal details.
- Layout: storefront desktop และ viewport ต่ำกว่า 1240 ที่เลื่อนแนวนอน; back-office desktop/tablet/mobile ตาม CSS ของหลังบ้าน.

เอกสาร-only ตรวจ paths/facts/Markdown/diff; ไม่ต้องเพิ่ม tests ที่จำลองเนื้อหาเอกสารเอง รายงานเฉพาะ checks ที่รันจริง และบอกชัดเมื่อไม่ได้รัน browser checks

## 9. Deploy และการรักษาขอบเขต

- แต่ละเว็บ deploy เป็น static project: Root Directory `store-front` หรือ `back-office`, Framework Other, Build/Install Command ว่าง, Output Directory `.` ตาม config ที่มีอยู่.
- คง `cleanUrls:false` เพื่อไม่ rewrite ชื่อ `.dc.html`; หน้าร้านต้องรักษา page rewrites ไป `index.html` ใน `store-front/vercel.json` ส่วน static assets ไม่ควรถูก rewrite.
- หลังบ้านมี no-cache headers สำหรับ `/`, HTML และ JS เพื่อรองรับ template/schema updates และแท็บเก่า อย่าลบโดยไม่ตรวจ shell-upgrade behavior.
- ไม่ deploy repository root หรือ verification/tools เป็นเว็บไซต์ ใช้ deployment เฉพาะเมื่อผู้ใช้สั่ง.
- อย่าใส่ secrets/production credentials ลง source หรือ demo storage; `.env`/`.env.*` ถูก ignore และ `.env.example` เป็นข้อยกเว้น.

## 10. Git commit rules — ใช้กับทุกโครงการ

1. Commit message ทั้ง subject/body ต้องเป็นภาษาอังกฤษทั้งหมด.
2. ห้ามระบุ AI involvement หรือใส่ Co-Authored-By/trailer/text ที่บอกว่าทำด้วย AI.
3. Subject สั้นและขึ้นต้นด้วย type ตามงาน เช่น `fix:`, `add:`, `feature:`, `refactor:`, `update:`, `docs:`, `style:`, `test:`, `chore:`, `remove:`.
4. Body เป็น bullet list หนึ่งข้อสำหรับแต่ละการเปลี่ยนแปลง โดยระบุไฟล์, function/section/บริเวณที่แก้, สิ่งที่เปลี่ยน และผลลัพธ์หลังเปลี่ยน.
5. แยก commits ตามประเภทงาน/feature/functional area ไม่รวมงานคนละวัตถุประสงค์.
6. ห้าม stage, commit หรือ push `package-lock.json`; ถ้ามีใน status ให้ปล่อย unstaged และเสนอ ignore เมื่อยังไม่ถูก ignore (repository นี้ ignore แล้ว).
7. Commit message ห้ามมี curly braces, square brackets, angle brackets หรือ backticks เขียน filename/function/code reference เป็น plain text.
8. Stage เฉพาะไฟล์งาน ตรวจ staged diff ก่อน commit และอย่า commit จนกว่าผู้ใช้จะขอ.

ตัวอย่าง commit message ที่เป็นไปตามกฎ:

```text
docs: Add repository-wide maintenance guide

- AGENTS.md: Documented the repository structure, controller ownership,
  mock workflows, persistence and validation commands. Result: maintenance
  guidance now covers both storefront and back-office.
```
