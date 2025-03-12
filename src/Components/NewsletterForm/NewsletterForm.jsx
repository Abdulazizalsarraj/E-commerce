import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');


    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden max-sm:flex-col">
     
          <div className="pl-4 max-sm:pl-0">
            <FiMail className="text-gray-500 text-xl" />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 focus:outline-none text-black max-sm:text-[10px] max-sm:px-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full m-1 transition-all hover:scale-105 disabled:opacity-50 max-sm:px-1 max-sm:py-1 max-sm:text-[10px]"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Submitting...' : 'Subscribe'}
          </button>
        </div>


        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full text-center"
            >
              <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full">
                <FiCheck className="mr-2" />
                Success! Thank you for subscribing.
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full text-center"
            >
              <div className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full">
                <FiAlertCircle className="mr-2" />
                {errorMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>


      <p className="text-center text-sm text-gray-500 mt-4">
        By subscribing, you agree to our{' '}
        <Link to="/privacy-policy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
        . We respect your privacy and never spam.
      </p>
    </motion.div>
  );
};

export default NewsletterForm;