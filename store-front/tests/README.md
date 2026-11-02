# Home redesign verification

The hero carousel keeps five slides with five distinct generated backgrounds in
assets/homepage/campaigns/. Promotional text, badges, buttons and assurance icons
are HTML/SVG and support Thai and English. Generation prompts and the responsive
WebP preparation script are stored alongside the PNG originals.

    python store-front/tests/browser-hero-image.py

This checks all five slides in both languages across five viewport sizes, checks
PNG fallback at DPR 1 and 2, and verifies campaign navigation. Screenshots and the
report are written to verification/hero-campaigns/.

Reference home sections (Flash Sale / business categories / compact recommendations /
ticket coupons) reuse catalogue and wallet data:

    node --preserve-symlinks-main store-front/tests/home-reference.cjs

The home displays 6 Flash Sale items, 6 business categories, 6 recommended items,
and the existing SAVE500, SAVE8 and FREIGHT0 coupons. Catalogue pagination and the
full coupon page are unchanged. Flash Sale keeps account prices; only existing
member reductions receive percentage badges and crossed-out retail prices.

Campaign countdown and navigation:

    node --preserve-symlinks-main store-front/tests/flash-sale.cjs

Checks countdown progression and expiry, Thai/English labels, campaign navigation,
and preservation of catalogue prices. The demo round ends at browser-local midnight;
it uses the existing application clock and does not apply discounts to checkout.

Run the data and navigation regression checks from the project root:

    node --preserve-symlinks-main store-front/tests/home-redesign.cjs

This runs the actual Component logic in a small Node sandbox without altering the catalogue or requiring the browser runtime. It covers category filters, carousel state, every account segment in TH/EN, recommended images/prices, hidden service routes, coupon eligibility and product CTAs.

Verify that all service entry points and records stay hidden while the dormant workflow remains intact:

    node --preserve-symlinks-main store-front/tests/services-hidden.cjs

For the browser checks, install Playwright and Pillow, start the static server, then run:

    python -m pip install playwright pillow
    python store-front/serve.py --port 8765
    python store-front/tests/browser-home-redesign.py

Set `POLYTECH_TEST_BASE` when the preview server uses another port. The browser
suite also verifies clean product URLs, Back/Forward restoration, direct links
and refresh behavior through the SPA fallback.

The browser script uses installed Google Chrome. POLYTECH_TEST_CHROME can specify a different compatible Chrome executable path. A workspace-only Playwright install in verification/home-redesign/tools is also supported.

The script captures 1240, 1440, 1920, 2541 and 768px viewports and TH/EN screenshots in verification/home-redesign. It checks all page shells through live resizes: layout width follows the viewport with a 1240px minimum and a centered 1680px maximum, and smaller screens intentionally scroll horizontally. The header keeps its desktop controls and arrangement, aligned with the centered content. Hero images must load and their section stays at or below 500px tall.

Test-only request interception exposes the Component instance; production files are not modified. The browser checks confirm that service cards, routes and footer links are hidden in Thai and English while the remaining shell keeps its expected width and layout.

Recreate the generated PNG assets' WebP derivatives with:

    python store-front/tests/prepare-home-images.py

Verify all five new banners under normal loading and failed WebP loads at DPR 1 and 2:

    python store-front/tests/browser-hero-image.py

Failed WebP requests are intercepted as 404s. The test requires the generated PNG original to load after srcset is cleared, so a failed selected candidate cannot leave the banner empty.

Verify the Contact form validation, conditional order reference, mock submission and stacked narrow layout:

    python store-front/tests/browser-contact-form.py

The Contact check uses the existing local Playwright tools and installed Chrome. It confirms that service topics remain hidden with the current feature flag and that no real enquiry is transmitted.
