# รายการหน้าจอ Back-office ที่สร้างแล้ว

ต้นแบบมีหน้า authentication 3 หน้า และ content 134 หน้า ใช้ schema ของแต่ละหน้ากับ presentation templates ร่วมกัน ไม่ได้ใช้ภาพ PNG แทน UI

ภาพอ้างอิงเป็นแนวทาง composition และสี ตัวเลข/SKU ใช้ข้อมูลสาธิตจาก storefront และ fixture ของ Back-office ระบบจริงและ field mapping ยังรอยืนยันตามแผน

หน้า authentication: `StaffLogin.dc.html`, `ForgotPassword.dc.html`, `ResetPassword.dc.html`

หน้า content ทั้งหมดเปิดผ่านเมนูหลักและ Select กลุ่มข้อมูล/งานใน Filter block ด้านบน; เส้นทางอยู่ใน `state.screen` ไม่ใช่ URL path

## dashboard — 6 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| สถานะการเข้าถึงรายงาน (`01-dashboard/access-states`) | dashboard | 0 | [ภาพ](../graphic/back-office/01-dashboard/access-states.png) |
| ภาพรวมฝ่ายบัญชี (`01-dashboard/accounting`) | dashboard | 0 | [ภาพ](../graphic/back-office/01-dashboard/accounting.png) |
| ภาพรวมผู้จัดการ (`01-dashboard/manager`) | dashboard | 0 | [ภาพ](../graphic/back-office/01-dashboard/manager.png) |
| ภาพรวมฝ่ายขาย (`01-dashboard/sales`) | dashboard | 0 | [ภาพ](../graphic/back-office/01-dashboard/sales.png) |
| ภาพรวมทีมบริการ (`01-dashboard/service`) | dashboard | 0 | [ภาพ](../graphic/back-office/01-dashboard/service.png) |
| ภาพรวมคลังสินค้า (`01-dashboard/warehouse`) | dashboard | 0 | [ภาพ](../graphic/back-office/01-dashboard/warehouse.png) |

## catalog — 11 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| สินค้าจาก ERP (`02-catalog/list`) | list | 0 | [ภาพ](../graphic/back-office/02-catalog/list.png) |
| แบรนด์จาก ERP (`02-catalog/brands`) | list | 0 | [ภาพ](../graphic/back-office/02-catalog/brands.png) |
| เพิ่มเนื้อหาสินค้าบนเว็บไซต์ (`02-catalog/create`) | form | 10 | [ภาพ](../graphic/back-office/02-catalog/create.png) |
| แก้ไขเนื้อหาสินค้าบนเว็บไซต์ (`02-catalog/edit`) | form | 12 | [ภาพ](../graphic/back-office/02-catalog/edit.png) |
| รายละเอียดสินค้าจาก ERP (`02-catalog/erp-detail`) | detail | 0 | [ภาพ](../graphic/back-office/02-catalog/erp-detail.png) |
| คลังสื่อ (`02-catalog/media`) | media | 0 | [ภาพ](../graphic/back-office/02-catalog/media.png) |
| แก้ไขข้อมูลสื่อ (`02-catalog/media-edit`) | form | 7 | [ภาพ](../graphic/back-office/02-catalog/media-edit.png) |
| เพิ่มสื่อ (`02-catalog/media-upload`) | form | 7 | [ภาพ](../graphic/back-office/02-catalog/media-upload.png) |
| หมวดแสดงบนเว็บไซต์ (`02-catalog/taxonomy`) | list | 0 | [ภาพ](../graphic/back-office/02-catalog/taxonomy.png) |
| เพิ่มหมวดหรือกลุ่มสินค้า (`02-catalog/taxonomy-create`) | form | 8 | [ภาพ](../graphic/back-office/02-catalog/taxonomy-create.png) |
| แก้ไขกลุ่มย่อย (`02-catalog/taxonomy-edit`) | form | 6 | [ภาพ](../graphic/back-office/02-catalog/taxonomy-edit.png) |

## pricing — 6 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| ราคาจาก ERP และการจับคู่สิทธิ์ (`03-pricing/list`) | list | 0 | [ภาพ](../graphic/back-office/03-pricing/list.png) |
| พิจารณาส่วนลดใบเสนอราคา (`03-pricing/approval`) | decision | 4 | [ภาพ](../graphic/back-office/03-pricing/approval.png) |
| เพิ่มการจับคู่รายการราคา (`03-pricing/create`) | form | 5 | [ภาพ](../graphic/back-office/03-pricing/create.png) |
| แก้ไขการจับคู่รายการราคา (`03-pricing/edit`) | form | 5 | [ภาพ](../graphic/back-office/03-pricing/edit.png) |
| สถานะอัปเดตราคาจาก ERP (`03-pricing/import`) | list | 0 | [ภาพ](../graphic/back-office/03-pricing/import.png) |
| ตัวอย่างราคาแต่ละกลุ่ม (`03-pricing/preview`) | preview | 0 | [ภาพ](../graphic/back-office/03-pricing/preview.png) |

## inventory — 6 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| สต็อกจากระบบคลัง (`04-inventory/list`) | list | 0 | [ภาพ](../graphic/back-office/04-inventory/list.png) |
| ประวัติคลังจากระบบต้นทาง (`04-inventory/ledger`) | list | 0 | [ภาพ](../graphic/back-office/04-inventory/ledger.png) |
| ติดตามผลตรวจรับคืนจากคลัง (`04-inventory/return-receipt`) | detail | 0 | [ภาพ](../graphic/back-office/04-inventory/return-receipt.png) |
| คิวจัดหาสินค้า (`04-inventory/sourcing`) | list | 0 | [ภาพ](../graphic/back-office/04-inventory/sourcing.png) |
| สร้างงานจัดหา (`04-inventory/sourcing-create`) | form | 7 | [ภาพ](../graphic/back-office/04-inventory/sourcing-create.png) |
| แก้ไขงานจัดหา (`04-inventory/sourcing-edit`) | form | 5 | [ภาพ](../graphic/back-office/04-inventory/sourcing-edit.png) |

## customers — 9 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| ลูกค้าและบริษัท (`05-customers/list`) | list | 0 | [ภาพ](../graphic/back-office/05-customers/list.png) |
| เพิ่มที่อยู่ลูกค้า (`05-customers/address-create`) | form | 12 | [ภาพ](../graphic/back-office/05-customers/address-create.png) |
| แก้ไขที่อยู่ลูกค้า (`05-customers/address-edit`) | form | 11 | [ภาพ](../graphic/back-office/05-customers/address-edit.png) |
| เพิ่มข้อมูลลูกค้า (`05-customers/create`) | form | 7 | [ภาพ](../graphic/back-office/05-customers/create.png) |
| พิจารณาสิทธิ์และวงเงินรายบริษัท (`05-customers/credit-decision`) | decision | 9 | [ภาพ](../graphic/back-office/05-customers/credit-decision.png) |
| รายละเอียดบริษัทลูกค้า (`05-customers/detail`) | detail | 0 | [ภาพ](../graphic/back-office/05-customers/detail.png) |
| แก้ไขข้อมูลลูกค้า (`05-customers/edit`) | form | 8 | [ภาพ](../graphic/back-office/05-customers/edit.png) |
| ผูกผู้ติดต่อคำปรึกษากับบัญชี (`05-customers/guest-link`) | form | 4 | [ภาพ](../graphic/back-office/05-customers/guest-link.png) |
| คำขอราคาพิเศษและเครดิต (`05-customers/review`) | list | 0 | [ภาพ](../graphic/back-office/05-customers/review.png) |

## orders — 9 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| คำสั่งซื้อสินค้า (`06-orders/list`) | list | 0 | [ภาพ](../graphic/back-office/06-orders/list.png) |
| ขอแก้ไขคำสั่งซื้อ (`06-orders/amendment`) | form | 5 | [ภาพ](../graphic/back-office/06-orders/amendment.png) |
| คำขอยกเลิก (`06-orders/cancellation`) | decision | 4 | [ภาพ](../graphic/back-office/06-orders/cancellation.png) |
| รายละเอียดคำสั่งซื้อ (`06-orders/detail`) | detail | 0 | [ภาพ](../graphic/back-office/06-orders/detail.png) |
| จัดเตรียมและแพ็กสินค้า (`06-orders/fulfillment`) | form | 9 | [ภาพ](../graphic/back-office/06-orders/fulfillment.png) |
| Hold และเจ้าของงาน (`06-orders/holds`) | holds | 0 | [ภาพ](../graphic/back-office/06-orders/holds.png) |
| คืนสินค้าและขอคืนเงิน (`06-orders/returns`) | form | 6 | [ภาพ](../graphic/back-office/06-orders/returns.png) |
| รับงานคลังเข้าคิว (`06-orders/warehouse-approve`) | decision | 4 | [ภาพ](../graphic/back-office/06-orders/warehouse-approve.png) |
| คิวจัดเตรียมสินค้า (`06-orders/warehouse-queue`) | list | 0 | [ภาพ](../graphic/back-office/06-orders/warehouse-queue.png) |

## quotes — 7 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| RFQ และใบเสนอราคา (`07-quotes/list`) | list | 0 | [ภาพ](../graphic/back-office/07-quotes/list.png) |
| เตรียมข้อมูลใบเสนอราคา SAP (`07-quotes/create`) | form | 10 | [ภาพ](../graphic/back-office/07-quotes/create.png) |
| รายละเอียดฉบับใบเสนอราคา (`07-quotes/detail`) | detail | 0 | [ภาพ](../graphic/back-office/07-quotes/detail.png) |
| แก้ไขร่างคำขอใบเสนอราคา SAP (`07-quotes/edit`) | form | 9 | [ภาพ](../graphic/back-office/07-quotes/edit.png) |
| ขอแก้ไขฉบับใบเสนอราคา (`07-quotes/revision`) | form | 5 | [ภาพ](../graphic/back-office/07-quotes/revision.png) |
| รายละเอียดคำขอราคา (`07-quotes/rfq`) | detail | 0 | [ภาพ](../graphic/back-office/07-quotes/rfq.png) |
| เอกสารอ้างอิง SAP และผู้รับอีเมล (`07-quotes/sap-email`) | form | 5 | [ภาพ](../graphic/back-office/07-quotes/sap-email.png) |

## services — 11 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| บริการและแพ็กเกจ (`08-services/list`) | list | 0 | [ภาพ](../graphic/back-office/08-services/list.png) |
| เพิ่มบริการ (`08-services/create`) | form | 11 | [ภาพ](../graphic/back-office/08-services/create.png) |
| แก้ไขบริการ (`08-services/edit`) | form | 10 | [ภาพ](../graphic/back-office/08-services/edit.png) |
| กำหนดฟอร์มและ BOM (`08-services/form-builder`) | form | 5 | [ภาพ](../graphic/back-office/08-services/form-builder.png) |
| รายละเอียดและความคืบหน้างาน (`08-services/job-detail`) | detail | 0 | [ภาพ](../graphic/back-office/08-services/job-detail.png) |
| บันทึกงานและงวดชำระ (`08-services/job-edit`) | form | 8 | [ภาพ](../graphic/back-office/08-services/job-edit.png) |
| คำสั่งงานบริการ (`08-services/jobs`) | list | 0 | [ภาพ](../graphic/back-office/08-services/jobs.png) |
| รายละเอียดคำปรึกษา (`08-services/lead-detail`) | detail | 0 | [ภาพ](../graphic/back-office/08-services/lead-detail.png) |
| คำปรึกษาและงานสำรวจ (`08-services/leads`) | list | 0 | [ภาพ](../graphic/back-office/08-services/leads.png) |
| เพิ่มนัดสำรวจ (`08-services/survey-create`) | form | 8 | [ภาพ](../graphic/back-office/08-services/survey-create.png) |
| แก้ไขนัดและผลสำรวจ (`08-services/survey-edit`) | form | 8 | [ภาพ](../graphic/back-office/08-services/survey-edit.png) |

## finance — 10 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| รายการชำระเงิน (`09-finance/list`) | list | 0 | [ภาพ](../graphic/back-office/09-finance/list.png) |
| รายงานลูกหนี้และคืนเงิน (`09-finance/aging`) | list | 0 | [ภาพ](../graphic/back-office/09-finance/aging.png) |
| แก้ไขการจัดสรรเงิน (`09-finance/allocation-edit`) | form | 4 | [ภาพ](../graphic/back-office/09-finance/allocation-edit.png) |
| เพิ่มรายการรับเช็ค (`09-finance/cheque-create`) | form | 8 | [ภาพ](../graphic/back-office/09-finance/cheque-create.png) |
| บันทึกนำฝากและผลเคลียร์เช็ค (`09-finance/cheque-edit`) | decision | 5 | [ภาพ](../graphic/back-office/09-finance/cheque-edit.png) |
| ทะเบียนเช็ค (`09-finance/cheques`) | list | 0 | [ภาพ](../graphic/back-office/09-finance/cheques.png) |
| บัญชีเครดิตรายบริษัท (`09-finance/credit-ledger`) | detail | 0 | [ภาพ](../graphic/back-office/09-finance/credit-ledger.png) |
| เงื่อนไขชำระโอนและเช็ค (`09-finance/mixed-payment`) | form | 5 | [ภาพ](../graphic/back-office/09-finance/mixed-payment.png) |
| เพิ่มคำขอชำระเงิน (`09-finance/request-create`) | form | 7 | [ภาพ](../graphic/back-office/09-finance/request-create.png) |
| ตรวจสอบหลักฐานชำระ (`09-finance/review`) | decision | 9 | [ภาพ](../graphic/back-office/09-finance/review.png) |

## logistics — 13 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| ขนส่งและการรับสินค้า (`10-logistics/list`) | list | 0 | [ภาพ](../graphic/back-office/10-logistics/list.png) |
| เพิ่ม Booking จัดส่ง (`10-logistics/booking-create`) | form | 6 | [ภาพ](../graphic/back-office/10-logistics/booking-create.png) |
| แก้ไข Booking จัดส่ง (`10-logistics/booking-edit`) | form | 5 | [ภาพ](../graphic/back-office/10-logistics/booking-edit.png) |
| Booking การจัดส่ง (`10-logistics/bookings`) | list | 0 | [ภาพ](../graphic/back-office/10-logistics/bookings.png) |
| เพิ่มบริษัทขนส่ง (`10-logistics/carrier-create`) | form | 9 | [ภาพ](../graphic/back-office/10-logistics/carrier-create.png) |
| แก้ไขเงื่อนไขขนส่ง (`10-logistics/carrier-edit`) | form | 9 | [ภาพ](../graphic/back-office/10-logistics/carrier-edit.png) |
| เพิ่ม Booking รับสินค้าเอง (`10-logistics/pickup-create`) | form | 9 | [ภาพ](../graphic/back-office/10-logistics/pickup-create.png) |
| แก้ไข Booking และบันทึกรับสินค้า (`10-logistics/pickup-edit`) | form | 9 | [ภาพ](../graphic/back-office/10-logistics/pickup-edit.png) |
| เพิ่มรอบจัดส่ง (`10-logistics/round-create`) | form | 10 | [ภาพ](../graphic/back-office/10-logistics/round-create.png) |
| แก้ไขรอบจัดส่งและคิว (`10-logistics/round-edit`) | form | 11 | [ภาพ](../graphic/back-office/10-logistics/round-edit.png) |
| รอบจัดส่งสินค้า (`10-logistics/rounds`) | list | 0 | [ภาพ](../graphic/back-office/10-logistics/rounds.png) |
| เพิ่มบันทึกจัดส่ง (`10-logistics/shipment-create`) | form | 7 | [ภาพ](../graphic/back-office/10-logistics/shipment-create.png) |
| แก้ไขข้อมูลติดตามขนส่ง (`10-logistics/shipment-edit`) | form | 5 | [ภาพ](../graphic/back-office/10-logistics/shipment-edit.png) |

## marketing — 10 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| โปรโมชั่น คูปอง และบริการเสริม (`11-marketing/list`) | list | 0 | [ภาพ](../graphic/back-office/11-marketing/list.png) |
| เพิ่มโปรโมชั่น (`11-marketing/campaign-create`) | form | 14 | [ภาพ](../graphic/back-office/11-marketing/campaign-create.png) |
| แก้ไขโปรโมชั่น (`11-marketing/campaign-edit`) | form | 12 | [ภาพ](../graphic/back-office/11-marketing/campaign-edit.png) |
| เพิ่มคูปอง (`11-marketing/coupon-create`) | form | 11 | [ภาพ](../graphic/back-office/11-marketing/coupon-create.png) |
| แก้ไขคูปอง (`11-marketing/coupon-edit`) | form | 12 | [ภาพ](../graphic/back-office/11-marketing/coupon-edit.png) |
| เพิ่มบริการเสริมสินค้า (`11-marketing/item-addon-create`) | form | 9 | [ภาพ](../graphic/back-office/11-marketing/item-addon-create.png) |
| แก้ไขบริการเสริมสินค้า (`11-marketing/item-addon-edit`) | form | 11 | [ภาพ](../graphic/back-office/11-marketing/item-addon-edit.png) |
| เพิ่มบริการเสริมคำสั่งซื้อ (`11-marketing/order-addon-create`) | form | 9 | [ภาพ](../graphic/back-office/11-marketing/order-addon-create.png) |
| แก้ไขบริการเสริมคำสั่งซื้อ (`11-marketing/order-addon-edit`) | form | 8 | [ภาพ](../graphic/back-office/11-marketing/order-addon-edit.png) |
| การเก็บและใช้คูปอง (`11-marketing/wallet`) | list | 0 | [ภาพ](../graphic/back-office/11-marketing/wallet.png) |

## content — 5 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| จัดการหน้าแรก (`12-content/list`) | list | 0 | [ภาพ](../graphic/back-office/12-content/list.png) |
| เพิ่มส่วนเนื้อหาหรือแบนเนอร์ (`12-content/create`) | form | 12 | [ภาพ](../graphic/back-office/12-content/create.png) |
| แก้ไขเนื้อหาหน้าแรก (`12-content/edit`) | form | 12 | [ภาพ](../graphic/back-office/12-content/edit.png) |
| ประวัติเผยแพร่และย้อนกลับ (`12-content/history`) | history | 0 | [ภาพ](../graphic/back-office/12-content/history.png) |
| ตัวอย่างหน้าแรกก่อนเผยแพร่ (`12-content/preview`) | preview | 0 | [ภาพ](../graphic/back-office/12-content/preview.png) |

## documents — 6 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| ศูนย์เอกสาร (`13-documents/list`) | list | 0 | [ภาพ](../graphic/back-office/13-documents/list.png) |
| เพิ่มเอกสารตัวอย่างหรือไฟล์แนบ (`13-documents/create`) | form | 7 | [ภาพ](../graphic/back-office/13-documents/create.png) |
| เปิดเอกสารและพิมพ์ (`13-documents/detail`) | document | 0 | [ภาพ](../graphic/back-office/13-documents/detail.png) |
| แก้ไขร่างเอกสาร (`13-documents/draft-edit`) | form | 7 | [ภาพ](../graphic/back-office/13-documents/draft-edit.png) |
| สิทธิ์ไฟล์และเอกสารแนบ (`13-documents/files`) | list | 0 | [ภาพ](../graphic/back-office/13-documents/files.png) |
| สร้างฉบับใหม่หรือยกเลิกเอกสาร (`13-documents/revision-void`) | decision | 4 | [ภาพ](../graphic/back-office/13-documents/revision-void.png) |

## communication — 9 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| ติดตามบทสนทนา (`14-communication/conversation`) | detail | 0 | [ภาพ](../graphic/back-office/14-communication/conversation.png) |
| ประวัติส่งและการตั้งค่าลูกค้า (`14-communication/delivery`) | list | 0 | [ภาพ](../graphic/back-office/14-communication/delivery.png) |
| กล่องข้อความลูกค้าสัมพันธ์ (`14-communication/inbox`) | chat | 0 | [ภาพ](../graphic/back-office/14-communication/inbox.png) |
| แก้ไขข้อความตอบกลับสำเร็จรูป (`14-communication/replies`) | form | 6 | [ภาพ](../graphic/back-office/14-communication/replies.png) |
| เพิ่มแม่แบบแจ้งเตือน (`14-communication/template-create`) | form | 7 | [ภาพ](../graphic/back-office/14-communication/template-create.png) |
| แก้ไขแม่แบบแจ้งเตือน (`14-communication/template-edit`) | form | 9 | [ภาพ](../graphic/back-office/14-communication/template-edit.png) |
| แม่แบบการแจ้งเตือน (`14-communication/template-list`) | list | 0 | [ภาพ](../graphic/back-office/14-communication/template-list.png) |
| ข้อความตอบกลับสำเร็จรูป (`14-communication/replies-list`) | list | 0 | [ภาพ](../graphic/back-office/14-communication/replies-list.png) |
| เพิ่มข้อความตอบกลับสำเร็จรูป (`14-communication/replies-create`) | form | 6 | [ภาพ](../graphic/back-office/14-communication/replies-create.png) |

## settings — 16 หน้า

| หน้าจอ | รูปแบบ UI | จำนวนฟิลด์ | ภาพอ้างอิง |
|---|---|---:|---|
| ประวัติการทำรายการ (`15-settings/audit`) | list | 0 | [ภาพ](../graphic/back-office/15-settings/audit.png) |
| เพิ่มบัญชีรับเงิน (`15-settings/bank-create`) | form | 7 | [ภาพ](../graphic/back-office/15-settings/bank-create.png) |
| แก้ไขบัญชีรับเงิน (`15-settings/bank-edit`) | form | 8 | [ภาพ](../graphic/back-office/15-settings/bank-edit.png) |
| นำเข้าเนื้อหาเว็บไซต์ (`15-settings/imports`) | import | 0 | [ภาพ](../graphic/back-office/15-settings/imports.png) |
| แผนการเชื่อมต่อระบบ (`15-settings/integrations`) | integrations | 0 | [ภาพ](../graphic/back-office/15-settings/integrations.png) |
| ตั้งค่า ผู้ใช้ และรายงาน (`15-settings/overview`) | hub | 0 | [ภาพ](../graphic/back-office/15-settings/overview.png) |
| แก้ไขนโยบายการค้า (`15-settings/policies`) | form | 6 | [ภาพ](../graphic/back-office/15-settings/policies.png) |
| รายงานธุรกิจ (`15-settings/reports`) | dashboard | 0 | [ภาพ](../graphic/back-office/15-settings/reports.png) |
| เพิ่มบทบาท (`15-settings/role-create`) | form | 3 | [ภาพ](../graphic/back-office/15-settings/role-create.png) |
| แก้ไขบทบาท (`15-settings/role-edit`) | form | 4 | [ภาพ](../graphic/back-office/15-settings/role-edit.png) |
| บทบาทและสิทธิ์ (`15-settings/roles`) | roles | 0 | [ภาพ](../graphic/back-office/15-settings/roles.png) |
| แก้ไขค่าร้านและข้อมูลปฏิบัติการ (`15-settings/shop-edit`) | form | 8 | [ภาพ](../graphic/back-office/15-settings/shop-edit.png) |
| เพิ่มพนักงาน (`15-settings/staff-create`) | form | 6 | [ภาพ](../graphic/back-office/15-settings/staff-create.png) |
| แก้ไขพนักงานและสิทธิ์ (`15-settings/staff-edit`) | form | 6 | [ภาพ](../graphic/back-office/15-settings/staff-edit.png) |
| พนักงาน (`15-settings/staff-list`) | list | 0 | [ภาพ](../graphic/back-office/15-settings/staff-list.png) |
| แก้ไขเวลารับสินค้าและรอบส่ง (`15-settings/warehouse-edit`) | form | 5 | [ภาพ](../graphic/back-office/15-settings/warehouse-edit.png) |
