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

      <div className="hm-card overflow-hidden divide-y divide-[var(--rule)]">
        {productSeries.map((p) => (
          <article
            key={p.code}
            className="grid gap-1.5 px-4 py-3 sm:grid-cols-[minmax(7.5rem,9rem)_minmax(0,1fr)_auto] sm:items-center sm:gap-3"
          >
            <div className="min-w-0">
              <div className="font-mono text-[11px] leading-none text-[var(--ink-3)]">
                {p.category.replace(" OLTC", "")}
              </div>
              <div className="font-display mt-1 font-semibold leading-tight text-[var(--ink)]">
                {p.code}
              </div>
              <div className="mt-0.5 text-[11px] leading-snug text-[var(--ink-3)] line-clamp-1">
                {p.name}
              </div>
            </div>
            <p className="m-0 min-w-0 text-sm leading-snug text-[var(--ink-2)]">
              {p.blurb[locale]}
            </p>
            <div className="flex shrink-0 gap-3 text-xs">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                {t.products.official}
              </a>
              <Link
                href={`${localePath(locale, "/downloads")}?q=${encodeURIComponent(p.code.split(/[\/·]/)[0].trim())}`}
                className="text-[var(--ink-3)] hover:text-[var(--accent)]"
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
