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

const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.1solutions.biz/#organization',
    name: '1Solutions',
    url: 'https://www.1solutions.biz',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.1solutions.biz/images/1solutions-logo.png',
      width: 200,
      height: 60,
    },
    foundingDate: '2008',
    description: 'Award-winning web development and digital marketing agency based in New Delhi. 15+ years, 1200+ projects delivered for clients in US, Canada, Australia and UK.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'New Delhi',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@1solutions.biz',
      availableLanguage: 'English',
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    sameAs: [
      'https://www.linkedin.com/company/1solutions/',
      'https://www.facebook.com/1solutionsbiz',
      'https://x.com/1solutionsbiz',
      'https://www.instagram.com/1solutionsbiz/',
    ],
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 25 },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.1solutions.biz/#website',
    url: 'https://www.1solutions.biz',
    name: '1Solutions',
    publisher: { '@id': 'https://www.1solutions.biz/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://www.1solutions.biz/search?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.1solutions.biz/#webpage',
    url: 'https://www.1solutions.biz',
    name: '1Solutions – Web Development & Digital Marketing Agency',
    isPartOf: { '@id': 'https://www.1solutions.biz/#website' },
    about: { '@id': 'https://www.1solutions.biz/#organization' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }],
    },
  },
]

export default async function HomePage() {
  const posts = await getPosts({ perPage: 7 }).catch(() => [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
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
