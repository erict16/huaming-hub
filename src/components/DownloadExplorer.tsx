"use client";

import { useEffect, useMemo, useState } from "react";
import type { DocumentItem } from "@/lib/documents";

const kindShort: Record<string, string> = {
  Leaflet: "简介",
  "Technical Data": "参数",
  "Operating Instruction": "操作",
  "Controller Manual": "控制器",
  Document: "文档",
};

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

  const chipLabel = (c: string) =>
    c === "all"
      ? "全部"
      : c
          .replace(" OLTC", "")
          .replace("DETC / OCTC", "无励磁")
          .replace("Service & Retrofit", "改造")
          .replace("Accessories", "附件")
          .replace("Conventional", "常规")
          .replace("Vacuum", "真空")
          .replace("Dry-type", "干式");

  return (
    <div className="space-y-3">
      {/* toolbar */}
      <div className="hm-card flex flex-col gap-2 p-2.5 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="型号 / 文件名，如 CV2、SHZV…"
          className="min-w-0 flex-1 rounded-[var(--radius)] border border-[var(--rule)] bg-white px-2.5 py-1.5 text-sm outline-none focus:border-[var(--accent)]"
        />
        <span className="shrink-0 px-1 font-mono text-xs text-[var(--ink-3)]">
          {filtered.length}/{documents.length}
        </span>
      </div>

      {/* series chips only — no duplicate select */}
      <div className="flex flex-wrap gap-1">
        {["all", ...categories].map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-[var(--radius)] border px-2 py-1 text-xs transition ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[var(--rule)] bg-white text-[var(--ink-2)] hover:border-[var(--accent-2)]"
              }`}
            >
              {chipLabel(c)}
            </button>
          );
        })}
      </div>

      {/* compact table */}
      <div className="hm-card overflow-x-auto">
        <table className="hm-table min-w-[560px]">
          <thead>
            <tr>
              <th className="w-[72px]">型号</th>
              <th>文件</th>
              <th className="w-[72px]">类型</th>
              <th className="w-[100px]">系列</th>
              <th className="w-[52px]" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-[var(--ink-3)]">
                  没有匹配，换个关键字。
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
                    {kindShort[d.kind] || d.kind}
                  </td>
                  <td className="whitespace-nowrap text-[11px] text-[var(--ink-3)]">
                    {chipLabel(d.category)}
                  </td>
                  <td className="text-right">
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block rounded border border-[var(--accent)] px-2 py-0.5 text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
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

      <p className="text-[11px] text-[var(--ink-3)]">
        点行内链接打开华明国际站公开 PDF，本站不托管文件。
      </p>
    </div>
  );
}
