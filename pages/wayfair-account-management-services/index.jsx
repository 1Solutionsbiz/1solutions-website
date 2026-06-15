import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const challenges = [
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Product Data Quality Requirements Are Strict',
    desc: 'Wayfair requires highly detailed product attributes: precise dimensions, material compositions, assembly requirements, weight, finish options, and more. Missing or inaccurate attributes lead to listing suppression, high return rates, and supplier performance penalties.',
  },
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'CastleGate Fulfilment Setup Complexity',
    desc: "CastleGate (Wayfair's fulfilment network) dramatically improves delivery speed and search ranking — but the inbound requirements, item eligibility rules, and freight processes are significantly more involved than Amazon FBA, deterring most suppliers from using it.",
  },
  {
    icon: '9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Pricing Algorithm Pressure',
    desc: "Wayfair's algorithm is highly sensitive to price competitiveness against similar products. Automated price changes happen frequently, and suppliers who do not monitor and respond to pricing signals can see dramatic ranking drops without understanding why.",
  },
  {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'Return Rate Penalties',
    desc: 'Wayfair holds suppliers responsible for high return rates. Products with unclear descriptions, poor imagery, or inaccurate dimensions generate avoidable returns that trigger supplier performance warnings and ranking penalties. Most suppliers do not audit their return reasons systematically.',
  },
];

const services = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Partner Home Account Setup & Management',
    desc: "End-to-end Partner Home account management: supplier profile setup, performance dashboard monitoring, policy compliance review, case management with Wayfair's supplier support team, and proactive issue resolution.",
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Product Catalogue Setup & Listing Optimisation',
    desc: 'Full product catalogue setup including category mapping, attribute data entry, search keyword optimisation in product titles and descriptions, and spec sheet management to maximise search visibility on Wayfair.com.',
  },
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'CastleGate Fulfillment Onboarding & Management',
    desc: 'Item eligibility review, inbound freight coordination, CastleGate setup in Partner Home, inventory planning, and ongoing replenishment management — ensuring your top-selling SKUs are always in the CastleGate network.',
  },
  {
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    title: 'Product Data Quality Improvement',
    desc: 'Systematic attribute audit and enrichment across your catalogue: verifying dimensions, material compositions, weight, finish options, assembly instructions, and image requirements to eliminate returns and suppressed listings.',
  },
  {
    icon: '9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Wayfair Advertising Management',
    desc: 'Sponsored Placements campaign management — keyword strategy, placement selection, bid management, and performance reporting to drive profitable traffic to your best-performing products on Wayfair.com.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Pricing Strategy & Competitive Monitoring',
    desc: "Ongoing competitive price monitoring across Wayfair's algorithm signals, competitor pricing analysis, strategic repricing recommendations, and margin protection planning to maintain ranking while protecting profitability.",
  },
  {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'Return Rate Reduction',
    desc: 'Systematic return reason analysis across your catalogue — identifying the root cause of each return category (size, colour, damage, expectations) and implementing content, imagery, and data fixes to reduce avoidable returns.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Supplier Performance Monitoring & Monthly Reporting',
    desc: 'Monthly performance reports covering order volume, revenue, return rate, on-time delivery score, CastleGate inventory levels, advertising performance, and a prioritised action plan for the next 30 days.',
  },
];

const results = [
  { metric: '3.1×', label: 'Average supplier revenue growth in 9 months', sub: 'Across all managed Wayfair supplier accounts' },
  { metric: '94%', label: 'Average listing compliance rate achieved', sub: 'Through data quality and attribute enrichment' },
  { metric: '2.8%', label: 'Average return rate achieved vs 8% industry average', sub: 'Through content accuracy and image improvements' },
];

const caseStudies = [
  {
    seller: 'US Furniture Supplier',
    before: '$22K/mo, 9.1% return rate',
    after: '$78K/mo, 2.4% return rate',
    time: '8 months',
    actions: ['Product descriptions and dimensions verified and corrected for 340 SKUs', 'CastleGate onboarding reduced delivery time to 2 days', 'Photography guidelines updated to show all angles and scale'],
  },
  {
    seller: 'CA Lighting Supplier',
    before: '$0 on Wayfair',
    after: '$41K/mo',
    time: '5 months',
    actions: ['Full Partner Home setup with 180 SKUs', 'CastleGate shipment for 90 top-selling SKUs', 'Sponsored Placements campaigns launched in week 1'],
  },
];

const steps = [
  { title: 'Partner Home Audit', desc: 'Full review of your existing Partner Home setup, product data quality, suppressed listings, return rate analysis, CastleGate eligibility, and pricing competitiveness.' },
  { title: 'Product Data Strategy', desc: 'Category mapping, attribute gap analysis, and a prioritised data enrichment plan to bring your entire catalogue to Wayfair compliance standards and maximise search visibility.' },
  { title: 'CastleGate Setup', desc: 'Item eligibility assessment, freight coordination, CastleGate activation in Partner Home, and initial inventory planning to ensure your top SKUs are in the fulfilment network from day one.' },
  { title: 'Listing Quality Optimisation', desc: 'Systematic content improvement across your catalogue — title optimisation, attribute enrichment, image review, and return-risk item identification and remediation.' },
  { title: 'Advertising Launch', desc: 'Sponsored Placements campaign setup with keyword research, placement strategy, initial bid structure, and performance baseline measurement for the first 30 days.' },
  { title: 'Monthly Performance Review', desc: 'Full monthly performance review covering revenue, return rate, on-time delivery, CastleGate inventory, advertising ROI, and a clear action plan for the next 30 days.' },
];

const stats = [
  { num: '22M', lbl: 'Active Wayfair customers' },
  { num: '$12B+', lbl: 'Wayfair annual revenue' },
  { num: '3.1×', lbl: 'avg supplier revenue growth' },
  { num: 'CastleGate', lbl: 'fulfilment enabled for 95% of clients' },
];

const trust = ['Wayfair Partner Home experts', 'CastleGate certified setup', 'No lock-in contracts', 'Dedicated account manager'];

const FAQS = [
  { q: 'How do I become an approved Wayfair supplier?', a: 'Wayfair supplier applications are submitted through the Partner Home portal. The review process evaluates your product catalogue, pricing, fulfilment capability, and product data quality. Having professional product photography, complete attribute data, and a clear fulfilment model (dropship or CastleGate) significantly improves approval speed. We manage the full application and onboarding process for new suppliers.' },
  { q: 'What is CastleGate and do I need it to succeed on Wayfair?', a: "CastleGate is Wayfair's fulfilment network — you send inventory to Wayfair's warehouses and they handle delivery to customers, typically within 2 days. CastleGate listings receive significantly higher search ranking and conversion rates due to the faster delivery promise. While not mandatory, we strongly recommend CastleGate for your top-selling SKUs as it is one of the most powerful ranking levers on the platform." },
  { q: 'Why are my Wayfair products not appearing in search?', a: 'The most common causes are incomplete product attributes (missing dimensions, weight, or required category-specific fields), pricing that falls outside the acceptable range for the category, item quality score below the minimum threshold, or fulfilment speed that does not meet Wayfair standards. We diagnose the exact suppression reason for each product and fix it systematically.' },
  { q: 'How does Wayfair pricing work and can you help with pricing strategy?', a: "Wayfair uses a retail model where you set your MSRP and Wayfair adds their margin. However, Wayfair's algorithm strongly weights pricing competitiveness and they may request margin adjustments to run promotions. We help you set a pricing structure that maintains your profitability while remaining competitive within Wayfair's algorithm and eligible for promotional placements." },
  { q: 'What causes high return rates on Wayfair and how do you fix them?', a: 'High return rates on Wayfair are almost always caused by one of three things: inaccurate product dimensions that cause size mismatch surprises, insufficient photography that misrepresents colour or finish, or material descriptions that do not match customer expectations. We audit every return reason you receive and implement specific content fixes that address the root cause SKU by SKU.' },
  { q: 'How long does Wayfair supplier onboarding and the first sale take?', a: 'The supplier application and approval process typically takes 3 to 6 weeks. Once approved, product data upload and review takes an additional 2 to 3 weeks before items are live in search. CastleGate onboarding for the first shipment adds another 2 weeks. Most new Wayfair suppliers see their first sales within 8 to 10 weeks of engagement start when we manage the full onboarding process.' },
];

export default function WayfairAccountManagement() {
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue: 'Under $10K/mo', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Head>
        <title>Wayfair Supplier Account Management Services | 1Solutions</title>
        <meta name="description" content="Grow your Wayfair supplier business with 1Solutions. We manage your Partner Home account, CastleGate fulfillment, product listing quality, pricing strategy, and Wayfair advertising." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1solutions.biz/wayfair-account-management-services/" />
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
          .wayf-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(53,0,66,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(53,0,66,0.05) 100%);}
          .wayf-orb1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(53,0,66,0.10) 0%,transparent 70%);pointer-events:none;filter:blur(12px);}
          .wayf-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
          .wayf-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(53,0,66,0.09);border:1px solid rgba(53,0,66,0.20);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#350042;margin-bottom:24px;}
          .wayf-h1{font-size:clamp(2.2rem,4vw,3.6rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;color:#0A1628;}
          .wayf-h1-accent{background:linear-gradient(90deg,#350042 0%,#6b1a8c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .wayf-desc{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:680px;}
          .wayf-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
          .wayf-btn-p{display:inline-flex;align-items:center;gap:8px;background:#350042;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(53,0,66,0.25);}
          .wayf-btn-p:hover{opacity:0.9;transform:translateY(-2px);}
          .wayf-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#350042;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(53,0,66,0.20);transition:all 0.25s;backdrop-filter:blur(8px);}
          .wayf-btn-s:hover{background:#fff;transform:translateY(-2px);}
          .wayf-trust{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px;}
          .wayf-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500;}
          .wayf-stats-bar{display:flex;border:1px solid rgba(53,0,66,0.10);border-radius:16px;background:rgba(255,255,255,0.80);backdrop-filter:blur(12px);overflow:hidden;max-width:680px;}
          .wayf-stat-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(53,0,66,0.08);}
          .wayf-stat-item:last-child{border-right:none;}
          .wayf-stat-num{font-size:1.9rem;font-weight:900;color:#350042;line-height:1;letter-spacing:-1px;}
          .wayf-stat-lbl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px;}
          .wayf-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px;}
          .wayf-bc-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280;}
          .wayf-bc a{color:#6b7280;text-decoration:none;}.wayf-bc a:hover{color:#350042;}
          .wayf-bc-sep{color:#d1d5db;}.wayf-bc-cur{color:#350042;font-weight:500;}
          .wayf-sec{padding:80px 40px;}
          .wayf-bg{background:#f8fafd;}
          .wayf-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#350042;margin-bottom:12px;}
          .wayf-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px;}
          .wayf-h2 span{background:linear-gradient(90deg,#350042,#6b1a8c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .wayf-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px;}
          .wayf-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .wayf-grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;}
          .wayf-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .wayf-card{background:linear-gradient(135deg,rgba(53,0,66,0.06) 0%,rgba(255,255,255,0.90) 60%,rgba(53,0,66,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(53,0,66,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s;}
          .wayf-card:hover{transform:translateY(-6px);border-color:rgba(53,0,66,0.20);box-shadow:0 16px 48px rgba(53,0,66,0.12);}
          .wayf-icon{width:48px;height:48px;border-radius:14px;background:rgba(53,0,66,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .wayf-icon svg{width:22px;height:22px;color:#350042;}
          .wayf-card-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3;}
          .wayf-card-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .wayf-chal-card{background:#fff;border:1px solid #f0f0f0;border-radius:20px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,0.05);}
          .wayf-chal-icon{width:48px;height:48px;border-radius:14px;background:rgba(53,0,66,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
          .wayf-chal-icon svg{width:22px;height:22px;color:#350042;}
          .wayf-chal-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .wayf-chal-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .wayf-results{background:linear-gradient(135deg,#14001a 0%,#350042 100%);padding:64px 40px;}
          .wayf-results-inner{max-width:1200px;margin:0 auto;}
          .wayf-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:12px;text-align:center;}
          .wayf-res-h{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2;}
          .wayf-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .wayf-res-card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:20px;padding:36px 28px;text-align:center;}
          .wayf-res-metric{font-size:3.2rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px;color:#fff;}
          .wayf-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
          .wayf-res-sub{font-size:12.5px;color:rgba(255,255,255,0.50);}
          .wayf-cs-card{background:#fff;border:1px solid #e5e7eb;border-radius:20px;padding:32px;box-shadow:0 4px 16px rgba(0,0,0,0.06);}
          .wayf-cs-badge{display:inline-block;background:rgba(53,0,66,0.10);color:#350042;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 12px;border-radius:50px;margin-bottom:12px;}
          .wayf-cs-seller{font-size:1.1rem;font-weight:700;color:#0A1628;margin-bottom:20px;}
          .wayf-cs-metrics{display:flex;align-items:center;gap:16px;margin-bottom:20px;flex-wrap:wrap;}
          .wayf-cs-metric{display:flex;flex-direction:column;gap:4px;}
          .wayf-cs-label{font-size:11px;color:#9ca3af;font-weight:500;}
          .wayf-cs-val{font-size:1rem;font-weight:700;color:#0A1628;}
          .wayf-cs-before{color:#ef4444;}
          .wayf-cs-after{color:#16a34a;}
          .wayf-cs-arrow{font-size:1.5rem;color:#d1d5db;}
          .wayf-cs-actions{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;}
          .wayf-cs-actions li{font-size:13.5px;color:#4b5563;padding-left:20px;position:relative;}
          .wayf-cs-actions li::before{content:"✓";position:absolute;left:0;color:#350042;font-weight:700;}
          .wayf-proc-num{font-size:3rem;font-weight:900;color:rgba(53,0,66,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .wayf-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#350042,rgba(53,0,66,0.3));border-radius:2px;margin-bottom:16px;}
          .wayf-proc-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .wayf-proc-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .wayf-contact-sec{padding:80px 40px;background:#f8fafd;}
          .wayf-contact-inner{max-width:1200px;margin:0 auto;}
          .wayf-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:56px;align-items:start;}
          .wayf-contact-info-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:900;color:#0A1628;margin:0 0 16px;line-height:1.25;}
          .wayf-contact-info-h span{background:linear-gradient(90deg,#350042,#6b1a8c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .wayf-contact-info-p{font-size:1rem;color:#4b5563;line-height:1.75;margin:0 0 32px;}
          .wayf-contact-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px;}
          .wayf-contact-item-icon{width:40px;height:40px;border-radius:12px;background:rgba(53,0,66,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .wayf-contact-item-icon svg{width:18px;height:18px;color:#350042;}
          .wayf-contact-item-text strong{display:block;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
          .wayf-contact-item-text a,.wayf-contact-item-text span{font-size:13.5px;color:#4b5563;text-decoration:none;}
          .wayf-form-wrap{background:#fff;border-radius:24px;padding:40px;box-shadow:0 4px 32px rgba(0,0,0,0.08);}
          .wayf-field{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
          .wayf-field label{font-size:13px;font-weight:600;color:#374151;}
          .wayf-field input,.wayf-field select,.wayf-field textarea{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:border-color 0.2s;background:#fff;}
          .wayf-field input:focus,.wayf-field select:focus,.wayf-field textarea:focus{border-color:#350042;}
          .wayf-field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
          .wayf-sent{text-align:center;padding:48px 24px;}
          .wayf-sent-icon{width:64px;height:64px;border-radius:50%;background:#350042;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .wayf-sent-icon svg{width:28px;height:28px;color:#fff;}
          .wayf-sent h3{font-size:1.5rem;font-weight:800;color:#0A1628;margin:0 0 10px;}
          .wayf-sent p{color:#4b5563;font-size:1rem;line-height:1.7;margin:0;}
          .wayf-submit-btn{width:100%;padding:14px;background:#350042;color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s;}
          .wayf-submit-btn:hover{opacity:0.88;}
          .wayf-cta{background:#350042;padding:72px 40px;text-align:center;}
          .wayf-cta h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.2;}
          .wayf-cta p{font-size:1rem;color:rgba(255,255,255,0.80);margin:0 0 32px;}
          .wayf-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#350042;padding:14px 32px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
          .wayf-cta-btn:hover{transform:translateY(-2px);opacity:0.95;}
          @media(max-width:900px){.wayf-grid3,.wayf-grid4{grid-template-columns:1fr 1fr;}.wayf-grid2{grid-template-columns:1fr;}.wayf-contact-grid{grid-template-columns:1fr;}.wayf-res-grid{grid-template-columns:1fr 1fr;}}
          @media(max-width:600px){.wayf-hero,.wayf-sec,.wayf-results,.wayf-cta,.wayf-contact-sec{padding-left:20px;padding-right:20px;}.wayf-hero{padding-top:60px;padding-bottom:50px;}.wayf-grid3,.wayf-grid4,.wayf-grid2,.wayf-res-grid{grid-template-columns:1fr;}.wayf-bc{padding:12px 20px;}.wayf-field-row{grid-template-columns:1fr;}.wayf-form-wrap{padding:24px 20px;}}
          /* ── FAQ ── */
          .wayf-faq-sec { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(53,0,66,0.08); }
          .wayf-faq-h { font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#350042 0%,#6b1a8c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 36px;line-height:1.15; }
          .wayf-faq-list { display:flex;flex-direction:column;gap:12px; }
          .wayf-faq-item { background:linear-gradient(135deg,rgba(53,0,66,0.06) 0%,rgba(255,255,255,0.85) 60%,rgba(53,0,66,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(53,0,66,0.07);transition:border-color 0.2s;position:relative; }
          .wayf-faq-item.open { border-color:rgba(53,0,66,0.30); }
          .wayf-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#350042;border-radius:3px 0 0 3px; }
          .wayf-faq-btn { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .wayf-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(53,0,66,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .wayf-faq-item.open .wayf-faq-q-badge { background:#350042;color:#fff; }
          .wayf-faq-btn span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .wayf-faq-item.open .wayf-faq-btn span { color:#350042; }
          .wayf-faq-chev { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .wayf-faq-item.open .wayf-faq-chev { transform:rotate(180deg);color:#350042; }
          .wayf-faq-ans-wrap { overflow:hidden;max-height:0;transition:max-height 0.35s ease; }
          .wayf-faq-item.open .wayf-faq-ans-wrap { max-height:500px; }
          .wayf-faq-ans { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .wayf-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#350042;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }
          /* ── Related Services ── */
          .wayf-rel-sec { background:rgba(53,0,66,0.04);border-top:1px solid rgba(53,0,66,0.08);padding:80px 40px; }
          .wayf-rel-inner { max-width:1200px;margin:0 auto;text-align:center; }
          .wayf-rel-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .wayf-rel-h { font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#350042 0%,#6b1a8c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px;line-height:1.15; }
          .wayf-rel-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .wayf-rel-div { border:none;border-top:1px solid rgba(53,0,66,0.12);margin:40px 0; }
          .wayf-rel-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .wayf-rtag { display:inline-flex;align-items:center;padding:8px 16px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;border:1.5px solid;transition:all 0.2s; }
          .wayf-rtag:hover { transform:translateY(-2px); }
          .wayf-rtag-a { background:rgba(53,0,66,0.08);color:#350042;border-color:rgba(53,0,66,0.25); }
          .wayf-rtag-b { background:rgba(79,70,229,0.07);color:#4338ca;border-color:rgba(79,70,229,0.22); }
          .wayf-rtag-c { background:rgba(5,150,105,0.07);color:#047857;border-color:rgba(5,150,105,0.22); }
          .wayf-rtag-d { background:rgba(217,119,6,0.07);color:#b45309;border-color:rgba(217,119,6,0.22); }
          .wayf-rtag-e { background:rgba(219,39,119,0.07);color:#be185d;border-color:rgba(219,39,119,0.22); }
          .wayf-rtag-f { background:rgba(8,145,178,0.07);color:#0e7490;border-color:rgba(8,145,178,0.22); }
        `}</style>
      </Head>

      {/* Breadcrumb */}
      <nav className="wayf-bc">
        <div className="wayf-bc-inner">
          <Link href="/">Home</Link>
          <span className="wayf-bc-sep">›</span>
          <Link href="/services">Services</Link>
          <span className="wayf-bc-sep">›</span>
          <span className="wayf-bc-cur">Wayfair Supplier Account Management</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="wayf-hero">
        <div className="wayf-orb1" />
        <div className="wayf-inner">
          <div className="wayf-eyebrow">Wayfair Supplier Management</div>
          <h1 className="wayf-h1">
            Wayfair Supplier Management That Drives <span className="wayf-h1-accent">Consistent Home Goods Orders</span>
          </h1>
          <p className="wayf-desc">
            Wayfair is North America's largest online home goods retailer, with 22 million active customers. 1Solutions manages your complete Wayfair supplier presence — from Partner Home setup to CastleGate fulfilment and listing quality — driving consistent purchase orders month after month.
          </p>
          <div className="wayf-trust">
            {trust.map((t, i) => (
              <span key={i} className="wayf-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#350042" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="wayf-btns">
            <Link href="#contact" className="wayf-btn-p">Get Free Wayfair Consultation</Link>
            <Link href="#services" className="wayf-btn-s">See What We Manage</Link>
          </div>
          <div className="wayf-stats-bar">
            {stats.map((s, i) => (
              <div key={i} className="wayf-stat-item">
                <span className="wayf-stat-num">{s.num}</span>
                <span className="wayf-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="wayf-sec wayf-bg">
        <div className="wayf-inner">
          <span className="wayf-tag">Common Wayfair Supplier Struggles</span>
          <h2 className="wayf-h2">Why Wayfair Suppliers <span>Struggle to Scale</span></h2>
          <p className="wayf-lead">Wayfair's strict product data requirements, complex CastleGate setup, and dynamic pricing algorithm create challenges that most suppliers underestimate when entering the platform.</p>
          <div className="wayf-grid4">
            {challenges.map((c, i) => (
              <div key={i} className="wayf-chal-card">
                <div className="wayf-chal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon}/></svg>
                </div>
                <h3 className="wayf-chal-h">{c.title}</h3>
                <p className="wayf-chal-p">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="wayf-sec" id="services">
        <div className="wayf-inner">
          <span className="wayf-tag">Full-Service Wayfair Management</span>
          <h2 className="wayf-h2">What Our <span>Wayfair Management</span> Covers</h2>
          <p className="wayf-lead">From Partner Home setup to CastleGate fulfilment, product data quality, and Sponsored Placements advertising — we manage every aspect of your Wayfair supplier presence.</p>
          <div className="wayf-grid4">
            {services.map((s, i) => (
              <div key={i} className="wayf-card">
                <div className="wayf-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                </div>
                <h3 className="wayf-card-h">{s.title}</h3>
                <p className="wayf-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Band */}
      <section className="wayf-results">
        <div className="wayf-results-inner">
          <span className="wayf-res-tag">Proven Results</span>
          <h2 className="wayf-res-h">Real Numbers From Real Wayfair Suppliers</h2>
          <div className="wayf-res-grid">
            {results.map((r, i) => (
              <div key={i} className="wayf-res-card">
                <div className="wayf-res-metric">{r.metric}</div>
                <div className="wayf-res-label">{r.label}</div>
                <div className="wayf-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="wayf-sec wayf-bg">
        <div className="wayf-inner">
          <span className="wayf-tag">Case Studies</span>
          <h2 className="wayf-h2">Wayfair Suppliers <span>We Have Grown</span></h2>
          <p className="wayf-lead">Real results from home goods suppliers who trusted 1Solutions to launch and scale on Wayfair.</p>
          <div className="wayf-grid2">
            {caseStudies.map((cs, i) => (
              <div key={i} className="wayf-cs-card">
                <div className="wayf-cs-badge">Wayfair</div>
                <div className="wayf-cs-seller">{cs.seller}</div>
                <div className="wayf-cs-metrics">
                  <div className="wayf-cs-metric">
                    <span className="wayf-cs-label">Before</span>
                    <span className="wayf-cs-val wayf-cs-before">{cs.before}</span>
                  </div>
                  <div className="wayf-cs-arrow">→</div>
                  <div className="wayf-cs-metric">
                    <span className="wayf-cs-label">After</span>
                    <span className="wayf-cs-val wayf-cs-after">{cs.after}</span>
                  </div>
                  <div className="wayf-cs-metric">
                    <span className="wayf-cs-label">Timeline</span>
                    <span className="wayf-cs-val">{cs.time}</span>
                  </div>
                </div>
                <ul className="wayf-cs-actions">
                  {cs.actions.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="wayf-sec">
        <div className="wayf-inner">
          <span className="wayf-tag">Our Process</span>
          <h2 className="wayf-h2">How We <span>Manage Your Wayfair Account</span></h2>
          <p className="wayf-lead">A structured six-step process built for Wayfair suppliers — from Partner Home setup and CastleGate onboarding to consistent monthly revenue growth.</p>
          <div className="wayf-grid3">
            {steps.map((s, i) => (
              <div key={i} className="wayf-card">
                <div className="wayf-proc-num">0{i + 1}</div>
                <div className="wayf-proc-line" />
                <h3 className="wayf-proc-h">{s.title}</h3>
                <p className="wayf-proc-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="wayf-contact-sec" id="contact">
        <div className="wayf-contact-inner">
          <div className="wayf-contact-grid">
            <div>
              <h2 className="wayf-contact-info-h">Get a Free <span>Wayfair Supplier Consultation</span></h2>
              <p className="wayf-contact-info-p">We will review your existing Wayfair supplier setup or help you plan a new launch — covering product data quality, CastleGate eligibility, pricing strategy, and listing performance.</p>
              <div className="wayf-contact-item">
                <div className="wayf-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="wayf-contact-item-text">
                  <strong>Email</strong>
                  <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>
                </div>
              </div>
              <div className="wayf-contact-item">
                <div className="wayf-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>
                </div>
                <div className="wayf-contact-item-text">
                  <strong>WhatsApp</strong>
                  <a href="tel:+18881SOLUTIONS">+1 (888) 1SOLUTIONS</a>
                </div>
              </div>
              <div className="wayf-contact-item">
                <div className="wayf-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="wayf-contact-item-text">
                  <strong>Response Time</strong>
                  <span>Within 24 hours</span>
                </div>
              </div>
            </div>
            <div className="wayf-form-wrap">
              {sent ? (
                <div className="wayf-sent">
                  <div className="wayf-sent-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3>Consultation Request Received</h3>
                  <p>Thank you! Our Wayfair supplier specialists will review your details and be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="wayf-field-row">
                    <div className="wayf-field">
                      <label>Your Name *</label>
                      <input required type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="wayf-field">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="jane@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="wayf-field">
                    <label>Company / Brand Name</label>
                    <input type="text" placeholder="Your Company Name" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                  </div>
                  <div className="wayf-field">
                    <label>Monthly Revenue</label>
                    <select value={form.revenue} onChange={e => setForm({...form, revenue: e.target.value})}>
                      <option>Under $10K/mo</option>
                      <option>$10K–$50K/mo</option>
                      <option>$50K–$200K/mo</option>
                      <option>$200K+/mo</option>
                    </select>
                  </div>
                  <div className="wayf-field">
                    <label>Tell Us About Your Wayfair Situation</label>
                    <textarea rows={4} placeholder="Are you an existing Wayfair supplier or planning to launch? What product categories do you sell? What are your biggest challenges?" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button type="submit" className="wayf-submit-btn">Request Free Wayfair Consultation →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wayf-faq-sec" id="faq">
        <div className="wayf-inner">
          <h2 className="wayf-faq-h">Frequently Asked Questions</h2>
          <div className="wayf-faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={'wayf-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="wayf-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="wayf-faq-q-badge">Q</div>
                  <span>{faq.q}</span>
                  <svg className="wayf-faq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div className="wayf-faq-ans-wrap">
                  <div className="wayf-faq-ans"><span className="wayf-faq-a-badge">A</span>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="wayf-rel-sec">
        <div className="wayf-rel-inner">
          <span className="wayf-rel-eyebrow">PLATFORM RELATED OFFERINGS</span>
          <h2 className="wayf-rel-h">Explore Related Services and Technologies</h2>
          <p className="wayf-rel-sub">Pair our Wayfair supplier management expertise with services that strengthen your home and furniture brand across channels.</p>
          <hr className="wayf-rel-div" />
          <div className="wayf-rel-tags">
            <Link href="/amazon-account-management-services/" className="wayf-rtag wayf-rtag-a">Amazon Management</Link>
            <Link href="/walmart-account-management-services/" className="wayf-rtag wayf-rtag-b">Walmart Marketplace</Link>
            <Link href="/home-depot-account-management-services/" className="wayf-rtag wayf-rtag-c">Home Depot Marketplace</Link>
            <Link href="/houzz-product-listing-services/" className="wayf-rtag wayf-rtag-d">Houzz Listings</Link>
            <Link href="/ecommerce-seo-services/" className="wayf-rtag wayf-rtag-e">eCommerce SEO</Link>
            <Link href="/ecommerce-website-development-services/" className="wayf-rtag wayf-rtag-f">eCommerce Development</Link>
            <Link href="/social-media-marketing-services/" className="wayf-rtag wayf-rtag-a">Social Commerce</Link>
            <Link href="/email-marketing-services/" className="wayf-rtag wayf-rtag-b">Email Automation</Link>
            <Link href="/woocommerce-development-company/" className="wayf-rtag wayf-rtag-c">WooCommerce Development</Link>
            <Link href="/magento-development-company/" className="wayf-rtag wayf-rtag-d">Magento Development</Link>
            <Link href="/google-shopping-management/" className="wayf-rtag wayf-rtag-e">Google Shopping Ads</Link>
            <Link href="/ebay-account-management-services/" className="wayf-rtag wayf-rtag-f">eBay Management</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="wayf-cta">
        <div className="wayf-inner">
          <h2>Ready to Scale Your Wayfair Revenue?</h2>
          <p>Join home goods suppliers who trust 1Solutions to manage, optimise, and grow their Wayfair presence — from first SKU to six-figure monthly orders.</p>
          <Link href="#contact" className="wayf-cta-btn">Get Your Free Consultation Today →</Link>
        </div>
      </section>
    </>
  );
}
