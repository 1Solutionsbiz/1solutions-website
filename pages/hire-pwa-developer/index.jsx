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

const ACCENT = '#002244';
const SKILLS = [
  'Service Workers', 'Web App Manifest', 'Workbox', 'React PWA (CRA / Vite)',
  'Next.js PWA', 'Vue / Nuxt.js PWA', 'Angular Service Worker', 'Web Push Notifications',
  'Background Sync', 'IndexedDB & Cache API', 'Offline-First Architecture',
  'Lighthouse PWA Audit', 'TypeScript', 'REST APIs & GraphQL', 'Performance Optimisation',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time PWA developer committed to your product — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for PWA conversion, offline features, or ongoing capability additions.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for PWA audits, Lighthouse score improvements, or service worker debugging.', icon: '🕐' },
];
const WHY = [
  { h: 'PWA-First Mindset', b: 'We design for offline-first from the start — service worker strategy, caching topology, and background sync are architecture decisions, not afterthoughts.' },
  { h: 'Lighthouse 100 Targets', b: 'Our developers optimise for all four Lighthouse categories — Performance, Accessibility, Best Practices, and PWA criteria — as standard deliverables.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your brief and receive 2-3 matched PWA developer CVs within two business days.' },
  { h: 'Cross-Framework Expertise', b: 'We build PWAs on React, Next.js, Vue, Nuxt, and Angular — the right framework for your team and use case.' },
  { h: 'Install & Push Pipeline', b: 'From Web App Manifest configuration to platform-specific install prompts and push notification campaigns — end-to-end.' },
  { h: 'NDA & IP Security', b: 'Full IP assignment and NDA signed before any access to your codebase or infrastructure.' },
];
const PROCESS = [
  { n: '01', h: 'Define Your PWA Goals', b: 'Tell us the existing tech stack, offline requirements, and target Lighthouse scores.' },
  { n: '02', h: 'Receive Matched Profiles', b: '2-3 pre-screened PWA developer CVs delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Conduct your own technical assessment and pick the right developer.' },
  { n: '04', h: 'Onboard & Optimise', b: 'Developer integrates with your codebase. First sprint starts within 7 days.' },
];
const FAQS = [
  { q: 'Can a PWA replace a native mobile app?', a: 'For many use cases — yes. PWAs support offline access, push notifications, home screen installation, camera, geolocation, and background sync. For apps requiring Bluetooth, NFC, or deep OS integration, a native approach may still be preferred.' },
  { q: 'Which frameworks do your PWA developers work with?', a: 'Our PWA developers are proficient in React (CRA and Vite), Next.js, Vue/Nuxt.js, and Angular. We select the framework based on your existing stack or project requirements.' },
  { q: 'Can they convert our existing web app into a PWA?', a: 'Yes. PWA conversion is one of our most common engagements. We add a service worker, manifest, caching strategy, and offline fallbacks to an existing web application without rebuilding it from scratch.' },
  { q: 'How do push notifications work in a PWA?', a: 'We implement Web Push using the Push API and service workers. Users are prompted to subscribe, and notifications are delivered even when the browser is closed via a push service (FCM for Chrome, APNS for Safari).' },
  { q: 'What is the minimum engagement period?', a: 'Our standard minimum is 4 weeks. PWA conversion projects for smaller apps can sometimes be scoped as shorter fixed deliverables on request.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HirePWADeveloper() {
  const skR  = useRef(null); const [skV,  setSkV]  = useState(false);
  const enR  = useRef(null); const [enV,  setEnV]  = useState(false);
  const whR  = useRef(null); const [whV,  setWhV]  = useState(false);
  const prR  = useRef(null); const [prV,  setPrV]  = useState(false);
  const stGr = useRef(null); const [stV,  setStV]  = useState(false);

  const [c1, s1] = useCountUp(30);
  const [c2, s2] = useCountUp(110);
  const [c3, s3] = useCountUp(49);
  const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR,  setSkV);  if (skR.current)  o1.observe(skR.current);
    const o2 = obs(enR,  setEnV);  if (enR.current)  o2.observe(enR.current);
    const o3 = obs(whR,  setWhV);  if (whR.current)  o3.observe(whR.current);
    const o4 = obs(prR,  setPrV);  if (prR.current)  o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(30); s2(110); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire PWA Developer', item: 'https://www.1solutions.biz/hire-pwa-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire PWA Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated Progressive Web App developers from 1Solutions for offline-first, installable web applications.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '62', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire PWA Developer | Progressive Web App Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated PWA developers from 1Solutions. Service workers, offline-first architecture, Web Push, and Lighthouse 100 optimisation. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-pwa-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hpwa-hero{background:linear-gradient(135deg,${ACCENT} 0%,#001228 60%,#001a38 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hpwa-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hpwa-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hpwa-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hpwa-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hpwa-btn-primary:hover{opacity:.88}
          .hpwa-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hpwa-btn-outline:hover{border-color:#fff}
          .hpwa-sec{padding:70px 20px}
          .hpwa-sec-alt{background:#f2f5fa}
          .hpwa-wrap{max-width:1100px;margin:0 auto}
          .hpwa-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hpwa-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hpwa-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hpwa-skill{background:#fff;border:1.5px solid #b8c8dc;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hpwa-skill.hpwa-in{opacity:1;transform:none}
          .hpwa-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hpwa-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #c8d8ec;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hpwa-model.hpwa-in{opacity:1;transform:none}
          .hpwa-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hpwa-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hpwa-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hpwa-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hpwa-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hpwa-why-item.hpwa-in{opacity:1;transform:none}
          .hpwa-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hpwa-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hpwa-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hpwa-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #c8d8ec;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hpwa-step.hpwa-in{opacity:1;transform:none}
          .hpwa-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hpwa-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hpwa-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hpwa-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hpwa-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hpwa-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hpwa-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hpwa-faq{max-width:760px;margin:0 auto}
          .hpwa-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hpwa-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hpwa-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hpwa-faq-icon.hpwa-open{transform:rotate(45deg)}
          .hpwa-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hpwa-cta{background:linear-gradient(135deg,${ACCENT},#001228);padding:80px 20px;text-align:center;color:#fff}
          .hpwa-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hpwa-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hpwa-hero{padding:80px 18px 60px}.hpwa-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>

      <section className="hpwa-hero">
        <h1>Hire PWA Developers<br/>App-Like Experiences on the Web</h1>
        <p>Pre-vetted Progressive Web App specialists — offline-first architecture, Web Push, home screen install, and Lighthouse 100 targets. Profiles in 48 hours.</p>
        <div className="hpwa-hero-btns">
          <Link href="/contact-us" className="hpwa-btn-primary">Hire a PWA Developer →</Link>
          <Link href="/portfolio" className="hpwa-btn-outline">View Portfolio</Link>
        </div>
      </section>

      <section className="hpwa-sec" ref={skR}>
        <div className="hpwa-wrap">
          <h2 className="hpwa-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hpwa-sec-sub">Our PWA developers cover every layer — service workers, caching strategies, push notifications, and cross-framework implementation.</p>
          <div className="hpwa-skills">
            {SKILLS.map((s, i) => <span key={s} className={`hpwa-skill${skV ? ' hpwa-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}
          </div>
        </div>
      </section>

      <section className="hpwa-sec hpwa-sec-alt" ref={enR}>
        <div className="hpwa-wrap">
          <h2 className="hpwa-sec-title">Flexible Engagement Models</h2>
          <p className="hpwa-sec-sub">Full-time, part-time, or hourly — matched to the scope of your PWA project.</p>
          <div className="hpwa-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hpwa-model${enV ? ' hpwa-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hpwa-model-icon">{m.icon}</div>
                <h3>{m.title}</h3><p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpwa-sec" ref={whR}>
        <div className="hpwa-wrap">
          <h2 className="hpwa-sec-title">Why Hire PWA Developers from 1Solutions?</h2>
          <p className="hpwa-sec-sub">We build PWAs that pass every installability and reliability check — not just ones with a manifest file added.</p>
          <div className="hpwa-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hpwa-why-item${whV ? ' hpwa-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3><p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpwa-stats" ref={stGr}>
        <div className="hpwa-stats-grid">
          <div><div className="hpwa-stat-val">{stV ? c1 : 0}+</div><div className="hpwa-stat-label">PWA Developers</div></div>
          <div><div className="hpwa-stat-val">{stV ? c2 : 0}+</div><div className="hpwa-stat-label">PWAs Delivered</div></div>
          <div><div className="hpwa-stat-val">4.{stV ? c3 : 0}/5</div><div className="hpwa-stat-label">Client Satisfaction</div></div>
          <div><div className="hpwa-stat-val">{stV ? c4 : 0} Days</div><div className="hpwa-stat-label">Avg Onboarding</div></div>
        </div>
      </section>

      <section className="hpwa-sec hpwa-sec-alt" ref={prR}>
        <div className="hpwa-wrap">
          <h2 className="hpwa-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hpwa-sec-sub">From brief to first installable build — in under two weeks.</p>
          <div className="hpwa-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hpwa-step${prV ? ' hpwa-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hpwa-step-n">{p.n}</div>
                <h3>{p.h}</h3><p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpwa-sec">
        <div className="hpwa-wrap">
          <h2 className="hpwa-sec-title">Frequently Asked Questions</h2>
          <p className="hpwa-sec-sub">Common questions before hiring a PWA developer from 1Solutions.</p>
          <div className="hpwa-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hpwa-faq-item">
                <div className="hpwa-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hpwa-faq-icon${openFaq === i ? ' hpwa-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hpwa-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpwa-cta">
        <div className="hpwa-wrap">
          <h2>Ready to Hire Your PWA Developer?</h2>
          <p>Share your requirements and receive matched PWA specialist profiles within 48 hours — no commitment required.</p>
          <Link href="/contact-us" className="hpwa-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
