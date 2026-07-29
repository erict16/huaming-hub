import Link from "next/link";
import { productSeries } from "@/data/products";
import { allDocuments } from "@/lib/documents";
import {
  SELECTOR_URL,
  getDict,
  localePath,
  type Locale,
} from "@/lib/i18n";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const docCount = allDocuments.length;

  return (
    <div className="hm-page">
      <section className="hm-hero">
        <p className="hm-hero-kicker">{t.home.kicker}</p>
        <h1>{t.home.title}</h1>
        <p className="hm-hero-lead">{t.home.lead}</p>
        <div className="hm-hero-actions">
          <Link
            href={localePath(locale, "/downloads")}
            className="hm-btn hm-btn-primary"
          >
            {t.home.ctaDocs}
          </Link>
          <Link
            href={localePath(locale, "/products")}
            className="hm-btn hm-btn-secondary"
          >
            {t.home.ctaProducts}
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
      </section>

      <section className="hm-home-band" aria-labelledby="docs-band-title">
        <div className="hm-home-band-head">
          <h2 id="docs-band-title">{t.home.docsBandTitle}</h2>
          <Link
            href={localePath(locale, "/downloads")}
            className="hm-home-band-link"
          >
            {t.home.docsBandCta} →
          </Link>
        </div>
        <p className="hm-home-band-desc">{t.home.docsBandDesc(docCount)}</p>
      </section>

      <section className="hm-home-band" aria-labelledby="series-preview-title">
        <div className="hm-home-band-head">
          <h2 id="series-preview-title">{t.home.seriesTitle}</h2>
          <Link
            href={localePath(locale, "/products")}
            className="hm-home-band-link"
          >
            {t.home.seriesCta} →
          </Link>
        </div>
        <ul className="hm-series-preview">
          {productSeries.map((p) => (
            <li key={p.code} className="hm-series-preview-row">
              <span className="hm-series-preview-code">{p.code}</span>
              <span className="hm-series-preview-name">{p.name}</span>
              <span className="hm-series-preview-blurb">{p.blurb[locale]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="hm-tool-strip" aria-labelledby="selector-strip-title">
        <div className="hm-tool-strip-text">
          <span id="selector-strip-title" className="hm-tool-strip-title">
            {t.home.selectorStripTitle}
          </span>
          <span className="hm-tool-strip-desc">{t.home.selectorStripDesc}</span>
        </div>
        <a
          href={SELECTOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hm-tool-strip-cta"
        >
          {t.home.selectorStripCta}
          <span aria-hidden="true"> ↗</span>
          <span className="sr-only"> ({t.home.opensExternal})</span>
        </a>
      </section>
    </div>
  );
}
