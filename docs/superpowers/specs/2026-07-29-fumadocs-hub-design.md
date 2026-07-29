# Design: Huaming Hub on Fumadocs

**Date:** 2026-07-29  
**Status:** pending Eric approval  
**Stack:** Fumadocs + Next.js · content from existing hub data  
**Live target:** Vercel (primary); keep GitHub repo `erict16/huaming-hub`

---

## 人话（先读这个）

1. **不用再手搓整站皮肤。** 用 Fumadocs 当文档站壳（侧栏、搜索、排版）。  
2. **华明的东西塞进去：** 系列、~45 份 PDF 外链、中英、选型外链。  
3. **PDF 仍开 intl-huaming.com**，本站不托管文件。  
4. **旧站先可并行：** 在同 repo 新分支 / 重做 app；满意后再切线上。  
5. **不接报价、邮件、Email Desk。**

---

## Goal

打开站 → 知道是华明资料站 → 搜型号或点系列 → 打开官方 PDF。看起来像正经文档站，不要越改越丑的自制 hero 实验。

## Non-goals

- 不重做 oltc-selector（外链）  
- 不托管 PDF  
- 不做购物车 / CMS / 登录  
- 不做 market / 盘口  
- 不强制保留 cold-paper 全套 token（品牌色可微调 cobalt，以 Fumadocs 默认为主）

---

## IA（你打开会看到）

| 路径 | 内容 |
|------|------|
| `/`（或 `/en`） | 首页：一句话说明 + 大搜索入口 + 进资料 |
| `/docs` 或侧栏根 | 系列索引 + 链到筛选后的文件列表 |
| 文件列表页 | 搜索 + 系列筛选 + PDF 表（现有 `documents.json`） |
| 系列说明（可选一页） | 原 products 的 blurb / 官网链 |
| 选型 | 顶栏外链 → oltc-selector |
| `/zh/…` | 中文镜像（Fumadocs i18n） |

Nav 精简：**Docs · Selector ↗ · EN | 中文**（Logo 回首页）。

---

## 数据（从现站搬）

| 源 | 用途 |
|----|------|
| `src/data/documents.json` | PDF 表 |
| `src/data/products.ts` | 系列侧栏 / 索引 |
| `src/lib/documents.ts` 过滤逻辑 | 搜索 OR token、`productDocsQuery` |
| 品牌图 `public/brand/` | logo / favicon |
| 文案 | 短、中英；非官方 disclaimer 页脚保留 |

---

## 壳怎么用

- **Scaffold:** 官方 `create-fumadocs-app`（或当前推荐 starter）  
- **自定义页：** 文件列表 = React 组件（表 + 搜索），不是硬写成 45 篇 Markdown  
- **MDX：** 首页、关于/免责可 MDX；系列可用 MDX 索引或纯组件  
- **搜索：** 优先 Fumadocs 内置；PDF 表内另有型号 filter（现逻辑）  
- **主题：** 默认 + 华明蓝一点 accent；不重做第三套 cold-paper  

---

## 部署

1. **Vercel** 连 `huaming-hub`（或新 branch `main` 切过去后）  
2. 自定义域可选；过渡期可 `*.vercel.app`  
3. 旧 GitHub Pages 可暂时留着或 README 标明迁 Vercel  

（Fumadocs 以 Node SSR/静态生成为主；**不**再死磕 `output: 'export'` 到 GH Pages，除非后期明确要求。）

---

## 实施顺序

1. 新分支 `redo/fumadocs`：scaffold Fumadocs  
2. 迁 brand、documents、products、filter  
3. 首页 + 文件表 + 系列侧栏 + i18n  
4. 顶栏选型外链 + footer 免责  
5. 本地看齐 → Vercel preview → 你点头再切生产  

---

## Success

1. 打开不像裸后台表，也不像失败 hero 实验  
2. 搜 `CV2` / `SHZV` 能出对的 PDF  
3. 点系列能缩小列表  
4. 中英可切换  
5. PDF 仍外链官方  
6. 你主观觉得「比现在好看、能用」  

---

## Out of scope this pass

- 把选型器嵌进站内  
- AI 问答 PDF  
- 登录 / 私有文档  
