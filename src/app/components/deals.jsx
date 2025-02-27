'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronDown } from 'lucide-react'

const DealCard = ({ deal }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md overflow-hidden"
  >
    <img src={deal.image} alt={deal.name} className="w-full h-64 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{deal.name}</h3>
      <p className="text-gray-600 mb-2">{deal.description}</p>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-blue-600">${deal.discountedPrice}</span>
          <span className="text-sm text-gray-500 line-through ml-2">${deal.originalPrice}</span>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {deal.discountPercentage}% OFF
        </span>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Add to Cart
      </motion.button>
    </div>
  </motion.div>
)

const AllDealsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const deals = [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      description: "Experience premium sound quality with our top-rated headphones.",
      image: "/bud8.jpg",
      discountedPrice: 199.99,
      originalPrice: 299.99,
      discountPercentage: 33,
      category: "Electronics"
    },
    {
      id: 2,
      name: "4K Ultra HD Smart TV",
      description: "Immerse yourself in stunning visuals with this 55-inch 4K TV.",
      image: "/tv2.jpg",
      discountedPrice: 599.99,
      originalPrice: 799.99,
      discountPercentage: 25,
      category: "Electronics"
    },
    {
      id: 3,
      name: "Designer Leather Handbag",
      description: "Elevate your style with this luxurious leather handbag.",
      image: "/bag3.jpg",
      discountedPrice: 149.99,
      originalPrice: 249.99,
      discountPercentage: 40,
      category: "Fashion"
    },
    {
      id: 4,
      name: "Stainless Steel Cookware Set",
      description: "Upgrade your kitchen with this premium 10-piece cookware set.",
      image: "/hom1.jpg",
      discountedPrice: 179.99,
      originalPrice: 299.99,
      discountPercentage: 40,
      category: "Home & Kitchen"
    },
    {
      id: 5,
      name: "Fitness Smartwatch",
      description: "Track your health and stay connected with this advanced smartwatch.",
      image: "/watch6.jpg",
      discountedPrice: 129.99,
      originalPrice: 199.99,
      discountPercentage: 35,
      category: "Electronics"
    },
    {
      id: 6,
      name: "Organic Skincare Set",
      description: "Pamper your skin with this all-natural, organic skincare collection.",
      image: "/make1.jpg",
      discountedPrice: 79.99,
      originalPrice: 129.99,
      discountPercentage: 38,
      category: "Beauty"
    },
  ]

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty']

  const filteredDeals = deals.filter(deal => 
    (selectedCategory === 'All' || deal.category === selectedCategory) &&
    deal.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          All Deals
        </motion.h1>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 mt-8"
          >
            No deals found. Try adjusting your search or filters.
          </motion.p>
        )}
      </div>
    </div>
  )
}

export default AllDealsPage

