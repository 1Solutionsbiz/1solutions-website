'use client'
import { useState } from 'react'

const testimonials = [
  {
    text: "1Solutions didn't just build our platform — they understood our vision and scaled it to handle 10x growth. The team's execution was flawless.",
    name: 'Akshay Kumar',
    title: 'Founder, TechStart Ventures',
    initials: 'AK',
  },
  {
    text: "Security and compliance were non-negotiable. 1Solutions delivered a platform that's not just secure but also intuitive for our users.",
    name: 'Priya Sharma',
    title: 'CTO, FinanceHub India',
    initials: 'PS',
  },
  {
    text: "The personalisation features they built increased our conversion by 280%. That's the kind of impact that matters to our business.",
    name: 'Rajesh Joshi',
    title: 'VP Operations, RetailGrowth Co.',
    initials: 'RJ',
  },
]

export default function Testimonials() {
  const [activeDot, setActiveDot] = useState(0)

  return (
    <>
    <style>{`
      .testi-section { padding: 80px 40px; }
      .testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 32px; margin-bottom: 40px; }
      @media (max-width: 900px) {
        .testi-section { padding: 56px 24px; }
        .testi-grid { grid-template-columns: repeat(2,1fr); }
      }
      @media (max-width: 600px) {
        .testi-section { padding: 48px 16px; }
        .testi-grid { grid-template-columns: 1fr; }
      }
    `}</style>
    <section id="testimonials" className="testi-section" style={{
      background: [
        'radial-gradient(ellipse 1000px 700px at 50% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
        'radial-gradient(ellipse 600px 400px at 50% 40%, rgba(124, 58, 237, 0.04) 0%, transparent 60%)',
        'linear-gradient(135deg, #faf8ff 0%, #f7f4ff 50%, #f3f8ff 100%)',
      ].join(', '),
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 900, marginBottom: '16px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 25%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', color: 'transparent',
        }}>
          What Our Clients Say
        </h2>
        <p style={{
          fontSize: '16px', color: '#6b7280', lineHeight: 1.7,
          maxWidth: '700px', margin: '0 auto 60px', textAlign: 'center',
        }}>
          Real feedback from teams we&apos;ve partnered with. See why leading companies trust 1Solutions.
        </p>

        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={i}
              style={{
                background: '#fff', borderRadius: '16px', padding: '32px',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                display: 'flex', flexDirection: 'column', gap: '20px',
                transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#F59E0B'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(254, 151, 0, 0.12)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: '#F59E0B', fontSize: '16px' }}>&#9733;</span>
                ))}
              </div>

              <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.7, flexGrow: 1, margin: 0 }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0F3460 0%, #1a5a96 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: '14px', flexShrink: 0,
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '14px' }}>{t.name}</div>
                    <div style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 500 }}>{t.title}</div>
                  </div>
                </div>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: '#F59E0B', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: '3px' }}>
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          {testimonials.map((_, i) => (
            <div key={i} onClick={() => setActiveDot(i)} style={{
              width: '12px', height: '12px', borderRadius: '50%', cursor: 'pointer',
              transition: 'all 0.3s',
              background: activeDot === i ? '#F59E0B' : 'rgba(254, 151, 0, 0.3)',
              transform: activeDot === i ? 'scale(1.2)' : 'scale(1)',
            }} />
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
