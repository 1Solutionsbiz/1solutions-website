'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

/* ─── Schema ─────────────────────────────────────────────────── */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire WordPress Developer', item: 'https://www.1solutions.biz/hire-wordpress-developer/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Hire WordPress Developer',
      url: 'https://www.1solutions.biz/hire-wordpress-developer/',
      description: 'Hire expert WordPress developers for custom theme development, plugin development, WooCommerce stores, REST API integration, Gutenberg blocks, headless WordPress, and enterprise multisite — on a dedicated, fixed-price, or hourly basis.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '124', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How quickly can I hire a WordPress developer from 1Solutions?', acceptedAnswer: { '@type': 'Answer', text: 'You can have a vetted WordPress developer ready to start within 48–72 hours. Once you share your project requirements, we match you with the right developer profile, conduct a brief skills alignment call, and onboard them to your project immediately after approval. For a dedicated team, the full team is assembled within one week.' } },
        { '@type': 'Question', name: 'Do your WordPress developers have WooCommerce expertise?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our WordPress developers have deep WooCommerce experience including custom theme development, product catalogue architecture, payment gateway integration (Stripe, PayPal, Razorpay, Authorize.net), subscription management via WooCommerce Subscriptions, multi-currency and multi-language stores, and performance optimisation for high-traffic WooCommerce sites. We have delivered WooCommerce stores processing over $10M in annual GMV.' } },
        { '@type': 'Question', name: 'Can your developers build custom WordPress plugins?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Custom WordPress plugin development is one of our strongest capabilities. Our developers build plugins from scratch following WordPress coding standards, with proper hook and filter architecture, custom REST API endpoints, admin dashboard UI, and plugin update mechanisms. We also develop Gutenberg blocks (React-based), custom widgets, and shortcodes. All plugins are tested for compatibility with major WordPress versions and popular themes.' } },
        { '@type': 'Question', name: 'Do you develop headless WordPress with React or Next.js?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We develop headless WordPress architectures using the WordPress REST API and WPGraphQL as the content backend, paired with a React.js or Next.js frontend for a modern, high-performance JAMstack experience. This approach is popular for publishers, eCommerce, and enterprise sites that need both editorial flexibility and front-end performance. We handle the full stack including ISR/SSG configuration, media CDN, and preview mode.' } },
        { '@type': 'Question', name: 'What engagement models do you offer for hiring WordPress developers?', acceptedAnswer: { '@type': 'Answer', text: 'We offer three models. Dedicated Developer: a full-time WordPress developer working exclusively on your project, billed monthly — ideal for ongoing development. Fixed Price: scoped deliverables at an agreed cost — ideal for a theme build, plugin, or migration. Hourly / Time & Material: billed on actual hours — ideal for audits, bug fixes, or sprint-based feature development. All models include daily communication and weekly progress reports.' } },
        { '@type': 'Question', name: 'Can you migrate our existing website to WordPress?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We handle WordPress migrations from any source — Wix, Squarespace, Joomla, Drupal, Magento, Shopify, or a custom-built site. The migration process covers content migration (posts, pages, media, metadata), URL structure preservation with 301 redirects, SEO tag migration, user data transfer, and a staging-to-production cutover with zero downtime. We provide a post-migration audit to verify content integrity and search ranking continuity.' } },
      ],
    },
  ],
};

/* ─── Page data ──────────────────────────────────────────────── */
const SERVICES = [
  { n: '01', title: 'Custom WordPress Theme Development', desc: 'Pixel-perfect custom WordPress themes built from scratch — responsive, accessible, and optimised for Core Web Vitals. We also convert Figma, Adobe XD, and PSD designs to WordPress themes with clean, maintainable PHP and CSS.' },
  { n: '02', title: 'WordPress Plugin Development', desc: 'Custom plugin development following WordPress coding standards — bespoke functionality, REST API endpoints, Gutenberg blocks, admin dashboards, and secure database interactions. GPL-licensed and update-ready.', feat: true },
  { n: '03', title: 'WooCommerce Development', desc: 'Full-featured WooCommerce stores with custom product types, payment gateways, subscription management, multi-currency, multi-language, and performance optimisation for high-traffic catalogues.' },
  { n: '04', title: 'Headless WordPress & REST API', desc: 'Decouple WordPress as a headless CMS using the WP REST API or WPGraphQL, paired with a React.js or Next.js frontend — delivering editorial flexibility with modern front-end performance and SEO.' },
  { n: '05', title: 'Gutenberg Block Development', desc: 'Custom Gutenberg blocks built with React and the WordPress Block API — reusable, editor-friendly content components that give your editorial team fine-grained layout control without code.' },
  { n: '06', title: 'WordPress Multisite & Enterprise', desc: 'WordPress Multisite network setup and management for agency networks, university portals, franchise chains, and enterprise content hubs — with centralised user management, shared plugins, and per-site customisation.' },
  { n: '07', title: 'WordPress Migration & Redesign', desc: 'Migrate from Wix, Squarespace, Joomla, Drupal, or any legacy CMS to WordPress with full content migration, URL structure preservation, 301 redirects, SEO metadata continuity, and zero-downtime cutover.' },
  { n: '08', title: 'Performance & Core Web Vitals Optimisation', desc: 'Systematic WordPress performance audits and optimisation — image compression, lazy loading, database query optimisation, caching (Redis, Memcached, WP Rocket), CDN configuration, and LCP/CLS/FID improvements.' },
  { n: '09', title: 'WordPress Security & Hardening', desc: 'WordPress security audits, malware removal, and hardening — file permission hardening, login protection (2FA, CAPTCHA), WAF configuration, vulnerability patching, SSL enforcement, and security monitoring setup.' },
  { n: '10', title: 'WordPress Maintenance & Support', desc: 'Ongoing WordPress maintenance plans covering core, theme, and plugin updates, daily backups, uptime monitoring, security scanning, monthly performance reports, and developer support hours for content changes.' },
];

const TECH_STACK = [
  {
    group: 'WordPress Core',
    color: '#0073aa',
    items: ['WordPress 6.x', 'PHP 8.x', 'MySQL / MariaDB', 'WP-CLI', 'WordPress REST API', 'WordPress Coding Standards'],
  },
  {
    group: 'Theme & Block Development',
    color: '#3858e9',
    items: ['Gutenberg / Block Editor', 'Full Site Editing (FSE)', 'React.js (Blocks)', 'SCSS / CSS Custom Properties', 'Timber / Twig', 'ACF (Advanced Custom Fields)'],
  },
  {
    group: 'Plugin & Integration',
    color: '#D97706',
    items: ['Custom Plugin Development', 'WPGraphQL', 'Pods Framework', 'Yoast SEO / Rank Math', 'Gravity Forms', 'WP All Import'],
  },
  {
    group: 'WooCommerce',
    color: '#96588a',
    items: ['WooCommerce 8.x', 'Custom Product Types', 'Payment Gateways', 'WooCommerce Subscriptions', 'WPML / Polylang', 'WooCommerce REST API'],
  },
  {
    group: 'Headless & Frontend',
    color: '#0ea5e9',
    items: ['Next.js (ISR / SSG)', 'React.js', 'WPGraphQL', 'Apollo Client', 'Faust.js', 'TypeScript'],
  },
  {
    group: 'Performance & SEO',
    color: '#14b8a6',
    items: ['WP Rocket / LiteSpeed', 'Redis / Memcached', 'Cloudflare CDN', 'Core Web Vitals', 'Structured Data / Schema', 'Yoast SEO'],
  },
  {
    group: 'Security & DevOps',
    color: '#6366f1',
    items: ['Wordfence / Sucuri', 'SSL / HTTPS', 'Two-Factor Auth', 'Docker / Local WP', 'GitHub Actions CI/CD', 'WP Engine / Kinsta'],
  },
  {
    group: 'Hosting & Infrastructure',
    color: '#f97316',
    items: ['WP Engine', 'Kinsta', 'AWS (EC2 / Lightsail)', 'DigitalOcean', 'Cloudflare', 'Nginx / Apache'],
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated Developer',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    headline: 'Your WordPress expert, full-time, exclusively yours.',
    desc: 'A senior WordPress developer working full-time on your project — same timezone overlap, daily standups, direct Slack or Teams access, and weekly sprint delivery. At a fraction of the cost of a UK/US hire.',
    bestFor: ['Ongoing WordPress product or site development', 'Extending or replacing an in-house team', 'WooCommerce store with continuous feature releases', 'Long-term agency white-label WordPress partnership'],
    process: 'Profile match → 1-hr skills call → Onboard in 48hrs → Weekly sprints',
    timeline: 'Month-to-month — scale or pause anytime',
  },
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-scoped projects',
    badgeColor: '#0073aa',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed price. Agreed scope. On-time delivery.',
    desc: 'Ideal for well-defined WordPress projects — a custom theme build, a plugin, a WooCommerce store, or a migration. We agree on deliverables, price, and timeline upfront with milestone-based releases and full transparency.',
    bestFor: ['Custom WordPress theme from Figma/XD', 'Bespoke plugin development', 'WooCommerce store setup and launch', 'CMS migration to WordPress'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → Sign-off',
    timeline: 'Best for projects 4–16 weeks',
  },
  {
    id: 'hourly',
    name: 'Hourly / T&M',
    badge: 'Flexible & fast',
    badgeColor: '#3858e9',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay only for hours worked. Start immediately.',
    desc: 'Billed on actual hours. Best for WordPress audits, bug fixes, performance work, or iterative feature development where scope is not fully defined upfront. Transparent timesheets shared weekly with no minimum commitment.',
    bestFor: ['WordPress performance or security audit', 'Bug fix or emergency support', 'Gutenberg block or plugin feature addition', 'Exploratory R&D or proof-of-concept'],
    process: 'Brief → Start within 24hrs → Weekly timesheets → Pay as you go',
    timeline: 'No minimum — start and stop anytime',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Share Your Requirements', desc: 'Tell us what you need — a theme, plugin, WooCommerce store, migration, or ongoing WordPress support. We review your brief, existing site (if any), and technical constraints before recommending the right developer profile.' },
  { num: '02', title: 'Developer Matching in 24 Hours', desc: 'We match your requirements against our vetted pool of WordPress developers and present 1–3 shortlisted profiles with skills, portfolio samples, and experience summaries relevant to your specific project needs.' },
  { num: '03', title: 'Skills Alignment Call', desc: 'A 30–60 minute technical call between you and the shortlisted developer — covering your stack, coding approach, plugin/theme philosophy, and working style. No commitment required until you are satisfied with the fit.' },
  { num: '04', title: 'Onboarding in 48 Hours', desc: 'Once you approve, the developer is onboarded to your project within 48 hours — access to your repo, staging environment, project management tool (Jira, Linear, Asana), and communication channels (Slack, Teams).' },
  { num: '05', title: 'Agile Sprint Delivery', desc: 'Development proceeds in 1–2 week sprint cycles with sprint demos, code reviews, staging deployments for your review, and a shared Kanban or sprint board. You maintain full visibility and control throughout.' },
  { num: '06', title: 'Ongoing Support & Scaling', desc: 'After launch, your developer continues on maintenance, new features, or performance work. You can scale the team up with additional developers or specialists, or hand off to your in-house team with full code documentation.' },
];

const TESTIMONIALS = [
  {
    text: "We hired a dedicated WordPress developer from 1Solutions to rebuild our agency network on WordPress Multisite. The developer was senior-level, understood our complex taxonomy and user role requirements immediately, and delivered a production-ready platform 2 weeks ahead of schedule.",
    name: 'James T.', role: 'CTO, Digital Agency (UK)', init: 'JT', bg: '#0F3460',
  },
  {
    text: "Our WooCommerce store was slow, losing mobile conversions, and had a messy plugin stack. The 1Solutions developer ran a full audit, refactored our theme, replaced 6 plugins with custom code, and got us to a 94 PageSpeed score. Revenue lifted 22% in the first month.",
    name: 'Rachel M.', role: 'eCommerce Director, Retail Brand (US)', init: 'RM', bg: '#4a1942', feat: true,
  },
  {
    text: "I needed a headless WordPress setup with Next.js for our media publication — fast editorial workflow and sub-second page loads. 1Solutions delivered the WPGraphQL backend and Next.js frontend in 10 weeks. Our Core Web Vitals went from red to green across the board.",
    name: 'Arjun S.', role: 'Head of Product, Online Publisher (AU)', init: 'AS', bg: '#1a4a7a',
  },
];

const WHY_CARDS = [
  { title: '15+ Years WordPress Expertise', desc: 'We have been building WordPress sites, themes, and plugins since WordPress 2.x. Our developers have seen every version, every major architecture shift, and know the platform inside out.' },
  { title: 'Senior, Vetted Developers Only', desc: 'Every developer goes through a multi-stage technical vetting process — PHP coding test, WordPress architecture review, plugin quality audit, and a live problem-solving session. No juniors placed on client projects without supervision.' },
  { title: 'WordPress Coding Standards Compliant', desc: 'All code follows official WordPress Coding Standards for PHP, JavaScript, HTML, and CSS — ensuring your codebase is maintainable, reviewable, and compatible with the WordPress update lifecycle.' },
  { title: 'WooCommerce & Headless Specialists', desc: 'Beyond standard WordPress, we have specialists in WooCommerce (custom product types, payment gateways, subscriptions) and headless WordPress architectures using WPGraphQL, Next.js, and Faust.js.' },
  { title: 'Full IP Ownership, Always', desc: 'All code written by our developers is 100% your intellectual property from day one. We never retain rights to your theme, plugin, or site — and we hand over full source code and documentation at project end.' },
  { title: 'Transparent Communication', desc: 'Daily standups, weekly sprint demos, shared task boards (Jira, Asana, Linear), and direct developer access on Slack or Teams. You always know what your developer is working on and what ships next.' },
  { title: 'US / UK / AU Timezone Coverage', desc: 'Our WordPress developers offer 4–8 hours of daily overlap with US, UK, and Australian business hours. No chasing messages across timezones — real-time collaboration during your working day.' },
  { title: 'No Lock-in, No Minimum Contracts', desc: 'Month-to-month dedicated developers, fixed-price projects with milestone releases, and hourly work with no minimums. You can scale, pause, or stop engagement at any time without penalty.' },
];

const FAQS = [
  { q: 'How quickly can I hire a WordPress developer from 1Solutions?', a: 'You can have a vetted WordPress developer ready to start within 48–72 hours. Once you share your project requirements, we match you with the right developer profile, conduct a brief skills alignment call, and onboard them to your project immediately after approval. For a dedicated team of multiple developers, the full team is typically assembled within one week.' },
  { q: 'Do your WordPress developers have WooCommerce expertise?', a: 'Yes. Our WordPress developers have deep WooCommerce experience including custom theme development, product catalogue architecture, payment gateway integration (Stripe, PayPal, Razorpay, Authorize.net), subscription management via WooCommerce Subscriptions, multi-currency and multi-language stores, and performance optimisation for high-traffic WooCommerce sites. We have delivered WooCommerce stores processing over $10M in annual GMV.' },
  { q: 'Can your developers build custom WordPress plugins?', a: 'Yes. Custom WordPress plugin development is a core specialisation. Our developers build plugins from scratch following WordPress coding standards, with proper hook and filter architecture, custom REST API endpoints, admin dashboard UI, and plugin update mechanisms. We also develop custom Gutenberg blocks (React-based), custom widgets, and shortcodes. All plugins are tested for compatibility with major WordPress versions and popular themes.' },
  { q: 'Do you develop headless WordPress with React or Next.js?', a: 'Yes. We develop headless WordPress architectures using the WordPress REST API and WPGraphQL as the content backend, paired with a React.js or Next.js frontend for a modern, high-performance JAMstack experience. This is popular for publishers, eCommerce brands, and enterprise sites that need both editorial flexibility and front-end performance. We handle the full stack including ISR/SSG configuration, media CDN setup, and WordPress preview mode.' },
  { q: 'What engagement models do you offer for hiring WordPress developers?', a: 'We offer three models. Dedicated Developer: a full-time WordPress expert working exclusively on your project, billed monthly — ideal for ongoing development. Fixed Price: scoped deliverables at an agreed cost — ideal for a theme build, plugin, or migration. Hourly / Time and Material: billed on actual hours with weekly timesheets — ideal for audits, bug fixes, or sprint-based feature development. All models include daily communication and weekly progress reports.' },
  { q: 'Can you migrate our existing website to WordPress?', a: 'Yes. We handle WordPress migrations from any source — Wix, Squarespace, Joomla, Drupal, Magento, Shopify, or a custom-built site. The process covers content migration (posts, pages, media, metadata), URL structure preservation with 301 redirects, SEO tag migration, user data transfer, and a staging-to-production cutover with zero downtime. We also provide a post-migration audit to verify content integrity and search ranking continuity.' },
  { q: 'Do your developers work with page builders like Elementor or Divi?', a: 'Yes — our developers are experienced with Elementor Pro, Divi, Beaver Builder, Bricks Builder, and the native WordPress block editor (Gutenberg). For most client projects we recommend custom themes with the block editor or a lightweight framework for long-term maintainability, but we fully support page builder-based sites where your team requires it. We can also convert page builder sites to custom block-based themes.' },
  { q: 'Do you provide WordPress maintenance and support after project completion?', a: 'Yes. All project deliveries include a 30-day post-launch support period. We also offer ongoing WordPress maintenance plans covering core, theme, and plugin updates, daily automated backups, uptime monitoring, security scanning, monthly performance reports, and developer support hours for content updates and minor feature additions. Support plans start with a defined monthly hour bank and SLA response time.' },
];

/* ─── Hooks ──────────────────────────────────────────────────── */
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
    <div className="hw-stat-col">
      <div className="hw-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="hw-stat-label">{label}</div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function HireWordPressDeveloper() {
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
    const pairs = [
      [svcGridRef, SERVICES.length, setVisibleSvcCards],
      [engGridRef, 3, setVisibleEngCards],
      [whyGridRef, WHY_CARDS.length, setVisibleWhyCards],
      [testiGridRef, 3, setVisibleTestiCards],
      [stackGridRef, TECH_STACK.length, setVisibleStackCards],
    ];
    const observers = pairs.map(([ref, count, setter]) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 80)); obs.disconnect(); }
      }, { threshold: 0.05 });
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
        <title>Hire WordPress Developer | Expert WP Developers for Hire | 1Solutions</title>
        <meta name="description" content="Hire expert WordPress developers — custom themes, plugins, WooCommerce, headless WordPress, Gutenberg blocks & migrations. Dedicated, fixed-price, or hourly. Ready in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-wordpress-developer/" />
        <meta property="og:title" content="Hire WordPress Developer | 1Solutions" />
        <meta property="og:description" content="Hire senior WordPress developers for custom theme, plugin, WooCommerce, headless WP & migration projects. 15+ years | 200+ WP projects | Ready in 48 hours." />
        <meta property="og:url" content="https://www.1solutions.biz/hire-wordpress-developer/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .hw-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .hw-page *,.hw-page *::before,.hw-page *::after { box-sizing:border-box; }

          /* Orbs */
          .hw-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .hw-orb-1 { width:880px;height:880px;background:radial-gradient(circle,rgba(0,115,170,.22) 0%,rgba(56,88,233,.10) 40%,transparent 70%);top:-280px;right:-260px; }
          .hw-orb-2 { width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px; }
          .hw-orb-3 { width:550px;height:550px;background:radial-gradient(circle,rgba(150,88,138,.16) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%); }

          /* Breadcrumb */
          .hw-breadcrumb { position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto; }
          .hw-breadcrumb ol { display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0; }
          .hw-breadcrumb li { display:flex;align-items:center;gap:6px; }
          .hw-breadcrumb li::after { content:'/';opacity:.45; }
          .hw-breadcrumb li:last-child::after { display:none; }
          .hw-breadcrumb a { color:#0F3460;text-decoration:none; }
          .hw-breadcrumb a:hover { text-decoration:underline; }

          /* Hero */
          .hw-hero { position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px; }
          .hw-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px; }
          .hw-hero h1 { font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#0073aa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .hw-hero-desc { font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px; }
          .hw-trust-row { display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px; }
          .hw-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07); }
          .hw-badge-dot { width:7px;height:7px;border-radius:50%;background:#0073aa;flex-shrink:0; }
          .hw-ctas { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
          .hw-btn-primary { display:inline-block;padding:14px 36px;background:#0073aa;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(0,115,170,.30); }
          .hw-btn-primary:hover { background:#0F3460;transform:translateY(-2px); }
          .hw-btn-ghost { display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s; }
          .hw-btn-ghost:hover { background:rgba(255,255,255,.85);border-color:rgba(0,115,170,.5);transform:translateY(-2px); }

          /* Stats */
          .hw-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95); }
          .hw-stat-col { padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10); }
          .hw-stat-col:last-child { border-right:none; }
          .hw-stat-val { font-size:28px;font-weight:900;color:#0073aa;letter-spacing:-.5px;line-height:1; }
          .hw-stat-label { font-size:11px;color:#4A6080;font-weight:500;margin-top:5px; }

          /* Logos */
          .hw-logos { position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px; }
          .hw-logos-label { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0; }
          .hw-logos-wrap { width:100%;overflow:hidden; }
          .hw-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:hw-marquee 28s linear infinite; }
          .hw-logos-track:hover { animation-play-state:paused; }
          @keyframes hw-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .hw-clogo { height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s; }
          .hw-clogo:hover { opacity:.85;filter:grayscale(0%); }

          /* Shared */
          .hw-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .hw-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .hw-s-desc { font-size:15px;color:#4A6080;line-height:1.7; }
          .hw-s-reveal { opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1); }
          .hw-s-reveal.hw-revealed { opacity:1;transform:translateY(0); }
          .hw-inner { max-width:1300px;margin:0 auto; }

          /* Services */
          .hw-svc-section { background:transparent;padding:72px 40px 60px;position:relative;z-index:1; }
          .hw-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px; }
          .hw-svc-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s; }
          .hw-svc-card.hw-cv { opacity:1;transform:translateY(0); }
          .hw-svc-card.hw-cv:hover { transform:translateY(-6px);border-color:rgba(0,115,170,.35);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .hw-svc-card.feat { background:linear-gradient(135deg,rgba(219,234,254,.60) 0%,rgba(255,255,255,.85) 55%,rgba(207,221,255,.45) 100%);border-color:rgba(0,115,170,.20); }
          .hw-svc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .hw-svc-card h3 { font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .hw-svc-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1; }
          .hw-svc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#0073aa,#3858e9);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1); }
          .hw-svc-card.hw-cv:hover::before { transform:scaleY(1); }
          .hw-svc-more { text-align:center;margin-top:22px; }
          .hw-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit; }
          .hw-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }

          /* Tech Stack */
          .hw-stack-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .hw-stack-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .hw-stack-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .hw-stack-card.hw-sv { opacity:1;transform:translateY(0); }
          .hw-stack-card.hw-sv:hover { border-color:rgba(0,115,170,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .hw-stack-group { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid; }
          .hw-stack-pills { display:flex;flex-wrap:wrap;gap:6px; }
          .hw-pill { display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid; }

          /* Engagement Models */
          .hw-eng-section { padding:80px 40px;position:relative;z-index:1; }
          .hw-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .hw-eng-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s; }
          .hw-eng-card.hw-ev { opacity:1;transform:translateY(0); }
          .hw-eng-card.hw-ev:hover { border-color:rgba(0,115,170,.30);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .hw-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .hw-eng-card.feat.hw-ev { transform:translateY(-8px); }
          .hw-eng-card.feat.hw-ev:hover { transform:translateY(-12px); }
          .hw-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .hw-eng-icon { width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s; }
          .hw-eng-card.hw-ev:hover .hw-eng-icon { background:rgba(0,115,170,.10); }
          .hw-eng-card.feat .hw-eng-icon { background:rgba(217,119,6,.10); }
          .hw-eng-icon svg { fill:#0F3460;transition:fill .2s; }
          .hw-eng-card.hw-ev:hover .hw-eng-icon svg { fill:#0073aa; }
          .hw-eng-card.feat .hw-eng-icon svg { fill:#D97706; }
          .hw-eng-name { font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px; }
          .hw-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .hw-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .hw-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .hw-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .hw-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .hw-eng-list li::before { content:'✓';font-weight:800;color:#0073aa;flex-shrink:0;margin-top:1px; }
          .hw-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08); }
          .hw-eng-process strong { color:#0F3460; }
          .hw-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .hw-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .hw-eng-cta:hover { background:#0F3460;color:#fff; }
          .hw-eng-card.feat .hw-eng-cta { background:#0073aa;color:#fff;border-color:#0073aa; }
          .hw-eng-card.feat .hw-eng-cta:hover { background:#0F3460;border-color:#0F3460; }

          /* Process */
          .hw-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .hw-psteps { display:flex;flex-direction:column;margin-top:52px; }
          .hw-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1); }
          .hw-pstep.hw-pv { opacity:1;transform:translateY(0); }
          .hw-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .hw-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .hw-pstep.hw-pv:hover .hw-pstep-circle { background:rgba(0,115,170,.12);border-color:#0073aa;color:#0073aa; }
          .hw-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px; }
          .hw-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .hw-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .hw-pstep:last-child .hw-pstep-connector { display:none; }
          .hw-pstep-r { padding:4px 0 38px; }
          .hw-pstep:last-child .hw-pstep-r { padding-bottom:0; }
          .hw-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .hw-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .hw-testi { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .hw-center-head { text-align:center;margin-bottom:48px; }
          .hw-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .hw-tcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s; }
          .hw-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.22); }
          .hw-tcard.hw-tv { opacity:1;transform:translateY(0); }
          .hw-tcard.hw-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .hw-stars { font-size:16px;color:#D97706;letter-spacing:2px; }
          .hw-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .hw-tauthor { display:flex;align-items:center;gap:12px; }
          .hw-tavatar { width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .hw-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .hw-trole { font-size:12px;color:#6b7280; }

          /* Why */
          .hw-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .hw-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
          .hw-wcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .hw-wcard.hw-wv { opacity:1;transform:translateY(0) scale(1); }
          .hw-wcard.hw-wv:hover { transform:translateY(-5px) scale(1);border-color:rgba(0,115,170,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .hw-wcard-dot { width:10px;height:10px;border-radius:50%;background:#0073aa;margin-bottom:12px; }
          .hw-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .hw-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Contact */
          .hw-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(219,234,254,.65) 0%,rgba(255,255,255,.60) 40%,rgba(207,221,255,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .hw-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .hw-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#0073aa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .hw-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .hw-cbenefits { background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px; }
          .hw-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .hw-cbenefit-icon { flex-shrink:0;color:#0073aa;font-weight:800;font-size:16px;margin-top:1px; }
          .hw-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .hw-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(219,234,254,.22) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .hw-form-box h3 { font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px; }
          .hw-form { display:flex;flex-direction:column;gap:13px; }
          .hw-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .hw-fg { display:flex;flex-direction:column;gap:5px; }
          .hw-fg.full { grid-column:1/-1; }
          .hw-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .hw-fg input,.hw-fg textarea,.hw-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .hw-fg input:focus,.hw-fg textarea:focus,.hw-fg select:focus { outline:none;border-color:#0073aa;box-shadow:0 0 0 3px rgba(0,115,170,.10); }
          .hw-consent { display:flex;gap:8px;align-items:flex-start; }
          .hw-consent input { margin-top:3px;width:15px;height:15px; }
          .hw-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .hw-consent a { color:#0F3460; }
          .hw-submit { width:100%;padding:14px;background:#0073aa;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(0,115,170,.28); }
          .hw-submit:hover { background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28); }

          /* FAQ */
          .hw-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .hw-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .hw-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .hw-faq-list { display:flex;flex-direction:column;gap:10px; }
          .hw-fitem { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s; }
          .hw-fitem.open { border-color:rgba(0,115,170,.35); }
          .hw-fitem.open::before { content:'';display:block;height:3px;background:linear-gradient(90deg,#0073aa,#3858e9);border-radius:3px 3px 0 0; }
          .hw-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .hw-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .hw-fitem.open .hw-fq-badge { background:#0073aa;color:#fff; }
          .hw-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .hw-fitem.open .hw-fq span { color:#004a70; }
          .hw-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .hw-fitem.open .hw-fchev { transform:rotate(180deg);color:#0073aa; }
          .hw-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .hw-fitem.open .hw-fanswer-wrap { max-height:500px; }
          .hw-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* Related */
          .hw-related { padding:80px 40px;background:rgba(219,234,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .hw-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .hw-related h2 { font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px; }
          .hw-related-sub { font-size:14px;color:#4A6080;margin:0 auto;max-width:560px; }
          .hw-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0; }
          .hw-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .hw-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .hw-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .hw-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .hw-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .hw-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .hw-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .hw-rtag-green  { background:rgba(16,185,129,.09);border-color:rgba(16,185,129,.26);color:#065f46; }
          .hw-rtag-navy   { background:rgba(0,115,170,.09);border-color:rgba(0,115,170,.28);color:#004a70; }

          /* Responsive */
          @media(max-width:1024px){
            .hw-hero h1,.hw-s-title,.hw-faq h2 { font-size:36px; }
            .hw-svc-grid { grid-template-columns:repeat(2,1fr); }
            .hw-stack-grid { grid-template-columns:repeat(2,1fr); }
            .hw-eng-grid { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
            .hw-eng-card.feat { transform:none; }
            .hw-eng-card.feat.hw-ev { transform:none; }
            .hw-eng-card.feat.hw-ev:hover { transform:translateY(-4px); }
            .hw-why-grid { grid-template-columns:repeat(2,1fr); }
            .hw-tgrid { grid-template-columns:1fr; }
            .hw-contact-grid { grid-template-columns:1fr; }
          }
          @media(max-width:768px){
            .hw-breadcrumb { padding:12px 20px 0; }
            .hw-hero { padding:28px 20px 20px; }
            .hw-hero h1 { font-size:26px;letter-spacing:-.3px; }
            .hw-stats { grid-template-columns:1fr 1fr; }
            .hw-stat-col:nth-child(2) { border-right:none; }
            .hw-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,.10); }
            .hw-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,.10);border-right:none; }
            .hw-logos { padding:16px 20px 28px; }
            .hw-svc-section,.hw-stack-section,.hw-eng-section,.hw-process-section,.hw-testi,.hw-why-section,.hw-faq,.hw-related { padding:52px 20px; }
            .hw-contact { padding:48px 20px; }
            .hw-svc-grid,.hw-stack-grid,.hw-why-grid { grid-template-columns:1fr; }
            .hw-frow { grid-template-columns:1fr; }
            .hw-ctitle { font-size:28px; }
            .hw-s-title { font-size:28px; }
          }
        `}</style>
      </Head>

      <div className="hw-page">
        <div className="hw-orb hw-orb-1" />
        <div className="hw-orb hw-orb-2" />
        <div className="hw-orb hw-orb-3" />

        {/* ── BREADCRUMB ── */}
        <nav className="hw-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Hire WordPress Developer</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="hw-hero">
          <span className="hw-eyebrow">Hire WordPress Developer</span>
          <h1>Hire Expert WordPress Developers — Vetted, Senior &amp; Ready in 48 Hours</h1>
          <p className="hw-hero-desc">Hire dedicated WordPress developers for custom theme and plugin development, WooCommerce stores, headless WordPress with Next.js, Gutenberg block development, migrations, and ongoing maintenance — on a dedicated, fixed-price, or hourly basis. 15+ years of WordPress expertise across the US, UK, and Australia.</p>
          <div className="hw-trust-row">
            {['Senior, Vetted Developers','WordPress Coding Standards','Ready in 48 Hours','Full IP Ownership','No Lock-in Contracts'].map(b => (
              <div className="hw-badge" key={b}><span className="hw-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="hw-ctas">
            <Link href="#contact" className="hw-btn-primary">Hire a WordPress Developer</Link>
            <Link href="#engagement" className="hw-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="hw-stats" ref={statsRef}>
          {[['200+','WordPress Projects'],['15+','Years Experience'],['48hr','Hire Ready'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        {/* ── CLIENT LOGOS ── */}
        <div className="hw-logos">
          <span className="hw-logos-label">Trusted by Leading Organisations</span>
          <div className="hw-logos-wrap">
            <div className="hw-logos-track">
              {[
                ['/logo/Indian_Express_Logo_full.png','Indian Express'],
                ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],
                ['/logo/Uniphore.jpg','Uniphore'],
                ['/logo/ICCoLogo.png','ICC'],
                ['/logo/Honor_Logo_(2020).svg.png','Honor'],
                ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],
                ['/logo/Indian_Express_Logo_full.png','Indian Express 2'],
                ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],
                ['/logo/Uniphore.jpg','Uniphore 2'],
                ['/logo/ICCoLogo.png','ICC 2'],
                ['/logo/Honor_Logo_(2020).svg.png','Honor 2'],
                ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2'],
              ].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="hw-clogo" />
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="hw-svc-section" aria-labelledby="hw-svc-heading">
          <div className="hw-inner">
            <div className={`hw-s-reveal${visibleSections.has('svc') ? ' hw-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="hw-s-eyebrow">What Our WordPress Developers Build</span>
              <h2 id="hw-svc-heading" className="hw-s-title">WordPress Development Services We Deliver</h2>
              <p className="hw-s-desc" style={{ maxWidth: 720 }}>From custom themes and bespoke plugins to WooCommerce stores, headless WordPress, Gutenberg blocks, and full CMS migrations — our developers cover every aspect of the WordPress platform.</p>
            </div>
            <div className="hw-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`hw-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' hw-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="hw-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="hw-svc-more">
                <button className="hw-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section id="stack" className="hw-stack-section" aria-labelledby="hw-stack-heading">
          <div className="hw-inner">
            <div className={`hw-s-reveal${visibleSections.has('stk') ? ' hw-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="hw-s-eyebrow">The WordPress Stack We Work With</span>
              <h2 id="hw-stack-heading" className="hw-s-title">WordPress Technology — Core to Cloud</h2>
              <p className="hw-s-desc" style={{ maxWidth: 680 }}>Our WordPress developers are proficient across the full platform stack — from PHP 8.x core and REST API to React-based Gutenberg blocks, headless Next.js frontends, and enterprise hosting infrastructure.</p>
            </div>
            <div className="hw-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`hw-stack-card${visibleStackCards.includes(i) ? ' hw-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="hw-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="hw-stack-pills">
                    {grp.items.map(item => (
                      <span key={item} className="hw-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section id="engagement" className="hw-eng-section" aria-labelledby="hw-eng-heading">
          <div className="hw-inner">
            <div className={`hw-s-reveal${visibleSections.has('eng') ? ' hw-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="hw-s-eyebrow">How to Hire Our WordPress Developers</span>
              <h2 id="hw-eng-heading" className="hw-s-title">Flexible Hiring Models for Every Project</h2>
              <p className="hw-s-desc" style={{ maxWidth: 680 }}>Whether you need a full-time dedicated WordPress developer, a fixed-price project delivery, or hourly support for bug fixes and audits — we have a hiring model that fits your budget and timeline.</p>
            </div>
            <div className="hw-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`hw-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' hw-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="hw-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="hw-eng-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg>
                  </div>
                  <div className="hw-eng-name">{m.name}</div>
                  <div className="hw-eng-headline">{m.headline}</div>
                  <div className="hw-eng-desc">{m.desc}</div>
                  <div className="hw-eng-list-label">Best for</div>
                  <ul className="hw-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="hw-eng-process">
                    <strong>Process:</strong> {m.process}<br />
                    <span className="hw-eng-timeline">{m.timeline}</span>
                  </div>
                  <Link href="#contact" className="hw-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="hw-process-section" aria-labelledby="hw-proc-heading">
          <div className="hw-inner" style={{ maxWidth: 760 }}>
            <div className={`hw-s-reveal${visibleSections.has('proc') ? ' hw-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="hw-s-eyebrow">How Hiring Works</span>
              <h2 id="hw-proc-heading" className="hw-s-title">Hire a WordPress Developer in 6 Simple Steps</h2>
              <p className="hw-s-desc">From sharing your requirements to your first sprint delivery — our hiring process is designed to get you working with the right WordPress developer as fast as possible, without compromise on quality.</p>
            </div>
            <div className="hw-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`hw-pstep${visibleSections.has('proc') ? ' hw-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="hw-pstep-l">
                    <div className="hw-pstep-circle">{step.num}</div>
                    <div className="hw-pstep-connector" />
                  </div>
                  <div className="hw-pstep-r">
                    <div className="hw-pstep-title">{step.title}</div>
                    <p className="hw-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="hw-testi" aria-labelledby="hw-ts-heading">
          <div className="hw-inner">
            <div className={`hw-center-head hw-s-reveal${visibleSections.has('ts') ? ' hw-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="hw-s-eyebrow">Client Results</span>
              <h2 id="hw-ts-heading" className="hw-s-title">What Our Clients Say</h2>
              <p className="hw-s-desc">Trusted by digital agencies, eCommerce brands, publishers, and enterprise teams across the US, UK, and Australia.</p>
            </div>
            <div className="hw-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`hw-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' hw-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}
                  itemScope itemType="https://schema.org/Review">
                  <div className="hw-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="hw-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="hw-tauthor">
                    <div className="hw-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div>
                      <div className="hw-tname" itemProp="author">{t.name}</div>
                      <div className="hw-trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="hw-why-section" aria-labelledby="hw-wy-heading">
          <div className="hw-inner">
            <div className={`hw-s-reveal${visibleSections.has('wy') ? ' hw-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="hw-s-eyebrow">Why 1Solutions</span>
              <h2 id="hw-wy-heading" className="hw-s-title">Why Hire WordPress Developers from 1Solutions</h2>
              <p className="hw-s-desc" style={{ maxWidth: 680 }}>Senior, vetted WordPress developers with 15+ years of platform experience — delivering clean, standards-compliant code, transparent communication, and full IP ownership on every engagement.</p>
            </div>
            <div className="hw-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`hw-wcard${visibleWhyCards.includes(i) ? ' hw-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="hw-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="hw-contact" aria-labelledby="hw-contact-heading">
          <div className="hw-contact-grid">
            <div>
              <h2 id="hw-contact-heading" className="hw-ctitle">Hire a WordPress Developer Today</h2>
              <p className="hw-cdesc">Share your requirements and we will match you with the right WordPress developer within 24 hours. A 30-minute skills alignment call follows — no commitment until you are satisfied with the fit.</p>
              <div className="hw-cbenefits">
                {[
                  ['✓', 'Developer matched and profiled within 24 hours of your enquiry'],
                  ['✓', '30-minute free technical skills alignment call — no commitment required'],
                  ['✓', 'Developer onboarded and writing code within 48 hours of approval'],
                  ['✓', 'NDA available on request — your codebase and requirements protected'],
                  ['✓', 'Month-to-month engagement — pause or stop without penalty'],
                ].map(([icon, text]) => (
                  <div className="hw-cbenefit" key={text}>
                    <span className="hw-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hw-form-box">
              <h3>Tell Us What You Need Built</h3>
              <form className="hw-form" onSubmit={e => e.preventDefault()}>
                <div className="hw-frow">
                  <div className="hw-fg">
                    <label htmlFor="hw-name">Full Name *</label>
                    <input id="hw-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="hw-fg">
                    <label htmlFor="hw-email">Work Email *</label>
                    <input id="hw-email" type="email" placeholder="you@company.com" required />
                  </div>
                </div>
                <div className="hw-frow">
                  <div className="hw-fg">
                    <label htmlFor="hw-company">Company / Agency</label>
                    <input id="hw-company" type="text" placeholder="Company name" />
                  </div>
                  <div className="hw-fg">
                    <label htmlFor="hw-phone">Phone / WhatsApp</label>
                    <input id="hw-phone" type="tel" placeholder="+1 555 000 0000" />
                  </div>
                </div>
                <div className="hw-fg full">
                  <label htmlFor="hw-type">WordPress Project Type *</label>
                  <select id="hw-type" required>
                    <option value="">Select project type...</option>
                    <option>Custom WordPress Theme (from Figma/XD/PSD)</option>
                    <option>Custom WordPress Plugin Development</option>
                    <option>WooCommerce Store Development</option>
                    <option>Headless WordPress with Next.js / React</option>
                    <option>Gutenberg Block Development</option>
                    <option>WordPress Multisite / Enterprise</option>
                    <option>CMS Migration to WordPress</option>
                    <option>WordPress Performance Optimisation</option>
                    <option>WordPress Security Audit & Hardening</option>
                    <option>Ongoing WordPress Maintenance & Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="hw-fg full">
                  <label htmlFor="hw-msg">Project Brief *</label>
                  <textarea id="hw-msg" rows={4} placeholder="Describe what you need built — existing site URL (if any), plugins or theme in use, integrations required, number of developers needed, and timeline..." required />
                </div>
                <div className="hw-consent">
                  <input id="hw-consent" type="checkbox" required />
                  <label htmlFor="hw-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. An NDA is available on request before we review your codebase or requirements.</label>
                </div>
                <button type="submit" className="hw-submit">Hire a WordPress Developer →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="hw-faq" aria-labelledby="hw-faq-heading">
          <div className="hw-inner" style={{ maxWidth: 860 }}>
            <span className="hw-s-eyebrow">FAQ</span>
            <h2 id="hw-faq-heading">Hiring WordPress Developers — Frequently Asked Questions</h2>
            <p className="hw-faq-sub">Everything you need to know about hiring expert WordPress developers from 1Solutions.</p>
            <div className="hw-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`hw-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="hw-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="hw-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="hw-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="hw-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="hw-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="hw-related">
          <div className="hw-related-inner">
            <span className="hw-s-eyebrow">Explore More</span>
            <h2>Related Hiring &amp; Development Services</h2>
            <p className="hw-related-sub">We also provide dedicated developers and full project teams for React, Laravel, Node.js, PHP, and more.</p>
            <hr />
            <div className="hw-rtags">
              {[
                ['/hire-php-developer/', 'Hire PHP Developer', 'hw-rtag-violet'],
                ['/hire-react-developer/', 'Hire React Developer', 'hw-rtag-blue'],
                ['/hire-laravel-developer/', 'Hire Laravel Developer', 'hw-rtag-amber'],
                ['/hire-node-js-developer/', 'Hire Node.js Developer', 'hw-rtag-green'],
                ['/woocommerce-development-company/', 'WooCommerce Development', 'hw-rtag-navy'],
                ['/wordpress-development-company/', 'WordPress Development Company', 'hw-rtag-navy'],
                ['/ecommerce-website-development/', 'eCommerce Development', 'hw-rtag-teal'],
                ['/custom-software-development/', 'Custom Software Development', 'hw-rtag-violet'],
                ['/react-js-development-company/', 'React.js Development', 'hw-rtag-blue'],
                ['/web-design-company/', 'Web Design Company', 'hw-rtag-amber'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`hw-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
