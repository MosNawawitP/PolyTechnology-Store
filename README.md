# Polytech Store Front

Static e-commerce prototype for Polytechnology. The deployable website is in
store-front/. All application data, accounts, orders and payments are simulated.

The staff Back-office prototype is in [back-office/](back-office/README.th.md).
It uses the same static Design Component runtime and provides the 15 management
modules described in [the plan](docs/BACK_OFFICE_PLAN.th.md), with mock records
and workflows. Start it separately with `python -m http.server 8001 --directory back-office`.

## Deploy from GitHub to Vercel

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Set Root Directory to store-front.
4. Select Framework Preset: Other. Leave Build Command and Install Command empty,
   and set Output Directory to . if entering the settings manually.
5. Deploy. The website opens at the deployment root URL.

store-front/vercel.json supplies the static deployment settings. No Python
runtime, npm install, or build step is needed on Vercel.

If uploading only the contents of store-front/ as the repository root, use the
default Root Directory instead. The same vercel.json works in that layout.

Vercel documentation: https://vercel.com/docs/builds/configure-a-build

## Local preview

From the project root:

    python store-front/serve.py

Open http://localhost:8000/. The preview server returns index.html for clean page
URLs such as /products and /account/orders while continuing to serve static files
normally. Any equivalent HTTP server with SPA fallback works. Opening index.html
via file:// will not work because the runtime fetches sibling component templates.

## Files

- store-front/index.html: entry point, styles, state, mock data and event handlers.
- store-front/*.dc.html: page and component templates loaded by the runtime.
- store-front/support.js: generated Design Component runtime; do not edit.
- store-front/assets/: product and category images and logo.
- store-front/AGENTS.md: maintenance instructions.
- store-front/PRODUCT_IMAGE_CATALOG.md: image catalogue reference.

The site also loads React/Babel, fonts, Leaflet, map tiles and some images from
external services, so viewing it requires an internet connection.

Routing synchronizes application state with clean URL paths and browser history.
Keep the page rewrites in vercel.json so direct links and refreshes return
index.html, and keep cleanUrls disabled so component .dc.html requests retain
their file names.
