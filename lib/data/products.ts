export type ProductSeries = {
  code: string;
  name: string;
  category: string;
  blurb: { en: string; zh: string };
  highlights: string[];
  href: string;
};

export const productSeries: ProductSeries[] = [
  {
    code: "CV / SV",
    name: "Selector switch (oil)",
    category: "Conventional OLTC",
    blurb: {
      en: "Oil-immersed selector type. Common on distribution and power TXs.",
      zh: "油浸选择开关式，配电/电力变常用。",
    },
    highlights: ["Oil-immersed", "Wide current", "Distribution"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/15-cv",
  },
  {
    code: "CM / CMD",
    name: "Diverter switch (oil)",
    category: "Conventional OLTC",
    blurb: {
      en: "Diverter type for higher current. Service manuals available.",
      zh: "切换开关式，电流更大一档，现场维护资料齐。",
    },
    highlights: ["Higher current", "Service docs", "Modular"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/1-cm",
  },
  {
    code: "CV2",
    name: "Vacuum selector",
    category: "Vacuum OLTC",
    blurb: {
      en: "Vacuum interrupter. Longer intervals; cleaner oil compartment.",
      zh: "真空灭弧，维护周期长，油室更干净。",
    },
    highlights: ["Vacuum", "Low maintain", "Long life"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/4-cv2",
  },
  {
    code: "CM2 / SHZV",
    name: "Vacuum diverter",
    category: "Vacuum OLTC",
    blurb: {
      en: "Vacuum diverter for grid and heavy industrial duty.",
      zh: "真空切换，电网和工业重载场合。",
    },
    highlights: ["Vacuum", "Grid-grade", "Heavy duty"],
    href: "https://www.intl-huaming.com/products-page/product/17-shzv",
  },
  {
    code: "HWV / HWDK",
    name: "Compact vacuum",
    category: "Vacuum OLTC",
    blurb: {
      en: "Compact vacuum for new builds and tight retrofit slots.",
      zh: "紧凑真空，新装或改造空间紧时好放。",
    },
    highlights: ["Compact", "Retrofit", "Fast ship"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/19-hwv",
  },
  {
    code: "CHVT / SHGV",
    name: "Converter / special",
    category: "Vacuum OLTC",
    blurb: {
      en: "Converter transformers, HVDC, and other special duty.",
      zh: "换流变、特高压等特种工况。",
    },
    highlights: ["HVDC", "Converter", "Special"],
    href: "https://www.intl-huaming.com/products-page/product/18-chvt",
  },
  {
    code: "CZ / CVT",
    name: "Dry-type vacuum",
    category: "Dry-type OLTC",
    blurb: {
      en: "For dry-type TXs: indoor substations and renewables.",
      zh: "干变用，室内站和新能源侧。",
    },
    highlights: ["Dry-type", "Indoor", "Renewables"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/21-cz",
  },
  {
    code: "W/G · W/L · ZWC",
    name: "Off-circuit (DETC)",
    category: "DETC / OCTC",
    blurb: {
      en: "Off-circuit range: cage and drum designs.",
      zh: "无励磁，笼式/鼓式都有。",
    },
    highlights: ["Cage/drum", "Cost-eff.", "Wide Um"],
    href: "https://www.intl-huaming.com/products-page/product/6-w_g",
  },
  {
    code: "SHM / CMA7 / HMC",
    name: "Drives & controls",
    category: "Accessories",
    blurb: {
      en: "Motor drives, voltage regulators, and monitoring.",
      zh: "电动机构、调压控制器、在线监测。",
    },
    highlights: ["MDU", "AVR", "Monitor"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/11-shm-d",
  },
];
