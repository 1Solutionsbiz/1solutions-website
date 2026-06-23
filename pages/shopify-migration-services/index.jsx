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

const ACCENT = '#6d28d9';
const SKILLS = [
  'WooCommerce to Shopify', 'Magento to Shopify', 'BigCommerce to Shopify',
  'PrestaShop to Shopify', 'OpenCart to Shopify', 'Custom Platform Migration',
  'Product & Variant Data Migration', 'Customer & Order History Transfer',
  'URL Redirect Mapping (301s)', 'SEO Ranking Preservation', 'Shopify Theme Setup',
  'Payment Gateway Migration', 'Third-Party App Reconfiguration',
  'Post-Migration QA & Testing', 'Shopify Plus Migration',
];
const MODELS = [
  { title: 'Full Migration',     desc: 'End-to-end platform migration: data export, clean import, theme setup, redirect mapping, and launch.', icon: '🚀' },
  { title: 'Data-Only Migration', desc: 'Migrate products, customers, and orders to your existing Shopify theme. Ideal if you already have a store setup.', icon: '📦' },
  { title: 'Migration Audit',    desc: 'Comprehensive pre-migration audit covering data mapping, SEO risk assessment, and a detailed migration plan before any work begins.', icon: '🔍' },
];
const WHY = [
  { h: 'Zero Data Loss Guaranteed',         b: 'We use validated migration tools and manual checks to ensure every product, variant, customer record, and order transfers without corruption or loss.' },
  { h: 'Full SEO Preservation',             b: 'We map every old URL to its Shopify equivalent with 301 redirects, migrate meta titles and descriptions, and preserve your Google rankings.' },
  { h: '15+ Years of E-Commerce Experience', b: "Since 2008, we've migrated 300+ e-commerce stores. We know what breaks during migrations — and how to prevent it." },
  { h: 'Staging Environment Testing',       b: 'All migrations are tested on a staging store before going live — so your customers never experience downtime or broken pages.' },
  { h: 'Post-Migration Support',            b: 'We provide 30 days of post-migration support to catch edge cases, fix broken links, and ensure your Shopify store performs as expected.' },
  { h: 'NDA & IP Security',                 b: 'Full NDA signed before any access to your existing store data, product catalogue, or customer records.' },
];
const PROCESS = [
  { n: '01', h: 'Migration Audit',   b: 'We audit your current platform — product count, data structure, URL patterns, SEO footprint, and third-party integrations.' },
  { n: '02', h: 'Migration Plan',    b: 'We deliver a detailed migration plan: data mapping, redirect list, timeline, risk register, and rollback procedure.' },
  { n: '03', h: 'Staging Migration', b: 'We execute the migration on a private staging store — products, customers, orders, SEO fields, and redirects — and test thoroughly.' },
  { n: '04', h: 'Go Live',           b: 'We cut over to the new Shopify store, verify all redirects fire correctly, and monitor rankings and traffic for the first 30 days.' },
];
const FAQS = [
  { q: 'Which platforms can you migrate to Shopify?', a: 'We migrate from WooCommerce, Magento 1 & 2, BigCommerce, PrestaShop, OpenCart, Volusion, 3dcart, Wix, Squarespace, and fully custom-built platforms. If your store runs on it, we can migrate it.' },
  { q: 'Will I lose my Google rankings?', a: 'No — if the migration is handled correctly. We map every old URL to its Shopify equivalent with 301 permanent redirects, preserve meta titles and descriptions, and keep your sitemap and robots.txt in order. Migrations done without proper redirect mapping are the primary cause of ranking loss.' },
  { q: 'How long does a Shopify migration take?', a: 'Small stores (under 500 products): 1–2 weeks. Medium stores (500–5,000 products): 2–4 weeks. Large or complex migrations (Magento, custom platforms, 10,000+ products): 4–8 weeks. We provide a precise timeline after the migration audit.' },
  { q: 'Will customer passwords transfer?', a: 'Customer email addresses, names, addresses, and order history transfer fully. Passwords cannot be migrated due to encryption — customers receive a password reset email on first login to your new Shopify store.' },
  { q: 'Do you set up the Shopify theme as well?', a: 'Yes. Full migration packages include theme setup — either installing and configuring a premium theme or applying your existing brand guidelines to a new Shopify theme. Custom theme development is also available.' },
  { q: 'What happens if something breaks after go-live?', a: 'All our migrations include 30 days of post-migration support. If any redirects break, data is missing, or integrations misbehave after launch, we fix it at no additional charge.' },
];

export default function ShopifyMigrationServices() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(60);  const [c2, s2] = useCountUp(300);
  const [c3, s3] = useCountUp(49);  const [c4, s4] = useCountUp(30);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(60); s2(300); s3(49); s4(30); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Shopify Migration Services', item: 'https://www.1solutions.biz/shopify-migration-services/' },
      ]},
      { '@type': 'Service', name: 'Shopify Migration Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Expert Shopify migration services from 1Solutions — WooCommerce, Magento, BigCommerce, and custom platform migrations with zero data loss and SEO preservation.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '112', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Shopify Migration Services | WooCommerce, Magento &amp; BigCommerce to Shopify | 1Solutions</title>
        <meta name="description" content="Expert Shopify migration services from 1Solutions. We migrate WooCommerce, Magento, BigCommerce, and custom stores to Shopify with zero data loss, SEO preservation, and minimal downtime." />
        <link rel="canonical" href="https://www.1solutions.biz/shopify-migration-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .sms-hero{background:linear-gradient(135deg,${ACCENT} 0%,#3b0764 60%,#4c1d95 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .sms-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .sms-hero p{font-size:1.15rem;max-width:640px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .sms-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .sms-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .sms-btn-primary:hover{opacity:.88}
          .sms-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .sms-btn-outline:hover{border-color:#fff}
          .sms-sec{padding:70px 20px}.sms-sec-alt{background:#f5f3ff}
          .sms-wrap{max-width:1100px;margin:0 auto}
          .sms-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .sms-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .sms-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .sms-skill{background:#fff;border:1.5px solid #c4b5fd;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .sms-skill.sms-in{opacity:1;transform:none}
          .sms-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .sms-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #c4b5fd;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .sms-model.sms-in{opacity:1;transform:none}
          .sms-model-icon{font-size:2.2rem;margin-bottom:14px}
          .sms-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .sms-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .sms-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .sms-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .sms-why-item.sms-in{opacity:1;transform:none}
          .sms-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .sms-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .sms-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .sms-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #c4b5fd;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .sms-step.sms-in{opacity:1;transform:none}
          .sms-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .sms-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .sms-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .sms-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .sms-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .sms-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .sms-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .sms-faq{max-width:760px;margin:0 auto}
          .sms-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .sms-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .sms-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .sms-faq-icon.sms-open{transform:rotate(45deg)}
          .sms-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .sms-cta{background:linear-gradient(135deg,${ACCENT},#3b0764);padding:80px 20px;text-align:center;color:#fff}
          .sms-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .sms-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.sms-hero{padding:80px 18px 60px}.sms-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="sms-hero">
        <h1>Shopify Migration Services<br/>Move to Shopify Without Losing SEO or Data</h1>
        <p>We migrate WooCommerce, Magento, BigCommerce, PrestaShop, and custom-built stores to Shopify with zero data loss, full URL redirect mapping, and ranking preservation. 15+ years of e-commerce migration experience across US, Canada, and Australia.</p>
        <div className="sms-hero-btns">
          <Link href="/contact-us" className="sms-btn-primary">Get a Free Migration Audit →</Link>
          <Link href="/portfolio" className="sms-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="sms-sec" ref={skR}>
        <div className="sms-wrap">
          <h2 className="sms-sec-title">Migration Capabilities</h2>
          <p className="sms-sec-sub">We handle migrations from every major e-commerce platform — with full data integrity and SEO preservation.</p>
          <div className="sms-skills">{SKILLS.map((s, i) => <span key={s} className={`sms-skill${skV ? ' sms-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="sms-sec sms-sec-alt" ref={enR}>
        <div className="sms-wrap">
          <h2 className="sms-sec-title">Migration Service Options</h2>
          <p className="sms-sec-sub">Choose the engagement that matches your needs — from a full end-to-end migration to a pre-migration audit.</p>
          <div className="sms-models">{MODELS.map((m, i) => <div key={m.title} className={`sms-model${enV ? ' sms-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="sms-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="sms-sec" ref={whR}>
        <div className="sms-wrap">
          <h2 className="sms-sec-title">Why Choose 1Solutions for Your Shopify Migration?</h2>
          <p className="sms-sec-sub">We have migrated 300+ stores and know exactly what breaks — and how to prevent it.</p>
          <div className="sms-why-grid">{WHY.map((w, i) => <div key={w.h} className={`sms-why-item${whV ? ' sms-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="sms-stats" ref={stGr}>
        <div className="sms-stats-grid">
          <div><div className="sms-stat-val">{stV ? c1 : 0}+</div><div className="sms-stat-label">Shopify Migrations</div></div>
          <div><div className="sms-stat-val">{stV ? c2 : 0}+</div><div className="sms-stat-label">Stores Migrated</div></div>
          <div><div className="sms-stat-val">4.{stV ? c3 : 0}/5</div><div className="sms-stat-label">Client Satisfaction</div></div>
          <div><div className="sms-stat-val">{stV ? c4 : 0} Days</div><div className="sms-stat-label">Post-Launch Support</div></div>
        </div>
      </section>
      <section className="sms-sec sms-sec-alt" ref={prR}>
        <div className="sms-wrap">
          <h2 className="sms-sec-title">Our Migration Process</h2>
          <p className="sms-sec-sub">A proven 4-step process that eliminates data loss, downtime, and ranking drops.</p>
          <div className="sms-process">{PROCESS.map((p, i) => <div key={p.n} className={`sms-step${prV ? ' sms-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="sms-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="sms-sec">
        <div className="sms-wrap">
          <h2 className="sms-sec-title">Frequently Asked Questions</h2>
          <p className="sms-sec-sub">Common questions about Shopify migration services from 1Solutions.</p>
          <div className="sms-faq">{FAQS.map((f, i) => <div key={i} className="sms-faq-item"><div className="sms-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`sms-faq-icon${openFaq === i ? ' sms-open' : ''}`}>+</span></div>{openFaq === i && <p className="sms-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="sms-cta">
        <div className="sms-wrap">
          <h2>Ready to Migrate to Shopify?</h2>
          <p>Get a free migration audit — we'll review your current platform, map your data, and deliver a no-obligation plan within 48 hours.</p>
          <Link href="/contact-us" className="sms-btn-primary">Get Your Free Migration Audit →</Link>
        </div>
      </section>
    </>
  );
}
