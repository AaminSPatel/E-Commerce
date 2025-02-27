
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { useShop } from '../shopContext';
import { useParams } from 'react-router-dom';

export default function ProductOpen() {
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);

  const { id } = useParams();
 const {
    handleAddFav,
    userId,
    favs,
    setFavs,
    cart,
    setCart,items,
    path,
    handleCartClick,
  } = useShop();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    //console.log();
    const fav = async () => {
      try {
        const fv = await favs.find((ite) => ite.productId == product._id);
        if (fv) setIsFav(true);
      } catch (err) {
        console.log(err);
      }
    };
    fav();
  }, [favs]);

 // const [isLoading, setIsLoading] = useState(false);
  const [ripple, setRipple] = useState(false);
  //const [isInCart, setIsInCart] = useState('');

  const handleClick = async () => {
    //setIsLoading(true);
    
    setIsInCart('loading')
    setRipple(true); // Start ripple animation
    await handleCartClick(product._id);
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
        const cartt = await cart.find((ite) => ite.productId._id == product._id);
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

  useEffect(() => {
    const foundProduct = items.find((item) => item._id === id);
    setProduct(foundProduct || null); // Set the product or null if not found
  }, [id, items]);

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
            <div className="h-64 lg:h-[90vh] relative">
              <img
                src={'.'+product.product_image}
                alt={product.product_name}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2 p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-gray-900 varela sm:text-4xl">
                {product.product_name}
              </h2>
              <p className="mt-2 text-xl text-blue-600 font-semibold">{product.product_brand}</p>
              <div className="mt-3">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.product_price.toFixed(2)}
                </span>
                <span className="ml-2 text-lg text-gray-500">(★)</span>
              </div>
              <p className="mt-6 text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900">Key Features:</h3>
                <ul className="mt-4 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg
                        className="h-5 w-5 text-blue-500 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {setIsInCart(!isInCart); handleClick()}}
                  className={`flex-1 px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
                    isInCart
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <ShoppingCart className="inline-block mr-2 h-6 w-6" />
                  {isInCart ? 'In Cart' : 'Add to Cart'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {setIsFav(!isFav); handleAddFav(product._id) }}
                  className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
                    isFav
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  <Heart
                    className={`inline-block h-6 w-6 ${isFav ? 'fill-current' : ''}`}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
