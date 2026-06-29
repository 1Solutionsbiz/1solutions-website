import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { PROJECTS } from '../../lib/case-studies';

const CATEGORIES = ['All', 'Web Development', 'eCommerce', 'Digital Marketing', 'Mobile App', 'UI/UX Design'];

const MOBILE_APPS = [
  { id: 'ma1', num: '01', title: 'Booking & Scheduling App',  tags: ['Web App', 'Mobile App'], image: '/images/portfolio/zincfootball.png',       url: '/case-studies/zincfootball'      },
  { id: 'ma2', num: '02', title: 'Healthcare Patient Portal', tags: ['Web App', 'Mobile App'], image: '/images/portfolio/playaorthodontics.png',  url: '/case-studies/playaorthodontics' },
  { id: 'ma3', num: '03', title: 'Smart Commerce Platform',   tags: ['Mobile App'],            image: '/images/portfolio/aiplusstore.jpg',        url: '/case-studies/aiplusstore'       },
];

const TAG_COLORS = {
  'WordPress Development':   { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'WordPress':               { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'Custom PHP Theme':        { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'Custom Theme':            { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE' },
  'Shopify':                 { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
  'Liquid':                  { bg: '#D1FAE5', color: '#065F46', border: '#6EE7B7' },
  'WooCommerce':             { bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA' },
  'UI/UX Design':            { bg: '#EDE9FE', color: '#6D28D9', border: '#DDD6FE' },
  'Custom Development':      { bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
  'Custom Build':            { bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
  'Next.js':                 { bg: '#F5F3FF', color: '#5B21B6', border: '#C4B5FD' },
  'LinkedIn Marketing':      { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' },
  'Email Marketing':         { bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA' },
  'Laravel CRM':             { bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
  'Portal Design':           { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD' },
  'Conversion Optimisation': { bg: '#FEFCE8', color: '#A16207', border: '#FDE68A' },
  'eCommerce':               { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
  'SEO':                     { bg: '#FEFCE8', color: '#A16207', border: '#FDE68A' },
};
const FALLBACK_TAG_COLORS = [
  { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  { bg: '#EDE9FE', color: '#6D28D9', border: '#DDD6FE' },
  { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
  { bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA' },
  { bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
  { bg: '#FEFCE8', color: '#A16207', border: '#FDE68A' },
  { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD' },
];
function getTagStyle(tag) {
  if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash + tag.charCodeAt(i)) % FALLBACK_TAG_COLORS.length;
  return FALLBACK_TAG_COLORS[hash];
}

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      <Head>
        <title>Case Studies | 1Solutions – Real Results for Real Businesses</title>
        <meta name="description" content="Explore how 1Solutions has helped brands across US, Canada & Australia evolve through web development and digital marketing." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/case-studies" />
        <style>{`

/* ── HERO (original, untouched) ── */
.cs-hero{background:linear-gradient(135deg,rgba(254,243,199,.55) 0%,rgba(219,234,254,.35) 100%);position:relative;overflow:hidden;padding:100px 0 80px;min-height:400px;display:flex;align-items:center;}
.cs-hero-orb1{position:absolute;top:-80px;right:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,.13) 0%,transparent 70%);pointer-events:none;}
.cs-hero-orb2{position:absolute;bottom:-60px;left:-60px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.08) 0%,transparent 70%);pointer-events:none;}
.cs-hero-inner{max-width:1200px;margin:0 auto;padding:0 48px;position:relative;z-index:1;}
.cs-eyebrow{color:#D97706;font-size:.82rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:20px;}
.cs-hero-title{font-size:clamp(2rem,4vw,3.25rem);font-weight:800;line-height:1.2;max-width:720px;margin-bottom:24px;background:linear-gradient(90deg,#0F3460 0%,#F59E0B 45%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.cs-hero-sub{color:#4b5563;font-size:1.05rem;max-width:540px;margin-bottom:40px;line-height:1.75;}
.cs-hero-cta{display:inline-flex;align-items:center;gap:14px;background:rgba(15,52,96,.07);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,.18);border-radius:50px;padding:12px 24px 12px 14px;color:#0F3460;text-decoration:none;font-size:.95rem;font-weight:600;}
.cs-hero-avatars{display:flex;align-items:center;}
.cs-avatar{width:32px;height:32px;border-radius:50%;border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:800;color:#fff;flex-shrink:0;}

/* ── CASE STUDIES LIST ── */
.cs-body {
  background: #fff;
}
.cs-body-inner {
  max-width: 1280px; margin: 0 auto; padding: 0 64px;
}

/* Filter tabs */
.cs-filter-bar {
  display: flex;
  border-bottom: 1px solid #E5E5E5;
  padding-top: 56px;
  overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
}
.cs-filter-bar::-webkit-scrollbar { display: none; }
.cs-filter-btn {
  padding: 14px 24px;
  font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
  color: #999; background: none; border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer; white-space: nowrap; margin-bottom: -1px;
  transition: color .18s, border-color .18s;
}
.cs-filter-btn:hover { color: #111; }
.cs-filter-btn.active { color: #111; border-bottom-color: #111; }

/* Each numbered entry */
.cs-entry {
  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: start;
  padding: 72px 0;
  border-bottom: 1px solid #EBEBEB;
}
.cs-entry:last-child { border-bottom: none; }

.cs-entry-left {
  padding-right: 40px;
  position: sticky;
  top: 80px;
}
.cs-entry-num-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 16px;
}
.cs-entry-num {
  font-size: 13px; font-weight: 600;
  color: #BBBBBB; letter-spacing: 0.04em;
  flex-shrink: 0;
}
.cs-entry-title {
  font-size: clamp(1.55rem, 2.2vw, 2rem);
  font-weight: 800; color: #111;
  letter-spacing: -0.025em; line-height: 1.2;
}
.cs-entry-industry {
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #AAAAAA; margin-bottom: 14px;
}
.cs-entry-desc {
  font-size: 14px; color: #555; line-height: 1.8;
  margin-bottom: 24px;
}
.cs-entry-tags {
  display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 28px;
}
.cs-entry-tag {
  font-size: 12px; font-weight: 600;
  border: 1.5px solid; border-radius: 50px;
  padding: 5px 16px;
  transition: opacity .2s;
}
.cs-entry-tag:hover { opacity: 0.75; }
.cs-entry-link {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 700; color: #114171;
  border: 2px solid #114171; border-radius: 50px;
  padding: 11px 24px; text-decoration: none;
  transition: background .2s, color .2s;
}
.cs-entry-link:hover { background: #114171; color: #fff; }

.cs-entry-right {}
.cs-entry-img {
  width: 100%; display: block;
  aspect-ratio: 16/10; object-fit: cover;
  border-radius: 14px;
}

/* dual-image layout (Sparx "My Life Well" style) */
.cs-imgs-double {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 12px;
  align-items: stretch;
}
.cs-img-wide {
  width: 100%; display: block;
  aspect-ratio: 16/10; object-fit: cover;
  object-position: left center;
  border-radius: 14px;
}
.cs-img-tall {
  width: 100%; display: block;
  aspect-ratio: 3/4; object-fit: cover;
  object-position: right top;
  border-radius: 14px;
}

/* ── CTA ── */
.cs-cta {
  background: #0A1628; padding: 96px 64px;
  position: relative; overflow: hidden;
}
.cs-cta-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);
  background-size: 60px 60px;
}
.cs-cta-inner { max-width: 680px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
.cs-cta-k { font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#FE9700;margin-bottom:18px; }
.cs-cta-h { font-size:clamp(2rem,3.2vw,2.8rem);font-weight:800;color:#fff;letter-spacing:-.025em;line-height:1.15;margin-bottom:18px; }
.cs-cta-s { font-size:16px;color:rgba(255,255,255,.45);line-height:1.8;margin:0 auto 40px;max-width:440px; }
.cs-cta-btns { display:flex;gap:14px;justify-content:center;flex-wrap:wrap; }
.cs-cta-b1 { display:inline-flex;align-items:center;gap:10px;background:#FE9700;color:#fff;padding:14px 28px;border-radius:6px;font-size:14px;font-weight:700;text-decoration:none;transition:background .2s; }
.cs-cta-b1:hover { background:#e08600; }
.cs-cta-b2 { display:inline-flex;align-items:center;gap:10px;color:rgba(255,255,255,.65);padding:14px 28px;border-radius:6px;font-size:14px;font-weight:700;text-decoration:none;border:1.5px solid rgba(255,255,255,.14);transition:border-color .2s,color .2s; }
.cs-cta-b2:hover { border-color:rgba(255,255,255,.4);color:#fff; }

/* ── MOBILE APP CARD SHOWCASE ── */
.cs-apps-section {
  background: #fff;
  padding: 96px 0 0;
}
.cs-apps-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 64px;
}
.cs-apps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.cs-app-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 20px;
}
.cs-app-num {
  font-size: 13px; font-weight: 700;
  color: #BBBBBB; letter-spacing: 0.04em;
  flex-shrink: 0;
}
.cs-app-title {
  font-size: clamp(1.25rem, 1.6vw, 1.6rem);
  font-weight: 800; color: #111;
  letter-spacing: -0.025em; line-height: 1.2;
}
.cs-app-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 3/4;
}
.cs-app-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform .45s ease;
}
.cs-app-card:hover .cs-app-img { transform: scale(1.04); }
.cs-app-pills {
  position: absolute;
  bottom: 20px; left: 20px;
  display: flex; gap: 8px; flex-wrap: wrap;
}
.cs-app-pill {
  font-size: 13px; font-weight: 600;
  color: #111; background: #fff;
  border-radius: 50px;
  padding: 8px 18px;
}
.cs-app-link {
  display: inline-flex; align-items: center; gap: 8px;
  margin-top: 18px;
  font-size: 13px; font-weight: 700; color: #114171;
  border: 2px solid #114171; border-radius: 50px;
  padding: 11px 24px; text-decoration: none;
  transition: background .2s, color .2s;
}
.cs-app-link:hover { background: #114171; color: #fff; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .cs-entry { grid-template-columns: 260px 1fr; }
}
@media (max-width: 860px) {
  .cs-body-inner { padding-left: 20px; padding-right: 20px; }
  .cs-hero-inner { padding: 0 20px; }
  .cs-hero { padding: 80px 0 60px; }
  .cs-filter-bar { padding-top: 36px; }
  .cs-entry { grid-template-columns: 1fr; padding: 48px 0; }
  .cs-entry-left { position: static; padding-right: 0; margin-bottom: 28px; }
  .cs-imgs-double { grid-template-columns: 1fr; }
  .cs-img-tall { display: none; }
  .cs-apps-section { padding-top: 64px; }
  .cs-apps-inner { padding-left: 20px; padding-right: 20px; }
  .cs-apps-grid { grid-template-columns: 1fr; gap: 40px; }
  .cs-cta { padding-left: 24px; padding-right: 24px; }
}
@media (max-width: 600px) {
  .cs-hero { padding: 70px 0 48px; min-height: unset; }
  .cs-hero-sub { margin-bottom: 28px; font-size: .95rem; }
  .cs-filter-btn { padding: 10px 14px; font-size: 13px; }
  .cs-entry { padding: 36px 0; }
  .cs-entry-tags { margin-bottom: 20px; }
  .cs-apps-section { padding-top: 48px; }
  .cs-cta { padding: 56px 20px; }
}
@media (max-width: 480px) {
  .cs-body-inner { padding-left: 16px; padding-right: 16px; }
  .cs-hero-inner { padding: 0 16px; }
  .cs-hero { padding: 60px 0 40px; }
  .cs-apps-inner { padding-left: 16px; padding-right: 16px; }
  .cs-entry { padding: 28px 0; }
  .cs-apps-grid { gap: 32px; }
  .cs-hero-cta { font-size: .875rem; padding: 10px 18px 10px 12px; }
  .cs-entry-link, .cs-app-link { padding: 10px 20px; font-size: 12px; }
  .cs-filter-bar { padding-top: 28px; }
}
        `}</style>
      </Head>

      {/* ── HERO — original, untouched ── */}
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
          <a href="/contact-us" className="cs-hero-cta">
            <span className="cs-hero-avatars">
              {[
                { initials: 'AT', bg: '#FE9700' },
                { initials: 'RK', bg: '#0F3460' },
                { initials: 'PS', bg: '#7C3AED' },
                { initials: 'MJ', bg: '#10B981' },
              ].map((av, i) => (
                <span key={i} className="cs-avatar" style={{ background: av.bg, marginLeft: i === 0 ? 0 : -10 }}>
                  {av.initials}
                </span>
              ))}
            </span>
            Connect with Experts
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* ── CASE STUDIES LIST ── */}
      <div className="cs-body">
        <div className="cs-body-inner">

          {/* Filter tabs — no heading above */}
          <div className="cs-filter-bar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cs-filter-btn${activeFilter === cat ? ' active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Numbered entries */}
          {filtered.map((p, i) => (
            <div key={p.id} className="cs-entry">

              <div className="cs-entry-left">
                <div className="cs-entry-num-row">
                  <span className="cs-entry-num">{String(i + 1).padStart(2, '0')}</span>
                  <Link href={`/case-studies/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h2 className="cs-entry-title">{p.title}</h2>
                  </Link>
                </div>
                <div className="cs-entry-industry">{p.industry}</div>
                <p className="cs-entry-desc">{p.desc}</p>
                <div className="cs-entry-tags">
                  {p.tech.map(t => {
                    const ts = getTagStyle(t);
                    return (
                      <span key={t} className="cs-entry-tag" style={{ background: ts.bg, color: ts.color, borderColor: ts.border }}>{t}</span>
                    );
                  })}
                </div>
                <Link href={`/case-studies/${p.id}`} className="cs-entry-link">
                  Read Case Study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>

              <Link href={`/case-studies/${p.id}`} className="cs-entry-right" style={{ display: 'block', textDecoration: 'none' }}>
                {p.dual ? (
                  <div className="cs-imgs-double">
                    <img src={p.image} alt={p.title} className="cs-img-wide" loading={i < 3 ? 'eager' : 'lazy'} />
                    <img src={p.image} alt={`${p.title} detail`} className="cs-img-tall" loading="lazy" />
                  </div>
                ) : (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="cs-entry-img"
                    loading={i < 3 ? 'eager' : 'lazy'}
                  />
                )}
              </Link>

            </div>
          ))}

        </div>
      </div>

      {/* ── MOBILE APP CARD SHOWCASE ── */}
      <section className="cs-apps-section">
        <div className="cs-apps-inner">
          <div className="cs-apps-grid">
            {MOBILE_APPS.map(app => (
              <div key={app.id}>
                <div className="cs-app-header">
                  <span className="cs-app-num">{app.num}</span>
                  <h3 className="cs-app-title">{app.title}</h3>
                </div>
                <div className="cs-app-card">
                  <img src={app.image} alt={app.title} className="cs-app-img" loading="lazy" />
                  <div className="cs-app-pills">
                    {app.tags.map(t => (
                      <span key={t} className="cs-app-pill">{t}</span>
                    ))}
                  </div>
                </div>
                <Link href={app.url} className="cs-app-link">
                  View Details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cs-cta">
        <div className="cs-cta-grid" />
        <div className="cs-cta-inner">
          <p className="cs-cta-k">Let&rsquo;s Work Together</p>
          <h2 className="cs-cta-h">Ready to build your success story?</h2>
          <p className="cs-cta-s">Tell us about your project. We&rsquo;ll bring strategy, design, and engineering to make it happen.</p>
          <div className="cs-cta-btns">
            <Link href="/contact-us" className="cs-cta-b1">
              Start a Project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/portfolio" className="cs-cta-b2">View Full Portfolio</Link>
          </div>
        </div>
      </section>
    </>
  );
}
