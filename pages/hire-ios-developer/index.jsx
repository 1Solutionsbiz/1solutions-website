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

const ACCENT = '#3b0764';
const SKILLS = [
  'Swift 5.x', 'SwiftUI', 'UIKit', 'Combine & Async/Await',
  'CoreData & CloudKit', 'ARKit & RealityKit', 'CoreML & Vision',
  'HealthKit & WatchOS', 'StoreKit (In-App Purchases)', 'Push Notifications (APNs)',
  'XCTest & XCUITest', 'Fastlane & TestFlight', 'App Store Connect',
  'Xcode Instruments', 'OAuth 2.0 & Biometrics',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time iOS developer committed exclusively to your product — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for ongoing feature additions, App Store releases, or maintenance.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible hourly billing for code audits, Swift migration, or burst feature delivery.', icon: '🕐' },
];
const WHY = [
  { h: 'Apple Platform Depth', b: 'Our developers build for iPhone, iPad, Apple Watch, and Apple TV — native to the core, not cross-platform wrappers.' },
  { h: 'Swift & SwiftUI First', b: 'All new development uses modern Swift and SwiftUI. Legacy UIKit codebases are also fully supported and incrementally migrated.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your brief and receive 2-3 pre-screened iOS developer CVs within two business days.' },
  { h: 'App Store Expertise', b: 'From TestFlight beta management to App Store Connect submissions and review response — we handle the full release cycle.' },
  { h: 'IP & NDA Protection', b: 'NDA and IP assignment signed before any access to your Xcode project, codebase, or Apple developer account.' },
  { h: 'No Lock-In', b: 'Month-to-month engagements with 30-day notice to scale or disengage. Your code belongs to you.' },
];
const PROCESS = [
  { n: '01', h: 'Define Your Needs', b: 'Describe the iOS version target, existing tech, and project timeline.' },
  { n: '02', h: 'Receive Matched Profiles', b: 'Get 2-3 pre-vetted iOS developer CVs within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Run your own technical assessment and choose your iOS developer.' },
  { n: '04', h: 'Onboard & Ship', b: 'Developer joins your Xcode project and workflow. First sprint starts within 7 days.' },
];
const FAQS = [
  { q: 'Do your iOS developers use Swift or Objective-C?', a: 'All new projects are built in Swift. Our developers also maintain and refactor Objective-C codebases and can incrementally migrate them to Swift.' },
  { q: 'Can they build for iPad, Apple Watch, and tvOS too?', a: 'Yes. We have developers with cross-platform Apple experience covering iPadOS, watchOS, and tvOS alongside the primary iPhone target.' },
  { q: 'How do you handle App Store submissions?', a: 'Our developers manage the full release process — TestFlight builds, metadata and screenshots, App Store Connect submission, and review board responses.' },
  { q: 'Can the developer work with our existing Xcode project?', a: 'Absolutely. The developer begins with a codebase review, aligns to your architecture patterns, and follows your code review process before writing new code.' },
  { q: 'What is the minimum engagement length?', a: 'Our standard minimum is 4 weeks. This allows enough time for onboarding, architecture alignment, and meaningful feature delivery.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any project access is granted.' },
];

export default function HireIOSDeveloper() {
  const skR  = useRef(null); const [skV,  setSkV]  = useState(false);
  const enR  = useRef(null); const [enV,  setEnV]  = useState(false);
  const whR  = useRef(null); const [whV,  setWhV]  = useState(false);
  const prR  = useRef(null); const [prV,  setPrV]  = useState(false);
  const stGr = useRef(null); const [stV,  setStV]  = useState(false);

  const [c1, s1] = useCountUp(50);
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
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(50); s2(220); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire iOS Developer', item: 'https://www.1solutions.biz/hire-ios-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire iOS Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated iOS developers from 1Solutions — Swift, SwiftUI, and UIKit experts for iPhone, iPad, and Apple Watch.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '96', bestRating: '5' },
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
        <title>Hire iOS Developer | Swift & SwiftUI Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated iOS developers from 1Solutions. Swift, SwiftUI, and UIKit experts for iPhone, iPad, and Apple Watch apps. Pre-vetted talent. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-ios-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hios-hero{background:linear-gradient(135deg,${ACCENT} 0%,#1f023a 60%,#300554 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hios-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hios-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hios-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hios-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hios-btn-primary:hover{opacity:.88}
          .hios-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hios-btn-outline:hover{border-color:#fff}
          .hios-sec{padding:70px 20px}
          .hios-sec-alt{background:#f8f5fc}
          .hios-wrap{max-width:1100px;margin:0 auto}
          .hios-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hios-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hios-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hios-skill{background:#fff;border:1.5px solid #d8c8ec;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hios-skill.hios-in{opacity:1;transform:none}
          .hios-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hios-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #ddd0f0;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hios-model.hios-in{opacity:1;transform:none}
          .hios-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hios-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hios-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hios-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hios-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hios-why-item.hios-in{opacity:1;transform:none}
          .hios-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hios-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hios-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hios-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #ddd0f0;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hios-step.hios-in{opacity:1;transform:none}
          .hios-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hios-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hios-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hios-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hios-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hios-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hios-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hios-faq{max-width:760px;margin:0 auto}
          .hios-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hios-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hios-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hios-faq-icon.hios-open{transform:rotate(45deg)}
          .hios-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hios-cta{background:linear-gradient(135deg,${ACCENT},#1f023a);padding:80px 20px;text-align:center;color:#fff}
          .hios-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hios-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hios-hero{padding:80px 18px 60px}.hios-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>

      <section className="hios-hero">
        <h1>Hire iOS Developers<br/>Native Swift Expertise</h1>
        <p>Pre-vetted Swift and SwiftUI engineers for iPhone, iPad, Apple Watch, and tvOS. Beautiful apps, flawless App Store submissions. Profiles in 48 hours.</p>
        <div className="hios-hero-btns">
          <Link href="/contact" className="hios-btn-primary">Hire an iOS Developer →</Link>
          <Link href="/portfolio" className="hios-btn-outline">View Portfolio</Link>
        </div>
      </section>

      <section className="hios-sec" ref={skR}>
        <div className="hios-wrap">
          <h2 className="hios-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hios-sec-sub">Our iOS developers are fluent in the full Apple platform — from Swift concurrency to HealthKit and ARKit integrations.</p>
          <div className="hios-skills">
            {SKILLS.map((s, i) => (
              <span key={s} className={`hios-skill${skV ? ' hios-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="hios-sec hios-sec-alt" ref={enR}>
        <div className="hios-wrap">
          <h2 className="hios-sec-title">Flexible Engagement Models</h2>
          <p className="hios-sec-sub">Full-time focus, part-time sprints, or hourly support — structured around your release calendar.</p>
          <div className="hios-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hios-model${enV ? ' hios-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hios-model-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hios-sec" ref={whR}>
        <div className="hios-wrap">
          <h2 className="hios-sec-title">Why Hire iOS Developers from 1Solutions?</h2>
          <p className="hios-sec-sub">Our iOS engineers have shipped App Store apps with millions of downloads — not just internal tools.</p>
          <div className="hios-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hios-why-item${whV ? ' hios-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hios-stats" ref={stGr}>
        <div className="hios-stats-grid">
          <div><div className="hios-stat-val">{stV ? c1 : 0}+</div><div className="hios-stat-label">iOS Developers</div></div>
          <div><div className="hios-stat-val">{stV ? c2 : 0}+</div><div className="hios-stat-label">iOS Apps Delivered</div></div>
          <div><div className="hios-stat-val">4.{stV ? c3 : 0}/5</div><div className="hios-stat-label">Client Satisfaction</div></div>
          <div><div className="hios-stat-val">{stV ? c4 : 0} Days</div><div className="hios-stat-label">Average Onboarding</div></div>
        </div>
      </section>

      <section className="hios-sec hios-sec-alt" ref={prR}>
        <div className="hios-wrap">
          <h2 className="hios-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hios-sec-sub">From brief to first TestFlight build — in under two weeks.</p>
          <div className="hios-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hios-step${prV ? ' hios-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hios-step-n">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hios-sec">
        <div className="hios-wrap">
          <h2 className="hios-sec-title">Frequently Asked Questions</h2>
          <p className="hios-sec-sub">Everything you need to know before hiring an iOS developer from 1Solutions.</p>
          <div className="hios-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hios-faq-item">
                <div className="hios-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hios-faq-icon${openFaq === i ? ' hios-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hios-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hios-cta">
        <div className="hios-wrap">
          <h2>Ready to Hire Your iOS Developer?</h2>
          <p>Share your requirements and receive matched iOS specialist profiles within 48 hours — no commitment required.</p>
          <Link href="/contact" className="hios-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
