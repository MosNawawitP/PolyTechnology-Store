"""Local browser verification with screenshots; requires playwright and installed Chrome."""
from pathlib import Path
import json
import os
import re
import subprocess
import sys
sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'verification' / 'home-redesign'
sys.path.insert(0, str(OUT / 'tools'))
from playwright.sync_api import sync_playwright, expect

BASE = 'http://127.0.0.1:8765/'
CHROME = os.environ.get('POLYTECH_TEST_CHROME', r'C:\Program Files\Google\Chrome\Application\chrome.exe')
current_index = (ROOT / 'store-front' / 'index.html').read_text(encoding='utf-8')

def original(filename):
    return subprocess.check_output(['git', 'show', 'HEAD:store-front/' + filename], cwd=ROOT).decode('utf-8')

def hook(source):
    # Test-only hook delivered by request interception; production files stay untouched.
    return source.replace('class Component extends DCLogic {', 'class Component extends DCLogic {\n  constructor(props) { super(props); window.__qaApp = this; }', 1)

def open_home(browser, width, baseline=False, lang='th'):
    context = browser.new_context(viewport={'width': max(1240,width) if baseline else width, 'height': 1000}, device_scale_factor=1, reduced_motion='reduce')
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.route(BASE, lambda r: r.fulfill(body=hook(original('index.html') if baseline else current_index), content_type='text/html'))
    if baseline:
        page.route(BASE + 'Home.dc.html', lambda r: r.fulfill(body=original('Home.dc.html'), content_type='text/html'))
    page.goto(BASE, wait_until='networkidle')
    page.wait_for_function('window.__qaApp && document.querySelector("footer")')
    page.evaluate('''lang => { const app = window.__qaApp; clearInterval(app._hero); clearInterval(app._sync); clearInterval(app._tick); app.setState({heroIdx:0, heroPaused:true, lang, acct:'guest', route:{p:'home'}}); }''', lang)
    expect(page.get_by_role('heading', level=1)).to_be_visible()
    page.evaluate("document.querySelectorAll('main img').forEach(img => img.loading = 'eager')")
    try:
        page.wait_for_function("Array.from(document.querySelectorAll('main img')).every(img => img.complete && img.naturalWidth > 0)", timeout=15000)
    except Exception:
        print('Image diagnostics:', page.evaluate("Array.from(document.querySelectorAll('main img')).filter(img=>!img.naturalWidth).map(img=>({src:img.src,complete:img.complete,display:getComputedStyle(img).display}))"), flush=True)
        page.screenshot(path=str(OUT / 'load-failure.png'), full_page=True)
        raise
    page.evaluate('document.fonts.ready')
    return context, page, errors

def metrics(page):
    return page.evaluate('''() => {
      const columns = selector => getComputedStyle(document.querySelector(selector)).gridTemplateColumns.split(' ').length;
      const home=document.querySelector('.pt-home');
      return {width:innerWidth, documentWidth:document.documentElement.scrollWidth, homeWidth:home.clientWidth, homeScrollWidth:home.scrollWidth,
        headerWidth:document.querySelector('header').clientWidth,
        contentWidth:document.querySelector('.pt-business-grid').clientWidth,
        categories:document.querySelectorAll('.pt-business-card').length,
        products:document.querySelectorAll('.pt-product-card').length,
        services:document.querySelectorAll('.pt-service-card').length,
        coupons:document.querySelectorAll('.pt-coupon').length,
        businessColumns:columns('.pt-business-grid'), productColumns:columns('.pt-product-grid'), serviceColumns:columns('.pt-service-grid'), couponColumns:columns('.pt-coupon-grid'),
        nestedButtons:document.querySelectorAll('button button').length,
        footer:document.querySelector('footer').outerHTML,
        footerStyle:['backgroundColor','color','padding','fontFamily','height','width'].map(p => getComputedStyle(document.querySelector('footer'))[p]),
        imageBytes:performance.getEntriesByType('resource').filter(r=>r.name.includes('/assets/homepage/')).map(r=>({url:r.name,size:r.transferSize}))};
    }''')

OUT.mkdir(parents=True, exist_ok=True)
report = []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME, headless=True)
    for width in [1240, 1440, 1920, 2541, 768]:
        context, page, errors = open_home(browser, width)
        m = metrics(page)
        assert m['homeScrollWidth'] <= m['homeWidth'], ('Home horizontal overflow', m)
        assert m['homeWidth'] == min(1680,max(1240,width)), 'Content must stay within the 1680px centered desktop shell'
        assert (m['businessColumns'],m['productColumns'],m['serviceColumns'],m['couponColumns']) == (3,4,5,3), 'Desktop columns must remain below 1240px'
        assert m['contentWidth'] >= min(1680,max(1240,width))-96, 'Shell padding must not exceed 48px each'
        assert (m['categories'], m['products'], m['services'], m['coupons']) == (6, 4, 5, 5), m
        if width >= 1240:
            tops = page.locator('.pt-product-card').evaluate_all('(cards)=>cards.map(c=>c.getBoundingClientRect().top)')
            assert max(tops)-min(tops) < 1, 'Recommended products must occupy one desktop row'
        assert abs(page.locator('.pt-home').bounding_box()['x'] - max(0,(width-1680)/2)) < 1, 'Desktop content must be centered'
        assert page.locator('.pt-hero img').evaluate('(img)=>img.complete && img.naturalWidth > 0'), 'Hero image must load'
        assert page.locator('.pt-hero').bounding_box()['height'] <= 500, 'Hero must remain proportional'
        assert m['nestedButtons'] == 0
        assert not errors, errors
        page.screenshot(path=str(OUT / f'home-{width}.png'), full_page=True)
        if width in [1440, 2541, 768]:
            page.locator('.pt-hero').screenshot(path=str(OUT / f'hero-{width}.png'))
            page.locator('.pt-business-grid').screenshot(path=str(OUT / f'business-{width}.png'))
            page.locator('.pt-services').screenshot(path=str(OUT / f'services-{width}.png'))
            page.locator('.pt-coupons').screenshot(path=str(OUT / f'coupons-{width}.png'))
        page.get_by_role('contentinfo').screenshot(path=str(OUT / f'footer-{width}.png'), style='div[style*="z-index:60"], div[style*="z-index: 60"] { visibility:hidden !important; }')
        baseline_context, baseline_page, baseline_errors = open_home(browser, width, baseline=True)
        assert not baseline_errors, baseline_errors
        baseline_footer = baseline_page.get_by_role('contentinfo')
        m['originalHeaderScrollWidth'] = baseline_page.locator('header').evaluate('(el)=>el.scrollWidth')
        m['currentHeaderScrollWidth'] = page.locator('header').evaluate('(el)=>el.scrollWidth')
        assert m['currentHeaderScrollWidth'] == max(width,1240), 'Header must fill the desktop layout width'
        assert m['documentWidth'] == max(width,1240), 'Page must only scroll below the intentional minimum width'
        old_footer = baseline_footer.evaluate('(el)=>el.outerHTML')
        # Runtime numbers hover-rule classes by registration order; compare their content separately from those IDs.
        normalize = lambda html: re.sub(r'\bscp\d+\b', 'runtime-hover-rule', html)
        if normalize(m['footer']) != normalize(old_footer):
            (OUT / 'footer-current.html').write_text(m['footer'], encoding='utf-8')
            (OUT / 'footer-original.html').write_text(old_footer, encoding='utf-8')
        assert normalize(m['footer']) == normalize(old_footer), 'Footer content changed'
        assert m['footerStyle'] == baseline_footer.evaluate("el=>['backgroundColor','color','padding','fontFamily','height','width'].map(p=>getComputedStyle(el)[p])"), 'Footer styling changed'
        baseline_footer.screenshot(path=str(OUT / f'footer-baseline-{width}.png'), style='div[style*="z-index:60"], div[style*="z-index: 60"] { visibility:hidden !important; }')
        from PIL import Image, ImageChops, ImageStat
        with Image.open(OUT / f'footer-{width}.png') as new, Image.open(OUT / f'footer-baseline-{width}.png') as old:
            # Element screenshots round fractional page positions to whole pixels.
            # Compare with a one-row alignment allowance, without changing the page's footer.
            assert new.width == old.width and abs(new.height-old.height) <= 1, 'Footer size changed'
            scores = []
            for new_top in [0, 1]:
                for old_top in [0, 1]:
                    height = min(new.height-new_top, old.height-old_top)
                    diff = ImageChops.difference(new.convert('RGB').crop((0,new_top,new.width,new_top+height)), old.convert('RGB').crop((0,old_top,old.width,old_top+height)))
                    scores.append(sum(ImageStat.Stat(diff).mean)/3)
            m['footerPixelMeanDifference'] = min(scores)
            assert min(scores) < 2, f'Footer visual difference at {width}px: {min(scores)}'
        baseline_context.close()
        m.pop('footer')
        report.append(m)
        context.close()

    context, page, errors = open_home(browser, 1440)
    # Every page uses the same fluid desktop shell, including after live resizes.
    route_widths = []
    for width in [2541, 1240, 768, 1920]:
        page.set_viewport_size({'width':width,'height':1000})
        page.wait_for_function('window.__qaApp.state.w === Math.max(1240,innerWidth)')
        for route in ['products','pdp','services','promos','about','contact','coupons','cart','checkout','rfq','register','success','account']:
            page.evaluate("route => window.__qaApp.go(route,{id:window.__qaApp.PRODUCTS[0].id})", route)
            shell = page.locator('main .pt-container').first
            expect(shell).to_be_visible()
            dimensions = shell.evaluate('(el)=>({width:el.clientWidth,padding:getComputedStyle(el).paddingLeft})')
            assert dimensions['width'] == min(1680,max(1240,width)), (route,width,dimensions)
            assert page.evaluate('document.documentElement.scrollWidth') == max(1240,width), (route,width,'unexpected overflow')
            route_widths.append({'route':route,'viewport':width,**dimensions})
    page.set_viewport_size({'width':1440,'height':1000})
    page.evaluate("window.__qaApp.go('home')")
    # Category click clears a previous incompatible filter, using real DOM events.
    page.evaluate("window.__qaApp.setState({filters:{...window.__qaApp.state.filters,grp:['solar'],brand:['Huawei']},search:'old query'})")
    page.get_by_role('button', name='ระบบก๊าซอุตสาหกรรม', exact=False).click()
    page.wait_for_function("window.__qaApp.state.route.p === 'products'")
    assert page.evaluate("window.__qaApp.filtered().every(p=>p.cat==='gas') && window.__qaApp.filtered().length>0")
    page.evaluate("window.__qaApp.go('home')")
    page.get_by_role('button', name='SVC-03', exact=False).click()
    page.wait_for_function("window.__qaApp.state.route.svc === 's3'")
    page.evaluate("window.__qaApp.go('home')")
    page.get_by_role('button', name='เพิ่มลงตะกร้า', exact=True).first.click()
    page.wait_for_function('window.__qaApp.state.cart.length === 1')
    assert page.evaluate("window.__qaApp.state.route.p === 'home'")
    page.get_by_role('button', name='เก็บคูปอง', exact=True).first.click()
    expect(page.get_by_role('dialog')).to_be_visible()
    page.evaluate("window.__qaApp.setState({loginModal:null,acct:'walkin'}); window.__qaApp.go('home')")
    page.get_by_role('button', name='เก็บคูปอง', exact=True).first.click()
    expect(page.get_by_role('button', name='เก็บแล้ว', exact=True)).to_be_disabled()
    page.reload(wait_until='networkidle')
    page.wait_for_function("window.__qaApp && window.__qaApp.state.acct === 'walkin'")
    expect(page.get_by_role('button', name='เก็บแล้ว', exact=True)).to_be_disabled()
    page.evaluate('window.__qaApp.resetDemo()')
    page.wait_for_function("window.__qaApp.state.acct==='guest' && window.__qaApp.state.cart.length===0")
    # Carousel manual next/previous is independent of the paused state.
    page.get_by_role('button', name='สไลด์ถัดไป', exact=True).click()
    page.wait_for_function('window.__qaApp.state.heroIdx===1')
    page.get_by_role('button', name='สไลด์ก่อนหน้า', exact=True).click()
    page.wait_for_function('window.__qaApp.state.heroIdx===0')
    assert not errors, errors
    context.close()

    for width in [2541, 768]:
        context, page, errors = open_home(browser, width, lang='en')
        m=metrics(page)
        assert m['homeScrollWidth'] <= m['homeWidth']
        expect(page.get_by_role('heading', name='Shop by business')).to_be_visible()
        page.screenshot(path=str(OUT / f'home-en-{width}.png'), full_page=True)
        page.locator('.pt-hero').screenshot(path=str(OUT / f'hero-en-{width}.png'))
        baseline_context, baseline_page, baseline_errors = open_home(browser, width, baseline=True, lang='en')
        new_footer = page.get_by_role('contentinfo').evaluate('(el)=>el.outerHTML')
        old_footer = baseline_page.get_by_role('contentinfo').evaluate('(el)=>el.outerHTML')
        assert re.sub(r'\bscp\d+\b','runtime-hover-rule',new_footer) == re.sub(r'\bscp\d+\b','runtime-hover-rule',old_footer)
        assert not baseline_errors, baseline_errors
        baseline_context.close()
        assert not errors, errors
        context.close()
    browser.close()

(OUT / 'browser-report.json').write_text(json.dumps({'status':'passed','viewports':report,'routeWidths':route_widths,'flows':['category filtering','service s3','add-to-cart stays on Home','guest coupon login','collect coupon','refresh persistence','reset demo','carousel arrows','TH/EN'],'footer':'Content and computed styles identical to HEAD; screenshots compared with one-row alignment allowance for fractional rasterization'}, ensure_ascii=False, indent=2), encoding='utf-8')
print('PASS: browser screenshots, 5 desktop/minimum widths and all page shells, TH/EN, category/service/cart/coupon flows, persistence, carousel, and unchanged footer content/styles with visual comparison')
