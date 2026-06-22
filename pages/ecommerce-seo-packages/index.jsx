import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    slug: 'starter',
    monthlyPrice: 599,
    yearlyPrice: 499,
    yearlySave: 1200,
    desc: 'For small ecommerce stores ready to start building organic visibility.',
    popular: false,
    features: [
      'Up to 50 products/SKUs optimised',
      'Technical SEO audit (quarterly)',
      '10 target keywords tracked',
      'Product & category page optimisation',
      'Google Merchant Centre audit',
      'Basic schema markup (Product)',
      'Monthly rank tracking report',
      'Email support (48hr response)',
    ],
  },
  {
    name: 'Growth',
    slug: 'growth',
    monthlyPrice: 999,
    yearlyPrice: 829,
    yearlySave: 2040,
    desc: 'For growing stores that need SEO, content, and link building working together.',
    popular: true,
    features: [
      'Up to 200 products/SKUs optimised',
      'Full technical SEO (monthly)',
      '30 target keywords tracked',
      'Product & category page optimisation',
      'Schema markup (Product, Review, Breadcrumb)',
      '2 SEO blog posts per month',
      '5 link placements per month',
      'Google Shopping feed optimisation',
      'Monthly competitor analysis',
      'Conversion rate recommendations',
      'Fortnightly reporting',
      'Priority support (24hr response)',
    ],
  },
  {
    name: 'Pro',
    slug: 'pro',
    monthlyPrice: 1799,
    yearlyPrice: 1499,
    yearlySave: 3600,
    desc: 'For established stores scaling SEO across large catalogues and multiple markets.',
    popular: false,
    features: [
      'Unlimited products/SKUs',
      'Advanced technical SEO (weekly monitoring)',
      '60+ keywords tracked',
      'Full content strategy & execution',
      'Full schema suite',
      '4 SEO blog posts per month',
      '12 link placements per month',
      'Google Shopping + Performance Max',
      'International SEO (up to 3 markets)',
      'Quarterly CRO audit',
      'Dedicated account manager',
      'Weekly reporting',
      'Phone + priority support',
    ],
  },
];

const FAQS = [
  { q: 'What is ecommerce SEO and why does it matter?', a: 'Ecommerce SEO is the process of optimising your online store to rank higher in Google\'s organic search results — attracting shoppers who are actively searching for the products you sell. Unlike paid ads which stop generating traffic when you stop paying, organic rankings from ecommerce SEO compound over time: the more authority and content you build, the more traffic you attract for free. For an ecommerce business, ranking page 1 for high-intent product keywords can be the difference between a profitable business and one dependent entirely on paid traffic.' },
  { q: 'How long before ecommerce SEO starts working?', a: 'Ecommerce SEO results follow a predictable curve: Technical fixes and on-page optimisations can improve crawling and indexing within 2 to 4 weeks. Meaningful ranking improvements for targeted keywords typically appear within 3 to 6 months. Significant organic traffic and revenue growth is usually visible by month 6 to 12. New domains with no authority take longer; established stores with existing rankings see improvements faster. We set specific, realistic milestones during onboarding based on your current organic performance baseline.' },
  { q: 'What is the difference between ecommerce SEO and regular SEO?', a: 'Ecommerce SEO has several distinct challenges that general SEO does not: large numbers of product and category pages that need to be individually optimised; duplicate content risks from product variants, filters, and pagination; complex faceted navigation that can create crawl budget issues; schema markup requirements (Product, Review, Offer) that affect how Google displays your results; Google Shopping and Merchant Centre feed optimisation; and the need to balance informational content (blog) with transactional category and product pages. Our ecommerce SEO packages are built specifically around these challenges — not adapted from a generic SEO framework.' },
  { q: 'Do you optimise individual product pages?', a: 'Yes. Product page optimisation is a core component of every package tier. This includes: keyword-optimised product titles and meta titles; compelling, keyword-rich product descriptions written for both search engines and human readers; schema markup (Product, Offer, Review) to enable rich results in Google; image alt text and file naming; URL structure recommendations; and internal linking from category pages. The number of products optimised per month scales with your package tier — from 50 SKUs on Starter to unlimited on Pro.' },
  { q: 'Is link building included in ecommerce SEO packages?', a: 'Link building is included in the Growth and Pro packages. Growth includes 5 link placements per month and Pro includes 12 per month — all from DR50+ niche-relevant sites using manual outreach (no link farms, PBNs, or spammy directories). The Starter package does not include active link building as the focus is on technical and on-page foundations, though it includes a Google Merchant Centre audit and the infrastructure needed before link building is effective. Starter clients can add standalone link building from our link building packages.' },
  { q: 'Do I need to give you access to my website?', a: 'Yes — we need read and write access to implement on-page optimisations, technical fixes, and content changes. We work with Shopify, WooCommerce, Magento, BigCommerce, and most major ecommerce platforms. For platforms where direct access is not possible or desired, we can provide detailed implementation instructions for your development team to action. We also need Google Search Console and Google Analytics 4 access to monitor performance — we will request these during onboarding.' },
  { q: 'Can I switch plans or cancel?', a: 'Yes. You can upgrade your plan at any time and the change takes effect from the next billing cycle. Downgrades are processed at the next renewal date. Monthly contracts can be cancelled with 30 days notice. Annual contracts can be cancelled at the end of the annual term. There are no long-term lock-in requirements beyond the billing period you choose. We find that clients who stick with SEO for 12+ months see substantially compounding returns, which is why we offer a significant discount on annual packages.' },
  { q: 'What ecommerce platforms do you support?', a: 'We work with all major ecommerce platforms: Shopify and Shopify Plus; WooCommerce; Magento 2 (Adobe Commerce); BigCommerce; OpenCart; PrestaShop; Wix eCommerce; Squarespace Commerce; and custom-built platforms. Each platform has different technical SEO considerations — for example, Shopify\'s canonical URL handling, Magento\'s faceted navigation configuration, and WooCommerce\'s WordPress-specific optimisations. We apply platform-specific knowledge to every account rather than treating all sites the same.' },
];

const STATS = [
  { label: 'Ecommerce Stores', val: '180+' },
  { label: 'Avg Revenue Growth', val: '+62%' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Retention', val: '94%' },
];

const CHECK = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}><polyline points="20 6 9 17 4 12"/></svg>;

export default function EcommerceSeoPackages() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const faqRef = useRef(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Ecommerce SEO Packages', item: 'https://www.1solutions.biz/ecommerce-seo-packages/' },
      ]},
      { '@type': 'Service', name: 'Ecommerce SEO Packages', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Ecommerce SEO', url: 'https://www.1solutions.biz/ecommerce-seo-packages/',
        offers: PLANS.map(p => ({ '@type': 'Offer', name: `${p.name} Ecommerce SEO Package`, price: p.monthlyPrice, priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: p.monthlyPrice, priceCurrency: 'USD', unitText: 'month' } }))
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Ecommerce SEO Packages | Pricing Plans for Online Stores | 1Solutions</title>
        <meta name="description" content="Ecommerce SEO packages with transparent monthly and yearly pricing. Starter from $599/mo. Includes product page optimisation, technical SEO, content, and link building for Shopify, WooCommerce, and Magento." />
        <meta name="keywords" content="ecommerce seo packages, ecommerce seo pricing, ecommerce seo plans, shopify seo packages, woocommerce seo pricing, ecommerce seo services pricing" />
        <link rel="canonical" href="https://www.1solutions.biz/ecommerce-seo-packages/" />
        <meta property="og:title" content="Ecommerce SEO Packages & Pricing | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/ecommerce-seo-packages/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .ecseop-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .ecseop-page *,.ecseop-page *::before,.ecseop-page *::after{box-sizing:border-box}

          /* Hero */
          .ecseop-hero{background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 30%,#bfdbfe 65%,#eff6ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .ecseop-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(29,78,216,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .ecseop-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,138,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .ecseop-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .ecseop-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .ecseop-bc a{color:#6b7280;text-decoration:none}.ecseop-bc a:hover{color:#1D4ED8}.ecseop-bc span{color:#d1d5db}
          .ecseop-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(29,78,216,0.08);border:1px solid rgba(29,78,216,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#1D4ED8;margin-bottom:28px}
          .ecseop-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A8A 0%,#1D4ED8 50%,#1E40AF 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .ecseop-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:640px;margin:0 auto 36px}
          .ecseop-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .ecseop-btn-p{display:inline-flex;align-items:center;gap:8px;background:#1D4ED8;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(29,78,216,0.28)}
          .ecseop-btn-p:hover{background:#1E3A8A;box-shadow:0 8px 32px rgba(29,78,216,0.38);transform:translateY(-2px)}
          .ecseop-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .ecseop-btn-s:hover{border-color:#1D4ED8;color:#1D4ED8;transform:translateY(-2px)}
          .ecseop-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(29,78,216,0.07)}
          .ecseop-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(29,78,216,0.08)}.ecseop-stat:last-child{border-right:none}
          .ecseop-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .ecseop-stat-v{font-size:1.6rem;font-weight:900;color:#1D4ED8;letter-spacing:-0.5px}

          /* Pricing section */
          .ecseop-pricing{background:#f8fafd;padding:80px 40px}
          .ecseop-pricing-in{max-width:1280px;margin:0 auto}
          .ecseop-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1D4ED8;margin-bottom:10px;display:block}
          .ecseop-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A8A 0%,#1D4ED8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .ecseop-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:600px;margin-bottom:44px}

          /* Toggle */
          .ecseop-tog-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
          .ecseop-tog-lbl{font-size:15px;font-weight:600;color:#6b7280;transition:color 0.2s}
          .ecseop-tog-lbl.active{color:#0F1F40}
          .ecseop-tog-btn{width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background 0.25s;flex-shrink:0}
          .ecseop-tog-btn.on{background:#1D4ED8}
          .ecseop-tog-knob{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform 0.25s;box-shadow:0 1px 4px rgba(0,0,0,0.18)}
          .ecseop-tog-btn.on .ecseop-tog-knob{transform:translateX(22px)}
          .ecseop-save-badge{display:inline-flex;align-items:center;background:rgba(29,78,216,0.10);color:#1D4ED8;font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;margin-left:6px;letter-spacing:0.5px}

          /* Cards grid */
          .ecseop-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
          .ecseop-card{background:#fff;border:1.5px solid #e5e9f0;border-radius:24px;padding:32px 28px;position:relative;transition:box-shadow 0.22s,transform 0.22s;overflow:hidden}
          .ecseop-card:hover{box-shadow:0 12px 40px rgba(29,78,216,0.08)}
          .ecseop-card-pop{background:linear-gradient(135deg,#1E3A8A 0%,#1D4ED8 100%);border-color:transparent;transform:scale(1.04);box-shadow:0 20px 60px rgba(29,78,216,0.25)}
          .ecseop-card-pop:hover{transform:scale(1.04) translateY(-4px)}
          .ecseop-pop-tag{position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.20);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;letter-spacing:0.5px;border:1px solid rgba(255,255,255,0.30)}
          .ecseop-plan-name{font-size:22px;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .ecseop-card-pop .ecseop-plan-name{color:#fff}
          .ecseop-plan-desc{font-size:13px;color:#6b7280;line-height:1.55;margin-bottom:24px}
          .ecseop-card-pop .ecseop-plan-desc{color:rgba(255,255,255,0.75)}
          .ecseop-price-row{display:flex;align-items:baseline;gap:4px;margin-bottom:4px}
          .ecseop-currency{font-size:1.4rem;font-weight:700;color:#1D4ED8}
          .ecseop-card-pop .ecseop-currency{color:rgba(255,255,255,0.85)}
          .ecseop-amount{font-size:3rem;font-weight:900;letter-spacing:-2px;color:#0F1F40;line-height:1}
          .ecseop-card-pop .ecseop-amount{color:#fff}
          .ecseop-per{font-size:13px;color:#9ca3af;font-weight:500;margin-left:2px}
          .ecseop-card-pop .ecseop-per{color:rgba(255,255,255,0.65)}
          .ecseop-billed{font-size:12px;color:#9ca3af;margin-bottom:4px}
          .ecseop-card-pop .ecseop-billed{color:rgba(255,255,255,0.60)}
          .ecseop-save-line{font-size:12px;font-weight:700;color:#16a34a;margin-bottom:20px;min-height:18px}
          .ecseop-card-pop .ecseop-save-line{color:#86efac}
          .ecseop-cta-card{display:block;width:100%;text-align:center;padding:13px;border-radius:50px;font-weight:700;font-size:0.9rem;text-decoration:none;background:#1D4ED8;color:#fff;transition:all 0.22s;margin-bottom:24px}
          .ecseop-cta-card:hover{background:#1E3A8A;transform:translateY(-1px);box-shadow:0 6px 24px rgba(29,78,216,0.28)}
          .ecseop-card-pop .ecseop-cta-card{background:#fff;color:#1D4ED8}
          .ecseop-card-pop .ecseop-cta-card:hover{background:#eff6ff}
          .ecseop-divider{height:1px;background:#f1f5f9;margin-bottom:20px}
          .ecseop-card-pop .ecseop-divider{background:rgba(255,255,255,0.15)}
          .ecseop-feat-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
          .ecseop-feat-list li{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#374151;line-height:1.4}
          .ecseop-card-pop .ecseop-feat-list li{color:rgba(255,255,255,0.88)}
          .ecseop-feat-list li svg{color:#1D4ED8}
          .ecseop-card-pop .ecseop-feat-list li svg{color:#93c5fd}
          .ecseop-trust{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:32px;padding-top:32px;border-top:1px solid #e5e9f0}
          .ecseop-trust span{font-size:13px;color:#6b7280;display:flex;align-items:center;gap:6px;font-weight:500}

          /* FAQ */
          .ecseop-faq{background:#fff;padding:80px 40px}.ecseop-faq-in{max-width:860px;margin:0 auto}
          .ecseop-fitem{border-bottom:1px solid #e5e7eb}
          .ecseop-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .ecseop-fq:hover{color:#1D4ED8}
          .ecseop-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .ecseop-fitem.open .ecseop-ficon{border-color:#1D4ED8;color:#1D4ED8;background:rgba(29,78,216,0.06)}
          .ecseop-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .ecseop-fitem.open .ecseop-fa{max-height:600px;padding-bottom:22px}

          /* CTA */
          .ecseop-cta{background:linear-gradient(135deg,rgba(29,78,216,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(30,58,138,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .ecseop-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(29,78,216,0.10) 0%,transparent 70%);pointer-events:none}
          .ecseop-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,138,0.08) 0%,transparent 70%);pointer-events:none}
          .ecseop-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .ecseop-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#1E3A8A 0%,#1D4ED8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .ecseop-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}

          @media(max-width:1024px){.ecseop-cards{grid-template-columns:1fr;max-width:480px;margin:0 auto}.ecseop-card-pop{transform:none}.ecseop-card-pop:hover{transform:translateY(-4px)}}
          @media(max-width:768px){.ecseop-hero,.ecseop-pricing,.ecseop-faq,.ecseop-cta{padding:60px 24px}.ecseop-hero{padding-top:60px;padding-bottom:0}.ecseop-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.ecseop-stat:nth-child(2){border-right:none}.ecseop-btns{flex-direction:column;align-items:center}.ecseop-trust{gap:16px}}
        `}</style>
      </Head>

      <div className="ecseop-page">
        {/* Hero */}
        <section className="ecseop-hero"><div className="ecseop-o1"/><div className="ecseop-o2"/>
          <div className="ecseop-in">
            <nav className="ecseop-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#1D4ED8'}}>Ecommerce SEO Packages</span></nav>
            <span className="ecseop-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#1D4ED8',display:'inline-block'}}/> Transparent Pricing · No Contracts</span>
            <h1 className="ecseop-h1">Ecommerce SEO Packages — Grow Organic Revenue from Your Online Store</h1>
            <p className="ecseop-sub">Specialist ecommerce SEO packages for Shopify, WooCommerce, and Magento stores — product page optimisation, technical SEO, content, and link building in one coordinated plan.</p>
            <div className="ecseop-btns">
              <Link href="/contact" className="ecseop-btn-p">Talk to an Ecommerce SEO Specialist <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/ecommerce-seo-services" className="ecseop-btn-s">Ecommerce SEO Overview</Link>
            </div>
            <div className="ecseop-stats">{STATS.map(s => <div key={s.label} className="ecseop-stat"><div className="ecseop-stat-l">{s.label}</div><div className="ecseop-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>

        {/* Pricing */}
        <section className="ecseop-pricing">
          <div className="ecseop-pricing-in">
            <span className="ecseop-ey2" style={{textAlign:'center',display:'block'}}>Pricing Plans</span>
            <h2 className="ecseop-ttl" style={{textAlign:'center',marginLeft:'auto',marginRight:'auto',maxWidth:700}}>Choose Your Ecommerce SEO Package</h2>
            <p className="ecseop-desc" style={{margin:'0 auto 44px',textAlign:'center'}}>All packages include a dedicated account manager, monthly reporting, and a 30-day onboarding plan. No setup fee. Cancel anytime on monthly.</p>

            {/* Toggle */}
            <div className="ecseop-tog-row">
              <span className={`ecseop-tog-lbl${!isYearly?' active':''}`}>Monthly</span>
              <button className={`ecseop-tog-btn${isYearly?' on':''}`} onClick={()=>setIsYearly(!isYearly)} aria-label="Toggle billing period"><span className="ecseop-tog-knob"/></button>
              <span className={`ecseop-tog-lbl${isYearly?' active':''}`}>Yearly <span className="ecseop-save-badge">Save 17%</span></span>
            </div>

            {/* Cards */}
            <div className="ecseop-cards">
              {PLANS.map(plan => (
                <div key={plan.slug} className={`ecseop-card${plan.popular?' ecseop-card-pop':''}`}>
                  {plan.popular && <span className="ecseop-pop-tag">Most Popular</span>}
                  <div className="ecseop-plan-name">{plan.name}</div>
                  <p className="ecseop-plan-desc">{plan.desc}</p>
                  <div className="ecseop-price-row">
                    <span className="ecseop-currency">$</span>
                    <span className="ecseop-amount">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    <span className="ecseop-per">/mo</span>
                  </div>
                  <div className="ecseop-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  <div className="ecseop-save-line">{isYearly ? `Save $${plan.yearlySave.toLocaleString()} per year` : ' '}</div>
                  <Link href="/contact" className="ecseop-cta-card">Get Started →</Link>
                  <div className="ecseop-divider"/>
                  <ul className="ecseop-feat-list">
                    {plan.features.map(f => <li key={f}>{CHECK}<span>{f}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Trust signals */}
            <div className="ecseop-trust">
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> No setup fee</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Cancel monthly anytime with 30 days notice</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Dedicated account manager on all plans</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Custom Enterprise plans available</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="ecseop-faq"><div className="ecseop-faq-in">
          <span className="ecseop-ey2">Common Questions</span>
          <h2 className="ecseop-ttl">Ecommerce SEO Package FAQs</h2>
          <p className="ecseop-desc" style={{marginBottom:44}}>Everything you need to know before choosing an ecommerce SEO package.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`ecseop-fitem${openFaq===i?' open':''}`}><button className="ecseop-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="ecseop-ficon">{openFaq===i?'−':'+'}</span></button><div className="ecseop-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>

        {/* CTA */}
        <section className="ecseop-cta"><div className="ecseop-cta-o1"/><div className="ecseop-cta-o2"/>
          <div className="ecseop-cta-in">
            <span className="ecseop-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Not sure which package is right for you?</span>
            <h2 className="ecseop-cta-t">Get a Free Ecommerce SEO Audit</h2>
            <p className="ecseop-cta-s">We&rsquo;ll review your store&rsquo;s current SEO health, identify your biggest growth opportunities, and recommend the right package for your revenue targets — for free.</p>
            <div className="ecseop-btns">
              <Link href="/contact" className="ecseop-btn-p">Request a Free SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/local-seo-packages" className="ecseop-btn-s">Local SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
