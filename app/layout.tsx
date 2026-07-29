import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Huaming Hub · OLTC docs',
    template: '%s · Huaming Hub',
  },
  description:
    'Unofficial Huaming OLTC / DETC document hub — search PDFs, browse series, open type selector.',
  icons: {
    icon: '/brand/logo/favicon-32.png',
    apple: '/brand/logo/apple-touch-icon.png',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
