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
    name: "Conventional selector switch",
    category: "Conventional OLTC",
    blurb: {
      en: "Oil-immersed selector-switch type. Common on distribution and power transformers.",
      zh: "油浸选择开关式，配电/电力变常用。",
    },
    highlights: ["Oil-immersed", "Wide current range", "Distribution & power"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/15-cv",
  },
  {
    code: "CM / CMD",
    name: "Conventional diverter switch",
    category: "Conventional OLTC",
    blurb: {
      en: "Diverter-switch type for higher current. Service manuals cover field work.",
      zh: "切换开关式，电流更大一档，现场维护资料齐。",
    },
    highlights: ["Higher current", "Service manuals", "Modular"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/1-cm",
  },
  {
    code: "CV2",
    name: "Vacuum selector switch",
    category: "Vacuum OLTC",
    blurb: {
      en: "Vacuum interrupter type. Longer service intervals; oil compartment stays cleaner.",
      zh: "真空灭弧，维护周期长，油室更干净。",
    },
    highlights: ["Vacuum interrupter", "Low maintenance", "Long life"],
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
    highlights: ["Vacuum diverter", "Grid-grade", "Global installs"],
    href: "https://www.intl-huaming.com/products-page/product/17-shzv",
  },
  {
    code: "HWV / HWDK",
    name: "Compact vacuum OLTC",
    category: "Vacuum OLTC",
    blurb: {
      en: "Compact vacuum units for new builds and retrofit slots.",
      zh: "紧凑真空，新装或改造空间紧时好放。",
    },
    highlights: ["Compact", "Retrofit ready", "Fast delivery"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/19-hwv",
  },
  {
    code: "CHVT / SHGV",
    name: "Converter and special duty",
    category: "Vacuum OLTC",
    blurb: {
      en: "For converter transformers, HVDC, and other special duty.",
      zh: "换流变、特高压等特种工况。",
    },
    highlights: ["HVDC / converter", "Special duty", "Engineering support"],
    href: "https://www.intl-huaming.com/products-page/product/18-chvt",
  },
  {
    code: "CZ / CVT",
    name: "Dry-type vacuum OLTC",
    category: "Dry-type OLTC",
    blurb: {
      en: "For dry-type transformers: indoor substations and renewables.",
      zh: "干变用，室内站和新能源侧。",
    },
    highlights: ["Dry-type", "Indoor friendly", "Renewables"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/21-cz",
  },
  {
    code: "W/G · W/L · ZWC",
    name: "Off-circuit tap changers",
    category: "DETC / OCTC",
    blurb: {
      en: "Off-circuit (DETC) range: cage and drum designs.",
      zh: "无励磁，笼式/鼓式都有。",
    },
    highlights: ["Cage & drum", "Cost effective", "Wide Um range"],
    href: "https://www.intl-huaming.com/products-page/product/6-w_g",
  },
  {
    code: "SHM / CMA7 / HMC",
    name: "Motor drives and controllers",
    category: "Accessories",
    blurb: {
      en: "Motor-drive units, voltage regulators, and monitoring options.",
      zh: "电动机构、调压控制器、在线监测。",
    },
    highlights: ["MDU", "AVR", "Monitoring"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/11-shm-d",
  },
];
