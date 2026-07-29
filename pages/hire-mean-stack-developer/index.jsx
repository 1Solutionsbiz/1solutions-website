'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#2c4a1e';
const SKILLS = [
  'MongoDB & Mongoose', 'Express.js', 'Angular 17+', 'Node.js',
  'TypeScript', 'RxJS & NgRx', 'REST APIs & GraphQL', 'Angular Material',
  'JWT & OAuth 2.0', 'Docker & AWS', 'Jasmine & Karma', 'Webpack & ESBuild',
  'CI/CD Pipelines', 'WebSockets', 'Microservices Architecture',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time MEAN stack developer committed to your product - 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for ongoing feature delivery or Angular/Node.js maintenance.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for architecture reviews, performance audits, or burst sprints.', icon: '🕐' },
];
const WHY = [
  { h: 'Full-Stack MEAN Mastery', b: 'Our developers own MongoDB schemas, Express middleware, Angular components, and Node.js services - no hand-off delays.' },
  { h: 'Enterprise Angular Experience', b: 'We build large-scale Angular apps with lazy loading, NgRx state management, and strict TypeScript - not just simple SPAs.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your brief and receive 2-3 pre-screened MEAN stack developer CVs within two business days.' },
  { h: 'Agile Delivery', b: '2-week sprints with working demos, velocity tracking, and clear acceptance criteria every cycle.' },
  { h: 'NDA & IP Security', b: 'Comprehensive NDA and IP assignment signed before any access to your codebase or infrastructure.' },
  { h: 'Elastic Team', b: 'Add backend or frontend specialists alongside your MEAN developer as your product scales.' },
];
const PROCESS = [
  { n: '01', h: 'Share Your Requirements', b: 'Describe the Angular version, Node.js architecture, and project scope.' },
  { n: '02', h: 'Receive Matched Profiles', b: 'Get 2-3 pre-vetted MEAN stack CVs within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Conduct your own technical assessment and pick the right developer.' },
  { n: '04', h: 'Onboard & Sprint', b: 'Developer joins your toolchain and codebase. First sprint starts within 7 days.' },
];
const FAQS = [
  { q: 'What Angular versions do your developers work with?', a: 'Our developers are proficient in Angular 14 through 17+, including the latest signals-based reactivity model, standalone components, and Ivy renderer.' },
  { q: 'Can they work on both the API and Angular frontend?', a: 'Yes. MEAN stack developers own the entire vertical - MongoDB models, Express routes, Node.js services, and Angular views - without splitting tasks across teams.' },
  { q: 'Do your developers use NgRx for state management?', a: 'Yes. Our developers are experienced with NgRx (actions, reducers, effects, selectors) as well as lighter alternatives like Akita or simple RxJS-based service patterns for smaller apps.' },
  { q: 'Can they integrate with third-party APIs and microservices?', a: 'Absolutely. Our MEAN developers regularly integrate with payment gateways, CRMs, ERPs, and third-party REST or GraphQL APIs via Express middleware and Angular HTTP interceptors.' },
  { q: 'What is the minimum engagement period?', a: 'Our standard minimum is 4 weeks. This ensures sufficient time for codebase onboarding, alignment, and meaningful delivery.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireMEANStackDeveloper() {
  const skR  = useRef(null); const [skV,  setSkV]  = useState(false);
  const enR  = useRef(null); const [enV,  setEnV]  = useState(false);
  const whR  = useRef(null); const [whV,  setWhV]  = useState(false);
  const prR  = useRef(null); const [prV,  setPrV]  = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR,  setSkV);  if (skR.current)  o1.observe(skR.current);
    const o2 = obs(enR,  setEnV);  if (enR.current)  o2.observe(enR.current);
    const o3 = obs(whR,  setWhV);  if (whR.current)  o3.observe(whR.current);
    const o4 = obs(prR,  setPrV);  if (prR.current)  o4.observe(prR.current);
    return () => [o1, o2, o3, o4].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire MEAN Stack Developer', item: 'https://www.1solutions.biz/hire-mean-stack-developer/' },
      ]},
      { '@type': 'ProfessionalService', name: 'Hire MEAN Stack Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated MEAN stack developers from 1Solutions - MongoDB, Express, Angular, and Node.js experts.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '68', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire MEAN Stack Developer | 1Solutions</title>
        <meta name="description" content="Hire dedicated MEAN stack developers from 1Solutions. MongoDB, Express, Angular & Node.js experts for enterprise web apps. Pre-vetted talent." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-mean-stack-developer/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hire MEAN Stack Developer | 1Solutions" />
        <meta property="og:description" content="Hire dedicated MEAN stack developers from 1Solutions. MongoDB, Express, Angular & Node.js experts for enterprise web apps. Pre-vetted talent." />
        <meta property="og:url" content="https://www.1solutions.biz/hire-mean-stack-developer/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-hire-mean-stack-developer.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Hire MEAN Stack Developer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-hire-mean-stack-developer.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Hire MEAN Stack Developer" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hmean-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hmean-btn-primary:hover{opacity:.88}
          .hmean-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hmean-btn-outline:hover{border-color:#fff}
          .hmean-sec{padding:70px 20px}
          .hmean-sec-alt{background:#f5f9f3}
          .hmean-wrap{max-width:1100px;margin:0 auto}
          .hmean-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hmean-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hmean-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hmean-skill{background:#fff;border:1.5px solid #c0d8b8;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hmean-skill.hmean-in{opacity:1;transform:none}
          .hmean-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hmean-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #cde0c6;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hmean-model.hmean-in{opacity:1;transform:none}
          .hmean-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hmean-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hmean-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hmean-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hmean-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hmean-why-item.hmean-in{opacity:1;transform:none}
          .hmean-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hmean-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hmean-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hmean-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #cde0c6;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hmean-step.hmean-in{opacity:1;transform:none}
          .hmean-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hmean-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hmean-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hmean-faq{max-width:760px;margin:0 auto}
          .hmean-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hmean-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hmean-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hmean-faq-icon.hmean-open{transform:rotate(45deg)}
          .hmean-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hmean-cta{background:linear-gradient(135deg,${ACCENT},#162810);padding:80px 20px;text-align:center;color:#fff}
          .hmean-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hmean-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="Hire MEAN Stack Developer · MongoDB, Express, Angular, Node.js"
        title={<>Hire MEAN Stack Developers <AuroraText>MongoDB · Express · Angular · Node.js</AuroraText></>}
        subtext="Pre-vetted engineers who own the full MEAN stack - from MongoDB schemas to Angular UI - and ship production-grade apps with TypeScript throughout. Profiles in 48 hours."
        primaryCta={{ label: 'Hire a MEAN Stack Developer', href: '/contact-us/' }}
        secondaryCta={{ label: 'View Portfolio', href: '/portfolio/' }}
        stats={[
          { label: 'MEAN Developers', value: '40', suffix: '+' },
          { label: 'Projects Delivered', value: '160', suffix: '+' },
          { label: 'Client Satisfaction', value: '48', prefix: '4.', suffix: '/5' },
          { label: 'Avg Onboarding', value: '7', suffix: ' Days' },
        ]}
      />

      <section className="hmean-sec" ref={skR}>
        <div className="hmean-wrap">
          <h2 className="hmean-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hmean-sec-sub">Our MEAN developers cover the full stack - NoSQL data modelling, REST/GraphQL APIs, enterprise Angular, and cloud deployment.</p>
          <div className="hmean-skills">
            {SKILLS.map((s, i) => <span key={s} className={`hmean-skill${skV ? ' hmean-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}
          </div>
        </div>
      </section>

      <section className="hmean-sec hmean-sec-alt" ref={enR}>
        <div className="hmean-wrap">
          <h2 className="hmean-sec-title">Flexible Engagement Models</h2>
          <p className="hmean-sec-sub">Full-time, part-time, or hourly - scale the engagement to match your roadmap.</p>
          <div className="hmean-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hmean-model${enV ? ' hmean-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hmean-model-icon">{m.icon}</div>
                <h3>{m.title}</h3><p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmean-sec" ref={whR}>
        <div className="hmean-wrap">
          <h2 className="hmean-sec-title">Why Hire MEAN Stack Developers from 1Solutions?</h2>
          <p className="hmean-sec-sub">We place engineers with real production MEAN apps in their portfolio - not bootcamp graduates.</p>
          <div className="hmean-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hmean-why-item${whV ? ' hmean-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3><p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmean-sec hmean-sec-alt" ref={prR}>
        <div className="hmean-wrap">
          <h2 className="hmean-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hmean-sec-sub">From brief to first sprint - in under two weeks.</p>
          <div className="hmean-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hmean-step${prV ? ' hmean-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hmean-step-n">{p.n}</div>
                <h3>{p.h}</h3><p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmean-sec">
        <div className="hmean-wrap">
          <h2 className="hmean-sec-title">Frequently Asked Questions</h2>
          <p className="hmean-sec-sub">Common questions about hiring a MEAN stack developer from 1Solutions.</p>
          <div className="hmean-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hmean-faq-item">
                <div className="hmean-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hmean-faq-icon${openFaq === i ? ' hmean-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hmean-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmean-cta">
        <div className="hmean-wrap">
          <h2>Ready to Hire Your MEAN Stack Developer?</h2>
          <p>Share your requirements and receive matched developer profiles within 48 hours - no commitment required.</p>
          <Link href="/contact-us/" className="hmean-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
