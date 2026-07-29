import Link from "next/link";
import { productSeries } from "@/data/products";
import { productDocsQuery } from "@/lib/documents";
import { getDict, localePath, type Locale } from "@/lib/i18n";

const categoryOrder = [
  "Conventional OLTC",
  "Vacuum OLTC",
  "Dry-type OLTC",
  "DETC / OCTC",
  "Accessories",
  "Service & Retrofit",
];

export function ProductsPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  const groups = categoryOrder
    .map((cat) => ({
      cat,
      items: productSeries.filter((p) => p.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  // any unexpected categories last
  const known = new Set(categoryOrder);
  const extra = productSeries.filter((p) => !known.has(p.category));
  if (extra.length) {
    groups.push({ cat: "Other", items: extra });
  }

  return (
    <div className="hm-page">
      <header className="hm-page-head">
        <div>
          <h1>{t.products.title}</h1>
          <p className="sub">{t.products.sub}</p>
        </div>
      </header>

      {/* Family-grouped catalogue — mono type codes, no per-product routes */}
      <div className="hm-product-list">
        {groups.map((g) => {
          const headId = `cat-${g.cat.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;
          return (
            <section
              key={g.cat}
              className="hm-product-group"
              aria-labelledby={headId}
            >
              <h2 id={headId} className="hm-product-group-head">
                {t.downloads.category[g.cat] || g.cat.replace(" OLTC", "")}
              </h2>
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
                      href={`${localePath(locale, "/")}?q=${encodeURIComponent(productDocsQuery(p.code))}`}
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
    </div>
  );
}
