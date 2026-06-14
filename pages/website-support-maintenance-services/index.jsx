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
        { '@type': 'ListItem', position: 2, name: 'Website Support & Maintenance Services', item: 'https://www.1solutions.biz/website-support-maintenance-services/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Website Support & Maintenance Services',
      url: 'https://www.1solutions.biz/website-support-maintenance-services/',
      description: 'Professional website support and maintenance services — website health monitoring, security patching, performance optimisation, content updates, CMS core updates, bug fixing, broken link repair, backup management, and dedicated technical support for businesses worldwide.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '112', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is included in website maintenance?', acceptedAnswer: { '@type': 'Answer', text: 'Website maintenance typically covers: CMS and plugin/extension updates to keep your site on the latest stable versions; security monitoring and patching within 48 hours of critical vulnerability disclosures; daily automated backups with off-site storage and monthly restore testing; uptime monitoring with instant alerts; page speed and Core Web Vitals monitoring; broken link scanning and repair; SSL certificate renewal management; monthly performance and security reports; and a set number of development hours each month for content updates, design tweaks, and minor feature changes. The exact scope depends on your maintenance plan tier.' } },
        { '@type': 'Question', name: 'Why do I need ongoing website maintenance?', acceptedAnswer: { '@type': 'Answer', text: 'Websites are not static products — they require ongoing care to remain secure, fast, and functional. CMS platforms (WordPress, Joomla, Drupal) and their plugins/extensions release security patches regularly; running outdated versions is the most common cause of website hacks. Page speed and Core Web Vitals affect your Google search rankings. Hosting environments, SSL certificates, and third-party API integrations all require monitoring. Without maintenance, a website that worked perfectly on launch will gradually develop security vulnerabilities, slow down, accumulate broken links, and eventually need expensive emergency repairs rather than routine upkeep.' } },
        { '@type': 'Question', name: 'How quickly do you respond to website emergencies?', acceptedAnswer: { '@type': 'Answer', text: 'Emergency response times depend on your maintenance plan. Our highest-tier plans include a 2-hour emergency response SLA for critical incidents such as website down, security breach, or payment system failure. Mid-tier plans include a 4-hour SLA. Entry-level retainers include a next-business-day SLA for non-critical issues with 4-hour emergency escalation available as an add-on. All plans include 24/7 uptime monitoring so we are notified of outages before you or your customers notice them.' } },
        { '@type': 'Question', name: 'Can you maintain websites built by other developers?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We take over maintenance of websites built by any development agency or freelancer, on any CMS or stack we support (WordPress, Joomla, Drupal, Magento, Shopify, custom PHP, Next.js, and others). We start every new maintenance engagement with a website audit — reviewing CMS version, plugin versions, security configuration, backup setup, performance baseline, and codebase quality. The audit report gives you a clear picture of your site\'s current health and any immediate issues to address before beginning the ongoing retainer.' } },
        { '@type': 'Question', name: 'What happens if my website gets hacked?', acceptedAnswer: { '@type': 'Answer', text: 'If your website is compromised, we provide emergency incident response — diagnosing the attack vector, removing malware, restoring from a clean backup, patching the exploited vulnerability, and hardening the site against recurrence. For clients on our maintenance retainer, malware removal and hack recovery are covered as part of the plan. For non-retainer clients, we offer a paid emergency recovery service with a 4-hour response SLA. After recovery, we provide a written incident report detailing what happened, what was done, and what security improvements are recommended to prevent recurrence.' } },
        { '@type': 'Question', name: 'Do you provide monthly maintenance reports?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every maintenance retainer client receives a monthly report covering: CMS and plugin updates applied during the month; security scan results and any issues identified and resolved; uptime statistics for the month; page speed and Core Web Vitals performance; backup status and restore test results; SSL certificate status; broken links found and repaired; development hours used and remaining; and recommendations for upcoming improvements. Reports are emailed to your nominated contact by the 5th business day of the following month.' } },
        { '@type': 'Question', name: 'Can you add new features while maintaining my site?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All maintenance retainer plans include a set number of development hours per month that can be used for content updates, design changes, minor feature additions, form updates, SEO metadata changes, and other small development tasks. Larger development projects (new page templates, new integrations, significant functionality additions) are scoped and quoted separately as one-off fixed-price or time-and-materials projects that run alongside your maintenance retainer.' } },
        { '@type': 'Question', name: 'What CMS platforms do you support?', acceptedAnswer: { '@type': 'Answer', text: 'We provide maintenance services for WordPress, WooCommerce, Joomla, Drupal, Magento, OpenCart, PrestaShop, Shopify, and custom-built PHP, Laravel, Next.js, and React websites. For each platform we maintain up-to-date expertise in its update cycles, security advisories, and known vulnerabilities. If your website runs on a platform not listed here, contact us — we assess each situation individually and can take on maintenance for most web technologies given an initial audit period.' } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'CMS & Plugin/Extension Updates', desc: 'Timely updates of your CMS core (WordPress, Joomla, Drupal, Magento), all plugins, extensions, themes, and dependencies to their latest stable versions — tested on a staging clone before applying to production to prevent update-related breakages.' },
  { n: '02', title: 'Security Monitoring & Patching', desc: 'Continuous malware scanning, vulnerability monitoring tied to your exact plugin/extension versions, and priority security patch application within 48 hours of critical CVE disclosures. Web Application Firewall (WAF), brute-force protection, and login hardening included.', feat: true },
  { n: '03', title: 'Daily Backups & Disaster Recovery', desc: 'Automated daily full-site backups (files + database) with off-site storage in geographically separate cloud storage. Monthly restore testing to verify backup integrity. Rapid restore in the event of data loss, hosting failure, or post-hack recovery.' },
  { n: '04', title: 'Uptime & Performance Monitoring', desc: 'Round-the-clock uptime monitoring with instant alerts and escalation to our team. Core Web Vitals (LCP, FID/INP, CLS) and PageSpeed tracking with monthly benchmarked reports. CDN and caching configuration to maintain optimal loading times as your site grows.' },
  { n: '05', title: 'Bug Fixes & Technical Issue Resolution', desc: 'Diagnosis and resolution of website bugs, broken functionality, layout issues, form failures, and plugin conflicts — including issues introduced by CMS or plugin updates, hosting environment changes, or third-party API breaking changes.' },
  { n: '06', title: 'Content & Design Updates', desc: 'Monthly development hours for content updates, copy changes, image swaps, new page additions, blog publishing, landing page tweaks, navigation changes, and minor design modifications — handled via ticket system with agreed turnaround times.' },
  { n: '07', title: 'Broken Link & SEO Health Monitoring', desc: 'Monthly automated crawls to identify 404 broken links, redirect chains, missing meta descriptions, duplicate title tags, missing alt text, and other on-page SEO hygiene issues — with fixes applied within your maintenance hours allocation.' },
  { n: '08', title: 'SSL Certificate & Domain Management', desc: 'SSL certificate monitoring and renewal management to prevent lapses that trigger browser security warnings. Domain expiry monitoring and renewal reminders. HTTPS redirect configuration and HSTS implementation for security compliance.' },
  { n: '09', title: 'Emergency Support & Hack Recovery', desc: 'Priority emergency response for website outages, security breaches, payment system failures, and critical errors. Malware removal, clean restore from backup, vulnerability patching, and post-incident hardening with a written incident report.' },
  { n: '10', title: 'Third-Party Integration Maintenance', desc: 'Monitoring and maintenance of third-party integrations — payment gateways, CRM connectors, email service providers, analytics, social feeds, APIs, and booking systems — ensuring they continue to function as upstream services change and APIs are updated.' },
];

const TECH_STACK = [
  { group: 'CMS Platforms', color: '#0f766e', items: ['WordPress / WooCommerce', 'Joomla 4.x / 5.x', 'Drupal 10 / 11', 'Magento 2.x', 'OpenCart', 'Custom PHP / Laravel'] },
  { group: 'Security Tools', color: '#0891b2', items: ['Wordfence / Sucuri', 'Akeeba Admin Tools', 'OWASP / ZAP Scanning', 'Cloudflare WAF', 'Fail2Ban / ModSecurity', 'CVE Monitoring (NVD)'] },
  { group: 'Backup & Recovery', color: '#D97706', items: ['UpdraftPlus', 'Akeeba Backup', 'ManageWP', 'AWS S3 / Backblaze B2', 'Daily Automated Snapshots', 'Monthly Restore Testing'] },
  { group: 'Monitoring & Alerts', color: '#f97316', items: ['UptimeRobot / Better Uptime', 'GTmetrix / PageSpeed', 'Google Search Console', 'Core Web Vitals Tracking', 'SSL Expiry Monitoring', 'Ping / Heartbeat Checks'] },
  { group: 'Performance & CDN', color: '#6366f1', items: ['Cloudflare CDN', 'WP Rocket / LiteSpeed Cache', 'Redis / Memcached', 'Image Compression (WebP)', 'GZIP / Brotli Compression', 'Critical CSS / Lazy Load'] },
  { group: 'Dev & Staging', color: '#e11d48', items: ['Git Version Control', 'Staging Environments', 'WP Pusher / MainWP', 'ManageWP Bulk Updates', 'Bitbucket / GitHub', 'Automated Regression Tests'] },
  { group: 'Hosting & Server', color: '#16a34a', items: ['cPanel / Plesk', 'LAMP / LEMP Stack', 'PHP 8.x / MySQL', 'Apache / Nginx', 'SiteGround / Kinsta / WPE', 'Server Log Monitoring'] },
  { group: 'SEO & Analytics', color: '#a855f7', items: ['Screaming Frog / Ahrefs', 'Broken Link Crawling', 'Google Analytics 4', 'Google Tag Manager', 'Core Web Vitals Audit', 'Search Console Integration'] },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'essential',
    name: 'Essential Care Plan',
    badge: 'Best Value',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
    headline: 'Core maintenance for businesses that need their site kept secure and running.',
    desc: 'Monthly security and plugin updates applied to a tested staging clone, daily backups with off-site storage, uptime monitoring, SSL management, broken link scanning, a monthly health report, and up to 4 hours of development time for content or minor changes.',
    bestFor: ['Small business websites and blogs', 'Brochure sites needing security and updates', 'Sites with infrequent content changes', 'Startups wanting peace of mind at low cost'],
    process: 'Onboarding audit → Monthly updates → Monthly report → Support tickets',
    timeline: 'Active within 3 business days of onboarding',
  },
  {
    id: 'professional',
    name: 'Professional Care Plan',
    badge: 'Most Popular',
    badgeColor: '#0f766e',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Comprehensive maintenance with priority support and more dev hours.',
    desc: 'Everything in Essential plus: priority 4-hour emergency response, weekly security scans, performance optimisation (CDN/caching), Google Search Console integration, up to 8 hours of monthly development time, and a dedicated account manager for your maintenance needs.',
    bestFor: ['Growing eCommerce stores', 'Lead-generation websites with high traffic', 'Sites that change content frequently', 'Marketing-driven sites needing SEO health monitoring'],
    process: 'Audit → Priority updates → Weekly scans → 8h dev bank → Monthly review call',
    timeline: 'Active within 2 business days',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Care Plan',
    badge: 'High-Volume Sites',
    badgeColor: '#a855f7',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: '2-hour emergency SLA, dedicated engineer, and full-stack maintenance.',
    desc: 'Dedicated maintenance engineer, 2-hour emergency SLA, staging environment management, advanced WAF configuration, penetration testing (annual), multi-server monitoring, up to 20 hours of monthly development, quarterly strategy calls, and a custom SLA agreement.',
    bestFor: ['High-traffic eCommerce websites', 'Enterprise portals and membership sites', 'Sites with compliance requirements (PCI-DSS, GDPR)', 'Organisations needing a dedicated maintenance engineer'],
    process: 'Custom SLA → Dedicated engineer assignment → Continuous monitoring → Quarterly review',
    timeline: 'Custom onboarding timeline — typically 5–7 business days',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Website Health Audit', desc: 'We start every engagement with a comprehensive audit of your website — CMS version and update status, plugin/extension inventory and vulnerability check, backup configuration assessment, security scan, page speed and Core Web Vitals baseline, broken link count, SSL status, and hosting environment review. You receive a written audit report with findings and priority actions before the retainer begins.' },
  { num: '02', title: 'Onboarding & Access Setup', desc: 'Secure handover of CMS admin, hosting panel, FTP/SSH, domain registrar, Google Search Console, and Google Analytics access. We configure our monitoring tools (uptime, security scanner, backup agent) without disrupting your live website. Staging environment created as an isolated clone of your production site for safe update testing.' },
  { num: '03', title: 'Immediate Priority Fixes', desc: 'Any critical issues identified in the audit — outdated CMS versions, unpatched known vulnerabilities, missing SSL, absent backups, misconfigured security settings — are resolved in the first week of the retainer as priority work before the regular maintenance cycle begins.' },
  { num: '04', title: 'Monthly Maintenance Cycle', desc: 'Each month: all available CMS and plugin updates are applied to the staging clone, tested for compatibility, then deployed to production during a low-traffic window. Security scans run weekly, uptime is monitored 24/7, backups are verified, broken links are found and repaired, and your monthly development hours are available for content and minor change requests via ticket.' },
  { num: '05', title: 'Incident Response', desc: 'Any detected incidents — security alerts, uptime events, performance degradation, broken functionality after a third-party API change — are escalated immediately to our on-call team. Response within the SLA of your plan. Post-incident, you receive a written summary of what happened and what was done to resolve and prevent recurrence.' },
  { num: '06', title: 'Monthly Report & Review', desc: 'A detailed monthly maintenance report is delivered by the 5th business day of the following month: updates applied, security status, uptime statistics, Core Web Vitals trend, backup status, broken links repaired, development hours used, and recommendations for the coming month. Professional and Enterprise plans include a monthly video review call with your account manager.' },
];

const TESTIMONIALS = [
  {
    text: "Our WordPress site was hacked twice in one year before we engaged 1Solutions for maintenance. That was three years ago. We have not had a single security incident since. The monthly reports are clear and our team never has to think about updates or backups anymore. It is the best investment we made after building the site.",
    name: 'Sarah T.', role: 'Marketing Manager, Professional Services Firm (UK)', init: 'ST', bg: '#0F3460',
  },
  {
    text: "We have eight websites across different CMSs — WordPress, Joomla, and a custom Laravel portal — and 1Solutions maintains all of them under a single retainer. One report, one point of contact, one invoice. The quality and consistency across all eight sites has been outstanding for two years. It freed up our internal dev team to focus on product rather than maintenance.",
    name: 'David K.', role: 'Head of Digital, Retail Group (AU)', init: 'DK', bg: '#134e4a', feat: true,
  },
  {
    text: "When our eCommerce site went down on a Saturday morning — peak trading day — 1Solutions had it back online in under 90 minutes. The post-incident report explained exactly what had caused the outage and what they had done to prevent it happening again. That level of transparency and responsiveness is why we have stayed with them for four years.",
    name: 'Mark R.', role: 'Director, eCommerce Business (US)', init: 'MR', bg: '#1e3a5f',
  },
];

const WHY_CARDS = [
  { title: '15+ Years of Website Maintenance Experience', desc: 'We have been maintaining websites across WordPress, Joomla, Drupal, Magento, and custom platforms for over 15 years. We understand the failure modes, security patterns, and update quirks of each CMS — and our maintenance processes are built around preventing the most common issues before they affect your site.' },
  { title: 'CMS-Specific Expertise — Not Generic Hosting Support', desc: 'Generic hosting support teams reset your password and restart PHP-FPM. Our maintenance team understands WordPress plugin conflicts, Joomla extension API changes, Drupal module compatibility, and Magento patch dependencies. We fix root causes, not symptoms.' },
  { title: 'Updates Applied to Staging First — Never Direct to Production', desc: 'Every CMS core update, plugin update, or theme update is applied to an isolated staging clone of your site, tested for visual regressions and functional breakages, then deployed to production during a low-traffic window. We have never broken a client site with an update.' },
  { title: 'Security-First Mindset on Every Retainer', desc: 'Security is not an add-on — it is the foundation of every maintenance plan. Our team monitors CVE databases, vendor security advisories, and OWASP disclosures daily. Critical patches are applied within 48 hours of disclosure. WAF rules are updated continuously for all retainer clients.' },
  { title: 'Transparent Monthly Reporting — No Black Box', desc: 'You receive a detailed report every month showing exactly what was done, what was found, uptime statistics, backup status, and Core Web Vitals trends. We tell you when something needs attention and we recommend proactive improvements — you are never left wondering what we have been doing.' },
  { title: 'Single Retainer for Multiple Websites', desc: 'We maintain multi-site portfolios under a single retainer with consolidated reporting. Whether you have three WordPress sites or eight sites across different CMSs, you get one account manager, one monthly invoice, one point of contact, and consistent maintenance quality across all properties.' },
  { title: 'Emergency Response Covered — Not an Upsell', desc: 'Emergency response for hacks, outages, and critical bugs is included in your maintenance plan — not billed as an expensive emergency call-out on top of your retainer. You pay a predictable monthly fee and we handle incidents as they arise within your plan SLA.' },
  { title: 'Proactive, Not Reactive', desc: 'We monitor your site before problems become visible to your visitors. Uptime monitoring catches outages in minutes. Security scans catch infections before they spread. Performance monitoring identifies slowdowns before they hurt conversions. Our goal is for you to never need to call us about a crisis.' },
];

const FAQS = [
  { q: 'What is included in website maintenance?', a: 'Website maintenance typically covers: CMS and plugin/extension updates tested on staging before production deployment; security monitoring and patching within 48 hours of critical CVE disclosures; daily automated backups with off-site storage and monthly restore testing; 24/7 uptime monitoring; Core Web Vitals and page speed tracking; broken link scanning and repair; SSL certificate renewal management; monthly performance and security reports; and a monthly allocation of development hours for content updates and minor changes. Exact scope depends on your plan tier.' },
  { q: 'Why do I need ongoing website maintenance?', a: 'Websites are not static — CMS platforms and plugins release security patches regularly, and running outdated versions is the most common cause of website hacks. Page speed and Core Web Vitals affect Google search rankings. SSL certificates expire. APIs change. Without maintenance, a site that worked perfectly at launch will gradually develop security vulnerabilities, slow down, accumulate broken links, and eventually require expensive emergency repairs rather than routine upkeep costing a fraction of that amount per month.' },
  { q: 'How quickly do you respond to website emergencies?', a: 'Emergency response times depend on your plan. Essential plans include next-business-day SLA with 4-hour emergency escalation available. Professional plans include a 4-hour emergency SLA. Enterprise plans include a 2-hour emergency SLA for critical incidents such as website down, security breach, or payment system failure. All plans include 24/7 uptime monitoring so we are alerted to outages before you or your customers notice them.' },
  { q: 'Can you maintain a website built by another developer or agency?', a: "Yes. We take over maintenance of websites built by any development team, on any CMS or stack we support. We start with a website audit — reviewing CMS version, plugin versions, security configuration, backup setup, and performance baseline. The audit report gives you a clear picture of your site's current health and any immediate issues before the ongoing retainer begins. There is no lock-in to the original agency." },
  { q: 'What happens if my website gets hacked?', a: 'We provide emergency incident response — diagnosing the attack vector, removing malware, restoring from a clean backup, patching the exploited vulnerability, and hardening the site against recurrence. For clients on a maintenance retainer, malware removal and hack recovery are covered within the plan. After recovery, you receive a written incident report detailing what happened, what was done, and what security improvements are recommended.' },
  { q: 'Do you provide monthly maintenance reports?', a: 'Yes. Every maintenance retainer client receives a monthly report covering: CMS and plugin updates applied; security scan results; uptime statistics; Core Web Vitals performance; backup status and restore test results; SSL certificate status; broken links found and repaired; development hours used and remaining; and recommendations for the coming month. Reports are delivered by the 5th business day of the following month.' },
  { q: 'Can I use my maintenance hours for new features?', a: 'Yes. Your monthly development hours can be used for content updates, copy changes, image swaps, new page additions, form updates, SEO metadata changes, navigation changes, and minor design modifications. Larger projects — new page templates, new integrations, significant new functionality — are scoped and quoted separately as one-off projects running alongside your retainer.' },
  { q: 'What CMS platforms do you support?', a: 'We maintain WordPress, WooCommerce, Joomla, Drupal, Magento, OpenCart, PrestaShop, and custom-built PHP, Laravel, Next.js, and React websites. For each platform we maintain current expertise in its update cycles, security advisories, and known vulnerability patterns. If your website runs on a platform not listed here, contact us — we assess each situation individually.' },
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
    <div className="sm-stat-col">
      <div className="sm-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="sm-stat-label">{label}</div>
    </div>
  );
}

export default function WebsiteMaintenanceServices() {
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
        <title>Website Support & Maintenance Services | Security, Updates & Performance | 1Solutions</title>
        <meta name="description" content="Professional website maintenance services — CMS updates, security patching, daily backups, uptime monitoring, bug fixes, performance optimisation, and content updates. 15+ years. All CMS platforms supported." />
        <link rel="canonical" href="https://www.1solutions.biz/website-support-maintenance-services/" />
        <meta property="og:title" content="Website Support & Maintenance Services | 1Solutions" />
        <meta property="og:description" content="Monthly website maintenance retainers — security patching, CMS updates, daily backups, uptime monitoring, Core Web Vitals, bug fixes, and content updates. All CMS platforms." />
        <meta property="og:url" content="https://www.1solutions.biz/website-support-maintenance-services/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .sm-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#f0fdfa 0%,#ccfbf1 20%,#f0f9ff 50%,#fef3c7 75%,#f0fdf4 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .sm-page *,.sm-page *::before,.sm-page *::after{box-sizing:border-box}
          .sm-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .sm-orb-1{width:880px;height:880px;background:radial-gradient(circle,rgba(15,118,110,.20) 0%,rgba(20,184,166,.08) 40%,transparent 70%);top:-280px;right:-260px}
          .sm-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px}
          .sm-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(8,145,178,.14) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .sm-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .sm-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .sm-breadcrumb li{display:flex;align-items:center;gap:6px}
          .sm-breadcrumb li::after{content:'/';opacity:.45}
          .sm-breadcrumb li:last-child::after{display:none}
          .sm-breadcrumb a{color:#0F3460;text-decoration:none}
          .sm-breadcrumb a:hover{text-decoration:underline}
          .sm-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .sm-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .sm-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#0f766e 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .sm-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .sm-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .sm-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .sm-badge-dot{width:7px;height:7px;border-radius:50%;background:#0f766e;flex-shrink:0}
          .sm-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .sm-btn-primary{display:inline-block;padding:14px 36px;background:#0f766e;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(15,118,110,.28)}
          .sm-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .sm-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .sm-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(15,118,110,.5);transform:translateY(-2px)}
          .sm-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .sm-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .sm-stat-col:last-child{border-right:none}
          .sm-stat-val{font-size:28px;font-weight:900;color:#0f766e;letter-spacing:-.5px;line-height:1}
          .sm-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .sm-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .sm-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .sm-logos-wrap{width:100%;overflow:hidden}
          .sm-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:sm-marquee 28s linear infinite}
          .sm-logos-track:hover{animation-play-state:paused}
          @keyframes sm-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .sm-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .sm-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .sm-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .sm-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .sm-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .sm-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .sm-s-reveal.sm-revealed{opacity:1;transform:translateY(0)}
          .sm-inner{max-width:1300px;margin:0 auto}
          .sm-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .sm-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .sm-svc-card{background:linear-gradient(135deg,rgba(240,253,250,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .sm-svc-card.sm-cv{opacity:1;transform:translateY(0)}
          .sm-svc-card.sm-cv:hover{transform:translateY(-6px);border-color:rgba(15,118,110,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .sm-svc-card.feat{border-color:rgba(15,118,110,.20)}
          .sm-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .sm-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .sm-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .sm-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#0f766e,#14b8a6);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .sm-svc-card.sm-cv:hover::before{transform:scaleY(1)}
          .sm-svc-more{text-align:center;margin-top:22px}
          .sm-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .sm-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .sm-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .sm-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .sm-stack-card{background:linear-gradient(135deg,rgba(240,253,250,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .sm-stack-card.sm-sv{opacity:1;transform:translateY(0)}
          .sm-stack-card.sm-sv:hover{border-color:rgba(15,118,110,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .sm-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .sm-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .sm-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .sm-eng-section{padding:80px 40px;position:relative;z-index:1}
          .sm-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .sm-eng-card{background:linear-gradient(135deg,rgba(240,253,250,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .sm-eng-card.sm-ev{opacity:1;transform:translateY(0)}
          .sm-eng-card.sm-ev:hover{border-color:rgba(15,118,110,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .sm-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(240,253,250,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .sm-eng-card.feat.sm-ev{transform:translateY(-8px)}
          .sm-eng-card.feat.sm-ev:hover{transform:translateY(-12px)}
          .sm-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .sm-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .sm-eng-card.sm-ev:hover .sm-eng-icon{background:rgba(15,118,110,.10)}
          .sm-eng-card.feat .sm-eng-icon{background:rgba(217,119,6,.10)}
          .sm-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .sm-eng-card.sm-ev:hover .sm-eng-icon svg{fill:#0f766e}
          .sm-eng-card.feat .sm-eng-icon svg{fill:#D97706}
          .sm-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .sm-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .sm-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .sm-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .sm-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .sm-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .sm-eng-list li::before{content:'✓';font-weight:800;color:#0f766e;flex-shrink:0;margin-top:1px}
          .sm-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .sm-eng-process strong{color:#0F3460}
          .sm-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .sm-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .sm-eng-cta:hover{background:#0F3460;color:#fff}
          .sm-eng-card.feat .sm-eng-cta{background:#0f766e;color:#fff;border-color:#0f766e}
          .sm-eng-card.feat .sm-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .sm-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .sm-psteps{display:flex;flex-direction:column;margin-top:52px}
          .sm-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .sm-pstep.sm-pv{opacity:1;transform:translateY(0)}
          .sm-pstep-l{display:flex;flex-direction:column;align-items:center}
          .sm-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .sm-pstep.sm-pv:hover .sm-pstep-circle{background:rgba(15,118,110,.10);border-color:#0f766e;color:#0f766e}
          .sm-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .sm-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .sm-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .sm-pstep:last-child .sm-pstep-connector{display:none}
          .sm-pstep-r{padding:4px 0 38px}
          .sm-pstep:last-child .sm-pstep-r{padding-bottom:0}
          .sm-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .sm-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .sm-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .sm-center-head{text-align:center;margin-bottom:48px}
          .sm-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .sm-tcard{background:linear-gradient(135deg,rgba(240,253,250,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .sm-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(240,253,250,.42) 100%);border-color:rgba(217,119,6,.22)}
          .sm-tcard.sm-tv{opacity:1;transform:translateY(0)}
          .sm-tcard.sm-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .sm-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .sm-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .sm-tauthor{display:flex;align-items:center;gap:12px}
          .sm-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .sm-tname{font-size:14px;font-weight:700;color:#0F3460}
          .sm-trole{font-size:12px;color:#6b7280}
          .sm-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .sm-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .sm-wcard{background:linear-gradient(135deg,rgba(240,253,250,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .sm-wcard.sm-wv{opacity:1;transform:translateY(0) scale(1)}
          .sm-wcard.sm-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(15,118,110,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .sm-wcard-dot{width:10px;height:10px;border-radius:50%;background:#0f766e;margin-bottom:12px}
          .sm-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .sm-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .sm-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(240,253,250,.55) 0%,rgba(255,255,255,.60) 40%,rgba(240,249,255,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .sm-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .sm-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#0f766e 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .sm-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .sm-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .sm-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .sm-cbenefit-icon{flex-shrink:0;color:#0f766e;font-weight:800;font-size:16px;margin-top:1px}
          .sm-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .sm-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(240,253,250,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .sm-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .sm-form{display:flex;flex-direction:column;gap:13px}
          .sm-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .sm-fg{display:flex;flex-direction:column;gap:5px}
          .sm-fg.full{grid-column:1/-1}
          .sm-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .sm-fg input,.sm-fg textarea,.sm-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .sm-fg input:focus,.sm-fg textarea:focus,.sm-fg select:focus{outline:none;border-color:#0f766e;box-shadow:0 0 0 3px rgba(15,118,110,.10)}
          .sm-consent{display:flex;gap:8px;align-items:flex-start}
          .sm-consent input{margin-top:3px;width:15px;height:15px}
          .sm-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .sm-consent a{color:#0F3460}
          .sm-submit{width:100%;padding:14px;background:#0f766e;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(15,118,110,.26)}
          .sm-submit:hover{background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28)}
          .sm-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .sm-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .sm-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .sm-faq-list{display:flex;flex-direction:column;gap:10px}
          .sm-fitem{background:linear-gradient(135deg,rgba(240,253,250,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .sm-fitem.open{border-color:rgba(15,118,110,.30)}
          .sm-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#0f766e,#14b8a6);border-radius:3px 3px 0 0}
          .sm-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .sm-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .sm-fitem.open .sm-fq-badge{background:#0f766e;color:#fff}
          .sm-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .sm-fitem.open .sm-fq span{color:#134e4a}
          .sm-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .sm-fitem.open .sm-fchev{transform:rotate(180deg);color:#0f766e}
          .sm-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .sm-fitem.open .sm-fanswer-wrap{max-height:500px}
          .sm-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .sm-related{padding:80px 40px;background:rgba(240,253,250,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .sm-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .sm-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .sm-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .sm-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .sm-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .sm-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .sm-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .sm-rtag-blue{background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8}
          .sm-rtag-violet{background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9}
          .sm-rtag-amber{background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309}
          .sm-rtag-teal{background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E}
          .sm-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .sm-rtag-rose{background:rgba(225,29,72,.09);border-color:rgba(225,29,72,.28);color:#9f1239}
          @media(max-width:1024px){.sm-hero h1,.sm-s-title,.sm-faq h2{font-size:36px}.sm-svc-grid{grid-template-columns:repeat(2,1fr)}.sm-stack-grid{grid-template-columns:repeat(2,1fr)}.sm-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.sm-eng-card.feat{transform:none}.sm-eng-card.feat.sm-ev{transform:none}.sm-eng-card.feat.sm-ev:hover{transform:translateY(-4px)}.sm-why-grid{grid-template-columns:repeat(2,1fr)}.sm-tgrid{grid-template-columns:1fr}.sm-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.sm-breadcrumb{padding:12px 20px 0}.sm-hero{padding:28px 20px 20px}.sm-hero h1{font-size:26px;letter-spacing:-.3px}.sm-stats{grid-template-columns:1fr 1fr}.sm-stat-col:nth-child(2){border-right:none}.sm-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.sm-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.sm-logos{padding:16px 20px 28px}.sm-svc-section,.sm-stack-section,.sm-eng-section,.sm-process-section,.sm-testi,.sm-why-section,.sm-faq,.sm-related{padding:52px 20px}.sm-contact{padding:48px 20px}.sm-svc-grid,.sm-stack-grid,.sm-why-grid{grid-template-columns:1fr}.sm-frow{grid-template-columns:1fr}.sm-ctitle{font-size:28px}.sm-s-title{font-size:28px}}
        `}</style>
      </Head>

      <div className="sm-page">
        <div className="sm-orb sm-orb-1" /><div className="sm-orb sm-orb-2" /><div className="sm-orb sm-orb-3" />

        <nav className="sm-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Website Support & Maintenance Services</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <section className="sm-hero">
          <span className="sm-eyebrow">Website Support & Maintenance Services</span>
          <h1>Website Maintenance Services — Security, Updates, Uptime & Performance</h1>
          <p className="sm-hero-desc">Monthly website maintenance retainers for businesses that need their website kept secure, fast, and running. CMS updates, security patching, daily backups, uptime monitoring, Core Web Vitals, bug fixes, and monthly development hours — all CMS platforms supported.</p>
          <div className="sm-trust-row">
            {['200+ Websites Maintained','All CMS Platforms','Security-First Approach','24/7 Uptime Monitoring','15+ Years Experience'].map(b => (
              <div className="sm-badge" key={b}><span className="sm-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="sm-ctas">
            <Link href="#contact" className="sm-btn-primary">Get a Maintenance Quote</Link>
            <Link href="#plans" className="sm-btn-ghost">View Care Plans →</Link>
          </div>
        </section>

        <div className="sm-stats" ref={statsRef}>
          {[['200+','Websites Maintained'],['15+','Years Experience'],['99.9%','Avg Uptime Achieved'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        <div className="sm-logos">
          <span className="sm-logos-label">Trusted by Leading Businesses</span>
          <div className="sm-logos-wrap">
            <div className="sm-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="sm-clogo" />
              ))}
            </div>
          </div>
        </div>

        <section className="sm-svc-section" aria-labelledby="sm-svc-heading">
          <div className="sm-inner">
            <div className={`sm-s-reveal${visibleSections.has('svc') ? ' sm-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="sm-s-eyebrow">What We Do</span>
              <h2 id="sm-svc-heading" className="sm-s-title">Website Maintenance Services We Provide</h2>
              <p className="sm-s-desc" style={{ maxWidth: 720 }}>From CMS and plugin updates applied to staging first through daily backups, 24/7 uptime monitoring, security patching, broken link repair, Core Web Vitals tracking, emergency support, and monthly development hours for content changes.</p>
            </div>
            <div className="sm-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`sm-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' sm-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="sm-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="sm-svc-more">
                <button className="sm-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="sm-stack-section" aria-labelledby="sm-stack-heading">
          <div className="sm-inner">
            <div className={`sm-s-reveal${visibleSections.has('stk') ? ' sm-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="sm-s-eyebrow">Platforms & Tools</span>
              <h2 id="sm-stack-heading" className="sm-s-title">CMS Platforms & Maintenance Toolset</h2>
              <p className="sm-s-desc" style={{ maxWidth: 680 }}>WordPress, Joomla, Drupal, Magento, and custom PHP — maintained with enterprise-grade security tools, backup agents, uptime monitors, CDN performance stacks, and automated regression testing before every production deployment.</p>
            </div>
            <div className="sm-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`sm-stack-card${visibleStackCards.includes(i) ? ' sm-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="sm-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="sm-stack-pills">
                    {grp.items.map(item => <span key={item} className="sm-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="plans" className="sm-eng-section" aria-labelledby="sm-eng-heading">
          <div className="sm-inner">
            <div className={`sm-s-reveal${visibleSections.has('eng') ? ' sm-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="sm-s-eyebrow">Maintenance Plans</span>
              <h2 id="sm-eng-heading" className="sm-s-title">Website Care Plans — Choose Your Level</h2>
              <p className="sm-s-desc" style={{ maxWidth: 680 }}>From an entry-level Essential plan covering security updates and backups, to a Professional plan with priority support and Core Web Vitals monitoring, to an Enterprise plan with a dedicated engineer and 2-hour emergency SLA.</p>
            </div>
            <div className="sm-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`sm-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' sm-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="sm-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="sm-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="sm-eng-name">{m.name}</div>
                  <div className="sm-eng-headline">{m.headline}</div>
                  <div className="sm-eng-desc">{m.desc}</div>
                  <div className="sm-eng-list-label">Best for</div>
                  <ul className="sm-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="sm-eng-process"><strong>Process:</strong> {m.process}<br /><span className="sm-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="sm-eng-cta">Get a maintenance quote →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sm-process-section" aria-labelledby="sm-proc-heading">
          <div className="sm-inner" style={{ maxWidth: 760 }}>
            <div className={`sm-s-reveal${visibleSections.has('proc') ? ' sm-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="sm-s-eyebrow">How We Maintain Your Site</span>
              <h2 id="sm-proc-heading" className="sm-s-title">Our Website Maintenance Process</h2>
              <p className="sm-s-desc">Starting with a health audit and immediate priority fixes, through a structured monthly maintenance cycle, 24/7 monitoring, incident response, and a monthly report — your website is always current, secure, and performing.</p>
            </div>
            <div className="sm-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`sm-pstep${visibleSections.has('proc') ? ' sm-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="sm-pstep-l">
                    <div className="sm-pstep-circle">{step.num}</div>
                    <div className="sm-pstep-connector" />
                  </div>
                  <div className="sm-pstep-r">
                    <div className="sm-pstep-title">{step.title}</div>
                    <p className="sm-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sm-testi" aria-labelledby="sm-ts-heading">
          <div className="sm-inner">
            <div className={`sm-center-head sm-s-reveal${visibleSections.has('ts') ? ' sm-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="sm-s-eyebrow">Client Results</span>
              <h2 id="sm-ts-heading" className="sm-s-title">What Our Maintenance Clients Say</h2>
              <p className="sm-s-desc">Trusted by professional services firms, retail groups, eCommerce businesses, and agencies across the US, UK, and Australia who rely on us to keep their websites secure and running.</p>
            </div>
            <div className="sm-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`sm-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' sm-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review">
                  <div className="sm-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="sm-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="sm-tauthor">
                    <div className="sm-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div><div className="sm-tname" itemProp="author">{t.name}</div><div className="sm-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sm-why-section" aria-labelledby="sm-wy-heading">
          <div className="sm-inner">
            <div className={`sm-s-reveal${visibleSections.has('wy') ? ' sm-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="sm-s-eyebrow">Why 1Solutions</span>
              <h2 id="sm-wy-heading" className="sm-s-title">Why Choose Us for Website Maintenance</h2>
              <p className="sm-s-desc" style={{ maxWidth: 680 }}>15+ years of website maintenance across all major CMS platforms — with a security-first mindset, staging-before-production update workflow, transparent monthly reporting, and emergency response included in every plan.</p>
            </div>
            <div className="sm-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`sm-wcard${visibleWhyCards.includes(i) ? ' sm-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="sm-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="sm-contact" aria-labelledby="sm-contact-heading">
          <div className="sm-contact-grid">
            <div>
              <h2 id="sm-contact-heading" className="sm-ctitle">Get a Website Maintenance Quote</h2>
              <p className="sm-cdesc">Tell us about your website and we will recommend the right maintenance plan. We start with a free health audit covering your CMS version, plugin update status, security configuration, backup setup, and performance baseline — then propose a maintenance retainer matched to your site and budget.</p>
              <div className="sm-cbenefits">
                {[['✓','Free website health audit — CMS, security, backups, and performance assessment'],['✓','Maintenance plan recommendation tailored to your site and update frequency'],['✓','All CMS platforms supported: WordPress, Joomla, Drupal, Magento, custom PHP'],['✓','Emergency response included in all plans — not an expensive add-on'],['✓','Response within 24 business hours from our maintenance team']].map(([icon, text]) => (
                  <div className="sm-cbenefit" key={text}><span className="sm-cbenefit-icon">{icon}</span><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="sm-form-box">
              <h3>Tell Us About Your Website</h3>
              <form className="sm-form" onSubmit={e => e.preventDefault()}>
                <div className="sm-frow">
                  <div className="sm-fg"><label htmlFor="sm-name">Full Name *</label><input id="sm-name" type="text" placeholder="Your name" required /></div>
                  <div className="sm-fg"><label htmlFor="sm-email">Work Email *</label><input id="sm-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="sm-frow">
                  <div className="sm-fg"><label htmlFor="sm-url">Website URL *</label><input id="sm-url" type="url" placeholder="https://yourwebsite.com" required /></div>
                  <div className="sm-fg"><label htmlFor="sm-phone">Phone / WhatsApp</label><input id="sm-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="sm-fg full">
                  <label htmlFor="sm-cms">CMS / Platform *</label>
                  <select id="sm-cms" required>
                    <option value="">Select your CMS...</option>
                    <option>WordPress</option>
                    <option>WooCommerce</option>
                    <option>Joomla</option>
                    <option>Drupal</option>
                    <option>Magento</option>
                    <option>OpenCart</option>
                    <option>Shopify</option>
                    <option>Custom PHP / Laravel</option>
                    <option>Next.js / React</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm-fg full">
                  <label htmlFor="sm-plan">Support Plan Interest</label>
                  <select id="sm-plan">
                    <option value="">Not sure — recommend one for me</option>
                    <option>Essential Care Plan</option>
                    <option>Professional Care Plan</option>
                    <option>Enterprise Care Plan</option>
                    <option>Emergency / one-off incident response</option>
                  </select>
                </div>
                <div className="sm-fg full">
                  <label htmlFor="sm-msg">Tell Us About Your Site</label>
                  <textarea id="sm-msg" rows={3} placeholder="Describe your website — what it does, any current issues, how often you update content, and any specific concerns about security, speed, or uptime..." />
                </div>
                <div className="sm-consent">
                  <input id="sm-consent" type="checkbox" required />
                  <label htmlFor="sm-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. We treat all details confidentially.</label>
                </div>
                <button type="submit" className="sm-submit">Get Free Website Audit & Quote →</button>
              </form>
            </div>
          </div>
        </section>

        <section className="sm-faq" aria-labelledby="sm-faq-heading">
          <div className="sm-inner" style={{ maxWidth: 860 }}>
            <span className="sm-s-eyebrow">FAQ</span>
            <h2 id="sm-faq-heading">Website Maintenance — Frequently Asked Questions</h2>
            <p className="sm-faq-sub">Everything you need to know about our website maintenance retainers — what is included, how quickly we respond, which platforms we support, and what happens when something goes wrong.</p>
            <div className="sm-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`sm-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="sm-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="sm-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="sm-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="sm-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="sm-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sm-related">
          <div className="sm-related-inner">
            <span className="sm-s-eyebrow">Explore More</span>
            <h2>Related Web Services</h2>
            <p className="sm-related-sub">We also build and maintain websites across all major CMS platforms for businesses worldwide.</p>
            <hr />
            <div className="sm-rtags">
              {[['/wordpress-support-and-maintenance-services/','WordPress Maintenance','sm-rtag-blue'],['/wordpress-development-company/','WordPress Development','sm-rtag-blue'],['/joomla-development-company/','Joomla Development','sm-rtag-rose'],['/drupal-development-company/','Drupal Development','sm-rtag-violet'],['/magento-development-company/','Magento Development','sm-rtag-amber'],['/woocommerce-development-company/','WooCommerce Development','sm-rtag-violet'],['/website-design-and-development/','Website Design','sm-rtag-teal'],['/seo-services/','SEO Services','sm-rtag-green'],['/php-development-company/','PHP Development','sm-rtag-rose'],['/hire-wordpress-developer/','Hire WordPress Developer','sm-rtag-blue']].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`sm-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
