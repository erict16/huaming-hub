import Link from "next/link";
import { productSeries } from "@/lib/data/products";
import { productDocsQuery } from "@/lib/documents";
import { getDict, type Locale } from "@/lib/i18n";

const categoryOrder = [
  "Conventional OLTC",
  "Vacuum OLTC",
  "Dry-type OLTC",
  "DETC / OCTC",
  "Accessories",
  "Service & Retrofit",
];

export function SeriesList({ locale = "en" }: { locale?: Locale }) {
  const t = getDict(locale);

  const groups = categoryOrder
    .map((cat) => ({
      cat,
      items: productSeries.filter((p) => p.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="not-prose flex flex-col gap-6">
      <p className="text-sm text-fd-muted-foreground">{t.seriesSub}</p>
      {groups.map((g) => (
        <section key={g.cat} className="overflow-hidden rounded-lg border border-fd-border">
          <h3 className="border-b border-fd-border bg-fd-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground">
            {t.category[g.cat] || g.cat.replace(" OLTC", "")}
          </h3>
          <ul className="divide-y divide-fd-border">
            {g.items.map((p) => (
              <li
                key={p.code}
                className="grid gap-2 px-4 py-3 sm:grid-cols-[minmax(7rem,9rem)_1fr_auto] sm:items-center"
              >
                <div>
                  <div className="font-mono text-xs font-semibold">{p.code}</div>
                  <div className="text-sm text-fd-muted-foreground">{p.name}</div>
                </div>
                <p className="text-sm text-fd-muted-foreground">
                  {p.blurb[locale]}
                </p>
                <div className="flex flex-wrap gap-3 text-xs font-semibold">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fd-muted-foreground hover:text-fd-primary"
                  >
                    {t.official} ↗
                  </a>
                  <Link
                    href={`/docs/files?q=${encodeURIComponent(productDocsQuery(p.code))}`}
                    className="text-fd-primary hover:underline"
                  >
                    {t.seriesFilter}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
