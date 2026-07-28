import Link from "next/link";
import { NewsFeed } from "@/components/NewsFeed";
import { StockPanel } from "@/components/StockPanel";
import { allDocuments } from "@/lib/documents";

export default function HomePage() {
  const docCount = allDocuments.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)]">
            华明装备 002270
          </h1>
          <p className="mt-1 text-sm text-[var(--ink-3)]">
            股价 · 过滤后的公告 · {docCount} 份技术资料
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/downloads"
            className="rounded-[var(--radius)] bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--accent-2)]"
          >
            技术资料
          </Link>
          <Link
            href="/products"
            className="rounded-[var(--radius)] border border-[var(--rule-2)] bg-white px-3 py-1.5 text-sm text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            产品系列
          </Link>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <div className="space-y-3 lg:sticky lg:top-20 lg:self-start">
          <StockPanel />
          <div className="hm-card p-3 text-sm">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-3)]">
              快捷
            </div>
            <ul className="mt-2 space-y-1.5 text-[var(--ink-2)]">
              <li>
                <Link href="/downloads" className="hover:text-[var(--accent)]">
                  下规范书 / Leaflet
                </Link>
              </li>
              <li>
                <a
                  href="https://erict16.github.io/oltc-selector/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--accent)]"
                >
                  OLTC 选型器
                </a>
              </li>
              <li>
                <a
                  href="https://data.eastmoney.com/notices/stock/002270.html"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--accent)]"
                >
                  全部公告（未过滤）
                </a>
              </li>
            </ul>
          </div>
        </div>
        <NewsFeed />
      </div>
    </div>
  );
}
