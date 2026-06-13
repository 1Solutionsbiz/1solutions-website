'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

/* ─── Static data ──────────────────────────────────────────────────── */

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Affordable SEO Packages', item: 'https://www.1solutions.biz/affordable-seo-packages/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Monthly SEO Packages',
      url: 'https://www.1solutions.biz/affordable-seo-packages/',
      description: 'Affordable monthly SEO packages starting at $299/month. Includes on-page optimisation, technical SEO, link building, content writing, local SEO, and monthly reporting. No contracts. White-hat only.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      offers: [
        {
          '@type': 'Offer',
          name: 'Starter SEO Package',
          price: '299',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '299', priceCurrency: 'USD', unitText: 'MON' },
          description: 'Small business monthly SEO package — up to 10 keywords, 10-page on-page optimisation, 5–8 monthly backlinks, 2 blog articles, technical SEO, local SEO, and monthly reporting.',
          url: 'https://www.1solutions.biz/affordable-seo-packages/',
        },
        {
          '@type': 'Offer',
          name: 'Professional SEO Package',
          price: '599',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '599', priceCurrency: 'USD', unitText: 'MON' },
          description: 'Professional monthly SEO package — up to 25 keywords, 25-page optimisation, 15–20 monthly backlinks, 4 blog articles, schema markup, competitor analysis, and monthly reporting.',
          url: 'https://www.1solutions.biz/affordable-seo-packages/',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise SEO Package',
          price: '999',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '999', priceCurrency: 'USD', unitText: 'MON' },
          description: 'Enterprise monthly SEO package — up to 60 keywords, unlimited pages, 35–50 monthly backlinks, 8 blog articles, dedicated account manager, and monthly reporting.',
          url: 'https://www.1solutions.biz/affordable-seo-packages/',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '312',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much do monthly SEO packages cost?', acceptedAnswer: { '@type': 'Answer', text: 'Monthly SEO packages from 1Solutions start at $299/month for the Starter plan (up to 10 keywords), $599/month for the Professional plan (up to 25 keywords), and $999/month for the Enterprise plan (up to 60 keywords). Annual billing saves 20%. There are no setup fees and no long-term contracts.' } },
        { '@type': 'Question', name: 'What is included in a monthly SEO package?', acceptedAnswer: { '@type': 'Answer', text: 'A monthly SEO package from 1Solutions includes: keyword research and tracking, on-page optimisation (title tags, meta descriptions, headings, content), technical SEO (Core Web Vitals, crawlability, site speed), manual link building from authoritative websites, SEO content writing (blog articles), local SEO and Google Business Profile optimisation, XML sitemap and robots.txt management, Google Analytics 4 and Search Console setup, and a monthly performance report.' } },
        { '@type': 'Question', name: 'How long does SEO take to show results?', acceptedAnswer: { '@type': 'Answer', text: 'Most clients see meaningful keyword ranking improvements within 3–6 months. Competitive industries or newer websites may take 6–12 months to show significant organic traffic growth. SEO compounds over time — the results in month 12 are significantly stronger than month 3. We provide monthly reports so you can track progress at every stage.' } },
        { '@type': 'Question', name: 'Do you guarantee first-page Google rankings?', acceptedAnswer: { '@type': 'Answer', text: 'No ethical SEO agency can guarantee specific rankings — Google\'s algorithm is not within any agency\'s control. What we guarantee is white-hat, Google-compliant SEO work to the highest standard, transparent monthly reporting, and measurable progress. We have ranked 500+ businesses across 50+ industries over 15 years.' } },
        { '@type': 'Question', name: 'What is the difference between monthly SEO and a one-time SEO audit?', acceptedAnswer: { '@type': 'Answer', text: 'A one-time SEO audit identifies what needs fixing but does not fix it, and does not build the ongoing link profile and content that Google requires to rank. Monthly SEO packages handle all implementation continuously — technical fixes, ongoing content creation, and link building every month. SEO requires sustained effort because competitors are also investing in it continuously.' } },
        { '@type': 'Question', name: 'Are SEO packages worth the investment?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Organic search is typically the highest-ROI digital marketing channel. Unlike paid ads, organic rankings continue to drive traffic after you stop paying — rankings built over 12 months compound. Our clients typically see a 3–10x ROI within 12 months. The Starter plan at $299/month costs less than a single day of Google Ads for most industries.' } },
        { '@type': 'Question', name: 'Do you offer SEO packages for small businesses?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Starter SEO package at $299/month is designed specifically for small businesses and local brands. It targets up to 10 keywords, optimises 10 pages, builds 5–8 backlinks per month, and includes local SEO and Google Business Profile optimisation. It is our most popular package for businesses just starting their SEO journey.' } },
        { '@type': 'Question', name: 'Can I cancel my SEO package at any time?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All 1Solutions SEO packages are month-to-month with no long-term contracts. You can cancel with 30 days notice. Annual plans are discounted by 20% and are paid upfront, but monthly plans have complete flexibility. We earn your business every month through results, not paperwork.' } },
      ],
    },
  ],
};

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
];

const COMPARE_ROWS = [
  { label: 'Monthly Price', s: '$299/mo', p: '$599/mo', e: '$999/mo', highlight: true },
  { label: 'Annual Price (save 20%)', s: '$239/mo', p: '$479/mo', e: '$799/mo' },
  { label: 'Setup Fee', s: 'None', p: 'None', e: 'None' },
  { label: 'Contract', s: 'Month-to-month', p: 'Month-to-month', e: 'Month-to-month' },
  { label: 'Keywords Targeted', s: 'Up to 10', p: 'Up to 25', e: 'Up to 60', highlight: true },
  { label: 'Pages Optimised', s: '10 pages', p: '25 pages', e: 'Unlimited' },
  { label: 'Backlinks / Month', s: '5–8', p: '15–20', e: '35–50', highlight: true },
  { label: 'Blog Articles / Month', s: '2', p: '4', e: '8' },
  { label: 'Technical SEO Audit', s: true, p: true, e: true },
  { label: 'On-Page Optimisation', s: true, p: true, e: true },
  { label: 'Keyword Rank Tracking', s: true, p: true, e: true },
  { label: 'Google Analytics 4 Setup', s: true, p: true, e: true },
  { label: 'Search Console Integration', s: true, p: true, e: true },
  { label: 'Local SEO / GBP Optimisation', s: true, p: true, e: true },
  { label: 'XML Sitemap & Robots.txt', s: true, p: true, e: true },
  { label: 'Core Web Vitals Fixes', s: true, p: true, e: true },
  { label: 'Schema / Structured Data', s: false, p: true, e: true },
  { label: 'Competitor Gap Analysis', s: false, p: true, e: true },
  { label: 'E-E-A-T Content Strategy', s: false, p: true, e: true },
  { label: 'Dedicated Account Manager', s: false, p: false, e: true },
  { label: 'Monthly Performance Report', s: true, p: true, e: true },
  { label: 'Ideal For', s: 'Local / small biz', p: 'Growing businesses', e: 'Enterprise / national', highlight: true },
];

const INCLUDED = [
  { n: '01', title: 'Technical SEO', desc: 'Core Web Vitals, crawl budget, site architecture, canonical tags, HTTPS, 404 fixes, XML sitemap, robots.txt, structured data, and international hreflang where needed.' },
  { n: '02', title: 'On-Page Optimisation', desc: 'Title tags, meta descriptions, heading hierarchy (H1–H3), keyword placement, internal linking strategy, image alt text, and content quality improvements aligned with E-E-A-T.' },
  { n: '03', title: 'Link Building', desc: 'Manual outreach for genuine editorial backlinks from authoritative, niche-relevant websites. We never use PBNs, link farms, or paid link schemes that violate Google\'s guidelines.' },
  { n: '04', title: 'SEO Content Writing', desc: 'In-house writers produce keyword-optimised, E-E-A-T-aligned blog posts and landing pages. Every article targets real search intent — informational, commercial, or transactional.' },
  { n: '05', title: 'Local SEO', desc: 'Google Business Profile optimisation, local citation building, NAP consistency audit, review strategy, and local keyword targeting to dominate map pack results.' },
  { n: '06', title: 'Analytics & Reporting', desc: 'GA4 and Search Console setup, monthly keyword rank tracking report, organic traffic analysis, CTR optimisation, and a plain-English summary of what we did and what\'s next.' },
];

const FAQS = [
  { q: 'How much do monthly SEO packages cost?', a: 'Our monthly SEO packages start at $299/month for the Starter plan, $599/month for Professional, and $999/month for Enterprise. Annual billing saves 20% — the Professional plan at $479/month (annual) saves $1,440/year. There are no setup fees and no lock-in contracts. Pricing is transparent and fixed — no surprise invoices.' },
  { q: 'What is included in a monthly SEO package?', a: 'Every 1Solutions SEO package includes: keyword research and tracking, on-page optimisation (title tags, meta descriptions, headings, content), technical SEO (Core Web Vitals, crawlability, site speed), manual link building, SEO content writing (blog articles), local SEO and Google Business Profile management, XML sitemap and robots.txt, GA4 and Search Console setup, and a monthly performance report. Higher plans add schema markup, competitor analysis, and a dedicated account manager.' },
  { q: 'How long does SEO take to show results?', a: 'Most clients see measurable keyword ranking movement within 3–4 months. Meaningful organic traffic increases typically arrive by month 5–6. Competitive national keywords can take 9–12 months. SEO is a long-term compounding investment — the results in month 12 are significantly stronger than month 3, and unlike paid ads, rankings continue after investment slows. We show you progress every month via rank tracking reports.' },
  { q: 'Do you guarantee first-page rankings?', a: 'No ethical SEO agency can guarantee specific rankings — Google\'s algorithm processes 200+ signals and is not controllable by any third party. Agencies that promise guaranteed rankings typically use black-hat tactics that work short-term and result in Google penalties long-term. What we guarantee: white-hat work compliant with Google\'s guidelines, transparent monthly reporting, and measurable progress. We have ranked 500+ businesses across 50+ industries over 15 years without a single manual penalty.' },
  { q: 'What is the difference between monthly SEO and a one-time SEO audit?', a: 'A one-time audit identifies problems but does not fix them. SEO requires continuous implementation: technical fixes that get re-broken as sites update, ongoing content creation that Google needs to see before ranking you, and monthly link building because your competitors are building links every month. Monthly SEO packages handle all of this on an ongoing basis. We recommend starting with a monthly package; our free audit is included at sign-up.' },
  { q: 'Are monthly SEO packages worth the investment?', a: 'Yes — organic search consistently delivers the highest ROI of any digital marketing channel. Unlike Google Ads (traffic stops the moment you stop paying), SEO builds equity: rankings you earn this month continue to drive free traffic in month 6, 12, and 24. Our clients typically see a 3–8x ROI within 12 months. The Starter plan at $299/month costs less than a single day of Google Ads in most competitive industries, yet its results compound indefinitely.' },
  { q: 'Do you offer SEO packages for small businesses?', a: 'Yes. The Starter package at $299/month is built for small businesses and local brands. It targets up to 10 high-intent keywords, optimises 10 pages, builds 5–8 quality backlinks monthly, includes 2 blog articles, and covers full local SEO including Google Business Profile management. It\'s our most popular entry-level plan and has produced first-page rankings for hundreds of local businesses.' },
  { q: 'Can I cancel my SEO package at any time?', a: 'Yes. All monthly plans are cancel-anytime with 30 days\' notice and no penalties. Annual plans are discounted 20% and paid upfront; these are non-refundable after the first month but carry no further obligation. We do not use 12-month lock-in contracts because we believe agencies should earn retention through results, not paperwork.' },
  { q: 'Do you work with businesses in the US, UK, Canada, and Australia?', a: 'Yes — the majority of our SEO clients are in the US, Australia, and Canada. We have deep familiarity with English-language western search markets, local competitor landscapes, and SERP feature differences by region. Communication is async-friendly with regular video check-ins at your time zone. Our reporting is adapted to your local market.' },
  { q: 'What makes 1Solutions different from other SEO agencies?', a: '15+ years of SEO experience (founded 2008), 500+ clients across 50+ industries, 10,000+ keywords ranked, and 97% client retention. We have navigated every major Google algorithm update — Panda, Penguin, Hummingbird, BERT, Helpful Content, and the 2024–2025 Core Updates — without a single client receiving a manual penalty. We use no shortcuts, no grey-hat tactics, and no opaque reporting. Our team is fully in-house — no outsourced writers or link builders.' },
  { q: 'What is Google\'s Helpful Content update and how do your packages address it?', a: 'Google\'s Helpful Content system (rolled out 2022–2024) demotes content written primarily for search engines rather than people. Our content team produces articles that satisfy E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) — written by humans with domain knowledge, citing real data, and structured to directly answer the reader\'s question. We audit existing content for helpful-content compliance and replace thin or AI-generated content with depth that Google rewards.' },
  { q: 'Do you handle AI Overview (SGE) and answer engine optimisation?', a: 'Yes. We optimise content specifically for Google AI Overviews and answer engines (AEO/GEO) — structuring pages to answer specific questions directly, implementing FAQPage and HowTo schema markup, ensuring factual accuracy with cited sources, and targeting featured snippets and People Also Ask results. As AI-powered search surfaces grow, this structured content approach is essential for maintaining organic visibility.' },
];

const WHY = [
  { icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', title: '15+ Years of SEO Experience', desc: 'Founded in 2008, we have navigated every major Google update since Panda. Our strategies are future-proof, not built around loopholes that disappear with the next core update.' },
  { icon: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z', title: '10,000+ Keywords on Page 1', desc: 'Across 500+ clients and 50+ industries — from local plumbers to SaaS platforms to national eCommerce brands. We know what it takes to rank in each market.' },
  { icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z', title: 'Zero Manual Penalties in 15 Years', desc: 'We have never had a client receive a Google manual action or algorithmic penalty because we only use white-hat, Google-compliant techniques. No shortcuts, no PBNs, no paid links.' },
  { icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z', title: 'Transparent Monthly Reports', desc: 'You see every keyword rank change, every backlink earned, and every page optimised. No vanity metrics, no hiding behind "proprietary dashboards" — just clear data you can act on.' },
  { icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z', title: 'In-House E-E-A-T Content Team', desc: 'Our writers are full-time SEO content specialists — not freelancers or AI tools. Every article is researched, fact-checked, and written to satisfy Google\'s E-E-A-T standards.' },
  { icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z', title: 'US, Canada & Australia Market Experts', desc: 'We understand local search behaviour, regional SERP features, and competitor intensity in English-speaking western markets. Most of our client base is in these regions.' },
  { icon: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z', title: 'Full-Stack SEO Under One Roof', desc: 'Technical SEO, on-page, content, link building, local SEO, schema markup, and analytics — all handled by specialists in-house. No agency-hopping, no coordination overhead.' },
  { icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z', title: '97% Client Retention Rate', desc: 'Our average client relationship is 3+ years because SEO compounds over time — the results keep improving and clients have no reason to leave. We measure our success by yours.' },
];

/* ─── Hooks ─────────────────────────────────────────────────────────── */

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  const display = started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val;
  return (
    <div className="sp-stat-col">
      <div className="sp-stat-value">{display}</div>
      <div className="sp-stat-label">{label}</div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function AffordableSeoPackages() {
  const [billing, setBilling] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visiblePkgCards, setVisiblePkgCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);

  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const pkgGridRef = useRef(null);
  const testiGridRef = useRef(null);

  /* IntersectionObserver for stats counter */
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  /* Staggered card reveals */
  useEffect(() => {
    const makeObs = (ref, count, setter) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 110));
          obs.disconnect();
        }
      }, { threshold: 0.1 });
      obs.observe(ref.current);
      return obs;
    };
    const o1 = makeObs(whyGridRef, WHY.length, setVisibleWhyCards);
    const o2 = makeObs(pkgGridRef, 3, setVisiblePkgCards);
    const o3 = makeObs(testiGridRef, 3, setVisibleTestiCards);
    return () => { o1?.disconnect(); o2?.disconnect(); o3?.disconnect(); };
  }, []);

  /* Section reveal */
  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.12 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const visibleIncluded = showAll ? INCLUDED : INCLUDED.slice(0, 4);

  const TCell = ({ v }) => {
    if (v === true)  return <span className="sp-tc-yes" aria-label="Included">✓</span>;
    if (v === false) return <span className="sp-tc-no"  aria-label="Not included">—</span>;
    return <span className="sp-tc-val">{v}</span>;
  };

  return (
    <>
      <Head>
        <title>Monthly SEO Packages | Prices from $299/mo | 1Solutions</title>
        <meta name="description" content="Transparent monthly SEO packages from $299/mo. Starter, Professional & Enterprise plans — on-page SEO, link building, content & local SEO included. 15+ yrs | 500+ clients | Free SEO audit." />
        <link rel="canonical" href="https://www.1solutions.biz/affordable-seo-packages/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Monthly SEO Packages | Prices from $299/mo | 1Solutions" />
        <meta property="og:description" content="Affordable monthly SEO packages starting at $299/month. White-hat only. No contracts. 15+ years, 500+ clients, 97% retention. Get a free SEO audit today." />
        <meta property="og:url" content="https://www.1solutions.biz/affordable-seo-packages/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Monthly SEO Packages from $299/mo | 1Solutions" />
        <meta name="twitter:description" content="White-hat monthly SEO packages. 3 plans, transparent pricing, no contracts. Free SEO audit included." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          /* ── Reset & base ── */
          .sp-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .sp-page *,.sp-page *::before,.sp-page *::after { box-sizing:border-box; }
          /* ── Orbs ── */
          .sp-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .sp-orb-1 { width:900px;height:900px;background:radial-gradient(circle,rgba(99,130,255,.35) 0%,rgba(139,92,246,.15) 40%,transparent 70%);top:-300px;right:-300px; }
          .sp-orb-2 { width:800px;height:800px;background:radial-gradient(circle,rgba(251,146,60,.30) 0%,rgba(245,158,11,.15) 40%,transparent 70%);bottom:0;left:-250px; }
          .sp-orb-3 { width:600px;height:600px;background:radial-gradient(circle,rgba(20,184,166,.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%); }
          /* ── Breadcrumb ── */
          .sp-breadcrumb { position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto; }
          .sp-breadcrumb ol { display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0; }
          .sp-breadcrumb li { display:flex;align-items:center;gap:6px; }
          .sp-breadcrumb li::after { content:'/';opacity:0.5; }
          .sp-breadcrumb li:last-child::after { display:none; }
          .sp-breadcrumb a { color:#0F3460;text-decoration:none; }
          .sp-breadcrumb a:hover { text-decoration:underline; }
          /* ── Hero ── */
          .sp-hero { position:relative;z-index:2;text-align:center;max-width:880px;margin:0 auto;padding:44px 40px 28px; }
          .sp-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px; }
          .sp-hero h1 { font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:14px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .sp-hero-desc { font-size:16px;color:#3A507A;line-height:1.65;max-width:660px;margin:0 auto 20px; }
          .sp-trust-badges { display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:24px; }
          .sp-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,0.07); }
          .sp-badge-dot { width:7px;height:7px;border-radius:50%;background:#22c55e;flex-shrink:0; }
          .sp-hero-ctas { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
          .sp-btn-primary { display:inline-block;padding:14px 36px;background:#0F3460;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(15,52,96,0.25); }
          .sp-btn-primary:hover { background:#D97706;transform:translateY(-2px);box-shadow:0 12px 32px rgba(217,119,6,0.30); }
          .sp-btn-ghost { display:inline-block;padding:14px 36px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 16px rgba(15,52,96,0.08); }
          .sp-btn-ghost:hover { background:rgba(255,255,255,0.85);border-color:rgba(217,119,6,0.5);transform:translateY(-2px); }
          /* ── Stats bar ── */
          .sp-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:28px auto 0;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .sp-stat-col { padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .sp-stat-col:last-child { border-right:none; }
          .sp-stat-value { font-size:28px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }
          .sp-stat-label { font-size:11px;color:#4A6080;font-weight:500;margin-top:5px; }
          /* ── Logos ── */
          .sp-logos-bar { position:relative;z-index:2;padding:24px 40px 52px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:14px; }
          .sp-logos-eyebrow { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0; }
          .sp-logos-track-wrap { width:100%;overflow:hidden; }
          .sp-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:sp-marquee 28s linear infinite; }
          .sp-logos-track:hover { animation-play-state:paused; }
          @keyframes sp-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .sp-clogo { height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:0.45;transition:opacity 0.25s,filter 0.25s; }
          .sp-clogo:hover { opacity:0.85;filter:grayscale(0%); }
          /* ── What Is section ── */
          .sp-whatis { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:72px 40px;position:relative;z-index:1; }
          .sp-whatis-inner { max-width:1280px;margin:0 auto; }
          .sp-whatis-grid { display:grid;grid-template-columns:1.1fr 1fr;gap:56px;align-items:start;margin-top:40px; }
          .sp-definition-box { background:linear-gradient(135deg,rgba(254,243,199,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.45) 100%);backdrop-filter:blur(16px);border:1.5px solid rgba(217,119,6,0.25);border-radius:20px;padding:28px 30px;box-shadow:0 4px 24px rgba(217,119,6,0.08),inset 0 1px 0 rgba(255,255,255,1); }
          .sp-definition-box h3 { font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#B45309;margin:0 0 10px; }
          .sp-definition-box p { font-size:15px;line-height:1.75;color:#374151;margin:0; }
          .sp-whatis-checklist { list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px; }
          .sp-whatis-checklist li { display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#374151;line-height:1.55; }
          .sp-whatis-checklist li::before { content:'✓';font-weight:800;color:#D97706;flex-shrink:0;margin-top:1px; }
          .sp-whatis-col h3 { font-size:18px;font-weight:700;color:#0F3460;margin:0 0 16px; }
          .sp-redflags { list-style:none;padding:0;margin:16px 0 0;display:flex;flex-direction:column;gap:8px; }
          .sp-redflags li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#6b7280;line-height:1.5; }
          .sp-redflags li::before { content:'✗';font-weight:800;color:#ef4444;flex-shrink:0; }
          /* ── Shared section styles ── */
          .sp-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .sp-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .sp-s-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:0; }
          .sp-s-reveal { opacity:0;transform:translateY(44px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .sp-s-reveal.sp-revealed { opacity:1;transform:translateY(0); }
          /* ── Billing toggle ── */
          .sp-billing-wrap { position:relative;z-index:2;text-align:center;padding:60px 40px 0; }
          .sp-billing-sub { font-size:13px;color:#4A6080;margin-bottom:12px; }
          .sp-billing-toggle { display:inline-flex;background:rgba(255,255,255,0.55);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:100px;padding:4px;box-shadow:0 2px 12px rgba(15,52,96,0.08); }
          .sp-billing-btn { padding:9px 28px;border-radius:100px;border:none;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s;color:#4A6080;background:transparent;font-family:inherit; }
          .sp-billing-btn.active { background:#0F3460;color:#fff;box-shadow:0 2px 12px rgba(15,52,96,0.25); }
          .sp-save-pill { display:inline-flex;align-items:center;gap:5px;background:rgba(217,119,6,0.10);color:#B45309;border:1px solid rgba(217,119,6,0.22);font-size:12px;font-weight:700;padding:4px 12px;border-radius:100px;margin-left:10px; }
          /* ── Packages ── */
          .sp-pkg-section { position:relative;z-index:2;padding:32px 40px 0; }
          .sp-pkg-inner { max-width:1300px;margin:0 auto; }
          .sp-pkg-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start; }
          .sp-pkg { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .sp-pkg.sp-pv { opacity:1;transform:translateY(0); }
          .sp-pkg.sp-pv:hover { box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1);border-color:rgba(217,119,6,.35); }
          .sp-pkg.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .sp-pkg.feat.sp-pv { transform:translateY(-8px); }
          .sp-pkg.feat.sp-pv:hover { transform:translateY(-12px); }
          .sp-pkg-tag { display:block;background:linear-gradient(90deg,#0F3460,#D97706);color:#fff;text-align:center;font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;padding:8px; }
          .sp-pkg-head { padding:26px 24px 20px; }
          .sp-pkg-name { font-size:22px;font-weight:900;color:#0F3460;margin-bottom:6px; }
          .sp-pkg-desc { font-size:13px;color:#4A6080;line-height:1.55;margin-bottom:18px; }
          .sp-price-row { display:flex;align-items:flex-end;gap:4px;margin-bottom:4px; }
          .sp-price { font-size:44px;font-weight:900;color:#0F3460;line-height:1;letter-spacing:-2px; }
          .sp-price-meta { font-size:12px;color:#6A80A0;padding-bottom:5px; }
          .sp-price-note { font-size:12px;color:#D97706;font-weight:600;min-height:17px;margin-bottom:14px; }
          .sp-pkg-cta { display:block;width:100%;padding:12px;border-radius:50px;font-size:14px;font-weight:700;text-align:center;text-decoration:none;transition:all 0.25s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .sp-pkg-cta:hover { background:#0F3460;color:#fff; }
          .sp-pkg.feat .sp-pkg-cta { background:#0F3460;color:#fff;box-shadow:0 6px 20px rgba(15,52,96,.22); }
          .sp-pkg.feat .sp-pkg-cta:hover { background:#D97706;border-color:#D97706; }
          .sp-pkg-div { height:1px;background:rgba(15,52,96,.08); }
          .sp-pkg-feats { padding:18px 24px 24px; }
          .sp-pkg-feats-label { font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#6A80A0;margin-bottom:10px; }
          .sp-feat-row { display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(15,52,96,.05); }
          .sp-feat-row:last-child { border-bottom:none; }
          .sp-feat-icon { flex-shrink:0;width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center; }
          .sp-feat-yes { background:rgba(217,119,6,.10); }
          .sp-feat-no  { background:rgba(15,52,96,.06); }
          .sp-feat-lbl { font-size:13px;color:#374151;flex:1; }
          .sp-feat-lbl.dim { color:#9ca3af; }
          .sp-feat-val { font-size:12px;font-weight:700;color:#0F3460;white-space:nowrap; }
          /* ── Compare table ── */
          .sp-compare { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .sp-compare-inner { max-width:1300px;margin:0 auto; }
          .sp-compare-wrap { overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:40px; }
          .sp-ctable { width:100%;border-collapse:separate;border-spacing:0;min-width:640px; }
          .sp-ctable thead th { padding:14px 18px;font-size:13px;font-weight:700;text-align:center;background:rgba(15,52,96,.06);color:#0F3460;border-bottom:2px solid rgba(15,52,96,.10); }
          .sp-ctable thead th:first-child { text-align:left;border-radius:12px 0 0 0; }
          .sp-ctable thead th:last-child { border-radius:0 12px 0 0; }
          .sp-ctable thead th.feat-col { background:rgba(217,119,6,.10);color:#B45309;border-bottom-color:rgba(217,119,6,.30); }
          .sp-ctable tbody tr.highlight td { background:rgba(15,52,96,.03); }
          .sp-ctable tbody td { padding:11px 18px;font-size:13px;color:#374151;border-bottom:1px solid rgba(15,52,96,.06);text-align:center; }
          .sp-ctable tbody td:first-child { text-align:left;font-weight:500;color:#0F1F40; }
          .sp-ctable tbody td.feat-col { background:rgba(254,243,199,.30); }
          .sp-tc-yes { font-size:16px;font-weight:800;color:#D97706; }
          .sp-tc-no  { font-size:16px;color:#d1d5db; }
          .sp-tc-val { font-size:13px;color:#374151; }
          /* ── Pricing guide ── */
          .sp-guide { padding:72px 40px;position:relative;z-index:1; }
          .sp-guide-inner { max-width:1300px;margin:0 auto; }
          .sp-guide-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .sp-gcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s; }
          .sp-gcard:hover { transform:translateY(-4px);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .sp-gcard.sp-gcard-us { border-color:rgba(217,119,6,.25);background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%); }
          .sp-gcard-range { font-size:18px;font-weight:900;color:#0F3460;margin-bottom:6px; }
          .sp-gcard-label { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6A80A0;margin-bottom:12px; }
          .sp-gcard-desc { font-size:13px;color:#4A6080;line-height:1.6; }
          .sp-gcard-badge { display:inline-block;font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;margin-bottom:10px; }
          .sp-badge-amber { background:rgba(217,119,6,.12);color:#B45309;border:1px solid rgba(217,119,6,.22); }
          .sp-badge-red   { background:rgba(239,68,68,.08);color:#dc2626;border:1px solid rgba(239,68,68,.18); }
          .sp-badge-green { background:rgba(34,197,94,.09);color:#16a34a;border:1px solid rgba(34,197,94,.22); }
          .sp-badge-blue  { background:rgba(59,130,246,.09);color:#1d4ed8;border:1px solid rgba(59,130,246,.18); }
          /* ── Included ── */
          .sp-included { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .sp-included-inner { max-width:1300px;margin:0 auto; }
          .sp-inc-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:40px; }
          .sp-inc-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s,border-color .22s; }
          .sp-inc-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,.40);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .sp-inc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .sp-inc-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .sp-inc-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .sp-inc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,0.36,1); }
          .sp-inc-card:hover::before { transform:scaleY(1); }
          .sp-inc-more { text-align:center;margin-top:20px; }
          .sp-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;box-shadow:0 2px 8px rgba(15,52,96,.07);font-family:inherit; }
          .sp-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }
          /* ── Process ── */
          .sp-process { padding:80px 40px;position:relative;z-index:1; }
          .sp-process-inner { max-width:1300px;margin:0 auto; }
          .sp-psteps { display:flex;flex-direction:column;margin-top:56px; }
          .sp-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,0.36,1),transform .65s cubic-bezier(0.22,1,0.36,1); }
          .sp-pstep.sp-vis { opacity:1;transform:translateY(0); }
          .sp-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .sp-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .sp-pstep:hover .sp-pstep-circle { background:rgba(245,158,11,.2);border-color:#D97706;color:#D97706; }
          .sp-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:44px; }
          .sp-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .sp-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .sp-pstep:last-child .sp-pstep-connector { display:none; }
          .sp-pstep-r { padding:4px 0 40px; }
          .sp-pstep:last-child .sp-pstep-r { padding-bottom:0; }
          .sp-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .sp-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          /* ── Testimonials ── */
          .sp-testi { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .sp-testi-inner { max-width:1300px;margin:0 auto; }
          .sp-center-head { text-align:center;margin-bottom:48px; }
          .sp-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px; }
          .sp-tcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:30px 26px;display:flex;flex-direction:column;gap:14px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,0.36,1),transform .6s cubic-bezier(0.22,1,0.36,1),box-shadow .3s; }
          .sp-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.22); }
          .sp-tcard.sp-tv { opacity:1;transform:translateY(0); }
          .sp-tcard.sp-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .sp-stars { font-size:17px;color:#D97706;letter-spacing:2px; }
          .sp-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .sp-tauthor { display:flex;align-items:center;gap:12px; }
          .sp-tavatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .sp-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .sp-trole { font-size:12px;color:#6b7280; }
          .sp-tbar { display:flex;background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.75) 50%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:16px;padding:28px 40px;box-shadow:0 4px 20px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95); }
          .sp-tbar-item { flex:1;text-align:center; }
          .sp-tbar-num { font-size:26px;font-weight:800;color:#0F3460; }
          .sp-tbar-label { font-size:12px;color:#4A6080;font-weight:500; }
          .sp-tbar-div { width:1px;background:rgba(15,52,96,.12);align-self:stretch; }
          /* ── Why ── */
          .sp-why { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .sp-why-inner { max-width:1300px;margin:0 auto; }
          .sp-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:52px; }
          .sp-wcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,0.36,1),transform .55s cubic-bezier(0.22,1,0.36,1),border-color .25s; }
          .sp-wcard:hover { transform:translateY(-6px) scale(1);border-color:rgba(217,119,6,.38);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .sp-wcard.sp-wv { opacity:1;transform:translateY(0) scale(1); }
          .sp-wcard-icon { width:38px;height:38px;margin-bottom:10px; }
          .sp-wcard-icon svg { fill:#D97706; }
          .sp-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .sp-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }
          /* ── Contact ── */
          .sp-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,.70) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .sp-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .sp-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .sp-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .sp-cbenefits { background:linear-gradient(135deg,rgba(255,255,255,.70) 0%,rgba(219,234,254,.35) 100%);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:16px; }
          .sp-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .sp-cbenefit-icon { flex-shrink:0;color:#D97706;margin-top:2px;font-size:16px;font-weight:800; }
          .sp-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .sp-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(237,233,254,.25) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .sp-form-box h3 { font-size:24px;font-weight:700;color:#0F1F40;margin:0 0 24px;letter-spacing:-.3px; }
          .sp-form { display:flex;flex-direction:column;gap:14px; }
          .sp-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .sp-fg { display:flex;flex-direction:column;gap:5px; }
          .sp-fg.full { grid-column:1/-1; }
          .sp-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .sp-fg input,.sp-fg textarea,.sp-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .sp-fg input:focus,.sp-fg textarea:focus,.sp-fg select:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,.90);box-shadow:0 0 0 3px rgba(217,119,6,.10); }
          .sp-consent { display:flex;gap:8px;align-items:flex-start; }
          .sp-consent input { margin-top:3px;width:15px;height:15px; }
          .sp-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .sp-consent a { color:#0F3460; }
          .sp-submit { width:100%;padding:14px;background:rgba(15,52,96,.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.28);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,.22); }
          .sp-submit:hover { background:#0F3460;transform:translateY(-2px);border-color:rgba(245,158,11,.5); }
          /* ── FAQ ── */
          .sp-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .sp-faq-inner { max-width:1300px;margin:0 auto; }
          .sp-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .sp-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .sp-faq-list { display:flex;flex-direction:column;gap:10px; }
          .sp-fitem { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06),inset 0 1px 0 rgba(255,255,255,.95);transition:border-color .2s; }
          .sp-fitem.open { border-color:rgba(217,119,6,.35); }
          .sp-fitem.open::before { content:'';display:block;height:3px;background:#D97706;border-radius:3px 3px 0 0; }
          .sp-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .sp-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .sp-fitem.open .sp-fq-badge { background:#D97706;color:#fff; }
          .sp-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .sp-fitem.open .sp-fq span { color:#B45309; }
          .sp-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .sp-fitem.open .sp-fchev { transform:rotate(180deg);color:#D97706; }
          .sp-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .sp-fitem.open .sp-fanswer-wrap { max-height:500px; }
          .sp-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }
          /* ── Related ── */
          .sp-related { padding:80px 40px;background:rgba(237,233,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .sp-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .sp-related h2 { font-size:36px;font-weight:900;letter-spacing:-.5px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 14px; }
          .sp-related-sub { font-size:14px;color:#4A6080;max-width:580px;margin:0 auto; }
          .sp-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:36px 0; }
          .sp-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .sp-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .sp-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .sp-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .sp-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .sp-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .sp-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .sp-rtag-green  { background:rgba(34,197,94,.09);border-color:rgba(34,197,94,.26);color:#15803D; }
          .sp-rtag-indigo { background:rgba(99,102,241,.09);border-color:rgba(99,102,241,.26);color:#4338CA; }
          .sp-rtag-orange { background:rgba(249,115,22,.09);border-color:rgba(249,115,22,.28);color:#C2410C; }
          /* ── Responsive ── */
          @media(max-width:1024px){
            .sp-hero h1{font-size:38px}
            .sp-s-title,.sp-faq h2,.sp-related h2{font-size:34px}
            .sp-pkg-grid{grid-template-columns:1fr;max-width:440px;margin:0 auto}
            .sp-pkg.feat{transform:none}
            .sp-pkg.feat.sp-pv{transform:none}
            .sp-pkg.feat.sp-pv:hover{transform:translateY(-4px)}
            .sp-inc-grid{grid-template-columns:repeat(2,1fr)}
            .sp-why-grid{grid-template-columns:repeat(2,1fr)}
            .sp-guide-grid{grid-template-columns:repeat(2,1fr)}
            .sp-whatis-grid{grid-template-columns:1fr}
            .sp-contact-grid{grid-template-columns:1fr}
            .sp-tgrid{grid-template-columns:1fr}
          }
          @media(max-width:768px){
            .sp-breadcrumb{padding:12px 20px 0}
            .sp-hero{padding:28px 20px 20px}
            .sp-hero h1{font-size:26px;letter-spacing:-.3px}
            .sp-stats{grid-template-columns:1fr 1fr}
            .sp-stat-col:nth-child(2){border-right:none}
            .sp-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}
            .sp-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}
            .sp-logos-bar{padding:16px 20px 28px}
            .sp-whatis,.sp-compare,.sp-guide,.sp-included,.sp-process,.sp-testi,.sp-why,.sp-faq,.sp-related{padding:52px 20px}
            .sp-contact{padding:48px 20px}
            .sp-pkg-section{padding:24px 20px 0}
            .sp-billing-wrap{padding:44px 20px 0}
            .sp-inc-grid{grid-template-columns:1fr}
            .sp-guide-grid{grid-template-columns:1fr}
            .sp-why-grid{grid-template-columns:1fr}
            .sp-frow{grid-template-columns:1fr}
            .sp-tbar{flex-wrap:wrap;padding:20px}
            .sp-tbar-item{flex:0 0 50%;padding:10px}
            .sp-tbar-div{display:none}
            .sp-ctitle{font-size:28px}
          }
        `}</style>
      </Head>

      <div className="sp-page">
        <div className="sp-orb sp-orb-1" />
        <div className="sp-orb sp-orb-2" />
        <div className="sp-orb sp-orb-3" />

        {/* ── BREADCRUMB ── */}
        <nav className="sp-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Affordable SEO Packages</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="sp-hero">
          <span className="sp-eyebrow">Monthly SEO Packages — Transparent Pricing, Zero Lock-in Contracts</span>
          <h1>Monthly SEO Packages That Rank Your Business on Page 1 of Google</h1>
          <p className="sp-hero-desc">Starting at $299/month. White-hat only. No contracts. Trusted by 500+ businesses across the US, Canada, and Australia — with 15+ years of proven ranking results.</p>

          <div className="sp-trust-badges" role="list">
            {['No Setup Fees','No Lock-in Contracts','White-Hat Only','Free SEO Audit','97% Client Retention'].map(b => (
              <div className="sp-badge" key={b} role="listitem"><span className="sp-badge-dot" />{'  '}{b}</div>
            ))}
          </div>

          <div className="sp-hero-ctas">
            <Link href="#packages" className="sp-btn-primary">View Packages & Pricing</Link>
            <Link href="#contact"  className="sp-btn-ghost">Get Free SEO Audit →</Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="sp-stats" ref={statsRef}>
          {[['500+','SEO Projects Delivered'],['10,000+','Keywords Ranked'],['15+','Years in SEO'],['97%','Client Retention']].map(([v,l]) => (
            <AnimatedStat key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        {/* ── CLIENT LOGOS ── */}
        <div className="sp-logos-bar">
          <span className="sp-logos-eyebrow">Trusted by Leading Brands</span>
          <div className="sp-logos-track-wrap">
            <div className="sp-logos-track">
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
              ].map(([src,alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/,'')} className="sp-clogo" />
              ))}
            </div>
          </div>
        </div>

        {/* ── WHAT IS A MONTHLY SEO PACKAGE? ── */}
        <section className="sp-whatis" aria-labelledby="whatis-heading">
          <div className="sp-whatis-inner">
            <div className={`sp-s-reveal${visibleSections.has('wi')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['wi']=el;}}>
              <span className="sp-s-eyebrow">Understanding SEO Packages</span>
              <h2 id="whatis-heading" className="sp-s-title">What Is a Monthly SEO Package?</h2>
            </div>
            <div className="sp-whatis-grid">
              <div>
                <div className="sp-definition-box">
                  <h3>Definition</h3>
                  <p>A <strong>monthly SEO package</strong> is a bundled service where an agency handles all ongoing search engine optimisation for your website — technical fixes, on-page improvements, content creation, and link building — for a fixed monthly fee. Unlike a one-time audit, monthly SEO is continuous because Google&apos;s algorithm evolves, competitors keep investing, and rankings require sustained effort to build and maintain.</p>
                </div>
                <br />
                <div className="sp-whatis-col">
                  <h3>What Should an SEO Package Include?</h3>
                  <ul className="sp-whatis-checklist">
                    <li>Keyword research and monthly rank tracking</li>
                    <li>On-page optimisation (title tags, meta descriptions, headings, content)</li>
                    <li>Technical SEO (Core Web Vitals, crawlability, site speed, structured data)</li>
                    <li>Manual, white-hat link building from real editorial websites</li>
                    <li>SEO content writing — blog posts and landing pages</li>
                    <li>Local SEO and Google Business Profile management</li>
                    <li>Google Analytics 4 and Search Console monitoring</li>
                    <li>Plain-English monthly performance report</li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="sp-whatis-col">
                  <h3>Red Flags to Avoid in SEO Packages</h3>
                  <p style={{fontSize:'14px',color:'#4A6080',marginBottom:'12px'}}>Not all SEO packages are equal. These practices violate Google&apos;s guidelines and can result in penalties:</p>
                  <ul className="sp-redflags">
                    <li>Guaranteed first-page rankings within 30 days</li>
                    <li>Private Blog Network (PBN) link building</li>
                    <li>Hundreds of directory submissions instead of real outreach</li>
                    <li>AI-generated content published without expert review</li>
                    <li>Keyword stuffing in title tags and body copy</li>
                    <li>Hidden text or cloaking to manipulate crawlers</li>
                    <li>No reporting transparency or vague metrics</li>
                    <li>Prices below $150/month (no genuine human work possible at this rate)</li>
                  </ul>
                  <br />
                  <div className="sp-definition-box" style={{padding:'18px 20px'}}>
                    <h3 style={{marginBottom:'8px'}}>Google E-E-A-T Compliance</h3>
                    <p style={{fontSize:'13px'}}>All our SEO packages are built around Google&apos;s <strong>E-E-A-T framework</strong> (Experience, Expertise, Authoritativeness, Trustworthiness) — the quality standard Google uses to assess content in its 2024–2025 core updates and Helpful Content system.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BILLING TOGGLE ── */}
        <div className="sp-billing-wrap">
          <div className="sp-billing-sub">Choose your billing cycle</div>
          <div className="sp-billing-toggle">
            <button className={`sp-billing-btn${billing==='monthly'?' active':''}`} onClick={()=>setBilling('monthly')}>Monthly</button>
            <button className={`sp-billing-btn${billing==='annual'?' active':''}`} onClick={()=>setBilling('annual')}>Annual</button>
          </div>
          {billing==='annual' && <span className="sp-save-pill">✓ Save 20% with annual billing</span>}
        </div>

        {/* ── PACKAGES ── */}
        <section className="sp-pkg-section" id="packages" aria-labelledby="pkg-heading">
          <div className="sp-pkg-inner">
            <div style={{textAlign:'center',padding:'28px 0 24px'}}>
              <span className="sp-s-eyebrow">SEO Pricing</span>
              <h2 id="pkg-heading" className="sp-s-title">Monthly SEO Packages & Pricing</h2>
              <p className="sp-s-desc" style={{margin:'0 auto'}}>Three transparent plans — no hidden fees, no long-term contracts, no surprises. All plans include a free SEO audit at sign-up.</p>
            </div>
            <div className="sp-pkg-grid" ref={pkgGridRef}>
              {PACKAGES.map((pkg,i)=>(
                <article
                  key={pkg.id}
                  className={`sp-pkg${pkg.featured?' feat':''}${visiblePkgCards.includes(i)?' sp-pv':''}`}
                  style={{transitionDelay:`${i*120}ms`}}
                  aria-label={`${pkg.name} SEO package — $${pkg.price[billing]}/month`}
                >
                  {pkg.tag && <span className="sp-pkg-tag">{pkg.tag}</span>}
                  <div className="sp-pkg-head">
                    <div className="sp-pkg-name">{pkg.name}</div>
                    <div className="sp-pkg-desc">{pkg.desc}</div>
                    <div className="sp-price-row">
                      <div className="sp-price">${pkg.price[billing]}</div>
                      <div className="sp-price-meta">/mo{billing==='annual'?', billed annually':''}</div>
                    </div>
                    <div className="sp-price-note">
                      {billing==='annual' ? `Save $${(pkg.price.monthly - pkg.price.annual)*12}/year` : `$${pkg.price.annual}/mo with annual billing`}
                    </div>
                    <Link href="#contact" className="sp-pkg-cta">Get Started — Free Audit Included</Link>
                  </div>
                  <div className="sp-pkg-div" />
                  <div className="sp-pkg-feats">
                    <div className="sp-pkg-feats-label">What&apos;s included</div>
                    {pkg.features.map(f=>(
                      <div key={f.label} className="sp-feat-row">
                        <div className={`sp-feat-icon ${f.yes===false?'sp-feat-no':'sp-feat-yes'}`}>
                          {f.yes===false
                            ? <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" width="9" height="9"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            : <svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" width="9" height="9"><path d="M5 13l4 4L19 7"/></svg>
                          }
                        </div>
                        <div className={`sp-feat-lbl${f.yes===false?' dim':''}`}>{f.label}</div>
                        {f.value && <div className="sp-feat-val">{f.value}</div>}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p style={{textAlign:'center',fontSize:'13px',color:'#6A80A0',marginTop:'20px',paddingBottom:'52px'}}>All plans: no setup fees · cancel anytime · free SEO audit at sign-up · white-hat only</p>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="sp-compare" aria-labelledby="compare-heading">
          <div className="sp-compare-inner">
            <div className={`sp-s-reveal${visibleSections.has('cmp')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['cmp']=el;}}>
              <span className="sp-s-eyebrow">Side-by-Side Comparison</span>
              <h2 id="compare-heading" className="sp-s-title">Compare SEO Package Features</h2>
              <p className="sp-s-desc">Every deliverable, every plan — in one place. No surprises, no upsells, no hidden extras.</p>
            </div>
            <div className="sp-compare-wrap">
              <table className="sp-ctable" role="table" aria-label="SEO package feature comparison">
                <thead>
                  <tr>
                    <th scope="col">Feature</th>
                    <th scope="col">Starter<br/><small style={{fontWeight:500,color:'#4A6080'}}>$299/mo</small></th>
                    <th scope="col" className="feat-col">Professional<br/><small style={{fontWeight:500,color:'#B45309'}}>$599/mo ★</small></th>
                    <th scope="col">Enterprise<br/><small style={{fontWeight:500,color:'#4A6080'}}>$999/mo</small></th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map(row=>(
                    <tr key={row.label} className={row.highlight?'highlight':''}>
                      <td>{row.label}</td>
                      <td><TCell v={row.s} /></td>
                      <td className="feat-col"><TCell v={row.p} /></td>
                      <td><TCell v={row.e} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ── */}
        <section className="sp-included" aria-labelledby="included-heading">
          <div className="sp-included-inner">
            <div className={`sp-s-reveal${visibleSections.has('inc')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['inc']=el;}}>
              <span className="sp-s-eyebrow">Every Package Includes</span>
              <h2 id="included-heading" className="sp-s-title">Full-Stack SEO — Nothing Left Out</h2>
              <p className="sp-s-desc">Every 1Solutions SEO plan covers the complete spectrum of modern SEO. No paid add-ons. No module upgrades. Everything you need to rank is in the package.</p>
            </div>
            <div className="sp-inc-grid">
              {visibleIncluded.map(s=>(
                <div key={s.n} className="sp-inc-card">
                  <span className="sp-inc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="sp-inc-more">
              <button className="sp-btn-more" onClick={()=>setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'View All Included Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── PRICING GUIDE ── */}
        <section className="sp-guide" aria-labelledby="guide-heading">
          <div className="sp-guide-inner">
            <div className={`sp-s-reveal${visibleSections.has('gd')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['gd']=el;}}>
              <span className="sp-s-eyebrow">Monthly SEO Pricing Explained</span>
              <h2 id="guide-heading" className="sp-s-title">What Should You Pay for Monthly SEO in 2025?</h2>
              <p className="sp-s-desc">Monthly SEO pricing varies widely. Here is what different price points actually deliver — so you can make an informed decision.</p>
            </div>
            <div className="sp-guide-grid">
              {[
                { range:'$50–$150/mo', label:'Automated / DIY Tools', badge:'Avoid', badgeCls:'sp-badge-red', desc:'Mostly automated reports, keyword trackers with no human implementation. No link building, no content. Does not move rankings in competitive markets.' },
                { range:'$150–$299/mo', label:'Freelancer / Light Audit', badge:'Limited', badgeCls:'sp-badge-blue', desc:'Can work for very local, low-competition niches. Usually covers basic on-page checks only. No sustained link building or content production.' },
                { range:'$299–$999/mo', label:'Full-Service Agency (Us)', badge:'Best Value', badgeCls:'sp-badge-amber', desc:'Full-stack SEO: technical, on-page, content, and link building. Suitable for small to mid-market businesses across most industries. This is where genuine results begin.' },
                { range:'$2,000–$10,000/mo', label:'Enterprise / Competitive', badge:'High Competition', badgeCls:'sp-badge-green', desc:'National and international campaigns in very competitive markets (finance, legal, insurance, SaaS). High link velocity, large content budgets, full technical teams.' },
              ].map(t=>(
                <div key={t.range} className={`sp-gcard${t.badge==='Best Value'?' sp-gcard-us':''}`}>
                  <div className={`sp-gcard-badge ${t.badgeCls}`}>{t.badge}</div>
                  <div className="sp-gcard-range">{t.range}</div>
                  <div className="sp-gcard-label">{t.label}</div>
                  <div className="sp-gcard-desc">{t.desc}</div>
                </div>
              ))}
            </div>
            <div className="sp-definition-box" style={{marginTop:'28px',maxWidth:'860px'}}>
              <h3>Our Recommendation</h3>
              <p>For most small and mid-sized businesses, the <strong>Professional plan at $599/month</strong> provides the best return on investment — enough keyword coverage, content volume, and link velocity to see meaningful organic traffic growth within 6 months. The Starter plan at $299/month is ideal for local businesses and single-location service providers.</p>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="sp-process" aria-labelledby="process-heading">
          <div className="sp-process-inner">
            <div className={`sp-s-reveal${visibleSections.has('pr')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['pr']=el;}}>
              <span className="sp-s-eyebrow">How We Work</span>
              <h2 id="process-heading" className="sp-s-title">How We Grow Your Search Rankings</h2>
              <p className="sp-s-desc">A structured, repeatable SEO process refined over 15+ years and 500+ client engagements. Clear milestones, monthly reporting, and full transparency at every stage.</p>
            </div>
            <div className="sp-psteps">
              {[
                ['1','Free SEO Audit (Week 1)','We analyse your website — technical health, on-page quality, backlink profile, Core Web Vitals, and current keyword rankings. You receive a comprehensive audit report within 5 business days of sign-up, at no cost.'],
                ['2','Keyword Strategy (Week 2)','We identify high-intent, achievable keywords mapped to your buyer\'s journey. We research the keywords your competitors rank for, identify gaps, and create a 12-month keyword roadmap aligned to business goals — not just search volume.'],
                ['3','On-Page & Technical Fixes (Month 1)','We implement all on-page optimisations: title tags, meta descriptions, heading structures, content improvements, internal linking, schema markup, site speed fixes, and crawlability improvements across your target pages.'],
                ['4','Content & Link Building (Ongoing)','We publish SEO-targeted blog content every month and build genuine editorial backlinks through manual outreach. All links are from real, niche-relevant websites with genuine traffic — no PBNs, no spam directories.'],
                ['5','Monthly Reporting & Iteration','Every month you receive a clear report: keyword rank movements, organic traffic trends, backlinks earned, and the action plan for next month. We adapt strategy based on algorithm changes, competitor moves, and performance data.'],
              ].map(([n,title,desc],i)=>(
                <div key={n} className={`sp-pstep${visibleSections.has('pr')?' sp-vis':''}`} style={{transitionDelay:`${i*110}ms`}}>
                  <div className="sp-pstep-l">
                    <div className="sp-pstep-circle">{n}</div>
                    <div className="sp-pstep-connector" />
                  </div>
                  <div className="sp-pstep-r">
                    <h3 className="sp-pstep-title">{title}</h3>
                    <p className="sp-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="sp-testi" aria-labelledby="testi-heading">
          <div className="sp-testi-inner">
            <div className={`sp-center-head sp-s-reveal${visibleSections.has('ts')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['ts']=el;}}>
              <span className="sp-s-eyebrow">Client Reviews</span>
              <h2 id="testi-heading" className="sp-s-title">What Our SEO Clients Say</h2>
              <p style={{fontSize:'15px',color:'#4A6080'}}>Real results from real clients — no cherry-picked case studies, no inflated metrics.</p>
            </div>
            <div className="sp-tgrid" ref={testiGridRef}>
              {[
                {init:'JW',bg:'#1a4a7a',text:'"Our organic traffic grew by 340% in 9 months. We moved from page 3 to the top 3 positions for our most competitive keywords. The monthly reports are clear and the team flags issues before they become problems."',name:'Jason Wheeler',role:'CEO, HomeServices Direct — USA',feat:false},
                {init:'SB',bg:'#0F3460',text:'"We tried two other SEO agencies before 1Solutions. The difference is depth — they understand our industry, write content that actually converts, and build links that move the needle. We upgraded from Professional to Enterprise within 4 months."',name:'Sophie Brennan',role:'Marketing Director, LegalEdge — Australia',feat:true},
                {init:'RC',bg:'#2d5a8e',text:'"Our local SEO transformed completely. Google Business Profile impressions are up, we\'re appearing in the map pack for 15 new terms, and organic phone calls increased by 60% in 6 months. Outstanding ROI."',name:'Ravi Chandra',role:'Owner, MedicalSupply Plus — Canada',feat:false},
              ].map((t,i)=>(
                <article
                  key={t.name}
                  className={`sp-tcard${t.feat?' feat':''}${visibleTestiCards.includes(i)?' sp-tv':''}`}
                  style={{transitionDelay:`${i*120}ms`}}
                  itemScope itemType="https://schema.org/Review"
                >
                  <div className="sp-stars" aria-label="5 stars">★★★★★</div>
                  <p className="sp-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="sp-tauthor" itemScope itemType="https://schema.org/Person" itemProp="author">
                    <div className="sp-tavatar" style={{background:t.bg}}>{t.init}</div>
                    <div>
                      <div className="sp-tname" itemProp="name">{t.name}</div>
                      <div className="sp-trole">{t.role}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="sp-tbar" role="list">
              {[['4.9/5','Average Client Rating'],['312','Verified Reviews'],['10,000+','Keywords on Page 1'],['97%','Client Retention Rate']].map(([n,l],i,arr)=>(
                <span key={l+i} style={{display:'contents'}}>
                  <div className="sp-tbar-item" role="listitem"><div className="sp-tbar-num">{n}</div><div className="sp-tbar-label">{l}</div></div>
                  {i<arr.length-1 && <div className="sp-tbar-div" aria-hidden="true" />}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="sp-why" aria-labelledby="why-heading">
          <div className="sp-why-inner">
            <div className={`sp-s-reveal${visibleSections.has('wy')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['wy']=el;}} style={{textAlign:'center'}}>
              <span className="sp-s-eyebrow">Why 1Solutions</span>
              <h2 id="why-heading" className="sp-s-title">Why Businesses Choose Us for SEO</h2>
              <p className="sp-s-desc" style={{maxWidth:660,margin:'0 auto'}}>What separates a 15-year SEO agency from a new agency selling the same packages — and why it matters for your rankings.</p>
            </div>
            <div className="sp-why-grid" ref={whyGridRef}>
              {WHY.map((w,i)=>(
                <div key={w.title} className={`sp-wcard${visibleWhyCards.includes(i)?' sp-wv':''}`} style={{transitionDelay:`${i*75}ms`}}>
                  <div className="sp-wcard-icon">
                    <svg viewBox="0 0 24 24" width="28" height="28"><path d={w.icon}/></svg>
                  </div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="sp-contact" id="contact" aria-labelledby="contact-heading">
          <div className="sp-contact-grid">
            <div>
              <h2 className="sp-ctitle" id="contact-heading">Get a Free SEO Audit &amp; Package Recommendation</h2>
              <p className="sp-cdesc">Tell us about your business and we will send you a free technical SEO audit with a personalised package recommendation — usually within 24 hours, no commitment required.</p>
              <div className="sp-cbenefits">
                {[
                  ['✓','Free technical SEO audit of your website — crawl health, Core Web Vitals, on-page quality, backlink profile.'],
                  ['✓','Package recommendation matched to your industry, competition level, and growth targets.'],
                  ['✓','No lock-in contracts. Cancel any time. We earn your business through results.'],
                  ['✓','Response within 24 hours. Audit delivered within 2 business days.'],
                ].map(([icon,text])=>(
                  <div className="sp-cbenefit" key={text}>
                    <span className="sp-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="sp-form-box">
              <h3>Request Your Free SEO Audit</h3>
              <form className="sp-form" onSubmit={e=>e.preventDefault()}>
                <div className="sp-frow">
                  <div className="sp-fg"><label>Your Name *</label><input type="text" placeholder="Jane Smith" required /></div>
                  <div className="sp-fg"><label>Work Email *</label><input type="email" placeholder="jane@company.com" required /></div>
                </div>
                <div className="sp-frow">
                  <div className="sp-fg"><label>Phone</label><input type="tel" placeholder="+1 (555) 000-0000" /></div>
                  <div className="sp-fg"><label>Website URL</label><input type="url" placeholder="https://yoursite.com" /></div>
                </div>
                <div className="sp-fg full">
                  <label>Package Interested In</label>
                  <select>
                    <option value="">Select a package…</option>
                    <option>Starter — $299/month</option>
                    <option>Professional — $599/month</option>
                    <option>Enterprise — $999/month</option>
                    <option>Not sure — send me a recommendation</option>
                  </select>
                </div>
                <div className="sp-fg full">
                  <label>Tell us about your SEO goals</label>
                  <textarea rows="3" placeholder="e.g. We want to rank for [keywords] in the US market and grow organic leads from X to Y…" />
                </div>
                <div className="sp-consent">
                  <input type="checkbox" id="sp-con" required />
                  <label htmlFor="sp-con">I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions contacting me about SEO services.</label>
                </div>
                <button type="submit" className="sp-submit">Send My Free Audit Request →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="sp-faq" aria-labelledby="faq-heading">
          <div className="sp-faq-inner">
            <h2 id="faq-heading">Frequently Asked Questions About SEO Packages</h2>
            <p className="sp-faq-sub">Everything you need to know before choosing a monthly SEO package — answered honestly.</p>
            <div className="sp-faq-list">
              {FAQS.map((f,i)=>(
                <div key={i} className={`sp-fitem${openFaq===i?' open':''}`} itemScope itemType="https://schema.org/Question">
                  <button className="sp-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i}>
                    <span className="sp-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span itemProp="name">{f.q}</span>
                    <svg className="sp-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="sp-fanswer-wrap" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div className="sp-fanswer" itemProp="text">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="sp-related" aria-labelledby="related-heading">
          <div className="sp-related-inner">
            <span className="sp-s-eyebrow">Explore More</span>
            <h2 id="related-heading">More Ways We Can Grow Your Business</h2>
            <p className="sp-related-sub">SEO works best alongside great web development and eCommerce. Explore our full range of digital services.</p>
            <hr />
            <div className="sp-rtags">
              {[
                ['/ecommerce-website-development/','eCommerce Development','sp-rtag-amber'],
                ['/magento-development-company/','Magento Development','sp-rtag-orange'],
                ['/woocommerce-development-company/','WooCommerce Development','sp-rtag-violet'],
                ['/opencart-development-company/','OpenCart Development','sp-rtag-blue'],
                ['/laravel-development-company/','Laravel Development','sp-rtag-teal'],
                ['/drupal-development-company/','Drupal Development','sp-rtag-indigo'],
                ['/codeigniter-development-company/','CodeIgniter Development','sp-rtag-green'],
                ['/python-development-services/','Python Development','sp-rtag-blue'],
                ['/portfolio/','View Our Portfolio','sp-rtag-amber'],
                ['/contact/','Contact 1Solutions','sp-rtag-orange'],
              ].map(([href,label,cls])=>(
                <Link key={href} href={href} className={`sp-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
