"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { asset } from "@/lib/asset";
import {
  SELECTOR_URL,
  OFFICIAL_URL,
  getDict,
  localeFromPath,
  localePath,
  switchLocale,
  type Locale,
} from "@/lib/i18n";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const locale: Locale = localeFromPath(pathname);
  const t = getDict(locale);
  const [open, setOpen] = useState(false);

  const nav: { href: string; label: string; external?: boolean }[] = [
    { href: localePath(locale, "/"), label: t.nav.home },
    { href: localePath(locale, "/products"), label: t.nav.products },
    { href: localePath(locale, "/downloads"), label: t.nav.downloads },
    { href: SELECTOR_URL, label: t.nav.selector, external: true },
  ];

  const enHref = switchLocale(pathname, "en");
  const zhHref = switchLocale(pathname, "zh");

  const isActive = (href: string, external?: boolean) => {
    if (external) return false;
    if (href === localePath(locale, "/")) {
      return (
        pathname === "/" ||
        pathname === "" ||
        pathname === "/zh" ||
        pathname === "/zh/"
      );
    }
    return (
      pathname === href ||
      pathname === href.replace(/\/$/, "") ||
      pathname.startsWith(href)
    );
  };

  return (
    <header className="hm-header">
      <div className="hm-shell hm-header-inner">
        <Link href={localePath(locale, "/")} className="hm-brand">
          <img
            src={asset("/brand/logo/favicon-32.png")}
            alt=""
            width={28}
            height={28}
            className="hm-brand-mark"
          />
          <div className="hm-brand-text">
            <div className="hm-brand-name">{t.brand}</div>
            <div className="hm-brand-sub">{t.brandSub}</div>
          </div>
        </Link>

        <nav className="hm-nav" aria-label="Primary">
          {nav.map((item) => {
            const active = isActive(item.href, item.external);
            const className = `hm-nav-link${active ? " hm-nav-link-active" : ""}`;
            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.href} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hm-header-actions">
          <div className="hm-lang" role="group" aria-label="Language">
            <Link
              href={enHref}
              hrefLang="en"
              aria-current={locale === "en" ? "true" : undefined}
            >
              {t.langEn}
            </Link>
            <Link
              href={zhHref}
              hrefLang="zh-CN"
              aria-current={locale === "zh" ? "true" : undefined}
            >
              {t.langZh}
            </Link>
          </div>
          <a
            href={OFFICIAL_URL}
            target="_blank"
            rel="noreferrer"
            className="hm-header-official"
          >
            {t.official}
          </a>
          <button
            type="button"
            className="hm-menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="hm-mobile-nav sm:hidden">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <div className="flex gap-4 border-t border-[var(--rule)] px-3 py-2 mt-1">
            <Link
              href={enHref}
              onClick={() => setOpen(false)}
              className={
                locale === "en"
                  ? "font-semibold text-[var(--accent)]"
                  : "text-[var(--ink-2)]"
              }
            >
              EN
            </Link>
            <Link
              href={zhHref}
              onClick={() => setOpen(false)}
              className={
                locale === "zh"
                  ? "font-semibold text-[var(--accent)]"
                  : "text-[var(--ink-2)]"
              }
            >
              中文
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
