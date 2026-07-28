"use client";

import { useEffect, useMemo, useState } from "react";
import type { DocumentItem } from "@/lib/documents";

const kindColor: Record<string, string> = {
  Leaflet: "bg-sky-500/15 text-sky-200",
  "Technical Data": "bg-violet-500/15 text-violet-200",
  "Operating Instruction": "bg-amber-500/15 text-amber-200",
  "Controller Manual": "bg-emerald-500/15 text-emerald-200",
  Document: "bg-slate-500/15 text-slate-200",
};

export function DownloadExplorer({
  documents,
  categories,
  kinds,
}: {
  documents: DocumentItem[];
  categories: string[];
  kinds: string[];
}) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [kind, setKind] = useState("all");

  // Support /downloads/?q=CV2 on static GitHub Pages
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
      if (kind !== "all" && d.kind !== kind) return false;
      if (!query) return true;
      return (
        d.model.toLowerCase().includes(query) ||
        d.name.toLowerCase().includes(query) ||
        d.kind.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query)
      );
    });
  }, [documents, q, category, kind]);

  const grouped = useMemo(() => {
    const map = new Map<string, DocumentItem[]>();
    for (const d of filtered) {
      const list = map.get(d.category) || [];
      list.push(d);
      map.set(d.category, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
          <label className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-wider text-slate-500">
              Search model / filename
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. CV2, SHZV, Technical Data…"
              className="w-full rounded-xl border border-white/10 bg-[#070f1c] px-3.5 py-2.5 text-sm text-white outline-none ring-cyan-400/0 transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-wider text-slate-500">
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#070f1c] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400/40"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-wider text-slate-500">
              Document type
            </span>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#070f1c] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400/40"
            >
              <option value="all">All types</option>
              {kinds.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          显示 {filtered.length} / {documents.length} 份公开资料 · 点击直达华明国际站
          PDF
        </div>
      </div>

      {grouped.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center text-slate-400">
          没有匹配的资料，试试更短的型号关键字。
        </div>
      ) : (
        grouped.map(([cat, docs]) => (
          <section key={cat} className="space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">{cat}</h3>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-slate-400 ring-1 ring-white/10">
                {docs.length}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {docs.map((d) => (
                <a
                  key={d.id + d.url}
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-4 transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:shadow-lg hover:shadow-cyan-950/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-cyan-300/90">
                      {d.model}
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${kindColor[d.kind] || kindColor.Document}`}
                    >
                      {d.kind}
                    </span>
                  </div>
                  <div className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-slate-100 group-hover:text-white">
                    {d.name}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4 text-[11px] text-slate-500">
                    <span>PDF · {d.source}</span>
                    <span className="text-cyan-400 group-hover:translate-x-0.5 transition">
                      Download →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
