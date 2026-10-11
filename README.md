# Herramientario — Herramientas Online Gratis en Español

A Spanish-language multi-tool hub: 6 free online tools that run 100% in the visitor's browser (no backend, no database, no uploads to any server). Built for SEO + Google AdSense monetization, targeting Spanish-speaking markets (Spain + Latin America).

## Tools included
- **Generador de códigos QR** — URL, texto, WiFi, WhatsApp, vCard; colores, logo, PNG/SVG
- **Contador de palabras y caracteres** — con tiempo de lectura y densidad de palabras clave
- **Compresor de imágenes** — por lotes, 100% local (Canvas), PNG/JPG/WebP, descarga ZIP
- **Calculadora de IMC** — índice de masa corporal con rango de peso saludable
- **Generador de contraseñas** — aleatoriedad criptográfica (`crypto.getRandomValues`), entropía
- **Formateador JSON** — formatear, minificar, validar con errores en español

Plus a blog with SEO guides, privacy/contact/about pages (AdSense-ready), sitemap, and full meta/OG/JSON-LD on every page.

## Tech
Pure static HTML + CSS + JavaScript. No build step, no framework, no server. Total site weight ≈ 368 KB. The only external loads are two small CDN libraries (QR, JSZip) and Google Fonts.

## Deploy
See **ROADMAP.md** for the full path: GitHub → free domain (GitHub Student Developer Pack / Name.com) → Cloudflare Pages → Search Console → AdSense.

Quick deploy on Cloudflare Pages (Git integration): connect this repo, framework preset **None**, no build command, output directory `/`. Every push to `main` auto-deploys.

## Structure
```
index.html            Homepage (bento tool grid)
tools/                The 6 tool pages
blog/                 Blog index + articles
assets/css/           Design system (style.css)
assets/js/            Shared JS (main.js)
_headers              Cloudflare security + cache headers
_redirects            www → apex + clean URLs
sitemap.xml, robots.txt, favicon.svg, site.webmanifest, og-cover.png
privacidad.html, contacto.html, nosotros.html, 404.html
```
