from pathlib import Path
import sys
import json

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).parent
sys.path.insert(0, str(ROOT / 'verification/services/tools'))
from playwright.sync_api import sync_playwright, expect

BASE = 'http://127.0.0.1:8766/'
source = (ROOT / 'store-front/index.html').read_text(encoding='utf-8')
source = source.replace('class Component extends DCLogic {', 'class Component extends DCLogic {\n constructor(props) { super(props); window.__qaApp = this; }', 1)
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    page = browser.new_page(viewport={'width':1725,'height':1100}, ignore_https_errors=True)
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('requestfailed', lambda r: print('Request failed:', r.url, r.failure, flush=True))
    page.route(BASE, lambda route: route.fulfill(body=source, content_type='text/html'))
    page.goto(BASE, wait_until='networkidle')
    page.wait_for_function('window.__qaApp && document.querySelector("footer")')
    page.evaluate("() => { const a=window.__qaApp; clearInterval(a._hero); clearInterval(a._sync); clearInterval(a._tick); a.go('about'); }")
    for lang, heading in [('th','เกี่ยวกับเรา'),('en','About us')]:
        for acct in ['guest','partner']:
            page.evaluate('([lang,acct]) => window.__qaApp.setState({lang,acct})', [lang,acct])
            expect(page.locator('.pt-about h1')).to_have_text(heading)
            expect(page.locator('.pt-about-copy > p')).to_have_count(3)
            expect(page.locator('.pt-about dl')).to_have_count(0)
            assert '{{' not in page.locator('.pt-about').inner_text()
            page.wait_for_function("() => {const i=document.querySelector('.pt-about-figure img');return i && i.complete && i.naturalWidth>0}")
        for width in [390,768,1240,1725,2541]:
            page.set_viewport_size({'width':width,'height':1100})
            page.wait_for_timeout(200)
            figure=page.locator('.pt-about-figure').bounding_box()
            copy=page.locator('.pt-about-copy').bounding_box()
            if width>900:
                assert copy['x'] >= figure['x']+figure['width']
            else:
                assert copy['y'] >= figure['y']+figure['height']
            assert page.locator('.pt-about').evaluate('e => e.scrollWidth <= e.clientWidth')
            if width==1725:
                page.screenshot(path=str(OUT / f'about-{lang}.png'), full_page=True)
    response=page.request.get(BASE+'assets/about/industrial-hero.webp')
    assert response.status==200
    assert page.locator('.pt-about-hero-copy').evaluate("e => getComputedStyle(e,'::before').backdropFilter")=='blur(7px)'
    assert not errors, errors
    browser.close()
print(json.dumps({'languages':['th','en'],'viewports':[390,768,1240,1725,2541],'accounts':['guest','partner'],'pageErrors':errors}))
