import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const services = {
    build: [
      { label: 'Web Development', icon: '⚙' },
      { label: 'Mobile Apps', icon: '⚙' },
      { label: 'Custom Software', icon: '⚙' },
    ],
    grow: [
      { label: 'SEO & Content', icon: '→' },
      { label: 'Paid Advertising', icon: '→' },
      { label: 'Analytics & Data', icon: '→' },
    ],
    scale: [
      { label: 'Cloud Architecture', icon: '↑' },
      { label: 'DevOps & CI/CD', icon: '↑' },
      { label: 'Performance Optimization', icon: '↑' },
    ],
  };

  const serviceCards = [
    {
      title: 'Web Development',
      description: 'Scalable, SEO-friendly websites that convert visitors into customers.',
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform apps built for performance and user delight.',
    },
    {
      title: 'Digital Marketing',
      description: 'Data-driven campaigns that reach your target audience at scale.',
    },
    {
      title: 'Cloud & DevOps',
      description: 'Infrastructure that grows with your business, secure and automated.',
    },
  ];

  return (
    <header className="sticky top-0 z-100 bg-white border-b border-gray-200 h-[68px] flex items-center px-10">
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-black text-blue-900 tracking-tighter">
          1SOLUTIONS
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-10 flex-1 justify-center text-sm">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="text-gray-900 font-medium hover:text-blue-900 transition-colors flex items-center gap-2">
              Services
              <span className="text-xs opacity-50">▼</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-[68px] left-[-160px] opacity-100 visibility-visible pointer-events-auto bg-white border-b border-gray-200 shadow-2xl w-[1120px]">
                <div className="grid grid-cols-2 gap-10 p-10">
                  {/* Left Column: Categories */}
                  <div className="border-r border-gray-200 pr-10">
                    {/* Build Category */}
                    <div className="mb-6">
                      <div className="text-xs font-bold uppercase text-gray-500 tracking-wide mb-2">
                        Build
                      </div>
                      {services.build.map((item, idx) => (
                        <Link
                          key={idx}
                          href="#"
                          className="flex items-center gap-3 text-gray-900 text-sm py-2 hover:text-blue-900 transition-colors"
                        >
                          <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold bg-red-100 text-red-600">
                            {item.icon}
                          </span>
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Grow Category */}
                    <div className="mb-6">
                      <div className="text-xs font-bold uppercase text-gray-500 tracking-wide mb-2">
                        Grow
                      </div>
                      {services.grow.map((item, idx) => (
                        <Link
                          key={idx}
                          href="#"
                          className="flex items-center gap-3 text-gray-900 text-sm py-2 hover:text-blue-900 transition-colors"
                        >
                          <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold bg-green-100 text-green-600">
                            {item.icon}
                          </span>
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Scale Category */}
                    <div>
                      <div className="text-xs font-bold uppercase text-gray-500 tracking-wide mb-2">
                        Scale
                      </div>
                      {services.scale.map((item, idx) => (
                        <Link
                          key={idx}
                          href="#"
                          className="flex items-center gap-3 text-gray-900 text-sm py-2 hover:text-blue-900 transition-colors"
                        >
                          <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold bg-yellow-100 text-yellow-600">
                            {item.icon}
                          </span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Service Cards */}
                  <div className="grid grid-cols-2 gap-5">
                    {serviceCards.map((card, idx) => (
                      <Link
                        key={idx}
                        href="#"
                        className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all hover:-translate-y-0.5"
                      >
                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">
                          {card.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {card.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/industries" className="text-gray-900 font-medium hover:text-blue-900 transition-colors">
            Industries
          </Link>
          <Link href="/success-stories" className="text-gray-900 font-medium hover:text-blue-900 transition-colors">
            Success Stories
          </Link>
          <Link href="/insights" className="text-gray-900 font-medium hover:text-blue-900 transition-colors">
            Insights
          </Link>
          <Link href="/about" className="text-gray-900 font-medium hover:text-blue-900 transition-colors">
            About Us
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 ml-auto">
          <button className="px-4 py-2 text-sm font-semibold bg-blue-900 text-white rounded hover:bg-blue-800 transition-all">
            Contact Us →
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
