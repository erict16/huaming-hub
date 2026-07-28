"use client";

import { useEffect, useState } from "react";
import { fetchNewsBundle, type NewsItem } from "@/lib/news";

const tagLabel: Record<NewsItem["tag"], string> = {
  risk: "风险",
  bull: "利好",
  company: "公司",
  industry: "行业",
  flow: "资金",
  other: "其它",
};

const tagClass: Record<NewsItem["tag"], string> = {
  risk: "border-red-200 bg-red-50 text-red-800",
  bull: "border-emerald-200 bg-emerald-50 text-emerald-800",
  company: "border-[var(--rule)] bg-white text-[var(--ink-2)]",
  industry: "border-[var(--rule)] bg-white text-[var(--ink-2)]",
  flow: "border-amber-200 bg-amber-50 text-amber-900",
  other: "border-[var(--rule)] bg-white text-[var(--ink-3)]",
};

export function NewsFeed() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [briefing, setBriefing] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchNewsBundle();
        if (!alive) return;
        setItems(data.items);
        setBriefing(data.briefing);
      } catch {
        if (alive) setBriefing(["拉新闻失败。看左侧盘，或点下面外链。"]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="hm-stack">
      <div className="hm-card hm-card-pad">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
          <h2 className="m-0 font-display text-sm font-semibold text-[var(--ink)]">
            盘面与公告
          </h2>
          <span className="text-[11px] text-[var(--ink-3)]">
            {loading ? "…" : `${items.length} 条 · 利好利空 · 无公关`}
          </span>
        </div>
        {briefing.length > 0 && (
          <ul className="mt-2 space-y-1 border-t border-[var(--rule)] pt-2">
            {briefing.map((line, i) => (
              <li
                key={i}
                className={`text-sm leading-snug ${
                  line.startsWith("↓")
                    ? "text-[var(--up)]"
                    : "text-[var(--ink-2)]"
                }`}
              >
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="hm-card divide-y divide-[var(--rule)] overflow-hidden">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse bg-[var(--paper)]" />
          ))}
        {!loading && items.length === 0 && (
          <p className="m-0 px-4 py-3 text-sm text-[var(--ink-3)]">
            暂时没有条目。直接去东方财富。
          </p>
        )}
        {!loading &&
          items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-2 hover:bg-[var(--accent-soft)]/50"
            >
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] leading-none text-[var(--ink-3)]">
                <span
                  className={`rounded border px-1.5 py-0.5 ${tagClass[item.tag]}`}
                >
                  {tagLabel[item.tag]}
                </span>
                {item.bearish && (
                  <span className="rounded border border-red-200 px-1.5 py-0.5 text-red-700">
                    偏空
                  </span>
                )}
                <span>{item.source}</span>
                <span className="font-mono">{item.date}</span>
              </div>
              <div
                className={`mt-1 text-[13.5px] font-medium leading-snug ${
                  item.bearish ? "text-[var(--up)]" : "text-[var(--ink)]"
                }`}
              >
                {item.title}
              </div>
            </a>
          ))}
      </div>

      <p className="m-0 text-[11px] leading-snug text-[var(--ink-3)]">
        东方财富公开接口。已滤空壳公告，无国际站软文。有延迟，重要事项看交易所原文。
      </p>
    </section>
  );
}
