"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { asset } from "@/lib/asset";

const nav = [
  { href: "/", label: "行情" },
  { href: "/downloads", label: "资料" },
  { href: "/products", label: "产品" },
  { href: "/about", label: "关于" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[var(--paper-2)]">
      <div className="hm-shell flex h-12 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <img
            src={asset("/brand/logo/hm-logo-01.png")}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded border border-[var(--rule)] bg-white object-contain p-0.5"
          />
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold tracking-tight text-[var(--accent)]">
              华明工作台
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-3)]">
              002270 · 个人用
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 sm:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/" || pathname === ""
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[var(--radius)] px-2.5 py-1 text-sm transition ${
                  active
                    ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                    : "text-[var(--ink-2)] hover:bg-[var(--paper)] hover:text-[var(--ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://www.intl-huaming.com/"
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs text-[var(--ink-3)] underline-offset-2 hover:text-[var(--accent)] hover:underline sm:inline"
          >
            官网
          </a>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-[var(--rule)] text-[var(--ink)] sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="菜单"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--rule)] bg-[var(--paper-2)] px-4 py-2 sm:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded px-3 py-2 text-sm text-[var(--ink-2)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
