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

const ACCENT = '#0d3b4f';
const SKILLS = [
  'React Native (CLI & Expo)', 'TypeScript & JavaScript', 'React Navigation',
  'Redux Toolkit & Zustand', 'React Query', 'Native Modules (iOS & Android)',
  'Firebase & Supabase', 'REST APIs & GraphQL', 'Push Notifications (FCM / APNs)',
  'In-App Purchases (RevenueCat)', 'Hermes Engine', 'CodePush / OTA Updates',
  'Detox & Jest Testing', 'Fastlane & CI/CD', 'App Store & Play Store Deployment',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time React Native developer committed to your app — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for iterative feature work, OTA releases, or native bridge tasks.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for performance profiling, bridge debugging, or burst sprint capacity.', icon: '🕐' },
];
const WHY = [
  { h: 'True Cross-Platform Expertise', b: 'Our React Native developers build apps that feel native on both iOS and Android — proper platform-specific UI patterns, gestures, and animations.' },
  { h: 'Native Module Experience', b: 'When JavaScript is not enough, our developers write native modules in Swift/Objective-C and Kotlin/Java to bridge platform capabilities.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your brief and receive 2-3 matched React Native developer CVs within two business days.' },
  { h: 'Performance-Optimised Delivery', b: 'We profile with Flipper and Instruments, eliminate unnecessary re-renders, and use Hermes + Reanimated for fluid 60/120 fps UI.' },
  { h: 'Full Release Pipeline', b: 'From beta distribution on TestFlight and Firebase to production App Store and Play Store releases — we manage the full delivery cycle.' },
  { h: 'NDA & IP Security', b: 'Full NDA and IP assignment executed before any access to your codebase, designs, or developer accounts.' },
];
const PROCESS = [
  { n: '01', h: 'Share Your Requirements', b: 'Describe the app platforms, existing tech stack, and feature roadmap.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 pre-screened React Native CVs delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Conduct your own technical assessment and pick your developer.' },
  { n: '04', h: 'Onboard & Ship', b: 'Developer integrates with your codebase and tools. First sprint in 7 days.' },
];
const FAQS = [
  { q: 'Should I use Expo or bare React Native CLI?', a: 'Expo is ideal for rapid development and standard features; the bare CLI gives full native module control. Our developers are fluent in both and can advise the best fit based on your feature set and timeline.' },
  { q: 'Can they integrate native iOS or Android modules?', a: 'Yes. When JavaScript APIs are insufficient, our developers write native modules in Swift/Objective-C for iOS and Kotlin/Java for Android, exposing them to the React Native layer via the bridge or JSI.' },
  { q: 'How do they handle over-the-air updates?', a: 'We integrate CodePush (App Center) or Expo Updates for OTA JavaScript bundle pushes, allowing bug-fixes and feature flags to ship without App Store review delays.' },
  { q: 'Can they migrate our existing native iOS/Android app to React Native?', a: 'Yes. We have done brownfield integrations — embedding React Native screens into existing native apps — as well as full rewrites. We assess the best migration strategy based on your codebase size.' },
  { q: 'What is the minimum engagement period?', a: 'Our standard minimum is 4 weeks. This provides adequate time for onboarding, architecture alignment, and meaningful feature delivery.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any access to your project.' },
];

export default function HireReactNativeDeveloper() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);

  const [c1, s1] = useCountUp(45);
  const [c2, s2] = useCountUp(190);
  const [c3, s3] = useCountUp(49);
  const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(45); s2(190); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire React Native Developer', item: 'https://www.1solutions.biz/hire-react-native-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire React Native Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated React Native developers from 1Solutions for cross-platform iOS and Android apps.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '89', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire React Native Developer | iOS & Android from One Codebase | 1Solutions</title>
        <meta name="description" content="Hire dedicated React Native developers from 1Solutions. Cross-platform iOS and Android experts with native module experience. Pre-vetted talent. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-react-native-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hrnd-hero{background:linear-gradient(135deg,${ACCENT} 0%,#061e28 60%,#0a2d3e 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hrnd-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hrnd-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hrnd-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hrnd-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hrnd-btn-primary:hover{opacity:.88}
          .hrnd-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hrnd-btn-outline:hover{border-color:#fff}
          .hrnd-sec{padding:70px 20px}
          .hrnd-sec-alt{background:#f2f7fa}
          .hrnd-wrap{max-width:1100px;margin:0 auto}
          .hrnd-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hrnd-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hrnd-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hrnd-skill{background:#fff;border:1.5px solid #a8c4d4;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hrnd-skill.hrnd-in{opacity:1;transform:none}
          .hrnd-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hrnd-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #b8d0e0;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hrnd-model.hrnd-in{opacity:1;transform:none}
          .hrnd-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hrnd-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hrnd-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hrnd-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hrnd-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hrnd-why-item.hrnd-in{opacity:1;transform:none}
          .hrnd-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hrnd-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hrnd-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hrnd-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #b8d0e0;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hrnd-step.hrnd-in{opacity:1;transform:none}
          .hrnd-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hrnd-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hrnd-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hrnd-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hrnd-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hrnd-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hrnd-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hrnd-faq{max-width:760px;margin:0 auto}
          .hrnd-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hrnd-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hrnd-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hrnd-faq-icon.hrnd-open{transform:rotate(45deg)}
          .hrnd-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hrnd-cta{background:linear-gradient(135deg,${ACCENT},#061e28);padding:80px 20px;text-align:center;color:#fff}
          .hrnd-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hrnd-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hrnd-hero{padding:80px 18px 60px}.hrnd-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="hrnd-hero">
        <h1>Hire React Native Developers<br/>iOS &amp; Android from One Codebase</h1>
        <p>Pre-vetted React Native engineers with native module experience — shipping polished cross-platform apps to the App Store and Google Play. Profiles in 48 hours.</p>
        <div className="hrnd-hero-btns">
          <Link href="/contact-us" className="hrnd-btn-primary">Hire a React Native Developer →</Link>
          <Link href="/portfolio" className="hrnd-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="hrnd-sec" ref={skR}>
        <div className="hrnd-wrap">
          <h2 className="hrnd-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hrnd-sec-sub">From Expo setup to native bridge modules — our React Native developers cover the full cross-platform stack.</p>
          <div className="hrnd-skills">{SKILLS.map((s, i) => <span key={s} className={`hrnd-skill${skV ? ' hrnd-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hrnd-sec hrnd-sec-alt" ref={enR}>
        <div className="hrnd-wrap">
          <h2 className="hrnd-sec-title">Flexible Engagement Models</h2>
          <p className="hrnd-sec-sub">Full-time, part-time, or hourly — scaled to your release calendar.</p>
          <div className="hrnd-models">{MODELS.map((m, i) => <div key={m.title} className={`hrnd-model${enV ? ' hrnd-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hrnd-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hrnd-sec" ref={whR}>
        <div className="hrnd-wrap">
          <h2 className="hrnd-sec-title">Why Hire React Native Developers from 1Solutions?</h2>
          <p className="hrnd-sec-sub">We place engineers who have shipped cross-platform apps with 100k+ downloads — not just Todo app builders.</p>
          <div className="hrnd-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hrnd-why-item${whV ? ' hrnd-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hrnd-stats" ref={stGr}>
        <div className="hrnd-stats-grid">
          <div><div className="hrnd-stat-val">{stV ? c1 : 0}+</div><div className="hrnd-stat-label">RN Developers</div></div>
          <div><div className="hrnd-stat-val">{stV ? c2 : 0}+</div><div className="hrnd-stat-label">Apps Delivered</div></div>
          <div><div className="hrnd-stat-val">4.{stV ? c3 : 0}/5</div><div className="hrnd-stat-label">Client Satisfaction</div></div>
          <div><div className="hrnd-stat-val">{stV ? c4 : 0} Days</div><div className="hrnd-stat-label">Avg Onboarding</div></div>
        </div>
      </section>
      <section className="hrnd-sec hrnd-sec-alt" ref={prR}>
        <div className="hrnd-wrap">
          <h2 className="hrnd-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hrnd-sec-sub">From brief to first sprint — in under two weeks.</p>
          <div className="hrnd-process">{PROCESS.map((p, i) => <div key={p.n} className={`hrnd-step${prV ? ' hrnd-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hrnd-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hrnd-sec">
        <div className="hrnd-wrap">
          <h2 className="hrnd-sec-title">Frequently Asked Questions</h2>
          <p className="hrnd-sec-sub">Common questions before hiring a React Native developer from 1Solutions.</p>
          <div className="hrnd-faq">{FAQS.map((f, i) => <div key={i} className="hrnd-faq-item"><div className="hrnd-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hrnd-faq-icon${openFaq === i ? ' hrnd-open' : ''}`}>+</span></div>{openFaq === i && <p className="hrnd-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hrnd-cta">
        <div className="hrnd-wrap">
          <h2>Ready to Hire Your React Native Developer?</h2>
          <p>Share your requirements and receive matched React Native specialist profiles within 48 hours — no commitment required.</p>
          <Link href="/contact-us" className="hrnd-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
