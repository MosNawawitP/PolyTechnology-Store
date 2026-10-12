"""Exercise the actual DC templates and mock authentication in installed Chrome."""
from pathlib import Path
import json
import os
import sys

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'verification' / 'back-office'
sys.path.insert(0, str(OUT / 'tools'))
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('POLYTECH_BO_URL', 'http://127.0.0.1:8001/')
CHROME = os.environ.get('POLYTECH_TEST_CHROME', r'C:\Program Files\Google\Chrome\Application\chrome.exe')
source = (ROOT / 'back-office' / 'index.html').read_text(encoding='utf-8')
source = source.replace('class Component extends DCLogic {', 'class Component extends DCLogic {\n constructor(props) { super(props); window.__qaApp = this; }', 1)
OUT.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME, headless=True)
    page = browser.new_page(viewport={'width':1440, 'height':1000})
    errors = []
    failed = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('response', lambda r: failed.append(r.url) if r.status >= 400 and r.url.startswith(BASE) else None)
    page.route(BASE, lambda route: route.fulfill(body=source, content_type='text/html'))
    page.goto(BASE, wait_until='networkidle')
    expect(page.get_by_role('heading', name='เข้าสู่ระบบพนักงาน')).to_be_visible()
    assert page.locator('#staff-email').input_value() == 'staff@polytechnology.demo'
    assert page.locator('#staff-password').input_value() == 'PolytechDemo!'
    assert page.locator('.brand img').evaluate('(e) => e.complete && e.naturalWidth > 0')
    for width, height in [(1440,1000), (768,1024), (375,812)]:
        page.set_viewport_size({'width':width, 'height':height})
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        expect(page.get_by_role('button', name='เข้าสู่ระบบ', exact=True)).to_be_visible()
        page.screenshot(path=str(OUT / f'login-th-{width}.png'), full_page=True)
    page.get_by_role('button', name='EN', exact=True).click()
    expect(page.get_by_role('heading', name='Staff sign in')).to_be_visible()
    assert page.locator('html').get_attribute('lang') == 'en'
    page.reload(wait_until='networkidle')
    expect(page.get_by_role('heading', name='Staff sign in')).to_be_visible()
    page.set_viewport_size({'width':1440, 'height':1000})
    page.screenshot(path=str(OUT / 'login-en-1440.png'), full_page=True)
    page.locator('#staff-email').fill('')
    page.locator('#staff-password').fill('')
    page.get_by_role('button', name='Sign in', exact=True).click()
    expect(page.get_by_text('Enter your staff email', exact=True)).to_be_visible()
    expect(page.get_by_text('Enter your password', exact=True)).to_be_visible()
    page.locator('#staff-email').fill('invalid-email')
    page.get_by_role('button', name='Sign in', exact=True).click()
    expect(page.get_by_text('Enter a valid email address')).to_be_visible()
    page.locator('#staff-email').fill('unknown@example.com')
    page.locator('#staff-password').fill('wrong')
    page.get_by_role('button', name='Show password', exact=True).click()
    expect(page.locator('#staff-password')).to_have_attribute('type','text')
    page.get_by_role('button', name='Hide password', exact=True).click()
    expect(page.locator('#staff-password')).to_have_attribute('type','password')
    for attempt in range(5):
        page.get_by_role('button', name='Sign in', exact=True).click()
        expect(page.get_by_role('button', name='Signing in…')).to_be_disabled()
        if attempt < 4:
            expect(page.get_by_role('alert')).to_have_text('Incorrect email or password')
        else:
            expect(page.get_by_role('alert')).to_have_text('Too many attempts. Please wait and try again')
    expect(page.get_by_role('button', name='Sign in', exact=True)).to_be_disabled()
    page.evaluate('window.__qaApp.setState({lockedUntil:0,now:Date.now()})')
    page.locator('#staff-email').fill('staff@polytechnology.demo')
    page.locator('#staff-password').fill('PolytechDemo!')
    page.locator('#staff-password').press('Enter')
    expect(page.locator('.bo-shell')).to_be_visible()
    expect(page.locator('.bo-workspace h1')).to_have_text('Manager overview')
    assert page.evaluate('window.__qaApp.state.password') == ''
    page.get_by_role('button', name='Sign out', exact=True).click()
    expect(page.locator('#staff-password')).to_have_value('')
    page.get_by_role('button', name='Forgot password?').click()
    expect(page.get_by_role('heading', name='Forgot password')).to_be_visible()
    page.get_by_role('button', name='Send reset link', exact=True).click()
    expect(page.get_by_text('Enter your staff email', exact=True)).to_be_visible()
    page.locator('#staff-email').fill('unknown@example.com')
    page.get_by_role('button', name='Send reset link', exact=True).click()
    expect(page.get_by_role('status')).to_have_text('If this email belongs to an active account, a password reset link will be sent')
    expect(page.get_by_role('button', name='Resend in')).to_be_disabled()
    page.screenshot(path=str(OUT / 'forgot-en.png'), full_page=True)
    page.get_by_role('button', name='Back to sign in', exact=True).click()
    page.get_by_role('button', name='TH', exact=True).click()
    expect(page.get_by_role('heading', name='เข้าสู่ระบบพนักงาน')).to_be_visible()
    assert '{{' not in page.locator('body').inner_text()
    assert not errors, errors
    assert not failed, failed
    (OUT / 'browser-report.json').write_text(json.dumps({'passed':True, 'viewports':[1440,768,375], 'languages':['th','en'], 'checks':['validation','password toggle','invalid credentials','loading','rate limit','sign in via Enter','sign out','forgot password','resend cooldown','language persistence','no unresolved bindings','no runtime or local fetch errors']}, indent=2), encoding='utf-8')
    browser.close()
print('PASS: staff authentication browser checks (TH/EN, desktop/tablet/mobile)')
