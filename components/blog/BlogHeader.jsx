'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MEGA = [
  {
    id: 'web',
    label: 'Web Development',
    color: '#0ea5e9',
    services: [
      { name: 'Python Development',       desc: 'Django & Flask web applications',      href: '/python-development-services/' },
      { name: 'Laravel Development',       desc: 'Robust PHP Laravel solutions',         href: '/laravel-development-company/' },
      { name: 'CodeIgniter Development',   desc: 'Lightweight PHP web apps',             href: '/codeigniter-development-company/' },
      { name: 'Drupal Development',        desc: 'Enterprise CMS platforms',             href: '/drupal-development-company/' },
      { name: 'WordPress Development',     desc: 'Custom themes, plugins & sites',       href: '/#services' },
      { name: 'PHP Development',           desc: 'Bespoke PHP web applications',         href: '/#services' },
    ],
  },
  {
    id: 'ecommerce',
    label: 'eCommerce',
    color: '#f59e0b',
    services: [
      { name: 'eCommerce Development',     desc: 'End-to-end online store builds',       href: '/ecommerce-website-development/' },
      { name: 'Magento Development',       desc: 'Enterprise Magento 2 solutions',       href: '/magento-development-company/' },
      { name: 'WooCommerce Development',   desc: 'WordPress-powered online stores',      href: '/woocommerce-development-company/' },
      { name: 'OpenCart Development',      desc: 'Scalable OpenCart storefronts',        href: '/opencart-development-company/' },
      { name: 'Shopify Development',       desc: 'Custom Shopify stores & apps',         href: '/#services' },
      { name: 'B2B eCommerce',             desc: 'Wholesale & trade portal solutions',   href: '/#services' },
    ],
  },
  {
    id: 'marketing',
    label: 'Digital Marketing',
    color: '#10b981',
    services: [
      { name: 'SEO Packages',              desc: 'Affordable monthly SEO plans',         href: '/affordable-seo-packages/' },
      { name: 'PPC Advertising',           desc: 'Google & Meta Ads management',         href: '/#services' },
      { name: 'Social Media Marketing',    desc: 'Brand growth on social platforms',     href: '/#services' },
      { name: 'Content Marketing',         desc: 'SEO content that ranks & converts',    href: '/#services' },
      { name: 'Email Marketing',           desc: 'Automated drip campaigns',             href: '/#services' },
      { name: 'Analytics & CRO',           desc: 'Data-driven growth optimisation',      href: '/#services' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile Apps',
    color: '#8b5cf6',
    services: [
      { name: 'iOS App Development',       desc: 'Native Swift & Xcode apps',            href: '/#services' },
      { name: 'Android App Development',   desc: 'Native Kotlin applications',           href: '/#services' },
      { name: 'React Native',              desc: 'Cross-platform mobile apps',           href: '/#services' },
      { name: 'Flutter Development',       desc: 'Beautiful cross-platform UIs',         href: '/#services' },
      { name: 'App UI/UX Design',          desc: 'Intuitive mobile experiences',         href: '/#services' },
      { name: 'App Maintenance',           desc: 'Ongoing updates & support',            href: '/#services' },
    ],
  },
  {
    id: 'design',
    label: 'UI/UX Design',
    color: '#ec4899',
    services: [
      { name: 'Website Design',            desc: 'Conversion-focused web design',        href: '/#services' },
      { name: 'Mobile App Design',         desc: 'iOS & Android UI design',              href: '/#services' },
      { name: 'Brand Identity',            desc: 'Logo, colours & typography systems',   href: '/#services' },
      { name: 'Design Systems',            desc: 'Scalable component libraries',         href: '/#services' },
      { name: 'Prototyping',               desc: 'Interactive wireframes & flows',       href: '/#services' },
      { name: 'UX Research',               desc: 'User testing & journey mapping',       href: '/#services' },
    ],
  },
];

export default function BlogHeader() {
  const [open,               setOpen]               = useState(false);
  const [scrolled,           setScrolled]           = useState(false);
  const [megaOpen,           setMegaOpen]           = useState(false);
  const [activeCategory,     setActiveCategory]     = useState('web');
  const [mobServicesOpen,    setMobServicesOpen]    = useState(false);
  const closeTimer = useRef(null);

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
    setMegaOpen(false);
    document.body.style.overflow = '';
  };

  const openMega   = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
  const delayClose = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 160); };

  const activeCat = MEGA.find(c => c.id === activeCategory) || MEGA[0];

  return (
    <>
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

              {/* Services — mega menu trigger */}
              <li
                className="bh-services-item"
                onMouseEnter={openMega}
                onMouseLeave={delayClose}
              >
                <button
                  className={`bh-services-btn${megaOpen ? ' bh-services-btn-on' : ''}`}
                  onClick={() => setMegaOpen(v => !v)}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                >
                  Services
                  <svg
                    className={`bh-services-caret${megaOpen ? ' bh-caret-up' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" width="13" height="13"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </li>

              <li><Link href="/#industries"  onClick={close}>Industries</Link></li>
              <li><Link href="/portfolio"    onClick={close}>Portfolio</Link></li>
              <li><Link href="/blog"         onClick={close}>Insights</Link></li>
              <li><Link href="/who-we-are"   onClick={close}>About Us</Link></li>
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

        {/* ── Mega menu panel ── */}
        {megaOpen && (
          <div
            className="bh-mega"
            onMouseEnter={openMega}
            onMouseLeave={delayClose}
            role="dialog"
            aria-label="Services mega menu"
          >
            <div className="bh-mega-inner">

              {/* Left sidebar — category list */}
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
                    <span
                      className="bh-mega-cat-dot"
                      style={{ background: activeCategory === cat.id ? cat.color : 'rgba(255,255,255,0.18)' }}
                    />
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

              {/* Right — services grid for active category */}
              <div className="bh-mega-right">
                <p className="bh-mega-right-heading" style={{ color: activeCat.color }}>
                  {activeCat.label}
                </p>
                <div className="bh-mega-grid">
                  {activeCat.services.map(svc => (
                    <Link
                      key={svc.name}
                      href={svc.href}
                      className="bh-mega-svc"
                      onClick={close}
                    >
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
                  <Link href="/contact" className="bh-mega-footer-cta" onClick={close}>
                    Talk to our team →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

      </header>

      {/* ── Mobile nav ── */}
      <nav className={`bh-mobile${open ? ' bh-open' : ''}`} aria-hidden={!open}>

        {/* Services — expandable accordion */}
        <div className="bh-mob-services">
          <button
            className="bh-mob-svc-btn"
            onClick={() => setMobServicesOpen(v => !v)}
          >
            Services
            <svg
              className={`bh-mob-caret${mobServicesOpen ? ' bh-caret-up' : ''}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" width="16" height="16"
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {mobServicesOpen && (
            <div className="bh-mob-svc-panel">
              {MEGA.map(cat => (
                <div key={cat.id} className="bh-mob-cat">
                  <span className="bh-mob-cat-label" style={{ color: cat.color }}>{cat.label}</span>
                  {cat.services.map(svc => (
                    <Link key={svc.name} href={svc.href} className="bh-mob-svc-link" onClick={close}>
                      {svc.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <Link href="/#industries"  onClick={close}>Industries</Link>
        <Link href="/portfolio"    onClick={close}>Portfolio</Link>
        <Link href="/blog"         onClick={close}>Insights</Link>
        <Link href="/who-we-are"   onClick={close}>About Us</Link>
        <Link href="/contact" className="bh-mob-cta" onClick={close}>Contact Us →</Link>
      </nav>
    </>
  );
}
