"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  OFFICIAL_URL,
  SELECTOR_URL,
  getDict,
  localeFromPath,
  localePath,
  type Locale,
} from "@/lib/i18n";

export function SiteFooter() {
  const pathname = usePathname() || "/";
  const locale: Locale = localeFromPath(pathname);
  const t = getDict(locale);

  return (
    <footer className="hm-footer">
      <div className="hm-shell flex flex-col gap-3 py-5 text-xs leading-relaxed text-[var(--ink-3)] sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="max-w-md min-w-0">
          <p className="m-0 font-medium text-[var(--ink-2)]">{t.brand}</p>
          <p className="mt-1 mb-0 break-words">{t.footer.blurb}</p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-[var(--ink-2)] shrink-0">
          <Link
            href={localePath(locale, "/products")}
            className="hover:text-[var(--accent)]"
          >
            {t.footer.products}
          </Link>
          <Link
            href={localePath(locale, "/downloads")}
            className="hover:text-[var(--accent)]"
          >
            {t.footer.downloads}
          </Link>
          <a
            href={SELECTOR_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent)]"
          >
            {t.footer.selector}
          </a>
          <a
            href={OFFICIAL_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent)]"
          >
            {t.footer.official}
          </a>
        </nav>
      </div>
    </footer>
  );
}
