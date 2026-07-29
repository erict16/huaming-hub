"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeFromPath } from "@/lib/i18n";

/** Keep <html lang> in sync for EN root vs /zh/* (static export). */
export function HtmlLang() {
  const pathname = usePathname() || "/";
  useEffect(() => {
    const locale = localeFromPath(pathname);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [pathname]);
  return null;
}
