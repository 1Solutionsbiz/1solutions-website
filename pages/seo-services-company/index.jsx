import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

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
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  const hasComma = val.includes(',');
  const display = started ? (hasComma ? num.toLocaleString() : num) + suffix : val;
  return (
    <div className="seo-stat">
      <div className="seo-stat-l">{label}</div>
      <div className="seo-stat-v">{display}</div>
    </div>
  );
}

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Technical SEO', desc: 'Site architecture, crawlability, Core Web Vitals, schema markup, and indexation — we fix the foundations Google rewards.' },
  { icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', title: 'Local SEO', desc: 'Dominate Google Maps and local packs in your city or suburb. Perfect for US, Canadian and Australian businesses.' },
  { icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'eCommerce SEO', desc: 'Product, category and collection page optimisation that drives qualified buyers — not just traffic.' },
  { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', title: 'International SEO', desc: 'Hreflang, geo-targeting and market-specific keyword strategies for US, Canada and Australia.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Content Strategy & SEO Writing', desc: 'E-E-A-T-compliant blog posts, landing pages and pillar content that ranks and converts.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Link Building', desc: 'White-hat authority link acquisition from relevant, high-DR publications — no PBNs, no spam.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'SEO Audits', desc: 'Comprehensive 200-point audits covering technical, on-page, off-page and competitor benchmarking.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Enterprise SEO', desc: 'Scalable SEO operations for large sites — automated auditing, log file analysis, and CMS integration.' },
  { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'SEO Reporting & Analytics', desc: 'Monthly transparent reporting — rankings, traffic, conversions, and ROI — in plain English.' },
];

const WHY_MATTERS = [
  { num: '68%', desc: 'of all online experiences begin with a search engine — making SEO the highest-reach acquisition channel', source: 'BrightEdge Research' },
  { num: '53%', desc: 'of all website traffic comes from organic search — more than paid, social, and email combined', source: 'BrightEdge, 2024' },
  { num: '14.6%', desc: 'close rate for organic SEO leads vs. 1.7% for outbound marketing leads', source: 'Search Engine Journal' },
];

const RESULTS = [
  { metric: '312%', h3: '312% Organic Traffic Growth in 8 Months', label: 'Organic traffic growth', sub: 'US SaaS client — technical SEO + content strategy' },
  { metric: '#1', h3: 'Ranked #1 on Google for Primary Keyword', label: 'Google ranking achieved', sub: 'Competitive AU retail keyword — 14 months' },
  { metric: '4.1×', h3: '4.1× Return on SEO Investment', label: 'Return on SEO investment', sub: 'Canadian eCommerce brand — 12-month campaign' },
];

const PROCESS = [
  { n: '01', title: 'Discovery & Audit', desc: 'Deep-dive into your site, competitors, and market. We identify every opportunity and obstacle before writing a single word.' },
  { n: '02', title: 'Strategy Blueprint', desc: 'A custom roadmap — keyword clusters, content gaps, technical priorities, and link targets — mapped to your revenue goals.' },
  { n: '03', title: 'Technical Fixes', desc: 'Our devs fix crawl errors, speed issues, schema, canonicals, and indexation problems. The work that 90% of agencies skip.' },
  { n: '04', title: 'Content & On-Page', desc: 'We create or optimise pages with E-E-A-T best practices, semantic HTML, and conversion-focused copy.' },
  { n: '05', title: 'Authority Building', desc: 'Outreach-driven link acquisition from relevant, high-authority publications — building trust with Google over time.' },
  { n: '06', title: 'Measure & Scale', desc: 'Monthly reporting on rankings, traffic, and revenue impact. We double down on what works and adjust what does not.' },
];

const WHY = [
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: '15+ Years of SEO Experience', desc: 'We have been optimising websites since before Google Panda. We have seen every algorithm change and adapted accordingly.' },
  { icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9', title: 'US, Canada & Australia Focus', desc: 'We understand English-language search behaviour, local intent, and the competitive landscape in your market.' },
  { icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', title: 'No Lock-in Contracts', desc: 'We earn your business every month. Month-to-month engagements — you stay because results speak for themselves.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Full-Stack SEO Team', desc: 'Technical SEOs, content strategists, developers and link builders working as one cohesive unit on your account.' },
  { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Transparent Reporting', desc: 'No vanity metrics. Every report ties SEO activity directly to traffic, leads and revenue — the numbers that matter.' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'White-Hat Only', desc: 'Every tactic we use aligns with Google guidelines. Your rankings are built to last, not to disappear after the next update.' },
];

const FAQS = [
  { q: 'What is SEO and why does my business need it?', a: "SEO (Search Engine Optimisation) is the practice of improving a website's visibility in organic (non-paid) search engine results. When someone searches for a product or service you offer, SEO determines whether your website appears at the top of the results or on page 5. 68% of all online experiences begin with a search engine, and 53% of all website traffic comes from organic search. Without SEO, you are invisible to the majority of potential customers actively looking for what you sell. SEO is the highest long-term ROI marketing channel for most businesses — generating qualified traffic long after the work is done." },
  { q: 'How long does SEO take to show results?', a: 'Most clients see meaningful movement in rankings and organic traffic within 3 to 6 months. Competitive industries or technically complex sites may take longer. The timeline depends on three factors: your current domain authority, the competitiveness of your target keywords, and the speed at which technical fixes and content can be implemented. We set honest expectations upfront and show you progress at every step — with monthly reports tracking keyword rankings, organic traffic, and revenue-impacting metrics.' },
  { q: 'What is technical SEO and why does it matter?', a: "Technical SEO refers to the optimisation of a website's infrastructure so that search engines can effectively crawl, index, and render its content. Key technical SEO factors include: site speed and Core Web Vitals, mobile-friendliness, crawl budget management, URL structure and canonicalisation, XML sitemaps, robots.txt, structured data (schema markup), HTTPS security, and internal linking architecture. Without solid technical foundations, even the best content and link building will underperform. Technical SEO is the foundation that everything else is built on." },
  { q: 'What is on-page SEO?', a: "On-page SEO refers to optimisations made directly to the content and HTML source code of individual web pages. This includes: keyword research and targeting, title tags and meta descriptions, heading structure (H1–H6), content quality and E-E-A-T signals, image alt text, internal linking, page experience signals, and structured data markup. On-page SEO ensures each page clearly communicates its topic to Google and satisfies the search intent of the user. It directly influences which keywords a page ranks for and how compelling it appears in search results." },
  { q: 'What is local SEO and do I need it?', a: "Local SEO is the practice of optimising your online presence to appear in geographically relevant searches — such as 'plumber near me' or 'accountant in Sydney.' It primarily involves Google Business Profile (formerly Google My Business) optimisation, local citation building, location-specific landing pages, and earning reviews on Google and industry directories. If your business serves a specific geographic area — whether a single city, state/province, or country — local SEO is essential. It drives high-intent, ready-to-buy customers who are actively searching in your area." },
  { q: 'Do you work with businesses in the US, Canada and Australia?', a: 'Yes — these are our primary markets. We understand the search landscape, local intent signals, and competitive dynamics in each region. We schedule all meetings and calls in your time zone, produce reporting benchmarked against local competitors, and have specific expertise in US, Canadian, and Australian market nuances. We also have clients across the UK and Europe.' },
  { q: 'What makes 1Solutions different from other SEO agencies?', a: "Three things: we are a full-stack team (technical + content + links), we have 15+ years of real results, and we give you complete transparency on what we are doing and why. No black-box tactics, no lock-in contracts. Our reporting shows you exactly which actions were taken, what changed in rankings and traffic, and what the plan is for next month. We also don't outsource work — every element of your SEO is executed by our in-house team." },
  { q: 'How does link building affect SEO rankings?', a: "Backlinks — links from other websites pointing to yours — are one of the strongest ranking signals in Google's algorithm. They act as votes of authority: a link from a high-DR, topically relevant website tells Google that your content is trustworthy and worth ranking. The #1 result on Google has, on average, 3.8× more backlinks than pages ranking 2–10. We build links exclusively through manual outreach to real, editorial websites — no PBNs, no link farms, no spam. All links are DR40+ minimum with genuine organic traffic." },
  { q: 'What is an SEO audit?', a: "An SEO audit is a comprehensive evaluation of a website's current SEO performance across technical, on-page, off-page, and content dimensions. Our 200-point audit covers: crawlability and indexation issues, Core Web Vitals and page speed, duplicate content and canonicalisation, keyword mapping gaps, content quality assessment, backlink profile analysis, competitor benchmarking, and schema markup implementation. An audit identifies precisely what is holding your rankings back and provides a prioritised action plan. We offer a free initial audit — no obligation." },
  { q: 'Do you offer SEO packages or custom plans?', a: 'Both. We have structured monthly SEO packages for SMBs, and fully custom enterprise SEO programmes for larger websites. Every engagement starts with an audit so we only recommend what you actually need. Our packages include Technical SEO, Local SEO, Content Strategy, and Link Building components — with clear deliverables and reporting at every level. Custom plans are available for multi-location businesses, eCommerce stores, enterprise sites, and international targeting.' },
  { q: 'Can you recover a site hit by a Google penalty or algorithm update?', a: 'Yes. We have successfully recovered dozens of sites from manual penalties (link schemes, thin content) and algorithmic drops (Panda, Penguin, Helpful Content Update). Recovery starts with a forensic audit to identify the root cause — whether it is unnatural links, thin/duplicate content, poor E-E-A-T signals, or Core Web Vitals failures. We then build a remediation plan, submit disavow files where needed, and implement the content and technical fixes required to regain rankings. Recovery timelines vary but typically show improvement within 3 to 6 months of remediation.' },
  { q: 'Do you guarantee first page rankings?', a: "No reputable SEO agency guarantees specific rankings — and you should be very cautious of any agency that does. Google's algorithm uses hundreds of signals and changes frequently. What we guarantee is: best-practice execution across all SEO dimensions, complete transparency on everything we do, monthly reporting on measurable progress, and honest communication if targets need adjusting. Our track record speaks for itself — 97% client retention and consistent ranking improvements across 500+ campaigns." },
  { q: 'What is E-E-A-T and why does it matter?', a: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness — the signals Google's quality raters use to evaluate the credibility of web content, especially in YMYL (Your Money or Your Life) niches like health, finance, and legal. Google's Helpful Content and core algorithm updates increasingly reward content that demonstrates real-world experience, subject-matter expertise, and authoritative sourcing. We build E-E-A-T into every piece of content we create: named authors, credentials, original research, accurate citations, and strong backlink profiles from trusted sources." },
  { q: 'What is the difference between SEO and PPC?', a: "SEO (organic search) and PPC (pay-per-click advertising) are both ways to appear in search results, but they work very differently. PPC gives you immediate visibility but stops the moment you stop paying — it is like renting a shop. SEO takes longer to build but compounds over time — it is like owning the shop. A well-executed SEO strategy generates traffic 24/7 at no per-click cost, with higher trust signals (organic results are clicked 10× more than ads for many query types). For most businesses, SEO delivers significantly higher long-term ROI than PPC." },
  { q: 'Can you do SEO for Shopify, WooCommerce, or Magento?', a: 'Yes. eCommerce SEO is one of our specialities. We have deep experience with Shopify, WooCommerce, Magento, BigCommerce, and custom-built eCommerce platforms. Key eCommerce SEO work includes: product page optimisation, category page keyword targeting, faceted navigation (crawl budget management), structured data for rich snippets (product schema, reviews, pricing), Google Shopping feed optimisation, site speed for large catalogues, and international eCommerce targeting. We have delivered significant organic traffic and revenue growth for eCommerce clients across US, Canadian, and Australian markets.' },
  { q: 'How do I know if my SEO is working?', a: "The primary metrics we track to measure SEO progress are: organic keyword rankings (positions for your target keywords), organic sessions (traffic from Google to your website), goal completions or conversions from organic traffic, domain authority/DR growth, and referring domain count. We provide a monthly report covering all of these in plain English — no spreadsheet dumps. Early indicators (rankings movement, crawl improvements) are visible within the first 6 to 8 weeks. Significant traffic and revenue impact is typically measurable by month 4 to 6." },
  { q: 'How much does SEO cost?', a: "SEO pricing depends on the scope of work, the competitiveness of your market, and the size of your website. Our structured monthly SEO packages start from $799/month for SMBs and scale based on deliverables. Enterprise programmes and competitive markets (finance, legal, SaaS) are priced on a custom basis. Every engagement starts with a free audit so we can scope the work accurately — you will only pay for what you genuinely need, not a one-size-fits-all retainer. Contact us for a transparent, itemised proposal." },
  { q: 'What happens if Google changes its algorithm?', a: "Algorithm updates are a constant reality of SEO — Google updates its algorithm thousands of times per year, with major core updates several times annually. Our white-hat, E-E-A-T-driven approach is specifically designed to be algorithm-resistant. We do not use tactics that work in the short term but risk penalties (PBNs, keyword stuffing, thin content). When a major update rolls out, we monitor our clients' performance within 24 hours, analyse any movements, and adjust strategy where needed. Long-term, well-executed SEO only gets stronger with algorithm updates because Google keeps raising the bar against manipulative tactics." },
  { q: 'What does your onboarding process look like?', a: 'After signing, we begin with a comprehensive technical and content audit (week 1 to 2), followed by a strategy presentation (week 3). Active SEO work begins in week 4. You will have a dedicated account manager from day one. The onboarding includes: Google Analytics and Search Console access setup, keyword research and mapping, technical audit findings briefing, content gap analysis, and a 90-day roadmap presentation. We schedule a kick-off call to align on goals, KPIs, and communication cadence before anything else.' },
  { q: 'Do you provide white-label SEO for agencies?', a: "Yes. We offer white-label SEO services for digital marketing agencies, web design firms, and PR agencies who want to offer SEO under their own brand. Under a white-label arrangement, all reports, communications, and deliverables are unbranded — your clients see only your agency's branding. We have over 20 agency partners who resell our SEO services. White-label pricing is the same as our standard packages. Contact us to discuss agency partnership arrangements and volume pricing." },
];

const STATS_HERO = [
  { num: '500+', lbl: 'SEO Projects Delivered' },
  { num: '15+',  lbl: 'Years of Experience' },
  { num: '97%',  lbl: 'Client Retention Rate' },
  { num: '3×',   lbl: 'Avg. Traffic Growth' },
];

export default function SeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [statsStarted, setStatsStarted] = useState(false);
  const sectionRefs = useRef({});
  const statsRef = useRef(null);

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
        { threshold: 0.12 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services Company', item: 'https://www.1solutions.biz/seo-services-company/' },
        ],
      },
      {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: 'https://www.1solutions.biz/images/1solutions-logo.png',
        sameAs: ['https://www.linkedin.com/company/1solutions/', 'https://twitter.com/1solutionsbiz', 'https://www.facebook.com/1solutionsbiz'],
        address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '142', bestRating: '5' },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.1solutions.biz/seo-services-company/',
        url: 'https://www.1solutions.biz/seo-services-company/',
        name: 'SEO Services Company | Rank #1 on Google | 1Solutions',
        description: '1Solutions is a results-driven SEO company serving US, Canada and Australia. Technical SEO, content strategy, link building and eCommerce SEO — 15+ years experience.',
        dateModified: '2026-06-24',
        inLanguage: 'en-US',
      },
      {
        '@type': 'Service',
        name: 'SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        serviceType: 'Search Engine Optimisation',
        url: 'https://www.1solutions.biz/seo-services-company/',
        description: 'Full-service SEO company offering technical SEO, content strategy, link building and local SEO for businesses in US, Canada and Australia.',
        areaServed: ['US', 'CA', 'AU'],
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '142', bestRating: '5' },
        dateModified: '2026-06-24',
      },
      {
        '@type': 'HowTo',
        name: 'How Our SEO Process Works',
        description: 'Our 6-step SEO methodology for delivering sustainable organic search growth.',
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
        <title>SEO Services Company | Rank #1 on Google | 1Solutions</title>
        <meta name="description" content="1Solutions is a results-driven SEO company serving US, Canada and Australia. Technical SEO, content strategy, link building and eCommerce SEO — all under one roof. 15+ years experience." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/seo-services-company/" />
        <meta property="og:title" content="SEO Services Company | Rank #1 on Google | 1Solutions" />
        <meta property="og:description" content="15+ years of SEO expertise. Technical SEO, local SEO, eCommerce SEO, link building and content strategy for US, Canada and Australia businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.1solutions.biz/seo-services-company/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          /* ── BASE ── */
          .seo-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; overflow-x:hidden; position:relative; }
          .seo-page *,.seo-page *::before,.seo-page *::after { box-sizing:border-box; }

          /* ── ORBS ── */
          .seo-orb1 { position:fixed;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.30) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .seo-orb2 { position:fixed;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.25) 0%,rgba(245,158,11,0.12) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .seo-orb3 { position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* ── HERO ── */
          .seo-hero { position:relative;overflow:hidden;z-index:1; }
          .seo-hero::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .seo-hero::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .seo-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .seo-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .seo-h1 { font-size:clamp(2rem,5vw,3.4rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .seo-hero-sub { font-size:16px;color:#3A507A;line-height:1.65;max-width:640px;margin:0 auto 28px; }

          /* ── HERO BUTTON ── */
          .seo-btn-hero { position:relative;overflow:hidden;display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1);margin-bottom:32px; }
          .seo-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }
          .seo-btn-hero::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:seo-shimmer 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes seo-shimmer { 0% { left:-120%; } 35%,100% { left:160%; } }
          .seo-btn-outline { display:inline-block;padding:14px 32px;background:transparent;border:1.5px solid rgba(15,52,96,0.25);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;margin-bottom:32px;margin-left:12px; }
          .seo-btn-outline:hover { border-color:rgba(217,119,6,0.5);color:#D97706;transform:translateY(-2px); }

          /* ── CLIENTS BAR ── */
          .seo-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .seo-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .seo-clients-logos { width:100%;overflow:hidden; }
          .seo-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:seo-marquee 28s linear infinite; }
          .seo-logos-track:hover { animation-play-state:paused; }
          @keyframes seo-marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
          .seo-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .seo-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* ── STATS BAR ── */
          .seo-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .seo-stat { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .seo-stat:last-child { border-right:none; }
          .seo-stat-l { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .seo-stat-v { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          /* ── SHARED SECTION ── */
          .seo-sec { padding:80px 40px;position:relative;z-index:1; }
          .seo-sec-in { max-width:1280px;margin:0 auto; }
          .seo-white { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08); }
          .seo-sec-ey { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .seo-sec-ttl { font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .seo-sec-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px; }

          /* ── REVEAL ── */
          .seo-reveal { opacity:0;transform:translateY(44px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .seo-reveal.seo-visible { opacity:1;transform:translateY(0); }

          /* ── GLASS CARD ── */
          .seo-glass { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }

          /* ── DEFINITION ── */
          .seo-def-box { padding:36px;max-width:1040px;margin:0 auto; }
          .seo-def-intro { font-size:1.02rem;color:#374151;line-height:1.8;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid rgba(15,52,96,0.08); }
          .seo-def-intro strong { color:#0F3460; }
          .seo-def-aspects { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
          .seo-def-aspect { background:rgba(255,255,255,0.55);border:1px solid rgba(15,52,96,0.10);border-radius:14px;padding:20px;transition:border-color 0.2s; }
          .seo-def-aspect:hover { border-color:rgba(217,119,6,0.35); }
          .seo-def-t { font-weight:700;color:#0F3460;font-size:14px;margin-bottom:6px; }
          .seo-def-d { font-size:13px;color:#4A6080;line-height:1.6; }

          /* ── WHY MATTERS ── */
          .seo-wm-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .seo-wm-card { padding:32px 28px;text-align:center;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .seo-wm-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45) !important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1) !important; }
          .seo-wm-num { font-size:3.2rem;font-weight:900;background:linear-gradient(90deg,#0F3460,#D97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1.5px;line-height:1;margin-bottom:12px; }
          .seo-wm-desc { font-size:14px;color:#374151;line-height:1.6;margin-bottom:8px; }
          .seo-wm-src { font-size:11px;color:#9ca3af;font-style:italic; }

          /* ── SERVICES ── */
          .seo-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
          .seo-svc-card { padding:28px 24px;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .seo-svc-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45) !important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1) !important; }
          .seo-svc-icon { width:48px;height:48px;border-radius:14px;background:rgba(15,52,96,0.06);display:flex;align-items:center;justify-content:center;margin-bottom:16px;transition:background 0.2s; }
          .seo-svc-card:hover .seo-svc-icon { background:rgba(217,119,6,0.10); }
          .seo-svc-icon svg { width:22px;height:22px;stroke:#0F3460;transition:stroke 0.2s; }
          .seo-svc-card:hover .seo-svc-icon svg { stroke:#D97706; }
          .seo-svc-t { font-size:1rem;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.3; }
          .seo-svc-d { font-size:13.5px;color:#4A6080;line-height:1.7;margin:0; }

          /* ── RESULTS DARK ── */
          .seo-results { background:linear-gradient(135deg,#071e3d 0%,#0F3460 40%,#0a2549 100%);padding:80px 40px;position:relative;overflow:hidden;z-index:1; }
          .seo-res-orb { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.18) 0%,transparent 65%);top:-150px;right:-100px;pointer-events:none;filter:blur(30px); }
          .seo-res-in { max-width:1280px;margin:0 auto;position:relative;z-index:2; }
          .seo-res-ey { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:10px;display:block;text-align:center; }
          .seo-res-ttl { font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;text-align:center;margin-bottom:12px;line-height:1.15;background:linear-gradient(90deg,#fff 30%,#fcd34d 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .seo-res-sub { font-size:1rem;color:rgba(255,255,255,0.60);text-align:center;max-width:560px;margin:0 auto 52px; }
          .seo-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .seo-res-card { background:rgba(255,255,255,0.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:32px;text-align:center;transition:background 0.25s,border-color 0.25s; }
          .seo-res-card:hover { background:rgba(255,255,255,0.11);border-color:rgba(217,119,6,0.45); }
          .seo-res-metric { font-size:3rem;font-weight:900;color:#fcd34d;margin-bottom:6px;line-height:1;letter-spacing:-2px; }
          .seo-res-h3 { position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap; }
          .seo-res-label { font-size:14px;color:rgba(255,255,255,0.80);font-weight:600;margin-bottom:6px; }
          .seo-res-sub2 { font-size:12px;color:rgba(255,255,255,0.50); }

          /* ── WHY ── */
          .seo-why-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
          .seo-why-card { padding:28px 24px;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .seo-why-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45) !important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1) !important; }
          .seo-why-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;margin-bottom:14px; }
          .seo-why-icon svg { width:26px;height:26px;stroke:#D97706;fill:none; }
          .seo-why-t { font-size:15px;font-weight:700;color:#0F1F40;margin:0 0 8px; }
          .seo-why-d { font-size:13.5px;color:#4A6080;line-height:1.7;margin:0; }

          /* ── PROCESS ── */
          .seo-proc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:28px; }
          .seo-proc-card { padding:28px 24px;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .seo-proc-card:hover { transform:translateY(-5px);border-color:rgba(217,119,6,0.40) !important;box-shadow:0 16px 48px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1) !important; }
          .seo-proc-n { font-size:3rem;font-weight:900;color:rgba(15,52,96,0.08);line-height:1;margin-bottom:6px;letter-spacing:-2px; }
          .seo-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#D97706,rgba(217,119,6,0.25));border-radius:2px;margin-bottom:14px; }
          .seo-proc-t { font-size:1rem;font-weight:700;color:#0F1F40;margin:0 0 8px; }
          .seo-proc-d { font-size:13.5px;color:#4A6080;line-height:1.7;margin:0; }

          /* ── TOOLS ── */
          .seo-tools-wrap { display:flex;flex-wrap:wrap;gap:12px; }
          .seo-tool-pill { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.85);border-radius:50px;padding:9px 18px;font-size:13px;font-weight:500;color:#374151;box-shadow:0 2px 10px rgba(15,52,96,0.06);transition:border-color 0.2s,color 0.2s,box-shadow 0.2s; }
          .seo-tool-pill:hover { border-color:rgba(217,119,6,0.45);color:#D97706;box-shadow:0 4px 16px rgba(15,52,96,0.10); }
          .seo-tool-dot { width:7px;height:7px;border-radius:50%;background:#D97706;flex-shrink:0; }

          /* ── INDUSTRIES ── */
          .seo-ind-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:12px; }
          .seo-ind-pill { background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.85);border-radius:12px;padding:14px 16px;font-size:13px;font-weight:600;color:#374151;text-align:center;box-shadow:0 2px 10px rgba(15,52,96,0.06);transition:all 0.2s; }
          .seo-ind-pill:hover { background:rgba(255,255,255,0.85);border-color:rgba(217,119,6,0.45);color:#D97706;box-shadow:0 6px 20px rgba(15,52,96,0.10); }

          /* ── FAQ ── */
          .seo-faq-list { display:flex;flex-direction:column;gap:12px; }
          .seo-fitem { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .seo-fitem.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .seo-fitem.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .seo-fq { width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .seo-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .seo-fitem.open .seo-fq-badge { background:#D97706;color:#fff; }
          .seo-fq-text { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .seo-fitem.open .seo-fq-text { color:#D97706; }
          .seo-fq-chevron { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .seo-fitem.open .seo-fq-chevron { transform:rotate(180deg);color:#D97706; }
          .seo-fa { font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px; }

          /* ── CONTACT ── */
          .seo-contact { padding:72px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .seo-contact-in { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px; }
          .seo-contact-ttl { font-size:clamp(2rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .seo-contact-desc { font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px; }
          .seo-benefits-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:16px; }
          .seo-ben-item { display:flex;gap:12px;align-items:flex-start; }
          .seo-ben-icon { width:20px;height:20px;stroke:#D97706;fill:none;flex-shrink:0;margin-top:2px; }
          .seo-ben-text { font-size:13px;color:#4A6080;line-height:1.55; }
          .seo-contact-stats { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid rgba(15,52,96,0.10); }
          .seo-cstat-num { font-size:36px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px; }
          .seo-cstat-txt { font-size:12px;color:#4A6080;font-weight:500;line-height:1.4; }
          .seo-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .seo-form-box h3 { font-size:24px;font-weight:700;margin:0 0 24px;color:#0F1F40;letter-spacing:-0.5px; }
          .seo-form { display:flex;flex-direction:column;gap:16px; }
          .seo-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .seo-fg { display:flex;flex-direction:column;gap:6px; }
          .seo-fg.full { grid-column:1/-1; }
          .seo-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .seo-fg input,.seo-fg textarea,.seo-fg select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .seo-fg input:focus,.seo-fg textarea:focus,.seo-fg select:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .seo-phone-wrap { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .seo-phone-wrap select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .seo-phone-wrap input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .seo-phone-wrap input:focus { outline:none; }
          .seo-consent { display:flex;gap:8px;align-items:flex-start;margin-top:4px; }
          .seo-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .seo-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .seo-consent a { color:#0F3460;text-decoration:none; }
          .seo-submit { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .seo-submit:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* ── AUTHOR BAR ── */
          .seo-author-bar { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.45) 100%);border-top:1px solid rgba(217,119,6,0.15);border-bottom:1px solid rgba(217,119,6,0.15);padding:20px 40px;position:relative;z-index:1; }
          .seo-author-inner { max-width:860px;margin:0 auto;display:flex;align-items:center;gap:16px; }
          .seo-author-icon { width:44px;height:44px;background:linear-gradient(135deg,#0F3460,#1a3a6e);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .seo-author-text { font-size:13px;color:#4A6080;line-height:1.55; }
          .seo-author-text strong { color:#0F3460; }

          /* ── CTA ── */
          .seo-cta { background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);padding:80px 40px;position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80);text-align:center; }
          .seo-cta-ey { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:16px;display:block; }
          .seo-cta-t { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2; }
          .seo-cta-s { font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 28px;max-width:520px; }
          .seo-pricing-note { background:rgba(255,255,255,0.60);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:16px 24px;margin:0 auto 32px;max-width:620px;font-size:14px;color:#4A6080;line-height:1.65;text-align:left;box-shadow:0 4px 16px rgba(15,52,96,0.06); }
          .seo-pricing-note strong { color:#0F3460; }
          .seo-cta-btns { display:flex;gap:14px;justify-content:center;flex-wrap:wrap; }
          .seo-btn-p { display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 6px 24px rgba(15,52,96,0.25); }
          .seo-btn-p:hover { background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.30); }
          .seo-btn-s { display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);color:#0F3460;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .seo-btn-s:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* ── RESPONSIVE ── */
          @media(max-width:1024px) {
            .seo-svc-grid { grid-template-columns:repeat(2,1fr); }
            .seo-why-grid { grid-template-columns:repeat(2,1fr); }
            .seo-proc-grid { grid-template-columns:repeat(2,1fr); }
            .seo-res-grid { grid-template-columns:1fr;max-width:400px;margin-left:auto;margin-right:auto; }
            .seo-wm-grid { grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto; }
            .seo-contact-in { grid-template-columns:1fr; }
            .seo-ind-grid { grid-template-columns:repeat(3,1fr); }
          }
          @media(max-width:768px) {
            .seo-sec,.seo-results,.seo-contact,.seo-cta,.seo-author-bar { padding-left:24px;padding-right:24px; }
            .seo-hero-content { padding:36px 20px 24px; }
            .seo-h1 { font-size:clamp(1.7rem,6vw,2.4rem); }
            .seo-clients-bar { padding:16px 20px 36px;gap:12px; }
            .seo-stats { grid-template-columns:repeat(2,1fr);max-width:100%; }
            .seo-stat:nth-child(2) { border-right:none; }
            .seo-stat:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .seo-stat:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .seo-svc-grid,.seo-why-grid,.seo-proc-grid { grid-template-columns:1fr; }
            .seo-def-aspects { grid-template-columns:1fr; }
            .seo-ind-grid { grid-template-columns:repeat(2,1fr); }
            .seo-fq { padding:18px 18px 18px 52px; }
            .seo-fq-text { font-size:14px; }
            .seo-fa { padding:0 18px 18px 52px;font-size:13px; }
            .seo-fq-badge { left:14px; }
            .seo-form-row { grid-template-columns:1fr; }
            .seo-cta-btns { flex-direction:column;align-items:center; }
          }
        `}</style>
      </Head>

      <div className="seo-page">
        {/* Orbs */}
        <div className="seo-orb1"/><div className="seo-orb2"/><div className="seo-orb3"/>

        {/* ── HERO ── */}
        <div className="seo-hero">
          <div className="seo-hero-content">
            <span className="seo-eyebrow">Trusted SEO Company — US · Canada · Australia</span>
            <h1 className="seo-h1">SEO Services That Rank Your Business at the Top of Google</h1>
            <p className="seo-hero-sub">1Solutions is a 15-year-old SEO agency delivering measurable, sustainable organic growth for businesses across the US, Canada, and Australia. From technical foundations to authority links — we cover every dimension of modern search.</p>
            <a href="#contact" className="seo-btn-hero">Get a Free SEO Audit Now</a>
            <Link href="/affordable-seo-packages/" className="seo-btn-outline">View Plans</Link>
          </div>

          <div className="seo-stats" ref={statsRef}>
            {[['SEO Projects Delivered','500+'],['Years of Experience','15+'],['Client Retention Rate','97%'],['Avg. Traffic Growth','3×']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="seo-clients-bar">
            <span className="seo-clients-label">Trusted by Leading Brands</span>
            <div className="seo-clients-logos">
              <div className="seo-logos-track">
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
                ].map(([src, alt]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/, '')} className="seo-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DEFINITION ── */}
        <section className="seo-sec seo-white">
          <div className="seo-sec-in" style={{textAlign:'center'}}>
            <div className={`seo-reveal${visibleSections.has('def')?' seo-visible':''}`} ref={el=>{sectionRefs.current['def']=el;}}>
              <span className="seo-sec-ey">Understanding SEO</span>
              <h2 className="seo-sec-ttl">What Is SEO and How Does It Work?</h2>
              <p className="seo-sec-desc" style={{margin:'0 auto 32px'}}>A plain-English explanation of what SEO is and why it matters for your business.</p>
            </div>
            <div className="seo-glass seo-def-box">
              <p className="seo-def-intro"><strong>SEO (Search Engine Optimisation)</strong> is the practice of improving a website's visibility in organic (non-paid) search engine results so that it appears prominently when potential customers search for products or services you offer. SEO works by aligning your website's technical infrastructure, content quality, and external authority signals with Google's ranking criteria — which evaluate hundreds of signals to determine which pages best answer a given search query. Unlike paid advertising, organic rankings compound over time: a well-optimised page continues generating traffic for months or years without additional spend.</p>
              <div className="seo-def-aspects">
                {[
                  { t: 'The three pillars of SEO', d: 'Technical SEO (crawlability, speed, structure), On-page SEO (content, keywords, schema), and Off-page SEO (backlinks, authority). All three must work together for sustainable rankings.' },
                  { t: 'How Google ranks pages', d: "Google's algorithm evaluates relevance (does this page match the query?), authority (do trusted sites link to it?), and experience (is it fast, secure, and easy to use?). SEO optimises all three dimensions." },
                  { t: 'Why it compounds over time', d: 'Each piece of content, each backlink, and each technical fix adds permanently to your site\'s authority. SEO momentum builds month over month — unlike PPC which stops the moment you stop paying.' },
                ].map(a => (
                  <div key={a.t} className="seo-def-aspect">
                    <div className="seo-def-t">{a.t}</div>
                    <div className="seo-def-d">{a.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY IT MATTERS ── */}
        <section className="seo-sec">
          <div className="seo-sec-in">
            <div className={`seo-reveal${visibleSections.has('wm')?' seo-visible':''}`} ref={el=>{sectionRefs.current['wm']=el;}} style={{textAlign:'center',marginBottom:40}}>
              <span className="seo-sec-ey">The Data</span>
              <h2 className="seo-sec-ttl">Why SEO Is Your Most Valuable Marketing Channel</h2>
              <p className="seo-sec-desc" style={{margin:'0 auto'}}>Organic search drives more website traffic than all other channels combined.</p>
            </div>
            <div className="seo-wm-grid">
              {WHY_MATTERS.map(w => (
                <div key={w.num} className="seo-wm-card seo-glass">
                  <div className="seo-wm-num">{w.num}</div>
                  <div className="seo-wm-desc">{w.desc}</div>
                  <div className="seo-wm-src">Source: {w.source}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="seo-sec seo-white" id="services">
          <div className="seo-sec-in">
            <div className={`seo-reveal${visibleSections.has('svc')?' seo-visible':''}`} ref={el=>{sectionRefs.current['svc']=el;}}>
              <span className="seo-sec-ey">What We Do</span>
              <h2 className="seo-sec-ttl">Full-Spectrum SEO Services</h2>
              <p className="seo-sec-desc">Every ranking signal, covered. We combine technical excellence, strategic content, and authoritative link building to deliver durable results across every type of business and industry.</p>
            </div>
            <div className="seo-svc-grid">
              {SERVICES.map(s => (
                <div key={s.title} className="seo-svc-card seo-glass">
                  <div className="seo-svc-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                  </div>
                  <h3 className="seo-svc-t">{s.title}</h3>
                  <p className="seo-svc-d">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="seo-results">
          <div className="seo-res-orb"/>
          <div className="seo-res-in">
            <span className="seo-res-ey">Client Results</span>
            <h2 className="seo-res-ttl">Real Numbers. Real Businesses.</h2>
            <p className="seo-res-sub">Representative results from active clients. Individual results vary by niche, competition, and starting authority.</p>
            <div className="seo-res-grid">
              {RESULTS.map(r => (
                <div key={r.metric} className="seo-res-card">
                  <h3 className="seo-res-h3">{r.h3}</h3>
                  <div className="seo-res-metric">{r.metric}</div>
                  <div className="seo-res-label">{r.label}</div>
                  <div className="seo-res-sub2">{r.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="seo-sec seo-white" id="why-us">
          <div className="seo-sec-in">
            <div className={`seo-reveal${visibleSections.has('why')?' seo-visible':''}`} ref={el=>{sectionRefs.current['why']=el;}}>
              <span className="seo-sec-ey">Why 1Solutions</span>
              <h2 className="seo-sec-ttl">The SEO Agency That Holds Itself Accountable</h2>
              <p className="seo-sec-desc">We do not chase vanity rankings. We tie every action to your bottom line and show you the evidence every single month.</p>
            </div>
            <div className="seo-why-grid">
              {WHY.map(w => (
                <div key={w.title} className="seo-why-card seo-glass">
                  <div className="seo-why-icon">
                    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <h3 className="seo-why-t">{w.title}</h3>
                  <p className="seo-why-d">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="seo-sec" id="process">
          <div className="seo-sec-in">
            <div className={`seo-reveal${visibleSections.has('proc')?' seo-visible':''}`} ref={el=>{sectionRefs.current['proc']=el;}}>
              <span className="seo-sec-ey">How We Work</span>
              <h2 className="seo-sec-ttl">Our 6-Step SEO Process</h2>
              <p className="seo-sec-desc">A structured, repeatable methodology that delivers compounding results — month after month, year after year.</p>
            </div>
            <div className="seo-proc-grid">
              {PROCESS.map(p => (
                <div key={p.n} className="seo-proc-card seo-glass">
                  <div className="seo-proc-n">{p.n}</div>
                  <div className="seo-proc-line"/>
                  <h3 className="seo-proc-t">{p.title}</h3>
                  <p className="seo-proc-d">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section className="seo-sec seo-white" id="tools">
          <div className="seo-sec-in">
            <div className={`seo-reveal${visibleSections.has('tools')?' seo-visible':''}`} ref={el=>{sectionRefs.current['tools']=el;}}>
              <span className="seo-sec-ey">Our Toolkit</span>
              <h2 className="seo-sec-ttl">Tools &amp; Technology We Use</h2>
              <p className="seo-sec-desc">We invest in enterprise-grade SEO tooling so every decision is backed by data — not guesswork.</p>
            </div>
            <div className="seo-tools-wrap">
              {['Google Search Console','Google Analytics 4','Ahrefs','SEMrush','Screaming Frog','Surfer SEO','Moz Pro','Majestic','Sitebulb','Looker Studio','BrightEdge','Hotjar'].map(t => (
                <span key={t} className="seo-tool-pill"><span className="seo-tool-dot"/>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="seo-sec" id="industries">
          <div className="seo-sec-in">
            <div className={`seo-reveal${visibleSections.has('ind')?' seo-visible':''}`} ref={el=>{sectionRefs.current['ind']=el;}}>
              <span className="seo-sec-ey">Industries We Serve</span>
              <h2 className="seo-sec-ttl">SEO for Every Industry</h2>
              <p className="seo-sec-desc">We have delivered SEO results across a wide range of industries and business models — from early-stage startups to large enterprises.</p>
            </div>
            <div className="seo-ind-grid">
              {['eCommerce','SaaS & Software','Healthcare','Real Estate','Legal & Law Firms','Finance & BFSI','Education & EdTech','Travel & Hospitality','Retail','Manufacturing','Automotive','Wellness & Fitness'].map(ind => (
                <div key={ind} className="seo-ind-pill">{ind}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="seo-contact" id="contact">
          <div className="seo-contact-in">
            <div>
              <h2 className="seo-contact-ttl">Get Your Free<br/>SEO Audit Today</h2>
              <p className="seo-contact-desc">Tell us about your website and goals. We will analyse your current SEO performance and share a clear, actionable roadmap — completely free, no obligations.</p>
              <div className="seo-benefits-box">
                {[
                  { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', text:'Your details are 100% confidential. We never share your information.' },
                  { icon:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', text:'A senior SEO strategist personally reviews your site — not an automated tool.' },
                  { icon:'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-6v-4m0-4h.01', text:'We respond within 24 business hours with your custom audit findings.' },
                  { icon:'M20 6 9 17l-5-5', text:"No hard sell. If we are not the right fit, we will tell you honestly." },
                ].map((b, i) => (
                  <div className="seo-ben-item" key={i}>
                    <svg className="seo-ben-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={b.icon}/></svg>
                    <span className="seo-ben-text">{b.text}</span>
                  </div>
                ))}
                <div className="seo-contact-stats">
                  {[['500+','Projects Delivered'],['15+','Years Experience'],['97%','Client Retention']].map(([num,txt]) => (
                    <div key={txt}>
                      <div className="seo-cstat-num">{num}</div>
                      <div className="seo-cstat-txt">{txt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="seo-form-box">
                <h3>Request Free SEO Audit</h3>
                <form className="seo-form" onSubmit={e=>e.preventDefault()}>
                  <div className="seo-form-row">
                    <div className="seo-fg"><label>Full Name*</label><input type="text" placeholder="Full Name*" required/></div>
                    <div className="seo-fg"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required/></div>
                  </div>
                  <div className="seo-form-row">
                    <div className="seo-fg">
                      <label>Phone Number*</label>
                      <div className="seo-phone-wrap">
                        <select><option value="+91">+91</option><option value="+1">+1</option><option value="+44">+44</option><option value="+61">+61</option></select>
                        <input type="tel" placeholder="Phone Number*" required/>
                      </div>
                    </div>
                    <div className="seo-fg"><label>Website URL*</label><input type="url" placeholder="https://yourwebsite.com" required/></div>
                  </div>
                  <div className="seo-fg full">
                    <label>Current SEO Challenge*</label>
                    <select required>
                      <option value="">Select your main SEO challenge</option>
                      <option>My site does not rank on Google</option>
                      <option>I lost rankings after a Google update</option>
                      <option>I need more organic traffic</option>
                      <option>I want to outrank competitors</option>
                      <option>I need a full SEO strategy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="seo-fg full"><label>Tell Us More*</label><textarea placeholder="Describe your goals, target market, or any SEO challenges you are facing..." rows={5} required/></div>
                  <div className="seo-consent">
                    <input type="checkbox" id="seo-consent" required/>
                    <label htmlFor="seo-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="seo-submit">Get My Free SEO Audit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="seo-sec seo-white" id="faq">
          <div className="seo-sec-in" style={{maxWidth:980,margin:'0 auto'}}>
            <div className={`seo-reveal${visibleSections.has('faq')?' seo-visible':''}`} ref={el=>{sectionRefs.current['faq']=el;}}>
              <span className="seo-sec-ey">Got Questions?</span>
              <h2 className="seo-sec-ttl">Frequently Asked SEO Questions</h2>
              <p className="seo-sec-desc">Everything you need to know about our SEO services before getting started.</p>
            </div>
            <div className="seo-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`seo-fitem${openFaq===i?' open':''}`}>
                  <button className="seo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                    <span className="seo-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span className="seo-fq-text">{f.q}</span>
                    <svg className="seo-fq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="seo-fa" style={{display:openFaq===i?'block':'none'}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUTHOR BAR ── */}
        <div className="seo-author-bar">
          <div className="seo-author-inner">
            <div className="seo-author-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <p className="seo-author-text">Written and reviewed by the <strong>1Solutions SEO Strategy Team</strong> — 15+ years of search engine optimisation experience across 500+ campaigns in US, Canada, and Australia. Updated June 2025 to reflect the latest Google algorithm guidance and E-E-A-T best practices.</p>
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="seo-cta">
          <span className="seo-cta-ey">Ready to Rank?</span>
          <h2 className="seo-cta-t">Start Growing Your Organic Traffic Today</h2>
          <p className="seo-cta-s">Join 500+ businesses that trust 1Solutions for their SEO. No lock-in contracts. Just results.</p>
          <div className="seo-pricing-note">
            <strong>How much does SEO cost?</strong> Our SEO services start from <strong>$799/month</strong> for SMBs. Enterprise and custom programmes are scoped after a free audit. Every engagement begins with a free 200-point audit — <Link href="/affordable-seo-packages/" style={{color:'#D97706',fontWeight:600}}>view our SEO packages</Link> or contact us for a custom quote.
          </div>
          <div className="seo-cta-btns">
            <a href="#contact" className="seo-btn-p">
              Get My Free SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="seo-btn-s">View SEO Packages</Link>
          </div>
        </section>
      </div>
    </>
  );
}
