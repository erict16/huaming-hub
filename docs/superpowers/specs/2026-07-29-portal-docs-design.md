# Design: Huaming Hub — Portal home + Docs workbench

**Date:** 2026-07-29  
**Status:** approved (Eric)  
**Route:** B · 先门户，再进文档  
**Repo:** `~/Github/huaming-hub` → https://erict16.github.io/huaming-hub/

---

## 人话（先读这个）

1. **打开网站**先看到介绍和入口，不是一张 PDF 表。  
2. **点「资料 / Docs」**进文档页：搜索、系列说明、PDF 表。  
3. **没有单独产品页**；旧 `/products` 链自动进文档。  
4. **文档页往下滚只有一条滚动条**（修双重滚动）。

---

## Goal / non-goals

### Goal

- 首页有「站的感觉」  
- 找 PDF 在文档页，三秒内能搜到  
- 系列信息并进文档页，少一跳导航  
- 滚动不卡  

### Non-goals

- 不托管 PDF  
- 不改 oltc-selector  
- 不恢复深色 marketing 大横条 / 长 howto  
- 不接 Email Desk  

---

## IA

```
/                 门户主页
/downloads/       文档工作台（含原 Products 内容）
/products/        → 重定向到 /downloads/（保留 ?q=）
/zh/*             中文镜像
↗ oltc-selector   选型
```

### Nav

| 项 | 目标 |
|----|------|
| Logo | `/` |
| Docs / 资料 | `/downloads` |
| Selector / 选型 ↗ | 外链 |
| EN \| 中文 | 切换语言；保留 `?q=` |

去掉 Series / Products 导航项。Footer 同步：Home 或 Docs · Selector · Official。

---

## Home (`/`)

```
kicker
H1
lead（一句）
[ 进资料 ]  [ 选型 ↗ ]
数字：系列数 · PDF 数
系列速览（约 8 个 mono 码）→ /downloads?q=…
footer
```

创意：冷纸 + cobalt 顶线 + mono 系列码作索引，像规格书扉页，不是 SaaS 营销落地页。

---

## Docs (`/downloads`)

```
标题 + 一句说明
系列索引（原 Products：家族分组，码 / 名 / 一句 blurb / 官网 / 点码即筛表）
搜索 + 系列 chips
PDF 表（整页滚动，无 70vh 内滚）
官网托管说明
```

### 滚动

- **删除** `.hm-table-wrap` 的 `max-height: min(70vh, 720px)` 与纵向 `overflow: auto`  
- 窄屏可保留 `overflow-x: auto`  
- 搜索条可不 sticky；顶栏可 sticky  

---

## Products

- 页面组件可删或仅作 redirect  
- 书签 `/products`、`/zh/products` → downloads  

---

## Visual system

沿用 cold paper + IBM Plex + cobalt。不新开一套 token。

---

## Success

1. `/` 不是裸表  
2. 文档页单滚动  
3. 导航无 Series  
4. 旧 products 链可用  
5. EN/中文 + `?q=` 正常  
