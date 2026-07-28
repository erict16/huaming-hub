"use client";

import { useEffect, useState } from "react";
import { fetchNewsBundle, type NewsItem } from "@/lib/news";

const tagLabel: Record<NewsItem["tag"], string> = {
  company: "公司",
  market: "市场",
  industry: "行业",
  intl: "海外",
  rumor: "杂讯",
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
        if (alive)
          setBriefing(["新闻源暂时拉不到。用左侧行情，或去资料页。"]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="space-y-4">
      <div className="hm-card p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-base font-semibold text-[var(--ink)]">
            值得看的
          </h2>
          <span className="text-xs text-[var(--ink-3)]">
            {loading ? "加载中" : `${items.length} 条`}
          </span>
        </div>
        {briefing.length > 0 && (
          <ul className="mt-3 space-y-1.5 border-t border-[var(--rule)] pt-3">
            {briefing.map((line, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-[var(--ink-2)]"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="hm-card divide-y divide-[var(--rule)] overflow-hidden">
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse bg-[var(--paper)]" />
          ))}
        {!loading && items.length === 0 && (
          <p className="p-4 text-sm text-[var(--ink-3)]">
            没有筛到像样的标题。交易所官样文件已过滤。
          </p>
        )}
        {!loading &&
          items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="block px-4 py-3 transition hover:bg-[var(--accent-soft)]/40"
            >
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--ink-3)]">
                <span className="rounded border border-[var(--rule)] px-1.5 py-0.5 text-[var(--ink-2)]">
                  {tagLabel[item.tag]}
                </span>
                <span>{item.source}</span>
                <span className="font-mono">{item.date || ""}</span>
              </div>
              <div className="mt-1 text-[15px] font-medium leading-snug text-[var(--ink)]">
                {item.title}
              </div>
              {item.summary && (
                <p className="mt-0.5 line-clamp-1 text-xs text-[var(--ink-3)]">
                  {item.summary}
                </p>
              )}
            </a>
          ))}
      </div>
    </section>
  );
}
