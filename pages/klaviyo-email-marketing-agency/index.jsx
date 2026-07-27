'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#e8511a';
const SKILLS = [
  'Klaviyo Flow Setup & Optimisation', 'Welcome Series', 'Abandoned Cart Recovery',
  'Browse Abandonment Flows', 'Post-Purchase Sequences', 'Win-Back Campaigns',
  'SMS Marketing (Klaviyo)', 'Klaviyo Segmentation', 'A/B Testing (Subject Lines & Content)',
  'Klaviyo List Cleaning', 'Shopify x Klaviyo Integration', 'WooCommerce x Klaviyo Integration',
  'Klaviyo Forms & Pop-Ups', 'Revenue Attribution Reporting', 'Deliverability Audits',
];
const MODELS = [
  { title: 'Klaviyo Setup',       desc: 'Full Klaviyo account setup: integration, core flows (welcome, cart, browse, post-purchase, win-back), list hygiene, and sending domain configuration.', icon: '⚙️' },
  { title: 'Monthly Management',  desc: 'Ongoing Klaviyo management: campaign calendar, new flows, A/B testing, list segmentation, and monthly performance reporting.', icon: '📅' },
  { title: 'Klaviyo Audit',       desc: 'A detailed audit of your existing Klaviyo account - flow performance, deliverability, segmentation gaps, and a prioritised optimisation roadmap.', icon: '🔍' },
];
const WHY = [
  { h: 'Revenue-First Approach',       b: 'We optimise for attributed revenue, not open rates. Every flow and campaign is built around your CAC, AOV, and LTV targets.' },
  { h: 'Certified Klaviyo Expertise',  b: 'Our team is Klaviyo-certified and has set up and optimised accounts for 100+ DTC and e-commerce brands across Shopify and WooCommerce.' },
  { h: 'Full-Funnel Coverage',         b: 'From first-touch welcome series to 12-month win-back sequences - we build every flow in the customer lifecycle, not just abandoned cart.' },
  { h: 'Deep Shopify Integration',     b: "We leverage Klaviyo's native Shopify integration to its fullest - real-time event tracking, predictive analytics, product recommendations, and dynamic content." },
  { h: 'Deliverability Management',    b: 'Sending domain setup, warm-up schedules, bounce management, and list hygiene to ensure your emails land in the inbox - not spam.' },
  { h: 'Transparent Reporting',        b: 'Monthly reports showing attributed revenue, flow performance, campaign results, and list growth - tied directly to your business metrics.' },
];
const PROCESS = [
  { n: '01', h: 'Account Audit',      b: 'We audit your existing Klaviyo setup (or review your ESP) - identifying revenue gaps, deliverability issues, and quick wins.' },
  { n: '02', h: 'Strategy & Build',   b: 'We build your flow architecture, campaign calendar, segmentation strategy, and email templates - all aligned to your customer journey.' },
  { n: '03', h: 'Launch & Test',      b: 'We go live with core flows and run A/B tests on subject lines, send times, and content - optimising for open rate, click rate, and attributed revenue.' },
  { n: '04', h: 'Optimise & Report',  b: 'Monthly performance reviews, new campaign deployments, and continuous flow optimisation - with full revenue attribution reporting.' },
];
const FAQS = [
  { q: 'Are you a certified Klaviyo partner?', a: 'Yes. Our team holds Klaviyo certifications in email marketing and SMS marketing. We are experienced with both the Klaviyo platform and the broader DTC and e-commerce context it operates in.' },
  { q: 'Which e-commerce platforms do you integrate Klaviyo with?', a: "Primarily Shopify and WooCommerce, but also BigCommerce, Magento, and headless storefronts via Klaviyo's API. We configure the integration, set up event tracking, and ensure product catalog sync is working correctly." },
  { q: 'How much revenue should Klaviyo generate for my store?', a: 'A well-optimised Klaviyo account typically generates 20–35% of total store revenue. If your email channel is below 15%, there is almost always a significant opportunity - usually in flow coverage, segmentation depth, or deliverability.' },
  { q: 'How long does it take to set up Klaviyo from scratch?', a: 'Core setup (integration, welcome series, abandoned cart, post-purchase) takes 2–3 weeks. A full flow library covering 8–12 customer lifecycle moments takes 4–6 weeks. Monthly management begins immediately after setup.' },
  { q: 'Do you write the email copy?', a: 'Yes. Our packages include email copywriting, HTML email development, and design. You review and approve everything before it goes live.' },
  { q: 'Do you manage SMS as well?', a: 'Yes. We set up and manage Klaviyo SMS - compliance (TCPA/GDPR), opt-in flows, SMS campaign calendar, and SMS-specific flows like cart recovery and back-in-stock alerts.' },
];

export default function KlaviyoEmailMarketingAgency() {
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
        { '@type': 'ListItem', position: 2, name: 'Klaviyo Email Marketing Agency', item: 'https://www.1solutions.biz/klaviyo-email-marketing-agency/' },
      ]},
      { '@type': 'ProfessionalService', name: 'Klaviyo Email Marketing Agency', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Certified Klaviyo email marketing agency - 1Solutions sets up and manages Klaviyo flows, campaigns, SMS, and segmentation for DTC and e-commerce brands.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '84', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Klaviyo Email Marketing Agency | 1Solutions</title>
        <meta name="description" content="1Solutions is a certified Klaviyo email marketing agency. We set up Klaviyo flows, design email campaigns, build segments, and drive revenue through email &" />
        <link rel="canonical" href="https://www.1solutions.biz/klaviyo-email-marketing-agency/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .kla-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .kla-btn-primary:hover{opacity:.88}
          .kla-sec{padding:70px 20px}.kla-sec-alt{background:#fff7f3}
          .kla-wrap{max-width:1100px;margin:0 auto}
          .kla-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .kla-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .kla-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .kla-skill{background:#fff;border:1.5px solid #fca97a;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .kla-skill.kla-in{opacity:1;transform:none}
          .kla-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .kla-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #fca97a;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .kla-model.kla-in{opacity:1;transform:none}
          .kla-model-icon{font-size:2.2rem;margin-bottom:14px}
          .kla-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .kla-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .kla-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .kla-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .kla-why-item.kla-in{opacity:1;transform:none}
          .kla-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .kla-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .kla-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .kla-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #fca97a;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .kla-step.kla-in{opacity:1;transform:none}
          .kla-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .kla-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .kla-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .kla-faq{max-width:760px;margin:0 auto}
          .kla-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .kla-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .kla-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .kla-faq-icon.kla-open{transform:rotate(45deg)}
          .kla-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .kla-cta{background:linear-gradient(135deg,${ACCENT},#8c2c08);padding:80px 20px;text-align:center;color:#fff}
          .kla-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .kla-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
        `}</style>
      </Head>
      <ServiceHero
        eyebrow="Klaviyo Email Marketing Agency · Certified Klaviyo Partners"
        title={<>Flows, Campaigns &amp; SMS That Drive <AuroraText>E-Commerce Revenue</AuroraText></>}
        subtext="We set up and optimise Klaviyo for DTC and e-commerce brands - from welcome series and abandoned cart flows to post-purchase sequences and SMS campaigns. Certified Klaviyo partners with 15+ years of e-commerce experience."
        primaryCta={{ label: 'Get a Free Klaviyo Audit →', href: '/contact-us/' }}
        secondaryCta={{ label: 'View Portfolio', href: '/portfolio/' }}
        stats={[
          { label: 'Klaviyo Brands Managed', value: '100', suffix: '+' },
          { label: 'Avg Email Revenue Share', value: '35', suffix: '%' },
          { label: 'Client Satisfaction', value: '9', prefix: '4.', suffix: '/5' },
          { label: 'Avg Flows Built Per Account', value: '12' },
        ]}
      />
      <section className="kla-sec" ref={skR}>
        <div className="kla-wrap">
          <h2 className="kla-sec-title">Klaviyo Skills &amp; Services</h2>
          <p className="kla-sec-sub">From flow architecture to deliverability - we cover the full Klaviyo stack for DTC and e-commerce brands.</p>
          <div className="kla-skills">{SKILLS.map((s, i) => <span key={s} className={`kla-skill${skV ? ' kla-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="kla-sec kla-sec-alt" ref={enR}>
        <div className="kla-wrap">
          <h2 className="kla-sec-title">How We Work With You</h2>
          <p className="kla-sec-sub">Choose the engagement that fits your Klaviyo maturity and business goals.</p>
          <div className="kla-models">{MODELS.map((m, i) => <div key={m.title} className={`kla-model${enV ? ' kla-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="kla-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="kla-sec" ref={whR}>
        <div className="kla-wrap">
          <h2 className="kla-sec-title">Why Choose 1Solutions as Your Klaviyo Agency?</h2>
          <p className="kla-sec-sub">We treat email as a revenue channel, not a broadcast tool - every decision is tied to measurable business outcomes.</p>
          <div className="kla-why-grid">{WHY.map((w, i) => <div key={w.h} className={`kla-why-item${whV ? ' kla-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="kla-sec kla-sec-alt" ref={prR}>
        <div className="kla-wrap">
          <h2 className="kla-sec-title">Our Klaviyo Process</h2>
          <p className="kla-sec-sub">From audit to revenue - a clear four-step process with measurable results at every stage.</p>
          <div className="kla-process">{PROCESS.map((p, i) => <div key={p.n} className={`kla-step${prV ? ' kla-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="kla-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="kla-sec">
        <div className="kla-wrap">
          <h2 className="kla-sec-title">Frequently Asked Questions</h2>
          <p className="kla-sec-sub">Common questions about our Klaviyo email marketing services.</p>
          <div className="kla-faq">{FAQS.map((f, i) => <div key={i} className="kla-faq-item"><div className="kla-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`kla-faq-icon${openFaq === i ? ' kla-open' : ''}`}>+</span></div>{openFaq === i && <p className="kla-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="kla-cta">
        <div className="kla-wrap">
          <h2>Ready to Turn Email Into Your Top Revenue Channel?</h2>
          <p>Get a free Klaviyo audit - we&apos;ll review your account, identify revenue gaps, and deliver a prioritised optimisation plan within 48 hours.</p>
          <Link href="/contact-us/" className="kla-btn-primary">Get Your Free Klaviyo Audit →</Link>
        </div>
      </section>
    </>
  );
}
