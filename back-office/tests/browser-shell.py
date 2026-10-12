"""Verify the shared shell through real login, navigation and responsive layouts."""
from pathlib import Path
import json
import os
import sys

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'verification' / 'back-office'
sys.path.insert(0, str(OUT / 'tools'))
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('POLYTECH_BO_URL','http://127.0.0.1:8001/')
CHROME = os.environ.get('POLYTECH_TEST_CHROME',r'C:\Program Files\Google\Chrome\Application\chrome.exe')
OUT.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME, headless=True)
    page = browser.new_page(viewport={'width':1600,'height':1200})
    errors, failed = [], []
    page.on('pageerror',lambda e: errors.append(str(e)))
    page.on('response',lambda r: failed.append(r.url) if r.status >= 400 and r.url.startswith(BASE) else None)
    page.goto(BASE,wait_until='networkidle')
    expect(page.locator('.bo-shell')).to_have_count(0)
    page.locator('#staff-email').fill('staff@polytechnology.demo')
    page.locator('#staff-password').fill('PolytechDemo!')
    page.get_by_role('button',name='เข้าสู่ระบบ',exact=True).click()
    expect(page.locator('.bo-shell')).to_be_visible()
    expect(page.locator('.bo-navigation .bo-menu')).to_have_count(15)
    expect(page.locator('.bo-menu[aria-current="page"]')).to_have_text('ภาพรวม')
    expect(page.locator('.bo-workspace h1')).to_have_text('ภาพรวมผู้จัดการ')
    assert page.locator('.bo-sidebar').evaluate('(e)=>e.getBoundingClientRect().width') == 300
    assert page.locator('.bo-topbar').evaluate('(e)=>e.getBoundingClientRect().height') == 72
    assert page.locator('.bo-navigation').evaluate('(e)=>e.scrollHeight <= e.clientHeight')
    page.screenshot(path=str(OUT/'shell-th-1600.png'),full_page=True)
    shell = page.locator('.bo-shell').element_handle()
    for i in range(15):
        menu = page.locator('.bo-navigation .bo-menu').nth(i)
        label = menu.inner_text()
        menu.click()
        expect(menu).to_have_attribute('aria-current','page')
        expect(page.locator('.bo-workspace h1')).to_be_visible()
        assert page.title().endswith(' | Polytechnology Back-office')
        assert shell.evaluate('(e)=>e === document.querySelector(".bo-shell")')
    search = page.get_by_role('searchbox',name='ค้นหาเมนู')
    search.fill('คำสั่งซื้อ')
    page.locator('.bo-search-results').get_by_role('button',name='คำสั่งซื้อ',exact=True).click()
    expect(page.locator('.bo-menu[aria-current="page"]')).to_have_text('คำสั่งซื้อ')
    expect(search).to_have_value('')
    search.fill('no-such-menu')
    expect(page.get_by_role('status')).to_have_text('ไม่พบเมนูที่ค้นหา')
    search.press('Escape')
    page.get_by_role('button',name='EN',exact=True).click()
    expect(page.locator('.bo-menu[aria-current="page"]')).to_have_text('Orders')
    page.get_by_role('button',name='Notifications',exact=True).click()
    expect(page.get_by_text('No notifications yet',exact=True)).to_be_visible()
    page.get_by_role('button',name='Staff account menu',exact=True).click()
    expect(page.locator('#bo-profile-panel')).to_be_visible()
    expect(page.locator('#bo-notification-panel')).to_have_count(0)
    page.keyboard.press('Escape')
    page.screenshot(path=str(OUT/'shell-en-1600.png'),full_page=True)
    page.get_by_role('button',name='Toggle navigation').click()
    expect(page.locator('.bo-shell')).to_have_class('bo-shell is-collapsed')
    assert page.locator('.bo-sidebar').evaluate('(e)=>e.getBoundingClientRect().width') == 76
    expect(page.locator('.bo-navigation .bo-menu').nth(0)).to_have_accessible_name('Overview')
    page.screenshot(path=str(OUT/'shell-collapsed.png'),full_page=True)
    page.get_by_role('button',name='Toggle navigation').click()
    for width,height in [(1440,900),(1024,768),(768,1024),(375,812)]:
        page.set_viewport_size({'width':width,'height':height})
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        assert page.locator('.bo-topbar').evaluate('(e)=>e.scrollWidth <= e.clientWidth')
        if width <= 900:
            expect(page.locator('.bo-sidebar')).not_to_be_visible()
            page.get_by_role('button',name='Toggle navigation').click()
            expect(page.locator('.bo-sidebar')).to_be_visible()
            page.locator('.bo-navigation .bo-menu').nth(2).click()
            expect(page.locator('.bo-sidebar')).not_to_be_visible()
            page.get_by_role('button',name='Toggle navigation').click()
            page.screenshot(path=str(OUT/f'shell-drawer-{width}.png'),full_page=True)
            page.get_by_role('button',name='Close navigation',exact=True).click(position={'x':width-12,'y':100})
            expect(page.locator('.bo-sidebar')).not_to_be_visible()
        page.screenshot(path=str(OUT/f'shell-en-{width}.png'),full_page=True)
    page.get_by_role('button',name='Staff account menu',exact=True).click()
    page.locator('#bo-profile-panel').get_by_role('button',name='Sign out',exact=True).click()
    expect(page.get_by_role('heading',name='Staff sign in')).to_be_visible()
    expect(page.locator('.bo-shell')).to_have_count(0)
    assert '{{' not in page.locator('body').inner_text()
    assert not errors, errors
    assert not failed, failed
    (OUT/'shell-report.json').write_text(json.dumps({'passed':True,'menus':15,'viewports':[1600,1440,1024,768,375],'languages':['th','en'],'checks':['one persistent shell across all menus','content outlet','all sidebar items visible at reference size','navigation search','desktop collapse','mobile drawer','notifications','profile','logout','no overflow','no runtime or fetch errors']},indent=2),encoding='utf-8')
    browser.close()
print('PASS: reusable back-office shell (15 menus, TH/EN, desktop/tablet/mobile)')
