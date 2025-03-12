
import React from 'react';

const Drawer = ({ open, onClose, darkMode, toggleDarkMode }) => {
  return (
    <>
  
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      ></div>

  
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 transform transition-transform duration-300 
          ${open ? 'translate-x-0' : 'translate-x-full'} 
          ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-semibold">الإعدادات</h2>
          <button onClick={onClose} aria-label="إغلاق القائمة">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
       
          <label htmlFor="darkModeToggle" className="flex items-center cursor-pointer">
            <span className="mr-2">الوضع الليلي</span>
            <div className="relative">
              <input
                type="checkbox"
                id="darkModeToggle"
                className="sr-only"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div
                className={`dot absolute w-6 h-6 bg-white rounded-full shadow -top-1 -left-1 transition transform ${
                  darkMode ? 'translate-x-full bg-gray-600' : ''
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default Drawer;
