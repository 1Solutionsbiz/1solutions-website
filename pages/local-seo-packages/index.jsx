import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    slug: 'starter',
    monthlyPrice: 349,
    yearlyPrice: 289,
    yearlySave: 720,
    desc: 'For single-location businesses starting with local SEO.',
    popular: false,
    features: [
      '1 location',
      'Google Business Profile optimisation',
      '5 local keywords tracked',
      '25 citation audit & cleanup',
      '4 GBP posts per month',
      'Review monitoring & alerts',
      'Local rank tracking report',
      'Monthly performance report',
    ],
  },
  {
    name: 'Growth',
    slug: 'growth',
    monthlyPrice: 599,
    yearlyPrice: 499,
    yearlySave: 1200,
    desc: 'For businesses ready to dominate local search in their area.',
    popular: true,
    features: [
      '1 location',
      'Google Business Profile fully managed',
      '15 local keywords tracked',
      '50 citations built + full cleanup',
      '8 GBP posts per month',
      'Review generation strategy',
      '3 local link placements per month',
      '1 local landing page per month',
      'Monthly competitor tracking',
      'Monthly report + strategy call',
    ],
  },
  {
    name: 'Multi-Location',
    slug: 'multi-location',
    monthlyPrice: 999,
    yearlyPrice: 829,
    yearlySave: 2040,
    desc: 'For businesses with multiple branches needing coordinated local SEO.',
    popular: false,
    features: [
      'Up to 3 locations',
      'All GBP profiles fully managed',
      '30+ keywords across all locations',
      '100 citations per month (all locations)',
      '12 GBP posts per month per location',
      'Full review management & responses',
      '6 local link placements per month',
      'Local landing page strategy',
      'Dedicated account manager',
      'Fortnightly report + strategy call',
    ],
  },
];

const FAQS = [
  { q: 'What is local SEO and who needs it?', a: 'Local SEO is the process of optimising your online presence to appear in Google\'s local search results — the map pack, local organic results, and Google Business Profile listings that appear when someone searches for a service "near me" or in a specific city. Any business that serves customers in a defined geographic area needs local SEO: restaurants, dental practices, law firms, plumbers, electricians, home services, retail shops, gyms, accountants, estate agents, and any other business where location matters to the customer. If your customers are local, local SEO is how they find you online.' },
  { q: 'How long does local SEO take to show results?', a: 'Local SEO results follow a predictable timeline: Google Business Profile optimisation improvements (better photos, updated info, posts) can produce visible improvements in profile views and actions within 2 to 4 weeks. Map pack ranking improvements for target keywords are typically visible within 4 to 12 weeks. Citation building effects on local authority compound over 2 to 4 months. Organic local results (website ranking in local searches) typically improve over 3 to 6 months. Businesses starting from zero GBP activity or poor citation health will see the most dramatic early improvements — the more broken your local presence currently is, the faster the initial gains.' },
  { q: 'What is Google Business Profile (GBP) management?', a: 'Google Business Profile (formerly Google My Business) is the listing that appears in Google Maps and the local map pack when someone searches for your business or services nearby. GBP management includes: initial profile completion and optimisation (name, address, phone, website, hours, categories, description, photos, services); regular post creation (promotions, events, updates, offers — 4 to 12 per month depending on your plan); Q&A monitoring and response; review monitoring and response guidance; service area optimisation; product/menu additions where relevant; and ongoing profile health checks to fix suspensions or inconsistencies. An active, fully optimised GBP is the single most important factor in local map pack rankings.' },
  { q: 'What are local citations and why do they matter?', a: 'Local citations are mentions of your business name, address, and phone number (NAP) on other websites — business directories, review sites, local listings, and data aggregators like Yext, Bing Places, Apple Maps, and industry-specific directories. Citations matter for two reasons: they provide additional signals to Google confirming your business\'s name, location, and legitimacy; and they are a direct source of referral traffic and customer discovery on directories like Yelp, Thomson Local, and industry-specific sites. Inconsistent NAP information across citations (different address formats, old phone numbers) actively hurts local rankings — citation cleanup to ensure consistency is one of the fastest-acting local SEO improvements.' },
  { q: 'Do you manage Google reviews?', a: 'Yes. Review management is included in all packages. Our approach: Starter includes review monitoring (alerts when new reviews are posted) and guidance on responding. Growth and Multi-Location include active review response management (we respond to all reviews in your brand voice) and a review generation strategy (customer communication sequences, QR code tools, and post-visit follow-up systems that proactively encourage satisfied customers to leave reviews). Reviews are one of the most significant ranking factors in the Google local map pack, and a proactive review generation strategy can dramatically accelerate local ranking improvements.' },
  { q: 'Can you manage SEO for multiple business locations?', a: 'Yes. Our Multi-Location package manages up to 3 locations under one plan. For each location, we manage a separate Google Business Profile, track location-specific keywords, build location-specific citations, create location-specific landing pages on your website, and report on each location\'s performance individually. For businesses with more than 3 locations, we offer a custom enterprise local SEO plan priced based on total location count and scope. Managing multiple locations under one coordinated strategy (consistent brand voice, shared review approach, coordinated citation profiles) produces better results than treating each location as a separate project.' },
  { q: 'What are local landing pages?', a: 'Local landing pages are dedicated pages on your website targeting a specific service + location combination — for example, "plumber in Manchester" or "dental practice in Leeds." These pages are optimised for local keywords, include location-specific content (not just city name swaps), embed a Google Map, include local schema markup (LocalBusiness), and link to your Google Business Profile. A well-built network of local landing pages is the foundation of strong organic local rankings — without them, your website can\'t rank for location-specific searches even if your GBP is excellent. Growth package includes 1 local landing page per month; Multi-Location includes a full local landing page strategy across all locations.' },
  { q: 'What is included in the monthly local SEO report?', a: 'Our monthly local SEO report covers: Google Business Profile performance (profile views, direction requests, website clicks, call clicks); local keyword rank tracking (positions in map pack and organic results for all tracked keywords); review summary (new reviews, average star rating, response rate); citation progress (new citations built, inconsistencies resolved); GBP post performance; any technical issues or algorithm updates affecting local rankings; and next month\'s priorities. Growth and Multi-Location packages include a monthly call to walk through the report and align on strategy. All reports are delivered in a clear, client-friendly format — no jargon, just results.' },
];

const STATS = [
  { label: 'Local Businesses', val: '300+' },
  { label: 'Map Pack Appearances', val: 'Top 3 avg' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Retention', val: '93%' },
];

const CHECK = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}><polyline points="20 6 9 17 4 12"/></svg>;

export default function LocalSeoPackages() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Local SEO Packages', item: 'https://www.1solutions.biz/local-seo-packages/' },
      ]},
      { '@type': 'Service', name: 'Local SEO Packages', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Local SEO', url: 'https://www.1solutions.biz/local-seo-packages/',
        offers: PLANS.map(p => ({ '@type': 'Offer', name: `${p.name} Local SEO Package`, price: p.monthlyPrice, priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: p.monthlyPrice, priceCurrency: 'USD', unitText: 'month' } }))
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Local SEO Packages | Monthly Local SEO Pricing Plans | 1Solutions</title>
        <meta name="description" content="Local SEO packages with transparent monthly and yearly pricing. Starter from $349/mo. GBP management, citation building, review management, and local link building for single and multi-location businesses." />
        <meta name="keywords" content="local seo packages, local seo pricing, local seo plans, google business profile management, local seo services pricing, monthly local seo, multi-location seo packages" />
        <link rel="canonical" href="https://www.1solutions.biz/local-seo-packages/" />
        <meta property="og:title" content="Local SEO Packages & Pricing | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/local-seo-packages/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .lseopkg-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .lseopkg-page *,.lseopkg-page *::before,.lseopkg-page *::after{box-sizing:border-box}
          .lseopkg-hero{background:linear-gradient(135deg,#ecfeff 0%,#cffafe 30%,#a5f3fc 65%,#ecfeff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .lseopkg-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(8,145,178,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .lseopkg-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(22,78,99,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .lseopkg-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .lseopkg-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .lseopkg-bc a{color:#6b7280;text-decoration:none}.lseopkg-bc a:hover{color:#0891B2}.lseopkg-bc span{color:#d1d5db}
          .lseopkg-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(8,145,178,0.08);border:1px solid rgba(8,145,178,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0891B2;margin-bottom:28px}
          .lseopkg-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#164E63 0%,#0891B2 50%,#0E7490 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .lseopkg-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:640px;margin:0 auto 36px}
          .lseopkg-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .lseopkg-btn-p{display:inline-flex;align-items:center;gap:8px;background:#0891B2;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(8,145,178,0.28)}
          .lseopkg-btn-p:hover{background:#164E63;box-shadow:0 8px 32px rgba(8,145,178,0.38);transform:translateY(-2px)}
          .lseopkg-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .lseopkg-btn-s:hover{border-color:#0891B2;color:#0891B2;transform:translateY(-2px)}
          .lseopkg-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(8,145,178,0.07)}
          .lseopkg-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(8,145,178,0.08)}.lseopkg-stat:last-child{border-right:none}
          .lseopkg-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .lseopkg-stat-v{font-size:1.6rem;font-weight:900;color:#0891B2;letter-spacing:-0.5px}
          .lseopkg-pricing{background:#f8fafd;padding:80px 40px}
          .lseopkg-pricing-in{max-width:1280px;margin:0 auto}
          .lseopkg-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0891B2;margin-bottom:10px;display:block}
          .lseopkg-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#164E63 0%,#0891B2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .lseopkg-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:600px;margin-bottom:44px}
          .lseopkg-tog-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
          .lseopkg-tog-lbl{font-size:15px;font-weight:600;color:#6b7280;transition:color 0.2s}
          .lseopkg-tog-lbl.active{color:#0F1F40}
          .lseopkg-tog-btn{width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background 0.25s;flex-shrink:0}
          .lseopkg-tog-btn.on{background:#0891B2}
          .lseopkg-tog-knob{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform 0.25s;box-shadow:0 1px 4px rgba(0,0,0,0.18)}
          .lseopkg-tog-btn.on .lseopkg-tog-knob{transform:translateX(22px)}
          .lseopkg-save-badge{display:inline-flex;align-items:center;background:rgba(8,145,178,0.10);color:#0891B2;font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;margin-left:6px}
          .lseopkg-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
          .lseopkg-card{background:#fff;border:1.5px solid #e5e9f0;border-radius:24px;padding:32px 28px;position:relative;transition:box-shadow 0.22s,transform 0.22s;overflow:hidden}
          .lseopkg-card:hover{box-shadow:0 12px 40px rgba(8,145,178,0.08)}
          .lseopkg-card-pop{background:linear-gradient(135deg,#164E63 0%,#0891B2 100%);border-color:transparent;transform:scale(1.04);box-shadow:0 20px 60px rgba(8,145,178,0.25)}
          .lseopkg-card-pop:hover{transform:scale(1.04) translateY(-4px)}
          .lseopkg-pop-tag{position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.20);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;letter-spacing:0.5px;border:1px solid rgba(255,255,255,0.30)}
          .lseopkg-plan-name{font-size:22px;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .lseopkg-card-pop .lseopkg-plan-name{color:#fff}
          .lseopkg-plan-desc{font-size:13px;color:#6b7280;line-height:1.55;margin-bottom:24px}
          .lseopkg-card-pop .lseopkg-plan-desc{color:rgba(255,255,255,0.75)}
          .lseopkg-price-row{display:flex;align-items:baseline;gap:4px;margin-bottom:4px}
          .lseopkg-currency{font-size:1.4rem;font-weight:700;color:#0891B2}
          .lseopkg-card-pop .lseopkg-currency{color:rgba(255,255,255,0.85)}
          .lseopkg-amount{font-size:3rem;font-weight:900;letter-spacing:-2px;color:#0F1F40;line-height:1}
          .lseopkg-card-pop .lseopkg-amount{color:#fff}
          .lseopkg-per{font-size:13px;color:#9ca3af;font-weight:500;margin-left:2px}
          .lseopkg-card-pop .lseopkg-per{color:rgba(255,255,255,0.65)}
          .lseopkg-billed{font-size:12px;color:#9ca3af;margin-bottom:4px}
          .lseopkg-card-pop .lseopkg-billed{color:rgba(255,255,255,0.60)}
          .lseopkg-save-line{font-size:12px;font-weight:700;color:#16a34a;margin-bottom:20px;min-height:18px}
          .lseopkg-card-pop .lseopkg-save-line{color:#86efac}
          .lseopkg-cta-card{display:block;width:100%;text-align:center;padding:13px;border-radius:50px;font-weight:700;font-size:0.9rem;text-decoration:none;background:#0891B2;color:#fff;transition:all 0.22s;margin-bottom:24px}
          .lseopkg-cta-card:hover{background:#164E63;transform:translateY(-1px);box-shadow:0 6px 24px rgba(8,145,178,0.28)}
          .lseopkg-card-pop .lseopkg-cta-card{background:#fff;color:#0891B2}
          .lseopkg-card-pop .lseopkg-cta-card:hover{background:#ecfeff}
          .lseopkg-divider{height:1px;background:#f1f5f9;margin-bottom:20px}
          .lseopkg-card-pop .lseopkg-divider{background:rgba(255,255,255,0.15)}
          .lseopkg-feat-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
          .lseopkg-feat-list li{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#374151;line-height:1.4}
          .lseopkg-card-pop .lseopkg-feat-list li{color:rgba(255,255,255,0.88)}
          .lseopkg-feat-list li svg{color:#0891B2}
          .lseopkg-card-pop .lseopkg-feat-list li svg{color:#a5f3fc}
          .lseopkg-trust{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:32px;padding-top:32px;border-top:1px solid #e5e9f0}
          .lseopkg-trust span{font-size:13px;color:#6b7280;display:flex;align-items:center;gap:6px;font-weight:500}
          .lseopkg-faq{background:#fff;padding:80px 40px}.lseopkg-faq-in{max-width:860px;margin:0 auto}
          .lseopkg-fitem{border-bottom:1px solid #e5e7eb}
          .lseopkg-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .lseopkg-fq:hover{color:#0891B2}
          .lseopkg-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .lseopkg-fitem.open .lseopkg-ficon{border-color:#0891B2;color:#0891B2;background:rgba(8,145,178,0.06)}
          .lseopkg-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .lseopkg-fitem.open .lseopkg-fa{max-height:600px;padding-bottom:22px}
          .lseopkg-cta{background:linear-gradient(135deg,rgba(8,145,178,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(22,78,99,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .lseopkg-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(8,145,178,0.10) 0%,transparent 70%);pointer-events:none}
          .lseopkg-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(22,78,99,0.08) 0%,transparent 70%);pointer-events:none}
          .lseopkg-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .lseopkg-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#164E63 0%,#0891B2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .lseopkg-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.lseopkg-cards{grid-template-columns:1fr;max-width:480px;margin:0 auto}.lseopkg-card-pop{transform:none}.lseopkg-card-pop:hover{transform:translateY(-4px)}}
          @media(max-width:768px){.lseopkg-hero,.lseopkg-pricing,.lseopkg-faq,.lseopkg-cta{padding:60px 24px}.lseopkg-hero{padding-top:60px;padding-bottom:0}.lseopkg-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.lseopkg-stat:nth-child(2){border-right:none}.lseopkg-btns{flex-direction:column;align-items:center}.lseopkg-trust{gap:16px}}
        `}</style>
      </Head>

      <div className="lseopkg-page">
        <section className="lseopkg-hero"><div className="lseopkg-o1"/><div className="lseopkg-o2"/>
          <div className="lseopkg-in">
            <nav className="lseopkg-bc"><Link href="/">Home</Link><span>/</span><Link href="/local-seo-services">Local SEO</Link><span>/</span><span style={{color:'#0891B2'}}>Local SEO Packages</span></nav>
            <span className="lseopkg-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#0891B2',display:'inline-block'}}/> GBP Management · Citations · Reviews · Local Links</span>
            <h1 className="lseopkg-h1">Local SEO Packages — Rank Higher in Google Maps & Local Search</h1>
            <p className="lseopkg-sub">Transparent local SEO pricing for single and multi-location businesses — Google Business Profile management, citation building, review strategies, and local link building in one monthly plan.</p>
            <div className="lseopkg-btns">
              <Link href="/contact" className="lseopkg-btn-p">Talk to a Local SEO Specialist <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/local-seo-services" className="lseopkg-btn-s">Local SEO Overview</Link>
            </div>
            <div className="lseopkg-stats">{STATS.map(s => <div key={s.label} className="lseopkg-stat"><div className="lseopkg-stat-l">{s.label}</div><div className="lseopkg-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>

        <section className="lseopkg-pricing">
          <div className="lseopkg-pricing-in">
            <span className="lseopkg-ey2" style={{textAlign:'center',display:'block'}}>Pricing Plans</span>
            <h2 className="lseopkg-ttl" style={{textAlign:'center',marginLeft:'auto',marginRight:'auto',maxWidth:700}}>Choose Your Local SEO Package</h2>
            <p className="lseopkg-desc" style={{margin:'0 auto 44px',textAlign:'center'}}>Every package includes Google Business Profile management, citation work, and monthly reporting. No setup fee. Multi-location custom plans available for 4+ locations.</p>

            <div className="lseopkg-tog-row">
              <span className={`lseopkg-tog-lbl${!isYearly?' active':''}`}>Monthly</span>
              <button className={`lseopkg-tog-btn${isYearly?' on':''}`} onClick={()=>setIsYearly(!isYearly)} aria-label="Toggle billing period"><span className="lseopkg-tog-knob"/></button>
              <span className={`lseopkg-tog-lbl${isYearly?' active':''}`}>Yearly <span className="lseopkg-save-badge">Save 17%</span></span>
            </div>

            <div className="lseopkg-cards">
              {PLANS.map(plan => (
                <div key={plan.slug} className={`lseopkg-card${plan.popular?' lseopkg-card-pop':''}`}>
                  {plan.popular && <span className="lseopkg-pop-tag">Most Popular</span>}
                  <div className="lseopkg-plan-name">{plan.name}</div>
                  <p className="lseopkg-plan-desc">{plan.desc}</p>
                  <div className="lseopkg-price-row">
                    <span className="lseopkg-currency">$</span>
                    <span className="lseopkg-amount">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    <span className="lseopkg-per">/mo</span>
                  </div>
                  <div className="lseopkg-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  <div className="lseopkg-save-line">{isYearly ? `Save $${plan.yearlySave.toLocaleString()} per year` : ' '}</div>
                  <Link href="/contact" className="lseopkg-cta-card">Get Started →</Link>
                  <div className="lseopkg-divider"/>
                  <ul className="lseopkg-feat-list">
                    {plan.features.map(f => <li key={f}>{CHECK}<span>{f}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div className="lseopkg-trust">
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> No setup fee</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Cancel monthly with 30 days notice</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Custom plans for 4+ locations</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> All plans include GBP management</span>
            </div>
          </div>
        </section>

        <section className="lseopkg-faq"><div className="lseopkg-faq-in">
          <span className="lseopkg-ey2">Common Questions</span>
          <h2 className="lseopkg-ttl">Local SEO Package FAQs</h2>
          <p className="lseopkg-desc" style={{marginBottom:44}}>Everything you need to know about local SEO packages before choosing a plan.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`lseopkg-fitem${openFaq===i?' open':''}`}><button className="lseopkg-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="lseopkg-ficon">{openFaq===i?'−':'+'}</span></button><div className="lseopkg-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>

        <section className="lseopkg-cta"><div className="lseopkg-cta-o1"/><div className="lseopkg-cta-o2"/>
          <div className="lseopkg-cta-in">
            <span className="lseopkg-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Not sure which local SEO plan fits your business?</span>
            <h2 className="lseopkg-cta-t">Get a Free Local SEO Audit</h2>
            <p className="lseopkg-cta-s">We&rsquo;ll review your Google Business Profile health, citation consistency, review profile, and local ranking positions — and recommend the right package for your market.</p>
            <div className="lseopkg-btns">
              <Link href="/contact" className="lseopkg-btn-p">Request a Free Local SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/link-building-packages" className="lseopkg-btn-s">Link Building Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
