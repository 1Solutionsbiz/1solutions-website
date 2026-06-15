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

const ACCENT = '#3a2000';
const SKILLS = [
  'HTML5, CSS3 & JavaScript (ES2024)', 'React.js & Next.js', 'Node.js & Express', 'PHP & Laravel',
  'Python (Django / FastAPI)', 'REST API & GraphQL Development', 'MySQL, PostgreSQL & MongoDB',
  'TypeScript', 'AWS, GCP & Azure Deployment', 'Docker & CI/CD Pipelines', 'WordPress & CMS Development',
  'Performance & Core Web Vitals', 'Security Best Practices (OWASP)', 'Testing (Jest, Cypress, PHPUnit)',
  'Git & Agile / Scrum Workflows',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time web developer committed to your project — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for feature development, bug fixing, or ongoing CMS work.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for code reviews, security audits, or short integration tasks.', icon: '🕐' },
];
const WHY = [
  { h: 'Full-Stack Coverage', b: 'Frontend, backend, database, and cloud deployment — our web developers handle the full stack so you are not managing multiple specialists for a single feature.' },
  { h: 'Framework Fluency', b: 'React, Next.js, Laravel, Django, Node.js — our developers are proficient in the frameworks that match your existing tech stack.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your requirements and receive 2-3 matched web developer CVs within two business days.' },
  { h: 'Scalable Architecture', b: 'We build with scale in mind from day one — modular APIs, indexed databases, CDN-ready assets, and infrastructure as code.' },
  { h: 'Security & Code Quality', b: 'OWASP Top 10 awareness, SQL injection prevention, secure session handling, and mandatory code reviews before every merge.' },
  { h: 'NDA & IP Protection', b: 'NDA and IP assignment signed before any access to your codebase, API keys, or deployment infrastructure.' },
];
const PROCESS = [
  { n: '01', h: 'Share Your Project Brief', b: 'Describe the tech stack, the scope of work, timeline, and the level of seniority you need.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 matched web developer CVs with GitHub links or portfolio projects delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Run your own technical round — architecture discussion, live coding, or code review challenge.' },
  { n: '04', h: 'Onboard & Build', b: 'Developer joins your repo and tools. First sprint starts within 7 days.' },
];
const FAQS = [
  { q: 'Do your web developers work on both frontend and backend?', a: 'Yes. Many of our web developers are full-stack generalists comfortable across the entire web layer — HTML/CSS/JS on the frontend and Node.js, PHP, or Python on the backend. We also place frontend specialists and backend specialists when that is a better fit.' },
  { q: 'Which frameworks do they work with?', a: 'Our developers cover the major web frameworks: React.js, Next.js, Vue.js, and Angular on the frontend; Laravel, Django, Node.js (Express/Fastify), and Ruby on Rails on the backend. We match based on your existing stack.' },
  { q: 'Can they handle database design and optimisation?', a: 'Yes. Our developers design normalised schemas, write optimised queries, set up indexes, and implement caching layers (Redis, Memcached) for high-traffic applications.' },
  { q: 'Do they have experience with cloud deployment?', a: 'Yes. Our web developers deploy to AWS (EC2, Lambda, RDS, S3), Google Cloud, and Azure. They are comfortable with Docker, CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI), and infrastructure tooling like Terraform.' },
  { q: 'Can they work on an existing codebase?', a: 'Yes. We regularly place developers into established codebases — reading and understanding existing architecture, adding features, refactoring for performance, and fixing security issues without breaking existing functionality.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireWebDeveloper() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(120); const [c2, s2] = useCountUp(550);
  const [c3, s3] = useCountUp(49); const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(120); s2(550); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Web Developer', item: 'https://www.1solutions.biz/hire-web-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire Web Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated web developers from 1Solutions — full-stack specialists in React, Node.js, PHP, Python, and cloud deployment.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '168', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire Web Developer | Full-Stack React, Node.js & PHP Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated web developers from 1Solutions. Full-stack specialists in React, Next.js, Node.js, PHP/Laravel, Python, and cloud deployment. Pre-vetted profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-web-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hwdev-hero{background:linear-gradient(135deg,${ACCENT} 0%,#1e1000 60%,#2a1800 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hwdev-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hwdev-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hwdev-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hwdev-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hwdev-btn-primary:hover{opacity:.88}
          .hwdev-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hwdev-btn-outline:hover{border-color:#fff}
          .hwdev-sec{padding:70px 20px}.hwdev-sec-alt{background:#f8f4ee}
          .hwdev-wrap{max-width:1100px;margin:0 auto}
          .hwdev-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hwdev-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hwdev-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hwdev-skill{background:#fff;border:1.5px solid #c8a870;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hwdev-skill.hwdev-in{opacity:1;transform:none}
          .hwdev-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hwdev-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #c8a870;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hwdev-model.hwdev-in{opacity:1;transform:none}
          .hwdev-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hwdev-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hwdev-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hwdev-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hwdev-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hwdev-why-item.hwdev-in{opacity:1;transform:none}
          .hwdev-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hwdev-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hwdev-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hwdev-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #c8a870;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hwdev-step.hwdev-in{opacity:1;transform:none}
          .hwdev-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hwdev-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hwdev-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hwdev-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hwdev-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hwdev-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hwdev-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hwdev-faq{max-width:760px;margin:0 auto}
          .hwdev-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hwdev-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hwdev-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hwdev-faq-icon.hwdev-open{transform:rotate(45deg)}
          .hwdev-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hwdev-cta{background:linear-gradient(135deg,${ACCENT},#1e1000);padding:80px 20px;text-align:center;color:#fff}
          .hwdev-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hwdev-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hwdev-hero{padding:80px 18px 60px}.hwdev-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="hwdev-hero">
        <h1>Hire Web Developers<br/>Full-Stack React, Node.js &amp; PHP Experts</h1>
        <p>Pre-vetted web developers who build scalable, secure, and high-performance web applications — from solo developers to full squads. Profiles in 48 hours.</p>
        <div className="hwdev-hero-btns">
          <Link href="/contact" className="hwdev-btn-primary">Hire a Web Developer →</Link>
          <Link href="/portfolio" className="hwdev-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="hwdev-sec" ref={skR}>
        <div className="hwdev-wrap">
          <h2 className="hwdev-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hwdev-sec-sub">Our web developers cover the full stack — frontend, backend, database, cloud, and everything in between.</p>
          <div className="hwdev-skills">{SKILLS.map((s, i) => <span key={s} className={`hwdev-skill${skV ? ' hwdev-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hwdev-sec hwdev-sec-alt" ref={enR}>
        <div className="hwdev-wrap">
          <h2 className="hwdev-sec-title">Flexible Engagement Models</h2>
          <p className="hwdev-sec-sub">Scale your web development capacity up or down based on project demand.</p>
          <div className="hwdev-models">{MODELS.map((m, i) => <div key={m.title} className={`hwdev-model${enV ? ' hwdev-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hwdev-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hwdev-sec" ref={whR}>
        <div className="hwdev-wrap">
          <h2 className="hwdev-sec-title">Why Hire Web Developers from 1Solutions?</h2>
          <p className="hwdev-sec-sub">We place engineers who write production-grade web applications — not portfolios.</p>
          <div className="hwdev-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hwdev-why-item${whV ? ' hwdev-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hwdev-stats" ref={stGr}>
        <div className="hwdev-stats-grid">
          <div><div className="hwdev-stat-val">{stV ? c1 : 0}+</div><div className="hwdev-stat-label">Web Developers</div></div>
          <div><div className="hwdev-stat-val">{stV ? c2 : 0}+</div><div className="hwdev-stat-label">Web Projects Delivered</div></div>
          <div><div className="hwdev-stat-val">4.{stV ? c3 : 0}/5</div><div className="hwdev-stat-label">Client Satisfaction</div></div>
          <div><div className="hwdev-stat-val">{stV ? c4 : 0} Days</div><div className="hwdev-stat-label">Avg Onboarding</div></div>
        </div>
      </section>
      <section className="hwdev-sec hwdev-sec-alt" ref={prR}>
        <div className="hwdev-wrap">
          <h2 className="hwdev-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hwdev-sec-sub">From project brief to first merged PR — in under two weeks.</p>
          <div className="hwdev-process">{PROCESS.map((p, i) => <div key={p.n} className={`hwdev-step${prV ? ' hwdev-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hwdev-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hwdev-sec">
        <div className="hwdev-wrap">
          <h2 className="hwdev-sec-title">Frequently Asked Questions</h2>
          <p className="hwdev-sec-sub">Common questions before hiring a web developer from 1Solutions.</p>
          <div className="hwdev-faq">{FAQS.map((f, i) => <div key={i} className="hwdev-faq-item"><div className="hwdev-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hwdev-faq-icon${openFaq === i ? ' hwdev-open' : ''}`}>+</span></div>{openFaq === i && <p className="hwdev-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hwdev-cta">
        <div className="hwdev-wrap">
          <h2>Ready to Hire Your Web Developer?</h2>
          <p>Share your project requirements and receive matched web developer profiles within 48 hours — no commitment required.</p>
          <Link href="/contact" className="hwdev-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
