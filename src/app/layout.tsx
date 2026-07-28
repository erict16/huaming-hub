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
    default: "Huaming Hub · OLTC documents for buyers",
    template: "%s · Huaming Hub",
  },
  description:
    "Huaming on-load tap changer product series, technical PDF downloads and OLTC selector. Unofficial reference site for procurement and engineering.",
  icons: {
    // Square HM monogram — not the wide wordmark (illegible in tabs)
    icon: [
      {
        url: asset("/brand/logo/favicon-32.png"),
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: asset("/brand/logo/favicon-16.png"),
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: asset("/favicon.ico"),
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: asset("/brand/logo/apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${space.variable} ${inter.variable} ${mono.variable} antialiased`}
      >
        <div className="hm-root">
          <SiteHeader />
          <main className="hm-shell hm-main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
