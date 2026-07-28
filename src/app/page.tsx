import Image from "next/image";
import Link from "next/link";
import { NewsFeed } from "@/components/NewsFeed";
import { StockPanel } from "@/components/StockPanel";
import { allDocuments } from "@/lib/documents";

export default function HomePage() {
  const docCount = allDocuments.length;
  const models = new Set(allDocuments.map((d) => d.model)).size;

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#081325]">
        <div className="hm-grid absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium text-cyan-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
              Personal sales & engineering desk
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
              一屏看懂华明
              <span className="block bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-300 bg-clip-text text-transparent">
                行情 · 风声 · 技术资料
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              比官方英文站更适合日常工作的个人站：左侧实时股价，主区汇总国内资本市场与海外工程动态；
              另有按型号分类的 Leaflet / Technical Data / OI 下载中心。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/downloads"
                className="inline-flex items-center rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-300"
              >
                打开资料下载
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:border-cyan-400/30 hover:bg-white/10"
              >
                浏览产品系列
              </Link>
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {[
                { k: "资料 PDF", v: String(docCount) },
                { k: "型号覆盖", v: String(models) },
                { k: "股票代码", v: "002270" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3"
                >
                  <div className="text-lg font-semibold text-white">{s.v}</div>
                  <div className="text-[11px] text-slate-500">{s.k}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-cyan-500/20 via-transparent to-blue-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 shadow-2xl">
              <Image
                src="/brand/home/engineers.png"
                alt="Huaming engineers and factory"
                width={900}
                height={640}
                className="h-auto w-full object-cover opacity-95"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/70 to-transparent p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                  From intl-huaming.com
                </div>
                <div className="mt-1 text-sm font-medium text-white">
                  Global OLTC manufacturing & field support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main dashboard: stock left, news right */}
      <section className="grid gap-6 lg:grid-cols-[320px_1fr] xl:grid-cols-[340px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <StockPanel />
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Quick tools
            </div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link
                href="/downloads"
                className="rounded-xl px-3 py-2 text-slate-200 transition hover:bg-white/5 hover:text-cyan-200"
              >
                ↓ 下载技术规范书
              </Link>
              <a
                href="https://erict16.github.io/oltc-selector/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-3 py-2 text-slate-200 transition hover:bg-white/5 hover:text-cyan-200"
              >
                ↗ OLTC 选型助手
              </a>
              <a
                href="https://www.cninfo.com.cn/new/disclosure/stock?stockCode=002270&orgId=gssz000270"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-3 py-2 text-slate-200 transition hover:bg-white/5 hover:text-cyan-200"
              >
                ↗ 巨潮资讯公告
              </a>
            </div>
          </div>
        </div>

        <NewsFeed />
      </section>

      {/* Product teaser strip */}
      <section className="overflow-hidden rounded-3xl border border-white/10">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[220px]">
            <Image
              src="/brand/home/home-product.png"
              alt="Huaming product"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050b14] via-[#050b14]/40 to-transparent md:bg-gradient-to-r" />
          </div>
          <div className="flex flex-col justify-center bg-[#081325] p-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
              Product library
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              从 CV 到 CV2 / SHZV — 一站找规范
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              常规油浸、真空、干式、无励磁与电动机构 / 控制器资料已按系列整理。
              需要选型时，可跳到个人选型器或直接下载 Technical Data。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/downloads"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
              >
                资料中心
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white"
              >
                系列介绍
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
