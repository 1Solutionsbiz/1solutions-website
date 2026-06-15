import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#001e6e';
const ACCENT_MID = '#1a6bcd';
const ACCENT_RGB = '0, 30, 110';

const challenges = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'F-Assured Certification Is Critical But Complex',
    desc: "Flipkart's F-Assured badge (equivalent to Amazon Prime) is displayed on the search results page and significantly increases click-through and conversion rate. Achieving and maintaining F-Assured requires meeting strict quality, return, and fulfilment standards — standards that many sellers fail without a systematic approach.",
  },
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Flipkart Search Algorithm Differs From Amazon',
    desc: "Flipkart's search ranking weights product quality score, pricing competitiveness, seller performance metrics, and fulfilment speed. Sellers who copy their Amazon listing strategy without adapting to Flipkart's specific algorithm consistently underperform their potential.",
  },
  {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'Return Rate Management in India',
    desc: "India's return culture, particularly in fashion and electronics, creates significant return rate pressure. Flipkart penalises sellers with high return rates through reduced visibility. Most sellers do not audit why returns are happening or take proactive steps to reduce them through better product content.",
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Flipkart Ads Complexity',
    desc: "Flipkart Advertising includes Product Ads, Display Ads, and Flash Sales that are structurally different from Amazon Ads. Without platform-specific expertise, sellers either do not use ads at all or spend budget on campaigns without the targeting, negative keyword structure, or bid strategy needed for positive ROI.",
  },
];

const services = [
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'Flipkart Seller Hub Setup & Management',
    desc: 'Complete setup and ongoing management of your Flipkart Seller Hub account, including category approvals, seller ratings, and dashboard performance monitoring.',
  },
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Listing Optimisation (Flipkart SEO)',
    desc: 'Product quality score improvement, Flipkart-SEO title and description writing, attribute completeness, correct category mapping, and competitive keyword targeting.',
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'F-Assured Certification Strategy & Maintenance',
    desc: "Systematic improvement of the seller metrics required for F-Assured eligibility — fulfilment speed, return rate, quality compliance — and ongoing maintenance once the badge is achieved.",
  },
  {
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10',
    title: 'Flipkart Fulfillment by Flipkart (FBF) Setup',
    desc: 'FBF onboarding for eligible SKUs to unlock next-day and same-day delivery, F-Assured eligibility, and higher search ranking through faster fulfilment speed signals.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Flipkart Ads Management',
    desc: 'Product Ads, Display Ads, and Flash Sale participation managed with category keyword targeting, competitive bidding, negative keyword foundation, and weekly optimisation.',
  },
  {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'Return Rate Reduction & Quality Score Management',
    desc: 'Return reason auditing, product content corrections to reduce expectation-mismatch returns, sizing and specification accuracy review, and ongoing quality score tracking.',
  },
  {
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    title: 'Pricing Strategy & Competitor Monitoring',
    desc: "Competitive price monitoring across Flipkart's category landscape, repricing strategy to maintain search rank while protecting margin, and promotional pricing calendar for Big Billion Days and other Flipkart sale events.",
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Monthly Analytics & Seller Hub Performance Reporting',
    desc: 'GMV by SKU, quality score tracking, F-Assured status monitoring, return rate by category, ad ROI, and a monthly roadmap for catalogue expansion or SKU rationalisation.',
  },
];

const caseStudies = [
  {
    badge: 'Case Study',
    seller: 'Indian Electronics Brand',
    before: '$12K/mo, no F-Assured',
    after: '$52K/mo, F-Assured achieved',
    time: '6 months',
    actions: [
      'Listing quality score improved from 42 to 89 across 180 SKUs',
      'FBF onboarding reduced delivery time to next-day for top 60 SKUs',
      'Flipkart Product Ads restructured with category-specific bidding',
    ],
  },
  {
    badge: 'Case Study',
    seller: 'Fashion Apparel Brand',
    before: '$6K/mo, 18% return rate',
    after: '$28K/mo, 5.2% return rate',
    time: '5 months',
    actions: [
      'Return reason audit identified sizing chart errors as primary cause',
      'All 320 listings updated with Flipkart-standard size guides',
      'Product photography updated to show true colour and fabric texture',
    ],
  },
];

const steps = [
  { n: '01', title: 'Flipkart Account Audit', desc: 'Review current seller performance, listing quality scores, F-Assured eligibility status, and fulfilment capability.' },
  { n: '02', title: 'Strategy & Prioritisation', desc: '90-day roadmap focused on F-Assured eligibility, top-SKU listing optimisation, and ad account setup.' },
  { n: '03', title: 'Listing Optimisation Sprint', desc: 'All priority listings updated with Flipkart-SEO titles, correct attributes, competitive pricing, and quality images.' },
  { n: '04', title: 'FBF Onboarding', desc: 'Flipkart Fulfillment by Flipkart setup for eligible SKUs to unlock faster delivery speed and F-Assured eligibility.' },
  { n: '05', title: 'Flipkart Ads Launch', desc: 'Product Ad campaigns built with category keyword targeting, bid strategy, and negative keyword foundation.' },
  { n: '06', title: 'Monthly Review', desc: 'Performance report covering GMV, F-Assured status, return rate, keyword rankings, and ad ROI with next-month roadmap.' },
];

export default function FlipkartAccountManagement() {
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue: 'Under $10K/mo', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Head>
        <title>Flipkart Seller Account Management Services | 1Solutions</title>
        <meta name="description" content="Grow on Flipkart with 1Solutions. We manage Flipkart Seller Hub, listing optimisation, F-Assured certification, Flipkart Ads, Flipkart Fulfillment (FBF), and performance analytics." />
        <link rel="canonical" href="https://1solutions.biz/flipkart-account-management-services/" />
      </Head>

      <style>{`
        .flpk-page { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; }

        .flpk-breadcrumb { background: #f8f9fa; border-bottom: 1px solid #e9ecef; padding: 12px 0; }
        .flpk-breadcrumb-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 8px; font-size: 14px; }
        .flpk-breadcrumb a { color: ${ACCENT}; text-decoration: none; }
        .flpk-breadcrumb a:hover { text-decoration: underline; }
        .flpk-breadcrumb-sep { color: #adb5bd; }
        .flpk-breadcrumb-current { color: #6c757d; }

        .flpk-hero { background: linear-gradient(135deg, #000b2d 0%, #001e6e 60%, #0030a0 100%); color: #fff; padding: 80px 24px 72px; position: relative; overflow: hidden; }
        .flpk-hero-orb1 { position: absolute; top: -80px; right: -80px; width: 400px; height: 400px; background: rgba(${ACCENT_RGB}, 0.4); border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .flpk-hero-orb2 { position: absolute; bottom: -100px; left: -60px; width: 300px; height: 300px; background: rgba(26,107,205,0.25); border-radius: 50%; filter: blur(60px); pointer-events: none; }
        .flpk-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .flpk-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; padding: 6px 16px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px; }
        .flpk-eyebrow-dot { width: 6px; height: 6px; background: #fbbf24; border-radius: 50%; }
        .flpk-hero h1 { font-size: clamp(28px, 4vw, 52px); font-weight: 800; line-height: 1.15; max-width: 860px; margin: 0 0 24px; }
        .flpk-hero-desc { font-size: 18px; line-height: 1.7; max-width: 760px; opacity: 0.9; margin-bottom: 40px; }
        .flpk-stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.15); border-radius: 12px; overflow: hidden; margin-bottom: 40px; }
        .flpk-stat { background: rgba(255,255,255,0.08); padding: 20px 16px; text-align: center; }
        .flpk-stat-num { font-size: 28px; font-weight: 800; color: #fff; display: block; }
        .flpk-stat-label { font-size: 12px; opacity: 0.75; margin-top: 4px; display: block; }
        .flpk-hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 36px; }
        .flpk-btn-primary { background: #fff; color: ${ACCENT}; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: none; cursor: pointer; transition: transform 0.2s; }
        .flpk-btn-primary:hover { transform: translateY(-2px); }
        .flpk-btn-secondary { background: transparent; color: #fff; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: 2px solid rgba(255,255,255,0.4); cursor: pointer; transition: border-color 0.2s; }
        .flpk-btn-secondary:hover { border-color: #fff; }
        .flpk-trust-badges { display: flex; flex-wrap: wrap; gap: 12px; }
        .flpk-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 6px 12px; font-size: 13px; }
        .flpk-badge-check { color: #4ade80; font-size: 14px; }

        .flpk-challenges { padding: 80px 24px; background: #fff; }
        .flpk-section-inner { max-width: 1200px; margin: 0 auto; }
        .flpk-section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 12px; }
        .flpk-section-h2 { font-size: clamp(24px, 3vw, 40px); font-weight: 800; margin: 0 0 16px; line-height: 1.2; }
        .flpk-section-h2 span { background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .flpk-section-sub { font-size: 17px; color: #555; max-width: 700px; margin-bottom: 48px; line-height: 1.6; }
        .flpk-challenges-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .flpk-challenge-card { background: #f8f9fa; border-radius: 16px; padding: 28px 24px; border: 1px solid #e9ecef; }
        .flpk-challenge-icon { width: 48px; height: 48px; background: rgba(${ACCENT_RGB}, 0.07); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .flpk-challenge-icon svg { width: 24px; height: 24px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .flpk-challenge-title { font-size: 16px; font-weight: 700; margin: 0 0 10px; color: #1a1a2e; }
        .flpk-challenge-desc { font-size: 14px; color: #555; line-height: 1.6; margin: 0; }

        .flpk-services { padding: 80px 24px; background: linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%); }
        .flpk-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .flpk-service-card { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(${ACCENT_RGB}, 0.12); border-radius: 16px; padding: 28px 24px; transition: transform 0.2s, box-shadow 0.2s; }
        .flpk-service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(${ACCENT_RGB}, 0.12); }
        .flpk-service-icon { width: 48px; height: 48px; background: linear-gradient(135deg, rgba(${ACCENT_RGB}, 0.09) 0%, rgba(26,107,205,0.08) 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .flpk-service-icon svg { width: 24px; height: 24px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .flpk-service-title { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e; }
        .flpk-service-desc { font-size: 14px; color: #555; line-height: 1.6; margin: 0; }

        .flpk-results { padding: 64px 24px; background: linear-gradient(135deg, #000b2d 0%, #001e6e 100%); color: #fff; }
        .flpk-results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1200px; margin: 0 auto; text-align: center; }
        .flpk-result-num { font-size: 52px; font-weight: 900; line-height: 1; display: block; }
        .flpk-result-label { font-size: 16px; opacity: 0.8; margin-top: 8px; display: block; }

        .flpk-cases { padding: 80px 24px; background: #fff; }
        .flpk-cases-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .flpk-case-card { background: #fff; border: 1px solid #e9ecef; border-radius: 20px; padding: 36px 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .flpk-case-badge { display: inline-block; background: rgba(${ACCENT_RGB}, 0.07); color: ${ACCENT}; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
        .flpk-case-seller { font-size: 20px; font-weight: 800; margin: 0 0 20px; color: #1a1a2e; }
        .flpk-case-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .flpk-case-metric { background: #f8f9fa; border-radius: 10px; padding: 14px 16px; }
        .flpk-case-metric-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 4px; }
        .flpk-case-metric-val { font-size: 16px; font-weight: 700; color: #1a1a2e; }
        .flpk-case-metric-val.flpk-after { color: ${ACCENT}; }
        .flpk-case-time { font-size: 12px; color: #888; margin-bottom: 20px; font-weight: 600; }
        .flpk-case-actions { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .flpk-case-action { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #444; line-height: 1.5; }
        .flpk-case-action-dot { width: 6px; height: 6px; background: ${ACCENT}; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }

        .flpk-process { padding: 80px 24px; background: #fafafa; }
        .flpk-process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .flpk-step-card { background: #fff; border-radius: 16px; padding: 28px 24px; border: 1px solid #e9ecef; position: relative; overflow: hidden; }
        .flpk-step-num { position: absolute; top: 16px; right: 20px; font-size: 56px; font-weight: 900; color: rgba(${ACCENT_RGB}, 0.05); line-height: 1; pointer-events: none; }
        .flpk-step-badge { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: ${ACCENT}; color: #fff; border-radius: 10px; font-size: 14px; font-weight: 800; margin-bottom: 16px; }
        .flpk-step-title { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e; }
        .flpk-step-desc { font-size: 14px; color: #666; line-height: 1.6; margin: 0; }

        .flpk-contact { padding: 80px 24px; background: linear-gradient(180deg, #fff 0%, #f8f9fa 100%); }
        .flpk-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .flpk-contact-h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 800; margin: 0 0 16px; line-height: 1.25; }
        .flpk-contact-h2 span { background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .flpk-contact-desc { font-size: 16px; color: #555; line-height: 1.7; margin-bottom: 36px; }
        .flpk-contact-items { display: flex; flex-direction: column; gap: 16px; }
        .flpk-contact-item { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #333; }
        .flpk-contact-item svg { width: 20px; height: 20px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
        .flpk-form-card { background: #fff; border-radius: 20px; padding: 36px 32px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); border: 1px solid #e9ecef; }
        .flpk-form-group { margin-bottom: 20px; }
        .flpk-form-label { display: block; font-size: 13px; font-weight: 600; color: #444; margin-bottom: 6px; }
        .flpk-form-input, .flpk-form-select, .flpk-form-textarea { width: 100%; padding: 11px 14px; border: 1.5px solid #dde1e7; border-radius: 8px; font-size: 15px; color: #1a1a2e; background: #fff; box-sizing: border-box; transition: border-color 0.2s; font-family: inherit; }
        .flpk-form-input:focus, .flpk-form-select:focus, .flpk-form-textarea:focus { outline: none; border-color: ${ACCENT}; }
        .flpk-form-textarea { resize: vertical; min-height: 110px; }
        .flpk-form-submit { width: 100%; background: ${ACCENT}; color: #fff; border: none; border-radius: 8px; padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .flpk-form-submit:hover { opacity: 0.88; }
        .flpk-success { text-align: center; padding: 40px 20px; }
        .flpk-success-icon { font-size: 48px; margin-bottom: 16px; }
        .flpk-success-title { font-size: 22px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
        .flpk-success-text { font-size: 15px; color: #666; }

        .flpk-cta-strip { background: ${ACCENT}; color: #fff; padding: 64px 24px; text-align: center; }
        .flpk-cta-strip h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 800; margin: 0 0 12px; }
        .flpk-cta-strip p { font-size: 17px; opacity: 0.88; margin: 0 0 28px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .flpk-cta-strip-btn { background: #fff; color: ${ACCENT}; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-block; }
        .flpk-cta-strip-btn:hover { opacity: 0.9; }

        @media (max-width: 900px) {
          .flpk-challenges-grid { grid-template-columns: repeat(2, 1fr); }
          .flpk-services-grid { grid-template-columns: repeat(2, 1fr); }
          .flpk-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .flpk-contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .flpk-cases-grid { grid-template-columns: 1fr; }
          .flpk-results-grid { grid-template-columns: 1fr; gap: 24px; }
          .flpk-process-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .flpk-challenges-grid { grid-template-columns: 1fr; }
          .flpk-services-grid { grid-template-columns: 1fr; }
          .flpk-process-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="flpk-page">
        <nav className="flpk-breadcrumb">
          <div className="flpk-breadcrumb-inner">
            <Link href="/">Home</Link>
            <span className="flpk-breadcrumb-sep">›</span>
            <Link href="/marketplace-account-management">Marketplace Management</Link>
            <span className="flpk-breadcrumb-sep">›</span>
            <span className="flpk-breadcrumb-current">Flipkart Account Management</span>
          </div>
        </nav>

        <section className="flpk-hero">
          <div className="flpk-hero-orb1" />
          <div className="flpk-hero-orb2" />
          <div className="flpk-hero-inner">
            <div className="flpk-eyebrow">
              <span className="flpk-eyebrow-dot" />
              Flipkart Seller Management
            </div>
            <h1>Flipkart Account Management for India's #1 Marketplace</h1>
            <p className="flpk-hero-desc">
              Flipkart commands over 35% of India's eCommerce market with 400M+ registered users. 1Solutions manages your Flipkart Seller Hub account end-to-end — from listing optimisation and F-Assured certification to Flipkart Ads and Flipkart Fulfillment (FBF) — driving sustainable sales growth on India's most competitive marketplace.
            </p>
            <div className="flpk-stats-bar">
              <div className="flpk-stat"><span className="flpk-stat-num">400M+</span><span className="flpk-stat-label">Flipkart registered users</span></div>
              <div className="flpk-stat"><span className="flpk-stat-num">35%</span><span className="flpk-stat-label">India eCommerce market share</span></div>
              <div className="flpk-stat"><span className="flpk-stat-num">$23B+</span><span className="flpk-stat-label">Flipkart annual GMV</span></div>
              <div className="flpk-stat"><span className="flpk-stat-num">F-Assured</span><span className="flpk-stat-label">Achieved for 91% of clients</span></div>
            </div>
            <div className="flpk-hero-ctas">
              <Link href="#contact" className="flpk-btn-primary">Get a Free Flipkart Audit →</Link>
              <Link href="#services" className="flpk-btn-secondary">Explore Services</Link>
            </div>
            <div className="flpk-trust-badges">
              {['Flipkart Seller Hub expertise', 'F-Assured specialists', 'FBF logistics management', 'No lock-in contracts'].map(b => (
                <span key={b} className="flpk-badge"><span className="flpk-badge-check">✓</span>{b}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="flpk-challenges">
          <div className="flpk-section-inner">
            <p className="flpk-section-label">Common Seller Pain Points</p>
            <h2 className="flpk-section-h2">Why <span>Flipkart Sellers Struggle</span></h2>
            <p className="flpk-section-sub">The four platform-specific challenges that prevent most Flipkart sellers from reaching their revenue potential.</p>
            <div className="flpk-challenges-grid">
              {challenges.map(c => (
                <div key={c.title} className="flpk-challenge-card">
                  <div className="flpk-challenge-icon">
                    <svg viewBox="0 0 24 24"><path d={c.icon} /></svg>
                  </div>
                  <h3 className="flpk-challenge-title">{c.title}</h3>
                  <p className="flpk-challenge-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flpk-services" id="services">
          <div className="flpk-section-inner">
            <p className="flpk-section-label">Our Services</p>
            <h2 className="flpk-section-h2">What Our <span>Flipkart Management Covers</span></h2>
            <p className="flpk-section-sub">Full-service Flipkart account management from listing to advertising to fulfilment.</p>
            <div className="flpk-services-grid">
              {services.map(s => (
                <div key={s.title} className="flpk-service-card">
                  <div className="flpk-service-icon">
                    <svg viewBox="0 0 24 24"><path d={s.icon} /></svg>
                  </div>
                  <h3 className="flpk-service-title">{s.title}</h3>
                  <p className="flpk-service-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flpk-results">
          <div className="flpk-results-grid">
            <div>
              <span className="flpk-result-num">3.6×</span>
              <span className="flpk-result-label">avg GMV growth in first 8 months</span>
            </div>
            <div>
              <span className="flpk-result-num">91%</span>
              <span className="flpk-result-label">of clients achieve F-Assured badge</span>
            </div>
            <div>
              <span className="flpk-result-num">44%</span>
              <span className="flpk-result-label">avg reduction in return rate</span>
            </div>
          </div>
        </section>

        <section className="flpk-cases">
          <div className="flpk-section-inner">
            <p className="flpk-section-label">Client Results</p>
            <h2 className="flpk-section-h2">Flipkart <span>Success Stories</span></h2>
            <p className="flpk-section-sub">Real results from Indian sellers we have grown on Flipkart.</p>
            <div className="flpk-cases-grid">
              {caseStudies.map(cs => (
                <div key={cs.seller} className="flpk-case-card">
                  <span className="flpk-case-badge">{cs.badge}</span>
                  <h3 className="flpk-case-seller">{cs.seller}</h3>
                  <div className="flpk-case-metrics">
                    <div className="flpk-case-metric">
                      <div className="flpk-case-metric-label">Before</div>
                      <div className="flpk-case-metric-val">{cs.before}</div>
                    </div>
                    <div className="flpk-case-metric">
                      <div className="flpk-case-metric-label">After</div>
                      <div className="flpk-case-metric-val flpk-after">{cs.after}</div>
                    </div>
                  </div>
                  <p className="flpk-case-time">Timeline: {cs.time}</p>
                  <ul className="flpk-case-actions">
                    {cs.actions.map(a => (
                      <li key={a} className="flpk-case-action"><span className="flpk-case-action-dot" />{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flpk-process">
          <div className="flpk-section-inner">
            <p className="flpk-section-label">How We Work</p>
            <h2 className="flpk-section-h2">Our <span>6-Step Flipkart Growth Process</span></h2>
            <p className="flpk-section-sub">A proven approach to building a high-performing Flipkart seller account from audit to ongoing growth.</p>
            <div className="flpk-process-grid">
              {steps.map(s => (
                <div key={s.n} className="flpk-step-card">
                  <span className="flpk-step-num">{s.n}</span>
                  <div className="flpk-step-badge">{s.n}</div>
                  <h3 className="flpk-step-title">{s.title}</h3>
                  <p className="flpk-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flpk-contact" id="contact">
          <div className="flpk-section-inner">
            <div className="flpk-contact-grid">
              <div>
                <p className="flpk-section-label">Get Started</p>
                <h2 className="flpk-contact-h2">Get a Free <span>Flipkart Seller Audit</span></h2>
                <p className="flpk-contact-desc">We will review your Flipkart Seller Hub, F-Assured eligibility, listing quality scores, and ad performance — and give you a clear growth roadmap for the next 90 days.</p>
                <div className="flpk-contact-items">
                  <div className="flpk-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span>hello@1solutions.biz</span>
                  </div>
                  <div className="flpk-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
                    <span>+91 (800) 1SOLUTIONS</span>
                  </div>
                  <div className="flpk-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>90-day growth roadmap included</span>
                  </div>
                </div>
              </div>
              <div className="flpk-form-card">
                {sent ? (
                  <div className="flpk-success">
                    <div className="flpk-success-icon">✅</div>
                    <div className="flpk-success-title">Audit Request Received</div>
                    <p className="flpk-success-text">We will review your Flipkart account and send you a 90-day growth roadmap within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="flpk-form-group">
                      <label className="flpk-form-label">Full Name *</label>
                      <input className="flpk-form-input" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Rahul Sharma" />
                    </div>
                    <div className="flpk-form-group">
                      <label className="flpk-form-label">Email Address *</label>
                      <input className="flpk-form-input" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="rahul@yourbrand.com" />
                    </div>
                    <div className="flpk-form-group">
                      <label className="flpk-form-label">Company / Brand Name</label>
                      <input className="flpk-form-input" type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Brand" />
                    </div>
                    <div className="flpk-form-group">
                      <label className="flpk-form-label">Monthly Flipkart Revenue</label>
                      <select className="flpk-form-select" value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })}>
                        <option>Under $10K/mo</option>
                        <option>$10K-$50K/mo</option>
                        <option>$50K-$200K/mo</option>
                        <option>$200K+/mo</option>
                      </select>
                    </div>
                    <div className="flpk-form-group">
                      <label className="flpk-form-label">Tell us about your Flipkart situation</label>
                      <textarea className="flpk-form-textarea" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Categories, SKU count, current F-Assured status, key challenges..." />
                    </div>
                    <button type="submit" className="flpk-form-submit">Request Free Flipkart Audit →</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="flpk-cta-strip">
          <h2>Ready to Grow on Flipkart?</h2>
          <p>Join brands selling profitably on Flipkart with 1Solutions managing their account, F-Assured certification, and advertising.</p>
          <Link href="#contact" className="flpk-cta-strip-btn">Get Your Free Seller Audit →</Link>
        </section>
      </div>
    </>
  );
}
