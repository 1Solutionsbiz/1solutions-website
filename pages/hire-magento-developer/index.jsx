'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#6d1800';
const SKILLS = [
  'Magento 2 (Open Source & Adobe Commerce)', 'PHP 8.x', 'MySQL & Elasticsearch',
  'Custom Module Development', 'REST & GraphQL API', 'PWA Studio',
  'Magento Checkout Customisation', 'Payment Gateway Integration', 'Multi-Store Setup',
  'B2B Commerce Features', 'Performance Optimisation (Varnish, Redis)', 'Magento CLI & Composer',
  'Adobe Commerce Cloud', 'Third-Party ERP & CRM Integration', 'PHPUnit Testing',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A Magento specialist working full-time on your store - 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for ongoing module development, upgrades, or performance tuning.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for code reviews, migration planning, or one-off bug-fix sprints.', icon: '🕐' },
];
const WHY = [
  { h: 'Deep Magento Platform Expertise', b: 'Our developers have built large-scale Magento 2 stores handling millions in GMV - not just simple product catalogues.' },
  { h: 'Adobe Commerce Certified', b: 'Team members hold Adobe Commerce certifications covering front-end, back-end, and solution architecture.' },
  { h: '48-Hour Profile Delivery', b: 'Submit your brief and receive matched Magento developer CVs within two business days.' },
  { h: 'Performance & Scalability Focus', b: 'Every engagement includes a performance baseline - we optimise for page speed, database queries, and cache hit rates.' },
  { h: 'NDA & IP Security', b: 'Comprehensive NDA and IP assignment signed before any access to your Magento codebase or admin panel.' },
  { h: 'Flexible Engagement', b: 'Scale up for large upgrade projects or reduce hours during quieter trading periods with 2-week notice.' },
];
const PROCESS = [
  { n: '01', h: 'Share Your Requirements', b: 'Describe your Magento version, store size, and the work needed.' },
  { n: '02', h: 'Receive Profiles', b: 'Get 2-3 pre-screened Magento developer CVs within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Run your own technical round and pick the best fit for your store.' },
  { n: '04', h: 'Onboard & Deliver', b: 'Developer joins your staging environment. First sprint starts within 7 days.' },
];
const FAQS = [
  { q: 'Do your Magento developers work with both Open Source and Adobe Commerce?', a: 'Yes. Our team covers Magento 2 Open Source, Adobe Commerce (formerly Enterprise Edition), and Adobe Commerce Cloud. We also work on older Magento 1 legacy codebases when needed.' },
  { q: 'Can they handle a Magento 1 to Magento 2 migration?', a: 'Absolutely. We have run multiple Magento 1 to Magento 2 migrations, including data migration (products, customers, orders), custom extension rewrites, and theme rebuilds.' },
  { q: 'Do they know PWA Studio and headless Magento?', a: 'Yes. We have developers experienced in Magento PWA Studio, as well as headless setups using Magento GraphQL API with Vue Storefront or custom Next.js frontends.' },
  { q: 'Can they integrate with our ERP or CRM?', a: 'Yes. Our developers have integrated Magento with SAP, Oracle, Salesforce, Microsoft Dynamics, and custom REST APIs for inventory, order, and customer sync.' },
  { q: 'What is the minimum engagement period?', a: 'Our standard minimum engagement is 4 weeks. Shorter durations for specific deliverables can be arranged on a case-by-case basis.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireMagentoDeveloper() {
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
        { '@type': 'ListItem', position: 2, name: 'Hire Magento Developer', item: 'https://www.1solutions.biz/hire-magento-developer/' },
      ]},
      { '@type': 'ProfessionalService', name: 'Hire Magento Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated Magento 2 and Adobe Commerce developers from 1Solutions for custom modules, migrations, and enterprise builds.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '72', bestRating: '5' },
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
        <title>Hire Magento Developer | 1Solutions</title>
        <meta name="description" content="Hire dedicated Magento developers from 1Solutions. Magento 2, Adobe Commerce, PWA Studio, and ERP integrations. Pre-vetted experts. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-magento-developer/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hire Magento Developer | 1Solutions" />
        <meta property="og:description" content="Hire dedicated Magento developers from 1Solutions. Magento 2, Adobe Commerce, PWA Studio, and ERP integrations. Pre-vetted experts. Profiles in 48 hours." />
        <meta property="og:url" content="https://www.1solutions.biz/hire-magento-developer/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-hire-magento-developer.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Hire Magento Developer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-hire-magento-developer.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Hire Magento Developer" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hmag-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hmag-btn-primary:hover{opacity:.88}
          .hmag-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hmag-btn-outline:hover{border-color:#fff}
          .hmag-sec{padding:70px 20px}
          .hmag-sec-alt{background:#fdf7f5}
          .hmag-wrap{max-width:1100px;margin:0 auto}
          .hmag-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hmag-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hmag-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hmag-skill{background:#fff;border:1.5px solid #e8c8c0;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hmag-skill.hmag-in{opacity:1;transform:none}
          .hmag-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hmag-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #edd8d0;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hmag-model.hmag-in{opacity:1;transform:none}
          .hmag-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hmag-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hmag-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hmag-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hmag-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hmag-why-item.hmag-in{opacity:1;transform:none}
          .hmag-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hmag-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hmag-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hmag-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #edd8d0;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hmag-step.hmag-in{opacity:1;transform:none}
          .hmag-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hmag-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hmag-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hmag-faq{max-width:760px;margin:0 auto}
          .hmag-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hmag-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hmag-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hmag-faq-icon.hmag-open{transform:rotate(45deg)}
          .hmag-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hmag-cta{background:linear-gradient(135deg,${ACCENT},#3d0c00);padding:80px 20px;text-align:center;color:#fff}
          .hmag-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hmag-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="Hire Magento Developer · Enterprise eCommerce"
        title={<>Hire Magento Developers <AuroraText>Enterprise eCommerce Expertise</AuroraText></>}
        subtext="Pre-vetted Magento 2 and Adobe Commerce specialists for custom modules, platform migrations, PWA storefronts, and ERP integrations. Profiles in 48 hours."
        primaryCta={{ label: 'Hire a Magento Developer', href: '/contact-us/' }}
        secondaryCta={{ label: 'View Portfolio', href: '/portfolio/' }}
        stats={[
          { label: 'Magento Developers', value: '35', suffix: '+' },
          { label: 'Magento Stores Delivered', value: '150', suffix: '+' },
          { label: 'Client Satisfaction', value: '48', prefix: '4.', suffix: '/5' },
          { label: 'Average Onboarding', value: '7', suffix: ' Days' },
        ]}
      />

      <section className="hmag-sec" ref={skR}>
        <div className="hmag-wrap">
          <h2 className="hmag-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hmag-sec-sub">Our Magento developers are experienced across the full platform - custom modules, performance, cloud, and third-party integrations.</p>
          <div className="hmag-skills">
            {SKILLS.map((s, i) => (
              <span key={s} className={`hmag-skill${skV ? ' hmag-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="hmag-sec hmag-sec-alt" ref={enR}>
        <div className="hmag-wrap">
          <h2 className="hmag-sec-title">Flexible Engagement Models</h2>
          <p className="hmag-sec-sub">Choose the model that fits your trading calendar and development roadmap.</p>
          <div className="hmag-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hmag-model${enV ? ' hmag-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hmag-model-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmag-sec" ref={whR}>
        <div className="hmag-wrap">
          <h2 className="hmag-sec-title">Why Hire Magento Developers from 1Solutions?</h2>
          <p className="hmag-sec-sub">Our Magento team has built and scaled stores doing millions in annual revenue - across B2C and B2B commerce.</p>
          <div className="hmag-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hmag-why-item${whV ? ' hmag-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmag-sec hmag-sec-alt" ref={prR}>
        <div className="hmag-wrap">
          <h2 className="hmag-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hmag-sec-sub">From brief to first staging deployment - in under two weeks.</p>
          <div className="hmag-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hmag-step${prV ? ' hmag-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hmag-step-n">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmag-sec">
        <div className="hmag-wrap">
          <h2 className="hmag-sec-title">Frequently Asked Questions</h2>
          <p className="hmag-sec-sub">Common questions before hiring a Magento developer from 1Solutions.</p>
          <div className="hmag-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hmag-faq-item">
                <div className="hmag-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hmag-faq-icon${openFaq === i ? ' hmag-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hmag-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hmag-cta">
        <div className="hmag-wrap">
          <h2>Ready to Hire Your Magento Developer?</h2>
          <p>Share your requirements and receive matched Magento specialist profiles within 48 hours - no commitment required to view CVs.</p>
          <Link href="/contact-us/" className="hmag-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
