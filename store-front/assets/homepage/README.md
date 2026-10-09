# ภาพประกอบหน้าแรก Polytechnology

สร้างด้วย built-in imagegen ตามแบบหน้าแรก e-commerce อุตสาหกรรมที่เลือกไว้ ภาพประกอบนี้เป็นภาพแนวคิด ไม่มีข้อความหรือราคาในภาพ และไม่ได้ใช้แทนภาพสินค้ารายรุ่น

มี PNG ต้นฉบับ 12 ภาพ: Hero 1 ภาพ หมวดธุรกิจ 6 ภาพ และบริการวิศวกรรม 5 ภาพ ผูกภาพชุดนี้เข้ากับหน้า Home แล้วผ่าน view model ใน index.html โดยรูปสินค้าแนะนำเดิมยังคงใช้ตามเดิม

| ตำแหน่งใช้งาน | ไฟล์ |
| --- | --- |
| Hero หน้าแรก | [hero-industrial-commerce.png](hero-industrial-commerce.png) |
| พลังงานสะอาดและ EV | [business-clean-energy-ev.png](business-clean-energy-ev.png) |
| ระบบควบคุมอัตโนมัติ | [business-industrial-automation.png](business-industrial-automation.png) |
| เครื่องมือวัดและตรวจสอบคุณภาพ | [business-instruments-inspection.png](business-instruments-inspection.png) |
| ระบบก๊าซอุตสาหกรรม | [business-industrial-gas.png](business-industrial-gas.png) |
| ศูนย์ข้อมูลและระบบสำรองไฟ | [business-data-center-backup.png](business-data-center-backup.png) |
| คลังสินค้าอัตโนมัติ | [business-warehouse-automation.png](business-warehouse-automation.png) |
| ให้คำปรึกษาและออกแบบระบบ | [service-consulting-design.png](service-consulting-design.png) |
| วางระบบและติดตั้ง | [service-integration-installation.png](service-integration-installation.png) |
| สอบเทียบเครื่องมือวัดและฝึกอบรม | [service-calibration-training.png](service-calibration-training.png) |
| บำรุงรักษาและบริการหลังการขาย | [service-maintenance-after-sales.png](service-maintenance-after-sales.png) |
| โซลูชันศูนย์ข้อมูลและระบบสำรองไฟ | [service-data-center-solutions.png](service-data-center-solutions.png) |

## การใช้งาน

- Hero ใช้สัดส่วน 3:1 วางข้อความและปุ่มด้านซ้ายในพื้นที่สีลาเวนเดอร์ ใช้ layout desktop ขั้นต่ำ 1240px ตามข้อกำหนดล่าสุด
- ภาพหมวดธุรกิจและบริการใช้สัดส่วน 16:9 สามารถวางในกรอบด้วย object-fit: cover และ object-position: center
- วางชื่อหมวด ข้อความ ปุ่ม และไอคอนเป็น HTML ภายนอกภาพ เพื่อรองรับภาษาไทยและอังกฤษ
- หน้าเว็บใช้ WebP ขนาดกว้าง 1280px และไฟล์ชื่อท้าย -small ขนาด 640px และ Hero ชื่อท้าย -large ขนาด 2172px ผ่าน srcset/sizes รูปด้านล่าง Hero โหลดแบบ lazy และคง PNG ต้นฉบับไว้
- สร้าง WebP ซ้ำได้ด้วย python store-front/tests/prepare-home-images.py จาก project root โดยต้องมี Pillow
- Hero ภาพรวมใช้ hero-industrial-commerce.webp ส่วนสไลด์แคมเปญพลังงานเดิมใช้ business-clean-energy-ev.webp และสไลด์ระบบอัตโนมัติใช้ business-industrial-automation.webp
- การ์ดธุรกิจจับคู่รูปกับ CATS id และการ์ดบริการจับคู่รูปกับ SERVICES id ตามตารางใน HOME_REDESIGN_PLAN.md
- generation-prompts.json บันทึกคำสั่งสร้างภาพฉบับเต็มของแต่ละไฟล์

