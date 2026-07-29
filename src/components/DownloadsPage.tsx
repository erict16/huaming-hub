import { DownloadExplorer } from "@/components/DownloadExplorer";
import { allDocuments, categories, kinds } from "@/lib/documents";
import { getDict, type Locale } from "@/lib/i18n";

/** Bookmark-compatible route — same explorer as Spec Desk home. */
export function DownloadsPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <div className="hm-page hm-page-downloads">
      <header className="hm-page-head">
        <div>
          <h1>{t.downloads.title}</h1>
          <p className="sub">{t.downloads.sub(allDocuments.length)}</p>
        </div>
      </header>
      <DownloadExplorer
        documents={allDocuments}
        categories={categories}
        kinds={kinds}
        locale={locale}
      />
    </div>
  );
}
