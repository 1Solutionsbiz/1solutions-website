import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Custom B2B eCommerce Platform Development', desc: 'Fully bespoke B2B portals built from the ground up — tailored to your buyer workflows, product catalogue complexity, and sales process.' },
  { n: '02', title: 'Wholesale & Bulk Ordering Systems', desc: 'Streamlined bulk order entry, minimum order quantity enforcement, reorder pads, and CSV/spreadsheet upload ordering for high-volume buyers.' },
  { n: '03', title: 'Customer-Specific Pricing & Catalogues', desc: 'Tiered pricing, contract-specific rates, buyer-group catalogues, and hidden products — ensuring every buyer sees exactly what they should.' },
  { n: '04', title: 'Account & User Role Management', desc: 'Multi-user company accounts with configurable roles: buyer, approver, admin. Built-in purchase approval workflows for enterprise procurement.' },
  { n: '05', title: 'ERP, CRM & PIM Integration', desc: 'Native integrations with SAP, NetSuite, Salesforce, HubSpot, Zoho, and custom ERPs — keeping inventory, orders, and customer data perfectly in sync.' },
  { n: '06', title: 'Quote & Custom Order Workflows', desc: 'Request-for-quote (RFQ) modules, custom product configurators, and approval chains that match how your sales team actually closes deals.' },
  { n: '07', title: 'B2B Payment & Credit Terms', desc: 'Net-30/60/90 credit terms, purchase order (PO) payment, trade credit accounts, invoicing, and automated accounts receivable management.' },
  { n: '08', title: 'Self-Service Buyer Portal', desc: 'Give buyers full visibility into their order history, invoices, tracking, returns, and account statements — reducing inbound sales and support load.' },
];

const PLATFORMS = [
  { name: 'WooCommerce B2B', color: '#96588a' },
  { name: 'Shopify Plus', color: '#96BF48' },
  { name: 'Magento / Adobe Commerce', color: '#F46F25' },
  { name: 'BigCommerce B2B', color: '#34495E' },
  { name: 'OroCommerce', color: '#4A90D9' },
  { name: 'Custom Build', color: '#0D9488' },
];

const PROCESS = [
  { step: '01', title: 'Discovery & Requirements Mapping', desc: 'We audit your current sales process, buyer types, pricing complexity, and integration needs to produce a detailed functional requirements document.' },
  { step: '02', title: 'Platform Selection & Architecture', desc: 'We recommend the right platform or custom build approach based on your scale, integration requirements, and long-term growth roadmap.' },
  { step: '03', title: 'UX/UI Design for Buyers & Admins', desc: 'We design buyer-facing storefronts and admin dashboards with your procurement team\'s workflows at the centre — not off-the-shelf templates.' },
  { step: '04', title: 'Development & Integration', desc: 'Full-stack development with priority given to ERP/CRM integrations, pricing engine accuracy, and performance under high SKU counts.' },
  { step: '05', title: 'Testing, Training & Launch', desc: 'Rigorous UAT with your team, admin and buyer training, phased rollout, and a dedicated hypercare period post-launch to resolve any teething issues.' },
];

const WHY = [
  { title: 'B2B-Specific Expertise', desc: 'We\'ve built B2B portals for manufacturers, wholesalers, distributors, and trade suppliers across the US, Canada, and Australia. We know the complexity — pricing tiers, approval chains, integration dependencies — from the inside.' },
  { title: 'Integration-First Approach', desc: 'Your B2B portal is only as good as its data. We architect integrations with ERP, CRM, and PIM systems first, so the storefront always reflects accurate inventory, pricing, and customer data.' },
  { title: 'Buyer & Admin UX Focus', desc: 'B2B UX is not B2C UX. We design for repeat professional buyers who need speed, bulk tools, and account visibility — not for impulse shoppers browsing on a phone.' },
  { title: 'Scalable Architecture', desc: 'From 500 SKUs to 500,000. From 10 buyers to 10,000. We build on proven foundations that scale with your business without requiring costly rebuilds.' },
  { title: '15+ Years of Ecommerce Delivery', desc: 'Since 2008, we\'ve delivered 500+ ecommerce projects. Our experience means we\'ve already solved most of the edge cases you\'ll encounter — and have proven solutions ready.' },
  { title: 'Ongoing Support & Growth', desc: 'Post-launch, we offer dedicated support retainers, quarterly feature roadmap planning, and continuous performance optimisation — not a handoff-and-disappear model.' },
];

const FAQS = [
  {
    q: 'What is B2B eCommerce and how is it different from B2C?',
    a: 'B2B eCommerce (business-to-business) involves selling products or services to other businesses online, rather than to end consumers. The key differences are in complexity: B2B typically requires customer-specific pricing (different rates for different accounts), bulk ordering tools, multi-user company accounts with approval workflows, net payment terms (invoicing, PO payment), and ERP/CRM integration. B2B buyers are also repeat professional purchasers who need speed and self-service efficiency, not the browsing-and-discovery experience optimised for B2C shoppers.',
  },
  {
    q: 'Which platforms do you use for B2B eCommerce development?',
    a: 'Our platform recommendation depends on your specific requirements. For brands already on WordPress/WooCommerce, we extend with B2B plugins and custom development. For enterprise scale and complexity, we recommend Magento/Adobe Commerce or OroCommerce. Shopify Plus is ideal if you need both B2B and DTC on one platform. For highly custom workflows — complex pricing engines, legacy ERP dependencies, or unique buyer journeys — we build custom portals using Laravel or Node.js with a React frontend. We\'ll recommend the right fit during our discovery process.',
  },
  {
    q: 'How much does B2B eCommerce development cost?',
    a: 'B2B eCommerce projects vary significantly based on complexity. A WooCommerce or Shopify Plus B2B setup with standard features (tiered pricing, account management, bulk ordering) typically ranges from $8,000–$25,000. Mid-complexity builds with ERP integration and custom workflows range from $25,000–$75,000. Enterprise custom platforms or heavily integrated builds can exceed $100,000. We provide a detailed fixed-price quote after our discovery workshop — no vague estimates or scope-creep surprises.',
  },
  {
    q: 'How long does a B2B eCommerce development project take?',
    a: 'A standard B2B WooCommerce or Shopify Plus setup takes 8–12 weeks from project kick-off to launch. Mid-complexity builds with ERP integrations typically take 12–20 weeks. Custom platform builds or enterprise projects with extensive integrations and UAT cycles can take 6–12 months. We share a detailed project timeline in the proposal, with clearly defined phases and milestones. We always recommend a phased approach — launching core functionality first, then adding complex features in subsequent sprints.',
  },
  {
    q: 'Can you integrate our ERP or accounting system with the B2B portal?',
    a: 'Yes — ERP and accounting integration is one of our core B2B competencies. We\'ve built native integrations with SAP, Oracle NetSuite, Microsoft Dynamics, MYOB, Xero, QuickBooks, Sage, and custom legacy ERP systems. Integrations typically cover: product/inventory sync, pricing and customer data sync, order push to ERP, invoice generation, and shipment tracking pull-back. We use APIs where available, and build middleware or ETL connectors where direct API access doesn\'t exist.',
  },
  {
    q: 'Can your B2B platform support customer-specific pricing and catalogues?',
    a: 'Yes — this is a fundamental B2B requirement we implement for every client. We support: per-customer pricing overrides, buyer-group tiered pricing (Gold/Silver/Bronze), volume/quantity-break pricing, contract-specific rates, currency-specific pricing for international buyers, and per-account product catalogue restrictions (hide products, categories, or entire ranges from specific buyer groups). Prices are always pulled in real time from the pricing engine or ERP — no manual synchronisation required.',
  },
  {
    q: 'What B2B payment options can you enable?',
    a: 'We support the full range of B2B payment methods: net payment terms (Net-30, Net-60, Net-90), purchase order (PO) payment with PO number capture, trade credit accounts with credit limit enforcement, credit card and ACH/direct debit (via Stripe, PayPal, Braintree), and invoice-based payment with automated reminders. We can integrate with trade credit providers like Apruve or TreviPay for automated credit decisions and risk management. All payment methods can be configured per buyer group or per individual account.',
  },
  {
    q: 'Do you work with manufacturers, wholesalers, and distributors in the US, Canada, and Australia?',
    a: 'Yes — these are our core B2B client types. We\'ve built B2B portals for manufacturers selling direct to trade customers, wholesale distributors managing complex account hierarchies, importers and brand owners running dealer or reseller portals, and industrial suppliers with large SKU counts and complex pricing structures. We work remotely with clients across the US, Canada, and Australia, with full project management, regular video calls, and a dedicated single point of contact throughout.',
  },
];

const STATS = [
  { label: 'B2B Projects Delivered', val: '80+' },
  { label: 'Average Reorder Rate', val: '68%' },
  { label: 'Integrations Built', val: '40+' },
  { label: 'Client Retention', val: '96%' },
];

export default function B2BEcommerce() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120);
          o.disconnect();
        }
      }, { threshold: 0.2 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!whyRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90));
        o.disconnect();
      }
    }, { threshold: 0.1 });
    o.observe(whyRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60));
        o.disconnect();
      }
    }, { threshold: 0.05 });
    o.observe(cardsRef.current);
    return () => o.disconnect();
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'B2B eCommerce Development Services',
        description: 'Custom B2B eCommerce platform development — wholesale portals, bulk ordering, tiered pricing, ERP integration, and buyer self-service for manufacturers, wholesalers, and distributors.',
        provider: {
          '@type': 'Organization',
          name: '1Solutions',
          url: 'https://www.1solutions.biz',
          areaServed: ['US', 'CA', 'AU'],
        },
        serviceType: 'B2B eCommerce Development',
        url: 'https://www.1solutions.biz/b2b-ecommerce',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>B2B eCommerce Development Services | Wholesale Portal & Platform | 1Solutions</title>
        <meta name="description" content="Custom B2B eCommerce solutions for manufacturers, wholesalers & distributors. Wholesale portals, tiered pricing, ERP integration & buyer self-service. US, Canada & Australia." />
        <meta name="keywords" content="b2b ecommerce development, b2b ecommerce solutions, b2b ecommerce platform, wholesale ecommerce development, b2b portal development, b2b ecommerce agency" />
        <link rel="canonical" href="https://www.1solutions.biz/b2b-ecommerce" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="B2B eCommerce Development Services | 1Solutions" />
        <meta property="og:description" content="Custom B2B eCommerce platforms built for manufacturers, wholesalers & distributors. Tiered pricing, ERP integration, bulk ordering & buyer self-service portals." />
        <meta property="og:url" content="https://www.1solutions.biz/b2b-ecommerce" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="B2B eCommerce Development | 1Solutions" />
        <meta name="twitter:description" content="Wholesale portals, ERP integration, tiered pricing & buyer self-service. B2B eCommerce built for scale." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style>{`
          .b2b-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #0F1F40;
            line-height: 1.6;
            overflow-x: hidden;
          }
          .b2b-page *, .b2b-page *::before, .b2b-page *::after { box-sizing: border-box; }

          /* ── Hero ── */
          .b2b-hero {
            background: linear-gradient(135deg, #ecfdf5 0%, #e0f2fe 35%, #eff6ff 65%, #f0fdfa 100%);
            position: relative;
            overflow: hidden;
            padding: 80px 40px 0;
          }
          .b2b-hero-orb1 {
            position: absolute; top: -120px; right: -100px;
            width: 580px; height: 580px; border-radius: 50%;
            background: radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 65%);
            pointer-events: none; filter: blur(30px);
          }
          .b2b-hero-orb2 {
            position: absolute; bottom: 0; left: -100px;
            width: 460px; height: 460px; border-radius: 50%;
            background: radial-gradient(circle, rgba(29,78,216,0.09) 0%, transparent 65%);
            pointer-events: none; filter: blur(30px);
          }
          .b2b-hero-inner {
            max-width: 1280px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            text-align: center;
          }
          .b2b-breadcrumb {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 6px;
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 24px;
            font-weight: 500;
          }
          .b2b-breadcrumb a { color: #6b7280; text-decoration: none; }
          .b2b-breadcrumb a:hover { color: #0D9488; }
          .b2b-breadcrumb span { color: #d1d5db; }
          .b2b-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(13,148,136,0.08);
            border: 1px solid rgba(13,148,136,0.20);
            border-radius: 100px;
            padding: 5px 14px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #0D9488;
            margin-bottom: 28px;
          }
          .b2b-hero-h1 {
            font-size: clamp(2.2rem, 5vw, 3.6rem);
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -1px;
            background: linear-gradient(90deg, #0F3460 0%, #0D9488 50%, #1D4ED8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            max-width: 920px;
            margin-left: auto;
            margin-right: auto;
          }
          .b2b-hero-sub {
            font-size: 1.08rem;
            color: #4A6080;
            line-height: 1.75;
            max-width: 660px;
            margin: 0 auto 36px;
          }
          .b2b-hero-btns {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 56px;
          }
          .b2b-btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #0D9488;
            color: #fff;
            padding: 14px 30px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.25s;
            box-shadow: 0 4px 20px rgba(13,148,136,0.28);
          }
          .b2b-btn-primary:hover {
            background: #0F766E;
            box-shadow: 0 8px 32px rgba(13,148,136,0.38);
            transform: translateY(-2px);
          }
          .b2b-btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.65);
            backdrop-filter: blur(12px);
            border: 1.5px solid rgba(15,52,96,0.18);
            color: #0F3460;
            padding: 14px 30px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.25s;
          }
          .b2b-btn-secondary:hover {
            border-color: #0D9488;
            color: #0D9488;
            transform: translateY(-2px);
          }

          /* Stats bar */
          .b2b-stats-bar {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255,255,255,0.55);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.85);
            border-radius: 20px 20px 0 0;
            box-shadow: 0 4px 24px rgba(13,148,136,0.08);
          }
          .b2b-stat {
            padding: 20px 24px;
            text-align: center;
            border-right: 1px solid rgba(13,148,136,0.08);
          }
          .b2b-stat:last-child { border-right: none; }
          .b2b-stat-label { font-size: 11px; color: #6b7280; font-weight: 500; margin-bottom: 4px; }
          .b2b-stat-val { font-size: 1.6rem; font-weight: 900; color: #0D9488; letter-spacing: -0.5px; }

          /* ── Services ── */
          .b2b-services-section {
            background: #f8fafd;
            padding: 80px 40px;
            box-shadow: 0 -20px 60px rgba(13,148,136,0.07);
          }
          .b2b-services-inner { max-width: 1280px; margin: 0 auto; }
          .b2b-section-eyebrow {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #0D9488;
            margin-bottom: 10px;
            display: block;
          }
          .b2b-section-title {
            font-size: clamp(1.8rem, 4vw, 3rem);
            font-weight: 900;
            line-height: 1.15;
            letter-spacing: -1px;
            background: linear-gradient(90deg, #0F3460 0%, #0D9488 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
          }
          .b2b-section-desc {
            font-size: 15px;
            color: #4A6080;
            line-height: 1.7;
            max-width: 640px;
            margin-bottom: 44px;
          }
          .b2b-services-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
          }
          .b2b-service-card {
            background: linear-gradient(135deg, rgba(236,253,245,0.65) 0%, rgba(255,255,255,0.88) 60%, rgba(224,242,254,0.45) 100%);
            border: 1px solid rgba(255,255,255,0.85);
            border-radius: 20px;
            padding: 26px 22px 22px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(13,148,136,0.06);
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.22s, border-color 0.22s;
          }
          .b2b-service-card.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .b2b-service-card:hover {
            transform: translateY(-6px);
            border-color: rgba(13,148,136,0.30);
            box-shadow: 0 16px 48px rgba(13,148,136,0.12);
          }
          .b2b-card-num {
            position: absolute;
            top: 8px; right: 14px;
            font-size: 72px;
            font-weight: 900;
            line-height: 1;
            color: #0D9488;
            opacity: 0.05;
            letter-spacing: -4px;
            pointer-events: none;
            user-select: none;
          }
          .b2b-service-card h3 {
            font-size: 15px;
            font-weight: 700;
            color: #0F1F40;
            line-height: 1.3;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
          }
          .b2b-service-card p {
            font-size: 13px;
            color: #4A6080;
            line-height: 1.6;
            position: relative;
            z-index: 1;
            margin: 0;
          }

          /* ── Platforms ── */
          .b2b-platforms-section {
            background: #fff;
            padding: 70px 40px;
          }
          .b2b-platforms-inner { max-width: 1280px; margin: 0 auto; }
          .b2b-platforms-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 36px;
          }
          .b2b-platform-pill {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f9fafb;
            border: 1.5px solid #e5e7eb;
            border-radius: 50px;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 600;
            color: #0F1F40;
            transition: all 0.2s;
          }
          .b2b-platform-pill:hover {
            border-color: #0D9488;
            background: #f0fdfa;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(13,148,136,0.12);
          }
          .b2b-platform-dot {
            width: 10px; height: 10px;
            border-radius: 50%;
            flex-shrink: 0;
          }

          /* ── Process ── */
          .b2b-process-section {
            background: linear-gradient(135deg, #ecfdf5 0%, #f0f9ff 50%, #eff6ff 100%);
            padding: 80px 40px;
          }
          .b2b-process-inner { max-width: 900px; margin: 0 auto; }
          .b2b-process-steps {
            display: flex;
            flex-direction: column;
            margin-top: 44px;
          }
          .b2b-process-step {
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 24px;
            align-items: flex-start;
            padding: 28px 0;
            border-bottom: 1px solid rgba(13,148,136,0.10);
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.45s ease, transform 0.45s ease;
          }
          .b2b-process-step:last-child { border-bottom: none; }
          .b2b-process-step.visible { opacity: 1; transform: translateX(0); }
          .b2b-step-num {
            font-size: 3rem;
            font-weight: 900;
            color: rgba(13,148,136,0.15);
            line-height: 1;
            letter-spacing: -2px;
          }
          .b2b-step-body h3 {
            font-size: 1.1rem;
            font-weight: 800;
            color: #0F1F40;
            margin-bottom: 6px;
          }
          .b2b-step-body p {
            font-size: 0.9rem;
            color: #4A6080;
            line-height: 1.7;
            margin: 0;
          }

          /* ── Why Us ── */
          .b2b-why-section {
            background: #fff;
            padding: 80px 40px;
          }
          .b2b-why-inner { max-width: 1280px; margin: 0 auto; }
          .b2b-why-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 44px;
          }
          .b2b-why-card {
            background: linear-gradient(135deg, #f0fdfa 0%, #fff 60%, #eff6ff 100%);
            border: 1px solid rgba(13,148,136,0.10);
            border-radius: 16px;
            padding: 28px;
            opacity: 0;
            transform: translateY(16px);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }
          .b2b-why-card.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .b2b-why-card:hover {
            border-color: rgba(13,148,136,0.25);
            box-shadow: 0 8px 32px rgba(13,148,136,0.08);
          }
          .b2b-why-dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: #0D9488;
            margin-bottom: 16px;
          }
          .b2b-why-card h3 {
            font-size: 1rem;
            font-weight: 800;
            color: #0F1F40;
            margin-bottom: 10px;
          }
          .b2b-why-card p {
            font-size: 0.88rem;
            color: #4A6080;
            line-height: 1.7;
            margin: 0;
          }

          /* ── FAQs ── */
          .b2b-faq-section {
            background: #f8fafd;
            padding: 80px 40px;
          }
          .b2b-faq-inner { max-width: 860px; margin: 0 auto; }
          .b2b-faq-list { margin-top: 44px; }
          .b2b-faq-item {
            border-bottom: 1px solid #e5e7eb;
          }
          .b2b-faq-q {
            width: 100%;
            background: none;
            border: none;
            text-align: left;
            padding: 22px 0;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            cursor: pointer;
            font-family: inherit;
            font-size: 1rem;
            font-weight: 700;
            color: #0F1F40;
            line-height: 1.4;
          }
          .b2b-faq-q:hover { color: #0D9488; }
          .b2b-faq-icon {
            width: 22px; height: 22px;
            border: 2px solid #e5e7eb;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            font-size: 14px;
            color: #9ca3af;
            transition: all 0.2s;
            margin-top: 2px;
          }
          .b2b-faq-item.open .b2b-faq-icon {
            border-color: #0D9488;
            color: #0D9488;
            background: rgba(13,148,136,0.06);
          }
          .b2b-faq-a {
            font-size: 0.92rem;
            color: #4A6080;
            line-height: 1.8;
            overflow: hidden;
            max-height: 0;
            transition: max-height 0.35s ease, padding-bottom 0.35s ease;
          }
          .b2b-faq-item.open .b2b-faq-a {
            max-height: 500px;
            padding-bottom: 22px;
          }

          /* ── CTA ── */
          .b2b-cta-section {
            background: linear-gradient(135deg, rgba(13,148,136,0.06) 0%, rgba(255,255,255,0.80) 40%, rgba(29,78,216,0.05) 100%);
            padding: 90px 40px;
            position: relative;
            overflow: hidden;
          }
          .b2b-cta-orb1 {
            position: absolute; top: -80px; right: -80px;
            width: 360px; height: 360px; border-radius: 50%;
            background: radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 70%);
            pointer-events: none;
          }
          .b2b-cta-orb2 {
            position: absolute; bottom: -60px; left: -60px;
            width: 280px; height: 280px; border-radius: 50%;
            background: radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%);
            pointer-events: none;
          }
          .b2b-cta-inner {
            max-width: 760px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 1;
          }
          .b2b-cta-title {
            font-size: clamp(1.8rem, 3.5vw, 2.8rem);
            font-weight: 900;
            background: linear-gradient(90deg, #0F3460 0%, #0D9488 50%, #1D4ED8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 16px;
            line-height: 1.2;
          }
          .b2b-cta-sub {
            font-size: 1.05rem;
            color: #4A6080;
            line-height: 1.75;
            margin: 0 auto 36px;
            max-width: 540px;
          }
          .b2b-cta-btns {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
          }

          /* ── Responsive ── */
          @media (max-width: 1024px) {
            .b2b-services-grid { grid-template-columns: repeat(2, 1fr); }
            .b2b-why-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 768px) {
            .b2b-hero { padding: 60px 24px 0; }
            .b2b-services-section, .b2b-platforms-section, .b2b-process-section,
            .b2b-why-section, .b2b-faq-section, .b2b-cta-section { padding: 60px 24px; }
            .b2b-stats-bar { grid-template-columns: repeat(2, 1fr); border-radius: 16px 16px 0 0; }
            .b2b-stat:nth-child(2) { border-right: none; }
            .b2b-services-grid { grid-template-columns: 1fr; }
            .b2b-why-grid { grid-template-columns: 1fr; }
            .b2b-process-step { grid-template-columns: 56px 1fr; }
            .b2b-hero-btns { flex-direction: column; align-items: center; }
          }
        `}</style>
      </Head>

      <div className="b2b-page">

        {/* ── HERO ── */}
        <section className="b2b-hero">
          <div className="b2b-hero-orb1" />
          <div className="b2b-hero-orb2" />
          <div className="b2b-hero-inner">
            <nav className="b2b-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Ecommerce Solutions</span>
              <span>/</span>
              <span>Platform Development</span>
              <span>/</span>
              <span style={{ color: '#0D9488' }}>B2B eCommerce</span>
            </nav>
            <span className="b2b-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D9488', display: 'inline-block' }} />
              Platform Development
            </span>
            <h1 className="b2b-hero-h1">
              B2B eCommerce Development Services Built for Scale
            </h1>
            <p className="b2b-hero-sub">
              Custom wholesale portals, tiered pricing engines, ERP integrations, and buyer self-service platforms built for manufacturers, wholesalers, and distributors across the US, Canada, and Australia.
            </p>
            <div className="b2b-hero-btns">
              <Link href="/contact-us" className="b2b-btn-primary">
                Get a Free Discovery Call
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/ecommerce-website-development-services" className="b2b-btn-secondary">
                Explore Ecommerce Services
              </Link>
            </div>

            <div className="b2b-stats-bar">
              {STATS.map(s => (
                <div key={s.label} className="b2b-stat">
                  <div className="b2b-stat-label">{s.label}</div>
                  <div className="b2b-stat-val">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="b2b-services-section">
          <div className="b2b-services-inner">
            <span className="b2b-section-eyebrow">What We Build</span>
            <h2 className="b2b-section-title">B2B eCommerce Services</h2>
            <p className="b2b-section-desc">
              From simple wholesale ordering systems to complex multi-buyer portals with ERP integration — we build the B2B platform your buyers actually want to use.
            </p>
            <div className="b2b-services-grid" ref={cardsRef}>
              {SERVICES.map((s, i) => (
                <div
                  key={s.n}
                  className={`b2b-service-card${visibleCards.includes(i) ? ' visible' : ''}`}
                >
                  <div className="b2b-card-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLATFORMS ── */}
        <section className="b2b-platforms-section">
          <div className="b2b-platforms-inner">
            <span className="b2b-section-eyebrow">Our Tech Stack</span>
            <h2 className="b2b-section-title">Platforms We Build On</h2>
            <p className="b2b-section-desc">
              We&rsquo;re platform-agnostic. We recommend what&rsquo;s right for your scale and complexity — not what&rsquo;s easiest for us to build.
            </p>
            <div className="b2b-platforms-grid">
              {PLATFORMS.map(p => (
                <div key={p.name} className="b2b-platform-pill">
                  <span className="b2b-platform-dot" style={{ background: p.color }} />
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="b2b-process-section">
          <div className="b2b-process-inner">
            <span className="b2b-section-eyebrow">How We Work</span>
            <h2 className="b2b-section-title">Our B2B Development Process</h2>
            <p className="b2b-section-desc">
              A structured 5-phase process that keeps complex B2B projects on track, on budget, and aligned to your business requirements at every stage.
            </p>
            <div className="b2b-process-steps">
              {PROCESS.map((p, i) => (
                <div
                  key={p.step}
                  ref={el => { stepRefs.current[i] = el; }}
                  className={`b2b-process-step${visibleSteps.includes(i) ? ' visible' : ''}`}
                >
                  <div className="b2b-step-num">{p.step}</div>
                  <div className="b2b-step-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="b2b-why-section">
          <div className="b2b-why-inner">
            <span className="b2b-section-eyebrow">Why 1Solutions</span>
            <h2 className="b2b-section-title">Why B2B Brands Choose Us</h2>
            <p className="b2b-section-desc">
              B2B eCommerce is not a template problem. It requires deep understanding of procurement workflows, integration complexity, and buyer behaviour. That&rsquo;s what we bring.
            </p>
            <div className="b2b-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div
                  key={w.title}
                  className={`b2b-why-card${visibleWhy.includes(i) ? ' visible' : ''}`}
                >
                  <div className="b2b-why-dot" />
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="b2b-faq-section">
          <div className="b2b-faq-inner">
            <span className="b2b-section-eyebrow">Common Questions</span>
            <h2 className="b2b-section-title">B2B eCommerce FAQs</h2>
            <p className="b2b-section-desc">
              Answers to the questions we hear most from manufacturers, wholesalers, and distributors exploring B2B eCommerce for the first time — or upgrading an existing platform.
            </p>
            <div className="b2b-faq-list">
              {FAQS.map((f, i) => (
                <div
                  key={i}
                  className={`b2b-faq-item${openFaq === i ? ' open' : ''}`}
                >
                  <button
                    className="b2b-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    aria-expanded={openFaq === i}
                  >
                    {f.q}
                    <span className="b2b-faq-icon" aria-hidden="true">
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className="b2b-faq-a"
                    style={openFaq === i ? { maxHeight: 600, paddingBottom: 22 } : {}}
                  >
                    {f.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="b2b-cta-section">
          <div className="b2b-cta-orb1" />
          <div className="b2b-cta-orb2" />
          <div className="b2b-cta-inner">
            <span className="b2b-section-eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>
              Start Your B2B Project
            </span>
            <h2 className="b2b-cta-title">
              Ready to Build a B2B eCommerce Platform Your Buyers Will Love?
            </h2>
            <p className="b2b-cta-sub">
              Book a free 30-minute discovery call. We&rsquo;ll map your buyer workflows, identify the right platform, and give you a no-obligation project outline with timeline and cost range.
            </p>
            <div className="b2b-cta-btns">
              <Link href="/contact-us" className="b2b-btn-primary">
                Book a Free Discovery Call
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/woocommerce-development-company" className="b2b-btn-secondary">
                See WooCommerce Services
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
