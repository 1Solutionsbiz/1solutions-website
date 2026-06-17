import Head from 'next/head';
import Script from 'next/script';

const COVERS = [
  'Your business goals and growth challenges',
  'A quick audit of your current website and SEO',
  'A tailored strategy recommendation',
  'Realistic timelines and transparent pricing',
];

const TESTIMONIAL = {
  quote: "The team at 1Solutions delivered beyond our expectations — on time, on budget, and with a level of attention to detail that's rare.",
  name: 'Ravi K.',
  role: 'CEO, Tech Startup — Toronto',
  initials: 'RK',
};

const STATS = [
  { value: '15+', label: 'Years in Business' },
  { value: '500+', label: 'Clients Served' },
  { value: '97%', label: 'Retention Rate' },
];

export default function BookConsultation() {
  return (
    <>
      <Head>
        <title>Book a Free Consultation | 1Solutions</title>
        <meta name="description" content="Schedule a free 30-minute strategy call with our experts. Discuss your goals, get a custom roadmap, and see exactly how 1Solutions can grow your business online." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/book-consultation" />
        <style>{`
          /* ── Layout ── */
          .bc-split {
            display: grid;
            grid-template-columns: minmax(300px, 520px) 1fr;
            min-height: calc(100vh - 72px);
          }

          /* ── Left panel ── */
          .bc-left {
            background: #07111f;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
          }
          .bc-left-orb1 {
            position: absolute; top: -120px; left: -80px;
            width: 480px; height: 480px; border-radius: 50%;
            background: radial-gradient(circle, rgba(254,151,0,0.12) 0%, transparent 65%);
            pointer-events: none;
          }
          .bc-left-orb2 {
            position: absolute; bottom: -80px; right: -60px;
            width: 320px; height: 320px; border-radius: 50%;
            background: radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%);
            pointer-events: none;
          }
          .bc-left-inner {
            position: relative;
            z-index: 1;
            padding: 80px 52px 80px 48px;
            max-width: 480px;
            margin-left: auto;
            width: 100%;
          }
          .bc-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(254,151,0,0.12);
            border: 1px solid rgba(254,151,0,0.25);
            border-radius: 50px;
            padding: 6px 16px 6px 10px;
            margin-bottom: 28px;
          }
          .bc-badge-dot {
            width: 8px; height: 8px; border-radius: 50%;
            background: #FE9700;
            box-shadow: 0 0 0 3px rgba(254,151,0,0.25);
            animation: bc-pulse 2s ease-in-out infinite;
          }
          @keyframes bc-pulse {
            0%, 100% { box-shadow: 0 0 0 3px rgba(254,151,0,0.25); }
            50%       { box-shadow: 0 0 0 6px rgba(254,151,0,0.1); }
          }
          .bc-badge-text {
            font-size: 0.8rem;
            font-weight: 600;
            color: #FE9700;
            letter-spacing: 0.04em;
          }
          .bc-left-title {
            font-size: clamp(1.75rem, 2.6vw, 2.5rem);
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 18px;
            background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .bc-left-title span {
            background: linear-gradient(90deg, #FE9700, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .bc-left-sub {
            font-size: 0.97rem;
            color: rgba(255,255,255,0.55);
            line-height: 1.75;
            margin-bottom: 36px;
          }

          /* Cover points */
          .bc-cover-label {
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.35);
            margin-bottom: 16px;
          }
          .bc-covers {
            display: flex;
            flex-direction: column;
            gap: 13px;
            margin-bottom: 40px;
          }
          .bc-cover-item {
            display: flex;
            gap: 12px;
            align-items: flex-start;
          }
          .bc-check {
            width: 20px; height: 20px;
            border-radius: 50%;
            background: rgba(68,151,61,0.15);
            border: 1px solid rgba(68,151,61,0.3);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            margin-top: 1px;
          }
          .bc-check svg { display: block; }
          .bc-cover-text {
            font-size: 0.9rem;
            color: rgba(255,255,255,0.75);
            line-height: 1.55;
          }

          /* Divider */
          .bc-left-hr {
            border: none;
            border-top: 1px solid rgba(255,255,255,0.08);
            margin: 0 0 32px;
          }

          /* Testimonial */
          .bc-testi {
            margin-bottom: 36px;
          }
          .bc-testi-stars {
            display: flex;
            gap: 3px;
            margin-bottom: 12px;
          }
          .bc-testi-quote {
            font-size: 0.88rem;
            color: rgba(255,255,255,0.65);
            line-height: 1.7;
            font-style: italic;
            margin-bottom: 14px;
          }
          .bc-testi-author {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .bc-testi-avatar {
            width: 34px; height: 34px; border-radius: 50%;
            background: linear-gradient(135deg, #FE9700, #f59e0b);
            display: flex; align-items: center; justify-content: center;
            font-size: 0.72rem; font-weight: 800; color: #fff;
            flex-shrink: 0;
          }
          .bc-testi-name {
            font-size: 0.82rem;
            font-weight: 700;
            color: rgba(255,255,255,0.85);
          }
          .bc-testi-role {
            font-size: 0.78rem;
            color: rgba(255,255,255,0.4);
          }

          /* Contact links */
          .bc-contact {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .bc-contact-link {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            color: rgba(255,255,255,0.45);
            text-decoration: none;
            font-size: 0.85rem;
            transition: color 0.2s;
          }
          .bc-contact-link:hover { color: rgba(255,255,255,0.9); }
          .bc-contact-link svg { flex-shrink: 0; }

          /* ── Right panel ── */
          .bc-right {
            background: #f4f6f9;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 64px 48px;
          }
          .bc-right-inner {
            width: 100%;
            max-width: 700px;
          }
          .bc-right-header {
            margin-bottom: 20px;
          }
          .bc-right-eyebrow {
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #9ca3af;
            margin-bottom: 6px;
          }
          .bc-right-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: #0A1628;
          }

          /* Calendly card */
          .bc-cal-card {
            background: #fff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow:
              0 0 0 1px rgba(0,0,0,0.06),
              0 8px 40px rgba(0,0,0,0.08);
            margin-bottom: 28px;
          }

          /* Stats row */
          .bc-stats {
            display: flex;
            gap: 0;
            background: #fff;
            border-radius: 14px;
            border: 1px solid rgba(0,0,0,0.06);
            overflow: hidden;
          }
          .bc-stat {
            flex: 1;
            padding: 16px 20px;
            text-align: center;
            border-right: 1px solid rgba(0,0,0,0.06);
          }
          .bc-stat:last-child { border-right: none; }
          .bc-stat-value {
            font-size: 1.3rem;
            font-weight: 800;
            color: #0F3460;
            line-height: 1.1;
          }
          .bc-stat-label {
            font-size: 0.75rem;
            color: #9ca3af;
            font-weight: 500;
            margin-top: 3px;
          }

          /* ── Responsive ── */
          @media (max-width: 1024px) {
            .bc-split {
              grid-template-columns: 1fr 1fr;
            }
            .bc-left-inner {
              padding: 64px 40px;
            }
          }
          @media (max-width: 768px) {
            .bc-split {
              grid-template-columns: 1fr;
              min-height: unset;
            }
            .bc-left { align-items: flex-start; }
            .bc-left-inner {
              margin: 0;
              max-width: 100%;
              padding: 56px 24px 48px;
            }
            .bc-right {
              padding: 40px 20px 56px;
            }
          }
          @media (max-width: 480px) {
            .bc-stats { flex-direction: column; }
            .bc-stat { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.06); }
            .bc-stat:last-child { border-bottom: none; }
          }
        `}</style>
      </Head>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <div className="bc-split">

        {/* ── LEFT: Brand panel ── */}
        <div className="bc-left">
          <div className="bc-left-orb1" />
          <div className="bc-left-orb2" />
          <div className="bc-left-inner">

            {/* Live badge */}
            <div className="bc-badge">
              <span className="bc-badge-dot" />
              <span className="bc-badge-text">Free 30-Min Strategy Call</span>
            </div>

            <h1 className="bc-left-title">
              Let&rsquo;s build something<br />
              <span>great together</span>
            </h1>
            <p className="bc-left-sub">
              Pick a time that works for you. No commitment, no sales pressure — just an honest conversation about your goals and what&rsquo;s possible.
            </p>

            {/* What we cover */}
            <p className="bc-cover-label">In this call, we&rsquo;ll cover</p>
            <div className="bc-covers">
              {COVERS.map(item => (
                <div className="bc-cover-item" key={item}>
                  <span className="bc-check">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#44973D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="bc-cover-text">{item}</span>
                </div>
              ))}
            </div>

            <hr className="bc-left-hr" />

            {/* Testimonial */}
            <div className="bc-testi">
              <div className="bc-testi-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FE9700">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="bc-testi-quote">&ldquo;{TESTIMONIAL.quote}&rdquo;</p>
              <div className="bc-testi-author">
                <div className="bc-testi-avatar">{TESTIMONIAL.initials}</div>
                <div>
                  <div className="bc-testi-name">{TESTIMONIAL.name}</div>
                  <div className="bc-testi-role">{TESTIMONIAL.role}</div>
                </div>
              </div>
            </div>

            <hr className="bc-left-hr" />

            {/* Contact */}
            <div className="bc-contact">
              <a href="mailto:info@1solutions.biz" className="bc-contact-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                info@1solutions.biz
              </a>
              <a href="tel:+919654327900" className="bc-contact-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                +91 96543 27900
              </a>
            </div>

          </div>
        </div>

        {/* ── RIGHT: Calendly panel ── */}
        <div className="bc-right">
          <div className="bc-right-inner">
            <div className="bc-right-header">
              <p className="bc-right-eyebrow">Step 1 of 1</p>
              <h2 className="bc-right-title">Choose a time that works for you</h2>
            </div>

            <div className="bc-cal-card">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/1solutionsbiz/"
                style={{ minWidth: '320px', height: '660px' }}
              />
            </div>

            <div className="bc-stats">
              {STATS.map(s => (
                <div className="bc-stat" key={s.value}>
                  <div className="bc-stat-value">{s.value}</div>
                  <div className="bc-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
