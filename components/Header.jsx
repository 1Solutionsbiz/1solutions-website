import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const SERVICES_MENU = [
  {
    group: 'Ecommerce Solutions',
    sections: [
      {
        title: 'Platform Development',
        links: [
          { label: 'B2B eCommerce', href: '/b2b-ecommerce' },
        ],
      },
      {
        title: 'Ecommerce Marketing',
        links: [
          { label: 'Influencer Marketing', href: '/influencer-marketing-services' },
        ],
      },
    ],
  },
  {
    group: 'Web Development',
    sections: [
      {
        title: null,
        links: [
          { label: 'WordPress Development', href: '/wordpress-development-company' },
          { label: 'PHP Development', href: '/php-development-services' },
        ],
      },
    ],
  },
  {
    group: 'Mobile Development',
    sections: [
      {
        title: null,
        links: [
          { label: 'React Native / Cross-Platform', href: '/react-native-app-development' },
          { label: 'App UI/UX Design', href: '/app-ui-ux-design' },
          { label: 'App Maintenance', href: '/app-maintenance-services' },
        ],
      },
    ],
  },
  {
    group: 'SEO',
    sections: [
      {
        title: null,
        links: [
          { label: 'SEO Services', href: '/seo-services-company' },
          { label: 'Local SEO', href: '/local-seo-services/' },
          { label: 'SEO Audit', href: '/seo-audit-services/' },
          { label: 'Link Building Services', href: '/link-building-services' },
          { label: 'Link Building Packages', href: '/link-building-packages' },
        ],
      },
    ],
  },
];

const Header = () => {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-gray-200 shadow-sm h-[68px] flex items-center px-10">
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center h-[50px] min-w-fit">
          <Image
            src="/images/1solutions-logo.png"
            alt="1Solutions Logo"
            height={50}
            width={180}
            className="h-full w-auto max-w-[180px]"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-10 flex-1 justify-center text-sm">

          {/* Services dropdown */}
          <div
            className="relative py-6 -my-6"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-gray-900 font-medium text-[14px] hover:text-blue-900 transition-colors bg-transparent border-none cursor-pointer font-[inherit] p-0"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              Services
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-0 bg-white rounded-xl shadow-xl border border-gray-100 min-w-[220px] py-2 z-50"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}
              >
                {SERVICES_MENU.map((group, gi) => (
                  <div key={gi}>
                    {gi > 0 && <div className="my-1 mx-3 border-t border-gray-100" />}
                    <div className="px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {group.group}
                    </div>
                    {group.sections.map((section, si) => (
                      <div key={si}>
                        {section.title && (
                          <div className="px-4 pt-2 pb-0.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide" style={{ paddingLeft: 24 }}>
                            {section.title}
                          </div>
                        )}
                        {section.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-2 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-blue-900 transition-colors"
                            style={{ paddingLeft: section.title ? 32 : 24, paddingRight: 16 }}
                            onClick={() => setServicesOpen(false)}
                          >
                            <span
                              style={{
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                background: '#BE185D',
                                display: 'inline-block',
                                flexShrink: 0,
                              }}
                            />
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="#industries" className="text-gray-900 font-medium text-[14px] hover:text-blue-900 transition-colors">
            Industries
          </Link>
          <Link href="#success-stories" className="text-gray-900 font-medium text-[14px] hover:text-blue-900 transition-colors">
            Success Stories
          </Link>
          <Link href="#insights" className="text-gray-900 font-medium text-[14px] hover:text-blue-900 transition-colors">
            Insights
          </Link>
          <Link href="#about" className="text-gray-900 font-medium text-[14px] hover:text-blue-900 transition-colors">
            About Us
          </Link>
        </nav>

        {/* Contact CTA */}
        <div className="flex items-center gap-3 ml-auto">
          <Link
            href="#contact"
            className="inline-block text-white font-medium text-[14px] px-5 py-[10px] bg-blue-900 rounded-full transition-all duration-300 shadow-lg hover:bg-gradient-to-r hover:from-amber-400 hover:to-blue-900 hover:shadow-xl"
          >
            Contact Us →
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
