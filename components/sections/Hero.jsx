'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import AuroraText from '../ui/AuroraText'

const metrics = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '16+',  label: 'Years Experience' },
  { value: '97%',  label: 'Client Retention' },
  { value: '25+',  label: 'Countries Served' },
]

const clientLogos = [
  { src: '/logo/Indian_Express_Logo_full.png',            alt: 'Indian Express' },
  { src: '/logo/PHDCCI-Logo-2024.png',                    alt: 'PHDCCI' },
  { src: '/logo/Zuari-Finserv-logo-new.png',              alt: 'Zuari Finserv' },
  { src: '/logo/Wilson-logo.svg.png',                     alt: 'Wilson' },
  { src: '/logo/Verizon_2015_logo_-vector.svg.png',       alt: 'Verizon' },
  { src: '/logo/ICCoLogo.png',                            alt: 'ICC' },
  { src: '/logo/Honor_Logo_(2020).svg.png',               alt: 'Honor' },
  { src: '/logo/Uniphore.jpg',                            alt: 'Uniphore' },
  { src: '/logo/Nuance-Symbol-500x281.png',               alt: 'Nuance' },
  { src: '/logo/amarujala-print-logo_60e03f7d5b4a8.webp', alt: 'Amar Ujala' },
]

const doubled = [...clientLogos, ...clientLogos]

export default function Hero() {
  const [priHov, setPriHov] = useState(false)
  const [secHov, setSecHov] = useState(false)
  const heroRef = useRef(null)

  // Vanta Waves
  useEffect(() => {
    let vantaEffect = null

    const loadScript = (src) => new Promise((resolve) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
      const s = document.createElement('script')
      s.src = src
      s.onload = resolve
      document.head.appendChild(s)
    })

    const init = async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
      await loadScript('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js')
      if (window.VANTA && heroRef.current) {
        vantaEffect = window.VANTA.WAVES({
          el: heroRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0a2a50,
          shininess: 50,
          waveHeight: 20,
          waveSpeed: 0.65,
          zoom: 0.85,
        })
      }
    }

    init()
    return () => { if (vantaEffect) vantaEffect.destroy() }
  }, [])

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
          display: flex; width: max-content;
          will-change: transform;
          animation: heroMarquee 32s linear infinite;
        }
        .hero-metrics {
          display: grid; grid-template-columns: repeat(4,1fr);
          margin-top: 44px; margin-bottom: 44px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.18); border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.2);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-1,.hero-fade-2,.hero-fade-3,.hero-fade-4 {
            animation: none !important; opacity: 1 !important;
          }
          .hero-logos-track { animation: none !important; }
        }
        @media (max-width: 768px) {
          .hero-section { padding: 64px 20px 56px !important; }
          .hero-metrics { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 56px 16px 48px !important; }
        }
      `}</style>

      <section ref={heroRef} className="hero-section" style={{
        background: '#0a2a50',
        padding: '100px 40px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Headline */}
          <h1 className="hero-fade-1" style={{ fontSize: 'clamp(36px, 4.5vw, 62px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-1.5px' }}>
            <AuroraText>We build Brands That Scale &amp; Generate Revenue.</AuroraText>
          </h1>

          {/* Subheading */}
          <p className="hero-fade-2" style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.78)',
            maxWidth: '680px', lineHeight: 1.8, margin: '0 auto',
          }}>
            Tired of juggling multiple agencies? We combine strategy, design,
            development, and marketing into one powerful system — faster launches,
            lower costs, measurable growth.
          </p>

          {/* Metrics */}
          <div className="hero-fade-3 hero-metrics">
            {metrics.map((m, i) => (
              <div key={m.label} style={{
                textAlign: 'center', padding: '22px 16px',
                borderRight: i < metrics.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#FE9700', marginBottom: '4px', lineHeight: 1, letterSpacing: '-1px' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.3px' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-fade-4" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact-us"
              onMouseEnter={() => setPriHov(true)}
              onMouseLeave={() => setPriHov(false)}
              style={{
                background: priHov
                  ? 'linear-gradient(135deg, #FE9700 0%, #e68500 100%)'
                  : 'linear-gradient(135deg, #FE9700 0%, #F59E0B 100%)',
                color: '#fff', padding: '15px 32px',
                fontSize: '15px', fontWeight: 700, borderRadius: '28px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: priHov ? '0 12px 32px rgba(254,151,0,0.45)' : '0 6px 20px rgba(254,151,0,0.3)',
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
              style={{
                background: 'transparent',
                color: secHov ? '#FE9700' : '#fff',
                padding: '13px 30px',
                fontSize: '15px', fontWeight: 600, borderRadius: '28px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                border: secHov ? '2px solid #FE9700' : '2px solid rgba(255,255,255,0.45)',
                boxShadow: secHov ? '0 0 0 3px rgba(254,151,0,0.15)' : 'none',
                transform: secHov ? 'translateY(-2px)' : 'translateY(0)',
                textDecoration: 'none', transition: 'all 0.3s ease',
              }}
            >
              View Our Work
            </Link>
          </div>

        </div>

        {/* Scrolling Client Logos */}
        <div style={{ width: '100%', marginTop: '72px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              textAlign: 'center', fontSize: '11px', fontWeight: 700,
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
              letterSpacing: '2px', marginBottom: '24px',
            }}>
              Trusted by industry leaders
            </div>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', zIndex: 1,
                background: 'linear-gradient(to right, #0a2a50, transparent)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', zIndex: 1,
                background: 'linear-gradient(to left, #0a2a50, transparent)',
                pointerEvents: 'none',
              }} />
              <div className="hero-logos-track">
                {doubled.map((logo, i) => (
                  <div key={i} style={{
                    height: '48px', width: '140px', padding: '8px 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <img
                      src={logo.src} alt={logo.alt}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(1) invert(1)', opacity: 0.55 }}
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
