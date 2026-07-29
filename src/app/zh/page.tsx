import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "华明 Hub · 分接开关资料",
  description:
    "华明有载分接开关产品系列、技术资料下载与选型工具。非官方参考站，面向采购与工程。",
};

export default function Page() {
  return <HomePage locale="zh" />;
}
