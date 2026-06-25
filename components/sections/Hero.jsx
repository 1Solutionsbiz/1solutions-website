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

function withAlpha(hex, a) {
  if (hex.startsWith('#')) {
    let r, g, b
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16)
      g = parseInt(hex[2] + hex[2], 16)
      b = parseInt(hex[3] + hex[3], 16)
    } else {
      r = parseInt(hex.slice(1, 3), 16)
      g = parseInt(hex.slice(3, 5), 16)
      b = parseInt(hex.slice(5, 7), 16)
    }
    return `rgba(${r},${g},${b},${a})`
  }
  return hex
}

export default function Hero() {
  const [priHov, setPriHov] = useState(false)
  const [secHov, setSecHov] = useState(false)
  const heroRef   = useRef(null)
  const canvasRef = useRef(null)

  // Node-graph background — ported from performativeUI NodeGraphBackground
  useEffect(() => {
    const host   = heroRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DENSITY        = 70
    const SPEED          = 0.4
    const LINK_DISTANCE  = 140
    const COLORS         = ['#a78bfa', '#f0abfc', '#67e8f9']
    const LINK_COLOR     = '#7c3aed'
    const HOVER_DIST     = 200
    const HOVER_GRAVITY  = 0.005
    const HOVER_BRIGHTEN = 0.8
    const BASE_OPACITY   = 0.45
    const OVERSCAN       = 80

    let width = 0, height = 0, dpr = 1
    const mouse = { x: -9999, y: -9999 }
    let raf   = 0
    let nodes = []

    const seed = () => {
      nodes = Array.from({ length: DENSITY }, () => ({
        x:     -OVERSCAN + Math.random() * (width  + OVERSCAN * 2),
        y:     -OVERSCAN + Math.random() * (height + OVERSCAN * 2),
        vx:    (Math.random() - 0.5) * SPEED * 2,
        vy:    (Math.random() - 0.5) * SPEED * 2,
        r:     1 + Math.random() * 1.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      dpr    = Math.min(window.devicePixelRatio || 1, 2)
      width  = rect.width
      height = rect.height
      canvas.width  = width  * dpr
      canvas.height = height * dpr
      canvas.style.width  = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const brighten = (px, py) => {
      if (mouse.x <= -9000 || HOVER_DIST <= 0 || HOVER_BRIGHTEN <= 0) return 0
      const d = Math.hypot(mouse.x - px, mouse.y - py)
      return d >= HOVER_DIST ? 0 : (1 - d / HOVER_DIST) * HOVER_BRIGHTEN
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      const mouseActive = mouse.x > -9000

      // move nodes + cursor gravity
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -OVERSCAN || n.x > width  + OVERSCAN) n.vx *= -1
        if (n.y < -OVERSCAN || n.y > height + OVERSCAN) n.vy *= -1
        if (mouseActive && HOVER_GRAVITY > 0) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const d  = Math.hypot(dx, dy)
          if (d < HOVER_DIST) {
            const pull = (1 - d / HOVER_DIST) * HOVER_GRAVITY
            n.x += dx * pull
            n.y += dy * pull
          }
        }
      }

      // draw links
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dl = Math.hypot(a.x - b.x, a.y - b.y)
          if (dl < LINK_DISTANCE) {
            const la    = 1 - dl / LINK_DISTANCE
            const boost = brighten((a.x + b.x) / 2, (a.y + b.y) / 2)
            ctx.strokeStyle = withAlpha(LINK_COLOR, Math.min(1, la * BASE_OPACITY + boost * la))
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // draw nodes
      for (const n of nodes) {
        const boost = brighten(n.x, n.y)
        ctx.fillStyle = withAlpha(n.color, Math.min(1, BASE_OPACITY + boost))
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    const onMove  = (e) => {
      const rect = host.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    resize()
    host.addEventListener('mousemove',  onMove)
    host.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      host.removeEventListener('mousemove',  onMove)
      host.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes heroStagger {
          0%   { opacity: 0; filter: blur(12px); transform: translateY(40px) scale(0.96); }
          55%  { filter: blur(0px); }
          100% { opacity: 1; filter: blur(0px); transform: translateY(0) scale(1); }
        }
        @keyframes heroMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-stagger-1 { animation: heroStagger 0.8s cubic-bezier(0.22,1,0.36,1) 0.08s both; }
        .hero-stagger-2 { animation: heroStagger 0.8s cubic-bezier(0.22,1,0.36,1) 0.22s both; }
        .hero-stagger-3 { animation: heroStagger 0.8s cubic-bezier(0.22,1,0.36,1) 0.37s both; }
        .hero-stagger-4 { animation: heroStagger 0.8s cubic-bezier(0.22,1,0.36,1) 0.52s both; }
        .hero-stagger-5 { animation: heroStagger 0.8s cubic-bezier(0.22,1,0.36,1) 0.68s both; }
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
          .hero-stagger-1,.hero-stagger-2,.hero-stagger-3,.hero-stagger-4,.hero-stagger-5 {
            animation: none !important; opacity: 1 !important; filter: none !important; transform: none !important;
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

        {/* Node-graph canvas */}
        <canvas ref={canvasRef} aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none', display: 'block',
        }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          <h1 className="hero-stagger-1" style={{ fontSize: 'clamp(36px, 4.5vw, 62px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-1.5px', color: '#fff' }}>
            We build Brands That Scale &amp; Generate Revenue.
          </h1>

          <p className="hero-stagger-2" style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.78)',
            maxWidth: '680px', lineHeight: 1.8, margin: '0 auto',
          }}>
            Tired of juggling multiple agencies? We combine strategy, design,
            development, and marketing into one powerful system — faster launches,
            lower costs, measurable growth.
          </p>

          <div className="hero-stagger-3 hero-metrics">
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

          <div className="hero-stagger-4" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
        <div className="hero-stagger-5" style={{ width: '100%', marginTop: '72px', position: 'relative', zIndex: 1 }}>
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
