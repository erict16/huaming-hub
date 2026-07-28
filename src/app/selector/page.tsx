import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "选型",
  description: "OLTC 选型工具入口。",
};

export default function SelectorPage() {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-8 text-center">
      <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">
        OLTC 选型
      </h1>
      <p className="text-sm text-[var(--ink-3)]">
        填电流、电压、调压方式等，给出目录里最低适配型号建议。仅供参考，商务以确认函为准。
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <a
          href="https://erict16.github.io/oltc-selector/"
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
        >
          打开选型器
        </a>
        <Link
          href="/downloads"
          className="rounded-md border border-[var(--rule)] px-4 py-2 text-sm text-[var(--ink-2)]"
        >
          技术资料
        </Link>
      </div>
    </div>
  );
}
