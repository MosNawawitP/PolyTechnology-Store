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
    page.route(BASE, lambda route: route.fulfill(body=source, content_type='text/html'))
    page.goto(BASE, wait_until='networkidle')
    page.wait_for_function('window.__qaApp && document.querySelector("footer")')
    page.evaluate("() => { const a=window.__qaApp; clearInterval(a._hero); clearInterval(a._sync); clearInterval(a._tick); a.go('contact'); }")
    for lang, heading in [('th','ติดต่อเรา'),('en','Contact us')]:
        for acct in ['guest','partner']:
            page.evaluate('([lang,acct]) => window.__qaApp.setState({lang,acct})', [lang,acct])
            expect(page.locator('.pt-contact h1')).to_have_text(heading)
            expect(page.locator('.pt-contact dl > div')).to_have_count(4)
            expect(page.locator('.pt-contact-phone')).to_have_attribute('href','tel:+6629605070')
            text = page.locator('.pt-contact').inner_text()
            for value in ['108/59','11120','+66 2 960 5070','sales@polytech.example','service@polytech.example','ar@polytech.example']:
                assert value in text
            assert '{{' not in text
        for width in [390,768,1240,1725,2541]:
            page.set_viewport_size({'width':width,'height':1100})
            page.wait_for_timeout(200)
            description=page.locator('.pt-contact-description').bounding_box()
            branch=page.locator('.pt-contact-branch').bounding_box()
            if width>900:
                assert branch['x'] >= description['x']+description['width']
            else:
                assert branch['y'] >= description['y']+description['height']
            assert page.locator('.pt-contact').evaluate('e => e.scrollWidth <= e.clientWidth')
            if width==1725:
                page.screenshot(path=str(OUT / f'contact-{lang}.png'), full_page=True)
        page.locator('.pt-contact button').click()
        page.wait_for_function("window.__qaApp.state.route.p === 'services'")
        page.evaluate("window.__qaApp.go('contact')")
    assert page.request.get(BASE+'assets/contact/customer-support.webp').status==200
    assert page.locator('.pt-contact .pt-about-hero-copy').evaluate("e => getComputedStyle(e,'::before').backdropFilter")=='blur(7px)'
    assert not errors, errors
    browser.close()
print(json.dumps({'languages':['th','en'],'viewports':[390,768,1240,1725,2541],'accounts':['guest','partner'],'contactRows':4,'consultationNavigation':'passed','pageErrors':errors}))
