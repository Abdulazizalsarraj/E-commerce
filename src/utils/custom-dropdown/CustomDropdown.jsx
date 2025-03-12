// // components/CustomDropdown.jsx
// import { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import PropTypes from 'prop-types';
// import { FiChevronDown, FiCheck, FiSearch } from 'react-icons/fi';

// const CustomDropdown = ({
//   options,
//   selected,
//   onSelect,
//   placeholder = 'Select an option',
//   searchable = false,
//   icon: Icon,
//   className,
//   dropdownClass,
//   itemClass,
//   showCheck = true,
//   disabled = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);

//   const filteredOptions = options.filter(option =>
//     option.label.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div
//       className={`relative ${className}`}
//       ref={dropdownRef}
//     >
//       <button
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//         className={`w-full flex items-center justify-between p-3 rounded-lg border ${
//           disabled
//             ? 'bg-gray-100 cursor-not-allowed'
//             : 'bg-white hover:border-primary-500 focus:border-primary-500'
//         } transition-all`}
//         disabled={disabled}
//       >
//         <div className="flex items-center space-x-2">
//           {selected?.icon && <selected.icon className="w-5 h-5" />}
//           <span className={selected?.value ? 'text-gray-800' : 'text-gray-400'}>
//             {selected?.label || placeholder}
//           </span>
//         </div>
//         <FiChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className={`absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl ${dropdownClass}`}
//           >
//             {searchable && (
//               <div className="p-2 border-b">
//                 <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
//                   <FiSearch className="w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     className="w-full ml-2 bg-transparent outline-none"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>
//             )}

//             <ul className="max-h-60 overflow-y-auto">
//               {filteredOptions.map((option) => (
//                 <li
//                   key={option.value}
//                   onClick={() => {
//                     onSelect(option);
//                     setIsOpen(false);
//                   }}
//                   className={`flex items-center justify-between p-3 cursor-pointer hover:bg-primary-50 ${
//                     selected?.value === option.value ? 'bg-primary-50' : ''
//                   } ${itemClass}`}
//                 >
//                   <div className="flex items-center space-x-2">
//                     {option.icon && <option.icon className="w-5 h-5" />}
//                     <span>{option.label}</span>
//                   </div>
//                   {showCheck && selected?.value === option.value && (
//                     <FiCheck className="w-5 h-5 text-primary-600" />
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// CustomDropdown.propTypes = {
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.any.isRequired,
//       label: PropTypes.string.isRequired,
//       icon: PropTypes.elementType,
//     })
//   ).isRequired,
//   selected: PropTypes.object,
//   onSelect: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   searchable: PropTypes.bool,
//   icon: PropTypes.elementType,
//   className: PropTypes.string,
//   dropdownClass: PropTypes.string,
//   itemClass: PropTypes.string,
//   showCheck: PropTypes.bool,
//   disabled: PropTypes.bool,
// };

// export default CustomDropdown;

// components/CustomDropdown.jsx
// CustomDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { FiChevronDown, FiCheck, FiSearch } from "react-icons/fi";

const CustomDropdown = ({
  options,
  selected,
  onSelect,
  placeholder = "Select an option",
  searchable = false,
  icon: Icon,
  className = "",
  dropdownClass = "",
  itemClass = "",
  showCheck = true,
  disabled = false,
  darkMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>

      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between p-3 rounded-lg border transition-all
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : darkMode
              ? "bg-gray-700 border-gray-600 text-white hover:border-gray-400"
              : "bg-white border-gray-300 text-gray-800 hover:border-indigo-500"
          }
        `}
        disabled={disabled}
      >
        {selected?.icon && <Icon className="mr-2" />}
        <span>{selected?.label || placeholder}</span>
        <FiChevronDown
          className={`transition-transform ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`
              absolute z-10 mt-2 w-full border rounded-lg shadow-lg overflow-hidden
              ${dropdownClass}
              ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-200 text-gray-800"
              }
            `}
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
        
            {searchable && (
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`
                  p-3 border-b w-full outline-none
                  ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                      : "bg-white border-gray-200 text-gray-800 placeholder-gray-500"
                  }
                `}
              />
            )}

      
            <div className="relative">
         
              <div>
                {filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSelect(option);
                      setIsOpen(false);
                    }}
                    className={`
                      flex items-center w-full justify-between p-4 cursor-pointer
                      ${
                        selected?.value === option.value
                          ? darkMode
                            ? "bg-gray-600"
                            : "bg-indigo-50"
                          : ""
                      }
                      ${
                        darkMode
                          ? "hover:bg-gray-600 text-white"
                          : "hover:bg-indigo-50 hover:text-gray-800"
                      }
                      ${itemClass}
                    `}
                  >
                    {option.icon && <option.icon className="mr-2" />}
                    <span>{option.label}</span>
                    {showCheck && selected?.value === option.value && (
                      <FiCheck className="ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
    })
  ).isRequired,
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  icon: PropTypes.elementType,
  className: PropTypes.string,
  dropdownClass: PropTypes.string,
  itemClass: PropTypes.string,
  showCheck: PropTypes.bool,
  disabled: PropTypes.bool,
  darkMode: PropTypes.bool,
};

export default CustomDropdown;
