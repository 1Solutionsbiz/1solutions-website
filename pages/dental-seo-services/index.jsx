import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Dentist Keyword Strategy', desc: 'Comprehensive keyword mapping across general dentistry, cosmetic dentistry, dental implants, Invisalign, emergency dental, teeth whitening, orthodontist, and periodontics — targeting every treatment a patient searches for at every stage of their decision journey.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Google Business Profile for Dental Practices', desc: 'Full GBP setup and ongoing management with dental-specific categories, service attributes, patient photo strategy, appointment booking link integration, before/after gallery, and review management to dominate the dental map pack.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Treatment-Specific Landing Pages', desc: 'Dedicated, fully optimised pages for implants, veneers, crowns, root canal treatment, teeth whitening, Invisalign, traditional braces, wisdom tooth removal, and emergency dentistry — each page targeting its own high-intent keyword cluster.' },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: 'Patient Review Generation', desc: 'HIPAA-compliant review acquisition workflows delivered via SMS and email after appointments, active Google and Healthgrades review building, and professional negative review response strategy — building the social proof that fills appointment books.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Local Citation Management', desc: 'Dental practice listings across Healthgrades, Zocdoc, Yelp, WebMD Dentist Finder, 1-800-Dentist, RateMDs, Vitals, and dental professional directories — consistent NAP data that anchors your local and map pack rankings.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Dental Content Marketing', desc: 'Educational blog content targeting patient research queries — "how much do dental implants cost", "Invisalign vs traditional braces", "what to expect from a root canal", "signs you need a crown" — ranking for the queries patients ask before booking.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Dental Schema Markup', desc: 'Dentist LocalBusiness schema type, services offered, accepted insurance providers, payment options, and patient aggregate review schema — giving Google the structured data signals needed for rich results and local Knowledge Panel enhancement.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Monthly Dental SEO Reporting', desc: 'New patient attribution by channel, keyword ranking movement for all treatment terms, GBP call tracking, appointment-to-click conversion data, and a 90-day forward action plan — complete monthly visibility into what your SEO investment is generating.' },
];

const RESULTS = [
  { metric: '#1', label: 'For dental implants [city]', sub: 'Multi-chair practice, US — 5 months', color: '#60CFFF' },
  { metric: '5.2×', label: 'Increase in new patient enquiries', sub: 'Cosmetic dental practice — 6 months', color: '#80FFD0' },
  { metric: '390%', label: 'Organic traffic growth', sub: 'Dental group — 10 months', color: '#FFD080' },
];

const PROCESS = [
  { n: '01', title: 'Dental Practice Audit', desc: 'Full audit of your website, GBP, citation profile, treatment page content, and competitor keyword landscape — identifying every gap between your current position and the top map pack slots.' },
  { n: '02', title: 'Patient Keyword Mapping', desc: 'We map search demand to every treatment you offer — separating emergency dental intent from cosmetic enquiry intent — and build a keyword architecture that covers your entire service menu.' },
  { n: '03', title: 'GBP + Treatment Pages', desc: 'Google Business Profile optimised with dental categories and booking links. Dedicated treatment landing pages written by dental-industry copywriters, targeting high-value implant, cosmetic, and orthodontic keywords.' },
  { n: '04', title: 'Citation + Directory Setup', desc: 'Practice listed and verified across Healthgrades, Zocdoc, WebMD, Vitals, 1-800-Dentist, and all major dental directories with consistent NAP data and optimised profile descriptions.' },
  { n: '05', title: 'Review Acquisition', desc: 'HIPAA-compliant post-appointment review request sequences go live via SMS and email — building Google and Healthgrades reviews rapidly to reach the 50+ review benchmark that drives map pack prominence.' },
  { n: '06', title: 'Monthly Reporting', desc: 'New patient lead attribution, keyword position movement, GBP call volume, and a rolling 90-day action plan — every month, in plain language, showing exactly what your SEO is delivering.' },
];

const WHY = [
  { title: 'Dental Industry Specialists', desc: 'We understand treatment-level search behaviour, patient research journeys, and the competitive dynamics of dental markets — from single-chair practices to multi-site dental groups.' },
  { title: 'HIPAA-Aware Marketing', desc: 'Our review acquisition workflows and content strategies are designed with patient privacy compliance in mind — so your marketing never creates regulatory exposure for your practice.' },
  { title: 'Treatment-Level Keyword Coverage', desc: 'Every treatment you offer — from routine cleaning to full-arch implants — gets its own keyword-optimised page. This maximises your visibility across the full spectrum of patient searches.' },
  { title: 'Patient Review Expertise', desc: 'We build review velocity across Google, Healthgrades, and Zocdoc with compliant post-appointment workflows — reaching the review counts that make the map pack selection straightforward.' },
  { title: 'No Lock-in Contracts', desc: 'Month-to-month engagements only. Your practice continues because new patient bookings are growing — not because a long-term contract requires it.' },
  { title: 'New Patient Attribution Reporting', desc: 'We track every new patient enquiry back to its SEO source — keyword, page, and channel — so you can see exactly which treatment keywords and which pages are filling your appointment book.' },
];

const FAQS = [
  { q: 'How long does dental SEO take to generate new patients?', a: 'Google Business Profile optimisation typically produces measurable call and enquiry increases within 3 to 6 weeks. Treatment-specific landing pages usually rank within 2 to 4 months for moderate-competition terms. For high-competition keywords like "dental implants [major city]", top-3 positions typically take 6 to 12 months of consistent optimisation and content authority building.' },
  { q: 'Which review platforms matter most for dental practices?', a: 'Google Business Profile is the most important by far — GBP reviews directly influence map pack rankings and patient click-through rates. Healthgrades and Zocdoc are essential for patient discovery within healthcare-specific platforms. Yelp matters in certain markets, particularly the US West Coast. We build review velocity across all relevant platforms for your location.' },
  { q: 'Do you create separate pages for every dental treatment?', a: 'Yes. Each major treatment — implants, veneers, crowns, root canal, teeth whitening, Invisalign, braces, emergency dentistry — gets its own dedicated landing page. Each page is optimised for its own keyword cluster and structured to convert research-phase visitors into appointment enquiries.' },
  { q: 'Can you target insurance-related dental keywords?', a: 'Yes. Keywords like "dentist that accepts [insurance plan]", "bulk billing dentist [city]", and "[insurance] dental provider" are valuable intent signals. We include insurance keywords in our strategy where they represent significant search volume in your market, and we ensure your website and GBP profile clearly communicate the insurance plans you accept.' },
  { q: 'Do you work with multi-location dental groups?', a: 'Yes. Multi-location dental groups require a different strategy — individual location pages for each practice, centralised GBP management across all profiles, and a coordinated review strategy. We have experience managing SEO across dental groups ranging from 2 to 20+ locations, maintaining consistent brand authority while capturing hyper-local rankings for each site.' },
  { q: 'How competitive is dental SEO in major cities?', a: 'Dental SEO in major metro markets is highly competitive, with large DSOs (Dental Service Organisations) and private equity-backed group practices investing heavily. However, independent practices with strong GBP profiles, high review counts, and treatment-specific content consistently outperform larger competitors in the map pack. Local authority and review velocity are the differentiators.' },
  { q: 'How do you measure dental SEO ROI?', a: 'We track new patient enquiries from organic search (form submissions and call tracking), GBP call volume, keyword ranking positions for all treatment terms, and map pack positions. For practices using practice management software like Dentrix or Eaglesoft, we can help correlate organic leads to booked appointments — giving you a true cost-per-new-patient from your SEO investment.' },
];

export default function DentalSeoServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Dental SEO Services', item: 'https://www.1solutions.biz/dental-seo-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'Dental SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Dental SEO services for dental practices. Rank for dentist near me, dental implants, cosmetic dentistry, and emergency dental keywords to attract new patients.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'Dental Practice Search Engine Optimisation',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '102', bestRating: '5' },
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
        <title>Dental SEO Services | Rank #1 for Dentist Near Me Searches | 1Solutions</title>
        <meta name="description" content="Get more dental patients with 1Solutions dental SEO. Rank for dentist near me, cosmetic dentistry, dental implants, orthodontist, and emergency dental keywords." />
        <link rel="canonical" href="https://www.1solutions.biz/dental-seo-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          * { box-sizing: border-box; }
          .dnseo-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(0,85,102,0.10) 0%,rgba(255,255,255,0.72) 50%,rgba(0,85,102,0.06) 100%); }
          .dnseo-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,85,102,0.13) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .dnseo-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(0,150,180,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .dnseo-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; }
          .dnseo-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(0,85,102,0.10);border:1px solid rgba(0,85,102,0.22);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#005566;margin-bottom:24px; }
          .dnseo-h1 { font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#005566 0%,#007a8c 50%,#005566 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .dnseo-desc { font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px; }
          .dnseo-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .dnseo-btn-p { display:inline-flex;align-items:center;gap:8px;background:#005566;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(0,85,102,0.28); }
          .dnseo-btn-p:hover { background:#007a8c;transform:translateY(-2px); }
          .dnseo-btn-s { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#005566;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(0,85,102,0.20);transition:all 0.25s;backdrop-filter:blur(8px); }
          .dnseo-btn-s:hover { background:#fff;transform:translateY(-2px); }
          .dnseo-trust { display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px; }
          .dnseo-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .dnseo-stats-bar { display:flex;border:1px solid rgba(0,85,102,0.12);border-radius:16px;background:rgba(255,255,255,0.75);backdrop-filter:blur(12px);overflow:hidden;max-width:720px; }
          .dnseo-stat-item { flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(0,85,102,0.08); }
          .dnseo-stat-item:last-child { border-right:none; }
          .dnseo-stat-num { font-size:1.6rem;font-weight:900;color:#005566;line-height:1;letter-spacing:-1px; }
          .dnseo-stat-lbl { font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px; }
          .dnseo-bc { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .dnseo-bc-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .dnseo-bc a { color:#6b7280;text-decoration:none; }
          .dnseo-bc a:hover { color:#005566; }
          .dnseo-bc-sep { color:#d1d5db; }
          .dnseo-bc-cur { color:#005566;font-weight:500; }
          .dnseo-sec { padding:80px 40px; }
          .dnseo-sec-inner { max-width:1200px;margin:0 auto; }
          .dnseo-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#005566;margin-bottom:12px; }
          .dnseo-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .dnseo-h2 span { background:linear-gradient(90deg,#005566,#007a8c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .dnseo-lead { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .dnseo-bg { background:#f0f8fa; }
          .dnseo-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .dnseo-card { background:linear-gradient(135deg,rgba(0,85,102,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(0,85,102,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(0,85,102,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .dnseo-card:hover { transform:translateY(-6px);border-color:rgba(0,85,102,0.22);box-shadow:0 16px 48px rgba(0,85,102,0.12); }
          .dnseo-icon { width:48px;height:48px;border-radius:14px;background:rgba(0,85,102,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px; }
          .dnseo-icon svg { width:22px;height:22px;color:#005566; }
          .dnseo-card-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .dnseo-card-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .dnseo-results { background:linear-gradient(135deg,#002430 0%,#005566 100%);padding:64px 40px; }
          .dnseo-results-inner { max-width:1200px;margin:0 auto; }
          .dnseo-res-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(100,220,240,0.85);margin-bottom:12px;text-align:center; }
          .dnseo-res-h { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .dnseo-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .dnseo-res-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center; }
          .dnseo-res-metric { font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px; }
          .dnseo-res-label { font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px; }
          .dnseo-res-sub { font-size:12.5px;color:rgba(255,255,255,0.50); }
          .dnseo-why-card { background:linear-gradient(135deg,rgba(0,85,102,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(0,85,102,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(0,85,102,0.07); }
          .dnseo-why-check { width:36px;height:36px;border-radius:10px;background:rgba(0,85,102,0.09);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .dnseo-why-check svg { width:18px;height:18px;color:#005566; }
          .dnseo-why-h { font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px; }
          .dnseo-why-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .dnseo-proc-num { font-size:3.5rem;font-weight:900;color:rgba(0,85,102,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .dnseo-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#005566,rgba(0,85,102,0.2));border-radius:2px;margin-bottom:16px; }
          .dnseo-proc-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .dnseo-proc-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .dnseo-faq-list { display:flex;flex-direction:column;gap:10px; }
          .dnseo-faq-item { background:linear-gradient(135deg,rgba(0,85,102,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(0,85,102,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,85,102,0.06); }
          .dnseo-faq-item.open { border-color:rgba(0,85,102,0.28); }
          .dnseo-faq-btn { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .dnseo-faq-qt { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .dnseo-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(0,85,102,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .dnseo-faq-item.open .dnseo-faq-icon { background:rgba(0,85,102,0.14);transform:rotate(45deg); }
          .dnseo-faq-icon svg { width:14px;height:14px;color:#005566; }
          .dnseo-faq-a { padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.75; }
          .dnseo-cta { background:linear-gradient(135deg,rgba(0,85,102,0.10) 0%,rgba(255,255,255,0.65) 40%,rgba(0,85,102,0.08) 100%);padding:90px 40px;text-align:center;position:relative;overflow:hidden; }
          .dnseo-cta-h { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#002430 0%,#005566 50%,#007a8c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .dnseo-cta-p { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) { .dnseo-grid3,.dnseo-res-grid { grid-template-columns:1fr 1fr; } }
          @media (max-width:600px) {
            .dnseo-hero,.dnseo-sec,.dnseo-results,.dnseo-cta { padding-left:20px;padding-right:20px; }
            .dnseo-hero { padding-top:60px;padding-bottom:50px; }
            .dnseo-grid3,.dnseo-res-grid { grid-template-columns:1fr; }
            .dnseo-bc { padding:12px 20px; }
          }
        `}</style>
      </Head>

      <nav className="dnseo-bc" aria-label="Breadcrumb">
        <div className="dnseo-bc-inner">
          <Link href="/">Home</Link>
          <span className="dnseo-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="dnseo-bc-sep">›</span>
          <span className="dnseo-bc-cur">Dental SEO Services</span>
        </div>
      </nav>

      <section className="dnseo-hero">
        <div className="dnseo-orb1" /><div className="dnseo-orb2" />
        <div className="dnseo-inner">
          <span className="dnseo-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
            Dental SEO — General · Cosmetic · Implants · Orthodontics
          </span>
          <h1 className="dnseo-h1">Dental SEO Services That Fill<br/>Your Patient Appointment Book</h1>
          <p className="dnseo-desc">1Solutions builds dental SEO strategies that attract high-value patients searching for implants, cosmetic dentistry, Invisalign, and emergency dental care. Treatment-specific pages, GBP dominance, and compliant review systems — engineered to grow new patient numbers month after month.</p>
          <div className="dnseo-btns">
            <a href="#contact" className="dnseo-btn-p">
              Get Your Free Dental SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="dnseo-btn-s">View SEO Packages</Link>
          </div>
          <div className="dnseo-trust">
            {['Dental Industry Specialists','HIPAA-Aware Marketing','Treatment-Level Coverage','New Patient Attribution'].map(t => (
              <span key={t} className="dnseo-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#005566" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="dnseo-stats-bar">
            {[
              { num:'77%', lbl:'of patients search online before booking a dentist' },
              { num:'$3,000+', lbl:'avg cosmetic dental case value' },
              { num:'65%', lbl:'click GBP listings for dentist searches' },
              { num:'4.9×', lbl:'avg ROI for dental SEO' },
            ].map(s => (
              <div key={s.lbl} className="dnseo-stat-item">
                <span className="dnseo-stat-num">{s.num}</span>
                <span className="dnseo-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dnseo-sec dnseo-bg" id="services">
        <div className="dnseo-sec-inner">
          <span className="dnseo-tag">What We Do</span>
          <h2 className="dnseo-h2">Full-Spectrum <span>Dental SEO Services</span></h2>
          <p className="dnseo-lead">From treatment landing pages to compliant review systems — every component your dental practice needs to dominate local and map pack rankings.</p>
          <div className="dnseo-grid3">
            {SERVICES.map(s => (
              <div key={s.title} className="dnseo-card">
                <div className="dnseo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="dnseo-card-h">{s.title}</h3>
                <p className="dnseo-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dnseo-results">
        <div className="dnseo-results-inner">
          <span className="dnseo-res-tag">Client Results</span>
          <h2 className="dnseo-res-h">Dental SEO Results That Grow New Patient Numbers</h2>
          <div className="dnseo-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="dnseo-res-card">
                <div className="dnseo-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="dnseo-res-label">{r.label}</div>
                <div className="dnseo-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dnseo-sec" id="why-us">
        <div className="dnseo-sec-inner">
          <span className="dnseo-tag">Why 1Solutions</span>
          <h2 className="dnseo-h2">The Dental SEO Agency <span>That Fills Appointment Books</span></h2>
          <p className="dnseo-lead">We combine deep dental industry knowledge with local SEO expertise — building strategies that attract the high-value patients your practice wants most.</p>
          <div className="dnseo-grid3">
            {WHY.map(w => (
              <div key={w.title} className="dnseo-why-card">
                <div className="dnseo-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="dnseo-why-h">{w.title}</h3>
                <p className="dnseo-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dnseo-sec dnseo-bg" id="process">
        <div className="dnseo-sec-inner">
          <span className="dnseo-tag">How We Work</span>
          <h2 className="dnseo-h2">Our <span>6-Step Dental SEO Process</span></h2>
          <p className="dnseo-lead">From practice audit to ongoing new patient growth — a structured dental SEO programme built for long-term results.</p>
          <div className="dnseo-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="dnseo-proc-num">{p.n}</div>
                <div className="dnseo-proc-line" />
                <h3 className="dnseo-proc-h">{p.title}</h3>
                <p className="dnseo-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dnseo-sec" id="faq">
        <div className="dnseo-sec-inner">
          <span className="dnseo-tag">Got Questions?</span>
          <h2 className="dnseo-h2">Dental SEO <span>FAQs</span></h2>
          <div className="dnseo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'dnseo-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="dnseo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="dnseo-faq-qt">{f.q}</span>
                  <span className="dnseo-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq === i && <div className="dnseo-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dnseo-cta" id="contact">
        <div className="dnseo-sec-inner">
          <span className="dnseo-tag" style={{ display:'block', textAlign:'center', marginBottom:12 }}>Ready to Attract More New Patients?</span>
          <h2 className="dnseo-cta-h">Get Your Free Dental Practice SEO Audit</h2>
          <p className="dnseo-cta-p">We will audit your GBP, treatment pages, citation profile, and competitor landscape — and deliver a prioritised action plan for growing new patient bookings from organic search. Free, no obligation.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="dnseo-btn-p">
              Request Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages/" className="dnseo-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
