'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#1e3a5f';
const SKILLS = [
  'WordPress Development', 'Next.js & React', 'Node.js & Express', 'Laravel & PHP',
  'E-Commerce (Shopify, WooCommerce, Magento)', 'REST & GraphQL APIs', 'Progressive Web Apps (PWA)',
  'Headless CMS Architecture', 'Database Design (MySQL, PostgreSQL, MongoDB)',
  'Cloud Hosting (AWS, GCP, Azure)', 'CI/CD & DevOps', 'Core Web Vitals Optimisation',
  'SEO-Ready Development', 'Third-Party API Integration', 'Website Speed Optimisation',
];
const MODELS = [
  { title: 'Custom Website Build',        desc: 'A bespoke website designed and built to your brand, audience, and conversion goals - from a 5-page business site to a 500-page enterprise portal.', icon: '🌐' },
  { title: 'Web Application Development', desc: 'Complex web applications with user authentication, dashboards, admin panels, APIs, and third-party integrations - built for scale and maintainability.', icon: '⚙️' },
  { title: 'Website Redesign',            desc: 'We redesign your existing website - improving performance, mobile experience, and conversion rate while preserving your SEO footprint.', icon: '🔄' },
];
const WHY = [
  { h: 'Full-Stack Capability',         b: 'Frontend (React, Next.js), backend (Node.js, Laravel), databases (PostgreSQL, MongoDB), and infrastructure (AWS, Docker) - one team, end-to-end delivery.' },
  { h: 'SEO Built Into Every Build',    b: 'Correct heading structure, schema markup, sitemap, robots.txt, Core Web Vitals, and canonical tags are standard - not an afterthought or expensive add-on.' },
  { h: 'Performance-First Development', b: 'Sub-2s load times, optimised images, lazy loading, code splitting, and green Lighthouse scores - because slow websites lose customers.' },
  { h: '15+ Years of Proven Delivery',  b: 'Since 2008, we\'ve delivered 1,200+ web projects. We know what breaks at scale, what converts at every industry, and how to de-risk complex builds.' },
  { h: 'On-Time, Fixed-Price Delivery', b: 'Detailed scope, agreed timeline, and fixed price before development starts. No moving goalposts, no surprise invoices.' },
  { h: 'Post-Launch Support',           b: 'Maintenance plans, performance monitoring, security updates, and a dedicated point of contact after go-live - not a support ticket queue.' },
];
const PROCESS = [
  { n: '01', h: 'Discovery & Scoping',       b: 'We audit your existing site, research your competitors, and define the full project scope - pages, features, integrations, and success metrics - before any design work begins.' },
  { n: '02', h: 'Design & Prototype',        b: 'Wireframes and high-fidelity mockups reviewed and approved by you before development. Mobile-first, brand-aligned, and conversion-optimised.' },
  { n: '03', h: 'Development & Integration', b: 'Agile sprints with weekly demos. All third-party integrations (CRM, payment gateways, APIs) built and tested in staging before go-live.' },
  { n: '04', h: 'Launch & Handover',         b: 'QA across devices and browsers, performance audit, SEO checklist, Google Search Console submission, and full training on your CMS - then ongoing support.' },
];
const FAQS = [
  { q: 'Which technologies do you use for web development?', a: 'We choose the right technology for each project. WordPress for content-heavy sites, Next.js and React for dynamic web applications, Shopify for e-commerce, Node.js and Laravel for complex backends, and headless CMS architectures for enterprise content platforms. We do not force a single tech stack on every project.' },
  { q: 'How much does a custom website cost?', a: 'A standard business website starts from $2,000. E-commerce stores start from $3,000. Complex web applications with custom functionality start from $8,000. We provide a detailed fixed-price quote after a free discovery call - no hourly billing surprises.' },
  { q: 'How long does web development take?', a: 'A standard website: 4–6 weeks. An e-commerce store: 4–8 weeks. A complex web application: 3–6 months. We share a detailed project timeline in the proposal stage and update it weekly throughout development.' },
  { q: 'Will my website be mobile-friendly?', a: 'Yes - mobile-first is our default. Every website we build is tested across iPhone, Android, tablet, and desktop viewports. We target 90+ Google PageSpeed scores on mobile.' },
  { q: 'Can you work with our existing design team?', a: 'Yes. We can develop from Figma, Sketch, or Adobe XD designs provided by your team, or we can handle design in-house. We integrate with your existing tools and workflows.' },
  { q: 'Do you offer website maintenance after launch?', a: 'Yes. Our maintenance plans cover security updates, CMS/plugin updates, uptime monitoring, performance checks, and a set number of content update hours per month - from $99/month.' },
];

export default function WebDevelopmentServices() {
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
        { '@type': 'ListItem', position: 2, name: 'Web Development Services', item: 'https://www.1solutions.biz/web-development-services/' },
      ]},
      { '@type': 'Organization', '@id': 'https://www.1solutions.biz/#organization',
        name: '1Solutions', url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '203', bestRating: '5' },
      },
      { '@type': 'ProfessionalService', name: 'Web Development Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Custom web development services from 1Solutions - websites, web applications, e-commerce stores, and SaaS platforms. 1,200+ projects delivered.',
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Web Development Services | 1Solutions</title>
        <meta name="description" content="Professional web development services from 1Solutions. We build custom websites, web applications, e-commerce stores, and SaaS platforms using WordPress," />
        <link rel="canonical" href="https://www.1solutions.biz/web-development-services/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Web Development Services | 1Solutions" />
        <meta property="og:description" content="Professional web development services from 1Solutions. We build custom websites, web applications, e-commerce stores, and SaaS platforms using WordPress," />
        <meta property="og:url" content="https://www.1solutions.biz/web-development-services/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-web-development-services.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Web Development Services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-web-development-services.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Web Development Services" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .wds-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .wds-btn-primary:hover{opacity:.88}
          .wds-sec{padding:70px 20px}.wds-sec-alt{background:#f0f4ff}
          .wds-wrap{max-width:1100px;margin:0 auto}
          .wds-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .wds-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .wds-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .wds-skill{background:#fff;border:1.5px solid #93c5fd;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .wds-skill.wds-in{opacity:1;transform:none}
          .wds-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .wds-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #93c5fd;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .wds-model.wds-in{opacity:1;transform:none}
          .wds-model-icon{font-size:2.2rem;margin-bottom:14px}
          .wds-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .wds-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .wds-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .wds-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .wds-why-item.wds-in{opacity:1;transform:none}
          .wds-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .wds-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .wds-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .wds-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #93c5fd;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .wds-step.wds-in{opacity:1;transform:none}
          .wds-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .wds-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .wds-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .wds-faq{max-width:760px;margin:0 auto}
          .wds-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .wds-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .wds-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .wds-faq-icon.wds-open{transform:rotate(45deg)}
          .wds-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .wds-cta{background:linear-gradient(135deg,${ACCENT},#0c1f36);padding:80px 20px;text-align:center;color:#fff}
          .wds-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .wds-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
        `}</style>
      </Head>
      <ServiceHero
        eyebrow="Web Development Services · 15+ Years Experience"
        title={<>Web Development Services - <AuroraText>Custom Websites, Web Apps & E-Commerce</AuroraText></>}
        subtext="We design and build custom websites, web applications, e-commerce stores, and SaaS platforms that perform under real-world traffic and convert visitors into customers. 15+ years, 1,200+ projects delivered for businesses across the US, Canada, and Australia."
        primaryCta={{ label: 'Get a Free Web Development Quote', href: '/contact-us/' }}
        secondaryCta={{ label: 'View Portfolio', href: '/portfolio/' }}
        stats={[
          { label: 'Projects Delivered', value: '1,200', suffix: '+' },
          { label: 'Years Experience', value: '15', suffix: '+' },
          { label: 'Client Satisfaction', value: '9', prefix: '4.', suffix: '/5' },
          { label: 'Client Retention Rate', value: '97', suffix: '%' },
        ]}
      />
      <section className="wds-sec" ref={skR}>
        <div className="wds-wrap">
          <h2 className="wds-sec-title">Technologies &amp; Capabilities</h2>
          <p className="wds-sec-sub">We work across the full web technology stack - choosing the right tool for your project, not the one we happen to know.</p>
          <div className="wds-skills">{SKILLS.map((s, i) => <span key={s} className={`wds-skill${skV ? ' wds-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="wds-sec wds-sec-alt" ref={enR}>
        <div className="wds-wrap">
          <h2 className="wds-sec-title">Engagement Options</h2>
          <p className="wds-sec-sub">Whether you need a new site, a web app, or a redesign - we have the right model for you.</p>
          <div className="wds-models">{MODELS.map((m, i) => <div key={m.title} className={`wds-model${enV ? ' wds-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="wds-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="wds-sec" ref={whR}>
        <div className="wds-wrap">
          <h2 className="wds-sec-title">Why Choose 1Solutions for Web Development?</h2>
          <p className="wds-sec-sub">1,200+ projects delivered since 2008 - we know what it takes to build websites that perform.</p>
          <div className="wds-why-grid">{WHY.map((w, i) => <div key={w.h} className={`wds-why-item${whV ? ' wds-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="wds-sec wds-sec-alt" ref={prR}>
        <div className="wds-wrap">
          <h2 className="wds-sec-title">Our Development Process</h2>
          <p className="wds-sec-sub">A structured process that delivers on time, on budget, and on brief.</p>
          <div className="wds-process">{PROCESS.map((p, i) => <div key={p.n} className={`wds-step${prV ? ' wds-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="wds-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="wds-sec">
        <div className="wds-wrap">
          <h2 className="wds-sec-title">Frequently Asked Questions</h2>
          <p className="wds-sec-sub">Common questions about our web development services.</p>
          <div className="wds-faq">{FAQS.map((f, i) => <div key={i} className="wds-faq-item"><div className="wds-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`wds-faq-icon${openFaq === i ? ' wds-open' : ''}`}>+</span></div>{openFaq === i && <p className="wds-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="wds-cta">
        <div className="wds-wrap">
          <h2>Ready to Build Your Website or Web Application?</h2>
          <p>Tell us about your project and we'll deliver a detailed proposal with timeline and fixed price within 48 hours - no commitment required.</p>
          <Link href="/contact-us/" className="wds-btn-primary">Get a Free Web Development Quote →</Link>
        </div>
      </section>
    </>
  );
}
