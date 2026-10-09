# Polytech Store Front

Static e-commerce prototype for Polytechnology. The deployable website is in
store-front/. All application data, accounts, orders and payments are simulated.

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

    python -m http.server 8000 --directory store-front

Open http://localhost:8000/. Python only serves static files for local preview.
Any equivalent HTTP server works. Opening index.html via file:// will not work
because the runtime fetches sibling component templates.

## Files

- store-front/index.html: entry point, styles, state, mock data and event handlers.
- store-front/*.dc.html: page and component templates loaded by the runtime.
- store-front/support.js: generated Design Component runtime; do not edit.
- store-front/assets/: product and category images and logo.
- store-front/AGENTS.md: maintenance instructions.
- store-front/PRODUCT_IMAGE_CATALOG.md: image catalogue reference.

The site also loads React/Babel, fonts, Leaflet, map tiles and some images from
external services, so viewing it requires an internet connection.

Routing uses application state rather than URL paths; no catch-all rewrite is
needed. Keep cleanUrls disabled so component .dc.html requests keep their names.
