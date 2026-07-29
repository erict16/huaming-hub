import type { Metadata } from "next";
import { ProductsPage } from "@/components/ProductsPage";

export const metadata: Metadata = {
  title: "Products",
  description: "Huaming OLTC / DETC series by family.",
};

export default function Page() {
  return <ProductsPage locale="en" />;
}
