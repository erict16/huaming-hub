import type { Metadata } from "next";
import Link from "next/link";
import { productSeries } from "@/data/products";

export const metadata: Metadata = {
  title: "产品系列",
  description: "华明分接开关系列一览。",
};

export default function ProductsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">
          产品系列
        </h1>
        <p className="mt-1 text-sm text-[var(--ink-3)]">
          需要参数表就去资料页；这里只做快速定位。
        </p>
      </div>

      <div className="hm-card divide-y divide-[var(--rule)] overflow-hidden">
        {productSeries.map((p) => (
          <article
            key={p.code}
            className="grid gap-2 px-4 py-3 sm:grid-cols-[140px_1fr_auto] sm:items-center"
          >
            <div>
              <div className="font-mono text-xs text-[var(--ink-3)]">
                {p.category.replace(" OLTC", "")}
              </div>
              <div className="font-display font-semibold text-[var(--ink)]">
                {p.code}
              </div>
            </div>
            <p className="text-sm text-[var(--ink-2)]">{p.blurb}</p>
            <div className="flex gap-2 text-xs">
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
