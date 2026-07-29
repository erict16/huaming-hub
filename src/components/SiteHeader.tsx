"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import {
  SELECTOR_URL,
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
    { href: localePath(locale, "/products"), label: t.nav.products },
    { href: localePath(locale, "/downloads"), label: t.nav.downloads },
    { href: SELECTOR_URL, label: t.nav.selector, external: true },
  ];

  const enHref = switchLocale(pathname, "en");
  const zhHref = switchLocale(pathname, "zh");
  const docsHref = localePath(locale, "/downloads");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string, external?: boolean) => {
    if (external) return false;
    return (
      pathname === href ||
      pathname === href.replace(/\/$/, "") ||
      pathname.startsWith(href)
    );
  };

  const isHome =
    pathname === "/" ||
    pathname === "" ||
    pathname === "/zh" ||
    pathname === "/zh/";

  return (
    <header className="hm-header">
      <div className="hm-shell hm-header-inner">
        <Link href={localePath(locale, "/")} className="hm-brand">
          <img
            src={asset("/brand/logo/favicon-32.png")}
            alt=""
            width={30}
            height={30}
            className="hm-brand-mark"
          />
          <div className="hm-brand-text">
            <div className="hm-brand-name">{t.brand}</div>
            <div className="hm-brand-sub">{t.brandSub}</div>
          </div>
        </Link>

        <nav className="hm-nav" aria-label={t.nav.primary}>
          <Link
            href={localePath(locale, "/")}
            className={`hm-nav-link${isHome ? " hm-nav-link-active" : ""}`}
            aria-current={isHome ? "page" : undefined}
          >
            {t.nav.home}
          </Link>
          {nav.map((item) => {
            const active = isActive(item.href, item.external);
            const className = `hm-nav-link${active ? " hm-nav-link-active" : ""}`;
            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {item.label}
                  <span aria-hidden="true"> ↗</span>
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={className}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hm-header-actions">
          <div className="hm-lang" role="group" aria-label={t.nav.language}>
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
          <Link
            href={docsHref}
            className="hm-btn hm-btn-primary hm-btn-sm hm-header-cta"
          >
            {t.nav.downloads}
          </Link>
          <button
            type="button"
            className="hm-menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="hm-mobile-nav">
          <Link href={localePath(locale, "/")} onClick={() => setOpen(false)}>
            {t.nav.home}
          </Link>
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                {item.label}
                <span aria-hidden="true"> ↗</span>
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
          <Link href={docsHref} onClick={() => setOpen(false)}>
            {t.home.ctaDocs}
          </Link>
          <div className="hm-mobile-lang">
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
