import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank You | We'll Be In Touch | 1Solutions</title>
        <meta name="description" content="Thank you for contacting 1Solutions. We've received your message and will respond within 24 hours." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.1solutions.biz/thank-you/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Thank You | We'll Be In Touch | 1Solutions" />
        <meta property="og:description" content="Thank you for contacting 1Solutions. We've received your message and will respond within 24 hours." />
        <meta property="og:url" content="https://www.1solutions.biz/thank-you/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-thank-you.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Thank You" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-thank-you.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Thank You" />
        <style>{`
          /* ── Page shell ─────────────────────────────── */
          .ty-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f7fb;
            min-height: 72vh;
          }

          /* ── Hero band ──────────────────────────────── */
          .ty-hero {
            background: linear-gradient(135deg, #0b2e54 0%, #114171 55%, #1a5fa8 100%);
            padding: 72px 24px 100px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .ty-hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
              radial-gradient(ellipse 60% 50% at 20% 50%, rgba(254,151,0,0.12) 0%, transparent 70%),
              radial-gradient(ellipse 50% 60% at 80% 30%, rgba(255,255,255,0.06) 0%, transparent 70%);
            pointer-events: none;
          }

          /* decorative circles */
          .ty-hero::after {
            content: '';
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.06);
            top: -150px;
            right: -150px;
            pointer-events: none;
          }

          .ty-hero-inner {
            position: relative;
            z-index: 1;
            max-width: 640px;
            margin: 0 auto;
          }

          /* ── Check icon ─────────────────────────────── */
          .ty-icon-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 28px;
            width: 96px;
            height: 96px;
            position: relative;
          }
          .ty-icon-ring {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 3px solid rgba(254,151,0,0.5);
            animation: ty-pulse 2.4s ease-in-out infinite;
          }
          .ty-icon-bg {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(145deg, #FE9700, #e07c00);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 32px rgba(254,151,0,0.4), 0 2px 8px rgba(0,0,0,0.2);
          }
          @keyframes ty-pulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50%       { transform: scale(1.18); opacity: 0.2; }
          }

          /* ── Hero text ──────────────────────────────── */
          .ty-label {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(254,151,0,0.18);
            border: 1px solid rgba(254,151,0,0.35);
            color: #FE9700;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 5px 14px;
            border-radius: 100px;
            margin-bottom: 20px;
          }
          .ty-label-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #FE9700;
            animation: ty-blink 1.4s ease-in-out infinite;
          }
          @keyframes ty-blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.3; }
          }

          .ty-h1 {
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 900;
            color: #ffffff;
            line-height: 1.1;
            letter-spacing: -0.5px;
            margin: 0 0 16px;
          }
          .ty-h1 span { color: #FE9700; }

          .ty-sub {
            font-size: 1.05rem;
            color: rgba(255,255,255,0.75);
            line-height: 1.75;
            margin: 0 auto;
            max-width: 480px;
          }
          .ty-sub strong { color: #fff; }

          /* ── Cards section ──────────────────────────── */
          .ty-body {
            max-width: 820px;
            margin: -52px auto 0;
            padding: 0 20px 72px;
            position: relative;
            z-index: 2;
          }

          .ty-steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 40px;
          }

          .ty-step {
            background: #fff;
            border: 1px solid #e8ecf2;
            border-radius: 16px;
            padding: 28px 22px 24px;
            box-shadow: 0 4px 20px rgba(17,65,113,0.07);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .ty-step:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 32px rgba(17,65,113,0.12);
          }

          .ty-step-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: linear-gradient(135deg, #FE9700, #e07c00);
            color: #fff;
            font-size: 13px;
            font-weight: 800;
            margin-bottom: 14px;
            box-shadow: 0 3px 10px rgba(254,151,0,0.35);
          }

          .ty-step-icon {
            display: block;
            width: 32px;
            height: 32px;
            margin-bottom: 10px;
            color: #114171;
          }

          .ty-step-t {
            font-size: 0.95rem;
            font-weight: 800;
            color: #0F1F40;
            margin-bottom: 6px;
          }

          .ty-step-d {
            font-size: 0.84rem;
            color: #6b7280;
            line-height: 1.55;
            margin: 0;
          }

          /* ── Trust bar ──────────────────────────────── */
          .ty-trust {
            background: #fff;
            border: 1px solid #e8ecf2;
            border-radius: 16px;
            padding: 24px 28px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 20px;
            margin-bottom: 36px;
            box-shadow: 0 4px 20px rgba(17,65,113,0.06);
            flex-wrap: wrap;
          }

          .ty-trust-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #374151;
            font-size: 0.88rem;
            font-weight: 600;
          }

          .ty-trust-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(17,65,113,0.06);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .ty-trust-divider {
            width: 1px;
            height: 36px;
            background: #e8ecf2;
          }

          /* ── CTA ────────────────────────────────────── */
          .ty-cta {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .ty-btn-p {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #114171, #1a5fa8);
            color: #fff;
            padding: 14px 30px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.9rem;
            text-decoration: none;
            box-shadow: 0 6px 20px rgba(17,65,113,0.3);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .ty-btn-p:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 28px rgba(17,65,113,0.4);
          }

          .ty-btn-s {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: 1.5px solid #d1d9e6;
            color: #4A6080;
            padding: 14px 30px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.9rem;
            text-decoration: none;
            background: #fff;
            transition: border-color 0.2s, color 0.2s;
          }
          .ty-btn-s:hover { border-color: #114171; color: #114171; }

          @media (max-width: 640px) {
            .ty-hero { padding: 56px 20px 88px; }
            .ty-steps { grid-template-columns: 1fr; }
            .ty-trust { justify-content: center; }
            .ty-trust-divider { display: none; }
            .ty-cta { flex-direction: column; align-items: center; }
            .ty-body { margin-top: -44px; }
          }
        `}</style>
      </Head>

      {/* ── Hero ─────────────────────────────────── */}
      <div className="ty-hero">
        <div className="ty-hero-inner">
          <div className="ty-icon-wrap">
            <div className="ty-icon-ring" />
            <div className="ty-icon-bg">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <div className="ty-label">
            <span className="ty-label-dot" />
            Message Received
          </div>

          <h1 className="ty-h1">Thank You - We'll Be<br /><span>In Touch Soon</span></h1>
          <p className="ty-sub">
            Your enquiry is with us. A specialist will review your requirements and
            get back to you within <strong>24 hours</strong> with a tailored plan.
          </p>
        </div>
      </div>

      {/* ── Cards + CTA ──────────────────────────── */}
      <div className="ty-body">

        {/* 3-step process */}
        <div className="ty-steps">
          <div className="ty-step">
            <div className="ty-step-num">01</div>
            <div className="ty-step-t">Brief Review</div>
            <p className="ty-step-d">We read your message and match you with the right specialist for your project type.</p>
          </div>
          <div className="ty-step">
            <div className="ty-step-num">02</div>
            <div className="ty-step-t">Discovery Call</div>
            <p className="ty-step-d">A focused 30-minute call to understand your goals, timeline, and budget in detail.</p>
          </div>
          <div className="ty-step">
            <div className="ty-step-num">03</div>
            <div className="ty-step-t">Custom Proposal</div>
            <p className="ty-step-d">A detailed proposal with clear scope, delivery timeline, and fixed pricing - no surprises.</p>
          </div>
        </div>

        {/* Trust bar */}
        <div className="ty-trust">
          <div className="ty-trust-item">
            <div className="ty-trust-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#114171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            Reply within 24 hours
          </div>
          <div className="ty-trust-divider" />
          <div className="ty-trust-item">
            <div className="ty-trust-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#114171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            100% confidential
          </div>
          <div className="ty-trust-divider" />
          <div className="ty-trust-item">
            <div className="ty-trust-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#114171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            15+ years experience
          </div>
          <div className="ty-trust-divider" />
          <div className="ty-trust-item">
            <div className="ty-trust-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#114171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            500+ projects delivered
          </div>
        </div>

        {/* CTAs */}
        <div className="ty-cta">
          <Link href="/case-studies/" className="ty-btn-p">
            View Our Case Studies
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/" className="ty-btn-s">
            ← Back to Home
          </Link>
        </div>

      </div>
    </>
  );
}
