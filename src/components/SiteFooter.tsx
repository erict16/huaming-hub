import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[var(--rule)] bg-[var(--paper-2)]">
      <div className="hm-shell flex flex-col gap-3 py-6 text-sm text-[var(--ink-3)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          个人站点，非华明官方。行情与公告来自公开源；PDF 链到国际站公开资料。
        </p>
        <div className="flex flex-wrap gap-4 text-[var(--ink-2)]">
          <Link href="/downloads" className="hover:text-[var(--accent)]">
            资料
          </Link>
          <a
            href="https://erict16.github.io/oltc-selector/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent)]"
          >
            选型器
          </a>
          <a
            href="https://quote.eastmoney.com/sz002270.html"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent)]"
          >
            东方财富
          </a>
        </div>
      </div>
    </footer>
  );
}
