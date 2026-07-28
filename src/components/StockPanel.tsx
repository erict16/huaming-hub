"use client";

import { useEffect, useState } from "react";
import {
  fetchHuamingStock,
  formatCNY,
  formatVolume,
  formatYi,
  type StockQuote,
} from "@/lib/stock";

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

function formatAmount(amount: number): string {
  if (!amount) return "—";
  if (amount >= 1e8) return `${(amount / 1e8).toFixed(2)} 亿`;
  return `${(amount / 1e4).toFixed(0)} 万`;
}

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

  const cells: { label: string; value: string }[] = [
    { label: "今开", value: formatCNY(q.open) },
    { label: "昨收", value: formatCNY(q.prevClose) },
    { label: "最高", value: formatCNY(q.high) },
    { label: "最低", value: formatCNY(q.low) },
    { label: "成交量", value: formatVolume(q.volume) },
    { label: "成交额", value: formatAmount(q.amount) },
    {
      label: "换手",
      value: q.turnoverRate ? `${formatCNY(q.turnoverRate)}%` : "—",
    },
    { label: "总市值", value: formatYi(q.marketCap) },
  ];

  return (
    <section className="hm-stat-hero" aria-label="实时行情">
      <div className="hm-stat-hero-top">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-3)]">
            SZSE · {q.code}
            <span className="mx-1.5 text-[var(--rule-2)]">·</span>
            <span className="normal-case tracking-normal">{q.name}</span>
          </div>
          <div className={`hm-stat-price mt-2 ${tone}`}>
            {q.ok ? formatCNY(q.price) : loading ? "…" : "—"}
            <span className="ml-1.5 align-baseline text-sm font-normal text-[var(--ink-3)]">
              元
            </span>
          </div>
          <div className={`hm-stat-change ${tone}`}>
            {q.ok
              ? `${up ? "+" : ""}${formatCNY(q.change)}　${up ? "+" : ""}${formatCNY(q.changePercent)}%`
              : "—"}
          </div>
          <p className="mt-2 mb-0 text-[11px] leading-snug text-[var(--ink-3)]">
            公开行情 · 约每分钟刷新
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
              查看详情
            </a>
          </p>
        </div>
        <span className="shrink-0 rounded border border-[var(--rule)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink-3)]">
          {loading ? "…" : q.ok ? "实时" : "离线"}
        </span>
      </div>

      <div className="hm-stat-grid">
        {cells.map((c) => (
          <div key={c.label} className="hm-stat-cell">
            <span className="label">{c.label}</span>
            <span className="value">{c.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
