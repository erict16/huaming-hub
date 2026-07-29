import { DownloadExplorer } from "@/components/DownloadExplorer";
import { allDocuments, categories, kinds } from "@/lib/documents";
import { SELECTOR_URL, getDict, type Locale } from "@/lib/i18n";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const n = allDocuments.length;

  return (
    <div className="hm-page hm-page-desk">
      <header className="hm-desk-head">
        <p className="hm-desk-kicker">{t.home.kicker}</p>
        <h1>{t.home.title}</h1>
        <p className="hm-desk-lead">{t.home.lead(n)}</p>
      </header>

      <DownloadExplorer
        documents={allDocuments}
        categories={categories}
        kinds={kinds}
        locale={locale}
        autofocus
      />

      <p className="hm-desk-tool">
        <span className="hm-desk-tool-label">{t.home.selectorStripTitle}</span>
        <span className="hm-desk-tool-sep" aria-hidden="true">
          ·
        </span>
        <span className="hm-desk-tool-desc">{t.home.selectorStripDesc}</span>{" "}
        <a
          href={SELECTOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hm-desk-tool-link"
        >
          {t.home.selectorStripCta}
          <span aria-hidden="true"> ↗</span>
          <span className="sr-only"> ({t.home.opensExternal})</span>
        </a>
      </p>
    </div>
  );
}
