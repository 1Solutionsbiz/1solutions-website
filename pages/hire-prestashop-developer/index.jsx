'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#5c2900';
const SKILLS = [
  'PrestaShop 1.7 & 8.x', 'PHP 8.x', 'MySQL', 'Smarty & Twig Templating',
  'Custom Module Development', 'Custom Theme Development', 'Payment Gateway Integration',
  'Multi-Store & Multi-Language', 'Multi-Currency Setup', 'PrestaShop REST API',
  'Performance Optimisation', 'Third-Party ERP & CRM Integration',
  'PrestaShop CLI & Composer', 'PHPUnit Testing', 'SEO & URL Rewriting',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time PrestaShop developer focused on your store - 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for ongoing module work, theme adjustments, or store maintenance.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for audits, bug-fixes, or specific module deliverables.', icon: '🕐' },
];
const WHY = [
  { h: 'PrestaShop Platform Depth', b: 'Our developers have built multi-store PrestaShop platforms with custom modules, overrides, and complex checkout flows - not just theme installations.' },
  { h: 'Module & Theme Specialists', b: 'We build certified-quality PrestaShop modules and pixel-perfect responsive themes from scratch, following PrestaShop Validator guidelines.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your brief and receive 2-3 pre-vetted PrestaShop developer CVs within two business days.' },
  { h: 'Migration Expertise', b: 'We handle PrestaShop version upgrades, as well as migrations from other platforms including WooCommerce, Magento, and OpenCart.' },
  { h: 'IP & NDA Security', b: 'Comprehensive NDA and IP assignment signed before any access to your store back-office, codebase, or database.' },
  { h: 'Flexible Scaling', b: 'Ramp up for large store rebuilds and scale back during quieter trading periods with 2-week notice.' },
];
const PROCESS = [
  { n: '01', h: 'Describe Your Store', b: 'Share the PrestaShop version, current modules, and work needed.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 matched PrestaShop developer CVs delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Run your own technical assessment and choose your developer.' },
  { n: '04', h: 'Onboard & Deliver', b: 'Developer joins your staging environment. First sprint starts within 7 days.' },
];
const FAQS = [
  { q: 'Do your developers work with both PrestaShop 1.7 and PrestaShop 8?', a: 'Yes. Our developers are proficient in both. For new stores we recommend PrestaShop 8 for its improved performance and security. Existing 1.7 stores are also fully supported and we can plan an upgrade path.' },
  { q: 'Can they build custom modules from scratch?', a: 'Absolutely. We build PrestaShop modules following the official architecture standards, including hooks, override system, admin controllers, and front controllers. Modules can also be submitted to the PrestaShop Marketplace.' },
  { q: 'Can they integrate with payment gateways?', a: 'Yes. Our developers have integrated PrestaShop with Stripe, PayPal, Razorpay, Klarna, Authorize.Net, and regional payment providers using the PrestaShop payment module API.' },
  { q: 'Can they migrate our store from another platform?', a: 'Yes. We have migrated stores to PrestaShop from WooCommerce, Magento, OpenCart, and custom-built platforms, including full migration of products, customers, orders, and SEO URLs.' },
  { q: 'What is the minimum engagement period?', a: 'Our standard minimum is 4 weeks. Shorter engagements for specific module deliverables can be arranged.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HirePrestaShopDeveloper() {
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
        { '@type': 'ListItem', position: 2, name: 'Hire PrestaShop Developer', item: 'https://www.1solutions.biz/hire-prestashop-developer/' },
      ]},
      { '@type': 'ProfessionalService', name: 'Hire PrestaShop Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated PrestaShop developers from 1Solutions for custom modules, themes, and store builds.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '55', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire PrestaShop Developer | Module & Theme Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated PrestaShop developers from 1Solutions. Custom module & theme development, migrations, and multi-store setups. Pre-vetted experts." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-prestashop-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hpres-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hpres-btn-primary:hover{opacity:.88}
          .hpres-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hpres-btn-outline:hover{border-color:#fff}
          .hpres-sec{padding:70px 20px}
          .hpres-sec-alt{background:#fdf7f2}
          .hpres-wrap{max-width:1100px;margin:0 auto}
          .hpres-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hpres-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hpres-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hpres-skill{background:#fff;border:1.5px solid #e8c8a8;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hpres-skill.hpres-in{opacity:1;transform:none}
          .hpres-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hpres-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #f0d8c0;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hpres-model.hpres-in{opacity:1;transform:none}
          .hpres-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hpres-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hpres-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hpres-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hpres-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hpres-why-item.hpres-in{opacity:1;transform:none}
          .hpres-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hpres-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hpres-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hpres-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #f0d8c0;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hpres-step.hpres-in{opacity:1;transform:none}
          .hpres-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hpres-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hpres-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hpres-faq{max-width:760px;margin:0 auto}
          .hpres-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hpres-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hpres-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hpres-faq-icon.hpres-open{transform:rotate(45deg)}
          .hpres-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hpres-cta{background:linear-gradient(135deg,${ACCENT},#341500);padding:80px 20px;text-align:center;color:#fff}
          .hpres-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hpres-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="Hire PrestaShop Developer · Modules &amp; Store Builds"
        title={<>Hire PrestaShop Developers <AuroraText>Custom Modules &amp; Store Builds</AuroraText></>}
        subtext="Pre-vetted PrestaShop 1.7 &amp; 8 specialists for custom module development, theme builds, platform migrations, and multi-store setups. Profiles in 48 hours."
        primaryCta={{ label: 'Hire a PrestaShop Developer', href: '/contact-us/' }}
        secondaryCta={{ label: 'View Portfolio', href: '/portfolio/' }}
        stats={[
          { label: 'PrestaShop Developers', value: '25', suffix: '+' },
          { label: 'Stores Delivered', value: '90', suffix: '+' },
          { label: 'Client Satisfaction', value: '48', prefix: '4.', suffix: '/5' },
          { label: 'Avg Onboarding', value: '7', suffix: ' Days' },
        ]}
      />

      <section className="hpres-sec" ref={skR}>
        <div className="hpres-wrap">
          <h2 className="hpres-sec-title">Skills &amp; Tech Stack</h2>
          <p className="hpres-sec-sub">Our PrestaShop developers cover the full platform - modules, themes, APIs, performance, and third-party integrations.</p>
          <div className="hpres-skills">
            {SKILLS.map((s, i) => <span key={s} className={`hpres-skill${skV ? ' hpres-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}
          </div>
        </div>
      </section>

      <section className="hpres-sec hpres-sec-alt" ref={enR}>
        <div className="hpres-wrap">
          <h2 className="hpres-sec-title">Flexible Engagement Models</h2>
          <p className="hpres-sec-sub">Match the engagement model to your trading calendar and development roadmap.</p>
          <div className="hpres-models">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hpres-model${enV ? ' hpres-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="hpres-model-icon">{m.icon}</div>
                <h3>{m.title}</h3><p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpres-sec" ref={whR}>
        <div className="hpres-wrap">
          <h2 className="hpres-sec-title">Why Hire PrestaShop Developers from 1Solutions?</h2>
          <p className="hpres-sec-sub">Our PrestaShop team has delivered stores across 20+ countries with multi-language, multi-currency, and multi-store configurations.</p>
          <div className="hpres-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hpres-why-item${whV ? ' hpres-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3><p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpres-sec hpres-sec-alt" ref={prR}>
        <div className="hpres-wrap">
          <h2 className="hpres-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hpres-sec-sub">From brief to first staging deployment - in under two weeks.</p>
          <div className="hpres-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hpres-step${prV ? ' hpres-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hpres-step-n">{p.n}</div>
                <h3>{p.h}</h3><p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpres-sec">
        <div className="hpres-wrap">
          <h2 className="hpres-sec-title">Frequently Asked Questions</h2>
          <p className="hpres-sec-sub">Common questions before hiring a PrestaShop developer from 1Solutions.</p>
          <div className="hpres-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hpres-faq-item">
                <div className="hpres-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hpres-faq-icon${openFaq === i ? ' hpres-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hpres-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hpres-cta">
        <div className="hpres-wrap">
          <h2>Ready to Hire Your PrestaShop Developer?</h2>
          <p>Share your store requirements and receive matched PrestaShop specialist profiles within 48 hours.</p>
          <Link href="/contact-us/" className="hpres-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
