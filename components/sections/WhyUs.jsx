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

const growthStats = [
  { value: '89%', text: 'Growth in revenue, driving business success.' },
  { value: '350+', text: 'Successful projects delivered worldwide.' },
  { value: '150+', text: 'Strong team of skilled professionals.' },
  { value: '200+', text: 'New customers trusting our solutions.' },
  { value: '50+', text: 'Expertise in cutting-edge technologies.' },
]

export default function WhyUs() {
  const [active, setActive] = useState(0)
  const story = stories[active]

  return (
    <>
      {/* Success Stories */}
      <section id="success-stories" style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: '#0F3460' }}>
              Real <span style={{ color: '#FE9700' }}>Brand Stories</span> To Inspire You
            </h2>
            <div>
              <p style={{ color: '#6b7280', marginBottom: '12px', fontSize: '15px' }}>Catch us innovating with cutting-edge projects that redefine industry standards.</p>
              <Link href="/case-studies" style={{ color: '#0F3460', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>Explore Case Studies →</Link>
            </div>
          </div>

          {/* Card */}
          <div style={{
            display: 'grid', gridTemplateColumns: '40% 60%',
            border: '2px solid #FE9700', borderRadius: '40px',
            overflow: 'hidden', minHeight: '500px', background: '#FFFBF7',
          }}>
            {/* Left: content */}
            <div style={{ padding: '48px 40px 40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#0F3460', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px' }}>{story.initials}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0F3460', fontSize: '16px' }}>{story.company}</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>{story.industry}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '32px', marginBottom: '20px' }}>
                  {story.metrics.map(m => (
                    <div key={m.label}>
                      <div style={{ fontSize: '28px', fontWeight: 900, color: '#FE9700' }}>{m.value}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.7, marginBottom: '20px' }}>{story.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {story.tags.map(t => (
                    <span key={t} style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: '#f3f4f6', color: '#374151' }}>{t}</span>
                  ))}
                </div>
                <Link href="/case-studies" style={{ color: '#0F3460', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>Read Full Case Study →</Link>
              </div>
            </div>
            {/* Right: image */}
            <div style={{ position: 'relative' }}>
              <img src={story.img} alt={story.company} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0 38px 38px 0' }} />
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'center' }}>
            <button onClick={() => setActive((active - 1 + stories.length) % stories.length)}
              style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #FE9700', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#FE9700' }}>←</button>
            <button onClick={() => setActive((active + 1) % stories.length)}
              style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #FE9700', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#FE9700' }}>→</button>
          </div>
        </div>
      </section>

      {/* Growth Story */}
      <section id="growth-story" style={{ padding: '80px 40px', background: '#0F3460' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 900, color: '#fff' }}>
              Highlighting Our <span style={{ color: '#FE9700' }}>Growth</span> Story
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '400px', fontSize: '15px', lineHeight: 1.7 }}>
              With collective team efforts and successful product engineering, we have grown our ecosystem, made it AI-ready, and worthwhile!
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '20px' }}>
            {growthStats.map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.07)', borderRadius: '16px', padding: '32px 24px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div style={{ fontSize: '40px', fontWeight: 900, color: '#FE9700', marginBottom: '12px' }}>{s.value}</div>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.6 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
