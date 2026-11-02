"""Targeted Contact form browser regression; requires Playwright and installed Chrome."""
from pathlib import Path
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parents[2]
TOOLS = ROOT / "verification" / "home-redesign" / "tools"
sys.path.insert(0, str(TOOLS))

from playwright.sync_api import expect, sync_playwright

BASE = os.environ.get("POLYTECH_TEST_BASE", "http://127.0.0.1:8765").rstrip("/")
CHROME = os.environ.get(
    "POLYTECH_TEST_CHROME",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=CHROME, headless=True)
    context = browser.new_context(viewport={"width": 1600, "height": 1200})
    page = context.new_page()
    page.goto(BASE + "/contact", wait_until="networkidle")

    expect(page.get_by_role("heading", name="ส่งข้อความถึงเรา")).to_be_visible()
    layout = page.locator(".pt-contact-company").evaluate(
        "el => getComputedStyle(el).gridTemplateColumns.split(' ').length"
    )
    assert layout == 2, "Desktop Contact content must use two columns"

    topic = page.get_by_label("เรื่องที่ต้องการติดต่อ *")
    option_values = topic.locator("option").evaluate_all(
        "options => options.map(option => option.value)"
    )
    assert "service" not in option_values, "Hidden services must stay out of the topic list"
    assert "quotation" not in option_values, "Quotation must stay out of the topic list"
    assert "credit" not in option_values, "Credit must stay out of the topic list"
    assert "information" in option_values, "General information must be available"
    expect(topic.locator('option[value="information"]')).to_have_text("สอบถามข้อมูล")
    expect(page.get_by_label("เลขคำสั่งซื้อหรือใบเสนอราคา (ถ้ามี)")).to_have_count(0)

    page.get_by_role("button", name="ส่งข้อมูลติดต่อ").click()
    expect(page.get_by_role("alert")).to_be_visible()
    expect(page.get_by_text("กรุณากรอกข้อมูลในช่องนี้").first).to_be_visible()

    page.get_by_label("ชื่อผู้ติดต่อ *").fill("คุณสมชาย ใจดี")
    page.get_by_label("ชื่อบริษัท (ถ้ามี)").fill("บริษัท ตัวอย่าง จำกัด")
    page.get_by_label("อีเมล *").fill("somchai@example.com")
    page.get_by_label("เบอร์โทรศัพท์ *").fill("+66 81-234-5678")
    topic.select_option("order")
    reference = page.get_by_label("เลขคำสั่งซื้อหรือใบเสนอราคา (ถ้ามี)")
    expect(reference).to_be_visible()
    reference.fill("P261014RTKLP")
    page.get_by_label("รายละเอียด *").fill("ต้องการสอบถามสถานะการจัดส่งสินค้า")
    page.get_by_label("ยินยอมให้บริษัท โพลีเทคโนโลยี ใช้ข้อมูลนี้เพื่อติดต่อกลับเกี่ยวกับเรื่องที่สอบถาม").check()
    page.get_by_role("button", name="ส่งข้อมูลติดต่อ").click()

    success = page.get_by_role("status")
    expect(success).to_be_visible()
    expect(success).to_contain_text("ยังไม่มีข้อมูลถูกส่งไปยังบริษัทจริง")
    expect(success).to_contain_text("CT-")
    expect(page.get_by_label("ชื่อผู้ติดต่อ *")).to_have_value("คุณสมชาย ใจดี")
    expect(topic).to_have_value("")
    expect(page.get_by_label("รายละเอียด *")).to_have_value("")

    context.close()

    narrow = browser.new_context(viewport={"width": 768, "height": 1000})
    narrow_page = narrow.new_page()
    narrow_page.goto(BASE + "/contact", wait_until="networkidle")
    narrow_layout = narrow_page.locator(".pt-contact-company").evaluate(
        "el => getComputedStyle(el).gridTemplateColumns.split(' ').length"
    )
    assert narrow_layout == 1, "Narrow Contact content must stack into one column"
    form_top = narrow_page.locator(".pt-contact-form-card").bounding_box()["y"]
    details_top = narrow_page.locator(".pt-contact-details").bounding_box()["y"]
    assert form_top < details_top, "The Contact form must appear before supporting details when stacked"
    narrow.close()
    browser.close()

print("PASS: Contact form renders, validates, submits as a mock and stacks correctly")
