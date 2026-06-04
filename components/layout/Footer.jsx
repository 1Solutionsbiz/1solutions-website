import Link from 'next/link';
import Image from 'next/image';

/**
 * Site Footer — self-contained, light warm gradient (matching blog footer).
 * Uses scoped hf-* classes with inline <style> to avoid Tailwind v4 conflicts.
 */
export default function Footer() {
  return (
    <>
      <style>{`
        .hf-footer {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 14px;
        }
        .hf-top, .hf-bottom {
          background: linear-gradient(135deg, rgba(254,243,199,0.5) 0%, rgba(233,212,255,0.3) 100%);
          color: #1f2937;
        }
        .hf-top { padding: 60px 0; }
        .hf-wrap {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .hf-top .hf-wrap {
          display: flex;
          gap: 60px;
          align-items: flex-start;
        }
        .hf-left { flex: 0 0 30%; }
        .hf-desc {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
          margin: 0 0 24px;
        }
        .hf-social { display: flex; gap: 12px; flex-wrap: wrap; }
        .hf-si {
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .hf-si:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0,0,0,0.15); }
        .hf-fb { background: #1877F2; } .hf-fb:hover { background: #0d65d9; }
        .hf-li { background: #0A66C2; } .hf-li:hover { background: #0956a8; }
        .hf-ig { background: linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); }
        .hf-x  { background: #000; } .hf-x:hover  { background: #333; }
        .hf-yt { background: #FF0000; } .hf-yt:hover { background: #cc0000; }

        .hf-right {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 40px;
        }
        .hf-col h5 {
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          color: #06B6D4; margin: 0 0 20px; letter-spacing: 0.5px;
        }
        .hf-col ul { list-style: none; padding: 0; margin: 0; }
        .hf-col li { margin-bottom: 12px; }
        .hf-col a { color: #1f2937; text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .hf-col a:hover { color: #114171; }

        .hf-office strong { display: block; color: #114171; margin-bottom: 8px; font-weight: 600; }
        .hf-oitem { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 12px; }
        .hf-oitem svg { flex-shrink: 0; margin-top: 2px; color: #114171; }
        .hf-oitem p { color: #6b7280; line-height: 1.7; margin: 0; font-size: 13px; }
        .hf-oitem a { color: #1f2937; text-decoration: none; transition: color 0.2s; }
        .hf-oitem a:hover { color: #114171; }

        .hf-bottom { padding: 30px 0; }
        .hf-bottom .hf-wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .hf-certs { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
        .hf-cert { height: 48px; width: auto; max-width: 120px; object-fit: contain; }
        .hf-bright { text-align: right; }
        .hf-rating { font-size: 13px; color: #1f2937; margin: 0 0 8px; font-weight: 500; }
        .hf-rating a { color: #114171; text-decoration: none; }
        .hf-rating a:hover { color: #06B6D4; }
        .hf-copy { font-size: 12px; color: #6b7280; margin: 0 0 12px; }
        .hf-legal { display: flex; justify-content: flex-end; gap: 20px; flex-wrap: wrap; }
        .hf-legal a { font-size: 12px; color: #6b7280; text-decoration: none; transition: color 0.2s; }
        .hf-legal a:hover { color: #114171; }

        @media (max-width: 1024px) {
          .hf-right { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .hf-top .hf-wrap { flex-direction: column; gap: 32px; }
          .hf-left { flex: none; width: 100%; }
          .hf-right { grid-template-columns: repeat(2,1fr); gap: 28px; }
          .hf-wrap { padding: 0 20px; }
          .hf-top { padding: 40px 0; }
          .hf-bottom .hf-wrap { flex-direction: column; align-items: flex-start; gap: 20px; }
          .hf-bright { text-align: left; }
          .hf-legal { justify-content: flex-start; }
        }
        @media (max-width: 480px) {
          .hf-right { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="hf-footer">

        {/* TOP */}
        <div className="hf-top">
          <div className="hf-wrap">

            {/* Left */}
            <div className="hf-left">
              <Link href="/">
                <Image src="/images/1solutions-logo.png" alt="1Solutions Logo"
                  width={180} height={50}
                  style={{ height:'50px', width:'auto', marginBottom:'20px', display:'block' }} />
              </Link>
              <p className="hf-desc">
                We are a trusted web development and digital marketing company helping businesses of varying scales build scalable digital products and drive measurable growth.
              </p>
              <div className="hf-social">
                <a href="https://www.facebook.com/1solutions" className="hf-si hf-fb" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/1solutions" className="hf-si hf-li" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.043-8.811 0-9.726h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.748-1.915-1.686 0-.955.768-1.686 1.959-1.686 1.19 0 1.916.73 1.916 1.686 0 .938-.726 1.686-1.96 1.686zm1.6 11.019H3.738V9.726h3.199v10.726zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
                </a>
                <a href="https://www.instagram.com/1solutions" className="hf-si hf-ig" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.63c-.89.344-1.649.849-2.366 1.566-.717.717-1.223 1.481-1.566 2.366-.297.788-.5 1.659-.56 2.937C.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.263 2.148.56 2.936.345.89.85 1.649 1.566 2.366.717.717 1.476 1.223 2.366 1.566.788.297 1.66.499 2.937.559C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.936-.559.89-.345 1.649-.849 2.366-1.566.717-.717 1.223-1.476 1.566-2.366.297-.788.499-1.66.559-2.937.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.559-2.937-.345-.89-.849-1.649-1.566-2.366C20.83 1.034 20.07.528 19.182.185 18.394-.112 17.523-.31 16.246-.37 14.966-.012 14.559 0 12 0zm0 2.16c3.203 0 3.585.009 4.849.07 1.171.054 1.805.244 2.227.408.56.217 1.001.48 1.44.92.44.44.703.88.92 1.44.164.422.354 1.057.408 2.227.061 1.264.07 1.646.07 4.849s-.009 3.585-.07 4.849c-.054 1.171-.244 1.805-.408 2.227-.217.56-.48 1.001-.92 1.44-.44.44-.88.703-1.44.92-.422.164-1.057.354-2.227.408-1.264.061-1.646.07-4.849.07s-3.585-.009-4.849-.07c-1.171-.054-1.805-.244-2.227-.408-.56-.217-1.001-.48-1.44-.92-.44-.44-.703-.88-.92-1.44-.164-.422-.354-1.057-.408-2.227-.061-1.264-.07-1.646-.07-4.849s.009-3.585.07-4.849c.054-1.171.244-1.805.408-2.227.217-.56.48-1.001.92-1.44.44-.44.88-.703 1.44-.92.422-.164 1.057-.354 2.227-.408 1.264-.061 1.646-.07 4.849-.07z"/><circle cx="12" cy="12" r="3.305"/></svg>
                </a>
                <a href="https://x.com/1solutions" className="hf-si hf-x" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.694l-5.248-6.856-6.027 6.856H2.421l7.782-8.917L2.959 2.25h6.863l4.744 6.278 5.578-6.278z"/></svg>
                </a>
                <a href="https://www.youtube.com/@1solutions" className="hf-si hf-yt" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Right: 4 cols */}
            <div className="hf-right">
              <div className="hf-col">
                <h5>SERVICES</h5>
                <ul>
                  {[['Web Development','/web-development'],['Mobile Applications','/mobile-app-development'],['Digital Marketing','/digital-marketing'],['DevOps & Cloud','/devops-cloud'],['E-Commerce Development','/ecommerce-development'],['Enterprise Software','/enterprise-software'],['View Full Sitemap','/sitemap']].map(([l,h])=>(
                    <li key={h}><Link href={h}>{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="hf-col">
                <h5>INDUSTRIES</h5>
                <ul>
                  {[['Technology','/industries/technology'],['EdTech','/industries/edtech'],['Finance & Banking','/industries/finance'],['Healthcare','/industries/healthcare'],['Retail & E-Commerce','/industries/ecommerce'],['Manufacturing','/industries/manufacturing'],['All Industries →','/industries']].map(([l,h])=>(
                    <li key={h}><Link href={h}>{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="hf-col">
                <h5>COMPANY</h5>
                <ul>
                  {[['Why 1Solutions','/#about'],['About Us','/about'],['How We Work','/#process'],['Success Stories','/case-studies'],['Blog','/blog'],['Careers','/careers'],['Contact Us','/#contact']].map(([l,h])=>(
                    <li key={h}><Link href={h}>{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="hf-col">
                <h5>GLOBAL OFFICES</h5>
                <div className="hf-office">
                  <strong>India (HQ)</strong>
                  <div className="hf-oitem">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <p>47, Vijay Block<br/>Laxmi Nagar<br/>New Delhi – 110092, India</p>
                  </div>
                  <div className="hf-oitem">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <p><a href="mailto:info@1solutions.biz">info@1solutions.biz</a></p>
                  </div>
                  <div className="hf-oitem">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <p><a href="tel:+919654327900">+91 9654327900</a></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <div className="hf-bottom">
          <div className="hf-wrap">
            <div className="hf-certs">
              <Image src="/images/trustpilot.svg"      alt="Trustpilot"     width={80} height={48} style={{height:'48px',width:'auto',objectFit:'contain'}} />
              <Image src="/images/google-business.svg" alt="Google Business" width={80} height={48} style={{height:'48px',width:'auto',objectFit:'contain'}} />
              <Image src="/images/iso-9001.png"         alt="ISO 9001:2015"  width={80} height={48} style={{height:'48px',width:'auto',objectFit:'contain'}} />
              <Image src="/images/msme.png"             alt="MSME"           width={80} height={48} style={{height:'48px',width:'auto',objectFit:'contain'}} />
              <Image src="/images/dmca.png"             alt="DMCA Protected" width={80} height={48} style={{height:'48px',width:'auto',objectFit:'contain'}} />
            </div>
            <div className="hf-bright">
              <p className="hf-rating">⭐⭐⭐⭐⭐ Rated 4.7 by 375 Clients | <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer">Rate Now</a></p>
              <p className="hf-copy">All Rights Reserved &copy; 1Solutions {new Date().getFullYear()}</p>
              <div className="hf-legal">
                <Link href="/terms-of-use">Terms of Use</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/gdpr">GDPR</Link>
                <Link href="/sitemap">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
