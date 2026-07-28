import Link from "next/link";
import { NewsFeed } from "@/components/NewsFeed";
import { StockPanel } from "@/components/StockPanel";
import { productSeries } from "@/data/products";
import { allDocuments } from "@/lib/documents";
import { asset } from "@/lib/asset";

const entries = [
  {
    href: "/products",
    title: "产品系列",
    desc: "有载 / 无励磁分接开关与机构一览",
    cta: "查看系列",
  },
  {
    href: "/downloads",
    title: "技术资料",
    desc: `${allDocuments.length} 份规范书、Leaflet 与说明`,
    cta: "下载资料",
  },
  {
    href: "https://erict16.github.io/oltc-selector/",
    title: "OLTC 选型",
    desc: "按电压、电流等条件快速对照型号",
    cta: "打开选型器",
    external: true,
  },
  {
    href: "/about",
    title: "关于华明",
    desc: "公司简况、认证与公开信息",
    cta: "了解更多",
  },
] as const;

export default function HomePage() {
  const seriesCount = productSeries.length;

  return (
    <div className="hm-page">
      {/* 对外入口：先讲清是谁、能做什么 */}
      <section className="hm-hero">
        <div className="hm-hero-copy">
          <p className="hm-hero-kicker">华明装备 · 002270.SZ</p>
          <h1>变压器分接开关资料与产品参考</h1>
          <p className="hm-hero-lead">
            汇集华明有载分接开关（OLTC）产品系列、技术资料下载与选型工具，并附带公开行情与公司动态。本站为非官方参考站，便于工程与采购侧查阅。
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/products" className="hm-btn hm-btn-primary">
              浏览产品
            </Link>
            <Link href="/downloads" className="hm-btn hm-btn-secondary">
              技术资料
            </Link>
            <a
              href="https://erict16.github.io/oltc-selector/"
              target="_blank"
              rel="noreferrer"
              className="hm-btn hm-btn-secondary"
            >
              选型器 ↗
            </a>
          </div>
          <p className="hm-hero-meta">
            {seriesCount} 个产品系列 · {allDocuments.length} 份资料 · 公开信息源
          </p>
        </div>
        <div className="hm-hero-visual">
          <img
            src={asset("/brand/home/home-product.png")}
            alt="华明分接开关产品"
            width={480}
            height={360}
          />
        </div>
      </section>

      <section className="hm-entry-grid" aria-label="主要入口">
        {entries.map((e) =>
          "external" in e && e.external ? (
            <a key={e.href} href={e.href} target="_blank" rel="noreferrer" className="hm-entry">
              <div className="hm-entry-title">{e.title}</div>
              <p className="hm-entry-desc">{e.desc}</p>
              <span className="hm-entry-cta">{e.cta} ↗</span>
            </a>
          ) : (
            <Link key={e.href} href={e.href} className="hm-entry">
              <div className="hm-entry-title">{e.title}</div>
              <p className="hm-entry-desc">{e.desc}</p>
              <span className="hm-entry-cta">{e.cta} →</span>
            </Link>
          ),
        )}
      </section>

      <section className="hm-stack">
        <div className="hm-section-label">
          <h2>市场行情</h2>
          <p>A 股实时报价，数据来自公开接口</p>
        </div>
        <StockPanel />
      </section>

      <section className="hm-stack">
        <div className="hm-section-label">
          <h2>公司动态</h2>
          <p>华明相关公告与媒体，按日期排列</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px]">
          <NewsFeed />
          <aside className="hm-stack lg:sticky lg:top-[calc(var(--header-h)+var(--s3))] lg:self-start">
            <div className="hm-rail">
              <div className="hm-rail-label">相关链接</div>
              <ul>
                <li>
                  <a
                    href="https://www.intl-huaming.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    华明国际站 ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://data.eastmoney.com/notices/stock/002270.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    交易所公告 ↗
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
                <li>
                  <Link href="/about">关于本站</Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
