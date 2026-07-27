import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ALL_TESTIMONIALS = [
  { initials:'SR', bg:'#0F3460', name:'Sarah Reynolds', role:'LuxeFragrance Co. — USA', text:'"1Solutions rebuilt our Shopify store completely. Average order value increased by 40% in the first three months post-launch."' },
  { initials:'DJ', bg:'#D97706', name:'David James', role:'AgriSupply Direct — Australia', text:'"B2B WooCommerce with SAP integration and customer group pricing — delivered on spec and on time. Highly recommended."' },
  { initials:'MF', bg:'#1E3A8A', name:'Michelle Forbes', role:'TechZone — Canada', text:'"Magento 2 migration — 80,000 SKUs, zero data loss, seamless cutover. We\'ve been on a retainer with them ever since."' },
  { initials:'NK', bg:'#047857', name:'Nathan King', role:'PetPremium Direct — UK', text:'"From 45-second Magento 1 loads to sub-2-second headless Next.js. Conversion rate up 28% in 90 days. Remarkable."' },
  { initials:'AL', bg:'#7C3AED', name:'Amelia Lee', role:'NovaBrands — USA', text:'"Custom product configurator with 3D views, engraving, and variant bundles — exactly what we scoped, delivered on time."' },
  { initials:'JM', bg:'#B45309', name:'James Mitchell', role:'SportCore — Australia', text:'"12,000-product OpenCart to WooCommerce migration. Zero data loss, SEO preserved, launched on schedule."' },
  { initials:'PC', bg:'#0F3460', name:'Patricia Chen', role:'OrganicHarvest — Canada', text:'"The subscription bundle system they built on WooCommerce added $40k/month in recurring revenue. Night and day difference."' },
  { initials:'RM', bg:'#D97706', name:'Robert Moore', role:'GearZone Pro — UK', text:'"B2B portal for 2,000 trade accounts with tiered pricing and RFQ workflow. Replaced a system costing us 3× as much."' },
  { initials:'SW', bg:'#0891B2', name:'Sophie Walker', role:'BeautyVault — USA', text:'"Our Shopify redesign actually increased organic traffic 18% in the first month. A rare outcome for any major rebuild."' },
  { initials:'TN', bg:'#16a34a', name:'Tom Nakamura', role:'CraftBrew Direct — USA', text:'"Shopify, Klaviyo, Gorgias, LoyaltyLion — all integrated and automated. What took 3 hours/day now runs automatically."' },
];
const firstRow = [...ALL_TESTIMONIALS.slice(0, 5), ...ALL_TESTIMONIALS.slice(0, 5)];
const secondRow = [...ALL_TESTIMONIALS.slice(5), ...ALL_TESTIMONIALS.slice(5)];

const SERVICES = [
  { n:'01', title:'Custom eCommerce Website Development', desc:'Fully bespoke online stores built from the ground up - architected around your catalogue, business model, and conversion goals, not retrofitted into a generic template.', featured:false },
  { n:'02', title:'Shopify Store Development', desc:'Custom Shopify themes, private apps, and headless Shopify storefronts for fast, scalable DTC and B2B stores. Expert Shopify Plus development for enterprise-grade needs.', featured:true },
  { n:'03', title:'WooCommerce Development', desc:'Flexible, SEO-friendly WooCommerce stores with custom plugins, product configurators, subscription systems, and B2B wholesale features built on WordPress.', featured:false },
  { n:'04', title:'Magento / Adobe Commerce Development', desc:'High-performance Magento 2 and Adobe Commerce stores for complex catalogues, multi-store networks, and enterprise e-commerce with ERP, PIM, and OMS integrations.', featured:false },
  { n:'05', title:'OpenCart Development', desc:'Lightweight, cost-effective OpenCart stores with custom extensions, multi-store configuration, and version upgrades for businesses that need power without the overhead.', featured:false },
  { n:'06', title:'Headless & Composable Commerce', desc:'Decouple your frontend from your commerce engine. Next.js or Nuxt storefronts backed by Shopify, WooCommerce, or a custom API layer - ultra-fast Core Web Vitals scores.', featured:false },
  { n:'07', title:'B2B eCommerce Development', desc:'Build B2B portals with customer group pricing, RFQ/quote systems, PO-based checkout, company account management, and deep ERP/CRM integration tailored to your sales process.', featured:false },
  { n:'08', title:'eCommerce UI/UX Design', desc:'Conversion-focused store design - from wireframes and user journey mapping to pixel-perfect UI built for mobile-first browsing, fast checkout, and reduced cart abandonment.', featured:false },
  { n:'09', title:'Platform Migration', desc:'Zero-data-loss migrations between any e-commerce platforms - Shopify to WooCommerce, Magento 1 to Magento 2, OpenCart to Shopify - with full SEO and URL preservation.', featured:false },
  { n:'10', title:'eCommerce SEO & Performance', desc:'Technical SEO audits, Core Web Vitals optimisation, schema markup, URL structure, and content strategy to rank your store higher and turn organic traffic into revenue.', featured:false },
  { n:'11', title:'Payment & Shipping Integration', desc:'Integrate Stripe, PayPal, Klarna, Afterpay, Razorpay, and 40+ payment gateways alongside FedEx, UPS, DHL, and regional carriers with real-time rates and tracking.', featured:false },
  { n:'12', title:'eCommerce Maintenance & Support', desc:'Proactive security updates, performance monitoring, bug fixes, extension updates, and dedicated support - keeping your store fast, secure, and converting 24/7.', featured:false },
];

const FAQS = [
  { q:'Which eCommerce platform is best for my business?', a:"It depends on your catalogue size, budget, technical team, and growth trajectory. Shopify is ideal for fast-moving DTC brands wanting simplicity and scale. WooCommerce is best when you want full ownership and flexibility on a WordPress stack. Magento/Adobe Commerce suits large enterprises with complex catalogues and ERP dependencies. OpenCart is a strong choice for cost-effective mid-size stores. Custom-built solutions make sense for businesses with truly unique workflows no off-the-shelf platform handles well. We'll recommend the right platform after a free discovery call - we have deep expertise across all of them." },
  { q:'How much does eCommerce website development cost?', a:'An eCommerce website can cost anywhere from $2,500 for a standard Shopify or WooCommerce store to $50,000+ for a fully custom-built, multi-store, ERP-integrated enterprise platform. The key cost drivers are: platform choice, catalogue complexity, number of custom integrations, design complexity, and level of custom functionality required. We provide a fixed-price quote after a detailed scope discussion - no hourly billing surprises.' },
  { q:'How long does it take to build an eCommerce website?', a:'A standard store on Shopify or WooCommerce typically takes 3–6 weeks from kick-off to launch. A complex custom build with multiple integrations and unique functionality can take 3–6 months. We share a detailed timeline milestone plan in the proposal stage so you know exactly what to expect at every phase.' },
  { q:'Can you migrate my existing store to a new platform?', a:'Yes - platform migration is one of our core services. We migrate stores between Shopify, WooCommerce, Magento, OpenCart, PrestaShop, BigCommerce, and custom-built platforms. Our migration process preserves all products, customer records, order history, SEO URLs, and 301 redirects. We test thoroughly on staging before any live cutover.' },
  { q:'Will my eCommerce store be optimised for mobile?', a:'Absolutely. Every store we build is mobile-first by design - not mobile-responsive as an afterthought. This includes touch-friendly navigation, fast mobile load times, simplified checkout flows for thumb use, and full testing across iOS and Android on real devices. Given that over 60% of e-commerce traffic comes from mobile, this is non-negotiable in our process.' },
  { q:'Do you handle SEO as part of eCommerce development?', a:'Yes. SEO foundations are built into every project: clean URL structures, canonical tags, Product and BreadcrumbList schema markup, Open Graph meta, XML sitemaps, robots.txt, and Core Web Vitals optimisation. We also offer ongoing eCommerce SEO retainers covering technical audits, keyword strategy, content, and link building for stores that want to own their organic channel.' },
  { q:'Can you integrate my store with our ERP, CRM, or inventory system?', a:'Yes. We regularly integrate eCommerce platforms with SAP, Oracle NetSuite, Microsoft Dynamics, Salesforce CRM, HubSpot, Brightpearl, TradeGecko/Cin7, and custom-built internal systems via REST APIs, webhooks, and middleware. We handle both real-time sync and scheduled batch integrations depending on your system\'s architecture.' },
  { q:'Do you provide post-launch support and maintenance?', a:'Yes. We offer flexible maintenance retainers that cover security patching, platform and plugin updates, performance monitoring, bug fixes, and new feature development hours each month. Our clients on retainer get priority response times and a dedicated point of contact who knows their store inside and out.' },
  { q:'Do you work with clients in the US, Canada, Australia, and the UK remotely?', a:'Yes - 100% of our project delivery is remote. We have worked with US, Canadian, Australian, and UK businesses since 2008. We schedule discovery calls, sprint reviews, and milestone sign-offs in your time zone, collaborate via Slack and Loom, and provide full project transparency at every stage. Our 97% client retention rate reflects how well this model works.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>, title:'Platform-Agnostic Expertise', desc:"We don't push one platform. Our team has shipped production stores on Shopify, WooCommerce, Magento, OpenCart, and custom stacks - so you get the platform that's right for your business, not the one we're most comfortable billing hours on." },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Western Market Specialists', desc:'Since 2008, we have built e-commerce stores for US, Canadian, Australian, and UK businesses. We understand your market expectations, compliance requirements, and quality bar - delivering at offshore rates without offshore quality compromises.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'Conversion-First Approach', desc:'Every design decision, UX flow, and performance optimisation is made with one question in mind: will this help more visitors become buyers? We measure success in revenue, not just design awards.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our structured 4D process (Discover → Define → Develop → Deploy) ensures projects are scoped accurately from day one. No surprise overruns, no scope creep billing, no last-minute excuses.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'SEO Built In From Day One', desc:'Schema markup, clean URLs, Core Web Vitals, and on-page SEO are baked into our development process - not treated as an optional add-on or afterthought that doubles the bill at the end.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Full-Stack eCommerce Capability', desc:'Design, development, integrations, migrations, SEO, maintenance - all under one roof. No coordinating between multiple agencies or freelancers for different parts of the same project.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Point of Contact', desc:'A single project manager who knows your store, understands your goals, schedules calls in your time zone, and keeps you informed - never a ticket queue or a new face every sprint.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership Focus', desc:'97% client retention rate. We remain invested in your growth beyond launch - through maintenance retainers, ongoing SEO, feature roadmaps, and scale-up support as your business grows.' },
];

export default function EcommerceWebsiteDevelopmentServices() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const stepRefs = useRef([]);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleSteps(prev => prev.includes(i) ? prev : [...prev, i]), i * 150);
            obs.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          WHY.forEach((_, i) => setTimeout(() => setVisibleWhyCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 100));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(whyGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i)?p:[...p,i]), i * 150));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(testiGridRef.current);
    return () => obs.disconnect();
  }, []);


  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, key]));
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 8);

  const [_sfSt, _setSfSt] = useState('idle');
  const _sfSubmit = async (e) => {
    e.preventDefault();
    _setSfSt('loading');
    try {
      const fd = new FormData(e.target);
      const token = await new Promise(r => window.grecaptcha.ready(() =>
        window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'contact' }).then(r)));
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('sf-name') || '', email: fd.get('sf-email') || '',
          phone: (fd.get('sf-cc') ? fd.get('sf-cc') + ' ' : '') + (fd.get('sf-phone') || ''),
          company: fd.get('sf-company') || '', message: fd.get('sf-message') || '',
          source: 'Ecommerce Website Development Services', consent: true, recaptchaToken: token,
        }),
      });
      if (res.ok) { window.location.href = '/thank-you/'; } else { _setSfSt('error'); }
    } catch { _setSfSt('error'); }
  };

  return (
    <>
      <Head>
        <title>eCommerce Development Company | Custom Online Stores | 1Solutions</title>
        <meta name="description" content="Custom eCommerce development on Shopify, WooCommerce, Magento & OpenCart. 15+ years, 300+ stores delivered. US, Canada & Australia. Get a free quote." />
        <meta name="keywords" content="ecommerce website development, ecommerce development services, ecommerce development company, online store development, shopify development, woocommerce development, magento development, custom ecommerce development" />
        <link rel="canonical" href="https://www.1solutions.biz/ecommerce-website-development-services/" />
        <meta property="og:title" content="eCommerce Website Development Services | 1Solutions" />
        <meta property="og:description" content="Build fast, scalable, and conversion-optimised online stores with 1Solutions' expert eCommerce development team. Shopify, WooCommerce, Magento, OpenCart & custom." />
        <meta property="og:url" content="https://www.1solutions.biz/ecommerce-website-development-services/" />
        <style>{`
          .ecom-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: scroll;
            color: #0f172a;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .ecom-page *, .ecom-page *::before, .ecom-page *::after { box-sizing: border-box; }

          /* Orbs */
          .ecom-aurora { position:absolute; inset:-15%; z-index:0; pointer-events:none; filter:blur(70px) saturate(150%); animation:ecom-aurora-drift 20s ease-in-out infinite alternate; }
          .ecom-aurora-b1 { position:absolute; left:20%; top:30%; width:65%; height:65%; border-radius:50%; background:radial-gradient(circle at center,rgba(15,52,96,0.28) 0%,transparent 70%); transform:translate(-50%,-50%); }
          .ecom-aurora-b2 { position:absolute; left:78%; top:22%; width:48%; height:48%; border-radius:50%; background:radial-gradient(circle at center,rgba(217,119,6,0.20) 0%,transparent 70%); transform:translate(-50%,-50%); }
          .ecom-aurora-b3 { position:absolute; left:50%; top:82%; width:55%; height:55%; border-radius:50%; background:radial-gradient(circle at center,rgba(26,82,118,0.16) 0%,transparent 70%); transform:translate(-50%,-50%); }
          @keyframes ecom-aurora-drift { 0%{transform:translate3d(0,0,0) scale(1)} 100%{transform:translate3d(-4%,3%,0) scale(1.10)} }

          /* Platform badges */


          /* Shared section tokens */
          .ecom-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .ecom-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .ecom-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .ecom-section-sub  { font-size:16px;color:#4A6080;margin:0; }

          /* Services */
          .ecom-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.10),0 -4px 16px rgba(15,52,96,0.06); }
          .ecom-services-inner { max-width:1280px;margin:0 auto; }
          .ecom-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .ecom-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(237,233,254,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .ecom-service-card:hover { transform:translateY(-6px);border-color:rgba(15,52,96,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .ecom-service-card.featured { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.88) 55%,rgba(219,234,254,0.48) 100%);border-color:rgba(15,52,96,0.20);box-shadow:0 6px 32px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .ecom-service-card:hover .ecom-card-num { color:#D97706;opacity:0.12; }
          .ecom-service-card:hover h3 { color:#0F3460; }
          .ecom-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .ecom-service-card h3 { font-size:15px;font-weight:700;color:#0f172a;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .ecom-service-card p  { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .ecom-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#0F3460,#D97706);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .ecom-service-card:hover::before { transform:scaleY(1); }
          .ecom-services-footer { text-align:center;margin-top:20px; }
          .ecom-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(15,52,96,0.25);color:#0F3460;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(15,52,96,0.08);font-family:inherit; }
          .ecom-btn-show-more:hover { background:#0F3460;border-color:#0F3460;color:#ffffff;box-shadow:0 8px 28px rgba(15,52,96,0.24);transform:translateY(-2px); }

          /* Portfolio */
          .ecom-portfolio-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .ecom-portfolio-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.48);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.88);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .ecom-portfolio-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;gap:24px; }
          .ecom-portfolio-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0; }
          .ecom-btn-portfolio-cta { display:inline-block;padding:13px 26px;background:rgba(255,255,255,0.58);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.88);border-radius:50px;color:#0F3460;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .ecom-btn-portfolio-cta:hover { background:rgba(255,255,255,0.90);border-color:rgba(15,52,96,0.45);transform:translateY(-2px);color:#0F3460; }
          .ecom-portfolio-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .ecom-pcard { display:flex;flex-direction:column;background:rgba(255,255,255,0.68);backdrop-filter:blur(10px);border:1px solid rgba(15,52,96,0.12);border-radius:12px;overflow:hidden;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .ecom-pcard:hover { transform:translateY(-4px);border-color:rgba(15,52,96,0.42);box-shadow:0 12px 40px rgba(15,52,96,0.14); }
          .ecom-pcard-thumb { width:100%;aspect-ratio:16/10;overflow:hidden;background:#e0e7ff; }
          .ecom-pcard-thumb img { width:100%;height:100%;object-fit:cover;display:block; }
          .ecom-pcard-body  { padding:18px 20px 20px;flex:1; }
          .ecom-pcard-platform { display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:3px 10px;border-radius:20px;margin-bottom:8px;background:rgba(15,52,96,0.10);color:#0F3460;border:1px solid rgba(15,52,96,0.18); }
          .ecom-pcard-name  { font-size:18px;font-weight:800;color:#0F3460;margin:0 0 5px; }
          .ecom-pcard-tech  { font-size:13px;color:#4A6080;margin-bottom:5px;line-height:1.4; }
          .ecom-pcard-cats  { font-size:13px;font-weight:700;color:#D97706; }

          /* Process */
          .ecom-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .ecom-process-top { max-width:1280px;margin:0 auto 56px; }
          .ecom-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .ecom-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .ecom-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .ecom-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.18);margin:36px 0 0;width:100%; }
          .ecom-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .ecom-process-steps { display:flex;flex-direction:column; }
          .ecom-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .ecom-pstep.visible { opacity:1;transform:translateY(0); }
          .ecom-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .ecom-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.68);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.22);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .ecom-pstep:hover .ecom-pstep-circle { background:rgba(15,52,96,0.15);border-color:#D97706;color:#D97706; }
          .ecom-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .ecom-pstep-arrow::before { content:'';width:2px;flex:1;background:#D97706;opacity:0.25; }
          .ecom-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #D97706;opacity:0.45;margin-top:-1px; }
          .ecom-pstep:last-child .ecom-pstep-arrow { display:none; }
          .ecom-pstep-content { padding:4px 0 44px; }
          .ecom-pstep:last-child .ecom-pstep-content { padding-bottom:0; }
          .ecom-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .ecom-pstep-desc  { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .ecom-process-image-col { position:sticky;top:100px;min-width:0; }
          .ecom-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(15,52,96,0.15);aspect-ratio:4/5;background:#e0e7ff; }
          .ecom-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .ecom-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.10);border-bottom:1px solid rgba(15,52,96,0.10);padding:80px 0;position:relative;z-index:1; }
          .ecom-testi-inner { max-width:1280px;margin:0 auto;padding:0 40px; }
          .ecom-section-header-center { text-align:center;margin-bottom:52px; }
          @keyframes ecom-marqLeft  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          @keyframes ecom-marqRight { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
          .ecom-trow { overflow:hidden;position:relative;margin-bottom:16px; }
          .ecom-trow:last-of-type { margin-bottom:0; }
          .ecom-ttrack { display:flex;gap:20px;width:max-content;animation:ecom-marqLeft 40s linear infinite; }
          .ecom-ttrack-rev { display:flex;gap:20px;width:max-content;animation:ecom-marqRight 40s linear infinite; }
          .ecom-trow:hover .ecom-ttrack,.ecom-trow:hover .ecom-ttrack-rev { animation-play-state:paused; }
          .ecom-tfade-l { position:absolute;left:0;top:0;bottom:0;width:160px;background:linear-gradient(to right,#f8fafd,transparent);pointer-events:none;z-index:1; }
          .ecom-tfade-r { position:absolute;right:0;top:0;bottom:0;width:160px;background:linear-gradient(to left,#f8fafd,transparent);pointer-events:none;z-index:1; }
          .ecom-tcard { width:400px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,0.08);border-radius:16px;padding:24px;box-shadow:0 2px 16px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:12px;user-select:none;transition:border-color 0.2s,box-shadow 0.2s; }
          .ecom-tcard:hover { border-color:rgba(217,119,6,0.30);box-shadow:0 8px 32px rgba(217,119,6,0.10); }
          .ecom-tcard-stars { display:flex;gap:2px; }
          .ecom-tcard-star { color:#F59E0B;font-size:14px; }
          .ecom-tcard-text { font-size:14px;color:#374151;line-height:1.75;margin:0;flex-grow:1; }
          .ecom-tcard-footer { display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:16px; }
          .ecom-tcard-avatar { width:40px;height:40px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px; }
          .ecom-tcard-name { font-weight:700;color:#111827;font-size:13px;margin:0 0 2px; }
          .ecom-tcard-role { color:#9ca3af;font-size:12px;margin:0; }
          .ecom-testi-stats-wrap { margin-top:52px; }
          .ecom-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.78) 50%,rgba(237,233,254,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.88);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .ecom-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .ecom-tstat-num   { font-size:28px;font-weight:800;color:#D97706; }
          .ecom-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .ecom-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.18); }

          /* Why */
          .ecom-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.10);border-bottom:1px solid rgba(15,52,96,0.10);position:relative;z-index:1; }
          .ecom-why-inner { max-width:1280px;margin:0 auto; }
          .ecom-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .ecom-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(237,233,254,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s; }
          .ecom-why-card.ecom-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .ecom-why-card:hover { transform:translateY(-6px) scale(1)!important;border-color:rgba(15,52,96,0.38);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .ecom-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .ecom-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .ecom-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .ecom-why-card h3 { font-size:15px;font-weight:700;color:#0f172a;margin:0;line-height:1.35; }
          .ecom-why-card p  { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Engagement Table */
          .ecom-engage-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .ecom-engage-inner { max-width:1280px;margin:0 auto; }
          .ecom-engage-header { text-align:center;margin-bottom:52px; }
          .ecom-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 14px; }
          .ecom-engage-desc { font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 auto; }
          .ecom-plans-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-items:start; }
          .ecom-pcard { display:flex;flex-direction:column;height:100%;padding:30px 26px;border-radius:20px;border:1.5px solid rgba(15,52,96,0.12);background:rgba(255,255,255,0.80);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);position:relative; }
          .ecom-pcard--feat { border-color:rgba(217,119,6,0.40);background:linear-gradient(180deg,rgba(254,243,199,0.35) 0%,rgba(255,255,255,0.90) 100%);box-shadow:0 0 60px rgba(217,119,6,0.12),0 8px 40px rgba(15,52,96,0.08); }
          .ecom-pcard-pop { position:absolute;top:-13px;left:50%;transform:translateX(-50%);padding:4px 14px;border-radius:100px;background:linear-gradient(90deg,#0F3460,#1a5276 50%,#D97706);color:#fff;font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;box-shadow:0 4px 16px rgba(217,119,6,0.28); }
          .ecom-pcard-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:#6B7280;background:rgba(15,52,96,0.06);padding:4px 12px;border-radius:100px;margin-bottom:14px; }
          .ecom-pcard-name { display:block;font-size:17px;font-weight:800;color:#0F3460;margin-bottom:10px;line-height:1.3; }
          .ecom-pcard--feat .ecom-pcard-name { color:#b45309; }
          .ecom-pcard-blurb { font-size:13px;color:#4A6080;line-height:1.7;margin:0 0 20px; }
          .ecom-pcard-features { list-style:none;padding:0;margin:0 0 24px;flex:1; }
          .ecom-pcard-features li { padding:8px 0;border-top:1px dashed rgba(15,52,96,0.10);font-size:13.5px;color:#374151;display:flex;align-items:flex-start;gap:8px; }
          .ecom-pcard-features li::before { content:'✓';color:#16a34a;font-weight:700;flex-shrink:0; }
          .ecom-pcard-cta { display:block;padding:12px 20px;background:rgba(15,52,96,0.07);border:1.5px solid rgba(15,52,96,0.18);border-radius:50px;color:#0F3460;font-size:13.5px;font-weight:700;text-decoration:none;text-align:center;transition:all 0.2s;margin-top:auto; }
          .ecom-pcard-cta:hover { background:rgba(15,52,96,0.12);transform:translateY(-1px);text-decoration:none; }
          .ecom-pcard-cta--feat { background:linear-gradient(135deg,#0F3460,#1a5276);border-color:transparent;color:#fff;box-shadow:0 4px 20px rgba(15,52,96,0.28); }
          .ecom-pcard-cta--feat:hover { background:linear-gradient(135deg,#0a2444,#0F3460);box-shadow:0 6px 28px rgba(15,52,96,0.38);color:#fff; }
          @media(max-width:1024px){ .ecom-plans-grid { grid-template-columns:repeat(2,1fr); } }
          @media(max-width:600px){ .ecom-plans-grid { grid-template-columns:1fr; } }

          /* Contact */
          .ecom-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(219,234,254,0.72) 0%,rgba(255,255,255,0.65) 40%,rgba(237,233,254,0.68) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.85); }
          .ecom-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .ecom-contact-left  { padding:0;align-self:start; }
          .ecom-contact-right { align-self:start; }
          .ecom-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .ecom-contact-desc  { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .ecom-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.75) 0%,rgba(219,234,254,0.38) 100%);border:1px solid rgba(255,255,255,0.92);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .ecom-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .ecom-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .ecom-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .ecom-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .ecom-stats-box  { padding-top:32px;border-top:1px solid rgba(15,52,96,0.14); }
          .ecom-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .ecom-stat-number { font-size:40px;font-weight:900;color:#D97706;line-height:1;display:inline-block;margin-bottom:4px; }
          .ecom-stat-text   { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .ecom-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.92) 0%,rgba(219,234,254,0.20) 50%,rgba(255,255,255,0.88) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.95);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .ecom-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0f172a;letter-spacing:-0.5px; }
          .ecom-contact-form { display:flex;flex-direction:column;gap:16px; }
          .ecom-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .ecom-form-group { display:flex;flex-direction:column;gap:6px; }
          .ecom-form-group.full { grid-column:1/-1; }
          .ecom-form-group label { font-size:12px;font-weight:500;color:#0f172a; }
          .ecom-form-group input,.ecom-form-group textarea,.ecom-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.18);border-radius:6px;font-size:13px;font-family:inherit;color:#0f172a;background:rgba(255,255,255,0.60);box-shadow:inset 0 1px 4px rgba(15,52,96,0.05);transition:border-color 0.2s,background 0.2s; }
          .ecom-form-group input:focus,.ecom-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.95);box-shadow:0 0 0 3px rgba(15,52,96,0.12); }
          .ecom-phone-input { display:flex;border:1px solid rgba(15,52,96,0.18);border-radius:6px;overflow:hidden; }
          .ecom-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.15);font-size:12px;min-width:75px; }
          .ecom-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .ecom-phone-input input:focus { outline:none; }
          .ecom-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .ecom-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .ecom-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .ecom-consent a { color:#0F3460;text-decoration:none; }
          .ecom-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.35);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.30),inset 0 1px 0 rgba(255,255,255,0.18); }
          .ecom-submit-btn:hover { background:rgba(217,119,6,0.92);border-color:rgba(217,119,6,0.55);transform:translateY(-2px); }

          /* FAQ */
          .ecom-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.10);position:relative;z-index:1; }
          .ecom-faq-inner  { max-width:1280px;margin:0 auto; }
          .ecom-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .ecom-faq-list { display:flex;flex-direction:column;gap:12px; }
          .ecom-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(237,233,254,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .ecom-faq-item.open { border-color:rgba(15,52,96,0.38);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .ecom-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .ecom-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .ecom-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .ecom-faq-item.open .ecom-faq-q-badge { background:#D97706;color:#fff; }
          .ecom-faq-question span { font-size:16px;font-weight:600;color:#0f172a;line-height:1.45; }
          .ecom-faq-item.open .ecom-faq-question span { color:#0F3460; }
          .ecom-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .ecom-faq-item.open .ecom-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .ecom-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .ecom-faq-item.open .ecom-faq-answer-wrap { max-height:500px; }
          .ecom-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4A6080;line-height:1.8; }
          .ecom-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .ecom-related-section { background:rgba(219,234,254,0.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.65);padding:80px 40px; }
          .ecom-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .ecom-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px;display:block; }
          .ecom-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .ecom-related-sub { font-size:15px;color:#0f172a;line-height:1.7;margin:0 auto;max-width:680px; }
          .ecom-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.14);margin:40px 0; }
          .ecom-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .ecom-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .ecom-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .ecom-rtag-indigo  { background:rgba(15,52,96,0.10);border-color:rgba(15,52,96,0.30);color:#4338CA; }
          .ecom-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .ecom-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .ecom-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .ecom-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .ecom-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .ecom-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .ecom-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .ecom-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .ecom-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.30);color:#0e7490; }
          .ecom-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .ecom-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }

          /* Shimmer */

          /* Section reveal */
          .ecom-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .ecom-section-reveal.ecom-revealed { opacity:1;transform:translateY(0); }

          /* Logo marquee */

          /* Responsive */
          @media (max-width:1024px) {
            .ecom-services-grid { grid-template-columns:repeat(2,1fr); }
            .ecom-why-grid { grid-template-columns:repeat(2,1fr); }
            .ecom-portfolio-grid { grid-template-columns:repeat(2,1fr); }
            .ecom-portfolio-wrap { padding:32px 28px 40px; }
            .ecom-process-inner { grid-template-columns:1fr; }
            .ecom-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .ecom-page { overflow-x:hidden; }
            .ecom-services-section { padding:48px 20px 40px; }
            .ecom-portfolio-section { padding:48px 16px; }
            .ecom-portfolio-wrap { padding:24px 20px 32px;border-radius:16px; }
            .ecom-portfolio-header { flex-direction:column;align-items:flex-start;gap:14px; }
            .ecom-portfolio-title { font-size:26px; }
            .ecom-process-section { padding:60px 20px; }
            .ecom-process-top { margin-bottom:36px; }
            .ecom-testi-section { padding:60px 0; }
            .ecom-testi-inner { padding:0 20px; }
            .ecom-tfade-l,.ecom-tfade-r { width:60px; }
            .ecom-why-section { padding:60px 20px; }
            .ecom-why-section .ecom-section-header-center { text-align:left; }
            .ecom-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .ecom-why-card { padding:24px 20px; }
            .ecom-engage-section { padding:60px 20px; }
            .ecom-contact-section { padding:48px 16px; }
            .ecom-contact-container { grid-template-columns:1fr;gap:20px; }
            .ecom-contact-title { font-size:28px; }
            .ecom-faq-section { padding:60px 20px; }
            .ecom-faq-heading { font-size:26px; }
            .ecom-faq-question { padding:18px 18px 18px 52px; }
            .ecom-faq-question span { font-size:14px; }
            .ecom-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .ecom-faq-q-badge { left:14px; }
            .ecom-related-section { padding:60px 20px; }
            .ecom-related-tags { gap:8px; }
            .ecom-rtag { padding:9px 16px;font-size:13px; }
            .ecom-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .ecom-tcard { width:320px; }
            .ecom-portfolio-grid { grid-template-columns:1fr; }
            .ecom-section-title,.ecom-engage-title,.ecom-process-main-title,.ecom-related-title { font-size:30px; }
            .ecom-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .ecom-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.12); }
            .ecom-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.12); }
            .ecom-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .ecom-tstat-divider { display:none; }
            .ecom-form-row { grid-template-columns:1fr; }
            .ecom-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .ecom-stat-number { font-size:28px; }
          }
          @media (max-width:480px) {
            .ecom-section-title,.ecom-engage-title,.ecom-process-main-title,.ecom-related-title { font-size:26px; }
            .ecom-services-grid { grid-template-columns:1fr; }
            .ecom-service-card { padding:20px 18px 18px; }
            .ecom-card-num { font-size:52px; }
            .ecom-process-main-title { font-size:24px; }
            .ecom-pstep-title { font-size:18px; }
            .ecom-portfolio-title { font-size:22px; }
            .ecom-contact-title { font-size:24px; }
            .ecom-engage-title { font-size:26px; }
            .ecom-tcard { width:280px;padding:18px; }
            .ecom-merged-box { padding:18px; }
          }
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      <div className="ecom-page">
        <div className="ecom-aurora" aria-hidden="true">
          <div className="ecom-aurora-b1" />
          <div className="ecom-aurora-b2" />
          <div className="ecom-aurora-b3" />
        </div>

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="Full-Service eCommerce Development Company · Shopify · WooCommerce · Magento"
          title={<>eCommerce Website Development Services - <AuroraText>Built to Sell, Engineered to Scale</AuroraText></>}
          subtext="From DTC Shopify stores to enterprise Magento platforms and fully custom-built commerce solutions - 1Solutions has been delivering high-performing online stores for US, Canada, and Australia businesses since 2008. We combine 15+ years of platform expertise with a conversion-first mindset to build stores that don't just look great - they grow your revenue."
          primaryCta={{ label: 'Get a Free eCommerce Consultation', href: '#contact' }}
          stats={[
            { label: 'Online Stores Built', value: '500', suffix: '+' },
            { label: 'e-Commerce Experts', value: '50', suffix: '+' },
            { label: 'Projects Delivered', value: '1,200', suffix: '+' },
            { label: 'Years in Business', value: '15', suffix: '+' },
          ]}
        />

        {/* ── SERVICES ── */}
        <section className="ecom-services-section">
          <div className="ecom-services-inner">
            <div className={`ecom-section-reveal${visibleSections.has('services') ? ' ecom-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="ecom-section-eyebrow">Our Services</span>
              <h2 className="ecom-section-title">End-to-End <AuroraText>eCommerce Development Services</AuroraText></h2>
              <p className="ecom-section-desc">Whether you need a brand-new store, a platform migration, a custom B2B portal, or a headless commerce rebuild - our team covers every aspect of eCommerce development across all major platforms.</p>
            </div>
            <div className="ecom-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`ecom-service-card${s.featured?' featured':''}`}>
                  <span className="ecom-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="ecom-services-footer">
              <button className="ecom-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show All eCommerce Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="ecom-portfolio-section" id="portfolio">
          <div className="ecom-portfolio-wrap">
            <div className="ecom-portfolio-header">
              <h2 className={`ecom-portfolio-title ecom-section-reveal${visibleSections.has('portfolio') ? ' ecom-revealed' : ''}`} ref={el => { sectionRefs.current['portfolio'] = el; }}><AuroraText>500+</AuroraText> eCommerce Stores<br/>Designed &amp; Developed</h2>
              <Link href="#contact" className="ecom-btn-portfolio-cta">Browse Our Portfolio</Link>
            </div>
            <div className="ecom-portfolio-grid">
              {[
                { img:'/images/portfolio/aiplusstore.jpg', platform:'WooCommerce', name:'AiPlus Store', tech:'B2C tech accessories / Custom WooCommerce theme, product configurator, Stripe & PayPal', cats:'Consumer Electronics / Custom UX / Fast checkout' },
                { img:'/images/portfolio/shopsamsin.jpg', platform:'Shopify', name:'ShopSamsin', tech:'Fashion & Lifestyle / Custom Shopify theme, lookbook, Klaviyo, 2-step checkout', cats:'DTC Fashion / Upsell flows / Mobile-first design' },
                { img:'/images/portfolio/keiyura.jpg', platform:'WooCommerce', name:'Keiyura', tech:'Luxury goods / Bespoke WooCommerce, high-resolution galleries, multi-currency checkout', cats:'Luxury eCommerce / Brand-centric UX / International shipping' },
                { img:'/images/portfolio/foreverring.jpg', platform:'Shopify Plus', name:'ForeverRing', tech:'Engagement jewellery / Shopify Plus, ring customiser, Klarna BNPL, Google Shopping', cats:'DTC Jewellery / Personalisation / High AOV optimisation' },
                { img:'/images/portfolio/parfumfrance.jpg', platform:'WooCommerce', name:'Parfum France', tech:'Luxury fragrance / WooCommerce, subscription bundles, Recharge, Trustpilot integration', cats:'Luxury Fragrance / Subscriptions / EU compliance' },
                { img:'/images/portfolio/305aerosupplies.jpg', platform:'Magento 2', name:'305 Aero Supplies', tech:'B2B aerospace parts / Magento 2, customer group pricing, RFQ module, ERP integration', cats:'B2B / 10,000+ SKUs / Quote system / ERP sync' },
              ].map(p => (
                <div className="ecom-pcard" key={p.name}>
                  <div className="ecom-pcard-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className="ecom-pcard-body">
                    <span className="ecom-pcard-platform">{p.platform}</span>
                    <h3 className="ecom-pcard-name">{p.name}</h3>
                    <div className="ecom-pcard-tech">{p.tech}</div>
                    <div className="ecom-pcard-cats">{p.cats}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="ecom-process-section">
          <div className="ecom-process-top">
            <div className={`ecom-section-reveal${visibleSections.has('process') ? ' ecom-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="ecom-process-eyebrow">HOW WE WORK</p>
              <h2 className="ecom-process-main-title"><AuroraText>How We Build</AuroraText> Your Online Store</h2>
              <p className="ecom-process-main-desc">Our proven 4D delivery framework - used across 500+ eCommerce projects - ensures every store is scoped accurately, built to spec, and launched without surprises. No sprint-based guessing, no scope creep billing.</p>
            </div>
            <hr className="ecom-process-divider" />
          </div>
          <div className="ecom-process-inner">
            <div className="ecom-process-steps">
              {[
                ['Discover','We run a deep-dive discovery workshop to understand your products, customers, competitors, and growth goals - recommending the right platform, tech stack, and integration architecture before any design or code begins.'],
                ['Define','We produce a detailed project specification: information architecture, UX wireframes, feature list, integration map, SEO requirements, and data migration plan - reviewed, refined, and signed off before development starts.'],
                ['Develop','Our designers, developers, and QA engineers build your store in iterative sprints - with staging environment access from week one so you can review and test every feature as it\'s built, not in a big-bang reveal at the end.'],
                ['Deploy','We manage a controlled go-live: DNS cutover, performance audit, cross-device testing, SEO validation, and post-launch monitoring. Every project closes with full documentation and a handover session for your team.'],
              ].map(([title, desc], i) => (
                <div
                  className={`ecom-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="ecom-pstep-left">
                    <div className="ecom-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="ecom-pstep-arrow" />}
                  </div>
                  <div className="ecom-pstep-content">
                    <h3 className="ecom-pstep-title">{title}</h3>
                    <p className="ecom-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ecom-process-image-col">
              <div className="ecom-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions eCommerce development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="ecom-testi-section">
          <div className="ecom-testi-inner">
            <div className={`ecom-section-header-center ecom-section-reveal${visibleSections.has('testi') ? ' ecom-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="ecom-section-eyebrow">Client Reviews</span>
              <h2 className="ecom-section-title">What Our <AuroraText>eCommerce Clients Say</AuroraText></h2>
              <p className="ecom-section-sub">Trusted by e-commerce businesses across the US, Canada, Australia, and beyond for 15+ years.</p>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:0,marginTop:48}}>
            <div className="ecom-trow">
              <div className="ecom-tfade-l" />
              <div className="ecom-tfade-r" />
              <div className="ecom-ttrack" style={{paddingLeft:20}}>
                {firstRow.map((t, i) => (
                  <div className="ecom-tcard" key={i}>
                    <div className="ecom-tcard-stars">{[1,2,3,4,5].map(s=><span key={s} className="ecom-tcard-star">★</span>)}</div>
                    <p className="ecom-tcard-text">{t.text}</p>
                    <div className="ecom-tcard-footer">
                      <div className="ecom-tcard-avatar" style={{background:t.bg}}>{t.initials}</div>
                      <div>
                        <p className="ecom-tcard-name">{t.name}</p>
                        <p className="ecom-tcard-role">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ecom-trow">
              <div className="ecom-tfade-l" />
              <div className="ecom-tfade-r" />
              <div className="ecom-ttrack-rev" style={{paddingLeft:20}}>
                {secondRow.map((t, i) => (
                  <div className="ecom-tcard" key={i}>
                    <div className="ecom-tcard-stars">{[1,2,3,4,5].map(s=><span key={s} className="ecom-tcard-star">★</span>)}</div>
                    <p className="ecom-tcard-text">{t.text}</p>
                    <div className="ecom-tcard-footer">
                      <div className="ecom-tcard-avatar" style={{background:t.bg}}>{t.initials}</div>
                      <div>
                        <p className="ecom-tcard-name">{t.name}</p>
                        <p className="ecom-tcard-role">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ecom-testi-inner">
            <div className="ecom-testi-stats-wrap">
              <div className="ecom-testi-stats">
                {[['4.9/5','Average Rating'],['500+','Stores Launched'],['98%','Client Satisfaction'],['97%','Retention Rate']].map(([num,label],i,arr) => (
                  <>
                    <div className="ecom-tstat" key={label}>
                      <span className="ecom-tstat-num">{num}</span>
                      <span className="ecom-tstat-label">{label}</span>
                    </div>
                    {i < arr.length-1 && <div className="ecom-tstat-divider" key={`d${i}`} />}
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="ecom-why-section">
          <div className="ecom-why-inner">
            <div className={`ecom-section-reveal${visibleSections.has('why') ? ' ecom-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="ecom-section-eyebrow">Why 1Solutions</span>
              <h2 className="ecom-section-title">Why eCommerce Businesses <AuroraText>Choose 1Solutions</AuroraText></h2>
              <p className="ecom-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just write code - we build online revenue channels. Here's what makes us different from generic agencies and solo freelancers.</p>
            </div>
            <div className="ecom-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`ecom-why-card${visibleWhyCards.includes(i) ? ' ecom-card-visible' : ''}`} key={w.title}>
                  <div className="ecom-why-card-header">
                    <div className="ecom-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="ecom-engage-section" id="engagement">
          <div className="ecom-engage-inner">
            <div className="ecom-engage-header">
              <span className="ecom-section-eyebrow">How We Engage</span>
              <h2 className="ecom-engage-title">Flexible Engagement Models</h2>
              <p className="ecom-engage-desc">Pick the model that fits your project, team, and budget — every plan includes a free discovery call and NDA on request.</p>
            </div>

            <div className="ecom-plans-grid">
              <article className="ecom-pcard">
                <span className="ecom-pcard-badge">One-time</span>
                <span className="ecom-pcard-name">Fixed-Price Project</span>
                <p className="ecom-pcard-blurb">Defined scope &amp; budget — ideal for clearly-scoped builds with a fixed timeline and deliverables.</p>
                <ul className="ecom-pcard-features">
                  <li>Shared specialist team</li>
                  <li>Fixed scope &amp; deliverables</li>
                  <li>Budget predictability</li>
                  <li>Monthly progress report</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="ecom-pcard-cta">Get a Quote</a>
              </article>
              <article className="ecom-pcard">
                <span className="ecom-pcard-badge">Flexible</span>
                <span className="ecom-pcard-name">Time &amp; Materials</span>
                <p className="ecom-pcard-blurb">Scale with evolving requirements — pay for what's delivered, adjust scope any sprint.</p>
                <ul className="ecom-pcard-features">
                  <li>Shared specialist team</li>
                  <li>Flexible, evolving scope</li>
                  <li>Bi-weekly reporting</li>
                  <li>Priority task queue</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="ecom-pcard-cta">Get a Quote</a>
              </article>
              <article className="ecom-pcard ecom-pcard--feat">
                <span className="ecom-pcard-pop">✦ Most Popular</span>
                <span className="ecom-pcard-name">Dedicated Team</span>
                <p className="ecom-pcard-blurb">Your extended team — specialists embedded in your workflow, committed to your long-term growth.</p>
                <ul className="ecom-pcard-features">
                  <li>Dedicated senior specialists</li>
                  <li>Exclusive monthly retainer</li>
                  <li>Daily standups &amp; tracking</li>
                  <li>Same-day support response</li>
                  <li>NDA &amp; full IP protection</li>
                </ul>
                <a href="#contact" className="ecom-pcard-cta ecom-pcard-cta--feat">Get Started</a>
              </article>
              <article className="ecom-pcard">
                <span className="ecom-pcard-badge">Cost-efficient</span>
                <span className="ecom-pcard-name">Offshore Model</span>
                <p className="ecom-pcard-blurb">Maximum ROI with our expert offshore team — senior-level quality at budget-friendly rates.</p>
                <ul className="ecom-pcard-features">
                  <li>Expert offshore team</li>
                  <li>Cost-effective delivery</li>
                  <li>Monthly progress report</li>
                  <li>Budget-focused pricing</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="ecom-pcard-cta">Get a Quote</a>
              </article>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="ecom-contact-section" id="contact">
          <div className="ecom-contact-container">
            <div className="ecom-contact-left">
              <h2 className="ecom-contact-title">Let's Build Your <AuroraText>eCommerce Store</AuroraText> Together</h2>
              <p className="ecom-contact-desc">Tell us about your project and we'll respond within 24 hours with a tailored eCommerce development plan - platform recommendation, timeline, and fixed-price quote.</p>
              <div className="ecom-merged-box">
                <div>
                  {[
                    { icon:<svg className="ecom-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are kept strictly confidential. We respect your privacy.' },
                    { icon:<svg className="ecom-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A senior eCommerce developer personally reviews your project requirements - no automated responses or generic templates.' },
                    { icon:<svg className="ecom-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Quick response within 24 business hours.' },
                    { icon:<svg className="ecom-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"No obligation to proceed. We'll give you an honest recommendation even if we're not the right fit." },
                  ].map((b,i) => (
                    <div className="ecom-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="ecom-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="ecom-stats-box">
                  <div className="ecom-stats-grid">
                    {[['500+','Stores Built'],['16+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="ecom-stat-number">{num}</div>
                        <div className="ecom-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ecom-contact-right">
              <div className="ecom-form-box">
                <h3>Contact Us</h3>
                <form className="ecom-contact-form" onSubmit={_sfSubmit}>
                  <div className="ecom-form-row">
                    <div className="ecom-form-group"><label>Full Name*</label><input name="sf-name" type="text" placeholder="Full Name*" required /></div>
                    <div className="ecom-form-group"><label>Business Email*</label><input type="email" name="sf-email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="ecom-form-row">
                    <div className="ecom-form-group">
                      <label>Phone Number*</label>
                      <div className="ecom-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" name="sf-phone" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="ecom-form-group"><label>Organization*</label><input name="sf-company" type="text" placeholder="Organization / Store Name*" required /></div>
                  </div>
                  <div className="ecom-form-group full">
                    <label>Platform (optional)</label>
                    <select>
                      <option value="">-- Select a Platform (or I'm not sure yet) --</option>
                      <option>Shopify / Shopify Plus</option>
                      <option>WooCommerce</option>
                      <option>Magento / Adobe Commerce</option>
                      <option>OpenCart</option>
                      <option>Custom / Headless Build</option>
                      <option>Not sure - please recommend</option>
                    </select>
                  </div>
                  <div className="ecom-form-group full"><label>Message*</label><textarea name="sf-message" placeholder="Tell us about your eCommerce project - what you're building, your timeline, and any integrations you need..." rows={5} required /></div>
                  <div className="ecom-consent">
                    <input type="checkbox" id="ecom-consent" required />
                    <label htmlFor="ecom-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy/">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="ecom-submit-btn">Submit</button>
                  {_sfSt === 'success' && <div style={{marginTop:'12px',padding:'12px 16px',background:'#f0fdf4',border:'1px solid #86efac',borderRadius:'8px',color:'#166534',fontSize:'0.875rem',fontWeight:500}}>&#10003; Message sent! We&apos;ll get back to you within 24 hours.</div>}{_sfSt === 'error' && <div style={{marginTop:'12px',padding:'12px 16px',background:'#fef2f2',border:'1px solid #fca5a5',borderRadius:'8px',color:'#991b1b',fontSize:'0.875rem',fontWeight:500}}>Something went wrong. Please email info@1solutions.biz</div>}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ecom-faq-section" id="faq">
          <div className="ecom-faq-inner">
            <h2 className="ecom-faq-heading"><AuroraText>Frequently Asked Questions</AuroraText></h2>
            <div className="ecom-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`ecom-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="ecom-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="ecom-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="ecom-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="ecom-faq-answer-wrap">
                    <div className="ecom-faq-answer"><span className="ecom-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="ecom-related-section">
          <div className="ecom-related-inner">
            <span className="ecom-related-eyebrow">EXPLORE OUR ECOMMERCE ECOSYSTEM</span>
            <h2 className="ecom-related-title">Platform Services &amp; <AuroraText>Related Expertise</AuroraText></h2>
            <p className="ecom-related-sub">Pair our eCommerce development services with platform-specific expertise, performance optimisation, and digital marketing to build a complete, high-converting online business.</p>
            <hr className="ecom-related-divider" />
            <div className="ecom-related-tags">
              {[
                ['Shopify Store Development','green'],['WooCommerce Development','violet'],['Magento Development','orange'],
                ['OpenCart Development','cyan'],['Headless Commerce','indigo'],['B2B eCommerce Development','blue'],
                ['eCommerce SEO Services','amber'],['Platform Migration Services','slate'],['Payment Gateway Integration','teal'],
                ['ERP & CRM Integration','sky'],['eCommerce UI/UX Design','violet'],['Speed Optimization','indigo'],
                ['WordPress Development','emerald'],['Digital Marketing Services','rose'],['Maintenance & Support','blue'],
              ].map(([label,color]) => (
                <Link href="#contact" className={`ecom-rtag ecom-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
