import Link from "next/link";
import { productSeries } from "@/data/products";
import { allDocuments } from "@/lib/documents";
import { asset } from "@/lib/asset";
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
      href: localePath(locale, "/products"),
      title: t.home.entryProductsTitle,
      desc: t.home.entryProductsDesc,
      cta: t.home.entryProductsCta,
    },
    {
      href: localePath(locale, "/downloads"),
      title: t.home.entryDocsTitle,
      desc: t.home.entryDocsDesc(docCount),
      cta: t.home.entryDocsCta,
    },
    {
      href: SELECTOR_URL,
      title: t.home.entrySelectorTitle,
      desc: t.home.entrySelectorDesc,
      cta: t.home.entrySelectorCta,
      external: true as const,
    },
  ];

  return (
    <div className="hm-page">
      <section className="hm-hero">
        <div className="hm-hero-copy">
          <p className="hm-hero-kicker">{t.home.kicker}</p>
          <h1>{t.home.title}</h1>
          <p className="hm-hero-lead">{t.home.lead}</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={localePath(locale, "/products")}
              className="hm-btn hm-btn-primary"
            >
              {t.home.ctaProducts}
            </Link>
            <Link
              href={localePath(locale, "/downloads")}
              className="hm-btn hm-btn-secondary"
            >
              {t.home.ctaDocs}
            </Link>
            <a
              href={SELECTOR_URL}
              target="_blank"
              rel="noreferrer"
              className="hm-btn hm-btn-secondary"
            >
              {t.home.ctaSelector} ↗
            </a>
          </div>
          <p className="hm-hero-meta">{t.home.meta(seriesCount, docCount)}</p>
        </div>
        <div className="hm-hero-visual">
          <img
            src={asset("/brand/home/home-product.png")}
            alt={locale === "zh" ? "华明分接开关产品" : "Huaming tap changer"}
            width={480}
            height={360}
          />
        </div>
      </section>

      <section className="hm-entry-grid" aria-label={t.home.entriesLabel}>
        {entries.map((e) =>
          e.external ? (
            <a
              key={e.href}
              href={e.href}
              target="_blank"
              rel="noreferrer"
              className="hm-entry"
            >
              <div className="hm-entry-title">{e.title}</div>
              <p className="hm-entry-desc">{e.desc}</p>
              <span className="hm-entry-cta">{e.cta} ↗</span>
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

      <section className="hm-stack">
        <div className="hm-section-label">
          <h2>{t.home.howTitle}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            [t.home.how1Title, t.home.how1Body],
            [t.home.how2Title, t.home.how2Body],
            [t.home.how3Title, t.home.how3Body],
          ].map(([title, body]) => (
            <div key={title} className="hm-card hm-card-pad">
              <div className="font-display text-sm font-semibold text-[var(--ink)]">
                {title}
              </div>
              <p className="mt-1.5 mb-0 text-sm leading-snug text-[var(--ink-2)]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
