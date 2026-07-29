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
    downloads: "Docs",
    selector: "Selector",
    primary: "Primary",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  official: "Official",
  langEn: "EN",
  langZh: "中文",
  footer: {
    blurb: "Unofficial · PDFs on intl-huaming.com",
    products: "Products",
    downloads: "Docs",
    selector: "Selector",
    official: "Official",
  },
  home: {
    kicker: "Huaming · OLTC",
    title: "Tap-changer docs & PDFs",
    lead:
      "Huaming OLTC / DETC series, leaflets and manuals, plus a first-pass type selector.",
    ctaProducts: "Products",
    ctaDocs: "Docs",
    ctaSelector: "Selector",
    meta: (series: number, docs: number) =>
      `${series} series · ${docs} PDFs · official site files`,
    entriesLabel: "Quick links",
    entryProductsTitle: "Products",
    entryProductsDesc: "Oil, vacuum, dry-type, and drives",
    entryProductsCta: "Series",
    entryDocsTitle: "Docs",
    entryDocsDesc: (n: number) => `${n} leaflets, data sheets, manuals`,
    entryDocsCta: "PDFs",
    entrySelectorTitle: "Selector",
    entrySelectorDesc: "Voltage & current → catalogue type",
    entrySelectorCta: "Open",
    opensExternal: "opens in a new tab",
  },
  products: {
    title: "Products",
    sub: "OLTC / DETC and drives. Specs and PDFs under Docs.",
    official: "Official",
    docs: "Docs",
  },
  downloads: {
    title: "Docs",
    sub: (n: number) =>
      `${n} PDFs · filter by model · files on international site`,
    searchPlaceholder: "Model or file, e.g. CV2, SHZV…",
    all: "All",
    colModel: "Model",
    colFile: "File",
    colKind: "Type",
    colSeries: "Series",
    colAction: "PDF",
    filterLabel: "Filter by series",
    tableCaption: "Technical PDFs",
    empty: "No matches. Try another keyword.",
    note: "PDFs open on intl-huaming.com. Not hosted here.",
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
      "DETC / OCTC": "DETC",
      Accessories: "Accessories",
      "Service & Retrofit": "Service",
    } as Record<string, string>,
  },
} as const;

const zh = {
  brand: "华明 Hub",
  brandSub: "分接开关资料 · 采购用",
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
    blurb: "非官方参考 · PDF 在华明国际站",
    products: "产品",
    downloads: "资料",
    selector: "选型",
    official: "官网",
  },
  home: {
    kicker: "华明装备 · 有载分接开关",
    title: "分接开关资料与产品 PDF",
    lead:
      "查华明有载 / 无励磁分接开关系列，下载 Leaflet 与操作说明，也可用选型器做初筛。",
    ctaProducts: "浏览产品",
    ctaDocs: "下载资料",
    ctaSelector: "打开选型器",
    meta: (series: number, docs: number) =>
      `${series} 个系列 · ${docs} 份 PDF · 文件在官网`,
    entriesLabel: "快捷入口",
    entryProductsTitle: "产品系列",
    entryProductsDesc: "油浸、真空、干式 OLTC 与电动机构",
    entryProductsCta: "查看系列",
    entryDocsTitle: "技术资料",
    entryDocsDesc: (n: number) => `${n} 份简介、参数表与操作说明`,
    entryDocsCta: "浏览 PDF",
    entrySelectorTitle: "OLTC 选型",
    entrySelectorDesc: "按电压、电流对照型号",
    entrySelectorCta: "打开工具",
    opensExternal: "在新标签打开",
  },
  products: {
    title: "产品系列",
    sub: "有载 / 无励磁分接开关与机构。参数与 PDF 在「资料」。",
    official: "官网",
    docs: "资料",
  },
  downloads: {
    title: "技术资料",
    sub: (n: number) =>
      `${n} 份 PDF · 可按型号筛 · 文件在国际站`,
    searchPlaceholder: "型号或文件名，如 CV2、SHZV…",
    all: "全部",
    colModel: "型号",
    colFile: "文件",
    colKind: "类型",
    colSeries: "系列",
    colAction: "下载",
    filterLabel: "按系列筛选",
    tableCaption: "技术 PDF 列表",
    empty: "没有匹配，换个关键字。",
    note: "PDF 打开 intl-huaming.com，本站不托管文件。",
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
