"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { useShop } from "../../shopContext";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Image from "next/image";

export default function ProductOpen() {
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const { id } = useParams(); // ✅ Correct Next.js App Router way to get the ID
  const { handleAddFav, favs, cart, items, handleCartClick } = useShop();

  useEffect(() => {
    if (id) {
      const foundProduct = items.find((item) => item._id === id);
      setProduct(foundProduct || null);
    }
  }, [id, items]);

  useEffect(() => {
    
    if (product) {
      setIsFav(favs.some((fav) => fav.productId._id === product._id));
      setIsInCart(cart.some((cartItem) => cartItem.productId._id === product._id));
    }
  }, [product, favs, cart]);

  const handleCartToggle = async () => {
    await handleCartClick(product._id);
    setIsInCart((prev) => !prev);
  };

  const handleFavToggle = async () => {
    await handleAddFav(product._id);
   // setIsFav((prev) => !prev);
  };

  if (!product) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="lg:flex lg:h-[90vh]">
          <div className="lg:w-1/2">
            <div className="h-72 md:h-[70vh] lg:h-[90vh] relative">
              <Image
        height={200}
        width={200}
                src={product.product_image}
                alt={product.product_name}
                layout="fill"
               
                className="w-full h-full object-center"
              />
            </div>
          </div>
          <div className="lg:w-1/2 p-8 lg:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {product.product_name}
              </h2>
              <p className="mt-2 text-xl text-blue-600 font-semibold">{product.product_brand}</p>
              <div className="mt-3">
                <span className="text-2xl font-bold text-gray-900">${product.product_price.toFixed(2)}</span>
              </div>
              <p className="mt-6 text-gray-700 text-lg leading-relaxed">{product.description}</p>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900">Key Features:</h3>
                <ul className="mt-4 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      ✅ {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCartToggle}
                  className={`flex-1 px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
                    isInCart ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <ShoppingCart className="inline-block mr-2 h-6 w-6" />
                  {isInCart ? "In Cart" : "Add to Cart"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFavToggle}
                  className={`px-5 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
                    isFav ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >                  {isFav ? <FaHeart /> : <FaRegHeart />}
                
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
