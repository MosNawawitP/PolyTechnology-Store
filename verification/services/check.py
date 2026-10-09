from pathlib import Path
import sys
import json

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).parent / 'tools'))
from playwright.sync_api import sync_playwright, expect

BASE = 'http://127.0.0.1:8766/'
source = (ROOT / 'store-front/index.html').read_text(encoding='utf-8')
source = source.replace('class Component extends DCLogic {', 'class Component extends DCLogic {\n constructor(props) { super(props); window.__qaApp = this; }', 1)
results = []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    page = browser.new_page(viewport={'width':1725,'height':1000})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.route(BASE, lambda route: route.fulfill(body=source, content_type='text/html'))
    page.goto(BASE, wait_until='networkidle')
    page.wait_for_function('window.__qaApp && document.querySelector("footer")')
    page.evaluate('''() => { const app = window.__qaApp; clearInterval(app._hero); clearInterval(app._sync); clearInterval(app._tick); app.go('services', {svc:'s1'}); }''')
    image = page.locator('img[src*="assets/services/"]')
    for lang in ['th','en']:
        for account in ['guest','partner']:
            page.evaluate('''([lang,account]) => window.__qaApp.setState({lang,acct:account})''', [lang,account])
            for n in range(1,6):
                page.locator('button[aria-pressed]').filter(has_text=f'SVC-0{n}').click()
                expect(image).to_have_attribute('alt', page.get_by_role('heading',level=2).first.inner_text())
                page.wait_for_function('''() => { const img=document.querySelector('img[src*="assets/services/"]'); return img && img.complete && img.naturalWidth>0; }''')
                results.append({'lang':lang,'account':account,'service':n,'src':image.get_attribute('src')})
    page.locator('#svcType').select_option('s1')
    expect(image).to_have_attribute('src','./assets/services/consulting-design.webp')
    for width in [768,1240,1725,2541]:
        page.set_viewport_size({'width':width,'height':1000})
        page.wait_for_timeout(200)
        bounds=page.evaluate('''() => { const img=document.querySelector('img[src*="assets/services/"]'); const heading=document.querySelector('h2'); return {image:img.getBoundingClientRect().toJSON(), heading:heading.getBoundingClientRect().toJSON()}; }''')
        assert bounds['image']['x'] > bounds['heading']['x']
        page.screenshot(path=str(Path(__file__).parent / f'services-{width}.png'), full_page=True)
    assert not errors, errors
    browser.close()
print(json.dumps({'checked':len(results),'consoleErrors':errors,'results':results},ensure_ascii=False))
