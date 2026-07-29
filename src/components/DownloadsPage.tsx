import Link from "next/link";
import { productSeries } from "@/data/products";
import { DownloadExplorer } from "@/components/DownloadExplorer";
import {
  allDocuments,
  categories,
  kinds,
  productDocsQuery,
} from "@/lib/documents";
import { getDict, localePath, type Locale } from "@/lib/i18n";

const categoryOrder = [
  "Conventional OLTC",
  "Vacuum OLTC",
  "Dry-type OLTC",
  "DETC / OCTC",
  "Accessories",
  "Service & Retrofit",
];

/** Docs workbench: series index (was Products) + PDF explorer. */
export function DownloadsPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  const groups = categoryOrder
    .map((cat) => ({
      cat,
      items: productSeries.filter((p) => p.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  const known = new Set(categoryOrder);
  const extra = productSeries.filter((p) => !known.has(p.category));
  if (extra.length) {
    groups.push({ cat: "Other", items: extra });
  }

  return (
    <div className="hm-page hm-page-downloads">
      <header className="hm-page-head">
        <div>
          <h1>{t.downloads.title}</h1>
          <p className="sub">{t.downloads.sub(allDocuments.length)}</p>
        </div>
      </header>

      <section
        className="hm-docs-series"
        aria-labelledby="docs-series-title"
      >
        <h2 id="docs-series-title" className="hm-docs-series-title">
          {t.downloads.seriesIndexTitle}
        </h2>
        <p className="hm-docs-series-sub">{t.downloads.seriesIndexSub}</p>

        <div className="hm-product-list">
          {groups.map((g) => {
            const headId = `cat-${g.cat.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;
            return (
              <section
                key={g.cat}
                className="hm-product-group"
                aria-labelledby={headId}
              >
                <h3 id={headId} className="hm-product-group-head">
                  {t.downloads.category[g.cat] || g.cat.replace(" OLTC", "")}
                </h3>
                {g.items.map((p) => (
                  <article key={p.code} className="hm-product-row">
                    <div className="hm-product-id">
                      <div className="hm-product-code">{p.code}</div>
                      <div className="hm-product-name">{p.name}</div>
                    </div>
                    <p className="hm-product-blurb">{p.blurb[locale]}</p>
                    <div className="hm-product-links">
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.products.official}
                        <span aria-hidden="true"> ↗</span>
                      </a>
                      <Link
                        href={`${localePath(locale, "/downloads")}?q=${encodeURIComponent(productDocsQuery(p.code))}`}
                      >
                        {t.products.docs}
                      </Link>
                    </div>
                  </article>
                ))}
              </section>
            );
          })}
        </div>
      </section>

      <section
        className="hm-docs-files"
        aria-labelledby="docs-files-title"
      >
        <h2 id="docs-files-title" className="hm-docs-files-title">
          {t.downloads.filesTitle}
        </h2>
        <DownloadExplorer
          documents={allDocuments}
          categories={categories}
          kinds={kinds}
          locale={locale}
        />
      </section>
    </div>
  );
}
