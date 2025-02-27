//'use client'

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useShop } from "../shopContext";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const { categories } = useShop();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 mt-6 px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12 text-gray-800"
          >
            Product Categories
          </motion.h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Featured Collections
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeaturedCollection
              title="Summer Essentials"
              description="Get ready for summer with our curated collection of must-have items."
              image="/prod8.jpg"
            />
            <FeaturedCollection
              title="Work From Home"
              description="Boost your productivity with our selection of home office equipment."
              image="/prod6.jpg"
            />
            <FeaturedCollection
              title="Fitness Gear"
              description="Achieve your fitness goals with our top-rated exercise equipment."
              image="/prod5.jpg"
            />
          </motion.div>
        </div>
      </section>
      <section className=" text-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Ready to start shopping?
            </h2>
            <p className="text-xl mb-8">
              Explore our wide range of products and find exactly what you need.
            </p>
            <motion.button
              className=" text-blue-600 hover:text-black font-bold py-3 px-8 rounded-full bg-blue-200 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop All Products
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};


const CategoryCard = ({ icon: Icon, name, productCount, color, textColor }) => {
  const { setSelectedCategory } = useShop();
  //console.log(name);
 const navigate = useNavigate()
  return (
    <motion.div
      className={` rounded-lg shadow-lg overflow-hidden ${color} ${textColor} transition-all duration-300 ease-in-out`}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="p-6">
        <Icon className="w-12 h-12 mb-4 " />
        <h3 className="text-xl font-semibold  mb-2">{name}</h3>
        <p className=" text-opacity-80">{productCount} products</p>
      </div>
      <div className="w-full">
        <button
          className="bg-white w-full bg-opacity-20 p-4 flex justify-between  items-center"
          onClick={() => {
            setSelectedCategory(name), navigate('/products');
          }}
        >
          {" "}
          <span className=" font-medium">View All</span>
          <ChevronRight className="w-5 h-5 " />
        </button>
      </div>
    </motion.div>
  );
};
const FeaturedCollection = ({ title, description, image }) => (
  <motion.div
    className="bg-gray-100 rounded-lg overflow-hidden shadow-md"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        Explore Collection
      </button>
    </div>
  </motion.div>
);

export default CategoriesPage;
