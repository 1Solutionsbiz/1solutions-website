import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const CATEGORIES = ['All', 'Web Development', 'eCommerce', 'Digital Marketing', 'Mobile App', 'UI/UX Design'];

const PROJECTS = [
  { id: 'comtradesol',        title: 'Comtradesol Advisory Services', category: 'Web Development',  industry: 'Financial Services',      tech: ['WordPress Development', 'UI/UX Design', 'LinkedIn Marketing'],   desc: 'Built a professional corporate website for a financial advisory firm specialising in Trade Financing, Debt Advisory, and Credit Rating — then grew their reach with a targeted LinkedIn brand programme.',                     image: '/images/portfolio/comtradesol-showcase.jpg', url: '/case-studies/comtradesol', internal: true  },
  { id: 'rngfoundation',      title: 'RNG Foundation Awards',          category: 'Web Development',  industry: 'Media & Journalism',      tech: ['Custom Development', 'Laravel CRM', 'Portal Design'],             desc: "Custom awards portal and Laravel CRM for India's most prestigious journalism honours — 14 award categories, Indian Express Group, EY as knowledge partner.",                                                                  image: '/images/portfolio/rngfoundation.webp',       url: 'https://rngfoundation.com/awards/',              dual: true },
  { id: 'aiplusstore',        title: 'AI+ Store',                      category: 'eCommerce',        industry: 'Consumer Electronics',    tech: ['Shopify', 'Liquid', 'UI/UX Design'],                              desc: 'Full-featured Shopify store for AI+ SmartPhones — Nova series 5G smartphones, NovaPods, and NovaWatches across India.',                                                                                                    image: '/images/portfolio/aiplusstore.jpg',           url: 'https://aiplusstore.com/'                        },
  { id: 'keiyura',            title: 'Keiyura',                        category: 'eCommerce',        industry: 'Fashion & Jewellery',     tech: ['Shopify', 'Liquid', 'UI/UX Design'],                              desc: 'Elegant Shopify store for a handcrafted jewellery brand featuring lookbooks, curated collections, and a storytelling-led shopping experience.',                                                                             image: '/images/portfolio/keiyura.jpg',               url: 'https://keiyura.com/',                           dual: true },
  { id: 'asiandispatch',      title: 'Asian Dispatch',                 category: 'Web Development',  industry: 'Media & Journalism',      tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Digital news network for investigative journalism across 13 Asian countries — AI & Tech, Climate, Health, Politics, and Human Rights.',                                                                                     image: '/images/portfolio/asiandispatch.webp',        url: 'https://www.asiandispatch.net'                   },
  { id: 'vns',                title: 'VNS Group of Institutions',      category: 'Web Development',  industry: 'Education',               tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Multi-faculty institution website in Bhopal covering Engineering, Pharmacy, Management, Nursing, and Education across a 50+ acre campus.',                                                                                  image: '/images/portfolio/vns.webp',                  url: 'https://vns.ac.in/',                             dual: true },
  { id: 'shopsamsin',         title: 'Samsin',                         category: 'eCommerce',        industry: 'Fashion & Apparel',       tech: ['Shopify', 'Liquid', 'Email Marketing'],                           desc: 'Minimalist Shopify store for a streetwear label selling tops, bottoms, and headwear — with VIP subscriber access and flash-sale promotions.',                                                                               image: '/images/portfolio/shopsamsin.jpg',            url: 'https://shopsamsin.com/'                         },
  { id: 'foreverring',        title: 'Forever Ring',                   category: 'eCommerce',        industry: 'Fashion & Jewellery',     tech: ['Shopify', 'Liquid', 'UI/UX Design'],                              desc: 'Sophisticated Shopify store for a Canadian fine jewellery brand — clean product presentation, trust-building pages, and a seamless checkout flow.',                                                                          image: '/images/portfolio/foreverring.jpg',           url: 'https://www.foreverring.ca/',                    dual: true },
  { id: 'parfumfrance',       title: 'Parfum France',                  category: 'eCommerce',        industry: 'Beauty & Fragrance',      tech: ['Shopify', 'Liquid', 'UI/UX Design'],                              desc: 'Premium Shopify fragrance boutique bringing French parfumerie to a global audience with immersive design and rich product storytelling.',                                                                                    image: '/images/portfolio/parfumfrance.jpg',          url: 'https://parfumfrance.com/'                       },
  { id: '305aero',            title: '305 Aero Supplies',              category: 'eCommerce',        industry: 'Electronics & IT',        tech: ['Shopify', 'Liquid', 'eCommerce'],                                 desc: 'Complete IT solutions store offering hardware and software products — a one-stop electronics shop for end-to-end technology needs.',                                                                                          image: '/images/portfolio/305aerosupplies.jpg',       url: 'https://305aerosupplies.com/',                   dual: true },
  { id: 'yaahdy',             title: 'Yaahdy Store',                   category: 'eCommerce',        industry: 'Lifestyle & Gifts',       tech: ['Shopify', 'Liquid', 'Conversion Optimisation'],                   desc: 'Vibrant Shopify eCommerce store optimised for fast load times and high-converting product pages.',                                                                                                                          image: '/images/portfolio/yaahdy.jpg',                url: 'https://yaahdy.com/'                             },
  { id: 'copalcollective',    title: 'Copal Collective',               category: 'eCommerce',        industry: 'Home & Lifestyle',        tech: ['Shopify', 'Liquid', 'UI/UX Design'],                              desc: 'Artisan Shopify store for handmade throws and textiles with a focus on craftsmanship and natural materials.',                                                                                                               image: '/images/portfolio/copalcollective.webp',                                                                 dual: true },
  { id: 'explorehonor',       title: 'Explore HONOR',                  category: 'eCommerce',        industry: 'Consumer Electronics',    tech: ['Shopify', 'Liquid', 'UI/UX Design'],                              desc: 'Official Shopify store for HONOR India — smartphones, accessories, audio, wearables, and laptops with no-cost EMI.',                                                                                                        image: '/images/portfolio/explorehonor.webp'                                                                     },
  { id: 'recreator',          title: 'Recreator',                      category: 'eCommerce',        industry: 'Sustainable Fashion',     tech: ['WooCommerce', 'WordPress', 'UI/UX Design'],                       desc: "Eco-conscious WooCommerce store for a US hemp clothing brand — men's and women's sustainable apparel and accessories.",                                                                                                     image: '/images/portfolio/recreator.png'                                                                         },
  { id: 'expetize',           title: 'Expetize',                       category: 'Web Development',  industry: 'SaaS & MarTech',          tech: ['Custom Build', 'UI/UX Design'],                                   desc: 'Bulk email verification platform with 10+ validation layers — detecting disposable addresses and blacklisted emails. Used by teams at Salesforce, HubSpot, and Apollo.',                                                    image: '/images/portfolio/expetize.png'                                                                          },
  { id: 'novanttum',          title: 'Novanttum',                      category: 'Web Development',  industry: 'Alternative Investments', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'SEBI-registered AIF platform offering private credit, equity, and structured finance to high-potential businesses.',                                                                                                        image: '/images/portfolio/novanttum.png'                                                                         },
  { id: 'febestbanksawards',  title: 'FE Best Banks Awards',           category: 'Web Development',  industry: 'Banking & Finance',       tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: "Award portal for the Financial Express Best Banks Awards — India's highest honour in banking excellence, with EY as knowledge partner.",                                                                                    image: '/images/portfolio/febestbanksawards.png'                                                                 },
  { id: 'intellismart',       title: 'IntelliSmart Infra',             category: 'Web Development',  industry: 'Infrastructure',          tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Smart infrastructure corporate website for a sustainability-focused company delivering solutions across India.',                                                                                                            image: '/images/portfolio/intellismart.png'                                                                      },
  { id: 'runaya',             title: 'Runaya',                         category: 'Web Development',  industry: 'Manufacturing',           tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: "India's first zero-waste, zero-discharge aluminium processing facility — recovering 16,000 MT of green aluminium annually.",                                                                                                image: '/images/portfolio/runaya.png'                                                                            },
  { id: 'freyrenergy',        title: 'Freyr Energy',                   category: 'Web Development',  industry: 'Renewable Energy',        tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Rooftop solar solutions for an MNRE-empanelled installer serving 18,000+ customers across India since 2014.',                                                                                                               image: '/images/portfolio/freyrenergy.png'                                                                       },
  { id: 'xcelaccounting',     title: 'Xcel Accounting',                category: 'Web Development',  industry: 'Accounting & Finance',    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Xero Gold Partner website in Dubai — fractional CFO, outsourced accounting, and VAT services across the UAE.',                                                                                                             image: '/images/portfolio/xcelaccounting.png'                                                                    },
  { id: 'phdcci',             title: 'PHDCCI',                         category: 'Web Development',  industry: 'Trade & Industry',        tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: "India's apex industry body with 121+ years of legacy in trade promotion, policy advocacy, and economic development.",                                                                                                       image: '/images/portfolio/phdcci.png'                                                                            },
  { id: 'aiinnovationsummit', title: 'AI Innovation Summit 2026',      category: 'Web Development',  industry: 'Technology & Events',     tech: ['Next.js', 'UI/UX Design'],                                        desc: 'Event website for a technology conference bringing together industry leaders, researchers, and innovators to shape the future.',                                                                                             image: '/images/portfolio/aiinnovationsummit.png'                                                                },
  { id: 'zincfootball',       title: 'Zinc Football',                  category: 'Web Development',  industry: 'Sports & Education',      tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: "India's first technology-driven grassroots football initiative backed by Hindustan Zinc, training 350+ children across Rajasthan.",                                                                                          image: '/images/portfolio/zincfootball.png'                                                                      },
  { id: 'youngmonk',          title: 'Young Monk',                     category: 'Web Development',  industry: 'Public Relations',        tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'PR and communications agency website specialising in Sports, Entertainment, and Change Agents.',                                                                                                                          image: '/images/portfolio/youngmonk.png'                                                                         },
  { id: 'greycellpr',         title: 'Grey Cell PR',                   category: 'Web Development',  industry: 'Public Relations',        tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Branding and communications consultancy delivering strategic media relations and corporate brand management.',                                                                                                             image: '/images/portfolio/greycellpr.png'                                                                        },
  { id: 'empor',              title: 'Empor Marcom',                   category: 'Web Development',  industry: 'B2B Marketing',           tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Pan-India B2B marketing firm delivering lead generation, telemarketing, virtual events, and content syndication for enterprise clients.',                                                                                   image: '/images/portfolio/empor.png'                                                                             },
  { id: 'truckinsurancefl',   title: 'TruckInsuranceFL',               category: 'Web Development',  industry: 'Insurance',               tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: "Florida's commercial truck insurance specialists — same-day coverage, instant quotes, and FMCSA-compliant policies.",                                                                                                        image: '/images/portfolio/truckinsurancefl.png'                                                                  },
  { id: 'astropraveen',       title: 'AstroPraveen',                   category: 'Web Development',  industry: 'Wellness & Spirituality', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Personal brand website for an Asia Book of Records holder offering horoscope reading, corporate astrology, and palmistry.',                                                                                                 image: '/images/portfolio/astropraveen.png'                                                                      },
  { id: 'defencenewsupdates', title: 'Defence News Updates',           category: 'Web Development',  industry: 'Defence & Media',         tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Indian defence and security news portal covering Army, Navy, Air Force, DRDO programmes, and global military developments.',                                                                                                image: '/images/portfolio/defencenewsupdates.png'                                                                },
  { id: 'defenceaviationpost',title: 'Defence Aviation Post',          category: 'Web Development',  industry: 'Defence & Media',         tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Defence and military news portal covering Indian Armed Forces, aerospace, missile systems, and global security developments.',                                                                                               image: '/images/portfolio/defenceaviationpost.png'                                                               },
  { id: 'playaorthodontics',  title: 'Playa Orthodontics',             category: 'Web Development',  industry: 'Healthcare',              tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Los Angeles orthodontic clinic — Invisalign, braces, and treatments for all ages with online consultation booking.',                                                                                                         image: '/images/portfolio/playaorthodontics.png'                                                                 },
  { id: 'skinlasercentre',    title: 'Skin Laser Centre',              category: 'Web Development',  industry: 'Healthcare',              tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: "23-year-old Delhi dermatology practice — vitiligo, acne, hair transplants, and laser treatments.",                                                                                                                          image: '/images/portfolio/skinlasercentre.png',       url: 'https://skinlasercentre.com/'                    },
  { id: 'adiuvo',             title: 'Adiuvo Trustees',                category: 'Web Development',  industry: 'Corporate Services',      tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Fiduciary services website in Cyprus — company formation, trust structures, and immigration for 700+ international clients.',                                                                                                image: '/images/portfolio/adiuvo.png'                                                                            },
  { id: 'smefutures',         title: 'SME Futures',                    category: 'Web Development',  industry: 'Business & Finance',      tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Editorial platform for SMEs covering business news, growth strategies, funding, and industry insights.',                                                                                                                    image: '/images/portfolio/smefutures.png',            url: 'https://smefutures.com/'                         },
  { id: 'mountsystems',       title: 'Mount Systems',                  category: 'Web Development',  industry: 'IT & Security',           tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'End-to-end IT and security solutions provider corporate website.',                                                                                                                                                           image: '/images/portfolio/mountsystems.png',          url: 'https://www.mount-systems.com.ki/'               },
  { id: 'charlespuma',        title: 'Charles Puma',                   category: 'Web Development',  industry: 'Art & Culture',           tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Contemporary pop art gallery across Toronto, Miami, Berlin, and Florence — showcasing original artworks and limited edition prints.',                                                                                        image: '/images/portfolio/charlespuma.webp',          url: 'https://www.charlespuma.com/'                    },
  { id: 'creativeinterior',   title: 'Creative Interior & Decor',      category: 'Web Development',  industry: 'Interior Design',         tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Interior design firm website featuring 3D visualisations, transparent pricing, and a 100% satisfaction guarantee.',                                                                                                         image: '/images/portfolio/creativeinterior.jpeg'                                                                 },
  { id: 'throneportapotties',  title: 'Throne Porta Potties',          category: 'Web Development',  industry: 'Sanitation & Events',     tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],                      desc: 'Porta potty rental website showcasing sanitation solutions for construction sites, events, and outdoor projects.',                                                                                                          image: '/images/portfolio/throneportapotties.png'                                                                },
];

const MOBILE_APPS = [
  { id: 'ma1', num: '01', title: 'Booking & Scheduling App',  tags: ['Web App', 'Mobile App'], image: '/images/portfolio/zincfootball.png'      },
  { id: 'ma2', num: '02', title: 'Healthcare Patient Portal', tags: ['Web App', 'Mobile App'], image: '/images/portfolio/playaorthodontics.png' },
  { id: 'ma3', num: '03', title: 'Smart Commerce Platform',   tags: ['Mobile App'],            image: '/images/portfolio/aiplusstore.jpg'        },
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      <Head>
        <title>Case Studies | 1Solutions – Real Results for Real Businesses</title>
        <meta name="description" content="Explore how 1Solutions has helped brands across US, Canada & Australia evolve through web development and digital marketing." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/case-studies" />
        <style>{`

/* ── HERO (original, untouched) ── */
.cs-hero{background:linear-gradient(135deg,rgba(254,243,199,.55) 0%,rgba(219,234,254,.35) 100%);position:relative;overflow:hidden;padding:100px 0 80px;min-height:400px;display:flex;align-items:center;}
.cs-hero-orb1{position:absolute;top:-80px;right:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,.13) 0%,transparent 70%);pointer-events:none;}
.cs-hero-orb2{position:absolute;bottom:-60px;left:-60px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.08) 0%,transparent 70%);pointer-events:none;}
.cs-hero-inner{max-width:1200px;margin:0 auto;padding:0 48px;position:relative;z-index:1;}
.cs-eyebrow{color:#D97706;font-size:.82rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:20px;}
.cs-hero-title{font-size:clamp(2rem,4vw,3.25rem);font-weight:800;line-height:1.2;max-width:720px;margin-bottom:24px;background:linear-gradient(90deg,#0F3460 0%,#F59E0B 45%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.cs-hero-sub{color:#4b5563;font-size:1.05rem;max-width:540px;margin-bottom:40px;line-height:1.75;}
.cs-hero-cta{display:inline-flex;align-items:center;gap:14px;background:rgba(15,52,96,.07);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,.18);border-radius:50px;padding:12px 24px 12px 14px;color:#0F3460;text-decoration:none;font-size:.95rem;font-weight:600;}
.cs-hero-avatars{display:flex;align-items:center;}
.cs-avatar{width:32px;height:32px;border-radius:50%;border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:800;color:#fff;flex-shrink:0;}

/* ── CASE STUDIES LIST ── */
.cs-body {
  background: #fff;
}
.cs-body-inner {
  max-width: 1280px; margin: 0 auto; padding: 0 64px;
}

/* Filter tabs */
.cs-filter-bar {
  display: flex;
  border-bottom: 1px solid #E5E5E5;
  padding-top: 56px;
  overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
}
.cs-filter-bar::-webkit-scrollbar { display: none; }
.cs-filter-btn {
  padding: 14px 24px;
  font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
  color: #999; background: none; border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer; white-space: nowrap; margin-bottom: -1px;
  transition: color .18s, border-color .18s;
}
.cs-filter-btn:hover { color: #111; }
.cs-filter-btn.active { color: #111; border-bottom-color: #111; }

/* Each numbered entry */
.cs-entry {
  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: start;
  padding: 72px 0;
  border-bottom: 1px solid #EBEBEB;
}
.cs-entry:last-child { border-bottom: none; }

.cs-entry-left {
  padding-right: 40px;
  position: sticky;
  top: 80px;
}
.cs-entry-num-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 16px;
}
.cs-entry-num {
  font-size: 13px; font-weight: 600;
  color: #BBBBBB; letter-spacing: 0.04em;
  flex-shrink: 0;
}
.cs-entry-title {
  font-size: clamp(1.55rem, 2.2vw, 2rem);
  font-weight: 800; color: #111;
  letter-spacing: -0.025em; line-height: 1.2;
}
.cs-entry-industry {
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #AAAAAA; margin-bottom: 14px;
}
.cs-entry-desc {
  font-size: 14px; color: #555; line-height: 1.8;
  margin-bottom: 24px;
}
.cs-entry-tags {
  display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 28px;
}
.cs-entry-tag {
  font-size: 12px; font-weight: 500; color: #333;
  border: 1.5px solid #333; border-radius: 50px;
  padding: 5px 16px;
  transition: background .2s, color .2s;
}
.cs-entry-tag:hover { background: #111; color: #fff; border-color: #111; }
.cs-entry-link {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 700; color: #111;
  border: 2px solid #111; border-radius: 50px;
  padding: 11px 24px; text-decoration: none;
  transition: background .2s, color .2s;
}
.cs-entry-link:hover { background: #111; color: #fff; }

.cs-entry-right {}
.cs-entry-img {
  width: 100%; display: block;
  aspect-ratio: 16/10; object-fit: cover;
  border-radius: 14px;
}

/* dual-image layout (Sparx "My Life Well" style) */
.cs-imgs-double {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 12px;
  align-items: stretch;
}
.cs-img-wide {
  width: 100%; display: block;
  aspect-ratio: 16/10; object-fit: cover;
  object-position: left center;
  border-radius: 14px;
}
.cs-img-tall {
  width: 100%; display: block;
  aspect-ratio: 3/4; object-fit: cover;
  object-position: right top;
  border-radius: 14px;
}

/* ── CTA ── */
.cs-cta {
  background: #0A1628; padding: 96px 64px;
  position: relative; overflow: hidden;
}
.cs-cta-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);
  background-size: 60px 60px;
}
.cs-cta-inner { max-width: 680px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
.cs-cta-k { font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#FE9700;margin-bottom:18px; }
.cs-cta-h { font-size:clamp(2rem,3.2vw,2.8rem);font-weight:800;color:#fff;letter-spacing:-.025em;line-height:1.15;margin-bottom:18px; }
.cs-cta-s { font-size:16px;color:rgba(255,255,255,.45);line-height:1.8;margin:0 auto 40px;max-width:440px; }
.cs-cta-btns { display:flex;gap:14px;justify-content:center;flex-wrap:wrap; }
.cs-cta-b1 { display:inline-flex;align-items:center;gap:10px;background:#FE9700;color:#fff;padding:14px 28px;border-radius:6px;font-size:14px;font-weight:700;text-decoration:none;transition:background .2s; }
.cs-cta-b1:hover { background:#e08600; }
.cs-cta-b2 { display:inline-flex;align-items:center;gap:10px;color:rgba(255,255,255,.65);padding:14px 28px;border-radius:6px;font-size:14px;font-weight:700;text-decoration:none;border:1.5px solid rgba(255,255,255,.14);transition:border-color .2s,color .2s; }
.cs-cta-b2:hover { border-color:rgba(255,255,255,.4);color:#fff; }

/* ── MOBILE APP CARD SHOWCASE ── */
.cs-apps-section {
  background: #fff;
  padding: 96px 0 0;
}
.cs-apps-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 64px;
}
.cs-apps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
.cs-app-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 20px;
}
.cs-app-num {
  font-size: 13px; font-weight: 700;
  color: #BBBBBB; letter-spacing: 0.04em;
  flex-shrink: 0;
}
.cs-app-title {
  font-size: clamp(1.25rem, 1.6vw, 1.6rem);
  font-weight: 800; color: #111;
  letter-spacing: -0.025em; line-height: 1.2;
}
.cs-app-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 3/4;
}
.cs-app-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform .45s ease;
}
.cs-app-card:hover .cs-app-img { transform: scale(1.04); }
.cs-app-pills {
  position: absolute;
  bottom: 20px; left: 20px;
  display: flex; gap: 8px; flex-wrap: wrap;
}
.cs-app-pill {
  font-size: 13px; font-weight: 600;
  color: #111; background: #fff;
  border-radius: 50px;
  padding: 8px 18px;
}

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .cs-entry { grid-template-columns: 260px 1fr; }
}
@media (max-width: 860px) {
  .cs-body-inner, .cs-cta { padding-left: 24px; padding-right: 24px; }
  .cs-hero-inner { padding: 0 24px; }
  .cs-entry { grid-template-columns: 1fr; padding: 56px 0; }
  .cs-entry-left { position: static; padding-right: 0; margin-bottom: 32px; }
  .cs-apps-inner { padding-left: 24px; padding-right: 24px; }
  .cs-apps-grid { grid-template-columns: 1fr; gap: 44px; }
}
@media (max-width: 600px) {
  .cs-filter-btn { padding: 12px 16px; font-size: 13px; }
  .cs-cta { padding: 64px 24px; }
  .cs-apps-section { padding-top: 64px; }
}
        `}</style>
      </Head>

      {/* ── HERO — original, untouched ── */}
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
                <span key={i} className="cs-avatar" style={{ background: av.bg, marginLeft: i === 0 ? 0 : -10 }}>
                  {av.initials}
                </span>
              ))}
            </span>
            Connect with Experts
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* ── CASE STUDIES LIST ── */}
      <div className="cs-body">
        <div className="cs-body-inner">

          {/* Filter tabs — no heading above */}
          <div className="cs-filter-bar">
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

          {/* Numbered entries */}
          {filtered.map((p, i) => (
            <div key={p.id} className="cs-entry">

              <div className="cs-entry-left">
                <div className="cs-entry-num-row">
                  <span className="cs-entry-num">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="cs-entry-title">{p.title}</h2>
                </div>
                <div className="cs-entry-industry">{p.industry}</div>
                <p className="cs-entry-desc">{p.desc}</p>
                <div className="cs-entry-tags">
                  {p.tech.map(t => (
                    <span key={t} className="cs-entry-tag">{t}</span>
                  ))}
                </div>
                {p.url ? (
                  p.internal ? (
                    <Link href={p.url} className="cs-entry-link">
                      Read Case Study
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  ) : (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="cs-entry-link">
                      View Details
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  )
                ) : (
                  <span className="cs-entry-link" style={{ opacity: 0.35, cursor: 'default' }}>
                    Coming Soon
                  </span>
                )}
              </div>

              <div className="cs-entry-right">
                {p.dual ? (
                  <div className="cs-imgs-double">
                    <img src={p.image} alt={p.title} className="cs-img-wide" loading={i < 3 ? 'eager' : 'lazy'} />
                    <img src={p.image} alt={`${p.title} detail`} className="cs-img-tall" loading="lazy" />
                  </div>
                ) : (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="cs-entry-img"
                    loading={i < 3 ? 'eager' : 'lazy'}
                  />
                )}
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* ── MOBILE APP CARD SHOWCASE ── */}
      <section className="cs-apps-section">
        <div className="cs-apps-inner">
          <div className="cs-apps-grid">
            {MOBILE_APPS.map(app => (
              <div key={app.id}>
                <div className="cs-app-header">
                  <span className="cs-app-num">{app.num}</span>
                  <h3 className="cs-app-title">{app.title}</h3>
                </div>
                <div className="cs-app-card">
                  <img src={app.image} alt={app.title} className="cs-app-img" loading="lazy" />
                  <div className="cs-app-pills">
                    {app.tags.map(t => (
                      <span key={t} className="cs-app-pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cs-cta">
        <div className="cs-cta-grid" />
        <div className="cs-cta-inner">
          <p className="cs-cta-k">Let&rsquo;s Work Together</p>
          <h2 className="cs-cta-h">Ready to build your success story?</h2>
          <p className="cs-cta-s">Tell us about your project. We&rsquo;ll bring strategy, design, and engineering to make it happen.</p>
          <div className="cs-cta-btns">
            <Link href="/contact-us" className="cs-cta-b1">
              Start a Project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/portfolio" className="cs-cta-b2">View Full Portfolio</Link>
          </div>
        </div>
      </section>
    </>
  );
}
