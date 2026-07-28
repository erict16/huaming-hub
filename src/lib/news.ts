import { jsonp } from "./jsonp";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  /** 简短标签：涨跌/风险/公司/行业/资金 */
  tag: "risk" | "bull" | "company" | "industry" | "flow" | "other";
  /** 是否偏负面/风险（仅作标记，不隐藏） */
  bearish: boolean;
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

/** 纯流程件：不贡献信息，直接扔 */
function isProcessJunk(title: string): boolean {
  return [
    /法律意见书/,
    /投资者关系管理信息/,
    /网上集体接待日/,
    /独立董事.*述职/,
    /内幕信息知情人/,
    /关于召开.*的通知/,
    /取消召开/,
    /会议通知/,
    /更正公告$/,
    /补充公告$/,
    /监事会第.+次会议决议/,
    /董事会第.+次会议决议的公告$/,
    /非交易过户完成的公告/,
    /预留份额分配的公告/,
    /预留授予部分/,
    /持股变动的简式权益变动报告书/,
    /募集资金存放与实际使用情况/,
  ].some((re) => re.test(title));
}

function isBearish(t: string): boolean {
  return /跌|下滑|下降|减持|净流出|预亏|亏损|不及预期|处罚|立案|诉讼|违规|风险提示|质押|冻结|问询|关注函|警示|违约|推迟|终止|不及|承压|走弱|大跌|跌停|减仓/.test(
    t,
  );
}

function isBullish(t: string): boolean {
  return /涨停|大涨|中标|订单|合同|预增|超预期|回购|增持|净流入|创新高|上调|突破/.test(
    t,
  );
}

/**
 * 打分只看「值不值得点」，不看利好利空。
 * 利空可以更高：减持、处罚、业绩变脸往往比公关稿更有用。
 */
function scoreItem(title: string, summary: string, source: string): number {
  const t = `${title} ${summary}`;
  let s = 0;

  // 公司实质
  if (/华明|002270/.test(t)) s += 4;
  if (/业绩|营收|净利|预告|快报|年报|半年报|季报/.test(t)) s += 10;
  if (/减持|增持|回购|质押|解禁|定增|配股|股权激励/.test(t)) s += 11;
  if (/中标|订单|重大合同|框架协议/.test(t)) s += 9;
  if (/处罚|立案|诉讼|问询函|关注函|违规|风险提示/.test(t)) s += 12;
  if (/预亏|亏损|下滑|不及预期|下调/.test(t)) s += 11;
  if (/跌停|涨停|异动|主力|北向|资金/.test(t)) s += 7;
  if (/分接|OLTC|变压器|特高压|输变电|电力设备/.test(t)) s += 5;

  // 行业面（竞品/招标/板块）
  if (/电力设备|电网设备|输变电|特高压/.test(t) && !/华明|002270/.test(t))
    s += 4;

  // 公关/软文降权
  if (/成功|卓越|引领|赋能|再获|喜获|荣获|圆满/.test(t)) s -= 6;
  if (/华明国际站|intl-huaming/i.test(source)) s -= 15;
  if (isProcessJunk(title)) s -= 30;

  // 纯「关于…的公告」且没有实质词
  if (
    /^关于/.test(title) &&
    !/业绩|合同|中标|减持|增持|回购|处罚|预告|担保|投资|收购/.test(title)
  )
    s -= 4;

  return s;
}

/** 轻清理：去掉代码前缀，不编故事 */
function cleanTitle(raw: string): string | null {
  let t = stripHtml(raw)
    .replace(/^【公告】\s*/, "")
    .replace(/^华明装备[：:]\s*/i, "")
    .replace(/\s*002270\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (isProcessJunk(t)) return null;

  // 只剥「关于…的公告」外壳
  const m = t.match(/^关于(.+?)的公告$/);
  if (m) t = m[1].trim();

  if (t.length < 4) return null;
  if (t.length > 56) t = `${t.slice(0, 54)}…`;
  return t;
}

function tagOf(title: string, summary: string): NewsItem["tag"] {
  const t = `${title} ${summary}`;
  if (isBearish(t) && /处罚|立案|诉讼|问询|风险|预亏|亏损|违规/.test(t))
    return "risk";
  if (/资金|净流入|净流出|主力|北向|换手/.test(t)) return "flow";
  if (isBullish(t) && /涨停|大涨|中标|预增/.test(t)) return "bull";
  if (/电力设备|特高压|电网|输变电|板块/.test(t) && !/华明|002270/.test(t))
    return "industry";
  if (/华明|002270|业绩|减持|增持|回购|合同|中标|担保/.test(t))
    return "company";
  return "other";
}

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

async function fetchAnnouncements() {
  const url =
    "https://np-anotice-stock.eastmoney.com/api/security/ann?sr=-1&page_size=40&page_index=1&ann_type=A&client_source=web&stock_list=002270&f_node=0&s_node=0";
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

function makeItem(
  rawTitle: string,
  summary: string,
  source: string,
  date: string,
  url: string,
  id: string,
): NewsItem | null {
  const title = cleanTitle(rawTitle);
  if (!title) return null;
  const sum = stripHtml(summary).slice(0, 100);
  const score = scoreItem(title, sum, source);
  if (score < 3) return null;
  const bearish = isBearish(`${title} ${sum}`);
  return {
    id,
    title,
    summary: sum || "原文",
    source,
    date: (date || "").slice(0, 16).replace("T", " "),
    url,
    tag: tagOf(title, sum),
    bearish,
    score,
  };
}

function dateKey(d: string): string {
  // sort key YYYY-MM-DD
  const m = d.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : "0000-00-00";
}

export async function fetchNewsBundle(): Promise<{
  items: NewsItem[];
  briefing: string[];
  updatedAt: string;
}> {
  const buckets: NewsItem[] = [];

  // 1) 交易所公告（含利空：减持/处罚/业绩）
  try {
    const list = await fetchAnnouncements();
    for (const r of list) {
      const code = r.art_code || "";
      const col = r.columns?.[0]?.column_name || "";
      const item = makeItem(
        r.title_ch || "",
        col,
        "公告",
        r.notice_date || "",
        code
          ? `https://data.eastmoney.com/notices/detail/002270/${code}.html`
          : "https://data.eastmoney.com/notices/stock/002270.html",
        `ann-${code}`,
      );
      if (item) buckets.push(item);
    }
  } catch {
    /* ignore */
  }

  // 2) 媒体：华明本体
  try {
    const rows = await searchEastmoney("华明装备", 25);
    for (const r of rows) {
      const item = makeItem(
        r.title || "",
        r.content || "",
        r.mediaName || "媒体",
        r.date || "",
        r.url || "https://so.eastmoney.com/",
        `m-${r.code || r.url || r.title}`,
      );
      if (item) buckets.push(item);
    }
  } catch {
    /* ignore */
  }

  // 3) 盘面/资金向（容易混到利空）
  try {
    const rows = await searchEastmoney("002270 华明装备 减持 跌 资金", 15);
    for (const r of rows) {
      const item = makeItem(
        r.title || "",
        r.content || "",
        r.mediaName || "盘面",
        r.date || "",
        r.url || "https://so.eastmoney.com/",
        `f-${r.code || r.url || r.title}`,
      );
      if (item) buckets.push(item);
    }
  } catch {
    /* ignore */
  }

  // 4) 行业：竞品/招标/板块，不挑好听
  try {
    const rows = await searchEastmoney(
      "电力设备 特高压 变压器 招标 下滑",
      12,
    );
    for (const r of rows) {
      const item = makeItem(
        r.title || "",
        r.content || "",
        r.mediaName || "行业",
        r.date || "",
        r.url || "https://so.eastmoney.com/",
        `i-${r.code || r.title}`,
      );
      if (item) buckets.push({ ...item, tag: item.tag === "other" ? "industry" : item.tag });
    }
  } catch {
    /* ignore */
  }

  // 去重：同 id 留分高的
  const map = new Map<string, NewsItem>();
  for (const n of buckets) {
    // 二次去重：标题近似
    const key = n.id;
    const prev = map.get(key);
    if (!prev || n.score > prev.score) map.set(key, n);
  }

  // 再按标题去重
  const byTitle = new Map<string, NewsItem>();
  for (const n of map.values()) {
    const k = n.title.replace(/\s/g, "");
    const prev = byTitle.get(k);
    if (!prev || n.score > prev.score) byTitle.set(k, n);
  }

  // 时间优先，其次分数 —— 不把利好顶到最前
  const items = Array.from(byTitle.values())
    .sort((a, b) => {
      const dd = dateKey(b.date).localeCompare(dateKey(a.date));
      if (dd !== 0) return dd;
      return b.score - a.score;
    })
    .slice(0, 24);

  const briefing = buildBriefing(items);

  return {
    items,
    briefing,
    updatedAt: new Date().toISOString(),
  };
}

function buildBriefing(items: NewsItem[]): string[] {
  if (!items.length) return ["源站没吐出东西，自己看左侧行情或东方财富。"];

  const risk = items.filter((i) => i.bearish || i.tag === "risk").slice(0, 2);
  const rest = items
    .filter((i) => !risk.includes(i))
    .slice(0, 3 - Math.min(2, risk.length));

  const lines = [...risk, ...rest].map((i) => {
    const mark = i.bearish || i.tag === "risk" ? "↓ " : "";
    return `${mark}${i.title}`;
  });

  if (!lines.some((l) => l.startsWith("↓"))) {
    lines.push("本批未见明显风险标题（不代表没风险）。");
  }

  return lines.slice(0, 4);
}
