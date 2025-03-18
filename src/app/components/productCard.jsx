"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Link  from "next/link";
import { useShop } from "../shopContext";
import Image from "next/image";
import { Loader, Plus, ShoppingCart, Trash2 } from "lucide-react";
export default function ProductCard(item) {
  const {
    handleAddFav,
    userId,
    favs,
    setFavs,
    cart,
    setCart,
    path,
    handleCartClick,
  } = useShop();
  const [isFav, setIsFav] = useState();

  useEffect(() => {
    //console.log();
    const fav = async () => {
      try {
        const fv = await favs.find((ite) => ite.productId == item.id);
        if (fv) {setIsFav(true);}
        else{
          setIsFav(false)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fav();
  }, [favs]);

 // const [isLoading, setIsLoading] = useState(false);
  const [ripple, setRipple] = useState(false);
  const [isInCart, setIsInCart] = useState('');

  const handleClick = async () => {
    //setIsLoading(true);
    
    setIsInCart('loading')
    setRipple(true); // Start ripple animation
    await handleCartClick(item.id);
    setRipple(false); // End ripple animation
   // setIsLoading(false);
   if(isInCart== 'addtocart'){
      setIsInCart('in-cart');
   }
   else{
    setIsInCart('addtocart')
   }
        
  };

  useEffect(() => {
    //console.log();
    const carts = async () => {
      try {
        const cartt = await cart.find((ite) => ite.productId._id == item.id);
        if (cartt) {
          setIsInCart('in-cart');
          //setRipple(true);
        }
       
        // console.log(cartt);
      } catch (err) {
        console.log(err);
      }
    };
    carts();
  }, [cart]);


  return (
    <motion.div
      className="group shadow-lg  w-full max-w-[280px] bg-white text-gray-900 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
     
     <div className="relative h-72 overflow-hidden">
  <Link href={`/productDetail/${item.id}`}>
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative w-full h-full">
      <Image
        src={item.image}
        alt={item.name}
        fill // New way in Next.js 13+ (instead of layout="fill")
        className="object-cover" // Keeps image proportion
        sizes="(max-width: 768px) 100vw, 50vw" // Optimized sizes
      />
    </motion.div>
  </Link>

  {item.discount && (
    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
      {item.discount}% OFF
    </span>
  )}
</div>

      <div className="px-3 p-5 space-y-4">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg leading-tight line-clamp-1">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.brand}</p>
            </div>
            <span className="text-xs font-medium bg-gray-100 hidden px-1 py-1 rounded-full ">{item.category}</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-medium text-gray-900 popin">${item.price.toFixed(2)}</span>
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isInCart === "in-cart"
              ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          onClick={handleClick}
          disabled={isInCart === "loading"}
        >
          <AnimatePresence mode="wait">
            {isInCart === "loading" ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center"
              >
                <Loader className="animate-spin mr-2" size={18} />
                Loading...
              </motion.div>
            ) : isInCart === "in-cart" ? (
              <motion.div
                key="in-cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center group"
              >
                <ShoppingCart size={18} className="mr-2 group-hover:hidden" />
                <Trash2 size={18} className="mr-2 hidden group-hover:block text-red-500" />
                <span className="group-hover:hidden">In Cart</span>
                <span className="hidden group-hover:block text-red-500">Remove</span>
              </motion.div>
            ) : (
              <motion.div
                key="add-to-cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center"
              >
                <Plus size={18} className="mr-2" />
                Add to Cart
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
  whileHover={{ scale: 1.01 }}
  whileTap={{ scale: 0.95 }}
  className={`py-3 px-4 rounded-md ${
    favs.some((fav) => fav.productId._id === item.id) ? "bg-white text-red-500" : "text-gray-800"
  } `}
  onClick={() => handleAddFav(item.id)}
>
  {favs.some((fav) => fav.productId._id === item.id) ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
</motion.button>

        </div>
       
      </div>
    </motion.div>
  );
}



