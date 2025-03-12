import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, useOutletContext } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard/ProductCard';
import CustomDropdown from '../../utils/custom-dropdown/CustomDropdown';

const ProductsPage = () => {

  const { darkMode } = useOutletContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedSort = searchParams.get('sort') || '';
  const searchQuery = searchParams.get('search') || '';
  const maxPrice = searchParams.get('maxPrice') || Infinity;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=100');
        const productsWithDiscounts = response.data.products.map(product => ({
          ...product,
          image: product.thumbnail,
          discountedPrice: product.price * (1 - product.discountPercentage / 100),
        }));
        setProducts(productsWithDiscounts);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  const handleCategoryChange = (category) => {
    category === 'all'
      ? searchParams.delete('category')
      : searchParams.set('category', category);
    setSearchParams(searchParams);
  };


  const handleSortChange = (sortValue) => {
    sortValue
      ? searchParams.set('sort', sortValue)
      : searchParams.delete('sort');
    setSearchParams(searchParams);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    query
      ? searchParams.set('search', query)
      : searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value === '' ? Infinity : Math.max(0, Number(e.target.value));
    value === Infinity
      ? searchParams.delete('maxPrice')
      : searchParams.set('maxPrice', value);
    setSearchParams(searchParams);
  };


  const filteredProducts = products
    .filter(product =>
      selectedCategory === 'all' || product.category === selectedCategory
    )
    .filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(product =>
      maxPrice === Infinity || product.discountedPrice <= maxPrice
    )
    .sort((a, b) => {
      switch (selectedSort) {
        case 'price_desc':
          return b.discountedPrice - a.discountedPrice;
        case 'price_asc':
          return a.discountedPrice - b.discountedPrice;
        case 'name_asc':
          return a.title.localeCompare(b.title);
        case 'name_desc':
          return b.title.localeCompare(a.title);
        case 'rating_desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto p-4">
      <h1
        className={`text-3xl font-bold mb-8 text-center ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Our Products
      </h1>

      <div className="flex flex-wrap gap-4 mb-8">

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
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
          options={
            [
              { value: 'all', label: 'All' },
              ...new Set(products.map(product => product.category))
            ].map(category => {
         
              if (typeof category === 'object') return category; 
              return {
                value: category,
                label: category.charAt(0).toUpperCase() + category.slice(1),
              };
            })
          }
          selected={{
            value: selectedCategory,
            label:
              selectedCategory === 'all'
                ? 'All'
                : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1),
          }}
          onSelect={(option) => handleCategoryChange(option.value)}
          placeholder="Filter by Category"
          className="w-full md:w-1/4"
          darkMode={darkMode}
        />

      
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice === Infinity ? '' : maxPrice}
          onChange={handleMaxPriceChange}
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
          options={[
            { value: '', label: 'Default Sorting' },
            { value: 'price_desc', label: 'Price: High to Low' },
            { value: 'price_asc', label: 'Price: Low to High' },
            { value: 'name_asc', label: 'Alphabetical: A-Z' },
            { value: 'name_desc', label: 'Alphabetical: Z-A' },
            { value: 'rating_desc', label: 'Rating: High to Low' },
          ]}
          selected={{ value: selectedSort, label: sortLabel(selectedSort) }}
          onSelect={(option) => handleSortChange(option.value)}
          placeholder="Sort By"
          className="w-full md:w-1/4"
          darkMode={darkMode}
        />
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={() => navigate(`/product/${product.id}`)}
              darkMode={darkMode}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};


function sortLabel(value) {
  switch (value) {
    case 'price_desc': return 'Price: High to Low';
    case 'price_asc': return 'Price: Low to High';
    case 'name_asc': return 'Alphabetical: A-Z';
    case 'name_desc': return 'Alphabetical: Z-A';
    case 'rating_desc': return 'Rating: High to Low';
    default: return 'Default Sorting';
  }
}

export default ProductsPage;
