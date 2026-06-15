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

const ACCENT = '#002b5c';
const SKILLS = [
  'Drupal 9 & 10', 'PHP 8.x', 'Twig Templating', 'Custom Module Development',
  'Views & Paragraphs', 'REST & JSON:API', 'Drupal Commerce', 'Solr Search Integration',
  'Migrate API', 'Drupal Multisite', 'Performance & Caching', 'Acquia & Pantheon',
  'PHPUnit Testing', 'Composer & Drush', 'Headless / Decoupled Drupal',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A Drupal specialist committed to your project full-time — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: '4 hrs/day engagement — ideal for ongoing module development or site maintenance.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible hourly billing — perfect for audits, migrations, or one-off deliverables.', icon: '🕐' },
];
const WHY = [
  { h: 'Deep Drupal Expertise', b: 'Our developers have built enterprise Drupal platforms for government, media, and healthcare organisations — not just simple blogs.' },
  { h: 'Pre-Vetted Specialists', b: 'Every Drupal developer is assessed on module architecture, theming best practices, and performance optimisation before joining.' },
  { h: 'Fast Engagement Start', b: 'Receive matched profiles within 48 hours. First code committed within 7 business days of signing.' },
  { h: 'Clear Communication', b: 'Daily standups, shared task boards, and weekly progress reports — always know what is happening.' },
  { h: 'IP & NDA Protection', b: 'Contracts include comprehensive NDA and IP assignment. Your custom modules and site configs remain yours.' },
  { h: 'Flexible Scaling', b: 'Ramp up during large builds and scale back during quiet phases with 2-week notice.' },
];
const PROCESS = [
  { n: '01', h: 'Brief Your Requirements', b: 'Describe the Drupal version, modules needed, and project timeline.' },
  { n: '02', h: 'Receive Profiles', b: 'Get 2-3 matched Drupal specialist CVs within 48 hours.' },
  { n: '03', h: 'Interview & Decide', b: 'Run a technical interview and choose your developer.' },
  { n: '04', h: 'Onboard & Ship', b: 'Developer joins your project environment. First sprint kicks off within a week.' },
];
const FAQS = [
  { q: 'Do your developers work with Drupal 9 and Drupal 10?', a: 'Yes. Our developers are proficient in both Drupal 9 and Drupal 10, including the transition from Drupal 7 and 8 via the Migrate API.' },
  { q: 'Can they build headless or decoupled Drupal sites?', a: 'Absolutely. We have developers experienced in using Drupal as a headless CMS with React or Next.js frontends consuming the JSON:API.' },
  { q: 'What hosting platforms are your developers familiar with?', a: 'Our developers are experienced with Acquia, Pantheon, Platform.sh, as well as self-managed Linux/LEMP stacks on AWS and GCP.' },
  { q: 'Can you help migrate our legacy Drupal 7 site?', a: 'Yes. We specialise in Drupal 7 to Drupal 10 migrations using the Migrate API, including content, users, and custom module rewrites.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are standard and signed before any work begins.' },
  { q: 'What is the minimum engagement length?', a: 'Our standard minimum is 4 weeks. For smaller deliverables, hourly billing on shorter timelines can be arranged.' },
];

export default function HireDrupalDeveloper() {
  const skR  = useRef(null); const [skV,  setSkV]  = useState(false);
  const enR  = useRef(null); const [enV,  setEnV]  = useState(false);
  const whR  = useRef(null); const [whV,  setWhV]  = useState(false);
  const prR  = useRef(null); const [prV,  setPrV]  = useState(false);
  const stGr = useRef(null); const [stV,  setStV]  = useState(false);

  const [c1, s1] = useCountUp(30);
  const [c2, s2] = useCountUp(120);
  const [c3, s3] = useCountUp(49);
  const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR,  setSkV);  if (skR.current)  o1.observe(skR.current);
    const o2 = obs(enR,  setEnV);  if (enR.current)  o2.observe(enR.current);
    const o3 = obs(whR,  setWhV);  if (whR.current)  o3.observe(whR.current);
    const o4 = obs(prR,  setPrV);  if (prR.current)  o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(30); s2(120); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Drupal Developer', item: 'https://www.1solutions.biz/hire-drupal-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire Drupal Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire pre-vetted Drupal 9 & 10 developers from 1Solutions for dedicated, part-time, or hourly engagements.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '64', bestRating: '5' },
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
        <title>Hire Drupal Developer | Drupal 9 & 10 Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated Drupal developers from 1Solutions. Drupal 9 & 10 module development, migrations, headless CMS, and enterprise builds. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-drupal-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hdd-hero{background:linear-gradient(135deg,${ACCENT} 0%,#00173a 60%,#002248 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hdd-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hdd-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hdd-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hdd-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hdd-btn-primary:hover{opacity:.88}
          .hdd-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hdd-btn-outline:hover{border-color:#fff}
          .hdd-sec{padding:70px 20px}
          .hdd-sec-alt{background:#f5f8fc}
          .hdd-wrap{max-width:1100px;margin:0 auto}
          .hdd-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hdd-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hdd-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hdd-skill{background:#fff;border:1.5px solid #ccd8e8;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hdd-skill.hdd-in{opacity:1;transform:none}
          .hdd-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hdd-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #d8e4f0;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hdd-model.hdd-in{opacity:1;transform:none}
          .hdd-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hdd-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hdd-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hdd-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hdd-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hdd-why-item.hdd-in{opacity:1;transform:none}
          .hdd-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hdd-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hdd-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hdd-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #d8e4f0;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hdd-step.hdd-in{opacity:1;transform:none}
          .hdd-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hdd-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hdd-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hdd-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hdd-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hdd-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hdd-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hdd-faq{max-width:760px;margin:0 auto}
          .hdd-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hdd-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hdd-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hdd-faq-icon.hdd-open{transform:rotate(45deg)}
          .hdd-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hdd-cta{background:linear-gradient(135deg,${ACCENT},#00173a);padding:80px 20px;text-align:center;color:#fff}
          .hdd-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hdd-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hdd-hero{padding:80px 18px 60px}.hdd-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>

      <section className="hdd-hero">
        <h1>Hire Drupal Developers<br/>for Enterprise CMS Builds</h1>
        <p>Pre-vetted Drupal 9 &amp; 10 specialists for module development, migrations, headless builds, and enterprise platform work. Profiles in 48 hours.</p>
        <div className="hdd-hero-btns">
          <Link href="/contact" className="hdd-btn-primary">Hire a Drupal Developer →</Link>
          <Link href="/portfolio" className="hdd-btn-outline">View Portfolio</Link>
        </div>
      </section>

      <section className="hdd-sec" ref={skR}>
        <div className="hdd-wrap">
          <h2 className="hdd-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hdd-sec-sub">Our Drupal developers cover the full platform — from custom module architecture to performance tuning and cloud hosting.</p>
          <div className="hdd-skills">
            {SKILLS.map((s, i) => (
              <span key={s} className={`hdd-skill${skV ? ' hdd-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="hdd-sec hdd-sec-alt" ref={enR}>
        <div className="hdd-wrap">
          <h2 className="hdd-sec-title">Flexible Engagement Models</h2>
          <p className="hdd-sec-sub">Choose full-time, part-time, or hourly — scale as your project evolves.</p>
          <div className="hdd-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hdd-model${enV ? ' hdd-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hdd-model-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hdd-sec" ref={whR}>
        <div className="hdd-wrap">
          <h2 className="hdd-sec-title">Why Hire Drupal Developers from 1Solutions?</h2>
          <p className="hdd-sec-sub">Our Drupal talent has built platforms used by millions — governments, global media brands, and enterprise SaaS.</p>
          <div className="hdd-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hdd-why-item${whV ? ' hdd-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hdd-stats" ref={stGr}>
        <div className="hdd-stats-grid">
          <div><div className="hdd-stat-val">{stV ? c1 : 0}+</div><div className="hdd-stat-label">Drupal Developers</div></div>
          <div><div className="hdd-stat-val">{stV ? c2 : 0}+</div><div className="hdd-stat-label">Drupal Sites Delivered</div></div>
          <div><div className="hdd-stat-val">4.{stV ? c3 : 0}/5</div><div className="hdd-stat-label">Client Satisfaction</div></div>
          <div><div className="hdd-stat-val">{stV ? c4 : 0} Days</div><div className="hdd-stat-label">Average Onboarding</div></div>
        </div>
      </section>

      <section className="hdd-sec hdd-sec-alt" ref={prR}>
        <div className="hdd-wrap">
          <h2 className="hdd-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hdd-sec-sub">From brief to first commit — in under two weeks.</p>
          <div className="hdd-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hdd-step${prV ? ' hdd-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hdd-step-n">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hdd-sec">
        <div className="hdd-wrap">
          <h2 className="hdd-sec-title">Frequently Asked Questions</h2>
          <p className="hdd-sec-sub">Everything you need to know before hiring a Drupal developer.</p>
          <div className="hdd-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hdd-faq-item">
                <div className="hdd-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hdd-faq-icon${openFaq === i ? ' hdd-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hdd-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hdd-cta">
        <div className="hdd-wrap">
          <h2>Ready to Hire Your Drupal Developer?</h2>
          <p>Share your requirements and we will match you with a pre-screened Drupal specialist within 48 hours.</p>
          <Link href="/contact" className="hdd-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
