'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Terminal, Github, LogOut } from 'lucide-react'

type HeaderProps = {
  user?: {
    email?: string | null
    name?: string | null
    image?: string | null
  } | null
}

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-x-12">
          <Link href="/" className="flex items-center gap-2">
            <Terminal className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              DevTools
            </span>
          </Link>
          <div className="hidden lg:flex lg:gap-x-8">
            <Link
              href="/products"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Products
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Docs
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-x-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <Github className="h-5 w-5" />
          </Link>
          {user ? (
            <>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {user.name || user.email}
              </span>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/auth/login"
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-500"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-zinc-600 dark:text-zinc-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-6 pb-4">
            <Link
              href="/products"
              className="block py-2 text-base font-medium text-zinc-600 dark:text-zinc-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/pricing"
              className="block py-2 text-base font-medium text-zinc-600 dark:text-zinc-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="block py-2 text-base font-medium text-zinc-600 dark:text-zinc-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <div className="flex items-center gap-4 pt-4">
              {user ? (
                <>
                  <span className="text-base text-zinc-600 dark:text-zinc-400">
                    {user.name || user.email}
                  </span>
                  <form action="/api/auth/signout" method="POST">
                    <button
                      type="submit"
                      className="flex items-center gap-2 text-base font-medium text-zinc-600 dark:text-zinc-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-base font-medium text-zinc-600 dark:text-zinc-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/login"
                    className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
