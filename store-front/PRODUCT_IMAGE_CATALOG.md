# Product Image Catalog

รายการนี้ถอดจาก `PRODUCTS` ใน `index.html` เพื่อใช้อ้างอิงภาพสินค้า ภาพครบทั้ง 61 รายการถูกสร้างเป็น PNG พื้นหลังสีขาวและเก็บไว้ใน `./assets/`

รูปแบบชื่อไฟล์คือ `./assets/{SKU}.png` ตัวอย่างเช่น `./assets/PLT-SUN-50KTL.png` โดยทุกภาพมีขนาด 1254 x 1254 พิกเซล

ชนิดสินค้า:

- `buy` - สินค้าที่ซื้อได้โดยตรง
- `rfq` - สินค้าที่ต้องขอใบเสนอราคา
- `consult` - โซลูชันที่ต้องปรึกษาหรือสำรวจหน้างาน
- `pkg` - แพ็กเกจบริการราคาคงที่

## EV charging

| ID | SKU | Brand | Type | Subgroup | ชื่อสินค้า | English name |
|---|---|---|---|---|---|---|
| p3 | PLT-EVC-AC22 | Huawei | buy | wallbox | เครื่องชาร์จรถยนต์ไฟฟ้า AC 22 kW FusionCharge | EV Charger AC 22 kW FusionCharge |
| p16 | PLT-SVC-EVINST | Polytech | pkg | install | แพ็กเกจติดตั้งเครื่องชาร์จ EV แบบ AC มาตรฐาน | Standard AC EV charger installation package |
| p17 | PLT-EV-PP74 | Wallbox | buy | wallbox | เครื่องชาร์จ EV Pulsar Plus 7.4kW Type 2 | Pulsar Plus 7.4kW Type 2 EV Wallbox |
| p18 | PLT-EV-AM11 | Autel | buy | wallbox | เครื่องชาร์จ MaxiCharger AC Wallbox 11kW | MaxiCharger AC Wallbox 11kW |
| p19 | PLT-EV-DM22 | Delta | buy | wallbox | เครื่องชาร์จ AC Mini Plus 22kW 3 เฟส | AC Mini Plus 22kW (3-Phase) |
| p20 | PLT-EV-AB22 | ABB | buy | wallbox | เครื่องชาร์จ Terra AC W22 พร้อม RFID | Terra AC W22 with RFID |
| p21 | PLT-EV-DC60 | Polytech | rfq | dc | เครื่องชาร์จเร็ว DC 60kW แบบตั้งพื้น | DC Fast Charger 60 kW Floor-standing |
| p22 | PLT-EV-DC30 | Huawei | rfq | dc | เครื่องชาร์จเร็ว DC 30kW แบบติดผนัง | DC Charger 30 kW Wall-mount |
| p23 | PLT-EV-PT35 | Polytech | buy | portable | เครื่องชาร์จ EV แบบพกพา 3.5kW | Portable EV Charger 3.5kW |

## Solar panels and accessories

| ID | SKU | Brand | Type | Subgroup | ชื่อสินค้า | English name |
|---|---|---|---|---|---|---|
| p13 | PLT-SOL-RT500 | Polytech | consult | epc | ระบบโซลาร์รูฟท็อปสำหรับโรงงาน 500 kWp แบบเบ็ดเสร็จ | Factory Solar Rooftop System 500 kWp Turnkey |
| p15 | PLT-CBL-PV6 | Polytech | buy | accessory | สายไฟโซลาร์ PV1-F 1x6 mm² (ม้วน 100 ม.) | Solar cable PV1-F 1x6 mm² (100 m roll) |
| p24 | PLT-PV-JK580 | Jinko | buy | mono | แผงโซลาร์ Tiger Neo 580W N-Type | Tiger Neo 580W N-Type Panel |
| p25 | PLT-PV-TR445 | Trina | buy | mono | แผงโซลาร์ Vertex S+ 445W All-Black | Vertex S+ 445W All-Black Panel |
| p26 | PLT-PV-LG540 | LONGi | buy | mono | แผงโซลาร์ Hi-MO 6 540W Mono | Hi-MO 6 540W Mono Panel |
| p27 | PLT-PV-CS665 | Canadian | buy | bifacial | แผงโซลาร์ BiHiKu7 Bifacial 665W | BiHiKu7 Bifacial 665W Panel |
| p28 | PLT-PV-JA580 | JA Solar | buy | bifacial | แผงโซลาร์ JAM72D40 Bifacial 580W | JAM72D40 Bifacial 580W Panel |
| p29 | PLT-PV-FD200 | Polytech | buy | flex | แผงโซลาร์พับได้ Foldable 200W | Foldable Solar Blanket 200W |
| p30 | PLT-PV-RAIL4 | Polytech | buy | accessory | ชุดรางยึดแผงโซลาร์อลูมิเนียม (4 แผง) | Aluminium Rail Mounting Kit (4 panels) |

## Battery storage

| ID | SKU | Brand | Type | Subgroup | ชื่อสินค้า | English name |
|---|---|---|---|---|---|---|
| p4 | PLT-BAT-L10S0 | Huawei | buy | home | โมดูลแบตเตอรี่กักเก็บพลังงาน LUNA2000-10-S0 | Energy Storage Battery Module LUNA2000-10-S0 |
| p31 | PLT-BT-US5000 | Pylontech | buy | home | แบตเตอรี่ US5000 48V 4.8kWh LiFePO4 | US5000 48V 4.8kWh LiFePO4 Battery |
| p32 | PLT-BT-PB10 | Dyness | buy | home | แบตเตอรี่ PowerBox Pro 10kWh | PowerBox Pro 10kWh Battery |
| p33 | PLT-BT-HVS51 | BYD | buy | hv | แบตเตอรี่ Battery-Box Premium HVS 5.1 | Battery-Box Premium HVS 5.1 |
| p34 | PLT-BT-HVM11 | BYD | buy | hv | แบตเตอรี่ Battery-Box Premium HVM 11.0 | Battery-Box Premium HVM 11.0 |
| p35 | PLT-BT-LF280 | EVE | buy | cell | เซลล์ลิเธียม LF280K 3.2V 280Ah (ชุด 4 เซลล์) | LF280K 3.2V 280Ah LiFePO4 Cell (set of 4) |
| p36 | PLT-BT-GEL200 | Polytech | buy | lead | แบตเตอรี่ดีพไซเคิล Gel 12V 200Ah | Deep Cycle Gel Battery 12V 200Ah |

## Inverters and monitoring

| ID | SKU | Brand | Type | Subgroup | ชื่อสินค้า | English name |
|---|---|---|---|---|---|---|
| p1 | PLT-SUN-50KTL | Huawei | buy | string | อินเวอร์เตอร์โซลาร์ 3 เฟส SUN2000-50KTL-M3 | Solar Inverter 3-Phase SUN2000-50KTL-M3 |
| p2 | PLT-SLG-3000A | Huawei | buy | monitor | อุปกรณ์มอนิเตอร์ระบบโซลาร์ SmartLogger 3000A | Solar Monitoring Gateway SmartLogger 3000A |
| p37 | PLT-IV-DY5K | Deye | buy | hybrid | ไฮบริดอินเวอร์เตอร์ 5kW SUN-5K | Hybrid Inverter 5kW SUN-5K |
| p38 | PLT-IV-SGH10 | Sungrow | buy | hybrid | ไฮบริดอินเวอร์เตอร์ 3 เฟส SH10RT | Hybrid Inverter 3-Phase SH10RT |
| p39 | PLT-IV-GW6K | Growatt | buy | string | อินเวอร์เตอร์ MIN 6000TL-X | MIN 6000TL-X String Inverter |
| p40 | PLT-IV-HW10K | Huawei | buy | string | อินเวอร์เตอร์ SUN2000-10KTL-M2 | SUN2000-10KTL-M2 String Inverter |
| p41 | PLT-IV-SG110 | Sungrow | buy | string | อินเวอร์เตอร์ SG110CX 110kW 3 เฟส | SG110CX 110kW 3-Phase Inverter |
| p42 | PLT-IV-MTR666 | Huawei | buy | monitor | สมาร์ทมิเตอร์ DTSU666-H | Smart Power Meter DTSU666-H |

## Industrial automation

| ID | SKU | Brand | Type | Subgroup | ชื่อสินค้า | English name |
|---|---|---|---|---|---|---|
| p5 | PLT-PLC-CP1E30 | OMRON | buy | plc | ชุดควบคุม PLC CP1E-N30DR-A พร้อม I/O 30 จุด | PLC Controller CP1E-N30DR-A with 30 I/O |
| p6 | PLT-HMI-NB10W | OMRON | buy | plc | จอสัมผัส HMI 10 นิ้ว NB10W-TW01B | HMI Touch Panel 10-inch NB10W-TW01B |
| p7 | PLT-VFD-3G3MX2 | OMRON | buy | drive | อินเวอร์เตอร์ควบคุมมอเตอร์ 3G3MX2 ขนาด 5.5 kW | Variable Frequency Drive 3G3MX2 5.5 kW |
| p43 | PLT-PL-FX5U32 | Mitsubishi | buy | plc | PLC FX5U-32MR/ES พร้อม I/O 32 จุด | PLC FX5U-32MR/ES with 32 I/O |
| p44 | PLT-PL-S71214 | Siemens | buy | plc | PLC SIMATIC S7-1200 CPU 1214C | SIMATIC S7-1200 CPU 1214C |
| p45 | PLT-SV-B3750 | Delta | buy | drive | เซอร์โวมอเตอร์และไดรฟ์ ASDA-B3 750W | ASDA-B3 750W Servo Motor & Drive |
| p46 | PLT-VF-ACS580 | ABB | buy | drive | อินเวอร์เตอร์ควบคุมมอเตอร์ ACS580 7.5 kW | ACS580 7.5 kW VFD |
| p47 | PLT-SN-E3Z | Omron | buy | sensor | โฟโต้อิเล็กทริคเซนเซอร์ E3Z-D62 | E3Z-D62 Photoelectric Sensor |
| p48 | PLT-SN-PR18 | Autonics | buy | sensor | พร็อกซิมิตี้เซนเซอร์ PR18-8DN | PR18-8DN Proximity Sensor |

## Instruments and gas detection

| ID | SKU | Brand | Type | Subgroup | ชื่อสินค้า | English name |
|---|---|---|---|---|---|---|
| p8 | PLT-VIS-FH5050 | OMRON | rfq | meter | ระบบตรวจสอบคุณภาพด้วยภาพ FH-5050 Machine Vision | Machine Vision Inspection System FH-5050 |
| p9 | PLT-FLW-UF3000 | Flowtech | buy | meter | มาตรวัดอัตราการไหลแบบอัลตราโซนิก UF-3000 | Ultrasonic Flow Meter UF-3000 |
| p10 | PLT-GAS-GD8C | Sensguard | buy | gas | ตู้ควบคุมเครื่องตรวจจับก๊าซ 8 ช่องสัญญาณ GD-8C | 8-Channel Gas Detection Controller GD-8C |
| p49 | PLT-IN-F1738 | Fluke | buy | meter | เครื่องบันทึกคุณภาพไฟฟ้า Fluke 1738 | Fluke 1738 Power Quality Logger |
| p50 | PLT-IN-FTI401 | Fluke | buy | meter | กล้องถ่ายภาพความร้อน Fluke Ti401 PRO | Fluke Ti401 PRO Thermal Camera |
| p51 | PLT-IN-EJA530 | Yokogawa | buy | meter | ทรานสมิตเตอร์วัดความดัน EJA530E | EJA530E Pressure Transmitter |
| p52 | PLT-GS-KP4G | Sensguard | buy | gas | เครื่องตรวจจับก๊าซแบบพกพา 4 ชนิด KP-4G | KP-4G Portable 4-Gas Detector |
| p53 | PLT-GS-FS100 | Sensguard | buy | gas | หัวตรวจจับก๊าซ CO แบบติดตั้งถาวร FS-100 | FS-100 Fixed CO Sensor Head |
| p54 | PLT-GS-BC2 | Sensguard | buy | gas | สัญญาณเตือนไฟและเสียงระยะไกล GD-B2 | GD-B2 Remote Alarm Beacon |

## Data center and warehouse

| ID | SKU | Brand | Type | Subgroup | ชื่อสินค้า | English name |
|---|---|---|---|---|---|---|
| p11 | PLT-UPS-E60K | Huawei | rfq | ups | โมดูล UPS สำหรับศูนย์ข้อมูล UPS5000-E 60 kVA | Data Center UPS Module UPS5000-E 60 kVA |
| p12 | PLT-WCS-GATE1 | Polytech | buy | wms | เกตเวย์ติดตามและควบคุมคลังสินค้าอัตโนมัติ WCS-Gate | Warehouse Control Gateway WCS-Gate |
| p14 | PLT-DCS-CONT1 | Polytech | consult | rack | โซลูชันจัดระเบียบลมเย็นและตู้แร็คสำหรับศูนย์ข้อมูล | Data Center Containment & Rack Solution |
| p55 | PLT-DC-5PX3K | Eaton | buy | ups | UPS แบบติดตั้งแร็ค Eaton 5PX 3000VA | Eaton 5PX 3000VA Rack UPS |
| p56 | PLT-DC-LIR20 | Vertiv | rfq | ups | ระบบทำความเย็น In-Row 20kW | Liebert In-Row Cooling 20kW |
| p57 | PLT-DC-RK42 | Polytech | buy | rack | ตู้แร็คเซิร์ฟเวอร์ 42U 800x1000 | 42U Server Rack 800x1000 |
| p58 | PLT-DC-RK22 | Polytech | buy | rack | ตู้เน็ตเวิร์กติดผนัง 22U | 22U Wall-mount Network Rack |
| p59 | PLT-WH-DS2208 | Zebra | buy | wms | เครื่องสแกนบาร์โค้ด 2D Zebra DS2208 | Zebra DS2208 2D Barcode Scanner |
| p60 | PLT-WH-TC52 | Zebra | buy | wms | คอมพิวเตอร์มือถือ Zebra TC52 | Zebra TC52 Mobile Computer |
| p61 | PLT-WH-FX7500 | Zebra | buy | wms | เครื่องอ่าน RFID แบบติดตั้งถาวร FX7500 | FX7500 Fixed RFID Reader |

## Checklist สำหรับรอบสร้างภาพ

- ใช้ ID และ SKU เป็นตัวอ้างอิงหลัก ไม่ใช้ลำดับในตารางเพียงอย่างเดียว
- อ่าน description และ specifications ของสินค้าจาก `index.html` ก่อนเขียน prompt เพื่อให้รูปร่าง พอร์ต ขนาด และบริบทตรงกับข้อมูล
- แยกภาพสินค้าเดี่ยวออกจากภาพโซลูชัน/บริการ: `consult` และ `pkg` ควรเป็นภาพสถานการณ์หรือ installation scene มากกว่า packshot
- สินค้าที่ใช้ชื่อรุ่นและแบรนด์จริงควรตรวจ reference image ของรุ่นก่อนสร้าง เพื่อไม่ให้รูปทรงผิดจากผลิตภัณฑ์จริง
- กำหนดมาตรฐานร่วมก่อนเริ่ม batch เช่น aspect ratio, background, camera angle, shadow, resolution และนโยบายแสดงโลโก้/ข้อความบนตัวสินค้า
- ตั้งชื่อไฟล์โดยยึด SKU เช่น `PLT-SUN-50KTL.webp` และเก็บ mapping กลับไปยัง product ID
