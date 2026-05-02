import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/components'

export const metadata: Metadata = {
  metadataBase: new URL('https://modern-industrial-system.madebyever.com'),
  title: 'Modern Industrial — Component Library',
  description: 'High-Velocity Minimalist System for performance-critical applications',
  alternates: {
    canonical: 'https://madebyever.com/projects/system',
  },
}

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
