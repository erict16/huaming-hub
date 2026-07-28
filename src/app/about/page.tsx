import type { Metadata } from "next";
import { companyFacts } from "@/data/products";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "关于",
  description: "华明装备简况。",
};

export default function AboutPage() {
  return (
    <div className="hm-page">
      <header className="hm-page-head">
        <div>
          <h1>关于华明</h1>
          <p className="sub max-w-2xl">
            有载/无励磁分接开关。A 股华明装备 002270。总部上海同普路 977
            号，国际业务新加坡。本站个人用，不代表公司。
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
          <p className="sub mt-1">国际站公开图，仅展示。</p>
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
    </div>
  );
}
