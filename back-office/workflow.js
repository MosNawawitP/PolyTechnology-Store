// Sequential operational workflows. Issued document amounts and lines remain immutable.
(() => {
  const step=(code,th,en,roles=[])=>({code,label:[th,en],roles});
  const definitions={
    orders:{module:'orders',steps:[step('submitted','รับคำสั่งซื้อ','Order received'),step('confirmed','ยืนยันคำสั่งซื้อ','Order confirmed',['sales']),step('incoming','ส่งงานให้คลัง','Sent to warehouse',['sales']),step('preparing','กำลังจัดเตรียม','Preparing',['warehouse']),step('packed','แพ็กพร้อมส่ง','Packed',['warehouse']),step('shipped','จัดส่งแล้ว','Shipped',['warehouse']),step('delivered','ส่งมอบแล้ว','Delivered',['support'])]},
    rfqs:{module:'quotes',steps:[step('submitted','รับ RFQ','RFQ received'),step('review','ตรวจความต้องการ','Requirements reviewed',['sales']),step('prepared','จัดทำข้อมูลเสนอราคา','Pricing prepared',['engineer','sales']),step('quoted','มีใบเสนอราคาแล้ว','Quotation available',['sales'])]},
    quotes:{module:'quotes',steps:[step('review','ตรวจข้อมูลเสนอราคา','Quotation reviewed'),step('ready','ฉบับพร้อมส่ง','Revision ready',['sales']),step('sent','ส่งให้ลูกค้าแล้ว','Sent to customer',['sales']),step('accepted','ลูกค้าตอบรับแล้ว','Customer accepted',['sales']),step('ordered','ยืนยันเป็นคำสั่งซื้อ','Converted to order',['sales'])]},
    jobs:{module:'services',steps:[step('pending','รับคำสั่งงาน','Job received'),step('approved','ยืนยันขอบเขตงาน','Scope approved',['sales']),step('scheduled','นัดหมายแล้ว','Scheduled',['engineer']),step('working','กำลังดำเนินงาน','Working',['engineer']),step('testing','กำลังทดสอบ','Testing',['engineer']),step('handover','รอลูกค้าตรวจรับ','Awaiting acceptance',['engineer']),step('done','ส่งมอบงานแล้ว','Work delivered',['engineer'])]}
  };
  const roles={sales:['ฝ่ายขาย','Sales'],warehouse:['คลังสินค้า / จัดส่ง','Warehouse / dispatch'],engineer:['ทีมบริการ / วิศวกร','Service / engineer'],support:['ลูกค้าสัมพันธ์','Customer support'],accounting:['บัญชี','Accounting'],credit:['สินเชื่อ','Credit'],customer:['ลูกค้า','Customer']};
  function resolve(type,row) {
    const def=definitions[type];if(!def || !row)return null;
    let code=type==='orders'?(row.status==='submitted'?'submitted':row.fulfillment || row.status):type==='jobs'?row.progress || row.status:row.status;
    if(type==='orders' && code==='completed')code='delivered';
    if(type==='jobs' && code==='submitted')code='pending';
    const terminal=['cancelled','rejected','expired','void','returned'].includes(row.status);
    const index=def.steps.findIndex(s=>s.code===code);
    return {...def,type,code,index,terminal,unknown:index<0 && !terminal,current:index>=0?def.steps[index]:null,next:!terminal && index>=0?def.steps[index+1] || null:null};
  }
  function publicRecord(type,row) {
    const f=resolve(type,row);if(!f)return null;
    const last=row.workflowHistory?.at(-1);
    const label=f.current?.label || ({expired:['หมดอายุ','Expired'],rejected:['ปฏิเสธ','Rejected'],cancelled:['ยกเลิก','Cancelled'],returned:['คืนสินค้า','Returned'],void:['ยกเลิกฉบับ','Voided']}[row.status]) || ['รอตรวจสอบสถานะ','Status awaiting review'];
    return {type,id:row.id,state:f.code,label,blocked:type==='orders'&&!!row.holds?.length,updatedAt:last?.at || null,steps:f.steps.map((s,i)=>({label:s.label,done:!f.terminal&&i<f.index,current:!f.terminal&&i===f.index})),history:(row.workflowHistory || []).map(h=>({at:h.at,label:f.steps.find(s=>s.code===h.to)?.label || label}))};
  }
  // Orders own progress; logistics records mirror it rather than maintaining separate stages.
  function reconcile(records, importLegacy=false) {
    const result={...records,orders:records.orders.map(o=>({...o})),bookings:[...records.bookings],shipments:[...records.shipments],pickups:[...records.pickups]};
    for(const order of result.orders) {
      if(importLegacy) {
        const shipment=result.shipments.find(r=>r.order===order.id && r.status!=='cancelled');
        if(shipment)for(const key of ['carrier','dispatchDate','tracking','eta'])if(!order[key] && shipment[key])order[key]=shipment[key];
      }
      const f=resolve('orders',order),stage=f.code,active=!f.terminal && ['packed','shipped','delivered'].includes(stage);
      const uniqueId=(prefix,list)=>{const base=prefix+'-'+order.id;let id=base,n=1;while(list.some(r=>r.id===id))id=base+'-'+n++;return id;};
      const common={order:order.id,customer:order.customer,owner:order.owner,warehouse:order.warehouse,weight:order.weight,orderStage:stage};
      const mirror={...common,carrier:order.carrier || '',dispatchDate:order.dispatchDate || '',tracking:order.tracking || '',eta:order.eta || ''};
      const pickup=order.deliveryMethod==='pickup';
      if(active && !pickup && !result.bookings.some(r=>r.order===order.id && r.status!=='cancelled'))result.bookings.push({id:uniqueId('BK',result.bookings),name:[order.id,order.id],date:order.date,auto:true,status:'pending',...mirror});
      if(active && !pickup && (stage!=='packed' || order.tracking) && !result.shipments.some(r=>r.order===order.id && r.status!=='cancelled'))result.shipments.push({id:uniqueId('SHIP',result.shipments),name:[order.id,order.id],date:order.date,qty:order.lines?.reduce((n,l)=>n+Number(l.qty || 0),0) || 1,...mirror});
      if(active && pickup && !result.pickups.some(r=>r.order===order.id && r.status!=='cancelled'))result.pickups.push({id:uniqueId('PU',result.pickups),name:[order.id,order.id],date:order.pickupDate || '',...common});
      result.bookings=result.bookings.map(r=>r.order!==order.id || r.status==='cancelled'?r:{...r,...mirror,status:f.terminal || pickup?'cancelled':stage==='delivered'?'delivered':stage==='shipped'?'shipped':order.holds?.length?'blocked':r.round?'assigned':'pending'});
      result.shipments=result.shipments.map(r=>r.order!==order.id || r.status==='cancelled'?r:{...r,...mirror,status:f.terminal || pickup?'cancelled':stage==='delivered'?'delivered':stage==='shipped'?'shipped':'draft',evidence:order.deliveryEvidence || r.evidence || ''});
      result.pickups=result.pickups.map(r=>r.order!==order.id || r.status==='cancelled'?r:{...r,...common,date:order.pickupDate || r.date,slot:order.pickupSlot || r.slot,recipient:order.pickupRecipient || r.recipient,phone:order.pickupPhone || r.phone,evidence:order.deliveryEvidence || r.evidence || '',status:f.terminal || !pickup?'cancelled':stage==='delivered'?'delivered':stage==='shipped'?'shipped':stage==='packed'?'ready':'scheduled'});
    }
    return result;
  }
  window.BO_WORKFLOW={definitions,roles,resolve,publicRecord,reconcile,trackingKey:'plt_bo_tracking_v1'};
})();
