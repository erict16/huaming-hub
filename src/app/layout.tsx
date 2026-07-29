import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { HtmlLang } from "@/components/HtmlLang";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { asset } from "@/lib/asset";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Huaming Hub · OLTC docs",
    template: "%s · Huaming Hub",
  },
  description:
    "Huaming OLTC / DETC series, technical PDFs, and type selector. Unofficial reference.",
  icons: {
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
        className={`${plexSans.variable} ${plexMono.variable} antialiased`}
      >
        <HtmlLang />
        <a className="hm-skip" href="#main">
          Skip to content
        </a>
        <div className="hm-root">
          <SiteHeader />
          <main id="main" className="hm-shell hm-main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
