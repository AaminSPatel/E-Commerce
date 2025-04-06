"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, X, LogIn } from "lucide-react";
import { useShop } from "../shopContext";
import  Link  from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Head from "next/head";
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0,x:-20}}
      transition={{duration:0.3}}
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 "
    >
      <div className="flex items-center space-x-4">
        <Image
        height={200}
        width={200}
          src={item.productId.product_image}
          alt={item.productId.product_name}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-lg">
            {item.productId.product_name}
          </h3>
          <p className="text-gray-600">
            ${item.productId.product_price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() =>
              onUpdateQuantity(
                item.productId._id,
                item.productQuantity - 1,
                item
              )
            }
            className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Minus size={16} />
          </button>
          <span className="font-semibold">{item.productQuantity}</span>
          <button
            onClick={() =>
              onUpdateQuantity(
                item.productId._id,
                item.productQuantity + 1,
                item
              )
            }
            className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={() => onRemove(item._id)}
          className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const BillTable = ({ items }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.productId.product_price * item.productQuantity,
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <motion.div
            initial={{ opacity: 0.8, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            key={item.productId._id}
            className="flex justify-between "
          >
            <span>
              {item.productId.product_name} (x{item.productQuantity})
            </span>
            <span>
              $
              {(item.productId.product_price * item.productQuantity).toFixed(2)}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <Link href={items.length > 0 ? "/order" : ''}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ${items.length>0 ? '':'cursor-not-allowed'}`}
        >
          Proceed to Checkout
        </motion.button>
      </Link>
    </motion.div>
  );
};

const CartPage = () => {
  const { cart,brandName,brandImage,commonMetaTags, setCart, handleCartRemove, handleCartUpdate  , userId } = useShop();
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    setCartItems(cart);
    userId ? setIsLogin(true) : setIsLogin(false) 
  },[cart , userId]);

  const updateQuantity = (id, newQuantity, item) => {
    const newProduct = { ...item, productQuantity: newQuantity };

    handleCartUpdate(newProduct);
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.productId._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = async (id) => {
    await handleCartRemove(id);
    setCartItems((items) => items.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen text-gray-900 bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
    <title>{`Your Shopping Cart | ${brandName}`}</title>
    <meta name="description" content={`Review items in your cart at ${brandName}. Secure checkout with cash on delivery & online payment options available in Indore, Ujjain, Bhopal, Dewas, Dhar.`} />
    <meta name="keywords" content={`${brandName} cart, shopping bag, checkout Indore, COD Ujjain, online payment Bhopal, Dewas delivery, Dhar shopping, Madhya Pradesh ecommerce`} />
    
    <link rel="canonical" href="https://e-commerce-nu-nine.vercel.app/cart" />
    
    {/* Common meta tags */}
    {Object.entries(commonMetaTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
    ))}
</Head>
<div className="container mx-auto w-full my-3 px-6 md:px-12">
  <motion.h1 
    className="text-3xl poppin text-center md:text-4xl font-extrabold mt-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    Your Shopping Cart
  </motion.h1>

  <motion.p
    className="max-w-5xl mx-auto text-center py-5 text-lg text-gray-600 mt-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    Ready to checkout? Review your selected items, apply discounts, and choose your preferred payment method. We offer **cash on delivery** and **secure online payments** for a hassle-free shopping experience.  
  </motion.p>
</div>

    { isLogin ? <div className="max-w-7xl mx-auto">
       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
          layout
          className="lg:col-span-2 space-y-4 ">
            <AnimatePresence>
            {cartItems.map((item) => (
              <CartItem
                key={item.productId._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
            {cartItems.length === 0 && (
              <div className="bg-gradient-to-r py-12 mx-auto from-blue-500 to-teal-500 text-white p-8 rounded-md shadow-2xl text-center w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">🛍️ Your Cart is Empty!</h2>
              <p className="text-lg mb-6">
                “Shopping is always a good idea.”  
                **Add items to your cart and grab the best deals!**
              </p>
              <button
                onClick={() => router.push("/products")}
                className="bg-white  cursor-pointer text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-100 transition-all duration-300"
              >
                Shop Now & Fill Your Cart 🛍️
              </button>
            </div>
            )}
            </AnimatePresence>
          </motion.div>
          <div>
            <BillTable items={cartItems} />
          </div>
        </div>
      </div> :
      <motion.div
      className="flex flex-col mx-auto items-center justify-center py-16 text-center bg-white shadow-xl rounded-xl p-6 w-full max-w-md"
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
        Login to Start Shopping! 🛍️
      </h3>
      <p className="text-gray-500 max-w-md mb-6">
        “A full cart starts with a single click! Sign up now to grab exclusive deals & never miss out on your favorite products.”
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/auth"
          className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-500 transition-colors"
        >
          Login / Sign Up Now
        </Link>
      </motion.div>
    </motion.div>
      }
    </div>
  );
};
/* <motion.div
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
            </motion.div> */
export default CartPage;
