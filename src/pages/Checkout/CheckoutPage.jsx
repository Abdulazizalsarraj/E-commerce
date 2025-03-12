
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutPage = () => {

  const { darkMode } = useOutletContext();
  const cartItems = useSelector((state) => state.cart.items);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order submitted!");
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <motion.div
      className={`min-h-screen -mt-7 flex flex-col items-center justify-center py-10 px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`w-full max-w-4xl rounded-xl shadow-xl p-8 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-green-400">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={shippingInfo.name}
              onChange={handleShippingChange}
              className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-gray-900 border-gray-300"
              }`}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-gray-900 border-gray-300"
              }`}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-gray-900 border-gray-300"
              }`}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingInfo.postalCode}
              onChange={handleShippingChange}
              className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-gray-900 border-gray-300"
              }`}
            />
          </div>


          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-lg shadow-md ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 px-4">
                    <p className={`font-semibold ${darkMode ? "text-green-300" : "text-green-500"}`}>{item.name}</p>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {item.description.slice(0, 50)}...
                    </p>
                  </div>
                  <div className="font-semibold text-green-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </motion.div>
              ))}
              <div className="flex justify-between items-center text-xl font-bold text-green-400">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() => {

              window.location.href = "/payment";
            }}
            className="w-full bg-green-500 text-white py-3 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Payment
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutPage;
