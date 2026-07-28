import type { Metadata } from "next";
import { DownloadExplorer } from "@/components/DownloadExplorer";
import { allDocuments, categories, kinds } from "@/lib/documents";

export const metadata: Metadata = {
  title: "技术资料",
  description: "华明 OLTC 规范书、Leaflet、操作说明下载。",
};

export default function DownloadsPage() {
  return (
    <div className="hm-page">
      <header className="hm-page-head">
        <div>
          <h1>技术资料</h1>
          <p className="sub">
            {allDocuments.length} 份规范书、Leaflet 与操作说明 · 可按型号筛选 ·
            文件链至国际站
          </p>
        </div>
      </header>
      <DownloadExplorer
        documents={allDocuments}
        categories={categories}
        kinds={kinds}
      />
    </div>
  );
}
