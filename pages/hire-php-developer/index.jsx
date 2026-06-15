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

const ACCENT = '#3d0070';
const SKILLS = [
  'PHP 8.x', 'Laravel 10/11', 'Symfony 6/7', 'CodeIgniter 4',
  'WordPress & WooCommerce', 'MySQL & PostgreSQL', 'RESTful APIs', 'GraphQL',
  'Redis & Memcached', 'Composer & Packagist', 'PHPUnit & Pest', 'Docker',
  'OOP & SOLID Principles', 'MVC Architecture', 'AWS & cPanel Hosting',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time PHP developer committed to your project — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for ongoing feature development, bug-fixing, or legacy maintenance.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible hourly billing for code audits, security reviews, or burst delivery windows.', icon: '🕐' },
];
const WHY = [
  { h: 'Deep Framework Expertise', b: 'Our PHP developers are specialists in Laravel and Symfony — not just WordPress hobbyists. We build robust, testable, enterprise-grade applications.' },
  { h: 'Legacy PHP Modernisation', b: 'We refactor PHP 5/7 legacy codebases to PHP 8.x with strict typing, enums, fibers, and modern design patterns.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your brief and receive 2-3 matched PHP developer CVs within two business days.' },
  { h: 'Rigorous Code Quality', b: 'All code follows PSR standards with PHPStan/Psalm static analysis, PHPUnit tests, and peer code review built into the workflow.' },
  { h: 'IP & NDA Security', b: 'NDA and IP assignment signed before any access to your codebase, database, or hosting environment.' },
  { h: 'Flexible Engagement', b: 'Scale from a single PHP developer to a full backend team as your project grows, with 2-week notice to adjust.' },
];
const PROCESS = [
  { n: '01', h: 'Share Your Requirements', b: 'Describe the PHP version, framework, database, and project scope.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 matched PHP developer CVs delivered within 48 hours.' },
  { n: '03', h: 'Interview & Choose', b: 'Run your own technical round. Select the developer who fits best.' },
  { n: '04', h: 'Onboard & Build', b: 'Developer joins your codebase and workflow. First sprint starts within 7 days.' },
];
const FAQS = [
  { q: 'Which PHP frameworks do your developers specialise in?', a: 'Our developers are proficient in Laravel, Symfony, and CodeIgniter. Laravel is most requested; we match the framework to your existing codebase or project requirements.' },
  { q: 'Can they work on legacy PHP 5 or PHP 7 codebases?', a: 'Yes. We have developers experienced in maintaining and modernising legacy PHP codebases, including incremental upgrades to PHP 8 with backward compatibility handling.' },
  { q: 'Do your PHP developers also know WordPress?', a: 'Yes. We have dedicated WordPress PHP developers for custom plugin and theme development, as well as WooCommerce customisation. Specify your need and we will match the right profile.' },
  { q: 'Can they build and document REST APIs?', a: 'Absolutely. Our PHP developers build RESTful and GraphQL APIs with OpenAPI/Swagger documentation, versioning, rate limiting, and comprehensive integration test coverage.' },
  { q: 'What is the minimum engagement period?', a: 'Our standard minimum is 4 weeks. Shorter engagements for well-defined deliverables can be arranged on request.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HirePHPDeveloper() {
  const skR  = useRef(null); const [skV,  setSkV]  = useState(false);
  const enR  = useRef(null); const [enV,  setEnV]  = useState(false);
  const whR  = useRef(null); const [whV,  setWhV]  = useState(false);
  const prR  = useRef(null); const [prV,  setPrV]  = useState(false);
  const stGr = useRef(null); const [stV,  setStV]  = useState(false);

  const [c1, s1] = useCountUp(70);
  const [c2, s2] = useCountUp(350);
  const [c3, s3] = useCountUp(48);
  const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR,  setSkV);  if (skR.current)  o1.observe(skR.current);
    const o2 = obs(enR,  setEnV);  if (enR.current)  o2.observe(enR.current);
    const o3 = obs(whR,  setWhV);  if (whR.current)  o3.observe(whR.current);
    const o4 = obs(prR,  setPrV);  if (prR.current)  o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(70); s2(350); s3(48); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire PHP Developer', item: 'https://www.1solutions.biz/hire-php-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire PHP Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated PHP developers from 1Solutions — Laravel, Symfony, and WordPress experts for web applications.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '142', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire PHP Developer | Laravel, Symfony & WordPress Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated PHP developers from 1Solutions. Laravel, Symfony, WordPress, and PHP 8.x experts for web applications and APIs. Pre-vetted talent. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-php-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hphp-hero{background:linear-gradient(135deg,${ACCENT} 0%,#220040 60%,#330060 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hphp-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hphp-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hphp-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hphp-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hphp-btn-primary:hover{opacity:.88}
          .hphp-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hphp-btn-outline:hover{border-color:#fff}
          .hphp-sec{padding:70px 20px}
          .hphp-sec-alt{background:#f8f4fc}
          .hphp-wrap{max-width:1100px;margin:0 auto}
          .hphp-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hphp-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hphp-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hphp-skill{background:#fff;border:1.5px solid #d0b8e8;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hphp-skill.hphp-in{opacity:1;transform:none}
          .hphp-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hphp-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #dac8f0;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hphp-model.hphp-in{opacity:1;transform:none}
          .hphp-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hphp-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hphp-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hphp-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hphp-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hphp-why-item.hphp-in{opacity:1;transform:none}
          .hphp-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hphp-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hphp-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hphp-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #dac8f0;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hphp-step.hphp-in{opacity:1;transform:none}
          .hphp-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hphp-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hphp-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hphp-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hphp-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hphp-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hphp-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hphp-faq{max-width:760px;margin:0 auto}
          .hphp-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hphp-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hphp-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hphp-faq-icon.hphp-open{transform:rotate(45deg)}
          .hphp-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hphp-cta{background:linear-gradient(135deg,${ACCENT},#220040);padding:80px 20px;text-align:center;color:#fff}
          .hphp-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hphp-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hphp-hero{padding:80px 18px 60px}.hphp-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>

      <section className="hphp-hero">
        <h1>Hire PHP Developers<br/>Laravel, Symfony &amp; WordPress Experts</h1>
        <p>Pre-vetted PHP 8.x engineers for web applications, APIs, and CMS platforms. Clean code, tested, and production-ready. Profiles in 48 hours.</p>
        <div className="hphp-hero-btns">
          <Link href="/contact" className="hphp-btn-primary">Hire a PHP Developer →</Link>
          <Link href="/portfolio" className="hphp-btn-outline">View Portfolio</Link>
        </div>
      </section>

      <section className="hphp-sec" ref={skR}>
        <div className="hphp-wrap">
          <h2 className="hphp-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hphp-sec-sub">Our PHP developers cover the full server-side stack — modern frameworks, database design, API architecture, and cloud deployment.</p>
          <div className="hphp-skills">
            {SKILLS.map((s, i) => <span key={s} className={`hphp-skill${skV ? ' hphp-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}
          </div>
        </div>
      </section>

      <section className="hphp-sec hphp-sec-alt" ref={enR}>
        <div className="hphp-wrap">
          <h2 className="hphp-sec-title">Flexible Engagement Models</h2>
          <p className="hphp-sec-sub">Choose the model that matches your project phase and budget.</p>
          <div className="hphp-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hphp-model${enV ? ' hphp-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hphp-model-icon">{m.icon}</div>
                <h3>{m.title}</h3><p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hphp-sec" ref={whR}>
        <div className="hphp-wrap">
          <h2 className="hphp-sec-title">Why Hire PHP Developers from 1Solutions?</h2>
          <p className="hphp-sec-sub">Our PHP engineers build maintainable, testable, and secure applications — not just working code.</p>
          <div className="hphp-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hphp-why-item${whV ? ' hphp-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3><p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hphp-stats" ref={stGr}>
        <div className="hphp-stats-grid">
          <div><div className="hphp-stat-val">{stV ? c1 : 0}+</div><div className="hphp-stat-label">PHP Developers</div></div>
          <div><div className="hphp-stat-val">{stV ? c2 : 0}+</div><div className="hphp-stat-label">PHP Projects Delivered</div></div>
          <div><div className="hphp-stat-val">4.{stV ? c3 : 0}/5</div><div className="hphp-stat-label">Client Satisfaction</div></div>
          <div><div className="hphp-stat-val">{stV ? c4 : 0} Days</div><div className="hphp-stat-label">Avg Onboarding</div></div>
        </div>
      </section>

      <section className="hphp-sec hphp-sec-alt" ref={prR}>
        <div className="hphp-wrap">
          <h2 className="hphp-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hphp-sec-sub">From brief to first deployment — in under two weeks.</p>
          <div className="hphp-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hphp-step${prV ? ' hphp-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hphp-step-n">{p.n}</div>
                <h3>{p.h}</h3><p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hphp-sec">
        <div className="hphp-wrap">
          <h2 className="hphp-sec-title">Frequently Asked Questions</h2>
          <p className="hphp-sec-sub">Common questions before hiring a PHP developer from 1Solutions.</p>
          <div className="hphp-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hphp-faq-item">
                <div className="hphp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hphp-faq-icon${openFaq === i ? ' hphp-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hphp-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hphp-cta">
        <div className="hphp-wrap">
          <h2>Ready to Hire Your PHP Developer?</h2>
          <p>Share your requirements and receive matched PHP specialist profiles within 48 hours — no commitment required.</p>
          <Link href="/contact" className="hphp-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
