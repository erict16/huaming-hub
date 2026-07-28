"use client";

import { useEffect, useState } from "react";
import {
  fetchHuamingStock,
  formatCNY,
  formatVolume,
  formatYi,
  type StockQuote,
} from "@/lib/stock";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-[var(--rule)] py-1 text-sm last:border-0">
      <span className="text-[var(--ink-3)]">{label}</span>
      <span className="font-mono tabular-nums text-[var(--ink)]">{value}</span>
    </div>
  );
}

const empty: StockQuote = {
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
};

export function StockPanel() {
  const [q, setQ] = useState<StockQuote>(empty);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const data = await fetchHuamingStock();
        if (alive) setQ(data);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    const id = window.setInterval(load, 60_000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  const up = q.change >= 0;
  const tone = !q.ok
    ? "text-[var(--ink)]"
    : up
      ? "text-[var(--up)]"
      : "text-[var(--down)]";

  return (
    <aside className="hm-card hm-card-pad">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-3)]">
            SZSE · {q.code}
          </div>
          <h2 className="font-display mt-1 text-base font-semibold leading-tight text-[var(--ink)]">
            {q.name}
          </h2>
        </div>
        <span className="rounded border border-[var(--rule)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink-3)]">
          {loading ? "…" : "实时"}
        </span>
      </div>

      <div className={`mt-3 font-display text-[1.75rem] font-semibold leading-none tabular-nums ${tone}`}>
        {q.ok ? formatCNY(q.price) : loading ? "…" : "—"}
        <span className="ml-1 text-sm font-normal text-[var(--ink-3)]">元</span>
      </div>
      <div className={`mt-1.5 font-mono text-sm tabular-nums ${tone}`}>
        {q.ok
          ? `${up ? "+" : ""}${formatCNY(q.change)}  ${up ? "+" : ""}${formatCNY(q.changePercent)}%`
          : "—"}
      </div>

      <div className="mt-3">
        <Row label="今开" value={formatCNY(q.open)} />
        <Row label="昨收" value={formatCNY(q.prevClose)} />
        <Row label="最高" value={formatCNY(q.high)} />
        <Row label="最低" value={formatCNY(q.low)} />
        <Row label="成交量" value={formatVolume(q.volume)} />
        <Row
          label="成交额"
          value={
            q.amount
              ? q.amount >= 1e8
                ? `${(q.amount / 1e8).toFixed(2)} 亿`
                : `${(q.amount / 1e4).toFixed(0)} 万`
              : "—"
          }
        />
        <Row
          label="换手"
          value={q.turnoverRate ? `${formatCNY(q.turnoverRate)}%` : "—"}
        />
        <Row label="总市值" value={formatYi(q.marketCap)} />
      </div>

      <p className="mt-2.5 mb-0 text-[11px] leading-snug text-[var(--ink-3)]">
        {q.source}
        {q.ok
          ? ` · ${new Date(q.updatedAt).toLocaleTimeString("zh-CN", { hour12: false })}`
          : q.error
            ? ` · ${q.error}`
            : ""}
        {" · "}
        <a
          href="https://quote.eastmoney.com/sz002270.html"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent)] hover:underline"
        >
          完整行情
        </a>
      </p>
    </aside>
  );
}
