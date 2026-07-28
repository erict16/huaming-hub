import documents from "@/data/documents.json";

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

export function filterDocuments(opts: {
  q?: string;
  category?: string;
  kind?: string;
}) {
  const q = (opts.q || "").trim().toLowerCase();
  return allDocuments.filter((d) => {
    if (opts.category && opts.category !== "all" && d.category !== opts.category)
      return false;
    if (opts.kind && opts.kind !== "all" && d.kind !== opts.kind) return false;
    if (!q) return true;
    return (
      d.model.toLowerCase().includes(q) ||
      d.name.toLowerCase().includes(q) ||
      d.kind.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q)
    );
  });
}
