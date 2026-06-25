'use client'
import AuroraText from '../ui/AuroraText'

const testimonials = [
  {
    text: "1Solutions didn't just build our platform — they understood our vision and scaled it to handle 10x growth. Execution was flawless from day one.",
    name: 'Akshay Kumar',
    title: 'Founder, TechStart Ventures',
    initials: 'AK',
    color: '#0F3460',
  },
  {
    text: "Security and compliance were non-negotiable for us. They delivered a platform that's airtight and still incredibly intuitive for our end users.",
    name: 'Priya Sharma',
    title: 'CTO, FinanceHub India',
    initials: 'PS',
    color: '#7C3AED',
  },
  {
    text: "The personalisation features they built increased our conversion rate by 280%. That's the kind of measurable impact that actually matters.",
    name: 'Rajesh Joshi',
    title: 'VP Operations, RetailGrowth Co.',
    initials: 'RJ',
    color: '#0E7490',
  },
  {
    text: "We needed a full redesign in 6 weeks before our funding round. They nailed it — on time, on brand, and better than we imagined.",
    name: 'Sarah Mitchell',
    title: 'Head of Digital, Sunrise Media',
    initials: 'SM',
    color: '#BE185D',
  },
  {
    text: "Our Shopify store went from 3-second load times to under 1 second after their performance audit. Revenue went up 40% in the first month.",
    name: 'Arjun Malhotra',
    title: 'CEO, Bharat Commerce',
    initials: 'AM',
    color: '#B45309',
  },
  {
    text: "They rebuilt our entire CRM integration without any downtime. The communication was transparent throughout and the outcome exceeded expectations.",
    name: 'Emma Thompson',
    title: 'Marketing Director, UK Retail Group',
    initials: 'ET',
    color: '#065F46',
  },
  {
    text: "As a healthcare startup, we had very specific compliance requirements. 1Solutions was the only agency that truly understood what HIPAA meant for our roadmap.",
    name: 'Vikram Nair',
    title: 'Founder, EduTech Solutions',
    initials: 'VN',
    color: '#1D4ED8',
  },
  {
    text: "The AI-powered recommendation engine they built for us cut our customer support tickets by 60%. Genuinely impressive engineering.",
    name: 'David Chen',
    title: 'CTO, Global Fintech Corp',
    initials: 'DC',
    color: '#9D174D',
  },
  {
    text: "Three agencies before them said the migration was too complex. 1Solutions did it in 4 weeks. Our team was genuinely shocked.",
    name: 'Neha Kapoor',
    title: 'Product Lead, CloudBase India',
    initials: 'NK',
    color: '#6D28D9',
  },
  {
    text: "From branding to launch, they were a true partner. Every deliverable was polished, on-time, and required minimal revision.",
    name: 'James O\'Brien',
    title: 'Founder, HealthStack AU',
    initials: 'JO',
    color: '#047857',
  },
]

const row1 = [...testimonials.slice(0, 5), ...testimonials.slice(0, 5)]
const row2 = [...testimonials.slice(5),    ...testimonials.slice(5)]

function TestiCard({ t }) {
  return (
    <div style={{
      width: '320px', flexShrink: 0,
      background: '#fff',
      border: '1px solid rgba(15,52,96,0.08)',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
      display: 'flex', flexDirection: 'column', gap: '18px',
      userSelect: 'none',
    }}>
      {/* Stars */}
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1,2,3,4,5].map(s => (
          <span key={s} style={{ color: '#F59E0B', fontSize: '14px' }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontSize: '14px', color: '#374151', lineHeight: 1.75,
        margin: 0, flexGrow: 1,
      }}>
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
          background: t.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: '13px',
        }}>
          {t.initials}
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#111827', fontSize: '13px' }}>{t.name}</div>
          <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '1px' }}>{t.title}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <>
      <style>{`
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .testi-row { overflow: hidden; position: relative; }
        .testi-track {
          display: flex; gap: 20px; width: max-content;
          animation: marqueeLeft 40s linear infinite;
        }
        .testi-track-rev {
          display: flex; gap: 20px; width: max-content;
          animation: marqueeRight 40s linear infinite;
        }
        .testi-row:hover .testi-track,
        .testi-row:hover .testi-track-rev {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .testi-track, .testi-track-rev { animation: none !important; }
        }
      `}</style>

      <section id="testimonials" style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #faf8ff 0%, #f7f4ff 50%, #f3f8ff 100%)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '0 40px', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 900, marginBottom: '16px' }}>
            <AuroraText>What Our Clients Say</AuroraText>
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            Real feedback from 500+ teams we&apos;ve partnered with across 25 countries.
          </p>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="testi-row" style={{ marginBottom: '20px', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '160px', zIndex: 1,
            background: 'linear-gradient(to right, #faf8ff, transparent)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '160px', zIndex: 1,
            background: 'linear-gradient(to left, #faf8ff, transparent)', pointerEvents: 'none',
          }} />
          <div className="testi-track" style={{ paddingLeft: '20px' }}>
            {row1.map((t, i) => <TestiCard key={i} t={t} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="testi-row" style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '160px', zIndex: 1,
            background: 'linear-gradient(to right, #f3f8ff, transparent)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '160px', zIndex: 1,
            background: 'linear-gradient(to left, #f3f8ff, transparent)', pointerEvents: 'none',
          }} />
          <div className="testi-track-rev" style={{ paddingLeft: '20px' }}>
            {row2.map((t, i) => <TestiCard key={i} t={t} />)}
          </div>
        </div>

      </section>
    </>
  )
}
