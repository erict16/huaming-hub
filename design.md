# Design — 华明 Hub（门户 + 文档）

先门户，再进文档。冷纸一语。不营销。

## Audience

Procurement / engineering · unofficial OLTC docs hub

## Jobs (priority)

1. 打开站，知道这是华明资料站  
2. 进文档页，按型号 / 系列找到官方 PDF  
3. 打开选型工具（外链）  
4. 切换 EN ↔ 中文  

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

- **Surfaces:** white + 1px `--rule` + radius **3–4px**
- **Type:** IBM Plex Sans (UI) · IBM Plex Mono (model codes, kickers)
- **Accent ≤ 5%**
- **No** graphite/dark sections, gradient heroes, photo plates

## Signature

1. **Mono model codes** — scannable IDs  
2. **Cobalt top rule** — 2px solid `--accent` on root  

## Layout / IA

- Shell max ~1040px  
- Nav: **Docs** → `/downloads` · **Selector** ↗ · EN/中（无 Series）  
- **Home `/`:** 门户 — kicker · H1 · lead · CTAs · 数字 · 系列速览板  
- **`/downloads`:** 系列索引（原 Products）+ 搜索/chips + PDF 表  
- **`/products`:** 重定向到 `/downloads`  
- **滚动:** 整页一条；表格禁止 `max-height` 内滚  

## CTA

Primary: solid cobalt, white text. Secondary: white + border.

## Spec

`docs/superpowers/specs/2026-07-29-portal-docs-design.md`
