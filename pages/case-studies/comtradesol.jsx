import Head from 'next/head';
import Link from 'next/link';

export default function ComtradesolCaseStudy() {
  return (
    <>
      <Head>
        <title>Comtradesol Case Study — Corporate Website & LinkedIn Marketing | 1Solutions</title>
        <meta name="description" content="How 1Solutions built a professional WordPress website and managed LinkedIn marketing for Comtradesol Advisory Services, a Gurgaon-based financial advisory firm." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/case-studies/comtradesol" />
        <style>{`
          * { box-sizing: border-box; }

          /* ── Hero ── */
          .csc-hero {
            position: relative;
            background: #0a1f14;
            overflow: hidden;
          }
          .csc-hero-img {
            width: 100%;
            max-height: 680px;
            object-fit: cover;
            object-position: center top;
            display: block;
          }
          .csc-hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(10,31,20,0.15) 0%, rgba(10,31,20,0.55) 100%);
          }
          .csc-breadcrumb {
            position: absolute;
            top: 28px;
            left: 0;
            right: 0;
            max-width: 1160px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: rgba(255,255,255,0.75);
            z-index: 2;
          }
          .csc-breadcrumb a { color: rgba(255,255,255,0.75); text-decoration: none; }
          .csc-breadcrumb a:hover { color: #fff; }
          .csc-breadcrumb span { color: rgba(255,255,255,0.45); }

          /* ── Meta strip ── */
          .csc-meta-strip {
            background: #fff;
            border-bottom: 1px solid #f0f0f0;
            padding: 0;
          }
          .csc-meta-inner {
            max-width: 1160px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            align-items: stretch;
            gap: 0;
          }
          .csc-meta-item {
            padding: 28px 40px 28px 0;
            margin-right: 40px;
            border-right: 1px solid #f0f0f0;
            flex-shrink: 0;
          }
          .csc-meta-item:last-child { border-right: none; margin-right: 0; }
          .csc-meta-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: #9ca3af;
            margin-bottom: 6px;
          }
          .csc-meta-value {
            font-size: 14px;
            font-weight: 600;
            color: #111827;
            line-height: 1.4;
          }
          .csc-meta-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            padding: 20px 0;
          }
          .csc-meta-tag {
            font-size: 12px;
            font-weight: 600;
            padding: 4px 12px;
            border-radius: 20px;
            border: 1px solid;
          }

          /* ── Body layout ── */
          .csc-body {
            max-width: 1160px;
            margin: 0 auto;
            padding: 72px 40px 80px;
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 80px;
            align-items: start;
          }

          /* ── Content (left) ── */
          .csc-content h2 {
            font-size: clamp(1.5rem, 2.5vw, 2rem);
            font-weight: 800;
            color: #0a1628;
            margin: 0 0 16px;
            line-height: 1.25;
          }
          .csc-content p {
            font-size: 16px;
            color: #4b5563;
            line-height: 1.8;
            margin: 0 0 20px;
          }
          .csc-section { margin-bottom: 60px; }
          .csc-section:last-child { margin-bottom: 0; }

          .csc-eyebrow {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: #D97706;
            margin-bottom: 12px;
          }

          /* Feature grid */
          .csc-feature-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 24px;
          }
          .csc-feature-card {
            background: #f9fafb;
            border: 1px solid #f0f0f0;
            border-radius: 12px;
            padding: 22px;
          }
          .csc-feature-icon {
            width: 40px; height: 40px;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 14px;
          }
          .csc-feature-card h3 {
            font-size: 14px;
            font-weight: 700;
            color: #111827;
            margin: 0 0 8px;
          }
          .csc-feature-card p {
            font-size: 13px;
            color: #6b7280;
            line-height: 1.6;
            margin: 0;
          }

          /* Result stats */
          .csc-results-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 28px 0;
          }
          .csc-stat-card {
            background: linear-gradient(135deg, #0a1f14 0%, #133a20 100%);
            border-radius: 14px;
            padding: 28px 20px;
            text-align: center;
            color: #fff;
          }
          .csc-stat-num {
            font-size: 2.2rem;
            font-weight: 900;
            color: #D4A22A;
            line-height: 1;
            margin-bottom: 8px;
          }
          .csc-stat-label {
            font-size: 13px;
            color: rgba(255,255,255,0.7);
            font-weight: 500;
          }

          /* Tech stack */
          .csc-tech-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
          }
          .csc-tech-pill {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 13px;
            font-weight: 600;
            color: #374151;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          /* Quote */
          .csc-quote {
            background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
            border-left: 4px solid #16a34a;
            border-radius: 0 12px 12px 0;
            padding: 28px 32px;
            margin: 32px 0;
          }
          .csc-quote p {
            font-size: 16px;
            font-style: italic;
            color: #166534;
            margin: 0 0 12px;
            line-height: 1.7;
          }
          .csc-quote-author {
            font-size: 13px;
            font-weight: 700;
            color: #166534;
          }

          /* ── Sidebar ── */
          .csc-sidebar {
            position: sticky;
            top: 100px;
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .csc-sidebar-card {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            padding: 24px;
          }
          .csc-sidebar-card h3 {
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #9ca3af;
            margin: 0 0 16px;
          }
          .csc-sidebar-link {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            background: #0a1f14;
            color: #fff;
            border-radius: 8px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 10px;
            transition: opacity 0.2s;
          }
          .csc-sidebar-link:hover { opacity: 0.85; }
          .csc-sidebar-link.secondary {
            background: #f9fafb;
            color: #0a1628;
            border: 1px solid #e5e7eb;
          }
          .csc-sidebar-link.secondary:hover { background: #f3f4f6; }

          .csc-sidebar-stat {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #f3f4f6;
            font-size: 13px;
          }
          .csc-sidebar-stat:last-child { border-bottom: none; padding-bottom: 0; }
          .csc-sidebar-stat-label { color: #6b7280; }
          .csc-sidebar-stat-value { font-weight: 700; color: #111827; }

          .csc-next-case {
            background: linear-gradient(135deg, #0F3460 0%, #1a4a7a 100%);
            border-radius: 14px;
            padding: 24px;
            color: #fff;
            text-decoration: none;
            display: block;
          }
          .csc-next-case:hover { opacity: 0.92; }
          .csc-next-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: rgba(255,255,255,0.55);
            margin-bottom: 8px;
          }
          .csc-next-title {
            font-size: 15px;
            font-weight: 700;
            color: #fff;
            line-height: 1.4;
            margin-bottom: 12px;
          }
          .csc-next-arrow {
            color: #FE9700;
            font-size: 20px;
          }

          /* ── CTA ── */
          .csc-cta {
            background: linear-gradient(135deg, #0a1f14 0%, #133a20 100%);
            padding: 90px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .csc-cta-orb {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
          }
          .csc-cta h2 {
            font-size: clamp(1.8rem, 3vw, 2.6rem);
            font-weight: 800;
            color: #fff;
            margin: 0 0 16px;
            line-height: 1.25;
          }
          .csc-cta h2 span { color: #D4A22A; }
          .csc-cta p {
            font-size: 16px;
            color: rgba(255,255,255,0.65);
            max-width: 500px;
            margin: 0 auto 36px;
            line-height: 1.75;
          }
          .csc-cta-btns {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .csc-cta-primary {
            background: #D4A22A;
            color: #0a1f14;
            padding: 14px 32px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 15px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }
          .csc-cta-secondary {
            background: rgba(255,255,255,0.08);
            color: #fff;
            padding: 14px 32px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 15px;
            text-decoration: none;
            border: 1.5px solid rgba(255,255,255,0.2);
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }

          /* ── Responsive ── */
          @media (max-width: 960px) {
            .csc-body { grid-template-columns: 1fr; gap: 48px; padding: 48px 24px 64px; }
            .csc-sidebar { position: static; }
            .csc-meta-inner { flex-wrap: wrap; gap: 0; }
            .csc-meta-item { padding: 20px 24px 20px 0; margin-right: 24px; }
            .csc-breadcrumb { padding: 0 24px; }
            .csc-results-row { grid-template-columns: 1fr 1fr; }
            .csc-feature-grid { grid-template-columns: 1fr; }
          }
          @media (max-width: 600px) {
            .csc-meta-inner { padding: 0 16px; }
            .csc-meta-item { padding: 16px 16px 16px 0; margin-right: 16px; border-right: none; }
            .csc-body { padding: 36px 16px 48px; }
            .csc-results-row { grid-template-columns: 1fr; }
            .csc-cta { padding: 60px 16px; }
          }
        `}</style>
      </Head>

      {/* ── HERO ── */}
      <section className="csc-hero">
        <img
          src="/images/portfolio/comtradesol-showcase.jpg"
          alt="Comtradesol Advisory Services — Portfolio Website by 1Solutions"
          className="csc-hero-img"
        />
        <div className="csc-hero-overlay" />
        <nav className="csc-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/case-studies">Case Studies</Link>
          <span>›</span>
          <span style={{ color: '#fff' }}>Comtradesol</span>
        </nav>
      </section>

      {/* ── META STRIP ── */}
      <div className="csc-meta-strip">
        <div className="csc-meta-inner">
          <div className="csc-meta-item">
            <div className="csc-meta-label">Client</div>
            <div className="csc-meta-value">Comtradesol Advisory<br />Services Pvt. Ltd.</div>
          </div>
          <div className="csc-meta-item">
            <div className="csc-meta-label">Industry</div>
            <div className="csc-meta-value">Financial Advisory</div>
          </div>
          <div className="csc-meta-item">
            <div className="csc-meta-label">Location</div>
            <div className="csc-meta-value">Gurgaon, India</div>
          </div>
          <div className="csc-meta-item">
            <div className="csc-meta-label">Year</div>
            <div className="csc-meta-value">2024</div>
          </div>
          <div className="csc-meta-item" style={{ flex: 1, borderRight: 'none' }}>
            <div className="csc-meta-tags">
              {[
                { label: 'WordPress Development', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
                { label: 'UI/UX Design', bg: '#EDE9FE', color: '#6D28D9', border: '#DDD6FE' },
                { label: 'LinkedIn Marketing', bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
              ].map(t => (
                <span key={t.label} className="csc-meta-tag" style={{ background: t.bg, color: t.color, borderColor: t.border }}>
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="csc-body">

        {/* ── LEFT: Content ── */}
        <div className="csc-content">

          {/* Overview */}
          <div className="csc-section">
            <p className="csc-eyebrow">Project Overview</p>
            <h2>Building Digital Credibility for a Financial Advisory Firm</h2>
            <p>
              Comtradesol Advisory Services Pvt. Ltd. is a Gurgaon-based startup advisory firm incorporated in 2024 by a group of seasoned professionals from diverse financial backgrounds. The firm offers end-to-end solutions in Trade Finance, Debt Syndication, Equity Advisory, Credit Rating, and a range of corporate finance advisory services across industries.
            </p>
            <p>
              As a newly launched firm operating in a trust-driven industry, Comtradesol needed a digital presence that immediately communicated authority, professionalism, and deep domain expertise — before prospects ever picked up the phone.
            </p>
          </div>

          {/* Challenge */}
          <div className="csc-section">
            <p className="csc-eyebrow">The Challenge</p>
            <h2>Standing Out in a Credibility-First Industry</h2>
            <p>
              Financial advisory is one of the most trust-sensitive sectors in digital marketing. Prospects evaluate a firm's website within seconds — and a poorly designed or generic presence can cost a firm its credibility before any conversation begins.
            </p>
            <p>
              Comtradesol faced three specific challenges: they needed a website that felt established despite being newly founded, a clear articulation of their multi-service offering without overwhelming visitors, and a LinkedIn presence that would reach their core audience of CFOs, promoters, and institutional clients.
            </p>
          </div>

          {/* Solution */}
          <div className="csc-section">
            <p className="csc-eyebrow">Our Solution</p>
            <h2>A Custom WordPress Site Built for Trust and Conversion</h2>
            <p>
              1Solutions designed and developed a fully custom WordPress website for Comtradesol — built from scratch with a bespoke theme that reflects the firm's identity in the financial sector. Every design decision was made with credibility in mind: a structured layout, authoritative typography, a restrained colour palette, and clear service segmentation.
            </p>

            <div className="csc-feature-grid">
              {[
                {
                  icon: '🎨',
                  bg: '#EDE9FE',
                  title: 'Custom WordPress Theme',
                  desc: 'Designed and built a bespoke theme from the ground up — no templates. Every element was crafted to reflect Comtradesol\'s brand identity.',
                },
                {
                  icon: '📐',
                  bg: '#EFF6FF',
                  title: 'UI/UX Design',
                  desc: 'Clean, structured layouts with intuitive navigation. Service pages were designed to guide visitors toward conversion without clutter.',
                },
                {
                  icon: '📱',
                  bg: '#ECFDF5',
                  title: 'Fully Responsive',
                  desc: 'Pixel-perfect responsiveness across desktop, tablet, and mobile — essential for reaching C-suite professionals on all devices.',
                },
                {
                  icon: '💼',
                  bg: '#FFF7ED',
                  title: 'LinkedIn Management',
                  desc: 'Created and managed the company LinkedIn profile — content strategy, post scheduling, and audience growth to build brand authority.',
                },
              ].map(f => (
                <div key={f.title} className="csc-feature-card">
                  <div className="csc-feature-icon" style={{ background: f.bg }}>
                    <span style={{ fontSize: '20px' }}>{f.icon}</span>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="csc-section">
            <p className="csc-eyebrow">The Results</p>
            <h2>A Professional Launchpad for a Growing Advisory Firm</h2>
            <p>
              Within weeks of launch, Comtradesol had a polished corporate presence that aligned with the level of confidence their clients were already placing in them. The website and LinkedIn profile together established a complete digital footprint that the firm continues to build on.
            </p>

            <div className="csc-results-row">
              {[
                { num: '100%', label: 'Custom design — no templates used' },
                { num: '3×', label: 'Faster LinkedIn follower growth' },
                { num: '5★', label: 'Client satisfaction rating' },
              ].map(s => (
                <div key={s.label} className="csc-stat-card">
                  <div className="csc-stat-num">{s.num}</div>
                  <div className="csc-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="csc-quote">
              <p>
                "1Solutions understood exactly what a financial firm needs online — professionalism, clarity, and trust. The website they built for us is exactly the image we wanted to project to our clients."
              </p>
              <div className="csc-quote-author">— Comtradesol Advisory Services Pvt. Ltd.</div>
            </div>
          </div>

          {/* Tech stack */}
          <div className="csc-section">
            <p className="csc-eyebrow">Technology & Tools</p>
            <h2>What We Built With</h2>
            <div className="csc-tech-list">
              {['WordPress', 'Custom PHP Theme', 'HTML5 / CSS3', 'JavaScript', 'Figma', 'LinkedIn Business Manager', 'Google Analytics', 'SEO Fundamentals'].map(t => (
                <span key={t} className="csc-tech-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT: Sidebar ── */}
        <aside className="csc-sidebar">

          <div className="csc-sidebar-card">
            <h3>Project at a Glance</h3>
            {[
              { label: 'Client', value: 'Comtradesol' },
              { label: 'Industry', value: 'Financial Advisory' },
              { label: 'Country', value: 'India' },
              { label: 'Timeline', value: '6 weeks' },
              { label: 'Platform', value: 'WordPress' },
              { label: 'Live Since', value: '2024' },
            ].map(s => (
              <div key={s.label} className="csc-sidebar-stat">
                <span className="csc-sidebar-stat-label">{s.label}</span>
                <span className="csc-sidebar-stat-value">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="csc-sidebar-card">
            <h3>Visit the Live Site</h3>
            <a href="https://www.comtradesol.com/" target="_blank" rel="noopener noreferrer" className="csc-sidebar-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              comtradesol.com
            </a>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '8px 0 0', lineHeight: 1.5 }}>Opens in a new tab</p>
          </div>

          <div className="csc-sidebar-card">
            <h3>Need a Similar Website?</h3>
            <Link href="/contact-us" className="csc-sidebar-link" style={{ marginBottom: '10px' }}>
              Start Your Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/wordpress-development-company" className="csc-sidebar-link secondary">
              WordPress Services
            </Link>
          </div>

          <Link href="/case-studies" className="csc-next-case">
            <div className="csc-next-label">← Back to</div>
            <div className="csc-next-title">All Case Studies</div>
            <div className="csc-next-arrow">→</div>
          </Link>

        </aside>
      </div>

      {/* ── CTA ── */}
      <section className="csc-cta">
        <div className="csc-cta-orb" style={{ top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212,162,42,0.12) 0%, transparent 70%)' }} />
        <div className="csc-cta-orb" style={{ bottom: '-80px', left: '-80px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />
        <h2>Want a Website That <span>Builds Trust</span> from Day One?</h2>
        <p>
          We've helped financial firms, startups, and enterprises across India build digital presences that drive real business outcomes.
        </p>
        <div className="csc-cta-btns">
          <Link href="/contact-us" className="csc-cta-primary">
            Start Your Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/case-studies" className="csc-cta-secondary">
            More Case Studies
          </Link>
        </div>
      </section>
    </>
  );
}
