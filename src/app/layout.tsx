import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stablecoin Dashboard | Real-Time Peg Monitor',
  description: 'Track stablecoin prices, market caps, and peg deviations in real-time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="grid-bg min-h-screen">
        {children}
      </body>
    </html>
  )
}

