'use client'
import { useState } from 'react'
import Link from 'next/link'

const services = [
  {
    id: 'web',
    label: 'Digital Transformation',
    headline: 'Digital Transformation',
    desc: 'Digitize and automate complex workflows with our responsive software solutions. Modernity, experience, scalability, security, performance — all check.',
    tags: ['React', 'Next.js', 'Node.js', '.NET', 'Vue.js', 'Angular'],
    cta: 'Elevate Digital Transformation Journey →',
    href: '/digital-transformation',
    image: '/images/service-digital-transformation.png',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22, flexShrink: 0 }}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="2" y1="17" x2="22" y2="17" />
        <rect x="9" y="20" width="6" height="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'ecommerce',
    label: 'eCommerce Development',
    headline: 'eCommerce Development',
    desc: "Having developed eCommerce for hundreds of businesses including Fortune 500, 1Solutions offers strong capability in the domain.",
    tags: ['Shopify', 'WooCommerce', 'Magento', 'Headless', 'PWA', 'BigCommerce'],
    cta: 'Boost Your Online Store →',
    href: '/ecommerce-development',
    image: '/images/service-ecommerce-development.png',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22, flexShrink: 0 }}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    headline: 'Cloud & DevOps',
    desc: 'Migrate to the cloud, modernize infrastructure, and automate deployments. We help you scale reliably while cutting operational costs.',
    tags: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'],
    cta: 'Modernize Your Infrastructure →',
    href: '/cloud-devops',
    image: '/images/service-cloud-devops.png',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22, flexShrink: 0 }}>
        <path d="M20 10.5c0-1.7-1.4-3-3-3-.4-2.2-2.3-3.8-4.5-3.8-2.5 0-4.6 2-4.6 4.5 0 .3 0 .5.1.8C6.3 9.5 5.1 11 5.1 12.8c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4z" />
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    headline: 'Artificial Intelligence',
    desc: 'Automate decisions, maximize user experiences, and access deeper business insights with custom-trained AI models.',
    tags: ['Machine Learning', 'LLMs', 'ChatGPT', 'Python', 'TensorFlow', 'NLP'],
    cta: 'Explore AI Solutions →',
    href: '/artificial-intelligence',
    image: '/images/service-artificial-intelligence.png',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22, flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <path d="M8 14c1 2 2.5 3 4 3s3-1 4-3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'marketing',
    label: 'Digital Marketing',
    headline: 'Digital Marketing',
    desc: 'Data-driven SEO, PPC, and content strategies that deliver measurable growth. We maximise your ROI across every digital channel.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics', 'Content', 'Email'],
    cta: 'Grow Your Digital Presence →',
    href: '/digital-marketing',
    image: '/images/service-digital-marketing.png',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22, flexShrink: 0 }}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'hiring',
    label: 'Hire On Demand',
    headline: 'Hire On Demand',
    desc: 'Hire vetted developers, designers, and marketers who work as a seamless extension of your team. Full-time or part-time, no lock-in.',
    tags: ['Developers', 'Designers', 'SEO Experts', 'QA Engineers', 'PMs'],
    cta: 'Build Your Dream Team →',
    href: '/hire-dedicated-resources',
    image: '/images/service-hire-on-demand.png',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22, flexShrink: 0 }}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c0-4 3-6 7-6s7 2 7 6" strokeLinecap="round" />
        <path d="M18 10h4m-2-2v4" strokeLinecap="round" />
      </svg>
    ),
  },
]

const RAY_CONFIG = [
  { left: '6%',  width: 160, rotate: -28, delay: 0   },
  { left: '18%', width: 220, rotate: -14, delay: 2.5 },
  { left: '32%', width: 190, rotate: -4,  delay: 5   },
  { left: '48%', width: 260, rotate:  0,  delay: 1.2 },
  { left: '62%', width: 190, rotate:  6,  delay: 8   },
  { left: '76%', width: 220, rotate: 16,  delay: 3.8 },
  { left: '90%', width: 150, rotate: 30,  delay: 6.5 },
]

const TAG_COLORS = [
  { bg: 'rgba(79,70,229,0.11)',   color: '#4338CA', border: 'rgba(79,70,229,0.28)' },   // indigo
  { bg: 'rgba(245,158,11,0.12)',  color: '#B45309', border: 'rgba(245,158,11,0.3)' },   // amber
  { bg: 'rgba(16,185,129,0.11)',  color: '#047857', border: 'rgba(16,185,129,0.28)' },  // emerald
  { bg: 'rgba(239,68,68,0.1)',    color: '#B91C1C', border: 'rgba(239,68,68,0.26)' },   // red
  { bg: 'rgba(6,182,212,0.11)',   color: '#0E7490', border: 'rgba(6,182,212,0.28)' },   // cyan
  { bg: 'rgba(124,58,237,0.11)',  color: '#6D28D9', border: 'rgba(124,58,237,0.28)' },  // violet
  { bg: 'rgba(249,115,22,0.11)',  color: '#C2410C', border: 'rgba(249,115,22,0.28)' },  // orange
  { bg: 'rgba(59,130,246,0.11)',  color: '#1D4ED8', border: 'rgba(59,130,246,0.28)' },  // blue
  { bg: 'rgba(236,72,153,0.11)',  color: '#9D174D', border: 'rgba(236,72,153,0.28)' },  // pink
  { bg: 'rgba(20,184,166,0.11)',  color: '#0F766E', border: 'rgba(20,184,166,0.28)' },  // teal
  { bg: 'rgba(234,179,8,0.12)',   color: '#854D0E', border: 'rgba(234,179,8,0.3)' },    // yellow
  { bg: 'rgba(99,102,241,0.11)',  color: '#4F46E5', border: 'rgba(99,102,241,0.28)' },  // indigo-light
]

export default function Services() {
  const [active, setActive] = useState('web')
  const current = services.find(s => s.id === active)

  return (
    <>
    <style>{`
      @keyframes lightRayPulse {
        0%, 100% { opacity: 0; }
        50%       { opacity: 1; }
      }
      .svc-section { padding: 80px 40px; }
      .svc-layout { display: grid; grid-template-columns: 280px 1fr; gap: 56px; align-items: flex-start; }
      .svc-card { display: flex; flex-direction: row; gap: 32px; padding: 48px; align-items: stretch; }
      .svc-img-wrap { border-radius: 20px; overflow: hidden; width: 350px; min-width: 350px; min-height: 320px; }
      @media (max-width: 1024px) {
        .svc-img-wrap { width: 260px; min-width: 260px; }
      }
      @media (max-width: 768px) {
        .svc-section { padding: 56px 20px; }
        .svc-layout { grid-template-columns: 1fr; gap: 24px; }
        .svc-tabs { display: grid !important; grid-template-columns: repeat(2,1fr); gap: 10px !important; }
        .svc-card { flex-direction: column; padding: 28px; gap: 24px; }
        .svc-img-wrap { width: 100%; min-width: 0; min-height: 220px; }
      }
      @media (max-width: 480px) {
        .svc-tabs { grid-template-columns: 1fr !important; }
        .svc-card { padding: 20px; }
      }
    `}</style>
    <section id="services" className="svc-section" style={{
      background: 'linear-gradient(135deg, #fdfcff 0%, #f9f8ff 50%, #f6f8ff 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Light Rays */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {RAY_CONFIG.map((ray, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: '-10%',
            left: ray.left,
            width: `${ray.width}px`,
            height: '130%',
            background: 'linear-gradient(to bottom, rgba(99,130,246,0.55) 0%, rgba(139,92,246,0.18) 40%, transparent 75%)',
            transform: `rotate(${ray.rotate}deg)`,
            transformOrigin: 'top center',
            filter: 'blur(36px)',
            opacity: 0,
            animation: `lightRayPulse 14s ease-in-out infinite`,
            animationDelay: `${ray.delay}s`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <h2 style={{
          fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 900, marginBottom: '20px',
          textAlign: 'center', letterSpacing: '-0.5px',
          background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', color: 'transparent',
        }}>
          Our Core Technology Services
        </h2>
        <p style={{
          fontSize: '16px', color: '#6b7280', textAlign: 'center',
          maxWidth: '700px', margin: '0 auto 60px', lineHeight: 1.8,
        }}>
          From strengthening your digital presence to automating your workflow we offer technology services for end-to-end digital transformation.
        </p>

        <div className="svc-layout">

          {/* Left tabs */}
          <div className="svc-tabs" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {services.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '18px 24px', borderRadius: '20px', cursor: 'pointer',
                textAlign: 'left', fontSize: '15px', fontWeight: 700,
                transition: 'all 0.3s', width: '100%', boxSizing: 'border-box',
                ...(active === s.id ? {
                  background: '#0F3460', color: '#fff',
                  border: '2px solid #0F3460',
                  boxShadow: '0 6px 16px rgba(15, 52, 96, 0.2)',
                } : {
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #FE9700 0%, #114171 100%) border-box',
                  border: '2px solid transparent', color: '#0F3460',
                }),
              }}>
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>

          {/* Right: image + content card */}
          <div className="svc-card" style={{
            background: '#fff', border: '1px solid rgba(229, 231, 235, 0.7)',
            borderRadius: '24px', boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12)',
          }}>
            <div className="svc-img-wrap">
              <img
                src={current.image}
                alt={current.headline}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#0F3460', marginBottom: '12px', letterSpacing: '-0.3px' }}>
                {current.headline}
              </h3>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '24px' }}>
                {current.desc}
              </p>
              <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#374151', marginBottom: '16px' }}>
                Key Technologies
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
                {current.tags.map((tag, idx) => {
                  const c = TAG_COLORS[idx % TAG_COLORS.length]
                  return (
                    <span key={tag} style={{
                      padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
                      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
                    }}>{tag}</span>
                  )
                })}
              </div>
              <Link href={current.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '14px 32px', borderRadius: '24px', fontSize: '15px', fontWeight: 600,
                textDecoration: 'none', width: 'fit-content', transition: 'all 0.3s',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #FE9700 0%, #114171 100%) border-box',
                border: '2px solid transparent', color: '#0F3460',
              }}>
                {current.cta}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  )
}
