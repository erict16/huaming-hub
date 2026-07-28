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
    blurb:
      "Proven oil-immersed selector-switch OLTCs for distribution and power transformers — the workhorse range for global utilities.",
    highlights: ["Oil-immersed", "Wide current range", "Field proven"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/15-cv",
  },
  {
    code: "CM / CMD",
    name: "Conventional diverter switch",
    category: "Conventional OLTC",
    blurb:
      "Diverter-switch technology for higher ratings, with modular design and mature service network.",
    highlights: ["High reliability", "Service-friendly", "Modular"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/1-cm",
  },
  {
    code: "CV2",
    name: "Vacuum selector switch",
    category: "Vacuum OLTC",
    blurb:
      "Next-gen vacuum interrupter OLTC — lower maintenance, longer contact life, cleaner oil compartment.",
    highlights: ["Vacuum interrupter", "Low maintenance", "Long life"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/4-cv2",
  },
  {
    code: "CM2 / SHZV",
    name: "Vacuum diverter & high-end",
    category: "Vacuum OLTC",
    blurb:
      "Vacuum diverter platforms including SHZV for demanding grid and industrial applications.",
    highlights: ["Vacuum diverter", "Grid-grade", "Global installs"],
    href: "https://www.intl-huaming.com/products-page/product/17-shzv",
  },
  {
    code: "HWV / HWDK",
    name: "Vacuum high-performance",
    category: "Vacuum OLTC",
    blurb:
      "Compact vacuum solutions engineered for modern transformer designs and retrofit programs.",
    highlights: ["Compact", "Retrofit ready", "Fast delivery"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/19-hwv",
  },
  {
    code: "CHVT / SHGV",
    name: "Converter & special duty",
    category: "Vacuum OLTC",
    blurb:
      "Specialized tap-changers for converter transformers and high-voltage DC / special applications.",
    highlights: ["HVDC / converter", "Special duty", "Engineering support"],
    href: "https://www.intl-huaming.com/products-page/product/18-chvt",
  },
  {
    code: "CZ / CVT",
    name: "Dry-type vacuum OLTC",
    category: "Dry-type OLTC",
    blurb:
      "Dry-type transformer OLTCs for indoor substations, renewables, and fire-sensitive sites.",
    highlights: ["Dry-type", "Indoor friendly", "Renewables"],
    href: "https://www.intl-huaming.com/products-page-for-categories-listing/product/21-cz",
  },
  {
    code: "W/G · W/L · ZWC",
    name: "Off-circuit tap changers",
    category: "DETC / OCTC",
    blurb:
      "Cage and drum DETC ranges for de-energized regulation across oil-immersed transformers.",
    highlights: ["Cage & drum", "Cost effective", "Wide Um range"],
    href: "https://www.intl-huaming.com/products-page/product/6-w_g",
  },
  {
    code: "SHM / CMA7 / HMC",
    name: "Motor drives & controllers",
    category: "Accessories",
    blurb:
      "Motor-drive units, automatic voltage regulators and monitoring controllers for full system control.",
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
