"use client";

import { useEffect, useMemo, useState } from "react";
import type { DocumentItem } from "@/lib/documents";
import { getDict, type Locale } from "@/lib/i18n";

export function DownloadExplorer({
  documents,
  categories,
  locale,
}: {
  documents: DocumentItem[];
  categories: string[];
  kinds?: string[];
  locale: Locale;
}) {
  const t = getDict(locale);
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

  const chipLabel = (c: string) =>
    t.downloads.category[c] ||
    c
      .replace(" OLTC", "")
      .replace("DETC / OCTC", locale === "zh" ? "无励磁" : "DETC")
      .replace("Service & Retrofit", locale === "zh" ? "改造" : "Service");

  const kindLabel = (k: string) => t.downloads.kind[k] || k;

  return (
    <div className="hm-stack">
      <div className="hm-card flex flex-col gap-2 p-2 sm:flex-row sm:items-center sm:gap-2 sm:px-2.5 sm:py-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.downloads.searchPlaceholder}
          className="min-w-0 flex-1 rounded-[var(--radius)] border border-[var(--rule)] bg-white px-2.5 py-1.5 text-sm outline-none focus:border-[var(--accent)]"
        />
        <span className="shrink-0 px-1 font-mono text-xs text-[var(--ink-3)]">
          {filtered.length}/{documents.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {["all", ...categories].map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`hm-chip ${active ? "hm-chip-on" : "hover:border-[var(--accent)]"}`}
            >
              {chipLabel(c)}
            </button>
          );
        })}
      </div>

      <div className="hm-card overflow-x-auto">
        <table className="hm-table min-w-[560px]">
          <thead>
            <tr>
              <th className="w-[72px]">{t.downloads.colModel}</th>
              <th>{t.downloads.colFile}</th>
              <th className="w-[72px]">{t.downloads.colKind}</th>
              <th className="w-[96px]">{t.downloads.colSeries}</th>
              <th className="w-[48px]" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="!py-8 text-center text-[var(--ink-3)]"
                >
                  {t.downloads.empty}
                </td>
              </tr>
            ) : (
              filtered.map((d) => (
                <tr key={d.id + d.url}>
                  <td>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs font-semibold text-[var(--accent)] hover:underline"
                    >
                      {d.model}
                    </a>
                  </td>
                  <td>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                      className="line-clamp-1 text-[var(--ink)] hover:text-[var(--accent)]"
                      title={d.name}
                    >
                      {d.name}
                    </a>
                  </td>
                  <td className="whitespace-nowrap text-[var(--ink-3)]">
                    {kindLabel(d.kind)}
                  </td>
                  <td className="whitespace-nowrap text-[11px] text-[var(--ink-3)]">
                    {chipLabel(d.category)}
                  </td>
                  <td className="text-right">
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hm-btn-table"
                    >
                      PDF
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="m-0 text-[11px] leading-snug text-[var(--ink-3)]">
        {t.downloads.note}
      </p>
    </div>
  );
}
