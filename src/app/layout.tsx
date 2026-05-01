import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/components'

export const metadata: Metadata = {
  title: 'Modern Industrial — Component Library',
  description: 'High-Velocity Minimalist System for performance-critical applications',
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
