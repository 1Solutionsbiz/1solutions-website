'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#004466';
const SKILLS = [
  'Python 3.x', 'Django & DRF', 'Flask', 'FastAPI',
  'SQLAlchemy & Alembic', 'PostgreSQL & MySQL', 'MongoDB & Redis',
  'Celery & Task Queues', 'REST APIs & GraphQL', 'Docker & AWS',
  'Pandas & NumPy', 'Scrapy & BeautifulSoup', 'pytest & unittest',
  'WebSockets (ASGI)', 'CI/CD Pipelines',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time Python developer committed to your project - 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for API development, data pipelines, or ongoing feature delivery.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for code reviews, architecture planning, or data engineering tasks.', icon: '🕐' },
];
const WHY = [
  { h: 'Web & Data Python Specialists', b: 'Our developers span Django web apps, FastAPI microservices, and data engineering pipelines - one partner for your entire Python backend.' },
  { h: 'Production-Proven Code', b: 'Every developer has shipped Python systems at scale - high-throughput APIs, ETL pipelines, ML inference endpoints, and async ASGI services.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your brief and receive 2-3 pre-screened Python developer CVs within two business days.' },
  { h: 'Clean, Testable Python', b: 'Our developers follow PEP 8, type annotations, pytest-driven TDD, and use tools like Ruff, mypy, and Black for automated quality enforcement.' },
  { h: 'NDA & IP Security', b: 'NDA and IP assignment signed before any access to your repositories, data, or infrastructure.' },
  { h: 'Elastic Engagement', b: 'Scale from one Python developer to a full backend team as your data or API workloads grow.' },
];
const PROCESS = [
  { n: '01', h: 'Share Your Stack', b: 'Tell us the Python version, framework (Django/Flask/FastAPI), and project goals.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 matched Python developer CVs delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Run your own technical round - algorithms, system design, or live coding.' },
  { n: '04', h: 'Onboard & Deliver', b: 'Developer joins your repo and tools. First sprint starts within 7 days.' },
];
const FAQS = [
  { q: 'Do your Python developers specialise in Django, Flask, or FastAPI?', a: 'We have specialists in all three. Django is preferred for feature-rich web apps with ORM and admin. FastAPI for high-performance async APIs and ML serving. Flask for lightweight microservices. We match based on your existing stack.' },
  { q: 'Can they build async Python APIs?', a: 'Yes. Our developers build ASGI services using FastAPI with asyncio, Starlette, and WebSockets. For task queues and background jobs, we use Celery with Redis or RabbitMQ.' },
  { q: 'Do they have data engineering experience?', a: 'Yes. Many of our Python developers have built ETL pipelines using Pandas, SQLAlchemy, Apache Airflow, and cloud data services (AWS Glue, BigQuery). We can recommend the right profile based on your data workload.' },
  { q: 'Can they integrate with machine learning models?', a: 'Yes. We have developers experienced in building REST inference APIs around scikit-learn, TensorFlow, and PyTorch models using FastAPI or Django, including model versioning and A/B serving.' },
  { q: 'What is the minimum engagement period?', a: 'Our standard minimum is 4 weeks. This provides sufficient time for codebase onboarding, environment setup, and meaningful delivery.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HirePythonDeveloper() {
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
        { '@type': 'ListItem', position: 2, name: 'Hire Python Developer', item: 'https://www.1solutions.biz/hire-python-developer/' },
      ]},
      { '@type': 'ProfessionalService', name: 'Hire Python Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated Python developers from 1Solutions - Django, FastAPI, Flask, and data engineering experts.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '108', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire Python Developer | 1Solutions</title>
        <meta name="description" content="Hire dedicated Python developers from 1Solutions. Django, FastAPI, Flask, and data engineering experts. Pre-vetted engineers available immediately." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-python-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hpy-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hpy-btn-primary:hover{opacity:.88}
          .hpy-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hpy-btn-outline:hover{border-color:#fff}
          .hpy-sec{padding:70px 20px}
          .hpy-sec-alt{background:#f2f8fc}
          .hpy-wrap{max-width:1100px;margin:0 auto}
          .hpy-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hpy-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hpy-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hpy-skill{background:#fff;border:1.5px solid #a8c8dc;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hpy-skill.hpy-in{opacity:1;transform:none}
          .hpy-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hpy-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #b8d4e4;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hpy-model.hpy-in{opacity:1;transform:none}
          .hpy-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hpy-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hpy-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hpy-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hpy-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hpy-why-item.hpy-in{opacity:1;transform:none}
          .hpy-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hpy-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hpy-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hpy-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #b8d4e4;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hpy-step.hpy-in{opacity:1;transform:none}
          .hpy-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hpy-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hpy-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hpy-faq{max-width:760px;margin:0 auto}
          .hpy-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hpy-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hpy-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hpy-faq-icon.hpy-open{transform:rotate(45deg)}
          .hpy-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hpy-cta{background:linear-gradient(135deg,${ACCENT},#002236);padding:80px 20px;text-align:center;color:#fff}
          .hpy-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hpy-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="Hire Python Developer · Django, FastAPI &amp; Flask"
        title={<>Hire Python Developers <AuroraText>Django, FastAPI &amp; Flask Experts</AuroraText></>}
        subtext="Pre-vetted Python engineers for web applications, high-performance APIs, data pipelines, and ML inference services. Profiles in 48 hours."
        primaryCta={{ label: 'Hire a Python Developer', href: '/contact-us' }}
        secondaryCta={{ label: 'View Portfolio', href: '/portfolio' }}
        stats={[
          { label: 'Python Developers', value: '55', suffix: '+' },
          { label: 'Python Projects Delivered', value: '240', suffix: '+' },
          { label: 'Client Satisfaction', value: '49', prefix: '4.', suffix: '/5' },
          { label: 'Avg Onboarding', value: '7', suffix: ' Days' },
        ]}
      />

      <section className="hpy-sec" ref={skR}>
        <div className="hpy-wrap">
          <h2 className="hpy-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hpy-sec-sub">Our Python developers cover web frameworks, async APIs, data engineering, and cloud deployment - end to end.</p>
          <div className="hpy-skills">
            {SKILLS.map((s, i) => <span key={s} className={`hpy-skill${skV ? ' hpy-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}
          </div>
        </div>
      </section>

      <section className="hpy-sec hpy-sec-alt" ref={enR}>
        <div className="hpy-wrap">
          <h2 className="hpy-sec-title">Flexible Engagement Models</h2>
          <p className="hpy-sec-sub">Full-time, part-time, or hourly - scaled to your sprint velocity and budget.</p>
          <div className="hpy-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hpy-model${enV ? ' hpy-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hpy-model-icon">{m.icon}</div>
                <h3>{m.title}</h3><p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpy-sec" ref={whR}>
        <div className="hpy-wrap">
          <h2 className="hpy-sec-title">Why Hire Python Developers from 1Solutions?</h2>
          <p className="hpy-sec-sub">We place Pythonistas who write idiomatic, tested, and documented code - not just scripts that happen to work.</p>
          <div className="hpy-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hpy-why-item${whV ? ' hpy-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3><p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpy-sec hpy-sec-alt" ref={prR}>
        <div className="hpy-wrap">
          <h2 className="hpy-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hpy-sec-sub">From brief to first merged PR - in under two weeks.</p>
          <div className="hpy-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hpy-step${prV ? ' hpy-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hpy-step-n">{p.n}</div>
                <h3>{p.h}</h3><p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpy-sec">
        <div className="hpy-wrap">
          <h2 className="hpy-sec-title">Frequently Asked Questions</h2>
          <p className="hpy-sec-sub">Common questions before hiring a Python developer from 1Solutions.</p>
          <div className="hpy-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hpy-faq-item">
                <div className="hpy-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hpy-faq-icon${openFaq === i ? ' hpy-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hpy-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpy-cta">
        <div className="hpy-wrap">
          <h2>Ready to Hire Your Python Developer?</h2>
          <p>Share your stack and requirements - receive matched Python specialist profiles within 48 hours, no commitment required.</p>
          <Link href="/contact-us" className="hpy-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
