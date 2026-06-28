import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const TAG_COLORS = [
  { bg: '#FFF3E0', color: '#C05600', border: '#FDE68A' },
  { bg: '#EDE9FE', color: '#6D28D9', border: '#DDD6FE' },
  { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
  { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  { bg: '#FDF2F8', color: '#BE185D', border: '#FBCFE8' },
  { bg: '#F0FDFA', color: '#0F766E', border: '#99F6E4' },
];

const CASE_STUDIES = [
  {
    num: '01',
    title: 'Comtradesol Advisory Services',
    subtitle: 'Financial Advisory — Gurgaon, India',
    desc: 'Built a professional corporate website on custom WordPress for a financial advisory firm specialising in Trade Financing, Debt Advisory, Equity Advisory, and Credit Rating. We also managed their LinkedIn company profile to grow brand authority and reach.',
    tags: ['WordPress Development', 'UI/UX Design', 'LinkedIn Marketing'],
    image: '/images/portfolio/comtradesol-showcase.jpg',
    url: '/case-studies/comtradesol',
    internal: true,
  },
  {
    num: '02',
    title: 'Ramnath Goenka Excellence in Journalism Awards',
    subtitle: 'Media & Journalism — Indian Express Group',
    desc: 'Delivered a fully custom-built awards portal for India\'s most prestigious journalism honours. Includes a bespoke CRM in Laravel to manage nominations, jury evaluations, and winner announcements across 14 award categories — with EY as knowledge partner.',
    tags: ['Custom Development', 'Laravel CRM', 'Portal Design'],
    image: '/images/portfolio/rngfoundation.webp',
    url: 'https://rngfoundation.com/awards/',
  },
];

const CATEGORIES = ['All', 'Web Development', 'eCommerce', 'Digital Marketing', 'Mobile App', 'UI/UX Design'];

const PROJECTS = [
  { id: 'aiplusstore', title: 'AI+ Store — Shopify eCommerce', category: 'eCommerce', industry: 'Consumer Electronics', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Full-featured Shopify store for AI+ SmartPhones — a consumer electronics brand selling Nova series 5G smartphones, NovaPods, and NovaWatches across India.', image: '/images/portfolio/aiplusstore.jpg', url: 'https://aiplusstore.com/', featured: true },
  { id: 'keiyura', title: 'Keiyura — Artisanal Jewellery', category: 'eCommerce', industry: 'Fashion & Jewellery', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Elegant Shopify store for a handcrafted jewellery brand — featuring lookbooks, curated collections, and a storytelling-led shopping experience.', image: '/images/portfolio/keiyura.jpg', url: 'https://keiyura.com/' },
  { id: 'shopsamsin', title: 'Samsin — Streetwear Brand', category: 'eCommerce', industry: 'Fashion & Apparel', tech: ['Shopify', 'Liquid', 'Email Marketing'], desc: 'Minimalist Shopify store for a streetwear label selling tops, bottoms, and headwear — with VIP subscriber access and flash-sale promotions.', image: '/images/portfolio/shopsamsin.jpg', url: 'https://shopsamsin.com/' },
  { id: '305aero', title: '305 Aero Supplies', category: 'eCommerce', industry: 'Electronics & IT', tech: ['Shopify', 'Liquid', 'eCommerce'], desc: 'Complete IT solutions store offering hardware and software products — a one-stop electronics shop serving clients with end-to-end technology needs.', image: '/images/portfolio/305aerosupplies.jpg', url: 'https://305aerosupplies.com/' },
  { id: 'yaahdy', title: 'Yaahdy Store', category: 'eCommerce', industry: 'Lifestyle & Gifts', tech: ['Shopify', 'Liquid', 'Conversion Optimisation'], desc: 'Vibrant Shopify eCommerce store with a focus on lifestyle products — optimised for fast load times and high-converting product pages.', image: '/images/portfolio/yaahdy.jpg', url: 'https://yaahdy.com/' },
  { id: 'foreverring', title: 'Forever Ring — Fine Jewellery', category: 'eCommerce', industry: 'Fashion & Jewellery', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Sophisticated Shopify store for a Canadian fine jewellery brand — clean product presentation, trust-building pages, and a seamless checkout flow.', image: '/images/portfolio/foreverring.jpg', url: 'https://www.foreverring.ca/' },
  { id: 'parfumfrance', title: 'Parfum France — Luxury Fragrance', category: 'eCommerce', industry: 'Beauty & Fragrance', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Premium Shopify fragrance boutique bringing French parfumerie to a global audience — immersive design with rich product storytelling.', image: '/images/portfolio/parfumfrance.jpg', url: 'https://parfumfrance.com/' },
  { id: 'asiandispatch', title: 'Asian Dispatch — News Network', category: 'Web Development', industry: 'Media & Journalism', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Digital news network for investigative journalism across 13 Asian countries — covering AI & Tech, Climate, Health, Politics, and Human Rights with a 21-member contributor network.', image: '/images/portfolio/asiandispatch.webp', url: 'https://www.asiandispatch.net' },
  { id: 'vns', title: 'VNS Group of Institutions', category: 'Web Development', industry: 'Education', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Comprehensive website for a multi-faculty institution in Bhopal — covering Engineering, Pharmacy, Management, Nursing, and Education across a 50+ acre campus established in 1994.', image: '/images/portfolio/vns.webp', url: 'https://vns.ac.in/' },
  { id: 'rngfoundation', title: 'RNG Foundation — Journalism Awards', category: 'Web Development', industry: 'Media & Journalism', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Award portal for India's most prestigious journalism honours — the Ramnath Goenka Excellence in Journalism Awards, administered by the Indian Express Group across 14 categories.", image: '/images/portfolio/rngfoundation.webp', url: 'https://rngfoundation.com/awards/' },
  { id: 'copalcollective', title: 'Copal Collective — Handmade Throws', category: 'eCommerce', industry: 'Home & Lifestyle', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Artisan Shopify store for handmade throws and textiles — a curated collection of handcrafted home décor pieces with a focus on craftsmanship and natural materials.', image: '/images/portfolio/copalcollective.webp' },
  { id: 'explorehonor', title: 'Explore HONOR — Smartphone Store', category: 'eCommerce', industry: 'Consumer Electronics', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Official Shopify eCommerce store for HONOR India — showcasing the full lineup of smartphones, accessories, audio and wearables, and laptops, with no-cost EMI options.', image: '/images/portfolio/explorehonor.webp' },
  { id: 'creativeinterior', title: 'Creative Interior & Decor', category: 'Web Development', industry: 'Interior Design', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Business website for a Delhi-based interior design firm — featuring 3D visualisations, transparent pricing, and a 100% satisfaction guarantee.', image: '/images/portfolio/creativeinterior.jpeg' },
  { id: 'expetize', title: 'Expetize — Email Verification Tool', category: 'Web Development', industry: 'SaaS & MarTech', tech: ['Custom Build', 'UI/UX Design'], desc: 'Bulk email verification platform with 10+ validation layers — detecting disposable addresses, catch-all domains, and blacklisted emails. Used by teams at Salesforce, HubSpot, and Apollo.', image: '/images/portfolio/expetize.png' },
  { id: 'astropraveen', title: 'AstroPraveen — Astrology Services', category: 'Web Development', industry: 'Wellness & Spirituality', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Personal brand website for Dr. Praveen Chauhan — an Asia Book of Records holder offering horoscope reading, corporate astrology, palmistry, and film astrology.', image: '/images/portfolio/astropraveen.png' },
  { id: 'defencenewsupdates', title: 'Defence News Updates — News Portal', category: 'Web Development', industry: 'Defence & Media', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Indian defence and security news portal with dedicated coverage of Army, Navy, Air Force, DRDO programmes, and global military developments.', image: '/images/portfolio/defencenewsupdates.png' },
  { id: 'empor', title: 'Empor Marcom — B2B Marketing', category: 'Web Development', industry: 'B2B Marketing', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Agency website for Empor Marcom, a pan-India B2B marketing firm — delivering lead generation, telemarketing, virtual events, and content syndication for enterprise clients.', image: '/images/portfolio/empor.png' },
  { id: 'novanttum', title: 'Novanttum — Alternative Investments', category: 'Web Development', industry: 'Alternative Investments', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Investment platform website for Novanttum Alternatives — a SEBI-registered AIF offering private credit, equity, and structured finance to high-potential businesses.', image: '/images/portfolio/novanttum.png' },
  { id: 'truckinsurancefl', title: 'TruckInsuranceFL — Commercial Insurance', category: 'Web Development', industry: 'Insurance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Florida's trusted commercial truck insurance specialists — serving owner-operators and fleets with same-day coverage, instant quotes, and FMCSA-compliant policies.", image: '/images/portfolio/truckinsurancefl.png' },
  { id: 'aiinnovationsummit', title: 'AI Innovation Summit 2026', category: 'Web Development', industry: 'Technology & Events', tech: ['Next.js', 'UI/UX Design'], desc: 'Event website for the AI Innovation Summit 2026 — a forward-looking technology conference bringing together industry leaders, researchers, and innovators.', image: '/images/portfolio/aiinnovationsummit.png' },
  { id: 'febestbanksawards', title: 'FE Best Banks Awards', category: 'Web Development', industry: 'Banking & Finance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Award portal for the Financial Express Best Banks Awards — India's highest honour in banking excellence, with EY as knowledge partner.", image: '/images/portfolio/febestbanksawards.png' },
  { id: 'intellismart', title: 'IntelliSmart Infra — Smart Infrastructure', category: 'Web Development', industry: 'Infrastructure', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Corporate website for IntelliSmart Infrastructure — a sustainability-focused company delivering smart infrastructure solutions across India.', image: '/images/portfolio/intellismart.png' },
  { id: 'runaya', title: 'Runaya — Sustainable Manufacturing', category: 'Web Development', industry: 'Manufacturing', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Website for Runaya, India's first zero-waste, zero-discharge aluminium processing facility — recovering 16,000 MT of green aluminium annually.", image: '/images/portfolio/runaya.png' },
  { id: 'freyrenergy', title: 'Freyr Energy — Rooftop Solar', category: 'Web Development', industry: 'Renewable Energy', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Solar solutions website for Freyr Energy — an MNRE-empanelled rooftop solar installer serving 18,000+ customers across India since 2014.', image: '/images/portfolio/freyrenergy.png' },
  { id: 'xcelaccounting', title: 'Xcel Accounting — Financial Services', category: 'Web Development', industry: 'Accounting & Finance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Professional services website for Xcel Accounting, Dubai — a Xero Gold Partner offering fractional CFO, outsourced accounting, and VAT services across the UAE.', image: '/images/portfolio/xcelaccounting.png' },
  { id: 'youngmonk', title: 'Young Monk — PR & Communications', category: 'Web Development', industry: 'Public Relations', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Agency website for Young Monk, a New Delhi-based PR and communications firm specialising in Sports, Entertainment, and Change Agents.', image: '/images/portfolio/youngmonk.png' },
  { id: 'greycellpr', title: 'Grey Cell PR — Ideas Consultancy', category: 'Web Development', industry: 'Public Relations', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Corporate website for Grey Cell PR, a Delhi-based branding and communications consultancy delivering strategic media relations and corporate brand management.', image: '/images/portfolio/greycellpr.png' },
  { id: 'zincfootball', title: 'Zinc Football — Youth Development', category: 'Web Development', industry: 'Sports & Education', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "India's first technology-driven grassroots football initiative — backed by Hindustan Zinc, training 350+ children across Rajasthan through a residential academy.", image: '/images/portfolio/zincfootball.png' },
  { id: 'playaorthodontics', title: 'Playa Orthodontics — Dental Clinic', category: 'Web Development', industry: 'Healthcare', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Orthodontic clinic website for a Los Angeles practice with two locations — showcasing Invisalign, braces, and treatments for all ages with online consultation booking.', image: '/images/portfolio/playaorthodontics.png' },
  { id: 'adiuvo', title: 'Adiuvo Trustees — Corporate Services', category: 'Web Development', industry: 'Corporate Services', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Boutique fiduciary services website for Adiuvo Trustees, Cyprus — offering company formation, trust structures, and immigration services to 700+ international clients.', image: '/images/portfolio/adiuvo.png' },
  { id: 'phdcci', title: 'PHDCCI — Chamber of Commerce', category: 'Web Development', industry: 'Trade & Industry', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Website for PHD Chamber of Commerce and Industry — India's apex industry body with 121+ years of legacy, driving trade promotion and policy advocacy.", image: '/images/portfolio/phdcci.png' },
  { id: 'defenceaviationpost', title: 'Defence Aviation Post — News Portal', category: 'Web Development', industry: 'Defence & Media', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Defence and military news portal covering Indian Armed Forces, aerospace, missile systems, and global security developments.", image: '/images/portfolio/defenceaviationpost.png' },
  { id: 'throneportapotties', title: 'Throne Porta Potties — Sanitation Rentals', category: 'Web Development', industry: 'Sanitation & Events', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Service website for a porta potty rental company — showcasing sanitation solutions for construction sites, events, and outdoor projects.', image: '/images/portfolio/throneportapotties.png' },
  { id: 'recreator', title: 'Recreator — Hemp Clothing Store', category: 'eCommerce', industry: 'Sustainable Fashion', tech: ['WooCommerce', 'WordPress', 'UI/UX Design'], desc: "Eco-conscious WooCommerce store for a US hemp clothing brand — selling men's and women's sustainable apparel and accessories.", image: '/images/portfolio/recreator.png' },
  { id: 'skinlasercentre', title: 'Skin Laser Centre — Dermatology Clinic', category: 'Web Development', industry: 'Healthcare', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Clinical website for Dr. Paul's Skin Laser Centre, Delhi — a 23-year-old dermatology practice specialising in vitiligo, acne, hair transplants, and laser treatments.", image: '/images/portfolio/skinlasercentre.png', url: 'https://skinlasercentre.com/' },
  { id: 'smefutures', title: 'SME Futures — Business Media Platform', category: 'Web Development', industry: 'Business & Finance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Editorial and resource platform for small and medium enterprises — covering business news, growth strategies, funding, and industry insights.', image: '/images/portfolio/smefutures.png', url: 'https://smefutures.com/' },
  { id: 'mountsystems', title: 'Mount Systems — IT & Security Solutions', category: 'Web Development', industry: 'IT & Security', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Corporate website for Mount Systems — a complete IT and security solutions provider offering end-to-end technology services to businesses.', image: '/images/portfolio/mountsystems.png', url: 'https://www.mount-systems.com.ki/' },
  { id: 'charlespuma', title: 'Charles Puma — Fine Art Gallery', category: 'Web Development', industry: 'Art & Culture', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Contemporary pop art gallery website with presence across Toronto, Miami, Berlin, and Florence — showcasing original artworks and limited edition prints.', image: '/images/portfolio/charlespuma.webp', url: 'https://www.charlespuma.com/' },
  { id: 'comtradesol', title: 'Comtradesol — Financial Advisory', category: 'Web Development', industry: 'Financial Services', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Corporate website for Comtradesol Advisory Services — a Gurgaon-based firm offering trade finance, debt syndication, equity advisory, and credit rating solutions.', image: '/images/portfolio/comtradesol.webp', url: '/case-studies/comtradesol', internal: true },
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      <Head>
        <title>Case Studies | 1Solutions – Real Results for Real Businesses</title>
        <meta name="description" content="Explore how 1Solutions has helped brands across US, Canada & Australia evolve through web development and digital marketing." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/case-studies" />
        <style>{`
          /* ── Hero ── */
          .cs-hero {
            background: linear-gradient(135deg, rgba(254,243,199,0.55) 0%, rgba(219,234,254,0.35) 100%);
            position: relative; overflow: hidden;
            padding: 100px 0 80px; min-height: 400px; display: flex; align-items: center;
          }
          .cs-hero-orb1 { position: absolute; top: -80px; right: -80px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(254,151,0,0.13) 0%, transparent 70%); pointer-events: none; }
          .cs-hero-orb2 { position: absolute; bottom: -60px; left: -60px; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%); pointer-events: none; }
          .cs-hero-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 1; }
          .cs-eyebrow { color: #D97706; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 20px; }
          .cs-hero-title { font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 800; line-height: 1.2; max-width: 720px; margin-bottom: 24px; background: linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .cs-hero-sub { color: #4b5563; font-size: 1.05rem; max-width: 540px; margin-bottom: 40px; line-height: 1.75; }
          .cs-hero-cta { display: inline-flex; align-items: center; gap: 14px; background: rgba(15,52,96,0.07); backdrop-filter: blur(12px); border: 1.5px solid rgba(15,52,96,0.18); border-radius: 50px; padding: 12px 24px 12px 14px; color: #0F3460; text-decoration: none; font-size: 0.95rem; font-weight: 600; }
          .cs-hero-avatars { display: flex; align-items: center; }
          .cs-avatar { width: 32px; height: 32px; border-radius: 50%; border: 2.5px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 800; color: #fff; flex-shrink: 0; }

          /* ── Featured Case Studies ── */
          .cs-list { background: #fff; padding: 0 0 80px; }
          .cs-section-label { max-width: 1200px; margin: 0 auto; padding: 60px 40px 0; }
          .cs-section-label h2 { font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 800; color: #0A1628; }
          .cs-section-label p { font-size: 15px; color: #6b7280; margin-top: 8px; }
          .cs-row { max-width: 1200px; margin: 0 auto; padding: 60px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; border-bottom: 1px solid #f3f4f6; }
          .cs-row:last-child { border-bottom: none; }
          .cs-text { display: flex; flex-direction: column; }
          .cs-num { font-size: 6rem; font-weight: 900; line-height: 1; color: #f3f4f6; letter-spacing: -0.03em; margin-bottom: -16px; user-select: none; }
          .cs-title { font-size: clamp(1.5rem, 2.2vw, 2rem); font-weight: 800; color: #0A1628; line-height: 1.25; margin-bottom: 8px; }
          .cs-subtitle { font-size: 0.82rem; font-weight: 600; color: #FE9700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 20px; }
          .cs-desc { font-size: 0.97rem; color: #4b5563; line-height: 1.8; margin-bottom: 28px; }
          .cs-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
          .cs-tag { font-size: 0.8rem; font-weight: 600; border-radius: 20px; padding: 4px 12px; border-width: 1px; border-style: solid; }
          .cs-link { display: inline-flex; align-items: center; gap: 8px; color: #0F3460; text-decoration: none; font-size: 0.9rem; font-weight: 700; border-bottom: 1.5px solid #0F3460; padding-bottom: 2px; width: fit-content; transition: color 0.2s, border-color 0.2s; }
          .cs-link:hover { color: #FE9700; border-color: #FE9700; }
          .cs-image-wrap { border-radius: 16px; overflow: hidden; box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06); }
          .cs-image-wrap img { width: 100%; height: auto; display: block; aspect-ratio: 16/9; object-fit: cover; }
          .cs-row.reverse .cs-text { order: 2; }
          .cs-row.reverse .cs-image-wrap { order: 1; }

          /* ── All Projects grid ── */
          .cs-projects-section { background: #f8fafc; padding: 72px 0 80px; border-top: 1px solid #f0f1f3; }
          .cs-projects-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
          .cs-projects-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 36px; flex-wrap: wrap; }
          .cs-projects-header h2 { font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 800; color: #0A1628; margin: 0; }
          .cs-projects-header p { font-size: 14px; color: #6b7280; margin: 6px 0 0; }
          .cs-filter-row { display: flex; gap: 8px; flex-wrap: wrap; }
          .cs-filter-btn { padding: 7px 16px; border-radius: 50px; font-size: 13px; font-weight: 600; border: 1.5px solid #e5e7eb; background: #fff; color: #6b7280; cursor: pointer; transition: all 0.18s; white-space: nowrap; }
          .cs-filter-btn:hover { border-color: #0F3460; color: #0F3460; }
          .cs-filter-btn.active { background: #0F3460; color: #fff; border-color: #0F3460; }
          .cs-proj-count { font-size: 13px; color: #9ca3af; margin-bottom: 24px; }
          .cs-proj-count strong { color: #374151; }
          .cs-proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .cs-proj-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #e5e7eb; transition: box-shadow 0.22s, transform 0.22s; display: flex; flex-direction: column; }
          .cs-proj-card:hover { box-shadow: 0 10px 36px rgba(15,52,96,0.11), 0 0 0 2px rgba(254,151,0,0.18); transform: translateY(-3px); }
          .cs-proj-thumb { position: relative; aspect-ratio: 16/9; overflow: hidden; background: #f3f4f6; }
          .cs-proj-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
          .cs-proj-card:hover .cs-proj-thumb img { transform: scale(1.04); }
          .cs-proj-cat-badge { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.38); backdrop-filter: blur(6px); color: #fff; font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 100px; }
          .cs-proj-featured-badge { position: absolute; top: 10px; left: 10px; background: rgba(254,151,0,0.85); color: #fff; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 100px; letter-spacing: 0.04em; }
          .cs-proj-body { padding: 18px 20px 20px; flex: 1; display: flex; flex-direction: column; }
          .cs-proj-industry { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 6px; }
          .cs-proj-title { font-size: 15px; font-weight: 700; color: #0F1F40; line-height: 1.3; margin-bottom: 8px; }
          .cs-proj-desc { font-size: 13px; color: #4b5563; line-height: 1.6; margin-bottom: 14px; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
          .cs-proj-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; }
          .cs-proj-tag { font-size: 11px; font-weight: 600; border-radius: 100px; padding: 3px 9px; border-width: 1px; border-style: solid; }
          .cs-proj-link { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #0F3460; text-decoration: none; margin-top: auto; padding-top: 4px; transition: color 0.18s; }
          .cs-proj-link:hover { color: #FE9700; }

          /* ── CTA section ── */
          .cs-cta { background: linear-gradient(135deg, rgba(254,243,199,0.70) 0%, rgba(255,255,255,0.60) 40%, rgba(219,234,254,0.65) 100%); padding: 90px 40px; position: relative; overflow: hidden; }
          .cs-cta-orb1 { position: absolute; top: -80px; right: -80px; width: 320px; height: 320px; border-radius: 50%; background: radial-gradient(circle, rgba(254,151,0,0.12) 0%, transparent 70%); pointer-events: none; }
          .cs-cta-orb2 { position: absolute; bottom: -60px; left: -60px; width: 240px; height: 240px; border-radius: 50%; background: radial-gradient(circle, rgba(15,52,96,0.07) 0%, transparent 70%); pointer-events: none; }
          .cs-cta-inner { max-width: 820px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
          .cs-cta-eyebrow { color: #FE9700; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 16px; }
          .cs-cta-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 800; background: linear-gradient(90deg, #0F3460 0%, #F59E0B 50%, #7C3AED 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 18px; line-height: 1.25; }
          .cs-cta-sub { color: #4b5563; font-size: 1.05rem; line-height: 1.75; margin: 0 auto 36px; max-width: 520px; }
          .cs-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
          .cs-btn-primary { background: #0F3460; color: #fff; padding: 14px 32px; border-radius: 50px; font-weight: 700; text-decoration: none; font-size: 0.97rem; display: inline-flex; align-items: center; gap: 8px; }
          .cs-btn-secondary { background: rgba(15,52,96,0.07); color: #0F3460; padding: 14px 32px; border-radius: 50px; font-weight: 700; text-decoration: none; font-size: 0.97rem; border: 1.5px solid rgba(15,52,96,0.18); display: inline-flex; align-items: center; gap: 8px; }

          /* ── Responsive ── */
          @media (max-width: 1024px) { .cs-proj-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 900px) {
            .cs-row { grid-template-columns: 1fr; gap: 40px; padding: 56px 24px; }
            .cs-row.reverse .cs-text { order: 0; }
            .cs-row.reverse .cs-image-wrap { order: 0; }
            .cs-hero-inner { padding: 0 24px; }
            .cs-num { font-size: 4rem; }
            .cs-projects-inner { padding: 0 24px; }
            .cs-section-label { padding: 48px 24px 0; }
          }
          @media (max-width: 600px) {
            .cs-proj-grid { grid-template-columns: 1fr; }
            .cs-projects-section { padding: 48px 0 60px; }
            .cs-cta { padding: 60px 20px; }
          }
        `}</style>
      </Head>

      {/* ── HERO ── */}
      <section className="cs-hero">
        <div className="cs-hero-orb1" />
        <div className="cs-hero-orb2" />
        <div className="cs-hero-inner">
          <p className="cs-eyebrow">Our Work</p>
          <h1 className="cs-hero-title">
            See how we&rsquo;ve helped brands evolve and thrive in this ever-changing world
          </h1>
          <p className="cs-hero-sub">
            15+ years of delivering measurable results for clients across US, Canada, Australia and beyond.
          </p>
          <a href="/contact-us" className="cs-hero-cta">
            <span className="cs-hero-avatars">
              {[
                { initials: 'AT', bg: '#FE9700' },
                { initials: 'RK', bg: '#0F3460' },
                { initials: 'PS', bg: '#7C3AED' },
                { initials: 'MJ', bg: '#10B981' },
              ].map((av, i) => (
                <span key={i} className="cs-avatar" style={{ background: av.bg, marginLeft: i === 0 ? 0 : -10 }}>{av.initials}</span>
              ))}
            </span>
            Connect with Experts
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* ── FEATURED CASE STUDIES ── */}
      <div className="cs-list">
        <div className="cs-section-label">
          <h2>Featured Case Studies</h2>
          <p>In-depth looks at how we approached and solved complex client challenges.</p>
        </div>
        {CASE_STUDIES.map((cs, i) => (
          <div key={cs.num} className={`cs-row${i % 2 === 1 ? ' reverse' : ''}`}>
            <div className="cs-text">
              <div className="cs-num">{cs.num}</div>
              <h2 className="cs-title">{cs.title}</h2>
              <p className="cs-subtitle">{cs.subtitle}</p>
              <p className="cs-desc">{cs.desc}</p>
              <div className="cs-tags">
                {cs.tags.map((tag, ti) => {
                  const c = TAG_COLORS[ti % TAG_COLORS.length];
                  return <span key={tag} className="cs-tag" style={{ background: c.bg, color: c.color, borderColor: c.border }}>{tag}</span>;
                })}
              </div>
              {cs.url && (
                cs.internal ? (
                  <Link href={cs.url} className="cs-link">
                    Read Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                ) : (
                  <a href={cs.url} target="_blank" rel="noopener noreferrer" className="cs-link">
                    View Project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                )
              )}
            </div>
            <div className="cs-image-wrap">
              <img src={cs.image} alt={`${cs.title} — case study`} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          </div>
        ))}
      </div>

      {/* ── ALL PROJECTS GRID ── */}
      <div className="cs-projects-section">
        <div className="cs-projects-inner">
          <div className="cs-projects-header">
            <div>
              <h2>All Projects</h2>
              <p>A selection of work delivered across web development, eCommerce, and digital marketing.</p>
            </div>
            <div className="cs-filter-row">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`cs-filter-btn${activeFilter === cat ? ' active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p className="cs-proj-count">
            Showing <strong>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
            {activeFilter !== 'All' ? ` in ${activeFilter}` : ''}
          </p>

          <div className="cs-proj-grid">
            {filtered.map((p, i) => (
              <div key={p.id} className="cs-proj-card">
                <div className="cs-proj-thumb">
                  <img src={p.image} alt={p.title} loading={i < 6 ? 'eager' : 'lazy'} />
                  {p.featured && <span className="cs-proj-featured-badge">Featured</span>}
                  <span className="cs-proj-cat-badge">{p.category}</span>
                </div>
                <div className="cs-proj-body">
                  <div className="cs-proj-industry">{p.industry}</div>
                  <h3 className="cs-proj-title">{p.title}</h3>
                  <p className="cs-proj-desc">{p.desc}</p>
                  <div className="cs-proj-tags">
                    {p.tech.map((t, ti) => {
                      const c = TAG_COLORS[ti % TAG_COLORS.length];
                      return <span key={t} className="cs-proj-tag" style={{ background: c.bg, color: c.color, borderColor: c.border }}>{t}</span>;
                    })}
                  </div>
                  {p.url && (
                    p.internal ? (
                      <Link href={p.url} className="cs-proj-link">
                        Read Case Study
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    ) : (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="cs-proj-link">
                        View Live Site
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                      </a>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="cs-cta">
        <div className="cs-cta-orb1" />
        <div className="cs-cta-orb2" />
        <div className="cs-cta-inner">
          <p className="cs-cta-eyebrow">Start Your Project</p>
          <h2 className="cs-cta-title">Ready to Build Your Success Story?</h2>
          <p className="cs-cta-sub">
            Let&rsquo;s discuss your project and craft a strategy that delivers real, measurable results for your business.
          </p>
          <div className="cs-cta-btns">
            <Link href="/contact-us" className="cs-btn-primary">
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/portfolio" className="cs-btn-secondary">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
