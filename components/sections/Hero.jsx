'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

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

const GLOBE_LOCATIONS = [
  { name: 'India',     lat:  20.59, lng:  78.96, primary: true  },
  { name: 'USA',       lat:  37.09, lng: -95.71, primary: false },
  { name: 'Canada',    lat:  56.13, lng: -106.35, primary: false },
  { name: 'Australia', lat: -25.27, lng:  133.78, primary: false },
]

export default function Hero() {
  const [priHov, setPriHov] = useState(false)
  const [secHov, setSecHov] = useState(false)
  const [mouse,  setMouse]  = useState({ x: 0.5, y: 0.5 })
  const heroRef  = useRef(null)
  const globeRef = useRef(null)

  // ── Orb parallax mouse tracking ──────────────────────────────────
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      setMouse({
        x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
        y: Math.max(0, Math.min(1, (e.clientY - r.top)  / r.height)),
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  // ── 3D Wireframe Globe ────────────────────────────────────────────
  useEffect(() => {
    const canvas  = globeRef.current
    const section = heroRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d')

    let size = canvas.offsetWidth
    const setSize = () => {
      size = canvas.offsetWidth
      canvas.width  = size
      canvas.height = size
    }
    setSize()

    // -- math helpers --
    const toSphere = (lat, lng) => {
      const phi   = (90 - lat) * Math.PI / 180
      const theta = lng * Math.PI / 180
      return {
        x:  Math.sin(phi) * Math.cos(theta),
        y:  Math.cos(phi),
        z:  Math.sin(phi) * Math.sin(theta),
      }
    }
    const rotY = (p, a) => {
      const c = Math.cos(a), s = Math.sin(a)
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c }
    }
    const rotX = (p, a) => {
      const c = Math.cos(a), s = Math.sin(a)
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c }
    }
    const project = (p, R, cx, cy) => ({
      x: cx + p.x * R,
      y: cy - p.y * R,
    })

    let rotAngle = 0
    let tiltX = 0, targetTiltX = 0

    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      targetTiltX = relY * 0.45
    }
    section.addEventListener('mousemove', onMove)

    const SEGS      = 80
    const LAT_LINES = 13
    const LNG_LINES = 18

    let raf
    const draw = () => {
      const S  = size
      const cx = S / 2, cy = S / 2
      const R  = S * 0.42

      ctx.clearRect(0, 0, S, S)

      // smooth tilt
      tiltX += (targetTiltX - tiltX) * 0.04

      const tf = (p) => rotX(rotY(p, rotAngle), tiltX)

      // ── sphere base glow (gives depth) ───────────────
      const sphereGrd = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.2, 0, cx, cy, R * 1.05)
      sphereGrd.addColorStop(0,   'rgba(200,220,255,0.22)')
      sphereGrd.addColorStop(0.6, 'rgba(99,130,246,0.10)')
      sphereGrd.addColorStop(1,   'rgba(15,52,96,0.04)')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = sphereGrd
      ctx.fill()

      // ── outer ring ───────────────────────────────────
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(59,130,246,0.35)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // ── latitude lines ──────────────────────────────
      for (let i = 1; i < LAT_LINES; i++) {
        const lat = -80 + i * 160 / LAT_LINES
        const phi = (90 - lat) * Math.PI / 180
        const y0  = Math.cos(phi), r0 = Math.sin(phi)

        for (let j = 0; j < SEGS; j++) {
          const a0 = (j / SEGS) * Math.PI * 2
          const a1 = ((j + 1) / SEGS) * Math.PI * 2
          const p0 = tf({ x: r0 * Math.cos(a0), y: y0, z: r0 * Math.sin(a0) })
          const p1 = tf({ x: r0 * Math.cos(a1), y: y0, z: r0 * Math.sin(a1) })
          const z   = (p0.z + p1.z) / 2
          const alpha = Math.max(0, (z + 1) / 2)
          if (alpha < 0.02) continue
          const bright = alpha * alpha * 0.85 + 0.08
          const pr0 = project(p0, R, cx, cy)
          const pr1 = project(p1, R, cx, cy)
          ctx.beginPath()
          ctx.moveTo(pr0.x, pr0.y)
          ctx.lineTo(pr1.x, pr1.y)
          ctx.strokeStyle = `rgba(59,130,246,${bright.toFixed(2)})`
          ctx.lineWidth = alpha > 0.7 ? 1.4 : 0.9
          ctx.stroke()
        }
      }

      // ── longitude lines ─────────────────────────────
      for (let i = 0; i < LNG_LINES; i++) {
        const lng = (i / LNG_LINES) * Math.PI * 2

        for (let j = 0; j < SEGS; j++) {
          const a0 = (j / SEGS - 0.5) * Math.PI
          const a1 = ((j + 1) / SEGS - 0.5) * Math.PI
          const p0 = tf({ x: Math.cos(a0) * Math.cos(lng), y: Math.sin(a0), z: Math.cos(a0) * Math.sin(lng) })
          const p1 = tf({ x: Math.cos(a1) * Math.cos(lng), y: Math.sin(a1), z: Math.cos(a1) * Math.sin(lng) })
          const z   = (p0.z + p1.z) / 2
          const alpha = Math.max(0, (z + 1) / 2)
          if (alpha < 0.02) continue
          const bright = alpha * alpha * 0.85 + 0.08
          const pr0 = project(p0, R, cx, cy)
          const pr1 = project(p1, R, cx, cy)
          ctx.beginPath()
          ctx.moveTo(pr0.x, pr0.y)
          ctx.lineTo(pr1.x, pr1.y)
          ctx.strokeStyle = `rgba(59,130,246,${bright.toFixed(2)})`
          ctx.lineWidth = alpha > 0.7 ? 1.4 : 0.9
          ctx.stroke()
        }
      }

      // ── equator highlight ────────────────────────────
      for (let j = 0; j < SEGS; j++) {
        const a0 = (j / SEGS) * Math.PI * 2
        const a1 = ((j + 1) / SEGS) * Math.PI * 2
        const p0 = tf({ x: Math.cos(a0), y: 0, z: Math.sin(a0) })
        const p1 = tf({ x: Math.cos(a1), y: 0, z: Math.sin(a1) })
        const alpha = Math.max(0, ((p0.z + p1.z) / 2 + 1) / 2)
        if (alpha < 0.02) continue
        const pr0 = project(p0, R, cx, cy)
        const pr1 = project(p1, R, cx, cy)
        ctx.beginPath()
        ctx.moveTo(pr0.x, pr0.y)
        ctx.lineTo(pr1.x, pr1.y)
        ctx.strokeStyle = `rgba(251,146,60,${(alpha * 0.75).toFixed(2)})`
        ctx.lineWidth = 2.0
        ctx.stroke()
      }

      // ── location dots ────────────────────────────────
      for (const loc of GLOBE_LOCATIONS) {
        const p     = tf(toSphere(loc.lat, loc.lng))
        if (p.z < -0.1) continue
        const alpha = Math.max(0, (p.z + 1) / 2)
        const pr    = project(p, R, cx, cy)
        const dotR  = loc.primary ? 7 : 4.5
        const glowR = loc.primary ? 32 : 20

        // outer glow halo
        const grd = ctx.createRadialGradient(pr.x, pr.y, 0, pr.x, pr.y, glowR)
        grd.addColorStop(0,   `rgba(254,151,0,${(alpha * 0.7).toFixed(2)})`)
        grd.addColorStop(0.4, `rgba(254,151,0,${(alpha * 0.35).toFixed(2)})`)
        grd.addColorStop(1,   'rgba(254,151,0,0)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(pr.x, pr.y, glowR, 0, Math.PI * 2)
        ctx.fill()

        // solid dot
        ctx.beginPath()
        ctx.arc(pr.x, pr.y, dotR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(254,151,0,${Math.min(1, alpha * 1.2).toFixed(2)})`
        ctx.fill()

        // white centre
        ctx.beginPath()
        ctx.arc(pr.x, pr.y, dotR * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`
        ctx.fill()

        // label
        if (alpha > 0.3) {
          ctx.font      = `${loc.primary ? 700 : 600} ${loc.primary ? 13 : 11}px Inter,sans-serif`
          ctx.fillStyle = `rgba(15,52,96,${Math.min(1, alpha * 1.1).toFixed(2)})`
          ctx.shadowColor = 'rgba(255,255,255,0.9)'
          ctx.shadowBlur  = 4
          ctx.fillText(loc.name, pr.x + dotR + 6, pr.y + 4)
          ctx.shadowBlur = 0
        }
      }

      rotAngle += 0.0035
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => setSize()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
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
        .hero-fade-5 { animation: heroFadeUp 0.75s ease 0.5s  both; }
        .hero-logos-track {
          display: flex; width: max-content;
          will-change: transform;
          animation: heroMarquee 32s linear infinite;
        }
        .hero-metrics {
          display: grid; grid-template-columns: repeat(4,1fr);
          margin-top: 36px; margin-bottom: 36px;
          background: rgba(255,255,255,0.45);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.85); border-radius: 16px;
          box-shadow: 0 4px 24px rgba(15,52,96,0.08), inset 0 1px 0 rgba(255,255,255,0.95);
        }
        .hero-two-col {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
          max-width: 1440px; margin: 0 auto;
          position: relative; z-index: 1;
          padding: 0 40px;
        }
        .hero-globe-wrap {
          display: flex; align-items: center; justify-content: center;
        }
        .hero-globe {
          width: 100%; max-width: 500px;
          aspect-ratio: 1 / 1; display: block;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-1,.hero-fade-2,.hero-fade-3,.hero-fade-4,.hero-fade-5 {
            animation: none !important; opacity: 1 !important;
          }
          .hero-logos-track { animation: none !important; }
        }
        @media (max-width: 960px) {
          .hero-two-col { grid-template-columns: 1fr; gap: 32px; padding: 0 24px; }
          .hero-globe   { max-width: 320px; margin: 0 auto; }
          .hero-section { padding: 64px 0 56px !important; }
          .hero-metrics { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 480px) {
          .hero-globe   { max-width: 260px; }
          .hero-section { padding: 48px 0 40px !important; }
        }
      `}</style>

      <section ref={heroRef} className="hero-section" style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%)',
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orb 1 — blue-purple, top-right */}
        <div style={{
          position: 'absolute', top: '-300px', right: '-300px',
          width: '900px', height: '900px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(99,130,255,0.35) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)',
          filter: 'blur(20px)',
          transform: `translate(${(mouse.x - 0.5) * -60}px, ${(mouse.y - 0.5) * -40}px)`,
          transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        {/* Orb 2 — amber-orange, bottom-left */}
        <div style={{
          position: 'absolute', bottom: '-200px', left: '-250px',
          width: '800px', height: '800px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(251,146,60,0.30) 0%, rgba(245,158,11,0.15) 40%, transparent 70%)',
          filter: 'blur(20px)',
          transform: `translate(${(mouse.x - 0.5) * 45}px, ${(mouse.y - 0.5) * 35}px)`,
          transition: 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        {/* Orb 3 — teal, mid-left */}
        <div style={{
          position: 'absolute', top: '50%', left: '-150px',
          width: '600px', height: '600px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(20,184,166,0.20) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transform: `translateY(-50%) translate(${(mouse.x - 0.5) * -30}px, ${(mouse.y - 0.5) * 55}px)`,
          transition: 'transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />

        {/* ── Two-column layout ─────────────────────────── */}
        <div className="hero-two-col">

          {/* Left: text content */}
          <div className="hero-fade-1">
            <h1 style={{
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              fontWeight: 900, lineHeight: 1.1,
              marginBottom: '20px', letterSpacing: '-1.5px',
              background: 'linear-gradient(90deg, #0F3460 0%, #D97706 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              We build Brands That Scale &amp; Generate Revenue.
            </h1>

            <p className="hero-fade-2" style={{
              fontSize: '17px', color: '#3A507A',
              maxWidth: '540px', lineHeight: 1.8, margin: '0 0 0 0',
            }}>
              Tired of juggling multiple agencies? We combine strategy, design,
              development, and marketing into one powerful system — faster launches,
              lower costs, measurable growth.
            </p>

            {/* Metrics */}
            <div className="hero-fade-3 hero-metrics">
              {metrics.map((m, i) => (
                <div key={m.label} style={{
                  textAlign: 'center', padding: '20px 16px',
                  borderRight: i < metrics.length - 1 ? '1px solid rgba(15,52,96,0.10)' : 'none',
                }}>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#D97706', marginBottom: '4px', lineHeight: 1, letterSpacing: '-1px' }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: '11px', color: '#4A6080', fontWeight: 600, lineHeight: 1.4, letterSpacing: '0.3px' }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-fade-4" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href="/contact-us"
                onMouseEnter={() => setPriHov(true)}
                onMouseLeave={() => setPriHov(false)}
                style={{
                  background: priHov ? 'linear-gradient(135deg, #0F3460 0%, #1a5c99 100%)' : '#0F3460',
                  color: '#fff', padding: '15px 32px',
                  fontSize: '15px', fontWeight: 600, borderRadius: '24px',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  boxShadow: priHov ? '0 10px 32px rgba(15,52,96,0.4)' : '0 4px 16px rgba(15,52,96,0.2)',
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
                  color: '#fff', padding: '13px 30px',
                  fontSize: '15px', fontWeight: 600, borderRadius: '24px',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  border: '2px solid #FE9700',
                  boxShadow: '0 10px 28px rgba(254,151,0,0.28)',
                  transform: 'translateY(-2px)',
                  textDecoration: 'none', transition: 'all 0.3s ease',
                } : {
                  background: 'white', color: '#0F3460', padding: '13px 30px',
                  fontSize: '15px', fontWeight: 600, borderRadius: '24px',
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

          {/* Right: 3D Globe */}
          <div className="hero-globe-wrap hero-fade-5">
            <canvas ref={globeRef} className="hero-globe" />
          </div>

        </div>

        {/* ── Scrolling Client Logos ───────────────────── */}
        <div style={{ width: '100%', marginTop: '60px' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            <div style={{
              textAlign: 'center', fontSize: '11px', fontWeight: 700,
              textTransform: 'uppercase', color: '#9ca3af',
              letterSpacing: '2px', marginBottom: '24px',
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
                      src={logo.src} alt={logo.alt}
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
