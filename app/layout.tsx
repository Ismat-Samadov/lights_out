import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lights Out - Puzzle Game',
  description: 'Turn off all the lights to win!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
