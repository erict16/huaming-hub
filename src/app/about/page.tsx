import type { Metadata } from "next";
import Image from "next/image";
import { companyFacts } from "@/data/products";

export const metadata: Metadata = {
  title: "关于华明",
  description: "华明电力装备简介、认证与全球布局（个人站摘要）。",
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            About
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
            华明电力装备
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            Huaming Power Equipment 是全球分接开关领域的主要制造商之一，产品覆盖
            有载分接开关（OLTC）与无励磁分接开关（DETC/OCTC），服务公用事业、
            新能源并网与工业客户。上市公司简称
            <span className="text-cyan-200"> 华明装备 </span>
            ，证券代码
            <span className="font-mono text-cyan-200"> 002270 </span>
            （深交所）。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            总部位于上海普陀区同普路 977 号；国际业务总部设于新加坡，面向亚太与
            更广泛的出口市场。本站为个人工作台，便于日常查阅行情、新闻与技术资料。
          </p>
        </div>
        <div className="relative min-h-[260px] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/brand/home/energy.png"
            alt="Huaming energy"
            fill
            className="object-cover"
            sizes="500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {companyFacts.map((f) => (
          <div
            key={f.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
          >
            <div className="text-[11px] uppercase tracking-wider text-slate-500">
              {f.label}
            </div>
            <div className="mt-1 text-lg font-semibold text-white">{f.value}</div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-xl font-semibold text-white">认证与质量</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          以下标识来自华明国际站公开素材（个人站镜像展示）。
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["/brand/certs/iso9001.png", "ISO 9001"],
            ["/brand/certs/iso14001.png", "ISO 14001"],
            ["/brand/certs/ohsms.png", "OHSMS"],
            ["/brand/certs/cnas.png", "CNAS"],
          ].map(([src, label]) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white px-4 py-5"
            >
              <div className="relative h-20 w-full">
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
              <div className="mt-3 text-xs font-medium text-slate-700">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            t: "Why customers choose Huaming",
            d: "产品线完整、交付与售后网络覆盖主要海外市场，适合 EPC 与 OEM 长期合作。",
            img: "/brand/why/global-aftersales.png",
          },
          {
            t: "Range & lead time",
            d: "从配电到特高压 / 换流变特种应用，常规型号与真空平台可快速响应。",
            img: "/brand/why/productrange.png",
          },
          {
            t: "Commercial edge",
            d: "有竞争力的性价比与可预期的交期，是海外投标中的常见组合优势。",
            img: "/brand/why/pricing.png",
          },
        ].map((card) => (
          <article
            key={card.t}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#081325]"
          >
            <div className="relative h-36 bg-white">
              <Image
                src={card.img}
                alt={card.t}
                fill
                className="object-contain p-4"
                sizes="300px"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white">{card.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {card.d}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6 text-sm leading-relaxed text-amber-50/90">
        <strong className="text-amber-200">声明：</strong>
        本站由个人维护，用于销售 / 技术工作便利，不代表华明电力装备股份有限公司官方立场。
        商务与投资请以官网、交易所公告及授权渠道为准。
      </section>
    </div>
  );
}
