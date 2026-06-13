'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ── Services mega menu data ─────────────────────────────────────── */
const MEGA = [
  {
    id: 'web', label: 'Web Development', color: '#0ea5e9',
    services: [
      { name: 'Python Development',     desc: 'Django & Flask web applications',   href: '/python-development-services/' },
      { name: 'Laravel Development',    desc: 'Robust PHP Laravel solutions',      href: '/laravel-development-company/' },
      { name: 'CodeIgniter Development',desc: 'Lightweight PHP web apps',          href: '/codeigniter-development-company/' },
      { name: 'Drupal Development',     desc: 'Enterprise CMS platforms',          href: '/drupal-development-company/' },
      { name: 'WordPress Development',  desc: 'Custom themes, plugins & sites',    href: '/#services' },
      { name: 'PHP Development',        desc: 'Bespoke PHP web applications',      href: '/#services' },
    ],
  },
  {
    id: 'ecommerce', label: 'eCommerce', color: '#f59e0b',
    services: [
      { name: 'eCommerce Development',  desc: 'End-to-end online store builds',    href: '/ecommerce-website-development/' },
      { name: 'Magento Development',    desc: 'Enterprise Magento 2 solutions',    href: '/magento-development-company/' },
      { name: 'WooCommerce Development',desc: 'WordPress-powered online stores',   href: '/woocommerce-development-company/' },
      { name: 'OpenCart Development',   desc: 'Scalable OpenCart storefronts',     href: '/opencart-development-company/' },
      { name: 'Shopify Development',    desc: 'Custom Shopify stores & apps',      href: '/#services' },
      { name: 'B2B eCommerce',          desc: 'Wholesale & trade portal solutions',href: '/#services' },
    ],
  },
  {
    id: 'marketing', label: 'Digital Marketing', color: '#10b981',
    services: [
      { name: 'SEO Packages',           desc: 'Affordable monthly SEO plans',      href: '/affordable-seo-packages/' },
      { name: 'PPC Advertising',        desc: 'Google & Meta Ads management',      href: '/#services' },
      { name: 'Social Media Marketing', desc: 'Brand growth on social platforms',  href: '/#services' },
      { name: 'Content Marketing',      desc: 'SEO content that ranks & converts', href: '/#services' },
      { name: 'Email Marketing',        desc: 'Automated drip campaigns',          href: '/#services' },
      { name: 'Analytics & CRO',        desc: 'Data-driven growth optimisation',   href: '/#services' },
    ],
  },
  {
    id: 'mobile', label: 'Mobile Apps', color: '#8b5cf6',
    services: [
      { name: 'iOS App Development',    desc: 'Native Swift & Xcode apps',         href: '/#services' },
      { name: 'Android App Development',desc: 'Native Kotlin applications',        href: '/#services' },
      { name: 'React Native',           desc: 'Cross-platform mobile apps',        href: '/#services' },
      { name: 'Flutter Development',    desc: 'Beautiful cross-platform UIs',      href: '/#services' },
      { name: 'App UI/UX Design',       desc: 'Intuitive mobile experiences',      href: '/#services' },
      { name: 'App Maintenance',        desc: 'Ongoing updates & support',         href: '/#services' },
    ],
  },
  {
    id: 'design', label: 'UI/UX Design', color: '#ec4899',
    services: [
      { name: 'Website Design',         desc: 'Conversion-focused web design',     href: '/#services' },
      { name: 'Mobile App Design',      desc: 'iOS & Android UI design',           href: '/#services' },
      { name: 'Brand Identity',         desc: 'Logo, colours & typography systems',href: '/#services' },
      { name: 'Design Systems',         desc: 'Scalable component libraries',      href: '/#services' },
      { name: 'Prototyping',            desc: 'Interactive wireframes & flows',    href: '/#services' },
      { name: 'UX Research',            desc: 'User testing & journey mapping',    href: '/#services' },
    ],
  },
];

/* ── Industries mega menu data ───────────────────────────────────── */
const INDUSTRIES = [
  {
    name: 'Healthcare & Medical',
    desc: 'Patient portals, EMR & telemedicine',
    href: '/#industries',
    color: '#10b981',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  },
  {
    name: 'Education & eLearning',
    desc: 'LMS, EdTech & virtual classrooms',
    href: '/#industries',
    color: '#0ea5e9',
    icon: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
  },
  {
    name: 'Real Estate',
    desc: 'Property listings & management portals',
    href: '/#industries',
    color: '#8b5cf6',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  },
  {
    name: 'Finance & Banking',
    desc: 'FinTech, payments & trading platforms',
    href: '/#industries',
    color: '#f59e0b',
    icon: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z',
  },
  {
    name: 'Travel & Hospitality',
    desc: 'Booking engines & travel platforms',
    href: '/#industries',
    color: '#06b6d4',
    icon: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z',
  },
  {
    name: 'Retail & eCommerce',
    desc: 'Online stores & omnichannel platforms',
    href: '/#industries',
    color: '#ec4899',
    icon: 'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.25 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z',
  },
  {
    name: 'On-Demand Services',
    desc: 'Delivery, gig & marketplace apps',
    href: '/#industries',
    color: '#f97316',
    icon: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  },
  {
    name: 'Social Networking',
    desc: 'Community & social media platforms',
    href: '/#industries',
    color: '#6366f1',
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  },
  {
    name: 'Fitness & Sports',
    desc: 'Workout tracking & sports analytics',
    href: '/#industries',
    color: '#22c55e',
    icon: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z',
  },
  {
    name: 'Food & Restaurant',
    desc: 'POS systems & food delivery apps',
    href: '/#industries',
    color: '#ef4444',
    icon: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z',
  },
  {
    name: 'Entertainment & Media',
    desc: 'Streaming, OTT & content platforms',
    href: '/#industries',
    color: '#a855f7',
    icon: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z',
  },
  {
    name: 'Logistics & Supply Chain',
    desc: 'Fleet management & tracking systems',
    href: '/#industries',
    color: '#14b8a6',
    icon: 'M17 8C8 10 5.9 16.17 3.82 22H5.71c.19-.53.39-1.05.59-1.55C7.62 16.55 10 14 17 14v4l5-5-5-5v4z',
  },
];

export default function BlogHeader() {
  const [open,            setOpen]            = useState(false);
  const [scrolled,        setScrolled]        = useState(false);
  const [megaOpen,        setMegaOpen]        = useState(false);
  const [activeCategory,  setActiveCategory]  = useState('web');
  const [indOpen,         setIndOpen]         = useState(false);
  const [mobServicesOpen, setMobServicesOpen] = useState(false);
  const [mobIndOpen,      setMobIndOpen]      = useState(false);

  const closeTimer    = useRef(null);
  const indCloseTimer = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const close = () => {
    setOpen(false);
    setMobServicesOpen(false);
    setMobIndOpen(false);
    setMegaOpen(false);
    setIndOpen(false);
    document.body.style.overflow = '';
  };

  /* Services mega handlers */
  const openMega   = () => { clearTimeout(closeTimer.current); setMegaOpen(true); setIndOpen(false); };
  const delayClose = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 160); };

  /* Industries mega handlers */
  const openInd     = () => { clearTimeout(indCloseTimer.current); setIndOpen(true); setMegaOpen(false); };
  const delayCloseInd = () => { indCloseTimer.current = setTimeout(() => setIndOpen(false), 160); };

  const activeCat = MEGA.find(c => c.id === activeCategory) || MEGA[0];

  return (
    <>
      {/* ── TOP CONTACT BAR ── */}
      <div className="bh-topbar">
        <a href="mailto:info@1solutions.biz" className="bh-topbar-link">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          info@1solutions.biz
        </a>
        <span className="bh-topbar-sep" aria-hidden="true" />
        <a href="tel:+919654327900" className="bh-topbar-link">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          +91 9654327900
        </a>
      </div>

      {/* ── MAIN HEADER ── */}
      <header className={`bh-header${scrolled ? ' bh-scrolled' : ''}`}>
        <div className="bh-inner">

          <Link href="/" className="bh-logo" onClick={close}>
            <Image
              src="/images/1solutions-logo.png"
              alt="1Solutions Logo"
              width={180} height={50} priority
              style={{ height: '50px', width: 'auto', maxWidth: '180px' }}
            />
          </Link>

          <nav>
            <ul className="bh-nav">

              {/* ── Services ── */}
              <li className="bh-services-item" onMouseEnter={openMega} onMouseLeave={delayClose}>
                <button
                  className={`bh-services-btn${megaOpen ? ' bh-services-btn-on' : ''}`}
                  onClick={() => { setMegaOpen(v => !v); setIndOpen(false); }}
                  aria-haspopup="true" aria-expanded={megaOpen}
                >
                  Services
                  <svg className={`bh-services-caret${megaOpen ? ' bh-caret-up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </li>

              {/* ── Industries ── */}
              <li className="bh-services-item" onMouseEnter={openInd} onMouseLeave={delayCloseInd}>
                <button
                  className={`bh-services-btn${indOpen ? ' bh-services-btn-on' : ''}`}
                  onClick={() => { setIndOpen(v => !v); setMegaOpen(false); }}
                  aria-haspopup="true" aria-expanded={indOpen}
                >
                  Industries
                  <svg className={`bh-services-caret${indOpen ? ' bh-caret-up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </li>

              <li><Link href="/portfolio"  onClick={close}>Portfolio</Link></li>
              <li><Link href="/blog"       onClick={close}>Insights</Link></li>
              <li><Link href="/who-we-are" onClick={close}>About Us</Link></li>
            </ul>
          </nav>

          <div className="bh-cta-wrap">
            <Link href="/contact" className="bh-cta" onClick={close}>Contact Us →</Link>
          </div>

          <button
            className={`bh-hamburger${open ? ' bh-open' : ''}`}
            onClick={toggle}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>

        </div>

        {/* ── SERVICES MEGA PANEL ── */}
        {megaOpen && (
          <div
            className="bh-mega"
            onMouseEnter={openMega}
            onMouseLeave={delayClose}
            role="dialog"
            aria-label="Services mega menu"
          >
            <div className="bh-mega-inner">
              <div className="bh-mega-left">
                <p className="bh-mega-left-heading">Our Services</p>
                {MEGA.map(cat => (
                  <button
                    key={cat.id}
                    className={`bh-mega-cat${activeCategory === cat.id ? ' bh-mega-cat-on' : ''}`}
                    style={activeCategory === cat.id ? { borderLeftColor: cat.color } : {}}
                    onMouseEnter={() => setActiveCategory(cat.id)}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span className="bh-mega-cat-dot" style={{ background: activeCategory === cat.id ? cat.color : 'rgba(255,255,255,0.18)' }} />
                    <span className="bh-mega-cat-name">{cat.label}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="12" height="12" aria-hidden="true">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                ))}
                <div className="bh-mega-all">
                  <Link href="/#services" onClick={close}>View all services →</Link>
                </div>
              </div>
              <div className="bh-mega-right">
                <p className="bh-mega-right-heading" style={{ color: activeCat.color }}>{activeCat.label}</p>
                <div className="bh-mega-grid">
                  {activeCat.services.map(svc => (
                    <Link key={svc.name} href={svc.href} className="bh-mega-svc" onClick={close}>
                      <span className="bh-mega-svc-dot" style={{ background: activeCat.color }} />
                      <span>
                        <span className="bh-mega-svc-name">{svc.name}</span>
                        <span className="bh-mega-svc-desc">{svc.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="bh-mega-footer">
                  <span>Not sure which service fits your needs?</span>
                  <Link href="/contact" className="bh-mega-footer-cta" onClick={close}>Talk to our team →</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── INDUSTRIES MEGA PANEL ── */}
        {indOpen && (
          <div
            className="bh-ind-mega"
            onMouseEnter={openInd}
            onMouseLeave={delayCloseInd}
            role="dialog"
            aria-label="Industries mega menu"
          >
            {/* Header bar */}
            <div className="bh-ind-head">
              <div>
                <span className="bh-ind-head-title">Industries We Serve</span>
                <span className="bh-ind-head-sub">End-to-end digital solutions across 12+ industries</span>
              </div>
              <Link href="/#industries" className="bh-ind-head-link" onClick={close}>
                View all industries →
              </Link>
            </div>

            {/* Industry cards grid */}
            <div className="bh-ind-grid">
              {INDUSTRIES.map(ind => (
                <Link key={ind.name} href={ind.href} className="bh-ind-card" onClick={close}>
                  <div className="bh-ind-icon" style={{ background: ind.color + '18', border: `1px solid ${ind.color}30` }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" style={{ fill: ind.color }}>
                      <path d={ind.icon} />
                    </svg>
                  </div>
                  <div>
                    <span className="bh-ind-name">{ind.name}</span>
                    <span className="bh-ind-desc">{ind.desc}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="bh-ind-footer">
              <span className="bh-ind-footer-text">Building digital products for 12+ industries since 2008</span>
              <Link href="/contact" className="bh-ind-footer-cta" onClick={close}>
                Discuss your project →
              </Link>
            </div>
          </div>
        )}

      </header>

      {/* ── MOBILE NAV ── */}
      <nav className={`bh-mobile${open ? ' bh-open' : ''}`} aria-hidden={!open}>

        {/* Services accordion */}
        <div className="bh-mob-services">
          <button className="bh-mob-svc-btn" onClick={() => setMobServicesOpen(v => !v)}>
            Services
            <svg className={`bh-mob-caret${mobServicesOpen ? ' bh-caret-up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {mobServicesOpen && (
            <div className="bh-mob-svc-panel">
              {MEGA.map(cat => (
                <div key={cat.id} className="bh-mob-cat">
                  <span className="bh-mob-cat-label" style={{ color: cat.color }}>{cat.label}</span>
                  {cat.services.map(svc => (
                    <Link key={svc.name} href={svc.href} className="bh-mob-svc-link" onClick={close}>{svc.name}</Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Industries accordion */}
        <div className="bh-mob-services">
          <button className="bh-mob-svc-btn" onClick={() => setMobIndOpen(v => !v)}>
            Industries
            <svg className={`bh-mob-caret${mobIndOpen ? ' bh-caret-up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {mobIndOpen && (
            <div className="bh-mob-svc-panel">
              <div className="bh-mob-ind-grid">
                {INDUSTRIES.map(ind => (
                  <Link key={ind.name} href={ind.href} className="bh-mob-ind-link" onClick={close}>
                    <span className="bh-mob-ind-dot" style={{ background: ind.color }} />
                    {ind.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/portfolio"  onClick={close}>Portfolio</Link>
        <Link href="/blog"       onClick={close}>Insights</Link>
        <Link href="/who-we-are" onClick={close}>About Us</Link>

        {/* Mobile contact info */}
        <div className="bh-mob-contact">
          <a href="mailto:info@1solutions.biz" className="bh-mob-contact-link">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            info@1solutions.biz
          </a>
          <a href="tel:+919654327900" className="bh-mob-contact-link">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            +91 9654327900
          </a>
        </div>

        <Link href="/contact" className="bh-mob-cta" onClick={close}>Contact Us →</Link>
      </nav>
    </>
  );
}
