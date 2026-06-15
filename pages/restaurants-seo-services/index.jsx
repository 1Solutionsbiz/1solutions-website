import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Restaurant Keyword Targeting', desc: 'Comprehensive keyword mapping across restaurants near me, best [cuisine] in [city], [cuisine] takeaway, romantic dinner [city], family restaurant [suburb], best brunch spots, date night restaurants, and food delivery keywords — capturing every dining intent from spontaneous searches to planned special occasions.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Restaurant Google Business Profile', desc: 'Full GBP setup with menu integration, curated photo gallery, reservation link integration (OpenTable or Resy), special hours for public holidays, weekly posts with specials and events, and review management — the complete GBP profile that dominates the local map pack and drives foot traffic.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Menu and Cuisine Landing Pages', desc: 'Individual pages optimised for each cuisine type, dietary preference (vegan, halal, gluten-free, keto), and dining occasion (date night, business lunch, family dinner, group bookings) — turning niche searches into table reservations with pages precisely matched to searcher intent.' },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: 'Restaurant Review Generation', desc: 'Google, TripAdvisor, Yelp, and OpenTable review acquisition strategy with post-visit review request workflows, professional negative review response templates, and a review velocity system that builds the social proof diners look for before choosing a restaurant.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Local Food Blog and PR Outreach', desc: 'Earning links and mentions from local food bloggers, lifestyle publications, and "best restaurants in [city]" editorial round-up articles — the community authority signals that lift your restaurant above competitors in both organic and map pack results.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Food Schema Markup', desc: 'Restaurant LocalBusiness, Menu, MenuItem, and FoodEstablishment schema implementation — giving your restaurant rich result eligibility with menu items, prices, and cuisine type displayed directly in Google search results, and improved visibility for voice search queries.' },
  { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', title: 'Delivery Platform SEO', desc: 'Google ordering integration setup, DoorDash and Uber Eats listing optimisation with keyword-rich descriptions and cuisine tags, and Google Business Profile food ordering link — so your restaurant appears at the top for delivery-intent searches as well as dine-in searches.' },
  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Seasonal and Event Campaign SEO', desc: 'Content campaigns and GBP posts planned around peak dining occasions — Valentine\'s Day dinner, Mother\'s Day brunch, New Year\'s Eve degustation, Easter lunch, local food festival participation — ensuring you rank at the top when diners are searching for the specific occasion you offer.' },
];

const RESULTS = [
  { metric: '#1', label: 'For [cuisine] restaurant [city]', sub: 'Fine dining establishment — 4 months', color: '#FFB0B0' },
  { metric: '4.2×', label: 'Increase in table reservations via organic', sub: 'Casual dining chain — 6 months', color: '#FFD890' },
  { metric: '290%', label: 'Growth in food delivery orders', sub: 'Takeaway restaurant — 5 months', color: '#A0FFD0' },
];

const PROCESS = [
  { n: '01', title: 'Restaurant Audit + GBP Health Check', desc: 'Full audit of your website, GBP profile, menu integration, review profile, citation consistency, and competitor restaurant landscape — identifying every gap between your current visibility and the top map pack position.' },
  { n: '02', title: 'Cuisine + Occasion Keyword Mapping', desc: 'We map search demand across every cuisine type, dietary preference, and dining occasion relevant to your restaurant — building a keyword architecture that captures every type of diner searching for what you offer.' },
  { n: '03', title: 'GBP + Menu Pages', desc: 'GBP fully optimised with menu integration, reservation link, photo gallery, and weekly posts. Cuisine and occasion landing pages written with keyword-rich content and conversion copy that drives reservations and orders.' },
  { n: '04', title: 'Review Acquisition Launch', desc: 'Post-visit review request workflows go live via email and QR code at the table — building Google, TripAdvisor, Yelp, and OpenTable reviews rapidly to reach the review counts that dominate search results.' },
  { n: '05', title: 'Food Blogger Outreach', desc: 'We reach out to local food bloggers, city lifestyle publications, and "best restaurants" editorial sites to earn links and mentions that build community authority and referral traffic from engaged food audiences.' },
  { n: '06', title: 'Monthly Covers + Reservation Reporting', desc: 'Monthly rank tracking for all cuisine and occasion keywords, GBP call and direction requests, reservation conversion rates from organic, and seasonal campaign performance — complete visibility into what your SEO is delivering.' },
];

const WHY = [
  { title: 'Restaurant Industry SEO Expertise', desc: 'We understand the specific search behaviour of diners — from impulsive "restaurants near me now" mobile searches to deliberate special occasion research — and build content and GBP strategies for every dining intent.' },
  { title: 'GBP Menu Integration', desc: 'A complete, keyword-rich menu integrated into your GBP profile improves map pack ranking signals and gives diners the information they need to choose your restaurant before even clicking through to your website.' },
  { title: 'Review Platform Mastery', desc: 'We build review velocity across Google, TripAdvisor, Yelp, and OpenTable — the four platforms that most influence dining decisions — with post-visit workflows that make leaving a review effortless for happy customers.' },
  { title: 'Cuisine-Specific Content', desc: 'We write about your cuisine with genuine depth — ingredients, preparation methods, cultural context, dietary information — the kind of content that earns trust from Google and from diners researching where to eat.' },
  { title: 'Seasonal Campaign Execution', desc: 'We plan and execute seasonal content campaigns and GBP posts months in advance — ensuring you rank at the top for Valentine\'s Day, Mother\'s Day, New Year\'s Eve, and local food events before the searches peak.' },
  { title: 'Transparent Booking Attribution', desc: 'Monthly reporting on reservation conversion rates from organic, GBP call and direction requests, keyword positions, and seasonal campaign performance — tied directly to the covers and orders you care about.' },
];

const FAQS = [
  { q: 'How long does restaurant SEO take to increase reservations?', a: 'Google Business Profile optimisation typically produces measurable increases in GBP calls, direction requests, and reservation clicks within 3 to 6 weeks. Cuisine-specific landing pages and occasion content typically achieve meaningful ranking movement within 6 to 12 weeks for moderate-competition terms. In highly competitive dining markets, reaching top-3 positions for "best [cuisine] restaurant [city]" may take 4 to 8 months of consistent content and link building.' },
  { q: 'Is Google Business Profile or TripAdvisor more important for restaurants?', a: 'For local dine-in searches, Google Business Profile is more important — it drives map pack placement and accounts for the majority of reservation-driving searches. TripAdvisor is more important for tourist-facing restaurants, destination dining, and markets where TripAdvisor has strong cultural adoption (parts of Europe and Australia). Yelp remains important in major US cities. We build presence on all relevant platforms based on your cuisine type, location, and target diner demographic.' },
  { q: 'Does menu SEO actually work for restaurants?', a: 'Yes, significantly. Menu items that are properly formatted with schema markup can appear directly in Google search results as rich snippets — showing dish names, prices, and descriptions without a click. Additionally, individual dish and cuisine pages rank for specific food queries that generic restaurant homepage content never captures. We have seen restaurants achieve first-page rankings for "[specific dish] [city]" queries that drive a meaningful number of additional covers per month.' },
  { q: 'Can you optimise a restaurant for delivery platform searches?', a: 'Yes. We optimise your restaurant listings on DoorDash, Uber Eats, and Google Food Ordering with keyword-rich descriptions, accurate cuisine tags, high-quality food photography guidance, and menu item descriptions that rank within platform search algorithms. We also set up Google ordering integration so your restaurant appears with direct order links in Google search results — capturing delivery-intent searches without platform commission on those orders.' },
  { q: 'Does SEO work differently for chain restaurants vs single-location restaurants?', a: 'Yes. Single-location restaurants focus all local authority on one GBP and one website — simpler but requires strong map pack positioning. Multi-location restaurant chains need individual location pages for each site, separate GBP profiles per location with location-specific reviews and content, and a central brand authority strategy. We have managed SEO for both single-location fine dining and multi-site casual dining groups, and we build the right architecture for each.' },
  { q: 'How do seasonal SEO campaigns work for restaurants?', a: 'Seasonal campaigns involve creating content and GBP posts that specifically target dining-occasion searches well before their peak — typically 4 to 8 weeks in advance. For example, Valentine\'s Day content published in early January allows time for indexing and ranking before diners start searching. We plan the full year\'s seasonal calendar in advance, including Valentine\'s Day, Mother\'s Day, Easter, local food festivals, summer dining, and Christmas/New Year\'s, so you rank at the top for each occasion.' },
  { q: 'How do you measure restaurant SEO ROI?', a: 'We track GBP reservation clicks, call volume, and direction requests (all measurable in GBP Insights), organic contact form enquiries for group bookings and private events, keyword ranking positions for all cuisine and occasion terms, and food ordering integration click-through rates. For restaurants using reservation platforms like OpenTable or Resy, we can correlate organic traffic to confirmed reservations — giving you a cost-per-cover attribution from your SEO investment.' },
];

export default function RestaurantsSeoServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Restaurant SEO Services', item: 'https://www.1solutions.biz/restaurants-seo-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'Restaurant SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Restaurant SEO to rank for restaurants near me, best cuisine in city, food delivery, and dining occasion keywords that fill tables and grow reservations.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'Restaurant and Food Business Search Engine Optimisation',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '96', bestRating: '5' },
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
        <title>Restaurant SEO Services | Rank #1 for Restaurants Near Me | 1Solutions</title>
        <meta name="description" content="Fill more tables with 1Solutions restaurant SEO. Rank for restaurants near me, best [cuisine] in [city], food delivery, and dining keywords that drive real bookings." />
        <link rel="canonical" href="https://www.1solutions.biz/restaurants-seo-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          * { box-sizing: border-box; }
          .rtseo-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(92,0,32,0.10) 0%,rgba(255,255,255,0.72) 50%,rgba(92,0,32,0.06) 100%); }
          .rtseo-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(92,0,32,0.14) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .rtseo-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(180,0,60,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .rtseo-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; }
          .rtseo-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(92,0,32,0.10);border:1px solid rgba(92,0,32,0.22);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#5c0020;margin-bottom:24px; }
          .rtseo-h1 { font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#5c0020 0%,#8c0030 50%,#5c0020 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .rtseo-desc { font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px; }
          .rtseo-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .rtseo-btn-p { display:inline-flex;align-items:center;gap:8px;background:#5c0020;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(92,0,32,0.28); }
          .rtseo-btn-p:hover { background:#8c0030;transform:translateY(-2px); }
          .rtseo-btn-s { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#5c0020;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(92,0,32,0.20);transition:all 0.25s;backdrop-filter:blur(8px); }
          .rtseo-btn-s:hover { background:#fff;transform:translateY(-2px); }
          .rtseo-trust { display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px; }
          .rtseo-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .rtseo-stats-bar { display:flex;border:1px solid rgba(92,0,32,0.12);border-radius:16px;background:rgba(255,255,255,0.75);backdrop-filter:blur(12px);overflow:hidden;max-width:720px; }
          .rtseo-stat-item { flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(92,0,32,0.08); }
          .rtseo-stat-item:last-child { border-right:none; }
          .rtseo-stat-num { font-size:1.5rem;font-weight:900;color:#5c0020;line-height:1;letter-spacing:-1px; }
          .rtseo-stat-lbl { font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px; }
          .rtseo-bc { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .rtseo-bc-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .rtseo-bc a { color:#6b7280;text-decoration:none; }
          .rtseo-bc a:hover { color:#5c0020; }
          .rtseo-bc-sep { color:#d1d5db; }
          .rtseo-bc-cur { color:#5c0020;font-weight:500; }
          .rtseo-sec { padding:80px 40px; }
          .rtseo-sec-inner { max-width:1200px;margin:0 auto; }
          .rtseo-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#5c0020;margin-bottom:12px; }
          .rtseo-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .rtseo-h2 span { background:linear-gradient(90deg,#5c0020,#8c0030);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .rtseo-lead { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .rtseo-bg { background:#fdf4f6; }
          .rtseo-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .rtseo-card { background:linear-gradient(135deg,rgba(92,0,32,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(92,0,32,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(92,0,32,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .rtseo-card:hover { transform:translateY(-6px);border-color:rgba(92,0,32,0.22);box-shadow:0 16px 48px rgba(92,0,32,0.12); }
          .rtseo-icon { width:48px;height:48px;border-radius:14px;background:rgba(92,0,32,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px; }
          .rtseo-icon svg { width:22px;height:22px;color:#5c0020; }
          .rtseo-card-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .rtseo-card-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .rtseo-results { background:linear-gradient(135deg,#250010 0%,#5c0020 100%);padding:64px 40px; }
          .rtseo-results-inner { max-width:1200px;margin:0 auto; }
          .rtseo-res-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,180,180,0.85);margin-bottom:12px;text-align:center; }
          .rtseo-res-h { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .rtseo-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .rtseo-res-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center; }
          .rtseo-res-metric { font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px; }
          .rtseo-res-label { font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px; }
          .rtseo-res-sub { font-size:12.5px;color:rgba(255,255,255,0.50); }
          .rtseo-why-card { background:linear-gradient(135deg,rgba(92,0,32,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(92,0,32,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(92,0,32,0.07); }
          .rtseo-why-check { width:36px;height:36px;border-radius:10px;background:rgba(92,0,32,0.09);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .rtseo-why-check svg { width:18px;height:18px;color:#5c0020; }
          .rtseo-why-h { font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px; }
          .rtseo-why-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .rtseo-proc-num { font-size:3.5rem;font-weight:900;color:rgba(92,0,32,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .rtseo-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#5c0020,rgba(92,0,32,0.2));border-radius:2px;margin-bottom:16px; }
          .rtseo-proc-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .rtseo-proc-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .rtseo-faq-list { display:flex;flex-direction:column;gap:10px; }
          .rtseo-faq-item { background:linear-gradient(135deg,rgba(92,0,32,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(92,0,32,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(92,0,32,0.06); }
          .rtseo-faq-item.open { border-color:rgba(92,0,32,0.28); }
          .rtseo-faq-btn { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .rtseo-faq-qt { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .rtseo-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(92,0,32,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .rtseo-faq-item.open .rtseo-faq-icon { background:rgba(92,0,32,0.14);transform:rotate(45deg); }
          .rtseo-faq-icon svg { width:14px;height:14px;color:#5c0020; }
          .rtseo-faq-a { padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.75; }
          .rtseo-cta { background:linear-gradient(135deg,rgba(92,0,32,0.10) 0%,rgba(255,255,255,0.65) 40%,rgba(92,0,32,0.08) 100%);padding:90px 40px;text-align:center;position:relative;overflow:hidden; }
          .rtseo-cta-h { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#250010 0%,#5c0020 50%,#8c0030 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .rtseo-cta-p { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) { .rtseo-grid3,.rtseo-res-grid { grid-template-columns:1fr 1fr; } }
          @media (max-width:600px) {
            .rtseo-hero,.rtseo-sec,.rtseo-results,.rtseo-cta { padding-left:20px;padding-right:20px; }
            .rtseo-hero { padding-top:60px;padding-bottom:50px; }
            .rtseo-grid3,.rtseo-res-grid { grid-template-columns:1fr; }
            .rtseo-bc { padding:12px 20px; }
          }
        `}</style>
      </Head>

      <nav className="rtseo-bc" aria-label="Breadcrumb">
        <div className="rtseo-bc-inner">
          <Link href="/">Home</Link>
          <span className="rtseo-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="rtseo-bc-sep">›</span>
          <span className="rtseo-bc-cur">Restaurant SEO Services</span>
        </div>
      </nav>

      <section className="rtseo-hero">
        <div className="rtseo-orb1" /><div className="rtseo-orb2" />
        <div className="rtseo-inner">
          <span className="rtseo-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
            Restaurant SEO — Dine-In · Takeaway · Delivery · Occasions
          </span>
          <h1 className="rtseo-h1">Restaurant SEO That Packs<br/>Your Tables With Local Diners</h1>
          <p className="rtseo-desc">1Solutions builds restaurant SEO strategies that put your eatery at the top of local search when hungry diners are choosing where to eat. Cuisine-specific pages, GBP menu integration, TripAdvisor and review platform management, and seasonal campaigns that fill tables for every occasion.</p>
          <div className="rtseo-btns">
            <a href="#contact" className="rtseo-btn-p">
              Get Your Free Restaurant SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="rtseo-btn-s">View SEO Packages</Link>
          </div>
          <div className="rtseo-trust">
            {['Restaurant Industry SEO Expertise','GBP Menu Integration','Review Platform Mastery','Seasonal Campaign Execution'].map(t => (
              <span key={t} className="rtseo-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5c0020" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="rtseo-stats-bar">
            {[
              { num:'86%', lbl:'of diners research restaurants online before visiting' },
              { num:'$290B', lbl:'US restaurant industry revenue (2024)' },
              { num:'200%', lbl:'growth in restaurant mobile searches in 3 years' },
              { num:'5×', lbl:'more clicks for top map pack restaurant vs position 4' },
            ].map(s => (
              <div key={s.lbl} className="rtseo-stat-item">
                <span className="rtseo-stat-num">{s.num}</span>
                <span className="rtseo-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rtseo-sec rtseo-bg" id="services">
        <div className="rtseo-sec-inner">
          <span className="rtseo-tag">What We Do</span>
          <h2 className="rtseo-h2">Full-Spectrum <span>Restaurant SEO Services</span></h2>
          <p className="rtseo-lead">From cuisine keyword targeting to seasonal event campaigns and delivery platform optimisation — every component your restaurant needs to dominate local dining searches.</p>
          <div className="rtseo-grid3">
            {SERVICES.map(s => (
              <div key={s.title} className="rtseo-card">
                <div className="rtseo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="rtseo-card-h">{s.title}</h3>
                <p className="rtseo-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rtseo-results">
        <div className="rtseo-results-inner">
          <span className="rtseo-res-tag">Client Results</span>
          <h2 className="rtseo-res-h">Restaurant SEO Results That Fill Every Table</h2>
          <div className="rtseo-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="rtseo-res-card">
                <div className="rtseo-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="rtseo-res-label">{r.label}</div>
                <div className="rtseo-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rtseo-sec" id="why-us">
        <div className="rtseo-sec-inner">
          <span className="rtseo-tag">Why 1Solutions</span>
          <h2 className="rtseo-h2">The Restaurant SEO Agency <span>That Thinks in Covers</span></h2>
          <p className="rtseo-lead">We build restaurant SEO strategies with one goal in mind — more diners choosing your restaurant when they search for where to eat tonight.</p>
          <div className="rtseo-grid3">
            {WHY.map(w => (
              <div key={w.title} className="rtseo-why-card">
                <div className="rtseo-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="rtseo-why-h">{w.title}</h3>
                <p className="rtseo-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rtseo-sec rtseo-bg" id="process">
        <div className="rtseo-sec-inner">
          <span className="rtseo-tag">How We Work</span>
          <h2 className="rtseo-h2">Our <span>6-Step Restaurant SEO Process</span></h2>
          <p className="rtseo-lead">From GBP audit to ongoing reservation growth — a proven process for restaurants that want to fill more tables from local search.</p>
          <div className="rtseo-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="rtseo-proc-num">{p.n}</div>
                <div className="rtseo-proc-line" />
                <h3 className="rtseo-proc-h">{p.title}</h3>
                <p className="rtseo-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rtseo-sec" id="faq">
        <div className="rtseo-sec-inner">
          <span className="rtseo-tag">Got Questions?</span>
          <h2 className="rtseo-h2">Restaurant SEO <span>FAQs</span></h2>
          <div className="rtseo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'rtseo-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="rtseo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="rtseo-faq-qt">{f.q}</span>
                  <span className="rtseo-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq === i && <div className="rtseo-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rtseo-cta" id="contact">
        <div className="rtseo-sec-inner">
          <span className="rtseo-tag" style={{ display:'block', textAlign:'center', marginBottom:12 }}>Ready to Fill More Tables?</span>
          <h2 className="rtseo-cta-h">Get Your Free Restaurant SEO Audit</h2>
          <p className="rtseo-cta-p">We will audit your GBP, website, review profile, and competitor landscape — and deliver a prioritised action plan for growing your reservations and orders from local search. Free, no obligation.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="rtseo-btn-p">
              Request Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages/" className="rtseo-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
