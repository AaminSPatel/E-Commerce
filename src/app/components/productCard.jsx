import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useShop } from "../shopContext";
import { MdShoppingCart,MdRemoveShoppingCart ,MdOutlineShoppingCart } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";
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
      className="group shadow-lg  w-full max-w-[320px] bg-white rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative aspect-[7/6] h-72 overflow-hidden">
        <Link to={`/productDetail/${item.id}`}>
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`absolute group-hover:transition-transform transform group-hover:duration-500 duration-1000 -bottom-10  group-hover:bottom-0 left-3 p-2 rounded-t-full ${
            isFav ? "bg-white text-red-500" : "bg-white text-gray-400"
          } shadow-md`}
          onClick={() => {
            handleAddFav(item.id)
            setIsFav(!isFav)
          }}
        >
          <FaHeart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
        </motion.button>
        {item.discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {item.discount}% OFF
          </span>
        )}
      </div>
      <div className="p-5 space-y-4">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg leading-tight line-clamp-1">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.brand}</p>
            </div>
            <span className="text-xs font-medium bg-gray-100 px-1 py-1 rounded-full">{item.category}</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
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
      </div>
    </motion.div>
  );
}


{/* <motion.div
      className="w-full max-w-[280px] bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-[200px] object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <button
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFav ? 'bg-red-500 text-white' : 'bg-white text-gray-500'
          }`}
          onClick={()=> handleAddFav(item.id)}
        >
         {isFav ? <FaRegHeart className="bg-red-900"/> :<FaHeart color="red"/> }  
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-sm truncate">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.brand}</p>
          </div>
          <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
            {item.category}
          </span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {item.discount && (
            <span className="text-xs font-semibold text-red-500">
              {item.discount}% OFF
            </span>
          )}
        </div>
        <button
          className={`w-full py-2 px-4 rounded ${
            isInCart == 'loading'
              ? 'bg-gray-200 text-gray-300 disabled'
              : isInCart == 'in-cart' ?'bg-gray-200 text-gray-800' : ' bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors duration-200`}
          onClick={handleClick}
        >
          <span className="flex items-center justify-center">
           
            {isInCart == 'loading'? (<span  className="flex gap-2 items-center justify-center"><AiOutlineLoading3Quarters  /> Loading </span>) :isInCart == 'in-cart' ? (<span  className="flex gap-2 items-center justify-center" > <HiShoppingCart size={20} />  In Cart</span>) : (<span  className="flex gap-2 items-center justify-center"> <HiOutlineShoppingCart  size={21}/>  Add to Cart</span>)}
          </span>
        </button>
      </div>
    </motion.div> */}

/* 
const ProductCard = ({
  id,
  name,
  brand,
  category,
  price,
  originalPrice,
  discount,
  image,
  isFavorite,
  isInCart,
  onAddToCart,
  onToggleFavorite,
}) => {
  return (
    <motion.div
      className="w-full max-w-[280px] bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-[200px] object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <button
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-500'
          }`}
          onClick={onToggleFavorite}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-sm truncate">{name}</h3>
            <p className="text-xs text-gray-500">{brand}</p>
          </div>
          <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
            {category}
          </span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {discount && (
            <span className="text-xs font-semibold text-red-500">
              {discount}% OFF
            </span>
          )}
        </div>
        <button
          className={`w-full py-2 px-4 rounded ${
            isInCart
              ? 'bg-gray-200 text-gray-800'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors duration-200`}
          onClick={onAddToCart}
        >
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </span>
        </button>
      </div>
    </motion.div>
  );
};
 */

