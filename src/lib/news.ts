import { jsonp } from "./jsonp";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  /** 简短标签：涨跌/风险/公司/资金 */
  tag: "risk" | "bull" | "company" | "flow" | "other";
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

/**
 * 硬相关：公告 API 已锁 002270；媒体必须点名华明/002270。
 * 用 raw 文本判断，避免 cleanTitle 剥前缀后误杀。
 */
function isHuamingRelevant(
  rawTitle: string,
  summary: string,
  source: string,
): boolean {
  if (source === "公告") return true;
  const t = `${rawTitle} ${summary}`;
  return /华明装备|华明\s*股份|华明\s*集团|华明|\b002270\b/.test(t);
}

/** 收紧：避免单字「跌/下降」把中性稿打成偏空墙 */
function isBearish(t: string): boolean {
  return /减持|净流出|预亏|亏损|不及预期|处罚|立案|诉讼|违规|风险提示|质押|冻结|问询|关注函|警示|违约|终止合作|跌停|大跌|减仓|承压严重/.test(
    t,
  );
}

function isBullish(t: string): boolean {
  return /涨停|大涨|中标|订单|合同|预增|超预期|回购|增持|净流入|创新高|上调|突破/.test(
    t,
  );
}

/**
 * 打分只看「值不值得点」，利好利空同权。
 */
function scoreItem(title: string, summary: string, source: string): number {
  const t = `${title} ${summary}`;
  let s = 0;

  if (/华明|002270/.test(t)) s += 6;
  if (/业绩|营收|净利|预告|快报|年报|半年报|季报/.test(t)) s += 10;
  if (/中标|订单|重大合同|框架协议/.test(t)) s += 10;
  if (/减持|增持|回购|质押|解禁|定增|配股|股权激励/.test(t)) s += 9;
  if (/处罚|立案|诉讼|问询函|关注函|违规|风险提示/.test(t)) s += 9;
  if (/预亏|亏损|不及预期|下调评级/.test(t)) s += 8;
  if (/跌停|涨停|异动|主力|北向|资金/.test(t)) s += 5;
  if (/分接|OLTC|有载调压|变压器/.test(t)) s += 3;

  if (/成功|卓越|引领|赋能|再获|喜获|荣获|圆满/.test(t)) s -= 6;
  if (/华明国际站|intl-huaming/i.test(source)) s -= 15;
  if (isProcessJunk(title)) s -= 30;

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

  const m = t.match(/^关于(.+?)的公告$/);
  if (m) t = m[1].trim();

  if (t.length < 4) return null;
  if (t.length > 56) t = `${t.slice(0, 54)}…`;
  return t;
}

function tagOf(title: string, summary: string): NewsItem["tag"] {
  const t = `${title} ${summary}`;
  if (/处罚|立案|诉讼|问询|风险提示|预亏|违规/.test(t)) return "risk";
  if (/资金|净流入|净流出|主力|北向|换手/.test(t)) return "flow";
  if (isBullish(t) && /涨停|大涨|中标|预增|增持|回购/.test(t)) return "bull";
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
  if (!isHuamingRelevant(rawTitle, summary, source)) return null;

  const title = cleanTitle(rawTitle);
  if (!title) return null;
  const sum = stripHtml(summary).slice(0, 100);
  const score = scoreItem(title, sum, source);
  if (score < 4) return null;
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
  const m = d.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : "0000-00-00";
}

function isRiskish(n: NewsItem): boolean {
  return n.bearish || n.tag === "risk";
}

/** 日期优先；遍历时跳过超额偏空，硬顶约 1/3 */
function balanceFeed(items: NewsItem[], limit = 18): NewsItem[] {
  const sorted = [...items].sort((a, b) => {
    const dd = dateKey(b.date).localeCompare(dateKey(a.date));
    if (dd !== 0) return dd;
    return b.score - a.score;
  });

  const maxRisk = Math.max(1, Math.floor(limit / 3));
  const chosen: NewsItem[] = [];
  let riskCount = 0;

  for (const n of sorted) {
    if (chosen.length >= limit) break;
    if (isRiskish(n)) {
      if (riskCount >= maxRisk) continue;
      riskCount += 1;
    }
    chosen.push(n);
  }

  // 若中性稿太少导致条数不足，放宽到最多一半风险
  if (chosen.length < Math.min(limit, sorted.length)) {
    const hardCap = Math.ceil(limit / 2);
    for (const n of sorted) {
      if (chosen.length >= limit) break;
      if (chosen.includes(n)) continue;
      if (isRiskish(n)) {
        if (riskCount >= hardCap) continue;
        riskCount += 1;
      }
      chosen.push(n);
    }
    chosen.sort((a, b) => {
      const dd = dateKey(b.date).localeCompare(dateKey(a.date));
      if (dd !== 0) return dd;
      return b.score - a.score;
    });
  }

  return chosen.slice(0, limit);
}

export async function fetchNewsBundle(): Promise<{
  items: NewsItem[];
  briefing: string[];
  updatedAt: string;
}> {
  const buckets: NewsItem[] = [];

  // 1) 交易所公告（标的已锁 002270）
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

  // 3) 代码检索（中性，不诱导跌/减持）
  try {
    const rows = await searchEastmoney("002270 华明装备", 20);
    for (const r of rows) {
      const item = makeItem(
        r.title || "",
        r.content || "",
        r.mediaName || "媒体",
        r.date || "",
        r.url || "https://so.eastmoney.com/",
        `c-${r.code || r.url || r.title}`,
      );
      if (item) buckets.push(item);
    }
  } catch {
    /* ignore */
  }

  // 去重：同 id 留分高的
  const map = new Map<string, NewsItem>();
  for (const n of buckets) {
    const prev = map.get(n.id);
    if (!prev || n.score > prev.score) map.set(n.id, n);
  }

  // 再按标题去重
  const byTitle = new Map<string, NewsItem>();
  for (const n of map.values()) {
    const k = n.title.replace(/\s/g, "");
    const prev = byTitle.get(k);
    if (!prev || n.score > prev.score) byTitle.set(k, n);
  }

  const items = balanceFeed(Array.from(byTitle.values()), 18);
  const briefing = buildBriefing(items);

  return {
    items,
    briefing,
    updatedAt: new Date().toISOString(),
  };
}

function buildBriefing(items: NewsItem[]): string[] {
  if (!items.length) return ["暂无动态，可查看交易所公告或稍后再试。"];

  const risk = items.filter(isRiskish).slice(0, 1);
  const rest = items.filter((i) => !risk.includes(i)).slice(0, 3 - risk.length);

  return [...risk, ...rest].map((i) => {
    if (i.tag === "risk" || (i.bearish && i.tag !== "bull")) {
      return `提示 · ${i.title}`;
    }
    return i.title;
  });
}
