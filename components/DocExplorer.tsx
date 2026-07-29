"use client";

import { useEffect, useMemo, useState } from "react";
import {
  allDocuments,
  categories,
  filterDocuments,
  type DocumentItem,
} from "@/lib/documents";
import { getDict, type Locale } from "@/lib/i18n";

function readSearchQ(): string {
  try {
    return (new URLSearchParams(window.location.search).get("q") || "").trim();
  } catch {
    return "";
  }
}

export function DocExplorer({
  locale = "en",
  documents = allDocuments,
}: {
  locale?: Locale;
  documents?: DocumentItem[];
}) {
  const t = getDict(locale);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");

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

  const rows = useMemo(
    () => filterDocuments({ q, category }),
    [q, category],
  );

  const chipLabel = (c: string) =>
    t.category[c] ||
    c
      .replace(" OLTC", "")
      .replace("DETC / OCTC", locale === "zh" ? "无励磁" : "DETC")
      .replace("Service & Retrofit", locale === "zh" ? "改造" : "Service");

  const kindLabel = (k: string) => t.kind[k] || k;

  return (
    <div className="not-prose flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchPlaceholder}
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm outline-none focus:border-fd-primary focus:ring-2 focus:ring-fd-primary/20"
        />
        <span className="shrink-0 font-mono text-xs text-fd-muted-foreground tabular-nums">
          {rows.length}/{documents.length}
        </span>
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t.filterLabel}
      >
        {["all", ...categories].map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={active}
              className={
                active
                  ? "rounded-md bg-fd-primary px-3 py-1.5 text-xs font-semibold text-fd-primary-foreground"
                  : "rounded-md border border-fd-border bg-fd-card px-3 py-1.5 text-xs font-medium text-fd-muted-foreground hover:border-fd-primary hover:text-fd-primary"
              }
            >
              {chipLabel(c)}
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-lg border border-fd-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">{t.filesTitle}</caption>
          <thead className="bg-fd-muted/50 text-[10px] uppercase tracking-wide text-fd-muted-foreground">
            <tr>
              <th className="px-3 py-2.5 font-medium">{t.colModel}</th>
              <th className="px-3 py-2.5 font-medium">{t.colFile}</th>
              <th className="px-3 py-2.5 font-medium">{t.colKind}</th>
              <th className="px-3 py-2.5 font-medium">{t.colSeries}</th>
              <th className="px-3 py-2.5 font-medium">
                <span className="sr-only">PDF</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-10 text-center text-fd-muted-foreground"
                >
                  {t.empty}
                </td>
              </tr>
            ) : (
              rows.map((d) => (
                <tr
                  key={d.id + d.url}
                  className="border-t border-fd-border hover:bg-fd-muted/30"
                >
                  <td className="px-3 py-2.5 font-mono text-xs font-medium">
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fd-primary hover:underline"
                    >
                      {d.model}
                    </a>
                  </td>
                  <td className="max-w-[16rem] truncate px-3 py-2.5">
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fd-foreground hover:underline"
                      title={d.name}
                    >
                      {d.name}
                    </a>
                  </td>
                  <td className="px-3 py-2.5 text-fd-muted-foreground">
                    {kindLabel(d.kind)}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-fd-muted-foreground">
                    {chipLabel(d.category)}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-md border border-fd-border px-2 py-1 text-xs font-semibold text-fd-primary hover:bg-fd-primary hover:text-fd-primary-foreground"
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

      <p className="text-xs text-fd-muted-foreground">{t.note}</p>
    </div>
  );
}
