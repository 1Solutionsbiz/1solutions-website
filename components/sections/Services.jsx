'use client'
import { useState } from 'react'
import Link from 'next/link'

const services = [
  {
    id: 'web',
    icon: '🌐',
    label: 'Web Development',
    headline: 'High-Performance Websites That Convert',
    description: 'We build fast, scalable, and SEO-ready websites using modern frameworks. From corporate sites to complex web applications — engineered for results.',
    tags: ['React', 'Next.js', 'Node.js', '.NET', 'Vue', 'Angular'],
    href: '/web-development',
  },
  {
    id: 'mobile',
    icon: '📱',
    label: 'Mobile App Development',
    headline: 'Native & Cross-Platform Mobile Apps',
    description: 'iOS and Android apps built for performance and user experience. From MVPs to enterprise-grade applications with seamless integrations.',
    tags: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'iOS', 'Android'],
    href: '/mobile-app-development',
  },
  {
    id: 'seo',
    icon: '📈',
    label: 'SEO & Digital Marketing',
    headline: 'Rank Higher. Drive More Revenue.',
    description: 'Data-driven SEO strategies that deliver measurable growth. We combine technical SEO, content marketing, and paid campaigns to maximise your ROI.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics', 'Content'],
    href: '/seo-services',
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    label: 'eCommerce Development',
    headline: 'eCommerce That Drives Revenue',
    description: 'Custom Shopify, WooCommerce and headless eCommerce solutions built to convert. From product pages to checkout — every element optimised for sales.',
    tags: ['Shopify', 'WooCommerce', 'Magento', 'Headless', 'PWA'],
    href: '/ecommerce-development',
  },
  {
    id: 'hire',
    icon: '👥',
    label: 'Hire Dedicated Resources',
    headline: 'Extend Your Team, On Demand',
    description: 'Hire vetted developers, designers, and marketers who work as a seamless extension of your team. Full-time or part-time, no long-term lock-in.',
    tags: ['Developers', 'Designers', 'SEO Experts', 'Project Managers'],
    href: '/hire-dedicated-developers',
  },
]

export default function Services() {
  const [active, setActive] = useState('web')
  const current = services.find(s => s.id === active)

  return (
    <section id="services" style={{ background:'#f6f8ff', padding:'96px 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'64px' }}>
          <p style={{ fontSize:'12px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#114171', marginBottom:'12px' }}>
            What We Build
          </p>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, color:'#050D1F', letterSpacing:'-0.03em', marginBottom:'16px' }}>
            Full-Service Digital Agency
          </h2>
          <p style={{ fontSize:'17px', color:'#4b5563', maxWidth:'560px', margin:'0 auto' }}>
            From strategy to execution — we cover every aspect of your digital presence.
          </p>
        </div>

        {/* Tabs + Panel */}
        <div style={{ display:'grid', gridTemplateColumns:'260px 1fr', gap:'0', background:'#fff', borderRadius:'16px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)', overflow:'hidden' }}>

          {/* Tab list */}
          <div style={{ borderRight:'1px solid #e5e7eb', padding:'8px' }}>
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                style={{
                  display:'flex', alignItems:'center', gap:'12px', width:'100%',
                  padding:'14px 16px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                  border:'none', transition:'all 0.15s',
                  background: active === s.id ? '#114171' : 'transparent',
                  color: active === s.id ? '#fff' : '#374151',
                  fontWeight: active === s.id ? 700 : 500,
                  fontSize:'14px',
                }}
              >
                <span style={{ fontSize:'18px' }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div style={{ padding:'48px' }}>
            <h3 style={{ fontSize:'26px', fontWeight:800, color:'#050D1F', marginBottom:'16px', letterSpacing:'-0.02em' }}>
              {current.headline}
            </h3>
            <p style={{ fontSize:'16px', lineHeight:1.7, color:'#4b5563', marginBottom:'28px' }}>
              {current.description}
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'36px' }}>
              {current.tags.map(tag => (
                <span key={tag} style={{
                  padding:'4px 12px', borderRadius:'20px', fontSize:'13px', fontWeight:600,
                  background:'#f3f4f6', color:'#374151',
                }}>{tag}</span>
              ))}
            </div>
            <Link href={current.href} style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'12px 24px', borderRadius:'8px', fontWeight:700, fontSize:'14px',
              background:'#FE9700', color:'#050D1F', transition:'opacity 0.2s',
            }}>
              Learn More →
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
