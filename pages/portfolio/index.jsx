import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const CATEGORIES = ['All', 'Web Development', 'eCommerce', 'Digital Marketing', 'Mobile App', 'UI/UX Design'];

const PROJECTS = [
  {
    id: 0,
    title: 'AI+ Store — Shopify eCommerce',
    category: 'eCommerce',
    industry: 'Consumer Electronics',
    tech: ['Shopify', 'Liquid', 'UI/UX Design'],
    desc: 'Full-featured Shopify store for AI+ SmartPhones — a consumer electronics brand selling Nova series 5G smartphones, NovaPods, and NovaWatches across India.',
    image: '/images/portfolio/aiplusstore.jpg',
    url: 'https://aiplusstore.com/',
    featured: true,
  },
  {
    id: 'keiyura',
    title: 'Keiyura — Artisanal Jewellery',
    category: 'eCommerce',
    industry: 'Fashion & Jewellery',
    tech: ['Shopify', 'Liquid', 'UI/UX Design'],
    desc: 'Elegant Shopify store for a handcrafted jewellery brand — featuring lookbooks, curated collections, and a storytelling-led shopping experience.',
    image: '/images/portfolio/keiyura.jpg',
    url: 'https://keiyura.com/',
    featured: false,
  },
  {
    id: 'shopsamsin',
    title: 'Samsin — Streetwear Brand',
    category: 'eCommerce',
    industry: 'Fashion & Apparel',
    tech: ['Shopify', 'Liquid', 'Email Marketing'],
    desc: 'Minimalist Shopify store for a streetwear label selling tops, bottoms, and headwear — with VIP subscriber access and flash-sale promotions.',
    image: '/images/portfolio/shopsamsin.jpg',
    url: 'https://shopsamsin.com/',
    featured: false,
  },
  {
    id: '305aero',
    title: '305 Aero Supplies',
    category: 'eCommerce',
    industry: 'Electronics & IT',
    tech: ['Shopify', 'Liquid', 'eCommerce'],
    desc: 'Complete IT solutions store offering hardware and software products — a one-stop electronics shop serving clients with end-to-end technology needs.',
    image: '/images/portfolio/305aerosupplies.jpg',
    url: 'https://305aerosupplies.com/',
    featured: false,
  },
  {
    id: 'yaahdy',
    title: 'Yaahdy Store',
    category: 'eCommerce',
    industry: 'Lifestyle & Gifts',
    tech: ['Shopify', 'Liquid', 'Conversion Optimisation'],
    desc: 'Vibrant Shopify eCommerce store with a focus on lifestyle products — optimised for fast load times and high-converting product pages.',
    image: '/images/portfolio/yaahdy.jpg',
    url: 'https://yaahdy.com/',
    featured: false,
  },
  {
    id: 'foreverring',
    title: 'Forever Ring — Fine Jewellery',
    category: 'eCommerce',
    industry: 'Fashion & Jewellery',
    tech: ['Shopify', 'Liquid', 'UI/UX Design'],
    desc: 'Sophisticated Shopify store for a Canadian fine jewellery brand — clean product presentation, trust-building pages, and a seamless checkout flow.',
    image: '/images/portfolio/foreverring.jpg',
    url: 'https://www.foreverring.ca/',
    featured: false,
  },
  {
    id: 'parfumfrance',
    title: 'Parfum France — Luxury Fragrance',
    category: 'eCommerce',
    industry: 'Beauty & Fragrance',
    tech: ['Shopify', 'Liquid', 'UI/UX Design'],
    desc: 'Premium Shopify fragrance boutique bringing French parfumerie to a global audience — immersive design with rich product storytelling.',
    image: '/images/portfolio/parfumfrance.jpg',
    url: 'https://parfumfrance.com/',
    featured: false,
  },
  {
    id: 'asiandispatch',
    title: 'Asian Dispatch — News Network',
    category: 'Web Development',
    industry: 'Media & Journalism',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Digital news network for investigative journalism across 13 Asian countries — covering AI & Tech, Climate, Health, Politics, and Human Rights with a 21-member contributor network.',
    image: '/images/portfolio/asiandispatch.webp',
    url: 'https://www.asiandispatch.net',
    featured: false,
  },
  {
    id: 'vns',
    title: 'VNS Group of Institutions',
    category: 'Web Development',
    industry: 'Education',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Comprehensive website for a multi-faculty institution in Bhopal — covering Engineering, Pharmacy, Management, Nursing, and Education across a 50+ acre campus established in 1994.',
    image: '/images/portfolio/vns.webp',
    url: 'https://vns.ac.in/',
    featured: false,
  },
  {
    id: 'rngfoundation',
    title: 'RNG Foundation — Journalism Awards',
    category: 'Web Development',
    industry: 'Media & Journalism',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: "Award portal for India's most prestigious journalism honours — the Ramnath Goenka Excellence in Journalism Awards, administered by the Indian Express Group across 14 categories.",
    image: '/images/portfolio/rngfoundation.webp',
    url: 'https://rngfoundation.com/awards/',
    featured: false,
  },
  {
    id: 'copalcollective',
    title: 'Copal Collective — Handmade Throws',
    category: 'eCommerce',
    industry: 'Home & Lifestyle',
    tech: ['Shopify', 'Liquid', 'UI/UX Design'],
    desc: 'Artisan Shopify store for handmade throws and textiles — a curated collection of handcrafted home décor pieces with a focus on craftsmanship and natural materials.',
    image: '/images/portfolio/copalcollective.webp',
    featured: false,
  },
  {
    id: 'youngmonk',
    title: 'Young Monk — PR & Communications',
    category: 'Web Development',
    industry: 'Public Relations',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Agency website for Young Monk, a New Delhi-based PR and communications firm specialising in Sports, Entertainment, and Change Agents — offering media relations, digital campaigns, and brand film production.',
    image: '/images/portfolio/youngmonk.png',
    featured: false,
  },
  {
    id: 'greycellpr',
    title: 'Grey Cell PR — Ideas Consultancy',
    category: 'Web Development',
    industry: 'Public Relations',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Corporate website for Grey Cell PR, a Delhi-based branding and communications consultancy — delivering strategic media relations, corporate brand management, and lobbying services across diverse industries.',
    image: '/images/portfolio/greycellpr.png',
    featured: false,
  },
  {
    id: 'zincfootball',
    title: 'Zinc Football — Youth Development',
    category: 'Web Development',
    industry: 'Sports & Education',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: "India's first technology-driven grassroots football initiative — backed by Hindustan Zinc, training 350+ children across Rajasthan through a residential academy, AIFF-certified coaching centres, and a proprietary player-tracking system.",
    image: '/images/portfolio/zincfootball.png',
    featured: false,
  },
  {
    id: 'playaorthodontics',
    title: 'Playa Orthodontics — Dental Clinic',
    category: 'Web Development',
    industry: 'Healthcare',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Orthodontic clinic website for a Los Angeles practice with two locations — showcasing Invisalign, braces, and treatments for all ages, with online consultation booking and flexible payment options.',
    image: '/images/portfolio/playaorthodontics.png',
    featured: false,
  },
  {
    id: 'adiuvo',
    title: 'Adiuvo Trustees — Corporate Services',
    category: 'Web Development',
    industry: 'Corporate Services',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Boutique fiduciary services website for Adiuvo Trustees, Cyprus — offering company formation, trust and fund structures, bank account opening, and immigration services to 700+ international clients across Cyprus, UK, and UAE.',
    gradient: 'linear-gradient(135deg,#1e3a5f 0%,#2d6a9f 100%)',
    icon: '🏛️',
    featured: false,
  },
  {
    id: 'phdcci',
    title: 'PHDCCI — Chamber of Commerce',
    category: 'Web Development',
    industry: 'Trade & Industry',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: "Website for PHD Chamber of Commerce and Industry — India's apex industry body with 121+ years of legacy, driving trade promotion, policy advocacy, arbitration, and sustainability initiatives across 120+ annual events.",
    image: '/images/portfolio/phdcci.png',
    featured: false,
  },
  {
    id: 'defenceaviationpost',
    title: 'Defence Aviation Post — News Portal',
    category: 'Web Development',
    industry: 'Defence & Media',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Defence and military news portal covering Indian Armed Forces, aerospace, missile systems, and global security developments — positioning itself as an authoritative voice on India\'s defence modernisation.',
    image: '/images/portfolio/defenceaviationpost.png',
    featured: false,
  },
  {
    id: 'throneportapotties',
    title: 'Throne Porta Potties — Sanitation Rentals',
    category: 'Web Development',
    industry: 'Sanitation & Events',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Service website for a porta potty rental company — showcasing sanitation solutions for construction sites, events, and outdoor projects with a focus on clean, reliable, and on-time delivery.',
    image: '/images/portfolio/throneportapotties.png',
    featured: false,
  },
  {
    id: 'recreator',
    title: 'Recreator — Hemp Clothing Store',
    category: 'eCommerce',
    industry: 'Sustainable Fashion',
    tech: ['WooCommerce', 'WordPress', 'UI/UX Design'],
    desc: 'Eco-conscious WooCommerce store for a US hemp clothing brand — selling men\'s and women\'s sustainable apparel, accessories, and fleece, with an educational journal on hemp fiber and sustainability.',
    image: '/images/portfolio/recreator.png',
    featured: false,
  },
  {
    id: 'skinlasercentre',
    title: 'Skin Laser Centre — Dermatology Clinic',
    category: 'Web Development',
    industry: 'Healthcare',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: "Clinical website for Dr. Paul's Skin Laser Centre, Delhi — a 23-year-old dermatology practice specialising in vitiligo, acne, hair transplants, and advanced laser treatments including Q-Switched and CO2 lasers.",
    image: '/images/portfolio/skinlasercentre.png',
    url: 'https://skinlasercentre.com/',
    featured: false,
  },
  {
    id: 'smefutures',
    title: 'SME Futures — Business Media Platform',
    category: 'Web Development',
    industry: 'Business & Finance',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Editorial and resource platform for small and medium enterprises — covering business news, growth strategies, funding, and industry insights for SME owners and entrepreneurs.',
    image: '/images/portfolio/smefutures.png',
    url: 'https://smefutures.com/',
    featured: false,
  },
  {
    id: 'mountsystems',
    title: 'Mount Systems — IT & Security Solutions',
    category: 'Web Development',
    industry: 'IT & Security',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Corporate website for Mount Systems — a complete IT and security solutions provider offering end-to-end technology and security services to businesses.',
    image: '/images/portfolio/mountsystems.png',
    url: 'https://www.mount-systems.com.ki/',
    featured: false,
  },
  {
    id: 'charlespuma',
    title: 'Charles Puma — Fine Art Gallery',
    category: 'Web Development',
    industry: 'Art & Culture',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Contemporary pop art gallery website with multi-location presence across Toronto, Miami, Berlin, and Florence — showcasing original artworks, limited edition prints, and curated exhibitions.',
    image: '/images/portfolio/charlespuma.webp',
    url: 'https://www.charlespuma.com/',
    featured: false,
  },
  {
    id: 'comtradesol',
    title: 'Comtradesol — Financial Advisory',
    category: 'Web Development',
    industry: 'Financial Services',
    tech: ['WordPress', 'Custom Theme', 'UI/UX Design'],
    desc: 'Corporate website for Comtradesol Advisory Services — a Gurgaon-based firm offering trade finance, debt syndication, equity advisory, and credit rating solutions across 15+ sectors.',
    image: '/images/portfolio/comtradesol.webp',
    url: 'https://www.comtradesol.com/',
    featured: false,
  },
  {
    id: 1,
    title: 'HealthPlus Patient Portal',
    category: 'Web Development',
    industry: 'Healthcare',
    tech: ['React', 'Node.js', 'MongoDB'],
    desc: 'HIPAA-compliant patient scheduling and records portal serving 80,000+ users across 12 clinics.',
    gradient: 'linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%)',
    icon: '🏥',
    featured: true,
  },
  {
    id: 2,
    title: 'LuxeCart eCommerce Platform',
    category: 'eCommerce',
    industry: 'Retail',
    tech: ['Magento 2', 'PWA', 'Elasticsearch'],
    desc: 'High-performance Magento 2 store with 10,000+ SKUs, multi-currency, and 3× faster checkout.',
    gradient: 'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)',
    icon: '🛒',
    featured: true,
  },
  {
    id: 3,
    title: 'FinTrack Dashboard',
    category: 'UI/UX Design',
    industry: 'Fintech',
    tech: ['Figma', 'React', 'D3.js'],
    desc: 'Data-dense yet intuitive dashboard for a US-based fintech startup managing $2B+ in assets.',
    gradient: 'linear-gradient(135deg,#10b981 0%,#06b6d4 100%)',
    icon: '📊',
    featured: true,
  },
  {
    id: 4,
    title: 'AutoParts Direct',
    category: 'eCommerce',
    industry: 'Automotive',
    tech: ['WooCommerce', 'PHP', 'MySQL'],
    desc: 'WooCommerce store with 50,000+ auto-parts SKUs, VIN-based compatibility filtering, and B2B pricing tiers.',
    gradient: 'linear-gradient(135deg,#64748b 0%,#1e293b 100%)',
    icon: '🚗',
    featured: false,
  },
  {
    id: 5,
    title: 'EduLearn Mobile App',
    category: 'Mobile App',
    industry: 'EdTech',
    tech: ['React Native', 'Firebase', 'Node.js'],
    desc: 'Cross-platform learning app with 500+ courses, live classes, and offline mode — 4.8★ on App Store.',
    gradient: 'linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)',
    icon: '📱',
    featured: false,
  },
  {
    id: 6,
    title: 'GreenLeaf SEO Campaign',
    category: 'Digital Marketing',
    industry: 'Sustainability',
    tech: ['SEO', 'Content', 'Analytics'],
    desc: 'Organic traffic grew 320% in 8 months for a sustainable products brand entering the US market.',
    gradient: 'linear-gradient(135deg,#22c55e 0%,#16a34a 100%)',
    icon: '🌿',
    featured: false,
  },
  {
    id: 7,
    title: 'LegalEdge CMS Website',
    category: 'Web Development',
    industry: 'Legal',
    tech: ['Next.js', 'WordPress', 'GraphQL'],
    desc: 'Headless CMS-powered site for a 50-attorney US law firm — sub-1s load times and 95+ Lighthouse score.',
    gradient: 'linear-gradient(135deg,#1d4ed8 0%,#2563eb 100%)',
    icon: '⚖️',
    featured: false,
  },
  {
    id: 8,
    title: 'FoodieBox Subscription',
    category: 'eCommerce',
    industry: 'Food & Beverage',
    tech: ['Shopify', 'ReCharge', 'Klaviyo'],
    desc: 'Shopify subscription box store with recurring billing, loyalty programme, and automated email flows.',
    gradient: 'linear-gradient(135deg,#f97316 0%,#fbbf24 100%)',
    icon: '🍱',
    featured: false,
  },
  {
    id: 9,
    title: 'TravelNest Booking Engine',
    category: 'Web Development',
    industry: 'Travel',
    tech: ['Laravel', 'Vue.js', 'Redis'],
    desc: 'Real-time hotel and activity booking engine integrated with 3 GDS providers and Stripe payments.',
    gradient: 'linear-gradient(135deg,#0891b2 0%,#0ea5e9 100%)',
    icon: '✈️',
    featured: false,
  },
  {
    id: 10,
    title: 'MediSupply PPC Campaign',
    category: 'Digital Marketing',
    industry: 'Healthcare',
    tech: ['Google Ads', 'Meta Ads', 'GA4'],
    desc: 'Google & Meta Ads campaign for a medical supplier — 4.2× ROAS on $85K monthly spend within 90 days.',
    gradient: 'linear-gradient(135deg,#e11d48 0%,#f43f5e 100%)',
    icon: '📣',
    featured: false,
  },
  {
    id: 11,
    title: 'ProBuild Design System',
    category: 'UI/UX Design',
    industry: 'Construction',
    tech: ['Figma', 'Storybook', 'React'],
    desc: 'End-to-end design system with 120+ components, accessibility-audited, for a construction SaaS platform.',
    gradient: 'linear-gradient(135deg,#78350f 0%,#b45309 100%)',
    icon: '🏗️',
    featured: false,
  },
  {
    id: 12,
    title: 'PetPal Veterinary App',
    category: 'Mobile App',
    industry: 'Veterinary',
    tech: ['Flutter', 'Firebase', 'Stripe'],
    desc: 'iOS & Android app for vet clinics — appointment booking, vaccination reminders, and telemedicine.',
    gradient: 'linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)',
    icon: '🐾',
    featured: false,
  },
  {
    id: 13,
    title: 'RealVantage Property Portal',
    category: 'Web Development',
    industry: 'Real Estate',
    tech: ['CodeIgniter', 'React', 'Google Maps API'],
    desc: 'Property listing portal with interactive map search, virtual tours, and mortgage calculator.',
    gradient: 'linear-gradient(135deg,#0f766e 0%,#14b8a6 100%)',
    icon: '🏠',
    featured: false,
  },
  {
    id: 14,
    title: 'SportGear Social Media',
    category: 'Digital Marketing',
    industry: 'Sports & Fitness',
    tech: ['Instagram', 'YouTube', 'Influencer'],
    desc: 'Social media strategy and content production for a D2C sports brand — 180K followers in 6 months.',
    gradient: 'linear-gradient(135deg,#dc2626 0%,#ea580c 100%)',
    icon: '⚽',
    featured: false,
  },
  {
    id: 15,
    title: 'CloudBase SaaS UI',
    category: 'UI/UX Design',
    industry: 'B2B SaaS',
    tech: ['Figma', 'Protopie', 'React'],
    desc: 'Complete UX overhaul for a cloud infrastructure platform — reduced onboarding drop-off by 60%.',
    gradient: 'linear-gradient(135deg,#2563eb 0%,#9333ea 100%)',
    icon: '☁️',
    featured: false,
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    const timer = setTimeout(() => obs.observe(el), index * 60);
    return () => { clearTimeout(timer); obs.disconnect(); };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`pf-card${visible ? ' pf-card-in' : ''}`}
      style={{ transitionDelay: `${(index % 4) * 60}ms` }}
    >
      <div className="pf-thumb" style={project.image ? {} : { background: project.gradient }}>
        {project.image ? (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
            <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        ) : (
          <span className="pf-thumb-icon">{project.icon}</span>
        )}
        {project.featured && <span className="pf-featured-badge">Featured</span>}
        <span className="pf-cat-badge">{project.category}</span>
      </div>
      <div className="pf-card-body">
        <div className="pf-card-industry">{project.industry}</div>
        <h3 className="pf-card-title">{project.title}</h3>
        <p className="pf-card-desc">{project.desc}</p>
        <div className="pf-tech-row">
          {project.tech.map(t => <span key={t} className="pf-tech-pill">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [displayed, setDisplayed] = useState(PROJECTS);

  useEffect(() => {
    if (active === 'All') {
      setDisplayed(PROJECTS);
    } else {
      setDisplayed(PROJECTS.filter(p => p.category === active));
    }
  }, [active]);

  const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '15+', label: 'Years Experience' },
    { value: '50+', label: 'Industries Served' },
    { value: '97%', label: 'Client Satisfaction' },
  ];

  return (
    <>
      <Head>
        <title>Portfolio | 1Solutions — Web Development & Digital Marketing Work</title>
        <meta name="description" content="Browse 1Solutions' portfolio of 500+ web development, eCommerce, digital marketing, and mobile app projects delivered across 50+ industries worldwide." />
        <link rel="canonical" href="https://www.1solutions.biz/portfolio/" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          .pf-page { font-family: 'Inter', sans-serif; color: #1a1a2e; background: #f8fafc; }

          /* ── Hero ── */
          .pf-hero { background: linear-gradient(135deg,rgba(254,243,199,0.55) 0%,rgba(219,234,254,0.35) 100%); padding: 90px 24px 70px; position: relative; overflow: hidden; text-align: center; }
          .pf-hero-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
          .pf-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(254,151,0,0.1); border: 1px solid rgba(254,151,0,0.25); border-radius: 100px; padding: 6px 16px; font-size: .8rem; font-weight: 600; color: #92400e; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 22px; }
          .pf-hero h1 { font-size: clamp(2.2rem,5vw,3.8rem); font-weight: 900; line-height: 1.1; letter-spacing: -.03em; margin-bottom: 18px; background: linear-gradient(90deg,#0F3460 0%,#F59E0B 45%,#7C3AED 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .pf-hero-sub { font-size: 1.05rem; line-height: 1.7; color: #6b7280; max-width: 600px; margin: 0 auto 44px; }
          .pf-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 40px; max-width: 800px; margin: 0 auto; padding: 40px 0; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }
          .pf-stat { text-align: center; }
          .pf-stat-val { font-size: 2rem; font-weight: 900; color: #114171; line-height: 1; }
          .pf-stat-label { font-size: .76rem; color: #6b7280; margin-top: 6px; font-weight: 500; }

          /* ── Filter tabs ── */
          .pf-filter-bar { background: #fff; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 50; }
          .pf-filter-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; }
          .pf-filter-inner::-webkit-scrollbar { display: none; }
          .pf-filter-btn { flex-shrink: 0; padding: 16px 20px; font-size: .88rem; font-weight: 600; color: #6b7280; border: none; background: none; cursor: pointer; border-bottom: 2.5px solid transparent; transition: color .18s, border-color .18s; white-space: nowrap; }
          .pf-filter-btn:hover { color: #FE9700; }
          .pf-filter-btn.active { color: #114171; border-bottom-color: #FE9700; }

          /* ── Grid ── */
          .pf-section { max-width: 1200px; margin: 0 auto; padding: 56px 24px 80px; }
          .pf-count { font-size: .88rem; color: #6b7280; margin-bottom: 28px; }
          .pf-count strong { color: #1a1a2e; }
          .pf-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }

          /* ── Cards ── */
          .pf-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; transition: box-shadow .25s, transform .25s, opacity .4s, translate .4s; opacity: 0; translate: 0 20px; }
          .pf-card-in { opacity: 1; translate: 0 0; }
          .pf-card:hover { box-shadow: 0 12px 40px rgba(17,65,113,0.12), 0 0 0 2px rgba(254,151,0,0.2); transform: translateY(-4px); }
          .pf-thumb { height: 200px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
          .pf-thumb-icon { font-size: 3.5rem; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.25)); }
          .pf-featured-badge { position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.22); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.35); color: #fff; font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; padding: 4px 10px; border-radius: 100px; }
          .pf-cat-badge { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.35); backdrop-filter: blur(8px); color: #fff; font-size: .72rem; font-weight: 600; padding: 4px 10px; border-radius: 100px; }
          .pf-card-body { padding: 22px; }
          .pf-card-industry { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 6px; }
          .pf-card-title { font-size: 1.05rem; font-weight: 700; color: #0F1F40; margin-bottom: 10px; line-height: 1.3; }
          .pf-card-desc { font-size: .87rem; line-height: 1.6; color: #4b5563; margin-bottom: 16px; }
          .pf-tech-row { display: flex; flex-wrap: wrap; gap: 6px; }
          .pf-tech-pill { font-size: .74rem; font-weight: 600; color: #92400e; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 100px; padding: 3px 10px; }

          /* ── Empty state ── */
          .pf-empty { text-align: center; padding: 80px 24px; color: #9ca3af; font-size: .95rem; }

          /* ── CTA ── */
          .pf-cta { padding: 80px 40px; background: linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%); border-top: 1px solid rgba(255,255,255,0.80); position: relative; z-index: 1; }
          .pf-cta-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.15fr; gap: 48px; align-items: start; }
          .pf-cta-title { font-size: clamp(2rem,3.5vw,3rem); font-weight: 900; line-height: 1.15; margin: 0 0 14px; background: linear-gradient(90deg,#0F3460 0%,#D97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .pf-cta-desc { font-size: 14px; color: #4A6080; line-height: 1.7; margin: 0 0 28px; }
          .pf-merged-box { background: linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%); border: 1px solid rgba(255,255,255,0.90); border-radius: 14px; padding: 24px; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: inset 0 1px 0 rgba(255,255,255,1); display: flex; flex-direction: column; gap: 20px; }
          .pf-benefit-item { display: flex; gap: 10px; align-items: flex-start; }
          .pf-benefit-icon { width: 20px; height: 20px; color: #D97706; flex-shrink: 0; margin-top: 1px; }
          .pf-benefit-item p { font-size: 13px; color: #4A6080; margin: 0; line-height: 1.5; }
          .pf-cta-stats { padding-top: 24px; border-top: 1px solid rgba(15,52,96,0.12); display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
          .pf-cta-stat-num { font-size: 2.2rem; font-weight: 900; color: #0F3460; line-height: 1; display: block; }
          .pf-cta-stat-lbl { font-size: 12px; color: #4A6080; font-weight: 500; }
          .pf-form-box { background: linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.92); border-radius: 20px; padding: 36px; box-shadow: 0 8px 40px rgba(15,52,96,0.10), inset 0 1px 0 rgba(255,255,255,1); }
          .pf-form-box h3 { font-size: 22px; font-weight: 700; color: #0F1F40; margin: 0 0 24px; }
          .pf-form { display: flex; flex-direction: column; gap: 14px; }
          .pf-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
          .pf-form-group { display: flex; flex-direction: column; gap: 5px; }
          .pf-form-group label { font-size: 11px; font-weight: 600; color: #0F1F40; text-transform: uppercase; letter-spacing: .04em; }
          .pf-form-group input, .pf-form-group select, .pf-form-group textarea { padding: 10px 14px; border: 1px solid rgba(15,52,96,0.15); border-radius: 6px; font-size: 13px; font-family: inherit; color: #0F1F40; background: rgba(255,255,255,0.55); transition: border-color .2s, background .2s; outline: none; }
          .pf-form-group input:focus, .pf-form-group select:focus, .pf-form-group textarea:focus { border-color: #D97706; background: rgba(255,255,255,0.9); box-shadow: 0 0 0 3px rgba(217,119,6,0.12); }
          .pf-submit { padding: 13px 28px; background: rgba(15,52,96,0.85); backdrop-filter: blur(16px); border: 1.5px solid rgba(255,255,255,0.30); color: #fff; border-radius: 50px; font-weight: 700; font-size: 15px; cursor: pointer; font-family: inherit; width: 100%; transition: all .3s; box-shadow: 0 6px 24px rgba(15,52,96,0.25), inset 0 1px 0 rgba(255,255,255,0.15); margin-top: 4px; }
          .pf-submit:hover { background: rgba(15,52,96,0.95); border-color: rgba(245,158,11,0.6); transform: translateY(-2px); }
          @media(max-width:900px){ .pf-cta-container { grid-template-columns: 1fr; } .pf-cta { padding: 60px 24px; } }

          @media(max-width:640px){
            .pf-hero { padding: 70px 20px 52px; }
            .pf-grid { grid-template-columns: 1fr; }
            .pf-section { padding: 40px 20px 60px; }
            .pf-stats { grid-template-columns: repeat(2,1fr); gap: 24px; }
          }
        `}</style>
      </Head>

      <div className="pf-page">

        {/* Hero */}
        <div className="pf-hero">
          <div className="pf-hero-inner">
            <div className="pf-hero-eyebrow">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              Our Portfolio
            </div>
            <h1>500+ Projects. One Proven Partner.</h1>
            <p className="pf-hero-sub">
              Web development, eCommerce, digital marketing, and mobile — delivered to clients in the US, Canada, and Australia over 15+ years.
            </p>
            <div className="pf-stats">
              {stats.map(s => (
                <div key={s.label} className="pf-stat">
                  <div className="pf-stat-val">{s.value}</div>
                  <div className="pf-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="pf-filter-bar" role="navigation" aria-label="Portfolio categories">
          <div className="pf-filter-inner">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`pf-filter-btn${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="pf-section">
          <p className="pf-count">
            Showing <strong>{displayed.length}</strong> project{displayed.length !== 1 ? 's' : ''}
            {active !== 'All' ? ` in ${active}` : ''}
          </p>
          {displayed.length === 0 ? (
            <div className="pf-empty">No projects found in this category.</div>
          ) : (
            <div className="pf-grid">
              {displayed.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <section className="pf-cta">
          <div className="pf-cta-container">
            {/* Left */}
            <div>
              <h2 className="pf-cta-title">Let&apos;s Build Something<br/>Great Together</h2>
              <p className="pf-cta-desc">Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored plan.</p>
              <div className="pf-merged-box">
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  {[
                    { text: 'Your project details are confidential. We respect your privacy.', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
                    { text: 'A real expert reviews your requirements — no automated responses.', path: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
                    { text: 'Quick response within 24 business hours.', path: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2' },
                    { text: 'No obligation to proceed. Let\'s just talk.', path: 'M20 6L9 17l-5-5' },
                  ].map((b, i) => (
                    <div key={i} className="pf-benefit-item">
                      <svg className="pf-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d={b.path}/>
                      </svg>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="pf-cta-stats">
                  {[['500+','Projects Delivered'],['15+','Years Experience'],['97%','Client Retention']].map(([num,lbl]) => (
                    <div key={lbl}>
                      <span className="pf-cta-stat-num">{num}</span>
                      <span className="pf-cta-stat-lbl">{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right — form */}
            <div className="pf-form-box">
              <h3>Start Your Project</h3>
              <form className="pf-form" onSubmit={e => e.preventDefault()}>
                <div className="pf-form-row">
                  <div className="pf-form-group"><label>Full Name</label><input type="text" placeholder="Your full name" /></div>
                  <div className="pf-form-group"><label>Business Email</label><input type="email" placeholder="you@company.com" /></div>
                </div>
                <div className="pf-form-row">
                  <div className="pf-form-group"><label>Phone</label><input type="tel" placeholder="+1 000 000 0000" /></div>
                  <div className="pf-form-group"><label>Company</label><input type="text" placeholder="Company name" /></div>
                </div>
                <div className="pf-form-group">
                  <label>Service Needed</label>
                  <select>
                    <option value="">Select a service…</option>
                    <option>Web Development</option>
                    <option>eCommerce Development</option>
                    <option>Digital Marketing / SEO</option>
                    <option>Mobile App Development</option>
                    <option>UI/UX Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="pf-form-group">
                  <label>Message</label>
                  <textarea rows={4} placeholder="Tell us about your project…" />
                </div>
                <button type="submit" className="pf-submit">Send Message →</button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
