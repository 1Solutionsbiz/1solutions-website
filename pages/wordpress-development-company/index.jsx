'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const SERVICES = [
  { n:'01', title:'Custom WordPress Development', desc:'Fully tailored WordPress websites built from scratch, aligned with your brand and business goals.', featured:false },
  { n:'02', title:'WooCommerce Development', desc:'Conversion-optimised online stores with seamless payment integration and scalable architecture.', featured:true },
  { n:'03', title:'WordPress Theme Development', desc:'Pixel-perfect, responsive themes crafted to reflect your brand identity and deliver superior UX.', featured:false },
  { n:'04', title:'Custom Plugin Development', desc:'Extend your site\'s functionality with bespoke plugins built precisely for your requirements.', featured:false },
  { n:'05', title:'Third-party API Integration', desc:'Connect your WordPress site with CRMs, payment gateways, ERPs, and external platforms effortlessly.', featured:false },
  { n:'06', title:'WordPress SEO Optimization', desc:'Technical SEO, Core Web Vitals, schema markup, and content optimisation for top Google rankings.', featured:false },
  { n:'07', title:'Performance Optimization', desc:'Boost page speed, reduce bounce rates, and score 90+ on PageSpeed with proven optimisation techniques.', featured:false },
  { n:'08', title:'WordPress Security & Maintenance', desc:'Proactive security audits, malware removal, regular updates, and 24/7 monitoring to keep you safe.', featured:false },
  { n:'09', title:'WordPress Migration', desc:'Seamless migration from any platform to WordPress with zero data loss and minimal downtime.', featured:false },
  { n:'10', title:'Headless WordPress', desc:'Lightning-fast frontends with Next.js or React, powered by WordPress as a headless CMS.', featured:false },
  { n:'11', title:'Multisite Network Setup', desc:'Manage multiple WordPress sites from one installation — ideal for enterprises and agencies.', featured:false },
  { n:'12', title:'WordPress Support & Care', desc:'Dedicated ongoing support plans with SLA-backed response times so your site never misses a beat.', featured:false },
];

const FAQS = [
  { q:'How much does custom WordPress development cost?', a:'Custom WordPress websites typically start from $2,000 for simple business sites and range up to $15,000+ for complex WooCommerce stores or enterprise builds with custom plugins and integrations. The cost depends on design complexity, number of pages, required functionality, and integrations. We provide a detailed fixed-price quote after a free discovery call — no hidden costs, no surprises.' },
  { q:'How long does a WordPress website project take?', a:'A standard business website typically takes 3–6 weeks from project kick-off to launch. Complex WooCommerce stores or custom plugin builds can take 8–16 weeks. We share a detailed project timeline in the proposal stage and provide weekly progress updates throughout. Our structured 4D process keeps things on track.' },
  { q:'Do you work with clients in the US, Canada, and Australia remotely?', a:'Yes — 100% of our client work is delivered remotely. We have been working with clients across the US, Canada, and Australia since 2008. We schedule meetings in your time zone, use collaboration tools like Slack, Notion, and Loom for clear communication, and maintain full transparency throughout the project lifecycle.' },
  { q:'Can you migrate my existing website to WordPress?', a:'Absolutely. We migrate websites from platforms like Wix, Squarespace, Shopify, Joomla, Drupal, and custom-built sites to WordPress. Our migration process preserves your content, URLs, SEO rankings, and redirects. We test thoroughly on a staging environment before going live to ensure zero data loss and minimal downtime.' },
  { q:'What is included in your WordPress maintenance and support plans?', a:'Our maintenance plans include WordPress core, plugin, and theme updates; daily backups with offsite storage; uptime monitoring; security scanning and malware removal; performance checks; and a set number of content update hours per month. Plans start from $99/month. We also offer dedicated support retainers for businesses needing ongoing development work.' },
  { q:'Do you build WooCommerce stores for international markets?', a:'Yes. We have extensive experience building WooCommerce stores with multi-currency support, international payment gateways (Stripe, PayPal, Afterpay, Klarna), WPML for multilingual support, and region-specific tax/shipping configurations. We\'ve delivered WooCommerce projects for clients across the US, Canada, Australia, UK, and Europe.' },
  { q:'Will my WordPress website be optimised for search engines (SEO)?', a:'Yes — SEO is built into our development process, not bolted on after. Every site we deliver includes proper heading structure, schema markup, Open Graph tags, sitemap, robots.txt, Core Web Vitals optimisation, and Yoast or RankMath configuration. We also offer ongoing SEO services if you need content strategy, link building, or technical SEO audits.' },
  { q:'What makes 1Solutions different from freelancers or other agencies?', a:'Three things: accountability, consistency, and depth. Unlike freelancers, we offer a dedicated team — designers, developers, and a project manager — so your project doesn\'t stall when one person is unavailable. Unlike large agencies, we keep engagements personal with a single point of contact. And unlike generic offshore firms, we specialise specifically in WordPress and understand western market expectations from 16+ years of focused experience.' },
  { q:'Do you offer headless WordPress development?', a:'Yes. We build headless WordPress setups using WordPress as a CMS (via REST API or WPGraphQL) paired with a modern frontend framework like Next.js or React. This approach delivers faster page loads, better security, and greater design flexibility while keeping content management familiar through the WordPress dashboard. Ideal for performance-critical applications and enterprise sites.' },
  { q:'What is a WordPress development company?', a:'A WordPress development company is a specialised agency that designs, builds, and maintains websites using the WordPress CMS. Unlike freelancers or general web agencies, a dedicated WordPress development firm employs full-stack WordPress engineers, UX designers, and project managers focused on the complete WordPress ecosystem — including custom themes, plugin engineering, WooCommerce, REST API integrations, and headless WordPress with Next.js.' },
  { q:'Is WordPress suitable for enterprise-level websites?', a:'Absolutely. WordPress powers enterprise sites for BBC America, The New York Times, and Sony Music. For enterprise use, we configure WordPress with multisite networks, custom REST APIs, headless architecture with Next.js, advanced role-based access control, SSO authentication, Redis caching, and enterprise hosting on Kinsta or WP Engine — meeting the demands of high-traffic, mission-critical applications.' },
  { q:'What is the difference between WordPress.com and WordPress.org?', a:'WordPress.org is the self-hosted, open-source platform where you own the software, can install any plugin, and have full control — this is what professional developers use. WordPress.com is a hosted subscription service with major limitations on plugins, themes, and customisation. All 1Solutions projects are built on WordPress.org (self-hosted) for maximum flexibility, performance, and ownership.' },
  { q:'How much does WooCommerce development cost?', a:'A standard WooCommerce store with a custom theme, up to 50 products, and standard payment integration starts from $3,500–$5,000. Complex stores with custom checkout flows, multi-currency, B2B wholesale pricing, or product configurators range from $8,000–$25,000+. We scope each project individually and provide a fixed-price quote after a free discovery call.' },
  { q:'Can you build a completely custom WordPress theme from scratch?', a:'Yes — custom theme development is one of our core specialities. We design and build themes using HTML5, CSS, PHP, and JavaScript with full Gutenberg block support, ACF integration, and responsive design across all devices. We never use off-the-shelf themes like Avada or Divi unless a client specifically requests it; custom-built themes are faster, more secure, and easier to maintain.' },
  { q:'How do you ensure my WordPress website is secure?', a:'Security is built into our process. Every site we deliver includes SSL setup, WordPress security hardening (brute-force protection, file permission hardening), a web application firewall (Sucuri or Cloudflare), malware scanning, login protection with two-factor authentication, and automated daily backups with offsite storage. Ongoing maintenance plans include weekly security scans and immediate malware removal.' },
  { q:'Do you offer WordPress multisite network development?', a:'Yes. WordPress Multisite lets you run multiple sites from a single installation, sharing themes, plugins, and user bases. We set up multisite networks for enterprises managing multiple brands, universities with department subsites, and franchise businesses. We handle subdomain vs subdirectory configuration, domain mapping, and network-wide plugin management.' },
  { q:'How do you integrate third-party APIs and tools with WordPress?', a:'We integrate WordPress with virtually any third-party platform via REST APIs, webhooks, and dedicated plugins. Common integrations include Salesforce, HubSpot, and Zoho CRMs; Stripe, PayPal, and Authorize.net payment gateways; Mailchimp, Klaviyo, and ActiveCampaign email platforms; Google Analytics and Search Console; and ERP systems. We build custom PHP integrations when no plugin solution exists.' },
  { q:'What WordPress page builders do you work with?', a:'We work with all major page builders including Elementor Pro, Divi, WPBakery, Beaver Builder, and the native Gutenberg block editor. Our preferred approach for new projects is custom Gutenberg block development, which delivers better performance and maintainability than drag-and-drop builders. However, we are experienced with all major builders and will work with whichever you prefer.' },
  { q:'What happens after you launch my WordPress website?', a:'Launch is just the beginning. After going live, we provide a 30-day post-launch support period covering bug fixes and minor adjustments at no extra charge. Beyond that, we offer WordPress maintenance plans from $99/month covering updates, backups, security monitoring, and performance checks. Many clients continue with us on a development retainer for ongoing features, SEO work, and growth initiatives.' },
  { q:'How do I get started with a WordPress development project?', a:'The process is simple: (1) Fill in the contact form on this page. (2) We schedule a free 30-minute discovery call. (3) Within 48 hours, we share a detailed proposal with scope, timeline, and fixed-price quote. (4) Once approved, we kick off with our Discover phase. There is no obligation after the discovery call — it is completely free.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>, title:'15+ Years of Proven Experience', desc:'Since 2008, we\'ve delivered 500+ WordPress projects across industries. Our depth of experience means fewer surprises and faster delivery.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the market nuances, compliance needs, and user expectations of English-speaking western markets — not just generic global delivery.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our structured 4D process (Discover → Define → Develop → Deploy) ensures projects are scoped correctly and delivered without scope creep.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Security-First Development', desc:'Every site we build follows WordPress security hardening standards — SSL, firewall setup, malware scanning, and ongoing monitoring included.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'SEO Built Into Every Build', desc:'We build with Core Web Vitals, schema markup, and on-page SEO baked in from day one — not as an afterthought or expensive add-on.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Point of Contact', desc:'No ticket queues. You get a dedicated project manager who speaks your language, understands your goals, and keeps you updated daily.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'Full-Stack Capability', desc:'Design, development, WooCommerce, API integrations, SEO, speed optimisation — all under one roof. No outsourcing. No finger-pointing.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'97% client retention rate. We don\'t disappear after launch — maintenance plans, support retainers, and growth partnerships keep us invested in your success.' },
];

/* ─── Technology Stack ──────────────────────────── */
const TECH_STACK = [
  { group:'CMS & E-Commerce',           items:['WordPress 6.x','WooCommerce','Gutenberg Blocks','WPGraphQL','ACF Pro','Elementor Pro'] },
  { group:'Frontend Frameworks',         items:['Next.js','React','Gatsby','Alpine.js','Tailwind CSS','GSAP'] },
  { group:'Languages & Databases',       items:['PHP 8.x','JavaScript (ES6+)','TypeScript','MySQL','MariaDB','REST API'] },
  { group:'Hosting & Cloud',             items:['Kinsta','WP Engine','Cloudflare','AWS','DigitalOcean','Vercel'] },
  { group:'Performance & Security',      items:['Redis Cache','Cloudflare CDN','Sucuri WAF','Wordfence','SSL/TLS','PageSpeed'] },
  { group:'SEO & Analytics',             items:['Yoast SEO','RankMath','Schema.org','Google Analytics 4','GTmetrix','Core Web Vitals'] },
];

/* ─── Industries ────────────────────────────────── */
const INDUSTRIES = [
  { icon:'🛒', title:'eCommerce & Retail',       desc:'High-converting WooCommerce stores with custom checkout, multi-currency, and advanced inventory for D2C and B2B brands.' },
  { icon:'🏥', title:'Healthcare & Wellness',    desc:'HIPAA-aware WordPress sites for clinics, telehealth platforms, fitness brands, and healthcare service providers.' },
  { icon:'🏦', title:'Financial Services',       desc:'Secure, compliance-ready sites for financial advisors, fintech startups, trading platforms, and insurance providers.' },
  { icon:'🎓', title:'Education & eLearning',    desc:'LMS-integrated platforms with LearnDash, course management, and membership subscriptions for online education providers.' },
  { icon:'🏠', title:'Real Estate & Property',   desc:'MLS and IDX-integrated property portals, agent directories, and lead generation sites for real estate agencies.' },
  { icon:'🚀', title:'SaaS & Technology',        desc:'Product marketing sites, developer documentation hubs, and feature landing pages for B2B and B2C software companies.' },
  { icon:'📰', title:'Media & Publishing',       desc:'High-traffic editorial platforms, multisite networks, and content monetisation sites for publishers and digital media brands.' },
  { icon:'⚖️', title:'Professional Services',    desc:'Authority-building websites for law firms, consulting agencies, accounting practices, and B2B service providers.' },
];

// Count-up hook
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numTarget = parseInt(target.replace(/\D/g, ''), 10);
    if (!numTarget) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// Individual stat with count-up
function AnimatedStat({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, ''); // e.g. '+' or '%'
  const hasComma = val.includes(',');
  const display = started
    ? (hasComma ? num.toLocaleString() : num) + suffix
    : val;
  return (
    <div className="wp-stat-col" key={label}>
      <div className="wp-stat-label">{label}</div>
      <div className="wp-stat-value">{display}</div>
    </div>
  );
}

export default function WordPressDevelopmentCompany() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleECards, setVisibleECards] = useState([]);
  const stepRefs = useRef([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const eCardsRef = useRef(null);

  // Scroll-reveal for process steps
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

  // Count-up trigger when stats enter viewport
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Why cards staggered reveal
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

  // Testimonial cards staggered reveal
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

  // Engagement cards staggered slide-in
  useEffect(() => {
    if (!eCardsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0,1,2,3].forEach(i => setTimeout(() => setVisibleECards(p => p.includes(i)?p:[...p,i]), i * 130));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(eCardsRef.current);
    return () => obs.disconnect();
  }, []);

  // Section heading fade-up
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

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org",
          "@graph":[
            {"@type":"Organization","@id":"https://www.1solutions.biz/#organization","name":"1Solutions","url":"https://www.1solutions.biz","foundingDate":"2008","description":"WordPress development company with 15+ years experience delivering custom WordPress websites, WooCommerce stores, and enterprise solutions for US, Canada, and Australia.","areaServed":[{"@type":"Country","name":"United States"},{"@type":"Country","name":"Canada"},{"@type":"Country","name":"Australia"},{"@type":"Country","name":"United Kingdom"}]},
            {"@type":"WebPage","@id":"https://www.1solutions.biz/wordpress-development-company/","url":"https://www.1solutions.biz/wordpress-development-company/","name":"WordPress Development Company | Custom WordPress Development | 1Solutions","description":"Hire 1Solutions — a dedicated WordPress development company since 2008. 500+ projects. Custom WordPress, WooCommerce, headless WordPress for US, Canada & Australia.","inLanguage":"en-US","breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.1solutions.biz/"},{"@type":"ListItem","position":2,"name":"WordPress Development Company","item":"https://www.1solutions.biz/wordpress-development-company/"}]}},
            {"@type":"ProfessionalService","name":"WordPress Development Services by 1Solutions","provider":{"@id":"https://www.1solutions.biz/#organization"},"serviceType":"WordPress Development","url":"https://www.1solutions.biz/wordpress-development-company/","areaServed":["United States","Canada","Australia","United Kingdom"],"hasOfferCatalog":{"@type":"OfferCatalog","name":"WordPress Development Services","itemListElement":[{"@type":"Offer","itemOffered":{"@type":"Service","name":"Custom WordPress Development"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"WooCommerce Development"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Headless WordPress Development"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"WordPress Theme Development"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Custom WordPress Plugin Development"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"WordPress Migration"}}]}},
            {"@type":"FAQPage","mainEntity":[
              {"@type":"Question","name":"How much does custom WordPress development cost?","acceptedAnswer":{"@type":"Answer","text":"Custom WordPress websites start from $2,000 for simple business sites and range up to $15,000+ for complex WooCommerce stores or enterprise builds. Cost depends on design complexity, number of pages, functionality, and integrations."}},
              {"@type":"Question","name":"What is a WordPress development company?","acceptedAnswer":{"@type":"Answer","text":"A WordPress development company is a specialised agency that designs, builds, and maintains websites using the WordPress CMS. It employs full-stack WordPress engineers, UX designers, and project managers focused on custom themes, plugins, WooCommerce, REST API integrations, and headless WordPress with Next.js."}},
              {"@type":"Question","name":"Is WordPress suitable for enterprise websites?","acceptedAnswer":{"@type":"Answer","text":"Yes. WordPress powers enterprise sites for BBC America, The New York Times, and Sony Music. For enterprise use cases it can be configured with multisite networks, custom REST APIs, headless architecture, advanced access control, Redis caching, and enterprise hosting."}},
              {"@type":"Question","name":"What is headless WordPress development?","acceptedAnswer":{"@type":"Answer","text":"Headless WordPress decouples the WordPress backend from the frontend. Content is served via REST API or WPGraphQL to a Next.js or React frontend, delivering 3x faster page loads, 98+ Lighthouse scores, and better security while keeping the familiar WordPress admin for editors."}}
            ]}
          ]
        }) }} />
        <title>WordPress Development Company | Custom WordPress Development | 1Solutions</title>
        <meta name="description" content="Hire 1Solutions — a dedicated WordPress development company since 2008. 500+ projects delivered. Custom WordPress, WooCommerce, headless WordPress &amp; enterprise solutions for US, Canada &amp; Australia. Free consultation." />
        <meta name="keywords" content="wordpress development company, custom wordpress development, wordpress development services, woocommerce development, wordpress developers, headless wordpress, wordpress agency" />
        <link rel="canonical" href="https://www.1solutions.biz/wordpress-development-company/" />
        <meta property="og:title" content="WordPress Development Company | Custom WordPress Development | 1Solutions" />
        <meta property="og:description" content="Expert WordPress development company since 2008. 500+ projects, 50+ WordPress specialists. Custom builds, WooCommerce, headless WordPress for US, Canada &amp; Australia." />
        <meta property="og:url" content="https://www.1solutions.biz/wordpress-development-company/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.1solutions.biz/BG-1Solutions.png" />
        <meta property="og:site_name" content="1Solutions" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WordPress Development Company | 1Solutions" />
        <meta name="twitter:description" content="Expert WordPress development company since 2008. 500+ projects delivered for US, Canada &amp; Australia." />
        <style>{`
          .wp-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: fixed;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .wp-page *, .wp-page *::before, .wp-page *::after { box-sizing: border-box; }

          /* Orbs */
          .wp-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.35) 0%,rgba(139,92,246,0.15) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .wp-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.30) 0%,rgba(245,158,11,0.15) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .wp-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .wp-hero-block { background:transparent;position:relative;overflow:hidden; }
          .wp-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .wp-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .wp-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .wp-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .wp-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .wp-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:620px;margin:0 auto 28px; }
          .wp-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wp-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }

          /* Stats */
          .wp-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wp-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .wp-stat-col:last-child { border-right:none; }
          .wp-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .wp-stat-value { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          /* Clients */
          .wp-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .wp-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .wp-clients-logos { width:100%;overflow:hidden; }
          .wp-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .wp-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Sections shared */
          .wp-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .wp-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .wp-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .wp-section-sub { font-size:16px;color:#4A6080;margin:0; }

          /* Services */
          .wp-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.18),0 -4px 16px rgba(15,52,96,0.10); }
          .wp-services-inner { max-width:1280px;margin:0 auto; }
          .wp-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .wp-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .wp-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wp-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wp-service-card:hover .wp-card-num { color:#D97706;opacity:0.12; }
          .wp-service-card:hover h3 { color:#D97706; }
          .wp-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .wp-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .wp-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .wp-service-card.featured { background:rgba(255,255,255,0.60);border-color:rgba(15,52,96,0.12);box-shadow:0 4px 24px rgba(15,52,96,0.08); }
          .wp-service-card.featured:hover { background:rgba(255,255,255,0.75);border-color:rgba(217,119,6,0.45);box-shadow:0 12px 40px rgba(15,52,96,0.18); }
          .wp-services-footer { text-align:center;margin-top:20px; }
          .wp-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(15,52,96,0.20);color:#0F3460;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(15,52,96,0.08);font-family:inherit; }
          .wp-btn-show-more:hover { background:#0F3460;border-color:#0F3460;color:#ffffff;box-shadow:0 8px 28px rgba(15,52,96,0.20);transform:translateY(-2px); }

          /* Portfolio */
          .wp-portfolio-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .wp-portfolio-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wp-portfolio-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;gap:24px; }
          .wp-portfolio-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0; }
          .wp-btn-portfolio-cta { display:inline-block;padding:13px 26px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wp-btn-portfolio-cta:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);color:#0F3460; }
          .wp-portfolio-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .wp-pcard { display:flex;flex-direction:column;background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(15,52,96,0.12);border-radius:12px;overflow:hidden;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .wp-pcard:hover { transform:translateY(-4px);border-color:rgba(217,119,6,0.5);box-shadow:0 12px 40px rgba(0,0,0,0.15); }
          .wp-pcard-thumb { width:100%;aspect-ratio:16/10;overflow:hidden;background:#eee; }
          .wp-pcard-thumb img { width:100%;height:100%;object-fit:cover;display:block; }
          .wp-pcard-body { padding:18px 20px 20px;flex:1; }
          .wp-pcard-name { font-size:18px;font-weight:800;color:#0F3460;margin:0 0 5px; }
          .wp-pcard-tech { font-size:13px;color:#4A6080;margin-bottom:5px;line-height:1.4; }
          .wp-pcard-cats { font-size:13px;font-weight:700;color:#D97706; }

          /* Process */
          .wp-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .wp-process-top { max-width:1280px;margin:0 auto 56px; }
          .wp-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .wp-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .wp-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .wp-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0;width:100%; }
          .wp-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .wp-process-steps { display:flex;flex-direction:column; }
          .wp-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .wp-pstep.visible { opacity:1;transform:translateY(0); }
          .wp-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .wp-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .wp-pstep:hover .wp-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .wp-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .wp-pstep-arrow::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.25; }
          .wp-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0F3460;opacity:0.45;margin-top:-1px; }
          .wp-pstep:last-child .wp-pstep-arrow { display:none; }
          .wp-pstep-content { padding:4px 0 44px; }
          .wp-pstep:last-child .wp-pstep-content { padding-bottom:0; }
          .wp-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .wp-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .wp-process-image-col { position:sticky;top:100px;min-width:0; }
          .wp-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(15,52,96,0.15);aspect-ratio:4/5;background:#e8edf5; }
          .wp-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .wp-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .wp-testi-inner { max-width:1280px;margin:0 auto; }
          .wp-section-header-center { text-align:center;margin-bottom:52px; }
          .wp-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .wp-tcard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .wp-tcard:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wp-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wp-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .wp-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .wp-tcard.featured .wp-tcard-text { color:#1f2937; }
          .wp-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .wp-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .wp-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .wp-tcard-role { font-size:12px;color:#6b7280; }
          .wp-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wp-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .wp-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .wp-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .wp-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          /* Why */
          .wp-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .wp-why-inner { max-width:1280px;margin:0 auto; }
          .wp-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .wp-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .wp-why-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wp-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .wp-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .wp-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .wp-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .wp-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Engagement */
          .wp-engage-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .wp-engage-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch; }
          .wp-engage-left { position:sticky;top:100px;display:flex;flex-direction:column; }
          .wp-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .wp-engage-desc { font-size:15px;color:#3A507A;line-height:1.75;margin:0 0 32px; }
          .wp-engage-img-wrap { border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(15,52,96,0.15);flex:1;min-height:300px; }
          .wp-engage-img-wrap img { width:100%;height:100%;min-height:300px;object-fit:cover;display:block; }
          .wp-engage-right { display:flex;flex-direction:column;gap:16px; }
          .wp-ecard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .wp-ecard:hover { border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px); }
          .wp-ecard-header { display:flex;align-items:center;gap:14px;margin-bottom:10px; }
          .wp-ecard-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .wp-ecard-icon svg { width:26px;height:26px;stroke:#D97706;fill:none; }
          .wp-ecard-title { font-size:18px;font-weight:700;color:#0F3460;margin:0; }
          .wp-ecard-desc { font-size:14px;color:#3A507A;line-height:1.65;margin:0 0 16px; }
          .wp-ecard-features { display:grid;grid-template-columns:1fr 1fr;gap:8px 16px; }
          .wp-efeat { display:flex;align-items:center;gap:8px;font-size:13px;color:#2A3F6F;font-weight:500; }
          .wp-efeat-check { color:#D97706;font-size:12px;flex-shrink:0; }

          /* Contact */
          .wp-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .wp-contact-container { max-width:1440px;margin:0 auto;background:none;border:none;box-shadow:none;border-radius:0;overflow:visible;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .wp-contact-left { padding:0;align-self:start; }
          .wp-contact-title { margin-bottom:12px; }
          .wp-contact-desc { margin-bottom:24px; }
          .wp-contact-right { align-self:start; }
          .wp-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .wp-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .wp-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .wp-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .wp-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .wp-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .wp-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .wp-stats-box { padding-top:32px;border-top:1px solid rgba(15,52,96,0.12); }
          .wp-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .wp-stat-number { font-size:40px;font-weight:900;color:#0F3460;line-height:1;display:inline-block;margin-bottom:4px; }
          .wp-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .wp-contact-right { position:relative;padding:0;display:block;vertical-align:top; }
          .wp-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wp-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .wp-contact-form { display:flex;flex-direction:column;gap:16px; }
          .wp-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .wp-form-group { display:flex;flex-direction:column;gap:6px; }
          .wp-form-group.full { grid-column:1/-1; }
          .wp-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .wp-form-group input,.wp-form-group textarea,.wp-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .wp-form-group input:focus,.wp-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .wp-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .wp-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .wp-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .wp-phone-input input:focus { outline:none; }
          .wp-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .wp-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .wp-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .wp-consent a { color:#0F3460;text-decoration:none; }
          .wp-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .wp-submit-btn:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* FAQ */
          .wp-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .wp-faq-inner { max-width:1280px;margin:0 auto; }
          .wp-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .wp-faq-list { display:flex;flex-direction:column;gap:12px; }
          .wp-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .wp-faq-item.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .wp-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .wp-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .wp-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .wp-faq-item.open .wp-faq-q-badge { background:#D97706;color:#fff; }
          .wp-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .wp-faq-item.open .wp-faq-question span { color:#D97706; }
          .wp-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .wp-faq-item.open .wp-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .wp-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .wp-faq-item.open .wp-faq-answer-wrap { max-height:400px; }
          .wp-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .wp-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .wp-related-section { background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .wp-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .wp-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .wp-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .wp-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .wp-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .wp-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .wp-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .wp-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .wp-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .wp-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .wp-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .wp-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .wp-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .wp-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .wp-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .wp-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .wp-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }
          .wp-rtag-pink    { background:rgba(236,72,153,0.10);border-color:rgba(236,72,153,0.28);color:#9D174D; }
          .wp-rtag-lime    { background:rgba(132,204,22,0.10);border-color:rgba(132,204,22,0.28);color:#3F6212; }
          .wp-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }
          .wp-rtag-fuchsia { background:rgba(217,70,239,0.10);border-color:rgba(217,70,239,0.28);color:#86198F; }
          .wp-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .wp-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }

          /* CTA shimmer — wider, brighter sweep */
          .wp-btn-hero-shimmer {
            position:relative;
            overflow:hidden;
          }
          .wp-btn-hero-shimmer::after {
            content:'';
            position:absolute;
            top:-10%;left:-120%;width:80%;height:120%;
            background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);
            animation:wp-shimmer-sweep 2.5s ease-in-out infinite;
            pointer-events:none;
          }
          @keyframes wp-shimmer-sweep {
            0% { left:-120%; }
            35%,100% { left:160%; }
          }

          /* Section fade-up — bigger lift */
          .wp-section-reveal {
            opacity:0;
            transform:translateY(48px);
            transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
          }
          .wp-section-reveal.wp-revealed {
            opacity:1;
            transform:translateY(0);
          }

          /* Why cards staggered reveal */
          .wp-why-card {
            opacity:0;
            transform:translateY(36px) scale(0.97);
            transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1), background 0.25s;
          }
          .wp-why-card.wp-card-visible {
            opacity:1;
            transform:translateY(0) scale(1);
          }

          /* Service card — orange left border slide */
          .wp-service-card {
            position:relative;
          }
          .wp-service-card::before {
            content:'';
            position:absolute;
            left:0;top:12%;height:76%;width:3px;
            background:linear-gradient(180deg,#D97706,#f59e0b);
            border-radius:0 2px 2px 0;
            transform:scaleY(0);
            transform-origin:top center;
            transition:transform 0.3s cubic-bezier(0.22,1,0.36,1);
          }
          .wp-service-card:hover::before {
            transform:scaleY(1);
          }

          /* Client logo marquee */
          .wp-clients-logos {
            overflow:hidden;
            width:100%;
          }
          .wp-logos-track {
            display:flex;
            align-items:center;
            gap:60px;
            width:max-content;
            animation:wp-marquee 28s linear infinite;
          }
          .wp-logos-track:hover {
            animation-play-state:paused;
          }
          @keyframes wp-marquee {
            0% { transform:translateX(0); }
            100% { transform:translateX(-50%); }
          }

          /* Testimonial cards staggered reveal */
          .wp-tcard {
            opacity:0;
            transform:translateY(44px);
            transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s, border-color 0.3s;
          }
          .wp-tcard.wp-tcard-visible {
            opacity:1;
            transform:translateY(0);
          }

          /* Engagement cards staggered slide-in from right */
          .wp-ecard {
            opacity:0;
            transform:translateX(40px);
            transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s;
          }
          .wp-ecard.wp-ecard-visible {
            opacity:1;
            transform:translateX(0);
          }

          /* Mobile background fix — background-attachment:fixed is broken on iOS Safari AND Chrome for iOS */
          @media (max-width:900px) {
            .wp-page {
              background-attachment: scroll !important;
              background: linear-gradient(160deg, #dbeafe 0%, #ede9fe 30%, #e0f2fe 55%, #fef3c7 78%, #fce7f3 100%) !important;
            }
          }

          /* Responsive */
          @media (max-width:1024px) {
            .wp-hero-content h1 { font-size:40px; }
            .wp-services-grid { grid-template-columns:repeat(2,1fr); }
            .wp-why-grid { grid-template-columns:repeat(2,1fr); }
            .wp-portfolio-grid { grid-template-columns:repeat(2,1fr); }
            .wp-portfolio-wrap { padding:32px 28px 40px; }
            .wp-engage-inner { grid-template-columns:1fr; }
            .wp-engage-left { position:static; }
            .wp-process-inner { grid-template-columns:1fr; }
            .wp-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .wp-page { overflow-x:hidden; }
            .wp-hero-content { padding:36px 20px 24px; }
            .wp-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .wp-hero-content p { font-size:15px; }
            .wp-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .wp-stat-col { padding:14px 12px; }
            .wp-stat-col:nth-child(2) { border-right:none; }
            .wp-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .wp-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .wp-stat-value { font-size:22px; }
            .wp-clients-bar { padding:16px 20px 36px;gap:12px; }
            .wp-clients-logos { gap:16px; }
            .wp-client-logo { height:20px; }
            .wp-services-section { padding:48px 20px 40px; }
            .wp-portfolio-section { padding:48px 16px; }
            .wp-portfolio-wrap { padding:24px 20px 32px;border-radius:16px; }
            .wp-portfolio-header { flex-direction:column;align-items:flex-start;gap:14px; }
            .wp-portfolio-title { font-size:26px; }
            .wp-process-section { padding:60px 20px; }
            .wp-process-top { margin-bottom:36px; }
            .wp-testi-section { padding:60px 20px; }
            .wp-testi-section .wp-section-header-center { text-align:left; }
            .wp-testi-section .wp-section-header-center .wp-section-desc { margin-left:0; }
            .wp-why-section { padding:60px 20px; }
            .wp-why-section .wp-section-header-center { text-align:left; }
            .wp-why-section .wp-section-header-center .wp-section-desc { margin-left:0; }
            .wp-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .wp-why-card { padding:24px 20px; }
            .wp-engage-section { padding:60px 20px; }
            .wp-contact-section { padding:48px 16px; }
            .wp-contact-container { grid-template-columns:1fr;gap:20px; }
            .wp-contact-left { padding:0; }
            .wp-contact-right { padding:0; }
            .wp-contact-title { font-size:28px; }
            .wp-faq-section { padding:60px 20px; }
            .wp-faq-heading { font-size:26px; }
            .wp-faq-question { padding:18px 18px 18px 52px; }
            .wp-faq-question span { font-size:14px; }
            .wp-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .wp-faq-q-badge { left:14px; }
            .wp-related-section { padding:60px 20px; }
            .wp-related-tags { justify-content:center;gap:8px; }
            .wp-rtag { padding:9px 16px;font-size:13px; }
            .wp-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .wp-testi-grid { grid-template-columns:1fr; }
            .wp-portfolio-grid { grid-template-columns:1fr; }
            .wp-section-title,.wp-engage-title,.wp-process-main-title,.wp-related-title { font-size:30px; }
            .wp-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .wp-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .wp-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .wp-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .wp-tstat-divider { display:none; }
            .wp-form-row { grid-template-columns:1fr; }
            .wp-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .wp-stat-number { font-size:28px; }
          }
          @media (max-width:480px) {
            .wp-hero-content h1 { font-size:24px; }
            .wp-section-title,.wp-engage-title,.wp-process-main-title,.wp-related-title { font-size:26px; }
            .wp-services-grid { grid-template-columns:1fr; }
            .wp-service-card { padding:20px 18px 18px; }
            .wp-card-num { font-size:52px; }
            .wp-process-main-title { font-size:24px; }
            .wp-pstep-title { font-size:18px; }
            .wp-portfolio-title { font-size:22px; }
            .wp-contact-title { font-size:24px; }
            .wp-engage-title { font-size:26px; }
            .wp-tcard { padding:24px 20px; }
            .wp-ecard { padding:20px; }
            .wp-ecard-features { grid-template-columns:1fr; }
            .wp-merged-box { padding:18px; }
          }

          /* ── Definition Block ── */
          .wp-def-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:2; }
          .wp-def-inner { max-width:1280px;margin:0 auto; }
          .wp-def-block { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wp-def-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px; }
          .wp-def-title { font-size:34px;font-weight:900;color:#0F3460;margin-bottom:18px;line-height:1.2;letter-spacing:-0.5px; }
          .wp-def-body { font-size:16px;color:#374151;line-height:1.8;margin-bottom:14px;max-width:960px; }
          .wp-def-facts { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid rgba(15,52,96,0.10);padding-top:28px;margin-top:28px; }
          .wp-def-fact { display:flex;flex-direction:column;gap:6px; }
          .wp-def-fact-num { font-size:28px;font-weight:900;color:#D97706;line-height:1; }
          .wp-def-fact-label { font-size:13px;color:#4A6080;line-height:1.5; }

          /* ── Technology Stack ── */
          .wp-tech-section { padding:80px 40px;background:transparent;position:relative;z-index:1; }
          .wp-tech-inner { max-width:1280px;margin:0 auto; }
          .wp-tech-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px; }
          .wp-tech-group { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;padding:28px 24px;box-shadow:0 4px 20px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wp-tech-group-title { font-size:12px;font-weight:700;color:#D97706;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px; }
          .wp-tech-tags { display:flex;flex-wrap:wrap;gap:8px; }
          .wp-tech-tag { padding:5px 12px;background:rgba(15,52,96,0.07);border:1px solid rgba(15,52,96,0.12);border-radius:20px;font-size:12px;font-weight:600;color:#374151; }

          /* ── Industries ── */
          .wp-industries-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .wp-industries-inner { max-width:1280px;margin:0 auto; }
          .wp-industry-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:44px; }
          .wp-industry-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;padding:26px 22px;box-shadow:0 4px 16px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,border-color 0.22s,box-shadow 0.22s;cursor:default; }
          .wp-industry-card:hover { transform:translateY(-4px);border-color:rgba(217,119,6,0.35);box-shadow:0 12px 36px rgba(15,52,96,0.12); }
          .wp-industry-icon { font-size:28px;margin-bottom:12px;line-height:1; }
          .wp-industry-card h3 { font-size:15px;font-weight:700;color:#0F3460;margin-bottom:8px;line-height:1.3; }
          .wp-industry-card p { font-size:13px;color:#4A6080;line-height:1.6; }

          /* ── Comparison Table ── */
          .wp-compare-section { padding:80px 40px;background:transparent;position:relative;z-index:1; }
          .wp-compare-inner { max-width:1280px;margin:0 auto; }
          .wp-compare-wrap { margin-top:44px;overflow-x:auto;width:100%;-webkit-overflow-scrolling:touch; }
          .wp-compare-table { width:100%;border-collapse:separate;border-spacing:0;min-width:580px; }
          .wp-compare-table thead tr th { padding:16px 24px;text-align:left;font-size:14px;font-weight:700;background:#0F3460;color:#fff; }
          .wp-compare-table thead tr th:first-child { border-radius:12px 0 0 0; }
          .wp-compare-table thead tr th:last-child { border-radius:0 12px 0 0; }
          .wp-compare-th-hl { background:linear-gradient(135deg,#1a4d80,#0F3460) !important;border-top:3px solid #D97706 !important;color:#fde68a !important; }
          .wp-compare-table tbody tr td { padding:13px 24px;font-size:14px;color:#374151;border-bottom:1px solid rgba(15,52,96,0.08);background:rgba(255,255,255,0.65);vertical-align:middle; }
          .wp-compare-table tbody tr td:first-child { font-weight:600;color:#0F3460;background:rgba(255,255,255,0.80); }
          .wp-compare-table tbody tr td:nth-child(2) { background:rgba(254,243,199,0.35);font-weight:500;color:#0F3460; }
          .wp-compare-table tbody tr:last-child td:first-child { border-radius:0 0 0 12px; }
          .wp-compare-table tbody tr:last-child td:last-child { border-radius:0 0 12px 0; }
          .wp-compare-table tbody tr:hover td { background:rgba(219,234,254,0.40); }
          .wp-compare-table tbody tr:hover td:nth-child(2) { background:rgba(254,243,199,0.55); }

          /* ── Responsive — new sections ── */
          @media (max-width:1024px) {
            .wp-tech-grid { grid-template-columns:repeat(2,1fr); }
            .wp-industry-grid { grid-template-columns:repeat(2,1fr); }
          }
          @media (max-width:768px) {
            .wp-def-section { padding:60px 20px; }
            .wp-def-block { padding:28px 20px; }
            .wp-def-title { font-size:24px; }
            .wp-def-body { font-size:15px; }
            .wp-def-facts { grid-template-columns:1fr 1fr;gap:16px; }
            .wp-def-fact-num { font-size:22px; }
            .wp-tech-section { padding:60px 20px; }
            .wp-tech-grid { grid-template-columns:1fr 1fr;gap:12px;margin-top:32px; }
            .wp-industries-section { padding:60px 20px; }
            .wp-industry-grid { grid-template-columns:1fr 1fr;gap:12px;margin-top:32px; }
            .wp-compare-section { padding:60px 20px; }
            .wp-compare-table thead tr th,.wp-compare-table tbody tr td { padding:11px 14px;font-size:13px; }
          }
          @media (max-width:480px) {
            .wp-def-facts { grid-template-columns:1fr; }
            .wp-tech-grid { grid-template-columns:1fr; }
            .wp-industry-grid { grid-template-columns:1fr; }
          }
        `}</style>
      </Head>

      <div className="wp-page">
        {/* Orbs */}
        <div className="wp-orb-1" />
        <div className="wp-orb-2" />
        <div className="wp-orb-3" />

        {/* ── HERO ── */}
        <div className="wp-hero-block">
          <div className="wp-hero-content">
            <span className="wp-eyebrow">Expert WordPress Development Company · Since 2008</span>
            <h1>WordPress Development Company — Custom Builds, WooCommerce &amp; Enterprise Solutions</h1>
            <p>Build high-performing, secure, and SEO-optimized websites with 1Solutions. Our dedicated WordPress development team delivers custom sites, WooCommerce stores, and headless WordPress solutions — on time, on budget, for clients in the US, Canada, and Australia.</p>
            <Link href="#contact" className="wp-btn-hero wp-btn-hero-shimmer">Get a Free Consultation</Link>
          </div>

          <div className="wp-hero-stats" ref={statsRef}>
            {[['Clients Served','500+'],['WordPress Experts','50+'],['Projects Delivered','1,200+'],['Years in Business','15+']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="wp-clients-bar">
            <span className="wp-clients-label">Trusted by Leading Brands</span>
            <div className="wp-clients-logos">
              <div className="wp-logos-track">
                {[
                  ['/logo/Indian_Express_Logo_full.png','Indian Express'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],
                  ['/logo/Uniphore.jpg','Uniphore'],
                  ['/logo/ICCoLogo.png','ICC'],
                  ['/logo/Honor_Logo_(2020).svg.png','Honor'],
                  ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],
                  ['/logo/amarujala-print-logo_60e03f7d5b4a8.webp','Amar Ujala'],
                  ['/logo/Nuance-Symbol-500x281.png','Nuance'],
                  ['/logo/PHDCCI-Logo-2024.png','PHD Chamber'],
                  ['/logo/Wilson-logo.svg.png','Wilson'],
                  ['/logo/977be174b7bcc8708254a2163b534cbe_fgraphic.png','Client'],
                  ['/logo/india-madeaismartphone2-1747658691.webp','India Made'],
                  /* duplicate for seamless loop */
                  ['/logo/Indian_Express_Logo_full.png','Indian Express2'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon2'],
                  ['/logo/Uniphore.jpg','Uniphore2'],
                  ['/logo/ICCoLogo.png','ICC2'],
                  ['/logo/Honor_Logo_(2020).svg.png','Honor2'],
                  ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv2'],
                  ['/logo/amarujala-print-logo_60e03f7d5b4a8.webp','Amar Ujala2'],
                  ['/logo/Nuance-Symbol-500x281.png','Nuance2'],
                  ['/logo/PHDCCI-Logo-2024.png','PHD Chamber2'],
                  ['/logo/Wilson-logo.svg.png','Wilson2'],
                  ['/logo/977be174b7bcc8708254a2163b534cbe_fgraphic.png','Client2'],
                  ['/logo/india-madeaismartphone2-1747658691.webp','India Made2'],
                ].map(([src,alt]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="wp-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DEFINITION BLOCK ── */}
        <section className="wp-def-section">
          <div className="wp-def-inner">
            <div className={`wp-def-block wp-section-reveal${visibleSections.has('def') ? ' wp-revealed' : ''}`} ref={el => { sectionRefs.current['def'] = el; }}>
              <span className="wp-def-eyebrow">Definition</span>
              <h2 className="wp-def-title">What Is a WordPress Development Company?</h2>
              <p className="wp-def-body">
                A <strong>WordPress development company</strong> is a specialised agency that designs, builds, and maintains websites and web applications using the WordPress content management system (CMS). Unlike freelancers or general web agencies, a dedicated WordPress development firm employs full-stack WordPress engineers, UX designers, and project managers who focus exclusively on the WordPress ecosystem — including custom theme development, plugin engineering, WooCommerce e-commerce, REST API integrations, and headless WordPress with Next.js.
              </p>
              <p className="wp-def-body">
                WordPress powers <strong>43% of all websites</strong> on the internet — from small business sites to enterprise platforms used by BBC America, The New York Times, and Sony Music. A professional WordPress development company brings the specialised skills needed to build performant, secure, and scalable WordPress sites that grow with your business.
              </p>
              <div className="wp-def-facts">
                {[['43%','of all websites globally run on WordPress'],['60,000+','plugins in the WordPress ecosystem'],['$2K – $50K+','typical custom WordPress development range']].map(([num, label]) => (
                  <div className="wp-def-fact" key={label}>
                    <span className="wp-def-fact-num">{num}</span>
                    <span className="wp-def-fact-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="wp-services-section">
          <div className="wp-services-inner">
            <div className={`wp-section-reveal${visibleSections.has('services') ? ' wp-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
            <span className="wp-section-eyebrow">Our Services</span>
            <h2 className="wp-section-title">WordPress Development Services We Offer</h2>
            <p className="wp-section-desc">From custom builds to ongoing support, our WordPress experts deliver end-to-end solutions — designed for performance, security, and long-term growth.</p>
            </div>
            <div className="wp-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`wp-service-card${s.featured?' featured':''}`}>
                  <span className="wp-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="wp-services-footer">
              <button className="wp-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More WordPress Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="wp-portfolio-section" id="portfolio">
          <div className="wp-portfolio-wrap">
            <div className="wp-portfolio-header">
              <h2 className={`wp-portfolio-title wp-section-reveal${visibleSections.has('portfolio') ? ' wp-revealed' : ''}`} ref={el => { sectionRefs.current['portfolio'] = el; }}>500+ WordPress Web Development<br/>Projects Completed</h2>
              <Link href="/portfolio" className="wp-btn-portfolio-cta">Browse Our Portfolio</Link>
            </div>
            <div className="wp-portfolio-grid">
              {[
                { img:'/images/portfolio/comtradesol.webp', name:'Comtradesol — Financial Advisory', tech:'Financial Services / WordPress, Custom Theme, UI/UX Design', cats:'Corporate Website / Trade Finance / Debt Syndication', url:'https://www.comtradesol.com/' },
                { img:'/images/portfolio/charlespuma.webp', name:'Charles Puma — Fine Art Gallery', tech:'Art & Culture / WordPress, Custom Theme, UI/UX Design', cats:'Art Gallery / Multi-location / Exhibitions / Limited Editions', url:'https://www.charlespuma.com/' },
                { img:'/images/portfolio/mountsystems.png', name:'Mount Systems — IT & Security Solutions', tech:'IT & Security / WordPress, Custom Theme, UI/UX Design', cats:'Corporate Website / IT Services / Security Solutions', url:'https://www.mount-systems.com.ki/' },
              ].map(p => (
                <a className="wp-pcard" key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none',color:'inherit'}}>
                  <div className="wp-pcard-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className="wp-pcard-body">
                    <h3 className="wp-pcard-name">{p.name}</h3>
                    <div className="wp-pcard-tech">{p.tech}</div>
                    <div className="wp-pcard-cats">{p.cats}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="wp-process-section">
          <div className="wp-process-top">
            <div className={`wp-section-reveal${visibleSections.has('process') ? ' wp-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
            <p className="wp-process-eyebrow">PARTNERSHIP THAT WORKS</p>
            <h2 className="wp-process-main-title">How We Deliver WordPress Development Services</h2>
            <p className="wp-process-main-desc">Our WordPress development experts, with 15+ years of experience serving clients across the US, Canada, and Australia, develop and deploy tailored solutions to meet your business needs and unique industry demands for sustainable results and long-term success.</p>
            </div>
            <hr className="wp-process-divider" />
          </div>
          <div className="wp-process-inner">
            <div className="wp-process-steps">
              {[
                ['Discover','A leader from our team works with you to understand your business challenges, pain points, and strategic goals to uncover new opportunities and identify the best path forward.'],
                ['Define','We collaborate with your team to define your specific goals, scope, and design needs — evaluating multiple approaches and aligning requirements with your strategic objectives to define the best solution.'],
                ['Develop','Once your solution is defined, our expert WordPress developers get to work — building custom themes, plugins, WooCommerce stores, and integrations with a clear timeline and regular updates.'],
                ['Deploy','Partnering with you, we handle QA testing, performance audits, and a smooth deployment to your live environment — with ongoing support and maintenance to keep your site growing.'],
              ].map(([title, desc], i) => (
                <div
                  className={`wp-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="wp-pstep-left">
                    <div className="wp-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="wp-pstep-arrow" />}
                  </div>
                  <div className="wp-pstep-content">
                    <h3 className="wp-pstep-title">{title}</h3>
                    <p className="wp-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="wp-process-image-col">
              <div className="wp-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions WordPress development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGY STACK ── */}
        <section className="wp-tech-section">
          <div className="wp-tech-inner">
            <div className={`wp-section-reveal${visibleSections.has('tech') ? ' wp-revealed' : ''}`} ref={el => { sectionRefs.current['tech'] = el; }}>
              <span className="wp-section-eyebrow">Technology Stack</span>
              <h2 className="wp-section-title">WordPress Technologies We Work With</h2>
              <p className="wp-section-desc">Our team stays current with the full WordPress technology landscape — from core development to cutting-edge headless architecture and performance tooling.</p>
            </div>
            <div className="wp-tech-grid">
              {TECH_STACK.map(group => (
                <div className="wp-tech-group" key={group.group}>
                  <div className="wp-tech-group-title">{group.group}</div>
                  <div className="wp-tech-tags">
                    {group.items.map(item => (
                      <span className="wp-tech-tag" key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="wp-industries-section">
          <div className="wp-industries-inner">
            <div className={`wp-section-reveal${visibleSections.has('industries') ? ' wp-revealed' : ''}`} ref={el => { sectionRefs.current['industries'] = el; }}>
              <span className="wp-section-eyebrow">Industries We Serve</span>
              <h2 className="wp-section-title">WordPress Development Across Industries</h2>
              <p className="wp-section-desc">We have delivered WordPress solutions for businesses across 8+ verticals — bringing domain-specific knowledge to every project we take on.</p>
            </div>
            <div className="wp-industry-grid">
              {INDUSTRIES.map(ind => (
                <div className="wp-industry-card" key={ind.title}>
                  <div className="wp-industry-icon">{ind.icon}</div>
                  <h3>{ind.title}</h3>
                  <p>{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="wp-compare-section">
          <div className="wp-compare-inner">
            <div className={`wp-section-reveal${visibleSections.has('compare') ? ' wp-revealed' : ''}`} ref={el => { sectionRefs.current['compare'] = el; }}>
              <span className="wp-section-eyebrow">Why Choose Us</span>
              <h2 className="wp-section-title">1Solutions vs Freelancers vs Large Agencies</h2>
              <p className="wp-section-desc">See how our dedicated WordPress development team compares against the alternatives — so you can make an informed decision.</p>
            </div>
            <div className="wp-compare-wrap">
              <table className="wp-compare-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="wp-compare-th-hl">1Solutions</th>
                    <th>Freelancer</th>
                    <th>Large Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['WordPress Specialisation','Dedicated focus — 15+ years','Often generalist','One of many services'],
                    ['Team Depth','50+ WordPress specialists','Single developer','100+ but siloed'],
                    ['Pricing','Transparent, mid-market','Low upfront, hidden extras','Premium retainer'],
                    ['Communication','Direct PM + developer access','Depends on individual','Via account manager'],
                    ['Availability','Business hours + emergency cover','Single point of failure','Ticket system'],
                    ['Quality Control','Staged QA + code review','Self-reviewed','Process-heavy, slow'],
                    ['Timeline Reliability','SLA-backed delivery dates','Variable, often delayed','Bureaucratic delays'],
                    ['Post-Launch Support','Plans from $99/mo','Limited, often extra charge','Expensive retainers'],
                  ].map(([feature, us, freelancer, agency]) => (
                    <tr key={feature}>
                      <td>{feature}</td>
                      <td>{us}</td>
                      <td>{freelancer}</td>
                      <td>{agency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="wp-testi-section">
          <div className="wp-testi-inner">
            <div className={`wp-section-header-center wp-section-reveal${visibleSections.has('testi') ? ' wp-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="wp-section-eyebrow">Client Reviews</span>
              <h2 className="wp-section-title">Know What Our Customers Say</h2>
              <p className="wp-section-sub">Trusted by businesses across the US, Canada, Australia and beyond for 15+ years.</p>
            </div>
            <div className="wp-testi-grid" ref={testiGridRef}>
              {[
                { initials:'JM', bg:'#1a4a7a', text:'"1Solutions transformed our outdated website into a high-converting WooCommerce store. Sales increased by 40% within three months of launch. Absolutely outstanding work."', name:'James Mitchell', role:'CEO, RetailEdge — USA', featured:false },
                { initials:'SR', bg:'#0F3460', text:'"Professional, fast, and incredibly detail-oriented. They built our entire WordPress site from scratch with custom plugins and it works flawlessly. Best development partner we\'ve ever had."', name:'Sarah Reynolds', role:'Founder, GreenLeaf Co. — Australia', featured:true },
                { initials:'DL', bg:'#2d5a8e', text:'"We\'ve worked with 1Solutions on four projects over three years. Consistent quality, on-time delivery, and excellent communication. They truly understand our business goals."', name:'Daniel Lowe', role:'CTO, NorthTech — Canada', featured:false },
              ].map((t,i) => (
                <div className={`wp-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' wp-tcard-visible':''}`} key={t.name}>
                  <div className="wp-tcard-stars">★★★★★</div>
                  <p className="wp-tcard-text">{t.text}</p>
                  <div className="wp-tcard-author">
                    <div className="wp-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="wp-tcard-name">{t.name}</div>
                      <div className="wp-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="wp-testi-stats">
              {[['4.9/5','Average Rating'],['200+','Verified Reviews'],['98%','Client Satisfaction'],['85%','Repeat Clients']].map(([num,label],i,arr) => (
                <>
                  <div className="wp-tstat" key={label}>
                    <span className="wp-tstat-num">{num}</span>
                    <span className="wp-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="wp-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="wp-why-section">
          <div className="wp-why-inner">
            <div className={`wp-section-reveal${visibleSections.has('why') ? ' wp-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="wp-section-eyebrow">Why 1Solutions</span>
              <h2 className="wp-section-title">Why Businesses Choose Us Over Other Agencies</h2>
              <p className="wp-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just build websites — we build growth engines. Here's what sets us apart from freelancers and generic agencies.</p>
            </div>
            <div className="wp-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`wp-why-card${visibleWhyCards.includes(i) ? ' wp-card-visible' : ''}`} key={w.title}>
                  <div className="wp-why-card-header">
                    <div className="wp-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="wp-engage-section">
          <div className="wp-engage-inner">
            <div className="wp-engage-left">
              <div className={`wp-section-reveal${visibleSections.has('engage') ? ' wp-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
              <span className="wp-section-eyebrow">Engagement Models</span>
              <h2 className="wp-engage-title">Flexible Engagement Models Built Around You</h2>
              <p className="wp-engage-desc">Client satisfaction is our top priority. We offer flexible engagement models so you can choose the approach that best fits your project, timeline, and budget — with full transparency at every step.</p>
              </div>
              <div className="wp-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Partner-with-us.jpg" alt="Partner With 1Solutions" />
              </div>
            </div>
            <div className="wp-engage-right" ref={eCardsRef}>
              {[
                { title:'Dedicated Team', desc:'Hire a full-time dedicated WordPress team for long-term projects. We deploy a project manager and certified developers who work exclusively on your product.', features:['Cost-effective Approach','Less Administrative Overhead','Quick-paced Development','Timely Reporting'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title:'Fixed-Price', desc:'Ideal for well-defined projects with a clear scope. We agree on deliverables, timeline, and cost upfront — no surprises, no hidden fees.', features:['Complete Budget Control','Ease of Management','No Hidden Costs','On-time Delivery'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { title:'Time & Material', desc:'Perfect for evolving projects where requirements change. Pay only for the hours worked with full visibility into progress and spend.', features:['Maximum Flexibility','Reduced Risk','Iterative Development','On-time Product Delivery'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                { title:'Offshore Development', desc:'Leverage our New Delhi-based team for significant cost savings without compromising quality. Expert developers, US/AU timezone overlap available.', features:['Access to Expert Talent','Shared Responsibility','Managed Team','Cost-Efficient'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              ].map((e,i) => (
                <div className={`wp-ecard${visibleECards.includes(i)?' wp-ecard-visible':''}`} key={e.title}>
                  <div className="wp-ecard-header">
                    <div className="wp-ecard-icon">
                      {e.icon}
                    </div>
                    <h3 className="wp-ecard-title">{e.title}</h3>
                  </div>
                  <p className="wp-ecard-desc">{e.desc}</p>
                  <div className="wp-ecard-features">
                    {e.features.map(f => (
                      <div className="wp-efeat" key={f}><span className="wp-efeat-check">✔</span>{f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="wp-contact-section" id="contact">
          <div className="wp-contact-container">
            <div className="wp-contact-left">
              <h2 className="wp-contact-title">Let's Build Something<br/>Great Together</h2>
              <p className="wp-contact-desc">Tell us about your project and we'll get back to you within 24 hours with a tailored plan.</p>
              <div className="wp-merged-box">
                <div>
                  {[
                    { icon: <svg className="wp-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are confidential. We respect your privacy.' },
                    { icon: <svg className="wp-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A real expert reviews your requirements — not automated responses.' },
                    { icon: <svg className="wp-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Quick response within 24 business hours.' },
                    { icon: <svg className="wp-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"No obligation to proceed. Let's just talk." },
                  ].map((b,i) => (
                    <div className="wp-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="wp-benefit-icon-wrap">
                        {b.icon}
                      </div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="wp-stats-box">
                  <div className="wp-stats-grid">
                    {[['500+','Projects Delivered'],['16+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="wp-stat-number">{num}</div>
                        <div className="wp-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="wp-contact-right">
              <div className="wp-form-box">
                <h3>Contact Us</h3>
                <form className="wp-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="wp-form-row">
                    <div className="wp-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="wp-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="wp-form-row">
                    <div className="wp-form-group">
                      <label>Phone Number*</label>
                      <div className="wp-phone-input">
                        <select className="wp-country-code">
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="wp-form-group"><label>Organization*</label><input type="text" placeholder="Organization / Institution*" required /></div>
                  </div>
                  <div className="wp-form-group full"><label>Message*</label><textarea placeholder="Message*" rows={6} required /></div>
                  <div className="wp-consent">
                    <input type="checkbox" id="wp-consent" required />
                    <label htmlFor="wp-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="wp-submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="wp-faq-section" id="faq">
          <div className="wp-faq-inner">
            <h2 className="wp-faq-heading">WordPress Development — Frequently Asked Questions</h2>
            <div className="wp-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`wp-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="wp-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="wp-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="wp-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="wp-faq-answer-wrap">
                    <div className="wp-faq-answer"><span className="wp-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="wp-related-section">
          <div className="wp-related-inner">
            <span className="wp-related-eyebrow">WORDPRESS RELATED OFFERINGS</span>
            <h2 className="wp-related-title">Explore Related Services and Technologies</h2>
            <p className="wp-related-sub">Pair our WordPress development expertise with related services to tackle your most important business initiatives.</p>
            <hr className="wp-related-divider" />
            <div className="wp-related-tags">
              {[
                ['WooCommerce Development',          'blue',    '/woocommerce-development-company'],
                ['E-Commerce Website Development',   'amber',   '/ecommerce-website-development-services'],
                ['WordPress Maintenance & Support',  'green',   '/wordpress-support-and-maintenance-services'],
                ['SEO for WordPress',                'rose',    '/wordpress-seo-services'],
                ['Headless WordPress Development',   'sky',     '/headless-wordpress-development'],
                ['Responsive Web Design',            'cyan',    '/website-design'],
                ['UI/UX Design Services',            'fuchsia', '/website-design'],
                ['PHP Development',                  'slate',   '/php-development-services'],
                ['Digital Marketing Services',       'emerald', '/digital-marketing-services'],
              ].map(([label,color,href]) => (
                <Link href={href} className={`wp-rtag wp-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
