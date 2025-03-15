"use client";

import { useState } from "react"
import  Link  from "next/link";
import { Heart, ShoppingBag, Trash2, ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useShop } from "../shopContext"
import ProductCard from "../components/productCard"

const FavoritesPage = () => {
  // This would typically come from a state management solution like Redux or Context
  const {favs} = useShop()
  //console.log(favs);
  
 

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const heroVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
      className="relative py-16 md:py-24 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <motion.div
            className="inline-flex items-center justify-center rounded-full bg-white/10 p-3 backdrop-blur-lg shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="h-8 w-8 text-pink-400" />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-indigo-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Favorite Picks
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Curate your collection of saved items and rediscover what you love, anytime.
          </motion.p>
        </div>
      </div>
      
      {/* Glowing Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-0 h-[400px] w-[400px] bg-pink-400/20 blur-[120px]"></div>
        <div className="absolute right-1/3 bottom-0 h-[400px] w-[400px] bg-indigo-400/20 blur-[120px]"></div>
      </div>
    </motion.section>
      {/* Favorites Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Link
                href="/products"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm">Back to Shopping</span>
              </Link>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {favs.length} {favs.length === 1 ? "Item" : "Items"}
            </h2>
            {favs.length > 0 && (
              <motion.button
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add All to Cart
              </motion.button>
            )}
          </div>

          {favs.length > 0 ? (
            <motion.div
              className="flex items-center justify-center flex-wrap gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {favs.map((item) => (
               <ProductCard
                           key={item.productId._id}
                           name={item.productId.product_name}
                           price={item.productId.product_price}
                           discount={item.productId.product_discount}
                           originalPrice={Math.floor(((item.productId.product_discount * item.productId.product_price) / 100 + item.productId.product_price) * 100) / 100}
                           id={item.productId._id}
                           category={item.productId.product_category}
                           brand={item.productId.product_brand}
                           image={item.productId.product_image}
                         />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="rounded-full bg-gray-100 p-6 mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Heart className="h-10 w-10 text-gray-400" />
              </motion.div>
              <h3 className="text-xl font-medium mb-2 text-gray-900">Your favorites list is empty</h3>
              <p className="text-gray-500 max-w-md mb-6">
                Browse our collections and heart the items you love to save them here.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/products"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Discover Products
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default FavoritesPage

