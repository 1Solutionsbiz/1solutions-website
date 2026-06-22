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

const ACCENT = '#0f4c75';
const SKILLS = [
  'WordPress Website Design', 'Local SEO Optimisation', 'Click-to-Call Integration',
  'Online Booking Forms', 'Google Maps & GMB Integration', 'Service Area Pages',
  'Mobile-First Design', 'Review & Testimonial Sections', 'Before & After Gallery',
  'Emergency Service CTAs', 'Trust Badges & Licensing Display', 'Speed Optimisation (Core Web Vitals)',
  'Schema Markup (LocalBusiness)', 'Conversion Rate Optimisation', 'SSL & Security Setup',
];
const MODELS = [
  { title: 'Starter Website',   desc: 'A fast, professional 5–8 page WordPress website: home, services, about, service areas, and contact — with click-to-call and basic local SEO.', icon: '🏠' },
  { title: 'Full Website Build', desc: 'A complete website with individual service pages, service area landing pages, before/after gallery, online booking, and advanced local SEO.', icon: '🔨' },
  { title: 'Website Redesign',  desc: 'We redesign your existing home services website — improving speed, mobile experience, trust signals, and conversion rate — without changing your content strategy.', icon: '🔄' },
];
const WHY = [
  { h: 'Built for Lead Generation',        b: 'Every page is designed with one goal: generating calls and booking requests. We use proven CTA placement, trust signals, and urgency triggers specific to home service buyers.' },
  { h: 'Mobile-First Design',              b: '70%+ of home service searches happen on mobile. Our designs put your phone number front-and-center, load in under 2 seconds, and make booking frictionless on any device.' },
  { h: 'Local SEO Ready',                  b: 'We build LocalBusiness schema, individual service area pages, Google Maps integration, and GMB-optimised on-page content from day one.' },
  { h: 'Home Services Industry Experience', b: "We've built websites for HVAC companies, plumbers, landscapers, roofers, electricians, cleaning services, and pest control businesses — we understand your buyers." },
  { h: 'Fast Turnaround',                  b: 'Most home services websites go live in 3–5 weeks. We use a structured process with clear milestones so you\'re never waiting on us.' },
  { h: 'Ongoing Support Available',        b: 'Post-launch, we offer WordPress maintenance plans, local SEO retainers, and Google Ads management so your website keeps generating leads.' },
];
const PROCESS = [
  { n: '01', h: 'Discovery Call',    b: 'We learn about your services, service area, target customers, and current lead generation challenges — then scope the project and share a fixed-price proposal.' },
  { n: '02', h: 'Design',            b: 'We create wireframes and a full design mockup for your approval. You review, request changes, and sign off before development begins.' },
  { n: '03', h: 'Development',       b: 'We build your WordPress website with all pages, service area content, booking forms, click-to-call, local SEO setup, and speed optimisation.' },
  { n: '04', h: 'Launch & Handover', b: 'We test the site on all devices, launch it, submit to Google Search Console, and train you on how to update your own content.' },
];
const FAQS = [
  { q: 'What types of home service businesses do you work with?', a: "We've built websites for HVAC companies, plumbers, electricians, landscapers, lawn care businesses, roofers, cleaning services, pest control operators, garage door companies, and general contractors. If you work on homes, we can build your site." },
  { q: 'How much does a home services website cost?', a: 'A starter 5–8 page website starts from $1,500. A full website with service area pages, gallery, online booking, and advanced SEO starts from $3,000. We provide a fixed-price quote after a free discovery call — no hourly billing surprises.' },
  { q: 'Will my website rank on Google?', a: 'We build local SEO fundamentals into every website — LocalBusiness schema, correct heading structure, meta tags, service area content, and Google Maps integration. For ongoing ranking improvement, we offer monthly local SEO retainers.' },
  { q: 'Can customers book jobs online?', a: 'Yes. We integrate booking forms, quote request forms, or scheduling tools (such as Jobber, ServiceTitan, or a custom form) so customers can request service directly from your website.' },
  { q: 'How long does it take to build?', a: 'Typically 3–5 weeks from project kick-off to launch. Larger websites with many service area pages can take 6–8 weeks. We share a detailed timeline in the proposal.' },
  { q: 'Do you offer website maintenance after launch?', a: 'Yes. Our WordPress maintenance plans cover security updates, plugin updates, uptime monitoring, and a set number of content update hours per month — starting from $99/month.' },
];

export default function HomeServicesWebsiteDesign() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(200); const [c2, s2] = useCountUp(15);
  const [c3, s3] = useCountUp(49);  const [c4, s4] = useCountUp(3);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(200); s2(15); s3(49); s4(3); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Home Services Website Design', item: 'https://www.1solutions.biz/home-services-website-design/' },
      ]},
      { '@type': 'Service', name: 'Home Services Website Design', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Professional home services website design from 1Solutions — conversion-focused websites for HVAC, plumbing, landscaping, roofing, and contractor businesses.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '112', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Home Services Website Design | Websites for Contractors &amp; Local Businesses | 1Solutions</title>
        <meta name="description" content="Professional home services website design from 1Solutions. We design and build conversion-focused websites for HVAC, plumbing, landscaping, cleaning, roofing, and other home service businesses." />
        <link rel="canonical" href="https://www.1solutions.biz/home-services-website-design/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hsd-hero{background:linear-gradient(135deg,${ACCENT} 0%,#072a44 60%,#0d3d5e 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hsd-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hsd-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hsd-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hsd-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hsd-btn-primary:hover{opacity:.88}
          .hsd-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hsd-btn-outline:hover{border-color:#fff}
          .hsd-sec{padding:70px 20px}.hsd-sec-alt{background:#f0f7ff}
          .hsd-wrap{max-width:1100px;margin:0 auto}
          .hsd-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hsd-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hsd-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hsd-skill{background:#fff;border:1.5px solid #90c2e7;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hsd-skill.hsd-in{opacity:1;transform:none}
          .hsd-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hsd-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #90c2e7;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hsd-model.hsd-in{opacity:1;transform:none}
          .hsd-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hsd-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hsd-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hsd-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hsd-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hsd-why-item.hsd-in{opacity:1;transform:none}
          .hsd-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hsd-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hsd-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hsd-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #90c2e7;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hsd-step.hsd-in{opacity:1;transform:none}
          .hsd-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hsd-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hsd-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hsd-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hsd-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hsd-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hsd-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hsd-faq{max-width:760px;margin:0 auto}
          .hsd-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hsd-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hsd-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hsd-faq-icon.hsd-open{transform:rotate(45deg)}
          .hsd-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hsd-cta{background:linear-gradient(135deg,${ACCENT},#072a44);padding:80px 20px;text-align:center;color:#fff}
          .hsd-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hsd-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hsd-hero{padding:80px 18px 60px}.hsd-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="hsd-hero">
        <h1>Home Services Website Design<br/>Websites Built to Book Jobs and Generate Calls</h1>
        <p>We design and build professional websites for HVAC, plumbing, landscaping, roofing, cleaning, and other home service businesses — optimised for local SEO, click-to-call, and online booking to turn visitors into paying customers.</p>
        <div className="hsd-hero-btns">
          <Link href="/contact" className="hsd-btn-primary">Get a Free Website Quote →</Link>
          <Link href="/portfolio" className="hsd-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="hsd-sec" ref={skR}>
        <div className="hsd-wrap">
          <h2 className="hsd-sec-title">What We Build Into Every Home Services Website</h2>
          <p className="hsd-sec-sub">Every feature is chosen to generate more calls, booking requests, and local search traffic for your business.</p>
          <div className="hsd-skills">{SKILLS.map((s, i) => <span key={s} className={`hsd-skill${skV ? ' hsd-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hsd-sec hsd-sec-alt" ref={enR}>
        <div className="hsd-wrap">
          <h2 className="hsd-sec-title">Website Packages</h2>
          <p className="hsd-sec-sub">From a quick professional starter site to a full lead-generation machine — choose what fits your business right now.</p>
          <div className="hsd-models">{MODELS.map((m, i) => <div key={m.title} className={`hsd-model${enV ? ' hsd-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hsd-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hsd-sec" ref={whR}>
        <div className="hsd-wrap">
          <h2 className="hsd-sec-title">Why Home Service Businesses Choose 1Solutions</h2>
          <p className="hsd-sec-sub">We understand the home services market — your buyers, your competition, and what it takes to win local search.</p>
          <div className="hsd-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hsd-why-item${whV ? ' hsd-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hsd-stats" ref={stGr}>
        <div className="hsd-stats-grid">
          <div><div className="hsd-stat-val">{stV ? c1 : 0}+</div><div className="hsd-stat-label">Home Service Websites Built</div></div>
          <div><div className="hsd-stat-val">{stV ? c2 : 0}+</div><div className="hsd-stat-label">Years Experience</div></div>
          <div><div className="hsd-stat-val">4.{stV ? c3 : 0}/5</div><div className="hsd-stat-label">Client Satisfaction</div></div>
          <div><div className="hsd-stat-val">{stV ? c4 : 0} Weeks</div><div className="hsd-stat-label">Avg Time to Launch</div></div>
        </div>
      </section>
      <section className="hsd-sec hsd-sec-alt" ref={prR}>
        <div className="hsd-wrap">
          <h2 className="hsd-sec-title">How We Build Your Website</h2>
          <p className="hsd-sec-sub">A clear four-step process from discovery to launch — with no surprises on timeline or cost.</p>
          <div className="hsd-process">{PROCESS.map((p, i) => <div key={p.n} className={`hsd-step${prV ? ' hsd-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hsd-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hsd-sec">
        <div className="hsd-wrap">
          <h2 className="hsd-sec-title">Frequently Asked Questions</h2>
          <p className="hsd-sec-sub">Common questions about our home services website design services.</p>
          <div className="hsd-faq">{FAQS.map((f, i) => <div key={i} className="hsd-faq-item"><div className="hsd-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hsd-faq-icon${openFaq === i ? ' hsd-open' : ''}`}>+</span></div>{openFaq === i && <p className="hsd-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hsd-cta">
        <div className="hsd-wrap">
          <h2>Ready to Get a Website That Books More Jobs?</h2>
          <p>Tell us about your home service business and we&apos;ll deliver a fixed-price proposal within 24 hours — no contracts, no hourly billing.</p>
          <Link href="/contact" className="hsd-btn-primary">Get a Free Website Quote →</Link>
        </div>
      </section>
    </>
  );
}
