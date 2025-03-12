import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const BlogSection = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = useOutletContext(); 


  React.useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts") 
      .then((response) => {
        setArticles(response.data.slice(0, 10)); 
        setFilteredArticles(response.data.slice(0, 10));
      })
      .catch((error) => console.error(error));
  }, []);


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(term)
    );
    setFilteredArticles(filtered);
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className={`min-h-screen py-12 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Our Blog</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Stay updated with the latest news and articles.
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={handleSearch}
          className={`w-full max-w-md px-6 py-3 rounded-lg focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
              : "bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500"
          }`}
        />
      </div>


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
      >
        {filteredArticles.map((article) => (
          <motion.div
            key={article.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-6">
              <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {article.title}
              </h2>
              <p className={`text-sm line-clamp-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {article.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    
      {filteredArticles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-center mt-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          No articles found.
        </motion.div>
      )}
    </div>
  );
};

export default BlogSection;