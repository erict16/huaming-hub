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
  const plate = productSeries.slice(0, 7);
  const preview = productSeries.slice(0, 6);

  const dest = [
    {
      href: localePath(locale, "/downloads"),
      tag: locale === "zh" ? "01" : "01",
      title: t.home.entryDocsTitle,
      desc: t.home.entryDocsDesc(docCount),
      cta: t.home.entryDocsCta,
    },
    {
      href: localePath(locale, "/products"),
      tag: "02",
      title: t.home.entryProductsTitle,
      desc: t.home.entryProductsDesc,
      cta: t.home.entryProductsCta,
    },
    {
      href: SELECTOR_URL,
      tag: "03",
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
    <div className="hm-page hm-page-home">
      {/* Split Studio hero */}
      <section className="hm-hero">
        <div className="hm-hero-copy">
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
          <ul className="hm-hero-meta">
            <li>
              <span className="n">{seriesCount}</span>
              <span className="l">
                {locale === "zh" ? "产品系列" : "product series"}
              </span>
            </li>
            <li>
              <span className="n">{docCount}</span>
              <span className="l">
                {locale === "zh" ? "技术 PDF" : "technical PDFs"}
              </span>
            </li>
            <li>
              <span className="n">EN / 中</span>
              <span className="l">
                {locale === "zh" ? "界面语言" : "interface"}
              </span>
            </li>
          </ul>
        </div>

        <aside className="hm-hero-plate" aria-label={t.home.entryProductsTitle}>
          <div className="hm-hero-plate-head">
            <span>{locale === "zh" ? "系列索引" : "Series index"}</span>
            <strong>
              {seriesCount} {locale === "zh" ? "组" : "groups"}
            </strong>
          </div>
          <ul className="hm-hero-plate-list">
            {plate.map((p) => (
              <li key={p.code}>
                <span className="code">{p.code.split(/[·]/)[0].trim()}</span>
                <span className="name">{p.name}</span>
              </li>
            ))}
          </ul>
          <p className="hm-hero-plate-foot">
            {locale === "zh"
              ? "PDF 在华明国际站 · 本站不托管文件"
              : "PDFs on Huaming international site · not hosted here"}
          </p>
        </aside>
      </section>

      {/* Dark destination band */}
      <section className="hm-dest" aria-label={t.home.entriesLabel}>
        <div className="hm-dest-inner">
          {dest.map((d) =>
            d.external ? (
              <a
                key={d.href}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hm-dest-item"
              >
                <span className="tag">{d.tag}</span>
                <span className="title">{d.title}</span>
                <p className="desc">{d.desc}</p>
                <span className="cta">
                  {d.cta}
                  <span aria-hidden="true"> ↗</span>
                </span>
              </a>
            ) : (
              <Link key={d.href} href={d.href} className="hm-dest-item">
                <span className="tag">{d.tag}</span>
                <span className="title">{d.title}</span>
                <p className="desc">{d.desc}</p>
                <span className="cta">{d.cta} →</span>
              </Link>
            ),
          )}
        </div>
      </section>

      {/* Series preview */}
      <section className="hm-preview">
        <div className="hm-section-label">
          <h2>{t.home.entryProductsTitle}</h2>
          <Link href={localePath(locale, "/products")}>
            {t.home.entryProductsCta} →
          </Link>
        </div>
        <div className="hm-preview-grid">
          {preview.map((p) => (
            <Link
              key={p.code}
              href={`${localePath(locale, "/downloads")}?q=${encodeURIComponent(p.code.split(/[\/·]/)[0].trim())}`}
              className="hm-preview-card"
            >
              <span className="code">{p.code}</span>
              <span className="name">{p.name}</span>
              <p className="blurb">{p.blurb[locale]}</p>
              <span className="more">
                {locale === "zh" ? "查资料" : "Find docs"} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How-to */}
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
