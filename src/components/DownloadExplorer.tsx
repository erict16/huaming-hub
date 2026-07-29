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
      <div className="hm-search-bar">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.downloads.searchPlaceholder}
          aria-label={t.downloads.searchPlaceholder}
          autoComplete="off"
          spellCheck={false}
        />
        <span className="hm-search-count" aria-live="polite">
          {filtered.length}/{documents.length}
        </span>
      </div>

      <div
        className="hm-chip-row"
        role="group"
        aria-label={t.downloads.filterLabel}
      >
        {["all", ...categories].map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`hm-chip${active ? " hm-chip-on" : ""}`}
              aria-pressed={active}
            >
              {chipLabel(c)}
            </button>
          );
        })}
      </div>

      <div className="hm-table-wrap">
        <table className="hm-table min-w-[560px]">
          <caption className="sr-only">{t.downloads.tableCaption}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[72px]">
                {t.downloads.colModel}
              </th>
              <th scope="col">{t.downloads.colFile}</th>
              <th scope="col" className="w-[80px]">
                {t.downloads.colKind}
              </th>
              <th scope="col" className="w-[100px]">
                {t.downloads.colSeries}
              </th>
              <th scope="col" className="w-[64px]">
                <span className="sr-only">{t.downloads.colAction}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="!py-10 text-center text-[var(--ink-3)]"
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
                      rel="noopener noreferrer"
                      className="font-mono text-[var(--text-2xs)] font-semibold text-[var(--accent)] hover:underline"
                    >
                      {d.model}
                    </a>
                  </td>
                  <td>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line-clamp-1 text-[var(--ink)] hover:text-[var(--accent)]"
                      title={d.name}
                    >
                      {d.name}
                    </a>
                  </td>
                  <td className="whitespace-nowrap text-[var(--ink-3)]">
                    {kindLabel(d.kind)}
                  </td>
                  <td className="whitespace-nowrap text-[var(--text-2xs)] text-[var(--ink-3)]">
                    {chipLabel(d.category)}
                  </td>
                  <td className="text-right">
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hm-btn-table"
                    >
                      PDF
                      <span className="sr-only">
                        {" "}
                        — {d.model} {d.name}
                      </span>
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="hm-note">{t.downloads.note}</p>
    </div>
  );
}
