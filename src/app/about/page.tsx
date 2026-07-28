import type { Metadata } from "next";
import Link from "next/link";
import { companyFacts } from "@/data/products";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "关于",
  description: "华明装备公司简况与本站说明。",
};

export default function AboutPage() {
  return (
    <div className="hm-page">
      <header className="hm-page-head">
        <div>
          <h1>关于华明</h1>
          <p className="sub max-w-2xl">
            上海华明电力设备制造有限公司（A 股：华明装备 002270）专注变压器有载与无励磁分接开关。总部上海同普路 977 号，国际业务落地新加坡。
          </p>
        </div>
      </header>

      <div className="grid gap-2 sm:grid-cols-3">
        {companyFacts.map((f) => (
          <div key={f.label} className="hm-card px-3 py-2.5">
            <div className="text-[11px] leading-none text-[var(--ink-3)]">
              {f.label}
            </div>
            <div className="mt-1.5 font-medium leading-snug text-[var(--ink)]">
              {f.value}
            </div>
          </div>
        ))}
      </div>

      <section className="hm-stack-sm">
        <div>
          <h2 className="m-0 text-sm font-semibold text-[var(--ink)]">认证</h2>
          <p className="sub mt-1">来自国际站公开展示素材</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            [asset("/brand/certs/iso9001.png"), "ISO 9001"],
            [asset("/brand/certs/iso14001.png"), "ISO 14001"],
            [asset("/brand/certs/ohsms.png"), "OHSMS"],
            [asset("/brand/certs/cnas.png"), "CNAS"],
          ].map(([src, label]) => (
            <div
              key={label}
              className="hm-card flex flex-col items-center bg-white px-2 py-3"
            >
              <img
                src={src}
                alt={label}
                className="h-14 w-full object-contain"
              />
              <span className="mt-1.5 text-[11px] text-[var(--ink-3)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="hm-card hm-card-pad">
        <h2 className="m-0 text-sm font-semibold text-[var(--ink)]">关于本站</h2>
        <p className="mt-2 mb-0 text-sm leading-relaxed text-[var(--ink-2)]">
          华明 Hub 是独立整理的参考站点，方便查阅产品系列、技术 PDF 与选型工具，并汇总公开行情与公告。内容不代表华明官方立场；采购与工程决策请以官网与正式文件为准。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href="https://www.intl-huaming.com/"
            target="_blank"
            rel="noreferrer"
            className="hm-btn hm-btn-primary"
          >
            访问官网
          </a>
          <Link href="/products" className="hm-btn hm-btn-secondary">
            产品系列
          </Link>
        </div>
      </section>
    </div>
  );
}
