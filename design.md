# Design — 华明 Hub (Fumadocs)

Fumadocs 文档壳 + 华明 PDF / 系列内容。

## Audience

Procurement / engineering · unofficial OLTC docs hub

## Jobs

1. Find official PDF by model / series  
2. Recognise product series  
3. Open type selector (external)  

## Stack

- Fumadocs UI + MDX  
- Next.js App Router  
- Data: `lib/data/documents.json`, `lib/data/products.ts`  
- Deploy: Vercel  

## Layout

- Home: short identity + CTAs  
- Docs sidebar: Overview · Files · Series  
- Nav: Docs · Files · Series · Selector ↗  
- PDF table: one page scroll (no nested max-height)  
- PDFs stay on intl-huaming.com  

## Spec

`docs/superpowers/specs/2026-07-29-fumadocs-hub-design.md`
