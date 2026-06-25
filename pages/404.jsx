'use client'
import Head from 'next/head'
import Link from 'next/link'

function Custom404() {
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
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          background-image:
            url('https://pub-e68758f43067417dba612b2371819aa1.r2.dev/viktor-components/alien-spaceship.png'),
            linear-gradient(to top left, #F5F5F5, #F7F7F7);
          background-position: center 50%, center;
          background-size: 55%, cover;
          background-repeat: no-repeat, no-repeat;
          --text-main: #1a1a1a;
          --text-sec: #888888;
        }

        /* ── Main content ── */
        .p4-main {
          display: flex;
          justify-content: center;
          padding: 48px 20px 40px;
        }
        .p4-inner {
          max-width: 700px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
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
        .p4-cards > a { flex: 1; }
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
          .p4-root  {
            background-size: 90%, cover !important;
            background-position: center 45%, center !important;
          }
          .p4-main { padding: 36px 16px 48px !important; }
          .p4-deco-cloud { font-size: 30px !important; top: -14px !important; left: -18px !important; }
          .p4-deco-heart { font-size: 24px !important; bottom: -12px !important; right: 10px !important; }
          .p4-cards { gap: 10px !important; flex-direction: column !important; }
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

            {/* Navigation cards */}
            <div
              className="p4-cards"
              style={{
                display: 'flex', flexDirection: 'row',
                gap: '16px', width: '100%', maxWidth: '600px',
                marginTop: '32px',
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

export default Custom404
