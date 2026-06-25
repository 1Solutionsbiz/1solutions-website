'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import AuroraText from '../ui/AuroraText'

const services = [
  {
    id: 'web',
    label: 'Digital Transformation',
    headline: 'Digital Transformation',
    desc: 'Digitize and automate complex workflows with our responsive software solutions. Modernity, experience, scalability, security, performance — all check.',
    tags: ['React', 'Next.js', 'Node.js', '.NET', 'Vue.js', 'Angular'],
    cta: 'Elevate Your Digital Journey',
    href: '/digital-transformation',
    image: '/images/service-digital-transformation.jpg',
    accent: '#4F46E5',
    grad: 'linear-gradient(160deg,#e0e7ff 0%,#c7d2fe 50%,#818cf8 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="2" y1="17" x2="22" y2="17" />
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
    cta: 'Boost Your Online Store',
    href: '/ecommerce-development',
    image: '/images/service-ecommerce-development.jpg',
    accent: '#0EA5E9',
    grad: 'linear-gradient(160deg,#e0f2fe 0%,#bae6fd 50%,#38bdf8 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
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
    cta: 'Modernize Your Infrastructure',
    href: '/cloud-devops',
    image: '/images/service-cloud-devops.png',
    accent: '#06B6D4',
    grad: 'linear-gradient(160deg,#ecfeff 0%,#cffafe 50%,#22d3ee 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
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
    cta: 'Explore AI Solutions',
    href: '/artificial-intelligence',
    image: '/images/service-artificial-intelligence.png',
    accent: '#8B5CF6',
    grad: 'linear-gradient(160deg,#f5f3ff 0%,#ede9fe 50%,#a78bfa 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
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
    cta: 'Grow Your Digital Presence',
    href: '/digital-marketing',
    image: '/images/service-digital-marketing.png',
    accent: '#10B981',
    grad: 'linear-gradient(160deg,#ecfdf5 0%,#d1fae5 50%,#34d399 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
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
    cta: 'Build Your Dream Team',
    href: '/hire-dedicated-resources',
    image: '/images/service-hire-on-demand.png',
    accent: '#F59E0B',
    grad: 'linear-gradient(160deg,#fffbeb 0%,#fef3c7 50%,#fbbf24 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c0-4 3-6 7-6s7 2 7 6" strokeLinecap="round" />
        <path d="M18 10h4m-2-2v4" strokeLinecap="round" />
      </svg>
    ),
  },
]

const TAG_COLORS = [
  { bg: 'rgba(79,70,229,0.11)',  color: '#4338CA', border: 'rgba(79,70,229,0.28)'  },
  { bg: 'rgba(245,158,11,0.12)', color: '#B45309', border: 'rgba(245,158,11,0.3)'  },
  { bg: 'rgba(16,185,129,0.11)', color: '#047857', border: 'rgba(16,185,129,0.28)' },
  { bg: 'rgba(239,68,68,0.1)',   color: '#B91C1C', border: 'rgba(239,68,68,0.26)'  },
  { bg: 'rgba(6,182,212,0.11)',  color: '#0E7490', border: 'rgba(6,182,212,0.28)'  },
  { bg: 'rgba(124,58,237,0.11)', color: '#6D28D9', border: 'rgba(124,58,237,0.28)' },
]

export default function Services() {
  const [active, setActive] = useState('web')
  const current = services.find(s => s.id === active)

  const [tabsVisible, setTabsVisible] = useState(false)
  const sectionRef = useRef(null)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTabsVisible(true) },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const [visibleTags, setVisibleTags] = useState(current.tags)
  useEffect(() => {
    setVisibleTags([])
    const timers = current.tags.map((tag, i) =>
      setTimeout(() => setVisibleTags(prev => [...prev, tag]), i * 130)
    )
    return () => timers.forEach(clearTimeout)
  }, [active])

  return (
    <>
    <style>{`
      @keyframes animListItem {
        0%   { opacity: 0; transform: translateY(-12px) scale(0.94); }
        60%  { transform: translateY(3px) scale(1.02); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes tabSlideIn {
        from { opacity: 0; transform: translateX(-18px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes svcPanelIn {
        0%   { opacity: 0; transform: translateY(28px) scale(0.97); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      @media (prefers-reduced-motion: reduce) {
        .svc-tab-item, .svc-tag-item, .svc-panel { animation: none !important; opacity: 1 !important; transform: none !important; }
      }
      .svc-section  { padding: 80px 40px; }
      .svc-layout   { display: grid; grid-template-columns: 260px 1fr 1.35fr; gap: 48px; align-items: center; }
      .svc-tab-item { background: none; border: none; cursor: pointer; width: 100%; text-align: left; }
      .svc-tab-item:hover .svc-tab-label { color: #0F3460; }
      @media (max-width: 1100px) {
        .svc-layout { grid-template-columns: 220px 1fr 1.2fr; gap: 32px; }
      }
      @media (max-width: 860px) {
        .svc-section { padding: 56px 20px; }
        .svc-layout  { grid-template-columns: 1fr; gap: 28px; }
        .svc-tabs    { display: grid !important; grid-template-columns: repeat(3,1fr); gap: 10px !important; }
      }
      @media (max-width: 520px) {
        .svc-tabs { grid-template-columns: repeat(2,1fr) !important; }
      }
    `}</style>

    <section ref={sectionRef} id="services" className="svc-section" style={{
      background: 'linear-gradient(135deg,#edf2f8 0%,#e8edf4 50%,#eaeff6 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        <h2 style={{ fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 900, marginBottom: '20px', textAlign: 'center', letterSpacing: '-0.5px' }}>
          <AuroraText>Our Core Technology Services</AuroraText>
        </h2>
        <p style={{
          fontSize: '16px', color: '#6b7280', textAlign: 'center',
          maxWidth: '700px', margin: '0 auto 56px', lineHeight: 1.8,
        }}>
          From strengthening your digital presence to automating your workflow we offer technology services for end-to-end digital transformation.
        </p>

        <div className="svc-layout">

          {/* ── Left: tab list ── */}
          <div className="svc-tabs" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {services.map((s, i) => {
              const isActive = active === s.id
              return (
                <button
                  key={s.id}
                  className="svc-tab-item"
                  onClick={() => setActive(s.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 18px', borderRadius: '14px',
                    opacity: tabsVisible ? 1 : 0,
                    animation: tabsVisible ? 'tabSlideIn 0.42s ease both' : 'none',
                    animationDelay: `${i * 0.07}s`,
                    background: isActive ? '#fff' : 'transparent',
                    boxShadow: isActive ? '0 2px 12px rgba(0,0,0,0.10)' : 'none',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                >
                  {/* Icon circle */}
                  <span style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isActive ? s.accent : 'rgba(0,0,0,0.07)',
                    color: isActive ? '#fff' : '#6b7280',
                    transition: 'background 0.2s, color 0.2s',
                  }}>
                    {s.icon}
                  </span>
                  <span className="svc-tab-label" style={{
                    fontSize: '14px', fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#111827' : '#6b7280',
                    flex: 1, transition: 'color 0.2s',
                  }}>
                    {s.label}
                  </span>
                  {isActive && (
                    <span style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>›</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* ── Center: image with Backlight glow ── */}
          <div
            key={`img-${active}`}
            className="svc-panel"
            style={{
              position: 'relative',
              paddingBottom: '32px',
              animation: 'svcPanelIn 0.42s cubic-bezier(0.22,1,0.36,1) both',
            }}
          >
            {/* Backlight — lives OUTSIDE overflow:hidden so it spills around the card */}
            <img
              src={current.image}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '0', left: '50%',
                transform: 'translateX(-50%) scale(0.8)',
                width: '85%',
                objectFit: 'contain',
                filter: 'blur(48px)',
                opacity: 0.7,
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            {/* Gradient card — overflow:hidden only clips its own content */}
            <div style={{
              position: 'relative', zIndex: 1,
              borderRadius: '24px', overflow: 'hidden',
              background: current.grad,
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              minHeight: '460px', padding: '32px 24px 0',
            }}>
              <img
                src={current.image}
                alt={current.headline}
                style={{ width: '100%', maxWidth: '340px', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>

          {/* ── Right: content ── */}
          <div
            key={`content-${active}`}
            className="svc-panel"
            style={{
              padding: '16px 0',
              animation: 'svcPanelIn 0.42s cubic-bezier(0.22,1,0.36,1) 0.06s both',
            }}
          >
            <p style={{
              fontSize: '11px', fontWeight: 700, color: '#9ca3af',
              letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px',
            }}>
              1Solutions
            </p>
            <h3 style={{
              fontSize: 'clamp(28px,2.8vw,40px)', fontWeight: 800,
              color: '#111827', lineHeight: 1.2, marginBottom: '20px',
              letterSpacing: '-0.5px',
            }}>
              {current.headline}
            </h3>
            <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: 1.75, marginBottom: '28px' }}>
              {current.desc}
            </p>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px', minHeight: '34px' }}>
              {visibleTags.map((tag, idx) => {
                const c = TAG_COLORS[idx % TAG_COLORS.length]
                return (
                  <span
                    key={`${active}-${tag}`}
                    className="svc-tag-item"
                    style={{
                      padding: '5px 13px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
                      animation: 'animListItem 0.35s ease both',
                    }}
                  >
                    {tag}
                  </span>
                )
              })}
            </div>

            <Link href={current.href} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '15px 34px', borderRadius: '30px',
              fontSize: '15px', fontWeight: 700,
              background: '#0F3460', color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(15,52,96,0.25)',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}>
              {current.cta}
            </Link>
          </div>

        </div>
      </div>
    </section>
    </>
  )
}
