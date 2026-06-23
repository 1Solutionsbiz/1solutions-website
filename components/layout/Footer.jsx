import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#114171] text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image src="/images/1solutions-logo-white.png" alt="1Solutions" width={140} height={42} className="mb-4" />
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              15+ years empowering businesses worldwide through web development and digital marketing.
            </p>
            <div className="flex gap-3">
              {['linkedin','twitter','facebook','instagram'].map(s => (
                <a key={s} href={`https://${s}.com`} target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#114171] hover:text-white transition-colors text-xs font-bold uppercase">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2369b8] mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                ['Web Development', '/web-development'],
                ['Mobile Apps', '/mobile-app-development'],
                ['eCommerce', '/ecommerce-development'],
                ['Digital Marketing', '/digital-marketing'],
                ['SEO Services', '/seo-services'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-white/55 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#44973D] mb-4">Industries</h4>
            <ul className="space-y-2">
              {[
                ['Technology', '/industries/technology'],
                ['EdTech', '/industries/edtech'],
                ['Finance & Banking', '/industries/finance'],
                ['Healthcare', '/industries/healthcare'],
                ['Retail & E-Commerce', '/industries/ecommerce'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-white/55 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FE9700] mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                ['About Us', '/about'],
                ['Case Studies', '/case-studies'],
                ['Blog', '/blog'],
                ['Careers', '/careers'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-white/55 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Office */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Global Offices</h4>
            <p className="text-sm text-white/55 leading-relaxed mb-3">
              <strong className="text-white/80">India (HQ)</strong><br />
              47, Vijay Block, Laxmi Nagar<br />
              New Delhi – 110092
            </p>
            <a href="mailto:info@1solutions.biz" className="text-sm text-white/55 hover:text-white block mb-1">info@1solutions.biz</a>
            <a href="tel:+919654327900" className="text-sm text-white/55 hover:text-white block">+91 9654327900</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-xs text-white/35">
          <p>© {new Date().getFullYear()} 1Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
