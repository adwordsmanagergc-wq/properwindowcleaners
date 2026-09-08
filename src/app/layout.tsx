import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import StickyCta from '@/components/StickyCta';
import WindowWipeIntro from '@/components/WindowWipeIntro';
import { localBusinessSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Proper Window Cleaners | Bolton & North West Window Cleaning',
    template: '%s | Proper Window Cleaners',
  },
  description:
    'Family-run window cleaners covering Bolton and the North West. Instant online price, book weekly, fortnightly or monthly. Frames and sills included. Call 07405 538 996.',
  applicationName: site.name,
  authors: [{ name: site.owner }],
  keywords: [
    'window cleaners Bolton',
    'window cleaning North West',
    'window cleaner near me',
    'water fed pole window cleaning',
    'gutter clearing Bolton',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: site.name,
    url: site.url,
    title: 'Proper Window Cleaners | Bolton & North West',
    description:
      'Get an instant price for your windows and book a weekly, fortnightly or monthly clean. Family-run, Bolton based, 20 years on the glass.',
    images: [{ url: '/hero.jpg', width: 1264, height: 848, alt: `${site.owner} of ${site.name}` }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [{ url: '/icon-32.png', sizes: '32x32' }, { url: '/icon-192.png', sizes: '192x192' }],
    apple: '/icon-180.png',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#1d4e8f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col">
        <JsonLd data={localBusinessSchema()} />
        <WindowWipeIntro />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 pb-20 sm:pb-0">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
