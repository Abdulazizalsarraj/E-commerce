import { Outlet, Navigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Drawer from "../Drawer/Drawer";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Layout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  if (
    !isAuthenticated &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {isAuthenticated ? (
        <>
       
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} darkMode={darkMode} />
          
    
          <Navbar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            openDrawer={() => setDrawerOpen(true)}
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode((prev) => !prev)}
          />

    
          <div
            style={{
              marginLeft: isOpen ? "16rem" : "5.5rem",
              transition: "margin-left 0.5s ease-in-out",
            }}
            className="flex flex-col min-h-screen pt-20"
          >
            <div
              style={{
                backgroundColor: darkMode ? "#111827" : "#F3F4F6",
              }}
              className="container mx-auto p-4 transition-colors duration-300"
            >
              <Outlet context={{ darkMode, setDarkMode }} />
            </div>
            <Footer darkMode={darkMode} />
          </div>

          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode((prev) => !prev)}
          />
        </>
      ) : (
        <div className="min-h-screen">
          <Outlet context={{ darkMode, setDarkMode }} />
        </div>
      )}
    </div>
  );
};

export default Layout;








