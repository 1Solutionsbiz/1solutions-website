'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  const start = (t) => {
    const s = performance.now();
    const step = (now) => {
      const p = Math.min((now - s) / duration, 1);
      setCount(Math.floor(p * t));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return [count, start];
}

const ACCENT = '#0891b2';
const SKILLS = [
  'Affiliate Program Setup (ShareASale, CJ, Impact, Partnerstack)',
  'Affiliate Recruitment & Outreach',
  'Commission Structure Design',
  'Coupon & Promo Code Management',
  'Affiliate Creative Assets',
  'Performance Reporting & Attribution',
  'Fraud Detection & Compliance',
  'Content Creator & Influencer Partnerships',
  'Brand Ambassador Programs',
  'Sub-Affiliate Network Management',
  'WooCommerce & Shopify Affiliate Integration',
  'SaaS Referral Program Setup',
  'Affiliate Email Campaigns',
  'Top Affiliate Identification',
  'Program Audit & Optimisation',
];
const MODELS = [
  { title: 'Program Setup',      desc: 'Full affiliate program launch: platform selection, commission structure, tracking setup, creatives, terms, and initial affiliate recruitment.', icon: '⚙️' },
  { title: 'Monthly Management', desc: 'Ongoing affiliate program management: recruitment, communications, commission reviews, fraud monitoring, and monthly performance reporting.', icon: '📅' },
  { title: 'Program Audit',      desc: 'A detailed audit of your existing affiliate program — identifying inactive affiliates, commission cannibalisation, fraud risks, and growth opportunities.', icon: '🔍' },
];
const WHY = [
  { h: 'Performance-Only Channel',         b: 'Affiliate marketing is the only paid channel where you pay purely for results — no wasted budget on impressions or clicks that don\'t convert.' },
  { h: 'Quality Affiliate Recruitment',    b: 'We recruit topical content affiliates, review sites, comparison platforms, and deal communities — not coupon parasites that cannibalise your organic traffic.' },
  { h: 'Platform-Agnostic Expertise',      b: 'We work across ShareASale, Commission Junction (CJ), Impact Radius, PartnerStack, Refersion, and direct affiliate tracking — recommending the right platform for your margins and product type.' },
  { h: 'Commission Structure Optimisation', b: 'The wrong commission structure either kills affiliate motivation or destroys your margins. We model commission rates against your AOV, CLV, and blended CAC to find the sweet spot.' },
  { h: 'Fraud Prevention',                 b: 'Coupon stacking, cookie stuffing, and brand bidding by affiliates can silently erode your profitability. We monitor for policy violations and remove bad actors before they cost you.' },
  { h: 'Transparent Reporting',            b: 'Monthly reports showing programme revenue, affiliate count, top performers, average order value, and incremental revenue — not just click and impression numbers.' },
];
const PROCESS = [
  { n: '01', h: 'Program Audit / Strategy', b: 'We audit your current setup (or design from scratch) — commission model, platform choice, affiliate mix, and competitive benchmarking.' },
  { n: '02', h: 'Setup & Launch',           b: 'Platform configuration, tracking implementation, creative assets, affiliate terms, and recruitment outreach to 50+ targeted affiliates.' },
  { n: '03', h: 'Recruit & Activate',       b: 'Ongoing recruitment targeting high-quality content and review affiliates. Activation campaigns for approved but inactive affiliates.' },
  { n: '04', h: 'Optimise & Report',        b: 'Monthly performance reviews, commission adjustments, fraud sweeps, and co-marketing with top affiliates to grow programme revenue.' },
];
const FAQS = [
  { q: 'What affiliate platforms do you manage programs on?', a: 'We work across all major affiliate networks and SaaS platforms: ShareASale, Commission Junction (CJ Affiliate), Impact Radius, PartnerStack, Refersion, Tapfiliate, Awin, and Rakuten Advertising. For SaaS companies, we also set up direct referral programs using custom tracking. We recommend the right platform based on your product type, margins, and target affiliate mix.' },
  { q: 'How long does it take to launch an affiliate program?', a: 'A new affiliate program takes 3–4 weeks to set up: 1 week for platform configuration and creative assets, 1–2 weeks for initial affiliate recruitment, and an ongoing ramp-up period of 60–90 days before meaningful revenue builds. Affiliate programs are a long-term channel — they compound over time, not overnight.' },
  { q: 'How do you recruit affiliates?', a: 'We use a combination of outreach to existing content creators in your niche, placement on affiliate directories, recruitment through the affiliate network marketplace, and direct outreach to review sites, comparison platforms, and deal communities. We target quality over quantity — 20 active affiliates outperform 200 dormant ones.' },
  { q: 'How do you prevent affiliate fraud?', a: 'We monitor for common fraud patterns: coupon stacking (affiliates claiming commissions for customers who never used their link), cookie stuffing, brand keyword bidding (affiliates bidding on your brand name in paid search), and self-referrals. We enforce strict affiliate terms, audit suspicious conversion patterns, and remove bad actors immediately.' },
  { q: 'What commission rates should we offer?', a: 'Typical commission rates range from 5–20% for physical products and 15–40% for digital products and SaaS. The right rate depends on your average order value, customer lifetime value, gross margin, and competitive affiliate landscape. We model the optimal rate during program setup.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and confidentiality agreements signed before any access to your revenue data, affiliate platform, or commission structure.' },
];

export default function AffiliateMarketingServices() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(50);  const [c2, s2] = useCountUp(15);
  const [c3, s3] = useCountUp(49);  const [c4, s4] = useCountUp(30);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(50); s2(15); s3(49); s4(30); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Affiliate Marketing Services', item: 'https://www.1solutions.biz/affiliate-marketing-services/' },
      ]},
      { '@type': 'Service', name: 'Affiliate Marketing Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Affiliate marketing services from 1Solutions — affiliate program setup, recruitment, fraud management, and ongoing affiliate channel management.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '84', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Affiliate Marketing Services | Affiliate Program Setup &amp; Management | 1Solutions</title>
        <meta name="description" content="Expert affiliate marketing services from 1Solutions. We set up, recruit, and manage affiliate programs for e-commerce and SaaS brands — driving performance-based revenue with zero wasted ad spend." />
        <link rel="canonical" href="https://www.1solutions.biz/affiliate-marketing-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .aff-hero{background:linear-gradient(135deg,${ACCENT} 0%,#065e7a 60%,#0e7490 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .aff-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .aff-hero p{font-size:1.15rem;max-width:640px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .aff-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .aff-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .aff-btn-primary:hover{opacity:.88}
          .aff-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .aff-btn-outline:hover{border-color:#fff}
          .aff-sec{padding:70px 20px}.aff-sec-alt{background:#f0fdff}
          .aff-wrap{max-width:1100px;margin:0 auto}
          .aff-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .aff-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .aff-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .aff-skill{background:#fff;border:1.5px solid #67e8f9;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .aff-skill.aff-in{opacity:1;transform:none}
          .aff-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .aff-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #67e8f9;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .aff-model.aff-in{opacity:1;transform:none}
          .aff-model-icon{font-size:2.2rem;margin-bottom:14px}
          .aff-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .aff-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .aff-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .aff-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .aff-why-item.aff-in{opacity:1;transform:none}
          .aff-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .aff-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .aff-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .aff-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #67e8f9;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .aff-step.aff-in{opacity:1;transform:none}
          .aff-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .aff-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .aff-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .aff-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .aff-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .aff-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .aff-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .aff-faq{max-width:760px;margin:0 auto}
          .aff-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .aff-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .aff-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .aff-faq-icon.aff-open{transform:rotate(45deg)}
          .aff-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .aff-cta{background:linear-gradient(135deg,${ACCENT},#065e7a);padding:80px 20px;text-align:center;color:#fff}
          .aff-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .aff-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.aff-hero{padding:80px 18px 60px}.aff-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="aff-hero">
        <h1>Affiliate Marketing Services — Build a Performance-Based Revenue Channel</h1>
        <p>We set up and manage affiliate programs that drive sales on pure performance — you only pay for results. From programme architecture and affiliate recruitment to compliance and payout management, we run every part of your affiliate channel.</p>
        <div className="aff-hero-btns">
          <Link href="/contact" className="aff-btn-primary">Get a Free Affiliate Audit →</Link>
          <Link href="/contact" className="aff-btn-outline">Learn More</Link>
        </div>
      </section>
      <section className="aff-sec" ref={skR}>
        <div className="aff-wrap">
          <h2 className="aff-sec-title">Affiliate Marketing Capabilities</h2>
          <p className="aff-sec-sub">From programme architecture to fraud prevention — we cover every aspect of affiliate channel management.</p>
          <div className="aff-skills">{SKILLS.map((s, i) => <span key={s} className={`aff-skill${skV ? ' aff-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="aff-sec aff-sec-alt" ref={enR}>
        <div className="aff-wrap">
          <h2 className="aff-sec-title">Flexible Engagement Models</h2>
          <p className="aff-sec-sub">Whether you need a full programme launch or an audit of an underperforming channel, we have a model that fits.</p>
          <div className="aff-models">{MODELS.map((m, i) => <div key={m.title} className={`aff-model${enV ? ' aff-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="aff-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="aff-sec" ref={whR}>
        <div className="aff-wrap">
          <h2 className="aff-sec-title">Why Choose 1Solutions for Affiliate Marketing?</h2>
          <p className="aff-sec-sub">We build affiliate programmes that compound over time — not quick-win coupon farms that erode your margins.</p>
          <div className="aff-why-grid">{WHY.map((w, i) => <div key={w.h} className={`aff-why-item${whV ? ' aff-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="aff-stats" ref={stGr}>
        <div className="aff-stats-grid">
          <div><div className="aff-stat-val">{stV ? c1 : 0}+</div><div className="aff-stat-label">Affiliate Programs Managed</div></div>
          <div><div className="aff-stat-val">{stV ? c2 : 0}+</div><div className="aff-stat-label">Years Experience</div></div>
          <div><div className="aff-stat-val">4.{stV ? c3 : 0}/5</div><div className="aff-stat-label">Client Satisfaction</div></div>
          <div><div className="aff-stat-val">{stV ? c4 : 0}%</div><div className="aff-stat-label">Avg Revenue Lift</div></div>
        </div>
      </section>
      <section className="aff-sec aff-sec-alt" ref={prR}>
        <div className="aff-wrap">
          <h2 className="aff-sec-title">How We Build Your Affiliate Programme</h2>
          <p className="aff-sec-sub">From strategy to compounding revenue — in four structured phases.</p>
          <div className="aff-process">{PROCESS.map((p, i) => <div key={p.n} className={`aff-step${prV ? ' aff-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="aff-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="aff-sec">
        <div className="aff-wrap">
          <h2 className="aff-sec-title">Frequently Asked Questions</h2>
          <p className="aff-sec-sub">Common questions about our affiliate marketing services.</p>
          <div className="aff-faq">{FAQS.map((f, i) => <div key={i} className="aff-faq-item"><div className="aff-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`aff-faq-icon${openFaq === i ? ' aff-open' : ''}`}>+</span></div>{openFaq === i && <p className="aff-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="aff-cta">
        <div className="aff-wrap">
          <h2>Ready to Build Your Affiliate Channel?</h2>
          <p>Get a free affiliate program audit — we'll review your current setup (or design one from scratch) and deliver a launch plan within 48 hours.</p>
          <Link href="/contact" className="aff-btn-primary">Get a Free Affiliate Audit →</Link>
        </div>
      </section>
    </>
  );
}
