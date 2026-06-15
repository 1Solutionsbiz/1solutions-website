import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const challenges = [
  {
    icon: '21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Etsy SEO Is Tag-Based, Not Google SEO',
    desc: "Etsy's Aleph algorithm uses listing tags, titles, and attributes very differently from Google. A listing titled \"Beautiful Blue Handmade Necklace\" performs far worse than one built around actual search queries. Most sellers do not understand how to reverse-engineer Etsy search intent.",
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Star Seller Requirements Hard to Maintain at Scale',
    desc: "Etsy's Star Seller badge requires a 95% message response rate within 24 hours, 95% on-time shipping, and a 4.8+ average review rating — all simultaneously and consistently across a rolling 3-month window. This is difficult for growing shops to maintain without systems.",
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Etsy Ads Without a Strategy Drain Budget',
    desc: 'Etsy Ads auto-promote all listings equally by default, wasting budget on low-converting items while high-margin products get insufficient exposure. Without a structured campaign approach, most sellers see negative ROI from their ad spend.',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Holiday Peak Preparation Missed',
    desc: 'The November-December holiday season drives 30-40% of annual Etsy revenue for most sellers. Without inventory preparation, seasonal listing updates, Etsy Ads ramp-up, and holiday-specific product promotion, sellers consistently underperform during their biggest opportunity of the year.',
  },
];

const services = [
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Etsy Shop Audit & Optimisation Strategy',
    desc: 'Comprehensive review of your Etsy shop covering listing quality, tag usage, Star Seller metrics, Etsy Ads performance, shop branding, and conversion rate — producing a clear prioritised action plan.',
  },
  {
    icon: '21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Listing SEO Optimisation',
    desc: "Full listing optimisation using Etsy's Aleph algorithm: keyword-researched titles, all 13 tags filled with high-search-volume terms, attribute completion, and listing descriptions that convert browsers into buyers.",
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Etsy Ads Management & Budget Optimisation',
    desc: 'Strategic Etsy Ads management — identifying your top-converting listings, concentrating budget on high-margin items, pausing low-ROI listings, and scaling spend during peak shopping periods.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Star Seller Status Strategy & Maintenance',
    desc: 'Systems and processes to maintain Star Seller badge — auto-reply setup for 24-hour message response, dispatch workflow optimisation for on-time shipping, and review generation strategy.',
  },
  {
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    title: 'Shop Branding & Section Organisation',
    desc: 'Shop banner design consultation, about section copywriting, shop section restructuring around buyer intent, and featured listing curation — creating a cohesive brand experience that drives repeat purchases.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Review Generation & Customer Experience Strategy',
    desc: 'Post-purchase messaging sequences, packaging insert strategy, and review encouragement workflows that build your shop rating above 4.8 and drive the social proof that converts new visitors.',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Seasonal Campaign Planning',
    desc: 'Comprehensive seasonal planning for the holiday season, Q1 gifting events (Valentine\'s Day, Mother\'s Day), and other high-traffic Etsy shopping moments — including listing updates, Etsy Ads ramp-up, and new product planning.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Etsy Analytics & Shop Stats Reporting',
    desc: 'Monthly shop analytics review covering listing views, click-through rate, conversion rate, revenue by listing, Etsy Ads spend and return, and Star Seller metric tracking — with a clear action plan each month.',
  },
];

const results = [
  { metric: '3.4×', label: 'Average shop revenue growth in 6 months', sub: 'Across all managed Etsy shops' },
  { metric: '89%', label: 'Of clients achieve the Star Seller badge', sub: 'Within 90 days of systems implementation' },
  { metric: '52%', label: 'Average improvement in listing conversion rate', sub: 'After tag and title optimisation sprint' },
];

const caseStudies = [
  {
    seller: 'UK Handmade Jewellery Maker',
    before: '$2.1K/mo, 2.1% conversion',
    after: '$9.8K/mo, 5.6% conversion',
    time: '5 months',
    actions: ['All 240 listings re-tagged using Etsy keyword research tool', 'Shop sections reorganised around buyer intent', 'Etsy Ads focused on top 40 converting listings only'],
  },
  {
    seller: 'US Digital Print Shop',
    before: '$4.5K/mo, no Star Seller',
    after: '$18K/mo, Star Seller badge',
    time: '4 months',
    actions: ['Auto-reply system for 24-hour message response compliance', 'Dispatch process rebuilt to achieve 98% on-time rate', 'Seasonal product expansion for Q4 holidays added 62 new listings'],
  },
];

const steps = [
  { title: 'Etsy Shop Audit', desc: 'Full review of your shop stats, listing conversion rates, tag usage, Star Seller metrics, Etsy Ads performance, and competitive positioning in your category.' },
  { title: 'Keyword & Tag Research', desc: 'Platform-specific keyword research using Etsy search data to identify the exact search queries your ideal buyers are using — across all product categories.' },
  { title: 'Listing Optimisation Sprint', desc: 'Systematic overhaul of titles, all 13 tags, attributes, and descriptions across your catalogue — prioritised by revenue impact and conversion potential.' },
  { title: 'Etsy Ads Setup', desc: 'Strategic ad campaign setup with listing selection, daily budget recommendation, and performance tracking to maximise return on your Etsy Ads spend.' },
  { title: 'Star Seller Systems', desc: 'Implementation of auto-reply templates, dispatch workflow improvements, and review generation processes to achieve and maintain Star Seller status.' },
  { title: 'Monthly Analytics Review', desc: 'Monthly performance review covering revenue by listing, conversion rate trends, Etsy Ads ROI, Star Seller metrics, and a clear action plan for the next 30 days.' },
];

const stats = [
  { num: '96M', lbl: 'Active Etsy buyers globally' },
  { num: 'Star Seller', lbl: 'status achieved for 89% of clients' },
  { num: '3.4×', lbl: 'avg shop revenue growth' },
  { num: '$13.2B', lbl: 'Etsy GMS (2024)' },
];

const trust = ['Etsy SEO specialists', 'Star Seller strategy experts', 'No lock-in contracts', 'Dedicated account manager'];

const FAQS = [
  { q: 'How is Etsy SEO different from Google SEO?', a: "Etsy's Aleph algorithm uses listing tags, titles, and attributes as its primary ranking signals — very different from Google's link-based authority model. On Etsy, the right 13 tags and a keyword-rich title can move a listing from page 10 to page 1 within weeks. Etsy SEO is highly tag-specific, buyer-intent driven, and changes seasonally, requiring ongoing optimisation rather than a one-time fix." },
  { q: 'What exactly does Star Seller status require?', a: 'Star Seller requires three metrics to all be met simultaneously over a rolling 3-month window: a message response rate of 95 percent or higher (first message responded to within 24 hours), an on-time shipping and tracking rate of 95 percent or higher, and an average review rating of 4.8 stars or above. All three must be maintained consistently — failing any single metric removes the badge.' },
  { q: 'How much should I spend on Etsy Ads and how do I know if they are working?', a: 'We typically recommend starting Etsy Ads at $3 to $5 per day per shop and scaling based on ROAS (Return on Ad Spend). Etsy Ads work best when focused on your highest-converting listings rather than promoting your full catalogue. We monitor revenue per click, listing conversion rate, and ROAS weekly, and shift budget toward listings that demonstrate positive ad profitability.' },
  { q: 'Can you help with both physical handmade product shops and digital download shops?', a: 'Yes. Physical product and digital download shops require very different strategies on Etsy. Physical shops focus on photography quality, shipping speed for Star Seller, and seasonal inventory planning. Digital shops focus on thumbnail design for click-through, instant delivery, and volume-based keyword coverage across a large catalogue of variations. We tailor our approach to your specific shop type.' },
  { q: 'How long does it take to improve Etsy search ranking after optimisation?', a: "Etsy's algorithm typically takes 4 to 8 weeks to fully index and re-rank optimised listings. You will usually see click-through rate improvements within 2 to 3 weeks as better titles attract more relevant search impressions. Full ranking improvement — including conversion rate data feeding back into Etsy's ranking — typically stabilises at the 8 to 12 week mark." },
  { q: 'Do you manage Etsy shop sections, collections, and seasonal planning?', a: 'Yes. Shop section organisation is an underrated ranking factor on Etsy — well-organised sections improve the buyer experience and help Etsy understand your shop taxonomy, which feeds into category and collection page ranking. We also plan seasonal content calendars so your shop is ready with holiday-specific listings, photography, and Etsy Ads budgets 6 to 8 weeks before peak seasons.' },
];

export default function EtsyAccountManagement() {
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
        <title>Etsy Shop Management Services | Etsy SEO & Ads Experts | 1Solutions</title>
        <meta name="description" content="Grow your Etsy shop with 1Solutions. We optimise listings with Etsy SEO tags, manage Etsy Ads, pursue Star Seller status, and build your shop into a consistent revenue channel." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1solutions.biz/etsy-account-management-services/" />
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
          .etsy-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(120,50,0,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(120,50,0,0.05) 100%);}
          .etsy-orb1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(120,50,0,0.10) 0%,transparent 70%);pointer-events:none;filter:blur(12px);}
          .etsy-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
          .etsy-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(120,50,0,0.09);border:1px solid rgba(120,50,0,0.20);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#783200;margin-bottom:24px;}
          .etsy-h1{font-size:clamp(2.2rem,4vw,3.6rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;color:#0A1628;}
          .etsy-h1-accent{background:linear-gradient(90deg,#783200 0%,#c85a00 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .etsy-desc{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:680px;}
          .etsy-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
          .etsy-btn-p{display:inline-flex;align-items:center;gap:8px;background:#783200;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(120,50,0,0.25);}
          .etsy-btn-p:hover{opacity:0.9;transform:translateY(-2px);}
          .etsy-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#783200;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(120,50,0,0.20);transition:all 0.25s;backdrop-filter:blur(8px);}
          .etsy-btn-s:hover{background:#fff;transform:translateY(-2px);}
          .etsy-trust{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px;}
          .etsy-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500;}
          .etsy-stats-bar{display:flex;border:1px solid rgba(120,50,0,0.10);border-radius:16px;background:rgba(255,255,255,0.80);backdrop-filter:blur(12px);overflow:hidden;max-width:680px;}
          .etsy-stat-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(120,50,0,0.08);}
          .etsy-stat-item:last-child{border-right:none;}
          .etsy-stat-num{font-size:1.9rem;font-weight:900;color:#783200;line-height:1;letter-spacing:-1px;}
          .etsy-stat-lbl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px;}
          .etsy-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px;}
          .etsy-bc-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280;}
          .etsy-bc a{color:#6b7280;text-decoration:none;}.etsy-bc a:hover{color:#783200;}
          .etsy-bc-sep{color:#d1d5db;}.etsy-bc-cur{color:#783200;font-weight:500;}
          .etsy-sec{padding:80px 40px;}
          .etsy-bg{background:#f8fafd;}
          .etsy-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#783200;margin-bottom:12px;}
          .etsy-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px;}
          .etsy-h2 span{background:linear-gradient(90deg,#783200,#c85a00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .etsy-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px;}
          .etsy-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .etsy-grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;}
          .etsy-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .etsy-card{background:linear-gradient(135deg,rgba(120,50,0,0.06) 0%,rgba(255,255,255,0.90) 60%,rgba(120,50,0,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(120,50,0,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s;}
          .etsy-card:hover{transform:translateY(-6px);border-color:rgba(120,50,0,0.20);box-shadow:0 16px 48px rgba(120,50,0,0.12);}
          .etsy-icon{width:48px;height:48px;border-radius:14px;background:rgba(120,50,0,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .etsy-icon svg{width:22px;height:22px;color:#783200;}
          .etsy-card-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3;}
          .etsy-card-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .etsy-chal-card{background:#fff;border:1px solid #f0f0f0;border-radius:20px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,0.05);}
          .etsy-chal-icon{width:48px;height:48px;border-radius:14px;background:rgba(120,50,0,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
          .etsy-chal-icon svg{width:22px;height:22px;color:#783200;}
          .etsy-chal-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .etsy-chal-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .etsy-results{background:linear-gradient(135deg,#301500 0%,#783200 100%);padding:64px 40px;}
          .etsy-results-inner{max-width:1200px;margin:0 auto;}
          .etsy-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:12px;text-align:center;}
          .etsy-res-h{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2;}
          .etsy-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .etsy-res-card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:20px;padding:36px 28px;text-align:center;}
          .etsy-res-metric{font-size:3.2rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px;color:#fff;}
          .etsy-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
          .etsy-res-sub{font-size:12.5px;color:rgba(255,255,255,0.50);}
          .etsy-cs-card{background:#fff;border:1px solid #e5e7eb;border-radius:20px;padding:32px;box-shadow:0 4px 16px rgba(0,0,0,0.06);}
          .etsy-cs-badge{display:inline-block;background:rgba(120,50,0,0.10);color:#783200;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 12px;border-radius:50px;margin-bottom:12px;}
          .etsy-cs-seller{font-size:1.1rem;font-weight:700;color:#0A1628;margin-bottom:20px;}
          .etsy-cs-metrics{display:flex;align-items:center;gap:16px;margin-bottom:20px;flex-wrap:wrap;}
          .etsy-cs-metric{display:flex;flex-direction:column;gap:4px;}
          .etsy-cs-label{font-size:11px;color:#9ca3af;font-weight:500;}
          .etsy-cs-val{font-size:1rem;font-weight:700;color:#0A1628;}
          .etsy-cs-before{color:#ef4444;}
          .etsy-cs-after{color:#16a34a;}
          .etsy-cs-arrow{font-size:1.5rem;color:#d1d5db;}
          .etsy-cs-actions{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;}
          .etsy-cs-actions li{font-size:13.5px;color:#4b5563;padding-left:20px;position:relative;}
          .etsy-cs-actions li::before{content:"✓";position:absolute;left:0;color:#783200;font-weight:700;}
          .etsy-proc-num{font-size:3rem;font-weight:900;color:rgba(120,50,0,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .etsy-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#783200,rgba(120,50,0,0.3));border-radius:2px;margin-bottom:16px;}
          .etsy-proc-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .etsy-proc-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .etsy-contact-sec{padding:80px 40px;background:#f8fafd;}
          .etsy-contact-inner{max-width:1200px;margin:0 auto;}
          .etsy-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:56px;align-items:start;}
          .etsy-contact-info-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:900;color:#0A1628;margin:0 0 16px;line-height:1.25;}
          .etsy-contact-info-h span{background:linear-gradient(90deg,#783200,#c85a00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .etsy-contact-info-p{font-size:1rem;color:#4b5563;line-height:1.75;margin:0 0 32px;}
          .etsy-contact-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px;}
          .etsy-contact-item-icon{width:40px;height:40px;border-radius:12px;background:rgba(120,50,0,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .etsy-contact-item-icon svg{width:18px;height:18px;color:#783200;}
          .etsy-contact-item-text strong{display:block;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
          .etsy-contact-item-text a,.etsy-contact-item-text span{font-size:13.5px;color:#4b5563;text-decoration:none;}
          .etsy-form-wrap{background:#fff;border-radius:24px;padding:40px;box-shadow:0 4px 32px rgba(0,0,0,0.08);}
          .etsy-field{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
          .etsy-field label{font-size:13px;font-weight:600;color:#374151;}
          .etsy-field input,.etsy-field select,.etsy-field textarea{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:border-color 0.2s;background:#fff;}
          .etsy-field input:focus,.etsy-field select:focus,.etsy-field textarea:focus{border-color:#783200;}
          .etsy-field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
          .etsy-sent{text-align:center;padding:48px 24px;}
          .etsy-sent-icon{width:64px;height:64px;border-radius:50%;background:#783200;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .etsy-sent-icon svg{width:28px;height:28px;color:#fff;}
          .etsy-sent h3{font-size:1.5rem;font-weight:800;color:#0A1628;margin:0 0 10px;}
          .etsy-sent p{color:#4b5563;font-size:1rem;line-height:1.7;margin:0;}
          .etsy-submit-btn{width:100%;padding:14px;background:#783200;color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s;}
          .etsy-submit-btn:hover{opacity:0.88;}
          .etsy-cta{background:#783200;padding:72px 40px;text-align:center;}
          .etsy-cta h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.2;}
          .etsy-cta p{font-size:1rem;color:rgba(255,255,255,0.80);margin:0 0 32px;}
          .etsy-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#783200;padding:14px 32px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
          .etsy-cta-btn:hover{transform:translateY(-2px);opacity:0.95;}
          @media(max-width:900px){.etsy-grid3,.etsy-grid4{grid-template-columns:1fr 1fr;}.etsy-grid2{grid-template-columns:1fr;}.etsy-contact-grid{grid-template-columns:1fr;}.etsy-res-grid{grid-template-columns:1fr 1fr;}}
          @media(max-width:600px){.etsy-hero,.etsy-sec,.etsy-results,.etsy-cta,.etsy-contact-sec{padding-left:20px;padding-right:20px;}.etsy-hero{padding-top:60px;padding-bottom:50px;}.etsy-grid3,.etsy-grid4,.etsy-grid2,.etsy-res-grid{grid-template-columns:1fr;}.etsy-bc{padding:12px 20px;}.etsy-field-row{grid-template-columns:1fr;}.etsy-form-wrap{padding:24px 20px;}}
          /* ── FAQ ── */
          .etsy-faq-sec { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(120,50,0,0.08); }
          .etsy-faq-h { font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#783200 0%,#c85a00 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 36px;line-height:1.15; }
          .etsy-faq-list { display:flex;flex-direction:column;gap:12px; }
          .etsy-faq-item { background:linear-gradient(135deg,rgba(120,50,0,0.06) 0%,rgba(255,255,255,0.85) 60%,rgba(120,50,0,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(120,50,0,0.07);transition:border-color 0.2s;position:relative; }
          .etsy-faq-item.open { border-color:rgba(120,50,0,0.30); }
          .etsy-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#783200;border-radius:3px 0 0 3px; }
          .etsy-faq-btn { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .etsy-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(120,50,0,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .etsy-faq-item.open .etsy-faq-q-badge { background:#783200;color:#fff; }
          .etsy-faq-btn span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .etsy-faq-item.open .etsy-faq-btn span { color:#783200; }
          .etsy-faq-chev { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .etsy-faq-item.open .etsy-faq-chev { transform:rotate(180deg);color:#783200; }
          .etsy-faq-ans-wrap { overflow:hidden;max-height:0;transition:max-height 0.35s ease; }
          .etsy-faq-item.open .etsy-faq-ans-wrap { max-height:500px; }
          .etsy-faq-ans { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .etsy-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#783200;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }
          /* ── Related Services ── */
          .etsy-rel-sec { background:rgba(120,50,0,0.04);border-top:1px solid rgba(120,50,0,0.08);padding:80px 40px; }
          .etsy-rel-inner { max-width:1200px;margin:0 auto;text-align:center; }
          .etsy-rel-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .etsy-rel-h { font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#783200 0%,#c85a00 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px;line-height:1.15; }
          .etsy-rel-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .etsy-rel-div { border:none;border-top:1px solid rgba(120,50,0,0.12);margin:40px 0; }
          .etsy-rel-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .etsy-rtag { display:inline-flex;align-items:center;padding:8px 16px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;border:1.5px solid;transition:all 0.2s; }
          .etsy-rtag:hover { transform:translateY(-2px); }
          .etsy-rtag-a { background:rgba(120,50,0,0.08);color:#783200;border-color:rgba(120,50,0,0.25); }
          .etsy-rtag-b { background:rgba(79,70,229,0.07);color:#4338ca;border-color:rgba(79,70,229,0.22); }
          .etsy-rtag-c { background:rgba(5,150,105,0.07);color:#047857;border-color:rgba(5,150,105,0.22); }
          .etsy-rtag-d { background:rgba(217,119,6,0.07);color:#b45309;border-color:rgba(217,119,6,0.22); }
          .etsy-rtag-e { background:rgba(219,39,119,0.07);color:#be185d;border-color:rgba(219,39,119,0.22); }
          .etsy-rtag-f { background:rgba(8,145,178,0.07);color:#0e7490;border-color:rgba(8,145,178,0.22); }
        `}</style>
      </Head>

      {/* Breadcrumb */}
      <nav className="etsy-bc">
        <div className="etsy-bc-inner">
          <Link href="/">Home</Link>
          <span className="etsy-bc-sep">›</span>
          <Link href="/services">Services</Link>
          <span className="etsy-bc-sep">›</span>
          <span className="etsy-bc-cur">Etsy Shop Management Services</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="etsy-hero">
        <div className="etsy-orb1" />
        <div className="etsy-inner">
          <div className="etsy-eyebrow">Etsy Seller Management</div>
          <h1 className="etsy-h1">
            Etsy Shop Management That Gets Your Products Found by <span className="etsy-h1-accent">Millions of Ready Buyers</span>
          </h1>
          <p className="etsy-desc">
            Etsy has 96 million active buyers searching for unique, handmade, and vintage products. 1Solutions optimises your Etsy shop for the platform's unique search algorithm, manages your Etsy Ads, and builds the shop credibility that drives repeat purchases.
          </p>
          <div className="etsy-trust">
            {trust.map((t, i) => (
              <span key={i} className="etsy-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#783200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="etsy-btns">
            <Link href="#contact" className="etsy-btn-p">Get Free Etsy Shop Review</Link>
            <Link href="#services" className="etsy-btn-s">See What We Manage</Link>
          </div>
          <div className="etsy-stats-bar">
            {stats.map((s, i) => (
              <div key={i} className="etsy-stat-item">
                <span className="etsy-stat-num">{s.num}</span>
                <span className="etsy-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="etsy-sec etsy-bg">
        <div className="etsy-inner">
          <span className="etsy-tag">Common Etsy Seller Struggles</span>
          <h2 className="etsy-h2">Why Etsy Shops <span>Struggle to Scale</span></h2>
          <p className="etsy-lead">Etsy's Aleph algorithm, Star Seller requirements, and Etsy Ads platform have unique mechanics that most sellers do not fully understand — leaving significant revenue on the table.</p>
          <div className="etsy-grid4">
            {challenges.map((c, i) => (
              <div key={i} className="etsy-chal-card">
                <div className="etsy-chal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon}/></svg>
                </div>
                <h3 className="etsy-chal-h">{c.title}</h3>
                <p className="etsy-chal-p">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="etsy-sec" id="services">
        <div className="etsy-inner">
          <span className="etsy-tag">Full-Service Etsy Management</span>
          <h2 className="etsy-h2">What Our <span>Etsy Management</span> Covers</h2>
          <p className="etsy-lead">From Aleph-optimised listing creation to Etsy Ads management and Star Seller maintenance — we handle every aspect of your Etsy shop growth.</p>
          <div className="etsy-grid4">
            {services.map((s, i) => (
              <div key={i} className="etsy-card">
                <div className="etsy-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                </div>
                <h3 className="etsy-card-h">{s.title}</h3>
                <p className="etsy-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Band */}
      <section className="etsy-results">
        <div className="etsy-results-inner">
          <span className="etsy-res-tag">Proven Results</span>
          <h2 className="etsy-res-h">Real Numbers From Real Etsy Shops</h2>
          <div className="etsy-res-grid">
            {results.map((r, i) => (
              <div key={i} className="etsy-res-card">
                <div className="etsy-res-metric">{r.metric}</div>
                <div className="etsy-res-label">{r.label}</div>
                <div className="etsy-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="etsy-sec etsy-bg">
        <div className="etsy-inner">
          <span className="etsy-tag">Case Studies</span>
          <h2 className="etsy-h2">Etsy Shops <span>We Have Grown</span></h2>
          <p className="etsy-lead">Real results from creative sellers who trusted 1Solutions to optimise and scale their Etsy presence.</p>
          <div className="etsy-grid2">
            {caseStudies.map((cs, i) => (
              <div key={i} className="etsy-cs-card">
                <div className="etsy-cs-badge">Etsy</div>
                <div className="etsy-cs-seller">{cs.seller}</div>
                <div className="etsy-cs-metrics">
                  <div className="etsy-cs-metric">
                    <span className="etsy-cs-label">Before</span>
                    <span className="etsy-cs-val etsy-cs-before">{cs.before}</span>
                  </div>
                  <div className="etsy-cs-arrow">→</div>
                  <div className="etsy-cs-metric">
                    <span className="etsy-cs-label">After</span>
                    <span className="etsy-cs-val etsy-cs-after">{cs.after}</span>
                  </div>
                  <div className="etsy-cs-metric">
                    <span className="etsy-cs-label">Timeline</span>
                    <span className="etsy-cs-val">{cs.time}</span>
                  </div>
                </div>
                <ul className="etsy-cs-actions">
                  {cs.actions.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="etsy-sec">
        <div className="etsy-inner">
          <span className="etsy-tag">Our Process</span>
          <h2 className="etsy-h2">How We <span>Manage Your Etsy Shop</span></h2>
          <p className="etsy-lead">A six-step process designed specifically for Etsy — from tag research to Star Seller systems and consistent monthly revenue growth.</p>
          <div className="etsy-grid3">
            {steps.map((s, i) => (
              <div key={i} className="etsy-card">
                <div className="etsy-proc-num">0{i + 1}</div>
                <div className="etsy-proc-line" />
                <h3 className="etsy-proc-h">{s.title}</h3>
                <p className="etsy-proc-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="etsy-contact-sec" id="contact">
        <div className="etsy-contact-inner">
          <div className="etsy-contact-grid">
            <div>
              <h2 className="etsy-contact-info-h">Get a Free <span>Etsy Shop Review</span></h2>
              <p className="etsy-contact-info-p">We will analyse your Etsy shop listings, tags, Star Seller metrics, and Etsy Ads performance — and show you a clear roadmap to double your monthly shop revenue.</p>
              <div className="etsy-contact-item">
                <div className="etsy-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="etsy-contact-item-text">
                  <strong>Email</strong>
                  <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>
                </div>
              </div>
              <div className="etsy-contact-item">
                <div className="etsy-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>
                </div>
                <div className="etsy-contact-item-text">
                  <strong>WhatsApp</strong>
                  <a href="tel:+18881SOLUTIONS">+1 (888) 1SOLUTIONS</a>
                </div>
              </div>
              <div className="etsy-contact-item">
                <div className="etsy-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="etsy-contact-item-text">
                  <strong>Response Time</strong>
                  <span>Within 24 hours</span>
                </div>
              </div>
            </div>
            <div className="etsy-form-wrap">
              {sent ? (
                <div className="etsy-sent">
                  <div className="etsy-sent-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3>Shop Review Request Received</h3>
                  <p>Thank you! Our Etsy management specialists will prepare your free shop review and be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="etsy-field-row">
                    <div className="etsy-field">
                      <label>Your Name *</label>
                      <input required type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="etsy-field">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="jane@shop.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="etsy-field">
                    <label>Etsy Shop Name</label>
                    <input type="text" placeholder="YourEtsyShopName" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                  </div>
                  <div className="etsy-field">
                    <label>Monthly Revenue</label>
                    <select value={form.revenue} onChange={e => setForm({...form, revenue: e.target.value})}>
                      <option>Under $10K/mo</option>
                      <option>$10K–$50K/mo</option>
                      <option>$50K–$200K/mo</option>
                      <option>$200K+/mo</option>
                    </select>
                  </div>
                  <div className="etsy-field">
                    <label>Tell Us About Your Etsy Shop</label>
                    <textarea rows={4} placeholder="What do you sell? How many listings do you have? What are your biggest challenges?" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button type="submit" className="etsy-submit-btn">Request Free Etsy Shop Review →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="etsy-faq-sec" id="faq">
        <div className="etsy-inner">
          <h2 className="etsy-faq-h">Frequently Asked Questions</h2>
          <div className="etsy-faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={'etsy-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="etsy-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="etsy-faq-q-badge">Q</div>
                  <span>{faq.q}</span>
                  <svg className="etsy-faq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div className="etsy-faq-ans-wrap">
                  <div className="etsy-faq-ans"><span className="etsy-faq-a-badge">A</span>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="etsy-rel-sec">
        <div className="etsy-rel-inner">
          <span className="etsy-rel-eyebrow">PLATFORM RELATED OFFERINGS</span>
          <h2 className="etsy-rel-h">Explore Related Services and Technologies</h2>
          <p className="etsy-rel-sub">Pair our Etsy shop management expertise with services that help your handmade brand grow beyond the platform.</p>
          <hr className="etsy-rel-div" />
          <div className="etsy-rel-tags">
            <Link href="/amazon-account-management-services/" className="etsy-rtag etsy-rtag-a">Amazon Management</Link>
            <Link href="/walmart-account-management-services/" className="etsy-rtag etsy-rtag-b">Walmart Marketplace</Link>
            <Link href="/ebay-account-management-services/" className="etsy-rtag etsy-rtag-c">eBay Management</Link>
            <Link href="/ecommerce-seo-services/" className="etsy-rtag etsy-rtag-d">eCommerce SEO</Link>
            <Link href="/social-media-marketing-services/" className="etsy-rtag etsy-rtag-e">Social Commerce</Link>
            <Link href="/email-marketing-services/" className="etsy-rtag etsy-rtag-f">Email Automation</Link>
            <Link href="/woocommerce-development-company/" className="etsy-rtag etsy-rtag-a">WooCommerce Development</Link>
            <Link href="/google-shopping-management/" className="etsy-rtag etsy-rtag-b">Google Shopping Ads</Link>
            <Link href="/ecommerce-website-development-services/" className="etsy-rtag etsy-rtag-c">eCommerce Development</Link>
            <Link href="/magento-development-company/" className="etsy-rtag etsy-rtag-d">Magento Development</Link>
            <Link href="/wayfair-account-management-services/" className="etsy-rtag etsy-rtag-e">Wayfair Supplier</Link>
            <Link href="/flipkart-account-management-services/" className="etsy-rtag etsy-rtag-f">Flipkart Management</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="etsy-cta">
        <div className="etsy-inner">
          <h2>Ready to Grow Your Etsy Shop Revenue?</h2>
          <p>Join creative sellers across the UK and US who trust 1Solutions to optimise, manage, and scale their Etsy shops to consistent monthly revenue.</p>
          <Link href="#contact" className="etsy-cta-btn">Get Your Free Shop Review →</Link>
        </div>
      </section>
    </>
  );
}
