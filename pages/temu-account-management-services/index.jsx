import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#4f0800';
const ACCENT_MID = '#b03000';
const ACCENT_RGB = '79, 8, 0';

const challenges = [
  {
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    title: 'Consignment vs Marketplace Model Confusion',
    desc: 'Temu operates two distinct seller models: a consignment model where Temu sets prices and handles fulfilment, and a marketplace model where sellers set prices and ship directly. Most new sellers do not understand which model they qualify for, or how to optimise within the model they are on, leading to margin erosion and operational confusion.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Price Competition Is Extreme',
    desc: 'Temu is known for ultra-low prices. Sellers who attempt to compete on price alone without a corresponding cost-of-goods advantage will destroy margins. The winning strategy involves selecting the right product categories, positioning on value differentiation within Temu\'s search results, and understanding which of your SKUs are actually viable on the platform.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'GMV Algorithm Not Understood',
    desc: "Temu's search ranking is heavily weighted by GMV (gross merchandise value) — meaning high-volume, lower-priced products rank better than low-volume higher-priced ones. Most sellers run flat catalogues without understanding that Temu rewards velocity above all else.",
  },
  {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
    title: 'US Market Localisation for Cross-Border Sellers',
    desc: 'Non-US sellers need to localise product listings, sizing charts, safety certifications (CPSC, ASTM), and English copywriting for the US market. Listings that are machine-translated or use international sizing without conversion drive high return rates and poor conversion.',
  },
];

const services = [
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'Temu Seller Account Setup',
    desc: 'Model selection (consignment vs marketplace), account registration, product category eligibility review, and initial setup of seller dashboard and logistics settings.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Product Selection & Category Strategy',
    desc: 'Data-driven selection of which products in your catalogue are viable on Temu based on price points, competition density, and GMV potential — avoiding margin-destroying categories.',
  },
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Listing Optimisation for Temu Search',
    desc: "Title optimisation for Temu's GMV-weighted algorithm, keyword integration, product attribute completion, image sequence strategy, and main image A/B testing.",
  },
  {
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    title: 'Pricing & Margin Strategy',
    desc: "Competitive price analysis across Temu's category, pricing that sustains margin while achieving ranking velocity, and promotional pricing calendar tied to Temu's platform-wide sale events.",
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'GMV & Sales Velocity Growth',
    desc: "Tactical promotions, coupon strategy, and Temu Ads to build initial GMV on key SKUs and accelerate organic ranking within the platform's algorithm.",
  },
  {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
    title: 'US Market Localisation',
    desc: 'English copywriting, US sizing chart conversion, CPSC/safety compliance review, and product description adaptation for US buyer expectations.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Temu Advertising Management',
    desc: 'Temu Ads campaign setup and management, bid strategy, and promotion optimisation to maximise visibility during key US shopping events.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Monthly Performance Reporting',
    desc: 'GMV tracking, ranking position monitoring, return rate analysis, ad spend ROI, and a monthly roadmap for catalogue expansion or SKU rationalisation.',
  },
];

const caseStudies = [
  {
    badge: 'Case Study',
    seller: 'AU Consumer Electronics Brand',
    before: '$0 on Temu',
    after: '$34K/mo GMV in 4 months',
    time: '4 months',
    actions: [
      'Marketplace model selected; 48 eligible SKUs identified',
      'US localisation for all listings including safety certs',
      'Temu Ads campaign during Prime competitor events drove initial velocity',
    ],
  },
  {
    badge: 'Case Study',
    seller: 'US Home Decor Brand',
    before: '$8K/mo, 7.2% return rate',
    after: '$29K/mo, 2.1% return rate',
    time: '5 months',
    actions: [
      'Product descriptions rewritten with US material expectations',
      'Dimension and care instruction errors corrected across 90 listings',
      'Pricing recalibrated to target $15-35 GMV-friendly price band',
    ],
  },
];

const steps = [
  { n: '01', title: 'Temu Eligibility & Model Audit', desc: 'Review your product catalogue, pricing structure, and fulfilment capability to determine optimal Temu seller model and which SKUs to launch first.' },
  { n: '02', title: 'Product & Category Strategy', desc: 'Select and prioritise SKUs based on Temu category opportunity, price viability, and GMV potential analysis.' },
  { n: '03', title: 'Account Setup & Listing Build', desc: 'Account registration, US market localisation, listing creation with optimised titles and attributes, and image preparation.' },
  { n: '04', title: 'GMV Velocity Launch', desc: 'Initial promotional pricing, coupon activation, and Temu Ads to build search ranking momentum on priority SKUs.' },
  { n: '05', title: 'Ongoing Optimisation', desc: 'Weekly pricing reviews, ad bid adjustments, return reason analysis, and catalogue expansion planning.' },
  { n: '06', title: 'Monthly Reporting', desc: 'GMV performance, ranking position, return rate, and ad ROI report with next-month growth roadmap.' },
];

const FAQS = [
  { q: "What seller model is best for a new Temu seller?", a: "Temu has two main models: consignment (Temu sets prices, handles fulfilment, owns the customer relationship) and marketplace (seller sets prices, handles shipping). For most sellers new to the US market, we recommend starting with the consignment model to test product demand without fulfilment complexity, then transitioning to the marketplace model for SKUs where you can maintain pricing control and margin." },
  { q: "How does Temu search ranking work and how do you improve it?", a: "Temu search is primarily driven by GMV (gross merchandise value) — high-velocity, competitively priced products rank higher. Secondary factors include listing quality (images, title, attribute completeness), customer ratings, and fulfilment speed. We improve ranking by identifying your highest-potential SKUs, launching with competitive pricing and Temu Ads to build initial velocity, then sustaining momentum with ongoing optimisation." },
  { q: "Can you help us prepare product listings that comply with US safety requirements?", a: "Yes. Products sold to US consumers through Temu must comply with CPSC (Consumer Product Safety Commission) regulations and relevant ASTM standards for applicable categories. We review your product catalogue for compliance gaps, recommend certification requirements, and rewrite product descriptions to include required safety information and accurate specifications." },
  { q: "How long before we see GMV growth on Temu?", a: "Initial GMV typically starts within 2 to 4 weeks of listing launch once Temu Ads are active and initial pricing is competitive. Organic ranking growth, driven by sales velocity accumulation, typically shows meaningful improvement at the 6 to 8 week mark. Most clients see 3 to 5 times their initial monthly GMV within 90 days when we manage the full optimisation and ad strategy." },
  { q: "What do you charge and how is the fee structured?", a: "Our Temu management fee is a flat monthly retainer covering account management, listing optimisation, and ad management. We do not take a percentage of revenue. Pricing depends on catalogue size and ad spend level; contact us for a custom quote based on your specific catalogue and growth goals." },
  { q: "Do you manage both the consignment and marketplace models simultaneously?", a: "Yes. Many sellers run a hybrid approach where top-selling SKUs stay on consignment while new products or margin-sensitive SKUs are managed on the marketplace model. We manage both models within the same account engagement and advise on SKU-level model selection based on your cost structure and pricing competitiveness." },
];

export default function TemuAccountManagement() {
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
        <title>Temu Marketplace Account Management Services | 1Solutions</title>
        <meta name="description" content="Grow on Temu marketplace with 1Solutions. We manage your Temu seller account, listing optimisation, pricing strategy, GMV growth, and US market positioning." />
        <link rel="canonical" href="https://1solutions.biz/temu-account-management-services/" />
      </Head>

      <style>{`
        .temu-page { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; }

        /* Breadcrumb */
        .temu-breadcrumb { background: #f8f9fa; border-bottom: 1px solid #e9ecef; padding: 12px 0; }
        .temu-breadcrumb-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 8px; font-size: 14px; }
        .temu-breadcrumb a { color: ${ACCENT}; text-decoration: none; }
        .temu-breadcrumb a:hover { text-decoration: underline; }
        .temu-breadcrumb-sep { color: #adb5bd; }
        .temu-breadcrumb-current { color: #6c757d; }

        /* Hero */
        .temu-hero { background: linear-gradient(135deg, #1f0300 0%, #4f0800 60%, #7a1200 100%); color: #fff; padding: 80px 24px 72px; position: relative; overflow: hidden; }
        .temu-hero-orb1 { position: absolute; top: -80px; right: -80px; width: 400px; height: 400px; background: rgba(${ACCENT_RGB}, 0.3); border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .temu-hero-orb2 { position: absolute; bottom: -100px; left: -60px; width: 300px; height: 300px; background: rgba(176, 48, 0, 0.2); border-radius: 50%; filter: blur(60px); pointer-events: none; }
        .temu-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .temu-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; padding: 6px 16px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px; }
        .temu-eyebrow-dot { width: 6px; height: 6px; background: #ff6b35; border-radius: 50%; }
        .temu-hero h1 { font-size: clamp(28px, 4vw, 52px); font-weight: 800; line-height: 1.15; max-width: 860px; margin: 0 0 24px; }
        .temu-hero-desc { font-size: 18px; line-height: 1.7; max-width: 760px; opacity: 0.9; margin-bottom: 40px; }
        .temu-stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.15); border-radius: 12px; overflow: hidden; margin-bottom: 40px; }
        .temu-stat { background: rgba(255,255,255,0.08); padding: 20px 16px; text-align: center; }
        .temu-stat-num { font-size: 28px; font-weight: 800; color: #fff; display: block; }
        .temu-stat-label { font-size: 12px; opacity: 0.75; margin-top: 4px; display: block; }
        .temu-hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 36px; }
        .temu-btn-primary { background: #fff; color: ${ACCENT}; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: none; cursor: pointer; transition: transform 0.2s; }
        .temu-btn-primary:hover { transform: translateY(-2px); }
        .temu-btn-secondary { background: transparent; color: #fff; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: 2px solid rgba(255,255,255,0.4); cursor: pointer; transition: border-color 0.2s; }
        .temu-btn-secondary:hover { border-color: #fff; }
        .temu-trust-badges { display: flex; flex-wrap: wrap; gap: 12px; }
        .temu-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 6px 12px; font-size: 13px; }
        .temu-badge-check { color: #4ade80; font-size: 14px; }

        /* Challenges */
        .temu-challenges { padding: 80px 24px; background: #fff; }
        .temu-section-inner { max-width: 1200px; margin: 0 auto; }
        .temu-section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 12px; }
        .temu-section-h2 { font-size: clamp(24px, 3vw, 40px); font-weight: 800; margin: 0 0 16px; line-height: 1.2; }
        .temu-section-h2 span { background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .temu-section-sub { font-size: 17px; color: #555; max-width: 700px; margin-bottom: 48px; line-height: 1.6; }
        .temu-challenges-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .temu-challenge-card { background: #f8f9fa; border-radius: 16px; padding: 28px 24px; border: 1px solid #e9ecef; }
        .temu-challenge-icon { width: 48px; height: 48px; background: rgba(${ACCENT_RGB}, 0.08); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .temu-challenge-icon svg { width: 24px; height: 24px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .temu-challenge-title { font-size: 16px; font-weight: 700; margin: 0 0 10px; color: #1a1a2e; }
        .temu-challenge-desc { font-size: 14px; color: #555; line-height: 1.6; margin: 0; }

        /* Services */
        .temu-services { padding: 80px 24px; background: linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%); }
        .temu-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .temu-service-card { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(${ACCENT_RGB}, 0.12); border-radius: 16px; padding: 28px 24px; transition: transform 0.2s, box-shadow 0.2s; }
        .temu-service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(${ACCENT_RGB}, 0.12); }
        .temu-service-icon { width: 48px; height: 48px; background: linear-gradient(135deg, rgba(${ACCENT_RGB}, 0.1) 0%, rgba(176,48,0,0.08) 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .temu-service-icon svg { width: 24px; height: 24px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .temu-service-title { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e; }
        .temu-service-desc { font-size: 14px; color: #555; line-height: 1.6; margin: 0; }

        /* Results band */
        .temu-results { padding: 64px 24px; background: linear-gradient(135deg, #1f0300 0%, #4f0800 100%); color: #fff; }
        .temu-results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1200px; margin: 0 auto; text-align: center; }
        .temu-result-num { font-size: 52px; font-weight: 900; line-height: 1; display: block; }
        .temu-result-label { font-size: 16px; opacity: 0.8; margin-top: 8px; display: block; }

        /* Case Studies */
        .temu-cases { padding: 80px 24px; background: #fff; }
        .temu-cases-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .temu-case-card { background: #fff; border: 1px solid #e9ecef; border-radius: 20px; padding: 36px 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .temu-case-badge { display: inline-block; background: rgba(${ACCENT_RGB}, 0.08); color: ${ACCENT}; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
        .temu-case-seller { font-size: 20px; font-weight: 800; margin: 0 0 20px; color: #1a1a2e; }
        .temu-case-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .temu-case-metric { background: #f8f9fa; border-radius: 10px; padding: 14px 16px; }
        .temu-case-metric-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 4px; }
        .temu-case-metric-val { font-size: 16px; font-weight: 700; color: #1a1a2e; }
        .temu-case-metric-val.temu-after { color: ${ACCENT}; }
        .temu-case-time { font-size: 12px; color: #888; margin-bottom: 20px; font-weight: 600; }
        .temu-case-actions { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .temu-case-action { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #444; line-height: 1.5; }
        .temu-case-action-dot { width: 6px; height: 6px; background: ${ACCENT}; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }

        /* Process */
        .temu-process { padding: 80px 24px; background: #fafafa; }
        .temu-process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .temu-step-card { background: #fff; border-radius: 16px; padding: 28px 24px; border: 1px solid #e9ecef; position: relative; overflow: hidden; }
        .temu-step-num { position: absolute; top: 16px; right: 20px; font-size: 56px; font-weight: 900; color: rgba(${ACCENT_RGB}, 0.06); line-height: 1; pointer-events: none; }
        .temu-step-badge { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: ${ACCENT}; color: #fff; border-radius: 10px; font-size: 14px; font-weight: 800; margin-bottom: 16px; }
        .temu-step-title { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e; }
        .temu-step-desc { font-size: 14px; color: #666; line-height: 1.6; margin: 0; }

        /* Contact */
        .temu-contact { padding: 80px 24px; background: linear-gradient(180deg, #fff 0%, #f8f9fa 100%); }
        .temu-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .temu-contact-h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 800; margin: 0 0 16px; line-height: 1.25; }
        .temu-contact-h2 span { background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .temu-contact-desc { font-size: 16px; color: #555; line-height: 1.7; margin-bottom: 36px; }
        .temu-contact-items { display: flex; flex-direction: column; gap: 16px; }
        .temu-contact-item { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #333; }
        .temu-contact-item svg { width: 20px; height: 20px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
        .temu-form-card { background: #fff; border-radius: 20px; padding: 36px 32px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); border: 1px solid #e9ecef; }
        .temu-form-group { margin-bottom: 20px; }
        .temu-form-label { display: block; font-size: 13px; font-weight: 600; color: #444; margin-bottom: 6px; }
        .temu-form-input, .temu-form-select, .temu-form-textarea { width: 100%; padding: 11px 14px; border: 1.5px solid #dde1e7; border-radius: 8px; font-size: 15px; color: #1a1a2e; background: #fff; box-sizing: border-box; transition: border-color 0.2s; font-family: inherit; }
        .temu-form-input:focus, .temu-form-select:focus, .temu-form-textarea:focus { outline: none; border-color: ${ACCENT}; }
        .temu-form-textarea { resize: vertical; min-height: 110px; }
        .temu-form-submit { width: 100%; background: ${ACCENT}; color: #fff; border: none; border-radius: 8px; padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .temu-form-submit:hover { opacity: 0.88; }
        .temu-success { text-align: center; padding: 40px 20px; }
        .temu-success-icon { font-size: 48px; margin-bottom: 16px; }
        .temu-success-title { font-size: 22px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
        .temu-success-text { font-size: 15px; color: #666; }

        /* CTA strip */
        .temu-cta-strip { background: ${ACCENT}; color: #fff; padding: 64px 24px; text-align: center; }
        .temu-cta-strip h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 800; margin: 0 0 12px; }
        .temu-cta-strip p { font-size: 17px; opacity: 0.88; margin: 0 0 28px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .temu-cta-strip-btn { background: #fff; color: ${ACCENT}; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-block; }
        .temu-cta-strip-btn:hover { opacity: 0.9; }

        @media (max-width: 900px) {
          .temu-challenges-grid { grid-template-columns: repeat(2, 1fr); }
          .temu-services-grid { grid-template-columns: repeat(2, 1fr); }
          .temu-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .temu-contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .temu-cases-grid { grid-template-columns: 1fr; }
          .temu-results-grid { grid-template-columns: 1fr; gap: 24px; }
          .temu-process-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .temu-challenges-grid { grid-template-columns: 1fr; }
          .temu-services-grid { grid-template-columns: 1fr; }
          .temu-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .temu-process-grid { grid-template-columns: 1fr; }
        }
        /* ── FAQ ── */
        .temu-faq-sec { padding:80px 24px;background:#f8fafd;border-top:1px solid rgba(${ACCENT_RGB},0.08); }
        .temu-faq-inner { max-width:1200px;margin:0 auto; }
        .temu-faq-h { font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${ACCENT} 0%,${ACCENT_MID} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 36px;line-height:1.15; }
        .temu-faq-list { display:flex;flex-direction:column;gap:12px; }
        .temu-faq-item { background:linear-gradient(135deg,rgba(${ACCENT_RGB},0.06) 0%,rgba(255,255,255,0.85) 60%,rgba(${ACCENT_RGB},0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(${ACCENT_RGB},0.07);transition:border-color 0.2s;position:relative; }
        .temu-faq-item.open { border-color:rgba(${ACCENT_RGB},0.30); }
        .temu-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:${ACCENT};border-radius:3px 0 0 3px; }
        .temu-faq-btn { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
        .temu-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(${ACCENT_RGB},0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
        .temu-faq-item.open .temu-faq-q-badge { background:${ACCENT};color:#fff; }
        .temu-faq-btn span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45; }
        .temu-faq-item.open .temu-faq-btn span { color:${ACCENT}; }
        .temu-faq-chev { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
        .temu-faq-item.open .temu-faq-chev { transform:rotate(180deg);color:${ACCENT}; }
        .temu-faq-ans-wrap { overflow:hidden;max-height:0;transition:max-height 0.35s ease; }
        .temu-faq-item.open .temu-faq-ans-wrap { max-height:500px; }
        .temu-faq-ans { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
        .temu-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:${ACCENT};color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }
        /* ── Related Services ── */
        .temu-rel-sec { background:rgba(${ACCENT_RGB},0.04);border-top:1px solid rgba(${ACCENT_RGB},0.08);padding:80px 24px; }
        .temu-rel-inner { max-width:1200px;margin:0 auto;text-align:center; }
        .temu-rel-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
        .temu-rel-h { font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${ACCENT} 0%,${ACCENT_MID} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px;line-height:1.15; }
        .temu-rel-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
        .temu-rel-div { border:none;border-top:1px solid rgba(${ACCENT_RGB},0.12);margin:40px 0; }
        .temu-rel-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
        .temu-rtag { display:inline-flex;align-items:center;padding:8px 16px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;border:1.5px solid;transition:all 0.2s; }
        .temu-rtag:hover { transform:translateY(-2px); }
        .temu-rtag-a { background:rgba(${ACCENT_RGB},0.08);color:${ACCENT};border-color:rgba(${ACCENT_RGB},0.25); }
        .temu-rtag-b { background:rgba(79,70,229,0.07);color:#4338ca;border-color:rgba(79,70,229,0.22); }
        .temu-rtag-c { background:rgba(5,150,105,0.07);color:#047857;border-color:rgba(5,150,105,0.22); }
        .temu-rtag-d { background:rgba(217,119,6,0.07);color:#b45309;border-color:rgba(217,119,6,0.22); }
        .temu-rtag-e { background:rgba(219,39,119,0.07);color:#be185d;border-color:rgba(219,39,119,0.22); }
        .temu-rtag-f { background:rgba(8,145,178,0.07);color:#0e7490;border-color:rgba(8,145,178,0.22); }
      `}</style>

      <div className="temu-page">
        {/* Breadcrumb */}
        <nav className="temu-breadcrumb">
          <div className="temu-breadcrumb-inner">
            <Link href="/">Home</Link>
            <span className="temu-breadcrumb-sep">›</span>
            <Link href="/marketplace-account-management">Marketplace Management</Link>
            <span className="temu-breadcrumb-sep">›</span>
            <span className="temu-breadcrumb-current">Temu Account Management</span>
          </div>
        </nav>

        {/* Hero */}
        <section className="temu-hero">
          <div className="temu-hero-orb1" />
          <div className="temu-hero-orb2" />
          <div className="temu-hero-inner">
            <div className="temu-eyebrow">
              <span className="temu-eyebrow-dot" />
              Temu Seller Management
            </div>
            <h1>Temu Marketplace Management for Brands Competing in the New Price-First Market</h1>
            <p className="temu-hero-desc">
              Temu has grown to 100M+ US users in under two years, reshaping consumer price expectations across every category. 1Solutions helps brands launch, optimise, and scale on Temu with a strategy built around the platform's unique consignment and marketplace models, pricing dynamics, and GMV-based ranking algorithm.
            </p>
            <div className="temu-stats-bar">
              <div className="temu-stat"><span className="temu-stat-num">100M+</span><span className="temu-stat-label">Temu US users in 2 years</span></div>
              <div className="temu-stat"><span className="temu-stat-num">$15B+</span><span className="temu-stat-label">Temu global GMV (2023)</span></div>
              <div className="temu-stat"><span className="temu-stat-num">Top 10</span><span className="temu-stat-label">Shopping app worldwide</span></div>
              <div className="temu-stat"><span className="temu-stat-num">3.2×</span><span className="temu-stat-label">avg GMV growth in 5 months</span></div>
            </div>
            <div className="temu-hero-ctas">
              <Link href="#contact" className="temu-btn-primary">Get a Free Temu Assessment →</Link>
              <Link href="#services" className="temu-btn-secondary">Explore Services</Link>
            </div>
            <div className="temu-trust-badges">
              {['Temu certified partner', 'Cross-border logistics expertise', 'US market localisation', 'No lock-in contracts'].map(b => (
                <span key={b} className="temu-badge"><span className="temu-badge-check">✓</span>{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="temu-challenges">
          <div className="temu-section-inner">
            <p className="temu-section-label">Common Seller Pain Points</p>
            <h2 className="temu-section-h2">Why <span>Temu Sellers Struggle</span></h2>
            <p className="temu-section-sub">Most sellers entering Temu underestimate the platform's unique dynamics. Here are the four challenges we see most often.</p>
            <div className="temu-challenges-grid">
              {challenges.map(c => (
                <div key={c.title} className="temu-challenge-card">
                  <div className="temu-challenge-icon">
                    <svg viewBox="0 0 24 24"><path d={c.icon} /></svg>
                  </div>
                  <h3 className="temu-challenge-title">{c.title}</h3>
                  <p className="temu-challenge-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="temu-services" id="services">
          <div className="temu-section-inner">
            <p className="temu-section-label">Our Services</p>
            <h2 className="temu-section-h2">What Our <span>Temu Management Covers</span></h2>
            <p className="temu-section-sub">End-to-end Temu account management across every lever that drives GMV growth and margin sustainability.</p>
            <div className="temu-services-grid">
              {services.map(s => (
                <div key={s.title} className="temu-service-card">
                  <div className="temu-service-icon">
                    <svg viewBox="0 0 24 24"><path d={s.icon} /></svg>
                  </div>
                  <h3 className="temu-service-title">{s.title}</h3>
                  <p className="temu-service-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results band */}
        <section className="temu-results">
          <div className="temu-results-grid">
            <div>
              <span className="temu-result-num">3.2×</span>
              <span className="temu-result-label">avg GMV growth in first 5 months</span>
            </div>
            <div>
              <span className="temu-result-num">Top 3</span>
              <span className="temu-result-label">search position for target categories</span>
            </div>
            <div>
              <span className="temu-result-num">2.1%</span>
              <span className="temu-result-label">avg return rate achieved</span>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="temu-cases">
          <div className="temu-section-inner">
            <p className="temu-section-label">Client Results</p>
            <h2 className="temu-section-h2">Temu <span>Success Stories</span></h2>
            <p className="temu-section-sub">Real results from brands we have launched and scaled on Temu.</p>
            <div className="temu-cases-grid">
              {caseStudies.map(cs => (
                <div key={cs.seller} className="temu-case-card">
                  <span className="temu-case-badge">{cs.badge}</span>
                  <h3 className="temu-case-seller">{cs.seller}</h3>
                  <div className="temu-case-metrics">
                    <div className="temu-case-metric">
                      <div className="temu-case-metric-label">Before</div>
                      <div className="temu-case-metric-val">{cs.before}</div>
                    </div>
                    <div className="temu-case-metric">
                      <div className="temu-case-metric-label">After</div>
                      <div className="temu-case-metric-val temu-after">{cs.after}</div>
                    </div>
                  </div>
                  <p className="temu-case-time">Timeline: {cs.time}</p>
                  <ul className="temu-case-actions">
                    {cs.actions.map(a => (
                      <li key={a} className="temu-case-action"><span className="temu-case-action-dot" />{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="temu-process">
          <div className="temu-section-inner">
            <p className="temu-section-label">How We Work</p>
            <h2 className="temu-section-h2">Our <span>6-Step Temu Launch Process</span></h2>
            <p className="temu-section-sub">A structured process built from dozens of Temu launches across consumer categories.</p>
            <div className="temu-process-grid">
              {steps.map(s => (
                <div key={s.n} className="temu-step-card">
                  <span className="temu-step-num">{s.n}</span>
                  <div className="temu-step-badge">{s.n}</div>
                  <h3 className="temu-step-title">{s.title}</h3>
                  <p className="temu-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="temu-contact" id="contact">
          <div className="temu-section-inner">
            <div className="temu-contact-grid">
              <div>
                <p className="temu-section-label">Get Started</p>
                <h2 className="temu-contact-h2">Get a Free <span>Temu Catalogue Assessment</span></h2>
                <p className="temu-contact-desc">We will review your product catalogue and tell you which SKUs are viable on Temu, what model you should use, and how to launch profitably in the US market.</p>
                <div className="temu-contact-items">
                  <div className="temu-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span>hello@1solutions.biz</span>
                  </div>
                  <div className="temu-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
                    <span>+1 (800) 1SOLUTIONS</span>
                  </div>
                  <div className="temu-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Response within 24 business hours</span>
                  </div>
                </div>
              </div>
              <div className="temu-form-card">
                {sent ? (
                  <div className="temu-success">
                    <div className="temu-success-icon">✅</div>
                    <div className="temu-success-title">Assessment Request Received</div>
                    <p className="temu-success-text">We will review your catalogue and get back to you within one business day with our findings.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="temu-form-group">
                      <label className="temu-form-label">Full Name *</label>
                      <input className="temu-form-input" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" />
                    </div>
                    <div className="temu-form-group">
                      <label className="temu-form-label">Email Address *</label>
                      <input className="temu-form-input" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@yourbrand.com" />
                    </div>
                    <div className="temu-form-group">
                      <label className="temu-form-label">Company / Brand Name</label>
                      <input className="temu-form-input" type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Brand" />
                    </div>
                    <div className="temu-form-group">
                      <label className="temu-form-label">Monthly Revenue (Current)</label>
                      <select className="temu-form-select" value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })}>
                        <option>Under $10K/mo</option>
                        <option>$10K–$50K/mo</option>
                        <option>$50K–$200K/mo</option>
                        <option>$200K+/mo</option>
                      </select>
                    </div>
                    <div className="temu-form-group">
                      <label className="temu-form-label">Tell us about your catalogue</label>
                      <textarea className="temu-form-textarea" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Product categories, number of SKUs, current marketplaces..." />
                    </div>
                    <button type="submit" className="temu-form-submit">Request Free Assessment →</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="temu-faq-sec" id="faq">
          <div className="temu-faq-inner">
            <h2 className="temu-faq-h">Frequently Asked Questions</h2>
            <div className="temu-faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className={'temu-faq-item' + (openFaq === i ? ' open' : '')}>
                  <button className="temu-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <div className="temu-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="temu-faq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="temu-faq-ans-wrap">
                    <div className="temu-faq-ans"><span className="temu-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="temu-rel-sec">
          <div className="temu-rel-inner">
            <span className="temu-rel-eyebrow">PLATFORM RELATED OFFERINGS</span>
            <h2 className="temu-rel-h">Explore Related Services and Technologies</h2>
            <p className="temu-rel-sub">Pair our Temu marketplace expertise with complementary services to build a complete eCommerce growth strategy across platforms.</p>
            <hr className="temu-rel-div" />
            <div className="temu-rel-tags">
              <Link href="/amazon-account-management-services/" className="temu-rtag temu-rtag-a">Amazon Management</Link>
              <Link href="/ebay-account-management-services/" className="temu-rtag temu-rtag-b">eBay Management</Link>
              <Link href="/ecommerce-seo-services/" className="temu-rtag temu-rtag-c">eCommerce SEO</Link>
              <Link href="/google-shopping-management/" className="temu-rtag temu-rtag-d">Google Shopping Ads</Link>
              <Link href="/social-media-marketing-services/" className="temu-rtag temu-rtag-e">Social Commerce</Link>
              <Link href="/email-marketing-services/" className="temu-rtag temu-rtag-f">Email Automation</Link>
              <Link href="/woocommerce-development-company/" className="temu-rtag temu-rtag-a">WooCommerce Development</Link>
              <Link href="/ecommerce-website-development-services/" className="temu-rtag temu-rtag-b">eCommerce Development</Link>
              <Link href="/walmart-account-management-services/" className="temu-rtag temu-rtag-c">Walmart Marketplace</Link>
              <Link href="/flipkart-account-management-services/" className="temu-rtag temu-rtag-d">Flipkart Management</Link>
              <Link href="/magento-development-company/" className="temu-rtag temu-rtag-e">Magento Development</Link>
              <Link href="/amazon-fba-shipment-reconciliation-services/" className="temu-rtag temu-rtag-f">Amazon FBA Reconciliation</Link>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="temu-cta-strip">
          <h2>Ready to Launch on Temu?</h2>
          <p>Join brands already growing on Temu with 1Solutions managing their account, listings, and advertising.</p>
          <Link href="#contact" className="temu-cta-strip-btn">Get Your Free Assessment →</Link>
        </section>
      </div>
    </>
  );
}
