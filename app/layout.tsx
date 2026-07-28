import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Agrohome Nariyal Store — Pure Coconut Water, Delivered Fresh',
  description:
    'Fresh, naturally sweet coconut water packed with electrolytes. Farm-to-door delivery from Agrohome Nariyal Store. 100% Natural, No Added Sugar.',
  generator: 'v0.app',
  keywords: ['coconut water', 'tender coconut', 'nariyal pani', 'fresh coconut', 'natural drinks', 'healthy beverages'],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2D5A1B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable} bg-background`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
