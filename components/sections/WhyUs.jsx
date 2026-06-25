'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import AuroraText from '../ui/AuroraText'

const stories = [
  {
    initials: 'AI', company: 'AI+ SmartPhones', industry: 'Consumer Electronics / eCommerce',
    metrics: [{ value: 'Shopify', label: 'Platform' }, { value: '3', label: 'Product Lines' }],
    desc: 'Full-featured Shopify store for AI+ SmartPhones — a consumer electronics brand selling Nova series 5G smartphones, NovaPods, and NovaWatches across India.',
    tags: ['Shopify', 'Liquid', 'UI/UX Design'],
    img: '/images/work-aiplusstore.png',
  },
  {
    initials: 'CS', company: 'Comtradesol Advisory', industry: 'Financial Services',
    metrics: [{ value: '15+', label: 'Sectors Served' }, { value: 'WordPress', label: 'Platform' }],
    desc: 'Corporate website for Comtradesol Advisory Services — a Gurgaon-based firm offering trade finance, debt syndication, equity advisory, and credit rating solutions.',
    tags: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    img: '/images/work-comtradesol.png',
  },
  {
    initials: 'KY', company: 'Keiyura Jewellery', industry: 'Fashion & Jewellery / eCommerce',
    metrics: [{ value: 'Shopify', label: 'Platform' }, { value: '100%', label: 'Custom Design' }],
    desc: 'Elegant Shopify store for a handcrafted jewellery brand — featuring lookbooks, curated collections, and a storytelling-led shopping experience.',
    tags: ['Shopify', 'Liquid', 'UI/UX Design'],
    img: '/images/work-keiyura.png',
  },
  {
    initials: 'MS', company: 'Mount Systems', industry: 'IT & Security Solutions',
    metrics: [{ value: 'WordPress', label: 'Platform' }, { value: 'B2B', label: 'Market' }],
    desc: 'Corporate website for Mount Systems — a complete IT and security solutions provider offering end-to-end technology and security services to businesses.',
    tags: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    img: '/images/work-mountsystems.png',
  },
  {
    initials: 'RG', company: 'RNG Foundation', industry: 'Media & Journalism',
    metrics: [{ value: '14', label: 'Award Categories' }, { value: 'WordPress', label: 'Platform' }],
    desc: "Award portal for India's most prestigious journalism honours — the Ramnath Goenka Excellence in Journalism Awards, administered by the Indian Express Group.",
    tags: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    img: '/images/work-rng.png',
  },
  {
    initials: 'SS', company: 'Samsin Streetwear', industry: 'Fashion & Apparel / eCommerce',
    metrics: [{ value: 'Shopify', label: 'Platform' }, { value: 'VIP', label: 'Subscriber Access' }],
    desc: 'Minimalist Shopify store for a streetwear label selling tops, bottoms, and headwear — with VIP subscriber access and flash-sale promotions.',
    tags: ['Shopify', 'Liquid', 'Email Marketing'],
    img: '/images/work-shopsamsin.png',
  },
  {
    initials: 'SL', company: "Skin Laser Centre", industry: 'Healthcare / Dermatology',
    metrics: [{ value: '23+', label: 'Years Practice' }, { value: 'WordPress', label: 'Platform' }],
    desc: "Clinical website for Dr. Paul's Skin Laser Centre, Delhi — a 23-year-old dermatology practice specialising in vitiligo, acne, hair transplants, and advanced laser treatments.",
    tags: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    img: '/images/work-skinlaser.png',
  },
]

const TAG_COLORS = [
  { bg: 'rgba(79,70,229,0.11)',   color: '#4338CA', border: 'rgba(79,70,229,0.28)' },
  { bg: 'rgba(245,158,11,0.12)',  color: '#B45309', border: 'rgba(245,158,11,0.3)' },
  { bg: 'rgba(16,185,129,0.11)',  color: '#047857', border: 'rgba(16,185,129,0.28)' },
  { bg: 'rgba(239,68,68,0.1)',    color: '#B91C1C', border: 'rgba(239,68,68,0.26)' },
  { bg: 'rgba(6,182,212,0.11)',   color: '#0E7490', border: 'rgba(6,182,212,0.28)' },
  { bg: 'rgba(124,58,237,0.11)',  color: '#6D28D9', border: 'rgba(124,58,237,0.28)' },
  { bg: 'rgba(249,115,22,0.11)',  color: '#C2410C', border: 'rgba(249,115,22,0.28)' },
  { bg: 'rgba(59,130,246,0.11)',  color: '#1D4ED8', border: 'rgba(59,130,246,0.28)' },
  { bg: 'rgba(236,72,153,0.11)',  color: '#9D174D', border: 'rgba(236,72,153,0.28)' },
  { bg: 'rgba(20,184,166,0.11)',  color: '#0F766E', border: 'rgba(20,184,166,0.28)' },
  { bg: 'rgba(234,179,8,0.12)',   color: '#854D0E', border: 'rgba(234,179,8,0.3)' },
  { bg: 'rgba(99,102,241,0.11)',  color: '#4F46E5', border: 'rgba(99,102,241,0.28)' },
]

const growthStats = [
  { value: '350+', label: 'Successful projects delivered worldwide',   image: '/images/Partner-with-us.jpg', color: null },
  { value: '150+', label: 'Skilled professionals in our team',          image: '/images/office.png',          color: null },
  { value: '200+', label: 'Satisfied clients across 25+ countries',     image: null,                          color: '#114171' },
]

const navBtnStyle = {
  width: '48px', height: '48px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: '2px solid transparent',
  background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #FE9700 0%, #114171 100%) border-box',
  borderRadius: '12px',
  cursor: 'pointer', fontSize: '20px', color: '#0F3460',
  transition: 'all 0.3s',
}

export default function WhyUs() {
  const [active, setActive] = useState(0)
  const story = stories[active]

  // Blur-fade for growth stats
  const [growthInView, setGrowthInView] = useState(false)
  const growthRef = useRef(null)
  useEffect(() => {
    const el = growthRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setGrowthInView(true) },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const blurFade = (delay) => ({
    opacity:    growthInView ? 1 : 0,
    filter:     growthInView ? 'blur(0px)' : 'blur(14px)',
    transform:  growthInView ? 'translateY(0)' : 'translateY(28px)',
    transition: 'opacity 0.65s ease, filter 0.65s ease, transform 0.65s ease',
    transitionDelay: `${delay}s`,
  })

  return (
    <>
      <style>{`
        .whyus-sec { padding: 80px 40px; }
        .whyus-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-bottom: 60px; }
        .whyus-story-card { display: grid; grid-template-columns: 40% 60%; align-items: center; border: 2px solid #FE9700; border-radius: 40px; overflow: hidden; height: 550px; background: #FFFBF7; }
        .whyus-story-left { display: flex; flex-direction: column; gap: 12px; justify-content: flex-start; padding: 40px 40px 40px 60px; margin: 20px 0 20px 30px; background: #fff; border-radius: 24px; overflow-y: auto; height: calc(100% - 40px); box-sizing: border-box; }
        .whyus-story-right { margin: 20px; border-radius: 24px; overflow: hidden; height: calc(100% - 40px); flex-shrink: 0; position: relative; }
        .whyus-growth-sec { padding: 80px 40px; }
        .whyus-facts-layout { display: grid; grid-template-columns: 280px 1fr; gap: 48px; align-items: flex-start; }
        .whyus-stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        @media (max-width: 900px) {
          .whyus-sec { padding: 56px 24px; }
          .whyus-header { grid-template-columns: 1fr; gap: 24px; margin-bottom: 36px; }
          .whyus-story-card { grid-template-columns: 1fr; height: auto; border-radius: 24px; }
          .whyus-story-left { margin: 16px; padding: 24px; height: auto; overflow-y: visible; }
          .whyus-story-right { height: 260px; }
          .whyus-growth-sec { padding: 56px 24px; }
          .whyus-facts-layout { grid-template-columns: 1fr; gap: 32px; }
          .whyus-stats-grid { gap: 12px; }
        }
        @media (max-width: 600px) {
          .whyus-sec { padding: 48px 16px; }
          .whyus-story-right { height: 200px; }
          .whyus-stats-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .whyus-stat-item { transition: none !important; opacity: 1 !important; filter: none !important; transform: none !important; }
        }
      `}</style>
      {/* ── Success Stories ── */}
      <section id="success-stories" className="whyus-sec" style={{
        background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.5) 0%, rgba(233, 212, 255, 0.3) 100%)',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          {/* Header: two-column */}
          <div className="whyus-header">
            <div>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.2 }}>
                <span style={{ color: '#111827' }}>Real Brand </span><AuroraText>Stories To Inspire You</AuroraText>
              </h2>
            </div>
            <div>
              <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '16px', lineHeight: 1.7, margin: '0 0 24px' }}>
                Catch us innovating with cutting-edge projects that redefine industry standards.
              </p>
              <Link href="/case-studies" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', borderRadius: '24px', fontSize: '15px', fontWeight: 500,
                textDecoration: 'none', color: '#fff', background: '#0F3460', width: 'fit-content',
                transition: 'all 0.3s',
              }}>
                Explore Case Studies
              </Link>
            </div>
          </div>

          {/* Story card — outer card: amber border, cream bg */}
          <div className="whyus-story-card">
            {/* Left: white floating card inside the 40% column */}
            <div className="whyus-story-left">
              {/* Company header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '8px',
                  background: '#0F3460', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '18px', flexShrink: 0,
                }}>
                  {story.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#111827', fontSize: '18px', margin: '0 0 4px' }}>{story.company}</div>
                  <div style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 500 }}>{story.industry}</div>
                </div>
              </div>

              {/* Metrics */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
                padding: '16px 0',
                borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb',
              }}>
                {story.metrics.map(m => (
                  <div key={m.label}>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F3460', lineHeight: 1, marginBottom: '4px' }}>{m.value}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{story.desc}</p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
                {story.tags.map((t, ti) => {
                  const c = TAG_COLORS[ti % TAG_COLORS.length]
                  return (
                    <span key={t} style={{
                      padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
                    }}>{t}</span>
                  )
                })}
              </div>

              {/* Link */}
              <Link href="/case-studies" style={{
                color: '#0F3460', fontWeight: 700, fontSize: '13px', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '4px', width: 'fit-content',
              }}>
                Read Full Case Study →
              </Link>
            </div>

            {/* Right: inset image with margin + border-radius */}
            <div className="whyus-story-right">
              <img
                src={story.img}
                alt={story.company}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* Nav: gradient-border rounded-square buttons */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '24px', justifyContent: 'center' }}>
            <button
              onClick={() => setActive((active - 1 + stories.length) % stories.length)}
              style={navBtnStyle}
            >&#8592;</button>
            <button
              onClick={() => setActive((active + 1) % stories.length)}
              style={navBtnStyle}
            >&#8594;</button>
          </div>
        </div>
      </section>

      {/* ── Growth Story ── */}
      <section ref={growthRef} id="growth-story" className="whyus-growth-sec" style={{ background: '#fff' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div className="whyus-facts-layout">

            {/* Left: eyebrow + title + desc */}
            <div style={blurFade(0)}>
              <p style={{
                fontSize: '12px', fontWeight: 600, letterSpacing: '1.8px',
                textTransform: 'uppercase', color: '#888', margin: '0 0 16px',
              }}>
                FAST FACTS
              </p>
              <h2 style={{
                fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900,
                lineHeight: 1.12, letterSpacing: '-0.5px',
                margin: '0 0 20px',
              }}>
                <span style={{ color: '#111827' }}>Highlighting Our </span><AuroraText>Growth Story</AuroraText>
              </h2>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.75, margin: 0 }}>
                Here's what being a client-focused technology and marketing company has allowed us to accomplish.
              </p>
            </div>

            {/* Right: 3 stat cards */}
            <div className="whyus-stats-grid">
              {growthStats.map((s, i) => (
                <div key={i} style={{
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '16px',
                  padding: '36px 24px 32px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  background: '#fff', textAlign: 'center',
                  ...blurFade(0.15 + i * 0.15),
                }}>
                  {/* Circle */}
                  <div style={{
                    width: '160px', height: '160px', borderRadius: '50%',
                    overflow: 'hidden', marginBottom: '32px', flexShrink: 0,
                  }}>
                    {s.image ? (
                      <img src={s.image} alt="" aria-hidden="true"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%', background: s.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                          <polyline points="16 7 22 7 22 13" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Value */}
                  <div style={{
                    fontSize: '44px', fontWeight: 700, color: '#111',
                    letterSpacing: '-1px', lineHeight: 1, marginBottom: '14px',
                  }}>
                    {s.value}
                  </div>
                  {/* Label */}
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
