'use client'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <Head>
        <title>404 – Page Not Found | 1Solutions</title>
        <meta name="robots" content="noindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(3deg); }
        }

        .p4-root {
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          background-image:
            url('https://pub-e68758f43067417dba612b2371819aa1.r2.dev/viktor-components/alien-spaceship.png'),
            linear-gradient(to top left, #F5F5F5, #F7F7F7);
          background-position: center 40%, center;
          background-size: contain, cover;
          background-repeat: no-repeat, no-repeat;
          background-attachment: fixed, fixed;
          --text-main: #1a1a1a;
          --text-sec: #888888;
        }

        /* ── Navbar ── */
        .p4-nav-wrap { width: 100%; }
        .p4-nav {
          max-width: 1100px;
          margin: 0 auto;
          padding: 28px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          box-sizing: border-box;
        }
        .p4-nav::after {
          content: '';
          position: absolute;
          bottom: 0; left: 40px; right: 40px;
          height: 1px;
          background-image: linear-gradient(to right, rgba(0,0,0,0.08) 2px, transparent 2px);
          background-size: 6px 1px;
          background-repeat: repeat-x;
        }
        .p4-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          color: #111;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.3px;
        }
        .p4-navlinks {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .p4-navlinks a {
          font-size: 14px;
          font-weight: 400;
          opacity: 0.65;
          color: #1a1a1a;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .p4-navlinks a:hover { opacity: 1; }
        .p4-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(180deg, #2c2c2c 0%, #111111 100%);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          border-radius: 40px;
          padding: 5px 16px 5px 5px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
          text-decoration: none;
          white-space: nowrap;
        }
        .p4-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(0,0,0,0.22);
          filter: brightness(1.1);
        }
        .p4-cta-icon {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: white;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ── Hamburger ── */
        .p4-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .p4-burger span {
          display: block;
          width: 24px; height: 2px;
          background: #111;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }
        .p4-burger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .p4-burger.active span:nth-child(2) { opacity: 0; }
        .p4-burger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile nav overlay ── */
        .p4-mnav {
          position: fixed;
          inset: 0;
          background: white;
          z-index: 300;
          flex-direction: column;
          padding: 28px 32px;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          display: none;
          box-sizing: border-box;
        }
        .p4-mnav.open { transform: translateX(0); }
        .p4-mnav-links {
          list-style: none;
          margin: 48px 0 0; padding: 0;
          display: flex; flex-direction: column;
        }
        .p4-mnav-links li { border-bottom: 1px solid rgba(0,0,0,0.07); }
        .p4-mnav-links a {
          display: block;
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -1.5px;
          color: #111;
          text-decoration: none;
          padding: 24px 0;
          transition: opacity 0.2s;
        }
        .p4-mnav-links a:hover { opacity: 0.6; }

        /* ── Main content ── */
        .p4-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          overflow: hidden;
        }
        .p4-inner {
          max-width: 700px;
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 0 30px;
        }

        /* ── Floating decoration icons ── */
        .p4-deco {
          position: absolute;
          font-family: 'Material Symbols Rounded';
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          background: linear-gradient(to bottom, #F7B2FB 50%, #786EF1 80%, #5588FB 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 2px white);
          user-select: none;
          pointer-events: none;
          line-height: 1;
        }

        /* ── Highlight tags ── */
        .p4-tag {
          display: inline-flex;
          align-items: center;
          background: #E0E2E7;
          font-size: 12.5px;
          font-weight: 600;
          padding: 2px 12px;
          border-radius: 6px;
          color: #1a1a1a;
          vertical-align: baseline;
          margin: 0 2px;
        }

        /* ── Nav cards ── */
        .p4-card {
          background: white;
          border-radius: 18px;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          gap: 16px;
        }
        .p4-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.08); }
        .p4-card:hover .p4-card-icon { transform: scale(1.05); }
        .p4-card:hover .p4-card-arrow { transform: translateX(6px); }
        .p4-card-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: #eaecf0;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .p4-card-arrow {
          font-size: 21px;
          color: #888;
          transition: transform 0.25s ease;
          line-height: 1;
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .p4-navlinks, .p4-cta-desk { display: none !important; }
          .p4-burger { display: flex; }
          .p4-mnav  { display: flex; }
          .p4-nav   { padding: 20px !important; }
          .p4-nav::after { left: 20px !important; right: 20px !important; }
          .p4-root  {
            background-size: 90%, cover !important;
            background-position: center 45%, center !important;
          }
          .p4-deco-cloud { font-size: 30px !important; top: -14px !important; left: -18px !important; }
          .p4-deco-heart { font-size: 24px !important; bottom: -12px !important; right: 10px !important; }
          .p4-cards { gap: 10px !important; }
          .p4-card  { padding: 14px 16px !important; }
          .p4-card-icon { width: 40px !important; height: 40px !important; }
        }
        @media (max-width: 480px) {
          .p4-root { background-size: 100%, cover !important; }
          .p4-deco-cloud { font-size: 24px !important; }
          .p4-deco-heart { font-size: 20px !important; }
        }
      `}</style>

      <div className="p4-root">

        {/* ── Mobile nav overlay ── */}
        <div className={`p4-mnav${mobileOpen ? ' open' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" className="p4-logo">
              <img
                src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/Tests/logoipsum-415.svg"
                alt="Logo"
                style={{ height: 28, filter: 'brightness(0)' }}
              />
              nexto.
            </a>
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '22px', color: '#111', padding: '4px',
              }}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <ul className="p4-mnav-links">
            {['Our Team', 'Solutions', 'Showcase', 'News'].map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
          <div style={{ marginTop: '32px' }}>
            <a href="#" className="p4-cta">
              <span className="p4-cta-icon" style={{ width: 32, height: 32 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Let&apos;s Connect
            </a>
          </div>
        </div>

        {/* ── Navbar ── */}
        <div className="p4-nav-wrap">
          <nav className="p4-nav">
            <a href="/" className="p4-logo">
              <img
                src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/Tests/logoipsum-415.svg"
                alt="Logo"
                style={{ height: 28, filter: 'brightness(0)' }}
              />
              nexto.
            </a>

            <ul className="p4-navlinks">
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Solutions ⌄</a></li>
              <li><a href="#">Showcase</a></li>
              <li><a href="#">News</a></li>
            </ul>

            <a href="#" className="p4-cta p4-cta-desk">
              <span className="p4-cta-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6H10M7 3L10 6L7 9" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Let&apos;s Connect
            </a>

            <button
              className={`p4-burger${mobileOpen ? ' active' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </nav>
        </div>

        {/* ── Main ── */}
        <main className="p4-main">
          <div className="p4-inner">

            <p style={{
              fontSize: '15px', fontWeight: 400,
              color: '#888888', margin: '0 0 12px',
            }}>
              Seems you&apos;ve wandered off...
            </p>

            {/* Title with floating decorations */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '14px' }}>
              <span
                className="p4-deco p4-deco-cloud"
                style={{
                  top: '-18px', left: '-24px',
                  fontSize: '42px',
                  animation: 'floatSlow 5s ease-in-out 0.3s infinite',
                }}
              >
                cloud
              </span>
              <span
                className="p4-deco p4-deco-heart"
                style={{
                  bottom: '-15px', right: '20px',
                  fontSize: '32px',
                  animation: 'floatSlow 4.5s ease-in-out 1s infinite',
                }}
              >
                favorite
              </span>
              <h1 style={{
                fontSize: 'clamp(34px, 5vw, 52px)',
                fontWeight: 500,
                letterSpacing: '-1.5px',
                lineHeight: 1.08,
                color: '#0f0f0f',
                margin: 0,
                padding: '0 12px',
              }}>
                Whoops! Nothing here yet
              </h1>
            </div>

            <p style={{
              fontSize: '14px',
              color: '#888888',
              lineHeight: 1.7,
              maxWidth: '470px',
              margin: '0 auto 28px',
            }}>
              Grab a 30-minute <span className="p4-tag">chat</span> to explore your ideas, scope, and
              vision. We&apos;ll find common ground, sync and <span className="p4-tag">define</span> a
              clear roadmap.
            </p>

            {/* Navigation cards */}
            <div
              className="p4-cards"
              style={{
                display: 'flex', flexDirection: 'column',
                gap: '12px', maxWidth: '460px', width: '100%',
                marginTop: 'auto',
              }}
            >
              {/* Card 1 — Main Page */}
              <Link href="/" className="p4-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="p4-card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" fill="white" stroke="white" strokeWidth="1.5" />
                      <path d="M9 21V12h6v9" stroke="#bfc3cc" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>Main Page</div>
                    <div style={{ fontSize: '12px', color: '#888888', marginTop: '3px' }}>Back where it all begins...</div>
                  </div>
                </div>
                <span className="p4-card-arrow">›</span>
              </Link>

              {/* Card 2 — Showcase */}
              <Link href="/portfolio" className="p4-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="p4-card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" fill="white" />
                      <circle cx="12" cy="12" r="3.5" fill="#bfc3cc" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>Showcase</div>
                    <div style={{ fontSize: '12px', color: '#888888', marginTop: '3px' }}>Where we walk the walk</div>
                  </div>
                </div>
                <span className="p4-card-arrow">›</span>
              </Link>
            </div>

          </div>
        </main>

      </div>
    </>
  )
}
