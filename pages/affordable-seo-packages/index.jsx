import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';

/* ─── Structured Data ──────────────────────────────────────────────── */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.1solutions.biz/affordable-seo-packages/#webpage',
      url: 'https://www.1solutions.biz/affordable-seo-packages/',
      name: 'Monthly SEO Packages | Prices from $299/mo | 1Solutions',
      description: 'Affordable monthly SEO packages starting at $299/month. White-hat only. No contracts. 15+ years, 500+ clients, 97% retention.',
      breadcrumb: { '@id': 'https://www.1solutions.biz/affordable-seo-packages/#breadcrumb' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.1solutions.biz/affordable-seo-packages/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Affordable SEO Packages', item: 'https://www.1solutions.biz/affordable-seo-packages/' },
      ],
    },
    {
      '@type': 'ProfessionalService',
      name: 'Monthly SEO Packages',
      url: 'https://www.1solutions.biz/affordable-seo-packages/',
      description: 'Affordable monthly SEO packages starting at $299/month. Includes on-page optimisation, technical SEO, link building, content writing, local SEO, and monthly reporting. No contracts. White-hat only.',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
        bestRating: '5',
        worstRating: '1',
      },
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2010',
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
        sameAs: [
          'https://www.linkedin.com/company/1solutions',
          'https://twitter.com/1solutionsbiz',
          'https://www.facebook.com/1solutionsbiz',
        ],
      },
      areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      offers: [
        {
          '@type': 'Offer',
          name: 'Starter SEO Package',
          price: '299',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '299', priceCurrency: 'USD', unitText: 'MON' },
          description: 'Small business monthly SEO package - up to 10 keywords, 10-page on-page optimisation, 5–8 monthly backlinks, 2 blog articles, technical SEO, local SEO, and monthly reporting.',
          url: 'https://www.1solutions.biz/affordable-seo-packages/',
        },
        {
          '@type': 'Offer',
          name: 'Professional SEO Package',
          price: '599',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '599', priceCurrency: 'USD', unitText: 'MON' },
          description: 'Professional monthly SEO package - up to 25 keywords, 25-page optimisation, 15–20 monthly backlinks, 4 blog articles, schema markup, competitor analysis, and monthly reporting.',
          url: 'https://www.1solutions.biz/affordable-seo-packages/',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise SEO Package',
          price: '999',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '999', priceCurrency: 'USD', unitText: 'MON' },
          description: 'Enterprise monthly SEO package - up to 60 keywords, unlimited pages, 35–50 monthly backlinks, 8 blog articles, dedicated account manager, and monthly reporting.',
          url: 'https://www.1solutions.biz/affordable-seo-packages/',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise AI+ SEO Package',
          price: '1999',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '1999', priceCurrency: 'USD', unitText: 'MON' },
          description: 'Enterprise AI+ monthly SEO package - unlimited keywords and pages, 60–80 monthly backlinks, 12 blog articles, AI Overview / GEO optimisation, LLM citation building, dedicated AI+GEO strategist, and monthly reporting.',
          url: 'https://www.1solutions.biz/affordable-seo-packages/',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much do monthly SEO packages cost?', acceptedAnswer: { '@type': 'Answer', text: 'Monthly SEO packages from 1Solutions start at $299/month for the Starter plan (up to 10 keywords), $599/month for the Professional plan (up to 25 keywords), $999/month for the Enterprise plan (up to 60 keywords), and $1,999/month for the Enterprise AI+ plan (unlimited keywords plus AI Overview and GEO optimisation). Annual billing saves 20%. There are no setup fees and no long-term contracts.' } },
        { '@type': 'Question', name: 'What is included in a monthly SEO package?', acceptedAnswer: { '@type': 'Answer', text: 'A monthly SEO package from 1Solutions includes: keyword research and tracking, on-page optimisation, technical SEO (Core Web Vitals, crawlability, site speed), manual link building, SEO content writing, local SEO and Google Business Profile optimisation, XML sitemap and robots.txt management, Google Analytics 4 and Search Console setup, and a monthly performance report.' } },
        { '@type': 'Question', name: 'How long does SEO take to show results?', acceptedAnswer: { '@type': 'Answer', text: 'Most clients see meaningful keyword ranking improvements within 3–6 months. SEO compounds over time - the results in month 12 are significantly stronger than month 3. We provide monthly reports so you can track progress at every stage.' } },
        { '@type': 'Question', name: 'Do you guarantee first-page Google rankings?', acceptedAnswer: { '@type': 'Answer', text: "No ethical SEO agency can guarantee specific rankings. What we guarantee is white-hat, Google-compliant SEO work to the highest standard, transparent monthly reporting, and measurable progress. We have ranked 500+ businesses across 50+ industries over 15 years." } },
      ],
    },
  ],
};

/* ─── Static data ──────────────────────────────────────────────────── */
const PACKAGES = [
  {
    id: 'starter', name: 'Starter', tag: null,
    price: { monthly: 299, annual: 239 },
    desc: 'For small businesses and local brands ready to be found on Google.',
    features: [
      { label: 'Keywords Targeted', value: 'Up to 10' },
      { label: 'On-Page Optimisation', value: '10 pages' },
      { label: 'Monthly Backlinks', value: '5–8' },
      { label: 'Blog / Content Articles', value: '2 / month' },
      { label: 'Technical SEO Audit', yes: true },
      { label: 'Google Analytics 4 & Search Console', yes: true },
      { label: 'Local SEO & Google Business Profile', yes: true },
      { label: 'Keyword Rank Tracking', yes: true },
      { label: 'Schema Markup Implementation', yes: false },
      { label: 'Competitor Gap Analysis', yes: false },
      { label: 'Dedicated Account Manager', yes: false },
    ],
  },
  {
    id: 'professional', name: 'Professional', tag: 'Most Popular',
    price: { monthly: 599, annual: 479 },
    desc: 'For growing businesses that need consistent rankings and lead flow.',
    featured: true,
    features: [
      { label: 'Keywords Targeted', value: 'Up to 25' },
      { label: 'On-Page Optimisation', value: '25 pages' },
      { label: 'Monthly Backlinks', value: '15–20' },
      { label: 'Blog / Content Articles', value: '4 / month' },
      { label: 'Technical SEO Audit', yes: true },
      { label: 'Google Analytics 4 & Search Console', yes: true },
      { label: 'Local SEO & Google Business Profile', yes: true },
      { label: 'Keyword Rank Tracking', yes: true },
      { label: 'Schema Markup Implementation', yes: true },
      { label: 'Competitor Gap Analysis', yes: true },
      { label: 'Dedicated Account Manager', yes: false },
    ],
  },
  {
    id: 'enterprise', name: 'Enterprise', tag: 'Best Results',
    price: { monthly: 999, annual: 799 },
    desc: 'For established brands competing for high-volume national keywords.',
    features: [
      { label: 'Keywords Targeted', value: 'Up to 60' },
      { label: 'On-Page Optimisation', value: 'Unlimited' },
      { label: 'Monthly Backlinks', value: '35–50' },
      { label: 'Blog / Content Articles', value: '8 / month' },
      { label: 'Technical SEO Audit', yes: true },
      { label: 'Google Analytics 4 & Search Console', yes: true },
      { label: 'Local SEO & Google Business Profile', yes: true },
      { label: 'Keyword Rank Tracking', yes: true },
      { label: 'Schema Markup Implementation', yes: true },
      { label: 'Competitor Gap Analysis', yes: true },
      { label: 'Dedicated Account Manager', yes: true },
    ],
  },
  {
    id: 'enterprise-ai', name: 'Enterprise AI+', tag: 'AI-Powered', ai: true,
    price: { monthly: 1999, annual: 1599 },
    desc: 'For brands that need maximum visibility across Google, ChatGPT, and AI Overviews.',
    features: [
      { label: 'Keywords Targeted', value: 'Unlimited' },
      { label: 'On-Page Optimisation', value: 'Unlimited' },
      { label: 'Monthly Backlinks', value: '60–80' },
      { label: 'Blog / Content Articles', value: '12 / month' },
      { label: 'Technical SEO Audit', yes: true },
      { label: 'Google Analytics 4 & Search Console', yes: true },
      { label: 'Local SEO & Google Business Profile', yes: true },
      { label: 'Keyword Rank Tracking', yes: true },
      { label: 'Schema Markup Implementation', yes: true },
      { label: 'Competitor Gap Analysis', yes: true },
      { label: 'Dedicated Account Manager', yes: true },
      { label: 'AI Overview / GEO Optimisation', yes: true },
      { label: 'ChatGPT & Perplexity Citation Building', yes: true },
      { label: 'Dedicated AI+GEO Strategist', yes: true },
    ],
  },
];

const COMPARE_ROWS = [
  { label: 'Monthly Price', s: '$299/mo', p: '$599/mo', e: '$999/mo', x: '$1,999/mo', highlight: true },
  { label: 'Annual Price (save 20%)', s: '$239/mo', p: '$479/mo', e: '$799/mo', x: '$1,599/mo' },
  { label: 'Setup Fee', s: 'None', p: 'None', e: 'None', x: 'None' },
  { label: 'Contract', s: 'Month-to-month', p: 'Month-to-month', e: 'Month-to-month', x: 'Month-to-month' },
  { label: 'Keywords Targeted', s: 'Up to 10', p: 'Up to 25', e: 'Up to 60', x: 'Unlimited', highlight: true },
  { label: 'Pages Optimised', s: '10 pages', p: '25 pages', e: 'Unlimited', x: 'Unlimited' },
  { label: 'Backlinks / Month', s: '5–8', p: '15–20', e: '35–50', x: '60–80', highlight: true },
  { label: 'Blog Articles / Month', s: '2', p: '4', e: '8', x: '12' },
  { label: 'Technical SEO Audit', s: true, p: true, e: true, x: true },
  { label: 'On-Page Optimisation', s: true, p: true, e: true, x: true },
  { label: 'Keyword Rank Tracking', s: true, p: true, e: true, x: true },
  { label: 'Google Analytics 4 Setup', s: true, p: true, e: true, x: true },
  { label: 'Search Console Integration', s: true, p: true, e: true, x: true },
  { label: 'Local SEO / GBP Optimisation', s: true, p: true, e: true, x: true },
  { label: 'XML Sitemap & Robots.txt', s: true, p: true, e: true, x: true },
  { label: 'Core Web Vitals Fixes', s: true, p: true, e: true, x: true },
  { label: 'Schema / Structured Data', s: false, p: true, e: true, x: true },
  { label: 'Competitor Gap Analysis', s: false, p: true, e: true, x: true },
  { label: 'E-E-A-T Content Strategy', s: false, p: true, e: true, x: true },
  { label: 'Dedicated Account Manager', s: false, p: false, e: true, x: true },
  { label: 'AI Overview / GEO Optimisation', s: false, p: false, e: false, x: true },
  { label: 'ChatGPT & Perplexity Citation Building', s: false, p: false, e: false, x: true },
  { label: 'Monthly Performance Report', s: true, p: true, e: true, x: true },
  { label: 'Ideal For', s: 'Local / small biz', p: 'Growing businesses', e: 'Enterprise / national', x: 'AI-driven brands', highlight: true },
];

const INCLUDED = [
  { n: '01', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title: 'Technical SEO', desc: 'Core Web Vitals, crawl budget, site architecture, canonical tags, HTTPS, 404 fixes, XML sitemap, robots.txt, structured data, and international hreflang where needed.' },
  { n: '02', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'On-Page Optimisation', desc: 'Title tags, meta descriptions, heading hierarchy (H1–H3), keyword placement, internal linking strategy, image alt text, and content quality improvements aligned with E-E-A-T.' },
  { n: '03', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Link Building', desc: "Manual outreach for genuine editorial backlinks from authoritative, niche-relevant websites. We never use PBNs, link farms, or paid link schemes that violate Google's guidelines." },
  { n: '04', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'SEO Content Writing', desc: 'In-house writers produce keyword-optimised, E-E-A-T-aligned blog posts and landing pages. Every article targets real search intent - informational, commercial, or transactional.' },
  { n: '05', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Local SEO', desc: 'Google Business Profile optimisation, local citation building, NAP consistency audit, review strategy, and local keyword targeting to dominate map pack results.' },
  { n: '06', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Analytics & Reporting', desc: "GA4 and Search Console setup, monthly keyword rank tracking report, organic traffic analysis, CTR optimisation, and a plain-English summary of what we did and what's next." },
];

const WHY = [
  { icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', title: '15+ Years of SEO Experience', desc: 'Founded in 2010, we have navigated every major Google update since Panda. Our strategies are future-proof, not built around loopholes that disappear with the next core update.' },
  { icon: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z', title: '10,000+ Keywords on Page 1', desc: 'Across 500+ clients and 50+ industries - from local service businesses to SaaS platforms to national eCommerce brands. We know what it takes to rank in each market.' },
  { icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z', title: 'Zero Manual Penalties in 15 Years', desc: 'We have never had a client receive a Google manual action because we only use white-hat, Google-compliant techniques. No shortcuts, no PBNs, no paid links.' },
  { icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z', title: 'Transparent Monthly Reports', desc: 'You see every keyword rank change, every backlink earned, and every page optimised. No vanity metrics, no hiding behind proprietary dashboards - just clear data you can act on.' },
  { icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z', title: 'In-House E-E-A-T Content Team', desc: "Our writers are full-time SEO content specialists - not freelancers or AI tools. Every article is researched, fact-checked, and written to satisfy Google's E-E-A-T standards." },
  { icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z', title: 'US, Canada & Australia Experts', desc: 'We understand local search behaviour, regional SERP features, and competitor intensity in English-speaking western markets. Most of our client base is in these regions.' },
  { icon: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z', title: 'Full-Stack SEO Under One Roof', desc: 'Technical SEO, on-page, content, link building, local SEO, schema markup, and analytics - all handled by specialists in-house. No agency-hopping, no coordination overhead.' },
  { icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z', title: '97% Client Retention Rate', desc: 'Our average client relationship is 3+ years because SEO compounds over time - the results keep improving and clients have no reason to leave. We measure our success by yours.' },
];

const RESULTS = [
  { prefix: '', target: 500,   suffix: '+', decimals: 0, label: 'SEO Projects Delivered',    detail: 'Across US, UK, Canada & Australia' },
  { prefix: '', target: 10000, suffix: '+', decimals: 0, label: 'Keywords Ranked Page 1',    detail: 'Across 50+ industries' },
  { prefix: '', target: 97,    suffix: '%', decimals: 0, label: 'Client Retention Rate',     detail: 'Average client relationship 3+ years' },
  { prefix: '', target: 15,    suffix: '+', decimals: 0, label: 'Years in SEO',              detail: 'Founded 2010, zero manual penalties' },
];

const TESTIMONIALS_ROW1 = [
  { name: 'James Whitfield', role: 'E-commerce Director, Sydney', avatar: 'JW', bg: '#0F3460', text: '"Went from page 4 to page 1 for our main product keywords in 6 months. Organic revenue up 340%. The monthly reports are genuinely useful — not just fluff."' },
  { name: 'Sarah Mitchell', role: 'Small Business Owner, Colorado', avatar: 'SM', bg: '#D97706', text: '"Started on the Starter plan, upgraded to Professional after 3 months because the results were too good to slow down. Best marketing investment I\'ve ever made."' },
  { name: 'Ravi Nair', role: 'Marketing Manager, Toronto', avatar: 'RN', bg: '#7c3aed', text: '"15 years of experience shows. They navigated our site through the 2024 core update without a ranking drop while our competitors lost 40% of traffic."' },
  { name: 'Emily Thompson', role: 'Founder, London', avatar: 'ET', bg: '#0891b2', text: '"The transparency is what sets them apart. Every link earned, every rank change — documented clearly. We hit page 1 for 12 keywords in our first 4 months."' },
  { name: 'David Chen', role: 'Head of Digital, Melbourne', avatar: 'DC', bg: '#059669', text: '"We\'d tried two other agencies with poor results. 1Solutions are different — they actually understand search intent and write content that converts, not just ranks."' },
];

const TESTIMONIALS_ROW2 = [
  { name: 'Priya Sharma', role: 'Digital Manager, Vancouver', avatar: 'PS', bg: '#7c3aed', text: '"Organic traffic up 280% in 8 months. The E-E-A-T content strategy completely changed how Google sees our site. Our domain authority jumped from 18 to 41."' },
  { name: 'Michael O\'Brien', role: 'CEO, Dublin', avatar: 'MO', bg: '#D97706', text: '"No contracts, no lock-ins — just results. We\'ve been on the Professional plan for 2 years now. ROI is roughly 6x. I recommend them to every business owner I know."' },
  { name: 'Anna Kowalski', role: 'E-commerce Lead, New York', avatar: 'AK', bg: '#0F3460', text: '"Schema markup and Core Web Vitals improvements led to rich snippets appearing for 23 of our product pages. CTR went up 67% without any ranking change."' },
  { name: 'Brendan Walsh', role: 'Marketing Director, Auckland', avatar: 'BW', bg: '#be185d', text: '"Their local SEO work put us in the Maps Pack for every suburb we serve. Phone calls doubled in 4 months. The Google Business Profile optimisation alone paid for the plan."' },
  { name: 'Liu Wei', role: 'Founder, San Francisco', avatar: 'LW', bg: '#0891b2', text: '"Starting from zero domain authority is tough, but the Enterprise plan accelerated everything. We hit 50 DR in 11 months and rank competitively against sites with 5 years head start."' },
];

const PROCESS = [
  { n: '01', title: 'Free SEO Audit (Week 1)', body: 'We analyse your website - technical health, on-page quality, backlink profile, Core Web Vitals, and current keyword rankings. You receive a comprehensive audit report within 5 business days of sign-up, at no cost.' },
  { n: '02', title: 'Keyword Strategy (Week 2)', body: "We identify high-intent, achievable keywords mapped to your buyer's journey. We research the keywords your competitors rank for, identify gaps, and create a 12-month keyword roadmap aligned to business goals." },
  { n: '03', title: 'On-Page & Technical Fixes (Month 1)', body: 'We implement all on-page optimisations: title tags, meta descriptions, heading structures, content improvements, internal linking, schema markup, site speed fixes, and crawlability improvements across your target pages.' },
  { n: '04', title: 'Content & Link Building (Ongoing)', body: 'We publish SEO-targeted blog content every month and build genuine editorial backlinks through manual outreach. All links are from real, niche-relevant websites with genuine traffic - no PBNs, no spam directories.' },
  { n: '05', title: 'Monthly Reporting & Iteration', body: 'Every month you receive a clear report: keyword rank movements, organic traffic trends, backlinks earned, and the action plan for next month. We adapt strategy based on algorithm changes, competitor moves, and performance data.' },
];

const FAQS = [
  { q: 'How much do monthly SEO packages cost?', a: 'Our monthly SEO packages start at $299/month for the Starter plan, $599/month for Professional, $999/month for Enterprise, and $1,999/month for Enterprise AI+. Annual billing saves 20% - the Professional plan at $479/month (annual) saves $1,440/year. There are no setup fees and no lock-in contracts.' },
  { q: 'What is included in a monthly SEO package?', a: 'Every 1Solutions SEO package includes: keyword research and tracking, on-page optimisation, technical SEO (Core Web Vitals, crawlability, site speed), manual link building, SEO content writing (blog articles), local SEO and Google Business Profile management, XML sitemap and robots.txt, GA4 and Search Console setup, and a monthly performance report. Higher plans add schema markup, competitor analysis, and a dedicated account manager.' },
  { q: 'How long does SEO take to show results?', a: 'Most clients see measurable keyword ranking movement within 3–4 months. Meaningful organic traffic increases typically arrive by month 5–6. Competitive national keywords can take 9–12 months. SEO is a long-term compounding investment - the results in month 12 are significantly stronger than month 3. We show you progress every month via rank tracking reports.' },
  { q: 'Do you guarantee first-page rankings?', a: "No ethical SEO agency can guarantee specific rankings - Google's algorithm processes 200+ signals and is not controllable by any third party. Agencies that promise guaranteed rankings typically use black-hat tactics that result in Google penalties long-term. What we guarantee: white-hat work compliant with Google's guidelines, transparent monthly reporting, and measurable progress. We have ranked 500+ businesses across 50+ industries over 15 years without a single manual penalty." },
  { q: 'What is the difference between monthly SEO and a one-time SEO audit?', a: 'A one-time audit identifies problems but does not fix them. SEO requires continuous implementation: technical fixes, ongoing content creation, and monthly link building because your competitors are building links every month. Monthly SEO packages handle all of this on an ongoing basis.' },
  { q: 'Are monthly SEO packages worth the investment?', a: 'Yes - organic search consistently delivers the highest ROI of any digital marketing channel. Unlike Google Ads (traffic stops the moment you stop paying), SEO builds equity: rankings you earn this month continue to drive free traffic in month 6, 12, and 24. Our clients typically see a 3–8x ROI within 12 months.' },
  { q: 'Do you offer SEO packages for small businesses?', a: 'Yes. The Starter package at $299/month is built for small businesses and local brands. It targets up to 10 high-intent keywords, optimises 10 pages, builds 5–8 quality backlinks monthly, includes 2 blog articles, and covers full local SEO including Google Business Profile management.' },
  { q: 'Can I cancel my SEO package at any time?', a: "Yes. All monthly plans are cancel-anytime with 30 days' notice and no penalties. Annual plans are discounted 20% and paid upfront. We do not use 12-month lock-in contracts because we believe agencies should earn retention through results, not paperwork." },
  { q: 'Do you work with businesses in the US, UK, Canada, and Australia?', a: 'Yes - the majority of our SEO clients are in the US, Australia, and Canada. We have deep familiarity with English-language western search markets, local competitor landscapes, and SERP feature differences by region.' },
  { q: 'What makes 1Solutions different from other SEO agencies?', a: '15+ years of SEO experience (founded 2010), 500+ clients across 50+ industries, 10,000+ keywords ranked, and 97% client retention. We have navigated every major Google algorithm update without a single client receiving a manual penalty.' },
  { q: "What is Google's Helpful Content update and how do your packages address it?", a: "Google's Helpful Content system demotes content written primarily for search engines rather than people. Our content team produces articles that satisfy E-E-A-T - written by humans with domain knowledge, citing real data, and structured to directly answer the reader's question." },
  { q: 'Do you handle AI Overview (SGE) and answer engine optimisation?', a: 'Yes. We optimise content specifically for Google AI Overviews and answer engines - structuring pages to answer specific questions directly, implementing FAQPage and HowTo schema markup, ensuring factual accuracy with cited sources, and targeting featured snippets and People Also Ask results.' },
];

/* ─── Hooks ─────────────────────────────────────────────────────────── */
function useCountUp(target, duration, started) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf;
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    const step = now => {
      const t = Math.min(1, (now - start) / duration);
      setValue(target * ease(t));
      if (t < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started]);
  return value;
}

function StatCard({ prefix, target, suffix, decimals, label, detail }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const value = useCountUp(target, 1800, started);
  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
  return (
    <div ref={ref} className="asp-res-card">
      <div className="asp-res-metric">{prefix}{display}{suffix}</div>
      <div className="asp-res-label">{label}</div>
      <div className="asp-res-detail">{detail}</div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────── */
export default function AffordableSeoPackages() {
  const [billing, setBilling] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(0);

  /* Single IntersectionObserver for all reveal elements */
  useEffect(() => {
    const els = document.querySelectorAll('.asp-reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('asp-vis'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const TCell = ({ v }) => {
    if (v === true)  return <span className="asp-tc-yes" aria-label="Included">✓</span>;
    if (v === false) return <span className="asp-tc-no"  aria-label="Not included">—</span>;
    return <span className="asp-tc-val">{v}</span>;
  };

  return (
    <>
      <Head>
        <title>Monthly SEO Packages | Prices from $299/mo | 1Solutions</title>
        <meta name="description" content="Transparent monthly SEO packages from $299/mo. Starter, Professional, Enterprise & Enterprise AI+ plans — on-page SEO, link building, content, local SEO & AI/GEO optimisation included. No contracts." />
        <link rel="canonical" href="https://www.1solutions.biz/affordable-seo-packages/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Monthly SEO Packages | Prices from $299/mo | 1Solutions" />
        <meta property="og:description" content="Affordable monthly SEO packages starting at $299/month. White-hat only. No contracts. 15+ years, 500+ clients, 97% retention. Get a free SEO audit today." />
        <meta property="og:url" content="https://www.1solutions.biz/affordable-seo-packages/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-affordable-seo-packages.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Affordable SEO Packages — more growth, less spend" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Monthly SEO Packages from $299/mo | 1Solutions" />
        <meta name="twitter:description" content="White-hat monthly SEO packages. 4 plans, transparent pricing, no contracts. Free SEO audit included." />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-affordable-seo-packages.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Affordable SEO Packages — more growth, less spend" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          /* ── Base ── */
          .asp-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .asp-page *,.asp-page *::before,.asp-page *::after{box-sizing:border-box}
          /* ── Orbs ── */
          .asp-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .asp-orb1{width:900px;height:900px;background:radial-gradient(circle,rgba(245,158,11,.12) 0%,rgba(217,119,6,.08) 40%,transparent 70%);top:-300px;left:-200px}
          .asp-orb2{width:800px;height:800px;background:radial-gradient(circle,rgba(99,102,241,.18) 0%,rgba(139,92,246,.10) 40%,transparent 70%);top:-200px;right:-300px}
          .asp-orb3{width:600px;height:600px;background:radial-gradient(circle,rgba(20,184,166,.15) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%)}
          /* ── Reveal ── */
          .asp-reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .asp-reveal.asp-vis{opacity:1;transform:translateY(0)}
          /* ── Breadcrumb ── */.asp-bc a:hover{color:#D97706}
          /* ── Hero ── */
          .asp-hero{position:relative;z-index:1;padding:72px 40px 0;overflow:hidden}
          .asp-hero::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,.10) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px)}
          .asp-hero::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.16) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px)}
          .asp-hero-inner{position:relative;z-index:2;text-align:center;max-width:920px;margin:0 auto}
          .asp-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px}
          .asp-h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:18px;color:#0F1F40}
          .asp-hero-sub{font-size:16px;color:#3A507A;line-height:1.65;max-width:660px;margin:0 auto 28px}
          .asp-btns{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:32px}
          .asp-btn-p{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:rgba(15,52,96,.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.20);border-radius:50px;color:#fff;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,.25)}
          .asp-btn-p:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,.30)}
          .asp-btn-s{display:inline-flex;align-items:center;padding:14px 32px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .asp-btn-s:hover{background:rgba(255,255,255,.85);border-color:rgba(245,158,11,.6);transform:translateY(-2px)}
          /* ── Stats bar ── */
          .asp-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .asp-stat{padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .asp-stat:last-child{border-right:none}
          .asp-stat-v{font-size:26px;font-weight:900;color:#D97706;letter-spacing:-.5px;line-height:1;margin-bottom:6px}
          .asp-stat-l{font-size:12px;color:#4A6080;font-weight:500}
          /* ── Client logos ── */
          .asp-logos-bar{position:relative;z-index:2;padding:20px 40px 52px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:16px}
          .asp-logos-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0}
          .asp-logos-wrap{width:100%;overflow:hidden}
          .asp-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:asp-marquee 28s linear infinite}
          .asp-logos-track:hover{animation-play-state:paused}
          @keyframes asp-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .asp-clogo{height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .asp-clogo:hover{opacity:.85;filter:grayscale(0%)}
          /* ── Shared section ── */
          .asp-sec{padding:80px 40px;position:relative;z-index:1}
          .asp-white{background:#fff}
          .asp-in{max-width:1280px;margin:0 auto}
          .asp-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .asp-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:12px}
          .asp-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          /* ── Glass card ── */
          .asp-glass{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s,border-color .22s}
          .asp-glass:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(15,52,96,.12);border-color:rgba(217,119,6,.30)}
          /* ── Grids ── */
          .asp-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .asp-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
          /* ── Icon badge ── */
          .asp-nbadge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:12px;box-shadow:0 4px 12px rgba(15,52,96,.25);flex-shrink:0}
          .asp-card-h{font-size:16px;font-weight:700;color:#0F1F40;margin-bottom:6px}
          .asp-card-p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          /* ── Number badge (included) ── */
          .asp-num-badge{font-family:'Courier New',ui-monospace,monospace;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#D97706;background:rgba(217,119,6,.10);border:1px solid rgba(217,119,6,.22);border-radius:6px;padding:3px 8px;display:inline-block;margin-bottom:12px}
          /* ── Billing toggle ── */
          .asp-tog-row{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:40px;flex-wrap:wrap}
          .asp-tog{display:inline-flex;background:rgba(255,255,255,.55);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:4px;box-shadow:0 2px 12px rgba(15,52,96,.08)}
          .asp-tog-btn{padding:9px 26px;border-radius:100px;border:none;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;color:#6b7280;background:transparent;font-family:inherit}
          .asp-tog-btn.asp-active{background:linear-gradient(135deg,#D97706,#ea580c);color:#fff;box-shadow:0 2px 12px rgba(217,119,6,.35)}
          .asp-save-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(217,119,6,.12);color:#92400e;border:1px solid rgba(217,119,6,.25);font-size:12px;font-weight:700;padding:5px 12px;border-radius:100px}
          /* ── Pricing cards ── */
          .asp-pkg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-items:stretch;padding-top:16px}
          .asp-card{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;position:relative;display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s,border-color .22s;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .asp-card:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(15,52,96,.14)}
          .asp-card-pop{background:linear-gradient(180deg,rgba(217,119,6,.08) 0%,rgba(255,255,255,.82) 50%,rgba(219,234,254,.50) 100%);border-color:rgba(217,119,6,.50);box-shadow:0 0 80px rgba(217,119,6,.16),0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.98);transform:scale(1.03)}
          .asp-card-pop:hover{transform:scale(1.03) translateY(-4px)}
          .asp-pop-tag{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(120deg,#D97706,#ea580c);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:999px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;box-shadow:0 4px 16px rgba(217,119,6,.45)}
          .asp-card-ai{background:linear-gradient(180deg,rgba(124,58,237,.08) 0%,rgba(255,255,255,.82) 50%,rgba(237,233,254,.50) 100%);border-color:rgba(124,58,237,.45);box-shadow:0 0 70px rgba(124,58,237,.14),0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.98)}
          .asp-card-ai:hover{box-shadow:0 0 90px rgba(124,58,237,.20),0 14px 40px rgba(15,52,96,.14)}
          .asp-ai-tag{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(120deg,#7c3aed,#4f46e5);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:999px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;box-shadow:0 4px 16px rgba(124,58,237,.40)}
          .asp-card-ai .asp-currency{color:#7c3aed}
          .asp-card-ai .asp-save-line{color:#7c3aed}
          .asp-card-ai .asp-cta-card{background:linear-gradient(135deg,#7c3aed,#4f46e5)}
          .asp-card-ai .asp-cta-card:hover{background:linear-gradient(135deg,#6d28d9,#4338ca)}
          .asp-card-ai .asp-feat-list li::before{color:#7c3aed}
          .asp-plan-name{font-family:'Courier New',ui-monospace,monospace;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#6b7280;font-weight:700;margin-bottom:10px}
          .asp-price-row{display:flex;align-items:flex-end;gap:2px;margin-bottom:4px}
          .asp-currency{font-size:22px;font-weight:800;color:#0F1F40;align-self:flex-start;margin-top:6px}
          .asp-amount{font-size:44px;font-weight:800;letter-spacing:-.035em;color:#0F1F40;line-height:1}
          .asp-per{font-size:14px;color:#6b7280;padding-bottom:6px;align-self:flex-end}
          .asp-billed{font-size:12px;color:#6b7280;margin-bottom:2px}
          .asp-save-line{font-size:12px;color:#D97706;font-weight:600;min-height:18px;margin-bottom:14px}
          .asp-plan-desc{font-size:13px;color:#4A6080;line-height:1.55;margin-bottom:18px}
          .asp-cta-card{display:block;padding:12px 24px;background:#0F3460;color:#fff;border-radius:50px;font-weight:700;font-size:14px;text-align:center;text-decoration:none;transition:all .25s;margin-bottom:20px}
          .asp-cta-card:hover{background:#D97706;transform:translateY(-2px)}
          .asp-card-div{height:1px;background:rgba(15,52,96,.08);margin-bottom:16px}
          .asp-feat-list{list-style:none;padding:0;margin:0;flex:1}
          .asp-feat-list li{padding:9px 0;border-top:1px dashed rgba(15,52,96,.12);font-size:13px;color:#374151;line-height:1.4}
          .asp-feat-list li::before{content:"✓ ";color:#22c55e;font-weight:700}
          .asp-feat-list li.asp-no{color:#9ca3af}
          .asp-feat-list li.asp-no::before{content:"— ";color:#d1d5db}
          /* ── Compare table ── */
          .asp-cmp-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:40px}
          .asp-ctable{width:100%;border-collapse:separate;border-spacing:0;min-width:640px}
          .asp-ctable thead th{padding:14px 18px;font-size:13px;font-weight:700;text-align:center;background:rgba(15,52,96,.06);color:#0F3460;border-bottom:2px solid rgba(15,52,96,.10)}
          .asp-ctable thead th:first-child{text-align:left;border-radius:12px 0 0 0}
          .asp-ctable thead th:last-child{border-radius:0 12px 0 0}
          .asp-ctable thead th.asp-fcol{background:rgba(217,119,6,.10);color:#B45309;border-bottom-color:rgba(217,119,6,.30)}
          .asp-ctable thead th.asp-acol{background:rgba(124,58,237,.10);color:#5b21b6;border-bottom-color:rgba(124,58,237,.30)}
          .asp-ctable tbody td.asp-acol{background:rgba(237,233,254,.30)}
          .asp-ctable tbody tr.asp-hl td{background:rgba(15,52,96,.03)}
          .asp-ctable tbody td{padding:11px 18px;font-size:13px;color:#374151;border-bottom:1px solid rgba(15,52,96,.06);text-align:center}
          .asp-ctable tbody td:first-child{text-align:left;font-weight:500;color:#0F1F40}
          .asp-ctable tbody td.asp-fcol{background:rgba(254,243,199,.30)}
          .asp-tc-yes{font-size:16px;font-weight:800;color:#D97706}
          .asp-tc-no{font-size:16px;color:#d1d5db}
          .asp-tc-val{font-size:13px;color:#374151}
          /* ── Proven results ── */
          .asp-res-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:40px}
          .asp-res-card{background:linear-gradient(135deg,rgba(240,253,244,.90) 0%,rgba(255,255,255,1) 50%,rgba(254,252,232,.80) 100%);border:1px solid rgba(34,197,94,.18);border-radius:20px;padding:36px 24px;text-align:center;box-shadow:0 4px 24px rgba(34,197,94,.10),0 1px 0 rgba(255,255,255,.95) inset;transition:transform .22s,box-shadow .25s}
          .asp-res-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(34,197,94,.18),0 0 0 1px rgba(34,197,94,.25),0 1px 0 rgba(255,255,255,1) inset}
          .asp-res-metric{font-size:clamp(2.6rem,4.5vw,3.6rem);font-weight:900;letter-spacing:-.04em;line-height:1;margin-bottom:10px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-variant-numeric:tabular-nums}
          .asp-res-label{font-size:13px;font-weight:700;color:#0F1F40;margin-bottom:6px}
          .asp-res-detail{font-size:11px;color:#6b7280;line-height:1.5}
          /* ── Process ── */
          .asp-psteps{display:flex;flex-direction:column;margin-top:48px}
          .asp-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px}
          .asp-pstep-l{display:flex;flex-direction:column;align-items:center}
          .asp-pstep-circle{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#0F3460,#1a4b82);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#fff;flex-shrink:0;box-shadow:0 4px 16px rgba(15,52,96,.25)}
          .asp-pstep-line{flex:1;width:2px;background:rgba(15,52,96,.15);margin:6px 0;min-height:32px}
          .asp-pstep:last-child .asp-pstep-line{display:none}
          .asp-pstep-r{padding:4px 0 40px}
          .asp-pstep:last-child .asp-pstep-r{padding-bottom:0}
          .asp-pstep-title{font-size:18px;font-weight:700;color:#0F3460;margin:0 0 8px}
          .asp-pstep-body{font-size:14px;color:#4A6080;line-height:1.75;margin:0}
          /* ── Testimonials scroll ── */
          .asp-testi-sec{padding:72px 0;background:linear-gradient(135deg,#f8faff 0%,#f5f3ff 50%,#f0f7ff 100%);overflow:hidden}
          .asp-testi-hd{text-align:center;margin-bottom:44px;padding:0 40px}
          .asp-trow{overflow:hidden;position:relative}
          .asp-trow+.asp-trow{margin-top:16px}
          .asp-tfade-l{position:absolute;left:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to right,#f8faff,transparent);pointer-events:none}
          .asp-tfade-r{position:absolute;right:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to left,#f8faff,transparent);pointer-events:none}
          .asp-ttrack{display:flex;gap:20px;width:max-content;padding-left:20px;animation:asp-marq-l 42s linear infinite}
          .asp-ttrack-rev{display:flex;gap:20px;width:max-content;padding-left:20px;animation:asp-marq-r 42s linear infinite}
          .asp-trow:hover .asp-ttrack,.asp-trow:hover .asp-ttrack-rev{animation-play-state:paused}
          @keyframes asp-marq-l{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes asp-marq-r{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
          @media(prefers-reduced-motion:reduce){.asp-ttrack,.asp-ttrack-rev{animation:none!important}}
          .asp-tcard{width:420px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,.08);border-radius:16px;padding:20px 24px;box-shadow:0 2px 16px rgba(0,0,0,.05);display:flex;flex-direction:column;gap:12px;user-select:none}
          .asp-tcard-stars{display:flex;gap:2px}
          .asp-tcard-star{color:#F59E0B;font-size:14px}
          .asp-tcard-text{font-size:14px;color:#374151;line-height:1.75;margin:0;flex-grow:1}
          .asp-tcard-author{display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:14px}
          .asp-tavatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px}
          .asp-tname{font-weight:700;color:#111827;font-size:13px}
          .asp-trole{color:#9ca3af;font-size:12px;margin-top:1px}
          .asp-tbar{display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.75) 50%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 20px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);margin:44px auto 0;max-width:1100px}
          .asp-tbar-item{flex:1;text-align:center}
          .asp-tbar-num{font-size:28px;font-weight:800;color:#0F3460}
          .asp-tbar-label{font-size:13px;color:#4A6080;font-weight:500}
          .asp-tbar-div{width:1px;height:40px;background:rgba(15,52,96,.15);align-self:center}
          /* ── FAQ ── */
          .asp-faq-list{display:flex;flex-direction:column;gap:10px;margin-top:40px}
          .asp-fitem{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06),inset 0 1px 0 rgba(255,255,255,.95);transition:border-color .2s}
          .asp-fitem.asp-open{border-color:rgba(217,119,6,.35)}
          .asp-fitem.asp-open::before{content:'';display:block;height:3px;background:#D97706;border-radius:3px 3px 0 0}
          .asp-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .asp-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .asp-fitem.asp-open .asp-fq-badge{background:#D97706;color:#fff}
          .asp-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .asp-fitem.asp-open .asp-fq-text{color:#B45309}
          .asp-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .asp-fitem.asp-open .asp-fchev{transform:rotate(180deg);color:#D97706}
          .asp-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .asp-fitem.asp-open .asp-fanswer-wrap{max-height:600px}
          .asp-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          /* ── Contact ── */
          .asp-contact-grid{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:40px;align-items:start}
          .asp-ctitle{font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:900;line-height:1.18;margin:0 0 14px;color:#0F1F40}
          .asp-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .asp-cbenefits{background:linear-gradient(135deg,rgba(255,255,255,.70) 0%,rgba(219,234,254,.35) 100%);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:14px}
          .asp-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .asp-cbenefit-icon{flex-shrink:0;color:#D97706;margin-top:2px;font-size:16px;font-weight:800}
          .asp-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .asp-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(237,233,254,.25) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .asp-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 24px;letter-spacing:-.3px}
          .asp-form{display:flex;flex-direction:column;gap:14px}
          .asp-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .asp-fg{display:flex;flex-direction:column;gap:5px}
          .asp-fg.asp-full{grid-column:1/-1}
          .asp-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .asp-fg input,.asp-fg textarea,.asp-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .asp-fg input:focus,.asp-fg textarea:focus,.asp-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,.90);box-shadow:0 0 0 3px rgba(217,119,6,.10)}
          .asp-consent{display:flex;gap:8px;align-items:flex-start}
          .asp-consent input{margin-top:3px;width:15px;height:15px}
          .asp-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .asp-consent a{color:#0F3460}
          .asp-submit{width:100%;padding:14px;background:rgba(15,52,96,.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.28);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,.22)}
          .asp-submit:hover{background:#0F3460;transform:translateY(-2px);border-color:rgba(245,158,11,.5)}
          /* ── Related ── */
          .asp-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:28px}
          .asp-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .asp-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .asp-rtag-blue{background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8}
          .asp-rtag-violet{background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9}
          .asp-rtag-amber{background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309}
          .asp-rtag-teal{background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E}
          .asp-rtag-green{background:rgba(34,197,94,.09);border-color:rgba(34,197,94,.26);color:#15803D}
          .asp-rtag-orange{background:rgba(249,115,22,.09);border-color:rgba(249,115,22,.28);color:#C2410C}
          /* ── Responsive ── */
          @media(max-width:1024px){
            .asp-g3,.asp-pkg-grid{grid-template-columns:1fr 1fr}
            .asp-g4,.asp-res-grid{grid-template-columns:repeat(2,1fr)}
            .asp-card-pop{transform:none}
            .asp-card-pop:hover{transform:translateY(-4px)}
            .asp-contact-grid{grid-template-columns:1fr}
            .asp-tbar{flex-wrap:wrap;gap:16px;padding:24px 20px}
          }
          @media(max-width:768px){
            .asp-hero{padding:56px 24px 0}
            .asp-hero::before,.asp-hero::after{display:none}
            .asp-sec{padding:52px 20px}
            .asp-testi-sec{padding:52px 0}
            .asp-testi-hd{padding:0 20px}
            .asp-tcard{width:300px}
            .asp-tfade-l,.asp-tfade-r{width:48px}
            .asp-stats{grid-template-columns:repeat(2,1fr)}
            .asp-stat:nth-child(2){border-right:none}
            .asp-stat:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}
            .asp-stat:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}
            .asp-logos-bar{padding:16px 20px 28px}
            .asp-glass,.asp-card,.asp-fitem,.asp-form-box{backdrop-filter:none;-webkit-backdrop-filter:none}
            .asp-g3,.asp-pkg-grid,.asp-g4,.asp-res-grid{grid-template-columns:1fr}
            .asp-ctable{min-width:540px}
            .asp-frow{grid-template-columns:1fr}
            .asp-tbar{flex-wrap:wrap;padding:20px;margin-left:20px;margin-right:20px}
            .asp-tbar-item{flex:0 0 50%;padding:10px}
            .asp-tbar-div{display:none}
          }
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      <div className="asp-page">
        <div className="asp-orb asp-orb1" aria-hidden="true"/>
        <div className="asp-orb asp-orb2" aria-hidden="true"/>
        <div className="asp-orb asp-orb3" aria-hidden="true"/>

        {/* ── HERO ── */}
        <section className="asp-hero">
          <div className="asp-hero-inner">
            <span className="asp-eyebrow">Monthly SEO Packages · Transparent Pricing · No Lock-in Contracts</span>
            <h1 className="asp-h1">Affordable SEO Packages That Rank Your Business on <AuroraText>Page 1 of Google</AuroraText></h1>
            <p className="asp-hero-sub">Starting at $299/month. White-hat only. No contracts. Trusted by 500+ businesses across the US, Canada, and Australia — with 15+ years of proven ranking results.</p>
            <div className="asp-btns">
              <a href="#asp-contact" className="asp-btn-p">
                Get Your Free SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#packages" className="asp-btn-s">View Packages & Pricing</a>
            </div>
            <div className="asp-stats">
              {[{v:'500+',l:'SEO Projects'},{v:'10,000+',l:'Keywords Ranked'},{v:'15+',l:'Years in SEO'},{v:'97%',l:'Client Retention'}].map(s => (
                <div key={s.l} className="asp-stat">
                  <div className="asp-stat-v">{s.v}</div>
                  <div className="asp-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLIENT LOGOS ── */}
        <div className="asp-logos-bar">
          <span className="asp-logos-label">Trusted by Leading Brands</span>
          <div className="asp-logos-wrap">
            <div className="asp-logos-track">
              {[
                ['/logo/Indian_Express_Logo_full.png','Indian Express'],
                ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],
                ['/logo/Uniphore.jpg','Uniphore'],
                ['/logo/ICCoLogo.png','ICC'],
                ['/logo/Honor_Logo_(2020).svg.png','Honor'],
                ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],
                ['/logo/amarujala-print-logo_60e03f7d5b4a8.webp','Amar Ujala'],
                ['/logo/Nuance-Symbol-500x281.png','Nuance'],
                ['/logo/Indian_Express_Logo_full.png','Indian Express 2'],
                ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],
                ['/logo/Uniphore.jpg','Uniphore 2'],
                ['/logo/ICCoLogo.png','ICC 2'],
                ['/logo/Honor_Logo_(2020).svg.png','Honor 2'],
                ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2'],
                ['/logo/amarujala-print-logo_60e03f7d5b4a8.webp','Amar Ujala 2'],
                ['/logo/Nuance-Symbol-500x281.png','Nuance 2'],
              ].map(([src,alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d+$/, '')} className="asp-clogo" loading="lazy" />
              ))}
            </div>
          </div>
        </div>

        {/* ── WHAT'S INCLUDED ── */}
        <section className="asp-sec asp-white" id="included">
          <div className="asp-in">
            <div className="asp-reveal">
              <span className="asp-ey">Every Package Includes</span>
              <h2 className="asp-h2">Full-Stack SEO: <AuroraText>Nothing Left Out</AuroraText></h2>
              <p className="asp-lead">Every 1Solutions SEO plan covers the complete spectrum of modern SEO. No paid add-ons. No module upgrades. Everything you need to rank is in the package.</p>
            </div>
            <div className="asp-g3">
              {INCLUDED.map(s => (
                <div key={s.n} className="asp-glass asp-reveal" style={{display:'flex',flexDirection:'column'}}>
                  <div className="asp-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                  </div>
                  <div className="asp-card-h">{s.title}</div>
                  <p className="asp-card-p">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="asp-sec" id="why-us">
          <div className="asp-in">
            <div className="asp-reveal">
              <span className="asp-ey">Why 1Solutions</span>
              <h2 className="asp-h2">Why Businesses Choose Us for <AuroraText>Monthly SEO</AuroraText></h2>
              <p className="asp-lead">What separates a 15-year SEO agency from a new agency selling the same packages — and why it matters for your rankings.</p>
            </div>
            <div className="asp-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="asp-glass asp-reveal" style={{transitionDelay:`${i*60}ms`,display:'flex',flexDirection:'column',gap:'12px'}}>
                  <div className="asp-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={w.icon}/></svg>
                  </div>
                  <div className="asp-card-h">{w.title}</div>
                  <p className="asp-card-p">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="asp-sec asp-white" id="packages">
          <div className="asp-in">
            <div className="asp-reveal" style={{textAlign:'center'}}>
              <span className="asp-ey">SEO Pricing</span>
              <h2 className="asp-h2">Monthly SEO Packages <AuroraText>& Pricing</AuroraText></h2>
              <p className="asp-lead" style={{margin:'0 auto 32px'}}>Four transparent plans — no hidden fees, no lock-in contracts, no surprises. All plans include a free SEO audit at sign-up.</p>
            </div>
            <div className="asp-tog-row">
              <div className="asp-tog">
                <button className={`asp-tog-btn${billing==='monthly'?' asp-active':''}`} onClick={()=>setBilling('monthly')}>Monthly</button>
                <button className={`asp-tog-btn${billing==='annual'?' asp-active':''}`} onClick={()=>setBilling('annual')}>Annual</button>
              </div>
              {billing==='annual' && <span className="asp-save-badge">✓ Save 20% with annual billing</span>}
            </div>
            <div className="asp-pkg-grid">
              {PACKAGES.map(pkg => {
                const price = pkg.price[billing];
                const annualSave = (pkg.price.monthly - pkg.price.annual) * 12;
                return (
                  <div key={pkg.id} className={`asp-card${pkg.featured?' asp-card-pop':''}${pkg.ai?' asp-card-ai':''}`}>
                    {pkg.tag && <span className={pkg.ai?'asp-ai-tag':'asp-pop-tag'}>✦ {pkg.tag}</span>}
                    <div className="asp-plan-name">{pkg.name}</div>
                    <div className="asp-price-row">
                      <span className="asp-currency">$</span>
                      <span className="asp-amount">{price}</span>
                      <span className="asp-per">/mo</span>
                    </div>
                    <div className="asp-billed">{billing==='annual'?'Billed annually':'Billed monthly'}</div>
                    <div className="asp-save-line">{billing==='annual'?`Save $${annualSave.toLocaleString()} per year`:' '}</div>
                    <p className="asp-plan-desc">{pkg.desc}</p>
                    <a href="#asp-contact" className="asp-cta-card">Get Started — Free Audit Included</a>
                    <div className="asp-card-div"/>
                    <ul className="asp-feat-list">
                      {pkg.features.map(f => (
                        <li key={f.label} className={f.yes===false?'asp-no':''}>
                          {f.value ? `${f.label}: ${f.value}` : f.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <p style={{textAlign:'center',fontSize:'13px',color:'#6A80A0',marginTop:'24px'}}>All plans: no setup fees · cancel anytime · free SEO audit at sign-up · white-hat only</p>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="asp-sec" id="compare">
          <div className="asp-in">
            <div className="asp-reveal">
              <span className="asp-ey">Side-by-Side Comparison</span>
              <h2 className="asp-h2">Compare SEO Package <AuroraText>Features</AuroraText></h2>
              <p className="asp-lead">Every deliverable, every plan — in one place. No surprises, no upsells, no hidden extras.</p>
            </div>
            <div className="asp-cmp-wrap">
              <table className="asp-ctable" role="table" aria-label="SEO package feature comparison">
                <thead>
                  <tr>
                    <th scope="col">Feature</th>
                    <th scope="col">Starter<br/><small style={{fontWeight:500,color:'#4A6080'}}>$299/mo</small></th>
                    <th scope="col" className="asp-fcol">Professional<br/><small style={{fontWeight:500,color:'#B45309'}}>$599/mo ★</small></th>
                    <th scope="col">Enterprise<br/><small style={{fontWeight:500,color:'#4A6080'}}>$999/mo</small></th>
                    <th scope="col" className="asp-acol">Enterprise AI+<br/><small style={{fontWeight:500,color:'#5b21b6'}}>$1,999/mo</small></th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map(row => (
                    <tr key={row.label} className={row.highlight?'asp-hl':''}>
                      <td>{row.label}</td>
                      <td><TCell v={row.s}/></td>
                      <td className="asp-fcol"><TCell v={row.p}/></td>
                      <td><TCell v={row.e}/></td>
                      <td className="asp-acol"><TCell v={row.x}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── PROVEN RESULTS ── */}
        <section className="asp-sec asp-white" id="results">
          <div className="asp-in" style={{textAlign:'center'}}>
            <div className="asp-reveal">
              <span className="asp-ey">Proven Results</span>
              <h2 className="asp-h2">Real SEO Results: <AuroraText>Rankings, Traffic, Revenue</AuroraText></h2>
              <p className="asp-lead" style={{margin:'0 auto'}}>Real metrics from real businesses across the US, UK, Canada, and Australia.</p>
            </div>
            <div className="asp-res-grid">
              {RESULTS.map(r => (
                <StatCard key={r.label} {...r}/>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="asp-sec" id="process">
          <div className="asp-in">
            <div className="asp-reveal">
              <span className="asp-ey">How We Work</span>
              <h2 className="asp-h2">How We Grow Your <AuroraText>Search Rankings</AuroraText></h2>
              <p className="asp-lead">A structured, repeatable SEO process refined over 15+ years and 500+ client engagements. Clear milestones, monthly reporting, and full transparency at every stage.</p>
            </div>
            <div className="asp-psteps">
              {PROCESS.map((step, i) => (
                <div key={step.n} className="asp-pstep asp-reveal" style={{transitionDelay:`${i*80}ms`}}>
                  <div className="asp-pstep-l">
                    <div className="asp-pstep-circle">{step.n}</div>
                    <div className="asp-pstep-line"/>
                  </div>
                  <div className="asp-pstep-r">
                    <h3 className="asp-pstep-title">{step.title}</h3>
                    <p className="asp-pstep-body">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="asp-testi-sec" id="reviews" aria-labelledby="testi-heading">
          <div className="asp-testi-hd asp-reveal">
            <span className="asp-ey">Client Reviews</span>
            <h2 id="testi-heading" className="asp-h2">What Our SEO Clients <AuroraText>Say</AuroraText></h2>
            <p className="asp-lead" style={{margin:'0 auto'}}>Real results from real clients — no cherry-picked case studies, no inflated metrics.</p>
          </div>
          {/* Row 1 — scrolls left */}
          <div className="asp-trow">
            <div className="asp-tfade-l" aria-hidden="true"/>
            <div className="asp-tfade-r" aria-hidden="true"/>
            <div className="asp-ttrack" aria-hidden="true">
              {[...TESTIMONIALS_ROW1,...TESTIMONIALS_ROW1].map((t,i) => (
                <div key={i} className="asp-tcard">
                  <div className="asp-tcard-stars">{[1,2,3,4,5].map(s=><span key={s} className="asp-tcard-star">★</span>)}</div>
                  <p className="asp-tcard-text">{t.text}</p>
                  <div className="asp-tcard-author">
                    <div className="asp-tavatar" style={{background:t.bg}}>{t.avatar}</div>
                    <div><div className="asp-tname">{t.name}</div><div className="asp-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          <div className="asp-trow">
            <div className="asp-tfade-l" aria-hidden="true"/>
            <div className="asp-tfade-r" aria-hidden="true"/>
            <div className="asp-ttrack-rev" aria-hidden="true">
              {[...TESTIMONIALS_ROW2,...TESTIMONIALS_ROW2].map((t,i) => (
                <div key={i} className="asp-tcard">
                  <div className="asp-tcard-stars">{[1,2,3,4,5].map(s=><span key={s} className="asp-tcard-star">★</span>)}</div>
                  <p className="asp-tcard-text">{t.text}</p>
                  <div className="asp-tcard-author">
                    <div className="asp-tavatar" style={{background:t.bg}}>{t.avatar}</div>
                    <div><div className="asp-tname">{t.name}</div><div className="asp-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="asp-sec" id="faq">
          <div className="asp-in">
            <div className="asp-reveal">
              <span className="asp-ey">FAQ</span>
              <h2 className="asp-h2">Frequently Asked Questions About <AuroraText>SEO Packages</AuroraText></h2>
              <p className="asp-lead">Everything you need to know before choosing a monthly SEO package — answered honestly. Doing some link building yourself? See our <Link href="/top-50-article-submission-sites-list-for-seo-growth/">top 50 article submission sites for SEO growth</Link>.</p>
            </div>
            <div className="asp-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`asp-fitem${openFaq===i?' asp-open':''}`} itemScope itemType="https://schema.org/Question">
                  <button className="asp-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i}>
                    <span className="asp-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span className="asp-fq-text" itemProp="name">{f.q}</span>
                    <svg className="asp-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="asp-fanswer-wrap" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div className="asp-fanswer" itemProp="text">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="asp-sec asp-white" id="asp-contact">
          <div className="asp-contact-grid">
            <div className="asp-reveal">
              <span className="asp-ey">Get Started</span>
              <h2 className="asp-ctitle">Get a Free SEO Audit &amp; Package Recommendation</h2>
              <p className="asp-cdesc">Tell us about your business and we will send you a free technical SEO audit with a personalised package recommendation — usually within 24 hours, no commitment required.</p>
              <div className="asp-cbenefits">
                {[
                  'Free technical SEO audit of your website — crawl health, Core Web Vitals, on-page quality, backlink profile.',
                  'Package recommendation matched to your industry, competition level, and growth targets.',
                  'No lock-in contracts. Cancel any time. We earn your business through results.',
                  'Response within 24 hours. Audit delivered within 2 business days.',
                ].map(text => (
                  <div className="asp-cbenefit" key={text}>
                    <span className="asp-cbenefit-icon">✓</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="asp-form-box asp-reveal">
              <h3>Request Your Free SEO Audit</h3>
              <form className="asp-form" onSubmit={e=>e.preventDefault()}>
                <div className="asp-frow">
                  <div className="asp-fg"><label>Your Name *</label><input type="text" placeholder="Jane Smith" required/></div>
                  <div className="asp-fg"><label>Work Email *</label><input type="email" placeholder="jane@company.com" required/></div>
                </div>
                <div className="asp-frow">
                  <div className="asp-fg"><label>Phone *</label><input type="tel" placeholder="+1 (555) 000-0000" required/></div>
                  <div className="asp-fg"><label>Website URL</label><input type="url" placeholder="https://yoursite.com"/></div>
                </div>
                <div className="asp-fg asp-full">
                  <label>Package Interested In</label>
                  <select>
                    <option value="">Select a package…</option>
                    <option>Starter — $299/month</option>
                    <option>Professional — $599/month</option>
                    <option>Enterprise — $999/month</option>
                    <option>Enterprise AI+ — $1,999/month</option>
                    <option>Not sure — send me a recommendation</option>
                  </select>
                </div>
                <div className="asp-fg asp-full">
                  <label>Tell us about your SEO goals</label>
                  <textarea rows="3" placeholder="e.g. We want to rank for [keywords] in the US market and grow organic leads from X to Y…"/>
                </div>
                <div className="asp-consent">
                  <input type="checkbox" id="asp-con" required/>
                  <label htmlFor="asp-con">I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions contacting me about SEO services.</label>
                </div>
                <button type="submit" className="asp-submit">Send My Free Audit Request →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="asp-sec" id="related">
          <div className="asp-in" style={{textAlign:'center'}}>
            <div className="asp-reveal">
              <span className="asp-ey">Explore More</span>
              <h2 className="asp-h2">More Ways We Can <AuroraText>Grow Your Business</AuroraText></h2>
              <p className="asp-lead" style={{margin:'0 auto'}}>SEO works best alongside great web development and digital marketing. Explore our full range of digital services.</p>
            </div>
            <div className="asp-rtags asp-reveal">
              {[
                ['/link-building-packages/','Link Building Packages','asp-rtag-amber'],
                ['/ecommerce-seo-packages/','eCommerce SEO Packages','asp-rtag-blue'],
                ['/plumbing-seo-services/','Plumbing SEO Services','asp-rtag-teal'],
                ['/seo-audit-services/','SEO Audit Services','asp-rtag-violet'],
                ['/local-seo-services/','Local SEO Services','asp-rtag-green'],
                ['/link-building-services/','Link Building Services','asp-rtag-orange'],
                ['/seo-services-company/','SEO Services','asp-rtag-blue'],
                ['/content-marketing-services/','Content Marketing','asp-rtag-amber'],
                ['/contact/','Contact 1Solutions','asp-rtag-orange'],
              ].map(([href,label,cls]) => (
                <Link key={href} href={href} className={`asp-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
