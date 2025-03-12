import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Store/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
    return discountedPrice / (1 - discountPercentage / 100);
  };

  const total = items.reduce(
    (acc, item) => acc + (item.discountedPrice || item.price) * item.quantity,
    0
  );

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    toast.error(`${item.name} removed from cart`);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
      toast.error("Cart cleared");
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b py-8 px-4 xs:px-2 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <Link
            to="/products"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center">Your Cart</h1>
          <div className="sm:w-24"></div>
        </div>

        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-4" // Center content
            >
              <FaShoppingCart className="text-6xl text-gray-400" /> {/* Add cart icon */}
              <p className="text-2xl text-gray-600 mb-4">Your cart is empty</p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.ul className="space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="rounded-xl shadow-xl p-4 sm:p-6 flex flex-col xs:flex-row items-center justify-between hover:shadow-2xl transition-shadow"
                    >
                      <div className="flex items-center flex-1 w-full xs:w-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-24 sm:h-24 object-contain rounded-lg"
                        />
                        <div className="ml-2 sm:ml-4">
                          <h2 className="text-base sm:text-xl font-semibold text-gray-900">
                            {item.name}
                          </h2>
                          <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="mt-1 sm:mt-2">
                            {item.discountPercentage > 0 ? (
                              <>
                                <span className="text-sm sm:text-lg font-semibold text-green-600">
                                  ${item.discountedPrice.toFixed(2)}
                                </span>
                                <span className="ml-2 text-xs sm:text-sm text-gray-500 line-through">
                                  ${calculateOriginalPrice(item.discountedPrice, item.discountPercentage).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-sm sm:text-lg font-semibold">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full xs:w-auto mt-4 xs:mt-0">
                        <div className="flex items-center flex-col xs:flex-row gap-2 sm:gap-4 mr-4 sm:mr-8">
                          <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-100 rounded-lg px-2 sm:px-3 py-1">
                            <button
                              onClick={() => dispatch(decreaseQuantity(item))}
                              className="text-gray-600 hover:text-blue-600 transition-colors p-1"
                              disabled={item.quantity === 1}
                            >
                              <FaMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <span className="font-semibold w-6 text-center text-gray-900 text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch(increaseQuantity(item))}
                              className="text-gray-600 hover:text-blue-600 transition-colors p-1"
                            >
                              <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-blue-600">
                            ${((item.discountedPrice || item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRemove(item)}
                          className="ml-2 sm:ml-4 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>

              <div className="mt-12 rounded-xl shadow-lg p-4 sm:p-8">
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-lg sm:text-xl font-semibold mb-4">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Discount Code
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        className="flex-1 border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter promo code"
                      />
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm sm:text-base">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <button
                      onClick={handleClearCart}
                      className="w-full py-2 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center text-sm sm:text-base"
                    >
                      <FaTrash className="mr-2 text-xs sm:text-sm" />
                      Clear Cart
                    </button>

                    <Link
                      to="/checkout"
                      className="block w-full py-2 sm:py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Cart;
