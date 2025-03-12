import React from "react";

const ProductsCard = ({ product, onProductClick, onAddToCart }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover mb-4 rounded-lg cursor-pointer"
        onClick={onProductClick} 
      />
      <h3 className="text-xl font-semibold">{product.title}</h3>
      <p className="text-gray-600">{product.description.slice(0, 100)}...</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>
      <button
        onClick={onAddToCart}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductsCard;
