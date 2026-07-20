import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';

const PLANS = [
  {
    name: 'Starter', slug: 'starter', monthlyPrice: 349, yearlyPrice: 289, yearlySave: 720,
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
    name: 'Growth', slug: 'growth', monthlyPrice: 599, yearlyPrice: 499, yearlySave: 1200,
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
    name: 'Multi-Location', slug: 'multi-location', monthlyPrice: 999, yearlyPrice: 829, yearlySave: 2040,
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
  {
    name: 'Enterprise', slug: 'enterprise', monthlyPrice: 1699, yearlyPrice: 1409, yearlySave: 3480,
    desc: 'For multi-location brands needing a fully managed local authority programme.',
    popular: false,
    features: [
      'Up to 8 locations',
      'All GBP profiles fully managed + strategy',
      '50+ keywords across all locations',
      '200 citations per month (all locations)',
      '16 GBP posts per month per location',
      'Full review management + reputation strategy',
      '10 local link placements per month',
      'Custom landing page strategy & execution',
      'Weekly competitor intelligence',
      'Senior dedicated account manager',
      'Weekly performance dashboard',
      'AI Overview optimisation — priority',
    ],
  },
];

const FAQS = [
  { q: 'What is local SEO and who needs it?', a: 'Local SEO is the process of optimising your online presence to appear in Google\'s local search results — the map pack, local organic results, and Google Business Profile listings that appear when someone searches for a service "near me" or in a specific city. Any business that serves customers in a defined geographic area needs local SEO: restaurants, dental practices, law firms, plumbers, electricians, home services, retail shops, gyms, accountants, estate agents, and any other business where location matters to the customer. If your customers are local, local SEO is how they find you online.' },
  { q: 'How long does local SEO take to show results?', a: 'Local SEO results follow a predictable timeline: Google Business Profile optimisation improvements can produce visible improvements in profile views and actions within 2 to 4 weeks. Map pack ranking improvements for target keywords are typically visible within 4 to 12 weeks. Citation building effects on local authority compound over 2 to 4 months. Organic local results typically improve over 3 to 6 months. Businesses starting from zero GBP activity or poor citation health will see the most dramatic early improvements — the more broken your local presence currently is, the faster the initial gains.' },
  { q: 'What is Google Business Profile (GBP) management?', a: 'Google Business Profile (formerly Google My Business) is the listing that appears in Google Maps and the local map pack when someone searches for your business or services nearby. GBP management includes: initial profile completion and optimisation (name, address, phone, website, hours, categories, description, photos, services); regular post creation (4 to 12 per month depending on your plan); Q&A monitoring and response; review monitoring and response guidance; service area optimisation; product/menu additions where relevant; and ongoing profile health checks to fix suspensions or inconsistencies. An active, fully optimised GBP is the single most important factor in local map pack rankings.' },
  { q: 'What are local citations and why do they matter?', a: 'Local citations are mentions of your business name, address, and phone number (NAP) on other websites — business directories, review sites, local listings, and data aggregators like Yext, Bing Places, Apple Maps, and industry-specific directories. Citations matter because they provide additional signals to Google confirming your business\'s name, location, and legitimacy; and they are a direct source of referral traffic and customer discovery. Inconsistent NAP information across citations (different address formats, old phone numbers) actively hurts local rankings — citation cleanup to ensure consistency is one of the fastest-acting local SEO improvements.' },
  { q: 'Do you manage Google reviews?', a: 'Yes. Review management is included in all packages. Starter includes review monitoring (alerts when new reviews are posted) and guidance on responding. Growth and Multi-Location include active review response management (we respond to all reviews in your brand voice) and a review generation strategy — customer communication sequences, QR code tools, and post-visit follow-up systems that proactively encourage satisfied customers to leave reviews. Reviews are one of the most significant ranking factors in the Google local map pack, and a proactive review generation strategy can dramatically accelerate local ranking improvements.' },
  { q: 'Can you manage SEO for multiple business locations?', a: 'Yes. Our Multi-Location package manages up to 3 locations under one plan. For each location, we manage a separate Google Business Profile, track location-specific keywords, build location-specific citations, create location-specific landing pages on your website, and report on each location\'s performance individually. For businesses with more than 3 locations, we offer a custom enterprise local SEO plan priced based on total location count and scope. Managing multiple locations under one coordinated strategy produces better results than treating each location as a separate project.' },
  { q: 'What are local landing pages?', a: 'Local landing pages are dedicated pages on your website targeting a specific service + location combination — for example, "plumber in Manchester" or "dental practice in Leeds." These pages are optimised for local keywords, include location-specific content, embed a Google Map, include local schema markup (LocalBusiness), and link to your Google Business Profile. A well-built network of local landing pages is the foundation of strong organic local rankings — without them, your website cannot rank for location-specific searches even if your GBP is excellent. Growth package includes 1 local landing page per month; Multi-Location includes a full local landing page strategy.' },
  { q: 'What is included in the monthly local SEO report?', a: 'Our monthly local SEO report covers: Google Business Profile performance (profile views, direction requests, website clicks, call clicks); local keyword rank tracking (positions in map pack and organic results for all tracked keywords); review summary (new reviews, average star rating, response rate); citation progress (new citations built, inconsistencies resolved); GBP post performance; any technical issues or algorithm updates affecting local rankings; and next month\'s priorities. Growth and Multi-Location packages include a monthly call to walk through the report and align on strategy. All reports are delivered in a clear, client-friendly format — no jargon, just results.' },
];

const TESTIMONIALS_ROW1 = [
  { initials:'ER', bg:'#0891B2', name:'Emma Richardson', role:'Owner, The Corner Bistro - Manchester', text:'"Within 8 weeks of starting the Growth plan, we jumped into the top 3 in Google Maps for our key terms. Footfall from Google increased by 40% in the first quarter. The GBP posts and review management made an enormous difference to our online presence."' },
  { initials:'SP', bg:'#0E7490', name:'Dr. Sunil Patel', role:'Principal Dentist, SmilePro Clinic - Toronto', text:'"We were invisible on Google Maps despite having 4.8 stars. 1Solutions found that our GBP category was wrong and our citations were inconsistent. Four months later we rank #1 for dentist in our area and new patient enquiries are up 65%."' },
  { initials:'MH', bg:'#164E63', name:'Mark Harrison', role:'Director, Harrison & Co. Solicitors - London', text:'"Law is an incredibly competitive local market. The multi-location package gave us proper strategy across our three offices. Each location now appears in the top 3 map pack for its target keywords. Highly professional team."' },
  { initials:'SM', bg:'#0F3460', name:'Sarah Mitchell', role:'Owner, FitLife Gym - Birmingham', text:'"Our competitors had more reviews and better rankings despite us being open longer. The review generation strategy was a game changer. We went from 34 to 210 reviews in 5 months and now consistently appear in the map pack for gym searches."' },
  { initials:'JO', bg:'#7C3AED', name:"James O'Brien", role:"Founder, O'Brien Plumbing - Dublin", text:'"Emergency plumber searches are hugely competitive in Dublin. The Starter plan improved our GBP health and citations in the first 6 weeks. We started seeing map pack appearances within 2 months. ROI on the package was covered in the first booked job."' },
];
const TESTIMONIALS_ROW2 = [
  { initials:'PS', bg:'#0891B2', name:'Priya Sharma', role:'Managing Director, ShopEase Retail - Leeds', text:'"Three retail locations with inconsistent NAP data across directories was killing our local rankings. The multi-location plan cleaned everything up and built coordinated citations. Within 4 months all three stores were ranking in the map pack."' },
  { initials:'TB', bg:'#BE185D', name:'Tom Bradley', role:'Owner, Bradley Auto Services - Bristol', text:'"I was sceptical that local SEO would work for a garage. I was completely wrong. We went from 2 Google leads a month to 18 in the space of 3 months. The GBP posts highlighting seasonal offers drove real bookings, not just clicks."' },
  { initials:'CW', bg:'#047857', name:'Claire Watson', role:'Partner, Watson Tax Advisors - Edinburgh', text:'"Accounting is relationship-driven but local search matters more than I thought. We now appear in the top 3 for accountants in Edinburgh across 6 target keywords. The review management helped us build credibility with new clients finding us online."' },
  { initials:'RK', bg:'#B45309', name:'Raj Kapoor', role:'CEO, Kapoor Hotels Group - UK', text:'"Managing local SEO across 4 hotel properties was a nightmare before 1Solutions. The custom multi-location plan gave each property its own strategy while keeping brand consistency. Direct bookings through Google increased 28% year-on-year."' },
  { initials:'LC', bg:'#0F3460', name:'Lisa Chen', role:'Owner, Pearl Dental Studio - Sydney', text:'"The Growth plan was exactly what a single-location dental practice needs. GBP management, review strategy, and local landing pages all working together. We are fully booked 6 weeks ahead and 70% of new patients say they found us on Google Maps."' },
];

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}><polyline points="20 6 9 17 4 12"/></svg>
);

const RELATED_TAGS = [
  {href:'/seo-services-company',label:'SEO Services Company',cls:'lsp-rtag-blue'},
  {href:'/link-building-packages',label:'Link Building Packages',cls:'lsp-rtag-violet'},
  {href:'/local-seo-services',label:'Local SEO Services',cls:'lsp-rtag-teal'},
  {href:'/ecommerce-seo-services',label:'E-Commerce SEO',cls:'lsp-rtag-amber'},
  {href:'/technical-seo-audit',label:'Technical SEO Audit',cls:'lsp-rtag-indigo'},
  {href:'/content-marketing-services',label:'Content Marketing',cls:'lsp-rtag-green'},
  {href:'/google-ads-management',label:'Google Ads Management',cls:'lsp-rtag-orange'},
  {href:'/social-media-marketing',label:'Social Media Marketing',cls:'lsp-rtag-rose'},
  {href:'/wordpress-development-company',label:'WordPress Development',cls:'lsp-rtag-slate'},
  {href:'/web-design-services',label:'Web Design Services',cls:'lsp-rtag-cyan'},
];

export default function LocalSeoPackages() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [auditSt, setAuditSt] = useState('idle');
  const sectionRefs = useRef({});

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, key]));
          obs.disconnect();
        }
      }, { threshold: 0.1 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const _auditSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = (fd.get('la-name') || '').trim();
    const email = (fd.get('la-email') || '').trim();
    const phone = (fd.get('la-phone') || '').trim();
    const domain = (fd.get('la-domain') || '').trim();
    const biztype = (fd.get('la-biztype') || '').trim();
    const goals = (fd.get('la-goals') || '').trim();
    const consent = document.getElementById('lsp-consent')?.checked;
    if (!name || !email || !phone || !domain || !biztype || !goals || !consent) {
      setAuditSt('validation'); return;
    }
    setAuditSt('loading');
    try {
      const token = await new Promise(r => window.grecaptcha.ready(() =>
        window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'contact' }).then(r)));
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          phone: (fd.get('la-cc') ? fd.get('la-cc') + ' ' : '') + phone,
          company: domain,
          message: `Domain: ${domain}\n\nBusiness Type: ${biztype}\n\nGoals / Details: ${goals}`,
          source: 'Local SEO Packages - Free Audit',
          consent: true, recaptchaToken: token,
        }),
      });
      if (res.ok) { setAuditSt('success'); e.target.reset(); }
      else { setAuditSt('error'); }
    } catch { setAuditSt('error'); }
  };

  const rv = (key) => ({
    ref: el => { sectionRefs.current[key] = el; },
    className: `lsp-reveal${visibleSections.has(key) ? ' lsp-visible' : ''}`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Local SEO Services', item: 'https://www.1solutions.biz/local-seo-services/' },
        { '@type': 'ListItem', position: 3, name: 'Local SEO Packages', item: 'https://www.1solutions.biz/local-seo-packages/' },
      ]},
      { '@type': 'Service', name: 'Local SEO Packages', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Local SEO',
        url: 'https://www.1solutions.biz/local-seo-packages/',
        offers: PLANS.map(p => ({ '@type': 'Offer', name: `${p.name} Local SEO Package`, price: p.monthlyPrice, priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: p.monthlyPrice, priceCurrency: 'USD', unitText: 'month' } }))
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Local SEO Packages & Pricing Plans | 1Solutions</title>
        <meta name="description" content="Local SEO packages from $349/mo. GBP management, citation building, review management & local link building. No setup fee. Single & multi-location plans." />
        <meta name="keywords" content="local seo packages, local seo pricing, local seo plans, google business profile management, local seo services pricing, monthly local seo, multi-location seo packages" />
        <link rel="canonical" href="https://www.1solutions.biz/local-seo-packages/" />
        <meta property="og:title" content="Local SEO Packages & Pricing | 1Solutions" />
        <meta property="og:description" content="Local SEO packages from $349/mo. GBP management, citation building, review management & local link building." />
        <meta property="og:url" content="https://www.1solutions.biz/local-seo-packages/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .lsp-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .lsp-page *,.lsp-page *::before,.lsp-page *::after{box-sizing:border-box}
          .lsp-reveal{opacity:0;transform:translateY(44px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1)}
          .lsp-visible{opacity:1;transform:none}
          .lsp-sec{padding:80px 40px;position:relative;z-index:1}
          .lsp-sec-in{max-width:1280px;margin:0 auto}
          .lsp-white-sec{background:#fff}
          .lsp-light-sec{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08)}
          .lsp-dark-sec{background:linear-gradient(135deg,#071e3d 0%,#0F3460 40%,#0a2549 100%);position:relative;overflow:hidden}
          .lsp-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0891B2;margin-bottom:12px;display:block}
          .lsp-sec-ttl{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin-bottom:10px}
          .lsp-sec-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          .lsp-glass{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}

          /* ── HERO ── */
          .lsp-hero{background:linear-gradient(135deg,#ecfeff 0%,#cffafe 25%,#e0f2fe 55%,#dbeafe 85%,#ede9fe 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .lsp-hero-orb1{position:absolute;top:-120px;right:-100px;width:580px;height:580px;border-radius:50%;background:radial-gradient(circle,rgba(8,145,178,.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .lsp-hero-orb2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.08) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .lsp-hero-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}.lsp-bc a:hover{color:#0891B2}.lsp-bc span{color:#d1d5db}
          .lsp-hero-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(8,145,178,.08);border:1px solid rgba(8,145,178,.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0891B2;margin-bottom:28px}
          .lsp-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;color:#111827;margin-bottom:20px;max-width:920px;margin-left:auto;margin-right:auto}
          .lsp-hero-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .lsp-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .lsp-btn-primary{display:inline-flex;align-items:center;gap:8px;background:#0891B2;color:#fff;padding:14px 32px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(8,145,178,.28)}
          .lsp-btn-primary:hover{background:#164E63;box-shadow:0 8px 32px rgba(8,145,178,.40);transform:translateY(-2px)}
          .lsp-btn-ghost{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:14px 32px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s}
          .lsp-btn-ghost:hover{border-color:#0891B2;color:#0891B2;transform:translateY(-2px)}
          .lsp-hero-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(8,145,178,.07)}
          .lsp-hstat{padding:20px 24px;text-align:center;border-right:1px solid rgba(8,145,178,.08)}.lsp-hstat:last-child{border-right:none}
          .lsp-hstat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .lsp-hstat-v{font-size:1.65rem;font-weight:900;color:#0891B2;letter-spacing:-.5px}

          /* ── PRICING ── */
          .lsp-pricing-sec{background:linear-gradient(135deg,#f0eefa 0%,#f5f3ff 50%,#eff4ff 100%);border-top:1px solid rgba(124,58,237,.08);border-bottom:1px solid rgba(124,58,237,.08)}
          .lsp-pricing-sec .lsp-sec-ey{color:#7c3aed}
          .lsp-tog-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
          .lsp-tog-lbl{font-size:15px;font-weight:600;color:#6b7280;transition:color .2s}
          .lsp-tog-lbl.active{color:#0F1F40}
          .lsp-tog-btn{width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background .25s;flex-shrink:0}
          .lsp-tog-btn.on{background:#7c3aed}
          .lsp-tog-knob{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .25s;box-shadow:0 1px 4px rgba(0,0,0,.18)}
          .lsp-tog-btn.on .lsp-tog-knob{transform:translateX(22px)}
          .lsp-save-badge{display:inline-flex;align-items:center;background:rgba(124,58,237,.10);color:#7c3aed;font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;margin-left:6px}
          .lsp-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-items:stretch;padding-top:20px}
          .lsp-card{position:relative;display:flex;flex-direction:column;padding:28px 24px;border-radius:22px;border:1.5px solid rgba(0,0,0,.08);background:#fff;color:#111827;box-shadow:0 2px 16px rgba(0,0,0,.06);transition:box-shadow .2s,transform .2s}
          .lsp-card:hover{box-shadow:0 8px 32px rgba(0,0,0,.10);transform:translateY(-3px)}
          .lsp-card-pop{background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#7c3aed,#ec4899,#06b6d4) border-box;border:2px solid transparent;box-shadow:0 0 40px rgba(124,58,237,.15),0 4px 24px rgba(0,0,0,.08);overflow:visible}
          .lsp-card-pop:hover{box-shadow:0 0 60px rgba(124,58,237,.25),0 8px 32px rgba(0,0,0,.12);transform:translateY(-4px)}
          .lsp-pop-tag{position:absolute;top:-14px;left:50%;transform:translateX(-50%);padding:5px 16px;border-radius:999px;background:linear-gradient(120deg,#7c3aed,#ec4899,#06b6d4);color:#fff;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;box-shadow:0 4px 16px rgba(124,58,237,.40)}
          .lsp-tier-label{font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#6b7280;margin-bottom:8px}
          .lsp-price-big{font-size:48px;font-weight:800;letter-spacing:-.04em;color:#111827;line-height:1;margin:0 0 4px}
          .lsp-price-unit{font-size:15px;color:#9ca3af;font-weight:500;margin-left:4px;letter-spacing:0}
          .lsp-billed{font-size:12px;color:#9ca3af;margin-bottom:2px}
          .lsp-save-line{font-size:12px;font-weight:700;color:#16a34a;margin-bottom:16px;min-height:18px}
          .lsp-plan-desc{font-size:14px;color:#4b5563;line-height:1.6;margin:0 0 20px}
          .lsp-cta-card{display:flex;align-items:center;justify-content:center;width:100%;text-align:center;padding:12px 20px;border-radius:12px;font-weight:700;font-size:.95rem;text-decoration:none;color:#111827;background:#fff;border:1.5px solid rgba(0,0,0,.12);transition:all .2s;margin-top:24px}
          .lsp-cta-card:hover{border-color:rgba(124,58,237,.50);color:#7c3aed;background:rgba(124,58,237,.04);box-shadow:0 4px 20px rgba(124,58,237,.12);transform:translateY(-1px)}
          .lsp-card-div{border:none;border-top:1.5px dashed #e5e7eb;margin:0 0 20px}
          .lsp-feat-list{list-style:none;padding:0;margin:0;flex:1}
          .lsp-feat-list li{padding:8px 0;border-bottom:1px dashed #f3f4f6;font-size:12.5px;color:#374151;line-height:1.5;display:flex;align-items:flex-start;gap:6px}
          .lsp-feat-list li:last-child{border-bottom:none}
          .lsp-feat-list li::before{content:'✓';color:#22c55e;font-weight:700;font-size:13px;flex-shrink:0;margin-top:1px}
          .lsp-trust{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:40px;padding-top:32px;border-top:1px solid rgba(0,0,0,.08)}
          .lsp-trust span{font-size:13px;color:#6b7280;display:flex;align-items:center;gap:6px;font-weight:500}

          /* ── DEFINITION ── */
          .lsp-def-box{padding:36px;max-width:1040px;margin:0 auto}
          .lsp-def-intro{font-size:1.02rem;color:#374151;line-height:1.8;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid rgba(15,52,96,.08)}
          .lsp-def-intro strong{color:#0F3460}
          .lsp-def-aspects{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .lsp-def-aspect{background:rgba(255,255,255,.55);border:1px solid rgba(15,52,96,.10);border-radius:14px;padding:20px;transition:border-color .2s}
          .lsp-def-aspect:hover{border-color:rgba(8,145,178,.35)}
          .lsp-def-t{font-weight:700;color:#0F3460;font-size:14px;margin-bottom:6px}
          .lsp-def-d{font-size:13px;color:#4A6080;line-height:1.6}

          /* ── WHY CARDS ── */
          .lsp-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .lsp-why-card{padding:28px 24px;transition:transform .22s,box-shadow .22s,border-color .22s}
          .lsp-why-card:hover{transform:translateY(-6px);border-color:rgba(8,145,178,.45)!important;box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1)!important}
          .lsp-why-num{font-size:3rem;font-weight:900;color:rgba(8,145,178,.15);line-height:1;margin-bottom:8px;letter-spacing:-1.5px}
          .lsp-why-t{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .lsp-why-d{font-size:13.5px;color:#4A6080;line-height:1.7;margin:0}

          /* ── AI DARK SECTION ── */
          .lsp-ai-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(8,145,178,.18) 0%,transparent 65%);top:-150px;right:-100px;pointer-events:none;filter:blur(30px)}
          .lsp-ai-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:48px}
          .lsp-ai-card{background:rgba(255,255,255,.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:32px;transition:background .25s,border-color .25s}
          .lsp-ai-card:hover{background:rgba(255,255,255,.11);border-color:rgba(8,145,178,.45);transform:translateY(-4px)}
          .lsp-ai-icon{width:48px;height:48px;background:rgba(8,145,178,.20);border:1px solid rgba(8,145,178,.35);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .lsp-ai-icon svg{width:24px;height:24px;stroke:#38bdf8;fill:none}
          .lsp-ai-t{font-size:17px;font-weight:700;color:#fff;margin-bottom:10px}
          .lsp-ai-d{font-size:14px;color:rgba(255,255,255,.70);line-height:1.7}
          .lsp-dark-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.50);margin-bottom:12px;display:block;text-align:center}
          .lsp-dark-ttl{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;text-align:center;margin-bottom:12px;line-height:1.15;color:#fff}
          .lsp-dark-desc{font-size:15px;color:rgba(255,255,255,.60);text-align:center;max-width:560px;margin:0 auto}

          /* ── COMPARISON TABLE ── */
          .lsp-table-wrap{overflow-x:auto;margin-top:40px}
          .lsp-table{width:100%;border-collapse:collapse;font-size:14px}
          .lsp-table th{padding:14px 20px;text-align:left;font-weight:700;font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:#4A6080;background:rgba(8,145,178,.04);border-bottom:2px solid rgba(15,52,96,.10)}
          .lsp-table th:first-child{border-radius:12px 0 0 0}
          .lsp-table th:last-child{border-radius:0 12px 0 0}
          .lsp-table td{padding:14px 20px;border-bottom:1px solid rgba(15,52,96,.07);color:#374151;vertical-align:middle}
          .lsp-table td:first-child{font-weight:600;color:#0F1F40}
          .lsp-table tr:last-child td{border-bottom:none}
          .lsp-table tr:hover td{background:rgba(8,145,178,.03)}
          .lsp-check-cell{color:#0891B2;font-weight:700}
          .lsp-dash-cell{color:#d1d5db}
          .lsp-pop-col{background:rgba(8,145,178,.06);font-weight:600;color:#0891B2}

          /* ── PROCESS ── */
          .lsp-proc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
          .lsp-proc-card{padding:28px 24px;transition:transform .22s,box-shadow .22s,border-color .22s}
          .lsp-proc-card:hover{transform:translateY(-5px);border-color:rgba(8,145,178,.40)!important;box-shadow:0 16px 48px rgba(15,52,96,.12),inset 0 1px 0 rgba(255,255,255,1)!important}
          .lsp-proc-n{font-size:3rem;font-weight:900;color:rgba(8,145,178,.10);line-height:1;margin-bottom:6px;letter-spacing:-2px}
          .lsp-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#0891B2,rgba(8,145,178,.25));border-radius:2px;margin-bottom:14px}
          .lsp-proc-t{font-size:1rem;font-weight:700;color:#0F1F40;margin:0 0 8px}
          .lsp-proc-d{font-size:13.5px;color:#4A6080;line-height:1.7;margin:0}

          /* ── QUALITY ── */
          .lsp-qual-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .lsp-qual-card{padding:28px 24px;transition:transform .22s,box-shadow .22s,border-color .22s}
          .lsp-qual-card:hover{transform:translateY(-6px);border-color:rgba(8,145,178,.45)!important;box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1)!important}
          .lsp-qual-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
          .lsp-qual-icon svg{width:26px;height:26px;stroke:#0891B2;fill:none}
          .lsp-qual-t{font-size:15px;font-weight:700;color:#0F1F40;margin:0 0 8px}
          .lsp-qual-d{font-size:13.5px;color:#4A6080;line-height:1.7;margin:0}

          /* ── INDUSTRIES ── */
          .lsp-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
          .lsp-ind-card{background:#fff;border:1.5px solid #e5e9f0;border-radius:16px;padding:20px 16px;text-align:center;transition:all .2s;cursor:default}
          .lsp-ind-card:hover{border-color:rgba(8,145,178,.35);box-shadow:0 8px 24px rgba(8,145,178,.10);transform:translateY(-3px)}
          .lsp-ind-icon{width:44px;height:44px;background:rgba(8,145,178,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;transition:background .2s}
          .lsp-ind-card:hover .lsp-ind-icon{background:rgba(8,145,178,.16)}
          .lsp-ind-icon svg{width:22px;height:22px;stroke:#0891B2;fill:none}
          .lsp-ind-name{font-size:13px;font-weight:600;color:#374151}

          /* ── RESULTS (DARK) ── */
          .lsp-res-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
          .lsp-res-card{background:rgba(255,255,255,.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:32px;text-align:center;transition:background .25s,border-color .25s}
          .lsp-res-card:hover{background:rgba(255,255,255,.11);border-color:rgba(8,145,178,.45)}
          .lsp-res-metric{font-size:2.8rem;font-weight:900;color:#a5f3fc;margin-bottom:6px;line-height:1;letter-spacing:-1.5px}
          .lsp-res-label{font-size:14px;color:rgba(255,255,255,.80);font-weight:600;margin-bottom:6px}
          .lsp-res-sub{font-size:12px;color:rgba(255,255,255,.50);line-height:1.5}
          .lsp-cs-cta{display:inline-flex;align-items:center;gap:8px;background:#0891B2;border:1.5px solid #0891B2;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(8,145,178,.35);padding:14px 32px;margin-top:48px}
          .lsp-cs-cta:hover{background:#164E63;border-color:#164E63;box-shadow:0 0 0 6px rgba(8,145,178,.20),0 8px 32px rgba(8,145,178,.55);transform:translateY(-2px)}

          /* ── TESTIMONIALS ── */
          .lsp-testi-sec{padding:72px 0;background:linear-gradient(135deg,#faf8ff 0%,#f7f4ff 50%,#f3f8ff 100%);overflow:hidden}
          .lsp-testi-hd{padding:0 40px;text-align:center;margin-bottom:48px}
          .lsp-trow{overflow:hidden;position:relative}
          .lsp-trow+.lsp-trow{margin-top:16px}
          .lsp-tfade-l{position:absolute;left:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to right,#faf8ff,transparent);pointer-events:none}
          .lsp-tfade-r{position:absolute;right:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to left,#faf8ff,transparent);pointer-events:none}
          .lsp-ttrack{display:flex;gap:20px;width:max-content;padding-left:20px;animation:lsp-marq-l 40s linear infinite}
          .lsp-ttrack-rev{display:flex;gap:20px;width:max-content;padding-left:20px;animation:lsp-marq-r 40s linear infinite}
          .lsp-trow:hover .lsp-ttrack,.lsp-trow:hover .lsp-ttrack-rev{animation-play-state:paused}
          @keyframes lsp-marq-l{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes lsp-marq-r{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
          .lsp-tcard{width:440px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,.08);border-radius:16px;padding:20px 24px;box-shadow:0 2px 16px rgba(0,0,0,.05);display:flex;flex-direction:column;gap:12px;user-select:none}
          .lsp-tcard-star{color:#F59E0B;font-size:14px}
          .lsp-tcard-text{font-size:14px;color:#374151;line-height:1.75;margin:0;flex-grow:1}
          .lsp-tcard-author{display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:16px}
          .lsp-tcard-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px}
          .lsp-tcard-name{font-weight:700;color:#111827;font-size:13px}
          .lsp-tcard-role{color:#9ca3af;font-size:12px;margin-top:1px}

          /* ── AUDIT FORM ── */
          .lsp-audit-sec{padding:72px 40px;background:linear-gradient(135deg,rgba(254,243,199,.70) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.80)}
          .lsp-audit-in{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px}
          .lsp-audit-ttl{font-size:clamp(2rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;margin:0 0 16px;color:#111827}
          .lsp-audit-desc{font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px}
          .lsp-audit-benefits-box{background:linear-gradient(135deg,rgba(255,255,255,.70) 0%,rgba(219,234,254,.35) 100%);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:16px}
          .lsp-audit-ben{display:flex;gap:12px;align-items:flex-start}
          .lsp-audit-ben-icon{width:20px;height:20px;stroke:#D97706;fill:none;flex-shrink:0;margin-top:2px}
          .lsp-audit-ben-text{font-size:13px;color:#4A6080;line-height:1.55}
          .lsp-audit-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid rgba(15,52,96,.10)}
          .lsp-audit-stat-num{font-size:36px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px}
          .lsp-audit-stat-txt{font-size:12px;color:#4A6080;font-weight:500;line-height:1.4}
          .lsp-audit-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(237,233,254,.25) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .lsp-audit-form-box h3{font-size:24px;font-weight:700;margin:0 0 24px;color:#0F1F40;letter-spacing:-.5px}
          .lsp-af-form{display:flex;flex-direction:column;gap:16px}
          .lsp-af-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .lsp-fg{display:flex;flex-direction:column;gap:6px}
          .lsp-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .lsp-fg input,.lsp-fg textarea,.lsp-fg select{padding:10px 14px;border:1px solid rgba(15,52,96,.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);box-shadow:inset 0 1px 4px rgba(15,52,96,.06);transition:border-color .2s,background .2s;box-sizing:border-box;width:100%}
          .lsp-fg input:focus,.lsp-fg textarea:focus,.lsp-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,.90);box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .lsp-fg textarea{resize:vertical}
          .lsp-af-phone-wrap{display:flex;border:1px solid rgba(15,52,96,.15);border-radius:6px;overflow:hidden;background:rgba(255,255,255,.55)}
          .lsp-af-phone-wrap select{padding:10px;border:none;background:transparent;font-size:12px;width:auto!important;min-width:70px;max-width:90px;color:#0F1F40;font-family:inherit;flex-shrink:0}
          .lsp-af-phone-wrap input{flex:1!important;width:auto!important;min-width:0!important;border:none!important;border-radius:0!important;padding:10px 14px!important;box-shadow:none!important;background:rgba(255,255,255,.55)!important;color:#0F1F40!important}
          .lsp-af-phone-wrap input:focus{outline:none!important;box-shadow:none!important;background:rgba(255,255,255,.90)!important;border-color:transparent!important}
          .lsp-af-consent{display:flex;gap:8px;align-items:flex-start}
          .lsp-af-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;flex-shrink:0}
          .lsp-af-consent label{font-size:11px;color:#4A6080;line-height:1.5;margin:0}
          .lsp-af-consent a{color:#0F3460;text-decoration:none}
          .lsp-audit-submit{padding:14px 28px;background:rgba(15,52,96,.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.30);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .3s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,.25),inset 0 1px 0 rgba(255,255,255,.15)}
          .lsp-audit-submit:hover:not(:disabled){background:rgba(15,52,96,.95);border-color:rgba(245,158,11,.6);transform:translateY(-2px)}
          .lsp-audit-submit:disabled{opacity:.65;cursor:not-allowed}
          .lsp-audit-success-wrap{text-align:center;padding:32px 0}
          .lsp-audit-success-icon{width:64px;height:64px;background:linear-gradient(135deg,#0F3460,#1a3a6e);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 8px 24px rgba(15,52,96,.25)}
          .lsp-audit-success-icon svg{width:30px;height:30px;stroke:#fff;fill:none}
          .lsp-audit-success-wrap h3{font-size:20px;font-weight:700;color:#0F1F40;margin:0 0 10px}
          .lsp-audit-success-wrap p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}

          /* ── FAQ ── */
          .lsp-faq-list{display:flex;flex-direction:column;gap:12px}
          .lsp-fitem{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:border-color .2s,box-shadow .2s}
          .lsp-fitem.open{border-color:rgba(217,119,6,.40);box-shadow:0 8px 32px rgba(15,52,96,.12),inset 0 1px 0 rgba(255,255,255,1)}
          .lsp-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px}
          .lsp-fq{width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative}
          .lsp-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background .2s,color .2s}
          .lsp-fitem.open .lsp-fq-badge{background:#D97706;color:#fff}
          .lsp-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45}
          .lsp-fitem.open .lsp-fq-text{color:#D97706}
          .lsp-fq-chevron{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .lsp-fitem.open .lsp-fq-chevron{transform:rotate(180deg);color:#D97706}
          .lsp-fa{font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px}

          /* ── RELATED ── */
          .lsp-related-section{background:rgba(237,233,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60);padding:80px 40px}
          .lsp-related-inner{max-width:1280px;margin:0 auto;text-align:center}
          .lsp-related-eyebrow{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block}
          .lsp-related-title{font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px}
          .lsp-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px}
          .lsp-related-divider{border:none;border-top:1px solid rgba(15,52,96,.12);margin:40px 0}
          .lsp-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
          .lsp-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .25s}
          .lsp-rtag:hover{filter:brightness(.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.10)}
          .lsp-rtag-blue{background:rgba(59,130,246,.10);border-color:rgba(59,130,246,.30);color:#1D4ED8}
          .lsp-rtag-violet{background:rgba(139,92,246,.10);border-color:rgba(139,92,246,.30);color:#6D28D9}
          .lsp-rtag-amber{background:rgba(245,158,11,.12);border-color:rgba(245,158,11,.35);color:#B45309}
          .lsp-rtag-teal{background:rgba(20,184,166,.10);border-color:rgba(20,184,166,.30);color:#0F766E}
          .lsp-rtag-rose{background:rgba(244,63,94,.10);border-color:rgba(244,63,94,.30);color:#BE123C}
          .lsp-rtag-green{background:rgba(34,197,94,.10);border-color:rgba(34,197,94,.30);color:#15803D}
          .lsp-rtag-indigo{background:rgba(99,102,241,.10);border-color:rgba(99,102,241,.30);color:#4338CA}
          .lsp-rtag-orange{background:rgba(249,115,22,.10);border-color:rgba(249,115,22,.30);color:#C2410C}
          .lsp-rtag-cyan{background:rgba(6,182,212,.10);border-color:rgba(6,182,212,.30);color:#0E7490}
          .lsp-rtag-slate{background:rgba(100,116,139,.10);border-color:rgba(100,116,139,.30);color:#334155}

          /* ── RESPONSIVE ── */
          @media(max-width:1200px){
            .lsp-cards{grid-template-columns:repeat(2,1fr)}
          }
          @media(max-width:1024px){
            .lsp-why-grid{grid-template-columns:repeat(2,1fr)}
            .lsp-qual-grid{grid-template-columns:repeat(2,1fr)}
            .lsp-proc-grid{grid-template-columns:repeat(2,1fr)}
            .lsp-ai-grid{grid-template-columns:1fr}
            .lsp-res-grid{grid-template-columns:repeat(2,1fr)}
            .lsp-audit-in{grid-template-columns:1fr}
            .lsp-ind-grid{grid-template-columns:repeat(3,1fr)}
            .lsp-def-aspects{grid-template-columns:1fr}
          }
          @media(max-width:768px){
            .lsp-sec{padding:60px 24px}
            .lsp-hero{padding:60px 24px 0}
            .lsp-hero-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}
            .lsp-hstat:nth-child(2){border-right:none}
            .lsp-hero-btns{flex-direction:column;align-items:center}
            .lsp-why-grid,.lsp-qual-grid,.lsp-proc-grid{grid-template-columns:1fr}
            .lsp-res-grid{grid-template-columns:1fr;max-width:360px;margin-left:auto;margin-right:auto}
            .lsp-cards{grid-template-columns:1fr;max-width:420px;margin:0 auto}
            .lsp-ind-grid{grid-template-columns:repeat(2,1fr)}
            .lsp-trust{gap:16px;flex-direction:column;align-items:center}
            .lsp-audit-sec{padding:56px 24px}
            .lsp-af-row{grid-template-columns:1fr}
            .lsp-testi-hd{padding:0 24px}
            .lsp-tfade-l,.lsp-tfade-r{width:48px}
            .lsp-audit-stats{grid-template-columns:repeat(3,1fr)}
          }
        `}</style>
      </Head>

      <div className="lsp-page">

        {/* ── HERO ── */}
        <section className="lsp-hero" aria-label="Hero">
          <div className="lsp-hero-orb1" aria-hidden="true"/>
          <div className="lsp-hero-orb2" aria-hidden="true"/>
          <div className="lsp-hero-in">
            <span className="lsp-hero-ey">
              <span style={{width:6,height:6,borderRadius:'50%',background:'#0891B2',display:'inline-block'}} aria-hidden="true"/>
              Google Maps · Google Business Profile · Citation Building · Review Management
            </span>
            <h1 className="lsp-h1">
              Local SEO Packages That <AuroraText>Rank You in Google Maps</AuroraText> and AI Search
            </h1>
            <p className="lsp-hero-sub">Transparent local SEO pricing for single and multi-location businesses — Google Business Profile management, citation building, review generation, and local link building. One monthly plan. Real results.</p>
            <div className="lsp-hero-btns">
              <Link href="#free-audit" className="lsp-btn-primary">
                Get a Free Local SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="#pricing" className="lsp-btn-ghost">See Pricing Plans</Link>
            </div>
            <div className="lsp-hero-stats" aria-label="Key statistics">
              {[
                {l:'Local Businesses',v:'300+'},
                {l:'Map Pack Avg Position',v:'Top 3'},
                {l:'Years Experience',v:'15+'},
                {l:'Client Retention',v:'93%'},
              ].map(s => (
                <div key={s.l} className="lsp-hstat">
                  <div className="lsp-hstat-l">{s.l}</div>
                  <div className="lsp-hstat-v">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT IS LOCAL SEO ── */}
        <section className="lsp-sec lsp-light-sec" aria-labelledby="def-title">
          <div className="lsp-sec-in">
            <div {...rv('def')} style={{maxWidth:1040,margin:'0 auto'}}>
              <span className="lsp-sec-ey">Understanding Local SEO</span>
              <h2 className="lsp-sec-ttl" id="def-title">What Are <AuroraText>Local SEO Packages</AuroraText>?</h2>
              <div className="lsp-glass lsp-def-box">
                <p className="lsp-def-intro">
                  <strong>Local SEO packages</strong> are monthly managed services that improve your business's visibility in <strong>Google Maps</strong>, the <strong>local map pack</strong>, and location-based organic search results. Unlike general SEO, local SEO focuses on signals that Google uses to rank businesses for "near me" and city-specific searches — Google Business Profile activity, citation consistency, review velocity, and local link authority. A well-executed local SEO strategy puts your business in front of high-intent buyers at the exact moment they are searching for what you offer in your area. Building citations yourself? See our <Link href="/top-100-free-business-listing-directories-in-the-usa/">list of the top 100 free business listing directories in the USA</Link>.
                </p>
                <div className="lsp-def-aspects">
                  {[
                    {t:'Google Business Profile', d:'Your free storefront in Google Maps. We optimise every element — categories, services, posts, photos, Q&A — to maximise map pack visibility and GBP engagement signals.'},
                    {t:'Citation Authority', d:'Consistent name, address, and phone number across 50+ directories tells Google your business is legitimate and where it is located. We build and clean citations systematically.'},
                    {t:'Review Velocity', d:'Review count, recency, and star rating are confirmed local ranking factors. Our review generation strategies increase your review velocity without violating Google\'s policies.'},
                  ].map(a => (
                    <div key={a.t} className="lsp-def-aspect">
                      <div className="lsp-def-t">{a.t}</div>
                      <div className="lsp-def-d">{a.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY LOCAL SEO MATTERS ── */}
        <section className="lsp-sec lsp-white-sec" aria-labelledby="why-title">
          <div className="lsp-sec-in">
            <div {...rv('why')}>
              <span className="lsp-sec-ey">Why It Works</span>
              <h2 className="lsp-sec-ttl" id="why-title">Why <AuroraText>Local SEO</AuroraText> Delivers Better ROI Than Paid Ads</h2>
              <p className="lsp-sec-desc">Local search intent is the highest-converting traffic in digital marketing. Here is why the map pack consistently outperforms paid channels for local businesses.</p>
              <div className="lsp-why-grid">
                {[
                  {n:'01',t:'76% of local searches lead to a visit within 24 hours', d:'Google data shows that 76% of people who search for something nearby visit a related business within 24 hours. Local SEO captures buyers at the highest point of intent — they are ready to act now.'},
                  {n:'02',t:'The map pack captures 44% of all local search clicks', d:'For local intent queries, the 3-pack appears above organic results. Businesses ranking in the top 3 map positions capture 44% of all clicks — far more than any single organic position or paid ad.'},
                  {n:'03',t:'Google Business Profile is a free customer acquisition channel', d:'A fully optimised GBP listing (photos, posts, services, Q&A, reviews) dramatically increases your visibility in the map pack and Google AI Overviews — with no cost-per-click. We manage it entirely on your behalf.'},
                  {n:'04',t:'Citation inconsistency actively hurts your rankings', d:'Mismatched name, address, or phone across directories is a direct negative ranking signal. Our citation audit and cleanup resolves inconsistencies across 50+ directories — one of the fastest-acting improvements in local SEO.'},
                  {n:'05',t:'Reviews are a confirmed map pack ranking factor', d:'Review count, star rating, and recency are confirmed local ranking signals. A proactive review generation strategy — included in Growth and Multi-Location — systematically increases your review velocity and ranking power.'},
                  {n:'06',t:'Local SEO compounds; paid ads stop the moment you pause', d:'Every citation built, review earned, and content page created keeps working. GBP posts build engagement history. Reviews compound social proof. The ROI from local SEO grows over time, unlike paid ads that deliver zero results the moment you stop spending.'},
                ].map(c => (
                  <div key={c.n} className="lsp-why-card lsp-glass">
                    <div className="lsp-why-num">{c.n}</div>
                    <div className="lsp-why-t">{c.t}</div>
                    <p className="lsp-why-d">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── AI OVERVIEWS DARK SECTION ── */}
        <section className="lsp-sec lsp-dark-sec" aria-labelledby="ai-title">
          <div className="lsp-ai-orb" aria-hidden="true"/>
          <div className="lsp-sec-in" style={{position:'relative',zIndex:2}}>
            <div {...rv('ai')} style={{textAlign:'center'}}>
              <span className="lsp-dark-ey">Future-Proof Local SEO</span>
              <h2 className="lsp-dark-ttl" id="ai-title">Local SEO for <AuroraText>Google AI Overviews</AuroraText> &amp; AI-Powered Search</h2>
              <p className="lsp-dark-desc">Google AI Overviews increasingly answer local queries directly. We build the signals that get your business cited in AI-generated answers — not just ranked in traditional results.</p>
              <div className="lsp-ai-grid">
                {[
                  {icon:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>, t:'AI Overviews for Local Queries', d:'Google AI Overviews now appear for local searches like "best dentist near me" and "top-rated plumber in [city]." Strong GBP signals, high review authority, and consistent NAP data are the foundation for AI Overview inclusion. We build all three systematically.'},
                  {icon:<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>, t:'GBP Signals Feed AI Answers', d:'Google\'s AI systems draw heavily from Google Business Profile data — categories, services, photos, Q&A responses, and post history. An active, fully optimised GBP is now as important for AI answer inclusion as it is for map pack rankings. Our GBP management directly addresses this.'},
                  {icon:<><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>, t:'E-E-A-T for Local Businesses', d:'Google\'s E-E-A-T framework (Experience, Expertise, Authoritativeness, Trustworthiness) applies to local businesses. Reviews demonstrating real customer experience, local link authority from community sites, and expert author profiles on local landing pages all contribute to E-E-A-T signals for local businesses.'},
                  {icon:<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>, t:'Perplexity &amp; ChatGPT Local Recommendations', d:'AI assistants like Perplexity and ChatGPT increasingly answer "best [service] in [city]" questions by pulling from review platforms, directory data, and authoritative local content. High review volume, consistent citations, and authoritative local content position your business for AI assistant recommendations across all major platforms.'},
                ].map((c,i) => (
                  <div key={i} className="lsp-ai-card">
                    <div className="lsp-ai-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                    </div>
                    <div className="lsp-ai-t">{c.t}</div>
                    <div className="lsp-ai-d" dangerouslySetInnerHTML={{__html:c.d}}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="lsp-sec lsp-pricing-sec" aria-labelledby="pricing-title">
          <div className="lsp-sec-in">
            <div {...rv('pricing')} style={{textAlign:'center'}}>
              <span className="lsp-sec-ey">Pricing Plans</span>
              <h2 className="lsp-sec-ttl" id="pricing-title" style={{maxWidth:700,margin:'0 auto 10px'}}>Choose Your <AuroraText>Local SEO Package</AuroraText></h2>
              <p className="lsp-sec-desc" style={{margin:'0 auto 44px'}}>Every package includes Google Business Profile management, citation work, and monthly reporting. No setup fee. Custom plans for 4+ locations.</p>
              <div className="lsp-tog-row">
                <span className={`lsp-tog-lbl${!isYearly?' active':''}`}>Monthly</span>
                <button className={`lsp-tog-btn${isYearly?' on':''}`} onClick={() => setIsYearly(!isYearly)} aria-label="Toggle billing period"><span className="lsp-tog-knob"/></button>
                <span className={`lsp-tog-lbl${isYearly?' active':''}`}>Yearly <span className="lsp-save-badge">Save 17%</span></span>
              </div>
              <div className="lsp-cards">
                {PLANS.map(plan => (
                  <div key={plan.slug} className={`lsp-card${plan.popular ? ' lsp-card-pop' : ''}`}>
                    {plan.popular && <span className="lsp-pop-tag">✦ Most Popular</span>}
                    <div className="lsp-tier-label">{plan.name}</div>
                    <div className="lsp-price-big">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}<span className="lsp-price-unit">/mo</span>
                    </div>
                    <div className="lsp-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                    <div className="lsp-save-line">{isYearly ? `Save $${plan.yearlySave.toLocaleString()} per year` : ' '}</div>
                    <p className="lsp-plan-desc">{plan.desc}</p>
                    <div className="lsp-card-div"/>
                    <ul className="lsp-feat-list">
                      {plan.features.map(f => <li key={f}>{f}</li>)}
                    </ul>
                    <Link href="/contact-us" className="lsp-cta-card">Get Started →</Link>
                  </div>
                ))}
              </div>
              <div className="lsp-trust">
                {['No setup fee','Cancel with 30 days notice','Custom plans for 9+ locations','All plans include GBP management'].map(t => (
                  <span key={t}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="lsp-sec lsp-white-sec" aria-labelledby="compare-title">
          <div className="lsp-sec-in">
            <div {...rv('compare')}>
              <span className="lsp-sec-ey">Feature Breakdown</span>
              <h2 className="lsp-sec-ttl" id="compare-title"><AuroraText>Package Comparison</AuroraText> at a Glance</h2>
              <p className="lsp-sec-desc">See exactly what is included at each tier before you choose.</p>
              <div className="lsp-table-wrap">
                <table className="lsp-table" role="table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Starter — $349/mo</th>
                      <th className="lsp-pop-col">Growth — $599/mo ★</th>
                      <th>Multi-Location — $999/mo</th>
                      <th>Enterprise — $1,699/mo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Locations covered','1','1','Up to 3','Up to 8'],
                      ['GBP posts per month','4','8','12 per location','16 per location'],
                      ['Local keywords tracked','5','15','30+','50+'],
                      ['Citations built / cleaned','25 cleanup','50 build + cleanup','100/mo all locations','200/mo all locations'],
                      ['Review monitoring','Alerts only','Active management','Full management','Full + reputation strategy'],
                      ['Review generation strategy','—','✓','✓','✓ + advanced'],
                      ['Local link placements','—','3/mo','6/mo','10/mo'],
                      ['Local landing pages','—','1/mo','Full strategy','Custom strategy & execution'],
                      ['Competitor tracking','—','Monthly','Fortnightly','Weekly'],
                      ['Account manager','—','—','Dedicated','Senior dedicated'],
                      ['Strategy call','—','Monthly','Fortnightly','Weekly'],
                      ['AI Overview optimisation','Basic','✓','✓','Priority'],
                    ].map(([feat,...cols]) => (
                      <tr key={feat}>
                        <td>{feat}</td>
                        {cols.map((v,i) => (
                          <td key={i} className={i===1 ? 'lsp-pop-col' : v==='✓' ? 'lsp-check-cell' : v==='—' ? 'lsp-dash-cell' : ''}>
                            {v==='✓' ? '✓' : v==='—' ? '—' : v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="lsp-sec lsp-light-sec" aria-labelledby="process-title">
          <div className="lsp-sec-in">
            <div {...rv('process')}>
              <span className="lsp-sec-ey">How It Works</span>
              <h2 className="lsp-sec-ttl" id="process-title">Our <AuroraText>Local SEO Process</AuroraText> — Step by Step</h2>
              <p className="lsp-sec-desc">From day one to month twelve, here is exactly how we build your local search authority.</p>
              <div className="lsp-proc-grid">
                {[
                  {n:'01',t:'GBP Audit & Complete Setup',d:'We audit or create your Google Business Profile from scratch — optimising every field, selecting the right primary and secondary categories, adding all services, uploading optimised photos, and writing a keyword-rich business description that converts profile visitors.'},
                  {n:'02',t:'Keyword & Competitor Research',d:'We identify the highest-value local keywords for your business and service area, then map them to map pack intent vs. local organic intent. We analyse your top 3 competitors\' GBP activity, citation profiles, and review velocity to identify the gaps we need to close.'},
                  {n:'03',t:'Citation Building & NAP Cleanup',d:'We audit your existing citations for NAP inconsistencies, fix them across all major directories, then build new authoritative citations on tier-1 directories (Google, Apple Maps, Bing Places, Yelp) and industry-specific sites relevant to your business type.'},
                  {n:'04',t:'Local Content & Landing Pages',d:'We create or optimise local landing pages targeting your key service + location combinations, including LocalBusiness schema markup, embedded Google Maps, and optimised content. Growth and Multi-Location plans include monthly new local landing page delivery.'},
                  {n:'05',t:'Review Generation Strategy',d:'We build a systematic review generation process using post-visit email sequences, SMS follow-ups, QR code review cards, and in-store prompts. The goal is sustainable, compliant review velocity — not one-time spikes — that compounds your review authority month over month.'},
                  {n:'06',t:'Monthly Reporting & Optimisation',d:'Every month you receive a clear report covering GBP performance (views, clicks, calls, direction requests), keyword ranking changes, new reviews, citation progress, and next month\'s priorities. Growth and Multi-Location clients receive a strategy call to review performance and plan the next 30 days.'},
                ].map(s => (
                  <div key={s.n} className="lsp-proc-card lsp-glass">
                    <div className="lsp-proc-n">{s.n}</div>
                    <div className="lsp-proc-line" aria-hidden="true"/>
                    <div className="lsp-proc-t">{s.t}</div>
                    <p className="lsp-proc-d">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT MAKES OUR LOCAL SEO DIFFERENT ── */}
        <section className="lsp-sec lsp-white-sec" aria-labelledby="quality-title">
          <div className="lsp-sec-in">
            <div {...rv('quality')}>
              <span className="lsp-sec-ey">The 1Solutions Difference</span>
              <h2 className="lsp-sec-ttl" id="quality-title">What Makes Our <AuroraText>Local SEO</AuroraText> Different</h2>
              <p className="lsp-sec-desc">Not all local SEO agencies are equal. Here is what separates our approach from the rest.</p>
              <div className="lsp-qual-grid">
                {[
                  {icon:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, t:'Genuine GBP Experts', d:'Our team has managed Google Business Profiles since the platform launched as Google My Business. We understand how GBP signals interact with map pack rankings and have developed proprietary optimisation workflows that consistently deliver top-3 results.'},
                  {icon:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>, t:'White-Hat Citations Only', d:'We never use automated citation blasting tools that create low-quality, duplicate listings. Every citation is manually verified on authoritative directories. Our cleanup process identifies and resolves inconsistencies that automated tools miss — giving you lasting citation authority.'},
                  {icon:<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>, t:'AI Overview Optimisation', d:'We actively optimise GBP content, review responses, and local landing pages to appear in Google AI Overviews for local queries. As AI-generated answers become the default for local searches, this forward-looking approach ensures your business remains visible in the evolving search landscape.'},
                  {icon:<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>, t:'Ethical Review Generation', d:'We build review velocity through compliant post-purchase and post-visit communication sequences. We never gate reviews (showing the review link only to happy customers), buy reviews, or use review pods — all of which violate Google policy and risk your GBP getting suspended.'},
                  {icon:<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>, t:'Transparent Monthly Reports', d:'Every month you receive a report that clearly shows what changed and why — not a vanity metrics dashboard. We track the KPIs that drive real business outcomes: calls from GBP, direction requests, local keyword ranking positions, and new reviews — with month-over-month trend data.'},
                  {icon:<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>, t:'No Lock-In Contracts', d:'Our packages run month-to-month with 30 days\' notice to cancel. We earn your continued investment through results, not legal obligation. That said, local SEO compounds over time — the businesses that commit to 6+ months consistently see the most dramatic ranking improvements.'},
                ].map(c => (
                  <div key={c.t} className="lsp-qual-card lsp-glass">
                    <div className="lsp-qual-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none">{c.icon}</svg>
                    </div>
                    <div className="lsp-qual-t">{c.t}</div>
                    <p className="lsp-qual-d">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="lsp-sec lsp-light-sec" aria-labelledby="industries-title">
          <div className="lsp-sec-in">
            <div {...rv('industries')}>
              <span className="lsp-sec-ey">Sectors We Specialise In</span>
              <h2 className="lsp-sec-ttl" id="industries-title">Local SEO for <AuroraText>Every Local Business</AuroraText> Type</h2>
              <p className="lsp-sec-desc">We have delivered local SEO results across every major local business category. Our strategies are tailored to your industry's specific ranking dynamics.</p>
              <div className="lsp-ind-grid">
                {[
                  {name:'Restaurants & Cafes', icon:<><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><line x1="7" y1="2" x2="7" y2="11"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></>},
                  {name:'Dental Practices', icon:<><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M9 9h6M9 12h6M9 15h4"/></>},
                  {name:'Law Firms', icon:<><path d="M12 22V12"/><path d="m17 7-5-5-5 5"/><path d="M6.5 14.5 5 16l-2-1 2-3 2 1-1 1.5z"/><path d="m17.5 14.5 1.5 1.5 2-1-2-3-2 1 1 1.5z"/></>},
                  {name:'Plumbers & HVAC', icon:<><path d="M14 12c0 1.66-1.34 3-3 3s-3-1.34-3-3V6a3 3 0 0 1 6 0v6z"/><line x1="11" y1="15" x2="11" y2="22"/><line x1="8" y1="22" x2="14" y2="22"/></>},
                  {name:'Medical Clinics', icon:<><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>},
                  {name:'Real Estate', icon:<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>},
                  {name:'Retail Shops', icon:<><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>},
                  {name:'Gyms & Fitness', icon:<><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>},
                  {name:'Auto Repair', icon:<><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>},
                  {name:'Accountants', icon:<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>},
                  {name:'Hotels & B&Bs', icon:<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/><path d="M9 12h6"/></>},
                  {name:'Home Services', icon:<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>},
                ].map(ind => (
                  <div key={ind.name} className="lsp-ind-card">
                    <div className="lsp-ind-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{ind.icon}</svg>
                    </div>
                    <div className="lsp-ind-name">{ind.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RESULTS (DARK) ── */}
        <section className="lsp-sec lsp-dark-sec" aria-labelledby="results-title">
          <div className="lsp-ai-orb" style={{top:'auto',bottom:-100,right:'auto',left:-100}} aria-hidden="true"/>
          <div className="lsp-sec-in" style={{position:'relative',zIndex:2,textAlign:'center'}}>
            <div {...rv('results')}>
              <span className="lsp-dark-ey">Proven Results</span>
              <h2 className="lsp-dark-ttl" id="results-title"><AuroraText>Local SEO Results</AuroraText>: Real Map Pack Growth</h2>
              <p className="lsp-dark-desc" style={{margin:'0 auto 48px'}}>Real outcomes from real businesses — achieved with the same packages available to you today.</p>
              <div className="lsp-res-grid">
                {[
                  {metric:'+340%',label:'GBP Profile Views',sub:'Restaurant, Manchester — 3 months on Growth plan'},
                  {metric:'#1',label:'Map Pack for 8 Keywords',sub:'Dental Practice, Toronto — 4 months on Growth plan'},
                  {metric:'190+',label:'Google Reviews Earned',sub:'Plumbing company, London — from 23 reviews in 6 months'},
                  {metric:'3/3',label:'Locations in Top 3 Map Pack',sub:'Multi-location retail, UK — 5 months on Multi-Location plan'},
                ].map(r => (
                  <div key={r.label} className="lsp-res-card">
                    <div className="lsp-res-metric">{r.metric}</div>
                    <div className="lsp-res-label">{r.label}</div>
                    <div className="lsp-res-sub">{r.sub}</div>
                  </div>
                ))}
              </div>
              <div>
                <Link href="#free-audit" className="lsp-cs-cta">Get Similar Results for Your Business</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="lsp-sec lsp-white-sec" aria-labelledby="why-ch-title">
          <div className="lsp-sec-in">
            <div {...rv('whych')}>
              <span className="lsp-sec-ey">Why Choose Us</span>
              <h2 className="lsp-sec-ttl" id="why-ch-title">Why Choose Our <AuroraText>Local SEO</AuroraText> Service</h2>
              <p className="lsp-sec-desc">With 15+ years of SEO experience and 300+ local businesses served, we bring depth that generalist agencies cannot match.</p>
              <div className="lsp-qual-grid">
                {[
                  {icon:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>, t:'Dedicated Strategists, Not Account Managers', d:'Your account is managed by a specialist who understands local SEO deeply — not a junior account manager following a script. We ask the right questions, spot the right opportunities, and move with genuine expertise.'},
                  {icon:<><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>, t:'No Black-Box Reporting', d:'Every metric in our monthly report is explained in plain English. We show you exactly what we did, what changed, and what we are doing next. If a tactic is not working, we tell you — and change course.'},
                  {icon:<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>, t:'Results-Driven, Not Activity-Driven', d:'We focus on ranking improvements, GBP engagement, and enquiry growth — not vanity metrics like impressions or DA scores. If your phone is not ringing more, we are not satisfied.'},
                  {icon:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, t:'Fast Onboarding, No Delays', d:'We begin work within 48 hours of contract signing. Your GBP audit is complete in week one. Citation work begins in week two. You see meaningful activity from day one — not after a 4-week discovery phase.'},
                  {icon:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>, t:'Compliant with Google\'s Guidelines', d:'Every tactic we use is within Google\'s Webmaster Guidelines and Terms of Service. We never risk your GBP with black-hat shortcuts — a suspended GBP can wipe out years of local SEO work overnight. We protect what you build.'},
                  {icon:<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>, t:'Direct Access to Your Strategist', d:'You have a direct line to the person doing the work — not a support ticket system. Questions get answered fast, strategy calls are substantive, and you always know exactly where your account stands.'},
                ].map(c => (
                  <div key={c.t} className="lsp-qual-card lsp-glass">
                    <div className="lsp-qual-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none">{c.icon}</svg>
                    </div>
                    <div className="lsp-qual-t">{c.t}</div>
                    <p className="lsp-qual-d">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="lsp-testi-sec" aria-labelledby="testi-title">
          <div className="lsp-testi-hd">
            <div {...rv('testi')}>
              <span className="lsp-sec-ey" style={{display:'block',textAlign:'center'}}>Client Success Stories</span>
              <h2 className="lsp-sec-ttl" id="testi-title" style={{textAlign:'center',maxWidth:600,margin:'0 auto'}}>
                What Our <AuroraText>Local SEO Clients</AuroraText> Say
              </h2>
            </div>
          </div>
          <div className="lsp-trow">
            <div className="lsp-tfade-l" aria-hidden="true"/>
            <div className="lsp-tfade-r" aria-hidden="true"/>
            <div className="lsp-ttrack" aria-label="Client testimonials" role="list">
              {[...TESTIMONIALS_ROW1,...TESTIMONIALS_ROW1].map((t,i) => (
                <div key={i} className="lsp-tcard" role="listitem">
                  <div className="lsp-tcard-star" aria-label="5 stars">★★★★★</div>
                  <p className="lsp-tcard-text">{t.text}</p>
                  <div className="lsp-tcard-author">
                    <div className="lsp-tcard-avatar" style={{background:t.bg}} aria-hidden="true">{t.initials}</div>
                    <div>
                      <div className="lsp-tcard-name">{t.name}</div>
                      <div className="lsp-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lsp-trow" style={{marginTop:16}}>
            <div className="lsp-tfade-l" aria-hidden="true"/>
            <div className="lsp-tfade-r" aria-hidden="true"/>
            <div className="lsp-ttrack-rev" aria-label="More client testimonials" role="list">
              {[...TESTIMONIALS_ROW2,...TESTIMONIALS_ROW2].map((t,i) => (
                <div key={i} className="lsp-tcard" role="listitem">
                  <div className="lsp-tcard-star" aria-label="5 stars">★★★★★</div>
                  <p className="lsp-tcard-text">{t.text}</p>
                  <div className="lsp-tcard-author">
                    <div className="lsp-tcard-avatar" style={{background:t.bg}} aria-hidden="true">{t.initials}</div>
                    <div>
                      <div className="lsp-tcard-name">{t.name}</div>
                      <div className="lsp-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FREE AUDIT FORM ── */}
        <section id="free-audit" className="lsp-audit-sec" aria-labelledby="audit-form-title">
          <div className="lsp-audit-in">
            {/* Left copy */}
            <div>
              <h2 className="lsp-audit-ttl" id="audit-form-title">Get Your Free<br/><AuroraText>Local SEO Audit</AuroraText></h2>
              <p className="lsp-audit-desc">Tell us about your business and we will analyse your Google Business Profile health, citation consistency, review profile, and local ranking positions — then recommend the right package for your market. Completely free, no obligations.</p>
              <div className="lsp-audit-benefits-box">
                <div className="lsp-audit-ben">
                  <svg className="lsp-audit-ben-icon" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span className="lsp-audit-ben-text">Your details are 100% confidential. We never share your information.</span>
                </div>
                <div className="lsp-audit-ben">
                  <svg className="lsp-audit-ben-icon" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
                  <span className="lsp-audit-ben-text">A senior local SEO strategist personally reviews your GBP, citations, and competitors.</span>
                </div>
                <div className="lsp-audit-ben">
                  <svg className="lsp-audit-ben-icon" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-6v-4m0-4h.01"/></svg>
                  <span className="lsp-audit-ben-text">We respond within 48 business hours with your custom local SEO audit findings.</span>
                </div>
                <div className="lsp-audit-ben">
                  <svg className="lsp-audit-ben-icon" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="lsp-audit-ben-text">No hard sell. If we are not the right fit, we will tell you honestly.</span>
                </div>
                <div className="lsp-audit-stats">
                  <div><div className="lsp-audit-stat-num">300+</div><div className="lsp-audit-stat-txt">Local Businesses</div></div>
                  <div><div className="lsp-audit-stat-num">15+</div><div className="lsp-audit-stat-txt">Years Experience</div></div>
                  <div><div className="lsp-audit-stat-num">93%</div><div className="lsp-audit-stat-txt">Client Retention</div></div>
                </div>
              </div>
            </div>
            {/* Right form */}
            <div className="lsp-audit-form-box">
              {auditSt === 'success' ? (
                <div className="lsp-audit-success-wrap">
                  <div className="lsp-audit-success-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>We will analyse your local SEO profile and send your free audit report within 48 hours. Check your inbox.</p>
                </div>
              ) : (
                <>
                  <h3>Request Free Local SEO Audit</h3>
                  <form className="lsp-af-form" onSubmit={_auditSubmit}>
                    <div className="lsp-af-row">
                      <div className="lsp-fg">
                        <label htmlFor="lsp-name">Full Name*</label>
                        <input id="lsp-name" name="la-name" type="text" placeholder="Full Name*" required/>
                      </div>
                      <div className="lsp-fg">
                        <label htmlFor="lsp-email">Business Email*</label>
                        <input id="lsp-email" name="la-email" type="email" placeholder="Business Email Address*" required/>
                      </div>
                    </div>
                    <div className="lsp-af-row">
                      <div className="lsp-fg">
                        <label htmlFor="lsp-phone">Phone Number*</label>
                        <div className="lsp-af-phone-wrap">
                          <select name="la-cc" aria-label="Country code">
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+61">+61</option>
                          </select>
                          <input id="lsp-phone" name="la-phone" type="tel" placeholder="Phone Number*" required/>
                        </div>
                      </div>
                      <div className="lsp-fg">
                        <label htmlFor="lsp-domain">Website URL*</label>
                        <input id="lsp-domain" name="la-domain" type="url" placeholder="https://yourwebsite.com" required/>
                      </div>
                    </div>
                    <div className="lsp-fg">
                      <label htmlFor="lsp-biztype">Business Type*</label>
                      <select id="lsp-biztype" name="la-biztype" required>
                        <option value="">Select your business type</option>
                        <option>Restaurant / Cafe</option>
                        <option>Dental Practice</option>
                        <option>Law Firm</option>
                        <option>Medical Clinic</option>
                        <option>Plumber / HVAC</option>
                        <option>Gym / Fitness</option>
                        <option>Retail Shop</option>
                        <option>Real Estate</option>
                        <option>Auto Repair</option>
                        <option>Accountant</option>
                        <option>Hotel / B&B</option>
                        <option>Home Services</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="lsp-fg">
                      <label htmlFor="lsp-goals">Goals / Current Challenges*</label>
                      <textarea id="lsp-goals" name="la-goals" rows={5} placeholder="Describe your goals, target area, number of locations, and any local SEO challenges you are currently facing..." required/>
                    </div>
                    <div className="lsp-af-consent">
                      <input type="checkbox" id="lsp-consent" required/>
                      <label htmlFor="lsp-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                    </div>
                    {auditSt === 'validation' && (
                      <p style={{color:'#dc2626',fontSize:13,margin:0,textAlign:'center'}}>Please fill in all required fields and accept the privacy policy.</p>
                    )}
                    {auditSt === 'error' && (
                      <p style={{color:'#dc2626',fontSize:13,margin:0,textAlign:'center'}}>Something went wrong. Please try again or email us directly.</p>
                    )}
                    <button type="submit" className="lsp-audit-submit" disabled={auditSt === 'loading'}>
                      {auditSt === 'loading' ? 'Sending...' : 'Get My Free Local SEO Audit'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="lsp-sec lsp-light-sec" aria-labelledby="faq-title">
          <div className="lsp-sec-in" style={{maxWidth:1000,margin:'0 auto'}}>
            <div {...rv('faq')}>
              <span className="lsp-sec-ey">Common Questions</span>
              <h2 className="lsp-sec-ttl" id="faq-title"><AuroraText>Local SEO Package</AuroraText> FAQs</h2>
              <p className="lsp-sec-desc">Everything you need to know about local SEO packages before choosing a plan. New York City business? See our <Link href="/local-seo-guide-for-small-businesses-in-new-york-city">complete local SEO guide for NYC small businesses</Link> for a deeper walkthrough.</p>
              <div className="lsp-faq-list">
                {FAQS.map((f,i) => (
                  <div key={i} className={`lsp-fitem${openFaq===i?' open':''}`}>
                    <button className="lsp-fq" onClick={() => setOpenFaq(openFaq===i ? -1 : i)} aria-expanded={openFaq===i}>
                      <span className="lsp-fq-badge" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
                      <span className="lsp-fq-text">{f.q}</span>
                      <svg className="lsp-fq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    {openFaq===i && <div className="lsp-fa">{f.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="lsp-related-section" aria-labelledby="related-title">
          <div className="lsp-related-inner">
            <div {...rv('related')}>
              <span className="lsp-related-eyebrow">Explore More Services</span>
              <h2 className="lsp-related-title" id="related-title">Explore <AuroraText>Related Services</AuroraText> and Technologies</h2>
              <p className="lsp-related-sub">Local SEO works best as part of a complete digital marketing strategy. Explore our full range of services designed to grow your business online.</p>
              <hr className="lsp-related-divider"/>
              <div className="lsp-related-tags">
                {RELATED_TAGS.map(tag => (
                  <Link key={tag.href} href={tag.href} className={`lsp-rtag ${tag.cls}`}>{tag.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
