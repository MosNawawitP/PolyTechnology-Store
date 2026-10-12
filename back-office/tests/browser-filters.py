"""All 15 menus use the shared filter block; filters affect scoped data and navigation."""
from pathlib import Path
import json, os, sys
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'verification/back-office';sys.path.insert(0,str(OUT/'tools'))
from playwright.sync_api import sync_playwright, expect
BASE=os.environ.get('POLYTECH_BO_URL','http://127.0.0.1:8001/')
CHROME=os.environ.get('POLYTECH_TEST_CHROME',r'C:\Program Files\Google\Chrome\Application\chrome.exe')
source=(ROOT/'back-office/index.html').read_text(encoding='utf-8').replace('class Component extends DCLogic {','class Component extends DCLogic {\n constructor(props) { super(props); window.__qaApp=this; }',1)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=CHROME,headless=True);g=b.new_page(viewport={'width':1600,'height':1100});errors=[];g.on('pageerror',lambda e:errors.append(str(e)))
 g.route(BASE,lambda r:r.fulfill(body=source,content_type='text/html'));g.goto(BASE,wait_until='networkidle');g.get_by_role('button',name='เข้าสู่ระบบ',exact=True).click();expect(g.locator('.bo-workspace')).to_be_visible()
 def settled():g.wait_for_function('document.querySelector(".bo-workspace .sc-placeholder")===null')
 def screen(id,record=''):
  g.evaluate('([id,record])=>window.__qaApp.openScreen(id,record)',[id,record]);expect(g.locator('.bo-screen-picker')).to_have_value(id);settled()
 menus=g.evaluate('window.BO_CATALOG.modules.map(m=>m.id)')
 for lang in ['th','en']:
  g.evaluate('lang=>window.__qaApp.setLanguage(lang)',lang)
  for menu in menus:
   g.evaluate('m=>window.__qaApp.selectMenu(m)',menu);settled();expect(g.locator('.bo-filter-block')).to_have_count(1);expect(g.locator('.bo-page-tabs')).to_have_count(0);expect(g.locator('.bo-filter-block input[type=search]')).to_have_count(1);assert g.evaluate('document.documentElement.scrollWidth<=innerWidth')
 g.get_by_role('button',name='TH',exact=True).click();screen('02-catalog/list');g.locator('[data-filter-key=brand]').select_option('Huawei');g.locator('.bo-filter-search input').fill('PLT-SUN-50KTL');expect(g.locator('.bo-data-table tbody tr')).to_have_count(1)
 g.locator('.bo-filter-block input[type=date]').first.fill('2026-10-10');expect(g.locator('.bo-data-table tbody tr')).to_have_count(0);g.get_by_role('button',name='ล้างตัวกรอง',exact=True).click();expect(g.locator('.bo-data-table tbody tr')).to_have_count(10);expect(g.locator('[data-filter-key=brand]')).to_have_value('');g.screenshot(path=str(OUT/'filters-catalog.png'),full_page=True)
 screen('06-orders/list');g.locator('[data-filter-key=customer]').select_option('C-02');assert g.evaluate('window.__qaApp.filteredRows().every(r=>r.customer==="C-02")');g.locator('.bo-filter-block select').nth(1).select_option('packed');assert g.evaluate('window.__qaApp.filteredRows().every(r=>r.fulfillment==="packed")');g.screenshot(path=str(OUT/'filters-orders.png'),full_page=True)
 screen('01-dashboard/manager');g.locator('.bo-filter-block input[type=date]').first.fill('2099-01-01');expect(g.locator('.bo-metric-card').first).to_contain_text('0.00');g.get_by_role('button',name='ล้างตัวกรอง',exact=True).click();expect(g.locator('.bo-metric-card').first).to_contain_text('2,480,000');g.screenshot(path=str(OUT/'filters-dashboard.png'),full_page=True)
 screen('02-catalog/edit','WEB-p1');g.locator('#field-title').fill('Unsaved title');g.locator('.bo-filter-search input').fill('แบรนด์');assert g.locator('.bo-screen-picker option').count()<20;expect(g.locator('#field-title')).to_have_value('Unsaved title');g.get_by_role('button',name='ล้างตัวกรอง',exact=True).click();expect(g.locator('#field-title')).to_have_value('Unsaved title');g.locator('.bo-screen-picker').select_option('02-catalog/brands');settled();expect(g.locator('.bo-workspace h1')).to_have_text('แบรนด์จาก ERP')
 screen('07-quotes/detail','QT-2569-0001');g.locator('.bo-filter-search input').fill('QT-2569-0002');expect(g.locator('.bo-filter-record option')).to_have_count(2);g.locator('.bo-filter-record select').select_option('QT-2569-0002');expect(g.locator('.bo-detail-heading')).to_contain_text('QT-2569-0002')
 screen('15-settings/reports');g.locator('.bo-filter-block select').filter(has=g.locator('option[value="service-backlog"]')).select_option('service-backlog');settled();assert g.locator('[data-filter-key=service]').count()==1
 g.get_by_role('button',name='เมนูบัญชีพนักงาน',exact=True).click();g.locator('#bo-persona').select_option('sales');screen('06-orders/list');assert set(g.locator('[data-filter-key=customer] option').evaluate_all('(options)=>options.map(o=>o.value).filter(Boolean)'))<= {'C-01','C-02'}
 for w in [768,375]:
  g.set_viewport_size({'width':w,'height':1000});assert g.evaluate('document.documentElement.scrollWidth<=innerWidth');g.screenshot(path=str(OUT/f'filters-{w}.png'),full_page=True)
 assert not errors,errors
 (OUT/'filters-report.json').write_text(json.dumps({'passed':True,'menus':len(menus),'languages':['th','en'],'checks':['no tabs in all menus','SKU/brand/date combined filters','clear and pagination reset','order customer and workflow status','dashboard metrics respond to date','task search preserves unsaved form','screen navigation via select','detail lookup','report-specific filters','role-scoped filter options','375/768/1600 layout'],'errors':errors},indent=2),encoding='utf-8');b.close()
print('PASS: all 15 menu filter blocks, data filters, task search, role scope and responsive layout')
