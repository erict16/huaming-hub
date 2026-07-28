import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { asset } from "@/lib/asset";
import "./globals.css";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "华明 Hub · 分接开关资料与产品参考",
    template: "%s · 华明 Hub",
  },
  description:
    "华明装备（002270）有载分接开关产品系列、技术资料下载、选型工具，以及公开行情与公司动态。非官方参考站。",
  icons: {
    icon: asset("/brand/logo/hm-logo-01.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${space.variable} ${inter.variable} ${mono.variable} antialiased`}
      >
        <SiteHeader />
        <main className="hm-shell hm-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
