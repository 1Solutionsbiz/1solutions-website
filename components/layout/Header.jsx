'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const services = {
  Build: [
    { label: 'Web Development', href: '/web-development' },
    { label: 'Mobile App Development', href: '/mobile-app-development' },
    { label: 'eCommerce Development', href: '/ecommerce-development' },
    { label: 'Custom Software', href: '/custom-software-development' },
    { label: 'UI/UX Design', href: '/ui-ux-design' },
  ],
  Grow: [
    { label: 'SEO Services', href: '/seo-services' },
    { label: 'PPC / Google Ads', href: '/ppc-management' },
    { label: 'Social Media Marketing', href: '/social-media-marketing' },
    { label: 'Content Marketing', href: '/content-marketing' },
    { label: 'Email Marketing', href: '/email-marketing' },
  ],
  Scale: [
    { label: 'Hire Dedicated Developers', href: '/hire-dedicated-developers' },
    { label: 'Hire SEO Experts', href: '/hire-seo-experts' },
    { label: 'Staff Augmentation', href: '/staff-augmentation' },
    { label: 'Digital Consulting', href: '/digital-consulting' },
  ],
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'border-b border-gray-200'
      }`}
    >
      <div className="container flex items-center justify-between h-[68px]">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/1solutions-logo.png"
            alt="1Solutions – Empowering your Business"
            width={160}
            height={48}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-0 py-2 text-[14px] font-medium text-gray-900 hover:text-blue-900 transition-colors">
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[640px]">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 grid grid-cols-3 gap-6">
                  {Object.entries(services).map(([pillar, items]) => (
                    <div key={pillar}>
                      <div className="text-[11px] font-bold uppercase tracking-widest mb-3"
                        style={{ color: pillar === 'Build' ? '#114171' : pillar === 'Grow' ? '#44973D' : '#FE9700' }}>
                        {pillar}
                      </div>
                      <ul className="space-y-1">
                        {items.map(item => (
                          <li key={item.href}>
                            <Link href={item.href}
                              className="block text-[13.5px] text-gray-600 hover:text-blue-900 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors">
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {[
            { label: 'Industries', href: '/industries' },
            { label: 'Success Stories', href: '/case-studies' },
            { label: 'Insights', href: '/blog' },
            { label: 'About Us', href: '/about' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              className="px-0 py-2 text-[14px] font-medium text-gray-900 hover:text-blue-900 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <style>{`
            .contact-btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #0F3460;
              color: white;
              font-weight: 500;
              font-size: 14px;
              border-radius: 20px;
              text-decoration: none;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(15, 52, 96, 0.2);
              white-space: nowrap;
            }
            .contact-btn:hover {
              background: linear-gradient(90deg, #F59E0B 0%, #0F3460 100%);
              box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
            }
          `}</style>
          <Link href="/contact" className="contact-btn">
            Contact Us →
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[68px] bg-white z-40 overflow-y-auto p-6">
          <nav className="flex flex-col gap-2">
            {Object.entries(services).map(([pillar, items]) => (
              <div key={pillar} className="mb-4">
                <div className="text-[11px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: pillar === 'Build' ? '#114171' : pillar === 'Grow' ? '#44973D' : '#FE9700' }}>
                  {pillar}
                </div>
                {items.map(item => (
                  <Link key={item.href} href={item.href}
                    className="block py-2 text-gray-700 font-medium border-b border-gray-100"
                    onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link href="/about" className="py-3 font-semibold text-gray-800" onClick={() => setMobileOpen(false)}>About Us</Link>
            <Link href="/blog" className="py-3 font-semibold text-gray-800" onClick={() => setMobileOpen(false)}>Insights</Link>
            <style>{`
              .contact-btn-mobile {
                display: block;
                text-align: center;
                padding: 10px 20px;
                margin-top: 16px;
                background-color: #0F3460;
                color: white;
                font-weight: 500;
                font-size: 14px;
                border-radius: 20px;
                text-decoration: none;
              }
            `}</style>
            <Link href="/contact"
              className="contact-btn-mobile"
              onClick={() => setMobileOpen(false)}>
              Contact Us →
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
