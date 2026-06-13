import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    tag: null,
    price: 299,
    desc: 'For small businesses and local brands ready to be found online.',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
    features: [
      { label: 'Keywords Targeted', value: 'Up to 10' },
      { label: 'On-Page Optimisation', value: '10 pages' },
      { label: 'Technical SEO Audit', value: true },
      { label: 'Google Analytics & Search Console', value: true },
      { label: 'XML Sitemap & Robots.txt', value: true },
      { label: 'Local SEO (Google Business Profile)', value: true },
      { label: 'Monthly Backlinks', value: '5–8' },
      { label: 'Blog / Content Articles', value: '2 / month' },
      { label: 'Schema Markup', value: false },
      { label: 'Competitor Analysis', value: false },
      { label: 'Dedicated Account Manager', value: false },
      { label: 'Monthly Report', value: true },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    tag: 'Most Popular',
    price: 599,
    desc: 'For growing businesses that need consistent rankings and traffic.',
    color: '#114171',
    gradient: 'linear-gradient(135deg,#114171,#6366f1)',
    features: [
      { label: 'Keywords Targeted', value: 'Up to 25' },
      { label: 'On-Page Optimisation', value: '25 pages' },
      { label: 'Technical SEO Audit', value: true },
      { label: 'Google Analytics & Search Console', value: true },
      { label: 'XML Sitemap & Robots.txt', value: true },
      { label: 'Local SEO (Google Business Profile)', value: true },
      { label: 'Monthly Backlinks', value: '15–20' },
      { label: 'Blog / Content Articles', value: '4 / month' },
      { label: 'Schema Markup', value: true },
      { label: 'Competitor Analysis', value: true },
      { label: 'Dedicated Account Manager', value: false },
      { label: 'Monthly Report', value: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tag: 'Best Results',
    price: 999,
    desc: 'For established brands targeting competitive national or global keywords.',
    color: '#059669',
    gradient: 'linear-gradient(135deg,#059669,#0ea5e9)',
    features: [
      { label: 'Keywords Targeted', value: 'Up to 60' },
      { label: 'On-Page Optimisation', value: 'Unlimited' },
      { label: 'Technical SEO Audit', value: true },
      { label: 'Google Analytics & Search Console', value: true },
      { label: 'XML Sitemap & Robots.txt', value: true },
      { label: 'Local SEO (Google Business Profile)', value: true },
      { label: 'Monthly Backlinks', value: '35–50' },
      { label: 'Blog / Content Articles', value: '8 / month' },
      { label: 'Schema Markup', value: true },
      { label: 'Competitor Analysis', value: true },
      { label: 'Dedicated Account Manager', value: true },
      { label: 'Monthly Report', value: true },
    ],
  },
];

const PROCESS = [
  { step: '01', title: 'SEO Audit', desc: 'We analyse your website — technical health, on-page quality, backlink profile, and current keyword rankings.', icon: '🔍' },
  { step: '02', title: 'Keyword Strategy', desc: 'We identify high-intent, achievable keywords your buyers are actually searching for — not just high-volume vanity terms.', icon: '🎯' },
  { step: '03', title: 'On-Page Optimisation', desc: 'We optimise title tags, meta descriptions, headings, content, internal links, and page speed for every target page.', icon: '📝' },
  { step: '04', title: 'Content & Link Building', desc: 'We publish authoritative content and build genuine backlinks from relevant, high-DA websites in your industry.', icon: '🔗' },
  { step: '05', title: 'Technical SEO', desc: 'Core Web Vitals, crawl budget, structured data, canonicals, and indexation — we fix what search engines care about.', icon: '⚙️' },
  { step: '06', title: 'Monthly Reporting', desc: 'You get a clear report every month: keyword movements, traffic trends, conversions, and next month\'s action plan.', icon: '📊' },
];

const FAQS = [
  { q: 'How long does SEO take to show results?', a: 'Most clients see meaningful ranking improvements within 3–6 months. SEO is a long-term investment — the compounding results over 12+ months are where the real ROI lies. We set realistic timelines from day one.' },
  { q: 'Do you guarantee first-page rankings?', a: 'No ethical SEO agency can guarantee specific rankings — Google\'s algorithm is not within anyone\'s control. What we guarantee is transparent, white-hat SEO work done to the highest standard, with measurable progress every month.' },
  { q: 'Can I upgrade my package later?', a: 'Yes — you can upgrade to a higher package at any time. Your existing work and progress carry forward. There is no lock-in; we earn your business month by month.' },
  { q: 'Do you work with businesses outside India?', a: 'Yes. The majority of our clients are in the US, Canada, and Australia. We work across all time zones with async communication and regular video check-ins.' },
  { q: 'Is content included in the package?', a: 'Yes. All packages include SEO blog articles written by our in-house content team, fully researched and optimised for your target keywords. Enterprise clients get 8 articles per month.' },
  { q: 'What makes 1Solutions different from other SEO agencies?', a: '15+ years of experience, 500+ projects delivered, and a team that has navigated every major algorithm update since 2008. We combine technical depth with genuine content quality — no shortcuts, no grey-hat tactics.' },
];

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    const t = setTimeout(() => obs.observe(el), delay);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [delay]);
  return [ref, visible];
}

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  const [ref, visible] = useReveal(index * 80);
  return (
    <div ref={ref} className={`sp-faq-item${open ? ' open' : ''}${visible ? ' sp-in' : ''}`} style={{ transitionDelay: `${index * 60}ms` }}>
      <button className="sp-faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <svg className="sp-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      {open && <div className="sp-faq-a">{a}</div>}
    </div>
  );
}

export default function AffordableSeoPackages() {
  const [billing, setBilling] = useState('monthly');

  const price = (base) => billing === 'annual' ? Math.round(base * 0.8) : base;
  const saving = (base) => Math.round(base * 0.2 * 12);

  return (
    <>
      <Head>
        <title>Affordable SEO Packages | 1Solutions — Starting at $299/month</title>
        <meta name="description" content="Affordable SEO packages from 1Solutions — Starter at $299/mo, Professional at $599/mo, Enterprise at $999/mo. 15+ years of SEO expertise, white-hat only, monthly reports." />
        <link rel="canonical" href="https://www.1solutions.biz/affordable-seo-packages/" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          .sp-page { font-family: 'Inter', sans-serif; color: #1a1a2e; background: #f8fafc; }

          /* ── Hero ── */
          .sp-hero { background: linear-gradient(150deg,#0F1F40 0%,#114171 50%,#0d3260 100%); padding: 100px 24px 80px; position: relative; overflow: hidden; text-align: center; }
          .sp-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
          .sp-orb-1 { width: 600px; height: 600px; background: rgba(99,102,241,0.18); top: -200px; right: -100px; }
          .sp-orb-2 { width: 450px; height: 450px; background: rgba(16,185,129,0.14); bottom: -150px; left: -80px; }
          .sp-hero-inner { max-width: 760px; margin: 0 auto; position: relative; z-index: 1; }
          .sp-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 100px; padding: 6px 18px; font-size: .8rem; font-weight: 700; color: rgba(255,255,255,0.85); letter-spacing: .07em; text-transform: uppercase; margin-bottom: 22px; }
          .sp-hero h1 { font-size: clamp(2.2rem,5vw,3.6rem); font-weight: 800; line-height: 1.1; letter-spacing: -.03em; color: #fff; margin-bottom: 18px; }
          .sp-hero h1 span { background: linear-gradient(90deg,#34d399,#60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .sp-hero-sub { font-size: 1.05rem; line-height: 1.72; color: rgba(255,255,255,0.72); max-width: 580px; margin: 0 auto 40px; }
          .sp-hero-chips { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; }
          .sp-chip { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); border-radius: 100px; padding: 8px 16px; font-size: .83rem; font-weight: 600; color: rgba(255,255,255,0.88); }
          .sp-chip-dot { width: 7px; height: 7px; border-radius: 50%; background: #34d399; flex-shrink: 0; }

          /* ── Stats strip ── */
          .sp-stats { background: #fff; border-bottom: 1px solid #e5e7eb; }
          .sp-stats-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: repeat(4,1fr); }
          .sp-stat { padding: 28px 24px; text-align: center; border-right: 1px solid #e5e7eb; }
          .sp-stat:last-child { border-right: none; }
          .sp-stat-val { font-size: 2rem; font-weight: 800; color: #114171; letter-spacing: -.03em; }
          .sp-stat-label { font-size: .78rem; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: .07em; margin-top: 4px; }

          /* ── Billing toggle ── */
          .sp-billing { text-align: center; padding: 56px 24px 12px; }
          .sp-billing-label { font-size: .9rem; color: #6b7280; margin-bottom: 14px; }
          .sp-toggle { display: inline-flex; background: #e5e7eb; border-radius: 100px; padding: 3px; }
          .sp-toggle-btn { padding: 8px 22px; border-radius: 100px; border: none; font-size: .88rem; font-weight: 700; cursor: pointer; transition: all .2s; color: #6b7280; background: transparent; }
          .sp-toggle-btn.active { background: #114171; color: #fff; box-shadow: 0 2px 10px rgba(17,65,113,0.2); }
          .sp-save-pill { display: inline-flex; align-items: center; gap: 6px; background: #dcfce7; color: #166534; font-size: .78rem; font-weight: 700; padding: 4px 12px; border-radius: 100px; margin-left: 12px; vertical-align: middle; }

          /* ── Packages ── */
          .sp-packages { max-width: 1100px; margin: 0 auto; padding: 36px 24px 80px; display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; align-items: start; }
          .sp-pkg { background: #fff; border-radius: 20px; border: 1.5px solid #e5e7eb; overflow: hidden; transition: box-shadow .25s, transform .25s; }
          .sp-pkg:hover { box-shadow: 0 16px 48px rgba(17,65,113,0.12); transform: translateY(-4px); }
          .sp-pkg.popular { border-color: #114171; box-shadow: 0 8px 32px rgba(17,65,113,0.14); transform: translateY(-6px); }
          .sp-pkg-head { padding: 28px 26px 22px; position: relative; }
          .sp-pkg-tag { position: absolute; top: -1px; right: 20px; font-size: .72rem; font-weight: 800; text-transform: uppercase; letter-spacing: .07em; color: #fff; padding: 5px 14px; border-radius: 0 0 10px 10px; }
          .sp-pkg-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; font-size: 1.4rem; }
          .sp-pkg-name { font-size: 1.15rem; font-weight: 800; color: #0F1F40; margin-bottom: 6px; }
          .sp-pkg-desc { font-size: .86rem; line-height: 1.58; color: #6b7280; margin-bottom: 18px; }
          .sp-pkg-price-row { display: flex; align-items: flex-end; gap: 4px; margin-bottom: 6px; }
          .sp-pkg-price { font-size: 2.6rem; font-weight: 800; letter-spacing: -.04em; color: #0F1F40; line-height: 1; }
          .sp-pkg-price-meta { font-size: .82rem; color: #9ca3af; padding-bottom: 4px; }
          .sp-pkg-annual-note { font-size: .78rem; color: #059669; font-weight: 600; min-height: 18px; }
          .sp-pkg-cta { display: block; width: 100%; padding: 13px; border-radius: 100px; font-size: .92rem; font-weight: 700; text-align: center; text-decoration: none; margin-top: 18px; transition: all .2s; border: none; cursor: pointer; }
          .sp-pkg-cta-solid { color: #fff; }
          .sp-pkg-cta-solid:hover { filter: brightness(1.1); }
          .sp-pkg-divider { height: 1px; background: #f3f4f6; margin: 0; }
          .sp-pkg-features { padding: 22px 26px 26px; }
          .sp-pkg-features-title { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 14px; }
          .sp-feature { display: flex; align-items: flex-start; gap: 10px; padding: 7px 0; border-bottom: 1px solid #f3f4f6; }
          .sp-feature:last-child { border-bottom: none; }
          .sp-feature-check { flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 1px; }
          .sp-feature-check-yes { background: #dcfce7; }
          .sp-feature-check-no { background: #f3f4f6; }
          .sp-feature-label { font-size: .84rem; color: #374151; flex: 1; }
          .sp-feature-label.muted { color: #9ca3af; }
          .sp-feature-val { font-size: .83rem; font-weight: 700; color: #0F1F40; white-space: nowrap; }
          .sp-feature-val.muted { color: #9ca3af; }

          /* ── What's included ── */
          .sp-included { background: #fff; padding: 80px 24px; }
          .sp-included-inner { max-width: 1100px; margin: 0 auto; }
          .sp-section-eyebrow { font-size: .78rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #114171; margin-bottom: 10px; }
          .sp-section-title { font-size: clamp(1.7rem,3.5vw,2.4rem); font-weight: 800; color: #0F1F40; letter-spacing: -.025em; line-height: 1.2; margin-bottom: 14px; }
          .sp-section-sub { font-size: 1rem; line-height: 1.7; color: #4b5563; max-width: 560px; margin-bottom: 48px; }
          .sp-included-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
          .sp-included-card { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 14px; padding: 24px; transition: border-color .2s, box-shadow .2s; }
          .sp-included-card:hover { border-color: #114171; box-shadow: 0 4px 16px rgba(17,65,113,0.08); }
          .sp-inc-icon { width: 44px; height: 44px; border-radius: 11px; background: linear-gradient(135deg,rgba(17,65,113,0.08),rgba(99,102,241,0.12)); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 14px; }
          .sp-inc-title { font-size: .96rem; font-weight: 700; color: #0F1F40; margin-bottom: 8px; }
          .sp-inc-desc { font-size: .86rem; line-height: 1.6; color: #4b5563; }
          .sp-in { opacity: 0; translate: 0 20px; transition: opacity .4s, translate .4s; }
          .sp-in.visible { opacity: 1; translate: 0 0; }

          /* ── Process ── */
          .sp-process { background: linear-gradient(135deg,#0F1F40 0%,#114171 100%); padding: 80px 24px; position: relative; overflow: hidden; }
          .sp-process-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
          .sp-process-orb-1 { width: 500px; height: 500px; background: rgba(99,102,241,0.14); top: -150px; right: -100px; }
          .sp-process-orb-2 { width: 400px; height: 400px; background: rgba(16,185,129,0.1); bottom: -120px; left: -60px; }
          .sp-process-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
          .sp-process .sp-section-eyebrow { color: #34d399; }
          .sp-process .sp-section-title { color: #fff; margin-bottom: 12px; }
          .sp-process .sp-section-sub { color: rgba(255,255,255,0.68); }
          .sp-process-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
          .sp-process-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 24px; backdrop-filter: blur(4px); transition: border-color .2s, background .2s; }
          .sp-process-card:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
          .sp-step-num { font-size: .72rem; font-weight: 800; color: #34d399; letter-spacing: .1em; margin-bottom: 10px; }
          .sp-process-icon { font-size: 1.6rem; margin-bottom: 12px; }
          .sp-process-title { font-size: .97rem; font-weight: 700; color: #fff; margin-bottom: 8px; }
          .sp-process-desc { font-size: .86rem; line-height: 1.6; color: rgba(255,255,255,0.65); }

          /* ── FAQ ── */
          .sp-faq { background: #fff; padding: 80px 24px; }
          .sp-faq-inner { max-width: 760px; margin: 0 auto; }
          .sp-faq-list { display: flex; flex-direction: column; gap: 8px; margin-top: 40px; }
          .sp-faq-item { border: 1.5px solid #e5e7eb; border-radius: 12px; overflow: hidden; transition: border-color .2s, opacity .4s, translate .4s; }
          .sp-faq-item.open { border-color: #114171; }
          .sp-faq-item.sp-in { opacity: 0; translate: 0 16px; }
          .sp-faq-item.sp-in.visible { opacity: 1; translate: 0 0; }
          .sp-faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 20px; background: none; border: none; cursor: pointer; font-size: .95rem; font-weight: 600; color: #0F1F40; text-align: left; }
          .sp-faq-q:hover { background: #f8fafc; }
          .sp-faq-icon { flex-shrink: 0; transition: transform .2s; }
          .sp-faq-item.open .sp-faq-icon { transform: rotate(180deg); }
          .sp-faq-a { padding: 0 20px 18px; font-size: .9rem; line-height: 1.72; color: #4b5563; }

          /* ── CTA ── */
          .sp-cta { background: linear-gradient(135deg,#0F1F40 0%,#114171 100%); padding: 80px 24px; text-align: center; position: relative; overflow: hidden; }
          .sp-cta-inner { max-width: 640px; margin: 0 auto; position: relative; z-index: 1; }
          .sp-cta h2 { font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 800; color: #fff; letter-spacing: -.025em; line-height: 1.18; margin-bottom: 14px; }
          .sp-cta h2 span { background: linear-gradient(90deg,#34d399,#60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .sp-cta p { font-size: 1rem; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 36px; }
          .sp-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
          .sp-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; border-radius: 100px; font-size: .95rem; font-weight: 700; text-decoration: none; transition: all .2s; }
          .sp-btn-white { background: #fff; color: #114171; }
          .sp-btn-white:hover { background: #e0eaf7; }
          .sp-btn-outline { background: rgba(255,255,255,0.08); color: #fff; border: 1.5px solid rgba(255,255,255,0.25); }
          .sp-btn-outline:hover { background: rgba(255,255,255,0.15); }

          @media(max-width:900px){
            .sp-packages { grid-template-columns: 1fr; max-width: 480px; }
            .sp-pkg.popular { transform: none; }
            .sp-included-grid { grid-template-columns: repeat(2,1fr); }
            .sp-process-grid { grid-template-columns: repeat(2,1fr); }
            .sp-stats-inner { grid-template-columns: repeat(2,1fr); }
            .sp-stat:nth-child(2) { border-right: none; }
          }
          @media(max-width:600px){
            .sp-hero { padding: 70px 20px 60px; }
            .sp-included-grid, .sp-process-grid { grid-template-columns: 1fr; }
            .sp-stats-inner { grid-template-columns: repeat(2,1fr); }
          }
        `}</style>
      </Head>

      <div className="sp-page">

        {/* ── Hero ── */}
        <div className="sp-hero">
          <div className="sp-orb sp-orb-1" /><div className="sp-orb sp-orb-2" />
          <div className="sp-hero-inner">
            <div className="sp-eyebrow">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
              SEO Packages
            </div>
            <h1>Affordable SEO Packages That <span>Actually Rank</span></h1>
            <p className="sp-hero-sub">
              White-hat SEO delivered by a 15-year-old agency trusted by 500+ businesses across the US, Canada, and Australia. No contracts. No fluff. Measurable results every month.
            </p>
            <div className="sp-hero-chips">
              {['White-Hat Only', '15+ Years Experience', 'No Lock-In Contracts', 'Monthly Reports', 'Google-Certified Team'].map(c => (
                <span key={c} className="sp-chip"><span className="sp-chip-dot" />{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="sp-stats">
          <div className="sp-stats-inner">
            {[
              { v: '500+', l: 'SEO Projects' },
              { v: '15+', l: 'Years in SEO' },
              { v: '10,000+', l: 'Keywords Ranked' },
              { v: '97%', l: 'Client Retention' },
            ].map(s => (
              <div key={s.l} className="sp-stat">
                <div className="sp-stat-val">{s.v}</div>
                <div className="sp-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Billing toggle ── */}
        <div className="sp-billing">
          <div className="sp-billing-label">Choose billing cycle</div>
          <div className="sp-toggle" role="group" aria-label="Billing cycle">
            <button className={`sp-toggle-btn${billing === 'monthly' ? ' active' : ''}`} onClick={() => setBilling('monthly')}>Monthly</button>
            <button className={`sp-toggle-btn${billing === 'annual' ? ' active' : ''}`} onClick={() => setBilling('annual')}>Annual</button>
          </div>
          {billing === 'annual' && <span className="sp-save-pill">✓ Save 20% with annual billing</span>}
        </div>

        {/* ── Package cards ── */}
        <div className="sp-packages">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className={`sp-pkg${pkg.tag === 'Most Popular' ? ' popular' : ''}`}>
              <div className="sp-pkg-head">
                {pkg.tag && (
                  <div className="sp-pkg-tag" style={{ background: pkg.gradient }}>{pkg.tag}</div>
                )}
                <div className="sp-pkg-icon" style={{ background: `${pkg.color}18` }}>
                  {pkg.id === 'starter' ? '🚀' : pkg.id === 'professional' ? '📈' : '🏆'}
                </div>
                <div className="sp-pkg-name">{pkg.name}</div>
                <div className="sp-pkg-desc">{pkg.desc}</div>
                <div className="sp-pkg-price-row">
                  <div className="sp-pkg-price">${price(pkg.price)}</div>
                  <div className="sp-pkg-price-meta">/mo{billing === 'annual' ? ', billed annually' : ''}</div>
                </div>
                <div className="sp-pkg-annual-note">
                  {billing === 'annual' ? `Save $${saving(pkg.price)}/year` : ' '}
                </div>
                <Link href="/contact/" className="sp-pkg-cta sp-pkg-cta-solid" style={{ background: pkg.gradient }}>
                  Get Started
                </Link>
              </div>
              <div className="sp-pkg-divider" />
              <div className="sp-pkg-features">
                <div className="sp-pkg-features-title">What's included</div>
                {pkg.features.map((f) => {
                  const isTrue = f.value === true;
                  const isFalse = f.value === false;
                  return (
                    <div key={f.label} className="sp-feature">
                      <div className={`sp-feature-check ${isFalse ? 'sp-feature-check-no' : 'sp-feature-check-yes'}`}>
                        {isFalse
                          ? <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" width="11" height="11"><path d="M18 6L6 18M6 6l12 12"/></svg>
                          : <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="11" height="11"><path d="M5 13l4 4L19 7"/></svg>
                        }
                      </div>
                      <div className={`sp-feature-label${isFalse ? ' muted' : ''}`}>{f.label}</div>
                      {!isTrue && !isFalse && <div className={`sp-feature-val${isFalse ? ' muted' : ''}`}>{f.value}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── What's included ── */}
        <div className="sp-included">
          <div className="sp-included-inner">
            <div className="sp-section-eyebrow">Every Package Includes</div>
            <h2 className="sp-section-title">Full-Stack SEO — Nothing Left Out</h2>
            <p className="sp-section-sub">Every 1Solutions SEO engagement covers the full spectrum of modern SEO — technical, on-page, off-page, and content.</p>
            <div className="sp-included-grid">
              {[
                { icon: '🔧', title: 'Technical SEO', desc: 'Core Web Vitals, crawlability, site architecture, XML sitemaps, robots.txt, HTTPS, and structured data markup.' },
                { icon: '📄', title: 'On-Page SEO', desc: 'Title tags, meta descriptions, H1-H6 hierarchy, keyword placement, internal linking, and image optimisation.' },
                { icon: '🔗', title: 'Link Building', desc: 'Manual outreach for genuine editorial backlinks from authoritative, niche-relevant websites. No spam, no PBNs.' },
                { icon: '✍️', title: 'SEO Content', desc: 'In-house content writers create keyword-optimised blog posts, landing pages, and service pages that rank and convert.' },
                { icon: '📍', title: 'Local SEO', desc: 'Google Business Profile optimisation, local citations, NAP consistency, and review management for local visibility.' },
                { icon: '📊', title: 'Analytics & Reporting', desc: 'GA4 and Search Console setup, monthly keyword rank tracking, traffic analysis, and a clear performance report.' },
              ].map((item, i) => {
                const [ref, visible] = useReveal(i * 80);
                return (
                  <div key={item.title} ref={ref} className={`sp-included-card sp-in${visible ? ' visible' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                    <div className="sp-inc-icon">{item.icon}</div>
                    <div className="sp-inc-title">{item.title}</div>
                    <div className="sp-inc-desc">{item.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Process ── */}
        <div className="sp-process">
          <div className="sp-process-orb sp-process-orb-1" /><div className="sp-process-orb sp-process-orb-2" />
          <div className="sp-process-inner">
            <div className="sp-section-eyebrow">Our SEO Process</div>
            <h2 className="sp-section-title">How We Grow Your Rankings</h2>
            <p className="sp-section-sub">A structured, repeatable SEO process refined over 15 years and 500+ projects.</p>
            <div className="sp-process-grid">
              {PROCESS.map((step) => (
                <div key={step.step} className="sp-process-card">
                  <div className="sp-step-num">STEP {step.step}</div>
                  <div className="sp-process-icon">{step.icon}</div>
                  <div className="sp-process-title">{step.title}</div>
                  <div className="sp-process-desc">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="sp-faq">
          <div className="sp-faq-inner">
            <div className="sp-section-eyebrow" style={{ textAlign: 'center' }}>FAQ</div>
            <h2 className="sp-section-title" style={{ textAlign: 'center', maxWidth: '100%' }}>Common Questions</h2>
            <div className="sp-faq-list">
              {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} index={i} />)}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="sp-cta">
          <div className="sp-orb sp-orb-1" /><div className="sp-orb sp-orb-2" />
          <div className="sp-cta-inner">
            <h2>Ready to Start <span>Ranking?</span></h2>
            <p>Talk to our SEO team — no sales pitch, just an honest conversation about what will work for your business.</p>
            <div className="sp-cta-btns">
              <Link href="/contact/" className="sp-btn sp-btn-white">Get a Free SEO Audit</Link>
              <Link href="/portfolio/" className="sp-btn sp-btn-outline">See Our Work</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
