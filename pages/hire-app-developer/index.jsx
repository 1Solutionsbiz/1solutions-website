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

const ACCENT = '#4c1130';
const SKILLS = [
  'iOS (Swift / SwiftUI)', 'Android (Kotlin)', 'React Native', 'Flutter / Dart',
  'Firebase', 'REST APIs & GraphQL', 'Push Notifications', 'In-App Purchases',
  'App Store Optimisation', 'CI/CD (Fastlane / Bitrise)', 'Offline-First Architecture',
  'Analytics Integration', 'OAuth / Biometric Auth', 'Unit & UI Testing',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time mobile developer committed to your product — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for feature additions, bug-fix sprints, or ongoing maintenance.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Pay for exactly what you need — ideal for code audits, POCs, or burst capacity.', icon: '🕐' },
];
const WHY = [
  { h: 'Multi-Platform Expertise', b: 'We have specialists across iOS, Android, React Native, and Flutter — one partner for your entire mobile portfolio.' },
  { h: 'Pre-Screened Talent', b: 'Every developer passes architecture, code quality, and live-coding assessments before being matched to a client.' },
  { h: 'Quick Start', b: 'Profiles in 48 hours, interviews arranged same week, first sprint launched within 7 business days.' },
  { h: 'Transparent Process', b: 'Daily standups, sprint demos, and shared dashboards so you always know what is shipping next.' },
  { h: 'NDA & IP Safety', b: 'Comprehensive NDA and IP assignment signed before access to any of your code or designs.' },
  { h: 'Scale on Demand', b: 'Add more developers mid-project or reduce the team between phases with 2-week notice.' },
];
const PROCESS = [
  { n: '01', h: 'Submit Your Brief', b: 'Tell us the platform, seniority, and project context. Takes under 10 minutes.' },
  { n: '02', h: 'Receive Profiles', b: 'Get 2-3 hand-picked developer profiles within 48 hours.' },
  { n: '03', h: 'Interview & Choose', b: 'Run your own technical interview and select the best fit.' },
  { n: '04', h: 'Onboard & Build', b: 'Developer joins your stack, tools, and daily workflow — sprints start immediately.' },
];
const FAQS = [
  { q: 'Can I hire a developer for both iOS and Android?', a: 'Yes. We have cross-platform specialists in React Native and Flutter as well as native iOS and Android developers. We can also provide separate specialists for each platform.' },
  { q: 'What is the minimum engagement period?', a: 'Our standard minimum is 4 weeks. This ensures enough time for onboarding, alignment, and meaningful delivery.' },
  { q: 'Will the developer work in my time zone?', a: 'We accommodate IST, GMT, and EST-aligned time zones. Your developer will overlap with your core working hours by at least 4 hours.' },
  { q: 'How do I track daily progress?', a: 'You get access to the same project management tools your team uses, plus daily standup notes and a weekly delivery summary.' },
  { q: 'Can I replace the developer if the fit is wrong?', a: 'We offer a no-questions-asked replacement within the first 2 weeks if the developer does not meet your expectations.' },
  { q: 'Do you handle app store submissions?', a: 'Yes. Our developers can manage both Apple App Store and Google Play submissions, including review responses and update releases.' },
];

export default function HireAppDeveloper() {
  const skR  = useRef(null); const [skV,  setSkV]  = useState(false);
  const enR  = useRef(null); const [enV,  setEnV]  = useState(false);
  const whR  = useRef(null); const [whV,  setWhV]  = useState(false);
  const prR  = useRef(null); const [prV,  setPrV]  = useState(false);
  const stGr = useRef(null); const [stV,  setStV]  = useState(false);

  const [c1, s1] = useCountUp(80);
  const [c2, s2] = useCountUp(400);
  const [c3, s3] = useCountUp(48);
  const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR,  setSkV);  if (skR.current)  o1.observe(skR.current);
    const o2 = obs(enR,  setEnV);  if (enR.current)  o2.observe(enR.current);
    const o3 = obs(whR,  setWhV);  if (whR.current)  o3.observe(whR.current);
    const o4 = obs(prR,  setPrV);  if (prR.current)  o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(80); s2(400); s3(48); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire App Developer', item: 'https://www.1solutions.biz/hire-app-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire App Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated mobile app developers — iOS, Android, React Native, and Flutter — from 1Solutions.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '112', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      }))},
    ],
  };

  return (
    <>
      <Head>
        <title>Hire App Developer | iOS, Android, Flutter & React Native | 1Solutions</title>
        <meta name="description" content="Hire dedicated mobile app developers from 1Solutions. iOS, Android, Flutter, and React Native experts available for immediate engagement. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-app-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hapd-hero{background:linear-gradient(135deg,${ACCENT} 0%,#2a0018 60%,#3d0025 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hapd-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hapd-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hapd-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hapd-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hapd-btn-primary:hover{opacity:.88}
          .hapd-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hapd-btn-outline:hover{border-color:#fff}
          .hapd-sec{padding:70px 20px}
          .hapd-sec-alt{background:#faf8f9}
          .hapd-wrap{max-width:1100px;margin:0 auto}
          .hapd-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hapd-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hapd-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hapd-skill{background:#fff;border:1.5px solid #e8d0d8;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hapd-skill.hapd-in{opacity:1;transform:none}
          .hapd-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hapd-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #edd8df;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hapd-model.hapd-in{opacity:1;transform:none}
          .hapd-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hapd-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hapd-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hapd-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hapd-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hapd-why-item.hapd-in{opacity:1;transform:none}
          .hapd-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hapd-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hapd-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hapd-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #edd8df;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hapd-step.hapd-in{opacity:1;transform:none}
          .hapd-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hapd-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hapd-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hapd-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hapd-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hapd-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hapd-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hapd-faq{max-width:760px;margin:0 auto}
          .hapd-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hapd-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hapd-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hapd-faq-icon.hapd-open{transform:rotate(45deg)}
          .hapd-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hapd-cta{background:linear-gradient(135deg,${ACCENT},#2a0018);padding:80px 20px;text-align:center;color:#fff}
          .hapd-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hapd-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hapd-hero{padding:80px 18px 60px}.hapd-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>

      <section className="hapd-hero">
        <h1>Hire Mobile App Developers<br/>Across Every Platform</h1>
        <p>iOS, Android, Flutter, and React Native experts — pre-vetted, available immediately, and matched to your requirements in 48 hours.</p>
        <div className="hapd-hero-btns">
          <Link href="/contact-us" className="hapd-btn-primary">Hire an App Developer →</Link>
          <Link href="/portfolio" className="hapd-btn-outline">View Portfolio</Link>
        </div>
      </section>

      <section className="hapd-sec" ref={skR}>
        <div className="hapd-wrap">
          <h2 className="hapd-sec-title">Skills &amp; Technology Coverage</h2>
          <p className="hapd-sec-sub">Our developers cover the full spectrum of modern mobile development — native and cross-platform.</p>
          <div className="hapd-skills">
            {SKILLS.map((s, i) => (
              <span key={s} className={`hapd-skill${skV ? ' hapd-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="hapd-sec hapd-sec-alt" ref={enR}>
        <div className="hapd-wrap">
          <h2 className="hapd-sec-title">Flexible Engagement Models</h2>
          <p className="hapd-sec-sub">Match the hiring model to your budget and timeline — switch or scale anytime.</p>
          <div className="hapd-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hapd-model${enV ? ' hapd-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hapd-model-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hapd-sec" ref={whR}>
        <div className="hapd-wrap">
          <h2 className="hapd-sec-title">Why Hire App Developers from 1Solutions?</h2>
          <p className="hapd-sec-sub">We match you with developers who are already shipping production apps — not fresh graduates.</p>
          <div className="hapd-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hapd-why-item${whV ? ' hapd-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hapd-stats" ref={stGr}>
        <div className="hapd-stats-grid">
          <div><div className="hapd-stat-val">{stV ? c1 : 0}+</div><div className="hapd-stat-label">Mobile Developers</div></div>
          <div><div className="hapd-stat-val">{stV ? c2 : 0}+</div><div className="hapd-stat-label">Mobile Apps Delivered</div></div>
          <div><div className="hapd-stat-val">4.{stV ? c3 : 0}/5</div><div className="hapd-stat-label">Client Satisfaction</div></div>
          <div><div className="hapd-stat-val">{stV ? c4 : 0} Days</div><div className="hapd-stat-label">Average Onboarding</div></div>
        </div>
      </section>

      <section className="hapd-sec hapd-sec-alt" ref={prR}>
        <div className="hapd-wrap">
          <h2 className="hapd-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hapd-sec-sub">From brief to first sprint in under two weeks.</p>
          <div className="hapd-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hapd-step${prV ? ' hapd-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hapd-step-n">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hapd-sec">
        <div className="hapd-wrap">
          <h2 className="hapd-sec-title">Frequently Asked Questions</h2>
          <p className="hapd-sec-sub">Common questions about hiring mobile app developers through 1Solutions.</p>
          <div className="hapd-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hapd-faq-item">
                <div className="hapd-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hapd-faq-icon${openFaq === i ? ' hapd-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hapd-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hapd-cta">
        <div className="hapd-wrap">
          <h2>Ready to Hire Your App Developer?</h2>
          <p>Share your requirements and receive matched developer profiles within 48 hours — no commitment required to view profiles.</p>
          <Link href="/contact-us" className="hapd-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
