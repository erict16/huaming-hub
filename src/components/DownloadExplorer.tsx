"use client";

import { useEffect, useMemo, useState } from "react";
import type { DocumentItem } from "@/lib/documents";

export function DownloadExplorer({
  documents,
  categories,
}: {
  documents: DocumentItem[];
  categories: string[];
  kinds?: string[];
}) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const initial = (params.get("q") || "").trim();
      if (initial) setQ(initial);
    } catch {
      /* ignore */
    }
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return documents.filter((d) => {
      if (category !== "all" && d.category !== category) return false;
      if (!query) return true;
      return (
        d.model.toLowerCase().includes(query) ||
        d.name.toLowerCase().includes(query) ||
        d.kind.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query)
      );
    });
  }, [documents, q, category]);

  return (
    <div className="space-y-4">
      <div className="hm-card flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜型号，如 CV2、SHZV、CMD…"
          className="min-w-0 flex-1 rounded-md border border-[var(--rule)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-[var(--rule)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        >
          <option value="all">全部系列</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {["all", ...categories].map((c) => {
          const label = c === "all" ? "全部" : c.replace(" OLTC", "").replace(" / OCTC", "");
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-md border px-2.5 py-1 text-xs transition ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--rule)] bg-white text-[var(--ink-2)] hover:border-[var(--rule-2)]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-[var(--ink-3)]">
        {filtered.length} / {documents.length} · 点行打开官方 PDF
      </p>

      <div className="hm-card overflow-hidden">
        <div className="hidden grid-cols-[88px_1fr_120px_56px] gap-2 border-b border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-[11px] font-medium text-[var(--ink-3)] sm:grid">
          <span>型号</span>
          <span>文件</span>
          <span>类型</span>
          <span />
        </div>
        {filtered.length === 0 ? (
          <p className="px-3 py-10 text-center text-sm text-[var(--ink-3)]">
            没有匹配，换个型号关键字。
          </p>
        ) : (
          <ul className="divide-y divide-[var(--rule)]">
            {filtered.map((d) => (
              <li key={d.id + d.url}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="grid grid-cols-1 gap-1 px-3 py-2.5 transition hover:bg-[var(--accent-soft)]/50 sm:grid-cols-[88px_1fr_120px_56px] sm:items-center sm:gap-2"
                >
                  <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                    {d.model}
                  </span>
                  <span className="line-clamp-2 text-sm text-[var(--ink)] sm:line-clamp-1">
                    {d.name}
                  </span>
                  <span className="text-xs text-[var(--ink-3)]">{d.kind}</span>
                  <span className="text-right text-xs font-medium text-[var(--accent)]">
                    下载
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
