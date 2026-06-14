'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Joomla Development Company', item: 'https://www.1solutions.biz/joomla-development-company/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Joomla Development',
      url: 'https://www.1solutions.biz/joomla-development-company/',
      description: 'Expert Joomla development services — custom Joomla templates, component and plugin development, Joomla eCommerce, migration from legacy CMS to Joomla, and Joomla maintenance and security hardening for businesses worldwide.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '84', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What can you build with Joomla?', acceptedAnswer: { '@type': 'Answer', text: 'Joomla is a powerful open-source CMS suited to corporate websites, membership portals, online communities, government and NGO websites, multilingual websites, eCommerce stores (via VirtueMart or HikaShop), job boards, document management portals, and complex multi-user websites with granular access control levels (ACL). Its multi-level ACL system and built-in multilingual support make it particularly strong for organisations needing fine-grained permission hierarchies or publishing in multiple languages without plugins.' } },
        { '@type': 'Question', name: 'How is Joomla different from WordPress?', acceptedAnswer: { '@type': 'Answer', text: 'Joomla has a more sophisticated built-in access control system (ACL) than WordPress, better native multilingual support without requiring plugins, and a more structured content model with categories and tags built into core. WordPress has a larger plugin ecosystem and a gentler learning curve for non-technical editors. Joomla tends to be chosen by organisations that need complex user role hierarchies, government or enterprise content governance structures, or robust multilingual publishing — without relying on third-party plugins for these capabilities.' } },
        { '@type': 'Question', name: 'Can you migrate our existing website to Joomla?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We handle migrations to Joomla from WordPress, Drupal, Magento, Joomla 3.x to Joomla 4.x/5.x, and static HTML websites. Migration covers content (articles, categories, tags), users and access levels, media library, URL structure (with 301 redirects to preserve SEO), menu structures, and template redesign. We run a parallel staging environment, perform SEO link audit before and after migration, and validate all content before go-live cutover.' } },
        { '@type': 'Question', name: 'Do you build custom Joomla components and plugins?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Custom Joomla component and plugin development is a core service. We build custom Joomla components (MVC-based backend and frontend components), plugins (system, content, authentication, user, search, and editor plugins), modules (sidebar and content area modules), and templates. All custom development follows Joomla coding standards, uses the Joomla Framework API, and is built for compatibility with current Joomla 4.x/5.x and PHP 8.x.' } },
        { '@type': 'Question', name: 'Can you upgrade our Joomla 3.x site to Joomla 4.x or 5.x?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Joomla 3.x reached end-of-life in August 2023, meaning it no longer receives security updates. We handle Joomla 3.x to 4.x and 4.x to 5.x upgrades — assessing third-party extension compatibility, identifying extensions that need to be replaced or updated, migrating custom templates and overrides to Bootstrap 5 (required for Joomla 4+), running the upgrade on a staging clone, testing all site functionality, and managing the production cutover with zero downtime.' } },
        { '@type': 'Question', name: 'What does Joomla security hardening involve?', acceptedAnswer: { '@type': 'Answer', text: 'Joomla security hardening covers: keeping core Joomla and all extensions updated to the latest security releases, removing unused extensions (each is an attack surface), configuring correct file and folder permissions, disabling the Joomla administrator directory path (renaming from /administrator/), implementing two-factor authentication for admin accounts, configuring a Web Application Firewall (WAF) via Akeeba Admin Tools or server-level WAF, enabling HTTPS with HSTS, setting up regular automated backups (Akeeba Backup), and configuring security headers (CSP, X-Frame-Options, etc.).' } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'Custom Joomla Website Development', desc: 'End-to-end Joomla website development — custom templates, content architecture, ACL configuration, menu structure, multilingual setup, and SEO foundations. Corporate websites, membership portals, government, NGO, and community websites built on Joomla 4.x/5.x with PHP 8.x.' },
  { n: '02', title: 'Custom Joomla Template Development', desc: 'Bespoke Joomla templates built from scratch — responsive HTML5/CSS3, Bootstrap 5, pixel-perfect implementation of your brand design system, dark mode, accessibility (WCAG 2.1 AA), and full Cassiopeia/Helix compatibility for Joomla 4.x and 5.x. No cookie-cutter theme purchases.', feat: true },
  { n: '03', title: 'Joomla Component & Plugin Development', desc: 'Custom Joomla MVC components, system and content plugins, authentication plugins, user plugins, search plugins, modules, and editor-XTD plugins — built following Joomla coding standards with PHP 8.x compatibility and full Joomla 4.x/5.x API compliance.' },
  { n: '04', title: 'Joomla eCommerce (VirtueMart / HikaShop)', desc: 'Joomla eCommerce solutions with VirtueMart or HikaShop — product catalogue setup, payment gateway integration (PayPal, Stripe, Razorpay), shipping rule configuration, tax calculation, multi-currency, custom product fields, and WooCommerce migration to Joomla eCommerce.' },
  { n: '05', title: 'Joomla 3.x to 4.x / 5.x Upgrade', desc: 'Safe Joomla version upgrades — extension compatibility audit, replacement of end-of-life third-party extensions, template migration to Bootstrap 5 and Cassiopeia, staging clone testing, database migration, and zero-downtime production cutover with full rollback capability.' },
  { n: '06', title: 'CMS Migration to Joomla', desc: 'Full content migrations to Joomla from WordPress, Drupal, static HTML, legacy CMS platforms — content, users, media, URL structure with 301 SEO redirects, menu rebuild, and access control reconfiguration on staging before production cutover.' },
  { n: '07', title: 'Joomla Multilingual Website Development', desc: 'Native Joomla multilingual websites using the built-in Language Manager, Content Languages, and Language Switcher — no third-party translation plugin required. Hreflang implementation, RTL language support, language-specific menu items, and per-language SEO metadata management.' },
  { n: '08', title: 'Joomla Membership & Subscription Portals', desc: 'Membership and subscription websites on Joomla using CB (Community Builder), AcyMailing, and custom ACL configurations — tiered access levels, paid membership integration with payment gateways, member directory, gated content, automated email workflows, and renewal management.' },
  { n: '09', title: 'Joomla Security Hardening & Malware Removal', desc: 'Joomla security audits, malware removal and website restoration from backup, security hardening (Akeeba Admin Tools, WAF, 2FA, file permission hardening, admin path rename), emergency response for hacked Joomla sites, and ongoing security monitoring.' },
  { n: '10', title: 'Joomla Maintenance & Support', desc: 'Ongoing Joomla maintenance — core and extension updates, performance optimisation (caching, CDN, image optimisation), uptime monitoring, monthly security scan reports, content support, server migration, backup management, and a dedicated Joomla support helpdesk.' },
];

const TECH_STACK = [
  { group: 'Joomla Core', color: '#e11d48', items: ['Joomla 4.x / 5.x', 'Joomla 3.x (legacy)', 'PHP 8.x', 'MySQL / MariaDB', 'Joomla Framework', 'Joomla CLI'] },
  { group: 'Frontend & Templates', color: '#be123c', items: ['HTML5 / CSS3', 'Bootstrap 5', 'JavaScript / jQuery', 'Cassiopeia Template', 'Helix Framework', 'Custom Template Engine'] },
  { group: 'Extensions & Plugins', color: '#D97706', items: ['Akeeba Backup', 'Akeeba Admin Tools', 'JCE Editor', 'K2 / Zoo (content)', 'Virtuemart / HikaShop', 'Community Builder'] },
  { group: 'eCommerce', color: '#14b8a6', items: ['VirtueMart 4.x', 'HikaShop', 'J2Store', 'PayPal / Stripe', 'Razorpay', 'Multi-currency support'] },
  { group: 'Multilingual', color: '#f97316', items: ['Joomla Language Manager', 'Content Languages', 'Language Switcher', 'Hreflang (SEO)', 'RTL Support', 'Falang (legacy)'] },
  { group: 'SEO & Performance', color: '#6366f1', items: ['Joomla SEF URLs', 'sh404SEF', 'OSMap (XML Sitemap)', 'Joomla Cache System', 'CDN Integration', 'PageSpeed Optimisation'] },
  { group: 'Server & DevOps', color: '#0ea5e9', items: ['Apache / Nginx', 'cPanel / Plesk', 'LAMP / LEMP Stack', 'SSL / HTTPS', 'CloudFlare', 'Git-based Deployment'] },
  { group: 'Security & Backup', color: '#a855f7', items: ['Akeeba Admin Tools WAF', '2FA (TOTP)', 'File Permission Hardening', 'Malware Scanner', 'Daily Automated Backups', 'GDPR Compliance'] },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated Joomla Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'A dedicated Joomla team working exclusively on your project.',
    desc: 'Full-time offshore Joomla developers, a designer, and QA working as an extension of your team at a fraction of US/UK/AU cost. Ideal for large Joomla builds, ongoing portal development, or replacing an in-house Joomla team. Full code ownership yours from day one.',
    bestFor: ['Large Joomla portal or membership site', 'Long-term Joomla product with ongoing roadmap', 'Joomla eCommerce platform development', 'Replacing in-house Joomla capacity at lower cost'],
    process: 'Team assembly → Discovery → Sprint delivery → Continuous roadmap',
    timeline: 'Ongoing — scale up or down each quarter',
  },
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-defined scope',
    badgeColor: '#e11d48',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed price. Agreed scope. Delivered on schedule.',
    desc: 'Best for a well-defined Joomla website, custom template, or component build with a clear specification. Fixed price covering design, development, testing, and launch. No scope creep, no surprise invoices.',
    bestFor: ['New Joomla website with defined page count', 'Custom Joomla template from existing design', 'Joomla 3.x to 4.x/5.x upgrade with known scope', 'Custom Joomla component or plugin development'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → Launch',
    timeline: 'Best for projects 6–20 weeks',
  },
  {
    id: 'tm',
    name: 'Retainer / T&M',
    badge: 'Flexible support',
    badgeColor: '#a855f7',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Monthly retainer for Joomla maintenance and ad hoc work.',
    desc: 'A monthly support and development retainer for ongoing Joomla updates, security patches, content changes, new feature additions, and emergency support. Best for organisations that need Joomla kept current and healthy without a full-time developer hire.',
    bestFor: ['Monthly Joomla updates, patches, and security scans', 'Ongoing content and design changes', 'Ad hoc feature additions and extension updates', 'Emergency support and malware incident response'],
    process: 'Monthly retainer → Ticket-based prioritisation → Transparent hours reporting',
    timeline: 'Start within 3–5 business days',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Joomla Architecture Planning', desc: 'We review your content model, user roles and ACL requirements, multilingual needs, extension requirements, and integration landscape. We produce a Joomla architecture document covering content categories, menu structure, ACL levels, and the extension selection or custom development plan before any work begins.' },
  { num: '02', title: 'Design & Joomla Template Prototyping', desc: 'High-fidelity Figma mockups of your key page templates — homepage, content pages, listing pages, and forms. Once approved, we translate these into a custom Joomla template (Bootstrap 5, fully responsive) with position mapping for modules and component output areas.' },
  { num: '03', title: 'Joomla Development & Extension Setup', desc: 'Core Joomla installation, template development, extension installation and configuration, custom component or plugin development, multilingual configuration, ACL setup, SEF URL configuration, and content entry on a password-protected staging environment.' },
  { num: '04', title: 'Content Migration & Data Import', desc: 'Migration of existing content — articles, categories, users, media — from your current platform to Joomla staging. URL mapping and 301 redirect configuration to preserve all SEO equity. Review of migrated content for formatting, images, and link integrity.' },
  { num: '05', title: 'Testing, Security Hardening & Performance', desc: 'Cross-browser and device testing, WCAG accessibility checks, Joomla security hardening (Akeeba Admin Tools, 2FA, file permissions, admin path rename), page speed optimisation (Joomla caching, CDN, image compression), and Lighthouse/GTmetrix performance testing.' },
  { num: '06', title: 'Launch, Training & Ongoing Support', desc: 'DNS cutover and go-live, post-launch monitoring, Akeeba Backup configuration, search engine resubmission, and editorial team training on the Joomla admin interface. Ongoing support retainer available for updates, patches, and new feature development.' },
];

const TESTIMONIALS = [
  {
    text: "Our Joomla 3 site was out of support and we had been hacked twice. 1Solutions migrated us to Joomla 5, cleaned up the malware, hardened the security, and redesigned the template. The new site is fast, secure, and our team actually enjoys managing content in the new admin. We have not had a single security incident since.",
    name: 'Karen B.', role: 'Marketing Director, Industry Association (UK)', init: 'KB', bg: '#0F3460',
  },
  {
    text: "We needed a multilingual membership portal — English, French, Arabic, and Spanish — with different access tiers for members, partners, and public. 1Solutions built it on Joomla with native multilingual support and a custom ACL structure that our admin team can manage without developer help. The RTL Arabic support works perfectly.",
    name: 'Hassan A.', role: 'CTO, International NGO (AU)', init: 'HA', bg: '#4a1942', feat: true,
  },
  {
    text: "1Solutions built a custom Joomla component for our document management workflow — upload, approval, categorisation, and access-controlled download. It replaced a clunky SharePoint setup at a fraction of the ongoing cost. The component integrates with our existing Joomla ACL so permissions management stays in one place.",
    name: 'Chris M.', role: 'IT Director, Professional Services Firm (US)', init: 'CM', bg: '#1e3a5f',
  },
];

const WHY_CARDS = [
  { title: '15+ Years Joomla Development Experience', desc: 'We have been building Joomla websites since Joomla 1.5 — through 2.5, 3.x, 4.x, and now Joomla 5.x. We understand the Joomla framework architecture, the MVC component model, and the ACL system at a depth that comes from a decade and a half of real Joomla projects.' },
  { title: 'Custom Templates, Not Themeforest Purchases', desc: 'Every Joomla template we deliver is built from scratch to your brand — responsive, fast, accessible (WCAG 2.1 AA), and maintainable. No off-the-shelf templates loaded with unused features and styles that slow down your site and complicate future updates.' },
  { title: 'Joomla ACL & Multilingual Specialists', desc: 'Joomla\'s built-in ACL and multilingual systems are its most powerful differentiators. We design and implement complex multi-role access structures and native multilingual websites that use Joomla\'s core capabilities — minimising plugin dependencies and technical debt.' },
  { title: 'Security-First Approach', desc: 'Every Joomla site we build or maintain is security hardened from day one — Akeeba Admin Tools WAF, two-factor authentication, correct file permissions, admin path protection, HTTPS with HSTS, automated daily backups, and monthly security scan reports.' },
  { title: 'Joomla 3.x to 5.x Upgrade Specialists', desc: 'Joomla 3.x is end-of-life. We have migrated dozens of Joomla 3 sites to Joomla 4 and 5 — handling the Bootstrap 5 template migration, extension compatibility audit and replacement, database migration, and production cutover with full rollback capability.' },
  { title: 'Full Stack — Joomla + Server + Performance', desc: 'We configure the full stack your Joomla site runs on — Apache/Nginx, PHP 8.x, MySQL, Redis/Memcached for session caching, CloudFlare CDN, and server-level security — not just the Joomla application layer. Your site is fast and secure end-to-end.' },
  { title: 'Fixed-Price Projects with No Scope Creep', desc: 'We scope Joomla projects in detail before quoting. Our fixed-price contracts include a clear change request process so you always know what is in scope, what is an addition, and what it costs. No surprise invoices at go-live.' },
  { title: 'Ongoing Maintenance Retainers Available', desc: 'Joomla requires regular updates to stay secure. Our monthly maintenance retainers include core and extension updates, security monitoring, performance checks, backup verification, and a set number of hours for ad hoc content and development changes.' },
];

const FAQS = [
  { q: 'What can you build with Joomla?', a: 'Joomla is a powerful open-source CMS suited to corporate websites, membership portals, online communities, government and NGO websites, multilingual websites, eCommerce stores (VirtueMart or HikaShop), job boards, document management portals, and complex multi-user websites needing granular access control. Its multi-level ACL system and native multilingual support make it particularly strong for organisations with complex permission hierarchies or multi-language publishing requirements.' },
  { q: 'How is Joomla different from WordPress?', a: 'Joomla has a more sophisticated built-in ACL than WordPress, better native multilingual support without plugins, and a more structured content model. WordPress has a larger plugin ecosystem and a gentler learning curve for non-technical editors. Joomla is typically chosen by organisations needing complex user role hierarchies, government or enterprise content governance structures, or robust multilingual publishing without relying on third-party plugins for these core capabilities.' },
  { q: 'Can you migrate our website to Joomla?', a: 'Yes. We handle migrations to Joomla from WordPress, Drupal, static HTML, and legacy CMS platforms. Migration covers content (articles, categories, tags), users and access levels, media library, URL structure with 301 redirects to preserve SEO equity, menu rebuild, and template redesign. We run a parallel staging environment, perform an SEO link audit before and after, and validate all content before go-live cutover.' },
  { q: 'Can you upgrade our Joomla 3.x site to Joomla 4.x or 5.x?', a: 'Yes. Joomla 3.x reached end-of-life in August 2023 and no longer receives security updates. We handle Joomla 3.x to 4.x and 4.x to 5.x upgrades — assessing third-party extension compatibility, replacing end-of-life extensions, migrating custom templates to Bootstrap 5, running the upgrade on a staging clone, testing all site functionality, and managing the production cutover with zero downtime and a full rollback plan.' },
  { q: 'Do you build custom Joomla components and plugins?', a: 'Yes. We build custom Joomla MVC components (backend and frontend), system and content plugins, authentication plugins, user plugins, search plugins, modules, and editor-XTD plugins. All custom development follows Joomla coding standards, uses the Joomla Framework API, and is built for PHP 8.x compatibility with Joomla 4.x and 5.x. We also develop Joomla extensions as commercial products for third-party distribution.' },
  { q: 'What does Joomla security hardening involve?', a: 'Joomla security hardening covers: keeping core Joomla and all extensions updated to latest security releases, removing unused extensions, configuring correct file and folder permissions, renaming the /administrator/ path, implementing two-factor authentication for admin accounts, configuring a Web Application Firewall via Akeeba Admin Tools, enabling HTTPS with HSTS, setting up automated daily backups via Akeeba Backup, and configuring security response headers (CSP, X-Frame-Options, Referrer-Policy).' },
  { q: 'Can you build multilingual Joomla websites?', a: 'Yes. Multilingual Joomla development is a speciality. We use the native Joomla Language Manager, Content Languages, and Language Switcher to build multilingual sites without third-party translation plugins. We implement hreflang tags for international SEO, RTL language support (Arabic, Hebrew, Persian), language-specific menu items and module assignments, per-language SEO metadata, and language-specific access control if required. We have built Joomla sites in English, French, Spanish, Arabic, German, Dutch, and other languages simultaneously.' },
  { q: 'Do you offer ongoing Joomla maintenance and support?', a: 'Yes. Our Joomla maintenance retainers cover monthly core and extension updates, security patch application within 48 hours of release, monthly security scan reports, uptime monitoring, daily automated backup verification, performance monitoring (PageSpeed, Core Web Vitals), and a set number of hours each month for content updates, design changes, and new feature additions. We also offer emergency response for hacked or down Joomla sites with a 4-hour SLA for critical incidents.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    let t0 = null;
    const step = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  return (
    <div className="jo-stat-col">
      <div className="jo-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="jo-stat-label">{label}</div>
    </div>
  );
}

export default function JoomlaDevelopment() {
  const [showAllSvc, setShowAllSvc] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleSvcCards, setVisibleSvcCards] = useState([]);
  const [visibleEngCards, setVisibleEngCards] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleStackCards, setVisibleStackCards] = useState([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const svcGridRef = useRef(null);
  const engGridRef = useRef(null);
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const stackGridRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const pairs = [[svcGridRef, SERVICES.length, setVisibleSvcCards],[engGridRef, 3, setVisibleEngCards],[whyGridRef, WHY_CARDS.length, setVisibleWhyCards],[testiGridRef, 3, setVisibleTestiCards],[stackGridRef, TECH_STACK.length, setVisibleStackCards]];
    const observers = pairs.map(([ref, count, setter]) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 80)); obs.disconnect(); } }, { threshold: 0.05 });
      obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.1 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const visibleServices = showAllSvc ? SERVICES : SERVICES.slice(0, 6);

  return (
    <>
      <Head>
        <title>Joomla Development Company | Custom Joomla Templates, Components & Upgrades | 1Solutions</title>
        <meta name="description" content="Expert Joomla development — custom templates, components, plugins, Joomla 3 to 5 upgrades, multilingual portals, eCommerce, security hardening. 15+ years. Free consultation." />
        <link rel="canonical" href="https://www.1solutions.biz/joomla-development-company/" />
        <meta property="og:title" content="Joomla Development Company | 1Solutions" />
        <meta property="og:description" content="Custom Joomla development — templates, components, Joomla 3.x to 5.x upgrades, multilingual, membership portals, eCommerce, and security hardening. 15+ years experience." />
        <meta property="og:url" content="https://www.1solutions.biz/joomla-development-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .jo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fff1f2 0%,#ffe4e6 20%,#fef3c7 50%,#fce7f3 75%,#ede9fe 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .jo-page *,.jo-page *::before,.jo-page *::after{box-sizing:border-box}
          .jo-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .jo-orb-1{width:880px;height:880px;background:radial-gradient(circle,rgba(225,29,72,.20) 0%,rgba(244,63,94,.08) 40%,transparent 70%);top:-280px;right:-260px}
          .jo-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px}
          .jo-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(139,92,246,.14) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .jo-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .jo-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .jo-breadcrumb li{display:flex;align-items:center;gap:6px}
          .jo-breadcrumb li::after{content:'/';opacity:.45}
          .jo-breadcrumb li:last-child::after{display:none}
          .jo-breadcrumb a{color:#0F3460;text-decoration:none}
          .jo-breadcrumb a:hover{text-decoration:underline}
          .jo-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .jo-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .jo-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#e11d48 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .jo-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .jo-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .jo-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .jo-badge-dot{width:7px;height:7px;border-radius:50%;background:#e11d48;flex-shrink:0}
          .jo-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .jo-btn-primary{display:inline-block;padding:14px 36px;background:#e11d48;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(225,29,72,.28)}
          .jo-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .jo-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .jo-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(225,29,72,.5);transform:translateY(-2px)}
          .jo-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .jo-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .jo-stat-col:last-child{border-right:none}
          .jo-stat-val{font-size:28px;font-weight:900;color:#e11d48;letter-spacing:-.5px;line-height:1}
          .jo-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .jo-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .jo-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .jo-logos-wrap{width:100%;overflow:hidden}
          .jo-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:jo-marquee 28s linear infinite}
          .jo-logos-track:hover{animation-play-state:paused}
          @keyframes jo-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .jo-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .jo-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .jo-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .jo-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .jo-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .jo-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .jo-s-reveal.jo-revealed{opacity:1;transform:translateY(0)}
          .jo-inner{max-width:1300px;margin:0 auto}
          .jo-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .jo-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .jo-svc-card{background:linear-gradient(135deg,rgba(255,241,242,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .jo-svc-card.jo-cv{opacity:1;transform:translateY(0)}
          .jo-svc-card.jo-cv:hover{transform:translateY(-6px);border-color:rgba(225,29,72,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .jo-svc-card.feat{border-color:rgba(225,29,72,.20)}
          .jo-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .jo-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .jo-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .jo-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#e11d48,#fb7185);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .jo-svc-card.jo-cv:hover::before{transform:scaleY(1)}
          .jo-svc-more{text-align:center;margin-top:22px}
          .jo-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .jo-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .jo-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .jo-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .jo-stack-card{background:linear-gradient(135deg,rgba(255,241,242,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .jo-stack-card.jo-sv{opacity:1;transform:translateY(0)}
          .jo-stack-card.jo-sv:hover{border-color:rgba(225,29,72,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .jo-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .jo-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .jo-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .jo-eng-section{padding:80px 40px;position:relative;z-index:1}
          .jo-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .jo-eng-card{background:linear-gradient(135deg,rgba(255,241,242,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .jo-eng-card.jo-ev{opacity:1;transform:translateY(0)}
          .jo-eng-card.jo-ev:hover{border-color:rgba(225,29,72,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .jo-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(255,241,242,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .jo-eng-card.feat.jo-ev{transform:translateY(-8px)}
          .jo-eng-card.feat.jo-ev:hover{transform:translateY(-12px)}
          .jo-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .jo-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .jo-eng-card.jo-ev:hover .jo-eng-icon{background:rgba(225,29,72,.10)}
          .jo-eng-card.feat .jo-eng-icon{background:rgba(217,119,6,.10)}
          .jo-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .jo-eng-card.jo-ev:hover .jo-eng-icon svg{fill:#e11d48}
          .jo-eng-card.feat .jo-eng-icon svg{fill:#D97706}
          .jo-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .jo-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .jo-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .jo-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .jo-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .jo-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .jo-eng-list li::before{content:'✓';font-weight:800;color:#e11d48;flex-shrink:0;margin-top:1px}
          .jo-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .jo-eng-process strong{color:#0F3460}
          .jo-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .jo-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .jo-eng-cta:hover{background:#0F3460;color:#fff}
          .jo-eng-card.feat .jo-eng-cta{background:#e11d48;color:#fff;border-color:#e11d48}
          .jo-eng-card.feat .jo-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .jo-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .jo-psteps{display:flex;flex-direction:column;margin-top:52px}
          .jo-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .jo-pstep.jo-pv{opacity:1;transform:translateY(0)}
          .jo-pstep-l{display:flex;flex-direction:column;align-items:center}
          .jo-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .jo-pstep.jo-pv:hover .jo-pstep-circle{background:rgba(225,29,72,.10);border-color:#e11d48;color:#e11d48}
          .jo-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .jo-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .jo-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .jo-pstep:last-child .jo-pstep-connector{display:none}
          .jo-pstep-r{padding:4px 0 38px}
          .jo-pstep:last-child .jo-pstep-r{padding-bottom:0}
          .jo-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .jo-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .jo-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .jo-center-head{text-align:center;margin-bottom:48px}
          .jo-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .jo-tcard{background:linear-gradient(135deg,rgba(255,241,242,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .jo-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(255,241,242,.42) 100%);border-color:rgba(217,119,6,.22)}
          .jo-tcard.jo-tv{opacity:1;transform:translateY(0)}
          .jo-tcard.jo-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .jo-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .jo-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .jo-tauthor{display:flex;align-items:center;gap:12px}
          .jo-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .jo-tname{font-size:14px;font-weight:700;color:#0F3460}
          .jo-trole{font-size:12px;color:#6b7280}
          .jo-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .jo-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .jo-wcard{background:linear-gradient(135deg,rgba(255,241,242,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .jo-wcard.jo-wv{opacity:1;transform:translateY(0) scale(1)}
          .jo-wcard.jo-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(225,29,72,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .jo-wcard-dot{width:10px;height:10px;border-radius:50%;background:#e11d48;margin-bottom:12px}
          .jo-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .jo-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .jo-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(255,241,242,.55) 0%,rgba(255,255,255,.60) 40%,rgba(237,233,254,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .jo-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .jo-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#e11d48 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .jo-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .jo-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .jo-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .jo-cbenefit-icon{flex-shrink:0;color:#e11d48;font-weight:800;font-size:16px;margin-top:1px}
          .jo-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .jo-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(255,241,242,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .jo-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .jo-form{display:flex;flex-direction:column;gap:13px}
          .jo-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .jo-fg{display:flex;flex-direction:column;gap:5px}
          .jo-fg.full{grid-column:1/-1}
          .jo-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .jo-fg input,.jo-fg textarea,.jo-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .jo-fg input:focus,.jo-fg textarea:focus,.jo-fg select:focus{outline:none;border-color:#e11d48;box-shadow:0 0 0 3px rgba(225,29,72,.10)}
          .jo-consent{display:flex;gap:8px;align-items:flex-start}
          .jo-consent input{margin-top:3px;width:15px;height:15px}
          .jo-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .jo-consent a{color:#0F3460}
          .jo-submit{width:100%;padding:14px;background:#e11d48;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(225,29,72,.26)}
          .jo-submit:hover{background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28)}
          .jo-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .jo-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .jo-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .jo-faq-list{display:flex;flex-direction:column;gap:10px}
          .jo-fitem{background:linear-gradient(135deg,rgba(255,241,242,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .jo-fitem.open{border-color:rgba(225,29,72,.30)}
          .jo-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#e11d48,#fb7185);border-radius:3px 3px 0 0}
          .jo-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .jo-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .jo-fitem.open .jo-fq-badge{background:#e11d48;color:#fff}
          .jo-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .jo-fitem.open .jo-fq span{color:#9f1239}
          .jo-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .jo-fitem.open .jo-fchev{transform:rotate(180deg);color:#e11d48}
          .jo-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .jo-fitem.open .jo-fanswer-wrap{max-height:500px}
          .jo-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .jo-related{padding:80px 40px;background:rgba(255,241,242,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .jo-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .jo-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .jo-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .jo-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .jo-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .jo-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .jo-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .jo-rtag-blue{background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8}
          .jo-rtag-violet{background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9}
          .jo-rtag-amber{background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309}
          .jo-rtag-teal{background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E}
          .jo-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .jo-rtag-rose{background:rgba(225,29,72,.09);border-color:rgba(225,29,72,.28);color:#9f1239}
          @media(max-width:1024px){.jo-hero h1,.jo-s-title,.jo-faq h2{font-size:36px}.jo-svc-grid{grid-template-columns:repeat(2,1fr)}.jo-stack-grid{grid-template-columns:repeat(2,1fr)}.jo-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.jo-eng-card.feat{transform:none}.jo-eng-card.feat.jo-ev{transform:none}.jo-eng-card.feat.jo-ev:hover{transform:translateY(-4px)}.jo-why-grid{grid-template-columns:repeat(2,1fr)}.jo-tgrid{grid-template-columns:1fr}.jo-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.jo-breadcrumb{padding:12px 20px 0}.jo-hero{padding:28px 20px 20px}.jo-hero h1{font-size:26px;letter-spacing:-.3px}.jo-stats{grid-template-columns:1fr 1fr}.jo-stat-col:nth-child(2){border-right:none}.jo-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.jo-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.jo-logos{padding:16px 20px 28px}.jo-svc-section,.jo-stack-section,.jo-eng-section,.jo-process-section,.jo-testi,.jo-why-section,.jo-faq,.jo-related{padding:52px 20px}.jo-contact{padding:48px 20px}.jo-svc-grid,.jo-stack-grid,.jo-why-grid{grid-template-columns:1fr}.jo-frow{grid-template-columns:1fr}.jo-ctitle{font-size:28px}.jo-s-title{font-size:28px}}
        `}</style>
      </Head>

      <div className="jo-page">
        <div className="jo-orb jo-orb-1" /><div className="jo-orb jo-orb-2" /><div className="jo-orb jo-orb-3" />

        <nav className="jo-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Joomla Development Company</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <section className="jo-hero">
          <span className="jo-eyebrow">Joomla Development Company</span>
          <h1>Expert Joomla Development — Custom Templates, Components & Joomla 5 Upgrades</h1>
          <p className="jo-hero-desc">We build, upgrade, and maintain Joomla websites — custom templates from scratch, bespoke MVC components and plugins, multilingual portals, eCommerce, Joomla 3.x to 5.x upgrades, and security hardening. 15+ years of Joomla expertise for businesses worldwide.</p>
          <div className="jo-trust-row">
            {['100+ Joomla Projects','Joomla 4.x & 5.x Experts','Custom Templates & Components','15+ Years Experience','Security Hardening Included'].map(b => (
              <div className="jo-badge" key={b}><span className="jo-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="jo-ctas">
            <Link href="#contact" className="jo-btn-primary">Start Your Joomla Project</Link>
            <Link href="#engagement" className="jo-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        <div className="jo-stats" ref={statsRef}>
          {[['100+','Joomla Projects'],['15+','Years Experience'],['50+','Custom Extensions Built'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        <div className="jo-logos">
          <span className="jo-logos-label">Trusted by Leading Organisations</span>
          <div className="jo-logos-wrap">
            <div className="jo-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="jo-clogo" />
              ))}
            </div>
          </div>
        </div>

        <section className="jo-svc-section" aria-labelledby="jo-svc-heading">
          <div className="jo-inner">
            <div className={`jo-s-reveal${visibleSections.has('svc') ? ' jo-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="jo-s-eyebrow">What We Build</span>
              <h2 id="jo-svc-heading" className="jo-s-title">Joomla Development Services We Deliver</h2>
              <p className="jo-s-desc" style={{ maxWidth: 720 }}>From custom Joomla templates and bespoke MVC components through Joomla 3 to 5 upgrades, multilingual portals, membership sites, eCommerce, security hardening, and ongoing maintenance retainers.</p>
            </div>
            <div className="jo-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`jo-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' jo-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="jo-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="jo-svc-more">
                <button className="jo-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="jo-stack-section" aria-labelledby="jo-stack-heading">
          <div className="jo-inner">
            <div className={`jo-s-reveal${visibleSections.has('stk') ? ' jo-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="jo-s-eyebrow">Joomla Tech Stack</span>
              <h2 id="jo-stack-heading" className="jo-s-title">Joomla 5.x, PHP 8.x & the Extension Ecosystem</h2>
              <p className="jo-s-desc" style={{ maxWidth: 680 }}>Joomla 4.x/5.x with PHP 8.x, Bootstrap 5 templates, custom MVC components, VirtueMart/HikaShop eCommerce, Akeeba security suite, native multilingual, and Nginx/CloudFlare performance stack.</p>
            </div>
            <div className="jo-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`jo-stack-card${visibleStackCards.includes(i) ? ' jo-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="jo-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="jo-stack-pills">
                    {grp.items.map(item => <span key={item} className="jo-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="engagement" className="jo-eng-section" aria-labelledby="jo-eng-heading">
          <div className="jo-inner">
            <div className={`jo-s-reveal${visibleSections.has('eng') ? ' jo-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="jo-s-eyebrow">How We Work With You</span>
              <h2 id="jo-eng-heading" className="jo-s-title">Engagement Models for Joomla Development</h2>
              <p className="jo-s-desc" style={{ maxWidth: 680 }}>Whether you need a dedicated Joomla team for a large portal, a fixed-price project for a defined website, or a monthly retainer for ongoing maintenance and updates — we adapt to your project type and budget.</p>
            </div>
            <div className="jo-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`jo-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' jo-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="jo-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="jo-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="jo-eng-name">{m.name}</div>
                  <div className="jo-eng-headline">{m.headline}</div>
                  <div className="jo-eng-desc">{m.desc}</div>
                  <div className="jo-eng-list-label">Best for</div>
                  <ul className="jo-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="jo-eng-process"><strong>Process:</strong> {m.process}<br /><span className="jo-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="jo-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="jo-process-section" aria-labelledby="jo-proc-heading">
          <div className="jo-inner" style={{ maxWidth: 760 }}>
            <div className={`jo-s-reveal${visibleSections.has('proc') ? ' jo-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="jo-s-eyebrow">How We Deliver</span>
              <h2 id="jo-proc-heading" className="jo-s-title">Our Joomla Development Process</h2>
              <p className="jo-s-desc">From architecture planning and custom template design through Joomla development, content migration, security hardening, and go-live — with stakeholder review at every stage on a password-protected staging environment.</p>
            </div>
            <div className="jo-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`jo-pstep${visibleSections.has('proc') ? ' jo-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="jo-pstep-l">
                    <div className="jo-pstep-circle">{step.num}</div>
                    <div className="jo-pstep-connector" />
                  </div>
                  <div className="jo-pstep-r">
                    <div className="jo-pstep-title">{step.title}</div>
                    <p className="jo-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="jo-testi" aria-labelledby="jo-ts-heading">
          <div className="jo-inner">
            <div className={`jo-center-head jo-s-reveal${visibleSections.has('ts') ? ' jo-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="jo-s-eyebrow">Client Results</span>
              <h2 id="jo-ts-heading" className="jo-s-title">What Our Joomla Clients Say</h2>
              <p className="jo-s-desc">Trusted by associations, NGOs, government agencies, professional services firms, and businesses across the US, UK, and Australia who rely on Joomla for mission-critical web publishing.</p>
            </div>
            <div className="jo-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`jo-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' jo-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review">
                  <div className="jo-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="jo-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="jo-tauthor">
                    <div className="jo-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div><div className="jo-tname" itemProp="author">{t.name}</div><div className="jo-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="jo-why-section" aria-labelledby="jo-wy-heading">
          <div className="jo-inner">
            <div className={`jo-s-reveal${visibleSections.has('wy') ? ' jo-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="jo-s-eyebrow">Why 1Solutions</span>
              <h2 id="jo-wy-heading" className="jo-s-title">Why Choose Us for Joomla Development</h2>
              <p className="jo-s-desc" style={{ maxWidth: 680 }}>15+ years of Joomla development — from Joomla 1.5 to Joomla 5.x — with deep expertise in custom templates, MVC components, ACL architecture, native multilingual sites, and security hardening for production Joomla deployments.</p>
            </div>
            <div className="jo-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`jo-wcard${visibleWhyCards.includes(i) ? ' jo-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="jo-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="jo-contact" aria-labelledby="jo-contact-heading">
          <div className="jo-contact-grid">
            <div>
              <h2 id="jo-contact-heading" className="jo-ctitle">Start Your Joomla Project</h2>
              <p className="jo-cdesc">Tell us about your Joomla project and we will schedule a free consultation. Whether you need a new Joomla website, a Joomla 3.x upgrade, a custom component, or an ongoing maintenance retainer — our Joomla specialists will assess your requirements and give you a transparent quote.</p>
              <div className="jo-cbenefits">
                {[['✓','Free 45-minute Joomla project consultation and scope assessment'],['✓','Joomla 3.x to 5.x upgrade feasibility review at no charge'],['✓','Extension compatibility audit and replacement recommendations included'],['✓','Security hardening and performance assessment for existing Joomla sites'],['✓','Response within 24 business hours from our Joomla development team']].map(([icon, text]) => (
                  <div className="jo-cbenefit" key={text}><span className="jo-cbenefit-icon">{icon}</span><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="jo-form-box">
              <h3>Tell Us About Your Joomla Project</h3>
              <form className="jo-form" onSubmit={e => e.preventDefault()}>
                <div className="jo-frow">
                  <div className="jo-fg"><label htmlFor="jo-name">Full Name *</label><input id="jo-name" type="text" placeholder="Your name" required /></div>
                  <div className="jo-fg"><label htmlFor="jo-email">Work Email *</label><input id="jo-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="jo-frow">
                  <div className="jo-fg"><label htmlFor="jo-company">Company / Website URL</label><input id="jo-company" type="text" placeholder="Company or website URL" /></div>
                  <div className="jo-fg"><label htmlFor="jo-phone">Phone / WhatsApp</label><input id="jo-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="jo-fg full">
                  <label htmlFor="jo-type">Project Type *</label>
                  <select id="jo-type" required>
                    <option value="">Select project type...</option>
                    <option>New Joomla Website</option>
                    <option>Custom Joomla Template</option>
                    <option>Custom Joomla Component / Plugin</option>
                    <option>Joomla eCommerce (VirtueMart / HikaShop)</option>
                    <option>Joomla 3.x to 4.x / 5.x Upgrade</option>
                    <option>CMS Migration to Joomla</option>
                    <option>Multilingual Joomla Website</option>
                    <option>Joomla Membership / Subscription Portal</option>
                    <option>Joomla Security Hardening / Malware Removal</option>
                    <option>Ongoing Joomla Maintenance Retainer</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="jo-fg full">
                  <label htmlFor="jo-msg">Project Brief *</label>
                  <textarea id="jo-msg" rows={4} placeholder="Describe your Joomla project — current Joomla version, number of pages, extensions you use, languages, ACL requirements, integrations, and your timeline..." required />
                </div>
                <div className="jo-consent">
                  <input id="jo-consent" type="checkbox" required />
                  <label htmlFor="jo-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. We treat all project details confidentially.</label>
                </div>
                <button type="submit" className="jo-submit">Get Free Joomla Consultation →</button>
              </form>
            </div>
          </div>
        </section>

        <section className="jo-faq" aria-labelledby="jo-faq-heading">
          <div className="jo-inner" style={{ maxWidth: 860 }}>
            <span className="jo-s-eyebrow">FAQ</span>
            <h2 id="jo-faq-heading">Joomla Development — Frequently Asked Questions</h2>
            <p className="jo-faq-sub">Everything you need to know about Joomla development with 1Solutions — from what Joomla is best for, to version upgrades, custom extensions, multilingual sites, and security hardening.</p>
            <div className="jo-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`jo-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="jo-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="jo-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="jo-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="jo-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="jo-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="jo-related">
          <div className="jo-related-inner">
            <span className="jo-s-eyebrow">Explore More</span>
            <h2>Related CMS & Web Development Services</h2>
            <p className="jo-related-sub">We also build WordPress, Drupal, Magento, and custom CMS-powered websites for businesses worldwide.</p>
            <hr />
            <div className="jo-rtags">
              {[['/wordpress-development-company/','WordPress Development','jo-rtag-blue'],['/drupal-development-company/','Drupal Development','jo-rtag-violet'],['/magento-development-company/','Magento Development','jo-rtag-amber'],['/woocommerce-development-company/','WooCommerce Development','jo-rtag-violet'],['/cms-development-company/','CMS Development','jo-rtag-teal'],['/php-development-company/','PHP Development','jo-rtag-rose'],['/website-design-and-development/','Website Design & Development','jo-rtag-blue'],['/website-support-maintenance-services/','Website Maintenance Services','jo-rtag-teal'],['/seo-services/','SEO Services','jo-rtag-green'],['/hire-joomla-developer/','Hire Joomla Developer','jo-rtag-rose']].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`jo-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
