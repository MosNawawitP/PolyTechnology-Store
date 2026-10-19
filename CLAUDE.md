# Polytech Commerce — handoff (ภาษาตอบ: ไทย, สั้น กระชับ)

Prototype e-commerce B2C/B2B ของ Polytechnology — ข้อมูล ราคา สต็อก เครดิต การชำระเงิน เอกสาร แชต ทั้งหมดเป็น mock ใน browser ไม่มี backend. UI สองภาษา TH/EN.

ผู้ใช้ชอบ: แก้เฉพาะที่ขอ, ตอบสั้น, ถามคำปรึกษา → วิเคราะห์ก่อนแล้วรอให้เลือก
Known issue ที่ไม่ต้องแก้: console โหลด `{{ hero.photo }}` ดิบตอนเปิดหน้า (ไม่กระทบการแสดงผล)

## เอกสารที่ต้องอ่านต่อ
- `AGENTS.md` (root) — คู่มือกลางทั้ง repo: store-front, back-office, verification, tests, commit rules
- `store-front/AGENTS.md` — รายละเอียดเฉพาะหน้าร้าน (data model, DC conventions, วิธีตรวจ)
- `README.md` — ขั้นตอน GitHub/Vercel; `store-front/tests/README.md` — วิธีรัน tests
- ถ้าข้อมูลขัดกัน ให้เชื่อ source + tests ปัจจุบันก่อนเอกสาร

## โครง repo
- `store-front/` — หน้าร้าน (เว็บหลัก, deploy ตัวนี้) · `back-office/` — หลังบ้านพนักงาน เว็บแยก (port 8001, runtime/`support.js` ของตัวเอง) · `verification/` — สคริปต์/รายงานตรวจ ไม่ใช่ source · `tmp/` ว่าง
- ไม่มี `package.json`/build; Node ใช้รัน tests, Python ใช้ serve + browser checks
- ไฟล์ monolith/standalone/wireframe รุ่นเก่าถูกลบแล้ว (เลขบรรทัดใน CLAUDE.md เวอร์ชันก่อนหน้าใช้ไม่ได้อีก)

## รัน/ deploy
- Preview: `python store-front/serve.py` (เพิ่ม `--port N` ได้) → `http://localhost:8000/` — มี SPA fallback ให้ clean URL; ห้ามเปิดแบบ `file://` (runtime `fetch` ไฟล์ `.dc.html`)
- ต้องใช้อินเทอร์เน็ต: React/Babel (unpkg), ฟอนต์ Sarabun, Leaflet + CARTO tiles, รูปบางส่วนจาก Wikimedia
- Vercel: Root Directory `store-front`, Framework Other, ไม่มี build/install; config ใน `store-front/vercel.json` (`cleanUrls:false` + rewrites ไป `index.html` ต่อหน้าหลักและ `/account/:path*`) — เพิ่มหน้า/URL ใหม่ต้องเพิ่ม rewrite ที่นี่ด้วย
- `index.html` มี `<base href="/">` เพื่อให้ component/assets โหลดจาก root เมื่ออยู่ nested path (อย่าลบ)

## สถาปัตยกรรม store-front
- `index.html` = source of truth เดียว: CSS, route switch (`sc-if` → `dc-import`), `class Component extends DCLogic` (state, mock data, business rules, handlers, view models)
- `*.dc.html` = template ล้วน ไม่มี script/state; รับ props ชุดเดียว `dcProps="{{ all }}"` (`renderVals()` เรียก `renderAllVals()` แล้วใส่ `all`)
- Runtime `./support.js` เป็น generated — **ห้ามแก้**; Footer/shared CSS ห้ามเปลี่ยนในงานหน้าอื่น
- CSS `#dc-root .sc-host .sc-host { display:contents }` ต้องคงไว้ ไม่งั้น layout เพี้ยน
- ไฟล์ child อยู่ flat ข้าง `index.html` (ห้ามย้ายเข้า subfolder), ชื่อไฟล์ตรง `dc-import name` แบบ case-sensitive, คง wrapper (doctype, head, `./support.js`, body, `<x-dc>`)
- ค่า/handler ที่ template ใช้ต้อง return จาก `renderAllVals()` หรือ helper ที่ spread เข้าไป (`storeVals/flowVals/acctVals/addrTabVals/...`) ไม่งั้น `{{ }}` ค้างเป็นข้อความดิบ
- ข้อความใหม่ต้องมี 2 ภาษา: `L` (ข้อความใช้ซ้ำ → `t`), `m(th,en)` (เฉพาะจุด), คู่ `[th,en]` อ่านผ่าน `tx()`; เงินแสดงผ่าน `baht()`

### ไฟล์ UI
- Layout: `DemoBar` (ซ่อนด้วย `display:none`), `Header`, `Footer`, `ChatWidget`, `Toast`
- หน้า: `Home, Products, Pdp, Services, Promos, About, Contact, Coupons, Cart, Checkout, Success, Rfq, Register, Account`
- แท็บบัญชี (เรียกจาก `Account`): `AccountProfile/Addresses/Credit/Orders/OrderDetail/Quotes/QuoteDetail/Leads/LeadDetail/Docs/Notifications`
- Overlay: `AddressModal`, `LoginModal`, `DocumentModal`

### Routing (clean URL + History API)
- `state.route.p`: `home products pdp services promos about contact coupons cart checkout success rfq register account`; `go(p, extra)`; `go('login')` เปิด modal ไม่ใช่หน้า
- `urlForNavigation()` / `navigationFromPath()` เป็น mapping กลางระหว่าง state ↔ URL; `syncBrowserUrl()` เรียกใน `componentDidUpdate`; `popstate` คืน state
- ตอน mount URL ใน address bar ชนะ route ที่ persist ไว้
- Path: `/products`, `/products/:id`, `/promotions`, `/order-success`, `/request-a-quote`, `/register/:kind[/success]`, `/account[/addresses|credit|orders[/:oid]|quotes[/:qid]|consultations[/:lid]|documents|notifications]`
- เพิ่มหน้าใหม่ = template + route flag ใน `renderAllVals()` + `sc-if`/`dc-import` ใน index + mapping ไป-กลับ + rewrite ใน `vercel.json` + ทดสอบ direct URL/refresh/Back-Forward

## สถานะปัจจุบันที่ควรรู้
- **บริการซ่อนทั้งเว็บ**: `SHOW_SERVICES = false` ใน `index.html` — ซ่อนเมนู/การ์ด/Promos บริการ, route `services` (→ home), PDP ของสินค้าบริการ (→ products), แท็บ "คำขอคำปรึกษา" (→ profile), order/quote/lead/notif ของงานบริการ, สินค้าบริการออกจาก catalogue. workflow lead → survey → quote → service order ยังอยู่ในโค้ด (dormant) ห้ามลบ; guard ด้วย `isServiceProduct()`, `catalogueProducts()`, `visibleCartLines()`
- **Layout เดสก์ท็อปล็อก**: ขั้นต่ำ 1240px (`state.w`), เนื้อหา max 1680px; จอแคบเลื่อนแนวนอนโดยตั้งใจ ไม่ทำ mobile layout
- **Editor props** (`data-props`): มีแต่ `showCategoryRows` ที่ทำงานจริง; `showDemoBar`, `defaultSegment`, `maxOrderWeightKg` ยังไม่ผูก (น้ำหนักใช้ `MAXW = 300`)
- **Home**: hero 5 สไลด์ (overview + 4 แคมเปญ) autoplay 7 วิ หยุดเมื่อ hover/focus/reduced-motion; ปุ่ม prev/next/pause ถูกถอดแล้ว; รูปใช้ WebP `srcSet` + fallback PNG (`homeHeroImageError` ต้องล้าง srcset ก่อนเปลี่ยน src); คลิกธุรกิจ → `browseHomeCategory()` ล้าง filters เก่า
- **เลขออเดอร์**: `P|S` + `yymmdd` + ตัวอักษร A–Z 5 ตัว (P = สินค้า, S = บริการ) สร้างด้วย `nextOrderId(kind)`; ข้อมูลเก่าใน localStorage ถูกแปลงโดย `migrateOrderNumbers()` ตอน mount
- **Cart**: เลือกสินค้าด้วย checkbox (ยอดรวมคิดเฉพาะที่เลือก), ไม่มี "บันทึกไว้ทีหลัง" แล้ว, จำนวนไม่เกินสต็อก, ตะกร้าที่อ้างใบเสนอราคาล็อกการแก้
- **เครดิต**: `creditSummaryVM()` ใช้ใน Cart (แถบเครดิตเฉพาะบัญชีเครดิต) และ dropdown avatar ใน Header (`showAcctCredit`/`acctCredit` — % คงเหลือ + วงเงิน)
- **กระดิ่งแจ้งเตือน (Header)**: อยู่ระหว่างปุ่มภาษากับ avatar เฉพาะตอนล็อกอิน; badge แดงนับรายการที่ยังไม่อ่าน (cap `9+`); dropdown แสดง 5 รายการล่าสุด + "อ่านทั้งหมด" + ลิงก์ไปแท็บตั้งค่าแจ้งเตือน; logic อยู่ที่ `notifBellVals()`, ใช้ `visibleNotifs()` ร่วมกับ `acctVals()` (กรองแจ้งเตือนบริการตอน `SHOW_SERVICES=false`); สถานะอ่านเก็บเป็น `read:true` บน `notifs` (ไม่มี flag = ยังไม่อ่าน); `notifOpen` ปิดพร้อมเมนูอื่นผ่าน `closeMenus` และทุกจุดที่ตั้ง `acctOpen:false`; `notifs` ยังไม่แยกตามบัญชี และแจ้งเตือนยังไม่มี ref ไปออเดอร์/ใบเสนอราคา (กดรายการได้แค่ mark read ไม่ได้พาไปหน้านั้น)
- **Checkout 4 สเต็ป** (`ck.step`): 1 ผู้ซื้อ/ที่อยู่ → 2 จัดส่ง/รับเอง → 3 ชำระเงิน → 4 ตรวจสอบ; ไม่มีช่อง PO/ไฟล์อนุมัติแล้ว — **PO อยู่ที่ขั้นแปลงใบเสนอราคาเป็นออเดอร์** (`orderFromQuote`) เท่านั้น
- **Success**: สรุปเรียงแนวตั้ง ไม่มีบล็อก "สิ่งที่ต้องทำต่อ"; ออเดอร์ที่ชำระแล้วมีปุ่มดาวน์โหลดใบเสร็จ (`downloadDoc('receipt', ...)`); ออเดอร์/การ์ดแสดงชิปสถานะการชำระเงิน
- **ขนส่ง** `CARRIERS` c1 DHL 70 / c2 Flash 50 / c3 ไปรษณีย์ไทย 30 / c4 KEX 60 / c5 Polytechnology 300 กก.; เกินเพดานซ่อนเจ้านั้น (`carrierOk()`); order รวม >300 กก. หรือไม่มีน้ำหนัก → block
- **บัญชีสาธิต** `guest, walkin, bizNew, partner (เครดิต 30 วัน, ราคา idx1), gradeA (เครดิต 45 วัน, PO/เช็ค/ผู้อนุมัติ, ราคา idx2)`; `price()` เลือก `pr[priceIdx]`; `null` = ไม่มีราคาซื้อตรง
- **Scenarios** `sc1`–`sc16` ใน `scenarioDefs()` ใช้เป็น regression checklist (DemoBar ซ่อน จึงเรียกผ่าน logic/tests)
- **Persistence**: key `plt_proto_v2` — persist เฉพาะ `lang acct route tab cart coupon wallet orders quotes leads notifs ck form lastOrder lastQuote pendingApproval regCo seeded`; filters/address book/`pdpAd`/stockAdj ไม่ persist; `seed()` merge orders/quotes/leads ตาม `id`; อย่า bump `KEY` โดยไม่จำเป็น (ล้าง demo progress ของผู้ใช้)
- Timers: hero 7s, สต็อกจำลอง 9s, clock 1s (cleanup ใน `componentWillUnmount`)
- ใบเสนอราคา: อายุ instant 7 / RFQ 21 / service 30 วัน; ป้ายสถานะเดียวผ่าน `qStatus()`; รายละเอียดใช้ state `qOpen` + ปุ่มพับ **ห้ามใช้ `<details>` + dynamic `open`/`onToggle`** (scope พัง)

## เมื่อเพิ่ม state / logic
- state ใหม่: default ใน `state` → `resetDemo()` → `resetIdentity()` (ถ้าผูกตัวบุคคล/บริษัท) → `persist()` เฉพาะที่ต้องอยู่หลัง refresh
- คำนวณ price/totals/weight/VAT/coupon/quote totals ผ่าน helper ใน index เท่านั้น ไม่ทำใน template
- ใช้ immutable `setState` กับ array/object ซ้อน; ใช้ `id` ไม่ใช่ index

## ข้อควรระวังทางเทคนิค
- ห้าม `<img src="{{ ... }}">` ใน `sc-if` ที่ค่ายังไม่ resolve (ยิง request URL ดิบ) → ใช้ background-image หรือรอ data พร้อม
- แก้ไฟล์ใหญ่ด้วย exact-match replace; ตรวจจำนวน match ก่อนแทน
- ก่อน/หลังแก้ดู `git status --short` — worktree อาจมีงานค้างของผู้ใช้ อย่า reset/clean ไฟล์ที่ไม่ใช่งานตัวเอง

## ตรวจงาน
- Node regression (ไม่ต้องเปิด browser) — รันจาก root: `node --preserve-symlinks-main store-front/tests/<ไฟล์>.cjs`
  `home-redesign`, `url-routing`, `services-hidden`, `service-request-progress`, `cart-credit-display`, `cart-item-selection`, `cart-stock-limit`, `header-credit-dropdown`, `header-notification-bell`, `order-number-format`, `product-card-price-display`, `product-list-buy-now`, `quote-po-order-flow`, `account-order-detail-status`, `success-page-layout` (ผ่านครบ 15 ไฟล์ ณ 19 ต.ค. 2026)
- Browser (Playwright + Chrome): `python store-front/serve.py --port 8765` แล้ว `python store-front/tests/browser-home-redesign.py` (viewport 1240/1440/1920/2541/768, TH/EN, clean URL, Back/Forward); `browser-hero-image.py` ตรวจ WebP/PNG fallback
- Node tests ไม่ตรวจ DOM/CSS/HTTP loading — งาน UI ต้องเปิดจริงผ่าน HTTP ดู console, TH/EN, guest + บัญชีที่เกี่ยว, refresh/reset
- งานแตะ checkout ทดสอบ 299/300/301 กก., ไม่มีน้ำหนัก, mixed cart, delivery/pickup

## Git
- ไม่ commit/push/deploy จนกว่าผู้ใช้สั่ง; stage เฉพาะไฟล์งาน
- กฎ commit (อังกฤษ, ไม่ระบุ AI, `type(scope): summary`, body เป็น bullet ต่อไฟล์, แยก commit ตามงาน, ห้ามอักขระพิเศษ/โค้ดใน message, ห้าม stage `package-lock.json` และ `next.config.ts`) อยู่ใน `~/.claude/CLAUDE.md` + หัวข้อ Git ใน `AGENTS.md`
