import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'Product Page SEO', desc: 'Title tag, meta description, schema markup, image alt text, and conversion copy optimisation for every product — at scale, even for catalogues with thousands of SKUs.' },
  { icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', title: 'Category Page Optimisation', desc: 'Category pages drive the highest-intent traffic. We optimise URL structure, heading hierarchy, faceted navigation, canonical tags, and add unique introductory copy that ranks.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Technical eCommerce SEO', desc: 'Crawl budget optimisation, duplicate content elimination, faceted navigation handling (noindex/canonical), site speed (Core Web Vitals), and XML sitemap management for large stores.' },
  { icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4', title: 'Structured Data & Rich Snippets', desc: 'Product, Review, BreadcrumbList, and Offer schema implementation so your listings show star ratings, price, and availability directly in Google search results.' },
  { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', title: 'Google Shopping Feed Optimisation', desc: 'Feed title, description, GTIN, MPN, and attribute optimisation for Google Merchant Center — improving Shopping ad quality scores and organic Shopping visibility.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'eCommerce Link Building', desc: 'Authority links from product review sites, industry blogs, supplier directories, and digital PR — building the domain authority that lifts your entire catalogue.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'eCommerce Content Strategy', desc: 'Buying guides, comparison articles, and "best X for Y" content that ranks for high-intent queries and drives buyers into your category and product pages.' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Platform-Specific SEO', desc: 'Deep expertise in Shopify (canonical issues, theme speed), WooCommerce (permalink structure, plugin conflicts), Magento (faceted nav, large catalogue crawling), and custom platforms.' },
];

const RESULTS = [
  { metric: '410%', label: 'Organic revenue increase', sub: 'Shopify fashion store — 12 months', color: '#FE9700' },
  { metric: '2.9×', label: 'Category page traffic growth', sub: 'WooCommerce electronics — 8 months', color: '#7C3AED' },
  { metric: '#1–3', label: 'Google positions for 200+ products', sub: 'Magento home goods client — AU', color: '#0F3460' },
];

const PROCESS = [
  { n: '01', title: 'eCommerce SEO Audit', desc: 'Full crawl of your store — product pages, categories, faceted nav, duplicate content, speed, structured data gaps, and competitor benchmarking.' },
  { n: '02', title: 'Keyword & Catalogue Mapping', desc: 'We map search demand to your catalogue architecture — identifying which categories, products, and content gaps represent the biggest revenue opportunity.' },
  { n: '03', title: 'Technical Fixes', desc: 'Duplicate product URLs, canonical tag issues, crawl budget waste, faceted navigation indexation — we fix the technical debt that holds large stores back.' },
  { n: '04', title: 'On-Page Optimisation', desc: 'Title tags, meta descriptions, H1/H2 structure, alt text, and unique copy for priority category and product pages — prioritised by revenue potential.' },
  { n: '05', title: 'Content & Link Building', desc: 'Buying guides, comparison content, and authority link acquisition from relevant product review publications and industry directories.' },
  { n: '06', title: 'Measure & Scale', desc: 'Monthly reporting on organic revenue, product/category ranking movement, and crawl health — with a clear roadmap for the next quarter.' },
];

const WHY = [
  { title: 'Platform-Specific Expertise', desc: 'Shopify, WooCommerce, Magento, and custom — we know the unique SEO challenges of each platform and how to solve them without breaking your store.' },
  { title: 'Revenue-First Mindset', desc: 'We prioritise optimisation by revenue potential — focusing on categories and products with the highest conversion value, not just the easiest keyword wins.' },
  { title: 'Scalable for Large Catalogues', desc: 'We have optimised stores with 10,000+ SKUs using templated optimisation frameworks, automated audit scripts, and bulk implementation workflows.' },
  { title: 'Structured Data Specialists', desc: 'Rich snippets with star ratings, price, and availability in SERPs significantly increase click-through rates — we implement and monitor schema for every major product type.' },
  { title: 'No Lock-in Contracts', desc: 'We earn your business every month. Month-to-month engagements — you stay because the organic revenue numbers keep growing.' },
  { title: 'Transparent Reporting', desc: 'Monthly reports tied to revenue — organic sessions, conversion rate, organic revenue, and keyword movement — not just traffic numbers.' },
];

const FAQS = [
  { q: 'How is eCommerce SEO different from regular SEO?', a: 'eCommerce SEO deals with challenges unique to online stores: duplicate product URLs from filters and sorting, thin category page content, crawl budget management for large catalogues, Product and Review schema, and Google Shopping feed optimisation. These require specialised knowledge beyond standard on-page SEO.' },
  { q: 'Which eCommerce platforms do you work with?', a: 'Shopify, WooCommerce, Magento (1 and 2), BigCommerce, PrestaShop, OpenCart, and custom-built eCommerce platforms. Each has unique SEO quirks — from Shopify\'s duplicate URL structure to Magento\'s faceted navigation — and we know how to handle all of them.' },
  { q: 'How do you handle duplicate content from product variants and filters?', a: 'We use a combination of canonical tags, noindex directives, and parameter handling in Google Search Console to ensure only the preferred version of each URL is indexed. For Shopify specifically, we resolve the /collections/ vs /products/ duplication that affects most stores.' },
  { q: 'Can you optimise a store with thousands of products?', a: 'Yes. We have scalable processes for large catalogues — templated title/meta optimisation, automated crawl monitoring, bulk schema implementation, and prioritisation frameworks that focus effort on the highest-revenue product and category pages first.' },
  { q: 'Do you help with Google Shopping / Merchant Center?', a: 'Yes. We optimise your product feed titles, descriptions, GTINs, and attributes for Google Merchant Center — improving both paid Shopping ad quality scores and organic Shopping visibility (free listings).' },
  { q: 'How long before eCommerce SEO shows results?', a: 'Technical fixes often show results within 4 to 8 weeks. Category page improvements typically show ranking movement within 2 to 3 months. Full organic revenue impact is usually measurable by month 4 to 6, depending on competition and catalogue size.' },
  { q: 'Do you provide eCommerce SEO for international stores?', a: 'Yes. We handle hreflang implementation, geo-targeted content, currency and language variants, and the crawl budget implications of multi-regional catalogues. We have clients running Shopify and WooCommerce stores across US, UK, AU, and CA simultaneously.' },
];

export default function EcommerceSeoServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'eCommerce SEO', item: 'https://www.1solutions.biz/ecommerce-seo-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'eCommerce SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'eCommerce SEO services for Shopify, WooCommerce, and Magento stores. Product page, category page, technical SEO, and Google Shopping optimisation.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'eCommerce Search Engine Optimisation',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '108', bestRating: '5' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>eCommerce SEO Services | Shopify, WooCommerce & Magento SEO | 1Solutions</title>
        <meta name="description" content="eCommerce SEO for Shopify, WooCommerce, and Magento. Product & category page optimisation, technical SEO, structured data, and Google Shopping feed management." />
        <link rel="canonical" href="https://www.1solutions.biz/ecommerce-seo-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          * { box-sizing: border-box; }
          .eseo-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(254,243,199,0.55) 0%,rgba(255,255,255,0.70) 50%,rgba(237,233,254,0.45) 100%); }
          .eseo-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .eseo-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .eseo-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; }
          .eseo-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(254,151,0,0.10);border:1px solid rgba(254,151,0,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#D97706;margin-bottom:24px; }
          .eseo-h1 { font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#7C2D12 0%,#FE9700 45%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .eseo-desc { font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px; }
          .eseo-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .eseo-btn-p { display:inline-flex;align-items:center;gap:8px;background:#7C2D12;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(124,45,18,0.25); }
          .eseo-btn-p:hover { background:#92400e;transform:translateY(-2px); }
          .eseo-btn-s { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#7C2D12;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(124,45,18,0.18);transition:all 0.25s;backdrop-filter:blur(8px); }
          .eseo-btn-s:hover { background:#fff;transform:translateY(-2px); }
          .eseo-trust { display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px; }
          .eseo-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .eseo-stats-bar { display:flex;border:1px solid rgba(124,45,18,0.10);border-radius:16px;background:rgba(255,255,255,0.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px; }
          .eseo-stat-item { flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(124,45,18,0.08); }
          .eseo-stat-item:last-child { border-right:none; }
          .eseo-stat-num { font-size:1.9rem;font-weight:900;color:#7C2D12;line-height:1;letter-spacing:-1px; }
          .eseo-stat-lbl { font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px; }
          .eseo-bc { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .eseo-bc-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .eseo-bc a { color:#6b7280;text-decoration:none; }
          .eseo-bc a:hover { color:#D97706; }
          .eseo-bc-sep { color:#d1d5db; }
          .eseo-bc-cur { color:#7C2D12;font-weight:500; }
          .eseo-sec { padding:80px 40px; }
          .eseo-sec-inner { max-width:1200px;margin:0 auto; }
          .eseo-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#D97706;margin-bottom:12px; }
          .eseo-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .eseo-h2 span { background:linear-gradient(90deg,#7C2D12,#FE9700);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .eseo-lead { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .eseo-bg { background:#f8fafd; }
          .eseo-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .eseo-card { background:linear-gradient(135deg,rgba(254,243,199,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(124,45,18,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .eseo-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.30);box-shadow:0 16px 48px rgba(124,45,18,0.12); }
          .eseo-icon { width:48px;height:48px;border-radius:14px;background:rgba(124,45,18,0.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px; }
          .eseo-icon svg { width:22px;height:22px;color:#7C2D12; }
          .eseo-card-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .eseo-card-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .eseo-results { background:linear-gradient(135deg,#3B0A00 0%,#7C2D12 100%);padding:64px 40px; }
          .eseo-results-inner { max-width:1200px;margin:0 auto; }
          .eseo-res-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(254,200,100,0.8);margin-bottom:12px;text-align:center; }
          .eseo-res-h { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .eseo-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .eseo-res-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center; }
          .eseo-res-metric { font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px; }
          .eseo-res-label { font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px; }
          .eseo-res-sub { font-size:12.5px;color:rgba(255,255,255,0.50); }
          .eseo-why-card { background:linear-gradient(135deg,rgba(254,243,199,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(124,45,18,0.07); }
          .eseo-why-check { width:36px;height:36px;border-radius:10px;background:rgba(254,151,0,0.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .eseo-why-check svg { width:18px;height:18px;color:#D97706; }
          .eseo-why-h { font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px; }
          .eseo-why-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .eseo-proc-num { font-size:3.5rem;font-weight:900;color:rgba(124,45,18,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .eseo-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#FE9700,rgba(254,151,0,0.3));border-radius:2px;margin-bottom:16px; }
          .eseo-proc-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .eseo-proc-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .eseo-faq-list { display:flex;flex-direction:column;gap:10px; }
          .eseo-faq-item { background:linear-gradient(135deg,rgba(254,243,199,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(124,45,18,0.06); }
          .eseo-faq-item.open { border-color:rgba(217,119,6,0.35); }
          .eseo-faq-btn { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .eseo-faq-qt { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .eseo-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(124,45,18,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .eseo-faq-item.open .eseo-faq-icon { background:rgba(254,151,0,0.12);transform:rotate(45deg); }
          .eseo-faq-icon svg { width:14px;height:14px;color:#7C2D12; }
          .eseo-cta { background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(237,233,254,0.65) 100%);padding:90px 40px;text-align:center;position:relative;overflow:hidden; }
          .eseo-cta-h { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#7C2D12 0%,#F59E0B 50%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .eseo-cta-p { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) { .eseo-grid3,.eseo-res-grid { grid-template-columns:1fr 1fr; } }
          @media (max-width:600px) {
            .eseo-hero,.eseo-sec,.eseo-results,.eseo-cta { padding-left:20px;padding-right:20px; }
            .eseo-hero { padding-top:60px;padding-bottom:50px; }
            .eseo-grid3,.eseo-res-grid { grid-template-columns:1fr; }
            .eseo-bc { padding:12px 20px; }
          }
        `}</style>
      </Head>

      <nav className="eseo-bc" aria-label="Breadcrumb">
        <div className="eseo-bc-inner">
          <Link href="/">Home</Link>
          <span className="eseo-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="eseo-bc-sep">›</span>
          <span className="eseo-bc-cur">eCommerce SEO</span>
        </div>
      </nav>

      <section className="eseo-hero">
        <div className="eseo-orb1" /><div className="eseo-orb2" />
        <div className="eseo-inner">
          <span className="eseo-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            eCommerce SEO — Shopify · WooCommerce · Magento
          </span>
          <h1 className="eseo-h1">eCommerce SEO That Drives<br/>Product Sales, Not Just Traffic</h1>
          <p className="eseo-desc">1Solutions delivers eCommerce SEO that connects buyers to your products at the exact moment they are ready to purchase — through product page optimisation, category architecture, structured data, and scalable technical fixes across Shopify, WooCommerce, and Magento.</p>
          <div className="eseo-btns">
            <a href="#contact" className="eseo-btn-p">
              Get a Free eCommerce SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="eseo-btn-s">View SEO Packages</Link>
          </div>
          <div className="eseo-trust">
            {['Platform-specific expertise','Revenue-first approach','No lock-in contracts','Monthly reporting'].map(t => (
              <span key={t} className="eseo-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="eseo-stats-bar">
            {[{ num:'200+', lbl:'eCommerce Stores Optimised' },{ num:'15+', lbl:'Years Experience' },{ num:'4.1×', lbl:'Avg Organic Revenue Growth' },{ num:'97%', lbl:'Client Retention' }].map(s => (
              <div key={s.lbl} className="eseo-stat-item">
                <span className="eseo-stat-num">{s.num}</span>
                <span className="eseo-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eseo-sec eseo-bg" id="services">
        <div className="eseo-sec-inner">
          <span className="eseo-tag">What We Do</span>
          <h2 className="eseo-h2">Full-Spectrum <span>eCommerce SEO Services</span></h2>
          <p className="eseo-lead">From product schema to faceted navigation — every layer of your store, optimised for maximum organic revenue.</p>
          <div className="eseo-grid3">
            {SERVICES.map(s => (
              <div key={s.title} className="eseo-card">
                <div className="eseo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="eseo-card-h">{s.title}</h3>
                <p className="eseo-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eseo-results">
        <div className="eseo-results-inner">
          <span className="eseo-res-tag">Client Results</span>
          <h2 className="eseo-res-h">eCommerce SEO Results That Compound</h2>
          <div className="eseo-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="eseo-res-card">
                <div className="eseo-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="eseo-res-label">{r.label}</div>
                <div className="eseo-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eseo-sec" id="why-us">
        <div className="eseo-sec-inner">
          <span className="eseo-tag">Why 1Solutions</span>
          <h2 className="eseo-h2">The eCommerce SEO Agency <span>That Thinks in Revenue</span></h2>
          <p className="eseo-lead">We do not optimise for rankings in isolation — every decision is tied to conversion value and organic revenue growth.</p>
          <div className="eseo-grid3">
            {WHY.map(w => (
              <div key={w.title} className="eseo-why-card">
                <div className="eseo-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="eseo-why-h">{w.title}</h3>
                <p className="eseo-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eseo-sec eseo-bg" id="process">
        <div className="eseo-sec-inner">
          <span className="eseo-tag">How We Work</span>
          <h2 className="eseo-h2">Our <span>6-Step eCommerce SEO Process</span></h2>
          <p className="eseo-lead">A structured process that fixes technical foundations, then builds organic authority month over month.</p>
          <div className="eseo-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="eseo-proc-num">{p.n}</div>
                <div className="eseo-proc-line" />
                <h3 className="eseo-proc-h">{p.title}</h3>
                <p className="eseo-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eseo-sec" id="faq">
        <div className="eseo-sec-inner">
          <span className="eseo-tag">Got Questions?</span>
          <h2 className="eseo-h2">eCommerce SEO <span>FAQs</span></h2>
          <div className="eseo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'eseo-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="eseo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="eseo-faq-qt">{f.q}</span>
                  <span className="eseo-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq === i && <div className="eseo-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="eseo-cta" id="contact">
        <div className="eseo-sec-inner">
          <span className="eseo-tag" style={{ display:'block', textAlign:'center', marginBottom:12 }}>Ready to Grow Organic Revenue?</span>
          <h2 className="eseo-cta-h">Get Your Free eCommerce SEO Audit</h2>
          <p className="eseo-cta-p">We will crawl your store, identify your biggest revenue-impacting SEO issues, and share a prioritised action plan — completely free, no obligations.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact-us" className="eseo-btn-p">
              Request Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages/" className="eseo-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
