import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--rule)] bg-[var(--paper-2)]">
      <div className="hm-shell flex flex-col gap-2 py-4 text-xs leading-relaxed text-[var(--ink-3)] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="m-0">
          个人站，非官方。行情/公告公开源；PDF 链国际站。
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[var(--ink-2)]">
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
