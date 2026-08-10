'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n:'01', title:'Custom Webflow Website Design', desc:'Bespoke, pixel-perfect Webflow websites designed from a Figma prototype - responsive, fast-loading, and crafted to reflect your brand identity.', featured:false },
  { n:'02', title:'Webflow CMS Development', desc:'Content-managed Webflow sites with structured Collections - empowering your team to publish blogs, case studies, and product pages without touching code.', featured:true },
  { n:'03', title:'Webflow E-Commerce Development', desc:'Full-featured online stores on Webflow Commerce - custom product pages, cart flows, checkout customisation, and Stripe payment integration.', featured:false },
  { n:'04', title:'Webflow Membership & Client Portals', desc:'Gated member areas with Memberstack or Outseta - subscription billing, protected content, and custom onboarding flows built inside Webflow.', featured:false },
  { n:'05', title:'WordPress to Webflow Migration', desc:'Migrate your WordPress site to Webflow cleanly - preserving SEO rankings, redirecting all URLs, and importing CMS content with zero downtime.', featured:false },
  { n:'06', title:'Webflow Interactions & Animations', desc:'Cinematic scroll-triggered animations, parallax effects, and micro-interactions using Webflow Interactions and GSAP for a premium user experience.', featured:false },
  { n:'07', title:'Webflow SEO Optimisation', desc:'Technical SEO built into every Webflow project - semantic HTML, schema markup, Core Web Vitals tuning, canonical tags, and sitemap configuration.', featured:false },
  { n:'08', title:'Webflow API Integrations', desc:'Connect Webflow to your existing tools - HubSpot, Mailchimp, Zapier, Make, Stripe, Airtable, and custom REST APIs via Webflow Logic or middleware.', featured:false },
  { n:'09', title:'Webflow Landing Page Development', desc:'High-converting landing pages for campaigns, product launches, and lead generation - A/B-test-ready, fast to iterate, and optimised for conversion.', featured:false },
  { n:'10', title:'Webflow Redesign & Refresh', desc:'Revamp an existing Webflow site with updated branding, improved layout, better mobile experience, and enhanced page speed - without starting from scratch.', featured:false },
  { n:'11', title:'Webflow Maintenance & Support', desc:'Ongoing Webflow support plans - content updates, bug fixes, new section builds, plugin upgrades, and monthly performance reviews.', featured:false },
  { n:'12', title:'Webflow for SaaS & Startups', desc:'Marketing sites and product landing pages purpose-built for SaaS companies - fast to launch, easy for non-technical teams to update, and structured for growth.', featured:false },
];

const FAQS = [
  { q:'What Webflow development services does 1Solutions offer?', a:'We offer end-to-end Webflow development - custom website design and build, CMS setup and content migration, e-commerce stores, membership portals with Memberstack or Outseta, scroll animations with GSAP, API integrations, SEO optimisation, WordPress-to-Webflow migrations, and ongoing maintenance retainers. Whether you need a single landing page or a fully CMS-powered marketing site, we scope and deliver the right solution.' },
  { q:'How much does a custom Webflow website cost?', a:'A typical Webflow marketing site with 8–15 pages and a blog CMS costs between $4,000 and $12,000. E-commerce builds start from $6,000. Complex membership portals or multi-template CMS projects with animations range from $10,000 to $25,000+. Cost depends on page count, animation complexity, integrations, and content migration requirements. We provide a detailed fixed-price quote after a free scoping call.' },
  { q:'How long does a Webflow project take?', a:'A standard 8–12 page marketing site with CMS typically takes 4–6 weeks from approved Figma designs to launch. E-commerce and membership builds take 6–10 weeks. Landing pages can be turned around in 1–2 weeks. We share a milestone timeline in every proposal and provide weekly demos so you always know where things stand.' },
  { q:'Can you migrate our WordPress site to Webflow?', a:'Yes - WordPress-to-Webflow migration is one of our most requested services. We export and restructure your CMS content into Webflow Collections, set up 301 redirects for all existing URLs to preserve your SEO rankings, replicate your design, and test every page before cutover. You retain your domain and typically see faster load times after the migration.' },
  { q:'Will our team be able to update the site after launch?', a:'Absolutely - that is one of Webflow\'s greatest strengths. We build your CMS Collections and page templates so your marketing team can add blog posts, update team members, publish case studies, and edit copy directly in the Webflow Editor - no developer needed. We provide a walkthrough video and documentation as part of every handoff.' },
  { q:'Do you build Webflow animations and interactions?', a:'Yes. We build scroll-triggered reveals, parallax backgrounds, sticky navigation, hover micro-interactions, and page-load sequences using Webflow\'s native Interactions panel. For more advanced animations - counters, staggered reveals, SVG path animations - we layer in GSAP and Lottie. Every animation is tested for smooth 60fps performance on mobile.' },
  { q:'Is Webflow good for SEO?', a:'Yes - Webflow gives developers and SEO practitioners full control over title tags, meta descriptions, Open Graph tags, canonical URLs, schema markup, XML sitemaps, and 301 redirects. Unlike WordPress, there are no plugin conflicts or bloated themes slowing things down. We configure all of these correctly on every build and optimise Core Web Vitals (LCP, CLS, FID) during the performance review phase.' },
  { q:'What makes 1Solutions different from a Webflow freelancer?', a:'Depth, accountability, and continuity. Unlike a solo freelancer, we offer a dedicated team - a Webflow designer, developer, and QA reviewer - so your project never stalls when someone is unavailable. We follow a documented Discover → Design → Build → Launch process, provide comprehensive handoff documentation, and offer monthly support retainers. We are a long-term partner, not a one-off contractor.' },
];

const WHY = [
  { bg:'linear-gradient(165deg,#ede9fe 0%,#ddd6fe 100%)', icon:<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title:'Certified Webflow Experts', desc:'Our Webflow team holds official Webflow Partner and Expert certifications. We have shipped 200+ Webflow sites across SaaS, e-commerce, healthcare, and professional services.' },
  { bg:'linear-gradient(165deg,#dbeafe 0%,#bfdbfe 100%)', icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the UX expectations, compliance considerations, and conversion standards of western markets - not just generic offshore delivery with poor communication.' },
  { bg:'linear-gradient(165deg,#dcfce7 0%,#bbf7d0 100%)', icon:<svg viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>, title:'Figma-to-Webflow in One Team', desc:'We design and build under one roof - your Figma prototype is translated to Webflow with pixel precision, so there are no handoff gaps or fidelity loss between design and code.' },
  { bg:'linear-gradient(165deg,#fdf3dd 0%,#fbe8b8 100%)', icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'SEO-First Every Time', desc:'Every site we build includes proper semantic HTML, schema markup, canonical URLs, XML sitemaps, and Core Web Vitals optimisation - not a plugin-dependent afterthought.' },
  { bg:'linear-gradient(165deg,#fde8dc 0%,#fbd0b5 100%)', icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'Fast Delivery, Fixed Price', desc:'Our scoped fixed-price process means you know the cost and timeline upfront. Most marketing sites go from approved design to live in 4–6 weeks with weekly demo checkpoints.' },
  { bg:'linear-gradient(165deg,#fce7f3 0%,#fbcfe8 100%)', icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Client-Editable CMS Handoff', desc:'We build your CMS so your non-technical team can update content, add blog posts, and publish new pages in the Webflow Editor - with a video walkthrough and documentation on handoff.' },
  { bg:'linear-gradient(165deg,#ede9fe 0%,#ddd6fe 100%)', icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Security & Reliability', desc:'Webflow\'s enterprise hosting includes free SSL, CDN delivery via Fastly, automatic backups, 99.99% uptime SLA, and DDoS protection - all included in the Webflow plan.' },
  { bg:'linear-gradient(165deg,#dbeafe 0%,#bfdbfe 100%)', icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'96% client retention rate. We maintain your Webflow site after launch with monthly support retainers, content updates, new section builds, and performance monitoring.' },
];

const WF_TESTIMONIALS = [
  { name:'Sarah Rutherford', role:'VP Marketing, Stackify SaaS - USA', text:'1Solutions rebuilt our entire marketing site in Webflow - from a sluggish WordPress install to a 98 PageSpeed score. The CMS handoff was brilliant; our content team updates everything without us. Incredible value.' },
  { name:'James Mitchell', role:'SEO Director, LegalEdge - Australia', text:'They migrated our 180-page WordPress site to Webflow with zero ranking loss. Every redirect was handled correctly and the new site loads in under 1.5 seconds. Best investment we made this year.' },
  { name:'Laura Chen', role:'Founder, Prism Creative Studio - Canada', text:"The Webflow animations they built for our product launch were stunning. Clients kept mentioning the website on discovery calls. 1Solutions understood our brand better than agencies we'd paid 5x more." },
];

// Row 2 uses a separate set of reviews (not a reorder of row 1) so the two
// marquee rows never show identical testimonial content.
const WF_TESTIMONIALS_ROW2 = [
  { name:'Daniel Osei', role:'Head of Growth, Northline Logistics - Canada', text:'We needed a Webflow site our marketing team could actually run without filing a ticket every time. 1Solutions built the CMS exactly around how we publish, and onboarding took less than a day.' },
  { name:'Emily Foster', role:'Marketing Manager, Bright Path Consulting - USA', text:'Our old site took forever to update and looked dated. The Webflow rebuild came in on time, on budget, and our bounce rate dropped noticeably in the first month.' },
  { name:'Ryan Coleman', role:'Co-Founder, Fernwood Studio - Australia', text:'1Solutions handled our e-commerce migration to Webflow flawlessly. Checkout conversion actually improved after launch, and support since then has been fast and genuinely helpful.' },
];

export default function WebflowDevelopmentServices() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const stepRefs = useRef([]);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);

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
          WHY.forEach((_, i) => {
            setTimeout(() => setVisibleWhyCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(whyGridRef.current);
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

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.1solutions.biz/#organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: 'https://www.1solutions.biz/images/1solutions-logo.png',
        contactPoint: { '@type': 'ContactPoint', telephone: '+1-800-1SOLUTIONS', contactType: 'customer service' },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.1solutions.biz/webflow-development-services/#webpage',
        url: 'https://www.1solutions.biz/webflow-development-services/',
        name: 'Webflow Development Services | Expert Webflow Agency | 1Solutions',
        description: 'Award-winning Webflow development agency. Custom Webflow websites, CMS, e-commerce, animations & migrations for US, Canada & Australia businesses.',
        isPartOf: { '@id': 'https://www.1solutions.biz/#organization' },
        dateModified: '2026-07-18',
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfessionalService',
        name: '1Solutions - Webflow Development Agency',
        url: 'https://www.1solutions.biz/webflow-development-services/',
        description: 'Expert Webflow development company delivering custom websites, CMS builds, e-commerce stores, membership portals, and WordPress-to-Webflow migrations.',
        priceRange: '$4,000 - $25,000+',
        areaServed: ['United States', 'Canada', 'Australia', 'United Kingdom'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Webflow Development Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Webflow Website Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webflow CMS Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webflow E-Commerce Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WordPress to Webflow Migration' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webflow Membership Sites' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webflow Interactions & Animations' } },
          ],
        },
      },
      {
        '@type': 'HowTo',
        name: 'How We Deliver Webflow Projects',
        step: [
          { '@type': 'HowToStep', name: 'Discover', text: 'Scoping call to define goals, pages, CMS structure, and integrations.' },
          { '@type': 'HowToStep', name: 'Design', text: 'Pixel-perfect Figma prototype reviewed and approved before any Webflow build begins.' },
          { '@type': 'HowToStep', name: 'Build', text: 'Webflow development with weekly demos, CMS setup, animations, and integrations.' },
          { '@type': 'HowToStep', name: 'Launch', text: 'QA testing, SEO configuration, domain cutover, and post-launch handoff with training.' },
        ],
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
        <title>Webflow Development Services | Expert Webflow Agency | 1Solutions</title>
        <meta name="description" content="1Solutions is a certified Webflow development agency with 200+ sites delivered. Custom Webflow design, CMS, e-commerce, animations & WordPress migrations for US, Canada & Australia." />
        <meta name="keywords" content="webflow development services, webflow development company, webflow agency, webflow designer, webflow cms development, webflow ecommerce, wordpress to webflow migration, webflow expert" />
        <link rel="canonical" href="https://www.1solutions.biz/webflow-development-services/" />
        <meta property="og:title" content="Webflow Development Services | Expert Webflow Agency | 1Solutions" />
        <meta property="og:description" content="Certified Webflow agency delivering custom websites, CMS, e-commerce, and animations for US, Canada & Australia businesses. 200+ Webflow sites delivered." />
        <meta property="og:url" content="https://www.1solutions.biz/webflow-development-services/" />
        <meta property="og:type" content="website" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-webflow-development-services.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Webflow Development Services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-webflow-development-services.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Webflow Development Services" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <style>{`
          .wf-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .wf-page *, .wf-page *::before, .wf-page *::after { box-sizing: border-box; }

          /* Orbs */
          .wf-aurora { position:absolute; inset:-15%; z-index:0; pointer-events:none; filter:blur(70px) saturate(150%); animation:wf-aurora-drift 20s ease-in-out infinite alternate; }
          .wf-aurora-b1 { position:absolute; left:20%; top:30%; width:65%; height:65%; border-radius:50%; background:radial-gradient(circle at center,rgba(15,52,96,0.28) 0%,transparent 70%); transform:translate(-50%,-50%); }
          .wf-aurora-b2 { position:absolute; left:78%; top:22%; width:48%; height:48%; border-radius:50%; background:radial-gradient(circle at center,rgba(217,119,6,0.20) 0%,transparent 70%); transform:translate(-50%,-50%); }
          .wf-aurora-b3 { position:absolute; left:50%; top:82%; width:55%; height:55%; border-radius:50%; background:radial-gradient(circle at center,rgba(26,82,118,0.16) 0%,transparent 70%); transform:translate(-50%,-50%); }
          @keyframes wf-aurora-drift { 0%{transform:translate3d(0,0,0) scale(1)} 100%{transform:translate3d(-4%,3%,0) scale(1.10)} }

          /* Sections shared */
          .wf-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .wf-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .wf-section-desc { font-size:15px;color:#4A6080;line-height:1.7;margin-bottom:36px; }
          .wf-section-sub { font-size:16px;color:#4A6080;margin:0; }

          /* Services */
          .wf-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.18),0 -4px 16px rgba(15,52,96,0.10); }
          .wf-services-inner { max-width:1280px;margin:0 auto; }
          .wf-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .wf-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .wf-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-service-card:hover .wf-card-num { color:#D97706;opacity:0.12; }
          .wf-service-card:hover h3 { color:#D97706; }
          .wf-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .wf-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .wf-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .wf-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .wf-service-card:hover::before { transform:scaleY(1); }
          .wf-services-footer { text-align:center;margin-top:20px; }
          .wf-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(15,52,96,0.20);color:#0F3460;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(15,52,96,0.08);font-family:inherit; }
          .wf-btn-show-more:hover { background:#0F3460;border-color:#0F3460;color:#ffffff;box-shadow:0 8px 28px rgba(15,52,96,0.20);transform:translateY(-2px); }

          /* What Is Webflow CMS */
          .wf-wic-section { padding:70px 40px 20px;position:relative;z-index:1; }
          .wf-wic-inner { max-width:1280px;margin:0 auto; }
          .wf-wic-box { background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 40px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wf-wic-intro { font-size:1rem;color:#374151;line-height:1.8;margin:0 0 28px;padding-bottom:28px;border-bottom:1px solid rgba(15,52,96,0.10); }
          .wf-wic-intro strong { color:#0F3460; }
          .wf-wic-aspects { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
          .wf-wic-aspect { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);border:1px solid rgba(15,52,96,0.10);border-radius:16px;padding:22px;transition:border-color 0.2s,transform 0.2s; }
          .wf-wic-aspect:hover { border-color:rgba(217,119,6,0.40);transform:translateY(-3px); }
          .wf-wic-t { font-weight:700;color:#0F3460;font-size:14px;margin-bottom:8px; }
          .wf-wic-d { font-size:13px;color:#4A6080;line-height:1.65; }

          /* Tech Stack */
          .wf-tech-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .wf-tech-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wf-tech-header { margin-bottom:36px; }
          .wf-tech-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px; }
          .wf-tech-subtitle { font-size:15px;color:#4A6080;line-height:1.6;margin:0; }
          .wf-tech-groups { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .wf-tech-group { background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(15,52,96,0.12);border-radius:12px;padding:22px 24px; }
          .wf-tech-group-title { font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .wf-tech-tags { display:flex;flex-wrap:wrap;gap:8px; }
          .wf-tech-tag { display:inline-block;background:rgba(15,52,96,0.07);border:1px solid rgba(15,52,96,0.12);border-radius:6px;padding:5px 12px;font-size:13px;font-weight:500;color:#0F3460; }

          /* Process */
          .wf-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .wf-process-top { max-width:1280px;margin:0 auto 56px; }
          .wf-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .wf-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .wf-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .wf-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0;width:100%; }
          .wf-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .wf-process-steps { display:flex;flex-direction:column; }
          .wf-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .wf-pstep.visible { opacity:1;transform:translateY(0); }
          .wf-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .wf-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .wf-pstep:hover .wf-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .wf-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .wf-pstep-arrow::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.25; }
          .wf-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0F3460;opacity:0.45;margin-top:-1px; }
          .wf-pstep:last-child .wf-pstep-arrow { display:none; }
          .wf-pstep-content { padding:4px 0 44px; }
          .wf-pstep:last-child .wf-pstep-content { padding-bottom:0; }
          .wf-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .wf-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .wf-process-image-col { position:sticky;top:100px;min-width:0; }
          .wf-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(15,52,96,0.15);aspect-ratio:4/5;background:#e8edf5; }
          .wf-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .wf-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .wf-testi-inner { max-width:1280px;margin:0 auto; }
          .wf-section-header-center { text-align:center;margin-bottom:52px; }
          .wf-testi-marquee-outer { position:relative;margin:44px 0 52px; }
          .wf-testi-marquee-wrap { overflow:hidden;margin-bottom:20px; }
          .wf-testi-marquee-wrap:last-child { margin-bottom:0; }
          .wf-testi-track { display:flex;gap:20px;width:max-content;animation:wfTestiScroll 32s linear infinite; }
          .wf-testi-track--rev { animation-name:wfTestiScrollRev; }
          .wf-testi-marquee-wrap:hover .wf-testi-track { animation-play-state:paused; }
          @keyframes wfTestiScroll { from{transform:translateX(0);} to{transform:translateX(-50%);} }
          @keyframes wfTestiScrollRev { from{transform:translateX(-50%);} to{transform:translateX(0);} }
          @media(prefers-reduced-motion:reduce) { .wf-testi-track{animation:none !important;} }
          .wf-testi-fade { position:absolute;top:0;bottom:0;width:120px;z-index:1;pointer-events:none; }
          .wf-testi-fade--l { left:0;background:linear-gradient(to right,#f8fafd,transparent); }
          .wf-testi-fade--r { right:0;background:linear-gradient(to left,#f8fafd,transparent); }
          .wf-testi-card { width:400px;flex-shrink:0;background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px;box-shadow:0 4px 24px rgba(15,52,96,0.08);user-select:none; }
          .wf-testi-card-stars { color:#D97706;font-size:15px;margin-bottom:12px;letter-spacing:1px; }
          .wf-testi-card-text { font-size:14px;color:#1e293b;line-height:1.75;margin:0 0 18px;font-style:italic; }
          .wf-testi-card-name { font-size:13px;font-weight:700;color:#0F3460; }
          .wf-testi-card-role { font-size:12px;color:#6B7280;margin-top:2px; }
          @media(max-width:600px) { .wf-testi-fade{width:48px;} }
          .wf-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wf-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .wf-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .wf-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .wf-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          /* Why */
          .wf-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .wf-why-inner { max-width:1280px;margin:0 auto; }
          .wf-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .wf-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),background 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .wf-why-card:hover { transform:translateY(-6px) scale(1);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-why-card.wf-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .wf-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .wf-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .wf-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .wf-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .wf-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Engagement Table */
          .wf-engage-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .wf-engage-inner { max-width:1280px;margin:0 auto; }
          .wf-engage-header { text-align:center;margin-bottom:52px; }
          .wf-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 14px; }
          .wf-engage-desc { font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 auto; }
          .wf-plans-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-items:start; }
          .wf-pcard { display:flex;flex-direction:column;height:100%;padding:30px 26px;border-radius:20px;border:1.5px solid rgba(15,52,96,0.12);background:rgba(255,255,255,0.80);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);position:relative; }
          .wf-pcard--feat { border-color:rgba(217,119,6,0.40);background:linear-gradient(180deg,rgba(254,243,199,0.35) 0%,rgba(255,255,255,0.90) 100%);box-shadow:0 0 60px rgba(217,119,6,0.12),0 8px 40px rgba(15,52,96,0.08); }
          .wf-pcard-pop { position:absolute;top:-13px;left:50%;transform:translateX(-50%);padding:4px 14px;border-radius:100px;background:linear-gradient(90deg,#0F3460,#1a5276 50%,#D97706);color:#fff;font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;box-shadow:0 4px 16px rgba(217,119,6,0.28); }
          .wf-pcard-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:#6B7280;background:rgba(15,52,96,0.06);padding:4px 12px;border-radius:100px;margin-bottom:14px; }
          .wf-pcard-name { display:block;font-size:17px;font-weight:800;color:#0F3460;margin-bottom:10px;line-height:1.3; }
          .wf-pcard--feat .wf-pcard-name { color:#b45309; }
          .wf-pcard-blurb { font-size:13px;color:#4A6080;line-height:1.7;margin:0 0 20px; }
          .wf-pcard-features { list-style:none;padding:0;margin:0 0 24px;flex:1; }
          .wf-pcard-features li { padding:8px 0;border-top:1px dashed rgba(15,52,96,0.10);font-size:13.5px;color:#374151;display:flex;align-items:flex-start;gap:8px; }
          .wf-pcard-features li::before { content:'✓';color:#16a34a;font-weight:700;flex-shrink:0; }
          .wf-pcard-cta { display:block;padding:12px 20px;background:rgba(15,52,96,0.07);border:1.5px solid rgba(15,52,96,0.18);border-radius:50px;color:#0F3460;font-size:13.5px;font-weight:700;text-decoration:none;text-align:center;transition:all 0.2s;margin-top:auto; }
          .wf-pcard-cta:hover { background:rgba(15,52,96,0.12);transform:translateY(-1px);text-decoration:none; }
          .wf-pcard-cta--feat { background:linear-gradient(135deg,#0F3460,#1a5276);border-color:transparent;color:#fff;box-shadow:0 4px 20px rgba(15,52,96,0.28); }
          .wf-pcard-cta--feat:hover { background:linear-gradient(135deg,#0a2444,#0F3460);box-shadow:0 6px 28px rgba(15,52,96,0.38);color:#fff; }
          @media(max-width:1024px){ .wf-plans-grid { grid-template-columns:repeat(2,1fr); } }
          @media(max-width:600px){ .wf-plans-grid { grid-template-columns:1fr; } }

          /* Contact */
          .wf-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .wf-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .wf-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .wf-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .wf-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .wf-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .wf-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .wf-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .wf-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .wf-stats-box { padding-top:32px;border-top:1px solid rgba(15,52,96,0.12); }
          .wf-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .wf-stat-number { font-size:40px;font-weight:900;color:#0F3460;line-height:1;display:inline-block;margin-bottom:4px; }
          .wf-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .wf-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .wf-contact-form { display:flex;flex-direction:column;gap:16px; }
          .wf-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .wf-form-group { display:flex;flex-direction:column;gap:6px; }
          .wf-form-group.full { grid-column:1/-1; }
          .wf-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .wf-form-group input,.wf-form-group textarea,.wf-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .wf-form-group input:focus,.wf-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .wf-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .wf-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .wf-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .wf-phone-input input:focus { outline:none; }
          .wf-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .wf-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .wf-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .wf-consent a { color:#0F3460;text-decoration:none; }
          .wf-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .wf-submit-btn:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* FAQ */
          .wf-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .wf-faq-inner { max-width:1280px;margin:0 auto; }
          .wf-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .wf-faq-list { display:flex;flex-direction:column;gap:12px; }
          .wf-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .wf-faq-item.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .wf-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .wf-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .wf-faq-item.open .wf-faq-q-badge { background:#D97706;color:#fff; }
          .wf-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .wf-faq-item.open .wf-faq-question span { color:#D97706; }
          .wf-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .wf-faq-item.open .wf-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .wf-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .wf-faq-item.open .wf-faq-answer-wrap { max-height:400px; }
          .wf-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .wf-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .wf-related-section { background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .wf-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .wf-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .wf-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .wf-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .wf-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .wf-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .wf-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .wf-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .wf-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .wf-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .wf-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .wf-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .wf-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .wf-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .wf-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .wf-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .wf-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .wf-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }

          /* CTA shimmer */

          /* Section fade-up */
          .wf-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .wf-section-reveal.wf-revealed { opacity:1;transform:translateY(0); }

          /* Logo marquee */

          /* Responsive */
          @media (max-width:1024px) {
            .wf-services-grid { grid-template-columns:repeat(2,1fr); }
            .wf-why-grid { grid-template-columns:repeat(2,1fr); }
            .wf-tech-groups { grid-template-columns:repeat(2,1fr); }
            .wf-engage-inner { grid-template-columns:1fr; }
            .wf-engage-left { position:static; }
            .wf-process-inner { grid-template-columns:1fr; }
            .wf-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .wf-page { overflow-x:hidden; }
            .wf-wic-section { padding:48px 16px 10px; }
            .wf-wic-box { padding:26px 22px; }
            .wf-wic-aspects { grid-template-columns:1fr;gap:14px; }
            .wf-services-section { padding:48px 20px 40px; }
            .wf-tech-section { padding:48px 16px; }
            .wf-tech-wrap { padding:24px 20px 32px;border-radius:16px; }
            .wf-tech-groups { grid-template-columns:1fr; }
            .wf-process-section { padding:60px 20px; }
            .wf-process-top { margin-bottom:36px; }
            .wf-testi-section { padding:60px 20px; }
            .wf-testi-section .wf-section-header-center { text-align:left; }
            .wf-why-section { padding:60px 20px; }
            .wf-why-section .wf-section-header-center { text-align:left; }
            .wf-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .wf-why-card { padding:24px 20px; }
            .wf-engage-section { padding:60px 20px; }
            .wf-contact-section { padding:48px 16px; }
            .wf-contact-container { grid-template-columns:1fr;gap:20px; }
            .wf-contact-title { font-size:28px; }
            .wf-faq-section { padding:60px 20px; }
            .wf-faq-heading { font-size:26px; }
            .wf-faq-question { padding:18px 18px 18px 52px; }
            .wf-faq-question span { font-size:14px; }
            .wf-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .wf-faq-q-badge { left:14px; }
            .wf-related-section { padding:60px 20px; }
            .wf-related-tags { gap:8px; }
            .wf-rtag { padding:9px 16px;font-size:13px; }
            .wf-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .wf-testi-card { width:280px;padding:22px; }
            .wf-section-title,.wf-engage-title,.wf-process-main-title,.wf-related-title { font-size:30px; }
            .wf-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .wf-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .wf-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .wf-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .wf-tstat-divider { display:none; }
            .wf-form-row { grid-template-columns:1fr; }
            .wf-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .wf-stat-number { font-size:28px; }
            .wf-tech-title { font-size:26px; }
          }
          @media (max-width:480px) {
            .wf-section-title,.wf-engage-title,.wf-process-main-title,.wf-related-title { font-size:26px; }
            .wf-services-grid { grid-template-columns:1fr; }
            .wf-service-card { padding:20px 18px 18px; }
            .wf-card-num { font-size:52px; }
            .wf-pstep-title { font-size:18px; }
            .wf-contact-title { font-size:24px; }
            .wf-engage-title { font-size:26px; }
            .wf-ecard { padding:20px; }
            .wf-ecard-features { grid-template-columns:1fr; }
            .wf-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="wf-page">
        <div className="wf-aurora" aria-hidden="true">
          <div className="wf-aurora-b1" />
          <div className="wf-aurora-b2" />
          <div className="wf-aurora-b3" />
        </div>

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="Certified Webflow Development Agency"
          title={<>Webflow Development Services - <AuroraText>Beautiful Sites, Zero Compromise</AuroraText></>}
          subtext="Custom Webflow websites, CMS builds, e-commerce stores, and pixel-perfect animations - delivered by certified Webflow experts for businesses across the US, Canada, and Australia."
          primaryCta={{ label: 'Get a Free Webflow Consultation', href: '#contact' }}
          stats={[
            { label: 'Webflow Sites', value: '200', suffix: '+' },
            { label: 'Webflow Experts', value: '20', suffix: '+' },
            { label: 'Years in Business', value: '15', suffix: '+' },
            { label: 'Client Retention', value: '96', suffix: '%' },
          ]}
        />

        {/* ── WHAT IS WEBFLOW CMS ── */}
        <section className="wf-wic-section" id="what-is-webflow-cms">
          <div className="wf-wic-inner">
            <span className="wf-section-eyebrow">Understanding Webflow</span>
            <h2 className="wf-section-title">What Is Webflow CMS and How Does It Work?</h2>
            <p className="wf-section-desc">Webflow is a visual, all-in-one web design platform that combines a drag-and-drop designer with a built-in CMS and hosting - no separate theme, plugin stack, or hand-coded front end required. Here&apos;s the one concept worth understanding first, because it&apos;s what decides how fast your site launches and how easily your own team can run it afterward.</p>
            <div className="wf-wic-box">
              <p className="wf-wic-intro"><strong>Webflow CMS</strong> is Webflow&apos;s built-in content management system. It lets you define structured, reusable content - blog posts, case studies, team members, products - as &quot;Collections,&quot; design the layout once, and have every entry automatically populate that same design. Unlike WordPress, where the CMS and the visual builder are two separate systems glued together by themes and plugins, Webflow&apos;s CMS and its visual designer are the same tool: you build the layout, bind it to a Collection field, and every future entry - added by your team or synced through an integration - inherits that exact design with zero extra development. For a Webflow website development project built for international clients, this collapses what used to be a two-step &quot;design agency plus separate CMS developer&quot; workflow into one - which is why so many growing brands are moving their WordPress and Wix sites onto Webflow.</p>
              <div className="wf-wic-aspects">
                {[
                  { t: "Collections - Webflow's content model", d: 'Every dynamic content type (blog, portfolio, team, locations) is a Collection with its own custom fields - text, images, rich text, and references to other Collections. Edit an entry once and it updates everywhere that Collection is used across the site.' },
                  { t: 'Design once, populate infinitely', d: 'You design a single dynamic template - a blog post layout, a product page - bound directly to Collection fields inside the Webflow Designer. Every new entry, whether 10 or 10,000, renders through that same template with no extra coding.' },
                  { t: 'Why it beats a bolted-on CMS', d: 'WordPress pairs a CMS with a separate theme and plugin layer, so structure and design constantly fight each other. Webflow CMS and design live in one canvas, which is why Webflow sites launch faster and are easier for non-technical teams to maintain after handoff.' },
                ].map(a => (
                  <div key={a.t} className="wf-wic-aspect">
                    <div className="wf-wic-t">{a.t}</div>
                    <div className="wf-wic-d">{a.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="wf-services-section">
          <div className="wf-services-inner">
            <div className={`wf-section-reveal${visibleSections.has('services') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="wf-section-eyebrow">Our Services</span>
              <h2 className="wf-section-title">Webflow Development Services We Offer</h2>
              <p className="wf-section-desc">From straightforward marketing sites to complex CMS platforms, e-commerce stores, and membership portals - our Webflow team delivers end-to-end solutions built for speed, beauty, and client editability.</p>
            </div>
            <div className="wf-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`wf-service-card${s.featured?' featured':''}`}>
                  <span className="wf-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="wf-services-footer">
              <button className="wf-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More Webflow Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="wf-tech-section">
          <div className="wf-tech-wrap">
            <div className={`wf-tech-header wf-section-reveal${visibleSections.has('tech') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['tech'] = el; }}>
              <h2 className="wf-tech-title">Our Webflow Technology Stack</h2>
              <p className="wf-tech-subtitle">We combine Webflow's visual-first platform with the best third-party tools to deliver sites that are fast, scalable, and easy for your team to manage.</p>
            </div>
            <div className="wf-tech-groups">
              {[
                { label:'Design & Prototyping', tags:['Figma','Adobe XD','Webflow Designer','Spline 3D','Lottie Files'] },
                { label:'CMS & Content', tags:['Webflow CMS','Finsweet Attributes','CMS Nest','Webflow Logic','Jetboost'] },
                { label:'Memberships & Auth', tags:['Memberstack','Outseta','Wized','Xano','Firebase Auth'] },
                { label:'Animations', tags:['Webflow Interactions','GSAP','ScrollTrigger','Lottie','Spline'] },
                { label:'Integrations', tags:['Zapier','Make (Integromat)','HubSpot','Mailchimp','Stripe','Airtable','Twilio'] },
                { label:'SEO & Performance', tags:['Webflow SEO Panel','Semrush','Ahrefs','Cloudflare','PageSpeed Insights','Schema Markup'] },
              ].map(group => (
                <div className="wf-tech-group" key={group.label}>
                  <div className="wf-tech-group-title">{group.label}</div>
                  <div className="wf-tech-tags">
                    {group.tags.map(tag => <span className="wf-tech-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="wf-process-section">
          <div className="wf-process-top">
            <div className={`wf-section-reveal${visibleSections.has('process') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="wf-process-eyebrow">HOW WE WORK</p>
              <h2 className="wf-process-main-title">How We Deliver Webflow Projects</h2>
              <p className="wf-process-main-desc">Our Webflow team follows a four-stage process refined over 200+ projects. You approve design before any development begins - no surprises, no scope creep, and a fully editable site handed to you at launch.</p>
            </div>
            <hr className="wf-process-divider" />
          </div>
          <div className="wf-process-inner">
            <div className="wf-process-steps">
              {[
                ['Discover','We start with a free scoping call to map your goals, target audience, page count, CMS structure, required integrations, and brand guidelines. Our Webflow strategist documents the full site architecture before a single design frame is opened.'],
                ['Design','We build a pixel-perfect Figma prototype - desktop and mobile - covering every page state and interaction. You review, provide feedback, and sign off before Webflow development begins. Design-approved means no surprises in build.'],
                ['Build','Our Webflow developers translate the approved Figma into a clean, semantic Webflow project - with CMS Collections configured, animations implemented, integrations wired, and all content migrated. Weekly demo links keep you in the loop.'],
                ['Launch','We run a full QA pass (mobile, cross-browser, forms, CMS, performance), configure SEO settings, set up 301 redirects, connect your domain, and hand over a recorded walkthrough so your team can manage content independently from day one.'],
              ].map(([title, desc], i) => (
                <div
                  className={`wf-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="wf-pstep-left">
                    <div className="wf-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="wf-pstep-arrow" />}
                  </div>
                  <div className="wf-pstep-content">
                    <h3 className="wf-pstep-title">{title}</h3>
                    <p className="wf-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="wf-process-image-col">
              <div className="wf-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/webflow-development-company-india.jpg" alt="1Solutions Webflow development team reviewing a project in the Webflow Designer" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="wf-testi-section">
          <div className="wf-testi-inner">
            <div className={`wf-section-header-center wf-section-reveal${visibleSections.has('testi') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="wf-section-eyebrow">Client Reviews</span>
              <h2 className="wf-section-title">What Our Clients Say</h2>
              <p className="wf-section-sub">Trusted by SaaS companies, agencies, and professional services firms across the US, Canada, and Australia.</p>
            </div>
            <div className="wf-testi-marquee-outer">
              <div className="wf-testi-fade wf-testi-fade--l" />
              <div className="wf-testi-fade wf-testi-fade--r" />

              <div className="wf-testi-marquee-wrap">
                <div className="wf-testi-track">
                  {[...WF_TESTIMONIALS, ...WF_TESTIMONIALS].map((t, i) => (
                    <div className="wf-testi-card" key={`row1-${t.name}-${i}`}>
                      <div className="wf-testi-card-stars">★★★★★</div>
                      <p className="wf-testi-card-text">&quot;{t.text}&quot;</p>
                      <div className="wf-testi-card-name">{t.name}</div>
                      <div className="wf-testi-card-role">{t.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="wf-testi-marquee-wrap">
                <div className="wf-testi-track wf-testi-track--rev">
                  {[...WF_TESTIMONIALS_ROW2, ...WF_TESTIMONIALS_ROW2].map((t, i) => (
                    <div className="wf-testi-card" key={`row2-${t.name}-${i}`}>
                      <div className="wf-testi-card-stars">★★★★★</div>
                      <p className="wf-testi-card-text">&quot;{t.text}&quot;</p>
                      <div className="wf-testi-card-name">{t.name}</div>
                      <div className="wf-testi-card-role">{t.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="wf-testi-stats">
              {[['4.9/5','Average Rating'],['150+','Verified Reviews'],['98%','Client Satisfaction'],['96%','Repeat Clients']].map(([num,label],i,arr) => (
                <>
                  <div className="wf-tstat" key={label}>
                    <span className="wf-tstat-num">{num}</span>
                    <span className="wf-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="wf-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="wf-why-section">
          <div className="wf-why-inner">
            <div className={`wf-section-reveal${visibleSections.has('why') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="wf-section-eyebrow">Why 1Solutions</span>
              <h2 className="wf-section-title">Why Businesses Choose Us for Webflow Development</h2>
              <p className="wf-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just build Webflow sites - we build revenue-generating digital platforms. Here's what makes us different from freelancers and generic web agencies.</p>
            </div>
            <div className="wf-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`wf-why-card${visibleWhyCards.includes(i) ? ' wf-card-visible' : ''}`} key={w.title} style={{ background:w.bg, transitionDelay:`${i * 0.05}s` }}>
                  <div className="wf-why-card-header">
                    <div className="wf-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="wf-engage-section" id="engagement">
          <div className="wf-engage-inner">
            <div className="wf-engage-header">
              <span className="wf-section-eyebrow">How We Engage</span>
              <h2 className="wf-engage-title">Flexible Webflow Engagement Models</h2>
              <p className="wf-engage-desc">Whether you need a one-time build, a WordPress migration, or an ongoing Webflow partner - pick the model that fits your team and budget.</p>
            </div>

            <div className="wf-plans-grid">
              <article className="wf-pcard">
                <span className="wf-pcard-badge">One-time</span>
                <span className="wf-pcard-name">Fixed-Price Project</span>
                <p className="wf-pcard-blurb">Defined scope &amp; budget - ideal for clearly-scoped builds with a fixed timeline and deliverables.</p>
                <ul className="wf-pcard-features">
                  <li>Shared specialist team</li>
                  <li>Fixed scope &amp; deliverables</li>
                  <li>Budget predictability</li>
                  <li>Monthly progress report</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="wf-pcard-cta">Get a Quote</a>
              </article>
              <article className="wf-pcard">
                <span className="wf-pcard-badge">Flexible</span>
                <span className="wf-pcard-name">Time &amp; Materials</span>
                <p className="wf-pcard-blurb">Scale with evolving requirements - pay for what's delivered, adjust scope any sprint.</p>
                <ul className="wf-pcard-features">
                  <li>Shared specialist team</li>
                  <li>Flexible, evolving scope</li>
                  <li>Bi-weekly reporting</li>
                  <li>Priority task queue</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="wf-pcard-cta">Get a Quote</a>
              </article>
              <article className="wf-pcard wf-pcard--feat">
                <span className="wf-pcard-pop">✦ Most Popular</span>
                <span className="wf-pcard-name">Dedicated Team</span>
                <p className="wf-pcard-blurb">Your extended team - specialists embedded in your workflow, committed to your long-term growth.</p>
                <ul className="wf-pcard-features">
                  <li>Dedicated senior specialists</li>
                  <li>Exclusive monthly retainer</li>
                  <li>Daily standups &amp; tracking</li>
                  <li>Same-day support response</li>
                  <li>NDA &amp; full IP protection</li>
                </ul>
                <a href="#contact" className="wf-pcard-cta wf-pcard-cta--feat">Get Started</a>
              </article>
              <article className="wf-pcard">
                <span className="wf-pcard-badge">Cost-efficient</span>
                <span className="wf-pcard-name">Offshore Model</span>
                <p className="wf-pcard-blurb">Maximum ROI with our expert offshore team - senior-level quality at budget-friendly rates.</p>
                <ul className="wf-pcard-features">
                  <li>Expert offshore team</li>
                  <li>Cost-effective delivery</li>
                  <li>Monthly progress report</li>
                  <li>Budget-focused pricing</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="wf-pcard-cta">Get a Quote</a>
              </article>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="wf-contact-section" id="contact">
          <div className="wf-contact-container">
            <div>
              <h2 className="wf-contact-title">Start Your Webflow Project Today</h2>
              <p className="wf-contact-desc">Tell us about your project and we'll get back to you within one business day with a scoping questionnaire and free consultation slot.</p>
              <div className="wf-merged-box">
                {[
                  { label:'Free scoping consultation', desc:'30-minute call to define your goals, timeline, and budget - no obligation.' },
                  { label:'Detailed fixed-price quote', desc:'Clear scope, milestones, and deliverables with no hidden costs.' },
                  { label:'Figma prototype before build', desc:'You approve every design detail before a single Webflow element is created.' },
                  { label:'Full CMS handoff with training', desc:'Your team edits content independently - no developer dependency after launch.' },
                ].map(b => (
                  <div className="wf-benefit-item" key={b.label}>
                    <div className="wf-benefit-icon-wrap">
                      <svg className="wf-benefit-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p><strong>{b.label}</strong> - {b.desc}</p>
                  </div>
                ))}
                <div className="wf-stats-box">
                  <div className="wf-stats-grid">
                    {[['200+','Webflow sites delivered'],['15+','Years in business'],['96%','Client retention']].map(([n,t]) => (
                      <div key={t}>
                        <div className="wf-stat-number">{n}</div>
                        <div className="wf-stat-text">{t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="wf-form-box">
              <h3>Tell Us About Your Webflow Project</h3>
              <form
                className="wf-contact-form"
                onSubmit={async e => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  await fetch('/api/contact', {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify({
                      name:`${fd.get('fname')} ${fd.get('lname')}`,
                      email:fd.get('email'),
                      phone:`${fd.get('countryCode')} ${fd.get('phone')}`,
                      company:fd.get('company'),
                      message:fd.get('message'),
                      source:'Webflow Development Services',
                      consent:fd.get('consent') === 'on',
                    }),
                  });
                  e.target.reset();
                  alert('Thank you! We\'ll be in touch within one business day.');
                }}
              >
                <div className="wf-form-row">
                  <div className="wf-form-group">
                    <label>First Name *</label>
                    <input name="fname" type="text" placeholder="John" required />
                  </div>
                  <div className="wf-form-group">
                    <label>Last Name *</label>
                    <input name="lname" type="text" placeholder="Smith" required />
                  </div>
                </div>
                <div className="wf-form-group full">
                  <label>Work Email *</label>
                  <input name="email" type="email" placeholder="john@company.com" required />
                </div>
                <div className="wf-form-group full">
                  <label>Phone Number</label>
                  <div className="wf-phone-input">
                    <select name="countryCode" defaultValue="+1">
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+1-CA">🇨🇦 +1</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+91">🇮🇳 +91</option>
                    </select>
                    <input name="phone" type="tel" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div className="wf-form-group full">
                  <label>Company / Website URL</label>
                  <input name="company" type="text" placeholder="Acme Inc. or acme.com" />
                </div>
                <div className="wf-form-group full">
                  <label>Tell Us About Your Project *</label>
                  <textarea name="message" rows={4} placeholder="E.g. 'We need a Webflow site with a blog CMS, animations, and HubSpot integration. Currently on WordPress.'" required style={{ resize:'vertical' }} />
                </div>
                <div className="wf-consent">
                  <input type="checkbox" name="consent" id="wf-consent" required />
                  <label htmlFor="wf-consent">
                    I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to being contacted about my enquiry.
                  </label>
                </div>
                <button type="submit" className="wf-submit-btn">Send My Project Brief →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="wf-faq-section">
          <div className="wf-faq-inner">
            <div className={`wf-section-reveal${visibleSections.has('faq') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['faq'] = el; }}>
              <h2 className="wf-faq-heading">Webflow Development - Frequently Asked Questions</h2>
            </div>
            <div className="wf-faq-list">
              {FAQS.map((f, i) => (
                <div className={`wf-faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                  <button className="wf-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="wf-faq-q-badge">{i + 1}</span>
                    <span>{f.q}</span>
                    <svg className="wf-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="wf-faq-answer-wrap">
                    <div className="wf-faq-answer">
                      <span className="wf-faq-a-badge">A</span>{f.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="wf-related-section">
          <div className="wf-related-inner">
            <span className="wf-related-eyebrow">Explore More Services</span>
            <h2 className="wf-related-title">Related Web & Digital Services</h2>
            <p className="wf-related-sub">1Solutions offers a full spectrum of web development and digital marketing services to complement your Webflow site.</p>
            <hr className="wf-related-divider" />
            <div className="wf-related-tags">
              {[
                ['/web-development-services/','Web Development Services','wf-rtag-blue'],
                ['/website-design/','Website Design','wf-rtag-violet'],
                ['/wordpress-development-company/','WordPress Development','wf-rtag-amber'],
                ['/shopify-store-development/','Shopify Development','wf-rtag-teal'],
                ['/nextjs-development-services/','Next.js Development','wf-rtag-rose'],
                ['/ecommerce-website-development-services/','E-Commerce Development','wf-rtag-green'],
                ['/seo-services-company/','SEO Services','wf-rtag-indigo'],
                ['/conversion-rate-optimization-services/','CRO Services','wf-rtag-orange'],
                ['/content-marketing-services/','Content Marketing','wf-rtag-sky'],
                ['/hire-dedicated-ui-ux-designer/','UI/UX Design','wf-rtag-emerald'],
                ['/website-support-maintenance-services/','Website Support','wf-rtag-blue'],
                ['/hire-full-stack-developer/','Hire Full-Stack Developer','wf-rtag-violet'],
              ].map(([href,label,cls]) => (
                <Link key={href} href={href} className={`wf-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
