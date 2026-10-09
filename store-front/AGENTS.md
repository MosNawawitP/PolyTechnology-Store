# AGENTS.md - Polytech Store Front

คู่มือนี้ใช้กับไฟล์ทั้งหมดภายใน `store-front/` เป้าหมายคือรักษาพฤติกรรมของ prototype ให้เทียบเท่าของเดิม ขณะเดียวกันทำให้การแก้หน้าแยกไฟล์ปลอดภัยและตรวจสอบได้ง่าย

## ภาพรวมโปรเจกต์

- นี่คือ prototype e-commerce สำหรับ Polytechnology รองรับทั้ง B2C และ B2B
- ข้อมูล ราคา สต็อก เครดิต เอกสาร การชำระเงิน และการตอบกลับทั้งหมดเป็น mock data ไม่มี backend จริง
- UI รองรับภาษาไทยและอังกฤษ
- โค้ดใช้ Design Component runtime จาก `./support.js` ซึ่ง parse `<x-dc>`, interpolation, `sc-if`, `sc-for` และ `dc-import` แล้ว render ผ่าน React
- ไม่มี package manager, build script หรือ test runner; ใช้ `vercel.json` ตั้งค่า deploy แบบ static โดยไม่ต้อง build
- ต้องเปิดผ่าน HTTP เพราะ runtime ใช้ `fetch` โหลดไฟล์ `.dc.html` ที่อยู่ข้าง `index.html`; ห้ามใช้ `file://`

ตัวอย่างการเปิดจาก project root:

    python -m http.server 8000 --directory store-front

จากนั้นเปิด `http://localhost:8000/`

การทำงานต้องใช้อินเทอร์เน็ตเพื่อโหลด React/Babel จาก unpkg, ฟอนต์ Sarabun, Leaflet, CARTO map tiles และรูปจาก Wikimedia Commons

## Source of truth และขอบเขตการแก้

- `index.html` คือ source of truth ของ state, business rules, mock data, routing, event handlers และ view models ทั้งหมด
- ไฟล์ `*.dc.html` เป็น presentation templates เท่านั้น ไม่มี script หรือ state ของตัวเอง
- ทุก child component รับ props ชุดเดียวผ่าน `dcProps="{{ all }}"`; `renderVals()` เรียก `renderAllVals()` แล้วเพิ่ม self-reference ชื่อ `all`
- อย่าเพิ่ม logic ซ้ำใน child component หากสามารถเพิ่มใน `index.html` แล้วส่งค่า/handler ผ่าน view model ได้
- อย่าแก้ `./support.js`; เป็น generated runtime ที่จำเป็นสำหรับเว็บนี้
- ใช้ `store-front/` เป็นเวอร์ชันหลักสำหรับพัฒนาต่อและ deploy; ไม่ต้อง sync กับไฟล์ monolith หรือ standalone เก่า
- รักษา CSS `#dc-root .sc-host .sc-host { display:contents; }` ใน `index.html`; wrapper ของ nested component จะทำ layout เพี้ยนหากลบกฎนี้

## โครงสร้างไฟล์

### Entry และ shared layout

- `index.html` - document shell, global CSS, route switches, overlays, `Component extends DCLogic`, data และ logic ทั้งหมด
- `DemoBar.dc.html` - เลือก demo account/scenario และ reset demo
- `Header.dc.html` - navigation, search, language picker, login/account menu และ mobile menu
- `Footer.dc.html` - shop/support/contact links และ prototype disclaimer
- `ChatWidget.dc.html` - simulated chat และ keyword-based replies
- `Toast.dc.html` - success/info/warning feedback

### Storefront pages

- `Home.dc.html` - hero carousel, coupon cards, recommended products, categories และ optional category rows
- `Products.dc.html` - search result, filters, sorting และ grid/list product catalogue
- `Pdp.dc.html` - product detail, gallery, quantity, specifications, add-ons และ CTA ตาม product type
- `Services.dc.html` - service catalogue, scope และ consultation form
- `Promos.dc.html` - promotion cards ตาม customer segment
- `About.dc.html` และ `Contact.dc.html` - informational pages
- `Coupons.dc.html` - coupon wallet/list
- `Cart.dc.html` - cart, saved items, item add-ons, coupon และ weight validation
- `Checkout.dc.html` - 4-step buyer, delivery, payment และ review flow
- `Success.dc.html` - order result และ payment panel
- `Rfq.dc.html` - request-for-quotation form และ line items
- `Register.dc.html` - personal/company registration และ completion states

### Account area

- `Account.dc.html` - account shell และ nested tab router
- `AccountProfile.dc.html` - company/person profile
- `AccountAddresses.dc.html` - address book
- `AccountCredit.dc.html` - credit limit, usage และ invoices due
- `AccountOrders.dc.html` และ `AccountOrderDetail.dc.html` - order list/detail, holds, milestones, tracking, payment และ documents
- `AccountQuotes.dc.html` และ `AccountQuoteDetail.dc.html` - quote list/detail, revisions, accept/reject และ order conversion
- `AccountLeads.dc.html` และ `AccountLeadDetail.dc.html` - service consultation lifecycle, survey และ linked quote/order
- `AccountDocs.dc.html` - document search/filter/download
- `AccountNotifications.dc.html` - notifications และ preferences

### Overlays

- `LoginModal.dc.html` - demo login/registration entry
- `AddressModal.dc.html` - create/edit address พร้อม Leaflet map
- `DocumentModal.dc.html` - mock document preview และ print

## DC template conventions

- Interpolation: `{{ value }}`
- Conditional: `<sc-if value="{{ flag }}">`
- Loop: `<sc-for list="{{ items }}" as="item">`
- Event binding: `onClick="{{ handler }}"`, `onChange="{{ handler }}"`
- Component import: `<dc-import name="Name" dcProps="{{ all }}"></dc-import>`
- ค่าทุกตัวที่ template อ้างต้องถูกคืนจาก `renderAllVals()` หรือ helper ที่ spread เข้าไป ได้แก่ `storeVals()`, `flowVals()`, `acctVals()`, `addrTabVals()` และ view-model helpers
- ห้ามใช้ `<details>` ร่วมกับ dynamic `open`/`onToggle` binding ใน quote detail; runtime scope เคยเสีย ให้ใช้ state เช่น `qOpen` และ button toggle แบบเดิม
- หลีกเลี่ยง `<img src="{{ value }}">` ภายใน `sc-if` เมื่อ value อาจยัง resolve ไม่ทัน เพราะ browser อาจ request URL interpolation ดิบ ใช้ค่าที่พร้อมเสมอ, CSS background หรือวางเงื่อนไขให้ data พร้อมก่อน render
- ไฟล์ child ต้องคง document wrapper แบบที่มีอยู่ คือ doctype, head, `./support.js`, body และ `<x-dc>`
- ชื่อไฟล์ต้องตรงกับ `dc-import name` แบบ case-sensitive ในสภาพแวดล้อม Linux
- Runtime โหลด component sibling จาก directory เดียวกับ entry; อย่าย้าย child component ไป subdirectory โดยไม่เปลี่ยน loader/runtime

## Routing และ composition

Routing เป็น state-based ไม่ใช้ URL router:

- `state.route.p` เลือกหน้า: `home`, `products`, `pdp`, `services`, `promos`, `about`, `contact`, `coupons`, `cart`, `checkout`, `success`, `rfq`, `register`, `account`
- `go(page, extra)` เปลี่ยน route, ปิดเมนู และ scroll ด้านบน
- PDP ใช้ `route.id`; Services ใช้ `route.svc`
- account details ใช้ `route.oid`, `route.qid`, `route.lid`
- `state.tab` เลือก account tab; `Account.dc.html` render nested component จาก flags ใน `acctVals()`
- Login เป็น modal ใน `state.loginModal` ไม่ใช่หน้าจริง แม้จะมี legacy flag `isLogin`
- Overlay หลักควบคุมด้วย `addrDraft`, `loginModal` และ `modal`

เมื่อเพิ่มหน้าใหม่:

1. สร้าง `Name.dc.html` ในโฟลเดอร์นี้
2. เพิ่ม route flag ใน `renderAllVals()`
3. เพิ่ม `sc-if` และ `dc-import` ใน `index.html`
4. เพิ่ม navigation/handler ที่จำเป็นผ่าน view model
5. ทดสอบ direct flow ที่เข้าหน้าและ flow ย้อนกลับ

## Data model

ข้อความสองภาษาเก็บเป็น array `[thai, english]` และอ่านผ่าน `tx(pair)`; ข้อความ inline ใช้ `m(thai, english)` ส่วนคำกลางอยู่ใน `L` และถูกแปลงเป็น object `t` ใน `renderAllVals()` ข้อความใหม่ที่ผู้ใช้มองเห็นต้องมีครบสองภาษา

ข้อมูล catalogue ปัจจุบันประกอบด้วย 61 products, 6 business categories, 7 merchandising groups, 5 services และ 5 carriers

### Product

Product หลักใช้ fields ต่อไปนี้:

- `id`, `sku`, `brand`
- `cat`, `grp`, `sub` สำหรับการจัดหมวดและ filter
- `type`: `buy`, `rfq`, `pkg` หรือ `consult`
- `w`: น้ำหนักต่อหน่วย; `null`/ไม่มีค่าจะ block checkout และบังคับ consultation
- `stock`: จำนวนตั้งต้น; `null` หมายถึงไม่ใช่ stock ปกติ
- `pop`: popularity สำหรับ default sort
- `n`, `u`, `d`: ชื่อ หน่วย และคำอธิบายแบบสองภาษา
- `pr`: ราคา `[retail, partner, gradeA]`; ค่า `null` คือไม่มีราคาซื้อตรงสำหรับ segment นั้น
- `sp`: specifications ในรูป `[labelThai, labelEnglish, value]`
- optional fields เช่น `moq`, `site` และข้อมูลประกอบตามชนิดสินค้า

สินค้า `p1` ถึง `p16` ประกาศตรงใน `PRODUCTS`; อีก 45 รายการสร้างใน `_np` ผ่าน helper `P()` แล้ว concat เข้า catalogue อย่าลืมตรวจทั้งสองส่วนเมื่อค้นหาหรือแก้สินค้า

### Accounts และราคา

`ACCOUNTS` มี 5 persona:

- `guest` - ไม่ login, retail pricing
- `walkin` - บุคคลทั่วไป, retail pricing และชำระทันที
- `bizNew` - บริษัทใหม่, retail pricing, ขอ quote ได้ แต่ยังไม่มีเครดิต
- `partner` - `priceIdx: 1`, เครดิต 30 วัน
- `gradeA` - `priceIdx: 2`, เครดิต 45 วัน, PO/cheque/approval rules

`price(product)` เลือก `product.pr[account.priceIdx]`; อย่าคำนวณ segment price ซ้ำใน template

### Cart, checkout และ weight

- Cart line หลักคือ `{ id, q }`; add-ons แยกเก็บใน state maps
- `cartRows()` สร้าง row view models และ `totals()` คำนวณ subtotal, discount, shipping, VAT และ total
- เพดานรวมคือ `MAXW = 300` กก.; มากกว่า 300 กก. ถูก block แต่ 300 กก. พอดีผ่านได้
- สินค้าที่ไม่มีข้อมูลน้ำหนักถูก block เช่นกัน
- Carrier แต่ละรายมี `maxKg`; `c5` คือ Polytechnology delivery และรองรับถึง 300 กก.
- Checkout มี 4 steps ใน `ck.step`: buyer/address, delivery/pickup, payment, review
- วิธีจ่ายขึ้นกับ account capability: QR, transfer, company credit หรือ cheque
- Grade A อาจเกิด order holds ได้แก่ `approval`, `seller`, `credit`, `payment`, `verify`
- VAT, coupon, freight discount, per-item add-ons และ order-level add-ons ต้องคำนวณผ่าน helpers ใน `index.html` ไม่ใช่ template

### Quotes, services และ leads

- Quote kinds คือ instant cart quote, RFQ และ service quote
- Quote lifecycle ครอบคลุม submitted/review/revision/ready/accepted/ordered/rejected/expired; `qStatus()` คำนวณ expiry เพิ่มจาก status ที่เก็บ
- Quote revision และ history ต้องรักษา `rev`, `accRev`, `history`, `exp` และ reference ไป order
- Service lead เชื่อม `lead -> quote -> service order` ด้วย `leadId`, `quoteId`, `orderId`
- `POLICY` กำหนดอายุ quote, RFQ discount, survey fee และ milestone payment plans
- `SVC_EXTRA` กำหนด fields เพิ่มรายบริการ และ `SVC_QUOTE` เป็น mock BOM/labour template

### Seed และ persistence

- `seed()` สร้าง orders, quotes, leads และ notifications ตัวอย่างครบหลายสถานะ
- `componentDidMount()` โหลด `localStorage` key `plt_proto_v2`; ถ้ามีข้อมูลเดิมจะ merge seeded orders/quotes/leads ตาม `id`
- `componentDidUpdate()` เรียก `persist()` ทุก update
- Persisted fields มีเฉพาะรายการที่ระบุใน `persist()`; state ใหม่ที่ต้องอยู่หลัง refresh ต้องเพิ่มทั้ง default state, reset path และ persisted payload
- การเปลี่ยน schema ที่ incompatible ต้องพิจารณา migration หรือเปลี่ยน `KEY`; อย่า bump key โดยไม่จำเป็นเพราะจะล้าง demo progress ของผู้ใช้
- `resetDemo()` คืน seed และ state สำคัญเป็นค่าเริ่มต้น
- สต็อกจำลองเปลี่ยนทุก 9 วินาที, hero เปลี่ยนทุก 7 วินาที และ relative-time tick ทุก 1 วินาที

## Editor props และ known gaps

`data-props` ประกาศ `showCategoryRows`, `showDemoBar`, `defaultSegment` และ `maxOrderWeightKg`

- ปัจจุบัน `showCategoryRows` ถูกใช้งานจริงผ่าน `this.props.showCategoryRows`
- `showDemoBar` ยังไม่ได้ใช้เพื่อซ่อน `DemoBar`
- `defaultSegment` ยังไม่ได้กำหนด initial account
- `maxOrderWeightKg` ยังไม่ได้ผูกกับกฎน้ำหนัก; logic ยังใช้ `MAXW = 300`

อย่าเขียนเอกสารหรือ UI ว่า props สามตัวหลังทำงานแล้วจนกว่าจะเชื่อม implementation และทดสอบครบทุก flow

## แนวทางแก้ไขตามประเภทงาน

### แก้ markup/style

- แก้ไฟล์ component เจ้าของ UI โดยตรง
- Inline styles คือ convention ปัจจุบัน รักษา palette, spacing, typography และ responsive flex/grid patterns เดิม
- ตรวจ mobile width และ desktop width เพราะ layout ใช้ `state.w` ร่วมกับ CSS wrapping
- รักษา semantic elements, label, keyboard focus, aria attributes และ button type

### เพิ่มข้อมูลหรือ business rule

- แก้ constants/data และ helper ใน `index.html`
- สร้าง/แก้ view model ให้ template รับค่าที่ render พร้อมแล้ว
- ใช้ immutable `setState` สำหรับ array/object ที่ซ้อนกัน
- รักษา source เดียวของการคำนวณ เช่น price, totals, weight, quote totals และ status labels
- อย่าพึ่ง index ของ array หากมี stable `id`

### เพิ่ม state

- เพิ่ม default ใน `state`
- เพิ่มใน `resetDemo()` หากต้อง reset
- เพิ่มใน `persist()` เฉพาะเมื่อจำเป็นต้องอยู่หลัง refresh
- ตรวจ account switching ใน `resetIdentity()` หาก state มีข้อมูลระบุตัวบุคคล/บริษัท
- เคลียร์ timers/listeners ที่เพิ่มใหม่ใน `componentWillUnmount()`

### เพิ่มข้อความ

- ใช้ `L` เมื่อข้อความถูกใช้ซ้ำหรือข้ามหลาย view models
- ใช้ `m(th, en)` สำหรับข้อความเฉพาะจุด
- อย่าใส่ข้อความภาษาเดียว ยกเว้น identifiers, SKU, brand, code และชื่อเฉพาะที่ตั้งใจให้เหมือนกัน

## การตรวจสอบก่อนส่งงาน

ไม่มี automated test suite ดังนั้นให้ตรวจตามความเสี่ยงของการเปลี่ยนแปลง:

1. เปิดผ่าน HTTP และตรวจว่า console ไม่มี component fetch, parse หรือ unresolved binding error ใหม่
2. ตรวจว่าหน้า Home โหลด child components ครบและ layout wrapper ไม่แทรกช่องว่าง
3. สลับ TH/EN และตรวจข้อความที่แก้ทั้งสองภาษา
4. ทดสอบอย่างน้อย guest และ account segment ที่ได้รับผลกระทบ
5. ถ้าแก้ catalogue ให้ทดสอบ search, filters, PDP, price, stock และ CTA ตาม product type
6. ถ้าแก้ cart/checkout ให้ทดสอบ 299, 300, 301 กก., missing weight, mixed buy/RFQ cart, delivery/pickup และ payment ที่เกี่ยวข้อง
7. ถ้าแก้ quote/order/service ให้ทดสอบ list, detail, status transition, document modal และ linked entities
8. Refresh หน้าเพื่อยืนยัน localStorage persistence และกด reset demo เพื่อตรวจ initial state
9. ตรวจ responsive layout อย่างน้อย mobile, tablet และ desktop

ใช้ demo scenarios `sc1` ถึง `sc16` จาก DemoBar เป็น regression checklist โดยเฉพาะ B2C QR, B2B prepaid, credit/PO approval, over-limit credit, quote lifecycle, service lifecycle, expired quote, stock change, weight boundaries, missing weight, mixed cart และ delivered-credit order

Known benign issue: ช่วง initial render อาจเห็น browser request ค่า `{{ hero.photo }}` ดิบใน console จาก image binding ก่อน runtime resolve; ถ้า UI ยังแสดงถูกต้องและไม่มี regression ใหม่ ไม่ต้องแก้โดยพลการ

## หลักการออกแบบโค้ด

- รักษา separation ระหว่าง domain/state logic ใน `index.html` กับ presentation ใน child templates
- เพิ่ม helper/view model ที่มีหน้าที่ชัดเจน แทนการฝังเงื่อนไขธุรกิจยาว ๆ ใน markup
- หลีกเลี่ยงการสร้าง abstraction ล่วงหน้า; reuse helper เมื่อมีกฎเดียวกันจริง เช่น price, stock, totals และ status
- ใช้ early return กับ validation และ guard ที่มีอยู่
- การเปลี่ยนพฤติกรรมควรมี acceptance cases ที่ตรวจได้จาก scenario หรือ manual flow ก่อนลงมือ
- แก้เฉพาะส่วนที่ผู้ใช้ขอ และรักษา mock behavior เดิมของ flow อื่น

## Git commit rules

- Commit message ต้องเป็นภาษาอังกฤษทั้งหมด
- ห้ามระบุหรือบอกเป็นนัยว่าใช้ AI และห้ามเพิ่ม AI co-author trailer
- Subject ต้องสั้นและขึ้นต้นด้วย type ที่ตรงกับงาน เช่น `fix:`, `add:`, `feature:`, `refactor:`, `update:`, `docs:`, `style:`, `test:`, `chore:` หรือ `remove:`
- Body ต้องเป็น bullet list โดยแต่ละข้อระบุไฟล์, จุดหรือส่วนที่แก้, สิ่งที่เปลี่ยน และผลลัพธ์
- แยก commit ตามประเภทงานหรือ functional area; อย่ารวมงานคนละวัตถุประสงค์
- ห้าม stage หรือ commit `package-lock.json`; หากพบให้ปล่อย unstaged และเสนอเพิ่มใน `.gitignore` หากยังไม่ได้ ignore
- Commit message ห้ามมีวงเล็บปีกกา, วงเล็บเหลี่ยม, angle brackets หรือ backticks
- อย่า commit จนกว่าผู้ใช้จะขอ
