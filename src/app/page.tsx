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
            自己用：盘口 + 公告/媒体（利好利空都收）· {docCount} 份资料
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/downloads" className="hm-btn hm-btn-primary">
            技术资料
          </Link>
          <Link href="/products" className="hm-btn hm-btn-secondary">
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
                  交易所全部公告
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
