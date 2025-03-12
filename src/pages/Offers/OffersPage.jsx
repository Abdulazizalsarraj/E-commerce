import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard/ProductCard';
import CustomDropdown from '../../utils/custom-dropdown/CustomDropdown';

const OffersPage = () => {

  const { darkMode } = useOutletContext();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [selectedSort, setSelectedSort] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('https://dummyjson.com/products');
      const filteredProducts = data.products
        .filter(product => product.discountPercentage >= 15)
        .map(product => ({
          ...product,
          image: product.thumbnail,
          discountedPrice: product.price * (1 - product.discountPercentage / 100),
        }));
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const categories = ['all', ...new Set(products.map(product => product.category))];
  const categoryOptions = categories.map(category => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
  }));


  const sortOptions = [
    { value: '', label: 'Default Sorting' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'name_asc', label: 'Alphabetical: A-Z' },
    { value: 'name_desc', label: 'Alphabetical: Z-A' },
    { value: 'rating_desc', label: 'Rating: High to Low' },
  ];

 
  const filterProducts = () => {
    let filtered = products;

  
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

   
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

   
    if (maxPrice < Infinity) {
      filtered = filtered.filter(product => product.discountedPrice <= maxPrice);
    }

 
    switch (selectedSort) {
      case 'price_desc':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'price_asc':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'name_asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating_desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  return (
    <div className="container mx-auto p-4">
      <h1
        className={`text-3xl font-bold mb-8 text-center ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        🔥 Special Offers (15%+ Discount) 🔥
      </h1>


      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-8">
      
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`
            p-2 border rounded-lg w-full md:w-1/4 outline-none
            ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-300'
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
            }
          `}
        />

        
        <CustomDropdown
          options={categoryOptions}
          selected={categoryOptions.find(option => option.value === selectedCategory)}
          onSelect={(option) => setSelectedCategory(option.value)}
          placeholder="Filter by Category"
          className="w-full md:w-1/4"
          darkMode={darkMode}  
        />


        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice === Infinity ? '' : maxPrice}
          onChange={(e) => {
            const value = e.target.value === '' ? Infinity : Math.max(0, Number(e.target.value));
            setMaxPrice(value);
          }}
          min="0"
          className={`
            p-2 border rounded-lg w-full md:w-1/5 outline-none
            ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-300'
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
            }
          `}
        />


        <CustomDropdown
          options={sortOptions}
          selected={sortOptions.find(option => option.value === selectedSort)}
          onSelect={(option) => setSelectedSort(option.value)}
          placeholder="Sort By"
          className="w-full md:w-1/4"
          darkMode={darkMode} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterProducts().length > 0 ? (
          filterProducts().map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={() => navigate(`/product/${product.id}`)}
              darkMode={darkMode}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No offers available matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
