# Design: Huaming Hub — Spec Desk

**Date:** 2026-07-29  
**Status:** approved (Eric)  
**Route:** A · Spec Desk  
**Repo:** `~/Github/huaming-hub` → https://erict16.github.io/huaming-hub/

---

## 1. Goal / non-goals

### Goal

Buyers and engineers open the hub and **find the right official PDF in under three seconds**: search model → open file. Series recognition and the type selector stay secondary. The site should feel like an **engineering document desk**, not a product marketing site.

### Non-goals

- No quote pricing, mail API, or Email Desk surface for buyers
- No re-hosting of PDFs (stay on intl-huaming.com)
- No dark marketing bands, photo heroes, or “howto” numbered journeys on home
- No changes to `oltc-selector` (external link only)
- No market / about pages

---

## 2. Chosen approach

**A · Spec Desk** — documents are the home surface.

| Concern | Decision |
|---------|----------|
| Primary job | Search/filter technical PDFs |
| Home (`/`) | Identity strip + search + series chips + result table |
| Series | Index page; deep-link into filtered docs |
| Selector | External tool in nav (+ light footer link) |
| `/downloads` | Same explorer as home (bookmark-safe; same component) |
| Stack | Next.js static export · GH Pages · EN default · `/zh` |

Rejected:

- **B Split Studio** — keeps home as a signpost; weak redo  
- **C Series Gallery** — extra hop for users who already have a model code  

---

## 3. Information architecture

```
/                 Spec Desk = document workbench
/downloads/       Same explorer (shared component)
/products/        Series index by family
/zh/*             Chinese UI mirror
↗ oltc-selector   External first-pass type tool
```

### Global nav

| Item | Target |
|------|--------|
| Logo / brand | `/` |
| Docs | `/` (active on `/` and `/downloads`) |
| Series | `/products` |
| Selector ↗ | `https://erict16.github.io/oltc-selector/` |
| EN \| 中文 | Locale switch; **preserve `?q=` and filter query** |

### Home structure

```
sticky header
────────────────────────────────
kicker · H1 (one line) · lead (one line)
[ search ──────────────────── ]   desktop: autofocus
[ All | series chips … ]          optional kind chips if space
table: Model (mono) | File | Type | PDF
empty state · official-host note
light selector line (optional, one row)
────────────────────────────────
footer: unofficial + official site
```

**Removed from home:** multi-band “go elsewhere” layout, long series preview list, large selector strip as a separate marketing block, howto steps.

### Products

- Group by family (Conventional / Vacuum / Dry-type / DETC / Accessories / Service…)
- Row: mono `code` · name · one-line blurb · Docs → `/?q=…` (via `productDocsQuery`) · Official ↗
- No per-product detail routes

### Downloads

- Render the **same** explorer as home (no behavior fork)
- Keep route so existing links and habits do not break

---

## 4. Visual system

**Subject grounding:** spec paper · model codes · scannable table · cold workbench  

| Role | Token | Hex |
|------|-------|-----|
| Page | `--paper` | `#f0f2f5` |
| Surface | `--paper-2` | `#ffffff` |
| Soft / thead | `--paper-3` | `#e6ecf2` |
| Ink | `--ink` | `#0b1a2a` |
| Secondary | `--ink-2` | `#3a4d61` |
| Meta | `--ink-3` | `#6a7d90` |
| Rule | `--rule` | `#d0dae4` |
| Accent | `--accent` | `#0a4a82` |
| Accent soft | `--accent-soft` | `#e4eef7` |
| CTA | `--btn-bg` | `#0a4a82` (forced white text) |

- **Type:** IBM Plex Sans (UI) · IBM Plex Mono (models, kickers, counts, chip codes)
- **Radius:** 3–4px
- **Shadow:** none; 1px rules only
- **Accent ≤ 5%** of UI
- **Shell:** max-width ~1040px
- **Signature:** (1) mono model column (2) 2px cobalt top rule on root

**Forbidden:** gradient heroes, photo plates, dark section bands, purple/acid accents, cream-serif clusters, large bento cards, soft SaaS shadows.

Canonical tokens also live in root `design.md` (implementation source of truth after ship).

---

## 5. Components & data

### Shell

- `SiteHeader` — sticky; Docs active for `/` and `/downloads`
- `SiteFooter` — single line; unofficial disclaimer; no Email Desk link
- Skip link, `:focus-visible`, reduced-motion respect

### Spec Desk body

- Reuse / tighten `DownloadExplorer`:
  - Search (desktop autofocus on home)
  - Series (and kind) chips
  - Table with mono model column
  - URL sync for `q` / filters where already present
  - Locale switch keeps query string
- Home page composes short identity + explorer (not a separate marketing layout)
- Products deep-link into `/?q=` (or locale-prefixed `/zh/?q=`)

### Data (keep models)

- `src/data/documents.json` — ~45 PDF rows, official URLs
- `src/data/products.ts` — series catalogue
- `src/lib/documents.ts` — filter + `productDocsQuery`
- `src/lib/i18n.ts` — EN/ZH dictionaries; copy pass for Spec Desk voice

### Copy rules

- English default; short functional lines; no marketing tone
- Footer keeps unofficial status
- Run avoid-ai-writing before claiming done

---

## 6. Success criteria

- [ ] Opening `/` shows search + chips + table in first viewport (desktop)
- [ ] Search + chips work on mobile; open PDF works
- [ ] Series “Docs” deep-link filters the table
- [ ] `/downloads` matches home explorer behavior
- [ ] EN/ZH parity; locale switch preserves `?q=`
- [ ] No dark bands / marketing hero; tokens in `design.md`
- [ ] `npm run build` (and `build:gh` path assets) pass

---

## 7. Implementation slices

1. Tokens + shell + nav (Docs → `/`, active states)
2. Home = Spec Desk (identity + explorer upshift; drop old bands)
3. Align `/downloads`; products deep-link to `/?q=`
4. i18n copy + avoid-ai-writing pass
5. a11y polish + build / Pages verification

---

## 8. Risks

| Risk | Mitigation |
|------|------------|
| Dense home on small screens | Compact chips wrap; sticky search; table scroll-x if needed |
| Users bookmarked “Downloads” as primary | Keep `/downloads` identical |
| Autofocus annoying on mobile | Autofocus only `min-width` desktop breakpoint |
| Plex weight | Subset woff2; 400/600 only |

---

## 9. Spec self-review

- [x] No TBD placeholders
- [x] Goals / non-goals explicit
- [x] IA matches visual signature
- [x] Scope is one implementation plan
- [x] Ambiguities resolved: Docs nav → `/`; `/downloads` same component; no Desk link

---

## 10. Approval

- Route A Spec Desk — **approved**
- Full IA + visual redo — **approved**
- Next: implementation plan → implement
