import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { AuthHeader, Footer } from '@/components/layout'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DevTools - Developer Tools for Modern Workflows',
  description:
    'Premium software tools built by developers, for developers. Streamline your development process.',
}

type FrontendLayoutProps = {
  children: React.ReactNode
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white antialiased dark:bg-zinc-950`}
      >
        <div className="flex min-h-screen flex-col">
          <AuthHeader />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
