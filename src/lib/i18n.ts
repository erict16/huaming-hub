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
    products: "Series",
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
    home: "Home",
    downloads: "Docs",
    selector: "Selector",
    official: "Official",
  },
  home: {
    kicker: "Unofficial · Huaming",
    title: "OLTC / DETC documents",
    lead: (n: number) =>
      `${n} official PDFs — leaflets, data sheets, manuals. Find a model, open the file.`,
    ctaDocs: "Browse documents",
    ctaSelector: "Selector",
    metaSeries: "product series",
    metaDocs: "technical PDFs",
    metaLang: "interface",
    seriesTitle: "Series index",
    seriesCta: "All docs",
    seriesFoot: "PDFs on intl-huaming.com · not hosted here",
    opensExternal: "opens in a new tab",
  },
  products: {
    official: "Official",
    docs: "Filter docs",
  },
  downloads: {
    title: "Docs",
    sub: (n: number) =>
      `${n} PDFs · series below · search by model · files on international site`,
    seriesIndexTitle: "Series",
    seriesIndexSub: "Pick a family to filter the table, or open the official product page.",
    filesTitle: "Files",
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
    products: "系列",
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
    home: "首页",
    downloads: "资料",
    selector: "选型",
    official: "官网",
  },
  home: {
    kicker: "非官方 · 华明",
    title: "有载 / 无励磁分接开关资料",
    lead: (n: number) =>
      `${n} 份官方 PDF — 简介、参数表、操作说明。找到型号，打开文件。`,
    ctaDocs: "浏览资料",
    ctaSelector: "选型",
    metaSeries: "产品系列",
    metaDocs: "技术 PDF",
    metaLang: "界面语言",
    seriesTitle: "系列索引",
    seriesCta: "全部资料",
    seriesFoot: "PDF 在华明国际站 · 本站不托管",
    opensExternal: "在新标签打开",
  },
  products: {
    official: "官网",
    docs: "筛资料",
  },
  downloads: {
    title: "技术资料",
    sub: (n: number) =>
      `${n} 份 PDF · 下方系列 · 按型号搜 · 文件在国际站`,
    seriesIndexTitle: "系列",
    seriesIndexSub: "点家族可筛表格，或打开官网产品页。",
    filesTitle: "文件",
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
