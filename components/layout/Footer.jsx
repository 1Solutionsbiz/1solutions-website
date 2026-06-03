import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#050D1F] text-white pt-16 pb-8">
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

          {/* Build */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2369b8] mb-4">Build</h4>
            <ul className="space-y-2">
              {[
                ['Web Development', '/web-development'],
                ['Mobile Apps', '/mobile-app-development'],
                ['eCommerce', '/ecommerce-development'],
                ['Custom Software', '/custom-software-development'],
                ['UI/UX Design', '/ui-ux-design'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-white/55 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Grow */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#44973D] mb-4">Grow</h4>
            <ul className="space-y-2">
              {[
                ['SEO Services', '/seo-services'],
                ['PPC / Google Ads', '/ppc-management'],
                ['Social Media', '/social-media-marketing'],
                ['Content Marketing', '/content-marketing'],
                ['Email Marketing', '/email-marketing'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-white/55 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Scale */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FE9700] mb-4">Scale</h4>
            <ul className="space-y-2">
              {[
                ['Hire Developers', '/hire-dedicated-developers'],
                ['Hire SEO Experts', '/hire-seo-experts'],
                ['Staff Augmentation', '/staff-augmentation'],
                ['Digital Consulting', '/digital-consulting'],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-white/55 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Company</h4>
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
