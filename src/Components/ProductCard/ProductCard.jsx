import { useCallback } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../Store/wishlist/wishListSlice";
import { addItem } from "../../Store/cart/cartSlice";

const ProductCard = ({ product, onProductClick, darkMode = false }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const calculateDiscountedPrice = () => {
    return product.price * (1 - product.discountPercentage / 100);
  };

  const handleToggleWishlist = useCallback(() => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  }, [dispatch, product, isInWishlist]);

  const handleAddToCart = useCallback(() => {
    const itemToAdd = {
      ...product,
      discountedPrice: calculateDiscountedPrice(),
    };
    dispatch(addItem(itemToAdd));
  }, [dispatch, product]);

  return (
    <div
      className={`
        border rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300 relative
        ${
          darkMode
            ? 'bg-gray-800 text-white border-gray-700'
            : 'bg-white text-gray-900 border-gray-300'
        }
      `}
    >

      <div onClick={() => onProductClick(product.id)} className="cursor-pointer">
        {product.discountPercentage > 0 && (
          <div
            className={`
              absolute top-2 left-2 px-2 py-1 rounded-full text-xs
              ${
                darkMode
                  ? 'bg-red-600 text-white'
                  : 'bg-red-500 text-white'
              }
            `}
          >
            -{product.discountPercentage}%
          </div>
        )}

        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-contain rounded-md mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
        <div className="flex items-center gap-2">
          {product.discountPercentage > 0 ? (
            <>
              <span className="text-gray-500 line-through">${product.price.toFixed(2)}</span>
              <span className="text-lg font-semibold text-green-600">
                ${calculateDiscountedPrice().toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <p className="truncate">{product.description}</p>
      </div>


      <button
        onClick={handleToggleWishlist}
        className={`
          absolute top-2 right-2 p-2 rounded-full
          ${
            darkMode
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-red-500 text-white hover:bg-red-600'
          }
        `}
      >
        {isInWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

    
      <button
        onClick={handleAddToCart}
        className={`
          px-4 py-2 rounded-lg mt-4 w-full transition-colors
          ${
            darkMode
              ? 'bg-blue-700 hover:bg-blue-800 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
        `}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
