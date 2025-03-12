import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBoxes,
  FaTimes,
  FaBars,
  FaMoon,
  FaSun,
    FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaShoppingCart,
  FaChevronDown,
  FaHeart,
  FaUser,
  FaCogs,
  FaChartBar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CustomDropdown from "../../utils/custom-dropdown/CustomDropdown";
import { useState, useEffect } from "react";

const Navbar = ({ isOpen, setIsOpen, darkMode, toggleDarkMode }) => {
  const itemsCount = useSelector((state) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownOptions = [
    { value: "/wishlist", label: "Wishlist", icon: FaHeart },
    { value: "/analytics", label: "Analytics", icon: FaChartBar },
    { value: "/account", label: "Profile", icon: FaUser },
    { value: "/settings", label: "Settings", icon: FaCogs },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelect = (option) => {
    navigate(option.value);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false); 
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/offers", label: "Offers" },
    { to: "/checkout", label: "Checkout" },
  ];

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      } ${
        isScrolled ? "shadow-xl" : "shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
     
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center flex-1">
            <motion.button
              className={`p-2 rounded-lg hover:bg-opacity-20 ${
                darkMode ? "hover:bg-gray-100" : "hover:bg-gray-900"
              }`}
              onClick={() => {
                setIsOpen(!isOpen);
                setIsMobileMenuOpen(false); 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? (
                <FaRegArrowAltCircleLeft className="w-6 h-6" />
              ) : (
                <FaRegArrowAltCircleRight className="w-6 h-6" />
              )}
            </motion.button>

            <Link
              to="/"
              className="ml-4 text-xl font-bold flex items-center"
            >
              <img
                src="/src/assets/images/02145.png"
                alt="Logo"
                className="h-14 w-14 mr-2"
              />

              <span className="hidden lg:block">MyStore</span>
            </Link>
          </div>


          <div className="hidden xl:flex flex-1 justify-center">
            <ul className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="px-4 py-2 flex items-center hover:text-indigo-500 transition-colors font-medium"
                  >
                    {link.label}
                    {link.submenu && (
                      <FaChevronDown className="ml-1 text-sm" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div className="flex items-center justify-end flex-1 space-x-4">
      
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-opacity-20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? (
                <FaSun className="w-6 h-6" />
              ) : (
                <FaMoon className="w-6 h-6" />
              )}
            </motion.button>


            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/cart"
                className="flex items-center p-2"
              >
                <FaShoppingCart className="w-6 h-6" />
                {itemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemsCount}
                  </span>
                )}
              </Link>
            </motion.div>


            <div className="relative hidden lg:block">
              <CustomDropdown
                options={dropdownOptions}
                selected={null}
                onSelect={handleSelect}
                placeholder="Quick Links"
                searchable={false}
                darkMode={darkMode}
                className="min-w-[200px]"
              />
            </div>

            <button
              className="xl:hidden p-2"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (isOpen) setIsOpen(false); 
              }}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>


        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="xl:hidden fixed top-16 left-0 right-0 bg-inherit z-[99]" 
              style={{ backdropFilter: "blur(10px)" }} 
            >
              <ul className="py-4 space-y-2 border-t">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="block px-4 py-3 hover:bg-indigo-500 hover:text-white rounded-lg transition-colors mx-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="px-4">
                  <CustomDropdown
                    options={dropdownOptions}
                    selected={null}
                    onSelect={handleSelect}
                    placeholder="Quick Links"
                    searchable={false}
                    darkMode={darkMode}
                    className="w-full"
                    menuPosition="above"
                  />
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
