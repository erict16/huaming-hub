# Huaming Hub

Unofficial reference site for **Huaming** OLTC / DETC product series, technical PDFs, and a first-pass type selector.

**Live:** https://erict16.github.io/huaming-hub/

Not an official Huaming website. PDFs and product pages open on [intl-huaming.com](https://www.intl-huaming.com/).

## What it is

| Route | Content |
|-------|---------|
| `/` (EN default) | Home: docs entry, product series, selector link |
| `/products/` | Series list by family |
| `/downloads/` | Searchable PDF table (official links) |
| `/zh/…` | Chinese UI |

Selector (separate app): https://erict16.github.io/oltc-selector/

## Stack

- Next.js 15 (App Router) + TypeScript · static export
- Tailwind CSS v4
- Brand assets from intl-huaming.com

## Dev

```bash
cd ~/Github/huaming-hub
npm install
npm run dev
# http://127.0.0.1:3000
```

### Static export

```bash
npm run build          # out/ without basePath
npx serve out -l 3000
```

### GitHub Pages

```bash
npm run build:gh       # basePath /huaming-hub
```

Push to `main` runs `.github/workflows/deploy-pages.yml`.
