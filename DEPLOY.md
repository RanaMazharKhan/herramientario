# Deploy Guide — Herramientario (herramientario.app)

## 1. Preview locally
No server needed. Open `index.html` in a browser (double-click works, file:// is fine).
Note: the QR generator and ZIP download load libraries from CDN (jsdelivr/cdnjs), so those two features need internet on first use. Everything else works fully offline.

## 2. Buy the domain
**herramientario.app** is claimed (free via the GitHub Student Developer Pack, Name.com). The site is already wired for it:
canonicals, og:url, twitter meta, JSON-LD, sitemap.xml, robots.txt and the contact email
(contacto@herramientario.app) all point to `https://herramientario.app` (apex, no www).

## 3. Deploy on Cloudflare Pages (exact steps)
1. Go to **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Name the project `herramientario` (or anything you like).
3. Drag the **entire contents of this folder** (`index.html`, `tools/`, `blog/`, `assets/`, `404.html`, `_headers`, `_redirects`, `favicon.svg`, `site.webmanifest`, `sitemap.xml`, `robots.txt`) into the upload box. Do NOT zip it — drag the files themselves.
4. Deploy. You get a free `*.pages.dev` URL with HTTPS immediately.
5. **Add the custom domain:** Pages project → **Custom domains** → **Set up a custom domain** → enter `herramientario.app` → Activate.
6. **DNS:** if your domain's nameservers are already on Cloudflare, the records are added automatically. Otherwise switch the nameservers at Name.com to Cloudflare's (see ROADMAP.md Step 4).
7. **Speed settings:** Cloudflare dashboard → your domain → **Speed** → enable **Auto Minify** (JS/CSS/HTML) and confirm **Always Use HTTPS** is ON (SSL/TLS → Edge Certificates).
8. The included `_headers` file sets security headers + 1-year immutable caching for `/assets/*`; `_redirects` sends `www.herramientario.app` → apex with a 301. Both work automatically on Pages — nothing to configure.

## 4. Submit to Google
1. Google Search Console → add property `https://herramientario.app` → verify (DNS or HTML file method).
2. Sitemaps → submit `https://herramientario.app/sitemap.xml`.

## 5. Add Google AdSense
1. Sign up at adsense.google.com, add `https://herramientario.app`, get approved (privacy/contact/about pages are already included — this is what reviewers look for).
2. Easiest path: **Auto Ads** — paste the single `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX" crossorigin="anonymous"></script>` Google gives you into the `<head>` of every page (right after the theme-color meta is a good spot).
3. Manual units: in every `.html` file, find blocks marked `<!-- ADSENSE SLOT: ... — REPLACE WITH YOUR ADSENSE CODE -->` and replace the empty `<ins class="adsbygoogle">` with your ad unit code, then add `(adsbygoogle = window.adsbygoogle || []).push({});` after each.
4. Payouts go to a Pakistani bank via wire transfer once you hit the $100 threshold (~21st–26th monthly).

## 6. Content rhythm (for SEO growth)
- Add 1 new tool page or 1 new article per week targeting long-tail Spanish keywords (e.g. "qr wifi", "comprimir png a jpg").
- Each new tool page: copy an existing tool page's structure (title/meta/H1, cómo usar, FAQ + JSON-LD, ad slots) — the template is proven. Remember to add the new URL to `sitemap.xml`.
- New pages need the same head block: fonts, theme pre-script, `style.css`, favicon/manifest/theme-color links.

## What's inside
- 6 working client-side tools (QR, word counter, image compressor, BMI, password generator, JSON formatter)
- 4 SEO articles + blog index
- Privacy / contact / about pages, sitemap.xml, robots.txt, custom 404.html
- AdSense placeholder slots on every page (leaderboard, in-article, footer)
- `_headers` (security + caching), `_redirects` (www → apex), `favicon.svg`, `site.webmanifest`
