import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';

const TRUST = [
  { stat: '15+', label: 'Years in Business' },
  { stat: '500+', label: 'Clients Served' },
  { stat: '97%', label: 'Retention Rate' },
  { stat: 'Free', label: 'No Obligation' },
];

const COVERS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Your Business Goals',
    desc: 'We listen first — understanding where you are and where you want to go.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Current Online Presence',
    desc: 'Quick audit of your website, SEO, and digital channels to spot quick wins.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Custom Strategy',
    desc: 'We outline a clear plan tailored to your industry, audience, and budget.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Pricing & Timelines',
    desc: 'Transparent ballpark figures so you can plan confidently — no surprises.',
  },
];

const CONTACT = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    label: 'info@1solutions.biz',
    href: 'mailto:info@1solutions.biz',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
    label: '+91 96543 27900',
    href: 'tel:+919654327900',
  },
];

export default function BookConsultation() {
  return (
    <>
      <Head>
        <title>Book a Free Consultation | 1Solutions</title>
        <meta name="description" content="Schedule a free 30-minute consultation with our experts. Discuss your project goals, get a custom strategy, and learn how 1Solutions can help your business grow online." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/book-consultation" />
        <style>{`
          .bc-hero {
            background: linear-gradient(135deg, rgba(254,243,199,0.55) 0%, rgba(219,234,254,0.35) 100%);
            position: relative;
            overflow: hidden;
            padding: 100px 0 72px;
            min-height: 360px;
            display: flex;
            align-items: center;
          }
          .bc-hero-orb1 {
            position: absolute; top: -80px; right: -80px;
            width: 420px; height: 420px; border-radius: 50%;
            background: radial-gradient(circle, rgba(254,151,0,0.13) 0%, transparent 70%);
            pointer-events: none;
          }
          .bc-hero-orb2 {
            position: absolute; bottom: -60px; left: -60px;
            width: 300px; height: 300px; border-radius: 50%;
            background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
            pointer-events: none;
          }
          .bc-hero-inner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px;
            position: relative;
            z-index: 1;
          }
          .bc-eyebrow {
            color: #D97706;
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 18px;
          }
          .bc-hero-title {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 800;
            line-height: 1.2;
            max-width: 680px;
            margin-bottom: 20px;
            background: linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .bc-hero-sub {
            color: #4b5563;
            font-size: 1.05rem;
            max-width: 520px;
            margin-bottom: 40px;
            line-height: 1.75;
          }
          .bc-trust-row {
            display: flex;
            gap: 32px;
            flex-wrap: wrap;
          }
          .bc-trust-item {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .bc-trust-stat {
            font-size: 1.4rem;
            font-weight: 800;
            color: #0F3460;
          }
          .bc-trust-label {
            font-size: 0.82rem;
            color: #6b7280;
            font-weight: 500;
            line-height: 1.3;
          }
          .bc-trust-divider {
            width: 1px;
            height: 32px;
            background: #d1d5db;
            align-self: center;
          }

          /* Main layout */
          .bc-main {
            background: #fff;
            padding: 72px 0 100px;
          }
          .bc-main-inner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px;
            display: grid;
            grid-template-columns: 340px 1fr;
            gap: 64px;
            align-items: flex-start;
          }

          /* Left panel */
          .bc-left {
            position: sticky;
            top: 100px;
          }
          .bc-left-heading {
            font-size: 1.25rem;
            font-weight: 700;
            color: #0A1628;
            margin-bottom: 24px;
          }
          .bc-covers {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 40px;
          }
          .bc-cover-item {
            display: flex;
            gap: 14px;
            align-items: flex-start;
          }
          .bc-cover-icon {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: rgba(15,52,96,0.07);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0F3460;
            flex-shrink: 0;
          }
          .bc-cover-title {
            font-size: 0.92rem;
            font-weight: 700;
            color: #0A1628;
            margin-bottom: 3px;
          }
          .bc-cover-desc {
            font-size: 0.84rem;
            color: #6b7280;
            line-height: 1.6;
          }
          .bc-divider {
            border: none;
            border-top: 1px solid #f3f4f6;
            margin: 0 0 28px;
          }
          .bc-contact-heading {
            font-size: 0.82rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #9ca3af;
            margin-bottom: 14px;
          }
          .bc-contact-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .bc-contact-link {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #374151;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
          }
          .bc-contact-link:hover { color: #0F3460; }
          .bc-contact-icon {
            color: #FE9700;
          }

          /* Calendly container */
          .bc-calendly-wrap {
            background: #fff;
            border: 1.5px solid #f3f4f6;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 32px rgba(0,0,0,0.06);
          }

          /* Responsive */
          @media (max-width: 900px) {
            .bc-main-inner {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .bc-left { position: static; }
            .bc-hero { padding: 72px 0 52px; }
            .bc-hero-inner { padding: 0 24px; }
            .bc-main-inner { padding: 0 24px; }
          }
          @media (max-width: 560px) {
            .bc-trust-row { gap: 20px; }
            .bc-trust-divider { display: none; }
          }
        `}</style>
      </Head>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      {/* ── HERO ── */}
      <section className="bc-hero">
        <div className="bc-hero-orb1" />
        <div className="bc-hero-orb2" />
        <div className="bc-hero-inner">
          <p className="bc-eyebrow">Free Consultation</p>
          <h1 className="bc-hero-title">Book a Free Strategy Call</h1>
          <p className="bc-hero-sub">
            30 minutes with our experts. No sales pitch — just a focused conversation about your goals and how we can help you achieve them.
          </p>
          <div className="bc-trust-row">
            {TRUST.map((t, i) => (
              <>
                <div className="bc-trust-item" key={t.stat}>
                  <span className="bc-trust-stat">{t.stat}</span>
                  <span className="bc-trust-label">{t.label}</span>
                </div>
                {i < TRUST.length - 1 && <div className="bc-trust-divider" key={`d${i}`} />}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section className="bc-main">
        <div className="bc-main-inner">

          {/* Left panel */}
          <div className="bc-left">
            <h2 className="bc-left-heading">What we&rsquo;ll cover</h2>
            <div className="bc-covers">
              {COVERS.map(c => (
                <div className="bc-cover-item" key={c.title}>
                  <div className="bc-cover-icon">{c.icon}</div>
                  <div>
                    <div className="bc-cover-title">{c.title}</div>
                    <div className="bc-cover-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="bc-divider" />

            <p className="bc-contact-heading">Prefer to reach out directly?</p>
            <div className="bc-contact-list">
              {CONTACT.map(c => (
                <a key={c.label} href={c.href} className="bc-contact-link">
                  <span className="bc-contact-icon">{c.icon}</span>
                  {c.label}
                </a>
              ))}
            </div>
          </div>

          {/* Calendly embed */}
          <div className="bc-calendly-wrap">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/1solutionsbiz/"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>

        </div>
      </section>

    </>
  );
}
