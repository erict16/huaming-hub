import type { Metadata } from "next";
import Link from "next/link";
import { productSeries } from "@/data/products";

export const metadata: Metadata = {
  title: "产品系列",
  description: "华明分接开关系列一览。",
};

export default function ProductsPage() {
  return (
    <div className="hm-page">
      <header className="hm-page-head">
        <div>
          <h1>产品系列</h1>
          <p className="sub">参数表去资料页；这里只定位型号。</p>
        </div>
      </header>

      <div className="hm-card overflow-hidden divide-y divide-[var(--rule)]">
        {productSeries.map((p) => (
          <article
            key={p.code}
            className="grid gap-1.5 px-4 py-2.5 sm:grid-cols-[132px_1fr_auto] sm:items-center sm:gap-3"
          >
            <div className="min-w-0">
              <div className="font-mono text-[11px] leading-none text-[var(--ink-3)]">
                {p.category.replace(" OLTC", "")}
              </div>
              <div className="font-display mt-1 font-semibold leading-tight text-[var(--ink)]">
                {p.code}
              </div>
            </div>
            <p className="text-sm leading-snug text-[var(--ink-2)]">{p.blurb}</p>
            <div className="flex gap-3 text-xs">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                官网
              </a>
              <Link
                href={`/downloads/?q=${encodeURIComponent(p.code.split(/[\/·]/)[0].trim())}`}
                className="text-[var(--ink-3)] hover:text-[var(--accent)]"
              >
                资料
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
