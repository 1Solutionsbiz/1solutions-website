'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─────────────────────────────────────────────────────────────
   Blog Header — exact match to /1Solutions/index.html
   Self-contained: no Tailwind, no shared CSS conflicts
───────────────────────────────────────────────────────────── */


export default function BlogHeader() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
  const close = () => { setOpen(false); document.body.style.overflow = ''; };

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
              <li><Link href="/#services"         onClick={close}>Services</Link></li>
              <li><Link href="/#industries"        onClick={close}>Industries</Link></li>
              <li><Link href="/#success-stories"   onClick={close}>Success Stories</Link></li>
              <li><Link href="/blog"               onClick={close}>Insights</Link></li>
              <li><Link href="/#about"             onClick={close}>About Us</Link></li>
            </ul>
          </nav>

          <div className="bh-cta-wrap">
            <Link href="/#contact" className="bh-cta" onClick={close}>Contact Us →</Link>
          </div>

          <button
            className={`bh-hamburger${open ? ' bh-open' : ''}`}
            onClick={toggle}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>

        </div>
      </header>

      <nav className={`bh-mobile${open ? ' bh-open' : ''}`}>
        <Link href="/#services"        onClick={close}>Services</Link>
        <Link href="/#industries"      onClick={close}>Industries</Link>
        <Link href="/#success-stories" onClick={close}>Success Stories</Link>
        <Link href="/blog"             onClick={close}>Insights</Link>
        <Link href="/#about"           onClick={close}>About Us</Link>
        <Link href="/#contact" className="bh-mob-cta" onClick={close}>Contact Us →</Link>
      </nav>
    </>
  );
}
