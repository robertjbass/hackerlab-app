import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="bg-emerald-600 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to supercharge your workflow?
          </h2>
          <p className="mt-4 text-lg text-emerald-100">
            Get started today and join thousands of developers using our tools.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-emerald-600 shadow-sm transition-colors hover:bg-emerald-50 sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 sm:w-auto"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
