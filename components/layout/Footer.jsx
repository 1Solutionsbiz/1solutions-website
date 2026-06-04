import Link from 'next/link';
import Image from 'next/image';

const SOCIAL = [
  { href: 'https://www.facebook.com/1solutions',   label: 'Facebook',   icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
  { href: 'https://www.linkedin.com/company/1solutions', label: 'LinkedIn', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.043-8.811 0-9.726h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.748-1.915-1.686 0-.955.768-1.686 1.959-1.686 1.19 0 1.916.73 1.916 1.686 0 .938-.726 1.686-1.96 1.686zm1.6 11.019H3.738V9.726h3.199v10.726zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/> },
  { href: 'https://x.com/1solutions',              label: 'Twitter/X',  icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.694l-5.248-6.856-6.027 6.856H2.421l7.782-8.917L2.959 2.25h6.863l4.744 6.278 5.578-6.278z"/> },
  { href: 'https://www.instagram.com/1solutions',  label: 'Instagram',  icon: <><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.63c-.89.344-1.649.849-2.366 1.566C1.034 2.913.528 3.677.185 4.562c-.297.788-.5 1.659-.56 2.937C-.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.263 2.148.56 2.936.345.89.85 1.649 1.566 2.366.717.717 1.476 1.223 2.366 1.566.788.297 1.66.499 2.937.559C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.936-.559.89-.345 1.649-.849 2.366-1.566.717-.717 1.223-1.476 1.566-2.366.297-.788.499-1.66.559-2.937.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.559-2.937-.345-.89-.849-1.649-1.566-2.366C20.83 1.034 20.07.528 19.182.185 18.394-.112 17.523-.31 16.246-.37 14.966-.012 14.559 0 12 0z"/><circle cx="12" cy="12" r="3.305"/></> },
  { href: 'https://www.youtube.com/@1solutions',   label: 'YouTube',    icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/> },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-top-section">
          <div className="footer-container">

            {/* Left */}
            <div className="footer-left">
              <Link href="/">
                <Image src="/images/logo-white.png" alt="1Solutions" width={160} height={44} className="footer-logo" style={{ height: '44px', width: 'auto' }} />
              </Link>
              <p className="footer-description">
                We are a trusted web development and digital marketing company helping businesses of varying scales build scalable digital products and drive measurable growth.
              </p>
              <div className="footer-social-icons">
                {SOCIAL.map(({ href, label, icon }) => (
                  <a key={label} href={href} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{icon}</svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Right columns */}
            <div className="footer-right">
              <div className="footer-col">
                <h5>BUILD</h5>
                <ul>
                  {[['Web Development','/web-development'],['Mobile Apps','/mobile-app-development'],['eCommerce','/ecommerce-development'],['Custom Software','/custom-software-development'],['UI/UX Design','/ui-ux-design']].map(([l,h])=>(
                    <li key={h}><Link href={h}>{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="footer-col">
                <h5>GROW</h5>
                <ul>
                  {[['SEO Services','/seo-services'],['PPC / Google Ads','/ppc-management'],['Social Media','/social-media-marketing'],['Content Marketing','/content-marketing'],['Email Marketing','/email-marketing']].map(([l,h])=>(
                    <li key={h}><Link href={h}>{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="footer-col">
                <h5>SCALE</h5>
                <ul>
                  {[['Hire Developers','/hire-dedicated-developers'],['Hire SEO Experts','/hire-seo-experts'],['Staff Augmentation','/staff-augmentation'],['Digital Consulting','/digital-consulting']].map(([l,h])=>(
                    <li key={h}><Link href={h}>{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="footer-col">
                <h5>COMPANY</h5>
                <ul>
                  {[['About Us','/about'],['Case Studies','/case-studies'],['Blog','/blog'],['Careers','/careers'],['Contact Us','/contact']].map(([l,h])=>(
                    <li key={h}><Link href={h}>{l}</Link></li>
                  ))}
                </ul>
                <div className="office-info" style={{ marginTop: '20px' }}>
                  <strong>India (HQ)</strong>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', lineHeight: 1.6 }}>
                    47, Vijay Block, Laxmi Nagar<br />New Delhi – 110092<br />
                    <a href="mailto:info@1solutions.biz" style={{ color: 'rgba(255,255,255,0.6)' }}>info@1solutions.biz</a><br />
                    <a href="tel:+919654327900" style={{ color: 'rgba(255,255,255,0.6)' }}>+91 9654327900</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom-section">
          <div className="footer-container" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div className="footer-certifications">
              <Image src="/images/trustpilot.svg"       alt="Trustpilot"        width={80}  height={28} className="cert-logo" style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.5 }} />
              <Image src="/images/google-business.svg"  alt="Google Business"   width={70}  height={28} className="cert-logo" style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.5 }} />
              <Image src="/images/iso-9001.png"          alt="ISO 9001:2015"     width={50}  height={50} className="cert-logo" style={{ height: '36px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.5 }} />
              <Image src="/images/msme.png"              alt="MSME"              width={50}  height={28} className="cert-logo" style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.5 }} />
              <Image src="/images/dmca.png"              alt="DMCA Protected"    width={50}  height={28} className="cert-logo" style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.5 }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="footer-rating">⭐⭐⭐⭐⭐ Rated 4.7 by 375+ Clients</p>
              <p className="footer-copyright">All Rights Reserved © 1Solutions {new Date().getFullYear()}</p>
              <div className="footer-legal-links">
                <Link href="/terms-of-use">Terms of Use</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/gdpr">GDPR</Link>
                <Link href="/sitemap.xml">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
