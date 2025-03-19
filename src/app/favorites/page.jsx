"use client";

import { useEffect, useState } from "react"
import  Link  from "next/link";
import { Heart, ShoppingBag, Trash2, ChevronLeft, LogIn } from "lucide-react"
import { motion } from "framer-motion"
import { useShop } from "../shopContext"
import ProductCard from "../components/productCard"

const FavoritesPage = () => {
  // This would typically come from a state management solution like Redux or Context
  const {favs , userId} = useShop()
  //console.log(favs);
  const [isLogin, setIsLogin] = useState(false)
  useEffect(()=>{

    userId ? setIsLogin(true) : setIsLogin(false) 
  },[userId])
 

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


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
  className="relative py-6 text-center text-black"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <div className="container mx-auto px-6 md:px-12">
    
    <motion.h1
      className="text-3xl md:text-4xl font-extrabold mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      Your Favorite Picks
    </motion.h1>

    <motion.p
      className="max-w-xl mx-auto text-lg text-gray-600 mt-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      Save the items you love and find them all in one place.
    </motion.p>
  </div>
</motion.section>

      {/* Favorites Content */}
      <section className="py-6">
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
                className="fle hidden items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add All to Cart
              </motion.button>
            )}
          </div>

          {isLogin ? favs.length > 0 ? (
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
          ) : <motion.div
          className="flex flex-col items-center mx-auto justify-center py-16 text-center bg-white shadow-xl rounded-xl p-6 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="rounded-full bg-blue-100 p-6 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <LogIn className="h-10 w-10 text-blue-600" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Unlock Your Favorites 💖
          </h3>
          <p className="text-gray-500 max-w-md mb-6">
            “Your dream items are just a heart away! Sign up now and never lose sight of what you love.”
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/auth"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Login / Sign Up
            </Link>
          </motion.div>
        </motion.div>}
        </div>
      </section>
    </div>
  )
}

export default FavoritesPage

