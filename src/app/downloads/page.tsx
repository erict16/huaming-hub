import type { Metadata } from "next";
import { DownloadsPage } from "@/components/DownloadsPage";

export const metadata: Metadata = {
  title: "Documents",
  description:
    "Huaming OLTC leaflets, technical data sheets, and operating manuals (official PDF links).",
};

export default function Page() {
  return <DownloadsPage locale="en" />;
}
