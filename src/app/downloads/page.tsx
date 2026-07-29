import type { Metadata } from "next";
import { DownloadsPage } from "@/components/DownloadsPage";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Huaming OLTC leaflets, data sheets, and manuals (official PDF links).",
};

export default function Page() {
  return <DownloadsPage locale="en" />;
}
