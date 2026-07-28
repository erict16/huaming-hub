import { jsonp } from "./jsonp";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  tag: "company" | "market" | "industry" | "intl" | "rumor";
  score: number;
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

/** Drop pure process fluff; keep things a sales engineer might open. */
function isJunk(title: string): boolean {
  const t = title;
  const junk = [
    /法律意见书/,
    /投资者关系管理信息/,
    /网上集体接待日/,
    /董事会.*会议决议的公告/,
    /监事会.*会议决议/,
    /独立董事.*述职/,
    /非交易过户完成/,
    /预留份额分配/,
    /预留授予部分/,
    /募集资金存放/,
    /内幕信息知情人/,
    /持股变动的简式权益/,
    /关于召开.*通知/,
    /取消.*会议/,
    /更正公告$/,
    /补充公告$/,
  ];
  return junk.some((re) => re.test(t));
}

/** Score what is worth a click. Higher = keep. */
function scoreTitle(title: string, summary: string): number {
  const t = `${title} ${summary}`;
  let s = 0;

  // Business / product signal
  if (/中标|订单|合同|出口|海外|新加坡|印尼|巴基斯坦|尼日利亚|电网|特高压|换流|分接|OLTC|变压器|中标|中标候选人/.test(t))
    s += 12;
  if (/营收|净利|业绩|预告|快报|年报|半年报|一季报|三季报/.test(t)) s += 10;
  if (/回购|增持|减持|分红|配股|定增|并购|收购|股权激励/.test(t)) s += 8;
  if (/涨停|跌停|异动|主力|北向|资金净流入/.test(t) && /华明|002270/.test(t))
    s += 6;
  if (/电力设备|输变电|电网设备/.test(t) && !/华明|002270/.test(t)) s += 3;

  // Drag process filings
  if (/员工持股/.test(t) && !/完成|进展/.test(t)) s -= 4;
  if (/担保/.test(t)) s -= 2;
  if (/关于.*的公告$/.test(title) && s < 8) s -= 3;
  if (isJunk(title)) s -= 20;

  return s;
}

/** Turn exchange-style titles into something scannable. */
function humanizeTitle(raw: string): string | null {
  let t = stripHtml(raw)
    .replace(/^【公告】\s*/, "")
    .replace(/^华明装备[：:]\s*/i, "")
    .replace(/^华明装备\s*/i, "")
    .replace(/002270\s*/g, "")
    .trim();

  if (isJunk(t)) return null;

  // Map common templates → short line
  if (/员工持股计划.*非交易过户完成|员工持股.*过户完成/.test(t))
    return "员工持股预留股份已完成过户";
  if (/员工持股计划预留份额分配/.test(t)) return "员工持股：预留份额怎么分";
  if (/为下属全资公司提供担保的进展/.test(t)) return "全资子公司担保有进展";
  if (/提供担保/.test(t) && /进展|公告/.test(t)) return "对外担保进展";
  if (/临时股东会决议/.test(t)) return "临时股东会决议已出";
  if (/股东会决议/.test(t)) return "股东会决议";
  if (/董事会第.+次会议决议/.test(t)) return null; // pure process
  if (/投资者关系管理信息/.test(t)) return null;
  if (/法律意见书/.test(t)) return null;
  if (/截至.+股东总户数/.test(t)) {
    const m = t.match(/(\d[\d,]*)\s*户/);
    return m ? `股东户数 ${m[1]} 户` : "最新股东户数";
  }
  if (/参加.+投资者.+接待/.test(t)) return null;

  // Strip "关于…的公告" wrapper when possible
  const about = t.match(/^关于(.+?)的公告$/);
  if (about) t = about[1].trim();

  // Still too long / empty formal
  if (t.length < 4) return null;
  if (t.length > 48) t = t.slice(0, 46) + "…";

  return t;
}

function tagFor(title: string, content: string): NewsItem["tag"] {
  const t = `${title} ${content}`;
  if (/海外|新加坡|印尼|巴基斯坦|尼日利亚|export|Indonesia|Singapore/i.test(t))
    return "intl";
  if (/中标|订单|合同|营收|净利|业绩|回购|增持|减持|分红/.test(t))
    return "company";
  if (/特高压|电力设备|电网|输变电|板块|资金/.test(t)) return "industry";
  if (/涨停|异动|传闻|有望/.test(t)) return "market";
  return "company";
}

const curated: NewsItem[] = [
  {
    id: "c-longdong",
    title: "换流变分接开关上了陇东 ±800kV",
    summary: "CHVT 在陇东换流站投运。做高端/特高压客户时可以用这条当参考。",
    source: "华明国际站",
    date: "2024-06-01",
    url: "https://www.intl-huaming.com/component/content/article/huaming-chvt-converter-transformer-on-load-tap-changer-has-successfully-commissioned-at-longdong-800kv-hvdc-converter-station-in-china?catid=19&Itemid=228",
    tag: "company",
    score: 20,
  },
  {
    id: "c-sg",
    title: "国际总部放在新加坡",
    summary: "面向东盟与出口项目的前台。海外报价和售后对接可以走这条线。",
    source: "华明国际站",
    date: "2024-01-01",
    url: "https://www.intl-huaming.com/component/content/article/huaming-power-equipment-opens-international-headquarters-in-singapore-to-leverage-opportunities-in-the-energy-transition-2?catid=19&Itemid=228",
    tag: "intl",
    score: 16,
  },
  {
    id: "c-idn",
    title: "印尼市场做了二十年",
    summary: "本地项目与服务案例。南亚/东盟投标时可当资信材料线索。",
    source: "华明国际站",
    date: "2024-03-01",
    url: "https://www.intl-huaming.com/component/content/article/shanghai-huaming-twenty-years-of-deep-engagement-in-indonesia-building-a-trusted-brand-for-customers?catid=19&Itemid=228",
    tag: "intl",
    score: 14,
  },
  {
    id: "c-ng",
    title: "尼日利亚 TCN 技术交流",
    summary: "非洲电网侧培训/交流。非洲项目谈服务能力时有用。",
    source: "华明国际站",
    date: "2024-05-01",
    url: "https://www.intl-huaming.com/component/content/article/huaming-technical-seminar-successfully-held-in-nigeria-for-tcn?catid=19&Itemid=228",
    tag: "intl",
    score: 12,
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

async function fetchAnnouncements(): Promise<
  {
    art_code?: string;
    title_ch?: string;
    notice_date?: string;
    columns?: { column_name?: string }[];
  }[]
> {
  const url =
    "https://np-anotice-stock.eastmoney.com/api/security/ann?sr=-1&page_size=30&page_index=1&ann_type=A&client_source=web&stock_list=002270&f_node=0&s_node=0";
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
  return json?.data?.list || [];
}

function toItem(
  rawTitle: string,
  summary: string,
  source: string,
  date: string,
  url: string,
  id: string,
): NewsItem | null {
  const title = humanizeTitle(rawTitle);
  if (!title) return null;
  const score = scoreTitle(title, summary);
  if (score < 4 && !/国际站|华明国际/.test(source)) return null;
  return {
    id,
    title,
    summary: summary.slice(0, 120) || "打开原文。",
    source,
    date: date.slice(0, 16).replace("T", " "),
    url,
    tag: tagFor(title, summary),
    score,
  };
}

export async function fetchNewsBundle(): Promise<{
  items: NewsItem[];
  briefing: string[];
  updatedAt: string;
}> {
  let anns: NewsItem[] = [];
  let media: NewsItem[] = [];
  let industry: NewsItem[] = [];

  try {
    const list = await fetchAnnouncements();
    anns = list
      .map((r) => {
        const code = r.art_code || "";
        const col = r.columns?.[0]?.column_name || "";
        return toItem(
          r.title_ch || "",
          col ? `${col}。交易所披露。` : "交易所披露。",
          "公告",
          r.notice_date || "",
          code
            ? `https://data.eastmoney.com/notices/detail/002270/${code}.html`
            : "https://data.eastmoney.com/notices/stock/002270.html",
          "ann-" + code,
        );
      })
      .filter((x): x is NewsItem => !!x);
  } catch {
    anns = [];
  }

  try {
    const rows = await searchEastmoney("华明装备", 20);
    media = rows
      .map((r) =>
        toItem(
          r.title || "",
          stripHtml(r.content || ""),
          r.mediaName || "媒体",
          r.date || "",
          r.url || "https://so.eastmoney.com/",
          String(r.code || r.url || r.title),
        ),
      )
      .filter((x): x is NewsItem => !!x);
  } catch {
    media = [];
  }

  try {
    const rows = await searchEastmoney("电力设备 特高压 变压器 中标", 12);
    industry = rows
      .map((r) =>
        toItem(
          r.title || "",
          stripHtml(r.content || ""),
          r.mediaName || "行业",
          r.date || "",
          r.url || "https://so.eastmoney.com/",
          "ind-" + String(r.code || r.title),
        ),
      )
      .filter((x): x is NewsItem => !!x)
      .map((x) => ({ ...x, tag: "industry" as const }));
  } catch {
    industry = [];
  }

  const map = new Map<string, NewsItem>();
  for (const n of [...anns, ...media, ...industry, ...curated]) {
    const prev = map.get(n.id);
    if (!prev || n.score > prev.score) map.set(n.id, n);
  }

  const items = Array.from(map.values())
    .filter((i) => i.score >= 4)
    .sort((a, b) => b.score - a.score || (b.date || "").localeCompare(a.date || ""))
    .slice(0, 18);

  const briefing = buildBriefing(items);

  return {
    items,
    briefing,
    updatedAt: new Date().toISOString(),
  };
}

function buildBriefing(items: NewsItem[]): string[] {
  if (!items.length) {
    return ["暂时没拉到值得点的内容。先看资料下载，或去东方财富看盘。"];
  }
  const top = items.slice(0, 3);
  return top.map((i) => i.title);
}
