export type Locale = "en" | "zh";

export const defaultLocale: Locale = "en";

export function isLocale(v: string | null | undefined): v is Locale {
  return v === "en" || v === "zh";
}

const en = {
  brand: "Huaming Hub",
  brandSub: "OLTC docs · buyers",
  navDocs: "Docs",
  navSelector: "Selector",
  navFiles: "Files",
  navSeries: "Series",
  official: "Official",
  homeKicker: "Unofficial · Huaming",
  homeTitle: "OLTC / DETC documents",
  homeLead: (n: number) =>
    `${n} official PDFs — leaflets, data sheets, manuals. Search a model code and open the file.`,
  homeCtaDocs: "Browse documents",
  homeCtaFiles: "Open PDF table",
  homeCtaSelector: "Type selector",
  homeMetaSeries: "product series",
  homeMetaDocs: "technical PDFs",
  homeNote: "PDFs open on intl-huaming.com. This site does not host files.",
  opensExternal: "opens in a new tab",
  filesTitle: "Files",
  filesSub: (n: number) =>
    `${n} PDFs · filter by model or series · files on international site`,
  searchPlaceholder: "Model or file, e.g. CV2, SHZV…",
  filterLabel: "Filter by series",
  colModel: "Model",
  colFile: "File",
  colKind: "Type",
  colSeries: "Series",
  empty: "No matches. Try another keyword.",
  note: "PDFs open on intl-huaming.com. Not hosted here.",
  seriesTitle: "Series",
  seriesSub: "OLTC / DETC families. Filter the file table or open the official page.",
  seriesFilter: "Filter files",
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
  footerBlurb: "Unofficial reference · PDFs on intl-huaming.com",
};

const zh: typeof en = {
  brand: "华明 Hub",
  brandSub: "分接开关资料 · 采购用",
  navDocs: "资料",
  navSelector: "选型",
  navFiles: "文件",
  navSeries: "系列",
  official: "官网",
  homeKicker: "非官方 · 华明",
  homeTitle: "有载 / 无励磁分接开关资料",
  homeLead: (n: number) =>
    `${n} 份官方 PDF — 简介、参数表、操作说明。按型号搜索并打开文件。`,
  homeCtaDocs: "浏览资料",
  homeCtaFiles: "打开 PDF 表",
  homeCtaSelector: "选型工具",
  homeMetaSeries: "产品系列",
  homeMetaDocs: "技术 PDF",
  homeNote: "PDF 在华明国际站打开，本站不托管文件。",
  opensExternal: "在新标签打开",
  filesTitle: "文件",
  filesSub: (n: number) =>
    `${n} 份 PDF · 可按型号/系列筛 · 文件在国际站`,
  searchPlaceholder: "型号或文件名，如 CV2、SHZV…",
  filterLabel: "按系列筛选",
  colModel: "型号",
  colFile: "文件",
  colKind: "类型",
  colSeries: "系列",
  empty: "没有匹配，换个关键字。",
  note: "PDF 打开 intl-huaming.com，本站不托管文件。",
  seriesTitle: "系列",
  seriesSub: "有载 / 无励磁家族。可筛文件表，或打开官网产品页。",
  seriesFilter: "筛文件",
  kind: {
    Leaflet: "简介",
    "Technical Data": "参数",
    "Operating Instruction": "操作",
    "Controller Manual": "控制器",
    Document: "文档",
  },
  category: {
    all: "全部",
    "Conventional OLTC": "常规",
    "Vacuum OLTC": "真空",
    "Dry-type OLTC": "干式",
    "DETC / OCTC": "无励磁",
    Accessories: "附件",
    "Service & Retrofit": "改造",
  },
  footerBlurb: "非官方参考 · PDF 在华明国际站",
};

export type Dict = typeof en;

export function getDict(locale: Locale): Dict {
  return locale === "zh" ? zh : en;
}
