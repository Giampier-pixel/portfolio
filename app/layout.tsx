import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';
import { Toaster } from '@/src/components/ui/sonner';
import './globals.css';

const SITE_URL = 'https://portfolio-giampiers-projects.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Giampier Aliaga — Software Developer',
    template: '%s | Giampier Aliaga',
  },
  description:
    'Portafolio de Giampier Aliaga, desarrollador fullstack especializado en React, Next.js, TypeScript, Node.js y arquitecturas cloud con integración de IA.',
  keywords: [
    'Giampier Aliaga',
    'desarrollador fullstack',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Vercel AI SDK',
    'portafolio',
    'software developer Perú',
  ],
  authors: [{ name: 'Giampier Aliaga', url: SITE_URL }],
  creator: 'Giampier Aliaga',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: '/',
    siteName: 'Giampier Aliaga',
    title: 'Giampier Aliaga — Software Developer',
    description:
      'Portafolio fullstack: React, Next.js, Node.js, cloud e integración con IA.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giampier Aliaga — Software Developer',
    description:
      'Portafolio fullstack: React, Next.js, Node.js, cloud e integración con IA.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Giampier Aliaga Esquivel',
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: 'Software Developer',
  description:
    'Desarrollador fullstack junior con foco en React, Next.js, TypeScript, Node.js y arquitecturas cloud con integración de IA.',
  email: 'mailto:giampieraliagaesquivel@gmail.com',
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'PostgreSQL',
    'AWS',
    'Vercel',
    'Tailwind CSS',
    'Vercel AI SDK',
  ],
  knowsLanguage: ['Spanish', 'English'],
  sameAs: [
    'https://github.com/Giampier-pixel',
    'https://www.linkedin.com/in/giampier-aliaga-esquivel',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-navy font-sans text-pearl selection:bg-rosegold/30 selection:text-pearl antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-rosegold text-pearl px-4 py-2 rounded-lg"
          >
            Saltar al contenido principal
          </a>
          {children}
          <Toaster />
        </Providers>
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
