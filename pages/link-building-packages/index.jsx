import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    slug: 'starter',
    monthlyPrice: 499,
    yearlyPrice: 415,
    yearlySave: 1008,
    desc: 'For businesses starting to build domain authority with quality backlinks.',
    popular: false,
    features: [
      '5 high-DA links per month',
      'DR40+ domains only',
      'Guest post placements',
      'Manual outreach',
      'Niche-relevant sites',
      'Anchor text optimisation',
      'Monthly link delivery report',
      'Google Sheets live tracker',
    ],
  },
  {
    name: 'Growth',
    slug: 'growth',
    monthlyPrice: 899,
    yearlyPrice: 749,
    yearlySave: 1800,
    desc: 'For businesses serious about building authority through diverse, high-quality links.',
    popular: true,
    features: [
      '12 high-DA links per month',
      'DR50+ domains',
      'Guest posts + niche edits',
      'Manual outreach + relationship building',
      'Niche-relevant sites',
      'Full anchor text strategy',
      'Competitor backlink gap analysis',
      'Disavow audit (if needed)',
      'Monthly link report + review call',
      'Live link tracker dashboard',
    ],
  },
  {
    name: 'Authority',
    slug: 'authority',
    monthlyPrice: 1499,
    yearlyPrice: 1249,
    yearlySave: 3000,
    desc: 'For competitive industries needing scale, premium placements, and digital PR.',
    popular: false,
    features: [
      '25 high-DA links per month',
      'DR60+ domains',
      'Guest posts + niche edits + digital PR',
      'Premium publication placements',
      'Full link profile strategy',
      'Monthly competitor gap analysis',
      'Ongoing disavow management',
      'Custom anchor text map',
      'Monthly report + strategy call',
      'Dedicated link building strategist',
    ],
  },
];

const FAQS = [
  { q: 'What is link building and why does it matter for SEO?', a: 'Link building is the process of acquiring hyperlinks from other websites that point back to yours. Google treats these backlinks as votes of confidence — a link from a credible, high-authority site signals to Google that your content is trustworthy and valuable. The number and quality of backlinks pointing to your domain is one of the strongest ranking factors in Google\'s algorithm. Without a strong backlink profile, it is very difficult to rank competitively for high-value keywords, regardless of how well your on-page content is optimised. Quality link building builds the domain authority needed to compete in your market.' },
  { q: 'What is Domain Rating (DR) and why does it matter?', a: 'Domain Rating (DR) is a metric developed by Ahrefs that measures the strength of a website\'s backlink profile on a scale from 0 to 100. A higher DR indicates a stronger, more authoritative domain. In our packages, we specify minimum DR thresholds (DR40+, DR50+, DR60+) to ensure the links we build come from genuinely authoritative websites rather than low-quality sites that could harm your profile. We use DR alongside other qualitative signals — niche relevance, organic traffic, editorial standards — to evaluate each prospective link placement site before outreach.' },
  { q: 'What types of links do you build?', a: 'We build two primary types of links: Guest posts — original content written and published on third-party websites in your niche, with a contextual link back to your site. Niche edits — placements of your link within existing, already-indexed content on relevant authority sites (also called link insertions). On the Authority package, we also pursue digital PR placements — coverage in online publications, news sites, and industry media. We do not build links from link farms, private blog networks (PBNs), spammy directories, or any other low-quality sources. All links are acquired through genuine editorial relationships and manual outreach.' },
  { q: 'How long does it take to see results from link building?', a: 'Link building results take time to manifest because Google needs to crawl and index the new links, and then the domain authority gains need to translate to ranking improvements. Typically: new links start being indexed within 2 to 6 weeks of placement; domain authority improvements are visible within 2 to 4 months of consistent link building; ranking improvements for target keywords are typically observable within 3 to 6 months; significant organic traffic growth from the improved rankings occurs within 6 to 9 months. Link building compounds over time — a consistent monthly programme delivers exponentially better results at 12 months than at 3 months.' },
  { q: 'Can I see the links you build each month?', a: 'Yes. Every link we build is documented in your dedicated live link tracker (Google Sheets or dashboard). The monthly report includes: the URL of the page where your link appears; the anchor text used; the DR of the linking domain; the estimated organic traffic of the linking page; the date the link went live; and the target page on your site that received the link. You have full visibility into every link placed — nothing is hidden or summarised at a high level. The Growth and Authority packages also include a monthly call to review the links and align on strategy for the next month.' },
  { q: 'Is link building safe? Will it hurt my site?', a: 'White-hat link building using manual outreach and editorial placements on genuine websites is safe and is exactly what Google recommends. The risks come from low-quality tactics: buying links from link farms, using PBNs, creating spammy directory submissions, or participating in link exchange schemes. These are tactics we never use. All links we build are from real websites with genuine organic traffic, editorial standards, and topical relevance to your niche. If you have previously received a manual penalty from Google for unnatural links, we include a disavow audit in Growth and above packages to help clean up a damaged profile before building new links.' },
  { q: 'Do you build links for any industry or niche?', a: 'We build links across most industries, including B2B, ecommerce, SaaS, professional services, home services, healthcare (non-YMYL medical advice), legal, finance, education, technology, and lifestyle. Some industries are harder to build links in due to limited publication options (highly technical industrial niches) or editorial restrictions (pharmaceutical, gambling, adult). We will advise honestly during scoping if your niche presents specific challenges and adjust the strategy accordingly. For highly competitive niches like finance or legal, DR thresholds are more important and we recommend Growth or Authority packages.' },
  { q: 'Can I combine link building with an SEO package?', a: 'Yes. Link building works best as part of a coordinated SEO strategy rather than in isolation. When link building is combined with on-page SEO, technical optimisation, and content creation, the authority gains translate to ranking improvements much more efficiently. Our ecommerce SEO and managed SEO packages include link building as a component — if you are already on one of those packages, you may not need a standalone link building package. If you have an existing in-house SEO team handling on-page work but need external link building expertise, our standalone packages are the right fit.' },
];

const STATS = [
  { label: 'Links Built', val: '50,000+' },
  { label: 'Avg Domain Rating', val: 'DR50+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Retention', val: '92%' },
];

const CHECK = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}><polyline points="20 6 9 17 4 12"/></svg>;

export default function LinkBuildingPackages() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Link Building Packages', item: 'https://www.1solutions.biz/link-building-packages/' },
      ]},
      { '@type': 'Service', name: 'Link Building Packages', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Link Building', url: 'https://www.1solutions.biz/link-building-packages/',
        offers: PLANS.map(p => ({ '@type': 'Offer', name: `${p.name} Link Building Package`, price: p.monthlyPrice, priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: p.monthlyPrice, priceCurrency: 'USD', unitText: 'month' } }))
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Link Building Packages | Monthly Backlink Plans & Pricing | 1Solutions</title>
        <meta name="description" content="Link building packages with transparent monthly and yearly pricing. Starter from $499/mo. Manual outreach, DR40+ to DR60+ guest posts, niche edits, and digital PR for any industry." />
        <meta name="keywords" content="link building packages, link building pricing, link building plans, backlink packages, guest post packages, link building service pricing, monthly link building" />
        <link rel="canonical" href="https://www.1solutions.biz/link-building-packages/" />
        <meta property="og:title" content="Link Building Packages & Pricing | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/link-building-packages/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .lbp-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .lbp-page *,.lbp-page *::before,.lbp-page *::after{box-sizing:border-box}
          .lbp-hero{background:linear-gradient(135deg,#faf5ff 0%,#ede9fe 30%,#ddd6fe 65%,#faf5ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .lbp-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .lbp-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(91,33,182,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .lbp-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .lbp-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .lbp-bc a{color:#6b7280;text-decoration:none}.lbp-bc a:hover{color:#7C3AED}.lbp-bc span{color:#d1d5db}
          .lbp-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#7C3AED;margin-bottom:28px}
          .lbp-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 50%,#5B21B6 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .lbp-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:640px;margin:0 auto 36px}
          .lbp-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .lbp-btn-p{display:inline-flex;align-items:center;gap:8px;background:#7C3AED;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(124,58,237,0.28)}
          .lbp-btn-p:hover{background:#4C1D95;box-shadow:0 8px 32px rgba(124,58,237,0.38);transform:translateY(-2px)}
          .lbp-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .lbp-btn-s:hover{border-color:#7C3AED;color:#7C3AED;transform:translateY(-2px)}
          .lbp-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(124,58,237,0.07)}
          .lbp-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(124,58,237,0.08)}.lbp-stat:last-child{border-right:none}
          .lbp-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .lbp-stat-v{font-size:1.6rem;font-weight:900;color:#7C3AED;letter-spacing:-0.5px}
          .lbp-pricing{background:#f8fafd;padding:80px 40px}
          .lbp-pricing-in{max-width:1280px;margin:0 auto}
          .lbp-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7C3AED;margin-bottom:10px;display:block}
          .lbp-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .lbp-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:600px;margin-bottom:44px}
          .lbp-tog-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
          .lbp-tog-lbl{font-size:15px;font-weight:600;color:#6b7280;transition:color 0.2s}
          .lbp-tog-lbl.active{color:#0F1F40}
          .lbp-tog-btn{width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background 0.25s;flex-shrink:0}
          .lbp-tog-btn.on{background:#7C3AED}
          .lbp-tog-knob{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform 0.25s;box-shadow:0 1px 4px rgba(0,0,0,0.18)}
          .lbp-tog-btn.on .lbp-tog-knob{transform:translateX(22px)}
          .lbp-save-badge{display:inline-flex;align-items:center;background:rgba(124,58,237,0.10);color:#7C3AED;font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;margin-left:6px}
          .lbp-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
          .lbp-card{background:#fff;border:1.5px solid #e5e9f0;border-radius:24px;padding:32px 28px;position:relative;transition:box-shadow 0.22s,transform 0.22s;overflow:hidden}
          .lbp-card:hover{box-shadow:0 12px 40px rgba(124,58,237,0.08)}
          .lbp-card-pop{background:linear-gradient(135deg,#4C1D95 0%,#7C3AED 100%);border-color:transparent;transform:scale(1.04);box-shadow:0 20px 60px rgba(124,58,237,0.25)}
          .lbp-card-pop:hover{transform:scale(1.04) translateY(-4px)}
          .lbp-pop-tag{position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.20);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;letter-spacing:0.5px;border:1px solid rgba(255,255,255,0.30)}
          .lbp-plan-name{font-size:22px;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .lbp-card-pop .lbp-plan-name{color:#fff}
          .lbp-plan-desc{font-size:13px;color:#6b7280;line-height:1.55;margin-bottom:24px}
          .lbp-card-pop .lbp-plan-desc{color:rgba(255,255,255,0.75)}
          .lbp-price-row{display:flex;align-items:baseline;gap:4px;margin-bottom:4px}
          .lbp-currency{font-size:1.4rem;font-weight:700;color:#7C3AED}
          .lbp-card-pop .lbp-currency{color:rgba(255,255,255,0.85)}
          .lbp-amount{font-size:3rem;font-weight:900;letter-spacing:-2px;color:#0F1F40;line-height:1}
          .lbp-card-pop .lbp-amount{color:#fff}
          .lbp-per{font-size:13px;color:#9ca3af;font-weight:500;margin-left:2px}
          .lbp-card-pop .lbp-per{color:rgba(255,255,255,0.65)}
          .lbp-billed{font-size:12px;color:#9ca3af;margin-bottom:4px}
          .lbp-card-pop .lbp-billed{color:rgba(255,255,255,0.60)}
          .lbp-save-line{font-size:12px;font-weight:700;color:#16a34a;margin-bottom:20px;min-height:18px}
          .lbp-card-pop .lbp-save-line{color:#86efac}
          .lbp-cta-card{display:block;width:100%;text-align:center;padding:13px;border-radius:50px;font-weight:700;font-size:0.9rem;text-decoration:none;background:#7C3AED;color:#fff;transition:all 0.22s;margin-bottom:24px}
          .lbp-cta-card:hover{background:#4C1D95;transform:translateY(-1px);box-shadow:0 6px 24px rgba(124,58,237,0.28)}
          .lbp-card-pop .lbp-cta-card{background:#fff;color:#7C3AED}
          .lbp-card-pop .lbp-cta-card:hover{background:#f5f3ff}
          .lbp-divider{height:1px;background:#f1f5f9;margin-bottom:20px}
          .lbp-card-pop .lbp-divider{background:rgba(255,255,255,0.15)}
          .lbp-feat-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
          .lbp-feat-list li{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#374151;line-height:1.4}
          .lbp-card-pop .lbp-feat-list li{color:rgba(255,255,255,0.88)}
          .lbp-feat-list li svg{color:#7C3AED}
          .lbp-card-pop .lbp-feat-list li svg{color:#c4b5fd}
          .lbp-trust{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:32px;padding-top:32px;border-top:1px solid #e5e9f0}
          .lbp-trust span{font-size:13px;color:#6b7280;display:flex;align-items:center;gap:6px;font-weight:500}
          .lbp-faq{background:#fff;padding:80px 40px}.lbp-faq-in{max-width:860px;margin:0 auto}
          .lbp-fitem{border-bottom:1px solid #e5e7eb}
          .lbp-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .lbp-fq:hover{color:#7C3AED}
          .lbp-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .lbp-fitem.open .lbp-ficon{border-color:#7C3AED;color:#7C3AED;background:rgba(124,58,237,0.06)}
          .lbp-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .lbp-fitem.open .lbp-fa{max-height:600px;padding-bottom:22px}
          .lbp-cta{background:linear-gradient(135deg,rgba(124,58,237,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(76,29,149,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .lbp-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.10) 0%,transparent 70%);pointer-events:none}
          .lbp-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(76,29,149,0.08) 0%,transparent 70%);pointer-events:none}
          .lbp-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .lbp-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .lbp-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.lbp-cards{grid-template-columns:1fr;max-width:480px;margin:0 auto}.lbp-card-pop{transform:none}.lbp-card-pop:hover{transform:translateY(-4px)}}
          @media(max-width:768px){.lbp-hero,.lbp-pricing,.lbp-faq,.lbp-cta{padding:60px 24px}.lbp-hero{padding-top:60px;padding-bottom:0}.lbp-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.lbp-stat:nth-child(2){border-right:none}.lbp-btns{flex-direction:column;align-items:center}.lbp-trust{gap:16px}}
        `}</style>
      </Head>

      <div className="lbp-page">
        <section className="lbp-hero"><div className="lbp-o1"/><div className="lbp-o2"/>
          <div className="lbp-in">
            <nav className="lbp-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#7C3AED'}}>Link Building Packages</span></nav>
            <span className="lbp-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#7C3AED',display:'inline-block'}}/> Manual Outreach · DR40–DR60+ · White-Hat Only</span>
            <h1 className="lbp-h1">Link Building Packages — High-DA Backlinks Through Manual Outreach</h1>
            <p className="lbp-sub">White-hat link building packages with transparent monthly pricing — guest posts, niche edits, and digital PR from DR40+ to DR60+ niche-relevant websites. Every link reported, every placement tracked.</p>
            <div className="lbp-btns">
              <Link href="/contact-us" className="lbp-btn-p">Talk to a Link Building Specialist <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="lbp-btn-s">SEO Services Overview</Link>
            </div>
            <div className="lbp-stats">{STATS.map(s => <div key={s.label} className="lbp-stat"><div className="lbp-stat-l">{s.label}</div><div className="lbp-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>

        <section className="lbp-pricing">
          <div className="lbp-pricing-in">
            <span className="lbp-ey2" style={{textAlign:'center',display:'block'}}>Pricing Plans</span>
            <h2 className="lbp-ttl" style={{textAlign:'center',marginLeft:'auto',marginRight:'auto',maxWidth:700}}>Choose Your Link Building Package</h2>
            <p className="lbp-desc" style={{margin:'0 auto 44px',textAlign:'center'}}>All packages use 100% manual outreach — no automated tools, no PBNs, no link farms. Full transparency with a live link tracker on every plan.</p>

            <div className="lbp-tog-row">
              <span className={`lbp-tog-lbl${!isYearly?' active':''}`}>Monthly</span>
              <button className={`lbp-tog-btn${isYearly?' on':''}`} onClick={()=>setIsYearly(!isYearly)} aria-label="Toggle billing period"><span className="lbp-tog-knob"/></button>
              <span className={`lbp-tog-lbl${isYearly?' active':''}`}>Yearly <span className="lbp-save-badge">Save 17%</span></span>
            </div>

            <div className="lbp-cards">
              {PLANS.map(plan => (
                <div key={plan.slug} className={`lbp-card${plan.popular?' lbp-card-pop':''}`}>
                  {plan.popular && <span className="lbp-pop-tag">Most Popular</span>}
                  <div className="lbp-plan-name">{plan.name}</div>
                  <p className="lbp-plan-desc">{plan.desc}</p>
                  <div className="lbp-price-row">
                    <span className="lbp-currency">$</span>
                    <span className="lbp-amount">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    <span className="lbp-per">/mo</span>
                  </div>
                  <div className="lbp-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  <div className="lbp-save-line">{isYearly ? `Save $${plan.yearlySave.toLocaleString()} per year` : ' '}</div>
                  <Link href="/contact-us" className="lbp-cta-card">Get Started →</Link>
                  <div className="lbp-divider"/>
                  <ul className="lbp-feat-list">
                    {plan.features.map(f => <li key={f}>{CHECK}<span>{f}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div className="lbp-trust">
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> 100% white-hat, manual outreach</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Live link tracker on all plans</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> No setup fee</span>
              <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Cancel monthly with 30 days notice</span>
            </div>
          </div>
        </section>

        <section className="lbp-faq"><div className="lbp-faq-in">
          <span className="lbp-ey2">Common Questions</span>
          <h2 className="lbp-ttl">Link Building Package FAQs</h2>
          <p className="lbp-desc" style={{marginBottom:44}}>Everything you need to know about our link building packages before getting started.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`lbp-fitem${openFaq===i?' open':''}`}><button className="lbp-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="lbp-ficon">{openFaq===i?'−':'+'}</span></button><div className="lbp-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>

        <section className="lbp-cta"><div className="lbp-cta-o1"/><div className="lbp-cta-o2"/>
          <div className="lbp-cta-in">
            <span className="lbp-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Not sure how many links you need?</span>
            <h2 className="lbp-cta-t">Get a Free Backlink Gap Analysis</h2>
            <p className="lbp-cta-s">Share your domain and top competitors — we&rsquo;ll analyse the backlink gap and recommend exactly how many links per month are needed to close it.</p>
            <div className="lbp-btns">
              <Link href="/contact-us" className="lbp-btn-p">Request a Free Backlink Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/ecommerce-seo-packages" className="lbp-btn-s">Ecommerce SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
