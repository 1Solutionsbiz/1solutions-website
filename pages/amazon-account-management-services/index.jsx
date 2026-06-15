import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#6b3a00';
const RGB = '107,58,0';

const challenges = [
  {
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    title: 'Account Suspension Risk',
    desc: "Amazon's ever-changing policies create constant suspension risk. One ASIN flagged for intellectual property, authenticity, or safety issues can cascade into a full account suspension, wiping out months of momentum. Most sellers do not have the institutional knowledge to prevent or recover from this.",
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Buy Box Loss to Competitors',
    desc: 'Winning the Buy Box determines whether customers can actually buy from you. Price wars, seller performance metrics, and fulfilment method all affect Buy Box eligibility, and most sellers lose it without knowing why or how to recover it systematically.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'PPC Campaigns Burning Cash',
    desc: 'Amazon PPC without a structured bidding strategy, negative keyword lists, and regular optimisation turns into a money drain. Average sellers run campaigns at 40-80% ACoS when optimised campaigns should sit at 15-25% for most product categories.',
  },
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Invisible Listings in Search',
    desc: "Poorly written titles, missing backend keywords, and weak bullet points keep profitable products buried on page 5. Amazon's A9 algorithm rewards relevance and conversion rate — and most product listings are optimised for neither.",
  },
];

const services = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Seller Central Account Management',
    desc: 'End-to-end Seller Central management: performance dashboard monitoring, account health maintenance, policy compliance review, case management with Amazon Seller Support, and proactive issue resolution before they become suspensions.',
  },
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Listing Optimisation (SEO + Conversion)',
    desc: 'Keyword-rich title writing, bullet points and descriptions using Amazon SEO best practices, backend search term optimisation, and product description copywriting that improves both search ranking and conversion rate.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'A+ Content & Brand Storefront',
    desc: 'Premium A+ Content design and copywriting for registered brands, interactive comparison tables, brand story modules, and a fully designed Amazon Brand Store that converts browsers into buyers.',
  },
  {
    icon: '9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Amazon PPC Management',
    desc: 'Sponsored Products, Sponsored Brands, and Sponsored Display campaign management — including keyword harvesting, negative keyword builds, bid optimisation, dayparting, and campaign structure audit.',
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Account Health & Compliance',
    desc: 'Daily account health score monitoring, immediate response to policy warnings, proactive ASIN review for potential issues, and comprehensive documentation management to maintain ODR, cancellation rate, and late shipment rate within targets.',
  },
  {
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    title: 'Brand Registry & Protection',
    desc: "Amazon Brand Registry enrolment, brand infringement report filing, counterfeit seller reporting, MAP policy enforcement using Amazon's IP Accelerator and Project Zero tools.",
  },
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'FBA Inventory Management',
    desc: 'Inventory planning to avoid stockouts and long-term storage fees, FBA shipment creation and management, restock recommendations based on velocity data, and stranded inventory resolution.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Reporting & Analytics',
    desc: 'Monthly business review reports showing sales velocity, BSR movement, PPC performance, conversion rate trends, and Buy Box win percentage — with a clear roadmap for the next 30 days.',
  },
];

const results = [
  { metric: '$2.8M+', label: 'Total monthly Amazon revenue managed across our seller portfolio', sub: 'Across 340+ active accounts' },
  { metric: '68%', label: 'Average ACoS reduction within 90 days of PPC management takeover', sub: 'Across all managed ad accounts' },
  { metric: '4.7×', label: 'Average revenue growth in the first 12 months', sub: 'US, UK, CA, AU sellers' },
];

const caseStudies = [
  {
    seller: 'US Baby Products Brand',
    before: '$42K/mo revenue',
    after: '$180K/mo revenue',
    time: '8 months',
    actions: ['Complete listing overhaul with A+ Content', 'PPC restructure reduced ACoS from 62% to 21%', 'Brand Store launch drove 38% of total sales'],
  },
  {
    seller: 'UK Consumer Electronics Seller',
    before: 'Suspended — $0 revenue',
    after: 'Reinstated + $95K/mo',
    time: '4 months',
    actions: ['Account suspension appeal written and submitted', '60 ASINs re-listed with compliant content', 'New account health monitoring protocol put in place'],
  },
];

const steps = [
  { title: 'Amazon Account Audit', desc: 'Full review of listings, PPC campaigns, account health, competitor landscape, and missed keyword opportunities.' },
  { title: 'Strategy & Roadmap', desc: 'A 90-day growth plan prioritised by revenue impact: quick wins first, then structural improvements.' },
  { title: 'Listing Overhaul', desc: 'Keyword research, copywriting, image recommendations, A+ Content, and backend term optimisation.' },
  { title: 'PPC Campaign Build', desc: 'Campaign restructure or build from scratch with proper keyword tiering, bid strategy, and negative keyword foundation.' },
  { title: 'Ongoing Optimisation', desc: 'Weekly PPC bid reviews, listing split testing, inventory monitoring, and account health checks.' },
  { title: 'Monthly Business Review', desc: 'Full performance report with revenue attribution, PPC performance, keyword rank movement, and next-month roadmap.' },
];

const stats = [
  { num: '$2.8M+', lbl: 'Amazon revenue managed per month' },
  { num: '340+', lbl: 'Amazon seller accounts managed' },
  { num: '68%', lbl: 'avg ACoS reduction in 90 days' },
  { num: '4.7×', lbl: 'avg revenue growth in 12 months' },
];

const trust = ['Seller Central certified', 'White-hat only', 'No lock-in contracts', 'Dedicated account manager'];

export default function AmazonAccountManagement() {
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue: 'Under $10K/mo', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Head>
        <title>Amazon Account Management Services | Seller Central Experts | 1Solutions</title>
        <meta name="description" content="Expert Amazon account management by 1Solutions. We handle Seller Central, listing optimization, PPC advertising, account health, Brand Registry, FBA management, and A+ Content." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1solutions.biz/amazon-account-management-services/" />
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
          .amzn-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(107,58,0,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(107,58,0,0.05) 100%);}
          .amzn-orb1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(107,58,0,0.10) 0%,transparent 70%);pointer-events:none;filter:blur(12px);}
          .amzn-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
          .amzn-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(107,58,0,0.09);border:1px solid rgba(107,58,0,0.20);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#6b3a00;margin-bottom:24px;}
          .amzn-h1{font-size:clamp(2.2rem,4vw,3.6rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;color:#0A1628;}
          .amzn-h1-accent{background:linear-gradient(90deg,#6b3a00 0%,#c87941 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .amzn-desc{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:680px;}
          .amzn-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
          .amzn-btn-p{display:inline-flex;align-items:center;gap:8px;background:#6b3a00;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(107,58,0,0.25);}
          .amzn-btn-p:hover{opacity:0.9;transform:translateY(-2px);}
          .amzn-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#6b3a00;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(107,58,0,0.20);transition:all 0.25s;backdrop-filter:blur(8px);}
          .amzn-btn-s:hover{background:#fff;transform:translateY(-2px);}
          .amzn-trust{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px;}
          .amzn-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500;}
          .amzn-stats-bar{display:flex;border:1px solid rgba(107,58,0,0.10);border-radius:16px;background:rgba(255,255,255,0.80);backdrop-filter:blur(12px);overflow:hidden;max-width:680px;}
          .amzn-stat-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(107,58,0,0.08);}
          .amzn-stat-item:last-child{border-right:none;}
          .amzn-stat-num{font-size:1.9rem;font-weight:900;color:#6b3a00;line-height:1;letter-spacing:-1px;}
          .amzn-stat-lbl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px;}
          .amzn-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px;}
          .amzn-bc-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280;}
          .amzn-bc a{color:#6b7280;text-decoration:none;}.amzn-bc a:hover{color:#6b3a00;}
          .amzn-bc-sep{color:#d1d5db;}.amzn-bc-cur{color:#6b3a00;font-weight:500;}
          .amzn-sec{padding:80px 40px;}
          .amzn-bg{background:#f8fafd;}
          .amzn-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#6b3a00;margin-bottom:12px;}
          .amzn-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px;}
          .amzn-h2 span{background:linear-gradient(90deg,#6b3a00,#c87941);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .amzn-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px;}
          .amzn-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .amzn-grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;}
          .amzn-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .amzn-card{background:linear-gradient(135deg,rgba(107,58,0,0.06) 0%,rgba(255,255,255,0.90) 60%,rgba(107,58,0,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(107,58,0,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s;}
          .amzn-card:hover{transform:translateY(-6px);border-color:rgba(107,58,0,0.20);box-shadow:0 16px 48px rgba(107,58,0,0.12);}
          .amzn-icon{width:48px;height:48px;border-radius:14px;background:rgba(107,58,0,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .amzn-icon svg{width:22px;height:22px;color:#6b3a00;}
          .amzn-card-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3;}
          .amzn-card-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .amzn-chal-card{background:#fff;border:1px solid #f0f0f0;border-radius:20px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,0.05);}
          .amzn-chal-icon{width:48px;height:48px;border-radius:14px;background:rgba(107,58,0,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
          .amzn-chal-icon svg{width:22px;height:22px;color:#6b3a00;}
          .amzn-chal-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .amzn-chal-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .amzn-results{background:linear-gradient(135deg,#2a1500 0%,#6b3a00 100%);padding:64px 40px;}
          .amzn-results-inner{max-width:1200px;margin:0 auto;}
          .amzn-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:12px;text-align:center;}
          .amzn-res-h{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2;}
          .amzn-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .amzn-res-card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:20px;padding:36px 28px;text-align:center;}
          .amzn-res-metric{font-size:3.2rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px;color:#fff;}
          .amzn-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
          .amzn-res-sub{font-size:12.5px;color:rgba(255,255,255,0.50);}
          .amzn-cs-card{background:#fff;border:1px solid #e5e7eb;border-radius:20px;padding:32px;box-shadow:0 4px 16px rgba(0,0,0,0.06);}
          .amzn-cs-badge{display:inline-block;background:rgba(107,58,0,0.10);color:#6b3a00;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 12px;border-radius:50px;margin-bottom:12px;}
          .amzn-cs-seller{font-size:1.1rem;font-weight:700;color:#0A1628;margin-bottom:20px;}
          .amzn-cs-metrics{display:flex;align-items:center;gap:16px;margin-bottom:20px;flex-wrap:wrap;}
          .amzn-cs-metric{display:flex;flex-direction:column;gap:4px;}
          .amzn-cs-label{font-size:11px;color:#9ca3af;font-weight:500;}
          .amzn-cs-val{font-size:1rem;font-weight:700;color:#0A1628;}
          .amzn-cs-before{color:#ef4444;}
          .amzn-cs-after{color:#16a34a;}
          .amzn-cs-arrow{font-size:1.5rem;color:#d1d5db;}
          .amzn-cs-actions{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;}
          .amzn-cs-actions li{font-size:13.5px;color:#4b5563;padding-left:20px;position:relative;}
          .amzn-cs-actions li::before{content:"✓";position:absolute;left:0;color:#6b3a00;font-weight:700;}
          .amzn-proc-num{font-size:3rem;font-weight:900;color:rgba(107,58,0,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .amzn-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#6b3a00,rgba(107,58,0,0.3));border-radius:2px;margin-bottom:16px;}
          .amzn-proc-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .amzn-proc-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .amzn-contact-sec{padding:80px 40px;background:#f8fafd;}
          .amzn-contact-inner{max-width:1200px;margin:0 auto;}
          .amzn-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:56px;align-items:start;}
          .amzn-contact-info-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:900;color:#0A1628;margin:0 0 16px;line-height:1.25;}
          .amzn-contact-info-h span{background:linear-gradient(90deg,#6b3a00,#c87941);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .amzn-contact-info-p{font-size:1rem;color:#4b5563;line-height:1.75;margin:0 0 32px;}
          .amzn-contact-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px;}
          .amzn-contact-item-icon{width:40px;height:40px;border-radius:12px;background:rgba(107,58,0,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .amzn-contact-item-icon svg{width:18px;height:18px;color:#6b3a00;}
          .amzn-contact-item-text strong{display:block;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
          .amzn-contact-item-text a,.amzn-contact-item-text span{font-size:13.5px;color:#4b5563;text-decoration:none;}
          .amzn-form-wrap{background:#fff;border-radius:24px;padding:40px;box-shadow:0 4px 32px rgba(0,0,0,0.08);}
          .amzn-field{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
          .amzn-field label{font-size:13px;font-weight:600;color:#374151;}
          .amzn-field input,.amzn-field select,.amzn-field textarea{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:border-color 0.2s;background:#fff;}
          .amzn-field input:focus,.amzn-field select:focus,.amzn-field textarea:focus{border-color:#6b3a00;}
          .amzn-field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
          .amzn-sent{text-align:center;padding:48px 24px;}
          .amzn-sent-icon{width:64px;height:64px;border-radius:50%;background:#6b3a00;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .amzn-sent-icon svg{width:28px;height:28px;color:#fff;}
          .amzn-sent h3{font-size:1.5rem;font-weight:800;color:#0A1628;margin:0 0 10px;}
          .amzn-sent p{color:#4b5563;font-size:1rem;line-height:1.7;margin:0;}
          .amzn-submit-btn{width:100%;padding:14px;background:#6b3a00;color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s;}
          .amzn-submit-btn:hover{opacity:0.88;}
          .amzn-cta{background:#6b3a00;padding:72px 40px;text-align:center;}
          .amzn-cta h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.2;}
          .amzn-cta p{font-size:1rem;color:rgba(255,255,255,0.80);margin:0 0 32px;}
          .amzn-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#6b3a00;padding:14px 32px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
          .amzn-cta-btn:hover{transform:translateY(-2px);opacity:0.95;}
          @media(max-width:900px){.amzn-grid3,.amzn-grid4{grid-template-columns:1fr 1fr;}.amzn-grid2{grid-template-columns:1fr;}.amzn-contact-grid{grid-template-columns:1fr;}.amzn-res-grid{grid-template-columns:1fr 1fr;}}
          @media(max-width:600px){.amzn-hero,.amzn-sec,.amzn-results,.amzn-cta,.amzn-contact-sec{padding-left:20px;padding-right:20px;}.amzn-hero{padding-top:60px;padding-bottom:50px;}.amzn-grid3,.amzn-grid4,.amzn-grid2,.amzn-res-grid{grid-template-columns:1fr;}.amzn-bc{padding:12px 20px;}.amzn-field-row{grid-template-columns:1fr;}.amzn-form-wrap{padding:24px 20px;}}
        `}</style>
      </Head>

      {/* Breadcrumb */}
      <nav className="amzn-bc">
        <div className="amzn-bc-inner">
          <Link href="/">Home</Link>
          <span className="amzn-bc-sep">›</span>
          <Link href="/services">Services</Link>
          <span className="amzn-bc-sep">›</span>
          <span className="amzn-bc-cur">Amazon Account Management Services</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="amzn-hero">
        <div className="amzn-orb1" />
        <div className="amzn-inner">
          <div className="amzn-eyebrow">Amazon Marketplace Management</div>
          <h1 className="amzn-h1">
            Amazon Account Management That <span className="amzn-h1-accent">Grows Your Revenue</span> Month Over Month
          </h1>
          <p className="amzn-desc">
            1Solutions manages every aspect of your Amazon Seller Central account — listings, PPC, account health, FBA, and Brand Registry — so you can focus on your products while we focus on your growth.
          </p>
          <div className="amzn-trust">
            {trust.map((t, i) => (
              <span key={i} className="amzn-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b3a00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="amzn-btns">
            <Link href="#contact" className="amzn-btn-p">Get Free Amazon Audit</Link>
            <Link href="#services" className="amzn-btn-s">See What We Manage</Link>
          </div>
          <div className="amzn-stats-bar">
            {stats.map((s, i) => (
              <div key={i} className="amzn-stat-item">
                <span className="amzn-stat-num">{s.num}</span>
                <span className="amzn-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="amzn-sec amzn-bg">
        <div className="amzn-inner">
          <span className="amzn-tag">Common Amazon Seller Struggles</span>
          <h2 className="amzn-h2">Why Amazon Sellers <span>Struggle to Scale</span></h2>
          <p className="amzn-lead">Amazon is the world's largest marketplace — but it is also the most complex. These are the four challenges that consistently hold sellers back from sustainable growth.</p>
          <div className="amzn-grid4">
            {challenges.map((c, i) => (
              <div key={i} className="amzn-chal-card">
                <div className="amzn-chal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon}/></svg>
                </div>
                <h3 className="amzn-chal-h">{c.title}</h3>
                <p className="amzn-chal-p">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="amzn-sec" id="services">
        <div className="amzn-inner">
          <span className="amzn-tag">Full-Service Amazon Management</span>
          <h2 className="amzn-h2">What Our <span>Amazon Management</span> Covers</h2>
          <p className="amzn-lead">From listing creation to PPC management to account protection — we handle every lever that drives Amazon revenue growth.</p>
          <div className="amzn-grid4" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
            {services.map((s, i) => (
              <div key={i} className="amzn-card">
                <div className="amzn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                </div>
                <h3 className="amzn-card-h">{s.title}</h3>
                <p className="amzn-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Band */}
      <section className="amzn-results">
        <div className="amzn-results-inner">
          <span className="amzn-res-tag">Proven Results</span>
          <h2 className="amzn-res-h">Real Numbers From Real Amazon Sellers</h2>
          <div className="amzn-res-grid">
            {results.map((r, i) => (
              <div key={i} className="amzn-res-card">
                <div className="amzn-res-metric">{r.metric}</div>
                <div className="amzn-res-label">{r.label}</div>
                <div className="amzn-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="amzn-sec amzn-bg">
        <div className="amzn-inner">
          <span className="amzn-tag">Case Studies</span>
          <h2 className="amzn-h2">Amazon Sellers <span>We Have Grown</span></h2>
          <p className="amzn-lead">Real results from brands that trusted 1Solutions to manage and grow their Amazon presence.</p>
          <div className="amzn-grid2">
            {caseStudies.map((cs, i) => (
              <div key={i} className="amzn-cs-card">
                <div className="amzn-cs-badge">Amazon</div>
                <div className="amzn-cs-seller">{cs.seller}</div>
                <div className="amzn-cs-metrics">
                  <div className="amzn-cs-metric">
                    <span className="amzn-cs-label">Before</span>
                    <span className="amzn-cs-val amzn-cs-before">{cs.before}</span>
                  </div>
                  <div className="amzn-cs-arrow">→</div>
                  <div className="amzn-cs-metric">
                    <span className="amzn-cs-label">After</span>
                    <span className="amzn-cs-val amzn-cs-after">{cs.after}</span>
                  </div>
                  <div className="amzn-cs-metric">
                    <span className="amzn-cs-label">Timeline</span>
                    <span className="amzn-cs-val">{cs.time}</span>
                  </div>
                </div>
                <ul className="amzn-cs-actions">
                  {cs.actions.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="amzn-sec">
        <div className="amzn-inner">
          <span className="amzn-tag">Our Process</span>
          <h2 className="amzn-h2">How We <span>Manage Your Amazon Account</span></h2>
          <p className="amzn-lead">A structured six-step process that takes you from audit to consistent monthly growth.</p>
          <div className="amzn-grid3">
            {steps.map((s, i) => (
              <div key={i} className="amzn-card">
                <div className="amzn-proc-num">0{i + 1}</div>
                <div className="amzn-proc-line" />
                <h3 className="amzn-proc-h">{s.title}</h3>
                <p className="amzn-proc-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="amzn-contact-sec" id="contact">
        <div className="amzn-contact-inner">
          <div className="amzn-contact-grid">
            <div>
              <h2 className="amzn-contact-info-h">Get a Free <span>Amazon Account Audit</span></h2>
              <p className="amzn-contact-info-p">Tell us about your Amazon store and we will prepare a detailed audit covering your listings, PPC performance, account health gaps, and revenue growth opportunities — completely free.</p>
              <div className="amzn-contact-item">
                <div className="amzn-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="amzn-contact-item-text">
                  <strong>Email</strong>
                  <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>
                </div>
              </div>
              <div className="amzn-contact-item">
                <div className="amzn-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>
                </div>
                <div className="amzn-contact-item-text">
                  <strong>WhatsApp</strong>
                  <a href="tel:+18881SOLUTIONS">+1 (888) 1SOLUTIONS</a>
                </div>
              </div>
              <div className="amzn-contact-item">
                <div className="amzn-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="amzn-contact-item-text">
                  <strong>Response Time</strong>
                  <span>Within 24 hours</span>
                </div>
              </div>
            </div>
            <div className="amzn-form-wrap">
              {sent ? (
                <div className="amzn-sent">
                  <div className="amzn-sent-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3>Audit Request Received</h3>
                  <p>Thank you! Our Amazon account specialists will prepare your free audit and be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="amzn-field-row">
                    <div className="amzn-field">
                      <label>Your Name *</label>
                      <input required type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="amzn-field">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="jane@store.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="amzn-field">
                    <label>Company / Store Name</label>
                    <input type="text" placeholder="Your Brand or Store" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                  </div>
                  <div className="amzn-field">
                    <label>Monthly Revenue</label>
                    <select value={form.revenue} onChange={e => setForm({...form, revenue: e.target.value})}>
                      <option>Under $10K/mo</option>
                      <option>$10K–$50K/mo</option>
                      <option>$50K–$200K/mo</option>
                      <option>$200K+/mo</option>
                    </select>
                  </div>
                  <div className="amzn-field">
                    <label>Tell Us About Your Amazon Account</label>
                    <textarea rows={4} placeholder="What marketplaces are you selling on? What are your biggest challenges?" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button type="submit" className="amzn-submit-btn">Request Free Amazon Audit →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="amzn-cta">
        <div className="amzn-inner">
          <h2>Ready to Grow Your Amazon Revenue?</h2>
          <p>Join 340+ Amazon sellers who trust 1Solutions to manage and scale their Seller Central accounts month after month.</p>
          <Link href="#contact" className="amzn-cta-btn">Get Your Free Audit Today →</Link>
        </div>
      </section>
    </>
  );
}
