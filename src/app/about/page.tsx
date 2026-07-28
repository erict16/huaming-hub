import type { Metadata } from "next";
import { companyFacts } from "@/data/products";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "关于",
  description: "华明装备简况。",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">
          关于华明
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-2)]">
          华明电力装备做有载和无励磁分接开关。A 股简称华明装备，代码
          002270。总部上海同普路 977 号，国际业务在新加坡。本站是个人工作页，方便查盘和下资料，不代表公司立场。
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {companyFacts.map((f) => (
          <div key={f.label} className="hm-card px-3 py-3">
            <div className="text-[11px] text-[var(--ink-3)]">{f.label}</div>
            <div className="mt-0.5 font-medium text-[var(--ink)]">{f.value}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-[var(--ink)]">认证标识</h2>
        <p className="mt-1 text-xs text-[var(--ink-3)]">
          图从国际站公开页抓的，仅展示用。
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            [asset("/brand/certs/iso9001.png"), "ISO 9001"],
            [asset("/brand/certs/iso14001.png"), "ISO 14001"],
            [asset("/brand/certs/ohsms.png"), "OHSMS"],
            [asset("/brand/certs/cnas.png"), "CNAS"],
          ].map(([src, label]) => (
            <div
              key={label}
              className="hm-card flex flex-col items-center bg-white px-3 py-4"
            >
              <img
                src={src}
                alt={label}
                className="h-16 w-full object-contain"
              />
              <span className="mt-2 text-xs text-[var(--ink-3)]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
