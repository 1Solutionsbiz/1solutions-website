'use client'
import { useState } from 'react'
import Link from 'next/link'

const services = [
  {
    id: 'web',
    label: 'Digital Transformation',
    headline: 'Digital Transformation',
    desc: 'Digitize and automate complex workflows with our responsive software solutions. Modernity, experience, scalability, security, performance — all check.',
    tags: ['React','Next.js','Node.js','.NET','Vue.js','Angular'],
    cta: 'Elevate Digital Transformation Journey →',
    href: '/digital-transformation',
    image: 'https://picsum.photos/500/400?random=1',
  },
  {
    id: 'ecommerce',
    label: 'eCommerce Development',
    headline: 'eCommerce Development',
    desc: 'Having developed eCommerce for hundreds of businesses including Fortune 500, 1Solutions offers strong capability in the domain.',
    tags: ['Shopify','WooCommerce','Magento','Headless','PWA','BigCommerce'],
    cta: 'Boost Your Online Store →',
    href: '/ecommerce-development',
    image: 'https://picsum.photos/500/400?random=2',
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    headline: 'Cloud & DevOps',
    desc: 'Migrate to the cloud, modernize infrastructure, and automate deployments. We help you scale reliably while cutting operational costs.',
    tags: ['AWS','Azure','GCP','Docker','Kubernetes','CI/CD'],
    cta: 'Modernize Your Infrastructure →',
    href: '/cloud-devops',
    image: 'https://picsum.photos/500/400?random=3',
  },
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    headline: 'Artificial Intelligence',
    desc: 'Automate decisions, maximize user experiences, and access deeper business insights with custom-trained AI models.',
    tags: ['Machine Learning','LLMs','ChatGPT','Python','TensorFlow','NLP'],
    cta: 'Explore AI Solutions →',
    href: '/artificial-intelligence',
    image: 'https://picsum.photos/500/400?random=4',
  },
  {
    id: 'marketing',
    label: 'Digital Marketing',
    headline: 'Digital Marketing',
    desc: 'Data-driven SEO, PPC, and content strategies that deliver measurable growth. We maximise your ROI across every digital channel.',
    tags: ['SEO','Google Ads','Meta Ads','Analytics','Content','Email'],
    cta: 'Grow Your Digital Presence →',
    href: '/digital-marketing',
    image: 'https://picsum.photos/500/400?random=5',
  },
  {
    id: 'hiring',
    label: 'Hire On Demand',
    headline: 'Hire On Demand',
    desc: 'Hire vetted developers, designers, and marketers who work as a seamless extension of your team. Full-time or part-time, no lock-in.',
    tags: ['Developers','Designers','SEO Experts','QA Engineers','PMs'],
    cta: 'Build Your Dream Team →',
    href: '/hire-dedicated-developers',
    image: 'https://picsum.photos/500/400?random=6',
  },
]

export default function Services() {
  const [active, setActive] = useState('web')
  const current = services.find(s => s.id === active)

  return (
    <section id="services" style={{ padding: '80px 40px', background: '#fff' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        {/* Header */}
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: '#0F3460', marginBottom: '16px', textAlign: 'center' }}>
          Our Core Technology Services
        </h2>
        <p style={{ fontSize: '16px', color: '#6b7280', textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px', lineHeight: 1.7 }}>
          From strengthening your digital presence to automating your workflow we offer technology services for end-to-end digital transformation.
        </p>

        {/* Grid: Tabs | Image + Detail */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '0', border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>

          {/* Tabs */}
          <div style={{ borderRight: '1px solid #e5e7eb', background: '#f9fafb' }}>
            {services.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '16px 20px', border: 'none', cursor: 'pointer', textAlign: 'left',
                  fontSize: '14px', fontWeight: active === s.id ? 700 : 500,
                  background: active === s.id ? '#0F3460' : 'transparent',
                  color: active === s.id ? '#fff' : '#374151',
                  borderBottom: '1px solid #e5e7eb',
                  transition: 'all 0.15s',
                }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Right: Image + Detail */}
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
            {/* Image */}
            <div style={{ height: '220px', overflow: 'hidden' }}>
              <img src={current.image} alt={current.headline}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Detail */}
            <div style={{ padding: '32px 40px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F3460', marginBottom: '12px' }}>
                {current.headline}
              </h3>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '20px' }}>
                {current.desc}
              </p>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', marginBottom: '10px' }}>
                Key Technologies
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {current.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                    background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb',
                  }}>{tag}</span>
                ))}
              </div>
              <Link href={current.href} style={{
                display: 'inline-block', padding: '12px 24px', borderRadius: '8px',
                background: '#0F3460', color: '#fff', fontWeight: 600, fontSize: '14px',
                textDecoration: 'none', transition: 'background 0.2s',
              }}>
                {current.cta}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
