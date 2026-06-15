import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const challenges = [
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Walmart Algorithm Is Not Amazon',
    desc: "Sellers who migrate their Amazon strategy to Walmart without adaptation see poor results. Walmart's algorithm weights item quality score, price competitiveness, and fulfilment speed differently — and most sellers do not know how to optimise for Polaris (Walmart's search algorithm).",
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Item Setup & Spec Compliance',
    desc: 'Walmart has strict and complex item setup requirements including specific attribute fields, category taxonomies, and content quality thresholds. Non-compliant items are automatically suppressed from search — often without clear error messages.',
  },
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'Walmart Fulfillment Services (WFS) Setup',
    desc: 'WFS can dramatically improve your search ranking and conversion rate, but the setup, item eligibility requirements, and inbound shipping standards are significantly more complex than Amazon FBA for new sellers.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Walmart Connect Advertising Gaps',
    desc: "Walmart's advertising platform has fewer features than Amazon Ads and a smaller advertiser base — but that is actually an opportunity most sellers miss. Without a structured approach to Sponsored Products and Display, brands cede visibility to the small number of savvy advertisers already capitalising on lower CPCs.",
  },
];

const services = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Walmart Seller Center Setup & Management',
    desc: 'Full Seller Center account setup, onboarding completion, performance dashboard monitoring, and ongoing account health management to keep your seller score in good standing with Walmart.',
  },
  {
    icon: '21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Item Listing Creation & Optimisation',
    desc: "Polaris algorithm-optimised item titles, descriptions, and attribute fields. We build listings that meet Walmart's content quality standards and rank higher in Walmart.com search results.",
  },
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'Walmart Fulfillment Services (WFS) Setup & Management',
    desc: 'End-to-end WFS setup including item eligibility review, inbound shipment creation, freight coordination, and ongoing inventory management to keep your WFS items in stock and ranking.',
  },
  {
    icon: '9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Walmart Connect Advertising',
    desc: 'Sponsored Products and Display advertising campaign management on Walmart Connect — including keyword strategy, bid optimisation, and campaign performance reporting to drive profitable traffic.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Item Quality Score Optimisation',
    desc: "Walmart's Item Quality Score (IQS) directly impacts search visibility. We systematically improve content completeness, imagery quality, and attribute accuracy to push your IQS to 90+ across your catalogue.",
  },
  {
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    title: 'Category Taxonomy & Attribute Management',
    desc: "Correct category assignment and complete attribute data are critical for Walmart search visibility. We ensure every item is mapped to the right taxonomy and has complete attribute coverage per Walmart's spec sheets.",
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Review & Rating Management',
    desc: "Walmart's review system significantly impacts conversion rate and search ranking. We implement structured review generation strategies and respond to customer feedback to build seller reputation.",
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Performance Analytics & Monthly Reporting',
    desc: 'Monthly performance reports covering sales velocity, item quality scores, advertising performance, competitor pricing, and WFS inventory levels — with a clear action plan for the following month.',
  },
];

const results = [
  { metric: '4.3×', label: 'Average revenue growth in first 8 months on Walmart', sub: 'Across all managed Walmart seller accounts' },
  { metric: '98%', label: 'Listing approval rate on first submission', sub: 'Through compliant item setup process' },
  { metric: '41%', label: 'Lower CPC vs Amazon Ads on comparable categories', sub: 'Walmart Connect advertising benchmark' },
];

const caseStudies = [
  {
    seller: 'US Home Goods Brand',
    before: '$0 on Walmart',
    after: '$85K/mo in 6 months',
    time: '6 months',
    actions: ['Full catalogue set up with WFS', 'Polaris-optimised listings with 95+ item quality scores', 'Walmart Connect campaigns built from scratch'],
  },
  {
    seller: 'Sporting Goods Seller',
    before: '$18K/mo, 4.2% return rate',
    after: '$64K/mo, 1.1% return rate',
    time: '5 months',
    actions: ['Product content overhaul reduced return-driving misexpectations', 'WFS migration improved delivery speed score', 'Competitive pricing strategy improved Buy Box win rate'],
  },
];

const steps = [
  { title: 'Walmart Account Audit', desc: 'Full review of your existing Seller Center setup, item quality scores, suppressed listings, pricing competitiveness, and WFS eligibility.' },
  { title: 'Item Strategy & Setup', desc: 'Category mapping, attribute planning, and bulk item setup with full spec compliance — targeting 95+ item quality scores across your catalogue.' },
  { title: 'WFS Onboarding', desc: 'Item eligibility review, inbound freight coordination, WFS setup in Seller Center, and inventory planning to avoid stockouts.' },
  { title: 'Advertising Launch', desc: 'Walmart Connect Sponsored Products campaigns built from the ground up with keyword research, initial bids, and campaign structure.' },
  { title: 'Performance Optimisation', desc: 'Ongoing item quality score improvements, weekly advertising bid adjustments, pricing strategy updates, and competitor monitoring.' },
  { title: 'Monthly Reporting', desc: 'Full monthly performance review with sales data, advertising metrics, item quality trends, and a prioritised action plan for the next 30 days.' },
];

const stats = [
  { num: '120M', lbl: 'Walmart.com monthly visitors' },
  { num: '$82B+', lbl: 'Walmart eCommerce GMV (2024)' },
  { num: '3.8×', lbl: 'avg revenue growth in 8 months' },
  { num: '98%', lbl: 'listing approval rate' },
];

const trust = ['Walmart Seller Center experts', 'WFS certified setup', 'No lock-in contracts', 'Dedicated account manager'];

export default function WalmartAccountManagement() {
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue: 'Under $10K/mo', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Head>
        <title>Walmart Marketplace Account Management Services | 1Solutions</title>
        <meta name="description" content="Grow on Walmart Marketplace with 1Solutions. We manage Seller Center, Walmart listings, WFS setup, Walmart Connect advertising, and performance optimisation for US brands." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1solutions.biz/walmart-account-management-services/" />
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
          .wlmt-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(0,38,90,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(0,38,90,0.05) 100%);}
          .wlmt-orb1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,38,90,0.10) 0%,transparent 70%);pointer-events:none;filter:blur(12px);}
          .wlmt-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
          .wlmt-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(0,38,90,0.09);border:1px solid rgba(0,38,90,0.20);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#00265a;margin-bottom:24px;}
          .wlmt-h1{font-size:clamp(2.2rem,4vw,3.6rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;color:#0A1628;}
          .wlmt-h1-accent{background:linear-gradient(90deg,#00265a 0%,#1a5aab 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .wlmt-desc{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:680px;}
          .wlmt-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
          .wlmt-btn-p{display:inline-flex;align-items:center;gap:8px;background:#00265a;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(0,38,90,0.25);}
          .wlmt-btn-p:hover{opacity:0.9;transform:translateY(-2px);}
          .wlmt-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#00265a;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(0,38,90,0.20);transition:all 0.25s;backdrop-filter:blur(8px);}
          .wlmt-btn-s:hover{background:#fff;transform:translateY(-2px);}
          .wlmt-trust{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px;}
          .wlmt-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500;}
          .wlmt-stats-bar{display:flex;border:1px solid rgba(0,38,90,0.10);border-radius:16px;background:rgba(255,255,255,0.80);backdrop-filter:blur(12px);overflow:hidden;max-width:680px;}
          .wlmt-stat-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(0,38,90,0.08);}
          .wlmt-stat-item:last-child{border-right:none;}
          .wlmt-stat-num{font-size:1.9rem;font-weight:900;color:#00265a;line-height:1;letter-spacing:-1px;}
          .wlmt-stat-lbl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px;}
          .wlmt-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px;}
          .wlmt-bc-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280;}
          .wlmt-bc a{color:#6b7280;text-decoration:none;}.wlmt-bc a:hover{color:#00265a;}
          .wlmt-bc-sep{color:#d1d5db;}.wlmt-bc-cur{color:#00265a;font-weight:500;}
          .wlmt-sec{padding:80px 40px;}
          .wlmt-bg{background:#f8fafd;}
          .wlmt-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#00265a;margin-bottom:12px;}
          .wlmt-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px;}
          .wlmt-h2 span{background:linear-gradient(90deg,#00265a,#1a5aab);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .wlmt-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px;}
          .wlmt-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .wlmt-grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;}
          .wlmt-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .wlmt-card{background:linear-gradient(135deg,rgba(0,38,90,0.06) 0%,rgba(255,255,255,0.90) 60%,rgba(0,38,90,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(0,38,90,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s;}
          .wlmt-card:hover{transform:translateY(-6px);border-color:rgba(0,38,90,0.20);box-shadow:0 16px 48px rgba(0,38,90,0.12);}
          .wlmt-icon{width:48px;height:48px;border-radius:14px;background:rgba(0,38,90,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .wlmt-icon svg{width:22px;height:22px;color:#00265a;}
          .wlmt-card-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3;}
          .wlmt-card-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .wlmt-chal-card{background:#fff;border:1px solid #f0f0f0;border-radius:20px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,0.05);}
          .wlmt-chal-icon{width:48px;height:48px;border-radius:14px;background:rgba(0,38,90,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
          .wlmt-chal-icon svg{width:22px;height:22px;color:#00265a;}
          .wlmt-chal-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .wlmt-chal-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .wlmt-results{background:linear-gradient(135deg,#000f26 0%,#00265a 100%);padding:64px 40px;}
          .wlmt-results-inner{max-width:1200px;margin:0 auto;}
          .wlmt-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:12px;text-align:center;}
          .wlmt-res-h{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2;}
          .wlmt-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .wlmt-res-card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:20px;padding:36px 28px;text-align:center;}
          .wlmt-res-metric{font-size:3.2rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px;color:#fff;}
          .wlmt-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
          .wlmt-res-sub{font-size:12.5px;color:rgba(255,255,255,0.50);}
          .wlmt-cs-card{background:#fff;border:1px solid #e5e7eb;border-radius:20px;padding:32px;box-shadow:0 4px 16px rgba(0,0,0,0.06);}
          .wlmt-cs-badge{display:inline-block;background:rgba(0,38,90,0.10);color:#00265a;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 12px;border-radius:50px;margin-bottom:12px;}
          .wlmt-cs-seller{font-size:1.1rem;font-weight:700;color:#0A1628;margin-bottom:20px;}
          .wlmt-cs-metrics{display:flex;align-items:center;gap:16px;margin-bottom:20px;flex-wrap:wrap;}
          .wlmt-cs-metric{display:flex;flex-direction:column;gap:4px;}
          .wlmt-cs-label{font-size:11px;color:#9ca3af;font-weight:500;}
          .wlmt-cs-val{font-size:1rem;font-weight:700;color:#0A1628;}
          .wlmt-cs-before{color:#ef4444;}
          .wlmt-cs-after{color:#16a34a;}
          .wlmt-cs-arrow{font-size:1.5rem;color:#d1d5db;}
          .wlmt-cs-actions{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;}
          .wlmt-cs-actions li{font-size:13.5px;color:#4b5563;padding-left:20px;position:relative;}
          .wlmt-cs-actions li::before{content:"✓";position:absolute;left:0;color:#00265a;font-weight:700;}
          .wlmt-proc-num{font-size:3rem;font-weight:900;color:rgba(0,38,90,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .wlmt-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#00265a,rgba(0,38,90,0.3));border-radius:2px;margin-bottom:16px;}
          .wlmt-proc-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .wlmt-proc-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .wlmt-contact-sec{padding:80px 40px;background:#f8fafd;}
          .wlmt-contact-inner{max-width:1200px;margin:0 auto;}
          .wlmt-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:56px;align-items:start;}
          .wlmt-contact-info-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:900;color:#0A1628;margin:0 0 16px;line-height:1.25;}
          .wlmt-contact-info-h span{background:linear-gradient(90deg,#00265a,#1a5aab);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .wlmt-contact-info-p{font-size:1rem;color:#4b5563;line-height:1.75;margin:0 0 32px;}
          .wlmt-contact-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px;}
          .wlmt-contact-item-icon{width:40px;height:40px;border-radius:12px;background:rgba(0,38,90,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .wlmt-contact-item-icon svg{width:18px;height:18px;color:#00265a;}
          .wlmt-contact-item-text strong{display:block;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
          .wlmt-contact-item-text a,.wlmt-contact-item-text span{font-size:13.5px;color:#4b5563;text-decoration:none;}
          .wlmt-form-wrap{background:#fff;border-radius:24px;padding:40px;box-shadow:0 4px 32px rgba(0,0,0,0.08);}
          .wlmt-field{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
          .wlmt-field label{font-size:13px;font-weight:600;color:#374151;}
          .wlmt-field input,.wlmt-field select,.wlmt-field textarea{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:border-color 0.2s;background:#fff;}
          .wlmt-field input:focus,.wlmt-field select:focus,.wlmt-field textarea:focus{border-color:#00265a;}
          .wlmt-field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
          .wlmt-sent{text-align:center;padding:48px 24px;}
          .wlmt-sent-icon{width:64px;height:64px;border-radius:50%;background:#00265a;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .wlmt-sent-icon svg{width:28px;height:28px;color:#fff;}
          .wlmt-sent h3{font-size:1.5rem;font-weight:800;color:#0A1628;margin:0 0 10px;}
          .wlmt-sent p{color:#4b5563;font-size:1rem;line-height:1.7;margin:0;}
          .wlmt-submit-btn{width:100%;padding:14px;background:#00265a;color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s;}
          .wlmt-submit-btn:hover{opacity:0.88;}
          .wlmt-cta{background:#00265a;padding:72px 40px;text-align:center;}
          .wlmt-cta h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.2;}
          .wlmt-cta p{font-size:1rem;color:rgba(255,255,255,0.80);margin:0 0 32px;}
          .wlmt-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#00265a;padding:14px 32px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
          .wlmt-cta-btn:hover{transform:translateY(-2px);opacity:0.95;}
          @media(max-width:900px){.wlmt-grid3,.wlmt-grid4{grid-template-columns:1fr 1fr;}.wlmt-grid2{grid-template-columns:1fr;}.wlmt-contact-grid{grid-template-columns:1fr;}.wlmt-res-grid{grid-template-columns:1fr 1fr;}}
          @media(max-width:600px){.wlmt-hero,.wlmt-sec,.wlmt-results,.wlmt-cta,.wlmt-contact-sec{padding-left:20px;padding-right:20px;}.wlmt-hero{padding-top:60px;padding-bottom:50px;}.wlmt-grid3,.wlmt-grid4,.wlmt-grid2,.wlmt-res-grid{grid-template-columns:1fr;}.wlmt-bc{padding:12px 20px;}.wlmt-field-row{grid-template-columns:1fr;}.wlmt-form-wrap{padding:24px 20px;}}
        `}</style>
      </Head>

      {/* Breadcrumb */}
      <nav className="wlmt-bc">
        <div className="wlmt-bc-inner">
          <Link href="/">Home</Link>
          <span className="wlmt-bc-sep">›</span>
          <Link href="/services">Services</Link>
          <span className="wlmt-bc-sep">›</span>
          <span className="wlmt-bc-cur">Walmart Marketplace Account Management</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="wlmt-hero">
        <div className="wlmt-orb1" />
        <div className="wlmt-inner">
          <div className="wlmt-eyebrow">Walmart Seller Management</div>
          <h1 className="wlmt-h1">
            Walmart Marketplace Management That Puts Your Brand in Front of <span className="wlmt-h1-accent">120M Monthly Shoppers</span>
          </h1>
          <p className="wlmt-desc">
            Walmart is the fastest-growing US marketplace — and most sellers are leaving enormous revenue on the table by running it like a secondary channel. 1Solutions manages your full Walmart seller presence to capture market share while your competitors sleep.
          </p>
          <div className="wlmt-trust">
            {trust.map((t, i) => (
              <span key={i} className="wlmt-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00265a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="wlmt-btns">
            <Link href="#contact" className="wlmt-btn-p">Get Free Walmart Audit</Link>
            <Link href="#services" className="wlmt-btn-s">See What We Manage</Link>
          </div>
          <div className="wlmt-stats-bar">
            {stats.map((s, i) => (
              <div key={i} className="wlmt-stat-item">
                <span className="wlmt-stat-num">{s.num}</span>
                <span className="wlmt-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="wlmt-sec wlmt-bg">
        <div className="wlmt-inner">
          <span className="wlmt-tag">Common Walmart Seller Struggles</span>
          <h2 className="wlmt-h2">Why Walmart Sellers <span>Struggle to Scale</span></h2>
          <p className="wlmt-lead">Walmart Marketplace has enormous potential — but it requires a platform-specific strategy. These are the four challenges that most Walmart sellers face without expert management.</p>
          <div className="wlmt-grid4">
            {challenges.map((c, i) => (
              <div key={i} className="wlmt-chal-card">
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

      {/* Services */}
      <section className="wlmt-sec" id="services">
        <div className="wlmt-inner">
          <span className="wlmt-tag">Full-Service Walmart Management</span>
          <h2 className="wlmt-h2">What Our <span>Walmart Management</span> Covers</h2>
          <p className="wlmt-lead">From initial Seller Center setup to WFS fulfilment and Walmart Connect advertising — we manage every aspect of your Walmart seller presence.</p>
          <div className="wlmt-grid4">
            {services.map((s, i) => (
              <div key={i} className="wlmt-card">
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

      {/* Results Band */}
      <section className="wlmt-results">
        <div className="wlmt-results-inner">
          <span className="wlmt-res-tag">Proven Results</span>
          <h2 className="wlmt-res-h">Real Numbers From Real Walmart Sellers</h2>
          <div className="wlmt-res-grid">
            {results.map((r, i) => (
              <div key={i} className="wlmt-res-card">
                <div className="wlmt-res-metric">{r.metric}</div>
                <div className="wlmt-res-label">{r.label}</div>
                <div className="wlmt-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="wlmt-sec wlmt-bg">
        <div className="wlmt-inner">
          <span className="wlmt-tag">Case Studies</span>
          <h2 className="wlmt-h2">Walmart Sellers <span>We Have Grown</span></h2>
          <p className="wlmt-lead">Real results from brands that trusted 1Solutions to launch and scale on Walmart Marketplace.</p>
          <div className="wlmt-grid2">
            {caseStudies.map((cs, i) => (
              <div key={i} className="wlmt-cs-card">
                <div className="wlmt-cs-badge">Walmart</div>
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

      {/* Process */}
      <section className="wlmt-sec">
        <div className="wlmt-inner">
          <span className="wlmt-tag">Our Process</span>
          <h2 className="wlmt-h2">How We <span>Manage Your Walmart Account</span></h2>
          <p className="wlmt-lead">A six-step process built specifically for Walmart Marketplace — from setup to consistent monthly revenue growth.</p>
          <div className="wlmt-grid3">
            {steps.map((s, i) => (
              <div key={i} className="wlmt-card">
                <div className="wlmt-proc-num">0{i + 1}</div>
                <div className="wlmt-proc-line" />
                <h3 className="wlmt-proc-h">{s.title}</h3>
                <p className="wlmt-proc-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="wlmt-contact-sec" id="contact">
        <div className="wlmt-contact-inner">
          <div className="wlmt-contact-grid">
            <div>
              <h2 className="wlmt-contact-info-h">Get a Free <span>Walmart Seller Audit</span></h2>
              <p className="wlmt-contact-info-p">We will audit your existing Walmart seller setup or help you plan a new launch — reviewing item quality scores, pricing, WFS eligibility, and ad opportunities.</p>
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
                  <strong>WhatsApp</strong>
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
            <div className="wlmt-form-wrap">
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
                      <input required type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="wlmt-field">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="jane@store.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="wlmt-field">
                    <label>Company / Store Name</label>
                    <input type="text" placeholder="Your Brand or Store" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                  </div>
                  <div className="wlmt-field">
                    <label>Monthly Revenue</label>
                    <select value={form.revenue} onChange={e => setForm({...form, revenue: e.target.value})}>
                      <option>Under $10K/mo</option>
                      <option>$10K–$50K/mo</option>
                      <option>$50K–$200K/mo</option>
                      <option>$200K+/mo</option>
                    </select>
                  </div>
                  <div className="wlmt-field">
                    <label>Tell Us About Your Walmart Store</label>
                    <textarea rows={4} placeholder="Are you an existing Walmart seller or planning to launch? What are your biggest challenges?" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button type="submit" className="wlmt-submit-btn">Request Free Walmart Audit →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="wlmt-cta">
        <div className="wlmt-inner">
          <h2>Ready to Capture Walmart Marketplace Revenue?</h2>
          <p>Join brands who trust 1Solutions to manage and scale their Walmart seller accounts — from first listing to six-figure monthly revenue.</p>
          <Link href="#contact" className="wlmt-cta-btn">Get Your Free Audit Today →</Link>
        </div>
      </section>
    </>
  );
}
