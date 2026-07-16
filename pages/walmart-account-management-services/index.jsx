'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const ACCENT = '#0071CE';
const DARK   = '#001d3d';
const RGB    = '0,113,206';

const challenges = [
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: "Walmart's Polaris Algorithm Is Not Amazon A9", desc: "Sellers who copy their Amazon strategy onto Walmart see poor results. Polaris weighs item quality score, price competitiveness, and fulfilment speed differently. Without platform-specific expertise, you leave revenue on the table every day." },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Item Setup & Spec Compliance', desc: "Walmart has strict category taxonomies, attribute fields, and content quality thresholds. Non-compliant items are auto-suppressed from search — often without a clear error message — silently killing your organic visibility." },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'WFS Setup Complexity', desc: "Walmart Fulfillment Services can dramatically improve ranking and conversions, but the setup, eligibility requirements, and inbound shipping standards are far more complex than Amazon FBA. Most sellers never get it right on their own." },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Missed Walmart Connect Opportunity', desc: "Walmart Connect has fewer advertisers and significantly lower CPCs than Amazon Ads — a real first-mover advantage. Without a structured Sponsored Products strategy, brands cede visibility to the handful of sellers already capitalising on cheaper traffic." },
];

const services = [
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Walmart Seller Center Management', desc: 'Full Seller Center account setup, onboarding completion, performance dashboard monitoring, and ongoing account health management to keep your seller score in good standing with Walmart.' },
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Polaris-Optimised Listing Creation', desc: "Algorithm-driven item titles, descriptions, and attribute fields built to meet Walmart's content quality standards and rank higher in Walmart.com search results." },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'WFS Setup & Inventory Management', desc: 'End-to-end WFS setup including item eligibility review, inbound shipment creation, freight coordination, and ongoing inventory management to keep your WFS items in stock and ranking.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Walmart Connect Advertising', desc: 'Sponsored Products and Display campaign management — keyword strategy, bid optimisation, and performance reporting to drive profitable, low-CPC traffic to your catalogue.' },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: 'Item Quality Score Optimisation', desc: "Walmart's IQS directly impacts search visibility. We systematically improve content completeness, imagery quality, and attribute accuracy to push your IQS to 90+ across your entire catalogue." },
  { icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', title: 'Category Taxonomy & Attribute Management', desc: "Correct category assignment and complete attribute data are critical for Walmart search. We ensure every item is mapped to the right taxonomy and has full attribute coverage per Walmart's spec sheets." },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: 'Review & Rating Management', desc: "Walmart's review system significantly impacts conversion and search rank. We implement structured review generation strategies and respond to customer feedback to build your seller reputation." },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Monthly Performance Reporting', desc: 'Detailed monthly reports covering sales velocity, item quality scores, ad performance, competitor pricing, and WFS inventory — with a clear action plan for the next 30 days.' },
];

const stats = [
  { num: '120', suffix: 'M+', lbl: 'Walmart.com monthly visitors' },
  { num: '82', suffix: 'B+', lbl: 'Walmart eCommerce GMV (2024)' },
  { num: '43', suffix: 'x', lbl: 'avg revenue growth · 8 months' },
  { num: '98', suffix: '%', lbl: 'listing approval rate' },
];

const results = [
  { metric: '4.3×', label: 'Average Revenue Growth', sub: 'Within the first 8 months across all managed Walmart seller accounts' },
  { metric: '98%', label: 'Listing Approval Rate', sub: 'First submission, through compliant item setup and attribute management' },
  { metric: '41%', label: 'Lower CPC vs Amazon', sub: 'Walmart Connect advertising benchmark on comparable categories' },
];

const caseStudies = [
  {
    seller: 'US Home Goods Brand',
    before: '$0 on Walmart',
    after: '$85K/mo in 6 months',
    time: '6 months',
    actions: ['Full catalogue set up with WFS from day one', 'Polaris-optimised listings with 95+ item quality scores', 'Walmart Connect campaigns built from scratch — profitable in month 2'],
  },
  {
    seller: 'Sporting Goods Seller',
    before: '$18K/mo · 4.2% return rate',
    after: '$64K/mo · 1.1% return rate',
    time: '5 months',
    actions: ['Product content overhaul reduced return-driving misexpectations', 'WFS migration improved delivery speed score and organic rank', 'Competitive pricing strategy improved Buy Box win rate to 94%'],
  },
];

const why = [
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Walmart-Specific Expertise', desc: 'We work exclusively on Walmart Marketplace strategy — not a generic marketplace agency that treats Walmart as an Amazon afterthought. Polaris algorithm, WFS, and IQS are our core competencies.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Platform-First Approach', desc: "We never copy an Amazon strategy onto Walmart. Every campaign, listing, and fulfilment decision is built from the ground up for Walmart.com's search algorithm and buyer behaviour." },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title: 'Dedicated Account Manager', desc: 'One senior Walmart specialist owns your account — not rotated between junior team members. You always know who is responsible for your growth and can reach them directly.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'ROI-First Reporting', desc: 'Monthly reports focus on revenue impact, not vanity metrics. Every action we take is mapped back to sales velocity, advertising ROI, and IQS movement so you always know what your investment is producing.' },
  { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'No Lock-In Contracts', desc: "We earn your business every month. No long-term commitments or exit fees. If we're not growing your Walmart revenue, you're free to leave — though our 97% retention rate says clients rarely want to." },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: '15+ Years of eCommerce Experience', desc: 'Since 2008, we have managed marketplace accounts across Amazon, Walmart, eBay, and direct-to-consumer platforms — giving us the depth to anticipate problems before they cost you revenue.' },
];

const steps = [
  { title: 'Walmart Account Audit', desc: 'Full review of your existing Seller Center setup, item quality scores, suppressed listings, pricing competitiveness, WFS eligibility, and advertising gaps.' },
  { title: 'Strategy & Roadmap', desc: 'A 90-day Walmart growth plan prioritised by revenue impact — quick wins first, then structural improvements like WFS migration and IQS uplift.' },
  { title: 'Item Setup & Optimisation', desc: 'Category mapping, attribute planning, and bulk item setup with full spec compliance — targeting 95+ item quality scores across your catalogue.' },
  { title: 'WFS Onboarding', desc: 'Item eligibility review, inbound freight coordination, WFS setup in Seller Center, and inventory planning to avoid stockouts that tank your organic ranking.' },
  { title: 'Advertising Launch', desc: 'Walmart Connect Sponsored Products campaigns built from the ground up with keyword research, initial bids, and campaign structure designed for Walmart buyer intent.' },
  { title: 'Ongoing Optimisation', desc: 'Weekly advertising bid adjustments, monthly IQS reviews, pricing strategy updates, competitor monitoring, and a full performance report every 30 days.' },
];

const testimonials = [
  { quote: "1Solutions launched our Walmart presence from zero to $85K/month in under 6 months. The WFS setup alone improved our ranking dramatically — something we'd been struggling to configure for over a year.", name: 'Sarah M.', role: 'Director of eCommerce, Home Goods Brand', stars: 5 },
  { quote: "Our ACoS on Walmart Connect dropped from 48% to 19% within 60 days of 1Solutions taking over. They know how to find the low-CPC opportunities that most agencies completely miss.", name: 'James R.', role: 'CEO, Sporting Goods Company', stars: 5 },
  { quote: "We were suppressed from Walmart search for 3 months and didn't know why. 1Solutions diagnosed the IQS issues, fixed our attribute data, and had us ranking on page one within 4 weeks.", name: 'Lisa T.', role: 'VP Marketplace, Consumer Brands Ltd.', stars: 5 },
];

const FAQS = [
  { q: 'How is Walmart Marketplace different from Amazon for sellers?', a: "Walmart's Polaris search algorithm prioritises price competitiveness, item quality score, and fulfilment speed differently than Amazon's A9. Walmart has a smaller but highly price-conscious buyer base, lower seller competition, and significantly lower advertising costs. The marketplace is growing fast — sellers who move now gain first-mover advantage while CPCs and competition remain low." },
  { q: 'What is Walmart Fulfillment Services (WFS) and do I need it?', a: 'WFS is Walmart\'s equivalent of Amazon FBA. You send inventory to Walmart\'s fulfilment centres and they handle storage, picking, packing, and delivery. WFS listings display a "Fulfilled by Walmart" badge which significantly increases conversion rate and search ranking. We strongly recommend WFS for eligible products — it is one of the single biggest ranking levers on the platform.' },
  { q: 'How long does Walmart seller onboarding take?', a: 'The Seller Center application and approval process typically takes 2 to 4 weeks. Once approved, item setup and the first listings can go live within 1 to 2 weeks depending on catalogue size and data readiness. WFS onboarding adds another 1 to 2 weeks for inbound shipment setup and item eligibility review.' },
  { q: 'Can you manage Walmart Connect advertising alongside organic optimisation?', a: "Yes. We manage both organic listing optimisation (item quality score, Polaris SEO, WFS) and Walmart Connect advertising (Sponsored Products, Display) as an integrated programme. The two strategies compound — organic ranking reduces reliance on paid visibility while advertising accelerates ranking for new items that haven't yet built organic history." },
  { q: 'Do you handle Walmart category approvals for restricted categories?', a: 'Yes. Some categories require additional approval including certain electronics, health products, and grocery items. We manage the category approval process, prepare the required documentation, and follow up with your Walmart account representative until approval is granted.' },
  { q: 'What revenue growth can I realistically expect in the first 6 months?', a: 'Most of our Walmart sellers achieve 3 to 5 times their initial monthly revenue within 6 months, particularly when WFS and Walmart Connect are used together. Sellers starting from scratch typically reach $50K to $100K per month within 6 to 9 months depending on category, catalogue size, and pricing competitiveness.' },
  { q: 'Do you work with sellers in the US, Canada, and Australia?', a: 'Yes. While Walmart.com primarily serves the US market, we work with sellers based anywhere globally who want to sell on Walmart Marketplace. We are fully remote, operate in your time zone for calls, and communicate in plain English. Our team has been delivering eCommerce management services internationally since 2008.' },
  { q: 'What seller account access do you need to manage our Walmart account?', a: 'We work with the minimum access level required. For most engagements we request secondary user access within your Seller Center account, which you can revoke at any time. We never ask for your primary login credentials and operate under strict data security protocols throughout the engagement.' },
];

const trust = ['Walmart Seller Center Experts', 'WFS-Certified Setup', 'No Lock-In Contracts', 'Dedicated Account Manager'];

function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const n = parseInt(String(target).replace(/\D/g, ''), 10);
    if (!n) return;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

function StatCard({ num, suffix, lbl, active }) {
  const val = useCountUp(num, 1800, active);
  return (
    <div className="wlmt-stat-item">
      <span className="wlmt-stat-num">{active ? val : num}{suffix}</span>
      <span className="wlmt-stat-lbl">{lbl}</span>
    </div>
  );
}

export default function WalmartAccountManagement() {
  const [form, setForm]       = useState({ name: '', email: '', company: '', revenue: 'Not yet on Walmart', message: '' });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [statsActive, setStatsActive] = useState(false);
  const [visibleSecs, setVisibleSecs] = useState(new Set());
  const statsRef = useRef(null);
  const secRefs  = useRef({});

  useEffect(() => {
    const statObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsActive(true); statObs.disconnect(); } }, { threshold: 0.3 });
    if (statsRef.current) statObs.observe(statsRef.current);

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVisibleSecs(prev => new Set([...prev, e.target.dataset.sec])); });
    }, { threshold: 0.1 });
    Object.values(secRefs.current).forEach(el => { if (el) obs.observe(el); });

    return () => { statObs.disconnect(); obs.disconnect(); };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      const token = await new Promise((res) => {
        if (typeof window !== 'undefined' && window.grecaptcha) {
          window.grecaptcha.ready(() => window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'contact' }).then(res));
        } else res('');
      });
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'Walmart Account Management', recaptchaToken: token }),
      });
    } catch (_) {}
    setSending(false);
    setSent(true);
  }

  const vis = (id) => visibleSecs.has(id);

  return (
    <>
      <Head>
        <title>Walmart Marketplace Account Management Services | 1Solutions</title>
        <meta name="description" content="Expert Walmart Marketplace account management by 1Solutions. We manage Seller Center setup, Polaris-optimised listings, WFS fulfilment, Walmart Connect advertising, and item quality scores for sellers in the US, Canada, and Australia." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="walmart marketplace account management, walmart seller management services, walmart connect advertising, walmart WFS setup, walmart listing optimisation, polaris algorithm optimisation, walmart seller center management" />
        <link rel="canonical" href="https://www.1solutions.biz/walmart-account-management-services/" />
        <meta property="og:title" content="Walmart Marketplace Account Management Services | 1Solutions" />
        <meta property="og:description" content="Full-service Walmart Marketplace management — Seller Center, WFS, Polaris SEO, Walmart Connect advertising, and item quality optimisation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.1solutions.biz/walmart-account-management-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", "name": "Walmart Marketplace Account Management", "description": "Full-service Walmart Marketplace management including Seller Center setup, Polaris-optimised listings, WFS fulfilment, Walmart Connect advertising, and item quality score optimisation.", "provider": { "@type": "Organization", "name": "1Solutions", "url": "https://www.1solutions.biz" }, "areaServed": ["US","CA","AU"], "serviceType": "eCommerce Marketplace Management", "url": "https://www.1solutions.biz/walmart-account-management-services/" },
            { "@type": "FAQPage", "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
            { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.1solutions.biz/" }, { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.1solutions.biz/ecommerce-marketing-services/" }, { "@type": "ListItem", "position": 3, "name": "Walmart Marketplace Account Management", "item": "https://www.1solutions.biz/walmart-account-management-services/" }] }
          ]
        }) }} />
        <script src="https://www.google.com/recaptcha/api.js?render=6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs" async defer />
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0;}
          body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}

          .wlmt-hero{position:relative;overflow:hidden;padding:110px 40px 100px;background:linear-gradient(135deg,rgba(${RGB},0.09) 0%,rgba(255,255,255,0.97) 45%,rgba(0,29,61,0.06) 100%);}
          .wlmt-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 70% 40%,rgba(${RGB},0.07) 0%,transparent 70%);pointer-events:none;}
          .wlmt-hero-dots{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(${RGB},0.14) 1px,transparent 1px);background-size:32px 32px;pointer-events:none;opacity:0.45;}
          .wlmt-orb1{position:absolute;top:-180px;right:-180px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(${RGB},0.13) 0%,transparent 70%);pointer-events:none;filter:blur(20px);}
          .wlmt-orb2{position:absolute;bottom:-120px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(0,29,61,0.09) 0%,transparent 70%);pointer-events:none;filter:blur(16px);}
          .wlmt-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2;}
          .wlmt-hero-layout{display:grid;grid-template-columns:1fr 420px;gap:64px;align-items:center;}
          .wlmt-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(${RGB},0.09);border:1px solid rgba(${RGB},0.22);border-radius:50px;padding:6px 18px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px;}
          .wlmt-eyebrow-dot{width:6px;height:6px;border-radius:50%;background:${ACCENT};animation:wlmt-pulse 2s ease infinite;}
          @keyframes wlmt-pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(1.5);}}
          .wlmt-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.1;letter-spacing:-1.5px;color:#0A1628;margin-bottom:24px;}
          .wlmt-h1-accent{background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .wlmt-desc{font-size:1.1rem;color:#4b5563;line-height:1.8;margin-bottom:32px;max-width:600px;}
          .wlmt-trust{display:flex;flex-wrap:wrap;gap:16px;margin-bottom:36px;}
          .wlmt-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#374151;font-weight:600;}
          .wlmt-badge svg{color:${ACCENT};}
          .wlmt-btns{display:flex;gap:14px;flex-wrap:wrap;}
          .wlmt-btn-p{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 8px 28px rgba(${RGB},0.30);}
          .wlmt-btn-p:hover{opacity:0.9;transform:translateY(-2px);box-shadow:0 12px 36px rgba(${RGB},0.38);}
          .wlmt-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.75);color:${ACCENT};padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(${RGB},0.25);transition:all 0.25s;backdrop-filter:blur(8px);}
          .wlmt-btn-s:hover{background:#fff;transform:translateY(-2px);}

          .wlmt-hero-card{background:rgba(255,255,255,0.88);backdrop-filter:blur(16px);border:1px solid rgba(${RGB},0.15);border-radius:24px;padding:36px;box-shadow:0 8px 40px rgba(${RGB},0.12),inset 0 1px 0 rgba(255,255,255,0.95);}
          .wlmt-hero-card-title{font-size:12px;font-weight:700;color:${ACCENT};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:22px;}
          .wlmt-stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(${RGB},0.08);border-radius:16px;overflow:hidden;margin-bottom:22px;}
          .wlmt-stat-item{background:#fff;display:flex;flex-direction:column;padding:20px;gap:4px;}
          .wlmt-stat-num{font-size:2rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px;}
          .wlmt-stat-lbl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;}
          .wlmt-hero-card-cta{display:block;text-align:center;background:${ACCENT};color:#fff;padding:13px 20px;border-radius:50px;font-weight:700;font-size:0.9rem;text-decoration:none;transition:opacity 0.2s,transform 0.2s;}
          .wlmt-hero-card-cta:hover{opacity:0.9;transform:translateY(-1px);}
          .wlmt-hero-card-trust{font-size:11px;color:#9ca3af;text-align:center;margin-top:10px;}



          .wlmt-sec{padding:88px 40px;}
          .wlmt-bg{background:#f8fafd;}
          .wlmt-bg2{background:linear-gradient(135deg,rgba(${RGB},0.03) 0%,rgba(255,255,255,1) 50%,rgba(0,29,61,0.03) 100%);}
          .wlmt-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px;}
          .wlmt-h2{font-size:clamp(1.9rem,3.2vw,2.9rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin-bottom:16px;}
          .wlmt-h2 span{background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .wlmt-lead{font-size:1rem;color:#4b5563;line-height:1.8;max-width:640px;margin-bottom:48px;}
          .wlmt-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .wlmt-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .wlmt-grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:28px;}

          .wlmt-card{background:linear-gradient(135deg,rgba(${RGB},0.05) 0%,rgba(255,255,255,0.95) 60%,rgba(${RGB},0.03) 100%);border:1px solid rgba(255,255,255,0.9);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(${RGB},0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s;}
          .wlmt-card:hover{transform:translateY(-6px);border-color:rgba(${RGB},0.20);box-shadow:0 16px 48px rgba(${RGB},0.13);}
          .wlmt-icon{width:48px;height:48px;border-radius:14px;background:rgba(${RGB},0.10);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .wlmt-icon svg{width:22px;height:22px;color:${ACCENT};}
          .wlmt-card-h{font-size:1rem;font-weight:700;color:#0A1628;margin-bottom:10px;line-height:1.3;}
          .wlmt-card-p{font-size:13.5px;color:#4b5563;line-height:1.7;}

          .wlmt-chal-card{background:#fff;border:1px solid rgba(${RGB},0.10);border-radius:20px;padding:28px;box-shadow:0 2px 16px rgba(${RGB},0.06);transition:transform 0.25s,box-shadow 0.25s;}
          .wlmt-chal-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(${RGB},0.12);}
          .wlmt-chal-icon{width:52px;height:52px;border-radius:16px;background:rgba(${RGB},0.09);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .wlmt-chal-icon svg{width:24px;height:24px;color:${ACCENT};}
          .wlmt-chal-h{font-size:1rem;font-weight:700;color:#0A1628;margin-bottom:10px;}
          .wlmt-chal-p{font-size:13.5px;color:#4b5563;line-height:1.7;}

          .wlmt-results{background:linear-gradient(135deg,${DARK} 0%,${ACCENT} 100%);padding:72px 40px;position:relative;overflow:hidden;}
          .wlmt-results::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 80% 50%,rgba(255,255,255,0.08) 0%,transparent 70%);pointer-events:none;}
          .wlmt-res-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
          .wlmt-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:12px;text-align:center;}
          .wlmt-res-h{font-size:clamp(1.9rem,3vw,2.7rem);font-weight:900;color:#fff;text-align:center;margin-bottom:48px;line-height:1.2;}
          .wlmt-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .wlmt-res-card{background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:20px;padding:40px 28px;text-align:center;backdrop-filter:blur(8px);transition:transform 0.25s,background 0.25s;}
          .wlmt-res-card:hover{transform:translateY(-4px);background:rgba(255,255,255,0.15);}
          .wlmt-res-metric{font-size:3.6rem;font-weight:900;line-height:1;margin-bottom:12px;letter-spacing:-2px;color:#fff;}
          .wlmt-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.3;}
          .wlmt-res-sub{font-size:12.5px;color:rgba(255,255,255,0.55);line-height:1.5;}

          .wlmt-cs-card{background:#fff;border:1px solid #e5e7eb;border-radius:20px;padding:36px;box-shadow:0 4px 20px rgba(0,0,0,0.06);transition:transform 0.25s,box-shadow 0.25s;}
          .wlmt-cs-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,0.10);}
          .wlmt-cs-badge{display:inline-block;background:rgba(${RGB},0.10);color:${ACCENT};font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 14px;border-radius:50px;margin-bottom:14px;}
          .wlmt-cs-seller{font-size:1.15rem;font-weight:800;color:#0A1628;margin-bottom:22px;}
          .wlmt-cs-metrics{display:flex;align-items:center;gap:20px;margin-bottom:24px;flex-wrap:wrap;padding:18px;background:#f8fafd;border-radius:14px;}
          .wlmt-cs-metric{display:flex;flex-direction:column;gap:4px;}
          .wlmt-cs-label{font-size:11px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;}
          .wlmt-cs-val{font-size:1rem;font-weight:700;color:#0A1628;}
          .wlmt-cs-before{color:#ef4444;}.wlmt-cs-after{color:#16a34a;}
          .wlmt-cs-arrow{font-size:1.8rem;color:#d1d5db;}
          .wlmt-cs-actions{list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;}
          .wlmt-cs-actions li{font-size:14px;color:#4b5563;padding-left:22px;position:relative;line-height:1.6;}
          .wlmt-cs-actions li::before{content:"✓";position:absolute;left:0;color:${ACCENT};font-weight:800;}

          .wlmt-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .wlmt-testi-card{background:linear-gradient(135deg,rgba(${RGB},0.04) 0%,rgba(255,255,255,0.98) 100%);border:1px solid rgba(${RGB},0.12);border-radius:20px;padding:32px;box-shadow:0 4px 20px rgba(${RGB},0.07);display:flex;flex-direction:column;gap:16px;}
          .wlmt-testi-stars{display:flex;gap:3px;}
          .wlmt-testi-star{color:#FFC220;font-size:17px;}
          .wlmt-testi-quote{font-size:14.5px;color:#374151;line-height:1.8;font-style:italic;flex:1;}
          .wlmt-testi-author{display:flex;align-items:center;gap:12px;padding-top:16px;border-top:1px solid rgba(${RGB},0.10);}
          .wlmt-testi-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,${ACCENT},${DARK});display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:16px;flex-shrink:0;}
          .wlmt-testi-name{font-size:14px;font-weight:700;color:#0A1628;}
          .wlmt-testi-role{font-size:12px;color:#6b7280;}

          .wlmt-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}

          .wlmt-proc-num{font-size:3.5rem;font-weight:900;color:rgba(${RGB},0.10);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .wlmt-proc-line{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(${RGB},0.3));border-radius:2px;margin-bottom:16px;}
          .wlmt-proc-h{font-size:1rem;font-weight:700;color:#0A1628;margin-bottom:10px;}
          .wlmt-proc-p{font-size:13.5px;color:#4b5563;line-height:1.7;}

          .wlmt-contact-sec{padding:88px 40px;background:#f8fafd;}
          .wlmt-contact-inner{max-width:1200px;margin:0 auto;}
          .wlmt-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:64px;align-items:start;}
          .wlmt-contact-info-h{font-size:clamp(1.7rem,2.8vw,2.5rem);font-weight:900;color:#0A1628;margin-bottom:16px;line-height:1.2;}
          .wlmt-contact-info-h span{background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .wlmt-contact-info-p{font-size:1rem;color:#4b5563;line-height:1.8;margin-bottom:32px;}
          .wlmt-contact-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:22px;}
          .wlmt-contact-item-icon{width:44px;height:44px;border-radius:14px;background:rgba(${RGB},0.09);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .wlmt-contact-item-icon svg{width:20px;height:20px;color:${ACCENT};}
          .wlmt-contact-item-text strong{display:block;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
          .wlmt-contact-item-text a,.wlmt-contact-item-text span{font-size:14px;color:#4b5563;text-decoration:none;}
          .wlmt-contact-item-text a:hover{color:${ACCENT};}
          .wlmt-form-wrap{background:#fff;border-radius:24px;padding:44px;box-shadow:0 6px 40px rgba(0,0,0,0.09);}
          .wlmt-field{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
          .wlmt-field label{font-size:13px;font-weight:600;color:#374151;}
          .wlmt-field input,.wlmt-field select,.wlmt-field textarea{padding:12px 15px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:border-color 0.2s;background:#fff;}
          .wlmt-field input:focus,.wlmt-field select:focus,.wlmt-field textarea:focus{border-color:${ACCENT};}
          .wlmt-field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
          .wlmt-sent{text-align:center;padding:52px 24px;}
          .wlmt-sent-icon{width:68px;height:68px;border-radius:50%;background:${ACCENT};display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .wlmt-sent-icon svg{width:30px;height:30px;color:#fff;}
          .wlmt-sent h3{font-size:1.5rem;font-weight:800;color:#0A1628;margin-bottom:10px;}
          .wlmt-sent p{color:#4b5563;font-size:1rem;line-height:1.7;}
          .wlmt-submit-btn{width:100%;padding:15px;background:${ACCENT};color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s,transform 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;}
          .wlmt-submit-btn:hover:not(:disabled){opacity:0.9;transform:translateY(-1px);}
          .wlmt-submit-btn:disabled{opacity:0.65;cursor:not-allowed;}

          .wlmt-faq-sec{padding:88px 40px;background:linear-gradient(135deg,rgba(${RGB},0.03) 0%,rgba(255,255,255,1) 50%,rgba(0,29,61,0.03) 100%);}
          .wlmt-faq-h{font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:36px;line-height:1.15;}
          .wlmt-faq-list{display:flex;flex-direction:column;gap:12px;}
          .wlmt-faq-item{background:linear-gradient(135deg,rgba(${RGB},0.05) 0%,rgba(255,255,255,0.9) 60%,rgba(${RGB},0.03) 100%);border:1px solid rgba(255,255,255,0.9);border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(${RGB},0.07);transition:border-color 0.2s;position:relative;}
          .wlmt-faq-item.open{border-color:rgba(${RGB},0.30);}
          .wlmt-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:${ACCENT};border-radius:3px 0 0 3px;}
          .wlmt-faq-btn{width:100%;background:none;border:none;padding:22px 22px 22px 62px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative;}
          .wlmt-faq-q-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(${RGB},0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s;}
          .wlmt-faq-item.open .wlmt-faq-q-badge{background:${ACCENT};color:#fff;}
          .wlmt-faq-btn span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45;}
          .wlmt-faq-item.open .wlmt-faq-btn span{color:${ACCENT};}
          .wlmt-faq-chev{width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s;}
          .wlmt-faq-item.open .wlmt-faq-chev{transform:rotate(180deg);color:${ACCENT};}
          .wlmt-faq-ans-wrap{overflow:hidden;max-height:0;transition:max-height 0.35s ease;}
          .wlmt-faq-item.open .wlmt-faq-ans-wrap{max-height:600px;}
          .wlmt-faq-ans{padding:0 22px 22px 62px;font-size:15px;color:#4b5563;line-height:1.8;}
          .wlmt-faq-a-badge{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:${ACCENT};color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle;}

          .wlmt-rel-sec{background:rgba(${RGB},0.04);border-top:1px solid rgba(${RGB},0.10);padding:88px 40px;}
          .wlmt-rel-inner{max-width:1200px;margin:0 auto;text-align:center;}
          .wlmt-rel-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin-bottom:14px;display:block;}
          .wlmt-rel-h{font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.15;}
          .wlmt-rel-sub{font-size:15px;color:#374151;line-height:1.7;margin:0 auto;max-width:680px;}
          .wlmt-rel-div{border:none;border-top:1px solid rgba(${RGB},0.12);margin:40px 0;}
          .wlmt-rel-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}
          .wlmt-rtag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;border:1.5px solid;transition:all 0.2s;}
          .wlmt-rtag:hover{transform:translateY(-2px);}
          .wlmt-rtag-a{background:rgba(${RGB},0.08);color:${ACCENT};border-color:rgba(${RGB},0.25);}
          .wlmt-rtag-b{background:rgba(79,70,229,0.07);color:#4338ca;border-color:rgba(79,70,229,0.22);}
          .wlmt-rtag-c{background:rgba(5,150,105,0.07);color:#047857;border-color:rgba(5,150,105,0.22);}
          .wlmt-rtag-d{background:rgba(217,119,6,0.07);color:#b45309;border-color:rgba(217,119,6,0.22);}
          .wlmt-rtag-e{background:rgba(219,39,119,0.07);color:#be185d;border-color:rgba(219,39,119,0.22);}
          .wlmt-rtag-f{background:rgba(8,145,178,0.07);color:#0e7490;border-color:rgba(8,145,178,0.22);}

          .wlmt-cta{background:linear-gradient(135deg,${DARK} 0%,${ACCENT} 100%);padding:96px 40px;text-align:center;position:relative;overflow:hidden;}
          .wlmt-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(255,255,255,0.08) 0%,transparent 70%);pointer-events:none;}
          .wlmt-cta-inner{max-width:720px;margin:0 auto;position:relative;z-index:1;}
          .wlmt-cta h2{font-size:clamp(2rem,3.5vw,3rem);font-weight:900;color:#fff;margin-bottom:18px;line-height:1.2;}
          .wlmt-cta p{font-size:1.05rem;color:rgba(255,255,255,0.82);margin-bottom:36px;line-height:1.7;}
          .wlmt-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
          .wlmt-cta-btn-p{display:inline-flex;align-items:center;gap:8px;background:#fff;color:${ACCENT};padding:15px 36px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
          .wlmt-cta-btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.20);}
          .wlmt-cta-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);color:#fff;padding:15px 36px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(255,255,255,0.35);transition:all 0.25s;}
          .wlmt-cta-btn-s:hover{background:rgba(255,255,255,0.20);transform:translateY(-2px);}

          .wlmt-fade{opacity:0;transform:translateY(28px);transition:opacity 0.55s ease,transform 0.55s ease;}
          .wlmt-fade.visible{opacity:1;transform:none;}

          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

          @media(max-width:1100px){.wlmt-hero-layout{grid-template-columns:1fr;gap:48px;}.wlmt-hero-card{max-width:480px;}}
          @media(max-width:900px){.wlmt-grid4,.wlmt-why-grid{grid-template-columns:1fr 1fr;}.wlmt-grid3,.wlmt-testi-grid{grid-template-columns:1fr 1fr;}.wlmt-res-grid{grid-template-columns:1fr 1fr;}.wlmt-contact-grid{grid-template-columns:1fr;}.wlmt-grid2{grid-template-columns:1fr;}}
          @media(max-width:600px){.wlmt-hero,.wlmt-sec,.wlmt-results,.wlmt-cta,.wlmt-contact-sec,.wlmt-faq-sec,.wlmt-rel-sec{padding-left:20px;padding-right:20px;}.wlmt-hero{padding-top:70px;padding-bottom:60px;}.wlmt-grid4,.wlmt-grid3,.wlmt-grid2,.wlmt-res-grid,.wlmt-testi-grid,.wlmt-why-grid{grid-template-columns:1fr;}.wlmt-field-row{grid-template-columns:1fr;}.wlmt-form-wrap{padding:28px 20px;}.wlmt-stats-grid{grid-template-columns:1fr 1fr;}.wlmt-cta-btns{flex-direction:column;align-items:center;}}
        `}</style>
      </Head>

      {/* ── HERO ── */}
      <section className="wlmt-hero">
        <div className="wlmt-hero-dots" />
        <div className="wlmt-orb1" />
        <div className="wlmt-orb2" />
        <div className="wlmt-inner">
          <div className="wlmt-hero-layout">
            <div>
              <div className="wlmt-eyebrow">
                <span className="wlmt-eyebrow-dot" />
                Walmart Marketplace Management
              </div>
              <h1 className="wlmt-h1">
                Walmart Account Management That Puts Your Brand in Front of{' '}
                <span className="wlmt-h1-accent">120M Monthly Shoppers</span>
              </h1>
              <p className="wlmt-desc">
                Walmart is the fastest-growing US marketplace — and most sellers leave enormous revenue on the table by running it like a secondary channel. 1Solutions manages your full Walmart seller presence to capture market share while your competitors sleep.
              </p>
              <div className="wlmt-trust">
                {trust.map((t, i) => (
                  <span key={i} className="wlmt-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                    {t}
                  </span>
                ))}
              </div>
              <div className="wlmt-btns">
                <Link href="#contact" className="wlmt-btn-p">Get Free Walmart Audit →</Link>
                <Link href="#services" className="wlmt-btn-s">See What We Manage</Link>
              </div>
            </div>

            <div className="wlmt-hero-card" ref={statsRef}>
              <div className="wlmt-hero-card-title">Walmart Marketplace at a Glance</div>
              <div className="wlmt-stats-grid">
                {stats.map((s, i) => (
                  <StatCard key={i} num={s.num} suffix={s.suffix} lbl={s.lbl} active={statsActive} />
                ))}
              </div>
              <Link href="#contact" className="wlmt-hero-card-cta">Start Your Free Walmart Audit →</Link>
              <div className="wlmt-hero-card-trust">No commitment · Response within 24 hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section className="wlmt-sec wlmt-bg" ref={el => { secRefs.current.challenges = el; }} data-sec="challenges">
        <div className="wlmt-inner">
          <div className={`wlmt-fade${vis('challenges') ? ' visible' : ''}`}>
            <span className="wlmt-tag">Why Most Sellers Struggle</span>
            <h2 className="wlmt-h2">Common Walmart Seller <span>Pain Points We Solve</span></h2>
            <p className="wlmt-lead">Walmart Marketplace has enormous potential — but it requires a platform-specific strategy. These are the four challenges that hold most sellers back without expert management.</p>
          </div>
          <div className="wlmt-grid4">
            {challenges.map((c, i) => (
              <div key={i} className={`wlmt-chal-card wlmt-fade${vis('challenges') ? ' visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="wlmt-chal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon}/></svg>
                </div>
                <h3 className="wlmt-chal-h">{c.title}</h3>
                <p className="wlmt-chal-p">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="wlmt-sec" id="services" ref={el => { secRefs.current.services = el; }} data-sec="services">
        <div className="wlmt-inner">
          <div className={`wlmt-fade${vis('services') ? ' visible' : ''}`}>
            <span className="wlmt-tag">Full-Service Walmart Management</span>
            <h2 className="wlmt-h2">Everything We <span>Manage for You</span></h2>
            <p className="wlmt-lead">From initial Seller Center setup to WFS fulfilment and Walmart Connect advertising — we manage every aspect of your Walmart seller presence under one roof.</p>
          </div>
          <div className="wlmt-grid4">
            {services.map((s, i) => (
              <div key={i} className={`wlmt-card wlmt-fade${vis('services') ? ' visible' : ''}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="wlmt-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                </div>
                <h3 className="wlmt-card-h">{s.title}</h3>
                <p className="wlmt-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="wlmt-results" ref={el => { secRefs.current.results = el; }} data-sec="results">
        <div className="wlmt-res-inner">
          <span className="wlmt-res-tag">Proven Results</span>
          <h2 className="wlmt-res-h">Real Numbers From Real Walmart Sellers</h2>
          <div className="wlmt-res-grid">
            {results.map((r, i) => (
              <div key={i} className={`wlmt-res-card wlmt-fade${vis('results') ? ' visible' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="wlmt-res-metric">{r.metric}</div>
                <div className="wlmt-res-label">{r.label}</div>
                <div className="wlmt-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="wlmt-sec wlmt-bg" ref={el => { secRefs.current.cases = el; }} data-sec="cases">
        <div className="wlmt-inner">
          <div className={`wlmt-fade${vis('cases') ? ' visible' : ''}`}>
            <span className="wlmt-tag">Case Studies</span>
            <h2 className="wlmt-h2">Walmart Sellers <span>We Have Grown</span></h2>
            <p className="wlmt-lead">Real results from brands that trusted 1Solutions to launch and scale on Walmart Marketplace.</p>
          </div>
          <div className="wlmt-grid2">
            {caseStudies.map((cs, i) => (
              <div key={i} className={`wlmt-cs-card wlmt-fade${vis('cases') ? ' visible' : ''}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="wlmt-cs-badge">Walmart Marketplace</div>
                <div className="wlmt-cs-seller">{cs.seller}</div>
                <div className="wlmt-cs-metrics">
                  <div className="wlmt-cs-metric">
                    <span className="wlmt-cs-label">Before</span>
                    <span className="wlmt-cs-val wlmt-cs-before">{cs.before}</span>
                  </div>
                  <div className="wlmt-cs-arrow">→</div>
                  <div className="wlmt-cs-metric">
                    <span className="wlmt-cs-label">After</span>
                    <span className="wlmt-cs-val wlmt-cs-after">{cs.after}</span>
                  </div>
                  <div className="wlmt-cs-metric">
                    <span className="wlmt-cs-label">Timeline</span>
                    <span className="wlmt-cs-val">{cs.time}</span>
                  </div>
                </div>
                <ul className="wlmt-cs-actions">
                  {cs.actions.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="wlmt-sec wlmt-bg2">
        <div className="wlmt-inner">
          <span className="wlmt-tag">Client Testimonials</span>
          <h2 className="wlmt-h2">What Our <span>Walmart Sellers Say</span></h2>
          <p className="wlmt-lead">Feedback from brands that partner with 1Solutions to manage and grow their Walmart Marketplace presence.</p>
          <div className="wlmt-testi-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="wlmt-testi-card">
                <div className="wlmt-testi-stars">{[...Array(t.stars)].map((_, j) => <span key={j} className="wlmt-testi-star">★</span>)}</div>
                <p className="wlmt-testi-quote">"{t.quote}"</p>
                <div className="wlmt-testi-author">
                  <div className="wlmt-testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="wlmt-testi-name">{t.name}</div>
                    <div className="wlmt-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="wlmt-sec" ref={el => { secRefs.current.why = el; }} data-sec="why">
        <div className="wlmt-inner">
          <div className={`wlmt-fade${vis('why') ? ' visible' : ''}`}>
            <span className="wlmt-tag">Why 1Solutions</span>
            <h2 className="wlmt-h2">Why Brands Choose Us to <span>Manage Their Walmart Account</span></h2>
            <p className="wlmt-lead">We are not a generic marketplace agency. We bring platform-specific expertise, dedicated resource, and a track record of results that generalised digital agencies simply cannot match.</p>
          </div>
          <div className="wlmt-why-grid">
            {why.map((w, i) => (
              <div key={i} className={`wlmt-card wlmt-fade${vis('why') ? ' visible' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="wlmt-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                </div>
                <h3 className="wlmt-card-h">{w.title}</h3>
                <p className="wlmt-card-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="wlmt-sec wlmt-bg" ref={el => { secRefs.current.process = el; }} data-sec="process">
        <div className="wlmt-inner">
          <div className={`wlmt-fade${vis('process') ? ' visible' : ''}`}>
            <span className="wlmt-tag">Our Process</span>
            <h2 className="wlmt-h2">How We <span>Manage Your Walmart Account</span></h2>
            <p className="wlmt-lead">A six-step process built specifically for Walmart Marketplace — from audit and strategy to consistent monthly revenue growth.</p>
          </div>
          <div className="wlmt-grid3">
            {steps.map((s, i) => (
              <div key={i} className={`wlmt-card wlmt-fade${vis('process') ? ' visible' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="wlmt-proc-num">0{i + 1}</div>
                <div className="wlmt-proc-line" />
                <h3 className="wlmt-proc-h">{s.title}</h3>
                <p className="wlmt-proc-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="wlmt-contact-sec" id="contact" ref={el => { secRefs.current.contact = el; }} data-sec="contact">
        <div className="wlmt-contact-inner">
          <div className="wlmt-contact-grid">
            <div className={`wlmt-fade${vis('contact') ? ' visible' : ''}`}>
              <h2 className="wlmt-contact-info-h">Get a Free <span>Walmart Seller Audit</span></h2>
              <p className="wlmt-contact-info-p">We will audit your existing Walmart seller setup — or help you plan a new launch — reviewing item quality scores, WFS eligibility, listing compliance, pricing strategy, and advertising opportunities. No obligation.</p>
              <div className="wlmt-contact-item">
                <div className="wlmt-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="wlmt-contact-item-text">
                  <strong>Email</strong>
                  <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>
                </div>
              </div>
              <div className="wlmt-contact-item">
                <div className="wlmt-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>
                </div>
                <div className="wlmt-contact-item-text">
                  <strong>WhatsApp / Call</strong>
                  <a href="tel:+18881SOLUTIONS">+1 (888) 1SOLUTIONS</a>
                </div>
              </div>
              <div className="wlmt-contact-item">
                <div className="wlmt-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="wlmt-contact-item-text">
                  <strong>Response Time</strong>
                  <span>Within 24 hours</span>
                </div>
              </div>
            </div>
            <div className={`wlmt-form-wrap wlmt-fade${vis('contact') ? ' visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              {sent ? (
                <div className="wlmt-sent">
                  <div className="wlmt-sent-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3>Audit Request Received</h3>
                  <p>Thank you! Our Walmart marketplace specialists will prepare your free audit and be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="wlmt-field-row">
                    <div className="wlmt-field">
                      <label>Your Name *</label>
                      <input required type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="wlmt-field">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="jane@store.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="wlmt-field">
                    <label>Company / Store Name</label>
                    <input type="text" placeholder="Your Brand or Store" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                  </div>
                  <div className="wlmt-field">
                    <label>Current Monthly Revenue on Walmart</label>
                    <select value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })}>
                      <option>Not yet on Walmart</option>
                      <option>Under $10K/mo</option>
                      <option>$10K–$50K/mo</option>
                      <option>$50K–$200K/mo</option>
                      <option>$200K+/mo</option>
                    </select>
                  </div>
                  <div className="wlmt-field">
                    <label>Tell Us About Your Walmart Store</label>
                    <textarea rows={4} placeholder="Are you an existing Walmart seller or planning to launch? What are your biggest challenges?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" className="wlmt-submit-btn" disabled={sending}>
                    {sending ? 'Sending…' : 'Request Free Walmart Audit →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="wlmt-faq-sec" id="faq" ref={el => { secRefs.current.faq = el; }} data-sec="faq">
        <div className="wlmt-inner">
          <h2 className="wlmt-faq-h">Frequently Asked Questions</h2>
          <div className="wlmt-faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`wlmt-faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="wlmt-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="wlmt-faq-q-badge">Q</div>
                  <span>{faq.q}</span>
                  <svg className="wlmt-faq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div className="wlmt-faq-ans-wrap">
                  <div className="wlmt-faq-ans"><span className="wlmt-faq-a-badge">A</span>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="wlmt-rel-sec">
        <div className="wlmt-rel-inner">
          <span className="wlmt-rel-eyebrow">Platform Related Offerings</span>
          <h2 className="wlmt-rel-h">Explore Related Services</h2>
          <p className="wlmt-rel-sub">Pair our Walmart Marketplace expertise with complementary services to build a complete multichannel eCommerce strategy.</p>
          <hr className="wlmt-rel-div" />
          <div className="wlmt-rel-tags">
            <Link href="/amazon-account-management-services/" className="wlmt-rtag wlmt-rtag-a">Amazon Management</Link>
            <Link href="/ecommerce-seo-services/" className="wlmt-rtag wlmt-rtag-b">eCommerce SEO</Link>
            <Link href="/google-shopping-management/" className="wlmt-rtag wlmt-rtag-c">Google Shopping Ads</Link>
            <Link href="/woocommerce-development-company/" className="wlmt-rtag wlmt-rtag-d">WooCommerce Development</Link>
            <Link href="/email-marketing-services/" className="wlmt-rtag wlmt-rtag-e">Email Automation</Link>
            <Link href="/social-media-marketing-services/" className="wlmt-rtag wlmt-rtag-f">Social Commerce</Link>
            <Link href="/amazon-fba-shipment-reconciliation-services/" className="wlmt-rtag wlmt-rtag-a">Amazon FBA Reconciliation</Link>
            <Link href="/ebay-account-management-services/" className="wlmt-rtag wlmt-rtag-b">eBay Management</Link>
            <Link href="/magento-development-company/" className="wlmt-rtag wlmt-rtag-c">Magento Development</Link>
            <Link href="/ecommerce-website-development-services/" className="wlmt-rtag wlmt-rtag-d">eCommerce Development</Link>
            <Link href="/home-depot-account-management-services/" className="wlmt-rtag wlmt-rtag-e">Home Depot Marketplace</Link>
            <Link href="/etsy-account-management-services/" className="wlmt-rtag wlmt-rtag-f">Etsy Shop Management</Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="wlmt-cta">
        <div className="wlmt-cta-inner">
          <h2>Ready to Capture Walmart Marketplace Revenue?</h2>
          <p>Join brands who trust 1Solutions to manage and scale their Walmart seller accounts — from first listing to six-figure monthly revenue.</p>
          <div className="wlmt-cta-btns">
            <Link href="#contact" className="wlmt-cta-btn-p">Get Your Free Audit →</Link>
            <Link href="/ecommerce-marketing-services/" className="wlmt-cta-btn-s">All eCommerce Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
