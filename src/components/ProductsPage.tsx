import Link from "next/link";
import { productSeries } from "@/data/products";
import { getDict, localePath, type Locale } from "@/lib/i18n";

export function ProductsPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <div className="hm-page">
      <header className="hm-page-head">
        <div>
          <h1>{t.products.title}</h1>
          <p className="sub">{t.products.sub}</p>
        </div>
      </header>

      <div className="hm-product-list">
        {productSeries.map((p) => (
          <article key={p.code} className="hm-product-row">
            <div className="min-w-0">
              <div className="hm-product-cat">
                {p.category.replace(" OLTC", "")}
              </div>
              <div className="hm-product-code">{p.code}</div>
              <div className="hm-product-name line-clamp-1">{p.name}</div>
            </div>
            <p className="hm-product-blurb">{p.blurb[locale]}</p>
            <div className="hm-product-links">
              <a href={p.href} target="_blank" rel="noreferrer">
                {t.products.official}
              </a>
              <Link
                href={`${localePath(locale, "/downloads")}?q=${encodeURIComponent(p.code.split(/[\/·]/)[0].trim())}`}
              >
                {t.products.docs}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
