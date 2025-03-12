/** @format */
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

const StripeCheckout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state) => state.cart.items);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);


  const { darkMode } = useOutletContext();

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setPaymentError(error.message);
      setProcessing(false);
    } else {
      setPaymentError(null);

      setTimeout(() => {
        setPaymentSuccess(true);
        setProcessing(false);
      }, 2000);
    }
  };

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center p-4 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-800'
          : 'bg-gradient-to-br from-gray-100 to-gray-200'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`max-w-md w-full rounded-2xl shadow-2xl p-8 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {paymentSuccess ? (
          <motion.div
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-gray-300">
              Your payment of ${calculateTotal()} has been processed.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Secure Payment
            </h2>

            <motion.div
              className="mb-6"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label
                className={`block mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Card Details
              </label>
              <div
                className={`p-3 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-100 border-gray-300'
                }`}
              >
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: darkMode ? '#fff' : '#000',
                        '::placeholder': {
                          color: darkMode ? '#9CA3AF' : '#6B7280',
                        },
                      },
                    },
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between mb-4">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Total Amount:
                </span>
                <span className="text-green-400 font-bold">
                  ${calculateTotal()}
                </span>
              </div>
            </motion.div>

            {paymentError && (
              <motion.div
                className="mb-4 text-sm"
                style={{ color: 'red' }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                {paymentError}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition-opacity disabled:opacity-50"
              disabled={!stripe || processing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(to right, #22c55e, #16a34a)',
                color: 'white',
              }}
            >
              {processing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                'Pay Now'
              )}
            </motion.button>

            <div className="mt-6 text-center text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                Test Card: 4242 4242 4242 4242
              </span>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default StripeCheckout;
