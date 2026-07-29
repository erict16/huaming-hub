# Huaming Hub

Unofficial **Fumadocs** portal for Huaming OLTC / DETC PDFs, series notes, and type selector.

**Not** an official Huaming website. PDFs open on [intl-huaming.com](https://www.intl-huaming.com/).

## What it is

| Route | Content |
|-------|---------|
| `/` | Portal home |
| `/docs` | Overview |
| `/docs/files` | PDF table (search + series chips) |
| `/docs/series` | Product families → filter files |
| Selector ↗ | https://erict16.github.io/oltc-selector/ |

Shell: [Fumadocs](https://fumadocs.dev/). Design: `docs/superpowers/specs/2026-07-29-fumadocs-hub-design.md`.

## Dev

Needs **Node ≥ 20.19** (22 recommended).

```bash
cd ~/Github/huaming-hub
npm install
npm run dev
# http://127.0.0.1:3000
```

```bash
npm run build
npm start
```

## Deploy

Primary target: **Vercel** (connect this repo / branch `redo/fumadocs` or `main` after merge).

GitHub Pages static export is not the primary path for this Fumadocs setup.
