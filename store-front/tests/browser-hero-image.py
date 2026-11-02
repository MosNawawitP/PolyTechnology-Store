from pathlib import Path
import sys,json
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'verification/home-redesign/tools'))
from playwright.sync_api import sync_playwright,expect
OUT=ROOT/'verification/hero-campaigns'
OUT.mkdir(parents=True,exist_ok=True)
BASE='http://127.0.0.1:8765/'
source=(ROOT/'store-front/index.html').read_text(encoding='utf-8').replace('class Component extends DCLogic {','class Component extends DCLogic {\n constructor(props) { super(props); window.__qaApp=this; }',1)
report=[]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe',headless=True)
    for fallback,dpr in [(False,1),(True,1),(True,2)]:
        context=browser.new_context(viewport={'width':1440,'height':1000},device_scale_factor=dpr,reduced_motion='reduce')
        page=context.new_page(); errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.route(BASE,lambda r:r.fulfill(body=source,content_type='text/html'))
        if fallback:
            page.route('**/campaigns/*.webp',lambda r:r.fulfill(status=404,body='Missing image'))
        page.goto(BASE,wait_until='networkidle')
        page.wait_for_function('window.__qaApp && document.querySelector(".pt-hero-trust")')
        page.evaluate('clearInterval(window.__qaApp._hero); clearInterval(window.__qaApp._sync)')
        page.evaluate('document.fonts.ready')
        assert page.evaluate('window.__qaApp.homeHeroSlides().length')==5
        for width in ([1240,1440,1920,2541,768] if not fallback else [1440]):
            page.set_viewport_size({'width':width,'height':1000})
            for lang in (['th','en'] if not fallback else ['th']):
                for index in range(5):
                    page.evaluate('args=>window.__qaApp.setState({heroIdx:args.index,lang:args.lang})',{'index':index,'lang':lang})
                    page.wait_for_function('''()=>{const a=window.__qaApp;const image=document.querySelector('.pt-hero img');return image.complete&&image.naturalWidth>0&&image.currentSrc.includes(a.homeHeroSlides()[a.state.heroIdx].asset.split('/').pop());}''')
                    expect(page.get_by_role('heading',level=1)).to_be_visible()
                    assert '{{' not in page.locator('.pt-hero').inner_text()
                    assert page.locator('.pt-shortcut').count()==0
                    assert page.locator('.pt-hero-benefit').count()==0
                    assert page.locator('.pt-hero-trust > div').count()==3
                    assert page.evaluate('document.documentElement.scrollWidth')==max(1240,width)
                    hero=page.locator('.pt-hero').bounding_box()
                    body=page.locator('.pt-hero-body').bounding_box()
                    heading=page.get_by_role('heading',level=1).bounding_box()
                    cta=page.locator('.pt-hero-actions').bounding_box()
                    trust=page.locator('.pt-hero-trust').bounding_box()
                    assert cta['y']+cta['height']<=trust['y'],(width,lang,index,'CTA overlaps assurance row')
                    assert heading['y']>=hero['y'] and cta['y']+cta['height']<=hero['y']+hero['height']
                    if fallback:
                        assert page.locator('.pt-hero img').evaluate("i=>i.currentSrc.endsWith('.png')&&!i.hasAttribute('srcset')")
                    if not fallback and width==1440:
                        page.evaluate('window.scrollTo(0,0)')
                        page.locator('.pt-hero').screenshot(path=str(OUT/f'hero-{index}-{lang}.png'),style='header { visibility:hidden !important; }')
                    report.append({'width':width,'lang':lang,'index':index,'fallback':fallback,'dpr':dpr})
        assert not errors,errors
        if not fallback:
            page.evaluate("window.__qaApp.setState({heroIdx:0,lang:'th'})")
            page.set_viewport_size({'width':1440,'height':1000})
            page.evaluate('window.scrollTo(0,0)')
            page.evaluate('window.scrollTo(0,0)')
            page.screenshot(path=str(OUT/'home-1440.png'),full_page=True)
            page.evaluate("window.__qaApp.setState({heroIdx:4})")
            page.locator('.pt-hero-actions .pt-button').first.click()
            page.wait_for_function("window.__qaApp.state.route.p==='products'")
            assert page.evaluate("window.__qaApp.filtered().every(p=>p.grp==='auto')")
        context.close()
    (OUT/'report.json').write_text(json.dumps({'cases':report,'errors':[]},indent=2),encoding='utf-8')
    print('PASS:',len(report),'slide/viewport/language/fallback cases; campaign CTA routes correctly')
    browser.close()
