import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Space_Mono } from 'next/font/google'
import IntroLoader from '@/components/intro-loader'
import SmoothScroll from '@/components/smooth-scroll'
import { INTRO_HEAD_SCRIPT } from '@/lib/intro'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'opsz'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
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
  themeColor: '#FFF1E7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceMono.variable} bg-background`}
      // The intro head script may add a class to <html> before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_HEAD_SCRIPT }} />
      </head>
      <body className="antialiased">
        <SmoothScroll />
        <IntroLoader />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
