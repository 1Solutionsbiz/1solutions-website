import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const challenges = [
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Cassini Algorithm Misunderstood',
    desc: 'Most eBay sellers do not understand that Cassini rewards seller performance metrics (feedback score, defect rate, returns resolution) just as much as listing content. Sellers optimising only for titles while ignoring seller health see their listings gradually buried.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Top Rated Seller Status at Risk',
    desc: 'TRS status provides up to 10% final value fee discount and a gold TRS badge that increases click-through rate. Maintaining it requires consistently meeting shipping time, tracking upload, and defect rate standards — which many sellers struggle with at scale.',
  },
  {
    icon: '9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Promoted Listings Strategy Missing',
    desc: 'eBay Promoted Listings Standard is one of the most cost-effective ways to increase visibility on the platform, yet most sellers either do not use it or run flat-rate campaigns that waste budget on already-ranking items and ignore underperforming SKUs.',
  },
  {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
    title: 'International Selling Complexity',
    desc: 'The eBay Global Shipping Program and cross-border fees confuse most sellers. Without a clear international strategy, brands miss significant revenue from UK, AU, DE, and CA buyers who are actively searching for products they cannot source locally.',
  },
];

const services = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'eBay Store Setup & Management',
    desc: 'Store subscription management, custom category creation, store branding (banner, logo, featured listings), and store SEO — building a professional eBay storefront that drives repeat buyer visits.',
  },
  {
    icon: '21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Listing Optimisation (Cassini SEO)',
    desc: "Keyword-optimised titles using Cassini ranking factors, complete item specifics for every listing, HTML description formatting, and category selection — building listings that rank and convert.",
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Promoted Listings Management',
    desc: 'Promoted Listings Standard and Advanced campaign management — identifying the right ad rate, targeting high-margin and underperforming SKUs, and optimising campaigns for maximum sales velocity.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Top Rated Seller Status Strategy',
    desc: 'Systematic TRS maintenance covering shipping time compliance, tracking upload rate, defect rate monitoring, return resolution speed, and feedback management to protect and maintain TRS status.',
  },
  {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
    title: 'Global Shipping Program Setup & International Expansion',
    desc: 'GSP enablement for your entire catalogue, international listing setup, cross-border fee analysis, and a country-by-country expansion strategy to unlock revenue from global eBay markets.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'eBay SEO & Competitor Research (Terapeak)',
    desc: 'In-depth Terapeak analysis to identify high-demand product opportunities, seasonal trends, optimal pricing, and competitor positioning — driving data-backed decisions for your eBay catalogue.',
  },
  {
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    title: 'Feedback & Return Management',
    desc: 'Proactive feedback requests after every transaction, professional response to negative feedback, systematic return handling that protects defect rate, and seller performance score monitoring.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Monthly Analytics & Performance Reporting',
    desc: 'Monthly performance reports covering sales velocity by category, Promoted Listings performance, seller health metrics, Terapeak opportunity highlights, and a prioritised action plan for the next 30 days.',
  },
];

const results = [
  { metric: '2.9×', label: 'Average sales velocity improvement in first 6 months', sub: 'Across managed eBay seller accounts' },
  { metric: '94%', label: 'Of managed sellers achieve Top Rated Seller status', sub: 'Within 90 days of engagement start' },
  { metric: '38%', label: 'Average reduction in Promoted Listings cost per sale', sub: 'Through campaign structure and rate optimisation' },
];

const caseStudies = [
  {
    seller: 'US Vintage Clothing Seller',
    before: '$8K/mo, Below Standard',
    after: '$28K/mo, Top Rated Plus',
    time: '5 months',
    actions: ['Listing title and item specifics overhaul for Cassini', 'Return policy upgraded to free returns', 'Promoted Listings campaigns targeting 90% of catalogue'],
  },
  {
    seller: 'UK Auto Parts Seller',
    before: '$31K/mo, UK only',
    after: '$89K/mo, 12 countries',
    time: '7 months',
    actions: ['Global Shipping Program enabled for 3,200 listings', 'Terapeak analysis identified 420 new high-demand SKUs', 'eBay Motors Parts Compatibility data added to all listings'],
  },
];

const steps = [
  { title: 'eBay Account & Store Audit', desc: 'Full review of your eBay store structure, listing quality, seller health score, Promoted Listings performance, and Terapeak competitor analysis.' },
  { title: 'Cassini Keyword Research', desc: 'Platform-specific keyword research using eBay search data and Terapeak to identify the exact terms your buyers are searching for.' },
  { title: 'Listing & Store Optimisation', desc: 'Title rewrites, item specifics completion, HTML description formatting, store category restructuring, and image review across your catalogue.' },
  { title: 'Promoted Listings Setup', desc: 'Campaign creation, ad rate optimisation, SKU selection strategy, and Promoted Listings Advanced setup for your top-priority products.' },
  { title: 'Seller Health Monitoring', desc: 'Daily monitoring of defect rate, late shipment rate, return resolution time, and tracking upload compliance to protect TRS status.' },
  { title: 'Monthly Review', desc: 'Full monthly performance report with sales attribution, Promoted Listings ROI, seller health score, and a clear action plan for the next 30 days.' },
];

const stats = [
  { num: '182M', lbl: 'Active eBay buyers globally' },
  { num: 'Top Rated', lbl: 'Seller status for 94% of clients' },
  { num: '2.9×', lbl: 'avg sales velocity improvement' },
  { num: '15+ yrs', lbl: 'eBay marketplace expertise' },
];

const trust = ['Cassini SEO specialists', 'TRS status experts', 'No lock-in contracts', 'Dedicated account manager'];

export default function EbayAccountManagement() {
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue: 'Under $10K/mo', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Head>
        <title>eBay Account Management Services | Seller Optimisation Experts | 1Solutions</title>
        <meta name="description" content="Maximise eBay sales with 1Solutions. We manage your eBay store, listing optimisation, Promoted Listings, Top Rated Seller strategy, and Cassini SEO for sustainable growth." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1solutions.biz/ebay-account-management-services/" />
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
          .ebay-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(122,0,0,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(122,0,0,0.05) 100%);}
          .ebay-orb1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(122,0,0,0.10) 0%,transparent 70%);pointer-events:none;filter:blur(12px);}
          .ebay-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
          .ebay-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(122,0,0,0.09);border:1px solid rgba(122,0,0,0.20);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#7a0000;margin-bottom:24px;}
          .ebay-h1{font-size:clamp(2.2rem,4vw,3.6rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;color:#0A1628;}
          .ebay-h1-accent{background:linear-gradient(90deg,#7a0000 0%,#c41a1a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .ebay-desc{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:680px;}
          .ebay-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
          .ebay-btn-p{display:inline-flex;align-items:center;gap:8px;background:#7a0000;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(122,0,0,0.25);}
          .ebay-btn-p:hover{opacity:0.9;transform:translateY(-2px);}
          .ebay-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#7a0000;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(122,0,0,0.20);transition:all 0.25s;backdrop-filter:blur(8px);}
          .ebay-btn-s:hover{background:#fff;transform:translateY(-2px);}
          .ebay-trust{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px;}
          .ebay-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500;}
          .ebay-stats-bar{display:flex;border:1px solid rgba(122,0,0,0.10);border-radius:16px;background:rgba(255,255,255,0.80);backdrop-filter:blur(12px);overflow:hidden;max-width:680px;}
          .ebay-stat-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(122,0,0,0.08);}
          .ebay-stat-item:last-child{border-right:none;}
          .ebay-stat-num{font-size:1.9rem;font-weight:900;color:#7a0000;line-height:1;letter-spacing:-1px;}
          .ebay-stat-lbl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px;}
          .ebay-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px;}
          .ebay-bc-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280;}
          .ebay-bc a{color:#6b7280;text-decoration:none;}.ebay-bc a:hover{color:#7a0000;}
          .ebay-bc-sep{color:#d1d5db;}.ebay-bc-cur{color:#7a0000;font-weight:500;}
          .ebay-sec{padding:80px 40px;}
          .ebay-bg{background:#f8fafd;}
          .ebay-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#7a0000;margin-bottom:12px;}
          .ebay-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px;}
          .ebay-h2 span{background:linear-gradient(90deg,#7a0000,#c41a1a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .ebay-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px;}
          .ebay-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .ebay-grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;}
          .ebay-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .ebay-card{background:linear-gradient(135deg,rgba(122,0,0,0.06) 0%,rgba(255,255,255,0.90) 60%,rgba(122,0,0,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(122,0,0,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s;}
          .ebay-card:hover{transform:translateY(-6px);border-color:rgba(122,0,0,0.20);box-shadow:0 16px 48px rgba(122,0,0,0.12);}
          .ebay-icon{width:48px;height:48px;border-radius:14px;background:rgba(122,0,0,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .ebay-icon svg{width:22px;height:22px;color:#7a0000;}
          .ebay-card-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3;}
          .ebay-card-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .ebay-chal-card{background:#fff;border:1px solid #f0f0f0;border-radius:20px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,0.05);}
          .ebay-chal-icon{width:48px;height:48px;border-radius:14px;background:rgba(122,0,0,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
          .ebay-chal-icon svg{width:22px;height:22px;color:#7a0000;}
          .ebay-chal-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .ebay-chal-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .ebay-results{background:linear-gradient(135deg,#320000 0%,#7a0000 100%);padding:64px 40px;}
          .ebay-results-inner{max-width:1200px;margin:0 auto;}
          .ebay-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:12px;text-align:center;}
          .ebay-res-h{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2;}
          .ebay-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .ebay-res-card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:20px;padding:36px 28px;text-align:center;}
          .ebay-res-metric{font-size:3.2rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px;color:#fff;}
          .ebay-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
          .ebay-res-sub{font-size:12.5px;color:rgba(255,255,255,0.50);}
          .ebay-cs-card{background:#fff;border:1px solid #e5e7eb;border-radius:20px;padding:32px;box-shadow:0 4px 16px rgba(0,0,0,0.06);}
          .ebay-cs-badge{display:inline-block;background:rgba(122,0,0,0.10);color:#7a0000;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 12px;border-radius:50px;margin-bottom:12px;}
          .ebay-cs-seller{font-size:1.1rem;font-weight:700;color:#0A1628;margin-bottom:20px;}
          .ebay-cs-metrics{display:flex;align-items:center;gap:16px;margin-bottom:20px;flex-wrap:wrap;}
          .ebay-cs-metric{display:flex;flex-direction:column;gap:4px;}
          .ebay-cs-label{font-size:11px;color:#9ca3af;font-weight:500;}
          .ebay-cs-val{font-size:1rem;font-weight:700;color:#0A1628;}
          .ebay-cs-before{color:#ef4444;}
          .ebay-cs-after{color:#16a34a;}
          .ebay-cs-arrow{font-size:1.5rem;color:#d1d5db;}
          .ebay-cs-actions{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;}
          .ebay-cs-actions li{font-size:13.5px;color:#4b5563;padding-left:20px;position:relative;}
          .ebay-cs-actions li::before{content:"✓";position:absolute;left:0;color:#7a0000;font-weight:700;}
          .ebay-proc-num{font-size:3rem;font-weight:900;color:rgba(122,0,0,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .ebay-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#7a0000,rgba(122,0,0,0.3));border-radius:2px;margin-bottom:16px;}
          .ebay-proc-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .ebay-proc-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .ebay-contact-sec{padding:80px 40px;background:#f8fafd;}
          .ebay-contact-inner{max-width:1200px;margin:0 auto;}
          .ebay-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:56px;align-items:start;}
          .ebay-contact-info-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:900;color:#0A1628;margin:0 0 16px;line-height:1.25;}
          .ebay-contact-info-h span{background:linear-gradient(90deg,#7a0000,#c41a1a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .ebay-contact-info-p{font-size:1rem;color:#4b5563;line-height:1.75;margin:0 0 32px;}
          .ebay-contact-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px;}
          .ebay-contact-item-icon{width:40px;height:40px;border-radius:12px;background:rgba(122,0,0,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .ebay-contact-item-icon svg{width:18px;height:18px;color:#7a0000;}
          .ebay-contact-item-text strong{display:block;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
          .ebay-contact-item-text a,.ebay-contact-item-text span{font-size:13.5px;color:#4b5563;text-decoration:none;}
          .ebay-form-wrap{background:#fff;border-radius:24px;padding:40px;box-shadow:0 4px 32px rgba(0,0,0,0.08);}
          .ebay-field{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
          .ebay-field label{font-size:13px;font-weight:600;color:#374151;}
          .ebay-field input,.ebay-field select,.ebay-field textarea{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:border-color 0.2s;background:#fff;}
          .ebay-field input:focus,.ebay-field select:focus,.ebay-field textarea:focus{border-color:#7a0000;}
          .ebay-field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
          .ebay-sent{text-align:center;padding:48px 24px;}
          .ebay-sent-icon{width:64px;height:64px;border-radius:50%;background:#7a0000;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .ebay-sent-icon svg{width:28px;height:28px;color:#fff;}
          .ebay-sent h3{font-size:1.5rem;font-weight:800;color:#0A1628;margin:0 0 10px;}
          .ebay-sent p{color:#4b5563;font-size:1rem;line-height:1.7;margin:0;}
          .ebay-submit-btn{width:100%;padding:14px;background:#7a0000;color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s;}
          .ebay-submit-btn:hover{opacity:0.88;}
          .ebay-cta{background:#7a0000;padding:72px 40px;text-align:center;}
          .ebay-cta h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.2;}
          .ebay-cta p{font-size:1rem;color:rgba(255,255,255,0.80);margin:0 0 32px;}
          .ebay-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#7a0000;padding:14px 32px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
          .ebay-cta-btn:hover{transform:translateY(-2px);opacity:0.95;}
          @media(max-width:900px){.ebay-grid3,.ebay-grid4{grid-template-columns:1fr 1fr;}.ebay-grid2{grid-template-columns:1fr;}.ebay-contact-grid{grid-template-columns:1fr;}.ebay-res-grid{grid-template-columns:1fr 1fr;}}
          @media(max-width:600px){.ebay-hero,.ebay-sec,.ebay-results,.ebay-cta,.ebay-contact-sec{padding-left:20px;padding-right:20px;}.ebay-hero{padding-top:60px;padding-bottom:50px;}.ebay-grid3,.ebay-grid4,.ebay-grid2,.ebay-res-grid{grid-template-columns:1fr;}.ebay-bc{padding:12px 20px;}.ebay-field-row{grid-template-columns:1fr;}.ebay-form-wrap{padding:24px 20px;}}
        `}</style>
      </Head>

      {/* Breadcrumb */}
      <nav className="ebay-bc">
        <div className="ebay-bc-inner">
          <Link href="/">Home</Link>
          <span className="ebay-bc-sep">›</span>
          <Link href="/services">Services</Link>
          <span className="ebay-bc-sep">›</span>
          <span className="ebay-bc-cur">eBay Account Management Services</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="ebay-hero">
        <div className="ebay-orb1" />
        <div className="ebay-inner">
          <div className="ebay-eyebrow">eBay Seller Management</div>
          <h1 className="ebay-h1">
            eBay Account Management That <span className="ebay-h1-accent">Maximises Sales Velocity</span> and Seller Status
          </h1>
          <p className="ebay-desc">
            eBay's Cassini algorithm rewards sellers who optimise listing quality, fulfilment speed, and return policy. 1Solutions manages your entire eBay seller presence — from store structure to promoted listings — to drive consistent monthly growth.
          </p>
          <div className="ebay-trust">
            {trust.map((t, i) => (
              <span key={i} className="ebay-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="ebay-btns">
            <Link href="#contact" className="ebay-btn-p">Get Free eBay Store Audit</Link>
            <Link href="#services" className="ebay-btn-s">See What We Manage</Link>
          </div>
          <div className="ebay-stats-bar">
            {stats.map((s, i) => (
              <div key={i} className="ebay-stat-item">
                <span className="ebay-stat-num">{s.num}</span>
                <span className="ebay-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="ebay-sec ebay-bg">
        <div className="ebay-inner">
          <span className="ebay-tag">Common eBay Seller Struggles</span>
          <h2 className="ebay-h2">Why eBay Sellers <span>Struggle to Scale</span></h2>
          <p className="ebay-lead">eBay is one of the world's largest marketplaces — but Cassini's ranking factors, TRS requirements, and Promoted Listings mechanics trip up most sellers trying to grow beyond a certain level.</p>
          <div className="ebay-grid4">
            {challenges.map((c, i) => (
              <div key={i} className="ebay-chal-card">
                <div className="ebay-chal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon}/></svg>
                </div>
                <h3 className="ebay-chal-h">{c.title}</h3>
                <p className="ebay-chal-p">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="ebay-sec" id="services">
        <div className="ebay-inner">
          <span className="ebay-tag">Full-Service eBay Management</span>
          <h2 className="ebay-h2">What Our <span>eBay Management</span> Covers</h2>
          <p className="ebay-lead">From Cassini-optimised listing creation to Promoted Listings management and global expansion — we handle every lever that drives eBay revenue growth.</p>
          <div className="ebay-grid4">
            {services.map((s, i) => (
              <div key={i} className="ebay-card">
                <div className="ebay-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                </div>
                <h3 className="ebay-card-h">{s.title}</h3>
                <p className="ebay-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Band */}
      <section className="ebay-results">
        <div className="ebay-results-inner">
          <span className="ebay-res-tag">Proven Results</span>
          <h2 className="ebay-res-h">Real Numbers From Real eBay Sellers</h2>
          <div className="ebay-res-grid">
            {results.map((r, i) => (
              <div key={i} className="ebay-res-card">
                <div className="ebay-res-metric">{r.metric}</div>
                <div className="ebay-res-label">{r.label}</div>
                <div className="ebay-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="ebay-sec ebay-bg">
        <div className="ebay-inner">
          <span className="ebay-tag">Case Studies</span>
          <h2 className="ebay-h2">eBay Sellers <span>We Have Grown</span></h2>
          <p className="ebay-lead">Real results from sellers who trusted 1Solutions to optimise and scale their eBay presence.</p>
          <div className="ebay-grid2">
            {caseStudies.map((cs, i) => (
              <div key={i} className="ebay-cs-card">
                <div className="ebay-cs-badge">eBay</div>
                <div className="ebay-cs-seller">{cs.seller}</div>
                <div className="ebay-cs-metrics">
                  <div className="ebay-cs-metric">
                    <span className="ebay-cs-label">Before</span>
                    <span className="ebay-cs-val ebay-cs-before">{cs.before}</span>
                  </div>
                  <div className="ebay-cs-arrow">→</div>
                  <div className="ebay-cs-metric">
                    <span className="ebay-cs-label">After</span>
                    <span className="ebay-cs-val ebay-cs-after">{cs.after}</span>
                  </div>
                  <div className="ebay-cs-metric">
                    <span className="ebay-cs-label">Timeline</span>
                    <span className="ebay-cs-val">{cs.time}</span>
                  </div>
                </div>
                <ul className="ebay-cs-actions">
                  {cs.actions.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="ebay-sec">
        <div className="ebay-inner">
          <span className="ebay-tag">Our Process</span>
          <h2 className="ebay-h2">How We <span>Manage Your eBay Account</span></h2>
          <p className="ebay-lead">A structured six-step process that takes you from store audit to Top Rated Seller status and consistent monthly growth.</p>
          <div className="ebay-grid3">
            {steps.map((s, i) => (
              <div key={i} className="ebay-card">
                <div className="ebay-proc-num">0{i + 1}</div>
                <div className="ebay-proc-line" />
                <h3 className="ebay-proc-h">{s.title}</h3>
                <p className="ebay-proc-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="ebay-contact-sec" id="contact">
        <div className="ebay-contact-inner">
          <div className="ebay-contact-grid">
            <div>
              <h2 className="ebay-contact-info-h">Get a Free <span>eBay Store Audit</span></h2>
              <p className="ebay-contact-info-p">We will review your eBay store structure, listing quality, seller health metrics, and Promoted Listings performance — and show you exactly where you are leaving money on the table.</p>
              <div className="ebay-contact-item">
                <div className="ebay-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="ebay-contact-item-text">
                  <strong>Email</strong>
                  <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>
                </div>
              </div>
              <div className="ebay-contact-item">
                <div className="ebay-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>
                </div>
                <div className="ebay-contact-item-text">
                  <strong>WhatsApp</strong>
                  <a href="tel:+18881SOLUTIONS">+1 (888) 1SOLUTIONS</a>
                </div>
              </div>
              <div className="ebay-contact-item">
                <div className="ebay-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="ebay-contact-item-text">
                  <strong>Response Time</strong>
                  <span>Within 24 hours</span>
                </div>
              </div>
            </div>
            <div className="ebay-form-wrap">
              {sent ? (
                <div className="ebay-sent">
                  <div className="ebay-sent-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3>Audit Request Received</h3>
                  <p>Thank you! Our eBay management specialists will prepare your free store audit and be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="ebay-field-row">
                    <div className="ebay-field">
                      <label>Your Name *</label>
                      <input required type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="ebay-field">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="jane@store.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="ebay-field">
                    <label>Company / Store Name</label>
                    <input type="text" placeholder="Your eBay Store Name" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                  </div>
                  <div className="ebay-field">
                    <label>Monthly Revenue</label>
                    <select value={form.revenue} onChange={e => setForm({...form, revenue: e.target.value})}>
                      <option>Under $10K/mo</option>
                      <option>$10K–$50K/mo</option>
                      <option>$50K–$200K/mo</option>
                      <option>$200K+/mo</option>
                    </select>
                  </div>
                  <div className="ebay-field">
                    <label>Tell Us About Your eBay Store</label>
                    <textarea rows={4} placeholder="What categories do you sell in? What is your current seller status? What are your biggest challenges?" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button type="submit" className="ebay-submit-btn">Request Free eBay Store Audit →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ebay-cta">
        <div className="ebay-inner">
          <h2>Ready to Grow Your eBay Sales?</h2>
          <p>Join sellers across the US and UK who trust 1Solutions to manage, optimise, and scale their eBay presence month after month.</p>
          <Link href="#contact" className="ebay-cta-btn">Get Your Free Store Audit →</Link>
        </div>
      </section>
    </>
  );
}
