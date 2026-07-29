# Huaming Hub

Unofficial **Spec Desk** for Huaming OLTC / DETC PDFs, product series, and a first-pass type selector.

**Live:** https://erict16.github.io/huaming-hub/

Not an official Huaming website. PDFs open on [intl-huaming.com](https://www.intl-huaming.com/).

## What it is

Home **is** the document workbench: search a model code, filter by series, open the official PDF.

| Route | Content |
|-------|---------|
| `/` (EN default) | Spec Desk — identity + search + chips + PDF table |
| `/downloads/` | Same explorer (bookmark-safe) |
| `/products/` | Series index → deep-link into Docs with `?q=` |
| `/zh/…` | Chinese UI |

Selector (separate app): https://erict16.github.io/oltc-selector/

Design: `design.md` · Spec: `docs/superpowers/specs/2026-07-29-spec-desk-design.md`

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
