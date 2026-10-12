"""Exercise every approved content route in both languages through the DC runtime."""
from pathlib import Path
import json, os, sys

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'verification/back-office'
sys.path.insert(0,str(OUT/'tools'))
from playwright.sync_api import sync_playwright, expect
BASE=os.environ.get('POLYTECH_BO_URL','http://127.0.0.1:8001/')
CHROME=os.environ.get('POLYTECH_TEST_CHROME',r'C:\Program Files\Google\Chrome\Application\chrome.exe')
source=(ROOT/'back-office/index.html').read_text(encoding='utf-8').replace('class Component extends DCLogic {','class Component extends DCLogic {\n constructor(props) { super(props); window.__qaApp=this; }',1)

with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=CHROME,headless=True)
 page=browser.new_page(viewport={'width':1600,'height':1100})
 errors=[];failed=[]
 page.on('pageerror',lambda e: errors.append(str(e)))
 page.on('response',lambda r: failed.append(r.url) if r.status>=400 and r.url.startswith(BASE) else None)
 page.route(BASE,lambda r:r.fulfill(body=source,content_type='text/html'))
 page.goto(BASE,wait_until='networkidle')
 page.get_by_role('button',name='เข้าสู่ระบบ',exact=True).click()
 expect(page.locator('.bo-workspace h1')).to_have_text('ภาพรวมผู้จัดการ')
 page.screenshot(path=str(OUT/'content-dashboard-th.png'),full_page=True)
 catalog=page.evaluate('window.BO_CATALOG.screens.map(p=>({id:p.id,title:p.title,module:p.module,kind:p.kind}))')
 count=0
 for lang in ['th','en']:
  page.evaluate('lang=>window.__qaApp.setLanguage(lang)',lang)
  for i,screen in enumerate(catalog):
   page.evaluate('id=>window.__qaApp.openScreen(id)',screen['id'])
   expect(page.locator('.bo-workspace h1')).to_have_text(screen['title'][lang=='en'])
   page.wait_for_function('document.querySelector(".bo-workspace .sc-placeholder")===null')
   assert page.locator('.bo-workspace .sc-missing').count()==0,screen['id']
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),screen['id']
   if lang=='th' and screen['id'] in ['02-catalog/list','02-catalog/edit','06-orders/detail','09-finance/review','10-logistics/booking-create','14-communication/inbox','15-settings/overview']:
    page.screenshot(path=str(OUT/('content-'+screen['id'].replace('/','-')+'.png')),full_page=True)
   count+=1
  print(f'PASS: {lang} {len(catalog)} content screens',flush=True)
 for w,h in [(768,1024),(375,812)]:
  page.set_viewport_size({'width':w,'height':h})
  for id in ['02-catalog/list','02-catalog/edit','01-dashboard/manager','14-communication/inbox','15-settings/overview']:
   page.evaluate('id=>window.__qaApp.openScreen(id)',id)
   expect(page.locator('.bo-workspace h1')).to_be_visible()
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(w,id)
  page.screenshot(path=str(OUT/f'content-mobile-{w}.png'),full_page=True)
 assert not errors,errors
 assert not failed,failed
 (OUT/'content-report.json').write_text(json.dumps({'passed':True,'screens':len(catalog),'route_checks':count,'languages':['th','en'],'viewports':[1600,768,375],'runtime_errors':errors,'fetch_errors':failed},indent=2),encoding='utf-8')
 browser.close()
print('PASS: all approved content screens render')
