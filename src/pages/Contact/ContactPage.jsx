import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

const AnimatedParticles = () => {

  const particles = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    size: Math.random() * 2 + 1, 
    top: Math.random() * 100, 
    left: Math.random() * 100,
    delay: Math.random() * 5,
  }));

  return (
    <>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
        />
      ))}
    </>
  );
};

const ContactPage = () => {
  const { darkMode } = useOutletContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 1 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, rotate: 1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };


  const handleClear = () => {
    setFormData({ name: '', email: '', message: '' });
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-white'
      }`}
    >
      <AnimatedParticles />

      <div
        className={`relative z-10 p-8 rounded-xl shadow-2xl w-full max-w-3xl ${
          darkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white'
        }`}
      >
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center"
        >
          <h1
            className={`text-4xl font-extrabold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Contact Us
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We'd love to hear from you. Reach out to us anytime!
          </p>
        </motion.header>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <motion.div variants={fieldVariants} className="flex flex-col">
            <label
              className={`mb-2 font-semibold text-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={`p-4 rounded-lg border ${
                darkMode
                  ? 'border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="flex flex-col">
            <label
              className={`mb-2 font-semibold text-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`p-4 rounded-lg border ${
                darkMode
                  ? 'border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="flex flex-col">
            <label
              className={`mb-2 font-semibold text-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Message
            </label>
            <textarea
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className={`p-4 rounded-lg border ${
                darkMode
                  ? 'border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="flex gap-4">
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-300 max-sm:py-2 max-sm:px-1 max-sm:text-[10px]"
            >
              Send Message
            </motion.button>
            <motion.button
              type="button"
              onClick={handleClear}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg transition duration-300 max-sm:py-2 max-sm:px-1 max-sm:text-[10px]"
            >
              Clear
            </motion.button>
          </motion.div>
        </motion.form>
      </div>

      <AnimatePresence>

      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg"
          >
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
