import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--rule)] bg-[var(--paper-2)]">
      <div className="hm-shell flex flex-col gap-3 py-5 text-xs leading-relaxed text-[var(--ink-3)] sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="max-w-md">
          <p className="m-0 font-medium text-[var(--ink-2)]">华明 Hub</p>
          <p className="mt-1 mb-0">
            非官方参考站。产品与 PDF 链至华明国际站；行情与公告来自公开数据源，仅供查阅，不构成投资建议。
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[var(--ink-2)]">
          <Link href="/products" className="hover:text-[var(--accent)]">
            产品
          </Link>
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
            href="https://www.intl-huaming.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent)]"
          >
            官网
          </a>
          <Link href="/about" className="hover:text-[var(--accent)]">
            关于
          </Link>
        </div>
      </div>
    </footer>
  );
}
