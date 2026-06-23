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

const ACCENT = '#e3342f';
const SKILLS = [
  'Laravel 11 & 10', 'PHP 8.2 & 8.3', 'RESTful API Development', 'GraphQL (Lighthouse)',
  'Eloquent ORM & Database Design', 'Laravel Sanctum & Passport (OAuth)',
  'Multi-Tenant Architecture (Tenancy for Laravel)', 'Laravel Queue & Jobs (Redis, SQS)',
  'Laravel Horizon & Telescope', 'Livewire & Inertia.js', 'Vue.js & React with Laravel',
  'PHPUnit & Pest Testing', 'Docker & Laravel Sail', 'AWS & Forge Deployment',
  'WooCommerce & Shopify API Integration',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time Laravel developer committed to your product — 8 hrs/day, 5 days/week, fully embedded in your team.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for API development, legacy refactoring, or ongoing feature delivery sprints.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for code reviews, architecture consultations, or short Laravel debugging engagements.', icon: '🕐' },
];
const WHY = [
  { h: 'Laravel 11 Specialists', b: 'Our developers are fluent in Laravel 11 — application service providers, the new minimal bootstrap structure, context features, and the full modern Laravel ecosystem including Pennant, Reverb, and Folio.' },
  { h: 'API-First Engineers', b: 'RESTful and GraphQL APIs designed with OpenAPI specs, versioning strategy, and rate limiting before a line of code is written — so your mobile and frontend teams are never blocked.' },
  { h: 'Multi-Tenant SaaS Expertise', b: "We've built multi-tenant Laravel SaaS platforms using single-database, multi-database, and hybrid tenancy strategies — including subscription billing with Laravel Cashier and Stripe." },
  { h: 'Test-Driven Development', b: 'PHPUnit and Pest test suites are shipped as part of every sprint — feature tests, unit tests, and integration tests — not as an afterthought before go-live.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your brief and receive 2-3 matched Laravel developer CVs within two business days, ready for your technical interview.' },
  { h: 'NDA & IP Security', b: 'Full NDA and IP assignment signed before any access to your codebase, database schema, or business logic.' },
];
const PROCESS = [
  { n: '01', h: 'Describe Your Project', b: 'Tell us the Laravel version, database, authentication approach, integrations, and seniority level you need.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 matched Laravel developer CVs delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Run your own technical round — Eloquent design, API architecture, or a short take-home task.' },
  { n: '04', h: 'Onboard & Build', b: 'Developer joins your repo and tools. First PR within 7 days of onboarding.' },
];
const FAQS = [
  { q: 'Which versions of Laravel do your developers work with?', a: 'Our developers are proficient across Laravel 10 and 11 (latest stable). They can also maintain Laravel 8 and 9 applications and plan incremental upgrades to the current version. We recommend upgrading to Laravel 11 for all new projects.' },
  { q: 'Can they build multi-tenant SaaS applications?', a: 'Yes. We have extensive experience building multi-tenant Laravel applications using the Tenancy for Laravel package (stancl/tenancy) — both single-database (tenant scoping via global scopes) and multi-database (separate database per tenant) architectures. We also implement subscription billing using Laravel Cashier with Stripe or Paddle.' },
  { q: 'Do they write tests?', a: 'Yes. Our Laravel developers write PHPUnit and Pest feature and unit tests as a standard part of development — not an afterthought. We aim for 80%+ coverage on business-critical code paths and include database transaction rollback in tests so the test suite runs fast.' },
  { q: 'Can they build REST and GraphQL APIs?', a: 'Yes. RESTful APIs following JSON:API or custom conventions, documented with OpenAPI (Swagger). GraphQL APIs using the Lighthouse package with schema-first design. We include Postman collections or Swagger UI as part of every API delivery.' },
  { q: 'Do they work with Livewire and Inertia.js?', a: 'Yes. Livewire for server-rendered reactive UIs within a Laravel monolith, and Inertia.js for full-stack Laravel + Vue.js or Laravel + React applications — giving you SPA-like UX without building a separate API.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireLaravelDeveloper() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(80); const [c2, s2] = useCountUp(350);
  const [c3, s3] = useCountUp(49); const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(80); s2(350); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Laravel Developer', item: 'https://www.1solutions.biz/hire-laravel-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire Laravel Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated Laravel developers from 1Solutions — Laravel 11, REST APIs, multi-tenant SaaS, and e-commerce backend experts. Pre-vetted profiles in 48 hours.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire Laravel Developer | Expert Laravel PHP Development | 1Solutions</title>
        <meta name="description" content="Hire dedicated Laravel developers from 1Solutions. Laravel 11, REST APIs, multi-tenant SaaS, and e-commerce experts. Pre-vetted. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-laravel-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hlv-hero{background:linear-gradient(135deg,#9b1b1b 0%,#6b0f0f 60%,#7e1212 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hlv-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hlv-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hlv-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hlv-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hlv-btn-primary:hover{opacity:.88}
          .hlv-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hlv-btn-outline:hover{border-color:#fff}
          .hlv-sec{padding:70px 20px}.hlv-sec-alt{background:#fff5f5}
          .hlv-wrap{max-width:1100px;margin:0 auto}
          .hlv-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hlv-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hlv-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hlv-skill{background:#fff;border:1.5px solid #fca5a5;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hlv-skill.hlv-in{opacity:1;transform:none}
          .hlv-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hlv-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #fca5a5;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hlv-model.hlv-in{opacity:1;transform:none}
          .hlv-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hlv-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hlv-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hlv-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hlv-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hlv-why-item.hlv-in{opacity:1;transform:none}
          .hlv-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hlv-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hlv-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hlv-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #fca5a5;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hlv-step.hlv-in{opacity:1;transform:none}
          .hlv-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hlv-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hlv-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hlv-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hlv-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hlv-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hlv-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hlv-faq{max-width:760px;margin:0 auto}
          .hlv-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hlv-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hlv-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hlv-faq-icon.hlv-open{transform:rotate(45deg)}
          .hlv-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hlv-cta{background:linear-gradient(135deg,#9b1b1b,#6b0f0f);padding:80px 20px;text-align:center;color:#fff}
          .hlv-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hlv-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hlv-hero{padding:80px 18px 60px}.hlv-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="hlv-hero">
        <h1>Hire Laravel Developers &mdash; Laravel 11, REST APIs &amp; SaaS Experts</h1>
        <p>Pre-vetted Laravel engineers who build robust PHP applications, REST and GraphQL APIs, multi-tenant SaaS platforms, and e-commerce backends &mdash; clean architecture, comprehensive test coverage, and production-ready code. Profiles in 48 hours.</p>
        <div className="hlv-hero-btns">
          <Link href="/contact-us" className="hlv-btn-primary">Hire a Laravel Developer &rarr;</Link>
          <Link href="/portfolio" className="hlv-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="hlv-sec" ref={skR}>
        <div className="hlv-wrap">
          <h2 className="hlv-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hlv-sec-sub">Our Laravel developers cover the full PHP ecosystem — from API architecture to multi-tenant SaaS to e-commerce integrations.</p>
          <div className="hlv-skills">{SKILLS.map((s, i) => <span key={s} className={`hlv-skill${skV ? ' hlv-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hlv-sec hlv-sec-alt" ref={enR}>
        <div className="hlv-wrap">
          <h2 className="hlv-sec-title">Flexible Engagement Models</h2>
          <p className="hlv-sec-sub">Choose the model that fits your release cadence and budget.</p>
          <div className="hlv-models">{MODELS.map((m, i) => <div key={m.title} className={`hlv-model${enV ? ' hlv-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hlv-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hlv-sec" ref={whR}>
        <div className="hlv-wrap">
          <h2 className="hlv-sec-title">Why Hire Laravel Developers from 1Solutions?</h2>
          <p className="hlv-sec-sub">We place engineers who have shipped production Laravel applications — APIs, SaaS platforms, and e-commerce backends at scale.</p>
          <div className="hlv-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hlv-why-item${whV ? ' hlv-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hlv-stats" ref={stGr}>
        <div className="hlv-stats-grid">
          <div><div className="hlv-stat-val">{stV ? c1 : 0}+</div><div className="hlv-stat-label">Laravel Developers</div></div>
          <div><div className="hlv-stat-val">{stV ? c2 : 0}+</div><div className="hlv-stat-label">Laravel Projects Delivered</div></div>
          <div><div className="hlv-stat-val">4.{stV ? c3 : 0}/5</div><div className="hlv-stat-label">Client Satisfaction</div></div>
          <div><div className="hlv-stat-val">{stV ? c4 : 0} Days</div><div className="hlv-stat-label">Days to First PR</div></div>
        </div>
      </section>
      <section className="hlv-sec hlv-sec-alt" ref={prR}>
        <div className="hlv-wrap">
          <h2 className="hlv-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hlv-sec-sub">From brief to first merged PR — in under two weeks.</p>
          <div className="hlv-process">{PROCESS.map((p, i) => <div key={p.n} className={`hlv-step${prV ? ' hlv-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hlv-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hlv-sec">
        <div className="hlv-wrap">
          <h2 className="hlv-sec-title">Frequently Asked Questions</h2>
          <p className="hlv-sec-sub">Common questions before hiring a Laravel developer from 1Solutions.</p>
          <div className="hlv-faq">{FAQS.map((f, i) => <div key={i} className="hlv-faq-item"><div className="hlv-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hlv-faq-icon${openFaq === i ? ' hlv-open' : ''}`}>+</span></div>{openFaq === i && <p className="hlv-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hlv-cta">
        <div className="hlv-wrap">
          <h2>Ready to Hire Your Laravel Developer?</h2>
          <p>Share your Laravel project requirements and receive matched developer profiles within 48 hours &mdash; no commitment required.</p>
          <Link href="/contact-us" className="hlv-btn-primary">Get Started Today &rarr;</Link>
        </div>
      </section>
    </>
  );
}
