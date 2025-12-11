import Link from 'next/link'
import { ArrowRight, Terminal, Github } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-black py-24 sm:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full bg-emerald-500/10 p-4">
              <Terminal className="h-12 w-12 text-emerald-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Developer Tools for{' '}
            <span className="text-emerald-500">Modern Workflows</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Premium software tools built by developers, for developers.
            Streamline your development process with our carefully crafted
            solutions.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6">
            <Link
              href="/products"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500 sm:w-auto"
            >
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-zinc-600 hover:bg-zinc-800 sm:w-auto"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
