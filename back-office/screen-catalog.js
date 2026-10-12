// Generated from explicit UI schemas and the approved 137-screen manifest.
window.BO_CATALOG = {
  "screens": [
    {
      "id": "01-dashboard/access-states",
      "module": "dashboard",
      "slug": "access-states",
      "title": [
        "สถานะการเข้าถึงรายงาน",
        "Report access states"
      ],
      "kind": "dashboard",
      "collection": "orders",
      "fields": [],
      "reference": "01-dashboard/access-states.png",
      "spec": "Single dashboard screenshot with primary state no accessible reports, clear heading ไม่มีรายงานที่เข้าถึงได้. Beside it a compact explanatory status card contrasting authorized scope with zero records: ยังไม่มีข้อมูลในช่วงเวลานี้. No edit/create dashboard action.",
      "create": false,
      "home": false
    },
    {
      "id": "01-dashboard/accounting",
      "module": "dashboard",
      "slug": "accounting",
      "title": [
        "ภาพรวมฝ่ายบัญชี",
        "Accounting overview"
      ],
      "kind": "dashboard",
      "collection": "orders",
      "fields": [],
      "reference": "01-dashboard/accounting.png",
      "spec": "Accounting scope; verified receipts vs order value, slip verification queue, due/overdue receivables, aging chart. Show assigned scope and no stock approval.",
      "create": false,
      "home": false
    },
    {
      "id": "01-dashboard/manager",
      "module": "dashboard",
      "slug": "manager",
      "title": [
        "ภาพรวมผู้จัดการ",
        "Manager overview"
      ],
      "kind": "dashboard",
      "collection": "orders",
      "fields": [],
      "reference": "01-dashboard/manager.png",
      "spec": "Read-only manager explicitly authorized for listed source/finance reports. Show four concise metrics: order value ฿2,480,000; verified receipts ฿1,725,000; expiring quotations5; preparation queue9. One trend chart for order value vs verified receipts, one scoped task table for quotes/preparation/bookings. Source stock state is a SMALL single ERP source status note ยังไม่เชื่อมระบบจริง, not a multi-source stock table. Do NOT invent independent website-owned stock, supplier-owned stock or assume ERP=SAP. No approval buttons.",
      "create": false,
      "home": true
    },
    {
      "id": "01-dashboard/sales",
      "module": "dashboard",
      "slug": "sales",
      "title": [
        "ภาพรวมฝ่ายขาย",
        "Sales overview"
      ],
      "kind": "dashboard",
      "collection": "orders",
      "fields": [],
      "reference": "01-dashboard/sales.png",
      "spec": "Assigned customers only; order value goods/services, RFQ conversion, expiring quotes, sourcing queues and owner/age. No received-money or other teams' financial totals.",
      "create": false,
      "home": false
    },
    {
      "id": "01-dashboard/service",
      "module": "dashboard",
      "slug": "service",
      "title": [
        "ภาพรวมทีมบริการ",
        "Service team overview"
      ],
      "kind": "dashboard",
      "collection": "orders",
      "fields": [],
      "reference": "01-dashboard/service.png",
      "spec": "Assigned leads, survey appointments, active jobs, testing/handover, milestones and due tasks. No whole-store totals.",
      "create": false,
      "home": false
    },
    {
      "id": "01-dashboard/warehouse",
      "module": "dashboard",
      "slug": "warehouse",
      "title": [
        "ภาพรวมคลังสินค้า",
        "Warehouse overview"
      ],
      "kind": "dashboard",
      "collection": "orders",
      "fields": [],
      "reference": "01-dashboard/warehouse.png",
      "spec": "Lam Luk Ka warehouse only; on-hand/reserved/available, low stock, packed/shipping/pickup/return queues. No financial widgets or approve-order action.",
      "create": false,
      "home": false
    },
    {
      "id": "02-catalog/list",
      "module": "catalog",
      "slug": "list",
      "title": [
        "สินค้าจาก ERP",
        "Catalog — List"
      ],
      "kind": "list",
      "collection": "products",
      "fields": [],
      "reference": "02-catalog/list.png",
      "spec": "ERP product list with external ID/SKU, name, brand, type, data completeness, source active state, web publication state and last sync. Search and essential filters. Action เพิ่มเนื้อหาเว็บไซต์ selects an existing ERP product. No create/duplicate ERP SKU or master-brand actions.",
      "create": false,
      "home": true
    },
    {
      "id": "02-catalog/brands",
      "module": "catalog",
      "slug": "brands",
      "title": [
        "แบรนด์จาก ERP",
        "ERP brands"
      ],
      "kind": "list",
      "collection": "brands",
      "fields": [],
      "reference": "02-catalog/brands.png",
      "spec": "Read-only source brands list logos/source codes/name/product reference count/source status/last sync. No add/edit/delete ERP brands. Show selected source brand summary and website products.",
      "create": false,
      "home": false
    },
    {
      "id": "02-catalog/create",
      "module": "catalog",
      "slug": "create",
      "title": [
        "เพิ่มเนื้อหาสินค้าบนเว็บไซต์",
        "Catalog — Create"
      ],
      "kind": "form",
      "collection": "webProducts",
      "fields": [
        {
          "key": "product",
          "label": [
            "สินค้าจาก ERP",
            "ERP product"
          ],
          "type": "select",
          "options": "@products",
          "required": true
        },
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "description",
          "label": [
            "รายละเอียดภาษาไทย",
            "Thai description"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "descriptionEn",
          "label": [
            "รายละเอียดภาษาอังกฤษ",
            "English description"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "alt",
          "label": [
            "คำอธิบายภาพภาษาไทย",
            "Thai image alt text"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "category",
          "label": [
            "หมวดธุรกิจบนเว็บไซต์",
            "Website business category"
          ],
          "type": "select",
          "options": [
            "green",
            "auto",
            "inst",
            "gas",
            "data",
            "warehouse"
          ],
          "required": true
        },
        {
          "key": "subgroup",
          "label": [
            "กลุ่มย่อย",
            "Subgroup"
          ],
          "type": "select",
          "options": [
            "epc",
            "accessory",
            "install",
            "cell"
          ],
          "required": false
        },
        {
          "key": "group",
          "label": [
            "กลุ่มการขาย",
            "Sales group"
          ],
          "type": "select",
          "options": [
            "ev",
            "solar",
            "battery",
            "inverter",
            "auto",
            "instgas",
            "infra"
          ],
          "required": true
        },
        {
          "key": "publication",
          "label": [
            "สถานะเผยแพร่",
            "Publication"
          ],
          "type": "select",
          "options": [
            "draft",
            "published",
            "hidden",
            "scheduled"
          ],
          "required": false
        }
      ],
      "reference": "02-catalog/create.png",
      "spec": "Blank website content form: select an existing ERP SKU, show compact read-only source summary, enter Thai website description then English via one language selector, upload photo/alt and choose web category/group. Save website draft, no create master product, no editable ERP weight/MOQ/price/brand.",
      "create": true,
      "home": false
    },
    {
      "id": "02-catalog/edit",
      "module": "catalog",
      "slug": "edit",
      "title": [
        "แก้ไขเนื้อหาสินค้าบนเว็บไซต์",
        "Catalog — Edit"
      ],
      "kind": "form",
      "collection": "webProducts",
      "fields": [
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "titleEn",
          "label": [
            "ชื่อเรื่องภาษาอังกฤษ",
            "English title"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "description",
          "label": [
            "รายละเอียดภาษาไทย",
            "Thai description"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "descriptionEn",
          "label": [
            "รายละเอียดภาษาอังกฤษ",
            "English description"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": true
        },
        {
          "key": "alt",
          "label": [
            "คำอธิบายภาพภาษาไทย",
            "Thai image alt text"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "altEn",
          "label": [
            "คำอธิบายภาพภาษาอังกฤษ",
            "English image alt text"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "category",
          "label": [
            "หมวดธุรกิจบนเว็บไซต์",
            "Website business category"
          ],
          "type": "select",
          "options": [
            "green",
            "auto",
            "inst",
            "gas",
            "data",
            "warehouse"
          ],
          "required": true
        },
        {
          "key": "subgroup",
          "label": [
            "กลุ่มย่อย",
            "Subgroup"
          ],
          "type": "select",
          "options": [
            "epc",
            "accessory",
            "install",
            "cell"
          ],
          "required": false
        },
        {
          "key": "group",
          "label": [
            "กลุ่มการขาย",
            "Sales group"
          ],
          "type": "select",
          "options": [
            "ev",
            "solar",
            "battery",
            "inverter",
            "auto",
            "instgas",
            "infra"
          ],
          "required": true
        },
        {
          "key": "publication",
          "label": [
            "สถานะเผยแพร่",
            "Publication"
          ],
          "type": "select",
          "options": [
            "draft",
            "published",
            "hidden",
            "scheduled"
          ],
          "required": true
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "02-catalog/edit.png",
      "spec": "Follow the approved vertical form flow. Source IN-00789 summary is a SHORT read-only list or collapsed section. Then website Thai title/description. Below: one full-width image upload/alt section. Below: web category dropdown alone. BELOW it: optional subgroup dropdown alone. BELOW it: sales group dropdown alone. Then publication selector and collapsed optional details. NEVER category and subgroup inputs beside one another. No raw ERP price, weight or SKU edits.",
      "create": false,
      "home": false
    },
    {
      "id": "02-catalog/erp-detail",
      "module": "catalog",
      "slug": "erp-detail",
      "title": [
        "รายละเอียดสินค้าจาก ERP",
        "ERP product details"
      ],
      "kind": "detail",
      "collection": "products",
      "fields": [],
      "reference": "02-catalog/erp-detail.png",
      "spec": "One-column read-only source product identity/SKU/brand/core specs/weight/MOQ and price refs, source active state/last sync/missing fields. Web content status link separate. No ERP edit.",
      "create": false,
      "home": false
    },
    {
      "id": "02-catalog/media",
      "module": "catalog",
      "slug": "media",
      "title": [
        "คลังสื่อ",
        "Media library"
      ],
      "kind": "media",
      "collection": "media",
      "fields": [],
      "reference": "02-catalog/media.png",
      "spec": "Image library grid; filters product/banner/service, upload, file size/dimensions, TH/EN alt completeness, usages, private business files excluded.",
      "create": false,
      "home": false
    },
    {
      "id": "02-catalog/media-edit",
      "module": "catalog",
      "slug": "media-edit",
      "title": [
        "แก้ไขข้อมูลสื่อ",
        "Edit media"
      ],
      "kind": "form",
      "collection": "media",
      "fields": [
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "alt",
          "label": [
            "คำอธิบายภาพภาษาไทย",
            "Thai image alt text"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "altEn",
          "label": [
            "คำอธิบายภาพภาษาอังกฤษ",
            "English image alt text"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "displayOrder",
          "label": [
            "ลำดับแสดง",
            "Display order"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "mediaType",
          "label": [
            "ประเภทสื่อ",
            "Media type"
          ],
          "type": "select",
          "options": [
            "product",
            "banner",
            "service"
          ],
          "required": true
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "02-catalog/media-edit.png",
      "spec": "Selected product image preview, TH/EN alt, display order, category, replacement upload/version, linked products and fallback-image metadata.",
      "create": false,
      "home": false
    },
    {
      "id": "02-catalog/media-upload",
      "module": "catalog",
      "slug": "media-upload",
      "title": [
        "เพิ่มสื่อ",
        "Upload media"
      ],
      "kind": "form",
      "collection": "media",
      "fields": [
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": true
        },
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "mediaType",
          "label": [
            "ประเภทสื่อ",
            "Media type"
          ],
          "type": "select",
          "options": [
            "product",
            "banner",
            "service"
          ],
          "required": true
        },
        {
          "key": "alt",
          "label": [
            "คำอธิบายภาพภาษาไทย",
            "Thai image alt text"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "altEn",
          "label": [
            "คำอธิบายภาพภาษาอังกฤษ",
            "English image alt text"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "displayOrder",
          "label": [
            "ลำดับแสดง",
            "Display order"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "02-catalog/media-upload.png",
      "spec": "Image upload area, media category, filename, dimensions/file size, TH/EN alt text, main/additional ordering, backup-image option, draft metadata.",
      "create": true,
      "home": false
    },
    {
      "id": "02-catalog/taxonomy",
      "module": "catalog",
      "slug": "taxonomy",
      "title": [
        "หมวดแสดงบนเว็บไซต์",
        "Website taxonomy"
      ],
      "kind": "list",
      "collection": "taxonomy",
      "fields": [],
      "reference": "02-catalog/taxonomy.png",
      "spec": "Website taxonomy distinct from ERP: six business categories and seven sales groups, subgroups epc/accessory/install/cell. Manage web presentation taxonomy and mapping, not ERP master.",
      "create": false,
      "home": false
    },
    {
      "id": "02-catalog/taxonomy-create",
      "module": "catalog",
      "slug": "taxonomy-create",
      "title": [
        "เพิ่มหมวดหรือกลุ่มสินค้า",
        "Create website taxonomy"
      ],
      "kind": "form",
      "collection": "taxonomy",
      "fields": [
        {
          "key": "dimension",
          "label": [
            "ประเภทหมวดเว็บ",
            "Taxonomy dimension"
          ],
          "type": "select",
          "options": [
            "category",
            "group",
            "subgroup"
          ],
          "required": true
        },
        {
          "key": "code",
          "label": [
            "รหัสอ้างอิง",
            "Reference code"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "nameEn",
          "label": [
            "ชื่อภาษาอังกฤษ",
            "English name"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "group",
          "label": [
            "กลุ่มการขาย",
            "Sales group"
          ],
          "type": "select",
          "options": [
            "ev",
            "solar",
            "battery",
            "inverter",
            "auto",
            "instgas",
            "infra"
          ],
          "required": false
        },
        {
          "key": "displayOrder",
          "label": [
            "ลำดับแสดง",
            "Display order"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "active",
          "label": [
            "เปิดใช้งาน",
            "Active"
          ],
          "type": "checkbox",
          "required": false
        }
      ],
      "reference": "02-catalog/taxonomy-create.png",
      "spec": "Blank modal on taxonomy page selecting dimension business category OR sales group OR subgroup, parent, code, TH/EN labels, display order, image, active flag. Keep dimensions separate.",
      "create": true,
      "home": false
    },
    {
      "id": "02-catalog/taxonomy-edit",
      "module": "catalog",
      "slug": "taxonomy-edit",
      "title": [
        "แก้ไขกลุ่มย่อย",
        "Edit subgroup"
      ],
      "kind": "form",
      "collection": "taxonomy",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "nameEn",
          "label": [
            "ชื่อภาษาอังกฤษ",
            "English name"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "group",
          "label": [
            "กลุ่มการขาย",
            "Sales group"
          ],
          "type": "select",
          "options": [
            "ev",
            "solar",
            "battery",
            "inverter",
            "auto",
            "instgas",
            "infra"
          ],
          "required": false
        },
        {
          "key": "displayOrder",
          "label": [
            "ลำดับแสดง",
            "Display order"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "active",
          "label": [
            "เปิดใช้งาน",
            "Active"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "02-catalog/taxonomy-edit.png",
      "spec": "Populated subgroup accessory editor, TH/EN label, parent group, order, publish status, linked product count. Archive rather than delete referenced master.",
      "create": false,
      "home": false
    },
    {
      "id": "03-pricing/list",
      "module": "pricing",
      "slug": "list",
      "title": [
        "ราคาจาก ERP และการจับคู่สิทธิ์",
        "Pricing — List"
      ],
      "kind": "list",
      "collection": "prices",
      "fields": [],
      "reference": "03-pricing/list.png",
      "spec": "Read-only ERP price-list view Retail/Partner/Grade A mapping, effective dates/source sync state and SKU price. No editing/importing ERP price values or master-price approval. Edit mapping action only.",
      "create": false,
      "home": true
    },
    {
      "id": "03-pricing/approval",
      "module": "pricing",
      "slug": "approval",
      "title": [
        "พิจารณาส่วนลดใบเสนอราคา",
        "Quotation discount review"
      ],
      "kind": "decision",
      "collection": "discountRequests",
      "fields": [
        {
          "key": "quote",
          "label": [
            "ใบเสนอราคา / ฉบับอ้างอิง",
            "Quotation / revision"
          ],
          "type": "select",
          "options": "@quotes",
          "required": true
        },
        {
          "key": "discount",
          "label": [
            "ส่วนลด (%)",
            "Discount (%)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "decision",
          "label": [
            "ผลพิจารณา",
            "Decision"
          ],
          "type": "select",
          "options": [
            "approved",
            "rejected"
          ],
          "required": true
        }
      ],
      "reference": "03-pricing/approval.png",
      "spec": "Quote-specific discount approval request, proposer distinct approver, source base-price read-only, proposed discount and reason, Before/After vertically stacked, authorized approve/reject with reason; no changing ERP master.",
      "create": false,
      "home": false
    },
    {
      "id": "03-pricing/create",
      "module": "pricing",
      "slug": "create",
      "title": [
        "เพิ่มการจับคู่รายการราคา",
        "Pricing — Create"
      ],
      "kind": "form",
      "collection": "priceMappings",
      "fields": [
        {
          "key": "sourceCode",
          "label": [
            "รหัสต้นทาง",
            "Source code"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "priceTier",
          "label": [
            "สิทธิ์รายการราคา",
            "Price tier"
          ],
          "type": "select",
          "options": [
            "Retail",
            "Partner",
            "Grade A"
          ],
          "required": true
        },
        {
          "key": "dataScope",
          "label": [
            "ขอบเขตข้อมูล",
            "Data scope"
          ],
          "type": "select",
          "options": [
            "assigned",
            "warehouse",
            "all"
          ],
          "required": false
        },
        {
          "key": "effectiveDate",
          "label": [
            "วันที่มีผล",
            "Effective date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "03-pricing/create.png",
      "spec": "Blank mapping form select existing ERP price-list code then website price tier Retail/Partner/Grade A, scope/effective date/reason. Price values read-only preview, no master price creation. Unknown availability indicated as mock proposal.",
      "create": true,
      "home": false
    },
    {
      "id": "03-pricing/edit",
      "module": "pricing",
      "slug": "edit",
      "title": [
        "แก้ไขการจับคู่รายการราคา",
        "Pricing — Edit"
      ],
      "kind": "form",
      "collection": "priceMappings",
      "fields": [
        {
          "key": "sourceCode",
          "label": [
            "รหัสต้นทาง",
            "Source code"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "priceTier",
          "label": [
            "สิทธิ์รายการราคา",
            "Price tier"
          ],
          "type": "select",
          "options": [
            "Retail",
            "Partner",
            "Grade A"
          ],
          "required": true
        },
        {
          "key": "dataScope",
          "label": [
            "ขอบเขตข้อมูล",
            "Data scope"
          ],
          "type": "select",
          "options": [
            "assigned",
            "warehouse",
            "all"
          ],
          "required": false
        },
        {
          "key": "effectiveDate",
          "label": [
            "วันที่มีผล",
            "Effective date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "03-pricing/edit.png",
      "spec": "Populated ERP list-code to Partner web tier mapping, effective date and reason, brief read-only prices preview, save mapping. No changing actual ERP price amounts. Prior transaction snapshots retained.",
      "create": false,
      "home": false
    },
    {
      "id": "03-pricing/import",
      "module": "pricing",
      "slug": "import",
      "title": [
        "สถานะอัปเดตราคาจาก ERP",
        "ERP price sync status"
      ],
      "kind": "list",
      "collection": "syncErrors",
      "fields": [],
      "reference": "03-pricing/import.png",
      "spec": "Read-only sync-error page with source price-list code/time/missing-price/null-vs-zero/effective-date/mapping issues and upstream owner. No CSV master-price import or manual price overrides.",
      "create": false,
      "home": false
    },
    {
      "id": "03-pricing/preview",
      "module": "pricing",
      "slug": "preview",
      "title": [
        "ตัวอย่างราคาแต่ละกลุ่ม",
        "Pricing — Preview"
      ],
      "kind": "preview",
      "collection": "products",
      "fields": [],
      "reference": "03-pricing/preview.png",
      "spec": "Storefront-like embedded product preview selector Retail/Partner/Grade A and TH/EN, price and CTA type, effective dates and price history list.",
      "create": false,
      "home": false
    },
    {
      "id": "04-inventory/list",
      "module": "inventory",
      "slug": "list",
      "title": [
        "สต็อกจากระบบคลัง",
        "Inventory — List"
      ],
      "kind": "list",
      "collection": "stock",
      "fields": [],
      "reference": "04-inventory/list.png",
      "spec": "Lam Luk Ka warehouse source read-only on-hand/reserved/available, SKU/type filters, low stock, source update time mock and sync state; no receive or stock adjustment buttons.",
      "create": false,
      "home": true
    },
    {
      "id": "04-inventory/ledger",
      "module": "inventory",
      "slug": "ledger",
      "title": [
        "ประวัติคลังจากระบบต้นทาง",
        "Source warehouse history"
      ],
      "kind": "list",
      "collection": "stockMovements",
      "fields": [],
      "reference": "04-inventory/ledger.png",
      "spec": "Read-only source movement/reservation references linked to ERP/order lines, source quantity/date/actor when provided; unknown source data explicitly unavailable. No locally editable stock ledger.",
      "create": false,
      "home": false
    },
    {
      "id": "04-inventory/return-receipt",
      "module": "inventory",
      "slug": "return-receipt",
      "title": [
        "ติดตามผลตรวจรับคืนจากคลัง",
        "Source return inspection"
      ],
      "kind": "detail",
      "collection": "sourceReturns",
      "fields": [],
      "reference": "04-inventory/return-receipt.png",
      "spec": "Read-only source return-inspection outcome/evidence/reference with requested/received/accepted quantity and source timestamps. Refund state separate; no manual website stock adjustment.",
      "create": false,
      "home": false
    },
    {
      "id": "04-inventory/sourcing",
      "module": "inventory",
      "slug": "sourcing",
      "title": [
        "คิวจัดหาสินค้า",
        "Sourcing queue"
      ],
      "kind": "list",
      "collection": "sourcing",
      "fields": [],
      "reference": "04-inventory/sourcing.png",
      "spec": "Shortage table order/SKU/missing quantity/owner/promise date/customer response, scope filters and open task.",
      "create": false,
      "home": false
    },
    {
      "id": "04-inventory/sourcing-create",
      "module": "inventory",
      "slug": "sourcing-create",
      "title": [
        "สร้างงานจัดหา",
        "Create sourcing task"
      ],
      "kind": "form",
      "collection": "sourcing",
      "fields": [
        {
          "key": "order",
          "label": [
            "คำสั่งซื้อ",
            "Order"
          ],
          "type": "select",
          "options": "@orders",
          "required": true
        },
        {
          "key": "product",
          "label": [
            "สินค้าจาก ERP",
            "ERP product"
          ],
          "type": "select",
          "options": "@products",
          "required": true
        },
        {
          "key": "shortage",
          "label": [
            "จำนวนที่ขาด",
            "Shortage quantity"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "owner",
          "label": [
            "ผู้รับผิดชอบ",
            "Assignee"
          ],
          "type": "select",
          "options": "@staff",
          "required": true
        },
        {
          "key": "readyDate",
          "label": [
            "วันที่พร้อมจัดเตรียม",
            "Preparation ready date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "message",
          "label": [
            "ข้อความภาษาไทย",
            "Thai message"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "04-inventory/sourcing-create.png",
      "spec": "Blank sourcing request tied to order line, shortage qty, salesperson, lead time/promise date, supplier note and customer confirmation message; no auto approved order.",
      "create": true,
      "home": false
    },
    {
      "id": "04-inventory/sourcing-edit",
      "module": "inventory",
      "slug": "sourcing-edit",
      "title": [
        "แก้ไขงานจัดหา",
        "Edit sourcing task"
      ],
      "kind": "form",
      "collection": "sourcing",
      "fields": [
        {
          "key": "shortage",
          "label": [
            "จำนวนที่ขาด",
            "Shortage quantity"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "owner",
          "label": [
            "ผู้รับผิดชอบ",
            "Assignee"
          ],
          "type": "select",
          "options": "@staff",
          "required": true
        },
        {
          "key": "readyDate",
          "label": [
            "วันที่พร้อมจัดเตรียม",
            "Preparation ready date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "message",
          "label": [
            "ข้อความภาษาไทย",
            "Thai message"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "04-inventory/sourcing-edit.png",
      "spec": "Populated task with missing quantity, owner, proposed ready date and revised customer message, confirmation history; specific send proposed date mock action.",
      "create": false,
      "home": false
    },
    {
      "id": "05-customers/list",
      "module": "customers",
      "slug": "list",
      "title": [
        "ลูกค้าและบริษัท",
        "Customers — List"
      ],
      "kind": "list",
      "collection": "customers",
      "fields": [],
      "reference": "05-customers/list.png",
      "spec": "Individual/company list, name/contact/tax ID/branch, segment, price entitlement, SAP code mock, review statuses independently, search/filter.",
      "create": false,
      "home": true
    },
    {
      "id": "05-customers/address-create",
      "module": "customers",
      "slug": "address-create",
      "title": [
        "เพิ่มที่อยู่ลูกค้า",
        "Create customer address"
      ],
      "kind": "form",
      "collection": "addresses",
      "fields": [
        {
          "key": "customer",
          "label": [
            "ลูกค้า / บริษัท",
            "Customer / company"
          ],
          "type": "select",
          "options": "@customers",
          "required": true
        },
        {
          "key": "addressType",
          "label": [
            "ประเภทที่อยู่",
            "Address type"
          ],
          "type": "select",
          "options": [
            "shipping",
            "tax"
          ],
          "required": true
        },
        {
          "key": "recipient",
          "label": [
            "ผู้รับ / ผู้ติดต่อ",
            "Recipient / contact"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "phone",
          "label": [
            "โทรศัพท์",
            "Phone"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "address",
          "label": [
            "ที่อยู่",
            "Address"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "province",
          "label": [
            "จังหวัด",
            "Province"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "district",
          "label": [
            "อำเภอ / เขต",
            "District"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "subdistrict",
          "label": [
            "ตำบล / แขวง",
            "Subdistrict"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "postcode",
          "label": [
            "รหัสไปรษณีย์",
            "Postcode"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "latitude",
          "label": [
            "ละติจูด",
            "Latitude"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "longitude",
          "label": [
            "ลองจิจูด",
            "Longitude"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "isDefault",
          "label": [
            "ที่อยู่หลัก",
            "Default address"
          ],
          "type": "checkbox",
          "required": false
        }
      ],
      "reference": "05-customers/address-create.png",
      "spec": "Blank shipping/tax address modal, recipient, province/district/subdistrict/postcode, map pin, default shipping/tax settings; no snapshot overwrite.",
      "create": true,
      "home": false
    },
    {
      "id": "05-customers/address-edit",
      "module": "customers",
      "slug": "address-edit",
      "title": [
        "แก้ไขที่อยู่ลูกค้า",
        "Edit customer address"
      ],
      "kind": "form",
      "collection": "addresses",
      "fields": [
        {
          "key": "recipient",
          "label": [
            "ผู้รับ / ผู้ติดต่อ",
            "Recipient / contact"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "phone",
          "label": [
            "โทรศัพท์",
            "Phone"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "address",
          "label": [
            "ที่อยู่",
            "Address"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "province",
          "label": [
            "จังหวัด",
            "Province"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "district",
          "label": [
            "อำเภอ / เขต",
            "District"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "subdistrict",
          "label": [
            "ตำบล / แขวง",
            "Subdistrict"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "postcode",
          "label": [
            "รหัสไปรษณีย์",
            "Postcode"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "latitude",
          "label": [
            "ละติจูด",
            "Latitude"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "longitude",
          "label": [
            "ลองจิจูด",
            "Longitude"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "isDefault",
          "label": [
            "ที่อยู่หลัก",
            "Default address"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "05-customers/address-edit.png",
      "spec": "Populated address and map coordinates; collapsed address list above the active form; edit defaults, note issued documents/orders retain snapshot.",
      "create": false,
      "home": false
    },
    {
      "id": "05-customers/create",
      "module": "customers",
      "slug": "create",
      "title": [
        "เพิ่มข้อมูลลูกค้า",
        "Customers — Create"
      ],
      "kind": "form",
      "collection": "customers",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "email",
          "label": [
            "อีเมล",
            "Email"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "phone",
          "label": [
            "โทรศัพท์",
            "Phone"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "businessType",
          "label": [
            "ประเภทธุรกิจ",
            "Business type"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "taxId",
          "label": [
            "เลขประจำตัวผู้เสียภาษี",
            "Tax ID"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "branch",
          "label": [
            "สาขา",
            "Branch"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "customerCode",
          "label": [
            "รหัสลูกค้า SAP (จำลอง)",
            "SAP customer code (mock)"
          ],
          "type": "text",
          "required": false
        }
      ],
      "reference": "05-customers/create.png",
      "spec": "Blank personal/company master form with contact/email/phone/tax ID/branch/business type, mock SAP customer code. New company retail/prepaid; no automatic credit.",
      "create": true,
      "home": false
    },
    {
      "id": "05-customers/credit-decision",
      "module": "customers",
      "slug": "credit-decision",
      "title": [
        "พิจารณาสิทธิ์และวงเงินรายบริษัท",
        "Company price and credit decision"
      ],
      "kind": "decision",
      "collection": "applications",
      "fields": [
        {
          "key": "customer",
          "label": [
            "ลูกค้า / บริษัท",
            "Customer / company"
          ],
          "type": "select",
          "options": "@customers",
          "required": true
        },
        {
          "key": "segment",
          "label": [
            "กลุ่มลูกค้า",
            "Customer segment"
          ],
          "type": "select",
          "options": [
            "Retail",
            "Partner",
            "Grade A"
          ],
          "required": true
        },
        {
          "key": "priceTier",
          "label": [
            "สิทธิ์รายการราคา",
            "Price tier"
          ],
          "type": "select",
          "options": [
            "Retail",
            "Partner",
            "Grade A"
          ],
          "required": true
        },
        {
          "key": "priceDecision",
          "label": [
            "ผลอนุมัติรายการราคา",
            "Price entitlement decision"
          ],
          "type": "select",
          "options": [
            "approved",
            "rejected"
          ],
          "required": true
        },
        {
          "key": "paymentMethod",
          "label": [
            "วิธีชำระ",
            "Payment method"
          ],
          "type": "select",
          "options": [
            "QR",
            "transfer",
            "credit",
            "cheque"
          ],
          "required": true
        },
        {
          "key": "creditLimit",
          "label": [
            "วงเงินเครดิต (บาท)",
            "Credit limit (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "termDays",
          "label": [
            "จำนวนวันเครดิต",
            "Credit term (days)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "creditDecision",
          "label": [
            "ผลอนุมัติเครดิต",
            "Credit decision"
          ],
          "type": "select",
          "options": [
            "approved",
            "rejected"
          ],
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "05-customers/credit-decision.png",
      "spec": "Company review workspace with separate price approval and credit decision cards, segment, price list, allowed QR/transfer/credit/cheque, amount and term days per company, reviewer reason, applicant vs approver history.",
      "create": false,
      "home": false
    },
    {
      "id": "05-customers/detail",
      "module": "customers",
      "slug": "detail",
      "title": [
        "รายละเอียดบริษัทลูกค้า",
        "Customers — Details"
      ],
      "kind": "detail",
      "collection": "customers",
      "fields": [],
      "reference": "05-customers/detail.png",
      "spec": "Company profile plus tabs orders/quotes/leads/documents/credit/addresses, segment separately from actual price list/payment capabilities/credit amount/term days. Example Partner with custom term days.",
      "create": false,
      "home": false
    },
    {
      "id": "05-customers/edit",
      "module": "customers",
      "slug": "edit",
      "title": [
        "แก้ไขข้อมูลลูกค้า",
        "Customers — Edit"
      ],
      "kind": "form",
      "collection": "customers",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "email",
          "label": [
            "อีเมล",
            "Email"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "phone",
          "label": [
            "โทรศัพท์",
            "Phone"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "businessType",
          "label": [
            "ประเภทธุรกิจ",
            "Business type"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "taxId",
          "label": [
            "เลขประจำตัวผู้เสียภาษี",
            "Tax ID"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "branch",
          "label": [
            "สาขา",
            "Branch"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "customerCode",
          "label": [
            "รหัสลูกค้า SAP (จำลอง)",
            "SAP customer code (mock)"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "05-customers/edit.png",
      "spec": "Populated company fields, multiple contacts, business type, SAP code mock, customer-profile history; do not change historical order address snapshots. Password reset link no password visibility.",
      "create": false,
      "home": false
    },
    {
      "id": "05-customers/guest-link",
      "module": "customers",
      "slug": "guest-link",
      "title": [
        "ผูกผู้ติดต่อคำปรึกษากับบัญชี",
        "Link guest contact"
      ],
      "kind": "form",
      "collection": "guestLinks",
      "fields": [
        {
          "key": "lead",
          "label": [
            "คำขอบริการ",
            "Service inquiry"
          ],
          "type": "select",
          "options": "@leads",
          "required": true
        },
        {
          "key": "customer",
          "label": [
            "ลูกค้า / บริษัท",
            "Customer / company"
          ],
          "type": "select",
          "options": "@customers",
          "required": true
        },
        {
          "key": "evidence",
          "label": [
            "หลักฐาน / ผลการตรวจ",
            "Evidence / inspection outcome"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "05-customers/guest-link.png",
      "spec": "Guest identity detail with source lead and unique contact, account search, ownership verification evidence, link preview; no merging all guest leads.",
      "create": false,
      "home": false
    },
    {
      "id": "05-customers/review",
      "module": "customers",
      "slug": "review",
      "title": [
        "คำขอราคาพิเศษและเครดิต",
        "Review requests"
      ],
      "kind": "list",
      "collection": "applications",
      "fields": [],
      "reference": "05-customers/review.png",
      "spec": "Independent application queues and outcomes, evidence attachments, requested price list vs credit terms, owner and age; company can prepaid during review.",
      "create": false,
      "home": false
    },
    {
      "id": "06-orders/list",
      "module": "orders",
      "slug": "list",
      "title": [
        "คำสั่งซื้อสินค้า",
        "Orders — List"
      ],
      "kind": "list",
      "collection": "orders",
      "fields": [],
      "reference": "06-orders/list.png",
      "spec": "Search order/customer/SKU/PO/invoice/tracking; date filters; separate payment/fulfillment/hold columns; source quote revision; no new manual order flow.",
      "create": false,
      "home": true
    },
    {
      "id": "06-orders/amendment",
      "module": "orders",
      "slug": "amendment",
      "title": [
        "ขอแก้ไขคำสั่งซื้อ",
        "Order amendment request"
      ],
      "kind": "form",
      "collection": "amendments",
      "fields": [
        {
          "key": "order",
          "label": [
            "คำสั่งซื้อ",
            "Order"
          ],
          "type": "select",
          "options": "@orders",
          "required": true
        },
        {
          "key": "change",
          "label": [
            "รายการที่เสนอแก้ไข",
            "Proposed changes"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "owner",
          "label": [
            "ผู้รับผิดชอบ",
            "Assignee"
          ],
          "type": "select",
          "options": "@staff",
          "required": true
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        }
      ],
      "reference": "06-orders/amendment.png",
      "spec": "Confirmed order read-only snapshot with formal amendment request form, reason, proposed change, differences, reviewer and notification. No silent direct price/line editing.",
      "create": false,
      "home": false
    },
    {
      "id": "06-orders/cancellation",
      "module": "orders",
      "slug": "cancellation",
      "title": [
        "คำขอยกเลิก",
        "Cancellation request"
      ],
      "kind": "decision",
      "collection": "cancellations",
      "fields": [
        {
          "key": "order",
          "label": [
            "คำสั่งซื้อ",
            "Order"
          ],
          "type": "select",
          "options": "@orders",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "evidence",
          "label": [
            "หลักฐาน / ผลการตรวจ",
            "Evidence / inspection outcome"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "decision",
          "label": [
            "ผลพิจารณา",
            "Decision"
          ],
          "type": "select",
          "options": [
            "approved",
            "rejected"
          ],
          "required": true
        }
      ],
      "reference": "06-orders/cancellation.png",
      "spec": "Request detail reason/evidence, cancellation eligibility, stock reservation/credit release previews, payment/refund separate, actor confirmation.",
      "create": false,
      "home": false
    },
    {
      "id": "06-orders/detail",
      "module": "orders",
      "slug": "detail",
      "title": [
        "รายละเอียดคำสั่งซื้อ",
        "Orders — Details"
      ],
      "kind": "detail",
      "collection": "orders",
      "fields": [],
      "reference": "06-orders/detail.png",
      "spec": "Buyer/address snapshot, products/prices/discount/add-ons/weight/shipping, PO attachment and quote revision, VAT7 sample total; separate statuses and real event timeline.",
      "create": false,
      "home": false
    },
    {
      "id": "06-orders/fulfillment",
      "module": "orders",
      "slug": "fulfillment",
      "title": [
        "จัดเตรียมและแพ็กสินค้า",
        "Prepare and pack goods"
      ],
      "kind": "form",
      "collection": "orders",
      "fields": [
        {
          "key": "owner",
          "label": [
            "ผู้รับผิดชอบ",
            "Assignee"
          ],
          "type": "select",
          "options": "@staff",
          "required": true
        },
        {
          "key": "readyDate",
          "label": [
            "วันที่พร้อมจัดเตรียม",
            "Preparation ready date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "checklist",
          "label": [
            "รายการตรวจสอบ",
            "Checklist"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "weight",
          "label": [
            "น้ำหนัก (กก.)",
            "Weight (kg)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "carrier",
          "label": [
            "ผู้ขนส่ง",
            "Carrier"
          ],
          "type": "select",
          "options": "@carriers",
          "required": false
        },
        {
          "key": "tracking",
          "label": [
            "หมายเลขติดตาม",
            "Tracking number"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "dispatchDate",
          "label": [
            "วันที่จัดส่ง",
            "Dispatch date"
          ],
          "type": "date",
          "required": false
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "06-orders/fulfillment.png",
      "spec": "Single-column Store packing task approved for warehouse workflow with blocking holds resolved: source order/SKU/quantity, picking checklist, owner, expected prepared date 1-2business-day estimate, packaging/weight, mark prepared/packed and link delivery booking. No direct ERP stock edits; warehouse queue approval separate from finance.",
      "create": false,
      "home": false
    },
    {
      "id": "06-orders/holds",
      "module": "orders",
      "slug": "holds",
      "title": [
        "Hold และเจ้าของงาน",
        "Holds and owners"
      ],
      "kind": "holds",
      "collection": "orders",
      "fields": [],
      "reference": "06-orders/holds.png",
      "spec": "Full panel showing approval/seller/credit/payment/verify simultaneously; owner, release requirement, evidence, timestamps. Each action reserved for matching role, no bypass.",
      "create": false,
      "home": false
    },
    {
      "id": "06-orders/returns",
      "module": "orders",
      "slug": "returns",
      "title": [
        "คืนสินค้าและขอคืนเงิน",
        "Return and refund request"
      ],
      "kind": "form",
      "collection": "returns",
      "fields": [
        {
          "key": "order",
          "label": [
            "คำสั่งซื้อ",
            "Order"
          ],
          "type": "select",
          "options": "@orders",
          "required": true
        },
        {
          "key": "product",
          "label": [
            "สินค้าจาก ERP",
            "ERP product"
          ],
          "type": "select",
          "options": "@products",
          "required": true
        },
        {
          "key": "qty",
          "label": [
            "จำนวน",
            "Quantity"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "evidence",
          "label": [
            "หลักฐาน / ผลการตรวจ",
            "Evidence / inspection outcome"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "06-orders/returns.png",
      "spec": "Line-level return requested quantity/reason/evidence/inspection state and separate refund request status, partial quantities, linked inventory/accounting tasks.",
      "create": false,
      "home": false
    },
    {
      "id": "06-orders/warehouse-approve",
      "module": "orders",
      "slug": "warehouse-approve",
      "title": [
        "รับงานคลังเข้าคิว",
        "Accept warehouse work"
      ],
      "kind": "decision",
      "collection": "orders",
      "fields": [
        {
          "key": "order",
          "label": [
            "คำสั่งซื้อ",
            "Order"
          ],
          "type": "select",
          "options": "@orders",
          "required": true
        },
        {
          "key": "owner",
          "label": [
            "ผู้รับผิดชอบ",
            "Assignee"
          ],
          "type": "select",
          "options": "@staff",
          "required": true
        },
        {
          "key": "readyDate",
          "label": [
            "วันที่พร้อมจัดเตรียม",
            "Preparation ready date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "06-orders/warehouse-approve.png",
      "spec": "Focused single-column selected order warehouse acceptance form, source stock readiness, blocking holds, queue position/assignee/planned preparation date and reason. Primary รับงานเข้าคิว if policy allows, disabled when necessary holds block. Proposed approval meaning requires confirmation; no finance/credit bypass.",
      "create": false,
      "home": false
    },
    {
      "id": "06-orders/warehouse-queue",
      "module": "orders",
      "slug": "warehouse-queue",
      "title": [
        "คิวจัดเตรียมสินค้า",
        "Preparation queue"
      ],
      "kind": "list",
      "collection": "orders",
      "fields": [],
      "reference": "06-orders/warehouse-queue.png",
      "spec": "Store work queue incoming/awaiting warehouse acceptance/preparing/ready columns in ONE table, assigned owner/age/hold/promise prep date/booking round. Receive into queue is warehouse work action subject to holds, not financial approval.",
      "create": false,
      "home": false
    },
    {
      "id": "07-quotes/list",
      "module": "quotes",
      "slug": "list",
      "title": [
        "RFQ และใบเสนอราคา",
        "Quotations — List"
      ],
      "kind": "list",
      "collection": "quotes",
      "fields": [],
      "reference": "07-quotes/list.png",
      "spec": "Tabs instant/RFQ/service; statuses submitted/review/revision/ready/accepted/ordered/rejected/expired; owner/expiry/revision/email mock columns.",
      "create": false,
      "home": true
    },
    {
      "id": "07-quotes/create",
      "module": "quotes",
      "slug": "create",
      "title": [
        "เตรียมข้อมูลใบเสนอราคา SAP",
        "Quotations — Create"
      ],
      "kind": "form",
      "collection": "quoteDrafts",
      "fields": [
        {
          "key": "customer",
          "label": [
            "ลูกค้า / บริษัท",
            "Customer / company"
          ],
          "type": "select",
          "options": "@customers",
          "required": true
        },
        {
          "key": "reference",
          "label": [
            "เลขอ้างอิง",
            "Reference"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "product",
          "label": [
            "สินค้าจาก ERP",
            "ERP product"
          ],
          "type": "select",
          "options": "@products",
          "required": true
        },
        {
          "key": "qty",
          "label": [
            "จำนวน",
            "Quantity"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "scope",
          "label": [
            "ขอบเขตงาน",
            "Scope of work"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "terms",
          "label": [
            "เงื่อนไข",
            "Terms"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "endDate",
          "label": [
            "วันสิ้นสุด",
            "End date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "email",
          "label": [
            "อีเมล",
            "Email"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "labor",
          "label": [
            "ค่าแรงและขอบเขตงาน",
            "Labor and scope"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "07-quotes/create.png",
      "spec": "Blank draft request from RFQ to prepare SAP quotation: customer/source refs, essential product line table, scope/terms/expiry and recipient email if allowed. Labor/freight/survey credit collapsed unless applicable. Save request draft, SAP output mock not actual issued locally; no actual email claim.",
      "create": true,
      "home": false
    },
    {
      "id": "07-quotes/detail",
      "module": "quotes",
      "slug": "detail",
      "title": [
        "รายละเอียดฉบับใบเสนอราคา",
        "Quotations — Details"
      ],
      "kind": "detail",
      "collection": "quotes",
      "fields": [],
      "reference": "07-quotes/detail.png",
      "spec": "Issued R1/R2 selector, read-only snapshot/PDF, proposer/approver/date, customer response and linked order once; availability/expiry/accepted-revision recheck before ordering, no acceptance auto-order.",
      "create": false,
      "home": false
    },
    {
      "id": "07-quotes/edit",
      "module": "quotes",
      "slug": "edit",
      "title": [
        "แก้ไขร่างคำขอใบเสนอราคา SAP",
        "Quotations — Edit"
      ],
      "kind": "form",
      "collection": "quoteDrafts",
      "fields": [
        {
          "key": "customer",
          "label": [
            "ลูกค้า / บริษัท",
            "Customer / company"
          ],
          "type": "select",
          "options": "@customers",
          "required": true
        },
        {
          "key": "reference",
          "label": [
            "เลขอ้างอิง",
            "Reference"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "product",
          "label": [
            "สินค้าจาก ERP",
            "ERP product"
          ],
          "type": "select",
          "options": "@products",
          "required": true
        },
        {
          "key": "qty",
          "label": [
            "จำนวน",
            "Quantity"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "scope",
          "label": [
            "ขอบเขตงาน",
            "Scope of work"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "terms",
          "label": [
            "เงื่อนไข",
            "Terms"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "endDate",
          "label": [
            "วันสิ้นสุด",
            "End date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "email",
          "label": [
            "อีเมล",
            "Email"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "07-quotes/edit.png",
      "spec": "Populated draft request to SAP with editable pre-issue scope/lines/terms and mandatory revision reference. Source ERP prices visible read-only except permitted quote-specific discount request. Single-column subtotal then tax7sample then total below line table. Save draft, final issuance owned by SAP integration; issued source revisions locked.",
      "create": false,
      "home": false
    },
    {
      "id": "07-quotes/revision",
      "module": "quotes",
      "slug": "revision",
      "title": [
        "ขอแก้ไขฉบับใบเสนอราคา",
        "Request quotation revision"
      ],
      "kind": "form",
      "collection": "quoteRevisions",
      "fields": [
        {
          "key": "quote",
          "label": [
            "ใบเสนอราคา / ฉบับอ้างอิง",
            "Quotation / revision"
          ],
          "type": "select",
          "options": "@quotes",
          "required": true
        },
        {
          "key": "change",
          "label": [
            "รายการที่เสนอแก้ไข",
            "Proposed changes"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "endDate",
          "label": [
            "วันสิ้นสุด",
            "End date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "email",
          "label": [
            "อีเมล",
            "Email"
          ],
          "type": "text",
          "required": false
        }
      ],
      "reference": "07-quotes/revision.png",
      "spec": "Immutable source SAP R1 summary above proposed R2 request, changed fields/reason/expiry/recipient as allowed. Before and After stacked vertically, new acceptance required, mock SAP response not actual final generated PDF.",
      "create": false,
      "home": false
    },
    {
      "id": "07-quotes/rfq",
      "module": "quotes",
      "slug": "rfq",
      "title": [
        "รายละเอียดคำขอราคา",
        "RFQ details"
      ],
      "kind": "detail",
      "collection": "rfqs",
      "fields": [],
      "reference": "07-quotes/rfq.png",
      "spec": "RFQ lines/qty/wanted date/delivery-pickup/location/PO/spec files/note/source lead, assigned salesperson, draft quote action, missing weight data.",
      "create": false,
      "home": false
    },
    {
      "id": "07-quotes/sap-email",
      "module": "quotes",
      "slug": "sap-email",
      "title": [
        "เอกสารอ้างอิง SAP และผู้รับอีเมล",
        "SAP reference and email recipient"
      ],
      "kind": "form",
      "collection": "quoteDeliveries",
      "fields": [
        {
          "key": "quote",
          "label": [
            "ใบเสนอราคา / ฉบับอ้างอิง",
            "Quotation / revision"
          ],
          "type": "select",
          "options": "@quotes",
          "required": true
        },
        {
          "key": "sourceCode",
          "label": [
            "รหัสต้นทาง",
            "Source code"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "email",
          "label": [
            "อีเมล",
            "Email"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "07-quotes/sap-email.png",
      "spec": "Mock SAP document reference, recipient email, attachment/PDF, simulated delivery log not actual sent, source revision mapping pending confirmation. No claiming active SAP or changing recipient privileges without confirmation.",
      "create": false,
      "home": false
    },
    {
      "id": "08-services/list",
      "module": "services",
      "slug": "list",
      "title": [
        "บริการและแพ็กเกจ",
        "Services — List"
      ],
      "kind": "list",
      "collection": "services",
      "fields": [],
      "reference": "08-services/list.png",
      "spec": "5 services design/install/calibration-training/maintenance/datacenter-backup, code TH/EN scope/image, form template, survey terms; tabs catalogue/leads/jobs.",
      "create": false,
      "home": true
    },
    {
      "id": "08-services/create",
      "module": "services",
      "slug": "create",
      "title": [
        "เพิ่มบริการ",
        "Services — Create"
      ],
      "kind": "form",
      "collection": "services",
      "fields": [
        {
          "key": "code",
          "label": [
            "รหัสอ้างอิง",
            "Reference code"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "nameEn",
          "label": [
            "ชื่อภาษาอังกฤษ",
            "English name"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "description",
          "label": [
            "รายละเอียดภาษาไทย",
            "Thai description"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "scope",
          "label": [
            "ขอบเขตงาน",
            "Scope of work"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "exclusions",
          "label": [
            "สิ่งที่ไม่รวมในบริการ",
            "Exclusions"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "surveyRequired",
          "label": [
            "ต้องสำรวจหน้างาน",
            "Site survey required"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "surveyFee",
          "label": [
            "ค่าสำรวจ (บาท)",
            "Survey fee (THB)"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "template",
          "label": [
            "แม่แบบ",
            "Template"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "publication",
          "label": [
            "สถานะเผยแพร่",
            "Publication"
          ],
          "type": "select",
          "options": [
            "draft",
            "published",
            "hidden",
            "scheduled"
          ],
          "required": false
        }
      ],
      "reference": "08-services/create.png",
      "spec": "Blank service editor code, image, TH/EN name/description/scope, survey requirement/fee, dynamic form type, publication draft; no auto quotation.",
      "create": true,
      "home": false
    },
    {
      "id": "08-services/edit",
      "module": "services",
      "slug": "edit",
      "title": [
        "แก้ไขบริการ",
        "Services — Edit"
      ],
      "kind": "form",
      "collection": "services",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "nameEn",
          "label": [
            "ชื่อภาษาอังกฤษ",
            "English name"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "description",
          "label": [
            "รายละเอียดภาษาไทย",
            "Thai description"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "scope",
          "label": [
            "ขอบเขตงาน",
            "Scope of work"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "exclusions",
          "label": [
            "สิ่งที่ไม่รวมในบริการ",
            "Exclusions"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "surveyRequired",
          "label": [
            "ต้องสำรวจหน้างาน",
            "Site survey required"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "surveyFee",
          "label": [
            "ค่าสำรวจ (บาท)",
            "Survey fee (THB)"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "template",
          "label": [
            "แม่แบบ",
            "Template"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "publication",
          "label": [
            "สถานะเผยแพร่",
            "Publication"
          ],
          "type": "select",
          "options": [
            "draft",
            "published",
            "hidden",
            "scheduled"
          ],
          "required": false
        }
      ],
      "reference": "08-services/edit.png",
      "spec": "Populated solar-design service scope/exclusions/survey terms, TH/EN, images, form fields and order; save preview/publish.",
      "create": false,
      "home": false
    },
    {
      "id": "08-services/form-builder",
      "module": "services",
      "slug": "form-builder",
      "title": [
        "กำหนดฟอร์มและ BOM",
        "Service form and BOM"
      ],
      "kind": "form",
      "collection": "serviceForms",
      "fields": [
        {
          "key": "service",
          "label": [
            "บริการ",
            "Service"
          ],
          "type": "select",
          "options": "@services",
          "required": true
        },
        {
          "key": "fields",
          "label": [
            "รายการคำถามในฟอร์ม",
            "Form fields"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "bom",
          "label": [
            "รายการอุปกรณ์ / BOM",
            "Equipment / BOM"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "labor",
          "label": [
            "ค่าแรงและขอบเขตงาน",
            "Labor and scope"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "08-services/form-builder.png",
      "spec": "Dynamic field builder with service-specific sections electricity/area, existing equipment, instrument quantities, assets/SLA, racks/IT load; BOM/labor template editor, human review before quote.",
      "create": false,
      "home": false
    },
    {
      "id": "08-services/job-detail",
      "module": "services",
      "slug": "job-detail",
      "title": [
        "รายละเอียดและความคืบหน้างาน",
        "Job details and progress"
      ],
      "kind": "detail",
      "collection": "jobs",
      "fields": [],
      "reference": "08-services/job-detail.png",
      "spec": "Service job timeline, team/schedule/BOM/test results/deliverables/customer acceptance evidence; milestones 30/40/30 totaling100, job done independent final payment.",
      "create": false,
      "home": false
    },
    {
      "id": "08-services/job-edit",
      "module": "services",
      "slug": "job-edit",
      "title": [
        "บันทึกงานและงวดชำระ",
        "Update service job"
      ],
      "kind": "form",
      "collection": "jobs",
      "fields": [
        {
          "key": "owner",
          "label": [
            "ผู้รับผิดชอบ",
            "Assignee"
          ],
          "type": "select",
          "options": "@staff",
          "required": true
        },
        {
          "key": "date",
          "label": [
            "วันที่",
            "Date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "results",
          "label": [
            "ผลทดสอบ / ผลสำรวจ",
            "Test / survey results"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "deliverables",
          "label": [
            "รายการส่งมอบ",
            "Deliverables"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "acceptance",
          "label": [
            "มีหลักฐานการตรวจรับจากลูกค้า",
            "Customer acceptance evidence available"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "milestone",
          "label": [
            "งวดชำระ",
            "Payment milestone"
          ],
          "type": "select",
          "options": [
            "30/40/30",
            "100",
            "50/50"
          ],
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "08-services/job-edit.png",
      "spec": "Authorized progress update form, work report/test attachment, customer acceptance evidence required for staff record, milestone selector 30/40/30 or calibration100% or maintenance50/50, remainder rounding, no marking paid from job.",
      "create": false,
      "home": false
    },
    {
      "id": "08-services/jobs",
      "module": "services",
      "slug": "jobs",
      "title": [
        "คำสั่งงานบริการ",
        "Service jobs"
      ],
      "kind": "list",
      "collection": "jobs",
      "fields": [],
      "reference": "08-services/jobs.png",
      "spec": "Job list scheduled/working/testing/handover/done, team/site/appointment, package-from-cart vs quote-origin, job progress and payment status separate.",
      "create": false,
      "home": false
    },
    {
      "id": "08-services/lead-detail",
      "module": "services",
      "slug": "lead-detail",
      "title": [
        "รายละเอียดคำปรึกษา",
        "Service inquiry details"
      ],
      "kind": "detail",
      "collection": "leads",
      "fields": [],
      "reference": "08-services/lead-detail.png",
      "spec": "Unique guest or company lead, submitted inputs/files, linked products/cart, contact event log, expert assignment, survey fee/status and quote/order links; lead alone not order.",
      "create": false,
      "home": false
    },
    {
      "id": "08-services/leads",
      "module": "services",
      "slug": "leads",
      "title": [
        "คำปรึกษาและงานสำรวจ",
        "Service inquiries"
      ],
      "kind": "list",
      "collection": "leads",
      "fields": [],
      "reference": "08-services/leads.png",
      "spec": "Member/guest lead inbox source product/cart/quote/service, equipment lines/weight/missing information, assigned expert, stage, appointment, contact age.",
      "create": false,
      "home": false
    },
    {
      "id": "08-services/survey-create",
      "module": "services",
      "slug": "survey-create",
      "title": [
        "เพิ่มนัดสำรวจ",
        "Create survey appointment"
      ],
      "kind": "form",
      "collection": "surveys",
      "fields": [
        {
          "key": "lead",
          "label": [
            "คำขอบริการ",
            "Service inquiry"
          ],
          "type": "select",
          "options": "@leads",
          "required": true
        },
        {
          "key": "owner",
          "label": [
            "ผู้รับผิดชอบ",
            "Assignee"
          ],
          "type": "select",
          "options": "@staff",
          "required": true
        },
        {
          "key": "date",
          "label": [
            "วันที่",
            "Date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "time",
          "label": [
            "เวลา",
            "Time"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "address",
          "label": [
            "ที่อยู่",
            "Address"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "surveyFee",
          "label": [
            "ค่าสำรวจ (บาท)",
            "Survey fee (THB)"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "checklist",
          "label": [
            "รายการตรวจสอบ",
            "Checklist"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        }
      ],
      "reference": "08-services/survey-create.png",
      "spec": "Blank appointment form linked lead, engineer/date/time/site, fee/payment request, checklist, files; clearly simulated payment; draft/save.",
      "create": true,
      "home": false
    },
    {
      "id": "08-services/survey-edit",
      "module": "services",
      "slug": "survey-edit",
      "title": [
        "แก้ไขนัดและผลสำรวจ",
        "Edit survey and results"
      ],
      "kind": "form",
      "collection": "surveys",
      "fields": [
        {
          "key": "owner",
          "label": [
            "ผู้รับผิดชอบ",
            "Assignee"
          ],
          "type": "select",
          "options": "@staff",
          "required": true
        },
        {
          "key": "date",
          "label": [
            "วันที่",
            "Date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "time",
          "label": [
            "เวลา",
            "Time"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "results",
          "label": [
            "ผลทดสอบ / ผลสำรวจ",
            "Test / survey results"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "evidence",
          "label": [
            "หลักฐาน / ผลการตรวจ",
            "Evidence / inspection outcome"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "08-services/survey-edit.png",
      "spec": "Populated survey appointment/outcome/photo/drawing, engineering notes, fee receipt linked, survey credit eligibility for same job once, handoff to quote.",
      "create": false,
      "home": false
    },
    {
      "id": "09-finance/list",
      "module": "finance",
      "slug": "list",
      "title": [
        "รายการชำระเงิน",
        "Finance — List"
      ],
      "kind": "list",
      "collection": "payments",
      "fields": [],
      "reference": "09-finance/list.png",
      "spec": "QR/transfer/credit/cheque tabs, verifying/paid/rejected/overdue filters, order/invoice/reference, amount/date, accounting mock integration.",
      "create": false,
      "home": true
    },
    {
      "id": "09-finance/aging",
      "module": "finance",
      "slug": "aging",
      "title": [
        "รายงานลูกหนี้และคืนเงิน",
        "Receivables aging"
      ],
      "kind": "list",
      "collection": "receivables",
      "fields": [],
      "reference": "09-finance/aging.png",
      "spec": "Due date aging notdue/1-30/31-60/61-90/90+, actual unpaid and partial allocations, delivered can notdue; selected refund request reason, amount and authorized approver separate from return.",
      "create": false,
      "home": false
    },
    {
      "id": "09-finance/allocation-edit",
      "module": "finance",
      "slug": "allocation-edit",
      "title": [
        "แก้ไขการจัดสรรเงิน",
        "Edit receipt allocation"
      ],
      "kind": "form",
      "collection": "allocations",
      "fields": [
        {
          "key": "reference",
          "label": [
            "เลขอ้างอิง",
            "Reference"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "invoice",
          "label": [
            "ใบแจ้งหนี้",
            "Invoice"
          ],
          "type": "select",
          "options": "@documents",
          "required": true
        },
        {
          "key": "allocation",
          "label": [
            "ยอดจัดสรร (บาท)",
            "Allocated amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "09-finance/allocation-edit.png",
      "spec": "Confirmed receipt immutable amount with allocation editing proposal across invoices/milestones/survey, partial balances, prevent allocation above received amount, audit reason.",
      "create": false,
      "home": false
    },
    {
      "id": "09-finance/cheque-create",
      "module": "finance",
      "slug": "cheque-create",
      "title": [
        "เพิ่มรายการรับเช็ค",
        "Receive cheque"
      ],
      "kind": "form",
      "collection": "cheques",
      "fields": [
        {
          "key": "bank",
          "label": [
            "ธนาคาร",
            "Bank"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "chequeNumber",
          "label": [
            "เลขเช็ค",
            "Cheque number"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "amount",
          "label": [
            "จำนวนเงิน (บาท)",
            "Amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "customer",
          "label": [
            "ลูกค้า / บริษัท",
            "Customer / company"
          ],
          "type": "select",
          "options": "@customers",
          "required": true
        },
        {
          "key": "invoice",
          "label": [
            "ใบแจ้งหนี้",
            "Invoice"
          ],
          "type": "select",
          "options": "@documents",
          "required": true
        },
        {
          "key": "receivedDate",
          "label": [
            "วันที่รับ",
            "Received date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "dueDate",
          "label": [
            "วันครบกำหนด",
            "Due date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        }
      ],
      "reference": "09-finance/cheque-create.png",
      "spec": "Blank cheque bank/number/face amount/date received/due deposit/customer/invoice/attachment, state received and note not real receipt until cleared.",
      "create": true,
      "home": false
    },
    {
      "id": "09-finance/cheque-edit",
      "module": "finance",
      "slug": "cheque-edit",
      "title": [
        "บันทึกนำฝากและผลเคลียร์เช็ค",
        "Cheque deposit and clearance"
      ],
      "kind": "decision",
      "collection": "cheques",
      "fields": [
        {
          "key": "chequeState",
          "label": [
            "สถานะเช็ค",
            "Cheque state"
          ],
          "type": "select",
          "options": [
            "received",
            "deposited",
            "cleared",
            "returned"
          ],
          "required": true
        },
        {
          "key": "depositDate",
          "label": [
            "วันที่นำฝาก",
            "Deposit date"
          ],
          "type": "date",
          "required": false
        },
        {
          "key": "clearedDate",
          "label": [
            "วันที่เคลียร์",
            "Cleared date"
          ],
          "type": "date",
          "required": false
        },
        {
          "key": "evidence",
          "label": [
            "หลักฐาน / ผลการตรวจ",
            "Evidence / inspection outcome"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "09-finance/cheque-edit.png",
      "spec": "Populated cheque record authorized deposit/cleared/returned event dates, evidence/reason, reference invoice and accounting outcome; no split50/50 or assumed TTB.",
      "create": false,
      "home": false
    },
    {
      "id": "09-finance/cheques",
      "module": "finance",
      "slug": "cheques",
      "title": [
        "ทะเบียนเช็ค",
        "Cheque register"
      ],
      "kind": "list",
      "collection": "cheques",
      "fields": [],
      "reference": "09-finance/cheques.png",
      "spec": "Cheque list bank/number/received/deposit/cleared-returned dates/customer/invoice, face amount separate verified receipts; received not paid.",
      "create": false,
      "home": false
    },
    {
      "id": "09-finance/credit-ledger",
      "module": "finance",
      "slug": "credit-ledger",
      "title": [
        "บัญชีเครดิตรายบริษัท",
        "Company credit ledger"
      ],
      "kind": "detail",
      "collection": "credit",
      "fields": [],
      "reference": "09-finance/credit-ledger.png",
      "spec": "Company credit limit ฿1,000,000, reserved ฿100,000, receivable ฿300,000, available ฿600,000; ledger reserve→invoice→payment→release, no double count; company term configurable.",
      "create": false,
      "home": false
    },
    {
      "id": "09-finance/mixed-payment",
      "module": "finance",
      "slug": "mixed-payment",
      "title": [
        "เงื่อนไขชำระโอนและเช็ค",
        "Transfer and cheque policy"
      ],
      "kind": "form",
      "collection": "mixedPolicies",
      "fields": [
        {
          "key": "customer",
          "label": [
            "ลูกค้า / บริษัท",
            "Customer / company"
          ],
          "type": "select",
          "options": "@customers",
          "required": true
        },
        {
          "key": "transferPercent",
          "label": [
            "สัดส่วนโอน (%)",
            "Transfer portion (%)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "chequePercent",
          "label": [
            "สัดส่วนเช็ค (%)",
            "Cheque portion (%)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "terms",
          "label": [
            "เงื่อนไข",
            "Terms"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "09-finance/mixed-payment.png",
      "spec": "Company-specific proposed50%transfer+50%cheque form with example allocation, transfer verified receipt vs cheque received/deposited/cleared distinct. TTB noted from requirement with bank role pending confirmation. Not default every customer, not service milestone plan. Save draft policy pending confirmation; no actual money/provider.",
      "create": false,
      "home": false
    },
    {
      "id": "09-finance/request-create",
      "module": "finance",
      "slug": "request-create",
      "title": [
        "เพิ่มคำขอชำระเงิน",
        "Create payment request"
      ],
      "kind": "form",
      "collection": "paymentRequests",
      "fields": [
        {
          "key": "customer",
          "label": [
            "ลูกค้า / บริษัท",
            "Customer / company"
          ],
          "type": "select",
          "options": "@customers",
          "required": true
        },
        {
          "key": "invoice",
          "label": [
            "ใบแจ้งหนี้",
            "Invoice"
          ],
          "type": "select",
          "options": "@documents",
          "required": true
        },
        {
          "key": "order",
          "label": [
            "คำสั่งซื้อ",
            "Order"
          ],
          "type": "select",
          "options": "@orders",
          "required": false
        },
        {
          "key": "amount",
          "label": [
            "จำนวนเงิน (บาท)",
            "Amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "reference",
          "label": [
            "เลขอ้างอิง",
            "Reference"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "paymentMethod",
          "label": [
            "วิธีชำระ",
            "Payment method"
          ],
          "type": "select",
          "options": [
            "QR",
            "transfer",
            "credit",
            "cheque"
          ],
          "required": true
        },
        {
          "key": "endDate",
          "label": [
            "วันสิ้นสุด",
            "End date"
          ],
          "type": "date",
          "required": true
        }
      ],
      "reference": "09-finance/request-create.png",
      "spec": "Blank payment request linked invoice/order/milestone/survey, amount/reference/expiry, QR simulated label and transfer bank settings; request alone never paid.",
      "create": true,
      "home": false
    },
    {
      "id": "09-finance/review",
      "module": "finance",
      "slug": "review",
      "title": [
        "ตรวจสอบหลักฐานชำระ",
        "Review requests"
      ],
      "kind": "decision",
      "collection": "payments",
      "fields": [
        {
          "key": "amount",
          "label": [
            "จำนวนเงิน (บาท)",
            "Amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "reference",
          "label": [
            "เลขอ้างอิง",
            "Reference"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "receivedDate",
          "label": [
            "วันที่รับ",
            "Received date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "bank",
          "label": [
            "ธนาคาร",
            "Bank"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "invoice",
          "label": [
            "ใบแจ้งหนี้",
            "Invoice"
          ],
          "type": "select",
          "options": "@documents",
          "required": true
        },
        {
          "key": "allocation",
          "label": [
            "ยอดจัดสรร (บาท)",
            "Allocated amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "paymentState",
          "label": [
            "ผลตรวจเงิน",
            "Payment outcome"
          ],
          "type": "select",
          "options": [
            "verified",
            "rejected"
          ],
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        }
      ],
      "reference": "09-finance/review.png",
      "spec": "Slip image sample labelled, bank account/date/amount/reference/duplicate check, expected vs received, allocation to invoice/milestone/survey, authorized approve/reject with reason.",
      "create": false,
      "home": false
    },
    {
      "id": "10-logistics/list",
      "module": "logistics",
      "slug": "list",
      "title": [
        "ขนส่งและการรับสินค้า",
        "Logistics — List"
      ],
      "kind": "list",
      "collection": "carriers",
      "fields": [],
      "reference": "10-logistics/list.png",
      "spec": "Carrier configuration tab plus shipment and pickup summary; carriers DHL70 Flash50 ThailandPost30 KEX60 Polytechnology300kg explicitly prototype; search tracking/order.",
      "create": false,
      "home": false
    },
    {
      "id": "10-logistics/booking-create",
      "module": "logistics",
      "slug": "booking-create",
      "title": [
        "เพิ่ม Booking จัดส่ง",
        "Create delivery booking"
      ],
      "kind": "form",
      "collection": "bookings",
      "fields": [
        {
          "key": "order",
          "label": [
            "คำสั่งซื้อ",
            "Order"
          ],
          "type": "select",
          "options": "@orders",
          "required": true
        },
        {
          "key": "dispatchDate",
          "label": [
            "วันที่จัดส่ง",
            "Dispatch date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "carrier",
          "label": [
            "ผู้ขนส่ง",
            "Carrier"
          ],
          "type": "select",
          "options": "@carriers",
          "required": true
        },
        {
          "key": "round",
          "label": [
            "รอบจัดส่ง",
            "Delivery round"
          ],
          "type": "select",
          "options": "@rounds",
          "required": true
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        }
      ],
      "reference": "10-logistics/booking-create.png",
      "spec": "New BLANK booking form, ONE active first step: order selector with placeholder เลือกคำสั่งซื้อที่พร้อมจัดส่ง, intended date placeholder, carrier placeholder and round placeholder as separate vertical field rows. A source order/destination/weight summary is collapsed until order selected. Readiness/holds/capacity validations shown as ยังไม่ได้เลือกรายการ. Other steps shown collapsed below, no fake confirmed booking, no prefilled fields, no claims a carrier supports an unconfirmed route. Never copy300kgordercap as truck capacity. Proposed round capacity รอยืนยัน. One save action disabled until required fields chosen, Cancel. One block per row.",
      "create": true,
      "home": false
    },
    {
      "id": "10-logistics/booking-edit",
      "module": "logistics",
      "slug": "booking-edit",
      "title": [
        "แก้ไข Booking จัดส่ง",
        "Edit delivery booking"
      ],
      "kind": "form",
      "collection": "bookings",
      "fields": [
        {
          "key": "dispatchDate",
          "label": [
            "วันที่จัดส่ง",
            "Dispatch date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "carrier",
          "label": [
            "ผู้ขนส่ง",
            "Carrier"
          ],
          "type": "select",
          "options": "@carriers",
          "required": true
        },
        {
          "key": "round",
          "label": [
            "รอบจัดส่ง",
            "Delivery round"
          ],
          "type": "select",
          "options": "@rounds",
          "required": true
        },
        {
          "key": "tracking",
          "label": [
            "หมายเลขติดตาม",
            "Tracking number"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "10-logistics/booking-edit.png",
      "spec": "Populated booking with read-only order/destination/weight, change carrier or date/round, mandatory reason, readiness/capacity/coverage check, history collapsed. Save changes, no duplicate order.",
      "create": false,
      "home": false
    },
    {
      "id": "10-logistics/bookings",
      "module": "logistics",
      "slug": "bookings",
      "title": [
        "Booking การจัดส่ง",
        "Delivery bookings"
      ],
      "kind": "list",
      "collection": "bookings",
      "fields": [],
      "reference": "10-logistics/bookings.png",
      "spec": "Booking list awaiting preparation/ready/notassigned/assignedround, order/destination/weight/ready date/booking date/carrier/round/owner. Essential filters, create/edit booking, source Lam Luk Ka. Prep date distinct dispatch date and delivery ETA.",
      "create": false,
      "home": true
    },
    {
      "id": "10-logistics/carrier-create",
      "module": "logistics",
      "slug": "carrier-create",
      "title": [
        "เพิ่มบริษัทขนส่ง",
        "Create carrier"
      ],
      "kind": "form",
      "collection": "carriers",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "base",
          "label": [
            "ค่าขนส่งพื้นฐาน",
            "Base freight"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "perKg",
          "label": [
            "ค่าขนส่งต่อกิโลกรัม",
            "Freight per kg"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "surcharge",
          "label": [
            "ค่าบริการเพิ่มเติม",
            "Surcharge"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "maxKg",
          "label": [
            "น้ำหนักสูงสุด (กก.)",
            "Maximum weight (kg)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "scope",
          "label": [
            "ขอบเขตงาน",
            "Scope of work"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "eta",
          "label": [
            "วันที่คาดว่าจะถึง",
            "Expected delivery date"
          ],
          "type": "date",
          "required": false
        },
        {
          "key": "active",
          "label": [
            "เปิดใช้งาน",
            "Active"
          ],
          "type": "checkbox",
          "required": false
        }
      ],
      "reference": "10-logistics/carrier-create.png",
      "spec": "Blank carrier form name/logo/base/perKg/surcharge/maxKg/coverage/ETA/active. Coverage editable explicit sample, do not claim confirmed nationwide own delivery.",
      "create": true,
      "home": false
    },
    {
      "id": "10-logistics/carrier-edit",
      "module": "logistics",
      "slug": "carrier-edit",
      "title": [
        "แก้ไขเงื่อนไขขนส่ง",
        "Edit carrier"
      ],
      "kind": "form",
      "collection": "carriers",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "base",
          "label": [
            "ค่าขนส่งพื้นฐาน",
            "Base freight"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "perKg",
          "label": [
            "ค่าขนส่งต่อกิโลกรัม",
            "Freight per kg"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "surcharge",
          "label": [
            "ค่าบริการเพิ่มเติม",
            "Surcharge"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "maxKg",
          "label": [
            "น้ำหนักสูงสุด (กก.)",
            "Maximum weight (kg)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "scope",
          "label": [
            "ขอบเขตงาน",
            "Scope of work"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "eta",
          "label": [
            "วันที่คาดว่าจะถึง",
            "Expected delivery date"
          ],
          "type": "date",
          "required": false
        },
        {
          "key": "active",
          "label": [
            "เปิดใช้งาน",
            "Active"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "10-logistics/carrier-edit.png",
      "spec": "Populated Polytechnology max300kg, sample limited coverage, base/perKg/surcharge/ETA/active, rate preview by destination/weight, preserve caps.",
      "create": false,
      "home": false
    },
    {
      "id": "10-logistics/pickup-create",
      "module": "logistics",
      "slug": "pickup-create",
      "title": [
        "เพิ่ม Booking รับสินค้าเอง",
        "Create pickup booking"
      ],
      "kind": "form",
      "collection": "pickups",
      "fields": [
        {
          "key": "order",
          "label": [
            "คำสั่งซื้อ",
            "Order"
          ],
          "type": "select",
          "options": "@orders",
          "required": true
        },
        {
          "key": "date",
          "label": [
            "วันที่",
            "Date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "slot",
          "label": [
            "ช่วงเวลารับสินค้า",
            "Pickup slot"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "recipient",
          "label": [
            "ผู้รับ / ผู้ติดต่อ",
            "Recipient / contact"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "phone",
          "label": [
            "โทรศัพท์",
            "Phone"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "customerVehicle",
          "label": [
            "ลูกค้าจัดรถเข้ามารับ",
            "Customer-arranged vehicle"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "vehicle",
          "label": [
            "ทะเบียนรถ / รถที่ใช้",
            "Vehicle / registration"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "driver",
          "label": [
            "ผู้ขับรถ",
            "Driver"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "note",
          "label": [
            "หมายเหตุ",
            "Notes"
          ],
          "type": "textarea",
          "required": false
        }
      ],
      "reference": "10-logistics/pickup-create.png",
      "spec": "Blank pickup booking order/date/slot/recipient/contact, conditional customer-arranged-vehicle option with vehicle/driver details only when selected. Lam Luk Ka source warehouse summary. Booking example/proposed fields pending customer confirmation, no guaranteed SLA.",
      "create": true,
      "home": false
    },
    {
      "id": "10-logistics/pickup-edit",
      "module": "logistics",
      "slug": "pickup-edit",
      "title": [
        "แก้ไข Booking และบันทึกรับสินค้า",
        "Edit pickup and handover"
      ],
      "kind": "form",
      "collection": "pickups",
      "fields": [
        {
          "key": "date",
          "label": [
            "วันที่",
            "Date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "slot",
          "label": [
            "ช่วงเวลารับสินค้า",
            "Pickup slot"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "recipient",
          "label": [
            "ผู้รับ / ผู้ติดต่อ",
            "Recipient / contact"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "phone",
          "label": [
            "โทรศัพท์",
            "Phone"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "customerVehicle",
          "label": [
            "ลูกค้าจัดรถเข้ามารับ",
            "Customer-arranged vehicle"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "vehicle",
          "label": [
            "ทะเบียนรถ / รถที่ใช้",
            "Vehicle / registration"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "driver",
          "label": [
            "ผู้ขับรถ",
            "Driver"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "evidence",
          "label": [
            "หลักฐาน / ผลการตรวจ",
            "Evidence / inspection outcome"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "10-logistics/pickup-edit.png",
      "spec": "Populated pickup booking recipient/slot and optional customer vehicle/driver, actual handover evidence/time and warehouse source reference. Business calendar/capacity access through More, no extra side panel.",
      "create": false,
      "home": false
    },
    {
      "id": "10-logistics/round-create",
      "module": "logistics",
      "slug": "round-create",
      "title": [
        "เพิ่มรอบจัดส่ง",
        "Create delivery round"
      ],
      "kind": "form",
      "collection": "rounds",
      "fields": [
        {
          "key": "date",
          "label": [
            "วันที่",
            "Date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "time",
          "label": [
            "เวลา",
            "Time"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "carrier",
          "label": [
            "ผู้ขนส่ง",
            "Carrier"
          ],
          "type": "select",
          "options": "@carriers",
          "required": true
        },
        {
          "key": "vehicle",
          "label": [
            "ทะเบียนรถ / รถที่ใช้",
            "Vehicle / registration"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "routeName",
          "label": [
            "เส้นทาง",
            "Route"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "capacity",
          "label": [
            "ความจุรอบที่เสนอ (กก.)",
            "Proposed round capacity (kg)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "stops",
          "label": [
            "จำนวนจุดส่งสูงสุด",
            "Maximum delivery stops"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "owner",
          "label": [
            "ผู้รับผิดชอบ",
            "Assignee"
          ],
          "type": "select",
          "options": "@staff",
          "required": true
        },
        {
          "key": "cutoff",
          "label": [
            "เวลาปิดรับงาน",
            "Cutoff time"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "order",
          "label": [
            "คำสั่งซื้อ",
            "Order"
          ],
          "type": "select",
          "options": "@orders",
          "required": false
        }
      ],
      "reference": "10-logistics/round-create.png",
      "spec": "Blank vertical round form date/time/carrier/vehicle/route, sample capacity in kg and stops as configurable proposed values pending confirmation, owner/cutoff. Order selection table single block below; save round, no guess that all vehicles300kg.",
      "create": true,
      "home": false
    },
    {
      "id": "10-logistics/round-edit",
      "module": "logistics",
      "slug": "round-edit",
      "title": [
        "แก้ไขรอบจัดส่งและคิว",
        "Edit delivery round"
      ],
      "kind": "form",
      "collection": "rounds",
      "fields": [
        {
          "key": "date",
          "label": [
            "วันที่",
            "Date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "time",
          "label": [
            "เวลา",
            "Time"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "carrier",
          "label": [
            "ผู้ขนส่ง",
            "Carrier"
          ],
          "type": "select",
          "options": "@carriers",
          "required": true
        },
        {
          "key": "vehicle",
          "label": [
            "ทะเบียนรถ / รถที่ใช้",
            "Vehicle / registration"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "routeName",
          "label": [
            "เส้นทาง",
            "Route"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "capacity",
          "label": [
            "ความจุรอบที่เสนอ (กก.)",
            "Proposed round capacity (kg)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "stops",
          "label": [
            "จำนวนจุดส่งสูงสุด",
            "Maximum delivery stops"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "owner",
          "label": [
            "ผู้รับผิดชอบ",
            "Assignee"
          ],
          "type": "select",
          "options": "@staff",
          "required": true
        },
        {
          "key": "booking",
          "label": [
            "Booking ที่จะจัดลงรอบนี้",
            "Booking to assign to this round"
          ],
          "type": "select",
          "options": "@bookings",
          "required": false
        },
        {
          "key": "displayOrder",
          "label": [
            "ลำดับแสดง",
            "Display order"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "10-logistics/round-edit.png",
      "spec": "Populated round details and one booking table below; move/reorder one booking through inline row editor below, reason and before/after audit stacked, capacity/hold/readiness validations. Dispatch actual event distinct expected ETA, no dense horizontal board.",
      "create": false,
      "home": false
    },
    {
      "id": "10-logistics/rounds",
      "module": "logistics",
      "slug": "rounds",
      "title": [
        "รอบจัดส่งสินค้า",
        "Delivery rounds"
      ],
      "kind": "list",
      "collection": "rounds",
      "fields": [],
      "reference": "10-logistics/rounds.png",
      "spec": "Delivery round list date/time/carrier or vehicle/route/source warehouse, essential capacity used/remaining as mock values, bookings count/owner/status. Add/edit round and see preparation readiness. No treating300kgordercap as vehicle capacity.",
      "create": false,
      "home": false
    },
    {
      "id": "10-logistics/shipment-create",
      "module": "logistics",
      "slug": "shipment-create",
      "title": [
        "เพิ่มบันทึกจัดส่ง",
        "Record shipment"
      ],
      "kind": "form",
      "collection": "shipments",
      "fields": [
        {
          "key": "order",
          "label": [
            "คำสั่งซื้อ",
            "Order"
          ],
          "type": "select",
          "options": "@orders",
          "required": true
        },
        {
          "key": "carrier",
          "label": [
            "ผู้ขนส่ง",
            "Carrier"
          ],
          "type": "select",
          "options": "@carriers",
          "required": true
        },
        {
          "key": "tracking",
          "label": [
            "หมายเลขติดตาม",
            "Tracking number"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "dispatchDate",
          "label": [
            "วันที่จัดส่ง",
            "Dispatch date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "eta",
          "label": [
            "วันที่คาดว่าจะถึง",
            "Expected delivery date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "qty",
          "label": [
            "จำนวน",
            "Quantity"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": false
        }
      ],
      "reference": "10-logistics/shipment-create.png",
      "spec": "Approved packed order selected, carrier valid for weight/coverage, tracking/date sent/ETA/packages/evidence, specific confirm shipment action.",
      "create": true,
      "home": false
    },
    {
      "id": "10-logistics/shipment-edit",
      "module": "logistics",
      "slug": "shipment-edit",
      "title": [
        "แก้ไขข้อมูลติดตามขนส่ง",
        "Amend tracking"
      ],
      "kind": "form",
      "collection": "shipments",
      "fields": [
        {
          "key": "tracking",
          "label": [
            "หมายเลขติดตาม",
            "Tracking number"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "dispatchDate",
          "label": [
            "วันที่จัดส่ง",
            "Dispatch date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "eta",
          "label": [
            "วันที่คาดว่าจะถึง",
            "Expected delivery date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "evidence",
          "label": [
            "หลักฐาน / ผลการตรวจ",
            "Evidence / inspection outcome"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "10-logistics/shipment-edit.png",
      "spec": "Shipment tracking/date/ETA and delivery proof amendment with reason/history; order lines unchanged; manual record before API.",
      "create": false,
      "home": false
    },
    {
      "id": "11-marketing/list",
      "module": "marketing",
      "slug": "list",
      "title": [
        "โปรโมชั่น คูปอง และบริการเสริม",
        "Marketing — List"
      ],
      "kind": "list",
      "collection": "campaigns",
      "fields": [],
      "reference": "11-marketing/list.png",
      "spec": "Tabs campaigns/coupons/item add-ons/order add-ons, statuses/dates/segment counts; sample 6 promo cards 8 coupons 14 item add-ons 3 order add-ons.",
      "create": false,
      "home": true
    },
    {
      "id": "11-marketing/campaign-create",
      "module": "marketing",
      "slug": "campaign-create",
      "title": [
        "เพิ่มโปรโมชั่น",
        "Create campaign"
      ],
      "kind": "form",
      "collection": "campaigns",
      "fields": [
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "titleEn",
          "label": [
            "ชื่อเรื่องภาษาอังกฤษ",
            "English title"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "description",
          "label": [
            "รายละเอียดภาษาไทย",
            "Thai description"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "product",
          "label": [
            "สินค้าจาก ERP",
            "ERP product"
          ],
          "type": "select",
          "options": "@products",
          "required": false
        },
        {
          "key": "category",
          "label": [
            "หมวดธุรกิจบนเว็บไซต์",
            "Website business category"
          ],
          "type": "select",
          "options": [
            "green",
            "auto",
            "inst",
            "gas",
            "data",
            "warehouse"
          ],
          "required": false
        },
        {
          "key": "service",
          "label": [
            "บริการ",
            "Service"
          ],
          "type": "select",
          "options": "@services",
          "required": false
        },
        {
          "key": "cta",
          "label": [
            "ปลายทางปุ่ม",
            "Button destination"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "terms",
          "label": [
            "เงื่อนไข",
            "Terms"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "startDate",
          "label": [
            "วันเริ่มต้น",
            "Start date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "endDate",
          "label": [
            "วันสิ้นสุด",
            "End date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "segment",
          "label": [
            "กลุ่มลูกค้า",
            "Customer segment"
          ],
          "type": "select",
          "options": [
            "Retail",
            "Partner",
            "Grade A"
          ],
          "required": true
        },
        {
          "key": "displayOrder",
          "label": [
            "ลำดับแสดง",
            "Display order"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "publication",
          "label": [
            "สถานะเผยแพร่",
            "Publication"
          ],
          "type": "select",
          "options": [
            "draft",
            "published",
            "hidden",
            "scheduled"
          ],
          "required": false
        }
      ],
      "reference": "11-marketing/campaign-create.png",
      "spec": "Blank campaign TH/EN offer/image/target product-category-service/CTA/terms/start-end dates/segment/order; content-only vs transactional, rules validation before activating latter.",
      "create": true,
      "home": false
    },
    {
      "id": "11-marketing/campaign-edit",
      "module": "marketing",
      "slug": "campaign-edit",
      "title": [
        "แก้ไขโปรโมชั่น",
        "Edit campaign"
      ],
      "kind": "form",
      "collection": "campaigns",
      "fields": [
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "titleEn",
          "label": [
            "ชื่อเรื่องภาษาอังกฤษ",
            "English title"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "description",
          "label": [
            "รายละเอียดภาษาไทย",
            "Thai description"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "cta",
          "label": [
            "ปลายทางปุ่ม",
            "Button destination"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "terms",
          "label": [
            "เงื่อนไข",
            "Terms"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "startDate",
          "label": [
            "วันเริ่มต้น",
            "Start date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "endDate",
          "label": [
            "วันสิ้นสุด",
            "End date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "segment",
          "label": [
            "กลุ่มลูกค้า",
            "Customer segment"
          ],
          "type": "select",
          "options": [
            "Retail",
            "Partner",
            "Grade A"
          ],
          "required": true
        },
        {
          "key": "displayOrder",
          "label": [
            "ลำดับแสดง",
            "Display order"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "publication",
          "label": [
            "สถานะเผยแพร่",
            "Publication"
          ],
          "type": "select",
          "options": [
            "draft",
            "published",
            "hidden",
            "scheduled"
          ],
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "11-marketing/campaign-edit.png",
      "spec": "Populated campaign date10–31Oct2569, segmented target/rules/offer and preview; transactional discount test summary; no claiming existing storefront applied rules.",
      "create": false,
      "home": false
    },
    {
      "id": "11-marketing/coupon-create",
      "module": "marketing",
      "slug": "coupon-create",
      "title": [
        "เพิ่มคูปอง",
        "Create coupon"
      ],
      "kind": "form",
      "collection": "coupons",
      "fields": [
        {
          "key": "code",
          "label": [
            "รหัสอ้างอิง",
            "Reference code"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "calculation",
          "label": [
            "วิธีคิดค่าบริการ",
            "Calculation"
          ],
          "type": "select",
          "options": [
            "fixed",
            "per-unit",
            "percent",
            "freight"
          ],
          "required": true
        },
        {
          "key": "amount",
          "label": [
            "จำนวนเงิน (บาท)",
            "Amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "minSpend",
          "label": [
            "ยอดซื้อขั้นต่ำ (บาท)",
            "Minimum spend (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "maxDiscount",
          "label": [
            "ส่วนลดสูงสุด (บาท)",
            "Maximum discount (THB)"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "segment",
          "label": [
            "กลุ่มลูกค้า",
            "Customer segment"
          ],
          "type": "select",
          "options": [
            "Retail",
            "Partner",
            "Grade A"
          ],
          "required": true
        },
        {
          "key": "perPerson",
          "label": [
            "สิทธิ์ต่อคน",
            "Uses per customer"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "totalLimit",
          "label": [
            "จำนวนสิทธิ์รวม",
            "Total uses"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "startDate",
          "label": [
            "วันเริ่มต้น",
            "Start date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "endDate",
          "label": [
            "วันสิ้นสุด",
            "End date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "stackable",
          "label": [
            "ใช้ร่วมโปรโมชั่นได้",
            "Can stack with promotions"
          ],
          "type": "checkbox",
          "required": false
        }
      ],
      "reference": "11-marketing/coupon-create.png",
      "spec": "Blank code/amount-percent-freight/type/value/min spend/segments/per-person-total limits/start-end/stack policy with promo and quote; one code per checkout.",
      "create": true,
      "home": false
    },
    {
      "id": "11-marketing/coupon-edit",
      "module": "marketing",
      "slug": "coupon-edit",
      "title": [
        "แก้ไขคูปอง",
        "Edit coupon"
      ],
      "kind": "form",
      "collection": "coupons",
      "fields": [
        {
          "key": "code",
          "label": [
            "รหัสอ้างอิง",
            "Reference code"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "calculation",
          "label": [
            "วิธีคิดค่าบริการ",
            "Calculation"
          ],
          "type": "select",
          "options": [
            "fixed",
            "per-unit",
            "percent",
            "freight"
          ],
          "required": true
        },
        {
          "key": "amount",
          "label": [
            "จำนวนเงิน (บาท)",
            "Amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "minSpend",
          "label": [
            "ยอดซื้อขั้นต่ำ (บาท)",
            "Minimum spend (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "maxDiscount",
          "label": [
            "ส่วนลดสูงสุด (บาท)",
            "Maximum discount (THB)"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "segment",
          "label": [
            "กลุ่มลูกค้า",
            "Customer segment"
          ],
          "type": "select",
          "options": [
            "Retail",
            "Partner",
            "Grade A"
          ],
          "required": true
        },
        {
          "key": "perPerson",
          "label": [
            "สิทธิ์ต่อคน",
            "Uses per customer"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "totalLimit",
          "label": [
            "จำนวนสิทธิ์รวม",
            "Total uses"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "startDate",
          "label": [
            "วันเริ่มต้น",
            "Start date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "endDate",
          "label": [
            "วันสิ้นสุด",
            "End date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "stackable",
          "label": [
            "ใช้ร่วมโปรโมชั่นได้",
            "Can stack with promotions"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "11-marketing/coupon-edit.png",
      "spec": "FREIGHT0 max800baht freight discount, minimum/segments/limits/validity; note PLTNEW300 reference actual3000baht despite name; linked redemption history.",
      "create": false,
      "home": false
    },
    {
      "id": "11-marketing/item-addon-create",
      "module": "marketing",
      "slug": "item-addon-create",
      "title": [
        "เพิ่มบริการเสริมสินค้า",
        "Create item add-on"
      ],
      "kind": "form",
      "collection": "itemAddons",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "nameEn",
          "label": [
            "ชื่อภาษาอังกฤษ",
            "English name"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "calculation",
          "label": [
            "วิธีคิดค่าบริการ",
            "Calculation"
          ],
          "type": "select",
          "options": [
            "fixed",
            "per-unit",
            "percent",
            "freight"
          ],
          "required": true
        },
        {
          "key": "amount",
          "label": [
            "จำนวนเงิน (บาท)",
            "Amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "category",
          "label": [
            "หมวดธุรกิจบนเว็บไซต์",
            "Website business category"
          ],
          "type": "select",
          "options": [
            "green",
            "auto",
            "inst",
            "gas",
            "data",
            "warehouse"
          ],
          "required": false
        },
        {
          "key": "product",
          "label": [
            "สินค้าจาก ERP",
            "ERP product"
          ],
          "type": "select",
          "options": "@products",
          "required": false
        },
        {
          "key": "retailMultiplier",
          "label": [
            "ตัวคูณ Retail",
            "Retail multiplier"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "partnerMultiplier",
          "label": [
            "ตัวคูณ Partner",
            "Partner multiplier"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "gradeMultiplier",
          "label": [
            "ตัวคูณ Grade A",
            "Grade A multiplier"
          ],
          "type": "number",
          "required": false
        }
      ],
      "reference": "11-marketing/item-addon-create.png",
      "spec": "Blank add-on TH/EN name fixed/per-unit/percent/by-category, amount, SKU/category constraints, PDP/cart selection point, price-level multiplier.",
      "create": true,
      "home": false
    },
    {
      "id": "11-marketing/item-addon-edit",
      "module": "marketing",
      "slug": "item-addon-edit",
      "title": [
        "แก้ไขบริการเสริมสินค้า",
        "Edit item add-on"
      ],
      "kind": "form",
      "collection": "itemAddons",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "nameEn",
          "label": [
            "ชื่อภาษาอังกฤษ",
            "English name"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "calculation",
          "label": [
            "วิธีคิดค่าบริการ",
            "Calculation"
          ],
          "type": "select",
          "options": [
            "fixed",
            "per-unit",
            "percent",
            "freight"
          ],
          "required": true
        },
        {
          "key": "amount",
          "label": [
            "จำนวนเงิน (บาท)",
            "Amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "category",
          "label": [
            "หมวดธุรกิจบนเว็บไซต์",
            "Website business category"
          ],
          "type": "select",
          "options": [
            "green",
            "auto",
            "inst",
            "gas",
            "data",
            "warehouse"
          ],
          "required": false
        },
        {
          "key": "product",
          "label": [
            "สินค้าจาก ERP",
            "ERP product"
          ],
          "type": "select",
          "options": "@products",
          "required": false
        },
        {
          "key": "retailMultiplier",
          "label": [
            "ตัวคูณ Retail",
            "Retail multiplier"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "partnerMultiplier",
          "label": [
            "ตัวคูณ Partner",
            "Partner multiplier"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "gradeMultiplier",
          "label": [
            "ตัวคูณ Grade A",
            "Grade A multiplier"
          ],
          "type": "number",
          "required": false
        },
        {
          "key": "effectiveDate",
          "label": [
            "วันที่มีผล",
            "Effective date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "11-marketing/item-addon-edit.png",
      "spec": "Populated calibration add-on applicable instruments, per-unit amount, three price multipliers, selection PDP/cart, effective dates/test preview.",
      "create": false,
      "home": false
    },
    {
      "id": "11-marketing/order-addon-create",
      "module": "marketing",
      "slug": "order-addon-create",
      "title": [
        "เพิ่มบริการเสริมคำสั่งซื้อ",
        "Create order add-on"
      ],
      "kind": "form",
      "collection": "orderAddons",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "nameEn",
          "label": [
            "ชื่อภาษาอังกฤษ",
            "English name"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "calculation",
          "label": [
            "วิธีคิดค่าบริการ",
            "Calculation"
          ],
          "type": "select",
          "options": [
            "fixed",
            "per-unit",
            "percent",
            "freight"
          ],
          "required": true
        },
        {
          "key": "amount",
          "label": [
            "จำนวนเงิน (บาท)",
            "Amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "carrier",
          "label": [
            "ผู้ขนส่ง",
            "Carrier"
          ],
          "type": "select",
          "options": "@carriers",
          "required": false
        },
        {
          "key": "maxKg",
          "label": [
            "น้ำหนักสูงสุด (กก.)",
            "Maximum weight (kg)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "startDate",
          "label": [
            "วันเริ่มต้น",
            "Start date"
          ],
          "type": "date",
          "required": false
        },
        {
          "key": "endDate",
          "label": [
            "วันสิ้นสุด",
            "End date"
          ],
          "type": "date",
          "required": false
        },
        {
          "key": "terms",
          "label": [
            "เงื่อนไข",
            "Terms"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "11-marketing/order-addon-create.png",
      "spec": "Blank shipping insurance/special handling/building lift type, price/percent/minimum, delivery mode/carrier/weight rules, validity and prevent double-charge carrier included service.",
      "create": true,
      "home": false
    },
    {
      "id": "11-marketing/order-addon-edit",
      "module": "marketing",
      "slug": "order-addon-edit",
      "title": [
        "แก้ไขบริการเสริมคำสั่งซื้อ",
        "Edit order add-on"
      ],
      "kind": "form",
      "collection": "orderAddons",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "nameEn",
          "label": [
            "ชื่อภาษาอังกฤษ",
            "English name"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "calculation",
          "label": [
            "วิธีคิดค่าบริการ",
            "Calculation"
          ],
          "type": "select",
          "options": [
            "fixed",
            "per-unit",
            "percent",
            "freight"
          ],
          "required": true
        },
        {
          "key": "amount",
          "label": [
            "จำนวนเงิน (บาท)",
            "Amount (THB)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "carrier",
          "label": [
            "ผู้ขนส่ง",
            "Carrier"
          ],
          "type": "select",
          "options": "@carriers",
          "required": false
        },
        {
          "key": "maxKg",
          "label": [
            "น้ำหนักสูงสุด (กก.)",
            "Maximum weight (kg)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "terms",
          "label": [
            "เงื่อนไข",
            "Terms"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "11-marketing/order-addon-edit.png",
      "spec": "Populated insurance addon percent/minimum and delivery/carrier constraints, preview totals and stacking calculation order; no extra mode.",
      "create": false,
      "home": false
    },
    {
      "id": "11-marketing/wallet",
      "module": "marketing",
      "slug": "wallet",
      "title": [
        "การเก็บและใช้คูปอง",
        "Coupon usage"
      ],
      "kind": "list",
      "collection": "wallet",
      "fields": [],
      "reference": "11-marketing/wallet.png",
      "spec": "Wallet/usage list customer/code/collected-available-redeemed-expired/order reference, per-person limit/usage, scoped export and charts.",
      "create": false,
      "home": false
    },
    {
      "id": "12-content/list",
      "module": "content",
      "slug": "list",
      "title": [
        "จัดการหน้าแรก",
        "Homepage content — List"
      ],
      "kind": "list",
      "collection": "sections",
      "fields": [],
      "reference": "12-content/list.png",
      "spec": "Section list overview hero/carousel/shortcuts/6 business cards/4 featured products/services/coupons/optional group rows, drag order/status/schedule; no About/Contact editor.",
      "create": false,
      "home": true
    },
    {
      "id": "12-content/create",
      "module": "content",
      "slug": "create",
      "title": [
        "เพิ่มส่วนเนื้อหาหรือแบนเนอร์",
        "Homepage content — Create"
      ],
      "kind": "form",
      "collection": "sections",
      "fields": [
        {
          "key": "sectionType",
          "label": [
            "ประเภทส่วนหน้าแรก",
            "Homepage section"
          ],
          "type": "select",
          "options": [
            "hero",
            "carousel",
            "shortcuts",
            "categories",
            "featured",
            "services",
            "coupons",
            "groups"
          ],
          "required": true
        },
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "titleEn",
          "label": [
            "ชื่อเรื่องภาษาอังกฤษ",
            "English title"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "alt",
          "label": [
            "คำอธิบายภาพภาษาไทย",
            "Thai image alt text"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "altEn",
          "label": [
            "คำอธิบายภาพภาษาอังกฤษ",
            "English image alt text"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "cta",
          "label": [
            "ปลายทางปุ่ม",
            "Button destination"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "displayOrder",
          "label": [
            "ลำดับแสดง",
            "Display order"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "startDate",
          "label": [
            "วันเริ่มต้น",
            "Start date"
          ],
          "type": "date",
          "required": false
        },
        {
          "key": "endDate",
          "label": [
            "วันสิ้นสุด",
            "End date"
          ],
          "type": "date",
          "required": false
        },
        {
          "key": "segment",
          "label": [
            "กลุ่มลูกค้า",
            "Customer segment"
          ],
          "type": "select",
          "options": [
            "Retail",
            "Partner",
            "Grade A"
          ],
          "required": false
        },
        {
          "key": "publication",
          "label": [
            "สถานะเผยแพร่",
            "Publication"
          ],
          "type": "select",
          "options": [
            "draft",
            "published",
            "hidden",
            "scheduled"
          ],
          "required": false
        }
      ],
      "reference": "12-content/create.png",
      "spec": "Blank hero/carousel content form TH/EN image/alt/title/CTA target/display order/publish dates/segment; section-type selector among allowed commerce blocks.",
      "create": true,
      "home": false
    },
    {
      "id": "12-content/edit",
      "module": "content",
      "slug": "edit",
      "title": [
        "แก้ไขเนื้อหาหน้าแรก",
        "Homepage content — Edit"
      ],
      "kind": "form",
      "collection": "sections",
      "fields": [
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "titleEn",
          "label": [
            "ชื่อเรื่องภาษาอังกฤษ",
            "English title"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "image",
          "label": [
            "รูปภาพ",
            "Image"
          ],
          "type": "file",
          "required": false
        },
        {
          "key": "alt",
          "label": [
            "คำอธิบายภาพภาษาไทย",
            "Thai image alt text"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "altEn",
          "label": [
            "คำอธิบายภาพภาษาอังกฤษ",
            "English image alt text"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "cta",
          "label": [
            "ปลายทางปุ่ม",
            "Button destination"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "displayOrder",
          "label": [
            "ลำดับแสดง",
            "Display order"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "product",
          "label": [
            "สินค้าจาก ERP",
            "ERP product"
          ],
          "type": "select",
          "options": "@products",
          "required": false
        },
        {
          "key": "service",
          "label": [
            "บริการ",
            "Service"
          ],
          "type": "select",
          "options": "@services",
          "required": false
        },
        {
          "key": "segment",
          "label": [
            "กลุ่มลูกค้า",
            "Customer segment"
          ],
          "type": "select",
          "options": [
            "Retail",
            "Partner",
            "Grade A"
          ],
          "required": false
        },
        {
          "key": "publication",
          "label": [
            "สถานะเผยแพร่",
            "Publication"
          ],
          "type": "select",
          "options": [
            "draft",
            "published",
            "hidden",
            "scheduled"
          ],
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "12-content/edit.png",
      "spec": "Populated banner plus section order, shortcuts and business-card choices, 4 featured products curated vs pop fallback, service/coupon links, TH/EN fields.",
      "create": false,
      "home": false
    },
    {
      "id": "12-content/history",
      "module": "content",
      "slug": "history",
      "title": [
        "ประวัติเผยแพร่และย้อนกลับ",
        "Publication history"
      ],
      "kind": "history",
      "collection": "contentVersions",
      "fields": [],
      "reference": "12-content/history.png",
      "spec": "Commerce content versions actor/time/diff/scheduled vs published, selected compare preview and rollback confirmation reason.",
      "create": false,
      "home": false
    },
    {
      "id": "12-content/preview",
      "module": "content",
      "slug": "preview",
      "title": [
        "ตัวอย่างหน้าแรกก่อนเผยแพร่",
        "Homepage content — Preview"
      ],
      "kind": "preview",
      "collection": "sections",
      "fields": [],
      "reference": "12-content/preview.png",
      "spec": "Embedded storefront preview with TH/EN and Retail/Partner/GradeA selectors, hero/business cards/featured four/service/coupon rows, scheduled draft banner. Back-office shell remains visible.",
      "create": false,
      "home": false
    },
    {
      "id": "13-documents/list",
      "module": "documents",
      "slug": "list",
      "title": [
        "ศูนย์เอกสาร",
        "Documents — List"
      ],
      "kind": "list",
      "collection": "documents",
      "fields": [],
      "reference": "13-documents/list.png",
      "spec": "Search document no/type/customer/order/quote revision/invoice/payment/survey/handover, issued/draft/void/source filters; quote/order confirmation/invoice/receipt/tax integration mock.",
      "create": false,
      "home": true
    },
    {
      "id": "13-documents/create",
      "module": "documents",
      "slug": "create",
      "title": [
        "เพิ่มเอกสารตัวอย่างหรือไฟล์แนบ",
        "Documents — Create"
      ],
      "kind": "form",
      "collection": "documents",
      "fields": [
        {
          "key": "documentType",
          "label": [
            "ประเภทเอกสาร",
            "Document type"
          ],
          "type": "select",
          "options": [
            "quotation",
            "invoice",
            "receipt",
            "tax",
            "PO",
            "survey",
            "handover"
          ],
          "required": true
        },
        {
          "key": "source",
          "label": [
            "แหล่งข้อมูล",
            "Source"
          ],
          "type": "select",
          "options": [
            "ERP",
            "SAP",
            "accounting",
            "website-sample"
          ],
          "required": true
        },
        {
          "key": "entity",
          "label": [
            "รายการที่เกี่ยวข้อง",
            "Related record"
          ],
          "type": "select",
          "options": "@orders",
          "required": true
        },
        {
          "key": "reference",
          "label": [
            "เลขอ้างอิง",
            "Reference"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "attachment",
          "label": [
            "เอกสารแนบ",
            "Attachment"
          ],
          "type": "file",
          "required": true
        },
        {
          "key": "fileAccess",
          "label": [
            "สิทธิ์ไฟล์",
            "File access"
          ],
          "type": "select",
          "options": [
            "private",
            "public-media"
          ],
          "required": true
        }
      ],
      "reference": "13-documents/create.png",
      "spec": "Blank attachment/sample registration form type, source system mock/internal sample, linked entity/revision, metadata/file/private permission; no asserting automatic SAP or actual e-tax.",
      "create": true,
      "home": false
    },
    {
      "id": "13-documents/detail",
      "module": "documents",
      "slug": "detail",
      "title": [
        "เปิดเอกสารและพิมพ์",
        "Documents — Details"
      ],
      "kind": "document",
      "collection": "documents",
      "fields": [],
      "reference": "13-documents/detail.png",
      "spec": "Read-only quotation R1 document PDF preview with correct snapshot/products/totals, revision selector, print/download allowed per role, source SAP mock not actual issued by SAP.",
      "create": false,
      "home": false
    },
    {
      "id": "13-documents/draft-edit",
      "module": "documents",
      "slug": "draft-edit",
      "title": [
        "แก้ไขร่างเอกสาร",
        "Edit document draft"
      ],
      "kind": "form",
      "collection": "documents",
      "fields": [
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "reference",
          "label": [
            "เลขอ้างอิง",
            "Reference"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "date",
          "label": [
            "วันที่",
            "Date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "template",
          "label": [
            "แม่แบบ",
            "Template"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "entity",
          "label": [
            "รายการที่เกี่ยวข้อง",
            "Related record"
          ],
          "type": "select",
          "options": "@orders",
          "required": true
        },
        {
          "key": "fileAccess",
          "label": [
            "สิทธิ์ไฟล์",
            "File access"
          ],
          "type": "select",
          "options": [
            "private",
            "public-media"
          ],
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "13-documents/draft-edit.png",
      "spec": "Mutable draft metadata/template snapshot preview, number/date/creator/revision/entity/file rights; issued documents locked and cannot silently edit.",
      "create": false,
      "home": false
    },
    {
      "id": "13-documents/files",
      "module": "documents",
      "slug": "files",
      "title": [
        "สิทธิ์ไฟล์และเอกสารแนบ",
        "Private files and access"
      ],
      "kind": "list",
      "collection": "files",
      "fields": [],
      "reference": "13-documents/files.png",
      "spec": "Private PO/slips/drawings vs public product media, file metadata/version/owner/link/role access table, calibration/handover attachments, guarded preview.",
      "create": false,
      "home": false
    },
    {
      "id": "13-documents/revision-void",
      "module": "documents",
      "slug": "revision-void",
      "title": [
        "สร้างฉบับใหม่หรือยกเลิกเอกสาร",
        "Document revision or void request"
      ],
      "kind": "decision",
      "collection": "documentRequests",
      "fields": [
        {
          "key": "reference",
          "label": [
            "เลขอ้างอิง",
            "Reference"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "change",
          "label": [
            "รายการที่เสนอแก้ไข",
            "Proposed changes"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "decision",
          "label": [
            "ผลพิจารณา",
            "Decision"
          ],
          "type": "select",
          "options": [
            "approved",
            "rejected"
          ],
          "required": true
        }
      ],
      "reference": "13-documents/revision-void.png",
      "spec": "Issued version locked, revision/void specific action form with reason linked predecessor/permissions/audit; customer/product edits don't change old document.",
      "create": false,
      "home": false
    },
    {
      "id": "14-communication/conversation",
      "module": "communication",
      "slug": "conversation",
      "title": [
        "ติดตามบทสนทนา",
        "Conversation follow-up"
      ],
      "kind": "detail",
      "collection": "conversations",
      "fields": [],
      "reference": "14-communication/conversation.png",
      "spec": "Selected case history, owner/status, customer preferences and related entities, add support request cancel/return/amendment without finance approval.",
      "create": false,
      "home": false
    },
    {
      "id": "14-communication/delivery",
      "module": "communication",
      "slug": "delivery",
      "title": [
        "ประวัติส่งและการตั้งค่าลูกค้า",
        "Delivery log and preferences"
      ],
      "kind": "list",
      "collection": "delivery",
      "fields": [],
      "reference": "14-communication/delivery.png",
      "spec": "Mock delivery log queued/failed/simulated, recipient/channel/event/reference/retry reason, customer in-app/email transaction-promo preferences, no actual sent assertion.",
      "create": false,
      "home": false
    },
    {
      "id": "14-communication/inbox",
      "module": "communication",
      "slug": "inbox",
      "title": [
        "กล่องข้อความลูกค้าสัมพันธ์",
        "Customer support inbox"
      ],
      "kind": "chat",
      "collection": "conversations",
      "fields": [],
      "reference": "14-communication/inbox.png",
      "spec": "Three-column chat inbox conversation search/unread/open-resolved/assignee, messages, linked customer/products/orders/quotes/leads. Canned reply and reply composer, mock not active real-time.",
      "create": false,
      "home": true
    },
    {
      "id": "14-communication/replies",
      "module": "communication",
      "slug": "replies",
      "title": [
        "แก้ไขข้อความตอบกลับสำเร็จรูป",
        "Edit canned reply"
      ],
      "kind": "form",
      "collection": "replies",
      "fields": [
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "category",
          "label": [
            "หมวดธุรกิจบนเว็บไซต์",
            "Website business category"
          ],
          "type": "select",
          "options": [
            "green",
            "auto",
            "inst",
            "gas",
            "data",
            "warehouse"
          ],
          "required": true
        },
        {
          "key": "language",
          "label": [
            "ภาษาเนื้อหา",
            "Content language"
          ],
          "type": "select",
          "options": [
            "th",
            "en"
          ],
          "required": true
        },
        {
          "key": "message",
          "label": [
            "ข้อความภาษาไทย",
            "Thai message"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "messageEn",
          "label": [
            "ข้อความภาษาอังกฤษ",
            "English message"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "active",
          "label": [
            "เปิดใช้งาน",
            "Active"
          ],
          "type": "checkbox",
          "required": false
        }
      ],
      "reference": "14-communication/replies.png",
      "spec": "One populated canned-reply editor with title/category/Thai-English selector/content/status; list and blank create form are separate screens. One vertical management block per row.",
      "create": false,
      "home": false
    },
    {
      "id": "14-communication/template-create",
      "module": "communication",
      "slug": "template-create",
      "title": [
        "เพิ่มแม่แบบแจ้งเตือน",
        "Create notification template"
      ],
      "kind": "form",
      "collection": "templates",
      "fields": [
        {
          "key": "event",
          "label": [
            "เหตุการณ์",
            "Event"
          ],
          "type": "select",
          "options": [
            "order",
            "PO",
            "sourcing",
            "quote-ready",
            "quote-revised",
            "quote-expired",
            "survey",
            "job",
            "payment",
            "shipping",
            "invoice-due"
          ],
          "required": true
        },
        {
          "key": "channel",
          "label": [
            "ช่องทาง",
            "Channel"
          ],
          "type": "select",
          "options": [
            "in-app",
            "email"
          ],
          "required": true
        },
        {
          "key": "language",
          "label": [
            "ภาษาเนื้อหา",
            "Content language"
          ],
          "type": "select",
          "options": [
            "th",
            "en"
          ],
          "required": true
        },
        {
          "key": "subject",
          "label": [
            "หัวข้ออีเมล",
            "Email subject"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "message",
          "label": [
            "ข้อความภาษาไทย",
            "Thai message"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "purpose",
          "label": [
            "ประเภทข้อความ",
            "Message purpose"
          ],
          "type": "select",
          "options": [
            "transaction",
            "promotion"
          ],
          "required": true
        },
        {
          "key": "variables",
          "label": [
            "ตัวแปรแม่แบบ",
            "Template variables"
          ],
          "type": "text",
          "required": false
        }
      ],
      "reference": "14-communication/template-create.png",
      "spec": "Blank event/channel/language/subject/body/placeholders, transactional/promo category, preview recipient and save draft; mock no actual send.",
      "create": true,
      "home": false
    },
    {
      "id": "14-communication/template-edit",
      "module": "communication",
      "slug": "template-edit",
      "title": [
        "แก้ไขแม่แบบแจ้งเตือน",
        "Edit notification template"
      ],
      "kind": "form",
      "collection": "templates",
      "fields": [
        {
          "key": "event",
          "label": [
            "เหตุการณ์",
            "Event"
          ],
          "type": "select",
          "options": [
            "order",
            "PO",
            "sourcing",
            "quote-ready",
            "quote-revised",
            "quote-expired",
            "survey",
            "job",
            "payment",
            "shipping",
            "invoice-due"
          ],
          "required": true
        },
        {
          "key": "channel",
          "label": [
            "ช่องทาง",
            "Channel"
          ],
          "type": "select",
          "options": [
            "in-app",
            "email"
          ],
          "required": true
        },
        {
          "key": "language",
          "label": [
            "ภาษาเนื้อหา",
            "Content language"
          ],
          "type": "select",
          "options": [
            "th",
            "en"
          ],
          "required": true
        },
        {
          "key": "subject",
          "label": [
            "หัวข้ออีเมล",
            "Email subject"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "message",
          "label": [
            "ข้อความภาษาไทย",
            "Thai message"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "messageEn",
          "label": [
            "ข้อความภาษาอังกฤษ",
            "English message"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "purpose",
          "label": [
            "ประเภทข้อความ",
            "Message purpose"
          ],
          "type": "select",
          "options": [
            "transaction",
            "promotion"
          ],
          "required": true
        },
        {
          "key": "variables",
          "label": [
            "ตัวแปรแม่แบบ",
            "Template variables"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "14-communication/template-edit.png",
      "spec": "Populated quotation ready email TH/EN, revision/date placeholders, in-app copy, preview, preference constraints/version history.",
      "create": false,
      "home": false
    },
    {
      "id": "14-communication/template-list",
      "module": "communication",
      "slug": "template-list",
      "title": [
        "แม่แบบการแจ้งเตือน",
        "Notification templates"
      ],
      "kind": "list",
      "collection": "templates",
      "fields": [],
      "reference": "14-communication/template-list.png",
      "spec": "Event-based TH/EN templates order/PO/sourcing/quote-ready-revised-expired/survey/job/payment/shipping/invoice-due, in-app/email, transaction vs promo.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/audit",
      "module": "settings",
      "slug": "audit",
      "title": [
        "ประวัติการทำรายการ",
        "Audit history"
      ],
      "kind": "list",
      "collection": "audit",
      "fields": [],
      "reference": "15-settings/audit.png",
      "spec": "Search actor/action/entity/time; table before-after-reason/evidence for price/credit/refund/settings, scoped exports.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/bank-create",
      "module": "settings",
      "slug": "bank-create",
      "title": [
        "เพิ่มบัญชีรับเงิน",
        "Create receiving account"
      ],
      "kind": "form",
      "collection": "banks",
      "fields": [
        {
          "key": "bank",
          "label": [
            "ธนาคาร",
            "Bank"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "accountName",
          "label": [
            "ชื่อบัญชี",
            "Account name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "accountNumber",
          "label": [
            "เลขบัญชี",
            "Account number"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "branch",
          "label": [
            "สาขา",
            "Branch"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "currency",
          "label": [
            "สกุลเงิน",
            "Currency"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "active",
          "label": [
            "เปิดใช้งาน",
            "Active"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "effectiveDate",
          "label": [
            "วันที่มีผล",
            "Effective date"
          ],
          "type": "date",
          "required": true
        }
      ],
      "reference": "15-settings/bank-create.png",
      "spec": "Blank bank/account name/number/branch/currency/active/effective date and approval history, all mock; no assume TTB.",
      "create": true,
      "home": false
    },
    {
      "id": "15-settings/bank-edit",
      "module": "settings",
      "slug": "bank-edit",
      "title": [
        "แก้ไขบัญชีรับเงิน",
        "Edit receiving account"
      ],
      "kind": "form",
      "collection": "banks",
      "fields": [
        {
          "key": "bank",
          "label": [
            "ธนาคาร",
            "Bank"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "accountName",
          "label": [
            "ชื่อบัญชี",
            "Account name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "accountNumber",
          "label": [
            "เลขบัญชี",
            "Account number"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "branch",
          "label": [
            "สาขา",
            "Branch"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "currency",
          "label": [
            "สกุลเงิน",
            "Currency"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "active",
          "label": [
            "เปิดใช้งาน",
            "Active"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "effectiveDate",
          "label": [
            "วันที่มีผล",
            "Effective date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "15-settings/bank-edit.png",
      "spec": "Populated fictitious bank account masked number, effective date, history and reason; linked payment requests preserve old account snapshot.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/imports",
      "module": "settings",
      "slug": "imports",
      "title": [
        "นำเข้าเนื้อหาเว็บไซต์",
        "Import website content"
      ],
      "kind": "import",
      "collection": "imports",
      "fields": [],
      "reference": "15-settings/imports.png",
      "spec": "Import only website-owned content/taxonomy/media via template/upload/preview/errors. Do not import ERP SKU/brand/master price/stock. One active step and essential preview table as single block.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/integrations",
      "module": "settings",
      "slug": "integrations",
      "title": [
        "แผนการเชื่อมต่อระบบ",
        "Integration proposal"
      ],
      "kind": "integrations",
      "collection": "integrations",
      "fields": [],
      "reference": "15-settings/integrations.png",
      "spec": "Read-only proposal page warehouse/SAP/accounting/payment/shipping mappings and owners, status ยังไม่เชื่อมระบบจริง, unknown fields requiring customer confirmation; no live-connect button or actual credentials.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/overview",
      "module": "settings",
      "slug": "overview",
      "title": [
        "ตั้งค่า ผู้ใช้ และรายงาน",
        "Settings, staff and reports"
      ],
      "kind": "hub",
      "collection": "staff",
      "fields": [],
      "reference": "15-settings/overview.png",
      "spec": "Hub tiles shop/policies/staff/roles/audit/reports/imports/integrations future; no financial report access automatically from admin.",
      "create": false,
      "home": true
    },
    {
      "id": "15-settings/policies",
      "module": "settings",
      "slug": "policies",
      "title": [
        "แก้ไขนโยบายการค้า",
        "Commercial policies"
      ],
      "kind": "form",
      "collection": "policies",
      "fields": [
        {
          "key": "expiryPolicy",
          "label": [
            "อายุใบเสนอราคา",
            "Quotation validity"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "terms",
          "label": [
            "เงื่อนไข",
            "Terms"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "milestone",
          "label": [
            "งวดชำระ",
            "Payment milestone"
          ],
          "type": "select",
          "options": [
            "30/40/30",
            "100",
            "50/50"
          ],
          "required": true
        },
        {
          "key": "stackable",
          "label": [
            "ใช้ร่วมโปรโมชั่นได้",
            "Can stack with promotions"
          ],
          "type": "checkbox",
          "required": false
        },
        {
          "key": "effectiveDate",
          "label": [
            "วันที่มีผล",
            "Effective date"
          ],
          "type": "date",
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "15-settings/policies.png",
      "spec": "Quote validity/survey fee-deduction/payment plan30-40-30 calibration100 maintenance50-50/one coupon and stack policy/cancel-return rules, owner/effective date/version.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/reports",
      "module": "settings",
      "slug": "reports",
      "title": [
        "รายงานธุรกิจ",
        "Business reports"
      ],
      "kind": "dashboard",
      "collection": "orders",
      "fields": [],
      "reference": "15-settings/reports.png",
      "spec": "Manager explicitly allowed report reads, tabs order-vs-receipts/quote-conversion/lead-conversion/stock-reservation/aging/coupon/service-backlog, date/segment/scope filters; selected chart and source drilldown consistent.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/role-create",
      "module": "settings",
      "slug": "role-create",
      "title": [
        "เพิ่มบทบาท",
        "Create role"
      ],
      "kind": "form",
      "collection": "roles",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "description",
          "label": [
            "รายละเอียดภาษาไทย",
            "Thai description"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "dataScope",
          "label": [
            "ขอบเขตข้อมูล",
            "Data scope"
          ],
          "type": "select",
          "options": [
            "assigned",
            "warehouse",
            "all"
          ],
          "required": true
        }
      ],
      "reference": "15-settings/role-create.png",
      "spec": "Blank role name/description/source menu grants/action grants/report grants/data scopes, approver separation and save.",
      "create": true,
      "home": false
    },
    {
      "id": "15-settings/role-edit",
      "module": "settings",
      "slug": "role-edit",
      "title": [
        "แก้ไขบทบาท",
        "Edit role"
      ],
      "kind": "form",
      "collection": "roles",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "description",
          "label": [
            "รายละเอียดภาษาไทย",
            "Thai description"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "dataScope",
          "label": [
            "ขอบเขตข้อมูล",
            "Data scope"
          ],
          "type": "select",
          "options": [
            "assigned",
            "warehouse",
            "all"
          ],
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "15-settings/role-edit.png",
      "spec": "Warehouse role assigned-warehouse scope, receive-work/approve-into-queue/prepare/pack/book-round/ship/pickup permissions only under confirmed policy; payment and credit approval never granted by queue approval. ERP product/price/stock fields readonly. One module permissions group per stacked row, not giant dense matrix.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/roles",
      "module": "settings",
      "slug": "roles",
      "title": [
        "บทบาทและสิทธิ์",
        "Roles and permissions"
      ],
      "kind": "roles",
      "collection": "roles",
      "fields": [],
      "reference": "15-settings/roles.png",
      "spec": "Role matrix modules × read/create/edit/approve/export and customer/warehouse/assigned-job scopes; read-only no action permissions, financial reports explicit.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/shop-edit",
      "module": "settings",
      "slug": "shop-edit",
      "title": [
        "แก้ไขค่าร้านและข้อมูลปฏิบัติการ",
        "Shop settings"
      ],
      "kind": "form",
      "collection": "shop",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "nameEn",
          "label": [
            "ชื่อภาษาอังกฤษ",
            "English name"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "currency",
          "label": [
            "สกุลเงิน",
            "Currency"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "vat",
          "label": [
            "VAT ตัวอย่าง (%)",
            "Sample VAT (%)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "address",
          "label": [
            "ที่อยู่",
            "Address"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "maxKg",
          "label": [
            "น้ำหนักสูงสุด (กก.)",
            "Maximum weight (kg)"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "closedDates",
          "label": [
            "วันหยุดรับสินค้า",
            "Pickup closed dates"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "sequence",
          "label": [
            "รูปแบบเลขเอกสาร",
            "Document numbering"
          ],
          "type": "text",
          "required": true
        }
      ],
      "reference": "15-settings/shop-edit.png",
      "spec": "Shop TH/EN/currency THB/prototype VAT7%/seller document address/maximum order300kg/business calendar/expiry/number sequences; bank accounts and warehouse tabs, no About/Contact content.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/staff-create",
      "module": "settings",
      "slug": "staff-create",
      "title": [
        "เพิ่มพนักงาน",
        "Create staff member"
      ],
      "kind": "form",
      "collection": "staff",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "email",
          "label": [
            "อีเมล",
            "Email"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "invitation",
          "label": [
            "อีเมลเชิญพนักงาน (จำลอง)",
            "Staff invitation email (mock)"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "role",
          "label": [
            "บทบาท",
            "Role"
          ],
          "type": "select",
          "options": [
            "sales",
            "warehouse",
            "accounting",
            "credit",
            "engineer",
            "support",
            "admin",
            "manager"
          ],
          "required": true
        },
        {
          "key": "dataScope",
          "label": [
            "ขอบเขตข้อมูล",
            "Data scope"
          ],
          "type": "select",
          "options": [
            "assigned",
            "warehouse",
            "all"
          ],
          "required": true
        },
        {
          "key": "status",
          "label": [
            "สถานะ",
            "Status"
          ],
          "type": "select",
          "options": [
            "draft",
            "active",
            "inactive"
          ],
          "required": true
        }
      ],
      "reference": "15-settings/staff-create.png",
      "spec": "Blank name/work email/invitation/roles/warehouse or assigned customer scope/status, explicitly grant source/report access; no customer persona auth.",
      "create": true,
      "home": false
    },
    {
      "id": "15-settings/staff-edit",
      "module": "settings",
      "slug": "staff-edit",
      "title": [
        "แก้ไขพนักงานและสิทธิ์",
        "Edit staff access"
      ],
      "kind": "form",
      "collection": "staff",
      "fields": [
        {
          "key": "name",
          "label": [
            "ชื่อ",
            "Name"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "email",
          "label": [
            "อีเมล",
            "Email"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "role",
          "label": [
            "บทบาท",
            "Role"
          ],
          "type": "select",
          "options": [
            "sales",
            "warehouse",
            "accounting",
            "credit",
            "engineer",
            "support",
            "admin",
            "manager"
          ],
          "required": true
        },
        {
          "key": "dataScope",
          "label": [
            "ขอบเขตข้อมูล",
            "Data scope"
          ],
          "type": "select",
          "options": [
            "assigned",
            "warehouse",
            "all"
          ],
          "required": true
        },
        {
          "key": "status",
          "label": [
            "สถานะ",
            "Status"
          ],
          "type": "select",
          "options": [
            "draft",
            "active",
            "inactive"
          ],
          "required": true
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "15-settings/staff-edit.png",
      "spec": "Populated staff roles/scopes/status, audit before/after and reset link; accounting/credit actions independent admin.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/staff-list",
      "module": "settings",
      "slug": "staff-list",
      "title": [
        "พนักงาน",
        "Staff directory"
      ],
      "kind": "list",
      "collection": "staff",
      "fields": [],
      "reference": "15-settings/staff-list.png",
      "spec": "Staff separate customer identities, email/roles/assigned scopes/status/last login, add/edit/access reset link, no visible passwords.",
      "create": false,
      "home": false
    },
    {
      "id": "15-settings/warehouse-edit",
      "module": "settings",
      "slug": "warehouse-edit",
      "title": [
        "แก้ไขเวลารับสินค้าและรอบส่ง",
        "Pickup hours and dispatch cutoff"
      ],
      "kind": "form",
      "collection": "warehouseWeb",
      "fields": [
        {
          "key": "hours",
          "label": [
            "เวลาเปิดรับสินค้า",
            "Pickup hours"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "closedDates",
          "label": [
            "วันหยุดรับสินค้า",
            "Pickup closed dates"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "slotCapacity",
          "label": [
            "จำนวนการรับต่อช่วงเวลา",
            "Pickup slot capacity"
          ],
          "type": "number",
          "required": true
        },
        {
          "key": "cutoff",
          "label": [
            "เวลาปิดรับงาน",
            "Cutoff time"
          ],
          "type": "text",
          "required": false
        },
        {
          "key": "reason",
          "label": [
            "เหตุผล",
            "Reason"
          ],
          "type": "textarea",
          "required": true
        }
      ],
      "reference": "15-settings/warehouse-edit.png",
      "spec": "Read-only ERP Lam Luk Ka warehouse code/address/contact summary; edit only website pickup hours/closed dates/slot capacity and proposed delivery cutoff where agreed. Do not edit ERP warehouse master.",
      "create": false,
      "home": false
    },
    {
      "id": "14-communication/replies-list",
      "module": "communication",
      "slug": "replies-list",
      "title": [
        "ข้อความตอบกลับสำเร็จรูป",
        "Canned replies"
      ],
      "kind": "list",
      "collection": "replies",
      "fields": [],
      "reference": "14-communication/replies-list.png",
      "spec": "Simple canned-replies list: search/title/category/language/status/last updated. Add new reply and edit existing reply actions. No side-by-side editor on list page; editor is a separate page. Essential table columns only.",
      "create": false,
      "home": false
    },
    {
      "id": "14-communication/replies-create",
      "module": "communication",
      "slug": "replies-create",
      "title": [
        "เพิ่มข้อความตอบกลับสำเร็จรูป",
        "Create canned reply"
      ],
      "kind": "form",
      "collection": "replies",
      "fields": [
        {
          "key": "title",
          "label": [
            "ชื่อเรื่อง",
            "Title"
          ],
          "type": "text",
          "required": true
        },
        {
          "key": "category",
          "label": [
            "หมวดธุรกิจบนเว็บไซต์",
            "Website business category"
          ],
          "type": "select",
          "options": [
            "green",
            "auto",
            "inst",
            "gas",
            "data",
            "warehouse"
          ],
          "required": true
        },
        {
          "key": "language",
          "label": [
            "ภาษาเนื้อหา",
            "Content language"
          ],
          "type": "select",
          "options": [
            "th",
            "en"
          ],
          "required": true
        },
        {
          "key": "message",
          "label": [
            "ข้อความภาษาไทย",
            "Thai message"
          ],
          "type": "textarea",
          "required": true
        },
        {
          "key": "messageEn",
          "label": [
            "ข้อความภาษาอังกฤษ",
            "English message"
          ],
          "type": "textarea",
          "required": false
        },
        {
          "key": "active",
          "label": [
            "เปิดใช้งาน",
            "Active"
          ],
          "type": "checkbox",
          "required": false
        }
      ],
      "reference": "14-communication/replies-create.png",
      "spec": "New blank canned-reply form with title placeholder, category selector, Thai message editor and one-language selector for English, active toggle safe default. ONE vertical field per row, only essential fields; optional variables/help collapsed. Save draft and Cancel, no populated reply or adjacent list.",
      "create": true,
      "home": false
    }
  ],
  "modules": [
    {
      "id": "dashboard",
      "folder": "01-dashboard",
      "home": "01-dashboard/manager"
    },
    {
      "id": "catalog",
      "folder": "02-catalog",
      "home": "02-catalog/list"
    },
    {
      "id": "pricing",
      "folder": "03-pricing",
      "home": "03-pricing/list"
    },
    {
      "id": "inventory",
      "folder": "04-inventory",
      "home": "04-inventory/list"
    },
    {
      "id": "customers",
      "folder": "05-customers",
      "home": "05-customers/list"
    },
    {
      "id": "orders",
      "folder": "06-orders",
      "home": "06-orders/list"
    },
    {
      "id": "quotes",
      "folder": "07-quotes",
      "home": "07-quotes/list"
    },
    {
      "id": "services",
      "folder": "08-services",
      "home": "08-services/list"
    },
    {
      "id": "finance",
      "folder": "09-finance",
      "home": "09-finance/list"
    },
    {
      "id": "logistics",
      "folder": "10-logistics",
      "home": "10-logistics/bookings"
    },
    {
      "id": "marketing",
      "folder": "11-marketing",
      "home": "11-marketing/list"
    },
    {
      "id": "content",
      "folder": "12-content",
      "home": "12-content/list"
    },
    {
      "id": "documents",
      "folder": "13-documents",
      "home": "13-documents/list"
    },
    {
      "id": "communication",
      "folder": "14-communication",
      "home": "14-communication/inbox"
    },
    {
      "id": "settings",
      "folder": "15-settings",
      "home": "15-settings/overview"
    }
  ]
};
