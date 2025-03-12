
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../../Store/wishlist/wishListSlice";
import { FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom"; 
import CustomDropdown from '../../utils/custom-dropdown/CustomDropdown';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);


  const { darkMode } = useOutletContext();

 
  const [sortOption, setSortOption] = useState("default");

  const [activeIndices, setActiveIndices] = useState([]);


  const sortOptions = [
    { value: "default", label: "Sort by Default" },
    { value: "title", label: "Sort by Title" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
    return discountedPrice / (1 - discountPercentage / 100);
  };

  const getEffectivePrice = (product) => {
    return product.discountPercentage > 0 ? product.discountedPrice : product.price;
  };

  let sortedItems = [...wishlistItems];
  if (sortOption === "title") {
    sortedItems.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "price-asc") {
    sortedItems.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
  } else if (sortOption === "price-desc") {
    sortedItems.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
  }

  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishlist(product));
    setActiveIndices(activeIndices.filter((i) => i !== sortedItems.indexOf(product)));
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    setActiveIndices([]);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const toggleActive = (index) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">
        Your Wishlist
      </h1>
      
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 px-4">
        <div className="text-lg">
          Total Items: {wishlistItems.length}
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0 max-sm:flex-col">
          <CustomDropdown
            options={sortOptions}
            selected={sortOptions.find(option => option.value === sortOption)}
            onSelect={(option) => setSortOption(option.value)}
            placeholder="Sort by..."
            className="w-64 max-sm:w-44"
            dropdownClass="min-w-[200px]"
            darkMode={darkMode} 
          />
          {wishlistItems.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Clear Wishlist
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            Your wishlist is empty.
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {sortedItems.map((product, index) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  relative border rounded-lg p-4 shadow-lg
                  ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'}
                `}
              >
                <div className="absolute top-2 right-2">
                  <FaHeart className="text-red-500" size={24} />
                </div>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded-md mb-4"
                />
                <h2 className="text-xl font-bold mb-2">
                  {product.title}
                </h2>
                <p className="truncate">{product.description}</p>
                <div className="mt-2">
                  {product.discountPercentage > 0 ? (
                    <>
                      <span className="text-lg font-semibold text-green-600">
                        ${product.discountedPrice.toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm line-through">
                        ${calculateOriginalPrice(product.discountedPrice, product.discountPercentage).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRemoveFromWishlist(product)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-red-600 transition-colors"
                >
                  Remove from Wishlist
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WishlistPage;
