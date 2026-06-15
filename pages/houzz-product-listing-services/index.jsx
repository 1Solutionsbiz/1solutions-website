import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#0a3300';
const ACCENT_MID = '#2d8000';
const ACCENT_RGB = '10, 51, 0';

const challenges = [
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Design Professionals Demand Premium Product Information',
    desc: 'Interior designers sourcing on Houzz need exact specifications: precise dimensions, material compositions, finish options, lead times, and trade pricing. Listings without this level of detail are simply skipped. Most brands publish consumer-focused content that fails to serve the professional buyer who drives the majority of high-value Houzz orders.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Photography Standards Are Non-Negotiable',
    desc: "Houzz's audience is visually sophisticated. Products photographed against plain white backgrounds without lifestyle context, scale reference, or finish detail shots fail to convert. Houzz's algorithm also surfaces products with more photos and higher-quality imagery ahead of those with minimal visuals.",
  },
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'Houzz Pro Shop Setup Is Underutilised',
    desc: 'Houzz Pro allows brands to create a branded shop within Houzz, manage trade pricing, and connect directly with design professionals. Most brands either do not set up Houzz Pro properly or do not capitalise on its CRM and enquiry management features, missing direct-to-professional revenue.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Houzz Advertising Requires Design-Audience Targeting',
    desc: "Houzz Ads run across their platform's editorial content, idea books, and search results. Without an understanding of how Houzz's audience browses (by room type, style, budget), campaigns serve impressions to cold audiences rather than design professionals actively speccing products in your category.",
  },
];

const services = [
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'Houzz Pro Shop Setup & Brand Profile Optimisation',
    desc: 'Complete Houzz Pro shop setup including branded profile, product category organisation, brand story, and trade account configuration to attract and convert design professional buyers.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Product Listing Creation',
    desc: 'Professional-grade product listings with exact specifications, dimensions, material compositions, finish options, lead times, care instructions, and trade-ready technical details that design professionals require.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Professional Photography Guideline Consultation',
    desc: 'Detailed photography brief covering required angles (hero, lifestyle, detail, scale, finish options), lighting standards, and lifestyle staging guidance to meet the visual expectations of Houzz design audiences.',
  },
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Houzz SEO — Keyword Optimisation',
    desc: "Keyword research and optimisation for Houzz's search queries by room type (living room, kitchen, bedroom), style (mid-century, Scandinavian, industrial), and material — driving discovery from both professionals and homeowners.",
  },
  {
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    title: 'Trade Pricing & Pro Buyer Management',
    desc: 'Trade pricing structure setup for Houzz Pro buyers, enquiry routing, follow-up protocol, and ongoing management of direct professional buyer relationships to build a recurring revenue base.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Houzz Ads Management',
    desc: "Sponsored Product and Display ad campaigns targeting Houzz's design professional and renovation-active homeowner audience, with room-type, style, and project budget targeting to reach high-intent buyers.",
  },
  {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'Review & Ideabook Engagement Strategy',
    desc: 'Strategy for growing product reviews, encouraging ideabook saves (which drive organic traffic), and engaging with the Houzz community to build brand awareness among design professionals.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Monthly Analytics & Enquiry Reporting',
    desc: 'Revenue by product, professional enquiry volume and source, ad ROI, ideabook save counts, product discovery data, and a monthly roadmap for catalogue expansion or photography investment.',
  },
];

const caseStudies = [
  {
    badge: 'Case Study',
    seller: 'US Lighting Design Brand',
    before: '$9K/mo on Houzz, 3.2% conversion',
    after: '$28K/mo, 7.1% conversion',
    time: '5 months',
    actions: [
      'All 140 listings updated with full trade spec sheets',
      'Photography audit and reshoot of 40 hero products',
      'Houzz Ads targeted to renovation projects in $250K+ budget bracket',
    ],
  },
  {
    badge: 'Case Study',
    seller: 'AU Furniture Manufacturer',
    before: 'No Houzz presence',
    after: '$18K/mo + 22 design professional accounts opened',
    time: '4 months',
    actions: [
      'Houzz Pro shop built with complete brand profile and 85 product listings',
      'Trade pricing structure created for Houzz Pro buyers',
      'Sponsored Product ads launched targeting living room and bedroom categories',
    ],
  },
];

const steps = [
  { n: '01', title: 'Houzz Brand & Product Audit', desc: 'Review your existing Houzz presence (or plan a new launch), photography assets, and product specification depth to identify gaps and opportunities.' },
  { n: '02', title: 'Listing Strategy', desc: 'Map your product catalogue to Houzz room types, styles, and price brackets; identify which SKUs lead the strategy and which need photography investment first.' },
  { n: '03', title: 'Listing Creation & Optimisation', desc: 'Write professional-grade specifications, SEO-optimised titles and descriptions, and photography guidance for all priority products.' },
  { n: '04', title: 'Houzz Pro Shop Setup', desc: 'Brand profile, trade pricing structure, Pro buyer engagement protocol, and direct enquiry management setup.' },
  { n: '05', title: 'Houzz Ads Launch', desc: 'Sponsored Products and Display campaigns targeting the design professional audience with style and room-type targeting built from day one.' },
  { n: '06', title: 'Monthly Reporting', desc: 'Revenue by product, professional enquiry volume, ad ROI, and product discovery data with next-month roadmap.' },
];

export default function HouzzProductListingServices() {
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue: 'Under $10K/mo', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Head>
        <title>Houzz Product Listing Services | Home Design Marketplace Experts | 1Solutions</title>
        <meta name="description" content="Reach interior designers and homeowners on Houzz with 1Solutions. We create optimised Houzz product listings, manage your Houzz Pro shop, and run Houzz advertising to drive consistent orders." />
        <link rel="canonical" href="https://1solutions.biz/houzz-product-listing-services/" />
      </Head>

      <style>{`
        .houz-page { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; }

        .houz-breadcrumb { background: #f8f9fa; border-bottom: 1px solid #e9ecef; padding: 12px 0; }
        .houz-breadcrumb-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 8px; font-size: 14px; }
        .houz-breadcrumb a { color: ${ACCENT}; text-decoration: none; }
        .houz-breadcrumb a:hover { text-decoration: underline; }
        .houz-breadcrumb-sep { color: #adb5bd; }
        .houz-breadcrumb-current { color: #6c757d; }

        .houz-hero { background: linear-gradient(135deg, #031400 0%, #0a3300 60%, #155200 100%); color: #fff; padding: 80px 24px 72px; position: relative; overflow: hidden; }
        .houz-hero-orb1 { position: absolute; top: -80px; right: -80px; width: 400px; height: 400px; background: rgba(${ACCENT_RGB}, 0.5); border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .houz-hero-orb2 { position: absolute; bottom: -100px; left: -60px; width: 300px; height: 300px; background: rgba(45,128,0,0.25); border-radius: 50%; filter: blur(60px); pointer-events: none; }
        .houz-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .houz-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; padding: 6px 16px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px; }
        .houz-eyebrow-dot { width: 6px; height: 6px; background: #86efac; border-radius: 50%; }
        .houz-hero h1 { font-size: clamp(28px, 4vw, 52px); font-weight: 800; line-height: 1.15; max-width: 860px; margin: 0 0 24px; }
        .houz-hero-desc { font-size: 18px; line-height: 1.7; max-width: 760px; opacity: 0.9; margin-bottom: 40px; }
        .houz-stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.15); border-radius: 12px; overflow: hidden; margin-bottom: 40px; }
        .houz-stat { background: rgba(255,255,255,0.08); padding: 20px 16px; text-align: center; }
        .houz-stat-num { font-size: 28px; font-weight: 800; color: #fff; display: block; }
        .houz-stat-label { font-size: 12px; opacity: 0.75; margin-top: 4px; display: block; }
        .houz-hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 36px; }
        .houz-btn-primary { background: #fff; color: ${ACCENT}; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: none; cursor: pointer; transition: transform 0.2s; }
        .houz-btn-primary:hover { transform: translateY(-2px); }
        .houz-btn-secondary { background: transparent; color: #fff; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: 2px solid rgba(255,255,255,0.4); cursor: pointer; transition: border-color 0.2s; }
        .houz-btn-secondary:hover { border-color: #fff; }
        .houz-trust-badges { display: flex; flex-wrap: wrap; gap: 12px; }
        .houz-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 6px 12px; font-size: 13px; }
        .houz-badge-check { color: #86efac; font-size: 14px; }

        .houz-challenges { padding: 80px 24px; background: #fff; }
        .houz-section-inner { max-width: 1200px; margin: 0 auto; }
        .houz-section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 12px; }
        .houz-section-h2 { font-size: clamp(24px, 3vw, 40px); font-weight: 800; margin: 0 0 16px; line-height: 1.2; }
        .houz-section-h2 span { background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .houz-section-sub { font-size: 17px; color: #555; max-width: 700px; margin-bottom: 48px; line-height: 1.6; }
        .houz-challenges-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .houz-challenge-card { background: #f8f9fa; border-radius: 16px; padding: 28px 24px; border: 1px solid #e9ecef; }
        .houz-challenge-icon { width: 48px; height: 48px; background: rgba(${ACCENT_RGB}, 0.07); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .houz-challenge-icon svg { width: 24px; height: 24px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .houz-challenge-title { font-size: 16px; font-weight: 700; margin: 0 0 10px; color: #1a1a2e; }
        .houz-challenge-desc { font-size: 14px; color: #555; line-height: 1.6; margin: 0; }

        .houz-services { padding: 80px 24px; background: linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%); }
        .houz-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .houz-service-card { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(${ACCENT_RGB}, 0.12); border-radius: 16px; padding: 28px 24px; transition: transform 0.2s, box-shadow 0.2s; }
        .houz-service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(${ACCENT_RGB}, 0.12); }
        .houz-service-icon { width: 48px; height: 48px; background: linear-gradient(135deg, rgba(${ACCENT_RGB}, 0.09) 0%, rgba(45,128,0,0.07) 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .houz-service-icon svg { width: 24px; height: 24px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .houz-service-title { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e; }
        .houz-service-desc { font-size: 14px; color: #555; line-height: 1.6; margin: 0; }

        .houz-results { padding: 64px 24px; background: linear-gradient(135deg, #031400 0%, #0a3300 100%); color: #fff; }
        .houz-results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1200px; margin: 0 auto; text-align: center; }
        .houz-result-num { font-size: 52px; font-weight: 900; line-height: 1; display: block; }
        .houz-result-label { font-size: 16px; opacity: 0.8; margin-top: 8px; display: block; }

        .houz-cases { padding: 80px 24px; background: #fff; }
        .houz-cases-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .houz-case-card { background: #fff; border: 1px solid #e9ecef; border-radius: 20px; padding: 36px 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .houz-case-badge { display: inline-block; background: rgba(${ACCENT_RGB}, 0.07); color: ${ACCENT}; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
        .houz-case-seller { font-size: 20px; font-weight: 800; margin: 0 0 20px; color: #1a1a2e; }
        .houz-case-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .houz-case-metric { background: #f8f9fa; border-radius: 10px; padding: 14px 16px; }
        .houz-case-metric-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 4px; }
        .houz-case-metric-val { font-size: 16px; font-weight: 700; color: #1a1a2e; }
        .houz-case-metric-val.houz-after { color: ${ACCENT}; }
        .houz-case-time { font-size: 12px; color: #888; margin-bottom: 20px; font-weight: 600; }
        .houz-case-actions { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .houz-case-action { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #444; line-height: 1.5; }
        .houz-case-action-dot { width: 6px; height: 6px; background: ${ACCENT}; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }

        .houz-process { padding: 80px 24px; background: #fafafa; }
        .houz-process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .houz-step-card { background: #fff; border-radius: 16px; padding: 28px 24px; border: 1px solid #e9ecef; position: relative; overflow: hidden; }
        .houz-step-num { position: absolute; top: 16px; right: 20px; font-size: 56px; font-weight: 900; color: rgba(${ACCENT_RGB}, 0.05); line-height: 1; pointer-events: none; }
        .houz-step-badge { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: ${ACCENT}; color: #fff; border-radius: 10px; font-size: 14px; font-weight: 800; margin-bottom: 16px; }
        .houz-step-title { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e; }
        .houz-step-desc { font-size: 14px; color: #666; line-height: 1.6; margin: 0; }

        .houz-contact { padding: 80px 24px; background: linear-gradient(180deg, #fff 0%, #f8f9fa 100%); }
        .houz-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .houz-contact-h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 800; margin: 0 0 16px; line-height: 1.25; }
        .houz-contact-h2 span { background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .houz-contact-desc { font-size: 16px; color: #555; line-height: 1.7; margin-bottom: 36px; }
        .houz-contact-items { display: flex; flex-direction: column; gap: 16px; }
        .houz-contact-item { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #333; }
        .houz-contact-item svg { width: 20px; height: 20px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
        .houz-form-card { background: #fff; border-radius: 20px; padding: 36px 32px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); border: 1px solid #e9ecef; }
        .houz-form-group { margin-bottom: 20px; }
        .houz-form-label { display: block; font-size: 13px; font-weight: 600; color: #444; margin-bottom: 6px; }
        .houz-form-input, .houz-form-select, .houz-form-textarea { width: 100%; padding: 11px 14px; border: 1.5px solid #dde1e7; border-radius: 8px; font-size: 15px; color: #1a1a2e; background: #fff; box-sizing: border-box; transition: border-color 0.2s; font-family: inherit; }
        .houz-form-input:focus, .houz-form-select:focus, .houz-form-textarea:focus { outline: none; border-color: ${ACCENT}; }
        .houz-form-textarea { resize: vertical; min-height: 110px; }
        .houz-form-submit { width: 100%; background: ${ACCENT}; color: #fff; border: none; border-radius: 8px; padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .houz-form-submit:hover { opacity: 0.88; }
        .houz-success { text-align: center; padding: 40px 20px; }
        .houz-success-icon { font-size: 48px; margin-bottom: 16px; }
        .houz-success-title { font-size: 22px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
        .houz-success-text { font-size: 15px; color: #666; }

        .houz-cta-strip { background: ${ACCENT}; color: #fff; padding: 64px 24px; text-align: center; }
        .houz-cta-strip h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 800; margin: 0 0 12px; }
        .houz-cta-strip p { font-size: 17px; opacity: 0.88; margin: 0 0 28px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .houz-cta-strip-btn { background: #fff; color: ${ACCENT}; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-block; }
        .houz-cta-strip-btn:hover { opacity: 0.9; }

        @media (max-width: 900px) {
          .houz-challenges-grid { grid-template-columns: repeat(2, 1fr); }
          .houz-services-grid { grid-template-columns: repeat(2, 1fr); }
          .houz-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .houz-contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .houz-cases-grid { grid-template-columns: 1fr; }
          .houz-results-grid { grid-template-columns: 1fr; gap: 24px; }
          .houz-process-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .houz-challenges-grid { grid-template-columns: 1fr; }
          .houz-services-grid { grid-template-columns: 1fr; }
          .houz-process-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="houz-page">
        <nav className="houz-breadcrumb">
          <div className="houz-breadcrumb-inner">
            <Link href="/">Home</Link>
            <span className="houz-breadcrumb-sep">›</span>
            <Link href="/marketplace-account-management">Marketplace Management</Link>
            <span className="houz-breadcrumb-sep">›</span>
            <span className="houz-breadcrumb-current">Houzz Product Listing Services</span>
          </div>
        </nav>

        <section className="houz-hero">
          <div className="houz-hero-orb1" />
          <div className="houz-hero-orb2" />
          <div className="houz-hero-inner">
            <div className="houz-eyebrow">
              <span className="houz-eyebrow-dot" />
              Houzz Product Listing Management
            </div>
            <h1>Houzz Product Listing Services That Reach Interior Designers and Luxury Homeowners</h1>
            <p className="houz-hero-desc">
              Houzz has 65 million monthly users — including 3 million home design professionals who actively source and specify products for their clients. 1Solutions creates and optimises your Houzz product listings to meet the aesthetic and technical standards that design professionals expect, and manages your Houzz Pro presence for consistent product discovery and sales.
            </p>
            <div className="houz-stats-bar">
              <div className="houz-stat"><span className="houz-stat-num">65M</span><span className="houz-stat-label">Monthly Houzz users</span></div>
              <div className="houz-stat"><span className="houz-stat-num">3M+</span><span className="houz-stat-label">Home design professionals on Houzz</span></div>
              <div className="houz-stat"><span className="houz-stat-num">$1,500+</span><span className="houz-stat-label">Avg order value on Houzz</span></div>
              <div className="houz-stat"><span className="houz-stat-num">2.4×</span><span className="houz-stat-label">avg product revenue growth</span></div>
            </div>
            <div className="houz-hero-ctas">
              <Link href="#contact" className="houz-btn-primary">Get a Free Houzz Listing Review →</Link>
              <Link href="#services" className="houz-btn-secondary">Explore Services</Link>
            </div>
            <div className="houz-trust-badges">
              {['Houzz Pro expertise', 'Interior design audience specialists', 'Premium imagery standards', 'No lock-in contracts'].map(b => (
                <span key={b} className="houz-badge"><span className="houz-badge-check">✓</span>{b}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="houz-challenges">
          <div className="houz-section-inner">
            <p className="houz-section-label">Common Brand Pain Points</p>
            <h2 className="houz-section-h2">Why <span>Brands Struggle on Houzz</span></h2>
            <p className="houz-section-sub">Four challenges that prevent home furnishings and design brands from reaching the professional buyer audience on Houzz.</p>
            <div className="houz-challenges-grid">
              {challenges.map(c => (
                <div key={c.title} className="houz-challenge-card">
                  <div className="houz-challenge-icon">
                    <svg viewBox="0 0 24 24"><path d={c.icon} /></svg>
                  </div>
                  <h3 className="houz-challenge-title">{c.title}</h3>
                  <p className="houz-challenge-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="houz-services" id="services">
          <div className="houz-section-inner">
            <p className="houz-section-label">Our Services</p>
            <h2 className="houz-section-h2">What Our <span>Houzz Management Covers</span></h2>
            <p className="houz-section-sub">End-to-end Houzz listing management designed to reach and convert the design professional audience.</p>
            <div className="houz-services-grid">
              {services.map(s => (
                <div key={s.title} className="houz-service-card">
                  <div className="houz-service-icon">
                    <svg viewBox="0 0 24 24"><path d={s.icon} /></svg>
                  </div>
                  <h3 className="houz-service-title">{s.title}</h3>
                  <p className="houz-service-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="houz-results">
          <div className="houz-results-grid">
            <div>
              <span className="houz-result-num">2.4×</span>
              <span className="houz-result-label">avg product revenue growth in 6 months</span>
            </div>
            <div>
              <span className="houz-result-num">38%</span>
              <span className="houz-result-label">avg increase in design professional enquiries</span>
            </div>
            <div>
              <span className="houz-result-num">$1,800</span>
              <span className="houz-result-label">avg Houzz order value achieved</span>
            </div>
          </div>
        </section>

        <section className="houz-cases">
          <div className="houz-section-inner">
            <p className="houz-section-label">Client Results</p>
            <h2 className="houz-section-h2">Houzz <span>Success Stories</span></h2>
            <p className="houz-section-sub">Design brands we have grown on Houzz by connecting them with the professional buyer audience.</p>
            <div className="houz-cases-grid">
              {caseStudies.map(cs => (
                <div key={cs.seller} className="houz-case-card">
                  <span className="houz-case-badge">{cs.badge}</span>
                  <h3 className="houz-case-seller">{cs.seller}</h3>
                  <div className="houz-case-metrics">
                    <div className="houz-case-metric">
                      <div className="houz-case-metric-label">Before</div>
                      <div className="houz-case-metric-val">{cs.before}</div>
                    </div>
                    <div className="houz-case-metric">
                      <div className="houz-case-metric-label">After</div>
                      <div className="houz-case-metric-val houz-after">{cs.after}</div>
                    </div>
                  </div>
                  <p className="houz-case-time">Timeline: {cs.time}</p>
                  <ul className="houz-case-actions">
                    {cs.actions.map(a => (
                      <li key={a} className="houz-case-action"><span className="houz-case-action-dot" />{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="houz-process">
          <div className="houz-section-inner">
            <p className="houz-section-label">How We Work</p>
            <h2 className="houz-section-h2">Our <span>6-Step Houzz Launch Process</span></h2>
            <p className="houz-section-sub">A structured approach to building a Houzz presence that converts the high-value design professional audience.</p>
            <div className="houz-process-grid">
              {steps.map(s => (
                <div key={s.n} className="houz-step-card">
                  <span className="houz-step-num">{s.n}</span>
                  <div className="houz-step-badge">{s.n}</div>
                  <h3 className="houz-step-title">{s.title}</h3>
                  <p className="houz-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="houz-contact" id="contact">
          <div className="houz-section-inner">
            <div className="houz-contact-grid">
              <div>
                <p className="houz-section-label">Get Started</p>
                <h2 className="houz-contact-h2">Get a Free <span>Houzz Listing Review</span></h2>
                <p className="houz-contact-desc">We will review your existing Houzz presence or plan your launch — covering listing quality, photography standards, Houzz Pro setup, and the advertising opportunity in your product category.</p>
                <div className="houz-contact-items">
                  <div className="houz-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span>hello@1solutions.biz</span>
                  </div>
                  <div className="houz-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
                    <span>+1 (800) 1SOLUTIONS</span>
                  </div>
                  <div className="houz-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Category advertising opportunity analysis included</span>
                  </div>
                </div>
              </div>
              <div className="houz-form-card">
                {sent ? (
                  <div className="houz-success">
                    <div className="houz-success-icon">✅</div>
                    <div className="houz-success-title">Review Request Received</div>
                    <p className="houz-success-text">We will review your Houzz presence and send you a listing quality and growth opportunity report within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="houz-form-group">
                      <label className="houz-form-label">Full Name *</label>
                      <input className="houz-form-input" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Sarah Williams" />
                    </div>
                    <div className="houz-form-group">
                      <label className="houz-form-label">Email Address *</label>
                      <input className="houz-form-input" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="sarah@yourbrand.com" />
                    </div>
                    <div className="houz-form-group">
                      <label className="houz-form-label">Company / Brand Name</label>
                      <input className="houz-form-input" type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Brand" />
                    </div>
                    <div className="houz-form-group">
                      <label className="houz-form-label">Monthly Houzz Revenue (or expected)</label>
                      <select className="houz-form-select" value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })}>
                        <option>Under $10K/mo</option>
                        <option>$10K-$50K/mo</option>
                        <option>$50K-$200K/mo</option>
                        <option>$200K+/mo</option>
                      </select>
                    </div>
                    <div className="houz-form-group">
                      <label className="houz-form-label">Tell us about your product range</label>
                      <textarea className="houz-form-textarea" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Product categories, number of SKUs, current Houzz URL or new launch..." />
                    </div>
                    <button type="submit" className="houz-form-submit">Request Free Listing Review →</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="houz-cta-strip">
          <h2>Ready to Reach Interior Designers on Houzz?</h2>
          <p>Join design brands growing on Houzz with 1Solutions managing their listings, Pro shop, and advertising to the professional buyer audience.</p>
          <Link href="#contact" className="houz-cta-strip-btn">Get Your Free Listing Review →</Link>
        </section>
      </div>
    </>
  );
}
