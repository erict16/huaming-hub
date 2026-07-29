import Link from "next/link";
import { productSeries } from "@/lib/data/products";
import { allDocuments } from "@/lib/documents";
import { getDict } from "@/lib/i18n";
import { OFFICIAL_URL, SELECTOR_URL } from "@/lib/shared";

export default function HomePage() {
  const t = getDict("en");
  const n = allDocuments.length;
  const seriesCount = productSeries.length;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-16">
      <div>
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-fd-primary">
          {t.homeKicker}
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.homeTitle}
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-fd-muted-foreground">
          {t.homeLead(n)}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/docs/files"
          className="inline-flex items-center rounded-md bg-fd-primary px-4 py-2 text-sm font-semibold text-fd-primary-foreground hover:opacity-90"
        >
          {t.homeCtaFiles}
        </Link>
        <Link
          href="/docs"
          className="inline-flex items-center rounded-md border border-fd-border bg-fd-card px-4 py-2 text-sm font-semibold hover:border-fd-primary"
        >
          {t.homeCtaDocs}
        </Link>
        <a
          href={SELECTOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md border border-fd-border bg-fd-card px-4 py-2 text-sm font-semibold hover:border-fd-primary"
        >
          {t.homeCtaSelector}
          <span aria-hidden="true"> ↗</span>
          <span className="sr-only"> ({t.opensExternal})</span>
        </a>
      </div>

      <ul className="flex flex-wrap gap-8 text-sm">
        <li>
          <div className="font-mono text-lg font-medium tabular-nums">
            {seriesCount}
          </div>
          <div className="text-xs text-fd-muted-foreground">
            {t.homeMetaSeries}
          </div>
        </li>
        <li>
          <div className="font-mono text-lg font-medium tabular-nums">{n}</div>
          <div className="text-xs text-fd-muted-foreground">
            {t.homeMetaDocs}
          </div>
        </li>
      </ul>

      <p className="text-xs text-fd-muted-foreground">
        {t.homeNote}{" "}
        <a
          href={OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-fd-primary hover:underline"
        >
          intl-huaming.com ↗
        </a>
      </p>
    </div>
  );
}
