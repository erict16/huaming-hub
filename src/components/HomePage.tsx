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
  const seriesCount = productSeries.length;
  const docCount = allDocuments.length;

  const entries = [
    {
      href: localePath(locale, "/downloads"),
      title: t.home.entryDocsTitle,
      desc: t.home.entryDocsDesc(docCount),
      cta: t.home.entryDocsCta,
    },
    {
      href: localePath(locale, "/products"),
      title: t.home.entryProductsTitle,
      desc: t.home.entryProductsDesc,
      cta: t.home.entryProductsCta,
    },
    {
      href: SELECTOR_URL,
      title: t.home.entrySelectorTitle,
      desc: t.home.entrySelectorDesc,
      cta: t.home.entrySelectorCta,
      external: true as const,
    },
  ];

  const steps = [
    { n: "01", title: t.home.how1Title, body: t.home.how1Body },
    { n: "02", title: t.home.how2Title, body: t.home.how2Body },
    { n: "03", title: t.home.how3Title, body: t.home.how3Body },
  ];

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
        <p className="hm-hero-meta">
          {t.home.meta(seriesCount, docCount)}
        </p>
      </section>

      <section className="hm-entry-grid" aria-label={t.home.entriesLabel}>
        {entries.map((e) =>
          e.external ? (
            <a
              key={e.href}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hm-entry"
            >
              <div className="hm-entry-title">{e.title}</div>
              <p className="hm-entry-desc">{e.desc}</p>
              <span className="hm-entry-cta">
                {e.cta}
                <span aria-hidden="true"> ↗</span>
              </span>
            </a>
          ) : (
            <Link key={e.href} href={e.href} className="hm-entry">
              <div className="hm-entry-title">{e.title}</div>
              <p className="hm-entry-desc">{e.desc}</p>
              <span className="hm-entry-cta">{e.cta} →</span>
            </Link>
          ),
        )}
      </section>

      <section className="hm-howto" aria-labelledby="how-title">
        <h2 id="how-title">{t.home.howTitle}</h2>
        <ol>
          {steps.map((s) => (
            <li key={s.n}>
              <div className="num" aria-hidden="true">
                {s.n}
              </div>
              <p className="title">{s.title.replace(/^\d+\.\s*/, "")}</p>
              <p className="body">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
