import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/components'

export const metadata: Metadata = {
  metadataBase: new URL('https://modern-industrial-storybook.madebyever.com'),
  title: 'Modern Industrial — Storybook',
  description: 'Component documentation and isolated testing for the Modern Industrial System',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: false,
    follow: true,
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Modern Industrial — Storybook',
    description: 'Component documentation and isolated testing for the Modern Industrial System',
    url: 'https://modern-industrial-storybook.madebyever.com',
    siteName: 'Made by Ever',
    images: [
      {
        url: '/og-storybook.png', 
        width: 1200,
        height: 630,
        alt: 'Modern Industrial System Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Modern Industrial — Component Library',
    description: 'High-Velocity Minimalist System for performance-critical applications',
    images: ['/og-storybook.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
