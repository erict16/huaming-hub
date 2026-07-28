import { jsonp } from "./jsonp";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  tag: "company" | "market" | "industry" | "intl" | "rumor";
};

function stripHtml(s: string) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function tagFor(title: string, content: string): NewsItem["tag"] {
  const t = (title + " " + content).toLowerCase();
  if (
    /华明|002270|huaming/.test(t) &&
    /中标|合同|订单|出口|新加坡|印尼|巴基斯坦|nigeria|seminar/.test(t)
  )
    return "company";
  if (/特高压|电力设备|变压器|电网|输变电|hvdc|oltc|分接/.test(t))
    return "industry";
  if (/外资|北向|资金|涨停|板块|净流入/.test(t)) return "market";
  if (/传闻|风声|或将|有望|消息称|rumor/.test(t)) return "rumor";
  if (/overseas|international|export|singapore|indonesia/.test(t)) return "intl";
  if (/华明|002270|公告/.test(t)) return "company";
  return "industry";
}

const curated: NewsItem[] = [
  {
    id: "curated-sg-hq",
    title: "Huaming opens international headquarters in Singapore",
    summary:
      "International HQ in Singapore positions Huaming closer to ASEAN utilities and EPCs during the energy transition.",
    source: "intl-huaming.com",
    date: "2024-01-01",
    url: "https://www.intl-huaming.com/component/content/article/huaming-power-equipment-opens-international-headquarters-in-singapore-to-leverage-opportunities-in-the-energy-transition-2?catid=19&Itemid=228",
    tag: "intl",
  },
  {
    id: "curated-longdong",
    title: "CHVT converter transformer OLTC commissioned at Longdong ±800kV HVDC",
    summary:
      "Huaming CHVT on-load tap changer successfully commissioned at Longdong converter station — a milestone for converter duty OLTCs.",
    source: "intl-huaming.com",
    date: "2024-06-01",
    url: "https://www.intl-huaming.com/component/content/article/huaming-chvt-converter-transformer-on-load-tap-changer-has-successfully-commissioned-at-longdong-800kv-hvdc-converter-station-in-china?catid=19&Itemid=228",
    tag: "company",
  },
  {
    id: "curated-indonesia",
    title: "Twenty years in Indonesia — building a trusted tap-changer brand",
    summary:
      "Long-term engagement in the Indonesian grid market with local support and reference projects.",
    source: "intl-huaming.com",
    date: "2024-03-01",
    url: "https://www.intl-huaming.com/component/content/article/shanghai-huaming-twenty-years-of-deep-engagement-in-indonesia-building-a-trusted-brand-for-customers?catid=19&Itemid=228",
    tag: "intl",
  },
  {
    id: "curated-nigeria",
    title: "Technical seminar successfully held in Nigeria for TCN",
    summary:
      "Training and technical exchange with Transmission Company of Nigeria on OLTC operation and maintenance.",
    source: "intl-huaming.com",
    date: "2024-05-01",
    url: "https://www.intl-huaming.com/component/content/article/huaming-technical-seminar-successfully-held-in-nigeria-for-tcn?catid=19&Itemid=228",
    tag: "intl",
  },
  {
    id: "curated-pakistan",
    title: "Tap-changer technical seminar held in Pakistan",
    summary:
      "Knowledge transfer session covering selection, commissioning and lifecycle service for OLTCs.",
    source: "intl-huaming.com",
    date: "2024-04-01",
    url: "https://www.intl-huaming.com/component/content/article/huaming-technical-seminar-on-tap-changer-successfully-held-in-pakistan?catid=19&Itemid=228",
    tag: "intl",
  },
];

type EmRow = {
  code?: string;
  title?: string;
  content?: string;
  mediaName?: string;
  date?: string;
  url?: string;
};

async function searchEastmoney(
  keyword: string,
  pageSize: number,
): Promise<EmRow[]> {
  const param = {
    uid: "",
    keyword,
    type: ["cmsArticleWebOld"],
    client: "web",
    clientType: "web",
    clientVersion: "curr",
    param: {
      cmsArticleWebOld: {
        searchScope: "default",
        sort: "default",
        pageIndex: 1,
        pageSize,
        preTag: "<em>",
        postTag: "</em>",
      },
    },
  };
  const url = `https://search-api-web.eastmoney.com/search/jsonp?param=${encodeURIComponent(
    JSON.stringify(param),
  )}`;
  const json = await jsonp<{
    result?: { cmsArticleWebOld?: EmRow[] };
  }>(url, "cb");
  return json?.result?.cmsArticleWebOld || [];
}

async function fetchAnnouncements(): Promise<NewsItem[]> {
  const url =
    "https://np-anotice-stock.eastmoney.com/api/security/ann?sr=-1&page_size=12&page_index=1&ann_type=A&client_source=web&stock_list=002270&f_node=0&s_node=0";
  const json = await jsonp<{
    data?: {
      list?: {
        art_code?: string;
        title_ch?: string;
        notice_date?: string;
        columns?: { column_name?: string }[];
      }[];
    };
  }>(url, "cb");
  const list = json?.data?.list || [];
  return list.map((r) => {
    const title = stripHtml(r.title_ch || "公告");
    const col = r.columns?.[0]?.column_name || "公司公告";
    const code = r.art_code || "";
    return {
      id: "ann-" + code,
      title: `【公告】${title}`,
      summary: `${col} · 华明装备（002270）交易所公告，点击查看原文。`,
      source: "巨潮/东方财富公告",
      date: (r.notice_date || "").slice(0, 16).replace("T", " "),
      url: code
        ? `https://data.eastmoney.com/notices/detail/002270/${code}.html`
        : "https://data.eastmoney.com/notices/stock/002270.html",
      tag: "company" as const,
    };
  });
}

function buildBriefing(items: NewsItem[]): string[] {
  const lines: string[] = [];
  const company = items.filter((i) => i.tag === "company" || i.tag === "intl");
  const market = items.filter((i) => i.tag === "market" || i.tag === "industry");

  if (company[0]) lines.push(`公司动态：${company[0].title}`);
  else
    lines.push(
      "公司动态：关注华明海外工程、新加坡国际总部与转换变分接开关（CHVT）等高端应用落地。",
    );

  if (market[0]) lines.push(`行业/资金：${market[0].title}`);
  else
    lines.push(
      "行业/资金：输变电与特高压板块波动会影响分接开关产业链估值与订单预期。",
    );

  lines.push(
    "海外风声：东南亚、中东、非洲电网升级与新能源并网继续驱动 OLTC 需求；技术交流与本地服务能力是关键。",
  );
  lines.push(
    "使用提示：本站为个人信息聚合页，非官方披露；投资请以交易所公告与年报为准。",
  );
  return lines;
}

/** Browser-side news bundle for static GitHub Pages. */
export async function fetchNewsBundle(): Promise<{
  items: NewsItem[];
  briefing: string[];
  updatedAt: string;
}> {
  let anns: NewsItem[] = [];
  let companyish: NewsItem[] = [];
  let industry: NewsItem[] = [];

  try {
    anns = await fetchAnnouncements();
  } catch {
    anns = [];
  }
  try {
    const rows = await searchEastmoney("华明装备", 15);
    companyish = rows.map((r) => {
      const title = stripHtml(r.title || "Untitled");
      const summary = stripHtml(r.content || "").slice(0, 220);
      return {
        id: String(r.code || r.url || title),
        title,
        summary: summary || "Click to read full article.",
        source: r.mediaName || "东方财富",
        date: (r.date || "").slice(0, 16),
        url: r.url || "https://so.eastmoney.com/",
        tag: tagFor(title, summary),
      };
    });
  } catch {
    companyish = [];
  }
  try {
    const rows = await searchEastmoney("电力设备 特高压", 8);
    industry = rows.slice(0, 8).map((r) => {
      const title = stripHtml(r.title || "Untitled");
      const summary = stripHtml(r.content || "").slice(0, 220);
      return {
        id: "ind-" + String(r.code || title),
        title,
        summary: summary || "Industry pulse.",
        source: r.mediaName || "东方财富",
        date: (r.date || "").slice(0, 16),
        url: r.url || "https://so.eastmoney.com/",
        tag: "industry" as const,
      };
    });
  } catch {
    industry = [];
  }

  const map = new Map<string, NewsItem>();
  for (const n of [...anns, ...companyish, ...industry, ...curated]) {
    if (!map.has(n.id)) map.set(n.id, n);
  }
  const items = Array.from(map.values()).sort((a, b) =>
    (b.date || "").localeCompare(a.date || ""),
  );

  return {
    items: items.slice(0, 40),
    briefing: buildBriefing(items),
    updatedAt: new Date().toISOString(),
  };
}
