"use client";

import { useEffect, useState } from "react";
import {
  fetchHuamingStock,
  formatCNY,
  formatVolume,
  formatYi,
  type StockQuote,
} from "@/lib/stock";

function Metric({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div
        className={`mt-0.5 text-sm text-slate-100 ${mono ? "font-mono tabular-nums" : "font-medium"}`}
      >
        {value}
      </div>
    </div>
  );
}

const loadingQuote: StockQuote = {
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
  source: "loading",
  ok: false,
};

export function StockPanel() {
  const [q, setQ] = useState<StockQuote>(loadingQuote);
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
    ? "text-slate-300"
    : up
      ? "text-rose-400"
      : "text-emerald-400";
  const chip = !q.ok
    ? "bg-slate-500/20 text-slate-300"
    : up
      ? "bg-rose-500/15 text-rose-300 ring-rose-400/20"
      : "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20";

  return (
    <aside className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b1a33] to-[#07101f] p-5 shadow-2xl shadow-cyan-950/40">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/80">
              Live quote
            </div>
            <h2 className="mt-1 text-xl font-semibold text-white">
              {q.name}
              <span className="ml-2 text-sm font-normal text-slate-400">
                {q.code}
              </span>
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">{q.nameEn}</p>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${chip}`}
          >
            {loading ? "…" : "SZSE"}
          </span>
        </div>

        <div className="mt-6">
          <div className={`text-4xl font-semibold tracking-tight ${tone}`}>
            {q.ok ? formatCNY(q.price) : loading ? "…" : "—"}
            <span className="ml-1 text-base font-normal text-slate-500">
              CNY
            </span>
          </div>
          <div className={`mt-2 flex flex-wrap items-center gap-2 text-sm ${tone}`}>
            <span className="font-mono tabular-nums">
              {q.ok ? `${up ? "+" : ""}${formatCNY(q.change)}` : "—"}
            </span>
            <span className="font-mono tabular-nums">
              {q.ok ? `${up ? "+" : ""}${formatCNY(q.changePercent)}%` : ""}
            </span>
            {!q.ok && !loading && (
              <span className="text-xs text-amber-300/90">
                行情暂时不可用 {q.error ? `(${q.error})` : ""}
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Metric label="今开" value={formatCNY(q.open)} mono />
          <Metric label="昨收" value={formatCNY(q.prevClose)} mono />
          <Metric label="最高" value={formatCNY(q.high)} mono />
          <Metric label="最低" value={formatCNY(q.low)} mono />
          <Metric label="成交量" value={formatVolume(q.volume)} mono />
          <Metric
            label="成交额"
            value={
              q.amount
                ? q.amount >= 1e8
                  ? `${(q.amount / 1e8).toFixed(2)} 亿`
                  : `${(q.amount / 1e4).toFixed(0)} 万`
                : "—"
            }
            mono
          />
          <Metric
            label="换手"
            value={q.turnoverRate ? `${formatCNY(q.turnoverRate)}%` : "—"}
            mono
          />
          <Metric label="总市值" value={formatYi(q.marketCap)} mono />
          <Metric
            label="市盈率"
            value={q.pe != null ? formatCNY(q.pe) : "—"}
            mono
          />
          <Metric
            label="市净率"
            value={q.pb != null ? formatCNY(q.pb) : "—"}
            mono
          />
        </div>

        <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-slate-500">
          <p>
            更新：{" "}
            <span className="font-mono text-slate-400">
              {new Date(q.updatedAt).toLocaleString("zh-CN", {
                hour12: false,
              })}
            </span>
          </p>
          <p>数据源：{q.source} · 浏览器直连 · 约 60s 刷新</p>
          <a
            href="https://quote.eastmoney.com/sz002270.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-cyan-400/90 hover:text-cyan-300"
          >
            在东方财富打开完整行情 →
          </a>
        </div>
      </div>
    </aside>
  );
}
