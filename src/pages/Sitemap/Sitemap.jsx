import { Link } from "react-router-dom";

const SitemapPage = () => {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center">Sitemap</h1>
        <p className="mt-6 text-lg text-center">
          Explore our website easily using the sitemap below.
        </p>
  

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Main Pages</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/" className="text-indigo-500 hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/products" className="text-indigo-500 hover:underline">Products</Link>
            </li>
            <li>
              <Link to="/offers" className="text-indigo-500 hover:underline">Offers</Link>
            </li>
            <li>
              <Link to="/analytics" className="text-indigo-500 hover:underline">Analytics</Link>
            </li>
            <li>
              <Link to="/wishlist" className="text-indigo-500 hover:underline">Wishlist</Link>
            </li>
            <li>
              <Link to="/blog" className="text-indigo-500 hover:underline">Blog</Link>
            </li>
            <li>
              <Link to="/contact" className="text-indigo-500 hover:underline">Contact Us</Link>
            </li>
          </ul>
        </div>
  
      
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Policies</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/privacy-policy" className="text-indigo-500 hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="text-indigo-500 hover:underline">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="text-indigo-500 hover:underline">Cookie Policy</Link>
            </li>
          </ul>
        </div>
  

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Additional Information</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/about" className="text-indigo-500 hover:underline">About Us</Link>
            </li>
            <li>
              <Link to="/faq" className="text-indigo-500 hover:underline">FAQ</Link>
            </li>
            <li>
              <Link to="/shipping-delivery" className="text-indigo-500 hover:underline">Shipping & Delivery</Link>
            </li>
            <li>
              <Link to="/returns-exchange" className="text-indigo-500 hover:underline">Returns & Exchanges</Link>
            </li>
            <li>
              <Link to="/support" className="text-indigo-500 hover:underline">Support</Link>
            </li>
            <li>
              <Link to="/careers" className="text-indigo-500 hover:underline">Careers</Link>
            </li>
            <li>
              <Link to="/affiliates" className="text-indigo-500 hover:underline">Affiliates</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default SitemapPage;