"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, ChevronLeft, ChevronRight ,TimerReset } from 'lucide-react';
import { useShop } from "../shopContext";
import ProductCard from "../components/productCard";
import { RiResetLeftLine } from "react-icons/ri";
import Head from "next/head";

export default function Products() {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const { brand,brands,brandName,brandImage,commonMetaTags,selectedCategory, setSelectedCategory,searchTerm, setSearchTerm ,filteredItems,categories,setBrand} = useShop();

 useEffect(()=>{
  setSelectedCategory('All');
  setSearchTerm('')
 },[brand])


 useEffect(()=>{
  setSelectedCategory('All');
  setBrand('All')
 },[searchTerm])
 

 useEffect(()=>{
  setSearchTerm('')
  setBrand('All')
 },[selectedCategory])
 
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="p-4 max-w-7xl mx-auto text-gray-800 bg-white">
      <Head>
    <title>{`All Products | ${brandName} - Best Collection in Indore, Ujjain, Bhopal`}</title>
    <meta name="description" content={`Browse thousands of products at ${brandName} - Central India's largest collection. Best prices in Indore, Ujjain, Dewas, Dhar, Bhopal with COD & online payment options.`} />
    <meta name="keywords" content={`${brandName} products, online store Indore, shopping Ujjain, ecommerce Bhopal, Dewas marketplace, Dhar shopping, all categories, fashion, electronics, home appliances, groceries, beauty products, Madhya Pradesh shopping`} />
    
    <link rel="canonical" href="https://e-commerce-nu-nine.vercel.app/products" />
    
    {/* Open Graph / Facebook */}
    <meta property="og:title" content={`All Products | ${brandName} - Central India's Largest Collection`} />
    <meta property="og:description" content={`Browse thousands of products with best prices in Indore, Ujjain, Bhopal. COD & online payment options available.`} />
    <meta property="og:url" content="https://e-commerce-nu-nine.vercel.app/products" />
    
    {/* Common meta tags */}
    {Object.entries(commonMetaTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
    ))}
</Head>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl text-center mt-8 mb-6 font-bold text-gray-800"
      >
        All Products
      </motion.h1>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow flex gap-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <span className="border border-gray-300 w-11 rounded-md flex items-center justify-center text-gray-600 cursor-pointer" onClick={()=>{setBrand('All'); setSearchTerm(''); setSelectedCategory("All")}}><RiResetLeftLine size={20}/></span>
        </div>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value='All'>
                All Categories
              </option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
            size={20}
          />
        </div> 
        <div className="relative">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value='All'>
                All Brands
              </option>
            {brands.map((brand) => (
              <option key={brand.name} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-evenly gap-y-14"
      > <AnimatePresence>
        {currentItems.map((item) => (
          <ProductCard
            key={item._id}
            name={item.product_name}
            price={item.product_price}
            discount={item.product_discount}
            originalPrice={Math.floor(((item.product_discount * item.product_price) / 100 + item.product_price) * 100) / 100}
            id={item._id}
            category={item.product_category}
            brand={item.product_brand}
            image={item.product_image}
          />
        ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length > itemsPerPage && (
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            {[...Array(Math.ceil(filteredItems.length / itemsPerPage)).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                  currentPage === number + 1
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

