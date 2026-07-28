import { jsonp, loadScript } from "./jsonp";

export type StockQuote = {
  code: string;
  name: string;
  nameEn: string;
  price: number;
  prevClose: number;
  open: number;
  high: number;
  low: number;
  change: number;
  changePercent: number;
  volume: number;
  amount: number;
  turnoverRate: number;
  pe: number | null;
  pb: number | null;
  marketCap: number | null;
  updatedAt: string;
  source: string;
  ok: boolean;
  error?: string;
};

function num(v: unknown, scale = 1): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return 0;
  return n / scale;
}

function empty(error?: string): StockQuote {
  return {
    code: "002270",
    name: "华明装备",
    nameEn: "Huaming Power Equipment",
    price: 0,
    prevClose: 0,
    open: 0,
    high: 0,
    low: 0,
    change: 0,
    changePercent: 0,
    volume: 0,
    amount: 0,
    turnoverRate: 0,
    pe: null,
    pb: null,
    marketCap: null,
    updatedAt: new Date().toISOString(),
    source: "—",
    ok: false,
    error,
  };
}

/** Prefer Eastmoney JSONP; fall back to Tencent quote script (CORS-free). */
export async function fetchHuamingStock(): Promise<StockQuote> {
  try {
    return await fetchFromEastmoney();
  } catch {
    try {
      return await fetchFromTencent();
    } catch (e) {
      return empty(e instanceof Error ? e.message : "fetch failed");
    }
  }
}

async function fetchFromEastmoney(): Promise<StockQuote> {
  const fields =
    "f43,f44,f45,f46,f47,f48,f57,f58,f60,f71,f86,f116,f117,f162,f167,f168,f169,f170";
  const url = `https://push2.eastmoney.com/api/qt/stock/get?secid=0.002270&fields=${fields}`;
  const json = await jsonp<{ data?: Record<string, unknown> }>(url, "cb");
  const d = json?.data;
  if (!d) throw new Error("No eastmoney data");

  const price = num(d.f43, 100);
  const high = num(d.f44, 100);
  const low = num(d.f45, 100);
  const open = num(d.f46, 100);
  const prevClose = num(d.f60, 100);
  const change = num(d.f169, 100);
  const changePercent = num(d.f170, 100);
  const volume = num(d.f47, 1);
  const amount = num(d.f48, 1);
  const turnoverRate = num(d.f168, 100);
  const pe = d.f162 != null ? num(d.f162, 100) : null;
  const pb = d.f167 != null ? num(d.f167, 100) : null;
  const marketCap = d.f116 != null ? num(d.f116, 1) : null;
  const ts =
    d.f86 != null
      ? new Date(Number(d.f86) * 1000).toISOString()
      : new Date().toISOString();

  if (!(price > 0)) throw new Error("Invalid price");

  return {
    code: String(d.f57 || "002270"),
    name: String(d.f58 || "华明装备"),
    nameEn: "Huaming Power Equipment",
    price,
    prevClose,
    open,
    high,
    low,
    change: change || price - prevClose,
    changePercent:
      changePercent || (prevClose ? ((price - prevClose) / prevClose) * 100 : 0),
    volume,
    amount,
    turnoverRate,
    pe,
    pb,
    marketCap,
    updatedAt: ts,
    source: "eastmoney (browser JSONP)",
    ok: true,
  };
}

async function fetchFromTencent(): Promise<StockQuote> {
  // Sets global v_sz002270="..."
  await loadScript(
    `https://qt.gtimg.cn/q=sz002270&_=${Date.now()}`,
  );
  const raw = (window as unknown as Record<string, string>).v_sz002270;
  if (!raw) throw new Error("No tencent quote");
  const p = raw.split("~");
  // Common Tencent fields: 1 name, 2 code, 3 price, 4 prev, 5 open,
  // 6 volume, 31 change, 32 pct, 33 high, 34 low, 37 amount(万), 38 turnover, 39 pe, 46 market cap(亿)
  const price = Number(p[3]);
  const prevClose = Number(p[4]);
  const open = Number(p[5]);
  const volume = Number(p[6]);
  const change = Number(p[31]);
  const changePercent = Number(p[32]);
  const high = Number(p[33]);
  const low = Number(p[34]);
  const amountWan = Number(p[37]);
  const turnoverRate = Number(p[38]);
  const pe = Number(p[39]);
  const marketCapYi = Number(p[44] || p[45] || p[46]);

  if (!(price > 0)) throw new Error("Invalid tencent price");

  return {
    code: p[2] || "002270",
    name: p[1] || "华明装备",
    nameEn: "Huaming Power Equipment",
    price,
    prevClose,
    open,
    high,
    low,
    change: Number.isFinite(change) ? change : price - prevClose,
    changePercent: Number.isFinite(changePercent)
      ? changePercent
      : prevClose
        ? ((price - prevClose) / prevClose) * 100
        : 0,
    volume: Number.isFinite(volume) ? volume : 0,
    amount: Number.isFinite(amountWan) ? amountWan * 1e4 : 0,
    turnoverRate: Number.isFinite(turnoverRate) ? turnoverRate : 0,
    pe: Number.isFinite(pe) ? pe : null,
    pb: null,
    marketCap: Number.isFinite(marketCapYi) ? marketCapYi * 1e8 : null,
    updatedAt: new Date().toISOString(),
    source: "tencent qt.gtimg.cn",
    ok: true,
  };
}

export function formatCNY(n: number, digits = 2) {
  if (!Number.isFinite(n) || n === 0) return "—";
  return n.toFixed(digits);
}

export function formatYi(n: number | null) {
  if (n == null || !Number.isFinite(n) || n === 0) return "—";
  const yi = n / 1e8;
  return `${yi.toFixed(2)} 亿`;
}

export function formatVolume(hands: number) {
  if (!hands) return "—";
  if (hands >= 1e4) return `${(hands / 1e4).toFixed(2)} 万手`;
  return `${hands.toFixed(0)} 手`;
}
