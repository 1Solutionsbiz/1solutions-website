import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-inner">

          {/* ── Left: Logo + Description + Social ── */}
          <div className="footer-left">
            <Link href="/">
              <Image
                src="/images/1solutions-logo.png"
                alt="1Solutions Logo"
                width={180}
                height={50}
                className="footer-logo-img"
                style={{ height: '44px', width: 'auto' }}
              />
            </Link>
            <p className="footer-desc">
              We are a trusted web development and digital marketing company helping businesses of varying scales build scalable digital products and drive measurable growth.
            </p>

            <ul className="footer-social">
              <li>
                <a href="https://www.facebook.com/1solutions" title="Facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/1solutions" title="LinkedIn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.043-8.811 0-9.726h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.748-1.915-1.686 0-.955.768-1.686 1.959-1.686 1.19 0 1.916.73 1.916 1.686 0 .938-.726 1.686-1.96 1.686zm1.6 11.019H3.738V9.726h3.199v10.726zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/1solutions" title="Instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.63c-.89.344-1.649.849-2.366 1.566-.717.717-1.223 1.481-1.566 2.366-.297.788-.5 1.659-.56 2.937C.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.263 2.148.56 2.936.345.89.85 1.649 1.566 2.366.717.717 1.476 1.223 2.366 1.566.788.297 1.66.499 2.937.559C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.936-.559.89-.345 1.649-.849 2.366-1.566.717-.717 1.223-1.476 1.566-2.366.297-.788.499-1.66.559-2.937.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.559-2.937-.345-.89-.849-1.649-1.566-2.366-.717-.717-1.476-1.223-2.366-1.566-.788-.297-1.66-.499-2.937-.559C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.07 1.171.054 1.805.244 2.227.408.56.217 1.001.48 1.44.92.44.44.703.88.92 1.44.164.422.354 1.057.408 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.054 1.171-.244 1.805-.408 2.227-.217.56-.48 1.001-.92 1.44-.44.44-.88.703-1.44.92-.422.164-1.057.354-2.227.408-1.264.061-1.646.07-4.849.07s-3.585-.009-4.849-.07c-1.171-.054-1.805-.244-2.227-.408-.56-.217-1.001-.48-1.44-.92-.44-.44-.703-.88-.92-1.44-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.171.244-1.805.408-2.227.217-.56.48-1.001.92-1.44.44-.44.88-.703 1.44-.92.422-.164 1.057-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07z"/><circle cx="12" cy="12" r="3.305"/></svg>
                </a>
              </li>
              <li>
                <a href="https://x.com/1solutions" title="Twitter/X" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.694l-5.248-6.856-6.027 6.856H2.421l7.782-8.917L2.959 2.25h6.863l4.744 6.278 5.578-6.278zM17.15 18.75h1.828L5.293 4.002H3.622l13.528 14.748z"/></svg>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@1solutions" title="YouTube" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </li>
            </ul>
          </div>

          {/* ── Right: 4 columns ── */}
          <div className="footer-cols">

            <div className="footer-col">
              <h5>SERVICES</h5>
              <ul>
                <li><Link href="/web-development">Web Development</Link></li>
                <li><Link href="/mobile-app-development">Mobile Applications</Link></li>
                <li><Link href="/digital-marketing">Digital Marketing</Link></li>
                <li><Link href="/devops-cloud">DevOps &amp; Cloud</Link></li>
                <li><Link href="/ecommerce-development">E-Commerce Development</Link></li>
                <li><Link href="/enterprise-software">Enterprise Software</Link></li>
                <li><Link href="/sitemap">View Full Sitemap</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>INDUSTRIES</h5>
              <ul>
                <li><Link href="/industries/technology">Technology</Link></li>
                <li><Link href="/industries/edtech">EdTech</Link></li>
                <li><Link href="/industries/finance">Finance &amp; Banking</Link></li>
                <li><Link href="/industries/healthcare">Healthcare</Link></li>
                <li><Link href="/industries/ecommerce">Retail &amp; E-Commerce</Link></li>
                <li><Link href="/industries/manufacturing">Manufacturing</Link></li>
                <li><Link href="/industries">All Industries →</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>COMPANY</h5>
              <ul>
                <li><Link href="/#about">Why 1Solutions</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/#process">How We Work</Link></li>
                <li><Link href="/case-studies">Success Stories</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/#contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>GLOBAL OFFICES</h5>
              <div className="office-info">
                <strong>India (HQ)</strong>
                <div className="office-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <p>47, Vijay Block<br />Laxmi Nagar<br />New Delhi – 110092, India</p>
                </div>
                <div className="office-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <p><a href="mailto:info@1solutions.biz">info@1solutions.biz</a></p>
                </div>
                <div className="office-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <p><a href="tel:+919654327900">+91 9654327900</a></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider" />

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">

          <div className="footer-certs">
            <Image src="/images/trustpilot.svg"      alt="Trustpilot"       width={80}  height={28} className="footer-cert-img" style={{ height: '28px', width: 'auto' }} />
            <Image src="/images/google-business.svg" alt="Google Business"  width={70}  height={28} className="footer-cert-img" style={{ height: '28px', width: 'auto' }} />
            <Image src="/images/iso-9001.png"         alt="ISO 9001:2015"    width={50}  height={50} className="footer-cert-img" style={{ height: '36px', width: 'auto' }} />
            <Image src="/images/msme.png"             alt="MSME"             width={50}  height={28} className="footer-cert-img" style={{ height: '28px', width: 'auto' }} />
            <Image src="/images/dmca.png"             alt="DMCA Protected"   width={50}  height={28} className="footer-cert-img" style={{ height: '28px', width: 'auto' }} />
          </div>

          <div className="footer-bottom-right">
            <p className="footer-rating">⭐⭐⭐⭐⭐ Rated 4.7 by 375 Clients | <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer">Rate Now</a></p>
            <p className="footer-copy">All Rights Reserved &copy; 1Solutions {new Date().getFullYear()}</p>
            <ul className="footer-legal">
              <li><Link href="/terms-of-use">Terms of Use</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/gdpr">GDPR</Link></li>
              <li><Link href="/sitemap">Sitemap</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
