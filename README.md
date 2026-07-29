# Huaming Hub

Unofficial portal for Huaming OLTC / DETC PDFs, series notes, and a first-pass type selector.

**Live:** https://erict16.github.io/huaming-hub/

Not an official Huaming website. PDFs open on [intl-huaming.com](https://www.intl-huaming.com/).

## What it is

Home is a short portal. Docs is the workbench (series + PDF table). No separate Products page.

| Route | Content |
|-------|---------|
| `/` (EN default) | Portal — identity, CTAs, series preview |
| `/downloads/` | Docs workbench — series index + search + PDF table |
| `/products/` | Redirects to `/downloads/` |
| `/zh/…` | Chinese UI |

Selector (separate app): https://erict16.github.io/oltc-selector/

Design: `design.md` · Spec: `docs/superpowers/specs/2026-07-29-portal-docs-design.md`

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
