import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Webflow Maintenance Services', item: 'https://www.1solutions.biz/webflow-maintenance-services/' },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.1solutions.biz/#organization',
      name: '1Solutions',
      url: 'https://www.1solutions.biz',
      logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
      foundingDate: '2010',
      areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '96', bestRating: '5' },
    },
    {
      '@type': 'ProfessionalService',
      name: 'Webflow Maintenance Services',
      url: 'https://www.1solutions.biz/webflow-maintenance-services/',
      description: 'Ongoing Webflow maintenance and support - CMS Collection management, custom code and embed upkeep, Webflow app and integration updates, staging-to-live publishing, uptime and Core Web Vitals monitoring, and monthly developer hours.',
      provider: { '@id': 'https://www.1solutions.biz/#organization' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is Webflow maintenance?', acceptedAnswer: { '@type': 'Answer', text: 'Webflow maintenance is the ongoing process of keeping a live Webflow site accurate, fast, and working correctly after launch - CMS Collection content management, custom code and embed audits, form and integration monitoring, staging-to-production publishing discipline, uptime and Core Web Vitals monitoring, and monthly developer hours for changes and fixes.' } },
        { '@type': 'Question', name: 'Does Webflow need the same maintenance as WordPress?', acceptedAnswer: { '@type': 'Answer', text: 'No. Webflow hosts, patches, and secures its own infrastructure, so there is no core-software or plugin-vulnerability treadmill like WordPress. Webflow maintenance instead focuses on CMS content accuracy, custom code and embed upkeep, third-party integration health, staging review before publishing, and ongoing design/content work.' } },
        { '@type': 'Question', name: 'What is included in a Webflow maintenance plan?', acceptedAnswer: { '@type': 'Answer', text: 'Our plans include CMS Collection content updates, custom code and embed audits after Webflow platform updates, form and integration monitoring (Zapier, Make, HubSpot, Memberstack), staging review before every publish, broken link and 404 monitoring, Core Web Vitals tracking, monthly reports, and a pool of developer hours for design and content changes.' } },
        { '@type': 'Question', name: 'How much does Webflow maintenance cost?', acceptedAnswer: { '@type': 'Answer', text: 'Webflow Care starts from $99-$149/month for smaller marketing sites. Webflow Growth, with CMS management and priority support, runs $249-$499/month. Webflow Enterprise, with a dedicated engineer and custom SLA, is custom-priced. Contact us for a free Webflow site audit and tailored quote.' } },
        { '@type': 'Question', name: 'Can you take over maintenance of a Webflow site another agency built?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We start with a full Webflow site audit - Collection structure, custom code review, integration health, staging setup, and CMS editor access - and send a written report before the retainer begins. We run month-to-month with no lock-in.' } },
        { '@type': 'Question', name: 'Do you fix broken Webflow forms or integrations?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Broken forms, failed Zapier/Make automations, and disconnected integrations (HubSpot, Mailchimp, Memberstack) are covered under our maintenance retainers, with priority response on Growth and Enterprise plans.' } },
      ],
    },
    {
      '@type': 'Review',
      datePublished: '2025-11-04',
      reviewBody: 'Our Webflow site was built by a freelancer who disappeared. 1Solutions took over maintenance, cleaned up the CMS structure, and now handles every content update through a proper staging step before it goes live. No more surprises on the live site.',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Priya M.' },
      itemReviewed: { '@id': 'https://www.1solutions.biz/#organization' },
    },
    {
      '@type': 'Review',
      datePublished: '2025-08-19',
      reviewBody: 'We publish new case studies every week through our Webflow CMS and needed someone to keep the templates and integrations working. 1Solutions catches issues before they reach the live site and the monthly report is exactly what we need for our own reporting.',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Connor B.' },
      itemReviewed: { '@id': 'https://www.1solutions.biz/#organization' },
    },
  ],
};

const SVC_COLORS = [
  { bg: 'linear-gradient(135deg,#ede9fe 0%,#ddd6fe 100%)', border: 'rgba(139,92,246,.35)' },
  { bg: 'linear-gradient(135deg,#eff6ff 0%,#bfdbfe 100%)', border: 'rgba(59,130,246,.35)' },
  { bg: 'linear-gradient(135deg,#ecfdf5 0%,#a7f3d0 100%)', border: 'rgba(16,185,129,.35)' },
  { bg: 'linear-gradient(135deg,#fefce8 0%,#fde68a 100%)', border: 'rgba(217,119,6,.35)' },
  { bg: 'linear-gradient(135deg,#fff7ed 0%,#fed7aa 100%)', border: 'rgba(249,115,22,.35)' },
  { bg: 'linear-gradient(135deg,#fdf2f8 0%,#fbcfe8 100%)', border: 'rgba(236,72,153,.35)' },
  { bg: 'linear-gradient(135deg,#f0fdfa 0%,#99f6e4 100%)', border: 'rgba(20,184,166,.35)' },
  { bg: 'linear-gradient(135deg,#eef2ff 0%,#c7d2fe 100%)', border: 'rgba(99,102,241,.35)' },
  { bg: 'linear-gradient(135deg,#fff1f2 0%,#fecdd3 100%)', border: 'rgba(244,63,94,.35)' },
  { bg: 'linear-gradient(135deg,#f7fee7 0%,#d9f99d 100%)', border: 'rgba(132,204,22,.35)' },
  { bg: 'linear-gradient(135deg,#f0f9ff 0%,#bae6fd 100%)', border: 'rgba(14,165,233,.35)' },
  { bg: 'linear-gradient(135deg,#fffbeb 0%,#fcd34d 100%)', border: 'rgba(245,158,11,.35)' },
];

const SERVICES = [
  { n: '01', title: 'Content Updates', desc: 'Ongoing CMS Collection and static page content updates - copy changes, new entries, image replacements, and structural changes as your site grows, all published through a staging review step first.', icon: 'M12 20h9 M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' },
  { n: '02', title: 'Design Enhancements', desc: 'Ongoing design refinements within your existing Webflow design system - new sections, landing page layouts, navigation updates, and visual polish, kept consistent with your original brand system.', icon: 'M12 3l1.5 6L20 12l-6.5 3L12 21l-1.5-6L4 12l6.5-3L12 3z' },
  { n: '03', title: 'Bug Fixes & Troubleshooting', desc: 'Diagnosis and resolution of Webflow Interactions bugs, layout breaks, broken Collection bindings, and problems introduced by platform updates or custom code - fixed before visitors notice them.', icon: 'M5 13l4 4L19 7' },
  { n: '04', title: 'SEO Optimization', desc: 'Ongoing monitoring of meta titles, descriptions, canonical tags, XML sitemap accuracy, heading structure, and 301 redirects for renamed or removed pages, keeping your SEO equity intact as the site evolves.', icon: 'M3 17l6-6 4 4 8-8 M15 7h6v6' },
  { n: '05', title: 'CMS Management', desc: 'Hands-on management of your Webflow Collections - new entries, field updates, reference and multi-reference relationships, and content structure changes, without you needing to touch the Webflow Editor yourself.', icon: 'M12 3l9 5-9 5-9-5 9-5z M3 13l9 5 9-5' },
  { n: '06', title: 'Backup & Recovery', desc: 'Scheduled site and CMS content backups with a documented recovery process, so a bad publish, accidental deletion, or platform incident is never more than a restore away.', icon: 'M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z' },
  { n: '07', title: '3rd-Party Integrations', desc: 'Monitoring and maintenance of connected tools - HubSpot, Mailchimp, Zapier, Make, Memberstack, Stripe - so a silently broken integration or failed automation gets caught and fixed, not discovered weeks later.', icon: 'M9 15l6-6 M8 12a4 4 0 0 1 0-6l2-2a4 4 0 0 1 6 6l-1 1 M16 12a4 4 0 0 1 0 6l-2 2a4 4 0 0 1-6-6l1-1' },
  { n: '08', title: 'Responsive Design', desc: 'Regular checks across desktop, tablet, and mobile breakpoints to catch layout shifts, overlapping elements, or broken Interactions introduced by new content or design changes.', icon: 'M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z M12 18h.01' },
  { n: '09', title: 'Custom Code Maintenance', desc: 'Review of custom code embeds, third-party scripts, and Webflow Interactions after every platform update, catching conflicts or deprecated APIs before they break something on your live site.', icon: 'M9 8l-4 4 4 4 M15 8l4 4-4 4' },
  { n: '10', title: 'Browser Compatibility Issues', desc: 'Cross-browser testing and fixes across Chrome, Safari, Firefox, and Edge, catching rendering differences and Interaction bugs that only show up in specific browsers.', icon: 'M3 4h18v16H3V4z M3 9h18' },
  { n: '11', title: 'Webflow Updates & Compatibility', desc: 'Every Webflow platform update is reviewed against your custom code, Interactions, and integrations for compatibility issues before it can affect your live site.', icon: 'M21 12a9 9 0 1 1-3-6.7 M21 3v6h-6' },
  { n: '12', title: 'Website Performance Monitoring', desc: '24/7 uptime monitoring with instant alerts, plus Core Web Vitals (LCP, INP, CLS) and PageSpeed tracking with monthly benchmarked reports - flagging regressions from new content, embeds, or heavy images.', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
];

const TECH_STACK = [
  { group: 'Webflow Core', color: '#0F3460', items: ['Webflow Designer', 'Webflow CMS Collections', 'Webflow Interactions', 'Webflow Ecommerce', 'Webflow Hosting / CDN', 'Webflow Logic'] },
  { group: 'Integrations', color: '#D97706', items: ['Zapier', 'Make (Integromat)', 'HubSpot', 'Mailchimp', 'Memberstack', 'Outseta'] },
  { group: 'Performance & Monitoring', color: '#f97316', items: ['UptimeRobot / Better Uptime', 'PageSpeed Insights', 'Google Search Console', 'Core Web Vitals', 'GTmetrix', 'Screaming Frog'] },
  { group: 'Animation & Custom Code', color: '#6366f1', items: ['GSAP', 'Lottie', 'Custom JS Embeds', 'Finsweet Attributes', 'Webflow Custom Code', 'Third-Party Scripts'] },
  { group: 'Commerce & Payments', color: '#7c3aed', items: ['Webflow Ecommerce', 'Stripe', 'PayPal', 'Foxy.io', 'Product Sync', 'Order Management'] },
  { group: 'Reporting', color: '#0891b2', items: ['Monthly Change Log', 'Uptime Reports', 'Core Web Vitals Trend', 'Google Analytics 4', 'Search Console Reports', 'Dev Hours Ledger'] },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'care',
    name: 'Webflow Care',
    badge: 'Start Here',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
    headline: 'Core upkeep - CMS content, uptime, and staging discipline.',
    desc: 'Monthly CMS Collection updates, staging review before every publish, uptime monitoring, broken link scanning, and a monthly report. Up to 4 hours of developer time for minor content and design changes.',
    bestFor: ['Small business Webflow marketing sites', 'Brochure and lead-generation sites', 'Sites needing regular content updates without a full retainer'],
    process: 'Audit → Monthly CMS updates → Monthly report → Support tickets',
    timeline: 'Active within 3 business days of onboarding',
  },
  {
    id: 'growth',
    name: 'Webflow Growth',
    badge: 'Most Popular',
    badgeColor: '#114171',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Priority support, integration monitoring, and more dev hours.',
    desc: 'Everything in Care plus: 4-hour priority response, integration and form monitoring (Zapier, HubSpot, Memberstack), custom code audits after Webflow platform updates, Core Web Vitals monitoring, up to 8 developer hours per month, and a dedicated account manager.',
    bestFor: ['Content-heavy Webflow sites publishing regularly', 'Webflow Ecommerce and membership sites', 'Agencies needing white-label Webflow support'],
    process: 'Audit → Integration monitoring → 4h priority response → 8h dev bank → Monthly call',
    timeline: 'Active within 2 business days',
  },
  {
    id: 'enterprise',
    name: 'Webflow Enterprise',
    badge: 'High-Volume',
    badgeColor: '#a855f7',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Dedicated Webflow engineer, 2-hour SLA, multi-site management.',
    desc: 'Dedicated Webflow engineer, 2-hour priority response, multi-site maintenance under one retainer, staging environment management, advanced Ecommerce support, up to 20 developer hours per month, quarterly strategy calls, and a custom SLA.',
    bestFor: ['High-traffic Webflow marketing platforms', 'Multi-site Webflow portfolios', 'Agencies with multiple client Webflow sites'],
    process: 'Custom SLA → Dedicated engineer → Multi-site management → Quarterly strategy review',
    timeline: 'Custom onboarding - typically 5-7 business days',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Onboarding & Staging Setup', desc: 'Secure access handover to your Webflow workspace, connected integrations, domain registrar, and analytics. We confirm or set up a staging domain and our monitoring tools (uptime, Core Web Vitals, form testing) - all without touching your live site.' },
  { num: '02', title: 'Immediate Priority Fixes', desc: 'Critical issues found in the audit are resolved first: broken forms or integrations, orphaned CMS entries causing 404s, missing redirects, and any live-site issues found during the initial review - resolved before the regular monthly cycle begins.' },
  { num: '03', title: 'Monthly Content & Update Cycle', desc: 'Each month: CMS content updates and design changes are made on staging first, reviewed for visual and functional regressions, then published to production. Webflow platform updates are checked against your custom code and Interactions for compatibility.' },
  { num: '04', title: 'Incident Response & Support', desc: 'Continuous uptime monitoring means outages are caught immediately. Broken forms, failed integrations, and Collection binding errors are caught on staging before they reach production. When incidents do occur, we respond within your plan SLA and follow up with a written report.' },
  { num: '05', title: 'Monthly Report & Dev Hour Usage', desc: 'A detailed monthly report covering all changes published, uptime statistics, Core Web Vitals trend, broken links repaired, integration health, developer hours used and remaining, and recommendations. Growth and Enterprise clients also get a monthly account manager call.' },
];

const TESTIMONIALS = [
  {
    text: 'Our Webflow site was built by a freelancer who disappeared. 1Solutions took over maintenance, cleaned up the CMS structure, and now handles every content update through a proper staging step before it goes live. No more surprises on the live site.',
    name: 'Priya M.', role: 'Marketing Lead, B2B SaaS (India)', init: 'PM', bg: '#0F3460', feat: true,
  },
  {
    text: 'We publish new case studies every week through our Webflow CMS and needed someone to keep the templates and integrations working. 1Solutions catches issues before they reach the live site and the monthly report is exactly what we need for our own reporting.',
    name: 'Connor B.', role: 'Head of Content, Professional Services (UK)', init: 'CB', bg: '#0F3460',
  },
  {
    text: 'A Zapier automation feeding our CRM from our Webflow forms silently broke and we did not notice for weeks before switching to 1Solutions. Their integration monitoring caught a similar issue within a day the first month we were on the plan.',
    name: 'Sofia R.', role: 'Ops Manager, D2C Brand (Australia)', init: 'SR', bg: '#1e3a5f',
  },
];

// Row 2 is the same reviews rotated by one position (and scrolled in
// reverse) so the two marquee rows never show identical cards lined up
// together - same pattern as wordpress-development-company.
const TESTIMONIALS_ROW2 = [TESTIMONIALS[1], TESTIMONIALS[2], TESTIMONIALS[0]];

const WHY_CARDS = [
  {
    title: 'Simple, Transparent Pricing',
    desc: 'Enjoy clear, contract-free pricing with our Webflow maintenance plans - pay only for what you need, with the flexibility to cancel anytime.',
    iconBg: 'linear-gradient(135deg,#a855f7 0%,#7c3aed 100%)',
    path: 'M21.41 11.41l-8.83-8.83C12.21 2.21 11.7 2 11.17 2H4c-1.1 0-2 .9-2 2v7.17c0 .53.21 1.04.59 1.41l8.83 8.83c.78.78 2.05.78 2.83 0l7.17-7.17c.78-.79.78-2.05-.01-2.83zM6.5 8C5.67 8 5 7.33 5 6.5S5.67 5 6.5 5 8 5.67 8 6.5 7.33 8 6.5 8z',
  },
  {
    title: 'Fast Turnaround',
    desc: 'Critical fixes and priority requests are handled fast - most Growth and Enterprise tickets are resolved within hours, not days.',
    iconBg: 'linear-gradient(135deg,#fb7185 0%,#e11d48 100%)',
    path: 'M7 2v11h3v9l7-12h-4l4-8z',
  },
  {
    title: '3rd-Party Integrations',
    desc: 'We connect and monitor Zapier, Make, HubSpot, Memberstack, and any other third-party platform your Webflow site depends on.',
    iconBg: 'linear-gradient(135deg,#60a5fa 0%,#2563eb 100%)',
    path: 'M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 13c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V5H7C4.24 5 2 7.24 2 10s2.24 5 5 5h4v-2H7zm1-2h8v2H8v-2z',
  },
  {
    title: 'Staging-First Workflow',
    desc: 'Every content or design change is reviewed on staging first - regressions get caught before they ever reach your live site.',
    iconBg: 'linear-gradient(135deg,#f59e0b 0%,#D97706 100%)',
    path: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
  },
  {
    title: 'We Also Build Webflow Sites',
    desc: 'Our maintenance team works from the same Webflow expertise as our development team - we understand Collections and custom code because we build with them.',
    iconBg: 'linear-gradient(135deg,#1e3a5f 0%,#0F3460 100%)',
    path: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  },
  {
    title: 'No Lock-In, Monthly Rolling',
    desc: 'Our retainers run month-to-month with no 12-month contracts - 30 days notice and a clean handover document if you ever want to leave.',
    iconBg: 'linear-gradient(135deg,#2dd4bf 0%,#0F766E 100%)',
    path: 'M12 6V3L8 7l4 4V8c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 16.97 20 15.54 20 14c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 9.74C4.46 11.03 4 12.46 4 14c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
  },
];

const FAQS = [
  { q: 'What is Webflow maintenance?', a: 'Webflow maintenance is the ongoing process of keeping a live Webflow site accurate, fast, and functioning correctly after launch. Unlike WordPress, Webflow itself handles core software updates and hosting security - so maintenance instead focuses on CMS Collection content management, custom code and embed audits, integration and form monitoring, staging-first publishing discipline, uptime and Core Web Vitals monitoring, broken link repair, and monthly developer hours for content and design changes.' },
  { q: 'Does Webflow need the same kind of maintenance as WordPress?', a: 'No, and this is the most common misconception. Webflow hosts and patches its own platform, so there is no WordPress-style core/plugin vulnerability treadmill or malware risk from third-party plugins. What still needs ongoing attention is everything layered on top of the platform: CMS content accuracy as your site grows, custom code and embeds that can conflict with Webflow platform updates, third-party integrations that can silently fail, and disciplined staging review before publishing changes.' },
  { q: 'What is included in a Webflow maintenance plan?', a: 'Our Webflow maintenance plans include: CMS Collection content updates and structure changes; custom code and embed audits after Webflow platform updates; integration and form monitoring for tools like Zapier, HubSpot, and Memberstack; staging review before every non-trivial publish; broken link and 404 scanning; Core Web Vitals and uptime monitoring; monthly reports; and a pool of developer hours for content and design changes each month.' },
  { q: 'How much does Webflow maintenance cost?', a: 'Webflow Care, our entry plan for smaller marketing sites, starts from $99-$149/month. Webflow Growth, with integration monitoring, priority response, and 8 developer hours, runs $249-$499/month. Webflow Enterprise, with a dedicated engineer and multi-site management, is custom-priced. Every engagement starts with a free Webflow site audit so pricing reflects your actual site, not a generic tier.' },
  { q: 'Can you take over maintenance of a Webflow site another agency or freelancer built?', a: 'Yes. We start with a comprehensive Webflow audit - CMS Collection structure, custom code inventory, integration health, staging setup, and CMS editor access review - and send you a written report before the retainer begins. We operate on monthly rolling contracts with no lock-in and provide a clean handover document if you ever transition away.' },
  { q: 'Do you fix broken Webflow forms or third-party integrations?', a: 'Yes. Broken native Webflow forms, failed Zapier or Make automations, and disconnected integrations with tools like HubSpot, Mailchimp, or Memberstack are covered under our maintenance retainers. Growth and Enterprise plans include priority response specifically for these issues, since a silently broken lead-capture form or CRM sync can cost more than downtime.' },
  { q: 'How do you manage CMS Collection updates without breaking the live site?', a: 'Every non-trivial CMS or design change is made and reviewed on a Webflow staging domain first - checking for broken Collection bindings, layout regressions, and content display issues - before we publish to your live production site. This staging-first discipline is standard across all our maintenance plans.' },
  { q: 'What happens when Webflow releases a platform update?', a: 'We review your custom code embeds, Interactions, and third-party integrations against Webflow platform changes to catch any compatibility issues - deprecated APIs, changed default behaviors, or Interactions timing changes - before they surface as a visible bug on your live site.' },
  { q: 'Do you support Webflow Ecommerce and membership sites?', a: 'Yes. For Webflow Ecommerce sites we monitor product catalogue integrity, checkout flow, and payment gateway (Stripe/PayPal) functionality after related changes. For membership sites built with Memberstack or Outseta, we verify member access rules and gated content continue working correctly after CMS or design updates.' },
  { q: 'How often should a Webflow site be reviewed for broken links and SEO issues?', a: 'We run monthly crawls to catch broken internal links, 404s from renamed or deleted CMS entries, redirect chains, and missing or duplicate meta descriptions - repairing them within your monthly developer hours as part of every maintenance plan.' },
  { q: 'What is Core Web Vitals monitoring and why does it matter for Webflow sites?', a: 'Core Web Vitals - Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift - are Google ranking signals. Even though Webflow hosting is fast by default, heavy embedded images, uncompressed video backgrounds, or accumulating custom code can degrade these metrics over time. Our maintenance plans track them monthly via PageSpeed Insights and Search Console, resolving regressions within your developer hours.' },
  { q: 'Can you maintain a multi-site Webflow portfolio?', a: 'Yes, on our Enterprise plan. We maintain portfolios of Webflow sites for agencies, franchise groups, and multi-brand companies under a single retainer, with consolidated monthly reporting, one account manager, and consistent maintenance quality across every site.' },
  { q: 'What is the difference between Webflow support and Webflow maintenance?', a: 'Webflow maintenance is proactive - scheduled CMS updates, staging review, integration checks, and monitoring performed to prevent problems. Webflow support is reactive - help when something breaks, like a form failure or a design regression after an update. Our plans combine both: structured monthly maintenance that reduces the frequency of support events, plus included support when incidents do occur.' },
  { q: 'Do you provide a monthly Webflow maintenance report?', a: 'Yes. Every maintenance client receives a monthly report covering all content and design changes published, integration and form health checks, uptime statistics, Core Web Vitals trends, broken links found and repaired, developer hours used and remaining, and recommendations for the coming month. Growth and Enterprise clients also receive a monthly account manager call.' },
  { q: 'What is the SLA for Webflow support issues?', a: 'Enterprise: 2-hour initial response, custom coverage. Growth: 4-hour initial response during business hours, with same-day escalation for checkout or lead-capture form emergencies. Care: next-business-day response, with a priority escalation option available as a one-off add-on. All SLAs refer to initial response and triage.' },
  { q: 'Do I need a maintenance plan if my Webflow site rarely changes?', a: 'Even low-change sites benefit from monitoring - integrations can fail silently, Webflow platform updates can affect custom code without any content change on your end, and broken links accumulate as other sites you link to move or disappear. Our Webflow Care plan is built for exactly this kind of lower-touch site.' },
  { q: 'Can your team publish CMS content on our behalf?', a: 'Yes. Many clients on our Growth and Enterprise plans have us publish blog posts, case studies, and other CMS content directly, using their monthly developer hours, rather than training an internal team member to use the Webflow Editor.' },
  { q: 'What if a Webflow platform update breaks a custom animation or interaction?', a: 'We review Webflow Interactions and custom GSAP/JS embeds after major platform updates specifically to catch this. If something does break, we treat it as a priority fix within your plan\'s SLA, since animation and interaction bugs are highly visible to visitors.' },
  { q: 'Do you offer white-label Webflow maintenance for agencies?', a: 'Yes. We provide white-label Webflow maintenance for design and marketing agencies - maintaining client Webflow sites under your agency brand, with reports and communication white-labelled. Agencies typically consolidate multiple client sites under a single retainer with a custom per-site rate.' },
  { q: 'How do I get started with a Webflow maintenance plan?', a: 'Fill in our contact form with your Webflow site URL - we respond within one business day. We then carry out a free Webflow site audit and send a written report with our recommended plan. Once you approve, we complete secure workspace access onboarding and confirm your staging setup - your retainer typically begins within 2-3 business days of sign-off.' },
];

export default function WebflowMaintenanceServices() {
  const [showAllSvc, setShowAllSvc] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleSvcCards, setVisibleSvcCards] = useState([]);
  const [visibleEngCards, setVisibleEngCards] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleStackCards, setVisibleStackCards] = useState([]);
  const sectionRefs = useRef({});
  const svcGridRef = useRef(null);
  const engGridRef = useRef(null);
  const whyGridRef = useRef(null);
  const stackGridRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const pairs = [[svcGridRef, SERVICES.length, setVisibleSvcCards], [engGridRef, 3, setVisibleEngCards], [whyGridRef, WHY_CARDS.length, setVisibleWhyCards], [stackGridRef, TECH_STACK.length, setVisibleStackCards]];
    if (isMobile) {
      pairs.forEach(([, count, setter]) => setter(Array.from({ length: count }, (_, i) => i)));
      return;
    }
    const setup = () => {
      const observers = pairs.map(([ref, count, setter]) => {
        if (!ref.current) return null;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 80)); obs.disconnect(); } }, { threshold: 0.05 });
        obs.observe(ref.current);
        return obs;
      });
      return () => observers.forEach(o => o?.disconnect());
    };
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(setup, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    return setup();
  }, []);

  useEffect(() => {
    const setup = () => {
      const keys = Object.keys(sectionRefs.current);
      const observers = keys.map(key => {
        const el = sectionRefs.current[key];
        if (!el) return null;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.1 });
        obs.observe(el);
        return obs;
      });
      return () => observers.forEach(o => o?.disconnect());
    };
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(setup, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    return setup();
  }, []);

  const visibleServices = showAllSvc ? SERVICES : SERVICES.slice(0, 6);

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
          source: 'Webflow Maintenance Services', consent: true, recaptchaToken: token,
        }),
      });
      if (res.ok) { window.location.href = '/thank-you/'; } else { _setSfSt('error'); }
    } catch { _setSfSt('error'); }
  };

  return (
    <>
      <Head>
        <title>Webflow Maintenance Services | 1Solutions</title>
        <meta name="description" content="Webflow maintenance & support - CMS content updates, staging-first publishing, integration monitoring, Core Web Vitals tracking & priority support. Since 2010." />
        <link rel="canonical" href="https://www.1solutions.biz/webflow-maintenance-services/" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <meta property="og:title" content="Webflow Maintenance Services | Support & CMS Management | 1Solutions" />
        <meta property="og:description" content="Professional Webflow maintenance services - CMS Collection management, staging-first publishing, integration monitoring, Core Web Vitals tracking, and priority support." />
        <meta property="og:url" content="https://www.1solutions.biz/webflow-maintenance-services/" />
        <meta property="og:type" content="website" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta key="og-image-alt" property="og:image:alt" content="1Solutions Webflow Maintenance Services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Webflow Maintenance Services" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          html,body{overflow-x:hidden;max-width:100%}
          .wfm-page{font-family:inherit;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          @media(max-width:900px){.wfm-page{background:linear-gradient(160deg,#dbeafe 0%,#ede9fe 30%,#e0f2fe 55%,#fef3c7 78%,#fce7f3 100%) !important}}
          .wfm-page *,.wfm-page *::before,.wfm-page *::after{box-sizing:border-box}
          .wfm-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .wfm-orb-1{width:900px;height:900px;background:radial-gradient(circle,rgba(99,130,255,0.30) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);top:-300px;right:-300px}
          .wfm-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px}
          .wfm-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(99,102,241,.14) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .wfm-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .wfm-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .wfm-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .wfm-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .wfm-s-reveal.wfm-revealed{opacity:1;transform:translateY(0)}
          .wfm-inner{max-width:1300px;margin:0 auto}
          .wfm-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .wfm-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .wfm-svc-card{border:1px solid transparent;border-radius:18px;padding:26px 24px;position:relative;overflow:hidden;opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .25s}
          .wfm-svc-card.wfm-cv{opacity:1;transform:translateY(0)}
          .wfm-svc-card.wfm-cv:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(15,52,96,.14)}
          .wfm-svc-head{display:flex;align-items:center;gap:10px;margin-bottom:12px}
          .wfm-svc-icon{width:22px;height:22px;color:#0F1F40;flex-shrink:0}
          .wfm-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0;position:relative;z-index:1}
          .wfm-svc-card p{font-size:13px;color:#3A4A66;line-height:1.7;margin:0;position:relative;z-index:1}
          .wfm-svc-more{text-align:center;margin-top:22px}
          .wfm-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .wfm-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .wfm-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .wfm-stack-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .wfm-stack-card{background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .wfm-stack-card.wfm-sv{opacity:1;transform:translateY(0)}
          .wfm-stack-card.wfm-sv:hover{border-color:rgba(217,119,6,.40);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .wfm-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .wfm-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .wfm-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .wfm-eng-section{padding:80px 40px;position:relative;z-index:1}
          .wfm-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .wfm-eng-card{background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .wfm-eng-card.wfm-ev{opacity:1;transform:translateY(0)}
          .wfm-eng-card.wfm-ev:hover{border-color:rgba(217,119,6,.40);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .wfm-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .wfm-eng-card.feat.wfm-ev{transform:translateY(-8px)}
          .wfm-eng-card.feat.wfm-ev:hover{transform:translateY(-12px)}
          .wfm-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .wfm-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .wfm-eng-card.wfm-ev:hover .wfm-eng-icon{background:rgba(217,119,6,.10)}
          .wfm-eng-card.feat .wfm-eng-icon{background:rgba(217,119,6,.12)}
          .wfm-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .wfm-eng-card.wfm-ev:hover .wfm-eng-icon svg{fill:#D97706}
          .wfm-eng-card.feat .wfm-eng-icon svg{fill:#D97706}
          .wfm-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .wfm-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .wfm-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .wfm-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .wfm-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .wfm-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .wfm-eng-list li::before{content:'✓';font-weight:800;color:#D97706;flex-shrink:0;margin-top:1px}
          .wfm-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .wfm-eng-process strong{color:#0F3460}
          .wfm-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .wfm-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(217,119,6,.09);color:#D97706;border:1.5px solid rgba(217,119,6,.30)}
          .wfm-eng-cta:hover{background:#D97706;color:#fff;border-color:#D97706}
          .wfm-eng-card.feat .wfm-eng-cta{background:#D97706;color:#fff;border-color:#D97706}
          .wfm-eng-card.feat .wfm-eng-cta:hover{background:#b45309;border-color:#b45309}
          .wfm-process-section{background:#fff;border-top:1px solid rgba(15,52,96,.06);padding:90px 40px;position:relative;z-index:1}
          .wfm-process-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
          .wfm-psteps{display:flex;flex-direction:column}
          .wfm-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(15,52,96,.06);opacity:0;transform:translateX(-20px);transition:opacity .45s ease,transform .45s ease}
          .wfm-pstep:last-child{border-bottom:none}
          .wfm-pstep.wfm-pv{opacity:1;transform:translateX(0)}
          .wfm-pstep-num{font-size:2.8rem;font-weight:900;color:rgba(15,52,96,.12);line-height:1;letter-spacing:-2px}
          .wfm-pstep-title{font-size:1.05rem;font-weight:800;color:#0F1F40;margin:0 0 6px}
          .wfm-pstep-desc{font-size:.88rem;color:#4A6080;line-height:1.7;margin:0}
          .wfm-process-image-col{position:sticky;top:100px}
          .wfm-process-image-col img{width:100%;border-radius:20px;box-shadow:0 24px 72px rgba(15,52,96,.12);display:block}
          .wfm-testi{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 0;position:relative;z-index:1;overflow:hidden}
          .wfm-testi .wfm-inner{padding:0 40px}
          .wfm-center-head{text-align:center;margin-bottom:44px}
          .wfm-testi-marquee-outer{position:relative}
          .wfm-testi-marquee-wrap{overflow:hidden;margin-bottom:20px}
          .wfm-testi-marquee-wrap:last-child{margin-bottom:0}
          .wfm-testi-track{display:flex;gap:20px;width:max-content;animation:wfmTestiScroll 32s linear infinite}
          .wfm-testi-track--rev{animation-name:wfmTestiScrollRev}
          .wfm-testi-marquee-wrap:hover .wfm-testi-track{animation-play-state:paused}
          @keyframes wfmTestiScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
          @keyframes wfmTestiScrollRev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
          @media(prefers-reduced-motion:reduce){.wfm-testi-track{animation:none !important}}
          .wfm-testi-fade{position:absolute;top:0;bottom:0;width:120px;z-index:1;pointer-events:none}
          .wfm-testi-fade--l{left:0;background:linear-gradient(to right,#f8fafd,transparent)}
          .wfm-testi-fade--r{right:0;background:linear-gradient(to left,#f8fafd,transparent)}
          @media(max-width:600px){.wfm-testi-fade{width:48px}}
          .wfm-tcard{width:400px;flex-shrink:0;user-select:none;background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .wfm-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.42) 100%);border-color:rgba(217,119,6,.22)}
          .wfm-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .wfm-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .wfm-tauthor{display:flex;align-items:center;gap:12px}
          .wfm-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .wfm-tname{font-size:14px;font-weight:700;color:#0F3460}
          .wfm-trole{font-size:12px;color:#6b7280}
          .wfm-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .wfm-why-badge{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:#7c3aed;background:rgba(168,85,247,.10);border:1px solid rgba(168,85,247,.24);border-radius:999px;padding:6px 16px 6px 12px;margin-bottom:20px}
          .wfm-why-dot{width:8px;height:8px;border-radius:50%;background:#a855f7;flex-shrink:0}
          .wfm-why-header{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
          .wfm-why-heading{font-size:38px;font-weight:900;line-height:1.15;letter-spacing:-.8px;color:#0F1F40;margin:0}
          .wfm-why-lede{font-size:17px;color:#374151;line-height:1.6;margin:8px 0 0}
          .wfm-why-divider{height:1px;background:rgba(15,52,96,.12);margin:40px 0 0}
          .wfm-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px 40px;margin-top:44px}
          .wfm-wcard{background:transparent;border:none;border-radius:0;padding:0;box-shadow:none;opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1)}
          .wfm-wcard.wfm-wv{opacity:1;transform:translateY(0) scale(1)}
          .wfm-wcard.wfm-wv:hover .wfm-wcard-icon{transform:translateY(-3px)}
          .wfm-wcard-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;box-shadow:0 8px 20px rgba(15,52,96,.18);transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .wfm-wcard-icon svg{width:24px;height:24px;fill:#fff}
          .wfm-wcard h3{font-size:17px;font-weight:700;color:#0F1F40;margin:0 0 14px;line-height:1.35}
          .wfm-wcard-rule{height:1px;background:rgba(15,52,96,.12);margin:0 0 14px}
          .wfm-wcard p{font-size:14px;color:#4A6080;line-height:1.7;margin:0}
          .wfm-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,.65) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .wfm-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .wfm-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .wfm-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .wfm-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .wfm-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .wfm-cbenefit-icon-wrap{width:38px;height:38px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
          .wfm-cbenefit-icon{width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75}
          .wfm-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .wfm-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(219,234,254,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .wfm-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .wfm-form{display:flex;flex-direction:column;gap:13px}
          .wfm-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .wfm-fg{display:flex;flex-direction:column;gap:5px}
          .wfm-fg.full{grid-column:1/-1}
          .wfm-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .wfm-fg input,.wfm-fg textarea,.wfm-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .wfm-fg input:focus,.wfm-fg textarea:focus,.wfm-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,.90);box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .wfm-consent{display:flex;gap:8px;align-items:flex-start}
          .wfm-consent input{margin-top:3px;width:15px;height:15px}
          .wfm-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .wfm-consent a{color:#0F3460}
          .wfm-submit{width:100%;padding:14px;background:rgba(15,52,96,.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.30);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(15,52,96,.25),inset 0 1px 0 rgba(255,255,255,.15)}
          .wfm-submit:hover{background:rgba(15,52,96,.95);border-color:rgba(245,158,11,.60);transform:translateY(-2px)}
          .wfm-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .wfm-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 8px}
          .wfm-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .wfm-faq-list{display:flex;flex-direction:column;gap:10px}
          .wfm-fitem{background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s;position:relative}
          .wfm-fitem.open{border-color:rgba(217,119,6,.40);box-shadow:0 8px 32px rgba(15,52,96,.12),inset 0 1px 0 rgba(255,255,255,1)}
          .wfm-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px}
          .wfm-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .wfm-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .wfm-fitem.open .wfm-fq-badge{background:#D97706;color:#fff}
          .wfm-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .wfm-fitem.open .wfm-fq span{color:#D97706}
          .wfm-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .wfm-fitem.open .wfm-fchev{transform:rotate(180deg);color:#D97706}
          .wfm-fanswer-wrap{overflow:hidden;transition:max-height .4s ease;max-height:0}
          .wfm-fitem.open .wfm-fanswer-wrap{max-height:600px}
          .wfm-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .wfm-related{padding:80px 40px;background:rgba(219,234,254,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .wfm-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .wfm-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .wfm-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .wfm-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .wfm-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .wfm-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .wfm-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .wfm-rtag-blue{background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8}
          .wfm-rtag-violet{background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9}
          .wfm-rtag-amber{background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309}
          .wfm-rtag-teal{background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E}
          .wfm-rtag-green{background:rgba(17,65,113,.09);border-color:rgba(17,65,113,.28);color:#114171}
          .wfm-rtag-rose{background:rgba(225,29,72,.09);border-color:rgba(225,29,72,.28);color:#9f1239}
          .wfm-what-section{background:#fff;padding:76px 40px 20px;position:relative;z-index:1}
          .wfm-what-inner{max-width:1300px;margin:0 auto}
          .wfm-what-head{text-align:center;max-width:760px;margin:0 auto}
          .wfm-what-head .wfm-s-desc{margin:0 auto}
          .wfm-what-box{margin-top:36px;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:44px 44px 40px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,.95)}
          .wfm-what-intro{font-size:16px;color:#374151;line-height:1.8;margin:0 0 28px;padding-bottom:28px;border-bottom:1px solid rgba(15,52,96,.10)}
          .wfm-what-intro strong{color:#0F3460}
          .wfm-what-aspects{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .wfm-what-aspect{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);border:1px solid rgba(15,52,96,.10);border-radius:16px;padding:22px;transition:border-color .2s,transform .2s}
          .wfm-what-aspect:hover{border-color:rgba(217,119,6,.40);transform:translateY(-3px)}
          .wfm-what-aspect-t{font-weight:700;color:#0F3460;font-size:14px;margin-bottom:8px}
          .wfm-what-aspect-d{font-size:13px;color:#4A6080;line-height:1.65}
          .wfm-cmp-section{background:transparent;padding:72px 40px;position:relative;z-index:1}
          .wfm-cmp-table{width:100%;border-collapse:collapse;margin-top:32px;font-size:14px}
          .wfm-cmp-table th{background:#114171;color:#fff;padding:14px 18px;text-align:left;font-weight:700;font-size:13px}
          .wfm-cmp-table th:first-child{border-radius:10px 0 0 0}
          .wfm-cmp-table th:last-child{border-radius:0 10px 0 0}
          .wfm-cmp-table td{padding:12px 18px;border-bottom:1px solid rgba(17,65,113,.08);color:#374151;vertical-align:top}
          .wfm-cmp-table tr:nth-child(even) td{background:rgba(219,234,254,.40)}
          .wfm-cmp-table td:first-child{font-weight:600;color:#0F1F40}
          .wfm-cmp-check{color:#114171;font-weight:800}
          .wfm-cmp-dash{color:#9ca3af}
          @media(max-width:1280px){.wfm-stack-grid{grid-template-columns:repeat(3,1fr)}}
          @media(max-width:1024px){.wfm-page{overflow-x:hidden}.wfm-s-title{font-size:34px;letter-spacing:-.5px}.wfm-faq h2{font-size:34px}.wfm-ctitle{font-size:34px}.wfm-svc-grid{grid-template-columns:repeat(2,1fr)}.wfm-stack-grid{grid-template-columns:repeat(2,1fr)}.wfm-eng-grid{grid-template-columns:1fr;max-width:520px;margin-left:auto;margin-right:auto}.wfm-eng-card.feat{transform:none}.wfm-eng-card.feat.wfm-ev{transform:none}.wfm-eng-card.feat.wfm-ev:hover{transform:translateY(-4px)}.wfm-why-header{grid-template-columns:1fr;gap:20px}.wfm-why-heading{font-size:30px}.wfm-why-grid{grid-template-columns:repeat(2,1fr)}.wfm-contact-grid{grid-template-columns:1fr}.wfm-cmp-table{font-size:13px}.wfm-what-aspects{grid-template-columns:repeat(2,1fr)}.wfm-process-inner{grid-template-columns:1fr}.wfm-process-image-col{display:none}}
          @media(max-width:768px){.wfm-svc-section,.wfm-stack-section,.wfm-eng-section,.wfm-process-section,.wfm-testi,.wfm-why-section,.wfm-faq,.wfm-related,.wfm-what-section,.wfm-cmp-section{padding:52px 20px}.wfm-contact{padding:44px 20px}.wfm-s-title{font-size:26px;letter-spacing:-.4px}.wfm-s-eyebrow{font-size:10px}.wfm-s-desc{font-size:14px}.wfm-ctitle{font-size:26px}.wfm-faq h2{font-size:26px}.wfm-faq-sub{font-size:13px}.wfm-svc-grid{grid-template-columns:1fr}.wfm-stack-grid{grid-template-columns:repeat(2,1fr);gap:12px}.wfm-eng-grid{max-width:100%}.wfm-why-heading{font-size:24px}.wfm-why-lede{font-size:15px}.wfm-why-grid{grid-template-columns:repeat(2,1fr);gap:24px 16px}.wfm-what-box{padding:26px 22px}.wfm-what-aspects{grid-template-columns:1fr;gap:14px}.wfm-cmp-section .wfm-inner{overflow-x:auto;-webkit-overflow-scrolling:touch;width:100%}.wfm-cmp-table{min-width:540px;font-size:12px}.wfm-cmp-table th,.wfm-cmp-table td{padding:10px 12px}.wfm-pstep-title{font-size:17px}.wfm-pstep-desc{font-size:14px}.wfm-frow{grid-template-columns:1fr}.wfm-form-box{padding:24px 20px}.wfm-contact-grid{gap:28px}.wfm-fq{padding:16px 16px 16px 50px}.wfm-fq-badge{left:12px;width:24px;height:24px;font-size:10px}.wfm-fq span{font-size:14px}.wfm-fanswer{padding:0 16px 16px 50px;font-size:13px}.wfm-rtag{padding:8px 14px;font-size:13px}}
          @media(max-width:480px){.wfm-s-title{font-size:20px}.wfm-faq h2{font-size:20px}.wfm-ctitle{font-size:20px}.wfm-stack-grid{grid-template-columns:1fr}.wfm-why-heading{font-size:21px}.wfm-why-grid{grid-template-columns:1fr;gap:24px}.wfm-svc-card h3{font-size:15px}.wfm-svc-card p{font-size:12px}.wfm-eng-card{padding:24px 20px}.wfm-pstep{grid-template-columns:40px 1fr;gap:0 14px;padding:20px 0}.wfm-pstep-num{font-size:2rem}.wfm-pstep-title{font-size:16px}.wfm-pstep-desc{font-size:13px}.wfm-fq{padding:14px 14px 14px 46px}.wfm-fq-badge{left:10px;width:22px;height:22px;font-size:9px}.wfm-fq span{font-size:13px}.wfm-fanswer{padding:0 14px 14px 46px;font-size:12px}.wfm-form-box{padding:18px 14px}.wfm-form-box h3{font-size:18px}.wfm-wcard h3{font-size:15px}.wfm-wcard p{font-size:13px}}
          @media(max-width:360px){.wfm-s-title{font-size:18px}.wfm-faq h2{font-size:18px}.wfm-ctitle{font-size:18px}.wfm-pstep{grid-template-columns:36px 1fr;gap:0 10px}.wfm-pstep-num{font-size:1.7rem}}
          @media(max-width:1024px){.wfm-orb{display:none}}
          @media(max-width:1024px){.wfm-svc-card,.wfm-stack-card,.wfm-eng-card,.wfm-tcard,.wfm-wcard,.wfm-contact,.wfm-cbenefits,.wfm-form-box,.wfm-submit,.wfm-fitem,.wfm-related{backdrop-filter:none !important;-webkit-backdrop-filter:none !important}}
          @media(max-width:768px){.wfm-page{background:linear-gradient(160deg,#dbeafe 0%,#e8f0fb 100%) !important}.wfm-svc-card,.wfm-stack-card,.wfm-eng-card,.wfm-tcard,.wfm-wcard,.wfm-fitem{background:rgba(255,255,255,.95);box-shadow:0 2px 8px rgba(15,52,96,.08)}.wfm-form-box{background:rgba(255,255,255,.97)}.wfm-cbenefits{background:rgba(255,255,255,.94)}.wfm-s-reveal,.wfm-svc-card,.wfm-stack-card,.wfm-eng-card,.wfm-tcard,.wfm-wcard,.wfm-pstep{opacity:1 !important;transform:none !important;transition:none !important}}
          @media(prefers-reduced-motion:reduce){.wfm-s-reveal,.wfm-svc-card,.wfm-stack-card,.wfm-eng-card,.wfm-tcard,.wfm-wcard,.wfm-pstep{opacity:1 !important;transform:none !important;transition:none !important}}
        `}
        </style>
      </Head>

      <div className="wfm-page">
        <div className="wfm-orb wfm-orb-1" /><div className="wfm-orb wfm-orb-2" /><div className="wfm-orb wfm-orb-3" />

        <ServiceHero
          eyebrow="Webflow Maintenance & Support Services"
          title={<>Webflow Website <AuroraText>Maintenance Services</AuroraText> That Keep Your Site Performing</>}
          subtext="Keep your Webflow website fast, reliable and up to date with ongoing maintenance, content updates, technical fixes, integrations, performance optimisation and responsive support."
          primaryCta={{ label: 'Get a Webflow Maintenance Plan', href: '#contact' }}
          secondaryCta={{ label: 'View Plans', href: '#plans' }}
          showLogos={false}
        />

        <section className="wfm-what-section" aria-labelledby="wfm-what-heading">
          <div className="wfm-what-inner">
            <div className="wfm-what-head">
              <span className="wfm-s-eyebrow">Understanding Webflow Maintenance</span>
              <h2 id="wfm-what-heading" className="wfm-s-title">What Is Webflow Maintenance?</h2>
              <p className="wfm-s-desc">Webflow maintenance is the ongoing process of keeping a live Webflow site accurate, fast, and working correctly after launch. Here&apos;s what that actually covers, and why it still matters even though Webflow hosts and secures its own platform.</p>
            </div>
            <div className="wfm-what-box">
              <p className="wfm-what-intro"><strong>Webflow maintenance</strong> is everything that keeps a live Webflow site healthy after launch. Unlike WordPress, Webflow patches and secures its own hosting infrastructure, so there is no core-software or plugin-vulnerability treadmill to manage - but that does not mean a site runs itself indefinitely. CMS content grows, custom code and embeds accumulate, third-party integrations change on their own schedules, and every change carries some risk of a regression reaching your live site without a staging-first process in place. A managed Webflow maintenance plan handles all of that so your team never has to worry about it.</p>
              <div className="wfm-what-aspects">
                {[
                  { t: 'CMS Content Management', d: 'Collection entries, field updates, and structure changes as your site grows, published through a staging review step first.' },
                  { t: 'Custom Code & Integration Health', d: 'Custom code, embeds, and Interactions audited after every Webflow platform update; tools like Zapier, HubSpot, and Memberstack monitored for silent failures.' },
                  { t: 'Staging-First Publishing', d: 'Every non-trivial change is reviewed on a staging domain before going live, catching layout breaks and broken Collection bindings before your visitors do.' },
                  { t: 'Uptime & Performance Monitoring', d: '24/7 uptime monitoring with instant alerts, plus Core Web Vitals and PageSpeed tracking with monthly benchmarked reports.' },
                  { t: 'Broken Link & SEO Upkeep', d: 'Monthly crawls catch broken links, 404s from renamed Collection entries, and missing redirects before they cost you rankings.' },
                  { t: 'Monthly Developer Hours', d: 'A pool of developer hours each month for content updates, minor design changes, and fixes - no need to hire in-house.' },
                ].map(a => (
                  <div key={a.t} className="wfm-what-aspect">
                    <div className="wfm-what-aspect-t">{a.t}</div>
                    <div className="wfm-what-aspect-d">{a.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="wfm-svc-section" aria-labelledby="wfm-svc-heading">
          <div className="wfm-inner">
            <div className={`wfm-s-reveal${visibleSections.has('svc') ? ' wfm-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="wfm-s-eyebrow">What Do We Do In Webflow Maintenance?</span>
              <h2 id="wfm-svc-heading" className="wfm-s-title">What Our Webflow Maintenance Covers</h2>
              <p className="wfm-s-desc" style={{ maxWidth: 720 }}>From content updates and design enhancements, through CMS management, custom code maintenance, and 3rd-party integrations, to performance monitoring and Webflow platform compatibility.</p>
            </div>
            <div className="wfm-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => {
                const c = SVC_COLORS[i % SVC_COLORS.length];
                return (
                  <div
                    key={s.n}
                    className={`wfm-svc-card${visibleSvcCards.includes(i) ? ' wfm-cv' : ''}`}
                    style={{ transitionDelay: `${i * 55}ms`, background: c.bg, borderColor: c.border }}
                  >
                    <div className="wfm-svc-head">
                      <svg className="wfm-svc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                      <h3>{s.title}</h3>
                    </div>
                    <p>{s.desc}</p>
                  </div>
                );
              })}
            </div>
            {SERVICES.length > 6 && (
              <div className="wfm-svc-more">
                <button className="wfm-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="wfm-stack-section" aria-labelledby="wfm-stack-heading">
          <div className="wfm-inner">
            <div className={`wfm-s-reveal${visibleSections.has('stk') ? ' wfm-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="wfm-s-eyebrow">Tools & Stack</span>
              <h2 id="wfm-stack-heading" className="wfm-s-title">Webflow Maintenance Stack</h2>
              <p className="wfm-s-desc" style={{ maxWidth: 680 }}>Webflow CMS and Interactions, connected integrations like Zapier and HubSpot, GSAP animation upkeep, Webflow Ecommerce and payments, and uptime/Core Web Vitals monitoring tools.</p>
            </div>
            <div className="wfm-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`wfm-stack-card${visibleStackCards.includes(i) ? ' wfm-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="wfm-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="wfm-stack-pills">
                    {grp.items.map(item => <span key={item} className="wfm-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="plans" className="wfm-eng-section" aria-labelledby="wfm-eng-heading">
          <div className="wfm-inner">
            <div className={`wfm-s-reveal${visibleSections.has('eng') ? ' wfm-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="wfm-s-eyebrow">Webflow Maintenance Plans</span>
              <h2 id="wfm-eng-heading" className="wfm-s-title">Our Webflow Maintenance Plans</h2>
              <p className="wfm-s-desc" style={{ maxWidth: 680 }}>From a Care plan for smaller marketing sites to a Growth plan with integration monitoring and priority response, to an Enterprise plan with a dedicated Webflow engineer and 2-hour SLA.</p>
            </div>
            <div className="wfm-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`wfm-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' wfm-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="wfm-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="wfm-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="wfm-eng-name">{m.name}</div>
                  <div className="wfm-eng-headline">{m.headline}</div>
                  <div className="wfm-eng-desc">{m.desc}</div>
                  <div className="wfm-eng-list-label">Best for</div>
                  <ul className="wfm-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="wfm-eng-process"><strong>Process:</strong> {m.process}<br /><span className="wfm-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="wfm-eng-cta">Get a maintenance quote →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wfm-cmp-section" aria-label="Webflow Maintenance Plan Comparison">
          <div className="wfm-inner">
            <div className="wfm-center-head">
              <span className="wfm-s-eyebrow">Plan Comparison</span>
              <h2 className="wfm-s-title">Webflow Maintenance Plans at a Glance</h2>
              <p className="wfm-s-desc">Compare what is included in each Webflow care plan to find the right level of support for your business.</p>
            </div>
            <table className="wfm-cmp-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Care</th>
                  <th>Growth</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['CMS Collection updates (staging-first)', '✓', '✓', '✓'],
                  ['24/7 uptime monitoring', '✓', '✓', '✓'],
                  ['Broken link & 404 monitoring', '✓', '✓', '✓'],
                  ['Monthly maintenance report', '✓', '✓', '✓'],
                  ['Monthly developer hours', '4 hrs', '8 hrs', '20 hrs'],
                  ['Support response SLA', 'Next day', '4-hour', '2-hour'],
                  ['Integration & form monitoring', '-', '✓', '✓'],
                  ['Custom code audits after platform updates', '-', '✓', '✓'],
                  ['Core Web Vitals monitoring', '-', '✓', '✓'],
                  ['Dedicated account manager', '-', '✓', '✓'],
                  ['Monthly account call', '-', '✓', '✓'],
                  ['Multi-site management', '-', '-', '✓'],
                  ['Dedicated Webflow engineer', '-', '-', '✓'],
                  ['Quarterly strategy calls', '-', '-', '✓'],
                ].map(([feat, ess, pro, ent]) => (
                  <tr key={feat}>
                    <td>{feat}</td>
                    {[ess, pro, ent].map((v, i) => (
                      <td key={i} className={v === '✓' ? 'wfm-cmp-check' : v === '-' ? 'wfm-cmp-dash' : ''}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="wfm-process-section" id="process" aria-labelledby="wfm-proc-heading">
          <div className="wfm-process-inner">
            <div className="wfm-psteps">
              <div className={`wfm-s-reveal${visibleSections.has('proc') ? ' wfm-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
                <span className="wfm-s-eyebrow">How We Maintain Your Webflow Site</span>
                <h2 id="wfm-proc-heading" className="wfm-s-title">Our Webflow Maintenance Process</h2>
              </div>
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`wfm-pstep${visibleSections.has('proc') ? ' wfm-pv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="wfm-pstep-num">{step.num}</span>
                  <div>
                    <h3 className="wfm-pstep-title">{step.title}</h3>
                    <p className="wfm-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="wfm-process-image-col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/webflow-maintenance-services.jpg" alt="1Solutions Webflow maintenance dashboard overview" />
            </div>
          </div>
        </section>

        <section className="wfm-testi" aria-labelledby="wfm-ts-heading">
          <div className="wfm-inner">
            <div className={`wfm-center-head wfm-s-reveal${visibleSections.has('ts') ? ' wfm-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="wfm-s-eyebrow">Client Results</span>
              <h2 id="wfm-ts-heading" className="wfm-s-title">What Our Webflow Maintenance Clients Say</h2>
              <p className="wfm-s-desc">Trusted by SaaS companies, professional services firms, and D2C brands worldwide who rely on us to keep their Webflow sites accurate, fast, and running.</p>
            </div>
          </div>

          <div className="wfm-testi-marquee-outer">
            <div className="wfm-testi-fade wfm-testi-fade--l" />
            <div className="wfm-testi-fade wfm-testi-fade--r" />

            <div className="wfm-testi-marquee-wrap">
              <div className="wfm-testi-track">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                  <div key={`row1-${t.name}-${i}`} className={`wfm-tcard${t.feat ? ' feat' : ''}`}>
                    <div className="wfm-stars" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="wfm-ttext">{t.text}</p>
                    <div className="wfm-tauthor">
                      <div className="wfm-tavatar" style={{ background: t.bg }}>{t.init}</div>
                      <div><div className="wfm-tname">{t.name}</div><div className="wfm-trole">{t.role}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="wfm-testi-marquee-wrap">
              <div className="wfm-testi-track wfm-testi-track--rev">
                {[...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2].map((t, i) => (
                  <div key={`row2-${t.name}-${i}`} className={`wfm-tcard${t.feat ? ' feat' : ''}`}>
                    <div className="wfm-stars" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="wfm-ttext">{t.text}</p>
                    <div className="wfm-tauthor">
                      <div className="wfm-tavatar" style={{ background: t.bg }}>{t.init}</div>
                      <div><div className="wfm-tname">{t.name}</div><div className="wfm-trole">{t.role}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="wfm-why-section" aria-labelledby="wfm-wy-heading">
          <div className="wfm-inner">
            <div className={`wfm-s-reveal${visibleSections.has('wy') ? ' wfm-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <div className="wfm-why-badge"><span className="wfm-why-dot" />Why Choose Us</div>
              <div className="wfm-why-header">
                <h2 id="wfm-wy-heading" className="wfm-why-heading">Why Companies Pick 1Solutions for Webflow Maintenance</h2>
                <p className="wfm-why-lede">Our Webflow maintenance agency delivers expert support, transparent pricing, and fast turnaround - with experienced developers handling everything from CMS updates to SEO and integrations.</p>
              </div>
            </div>
            <div className="wfm-why-divider" />
            <div className="wfm-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`wfm-wcard${visibleWhyCards.includes(i) ? ' wfm-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="wfm-wcard-icon" style={{ background: c.iconBg }}>
                    <svg viewBox="0 0 24 24"><path d={c.path} /></svg>
                  </div>
                  <h3>{c.title}</h3>
                  <div className="wfm-wcard-rule" />
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="wfm-contact" aria-labelledby="wfm-contact-heading">
          <div className="wfm-contact-grid">
            <div>
              <h2 id="wfm-contact-heading" className="wfm-ctitle">Start Your Webflow Maintenance Plan</h2>
              <p className="wfm-cdesc">Tell us about your Webflow site and we will recommend the right plan and send a quote. We start every new engagement with a free Webflow site audit - CMS structure, custom code review, integration health, and performance baseline - before the retainer begins.</p>
              <div className="wfm-cbenefits">
                {['Free Webflow site audit before the retainer starts', 'All content and design changes reviewed on staging before going live', 'Integration and form monitoring included in Growth plans', 'Priority support and emergency response covered in Growth & Enterprise', 'Monthly rolling - no 12-month lock-in contracts'].map(text => (
                  <div className="wfm-cbenefit" key={text}>
                    <div className="wfm-cbenefit-icon-wrap">
                      <svg className="wfm-cbenefit-icon" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.75"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="wfm-form-box">
              <h3>Tell Us About Your Webflow Site</h3>
              <form className="wfm-form" onSubmit={_sfSubmit}>
                <div className="wfm-frow">
                  <div className="wfm-fg"><label htmlFor="wfm-name">Full Name *</label><input name="sf-name" id="wfm-name" type="text" placeholder="Your name" required /></div>
                  <div className="wfm-fg"><label htmlFor="wfm-email">Work Email *</label><input id="wfm-email" type="email" name="sf-email" placeholder="you@company.com" required /></div>
                </div>
                <div className="wfm-frow">
                  <div className="wfm-fg"><label htmlFor="wfm-url">Webflow Site URL *</label><input id="wfm-url" type="url" placeholder="https://yoursite.com" required /></div>
                  <div className="wfm-fg"><label htmlFor="wfm-phone">Phone / WhatsApp *</label><input id="wfm-phone" type="tel" name="sf-phone" placeholder="+1 555 000 0000" required /></div>
                </div>
                <div className="wfm-fg full">
                  <label htmlFor="wfm-type">Site Type *</label>
                  <select id="wfm-type" required>
                    <option value="">Select site type...</option>
                    <option>Webflow Marketing / Brochure Site</option>
                    <option>Webflow Blog / Content Site</option>
                    <option>Webflow Ecommerce Store</option>
                    <option>Webflow Membership Site</option>
                    <option>Multi-Site Webflow Portfolio</option>
                    <option>Webflow with Custom Code</option>
                    <option>Other Webflow</option>
                  </select>
                </div>
                <div className="wfm-fg full">
                  <label htmlFor="wfm-plan">Plan Interest</label>
                  <select id="wfm-plan">
                    <option value="">Not sure - recommend one for me</option>
                    <option>Webflow Care (small site)</option>
                    <option>Webflow Growth (priority support)</option>
                    <option>Webflow Enterprise (dedicated engineer)</option>
                    <option>Emergency / one-off issue</option>
                  </select>
                </div>
                <div className="wfm-fg full">
                  <label htmlFor="wfm-msg">Any Current Issues or Context</label>
                  <textarea name="sf-message" id="wfm-msg" rows={3} placeholder="Describe your site - who built it, how often you update CMS content, any integrations in use, and what you most need from a maintenance plan..." />
                </div>
                <div className="wfm-consent">
                  <input id="wfm-consent" type="checkbox" required />
                  <label htmlFor="wfm-consent">I agree to the <Link href="/privacy-policy/">Privacy Policy</Link>. We treat all details confidentially.</label>
                </div>
                <button type="submit" className="wfm-submit">Get Free Webflow Audit & Quote →</button>
                {_sfSt === 'success' && <div style={{ marginTop: '12px', padding: '12px 16px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', color: '#166534', fontSize: '0.875rem', fontWeight: 500 }}>&#10003; Message sent! We&apos;ll get back to you within 24 hours.</div>}{_sfSt === 'error' && <div style={{ marginTop: '12px', padding: '12px 16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#991b1b', fontSize: '0.875rem', fontWeight: 500 }}>Something went wrong. Please email info@1solutions.biz</div>}
              </form>
            </div>
          </div>
        </section>

        <section className="wfm-faq" aria-labelledby="wfm-faq-heading">
          <div className="wfm-inner" style={{ maxWidth: 860 }}>
            <span className="wfm-s-eyebrow">FAQ</span>
            <h2 id="wfm-faq-heading">Webflow Maintenance - Frequently Asked Questions</h2>
            <p className="wfm-faq-sub">Everything you need to know about Webflow maintenance with 1Solutions - what is covered, how staging works, integration monitoring, pricing, and how to switch from another agency or freelancer.</p>
            <div className="wfm-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`wfm-fitem${openFaq === i ? ' open' : ''}`}>
                  <button className="wfm-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="wfm-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span>{item.q}</span>
                    <svg className="wfm-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="wfm-fanswer-wrap">
                    <div className="wfm-fanswer">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wfm-related">
          <div className="wfm-related-inner">
            <span className="wfm-s-eyebrow">Explore More</span>
            <h2>Related Webflow & Web Services</h2>
            <p className="wfm-related-sub">Need a new Webflow site built first, or want to see how we approach Webflow projects? Explore our related services and resources.</p>
            <hr />
            <div className="wfm-rtags">
              {[
                ['/webflow-development-services/', 'Webflow Development Services', 'wfm-rtag-blue'],
                ['https://www.1solutions.biz/10-best-webflow-website-development-companies-in-india', '10 Best Webflow Companies in India (Blog)', 'wfm-rtag-amber'],
                ['/website-design/', 'Website Design', 'wfm-rtag-violet'],
                ['/wordpress-development-company/', 'WordPress Development', 'wfm-rtag-teal'],
                ['/shopify-store-development/', 'Shopify Development', 'wfm-rtag-teal'],
                ['/seo-services-company/', 'SEO Services', 'wfm-rtag-green'],
                ['/digital-marketing-services/', 'Digital Marketing', 'wfm-rtag-rose'],
                ['/wordpress-support-and-maintenance-services/', 'WordPress Support & Maintenance', 'wfm-rtag-blue'],
              ].map(([href, label, cls]) => (
                href.startsWith('http')
                  ? <a key={href} href={href} className={`wfm-rtag ${cls}`}>{label}</a>
                  : <Link key={href} href={href} className={`wfm-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
