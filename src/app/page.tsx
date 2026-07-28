import Link from "next/link";
import { NewsFeed } from "@/components/NewsFeed";
import { StockPanel } from "@/components/StockPanel";
import { allDocuments } from "@/lib/documents";

export default function HomePage() {
  const docCount = allDocuments.length;

  return (
    <div className="hm-page">
      <header className="hm-page-head">
        <div>
          <h1>华明装备 002270</h1>
          <p className="sub">
            盘口 + 公告/媒体（利好利空）· {docCount} 份资料
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/downloads"
            className="hm-btn hm-btn-primary"
            style={{ color: "#ffffff" }}
          >
            技术资料
          </Link>
          <Link href="/products" className="hm-btn hm-btn-secondary">
            产品系列
          </Link>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hm-stack lg:sticky lg:top-[calc(var(--header-h)+var(--s3))] lg:self-start">
          <StockPanel />
          <div className="hm-card hm-card-pad text-sm">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-3)]">
              快捷
            </div>
            <ul className="mt-2 space-y-1.5 leading-snug text-[var(--ink-2)]">
              <li>
                <Link href="/downloads" className="hover:text-[var(--accent)]">
                  规范书 / Leaflet
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
        </aside>
        <NewsFeed />
      </div>
    </div>
  );
}
