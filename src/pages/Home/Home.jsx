import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useTransform, useViewportScroll } from 'framer-motion';
import { FiClock, FiShoppingBag, FiTag, FiStar, FiTruck, FiShoppingCart, FiSearch, FiGrid } from 'react-icons/fi';
import { Chart } from 'chart.js/auto';
import ProductCard from '../../Components/ProductCard/ProductCard';
import NewsletterForm from '../../Components/NewsletterForm/NewsletterForm';
import CategoryCard from '../../Components/CategoryCard/CategoryCard';
import ParticleField from '../../Components/ParticleField/ParticleField';
import ARSection from '../../Components/ARSection/ARSection';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const { darkMode } = useOutletContext();
  const [allProducts, setAllProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [timer, setTimer] = useState(10);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartPreview, setCartPreview] = useState(false);
  const chartRef = useRef(null);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Dynamic background effects
  const colors = darkMode 
    ? ['#6366f1', '#10b981', '#3b82f6', '#f59e0b']
    : ['#a5b4fc', '#6ee7b7', '#93c5fd', '#fcd34d'];
  
  const floatingShapes = Array(20).fill().map((_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 50 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 5 + 3
  }));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('https://dummyjson.com/products?limit=100'),
          axios.get('https://dummyjson.com/products/categories')
        ]);

        const processedProducts = productsRes.data.products.map(product => ({
          ...product,
          image: product.thumbnail,
          discountedPrice: product.price * (1 - product.discountPercentage / 100),
          rating: Math.min(5, product.rating)
        }));

        setAllProducts(processedProducts);
        setTrendingProducts(getRandomProducts(processedProducts, 8));
        setFeaturedProducts(getRandomProducts(processedProducts, 4));
        setCategories(categoriesRes.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: trendingProducts.map(p => p.title),
          datasets: [{
            label: 'Price Trend',
            data: trendingProducts.map(p => p.price),
            borderColor: darkMode ? '#6366f1' : '#4f46e5',
            tension: 0.4,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { display: false },
            x: { display: false }
          }
        }
      });

      chartRef.current.chartInstance = newChartInstance;
    }
  }, [trendingProducts, darkMode]);

 
  const floatingTransition = (i) => ({
    duration: i.duration,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut'
  });

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };


  const getRandomProducts = (products, count) => {
    return [...products].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const filteredProducts = allProducts.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeCategory === 'all' || product.category === activeCategory)
  );


  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <ParticleField darkMode={darkMode} />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="animate-pulse space-y-8">
            <div className={`h-[600px] ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-2xl mb-16 relative overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${darkMode ? 'from-gray-800 to-gray-700' : 'from-gray-200 to-gray-300'} animate-shimmer`} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`h-32 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl animate-pulse`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} `}>
      <ParticleField darkMode={darkMode} />
      
      <div className="relative z-10">
     
        <motion.section 
          className="relative h-screen overflow-hidden"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${darkMode ? 'from-gray-900 to-gray-800' : 'from-blue-50 to-purple-50'}`}
            style={{ scale }}
          >
            {floatingShapes.map((shape) => (
              <motion.div
                key={shape.id}
                className="absolute rounded-full blur-lg opacity-20"
                style={{
                  width: shape.size,
                  height: shape.size,
                  left: `${shape.x}%`,
                  backgroundColor: shape.color
                }}
                animate={{
                  y: [0, 100, 0],
                  x: [shape.x, shape.x + 10, shape.x],
                  scale: [1, 1.2, 1]
                }}
                transition={floatingTransition(shape)}
              />
            ))}
          </motion.div>

          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <motion.div 
              className="max-w-4xl space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className={`text-4xl md:text-8xl font-bold leading-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}>
                Next Generation
                <br />
                Shopping Experience
              </h1>
              
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="text"
                  placeholder="Search Products..."
                  className={`w-full px-8 py-5 rounded-2xl backdrop-blur-xl border-2 focus:outline-none focus:border-purple-400 pr-24 max-sm:text-[9px] ${
                    darkMode 
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-white/80 border-gray-200 text-gray-900'
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className={`absolute right-8 top-6 text-2xl ${
                  darkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
              </motion.div>
            </motion.div>
          </div>

     
          <motion.div 
            className="hidden absolute right-5 top-1/4 -translate-y-1/2 lg:block"
            animate={{
              rotateY: [0, 180, 0],
              rotateZ: [0, 10, -10, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className={`w-96 h-96 backdrop-blur-xl rounded-3xl shadow-2xl  p-6 transform-style-preserve-3d ${
              darkMode ? 'bg-white/10 border-white/20' : 'bg-white/80 border-gray-200'
            }`}>
              <div className={`absolute inset-0 border-2 rounded-3xl ${
                darkMode ? 'border-white/20' : 'border-gray-200'
              }`} />
              <img 
                src={featuredProducts[0]?.image} 
                alt="Featured" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </motion.section>

  
        <section className={`relative py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              
              {categories.map((category, index) => (
              
                <motion.div
                  key={index}
                  variants={featureVariants}
                  className="md:col-span-4 lg:col-span-2"
                >
                  <CategoryCard
                    category={category.slug}
                    isActive={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                    className="hover:transform hover:scale-105 hover:shadow-2xl"
                    darkMode={darkMode}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-2xl mb-20`}>
              <h3 className={`text-2xl mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Market Trends</h3>
              <canvas ref={chartRef} className="h-48" />
            </div>
          </div>
        </section>

 
        <section className={`relative py-20 overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
              <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 lg:mb-0`}>
                Trending Technologies
              </h2>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center px-6 py-3 rounded-full ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  <FiClock className={`mr-3 text-xl ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                    Next Refresh: {timer}s
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence>
                {filteredProducts.slice(0, 8).map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="relative group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                      darkMode ? 'from-blue-500 to-purple-500' : 'from-blue-400 to-purple-400'
                    }`} />
                    <ProductCard
                      product={product}
                      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} backdrop-blur-xl hover:shadow-2xl transition-all`}
                      showQuickView
                      showWishlist
                      darkMode={darkMode}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <ARSection featuredProduct={featuredProducts[0]} darkMode={darkMode} />
        
 
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <div className={`bg-gradient-to-r rounded-3xl p-1 shadow-2xl ${
              darkMode ? 'from-blue-500 to-purple-500' : 'from-blue-400 to-purple-400'
            }`}>
              <div className={`rounded-3xl p-12 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <NewsletterForm 
                  className="max-w-2xl mx-auto"
                  inputStyle={`${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} focus:border-purple-400`}
                  buttonStyle={`${darkMode ? 'bg-purple-500 hover:bg-purple-400' : 'bg-purple-600 hover:bg-purple-500'} text-white`}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;



