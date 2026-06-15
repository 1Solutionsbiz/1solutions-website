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

const ACCENT = '#005038';
const SKILLS = [
  'React 18 & Hooks', 'Next.js (App Router)', 'TypeScript', 'Redux Toolkit & Zustand',
  'TanStack Query', 'Vite & Webpack', 'Tailwind CSS & CSS Modules', 'GraphQL & Apollo',
  'Jest & React Testing Library', 'Playwright & Cypress', 'Storybook', 'Framer Motion',
  'React Server Components', 'Accessibility (WCAG 2.1)', 'Core Web Vitals Optimisation',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time React developer committed to your product — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for component library work, performance improvements, or ongoing feature delivery.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for code reviews, Core Web Vitals audits, or React migration work.', icon: '🕐' },
];
const WHY = [
  { h: 'React 18 & Next.js Specialists', b: 'Our developers are fluent in React Server Components, streaming SSR, Suspense, and concurrent features — not just class component veterans.' },
  { h: 'Performance-First UI', b: 'We target sub-2s LCP, zero CLS, and optimised TTI using lazy loading, code splitting, image optimisation, and selective hydration.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your brief and receive 2-3 matched React developer CVs within two business days.' },
  { h: 'Component Library Culture', b: 'Our developers document components in Storybook, enforce design tokens, and maintain strict prop-type or TypeScript contracts for reusable UI.' },
  { h: 'Testing-Driven Development', b: 'Unit tests with Jest, integration tests with React Testing Library, and E2E coverage with Playwright or Cypress — all shipped as part of the sprint.' },
  { h: 'NDA & IP Security', b: 'Full NDA and IP assignment signed before any access to your codebase or Figma designs.' },
];
const PROCESS = [
  { n: '01', h: 'Describe Your Frontend', b: 'Tell us the React version, state management approach, styling system, and seniority needed.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 matched React developer CVs delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Run your own technical round — live coding, component design, or system discussion.' },
  { n: '04', h: 'Onboard & Build', b: 'Developer joins your repo and tools. First sprint starts within 7 days.' },
];
const FAQS = [
  { q: 'Do your React developers work with Next.js?', a: 'Yes. Most of our React developers are proficient in Next.js, including the App Router, Server Components, streaming, and deployment on Vercel or self-hosted Node.js servers.' },
  { q: 'Which state management libraries do they prefer?', a: 'Redux Toolkit for large enterprise apps, Zustand for lightweight client state, and TanStack Query for server state. The choice depends on your app complexity and team conventions.' },
  { q: 'Can they improve our Lighthouse / Core Web Vitals scores?', a: 'Yes. We regularly run performance audits, implement lazy loading, reduce bundle size with code splitting, optimise images, and fix layout shift issues to achieve green Lighthouse scores.' },
  { q: 'Do they write tests?', a: 'Yes. Our developers write unit and integration tests using Jest and React Testing Library as standard. E2E tests with Playwright or Cypress are available for critical user flows.' },
  { q: 'Can they work with our existing design system?', a: 'Absolutely. Our developers integrate with existing design systems (MUI, Chakra, Ant Design, or custom) and can also build new component libraries documented in Storybook.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireReactJSDeveloper() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(70); const [c2, s2] = useCountUp(310);
  const [c3, s3] = useCountUp(49); const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(70); s2(310); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire React.js Developer', item: 'https://www.1solutions.biz/hire-reactjs-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire React.js Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated React.js developers from 1Solutions — React 18, Next.js, and TypeScript frontend experts.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire React.js Developer | React 18 & Next.js Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated React.js developers from 1Solutions. React 18, Next.js App Router, TypeScript, and Core Web Vitals experts. Pre-vetted. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-reactjs-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hrjs-hero{background:linear-gradient(135deg,${ACCENT} 0%,#002a1e 60%,#003d2c 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hrjs-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hrjs-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hrjs-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hrjs-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hrjs-btn-primary:hover{opacity:.88}
          .hrjs-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hrjs-btn-outline:hover{border-color:#fff}
          .hrjs-sec{padding:70px 20px}.hrjs-sec-alt{background:#f2faf7}
          .hrjs-wrap{max-width:1100px;margin:0 auto}
          .hrjs-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hrjs-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hrjs-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hrjs-skill{background:#fff;border:1.5px solid #a0ccbc;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hrjs-skill.hrjs-in{opacity:1;transform:none}
          .hrjs-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hrjs-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #b4d8c8;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hrjs-model.hrjs-in{opacity:1;transform:none}
          .hrjs-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hrjs-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hrjs-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hrjs-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hrjs-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hrjs-why-item.hrjs-in{opacity:1;transform:none}
          .hrjs-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hrjs-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hrjs-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hrjs-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #b4d8c8;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hrjs-step.hrjs-in{opacity:1;transform:none}
          .hrjs-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hrjs-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hrjs-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hrjs-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hrjs-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hrjs-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hrjs-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hrjs-faq{max-width:760px;margin:0 auto}
          .hrjs-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hrjs-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hrjs-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hrjs-faq-icon.hrjs-open{transform:rotate(45deg)}
          .hrjs-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hrjs-cta{background:linear-gradient(135deg,${ACCENT},#002a1e);padding:80px 20px;text-align:center;color:#fff}
          .hrjs-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hrjs-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hrjs-hero{padding:80px 18px 60px}.hrjs-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="hrjs-hero">
        <h1>Hire React.js Developers<br/>React 18, Next.js &amp; TypeScript Experts</h1>
        <p>Pre-vetted React engineers who build fast, accessible, and maintainable frontends — Server Components, streaming SSR, and green Core Web Vitals as standard. Profiles in 48 hours.</p>
        <div className="hrjs-hero-btns">
          <Link href="/contact" className="hrjs-btn-primary">Hire a React.js Developer →</Link>
          <Link href="/portfolio" className="hrjs-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="hrjs-sec" ref={skR}>
        <div className="hrjs-wrap">
          <h2 className="hrjs-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hrjs-sec-sub">Our React developers cover the modern frontend ecosystem — from RSC to testing to performance tuning.</p>
          <div className="hrjs-skills">{SKILLS.map((s, i) => <span key={s} className={`hrjs-skill${skV ? ' hrjs-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hrjs-sec hrjs-sec-alt" ref={enR}>
        <div className="hrjs-wrap">
          <h2 className="hrjs-sec-title">Flexible Engagement Models</h2>
          <p className="hrjs-sec-sub">Choose the model that fits your release cadence and budget.</p>
          <div className="hrjs-models">{MODELS.map((m, i) => <div key={m.title} className={`hrjs-model${enV ? ' hrjs-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hrjs-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hrjs-sec" ref={whR}>
        <div className="hrjs-wrap">
          <h2 className="hrjs-sec-title">Why Hire React.js Developers from 1Solutions?</h2>
          <p className="hrjs-sec-sub">We place engineers who have shipped production React apps with millions of users — not just side projects.</p>
          <div className="hrjs-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hrjs-why-item${whV ? ' hrjs-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hrjs-stats" ref={stGr}>
        <div className="hrjs-stats-grid">
          <div><div className="hrjs-stat-val">{stV ? c1 : 0}+</div><div className="hrjs-stat-label">React Developers</div></div>
          <div><div className="hrjs-stat-val">{stV ? c2 : 0}+</div><div className="hrjs-stat-label">React Projects Delivered</div></div>
          <div><div className="hrjs-stat-val">4.{stV ? c3 : 0}/5</div><div className="hrjs-stat-label">Client Satisfaction</div></div>
          <div><div className="hrjs-stat-val">{stV ? c4 : 0} Days</div><div className="hrjs-stat-label">Avg Onboarding</div></div>
        </div>
      </section>
      <section className="hrjs-sec hrjs-sec-alt" ref={prR}>
        <div className="hrjs-wrap">
          <h2 className="hrjs-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hrjs-sec-sub">From brief to first merged component — in under two weeks.</p>
          <div className="hrjs-process">{PROCESS.map((p, i) => <div key={p.n} className={`hrjs-step${prV ? ' hrjs-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hrjs-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hrjs-sec">
        <div className="hrjs-wrap">
          <h2 className="hrjs-sec-title">Frequently Asked Questions</h2>
          <p className="hrjs-sec-sub">Common questions before hiring a React.js developer from 1Solutions.</p>
          <div className="hrjs-faq">{FAQS.map((f, i) => <div key={i} className="hrjs-faq-item"><div className="hrjs-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hrjs-faq-icon${openFaq === i ? ' hrjs-open' : ''}`}>+</span></div>{openFaq === i && <p className="hrjs-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hrjs-cta">
        <div className="hrjs-wrap">
          <h2>Ready to Hire Your React.js Developer?</h2>
          <p>Share your requirements and receive matched React specialist profiles within 48 hours — no commitment required.</p>
          <Link href="/contact" className="hrjs-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
