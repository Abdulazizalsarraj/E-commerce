import { motion } from 'framer-motion';
import { FiShoppingBag, FiStar, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ 
  category, 
  isActive, 
  onClick, 
  length, 
  darkMode,
  className,
  textClassName,
  activeStyle
}) => {
  const navigate = useNavigate();
  

  const safeCategory = typeof category === 'string' ? category : 'default';
  

  const categoryStyles = {
    electronics: { 
      bg: darkMode ? 'bg-blue-900/30' : 'bg-blue-100', 
      icon: <FiShoppingBag className={darkMode ? "text-blue-400" : "text-blue-600"} /> 
    },
    "men's clothing": { 
      bg: darkMode ? 'bg-green-900/30' : 'bg-green-100', 
      icon: <FiStar className={darkMode ? "text-green-400" : "text-green-600"} /> 
    },
    "women's clothing": { 
      bg: darkMode ? 'bg-pink-900/30' : 'bg-pink-100', 
      icon: <FiStar className={darkMode ? "text-pink-400" : "text-pink-600"} /> 
    },
    jewelry: { 
      bg: darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100', 
      icon: <FiStar className={darkMode ? "text-yellow-400" : "text-yellow-600"} /> 
    },
    default: { 
      bg: darkMode ? 'bg-gray-800' : 'bg-gray-100', 
      icon: <FiShoppingBag className={darkMode ? "text-gray-400" : "text-gray-600"} /> 
    }
  };

  const currentStyle = categoryStyles[safeCategory] || categoryStyles.default;

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-xl cursor-pointer group ${
        isActive ? activeStyle : ''
      } ${className}`}
      onClick={() => {
        onClick();
        navigate(`/products?category=${safeCategory}`);
      }}
    >
      <div className={`${currentStyle.bg} p-6 transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${
              darkMode ? 'bg-gray-700/50' : 'bg-white'
            } shadow-sm`}>
              {currentStyle.icon}
            </div>
            <h3 className={`text-lg font-semibold capitalize ${
              darkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {safeCategory.replace('-', ' ')}
            </h3>
          </div>
          <FiChevronRight className={`text-xl ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          } transform group-hover:translate-x-1 transition-transform`} />
        </div>
        

        <motion.div 
          className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full ${
            darkMode ? 'bg-white/10' : 'bg-black/10'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity
          }}
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t ${
          darkMode ? 'from-black/10' : 'from-white/10'
        } to-transparent`} />
      </div>

 
      <div className={`absolute inset-0 hidden group-hover:block ${
        darkMode ? 'bg-white/5' : 'bg-black/5'
      } transition-all`} />


      <div className={`absolute top-2 right-2 ${
        darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'
      } px-3 py-1 rounded-full text-sm shadow-sm`}>
        {length || 'Many'} Items
      </div>
    </motion.div>
  );
};

export default CategoryCard;