import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const OPTIMIZATIONS = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'GBP Setup & Verification',
    desc: 'Complete Google Business Profile setup — accurate business information, category selection, service area configuration, and the verification process handled end to end so your listing goes live correctly the first time.',
  },
  {
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z',
    title: 'Category & Attribute Optimisation',
    desc: 'Selecting the right primary and secondary categories is one of the highest-impact GMB ranking factors. We research the categories your top competitors use, then optimise every applicable attribute — from accessibility features to payment methods.',
  },
  {
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Photos & Video Strategy',
    desc: 'GBP listings with 100+ photos receive 520% more calls than those with fewer. We create a photo upload schedule, write keyword-rich alt descriptions, add geotagged images, and guide you on the types of visuals that most improve map pack engagement.',
  },
  {
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    title: 'Google Posts & Updates',
    desc: 'Weekly Google Posts keep your listing active and give Google fresh content signals. We manage your post calendar — offers, events, product announcements, and What\'s New posts — with keyword-optimised copy and compelling CTAs.',
  },
  {
    icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Q&A Management',
    desc: 'The Q&A section is an underutilised ranking signal. We seed high-intent questions with keyword-rich answers, monitor for new questions, and flag or remove misinformation — turning a neglected section into a trust and keyword asset.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: 'Review Acquisition & Response',
    desc: 'Review quantity, rating, and recency directly influence map pack rankings. We build a systematic review request process via SMS/email, craft professional responses to every review (positive and negative), and flag policy-violating reviews for removal.',
  },
  {
    icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
    title: 'Citation Building & NAP Audit',
    desc: 'Consistent Name, Address, and Phone data across 50+ directories reinforces your GBP authority. We audit every existing citation, fix inconsistencies, build new citations in high-trust directories, and suppress duplicate listings.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'GBP Insights & Reporting',
    desc: 'Monthly reports tracking map pack position movement, search query data, direction requests, call clicks, and photo views — with actionable commentary on what changed, what drove it, and the priority actions for next month.',
  },
];

const STATS = [
  { num: '46%', desc: 'of all Google searches have local intent — your GBP is the first thing these searchers see.', source: 'Google' },
  { num: '88%', desc: 'of consumers who do a local search visit or call the business within 24 hours of finding it.', source: 'Google / Ipsos' },
  { num: '70%', desc: 'of customers visit a business because of information they found in its Google Business Profile.', source: 'BrightLocal' },
];

const RESULTS = [
  { metric: 'Top 3', h3: 'Ranked in Google Maps Top 3', label: 'Google Maps pack positions', sub: 'US HVAC contractor — 4 months', color: '#1a73e8' },
  { metric: '340%', h3: '340% Increase in GBP Phone Calls', label: 'Increase in GBP phone calls', sub: 'AU dental practice — 6 months', color: '#fbbc04' },
  { metric: '2.8×', h3: '2.8× More Direction Requests', label: 'More direction requests', sub: 'India retail chain — 5 months', color: '#34a853' },
];

const RANKING_FACTORS = [
  {
    title: 'Relevance',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    desc: 'How closely your Google Business Profile matches what the searcher is looking for. Categories, keywords in your business description, services listed, and Q&A content all drive relevance.',
    tips: ['Select the most specific primary category available', 'Add all applicable secondary categories (up to 9)', 'Include target keywords naturally in your business description', 'List every individual service your business offers'],
  },
  {
    title: 'Distance',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
    desc: 'How far your business location — or defined service area — is from the searcher or the geographic term in the query. Distance is the least controllable factor, but multi-location strategy and accurate service-area setup both help.',
    tips: ['Use an accurate, verifiable physical address', 'Create individual GBP listings for each physical location', 'Service-area businesses: define your radius precisely', 'Avoid overstating your service area — Google penalises inflated radii'],
  },
  {
    title: 'Prominence',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    desc: "How well-known and authoritative Google considers your business to be. Prominence is the factor most improved by active GBP optimization — reviews, citations, GBP activity, and your website's organic authority all contribute.",
    tips: ['Build consistent review volume, recency, and rating', 'Ensure NAP consistency across 50+ authoritative directories', 'Earn local backlinks to your website', 'Maintain 100% GBP completeness with regular weekly posting'],
  },
];

const CHECKLIST = [
  'Claim and verify your Google Business Profile listing',
  'Select the most specific, accurate primary category',
  'Add all applicable secondary categories (up to 9)',
  'Write a keyword-rich business description up to 750 characters',
  'Add complete business hours including special and holiday hours',
  'Upload 10+ high-quality photos: exterior, interior, team, products',
  'Add all services with individual descriptions and prices',
  'Add all products to the Products section if applicable',
  'Enable Google Messaging with an auto-reply configured',
  'Build a systematic review request process via SMS or email',
  'Respond to every review — positive and negative — within 24 hours',
  "Publish Google Posts weekly (offers, events, What's New, products)",
  'Seed the Q&A section with 5–10 keyword-rich questions and answers',
  'Audit NAP consistency across all existing directory citations',
  'Build citations in 50+ authoritative local and industry directories',
  'Monitor map pack rankings weekly for all target keywords',
  'Flag and report competitor spam: keyword stuffing, fake listings',
];

const PROCESS = [
  { n: '01', title: 'GBP Audit & Competitor Analysis', desc: 'We audit your existing GBP for completeness, accuracy, category fit, photo quality, review health, and citation consistency. We benchmark your profile against the top 3 map pack competitors for every target keyword.' },
  { n: '02', title: 'Keyword & Category Strategy', desc: 'We identify every high-intent local keyword your customers search for, map them to the right GBP categories, and build a content strategy that covers every service and geographic modifier.' },
  { n: '03', title: 'Profile Optimisation', desc: 'We update every section of your GBP — business description with natural keyword placement, categories, attributes, services, products, and hours — following Google\'s current quality guidelines.' },
  { n: '04', title: 'Photo, Post & Q&A Execution', desc: 'We launch your photo strategy, begin the weekly Google Posts schedule, and seed the Q&A section with high-value keyword-rich answers covering your most important search queries.' },
  { n: '05', title: 'Review & Citation Building', desc: 'We deploy your review acquisition system and begin fixing and building citations across the most authoritative local directories for your industry and geography.' },
  { n: '06', title: 'Monitor, Report & Iterate', desc: 'Monthly map pack ranking reports, GBP insight summaries, and a forward action plan. We adjust strategy monthly based on ranking movement, algorithm changes, and competitive shifts.' },
];

const WHY = [
  { title: 'GBP-First Approach', desc: 'Many SEO agencies treat GBP as an afterthought. We treat it as its own channel with its own ranking algorithm — proximity, prominence, and relevance signals that require specific expertise to move.' },
  { title: '15+ Years Local SEO Experience', desc: 'We have been optimising Google Business Profiles (formerly Google My Business) since the platform launched. Our team has navigated every major change to the local algorithm and ranking factors.' },
  { title: 'Multi-Location Capability', desc: 'From a single clinic to a 100-location franchise, we have the systems and workflows to manage GBP optimisation at scale — consistent quality across every location, centralised reporting.' },
  { title: 'Review Strategy Included', desc: 'A 4.8-star profile with 200 reviews dramatically outranks a 4.2-star profile with 20. Every GMB engagement includes a systematic review acquisition process and a response framework for every review type.' },
  { title: 'Spam & Competitor Monitoring', desc: 'We monitor your map pack for keyword stuffing in competitor names, fake listings, and GBP policy violations — and file removal requests with documentation when we find violations targeting your rankings.' },
  { title: 'Transparent Monthly Reporting', desc: 'You see exactly where your GBP ranks for each target keyword, how many calls and direction requests Google attributed to your profile, and what we are doing next month to improve each metric.' },
];

const INDUSTRIES = [
  { name: 'Healthcare & Dental', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { name: 'Home Services', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Legal Services', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
  { name: 'Retail & Restaurants', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { name: 'Real Estate', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { name: 'Automotive', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' },
  { name: 'Hospitality & Hotels', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { name: 'Education & Coaching', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
];

const FAQS = [
  { q: "What is the difference between Google My Business and Google Business Profile?", a: "Google rebranded Google My Business (GMB) to Google Business Profile (GBP) in November 2021. They are the same platform — the free tool businesses use to manage how they appear in Google Search and Google Maps. Many people still search for 'Google My Business optimization' so both terms are in common use. Our service covers the full GBP/GMB management and optimisation process regardless of what you call it." },
  { q: "How long does it take to rank in the Google Maps 3-pack after optimisation?", a: "Most businesses see meaningful map pack movement within 6 to 12 weeks for lower-competition local keywords. Highly competitive verticals like legal, dental, and real estate in major cities typically take 3 to 5 months. Initial improvements — more profile completeness, better click-through rate — are often visible within the first 30 days. We give honest, audit-based timelines rather than promises." },
  { q: "Do I need a physical address to appear in Google Maps?", a: "Yes, for traditional map pack rankings tied to a physical location. However, service-area businesses (plumbers, electricians, IT support) can hide their address and set a service area instead — and still appear in the map pack for queries within those areas. We optimise both types of GBP listings." },
  { q: "Can you help if my Google Business Profile is suspended or has been penalised?", a: "Yes. GBP suspensions are usually caused by guideline violations, keyword stuffing in the business name, or address issues. We diagnose the root cause, clean up the profile to comply with Google's guidelines, and submit a reinstatement request with the appropriate documentation. Reinstatement timelines vary from a few days to a few weeks." },
  { q: "How many Google reviews do I need to rank in the local pack?", a: "Review count is one factor, but review velocity (how recently and how regularly new reviews arrive), average rating, and keyword content in reviews all matter. There is no fixed number — what matters is outperforming local competitors on those dimensions. We focus on building a sustainable review system rather than a one-time surge, because consistent new reviews signal ongoing relevance to Google." },
  { q: "What are Google Posts and do they actually help rankings?", a: "Google Posts are short updates — offers, events, news, product announcements — that appear directly in your GBP knowledge panel. They are a relevance signal and a click-through driver. Regular posting demonstrates business activity to Google and gives searchers a reason to engage with your listing over a competitor's. Our service includes weekly post creation and publishing." },
  { q: "Do you manage multi-location Google Business Profiles?", a: "Yes. We have systems for managing GBP optimisation across multi-location businesses and franchises — from 2 locations to 100+. Each location gets its own tailored optimisation (correct category, location-specific photos, local citations) with centralised reporting so you can see performance across your entire portfolio in one view." },
  { q: "What does a Google My Business optimization service include?", a: "A complete Google My Business optimization service covers: GBP setup and verification, primary and secondary category selection, business description writing with keyword placement, photo strategy and upload scheduling, weekly Google Posts management, Q&A seeding with keyword-rich answers, review acquisition system setup and response management, NAP citation audit and new citation building, and monthly map pack ranking reports. 1Solutions manages all of these as part of our GBP retainer." },
  { q: "Is Google My Business optimization worth it for small businesses?", a: "Yes — Google My Business optimization is one of the highest-ROI local marketing activities for small businesses. The Google Maps 3-pack appears above organic results and drives direct calls, direction requests, and website visits without ad spend. For service-area businesses and physical retail, a well-optimised GBP is often the single biggest driver of inbound customer enquiries. The cost of professional GMB optimization is typically recovered within the first month of improved rankings." },
  { q: "What is the difference between local SEO and Google Business Profile optimization?", a: "Local SEO is the broader discipline of improving a business's visibility across all local search results — including organic website rankings, local pack rankings, and directory listings. Google Business Profile optimization is a specific subset of local SEO focused entirely on the GBP listing itself: categories, photos, posts, reviews, Q&A, and citation signals that influence map pack rankings. At 1Solutions, we offer both — GBP optimization as a standalone service and as part of a full local SEO strategy." },
  { q: "How much does Google My Business optimization cost?", a: "Google My Business optimization pricing depends on the number of locations, the competitive intensity of your market, and the level of ongoing management required. A single-location GMB optimization retainer covers profile setup, monthly posting, review management, and citation building. Multi-location packages are priced per location with volume discounts. Contact us for a tailored quote — we provide a free GBP audit first so you understand exactly what work is needed before committing." },
  { q: "What are the most important Google Business Profile ranking factors?", a: "Google uses three primary factors to rank businesses in the Maps 3-pack: relevance (how well your GBP matches the search query — driven by categories, descriptions, and services listed), distance (how close your location is to the searcher or the searched location), and prominence (how well-known your business is — driven by review volume and rating, citation consistency, backlinks, and GBP completeness). Of these, relevance and prominence are the most actionable through optimization." },
];

export default function GoogleMyBusinessOptimization() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', locations: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'Local SEO Services', item: 'https://1solutions.biz/local-seo-services/' },
          { '@type': 'ListItem', position: 3, name: 'Google My Business Optimization', item: 'https://1solutions.biz/google-my-business-optimization/' },
        ],
      },
      {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://1solutions.biz',
        logo: 'https://1solutions.biz/logo/1solutions-logo.png',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '47, Vijay Block, Laxmi Nagar',
          addressLocality: 'New Delhi',
          postalCode: '110092',
          addressCountry: 'IN',
        },
        sameAs: [
          'https://www.facebook.com/1solutions',
          'https://www.linkedin.com/company/1solutions',
          'https://x.com/1solutions',
          'https://www.trustpilot.com/review/1solutions.biz',
          'https://g.co/kgs/4BCmrBR',
        ],
      },
      {
        '@type': 'Service',
        name: 'Google My Business Optimization Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://1solutions.biz' },
        description: 'Expert Google My Business (Google Business Profile) optimization services — GBP setup, category strategy, photo management, Google Posts, review acquisition, citation building, and monthly reporting to dominate the Google Maps 3-pack.',
        areaServed: ['IN', 'US', 'CA', 'AU', 'GB'],
        serviceType: 'Google Business Profile Optimization',
        dateModified: '2026-06-23',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '375', bestRating: '5' },
      },
      {
        '@type': 'HowTo',
        name: '6-Step Google My Business Optimization Process',
        description: 'How to optimize a Google Business Profile to rank in the Google Maps 3-pack — from initial audit to sustained local map pack rankings.',
        step: PROCESS.map((p, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: p.title,
          text: p.desc,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="gmbo-page">
      <Head>
        <title>Google My Business Optimization Services | GMB Experts | 1Solutions</title>
        <meta name="description" content="Expert Google My Business optimization to rank in the Google Maps 3-pack. GBP setup, photos, posts, reviews & citations. 500+ profiles optimised. Free audit." />
        <meta name="keywords" content="Google My Business optimization, GMB optimization, Google Business Profile optimization, GBP optimization services, Google Maps optimization, local SEO, Google Maps 3-pack ranking" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1solutions.biz/google-my-business-optimization/" />
        <meta property="og:title" content="Google My Business Optimization Services | GMB Experts | 1Solutions" />
        <meta property="og:description" content="Dominate the Google Maps 3-pack with expert GMB optimization. 15+ years experience, 500+ profiles optimised. Free Google Business Profile audit." />
        <meta property="og:url" content="https://1solutions.biz/google-my-business-optimization/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://1solutions.biz/images/google-my-business-optimization-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="1Solutions" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Google My Business Optimization Services | 1Solutions" />
        <meta name="twitter:description" content="Expert GMB optimization to rank in the Google Maps 3-pack. 500+ profiles optimised. Free audit." />
        <meta name="twitter:image" content="https://1solutions.biz/images/google-my-business-optimization-og.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}

          /* ── Page wrapper ── */
          .gmbo-page{background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);min-height:100vh;}

          /* ── Hero ── */
          .gmbo-hero{position:relative;overflow:hidden;padding:90px 40px 80px;background:transparent;}
          .gmbo-orb1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.30) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);pointer-events:none;filter:blur(20px);}
          .gmbo-orb2{position:absolute;bottom:-80px;left:-80px;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.28) 0%,rgba(245,158,11,0.12) 40%,transparent 70%);pointer-events:none;filter:blur(20px);}
          .gmbo-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
          .gmbo-eyebrow{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,0.55);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:50px;padding:6px 18px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin-bottom:24px;box-shadow:0 2px 10px rgba(15,52,96,0.08);}
          .gmbo-g-dot{display:flex;gap:3px;align-items:center;}
          .gmbo-g-dot span{width:7px;height:7px;border-radius:50%;}
          .gmbo-h1{font-size:clamp(2.2rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;color:#0F1F40;}
          .gmbo-h1 em{font-style:normal;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .gmbo-desc{font-size:1.1rem;color:#3A507A;line-height:1.8;margin:0 0 36px;max-width:680px;}
          .gmbo-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
          .gmbo-btn-p{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:#0F3460;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;border:1.5px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .gmbo-btn-p:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.60);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.15),inset 0 1px 0 rgba(255,255,255,1);}
          .gmbo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.40);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#0F3460;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(255,255,255,0.70);transition:all 0.25s;}
          .gmbo-btn-s:hover{background:rgba(255,255,255,0.70);transform:translateY(-2px);}
          .gmbo-trust{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px;}
          .gmbo-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#4A6080;font-weight:500;}
          .gmbo-stats-bar{display:flex;border:1px solid rgba(255,255,255,0.85);border-radius:16px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);overflow:hidden;max-width:680px;box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);}
          .gmbo-stat-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(15,52,96,0.10);}
          .gmbo-stat-item:last-child{border-right:none;}
          .gmbo-stat-num{font-size:1.9rem;font-weight:900;color:#D97706;line-height:1;letter-spacing:-1px;}
          .gmbo-stat-lbl{font-size:11px;color:#4A6080;font-weight:500;line-height:1.4;text-align:center;margin-top:4px;}

          /* ── Breadcrumb ── */
          .gmbo-bc{background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.70);padding:12px 40px;}
          .gmbo-bc-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6A80A0;}
          .gmbo-bc a{color:#6A80A0;text-decoration:none;}.gmbo-bc a:hover{color:#D97706;}
          .gmbo-bc-sep{color:#c0cfe0;}.gmbo-bc-cur{color:#D97706;font-weight:500;}

          /* ── Sections ── */
          .gmbo-sec{padding:80px 40px;}
          .gmbo-bg{background:rgba(255,255,255,0.40);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
          .gmbo-sec-inner{max-width:1200px;margin:0 auto;}
          .gmbo-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#D97706;margin-bottom:12px;}
          .gmbo-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0F3460;margin:0 0 16px;}
          .gmbo-h2 span{background:linear-gradient(90deg,#0F3460,#D97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .gmbo-lead{font-size:1rem;color:#4A6080;line-height:1.75;max-width:620px;margin:0 0 48px;}

          /* ── Service Cards ── */
          .gmbo-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .gmbo-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;}
          .gmbo-card:hover{transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1);}
          .gmbo-icon{width:48px;height:48px;border-radius:14px;background:rgba(15,52,96,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .gmbo-icon svg{width:22px;height:22px;color:#0F3460;}
          .gmbo-card-h{font-size:1rem;font-weight:700;color:#0F1F40;margin:0 0 10px;line-height:1.3;}
          .gmbo-card-p{font-size:13.5px;color:#4A6080;line-height:1.7;margin:0;}

          /* ── Key Takeaways ── */
          .gmbo-takeaways{background:rgba(217,119,6,0.06);border:1px solid rgba(217,119,6,0.20);border-radius:16px;padding:20px 24px;margin-bottom:36px;max-width:680px;}
          .gmbo-takeaways-label{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block;}
          .gmbo-takeaways ul{margin:0;padding:0 0 0 18px;display:flex;flex-direction:column;gap:7px;}
          .gmbo-takeaways li{font-size:13.5px;color:#374151;line-height:1.6;}
          .gmbo-takeaways li strong{color:#0F3460;}

          /* ── Stats Why ── */
          .gmbo-stat-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .gmbo-stat-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:36px 28px;text-align:center;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);}
          .gmbo-sc-num{font-size:3.8rem;font-weight:900;line-height:1;letter-spacing:-2px;margin-bottom:14px;background:linear-gradient(90deg,#0F3460,#D97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .gmbo-sc-desc{font-size:14.5px;color:#4A6080;line-height:1.7;margin:0 0 10px;}
          .gmbo-sc-source{font-size:11px;color:#6A80A0;font-weight:500;}

          /* ── Definition ── */
          .gmbo-def-box{background:rgba(255,255,255,0.60);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:36px 40px;margin-bottom:40px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);}
          .gmbo-def-intro{font-size:1.05rem;color:#1e293b;line-height:1.85;margin:0 0 20px;}
          .gmbo-def-intro strong{color:#0F3460;}
          .gmbo-def-aspects{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:28px;}
          .gmbo-def-aspect{background:rgba(255,255,255,0.70);border:1px solid rgba(255,255,255,0.90);border-radius:12px;padding:16px 18px;box-shadow:0 2px 12px rgba(15,52,96,0.06);}
          .gmbo-def-aspect-title{font-size:13px;font-weight:700;color:#0F3460;margin-bottom:6px;}
          .gmbo-def-aspect-desc{font-size:12.5px;color:#4A6080;line-height:1.6;margin:0;}

          /* ── Ranking Factors ── */
          .gmbo-rank-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .gmbo-rank-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,border-color 0.22s;}
          .gmbo-rank-card:hover{transform:translateY(-4px);border-color:rgba(217,119,6,0.45);}
          .gmbo-rank-icon{width:48px;height:48px;border-radius:14px;background:rgba(15,52,96,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .gmbo-rank-icon svg{width:22px;height:22px;color:#0F3460;}
          .gmbo-rank-title{font-size:1.15rem;font-weight:800;color:#0F3460;margin:0 0 10px;}
          .gmbo-rank-desc{font-size:13.5px;color:#4A6080;line-height:1.75;margin:0 0 18px;}
          .gmbo-rank-tips{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;}
          .gmbo-rank-tip{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5;}
          .gmbo-rank-tip-dot{width:6px;height:6px;border-radius:50%;background:#D97706;flex-shrink:0;margin-top:5px;}

          /* ── Results ── */
          .gmbo-results{background:linear-gradient(135deg,#0F3460 0%,#1a1a4e 50%,#0f2d5e 100%);padding:64px 40px;}
          .gmbo-results-inner{max-width:1200px;margin:0 auto;}
          .gmbo-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(217,119,6,0.85);margin-bottom:12px;text-align:center;}
          .gmbo-res-h{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2;}
          .gmbo-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .gmbo-res-card{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center;transition:border-color 0.2s;}
          .gmbo-res-card:hover{border-color:rgba(217,119,6,0.40);}
          .gmbo-res-metric{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:6px;letter-spacing:-2px;}
          .gmbo-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
          .gmbo-res-sub{font-size:12.5px;color:rgba(255,255,255,0.50);}
          .gmbo-res-h3{font-size:0;line-height:0;color:transparent;position:absolute;overflow:hidden;width:1px;height:1px;}

          /* ── Checklist ── */
          .gmbo-checklist-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px 32px;}
          .gmbo-check-item{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:#374151;line-height:1.55;padding:10px 0;border-bottom:1px solid rgba(15,52,96,0.08);}
          .gmbo-check-num{width:22px;height:22px;border-radius:50%;background:#D97706;color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}

          /* ── Pricing Note ── */
          .gmbo-pricing-note{background:rgba(217,119,6,0.06);border:1px solid rgba(217,119,6,0.18);border-radius:12px;padding:14px 18px;margin:20px 0;font-size:13px;color:#374151;line-height:1.65;}
          .gmbo-pricing-note strong{color:#D97706;}

          /* ── Author Note ── */
          .gmbo-author-bar{max-width:1200px;margin:0 auto;padding:0 40px 48px;}
          .gmbo-author-inner{background:rgba(255,255,255,0.60);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:18px 24px;display:flex;align-items:center;gap:14px;box-shadow:0 2px 12px rgba(15,52,96,0.06);}
          .gmbo-author-icon{width:40px;height:40px;border-radius:50%;background:rgba(15,52,96,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .gmbo-author-icon svg{width:20px;height:20px;color:#0F3460;}
          .gmbo-author-text{font-size:12.5px;color:#6A80A0;line-height:1.6;}
          .gmbo-author-text strong{color:#0F3460;}

          /* ── Process ── */
          .gmbo-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .gmbo-proc-num{font-size:3.5rem;font-weight:900;color:rgba(15,52,96,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .gmbo-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#D97706,rgba(217,119,6,0.25));border-radius:2px;margin-bottom:16px;}
          .gmbo-proc-h{font-size:1rem;font-weight:700;color:#0F3460;margin:0 0 10px;}
          .gmbo-proc-p{font-size:13.5px;color:#4A6080;line-height:1.7;margin:0;}

          /* ── Why ── */
          .gmbo-grid2{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .gmbo-why-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,border-color 0.22s;}
          .gmbo-why-card:hover{transform:translateY(-4px);border-color:rgba(217,119,6,0.45);}
          .gmbo-why-check{width:36px;height:36px;border-radius:10px;background:rgba(15,52,96,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
          .gmbo-why-check svg{width:18px;height:18px;color:#0F3460;}
          .gmbo-why-h{font-size:15px;font-weight:700;color:#0F3460;margin:0 0 8px;}
          .gmbo-why-p{font-size:13.5px;color:#4A6080;line-height:1.7;margin:0;}

          /* ── Industries ── */
          .gmbo-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
          .gmbo-ind-card{background:rgba(255,255,255,0.60);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:20px 16px;display:flex;align-items:center;gap:12px;transition:border-color 0.2s,box-shadow 0.2s,transform 0.2s;box-shadow:0 2px 10px rgba(15,52,96,0.06);}
          .gmbo-ind-card:hover{border-color:rgba(217,119,6,0.35);box-shadow:0 8px 28px rgba(15,52,96,0.12);transform:translateY(-2px);}
          .gmbo-ind-icon{width:36px;height:36px;border-radius:10px;background:rgba(15,52,96,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .gmbo-ind-icon svg{width:18px;height:18px;color:#0F3460;}
          .gmbo-ind-name{font-size:13.5px;font-weight:600;color:#0F3460;line-height:1.3;}

          /* ── FAQ ── */
          .gmbo-faq-list{display:flex;flex-direction:column;gap:10px;}
          .gmbo-faq-item{background:linear-gradient(135deg,rgba(219,234,254,0.45) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.88);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.06);position:relative;transition:border-color 0.2s;}
          .gmbo-faq-item.open{border-color:rgba(15,52,96,0.22);}
          .gmbo-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px;}
          .gmbo-faq-btn{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px 20px 28px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit;}
          .gmbo-faq-qt{font-size:15px;font-weight:600;color:#0F3460;line-height:1.4;}
          .gmbo-faq-item.open .gmbo-faq-qt{color:#0F3460;}
          .gmbo-faq-icon{width:28px;height:28px;border-radius:50%;background:rgba(15,52,96,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s;}
          .gmbo-faq-item.open .gmbo-faq-icon{background:rgba(217,119,6,0.14);transform:rotate(45deg);}
          .gmbo-faq-icon svg{width:14px;height:14px;color:#0F3460;}
          .gmbo-faq-a{padding:0 24px 20px 28px;font-size:14px;color:#4A6080;line-height:1.8;}

          /* ── Contact ── */
          .gmbo-contact-sec{padding:80px 40px;background:transparent;}
          .gmbo-contact-inner{max-width:1200px;margin:0 auto;}
          .gmbo-contact-grid{display:grid;grid-template-columns:1fr 1.25fr;gap:60px;align-items:start;}
          .gmbo-info-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:900;color:#0F3460;margin:0 0 16px;line-height:1.25;}
          .gmbo-info-h span{background:linear-gradient(90deg,#0F3460,#D97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .gmbo-info-p{font-size:1rem;color:#4A6080;line-height:1.75;margin:0 0 28px;}
          .gmbo-ci{display:flex;align-items:flex-start;gap:14px;margin-bottom:18px;}
          .gmbo-ci-icon{width:40px;height:40px;border-radius:12px;background:rgba(15,52,96,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .gmbo-ci-icon svg{width:18px;height:18px;color:#0F3460;}
          .gmbo-ci-text strong{display:block;font-size:13px;font-weight:700;color:#0F3460;margin-bottom:2px;}
          .gmbo-ci-text a,.gmbo-ci-text span{font-size:13.5px;color:#4A6080;text-decoration:none;}
          .gmbo-trust-list{display:flex;flex-direction:column;gap:10px;margin-top:28px;}
          .gmbo-trust-item{display:flex;align-items:center;gap:10px;font-size:13.5px;color:#4A6080;}
          .gmbo-trust-item svg{flex-shrink:0;color:#D97706;}
          .gmbo-form-wrap{background:rgba(255,255,255,0.70);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.90);border-radius:24px;padding:40px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,0.95);}
          .gmbo-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
          .gmbo-field label{font-size:13px;font-weight:600;color:#0F3460;}
          .gmbo-field input,.gmbo-field select,.gmbo-field textarea{padding:11px 14px;border:1.5px solid rgba(15,52,96,0.15);border-radius:10px;font-size:14px;font-family:inherit;color:#0F1F40;outline:none;transition:border-color 0.2s;background:rgba(255,255,255,0.80);}
          .gmbo-field input:focus,.gmbo-field select:focus,.gmbo-field textarea:focus{border-color:#D97706;}
          .gmbo-field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .gmbo-sent{text-align:center;padding:48px 24px;}
          .gmbo-sent-icon{width:64px;height:64px;border-radius:50%;background:#0F3460;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .gmbo-sent-icon svg{width:28px;height:28px;color:#fff;}
          .gmbo-sent h3{font-size:1.5rem;font-weight:800;color:#0F3460;margin:0 0 10px;}
          .gmbo-sent p{color:#4A6080;font-size:1rem;line-height:1.7;margin:0;}
          .gmbo-submit-btn{width:100%;padding:14px;background:#0F3460;color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s,transform 0.2s;margin-top:4px;}
          .gmbo-submit-btn:hover{opacity:0.88;transform:translateY(-1px);}

          /* ── CTA ── */
          .gmbo-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a4e 50%,#0f2d5e 100%);padding:80px 40px;text-align:center;}
          .gmbo-cta h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.2;}
          .gmbo-cta p{font-size:1rem;color:rgba(255,255,255,0.78);margin:0 0 32px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7;}
          .gmbo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
          .gmbo-cta-btn-p{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:#0F3460;padding:14px 32px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;border:1.5px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.15),inset 0 1px 0 rgba(255,255,255,1);}
          .gmbo-cta-btn-p:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.60);transform:translateY(-2px);}
          .gmbo-cta-btn-s{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:2px solid rgba(255,255,255,0.32);transition:all 0.25s;}
          .gmbo-cta-btn-s:hover{border-color:rgba(255,255,255,0.70);background:rgba(255,255,255,0.08);}

          /* ── Responsive ── */
          @media(max-width:900px){
            .gmbo-grid4{grid-template-columns:1fr 1fr;}
            .gmbo-grid3,.gmbo-grid2,.gmbo-stat-cards,.gmbo-res-grid,.gmbo-rank-grid{grid-template-columns:1fr 1fr;}
            .gmbo-ind-grid{grid-template-columns:1fr 1fr;}
            .gmbo-contact-grid{grid-template-columns:1fr;gap:40px;}
            .gmbo-def-aspects{grid-template-columns:1fr 1fr;}
            .gmbo-checklist-grid{grid-template-columns:1fr;}
          }
          @media(max-width:600px){
            .gmbo-hero,.gmbo-sec,.gmbo-results,.gmbo-cta,.gmbo-contact-sec{padding-left:20px;padding-right:20px;}
            .gmbo-hero{padding-top:60px;padding-bottom:50px;}
            .gmbo-grid4,.gmbo-grid3,.gmbo-grid2,.gmbo-stat-cards,.gmbo-res-grid,.gmbo-ind-grid,.gmbo-rank-grid{grid-template-columns:1fr;}
            .gmbo-def-aspects{grid-template-columns:1fr;}
            .gmbo-bc{padding:12px 20px;}
            .gmbo-field-row{grid-template-columns:1fr;}
            .gmbo-form-wrap{padding:24px 20px;}
            .gmbo-author-bar{padding:0 20px 40px;}
          }
        `}</style>
      </Head>

      {/* Breadcrumb */}
      <nav className="gmbo-bc" aria-label="Breadcrumb">
        <div className="gmbo-bc-inner">
          <Link href="/">Home</Link>
          <span className="gmbo-bc-sep">›</span>
          <Link href="/local-seo-services/">Local SEO</Link>
          <span className="gmbo-bc-sep">›</span>
          <span className="gmbo-bc-cur">Google My Business Optimization</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="gmbo-hero">
        <div className="gmbo-orb1" /><div className="gmbo-orb2" />
        <div className="gmbo-inner">
          <span className="gmbo-eyebrow">
            <span className="gmbo-g-dot">
              <span style={{ background: '#4285f4' }} />
              <span style={{ background: '#ea4335' }} />
              <span style={{ background: '#fbbc04' }} />
              <span style={{ background: '#34a853' }} />
            </span>
            Google My Business Optimization Experts
          </span>
          <h1 className="gmbo-h1">
            <em>Google My Business Optimization</em><br />
            That Gets You Into the Maps 3-Pack
          </h1>
          <p className="gmbo-desc">
            1Solutions delivers expert Google My Business optimization (now Google Business Profile) to help local businesses rank in the top 3 of Google Maps — the most visible real estate in local search. Complete GBP management: setup, categories, photos, posts, reviews, citations, and monthly reporting.
          </p>
          <div className="gmbo-btns">
            <a href="#contact" className="gmbo-btn-p">
              Get a Free GBP Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/local-seo-services/" className="gmbo-btn-s">See Local SEO Services →</Link>
          </div>

          {/* Key Takeaways — AI Overview & featured snippet signal */}
          <div className="gmbo-takeaways">
            <span className="gmbo-takeaways-label">Key Takeaways</span>
            <ul>
              <li><strong>Google My Business optimization</strong> = completing and actively managing your GBP listing to rank in the Maps 3-pack</li>
              <li>Google&rsquo;s 3 ranking factors: <strong>relevance</strong>, <strong>distance</strong>, and <strong>prominence</strong></li>
              <li>Typical results: <strong>6–12 weeks</strong> for lower-competition keywords; 3–5 months for competitive markets</li>
              <li>Core elements: categories, photos, reviews, posts, citations, Q&amp;A, and business description</li>
              <li>Service-area businesses can rank in the Maps 3-pack <strong>without a public address</strong></li>
            </ul>
          </div>

          <div className="gmbo-trust">
            {['GBP certified team', '15+ years local SEO', 'No lock-in contracts', 'Monthly ranking reports'].map(t => (
              <span key={t} className="gmbo-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34a853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="gmbo-stats-bar">
            {[
              { num: '500+', lbl: 'GBP Profiles Optimised' },
              { num: '15+', lbl: 'Years Experience' },
              { num: '3-Pack', lbl: 'Rankings Achieved' },
              { num: '97%', lbl: 'Client Retention' },
            ].map(s => (
              <div key={s.lbl} className="gmbo-stat-item">
                <span className="gmbo-stat-num">{s.num}</span>
                <span className="gmbo-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Is GMB Optimization — definition for AI Overviews */}
      <section className="gmbo-sec gmbo-bg">
        <div className="gmbo-sec-inner">
          <span className="gmbo-tag">Definition</span>
          <h2 className="gmbo-h2">What Is <span>Google My Business Optimization?</span></h2>
          <div className="gmbo-def-box">
            <p className="gmbo-def-intro">
              <strong>Google My Business optimization</strong> (officially Google Business Profile optimization since November 2021) is the process of completing, structuring, and actively managing a business&rsquo;s GBP listing to rank in the <strong>Google Maps 3-pack</strong> — the block of three local business results that appears at the top of Google Search for queries with local intent. It is distinct from general SEO: where website SEO improves organic rankings, GMB optimization directly influences how a business appears in Google Maps and the local knowledge panel.
            </p>
            <p className="gmbo-def-intro" style={{ marginBottom: 0 }}>
              Effective Google Business Profile optimization covers eight core areas: business verification and category selection, photo and video strategy, Google Posts management, Q&amp;A seeding, review acquisition and response, citation building, and ongoing performance reporting — all working together to strengthen the three ranking signals Google uses: <strong>relevance</strong>, <strong>distance</strong>, and <strong>prominence</strong>.
            </p>
            <div className="gmbo-def-aspects">
              {[
                { title: 'Also known as', desc: 'GMB optimization, GBP optimization, Google Maps optimization, Google listing optimization' },
                { title: 'Managed in', desc: 'Google Business Profile Manager (business.google.com) — free platform for all businesses' },
                { title: 'Target outcome', desc: 'Ranking in the top 3 of the Google Maps local pack for high-intent local search queries' },
              ].map(a => (
                <div key={a.title} className="gmbo-def-aspect">
                  <div className="gmbo-def-aspect-title">{a.title}</div>
                  <p className="gmbo-def-aspect-desc">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why GMB Matters */}
      <section className="gmbo-sec">
        <div className="gmbo-sec-inner">
          <span className="gmbo-tag">Why Google Business Profile Matters</span>
          <h2 className="gmbo-h2">Local Search Is Where <span>Customers Decide to Buy</span></h2>
          <p className="gmbo-lead">Your Google Business Profile is the first thing local customers see — before your website, before your ads. The data is clear.</p>
          <div className="gmbo-stat-cards">
            {STATS.map(s => (
              <div key={s.num} className="gmbo-stat-card">
                <div className="gmbo-sc-num" style={{ background: 'linear-gradient(90deg,#1a73e8,#34a853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.num}</div>
                <p className="gmbo-sc-desc">{s.desc}</p>
                <span className="gmbo-sc-source">Source: {s.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Google Ranks — ranking factors, featured snippet target */}
      <section className="gmbo-sec gmbo-bg" id="ranking-factors">
        <div className="gmbo-sec-inner">
          <span className="gmbo-tag">How Google Maps Rankings Work</span>
          <h2 className="gmbo-h2">The 3 Google Maps <span>Ranking Factors Explained</span></h2>
          <p className="gmbo-lead">Google uses three factors to decide which businesses appear in the Maps 3-pack. Understanding each factor is the foundation of every GMB optimization strategy we build.</p>
          <div className="gmbo-rank-grid">
            {RANKING_FACTORS.map(rf => (
              <div key={rf.title} className="gmbo-rank-card">
                <div className="gmbo-rank-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={rf.icon} /></svg>
                </div>
                <h3 className="gmbo-rank-title">{rf.title}</h3>
                <p className="gmbo-rank-desc">{rf.desc}</p>
                <ul className="gmbo-rank-tips">
                  {rf.tips.map(tip => (
                    <li key={tip} className="gmbo-rank-tip">
                      <span className="gmbo-rank-tip-dot" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Optimize */}
      <section className="gmbo-sec" id="services">
        <div className="gmbo-sec-inner">
          <span className="gmbo-tag">What We Optimise</span>
          <h2 className="gmbo-h2">Complete <span>Google My Business Optimization</span> Service</h2>
          <p className="gmbo-lead">Every element of your Google Business Profile that influences how Google ranks you in Maps — and how customers decide whether to call you.</p>
          <div className="gmbo-grid4">
            {OPTIMIZATIONS.map(o => (
              <div key={o.title} className="gmbo-card">
                <div className="gmbo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={o.icon} /></svg>
                </div>
                <h3 className="gmbo-card-h">{o.title}</h3>
                <p className="gmbo-card-p">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="gmbo-results">
        <div className="gmbo-results-inner">
          <span className="gmbo-res-tag">Proven Results</span>
          <h2 className="gmbo-res-h">What Our GMB Optimization Delivers</h2>
          <div className="gmbo-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="gmbo-res-card">
                <h3 className="gmbo-res-h3">{r.h3}</h3>
                <div className="gmbo-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="gmbo-res-label">{r.label}</div>
                <div className="gmbo-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="gmbo-sec gmbo-bg" id="process">
        <div className="gmbo-sec-inner">
          <span className="gmbo-tag">How We Work</span>
          <h2 className="gmbo-h2">Our <span>6-Step GMB Optimization Process</span></h2>
          <p className="gmbo-lead">A structured, transparent approach to Google Business Profile optimization — from audit to sustained map pack rankings.</p>
          <div className="gmbo-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="gmbo-proc-num">{p.n}</div>
                <div className="gmbo-proc-line" />
                <h3 className="gmbo-proc-h">{p.title}</h3>
                <p className="gmbo-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why 1Solutions */}
      <section className="gmbo-sec" id="why-us">
        <div className="gmbo-sec-inner">
          <span className="gmbo-tag">Why Choose 1Solutions</span>
          <h2 className="gmbo-h2">The GMB Agency That <span>Delivers Measurable Rankings</span></h2>
          <p className="gmbo-lead">We treat Google Business Profile as its own search channel — with its own algorithm, ranking factors, and optimisation playbook. Here is why 500+ businesses trust us with their GBP.</p>
          <div className="gmbo-grid2">
            {WHY.map(w => (
              <div key={w.title} className="gmbo-why-card">
                <div className="gmbo-why-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="gmbo-why-h">{w.title}</h3>
                <p className="gmbo-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="gmbo-sec gmbo-bg">
        <div className="gmbo-sec-inner">
          <span className="gmbo-tag">Industries We Serve</span>
          <h2 className="gmbo-h2">GMB Optimization for <span>Every Local Business Type</span></h2>
          <p className="gmbo-lead">We optimise Google Business Profiles across the industries where local search intent is highest — where customers are searching for a business near them right now.</p>
          <div className="gmbo-ind-grid">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className="gmbo-ind-card">
                <div className="gmbo-ind-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={ind.icon} /></svg>
                </div>
                <span className="gmbo-ind-name">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="gmbo-sec" id="faq">
        <div className="gmbo-sec-inner">
          <span className="gmbo-tag">Frequently Asked Questions</span>
          <h2 className="gmbo-h2">Google My Business Optimization <span>FAQs</span></h2>
          <p className="gmbo-lead" style={{ marginBottom: 32 }}>Honest answers to the most common questions about Google Business Profile optimization and Google Maps rankings.</p>
          <div className="gmbo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'gmbo-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="gmbo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="gmbo-faq-qt">{f.q}</span>
                  <span className="gmbo-faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </span>
                </button>
                <div className="gmbo-faq-a" style={{ display: openFaq === i ? 'block' : 'none' }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GBP Optimization Checklist */}
      <section className="gmbo-sec">
        <div className="gmbo-sec-inner">
          <span className="gmbo-tag">Free Checklist</span>
          <h2 className="gmbo-h2">Google Business Profile <span>Optimization Checklist</span></h2>
          <p className="gmbo-lead">Use this checklist to audit your current GBP listing. Every unchecked item is a ranking opportunity your competitors may already be using.</p>
          <div className="gmbo-checklist-grid">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="gmbo-check-item">
                <span className="gmbo-check-num">{String(i + 1).padStart(2, '0')}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="gmbo-contact-sec" id="contact">
        <div className="gmbo-contact-inner">
          <div className="gmbo-contact-grid">
            <div>
              <h2 className="gmbo-info-h">Get Your Free <span>Google Business Profile Audit</span></h2>
              <p className="gmbo-info-p">Tell us about your business and we will audit your Google Business Profile — checking category fit, completeness, competitor gaps, citation consistency, and review health. Free, no commitment, delivered within 24 hours.</p>
              <div className="gmbo-ci">
                <div className="gmbo-ci-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="gmbo-ci-text">
                  <strong>Email</strong>
                  <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>
                </div>
              </div>
              <div className="gmbo-ci">
                <div className="gmbo-ci-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>
                </div>
                <div className="gmbo-ci-text">
                  <strong>WhatsApp / Call</strong>
                  <a href="tel:+911solutions">+91 contact via website</a>
                </div>
              </div>
              <div className="gmbo-ci">
                <div className="gmbo-ci-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="gmbo-ci-text">
                  <strong>Response Time</strong>
                  <span>Free audit delivered within 24 hours</span>
                </div>
              </div>
              <div className="gmbo-trust-list">
                {[
                  'Free GBP audit — no credit card, no commitment',
                  'Dedicated local SEO specialist assigned',
                  'Works for single locations and multi-location businesses',
                  'White-hat, Google-guideline-compliant strategies only',
                ].map(t => (
                  <span key={t} className="gmbo-trust-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </span>
                ))}
              </div>
              <div className="gmbo-pricing-note">
                <strong>How much does Google My Business optimization cost?</strong> Our GMB optimization plans start from <strong>$199/month</strong> for a single-location business. Pricing scales with the number of locations, keyword competition level, and the scope of citation and review management included. Every engagement begins with a free GBP audit — book yours above and we will send a detailed proposal with pricing within 24 hours.
              </div>
            </div>
            <div className="gmbo-form-wrap">
              {sent ? (
                <div className="gmbo-sent">
                  <div className="gmbo-sent-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3>Audit Request Received</h3>
                  <p>Thank you! Our local SEO team will audit your Google Business Profile and send you a detailed report within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="gmbo-field-row">
                    <div className="gmbo-field">
                      <label>Your Name *</label>
                      <input required type="text" placeholder="John Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="gmbo-field">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="john@business.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="gmbo-field-row">
                    <div className="gmbo-field">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div className="gmbo-field">
                      <label>Business Website *</label>
                      <input required type="url" placeholder="https://yourbusiness.com" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
                    </div>
                  </div>
                  <div className="gmbo-field">
                    <label>Number of Locations</label>
                    <select value={form.locations} onChange={e => setForm({ ...form, locations: e.target.value })}>
                      <option value="">Select number of locations</option>
                      <option>1 location</option>
                      <option>2–5 locations</option>
                      <option>6–20 locations</option>
                      <option>21–50 locations</option>
                      <option>50+ locations</option>
                    </select>
                  </div>
                  <div className="gmbo-field">
                    <label>What is your biggest GMB / local search challenge?</label>
                    <textarea rows={4} placeholder="Not ranking in Maps 3-pack, low calls from GBP, suspended listing, poor review count, competitor outranking us..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" className="gmbo-submit-btn">Request Free GBP Audit →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Author / E-E-A-T signal */}
      <div className="gmbo-author-bar">
        <div className="gmbo-author-inner">
          <div className="gmbo-author-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <p className="gmbo-author-text">
            <strong>Written and reviewed by the 1Solutions Local SEO team.</strong> 1Solutions has optimised 500+ Google Business Profiles across 30+ industries since 2009. Our GMB specialists hold Google Analytics and Google Ads certifications and follow Google&rsquo;s Business Profile guidelines and the BrightLocal Local Search Industry Report for up-to-date best practices. Last reviewed: <strong>June 2026</strong>.
          </p>
        </div>
      </div>

      {/* CTA */}
      <section className="gmbo-cta">
        <div className="gmbo-sec-inner">
          <h2>Ready to Dominate the Google Maps 3-Pack?</h2>
          <p>Join 500+ businesses that trust 1Solutions to optimise their Google Business Profile and generate more calls, direction requests, and local leads from organic search.</p>
          <div className="gmbo-cta-btns">
            <a href="#contact" className="gmbo-cta-btn-p">
              Get Free GBP Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/local-seo-services/" className="gmbo-cta-btn-s">Explore Local SEO Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
