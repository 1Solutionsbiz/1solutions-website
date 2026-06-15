import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#5c1800';
const ACCENT_MID = '#b04200';
const ACCENT_RGB = '92, 24, 0';

const challenges = [
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Complex Product Data Requirements',
    desc: 'Home Depot requires highly specific product attributes for every category: precise dimensions, weight, materials, safety certifications, installation requirements, compatible products, and more. Non-compliant product data leads to listing suppression, poor search ranking, and high return rates from mismatched customer expectations.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Direct Shipment Vendor (DSV) Setup Is Technically Demanding',
    desc: "DSV allows suppliers to ship directly to customers from their own warehouses, bypassing Home Depot's DCs. But the EDI integration, label requirements, shipping SLA standards, and order acknowledgement process are technically demanding and non-negotiable. Errors lead to chargebacks and account penalties.",
  },
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Home Depot Search Algorithm Requires Specific Optimisation',
    desc: "Home Depot's search algorithm weights product title format, attribute completeness, customer reviews, and in-stock availability. Suppliers who run Amazon-style listings without adapting to Home Depot's attribute taxonomy and title conventions consistently rank below their potential.",
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Home Depot Media Network Advertising Is Underutilised',
    desc: "Home Depot's advertising platform reaches a high-intent home improvement audience at the point of purchase. Most suppliers either do not advertise on HDMN or run campaigns without the keyword structure and bid strategy needed to generate positive ROI at meaningful scale.",
  },
];

const services = [
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'Home Depot Supplier Account Setup & Management',
    desc: 'Complete setup for Supplier Direct or Marketplace seller models, vendor portal navigation, category approvals, and ongoing account health monitoring.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Product Data Compliance & Attribute Optimisation',
    desc: "Full attribute completion to Home Depot's category taxonomy: dimensions, materials, safety certifications, installation specs, and compatible product relationships that prevent listing suppression.",
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Direct Shipment Vendor (DSV) Setup & EDI Integration Support',
    desc: 'DSV onboarding, EDI integration coordination, label standard verification, shipping SLA schedule alignment, and order acknowledgement process testing to prevent chargebacks.',
  },
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Listing Optimisation for Home Depot Search Algorithm',
    desc: "Title format compliance with Home Depot's convention, keyword-rich attribute completion, competitive positioning, and imagery that meets 2000x2000px standards with dimension views.",
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Home Depot Media Network (HDMN) Advertising Management',
    desc: 'Sponsored Product campaigns targeting high-intent home improvement searches, seasonal event planning, bid strategy, and weekly optimisation against sales targets.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Product Imagery Standards',
    desc: 'Guidance and coordination for 2000x2000px hero images, lifestyle photography, dimension drawings, and installation shots that meet Home Depot specifications and improve conversion.',
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Order Fulfilment Compliance & Chargeback Prevention',
    desc: 'Ongoing monitoring of DSV order flow, SLA adherence, shipping label compliance, and proactive chargeback dispute filing for any penalties applied in error.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Monthly Performance Analytics & Reporting',
    desc: 'Sales by SKU, search ranking positions, chargeback report, HDMN ad ROI, attribute compliance score, and a next-month optimisation roadmap for catalogue growth.',
  },
];

const caseStudies = [
  {
    badge: 'Case Study',
    seller: 'US Power Tools Brand',
    before: '$28K/mo, 4 chargebacks/mo',
    after: '$89K/mo, 0 chargebacks',
    time: '7 months',
    actions: [
      'DSV EDI integration corrected; order acknowledgement automated',
      'Product data completed across 180 SKUs to Home Depot standards',
      'HDMN campaigns launched targeting seasonal home improvement searches',
    ],
  },
  {
    badge: 'Case Study',
    seller: 'CA Lighting Fixtures Supplier',
    before: '$0 on Home Depot',
    after: '$54K/mo in 6 months',
    time: '6 months',
    actions: [
      'Complete supplier onboarding through Home Depot supplier portal',
      '340 SKUs loaded with full attribute compliance',
      'HDMN Sponsored Product campaigns built from week one',
    ],
  },
];

const steps = [
  { n: '01', title: 'Home Depot Account & Catalogue Audit', desc: 'Review existing supplier setup, product data quality, DSV compliance, and ranking performance to identify priority gaps and opportunities.' },
  { n: '02', title: 'Product Data Strategy', desc: "Map all SKUs to Home Depot category taxonomies and identify missing attributes that cause suppression or poor ranking." },
  { n: '03', title: 'DSV Setup & Compliance', desc: 'EDI setup or review, label standard verification, SLA schedule alignment, and order acknowledgement process testing.' },
  { n: '04', title: 'Listing Optimisation', desc: "Titles, attribute completion, imagery updates, and keyword integration for Home Depot's search algorithm." },
  { n: '05', title: 'HDMN Advertising Launch', desc: 'Sponsored Product campaigns built with category-specific keywords, bid strategy, and negative keyword foundation.' },
  { n: '06', title: 'Monthly Performance Review', desc: 'Sales by SKU, search ranking, chargeback report, ad ROI, and next-month optimisation roadmap.' },
];

const FAQS = [
  { q: "How do I become a Home Depot Marketplace supplier?", a: "Home Depot Marketplace suppliers are approved through the Home Depot supplier portal. The application requires product catalogue information, compliance certifications, and fulfilment capability (DSV or dropship). Home Depot reviews applications against their category needs and vendor standards, which can take 4 to 8 weeks. We manage the full application and onboarding process." },
  { q: "What is DSV and how does it work for Home Depot suppliers?", a: "DSV stands for Direct Ship Vendor — the Home Depot model where you ship orders directly to customers without inventory going through Home Depot distribution. Orders are transmitted via EDI or API, you ship with Home Depot branded or approved packaging, and tracking is uploaded back through the vendor portal. DSV compliance requirements are strict and non-compliance triggers chargebacks. We set up and manage your full DSV operation." },
  { q: "Why are my Home Depot products not ranking in search?", a: "The most common causes are incomplete product attributes (Home Depot requires very specific data fields by category), pricing outside the acceptable range for the category, low conversion rate from poor imagery, or insufficient review count. We audit every suppressed or low-ranking product and identify the exact gap that is preventing visibility." },
  { q: "How do Home Depot chargebacks work and how do you prevent them?", a: "Home Depot issues chargebacks to DSV suppliers for compliance failures including late shipments (outside the SLA window), missing or incorrect tracking uploads, packaging non-compliance, and incorrect pricing. Chargebacks are automatic and can add up quickly. We implement order management processes and SLA monitoring to prevent chargebacks before they happen, and dispute incorrect chargebacks on your behalf." },
  { q: "What is HDMN and how does Home Depot advertising work?", a: "HDMN (Home Depot Media Network) is Home Depot's advertising platform for suppliers. It offers Sponsored Product placements on HomeDepot.com search results and product pages. HDMN is most effective for products that already have competitive pricing and good imagery — advertising amplifies existing performance, it does not fix a broken listing. We manage campaign strategy, keyword builds, and ongoing bid optimisation." },
  { q: "What product categories sell best on Home Depot Marketplace?", a: "Home Depot Marketplace is strongest in home improvement, tools, building materials, storage, outdoor furniture, lighting, and appliances. The best opportunities for sellers are in sub-categories where the online selection is still limited — decorative hardware, specialty lighting, niche power tool accessories, and storage solutions for specific use cases tend to offer less competition with good search volume." },
];

export default function HomeDepotAccountManagement() {
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
        <title>Home Depot Marketplace Account Management Services | 1Solutions</title>
        <meta name="description" content="Grow on Home Depot Marketplace with 1Solutions. We manage supplier accounts, product data compliance, Direct Shipment Vendor (DSV) setup, listing optimisation, and Home Depot advertising." />
        <link rel="canonical" href="https://1solutions.biz/home-depot-account-management-services/" />
      </Head>

      <style>{`
        .hdep-page { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; }

        .hdep-breadcrumb { background: #f8f9fa; border-bottom: 1px solid #e9ecef; padding: 12px 0; }
        .hdep-breadcrumb-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 8px; font-size: 14px; }
        .hdep-breadcrumb a { color: ${ACCENT}; text-decoration: none; }
        .hdep-breadcrumb a:hover { text-decoration: underline; }
        .hdep-breadcrumb-sep { color: #adb5bd; }
        .hdep-breadcrumb-current { color: #6c757d; }

        .hdep-hero { background: linear-gradient(135deg, #250900 0%, #5c1800 60%, #8a2800 100%); color: #fff; padding: 80px 24px 72px; position: relative; overflow: hidden; }
        .hdep-hero-orb1 { position: absolute; top: -80px; right: -80px; width: 400px; height: 400px; background: rgba(${ACCENT_RGB}, 0.35); border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .hdep-hero-orb2 { position: absolute; bottom: -100px; left: -60px; width: 300px; height: 300px; background: rgba(176,66,0,0.22); border-radius: 50%; filter: blur(60px); pointer-events: none; }
        .hdep-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .hdep-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; padding: 6px 16px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px; }
        .hdep-eyebrow-dot { width: 6px; height: 6px; background: #fb923c; border-radius: 50%; }
        .hdep-hero h1 { font-size: clamp(28px, 4vw, 52px); font-weight: 800; line-height: 1.15; max-width: 860px; margin: 0 0 24px; }
        .hdep-hero-desc { font-size: 18px; line-height: 1.7; max-width: 760px; opacity: 0.9; margin-bottom: 40px; }
        .hdep-stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.15); border-radius: 12px; overflow: hidden; margin-bottom: 40px; }
        .hdep-stat { background: rgba(255,255,255,0.08); padding: 20px 16px; text-align: center; }
        .hdep-stat-num { font-size: 28px; font-weight: 800; color: #fff; display: block; }
        .hdep-stat-label { font-size: 12px; opacity: 0.75; margin-top: 4px; display: block; }
        .hdep-hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 36px; }
        .hdep-btn-primary { background: #fff; color: ${ACCENT}; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: none; cursor: pointer; transition: transform 0.2s; }
        .hdep-btn-primary:hover { transform: translateY(-2px); }
        .hdep-btn-secondary { background: transparent; color: #fff; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: 2px solid rgba(255,255,255,0.4); cursor: pointer; transition: border-color 0.2s; }
        .hdep-btn-secondary:hover { border-color: #fff; }
        .hdep-trust-badges { display: flex; flex-wrap: wrap; gap: 12px; }
        .hdep-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 6px 12px; font-size: 13px; }
        .hdep-badge-check { color: #4ade80; font-size: 14px; }

        .hdep-challenges { padding: 80px 24px; background: #fff; }
        .hdep-section-inner { max-width: 1200px; margin: 0 auto; }
        .hdep-section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 12px; }
        .hdep-section-h2 { font-size: clamp(24px, 3vw, 40px); font-weight: 800; margin: 0 0 16px; line-height: 1.2; }
        .hdep-section-h2 span { background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hdep-section-sub { font-size: 17px; color: #555; max-width: 700px; margin-bottom: 48px; line-height: 1.6; }
        .hdep-challenges-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .hdep-challenge-card { background: #f8f9fa; border-radius: 16px; padding: 28px 24px; border: 1px solid #e9ecef; }
        .hdep-challenge-icon { width: 48px; height: 48px; background: rgba(${ACCENT_RGB}, 0.07); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .hdep-challenge-icon svg { width: 24px; height: 24px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .hdep-challenge-title { font-size: 16px; font-weight: 700; margin: 0 0 10px; color: #1a1a2e; }
        .hdep-challenge-desc { font-size: 14px; color: #555; line-height: 1.6; margin: 0; }

        .hdep-services { padding: 80px 24px; background: linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%); }
        .hdep-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hdep-service-card { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(${ACCENT_RGB}, 0.12); border-radius: 16px; padding: 28px 24px; transition: transform 0.2s, box-shadow 0.2s; }
        .hdep-service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(${ACCENT_RGB}, 0.12); }
        .hdep-service-icon { width: 48px; height: 48px; background: linear-gradient(135deg, rgba(${ACCENT_RGB}, 0.09) 0%, rgba(176,66,0,0.07) 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .hdep-service-icon svg { width: 24px; height: 24px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .hdep-service-title { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e; }
        .hdep-service-desc { font-size: 14px; color: #555; line-height: 1.6; margin: 0; }

        .hdep-results { padding: 64px 24px; background: linear-gradient(135deg, #250900 0%, #5c1800 100%); color: #fff; }
        .hdep-results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1200px; margin: 0 auto; text-align: center; }
        .hdep-result-num { font-size: 52px; font-weight: 900; line-height: 1; display: block; }
        .hdep-result-label { font-size: 16px; opacity: 0.8; margin-top: 8px; display: block; }

        .hdep-cases { padding: 80px 24px; background: #fff; }
        .hdep-cases-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .hdep-case-card { background: #fff; border: 1px solid #e9ecef; border-radius: 20px; padding: 36px 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .hdep-case-badge { display: inline-block; background: rgba(${ACCENT_RGB}, 0.07); color: ${ACCENT}; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
        .hdep-case-seller { font-size: 20px; font-weight: 800; margin: 0 0 20px; color: #1a1a2e; }
        .hdep-case-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .hdep-case-metric { background: #f8f9fa; border-radius: 10px; padding: 14px 16px; }
        .hdep-case-metric-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 4px; }
        .hdep-case-metric-val { font-size: 16px; font-weight: 700; color: #1a1a2e; }
        .hdep-case-metric-val.hdep-after { color: ${ACCENT}; }
        .hdep-case-time { font-size: 12px; color: #888; margin-bottom: 20px; font-weight: 600; }
        .hdep-case-actions { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .hdep-case-action { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #444; line-height: 1.5; }
        .hdep-case-action-dot { width: 6px; height: 6px; background: ${ACCENT}; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }

        .hdep-process { padding: 80px 24px; background: #fafafa; }
        .hdep-process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .hdep-step-card { background: #fff; border-radius: 16px; padding: 28px 24px; border: 1px solid #e9ecef; position: relative; overflow: hidden; }
        .hdep-step-num { position: absolute; top: 16px; right: 20px; font-size: 56px; font-weight: 900; color: rgba(${ACCENT_RGB}, 0.05); line-height: 1; pointer-events: none; }
        .hdep-step-badge { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: ${ACCENT}; color: #fff; border-radius: 10px; font-size: 14px; font-weight: 800; margin-bottom: 16px; }
        .hdep-step-title { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e; }
        .hdep-step-desc { font-size: 14px; color: #666; line-height: 1.6; margin: 0; }

        .hdep-contact { padding: 80px 24px; background: linear-gradient(180deg, #fff 0%, #f8f9fa 100%); }
        .hdep-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .hdep-contact-h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 800; margin: 0 0 16px; line-height: 1.25; }
        .hdep-contact-h2 span { background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hdep-contact-desc { font-size: 16px; color: #555; line-height: 1.7; margin-bottom: 36px; }
        .hdep-contact-items { display: flex; flex-direction: column; gap: 16px; }
        .hdep-contact-item { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #333; }
        .hdep-contact-item svg { width: 20px; height: 20px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
        .hdep-form-card { background: #fff; border-radius: 20px; padding: 36px 32px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); border: 1px solid #e9ecef; }
        .hdep-form-group { margin-bottom: 20px; }
        .hdep-form-label { display: block; font-size: 13px; font-weight: 600; color: #444; margin-bottom: 6px; }
        .hdep-form-input, .hdep-form-select, .hdep-form-textarea { width: 100%; padding: 11px 14px; border: 1.5px solid #dde1e7; border-radius: 8px; font-size: 15px; color: #1a1a2e; background: #fff; box-sizing: border-box; transition: border-color 0.2s; font-family: inherit; }
        .hdep-form-input:focus, .hdep-form-select:focus, .hdep-form-textarea:focus { outline: none; border-color: ${ACCENT}; }
        .hdep-form-textarea { resize: vertical; min-height: 110px; }
        .hdep-form-submit { width: 100%; background: ${ACCENT}; color: #fff; border: none; border-radius: 8px; padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .hdep-form-submit:hover { opacity: 0.88; }
        .hdep-success { text-align: center; padding: 40px 20px; }
        .hdep-success-icon { font-size: 48px; margin-bottom: 16px; }
        .hdep-success-title { font-size: 22px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
        .hdep-success-text { font-size: 15px; color: #666; }

        .hdep-cta-strip { background: ${ACCENT}; color: #fff; padding: 64px 24px; text-align: center; }
        .hdep-cta-strip h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 800; margin: 0 0 12px; }
        .hdep-cta-strip p { font-size: 17px; opacity: 0.88; margin: 0 0 28px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .hdep-cta-strip-btn { background: #fff; color: ${ACCENT}; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-block; }
        .hdep-cta-strip-btn:hover { opacity: 0.9; }

        @media (max-width: 900px) {
          .hdep-challenges-grid { grid-template-columns: repeat(2, 1fr); }
          .hdep-services-grid { grid-template-columns: repeat(2, 1fr); }
          .hdep-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .hdep-contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .hdep-cases-grid { grid-template-columns: 1fr; }
          .hdep-results-grid { grid-template-columns: 1fr; gap: 24px; }
          .hdep-process-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .hdep-challenges-grid { grid-template-columns: 1fr; }
          .hdep-services-grid { grid-template-columns: 1fr; }
          .hdep-process-grid { grid-template-columns: 1fr; }
        }
        /* ── FAQ ── */
        .hdep-faq-sec { padding:80px 24px;background:#f8fafd;border-top:1px solid rgba(${ACCENT_RGB},0.08); }
        .hdep-faq-inner { max-width:1200px;margin:0 auto; }
        .hdep-faq-h { font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${ACCENT} 0%,${ACCENT_MID} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 36px;line-height:1.15; }
        .hdep-faq-list { display:flex;flex-direction:column;gap:12px; }
        .hdep-faq-item { background:linear-gradient(135deg,rgba(${ACCENT_RGB},0.06) 0%,rgba(255,255,255,0.85) 60%,rgba(${ACCENT_RGB},0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(${ACCENT_RGB},0.07);transition:border-color 0.2s;position:relative; }
        .hdep-faq-item.open { border-color:rgba(${ACCENT_RGB},0.30); }
        .hdep-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:${ACCENT};border-radius:3px 0 0 3px; }
        .hdep-faq-btn { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
        .hdep-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(${ACCENT_RGB},0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
        .hdep-faq-item.open .hdep-faq-q-badge { background:${ACCENT};color:#fff; }
        .hdep-faq-btn span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45; }
        .hdep-faq-item.open .hdep-faq-btn span { color:${ACCENT}; }
        .hdep-faq-chev { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
        .hdep-faq-item.open .hdep-faq-chev { transform:rotate(180deg);color:${ACCENT}; }
        .hdep-faq-ans-wrap { overflow:hidden;max-height:0;transition:max-height 0.35s ease; }
        .hdep-faq-item.open .hdep-faq-ans-wrap { max-height:500px; }
        .hdep-faq-ans { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
        .hdep-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:${ACCENT};color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }
        /* ── Related Services ── */
        .hdep-rel-sec { background:rgba(${ACCENT_RGB},0.04);border-top:1px solid rgba(${ACCENT_RGB},0.08);padding:80px 24px; }
        .hdep-rel-inner { max-width:1200px;margin:0 auto;text-align:center; }
        .hdep-rel-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
        .hdep-rel-h { font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${ACCENT} 0%,${ACCENT_MID} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px;line-height:1.15; }
        .hdep-rel-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
        .hdep-rel-div { border:none;border-top:1px solid rgba(${ACCENT_RGB},0.12);margin:40px 0; }
        .hdep-rel-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
        .hdep-rtag { display:inline-flex;align-items:center;padding:8px 16px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;border:1.5px solid;transition:all 0.2s; }
        .hdep-rtag:hover { transform:translateY(-2px); }
        .hdep-rtag-a { background:rgba(${ACCENT_RGB},0.08);color:${ACCENT};border-color:rgba(${ACCENT_RGB},0.25); }
        .hdep-rtag-b { background:rgba(79,70,229,0.07);color:#4338ca;border-color:rgba(79,70,229,0.22); }
        .hdep-rtag-c { background:rgba(5,150,105,0.07);color:#047857;border-color:rgba(5,150,105,0.22); }
        .hdep-rtag-d { background:rgba(217,119,6,0.07);color:#b45309;border-color:rgba(217,119,6,0.22); }
        .hdep-rtag-e { background:rgba(219,39,119,0.07);color:#be185d;border-color:rgba(219,39,119,0.22); }
        .hdep-rtag-f { background:rgba(8,145,178,0.07);color:#0e7490;border-color:rgba(8,145,178,0.22); }
      `}</style>

      <div className="hdep-page">
        <nav className="hdep-breadcrumb">
          <div className="hdep-breadcrumb-inner">
            <Link href="/">Home</Link>
            <span className="hdep-breadcrumb-sep">›</span>
            <Link href="/marketplace-account-management">Marketplace Management</Link>
            <span className="hdep-breadcrumb-sep">›</span>
            <span className="hdep-breadcrumb-current">Home Depot Marketplace Management</span>
          </div>
        </nav>

        <section className="hdep-hero">
          <div className="hdep-hero-orb1" />
          <div className="hdep-hero-orb2" />
          <div className="hdep-hero-inner">
            <div className="hdep-eyebrow">
              <span className="hdep-eyebrow-dot" />
              Home Depot Marketplace Management
            </div>
            <h1>Home Depot Marketplace Management for Brands Reaching 50M+ Monthly Pro Shoppers</h1>
            <p className="hdep-hero-desc">
              Home Depot's marketplace reaches over 50 million monthly visitors — including professional contractors, builders, and serious DIY homeowners. 1Solutions manages your Home Depot supplier or marketplace account to ensure your products meet their strict data standards, rank in search, and consistently convert at the shelf level.
            </p>
            <div className="hdep-stats-bar">
              <div className="hdep-stat"><span className="hdep-stat-num">50M+</span><span className="hdep-stat-label">Monthly Home Depot visitors</span></div>
              <div className="hdep-stat"><span className="hdep-stat-num">$34B+</span><span className="hdep-stat-label">HomeDepot.com annual revenue</span></div>
              <div className="hdep-stat"><span className="hdep-stat-num">DSV</span><span className="hdep-stat-label">Setup for 96% of our clients</span></div>
              <div className="hdep-stat"><span className="hdep-stat-num">2.8×</span><span className="hdep-stat-label">avg revenue growth in 9 months</span></div>
            </div>
            <div className="hdep-hero-ctas">
              <Link href="#contact" className="hdep-btn-primary">Get a Free Supplier Consultation →</Link>
              <Link href="#services" className="hdep-btn-secondary">Explore Services</Link>
            </div>
            <div className="hdep-trust-badges">
              {['Home Depot supplier expertise', 'DSV & EDI compliance', 'Product data specialists', 'No lock-in contracts'].map(b => (
                <span key={b} className="hdep-badge"><span className="hdep-badge-check">✓</span>{b}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="hdep-challenges">
          <div className="hdep-section-inner">
            <p className="hdep-section-label">Common Supplier Pain Points</p>
            <h2 className="hdep-section-h2">Why <span>Home Depot Sellers Struggle</span></h2>
            <p className="hdep-section-sub">Four platform-specific challenges that prevent suppliers from reaching their revenue potential on HomeDepot.com.</p>
            <div className="hdep-challenges-grid">
              {challenges.map(c => (
                <div key={c.title} className="hdep-challenge-card">
                  <div className="hdep-challenge-icon">
                    <svg viewBox="0 0 24 24"><path d={c.icon} /></svg>
                  </div>
                  <h3 className="hdep-challenge-title">{c.title}</h3>
                  <p className="hdep-challenge-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hdep-services" id="services">
          <div className="hdep-section-inner">
            <p className="hdep-section-label">Our Services</p>
            <h2 className="hdep-section-h2">What Our <span>Home Depot Management Covers</span></h2>
            <p className="hdep-section-sub">Full-service Home Depot supplier management from onboarding and compliance to advertising and monthly performance reporting.</p>
            <div className="hdep-services-grid">
              {services.map(s => (
                <div key={s.title} className="hdep-service-card">
                  <div className="hdep-service-icon">
                    <svg viewBox="0 0 24 24"><path d={s.icon} /></svg>
                  </div>
                  <h3 className="hdep-service-title">{s.title}</h3>
                  <p className="hdep-service-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hdep-results">
          <div className="hdep-results-grid">
            <div>
              <span className="hdep-result-num">2.8×</span>
              <span className="hdep-result-label">avg revenue growth in 9 months</span>
            </div>
            <div>
              <span className="hdep-result-num">96%</span>
              <span className="hdep-result-label">listing data compliance rate</span>
            </div>
            <div>
              <span className="hdep-result-num">62%</span>
              <span className="hdep-result-label">reduction in chargebacks after DSV optimisation</span>
            </div>
          </div>
        </section>

        <section className="hdep-cases">
          <div className="hdep-section-inner">
            <p className="hdep-section-label">Client Results</p>
            <h2 className="hdep-section-h2">Home Depot <span>Success Stories</span></h2>
            <p className="hdep-section-sub">Brands we have launched and grown on Home Depot's marketplace.</p>
            <div className="hdep-cases-grid">
              {caseStudies.map(cs => (
                <div key={cs.seller} className="hdep-case-card">
                  <span className="hdep-case-badge">{cs.badge}</span>
                  <h3 className="hdep-case-seller">{cs.seller}</h3>
                  <div className="hdep-case-metrics">
                    <div className="hdep-case-metric">
                      <div className="hdep-case-metric-label">Before</div>
                      <div className="hdep-case-metric-val">{cs.before}</div>
                    </div>
                    <div className="hdep-case-metric">
                      <div className="hdep-case-metric-label">After</div>
                      <div className="hdep-case-metric-val hdep-after">{cs.after}</div>
                    </div>
                  </div>
                  <p className="hdep-case-time">Timeline: {cs.time}</p>
                  <ul className="hdep-case-actions">
                    {cs.actions.map(a => (
                      <li key={a} className="hdep-case-action"><span className="hdep-case-action-dot" />{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hdep-process">
          <div className="hdep-section-inner">
            <p className="hdep-section-label">How We Work</p>
            <h2 className="hdep-section-h2">Our <span>6-Step Home Depot Launch Process</span></h2>
            <p className="hdep-section-sub">A structured onboarding and growth process built for Home Depot's unique supplier requirements.</p>
            <div className="hdep-process-grid">
              {steps.map(s => (
                <div key={s.n} className="hdep-step-card">
                  <span className="hdep-step-num">{s.n}</span>
                  <div className="hdep-step-badge">{s.n}</div>
                  <h3 className="hdep-step-title">{s.title}</h3>
                  <p className="hdep-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hdep-contact" id="contact">
          <div className="hdep-section-inner">
            <div className="hdep-contact-grid">
              <div>
                <p className="hdep-section-label">Get Started</p>
                <h2 className="hdep-contact-h2">Get a Free <span>Home Depot Supplier Consultation</span></h2>
                <p className="hdep-contact-desc">We will review your Home Depot account setup or supplier application, product data compliance gaps, and search ranking opportunities — and provide a clear action plan.</p>
                <div className="hdep-contact-items">
                  <div className="hdep-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span>hello@1solutions.biz</span>
                  </div>
                  <div className="hdep-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
                    <span>+1 (800) 1SOLUTIONS</span>
                  </div>
                  <div className="hdep-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Free compliance gap analysis included</span>
                  </div>
                </div>
              </div>
              <div className="hdep-form-card">
                {sent ? (
                  <div className="hdep-success">
                    <div className="hdep-success-icon">✅</div>
                    <div className="hdep-success-title">Consultation Request Received</div>
                    <p className="hdep-success-text">We will review your Home Depot setup and send you a compliance gap analysis and action plan within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="hdep-form-group">
                      <label className="hdep-form-label">Full Name *</label>
                      <input className="hdep-form-input" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" />
                    </div>
                    <div className="hdep-form-group">
                      <label className="hdep-form-label">Email Address *</label>
                      <input className="hdep-form-input" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@yourbrand.com" />
                    </div>
                    <div className="hdep-form-group">
                      <label className="hdep-form-label">Company / Brand Name</label>
                      <input className="hdep-form-input" type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Brand" />
                    </div>
                    <div className="hdep-form-group">
                      <label className="hdep-form-label">Monthly Home Depot Revenue</label>
                      <select className="hdep-form-select" value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })}>
                        <option>Under $10K/mo</option>
                        <option>$10K-$50K/mo</option>
                        <option>$50K-$200K/mo</option>
                        <option>$200K+/mo</option>
                      </select>
                    </div>
                    <div className="hdep-form-group">
                      <label className="hdep-form-label">Tell us about your Home Depot situation</label>
                      <textarea className="hdep-form-textarea" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Product categories, SKU count, DSV status, current challenges..." />
                    </div>
                    <button type="submit" className="hdep-form-submit">Request Free Consultation →</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="hdep-faq-sec" id="faq">
          <div className="hdep-faq-inner">
            <h2 className="hdep-faq-h">Frequently Asked Questions</h2>
            <div className="hdep-faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className={'hdep-faq-item' + (openFaq === i ? ' open' : '')}>
                  <button className="hdep-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <div className="hdep-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="hdep-faq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="hdep-faq-ans-wrap">
                    <div className="hdep-faq-ans"><span className="hdep-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="hdep-rel-sec">
          <div className="hdep-rel-inner">
            <span className="hdep-rel-eyebrow">PLATFORM RELATED OFFERINGS</span>
            <h2 className="hdep-rel-h">Explore Related Services and Technologies</h2>
            <p className="hdep-rel-sub">Pair our Home Depot Marketplace expertise with complementary services that grow your home improvement brand across channels.</p>
            <hr className="hdep-rel-div" />
            <div className="hdep-rel-tags">
              <Link href="/wayfair-account-management-services/" className="hdep-rtag hdep-rtag-a">Wayfair Supplier</Link>
              <Link href="/amazon-account-management-services/" className="hdep-rtag hdep-rtag-b">Amazon Management</Link>
              <Link href="/walmart-account-management-services/" className="hdep-rtag hdep-rtag-c">Walmart Marketplace</Link>
              <Link href="/ecommerce-seo-services/" className="hdep-rtag hdep-rtag-d">eCommerce SEO</Link>
              <Link href="/ecommerce-website-development-services/" className="hdep-rtag hdep-rtag-e">eCommerce Development</Link>
              <Link href="/social-media-marketing-services/" className="hdep-rtag hdep-rtag-f">Social Commerce</Link>
              <Link href="/email-marketing-services/" className="hdep-rtag hdep-rtag-a">Email Automation</Link>
              <Link href="/woocommerce-development-company/" className="hdep-rtag hdep-rtag-b">WooCommerce Development</Link>
              <Link href="/houzz-product-listing-services/" className="hdep-rtag hdep-rtag-c">Houzz Listings</Link>
              <Link href="/google-shopping-management/" className="hdep-rtag hdep-rtag-d">Google Shopping Ads</Link>
              <Link href="/magento-development-company/" className="hdep-rtag hdep-rtag-e">Magento Development</Link>
              <Link href="/ebay-account-management-services/" className="hdep-rtag hdep-rtag-f">eBay Management</Link>
            </div>
          </div>
        </section>

        <section className="hdep-cta-strip">
          <h2>Ready to Grow on Home Depot?</h2>
          <p>Join suppliers growing profitably on HomeDepot.com with 1Solutions managing their account, compliance, and advertising.</p>
          <Link href="#contact" className="hdep-cta-strip-btn">Get Your Free Consultation →</Link>
        </section>
      </div>
    </>
  );
}
