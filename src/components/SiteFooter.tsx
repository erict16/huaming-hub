import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#040b16]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold text-white">Huaming Hub</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            个人项目：聚合华明装备（002270）行情、国内外动态，并集中入口下载 OLTC
            技术规范书。非华明官方网站。
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Quick links
          </div>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
            <Link href="/downloads" className="hover:text-cyan-300">
              技术资料下载
            </Link>
            <Link href="/products" className="hover:text-cyan-300">
              产品系列
            </Link>
            <a
              href="https://quote.eastmoney.com/sz002270.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300"
            >
              东方财富行情
            </a>
            <a
              href="https://www.intl-huaming.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300"
            >
              intl-huaming.com
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Disclaimer
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            行情与新闻来自公开第三方接口；PDF
            链向华明国际站公开资料。投资决策与商务选型请以官方披露与工程确认为准。
          </p>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Huaming Hub · Personal project
      </div>
    </footer>
  );
}
