import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const CATEGORIES = ['All', 'Web Development', 'eCommerce', 'Digital Marketing', 'Mobile App', 'UI/UX Design'];

const PROJECTS = [
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
      <div className="pf-thumb" style={{ background: project.gradient }}>
        <span className="pf-thumb-icon">{project.icon}</span>
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
          .pf-hero { background: linear-gradient(135deg,#0F1F40 0%,#114171 40%,#1a3a6e 100%); padding: 90px 24px 70px; position: relative; overflow: hidden; }
          .pf-hero-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
          .pf-hero-orb-1 { width: 600px; height: 600px; background: rgba(99,102,241,0.18); top: -200px; right: -150px; }
          .pf-hero-orb-2 { width: 400px; height: 400px; background: rgba(16,185,129,0.12); bottom: -120px; left: -80px; }
          .pf-hero-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
          .pf-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 100px; padding: 6px 16px; font-size: .8rem; font-weight: 600; color: rgba(255,255,255,0.85); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 22px; }
          .pf-hero h1 { font-size: clamp(2.4rem,5vw,3.8rem); font-weight: 800; line-height: 1.1; letter-spacing: -.03em; color: #fff; margin-bottom: 18px; }
          .pf-hero h1 span { background: linear-gradient(90deg,#34d399,#60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .pf-hero-sub { font-size: 1.05rem; line-height: 1.7; color: rgba(255,255,255,0.72); max-width: 560px; margin: 0 auto 44px; }
          .pf-stats { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
          .pf-stat { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px 28px; text-align: center; min-width: 120px; }
          .pf-stat-val { font-size: 1.7rem; font-weight: 800; color: #fff; line-height: 1; }
          .pf-stat-label { font-size: .76rem; color: rgba(255,255,255,0.6); margin-top: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: .05em; }

          /* ── Filter tabs ── */
          .pf-filter-bar { background: #fff; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 50; }
          .pf-filter-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; }
          .pf-filter-inner::-webkit-scrollbar { display: none; }
          .pf-filter-btn { flex-shrink: 0; padding: 16px 20px; font-size: .88rem; font-weight: 600; color: #6b7280; border: none; background: none; cursor: pointer; border-bottom: 2.5px solid transparent; transition: color .18s, border-color .18s; white-space: nowrap; }
          .pf-filter-btn:hover { color: #114171; }
          .pf-filter-btn.active { color: #114171; border-bottom-color: #114171; }

          /* ── Grid ── */
          .pf-section { max-width: 1200px; margin: 0 auto; padding: 56px 24px 80px; }
          .pf-count { font-size: .88rem; color: #6b7280; margin-bottom: 28px; }
          .pf-count strong { color: #1a1a2e; }
          .pf-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }

          /* ── Cards ── */
          .pf-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; transition: box-shadow .25s, transform .25s, opacity .4s, translate .4s; opacity: 0; translate: 0 20px; }
          .pf-card-in { opacity: 1; translate: 0 0; }
          .pf-card:hover { box-shadow: 0 12px 40px rgba(17,65,113,0.12); transform: translateY(-4px); }
          .pf-thumb { height: 200px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
          .pf-thumb-icon { font-size: 3.5rem; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.25)); }
          .pf-featured-badge { position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.22); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.35); color: #fff; font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; padding: 4px 10px; border-radius: 100px; }
          .pf-cat-badge { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.35); backdrop-filter: blur(8px); color: #fff; font-size: .72rem; font-weight: 600; padding: 4px 10px; border-radius: 100px; }
          .pf-card-body { padding: 22px; }
          .pf-card-industry { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #9ca3af; margin-bottom: 6px; }
          .pf-card-title { font-size: 1.05rem; font-weight: 700; color: #0F1F40; margin-bottom: 10px; line-height: 1.3; }
          .pf-card-desc { font-size: .87rem; line-height: 1.6; color: #4b5563; margin-bottom: 16px; }
          .pf-tech-row { display: flex; flex-wrap: wrap; gap: 6px; }
          .pf-tech-pill { font-size: .74rem; font-weight: 600; color: #374151; background: #f3f4f6; border-radius: 100px; padding: 3px 10px; }

          /* ── Empty state ── */
          .pf-empty { text-align: center; padding: 80px 24px; color: #9ca3af; font-size: .95rem; }

          /* ── CTA ── */
          .pf-cta { background: linear-gradient(135deg,#0F1F40 0%,#114171 100%); padding: 80px 24px; text-align: center; position: relative; overflow: hidden; }
          .pf-cta-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
          .pf-cta-orb-1 { width: 500px; height: 500px; background: rgba(99,102,241,0.14); top: -150px; right: -100px; }
          .pf-cta-orb-2 { width: 350px; height: 350px; background: rgba(16,185,129,0.1); bottom: -100px; left: -60px; }
          .pf-cta-inner { max-width: 640px; margin: 0 auto; position: relative; z-index: 1; }
          .pf-cta h2 { font-size: clamp(1.8rem,3.5vw,2.6rem); font-weight: 800; color: #fff; line-height: 1.18; letter-spacing: -.02em; margin-bottom: 16px; }
          .pf-cta h2 span { background: linear-gradient(90deg,#34d399,#60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .pf-cta p { font-size: 1rem; color: rgba(255,255,255,0.72); line-height: 1.68; margin-bottom: 36px; }
          .pf-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
          .pf-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 100px; font-size: .95rem; font-weight: 700; text-decoration: none; transition: all .2s; }
          .pf-btn-white { background: #fff; color: #114171; }
          .pf-btn-white:hover { background: #e0eaf7; }
          .pf-btn-outline { background: rgba(255,255,255,0.08); color: #fff; border: 1.5px solid rgba(255,255,255,0.25); }
          .pf-btn-outline:hover { background: rgba(255,255,255,0.14); }

          @media(max-width:640px){
            .pf-hero { padding: 70px 20px 52px; }
            .pf-grid { grid-template-columns: 1fr; }
            .pf-section { padding: 40px 20px 60px; }
            .pf-stats { gap: 8px; }
            .pf-stat { padding: 14px 18px; min-width: 100px; }
          }
        `}</style>
      </Head>

      <div className="pf-page">

        {/* Hero */}
        <div className="pf-hero">
          <div className="pf-hero-orb pf-hero-orb-1" />
          <div className="pf-hero-orb pf-hero-orb-2" />
          <div className="pf-hero-inner">
            <div className="pf-hero-eyebrow">
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
              Our Portfolio
            </div>
            <h1>Work That <span>Speaks</span> For Itself</h1>
            <p className="pf-hero-sub">
              500+ projects across web development, eCommerce, digital marketing, and mobile — delivered to clients in the US, Canada, and Australia over 15+ years.
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
        <div className="pf-cta">
          <div className="pf-cta-orb pf-cta-orb-1" />
          <div className="pf-cta-orb pf-cta-orb-2" />
          <div className="pf-cta-inner">
            <h2>Ready to Build <span>Something Great?</span></h2>
            <p>
              Whether you need a high-performance website, a scalable eCommerce store, or a digital marketing strategy — we have done it before, and we will do it for you.
            </p>
            <div className="pf-cta-btns">
              <Link href="/contact/" className="pf-btn pf-btn-white">Start Your Project</Link>
              <Link href="/who-we-are/" className="pf-btn pf-btn-outline">About 1Solutions</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
