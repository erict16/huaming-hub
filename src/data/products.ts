export type ProductSeries = {
  code: string;
  name: string;
  category: string;
  blurb: string;
  highlights: string[];
  href: string;
};

export const productSeries: ProductSeries[] = [
  {
    code: "CV / SV",
    name: "Conventional selector switch",
    category: "Conventional OLTC",
    blurb: "油浸选择开关式，配电/电力变常用。",
    highlights: ["Oil-immersed", "Wide current range", "Field proven"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/15-cv",
  },
  {
    code: "CM / CMD",
    name: "Conventional diverter switch",
    category: "Conventional OLTC",
    blurb: "切换开关式，电流更大一档，现场维护资料齐。",
    highlights: ["High reliability", "Service-friendly", "Modular"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/1-cm",
  },
  {
    code: "CV2",
    name: "Vacuum selector switch",
    category: "Vacuum OLTC",
    blurb: "真空灭弧，维护周期长，油室更干净。",
    highlights: ["Vacuum interrupter", "Low maintenance", "Long life"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/4-cv2",
  },
  {
    code: "CM2 / SHZV",
    name: "Vacuum diverter & high-end",
    category: "Vacuum OLTC",
    blurb: "真空切换平台，电网和工业重载场合。",
    highlights: ["Vacuum diverter", "Grid-grade", "Global installs"],
    href: "https://www.intl-huaming.com/products-page/product/17-shzv",
  },
  {
    code: "HWV / HWDK",
    name: "Vacuum high-performance",
    category: "Vacuum OLTC",
    blurb: "紧凑真空，新设计或改造都好塞。",
    highlights: ["Compact", "Retrofit ready", "Fast delivery"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/19-hwv",
  },
  {
    code: "CHVT / SHGV",
    name: "Converter & special duty",
    category: "Vacuum OLTC",
    blurb: "换流变、特高压等特种工况。",
    highlights: ["HVDC / converter", "Special duty", "Engineering support"],
    href: "https://www.intl-huaming.com/products-page/product/18-chvt",
  },
  {
    code: "CZ / CVT",
    name: "Dry-type vacuum OLTC",
    category: "Dry-type OLTC",
    blurb: "干变用，室内站和新能源侧。",
    highlights: ["Dry-type", "Indoor friendly", "Renewables"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/21-cz",
  },
  {
    code: "W/G · W/L · ZWC",
    name: "Off-circuit tap changers",
    category: "DETC / OCTC",
    blurb: "无励磁，笼式/鼓式都有。",
    highlights: ["Cage & drum", "Cost effective", "Wide Um range"],
    href: "https://www.intl-huaming.com/products-page/product/6-w_g",
  },
  {
    code: "SHM / CMA7 / HMC",
    name: "Motor drives & controllers",
    category: "Accessories",
    blurb: "电动机构、调压控制器、在线监测。",
    highlights: ["MDU", "AVR", "Monitoring"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/11-shm-d",
  },
];

export const companyFacts = [
  { label: "Founded", value: "1989 / 1995*" },
  { label: "Stock", value: "002270.SZ" },
  { label: "HQ", value: "Shanghai, China" },
  { label: "Intl HQ", value: "Singapore" },
  { label: "Focus", value: "OLTC & DETC" },
  { label: "Markets", value: "100+ countries" },
];
