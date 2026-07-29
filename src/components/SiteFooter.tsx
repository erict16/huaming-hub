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
        <p className="hm-footer-meta">
          <span className="hm-footer-brand">{t.brand}</span>
          <span className="hm-footer-sep" aria-hidden="true">
            ·
          </span>
          <span>{t.footer.blurb}</span>
        </p>
        <nav className="hm-footer-nav" aria-label="Footer">
          {/* Match header IA: Docs · Products · Selector · Official */}
          <Link href={localePath(locale, "/downloads")}>
            {t.footer.downloads}
          </Link>
          <Link href={localePath(locale, "/products")}>
            {t.footer.products}
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
