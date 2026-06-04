'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─────────────────────────────────────────────────────────────
   Blog Header — exact match to /1Solutions/index.html
   Self-contained: no Tailwind, no shared CSS conflicts
───────────────────────────────────────────────────────────── */

const CSS = `
  .bh-header {
    position: sticky; top: 0; z-index: 1000;
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    height: 68px;
    display: flex; align-items: center;
    padding: 0 40px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: box-shadow 0.3s;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  .bh-header.bh-scrolled { box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
  .bh-inner {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; max-width: 1440px; margin: 0 auto;
  }
  .bh-logo {
    display: flex; align-items: center; height: 50px;
    min-width: fit-content; text-decoration: none; flex-shrink: 0;
  }
  .bh-logo img { height: 100%; width: auto; max-width: 180px; }
  .bh-nav {
    display: flex; align-items: center; gap: 40px;
    flex: 1; justify-content: center;
    list-style: none; margin: 0; padding: 0;
  }
  .bh-nav li { margin: 0; padding: 0; }
  .bh-nav a {
    text-decoration: none; color: #1f2937; font-weight: 500;
    font-size: 14px; padding: 8px 0; transition: color 0.2s; display: block;
  }
  .bh-nav a:hover { color: #114171; }
  .bh-cta-wrap { margin-left: auto; flex-shrink: 0; }
  .bh-cta {
    text-decoration: none; color: #ffffff; font-weight: 500;
    font-size: 14px; padding: 10px 20px; background: #114171;
    border: none; border-radius: 20px; transition: all 0.3s;
    display: inline-block; white-space: nowrap; cursor: pointer;
    box-shadow: 0 4px 15px rgba(17,65,113,0.2);
  }
  .bh-cta:hover {
    background: linear-gradient(90deg, #FE9700 0%, #114171 100%);
    color: #ffffff; box-shadow: 0 8px 25px rgba(254,151,0,0.3);
  }
  .bh-hamburger {
    display: none; flex-direction: column; justify-content: center;
    gap: 5px; background: none; border: none; cursor: pointer;
    padding: 6px; margin-left: 16px; z-index: 200;
  }
  .bh-hamburger span {
    display: block; width: 24px; height: 2px;
    background: #1f2937; border-radius: 2px; transition: all 0.3s ease;
  }
  .bh-hamburger.bh-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .bh-hamburger.bh-open span:nth-child(2) { opacity: 0; }
  .bh-hamburger.bh-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .bh-mobile {
    display: none; position: fixed;
    top: 68px; left: 0; right: 0; bottom: 0;
    background: #ffffff; z-index: 999;
    padding: 16px 24px; overflow-y: auto;
    flex-direction: column; gap: 0;
    border-top: 1px solid #e5e7eb;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  .bh-mobile.bh-open { display: flex; }
  .bh-mobile a {
    display: block; padding: 14px 0;
    border-bottom: 1px solid #e5e7eb;
    text-decoration: none; color: #1f2937;
    font-weight: 500; font-size: 16px; transition: color 0.2s;
  }
  .bh-mobile a:hover { color: #114171; }
  .bh-mobile .bh-mob-cta {
    display: block; margin-top: 20px; padding: 14px;
    text-align: center; background: #114171;
    color: #ffffff !important; border-radius: 8px;
    border: none !important; font-weight: 600;
    text-decoration: none;
  }
  .bh-mobile .bh-mob-cta:hover {
    background: linear-gradient(90deg, #FE9700, #114171);
  }
  @media (max-width: 768px) {
    .bh-nav, .bh-cta-wrap { display: none; }
    .bh-hamburger { display: flex; }
    .bh-header { padding: 0 20px; }
  }
`;

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
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

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
