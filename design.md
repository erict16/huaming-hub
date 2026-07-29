# Design — 华明 Hub (huaming-hub)

Locked design system. Read before any page work.

## Audience

Procurement and engineering buyers looking up Huaming OLTC / DETC series, technical PDFs, and a first-pass type selector. Unofficial reference — not corporate PR, not a trading desk.

## Genre · tone

modern-minimal · utilitarian B2B / industrial docs

## Macrostructure

**Split Studio** (home): left copy + actions · right catalogue plate.  
Content pages: hanging page-head + dense list/table.

**Nav:** N1b (wordmark · links · Documents CTA · lang).  
**Footer:** Ft2 single inline line.

## Theme · Cobalt industrial

| Token | Value | Role |
|-------|-------|------|
| `--paper` | `#f4f6f9` | page ground (cool, not pure white) |
| `--paper-2` | `#ffffff` | raised surfaces |
| `--paper-3` | `#e8edf3` | table head / subtle fill |
| `--ink` | `#0c1f33` | primary text |
| `--ink-2` | `#3d5166` | secondary body |
| `--ink-3` | `#6b7f94` | meta / captions |
| `--rule` | `#d5dde7` | hairlines |
| `--rule-2` | `#b8c5d4` | stronger border |
| `--accent` | `#0b4f9c` | cobalt signal (≤5% viewport) |
| `--accent-soft` | `#e5eef8` | soft fill |
| `--btn-bg` | `#0b4f9c` | primary CTA |
| `--btn-fg` | `#ffffff` | primary CTA text (forced) |
| `--graphite` | `#121f2e` | dark band / plate |

Accent is signal only. No gradient hero, no glass, no stock photo collage.

## Typography

- Display: Space Grotesk 500/600, roman only
- Body: Inter 400/500/600
- Mono: JetBrains Mono — codes, kickers, counts
- Body 15px; hero H1 clamp ~1.75–2.35rem; page H1 1.5rem
- Measure: lead ≤ 36rem

## Spacing

4pt scale `--s1`…`--s12`. Section gaps large on home (`--s10` / `--s12`). Content pages tighter.

## Motion

- Hover/bg ≤ 150ms; ease `cubic-bezier(0.16, 1, 0.3, 1)`
- Reduced-motion: opacity only
- No autoplay, no bounce

## CTA voice

- Primary: solid `--btn-bg`, white text forced (`#fff !important` on `a.hm-btn-primary`)
- Secondary: white + `--rule-2` border
- One primary action per view (Documents on home)

## A11y floor

- `:focus-visible` rings
- Skip link `#main`
- External: `rel="noopener noreferrer"`
- Touch targets ≥ 40px on primary controls

## Shared chrome

- Brand mark + Huaming Hub
- Sticky header + compact footer
- EN default; `/zh/*` Chinese
- Hairline structure, not card stacks

## Home sections (DOM order)

1. Split hero (copy · catalogue plate)  
2. Destination band (Documents · Products · Selector)  
3. Series preview (catalogue strip)  
4. Quiet how-to row  

## Enrichment

Typography + mono plate only. No product photo on home (source assets are hex-masked).

## Hallmark stamp

```
/* Hallmark · Split Studio · Cobalt · modern-minimal · P4 H4 E4 S4 R4 V4 */
```
