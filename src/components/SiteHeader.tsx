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

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[var(--paper-2)]/95 backdrop-blur-sm">
      <div className="hm-shell flex h-12 items-center justify-between gap-3">
        <Link href={localePath(locale, "/")} className="flex items-center gap-2.5">
          <img
            src={asset("/brand/logo/hm-logo-01.png")}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded border border-[var(--rule)] bg-white object-contain p-0.5"
          />
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold tracking-tight text-[var(--ink)]">
              {t.brand}
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-3)]">
              {t.brandSub}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 sm:flex">
          {nav.map((item) => {
            const active =
              !item.external &&
              (item.href === localePath(locale, "/")
                ? pathname === "/" ||
                  pathname === "" ||
                  pathname === "/zh" ||
                  pathname === "/zh/"
                : pathname === item.href ||
                  pathname === item.href.replace(/\/$/, "") ||
                  pathname.startsWith(item.href));
            const className = `rounded-[var(--radius)] px-2.5 py-1 text-sm transition ${
              active
                ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                : "text-[var(--ink-2)] hover:bg-[var(--paper)] hover:text-[var(--ink)]"
            }`;
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

        <div className="flex items-center gap-2">
          <div
            className="hidden items-center gap-0.5 rounded border border-[var(--rule)] p-0.5 text-xs sm:flex"
            role="group"
            aria-label="Language"
          >
            <Link
              href={enHref}
              className={`rounded px-1.5 py-0.5 font-medium ${
                locale === "en"
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--ink-3)] hover:text-[var(--ink)]"
              }`}
              hrefLang="en"
            >
              {t.langEn}
            </Link>
            <Link
              href={zhHref}
              className={`rounded px-1.5 py-0.5 font-medium ${
                locale === "zh"
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--ink-3)] hover:text-[var(--ink)]"
              }`}
              hrefLang="zh-CN"
            >
              {t.langZh}
            </Link>
          </div>
          <a
            href={OFFICIAL_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs text-[var(--ink-3)] underline-offset-2 hover:text-[var(--accent)] hover:underline sm:inline"
          >
            {t.official}
          </a>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-[var(--rule)] text-[var(--ink)] sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--rule)] bg-[var(--paper-2)] px-4 py-2 sm:hidden">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded px-3 py-2 text-sm text-[var(--ink-2)]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded px-3 py-2 text-sm text-[var(--ink-2)]"
              >
                {item.label}
              </Link>
            ),
          )}
          <div className="mt-1 flex gap-2 border-t border-[var(--rule)] px-3 py-2">
            <Link
              href={enHref}
              onClick={() => setOpen(false)}
              className={`text-sm ${locale === "en" ? "font-semibold text-[var(--accent)]" : "text-[var(--ink-2)]"}`}
            >
              EN
            </Link>
            <Link
              href={zhHref}
              onClick={() => setOpen(false)}
              className={`text-sm ${locale === "zh" ? "font-semibold text-[var(--accent)]" : "text-[var(--ink-2)]"}`}
            >
              中文
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
