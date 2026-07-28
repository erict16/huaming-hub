import type { Metadata } from "next";
import { DownloadExplorer } from "@/components/DownloadExplorer";
import { allDocuments, categories, kinds } from "@/lib/documents";

export const metadata: Metadata = {
  title: "技术资料",
  description: "华明 OLTC 规范书、Leaflet、操作说明下载。",
};

export default function DownloadsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">
          技术资料
        </h1>
        <p className="mt-1 text-sm text-[var(--ink-3)]">
          {allDocuments.length} 份公开 PDF，按型号搜。点行直达国际站。
        </p>
      </div>
      <DownloadExplorer
        documents={allDocuments}
        categories={categories}
        kinds={kinds}
      />
    </div>
  );
}
