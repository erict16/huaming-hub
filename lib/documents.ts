import documents from "@/lib/data/documents.json";

export type DocumentItem = {
  id: string;
  model: string;
  name: string;
  kind: string;
  category: string;
  url: string;
  source: string;
};

export const allDocuments = documents as DocumentItem[];

export const categories = Array.from(
  new Set(allDocuments.map((d) => d.category)),
);

export const kinds = Array.from(new Set(allDocuments.map((d) => d.kind)));

/**
 * Product code → downloads search string.
 * Codes like "W/G · W/L · ZWC" or "CHVT / SHGV" must not collapse to "W" / "CHVT" alone.
 * Emits space-separated tokens; filter treats spaces as OR.
 */
export function productDocsQuery(code: string): string {
  const raw = (code || "").trim();
  if (!raw) return "";

  // Split on middot / slash / comma / whitespace, keep multi-char tokens
  // Preserve slash models like W/G as a single token by first normalizing separators.
  // Strategy: split on " · " and " / " and "," first, then trim.
  const parts = raw
    .split(/\s*[·,]\s*|\s+\/\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const tokens: string[] = [];
  for (const p of parts) {
    // If still contains unspaced slash like "W/G", keep whole token
    if (/^[A-Za-z0-9][A-Za-z0-9+./-]*$/.test(p) && p.length >= 2) {
      tokens.push(p);
      continue;
    }
    // Fallback: split bare slashes only when both sides look like models
    const sub = p.split("/").map((s) => s.trim()).filter((s) => s.length >= 2);
    tokens.push(...(sub.length ? sub : p.length >= 2 ? [p] : []));
  }

  // de-dupe preserve order
  const seen = new Set<string>();
  const unique = tokens.filter((t) => {
    const k = t.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  return unique.join(" ");
}

function matchesQuery(d: DocumentItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = [d.model, d.name, d.kind, d.category].join("\n").toLowerCase();
  // Space-separated tokens = OR (product deep links: "W/G W/L ZWC")
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length <= 1) return hay.includes(q);
  return tokens.some((t) => hay.includes(t));
}

export function filterDocuments(opts: {
  q?: string;
  category?: string;
  kind?: string;
}) {
  return allDocuments.filter((d) => {
    if (opts.category && opts.category !== "all" && d.category !== opts.category)
      return false;
    if (opts.kind && opts.kind !== "all" && d.kind !== opts.kind) return false;
    return matchesQuery(d, opts.q || "");
  });
}
