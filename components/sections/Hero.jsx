'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

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
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const heroRef = useRef(null)
  const canvasRef = useRef(null)

  // Orb parallax mouse tracking
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      setMouse({
        x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
        y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  // Canvas particle network
  useEffect(() => {
    const canvas = canvasRef.current
    const section = heroRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resize()

    const PALETTE = [
      [99, 130, 255], [251, 146, 60], [20, 184, 166],
      [139, 92, 246], [245, 158, 11], [59, 130, 246],
    ]

    const pts = Array.from({ length: 65 }, () => {
      const [cr, cg, cb] = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        rad: Math.random() * 2.5 + 1.8,
        cr, cg, cb,
      }
    })

    let mx = canvas.width / 2, my = canvas.height / 2
    const LINK = 140

    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    section.addEventListener('mousemove', onMove)

    let raf
    const draw = () => {
      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)

      for (const p of pts) {
        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 130 && d > 0) {
          const f = ((130 - d) / 130) * 0.18
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
        // Dampen + cap speed
        p.vx *= 0.97; p.vy *= 0.97
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 2.2) { p.vx = p.vx / spd * 2.2; p.vy = p.vy / spd * 2.2 }
        // Move + bounce
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > w) { p.x = w; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > h) { p.y = h; p.vy *= -1 }
        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.rad, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},0.85)`
        ctx.fill()
      }

      // Draw connecting lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(80,110,210,${(1 - d / LINK) * 0.22})`
            ctx.lineWidth = 0.9
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
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
          display: flex;
          width: max-content;
          will-change: transform;
          animation: heroMarquee 32s linear infinite;
        }
        .hero-metrics {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          margin-top: 44px;
          margin-bottom: 44px;
          background: rgba(255,255,255,0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(15,52,96,0.08), inset 0 1px 0 rgba(255,255,255,0.95);
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
        background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%)',
        padding: '100px 40px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orb 1 — blue-purple, top-right, parallax depth 1 */}
        <div style={{
          position: 'absolute', top: '-300px', right: '-300px',
          width: '900px', height: '900px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(99,130,255,0.35) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)',
          filter: 'blur(20px)',
          transform: `translate(${(mouse.x - 0.5) * -60}px, ${(mouse.y - 0.5) * -40}px)`,
          transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        {/* Orb 2 — amber-orange, bottom-left, parallax depth 2 */}
        <div style={{
          position: 'absolute', bottom: '-200px', left: '-250px',
          width: '800px', height: '800px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(251,146,60,0.30) 0%, rgba(245,158,11,0.15) 40%, transparent 70%)',
          filter: 'blur(20px)',
          transform: `translate(${(mouse.x - 0.5) * 45}px, ${(mouse.y - 0.5) * 35}px)`,
          transition: 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        {/* Orb 3 — teal, mid-left, parallax depth 3 */}
        <div style={{
          position: 'absolute', top: '50%', left: '-150px',
          width: '600px', height: '600px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(20,184,166,0.20) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transform: `translateY(-50%) translate(${(mouse.x - 0.5) * -30}px, ${(mouse.y - 0.5) * 55}px)`,
          transition: 'transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />

        {/* Cursor spotlight */}
        <div style={{
          position: 'absolute', pointerEvents: 'none', zIndex: 0,
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 65%)',
          left: `calc(${mouse.x * 100}% - 250px)`,
          top: `calc(${mouse.y * 100}% - 250px)`,
          transition: 'left 0.12s ease-out, top 0.12s ease-out',
        }} />

        {/* Particle network canvas */}
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Headline */}
          <h1 className="hero-fade-1" style={{
            fontSize: 'clamp(40px, 5.5vw, 64px)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-1.5px',
            background: 'linear-gradient(90deg, #0F3460 0%, #D97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            We build Brands That Scale &amp; Generate Revenue.
          </h1>

          {/* Subheading */}
          <p className="hero-fade-2" style={{
            fontSize: '18px', color: '#3A507A', marginBottom: '0',
            maxWidth: '680px', margin: '0 auto', lineHeight: 1.8,
          }}>
            Tired of juggling multiple agencies? We combine strategy, design, development, and marketing
            into one powerful system — faster launches, lower costs, measurable growth.
          </p>

          {/* Metrics */}
          <div className="hero-fade-3 hero-metrics">
            {metrics.map((m, i) => (
              <div key={m.label} style={{
                textAlign: 'center',
                padding: '24px 20px',
                borderRight: i < metrics.length - 1 ? '1px solid rgba(15,52,96,0.10)' : 'none',
              }}>
                <div style={{
                  fontSize: '36px', fontWeight: 900, color: '#D97706',
                  marginBottom: '6px', lineHeight: 1, letterSpacing: '-1px',
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '12px', color: '#4A6080', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0.3px' }}>
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
                background: 'linear-gradient(to right, #dbeafe, transparent)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 1,
                background: 'linear-gradient(to left, #fce7f3, transparent)',
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
