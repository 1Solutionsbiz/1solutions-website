'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#1f3a5f';
const SKILLS = [
  'React.js / Next.js', 'Node.js / Express', 'Python / Django', 'TypeScript',
  'PostgreSQL & MySQL', 'MongoDB & Redis', 'REST APIs & GraphQL', 'AWS / GCP / Azure',
  'Docker & Kubernetes', 'CI/CD Pipelines', 'Microservices Architecture',
  'Authentication (JWT / OAuth)', 'Testing (Jest / Cypress)', 'Git & Code Review',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-stack engineer committed to your product full-time - 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day coverage for ongoing feature work, code reviews, or technical oversight.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible hourly billing for architecture reviews, technical audits, or sprint bursts.', icon: '🕐' },
];
const WHY = [
  { h: 'End-to-End Ownership', b: 'Our full-stack developers own both the frontend UX and backend API - reducing handoff delays and keeping velocity high.' },
  { h: 'Pre-Vetted Engineers', b: 'Every developer passes system design, data structure, and live coding assessments before being placed with a client.' },
  { h: 'Fast Placement', b: 'Profiles delivered within 48 hours. Developer onboarded and committing code within 7 business days.' },
  { h: 'Agile-First Culture', b: '2-week sprints with demos, retrospectives, and visible delivery metrics throughout the engagement.' },
  { h: 'Security & IP Protection', b: 'NDA and IP assignment executed before access to any codebase, designs, or internal systems.' },
  { h: 'Flexible Scaling', b: 'Add frontend or backend specialists alongside your full-stack developer as the product scales.' },
];
const PROCESS = [
  { n: '01', h: 'Share Requirements', b: 'Describe your stack, seniority level, project goals, and timeline.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 matched full-stack developer CVs arrive within 48 hours.' },
  { n: '03', h: 'Interview & Choose', b: 'Run your own technical round. Pick the developer who fits best.' },
  { n: '04', h: 'Onboard & Sprint', b: 'Developer joins your codebase and tools. First sprint starts within a week.' },
];
const FAQS = [
  { q: 'What tech stacks do your full-stack developers specialise in?', a: 'We have developers covering MERN (MongoDB, Express, React, Node), MEAN, LAMP, Django + React, and Next.js + PostgreSQL stacks, among others. Tell us your stack and we will match accordingly.' },
  { q: 'Can a full-stack developer also handle DevOps tasks?', a: 'Many of our full-stack engineers are comfortable with Docker, CI/CD setup, and AWS/GCP deployments. For complex infrastructure work, we recommend pairing with a dedicated DevOps engineer.' },
  { q: 'What seniority levels are available?', a: 'We place Junior (2-3 years), Mid-level (3-6 years), and Senior (6+ years) full-stack developers. For architect-level roles, we also have Technical Leads and Solution Architects.' },
  { q: 'Will the developer follow our coding standards?', a: 'Yes. Before starting, the developer reviews your style guide, existing codebase, and contribution guidelines. We enforce code reviews and linting from day one.' },
  { q: 'Can I replace the developer if the fit is wrong?', a: 'We offer a no-questions-asked replacement within the first 2 weeks if the developer does not meet your technical or communication expectations.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment are signed as standard before any engagement begins.' },
];

export default function HireFullStackDeveloper() {
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
        { '@type': 'ListItem', position: 2, name: 'Hire Full Stack Developer', item: 'https://www.1solutions.biz/hire-full-stack-developer/' },
      ]},
      { '@type': 'ProfessionalService', name: 'Hire Full Stack Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated full-stack developers from 1Solutions - MERN, MEAN, Django, Next.js and more.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '134', bestRating: '5' },
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
        <title>Hire Full Stack Developer | 1Solutions</title>
        <meta name="description" content="Hire dedicated full-stack developers from 1Solutions. MERN, MEAN, Django, and Next.js expertise. Pre-vetted engineers available for immediate engagement." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-full-stack-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hfsd-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hfsd-btn-primary:hover{opacity:.88}
          .hfsd-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hfsd-btn-outline:hover{border-color:#fff}
          .hfsd-sec{padding:70px 20px}
          .hfsd-sec-alt{background:#f5f7fa}
          .hfsd-wrap{max-width:1100px;margin:0 auto}
          .hfsd-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hfsd-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hfsd-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hfsd-skill{background:#fff;border:1.5px solid #c8d4e6;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hfsd-skill.hfsd-in{opacity:1;transform:none}
          .hfsd-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hfsd-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #d0dcea;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hfsd-model.hfsd-in{opacity:1;transform:none}
          .hfsd-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hfsd-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hfsd-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hfsd-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hfsd-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hfsd-why-item.hfsd-in{opacity:1;transform:none}
          .hfsd-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hfsd-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hfsd-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hfsd-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #d0dcea;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hfsd-step.hfsd-in{opacity:1;transform:none}
          .hfsd-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hfsd-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hfsd-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hfsd-faq{max-width:760px;margin:0 auto}
          .hfsd-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hfsd-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hfsd-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hfsd-faq-icon.hfsd-open{transform:rotate(45deg)}
          .hfsd-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hfsd-cta{background:linear-gradient(135deg,${ACCENT},#0e2240);padding:80px 20px;text-align:center;color:#fff}
          .hfsd-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hfsd-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="Hire Full Stack Developer · MERN, MEAN &amp; Django"
        title={<>Hire Full Stack Developers <AuroraText>Who Own the Whole Product</AuroraText></>}
        subtext="Pre-vetted MERN, MEAN, Django, and Next.js engineers who deliver from database schema to pixel-perfect UI. Profiles in 48 hours."
        primaryCta={{ label: 'Hire a Full Stack Developer', href: '/contact-us' }}
        secondaryCta={{ label: 'View Portfolio', href: '/portfolio' }}
        stats={[
          { label: 'Full Stack Developers', value: '100', suffix: '+' },
          { label: 'Projects Delivered', value: '500', suffix: '+' },
          { label: 'Client Satisfaction', value: '48', prefix: '4.', suffix: '/5' },
          { label: 'Average Onboarding', value: '7', suffix: ' Days' },
        ]}
      />

      <section className="hfsd-sec" ref={skR}>
        <div className="hfsd-wrap">
          <h2 className="hfsd-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hfsd-sec-sub">Frontend to cloud infrastructure - our full-stack developers cover everything your product needs to ship.</p>
          <div className="hfsd-skills">
            {SKILLS.map((s, i) => (
              <span key={s} className={`hfsd-skill${skV ? ' hfsd-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="hfsd-sec hfsd-sec-alt" ref={enR}>
        <div className="hfsd-wrap">
          <h2 className="hfsd-sec-title">Flexible Engagement Models</h2>
          <p className="hfsd-sec-sub">Match the engagement to your velocity - scale up or down as your roadmap changes.</p>
          <div className="hfsd-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hfsd-model${enV ? ' hfsd-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hfsd-model-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hfsd-sec" ref={whR}>
        <div className="hfsd-wrap">
          <h2 className="hfsd-sec-title">Why Hire Full Stack Developers from 1Solutions?</h2>
          <p className="hfsd-sec-sub">We place engineers with production track records - not theoretical candidates.</p>
          <div className="hfsd-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hfsd-why-item${whV ? ' hfsd-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hfsd-sec hfsd-sec-alt" ref={prR}>
        <div className="hfsd-wrap">
          <h2 className="hfsd-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hfsd-sec-sub">From brief to first commit - in under two weeks.</p>
          <div className="hfsd-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hfsd-step${prV ? ' hfsd-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hfsd-step-n">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hfsd-sec">
        <div className="hfsd-wrap">
          <h2 className="hfsd-sec-title">Frequently Asked Questions</h2>
          <p className="hfsd-sec-sub">Common questions about hiring a full-stack developer from 1Solutions.</p>
          <div className="hfsd-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hfsd-faq-item">
                <div className="hfsd-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hfsd-faq-icon${openFaq === i ? ' hfsd-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hfsd-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hfsd-cta">
        <div className="hfsd-wrap">
          <h2>Ready to Hire Your Full Stack Developer?</h2>
          <p>Share your requirements and receive matched developer profiles within 48 hours - no commitment required to view CVs.</p>
          <Link href="/contact-us" className="hfsd-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
