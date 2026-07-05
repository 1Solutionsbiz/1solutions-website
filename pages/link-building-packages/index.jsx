import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

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

function RazorpayButton({ buttonId, className }) {
  const formRef = useRef(null);
  const loaded = useRef(false);
  useEffect(() => {
    loaded.current = false;
  }, [buttonId]);
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const inject = () => {
      if (loaded.current) return;
      loaded.current = true;
      el.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', buttonId);
      script.async = true;
      el.appendChild(script);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { inject(); observer.disconnect(); }
    }, { rootMargin: '300px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [buttonId]);
  return <form ref={formRef} className={className}/>;
}

function AnimatedStat({ label, val, started, prefix = '' }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  const hasComma = val.includes(',');
  const display = started ? prefix + (hasComma ? num.toLocaleString() : num) + suffix : val;
  return (
    <div className="lbp-stat">
      <div className="lbp-stat-l">{label}</div>
      <div className="lbp-stat-v">{display}</div>
    </div>
  );
}

const PLANS = [
  {
    name: 'Starter',
    slug: 'starter',
    monthlyPrice: 350,
    yearlyPrice: 291,
    yearlySave: 708,
    desc: 'The perfect entry point for small businesses and startups beginning their authority journey.',
    popular: false,
    elite: false,
    badge: null,
    accentColor: '#3B82F6',
    features: [
      '50 backlinks per month',
      'DR30+ / DA20+ domains',
      'Spam Score below 3%',
      '100% manual outreach',
      'Guest post placements',
      'Niche-relevant placements only',
      'Content written for you',
      'Natural anchor text',
      'Link indexing included',
      'Monthly delivery report',
      'Live Google Sheets tracker',
    ],
  },
  {
    name: 'Growth',
    slug: 'growth',
    monthlyPrice: 499,
    yearlyPrice: 415,
    yearlySave: 1008,
    desc: 'For businesses scaling their authority with diverse, high-quality editorial placements.',
    popular: true,
    elite: false,
    badge: 'Most Popular',
    accentColor: '#D97706',
    features: [
      '100 backlinks per month',
      'DR40+ / DA30+ domains',
      'Spam Score below 2%',
      'Guest posts + niche edits',
      'Manual outreach + relationship building',
      'Full anchor text strategy',
      'Competitor backlink gap analysis',
      'Disavow audit (if needed)',
      'E-E-A-T signal placements',
      'Monthly report + strategy call',
      'Live link tracker dashboard',
    ],
  },
  {
    name: 'Authority',
    slug: 'authority',
    monthlyPrice: 899,
    yearlyPrice: 748,
    yearlySave: 1812,
    desc: 'For competitive niches needing scale, premium placements, and AI citation foundations.',
    popular: false,
    elite: false,
    badge: null,
    accentColor: '#059669',
    features: [
      '200 backlinks per month',
      'DR50+ / DA40+ domains',
      'Guest posts + niche edits + digital PR',
      'Premium publication placements',
      'AEO-optimised anchor text strategy',
      'AI citation building (foundational)',
      'Full link profile strategy',
      'Monthly competitor gap analysis',
      'Custom anchor text map',
      'Monthly report + strategy call',
      'Dedicated link building strategist',
    ],
  },
  {
    name: 'AI+GEO Elite',
    slug: 'ai-geo-elite',
    monthlyPrice: 1499,
    yearlyPrice: 1249,
    yearlySave: 3000,
    desc: 'Maximum authority and AI citation building for brands dominating AI-driven search.',
    popular: false,
    elite: true,
    badge: 'AI+GEO Leader',
    accentColor: '#8B5CF6',
    features: [
      '400 backlinks per month',
      'DR60+ / DA50+ - AI-cited sources',
      'All link types + AI authority placements',
      'LLM citation source building',
      'Google AI Overview signal building',
      'Perplexity + ChatGPT source targeting',
      'Brand mention campaigns (linked + unlinked)',
      'Expert author E-E-A-T placements',
      'AEO + GEO anchor text strategy',
      'AI visibility tracking monthly report',
      'Dedicated AI+GEO strategist',
    ],
  },
];

const CASE_STUDIES = [
  {
    industry: 'Legal Services',
    icon: '⚖️',
    growth: '847%',
    trafficFrom: '241',
    trafficTo: '2.3k',
    linksBuilt: 48,
    timeSpan: '12 months',
    package: 'Growth',
  },
  {
    industry: 'SaaS Platform',
    icon: '💻',
    growth: '312%',
    trafficFrom: '1.2k',
    trafficTo: '4.9k',
    linksBuilt: 96,
    timeSpan: '8 months',
    package: 'Authority',
  },
  {
    industry: 'Ecommerce Store',
    icon: '🛒',
    growth: '680%',
    trafficFrom: '2.1k',
    trafficTo: '16.4k',
    linksBuilt: 144,
    timeSpan: '12 months',
    package: 'Authority',
  },
  {
    industry: 'B2B Consultancy',
    icon: '📊',
    growth: '215%',
    trafficFrom: '890',
    trafficTo: '2.8k',
    linksBuilt: 60,
    timeSpan: '9 months',
    package: 'Growth',
  },
];

const WHY_MATTERS = [
  { num: '3.8×', desc: 'more backlinks the #1 Google result has compared to pages ranking 2–10', source: 'Backlinko, 2024' },
  { num: '68%', desc: 'of AI Overview citations go to sites with DR55+ and strong topical authority', source: 'SE Ranking AI Study, 2026' },
  { num: '5×', desc: 'more organic traffic received by pages with a strong backlink profile vs. pages without', source: 'Backlinko Research' },
];

const AI_PILLARS = [
  {
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    title: 'AI Engines Run on Authority',
    desc: 'Google AI Overviews, ChatGPT Search, and Perplexity all use domain authority and referring domains as primary signals when selecting which sources to cite. A higher DR from quality links = higher citation probability.',
    stat: 'DR55+',
    statLabel: 'sites get 3.2× more AI Overview citations',
  },
  {
    icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
    title: 'Citation-Worthy Placements',
    desc: 'Links from sources AI engines already cite - high-traffic editorial publications, industry media, .edu and .gov adjacent sites - transfer citation authority. We target these placements specifically for the AI+GEO Elite plan.',
    stat: '8+',
    statLabel: 'AI platforms monitored for citation signals',
  },
  {
    icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
    title: 'Brand Mention Velocity',
    desc: 'Unlinked brand mentions across authoritative sites signal to LLMs that your brand is a real, credible entity. Combined with linked citations, brand mention campaigns build the entity graph that AI engines reference when generating answers.',
    stat: '62%',
    statLabel: 'of Perplexity citations are to brands with 200+ referring domains',
  },
];

const EEAT_SIGNALS = [
  {
    letter: 'E',
    word: 'Experience',
    color: '#3B82F6',
    desc: 'First-hand expertise signals built through editorial placements where real practitioners share case studies, outcomes, and professional opinions - not generic content.',
    links: 'Practitioner bylines, case study features, client outcome coverage',
  },
  {
    letter: 'E',
    word: 'Expertise',
    color: '#D97706',
    desc: 'Thought leadership links from niche-specific publications that establish topical authority - the foundation of both Google ranking signals and AI engine citation selection.',
    links: 'Industry publication guest posts, expert commentary features, technical guides',
  },
  {
    letter: 'A',
    word: 'Authoritativeness',
    color: '#059669',
    desc: 'Authority signals built through links from high-DR domains, digital PR coverage, and editorial mentions that indicate third-party recognition of your brand.',
    links: 'Digital PR, news coverage, .edu/.gov adjacent links, DR60+ placements',
  },
  {
    letter: 'T',
    word: 'Trustworthiness',
    color: '#8B5CF6',
    desc: 'Trust signals from editorially rigorous publications with transparent editorial standards, real authors, and genuine organic audiences - the trust signals AI engines use most.',
    links: 'No-PBN policy, spam score filter, dofollow verified, editorial standard check',
  },
];

const METHODOLOGY = [
  {
    n: '01',
    title: 'Discovery & Strategy',
    desc: 'We audit your existing backlink profile and analyse your top 5 competitors to identify authority gaps and the highest-value link opportunities - including AI citation source analysis for Elite plan clients.',
    detail: ['Current backlink profile audit', 'Competitor link gap analysis', 'Keyword-to-page link targets', 'Anchor text strategy map'],
  },
  {
    n: '02',
    title: 'Prospect Research & Vetting',
    desc: 'We identify prospective link sites using 15+ quality signals - DR, organic traffic, niche relevance, spam score, editorial standards, link velocity, and AI citation frequency.',
    detail: ['DR + traffic threshold checks', 'Spam score < 2% filter', 'Niche relevance scoring', 'AI citation frequency (Elite)'],
  },
  {
    n: '03',
    title: 'Manual Outreach & Relationships',
    desc: 'Our outreach team contacts site editors through personalised pitches - never automated templates. We build genuine relationships for consistent, repeatable placements at scale.',
    detail: ['Personalised outreach pitches', 'Editor relationship management', 'No automated mass outreach', 'Positive reply rate tracking'],
  },
  {
    n: '04',
    title: 'Content Creation & Review',
    desc: "For guest posts, our writers create original, expert-level content written for the target publication's audience - not repurposed content. E-E-A-T signals are baked into every piece.",
    detail: ['Original article per placement', 'E-E-A-T signal integration', 'Editorial guideline compliance', 'Natural link integration'],
  },
  {
    n: '05',
    title: 'Quality Assurance & Placement',
    desc: 'Every link is verified before delivery: live URL checked, anchor text confirmed, dofollow status verified, and site quality re-audited at time of placement.',
    detail: ['Live URL verification', 'Dofollow status confirmed', 'Anchor text accuracy check', 'Final site quality audit'],
  },
  {
    n: '06',
    title: 'Reporting & AI Visibility Tracking',
    desc: 'Monthly reports document every link built. Elite plan clients receive additional AI visibility reports tracking citation appearances across ChatGPT, Perplexity, and Google AI Overviews.',
    detail: ['Full link delivery report', 'Live Google Sheets tracker', 'Monthly strategy review call', 'AI citation tracking (Elite)'],
  },
];

const QUALITY_SIGNALS = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'DR40–DR90 Thresholds by Plan',
    desc: 'Every link site is pre-screened against Ahrefs DR thresholds by plan tier. Starter requires DR30+, Growth DR40+, Authority DR50+, AI+GEO Elite DR60+. Domains up to DR90 are actively targeted on higher plans. No exceptions.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Real Organic Traffic',
    desc: 'We only place links on sites with genuine organic search traffic - typically 1,000+ monthly organic visits minimum. Low-traffic sites provide no authority signal.',
  },
  {
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9',
    title: 'Niche Topical Relevance',
    desc: 'Links placed on topically relevant sites carry more authority signal than off-topic placements. We match link sites to your industry, topic, and target pages precisely.',
  },
  {
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    title: 'Editorial Standards Check',
    desc: "We review each publication's editorial standards: original content, author bios, real social presence? No content farms, no PBNs, no sponsored-link-only sites.",
  },
  {
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    title: 'Spam Score < 2%',
    desc: 'We use Moz Spam Score alongside Ahrefs metrics to filter out sites with manipulative link patterns, thin content, and algorithmic risk profiles.',
  },
  {
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    title: 'Dofollow Verified Placements',
    desc: 'All links are verified as dofollow before delivery. We report follow status in every monthly report so you always know exactly what equity each link passes.',
  },
];

const INDUSTRIES = [
  { label: 'Ecommerce',     path: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
  { label: 'Legal',         path: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
  { label: 'Healthcare',    path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { label: 'Finance',       path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Real Estate',   path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'SaaS / Tech',   path: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: 'Education',     path: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
  { label: 'Home Services', path: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
  { label: 'Travel',        path: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064' },
  { label: 'B2B Services',  path: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'AI / LLM',      path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { label: 'Wellness',      path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
];

const RESULTS = [
  { metric: 'DR28→DR52', label: 'Domain authority growth in 8 months', detail: 'SaaS startup - Growth package', sub: '4 commercial keywords moved to page 1' },
  { metric: '340%', label: 'Organic traffic increase over 12 months', detail: 'Ecommerce - Authority package', sub: '8,200 → 36,000 monthly sessions' },
  { metric: '4 Citations', label: 'AI Overview citations in 90 days', detail: 'B2B brand - AI+GEO Elite package', sub: 'Perplexity + ChatGPT + Google AIO citations secured' },
];

const WHYS = [
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    title: '100% Manual Outreach',
    desc: 'Every link is acquired through human-led outreach. No automated tools, no scraped lists, no mass email blasts - genuine editor relationships at scale.',
  },
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Full Transparency',
    desc: 'Live link tracker updated as each link goes live. Monthly reports include URL, DR, traffic, anchor text, and target page for every single placement.',
  },
  {
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    title: 'AI+GEO Ready',
    desc: 'Our AI+GEO Elite plan targets the sources ChatGPT, Perplexity, and Google AI Overviews cite - building citation authority alongside traditional rankings.',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '15+ Years of Outreach',
    desc: 'Founded in 2008, our link building team has built over 50,000 backlinks across 1,000+ campaigns in a wide range of niches and markets.',
  },
  {
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    title: 'Strategy-First Approach',
    desc: "We don't just build links - we build the right links, to the right pages, with the right anchors, based on your ranking targets, backlink gap, and AI visibility goals.",
  },
  {
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    title: 'No Long-Term Contracts',
    desc: "Monthly plans require only 30 days' notice to cancel. No lock-in, no cancellation fees. Yearly plans offer a 17% discount with flexible mid-year adjustment.",
  },
];

const FAQS = [
  { q: 'What is link building and why does it matter for SEO?', a: "Link building is the process of acquiring hyperlinks from other websites that point back to yours. Google treats these backlinks as votes of confidence - a link from a credible, high-authority site signals to Google that your content is trustworthy and valuable. The number and quality of backlinks pointing to your domain is one of the strongest ranking factors in Google's algorithm. Without a strong backlink profile, it is very difficult to rank competitively for high-value keywords, regardless of how well your on-page content is optimised." },
  { q: 'What are link building packages?', a: "Link building packages are monthly subscription plans that give you a set number of high-authority backlinks acquired through manual outreach each month. Unlike one-off link purchases, packages provide a consistent, compounding backlink acquisition strategy. Each package specifies the number of links per month, minimum domain rating (DR) thresholds, and link types included. A monthly package is the right approach because Google's algorithm rewards consistent, natural-looking link growth over time - not sudden spikes." },
  { q: 'How do backlinks affect AI search citations (GEO)?', a: 'Backlinks are a primary input into the domain authority metrics that AI engines - Google AI Overviews, ChatGPT Search, Perplexity, and Gemini - use to evaluate source credibility. Sites with higher DR and more referring domains are consistently chosen as citation sources more frequently than low-authority sites. Studies show sites with DR55+ receive significantly more AI Overview citations. Building a strong backlink profile is therefore foundational to both traditional Google rankings AND AI citation presence, making link building essential for Generative Engine Optimisation (GEO).' },
  { q: 'What is the AI+GEO Elite link building package?', a: 'The AI+GEO Elite package is our highest-tier plan designed specifically for brands that need to dominate both traditional search and AI-generated answers. In addition to 400 DR60+ links per month, it includes targeted placements on sources that AI engines actively cite - high-traffic editorial publications, industry media, and authoritative niche sites that appear frequently in ChatGPT, Perplexity, and Google AI Overview responses. It also includes a brand mention campaign (linked and unlinked citations), expert author E-E-A-T placements, and monthly AI visibility reporting tracking your citation frequency across major AI platforms.' },
  { q: 'How do links help me appear in Google AI Overviews?', a: 'Google AI Overviews select citation sources based on a combination of factors: content relevance to the query, E-E-A-T signals (Expertise, Experience, Authoritativeness, Trustworthiness), domain authority as measured by referring domains and DR, and whether the content is cited by other authoritative sources. High-quality backlinks from niche-relevant, high-DR sites directly improve your domain authority and E-E-A-T signals - both of which increase the probability of your content being selected as a citation source. The AI+GEO Elite plan specifically targets placements on the types of sites Google most frequently cites in AI Overviews.' },
  { q: 'Does Perplexity use backlinks as a ranking signal?', a: 'Perplexity relies on web crawling and citation selection algorithms that weight source authority, topical relevance, and content comprehensiveness. While Perplexity does not publish its exact algorithm, evidence from citation analysis shows a strong correlation between domain authority (which is directly influenced by backlinks) and Perplexity citation frequency. Additionally, links from sources that Perplexity already trusts - major publications, established industry blogs, .edu sites - appear to create a citation signal. Our AI+GEO Elite plan targets these citation-authority sources specifically.' },
  { q: 'What is Domain Rating (DR) and why does it matter?', a: "Domain Rating (DR) is a metric developed by Ahrefs that measures the strength of a website's backlink profile on a scale from 0 to 100. A higher DR indicates a stronger, more authoritative domain. In our packages, we specify minimum DR thresholds (DR30+, DR40+, DR50+, DR60+ up to DR90) to ensure the links we build come from genuinely authoritative websites. We use DR alongside other qualitative signals - niche relevance, organic traffic, editorial standards, and AI citation frequency - to evaluate each prospective link placement site." },
  { q: 'What types of links do you build?', a: 'We build three primary types of links: Guest posts - original content written and published on third-party websites with a contextual link back to your site. Niche edits - placements of your link within existing, already-indexed content on relevant authority sites. Digital PR - coverage in online publications, news sites, and industry media (Authority and Elite plans). On the AI+GEO Elite plan, we also build AI authority placements specifically targeting sources that AI engines frequently cite, plus brand mention campaigns for entity recognition.' },
  { q: 'What is E-E-A-T and how does link building improve it?', a: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness - the four dimensions Google uses to evaluate content quality and source credibility. Link building directly improves E-E-A-T by: building Authoritativeness through editorial links from respected industry publications; establishing Expertise through guest post placements where subject-matter experts publish original content; building Trustworthiness through links from vetted, editorially-rigorous sites with real traffic and genuine editorial standards. Strong E-E-A-T is also a prerequisite for AI citation selection, making it central to both Google rankings and GEO strategy." },
  { q: 'What is AEO (Answer Engine Optimisation) and how does link building fit in?', a: "Answer Engine Optimisation (AEO) is the practice of optimising content to appear as direct answers in search engines and AI assistants - voice search, featured snippets, Google AI Overviews, and AI chatbots. Link building supports AEO by building the domain authority and E-E-A-T signals that make search engines and AI models select your content as a trustworthy answer source. Anchor text strategy in our packages is also designed with AEO in mind - using natural language anchors that match how people phrase questions, improving the relevance signal for question-type queries." },
  { q: 'How long does it take to see results from link building?', a: 'Link building results take time to manifest because Google needs to crawl and index new links, and domain authority gains translate to ranking improvements over time. Typically: new links start being indexed within 2 to 6 weeks; domain authority improvements are visible within 2 to 4 months; ranking improvements for target keywords are typically observable within 3 to 6 months; significant organic traffic growth occurs within 6 to 9 months. AI citation improvements on the Elite plan are typically observable within 4 to 10 weeks as new placements on AI-cited sources are crawled and processed.' },
  { q: 'How many links per month do I need?', a: "The right number depends on your current domain authority compared to target competitors and keyword competitiveness. For markets where top competitors have DR50+ with 200–500 referring domains, we recommend the Growth package (12 links/month) as a minimum. For highly competitive markets (finance, legal, SaaS) with DR70+ competitors, Authority (25 links/month) is the right starting point. For brands also competing in AI search, the AI+GEO Elite plan (35+ links/month) provides the velocity needed to build AI citation presence alongside traditional rankings. We perform a free backlink gap analysis before recommending." },
  { q: 'Can I see the links you build each month?', a: 'Yes. Every link is documented in your live link tracker (Google Sheets). The monthly report includes: the URL of the page where your link appears; the anchor text used; the DR of the linking domain; the estimated organic traffic; the date the link went live; and the target page on your site. AI+GEO Elite clients also receive a monthly AI visibility report tracking citation appearances across ChatGPT, Perplexity, and Google AI Overviews.' },
  { q: 'Is link building safe?', a: "White-hat link building using manual outreach and editorial placements on genuine websites is safe and exactly what Google recommends. Risks come from low-quality tactics: buying links from link farms, using PBNs, creating spammy directories, or link exchange schemes - none of which we use. All links come from real websites with genuine organic traffic, editorial standards, and topical relevance. Growth and above plans include a disavow audit if you have previously received a manual penalty." },
  { q: 'What happens if a link goes down?', a: 'If a link we build goes down within 90 days of delivery - due to the publisher removing the article, changing the URL, or the site going offline - we replace it at no additional cost. We track every live link on an ongoing basis and flag removals in your monthly report. Our 90-day replacement policy is industry-leading.' },
  { q: 'Do you offer white-label link building?', a: 'Yes. We offer white-label link building for SEO agencies and digital marketing companies. All reports and communications are unbranded - your clients see only your agency branding. We currently have over 30 agency partners. For custom volumes (50+ links per month across multiple client accounts), contact us for agency pricing.' },
  { q: 'What anchor text strategy do you use?', a: 'We use a diversified anchor text strategy to keep link profiles safe: roughly 30% exact-match or partial-match keyword anchors; 40% branded anchors; 20% generic anchors; and 10% naked URL anchors. For AEO, we also incorporate natural-language question anchors that align with voice search and AI answer patterns. We build and refine an anchor text map at the start of your campaign and update it each month based on your existing profile.' },
  { q: 'Do you offer custom link building plans?', a: "If our standard packages do not fit your exact requirements - for example, 40 links per month, only DR60+ placements, or specific publication targets - we can build a fully custom plan. Contact us with your requirements and we will provide a custom proposal within 48 hours. Custom plans are available on a monthly or project basis." },
  { q: 'Can you perform a backlink gap analysis before I commit?', a: "Yes. A backlink gap analysis compares your referring domain count, average DR, and link velocity against your top 3–5 competitors. We offer a free backlink gap analysis as part of our pre-sales process - no commitment required. Share your domain and top 3 competitors and we'll return a gap analysis report within 48 hours." },
  { q: 'What contract length is required?', a: "Monthly plans require no long-term contract - just 30 days' notice to cancel. Yearly plans are paid upfront (saving 17%) and can be adjusted mid-year in exceptional circumstances. There is no setup fee on any plan. We recommend a minimum 3-month commitment to see meaningful results, but we do not lock you into that contractually." },
];

const STATS = [
  { label: 'Links Built', val: '50,000+' },
  { label: 'Avg Domain Rating', val: 'DR50+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Retention', val: '92%' },
];

const TESTIMONIALS_ROW1 = [
  { initials:'RM', bg:'#0F3460', name:'Rahul Mehta', role:'Founder, LegalEdge India', text:'"Our organic traffic grew from 800 to 6,200 monthly sessions in 10 months on the Authority plan. Real editorial sites, not link farms. DR jumped from 22 to 48."' },
  { initials:'PG', bg:'#7C3AED', name:'Priya Gupta', role:'Head of Growth, SaaSify Technologies', text:'"We were stuck on page 2 for two years. After 6 months on the Growth package, we hit page 1 for 4 commercial terms. The live tracker gives full visibility into every placement."' },
  { initials:'JW', bg:'#0E7490', name:'James Whitfield', role:'SEO Director, Meridian Commerce - UK', text:'"The AI+GEO Elite plan delivered results we did not expect. We started appearing in Perplexity and Google AI Overviews within 90 days. The team understands AEO and GEO deeply."' },
  { initials:'AG', bg:'#BE185D', name:'Ankit Gupta', role:'Marketing Manager, FinTechWave', text:'"Switched from an agency building low-quality links. 1Solutions rebuilt our profile with DR50+ placements. Rankings recovered in 4 months and have continued to climb. Highly recommended."' },
  { initials:'SL', bg:'#047857', name:'Sophie Lawrence', role:'eCommerce Director, StyleHaven UK', text:'"We launched a new product line and needed quick authority. The Growth package delivered 100 placements in month 1, all on niche-relevant fashion and lifestyle sites. Traffic up 340% in 5 months."' },
];
const TESTIMONIALS_ROW2 = [
  { initials:'VK', bg:'#B45309', name:'Vikram Kumar', role:'CEO, Healthify India', text:'"Healthcare SEO is brutal - YMYL pages need the highest quality links. The Authority plan only places on medically credible sites. Our DR moved from 31 to 56 in 8 months. Phenomenal work."' },
  { initials:'MB', bg:'#0F3460', name:'Marcus Brennan', role:'Head of SEO, PropVault - AU', text:'"Real estate keywords are highly competitive. After 6 months on Authority, we went from page 4 to position 3 for our main city keyword. The competitor gap analysis at onboarding was eye-opening."' },
  { initials:'ND', bg:'#7C3AED', name:'Natasha D\'Souza', role:'Growth Lead, FinBridge App', text:'"We scaled from Starter to Growth to Authority as our budget grew. Each upgrade brought a measurable jump in domain authority. The team never pushed us to upgrade early - they were genuinely strategic."' },
  { initials:'TC', bg:'#0E7490', name:'Tom Chen', role:'VP Marketing, CloudStack SaaS', text:'"The AI+GEO Elite package is worth every dollar if you want to appear in AI-generated answers. We now show up in ChatGPT and Perplexity for our main SaaS category. ROI has been exceptional."' },
  { initials:'AL', bg:'#BE185D', name:'Aisha Lim', role:'Founder, EduPath Online', text:'"Education niche needs authoritative links. The Authority plan delivered placements on high-traffic educational blogs and established media. Our course signups doubled in 6 months."' },
];

const AI_PLATFORMS = ['Google AI Overviews', 'ChatGPT Search', 'Perplexity AI', 'Gemini', 'Bing Copilot'];

const CHECK = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function LinkBuildingPackages() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [statsStarted, setStatsStarted] = useState(false);
  const [auditSt, setAuditSt] = useState('idle'); // idle | loading | success | error
  const sectionRefs = useRef({});
  const statsRef = useRef(null);

  const _auditSubmit = async (e) => {
    e.preventDefault();
    setAuditSt('loading');
    try {
      const fd = new FormData(e.target);
      const token = await new Promise(r => window.grecaptcha.ready(() =>
        window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'contact' }).then(r)));
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('la-name') || '',
          email: fd.get('la-email') || '',
          phone: (fd.get('la-cc') ? fd.get('la-cc') + ' ' : '') + (fd.get('la-phone') || ''),
          company: fd.get('la-domain') || '',
          message: `Domain: ${fd.get('la-domain') || ''}\n\nChallenge: ${fd.get('la-challenge') || ''}\n\nGoals / Details: ${fd.get('la-goals') || ''}`,
          source: 'Link Building Packages - Free Link Audit',
          consent: true,
          recaptchaToken: token,
        }),
      });
      if (res.ok) { setAuditSt('success'); e.target.reset(); }
      else { setAuditSt('error'); }
    } catch { setAuditSt('error'); }
  };

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

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
        { threshold: 0.10 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Link Building Packages', item: 'https://www.1solutions.biz/link-building-packages/' },
        ],
      },
      {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: 'https://www.1solutions.biz/images/1solutions-logo.png',
        foundingDate: '2008',
        sameAs: ['https://www.linkedin.com/company/1solutions/', 'https://x.com/1solutionsbiz', 'https://www.facebook.com/1solutionsbiz'],
        address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.1solutions.biz/link-building-packages/',
        url: 'https://www.1solutions.biz/link-building-packages/',
        name: 'Link Building Packages 2026 | AI+GEO & SEO Backlink Plans | 1Solutions',
        description: 'White-hat link building packages from $350/month. Manual outreach, DR30+ to DR90 guest posts, niche edits, digital PR, and AI+GEO citation building for Google AI Overviews, Perplexity, and ChatGPT.',
        dateModified: '2026-07-04',
        inLanguage: 'en-US',
        author: { '@type': 'Organization', name: '1Solutions Link Building Team' },
      },
      {
        '@type': 'Service',
        name: 'Link Building Packages',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        serviceType: 'Link Building & AI Citation Building',
        url: 'https://www.1solutions.biz/link-building-packages/',
        description: 'White-hat link building through manual outreach. Guest posts, niche edits, digital PR, and AI+GEO citation building from DR30+ to DR90 niche-relevant websites.',
        areaServed: 'Worldwide',
        offers: PLANS.map(p => ({
          '@type': 'Offer',
          name: `${p.name} Link Building Package`,
          price: p.monthlyPrice,
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: p.monthlyPrice, priceCurrency: 'USD', unitText: 'month' },
        })),
      },
      {
        '@type': 'HowTo',
        name: 'How Our Link Building Process Works',
        description: 'Our 6-step manual link building methodology for acquiring high-authority backlinks and AI citation signals.',
        step: METHODOLOGY.map(m => ({ '@type': 'HowToStep', name: m.title, text: m.desc })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'LocalBusiness',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        image: 'https://www.1solutions.biz/images/1solutions-logo.png',
        telephone: '+91-11-0000-0000',
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'New Delhi',
          addressLocality: 'New Delhi',
          addressRegion: 'Delhi',
          postalCode: '110001',
          addressCountry: 'IN',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 28.6139, longitude: 77.2090 },
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'Australia' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: String(TESTIMONIALS_ROW1.length + TESTIMONIALS_ROW2.length),
          bestRating: '5',
        },
        review: [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW2].map(t => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: t.name },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: t.text.replace(/^"|"$/g, ''),
          name: t.role,
        })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Link Building Packages 2026 | AI+GEO & SEO Backlinks | 1Solutions</title>
        <meta name="description" content="White-hat link building packages from $350/month. DR40–DR90 guest posts, niche edits, digital PR and AI+GEO citation building for Google AI Overviews, Perplexity & ChatGPT. Live tracked." />
        <link rel="canonical" href="https://www.1solutions.biz/link-building-packages/" />
        <meta property="og:title" content="Link Building Packages 2026 - AI+GEO & SEO Backlinks | 1Solutions" />
        <meta property="og:description" content="White-hat link building packages from $350/month. DR40–DR90 guest posts, niche edits, digital PR, and AI+GEO citation building. Live link tracker on every plan." />
        <meta property="og:url" content="https://www.1solutions.biz/link-building-packages/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.1solutions.biz/images/link-building-packages-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Link Building Packages by 1Solutions - Starting $350/month" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Link Building Packages 2026 | AI+GEO & SEO Backlinks | 1Solutions" />
        <meta name="twitter:description" content="White-hat link building from $350/month. DR40–DR90 guest posts, niche edits, digital PR and AI+GEO citation building. Manual outreach, fully tracked." />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/link-building-packages-og.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          /* ── BASE ── */
          .lbp-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;overflow-x:hidden;position:relative}
          .lbp-page *,.lbp-page *::before,.lbp-page *::after{box-sizing:border-box}

          /* ── ORBS ── */
          .lbp-orb1{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,.30) 0%,rgba(139,92,246,.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px)}
          .lbp-orb2{position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,.25) 0%,rgba(245,158,11,.12) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px)}
          .lbp-orb3{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px)}

          /* ── HERO ── */
          .lbp-hero{position:relative;overflow:hidden;z-index:1}
          .lbp-hero::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px)}
          .lbp-hero::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px)}
          .lbp-hero-content{position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px}
          .lbp-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px}
          .lbp-h1{font-size:clamp(2rem,5vw,3.4rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;color:#111827}
          .lbp-hl{background:linear-gradient(90deg,#7C3AED,#0F3460);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .lbp-hl-gold{background:linear-gradient(90deg,#fff 30%,#fcd34d 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .lbp-hero-sub{font-size:16px;color:#3A507A;line-height:1.65;max-width:640px;margin:0 auto 28px}

          /* ── HERO BUTTONS ── */
          .lbp-hero-btns{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:32px}
          .lbp-btn-hero{position:relative;overflow:hidden;display:inline-block;padding:14px 40px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .lbp-btn-hero:hover{background:rgba(255,255,255,.85);border-color:rgba(245,158,11,.6);box-shadow:0 12px 36px rgba(15,52,96,.15),0 0 0 2px rgba(245,158,11,.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460}
          .lbp-btn-hero::after{content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,.75) 45%,rgba(255,255,255,.9) 50%,rgba(255,255,255,.75) 55%,transparent 100%);animation:lbp-shimmer 2.5s ease-in-out infinite;pointer-events:none}
          @keyframes lbp-shimmer{0%{left:-120%}35%,100%{left:160%}}
          .lbp-btn-outline{display:inline-block;padding:14px 32px;background:transparent;border:1.5px solid rgba(15,52,96,.25);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s}
          .lbp-btn-outline:hover{border-color:rgba(217,119,6,.5);color:#D97706;transform:translateY(-2px)}

          /* ── CASE STUDIES ── */
          .lbp-cs-sec{padding:80px 40px;position:relative;z-index:1;background:linear-gradient(135deg,#071e3d 0%,#0F3460 45%,#1a2a5e 70%,#0a1628 100%);overflow:hidden}
          .lbp-cs-in{max-width:1280px;margin:0 auto;position:relative;z-index:2}
          .lbp-cs-head{text-align:center;margin-bottom:48px}
          .lbp-cs-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:10px;display:block}
          .lbp-cs-ttl{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;text-align:center;margin-bottom:12px;line-height:1.15;color:#fff}
          .lbp-cs-sub{font-size:1rem;color:rgba(255,255,255,.60);text-align:center;max-width:560px;margin:0 auto}
          .lbp-cs-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.20) 0%,transparent 65%);top:-150px;right:-100px;pointer-events:none;filter:blur(30px)}
          .lbp-cs-orb2{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,.15) 0%,transparent 65%);bottom:-80px;left:-80px;pointer-events:none;filter:blur(30px)}
          .lbp-cs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:40px}
          .lbp-cs-card{background:rgba(255,255,255,.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:28px 24px;transition:transform .22s,background .22s,border-color .22s}
          .lbp-cs-card:hover{transform:translateY(-6px);background:rgba(255,255,255,.12);border-color:rgba(217,119,6,.45)}
          .lbp-cs-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
          .lbp-cs-name{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:#fff}
          .lbp-cs-emoji{font-size:1.1rem}
          .lbp-cs-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(34,197,94,.20);color:#86efac;border:1px solid rgba(34,197,94,.35);font-size:12px;font-weight:700;padding:4px 10px;border-radius:100px}
          .lbp-cs-badge::before{content:'↑';font-size:11px}
          .lbp-cs-rows{display:flex;flex-direction:column;gap:14px}
          .lbp-cs-row{display:flex;align-items:center;justify-content:space-between;font-size:13px}
          .lbp-cs-row-label{display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.55)}
          .lbp-cs-row-val{font-weight:700;color:#fff}
          .lbp-cs-arrow{color:#fcd34d;font-weight:700;margin:0 4px}
          .lbp-cs-divider{height:1px;background:rgba(255,255,255,.08);margin:4px 0}
          .lbp-cs-cta-row{text-align:center}
          .lbp-cs-cta{display:inline-flex;align-items:center;gap:8px;padding:13px 32px;background:#D97706;border:1.5px solid #D97706;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(217,119,6,.35)}
          .lbp-cs-cta:hover{background:#B45309;border-color:#B45309;box-shadow:0 0 0 6px rgba(217,119,6,.20),0 8px 32px rgba(217,119,6,.55);transform:translateY(-2px)}

          /* ── STATS BAR ── */
          .lbp-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .lbp-stat{padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}.lbp-stat:last-child{border-right:none}
          .lbp-stat-l{font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px}
          .lbp-stat-v{font-size:26px;font-weight:900;color:#D97706;letter-spacing:-.5px;line-height:1}

          /* ── CLIENTS BAR ── */
          .lbp-clients-bar{position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}
          .lbp-clients-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0}
          .lbp-clients-logos{width:100%;overflow:hidden}
          .lbp-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:lbp-marquee 28s linear infinite}
          .lbp-logos-track:hover{animation-play-state:paused}
          @keyframes lbp-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .lbp-client-logo{height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:.5;transition:opacity .25s,filter .25s}
          .lbp-client-logo:hover{opacity:.85;filter:grayscale(0%)}

          /* ── SHARED SECTION ── */
          .lbp-sec{padding:80px 40px;position:relative;z-index:1}
          .lbp-sec-in{max-width:1280px;margin:0 auto}
          .lbp-white-sec{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08)}
          .lbp-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block}
          .lbp-sec-ttl{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin-bottom:10px}
          .lbp-sec-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}

          /* ── REVEAL ── */
          .lbp-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .lbp-reveal.lbp-visible{opacity:1;transform:translateY(0)}

          /* ── GLASS CARD ── */
          .lbp-glass{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .lbp-glass:hover{border-color:rgba(217,119,6,.45);box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1)}

          /* ── DEFINITION ── */
          .lbp-def-box{padding:36px;max-width:1020px;margin:0 auto}
          .lbp-def-intro{font-size:1.02rem;color:#374151;line-height:1.8;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid rgba(15,52,96,.08)}
          .lbp-def-intro strong{color:#0F3460}
          .lbp-def-aspects{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .lbp-def-aspect{background:rgba(255,255,255,.55);border:1px solid rgba(15,52,96,.10);border-radius:14px;padding:20px;transition:border-color .2s}
          .lbp-def-aspect:hover{border-color:rgba(217,119,6,.35)}
          .lbp-def-aspect-t{font-weight:700;color:#0F3460;font-size:14px;margin-bottom:6px}
          .lbp-def-aspect-d{font-size:13px;color:#4A6080;line-height:1.6}

          /* ── WHY MATTERS ── */
          .lbp-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .lbp-why-card{padding:32px 28px;text-align:center;transition:transform .25s,box-shadow .25s,border-color .25s}
          .lbp-why-card:hover{transform:translateY(-6px)}
          .lbp-why-num{font-size:3.2rem;font-weight:900;background:linear-gradient(90deg,#0F3460,#D97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1.5px;line-height:1;margin-bottom:12px}
          .lbp-why-desc{font-size:14px;color:#374151;line-height:1.6;margin-bottom:8px}
          .lbp-why-src{font-size:11px;color:#9ca3af;font-style:italic}

          /* ── AI SECTION ── */
          .lbp-ai-sec{padding:80px 40px;position:relative;z-index:1;background:linear-gradient(135deg,#0a0f2e 0%,#0F3460 45%,#1e1b4b 100%);overflow:hidden}
          .lbp-ai-orb{position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.25) 0%,transparent 65%);top:-200px;right:-150px;pointer-events:none;filter:blur(40px)}
          .lbp-ai-orb2{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,.18) 0%,transparent 65%);bottom:-100px;left:-100px;pointer-events:none;filter:blur(40px)}
          .lbp-ai-in{max-width:1280px;margin:0 auto;position:relative;z-index:2}
          .lbp-ai-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:10px;display:block;text-align:center}
          .lbp-ai-ttl{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;text-align:center;margin-bottom:14px;line-height:1.15;color:#fff}
          .lbp-ai-sub{font-size:1rem;color:rgba(255,255,255,.65);text-align:center;max-width:620px;margin:0 auto 52px;line-height:1.75}
          .lbp-ai-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px}
          .lbp-ai-card{background:rgba(255,255,255,.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:32px;transition:background .25s,border-color .25s,transform .25s}
          .lbp-ai-card:hover{background:rgba(255,255,255,.11);border-color:rgba(217,119,6,.45);transform:translateY(-4px)}
          .lbp-ai-icon{width:48px;height:48px;background:rgba(217,119,6,.20);border:1px solid rgba(217,119,6,.35);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .lbp-ai-icon svg{width:24px;height:24px;stroke:#F59E0B;fill:none}
          .lbp-ai-card-t{font-size:16px;font-weight:700;color:#fff;margin-bottom:10px}
          .lbp-ai-card-d{font-size:13px;color:rgba(255,255,255,.65);line-height:1.7;margin-bottom:16px}
          .lbp-ai-stat-row{display:flex;align-items:baseline;gap:8px;padding-top:14px;border-top:1px solid rgba(255,255,255,.10)}
          .lbp-ai-stat-num{font-size:1.6rem;font-weight:900;color:#fcd34d;line-height:1}
          .lbp-ai-stat-lbl{font-size:12px;color:rgba(255,255,255,.50);line-height:1.4}
          .lbp-ai-platforms-row{display:flex;justify-content:center;flex-wrap:wrap;gap:10px}
          .lbp-ai-plat{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:100px;padding:7px 16px;font-size:12px;font-weight:600;color:rgba(255,255,255,.80)}
          .lbp-ai-plat-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;flex-shrink:0}

          /* ── EEAT SECTION ── */
          .lbp-eeat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
          .lbp-eeat-card{padding:28px;border-radius:20px;position:relative;overflow:hidden;transition:transform .25s,box-shadow .25s}
          .lbp-eeat-card:hover{transform:translateY(-6px)}
          .lbp-eeat-letter{font-size:4rem;font-weight:900;line-height:1;margin-bottom:4px;opacity:.15;position:absolute;top:16px;right:20px}
          .lbp-eeat-word{font-size:13px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:12px}
          .lbp-eeat-desc{font-size:13px;color:#4A6080;line-height:1.65;margin-bottom:14px}
          .lbp-eeat-links{font-size:11px;color:#9ca3af;font-style:italic;line-height:1.5}

          /* ── PRICING ── */
          .lbp-pricing-bg{background:rgba(255,255,255,.40);backdrop-filter:blur(8px)}
          .lbp-tog-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
          .lbp-tog-lbl{font-size:15px;font-weight:600;color:#6b7280;transition:color .2s}
          .lbp-tog-lbl.active{color:#0F1F40}
          .lbp-tog-btn{width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background .25s;flex-shrink:0}
          .lbp-tog-btn.on{background:#D97706}
          .lbp-tog-knob{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .25s;box-shadow:0 1px 4px rgba(0,0,0,.18)}
          .lbp-tog-btn.on .lbp-tog-knob{transform:translateX(22px)}
          .lbp-save-badge{display:inline-flex;align-items:center;background:rgba(217,119,6,.12);color:#B45309;font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;margin-left:6px}
          .lbp-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;align-items:start}
          .lbp-card{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:28px 24px;position:relative;transition:transform .22s,box-shadow .22s,border-color .22s;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .lbp-card:hover{transform:translateY(-4px);border-color:rgba(217,119,6,.40);box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1)}
          .lbp-card-pop{background:linear-gradient(135deg,#0F3460 0%,#1a3a6e 50%,#0a2549 100%);border-color:transparent;transform:scale(1.03);box-shadow:0 20px 60px rgba(15,52,96,.30)}
          .lbp-card-pop:hover{transform:scale(1.03) translateY(-4px)}
          .lbp-card-elite{background:linear-gradient(135deg,#1e1b4b 0%,#2e1065 50%,#1e1b4b 100%);border:1px solid rgba(139,92,246,.40);box-shadow:0 4px 24px rgba(139,92,246,.20),inset 0 1px 0 rgba(139,92,246,.20)}
          .lbp-card-elite:hover{border-color:rgba(139,92,246,.70);box-shadow:0 16px 48px rgba(139,92,246,.30),inset 0 1px 0 rgba(139,92,246,.25);transform:translateY(-4px)}
          .lbp-pop-tag{position:absolute;top:16px;right:16px;background:rgba(217,119,6,.90);color:#fff;font-size:10px;font-weight:700;padding:3px 9px;border-radius:100px;letter-spacing:.5px}
          .lbp-elite-tag{position:absolute;top:16px;right:16px;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;font-size:10px;font-weight:700;padding:3px 9px;border-radius:100px;letter-spacing:.5px}
          .lbp-plan-name{font-size:20px;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .lbp-card-pop .lbp-plan-name,.lbp-card-elite .lbp-plan-name{color:#fff}
          .lbp-plan-desc{font-size:12px;color:#6b7280;line-height:1.55;margin-bottom:20px}
          .lbp-card-pop .lbp-plan-desc{color:rgba(255,255,255,.70)}
          .lbp-card-elite .lbp-plan-desc{color:rgba(255,255,255,.65)}
          .lbp-price-row{display:flex;align-items:baseline;gap:4px;margin-bottom:4px}
          .lbp-currency{font-size:1.3rem;font-weight:700;color:#D97706}
          .lbp-amount{font-size:2.6rem;font-weight:900;letter-spacing:-2px;color:#0F1F40;line-height:1}
          .lbp-card-pop .lbp-amount,.lbp-card-pop .lbp-currency{color:#fff}
          .lbp-card-elite .lbp-amount{color:#fff}.lbp-card-elite .lbp-currency{color:#c4b5fd}
          .lbp-per{font-size:12px;color:#9ca3af;font-weight:500;margin-left:2px}
          .lbp-card-pop .lbp-per,.lbp-card-elite .lbp-per{color:rgba(255,255,255,.55)}
          .lbp-billed{font-size:11px;color:#9ca3af;margin-bottom:4px}
          .lbp-card-pop .lbp-billed,.lbp-card-elite .lbp-billed{color:rgba(255,255,255,.45)}
          .lbp-save-line{font-size:11px;font-weight:700;color:#16a34a;margin-bottom:18px;min-height:16px}
          .lbp-card-pop .lbp-save-line{color:#86efac}
          .lbp-card-elite .lbp-save-line{color:#a78bfa}
          .lbp-rzp-wrap{width:100%;margin-bottom:20px;display:flex;justify-content:center}
          .lbp-rzp-wrap form{width:100%}
          .lbp-cta-card{display:block;width:100%;text-align:center;padding:12px;border-radius:50px;font-weight:700;font-size:.875rem;text-decoration:none;background:rgba(15,52,96,.85);color:#fff;transition:all .22s;margin-bottom:20px;box-shadow:0 4px 16px rgba(15,52,96,.20)}
          .lbp-cta-card:hover{background:rgba(15,52,96,1);transform:translateY(-1px);box-shadow:0 6px 24px rgba(15,52,96,.30)}
          .lbp-card-pop .lbp-cta-card{background:rgba(255,255,255,.18);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,.35);color:#fff}
          .lbp-card-pop .lbp-cta-card:hover{background:rgba(255,255,255,.28);border-color:rgba(245,158,11,.6)}
          .lbp-card-elite .lbp-cta-card{background:linear-gradient(135deg,#7c3aed,#4f46e5);border:none;color:#fff;box-shadow:0 4px 16px rgba(124,58,237,.40)}
          .lbp-card-elite .lbp-cta-card:hover{background:linear-gradient(135deg,#6d28d9,#4338ca);box-shadow:0 8px 28px rgba(124,58,237,.55)}
          .lbp-divider{height:1px;background:rgba(15,52,96,.08);margin-bottom:18px}
          .lbp-card-pop .lbp-divider{background:rgba(255,255,255,.15)}
          .lbp-card-elite .lbp-divider{background:rgba(139,92,246,.20)}
          .lbp-feat-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:9px}
          .lbp-feat-list li{display:flex;align-items:flex-start;gap:9px;font-size:12px;color:#374151;line-height:1.4}
          .lbp-card-pop .lbp-feat-list li{color:rgba(255,255,255,.85)}
          .lbp-card-elite .lbp-feat-list li{color:rgba(255,255,255,.80)}
          .lbp-feat-list li svg{color:#D97706}
          .lbp-card-pop .lbp-feat-list li svg{color:#fcd34d}
          .lbp-card-elite .lbp-feat-list li svg{color:#c4b5fd}
          .lbp-trust{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin-top:32px;padding-top:28px;border-top:1px solid rgba(15,52,96,.08)}
          .lbp-trust span{font-size:13px;color:#4A6080;display:flex;align-items:center;gap:6px;font-weight:500}
          .lbp-trust svg{color:#D97706}

          /* ── TABLE ── */
          .lbp-tbl-wrap{overflow-x:auto;border-radius:16px;border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 20px rgba(15,52,96,.08)}
          .lbp-tbl{width:100%;border-collapse:collapse;background:rgba(255,255,255,.75);min-width:700px}
          .lbp-tbl th{background:linear-gradient(135deg,#0F3460 0%,#1a3a6e 100%);color:#fff;font-size:12px;font-weight:700;padding:13px 16px;text-align:center}
          .lbp-tbl th:first-child{text-align:left}
          .lbp-tbl th:last-child{background:linear-gradient(135deg,#1e1b4b 0%,#2e1065 100%)}
          .lbp-tbl td{padding:12px 16px;font-size:12px;color:#374151;border-bottom:1px solid rgba(15,52,96,.06);text-align:center}
          .lbp-tbl td:first-child{text-align:left;font-weight:600;color:#0F1F40}
          .lbp-tbl tr:last-child td{border-bottom:none}
          .lbp-tbl tr:hover td{background:rgba(217,119,6,.03)}
          .lbp-tbl-y{color:#D97706;font-weight:700}
          .lbp-tbl-n{color:#d1d5db}
          .lbp-tbl-elite{color:#7c3aed;font-weight:700}

          /* ── METHODOLOGY ── */
          .lbp-method-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
          .lbp-method-card{padding:28px;display:flex;gap:20px;transition:transform .22s,box-shadow .22s,border-color .22s}
          .lbp-method-card:hover{transform:translateY(-4px);border-color:rgba(217,119,6,.40) !important;box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1) !important}
          .lbp-method-n{font-size:2rem;font-weight:900;color:rgba(15,52,96,.15);line-height:1;flex-shrink:0;min-width:48px}
          .lbp-method-t{font-size:1rem;font-weight:700;color:#0F3460;margin-bottom:8px}
          .lbp-method-d{font-size:13px;color:#4A6080;line-height:1.65;margin-bottom:12px}
          .lbp-method-ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px}
          .lbp-method-ul li{font-size:12px;color:#6b7280;display:flex;align-items:flex-start;gap:8px}
          .lbp-method-ul li::before{content:'→';color:#D97706;flex-shrink:0}

          /* ── QUALITY ── */
          .lbp-qual-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .lbp-qual-card{padding:26px;transition:transform .22s,box-shadow .22s,border-color .22s}
          .lbp-qual-card:hover{transform:translateY(-6px);border-color:rgba(217,119,6,.45) !important;box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1) !important}
          .lbp-qual-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
          .lbp-qual-icon svg{width:26px;height:26px;color:#D97706;stroke:#D97706;fill:none}
          .lbp-qual-t{font-size:14px;font-weight:700;color:#0F1F40;margin-bottom:6px}
          .lbp-qual-d{font-size:13px;color:#4A6080;line-height:1.6}

          /* ── INDUSTRIES ── */
          .lbp-ind-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
          .lbp-ind-card{padding:20px 14px;text-align:center;transition:transform .22s,box-shadow .22s,border-color .22s}
          .lbp-ind-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,.45) !important;box-shadow:0 12px 32px rgba(15,52,96,.12),inset 0 1px 0 rgba(255,255,255,1) !important}
          .lbp-ind-icon{width:44px;height:44px;background:rgba(217,119,6,.10);border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;transition:background .2s}
          .lbp-ind-card:hover .lbp-ind-icon{background:rgba(217,119,6,.18)}
          .lbp-ind-icon svg{width:22px;height:22px;stroke:#D97706;fill:none}
          .lbp-ind-lbl{font-size:12px;font-weight:600;color:#374151}

          /* ── RESULTS ── */
          .lbp-results{background:linear-gradient(135deg,#071e3d 0%,#0F3460 40%,#0a2549 100%);padding:80px 40px;position:relative;overflow:hidden;z-index:1}
          .lbp-res-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,.18) 0%,transparent 65%);top:-150px;right:-100px;pointer-events:none;filter:blur(30px)}
          .lbp-res-in{max-width:1280px;margin:0 auto;position:relative;z-index:2}
          .lbp-res-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:10px;display:block;text-align:center}
          .lbp-res-ttl{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;text-align:center;margin-bottom:12px;line-height:1.15;background:linear-gradient(90deg,#fff 30%,#fcd34d 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .lbp-res-sub{font-size:1rem;color:rgba(255,255,255,.60);text-align:center;max-width:560px;margin:0 auto 52px}
          .lbp-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .lbp-res-card{background:rgba(255,255,255,.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:32px;text-align:center;transition:background .25s,border-color .25s}
          .lbp-res-card:hover{background:rgba(255,255,255,.11);border-color:rgba(217,119,6,.45)}
          .lbp-res-metric{font-size:2.4rem;font-weight:900;color:#fcd34d;margin-bottom:8px;line-height:1}
          .lbp-res-label{font-size:14px;color:rgba(255,255,255,.80);font-weight:600;margin-bottom:6px}
          .lbp-res-detail{font-size:12px;color:rgba(255,255,255,.50);margin-bottom:4px}
          .lbp-res-sub2{font-size:11px;color:rgba(255,255,255,.40);font-style:italic}

          /* ── WHY CHOOSE ── */
          .lbp-why-ch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
          .lbp-why-ch-card{padding:28px 24px;text-align:left;transition:transform .25s,box-shadow .25s,border-color .25s}
          .lbp-why-ch-card:hover{transform:translateY(-6px);border-color:rgba(217,119,6,.40) !important;box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1) !important}
          .lbp-why-ch-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .lbp-why-ch-icon svg{width:26px;height:26px;stroke:#D97706;fill:none}
          .lbp-why-ch-t{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:6px}
          .lbp-why-ch-d{font-size:13px;color:#4A6080;line-height:1.65}

          /* ── FAQ ── */
          .lbp-faq-list{display:flex;flex-direction:column;gap:10px}
          .lbp-fq-h{margin:0;padding:0;font-size:inherit;font-weight:inherit;line-height:inherit}
          .lbp-fitem{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:border-color .2s,box-shadow .2s}
          .lbp-fitem.open{border-color:rgba(217,119,6,.40);box-shadow:0 8px 32px rgba(15,52,96,.12),inset 0 1px 0 rgba(255,255,255,1)}
          .lbp-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px}
          .lbp-fq{width:100%;background:none;border:none;padding:18px 20px 18px 56px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative}
          .lbp-fq-badge{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background .2s,color .2s}
          .lbp-fitem.open .lbp-fq-badge{background:#D97706;color:#fff}
          .lbp-fq-text{font-size:14px;font-weight:600;color:#0F1F40;line-height:1.45}
          .lbp-fitem.open .lbp-fq-text{color:#D97706}
          .lbp-fq-chevron{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .lbp-fitem.open .lbp-fq-chevron{transform:rotate(180deg);color:#D97706}
          .lbp-fa{font-size:13.5px;color:#4b5563;line-height:1.8;padding:0 20px 18px 56px}

          /* ── AUTHOR BAR ── */
          .lbp-author-bar{background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.45) 100%);border-top:1px solid rgba(217,119,6,.15);border-bottom:1px solid rgba(217,119,6,.15);padding:24px 40px;position:relative;z-index:1}
          .lbp-author-inner{max-width:900px;margin:0 auto;display:flex;align-items:flex-start;gap:20px}
          .lbp-author-icon{width:52px;height:52px;background:linear-gradient(135deg,#0F3460,#1a3a6e);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
          .lbp-author-body{flex:1}
          .lbp-author-name{font-size:14px;font-weight:700;color:#0F3460;margin-bottom:4px}
          .lbp-author-creds{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}
          .lbp-author-cred{display:inline-flex;align-items:center;gap:4px;background:rgba(15,52,96,.06);border:1px solid rgba(15,52,96,.10);border-radius:6px;padding:3px 8px;font-size:11px;font-weight:600;color:#374151}
          .lbp-author-text{font-size:13px;color:#4A6080;line-height:1.6}

          /* ── CTA ── */
          /* ── AUDIT FORM ── */
          .lbp-audit-sec{padding:72px 40px;background:linear-gradient(135deg,rgba(254,243,199,.70) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.80)}
          .lbp-audit-in{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px}
          .lbp-audit-ttl{font-size:clamp(2rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .lbp-audit-desc{font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px}
          .lbp-audit-benefits-box{background:linear-gradient(135deg,rgba(255,255,255,.70) 0%,rgba(219,234,254,.35) 100%);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:16px}
          .lbp-audit-ben{display:flex;gap:12px;align-items:flex-start}
          .lbp-audit-ben-icon{width:20px;height:20px;stroke:#D97706;fill:none;flex-shrink:0;margin-top:2px}
          .lbp-audit-ben-text{font-size:13px;color:#4A6080;line-height:1.55}
          .lbp-audit-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid rgba(15,52,96,.10)}
          .lbp-audit-stat-num{font-size:36px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px}
          .lbp-audit-stat-txt{font-size:12px;color:#4A6080;font-weight:500;line-height:1.4}
          .lbp-audit-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(237,233,254,.25) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .lbp-audit-form-box h3{font-size:24px;font-weight:700;margin:0 0 24px;color:#0F1F40;letter-spacing:-.5px}
          .lbp-af-form{display:flex;flex-direction:column;gap:16px}
          .lbp-af-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .lbp-fg{display:flex;flex-direction:column;gap:6px}
          .lbp-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .lbp-fg input,.lbp-fg textarea,.lbp-fg select{padding:10px 14px;border:1px solid rgba(15,52,96,.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);box-shadow:inset 0 1px 4px rgba(15,52,96,.06);transition:border-color .2s,background .2s;box-sizing:border-box;width:100%}
          .lbp-fg input:focus,.lbp-fg textarea:focus,.lbp-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,.90);box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .lbp-fg textarea{resize:vertical}
          .lbp-af-phone-wrap{display:flex;border:1px solid rgba(15,52,96,.15);border-radius:6px;overflow:hidden;background:rgba(255,255,255,.55)}
          .lbp-af-phone-wrap select{padding:10px;border:none;background:transparent;font-size:12px;min-width:75px;color:#0F1F40;font-family:inherit}
          .lbp-af-phone-wrap input{flex:1;border:none!important;border-radius:0!important;padding:10px 14px;box-shadow:none!important;background:transparent!important}
          .lbp-af-phone-wrap input:focus{outline:none}
          .lbp-af-consent{display:flex;gap:8px;align-items:flex-start}
          .lbp-af-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;flex-shrink:0}
          .lbp-af-consent label{font-size:11px;color:#4A6080;line-height:1.5;margin:0}
          .lbp-af-consent a{color:#0F3460;text-decoration:none}
          .lbp-audit-submit{padding:14px 28px;background:rgba(15,52,96,.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.30);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .3s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,.25),inset 0 1px 0 rgba(255,255,255,.15)}
          .lbp-audit-submit:hover:not(:disabled){background:rgba(15,52,96,.95);border-color:rgba(245,158,11,.6);transform:translateY(-2px)}
          .lbp-audit-submit:disabled{opacity:.65;cursor:not-allowed}
          .lbp-audit-success-wrap{text-align:center;padding:32px 0}
          .lbp-audit-success-icon{width:64px;height:64px;background:linear-gradient(135deg,#0F3460,#1a3a6e);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 8px 24px rgba(15,52,96,.25)}
          .lbp-audit-success-icon svg{width:30px;height:30px;stroke:#fff;fill:none}
          .lbp-audit-success-wrap h3{font-size:20px;font-weight:700;color:#0F1F40;margin:0 0 10px}
          .lbp-audit-success-wrap p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}
          @media(max-width:1024px){.lbp-audit-in{grid-template-columns:1fr}}
          @media(max-width:768px){.lbp-audit-sec{padding:56px 24px}.lbp-af-row{grid-template-columns:1fr}.lbp-audit-stats{grid-template-columns:repeat(3,1fr)}}
          .lbp-related-section{background:rgba(237,233,254,.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60);padding:80px 40px}
          .lbp-related-inner{max-width:1280px;margin:0 auto;text-align:center}
          .lbp-related-eyebrow{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block}
          .lbp-related-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px}
          .lbp-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px}
          .lbp-related-divider{border:none;border-top:1px solid rgba(15,52,96,.12);margin:40px 0}
          .lbp-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
          .lbp-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .25s}
          .lbp-rtag:hover{filter:brightness(.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.10)}
          .lbp-rtag-blue{background:rgba(59,130,246,.10);border-color:rgba(59,130,246,.30);color:#1D4ED8}
          .lbp-rtag-violet{background:rgba(139,92,246,.10);border-color:rgba(139,92,246,.30);color:#6D28D9}
          .lbp-rtag-amber{background:rgba(245,158,11,.12);border-color:rgba(245,158,11,.35);color:#B45309}
          .lbp-rtag-teal{background:rgba(20,184,166,.10);border-color:rgba(20,184,166,.30);color:#0F766E}
          .lbp-rtag-rose{background:rgba(244,63,94,.10);border-color:rgba(244,63,94,.28);color:#BE123C}
          .lbp-rtag-green{background:rgba(34,197,94,.10);border-color:rgba(34,197,94,.28);color:#15803D}
          .lbp-rtag-indigo{background:rgba(99,102,241,.10);border-color:rgba(99,102,241,.28);color:#4338CA}
          .lbp-rtag-orange{background:rgba(249,115,22,.10);border-color:rgba(249,115,22,.30);color:#C2410C}
          .lbp-rtag-cyan{background:rgba(6,182,212,.10);border-color:rgba(6,182,212,.28);color:#0E7490}
          .lbp-rtag-slate{background:rgba(100,116,139,.10);border-color:rgba(100,116,139,.28);color:#334155}
          .lbp-rtag-sky{background:rgba(14,165,233,.10);border-color:rgba(14,165,233,.28);color:#0369A1}
          .lbp-rtag-lime{background:rgba(132,204,22,.10);border-color:rgba(132,204,22,.28);color:#3F6212}
          .lbp-cta{background:linear-gradient(135deg,rgba(254,243,199,.70) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);padding:80px 40px;position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.80)}
          .lbp-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .lbp-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;color:#111827;margin-bottom:16px;line-height:1.2}
          .lbp-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 28px;max-width:520px}
          .lbp-pricing-note{background:rgba(255,255,255,.60);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.85);border-radius:14px;padding:16px 24px;margin-bottom:32px;font-size:14px;color:#4A6080;line-height:1.65;text-align:left;box-shadow:0 4px 16px rgba(15,52,96,.06)}
          .lbp-pricing-note strong{color:#0F3460}
          .lbp-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .lbp-btn-p{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:rgba(15,52,96,.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.20);color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,.25)}
          .lbp-btn-p:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,.30)}
          .lbp-btn-s{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);color:#0F3460;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .lbp-btn-s:hover{background:rgba(255,255,255,.85);border-color:rgba(245,158,11,.6);transform:translateY(-2px)}

          /* ── BREADCRUMB ── */
          .lbp-breadcrumb{position:relative;z-index:2;padding:12px 40px 0;max-width:1280px;margin:0 auto}
          .lbp-breadcrumb-nav{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:12px;color:#6A80A0}
          .lbp-breadcrumb-nav a{color:#0F3460;text-decoration:none;font-weight:500;transition:color .2s}
          .lbp-breadcrumb-nav a:hover{color:#D97706}
          .lbp-breadcrumb-sep{color:#9ca3af;font-size:10px}
          .lbp-breadcrumb-cur{color:#4A6080;font-weight:600}

          /* ── TESTIMONIALS ── */
          .lbp-testi-sec{padding:72px 0;background:linear-gradient(135deg,#faf8ff 0%,#f7f4ff 50%,#f3f8ff 100%);overflow:hidden}
          .lbp-testi-hd{text-align:center;margin-bottom:44px;padding:0 40px}
          .lbp-testi-hd h2{font-size:clamp(32px,3.5vw,48px);font-weight:900;margin-bottom:16px;color:#111827}
          .lbp-testi-hd p{font-size:16px;color:#6b7280;line-height:1.7;max-width:600px;margin:0 auto}
          .lbp-trow{overflow:hidden;position:relative}
          .lbp-trow+.lbp-trow{margin-top:16px}
          .lbp-tfade-l{position:absolute;left:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to right,#faf8ff,transparent);pointer-events:none}
          .lbp-tfade-r{position:absolute;right:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to left,#faf8ff,transparent);pointer-events:none}
          .lbp-ttrack{display:flex;gap:20px;width:max-content;padding-left:20px;animation:lbp-marq-l 40s linear infinite}
          .lbp-ttrack-rev{display:flex;gap:20px;width:max-content;padding-left:20px;animation:lbp-marq-r 40s linear infinite}
          .lbp-trow:hover .lbp-ttrack,.lbp-trow:hover .lbp-ttrack-rev{animation-play-state:paused}
          @keyframes lbp-marq-l{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes lbp-marq-r{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
          @media(prefers-reduced-motion:reduce){.lbp-ttrack,.lbp-ttrack-rev{animation:none!important}}
          .lbp-tcard{width:440px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,.08);border-radius:16px;padding:20px 24px;box-shadow:0 2px 16px rgba(0,0,0,.05);display:flex;flex-direction:column;gap:12px;user-select:none}
          .lbp-tcard-stars{display:flex;gap:2px}
          .lbp-tcard-star{color:#F59E0B;font-size:14px}
          .lbp-tcard-text{font-size:14px;color:#374151;line-height:1.75;margin:0;flex-grow:1}
          .lbp-tcard-author{display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:16px}
          .lbp-tcard-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px}
          .lbp-tcard-name{font-weight:700;color:#111827;font-size:13px}
          .lbp-tcard-role{color:#9ca3af;font-size:12px;margin-top:1px}
          .lbp-testi-stats{display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.75) 50%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 20px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);margin-top:52px;max-width:1100px;margin-left:auto;margin-right:auto}
          .lbp-tstat{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1}
          .lbp-tstat-num{font-size:28px;font-weight:800;color:#0F3460}
          .lbp-tstat-label{font-size:13px;color:#4A6080;font-weight:500}
          .lbp-tstat-divider{width:1px;height:40px;background:rgba(15,52,96,.15)}

          /* ── RESPONSIVE ── */
          @media(max-width:1280px){
            .lbp-cards{grid-template-columns:repeat(2,1fr)}
            .lbp-eeat-grid{grid-template-columns:repeat(2,1fr)}
          }
          @media(max-width:1024px){
            .lbp-cards{grid-template-columns:1fr;max-width:440px;margin-left:auto;margin-right:auto}
            .lbp-card-pop{transform:none}.lbp-card-pop:hover{transform:translateY(-4px)}
            .lbp-method-grid{grid-template-columns:1fr}
            .lbp-qual-grid{grid-template-columns:repeat(2,1fr)}
            .lbp-ind-grid{grid-template-columns:repeat(4,1fr)}
            .lbp-why-ch-grid{grid-template-columns:repeat(2,1fr)}
            .lbp-res-grid{grid-template-columns:1fr;max-width:400px;margin-left:auto;margin-right:auto}
            .lbp-why-grid{grid-template-columns:1fr;max-width:440px;margin-left:auto;margin-right:auto}
            .lbp-ai-grid{grid-template-columns:1fr}
            .lbp-cs-grid{grid-template-columns:repeat(2,1fr)}
          }
          @media(max-width:1024px){.lbp-testi-stats{flex-wrap:wrap;gap:16px;padding:24px 20px}}
          @media(max-width:600px){.lbp-tfade-l,.lbp-tfade-r{width:48px!important}.lbp-testi-hd{padding:0 20px!important}.lbp-testi-sec{padding:52px 0}.lbp-tcard{width:300px}}
          @media(max-width:768px){
            .lbp-breadcrumb{padding:10px 20px 0}
            .lbp-related{padding:14px 20px}
            .lbp-sec,.lbp-results,.lbp-cta,.lbp-ai-sec,.lbp-related-section{padding-left:20px;padding-right:20px}
            .lbp-related-title{font-size:28px}
            .lbp-hero-content{padding:36px 20px 24px}
            .lbp-h1{font-size:clamp(1.7rem,6vw,2.4rem)}
            .lbp-hero-btns{flex-direction:column}
            .lbp-clients-bar{padding:16px 20px 36px;gap:12px}
            .lbp-cs-grid{grid-template-columns:1fr}
            .lbp-cs-sec{padding-left:20px;padding-right:20px}
            .lbp-stats{grid-template-columns:repeat(2,1fr)}
            .lbp-stat:nth-child(2){border-right:none}
            .lbp-stat:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}
            .lbp-stat:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}
            .lbp-def-aspects{grid-template-columns:1fr}
            .lbp-qual-grid{grid-template-columns:1fr}
            .lbp-ind-grid{grid-template-columns:repeat(3,1fr)}
            .lbp-why-ch-grid{grid-template-columns:1fr}
            .lbp-eeat-grid{grid-template-columns:1fr}
            .lbp-author-bar{padding:20px}
            .lbp-method-card{flex-direction:column;gap:8px}
            .lbp-btns{flex-direction:column;align-items:center}
            .lbp-fq{padding:16px 16px 16px 48px}
            .lbp-fa{padding:0 16px 16px 48px}
            .lbp-fq-badge{left:12px}
            .lbp-author-inner{flex-direction:column;gap:14px}
          }
        `}</style>
      </Head>

      <div className="lbp-page">
        <div className="lbp-orb1"/><div className="lbp-orb2"/><div className="lbp-orb3"/>

        {/* ── HERO ── */}
        <div className="lbp-hero">
          <div className="lbp-hero-content">
            <span className="lbp-eyebrow">White-Hat Link Building · DR40–DR90 · Manual Outreach · AI+GEO Ready</span>
            <h1 className="lbp-h1">Link Building Packages <span className="lbp-hl">That Rank You on Google</span> and Get You Cited by AI</h1>
            <p className="lbp-hero-sub">White-hat link building packages from $350/month. Guest posts, niche edits, digital PR, and AI+GEO citation building - 100% manual outreach, every link tracked live. Built for both traditional rankings and AI-generated answers.</p>
            <div className="lbp-hero-btns">
              <Link href="#link-audit" className="lbp-btn-hero">Get a Free Backlink Audit</Link>
              <Link href="#pricing" className="lbp-btn-outline">View Packages</Link>
            </div>
          </div>

          <div className="lbp-stats" ref={statsRef}>
            {[
              {label:'Links Built',      val:'50000', suffix:'+',  prefix:''},
              {label:'Years Experience', val:'15',    suffix:'+',  prefix:''},
              {label:'Client Retention', val:'92',    suffix:'%',  prefix:''},
              {label:'Avg Domain Rating',val:'50',    suffix:'+',  prefix:'DR'},
            ].map(({label,val,suffix,prefix}) => (
              <AnimatedStat key={label} label={label} val={val+suffix} prefix={prefix} started={statsStarted} />
            ))}
          </div>

          <div className="lbp-clients-bar">
            <span className="lbp-clients-label">Trusted by Leading Brands</span>
            <div className="lbp-clients-logos">
              <div className="lbp-logos-track">
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
                ].map(([src, alt]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/, '')} className="lbp-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DEFINITION ── */}
        <section className="lbp-sec lbp-white-sec" aria-labelledby="def-title">
          <div className="lbp-sec-in" style={{textAlign:'center'}}>
            <div className={`lbp-reveal${visibleSections.has('def')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['def']=el;}}>
              <span className="lbp-sec-ey">Understanding Link Building</span>
              <h2 className="lbp-sec-ttl" id="def-title">What Are <span className="lbp-hl">Link Building Packages</span>?</h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto 32px'}}>A plain-English explanation of what you are buying, how it works, and why it matters in 2026.</p>
            </div>
            <div className="lbp-glass lbp-def-box">
              <p className="lbp-def-intro">
                <strong>Link building packages</strong> are monthly subscription plans that deliver a fixed number of high-authority backlinks to your website each month through manual outreach to real website editors and publishers. Each package specifies the volume of links, minimum domain rating (DR) threshold, and link types included - giving you a predictable, compounding backlink acquisition programme. Google treats links from authoritative, niche-relevant sites as editorial endorsements, and pages with the strongest backlink profiles consistently rank highest for competitive keywords. In 2026, this authority signal also determines how frequently AI engines - Google AI Overviews, ChatGPT Search, Perplexity - cite your content in generated answers.
              </p>
              <div className="lbp-def-aspects">
                {[
                  { t: 'Why monthly packages?', d: "Google rewards consistent, natural-looking link growth. A steady monthly programme builds authority signals in a pattern that mirrors how real sites earn links organically - and compounds dramatically over 6–12 months." },
                  { t: 'Links + AI citations?', d: 'AI engines use domain authority as a trust signal when selecting sources to cite. High DR (driven by quality backlinks) + topical relevance + E-E-A-T signals = higher probability of being cited in Google AI Overviews, Perplexity, and ChatGPT.' },
                  { t: 'Guest posts vs. niche edits?', d: 'Guest posts are new articles published on third-party sites with your link included. Niche edits insert your link into existing, indexed content. Both are valuable; the best strategy combines them for maximum authority distribution.' },
                ].map(a => (
                  <div key={a.t} className="lbp-def-aspect">
                    <div className="lbp-def-aspect-t">{a.t}</div>
                    <div className="lbp-def-aspect-d">{a.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY IT MATTERS ── */}
        <section className="lbp-sec" aria-labelledby="why-title">
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('why')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['why']=el;}} style={{textAlign:'center',marginBottom:40}}>
              <span className="lbp-sec-ey">The Data</span>
              <h2 className="lbp-sec-ttl" id="why-title">Why <span className="lbp-hl">Link Building</span> Matters in 2026</h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto'}}>Links remain the single strongest off-page ranking signal in Google&rsquo;s algorithm - and the primary authority input for AI search citation selection.</p>
            </div>
            <div className="lbp-why-grid">
              {WHY_MATTERS.map(w => (
                <div key={w.num} className="lbp-why-card lbp-glass">
                  <div className="lbp-why-num">{w.num}</div>
                  <div className="lbp-why-desc">{w.desc}</div>
                  <div className="lbp-why-src">Source: {w.source}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI+GEO SECTION ── */}
        <section className="lbp-ai-sec" aria-labelledby="ai-title">
          <div className="lbp-ai-orb" aria-hidden="true"/><div className="lbp-ai-orb2" aria-hidden="true"/>
          <div className="lbp-ai-in">
            <span className="lbp-ai-ey">The AI Search Era</span>
            <h2 className="lbp-ai-ttl" id="ai-title">Link Building for <span className="lbp-hl-gold">Google AI, GEO & AEO</span></h2>
            <p className="lbp-ai-sub">How backlinks amplify your brand&rsquo;s presence in ChatGPT, Google AI Overviews, Perplexity, and every AI-generated answer. This is the new frontier of off-page SEO.</p>
            <div className="lbp-ai-grid">
              {AI_PILLARS.map(p => (
                <div key={p.title} className="lbp-ai-card">
                  <div className="lbp-ai-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={p.icon}/>
                    </svg>
                  </div>
                  <div className="lbp-ai-card-t">{p.title}</div>
                  <p className="lbp-ai-card-d">{p.desc}</p>
                  <div className="lbp-ai-stat-row">
                    <span className="lbp-ai-stat-num">{p.stat}</span>
                    <span className="lbp-ai-stat-lbl">{p.statLabel}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lbp-ai-platforms-row" role="list" aria-label="AI platforms we target">
              {AI_PLATFORMS.map(p => (
                <span key={p} className="lbp-ai-plat" role="listitem">
                  <span className="lbp-ai-plat-dot" aria-hidden="true"/>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── E-E-A-T SECTION ── */}
        <section className="lbp-sec lbp-white-sec" aria-labelledby="eeat-title">
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('eeat')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['eeat']=el;}} style={{textAlign:'center',marginBottom:44}}>
              <span className="lbp-sec-ey">Google Quality Guidelines</span>
              <h2 className="lbp-sec-ttl" id="eeat-title">E-E-A-T Authority Through <span className="lbp-hl">Strategic Link Building</span></h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto'}}>Every link we build is designed to strengthen one or more of the four E-E-A-T signals Google uses to evaluate content quality - and that AI engines use to select citation sources.</p>
            </div>
            <div className="lbp-eeat-grid">
              {EEAT_SIGNALS.map(e => (
                <div key={e.word} className="lbp-eeat-card lbp-glass" style={{borderColor:`rgba(${e.letter==='E'&&e.word==='Experience'?'59,130,246':e.word==='Expertise'?'217,119,6':e.word==='Authoritativeness'?'5,150,105':'139,92,246'},.20)`}}>
                  <div className="lbp-eeat-letter" style={{color:e.color}}>{e.letter}</div>
                  <div className="lbp-eeat-word" style={{color:e.color}}>{e.word}</div>
                  <div className="lbp-eeat-desc">{e.desc}</div>
                  <div className="lbp-eeat-links">{e.links}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="lbp-sec lbp-pricing-bg" aria-labelledby="pricing-title">
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('pricing')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['pricing']=el;}} style={{textAlign:'center'}}>
              <span className="lbp-sec-ey">Transparent Pricing</span>
              <h2 className="lbp-sec-ttl" id="pricing-title">Choose Your <span className="lbp-hl">Link Building Package</span></h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto 44px'}}>All packages use 100% manual outreach - no automated tools, no PBNs, no link farms. Full transparency with a live link tracker on every plan. Payment links coming soon - contact us to get started.</p>
            </div>
            <div className="lbp-tog-row">
              <span className={`lbp-tog-lbl${!isYearly?' active':''}`}>Monthly</span>
              <button className={`lbp-tog-btn${isYearly?' on':''}`} onClick={()=>setIsYearly(!isYearly)} aria-label={`Switch to ${isYearly?'monthly':'yearly'} billing`}>
                <span className="lbp-tog-knob"/>
              </button>
              <span className={`lbp-tog-lbl${isYearly?' active':''}`}>Yearly <span className="lbp-save-badge">Save 17%</span></span>
            </div>
            <div className="lbp-cards">
              {PLANS.map(plan => (
                <div key={plan.slug} className={`lbp-card${plan.popular?' lbp-card-pop':''}${plan.elite?' lbp-card-elite':''}`}>
                  {plan.popular && <span className="lbp-pop-tag">Most Popular</span>}
                  {plan.elite && <span className="lbp-elite-tag">AI+GEO Leader</span>}
                  <div className="lbp-plan-name">{plan.name}</div>
                  <p className="lbp-plan-desc">{plan.desc}</p>
                  <div className="lbp-price-row">
                    <span className="lbp-currency">$</span>
                    <span className="lbp-amount">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    <span className="lbp-per">/mo</span>
                  </div>
                  <div className="lbp-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  <div className="lbp-save-line">{isYearly ? `Save $${plan.yearlySave.toLocaleString()} per year` : ' '}</div>
                  {plan.slug === 'starter' ? (
                    <div className="lbp-rzp-wrap">
                      <RazorpayButton buttonId={isYearly ? 'pl_T9SZWFdVQpdPJM' : 'pl_T9SKv2WiRUGdIF'} />
                    </div>
                  ) : plan.slug === 'growth' ? (
                    <div className="lbp-rzp-wrap">
                      <RazorpayButton buttonId={isYearly ? 'pl_T9SbryCDwVm4wu' : 'pl_T9SSBF0E80x93O'} />
                    </div>
                  ) : plan.slug === 'authority' ? (
                    <div className="lbp-rzp-wrap">
                      <RazorpayButton buttonId={isYearly ? 'pl_T9SfDFCdZ1lH0S' : 'pl_T9SVQSBcNAfBSD'} />
                    </div>
                  ) : (
                    <div className="lbp-rzp-wrap">
                      <RazorpayButton buttonId={isYearly ? 'pl_T9Sgh4zAysP8S1' : 'pl_T9SXTt7gsAYHy6'} />
                    </div>
                  )}
                  <div className="lbp-divider"/>
                  <ul className="lbp-feat-list">
                    {plan.features.map(f => <li key={f}>{CHECK}<span>{f}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="lbp-trust">
              {['100% white-hat manual outreach','Live link tracker on all plans','No setup fee','90-day link replacement guarantee','Cancel monthly with 30 days notice'].map(t => (
                <span key={t}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {' '}{t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="lbp-sec" style={{paddingTop:60,paddingBottom:60}} aria-labelledby="compare-title">
          <div className="lbp-sec-in">
            <div style={{textAlign:'center',marginBottom:32}}>
              <span className="lbp-sec-ey">Plan Comparison</span>
              <h2 className="lbp-sec-ttl" id="compare-title"><span className="lbp-hl">Package Comparison</span> at a Glance</h2>
            </div>
            <div className="lbp-tbl-wrap">
              <table className="lbp-tbl">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Starter - $350/mo</th>
                    <th>Growth - $499/mo</th>
                    <th>Authority - $899/mo</th>
                    <th>AI+GEO Elite - $1,499/mo</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Backlinks per month','50','100','200','400'],
                    ['Min. Domain Rating (DR)','DR30+','DR40+','DR50+','DR60+'],
                    ['Min. Domain Authority (DA)','DA20+','DA30+','DA40+','DA50+'],
                    ['Spam Score threshold','Below 3%','Below 2%','Below 2%','Below 1%'],
                    ['Guest posts','✓','✓','✓','✓'],
                    ['Niche edits / link insertions','✗','✓','✓','✓'],
                    ['Digital PR','✗','✗','✓','✓'],
                    ['Content writing included','✓','✓','✓','✓'],
                    ['Manual outreach','✓','✓','✓','✓'],
                    ['E-E-A-T signal placements','✗','✓','✓','Expert level'],
                    ['Anchor text strategy','Natural','Full strategy','AEO optimised','AEO + GEO advanced'],
                    ['AI authority placements','✗','✗','Foundational','Full'],
                    ['LLM citation source targeting','✗','✗','✗','✓'],
                    ['Brand mention campaigns','✗','✗','✗','✓'],
                    ['AI visibility tracking','✗','✗','✗','Monthly report'],
                    ['Competitor gap analysis','✗','Monthly','Monthly','Monthly + AI'],
                    ['Disavow audit','✗','✓','✓','✓'],
                    ['Monthly report','✓','✓','✓','✓'],
                    ['Strategy call','✗','Monthly','Monthly','Monthly'],
                    ['Dedicated strategist','✗','✗','✓','AI+GEO specialist'],
                    ['Live link tracker','✓','✓','✓','✓'],
                  ].map(([feat,...cols]) => (
                    <tr key={feat}>
                      <td>{feat}</td>
                      {cols.map((val,i) => (
                        <td key={i} className={val==='✗'?'lbp-tbl-n':i===3?'lbp-tbl-elite':'lbp-tbl-y'}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── METHODOLOGY ── */}
        <section className="lbp-sec lbp-white-sec" aria-labelledby="method-title">
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('method')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['method']=el;}} style={{textAlign:'center',marginBottom:44}}>
              <span className="lbp-sec-ey">Our Process</span>
              <h2 className="lbp-sec-ttl" id="method-title">How Our <span className="lbp-hl">Link Building Process</span> Works</h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto'}}>Six rigorous steps from strategy to live link - every campaign, every month. AI+GEO Elite clients receive additional citation tracking at each stage.</p>
            </div>
            <div className="lbp-method-grid">
              {METHODOLOGY.map(m => (
                <div key={m.n} className="lbp-method-card lbp-glass">
                  <div className="lbp-method-n" aria-hidden="true">{m.n}</div>
                  <div>
                    <div className="lbp-method-t">{m.title}</div>
                    <p className="lbp-method-d">{m.desc}</p>
                    <ul className="lbp-method-ul">
                      {m.detail.map(d => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUALITY SIGNALS ── */}
        <section className="lbp-sec" style={{paddingTop:60,paddingBottom:60}} aria-labelledby="quality-title">
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('qual')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['qual']=el;}} style={{textAlign:'center',marginBottom:40}}>
              <span className="lbp-sec-ey">Quality Standards</span>
              <h2 className="lbp-sec-ttl" id="quality-title">What Makes Our <span className="lbp-hl">Links</span> Different</h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto'}}>We vet every link site against 15+ quality signals before a single outreach email is sent.</p>
            </div>
            <div className="lbp-qual-grid">
              {QUALITY_SIGNALS.map(q => (
                <div key={q.title} className="lbp-qual-card lbp-glass">
                  <div className="lbp-qual-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={q.icon}/>
                    </svg>
                  </div>
                  <div className="lbp-qual-t">{q.title}</div>
                  <div className="lbp-qual-d">{q.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="lbp-sec lbp-white-sec" style={{paddingTop:60,paddingBottom:60}} aria-labelledby="industries-title">
          <div className="lbp-sec-in">
            <div style={{textAlign:'center',marginBottom:36}}>
              <span className="lbp-sec-ey">Industries We Serve</span>
              <h2 className="lbp-sec-ttl" id="industries-title"><span className="lbp-hl">Link Building</span> Across Every Niche</h2>
            </div>
            <div className="lbp-ind-grid">
              {INDUSTRIES.map(ind => (
                <div key={ind.label} className="lbp-ind-card lbp-glass">
                  <div className="lbp-ind-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={ind.path}/>
                    </svg>
                  </div>
                  <div className="lbp-ind-lbl">{ind.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        {/* ── CASE STUDIES ── */}
        <section className="lbp-cs-sec" aria-labelledby="cs-title">
          <div className="lbp-cs-orb" aria-hidden="true"/>
          <div className="lbp-cs-orb2" aria-hidden="true"/>
          <div className="lbp-cs-in">
            <div className="lbp-cs-head">
              <span className="lbp-cs-ey">Case Studies</span>
              <h2 className="lbp-cs-ttl" id="cs-title"><span className="lbp-hl-gold">Link Building Results</span>: Real Traffic Growth by Package</h2>
              <p className="lbp-cs-sub">Real outcomes from live campaigns. Traffic numbers, links built, and timelines - no made-up projections.</p>
            </div>
            <div className="lbp-cs-grid">
              {CASE_STUDIES.map(cs => (
                <div key={cs.industry} className="lbp-cs-card">
                  <div className="lbp-cs-card-top">
                    <div className="lbp-cs-name">
                      <span className="lbp-cs-emoji" aria-hidden="true">{cs.icon}</span>
                      {cs.industry}
                    </div>
                    <span className="lbp-cs-badge">{cs.growth}</span>
                  </div>
                  <div className="lbp-cs-rows">
                    <div className="lbp-cs-row">
                      <span className="lbp-cs-row-label">
                        <span aria-hidden="true">🚀</span> Traffic Increase
                      </span>
                      <span className="lbp-cs-row-val">
                        {cs.trafficFrom}<span className="lbp-cs-arrow">→</span>{cs.trafficTo}
                      </span>
                    </div>
                    <div className="lbp-cs-divider"/>
                    <div className="lbp-cs-row">
                      <span className="lbp-cs-row-label">
                        <span aria-hidden="true">🕐</span> Time Span
                      </span>
                      <span className="lbp-cs-row-val">{cs.timeSpan}</span>
                    </div>
                    <div className="lbp-cs-divider"/>
                    <div className="lbp-cs-row">
                      <span className="lbp-cs-row-label">
                        <span aria-hidden="true">📦</span> Package
                      </span>
                      <span className="lbp-cs-row-val">{cs.package}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lbp-cs-cta-row">
              <Link href="/contact-us" className="lbp-cs-cta">
                Get Similar Results for Your Business
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE ── */}
        <section className="lbp-sec lbp-white-sec" aria-labelledby="why-ch-title">
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('why-ch')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['why-ch']=el;}} style={{textAlign:'center',marginBottom:48}}>
              <span className="lbp-sec-ey">Why 1Solutions</span>
              <h2 className="lbp-sec-ttl" id="why-ch-title">Why Choose Our <span className="lbp-hl">Link Building</span> Service</h2>
            </div>
            <div className="lbp-why-ch-grid">
              {WHYS.map(w => (
                <div key={w.title} className="lbp-why-ch-card lbp-glass">
                  <div className="lbp-why-ch-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={w.icon}/>
                    </svg>
                  </div>
                  <div className="lbp-why-ch-t">{w.title}</div>
                  <div className="lbp-why-ch-d">{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="lbp-testi-sec" aria-labelledby="testi-title">
          <div className="lbp-testi-hd" ref={el=>{sectionRefs.current['testi']=el;}}>
            <h2 id="testi-title">What Our <span className="lbp-hl">Link Building Clients</span> Say</h2>
            <p>Real results from businesses across India, US, UK and Australia who trust 1Solutions for link building.</p>
          </div>
          {/* Row 1 — scrolls left */}
          <div className="lbp-trow">
            <div className="lbp-tfade-l" aria-hidden="true"/>
            <div className="lbp-tfade-r" aria-hidden="true"/>
            <div className="lbp-ttrack" aria-hidden="true">
              {[...TESTIMONIALS_ROW1,...TESTIMONIALS_ROW1].map((t,i) => (
                <div key={i} className="lbp-tcard">
                  <div className="lbp-tcard-stars">
                    {[1,2,3,4,5].map(s=><span key={s} className="lbp-tcard-star">★</span>)}
                  </div>
                  <p className="lbp-tcard-text">{t.text}</p>
                  <div className="lbp-tcard-author">
                    <div className="lbp-tcard-avatar" style={{background:t.bg}}>{t.initials}</div>
                    <div>
                      <div className="lbp-tcard-name">{t.name}</div>
                      <div className="lbp-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          <div className="lbp-trow">
            <div className="lbp-tfade-l" aria-hidden="true"/>
            <div className="lbp-tfade-r" aria-hidden="true"/>
            <div className="lbp-ttrack-rev" aria-hidden="true">
              {[...TESTIMONIALS_ROW2,...TESTIMONIALS_ROW2].map((t,i) => (
                <div key={i} className="lbp-tcard">
                  <div className="lbp-tcard-stars">
                    {[1,2,3,4,5].map(s=><span key={s} className="lbp-tcard-star">★</span>)}
                  </div>
                  <p className="lbp-tcard-text">{t.text}</p>
                  <div className="lbp-tcard-author">
                    <div className="lbp-tcard-avatar" style={{background:t.bg}}>{t.initials}</div>
                    <div>
                      <div className="lbp-tcard-name">{t.name}</div>
                      <div className="lbp-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FREE LINK AUDIT FORM ── */}
        <section id="link-audit" className="lbp-audit-sec" aria-labelledby="audit-form-title">
          <div className="lbp-audit-in">
            {/* Left copy */}
            <div>
              <h2 className="lbp-audit-ttl" id="audit-form-title">Get Your Free<br/>Link Building Audit</h2>
              <p className="lbp-audit-desc">Tell us about your website and goals. We will analyse your current backlink profile, identify your competitor gap, check your AI citation presence, and share a clear, actionable roadmap — completely free, no obligations.</p>
              <div className="lbp-audit-benefits-box">
                <div className="lbp-audit-ben">
                  <svg className="lbp-audit-ben-icon" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span className="lbp-audit-ben-text">Your details are 100% confidential. We never share your information.</span>
                </div>
                <div className="lbp-audit-ben">
                  <svg className="lbp-audit-ben-icon" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
                  <span className="lbp-audit-ben-text">A senior link building strategist personally reviews your site and backlink profile.</span>
                </div>
                <div className="lbp-audit-ben">
                  <svg className="lbp-audit-ben-icon" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-6v-4m0-4h.01"/></svg>
                  <span className="lbp-audit-ben-text">We respond within 48 business hours with your custom audit and package recommendation.</span>
                </div>
                <div className="lbp-audit-ben">
                  <svg className="lbp-audit-ben-icon" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="lbp-audit-ben-text">No hard sell. If we are not the right fit, we will tell you honestly.</span>
                </div>
                <div className="lbp-audit-stats">
                  <div><div className="lbp-audit-stat-num">500+</div><div className="lbp-audit-stat-txt">Projects Delivered</div></div>
                  <div><div className="lbp-audit-stat-num">15+</div><div className="lbp-audit-stat-txt">Years Experience</div></div>
                  <div><div className="lbp-audit-stat-num">97%</div><div className="lbp-audit-stat-txt">Client Retention</div></div>
                </div>
              </div>
            </div>
            {/* Right form */}
            <div className="lbp-audit-form-box">
              {auditSt === 'success' ? (
                <div className="lbp-audit-success-wrap">
                  <div className="lbp-audit-success-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>We will analyse your backlink profile and send your free link audit report within 48 hours. Check your inbox.</p>
                </div>
              ) : (
                <>
                  <h3>Request Free Link Audit</h3>
                  <form className="lbp-af-form" onSubmit={_auditSubmit} noValidate>
                    <div className="lbp-af-row">
                      <div className="lbp-fg">
                        <label htmlFor="la-name">Full Name*</label>
                        <input id="la-name" name="la-name" type="text" placeholder="Full Name*" required/>
                      </div>
                      <div className="lbp-fg">
                        <label htmlFor="la-email">Business Email*</label>
                        <input id="la-email" name="la-email" type="email" placeholder="Business Email Address*" required/>
                      </div>
                    </div>
                    <div className="lbp-af-row">
                      <div className="lbp-fg">
                        <label htmlFor="la-phone">Phone Number*</label>
                        <div className="lbp-af-phone-wrap">
                          <select name="la-cc" aria-label="Country code">
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+61">+61</option>
                          </select>
                          <input id="la-phone" name="la-phone" type="tel" placeholder="Phone Number*" required/>
                        </div>
                      </div>
                      <div className="lbp-fg">
                        <label htmlFor="la-domain">Website URL*</label>
                        <input id="la-domain" name="la-domain" type="url" placeholder="https://yourwebsite.com" required/>
                      </div>
                    </div>
                    <div className="lbp-fg">
                      <label htmlFor="la-challenge">Current Link Building Challenge*</label>
                      <select id="la-challenge" name="la-challenge" required>
                        <option value="">Select your main challenge</option>
                        <option>My site does not rank despite good content</option>
                        <option>I need to outrank stronger competitors</option>
                        <option>I lost rankings after a Google update</option>
                        <option>I want to build AI citation authority (AEO/GEO)</option>
                        <option>I need a full link building strategy</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="lbp-fg">
                      <label htmlFor="la-goals">Tell Us More*</label>
                      <textarea id="la-goals" name="la-goals" rows={5} placeholder="Describe your goals, top competitors, target market, or any link building challenges you are facing..." required/>
                    </div>
                    <div className="lbp-af-consent">
                      <input type="checkbox" id="la-consent" required/>
                      <label htmlFor="la-consent">I consent that my personal data will be processed according to <a href="/privacy-policy">1Solutions privacy policy</a></label>
                    </div>
                    {auditSt === 'error' && (
                      <p style={{color:'#dc2626',fontSize:13,margin:0,textAlign:'center'}}>Something went wrong. Please try again or email us directly.</p>
                    )}
                    <button type="submit" className="lbp-audit-submit" disabled={auditSt === 'loading'}>
                      {auditSt === 'loading' ? 'Sending...' : 'Get My Free Link Audit'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="lbp-sec lbp-white-sec" style={{paddingTop:80,paddingBottom:80}} aria-labelledby="faq-title">
          <div className="lbp-sec-in" style={{maxWidth:1000,margin:'0 auto'}}>
            <div className={`lbp-reveal${visibleSections.has('faq')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['faq']=el;}}>
              <span className="lbp-sec-ey">Common Questions</span>
              <h2 className="lbp-sec-ttl" id="faq-title"><span className="lbp-hl">Link Building Package</span> FAQs</h2>
              <p className="lbp-sec-desc">Everything you need to know about our link building packages - including AI+GEO and E-E-A-T questions.</p>
            </div>
            <div className="lbp-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`lbp-fitem${openFaq===i?' open':''}`}>
                  <h3 className="lbp-fq-h">
                    <button className="lbp-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i} aria-controls={`faq-ans-${i}`}>
                      <span className="lbp-fq-badge" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
                      <span className="lbp-fq-text">{f.q}</span>
                      <svg className="lbp-fq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                  </h3>
                  <div id={`faq-ans-${i}`} className="lbp-fa" style={{display:openFaq===i?'block':'none'}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        {/* ── RELATED SERVICES ── */}
        <section className="lbp-related-section">
          <div className="lbp-related-inner">
            <span className="lbp-related-eyebrow">LINK BUILDING RELATED OFFERINGS</span>
            <h2 className="lbp-related-title">Explore <span className="lbp-hl">Related Services</span> and Technologies</h2>
            <p className="lbp-related-sub">Pair our link building expertise with related SEO and digital marketing services to maximise your organic growth and AI search visibility.</p>
            <hr className="lbp-related-divider"/>
            <div className="lbp-related-tags">
              {[
                ['SEO Services',                        'blue',    '/seo-services-company'],
                ['Content Marketing Services',          'amber',   '/content-marketing-services'],
                ['Digital PR & Brand Mentions',         'green',   '/digital-marketing-services'],
                ['Generative Engine Optimization',      'violet',  '/generative-engine-optimization-services'],
                ['Technical SEO Optimization',          'slate',   '/technical-seo-optimization'],
                ['SEO Packages',                        'sky',     '/affordable-seo-packages'],
                ['Link Building Services',              'rose',    '/link-building-services'],
                ['Local SEO Services',                  'teal',    '/local-seo-services'],
                ['eCommerce SEO',                       'orange',  '/ecommerce-seo-services'],
                ['Answer Engine Optimization',          'indigo',  '/answer-engine-optimization-services'],
                ['SEO Audit Services',                  'cyan',    '/seo-audit-services'],
                ['Enterprise SEO Services',             'lime',    '/enterprise-seo-services'],
              ].map(([label,color,href]) => (
                <Link href={href} className={`lbp-rtag lbp-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
