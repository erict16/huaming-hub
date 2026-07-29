# Design — 华明 Hub (huaming-hub)

Locked design system. Every page redesign reads this file before emitting code.

## Audience

Public-facing **non-official reference hub** for procurement and engineering — product series, tech PDFs, OLTC selector. Not a trading desk; not official PR.

## Genre

modern-minimal · industrial docs hub (procurement)

## Macrostructure family

- **Home:** Welcome hero → linked entry strip (3 joined cells, not free-floating SaaS cards) → numbered how-to strip.
- **Content pages** (downloads / products): page-head + dense list/table; no hero enrichment.
- **Removed:** stock quote, news feed, about page.
- **Previous fingerprints:** Workbench · Stat-Led desk · public hub with market sections

## Theme · cobalt-industrial (light)

| Token | Value | Role |
|-------|-------|------|
| `--paper` | `#f3f5f8` | page ground |
| `--paper-2` | `#ffffff` | cards |
| `--paper-3` | `#e9eef4` | table head / subtle fill |
| `--ink` | `#0f2438` | primary text |
| `--ink-2` | `#3a4f63` | secondary |
| `--ink-3` | `#6a7d90` | meta / captions |
| `--rule` | `#d8e0e9` | hairlines |
| `--rule-2` | `#c2cedb` | stronger border |
| `--accent` | `#0b3d6e` | brand signal |
| `--btn-bg` | `#0a4a82` | primary CTA fill |
| `--btn-fg` | `#ffffff` | primary CTA text (forced) |
| `--up` | `#c41e3a` | A-share up |
| `--down` | `#0d7a4f` | A-share down |

Accent ≤ ~5% of viewport. No gradient hero, no fake chrome.

## Typography

- Display: Space Grotesk 600, roman only
- Body: Inter 400/500/600
- Mono: JetBrains Mono — model codes, counts, kickers
- Scale: `--text-2xs` 11 → `--text-2xl` 24 (see `globals.css`)
- Body = `--text-base` (14px); page H1 = xl/2xl; hero H1 = clamp ~1.35–1.75rem

## Spacing

4pt scale: `--s1`…`--s10`. Page section gap `--s6`/`--s8`. Prefer tokens over raw Tailwind spacing on chrome.

## Motion

- Short hover/bg transitions ≤ 150ms
- Reduced-motion: opacity only
- No celebratory toasts

## CTA voice

- Primary: solid `--btn-bg`, **white text forced** (`#fff !important` on `a.hm-btn-primary` — global `a { color: inherit }` otherwise kills contrast)
- Secondary: white fill, `--rule-2` border, ink text; hover accent soft
- Table action: soft accent chip → solid on hover

## A11y floor

- Visible `:focus-visible` rings on controls
- Skip link to `#main`
- Filter chips: `aria-pressed`
- Tables: caption + `scope="col"`; sticky header in scroll region
- External links: `rel="noopener noreferrer"`
- Touch targets ≥ ~40px on primary actions / chips / mobile nav

## What pages MUST share

- Brand mark + Huaming Hub wordmark
- Accent + CTA voice (Documents is the primary buyer action)
- Display / body / mono fonts
- `hm-shell` / `hm-page` rhythm
- Sticky header + compact footer
- EN default routes; `/zh/*` Chinese

## What pages MAY differ

- Home: Stat-Led hero strip
- Downloads: compact table + chips
- Products: catalogue cards
- No per-page theme swaps

## Enrichment

**none** on app pages.

## Hallmark stamp (CSS)

```
/* Hallmark · Stat-Led · cobalt-industrial · P4 H4 E4 S4 R4 V3 */
```
