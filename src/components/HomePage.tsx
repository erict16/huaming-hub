import Link from "next/link";
import { productSeries } from "@/data/products";
import { allDocuments, productDocsQuery } from "@/lib/documents";
import {
  SELECTOR_URL,
  getDict,
  localePath,
  type Locale,
} from "@/lib/i18n";

/** Portal home — site identity, not the PDF table. */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const seriesCount = productSeries.length;
  const docCount = allDocuments.length;
  const plate = productSeries.slice(0, 8);

  return (
    <div className="hm-page hm-page-portal">
      <section className="hm-portal-hero">
        <p className="hm-portal-kicker">{t.home.kicker}</p>
        <h1>{t.home.title}</h1>
        <p className="hm-portal-lead">{t.home.lead(docCount)}</p>

        <div className="hm-portal-actions">
          <Link
            href={localePath(locale, "/downloads")}
            className="hm-btn hm-btn-primary"
          >
            {t.home.ctaDocs}
          </Link>
          <a
            href={SELECTOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hm-btn hm-btn-secondary"
          >
            {t.home.ctaSelector}
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> ({t.home.opensExternal})</span>
          </a>
        </div>

        <ul className="hm-portal-meta">
          <li>
            <span className="n">{seriesCount}</span>
            <span className="l">{t.home.metaSeries}</span>
          </li>
          <li>
            <span className="n">{docCount}</span>
            <span className="l">{t.home.metaDocs}</span>
          </li>
          <li>
            <span className="n">EN / 中</span>
            <span className="l">{t.home.metaLang}</span>
          </li>
        </ul>
      </section>

      <section
        className="hm-portal-plate"
        aria-labelledby="portal-series-title"
      >
        <div className="hm-portal-plate-head">
          <h2 id="portal-series-title">{t.home.seriesTitle}</h2>
          <Link
            href={localePath(locale, "/downloads")}
            className="hm-portal-plate-link"
          >
            {t.home.seriesCta} →
          </Link>
        </div>
        <ul className="hm-portal-plate-list">
          {plate.map((p) => (
            <li key={p.code}>
              <Link
                href={`${localePath(locale, "/downloads")}?q=${encodeURIComponent(productDocsQuery(p.code))}`}
                className="hm-portal-plate-row"
              >
                <span className="code">{p.code}</span>
                <span className="name">{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="hm-portal-plate-foot">{t.home.seriesFoot}</p>
      </section>
    </div>
  );
}
