# Polytech Commerce — handoff (ภาษาตอบ: ไทย, สั้น กระชับ)

ไฟล์หลัก: `store-front/index.html` (state/logic ใน class Component); UI แยกเป็น `store-front/*.dc.html`. ข้อมูลจำลองทั้งหมด (mock).

## การ deploy ปัจจุบัน
- ใช้ `store-front/` เป็นโฟลเดอร์หลักของเว็บ โดยมี `support.js` และ `assets/` อยู่ภายใน
- ตั้ง Vercel Root Directory เป็น `store-front`, Framework Preset เป็น Other; config อยู่ใน `store-front/vercel.json`
- เปิดเว็บในเครื่องจาก project root ด้วย `python -m http.server 8000 --directory store-front` แล้วเข้า `http://localhost:8000/`
- Python ใช้สำหรับ preview ในเครื่องเท่านั้น; Vercel ไม่ต้องรัน Python หรือ build
- อ่าน `store-front/AGENTS.md` สำหรับข้อกำหนดปัจจุบัน และ `README.md` สำหรับขั้นตอน GitHub/Vercel
- ไฟล์ monolith, standalone, wireframe และรูป/เอกสารอ้างอิงที่ไม่ถูกใช้งานถูกลบแล้ว; รายการและเลขบรรทัดของ monolith ด้านล่างเป็นประวัติโครงสร้างเดิมเท่านั้น ห้ามใช้เป็นตำแหน่งแก้ไขปัจจุบัน
Known issue ที่ไม่ต้องแก้: console error โหลด `{{ hero.photo }}` ตอนเปิดหน้า (ไม่กระทบการแสดงผล)
ผู้ใช้ชอบ: แก้เฉพาะที่ขอ, ตอบสั้น, ถามคำปรึกษา → วิเคราะห์ก่อนแล้วรอให้เลือก

## โครงสร้างหลัก
- Navbar: ไอคอนค้นหาขยายเต็มแถว, ตัวสลับภาษาแบบธง, ปุ่ม Log In (modal), avatar dropdown หลังล็อกอิน
- Account: เมนูซ้าย (ข้อมูลของฉัน, ที่อยู่, วงเงินเครดิต, คำสั่งซื้อ, ใบเสนอราคา, คำขอคำปรึกษา/บริการ, เอกสาร, การแจ้งเตือน)
- Orders/Quotes/Services: ค้นหาข้อความเดียว + แท็บกลุ่มสถานะ (ไม่แสดงเลข 0); การ์ดทั้งใบกดเข้ารายละเอียด

## Checkout (4 สเต็ป + หน้าชำระเงินหลังยืนยัน)
- Stepper เต็มความกว้าง มีไอคอน+คำอธิบาย: 01 ข้อมูลผู้ซื้อ (ที่อยู่จัดส่ง, ที่อยู่ใบกำกับภาษีมี checkbox) → 02 การจัดส่ง → 03 การชำระเงิน → 04 ตรวจสอบ
- บริการเสริมรายสินค้า: เลือกที่หน้าสินค้า + แก้ในตะกร้า (ไม่อยู่ใน checkout); บริการเสริมการจัดส่ง (ประกัน, ดูแลพิเศษ, ยกขึ้นอาคาร) อยู่สเต็ป 02 ผูกกับขนส่งที่เลือก
- ขนส่งจริงในไทย (DHL, Flash, KEX, ไปรษณีย์ไทย) มีเพดานน้ำหนัก; ถ้าน้ำหนักเกินจะซ่อนเจ้านั้น และเพิ่ม "จัดส่งโดย Polytechnology" (c5) ให้เลือกแทน
- หลังกดยืนยัน: หน้า success แสดงเฉพาะวิธีที่เลือก — พร้อมเพย์ QR (QR จำลองลายสี่เหลี่ยม + นับถอยหลัง 15 นาที) หรือโอนบัญชี (เลขบัญชี+คัดลอก+แนบสลิป); หน้ารายละเอียดออเดอร์ใช้ชุดเดียวกัน (`payPanel(o, lock)`)
- ลูกค้านิติบุคคลที่ใช้เครดิต: ไม่จ่ายตอนสั่ง มีแถบขั้นตอน 5 ขั้น (ตัดวงเงิน → จัดส่ง → ใบแจ้งหนี้ → ครบกำหนด → ได้รับชำระ) + ฟอร์มแจ้งชำระตามใบแจ้งหนี้เมื่อส่งของแล้ว; เช็คยังไม่มีฟอร์ม

## ใบเสนอราคา
- Seed data ครบทุกสถานะใน `seed()` (บัญชี gradeA, partner); merge เข้า localStorage เดิมอัตโนมัติ
- ป้ายสถานะเดียว: ส่งคำขอแล้ว / ผู้ขายกำลังเสนอราคา / รอคุณตอบรับ / รอสั่งซื้อ / สั่งซื้อแล้ว / ปฏิเสธ / หมดอายุ + แถบความคืบหน้า 4 จุด (ส่งคำขอ → ผู้ขายเสนอราคา → ตอบรับ → สั่งซื้อ)
- การ์ดรายการแสดงสินค้า (รูป ชื่อ SKU จำนวน) สูงสุด 3 รายการ
- หน้ารายละเอียด (ออกแบบใหม่): หัว+stepper+แถบข้อมูลสำคัญ 4 ช่อง, "รายละเอียดคำขอ" พับเก็บ, รายการสินค้ามีรูป, ฝั่งขวาเป็นการ์ดยอดรวม+ปุ่มหลัก, "แนบ PO" / "ขอแก้ไข" / "ประวัติ" พับเก็บ (ปุ่มลูกศร 38px, state `qOpen`; อย่าใช้ `<details>` + `open`/`onToggle` bindings เพราะ scope พัง)

## ข้อควรระวังทางเทคนิค
- ห้าม `<img src="{{ ... }}">` ใน sc-if ที่ค่ายังไม่ resolve (ยิง request URL ดิบ) → ใช้ background-image หรือ element อื่น
- แก้ไฟล์ใหญ่ด้วย run_script + replace แบบ exact-match; ตรวจจำนวน match ก่อน


---

# ประวัติโครงสร้าง monolith เดิม (ไฟล์ถูกลบแล้ว; เลขบรรทัดใช้กับเวอร์ชันเก่าเท่านั้น)

## ไฟล์ในโปรเจกต์
- `Polytech Commerce.dc.html` — ไฟล์หลัก (แก้ที่นี่)
- `Polytech Commerce standalone-src.dc.html` — สำเนาสำหรับ build standalone (เกือบเหมือนกัน ต่าง ~1 บรรทัด); `Polytech Commerce (standalone).html` — ผลลัพธ์ bundle (อย่าแก้ตรง)
- `support.js` — DC runtime (generated จาก dc-runtime, **ห้ามแก้**) ทำหน้าที่ parse `<x-dc>` + `<script type="text/x-dc">` แล้ว render ด้วย React
- `ProductTile.dc.html` — คอมโพเนนต์การ์ดสินค้าเล็ก; `Polytech Wireframe Canvas.dc.html` — wireframe; `Polytech E-commerce Prototype.dc.html` — ไฟล์ว่าง
- `assets/` (โลโก้), `uploads/` (ภาพ reference ที่แปะมา), `store-front/` (ว่าง)

## โครงไฟล์หลัก (เรียงตามบรรทัดโดยประมาณ)
| บรรทัด | ส่วน |
|---|---|
| 1–28 | `<head>`: โหลด support.js, ฟอนต์ Sarabun, Leaflet (แผนที่ที่อยู่), CSS global |
| 29–167 | Demo bar (เลือกบัญชี/สถานการณ์/รีเซ็ต), Header/Navbar (ค้นหา, ภาษา, Log In, avatar), เมนูมือถือ |
| 168–1650 | หน้าสาธารณะ + ซื้อขาย: home 168, products 279, pdp 424, services 564, promos 682, about 700, contact 722, coupons 740, cart 758, checkout 949, success 1320, rfq 1438, register 1543 |
| 1652–2497 | `isAccount` — หน้าบัญชี (profile/addresses/credit/orders/quotes/leads/docs/notifications) + รายละเอียด order (`od.*`), quote (`qd.*`), lead (`ld.*`) |
| 2498–2700 | Modal/overlay: ที่อยู่ (`addrOpen`), Log In (`loginOpen`), `modalOpen` (เอกสาร/พิมพ์), แชต (`chatOpen`), toast |
| 2708 | `<script type="text/x-dc">` — `data-props` ของ editor (showCategoryRows, showDemoBar, defaultSegment, maxOrderWeightKg) |
| 2710–5523 | `class Component extends DCLogic` (ทั้งหมดของ logic) |

Template ใช้ไวยากรณ์ DC: `{{ expr }}`, `<sc-if value="{{ flag }}">`, `<sc-for list="{{ arr }}" as="x">`, handler เป็น `onClick="{{ fn }}"`. ค่าทั้งหมดที่ template ใช้ต้องถูก return จาก `renderVals()` (4103) / ฟังก์ชัน `*Vals`/`*VM`.

## class Component — ส่วนประกอบ
**ข้อมูล (field, 2711–3130)**
- `KEY='plt_proto_v2'` (localStorage), `L` พจนานุกรมข้อความ 2 ภาษา `[th, en]` (ใช้ผ่าน `t.xxx`), `m(th,en)` สำหรับข้อความ inline
- `CATS` หมวด, `PRODUCTS` (มี `pr[]` ราคาตาม priceIdx 0=ปลีก/1=Partner/2=Grade A, `stock`), `GROUPS`/`SUBS`/`HERO` หน้าแรก, `SERVICES`, `SVC_EXTRA`/`SVC_QUOTE`, `ACCOUNTS`, `CARRIERS` (c1 DHL, c2 Flash, c3 ไปรษณีย์ไทย, c4 KEX, c5 Polytechnology; `maxKg`), `COUPONS`, `MAXW=300`, `POLICY` (อายุใบเสนอราคา, ส่วนลด RFQ, งวดชำระ), `HOLDS` (สถานะค้างของ order: approval/seller/credit/payment/verify)

**บัญชีสาธิต (`ACCOUNTS`)**: `guest`, `walkin` (B2C), `bizNew` (นิติบุคคล จ่ายทันที), `partner` (เครดิต 30 วัน, ราคา idx1), `gradeA` (เครดิต 45 วัน, PO, เช็ค, ผู้อนุมัติ, ราคา idx2) — สลับแล้ว `resetIdentity()` เคลียร์ฟอร์ม + `prefill()`

**state หลัก (3050–3070)**: `lang, acct, route{p,...}, tab, cart, saved, coupon, wallet, search, filters, orders, quotes, leads, notifs, ck{step,mode,carrier,pay,po,accept,sameAddr,quoteRef}, form, addr{ship,bill,rfq}, rfq, chat*, stockAdj, toast, modal, api`
- `persist()` เขียน localStorage ใน `componentDidUpdate`; `componentDidMount` โหลด + merge seed (quotes/leads เพิ่มจาก `seed()` ถ้า id ยังไม่มี) + ตั้ง interval (hero 7s, tick 1s, จำลองสต็อก 9s)
- `seed()` (3132) — ข้อมูลตัวอย่าง orders/quotes/leads/notifs ครบทุกสถานะ

**Routing/ระบบ**: `go(p, extra)` เปลี่ยน `state.route` (p = home|products|pdp|services|promos|about|contact|coupons|cart|checkout|success|rfq|register|account; `login` เปิด modal), `say()` toast, `api(key,ms,fail,onOk)` จำลอง loading/error + `retryApi`

**กลุ่มฟังก์ชันตามหน้าที่ (บรรทัดโดยประมาณ)**
- Helper/format 3272–3372: `lang/li/tx/m`, `money/baht/dateStr`, `price/retail/stockOf/prod/svc/carrier`, `stockVM/priceVM`
- ตะกร้า/ราคา 3373–3512: `cartRows`, `totals`, `weightOf`, บริการเสริม (`ad*`, `pdpAdVals`, `rowAdVals`), `carrierOk`
- คูปอง/ที่อยู่/checkout 3513–3626: `useCoupon`, `prefill`, `ckSel`, `applyAddr`, `taxOn`, `ckAddrVals`, `creditVM`
- Order lifecycle 3627–3735: `notif`, `nextOrderId`, `holdMeta`, `updOrder`, `dropHold`, `rank`, `msDue` (milestone งานบริการ)
- Quote/Lead 3733–4020: `buildLines`, `priceQuote`, `serviceQuote`, `quoteTotals`, `qStatus`, `updQuote`, `hist`, `updLead`, `createLeadQuote`
- Scenario demo 4021: `scenarioDefs()` — sc1–sc9 (B2C QR, B2B จ่ายทันที, เครดิต 45 วัน, ไม่มี PO→รออนุมัติ, เกินวงเงิน, instant quote, RFQ→แก้ไข→สั่งซื้อ, ขอคำปรึกษา→สำรวจ→เสนอราคา, ใบเสนอราคาหมดอายุ)
- View-model: `filtered`/`productVM` 4061–4102, **`renderVals()` 4103** (รวมค่าให้ template: flag หน้า `isHome…isAccount`, `t`), `promoList`, `sections`, `storeVals` 4260, `addrTabVals`/`addrVals` + `thai()` (ข้อมูลจังหวัด/geo) 4413–4551, **`flowVals` 4552** (cart/checkout/success/RFQ), `okVM` (success), `odVM` (order detail), `qdVM` (quote detail), `ldVM` (lead detail), **`acctVals` 5208** (หน้าบัญชี)
- สถานะ/ป้าย 4858–4922: `statusLabel/Color`, `orderStatusText`, `payKey/Label/Color/Text`, `quoteStatusLabel/Color`, `paginate`, `mkTabs` (แท็บกลุ่มสถานะ)
- การชำระเงิน 4955–5030: `qrCells/qrSvg` (QR จำลอง), `payPanel(o, lock)` (พร้อมเพย์/โอน/เครดิต ใช้ร่วม success + order detail)
- Chat 3091–3107: `chatSend` ตอบอัตโนมัติตาม keyword

## ข้อควรรู้เมื่อแก้
- ข้อความใหม่ทุกจุดต้องมี 2 ภาษา (`L` หรือ `m(th,en)`); ราคาแสดงผ่าน `baht()`
- เพิ่ม flag/ค่าใน template → ต้อง return จาก `*Vals`/`renderVals` ด้วย ไม่งั้น `{{ }}` จะค้างเป็นข้อความดิบ
- state ใหม่ที่ต้องคงอยู่หลังรีเฟรช → เพิ่มใน `persist()` และ default ใน `state`
- เปลี่ยน schema ข้อมูล seed → ผู้ใช้เก่าอาจมี localStorage เดิม (merge เฉพาะ quotes/leads) ให้พิจารณา bump `KEY`
- แก้เสร็จแล้วควรซิงก์ไป `Polytech Commerce standalone-src.dc.html` เฉพาะเมื่อผู้ใช้ขอ

---

# `store-front/` — เวอร์ชันหลักแยกไฟล์ตามเมนูสำหรับ deploy

เปิดผ่าน HTTP เท่านั้น (runtime fetch ไฟล์ลูกด้วย fetch จึงเปิดแบบ file:// ไม่ได้) เช่น `python -m http.server 8000 --directory store-front` ที่โฟลเดอร์โปรเจกต์ แล้วเข้า `http://localhost:8000/`

- `index.html` — entry: head/CSS, root layout, `<script type="text/x-dc">` ที่มี class Component (state/logic/ข้อมูลทั้งหมดอยู่ที่นี่ที่เดียว) และ routing ด้วย `sc-if` → `dc-import`
- ทุกส่วนของ UI เป็นไฟล์ `*.dc.html` ในโฟลเดอร์เดียวกัน (flat, runtime อ่านได้เฉพาะโฟลเดอร์เดียวกับ index) — ไม่มี logic ของตัวเอง
  - Layout: `DemoBar`, `Header` (navbar/ค้นหา/เมนูมือถือ), `Footer`, `ChatWidget`, `Toast`
  - หน้า: `Home`, `Products`, `Pdp`, `Services`, `Promos`, `About`, `Contact`, `Coupons`, `Cart`, `Checkout`, `Success`, `Rfq`, `Register`, `Account`
  - แท็บในบัญชี (ถูกเรียกจาก `Account`): `AccountProfile`, `AccountAddresses`, `AccountCredit`, `AccountOrders`, `AccountOrderDetail`, `AccountQuotes`, `AccountQuoteDetail`, `AccountLeads`, `AccountLeadDetail`, `AccountDocs`, `AccountNotifications`
  - Overlay: `AddressModal`, `LoginModal`, `DocumentModal`
- วิธีส่งข้อมูล: `renderVals()` ใน index คืน `all` (อ้างตัวเอง) แล้วทุกไฟล์ลูกถูกเรียกด้วย `<dc-import name="X" dcProps="{{ all }}">` → template ในไฟล์ลูกใช้ `{{ ... }}` ชื่อเดิมได้ทุกตัว ไม่ต้องเปลี่ยน
- เพิ่ม/แก้ค่า template: ยังเพิ่มใน `*Vals`/`renderAllVals()` ใน index เหมือนเดิม; เพิ่มหน้าใหม่ = สร้าง `Name.dc.html` + เพิ่ม `sc-if` + `dc-import` ใน index (หรือใน Account สำหรับแท็บ)
- CSS `#dc-root .sc-host .sc-host { display:contents }` ใน index ทำให้ wrapper ของคอมโพเนนต์ไม่กระทบ layout (อย่าลบ)
- path รูป/สคริปต์ถูกปรับเป็น `./support.js` และ `./assets/...`
- ตรวจแล้วกับต้นฉบับ: เทียบ DOM 200 สถานะ (ทุกหน้า × ทุกบัญชี × ทุกสเต็ป checkout/แท็บบัญชี/รายละเอียด order-quote-lead) ไม่ต่างกัน + เทียบ flow คลิกจริง (เมนู→ตะกร้า→checkout→แชต) ตรงกัน
