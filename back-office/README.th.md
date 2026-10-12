# Polytechnology Back-office

ต้นแบบครบ 15 เมนูตาม [แผน](../docs/BACK_OFFICE_PLAN.th.md) และ [ภาพอ้างอิง](../graphic/back-office/README.th.md): authentication 3 หน้า + content 134 หน้า ดู [รายการหน้าจอและภาพ](SCREEN_COVERAGE.th.md)

## เปิดใช้งาน

```powershell
python -m http.server 8001 --directory back-office
```

เปิด http://localhost:8001/ ผ่าน HTTP เท่านั้น ต้องใช้อินเทอร์เน็ตสำหรับ React/Babel และ Sarabun ไม่ต้อง build หรือติดตั้ง npm สำหรับ Vercel ตั้ง Root Directory เป็น `back-office`, Framework Preset เป็น Other

อีเมล `staff@polytechnology.demo` / รหัสผ่าน `PolytechDemo!` ใส่เป็นค่าเริ่มต้นชั่วคราวใน `state` ของ `index.html` ตามคำขอผู้ใช้ เข้าสู่ระบบแล้วเปิดภาพรวมผู้จัดการ

## วิธีทดลอง

- เลือกหนึ่งใน 15 เมนู Sidebar แล้วเลือกกลุ่มข้อมูล/งานผ่าน Select ใน Filter block ด้านบน ทุกเมนูใช้ Filter block ร่วมกัน
- รายการรองรับค้นหา สถานะ ช่วงวันที่ แบ่งหน้า เปิดรายละเอียด/แก้ไข และ CSV ตามข้อมูลที่มีสิทธิ์
- ตัวกรองเสริมเปลี่ยนตามกลุ่มข้อมูล เช่น แบรนด์/ประเภทสินค้า, ลูกค้า/ผู้รับผิดชอบคำสั่งซื้อ, ขนส่ง/รอบส่ง และประเภทเอกสาร ตัวเลือกมาจากข้อมูลใน scope ที่อ่านได้เท่านั้น ค้นหาชื่อลูกค้า/ผู้รับผิดชอบที่อ้างอิงได้ด้วย
- ช่องค้นหาและวันในภาพรวมมีผลต่อ metrics/ตาราง; รายงานใช้ตัวกรองของแหล่งข้อมูลที่เลือก หน้ารายละเอียดค้นหาแล้วเลือก record จากผลค้นหาได้ ส่วนหน้าฟอร์มค้นหาชื่องานใน Select โดยไม่เปลี่ยนข้อมูลที่ยังไม่บันทึก ปุ่มล้างตัวกรองรีเซ็ตเงื่อนไขและหน้า pagination
- ฟอร์มสร้างเริ่มว่าง ฟอร์มแก้ไขมีข้อมูลจำลอง ใช้หนึ่งคอลัมน์ หนึ่ง field ต่อแถว ข้อมูลเพิ่มเติมพับเก็บ และแถบบันทึกด้านล่าง
- หน้า ERP สินค้า/แบรนด์/ราคา/stock/history อ่านอย่างเดียว ฟอร์มเว็บแก้ชื่อ/คำอธิบาย/รูป/taxonomy/publication ได้ โดยไม่แก้ master ERP
- คำขอ SAP เก็บร่างและหลายรายการสินค้าพร้อม VAT ตัวอย่าง 7%; คำขอ revision ไม่แก้ snapshot ที่ออกแล้ว ไม่มีออกเอกสาร SAP หรือส่งอีเมลจริง
- งานคลังตรวจ Hold และน้ำหนักก่อนรับงาน/แพ็ก/Booking, เลือกขนส่งตามเพดาน และแยกความจุรอบสาธิตจากเพดาน order 300 กก.
- ตรวจรับชำระมี dialog ยืนยัน เช็คที่รับ/นำฝากยังไม่ใช่รับเงินจริง เคลียร์เช็คบันทึก receipt ครั้งเดียว และงานบริการเสร็จไม่เปลี่ยนสถานะเงิน
- ราคาและเครดิตลูกค้าพิจารณาแยกกัน ผู้เสนอและผู้อนุมัติต้องเป็นคนละคน
- คลังสื่ออัปโหลดรูป PNG/JPEG/WebP ไม่เกิน 2 MB; เอกสารแนบเก็บเพียงชื่อไฟล์จำลอง ไม่อัปโหลด server
- เอกสารตัวอย่างดู snapshot พิมพ์ และดาวน์โหลด HTML ได้ ไม่ใช่ PDF/ใบกำกับภาษีจริง
- Inbox เก็บข้อความตอบกลับในต้นแบบเท่านั้น นำเข้า JSON ได้เฉพาะเนื้อหาเว็บและบล็อก field ERP เช่น SKU/price/stock
- สลับผู้ใช้สาธิตที่ avatar → สลับผู้ใช้สาธิต มี Demo, Manager, Sales, Warehouse, Accounting, Credit, Service, Support, Admin ข้อมูล/ปุ่มเปลี่ยนตาม scope และสิทธิ์จำลอง ผู้ดูแลระบบไม่ได้สิทธิ์การเงินโดยอัตโนมัติ
- เมนูตั้งค่า → ตั้งค่า ผู้ใช้ และรายงาน มีปุ่มรีเซ็ตข้อมูลสาธิตพร้อมยืนยัน

## การเปลี่ยนสถานะด้วย Stepper

เปิดรายละเอียดคำสั่งซื้อ, RFQ, ใบเสนอราคา หรือคำสั่งงานบริการ จะเห็นขั้นตอนปัจจุบันและบทบาทที่รับงานต่อ รายการในตารางแสดงคอลัมน์ขั้นตอนปัจจุบัน/ผู้ดำเนินการถัดไปด้วย

| รายการ | ขั้นตอน | ฝ่ายดำเนินการ |
|---|---|---|
| คำสั่งซื้อ | รับคำสั่งซื้อ → ยืนยัน → ส่งคลัง → จัดเตรียม → แพ็ก → จัดส่ง → ส่งมอบ | Sales ยืนยัน/ส่งคลัง, Warehouse จัดเตรียม/แพ็ก/ส่ง, Support ยืนยันส่งมอบ |
| RFQ | รับ RFQ → ตรวจความต้องการ → เตรียมข้อมูลเสนอราคา → มีใบเสนอราคา | Sales ตรวจ, Sales/Engineer เตรียมข้อมูล, Sales ยืนยันฉบับ SAP ที่เชื่อม |
| ใบเสนอราคา | ตรวจข้อมูล → ฉบับพร้อมส่ง → ส่งให้ลูกค้า → ลูกค้าตอบรับ → เป็นคำสั่งซื้อ | Sales บันทึกการส่งและหลักฐานตอบรับ; ขั้นสุดท้ายต้องมี order ของลูกค้าคนเดียวกันเชื่อมอยู่แล้ว |
| คำสั่งงานบริการ | รับงาน → ยืนยันขอบเขต → นัดหมาย → ทำงาน → ทดสอบ → รอตรวจรับ → ส่งมอบ | Sales ยืนยันขอบเขต, Engineer ดำเนินงานและส่งมอบ |

กรอกบันทึกภายในแล้วกด **ดำเนินการขั้นถัดไป** พร้อม dialog ยืนยัน ทำได้ทีละขั้นตาม role, write grant และ scope เท่านั้น ผู้จัดการอ่านอย่างเดียว และ Admin ไม่ได้รับสิทธิ์ Engineer อัตโนมัติ บันทึกฟอร์ม metadata ไม่เปลี่ยนสถานะอีกต่อไป ประวัติเก็บจาก/ไป, เวลา Asia/Bangkok, ผู้ดำเนินการ, role, บันทึกและหลักฐาน

ในหน้ารายละเอียดคำสั่งซื้อ ฝ่ายคลังบันทึกน้ำหนัก ผลตรวจแพ็ก และผู้ขนส่ง/วันที่ส่ง/เลขติดตามได้ในส่วน **ข้อมูลสำหรับขั้นตอนถัดไป** กด **บันทึกข้อมูลขั้นตอน** แล้วกรอกบันทึกภายในและกดดำเนินการขั้นถัดไป ข้อมูลที่ยังไม่บันทึกจะล็อกปุ่มไว้ การบันทึกข้อมูลไม่เปลี่ยนสถานะหรือปลด Hold และลูกค้าสัมพันธ์ต้องระบุหลักฐานรับสินค้าก่อนยืนยันส่งมอบ

Hold บล็อกงานคลัง; แพ็กต้องมี checklist และน้ำหนัก; ส่งต้องมีขนส่ง/วันส่ง/เลขติดตาม; ส่งมอบต้องมีหลักฐาน; งานบริการเสร็จต้องบันทึก acceptance และ attachment; ใบเสนอราคาหมดอายุหรือไม่มีฉบับ SAP/คำสั่งซื้อต้นทางจะไปต่อไม่ได้ สถานะเงินคงแยกจากความคืบหน้า ข้อมูลฉบับและรายการราคาไม่เปลี่ยนตาม Stepper

ปุ่ม **เปิดมุมมองติดตามของลูกค้า** เปิด `tracking.html?type=orders&id=SO-2569-0005` (รองรับ `rfqs`, `quotes`, `jobs` ด้วย) ซึ่งรับ projection `plt_bo_tracking_v1` และอัปเดตเมื่อสถานะเปลี่ยน แสดงเฉพาะขั้นตอนและเวลา ไม่ส่งบันทึกภายใน ผู้ทำรายการ หลักฐาน ราคา หรือยอดเงินไปใน projection

หน้าติดตามนี้เป็น **preview ใน browser/profile/origin เดียวกัน** ยังไม่ได้เชื่อมเข้าบัญชีลูกค้าใน store-front และไม่ใช่ลิงก์ติดตามข้ามเครื่อง ระบบจริงต้องเชื่อม ID กลาง, backend workflow, server RBAC, concurrency และ customer ownership ก่อนใช้งานกับลูกค้าจริง ไม่เขียนทับ mock data ของ store-front

Logic ขั้นตอนอยู่ใน `workflow.js` และ controller ใน `index.html`; `WorkflowStepper.dc.html` ใช้ร่วมกันทุกเมนู และ `tracking.js` render เฉพาะข้อมูล projection ทดสอบโดยสลับ role ที่ avatar หรือ Demo operator สำหรับเดินหลายฝ่ายในแท็บเดียว

## โครงสร้างและการแก้ต่อ

ใช้ Design Component แบบเดียวกับ store-front, UI อยู่ใน `.dc.html` ระดับเดียวกับ entry และรับ `dcProps="{{ all }}"`

- `index.html`: state, routing, permissions, scope, validation, mock workflows, view models และ handlers
- `LayoutShell.dc.html`, `Sidebar.dc.html`, `Topbar.dc.html`: shell เดียวที่คงอยู่ขณะเปลี่ยนหน้า
- `ContentOutlet.dc.html`: heading, breadcrumbs, navigation ของโมดูล และเลือก presentation ตามชนิดหน้า
- `FilterBlock.dc.html`: Select กลุ่มข้อมูล/งาน, text search, status, facets และช่วงวันที่ร่วมกันทุกเมนู; config/handlers อยู่ใน `filterBlockVM()` และ `filteredRows()` ใน `index.html`
- `ListPage`, `FormPage`, `DetailPage`, `DashboardPage`, `InboxPage`, `MediaPage`, `PreviewPage`, `SettingsPage`, `RolesPage`, `IntegrationsPage`, `ImportPage`: templates ร่วม ไม่แสดงภาพ PNG แทน UI
- `DataTable.dc.html`, `FormFields.dc.html`: table และ vertical field components
- `screen-catalog.js`: schema เฉพาะทั้ง 134 หน้า, route ID, TH/EN title, collection และ 560 field definitions จาก `tools/build-screen-catalog.py`
- `store-seed.js`: mock catalogue 61 products/5 services จาก storefront; รีเฟรชด้วย `node back-office/tools/export-store-seed.cjs`
- `business-data.js`: fixtures ของแต่ละโมดูล, columns, labels, roles และ readonly collections
- `styles.css`: tokens/สีเดิม, responsive shell, tables, cards, ฟอร์มหนึ่งคอลัมน์ และ print styles
- `support.js`: generated runtime สำเนาเดิม ห้ามแก้; คงกฎ `#dc-root .sc-host .sc-host { display:contents; }`

เพิ่ม/แก้ field หรือชนิดหน้าใน `tools/build-screen-catalog.py` แล้วรัน `python back-office/tools/build-screen-catalog.py` เพื่ออัปเดต catalog และ coverage ไม่ต้องรัน generator ตอนเปิดเว็บ/deploy ถ้าเพิ่มพฤติกรรมใหม่ ให้เพิ่ม handler/validation/view model ใน `index.html` และแก้ presentation template ที่เกี่ยวข้อง

## การเก็บข้อมูลและ authentication จำลอง

ภาษาอยู่ใน `plt_bo_lang`; records ของเว็บและ audit อยู่ใน `plt_bo_content_v1` ใน localStorage เพื่อให้ลองแก้ไขต่อหลังรีเฟรชได้ readonly ERP fixtures ไม่ถูกบันทึกทับ source fixture และไม่แก้ storefront

ไม่เก็บรหัสผ่านหรือ session ถาวร การรีเฟรชกลับหน้า login แต่ข้อมูลสาธิตที่บันทึกยังอยู่ Password reset เปิดจากปุ่มลิงก์สาธิตหลังคำขอลืมรหัสผ่าน ไม่ส่งอีเมลจริง ใช้สิทธิ์ reset ในหน่วยความจำ 10 นาทีสำหรับสาธิตและใช้ครั้งเดียว นโยบายจริงยังรอยืนยัน รหัสใหม่ใช้ได้เฉพาะแท็บปัจจุบันจนรีเฟรช

`LoginSuccess.dc.html` รองรับแท็บ login รุ่นเก่าด้วยการโหลด entry ใหม่และส่งต่อผล login จำลองผ่าน `plt_bo_shell_upgrade` ใน sessionStorage เพียงครั้งเดียวแล้วลบ หากแท็บเก่าโหลด component ไม่สำเร็จแล้ว กด `Ctrl+Shift+R` และ login ใหม่

ระบบนี้ไม่มี backend, database กลาง, server-side RBAC, live ERP/SAP/accounting, การรับเงิน/ส่งอีเมลจริง หรือการเผยแพร่ข้อมูลไป storefront สิทธิ์และกติกาเป็นต้นแบบ browser ไม่ใช่ระบบ production รายละเอียด API, coverage/capacity จริง, bank roles, SLA และ field ownership ที่ยังไม่ชัดใช้สถานะรอยืนยันตามแผน

## ตรวจสอบ

จาก project root:

```powershell
node back-office/tests/content-workflows.cjs
python back-office/tests/browser-auth.py
python back-office/tests/browser-shell.py
python back-office/tests/browser-shell-upgrade.py
python back-office/tests/browser-content.py
python back-office/tests/browser-workflows.py
python back-office/tests/browser-stepper.py
python back-office/tests/browser-filters.py
```

Browser checks ต้องเปิด server 8001 และมี Playwright/Chrome รองรับ tools ที่ `verification/back-office/tools` หรือ Playwright ใน Python environment; `POLYTECH_BO_URL` และ `POLYTECH_TEST_CHROME` เปลี่ยน URL/Chrome path ได้

ตรวจ 134 content routes ทั้ง TH/EN, desktop/tablet/mobile, shell, login/reset, validation, CRUD persistence, Booking, receipt confirmation, ownership, scope, holds, immutable issued snapshots, idempotency, inbox และ import ภาพและ JSON reports อยู่ใน `verification/back-office/`

## การเชื่อมสถานะคำสั่งซื้อกับขนส่ง

คำสั่งซื้อเป็นข้อมูลหลักของขั้นตอนทั้งหมด บันทึกข้อมูลเตรียมสินค้าได้ทั้งหน้ารายละเอียดและหน้าจัดเตรียมสินค้า และเปลี่ยนขั้นตอนผ่าน Stepper ตามฝ่ายรับผิดชอบ เมื่อแพ็กพร้อมส่งจะเข้ารายการ Booking อัตโนมัติ รวมทั้งแสดงรายการติด Hold ให้เห็นเหตุผลที่ยังส่งไม่ได้

Booking และรอบส่งบันทึกผู้ขนส่ง/วันส่งกลับไปยังคำสั่งซื้อ เลขติดตามจาก Booking หรือหน้าแก้ไขการจัดส่งใช้ปลดล็อกขั้นจัดส่งของคำสั่งซื้อเดียวกัน มี Stepper ของคำสั่งซื้อที่เชื่อมอยู่ในฟอร์ม Booking/การจัดส่ง/รับเอง และลิงก์จากรายละเอียดคำสั่งซื้อเปิดรายการที่ตรงกัน

การสร้างรายการด้วย **บันทึกการจัดส่ง** ยืนยันจากแพ็กพร้อมส่งเป็นจัดส่งแล้วโดยตรวจสิทธิ์และความพร้อม การแก้ข้อมูลขนส่งไม่ข้ามขั้นหรือยืนยันส่งมอบแทนลูกค้าสัมพันธ์ เมื่อฝ่ายลูกค้าสัมพันธ์ยืนยันหลักฐานรับสินค้า สถานะ Booking/การจัดส่ง/รับเองเปลี่ยนเป็นส่งมอบแล้วพร้อมคำสั่งซื้อ สถานะเงินยังแยกจากความคืบหน้า

รับเองใช้วัน/ช่วงเวลา/ผู้รับ/โทรศัพท์แทนผู้ขนส่งและเลขพัสดุ ฝ่ายคลังส่งมอบสินค้าในขั้นจัดส่งแล้ว จากนั้นลูกค้าสัมพันธ์ยืนยันการรับสำเร็จพร้อมหลักฐาน ข้อมูลสาธิตเดิมจะเชื่อมใหม่เมื่อเปิดหน้า โดยเก็บข้อมูลเดิมและนำข้อมูลขนส่งที่ขาดกลับเข้าคำสั่งซื้อ ไม่ข้ามสถานะจากข้อมูลขนส่งเก่า
