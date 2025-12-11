import { Hero, Features, CTA } from '@/components/landing'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <CTA />
    </>
  )
}
