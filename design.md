# Design — 华明工作台 (huaming-hub)

Locked design system for this personal hub. Every page redesign reads this file before emitting code. Do not regenerate per page — extend when the system needs to grow.

## Genre

modern-minimal · industrial data desk

Personal B2B workbench (stock + announcements + OLTC docs). Not marketing landing, not PR site.

## Macrostructure family

- **Home (app desk):** Stat-Led — live price is the lead figure, paired with worded identity「华明装备 · 002270」. News uses Index-First density (list is the content).
- **Content pages** (downloads / products / about): same shell, denser tables/lists; no hero enrichment.
- **Previous fingerprint (do not reuse next run as primary):** Workbench

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

- Display: Space Grotesk, weight 600, roman only (no italic headers)
- Body: Inter 400/500/600
- Mono: JetBrains Mono — prices, codes, dates
- Body size ~14px; page H1 ~1.35–1.5rem; stat price ~2.25–2.75rem tabular-nums

## Spacing

4pt scale: `--s1` 4 … `--s8` 32. Prefer named tokens; avoid arbitrary large empty bands.

## Motion

- Short hover/bg transitions ≤ 150ms
- Reduced-motion: opacity only
- No celebratory toasts

## CTA voice

- Primary: solid `--btn-bg`, **white text forced** (`#fff !important` on `a.hm-btn-primary` — global `a { color: inherit }` otherwise kills contrast)
- Secondary: white fill, `--rule-2` border, ink text; hover accent soft
- Table action: soft accent chip → solid on hover

## News product rules (content, not chrome)

- Hard relevance: 华明 / 002270 only (announcements from stock API auto-pass)
- No industry bulk (电力设备/特高压 without Huaming)
- Risk/bearish cap ≈ 1/3 of list; date-first sort
- UI: default title ink; only hard `risk` tag gets restrained emphasis — no red title walls

## What pages MUST share

- Wordmark + 「华明工作台」
- Accent + CTA voice
- Display / body / mono fonts
- `hm-shell` / `hm-page` rhythm
- Sticky header + compact footer

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
