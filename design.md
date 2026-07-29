# Design — 华明 Hub (Spec Desk)

Document workbench. Home **is** the PDF table. One cold surface language. No marketing bands.

## Audience

Procurement / engineering · unofficial OLTC docs hub

## Jobs (priority)

1. Find official PDF by model / series / keyword  
2. Recognise product series, then deep-link into docs  
3. Open type selector (external)  
4. Switch EN ↔ 中文  

## System (locked)

| Role | Token | Value |
|------|-------|-------|
| Page | `--paper` | `#f0f2f5` |
| Surface | `--paper-2` | `#ffffff` |
| Soft fill | `--paper-3` | `#e6ecf2` |
| Text | `--ink` | `#0b1a2a` |
| Secondary | `--ink-2` | `#3a4d61` |
| Meta | `--ink-3` | `#6a7d90` |
| Line | `--rule` | `#d0dae4` |
| Accent | `--accent` | `#0a4a82` |
| Accent soft | `--accent-soft` | `#e4eef7` |
| CTA | `--btn-bg` | `#0a4a82` |

- **Surfaces:** white + 1px `--rule` + radius **3–4px**. Header, chips, table wrap share this language.
- **Type:** IBM Plex Sans (UI) · IBM Plex Mono (model codes, kickers, meta counts, chip codes)
- **Accent ≤ 5%** — primary button, links, active nav, top rule. Never fill whole sections.
- **No** graphite/dark sections, gradient heroes, photo plates, shadows beyond hairline.

## Signature

1. **Mono model codes** — scannable IDs in IBM Plex Mono (parts list, not brochure).
2. **Cobalt top rule** — 2px solid `--accent` on the root (spec-paper top line).

## Layout / IA

- Shell max ~1040px
- Header sticky · Footer single line (unofficial + official site; no Email Desk)
- **Nav:** Docs → `/` (also active on `/downloads`) · Series → `/products` · Selector ↗
- **Home `/`:** short identity + search + series chips + PDF table (Spec Desk)
- **`/downloads`:** same explorer component as home
- **`/products`:** family-grouped series index → Docs deep-link `/?q=…`
- Content density: workbench, not empty marketing bands

## CTA

Primary: solid cobalt (`--btn-bg`), **white text forced**. Secondary: white + border.

## Spec

Full design: `docs/superpowers/specs/2026-07-29-spec-desk-design.md`
