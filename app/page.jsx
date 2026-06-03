import Hero from '@/components/sections/Hero'
import ClientStrip from '@/components/sections/ClientStrip'
import Services from '@/components/sections/Services'
import Industries from '@/components/sections/Industries'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'
import BlogPreview from '@/components/sections/BlogPreview'
import ContactCTA from '@/components/sections/ContactCTA'
import { getPosts } from '@/lib/wordpress'

export const metadata = {
  title: '1Solutions – Web Development & Digital Marketing Agency | Build. Grow. Scale.',
  description: 'Award-winning web development and digital marketing agency based in New Delhi. 15+ years, 1200+ projects, clients in US, Canada & Australia.',
  alternates: { canonical: 'https://www.1solutions.biz' },
}

export default async function HomePage() {
  const posts = await getPosts({ perPage: 3 }).catch(() => [])

  return (
    <>
      <Hero />
      <ClientStrip />
      <Services />
      <Industries />
      <WhyUs />
      <Testimonials />
      <BlogPreview posts={posts} />
      <ContactCTA />
    </>
  )
}
