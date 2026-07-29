# Design — 华明 Hub

One calm surface language for every page. No dark bands, no competing card systems.

## Audience

Procurement / engineering · unofficial OLTC docs hub

## System (locked)

| Role | Token | Value |
|------|-------|-------|
| Page | `--paper` | `#f5f7fa` |
| Surface | `--paper-2` | `#ffffff` |
| Soft fill | `--paper-3` | `#eef2f6` |
| Text | `--ink` | `#0f2438` |
| Secondary | `--ink-2` | `#4a5d70` |
| Meta | `--ink-3` | `#738496` |
| Line | `--rule` | `#dce3eb` |
| Accent | `--accent` | `#0a4a82` |
| Accent soft | `--accent-soft` | `#e8f0f7` |
| CTA | `--btn-bg` | `#0a4a82` |

- **Surfaces:** white + 1px `--rule` + radius 6px only. Same for header strip, entries, product groups, table wrap.
- **Type:** Space Grotesk (display) · Inter (body) · JetBrains Mono (codes/kickers)
- **Accent ≤ 5%** — primary button, links, active nav. Never fill whole sections.
- **No** graphite/dark sections, gradient heroes, photo plates, shadows > hairline feel.

## Layout

- Shell max 1000px
- Header sticky · Footer single line
- Home: hero text → 3 equal entries → short how-to
- Content: page head → list/table

## CTA

Primary: solid blue, **white text forced**. Secondary: white + border.
