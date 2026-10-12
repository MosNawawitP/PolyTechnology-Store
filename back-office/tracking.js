// Customer projection only: no internal notes, staff identities, price or payment details.
(() => {
  const params=new URLSearchParams(location.search),type=params.get('type'),id=params.get('id');
  let lang=params.get('lang')==='en'?'en':'th',last='';
  const el=id=>document.getElementById(id),tx=p=>p?.[lang==='en'?1:0] || '',put=(id,p)=>{el(id).textContent=tx(p);};
  function render() {
    let row=null;
    try {const data=JSON.parse(localStorage.getItem('plt_bo_tracking_v1') || 'null');if(data?.version===1)row=data.records.find(r=>r.type===type&&r.id===id);}catch(_){}
    document.documentElement.lang=lang;
    el('tracking-th').setAttribute('aria-pressed',String(lang==='th'));el('tracking-en').setAttribute('aria-pressed',String(lang==='en'));
    put('tracking-title',['ติดตามสถานะรายการ','Track your record']);put('tracking-demo',['ตัวอย่างสถานะสำหรับลูกค้า (Mock)','Customer tracking preview (mock)']);
    put('tracking-status-label',['สถานะปัจจุบัน','Current status']);put('tracking-history-title',['ประวัติความคืบหน้า','Progress history']);
    put('tracking-help',['ข้อมูลจำลองในเบราว์เซอร์และเว็บไซต์เดียวกัน ลิงก์นี้ยังไม่ใช่ลิงก์ติดตามที่ส่งให้ลูกค้าใช้งานจริง การเชื่อมบัญชีลูกค้าและสิทธิ์เข้าถึงต้องใช้ระบบกลาง','Local browser and site demo. This is not a live customer tracking link. Customer account integration and access require a backend.']);
    el('tracking-reference').textContent=row?.id || id || '—';
    put('tracking-status',row?.label || ['ยังไม่มีข้อมูลรายการนี้','No tracking data for this record']);
    put('tracking-notice',!row?['เปิดรายการใน Back-office บนเบราว์เซอร์และ origin เดียวกันก่อน','Open the record in Back-office in the same browser and origin first']:row.blocked?['อยู่ระหว่างตรวจสอบความพร้อมก่อนดำเนินการต่อ','Readiness is being checked before the next step']:['สถานะนี้แสดงความคืบหน้าการดำเนินงาน สถานะชำระเงินแสดงแยกต่างหาก','This shows operational progress. Payment status is separate.']);
    el('tracking-steps').replaceChildren();
    el('tracking-steps').style.setProperty('--step-count',String(row?.steps?.length || 1));
    for(const [i,s] of (row?.steps || []).entries()) {
      const li=document.createElement('li');li.className='bo-step '+(s.current?'is-current':s.done?'is-complete':'is-future');if(s.current)li.setAttribute('aria-current','step');
      const mark=document.createElement('span');mark.className='bo-step-mark';mark.textContent=s.done?'✓':String(i+1);mark.setAttribute('aria-hidden','true');
      const label=document.createElement('strong');label.textContent=tx(s.label);li.append(mark,label);el('tracking-steps').append(li);
    }
    el('tracking-history').replaceChildren();
    for(const h of (row?.history || []).slice().reverse()) {
      const article=document.createElement('article'),label=document.createElement('strong'),time=document.createElement('small');label.textContent=tx(h.label);
      time.textContent=new Intl.DateTimeFormat(lang==='th'?'th-TH':'en-GB',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Bangkok'}).format(new Date(h.at));article.append(label,time);el('tracking-history').append(article);
    }
  }
  el('tracking-th').onclick=()=>{lang='th';render();};el('tracking-en').onclick=()=>{lang='en';render();};
  window.addEventListener('storage',e=>{if(e.key==='plt_bo_tracking_v1')render();});
  setInterval(()=>{const next=localStorage.getItem('plt_bo_tracking_v1');if(next!==last){last=next;render();}},1500);
  render();
})();
