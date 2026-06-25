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

// Aurora blob definitions
const BLOBS = [
  { color: 'rgba(124,58,237,0.55)',  x: 20, y: 30, size: 65 },
  { color: 'rgba(236,72,153,0.45)',  x: 80, y: 25, size: 55 },
  { color: 'rgba(6,182,212,0.40)',   x: 50, y: 80, size: 55 },
  { color: 'rgba(254,151,0,0.30)',   x: 65, y: 50, size: 48 },
]

// ASCII field config (AsciiHero "bare" variant settings)
const CHAR_RAMP = " .`'\",:;Il!i><~+_-?][}{z1)(|/tfjrxnuvczXYUJCLTQ0OZmwqpdbkhaos*#MW&8%B@$"
const PALETTE   = ['#a78bfa', '#ec8499', '#67e8f9', '#fbbf24']

export default function Hero() {
  const [priHov, setPriHov] = useState(false)
  const [secHov, setSecHov] = useState(false)
  const heroRef   = useRef(null)
  const blobRefs  = useRef([])
  const canvasRef = useRef(null)

  // Layer 1 — Aurora lava-lamp blobs (direct DOM mutations)
  useEffect(() => {
    const REPULSION = 0.18
    const state = BLOBS.map((b) => ({
      x: b.x, y: b.y,
      homeX: b.x, homeY: b.y,
      size: b.size,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
    }))

    let raf = 0
    const tick = () => {
      for (let i = 0; i < state.length; i++) {
        const b = state[i]
        b.vx *= 0.965
        b.vy *= 0.965
        b.vx += (b.homeX - b.x) * 0.0009
        b.vy += (b.homeY - b.y) * 0.0009
        for (let j = 0; j < state.length; j++) {
          if (i === j) continue
          const o = state[j]
          const dx = b.x - o.x, dy = b.y - o.y
          const d = Math.hypot(dx, dy)
          const minDist = (b.size + o.size) * 0.4
          if (d < minDist && d > 0.001) {
            const force = ((minDist - d) / minDist) * REPULSION
            b.vx += (dx / d) * force
            b.vy += (dy / d) * force
          }
        }
        b.vx += (Math.random() - 0.5) * 0.012
        b.vy += (Math.random() - 0.5) * 0.012
        b.x += b.vx; b.y += b.vy
        if (b.x < -10) { b.x = -10; b.vx =  Math.abs(b.vx) * 0.6 }
        if (b.x > 110)  { b.x =  110; b.vx = -Math.abs(b.vx) * 0.6 }
        if (b.y < -10) { b.y = -10; b.vy =  Math.abs(b.vy) * 0.6 }
        if (b.y > 110)  { b.y =  110; b.vy = -Math.abs(b.vy) * 0.6 }
        const el = blobRefs.current[i]
        if (el) { el.style.left = `${b.x}%`; el.style.top = `${b.y}%` }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Layer 2 — AsciiHero bare variant (canvas over Aurora)
  useEffect(() => {
    const canvas = canvasRef.current
    const host   = heroRef.current
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0, lastFrame = 0
    let cols = 0, rows = 0, cellW = 0, cellH = 0
    let baseField = new Float32Array(0)
    const mouse = { x: -9999, y: -9999 }

    const FONT_SIZE         = 11
    const FONT_FAMILY       = 'JetBrains Mono, ui-monospace, monospace'
    const BASE_OPACITY      = 0.18
    const SPOTLIGHT_OPACITY = 0.9
    const SPOTLIGHT_RADIUS  = 10
    const RIPPLE_STRENGTH   = 1.4
    const RIPPLE_RADIUS     = 6
    const FRAME_MS          = 50

    const seed = () => {
      baseField = new Float32Array(cols * rows)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = (x / cols) * 2 - 1
          const ny = (y / rows) * 2 - 1
          const r  = Math.sqrt(nx * nx + ny * ny)
          baseField[y * cols + x] = 0.25 * (0.5 + 0.5 * Math.sin(nx * 6 + ny * 2)) + 0.55 * (1 - Math.min(1, r * 1.2))
        }
      }
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = Math.floor(rect.width  * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`
      ctx.textBaseline = 'top'
      cellW = ctx.measureText('M').width || FONT_SIZE * 0.6
      cellH = FONT_SIZE * 1.15
      cols  = Math.max(1, Math.floor(rect.width  / cellW))
      rows  = Math.max(1, Math.floor(rect.height / cellH))
      seed()
    }

    const render = (t) => {
      if (t - lastFrame < FRAME_MS) { raf = requestAnimationFrame(render); return }
      lastFrame = t
      if (!cols || !rows) { resize(); raf = requestAnimationFrame(render); return }

      const time = t * 0.001
      const rect = canvas.getBoundingClientRect()
      const cx   = (mouse.x - rect.left) / cellW
      const cy   = (mouse.y - rect.top)  / cellH
      const margin = 24
      const inside =
        mouse.x >= rect.left - margin && mouse.x <= rect.right  + margin &&
        mouse.y >= rect.top  - margin && mouse.y <= rect.bottom + margin

      ctx.clearRect(0, 0, rect.width, rect.height)
      const rampMax = CHAR_RAMP.length - 1
      const spotR2  = SPOTLIGHT_RADIUS * SPOTLIGHT_RADIUS * 2

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const wave = 0.15 * Math.sin(x * 0.18 + time * 1.4) * Math.cos(y * 0.22 - time * 1.1)
          const dx = x - cx, dy = (y - cy) * 1.8
          const d2 = dx * dx + dy * dy, d = Math.sqrt(d2)
          const ripple = inside
            ? RIPPLE_STRENGTH * Math.exp(-d2 / 80) - 0.6 * Math.exp(-(((d - RIPPLE_RADIUS) ** 2) / 30))
            : 0
          const v  = Math.max(0, Math.min(1, baseField[y * cols + x] + wave + ripple))
          const ch = CHAR_RAMP[Math.floor(v * rampMax)]
          if (ch === ' ') continue

          let alpha = BASE_OPACITY
          if (inside) {
            alpha = BASE_OPACITY + (SPOTLIGHT_OPACITY - BASE_OPACITY) * Math.exp(-d2 / spotR2)
            alpha = Math.max(0, Math.min(1, alpha))
          }
          if (alpha <= 0.01) continue

          const huePos = (x * 0.1 + y * 0.07 + time * 0.12) % PALETTE.length
          ctx.globalAlpha = alpha
          ctx.fillStyle   = PALETTE[Math.floor(Math.abs(huePos)) % PALETTE.length]
          ctx.fillText(ch, x * cellW, y * cellH)
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    resize()
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
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

        {/* Layer 1 — Aurora lava-lamp blobs */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: '-20%',
          zIndex: 0, pointerEvents: 'none',
          filter: 'blur(60px) saturate(150%)',
        }}>
          {BLOBS.map((b, i) => (
            <div key={i} ref={el => { blobRefs.current[i] = el }} style={{
              position: 'absolute',
              left: `${b.x}%`, top: `${b.y}%`,
              width: `${b.size}%`, height: `${b.size}%`,
              background: `radial-gradient(circle at center, ${b.color} 0%, transparent 70%)`,
              transform: 'translate(-50%,-50%)',
              pointerEvents: 'none', borderRadius: '50%',
            }} />
          ))}
        </div>

        {/* Layer 2 — AsciiHero bare variant canvas */}
        <canvas ref={canvasRef} aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 1, pointerEvents: 'none', display: 'block',
        }} />

        {/* Content */}
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

          <h1 className="hero-stagger-1" style={{ fontSize: 'clamp(36px, 4.5vw, 62px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-1.5px', color: '#fff' }}>
            We Engineer Products.<br />We Drive Growth.
          </h1>

          <p className="hero-stagger-2" style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.78)',
            maxWidth: '680px', lineHeight: 1.8, margin: '0 auto',
          }}>
            From custom web &amp; mobile platforms to performance marketing and SEO —
            one team that builds your technology and scales your revenue.
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
        <div className="hero-stagger-5" style={{ width: '100%', marginTop: '72px', position: 'relative', zIndex: 2 }}>
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
