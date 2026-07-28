import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "选型助手",
  description: "跳转到 OLTC 选型工具与资料下载。",
};

export default function SelectorPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-8 text-center">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
        Selector
      </div>
      <h1 className="text-3xl font-semibold text-white">OLTC 选型助手</h1>
      <p className="text-sm leading-relaxed text-slate-400">
        个人维护的型式代号辅助工具（indicative only）。填入电流、电压、调压方式等参数后，
        给出目录中最低适配型号建议；最终选型请以工程确认与商务报价为准。
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <a
          href="https://erict16.github.io/oltc-selector/"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-cyan-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20"
        >
          打开选型器
        </a>
        <Link
          href="/downloads"
          className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-white"
        >
          下载规范书
        </Link>
      </div>
    </div>
  );
}
