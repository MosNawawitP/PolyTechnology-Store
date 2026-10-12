// Storefront-derived mock fixtures. ERP connection is not active.
window.BO_STORE = {
  "products": [
    {
      "id": "p1",
      "sku": "PLT-SUN-50KTL",
      "cat": "green",
      "brand": "Huawei",
      "type": "buy",
      "w": 12,
      "stock": 24,
      "pop": 98,
      "n": [
        "อินเวอร์เตอร์โซลาร์ 3 เฟส SUN2000-50KTL-M3",
        "Solar Inverter 3-Phase SUN2000-50KTL-M3"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        89000,
        82000,
        78500
      ],
      "d": [
        "อินเวอร์เตอร์สตริงสำหรับโรงงานและอาคารพาณิชย์ กำลัง 50 kW รองรับ 4 MPPT พร้อมระบบตรวจจับอาร์ค AFCI และเชื่อมต่อ SmartLogger สำหรับมอนิเตอร์ระยะไกล",
        "Commercial string inverter rated 50 kW with 4 MPPT trackers, AFCI arc protection and SmartLogger connectivity for remote monitoring."
      ],
      "sp": [
        [
          "กำลังไฟฟ้าออก",
          "Rated output",
          "50 kW"
        ],
        [
          "แรงดันขาออก",
          "Output voltage",
          "380/400 Vac 3P+N+PE"
        ],
        [
          "จำนวน MPPT",
          "MPPT trackers",
          "4"
        ],
        [
          "ประสิทธิภาพสูงสุด",
          "Max efficiency",
          "98.8%"
        ],
        [
          "มาตรฐาน",
          "Standards",
          "IEC 62109, PEA/MEA grid code"
        ],
        [
          "การรับประกัน",
          "Warranty",
          "5 ปี / 5 years"
        ]
      ],
      "grp": "inverter",
      "sub": "string"
    },
    {
      "id": "p2",
      "sku": "PLT-SLG-3000A",
      "cat": "green",
      "brand": "Huawei",
      "type": "buy",
      "w": 9,
      "stock": 41,
      "pop": 74,
      "n": [
        "อุปกรณ์มอนิเตอร์ระบบโซลาร์ SmartLogger 3000A",
        "Solar Monitoring Gateway SmartLogger 3000A"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        28500,
        26300,
        24900
      ],
      "d": [
        "เกตเวย์เก็บข้อมูลสำหรับโรงไฟฟ้าโซลาร์ รองรับอินเวอร์เตอร์ได้ถึง 80 เครื่อง ส่งข้อมูลขึ้นระบบบริหารจัดการพลังงานและเชื่อมต่อมิเตอร์ได้",
        "Data gateway for PV plants supporting up to 80 inverters, feeding an energy management platform with meter integration."
      ],
      "sp": [
        [
          "อุปกรณ์ที่รองรับ",
          "Devices supported",
          "80"
        ],
        [
          "พอร์ตสื่อสาร",
          "Comms ports",
          "RS485 x3, Ethernet x2"
        ],
        [
          "โปรโตคอล",
          "Protocols",
          "Modbus TCP/RTU, IEC 104"
        ],
        [
          "แหล่งจ่ายไฟ",
          "Power supply",
          "24 Vdc"
        ],
        [
          "การติดตั้ง",
          "Mounting",
          "DIN rail / wall"
        ]
      ],
      "grp": "inverter",
      "sub": "monitor"
    },
    {
      "id": "p3",
      "sku": "PLT-EVC-AC22",
      "cat": "green",
      "brand": "Huawei",
      "type": "buy",
      "w": 11,
      "stock": 12,
      "pop": 88,
      "n": [
        "เครื่องชาร์จรถยนต์ไฟฟ้า AC 22 kW FusionCharge",
        "EV Charger AC 22 kW FusionCharge"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        62000,
        57500,
        54800
      ],
      "d": [
        "เครื่องชาร์จ AC สำหรับอาคารสำนักงานและโรงงาน รองรับ Type 2 พร้อมระบบจัดการโหลดและบันทึกการใช้พลังงานรายผู้ใช้",
        "AC charger for offices and plants with Type 2 connector, dynamic load management and per-user energy logging."
      ],
      "sp": [
        [
          "กำลังชาร์จ",
          "Charging power",
          "22 kW"
        ],
        [
          "หัวชาร์จ",
          "Connector",
          "Type 2 (IEC 62196)"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP55"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "OCPP 1.6J, 4G/Ethernet"
        ],
        [
          "อุณหภูมิใช้งาน",
          "Operating temp",
          "-25 ถึง 55°C / -25 to 55°C"
        ]
      ],
      "grp": "ev",
      "sub": "wallbox"
    },
    {
      "id": "p4",
      "sku": "PLT-BAT-L10S0",
      "cat": "green",
      "brand": "Huawei",
      "type": "buy",
      "w": 15,
      "stock": 6,
      "pop": 81,
      "n": [
        "โมดูลแบตเตอรี่กักเก็บพลังงาน LUNA2000-10-S0",
        "Energy Storage Battery Module LUNA2000-10-S0"
      ],
      "u": [
        "โมดูล",
        "module"
      ],
      "pr": [
        148000,
        139000,
        132000
      ],
      "d": [
        "โมดูลแบตเตอรี่ลิเธียมฟอสเฟตสำหรับระบบกักเก็บพลังงาน ขยายได้เป็นชั้น พร้อมระบบ BMS และการตรวจวัดอุณหภูมิภายใน",
        "LiFePO4 storage module, stackable for capacity expansion, with integrated BMS and internal temperature monitoring."
      ],
      "sp": [
        [
          "ความจุใช้งาน",
          "Usable capacity",
          "10 kWh"
        ],
        [
          "เคมีของเซลล์",
          "Cell chemistry",
          "LiFePO4"
        ],
        [
          "รอบการใช้งาน",
          "Cycle life",
          "6,000 cycles"
        ],
        [
          "แรงดันระบบ",
          "System voltage",
          "600–980 Vdc"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP66"
        ]
      ],
      "grp": "battery",
      "sub": "home"
    },
    {
      "id": "p5",
      "sku": "PLT-PLC-CP1E30",
      "cat": "auto",
      "brand": "OMRON",
      "type": "buy",
      "w": 8,
      "stock": 58,
      "pop": 92,
      "n": [
        "ชุดควบคุม PLC CP1E-N30DR-A พร้อม I/O 30 จุด",
        "PLC Controller CP1E-N30DR-A with 30 I/O"
      ],
      "u": [
        "ชุด",
        "set"
      ],
      "pr": [
        18900,
        17200,
        16400
      ],
      "d": [
        "ชุดควบคุมขนาดกะทัดรัดสำหรับเครื่องจักรและสายการผลิต พร้อม I/O ในตัว 30 จุด ขยายโมดูลได้ และรองรับการเขียนโปรแกรมแบบ Ladder",
        "Compact machine controller with 30 built-in I/O points, expansion modules and ladder programming."
      ],
      "sp": [
        [
          "จำนวน I/O",
          "I/O points",
          "18 in / 12 out"
        ],
        [
          "หน่วยความจำโปรแกรม",
          "Program memory",
          "8 K steps"
        ],
        [
          "แหล่งจ่ายไฟ",
          "Power supply",
          "100–240 Vac"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "RS232C, USB"
        ],
        [
          "การติดตั้ง",
          "Mounting",
          "DIN rail"
        ]
      ],
      "grp": "auto",
      "sub": "plc"
    },
    {
      "id": "p6",
      "sku": "PLT-HMI-NB10W",
      "cat": "auto",
      "brand": "OMRON",
      "type": "buy",
      "w": 9,
      "stock": 17,
      "pop": 70,
      "n": [
        "จอสัมผัส HMI 10 นิ้ว NB10W-TW01B",
        "HMI Touch Panel 10-inch NB10W-TW01B"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        32400,
        29800,
        28100
      ],
      "d": [
        "หน้าจอปฏิบัติการหน้าเครื่องจักร ความละเอียด 800x480 พร้อมพอร์ตอนุกรมและอีเทอร์เน็ต ใช้งานร่วมกับ PLC ได้หลายรุ่น",
        "Machine-side operator panel at 800x480 with serial and Ethernet ports, compatible with multiple PLC families."
      ],
      "sp": [
        [
          "ขนาดหน้าจอ",
          "Display size",
          "10.1 นิ้ว / in"
        ],
        [
          "ความละเอียด",
          "Resolution",
          "800 x 480"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP65 front"
        ],
        [
          "พอร์ต",
          "Ports",
          "Ethernet, RS232/485, USB host"
        ],
        [
          "แหล่งจ่ายไฟ",
          "Power supply",
          "24 Vdc"
        ]
      ],
      "grp": "auto",
      "sub": "plc"
    },
    {
      "id": "p7",
      "sku": "PLT-VFD-3G3MX2",
      "cat": "auto",
      "brand": "OMRON",
      "type": "buy",
      "w": 10,
      "stock": 9,
      "pop": 77,
      "n": [
        "อินเวอร์เตอร์ควบคุมมอเตอร์ 3G3MX2 ขนาด 5.5 kW",
        "Variable Frequency Drive 3G3MX2 5.5 kW"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        41500,
        38000,
        36200
      ],
      "d": [
        "ตัวขับมอเตอร์แบบปรับความเร็วสำหรับปั๊ม พัดลม และสายพานลำเลียง พร้อมฟังก์ชันควบคุมแรงบิดและ Modbus ในตัว",
        "Variable speed drive for pumps, fans and conveyors with sensorless torque control and built-in Modbus."
      ],
      "sp": [
        [
          "กำลังมอเตอร์",
          "Motor rating",
          "5.5 kW"
        ],
        [
          "แรงดันเข้า",
          "Input voltage",
          "380–480 Vac 3P"
        ],
        [
          "ช่วงความถี่",
          "Frequency range",
          "0.1–400 Hz"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "Modbus RTU"
        ],
        [
          "การป้องกัน",
          "Protection",
          "IP20"
        ]
      ],
      "grp": "auto",
      "sub": "drive"
    },
    {
      "id": "p8",
      "sku": "PLT-VIS-FH5050",
      "cat": "inst",
      "brand": "OMRON",
      "type": "rfq",
      "w": 12,
      "stock": 3,
      "pop": 64,
      "n": [
        "ระบบตรวจสอบคุณภาพด้วยภาพ FH-5050 Machine Vision",
        "Machine Vision Inspection System FH-5050"
      ],
      "u": [
        "ระบบ",
        "system"
      ],
      "pr": [
        268000,
        249000,
        236500
      ],
      "d": [
        "ระบบตรวจสอบชิ้นงานความเร็วสูงสำหรับสายการผลิต ต้องกำหนดสเปกกล้อง เลนส์ และไฟส่องสว่างตามชิ้นงาน จึงเสนอราคาเป็นรายโครงการ",
        "High-speed inline inspection system. Camera, lens and lighting must be specified per part, so pricing is quoted per project."
      ],
      "sp": [
        [
          "ช่องต่อกล้อง",
          "Camera channels",
          "4"
        ],
        [
          "ความเร็วประมวลผล",
          "Processing speed",
          "High-speed 4-core"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "EtherCAT, EtherNet/IP"
        ],
        [
          "เครื่องมือตรวจสอบ",
          "Inspection tools",
          "Shape search III, OCR"
        ],
        [
          "หมายเหตุ",
          "Note",
          "ต้องออกแบบร่วมกับวิศวกร / engineered to order"
        ]
      ],
      "grp": "inst",
      "sub": "meter"
    },
    {
      "id": "p9",
      "sku": "PLT-FLW-UF3000",
      "cat": "inst",
      "brand": "Flowtech",
      "type": "buy",
      "w": 13,
      "stock": 11,
      "pop": 58,
      "n": [
        "มาตรวัดอัตราการไหลแบบอัลตราโซนิก UF-3000",
        "Ultrasonic Flow Meter UF-3000"
      ],
      "u": [
        "ชุด",
        "set"
      ],
      "pr": [
        96500,
        89000,
        84200
      ],
      "d": [
        "มาตรวัดการไหลแบบไม่รุกล้ำท่อ สำหรับน้ำและของเหลวในกระบวนการผลิต พร้อมใบรับรองการสอบเทียบจากห้องปฏิบัติการ",
        "Non-intrusive clamp-on flow meter for water and process liquids, delivered with a laboratory calibration certificate."
      ],
      "sp": [
        [
          "ขนาดท่อที่รองรับ",
          "Pipe size",
          "DN25–DN700"
        ],
        [
          "ความแม่นยำ",
          "Accuracy",
          "±1% of reading"
        ],
        [
          "สัญญาณออก",
          "Output",
          "4–20 mA, pulse, Modbus"
        ],
        [
          "อุณหภูมิของเหลว",
          "Fluid temp",
          "-20 ถึง 120°C / -20 to 120°C"
        ],
        [
          "การสอบเทียบ",
          "Calibration",
          "ISO/IEC 17025 certificate"
        ]
      ],
      "grp": "inst",
      "sub": "meter"
    },
    {
      "id": "p10",
      "sku": "PLT-GAS-GD8C",
      "cat": "gas",
      "brand": "Sensguard",
      "type": "buy",
      "w": 9,
      "stock": 14,
      "pop": 61,
      "n": [
        "ตู้ควบคุมเครื่องตรวจจับก๊าซ 8 ช่องสัญญาณ GD-8C",
        "8-Channel Gas Detection Controller GD-8C"
      ],
      "u": [
        "ตู้",
        "panel"
      ],
      "pr": [
        54800,
        50500,
        47900
      ],
      "d": [
        "ตู้ควบคุมสำหรับหัวตรวจจับก๊าซติดไฟและก๊าซพิษ รองรับ 8 ช่องสัญญาณ พร้อมรีเลย์แจ้งเตือนและบันทึกเหตุการณ์",
        "Controller for combustible and toxic gas sensors across 8 channels with alarm relays and event logging."
      ],
      "sp": [
        [
          "ช่องสัญญาณ",
          "Channels",
          "8"
        ],
        [
          "สัญญาณเข้า",
          "Input signal",
          "4–20 mA / catalytic bead"
        ],
        [
          "รีเลย์แจ้งเตือน",
          "Alarm relays",
          "16 (2 per channel)"
        ],
        [
          "บันทึกเหตุการณ์",
          "Event log",
          "10,000 events"
        ],
        [
          "มาตรฐาน",
          "Standards",
          "IEC 60079-29-1"
        ]
      ],
      "grp": "inst",
      "sub": "gas"
    },
    {
      "id": "p11",
      "sku": "PLT-UPS-E60K",
      "cat": "dc",
      "brand": "Huawei",
      "type": "rfq",
      "w": 15,
      "stock": 2,
      "pop": 69,
      "n": [
        "โมดูล UPS สำหรับศูนย์ข้อมูล UPS5000-E 60 kVA",
        "Data Center UPS Module UPS5000-E 60 kVA"
      ],
      "u": [
        "โมดูล",
        "module"
      ],
      "pr": [
        415000,
        389000,
        368000
      ],
      "d": [
        "โมดูล UPS แบบ Modular สำหรับห้องเซิร์ฟเวอร์ ต้องออกแบบจำนวนโมดูล ตู้ และแบตเตอรี่ตามโหลดจริง จึงเสนอราคาเป็นโครงการ",
        "Modular UPS for server rooms. Module count, cabinet and battery string are sized to the actual load, so it is quoted as a project."
      ],
      "sp": [
        [
          "กำลังไฟฟ้า",
          "Power rating",
          "60 kVA / 60 kW"
        ],
        [
          "ประสิทธิภาพ",
          "Efficiency",
          "96.5% online"
        ],
        [
          "ค่าตัวประกอบกำลัง",
          "Power factor",
          "1.0"
        ],
        [
          "การติดตั้ง",
          "Installation",
          "Hot-swappable module"
        ],
        [
          "หมายเหตุ",
          "Note",
          "ต้องสำรวจหน้างาน / site survey required"
        ]
      ],
      "grp": "infra",
      "sub": "ups"
    },
    {
      "id": "p12",
      "sku": "PLT-WCS-GATE1",
      "cat": "wh",
      "brand": "Polytech",
      "type": "buy",
      "w": 8,
      "stock": 0,
      "pop": 52,
      "n": [
        "เกตเวย์ติดตามและควบคุมคลังสินค้าอัตโนมัติ WCS-Gate",
        "Warehouse Control Gateway WCS-Gate"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        78000,
        72000,
        68500
      ],
      "d": [
        "อุปกรณ์เชื่อมต่อระหว่างระบบคลังสินค้าอัตโนมัติกับ ERP ใช้ติดตามตำแหน่งสินค้าและสั่งงานอุปกรณ์ลำเลียง รอบผลิตถัดไปพร้อมส่งภายใน 3 สัปดาห์",
        "Bridges automated warehouse equipment with ERP for location tracking and conveyor commands. Next production batch ships within 3 weeks."
      ],
      "sp": [
        [
          "อุปกรณ์ที่เชื่อมต่อ",
          "Connected devices",
          "64"
        ],
        [
          "โปรโตคอล",
          "Protocols",
          "OPC UA, Modbus TCP, REST"
        ],
        [
          "การเชื่อมต่อ ERP",
          "ERP integration",
          "SAP IDoc / REST"
        ],
        [
          "แหล่งจ่ายไฟ",
          "Power supply",
          "24 Vdc"
        ],
        [
          "สถานะสินค้า",
          "Availability",
          "สั่งล่วงหน้า / pre-order"
        ]
      ],
      "grp": "infra",
      "sub": "wms"
    },
    {
      "id": "p13",
      "sku": "PLT-SOL-RT500",
      "cat": "green",
      "brand": "Polytech",
      "type": "consult",
      "w": 0,
      "stock": null,
      "pop": 86,
      "n": [
        "ระบบโซลาร์รูฟท็อปสำหรับโรงงาน 500 kWp แบบเบ็ดเสร็จ",
        "Factory Solar Rooftop System 500 kWp Turnkey"
      ],
      "u": [
        "โครงการ",
        "project"
      ],
      "pr": [
        null,
        null,
        null
      ],
      "d": [
        "โครงการติดตั้งโซลาร์รูฟท็อปแบบครบวงจร ตั้งแต่สำรวจโครงสร้างหลังคา ออกแบบระบบ ขออนุญาต จนถึงเชื่อมต่อระบบจำหน่ายไฟ ต้องประเมินหน้างานก่อนเสนอราคา",
        "End-to-end rooftop solar project covering roof structure survey, system design, permitting and grid connection. Requires a site assessment before pricing."
      ],
      "sp": [
        [
          "ขนาดระบบ",
          "System size",
          "500 kWp"
        ],
        [
          "ระยะเวลาโครงการ",
          "Project duration",
          "90–120 วัน / days"
        ],
        [
          "ขอบเขต",
          "Scope",
          "สำรวจ ออกแบบ ติดตั้ง ขออนุญาต / survey, design, install, permits"
        ],
        [
          "การรับประกันงานติดตั้ง",
          "Workmanship warranty",
          "2 ปี / 2 years"
        ]
      ],
      "grp": "solar",
      "sub": "epc"
    },
    {
      "id": "p14",
      "sku": "PLT-DCS-CONT1",
      "cat": "dc",
      "brand": "Polytech",
      "type": "consult",
      "w": 0,
      "stock": null,
      "pop": 47,
      "n": [
        "โซลูชันจัดระเบียบลมเย็นและตู้แร็คสำหรับศูนย์ข้อมูล",
        "Data Center Containment & Rack Solution"
      ],
      "u": [
        "โครงการ",
        "project"
      ],
      "pr": [
        null,
        null,
        null
      ],
      "d": [
        "ออกแบบและติดตั้งระบบจัดระเบียบลมเย็น ตู้แร็ค ระบบจ่ายไฟ และการตรวจวัดสภาพแวดล้อมในห้องเซิร์ฟเวอร์ ต้องสำรวจพื้นที่และประเมินโหลดก่อน",
        "Design and installation of aisle containment, racks, power distribution and environmental monitoring. Site survey and load assessment required first."
      ],
      "sp": [
        [
          "ขอบเขต",
          "Scope",
          "Containment, rack, PDU, monitoring"
        ],
        [
          "การสำรวจหน้างาน",
          "Site survey",
          "จำเป็น / required"
        ],
        [
          "ระยะเวลาโครงการ",
          "Project duration",
          "45–90 วัน / days"
        ],
        [
          "มาตรฐานอ้างอิง",
          "Reference standard",
          "TIA-942 practices"
        ]
      ],
      "grp": "infra",
      "sub": "rack"
    },
    {
      "id": "p15",
      "sku": "PLT-CBL-PV6",
      "cat": "green",
      "brand": "Polytech",
      "type": "buy",
      "w": null,
      "moq": 2,
      "stock": 40,
      "pop": 55,
      "n": [
        "สายไฟโซลาร์ PV1-F 1x6 mm² (ม้วน 100 ม.)",
        "Solar cable PV1-F 1x6 mm² (100 m roll)"
      ],
      "u": [
        "ม้วน",
        "roll"
      ],
      "pr": [
        4200,
        3900,
        3700
      ],
      "d": [
        "สายไฟ DC สำหรับระบบโซลาร์ ทนรังสี UV และอุณหภูมิสูง ขายขั้นต่ำ 2 ม้วน (ข้อมูลน้ำหนักยังไม่ได้บันทึกในระบบ)",
        "UV and heat resistant DC cable for PV systems. Minimum 2 rolls (weight data not yet recorded)."
      ],
      "sp": [
        [
          "ขนาดสาย",
          "Cross-section",
          "1x6 mm²"
        ],
        [
          "ความยาวต่อม้วน",
          "Length per roll",
          "100 m"
        ],
        [
          "พิกัดแรงดัน",
          "Voltage rating",
          "1.5 kV DC"
        ],
        [
          "มาตรฐาน",
          "Standard",
          "EN 50618"
        ]
      ],
      "grp": "solar",
      "sub": "accessory"
    },
    {
      "id": "p16",
      "sku": "PLT-SVC-EVINST",
      "cat": "green",
      "brand": "Polytech",
      "type": "pkg",
      "w": 0,
      "stock": null,
      "pop": 60,
      "n": [
        "แพ็กเกจติดตั้งเครื่องชาร์จ EV แบบ AC มาตรฐาน",
        "Standard AC EV charger installation package"
      ],
      "u": [
        "งาน",
        "job"
      ],
      "pr": [
        18500,
        17500,
        16900
      ],
      "d": [
        "ค่าติดตั้งเครื่องชาร์จ AC 1 จุด ราคาเหมารวมค่าแรง สายไฟ และเบรกเกอร์ ทีมงานนัดหมายหลังยืนยันคำสั่งซื้อ หากหน้างานเกินเงื่อนไข ผู้ขายจะแจ้งค่าใช้จ่ายเพิ่มให้ยืนยันก่อนเริ่มงาน",
        "Fixed price for one AC charger point incl. labour, cable and breaker. Scheduled after confirmation; if the site is outside the conditions, the seller quotes extras for your approval first."
      ],
      "sp": [
        [
          "ขอบเขต",
          "Scope",
          "ติดตั้ง 1 จุด / 1 point"
        ],
        [
          "ระยะเวลา",
          "Duration",
          "1 วัน / 1 day"
        ],
        [
          "รับประกันงานติดตั้ง",
          "Workmanship warranty",
          "1 ปี / 1 year"
        ]
      ],
      "site": [
        [
          "ระยะเดินสายจากตู้ไฟไม่เกิน 15 เมตร",
          "Cable run up to 15 m from the panel"
        ],
        [
          "ตู้ไฟมีช่องว่างสำหรับเบรกเกอร์ 1 ช่อง",
          "One free breaker slot in the panel"
        ],
        [
          "มิเตอร์ไฟฟ้าขนาด 30(100)A ขึ้นไป",
          "Meter rated 30(100)A or higher"
        ],
        [
          "ติดตั้งผนังหรือเสาในพื้นที่จอดรถ",
          "Wall or pole mount in the parking area"
        ]
      ],
      "grp": "ev",
      "sub": "install"
    },
    {
      "id": "p17",
      "sku": "PLT-EV-PP74",
      "grp": "ev",
      "sub": "wallbox",
      "cat": "green",
      "brand": "Wallbox",
      "type": "buy",
      "w": 6,
      "stock": 30,
      "pop": 94,
      "n": [
        "เครื่องชาร์จ EV Pulsar Plus 7.4kW Type 2",
        "Pulsar Plus 7.4kW Type 2 EV Wallbox"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        32900,
        30500,
        29000
      ],
      "d": [
        "วอลล์บ็อกซ์ชาร์จ AC สำหรับบ้านและคอนโด ตั้งเวลาชาร์จและปรับกระแสผ่านแอป",
        "AC wallbox for homes and condos with scheduling and current adjustment from the app."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "7.4 kW"
        ],
        [
          "หัวชาร์จ",
          "Connector",
          "Type 2"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "Wi-Fi, Bluetooth"
        ]
      ]
    },
    {
      "id": "p18",
      "sku": "PLT-EV-AM11",
      "grp": "ev",
      "sub": "wallbox",
      "cat": "green",
      "brand": "Autel",
      "type": "buy",
      "w": 8,
      "stock": 22,
      "pop": 68,
      "n": [
        "เครื่องชาร์จ MaxiCharger AC Wallbox 11kW",
        "MaxiCharger AC Wallbox 11kW"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        45500,
        42500,
        40500
      ],
      "d": [
        "วอลล์บ็อกซ์ 3 เฟส 11 kW รองรับ OCPP และบริหารโหลดสำหรับลานจอดหลายคัน",
        "11 kW three-phase wallbox with OCPP and load management for multi-bay car parks."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "11 kW"
        ],
        [
          "หัวชาร์จ",
          "Connector",
          "Type 2"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "OCPP 1.6J, 4G"
        ]
      ]
    },
    {
      "id": "p19",
      "sku": "PLT-EV-DM22",
      "grp": "ev",
      "sub": "wallbox",
      "cat": "green",
      "brand": "Delta",
      "type": "buy",
      "w": 9,
      "stock": 18,
      "pop": 71,
      "n": [
        "เครื่องชาร์จ AC Mini Plus 22kW 3 เฟส",
        "AC Mini Plus 22kW (3-Phase)"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        58000,
        54000,
        51500
      ],
      "d": [
        "เครื่องชาร์จ AC กำลังสูงขนาดกะทัดรัด เหมาะกับอาคารสำนักงานและโรงแรม",
        "Compact high-power AC charger for offices and hotels."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "22 kW"
        ],
        [
          "หัวชาร์จ",
          "Connector",
          "Type 2"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP55"
        ]
      ]
    },
    {
      "id": "p20",
      "sku": "PLT-EV-AB22",
      "grp": "ev",
      "sub": "wallbox",
      "cat": "green",
      "brand": "ABB",
      "type": "buy",
      "w": 8,
      "stock": 9,
      "pop": 76,
      "n": [
        "เครื่องชาร์จ Terra AC W22 พร้อม RFID",
        "Terra AC W22 with RFID"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        69900,
        65500,
        62900
      ],
      "d": [
        "วอลล์บ็อกซ์ 22 kW พร้อมเครื่องอ่าน RFID แยกบัญชีผู้ใช้ชาร์จ",
        "22 kW wallbox with RFID reader for per-user charging accounts."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "22 kW"
        ],
        [
          "หัวชาร์จ",
          "Connector",
          "Type 2"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "OCPP, RFID"
        ]
      ]
    },
    {
      "id": "p21",
      "sku": "PLT-EV-DC60",
      "grp": "ev",
      "sub": "dc",
      "cat": "green",
      "brand": "Polytech",
      "type": "rfq",
      "w": 280,
      "stock": 2,
      "pop": 59,
      "n": [
        "เครื่องชาร์จเร็ว DC 60kW แบบตั้งพื้น",
        "DC Fast Charger 60 kW Floor-standing"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        890000,
        845000,
        810000
      ],
      "d": [
        "เครื่องชาร์จเร็ว CCS2/CHAdeMO สำหรับสถานีบริการและลานรถเชิงพาณิชย์ ต้องประเมินระบบไฟก่อนเสนอราคา",
        "CCS2/CHAdeMO fast charger for stations and fleet depots. Power supply is assessed before quoting."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "60 kW"
        ],
        [
          "หัวชาร์จ",
          "Connector",
          "CCS2 + CHAdeMO"
        ],
        [
          "เงื่อนไข",
          "Note",
          "ต้องสำรวจหน้างาน / site survey required"
        ]
      ]
    },
    {
      "id": "p22",
      "sku": "PLT-EV-DC30",
      "grp": "ev",
      "sub": "dc",
      "cat": "green",
      "brand": "Huawei",
      "type": "rfq",
      "w": 120,
      "stock": 3,
      "pop": 52,
      "n": [
        "เครื่องชาร์จเร็ว DC 30kW แบบติดผนัง",
        "DC Charger 30 kW Wall-mount"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        520000,
        495000,
        470000
      ],
      "d": [
        "ชาร์จเร็วขนาดกะทัดรัดติดผนัง เหมาะกับโชว์รูมและศูนย์บริการ",
        "Compact wall-mount fast charger for showrooms and service centres."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "30 kW"
        ],
        [
          "หัวชาร์จ",
          "Connector",
          "CCS2"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "OCPP 1.6J"
        ]
      ]
    },
    {
      "id": "p23",
      "sku": "PLT-EV-PT35",
      "grp": "ev",
      "sub": "portable",
      "cat": "green",
      "brand": "Polytech",
      "type": "buy",
      "w": 4,
      "stock": 80,
      "pop": 83,
      "n": [
        "เครื่องชาร์จ EV แบบพกพา 3.5kW",
        "Portable EV Charger 3.5kW"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        8900,
        8300,
        7900
      ],
      "d": [
        "ชาร์จพกพาปลั๊กบ้าน ปรับกระแสได้ 8–16 A พร้อมกระเป๋าเก็บ",
        "Portable charger for household sockets, adjustable 8–16 A, with carry bag."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "3.5 kW"
        ],
        [
          "หัวชาร์จ",
          "Connector",
          "Type 2"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP65"
        ]
      ]
    },
    {
      "id": "p24",
      "sku": "PLT-PV-JK580",
      "grp": "solar",
      "sub": "mono",
      "cat": "green",
      "brand": "Jinko",
      "type": "buy",
      "w": 28,
      "stock": 600,
      "pop": 97,
      "n": [
        "แผงโซลาร์ Tiger Neo 580W N-Type",
        "Tiger Neo 580W N-Type Panel"
      ],
      "u": [
        "แผง",
        "panel"
      ],
      "pr": [
        4290,
        3990,
        3790
      ],
      "d": [
        "แผง N-Type TOPCon ประสิทธิภาพสูง ลดการเสื่อมสภาพรายปี",
        "High-efficiency N-Type TOPCon panel with low annual degradation."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "580 W"
        ],
        [
          "ประสิทธิภาพ",
          "Efficiency",
          "22.4%"
        ],
        [
          "การรับประกัน",
          "Warranty",
          "12 ปี / 30 ปี output"
        ]
      ]
    },
    {
      "id": "p25",
      "sku": "PLT-PV-TR445",
      "grp": "solar",
      "sub": "mono",
      "cat": "green",
      "brand": "Trina",
      "type": "buy",
      "w": 22,
      "stock": 420,
      "pop": 90,
      "n": [
        "แผงโซลาร์ Vertex S+ 445W All-Black",
        "Vertex S+ 445W All-Black Panel"
      ],
      "u": [
        "แผง",
        "panel"
      ],
      "pr": [
        3690,
        3450,
        3290
      ],
      "d": [
        "แผงสีดำทั้งแผง ขนาดกะทัดรัด เหมาะหลังคาบ้านและอาคารพาณิชย์",
        "All-black compact panel for homes and commercial roofs."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "445 W"
        ],
        [
          "ประสิทธิภาพ",
          "Efficiency",
          "21.8%"
        ],
        [
          "การรับประกัน",
          "Warranty",
          "15 ปี / 25 ปี output"
        ]
      ]
    },
    {
      "id": "p26",
      "sku": "PLT-PV-LG540",
      "grp": "solar",
      "sub": "mono",
      "cat": "green",
      "brand": "LONGi",
      "type": "buy",
      "w": 28,
      "stock": 350,
      "pop": 80,
      "n": [
        "แผงโซลาร์ Hi-MO 6 540W Mono",
        "Hi-MO 6 540W Mono Panel"
      ],
      "u": [
        "แผง",
        "panel"
      ],
      "pr": [
        4050,
        3790,
        3600
      ],
      "d": [
        "แผง Mono PERC ทนความร้อนสูง เหมาะกับสภาพอากาศไทย",
        "Mono PERC panel with good high-temperature performance for Thai climate."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "540 W"
        ],
        [
          "ประสิทธิภาพ",
          "Efficiency",
          "21.1%"
        ],
        [
          "การรับประกัน",
          "Warranty",
          "12 ปี / 25 ปี output"
        ]
      ]
    },
    {
      "id": "p27",
      "sku": "PLT-PV-CS665",
      "grp": "solar",
      "sub": "bifacial",
      "cat": "green",
      "brand": "Canadian",
      "type": "buy",
      "w": 36,
      "stock": 200,
      "pop": 66,
      "n": [
        "แผงโซลาร์ BiHiKu7 Bifacial 665W",
        "BiHiKu7 Bifacial 665W Panel"
      ],
      "u": [
        "แผง",
        "panel"
      ],
      "pr": [
        5450,
        5100,
        4850
      ],
      "d": [
        "แผงสองหน้าสำหรับโรงงานและโซลาร์ฟาร์ม รับแสงสะท้อนเพิ่มผลผลิต",
        "Bifacial panel for plants and solar farms that harvests reflected light."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "665 W"
        ],
        [
          "ชนิด",
          "Type",
          "Bifacial N-Type"
        ],
        [
          "การรับประกัน",
          "Warranty",
          "12 ปี / 30 ปี output"
        ]
      ]
    },
    {
      "id": "p28",
      "sku": "PLT-PV-JA580",
      "grp": "solar",
      "sub": "bifacial",
      "cat": "green",
      "brand": "JA Solar",
      "type": "buy",
      "w": 28,
      "stock": 260,
      "pop": 62,
      "n": [
        "แผงโซลาร์ JAM72D40 Bifacial 580W",
        "JAM72D40 Bifacial 580W Panel"
      ],
      "u": [
        "แผง",
        "panel"
      ],
      "pr": [
        4390,
        4100,
        3900
      ],
      "d": [
        "แผงสองหน้ากำลังสูง เหมาะกับพื้นผิวหลังคาสีขาว",
        "High-power bifacial panel suited to white or reflective roofs."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "580 W"
        ],
        [
          "ชนิด",
          "Type",
          "Bifacial"
        ],
        [
          "ประสิทธิภาพ",
          "Efficiency",
          "22.4%"
        ]
      ]
    },
    {
      "id": "p29",
      "sku": "PLT-PV-FD200",
      "grp": "solar",
      "sub": "flex",
      "cat": "green",
      "brand": "Polytech",
      "type": "buy",
      "w": 7,
      "stock": 45,
      "pop": 57,
      "n": [
        "แผงโซลาร์พับได้ Foldable 200W",
        "Foldable Solar Blanket 200W"
      ],
      "u": [
        "ชิ้น",
        "pc"
      ],
      "pr": [
        6900,
        6400,
        6100
      ],
      "d": [
        "แผงพับพกพาสำหรับแคมป์ปิ้งและงานภาคสนาม มาพร้อมขั้วต่อ DC",
        "Portable folding panel for camping and field work, with DC connectors."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "200 W"
        ],
        [
          "ขนาด",
          "Size",
          "พับแล้ว / folded 55 x 42 cm"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP65"
        ]
      ]
    },
    {
      "id": "p30",
      "sku": "PLT-PV-RAIL4",
      "grp": "solar",
      "sub": "accessory",
      "cat": "green",
      "brand": "Polytech",
      "type": "buy",
      "w": 14,
      "stock": 90,
      "pop": 44,
      "n": [
        "ชุดรางยึดแผงโซลาร์อลูมิเนียม (4 แผง)",
        "Aluminium Rail Mounting Kit (4 panels)"
      ],
      "u": [
        "ชุด",
        "set"
      ],
      "pr": [
        3200,
        2950,
        2800
      ],
      "d": [
        "ชุดรางและขายึดหลังคาสังกะสี/เมทัลชีท รวมน็อตสแตนเลส",
        "Rails and clamps for metal sheet roofs, with stainless hardware."
      ],
      "sp": [
        [
          "รองรับน้ำหนัก",
          "Load capacity",
          "4 panels"
        ],
        [
          "ชนิด",
          "Type",
          "Anodised aluminium"
        ],
        [
          "การรับประกัน",
          "Warranty",
          "10 ปี / 10 years"
        ]
      ]
    },
    {
      "id": "p31",
      "sku": "PLT-BT-US5000",
      "grp": "battery",
      "sub": "home",
      "cat": "green",
      "brand": "Pylontech",
      "type": "buy",
      "w": 39,
      "stock": 25,
      "pop": 96,
      "n": [
        "แบตเตอรี่ US5000 48V 4.8kWh LiFePO4",
        "US5000 48V 4.8kWh LiFePO4 Battery"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        62500,
        58500,
        55500
      ],
      "d": [
        "แบตเตอรี่ลิเธียมฟอสเฟตสำหรับระบบโซลาร์บ้าน ต่อขนานได้สูงสุด 16 ชุด",
        "LiFePO4 battery for home solar, up to 16 units in parallel."
      ],
      "sp": [
        [
          "ความจุ",
          "Capacity",
          "4.8 kWh"
        ],
        [
          "แรงดัน",
          "Voltage",
          "48 Vdc"
        ],
        [
          "รอบการใช้งาน",
          "Cycle life",
          "6,000 cycles"
        ]
      ]
    },
    {
      "id": "p32",
      "sku": "PLT-BT-PB10",
      "grp": "battery",
      "sub": "home",
      "cat": "green",
      "brand": "Dyness",
      "type": "buy",
      "w": 98,
      "stock": 12,
      "pop": 73,
      "n": [
        "แบตเตอรี่ PowerBox Pro 10kWh",
        "PowerBox Pro 10kWh Battery"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        128000,
        119000,
        113000
      ],
      "d": [
        "แบตเตอรี่ตั้งพื้นความจุสูง พร้อม BMS และจอแสดงผล เข้ากันได้กับอินเวอร์เตอร์ชั้นนำ",
        "High-capacity floor battery with BMS and display, compatible with leading inverters."
      ],
      "sp": [
        [
          "ความจุ",
          "Capacity",
          "10 kWh"
        ],
        [
          "แรงดัน",
          "Voltage",
          "51.2 Vdc"
        ],
        [
          "รอบการใช้งาน",
          "Cycle life",
          "6,000 cycles"
        ]
      ]
    },
    {
      "id": "p33",
      "sku": "PLT-BT-HVS51",
      "grp": "battery",
      "sub": "hv",
      "cat": "green",
      "brand": "BYD",
      "type": "buy",
      "w": 91,
      "stock": 8,
      "pop": 79,
      "n": [
        "แบตเตอรี่ Battery-Box Premium HVS 5.1",
        "Battery-Box Premium HVS 5.1"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        115000,
        107000,
        101000
      ],
      "d": [
        "แบตเตอรี่แรงดันสูงแบบสแต็ก ขยายความจุได้ตามการใช้งาน",
        "Stackable high-voltage battery, expandable with demand."
      ],
      "sp": [
        [
          "ความจุ",
          "Capacity",
          "5.1 kWh"
        ],
        [
          "แรงดัน",
          "Voltage",
          "204 Vdc"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP55"
        ]
      ]
    },
    {
      "id": "p34",
      "sku": "PLT-BT-HVM11",
      "grp": "battery",
      "sub": "hv",
      "cat": "green",
      "brand": "BYD",
      "type": "buy",
      "w": 160,
      "stock": 5,
      "pop": 55,
      "n": [
        "แบตเตอรี่ Battery-Box Premium HVM 11.0",
        "Battery-Box Premium HVM 11.0"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        225000,
        210000,
        198000
      ],
      "d": [
        "แบตเตอรี่แรงดันสูงสำหรับธุรกิจขนาดเล็กและอาคารพาณิชย์",
        "High-voltage battery for small businesses and commercial buildings."
      ],
      "sp": [
        [
          "ความจุ",
          "Capacity",
          "11.04 kWh"
        ],
        [
          "แรงดัน",
          "Voltage",
          "256 Vdc"
        ],
        [
          "รอบการใช้งาน",
          "Cycle life",
          "8,000 cycles"
        ]
      ]
    },
    {
      "id": "p35",
      "sku": "PLT-BT-LF280",
      "grp": "battery",
      "sub": "cell",
      "cat": "green",
      "brand": "EVE",
      "type": "buy",
      "w": 22,
      "stock": 60,
      "pop": 68,
      "n": [
        "เซลล์ลิเธียม LF280K 3.2V 280Ah (ชุด 4 เซลล์)",
        "LF280K 3.2V 280Ah LiFePO4 Cell (set of 4)"
      ],
      "u": [
        "ชุด",
        "set"
      ],
      "pr": [
        21900,
        20500,
        19500
      ],
      "d": [
        "เซลล์ LiFePO4 เกรด A สำหรับประกอบแบตเตอรี่แพ็กเอง",
        "Grade A LiFePO4 cells for DIY battery packs."
      ],
      "sp": [
        [
          "เซลล์",
          "Cells",
          "4 x 3.2 V"
        ],
        [
          "ความจุ",
          "Capacity",
          "280 Ah"
        ],
        [
          "รอบการใช้งาน",
          "Cycle life",
          "6,000 cycles"
        ]
      ]
    },
    {
      "id": "p36",
      "sku": "PLT-BT-GEL200",
      "grp": "battery",
      "sub": "lead",
      "cat": "green",
      "brand": "Polytech",
      "type": "buy",
      "w": 58,
      "stock": 34,
      "pop": 61,
      "n": [
        "แบตเตอรี่ดีพไซเคิล Gel 12V 200Ah",
        "Deep Cycle Gel Battery 12V 200Ah"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        9900,
        9200,
        8700
      ],
      "d": [
        "แบตเตอรี่เจลดีพไซเคิล ปลอดการบำรุงรักษา เหมาะกับระบบโซลาร์ออฟกริด",
        "Maintenance-free gel deep-cycle battery for off-grid solar."
      ],
      "sp": [
        [
          "ความจุ",
          "Capacity",
          "200 Ah"
        ],
        [
          "แรงดัน",
          "Voltage",
          "12 Vdc"
        ],
        [
          "การรับประกัน",
          "Warranty",
          "2 ปี / 2 years"
        ]
      ]
    },
    {
      "id": "p37",
      "sku": "PLT-IV-DY5K",
      "grp": "inverter",
      "sub": "hybrid",
      "cat": "green",
      "brand": "Deye",
      "type": "buy",
      "w": 24,
      "stock": 40,
      "pop": 99,
      "n": [
        "ไฮบริดอินเวอร์เตอร์ 5kW SUN-5K",
        "Hybrid Inverter 5kW SUN-5K"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        38900,
        36500,
        34500
      ],
      "d": [
        "ไฮบริดอินเวอร์เตอร์ 1 เฟส รองรับแบตเตอรี่ลิเธียม พร้อม Wi-Fi มอนิเตอร์",
        "Single-phase hybrid inverter with lithium battery support and Wi-Fi monitoring."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "5 kW"
        ],
        [
          "ประสิทธิภาพ",
          "Efficiency",
          "97.6%"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "Wi-Fi, RS485"
        ]
      ]
    },
    {
      "id": "p38",
      "sku": "PLT-IV-SGH10",
      "grp": "inverter",
      "sub": "hybrid",
      "cat": "green",
      "brand": "Sungrow",
      "type": "buy",
      "w": 30,
      "stock": 10,
      "pop": 69,
      "n": [
        "ไฮบริดอินเวอร์เตอร์ 3 เฟส SH10RT",
        "Hybrid Inverter 3-Phase SH10RT"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        89000,
        83500,
        79000
      ],
      "d": [
        "ไฮบริด 3 เฟส 10 kW สำหรับโรงงานขนาดเล็กและร้านค้า",
        "3-phase 10 kW hybrid inverter for small factories and shops."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "10 kW"
        ],
        [
          "ประสิทธิภาพ",
          "Efficiency",
          "98.4%"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "Wi-Fi, Ethernet"
        ]
      ]
    },
    {
      "id": "p39",
      "sku": "PLT-IV-GW6K",
      "grp": "inverter",
      "sub": "string",
      "cat": "green",
      "brand": "Growatt",
      "type": "buy",
      "w": 12,
      "stock": 52,
      "pop": 78,
      "n": [
        "อินเวอร์เตอร์ MIN 6000TL-X",
        "MIN 6000TL-X String Inverter"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        32500,
        30500,
        28900
      ],
      "d": [
        "ออนกริดอินเวอร์เตอร์ 1 เฟส 2 MPPT สำหรับโซลาร์บ้าน",
        "On-grid single-phase inverter with 2 MPPT for residential solar."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "6 kW"
        ],
        [
          "ประสิทธิภาพ",
          "Efficiency",
          "98.4%"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP66"
        ]
      ]
    },
    {
      "id": "p40",
      "sku": "PLT-IV-HW10K",
      "grp": "inverter",
      "sub": "string",
      "cat": "green",
      "brand": "Huawei",
      "type": "buy",
      "w": 17,
      "stock": 15,
      "pop": 72,
      "n": [
        "อินเวอร์เตอร์ SUN2000-10KTL-M2",
        "SUN2000-10KTL-M2 String Inverter"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        54500,
        51000,
        48500
      ],
      "d": [
        "อินเวอร์เตอร์ 3 เฟส 10 kW พร้อม AFCI และมอนิเตอร์ผ่าน FusionSolar",
        "3-phase 10 kW inverter with AFCI and FusionSolar monitoring."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "10 kW"
        ],
        [
          "ประสิทธิภาพ",
          "Efficiency",
          "98.65%"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP65"
        ]
      ]
    },
    {
      "id": "p41",
      "sku": "PLT-IV-SG110",
      "grp": "inverter",
      "sub": "string",
      "cat": "green",
      "brand": "Sungrow",
      "type": "buy",
      "w": 85,
      "stock": 6,
      "pop": 65,
      "n": [
        "อินเวอร์เตอร์ SG110CX 110kW 3 เฟส",
        "SG110CX 110kW 3-Phase Inverter"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        186000,
        174000,
        165000
      ],
      "d": [
        "อินเวอร์เตอร์ขนาดใหญ่สำหรับหลังคาโรงงานและโซลาร์ฟาร์ม",
        "Large inverter for factory roofs and solar farms."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "110 kW"
        ],
        [
          "ประสิทธิภาพ",
          "Efficiency",
          "98.7%"
        ],
        [
          "ช่องสัญญาณ",
          "Channels",
          "9 MPPT"
        ]
      ]
    },
    {
      "id": "p42",
      "sku": "PLT-IV-MTR666",
      "grp": "inverter",
      "sub": "monitor",
      "cat": "green",
      "brand": "Huawei",
      "type": "buy",
      "w": 1,
      "stock": 120,
      "pop": 49,
      "n": [
        "สมาร์ทมิเตอร์ DTSU666-H",
        "Smart Power Meter DTSU666-H"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        3900,
        3600,
        3400
      ],
      "d": [
        "มิเตอร์ 3 เฟสสำหรับจำกัดการจ่ายไฟเข้าระบบ (zero export)",
        "3-phase meter for zero-export control."
      ],
      "sp": [
        [
          "การสื่อสาร",
          "Communication",
          "RS485 Modbus"
        ],
        [
          "ความแม่นยำ",
          "Accuracy",
          "Class 1"
        ],
        [
          "แรงดัน",
          "Voltage",
          "3 x 230/400 V"
        ]
      ]
    },
    {
      "id": "p43",
      "sku": "PLT-PL-FX5U32",
      "grp": "auto",
      "sub": "plc",
      "cat": "auto",
      "brand": "Mitsubishi",
      "type": "buy",
      "w": 2,
      "stock": 33,
      "pop": 83,
      "n": [
        "PLC FX5U-32MR/ES พร้อม I/O 32 จุด",
        "PLC FX5U-32MR/ES with 32 I/O"
      ],
      "u": [
        "ชุด",
        "set"
      ],
      "pr": [
        14900,
        13600,
        12900
      ],
      "d": [
        "PLC ประสิทธิภาพสูงพร้อมอีเทอร์เน็ตในตัว รองรับ Ladder และ ST",
        "High-performance PLC with built-in Ethernet, ladder and ST programming."
      ],
      "sp": [
        [
          "I/O",
          "I/O",
          "16 in / 16 out"
        ],
        [
          "แรงดัน",
          "Voltage",
          "100–240 Vac"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "Ethernet, RS485"
        ]
      ]
    },
    {
      "id": "p44",
      "sku": "PLT-PL-S71214",
      "grp": "auto",
      "sub": "plc",
      "cat": "auto",
      "brand": "Siemens",
      "type": "buy",
      "w": 2,
      "stock": 21,
      "pop": 74,
      "n": [
        "PLC SIMATIC S7-1200 CPU 1214C",
        "SIMATIC S7-1200 CPU 1214C"
      ],
      "u": [
        "ชุด",
        "set"
      ],
      "pr": [
        19800,
        18200,
        17400
      ],
      "d": [
        "ซีพียูมาตรฐานสำหรับงานเครื่องจักร พร้อม PROFINET",
        "Standard CPU for machine control with PROFINET."
      ],
      "sp": [
        [
          "I/O",
          "I/O",
          "14 in / 10 out"
        ],
        [
          "แรงดัน",
          "Voltage",
          "24 Vdc"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "PROFINET"
        ]
      ]
    },
    {
      "id": "p45",
      "sku": "PLT-SV-B3750",
      "grp": "auto",
      "sub": "drive",
      "cat": "auto",
      "brand": "Delta",
      "type": "buy",
      "w": 7,
      "stock": 16,
      "pop": 70,
      "n": [
        "เซอร์โวมอเตอร์และไดรฟ์ ASDA-B3 750W",
        "ASDA-B3 750W Servo Motor & Drive"
      ],
      "u": [
        "ชุด",
        "set"
      ],
      "pr": [
        24500,
        22800,
        21500
      ],
      "d": [
        "ชุดเซอร์โวความแม่นยำสูงสำหรับงานแพ็กกิ้งและเครื่อง CNC",
        "High-precision servo set for packaging and CNC applications."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "750 W"
        ],
        [
          "แรงดัน",
          "Voltage",
          "220 Vac"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "CANopen, Modbus"
        ]
      ]
    },
    {
      "id": "p46",
      "sku": "PLT-VF-ACS580",
      "grp": "auto",
      "sub": "drive",
      "cat": "auto",
      "brand": "ABB",
      "type": "buy",
      "w": 9,
      "stock": 11,
      "pop": 67,
      "n": [
        "อินเวอร์เตอร์ควบคุมมอเตอร์ ACS580 7.5 kW",
        "ACS580 7.5 kW VFD"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        38500,
        36000,
        34200
      ],
      "d": [
        "ไดรฟ์มาตรฐานสำหรับปั๊มและพัดลม ตั้งค่าง่ายผ่านแผงควบคุมในตัว",
        "General-purpose drive for pumps and fans with an assistant control panel."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "7.5 kW"
        ],
        [
          "แรงดัน",
          "Voltage",
          "380–480 Vac"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP21"
        ]
      ]
    },
    {
      "id": "p47",
      "sku": "PLT-SN-E3Z",
      "grp": "auto",
      "sub": "sensor",
      "cat": "auto",
      "brand": "Omron",
      "type": "buy",
      "w": 1,
      "stock": 150,
      "pop": 63,
      "n": [
        "โฟโต้อิเล็กทริคเซนเซอร์ E3Z-D62",
        "E3Z-D62 Photoelectric Sensor"
      ],
      "u": [
        "ชิ้น",
        "pc"
      ],
      "pr": [
        1450,
        1300,
        1200
      ],
      "d": [
        "เซนเซอร์ตรวจจับวัตถุระยะ 100 มม. ขนาดกะทัดรัด",
        "Compact diffuse-reflective sensor with 100 mm range."
      ],
      "sp": [
        [
          "ช่วงวัด",
          "Range",
          "100 mm"
        ],
        [
          "แรงดัน",
          "Voltage",
          "12–24 Vdc"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP67"
        ]
      ]
    },
    {
      "id": "p48",
      "sku": "PLT-SN-PR18",
      "grp": "auto",
      "sub": "sensor",
      "cat": "auto",
      "brand": "Autonics",
      "type": "buy",
      "w": 1,
      "stock": 200,
      "pop": 54,
      "n": [
        "พร็อกซิมิตี้เซนเซอร์ PR18-8DN",
        "PR18-8DN Proximity Sensor"
      ],
      "u": [
        "ชิ้น",
        "pc"
      ],
      "pr": [
        380,
        340,
        320
      ],
      "d": [
        "เซนเซอร์เหนี่ยวนำ M18 ระยะตรวจจับ 8 มม. สำหรับตรวจชิ้นงานโลหะ",
        "M18 inductive sensor with 8 mm range for metal detection."
      ],
      "sp": [
        [
          "ช่วงวัด",
          "Range",
          "8 mm"
        ],
        [
          "แรงดัน",
          "Voltage",
          "12–24 Vdc"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP67"
        ]
      ]
    },
    {
      "id": "p49",
      "sku": "PLT-IN-F1738",
      "grp": "inst",
      "sub": "meter",
      "cat": "inst",
      "brand": "Fluke",
      "type": "buy",
      "w": 3,
      "stock": 7,
      "pop": 71,
      "n": [
        "เครื่องบันทึกคุณภาพไฟฟ้า Fluke 1738",
        "Fluke 1738 Power Quality Logger"
      ],
      "u": [
        "ชุด",
        "set"
      ],
      "pr": [
        185000,
        172000,
        164000
      ],
      "d": [
        "วัดและบันทึกคุณภาพไฟฟ้า 3 เฟส พร้อมวิเคราะห์ฮาร์มอนิกส์",
        "Logs 3-phase power quality including harmonics."
      ],
      "sp": [
        [
          "แรงดัน",
          "Voltage",
          "1000 V CAT III"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "Wi-Fi, USB"
        ],
        [
          "การรับประกัน",
          "Warranty",
          "3 ปี / 3 years"
        ]
      ]
    },
    {
      "id": "p50",
      "sku": "PLT-IN-FTI401",
      "grp": "inst",
      "sub": "meter",
      "cat": "inst",
      "brand": "Fluke",
      "type": "buy",
      "w": 2,
      "stock": 5,
      "pop": 66,
      "n": [
        "กล้องถ่ายภาพความร้อน Fluke Ti401 PRO",
        "Fluke Ti401 PRO Thermal Camera"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        329000,
        308000,
        292000
      ],
      "d": [
        "กล้องถ่ายภาพความร้อนสำหรับตรวจตู้ไฟและมอเตอร์ ความละเอียด 320x240",
        "Thermal imager for panels and motors at 320x240 resolution."
      ],
      "sp": [
        [
          "ขนาด",
          "Size",
          "320 x 240"
        ],
        [
          "ช่วงวัด",
          "Range",
          "-20 to 650°C"
        ],
        [
          "ความแม่นยำ",
          "Accuracy",
          "±2°C"
        ]
      ]
    },
    {
      "id": "p51",
      "sku": "PLT-IN-EJA530",
      "grp": "inst",
      "sub": "meter",
      "cat": "inst",
      "brand": "Yokogawa",
      "type": "buy",
      "w": 2,
      "stock": 14,
      "pop": 60,
      "n": [
        "ทรานสมิตเตอร์วัดความดัน EJA530E",
        "EJA530E Pressure Transmitter"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        42500,
        39800,
        37500
      ],
      "d": [
        "วัดความดันแบบ Gauge/Absolute สัญญาณ 4–20 mA พร้อม HART",
        "Gauge/absolute pressure transmitter with 4–20 mA and HART."
      ],
      "sp": [
        [
          "ช่วงวัด",
          "Range",
          "0–25 MPa"
        ],
        [
          "ความแม่นยำ",
          "Accuracy",
          "±0.04%"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "4–20 mA, HART"
        ]
      ]
    },
    {
      "id": "p52",
      "sku": "PLT-GS-KP4G",
      "grp": "inst",
      "sub": "gas",
      "cat": "gas",
      "brand": "Sensguard",
      "type": "buy",
      "w": 1,
      "stock": 28,
      "pop": 64,
      "n": [
        "เครื่องตรวจจับก๊าซแบบพกพา 4 ชนิด KP-4G",
        "KP-4G Portable 4-Gas Detector"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        28900,
        26800,
        25400
      ],
      "d": [
        "ตรวจ O2, CO, H2S และก๊าซติดไฟ แจ้งเตือนด้วยเสียงและสั่น",
        "Detects O2, CO, H2S and combustibles with sound and vibration alarms."
      ],
      "sp": [
        [
          "ช่องสัญญาณ",
          "Channels",
          "4 gases"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP67"
        ],
        [
          "การรับประกัน",
          "Warranty",
          "2 ปี / 2 years"
        ]
      ]
    },
    {
      "id": "p53",
      "sku": "PLT-GS-FS100",
      "grp": "inst",
      "sub": "gas",
      "cat": "gas",
      "brand": "Sensguard",
      "type": "buy",
      "w": 1,
      "stock": 45,
      "pop": 57,
      "n": [
        "หัวตรวจจับก๊าซ CO แบบติดตั้งถาวร FS-100",
        "FS-100 Fixed CO Sensor Head"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        9800,
        9100,
        8700
      ],
      "d": [
        "หัวตรวจจับก๊าซคาร์บอนมอนอกไซด์ สัญญาณ 4–20 mA",
        "Fixed carbon monoxide sensor head with 4–20 mA output."
      ],
      "sp": [
        [
          "ช่วงวัด",
          "Range",
          "0–300 ppm"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "4–20 mA"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP65"
        ]
      ]
    },
    {
      "id": "p54",
      "sku": "PLT-GS-BC2",
      "grp": "inst",
      "sub": "gas",
      "cat": "gas",
      "brand": "Sensguard",
      "type": "buy",
      "w": 2,
      "stock": 30,
      "pop": 45,
      "n": [
        "สัญญาณเตือนไฟและเสียงระยะไกล GD-B2",
        "GD-B2 Remote Alarm Beacon"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        4500,
        4200,
        4000
      ],
      "d": [
        "ไซเรนและไฟกระพริบ 110 dB สำหรับต่อกับตู้ควบคุมก๊าซ",
        "110 dB sounder and strobe for gas controllers."
      ],
      "sp": [
        [
          "แรงดัน",
          "Voltage",
          "24 Vdc"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP66"
        ],
        [
          "เงื่อนไข",
          "Note",
          "110 dB"
        ]
      ]
    },
    {
      "id": "p55",
      "sku": "PLT-DC-5PX3K",
      "grp": "infra",
      "sub": "ups",
      "cat": "dc",
      "brand": "Eaton",
      "type": "buy",
      "w": 38,
      "stock": 14,
      "pop": 72,
      "n": [
        "UPS แบบติดตั้งแร็ค Eaton 5PX 3000VA",
        "Eaton 5PX 3000VA Rack UPS"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        68000,
        63500,
        60500
      ],
      "d": [
        "UPS Line-interactive Sine-wave สำหรับห้องเซิร์ฟเวอร์และตู้เน็ตเวิร์ก",
        "Line-interactive sine-wave UPS for server rooms and network cabinets."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "3000 VA / 3000 W"
        ],
        [
          "ขนาด",
          "Size",
          "2U rack"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "USB, RS232, SNMP"
        ]
      ]
    },
    {
      "id": "p56",
      "sku": "PLT-DC-LIR20",
      "grp": "infra",
      "sub": "ups",
      "cat": "dc",
      "brand": "Vertiv",
      "type": "rfq",
      "w": 220,
      "stock": 1,
      "pop": 50,
      "n": [
        "ระบบทำความเย็น In-Row 20kW",
        "Liebert In-Row Cooling 20kW"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        785000,
        740000,
        705000
      ],
      "d": [
        "แอร์ระบายความร้อนเฉพาะแถวตู้แร็ค ต้องคำนวณโหลดก่อนเสนอราคา",
        "In-row cooling for rack aisles; sized to the heat load before quoting."
      ],
      "sp": [
        [
          "กำลัง",
          "Power",
          "20 kW cooling"
        ],
        [
          "เงื่อนไข",
          "Note",
          "ต้องสำรวจหน้างาน / site survey required"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "Modbus, SNMP"
        ]
      ]
    },
    {
      "id": "p57",
      "sku": "PLT-DC-RK42",
      "grp": "infra",
      "sub": "rack",
      "cat": "dc",
      "brand": "Polytech",
      "type": "buy",
      "w": 150,
      "stock": 10,
      "pop": 62,
      "n": [
        "ตู้แร็คเซิร์ฟเวอร์ 42U 800x1000",
        "42U Server Rack 800x1000"
      ],
      "u": [
        "ตู้",
        "cabinet"
      ],
      "pr": [
        24500,
        22800,
        21500
      ],
      "d": [
        "ตู้แร็คมาตรฐาน 19 นิ้ว ประตูเจาะรูระบายอากาศ พร้อมล็อกกุญแจ",
        "Standard 19-inch rack with perforated doors and locks."
      ],
      "sp": [
        [
          "ขนาด",
          "Size",
          "42U / 800 x 1000 mm"
        ],
        [
          "รองรับน้ำหนัก",
          "Load capacity",
          "1,000 kg"
        ],
        [
          "ชนิด",
          "Type",
          "19-inch"
        ]
      ]
    },
    {
      "id": "p58",
      "sku": "PLT-DC-RK22",
      "grp": "infra",
      "sub": "rack",
      "cat": "dc",
      "brand": "Polytech",
      "type": "buy",
      "w": 35,
      "stock": 24,
      "pop": 58,
      "n": [
        "ตู้เน็ตเวิร์กติดผนัง 22U",
        "22U Wall-mount Network Rack"
      ],
      "u": [
        "ตู้",
        "cabinet"
      ],
      "pr": [
        7900,
        7300,
        6900
      ],
      "d": [
        "ตู้แร็คติดผนังสำหรับสวิตช์และอุปกรณ์สื่อสาร",
        "Wall-mount rack for switches and comms equipment."
      ],
      "sp": [
        [
          "ขนาด",
          "Size",
          "22U / 600 x 600 mm"
        ],
        [
          "รองรับน้ำหนัก",
          "Load capacity",
          "60 kg"
        ],
        [
          "ชนิด",
          "Type",
          "19-inch"
        ]
      ]
    },
    {
      "id": "p59",
      "sku": "PLT-WH-DS2208",
      "grp": "infra",
      "sub": "wms",
      "cat": "wh",
      "brand": "Zebra",
      "type": "buy",
      "w": 1,
      "stock": 90,
      "pop": 66,
      "n": [
        "เครื่องสแกนบาร์โค้ด 2D Zebra DS2208",
        "Zebra DS2208 2D Barcode Scanner"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        5200,
        4800,
        4600
      ],
      "d": [
        "สแกนเนอร์มือถือสำหรับคลังสินค้าและโลจิสติกส์ อ่านได้ทั้ง 1D/2D",
        "Handheld imager for warehouse and logistics reading 1D and 2D codes."
      ],
      "sp": [
        [
          "ชนิด",
          "Type",
          "2D imager"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "USB"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP42"
        ]
      ]
    },
    {
      "id": "p60",
      "sku": "PLT-WH-TC52",
      "grp": "infra",
      "sub": "wms",
      "cat": "wh",
      "brand": "Zebra",
      "type": "buy",
      "w": 1,
      "stock": 20,
      "pop": 61,
      "n": [
        "คอมพิวเตอร์มือถือ Zebra TC52",
        "Zebra TC52 Mobile Computer"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        38500,
        36000,
        34200
      ],
      "d": [
        "สมาร์ทดีไวซ์ทนทานสำหรับรับสินค้าและตรวจนับสต็อก",
        "Rugged device for goods receipt and stock counting."
      ],
      "sp": [
        [
          "ขนาด",
          "Size",
          "5 inch"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "Wi-Fi 6, Bluetooth"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP68"
        ]
      ]
    },
    {
      "id": "p61",
      "sku": "PLT-WH-FX7500",
      "grp": "infra",
      "sub": "wms",
      "cat": "wh",
      "brand": "Zebra",
      "type": "buy",
      "w": 3,
      "stock": 8,
      "pop": 53,
      "n": [
        "เครื่องอ่าน RFID แบบติดตั้งถาวร FX7500",
        "FX7500 Fixed RFID Reader"
      ],
      "u": [
        "เครื่อง",
        "unit"
      ],
      "pr": [
        64500,
        60500,
        57500
      ],
      "d": [
        "เครื่องอ่าน UHF RFID 4 พอร์ตสำหรับประตูรับ-ส่งสินค้า",
        "4-port UHF RFID reader for dock doors."
      ],
      "sp": [
        [
          "ช่องสัญญาณ",
          "Channels",
          "4 antenna ports"
        ],
        [
          "การสื่อสาร",
          "Communication",
          "Ethernet, PoE+"
        ],
        [
          "ระดับการป้องกัน",
          "Ingress rating",
          "IP53"
        ]
      ]
    }
  ],
  "services": [
    {
      "id": "s1",
      "code": "SVC-01",
      "photo": "./assets/services/consulting-design.webp",
      "n": [
        "ให้คำปรึกษาและออกแบบระบบ",
        "Consulting & system design"
      ],
      "short": [
        "ประเมินความต้องการ คำนวณโหลด และออกแบบระบบร่วมกับทีมวิศวกร",
        "Requirement assessment, load calculation and system design with our engineers."
      ],
      "scope": [
        [
          "สำรวจหน้างานและเก็บข้อมูลการใช้พลังงาน",
          "Site survey and energy data collection"
        ],
        [
          "คำนวณโหลดและเลือกอุปกรณ์",
          "Load calculation and equipment selection"
        ],
        [
          "จัดทำแบบและรายการประกอบแบบ",
          "Drawings and bill of materials"
        ],
        [
          "ประมาณการงบลงทุนและระยะคืนทุน",
          "Capex estimate and payback analysis"
        ]
      ]
    },
    {
      "id": "s2",
      "code": "SVC-02",
      "photo": "./assets/services/integration-installation.webp",
      "n": [
        "วางระบบและติดตั้ง",
        "System integration & installation"
      ],
      "short": [
        "ติดตั้ง เดินสาย ทดสอบ และส่งมอบระบบพร้อมใช้งานที่หน้างาน",
        "Installation, wiring, testing and handover of a working system on site."
      ],
      "scope": [
        [
          "ติดตั้งอุปกรณ์และงานเดินสาย",
          "Equipment installation and wiring"
        ],
        [
          "เขียนโปรแกรมควบคุมและทดสอบร่วมกับเครื่องจักร",
          "Control programming and integration testing"
        ],
        [
          "ทดสอบการเดินระบบและส่งมอบ",
          "Commissioning and handover"
        ],
        [
          "จัดทำเอกสาร As-built",
          "As-built documentation"
        ]
      ]
    },
    {
      "id": "s3",
      "code": "SVC-03",
      "photo": "./assets/services/calibration-training.webp",
      "n": [
        "สอบเทียบเครื่องมือวัดและฝึกอบรม",
        "Calibration & training"
      ],
      "short": [
        "สอบเทียบเครื่องมือวัดพร้อมใบรับรอง และอบรมการใช้งานให้ทีมผู้ปฏิบัติงาน",
        "Instrument calibration with certificates plus operator training for your team."
      ],
      "scope": [
        [
          "สอบเทียบเครื่องมือวัดตามมาตรฐาน",
          "Calibration to reference standards"
        ],
        [
          "ออกใบรับรองผลการสอบเทียบ",
          "Calibration certificates"
        ],
        [
          "อบรมการใช้งานและบำรุงรักษาเบื้องต้น",
          "Operation and basic maintenance training"
        ],
        [
          "จัดทำแผนสอบเทียบรายปี",
          "Annual calibration schedule"
        ]
      ]
    },
    {
      "id": "s4",
      "code": "SVC-04",
      "photo": "./assets/services/maintenance-after-sales.webp",
      "n": [
        "บำรุงรักษาและบริการหลังการขาย",
        "Maintenance & after-sales service"
      ],
      "short": [
        "สัญญาบำรุงรักษาเชิงป้องกัน อะไหล่สำรอง และทีมบริการตอบสนองตาม SLA",
        "Preventive maintenance contracts, spare parts and an SLA-backed service team."
      ],
      "scope": [
        [
          "ตรวจเช็คเชิงป้องกันตามรอบ",
          "Scheduled preventive inspections"
        ],
        [
          "สำรองอะไหล่สำคัญ",
          "Critical spare parts stocking"
        ],
        [
          "บริการแก้ไขเหตุขัดข้องตาม SLA",
          "Breakdown response under SLA"
        ],
        [
          "รายงานสภาพอุปกรณ์รายไตรมาส",
          "Quarterly equipment condition report"
        ]
      ]
    },
    {
      "id": "s5",
      "code": "SVC-05",
      "photo": "./assets/services/data-center-backup-power.webp",
      "n": [
        "โซลูชันศูนย์ข้อมูลและระบบสำรองไฟ",
        "Data center & backup power solutions"
      ],
      "short": [
        "ออกแบบและติดตั้งระบบไฟฟ้า UPS และการจัดการความร้อนสำหรับห้องเซิร์ฟเวอร์",
        "Design and installation of power, UPS and thermal management for server rooms."
      ],
      "scope": [
        [
          "ประเมินโหลดและความพร้อมใช้งาน",
          "Load and availability assessment"
        ],
        [
          "ออกแบบระบบไฟฟ้าและ UPS",
          "Power and UPS design"
        ],
        [
          "จัดระเบียบลมเย็นและตู้แร็ค",
          "Airflow containment and racks"
        ],
        [
          "ติดตั้งระบบตรวจวัดสภาพแวดล้อม",
          "Environmental monitoring"
        ]
      ]
    }
  ],
  "categories": [
    {
      "id": "green",
      "n": [
        "พลังงานสะอาดและ EV",
        "Clean energy & EV"
      ],
      "note": [
        "อินเวอร์เตอร์ แบตเตอรี่ และเครื่องชาร์จรถไฟฟ้า",
        "Inverters, batteries and EV chargers"
      ]
    },
    {
      "id": "auto",
      "n": [
        "ระบบควบคุมอัตโนมัติ",
        "Industrial automation"
      ],
      "note": [
        "PLC, HMI, VFD และอุปกรณ์สายการผลิต",
        "PLC, HMI, VFD and line equipment"
      ]
    },
    {
      "id": "inst",
      "n": [
        "เครื่องมือวัดและตรวจสอบคุณภาพ",
        "Instruments & inspection"
      ],
      "note": [
        "Machine vision มิเตอร์ และการสอบเทียบ",
        "Machine vision, meters and calibration"
      ]
    },
    {
      "id": "gas",
      "n": [
        "ระบบก๊าซอุตสาหกรรม",
        "Industrial gas systems"
      ],
      "note": [
        "ตรวจจับก๊าซและอุปกรณ์ NGV",
        "Gas detection and NGV equipment"
      ]
    },
    {
      "id": "dc",
      "n": [
        "ศูนย์ข้อมูลและระบบสำรองไฟ",
        "Data center & backup power"
      ],
      "note": [
        "UPS ระบบไฟฟ้า และการระบายความร้อน",
        "UPS, power and cooling"
      ]
    },
    {
      "id": "wh",
      "n": [
        "คลังสินค้าอัตโนมัติ",
        "Warehouse automation"
      ],
      "note": [
        "ระบบติดตามและควบคุมการทำงาน",
        "Tracking and control systems"
      ]
    }
  ],
  "groups": [
    {
      "id": "ev",
      "n": [
        "EV Charger",
        "EV Charger"
      ],
      "t": [
        "ชาร์จเต็ม ข้ามคืน",
        "Fully charged by morning"
      ],
      "s": [
        "AC Wallbox 7–22kW",
        "AC Wallbox 7–22 kW"
      ],
      "img": "Electric_Vehicle_Charging_Station.jpg",
      "subs": [
        "wallbox",
        "dc",
        "portable"
      ]
    },
    {
      "id": "solar",
      "n": [
        "แผงโซลาร์",
        "Solar Panel"
      ],
      "t": [
        "รับแดดเต็ม หลังคาคุ้มค่า",
        "Full sun, full yield"
      ],
      "s": [
        "แผง Tier-1 รับประกัน 25 ปี",
        "Tier-1 panels, 25-year warranty"
      ],
      "img": "Roof-Top_SolarPV.jpg",
      "subs": [
        "mono",
        "bifacial",
        "flex"
      ]
    },
    {
      "id": "battery",
      "n": [
        "แบตเตอรี่เก็บพลังงาน",
        "Battery Storage"
      ],
      "t": [
        "เก็บไฟ ใช้ทั้งคืน",
        "Store it, use it all night"
      ],
      "s": [
        "LiFePO4 6,000 รอบชาร์จ",
        "LiFePO4 6,000 cycles"
      ],
      "img": "Inverter_battery_-_Loom_Solar.jpg",
      "subs": [
        "home",
        "hv",
        "lead"
      ]
    },
    {
      "id": "inverter",
      "n": [
        "อินเวอร์เตอร์",
        "Inverter"
      ],
      "t": [
        "แปลงไฟอย่างเสถียร",
        "Stable power conversion"
      ],
      "s": [
        "String · Hybrid · มอนิเตอร์",
        "String · Hybrid · Monitoring"
      ],
      "img": "SolarEdge-Inverter.jpg",
      "subs": [
        "string",
        "hybrid",
        "monitor"
      ]
    },
    {
      "id": "auto",
      "n": [
        "ระบบควบคุมอัตโนมัติ",
        "Industrial Automation"
      ],
      "t": [
        "คุมสายการผลิต แม่นยำทุกรอบ",
        "Precise control on every cycle"
      ],
      "s": [
        "PLC · Servo · VFD · Sensor",
        "PLC · Servo · VFD · Sensors"
      ],
      "img": "A_series_PLC.jpg",
      "subs": [
        "plc",
        "drive",
        "sensor"
      ]
    },
    {
      "id": "inst",
      "n": [
        "เครื่องมือวัดและตรวจจับก๊าซ",
        "Instruments & Gas Detection"
      ],
      "t": [
        "วัดได้ ตรวจได้ มั่นใจได้",
        "Measure, inspect, trust"
      ],
      "s": [
        "พร้อมใบสอบเทียบ",
        "With calibration certificates"
      ],
      "img": "Flow_meter_(8622934876).jpg",
      "subs": [
        "meter",
        "gas"
      ]
    },
    {
      "id": "infra",
      "n": [
        "ศูนย์ข้อมูลและคลังสินค้า",
        "Data Center & Warehouse"
      ],
      "t": [
        "โครงสร้างพื้นฐานที่ไม่หยุดทำงาน",
        "Infrastructure that stays up"
      ],
      "s": [
        "UPS · แร็ค · Barcode · RFID",
        "UPS · Racks · Barcode · RFID"
      ],
      "img": "Racks_Amravati_Data_Center.jpg",
      "subs": [
        "ups",
        "rack",
        "wms"
      ]
    }
  ],
  "accounts": {
    "guest": {
      "id": "guest",
      "seg": "guest",
      "priceIdx": 0,
      "chip": [
        "ผู้เยี่ยมชม",
        "Guest"
      ],
      "name": [
        "ผู้เยี่ยมชม",
        "Guest visitor"
      ],
      "company": null,
      "code": null,
      "credit": null,
      "terms": 0,
      "po": false,
      "cheque": false,
      "quote": false
    },
    "walkin": {
      "id": "walkin",
      "seg": "walkin",
      "priceIdx": 0,
      "chip": [
        "ลูกค้าทั่วไป",
        "Walk-in"
      ],
      "name": [
        "คุณธนกร วิไลรัตน์",
        "Mr. Thanakorn Wilairat"
      ],
      "company": null,
      "code": "C-20455",
      "credit": null,
      "terms": 0,
      "po": false,
      "cheque": false,
      "quote": false,
      "phone": "081-234-5678",
      "email": "thanakorn.w@example.com",
      "ship": [
        "128/7 ซอยรามอินทรา 34 แขวงท่าแร้ง เขตบางเขน กรุงเทพมหานคร 10220",
        "128/7 Soi Ram Inthra 34, Tha Raeng, Bang Khen, Bangkok 10220"
      ],
      "addr": {
        "line": [
          "128/7 ซอยรามอินทรา 34",
          "128/7 Soi Ram Inthra 34"
        ],
        "prov": "กรุงเทพมหานคร",
        "dist": "บางเขน",
        "tam": "ท่าแร้ง",
        "zip": "10220"
      }
    },
    "bizNew": {
      "id": "bizNew",
      "seg": "bizNew",
      "priceIdx": 0,
      "chip": [
        "บริษัท · ชำระทันที",
        "Company · prepaid"
      ],
      "name": [
        "คุณปวีณา ศรีสุข",
        "Ms. Paweena Srisuk"
      ],
      "company": [
        "บริษัท นวกิจ เอ็นจิเนียริ่ง จำกัด",
        "Navakij Engineering Co., Ltd."
      ],
      "code": "C-20611",
      "taxId": "0105566012345",
      "branch": [
        "สำนักงานใหญ่",
        "Head office"
      ],
      "credit": null,
      "terms": 0,
      "po": false,
      "cheque": false,
      "quote": true,
      "approval": false,
      "phone": "02-118-4400",
      "email": "buyer@navakij.example",
      "addr": {
        "line": [
          "99/12 ถนนพหลโยธิน",
          "99/12 Phahonyothin Rd"
        ],
        "prov": "ปทุมธานี",
        "dist": "คลองหลวง",
        "tam": "คลองหนึ่ง",
        "zip": "12120"
      }
    },
    "partner": {
      "id": "partner",
      "seg": "partner",
      "priceIdx": 1,
      "chip": [
        "Partner",
        "Partner"
      ],
      "name": [
        "คุณศิริพร ชัยเจริญ",
        "Ms. Siriporn Chaicharoen"
      ],
      "company": [
        "บริษัท ไทยอินดัสเทรียล ซัพพลาย จำกัด",
        "Thai Industrial Supply Co., Ltd."
      ],
      "code": "C-10482",
      "taxId": "0105551234567",
      "credit": {
        "limit": 2000000,
        "used": 640000
      },
      "terms": 30,
      "po": false,
      "cheque": false,
      "quote": true,
      "phone": "02-555-1200",
      "email": "purchasing@thaiindustrial.example",
      "ship": [
        "45/2 หมู่ 4 ถนนบางนา-ตราด กม.23 ต.บางเสาธง อ.บางเสาธง จ.สมุทรปราการ 10570",
        "45/2 Moo 4, Bangna-Trad KM.23, Bang Sao Thong, Samut Prakan 10570"
      ],
      "addr": {
        "line": [
          "45/2 หมู่ 4 ถนนบางนา-ตราด กม.23",
          "45/2 Moo 4, Bangna-Trad KM.23"
        ],
        "prov": "สมุทรปราการ",
        "dist": "บางเสาธง",
        "tam": "บางเสาธง",
        "zip": "10570"
      }
    },
    "gradeA": {
      "id": "gradeA",
      "seg": "gradeA",
      "priceIdx": 2,
      "chip": [
        "Grade A",
        "Grade A"
      ],
      "name": [
        "คุณวีระชัย พงษ์สถิตย์",
        "Mr. Weerachai Pongsathit"
      ],
      "company": [
        "บริษัท สยามพรีซิชั่น แมนูแฟคเจอริ่ง จำกัด",
        "Siam Precision Manufacturing Co., Ltd."
      ],
      "code": "C-10011",
      "taxId": "0105539876543",
      "credit": {
        "limit": 60000000,
        "used": 18450000
      },
      "terms": 45,
      "po": true,
      "cheque": true,
      "quote": true,
      "approval": true,
      "phone": "038-210-4400",
      "email": "procurement@siamprecision.example",
      "ship": [
        "700/88 หมู่ 1 นิคมอุตสาหกรรมอมตะซิตี้ ต.คลองตำหรุ อ.เมืองชลบุรี จ.ชลบุรี 20000",
        "700/88 Moo 1, Amata City Industrial Estate, Khlong Tamru, Chonburi 20000"
      ],
      "addr": {
        "line": [
          "700/88 หมู่ 1 นิคมอุตสาหกรรมอมตะซิตี้",
          "700/88 Moo 1, Amata City Industrial Estate"
        ],
        "prov": "ชลบุรี",
        "dist": "เมืองชลบุรี",
        "tam": "คลองตำหรุ",
        "zip": "20000"
      }
    }
  },
  "carriers": [
    {
      "id": "c1",
      "name": "DHL Express",
      "logo": {
        "t": "DHL",
        "bg": "#FFCC00",
        "fg": "#D40511",
        "st": "italic"
      },
      "maxKg": 70,
      "speed": "next",
      "base": 980,
      "perKg": 6.2,
      "eta": [
        1,
        2
      ],
      "cover": [
        "ทั่วประเทศ",
        "Nationwide"
      ],
      "sur": [
        "ค่าพื้นที่ห่างไกล 250 บาท",
        "Remote area fee THB 250"
      ],
      "surCost": 250
    },
    {
      "id": "c2",
      "name": "Flash Express",
      "logo": {
        "t": "FLASH",
        "bg": "#FFE100",
        "fg": "#1E1A3A",
        "st": "normal"
      },
      "maxKg": 50,
      "speed": "next",
      "base": 620,
      "perKg": 4.2,
      "eta": [
        1,
        2
      ],
      "cover": [
        "ทั่วประเทศ",
        "Nationwide"
      ],
      "sur": [
        "ไม่มีค่าบริการเพิ่ม",
        "No surcharge"
      ],
      "surCost": 0
    },
    {
      "id": "c3",
      "name": "ไปรษณีย์ไทย (Thailand Post)",
      "nameEn": "Thailand Post",
      "logo": {
        "t": "ไปรษณีย์ไทย",
        "bg": "#E1251B",
        "fg": "#FFFFFF",
        "st": "normal",
        "sm": 1
      },
      "maxKg": 30,
      "speed": "std",
      "base": 540,
      "perKg": 3.4,
      "eta": [
        2,
        3
      ],
      "cover": [
        "ทั่วประเทศ ผ่านที่ทำการไปรษณีย์ทุกแห่ง",
        "Nationwide via all post offices"
      ],
      "sur": [
        "ไม่มีค่าบริการเพิ่ม",
        "No surcharge"
      ],
      "surCost": 0
    },
    {
      "id": "c4",
      "name": "KEX Express",
      "logo": {
        "t": "KEX",
        "bg": "#F37021",
        "fg": "#FFFFFF",
        "st": "normal"
      },
      "maxKg": 60,
      "speed": "std",
      "base": 600,
      "perKg": 3.8,
      "eta": [
        1,
        3
      ],
      "cover": [
        "ทั่วประเทศ",
        "Nationwide"
      ],
      "sur": [
        "ค่าพื้นที่ห่างไกล 180 บาท",
        "Remote area fee THB 180"
      ],
      "surCost": 180
    },
    {
      "id": "c5",
      "name": "จัดส่งโดย Polytechnology",
      "nameEn": "Polytechnology own delivery",
      "logo": {
        "t": "POLY",
        "bg": "#44359B",
        "fg": "#FFFFFF",
        "st": "normal"
      },
      "maxKg": 300,
      "speed": "own",
      "base": 1500,
      "perKg": 2.2,
      "eta": [
        1,
        2
      ],
      "cover": [
        "กรุงเทพฯ ปริมณฑล และภาคกลาง",
        "Bangkok, vicinity & central region"
      ],
      "sur": [
        "รวมทีมยกขึ้นอาคารแล้ว",
        "Building lift-up included"
      ],
      "surCost": 0
    }
  ],
  "coupons": {
    "PLTNEW300": {
      "off": 3000,
      "kind": "amount",
      "min": 0,
      "segs": [
        "walkin",
        "guest"
      ],
      "n": [
        "ส่วนลด 3,000 บาท สำหรับลูกค้าทั่วไป",
        "THB 3,000 off for retail customers"
      ],
      "ui": {
        "v": [
          "฿3,000",
          "฿3,000"
        ],
        "t": [
          "ส่วนลดลูกค้าทั่วไป",
          "Retail customer discount"
        ],
        "c": [
          "สำหรับลูกค้าทั่วไป (บุคคล)",
          "Retail customers only"
        ]
      }
    },
    "SAVE500": {
      "off": 500,
      "kind": "amount",
      "min": 10000,
      "segs": [
        "walkin",
        "bizNew",
        "partner",
        "gradeA"
      ],
      "n": [
        "ส่วนลด 500 บาท",
        "THB 500 off"
      ],
      "ui": {
        "v": [
          "฿500",
          "฿500"
        ],
        "t": [
          "ลดทันที 500 บาท",
          "THB 500 off your order"
        ],
        "c": [
          "ซื้อขั้นต่ำ ฿10,000 · ทุกกลุ่มลูกค้า",
          "Min. spend ฿10,000 · all members"
        ]
      }
    },
    "SAVE8": {
      "off": 8,
      "kind": "percent",
      "min": 50000,
      "segs": [
        "walkin",
        "bizNew",
        "partner",
        "gradeA"
      ],
      "n": [
        "ส่วนลด 8% ทั้งตะกร้า",
        "8% off your cart"
      ],
      "ui": {
        "v": [
          "8%",
          "8%"
        ],
        "t": [
          "ลด 8% ทั้งตะกร้า",
          "8% off your cart"
        ],
        "c": [
          "ซื้อขั้นต่ำ ฿50,000 · ทุกกลุ่มลูกค้า",
          "Min. spend ฿50,000 · all members"
        ]
      }
    },
    "PARTNER5": {
      "off": 5,
      "kind": "percent",
      "min": 0,
      "segs": [
        "partner"
      ],
      "n": [
        "ส่วนลดเพิ่ม 5% สำหรับลูกค้า Partner",
        "Extra 5% off for partners"
      ],
      "ui": {
        "v": [
          "5%",
          "5%"
        ],
        "t": [
          "ส่วนลดเพิ่มสำหรับ Partner",
          "Extra Partner discount"
        ],
        "c": [
          "เฉพาะลูกค้า Partner",
          "Partner customers only"
        ]
      }
    },
    "FREIGHT0": {
      "off": 0,
      "kind": "freight",
      "min": 0,
      "segs": [
        "walkin",
        "bizNew",
        "partner",
        "gradeA"
      ],
      "n": [
        "ส่วนลดค่าจัดส่งสูงสุด 800 บาท",
        "Freight discount up to THB 800"
      ],
      "ui": {
        "v": [
          "฿800",
          "฿800"
        ],
        "t": [
          "ลดค่าจัดส่ง",
          "Freight discount"
        ],
        "c": [
          "สูงสุด ฿800 · เมื่อเลือกจัดส่ง",
          "Up to ฿800 · delivery orders"
        ]
      }
    },
    "EV1500": {
      "off": 1500,
      "kind": "amount",
      "min": 25000,
      "segs": [
        "walkin",
        "bizNew",
        "partner",
        "gradeA"
      ],
      "n": [
        "ส่วนลด 1,500 บาท",
        "THB 1,500 off"
      ],
      "ui": {
        "v": [
          "฿1,500",
          "฿1,500"
        ],
        "t": [
          "ลด 1,500 บาท",
          "THB 1,500 off"
        ],
        "c": [
          "ซื้อขั้นต่ำ ฿25,000 · ทุกกลุ่มลูกค้า",
          "Min. spend ฿25,000 · all members"
        ]
      }
    },
    "SAVE3": {
      "off": 3,
      "kind": "percent",
      "min": 5000,
      "segs": [
        "walkin",
        "bizNew",
        "partner",
        "gradeA"
      ],
      "n": [
        "ส่วนลด 3%",
        "3% off"
      ],
      "ui": {
        "v": [
          "3%",
          "3%"
        ],
        "t": [
          "ลด 3% ทั้งตะกร้า",
          "3% off your cart"
        ],
        "c": [
          "ซื้อขั้นต่ำ ฿5,000 · ทุกกลุ่มลูกค้า",
          "Min. spend ฿5,000 · all members"
        ]
      }
    },
    "BIG12": {
      "off": 12,
      "kind": "percent",
      "min": 200000,
      "segs": [
        "bizNew",
        "partner",
        "gradeA"
      ],
      "n": [
        "ส่วนลด 12% สำหรับโครงการ",
        "12% off for projects"
      ],
      "ui": {
        "v": [
          "12%",
          "12%"
        ],
        "t": [
          "ลด 12% สำหรับโครงการ",
          "12% off for projects"
        ],
        "c": [
          "ซื้อขั้นต่ำ ฿200,000 · ลูกค้านิติบุคคล",
          "Min. spend ฿200,000 · business accounts"
        ]
      }
    }
  }
};
