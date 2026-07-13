'use client'
import { useState } from 'react'
import Link from 'next/link'

const stories = [
  {
    initials: 'TS', company: 'TechStart Ventures', industry: 'Technology / SaaS',
    metrics: [{ value: '340%', label: 'Revenue Growth' }, { value: '500+', label: 'Customers' }],
    desc: 'We helped this SaaS startup build a scalable platform that acquired 500+ enterprise customers in their first year. Redesigned their product architecture for 10x growth capacity.',
    tags: ['Web Development', 'Product Strategy', 'DevOps'],
    img: 'https://picsum.photos/600/500?random=5',
  },
  {
    initials: 'FH', company: 'FinanceHub India', industry: 'Finance & Banking',
    metrics: [{ value: '450K', label: 'Active Users' }, { value: '$50M+', label: 'Processed' }],
    desc: 'Built a secure, RBI-compliant fintech platform processing $50M+ annually. Delivered with zero security incidents and 99.99% uptime SLA.',
    tags: ['Security & Compliance', 'Payments Integration', 'Mobile App'],
    img: 'https://picsum.photos/600/500?random=6',
  },
  {
    initials: 'RG', company: 'RetailGrowth Co.', industry: 'Retail & E-Commerce',
    metrics: [{ value: '280%', label: 'Conversion Lift' }, { value: '$2.3M', label: 'Annual Revenue' }],
    desc: 'Redesigned e-commerce platform with AI-powered personalisation. Increased average order value by 45% and reduced cart abandonment by 30%.',
    tags: ['E-Commerce', 'AI/ML', 'Digital Marketing'],
    img: 'https://picsum.photos/600/500?random=7',
  },
]

const tagGradients = [
  'linear-gradient(135deg, #F59E0B 0%, #FF8C42 100%)',
  'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
  'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
]

const growthStats = [
  { value: '89%', text: 'Growth in revenue, driving business success.' },
  { value: '350+', text: 'Successful projects delivered worldwide.' },
  { value: '150+', text: 'Strong team of skilled professionals.' },
  { value: '200+', text: 'New customers trusting our solutions.' },
  { value: '50+', text: 'Expertise in cutting-edge technologies.' },
]

const statBgs = [
  'linear-gradient(135deg, rgba(254, 151, 0, 0.08) 0%, rgba(245, 158, 11, 0.04) 100%)',
  'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%)',
  'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(168, 85, 247, 0.04) 100%)',
  'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(74, 222, 128, 0.04) 100%)',
  'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(124, 58, 237, 0.04) 100%)',
]

const statGridPos = [
  { gridColumn: '1 / 3', gridRow: '1' },
  { gridColumn: '3', gridRow: '1' },
  { gridColumn: '1', gridRow: '2' },
  { gridColumn: '2', gridRow: '2' },
  { gridColumn: '3', gridRow: '2' },
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

  return (
    <>
      {/* ── Success Stories ── */}
      <section id="success-stories" style={{
        padding: '80px 40px',
        background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.5) 0%, rgba(233, 212, 255, 0.3) 100%)',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          {/* Header: two-column */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px',
            alignItems: 'center', marginBottom: '60px',
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 900, margin: '0 0 16px',
                lineHeight: 1.2,
                background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', color: 'transparent',
              }}>
                Real Brand Stories To Inspire You
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
          <div style={{
            display: 'grid', gridTemplateColumns: '40% 60%',
            alignItems: 'center',
            border: '2px solid #FE9700', borderRadius: '40px',
            overflow: 'hidden', height: '550px', background: '#FFFBF7',
          }}>
            {/* Left: white floating card inside the 40% column */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '12px',
              justifyContent: 'flex-start',
              padding: '40px 40px 40px 60px',
              margin: '20px 0 20px 30px',
              background: '#fff',
              borderRadius: '24px',
              overflowY: 'auto',
              height: 'calc(100% - 40px)',
              boxSizing: 'border-box',
            }}>
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
                {story.tags.map((t, ti) => (
                  <span key={t} style={{
                    padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                    color: '#fff', background: tagGradients[ti] || tagGradients[0],
                  }}>{t}</span>
                ))}
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
            <div style={{
              margin: '20px', borderRadius: '24px',
              overflow: 'hidden', height: 'calc(100% - 40px)',
              flexShrink: 0, position: 'relative',
            }}>
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
      <section id="growth-story" style={{ padding: '100px 40px', background: '#fff' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'flex-start' }}>
            <h2 style={{
              fontSize: 'clamp(36px,4vw,56px)', fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.5px', margin: 0,
              background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', color: 'transparent',
            }}>
              Highlighting Our Growth Story
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#6b7280', letterSpacing: '0.3px', margin: '8px 0 0', maxWidth: '500px' }}>
              With collective team efforts and successful product engineering, we have grown our ecosystem, made it AI-ready, and worthwhile!
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto auto', gap: '32px',
            marginTop: '60px', paddingTop: '40px',
            borderTop: '2px solid rgba(15, 52, 96, 0.12)',
          }}>
            {growthStats.map((s, i) => {
              const isLarge = i === 0 || i === 4
              return (
                <div key={i} style={{
                  ...statGridPos[i],
                  background: statBgs[i],
                  borderRadius: '20px',
                  padding: isLarge ? '56px' : '40px 36px',
                  minHeight: isLarge ? '240px' : '180px',
                  border: '1px solid rgba(15, 52, 96, 0.05)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  boxSizing: 'border-box', transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = isLarge ? 'translateY(-8px)' : 'translateY(-4px) scale(1.01)'
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    fontSize: isLarge ? '64px' : '50px', fontWeight: 900, color: '#114171',
                    marginBottom: '16px', lineHeight: 1,
                  }}>
                    {s.value}
                  </div>
                  <p style={{
                    fontSize: isLarge ? '18px' : '15px', color: '#374151',
                    lineHeight: 1.8, margin: 0, fontWeight: 500,
                  }}>
                    {s.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
