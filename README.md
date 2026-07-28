# Huaming Hub

Personal workbench for **华明装备 (002270)** — live quote, market/company news briefing, and OLTC technical document downloads.

> Not an official Huaming website. For personal sales / engineering convenience.

**Live (GitHub Pages):** https://erict16.github.io/huaming-hub/

## Stack

- Next.js 15 (App Router) + TypeScript · **static export**
- Tailwind CSS v4
- Brand assets from [intl-huaming.com](https://www.intl-huaming.com/)
- Quote / news: browser JSONP to Eastmoney (+ Tencent quote fallback)
- PDFs: deep-links to public leaflets / OI / technical data

## Dev

```bash
cd ~/Github/huaming-hub
npm install
npm run dev
# http://127.0.0.1:3000
```

### Static export (local)

```bash
npm run build          # out/ without basePath
npx serve out -l 3000
```

### GitHub Pages build

```bash
npm run build:gh       # out/ with basePath /huaming-hub
```

Push to `main` / `master` triggers `.github/workflows/deploy-pages.yml`.

Repo **Settings → Pages → Source: GitHub Actions**.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Stock panel + news / briefing |
| `/downloads` | Searchable document center |
| `/products` | Product series map |
| `/about` | Company snapshot + certs |
| `/selector` | Link to OLTC selector |

## Disclaimer

Quotes and news come from public third-party sources in the browser. PDF links point to Huaming’s public international site. Confirm engineering and investment decisions via official channels.
