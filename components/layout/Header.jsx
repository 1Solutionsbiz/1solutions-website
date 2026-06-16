'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const industryLinks = [
  { label: 'Education',    href: '/elearning-software-development-services' },
  { label: 'Real Estate',  href: '/real-estate-software-development' },
  { label: 'Manufacturing',href: '/manufacturing-software-development-services' },
  { label: 'Travel',       href: '/travel-and-tourism-software-solutions' },
  { label: 'Social Media', href: '/social-media-app-development-company' },
  { label: 'Wellness',     href: '/wellness-software-development' },
  { label: 'Agriculture',  href: '/agriculture-software-development' },
  { label: 'Automotive',   href: '/automotive-software-solutions' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const close = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-container">

          {/* Logo */}
          <Link href="/" className="header-logo" onClick={close}>
            <Image
              src="/images/1solutions-logo.png"
              alt="1Solutions Logo"
              width={180}
              height={50}
              priority
              style={{ height: '50px', width: 'auto', maxWidth: '180px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav>
            <ul className="header-nav">
              <li><Link href="/#services"        className="nav-link">Services</Link></li>
              <li className="nav-dropdown-wrap">
                <Link href="/#industries" className="nav-link nav-dropdown-trigger">Industries ▾</Link>
                <ul className="nav-dropdown">
                  {industryLinks.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="nav-dropdown-link" onClick={close}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li><Link href="/#success-stories"  className="nav-link">Success Stories</Link></li>
              <li><Link href="/blog"              className="nav-link">Insights</Link></li>
              <li><Link href="/#about"            className="nav-link">About Us</Link></li>
            </ul>
          </nav>

          {/* Contact CTA */}
          <div className="header-contact">
            <Link href="/#contact" className="header-cta">Contact Us →</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger${mobileOpen ? ' active' : ''}`}
            onClick={toggle}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>

        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <nav className={`mobile-nav${mobileOpen ? ' active' : ''}`} aria-hidden={!mobileOpen}>
        <Link href="/#services"       onClick={close}>Services</Link>
        <Link href="/#industries"     onClick={close}>Industries</Link>
        <div className="mobile-industry-links">
          {industryLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="mobile-industry-link" onClick={close}>{label}</Link>
          ))}
        </div>
        <Link href="/#success-stories" onClick={close}>Success Stories</Link>
        <Link href="/blog"            onClick={close}>Insights</Link>
        <Link href="/#about"          onClick={close}>About Us</Link>
        <Link href="/#contact" className="mobile-cta" onClick={close}>Contact Us →</Link>
      </nav>
    </>
  );
}
