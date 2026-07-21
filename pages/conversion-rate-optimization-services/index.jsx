import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', title: 'CRO Audit & Heuristic Analysis', desc: 'Expert-led CRO audit reviewing page layout, navigation, CTAs, form design, trust signals, and user journey friction points against established conversion optimisation principles.' },
  { icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title: 'User Behaviour Analysis', desc: 'Heatmap, scroll map, click map, and session recording analysis via Hotjar, Microsoft Clarity, or FullStory — revealing exactly where users drop off, skip, or get confused.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'A/B & Multivariate Testing', desc: 'Hypothesis-driven A/B testing and multivariate experiments — statistically significant test design, implementation via Optimizely, VWO, or Google Optimize, run to 95% confidence.' },
  { icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z', title: 'Landing Page Optimisation', desc: 'Landing page redesign and copy optimisation — headline testing, hero section structure, benefit hierarchy, social proof placement, CTA design, and above-the-fold content strategy.' },
  { icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title: 'Checkout & Form Optimisation', desc: 'Checkout flow simplification, form field reduction, abandoned cart recovery, progress indicator implementation, and checkout trust signal optimisation for ecommerce and lead generation.' },
  { icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122', title: 'CTA & Copy Testing', desc: 'Button copy, placement, colour, and design testing — combined with headline, subheadline, and value proposition copy optimisation to increase click-through and completion rates.' },
  { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', title: 'UX & Design Improvements', desc: 'User experience improvements informed by data — navigation restructuring, mobile UX fixes, page layout changes, and accessibility improvements that remove conversion blockers at scale.' },
  { icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Conversion Analytics & Reporting', desc: 'GA4 conversion goal setup, funnel analysis, micro-conversion tracking, and monthly CRO performance reports — with actionable next test recommendations based on current data.' },
];

const TOOLS = ['Google Analytics 4', 'Hotjar', 'Microsoft Clarity', 'Optimizely', 'VWO', 'Google Tag Manager', 'FullStory', 'Unbounce', 'Crazy Egg', 'Lucky Orange', 'Heap Analytics', 'Google Optimize'];

const PROCESS = [
  { n: '01', title: 'Data Collection', desc: 'Quantitative data (GA4 funnels, conversion rates, exit pages) and qualitative data (heatmaps, session recordings, user surveys) to build a complete picture of your conversion barriers.' },
  { n: '02', title: 'Hypothesis Generation', desc: 'From data to testable hypotheses — specific, measurable changes with a predicted outcome and the supporting evidence from step 1. No guessing, no opinions.' },
  { n: '03', title: 'Test Prioritisation', desc: 'Hypotheses ranked by potential impact, ease of implementation, and statistical feasibility — ensuring tests are run in the highest-value order using PIE or ICE frameworks.' },
  { n: '04', title: 'Test Design & Launch', desc: 'Test built and launched — with traffic split, sample size calculation, and analytics instrumented correctly before launch. No test goes live without a pre-defined success metric.' },
  { n: '05', title: 'Analysis & Decision', desc: 'Statistical significance reached — winner declared, loser archived, learnings documented. No decisions made before 95% confidence thresholds are met.' },
  { n: '06', title: 'Iterate & Scale', desc: 'Winning variant becomes the control. New hypothesis generated. The CRO cycle repeats — compounding conversion improvements month after month.' },
];

const WHY = [
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Data-First Approach', desc: 'We do not make recommendations based on opinion or aesthetic preference — every hypothesis is grounded in quantitative funnel data and qualitative user behaviour analysis.' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Statistical Rigour', desc: 'We run tests to 95% statistical significance before declaring winners. No "test for a week and call it" shortcuts that produce false conclusions and wasted development effort.' },
  { icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title: 'Ecommerce & Lead Gen Expertise', desc: 'CRO strategy differs significantly between ecommerce checkout optimisation and B2B lead generation forms. We bring specific, proven expertise across both conversion contexts.' },
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'SEO-Aware CRO', desc: 'CRO changes can inadvertently damage SEO — removing content, changing URL structures, or altering structured data. Our CRO work is always reviewed for SEO impact before deployment.' },
  { icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', title: 'Full Funnel Focus', desc: 'Conversion optimisation covers the full funnel — ad landing page, website journey, and checkout or lead form — not just isolated page elements divorced from the user\'s actual path.' },
  { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Transparent Reporting', desc: 'Every month: what we tested, what the results were, what we learned, and what we\'re testing next. Full transparency on test outcomes — including failed tests that still generate learning.' },
];

const FAQS = [
  { q: 'What is conversion rate optimisation (CRO)?', a: 'Conversion rate optimisation (CRO) is the systematic practice of increasing the percentage of website visitors who complete a desired action — a purchase, enquiry form submission, phone call, email sign-up, or other goal. CRO uses data analysis (quantitative analytics + qualitative user research), hypothesis generation, and controlled A/B or multivariate testing to make evidence-based improvements to pages, funnels, and user journeys — improving conversion rate without necessarily increasing traffic.' },
  { q: 'How is CRO different from UX design?', a: 'CRO and UX overlap significantly but differ in approach. UX design is typically a creative and strategic discipline focused on the entire user experience — often without controlled testing to validate individual changes. CRO is a scientific discipline focused specifically on conversion metrics — hypothesising that a specific change will increase conversion rate and testing that hypothesis in a controlled experiment. Good CRO uses UX principles to generate hypotheses and A/B testing to validate them with statistical confidence. We combine both — UX-informed ideation and rigorous A/B test validation.' },
  { q: 'What conversion rate is "good"?', a: 'Conversion rates vary enormously by industry, traffic source, and conversion type. Ecommerce conversion rates typically range from 1% to 4% for direct purchases; lead generation forms for B2B can range from 2% to 10% depending on the ask. Averages matter less than your own baseline — our goal is to improve YOUR conversion rate relative to your current performance. A 25% relative improvement to a 1% conversion rate (to 1.25%) is meaningful regardless of what the industry average is.' },
  { q: 'How long does CRO take to show results?', a: 'CRO test results depend on traffic volume and the size of the conversion rate difference being detected. Low-traffic sites need to run tests for longer to reach statistical significance — sometimes 4 to 8 weeks per test. High-traffic sites can reach significance in 1 to 2 weeks. The minimum traffic requirement for reliable A/B test results is approximately 1,000 conversions per variant — so a page receiving 10,000 sessions with a 5% conversion rate needs at minimum 2 test cycles before reaching significance. We calculate required sample sizes before starting tests so you know the timeline upfront.' },
  { q: 'What pages should be prioritised for CRO?', a: 'Prioritise pages by: traffic volume × conversion impact potential. The highest-value CRO targets are typically: checkout pages (high traffic, direct revenue impact); primary landing pages from paid traffic (high spend at risk); lead generation forms (direct pipeline impact); product pages for your top-selling products; and homepage or key category pages with high exit rates. We use GA4 funnel analysis to identify where the largest conversion gaps exist in your specific user journey.' },
  { q: 'Do I need CRO or do I need better traffic?', a: 'Both matter, but CRO improves the return on ALL your traffic channels simultaneously. Doubling your traffic costs twice as much. Doubling your conversion rate from 1% to 2% doubles your revenue from the same traffic spend. CRO is typically the higher ROI investment once you have meaningful traffic volume (at least 10,000 sessions/month to test effectively). If you are still building traffic, focus on SEO and paid channels first — CRO has diminishing value below the traffic threshold needed for statistically reliable testing.' },
  { q: 'Can CRO damage SEO?', a: 'Poorly executed CRO can inadvertently damage SEO — for example, removing content that contains target keywords, changing URL structures, or altering structured data incorrectly. Well-executed CRO avoids these risks. Our CRO team works alongside our SEO team — all significant page changes are reviewed for SEO impact before deployment. We ensure: content changes maintain keyword relevance; A/B test JavaScript does not interfere with Googlebot rendering; winning variants replace the original cleanly without creating duplicate content; and meta data is preserved across test variants.' },
  { q: 'What is the minimum traffic needed for CRO testing?', a: 'Effective A/B testing requires sufficient statistical power. As a general guide: you need at least 1,000 conversions per variant to detect a 20% relative improvement with 95% confidence. This means: if your landing page converts at 3%, you need approximately 33,000 sessions to run a valid test detecting a 20% lift. Lower-traffic sites are not excluded from CRO — but testing cycles are longer, and multivariate tests are not statistically feasible. For lower-traffic sites we focus on high-impact single-variable tests and qualitative CRO (heuristic audits, user testing) rather than statistical A/B testing.' },
  { q: 'What tools do you use for CRO?', a: 'Our CRO technology stack includes: Google Analytics 4 and Google Tag Manager for quantitative funnel data; Hotjar, Microsoft Clarity, and FullStory for heatmaps, session recordings, and user behaviour analysis; Optimizely and VWO for enterprise-grade A/B and multivariate testing; Unbounce and Instapage for landing page testing; Crazy Egg and Lucky Orange for click tracking and scroll maps; and Heap Analytics for retroactive event analysis. Tool selection is always based on your existing stack and budget — we do not mandate expensive platforms if lighter-weight alternatives are sufficient.' },
  { q: 'How do you measure CRO success?', a: 'We measure CRO success against your primary conversion KPI (purchase, lead, sign-up, call) with the following metrics: conversion rate (primary), revenue per visitor (for ecommerce), cost per lead (for lead gen), and test velocity (number of statistically significant tests completed per quarter). We also track secondary metrics: average order value, cart abandonment rate, form completion rate, and bounce rate on key landing pages. All metrics are reported monthly with trend analysis and benchmarked against your pre-CRO baseline.' },
  { q: 'Do you offer CRO for ecommerce specifically?', a: 'Yes — ecommerce CRO is one of our core specialisations. We have deep experience with Shopify, WooCommerce, Magento, and BigCommerce checkout optimisation. Key ecommerce CRO areas include: product page conversion elements (images, copy, trust badges, reviews), add-to-cart rate optimisation, multi-step checkout flow simplification, guest checkout implementation, abandoned cart recovery, upsell and cross-sell placement, and post-purchase flow optimisation. We have delivered measurable conversion rate uplifts for ecommerce clients across US, Canadian, and Australian markets.' },
  { q: 'What does a CRO audit include?', a: 'Our CRO audit covers: heuristic analysis of your top 10 highest-traffic pages against 200+ conversion optimisation criteria; GA4 funnel analysis identifying your biggest conversion drop-off points; heatmap and session recording review of user behaviour on key pages; form analytics review (field abandonment, error rates, completion time); competitor benchmarking of your key landing pages versus top 3 competitors; and a prioritised roadmap of 15 to 20 specific test recommendations ranked by estimated impact. The audit deliverable is a detailed report with annotated screenshots, data evidence, and a phased test calendar.' },
];

const INDUSTRIES = [
  'eCommerce & Retail', 'SaaS & Software', 'B2B Lead Generation', 'Healthcare & Wellness',
  'Finance & Fintech', 'Travel & Hospitality', 'Education & eLearning', 'Legal Services',
  'Real Estate', 'Home Services', 'Subscription Businesses', 'Agencies & Resellers',
];

export default function ConversionRateOptimizationServices() {
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
        { threshold: 0.12 }
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
      const token = await window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'cro_contact' });
      const fd = new FormData(e.target);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('cro-name'),
          email: fd.get('cro-email'),
          phone: fd.get('cro-phone'),
          company: fd.get('cro-company'),
          message: `Website: ${fd.get('cro-website') || 'Not provided'}\n\nWhat they want to improve:\n${fd.get('cro-message')}`,
          service: 'Conversion Rate Optimisation',
          source: 'CRO Services Page - Free Audit',
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
          { '@type': 'ListItem', position: 3, name: 'Conversion Rate Optimisation Services', item: 'https://www.1solutions.biz/conversion-rate-optimization-services/' },
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
        '@id': 'https://www.1solutions.biz/conversion-rate-optimization-services/',
        url: 'https://www.1solutions.biz/conversion-rate-optimization-services/',
        name: 'Conversion Rate Optimisation (CRO) Services | Increase Conversions | 1Solutions',
        description: 'Expert CRO services — A/B testing, heatmap analysis, landing page optimisation, and checkout CRO. Trusted by 150+ businesses to increase conversion rates by an average of 38%. Get a free CRO audit.',
        dateModified: '2026-07-06',
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfessionalService',
        name: 'Conversion Rate Optimisation Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        serviceType: 'Conversion Rate Optimisation',
        url: 'https://www.1solutions.biz/conversion-rate-optimization-services/',
        description: 'Full-service CRO agency offering A/B testing, heatmap analysis, landing page optimisation, checkout CRO, and user behaviour analysis for ecommerce and lead generation businesses.',
        areaServed: ['US', 'CA', 'AU'],
        dateModified: '2026-07-06',
      },
      {
        '@type': 'HowTo',
        name: 'Our CRO Process',
        description: 'Our 6-step CRO methodology for delivering compounding conversion rate improvements.',
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
        <title>Conversion Rate Optimisation (CRO) Services | Increase Conversions | 1Solutions</title>
        <meta name="description" content="Expert CRO services — A/B testing, heatmap analysis, landing page optimisation, and checkout CRO. Trusted by 150+ businesses to increase conversion rates by an average of 38%. Get a free CRO audit." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/conversion-rate-optimization-services/" />
        <meta property="og:title" content="Conversion Rate Optimisation (CRO) Services | 1Solutions" />
        <meta property="og:description" content="Data-driven CRO — A/B testing, heatmap analysis, landing page optimisation, and checkout CRO. 150+ clients, +38% avg conversion lift. Free CRO audit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.1solutions.biz/conversion-rate-optimization-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          /* ── BASE ── */
          .cro-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; overflow-x:hidden; position:relative; }
          .cro-page *,.cro-page *::before,.cro-page *::after { box-sizing:border-box; }

          /* ── ORBS ── */
          .cro-orb1 { position:fixed;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.30) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .cro-orb2 { position:fixed;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.25) 0%,rgba(245,158,11,0.12) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .cro-orb3 { position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* ── SHARED SECTION ── */
          .cro-sec { padding:80px 40px;position:relative;z-index:1; }
          .cro-sec-in { max-width:1280px;margin:0 auto; }
          .cro-white { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08); }
          .cro-sec-ey { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .cro-sec-ttl { font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:10px; }
          .cro-sec-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px; }

          /* ── REVEAL ── */
          .cro-reveal { opacity:0;transform:translateY(44px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .cro-reveal.cro-visible { opacity:1;transform:translateY(0); }

          /* ── GLASS CARD ── */
          .cro-glass { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }

          /* ── DEFINITION ── */
          .cro-def-box { padding:36px;max-width:1040px;margin:0 auto; }
          .cro-def-intro { font-size:1.02rem;color:#374151;line-height:1.8;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid rgba(15,52,96,0.08); }
          .cro-def-intro strong { color:#0F3460; }
          .cro-def-aspects { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
          .cro-def-aspect { background:rgba(255,255,255,0.55);border:1px solid rgba(15,52,96,0.10);border-radius:14px;padding:20px;transition:border-color 0.2s; }
          .cro-def-aspect:hover { border-color:rgba(217,119,6,0.35); }
          .cro-def-t { font-weight:700;color:#0F3460;font-size:14px;margin-bottom:6px; }
          .cro-def-d { font-size:13px;color:#4A6080;line-height:1.6; }

          /* ── WHY MATTERS ── */
          .cro-wm-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .cro-wm-card { padding:32px 28px;text-align:center;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .cro-wm-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45)!important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1)!important; }
          .cro-wm-num { font-size:3.2rem;font-weight:900;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1.5px;line-height:1;margin-bottom:12px; }
          .cro-wm-desc { font-size:14px;color:#374151;line-height:1.6;margin-bottom:8px; }
          .cro-wm-src { font-size:11px;color:#9ca3af;font-style:italic; }

          /* ── SERVICES ── */
          .cro-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
          .cro-svc-card { padding:28px 24px;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .cro-svc-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45)!important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1)!important; }
          .cro-svc-icon { width:48px;height:48px;border-radius:14px;background:rgba(15,52,96,0.06);display:flex;align-items:center;justify-content:center;margin-bottom:16px;transition:background 0.2s; }
          .cro-svc-card:hover .cro-svc-icon { background:rgba(217,119,6,0.10); }
          .cro-svc-icon svg { width:22px;height:22px;stroke:#0F3460;fill:none;transition:stroke 0.2s; }
          .cro-svc-card:hover .cro-svc-icon svg { stroke:#D97706; }
          .cro-svc-t { font-size:1rem;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.3; }
          .cro-svc-d { font-size:13.5px;color:#4A6080;line-height:1.7;margin:0; }

          /* ── RESULTS DARK ── */
          .cro-results { background:linear-gradient(135deg,#071e3d 0%,#0F3460 40%,#0a2549 100%);padding:80px 40px;position:relative;overflow:hidden;z-index:1; }
          .cro-res-orb { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.18) 0%,transparent 65%);top:-150px;right:-100px;pointer-events:none;filter:blur(30px); }
          .cro-res-in { max-width:1280px;margin:0 auto;position:relative;z-index:2; }
          .cro-res-ey { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:10px;display:block;text-align:center; }
          .cro-res-ttl { font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;text-align:center;margin-bottom:12px;line-height:1.15;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .cro-res-sub { font-size:1rem;color:rgba(255,255,255,0.60);text-align:center;max-width:560px;margin:0 auto 52px; }
          .cro-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .cro-res-card { background:rgba(255,255,255,0.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:32px;text-align:center;transition:background 0.25s,border-color 0.25s; }
          .cro-res-card:hover { background:rgba(255,255,255,0.11);border-color:rgba(217,119,6,0.45); }
          .cro-res-metric { font-size:3rem;font-weight:900;color:#fcd34d;margin-bottom:6px;line-height:1;letter-spacing:-2px; }
          .cro-res-label { font-size:14px;color:rgba(255,255,255,0.80);font-weight:600;margin-bottom:6px; }
          .cro-res-sub2 { font-size:12px;color:rgba(255,255,255,0.50); }

          /* ── PROCESS ── */
          .cro-proc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:28px; }
          .cro-proc-card { padding:28px 24px;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .cro-proc-card:hover { transform:translateY(-5px);border-color:rgba(217,119,6,0.40)!important;box-shadow:0 16px 48px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1)!important; }
          .cro-proc-n { font-size:3rem;font-weight:900;color:rgba(15,52,96,0.08);line-height:1;margin-bottom:6px;letter-spacing:-2px; }
          .cro-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#D97706,rgba(217,119,6,0.25));border-radius:2px;margin-bottom:14px; }
          .cro-proc-t { font-size:1rem;font-weight:700;color:#0F1F40;margin:0 0 8px; }
          .cro-proc-d { font-size:13.5px;color:#4A6080;line-height:1.7;margin:0; }

          /* ── TOOLS ── */
          .cro-tools-wrap { display:flex;flex-wrap:wrap;gap:12px; }
          .cro-tool-pill { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.85);border-radius:50px;padding:9px 18px;font-size:13px;font-weight:500;color:#374151;box-shadow:0 2px 10px rgba(15,52,96,0.06);transition:border-color 0.2s,color 0.2s,box-shadow 0.2s; }
          .cro-tool-pill:hover { border-color:rgba(217,119,6,0.45);color:#D97706;box-shadow:0 4px 16px rgba(15,52,96,0.10); }
          .cro-tool-dot { width:7px;height:7px;border-radius:50%;background:#D97706;flex-shrink:0; }

          /* ── WHY ── */
          .cro-why-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
          .cro-why-card { padding:28px 24px;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .cro-why-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45)!important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1)!important; }
          .cro-why-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;margin-bottom:14px; }
          .cro-why-icon svg { width:26px;height:26px;stroke:#D97706;fill:none; }
          .cro-why-t { font-size:15px;font-weight:700;color:#0F1F40;margin:0 0 8px; }
          .cro-why-d { font-size:13.5px;color:#4A6080;line-height:1.7;margin:0; }

          /* ── INDUSTRIES ── */
          .cro-ind-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:12px; }
          .cro-ind-pill { background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.85);border-radius:12px;padding:14px 16px;font-size:13px;font-weight:600;color:#374151;text-align:center;box-shadow:0 2px 10px rgba(15,52,96,0.06);transition:all 0.2s; }
          .cro-ind-pill:hover { background:rgba(255,255,255,0.85);border-color:rgba(217,119,6,0.45);color:#D97706;box-shadow:0 6px 20px rgba(15,52,96,0.10); }

          /* ── CONTACT ── */
          .cro-contact { padding:72px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .cro-contact-in { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px; }
          .cro-contact-ttl { font-size:clamp(2rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .cro-contact-desc { font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px; }
          .cro-benefits-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:16px; }
          .cro-ben-item { display:flex;gap:12px;align-items:flex-start; }
          .cro-ben-icon { width:20px;height:20px;stroke:#D97706;fill:none;flex-shrink:0;margin-top:2px; }
          .cro-ben-text { font-size:13px;color:#4A6080;line-height:1.55; }
          .cro-contact-stats { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid rgba(15,52,96,0.10); }
          .cro-cstat-num { font-size:36px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px; }
          .cro-cstat-txt { font-size:12px;color:#4A6080;font-weight:500;line-height:1.4; }
          .cro-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .cro-form-box h3 { font-size:24px;font-weight:700;margin:0 0 24px;color:#0F1F40;letter-spacing:-0.5px; }
          .cro-form { display:flex;flex-direction:column;gap:16px; }
          .cro-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .cro-fg { display:flex;flex-direction:column;gap:6px; }
          .cro-fg.full { grid-column:1/-1; }
          .cro-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .cro-fg input,.cro-fg textarea,.cro-fg select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .cro-fg input:focus,.cro-fg textarea:focus,.cro-fg select:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .cro-phone-wrap { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .cro-phone-wrap select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .cro-phone-wrap input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none;background:rgba(255,255,255,0.55); }
          .cro-phone-wrap input:focus { outline:none; }
          .cro-consent { display:flex;gap:8px;align-items:flex-start;margin-top:4px; }
          .cro-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .cro-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .cro-consent a { color:#0F3460;text-decoration:none; }
          .cro-submit { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .cro-submit:hover:not(:disabled) { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }
          .cro-submit:disabled { opacity:0.6;cursor:not-allowed; }

          /* ── FAQ ── */
          .cro-faq-list { display:flex;flex-direction:column;gap:12px; }
          .cro-fitem { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .cro-fitem.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .cro-fitem.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .cro-fq { width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .cro-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .cro-fitem.open .cro-fq-badge { background:#D97706;color:#fff; }
          .cro-fq-text { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .cro-fitem.open .cro-fq-text { color:#D97706; }
          .cro-fq-chevron { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .cro-fitem.open .cro-fq-chevron { transform:rotate(180deg);color:#D97706; }
          .cro-fa { font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px; }

          /* ── RELATED SERVICES ── */
          .cro-related { background:rgba(237,233,254,.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60);padding:80px 40px;position:relative;z-index:1; }
          .cro-related-in { max-width:1280px;margin:0 auto;text-align:center; }
          .cro-related-ey { font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .cro-related-ttl { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px; }
          .cro-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .cro-related-divider { border:none;border-top:1px solid rgba(15,52,96,.12);margin:40px 0; }
          .cro-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .cro-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .25s; }
          .cro-rtag:hover { filter:brightness(.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.10); }
          .cro-rtag-blue   { background:rgba(59,130,246,.10);border-color:rgba(59,130,246,.30);color:#1D4ED8; }
          .cro-rtag-violet { background:rgba(139,92,246,.10);border-color:rgba(139,92,246,.30);color:#6D28D9; }
          .cro-rtag-amber  { background:rgba(245,158,11,.12);border-color:rgba(245,158,11,.35);color:#B45309; }
          .cro-rtag-teal   { background:rgba(20,184,166,.10);border-color:rgba(20,184,166,.30);color:#0F766E; }
          .cro-rtag-rose   { background:rgba(244,63,94,.10);border-color:rgba(244,63,94,.28);color:#BE123C; }
          .cro-rtag-green  { background:rgba(34,197,94,.10);border-color:rgba(34,197,94,.28);color:#15803D; }
          .cro-rtag-indigo { background:rgba(99,102,241,.10);border-color:rgba(99,102,241,.28);color:#4338CA; }
          .cro-rtag-orange { background:rgba(249,115,22,.10);border-color:rgba(249,115,22,.30);color:#C2410C; }
          .cro-rtag-cyan   { background:rgba(6,182,212,.10);border-color:rgba(6,182,212,.28);color:#0E7490; }
          .cro-rtag-slate  { background:rgba(100,116,139,.10);border-color:rgba(100,116,139,.28);color:#334155; }
          .cro-rtag-sky    { background:rgba(14,165,233,.10);border-color:rgba(14,165,233,.28);color:#0369A1; }
          .cro-rtag-lime   { background:rgba(132,204,22,.10);border-color:rgba(132,204,22,.28);color:#3F6212; }

          /* ── RESPONSIVE ── */
          @media(max-width:1024px) {
            .cro-svc-grid { grid-template-columns:repeat(2,1fr); }
            .cro-why-grid { grid-template-columns:repeat(2,1fr); }
            .cro-proc-grid { grid-template-columns:repeat(2,1fr); }
            .cro-res-grid { grid-template-columns:1fr;max-width:400px;margin-left:auto;margin-right:auto; }
            .cro-wm-grid { grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto; }
            .cro-contact-in { grid-template-columns:1fr; }
            .cro-ind-grid { grid-template-columns:repeat(3,1fr); }
            .cro-def-aspects { grid-template-columns:1fr; }
            .cro-related-ttl { font-size:30px; }
          }
          @media(max-width:768px) {
            .cro-sec,.cro-results,.cro-contact,.cro-related { padding-left:24px;padding-right:24px; }
            .cro-svc-grid,.cro-why-grid,.cro-proc-grid { grid-template-columns:1fr; }
            .cro-ind-grid { grid-template-columns:repeat(2,1fr); }
            .cro-fq { padding:18px 18px 18px 52px; }
            .cro-fq-text { font-size:14px; }
            .cro-fa { padding:0 18px 18px 52px;font-size:13px; }
            .cro-fq-badge { left:14px; }
            .cro-form-row { grid-template-columns:1fr; }
            .cro-related-ttl { font-size:26px; }
            .cro-related-tags { gap:8px; }
            .cro-rtag { padding:9px 16px;font-size:13px; }
          }
          @media(max-width:480px) {
            .cro-ind-grid { grid-template-columns:repeat(2,1fr); }
            .cro-contact-stats { grid-template-columns:1fr 1fr 1fr; }
          }
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      <div className="cro-page">
        <div className="cro-orb1" /><div className="cro-orb2" /><div className="cro-orb3" />

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="Data-Driven CRO Agency · US · Canada · Australia"
          title={<><AuroraText>Convert More Visitors</AuroraText> Without Spending More on Traffic</>}
          subtext="1Solutions is a specialist CRO agency with 15+ years of experience turning analytics data into revenue. A/B testing, heatmap analysis, checkout optimisation, and landing page redesign — all backed by statistical evidence, not gut feel."
          primaryCta={{ label: 'Get a Free CRO Audit', href: '#contact' }}
          secondaryCta={{ label: 'View All Services', href: '/digital-marketing-services/' }}
          stats={[
            { label: 'Avg Conversion Lift', value: '38', prefix: '+', suffix: '%' },
            { label: 'CRO Clients Served', value: '150', suffix: '+' },
            { label: 'A/B Tests Run', value: '600', suffix: '+' },
            { label: 'Client Retention', value: '97', suffix: '%' },
          ]}
        />

        {/* ── DEFINITION ── */}
        <section className="cro-sec cro-white">
          <div className="cro-sec-in" style={{textAlign:'center'}}>
            <div className={`cro-reveal${visibleSections.has('def') ? ' cro-visible' : ''}`} ref={el => { sectionRefs.current['def'] = el; }}>
              <span className="cro-sec-ey">Understanding CRO</span>
              <h2 className="cro-sec-ttl">What Is <AuroraText>Conversion Rate Optimisation?</AuroraText></h2>
              <p className="cro-sec-desc" style={{margin:'0 auto 32px'}}>A plain-English explanation of CRO and why it is the highest-ROI lever for most businesses that already have traffic.</p>
            </div>
            <div className="cro-glass cro-def-box">
              <p className="cro-def-intro">
                <strong>Conversion Rate Optimisation (CRO)</strong> is the systematic practice of increasing the percentage of your website visitors who take a desired action — completing a purchase, submitting an enquiry, signing up for a trial, or calling your business. CRO uses quantitative analytics data (what users do on your site) combined with qualitative user research (why they do it) to generate hypotheses, then validates those hypotheses through controlled A/B or multivariate tests. Unlike traffic acquisition, CRO improves the return from every visitor you already have — compounding revenue without increasing your ad spend.
              </p>
              <div className="cro-def-aspects">
                {[
                  { t: 'The CRO methodology', d: 'Data collection → hypothesis generation → test prioritisation → A/B test launch → statistical analysis → iterate. A rigorous scientific cycle, not a series of opinion-based redesigns.' },
                  { t: 'Why CRO compounds', d: 'Each winning test becomes the new baseline. The next test starts from a higher conversion rate. Gains stack month after month — a 10% lift compounded over 6 tests is a 77% total improvement.' },
                  { t: 'CRO vs. more traffic', d: 'Doubling traffic costs twice as much. Doubling your conversion rate from 1% to 2% doubles revenue from the same traffic. CRO is almost always the higher ROI investment for sites with 10,000+ monthly sessions.' },
                ].map(a => (
                  <div key={a.t} className="cro-def-aspect">
                    <div className="cro-def-t">{a.t}</div>
                    <div className="cro-def-d">{a.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CRO MATTERS ── */}
        <section className="cro-sec">
          <div className="cro-sec-in">
            <div className={`cro-reveal${visibleSections.has('wm') ? ' cro-visible' : ''}`} ref={el => { sectionRefs.current['wm'] = el; }} style={{textAlign:'center',marginBottom:40}}>
              <span className="cro-sec-ey">The Data</span>
              <h2 className="cro-sec-ttl">Why <AuroraText>CRO Matters</AuroraText> for Your Business</h2>
              <p className="cro-sec-desc" style={{margin:'0 auto'}}>The numbers that prove why converting existing visitors beats spending more to acquire new ones.</p>
            </div>
            <div className="cro-wm-grid">
              {[
                { num: 'Only 2.35%', desc: 'average eCommerce conversion rate globally — meaning 97.65% of visitors leave without buying. CRO captures value from visitors you are already paying to acquire.', src: 'WordStream' },
                { num: '10× ROI', desc: 'businesses investing in structured CRO typically generate 10× more revenue per visit than those spending the same budget on traffic acquisition alone.', src: 'Forrester Research' },
                { num: '223%', desc: 'better ROI for companies with a structured CRO programme vs. those relying on gut-feel redesigns. The difference is evidence vs. opinion.', src: 'Econsultancy' },
              ].map(w => (
                <div key={w.num} className="cro-wm-card cro-glass">
                  <div className="cro-wm-num">{w.num}</div>
                  <div className="cro-wm-desc">{w.desc}</div>
                  <div className="cro-wm-src">Source: {w.src}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="cro-sec cro-white" id="services">
          <div className="cro-sec-in">
            <div className={`cro-reveal${visibleSections.has('svc') ? ' cro-visible' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="cro-sec-ey">What We Do</span>
              <h2 className="cro-sec-ttl"><AuroraText>CRO Services</AuroraText> That Drive Measurable Results</h2>
              <p className="cro-sec-desc">From CRO audit to A/B testing to checkout optimisation — a systematic, data-first process that turns more of your existing visitors into customers.</p>
            </div>
            <div className="cro-svc-grid">
              {SERVICES.map(s => (
                <div key={s.title} className="cro-svc-card cro-glass">
                  <div className="cro-svc-icon">
                    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75">
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <h3 className="cro-svc-t">{s.title}</h3>
                  <p className="cro-svc-d">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS DARK ── */}
        <section className="cro-results">
          <div className="cro-res-orb" />
          <div className="cro-res-in">
            <div className={`cro-reveal${visibleSections.has('res') ? ' cro-visible' : ''}`} ref={el => { sectionRefs.current['res'] = el; }}>
              <span className="cro-res-ey">Proven Results</span>
              <h2 className="cro-res-ttl">Real Conversion Lifts for Real Businesses</h2>
              <p className="cro-res-sub">Every result below is backed by statistically significant A/B test data — not best-case estimates.</p>
            </div>
            <div className="cro-res-grid">
              {[
                { metric: '+67%', label: 'Conversion Rate Increase', sub: 'B2B SaaS lead gen, US — landing page + form redesign' },
                { metric: '2.8×', label: 'Revenue Per Visitor', sub: 'eCommerce retailer, Australia — checkout flow + trust signals' },
                { metric: '+41%', label: 'Checkout Completions', sub: 'D2C brand, Canada — cart abandonment + UX fixes' },
              ].map(r => (
                <div key={r.metric} className="cro-res-card">
                  <div className="cro-res-metric">{r.metric}</div>
                  <div className="cro-res-label">{r.label}</div>
                  <div className="cro-res-sub2">{r.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="cro-sec">
          <div className="cro-sec-in">
            <div className={`cro-reveal${visibleSections.has('proc') ? ' cro-visible' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }} style={{textAlign:'center',marginBottom:48}}>
              <span className="cro-sec-ey">How We Work</span>
              <h2 className="cro-sec-ttl">Our <AuroraText>6-Step CRO Process</AuroraText></h2>
              <p className="cro-sec-desc" style={{margin:'0 auto'}}>Data to hypothesis to test to statistical decision — a rigorous cycle that compounds conversion improvements month after month, with evidence not opinion.</p>
            </div>
            <div className="cro-proc-grid">
              {PROCESS.map(p => (
                <div key={p.n} className="cro-proc-card cro-glass">
                  <div className="cro-proc-n">{p.n}</div>
                  <div className="cro-proc-line" />
                  <h3 className="cro-proc-t">{p.title}</h3>
                  <p className="cro-proc-d">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section className="cro-sec cro-white">
          <div className="cro-sec-in">
            <div className={`cro-reveal${visibleSections.has('tools') ? ' cro-visible' : ''}`} ref={el => { sectionRefs.current['tools'] = el; }}>
              <span className="cro-sec-ey">Tools & Technology</span>
              <h2 className="cro-sec-ttl">Our <AuroraText>CRO Technology Stack</AuroraText></h2>
              <p className="cro-sec-desc">We work with the industry-standard CRO tools — and we select the right tool for your budget and existing stack, not the most expensive option.</p>
            </div>
            <div className="cro-tools-wrap">
              {TOOLS.map(t => (
                <span key={t} className="cro-tool-pill">
                  <span className="cro-tool-dot" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="cro-sec">
          <div className="cro-sec-in">
            <div className={`cro-reveal${visibleSections.has('why') ? ' cro-visible' : ''}`} ref={el => { sectionRefs.current['why'] = el; }}>
              <span className="cro-sec-ey">Why 1Solutions</span>
              <h2 className="cro-sec-ttl">Data-Driven CRO, <AuroraText>Not Gut-Feel Redesigns</AuroraText></h2>
              <p className="cro-sec-desc">We test before we declare winners, run to statistical significance, and report transparently — including failed tests that still generate learning.</p>
            </div>
            <div className="cro-why-grid">
              {WHY.map(w => (
                <div key={w.title} className="cro-why-card cro-glass">
                  <div className="cro-why-icon">
                    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75">
                      <path d={w.icon} />
                    </svg>
                  </div>
                  <h3 className="cro-why-t">{w.title}</h3>
                  <p className="cro-why-d">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="cro-sec cro-white">
          <div className="cro-sec-in">
            <div className={`cro-reveal${visibleSections.has('ind') ? ' cro-visible' : ''}`} ref={el => { sectionRefs.current['ind'] = el; }} style={{marginBottom:36}}>
              <span className="cro-sec-ey">Industries We Serve</span>
              <h2 className="cro-sec-ttl">CRO for <AuroraText>Every Business Model</AuroraText></h2>
              <p className="cro-sec-desc">We have delivered statistically significant conversion improvements across a wide range of industries, business models, and traffic volumes.</p>
            </div>
            <div className="cro-ind-grid">
              {INDUSTRIES.map(ind => (
                <div key={ind} className="cro-ind-pill">{ind}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="cro-contact" id="contact">
          <div className="cro-contact-in">
            <div>
              <h2 className="cro-contact-ttl">Get Your Free CRO Audit &amp; Conversion Roadmap</h2>
              <p className="cro-contact-desc">Tell us about your website and conversion goals. A senior CRO specialist will review your funnel, identify your top 3 drop-off points, and send you a prioritised test roadmap — within 24 hours, at no cost.</p>
              <div className="cro-benefits-box">
                {[
                  { d: 'Your details are kept strictly confidential. We respect your privacy and never share data.' },
                  { d: 'A senior CRO specialist personally reviews your funnel — no automated audits or generic templates.' },
                  { d: 'Response within 24 business hours with specific, actionable recommendations for your site.' },
                  { d: 'No obligation to proceed. We give honest recommendations even if CRO is not right for you yet.' },
                ].map((b, i) => (
                  <div key={i} className="cro-ben-item">
                    <svg className="cro-ben-icon" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="cro-ben-text">{b.d}</p>
                  </div>
                ))}
                <div className="cro-contact-stats">
                  {[['150+','CRO Clients'],['600+','A/B Tests'],['97%','Retention']].map(([num, txt]) => (
                    <div key={txt}>
                      <div className="cro-cstat-num">{num}</div>
                      <div className="cro-cstat-txt">{txt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="cro-form-box">
              <h3>Request Your Free CRO Audit</h3>
              <form className="cro-form" onSubmit={handleSubmit}>
                <div className="cro-form-row">
                  <div className="cro-fg"><label>Full Name *</label><input name="cro-name" type="text" placeholder="Your full name" required /></div>
                  <div className="cro-fg"><label>Business Email *</label><input name="cro-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="cro-form-row">
                  <div className="cro-fg">
                    <label>Phone Number *</label>
                    <div className="cro-phone-wrap">
                      <select aria-label="Country code">
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+1-CA">🇨🇦 +1</option>
                        <option value="+91">🇮🇳 +91</option>
                      </select>
                      <input name="cro-phone" type="tel" placeholder="Phone number" required />
                    </div>
                  </div>
                  <div className="cro-fg"><label>Company / Organisation *</label><input name="cro-company" type="text" placeholder="Your company name" required /></div>
                </div>
                <div className="cro-fg full"><label>Website URL (optional)</label><input name="cro-website" type="url" placeholder="https://yourwebsite.com" /></div>
                <div className="cro-fg full">
                  <label>What are you trying to improve? *</label>
                  <textarea name="cro-message" rows={4} placeholder="Tell us your current conversion rate, traffic volume, and where you think visitors are dropping off..." required />
                </div>
                <div className="cro-consent">
                  <input type="checkbox" id="cro-consent" required />
                  <label htmlFor="cro-consent">I consent to 1Solutions processing my data in accordance with the <Link href="/privacy-policy/">Privacy Policy</Link>.</label>
                </div>
                <button type="submit" className="cro-submit" disabled={formSt === 'submitting'}>
                  {formSt === 'submitting' ? 'Sending...' : 'Get My Free CRO Audit'}
                </button>
                {formSt === 'success' && (
                  <div style={{marginTop:12,padding:'12px 16px',background:'#f0fdf4',border:'1px solid #86efac',borderRadius:8,color:'#166534',fontSize:'0.875rem',fontWeight:500}}>
                    ✓ Request sent! A CRO specialist will be in touch within 24 hours.
                  </div>
                )}
                {formSt === 'error' && (
                  <div style={{marginTop:12,padding:'12px 16px',background:'#fef2f2',border:'1px solid #fca5a5',borderRadius:8,color:'#991b1b',fontSize:'0.875rem',fontWeight:500}}>
                    Something went wrong. Please email us at <a href="mailto:info@1solutions.biz" style={{color:'#991b1b'}}>info@1solutions.biz</a>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="cro-sec cro-white" id="faq">
          <div className="cro-sec-in" style={{maxWidth:860,margin:'0 auto'}}>
            <div className={`cro-reveal${visibleSections.has('faq') ? ' cro-visible' : ''}`} ref={el => { sectionRefs.current['faq'] = el; }} style={{textAlign:'center',marginBottom:40}}>
              <span className="cro-sec-ey">Got Questions?</span>
              <h2 className="cro-sec-ttl"><AuroraText>CRO Frequently Asked Questions</AuroraText></h2>
              <p className="cro-sec-desc" style={{margin:'0 auto'}}>Straight answers to the most common questions about conversion rate optimisation and A/B testing.</p>
            </div>
            <div className="cro-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`cro-fitem${openFaq === i ? ' open' : ''}`}>
                  <button className="cro-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <div className="cro-fq-badge">{i + 1}</div>
                    <span className="cro-fq-text">{f.q}</span>
                    <svg className="cro-fq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFaq === i && <div className="cro-fa">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="cro-related">
          <div className="cro-related-in">
            <span className="cro-related-ey">CRO Related Offerings</span>
            <h2 className="cro-related-ttl">Explore <AuroraText>Related Services</AuroraText> and Technologies</h2>
            <p className="cro-related-sub">Pair CRO with complementary digital marketing and development services to maximise revenue from every visitor across your entire growth funnel.</p>
            <hr className="cro-related-divider" />
            <div className="cro-related-tags">
              {[
                ['SEO Services',                   'blue',    '/seo-services-company/'],
                ['PPC Management',                 'amber',   '/ppc-management-services/'],
                ['Landing Page Design',            'violet',  '/landing-page-design-services/'],
                ['eCommerce Development',          'teal',    '/ecommerce-website-development-services/'],
                ['eCommerce Marketing',            'orange',  '/ecommerce-marketing-services/'],
                ['Digital Marketing Services',     'indigo',  '/digital-marketing-services/'],
                ['Analytics & CRO Services',       'cyan',    '/analytics-cro-services/'],
                ['UX Research',                    'rose',    '/ux-research/'],
                ['Content Marketing',              'green',   '/content-marketing-services/'],
                ['Technical SEO Optimization',     'slate',   '/technical-seo-optimization/'],
                ['eCommerce SEO',                  'sky',     '/ecommerce-seo-services/'],
                ['Social Media Marketing',         'lime',    '/social-media-marketing-services/'],
              ].map(([label, color, href]) => (
                <Link key={label} href={href} className={`cro-rtag cro-rtag-${color}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
