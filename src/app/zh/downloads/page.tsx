import type { Metadata } from "next";
import { DownloadsPage } from "@/components/DownloadsPage";

export const metadata: Metadata = {
  title: "技术资料",
  description: "华明 OLTC 规范书、Leaflet、操作说明下载。",
};

export default function Page() {
  return <DownloadsPage locale="zh" />;
}
