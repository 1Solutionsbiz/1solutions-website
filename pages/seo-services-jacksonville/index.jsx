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

const ACCENT = '#114171';
const SKILLS = [
  'Local SEO Jacksonville',
  'Google Business Profile Optimisation',
  'Jacksonville Keyword Research',
  'On-Page SEO Optimisation',
  'Technical SEO Audits',
  'Link Building & Digital PR',
  'Content Strategy & Creation',
  'Google Maps Ranking',
  'Citation Building & NAP Consistency',
  'Core Web Vitals Optimisation',
  'Schema Markup (LocalBusiness)',
  'Competitor Gap Analysis',
  'Monthly SEO Reporting',
  'E-Commerce SEO Jacksonville',
  'Multi-Location SEO',
];
const MODELS = [
  { title: 'Local SEO',    desc: 'Dominate Jacksonville local search results and Google Maps — ideal for service businesses, restaurants, retail, and professional services.', icon: '📍' },
  { title: 'National SEO', desc: 'Rank for competitive national keywords alongside your Jacksonville local presence — for e-commerce, SaaS, and multi-location businesses.', icon: '🌐' },
  { title: 'SEO Audit',    desc: 'A comprehensive technical and content audit of your Jacksonville business website — with a prioritised action plan and competitor gap analysis.', icon: '🔍' },
];
const WHY = [
  { h: 'Jacksonville Market Knowledge',   b: 'We understand the Jacksonville business landscape — from Riverside to Southside, from healthcare to construction to hospitality — and we tailor keyword strategy to your specific local market.' },
  { h: 'Google Maps Dominance',           b: 'For most Jacksonville service businesses, the Google Maps 3-pack drives more leads than organic results. We optimise your Google Business Profile, build citations, and generate reviews to put you in the top 3.' },
  { h: 'Transparent Monthly Reporting',   b: 'You receive a monthly report showing keyword rankings, organic traffic, Google Business Profile performance, and leads generated — tied directly to your business metrics, not vanity SEO stats.' },
  { h: 'No Long-Term Contracts',          b: 'We earn your business month by month. Our Jacksonville SEO clients stay because we deliver results — not because they are locked into a 12-month contract.' },
  { h: '15+ Years of Proven SEO',         b: 'Since 2008, we have ranked businesses in competitive markets across the US, Canada, and Australia. We know what works and what Google penalises.' },
  { h: 'White-Hat Only',                  b: "Every link we build, every piece of content we create, and every technical change we make follows Google's guidelines. No shortcuts that risk a penalty to your Jacksonville business." },
];
const PROCESS = [
  { n: '01', h: 'SEO Audit & Strategy',    b: 'We audit your website, research Jacksonville keywords, analyse your top 10 competitors, and deliver a detailed SEO strategy tailored to your market and goals.' },
  { n: '02', h: 'Technical Optimisation',  b: 'We fix technical issues — site speed, crawlability, Core Web Vitals, structured data, and mobile experience — that are holding your rankings back.' },
  { n: '03', h: 'Content & Links',         b: 'We create SEO-optimised content targeting Jacksonville search intent and build high-authority backlinks through digital PR and outreach.' },
  { n: '04', h: 'Track & Report',          b: 'Monthly ranking reports, traffic analysis, and strategy adjustments based on what Google responds to — with a direct line to your SEO manager.' },
];
const FAQS = [
  { q: 'How long does SEO take to work in Jacksonville?', a: 'Most Jacksonville businesses see measurable ranking improvements within 3–4 months. Competitive terms in dense markets (personal injury law, roofing, HVAC) can take 6–9 months to reach page one. Local SEO (Google Maps) typically shows results faster — 4–8 weeks — because the competition for the 3-pack is often less intense than organic rankings.' },
  { q: 'How much do Jacksonville SEO services cost?', a: 'Our Jacksonville SEO packages start from $499/month for local businesses targeting a specific service area. Competitive multi-location campaigns start from $999/month. We also offer a Free 45-Day SEO Trial so you can evaluate our work before committing to a monthly plan.' },
  { q: 'Do you work with Jacksonville businesses in all industries?', a: 'Yes. We have ranked Jacksonville businesses in healthcare, legal services, HVAC and home services, restaurants, retail, real estate, financial services, automotive, and e-commerce. We adapt our keyword and content strategy to your specific industry and competitive landscape.' },
  { q: 'What is included in your Jacksonville SEO service?', a: 'Keyword research specific to the Jacksonville market, on-page optimisation, technical SEO fixes, Google Business Profile management, local citation building, content creation, link building, and monthly performance reporting. We manage everything — you focus on your business.' },
  { q: 'Can you help us rank in specific Jacksonville neighbourhoods?', a: 'Yes. We create neighbourhood-specific landing pages and optimise for hyper-local search terms (e.g., "plumber Riverside Jacksonville" or "HVAC San Marco") — capturing customers searching within specific parts of Jacksonville.' },
  { q: 'Do you offer a free SEO audit for Jacksonville businesses?', a: 'Yes. We provide a free website SEO audit covering technical health, keyword gaps, competitor analysis, and Google Business Profile optimisation opportunities. Submit your details via our contact form and we will deliver the audit within 48 hours.' },
];

export default function SeoServicesJacksonville() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(300); const [c2, s2] = useCountUp(15);
  const [c3, s3] = useCountUp(49);  const [c4, s4] = useCountUp(45);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(300); s2(15); s3(49); s4(45); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Services Jacksonville', item: 'https://www.1solutions.biz/seo-services-jacksonville/' },
      ]},
      { '@type': 'Service', name: 'SEO Services Jacksonville', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Expert SEO services for Jacksonville FL businesses — local SEO, Google Maps optimisation, link building, and technical SEO from 1Solutions.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '112', bestRating: '5' },
        areaServed: { '@type': 'City', name: 'Jacksonville' },
      },
      { '@type': 'LocalBusiness', name: '1Solutions - Jacksonville SEO Services',
        url: 'https://www.1solutions.biz/seo-services-jacksonville/',
        address: { '@type': 'PostalAddress', addressLocality: 'Jacksonville', addressRegion: 'FL', addressCountry: 'US' },
        areaServed: { '@type': 'City', name: 'Jacksonville' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>SEO Services Jacksonville FL | Jacksonville SEO Company | 1Solutions</title>
        <meta name="description" content="Expert SEO services in Jacksonville, FL from 1Solutions. We help Jacksonville businesses rank higher on Google, drive local traffic, and grow revenue through proven search engine optimisation." />
        <link rel="canonical" href="https://www.1solutions.biz/seo-services-jacksonville/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .jax-hero{background:linear-gradient(135deg,${ACCENT} 0%,#0a2d4a 60%,#0d3c62 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .jax-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .jax-hero p{font-size:1.15rem;max-width:640px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .jax-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .jax-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .jax-btn-primary:hover{opacity:.88}
          .jax-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .jax-btn-outline:hover{border-color:#fff}
          .jax-sec{padding:70px 20px}.jax-sec-alt{background:#f0f7ff}
          .jax-wrap{max-width:1100px;margin:0 auto}
          .jax-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .jax-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .jax-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .jax-skill{background:#fff;border:1.5px solid #90c2e7;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .jax-skill.jax-in{opacity:1;transform:none}
          .jax-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .jax-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #90c2e7;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .jax-model.jax-in{opacity:1;transform:none}
          .jax-model-icon{font-size:2.2rem;margin-bottom:14px}
          .jax-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .jax-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .jax-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .jax-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .jax-why-item.jax-in{opacity:1;transform:none}
          .jax-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .jax-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .jax-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .jax-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #90c2e7;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .jax-step.jax-in{opacity:1;transform:none}
          .jax-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .jax-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .jax-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .jax-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .jax-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .jax-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .jax-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .jax-faq{max-width:760px;margin:0 auto}
          .jax-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .jax-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .jax-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .jax-faq-icon.jax-open{transform:rotate(45deg)}
          .jax-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .jax-cta{background:linear-gradient(135deg,${ACCENT},#0a2d4a);padding:80px 20px;text-align:center;color:#fff}
          .jax-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .jax-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.jax-hero{padding:80px 18px 60px}.jax-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="jax-hero">
        <h1>SEO Services Jacksonville, FL — Rank Higher &amp; Grow Your Jacksonville Business</h1>
        <p>We help Jacksonville businesses dominate Google search results — local SEO, technical optimisation, content strategy, and link building that drives real enquiries and sales. 15+ years of SEO expertise, 300+ businesses ranked.</p>
        <div className="jax-hero-btns">
          <Link href="/contact" className="jax-btn-primary">Get a Free Jacksonville SEO Audit →</Link>
          <Link href="/local-seo-packages" className="jax-btn-outline">View SEO Packages</Link>
        </div>
      </section>
      <section className="jax-sec" ref={skR}>
        <div className="jax-wrap">
          <h2 className="jax-sec-title">Jacksonville SEO Services We Provide</h2>
          <p className="jax-sec-sub">Every tactic we use is designed for the Jacksonville market — from hyperlocal keyword targeting to Google Maps dominance.</p>
          <div className="jax-skills">{SKILLS.map((s, i) => <span key={s} className={`jax-skill${skV ? ' jax-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="jax-sec jax-sec-alt" ref={enR}>
        <div className="jax-wrap">
          <h2 className="jax-sec-title">Jacksonville SEO Packages</h2>
          <p className="jax-sec-sub">Choose the package that matches your business goals and competitive landscape in Jacksonville.</p>
          <div className="jax-models">{MODELS.map((m, i) => <div key={m.title} className={`jax-model${enV ? ' jax-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="jax-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="jax-sec" ref={whR}>
        <div className="jax-wrap">
          <h2 className="jax-sec-title">Why Jacksonville Businesses Choose 1Solutions</h2>
          <p className="jax-sec-sub">We bring 15+ years of SEO experience to the Jacksonville market — results-driven, transparent, and contract-free.</p>
          <div className="jax-why-grid">{WHY.map((w, i) => <div key={w.h} className={`jax-why-item${whV ? ' jax-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="jax-stats" ref={stGr}>
        <div className="jax-stats-grid">
          <div><div className="jax-stat-val">{stV ? c1 : 0}+</div><div className="jax-stat-label">Businesses Ranked</div></div>
          <div><div className="jax-stat-val">{stV ? c2 : 0}+</div><div className="jax-stat-label">Years SEO Experience</div></div>
          <div><div className="jax-stat-val">4.{stV ? c3 : 0}/5</div><div className="jax-stat-label">Client Satisfaction</div></div>
          <div><div className="jax-stat-val">{stV ? c4 : 0}-Day</div><div className="jax-stat-label">Free Trial Available</div></div>
        </div>
      </section>
      <section className="jax-sec jax-sec-alt" ref={prR}>
        <div className="jax-wrap">
          <h2 className="jax-sec-title">How We Rank Your Jacksonville Business</h2>
          <p className="jax-sec-sub">A proven four-phase process — from audit to compounding organic growth.</p>
          <div className="jax-process">{PROCESS.map((p, i) => <div key={p.n} className={`jax-step${prV ? ' jax-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="jax-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="jax-sec">
        <div className="jax-wrap">
          <h2 className="jax-sec-title">Jacksonville SEO — Frequently Asked Questions</h2>
          <p className="jax-sec-sub">Everything you need to know before hiring a Jacksonville SEO company.</p>
          <div className="jax-faq">{FAQS.map((f, i) => <div key={i} className="jax-faq-item"><div className="jax-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`jax-faq-icon${openFaq === i ? ' jax-open' : ''}`}>+</span></div>{openFaq === i && <p className="jax-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="jax-cta">
        <div className="jax-wrap">
          <h2>Ready to Dominate Jacksonville Search Results?</h2>
          <p>Get a free Jacksonville SEO audit — we'll review your rankings, identify your biggest opportunities, and deliver an action plan within 48 hours.</p>
          <Link href="/contact" className="jax-btn-primary">Get Your Free Jacksonville SEO Audit →</Link>
        </div>
      </section>
    </>
  );
}
