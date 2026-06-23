'use client';
import Link from 'next/link';
import Image from 'next/image';

const COLS = [
  {
    heading: 'Company',
    links: [
      ['Who We Are',          '/who-we-are'],
      ['Work Culture',        '/work-culture'],
      ['Corporate Responsibility', '/who-we-are'],
      ['Partner with Us',     '/contact'],
      ['Contact Us',          '/contact'],
    ],
  },
  {
    heading: 'For Startups & SMBs',
    links: [
      ['WordPress Development',  '/wordpress-development-company'],
      ['Next.js Development',    '/nextjs-development-services'],
      ['Mobile App Development', '/android-application-development-company'],
      ['eCommerce Development',  '/ecommerce-website-development-services'],
      ['UI/UX Design',           '/website-design'],
      ['SEO Services',           '/seo-services-company'],
      ['PPC Management',         '/ppc-management-services'],
      ['Email Marketing',        '/email-marketing-services'],
    ],
  },
  {
    heading: 'For Enterprises',
    links: [
      ['Cloud Migration',        '/cloud-migration-services'],
      ['DevOps Services',        '/devops-services-company'],
      ['ERP Development',        '/erp-application-development-company'],
      ['CRM Development',        '/crm-application-development-company'],
      ['Staff Augmentation',     '/it-staff-augmentation-services'],
      ['Offshore Development',   '/offshore-development-company'],
      ['Virtual CTO',            '/virtual-cto-services'],
      ['IT Outsourcing',         '/it-outsourcing-services'],
    ],
  },
  {
    heading: 'For Developers & Agencies',
    links: [
      ['Hire React Developer',      '/hire-reactjs-developer'],
      ['Hire Node.js Developer',    '/hire-nodejs-developer'],
      ['Hire WordPress Developer',  '/hire-wordpress-developer'],
      ['Hire Python Developer',     '/hire-python-developer'],
      ['Hire Shopify Developer',    '/hire-shopify-developer'],
      ['Hire UI/UX Designer',       '/hire-ui-ux-designer'],
      ['Hire Full Stack Developer', '/hire-full-stack-developer'],
    ],
  },
];

const TRUST_BADGES = [
  { src: '/images/dmca.png',            alt: 'DMCA Protected',          href: 'https://www.dmca.com' },
  { src: '/images/iso.png',              alt: 'ISO 9001:2015 Certified', href: '/who-we-are' },
  { src: '/images/msme.png',            alt: 'MSME Registered',         href: '/who-we-are' },
  { src: '/images/trustpilot.svg',      alt: 'Trustpilot',              href: 'https://www.trustpilot.com/review/1solutions.biz', nofollow: true },
  { src: '/images/gmb.png',             alt: 'Google Business Profile', href: 'https://g.co/kgs/4BCmrBR', nofollow: true },
];

const BOTTOM_NAV = [
  ['About 1Solutions', '/who-we-are'],
  ['Join Our Team',    '/open-positions'],
  ['Press Room',       '/blog'],
  ['Accessibility',    '/who-we-are'],
  ['Terms and Conditions', '/terms-of-use'],
];

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/1solutions',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: 'X',
    href: 'https://x.com/1solutions',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.694l-5.248-6.856-6.027 6.856H2.421l7.782-8.917L2.959 2.25h6.863l4.744 6.278 5.578-6.278z"/></svg>,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@1solutions',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/1solutions',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.043-8.811 0-9.726h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.748-1.915-1.686 0-.955.768-1.686 1.959-1.686 1.19 0 1.916.73 1.916 1.686 0 .938-.726 1.686-1.96 1.686zm1.6 11.019H3.738V9.726h3.199v10.726zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>,
  },
];

export default function BlogFooter() {
  return (
    <footer className="bf-footer">

      {/* ── LINK COLUMNS ── */}
      <div className="bf-cols-wrap">
        <div className="bf-inner">
          {COLS.map(col => (
            <div key={col.heading} className="bf-col">
              <h3 className="bf-col-heading">{col.heading}</h3>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={label}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── SITEMAP (left) + RATING (center) + SOCIAL ICONS (right) STRIP ── */}
      <div className="bf-search-strip">
        <div className="bf-inner bf-search-inner">
          <Link href="/sitemap" className="bf-sitemap-link">Sitemap</Link>
          <div className="bf-rating-badge">
            <span className="bf-rating-stars">★★★★★</span>
            <span className="bf-rating-text">Rated 5/5 by 375 clients</span>
          </div>
          <div className="bf-social-row">
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} className="bf-social-icon" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BRAND SECTION — 3 columns ── */}
      <div className="bf-brand-section">
        <div className="bf-inner bf-brand-inner">

          {/* Col 1: logo + nav links */}
          <div className="bf-brand-left">
            <Link href="/">
              <Image
                src="/images/1solutions-logo-white.png"
                alt="1Solutions"
                width={140} height={38}
                style={{ height: '38px', width: 'auto', display: 'block', marginBottom: '20px' }}
              />
            </Link>
            <nav className="bf-brand-nav">
              {BOTTOM_NAV.map(([label, href]) => (
                <Link key={label} href={href}>{label}</Link>
              ))}
            </nav>
          </div>

          {/* Col 2 (middle): copyright + legal text + badge logos in one row */}
          <div className="bf-brand-middle">
            <p className="bf-copyright">
              &copy; {new Date().getFullYear()} 1Solutions. All rights reserved.
            </p>
            <p className="bf-legal-text">
              1Solutions is a full service web development and digital marketing company helping businesses build, grow, and scale their online presence through innovative technology and results driven marketing solutions.
            </p>
            <p className="bf-legal-text">
              Service offerings, features, support plans, pricing, and terms may be modified at our discretion without prior notice.
            </p>
            <div className="bf-trust-badges">
              {TRUST_BADGES.map(b => (
                <a
                  key={b.alt}
                  href={b.href}
                  target={b.href.startsWith('http') ? '_blank' : undefined}
                  rel={b.href.startsWith('http') ? `noopener noreferrer${b.nofollow ? ' nofollow' : ''}` : undefined}
                  className="bf-badge-link"
                >
                  <Image src={b.src} alt={b.alt} width={100} height={36} style={{ height: '30px', width: 'auto', objectFit: 'contain' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 (right): legal links + registered office below */}
          <div className="bf-brand-right">
            <nav className="bf-legal-links">
              <Link href="/terms-of-use">Legal</Link>
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/cookie-policy">Security</Link>
              <Link href="/privacy-policy">Compliance</Link>
            </nav>
            <p className="bf-legal-text" style={{ marginTop: '12px' }}>
              Registered office:<br />
              47, Vijay Block, Laxmi Nagar,<br />
              New Delhi – 110092, India.<br />
              <a href="mailto:info@1solutions.biz">info@1solutions.biz</a><br />
              <a href="tel:+919654327900">+91 9654327900</a>
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}
