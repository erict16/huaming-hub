"use client";

import { useEffect, useState } from "react";
import { fetchNewsBundle, type NewsItem } from "@/lib/news";

const tagLabel: Record<NewsItem["tag"], string> = {
  risk: "风险",
  bull: "动态",
  company: "公司",
  flow: "资金",
  other: "其它",
};

const tagClass: Record<NewsItem["tag"], string> = {
  risk: "hm-tag hm-tag-risk",
  bull: "hm-tag hm-tag-bull",
  company: "hm-tag",
  flow: "hm-tag hm-tag-flow",
  other: "hm-tag",
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
        if (alive) setBriefing(["拉新闻失败。可看上方行情，或点右侧外链。"]);
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
      {briefing.length > 0 && (
        <div className="hm-card hm-card-pad">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
            <h2 className="m-0 font-display text-sm font-semibold text-[var(--ink)]">
              要点
            </h2>
            <span className="text-[11px] text-[var(--ink-3)]">
              {loading ? "加载中…" : `华明相关 · ${items.length} 条`}
            </span>
          </div>
          <ul className="mt-2 space-y-1 border-t border-[var(--rule)] pt-2">
            {briefing.map((line, i) => (
              <li
                key={i}
                className="text-sm leading-snug text-[var(--ink-2)]"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="hm-card overflow-hidden">
        <div className="flex items-baseline justify-between gap-2 border-b border-[var(--rule)] px-4 py-2.5">
          <h2 className="m-0 font-display text-sm font-semibold text-[var(--ink)]">
            公告与媒体
          </h2>
          <span className="text-[11px] text-[var(--ink-3)]">按日期</span>
        </div>

        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse border-b border-[var(--rule)] bg-[var(--paper)] last:border-0"
            />
          ))}

        {!loading && items.length === 0 && (
          <p className="m-0 px-4 py-4 text-sm text-[var(--ink-3)]">
            暂时没有条目。可直接去交易所公告。
          </p>
        )}

        {!loading &&
          items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="hm-news-row"
            >
              <div className="hm-news-meta">
                <span className={tagClass[item.tag]}>{tagLabel[item.tag]}</span>
                <span>{item.source}</span>
                <span className="font-mono">{item.date}</span>
              </div>
              <div
                className={
                  item.tag === "risk"
                    ? "hm-news-title hm-news-title-risk"
                    : "hm-news-title"
                }
              >
                {item.title}
              </div>
            </a>
          ))}
      </div>

      <p className="m-0 text-[11px] leading-snug text-[var(--ink-3)]">
        东方财富公开接口 · 仅华明/002270 · 已滤流程空壳 · 有延迟，重要事项看交易所原文
      </p>
    </section>
  );
}
