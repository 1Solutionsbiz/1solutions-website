'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import AuroraText from '../ui/AuroraText'

const stories = [
  {
    company: 'AI+ SmartPhones', industry: 'Consumer Electronics / eCommerce',
    desc: 'Full-featured Shopify store for AI+ SmartPhones — a consumer electronics brand selling Nova series 5G smartphones, NovaPods, and NovaWatches across India.',
    tags: ['Shopify', 'Liquid', 'UI/UX Design'],
    img: '/images/work-aiplusstore.png',
  },
  {
    company: 'Comtradesol Advisory', industry: 'Financial Services',
    desc: 'Corporate website for Comtradesol Advisory Services — a Gurgaon-based firm offering trade finance, debt syndication, equity advisory, and credit rating solutions.',
    tags: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    img: '/images/work-comtradesol.png',
  },
  {
    company: 'Keiyura Jewellery', industry: 'Fashion & Jewellery / eCommerce',
    desc: 'Elegant Shopify store for a handcrafted jewellery brand — featuring lookbooks, curated collections, and a storytelling-led shopping experience.',
    tags: ['Shopify', 'Liquid', 'UI/UX Design'],
    img: '/images/work-keiyura.png',
  },
  {
    company: 'Mount Systems', industry: 'IT & Security Solutions',
    desc: 'Corporate website for Mount Systems — a complete IT and security solutions provider offering end-to-end technology and security services to businesses.',
    tags: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    img: '/images/work-mountsystems.png',
  },
  {
    company: 'RNG Foundation', industry: 'Media & Journalism',
    desc: "Award portal for India's most prestigious journalism honours — the Ramnath Goenka Excellence in Journalism Awards, administered by the Indian Express Group.",
    tags: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    img: '/images/work-rng.png',
  },
  {
    company: 'Samsin Streetwear', industry: 'Fashion & Apparel / eCommerce',
    desc: 'Minimalist Shopify store for a streetwear label selling tops, bottoms, and headwear — with VIP subscriber access and flash-sale promotions.',
    tags: ['Shopify', 'Liquid', 'Email Marketing'],
    img: '/images/work-shopsamsin.png',
  },
  {
    company: 'Skin Laser Centre', industry: 'Healthcare / Dermatology',
    desc: "Clinical website for Dr. Paul's Skin Laser Centre, Delhi — a 23-year-old dermatology practice specialising in vitiligo, acne, hair transplants, and advanced laser treatments.",
    tags: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    img: '/images/work-skinlaser.png',
  },
]

const growthStats = [
  { value: '500+', label: 'Successful projects delivered worldwide',  image: '/images/Partner-with-us.jpg', color: null },
  { value: '15+',  label: 'Years of Experience',                       image: '/images/office.png',          color: null },
  { value: '200+', label: 'Satisfied clients across 25+ countries',    image: '/images/Partner-with-us.jpg', color: null },
]

export default function WhyUs() {
  const [growthInView, setGrowthInView] = useState(false)
  const growthRef = useRef(null)

  useEffect(() => {
    const el = growthRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setGrowthInView(true) },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const blurFade = (delay) => ({
    opacity:   growthInView ? 1 : 0,
    filter:    growthInView ? 'blur(0px)' : 'blur(14px)',
    transform: growthInView ? 'translateY(0)' : 'translateY(28px)',
    transition: 'opacity 0.65s ease, filter 0.65s ease, transform 0.65s ease',
    transitionDelay: `${delay}s`,
  })

  return (
    <>
      <style>{`
        /* ── Portfolio ── */
        .pf-section { background: linear-gradient(150deg,#07102a 0%,#0c1c44 55%,#0f1e3e 100%); padding: 88px 40px; overflow: hidden; }
        .pf-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 40px; }
        .pf-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,.4); margin: 0 0 12px; }
        .pf-heading { font-size: clamp(28px,3.2vw,46px); font-weight: 900; margin: 0; letter-spacing: -.5px; line-height: 1.15; }
        .pf-explore { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: rgba(255,255,255,.85); text-decoration: none; white-space: nowrap; padding: 12px 24px; border-radius: 8px; border: 1.5px solid rgba(255,255,255,.18); transition: all .25s; flex-shrink: 0; }
        .pf-explore:hover { border-color: #FE9700; color: #FE9700; }

        /* Bento rows */
        .pf-row1 { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; height: 430px; margin-bottom: 10px; }
        .pf-row2 { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; height: 280px; }

        /* Card base */
        .pf-card { position: relative; border-radius: 14px; overflow: hidden; }
        .pf-card-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .65s cubic-bezier(.22,1,.36,1); }
        .pf-card:hover .pf-card-img { transform: scale(1.08); }

        /* Number badge */
        .pf-num { position: absolute; top: 14px; left: 14px; z-index: 3; min-width: 32px; height: 32px; padding: 0 8px; border-radius: 20px; background: rgba(255,255,255,.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,.18); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: rgba(255,255,255,.7); letter-spacing: .5px; }

        /* Bottom label (default visible) */
        .pf-bottom { position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; background: linear-gradient(transparent,rgba(4,9,22,.88) 100%); padding: 40px 18px 18px; transition: opacity .3s; }
        .pf-card:hover .pf-bottom { opacity: 0; }
        .pf-industry { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,.5); margin-bottom: 4px; }
        .pf-company { font-size: 16px; font-weight: 700; color: #fff; }

        /* Hover overlay */
        .pf-overlay { position: absolute; inset: 0; z-index: 4; background: rgba(5,12,35,.93); padding: 22px; display: flex; flex-direction: column; justify-content: flex-end; opacity: 0; transition: opacity .3s cubic-bezier(.22,1,.36,1); }
        .pf-card:hover .pf-overlay { opacity: 1; }
        .pf-otags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
        .pf-otag { font-size: 10px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; padding: 3px 9px; border-radius: 4px; background: rgba(254,151,0,.15); color: #FE9700; border: 1px solid rgba(254,151,0,.25); }
        .pf-oname { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 7px; letter-spacing: -.3px; }
        .pf-odesc { font-size: 12px; color: rgba(255,255,255,.6); line-height: 1.65; margin: 0 0 14px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .pf-olink { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 700; color: #FE9700; text-decoration: none; width: fit-content; }
        .pf-olink:hover { color: #fff; }

        /* ── Growth Story ── */
        .whyus-growth-sec { padding: 88px 40px; }
        .whyus-facts-layout { display: grid; grid-template-columns: 280px 1fr; gap: 48px; align-items: flex-start; }
        .whyus-stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; padding: 20px; margin: -20px; }

        /* Responsive */
        @media (max-width:1100px) {
          .pf-row1 { grid-template-columns: 1fr 1fr; height: auto; }
          .pf-row1 .pf-card:first-child { grid-column: span 2; height: 340px; }
          .pf-row1 .pf-card:not(:first-child) { height: 220px; }
          .pf-row2 { grid-template-columns: repeat(2,1fr); height: auto; }
          .pf-row2 .pf-card { height: 210px; }
        }
        @media (max-width:768px) {
          .pf-section { padding: 64px 24px; }
          .pf-header { flex-direction: column; align-items: flex-start; }
          .pf-row1 { grid-template-columns: 1fr; }
          .pf-row1 .pf-card { grid-column: span 1 !important; height: 240px !important; }
          .pf-row2 { grid-template-columns: 1fr 1fr; }
          .pf-row2 .pf-card { height: 180px; }
          .whyus-growth-sec { padding: 64px 24px; }
          .whyus-facts-layout { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width:500px) {
          .pf-row2 { grid-template-columns: 1fr; }
          .pf-row2 .pf-card { height: 200px; }
          .whyus-stats-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion:reduce) {
          .pf-card-img,.pf-overlay,.pf-bottom { transition: none !important; }
          .whyus-stat-item { transition: none !important; opacity: 1 !important; filter: none !important; transform: none !important; }
        }
      `}</style>

      {/* ── Portfolio Bento Grid ── */}
      <section id="portfolio" className="pf-section">
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          <div className="pf-header">
            <div>
              <p className="pf-eyebrow">Our Portfolio</p>
              <h2 className="pf-heading">
                <span style={{ color: '#fff' }}>Work That </span>
                <AuroraText>Speaks for Itself</AuroraText>
              </h2>
            </div>
            <Link href="/case-studies" className="pf-explore">Explore All Projects →</Link>
          </div>

          {/* Row 1: wide + 2 tall */}
          <div className="pf-row1">
            {stories.slice(0, 3).map((s, i) => (
              <div key={s.company} className="pf-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.company} className="pf-card-img" />
                <span className="pf-num">0{i + 1}</span>
                <div className="pf-bottom">
                  <div className="pf-industry">{s.industry}</div>
                  <div className="pf-company">{s.company}</div>
                </div>
                <div className="pf-overlay">
                  <div className="pf-otags">{s.tags.map(t => <span key={t} className="pf-otag">{t}</span>)}</div>
                  <div className="pf-oname">{s.company}</div>
                  <p className="pf-odesc">{s.desc}</p>
                  <Link href="/case-studies" className="pf-olink">View Case Study →</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: 4 equal */}
          <div className="pf-row2">
            {stories.slice(3).map((s, i) => (
              <div key={s.company} className="pf-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.company} className="pf-card-img" />
                <span className="pf-num">0{i + 4}</span>
                <div className="pf-bottom">
                  <div className="pf-industry">{s.industry}</div>
                  <div className="pf-company">{s.company}</div>
                </div>
                <div className="pf-overlay">
                  <div className="pf-otags">{s.tags.map(t => <span key={t} className="pf-otag">{t}</span>)}</div>
                  <div className="pf-oname">{s.company}</div>
                  <p className="pf-odesc">{s.desc}</p>
                  <Link href="/case-studies" className="pf-olink">View Case Study →</Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Growth Story ── */}
      <section ref={growthRef} id="growth-story" className="whyus-growth-sec" style={{ background: '#fff' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div className="whyus-facts-layout">

            <div style={blurFade(0)}>
              <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#888', margin: '0 0 16px' }}>
                FAST FACTS
              </p>
              <h2 style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.5px', margin: '0 0 20px' }}>
                <span style={{ color: '#111827' }}>Highlighting Our </span><AuroraText>Growth Story</AuroraText>
              </h2>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.75, margin: 0 }}>
                Here&apos;s what being a client-focused technology and marketing company has allowed us to accomplish.
              </p>
            </div>

            <div className="whyus-stats-grid">
              {growthStats.map((s, i) => {
                const glowColors = ['rgba(254,151,0,0.55)', 'rgba(17,65,113,0.50)', 'rgba(20,184,166,0.48)']
                return (
                  <div key={i} style={{ position: 'relative', ...blurFade(0.15 + i * 0.15) }}>
                    <div aria-hidden="true" style={{
                      position: 'absolute', top: '-16px', left: '-16px', right: '-16px', bottom: '-16px',
                      borderRadius: '32px', background: glowColors[i],
                      filter: 'blur(28px)', opacity: 0.55, zIndex: 0, pointerEvents: 'none',
                    }} />
                    <div style={{
                      position: 'relative', zIndex: 1,
                      border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px',
                      padding: '36px 24px 32px', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', background: '#fff', textAlign: 'center',
                    }}>
                      <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', marginBottom: '32px', flexShrink: 0 }}>
                        {s.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.image} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: '44px', fontWeight: 700, color: '#111', letterSpacing: '-1px', lineHeight: 1, marginBottom: '14px' }}>{s.value}</div>
                      <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{s.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
