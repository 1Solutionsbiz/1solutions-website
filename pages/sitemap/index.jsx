import Head from 'next/head';
import Link from 'next/link';

const SECTIONS = [
  {
    id: 'company',
    heading: 'Company',
    columns: [
      [
        { label: 'Home',                 href: '/' },
        { label: 'Who We Are',           href: '/who-we-are' },
        { label: 'Work Culture',         href: '/work-culture' },
        { label: 'Portfolio',            href: '/portfolio' },
        { label: 'Case Studies',         href: '/case-studies' },
      ],
      [
        { label: 'Open Positions',       href: '/open-positions' },
        { label: 'Apply Online',         href: '/apply-online' },
        { label: 'Contact Us',           href: '/contact' },
        { label: 'Book a Consultation',  href: '/book-consultation' },
        { label: 'Blog',                 href: '/blog' },
      ],
    ],
  },
  {
    id: 'web-dev',
    heading: 'Web & App Development',
    columns: [
      [
        { label: 'WordPress Development',        href: '/wordpress-development-company' },
        { label: 'Next.js Development',          href: '/nextjs-development-services' },
        { label: 'Laravel Development',          href: '/laravel-development-company' },
        { label: 'Python Development',           href: '/python-development-services' },
        { label: 'CodeIgniter Development',      href: '/codeigniter-development-company' },
        { label: 'Drupal Development',           href: '/drupal-development-company' },
        { label: 'Joomla Development',           href: '/joomla-development-company' },
        { label: 'TIBCO Development',            href: '/tibco-development-services' },
      ],
      [
        { label: 'Android App Development',      href: '/android-application-development-company' },
        { label: 'iOS App Development',          href: '/ios-app-development-company' },
        { label: 'Flutter App Development',      href: '/flutter-app-development-services' },
        { label: 'Social Media App Development', href: '/social-media-app-development-company' },
        { label: 'ERP Development',              href: '/erp-application-development-company' },
        { label: 'CRM Development',              href: '/crm-application-development-company' },
        { label: 'SaaS Application Development', href: '/saas-application-development-company' },
      ],
      [
        { label: 'eCommerce Development',        href: '/ecommerce-website-development-services' },
        { label: 'Magento Development',          href: '/magento-development-company' },
        { label: 'Shopify Store Development',    href: '/shopify-store-development' },
        { label: 'WooCommerce Development',      href: '/woocommerce-development-company' },
        { label: 'OpenCart Development',         href: '/opencart-development-company' },
        { label: 'PrestaShop Development',       href: '/hire-prestashop-developer' },
        { label: 'PWA Development',              href: '/hire-pwa-developer' },
      ],
    ],
  },
  {
    id: 'uiux',
    heading: 'UI/UX & Design',
    columns: [
      [
        { label: 'Website Design',       href: '/website-design' },
        { label: 'Mobile App Design',    href: '/mobile-app-design' },
        { label: 'Brand Identity',       href: '/brand-identity' },
      ],
      [
        { label: 'Design Systems',       href: '/design-systems' },
        { label: 'Prototyping Services', href: '/prototyping-services' },
        { label: 'UX Research',          href: '/ux-research' },
      ],
    ],
  },
  {
    id: 'cloud',
    heading: 'Cloud, DevOps & IT Services',
    columns: [
      [
        { label: 'Cloud Migration Services',             href: '/cloud-migration-services' },
        { label: 'Cloud Native Services',                href: '/cloud-native-services' },
        { label: 'DevOps Services',                      href: '/devops-services-company' },
        { label: 'Virtual CTO Services',                 href: '/virtual-cto-services' },
      ],
      [
        { label: 'IT Outsourcing Services',              href: '/it-outsourcing-services' },
        { label: 'IT Staff Augmentation',                href: '/it-staff-augmentation-services' },
        { label: 'Offshore Development Company',         href: '/offshore-development-company' },
        { label: 'Software Development Cost Optimization', href: '/software-development-cost-optimization' },
      ],
      [
        { label: 'Website Support & Maintenance',        href: '/website-support-maintenance-services' },
        { label: 'WordPress Support & Maintenance',      href: '/wordpress-support-and-maintenance-services' },
      ],
    ],
  },
  {
    id: 'digital-marketing',
    heading: 'Digital Marketing',
    columns: [
      [
        { label: 'SEO Services',                  href: '/seo-services-company' },
        { label: 'Affordable SEO Packages',       href: '/affordable-seo-packages' },
        { label: 'SEO Audit Services',            href: '/seo-audit-services' },
        { label: 'Local SEO Services',            href: '/local-seo-services' },
        { label: 'eCommerce SEO',                 href: '/ecommerce-seo-services' },
        { label: 'Reputation Management',         href: '/reputation-management-services' },
      ],
      [
        { label: 'PPC Management',                href: '/ppc-management-services' },
        { label: 'PPC Audit Services',            href: '/ppc-audit-services' },
        { label: 'Google Shopping Management',    href: '/google-shopping-management' },
        { label: 'Google My Business Optimization', href: '/google-my-business-optimization' },
        { label: 'Remarketing Services',          href: '/remarketing-services' },
        { label: 'Analytics & CRO',               href: '/analytics-cro-services' },
      ],
      [
        { label: 'Social Media Marketing',        href: '/social-media-marketing-services' },
        { label: 'LinkedIn Ads Management',       href: '/linkedin-ads-management' },
        { label: 'Meta Ads Management',           href: '/meta-ads-management' },
        { label: 'Content Marketing',             href: '/content-marketing-services' },
        { label: 'Email Marketing',               href: '/email-marketing-services' },
        { label: 'Video Marketing',               href: '/video-marketing-services' },
      ],
    ],
  },
  {
    id: 'seo-industry',
    heading: 'SEO by Industry',
    columns: [
      [
        { label: 'Dental SEO Services',       href: '/dental-seo-services' },
        { label: 'Law Firm SEO Services',     href: '/law-firm-seo-services' },
        { label: 'Insurance SEO Services',    href: '/insurance-seo-services' },
      ],
      [
        { label: 'Home Repair SEO Services',  href: '/home-repair-seo-services' },
        { label: 'Plumbing SEO Services',     href: '/plumbing-seo-services' },
        { label: 'Restaurants SEO Services',  href: '/restaurants-seo-services' },
      ],
      [
        { label: 'Pet Care SEO Services',     href: '/petcare-seo-services' },
      ],
    ],
  },
  {
    id: 'seo-location',
    heading: 'SEO by Location',
    columns: [
      [
        { label: 'SEO Company Austin',       href: '/seo-company-austin' },
        { label: 'SEO Company Burlington',   href: '/seo-company-burlington' },
      ],
      [
        { label: 'SEO Company Delhi',        href: '/seo-company-delhi' },
        { label: 'SEO Company Toronto',      href: '/seo-company-toronto' },
      ],
      [
        { label: 'SEO Company Vancouver',    href: '/seo-company-vancouver' },
      ],
    ],
  },
  {
    id: 'ecommerce-marketplace',
    heading: 'eCommerce & Marketplace Management',
    columns: [
      [
        { label: 'Amazon Account Management',           href: '/amazon-account-management-services' },
        { label: 'Amazon FBA Shipment Reconciliation',  href: '/amazon-fba-shipment-reconciliation-services' },
        { label: 'eBay Account Management',             href: '/ebay-account-management-services' },
        { label: 'Flipkart Account Management',         href: '/flipkart-account-management-services' },
      ],
      [
        { label: 'Etsy Account Management',             href: '/etsy-account-management-services' },
        { label: 'Walmart Account Management',          href: '/walmart-account-management-services' },
        { label: 'Wayfair Account Management',          href: '/wayfair-account-management-services' },
        { label: 'Home Depot Account Management',       href: '/home-depot-account-management-services' },
      ],
      [
        { label: 'Temu Account Management',             href: '/temu-account-management-services' },
        { label: 'Houzz Product Listing Services',      href: '/houzz-product-listing-services' },
      ],
    ],
  },
  {
    id: 'industry-solutions',
    heading: 'Industry Solutions',
    columns: [
      [
        { label: 'Healthcare Software Development',        href: '/healthcare-software-development' },
        { label: 'FinTech Software Development',          href: '/fintech-software-development-company' },
        { label: 'Real Estate Software Development',      href: '/real-estate-software-development' },
        { label: 'Manufacturing Software Development',    href: '/manufacturing-software-development-services' },
      ],
      [
        { label: 'Logistics Software Development',        href: '/logistics-software-development-services' },
        { label: 'Retail & eCommerce Software',           href: '/retail-ecommerce-software-development' },
        { label: 'Agriculture Software Development',      href: '/agriculture-software-development' },
        { label: 'Automotive Software Solutions',         href: '/automotive-software-solutions' },
      ],
      [
        { label: 'EV Software Development',               href: '/ev-software-development-company' },
        { label: 'eLearning Software Development',        href: '/elearning-software-development-services' },
        { label: 'Entertainment Software Development',    href: '/entertainment-software-development' },
        { label: 'Travel & Tourism Software',             href: '/travel-and-tourism-software-solutions' },
      ],
      [
        { label: 'Wellness Software Development',         href: '/wellness-software-development' },
      ],
    ],
  },
  {
    id: 'hire',
    heading: 'Hire Developers & Designers',
    columns: [
      [
        { label: 'Hire React Developer',          href: '/hire-reactjs-developer' },
        { label: 'Hire Node.js Developer',        href: '/hire-nodejs-developer' },
        { label: 'Hire WordPress Developer',      href: '/hire-wordpress-developer' },
        { label: 'Hire PHP Developer',            href: '/hire-php-developer' },
        { label: 'Hire Python Developer',         href: '/hire-python-developer' },
        { label: 'Hire JavaScript Developer',     href: '/hire-javascript-developer' },
        { label: 'Hire Full Stack Developer',     href: '/hire-full-stack-developer' },
        { label: 'Hire MEAN Stack Developer',     href: '/hire-mean-stack-developer' },
        { label: 'Hire MERN Stack Developer',     href: '/hire-mern-stack-developer' },
      ],
      [
        { label: 'Hire Shopify Developer',        href: '/hire-shopify-developer' },
        { label: 'Hire Magento Developer',        href: '/hire-magento-developer' },
        { label: 'Hire Drupal Developer',         href: '/hire-drupal-developer' },
        { label: 'Hire Angular Developer',        href: '/hire-angularjs-developer' },
        { label: 'Hire Swift Developer',          href: '/hire-swift-developer' },
        { label: 'Hire PrestaShop Developer',     href: '/hire-prestashop-developer' },
        { label: 'Hire PWA Developer',            href: '/hire-pwa-developer' },
        { label: 'Hire Salesforce Developer',     href: '/hire-salesforce-developer' },
      ],
      [
        { label: 'Hire Android Developer',        href: '/hire-android-developer' },
        { label: 'Hire iOS Developer',            href: '/hire-ios-developer' },
        { label: 'Hire Flutter Developer',        href: '/hire-flutter-developer' },
        { label: 'Hire React Native Developer',   href: '/hire-react-native-developer' },
        { label: 'Hire App Developer',            href: '/hire-app-developer' },
        { label: 'Hire AI Developer',             href: '/hire-ai-developer' },
        { label: 'Hire ML Developer',             href: '/hire-ml-developer' },
        { label: 'Hire Blockchain Developer',     href: '/hire-blockchain-developer' },
      ],
      [
        { label: 'Hire Data Scientist',           href: '/hire-data-scientist' },
        { label: 'Hire AR Developer',             href: '/hire-ar-developer' },
        { label: 'Hire VR Developer',             href: '/hire-vr-developer' },
        { label: 'Hire UI/UX Designer',           href: '/hire-ui-ux-designer' },
        { label: 'Hire Web Designer',             href: '/hire-web-designer' },
        { label: 'Hire Web Developer',            href: '/hire-web-developer' },
        { label: 'Hire Dedicated Resources',      href: '/hire-dedicated-resources' },
        { label: 'Hire Trending Developer',       href: '/hire-trending-developer' },
      ],
    ],
  },
  {
    id: 'legal',
    heading: 'Legal & Policies',
    columns: [
      [
        { label: 'Privacy Policy',    href: '/privacy-policy' },
        { label: 'Terms of Use',      href: '/terms-of-use' },
      ],
      [
        { label: 'Cookie Policy',     href: '/cookie-policy' },
        { label: 'Refund Policy',     href: '/refund-policy' },
      ],
    ],
  },
];

export default function Sitemap() {
  return (
    <>
      <Head>
        <title>Sitemap | 1Solutions</title>
        <meta name="description" content="Complete sitemap of 1Solutions — browse all our web development, digital marketing, industry solutions, and hire developer pages." />
        <meta name="robots" content="index, follow" />
      </Head>

      <style>{`
        .sm-page { background: #fff; min-height: 100vh; }

        /* Hero */
        .sm-hero {
          background: linear-gradient(135deg, #f0f4f8 0%, #e8eef4 100%);
          border-bottom: 1px solid #dde4ec;
          padding: 56px 48px 52px;
        }
        .sm-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .sm-hero h1 {
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 800;
          color: #0f3460;
          margin: 0 0 14px;
          letter-spacing: -0.5px;
          line-height: 1.15;
        }
        .sm-hero p {
          font-size: 16px;
          color: #5a6a7a;
          margin: 0;
          max-width: 560px;
          line-height: 1.65;
        }

        /* Jump-to nav */
        .sm-jumpto {
          border-bottom: 1px solid #e8edf2;
          padding: 16px 48px;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 10;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .sm-jumpto-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 6px 20px;
          align-items: center;
        }
        .sm-jumpto-label {
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          flex-shrink: 0;
          margin-right: 4px;
        }
        .sm-jumpto a {
          font-size: 13px;
          color: #114171;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.15s;
        }
        .sm-jumpto a:hover { color: #fe9700; text-decoration: underline; }

        /* Content */
        .sm-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px 80px;
        }

        /* Section */
        .sm-section {
          padding: 44px 0 0;
          border-bottom: 1px solid #eef0f3;
        }
        .sm-section:last-child { border-bottom: none; }
        .sm-section-heading {
          font-size: 22px;
          font-weight: 700;
          color: #0f3460;
          margin: 0 0 6px;
          line-height: 1.2;
        }
        .sm-section-rule {
          height: 2px;
          background: linear-gradient(90deg, #114171 0%, #fe9700 60%, transparent 100%);
          border: none;
          margin: 0 0 28px;
          border-radius: 2px;
          width: 100%;
        }
        .sm-col-grid {
          display: grid;
          gap: 0 48px;
          padding-bottom: 40px;
        }
        .sm-col-grid-2 { grid-template-columns: repeat(2, 1fr); }
        .sm-col-grid-3 { grid-template-columns: repeat(3, 1fr); }
        .sm-col-grid-4 { grid-template-columns: repeat(4, 1fr); }

        .sm-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .sm-col li {
          border-bottom: 1px solid #f3f4f6;
          padding: 0;
        }
        .sm-col li:last-child { border-bottom: none; }
        .sm-col a {
          display: block;
          padding: 9px 0;
          font-size: 13.5px;
          color: #374151;
          text-decoration: none;
          line-height: 1.4;
          transition: color 0.15s, padding-left 0.15s;
        }
        .sm-col a:hover {
          color: #114171;
          padding-left: 6px;
          text-decoration: none;
        }
        .sm-col a::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #d1d5db;
          margin-right: 10px;
          vertical-align: middle;
          margin-bottom: 1px;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .sm-col a:hover::before { background: #fe9700; }

        /* Responsive */
        @media (max-width: 900px) {
          .sm-hero { padding: 40px 28px 36px; }
          .sm-jumpto { padding: 14px 28px; }
          .sm-content { padding: 0 28px 60px; }
          .sm-col-grid-4 { grid-template-columns: repeat(2, 1fr); }
          .sm-col-grid-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .sm-hero { padding: 32px 20px 28px; }
          .sm-jumpto { padding: 12px 20px; display: none; }
          .sm-content { padding: 0 20px 48px; }
          .sm-col-grid-4,
          .sm-col-grid-3,
          .sm-col-grid-2 { grid-template-columns: 1fr; }
          .sm-section-heading { font-size: 19px; }
        }
      `}</style>

      <div className="sm-page">
        {/* Hero */}
        <div className="sm-hero">
          <div className="sm-hero-inner">
            <h1>Sitemap</h1>
            <p>
              A complete directory of every page on 1Solutions.biz — find our services,
              solutions, industry expertise, and resources all in one place.
            </p>
          </div>
        </div>

        {/* Jump-to nav */}
        <nav className="sm-jumpto" aria-label="Jump to section">
          <div className="sm-jumpto-inner">
            <span className="sm-jumpto-label">Jump to:</span>
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`}>{s.heading}</a>
            ))}
          </div>
        </nav>

        {/* Sections */}
        <div className="sm-content">
          {SECTIONS.map(section => {
            const colCount = section.columns.length;
            const gridClass =
              colCount === 4 ? 'sm-col-grid-4' :
              colCount === 3 ? 'sm-col-grid-3' :
              'sm-col-grid-2';

            return (
              <section key={section.id} id={section.id} className="sm-section">
                <h2 className="sm-section-heading">{section.heading}</h2>
                <hr className="sm-section-rule" />
                <div className={`sm-col-grid ${gridClass}`}>
                  {section.columns.map((col, ci) => (
                    <div key={ci} className="sm-col">
                      <ul>
                        {col.map(link => (
                          <li key={link.href}>
                            <Link href={link.href}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
