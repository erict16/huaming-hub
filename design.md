# Design — 华明 Hub

Cold paper catalogue. One surface language for every page. No dark bands, no competing card systems.

## Audience

Procurement / engineering · unofficial OLTC docs hub

## System (locked)

| Role | Token | Value |
|------|-------|-------|
| Page | `--paper` | `#f3f5f8` |
| Surface | `--paper-2` | `#ffffff` |
| Soft fill | `--paper-3` | `#e8eef4` |
| Text | `--ink` | `#0c1f33` |
| Secondary | `--ink-2` | `#3d5166` |
| Meta | `--ink-3` | `#6b7f92` |
| Line | `--rule` | `#d5dee8` |
| Accent | `--accent` | `#0a4a82` |
| Accent soft | `--accent-soft` | `#e6f0f8` |
| CTA | `--btn-bg` | `#0a4a82` |

- **Surfaces:** white + 1px `--rule` + radius **4px** only. Same for header strip, entries, product groups, table wrap.
- **Type:** IBM Plex Sans (display + body) · IBM Plex Mono (model codes, kickers, meta counts)
- **Accent ≤ 5%** — primary button, links, active nav, top rule. Never fill whole sections.
- **No** graphite/dark sections, gradient heroes, photo plates, shadows > hairline feel.

## Signature

1. **Mono model codes** — series/type numbers and scannable IDs in IBM Plex Mono so the page reads as a parts list, not a marketing site.
2. **Cobalt top rule** — 2px solid `--accent` on the root (spec-paper top line).

## Layout

- Shell max 1000px
- Header sticky · Footer single line
- Home: hero + CTAs → docs band → series preview → selector strip
- Content: page head → list/table

## CTA

Primary: solid cobalt (`--btn-bg`), **white text forced**. Secondary: white + border.
