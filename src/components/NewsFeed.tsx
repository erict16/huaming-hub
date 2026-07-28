"use client";

import { useEffect, useState } from "react";
import { fetchNewsBundle, type NewsItem } from "@/lib/news";

const tagStyle: Record<NewsItem["tag"], string> = {
  company: "bg-cyan-500/15 text-cyan-200 ring-cyan-400/20",
  market: "bg-amber-500/15 text-amber-200 ring-amber-400/20",
  industry: "bg-violet-500/15 text-violet-200 ring-violet-400/20",
  intl: "bg-sky-500/15 text-sky-200 ring-sky-400/20",
  rumor: "bg-rose-500/15 text-rose-200 ring-rose-400/20",
};

const tagLabel: Record<NewsItem["tag"], string> = {
  company: "公司",
  market: "资金",
  industry: "行业",
  intl: "海外",
  rumor: "风声",
};

export function NewsFeed() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [briefing, setBriefing] = useState<string[]>([
    "正在拉取华明相关公告与市场消息…",
  ]);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchNewsBundle();
        if (!alive) return;
        setItems(data.items);
        setBriefing(data.briefing);
        setUpdatedAt(data.updatedAt);
      } catch {
        if (!alive) return;
        setBriefing([
          "新闻源暂时不可用，请稍后刷新。仍可使用下方资料下载与产品页。",
        ]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-[#0b162b] to-[#0a1324] p-6 shadow-xl shadow-cyan-950/20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
              Daily briefing
            </div>
            <h2 className="mt-1 text-2xl font-semibold text-white">
              华明相关动态速览
            </h2>
          </div>
          <div className="text-xs text-slate-500">
            {loading
              ? "加载中…"
              : updatedAt
                ? `刷新于 ${new Date(updatedAt).toLocaleString("zh-CN", { hour12: false })}`
                : ""}
          </div>
        </div>
        <ul className="mt-5 space-y-3">
          {briefing.map((line, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed text-slate-200"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">消息与市场风声</h3>
        <span className="text-xs text-slate-500">
          {loading ? "…" : `${items.length} 条聚合`}
        </span>
      </div>

      <div className="grid gap-3">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]"
            />
          ))}
        {!loading &&
          items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/30 hover:bg-white/[0.05]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${tagStyle[item.tag]}`}
                >
                  {tagLabel[item.tag]}
                </span>
                <span className="text-[11px] text-slate-500">{item.source}</span>
                <span className="text-[11px] text-slate-600">·</span>
                <span className="font-mono text-[11px] text-slate-500">
                  {item.date || "—"}
                </span>
              </div>
              <h4 className="mt-2 text-[15px] font-medium leading-snug text-slate-100 group-hover:text-cyan-100">
                {item.title}
              </h4>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-400">
                {item.summary}
              </p>
            </a>
          ))}
      </div>
    </section>
  );
}
