"use client";

import { useEffect, useState } from "react"
import  Link  from "next/link";
import { Heart, ShoppingBag, Trash2, ChevronLeft, LogIn } from "lucide-react"
import { motion } from "framer-motion"
import { useShop } from "../shopContext"
import ProductCard from "../components/productCard"
import Head from "next/head";

const FavoritesPage = () => {
  // This would typically come from a state management solution like Redux or Context
  const {favs , userId,commonMetaTags,brandName,brandImage,} = useShop()
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
    <div className="h-auto bg-white">
      <Head>
    <title>{`Your Wishlist | ${brandName}`}</title>
    <meta name="description" content={`Your saved items at ${brandName}. Create wishlists and get notified when prices drop for products in Indore, Ujjain, Bhopal, Dewas, Dhar.`} />
    <meta name="keywords" content={`${brandName} wishlist, saved items, favorite products, price alerts, shopping list Indore, Ujjain, Bhopal, Dewas, Dhar`} />
    
    <link rel="canonical" href="https://e-commerce-nu-nine.vercel.app/favorite" />
    
    {/* Common meta tags */}
    {Object.entries(commonMetaTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
    ))}
</Head>
      {/* Hero Section */}
      <motion.section
  className="relative py-6  text-center text-black"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
<div className="container mx-auto my-3 w-full px-6 md:px-12">
  <motion.h1
    className="text-3xl poppin md:text-4xl font-extrabold mt-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    Your Wishlist Favorites
  </motion.h1>

  <motion.p
    className="max-w-5xl p-4 mx-auto text-lg text-gray-600 mt-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    Keep track of the products you love and buy them anytime. Your wishlist is your personal shopping assistant, helping you quickly find the best deals and exclusive discounts on your favorite items. 
  </motion.p>
</div>

</motion.section>

      {/* Favorites Content */}
      <section className="py-4 ">
        <div className="container  mx-auto px-4 md:px-6">
        
          {isLogin ? favs.length > 0 ? (
             <>  <div className="flex items-center justify-between mb-8">
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
            </motion.div> </>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              
              <div className="bg-gradient-to-r py-12 mx-auto from-blue-500 to-teal-500 text-white p-8 rounded-md shadow-2xl text-center w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">🛍️ Your Favorites List Is Empty!</h2>
              <p className="text-lg mb-6">
              Browse our collections and heart the items you love to save them here.
              </p>
              <button
                onClick={() => router.push("/products")}
                className="bg-white  cursor-pointer text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-100 transition-all duration-300"
              >
                Discover Products & Add To Wishlist 🛍️
              </button>
            </div>
            </motion.div>
          ) : 
          <motion.div
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
              className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
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

