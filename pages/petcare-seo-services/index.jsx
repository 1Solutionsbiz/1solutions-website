import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Veterinary Keyword Strategy', desc: 'Comprehensive keyword mapping across vet near me, emergency vet, cat vet, dog specialist, low-cost vet, exotic animal vet, and specialist referral terms — ensuring your practice appears for every search a pet owner makes when their animal needs care.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Pet Groomer Local SEO', desc: 'Targeted optimisation for dog groomer near me, mobile pet grooming, breed-specific grooming services, puppy first groom, cat grooming, and senior pet grooming — capturing pet owners searching for exactly the grooming service you provide.' },
  { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', title: 'Google Business Profile for Pet Businesses', desc: 'Full GBP setup with the correct pet services categories, a photo strategy featuring adorable patient and guest photos, appointment booking link integration, holiday hours management, and review management that builds trust with local pet owners.' },
  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Pet Boarding and Daycare SEO', desc: 'Dedicated keyword targeting and content for dog boarding, cat boarding, pet hotel, doggy daycare, weekend boarding, and holiday pet care — including seasonal campaigns timed to peak demand periods like summer and holiday periods.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Pet Care Citation Building', desc: 'Business listings across Yelp, VetFinder, BringFido, PetFinder professional listings, Angi pet services, local chamber directories, and pet-industry directories — consistent NAP data that builds the local authority your map pack position depends on.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Pet Care Content Marketing', desc: 'Educational content targeting research-phase pet owner queries — vaccination schedules, grooming tips, boarding checklists, toxic foods for dogs and cats, dental health for pets — ranking for the queries pet owners type before they need to book a service.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Competitor Analysis for Pet Services', desc: 'Identify every keyword your local vet competitors, grooming salons, and boarding facilities rank for that you do not — and a prioritised roadmap to capture top-10 positions for the highest-value service terms in your area.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Pet Business Schema Markup', desc: 'VeterinaryCare, AnimalShelter, and LocalBusiness schema types with services offered, appointment availability, species treated, and review aggregate schema — the structured data that gives your business rich result eligibility and local Knowledge Panel presence.' },
];

const RESULTS = [
  { metric: '#1', label: 'For vet near me [city]', sub: '3-vet practice — 4 months', color: '#80FFB0' },
  { metric: '3.6×', label: 'Increase in appointment bookings', sub: 'Pet grooming salon — 5 months', color: '#FFD060' },
  { metric: '210%', label: 'Growth in organic traffic', sub: 'Pet boarding facility — 7 months', color: '#80DFFF' },
];

const PROCESS = [
  { n: '01', title: 'Pet Business Audit', desc: 'Full audit of your website, GBP, citation profile, and competitor landscape — identifying every gap between your current rankings and the top map pack positions for your key services.' },
  { n: '02', title: 'Keyword + Competitor Mapping', desc: 'We map search demand across every pet service you offer — vet, grooming, boarding, daycare, supplies — and identify the competitor keyword gaps that represent the fastest growth opportunities.' },
  { n: '03', title: 'GBP + Service Pages', desc: 'Google Business Profile optimised with the right pet service categories. Dedicated service pages written for each offering — with keyword targeting, schema markup, and conversion copy built in.' },
  { n: '04', title: 'Citation + Directory Setup', desc: 'Your pet business listed and verified across all major pet and local directories — Yelp, VetFinder, BringFido, Angi, and local chamber directories — with consistent NAP data across all platforms.' },
  { n: '05', title: 'Seasonal Content Campaigns', desc: 'Content campaigns planned around peak demand periods — summer boarding, holiday grooming, spring flea and tick season, winter wellness checks — so you rank at the top when demand spikes.' },
  { n: '06', title: 'Monthly Reporting', desc: 'Monthly rank tracking, GBP call volume, appointment enquiry count, seasonal campaign performance, and a 90-day forward roadmap — complete visibility into what your SEO is delivering.' },
];

const WHY = [
  { title: 'Pet Industry SEO Expertise', desc: 'We understand the search behaviour of pet owners — from panicked emergency vet searches to leisurely groomer comparisons — and build content and pages that convert at each stage.' },
  { title: 'Seasonal Campaign Strategy', desc: 'Pet care demand is highly seasonal. We plan boarding campaigns for summer, grooming campaigns for spring, and health content for winter — ensuring you rank at the peak of each demand cycle.' },
  { title: 'Multi-Service Keyword Coverage', desc: 'Whether you offer vet services, grooming, boarding, daycare, or pet supplies, we build a separate keyword strategy for each service — maximising your total search visibility.' },
  { title: 'Community-Focused Link Building', desc: 'We earn links and mentions from local pet communities, rescue groups, dog parks, and lifestyle publications — building the local authority signals that lift all your pet service rankings.' },
  { title: 'Transparent Reporting', desc: 'Monthly reports in plain language — appointment enquiries from organic, GBP call volume, keyword positions for all target terms, and seasonal campaign performance.' },
  { title: 'No Lock-in Contracts', desc: 'Month-to-month engagements only. You continue because your appointment book is fuller — not because a contract requires it.' },
];

const FAQS = [
  { q: 'How long does vet SEO take to show results?', a: 'Google Business Profile optimisation for veterinary practices typically produces measurable additional calls and appointment requests within 3 to 6 weeks. Organic website rankings for terms like "vet near me [city]" typically take 3 to 6 months for meaningful movement, depending on local competition. Emergency vet keywords in major metro markets may take 6 to 9 months to reach top-3 positions.' },
  { q: 'Do you work with mobile pet groomers?', a: 'Yes. Mobile groomers have a different local SEO profile from fixed-location salons — service area targeting becomes more important than a single location. We build service-area landing pages for every suburb or postcode you operate in, and configure your GBP with a service area rather than a physical address. This ensures you rank for "mobile dog groomer [suburb]" searches across your full coverage zone.' },
  { q: 'How do you target emergency vet searches?', a: 'Emergency vet searches have extreme urgency — pet owners are panicking and click the first result they trust. We build dedicated emergency pages targeting "emergency vet near me", "24-hour vet [city]", and "emergency animal hospital [suburb]", optimised for both organic rankings and GBP map pack visibility. Fast loading speed and clear phone number prominence on these pages is critical for conversion.' },
  { q: 'Can you run seasonal SEO campaigns for pet boarding?', a: 'Yes — seasonal planning is a core part of our pet care SEO strategy. For boarding businesses, we build content and GBP campaign momentum in the weeks leading up to peak periods: spring school holidays, summer vacation season, and Christmas/New Year holiday periods. This ensures you rank at the top when pet owners are actively searching for boarding options — not after the season has already started.' },
  { q: 'What directories matter most for pet care businesses?', a: 'The most impactful directories for pet businesses are Google Business Profile (essential for map pack), Yelp, BringFido (for dog-friendly and pet service businesses), VetFinder (for veterinary practices), Angi pet services category, and local community directories. For veterinary practices, listing on pet insurance provider directories is also valuable for attracting insured pet owners.' },
  { q: 'Can you do SEO for a multi-service pet business (vet + grooming + boarding)?', a: 'Yes — multi-service pet businesses represent an excellent SEO opportunity because each service targets a distinct keyword set with different search intent. We build separate keyword strategies and landing pages for each service, so your vet services rank for vet-intent searches and your grooming competes on groomer searches independently. This multi-track approach maximises total search visibility across your entire service menu.' },
  { q: 'Which review platforms matter for pet businesses?', a: 'Google Business Profile reviews are the most important for map pack rankings and local trust. Yelp is particularly valuable in the US market for grooming salons and boarding facilities. BringFido reviews matter for boarding and daycare businesses targeting travelling pet owners. For veterinary practices, Healthgrades and VetRatingz are relevant. We build review velocity across all platforms relevant to your specific pet services.' },
];

export default function PetcareSeoServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Pet Care SEO Services', item: 'https://www.1solutions.biz/petcare-seo-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'Pet Care SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Pet care SEO for veterinarians, groomers, boarding facilities, and pet daycares. Rank for vet near me, pet grooming, dog boarding, and emergency vet keywords.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'Pet Care Business Search Engine Optimisation',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '78', bestRating: '5' },
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
        <title>Pet Care SEO Services | Veterinarian, Grooming and Boarding SEO | 1Solutions</title>
        <meta name="description" content="Grow your pet care business with 1Solutions SEO. Rank for vet near me, dog grooming, pet boarding, cat clinic, and emergency vet keywords in your local area." />
        <link rel="canonical" href="https://www.1solutions.biz/petcare-seo-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          * { box-sizing: border-box; }
          .ptseo-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(26,69,0,0.10) 0%,rgba(255,255,255,0.72) 50%,rgba(26,69,0,0.06) 100%); }
          .ptseo-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(26,69,0,0.13) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .ptseo-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(60,150,0,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .ptseo-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; }
          .ptseo-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(26,69,0,0.10);border:1px solid rgba(26,69,0,0.22);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#1a4500;margin-bottom:24px; }
          .ptseo-h1 { font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#1a4500 0%,#2d7500 50%,#1a4500 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .ptseo-desc { font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px; }
          .ptseo-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .ptseo-btn-p { display:inline-flex;align-items:center;gap:8px;background:#1a4500;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(26,69,0,0.28); }
          .ptseo-btn-p:hover { background:#2d7500;transform:translateY(-2px); }
          .ptseo-btn-s { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#1a4500;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(26,69,0,0.20);transition:all 0.25s;backdrop-filter:blur(8px); }
          .ptseo-btn-s:hover { background:#fff;transform:translateY(-2px); }
          .ptseo-trust { display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px; }
          .ptseo-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .ptseo-stats-bar { display:flex;border:1px solid rgba(26,69,0,0.12);border-radius:16px;background:rgba(255,255,255,0.75);backdrop-filter:blur(12px);overflow:hidden;max-width:720px; }
          .ptseo-stat-item { flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(26,69,0,0.08); }
          .ptseo-stat-item:last-child { border-right:none; }
          .ptseo-stat-num { font-size:1.5rem;font-weight:900;color:#1a4500;line-height:1;letter-spacing:-1px; }
          .ptseo-stat-lbl { font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px; }
          .ptseo-bc { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .ptseo-bc-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .ptseo-bc a { color:#6b7280;text-decoration:none; }
          .ptseo-bc a:hover { color:#1a4500; }
          .ptseo-bc-sep { color:#d1d5db; }
          .ptseo-bc-cur { color:#1a4500;font-weight:500; }
          .ptseo-sec { padding:80px 40px; }
          .ptseo-sec-inner { max-width:1200px;margin:0 auto; }
          .ptseo-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#1a4500;margin-bottom:12px; }
          .ptseo-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .ptseo-h2 span { background:linear-gradient(90deg,#1a4500,#2d7500);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .ptseo-lead { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .ptseo-bg { background:#f2f8f0; }
          .ptseo-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .ptseo-card { background:linear-gradient(135deg,rgba(26,69,0,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(26,69,0,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(26,69,0,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .ptseo-card:hover { transform:translateY(-6px);border-color:rgba(26,69,0,0.22);box-shadow:0 16px 48px rgba(26,69,0,0.12); }
          .ptseo-icon { width:48px;height:48px;border-radius:14px;background:rgba(26,69,0,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px; }
          .ptseo-icon svg { width:22px;height:22px;color:#1a4500; }
          .ptseo-card-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .ptseo-card-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .ptseo-results { background:linear-gradient(135deg,#0a1f00 0%,#1a4500 100%);padding:64px 40px; }
          .ptseo-results-inner { max-width:1200px;margin:0 auto; }
          .ptseo-res-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(150,240,120,0.85);margin-bottom:12px;text-align:center; }
          .ptseo-res-h { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .ptseo-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .ptseo-res-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center; }
          .ptseo-res-metric { font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px; }
          .ptseo-res-label { font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px; }
          .ptseo-res-sub { font-size:12.5px;color:rgba(255,255,255,0.50); }
          .ptseo-why-card { background:linear-gradient(135deg,rgba(26,69,0,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(26,69,0,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(26,69,0,0.07); }
          .ptseo-why-check { width:36px;height:36px;border-radius:10px;background:rgba(26,69,0,0.09);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .ptseo-why-check svg { width:18px;height:18px;color:#1a4500; }
          .ptseo-why-h { font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px; }
          .ptseo-why-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .ptseo-proc-num { font-size:3.5rem;font-weight:900;color:rgba(26,69,0,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .ptseo-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#1a4500,rgba(26,69,0,0.2));border-radius:2px;margin-bottom:16px; }
          .ptseo-proc-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .ptseo-proc-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .ptseo-faq-list { display:flex;flex-direction:column;gap:10px; }
          .ptseo-faq-item { background:linear-gradient(135deg,rgba(26,69,0,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(26,69,0,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(26,69,0,0.06); }
          .ptseo-faq-item.open { border-color:rgba(26,69,0,0.28); }
          .ptseo-faq-btn { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .ptseo-faq-qt { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .ptseo-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(26,69,0,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .ptseo-faq-item.open .ptseo-faq-icon { background:rgba(26,69,0,0.14);transform:rotate(45deg); }
          .ptseo-faq-icon svg { width:14px;height:14px;color:#1a4500; }
          .ptseo-faq-a { padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.75; }
          .ptseo-cta { background:linear-gradient(135deg,rgba(26,69,0,0.10) 0%,rgba(255,255,255,0.65) 40%,rgba(26,69,0,0.08) 100%);padding:90px 40px;text-align:center;position:relative;overflow:hidden; }
          .ptseo-cta-h { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#0a1f00 0%,#1a4500 50%,#2d7500 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .ptseo-cta-p { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) { .ptseo-grid3,.ptseo-res-grid { grid-template-columns:1fr 1fr; } }
          @media (max-width:600px) {
            .ptseo-hero,.ptseo-sec,.ptseo-results,.ptseo-cta { padding-left:20px;padding-right:20px; }
            .ptseo-hero { padding-top:60px;padding-bottom:50px; }
            .ptseo-grid3,.ptseo-res-grid { grid-template-columns:1fr; }
            .ptseo-bc { padding:12px 20px; }
          }
        `}</style>
      </Head>

      <nav className="ptseo-bc" aria-label="Breadcrumb">
        <div className="ptseo-bc-inner">
          <Link href="/">Home</Link>
          <span className="ptseo-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="ptseo-bc-sep">›</span>
          <span className="ptseo-bc-cur">Pet Care SEO Services</span>
        </div>
      </nav>

      <section className="ptseo-hero">
        <div className="ptseo-orb1" /><div className="ptseo-orb2" />
        <div className="ptseo-inner">
          <span className="ptseo-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
            Pet Care SEO — Vet · Grooming · Boarding · Daycare
          </span>
          <h1 className="ptseo-h1">Pet Care SEO That Brings More<br/>Loyal Pet Owners to Your Door</h1>
          <p className="ptseo-desc">1Solutions builds pet care SEO strategies that put your vet clinic, grooming salon, or boarding facility in front of pet owners exactly when they need you — from urgent emergency vet searches to summer boarding bookings. Local SEO, GBP dominance, and seasonal campaigns built for the pet industry.</p>
          <div className="ptseo-btns">
            <a href="#contact" className="ptseo-btn-p">
              Get Your Free Pet Care SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="ptseo-btn-s">View SEO Packages</Link>
          </div>
          <div className="ptseo-trust">
            {['Pet Industry SEO Expertise','Seasonal Campaign Strategy','Multi-Service Coverage','No Lock-in Contracts'].map(t => (
              <span key={t} className="ptseo-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a4500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="ptseo-stats-bar">
            {[
              { num:'$150B+', lbl:'Pet industry revenue in the US (2024)' },
              { num:'82%', lbl:'of pet owners search online for vet services' },
              { num:'74%', lbl:'increase in emergency vet searches since 2020' },
              { num:'28%', lbl:'growth in pet boarding searches each summer' },
            ].map(s => (
              <div key={s.lbl} className="ptseo-stat-item">
                <span className="ptseo-stat-num">{s.num}</span>
                <span className="ptseo-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ptseo-sec ptseo-bg" id="services">
        <div className="ptseo-sec-inner">
          <span className="ptseo-tag">What We Do</span>
          <h2 className="ptseo-h2">Full-Spectrum <span>Pet Care SEO Services</span></h2>
          <p className="ptseo-lead">From veterinary keyword strategy to seasonal boarding campaigns — every component your pet care business needs to dominate local search.</p>
          <div className="ptseo-grid3">
            {SERVICES.map(s => (
              <div key={s.title} className="ptseo-card">
                <div className="ptseo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="ptseo-card-h">{s.title}</h3>
                <p className="ptseo-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ptseo-results">
        <div className="ptseo-results-inner">
          <span className="ptseo-res-tag">Client Results</span>
          <h2 className="ptseo-res-h">Pet Care SEO Results That Grow Loyal Client Bases</h2>
          <div className="ptseo-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="ptseo-res-card">
                <div className="ptseo-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="ptseo-res-label">{r.label}</div>
                <div className="ptseo-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ptseo-sec" id="why-us">
        <div className="ptseo-sec-inner">
          <span className="ptseo-tag">Why 1Solutions</span>
          <h2 className="ptseo-h2">The Pet Care SEO Agency <span>That Understands Pet Owners</span></h2>
          <p className="ptseo-lead">We build pet care SEO strategies rooted in genuine industry knowledge — understanding how pet owners search, decide, and become loyal long-term clients.</p>
          <div className="ptseo-grid3">
            {WHY.map(w => (
              <div key={w.title} className="ptseo-why-card">
                <div className="ptseo-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="ptseo-why-h">{w.title}</h3>
                <p className="ptseo-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ptseo-sec ptseo-bg" id="process">
        <div className="ptseo-sec-inner">
          <span className="ptseo-tag">How We Work</span>
          <h2 className="ptseo-h2">Our <span>6-Step Pet Care SEO Process</span></h2>
          <p className="ptseo-lead">From audit to ongoing appointment growth — a structured process built for pet care businesses with seasonal demand patterns.</p>
          <div className="ptseo-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="ptseo-proc-num">{p.n}</div>
                <div className="ptseo-proc-line" />
                <h3 className="ptseo-proc-h">{p.title}</h3>
                <p className="ptseo-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ptseo-sec" id="faq">
        <div className="ptseo-sec-inner">
          <span className="ptseo-tag">Got Questions?</span>
          <h2 className="ptseo-h2">Pet Care SEO <span>FAQs</span></h2>
          <div className="ptseo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'ptseo-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="ptseo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="ptseo-faq-qt">{f.q}</span>
                  <span className="ptseo-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq === i && <div className="ptseo-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ptseo-cta" id="contact">
        <div className="ptseo-sec-inner">
          <span className="ptseo-tag" style={{ display:'block', textAlign:'center', marginBottom:12 }}>Ready to Attract More Pet Owners?</span>
          <h2 className="ptseo-cta-h">Get Your Free Pet Care SEO Audit</h2>
          <p className="ptseo-cta-p">We will audit your GBP, website, citations, and competitor landscape — and deliver a prioritised action plan for growing your appointments and bookings from local search. Free, no obligation.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact-us" className="ptseo-btn-p">
              Request Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages/" className="ptseo-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
