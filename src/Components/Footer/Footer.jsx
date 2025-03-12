import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = ({darkMode}) => {
  const currentYear = new Date().getFullYear();


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  return (
    <footer className={`border-t border-gray-700 relative ${darkMode ? '' : 'bg-slate-100'} `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-8 sm:py-12`}>
          {/* معلومات المتجر */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">My Shop</h3>
            <p className="text-sm">
              Your premier destination for safe online shopping. We offer the best products with the highest quality and a money-back guarantee.
            </p>
            <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:opacity-60 transition-colors">
                  <FaFacebookF size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:opacity-60 transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:opacity-60 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:opacity-60 transition-colors">
                  <FaLinkedinIn size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:opacity-60 transition-colors">
                  <FaYoutube size={20} />
                </a>
              </div>
          </div>

 
          <div className="space-y-2">
            <h4 className="font-semibold text-md mb-2">Customer Service</h4>
            <Link to="/support" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Support</Link>
            <Link to="/faq" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">FAQ</Link>
            <Link to="/shipping-delivery" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Shipping & Delivery</Link>
            <Link to="/returns-exchange" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Returns & Exchanges</Link>
          </div>

         
          <div className="space-y-2">
            <h4 className="font-semibold text-md mb-2">About Us</h4>
            <Link to="/about" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Who We Are</Link>
            <Link to="/careers" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Careers</Link>
            <Link to="/blog" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Blog</Link>
            <Link to="/affiliates" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Affiliates</Link>
          </div>


          <div className="space-y-2">
            <h4 className="font-semibold text-md mb-2">Policies</h4>
            <Link to="/privacy-policy" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Privacy Policy</Link>
            <Link to="/terms" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Terms & Conditions</Link>
            <Link to="/cookie-policy" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Cookie Policy</Link>
            <Link to="/sitemap" onClick={scrollToTop} className="block text-sm hover:opacity-60 transition-colors">Sitemap</Link>
          </div>
        </div>


        <div className="border-t border-gray-800 py-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 gap-2 sm:gap-4">
            <div className="text-center sm:text-left">
              © {currentYear} My Shop. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <Link to="/terms" onClick={scrollToTop} className="hover:opacity-60 transition-colors">Terms</Link>
              <span className="hidden sm:inline">|</span>
              <Link to="/privacy-policy" onClick={scrollToTop} className="hover:opacity-60 transition-colors">Privacy</Link>
              <span className="hidden sm:inline">|</span>
              <Link to="/security" onClick={scrollToTop} className="hover:opacity-60 transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;