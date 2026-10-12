"""Regression: a login tab opened before the shared shell was introduced."""
from pathlib import Path
import json
import os
import sys

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'verification' / 'back-office'
sys.path.insert(0,str(OUT / 'tools'))
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('POLYTECH_BO_URL','http://127.0.0.1:8001/')
CHROME = os.environ.get('POLYTECH_TEST_CHROME',r'C:\Program Files\Google\Chrome\Application\chrome.exe')
source = (ROOT / 'back-office' / 'index.html').read_text(encoding='utf-8')
# Recreate the previous entry's auth wrapper and its route/import after sign-in.
legacy = source.replace('  <sc-if value="{{ isAuth }}">','',1)
legacy = legacy.replace('  </sc-if>\n  <sc-if value="{{ isWorkspace }}"><dc-import name="LayoutShell" dcProps="{{ all }}"></dc-import></sc-if>','',1)
legacy = legacy.replace('    </main>','      <sc-if value="{{ isLegacySuccess }}"><dc-import name="LoginSuccess" dcProps="{{ all }}"></dc-import></sc-if>\n    </main>',1)
legacy = legacy.replace("if (valid) this.setState({route:'workspace'","if (valid) this.setState({route:'success'",1)
legacy = legacy.replace("t, isThai:s.lang === 'th'","isLegacySuccess:s.route === 'success', t, isThai:s.lang === 'th'",1)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME,headless=True)
    context = browser.new_context(viewport={'width':1739,'height':922})
    context.route(BASE,lambda r: r.fulfill(body=legacy,content_type='text/html'))
    page = context.new_page()
    page.route(BASE + 'LoginSuccess.dc.html',lambda r: r.fulfill(status=404,body='Not found'))
    page.goto(BASE,wait_until='networkidle')
    page.locator('#staff-email').fill('staff@polytechnology.demo')
    page.locator('#staff-password').fill('PolytechDemo!')
    page.get_by_role('button',name='เข้าสู่ระบบ',exact=True).click()
    expect(page.locator('#staff-password')).to_have_count(0)
    expect(page.locator('.auth-page .sc-placeholder')).to_be_visible()
    expect(page.locator('.bo-shell')).to_have_count(0)
    page.screenshot(path=str(OUT/'legacy-shell-before.png'),full_page=True)
    page.close()
    page = context.new_page()
    errors, failed = [], []
    page.on('pageerror',lambda e: errors.append(str(e)))
    page.on('response',lambda r: failed.append(r.url) if r.status >= 400 and r.url.startswith(BASE) else None)
    page.goto(BASE,wait_until='networkidle')
    page.locator('#staff-email').fill('staff@polytechnology.demo')
    page.locator('#staff-password').fill('PolytechDemo!')
    page.get_by_role('button',name='เข้าสู่ระบบ',exact=True).click()
    page.wait_for_url(BASE + '?v=layout-shell-2')
    expect(page.locator('.bo-shell')).to_be_visible()
    expect(page.locator('.bo-navigation .bo-menu')).to_have_count(15)
    expect(page.locator('.auth-page')).to_have_count(0)
    assert page.evaluate("sessionStorage.getItem('plt_bo_shell_upgrade')") is None
    page.screenshot(path=str(OUT/'legacy-shell-after.png'),full_page=True)
    page.reload(wait_until='networkidle')
    expect(page.get_by_role('heading',name='เข้าสู่ระบบพนักงาน')).to_be_visible()
    expect(page.locator('.bo-shell')).to_have_count(0)
    assert not errors, errors
    assert not failed, failed
    (OUT/'shell-upgrade-report.json').write_text(json.dumps({'passed':True,'checks':['reproduced old entry missing component','old login opens new shell automatically','15 menus visible','one-time upgrade flag consumed','refresh still requires login','no runtime or fetch errors']},indent=2),encoding='utf-8')
    browser.close()
print('PASS: existing login tab upgrades to shared shell')
