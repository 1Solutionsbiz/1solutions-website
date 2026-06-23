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

const ACCENT = '#7a2000';
const SKILLS = [
  'Swift 5.9 & Swift Concurrency', 'SwiftUI & UIKit', 'Combine Framework', 'CoreData & SwiftData',
  'CloudKit & iCloud Sync', 'AVFoundation & CoreAudio', 'ARKit & RealityKit', 'CoreML & Vision',
  'HealthKit & ResearchKit', 'In-App Purchases & StoreKit 2', 'Push Notifications (APNs)', 'CoreLocation & MapKit',
  'XCTest & Swift Testing', 'Xcode Cloud & Fastlane', 'App Store Connect & TestFlight',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time Swift developer committed to your iOS app — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for SwiftUI refactors, new feature modules, or performance tuning.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for App Store submissions, crash investigations, or code reviews.', icon: '🕐' },
];
const WHY = [
  { h: 'Native iOS Specialists', b: 'Pure Swift — no cross-platform wrappers. Our developers write idiomatic Swift that Apple engineers would be happy to review.' },
  { h: 'SwiftUI & UIKit Fluency', b: 'We cover both paradigms: SwiftUI for modern declarative UIs and UIKit for complex layout, animation, and custom controls.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your requirements and receive 2-3 matched Swift developer CVs within two business days.' },
  { h: 'App Store Track Record', b: 'Our developers have shipped apps across Health, Finance, AR/VR, and Consumer categories with strong App Store ratings.' },
  { h: 'Privacy & Security First', b: 'We follow Apple\'s privacy guidelines — minimal data collection, local-first architecture, and App Tracking Transparency compliance.' },
  { h: 'NDA & IP Protection', b: 'NDA and IP assignment signed before access to your codebase, Xcode project, or design files.' },
];
const PROCESS = [
  { n: '01', h: 'Share iOS Requirements', b: 'Tell us your iOS version targets, feature scope, and the level of Swift expertise you need.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 matched Swift developer CVs delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Run your own technical round — SwiftUI code review, architecture discussion, or live Swift challenge.' },
  { n: '04', h: 'Onboard & Build', b: 'Developer joins your Xcode workspace. First commit lands within 7 days.' },
];
const FAQS = [
  { q: 'Do your Swift developers use SwiftUI or UIKit?', a: 'Both. Most new projects use SwiftUI (iOS 16+), while legacy apps typically retain UIKit with gradual SwiftUI adoption for new screens. Our developers are comfortable in either paradigm.' },
  { q: 'Can they work with CoreData and SwiftData?', a: 'Yes. We use CoreData for iOS 16 and earlier targets, and SwiftData for iOS 17+ projects that benefit from the modern macro-driven persistence model.' },
  { q: 'Do they handle App Store submissions?', a: 'Yes. Our developers manage the full App Store Connect workflow — provisioning profiles, code signing, screenshot generation, App Review submissions, and TestFlight beta distribution.' },
  { q: 'Can they integrate HealthKit or StoreKit 2?', a: 'Yes. We have shipped apps in the Health and Fitness category with HealthKit integration, and consumer apps using StoreKit 2 for subscription and one-time purchase management.' },
  { q: 'Do they write unit and UI tests?', a: 'Yes. Unit tests with XCTest, UI automation with XCUITest, and optional Swift Testing framework for newer targets. We also configure Xcode Cloud or Fastlane for CI/CD.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireSwiftDeveloper() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(35); const [c2, s2] = useCountUp(140);
  const [c3, s3] = useCountUp(49); const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(35); s2(140); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Swift Developer', item: 'https://www.1solutions.biz/hire-swift-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire Swift Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated Swift developers from 1Solutions — native iOS, SwiftUI, and Apple platform experts.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '83', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire Swift Developer | Native iOS & SwiftUI Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated Swift developers from 1Solutions. Native iOS, SwiftUI, UIKit, CoreData, and StoreKit 2 specialists. Pre-vetted profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-swift-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hswft-hero{background:linear-gradient(135deg,${ACCENT} 0%,#3d1000 60%,#5a1800 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hswft-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hswft-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hswft-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hswft-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hswft-btn-primary:hover{opacity:.88}
          .hswft-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hswft-btn-outline:hover{border-color:#fff}
          .hswft-sec{padding:70px 20px}.hswft-sec-alt{background:#fdf2ee}
          .hswft-wrap{max-width:1100px;margin:0 auto}
          .hswft-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hswft-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hswft-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hswft-skill{background:#fff;border:1.5px solid #d4a090;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hswft-skill.hswft-in{opacity:1;transform:none}
          .hswft-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hswft-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #d4a090;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hswft-model.hswft-in{opacity:1;transform:none}
          .hswft-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hswft-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hswft-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hswft-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hswft-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hswft-why-item.hswft-in{opacity:1;transform:none}
          .hswft-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hswft-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hswft-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hswft-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #d4a090;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hswft-step.hswft-in{opacity:1;transform:none}
          .hswft-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hswft-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hswft-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hswft-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hswft-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hswft-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hswft-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hswft-faq{max-width:760px;margin:0 auto}
          .hswft-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hswft-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hswft-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hswft-faq-icon.hswft-open{transform:rotate(45deg)}
          .hswft-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hswft-cta{background:linear-gradient(135deg,${ACCENT},#3d1000);padding:80px 20px;text-align:center;color:#fff}
          .hswft-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hswft-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hswft-hero{padding:80px 18px 60px}.hswft-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="hswft-hero">
        <h1>Hire Swift Developers<br/>Native iOS &amp; Apple Platform Specialists</h1>
        <p>Pre-vetted Swift engineers who build polished, performant iOS apps using SwiftUI, UIKit, and the full Apple SDK. Profiles in 48 hours.</p>
        <div className="hswft-hero-btns">
          <Link href="/contact-us" className="hswft-btn-primary">Hire a Swift Developer →</Link>
          <Link href="/portfolio" className="hswft-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="hswft-sec" ref={skR}>
        <div className="hswft-wrap">
          <h2 className="hswft-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hswft-sec-sub">Our Swift developers cover the full Apple platform — from SwiftUI layouts to CoreML models.</p>
          <div className="hswft-skills">{SKILLS.map((s, i) => <span key={s} className={`hswft-skill${skV ? ' hswft-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hswft-sec hswft-sec-alt" ref={enR}>
        <div className="hswft-wrap">
          <h2 className="hswft-sec-title">Flexible Engagement Models</h2>
          <p className="hswft-sec-sub">Choose the model that fits your release cadence and App Store schedule.</p>
          <div className="hswft-models">{MODELS.map((m, i) => <div key={m.title} className={`hswft-model${enV ? ' hswft-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hswft-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hswft-sec" ref={whR}>
        <div className="hswft-wrap">
          <h2 className="hswft-sec-title">Why Hire Swift Developers from 1Solutions?</h2>
          <p className="hswft-sec-sub">We place engineers who have shipped native iOS apps that Apple users actually love.</p>
          <div className="hswft-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hswft-why-item${whV ? ' hswft-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hswft-stats" ref={stGr}>
        <div className="hswft-stats-grid">
          <div><div className="hswft-stat-val">{stV ? c1 : 0}+</div><div className="hswft-stat-label">Swift Developers</div></div>
          <div><div className="hswft-stat-val">{stV ? c2 : 0}+</div><div className="hswft-stat-label">iOS Apps Delivered</div></div>
          <div><div className="hswft-stat-val">4.{stV ? c3 : 0}/5</div><div className="hswft-stat-label">Client Satisfaction</div></div>
          <div><div className="hswft-stat-val">{stV ? c4 : 0} Days</div><div className="hswft-stat-label">Avg Onboarding</div></div>
        </div>
      </section>
      <section className="hswft-sec hswft-sec-alt" ref={prR}>
        <div className="hswft-wrap">
          <h2 className="hswft-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hswft-sec-sub">From brief to first Xcode commit — in under two weeks.</p>
          <div className="hswft-process">{PROCESS.map((p, i) => <div key={p.n} className={`hswft-step${prV ? ' hswft-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hswft-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hswft-sec">
        <div className="hswft-wrap">
          <h2 className="hswft-sec-title">Frequently Asked Questions</h2>
          <p className="hswft-sec-sub">Common questions before hiring a Swift developer from 1Solutions.</p>
          <div className="hswft-faq">{FAQS.map((f, i) => <div key={i} className="hswft-faq-item"><div className="hswft-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hswft-faq-icon${openFaq === i ? ' hswft-open' : ''}`}>+</span></div>{openFaq === i && <p className="hswft-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hswft-cta">
        <div className="hswft-wrap">
          <h2>Ready to Hire Your Swift Developer?</h2>
          <p>Share your iOS requirements and receive matched Swift specialist profiles within 48 hours — no commitment required.</p>
          <Link href="/contact-us" className="hswft-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
