'use client'
import Link from 'next/link'
import { useState } from 'react'

const metrics = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '16+', label: 'Years Experience' },
  { value: '97%', label: 'Client Retention' },
  { value: '25+', label: 'Countries Served' },
]

const clientLogos = [
  { src: '/logo/Indian_Express_Logo_full.png', alt: 'Indian Express' },
  { src: '/logo/PHDCCI-Logo-2024.png', alt: 'PHDCCI' },
  { src: '/logo/Zuari-Finserv-logo-new.png', alt: 'Zuari Finserv' },
  { src: '/logo/Wilson-logo.svg.png', alt: 'Wilson' },
  { src: '/logo/Verizon_2015_logo_-vector.svg.png', alt: 'Verizon' },
  { src: '/logo/ICCoLogo.png', alt: 'ICC' },
  { src: '/logo/Honor_Logo_(2020).svg.png', alt: 'Honor' },
  { src: '/logo/Uniphore.jpg', alt: 'Uniphore' },
  { src: '/logo/Nuance-Symbol-500x281.png', alt: 'Nuance' },
  { src: '/logo/amarujala-print-logo_60e03f7d5b4a8.webp', alt: 'Amar Ujala' },
]

const doubled = [...clientLogos, ...clientLogos]

export default function Hero() {
  const [priHov, setPriHov] = useState(false)
  const [secHov, setSecHov] = useState(false)

  return (
    <>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-fade-1 { animation: heroFadeUp 0.75s ease both; }
        .hero-fade-2 { animation: heroFadeUp 0.75s ease 0.12s both; }
        .hero-fade-3 { animation: heroFadeUp 0.75s ease 0.24s both; }
        .hero-fade-4 { animation: heroFadeUp 0.75s ease 0.36s both; }
        .hero-logos-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: heroMarquee 32s linear infinite;
        }
        .hero-metrics {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 40px;
          margin-top: 44px;
          margin-bottom: 44px;
          padding: 44px 0;
          border-top: 1px solid rgba(15,52,96,0.1);
          border-bottom: 1px solid rgba(15,52,96,0.1);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-1,.hero-fade-2,.hero-fade-3,.hero-fade-4 {
            animation: none !important; opacity: 1 !important;
          }
          .hero-logos-track { animation: none !important; }
        }
        @media (max-width: 768px) {
          .hero-section { padding: 64px 20px 56px !important; }
          .hero-metrics { grid-template-columns: repeat(2,1fr); gap: 24px; padding: 32px 0; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 56px 16px 48px !important; }
        }
      `}</style>

      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, rgba(254,243,199,0.5) 0%, rgba(233,212,255,0.3) 100%)',
        padding: '100px 40px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle background blobs */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-120px',
          width: '600px', height: '600px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '500px', height: '500px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(254,151,0,0.07) 0%, transparent 70%)',
        }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Headline */}
          <h1 className="hero-fade-1" style={{
            fontSize: 'clamp(40px, 5.5vw, 64px)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-1.5px',
            background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            We build Brands That Scale &amp; Generate Revenue.
          </h1>

          {/* Subheading */}
          <p className="hero-fade-2" style={{
            fontSize: '18px', color: '#6b7280', marginBottom: '0',
            maxWidth: '680px', margin: '0 auto', lineHeight: 1.8,
          }}>
            Tired of juggling multiple agencies? We combine strategy, design, development, and marketing
            into one powerful system — faster launches, lower costs, measurable growth.
          </p>

          {/* Metrics */}
          <div className="hero-fade-3 hero-metrics">
            {metrics.map((m) => (
              <div key={m.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '42px', fontWeight: 900, color: '#114171',
                  marginBottom: '8px', lineHeight: 1, letterSpacing: '-1px',
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0.3px' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-fade-4" style={{
            display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px',
          }}>
            <Link
              href="/contact-us"
              onMouseEnter={() => setPriHov(true)}
              onMouseLeave={() => setPriHov(false)}
              style={{
                background: priHov
                  ? 'linear-gradient(135deg, #0F3460 0%, #1a5c99 100%)'
                  : '#0F3460',
                color: '#fff', padding: '16px 36px',
                fontSize: '16px', fontWeight: 600, borderRadius: '24px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: priHov
                  ? '0 10px 32px rgba(15,52,96,0.4)'
                  : '0 4px 16px rgba(15,52,96,0.2)',
                transform: priHov ? 'translateY(-2px)' : 'translateY(0)',
                textDecoration: 'none', transition: 'all 0.3s ease',
              }}
            >
              Book Free Strategy Call
            </Link>
            <Link
              href="/case-studies"
              onMouseEnter={() => setSecHov(true)}
              onMouseLeave={() => setSecHov(false)}
              style={secHov ? {
                background: 'linear-gradient(135deg, #FE9700 0%, #F59E0B 100%)',
                color: '#fff', padding: '14px 34px',
                fontSize: '16px', fontWeight: 600, borderRadius: '24px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                border: '2px solid #FE9700',
                boxShadow: '0 10px 28px rgba(254,151,0,0.28)',
                transform: 'translateY(-2px)',
                textDecoration: 'none', transition: 'all 0.3s ease',
              } : {
                background: 'white', color: '#0F3460', padding: '14px 34px',
                fontSize: '16px', fontWeight: 600, borderRadius: '24px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(white,white), linear-gradient(90deg,#FE9700 0%,#114171 100%)',
                backgroundOrigin: 'padding-box, border-box',
                backgroundClip: 'padding-box, border-box',
                textDecoration: 'none', transition: 'all 0.3s ease',
              }}
            >
              View Our Work
            </Link>
          </div>

        </div>

        {/* Scrolling Client Logos */}
        <div style={{ width: '100%' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            <div style={{
              textAlign: 'center', fontSize: '11px', fontWeight: 700,
              textTransform: 'uppercase', color: '#9ca3af',
              letterSpacing: '2px', marginBottom: '28px',
            }}>
              Trusted by industry leaders
            </div>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 1,
                background: 'linear-gradient(to right, rgba(254,252,249,1), transparent)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 1,
                background: 'linear-gradient(to left, rgba(249,247,255,1), transparent)',
                pointerEvents: 'none',
              }} />
              <div className="hero-logos-track">
                {doubled.map((logo, i) => (
                  <div key={i} style={{
                    height: '52px', width: '140px', padding: '8px 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.55 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
