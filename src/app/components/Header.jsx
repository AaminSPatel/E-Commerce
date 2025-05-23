"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useShop } from "../shopContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, User, Heart, ChevronDown, Home } from "lucide-react";
import Image from "next/image.js";

const Navbar = () => {
  const {
    userId,
    user,
    setBrand,brandName,brandImage,commonMetaTags,
    brands,
    categories,
    setSelectedCategory,
    cart,
    favs
  } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [cartLength,setCartLength] = useState(null)
  const [favLength,setFavLength] = useState(null)
  useEffect(()=>{
    cart.length > 0 ? setCartLength(cart.length) : setCartLength(0)
    favs.length > 0 ? setFavLength( favs.length) : setFavLength(0)
  }, [cart , favs,user,userId])
  return (
    <motion.nav
      className="sticky top-0 z-50 bg-white shadow-lg text-black"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="sm:text-2xl philosopher text-md flex justify-center items-center gap-1 font-bold text-blue-400">
              <Image 
                           height={200}
                           width={200}
                             src={brandImage}
                             alt={brandName}
                             className="h-10 w-10 rounded-full"
                           /> {brandName}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-400">
              Products
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative group py-4"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <span className="cursor-pointer hover:text-blue-400 flex items-center">
                Categories <ChevronDown className="h-4 w-4 ml-1" />
              </span>
              {isCategoryOpen && (
                <div className="absolute top-full left-0  w-48 bg-gray-800 shadow-md rounded-md z-10 overflow-hidden">
                  {categories.slice(0, 13).map((cat, i) => (
                    <Link
                      key={i}
                      onClick={() => setSelectedCategory(cat.name)}
                      href="/products"
                      className="block px-4 py-2 text-white hover:bg-gray-700"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Brands Dropdown */}
            <div
              className="relative group  py-4"
              onMouseEnter={() => setIsBrandOpen(true)}
              onMouseLeave={() => setIsBrandOpen(false)}
            >
              <span className="cursor-pointer hover:text-blue-400 flex items-center">
                Brands <ChevronDown className="h-4 w-4 ml-1" />
              </span>
              {isBrandOpen && (
                <div className="absolute top-full left-0  w-48 bg-gray-800 shadow-md rounded-md z-10 overflow-hidden">
                  {brands.slice(0, 13).map((brand, i) => (
                    <Link
                      key={i}
                      onClick={() => setBrand(brand.name)}
                      href="/products"
                      className="block px-4 py-2 text-white hover:bg-gray-700"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="hover:text-blue-400">
              Contact
            </Link>
          </div>

          {/* Icons + Menu Toggle */}
          <div className="flex items-center space-x-2 text-md">
            <Link href="/" className="p-1 sm:hidden flex relative">
              <Home className="h-5 w-5" />
            </Link>
<Link href="/favorites" className="p-1 relative">
              <Heart className="h-5 w-5" />
             
               {favLength ?   <span className="absolute top-0 right-0 ml-2 scale-75 h-4 w-4 bg-red-400 text-white rounded-full flex items-center justify-center  text-md">
                  {favLength}
                </span>:''}
      
            </Link>

            <Link href="/cart" className="p-1 relative">
              <ShoppingCart className="h-5 w-5" />
              {cartLength >0 ? <span className="absolute right-0  ml-2 top-0 h-4 w-4 scale-75 bg-red-400 text-white rounded-full flex items-center justify-center text-md">
                {cartLength}
                
                </span>:''}
            </Link>

            {/* User Profile (Hidden in Mobile) */}
           
              <Link href="/profile" className="flex items-center justify-center md:px-2 pl-1 md:py-1  rounded-full">
                <User className="h-5 w-5" />
               {userId && (  <span className="hidden md:flex text-sm font-medium capitalize">{user.fullname}</span>
             )}  </Link>
           

            {/* Auth Button */}
            {!userId && (
              <Link href="/auth" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hidden md:inline-block">
                Sign In / Sign Up
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-800 cursor-pointer hover:text-blue-400 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-gray-900 text-white py-4 px-6 space-y-3"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="block hover:text-blue-400">
              Home
            </Link>
            <Link href="/products" className="block hover:text-blue-400">
              Products
            </Link>

            {/* Mobile Categories Dropdown */}
            <div>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex justify-between w-full text-left hover:text-blue-400"
              >
                Categories <ChevronDown className="h-4 w-4" />
              </button>
              {isCategoryOpen && (
                <div className="pl-4 mt-2 space-y-1">
                  {categories.slice(0, 13).map((cat, i) => (
                    <Link
                      key={i}
                      href="/products"
                      className="block hover:text-blue-400"
                      onClick={() => setSelectedCategory(cat.name)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Brands Dropdown */}
            <div>
              <button
                onClick={() => setIsBrandOpen(!isBrandOpen)}
                className="flex justify-between w-full text-left hover:text-blue-400"
              >
                Brands <ChevronDown className="h-4 w-4" />
              </button>
              {isBrandOpen && (
                <div className="pl-4 mt-2 space-y-1">
                  {brands.slice(0, 13).map((brand, i) => (
                    <Link
                      key={i}
                      href="/products"
                      className="block hover:text-blue-400"
                      onClick={() => setBrand(brand.name)}
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="block hover:text-blue-400">
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
