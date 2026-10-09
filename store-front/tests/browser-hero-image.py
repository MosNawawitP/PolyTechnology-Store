"""Verify the first banner, including a failed WebP request, reload and carousel return."""
from pathlib import Path
import sys
import os
sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'verification'/'home-redesign'
sys.path.insert(0,str(OUT/'tools'))
from playwright.sync_api import sync_playwright, expect
BASE='http://127.0.0.1:8765/'
source=(ROOT/'store-front'/'index.html').read_text(encoding='utf-8')
source=source.replace('class Component extends DCLogic {','class Component extends DCLogic {\n constructor(props) { super(props); window.__qaApp=this; }',1)
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('POLYTECH_TEST_CHROME',r'C:\Program Files\Google\Chrome\Application\chrome.exe'),headless=True)
 for failed in [True,False]:
  for dpr in [1,2]:
   context=browser.new_context(viewport={'width':2544,'height':1303},device_scale_factor=dpr,reduced_motion='reduce')
   page=context.new_page(); errors=[]; blocked=[]
   page.on('pageerror',lambda e: errors.append(str(e)))
   page.route(BASE,lambda r:r.fulfill(body=source,content_type='text/html'))
   if failed:
    def fail_webp(route):
     blocked.append(route.request.url)
     route.fulfill(status=404,body='Image unavailable',content_type='text/plain')
    page.route('**/hero-industrial-commerce*.webp',fail_webp)
   def loaded():
    page.wait_for_function("document.querySelector('.pt-hero img')?.complete && document.querySelector('.pt-hero img').naturalWidth > 0",timeout=10000)
    if failed:
     assert page.locator('.pt-hero img').evaluate("img=>img.currentSrc.endsWith('hero-industrial-commerce.png') && !img.hasAttribute('srcset')"), 'Fallback must use the original PNG after clearing failed srcset'
   for attempt in range(2):
    page.goto(BASE,wait_until='networkidle')
    page.wait_for_function('window.__qaApp && document.querySelector(".pt-hero img")')
    page.evaluate('clearInterval(window.__qaApp._hero)')
    loaded()
    expect(page.get_by_role('heading',level=1)).to_contain_text('ครบทุกอุปกรณ์')
    page.get_by_role('button',name='สไลด์ถัดไป',exact=True).click()
    page.wait_for_function('window.__qaApp.state.heroIdx===1')
    page.wait_for_function("document.querySelector('.pt-hero img').complete && document.querySelector('.pt-hero img').naturalWidth > 0")
    page.get_by_role('button',name='สไลด์ก่อนหน้า',exact=True).click()
    page.wait_for_function('window.__qaApp.state.heroIdx===0')
    loaded()
   assert not errors,errors
   if failed: assert blocked, 'The missing-asset condition must be exercised'
   page.locator('.pt-hero').screenshot(path=str(OUT/f'hero-first-{"fallback" if failed else "normal"}-{dpr}x.png'))
   print(f'PASS: first banner, reload and carousel return; fallback={failed}, DPR={dpr}',flush=True)
   context.close()
 browser.close()
