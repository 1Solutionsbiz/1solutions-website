'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#215732';
const SKILLS = [
  'Node.js & Express.js', 'NestJS', 'Fastify', 'REST API Development', 'GraphQL API Development',
  'WebSockets & Socket.io', 'Microservices Architecture', 'Event-Driven Architecture',
  'MongoDB & Mongoose', 'PostgreSQL & Prisma', 'Redis (Caching & Queues)',
  'Bull & BullMQ (Job Queues)', 'JWT & OAuth 2.0 Authentication', 'Docker & Kubernetes', 'AWS Lambda & Serverless',
];
const MODELS = [
  { title: 'Dedicated Node.js Team', desc: 'A dedicated backend team (1–3 engineers) committed to your product full-time - architecture, development, and DevOps included.', icon: '👥' },
  { title: 'Node.js Consulting',     desc: 'Architecture review, code audit, performance optimisation, or migration planning - billed hourly or as a fixed-scope engagement.', icon: '🔍' },
  { title: 'Managed Node.js Development', desc: 'Project-based delivery with fixed scope, timeline, and price - from API design to production deployment.', icon: '🚀' },
];
const WHY = [
  { h: 'Non-Blocking Performance',   b: 'We architect Node.js services to fully exploit the event loop - async/await throughout, efficient I/O handling, and zero blocking operations that would stall under load.' },
  { h: 'API-First Development',      b: 'We design APIs before writing a line of implementation code - OpenAPI specs, contract testing, and versioning strategy agreed upfront so your frontends and mobile apps are never blocked.' },
  { h: 'Real-Time Expertise',        b: 'WebSockets, Server-Sent Events, and Socket.io for live dashboards, chat, notifications, and collaborative tools - we\'ve built real-time systems handling 10,000+ concurrent connections.' },
  { h: 'Scalability Built In',       b: 'Horizontal scaling, stateless service design, Redis-backed sessions, and queue-based job processing - so your Node.js services scale from 100 to 10 million requests without a rewrite.' },
  { h: 'Full-Stack Capability',      b: 'Our Node.js engineers pair seamlessly with React and Next.js frontends - same team, same codebase conventions, faster delivery.' },
  { h: 'NDA & IP Security',          b: 'Full NDA and IP assignment signed before any access to your codebase, infrastructure, or business logic.' },
];
const PROCESS = [
  { n: '01', h: 'Architecture Design',          b: 'We design your API contracts, data models, service boundaries, and infrastructure before writing any code - preventing expensive rework later.' },
  { n: '02', h: 'Iterative Development',        b: 'Two-week sprints with working software at the end of each. APIs are documented in Swagger as they\'re built.' },
  { n: '03', h: 'Performance & Security Testing', b: 'Load testing with k6, security scanning with Snyk, and OWASP Top 10 review before any production deployment.' },
  { n: '04', h: 'Deploy & Monitor',             b: 'CI/CD pipeline, Docker containerisation, and monitoring with Datadog or CloudWatch - with on-call support for the first 30 days post-launch.' },
];
const FAQS = [
  { q: 'What types of Node.js applications do you build?', a: 'REST and GraphQL APIs, real-time applications (chat, notifications, live dashboards), microservices, BFF (Backend for Frontend) layers, serverless functions (AWS Lambda, Vercel Edge), CLI tools, and full-stack applications with Next.js or React frontends.' },
  { q: 'How does Node.js compare to other backend technologies?', a: 'Node.js excels at I/O-bound workloads - APIs, real-time data, and high-concurrency applications. Its non-blocking event loop handles thousands of simultaneous connections efficiently. For CPU-intensive tasks (image processing, ML inference), we use worker threads or offload to dedicated services.' },
  { q: 'Can you migrate our existing backend to Node.js?', a: 'Yes. We migrate from PHP (Laravel, WordPress), Python (Django, Flask), Ruby on Rails, and Java Spring to Node.js - with feature parity testing, incremental migration using the strangler fig pattern, and zero-downtime cutovers.' },
  { q: 'Which databases do you work with?', a: 'MongoDB (with Mongoose), PostgreSQL and MySQL (with Prisma or TypeORM), Redis for caching and pub/sub, Elasticsearch for full-text search, and DynamoDB for serverless architectures.' },
  { q: 'Do you provide ongoing Node.js maintenance?', a: 'Yes. We offer maintenance retainers covering security updates, dependency upgrades, performance monitoring, bug fixes, and a set of development hours per month for feature improvements.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment signed as standard before any access to your codebase or infrastructure.' },
];

export default function NodeJsDevelopmentServices() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    return () => [o1, o2, o3, o4].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Node.js Development Services', item: 'https://www.1solutions.biz/nodejs-development-services/' },
      ]},
      { '@type': 'ProfessionalService', name: 'Node.js Development Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Expert Node.js development from 1Solutions - REST APIs, GraphQL, real-time apps, and microservices for startups and enterprises.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '114', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Node.js Development Services | 1Solutions</title>
        <meta name="description" content="Expert Node.js development services from 1Solutions. We build scalable REST APIs, real-time applications, microservices, and full-stack Node." />
        <link rel="canonical" href="https://www.1solutions.biz/nodejs-development-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .njs-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .njs-btn-primary:hover{opacity:.88}
          .njs-sec{padding:70px 20px}.njs-sec-alt{background:#f0fdf4}
          .njs-wrap{max-width:1100px;margin:0 auto}
          .njs-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .njs-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .njs-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .njs-skill{background:#fff;border:1.5px solid #86efac;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .njs-skill.njs-in{opacity:1;transform:none}
          .njs-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .njs-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #86efac;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .njs-model.njs-in{opacity:1;transform:none}
          .njs-model-icon{font-size:2.2rem;margin-bottom:14px}
          .njs-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .njs-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .njs-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .njs-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .njs-why-item.njs-in{opacity:1;transform:none}
          .njs-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .njs-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .njs-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .njs-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #86efac;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .njs-step.njs-in{opacity:1;transform:none}
          .njs-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .njs-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .njs-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .njs-faq{max-width:760px;margin:0 auto}
          .njs-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .njs-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .njs-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .njs-faq-icon.njs-open{transform:rotate(45deg)}
          .njs-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .njs-cta{background:linear-gradient(135deg,${ACCENT},#0d2b1a);padding:80px 20px;text-align:center;color:#fff}
          .njs-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .njs-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
        `}</style>
      </Head>
      <ServiceHero
        eyebrow="Node.js Development Services"
        title={<>Node.js Development - <AuroraText>Scalable APIs, Real-Time Apps & Microservices</AuroraText></>}
        subtext="We build high-performance Node.js backends, REST and GraphQL APIs, real-time applications, and microservices architectures - deployed on AWS, GCP, or Azure. 15+ years of server-side expertise trusted by startups and enterprises across the US, Canada, and Australia."
        primaryCta={{ label: 'Get a Free Node.js Consultation', href: '/contact-us' }}
        secondaryCta={{ label: 'View Portfolio', href: '/portfolio' }}
        stats={[
          { label: 'Node.js APIs Built', value: '80', suffix: '+' },
          { label: 'Microservices Deployed', value: '500', suffix: '+' },
          { label: 'Client Satisfaction', value: '9', prefix: '4.', suffix: '/5' },
          { label: 'Years Experience', value: '15', suffix: '+' },
        ]}
      />
      <section className="njs-sec" ref={skR}>
        <div className="njs-wrap">
          <h2 className="njs-sec-title">Skills &amp; Tech Stack</h2>
          <p className="njs-sec-sub">Our Node.js developers cover the full backend ecosystem - from REST APIs to real-time systems and serverless deployments.</p>
          <div className="njs-skills">{SKILLS.map((s, i) => <span key={s} className={`njs-skill${skV ? ' njs-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="njs-sec njs-sec-alt" ref={enR}>
        <div className="njs-wrap">
          <h2 className="njs-sec-title">Flexible Engagement Models</h2>
          <p className="njs-sec-sub">Choose the model that fits your project stage and budget.</p>
          <div className="njs-models">{MODELS.map((m, i) => <div key={m.title} className={`njs-model${enV ? ' njs-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="njs-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="njs-sec" ref={whR}>
        <div className="njs-wrap">
          <h2 className="njs-sec-title">Why Choose 1Solutions for Node.js Development?</h2>
          <p className="njs-sec-sub">We build backends that scale, not just backends that work in a demo.</p>
          <div className="njs-why-grid">{WHY.map((w, i) => <div key={w.h} className={`njs-why-item${whV ? ' njs-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="njs-sec njs-sec-alt" ref={prR}>
        <div className="njs-wrap">
          <h2 className="njs-sec-title">Our Development Process</h2>
          <p className="njs-sec-sub">From architecture to production - a process that eliminates surprises.</p>
          <div className="njs-process">{PROCESS.map((p, i) => <div key={p.n} className={`njs-step${prV ? ' njs-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="njs-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="njs-sec">
        <div className="njs-wrap">
          <h2 className="njs-sec-title">Frequently Asked Questions</h2>
          <p className="njs-sec-sub">Common questions about our Node.js development services.</p>
          <div className="njs-faq">{FAQS.map((f, i) => <div key={i} className="njs-faq-item"><div className="njs-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`njs-faq-icon${openFaq === i ? ' njs-open' : ''}`}>+</span></div>{openFaq === i && <p className="njs-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="njs-cta">
        <div className="njs-wrap">
          <h2>Ready to Build a High-Performance Node.js Backend?</h2>
          <p>Share your API requirements and we'll deliver an architecture proposal and fixed-price quote within 48 hours.</p>
          <Link href="/contact-us" className="njs-btn-primary">Get a Free Node.js Consultation →</Link>
        </div>
      </section>
    </>
  );
}
