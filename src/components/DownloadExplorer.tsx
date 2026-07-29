"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { filterDocuments, type DocumentItem } from "@/lib/documents";
import { getDict, type Locale } from "@/lib/i18n";

function readSearchQ(): string {
  try {
    return (new URLSearchParams(window.location.search).get("q") || "").trim();
  } catch {
    return "";
  }
}

export function DownloadExplorer({
  documents,
  categories,
  locale,
  autofocus = false,
}: {
  documents: DocumentItem[];
  categories: string[];
  kinds?: string[];
  locale: Locale;
  /** Desktop-only autofocus (Spec Desk home) */
  autofocus?: boolean;
}) {
  const t = getDict(locale);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);

  // Hydrate from ?q= and keep in sync on back/forward + same-route doc links
  useEffect(() => {
    setQ(readSearchQ());

    const onPop = () => setQ(readSearchQ());
    window.addEventListener("popstate", onPop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !(a instanceof HTMLAnchorElement)) return;
      try {
        const url = new URL(a.href, window.location.href);
        const here = window.location.pathname.replace(/\/$/, "");
        const there = url.pathname.replace(/\/$/, "");
        if (there !== here) return;
        const next = (url.searchParams.get("q") || "").trim();
        queueMicrotask(() => setQ(next));
      } catch {
        /* ignore */
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Desktop autofocus only — skip small screens and reduced-motion preference is ok
  useEffect(() => {
    if (!autofocus) return;
    const mq = window.matchMedia("(min-width: 640px)");
    if (!mq.matches) return;
    // Defer past sticky header paint
    const id = window.requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [autofocus]);

  const rows = useMemo(
    () => filterDocuments({ q, category }),
    [q, category],
  );

  const chipLabel = (c: string) =>
    t.downloads.category[c] ||
    c
      .replace(" OLTC", "")
      .replace("DETC / OCTC", locale === "zh" ? "无励磁" : "DETC")
      .replace("Service & Retrofit", locale === "zh" ? "改造" : "Service");

  const kindLabel = (k: string) => t.downloads.kind[k] || k;

  return (
    <div className="hm-stack">
      <div className="hm-downloads-controls">
        <div className="hm-search-bar">
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.downloads.searchPlaceholder}
            aria-label={t.downloads.searchPlaceholder}
            autoComplete="off"
            spellCheck={false}
          />
          <span className="hm-search-count" aria-live="polite">
            {rows.length}/{documents.length}
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
      </div>

      <div className="hm-table-wrap">
        <table className="hm-table min-w-[560px]">
          <caption className="sr-only">{t.downloads.tableCaption}</caption>
          <thead>
            <tr>
              <th scope="col" className="hm-table-col-model">
                {t.downloads.colModel}
              </th>
              <th scope="col">{t.downloads.colFile}</th>
              <th scope="col" className="hm-table-col-kind">
                {t.downloads.colKind}
              </th>
              <th scope="col" className="hm-table-col-series">
                {t.downloads.colSeries}
              </th>
              <th scope="col" className="hm-table-col-action">
                <span className="sr-only">{t.downloads.colAction}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="!py-10 text-center text-[var(--ink-3)]"
                >
                  {t.downloads.empty}
                </td>
              </tr>
            ) : (
              rows.map((d) => (
                <tr key={d.id + d.url}>
                  <td className="hm-table-model">
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {d.model}
                    </a>
                  </td>
                  <td>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hm-table-file"
                      title={d.name}
                    >
                      {d.name}
                    </a>
                  </td>
                  <td className="hm-table-meta">{kindLabel(d.kind)}</td>
                  <td className="hm-table-meta hm-table-meta-sm">
                    {chipLabel(d.category)}
                  </td>
                  <td className="hm-table-action">
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hm-btn-table"
                    >
                      PDF
                      <span className="sr-only">
                        {" "}
                        ({d.model} {d.name})
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
