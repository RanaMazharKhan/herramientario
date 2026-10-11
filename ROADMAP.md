# ROADMAP — Herramientario: GitHub → Dominio gratis → Cloudflare → AdSense

Follow the steps in order. Total setup time: ~1 hour (plus DNS waiting time).

---

## STEP 1 — Domain claimed ✅ (GitHub Student Developer Pack)

**herramientario.app** is yours — free for 1 year via the Name.com Pack offer
(Order complete, $0.00). The site is fully wired for it: canonicals, sitemap,
redirects, and contact email all point to **https://herramientario.app**.

> Notes: .app **requires HTTPS** (it's an HSTS-only namespace — the site will not load
> over plain http). Cloudflare provides free SSL, and Step 4 turns on Always Use
> HTTPS, so you're covered — do NOT buy Name.com's SSL upsell. Year 1 is free;
> renewal after that is at Name.com's normal .app price — set a reminder for month 11.

---

## STEP 2 — Put the project on GitHub

1. Go to **github.com/new** → repository name: `herramientario` → **Public** → Create repository.
2. Click **uploading an existing file** → drag in ALL the contents of this folder
   (everything inside it — `index.html`, `tools/`, `blog/`, `assets/`, etc., but NOT the
   folder itself) → Commit changes.
3. Check the repo: `index.html` must sit at the TOP level of the repository.

---

## STEP 3 — Publish on Cloudflare Pages (connected to GitHub)

1. Go to **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → choose the `herramientario` repo.
2. Build settings: Framework preset **None** · Build command: *(leave empty)* ·
   Build output directory: `/` → **Save and Deploy**.
3. Your site is now live on a `*.pages.dev` address, and **every future push to GitHub
   redeploys automatically**.

---

## STEP 4 — Connect your domain

1. In Cloudflare: **Add a site** → enter your domain → Free plan. Cloudflare shows you
   **2 nameservers**.
2. At Name.com: open your domain → **Nameservers** → choose "Use custom nameservers" →
   replace them with Cloudflare's 2 nameservers → Save. (Propagation: usually minutes,
   up to 24h. Your domain stays registered at Name.com — only DNS moves to Cloudflare.)
3. Back in your **Pages project → Custom domains → Set up a custom domain** → enter your
   domain → confirm. Cloudflare adds the DNS records automatically and issues HTTPS.
4. Cloudflare **SSL/TLS → Edge Certificates → Always Use HTTPS: ON**.
   Speed: **Speed → Optimization → Auto Minify (HTML, CSS, JS): ON**.
5. The `www` version is already handled — the included `_redirects` file sends
   `www` → the main domain automatically.

---

## STEP 5 — Google Search Console

1. **search.google.com/search-console** → Add property → **Domain** → enter your domain.
2. Verify with the DNS TXT record (add it in Cloudflare → DNS → Records).
3. **Sitemaps** → submit: `https://TU-DOMINIO/sitemap.xml`
4. Wait a few days and check Coverage/Pages to confirm Google is indexing the tools.

---

## STEP 6 — Google AdSense (money step — do it after Steps 1–5 + some traffic)

1. Apply at **adsense.google.com** with the live site. The site already has what
   reviewers want: real content on every tool page, blog articles, and
   privacy/contact/about pages.
2. Once approved, Google gives you a publisher ID (`ca-pub-XXXX`).
3. Paste your ad code into the blocks marked `<!-- ADSENSE SLOT -->` in the HTML files
   (or add the Auto Ads script to each page's `<head>`), commit to GitHub — Cloudflare
   redeploys automatically. Ad slots stay invisible until real ads load.
4. Payouts: wire transfer to your Pakistani bank account once you pass the $100 threshold.

---

## STEP 7 — Growth routine (from the Money Playbook)

- **Weekly:** add 1 new tool page or 1 new article targeting a long-tail Spanish keyword.
- **Traffic boosters:** Pinterest pins + TikTok/Shorts demos of the tools, linking to the
  specific tool page.
- **Milestones:** ~10k sessions/month → apply to Mediavine Journey (better ad rates);
  affiliates (Hostinger, NordVPN, Hotmart) only on "mejor X para Y" comparison articles.

---

## Checklist

- [x] Domain herramientario.app claimed free at Name.com (Pack offer, $0.00)
- [ ] GitHub repo created, all files at repo root
- [ ] Cloudflare Pages connected to GitHub, site live on pages.dev
- [ ] Nameservers moved to Cloudflare, custom domain active, HTTPS forced
- [ ] Sitemap submitted in Search Console
- [ ] AdSense applied → approved → code pasted → pushed
