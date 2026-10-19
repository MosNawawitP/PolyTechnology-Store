"""Verify carrier logos in the checkout delivery step using installed Chrome."""
from pathlib import Path
import os
import sys

ROOT = Path(__file__).resolve().parents[2]
TOOLS = ROOT / 'verification' / 'home-redesign' / 'tools'
sys.path.insert(0, str(TOOLS))

from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('POLYTECH_TEST_BASE', 'http://127.0.0.1:8765/').rstrip('/') + '/'
CHROME = os.environ.get('POLYTECH_TEST_CHROME', r'C:\Program Files\Google\Chrome\Application\chrome.exe')
OUT = Path(os.environ.get('TEMP', str(ROOT / 'verification'))) / 'polytech-carrier-logos'
INDEX = (ROOT / 'store-front' / 'index.html').read_text(encoding='utf-8')


def expose_component(source):
    return source.replace(
        'class Component extends DCLogic {',
        'class Component extends DCLogic {\n  constructor(props) { super(props); window.__qaApp = this; }',
        1,
    )


OUT.mkdir(parents=True, exist_ok=True)
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=CHROME, headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, device_scale_factor=1)
    page = context.new_page()
    page_errors = []
    failed_requests = []
    page.on('pageerror', lambda error: page_errors.append(str(error)))
    page.on('requestfailed', lambda request: failed_requests.append(request.url))
    page.route(BASE, lambda route: route.fulfill(body=expose_component(INDEX), content_type='text/html'))
    page.goto(BASE, wait_until='networkidle')
    page.wait_for_function('window.__qaApp && document.querySelector("footer")')
    page.evaluate("""() => {
      const app = window.__qaApp;
      clearInterval(app._hero);
      clearInterval(app._sync);
      clearInterval(app._tick);
      app.setState({
        acct:'walkin',
        cart:[{id:'p5',q:1}],
        route:{p:'checkout'},
        ck:{...app.state.ck,step:2,mode:'delivery',carrier:'c1'},
        api:{...app.state.api,carriers:'done'},
      });
    }""")

    heading = page.get_by_role('heading', name='วิธีรับสินค้าและการจัดส่ง')
    expect(heading).to_be_visible()
    logos = page.locator('img[alt$=" logo"]')
    expect(logos).to_have_count(4)
    page.wait_for_function("""() => Array.from(document.querySelectorAll('img[alt$=" logo"]'))
      .every(image => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0)""")

    page.evaluate("window.__qaApp.setState({cart:[{id:'p5',q:10}]})")
    own_logo = page.get_by_alt_text('จัดส่งโดย Polytechnology logo')
    expect(own_logo).to_be_visible()
    logo_bounds = own_logo.evaluate("""image => {
      const imageRect = image.getBoundingClientRect();
      const frameRect = image.parentElement.getBoundingClientRect();
      return {
        frameWidth:frameRect.width,
        frameHeight:frameRect.height,
        frame:[frameRect.left, frameRect.top, frameRect.right, frameRect.bottom],
        image:[imageRect.left, imageRect.top, imageRect.right, imageRect.bottom],
        contained:imageRect.left >= frameRect.left && imageRect.top >= frameRect.top
          && imageRect.right <= frameRect.right && imageRect.bottom <= frameRect.bottom,
      };
    }""")
    assert logo_bounds['frameWidth'] == 96 and logo_bounds['frameHeight'] == 76, logo_bounds
    assert logo_bounds['contained'], logo_bounds
    assert not page_errors, page_errors
    assert not [url for url in failed_requests if '/assets/carriers/' in url], failed_requests

    page.screenshot(path=str(OUT / 'checkout-polytechnology-delivery.png'), full_page=True)
    context.close()
    browser.close()

print('PASS: checkout displays four loaded carrier logo images')
