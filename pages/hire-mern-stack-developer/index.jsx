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

const ACCENT = '#1a3d6e';
const SKILLS = [
  'MongoDB & Mongoose', 'Express.js', 'React.js 18+', 'Node.js',
  'Next.js (SSR/SSG)', 'TypeScript', 'Redux Toolkit & Zustand', 'REST APIs & GraphQL',
  'JWT & OAuth 2.0', 'Docker & AWS', 'Jest & React Testing Library', 'Tailwind CSS & MUI',
  'Socket.io (Real-Time)', 'CI/CD Pipelines', 'Microservices & Serverless',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time MERN stack developer committed to your product — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for iterative feature delivery or React/Node.js maintenance.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for code audits, performance tuning, or one-off sprint deliverables.', icon: '🕐' },
];
const WHY = [
  { h: 'End-to-End JS Stack', b: 'One developer, one language — MongoDB to React. Our MERN engineers eliminate the backend-frontend handoff that slows teams down.' },
  { h: 'React & Next.js Depth', b: 'We build performant React apps with server components, streaming SSR, and optimised Core Web Vitals — not just SPAs.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your brief and receive 2-3 matched MERN stack developer CVs within two business days.' },
  { h: 'Agile & Transparent', b: 'Daily standups, bi-weekly demos, shared Jira boards, and weekly delivery reports keep you in full control.' },
  { h: 'IP & NDA Protection', b: 'Full NDA and IP assignment signed before any access to your repository or infrastructure.' },
  { h: 'Scale as You Grow', b: 'Add React specialists, DevOps engineers, or QA alongside your MERN developer as the team needs evolve.' },
];
const PROCESS = [
  { n: '01', h: 'Brief Your Stack', b: 'Tell us your React version, Node.js architecture, DB structure, and seniority level needed.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 pre-screened MERN stack CVs delivered within 48 hours.' },
  { n: '03', h: 'Interview & Choose', b: 'Run your own technical round and pick the developer who fits your team.' },
  { n: '04', h: 'Onboard & Deliver', b: 'Developer joins your codebase. First sprint launches within 7 business days.' },
];
const FAQS = [
  { q: 'Can your MERN developers build with Next.js?', a: 'Yes. Most of our MERN developers are proficient in Next.js, including the App Router, React Server Components, streaming SSR, and edge deployments on Vercel or AWS.' },
  { q: 'What state management libraries do they use?', a: 'Our developers use Redux Toolkit for large apps, Zustand or Jotai for lighter setups, and React Query / TanStack Query for server state. The choice depends on your project complexity.' },
  { q: 'Can they handle real-time features like chat or live dashboards?', a: 'Yes. Our MERN developers build real-time features using Socket.io, Server-Sent Events, or WebSockets on the Node.js side with corresponding React hooks on the frontend.' },
  { q: 'Do they write tests?', a: 'Yes. Our developers write unit tests with Jest, component tests with React Testing Library, and API integration tests. E2E testing with Playwright or Cypress is also available.' },
  { q: 'What is the minimum engagement period?', a: 'Our standard minimum is 4 weeks, giving enough time for onboarding, architecture alignment, and real feature delivery.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireMERNStackDeveloper() {
  const skR  = useRef(null); const [skV,  setSkV]  = useState(false);
  const enR  = useRef(null); const [enV,  setEnV]  = useState(false);
  const whR  = useRef(null); const [whV,  setWhV]  = useState(false);
  const prR  = useRef(null); const [prV,  setPrV]  = useState(false);
  const stGr = useRef(null); const [stV,  setStV]  = useState(false);

  const [c1, s1] = useCountUp(55);
  const [c2, s2] = useCountUp(220);
  const [c3, s3] = useCountUp(49);
  const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR,  setSkV);  if (skR.current)  o1.observe(skR.current);
    const o2 = obs(enR,  setEnV);  if (enR.current)  o2.observe(enR.current);
    const o3 = obs(whR,  setWhV);  if (whR.current)  o3.observe(whR.current);
    const o4 = obs(prR,  setPrV);  if (prR.current)  o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(55); s2(220); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire MERN Stack Developer', item: 'https://www.1solutions.biz/hire-mern-stack-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire MERN Stack Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated MERN stack developers from 1Solutions — MongoDB, Express, React, and Node.js experts.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '103', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire MERN Stack Developer | MongoDB, Express, React, Node.js | 1Solutions</title>
        <meta name="description" content="Hire dedicated MERN stack developers from 1Solutions. MongoDB, Express, React 18 & Node.js experts with Next.js experience. Pre-vetted. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-mern-stack-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hmern-hero{background:linear-gradient(135deg,${ACCENT} 0%,#0d2344 60%,#162f57 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hmern-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hmern-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hmern-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hmern-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hmern-btn-primary:hover{opacity:.88}
          .hmern-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hmern-btn-outline:hover{border-color:#fff}
          .hmern-sec{padding:70px 20px}
          .hmern-sec-alt{background:#f4f7fc}
          .hmern-wrap{max-width:1100px;margin:0 auto}
          .hmern-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hmern-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hmern-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hmern-skill{background:#fff;border:1.5px solid #bccde4;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hmern-skill.hmern-in{opacity:1;transform:none}
          .hmern-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hmern-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #cad8ec;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hmern-model.hmern-in{opacity:1;transform:none}
          .hmern-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hmern-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hmern-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hmern-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hmern-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hmern-why-item.hmern-in{opacity:1;transform:none}
          .hmern-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hmern-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hmern-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hmern-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #cad8ec;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hmern-step.hmern-in{opacity:1;transform:none}
          .hmern-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hmern-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hmern-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hmern-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hmern-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hmern-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hmern-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hmern-faq{max-width:760px;margin:0 auto}
          .hmern-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hmern-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hmern-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hmern-faq-icon.hmern-open{transform:rotate(45deg)}
          .hmern-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hmern-cta{background:linear-gradient(135deg,${ACCENT},#0d2344);padding:80px 20px;text-align:center;color:#fff}
          .hmern-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hmern-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hmern-hero{padding:80px 18px 60px}.hmern-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>

      <section className="hmern-hero">
        <h1>Hire MERN Stack Developers<br/>MongoDB · Express · React · Node.js</h1>
        <p>Pre-vetted engineers who build full-stack JavaScript products from database to React UI — with Next.js, TypeScript, and real-time capabilities. Profiles in 48 hours.</p>
        <div className="hmern-hero-btns">
          <Link href="/contact-us" className="hmern-btn-primary">Hire a MERN Stack Developer →</Link>
          <Link href="/portfolio" className="hmern-btn-outline">View Portfolio</Link>
        </div>
      </section>

      <section className="hmern-sec" ref={skR}>
        <div className="hmern-wrap">
          <h2 className="hmern-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hmern-sec-sub">Our MERN developers cover the complete JavaScript ecosystem — from Mongoose schemas to React Server Components and beyond.</p>
          <div className="hmern-skills">
            {SKILLS.map((s, i) => <span key={s} className={`hmern-skill${skV ? ' hmern-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}
          </div>
        </div>
      </section>

      <section className="hmern-sec hmern-sec-alt" ref={enR}>
        <div className="hmern-wrap">
          <h2 className="hmern-sec-title">Flexible Engagement Models</h2>
          <p className="hmern-sec-sub">Choose the model that fits your product stage and budget — adjust anytime.</p>
          <div className="hmern-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hmern-model${enV ? ' hmern-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hmern-model-icon">{m.icon}</div>
                <h3>{m.title}</h3><p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmern-sec" ref={whR}>
        <div className="hmern-wrap">
          <h2 className="hmern-sec-title">Why Hire MERN Stack Developers from 1Solutions?</h2>
          <p className="hmern-sec-sub">We place engineers who have shipped MERN products at scale — SaaS platforms, marketplaces, and real-time applications.</p>
          <div className="hmern-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hmern-why-item${whV ? ' hmern-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3><p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmern-stats" ref={stGr}>
        <div className="hmern-stats-grid">
          <div><div className="hmern-stat-val">{stV ? c1 : 0}+</div><div className="hmern-stat-label">MERN Developers</div></div>
          <div><div className="hmern-stat-val">{stV ? c2 : 0}+</div><div className="hmern-stat-label">Projects Delivered</div></div>
          <div><div className="hmern-stat-val">4.{stV ? c3 : 0}/5</div><div className="hmern-stat-label">Client Satisfaction</div></div>
          <div><div className="hmern-stat-val">{stV ? c4 : 0} Days</div><div className="hmern-stat-label">Avg Onboarding</div></div>
        </div>
      </section>

      <section className="hmern-sec hmern-sec-alt" ref={prR}>
        <div className="hmern-wrap">
          <h2 className="hmern-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hmern-sec-sub">From brief to first commit — in under two weeks.</p>
          <div className="hmern-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hmern-step${prV ? ' hmern-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hmern-step-n">{p.n}</div>
                <h3>{p.h}</h3><p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmern-sec">
        <div className="hmern-wrap">
          <h2 className="hmern-sec-title">Frequently Asked Questions</h2>
          <p className="hmern-sec-sub">Common questions before hiring a MERN stack developer from 1Solutions.</p>
          <div className="hmern-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hmern-faq-item">
                <div className="hmern-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hmern-faq-icon${openFaq === i ? ' hmern-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hmern-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmern-cta">
        <div className="hmern-wrap">
          <h2>Ready to Hire Your MERN Stack Developer?</h2>
          <p>Share your stack and requirements — receive matched developer profiles within 48 hours, no commitment required.</p>
          <Link href="/contact-us" className="hmern-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
