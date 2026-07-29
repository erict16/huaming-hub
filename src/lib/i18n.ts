export type Locale = "en" | "zh";

export const defaultLocale: Locale = "en";

export function isLocale(v: string): v is Locale {
  return v === "en" || v === "zh";
}

/** Detect locale from Next.js pathname (no basePath). */
export function localeFromPath(pathname: string): Locale {
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return "en";
}

/** Strip /zh prefix → path in default (en) space. */
export function barePath(pathname: string): string {
  if (pathname === "/zh" || pathname === "/zh/") return "/";
  if (pathname.startsWith("/zh/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

/** Build localized href. trailingSlash-friendly. */
export function localePath(locale: Locale, path: string): string {
  let p = path.startsWith("/") ? path : `/${path}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  if (locale === "zh") {
    if (p === "/" || p === "") return "/zh/";
    return `/zh${p}/`;
  }
  if (p === "/" || p === "") return "/";
  return `${p}/`;
}

/** Switch current path to another locale. */
export function switchLocale(pathname: string, target: Locale): string {
  return localePath(target, barePath(pathname));
}

const en = {
  brand: "Huaming Hub",
  brandSub: "OLTC docs · buyers",
  nav: {
    home: "Home",
    products: "Products",
    downloads: "Documents",
    selector: "Selector",
    primary: "Primary",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  official: "Official site",
  langEn: "EN",
  langZh: "中文",
  footer: {
    blurb:
      "Unofficial reference site for Huaming on-load tap changer literature. Product pages and PDFs link to Huaming’s international site. For procurement and engineering reference only.",
    products: "Products",
    downloads: "Documents",
    selector: "Selector",
    official: "Official site",
  },
  home: {
    kicker: "Huaming Power Equipment · OLTC",
    title: "Product literature for tap-changer buyers",
    lead:
      "Browse Huaming on-load and off-circuit tap-changer series, download technical PDFs, and open the OLTC selector. Built for procurement and engineering teams who need specs fast.",
    ctaProducts: "Browse products",
    ctaDocs: "Download documents",
    ctaSelector: "Open selector",
    meta: (series: number, docs: number) =>
      `${series} product series · ${docs} documents · PDFs on official site`,
    entriesLabel: "Quick links",
    entryProductsTitle: "Product series",
    entryProductsDesc: "Conventional, vacuum, dry-type OLTC and drives",
    entryProductsCta: "View series",
    entryDocsTitle: "Technical documents",
    entryDocsDesc: (n: number) =>
      `${n} leaflets, data sheets and operating instructions`,
    entryDocsCta: "Browse PDFs",
    entrySelectorTitle: "OLTC selector",
    entrySelectorDesc: "Match voltage and current to catalogue types",
    entrySelectorCta: "Open tool",
    howTitle: "How to use this site",
    how1Title: "1. Pick a series",
    how1Body: "Start from Products if you know the duty (oil, vacuum, dry-type).",
    how2Title: "2. Download PDFs",
    how2Body:
      "Filter by model on Documents — leaflets, technical data and manuals.",
    how3Title: "3. Cross-check with selector",
    how3Body:
      "Use the selector for a first-pass type; confirm with official datasheets.",
    opensExternal: "opens in a new tab",
  },
  products: {
    title: "Product series",
    sub: "Huaming on-load and off-circuit tap changers and drive units. Specs and PDFs are under Documents.",
    official: "Official",
    docs: "Documents",
  },
  downloads: {
    title: "Technical documents",
    sub: (n: number) =>
      `${n} leaflets, technical data sheets and operating instructions · filter by model · files hosted on the international site`,
    searchPlaceholder: "Model / file name, e.g. CV2, SHZV…",
    all: "All",
    colModel: "Model",
    colFile: "File",
    colKind: "Type",
    colSeries: "Series",
    colAction: "Download",
    filterLabel: "Filter by series",
    tableCaption: "Technical PDF documents",
    empty: "No matches. Try another keyword.",
    note: "Links open public PDFs on intl-huaming.com. This site does not host files.",
    kind: {
      Leaflet: "Leaflet",
      "Technical Data": "Data",
      "Operating Instruction": "Manual",
      "Controller Manual": "Controller",
      Document: "Doc",
    } as Record<string, string>,
    category: {
      all: "All",
      "Conventional OLTC": "Conventional",
      "Vacuum OLTC": "Vacuum",
      "Dry-type OLTC": "Dry-type",
      "DETC / OCTC": "DETC / OCTC",
      Accessories: "Accessories",
      "Service & Retrofit": "Service",
    } as Record<string, string>,
  },
} as const;

const zh = {
  brand: "华明 Hub",
  brandSub: "分接开关资料 · 采购",
  nav: {
    home: "首页",
    products: "产品",
    downloads: "资料",
    selector: "选型",
    primary: "主导航",
    language: "语言",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
  },
  official: "官网",
  langEn: "EN",
  langZh: "中文",
  footer: {
    blurb:
      "非官方参考站，面向采购与工程查阅华明有载分接开关产品与技术资料。产品页与 PDF 链至华明国际站。",
    products: "产品",
    downloads: "资料",
    selector: "选型器",
    official: "官网",
  },
  home: {
    kicker: "华明装备 · 有载分接开关",
    title: "面向采购的分接开关资料站",
    lead:
      "浏览华明有载 / 无励磁分接开关系列，下载规范书与 Leaflet，并用选型器做初筛。为采购与工程团队快速取用技术资料而整理。",
    ctaProducts: "浏览产品",
    ctaDocs: "下载资料",
    ctaSelector: "打开选型器",
    meta: (series: number, docs: number) =>
      `${series} 个产品系列 · ${docs} 份资料 · PDF 在官网`,
    entriesLabel: "快捷入口",
    entryProductsTitle: "产品系列",
    entryProductsDesc: "常规、真空、干式 OLTC 与电动机构",
    entryProductsCta: "查看系列",
    entryDocsTitle: "技术资料",
    entryDocsDesc: (n: number) => `${n} 份简介、参数表与操作说明`,
    entryDocsCta: "浏览 PDF",
    entrySelectorTitle: "OLTC 选型",
    entrySelectorDesc: "按电压、电流等条件对照型号",
    entrySelectorCta: "打开工具",
    howTitle: "使用方式",
    how1Title: "1. 选系列",
    how1Body: "已知工况（油浸 / 真空 / 干式）可从产品页入手。",
    how2Title: "2. 下资料",
    how2Body: "在资料页按型号筛选 Leaflet、技术数据与操作说明。",
    how3Title: "3. 选型核对",
    how3Body: "选型器仅供初筛，最终以官网与正式规范书为准。",
    opensExternal: "在新标签打开",
  },
  products: {
    title: "产品系列",
    sub: "华明有载 / 无励磁分接开关与机构一览。详细参数与 PDF 见技术资料。",
    official: "官网",
    docs: "资料",
  },
  downloads: {
    title: "技术资料",
    sub: (n: number) =>
      `${n} 份规范书、Leaflet 与操作说明 · 可按型号筛选 · 文件链至国际站`,
    searchPlaceholder: "型号 / 文件名，如 CV2、SHZV…",
    all: "全部",
    colModel: "型号",
    colFile: "文件",
    colKind: "类型",
    colSeries: "系列",
    colAction: "下载",
    filterLabel: "按系列筛选",
    tableCaption: "技术 PDF 列表",
    empty: "没有匹配，换个关键字。",
    note: "链接到国际站公开 PDF，本站不托管。",
    kind: {
      Leaflet: "简介",
      "Technical Data": "参数",
      "Operating Instruction": "操作",
      "Controller Manual": "控制器",
      Document: "文档",
    } as Record<string, string>,
    category: {
      all: "全部",
      "Conventional OLTC": "常规",
      "Vacuum OLTC": "真空",
      "Dry-type OLTC": "干式",
      "DETC / OCTC": "无励磁",
      Accessories: "附件",
      "Service & Retrofit": "改造",
    } as Record<string, string>,
  },
} as const;

export type Dict = typeof en;

export const dictionaries: Record<Locale, Dict> = {
  en: en as Dict,
  zh: zh as unknown as Dict,
};

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries.en;
}

export const SELECTOR_URL = "https://erict16.github.io/oltc-selector/";
export const OFFICIAL_URL = "https://www.intl-huaming.com/";
