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
        { '@type': 'ListItem', position: 2, name: 'WordPress Support & Maintenance Services', item: 'https://www.1solutions.biz/wordpress-support-and-maintenance-services/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'WordPress Support & Maintenance Services',
      url: 'https://www.1solutions.biz/wordpress-support-and-maintenance-services/',
      description: 'Expert WordPress support and maintenance services - WordPress core and plugin updates, malware removal and security hardening, WooCommerce maintenance, daily backups, uptime monitoring, performance optimisation, bug fixes, content updates, and emergency WordPress support.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '138', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is WordPress website maintenance?', acceptedAnswer: { '@type': 'Answer', text: 'WordPress website maintenance is the ongoing process of keeping your WordPress site secure, updated, backed up, and performing well. It includes applying WordPress core and plugin security patches promptly; testing all updates on a staging site before deploying to production; running daily automated backups stored off-site; monitoring uptime 24/7; scanning for malware and security vulnerabilities; managing SSL certificates; monitoring Core Web Vitals; repairing broken links; and providing developer hours for minor content and design changes each month.' } },
        { '@type': 'Question', name: 'What is included in WordPress maintenance?', acceptedAnswer: { '@type': 'Answer', text: 'WordPress maintenance covers: WordPress core and plugin/theme updates tested on staging before production; daily automated backups with off-site storage (AWS S3 or Backblaze B2); 24/7 uptime monitoring; weekly malware scanning and WAF rule updates; SSL certificate management; broken link scanning and repair; Core Web Vitals monitoring; monthly maintenance reports; and monthly developer hours for content updates and minor fixes. WooCommerce maintenance plans also include payment gateway testing and checkout regression testing after every update.' } },
        { '@type': 'Question', name: 'What happens if I don\'t maintain my WordPress website?', acceptedAnswer: { '@type': 'Answer', text: 'An unmaintained WordPress website accumulates serious risks: outdated plugins and themes are the most common attack vector for WordPress hacks; unpatched vulnerabilities can be exploited within hours of public disclosure; plugin conflicts cause PHP fatal errors and white screen of death events; performance degrades over time; backups may not be running; and SEO rankings decline as page speed drops and broken links accumulate. The cost of emergency hack recovery and data restoration far exceeds the cost of a monthly maintenance retainer.' } },
        { '@type': 'Question', name: 'How much does WordPress maintenance cost?', acceptedAnswer: { '@type': 'Answer', text: 'WordPress maintenance costs vary by scope. Basic plans covering core and plugin updates, backups, uptime monitoring, and security scanning start from around $99-$149/month for small brochure sites. Mid-tier plans with WooCommerce support, priority emergency SLA, Core Web Vitals monitoring, and 8 developer hours per month range from $249-$499/month. Enterprise plans with a dedicated engineer, 2-hour SLA, and 20+ developer hours are custom-priced. Contact us for a free WordPress health audit and tailored quote.' } },
        { '@type': 'Question', name: 'How often should WordPress be updated?', acceptedAnswer: { '@type': 'Answer', text: 'WordPress minor security patches should be applied within 48 hours of release. Plugin updates should be assessed and applied monthly (or sooner for security patches). Major WordPress version updates should be assessed on a staging clone over 2-4 weeks before production. A typical WordPress installation has 15-30 active plugins, each with its own update cadence. Our maintenance service manages all these update streams on your behalf.' } },
        { '@type': 'Question', name: 'Can you fix a hacked WordPress website?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We provide WordPress malware removal and hack recovery - scanning files and database for injected code, backdoors, phishing pages and SEO spam, removing all malware, restoring from clean backup where needed, patching the exploited vulnerability, hardening against recurrence, and providing a written incident report. For clients on our maintenance retainer, malware removal is covered within the plan at no additional cost.' } },
        { '@type': 'Question', name: 'Do you support WooCommerce websites?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. WooCommerce maintenance is a speciality. WooCommerce core and extension updates can break checkout flows and payment gateways. Our WooCommerce maintenance includes: payment gateway testing after every update; checkout flow regression testing; order notification email verification; and priority emergency response for checkout and payment failures on Professional and Enterprise plans.' } },
        { '@type': 'Question', name: 'Do you update plugins even if they might break the site?', acceptedAnswer: { '@type': 'Answer', text: 'We never apply updates directly to the production site. Every update goes to a staging clone first where we check for visual regressions and test critical functionality. If an update causes a conflict on staging, we investigate the root cause, resolve it or defer the update, and communicate this in your monthly report. Your live site only receives tested, verified updates.' } },
        { '@type': 'Question', name: 'What WordPress security hardening do you apply?', acceptedAnswer: { '@type': 'Answer', text: 'Our WordPress security hardening covers: Wordfence or Sucuri WAF installation; brute-force login protection and login URL change; 2FA for admin accounts; file permission hardening (600 for wp-config.php); disabling XML-RPC; removing WordPress version disclosure; DISALLOW_FILE_EDIT; security response headers (CSP, X-Frame-Options, HSTS); regular user role audits; and hosting-level security configuration for managed WordPress hosts.' } },
        { '@type': 'Question', name: 'How do you handle WordPress emergencies?', acceptedAnswer: { '@type': 'Answer', text: 'All retainer clients have a dedicated emergency contact. We respond within the SLA of your plan: 2-hour for Enterprise, 4-hour for Professional, next-business-day for Essential. Common emergencies: white screen of death, fatal PHP errors from plugin conflicts, hacked sites, WooCommerce payment failures, site outages, and SSL lapses. We investigate, resolve, and follow up with a written incident report.' } },
        { '@type': 'Question', name: 'Can you take over WordPress maintenance from another agency?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We take over from any previous developer or agency. We begin with a comprehensive WordPress audit covering core version, plugin and theme inventory with vulnerability check, security configuration, backup setup, and performance baseline. You receive a written audit report before the retainer begins. We operate on monthly rolling contracts with no lock-in and provide a clean handover document if you ever transition away.' } },
        { '@type': 'Question', name: 'What is a WordPress care plan?', acceptedAnswer: { '@type': 'Answer', text: 'A WordPress care plan is a monthly subscription service that handles all ongoing maintenance tasks your WordPress site requires - updates, backups, security, monitoring, and developer support. Instead of managing these tasks yourself or hiring a developer ad hoc when problems occur, a care plan provides proactive, structured maintenance on a predictable monthly cost, with an included pool of developer hours for minor changes each month.' } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'WordPress Core & Plugin Updates', desc: 'All WordPress core updates (minor security patches within 48 hours, major versions after staging compatibility assessment) and all plugin and theme updates - applied to a staging clone, visually and functionally tested, then deployed to production during a low-traffic window. Never direct-to-production.' },
  { n: '02', title: 'WordPress Security Hardening & WAF', desc: 'Wordfence or equivalent WAF installation, brute-force protection, login URL change, 2FA for admin accounts, file permission hardening, disabling XML-RPC, security response headers, DISALLOW_FILE_EDIT, removal of WordPress version disclosure, and monthly security audit of user roles.', feat: true },
  { n: '03', title: 'WordPress Malware Removal & Hack Recovery', desc: 'Emergency malware removal - file-system and database scanning, removal of injected code, backdoors, phishing pages, and SEO spam, clean restore from backup where required, vulnerability patching, hardening against recurrence, and a written post-incident report. Covered in all maintenance plans.' },
  { n: '04', title: 'Daily Backups & Disaster Recovery', desc: 'Automated daily full WordPress backups (files + database) via UpdraftPlus or equivalent, stored off-site on AWS S3 or Backblaze B2. Monthly restore testing to verify backup integrity. Rapid point-in-time restore in the event of data loss, host failure, or post-hack recovery.' },
  { n: '05', title: 'WooCommerce Maintenance', desc: 'WooCommerce-specific maintenance including WooCommerce core and premium extension updates, payment gateway functionality testing after every update, checkout flow regression testing, order notification email testing, product catalogue integrity checks, and priority emergency response for payment failures.' },
  { n: '06', title: 'Uptime & Performance Monitoring', desc: '24/7 uptime monitoring with instant team alerts and escalation. Core Web Vitals (LCP, INP, CLS) and PageSpeed score tracking with monthly benchmarked reports. CDN and caching configuration (WP Rocket, LiteSpeed Cache, Cloudflare) to maintain loading performance as content grows.' },
  { n: '07', title: 'Bug Fixes & Plugin Conflict Resolution', desc: 'Diagnosis and resolution of WordPress bugs, plugin conflicts, theme incompatibilities, PHP errors, broken forms, display issues, and breakages introduced by CMS or plugin updates, PHP version upgrades, or hosting environment changes. Root-cause fixes, not workarounds.' },
  { n: '08', title: 'Content & Design Updates', desc: 'Monthly developer hours for content updates, copy changes, image replacements, new page additions (using your existing theme/builder), blog publishing, navigation changes, landing page tweaks, Elementor/Divi/Gutenberg block updates, and minor design modifications via ticket system.' },
  { n: '09', title: 'Broken Link & SEO Health Monitoring', desc: 'Monthly crawls to identify 404 broken links, redirect chains, missing or duplicate meta descriptions, missing alt text, and other on-page SEO hygiene issues - repaired within your monthly developer hours. Google Search Console integration for crawl error monitoring.' },
  { n: '10', title: 'SSL, Domain & Hosting Management', desc: 'SSL certificate expiry monitoring and renewal management. Domain expiry monitoring and renewal reminders. Hosting environment monitoring (PHP version compatibility, disk space, error log review). Managed WordPress hosting configuration (WPEngine, Kinsta, SiteGround, Flywheel).' },
];

const TECH_STACK = [
  { group: 'WordPress Core', color: '#114171', items: ['WordPress 6.x (latest)', 'PHP 8.x', 'MySQL / MariaDB', 'WooCommerce 9.x', 'Gutenberg / Block Editor', 'WordPress REST API'] },
  { group: 'Security', color: '#114171', items: ['Wordfence Security', 'Sucuri WAF', 'iThemes Security', 'Malware Removal', '2FA (WP 2FA)', 'CVE Monitoring'] },
  { group: 'Backup & Recovery', color: '#D97706', items: ['UpdraftPlus', 'BackupBuddy', 'ManageWP Backups', 'AWS S3 / Backblaze B2', 'Daily Automated Backups', 'Restore Testing'] },
  { group: 'Performance', color: '#f97316', items: ['WP Rocket', 'LiteSpeed Cache', 'Cloudflare CDN', 'Redis Object Cache', 'WebP Image Optimisation', 'GZIP / Brotli'] },
  { group: 'Page Builders', color: '#6366f1', items: ['Elementor', 'Divi / Extra', 'Gutenberg / FSE', 'WPBakery', 'Beaver Builder', 'Bricks Builder'] },
  { group: 'WooCommerce Extensions', color: '#7c3aed', items: ['WC Subscriptions', 'WC Memberships', 'Stripe / PayPal', 'WC Bookings', 'YITH Plugins', 'WC Order Management'] },
  { group: 'Monitoring & Reporting', color: '#0891b2', items: ['UptimeRobot / Better Uptime', 'GTmetrix / PageSpeed', 'Google Search Console', 'Screaming Frog', 'Core Web Vitals', 'ManageWP Reports'] },
  { group: 'Managed Hosting', color: '#a855f7', items: ['WPEngine', 'Kinsta', 'SiteGround', 'Flywheel', 'Cloudways', 'cPanel / Plesk Hosting'] },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'essential',
    name: 'WordPress Essential',
    badge: 'Start Here',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
    headline: 'Core WordPress maintenance - secure, updated, backed up.',
    desc: 'Monthly WordPress core and plugin updates applied to staging and tested before production. Daily backups with off-site storage. Uptime monitoring. SSL management. Monthly security scan. Broken link report. Up to 4 hours of developer time for minor content and design changes.',
    bestFor: ['Small business WordPress websites', 'Brochure and lead-generation sites', 'WordPress blogs and content sites', 'Sites needing security and updates without full retainer'],
    process: 'Audit → Monthly updates → Monthly report → Support tickets',
    timeline: 'Active within 3 business days of onboarding',
  },
  {
    id: 'professional',
    name: 'WordPress Professional',
    badge: 'Most Popular',
    badgeColor: '#114171',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Priority support, WooCommerce coverage, and more dev hours.',
    desc: 'Everything in Essential plus: 4-hour emergency SLA, WooCommerce update and checkout testing, weekly malware scans, Cloudflare CDN and caching configuration, Core Web Vitals monitoring, Google Search Console integration, up to 8 developer hours per month, and a dedicated account manager.',
    bestFor: ['WooCommerce and eCommerce stores', 'High-traffic WordPress websites', 'Lead-generation sites with marketing activity', 'Agencies needing white-label WordPress support'],
    process: 'Audit → WooCommerce update cycle → 4h emergency SLA → 8h dev bank → Monthly call',
    timeline: 'Active within 2 business days',
  },
  {
    id: 'enterprise',
    name: 'WordPress Enterprise',
    badge: 'High-Volume',
    badgeColor: '#a855f7',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Dedicated WordPress engineer, 2-hour SLA, multi-site management.',
    desc: 'Dedicated WordPress engineer, 2-hour emergency SLA, multi-site maintenance under one retainer, staging environment management, annual penetration testing, custom plugin maintenance, advanced WooCommerce support, up to 20 developer hours per month, quarterly strategy calls, and custom SLA.',
    bestFor: ['Enterprise WordPress / WooCommerce platforms', 'Multi-site WordPress networks', 'High-volume eCommerce (1000+ orders/day)', 'Agencies with multiple client WordPress sites'],
    process: 'Custom SLA → Dedicated engineer → Multi-site management → Quarterly strategy review',
    timeline: 'Custom onboarding - typically 5–7 business days',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'WordPress Site Audit', desc: 'We begin with a comprehensive WordPress audit: WordPress core version and update history, full plugin inventory with version and vulnerability check against the WPScan database, theme compatibility assessment, security configuration review, backup status check, PageSpeed and Core Web Vitals baseline, broken link count, and hosting environment review (PHP version, server errors). You receive a written audit report before the retainer begins.' },
  { num: '02', title: 'Onboarding & Staging Setup', desc: 'Secure access handover: WordPress admin, hosting panel (cPanel / Plesk / managed hosting dashboard), FTP/SSH, domain registrar, Google Search Console, and Analytics. We create a staging clone of your WordPress site, configure our monitoring tools (uptime, Wordfence, backup agent, performance tracking), and establish the update workflow - all without touching your live site.' },
  { num: '03', title: 'Immediate Priority Fixes', desc: 'Critical issues identified in the audit are resolved in week one: outdated WordPress core and plugins, unpatched security vulnerabilities, missing or broken backup configuration, absent SSL or expiring certificate, misconfigured user permissions, and any active malware detected during the initial security scan. These are resolved as priority work before the regular monthly maintenance cycle begins.' },
  { num: '04', title: 'Monthly WordPress Update Cycle', desc: 'Each month: all plugin and theme updates are applied to the staging clone, tested for compatibility (visual regression + functional tests on key pages and WooCommerce checkout if applicable), then deployed to production in a low-traffic window. WordPress minor version security patches applied within 48 hours of release. Major WordPress version updates assessed on staging over 2–4 weeks before production deployment.' },
  { num: '05', title: 'Incident Response & Emergency Support', desc: 'Continuous uptime monitoring means we are alerted to outages immediately. Security scans catch malware before it spreads. Plugin conflicts from auto-updates (if any) are detected on staging before reaching production. When incidents do occur - hacks, white screens, fatal errors, payment failures - we respond within your plan SLA, resolve, and follow up with a written incident report.' },
  { num: '06', title: 'Monthly Report & Dev Hour Usage', desc: 'A detailed monthly WordPress maintenance report by the 5th business day of the following month: all updates applied (with changelog notes), security scan results, uptime stats, Core Web Vitals trend, backup status, broken links repaired, developer hours used and remaining, and recommendations for the coming month. Professional and Enterprise plans include a monthly call with your account manager to review the report and plan upcoming work.' },
];

const TESTIMONIALS = [
  {
    text: "Our WordPress site had not been updated in over two years when we came to 1Solutions. They performed an audit, removed three malware infections we did not even know about, updated everything safely, and got us onto a maintenance retainer. Since then the site has been faster, more secure, and our team never has to think about updates. The monthly reports are exactly the right level of detail.",
    name: 'Lisa H.', role: 'Operations Director, Professional Services (UK)', init: 'LH', bg: '#0F3460',
  },
  {
    text: "We have a high-volume WooCommerce store and had a critical payment failure after a plugin update that cost us several hours of sales. After engaging 1Solutions for WooCommerce maintenance, every update goes through staging with checkout testing first. We have had zero update-related payment failures in 18 months. Their 4-hour emergency SLA also gives us genuine confidence during peak trading.",
    name: 'Jason W.', role: 'eCommerce Director, Retail Brand (AU)', init: 'JW', bg: '#0F3460', feat: true,
  },
  {
    text: "We have six WordPress sites across three brands and 1Solutions maintains all of them under one retainer. One account manager, one monthly invoice, one report covering all sites. The consistency and attention to detail across all six has been excellent for two years. The quarterly strategy calls help us plan what to build next on each site.",
    name: 'Rachel P.', role: 'Head of Marketing, Media Group (US)', init: 'RP', bg: '#1e3a5f',
  },
];

const WHY_CARDS = [
  { title: '15+ Years WordPress Expertise', desc: 'We have been maintaining WordPress websites since version 2.x - through every major release, block editor transition, and PHP version migration. We understand WordPress internals, the plugin ecosystem quality spectrum, and the security patterns that cause most hacks. Our maintenance processes are built around the actual failure modes we have seen.' },
  { title: 'Staging-First - Never Direct to Production', desc: 'Every WordPress and plugin update goes to a staging clone first. We test for visual regressions, form functionality, WooCommerce checkout flow, and any custom feature interactions before deploying to production. Our guarantee: if an update causes issues, you never see it on your live site.' },
  { title: 'WooCommerce Specialists - Not Just WordPress', desc: 'WooCommerce updates require payment gateway testing, checkout regression testing, and order flow validation after every update - not just a visual check. Our WooCommerce maintenance includes all of this. We understand the WooCommerce extension ecosystem, known plugin conflicts, and the consequences of skipping checkout testing.' },
  { title: 'Security Patches Within 48 Hours', desc: 'When WordPress, WooCommerce, or a high-severity plugin vulnerability is disclosed, the window between disclosure and mass exploitation can be hours. We monitor CVE feeds and the WPScan database and apply critical security patches within 48 hours of disclosure for all retainer clients - even outside the regular monthly update cycle.' },
  { title: 'Emergency Response in Every Plan', desc: 'WordPress emergencies - hacked sites, white screens, payment failures, site outages - are covered in every maintenance plan, not billed as emergency call-out fees on top of your retainer. You pay a predictable monthly fee. We handle incidents within your plan SLA with a written follow-up report.' },
  { title: 'Multi-Site Management Under One Retainer', desc: 'We maintain multi-site portfolios of WordPress websites - 3, 6, 10, or more - under a single retainer with consolidated reporting. One account manager, one invoice, one point of contact, and consistent maintenance quality across every site. Particularly suited to agencies, franchise groups, and media companies.' },
  { title: 'Transparent Reporting - No Black Box', desc: 'Your monthly WordPress maintenance report names every plugin updated (with version before and after), every security issue detected and resolved, uptime statistics, Core Web Vitals trends, developer hours used, and recommendations. We do not hide behind vague "maintenance performed" summaries.' },
  { title: 'No Lock-In - Monthly Rolling', desc: 'Our WordPress maintenance retainers run month-to-month. No 12-month contracts, no early termination fees. If you want to pause or leave, you give us 30 days notice and we provide a clean handover document covering all access credentials, the current backup state, and any outstanding work.' },
];

const FAQS = [
  { q: 'What is WordPress website maintenance?', a: 'WordPress website maintenance is the ongoing process of keeping your WordPress site secure, updated, backed up, and performing well. It includes: applying WordPress core and plugin security patches promptly; testing all updates on a staging site before deploying to production; running daily automated backups stored off-site; monitoring uptime 24/7; scanning for malware and security vulnerabilities; managing SSL certificates and domain renewals; monitoring Core Web Vitals; repairing broken links; and providing developer hours for minor content and design changes. Without regular WordPress maintenance, sites accumulate unpatched vulnerabilities, outdated plugins, and degraded performance - the root cause of most WordPress hacks and outages.' },
  { q: 'What is included in WordPress maintenance?', a: 'WordPress maintenance covers: WordPress core and plugin/theme updates tested on staging before production; daily automated backups with off-site storage (AWS S3 or Backblaze B2); 24/7 uptime monitoring; weekly malware scanning and WAF rule updates; SSL certificate management; broken link scanning and repair; Core Web Vitals monitoring; monthly maintenance reports; and monthly developer hours for content updates and minor fixes. WooCommerce maintenance plans also include payment gateway testing and checkout regression testing after every update.' },
  { q: 'How often should WordPress be updated?', a: 'WordPress minor security patches should be applied within 48 hours of release - the window between a vulnerability disclosure and mass exploitation can be measured in hours. Plugin updates should be assessed and applied monthly, or sooner for security patches. Major WordPress version updates (released 2–3 times per year) should be assessed on a staging clone over 2–4 weeks before production. A typical WordPress installation has 15–30 active plugins, each with its own update cadence. Our WordPress maintenance service monitors all these update streams on your behalf so you never have to think about it.' },
  { q: 'What happens if I don\'t maintain my WordPress website?', a: 'An unmaintained WordPress website accumulates serious risks over time. Outdated plugins and themes are the most common attack vector - responsible for the majority of WordPress hacks. An unpatched critical vulnerability can be exploited within hours of public disclosure. Beyond security, outdated plugins cause plugin conflicts, PHP fatal errors, and white screen of death events as your hosting provider upgrades PHP versions. Performance degrades as caches become stale, images unoptimised, and database tables bloated. Backups may not be running, meaning a hack or server failure could result in permanent data loss. SEO rankings also suffer as page speed declines and broken links accumulate.' },
  { q: 'How much does WordPress maintenance cost?', a: 'WordPress maintenance costs vary by plan scope. Basic WordPress maintenance covering core and plugin updates, backups, uptime monitoring, and security scanning typically starts from $99–$149/month for smaller brochure sites. Mid-tier plans covering WooCommerce maintenance, priority emergency SLA, Core Web Vitals monitoring, and 8 developer hours per month range from $249–$499/month. Enterprise plans with a dedicated WordPress engineer, 2-hour emergency SLA, multi-site management, and 20+ developer hours per month are custom-priced. Contact us for a quote tailored to your site - every engagement starts with a free WordPress health audit.' },
  { q: 'What is a WordPress care plan?', a: 'A WordPress care plan (also called a WordPress maintenance retainer or WordPress support plan) is a monthly subscription service that handles all the ongoing maintenance tasks your WordPress site requires - updates, backups, security, monitoring, and developer support. Instead of managing these tasks yourself or hiring a developer ad hoc when problems occur, a care plan provides proactive, structured maintenance on a predictable monthly cost. A good WordPress care plan includes staging-first updates, daily backups, malware monitoring, uptime alerts, and a pool of developer hours for minor changes each month.' },
  { q: 'Do I need WordPress maintenance if my site is small?', a: 'Yes - all WordPress sites need maintenance regardless of size. A small brochure site has the same exposure to WordPress core vulnerabilities, plugin security flaws, and hosting environment changes as a large eCommerce site. In fact, smaller sites are often more vulnerable because they are less monitored. The essential maintenance tasks - security patches applied within 48 hours, daily backups, uptime monitoring, and malware scanning - apply equally to a 5-page business site and a 500-page WooCommerce store. Our WordPress Essential plan is designed exactly for smaller sites that need security and updates without a full-scale retainer.' },
  { q: 'Can you fix a hacked WordPress website?', a: 'Yes. We provide WordPress malware removal and hack recovery - scanning files and database for injected code, backdoors, phishing pages and SEO spam, removing all malware, restoring from clean backup where needed, patching the exploited vulnerability (most commonly an outdated plugin), hardening against recurrence, and providing a written incident report detailing the attack vector and remediation steps. For clients on our maintenance retainer, malware removal is covered within the plan at no additional cost.' },
  { q: 'How long does it take to clean a hacked WordPress site?', a: 'Most WordPress malware removal engagements are completed within 4–12 hours of our receiving access. The timeline depends on the type of infection: file-level malware injections and database injections typically resolve in under 4 hours. More complex compromises involving backdoors hidden across multiple plugin files, or SEO spam poisoning thousands of database entries, may require 8–24 hours. We provide a written incident report after every malware removal engagement covering the infection type, affected files, remediation steps, and hardening measures applied.' },
  { q: 'Do you support WooCommerce websites?', a: 'Yes. WooCommerce maintenance is a speciality. WooCommerce core and extension updates can break checkout flows, payment gateways, and product display in ways that standard visual checks miss. Our WooCommerce maintenance includes: WooCommerce core and premium extension updates; payment gateway functionality testing (Stripe, PayPal, etc.) after every update; checkout flow regression testing; order notification email verification; product catalogue integrity checks; and priority emergency response for checkout and payment failures on Professional and Enterprise plans.' },
  { q: 'Do you support WooCommerce Subscriptions and Memberships?', a: 'Yes. WooCommerce Subscriptions and WooCommerce Memberships add complexity to the update cycle - their renewal billing, member content access, and subscription management features must be tested after every WooCommerce core and extension update. Our WooCommerce maintenance process includes specific test cases for subscription renewal flows, membership access checks, and payment gateway token retention after updates. These are covered in our Professional and Enterprise maintenance plans.' },
  { q: 'Do you update plugins even if they might break the site?', a: 'We never apply updates directly to the production site. Every plugin, theme, or WordPress core update is applied to a staging clone first where we check for visual regressions and test critical functionality (forms, checkout, login, custom features). If an update causes a conflict on staging, we investigate the root cause, resolve it or defer the update, and communicate this in your monthly report. Your live site only receives tested, verified updates.' },
  { q: 'What is a WordPress staging site?', a: 'A WordPress staging site is a private, password-protected clone of your live WordPress site - identical in content, theme, and plugins - used to test updates, new plugins, design changes, and code changes before deploying them to the production site your visitors see. All our maintenance clients have a staging environment configured as part of onboarding. Every update we apply goes to staging first. If an update causes any issue on staging, it never reaches your live site.' },
  { q: 'What WordPress security hardening do you apply?', a: 'Our WordPress security hardening covers: Wordfence or Sucuri WAF installation and configuration; brute-force login protection and login URL change; two-factor authentication (2FA) for all administrator accounts; file permission hardening (755 directories, 644 files, 600 for wp-config.php); disabling XML-RPC where not required; removing WordPress version disclosure from source; DISALLOW_FILE_EDIT in wp-config; security response headers (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, HSTS); regular user role and inactive admin account audits; and hosting-level security configuration for managed WordPress hosts (WPEngine, Kinsta, Flywheel).' },
  { q: 'How do you monitor WordPress uptime?', a: 'We use UptimeRobot, Better Uptime, or equivalent monitoring services configured with 1–5 minute check intervals. When your site returns a non-200 status code or exceeds a response time threshold, our team receives immediate alerts via email, Slack, and SMS. For Enterprise plans, we also monitor from multiple geographic locations to detect regional CDN or DNS issues. Monthly maintenance reports include uptime statistics, average response time, and any downtime incidents with root cause analysis.' },
  { q: 'What is Core Web Vitals monitoring?', a: 'Core Web Vitals are Google\'s three page experience metrics: Largest Contentful Paint (LCP - loading performance), Interaction to Next Paint (INP - interactivity), and Cumulative Layout Shift (CLS - visual stability). Google uses Core Web Vitals as a ranking signal. Our WordPress maintenance plans include monthly Core Web Vitals tracking via Google Search Console and PageSpeed Insights, with trend reporting and recommendations. If a plugin update or new content causes a Core Web Vitals regression, we identify and resolve it within your monthly developer hours.' },
  { q: 'Can you help with WordPress performance optimization?', a: 'Yes. WordPress performance optimisation is included in our maintenance plans at varying levels. All plans include caching configuration (WP Rocket, LiteSpeed Cache, or W3 Total Cache) and CDN setup via Cloudflare. Professional and Enterprise plans include Redis object caching, image optimisation with WebP conversion, GZIP/Brotli compression, database cleanup and optimisation, and Core Web Vitals-focused performance work within your monthly developer hours. We track PageSpeed scores monthly and flag regressions.' },
  { q: 'How do you handle WordPress emergencies?', a: 'All maintenance retainer clients have a dedicated emergency contact. We respond within the SLA of your plan: 2-hour for Enterprise, 4-hour for Professional, next-business-day for Essential (with priority escalation available for urgent issues). Common WordPress emergencies we handle: white screen of death, fatal PHP errors from plugin conflicts, hacked sites, WooCommerce payment gateway failures, site outages from hosting issues, SSL certificate lapses, and post-migration breakages. We investigate, resolve, and follow up with a written incident report.' },
  { q: 'Can you maintain WordPress on any hosting?', a: 'Yes. We maintain WordPress on all major hosting platforms - cPanel and Plesk shared hosting (SiteGround, Bluehost, HostGator, Hostinger), managed WordPress hosting (WPEngine, Kinsta, Flywheel, Pressable), cloud-based hosting (Cloudways, AWS, DigitalOcean, Google Cloud), and dedicated servers. Each hosting environment has different access patterns (cPanel, SFTP, SSH, hosting dashboard APIs) and different caching and security tools available. Our onboarding process captures your hosting environment details and configures our maintenance workflow accordingly.' },
  { q: 'What page builders do you support?', a: 'We maintain WordPress sites built with all major page builders: Elementor, Divi, WPBakery Page Builder, Beaver Builder, Bricks Builder, Oxygen, and Gutenberg (WordPress Block Editor / Full Site Editing). Page builder plugin updates are treated with particular care in our maintenance workflow - they touch every page on your site and must be tested thoroughly on staging before production deployment. We also support sites built with custom themes and custom Gutenberg blocks.' },
  { q: 'Do you maintain WordPress multisite networks?', a: 'Yes. WordPress Multisite maintenance is available on our Enterprise plan. Multisite networks require coordinated update management - WordPress core and network-activated plugins must be updated network-wide and tested across representative sub-sites, not just the main site. We maintain multisite networks for media groups, franchise organisations, agencies, and education institutions managing multiple brand sites under a single WordPress installation.' },
  { q: 'Do you provide a monthly WordPress maintenance report?', a: 'Yes. Every maintenance client receives a monthly report by the 5th business day of the following month. The report covers: all WordPress core, plugin, and theme updates applied (with version before and after and changelog notes); security scan results; uptime statistics; Core Web Vitals trends (LCP, INP, CLS); backup status and last restore test date; broken links found and repaired; developer hours used and remaining; any incidents during the month with root cause and resolution; and recommendations for the coming month. Professional and Enterprise clients also receive a monthly call with their account manager.' },
  { q: 'What is the SLA for emergency WordPress support?', a: 'Emergency response SLAs by plan: Enterprise - 2-hour initial response, 24/7 coverage including weekends; Professional - 4-hour initial response during business hours (Monday–Friday), with same-day escalation available for checkout or payment emergencies on WooCommerce sites; Essential - next-business-day response with a 4-hour priority escalation option available as a one-off add-on. All SLAs refer to initial contact and triage, not full resolution - resolution time depends on the nature of the emergency. We follow up every incident with a written report.' },
  { q: 'Can you take over WordPress maintenance from another agency?', a: 'Yes. We take over from any previous developer, agency, or in-house team. We begin with a comprehensive WordPress audit: core version and update history, full plugin and theme inventory with WPScan vulnerability check, security configuration review, backup setup assessment, hosting environment review, codebase quality review for custom code, and PageSpeed/Core Web Vitals baseline. You receive a written audit report before the retainer begins. We operate on monthly rolling contracts with no lock-in, and provide a clean handover document if you ever transition away.' },
  { q: 'What is the difference between WordPress support and WordPress maintenance?', a: 'WordPress maintenance is proactive - regular, scheduled tasks (updates, backups, security scanning, monitoring) performed to prevent problems before they occur. WordPress support is reactive - help when something goes wrong (a plugin breaks, the site goes down, it gets hacked). Our plans combine both: structured monthly maintenance that reduces the frequency of support events, plus included emergency support when incidents do occur. Most WordPress problems are preventable with proper maintenance.' },
  { q: 'Do you manage WordPress hosting?', a: 'We do not sell or resell hosting, but we fully manage your WordPress hosting configuration as part of our maintenance service. This includes: PHP version compatibility management; disk space and error log monitoring; server-level caching configuration for managed hosts (WPEngine, Kinsta); Cloudflare configuration; SSL certificate management; cron job monitoring; and database optimisation. For clients who want us to recommend a hosting provider, we typically suggest WPEngine or Kinsta for business sites and high-traffic WooCommerce stores.' },
  { q: 'What if a plugin update breaks my site?', a: 'Because all our updates go to staging first, a plugin update that would break your site is caught before it ever reaches production. If a conflict or visual regression appears on staging, we investigate the root cause - typically a theme/plugin conflict, PHP compatibility issue, or a breaking change in the plugin\'s new version - and either resolve it, roll back the update pending a compatible version, or contact the plugin developer if required. We communicate this in your monthly report. Your live site always remains stable.' },
  { q: 'How do I get started with a WordPress maintenance plan?', a: 'Getting started takes three steps. First, fill in our contact form with your WordPress site URL and a brief description of what you need - we respond within one business day. Second, we carry out a free WordPress health audit (core version, plugin vulnerability check, security configuration, backup status, PageSpeed baseline) and send you a written report with our recommended plan. Third, you approve the plan, we complete secure access onboarding, set up staging and monitoring tools, and your maintenance retainer begins - typically within 2–3 business days of sign-off.' },
  { q: 'What makes 1Solutions different from other WordPress maintenance services?', a: 'Several things distinguish our WordPress maintenance: 15+ years of WordPress experience across 150+ maintained sites; a genuine staging-first workflow (not just claimed - we will show you the staging environment during onboarding); WooCommerce checkout testing on every update, not just visual checks; security patches applied within 48 hours of CVE disclosure; transparent monthly reports that name every plugin updated, not vague "maintenance performed" summaries; emergency response covered in every plan (not billed as separate call-out fees); and month-to-month rolling contracts with no lock-in. We also maintain multi-site portfolios under a single retainer - useful for agencies, franchise groups, and media companies.' },
  { q: 'Do you offer white-label WordPress maintenance for agencies?', a: 'Yes. We provide white-label WordPress maintenance for digital agencies - maintaining your clients\' WordPress and WooCommerce sites under your agency brand, with reports using your logo, communication via your branded portal or email, and all client-facing documentation white-labelled. Agencies consolidate multiple client sites under a single retainer with a custom per-site rate. Our Professional plan is popular with agencies who want a 4-hour emergency SLA and 8 developer hours per client site per month.' },
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
    <div className="wm-stat-col">
      <div className="wm-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="wm-stat-label">{label}</div>
    </div>
  );
}

export default function WordPressMaintenance() {
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
        <title>WordPress Maintenance Services | Support, Security & WooCommerce | 1Solutions</title>
        <meta name="description" content="Professional WordPress maintenance services - plugin and core updates tested on staging before production, security hardening, malware removal, WooCommerce support, daily backups, 24/7 uptime monitoring, and emergency WordPress support. 15+ years, worldwide." />
        <link rel="canonical" href="https://www.1solutions.biz/wordpress-support-and-maintenance-services/" />
        <meta property="og:title" content="WordPress Maintenance Services | Support, Security & WooCommerce | 1Solutions" />
        <meta property="og:description" content="Professional WordPress maintenance services - plugin and core updates tested on staging, security hardening, malware removal, WooCommerce support, daily backups, uptime monitoring, and 24/7 emergency support." />
        <meta property="og:url" content="https://www.1solutions.biz/wordpress-support-and-maintenance-services/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .wm-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          @media(max-width:900px){.wm-page{background:linear-gradient(160deg,#dbeafe 0%,#ede9fe 30%,#e0f2fe 55%,#fef3c7 78%,#fce7f3 100%) !important}}
          .wm-page *,.wm-page *::before,.wm-page *::after{box-sizing:border-box}
          .wm-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .wm-orb-1{width:900px;height:900px;background:radial-gradient(circle,rgba(99,130,255,0.30) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);top:-300px;right:-300px}
          .wm-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px}
          .wm-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(99,102,241,.14) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .wm-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .wm-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .wm-breadcrumb li{display:flex;align-items:center;gap:6px}
          .wm-breadcrumb li::after{content:'/';opacity:.45}
          .wm-breadcrumb li:last-child::after{display:none}
          .wm-breadcrumb a{color:#0F3460;text-decoration:none}
          .wm-breadcrumb a:hover{text-decoration:underline}
          .wm-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .wm-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .wm-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .wm-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .wm-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .wm-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .wm-badge-dot{width:7px;height:7px;border-radius:50%;background:#D97706;flex-shrink:0}
          .wm-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .wm-btn-primary{display:inline-block;padding:14px 36px;background:#114171;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(17,65,113,.28)}
          .wm-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .wm-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .wm-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(17,65,113,.5);transform:translateY(-2px)}
          .wm-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .wm-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .wm-stat-col:last-child{border-right:none}
          .wm-stat-val{font-size:28px;font-weight:900;color:#D97706;letter-spacing:-.5px;line-height:1}
          .wm-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .wm-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .wm-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .wm-logos-wrap{width:100%;overflow:hidden}
          .wm-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:wm-marquee 28s linear infinite}
          .wm-logos-track:hover{animation-play-state:paused}
          @keyframes wm-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .wm-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .wm-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .wm-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .wm-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .wm-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .wm-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .wm-s-reveal.wm-revealed{opacity:1;transform:translateY(0)}
          .wm-inner{max-width:1300px;margin:0 auto}
          .wm-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .wm-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .wm-svc-card{background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .wm-svc-card.wm-cv{opacity:1;transform:translateY(0)}
          .wm-svc-card.wm-cv:hover{transform:translateY(-6px);border-color:rgba(217,119,6,.45);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .wm-svc-card.feat{border-color:rgba(217,119,6,.22)}
          .wm-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .wm-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .wm-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .wm-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .wm-svc-card.wm-cv:hover::before{transform:scaleY(1)}
          .wm-svc-more{text-align:center;margin-top:22px}
          .wm-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .wm-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .wm-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .wm-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .wm-stack-card{background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .wm-stack-card.wm-sv{opacity:1;transform:translateY(0)}
          .wm-stack-card.wm-sv:hover{border-color:rgba(217,119,6,.40);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .wm-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .wm-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .wm-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .wm-eng-section{padding:80px 40px;position:relative;z-index:1}
          .wm-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .wm-eng-card{background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .wm-eng-card.wm-ev{opacity:1;transform:translateY(0)}
          .wm-eng-card.wm-ev:hover{border-color:rgba(217,119,6,.40);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .wm-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .wm-eng-card.feat.wm-ev{transform:translateY(-8px)}
          .wm-eng-card.feat.wm-ev:hover{transform:translateY(-12px)}
          .wm-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .wm-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .wm-eng-card.wm-ev:hover .wm-eng-icon{background:rgba(217,119,6,.10)}
          .wm-eng-card.feat .wm-eng-icon{background:rgba(217,119,6,.12)}
          .wm-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .wm-eng-card.wm-ev:hover .wm-eng-icon svg{fill:#D97706}
          .wm-eng-card.feat .wm-eng-icon svg{fill:#D97706}
          .wm-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .wm-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .wm-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .wm-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .wm-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .wm-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .wm-eng-list li::before{content:'✓';font-weight:800;color:#D97706;flex-shrink:0;margin-top:1px}
          .wm-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .wm-eng-process strong{color:#0F3460}
          .wm-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .wm-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(217,119,6,.09);color:#D97706;border:1.5px solid rgba(217,119,6,.30)}
          .wm-eng-cta:hover{background:#D97706;color:#fff;border-color:#D97706}
          .wm-eng-card.feat .wm-eng-cta{background:#D97706;color:#fff;border-color:#D97706}
          .wm-eng-card.feat .wm-eng-cta:hover{background:#b45309;border-color:#b45309}
          .wm-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .wm-psteps{display:flex;flex-direction:column;margin-top:52px}
          .wm-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .wm-pstep.wm-pv{opacity:1;transform:translateY(0)}
          .wm-pstep-l{display:flex;flex-direction:column;align-items:center}
          .wm-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .wm-pstep.wm-pv:hover .wm-pstep-circle{background:rgba(217,119,6,.15);border-color:#D97706;color:#D97706}
          .wm-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .wm-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .wm-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .wm-pstep:last-child .wm-pstep-connector{display:none}
          .wm-pstep-r{padding:4px 0 38px}
          .wm-pstep:last-child .wm-pstep-r{padding-bottom:0}
          .wm-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .wm-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .wm-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .wm-center-head{text-align:center;margin-bottom:48px}
          .wm-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .wm-tcard{background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .wm-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.42) 100%);border-color:rgba(217,119,6,.22)}
          .wm-tcard.wm-tv{opacity:1;transform:translateY(0)}
          .wm-tcard.wm-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .wm-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .wm-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .wm-tauthor{display:flex;align-items:center;gap:12px}
          .wm-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .wm-tname{font-size:14px;font-weight:700;color:#0F3460}
          .wm-trole{font-size:12px;color:#6b7280}
          .wm-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .wm-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .wm-wcard{background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .wm-wcard.wm-wv{opacity:1;transform:translateY(0) scale(1)}
          .wm-wcard.wm-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(217,119,6,.40);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .wm-wcard-dot{width:10px;height:10px;border-radius:50%;background:#D97706;margin-bottom:12px}
          .wm-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .wm-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .wm-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,.65) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .wm-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .wm-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .wm-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .wm-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .wm-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .wm-cbenefit-icon-wrap{width:38px;height:38px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
          .wm-cbenefit-icon{width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75}
          .wm-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .wm-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(219,234,254,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .wm-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .wm-form{display:flex;flex-direction:column;gap:13px}
          .wm-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .wm-fg{display:flex;flex-direction:column;gap:5px}
          .wm-fg.full{grid-column:1/-1}
          .wm-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .wm-fg input,.wm-fg textarea,.wm-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .wm-fg input:focus,.wm-fg textarea:focus,.wm-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,.90);box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .wm-consent{display:flex;gap:8px;align-items:flex-start}
          .wm-consent input{margin-top:3px;width:15px;height:15px}
          .wm-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .wm-consent a{color:#0F3460}
          .wm-submit{width:100%;padding:14px;background:rgba(15,52,96,.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.30);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(15,52,96,.25),inset 0 1px 0 rgba(255,255,255,.15)}
          .wm-submit:hover{background:rgba(15,52,96,.95);border-color:rgba(245,158,11,.60);transform:translateY(-2px)}
          .wm-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .wm-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 8px}
          .wm-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .wm-faq-list{display:flex;flex-direction:column;gap:10px}
          .wm-fitem{background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s;position:relative}
          .wm-fitem.open{border-color:rgba(217,119,6,.40);box-shadow:0 8px 32px rgba(15,52,96,.12),inset 0 1px 0 rgba(255,255,255,1)}
          .wm-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px}
          .wm-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .wm-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .wm-fitem.open .wm-fq-badge{background:#D97706;color:#fff}
          .wm-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .wm-fitem.open .wm-fq span{color:#D97706}
          .wm-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .wm-fitem.open .wm-fchev{transform:rotate(180deg);color:#D97706}
          .wm-fanswer-wrap{overflow:hidden;transition:max-height .4s ease;max-height:0}
          .wm-fitem.open .wm-fanswer-wrap{max-height:600px}
          .wm-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .wm-related{padding:80px 40px;background:rgba(219,234,254,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .wm-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .wm-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .wm-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .wm-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .wm-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .wm-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .wm-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .wm-rtag-blue{background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8}
          .wm-rtag-violet{background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9}
          .wm-rtag-amber{background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309}
          .wm-rtag-teal{background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E}
          .wm-rtag-green{background:rgba(17,65,113,.09);border-color:rgba(17,65,113,.28);color:#114171}
          .wm-rtag-rose{background:rgba(225,29,72,.09);border-color:rgba(225,29,72,.28);color:#9f1239}
          .wm-what-section{background:#EEF3FB;border-top:1px solid rgba(17,65,113,.08);border-bottom:1px solid rgba(17,65,113,.08);padding:72px 40px;position:relative;z-index:1}
          .wm-what-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
          .wm-what-text h2{font-size:38px;font-weight:900;line-height:1.15;letter-spacing:-.8px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px}
          .wm-what-text p{font-size:15px;color:#4A6080;line-height:1.75;margin:0 0 20px}
          .wm-what-text h3{font-size:20px;font-weight:700;color:#114171;margin:24px 0 12px}
          .wm-what-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
          .wm-what-list li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#374151;line-height:1.6}
          .wm-what-list li::before{content:'✓';color:#114171;font-weight:800;flex-shrink:0;margin-top:1px}
          .wm-risk-box{background:rgba(255,255,255,.70);border:1px solid rgba(17,65,113,.12);border-radius:18px;padding:28px;display:flex;flex-direction:column;gap:16px}
          .wm-risk-box h3{font-size:18px;font-weight:700;color:#114171;margin:0 0 4px}
          .wm-risk-item{display:flex;gap:12px;align-items:flex-start}
          .wm-risk-icon{width:36px;height:36px;border-radius:8px;background:rgba(217,119,6,.14);display:flex;align-items:center;justify-content:center;flex-shrink:0}
          .wm-risk-icon svg{width:18px;height:18px;fill:#D97706}
          .wm-why-highlight{max-width:1100px;margin:44px auto 0;background:linear-gradient(135deg,rgba(254,243,199,.60) 0%,rgba(255,255,255,.80) 100%);border:1px solid rgba(217,119,6,.22);border-left:4px solid #D97706;border-radius:0 14px 14px 0;padding:28px 36px;backdrop-filter:blur(10px)}
          .wm-why-highlight h3{font-size:20px;font-weight:800;color:#0F3460;margin:0 0 10px}
          .wm-why-highlight p{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .wm-risk-item p{font-size:13px;color:#4A6080;line-height:1.6;margin:0}
          .wm-risk-item strong{display:block;font-size:13px;color:#0F1F40;font-weight:600;margin-bottom:2px}
          .wm-cmp-section{background:transparent;padding:72px 40px;position:relative;z-index:1}
          .wm-cmp-table{width:100%;border-collapse:collapse;margin-top:32px;font-size:14px}
          .wm-cmp-table th{background:#114171;color:#fff;padding:14px 18px;text-align:left;font-weight:700;font-size:13px}
          .wm-cmp-table th:first-child{border-radius:10px 0 0 0}
          .wm-cmp-table th:last-child{border-radius:0 10px 0 0}
          .wm-cmp-table td{padding:12px 18px;border-bottom:1px solid rgba(17,65,113,.08);color:#374151;vertical-align:top}
          .wm-cmp-table tr:nth-child(even) td{background:rgba(219,234,254,.40)}
          .wm-cmp-table td:first-child{font-weight:600;color:#0F1F40}
          .wm-cmp-check{color:#114171;font-weight:800}
          .wm-cmp-dash{color:#9ca3af}
          @media(max-width:1280px){.wm-stack-grid{grid-template-columns:repeat(3,1fr)}.wm-why-grid{grid-template-columns:repeat(3,1fr)}}
          @media(max-width:1024px){.wm-page{overflow-x:hidden}.wm-hero h1{font-size:36px}.wm-s-title{font-size:34px;letter-spacing:-.5px}.wm-faq h2{font-size:34px}.wm-ctitle{font-size:34px}.wm-what-text h2{font-size:30px}.wm-svc-grid{grid-template-columns:repeat(2,1fr)}.wm-stack-grid{grid-template-columns:repeat(2,1fr)}.wm-eng-grid{grid-template-columns:1fr;max-width:520px;margin-left:auto;margin-right:auto}.wm-eng-card.feat{transform:none}.wm-eng-card.feat.wm-ev{transform:none}.wm-eng-card.feat.wm-ev:hover{transform:translateY(-4px)}.wm-why-grid{grid-template-columns:repeat(2,1fr)}.wm-tgrid{grid-template-columns:repeat(2,1fr)}.wm-contact-grid{grid-template-columns:1fr}.wm-cmp-table{font-size:13px}}
          @media(max-width:768px){.wm-breadcrumb{padding:12px 20px 0}.wm-hero{padding:28px 20px 20px}.wm-hero h1{font-size:26px;letter-spacing:-.3px}.wm-hero-desc{font-size:14px}.wm-ctas{flex-direction:column;align-items:center;gap:10px}.wm-btn-primary,.wm-btn-ghost{width:100%;max-width:320px;text-align:center;padding:13px 24px}.wm-stats{grid-template-columns:1fr 1fr}.wm-stat-col:nth-child(2){border-right:none}.wm-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.wm-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.wm-logos{padding:16px 20px 28px}.wm-svc-section,.wm-stack-section,.wm-eng-section,.wm-process-section,.wm-testi,.wm-why-section,.wm-faq,.wm-related,.wm-what-section,.wm-cmp-section{padding:52px 20px}.wm-contact{padding:44px 20px}.wm-s-title{font-size:26px;letter-spacing:-.4px}.wm-s-eyebrow{font-size:10px}.wm-s-desc{font-size:14px}.wm-ctitle{font-size:26px}.wm-faq h2{font-size:26px}.wm-faq-sub{font-size:13px}.wm-svc-grid{grid-template-columns:1fr}.wm-stack-grid{grid-template-columns:repeat(2,1fr);gap:12px}.wm-eng-grid{max-width:100%}.wm-why-grid{grid-template-columns:repeat(2,1fr);gap:12px}.wm-tgrid{grid-template-columns:1fr;gap:16px}.wm-what-inner{grid-template-columns:1fr;gap:28px}.wm-what-text h2{font-size:24px}.wm-what-text p{font-size:14px}.wm-why-highlight{padding:20px 20px 20px 24px;margin-top:28px}.wm-why-highlight h3{font-size:17px}.wm-why-highlight p{font-size:14px}.wm-cmp-section .wm-inner{overflow-x:auto;-webkit-overflow-scrolling:touch}.wm-cmp-table{min-width:540px;font-size:12px}.wm-cmp-table th,.wm-cmp-table td{padding:10px 12px}.wm-pstep-title{font-size:17px}.wm-pstep-desc{font-size:14px}.wm-frow{grid-template-columns:1fr}.wm-form-box{padding:24px 20px}.wm-contact-grid{gap:28px}.wm-fq{padding:16px 16px 16px 50px}.wm-fq-badge{left:12px;width:24px;height:24px;font-size:10px}.wm-fq span{font-size:14px}.wm-fanswer{padding:0 16px 16px 50px;font-size:13px}.wm-rtag{padding:8px 14px;font-size:13px}}
          @media(max-width:480px){.wm-hero h1{font-size:22px}.wm-hero-desc{font-size:13px}.wm-badge{font-size:10px;padding:4px 8px;gap:5px}.wm-badge-dot{width:6px;height:6px}.wm-btn-primary,.wm-btn-ghost{font-size:14px;padding:12px 20px}.wm-stat-val{font-size:20px}.wm-stat-label{font-size:10px}.wm-stat-col{padding:14px 10px}.wm-s-title{font-size:20px}.wm-faq h2{font-size:20px}.wm-ctitle{font-size:20px}.wm-what-text h2{font-size:20px}.wm-stack-grid{grid-template-columns:1fr}.wm-why-grid{grid-template-columns:1fr}.wm-svc-card h3{font-size:15px}.wm-svc-card p{font-size:12px}.wm-eng-card{padding:24px 20px}.wm-pstep{grid-template-columns:48px 1fr;gap:0 14px}.wm-pstep-circle{width:44px;height:44px;font-size:16px}.wm-pstep-title{font-size:16px}.wm-pstep-desc{font-size:13px}.wm-fq{padding:14px 14px 14px 46px}.wm-fq-badge{left:10px;width:22px;height:22px;font-size:9px}.wm-fq span{font-size:13px}.wm-fanswer{padding:0 14px 14px 46px;font-size:12px}.wm-form-box{padding:18px 14px}.wm-form-box h3{font-size:18px}.wm-wcard h3{font-size:13px}.wm-wcard p{font-size:12px}}
          @media(max-width:360px){.wm-hero h1{font-size:19px}.wm-s-title{font-size:18px}.wm-faq h2{font-size:18px}.wm-ctitle{font-size:18px}.wm-stat-col{padding:12px 8px}.wm-stat-val{font-size:18px}.wm-btn-primary,.wm-btn-ghost{font-size:13px;padding:11px 16px}.wm-pstep{grid-template-columns:44px 1fr;gap:0 10px}.wm-pstep-circle{width:40px;height:40px;font-size:14px}}
        `}</style>
      </Head>

      <div className="wm-page">
        <div className="wm-orb wm-orb-1" /><div className="wm-orb wm-orb-2" /><div className="wm-orb wm-orb-3" />

        <nav className="wm-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">WordPress Support & Maintenance Services</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <section className="wm-hero">
          <span className="wm-eyebrow">WordPress Maintenance & Support Services</span>
          <h1>WordPress Maintenance Services - Secure, Updated & Fully Supported</h1>
          <p className="wm-hero-desc">Professional WordPress maintenance services for businesses worldwide - all plugin and core updates tested on a staging site before production, security hardening and malware removal, WooCommerce checkout testing, daily off-site backups, 24/7 uptime monitoring, and emergency WordPress support. 15+ years, 150+ sites maintained.</p>
          <div className="wm-trust-row">
            {['150+ WordPress Sites Maintained','WooCommerce Specialists','Updates on Staging First','Malware Removal Included'].map(b => (
              <div className="wm-badge" key={b}><span className="wm-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="wm-ctas">
            <Link href="#contact" className="wm-btn-primary">Get a WordPress Maintenance Plan</Link>
            <Link href="#plans" className="wm-btn-ghost">View Plans →</Link>
          </div>
        </section>

        <div className="wm-stats" ref={statsRef}>
          {[['150+','WordPress Sites'],['15+','Years Experience'],['99.9%','Avg Uptime Achieved'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        <div className="wm-logos">
          <span className="wm-logos-label">Trusted by Leading Businesses</span>
          <div className="wm-logos-wrap">
            <div className="wm-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="wm-clogo" />
              ))}
            </div>
          </div>
        </div>

        <section className="wm-what-section" aria-labelledby="wm-what-heading">
          <div className="wm-what-inner">
            <div className="wm-what-text">
              <h2 id="wm-what-heading">What Is WordPress Website Maintenance?</h2>
              <p>WordPress website maintenance is the ongoing process of keeping your WordPress site secure, updated, backed up, and performing well. WordPress powers 43% of all websites on the internet - and its popularity makes it the most targeted CMS by attackers. Outdated plugins and themes are responsible for the majority of WordPress hacks.</p>
              <p>A managed WordPress maintenance service handles every recurring task so your team never has to think about updates, backups, or security scans:</p>
              <ul className="wm-what-list">
                <li>WordPress core and plugin security patches applied within 48 hours of disclosure</li>
                <li>All updates tested on a private staging site before going to your live production site</li>
                <li>Daily automated backups stored off-site, with monthly restore testing</li>
                <li>24/7 uptime monitoring with immediate alerts on any downtime</li>
                <li>Weekly malware scanning and WAF rule updates</li>
                <li>Core Web Vitals and PageSpeed tracking - Google ranking signals</li>
                <li>SSL certificate and domain expiry monitoring</li>
                <li>Monthly developer hours for content updates and minor design changes</li>
              </ul>
            </div>
            <div className="wm-risk-box">
              <h3>What Happens Without WordPress Maintenance</h3>
              {[
                { title:'Security breaches', desc:'Outdated plugins and themes are the #1 attack vector for WordPress hacks. Malware, SEO spam, and phishing pages get injected into your site.', path:'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' },
                { title:'Plugin conflicts and white screens', desc:'WordPress and PHP version upgrades change the environment. Untested plugin updates frequently cause fatal errors and white screens of death.', path:'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' },
                { title:'SEO ranking drops', desc:'Broken links, declining Core Web Vitals scores, and crawl errors from unmonitored sites compound into measurable organic traffic loss over months.', path:'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z' },
                { title:'Data loss risk', desc:'Without daily off-site backups and restore testing, a server failure or post-hack recovery may result in permanent loss of site content and database.', path:'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z' },
                { title:'WooCommerce checkout failures', desc:'WooCommerce plugin updates can silently break payment gateways and checkout flows, costing hours of lost revenue before the issue is caught.', path:'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.45 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z' },
                { title:'Emergency recovery costs', desc:'Ad-hoc emergency developer rates for hacked sites or broken updates cost far more than a monthly maintenance retainer over a year.', path:'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z' },
              ].map(({ title, desc, path }) => (
                <div className="wm-risk-item" key={title}>
                  <div className="wm-risk-icon"><svg viewBox="0 0 24 24"><path d={path} /></svg></div>
                  <p><strong>{title}</strong> {desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="wm-why-highlight">
            <h3>Why WordPress Sites Need Regular Maintenance</h3>
            <p>According to Sucuri&#39;s annual Hacked Website Report, the vast majority of compromised WordPress sites were running outdated software at the time of the attack. The window between a vulnerability being disclosed and mass exploitation beginning can be as short as a few hours, making prompt patching essential for any business website. Regular WordPress maintenance is not optional - it is the difference between a site that earns trust and one that becomes a liability.</p>
          </div>
        </section>

        <section className="wm-svc-section" aria-labelledby="wm-svc-heading">
          <div className="wm-inner">
            <div className={`wm-s-reveal${visibleSections.has('svc') ? ' wm-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="wm-s-eyebrow">WordPress Maintenance Services</span>
              <h2 id="wm-svc-heading" className="wm-s-title">What Our WordPress Maintenance Covers</h2>
              <p className="wm-s-desc" style={{ maxWidth: 720 }}>From WordPress core and plugin updates applied staging-first, through security hardening and malware removal, WooCommerce-specific maintenance with checkout testing, daily backups, uptime and performance monitoring, bug fixes, and monthly developer hours.</p>
            </div>
            <div className="wm-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`wm-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' wm-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="wm-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="wm-svc-more">
                <button className="wm-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="wm-stack-section" aria-labelledby="wm-stack-heading">
          <div className="wm-inner">
            <div className={`wm-s-reveal${visibleSections.has('stk') ? ' wm-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="wm-s-eyebrow">Tools & Stack</span>
              <h2 id="wm-stack-heading" className="wm-s-title">WordPress Maintenance Stack</h2>
              <p className="wm-s-desc" style={{ maxWidth: 680 }}>WordPress 6.x, WooCommerce, Wordfence/Sucuri security, UpdraftPlus backups, WP Rocket performance, Cloudflare CDN, all major page builders, WooCommerce extensions, and managed WordPress hosting expertise.</p>
            </div>
            <div className="wm-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`wm-stack-card${visibleStackCards.includes(i) ? ' wm-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="wm-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="wm-stack-pills">
                    {grp.items.map(item => <span key={item} className="wm-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="plans" className="wm-eng-section" aria-labelledby="wm-eng-heading">
          <div className="wm-inner">
            <div className={`wm-s-reveal${visibleSections.has('eng') ? ' wm-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="wm-s-eyebrow">WordPress Maintenance Plans</span>
              <h2 id="wm-eng-heading" className="wm-s-title">Choose Your WordPress Care Plan</h2>
              <p className="wm-s-desc" style={{ maxWidth: 680 }}>From an Essential plan for small business websites to a Professional plan with WooCommerce support and priority SLA, to an Enterprise plan with a dedicated WordPress engineer and 2-hour emergency response.</p>
            </div>
            <div className="wm-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`wm-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' wm-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="wm-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="wm-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="wm-eng-name">{m.name}</div>
                  <div className="wm-eng-headline">{m.headline}</div>
                  <div className="wm-eng-desc">{m.desc}</div>
                  <div className="wm-eng-list-label">Best for</div>
                  <ul className="wm-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="wm-eng-process"><strong>Process:</strong> {m.process}<br /><span className="wm-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="wm-eng-cta">Get a maintenance quote →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wm-cmp-section" aria-label="WordPress Maintenance Plan Comparison">
          <div className="wm-inner">
            <div className="wm-center-head">
              <span className="wm-s-eyebrow">Plan Comparison</span>
              <h2 className="wm-s-title">WordPress Maintenance Plans at a Glance</h2>
              <p className="wm-s-desc">Compare what is included in each WordPress care plan to find the right level of support for your business.</p>
            </div>
            <table className="wm-cmp-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Essential</th>
                  <th>Professional</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['WordPress core & plugin updates (staging-first)', '✓', '✓', '✓'],
                  ['Daily off-site backups + monthly restore testing', '✓', '✓', '✓'],
                  ['24/7 uptime monitoring', '✓', '✓', '✓'],
                  ['Malware removal (included in plan)', '✓', '✓', '✓'],
                  ['SSL certificate management', '✓', '✓', '✓'],
                  ['Monthly maintenance report', '✓', '✓', '✓'],
                  ['Monthly developer hours', '4 hrs', '8 hrs', '20 hrs'],
                  ['Emergency response SLA', 'Next day', '4-hour', '2-hour (24/7)'],
                  ['WooCommerce update & checkout testing', '-', '✓', '✓'],
                  ['Core Web Vitals monitoring', '-', '✓', '✓'],
                  ['Google Search Console integration', '-', '✓', '✓'],
                  ['Dedicated account manager', '-', '✓', '✓'],
                  ['Monthly account call', '-', '✓', '✓'],
                  ['Multi-site management', '-', '-', '✓'],
                  ['Dedicated WordPress engineer', '-', '-', '✓'],
                  ['Annual penetration testing', '-', '-', '✓'],
                  ['Custom plugin maintenance', '-', '-', '✓'],
                  ['Quarterly strategy calls', '-', '-', '✓'],
                ].map(([feat, ess, pro, ent]) => (
                  <tr key={feat}>
                    <td>{feat}</td>
                    {[ess, pro, ent].map((v, i) => (
                      <td key={i} className={v === '✓' ? 'wm-cmp-check' : v === '-' ? 'wm-cmp-dash' : ''}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="wm-process-section" aria-labelledby="wm-proc-heading">
          <div className="wm-inner" style={{ maxWidth: 760 }}>
            <div className={`wm-s-reveal${visibleSections.has('proc') ? ' wm-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="wm-s-eyebrow">How We Maintain Your WordPress Site</span>
              <h2 id="wm-proc-heading" className="wm-s-title">Our WordPress Maintenance Process</h2>
              <p className="wm-s-desc">Starting with a WordPress health audit, through immediate priority fixes, a structured monthly update cycle with staging testing, 24/7 monitoring, incident response, and a detailed monthly report.</p>
            </div>
            <div className="wm-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`wm-pstep${visibleSections.has('proc') ? ' wm-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="wm-pstep-l">
                    <div className="wm-pstep-circle">{step.num}</div>
                    <div className="wm-pstep-connector" />
                  </div>
                  <div className="wm-pstep-r">
                    <div className="wm-pstep-title">{step.title}</div>
                    <p className="wm-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wm-testi" aria-labelledby="wm-ts-heading">
          <div className="wm-inner">
            <div className={`wm-center-head wm-s-reveal${visibleSections.has('ts') ? ' wm-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="wm-s-eyebrow">Client Results</span>
              <h2 id="wm-ts-heading" className="wm-s-title">What Our WordPress Maintenance Clients Say</h2>
              <p className="wm-s-desc">Trusted by professional services firms, eCommerce brands, media groups, and agencies in the US, UK, and Australia who rely on us to keep their WordPress sites secure, updated, and running.</p>
            </div>
            <div className="wm-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`wm-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' wm-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review">
                  <div className="wm-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="wm-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="wm-tauthor">
                    <div className="wm-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div><div className="wm-tname" itemProp="author">{t.name}</div><div className="wm-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wm-why-section" aria-labelledby="wm-wy-heading">
          <div className="wm-inner">
            <div className={`wm-s-reveal${visibleSections.has('wy') ? ' wm-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="wm-s-eyebrow">Why 1Solutions</span>
              <h2 id="wm-wy-heading" className="wm-s-title">Why Choose Us for WordPress Maintenance</h2>
              <p className="wm-s-desc" style={{ maxWidth: 680 }}>15+ years of WordPress maintenance, WooCommerce expertise, staging-first update workflow, 48-hour security patch SLA, emergency response in every plan, transparent monthly reporting, and rolling monthly contracts with no lock-in.</p>
            </div>
            <div className="wm-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`wm-wcard${visibleWhyCards.includes(i) ? ' wm-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="wm-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="wm-contact" aria-labelledby="wm-contact-heading">
          <div className="wm-contact-grid">
            <div>
              <h2 id="wm-contact-heading" className="wm-ctitle">Start Your WordPress Maintenance Plan</h2>
              <p className="wm-cdesc">Tell us about your WordPress site and we will recommend the right plan and send a quote. We start every new engagement with a free WordPress health audit - CMS version, plugin vulnerability check, security configuration, backup assessment, and performance baseline - before the retainer begins.</p>
              <div className="wm-cbenefits">
                {['Free WordPress health audit before the retainer starts','All plugin updates tested on staging before going to production','WooCommerce checkout and payment testing included in Professional plans','Malware removal and emergency response covered in all plans','Monthly rolling - no 12-month lock-in contracts'].map(text => (
                  <div className="wm-cbenefit" key={text}>
                    <div className="wm-cbenefit-icon-wrap">
                      <svg className="wm-cbenefit-icon" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.75"><path d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="wm-form-box">
              <h3>Tell Us About Your WordPress Site</h3>
              <form className="wm-form" onSubmit={e => e.preventDefault()}>
                <div className="wm-frow">
                  <div className="wm-fg"><label htmlFor="wm-name">Full Name *</label><input id="wm-name" type="text" placeholder="Your name" required /></div>
                  <div className="wm-fg"><label htmlFor="wm-email">Work Email *</label><input id="wm-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="wm-frow">
                  <div className="wm-fg"><label htmlFor="wm-url">WordPress Site URL *</label><input id="wm-url" type="url" placeholder="https://yoursite.com" required /></div>
                  <div className="wm-fg"><label htmlFor="wm-phone">Phone / WhatsApp</label><input id="wm-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="wm-fg full">
                  <label htmlFor="wm-type">Site Type *</label>
                  <select id="wm-type" required>
                    <option value="">Select site type...</option>
                    <option>WordPress Business / Brochure Site</option>
                    <option>WordPress Blog / Content Site</option>
                    <option>WooCommerce Store</option>
                    <option>WordPress Membership Site</option>
                    <option>WordPress Multisite Network</option>
                    <option>WordPress with Custom Plugin</option>
                    <option>Other WordPress</option>
                  </select>
                </div>
                <div className="wm-fg full">
                  <label htmlFor="wm-plan">Plan Interest</label>
                  <select id="wm-plan">
                    <option value="">Not sure - recommend one for me</option>
                    <option>WordPress Essential (small site)</option>
                    <option>WordPress Professional (priority support)</option>
                    <option>WordPress Enterprise (dedicated engineer)</option>
                    <option>Emergency / one-off issue</option>
                  </select>
                </div>
                <div className="wm-fg full">
                  <label htmlFor="wm-msg">Any Current Issues or Context</label>
                  <textarea id="wm-msg" rows={3} placeholder="Describe your site - how old is it, how often you update content, any security concerns, hacked previously, current update frequency, and what you most need from a maintenance plan..." />
                </div>
                <div className="wm-consent">
                  <input id="wm-consent" type="checkbox" required />
                  <label htmlFor="wm-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. We treat all details confidentially.</label>
                </div>
                <button type="submit" className="wm-submit">Get Free WordPress Audit & Quote →</button>
              </form>
            </div>
          </div>
        </section>

        <section className="wm-faq" aria-labelledby="wm-faq-heading">
          <div className="wm-inner" style={{ maxWidth: 860 }}>
            <span className="wm-s-eyebrow">FAQ</span>
            <h2 id="wm-faq-heading">WordPress Maintenance - Frequently Asked Questions</h2>
            <p className="wm-faq-sub">Everything you need to know about WordPress maintenance with 1Solutions - what is covered, how updates work, WooCommerce support, security hardening, emergency response, and how to switch from another agency.</p>
            <div className="wm-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`wm-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="wm-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="wm-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="wm-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="wm-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="wm-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wm-related">
          <div className="wm-related-inner">
            <span className="wm-s-eyebrow">Explore More</span>
            <h2>Related WordPress & Web Services</h2>
            <p className="wm-related-sub">We also build WordPress and WooCommerce websites, and maintain other CMS platforms for businesses worldwide.</p>
            <hr />
            <div className="wm-rtags">
              {[['/wordpress-development-company','WordPress Development','wm-rtag-blue'],['/woocommerce-development-company','WooCommerce Development','wm-rtag-violet'],['/hire-wordpress-developer','Hire WordPress Developer','wm-rtag-blue'],['/magento-development-company','Magento Development','wm-rtag-amber'],['/website-design','Website Design','wm-rtag-teal'],['/seo-services-company','SEO Services','wm-rtag-green'],['/digital-marketing-services','Digital Marketing','wm-rtag-rose'],['/php-development-company','PHP Development','wm-rtag-rose'],['/shopify-store-development','Shopify Development','wm-rtag-amber'],['/headless-wordpress-development','Headless WordPress','wm-rtag-violet']].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`wm-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
