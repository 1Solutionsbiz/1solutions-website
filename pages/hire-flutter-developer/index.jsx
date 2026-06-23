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

const ACCENT = '#004d5e';
const SKILLS = [
  'Dart', 'Flutter 3.x', 'BLoC / Cubit', 'GetX & Riverpod',
  'Flutter Web & Desktop', 'Firebase Integration', 'REST APIs & GraphQL',
  'Hive & SQLite', 'Provider Pattern', 'Animations & Custom Paint',
  'Platform Channels (iOS & Android)', 'In-App Purchases', 'Push Notifications',
  'Flavors & CI/CD', 'Fastlane & Codemagic',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A Flutter specialist working exclusively on your product — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for iterative feature development or ongoing platform maintenance.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for code reviews, POCs, or burst delivery — pay for actual hours.', icon: '🕐' },
];
const WHY = [
  { h: 'Senior Flutter Engineers', b: 'Our Flutter developers have shipped production apps on iOS, Android, web, and desktop using the same codebase.' },
  { h: 'Performance-First Development', b: 'Every app is profiled for jank-free 60/120 fps rendering, minimal rebuild cycles, and efficient state management.' },
  { h: '48-Hour Matching', b: 'Submit your brief and receive 2-3 matched developer profiles within two business days.' },
  { h: 'Seamless Collaboration', b: 'Daily standups, pull request reviews, and shared project boards — integrated into your existing workflow.' },
  { h: 'IP & NDA Security', b: 'Full IP assignment and confidentiality agreements signed before any code is accessed or written.' },
  { h: 'Elastic Team Size', b: 'Start with one developer and scale to a full Flutter squad as your product roadmap grows.' },
];
const PROCESS = [
  { n: '01', h: 'Define Your Requirements', b: 'Describe the platforms (iOS/Android/web/desktop), seniority needed, and project goals.' },
  { n: '02', h: 'Receive Profiles in 48 hrs', b: 'We send 2-3 pre-screened Flutter developer CVs tailored to your stack.' },
  { n: '03', h: 'Interview & Select', b: 'Conduct your own technical assessment. You choose who joins your team.' },
  { n: '04', h: 'Onboard & Deliver', b: 'Developer integrates with your tools and workflow. First sprint starts within 7 days.' },
];
const FAQS = [
  { q: 'Can Flutter developers build for iOS, Android, and web simultaneously?', a: 'Yes. Flutter is designed for a single codebase that targets iOS, Android, web, and desktop. Our developers are experienced in managing platform-specific divergence and flavors.' },
  { q: 'Which state management approach do your developers prefer?', a: 'Our developers are proficient in BLoC, Riverpod, GetX, and Provider. We recommend BLoC or Riverpod for larger apps and GetX for rapid prototyping — the final choice depends on your team standard.' },
  { q: 'Can a hired Flutter developer work with our existing codebase?', a: 'Absolutely. Our developers begin with a codebase review, familiarise themselves with your architecture, and follow your coding conventions before writing a single line.' },
  { q: 'Do you support Flutter Web and Desktop builds?', a: 'Yes. We have experience delivering Flutter apps for web (deployed via CDN) and desktop (macOS, Windows, Linux). Native-specific features are handled via platform channels.' },
  { q: 'What is the minimum engagement period?', a: 'Our standard minimum is 4 weeks. Shorter engagements for specific deliverables are considered on request.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment are signed as standard before any access to your project is granted.' },
];

export default function HireFlutterDeveloper() {
  const skR  = useRef(null); const [skV,  setSkV]  = useState(false);
  const enR  = useRef(null); const [enV,  setEnV]  = useState(false);
  const whR  = useRef(null); const [whV,  setWhV]  = useState(false);
  const prR  = useRef(null); const [prV,  setPrV]  = useState(false);
  const stGr = useRef(null); const [stV,  setStV]  = useState(false);

  const [c1, s1] = useCountUp(45);
  const [c2, s2] = useCountUp(180);
  const [c3, s3] = useCountUp(49);
  const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR,  setSkV);  if (skR.current)  o1.observe(skR.current);
    const o2 = obs(enR,  setEnV);  if (enR.current)  o2.observe(enR.current);
    const o3 = obs(whR,  setWhV);  if (whR.current)  o3.observe(whR.current);
    const o4 = obs(prR,  setPrV);  if (prR.current)  o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(45); s2(180); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Flutter Developer', item: 'https://www.1solutions.biz/hire-flutter-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire Flutter Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated Flutter developers from 1Solutions for iOS, Android, web, and desktop cross-platform apps.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '78', bestRating: '5' },
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
        <title>Hire Flutter Developer | Cross-Platform Mobile Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated Flutter developers from 1Solutions. iOS, Android, web & desktop from a single codebase. Pre-vetted Dart & Flutter 3.x experts. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-flutter-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hflut-hero{background:linear-gradient(135deg,${ACCENT} 0%,#002a35 60%,#003d4d 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hflut-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hflut-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hflut-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hflut-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hflut-btn-primary:hover{opacity:.88}
          .hflut-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hflut-btn-outline:hover{border-color:#fff}
          .hflut-sec{padding:70px 20px}
          .hflut-sec-alt{background:#f3f9fa}
          .hflut-wrap{max-width:1100px;margin:0 auto}
          .hflut-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hflut-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hflut-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hflut-skill{background:#fff;border:1.5px solid #b8dde3;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hflut-skill.hflut-in{opacity:1;transform:none}
          .hflut-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hflut-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #c8e5ea;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hflut-model.hflut-in{opacity:1;transform:none}
          .hflut-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hflut-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hflut-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hflut-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hflut-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hflut-why-item.hflut-in{opacity:1;transform:none}
          .hflut-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hflut-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hflut-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hflut-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #c8e5ea;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hflut-step.hflut-in{opacity:1;transform:none}
          .hflut-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hflut-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hflut-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hflut-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hflut-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hflut-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hflut-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hflut-faq{max-width:760px;margin:0 auto}
          .hflut-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hflut-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hflut-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hflut-faq-icon.hflut-open{transform:rotate(45deg)}
          .hflut-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hflut-cta{background:linear-gradient(135deg,${ACCENT},#002a35);padding:80px 20px;text-align:center;color:#fff}
          .hflut-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hflut-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hflut-hero{padding:80px 18px 60px}.hflut-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>

      <section className="hflut-hero">
        <h1>Hire Flutter Developers<br/>One Codebase, Every Platform</h1>
        <p>Pre-vetted Dart &amp; Flutter 3.x experts delivering iOS, Android, web, and desktop apps from a single high-performance codebase. Profiles in 48 hours.</p>
        <div className="hflut-hero-btns">
          <Link href="/contact-us" className="hflut-btn-primary">Hire a Flutter Developer →</Link>
          <Link href="/portfolio" className="hflut-btn-outline">View Portfolio</Link>
        </div>
      </section>

      <section className="hflut-sec" ref={skR}>
        <div className="hflut-wrap">
          <h2 className="hflut-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hflut-sec-sub">Our Flutter developers cover the full Dart and Flutter ecosystem — state management, native bridges, CI/CD, and beyond.</p>
          <div className="hflut-skills">
            {SKILLS.map((s, i) => (
              <span key={s} className={`hflut-skill${skV ? ' hflut-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="hflut-sec hflut-sec-alt" ref={enR}>
        <div className="hflut-wrap">
          <h2 className="hflut-sec-title">Flexible Engagement Models</h2>
          <p className="hflut-sec-sub">Full-time dedication, half-day support, or hourly bursts — choose what fits your roadmap.</p>
          <div className="hflut-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hflut-model${enV ? ' hflut-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hflut-model-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hflut-sec" ref={whR}>
        <div className="hflut-wrap">
          <h2 className="hflut-sec-title">Why Hire Flutter Developers from 1Solutions?</h2>
          <p className="hflut-sec-sub">We place Flutter engineers who have shipped to the App Store and Play Store — not just hobby projects.</p>
          <div className="hflut-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hflut-why-item${whV ? ' hflut-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hflut-stats" ref={stGr}>
        <div className="hflut-stats-grid">
          <div><div className="hflut-stat-val">{stV ? c1 : 0}+</div><div className="hflut-stat-label">Flutter Developers</div></div>
          <div><div className="hflut-stat-val">{stV ? c2 : 0}+</div><div className="hflut-stat-label">Flutter Apps Delivered</div></div>
          <div><div className="hflut-stat-val">4.{stV ? c3 : 0}/5</div><div className="hflut-stat-label">Client Satisfaction</div></div>
          <div><div className="hflut-stat-val">{stV ? c4 : 0} Days</div><div className="hflut-stat-label">Average Onboarding</div></div>
        </div>
      </section>

      <section className="hflut-sec hflut-sec-alt" ref={prR}>
        <div className="hflut-wrap">
          <h2 className="hflut-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hflut-sec-sub">From brief to first sprint — in under two weeks.</p>
          <div className="hflut-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hflut-step${prV ? ' hflut-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hflut-step-n">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hflut-sec">
        <div className="hflut-wrap">
          <h2 className="hflut-sec-title">Frequently Asked Questions</h2>
          <p className="hflut-sec-sub">Common questions before hiring a Flutter developer from 1Solutions.</p>
          <div className="hflut-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hflut-faq-item">
                <div className="hflut-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hflut-faq-icon${openFaq === i ? ' hflut-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hflut-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hflut-cta">
        <div className="hflut-wrap">
          <h2>Ready to Hire Your Flutter Developer?</h2>
          <p>Share your requirements and receive matched Flutter specialist profiles within 48 hours — no commitment required.</p>
          <Link href="/contact-us" className="hflut-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
