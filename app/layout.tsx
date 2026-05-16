import type { Metadata } from 'next';
import { Providers } from './providers';
import { Toaster } from '@/src/components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://giampier-portfolio.vercel.app'),
  title: {
    default: 'Giampier Aliaga — Software Developer',
    template: '%s | Giampier Aliaga',
  },
  description:
    'Portafolio de Giampier Aliaga, desarrollador fullstack especializado en React, Next.js, TypeScript, Node.js y arquitecturas cloud.',
  keywords: ['Giampier Aliaga', 'desarrollador fullstack', 'React', 'Next.js', 'TypeScript', 'Node.js', 'portafolio'],
  authors: [{ name: 'Giampier Aliaga' }],
  creator: 'Giampier Aliaga',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: '/',
    siteName: 'Giampier Aliaga',
    title: 'Giampier Aliaga — Software Developer',
    description: 'Portafolio fullstack: React, Next.js, Node.js y cloud.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giampier Aliaga — Software Developer',
    description: 'Portafolio fullstack: React, Next.js, Node.js y cloud.',
  },
  robots: { index: true, follow: true },
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
      </body>
    </html>
  );
}
