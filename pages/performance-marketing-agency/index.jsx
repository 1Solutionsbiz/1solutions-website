import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Google Ads (PPC)', desc: 'Search, Display, and YouTube campaigns with full-funnel keyword strategy, Quality Score optimisation, and ROAS-focused bid management across every stage of the purchase journey.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Meta Ads (Facebook & Instagram)', desc: 'Audience-first Meta campaigns with creative testing, lookalike audiences, and Conversions API integration for accurate attribution even in a post-iOS14 privacy environment.' },
  { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', title: 'Programmatic Display', desc: 'Data-driven display advertising across premium publisher networks — audience targeting, contextual placement, and real-time bid optimisation that reaches buyers where they browse.' },
  { icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z', title: 'Paid Social (LinkedIn, TikTok, Pinterest)', desc: 'Platform-specific paid social strategies for B2B (LinkedIn) and B2C (TikTok, Pinterest) — with tailored creative formats, audience builds, and bid strategies for each channel.' },
  { icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title: 'Google Shopping & Feed Management', desc: 'Product feed optimisation, Smart Shopping and Performance Max campaigns, and Merchant Centre management that puts your products in front of high-intent buyers at the moment of purchase.' },
  { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'Retargeting & Remarketing', desc: 'Multi-platform retargeting sequences that re-engage website visitors, abandoned cart users, and video viewers across Google, Meta, and display networks — turning lost sessions into revenue.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Performance Creative & Ad Copy', desc: 'Data-driven ad creative production and copy testing — static, carousel, video, and responsive ad formats — split-tested continuously to maximise CTR, Quality Score, and conversion rate.' },
  { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Attribution & Analytics', desc: 'Multi-touch attribution modelling, GA4 conversion tracking, server-side tagging, and cross-channel reporting dashboards that show true campaign ROI — not just last-click vanity metrics.' },
];

const WHY_MATTERS = [
  { num: '$190B', label: 'Global Digital Ad Spend', desc: 'Global digital advertising spend in 2024, with performance channels (search + social) commanding 65% of total digital spend — making it the dominant marketing investment category.', source: 'eMarketer 2024' },
  { num: '4.2×', label: 'Avg. Client ROAS', desc: 'Average ROAS our clients achieve across Google and Meta campaigns, compared to the industry benchmark of 2.87× — driven by rigorous testing, attribution, and bid strategy.', source: '1Solutions client data, 2024' },
  { num: '23%', label: 'Avg. CPA Reduction', desc: 'Average reduction in cost-per-acquisition our clients see within 90 days of campaign restructure — achieved through waste elimination, audience refinement, and creative testing.', source: '1Solutions client data, 2024' },
];

const RESULTS = [
  { metric: '412%', label: 'ROAS Increase', sub: 'US eCommerce brand — Google Shopping + Meta retargeting overhaul, 6-month campaign' },
  { metric: '67%', label: 'CPL Reduction', sub: 'Australian B2B SaaS — LinkedIn + Google Search restructure and attribution fix' },
  { metric: '2.9×', label: 'Revenue Growth', sub: 'Canadian DTC brand — Meta creative testing + full-funnel attribution implementation' },
];

const PROCESS = [
  { n: '01', title: 'Account Audit & Benchmarking', desc: 'Comprehensive audit of existing campaigns, tracking setup, audience data, and competitor spend intelligence to identify waste and opportunity before a single dollar of media spend changes.' },
  { n: '02', title: 'Strategy & Channel Planning', desc: 'Multi-channel performance strategy aligned to your CAC targets, ROAS goals, and funnel stage — with budget allocation recommendations per channel based on your market and competitive landscape.' },
  { n: '03', title: 'Tracking & Attribution Setup', desc: 'GA4 conversion tracking, Meta CAPI, server-side GTM, and cross-channel attribution model implemented before launch — so every decision is grounded in accurate, deduplicated data from day one.' },
  { n: '04', title: 'Campaign Build & Launch', desc: 'Campaigns built to best-practice structure — ad groups, audience segments, negative keyword lists, bidding strategy — then launched with controlled spend scaling to gather clean data before scaling.' },
  { n: '05', title: 'Optimise & A/B Test', desc: 'Weekly bid adjustments, audience refinements, creative rotation, and A/B tests on copy, landing pages, and offers — continuously compounding performance improvements across every active channel.' },
  { n: '06', title: 'Report & Scale', desc: 'Monthly performance reviews with full attribution data, CAC/ROAS trend analysis, and scaling recommendations for the highest-performing channels, audiences, and creatives in your account.' },
];

const WHY = [
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'ROAS-First Mindset', desc: 'Every campaign decision is evaluated against one metric: return on ad spend. We do not optimise for impressions, clicks, or vanity metrics that do not tie to your revenue.' },
  { icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', title: 'Full-Funnel Coverage', desc: 'We run campaigns across the complete acquisition funnel — awareness, consideration, and conversion — ensuring no stage of the customer journey leaks spend or loses momentum.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Creative + Media Combined', desc: 'Performance marketing lives or dies on ad creative. We combine media buying expertise with in-house creative strategy and copy testing — most agencies separate these; we integrate them.' },
  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 16v-1m0-6v1m-7-5h.01M19 12h.01', title: 'Zero Wasted Spend', desc: 'Rigorous negative keyword management, audience exclusions, dayparting, and placement exclusions ensure every dollar works. Our audits routinely find 20–35% wasted spend in new client accounts.' },
  { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Transparent Attribution', desc: 'We implement accurate multi-touch attribution before launch so you know exactly which campaigns, audiences, and creatives are driving revenue — not just clicks and assisted conversions.' },
  { icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', title: 'Month-to-Month Flexibility', desc: 'No 12-month lock-ins. We earn your budget every month. Stay because results are real and compounding — not because you are contractually obligated to an agency that stopped performing.' },
];

const TOOLS = ['Google Ads', 'Meta Ads Manager', 'Google Analytics 4', 'Google Tag Manager', 'Google Merchant Centre', 'LinkedIn Campaign Manager', 'TikTok Ads Manager', 'Microsoft Advertising', 'Semrush', 'Klaviyo', 'Hotjar', 'Looker Studio'];

const INDUSTRIES = ['eCommerce & Retail', 'SaaS & Software', 'B2B Lead Generation', 'Healthcare & Wellness', 'Finance & Fintech', 'Travel & Hospitality', 'Education & eLearning', 'Legal Services', 'Real Estate', 'Home Services', 'Subscription Businesses', 'Agencies & Resellers'];

const FAQS = [
  { q: 'What is performance marketing?', a: 'Performance marketing is a category of digital advertising where advertisers pay only for specific, measurable results — clicks, leads, sales, app installs, or other defined actions — rather than for impressions or reach alone. It encompasses Google Ads (paid search), Meta Ads (Facebook and Instagram), programmatic display, paid social (LinkedIn, TikTok, Pinterest), Google Shopping, and retargeting. The defining characteristic is accountability: every pound or dollar of media spend is tied to a trackable outcome, and campaigns are continuously optimised to improve cost-per-result. Performance marketing contrasts with brand marketing, which prioritises awareness and sentiment over direct, attributable returns.' },
  { q: 'What is the difference between performance marketing and brand marketing?', a: 'Performance marketing and brand marketing serve different objectives and operate on different timescales. Performance marketing is directly accountable — it generates measurable outcomes (clicks, leads, sales) within a defined budget, and results are visible in days or weeks. It is ideal for businesses that need predictable, scalable revenue acquisition. Brand marketing focuses on awareness, perception, and long-term equity — it is harder to attribute directly but builds the trust and recognition that makes performance channels more efficient over time. The most effective digital strategies combine both: brand investment raises the ceiling of what performance channels can achieve, while performance channels deliver the short-term returns that fund brand spend. Most SMBs and scale-ups should prioritise performance first, then layer brand once their acquisition economics are proven.' },
  { q: 'What ROAS should I expect from Google Ads?', a: 'ROAS (return on ad spend) benchmarks vary significantly by industry, product margin, and funnel complexity. Industry averages across Google Ads typically range from 2× to 4× — meaning £2 to £4 revenue returned for every £1 spent on ads. eCommerce brands with physical products often target 3×–6× ROAS. B2B lead generation is measured differently — usually by cost-per-lead or cost-per-opportunity rather than direct ROAS. Our clients achieve an average of 4.2× ROAS across Google and Meta campaigns, compared to the industry benchmark of 2.87×. However, ROAS targets must be set relative to your product margin: a business with 70% gross margin can sustain 2× ROAS profitably; a business with 20% margin needs 5× or higher to break even on ad spend. We calculate your target ROAS based on your unit economics before setting any campaign benchmarks.' },
  { q: 'How much budget do I need to start performance marketing?', a: 'The minimum viable budget for meaningful performance marketing results depends on your channel mix and market. For Google Search Ads in competitive categories, we recommend a minimum of $1,500–$3,000/month to gather statistically meaningful data within a reasonable timeframe. Meta Ads can start at $1,000–$2,000/month for initial testing. Below these thresholds, the data volume is too low to optimise effectively — you end up making decisions based on statistical noise. For Google Shopping and Performance Max, budget requirements scale with catalogue size and category competition. Most of our clients start at $3,000–$10,000/month total ad spend, with management fees on top. We provide a budget recommendation as part of our free account audit so you know the investment required before committing.' },
  { q: 'What is the difference between Google Search Ads and Google Display Ads?', a: 'Google Search Ads appear in Google search results when a user actively searches for a specific keyword — they target intent. Users see your ad because they are actively looking for what you offer, making Search the highest-converting paid channel for most businesses. Google Display Ads appear across Google\'s network of 2 million+ websites, apps, and YouTube — they target audiences. Users see your ad while browsing other content, based on their interests, demographics, or previous site visits. Search is best for capturing existing demand (people already looking for your product). Display is best for creating new demand, retargeting lost visitors, and reaching users earlier in the purchase journey. Most effective campaigns use both: Search to capture high-intent queries, Display and YouTube to nurture and retarget the wider audience.' },
  { q: 'How does Meta advertising attribution work?', a: 'Meta (Facebook and Instagram) advertising attribution works by tracking user interactions with your ads — clicks and views — and attributing downstream conversions back to those interactions within a defined attribution window. The default Meta attribution window is 7-day click and 1-day view: if a user clicks your ad and converts within 7 days, or views your ad and converts within 1 day, Meta credits the conversion to that ad. Since Apple\'s iOS14 privacy update, Meta\'s pixel-based tracking has significant gaps — users who opt out of tracking are not attributable via the browser pixel alone. Meta\'s Conversions API (CAPI) addresses this by sending conversion data server-side, bypassing browser restrictions. We implement CAPI alongside the standard pixel for all clients, typically recovering 15–30% of conversions that would otherwise be lost to iOS privacy restrictions.' },
  { q: 'What is retargeting and why does it matter?', a: 'Retargeting (also called remarketing) is a form of online advertising that targets users who have previously visited your website, engaged with your app, or interacted with your brand — showing them relevant ads as they browse other platforms. It matters because most users do not convert on their first visit: the average eCommerce conversion rate is 2–4%, meaning 96–98% of visitors leave without purchasing. Retargeting brings these warm audiences back with relevant messaging — abandoned cart reminders, product view follow-ups, or offer-based incentives — at a fraction of the cost of acquiring new users. Retargeting audiences consistently outperform cold prospecting audiences on click-through rate, conversion rate, and ROAS. We build multi-stage retargeting sequences across Google Display, YouTube, Meta, and LinkedIn that systematically re-engage lost visitors through the full purchase funnel.' },
  { q: 'How long does it take to see results from paid advertising?', a: 'Paid advertising delivers much faster initial results than organic channels like SEO — you can see clicks and conversions within hours of a campaign going live. However, meaningful, optimised results typically take 60–90 days to emerge. This is because Google and Meta\'s machine learning algorithms require a learning period — typically 50+ conversions per ad set within a 7-day window — before their smart bidding systems can optimise delivery effectively. During the learning phase (usually weeks 1–4), performance is often volatile and cost-per-result is higher. By weeks 5–8, algorithms stabilise and optimisation decisions compound. By month 3, campaigns are operating with sufficient data for reliable creative testing, audience segmentation, and bid strategy refinement. We set honest expectations upfront: week 1–4 is data collection and learning; month 2–3 is optimisation and scaling.' },
  { q: 'What is Google Performance Max and should I use it?', a: "Google Performance Max (PMax) is a goal-based campaign type that runs across all Google channels — Search, Display, YouTube, Gmail, Discover, and Maps — from a single campaign. It uses Google's machine learning to optimise asset delivery and bidding across all surfaces simultaneously. PMax is worth using if: you have clear conversion tracking in GA4, you have a sufficient asset library (headlines, descriptions, images, videos), and your account generates enough conversion volume for the algorithm to learn (50+ conversions/month). It is NOT a replacement for standard Search campaigns for high-intent branded and competitor keywords — PMax's auction transparency is limited, and manual Search campaigns give you more control over keyword-level bids and match types. We typically run PMax alongside Search campaigns, using Search for brand and high-intent terms and PMax for broader discovery and retargeting coverage." },
  { q: 'How do you measure performance marketing ROI?', a: 'We measure performance marketing ROI through a layered attribution framework that goes beyond last-click metrics. Primary KPIs depend on your business model: eCommerce clients use ROAS (revenue divided by ad spend) and new customer acquisition cost; B2B lead generation clients use cost-per-lead, cost-per-qualified-opportunity, and pipeline influenced by paid channels. We set up GA4 goal tracking for all conversion actions, implement Meta CAPI for server-side attribution, and build a unified Looker Studio dashboard that shows performance across all channels in one view. Monthly reporting covers: ad spend by channel, conversion volume, cost-per-result, ROAS trend, and revenue attribution. We also track view-through conversions and assisted conversions to capture the full value of upper-funnel spend that does not appear in last-click attribution models.' },
  { q: 'Can performance marketing work for B2B businesses?', a: 'Yes — performance marketing is highly effective for B2B, but the strategy differs significantly from B2C. B2B buying cycles are longer (weeks to months), decision-making involves multiple stakeholders, and the conversion event is typically a form submission or demo request rather than a purchase. LinkedIn Ads is the primary B2B performance channel — it offers precise professional targeting (job title, company size, industry, seniority) that Google and Meta cannot match for B2B audiences. Google Search is also highly effective for capturing B2B intent queries. For B2B, we focus on: LinkedIn Lead Gen Forms and Message Ads for top-of-funnel, Google Search for branded and category-intent keywords, retargeting across both platforms to nurture the long buying cycle, and content offers (whitepapers, case studies, webinars) as conversion assets rather than direct product CTAs. B2B performance marketing KPIs we optimise against: cost-per-lead, cost-per-SQL, and pipeline influenced.' },
  { q: 'What happens to my campaigns if I pause spend?', a: 'Pausing ad spend has different implications depending on the channel and duration of the pause. For Google Ads: campaigns paused for less than 2 weeks typically resume with minimal learning loss — the auction algorithms retain their optimisation data. Pauses of 4+ weeks can reset machine learning, requiring a partial re-learning period when campaigns restart. For Meta Ads: ad sets enter a new learning phase when reactivated — this can mean 7–14 days of elevated costs while the algorithm re-establishes delivery optimisation. Campaign history (creative performance data, audience exclusions, negative keywords) is always retained regardless of pause duration. The practical impact on ROAS: expect 15–30% performance degradation for the first 2–3 weeks after reactivation. For seasonal businesses or those with intermittent budgets, we structure campaigns specifically to minimise re-learning costs on restart.' },
];

export default function PerformanceMarketingAgency() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [formSt, setFormSt] = useState('idle');
  const sectionRefs = useRef({});
  const recaptchaLoaded = useRef(false);

  useEffect(() => {
    if (!recaptchaLoaded.current) {
      const s = document.createElement('script');
      s.src = 'https://www.google.com/recaptcha/api.js?render=6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';
      s.async = true;
      document.head.appendChild(s);
      recaptchaLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisibleSections(prev => new Set([...prev, key])); obs.disconnect(); } },
        { threshold: 0.10 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormSt('submitting');
    try {
      const token = await window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'pm_contact' });
      const fd = new FormData(e.target);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('pm-name'),
          email: fd.get('pm-email'),
          phone: `${fd.get('pm-cc') || ''} ${fd.get('pm-phone') || ''}`.trim(),
          company: fd.get('pm-company'),
          message: `Monthly Ad Budget: ${fd.get('pm-budget') || 'Not specified'}\n\nWhat they need help with:\n${fd.get('pm-message')}`,
          service: 'Performance Marketing',
          source: 'Performance Marketing Agency Page',
          consent: true,
          recaptchaToken: token,
        }),
      });
      if (res.ok) { setFormSt('success'); e.target.reset(); } else { setFormSt('error'); }
    } catch { setFormSt('error'); }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'Digital Marketing Services', item: 'https://www.1solutions.biz/digital-marketing-services/' },
          { '@type': 'ListItem', position: 3, name: 'Performance Marketing Agency', item: 'https://www.1solutions.biz/performance-marketing-agency/' },
        ],
      },
      {
        '@type': 'LocalBusiness',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: 'https://www.1solutions.biz/images/1solutions-logo.png',
        sameAs: ['https://www.linkedin.com/company/1solutions/', 'https://x.com/1solutionsbiz', 'https://www.facebook.com/1solutionsbiz'],
        address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '142', bestRating: '5' },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.1solutions.biz/performance-marketing-agency/',
        url: 'https://www.1solutions.biz/performance-marketing-agency/',
        name: 'Performance Marketing Agency | Google Ads, Meta Ads & Paid Social | 1Solutions',
        description: 'Expert performance marketing agency — Google Ads, Meta Ads, programmatic display, paid social, and shopping campaigns. Trusted by 200+ businesses for measurable ROI. Get a free audit.',
        dateModified: '2026-07-06',
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfessionalService',
        name: 'Performance Marketing Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        serviceType: 'Performance Marketing',
        url: 'https://www.1solutions.biz/performance-marketing-agency/',
        description: 'Full-service performance marketing agency offering Google Ads, Meta Ads, programmatic display, paid social, Google Shopping, retargeting, and attribution services for eCommerce and B2B businesses.',
        areaServed: ['US', 'CA', 'AU', 'GB'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Performance Marketing Services',
          itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'ProfessionalService', name: s.title } })),
        },
      },
      {
        '@type': 'HowTo',
        name: 'Our Performance Marketing Process',
        description: 'Our 6-step performance marketing methodology for delivering compounding ROAS improvements.',
        step: PROCESS.map(p => ({ '@type': 'HowToStep', name: p.title, text: p.desc })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Performance Marketing Agency | Google Ads, Meta Ads &amp; Paid Social | 1Solutions</title>
        <meta name="description" content="Expert performance marketing agency — Google Ads, Meta Ads, programmatic display, paid social, and shopping campaigns. Trusted by 200+ businesses for measurable ROI. Get a free audit." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/performance-marketing-agency/" />
        <meta property="og:title" content="Performance Marketing Agency | 1Solutions" />
        <meta property="og:description" content="Data-driven performance marketing — Google Ads, Meta Ads, retargeting, and shopping campaigns optimised for measurable ROI. 200+ clients, 4.2× avg ROAS. Free account audit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.1solutions.biz/performance-marketing-agency/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-performance-marketing-agency.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Performance Marketing Agency — Google Ads, Meta Ads &amp; paid social for measurable ROI" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-performance-marketing-agency.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Performance Marketing Agency — Google Ads, Meta Ads &amp; paid social for measurable ROI" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          /* ── BASE ── */
          .pm-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;overflow-x:hidden;position:relative}
          .pm-page *,.pm-page *::before,.pm-page *::after{box-sizing:border-box}

          /* ── ORBS ── */
          .pm-orb1{position:fixed;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.30) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px)}
          .pm-orb2{position:fixed;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.25) 0%,rgba(245,158,11,0.12) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px)}
          .pm-orb3{position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px)}

          /* ── REVEAL ── */
          .pm-reveal{opacity:0;transform:translateY(28px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1)}
          .pm-visible{opacity:1;transform:translateY(0)}

          /* ── SECTIONS ── */
          .pm-sec{padding:80px 40px;position:relative;z-index:1}
          .pm-white{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08)}
          .pm-sec-in{max-width:1280px;margin:0 auto}
          .pm-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:10px}
          .pm-sec-ttl{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-0.5px;color:#0F1F40;margin-bottom:12px}
          .pm-sec-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}

          /* ── GLASS CARD ── */
          .pm-glass{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95)}

          /* ── DEFINITION ── */
          .pm-def-intro{font-size:16px;color:#4A6080;line-height:1.75;max-width:800px;margin:0 auto 44px;text-align:center}
          .pm-def-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .pm-def-card{padding:32px 28px}
          .pm-def-icon{width:44px;height:44px;background:linear-gradient(135deg,#0F3460,#1d4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .pm-def-card h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .pm-def-card p{font-size:14px;color:#4A6080;line-height:1.7;margin:0}

          /* ── WHY MATTERS ── */
          .pm-wm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:44px}
          .pm-wm-card{padding:36px 28px;text-align:center}
          .pm-wm-num{font-size:clamp(2.4rem,5vw,3.6rem);font-weight:900;color:#D97706;letter-spacing:-2px;line-height:1;margin-bottom:8px}
          .pm-wm-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#0F3460;margin-bottom:12px}
          .pm-wm-desc{font-size:14px;color:#4A6080;line-height:1.65;margin:0}
          .pm-wm-src{font-size:11px;color:#9ca3af;margin-top:10px;font-style:italic}

          /* ── SERVICES GRID ── */
          .pm-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
          .pm-svc-card{padding:28px 24px;position:relative;overflow:hidden;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s}
          .pm-svc-card:hover{transform:translateY(-6px);border-color:rgba(217,119,6,0.30);box-shadow:0 16px 48px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1)}
          .pm-svc-num{position:absolute;top:8px;right:14px;font-size:68px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;letter-spacing:-4px;pointer-events:none;user-select:none}
          .pm-svc-icon{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1d4b82);border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .pm-svc-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;line-height:1.3}
          .pm-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}

          /* ── RESULTS (DARK) ── */
          .pm-results{background:linear-gradient(135deg,#071e3d 0%,#0F3460 40%,#0a2549 100%);padding:80px 40px;position:relative;z-index:1;overflow:hidden}
          .pm-results::before{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.08) 0%,transparent 70%);top:-200px;right:-100px;pointer-events:none}
          .pm-results-in{max-width:1280px;margin:0 auto}
          .pm-results-hdr{text-align:center;margin-bottom:52px}
          .pm-results-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:10px}
          .pm-results-ttl{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;color:#fff;line-height:1.15;letter-spacing:-0.5px;margin:0}
          .pm-results-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .pm-rcard{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);border-radius:20px;padding:40px 28px;text-align:center;backdrop-filter:blur(8px);transition:background 0.22s,border-color 0.22s}
          .pm-rcard:hover{background:rgba(255,255,255,0.10);border-color:rgba(217,119,6,0.40)}
          .pm-rcard-metric{font-size:clamp(2.8rem,5vw,4rem);font-weight:900;color:#D97706;letter-spacing:-2px;line-height:1;margin-bottom:10px}
          .pm-rcard-label{font-size:14px;font-weight:700;color:#fff;margin-bottom:8px}
          .pm-rcard-sub{font-size:13px;color:rgba(255,255,255,0.55);line-height:1.6;margin:0}

          /* ── PROCESS ── */
          .pm-proc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:44px}
          .pm-proc-card{padding:28px 24px}
          .pm-proc-badge{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:linear-gradient(135deg,#0F3460,#D97706);border-radius:10px;font-size:13px;font-weight:800;color:#fff;margin-bottom:14px}
          .pm-proc-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;line-height:1.3}
          .pm-proc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}

          /* ── TOOLS ── */
          .pm-tools{background:linear-gradient(135deg,#0F3460 0%,#1a3a6e 50%,#0F3460 100%);padding:60px 40px;position:relative;z-index:1}
          .pm-tools-in{max-width:1280px;margin:0 auto;text-align:center}
          .pm-tools h2{font-size:clamp(1.6rem,3vw,2.2rem);font-weight:900;color:#fff;margin-bottom:8px}
          .pm-tools-sub{font-size:14px;color:rgba(255,255,255,0.65);margin:0 0 32px}
          .pm-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .pm-pill{background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff;transition:background 0.2s,border-color 0.2s}
          .pm-pill:hover{background:rgba(217,119,6,0.25);border-color:rgba(217,119,6,0.50)}

          /* ── WHY US ── */
          .pm-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .pm-why-card{padding:28px 24px;transition:transform 0.22s,border-color 0.22s,box-shadow 0.22s}
          .pm-why-card:hover{transform:translateY(-4px);border-color:rgba(217,119,6,0.25);box-shadow:0 12px 36px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .pm-why-icon{width:40px;height:40px;background:linear-gradient(135deg,rgba(15,52,96,0.08),rgba(217,119,6,0.10));border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
          .pm-why-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .pm-why-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}

          /* ── INDUSTRIES ── */
          .pm-ind-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:36px}
          .pm-ind-pill{background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.85);border-radius:50px;padding:10px 20px;font-size:13px;font-weight:600;color:#0F3460;transition:all 0.22s}
          .pm-ind-pill:hover{background:rgba(217,119,6,0.08);border-color:rgba(217,119,6,0.25);color:#B45309}

          /* ── CONTACT ── */
          .pm-contact{padding:80px 40px;position:relative;z-index:1}
          .pm-contact-in{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1.4fr;gap:52px;align-items:start}
          .pm-contact-left h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#0F1F40;margin-bottom:16px;line-height:1.2}
          .pm-contact-left p{font-size:15px;color:#4A6080;line-height:1.7;margin-bottom:28px}
          .pm-trust-list{list-style:none;padding:0;margin:0 0 32px;display:flex;flex-direction:column;gap:10px}
          .pm-trust-list li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#374151;line-height:1.5}
          .pm-trust-check{width:20px;height:20px;background:rgba(217,119,6,0.10);border:1.5px solid rgba(217,119,6,0.35);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
          .pm-contact-stats{display:flex;gap:24px;flex-wrap:wrap}
          .pm-cstat{text-align:center}
          .pm-cstat-v{font-size:1.6rem;font-weight:900;color:#D97706;letter-spacing:-1px;line-height:1}
          .pm-cstat-l{font-size:12px;color:#6b7280;margin-top:4px}
          .pm-form-box{padding:36px 32px}
          .pm-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
          .pm-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
          .pm-field label{font-size:13px;font-weight:600;color:#374151}
          .pm-field input,.pm-field select,.pm-field textarea{width:100%;padding:11px 14px;border:1.5px solid rgba(15,52,96,0.15);border-radius:10px;font-size:14px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.85);outline:none;transition:border-color 0.2s,box-shadow 0.2s}
          .pm-field input:focus,.pm-field select:focus,.pm-field textarea:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,0.12)}
          .pm-field textarea{resize:vertical;min-height:100px}
          .pm-phone-row{display:grid;grid-template-columns:90px 1fr;gap:8px}
          .pm-consent{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#4A6080;line-height:1.5;margin-bottom:18px}
          .pm-consent input{margin-top:3px;flex-shrink:0;accent-color:#D97706}
          .pm-submit{width:100%;padding:14px;background:#0F3460;color:#fff;border:none;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;transition:all 0.25s;display:flex;align-items:center;justify-content:center;gap:8px}
          .pm-submit:hover:not(:disabled){background:#0a2549;transform:translateY(-2px);box-shadow:0 8px 24px rgba(15,52,96,0.30)}
          .pm-submit:disabled{opacity:0.6;cursor:not-allowed}
          .pm-success{background:rgba(34,197,94,0.10);border:1px solid rgba(34,197,94,0.30);border-radius:14px;padding:20px 24px;text-align:center;color:#15803D;font-weight:600;font-size:15px}
          .pm-error{background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:14px;padding:16px 20px;text-align:center;color:#DC2626;font-size:14px;margin-top:12px}

          /* ── FAQ ── */
          .pm-faq-list{display:flex;flex-direction:column;gap:12px}
          .pm-fitem{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s;position:relative}
          .pm-fitem.open{border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1)}
          .pm-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px}
          .pm-fq{width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative}
          .pm-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s}
          .pm-fitem.open .pm-fq-badge{background:#D97706;color:#fff}
          .pm-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45}
          .pm-fitem.open .pm-fq-text{color:#D97706}
          .pm-fq-chevron{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s}
          .pm-fitem.open .pm-fq-chevron{transform:rotate(180deg);color:#D97706}
          .pm-fa{font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px}

          /* ── RELATED ── */
          .pm-related{background:rgba(237,233,254,.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60);padding:80px 40px;position:relative;z-index:1}
          .pm-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .pm-related-ey{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block}
          .pm-related-ttl{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px}
          .pm-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px}
          .pm-related-divider{border:none;border-top:1px solid rgba(15,52,96,.12);margin:40px 0}
          .pm-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
          .pm-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .25s}
          .pm-rtag:hover{filter:brightness(.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.10)}
          .pm-rtag-blue{background:rgba(59,130,246,.10);border-color:rgba(59,130,246,.30);color:#1D4ED8}
          .pm-rtag-amber{background:rgba(245,158,11,.12);border-color:rgba(245,158,11,.35);color:#B45309}
          .pm-rtag-violet{background:rgba(139,92,246,.10);border-color:rgba(139,92,246,.30);color:#6D28D9}
          .pm-rtag-teal{background:rgba(20,184,166,.10);border-color:rgba(20,184,166,.30);color:#0F766E}
          .pm-rtag-green{background:rgba(34,197,94,.10);border-color:rgba(34,197,94,.28);color:#15803D}
          .pm-rtag-rose{background:rgba(244,63,94,.10);border-color:rgba(244,63,94,.28);color:#BE123C}
          .pm-rtag-orange{background:rgba(249,115,22,.10);border-color:rgba(249,115,22,.30);color:#C2410C}
          .pm-rtag-cyan{background:rgba(6,182,212,.10);border-color:rgba(6,182,212,.28);color:#0E7490}
          .pm-rtag-sky{background:rgba(14,165,233,.10);border-color:rgba(14,165,233,.28);color:#0369A1}
          .pm-rtag-indigo{background:rgba(99,102,241,.10);border-color:rgba(99,102,241,.28);color:#4338CA}
          .pm-rtag-slate{background:rgba(100,116,139,.10);border-color:rgba(100,116,139,.28);color:#334155}
          .pm-rtag-lime{background:rgba(132,204,22,.10);border-color:rgba(132,204,22,.28);color:#3F6212}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){
            .pm-def-grid,.pm-results-grid{grid-template-columns:1fr}
            .pm-svc-grid,.pm-proc-grid,.pm-why-grid{grid-template-columns:repeat(2,1fr)}
            .pm-wm-grid{grid-template-columns:1fr}
            .pm-contact-in{grid-template-columns:1fr}
            .pm-related-ttl{font-size:32px}
          }
          @media(max-width:768px){
            .pm-sec,.pm-results,.pm-tools,.pm-contact,.pm-related{padding-left:24px;padding-right:24px}
            .pm-svc-grid,.pm-proc-grid,.pm-why-grid{grid-template-columns:1fr}
            .pm-form-row{grid-template-columns:1fr}
            .pm-fq{padding:18px 18px 18px 52px}
            .pm-fq-text{font-size:14px}
            .pm-fa{padding:0 18px 18px 52px;font-size:13px}
            .pm-fq-badge{left:14px}
            .pm-related-ttl{font-size:26px}
            .pm-related-tags{gap:8px}
            .pm-rtag{padding:9px 16px;font-size:13px}
          }
          @media(max-width:480px){
            .pm-contact-stats{justify-content:center}
          }
        `}</style>
      </Head>

      <div className="pm-page">
        <div className="pm-orb1" />
        <div className="pm-orb2" />
        <div className="pm-orb3" />

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="Performance Marketing Agency · Google · Meta · LinkedIn · TikTok"
          title={<><AuroraText>Performance Marketing</AuroraText> Agency — Pay for Results, Not Promises</>}
          subtext="Data-driven Google Ads, Meta Ads, programmatic display, paid social, and shopping campaigns — managed by a team that ties every pound of media spend to measurable revenue. Trusted by 200+ businesses across the US, Canada, Australia, and the UK."
          primaryCta={{ label: 'Get a Free Account Audit', href: '#contact' }}
          secondaryCta={{ label: 'View Case Studies', href: '/case-studies/' }}
          stats={[
            { label: 'Campaigns Managed', value: '200', suffix: '+' },
            { label: 'Avg. Client ROAS', value: '2', prefix: '4.', suffix: '×' },
            { label: 'Ad Spend Managed', value: '50', prefix: '$', suffix: 'M+' },
            { label: 'Client Retention', value: '97', suffix: '%' },
          ]}
        />

        {/* ── DEFINITION ── */}
        <section className="pm-sec pm-white">
          <div className="pm-sec-in">
            <div
              className={`pm-reveal${visibleSections.has('def') ? ' pm-visible' : ''}`}
              ref={el => { sectionRefs.current['def'] = el; }}
              style={{textAlign:'center'}}
            >
              <span className="pm-sec-ey">What We Do</span>
              <h2 className="pm-sec-ttl">What Is Performance Marketing?</h2>
            </div>
            <p className="pm-def-intro">
              Performance marketing is digital advertising where you pay for results — clicks, leads, sales, or app installs — not reach or impressions. Every campaign is measurable, attributable, and optimised against your specific revenue targets. It covers Google Ads, Meta Ads, paid social, programmatic display, Google Shopping, and retargeting, all tied together by a unified attribution framework that shows which channels, audiences, and creatives are genuinely driving revenue.
            </p>
            <div className="pm-def-grid">
              {[
                { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Pay for Results, Not Promises', desc: 'Performance marketing aligns agency incentives with client outcomes. Every pound or dollar of media spend is tied to a measurable action — purchase, lead, or sign-up — not a reach figure or brand awareness score.' },
                { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Full-Funnel Attribution', desc: 'Modern performance marketing covers the entire customer journey with cross-channel attribution — so you know exactly what is driving revenue, not just what is generating clicks or assisted impressions.' },
                { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', title: 'Multi-Channel Orchestration', desc: 'The best ROAS comes from coordinated campaigns across Search, Social, Display, and Shopping — not isolated channel silos. We build unified strategies where each channel plays its role in the funnel.' },
              ].map(c => (
                <div key={c.title} className="pm-glass pm-def-card">
                  <div className="pm-def-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon}/></svg>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY IT MATTERS ── */}
        <section className="pm-sec">
          <div className="pm-sec-in">
            <div
              className={`pm-reveal${visibleSections.has('wm') ? ' pm-visible' : ''}`}
              ref={el => { sectionRefs.current['wm'] = el; }}
              style={{textAlign:'center',marginBottom:0}}
            >
              <span className="pm-sec-ey">The Numbers</span>
              <h2 className="pm-sec-ttl">Why Performance Marketing Matters</h2>
              <p className="pm-sec-desc" style={{margin:'0 auto 0'}}>The data behind why businesses are shifting budget to performance channels — and why the quality of execution separates average and exceptional returns.</p>
            </div>
            <div className="pm-wm-grid">
              {WHY_MATTERS.map(w => (
                <div key={w.num} className="pm-glass pm-wm-card">
                  <div className="pm-wm-num">{w.num}</div>
                  <div className="pm-wm-label">{w.label}</div>
                  <p className="pm-wm-desc">{w.desc}</p>
                  <p className="pm-wm-src">Source: {w.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="pm-sec pm-white">
          <div className="pm-sec-in">
            <div
              className={`pm-reveal${visibleSections.has('svc') ? ' pm-visible' : ''}`}
              ref={el => { sectionRefs.current['svc'] = el; }}
            >
              <span className="pm-sec-ey">What We Deliver</span>
              <h2 className="pm-sec-ttl">Performance Marketing Services</h2>
              <p className="pm-sec-desc">From Google Search to Meta Shopping to programmatic display — a full-service performance marketing capability under one roof, managed as an integrated strategy not a collection of siloed channel campaigns.</p>
            </div>
            <div className="pm-svc-grid">
              {SERVICES.map((s, i) => (
                <div key={s.title} className="pm-glass pm-svc-card">
                  <div className="pm-svc-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="pm-svc-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS (DARK) ── */}
        <section className="pm-results">
          <div className="pm-results-in">
            <div className="pm-results-hdr">
              <span className="pm-results-ey">Client Results</span>
              <h2 className="pm-results-ttl">Real Performance. Real Numbers.</h2>
            </div>
            <div className="pm-results-grid">
              {RESULTS.map(r => (
                <div key={r.metric} className="pm-rcard">
                  <div className="pm-rcard-metric">{r.metric}</div>
                  <div className="pm-rcard-label">{r.label}</div>
                  <p className="pm-rcard-sub">{r.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="pm-sec pm-white">
          <div className="pm-sec-in">
            <div
              className={`pm-reveal${visibleSections.has('proc') ? ' pm-visible' : ''}`}
              ref={el => { sectionRefs.current['proc'] = el; }}
            >
              <span className="pm-sec-ey">How We Work</span>
              <h2 className="pm-sec-ttl">Our Performance Marketing Process</h2>
              <p className="pm-sec-desc">Audit to strategy to launch to optimise — a systematic six-step methodology that eliminates wasted spend and compounds performance improvements month over month.</p>
            </div>
            <div className="pm-proc-grid">
              {PROCESS.map(p => (
                <div key={p.n} className="pm-glass pm-proc-card">
                  <div className="pm-proc-badge">{p.n}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section className="pm-tools">
          <div className="pm-tools-in">
            <h2>Tools &amp; Technology Stack</h2>
            <p className="pm-tools-sub">The platforms and software we use to build, launch, optimise, and report on performance marketing campaigns.</p>
            <div className="pm-pills">
              {TOOLS.map(t => <span key={t} className="pm-pill">{t}</span>)}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="pm-sec pm-white">
          <div className="pm-sec-in">
            <div
              className={`pm-reveal${visibleSections.has('why') ? ' pm-visible' : ''}`}
              ref={el => { sectionRefs.current['why'] = el; }}
            >
              <span className="pm-sec-ey">Why 1Solutions</span>
              <h2 className="pm-sec-ttl">Performance Marketing That Earns Its Budget</h2>
              <p className="pm-sec-desc">Six reasons why 200+ businesses across the US, Canada, Australia, and the UK trust us with their paid media spend — and why 97% stay beyond the first year.</p>
            </div>
            <div className="pm-why-grid">
              {WHY.map(w => (
                <div key={w.title} className="pm-glass pm-why-card">
                  <div className="pm-why-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="pm-sec">
          <div className="pm-sec-in" style={{textAlign:'center'}}>
            <div
              className={`pm-reveal${visibleSections.has('ind') ? ' pm-visible' : ''}`}
              ref={el => { sectionRefs.current['ind'] = el; }}
            >
              <span className="pm-sec-ey">Industries We Serve</span>
              <h2 className="pm-sec-ttl">Performance Marketing Across Every Sector</h2>
              <p className="pm-sec-desc" style={{margin:'0 auto'}}>We have run profitable performance marketing campaigns across a wide range of industries and business models — B2C, B2B, eCommerce, SaaS, and lead generation.</p>
            </div>
            <div className="pm-ind-grid">
              {INDUSTRIES.map(ind => <span key={ind} className="pm-ind-pill">{ind}</span>)}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="pm-sec pm-white pm-contact" id="contact">
          <div className="pm-contact-in">
            <div className="pm-contact-left">
              <div
                className={`pm-reveal${visibleSections.has('contact') ? ' pm-visible' : ''}`}
                ref={el => { sectionRefs.current['contact'] = el; }}
              >
                <h2>Get Your Free Performance Marketing Audit</h2>
                <p>We will review your existing campaigns (or your market if you are starting fresh), identify where budget is being wasted, and give you a prioritised action plan — no obligation, delivered within 24 hours.</p>
                <ul className="pm-trust-list">
                  {['Free account audit — no strings attached','No long-term contracts, month-to-month flexibility','US, Canada, Australia &amp; UK coverage','Reply within 24 business hours','Dedicated account manager from day one'].map(item => (
                    <li key={item}>
                      <div className="pm-trust-check">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <span dangerouslySetInnerHTML={{__html: item}} />
                    </li>
                  ))}
                </ul>
                <div className="pm-contact-stats">
                  {[['200+','Campaigns'],['4.2×','Avg ROAS'],['97%','Retention']].map(([v,l]) => (
                    <div key={l} className="pm-cstat">
                      <div className="pm-cstat-v">{v}</div>
                      <div className="pm-cstat-l">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pm-glass pm-form-box">
              {formSt === 'success' ? (
                <div className="pm-success">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{margin:'0 auto 10px',display:'block'}}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Thank you! We will review your account and be in touch within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="pm-form-row">
                    <div className="pm-field">
                      <label htmlFor="pm-name">Full Name *</label>
                      <input id="pm-name" name="pm-name" type="text" placeholder="Jane Smith" required />
                    </div>
                    <div className="pm-field">
                      <label htmlFor="pm-email">Business Email *</label>
                      <input id="pm-email" name="pm-email" type="email" placeholder="jane@company.com" required />
                    </div>
                  </div>
                  <div className="pm-field">
                    <label htmlFor="pm-phone">Phone (Optional)</label>
                    <div className="pm-phone-row">
                      <select name="pm-cc" id="pm-cc" defaultValue="+1">
                        <option value="+1">+1 US</option>
                        <option value="+1">+1 CA</option>
                        <option value="+61">+61 AU</option>
                        <option value="+44">+44 GB</option>
                        <option value="+91">+91 IN</option>
                      </select>
                      <input id="pm-phone" name="pm-phone" type="tel" placeholder="(555) 000-0000" />
                    </div>
                  </div>
                  <div className="pm-field">
                    <label htmlFor="pm-company">Company *</label>
                    <input id="pm-company" name="pm-company" type="text" placeholder="Your company name" required />
                  </div>
                  <div className="pm-field">
                    <label htmlFor="pm-budget">Current Monthly Ad Budget</label>
                    <select id="pm-budget" name="pm-budget">
                      <option value="">Select your budget range</option>
                      <option value="Under $1k">Under $1,000/month</option>
                      <option value="$1k-$5k">$1,000 – $5,000/month</option>
                      <option value="$5k-$20k">$5,000 – $20,000/month</option>
                      <option value="$20k+">$20,000+/month</option>
                      <option value="Not running ads">Not currently running ads</option>
                    </select>
                  </div>
                  <div className="pm-field">
                    <label htmlFor="pm-message">Which channels do you need help with? *</label>
                    <textarea id="pm-message" name="pm-message" placeholder="e.g. Google Ads, Meta, LinkedIn — tell us what you're working with or trying to achieve" required />
                  </div>
                  <div className="pm-consent">
                    <input type="checkbox" id="pm-consent" name="pm-consent" required />
                    <label htmlFor="pm-consent">I agree to 1Solutions contacting me about performance marketing services. I can unsubscribe at any time.</label>
                  </div>
                  <button type="submit" className="pm-submit" disabled={formSt === 'submitting'}>
                    {formSt === 'submitting' ? 'Sending…' : (
                      <>
                        Get My Free Audit
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </>
                    )}
                  </button>
                  {formSt === 'error' && <p className="pm-error">Something went wrong. Please try again or email us directly.</p>}
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="pm-sec" id="faq">
          <div className="pm-sec-in" style={{maxWidth:860,margin:'0 auto'}}>
            <div
              className={`pm-reveal${visibleSections.has('faq') ? ' pm-visible' : ''}`}
              ref={el => { sectionRefs.current['faq'] = el; }}
              style={{textAlign:'center',marginBottom:40}}
            >
              <span className="pm-sec-ey">Got Questions?</span>
              <h2 className="pm-sec-ttl"><AuroraText>Performance Marketing FAQs</AuroraText></h2>
              <p className="pm-sec-desc" style={{margin:'0 auto'}}>Straight answers to the most common questions about performance marketing, Google Ads, Meta Ads, and paid media strategy.</p>
            </div>
            <div className="pm-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`pm-fitem${openFaq === i ? ' open' : ''}`}>
                  <button className="pm-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <div className="pm-fq-badge">{i + 1}</div>
                    <span className="pm-fq-text">{f.q}</span>
                    <svg className="pm-fq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFaq === i && <div className="pm-fa">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="pm-related">
          <div className="pm-related-in">
            <span className="pm-related-ey">Performance Marketing Related Offerings</span>
            <h2 className="pm-related-ttl">Explore <AuroraText>Related Services</AuroraText> and Technologies</h2>
            <p className="pm-related-sub">Pair performance marketing with complementary digital channels and services to maximise revenue across the full customer acquisition funnel.</p>
            <hr className="pm-related-divider" />
            <div className="pm-related-tags">
              {[
                ['SEO Services',                     'blue',   '/seo-services-company/'],
                ['Conversion Rate Optimisation',     'amber',  '/conversion-rate-optimization-services/'],
                ['Social Media Marketing',           'violet', '/social-media-marketing-services/'],
                ['eCommerce Marketing',              'teal',   '/ecommerce-marketing-services/'],
                ['Content Marketing',                'green',  '/content-marketing-services/'],
                ['Landing Page Design',              'rose',   '/landing-page-design-services/'],
                ['Email Marketing',                  'orange', '/email-marketing-services/'],
                ['Analytics & CRO',                  'cyan',   '/analytics-cro-services/'],
                ['eCommerce SEO',                    'sky',    '/ecommerce-seo-services/'],
                ['Digital Marketing Services',       'indigo', '/digital-marketing-services/'],
                ['Remarketing Services',             'slate',  '/remarketing-services/'],
                ['PPC Audit Services',               'lime',   '/ppc-audit-services/'],
              ].map(([label, color, href]) => (
                <Link key={label} href={href} className={`pm-rtag pm-rtag-${color}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
