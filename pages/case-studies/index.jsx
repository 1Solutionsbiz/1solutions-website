import Head from 'next/head';
import Link from 'next/link';

const TAG_COLORS = [
  { bg: '#FFF3E0', color: '#C05600', border: '#FDE68A' },
  { bg: '#EDE9FE', color: '#6D28D9', border: '#DDD6FE' },
  { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
  { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  { bg: '#FDF2F8', color: '#BE185D', border: '#FBCFE8' },
  { bg: '#F0FDFA', color: '#0F766E', border: '#99F6E4' },
];

const CASE_STUDIES = [
  {
    num: '01',
    title: 'Comtradesol Advisory Services',
    subtitle: 'Financial Advisory — Gurgaon, India',
    desc: 'Built a professional corporate website on custom WordPress for a financial advisory firm specialising in Trade Financing, Debt Advisory, Equity Advisory, and Credit Rating. We also managed their LinkedIn company profile to grow brand authority and reach.',
    tags: ['WordPress Development', 'UI/UX Design', 'LinkedIn Marketing'],
    image: '/images/portfolio/comtradesol.webp',
    url: 'https://www.comtradesol.com/',
  },
  {
    num: '02',
    title: 'Ramnath Goenka Excellence in Journalism Awards',
    subtitle: 'Media & Journalism — Indian Express Group',
    desc: 'Delivered a fully custom-built awards portal for India\'s most prestigious journalism honours. Includes a bespoke CRM in Laravel to manage nominations, jury evaluations, and winner announcements across 14 award categories — with EY as knowledge partner.',
    tags: ['Custom Development', 'Laravel CRM', 'Portal Design'],
    image: '/images/portfolio/rngfoundation.webp',
    url: 'https://rngfoundation.com/awards/',
  },
];

export default function CaseStudies() {
  return (
    <>
      <Head>
        <title>Case Studies | 1Solutions – Real Results for Real Businesses</title>
        <meta name="description" content="Explore how 1Solutions has helped brands across US, Canada & Australia evolve through web development and digital marketing." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/case-studies" />
        <style>{`
          /* ── Hero ── */
          .cs-hero {
            background: linear-gradient(135deg, rgba(254,243,199,0.55) 0%, rgba(219,234,254,0.35) 100%);
            position: relative;
            overflow: hidden;
            padding: 100px 0 80px;
            min-height: 400px;
            display: flex;
            align-items: center;
          }
          .cs-hero-orb1 {
            position: absolute; top: -80px; right: -80px;
            width: 400px; height: 400px; border-radius: 50%;
            background: radial-gradient(circle, rgba(254,151,0,0.13) 0%, transparent 70%);
            pointer-events: none;
          }
          .cs-hero-orb2 {
            position: absolute; bottom: -60px; left: -60px;
            width: 300px; height: 300px; border-radius: 50%;
            background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
            pointer-events: none;
          }
          .cs-hero-inner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px;
            position: relative;
            z-index: 1;
          }
          .cs-eyebrow {
            color: #D97706;
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 20px;
          }
          .cs-hero-title {
            font-size: clamp(2rem, 4vw, 3.25rem);
            font-weight: 800;
            line-height: 1.2;
            max-width: 720px;
            margin-bottom: 24px;
            background: linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .cs-hero-sub {
            color: #4b5563;
            font-size: 1.05rem;
            max-width: 540px;
            margin-bottom: 40px;
            line-height: 1.75;
          }
          .cs-hero-cta {
            display: inline-flex;
            align-items: center;
            gap: 14px;
            background: rgba(15,52,96,0.07);
            backdrop-filter: blur(12px);
            border: 1.5px solid rgba(15,52,96,0.18);
            border-radius: 50px;
            padding: 12px 24px 12px 14px;
            color: #0F3460;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 600;
          }
          .cs-hero-avatars {
            display: flex;
            align-items: center;
          }
          .cs-avatar {
            width: 32px; height: 32px; border-radius: 50%;
            border: 2.5px solid #fff;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.65rem; font-weight: 800; color: #fff;
            flex-shrink: 0;
          }

          /* ── Case Studies ── */
          .cs-list {
            background: #fff;
            padding: 0 0 80px;
          }
          .cs-row {
            max-width: 1200px;
            margin: 0 auto;
            padding: 100px 40px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            border-bottom: 1px solid #f3f4f6;
          }
          .cs-row:last-child {
            border-bottom: none;
          }

          /* Text block */
          .cs-text {
            display: flex;
            flex-direction: column;
          }
          .cs-num {
            font-size: 6rem;
            font-weight: 900;
            line-height: 1;
            color: #f3f4f6;
            letter-spacing: -0.03em;
            margin-bottom: -16px;
            user-select: none;
          }
          .cs-title {
            font-size: clamp(1.5rem, 2.2vw, 2rem);
            font-weight: 800;
            color: #0A1628;
            line-height: 1.25;
            margin-bottom: 8px;
          }
          .cs-subtitle {
            font-size: 0.82rem;
            font-weight: 600;
            color: #FE9700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 20px;
          }
          .cs-desc {
            font-size: 0.97rem;
            color: #4b5563;
            line-height: 1.8;
            margin-bottom: 28px;
          }
          .cs-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 32px;
          }
          .cs-tag {
            font-size: 0.8rem;
            font-weight: 600;
            border-radius: 20px;
            padding: 4px 12px;
            border-width: 1px;
            border-style: solid;
          }
          .cs-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #0F3460;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 700;
            border-bottom: 1.5px solid #0F3460;
            padding-bottom: 2px;
            width: fit-content;
            transition: color 0.2s, border-color 0.2s;
          }
          .cs-link:hover {
            color: #FE9700;
            border-color: #FE9700;
          }

          /* Image block */
          .cs-image-wrap {
            border-radius: 16px;
            overflow: hidden;
            box-shadow:
              0 0 0 1px rgba(0,0,0,0.06),
              0 20px 60px rgba(0,0,0,0.1),
              0 4px 16px rgba(0,0,0,0.06);
            position: relative;
          }
          .cs-image-wrap img {
            width: 100%;
            height: auto;
            display: block;
            aspect-ratio: 16/9;
            object-fit: cover;
          }

          /* Alternating: even rows flip the order */
          .cs-row.reverse .cs-text { order: 2; }
          .cs-row.reverse .cs-image-wrap { order: 1; }

          /* ── CTA section ── */
          .cs-cta {
            background: linear-gradient(135deg, rgba(254,243,199,0.70) 0%, rgba(255,255,255,0.60) 40%, rgba(219,234,254,0.65) 100%);
            padding: 90px 40px;
            position: relative;
            overflow: hidden;
          }
          .cs-cta-orb1 {
            position: absolute; top: -80px; right: -80px;
            width: 320px; height: 320px; border-radius: 50%;
            background: radial-gradient(circle, rgba(254,151,0,0.12) 0%, transparent 70%);
            pointer-events: none;
          }
          .cs-cta-orb2 {
            position: absolute; bottom: -60px; left: -60px;
            width: 240px; height: 240px; border-radius: 50%;
            background: radial-gradient(circle, rgba(15,52,96,0.07) 0%, transparent 70%);
            pointer-events: none;
          }
          .cs-cta-inner {
            max-width: 820px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 1;
          }
          .cs-cta-eyebrow {
            color: #FE9700;
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 16px;
          }
          .cs-cta-title {
            font-size: clamp(1.8rem, 3.5vw, 2.8rem);
            font-weight: 800;
            background: linear-gradient(90deg, #0F3460 0%, #F59E0B 50%, #7C3AED 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 18px;
            line-height: 1.25;
          }
          .cs-cta-sub {
            color: #4b5563;
            font-size: 1.05rem;
            line-height: 1.75;
            margin: 0 auto 36px;
            max-width: 520px;
          }
          .cs-cta-btns {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .cs-btn-primary {
            background: #0F3460;
            color: #fff;
            padding: 14px 32px;
            border-radius: 50px;
            font-weight: 700;
            text-decoration: none;
            font-size: 0.97rem;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          .cs-btn-secondary {
            background: rgba(15,52,96,0.07);
            color: #0F3460;
            padding: 14px 32px;
            border-radius: 50px;
            font-weight: 700;
            text-decoration: none;
            font-size: 0.97rem;
            border: 1.5px solid rgba(15,52,96,0.18);
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }

          /* ── Responsive ── */
          @media (max-width: 900px) {
            .cs-row {
              grid-template-columns: 1fr;
              gap: 40px;
              padding: 72px 24px;
            }
            .cs-row.reverse .cs-text { order: 0; }
            .cs-row.reverse .cs-image-wrap { order: 0; }
            .cs-hero-inner { padding: 0 24px; }
            .cs-num { font-size: 4rem; }
          }
        `}</style>
      </Head>

      {/* ── HERO ── */}
      <section className="cs-hero">
        <div className="cs-hero-orb1" />
        <div className="cs-hero-orb2" />
        <div className="cs-hero-inner">
          <p className="cs-eyebrow">Our Work</p>
          <h1 className="cs-hero-title">
            See how we&rsquo;ve helped brands evolve and thrive in this ever-changing world
          </h1>
          <p className="cs-hero-sub">
            15+ years of delivering measurable results for clients across US, Canada, Australia and beyond.
          </p>
          <a href="/contact" className="cs-hero-cta">
            <span className="cs-hero-avatars">
              {[
                { initials: 'AT', bg: '#FE9700' },
                { initials: 'RK', bg: '#0F3460' },
                { initials: 'PS', bg: '#7C3AED' },
                { initials: 'MJ', bg: '#10B981' },
              ].map((av, i) => (
                <span
                  key={i}
                  className="cs-avatar"
                  style={{ background: av.bg, marginLeft: i === 0 ? 0 : -10 }}
                >
                  {av.initials}
                </span>
              ))}
            </span>
            Connect with Experts
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <div className="cs-list">
        {CASE_STUDIES.map((cs, i) => (
          <div key={cs.num} className={`cs-row${i % 2 === 1 ? ' reverse' : ''}`}>

            {/* Text side */}
            <div className="cs-text">
              <div className="cs-num">{cs.num}</div>
              <h2 className="cs-title">{cs.title}</h2>
              <p className="cs-subtitle">{cs.subtitle}</p>
              <p className="cs-desc">{cs.desc}</p>
              <div className="cs-tags">
                {cs.tags.map((tag, ti) => {
                  const c = TAG_COLORS[ti % TAG_COLORS.length];
                  return (
                    <span
                      key={tag}
                      className="cs-tag"
                      style={{ background: c.bg, color: c.color, borderColor: c.border }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              {cs.url && (
                <a
                  href={cs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-link"
                >
                  View Project
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              )}
            </div>

            {/* Image side */}
            <div className="cs-image-wrap">
              <img
                src={cs.image}
                alt={`${cs.title} — case study`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>

          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <section className="cs-cta">
        <div className="cs-cta-orb1" />
        <div className="cs-cta-orb2" />
        <div className="cs-cta-inner">
          <p className="cs-cta-eyebrow">Start Your Project</p>
          <h2 className="cs-cta-title">Ready to Build Your Success Story?</h2>
          <p className="cs-cta-sub">
            Let&rsquo;s discuss your project and craft a strategy that delivers real, measurable results for your business.
          </p>
          <div className="cs-cta-btns">
            <Link href="/contact" className="cs-btn-primary">
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/portfolio" className="cs-btn-secondary">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
