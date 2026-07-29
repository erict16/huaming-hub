"use client";

import { useEffect } from "react";
import { localePath, type Locale } from "@/lib/i18n";

/** Static-export friendly redirect: /products → /downloads (keep ?q=). */
export function ProductsRedirect({ locale }: { locale: Locale }) {
  useEffect(() => {
    const q = typeof window !== "undefined" ? window.location.search : "";
    const target = `${localePath(locale, "/downloads")}${q}`;
    window.location.replace(target);
  }, [locale]);

  return (
    <div className="hm-page">
      <p className="hm-redirect-note">
        <a href={localePath(locale, "/downloads")}>→ Docs</a>
      </p>
    </div>
  );
}
