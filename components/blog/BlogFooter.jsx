import Link from 'next/link';
import Image from 'next/image';

const SERVICE_BRANDS = [
  {
    name: 'Web Development',
    desc: 'Custom websites & apps',
    href: '/wordpress-development-company',
    color: '#4285F4',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    name: 'Digital Marketing',
    desc: 'SEO, PPC & content',
    href: '/seo-services-company',
    color: '#34A853',
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    name: 'eCommerce',
    desc: 'Shopify, WooCommerce & more',
    href: '/ecommerce-website-development-services',
    color: '#FF6900',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  },
  {
    name: 'Cloud & DevOps',
    desc: 'AWS, Azure & CI/CD',
    href: '/devops-services-company',
    color: '#00C2FF',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  },
  {
    name: 'Hire On Demand',
    desc: 'Vetted remote talent',
    href: '/hire-dedicated-resources',
    color: '#A855F7',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
];

const FOOTER_COLS = [
  {
    heading: 'Services',
    links: [
      ['WordPress Development',   '/wordpress-development-company'],
      ['Next.js Development',     '/nextjs-development-services'],
      ['Mobile App Development',  '/android-application-development-company'],
      ['SEO Services',            '/seo-services-company'],
      ['eCommerce Development',   '/ecommerce-website-development-services'],
      ['Cloud & DevOps',          '/devops-services-company'],
      ['Hire Developers',         '/hire-dedicated-resources'],
    ],
  },
  {
    heading: 'Industries',
    links: [
      ['Healthcare',              '/healthcare-software-development'],
      ['Finance & BFSI',          '/fintech-software-development-company'],
      ['Retail & eCommerce',      '/retail-ecommerce-software-development'],
      ['Education',               '/elearning-software-development-services'],
      ['Manufacturing',           '/manufacturing-software-development-services'],
      ['Real Estate',             '/real-estate-software-development'],
      ['SaaS',                    '/saas-application-development-company'],
    ],
  },
  {
    heading: 'Resources',
    links: [
      ['Blog & Insights',         '/blog'],
      ['Case Studies',            '/case-studies'],
      ['Portfolio',               '/portfolio'],
      ['Book Consultation',       '/book-consultation'],
      ['Open Positions',          '/open-positions'],
      ['Apply Online',            '/apply-online'],
    ],
  },
  {
    heading: 'Company',
    links: [
      ['Who We Are',              '/who-we-are'],
      ['Work Culture',            '/work-culture'],
      ['Contact Us',              '/contact'],
      ['Privacy Policy',          '/privacy-policy'],
      ['Terms of Use',            '/terms-of-use'],
      ['Cookie Policy',           '/cookie-policy'],
      ['Refund Policy',           '/refund-policy'],
    ],
  },
];

const SOCIAL = [
  {
    label: 'Facebook',
    href:  'https://www.facebook.com/1solutions',
    path:  'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/company/1solutions',
    path:  'M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.043-8.811 0-9.726h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.748-1.915-1.686 0-.955.768-1.686 1.959-1.686 1.19 0 1.916.73 1.916 1.686 0 .938-.726 1.686-1.96 1.686zm1.6 11.019H3.738V9.726h3.199v10.726zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z',
  },
  {
    label: 'Instagram',
    href:  'https://www.instagram.com/1solutions',
    path:  'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.63c-.89.344-1.649.849-2.366 1.566-.717.717-1.223 1.481-1.566 2.366-.297.788-.5 1.659-.56 2.937C.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.263 2.148.56 2.936.345.89.85 1.649 1.566 2.366.717.717 1.476 1.223 2.366 1.566.788.297 1.66.499 2.937.559C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.936-.559.89-.345 1.649-.849 2.366-1.566.717-.717 1.223-1.476 1.566-2.366.297-.788.499-1.66.559-2.937.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.559-2.937-.345-.89-.849-1.649-1.566-2.366C20.83 1.034 20.07.528 19.182.185 18.394-.112 17.523-.31 16.246-.37 14.966-.012 14.559 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.07 1.171.054 1.805.244 2.227.408.56.217 1.001.48 1.44.92.44.44.703.88.92 1.44.164.422.354 1.057.408 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.054 1.171-.244 1.805-.408 2.227-.217.56-.48 1.001-.92 1.44-.44.44-.88.703-1.44.92-.422.164-1.057.354-2.227.408-1.264.061-1.646.07-4.849.07s-3.585-.009-4.849-.07c-1.171-.054-1.805-.244-2.227-.408-.56-.217-1.001-.48-1.44-.92-.44-.44-.703-.88-.92-1.44-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.171.244-1.805.408-2.227.217-.56.48-1.001.92-1.44.44-.44.88-.703 1.44-.92.422-.164 1.057-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07z M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'X / Twitter',
    href:  'https://x.com/1solutions',
    path:  'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.694l-5.248-6.856-6.027 6.856H2.421l7.782-8.917L2.959 2.25h6.863l4.744 6.278 5.578-6.278z',
  },
  {
    label: 'YouTube',
    href:  'https://www.youtube.com/@1solutions',
    path:  'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

export default function BlogFooter() {
  return (
    <footer className="bf-footer">

      {/* ── SERVICE BRANDS ROW ── */}
      <div className="bf-brands-row">
        <div className="bf-wrap">
          {SERVICE_BRANDS.map(b => (
            <Link key={b.name} href={b.href} className="bf-brand-card">
              <span className="bf-brand-icon" style={{ color: b.color }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={b.icon} />
                </svg>
              </span>
              <span className="bf-brand-text">
                <span className="bf-brand-name">{b.name}</span>
                <span className="bf-brand-desc">{b.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── MAIN LINKS ── */}
      <div className="bf-main">
        <div className="bf-wrap bf-main-inner">

          {/* Logo + tagline */}
          <div className="bf-logo-col">
            <Link href="/">
              <Image
                src="/images/1solutions-logo.png"
                alt="1Solutions"
                width={160} height={44}
                style={{ height: '44px', width: 'auto', display: 'block' }}
              />
            </Link>
            <p className="bf-tagline">
              Award-winning web development &amp; digital marketing agency. 15+ years, 1200+ projects delivered across US, Canada &amp; Australia.
            </p>
            <address className="bf-address">
              47, Vijay Block, Laxmi Nagar<br />
              New Delhi – 110092, India<br />
              <a href="mailto:info@1solutions.biz">info@1solutions.biz</a><br />
              <a href="tel:+919654327900">+91 9654327900</a>
            </address>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.heading} className="bf-col">
              <h5>{col.heading}</h5>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="bf-bottom">
        <div className="bf-wrap bf-bottom-inner">

          <p className="bf-copyright">
            &copy; {new Date().getFullYear()} 1Solutions. All rights reserved.
          </p>

          <nav className="bf-legal-links" aria-label="Legal">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-use">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Preferences</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </nav>

          <div className="bf-social-icons">
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} className="bf-social-icon" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}
