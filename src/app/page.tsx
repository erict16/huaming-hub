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
            个人盘口 · 公告与媒体 · {docCount} 份资料
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
      </header>

      <StockPanel />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px]">
        <NewsFeed />
        <aside className="hm-stack lg:sticky lg:top-[calc(var(--header-h)+var(--s3))] lg:self-start">
          <div className="hm-rail">
            <div className="hm-rail-label">快捷</div>
            <ul>
              <li>
                <Link href="/downloads">规范书 / Leaflet</Link>
              </li>
              <li>
                <a
                  href="https://erict16.github.io/oltc-selector/"
                  target="_blank"
                  rel="noreferrer"
                >
                  OLTC 选型器 ↗
                </a>
              </li>
              <li>
                <Link href="/products">产品系列</Link>
              </li>
              <li>
                <a
                  href="https://data.eastmoney.com/notices/stock/002270.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  交易所全部公告 ↗
                </a>
              </li>
              <li>
                <a
                  href="https://quote.eastmoney.com/sz002270.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  东方财富行情 ↗
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
