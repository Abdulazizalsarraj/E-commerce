import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

const FAQPage = () => {

  const { darkMode } = useOutletContext();


  const [activeIndices, setActiveIndices] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');


  const faqs = [
    { question: 'How do I place an order?', answer: 'Simply browse our products and add them to your cart.' },
    { question: 'What payment methods do you accept?', answer: 'We accept credit cards, PayPal, and bank transfers.' },
    { question: 'Can I return a product?', answer: 'Yes, you can return most products within 30 days of purchase.' },
    { question: 'Do you offer international shipping?', answer: 'Yes, we ship to most countries worldwide.' },
    { question: 'How can I track my order?', answer: 'Once your order ships, we will send you a tracking number via email.' },
    { question: 'How do I contact customer service?', answer: 'You can reach us via the contact form on our website or by email.' },
    { question: 'What is your refund policy?', answer: 'You can request a refund within 14 days of purchase if the product is defective or not as described.' },
    { question: 'Can I change my order after placing it?', answer: 'Changes can be made within 1 hour of order placement. After that, the order may be processed for shipping.' },
    { question: 'Do you offer gift wrapping?', answer: 'Yes, we offer gift wrapping for an additional fee. Please select the option at checkout.' },
    { question: 'How secure is my personal information?', answer: 'We take your privacy seriously and use secure encryption methods to protect your data.' },
  ];


  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const toggleAnswer = (index) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter(i => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };


  const collapseAll = () => {
    setActiveIndices([]);
  };


  const expandAll = () => {
    const allIndices = filteredFaqs.map((_, index) => index);
    setActiveIndices(allIndices);
  };


  const faqItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };


  const answerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
  };

  return (
    <div
      className={`min-h-screen p-6 flex flex-col items-center ${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'
      }`}
    >

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-8"
      >
        Frequently Asked Questions
      </motion.h1>


      <div className="w-full max-w-3xl mb-6 flex flex-col sm:flex-row items-center gap-4">
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full sm:w-2/3 p-4 rounded-lg border ${
            darkMode ? 'border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSearchQuery('')}
          className="w-full sm:w-1/3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-300"
        >
          Clear Search
        </motion.button>
      </div>


      {filteredFaqs.length > 0 ? (
        <div className="w-full max-w-3xl space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={faqItemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-lg shadow-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
              }`}
            >

              <div
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h2 className="text-xl font-semibold">{faq.question}</h2>
                <motion.div
                  animate={{ rotate: activeIndices.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeIndices.includes(index) ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </motion.div>
              </div>
          
              <AnimatePresence>
                {activeIndices.includes(index) && (
                  <motion.div
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="mt-4 overflow-hidden"
                  >
                    <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
      
          <div className="flex justify-end gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={expandAll}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-300"
            >
              Expand All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={collapseAll}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-300"
            >
              Collapse All
            </motion.button>
          </div>
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 text-lg text-gray-500"
        >
          No FAQs match your search.
        </motion.p>
      )}
    </div>
  );
};

export default FAQPage;
