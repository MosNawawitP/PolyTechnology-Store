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
    page = browser.new_page(viewport={'width':1725,'height':1100})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.route(BASE, lambda route: route.fulfill(body=source,content_type='text/html'))
    page.goto(BASE, wait_until='networkidle')
    page.wait_for_function('window.__qaApp && document.querySelector("footer")')
    page.evaluate('''() => { const a=window.__qaApp; clearInterval(a._hero); clearInterval(a._sync); clearInterval(a._tick); a.go('promos'); }''')
    cards = page.locator('article').filter(has=page.locator('img[src*="assets/promotions/"]'))
    for lang in ['th','en']:
        for acct in ['guest','walkin','bizNew','partner','gradeA']:
            page.evaluate('''([lang,acct]) => window.__qaApp.setState({lang,acct})''',[lang,acct])
            expect(cards).to_have_count(6)
            page.wait_for_function('''() => { const imgs=[...document.querySelectorAll('img[src*="assets/promotions/"]')]; return imgs.length===6 && imgs.every(i=>i.complete && i.naturalWidth>0); }''')
        page.screenshot(path=str(OUT / f'promotions-{lang}.png'), full_page=True)
    for width in [768,1240,1725,2541]:
        page.set_viewport_size({'width':width,'height':1100})
        page.wait_for_timeout(200)
        rects=cards.evaluate_all('(cards)=>cards.map(c=>c.getBoundingClientRect().toJSON())')
        assert rects[0]['y']==rects[1]['y']==rects[2]['y']
        assert rects[3]['y']==rects[4]['y']==rects[5]['y']
        assert rects[3]['y']>rects[0]['y']
        assert rects[2]['right']<=cards.first.evaluate("c => c.closest('.pt-container').getBoundingClientRect().right")
    for n,route in enumerate([{'p':'pdp','id':'p1'},{'p':'products','cat':'auto'},{'p':'pdp','id':'p3'},{'p':'services','svc':'s3'},{'p':'services','svc':'s4'},{'p':'products','cat':'dc'}]):
        page.evaluate("window.__qaApp.go('promos')")
        cards.nth(n).get_by_role('button').click()
        actual=page.evaluate('window.__qaApp.state.route')
        assert actual['p']==route['p'], (route,actual)
        for key in ['id','svc']:
            if key in route: assert actual[key]==route[key]
        if 'cat' in route: assert page.evaluate('window.__qaApp.state.filters.cat')==[route['cat']]
    assert not errors, errors
    browser.close()
print(json.dumps({'cards':6,'columns':3,'languages':['th','en'],'accounts':5,'navigationChecks':6,'pageErrors':errors}))
