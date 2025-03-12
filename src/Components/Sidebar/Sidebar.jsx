import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Store/auth/authSlice";
import {
  FaHome,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaQuestionCircle,
  FaPhoneAlt,
  FaBoxes,
  FaSignInAlt,
  FaUserPlus,
  FaCogs,
  FaChartBar,
  FaTags,
  FaTruck,
  FaInfoCircle,
  FaHeart,
  FaThList, 
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, setIsOpen, darkMode }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logoutUser());
      setIsOpen(false);
    }
  };


  return (
    <motion.div
      initial={{ width: isOpen ? "16rem" : "5.5rem" }}
      animate={{ width: isOpen ? "16rem" : "5.5rem" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed top-0 left-0 h-full shadow-lg z-[60] flex flex-col overflow-y-auto 
      ${darkMode ? "bg-gray-800" : "bg-white"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center overflow-hidden">
          <img
            src="/src/assets/images/logo11.png"
            alt="Logo"
            className={`transition-all duration-300 ${isOpen ? "w-12" : "w-8"}`}
          />
          <motion.h2
            className="text-2xl font-bold ml-6 whitespace-nowrap overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: isOpen ? "block" : "none" }}
          >
            MyStore
          </motion.h2>
        </div>
      </div>


      <nav className={`p-4 space-y-4 flex-grow`}>
     
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-gray-400 uppercase text-sm font-semibold">
            General
          </h3>
        </motion.div>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg transition ${
              isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <FaHome className="text-2xl min-w-6" />
          <motion.span
            className="ml-3 overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isOpen ? 1 : 1, width: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            Home
          </motion.span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg transition ${
              isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <FaThList className="text-2xl min-w-6" /> 
          <motion.span
            className="ml-3 overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isOpen ? 1 : 1, width: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            Products
          </motion.span>
        </NavLink>

        <NavLink
          to="/offers"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg transition ${
              isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <FaTags className="text-2xl min-w-6" />
          <motion.span
            className="ml-3 overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isOpen ? 1 : 1, width: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            Offers
          </motion.span>
        </NavLink>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg transition ${
              isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <FaHeart className="text-2xl min-w-6" />
          <motion.span
            className="ml-3 overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isOpen ? 1 : 1, width: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            Wishlist
          </motion.span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg transition ${
              isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <FaShoppingCart className="text-2xl min-w-6" /> 
          <motion.span
            className="ml-3 overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isOpen ? 1 : 1, width: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            Cart
          </motion.span>
        </NavLink>


        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-gray-400 uppercase text-sm font-semibold">
            Analytics
          </h3>
        </motion.div>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg transition ${
              isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <FaChartBar className="text-2xl min-w-6" />
          <motion.span
            className="ml-3 overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isOpen ? 1 : 1, width: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            Analytics
          </motion.span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg transition ${
              isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <FaCogs className="text-2xl min-w-6" />
          <motion.span
            className="ml-3 overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isOpen ? 1 : 1, width: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            Settings
          </motion.span>
        </NavLink>

    
        {isAuthenticated ? (
          <>
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-gray-400 uppercase text-sm font-semibold">
                Account
              </h3>
            </motion.div>

            <NavLink
              to="/account"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg transition ${
                  isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaUser className="text-2xl min-w-6" />
              <motion.span
                className="ml-3 overflow-hidden whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isOpen ? 1 : 1,
                  width: isOpen ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                My Account
              </motion.span>
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center p-2 w-full rounded-lg hover:bg-red-500 transition"
            >
              <FaSignOutAlt className="text-2xl min-w-6" />
              <motion.span
                className="ml-3 overflow-hidden whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isOpen ? 1 : 1,
                  width: isOpen ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                Logout
              </motion.span>
            </button>
          </>
        ) : (
          <>
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-gray-400 uppercase text-sm font-semibold">
                Authentication
              </h3>
            </motion.div>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg transition ${
                  isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaSignInAlt className="text-2xl min-w-6" />
              <motion.span
                className="ml-3 overflow-hidden whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isOpen ? 1 : 1,
                  width: isOpen ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                Login
              </motion.span>
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg transition ${
                  isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaUserPlus className="text-2xl min-w-6" />
              <motion.span
                className="ml-3 overflow-hidden whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isOpen ? 1 : 1,
                  width: isOpen ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                Register
              </motion.span>
            </NavLink>
          </>
        )}

  
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-gray-400 uppercase text-sm font-semibold">
            Help & Support
          </h3>
        </motion.div>

        <NavLink
          to="/faq"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg transition ${
              isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <FaQuestionCircle className="text-2xl min-w-6" />
          <motion.span
            className="ml-3 overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isOpen ? 1 : 1, width: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            FAQ
          </motion.span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg transition ${
              isActive ? "bg-indigo-500" : "hover:bg-indigo-500"
            }`
          }
          onClick={() => setIsOpen(false)}
        >
          <FaPhoneAlt className="text-2xl min-w-6" />
          <motion.span
            className="ml-3 overflow-hidden whitespace-nowrap"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isOpen ? 1 : 1, width: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            Contact Us
          </motion.span>
        </NavLink>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
