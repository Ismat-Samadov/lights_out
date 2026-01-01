import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lights Out - Turn Off All The Lights',
  description: 'An addictive puzzle game where you toggle lights to turn them all off. Click a light to toggle it and its neighbors. Can you solve it?',
  keywords: ['lights out', 'puzzle', 'game', 'brain teaser', 'logic puzzle'],
  authors: [{ name: 'Lights Out Game' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1f2937',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
