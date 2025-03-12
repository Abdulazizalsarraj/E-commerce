import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../Store/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../Store/wishlist/wishListSlice";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

const ProductDetailsPage = () => {
 
  const { darkMode } = useOutletContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product?.id);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct({
          ...response.data,
          image: response.data.thumbnail,
          discountedPrice: response.data.price * (1 - response.data.discountPercentage / 100)
        });
      } catch (error) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      const itemToAdd = {
        ...product,
        price: product.discountedPrice, 
        discountedPrice: product.discountedPrice
      };
      dispatch(addItem(itemToAdd));
    }
  }, [dispatch, product]);

  const handleToggleWishlist = useCallback(() => {
    if (product) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product));
      } else {
        dispatch(addToWishlist({
          ...product,
          discountedPrice: product.discountedPrice
        }));
      }
    }
  }, [dispatch, product, isInWishlist]);

  const handleGoBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleGoBackToProducts = useCallback(() => {
    navigate("/products");
  }, [navigate]);


  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href
      })
      .then(() => console.log("Product shared successfully!"))
      .catch((error) => console.error("Error sharing product:", error));
    } else {

      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((error) => console.error("Failed to copy link:", error));
    }
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Product not found!</div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain rounded-lg mb-4"
          />
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} - ${index + 1}`}
                className="w-full h-24 object-contain rounded-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setProduct({ ...product, image: img })}
              />
            ))}
          </div>
        </div>

     
        <div>
          <h1 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
            {product.title}
          </h1>
          
          <div className="mt-2">
            {product.discountPercentage > 0 ? (
              <>
                <span className={`line-through text-xl ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-2xl font-semibold text-green-600 ml-2">
                  ${product.discountedPrice.toFixed(2)} ({product.discountPercentage}% OFF)
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {product.description}
          </p>
          
          <div className="mt-6 flex flex-wrap items-center gap-4">
      
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full ${darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"} text-white`}
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
         
            <button
              onClick={handleAddToCart}
              className={`px-6 py-2 rounded-lg ${darkMode ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-500 hover:bg-blue-600"} text-white`}
            >
              Add to Cart
            </button>
        
            <button
              onClick={handleGoBackToProducts}
              className={`px-6 py-2 rounded-lg ${darkMode ? "bg-yellow-600 hover:bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-600"} text-white`}
            >
              Back to Products
            </button>
    
            <button
              onClick={handleGoBack}
              className={`px-6 py-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-500 hover:bg-gray-600"} text-white`}
            >
              Back to Home
            </button>
           
            <button
              onClick={handleShare}
              className={`px-6 py-2 rounded-lg flex items-center gap-2 ${darkMode ? "bg-indigo-700 hover:bg-indigo-800" : "bg-indigo-500 hover:bg-indigo-600"} text-white`}
            >
              <FaShareAlt />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
