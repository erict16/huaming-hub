import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "选型",
  description: "OLTC 选型工具入口。",
};

export default function SelectorPage() {
  return (
    <div className="hm-page mx-auto max-w-md py-4 text-center">
      <header className="hm-page-head justify-center">
        <div>
          <h1>OLTC 选型</h1>
          <p className="sub">
            电流、电压、调压方式 → 目录最低适配型号。仅供参考。
          </p>
        </div>
      </header>
      <div className="flex flex-wrap justify-center gap-2">
        <a
          href="https://erict16.github.io/oltc-selector/"
          target="_blank"
          rel="noreferrer"
          className="hm-btn hm-btn-primary"
        >
          打开选型器
        </a>
        <Link href="/downloads" className="hm-btn hm-btn-secondary">
          技术资料
        </Link>
      </div>
    </div>
  );
}
