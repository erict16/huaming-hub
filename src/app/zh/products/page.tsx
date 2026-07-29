import type { Metadata } from "next";
import { ProductsPage } from "@/components/ProductsPage";

export const metadata: Metadata = {
  title: "产品系列",
  description: "华明分接开关系列一览。",
};

export default function Page() {
  return <ProductsPage locale="zh" />;
}
