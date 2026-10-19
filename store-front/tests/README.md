# Home redesign verification

Run the data and navigation regression checks from the project root:

    node --preserve-symlinks-main store-front/tests/home-redesign.cjs

This runs the actual Component logic in a small Node sandbox without altering the catalogue or requiring the browser runtime. It covers category filters, carousel state, every account segment in TH/EN, recommended images/prices, hidden service routes, coupon eligibility and product CTAs.

Verify that all service entry points and records stay hidden while the dormant workflow remains intact:

    node --preserve-symlinks-main store-front/tests/services-hidden.cjs

For the browser checks, install Playwright and Pillow, start the static server, then run:

    python -m pip install playwright pillow
    python -m http.server 8765 --bind 127.0.0.1 --directory store-front
    python store-front/tests/browser-home-redesign.py

The browser script uses installed Google Chrome. POLYTECH_TEST_CHROME can specify a different compatible Chrome executable path. A workspace-only Playwright install in verification/home-redesign/tools is also supported.

The script captures 1240, 1440, 1920, 2541 and 768px viewports and TH/EN screenshots in verification/home-redesign. It checks all page shells through live resizes: layout width follows the viewport with a 1240px minimum and a centered 1680px maximum, and smaller screens intentionally scroll horizontally. The header keeps its desktop controls and arrangement, aligned with the centered content. Hero images must load and their section stays at or below 500px tall.

Test-only request interception exposes the Component instance; production files are not modified. The browser checks confirm that service cards, routes and footer links are hidden in Thai and English while the remaining shell keeps its expected width and layout.

Recreate the generated PNG assets' WebP derivatives with:

    python store-front/tests/prepare-home-images.py

Verify the first banner under successful and failed WebP loads at DPR 1 and 2, including reload and carousel return:

    python store-front/tests/browser-hero-image.py

Failed WebP requests are intercepted as 404s. The test requires the generated PNG original to load after srcset is cleared, so a failed selected candidate cannot leave the banner empty.
