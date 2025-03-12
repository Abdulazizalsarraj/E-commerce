import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGrid, FiArrowRight, FiSmartphone, FiZoomIn, FiX } from 'react-icons/fi';
import ModelViewer from '../ModelViewer/ModelViewer';

const ARSection = ({ featuredProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const floatingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 15 }
    }
  };

  return (
    <section 
      className="relative h-[150vh] flex items-center justify-center overflow-hidden"
      ref={ref}
      id="ar-section"
    >

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black/95">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-white/10 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.8, 1.4, 0.8],
              rotate: [0, 720],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: Math.random() * 15 + 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full">
        <motion.div
          className="max-w-6xl mx-auto h-full flex flex-col justify-center text-center"
          variants={floatingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-6xl font-bold text-white mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            {featuredProduct?.title} AR Experience
          </motion.h2>

          <motion.div
            className="relative w-full aspect-[16/9] bg-gray-800/30 backdrop-blur-2xl rounded-4xl overflow-hidden border-2 border-white/20 hover:border-purple-400/40 transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            variants={itemVariants}
          >
       
            <div className={`absolute inset-0 transition-all duration-700 ${isModelVisible ? 'opacity-100' : 'opacity-0'}`}>
              <ModelViewer 
         
                scale={1.2}
                autoRotate={false} 
              />
            </div>


            <div className={`absolute inset-0 flex flex-col items-center justify-center gap-8 transition-all ${isModelVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <motion.button
                className="bg-white/95 text-black px-10 py-5 rounded-full text-2xl font-bold hover:bg-white flex items-center group relative overflow-hidden shadow-2xl"
                onClick={() => setIsModelVisible(true)}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-4 relative z-10">
                  <FiGrid className="text-3xl transition-transform group-hover:rotate-90" />
                  Explore in 3D
                  <FiArrowRight className="ml-3 text-xl transition-all group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity" />
              </motion.button>

              <div className="flex gap-6 text-white/90 text-lg">
                <div className="flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
                  <FiSmartphone className="text-2xl" />
                  <span>AR Supported</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
                  <FiZoomIn className="text-2xl" />
                  <span>Interactive Controls</span>
                </div>
              </div>
            </div>

   
            {isModelVisible && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
                <button 
                  className="px-6 py-3 rounded-full bg-white/15 backdrop-blur-lg text-white hover:bg-white/25 transition-all flex items-center gap-3 text-lg"
                  onClick={() => setIsModelVisible(false)}
                >
                  <FiX className="text-2xl" />
                  Exit Viewer
                </button>
              </div>
            )}
          </motion.div>

          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-3"
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <FiArrowRight className="text-4xl rotate-90 animate-bounce" />
            <span className="text-sm tracking-wider">Keep Scrolling</span>
          </motion.div>
        </motion.div>
      </div>


      {isHovered && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute w-[40rem] h-[40rem] bg-purple-500/10 rounded-full blur-[100px] -top-1/4 -left-1/4" />
          <div className="absolute w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[100px] -bottom-1/4 -right-1/4" />
        </motion.div>
      )}
    </section>
  );
};

export default ARSection;
