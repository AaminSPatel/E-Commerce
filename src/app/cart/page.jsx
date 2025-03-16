"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, X } from "lucide-react";
import { useShop } from "../shopContext";
import  Link  from "next/link";
import Image from "next/image";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0,x:-20}}
      transition={{duration:0.3}}
      className="flex items-center  justify-between p-4 bg-white rounded-lg shadow-md mb-4 "
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
      <Link href="/order">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Proceed to Checkout
        </motion.button>
      </Link>
    </motion.div>
  );
};

const CartPage = () => {
  const { cart, setCart, handleCartRemove, handleCartUpdate } = useShop();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cart);
  });

  //console.log(cartItems);

  /*  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 1, image: "/bud4.jpg" },
    { id: 2, name: "Lamp", price: 599.99, quantity: 1, image: "/acc1.jpg" },
    { id: 3, name: "Watch", price: 999.99, quantity: 1, image: "/watch5.jpg" },
  ]) */

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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Your Shopping Cart
        </h1>
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
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 py-8"
              >
                Your cart is empty. Start shopping now!
              </motion.p>
            )}
            </AnimatePresence>
          </motion.div>
          <div>
            <BillTable items={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
