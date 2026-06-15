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

const ACCENT = '#1b4d3e';
const SKILLS = [
  'Kotlin', 'Java', 'Jetpack Compose', 'MVVM / MVI', 'Room Database',
  'Retrofit & OkHttp', 'Firebase', 'Material Design 3', 'Coroutines & Flow',
  'Android Jetpack', 'Hilt / Dagger', 'Google Maps SDK',
  'In-App Purchases', 'Push Notifications', 'CI/CD (Fastlane)',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'Full-time Android developer working exclusively on your project — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Flexible 4 hrs/day engagement, ideal for ongoing feature additions or maintenance.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Pay only for hours logged — perfect for audits, bug-fixes, or short deliverables.', icon: '🕐' },
];
const WHY = [
  { h: 'Pre-Vetted Developers', b: 'Every candidate passes a 3-stage technical screen covering Kotlin, architecture patterns, and live coding.' },
  { h: 'Fast Onboarding', b: 'Developers are ready to commit code within 7 business days of engagement confirmation.' },
  { h: 'Transparent Communication', b: 'Daily standups, Slack integration, and weekly delivery reports keep you fully in the loop.' },
  { h: 'IP & NDA Protection', b: 'Strict NDA and IP assignment agreements signed before work begins — your codebase stays yours.' },
  { h: 'Agile Delivery', b: '2-week sprints with demos, retrospectives, and clear velocity metrics throughout the project.' },
  { h: 'Zero Lock-in', b: 'Month-to-month contracts. Scale the team up, down, or disengage with 30-day notice.' },
];
const PROCESS = [
  { n: '01', h: 'Share Requirements', b: 'Tell us the seniority level, tech stack, and timeline. Takes under 10 minutes.' },
  { n: '02', h: 'Review Matched Profiles', b: 'Receive 2-3 pre-screened developer profiles within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Conduct your own technical interview. Choose who joins your team.' },
  { n: '04', h: 'Onboard & Sprint', b: 'Developer joins your tools and workflows. First sprint kicks off within a week.' },
];
const FAQS = [
  { q: 'Do your Android developers work in Kotlin or Java?', a: 'Our developers are proficient in both, but default to Kotlin for all greenfield work as it is the current Android standard. Legacy Java codebases are also fully supported.' },
  { q: 'Can the hired developer work in my time zone?', a: 'Yes. We have developers across IST, GMT, and EST-compatible shifts. We will match you with someone who overlaps your core hours by at least 4 hours.' },
  { q: 'How do I monitor progress?', a: 'You will receive access to the same project management tools (Jira, Linear, or your preferred tool), daily standups, and a weekly summary report.' },
  { q: 'Can I hire an Android developer for just a few weeks?', a: 'Our minimum engagement is 4 weeks. Shorter durations are considered on a case-by-case basis for specific deliverables.' },
  { q: 'What if the developer is not a good fit?', a: 'We offer a no-questions-asked replacement within the first 2 weeks if the developer does not meet your expectations.' },
  { q: 'Do you sign NDAs?', a: 'Absolutely. NDA and IP assignment agreements are standard in every engagement and are signed before any work commences.' },
];

export default function HireAndroidDeveloper() {
  const skR  = useRef(null); const [skV,  setSkV]  = useState(false);
  const enR  = useRef(null); const [enV,  setEnV]  = useState(false);
  const whR  = useRef(null); const [whV,  setWhV]  = useState(false);
  const prR  = useRef(null); const [prV,  setPrV]  = useState(false);
  const stGr = useRef(null); const [stV,  setStV]  = useState(false);

  const [c1, s1] = useCountUp(50);
  const [c2, s2] = useCountUp(200);
  const [c3, s3] = useCountUp(49);
  const [c4, s4] = useCountUp(7);

  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR,  setSkV);  if (skR.current)  o1.observe(skR.current);
    const o2 = obs(enR,  setEnV);  if (enR.current)  o2.observe(enR.current);
    const o3 = obs(whR,  setWhV);  if (whR.current)  o3.observe(whR.current);
    const o4 = obs(prR,  setPrV);  if (prR.current)  o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(50); s2(200); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Android Developer', item: 'https://www.1solutions.biz/hire-android-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire Android Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire pre-vetted Android developers from 1Solutions for dedicated, part-time, or hourly engagements.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87', bestRating: '5' },
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
        <title>Hire Android Developer | Kotlin & Java Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated Android developers from 1Solutions. Pre-vetted Kotlin & Java experts, flexible engagement models, 7-day onboarding. Get matched in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-android-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .had-hero{background:linear-gradient(135deg,${ACCENT} 0%,#0d2b22 60%,#1a3d30 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .had-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .had-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .had-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .had-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .had-btn-primary:hover{opacity:.88}
          .had-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .had-btn-outline:hover{border-color:#fff}
          .had-sec{padding:70px 20px}
          .had-sec-alt{background:#f8faf9}
          .had-wrap{max-width:1100px;margin:0 auto}
          .had-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .had-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .had-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .had-skill{background:#fff;border:1.5px solid #d4e6df;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .had-skill.had-in{opacity:1;transform:none}
          .had-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .had-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #e0ede9;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .had-model.had-in{opacity:1;transform:none}
          .had-model-icon{font-size:2.2rem;margin-bottom:14px}
          .had-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .had-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .had-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .had-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .had-why-item.had-in{opacity:1;transform:none}
          .had-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .had-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .had-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .had-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #e0ede9;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .had-step.had-in{opacity:1;transform:none}
          .had-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .had-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .had-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .had-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .had-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .had-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .had-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .had-faq{max-width:760px;margin:0 auto}
          .had-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .had-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .had-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .had-faq-icon.had-open{transform:rotate(45deg)}
          .had-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .had-cta{background:linear-gradient(135deg,${ACCENT},#0d2b22);padding:80px 20px;text-align:center;color:#fff}
          .had-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .had-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.had-hero{padding:80px 18px 60px}.had-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>

      {/* Hero */}
      <section className="had-hero">
        <h1>Hire Android Developers<br/>Built for Your Product</h1>
        <p>Pre-vetted Kotlin &amp; Java experts available for dedicated, part-time, or hourly engagements. Matched within 48 hours — onboarded in 7 days.</p>
        <div className="had-hero-btns">
          <Link href="/contact" className="had-btn-primary">Hire an Android Developer →</Link>
          <Link href="/portfolio" className="had-btn-outline">View Portfolio</Link>
        </div>
      </section>

      {/* Skills */}
      <section className="had-sec" ref={skR}>
        <div className="had-wrap">
          <h2 className="had-sec-title">Skills &amp; Tech Stack</h2>
          <p className="had-sec-sub">Our Android developers are proficient across the full native stack — from architecture patterns to deployment pipelines.</p>
          <div className="had-skills">
            {SKILLS.map((s, i) => (
              <span key={s} className={`had-skill${skV ? ' had-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="had-sec had-sec-alt" ref={enR}>
        <div className="had-wrap">
          <h2 className="had-sec-title">Flexible Engagement Models</h2>
          <p className="had-sec-sub">Choose the model that fits your budget and timeline — switch or scale anytime.</p>
          <div className="had-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`had-model${enV ? ' had-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="had-model-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="had-sec" ref={whR}>
        <div className="had-wrap">
          <h2 className="had-sec-title">Why Hire Android Developers from 1Solutions?</h2>
          <p className="had-sec-sub">We go beyond CVs — every developer is screened for code quality, communication, and delivery discipline.</p>
          <div className="had-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`had-why-item${whV ? ' had-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="had-stats" ref={stGr}>
        <div className="had-stats-grid">
          <div><div className="had-stat-val">{stV ? c1 : 0}+</div><div className="had-stat-label">Android Developers</div></div>
          <div><div className="had-stat-val">{stV ? c2 : 0}+</div><div className="had-stat-label">Android Apps Delivered</div></div>
          <div><div className="had-stat-val">4.{stV ? c3 : 0}/5</div><div className="had-stat-label">Client Satisfaction</div></div>
          <div><div className="had-stat-val">{stV ? c4 : 0} Days</div><div className="had-stat-label">Average Onboarding</div></div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="had-sec had-sec-alt" ref={prR}>
        <div className="had-wrap">
          <h2 className="had-sec-title">How to Hire in 4 Simple Steps</h2>
          <p className="had-sec-sub">From requirement brief to first commit — in under two weeks.</p>
          <div className="had-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`had-step${prV ? ' had-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="had-step-n">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="had-sec">
        <div className="had-wrap">
          <h2 className="had-sec-title">Frequently Asked Questions</h2>
          <p className="had-sec-sub">Everything you need to know before hiring an Android developer.</p>
          <div className="had-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="had-faq-item">
                <div className="had-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`had-faq-icon${openFaq === i ? ' had-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="had-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="had-cta">
        <div className="had-wrap">
          <h2>Ready to Hire Your Android Developer?</h2>
          <p>Share your requirements and we will match you with the right developer within 48 hours — no commitment required.</p>
          <Link href="/contact" className="had-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
