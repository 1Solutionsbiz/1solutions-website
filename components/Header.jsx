import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 z-100 bg-white border-b border-gray-200 shadow-sm h-[68px] flex items-center px-10">
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
          <Link href="#services" className="text-gray-900 font-medium text-[14px] hover:text-blue-900 transition-colors">
            Services
          </Link>
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
