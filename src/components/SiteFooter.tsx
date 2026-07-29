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
      <div className="hm-shell hm-footer-inner">
        <div className="min-w-0">
          <p className="hm-footer-brand">{t.brand}</p>
          <p className="hm-footer-blurb">{t.footer.blurb}</p>
        </div>
        <nav className="hm-footer-nav" aria-label="Footer">
          <Link href={localePath(locale, "/products")}>
            {t.footer.products}
          </Link>
          <Link href={localePath(locale, "/downloads")}>
            {t.footer.downloads}
          </Link>
          <a href={SELECTOR_URL} target="_blank" rel="noopener noreferrer">
            {t.footer.selector}
            <span aria-hidden="true"> ↗</span>
          </a>
          <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer">
            {t.footer.official}
            <span aria-hidden="true"> ↗</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
