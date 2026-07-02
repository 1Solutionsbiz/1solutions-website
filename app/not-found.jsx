import Link from 'next/link'

export const metadata = {
  title: '404 – Page Not Found | 1Solutions',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(3deg); }
        }
        .nf-root {
          min-height: 70vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
          font-family: 'DM Sans', Inter, sans-serif;
          background-image:
            url('https://pub-e68758f43067417dba612b2371819aa1.r2.dev/viktor-components/alien-spaceship.png'),
            linear-gradient(to top left, #F5F5F5, #F7F7F7);
          background-position: center 60%, center;
          background-size: 32%, cover;
          background-repeat: no-repeat, no-repeat;
        }
        .nf-inner {
          max-width: 640px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-bottom: 220px;
        }
        .nf-deco {
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
        .nf-cards { display: flex; flex-direction: row; gap: 16px; width: 100%; max-width: 520px; margin-top: 32px; }
        .nf-cards > a { flex: 1; min-width: 0; }
        .nf-card {
          background: white;
          border-radius: 18px;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          text-decoration: none;
          color: inherit;
          gap: 14px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .nf-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.08); }
        .nf-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .nf-root { background-size: 70%, cover; background-position: center 65%, center; }
          .nf-inner { padding-bottom: 180px; }
          .nf-cards { flex-direction: column; gap: 10px; }
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" rel="stylesheet" />

      <div className="nf-root">
        <div className="nf-inner">
          <p style={{ fontSize: '15px', fontWeight: 400, color: '#888', margin: '0 0 12px' }}>
            Seems you&apos;ve wandered off...
          </p>

          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '8px' }}>
            <span className="nf-deco" style={{ top: '-18px', left: '-24px', fontSize: '42px', animation: 'floatSlow 5s ease-in-out 0.3s infinite' }}>cloud</span>
            <span className="nf-deco" style={{ bottom: '-15px', right: '20px', fontSize: '32px', animation: 'floatSlow 4.5s ease-in-out 1s infinite' }}>favorite</span>
            <h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 500, letterSpacing: '-1.5px', lineHeight: 1.08, color: '#0f0f0f', margin: 0, padding: '0 12px' }}>
              Whoops! Nothing here yet
            </h1>
          </div>

          <div className="nf-cards">
            <Link href="/" className="nf-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="nf-icon" style={{ background: 'linear-gradient(135deg, #114171 0%, #1a5fa8 100%)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" fill="white" stroke="white" strokeWidth="1.5" />
                    <path d="M9 21V12h6v9" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
                  </svg>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>Main Page</div>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '3px' }}>Back where it all begins...</div>
                </div>
              </div>
              <span style={{ fontSize: '21px', color: '#888' }}>›</span>
            </Link>

            <Link href="/contact-us" className="nf-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="nf-icon" style={{ background: 'linear-gradient(135deg, #FE9700 0%, #FFC14D 100%)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="white" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>Contact Us</div>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '3px' }}>We&apos;d love to hear from you</div>
                </div>
              </div>
              <span style={{ fontSize: '21px', color: '#888' }}>›</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
