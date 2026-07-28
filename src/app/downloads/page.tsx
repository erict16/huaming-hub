import type { Metadata } from "next";
import { DownloadExplorer } from "@/components/DownloadExplorer";
import { allDocuments, categories, kinds } from "@/lib/documents";

export const metadata: Metadata = {
  title: "技术资料下载",
  description:
    "华明 OLTC / DETC 技术规范书、Leaflet、操作说明书快捷下载入口。",
};

export default function DownloadsPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
          Document center
        </div>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
          OLTC 技术资料下载
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          从华明国际站公开页面汇总的 Leaflet、Technical Data 与 Operating
          Instruction。点击卡片在新标签打开官方 PDF（不经本站二次托管）。
          共 <span className="text-cyan-200">{allDocuments.length}</span>{" "}
          份可检索资料。
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            t: "Technical Data",
            d: "额定参数、电流电压范围、接线与机械数据",
          },
          {
            t: "Operating Instruction",
            d: "安装、操作、维护与安全注意事项",
          },
          {
            t: "Leaflet",
            d: "系列概览，适合发给客户做初步介绍",
          },
        ].map((x) => (
          <div
            key={x.t}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="text-sm font-semibold text-white">{x.t}</div>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{x.d}</p>
          </div>
        ))}
      </div>

      <DownloadExplorer
        documents={allDocuments}
        categories={categories}
        kinds={kinds}
      />
    </div>
  );
}
