import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { productSeries } from "@/data/products";

export const metadata: Metadata = {
  title: "产品系列",
  description: "华明有载 / 无励磁分接开关与附件系列速览。",
};

export default function ProductsPage() {
  return (
    <div className="space-y-10">
      <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            Product series
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
            分接开关产品地图
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            常规油浸、真空、干式、无励磁与驱动 / 控制附件。每个系列可跳转国际站产品页，
            技术文件请到资料下载中心按型号筛选。
          </p>
        </div>
        <div className="relative h-40 overflow-hidden rounded-3xl border border-white/10 sm:h-48">
          <Image
            src="/brand/home/solar-ningxia.png"
            alt="Huaming project"
            fill
            className="object-cover"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] to-transparent" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productSeries.map((p) => (
          <article
            key={p.code}
            className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-5"
          >
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {p.category}
            </div>
            <h2 className="mt-1 text-xl font-semibold text-white">{p.code}</h2>
            <div className="text-sm text-cyan-200/90">{p.name}</div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
              {p.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 ring-1 ring-white/10"
                >
                  {h}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-cyan-400/15 px-3 py-1.5 text-xs font-medium text-cyan-200 ring-1 ring-cyan-400/25 hover:bg-cyan-400/25"
              >
                国际站产品页
              </a>
              <Link
                href={`/downloads?q=${encodeURIComponent(p.code.split("/")[0].trim())}`}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:border-white/25"
              >
                找资料
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
