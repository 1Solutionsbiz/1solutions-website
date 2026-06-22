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

const ACCENT = '#111827';
const SKILLS = [
  'Next.js 14 App Router', 'React Server Components (RSC)', 'TypeScript', 'Streaming SSR & Suspense',
  'TanStack Query & SWR', 'Prisma & Drizzle ORM', 'Tailwind CSS & CSS Modules', 'NextAuth.js',
  'Vercel Deployment & Edge Functions', 'Playwright & Cypress E2E', 'Turborepo & Monorepos',
  'OpenAI & AI SDK Integration', 'Sanity & Contentful CMS', 'GraphQL & tRPC', 'Core Web Vitals Optimisation',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time Next.js developer committed to your product — 8 hrs/day, 5 days/week, fully embedded in your team.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for RSC migrations, App Router refactors, performance improvements, or feature delivery sprints.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for architectural reviews, Lighthouse audits, or short Next.js consulting engagements.', icon: '🕐' },
];
const WHY = [
  { h: 'App Router Specialists',      b: 'Our developers are fluent in Next.js 14 App Router — layouts, loading.tsx, error.tsx, parallel routes, intercepting routes, and the full RSC mental model. Not just pages router veterans forced to learn new APIs.' },
  { h: 'Full-Stack Capability',       b: 'Beyond the frontend: our Next.js developers build API routes, server actions, database integrations with Prisma or Drizzle, and full authentication flows with NextAuth.js.' },
  { h: 'Vercel & Edge Deployment',    b: 'We configure Vercel deployments, ISR, On-Demand Revalidation, Edge Middleware, and regional functions — so your app is fast globally, not just locally.' },
  { h: 'Performance-First Builds',    b: 'Sub-2s LCP, zero CLS, and optimised bundle size using code splitting, lazy loading, next/image, and next/font — green Core Web Vitals as standard.' },
  { h: 'Profiles in 48 Hours',        b: 'Submit your brief and receive 2-3 matched Next.js developer CVs within two business days — ready for your technical interview.' },
  { h: 'NDA & IP Security',           b: 'Full NDA and IP assignment signed before any access to your codebase, Vercel project, or design files.' },
];
const PROCESS = [
  { n: '01', h: 'Describe Your Stack',  b: 'Tell us the Next.js version, rendering strategy (SSR/SSG/ISR), database, CMS, and seniority level you need.' },
  { n: '02', h: 'Receive Profiles',     b: '2-3 matched Next.js developer CVs delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select',   b: 'Run your own technical round — App Router architecture discussion, RSC patterns, or live coding.' },
  { n: '04', h: 'Onboard & Build',      b: 'Developer joins your repo and Vercel project. First PR within 7 days.' },
];
const FAQS = [
  { q: 'Do your developers know Next.js App Router or just Pages Router?', a: 'Both. Our developers are fluent in the App Router (layouts, Server Components, Server Actions, parallel routes) and can also maintain or migrate Pages Router projects. We recommend App Router for new projects and can migrate your existing codebase incrementally.' },
  { q: 'Can they build full-stack Next.js applications?', a: 'Yes. Beyond the React layer, our Next.js developers build API routes, server actions, Prisma/Drizzle ORM integrations, NextAuth.js authentication, and Stripe payment flows — full-stack development within a single Next.js codebase.' },
  { q: 'Do they deploy on Vercel?', a: 'Yes. Our developers configure Vercel deployments, preview environments, ISR (Incremental Static Regeneration), On-Demand Revalidation, Edge Middleware, and Vercel Analytics. We also deploy to AWS (via Amplify or EC2), Cloudflare, and self-hosted Node.js servers.' },
  { q: 'Can they improve our Core Web Vitals?', a: 'Yes. We audit your current LCP, CLS, and INP scores, then implement fixes: next/image optimisation, font subsetting with next/font, route-level code splitting, partial prerendering, and server component conversion to reduce client-side JavaScript.' },
  { q: 'Do they work with headless CMS?', a: 'Yes. Our developers integrate with Sanity, Contentful, Strapi, WordPress (WPGraphQL), Prismic, and custom CMS backends using Next.js ISR or on-demand revalidation webhooks.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireNextJsDevelopers() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(60);  const [c2, s2] = useCountUp(250);
  const [c3, s3] = useCountUp(49);  const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(60); s2(250); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Next.js Developers', item: 'https://www.1solutions.biz/hire-nextjs-developers/' },
      ]},
      { '@type': 'Service', name: 'Hire Next.js Developers', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated Next.js developers from 1Solutions — App Router, Server Components, TypeScript, and Vercel deployment experts. Pre-vetted profiles in 48 hours.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '84', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire Next.js Developers | Next.js 14 App Router &amp; React Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated Next.js developers from 1Solutions. Next.js 14 App Router, Server Components, TypeScript, and Vercel deployment experts. Pre-vetted. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-nextjs-developers/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hnjs-hero{background:linear-gradient(135deg,${ACCENT} 0%,#030712 60%,#1f2937 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hnjs-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hnjs-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hnjs-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hnjs-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hnjs-btn-primary:hover{opacity:.88}
          .hnjs-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hnjs-btn-outline:hover{border-color:#fff}
          .hnjs-sec{padding:70px 20px}.hnjs-sec-alt{background:#f9fafb}
          .hnjs-wrap{max-width:1100px;margin:0 auto}
          .hnjs-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hnjs-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hnjs-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hnjs-skill{background:#fff;border:1.5px solid #d1d5db;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hnjs-skill.hnjs-in{opacity:1;transform:none}
          .hnjs-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hnjs-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #d1d5db;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hnjs-model.hnjs-in{opacity:1;transform:none}
          .hnjs-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hnjs-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hnjs-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hnjs-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hnjs-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hnjs-why-item.hnjs-in{opacity:1;transform:none}
          .hnjs-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hnjs-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hnjs-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hnjs-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #d1d5db;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hnjs-step.hnjs-in{opacity:1;transform:none}
          .hnjs-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hnjs-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hnjs-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hnjs-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hnjs-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hnjs-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hnjs-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hnjs-faq{max-width:760px;margin:0 auto}
          .hnjs-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hnjs-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hnjs-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hnjs-faq-icon.hnjs-open{transform:rotate(45deg)}
          .hnjs-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hnjs-cta{background:linear-gradient(135deg,${ACCENT},#030712);padding:80px 20px;text-align:center;color:#fff}
          .hnjs-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hnjs-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hnjs-hero{padding:80px 18px 60px}.hnjs-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="hnjs-hero">
        <h1>Hire Next.js Developers<br/>App Router, Server Components &amp; Vercel Experts</h1>
        <p>Pre-vetted Next.js engineers who build fast, scalable, and SEO-optimised full-stack applications — App Router, React Server Components, streaming SSR, and edge-deployed. Profiles in 48 hours.</p>
        <div className="hnjs-hero-btns">
          <Link href="/contact" className="hnjs-btn-primary">Hire a Next.js Developer →</Link>
          <Link href="/portfolio" className="hnjs-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="hnjs-sec" ref={skR}>
        <div className="hnjs-wrap">
          <h2 className="hnjs-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hnjs-sec-sub">Our Next.js developers cover the full modern stack — from App Router to edge deployment and AI integration.</p>
          <div className="hnjs-skills">{SKILLS.map((s, i) => <span key={s} className={`hnjs-skill${skV ? ' hnjs-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hnjs-sec hnjs-sec-alt" ref={enR}>
        <div className="hnjs-wrap">
          <h2 className="hnjs-sec-title">Flexible Engagement Models</h2>
          <p className="hnjs-sec-sub">Choose the model that fits your sprint cadence and budget.</p>
          <div className="hnjs-models">{MODELS.map((m, i) => <div key={m.title} className={`hnjs-model${enV ? ' hnjs-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hnjs-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hnjs-sec" ref={whR}>
        <div className="hnjs-wrap">
          <h2 className="hnjs-sec-title">Why Hire Next.js Developers from 1Solutions?</h2>
          <p className="hnjs-sec-sub">We place engineers who have shipped production Next.js apps with millions of users — not just course graduates.</p>
          <div className="hnjs-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hnjs-why-item${whV ? ' hnjs-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hnjs-stats" ref={stGr}>
        <div className="hnjs-stats-grid">
          <div><div className="hnjs-stat-val">{stV ? c1 : 0}+</div><div className="hnjs-stat-label">Next.js Developers</div></div>
          <div><div className="hnjs-stat-val">{stV ? c2 : 0}+</div><div className="hnjs-stat-label">Next.js Projects Delivered</div></div>
          <div><div className="hnjs-stat-val">4.{stV ? c3 : 0}/5</div><div className="hnjs-stat-label">Client Satisfaction</div></div>
          <div><div className="hnjs-stat-val">{stV ? c4 : 0} Days</div><div className="hnjs-stat-label">Days to First PR</div></div>
        </div>
      </section>
      <section className="hnjs-sec hnjs-sec-alt" ref={prR}>
        <div className="hnjs-wrap">
          <h2 className="hnjs-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hnjs-sec-sub">From tech brief to first merged PR — in under two weeks.</p>
          <div className="hnjs-process">{PROCESS.map((p, i) => <div key={p.n} className={`hnjs-step${prV ? ' hnjs-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hnjs-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hnjs-sec">
        <div className="hnjs-wrap">
          <h2 className="hnjs-sec-title">Frequently Asked Questions</h2>
          <p className="hnjs-sec-sub">Common questions before hiring a Next.js developer from 1Solutions.</p>
          <div className="hnjs-faq">{FAQS.map((f, i) => <div key={i} className="hnjs-faq-item"><div className="hnjs-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hnjs-faq-icon${openFaq === i ? ' hnjs-open' : ''}`}>+</span></div>{openFaq === i && <p className="hnjs-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hnjs-cta">
        <div className="hnjs-wrap">
          <h2>Ready to Hire Your Next.js Developer?</h2>
          <p>Share your App Router, data layer, and deployment requirements — receive matched Next.js specialist profiles within 48 hours.</p>
          <Link href="/contact" className="hnjs-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
