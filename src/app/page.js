"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ShoppingBag, Star, Zap } from "lucide-react";
import { FaCaretRight, FaLink } from "react-icons/fa6";
import Link from "next/link";
import ProductCard from "./components/productCard";
import { useShop } from "./shopContext";
import Image from "next/image";
import Head from 'next/head';
const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const {items} = useShop()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const floatingIconVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: { repeat: Infinity, duration: 3 },
    },
  };

  return (
    <section className="bg-white text-black min-h-screen flex items-center justify-center px-4">
      <div className="relative w-full max-w-7xl mx-auto text-center bg-center bg-cover z-10">
        <div className="absolute rounded-2xl bg-white h-72 w-72 p-6 -right-60 top-20 -z-10 rotate-[45deg] anim sm:scale-150 scale-150  md:scale-200">
          <div className="relative w-full h-full">
            
  <Image height={100} width={200}  src={items[0]?.product_image} className="absolute top-0 left-0 rounded-md h-20 w-20  rotate-[45deg]" alt="Top Left" />
  <Image height={100} width={200}  src={items[1]?.product_image} className="absolute top-0 right-0 rounded-md h-20 w-20  rotate-[-225deg]" alt="Top Right" />
  <Image height={100} width={200}  src={items[2]?.product_image} className="absolute bottom-0 left-0 rounded-md h-20 w-20  rotate-[-45deg]" alt="Bottom Left" />
  <Image height={100} width={200}  src={items[3]?.product_image} className="absolute bottom-0 right-0 rounded-md h-20 w-20  rotate-[225deg]" alt="Bottom Right" />

          </div>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-6 mt-12 "
        >
          <motion.h1
            className="text-3xl sm:text-5xl font-extrabold leading-tight"
            variants={itemVariants}
          >
            Discover the Future of Shopping
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-xl"
            variants={itemVariants}
          >
            Immerse yourself in a world of endless possibilities, where style
            meets innovation.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <Link href="/products">
              <motion.button
                className="bg-blue-600 w-60 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                Start Exploring
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ChevronRight className="ml-2 h-5 w-5" />
                </motion.span>
              </motion.button>
            </Link>

            <motion.a
              href="#featured-products"
              className="text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Featured Products
            </motion.a>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mt-10"
            variants={itemVariants}
          >
            <FeatureCard
              icon={ShoppingBag}
              title="Curated Collections"
              description="Handpicked items just for you"
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Quick delivery, easy returns"
            />
            <FeatureCard
              icon={Star}
              title="Top Rated"
              description="Products loved by customers"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-[#ffffff82] p-6 rounded-lg backdrop-blur-md"
    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
  >
    <Icon className="h-10 w-10 mb-4 mx-auto" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-80">{description}</p>
  </motion.div>
);

const FeaturedItems = () => {
  const { items } = useShop();
  return (
    <section id="featured-products" className="py-16 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Items</h2>
        <div className="flex items-center justify-center gap-7 gap-y-16 flex-wrap">
          {items.slice(0, 8).map((item) => (
            <ProductCard
              key={item._id}
              name={item.product_name}
              price={item.product_price}
              discount={item.product_discount}
              originalPrice={
                Math.floor(
                  ((item.product_discount * item.product_price) / 100 +
                    item.product_price) *
                    100
                ) / 100
              }
              id={item._id}
              category={item.product_category}
              brand={item.product_brand}
              image={item.product_image}
            ></ProductCard>
          ))}
        </div>
        <div className="w-full flex item-center justify-end">
          <Link href={"/products"}>
            <button className="flex items-center justify-center gap-1 h-10 bg-blue-100 rounded-md m-2 p-2 hover:text-blue-600">
              Explore all products <FaCaretRight className="h-5 pt-1" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const BestDeals = () => {
  const { items } = useShop();
  const [deals, setDeals] = useState([]);
  useEffect(() => {
    if (items) {
      let bestOffer = items
        .sort((a, b) => b.product_discount - a.product_discount)
        .slice(0, 4);
      setDeals(bestOffer);
    }
  }, [items]);

  return (
    <section className="py-16">
      <div className="max-w-7xl text-gray-900 mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Best Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {deals.map((deal) => (
            <motion.div
              key={deal._id}
              className="bg-white hover:bg-blue-50 rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.001 }}
            >
              <Image
                src={deal.product_image}
                alt={deal.product_name}
                width={800} // Adjust as needed
                height={800} // Adjust as needed
                className="object-cover w-full sm:h-48 transition-transform duration-700 hover:scale-105"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                  {deal.product_name}
                </h3>
                <p className="text-blue-600 font-bold">
                  {deal.product_discount}% Off
                </p>
                <motion.button
                  whileHover={{ scale: 1.0004 }}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-3"
                >
                  <Link
                    href={`/productDetail/${deal._id}`}
                    className="flex gap-4 items-center"
                  >
                    Visit Now <FaLink className="pt-1" />
                  </Link>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DiscountOffers = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center text-black mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Special Discount Offers
        </motion.h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {/* Image Section */}
          <motion.div
            className="overflow-hidden rounded-lg shadow-lg w-64"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              height={200}
              width={200}
              src="/discount1.jpg"
              alt="Discount Offer"
              className="w-full  h-auto object-cover"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="p-8 h-64 rounded-lg shadow-lg bg-blue-50"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-blue-600 mb-4">
              Limited Time Offer!
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Save big with a **50% discount** on all electronics. Don&apos;t
              miss out—use code:{" "}
              <span className="font-bold text-blue-600">FLASH50</span> at
              checkout.
            </p>
            <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300">
              Shop Electronics
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const {brandName,brandImage,commonMetaTags,} = useShop()

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <Head>
    <title>{`${brandName} - Best Online Shopping in Indore, Ujjain, Bhopal | Affordable Prices`}</title>
    <meta name="description" content={`Shop at ${brandName} - Central India's favorite online marketplace with cash on delivery & online payments. Discover AI-recommended products in Indore, Ujjain, Dewas, Dhar, Bhopal at best prices.`} />
    <meta name="keywords" content={`${brandName}, online shopping Indore, ecommerce Ujjain, best deals Bhopal, cash on delivery Dewas, affordable shopping Dhar, AI product recommendations, Madhya Pradesh shopping, central India ecommerce, best prices online, COD shopping, digital payment options`} />
    
    {/* Canonical URL */}
    <link rel="canonical" href="https://e-commerce-nu-nine.vercel.app" />
    
    {/* Open Graph / Facebook */}
    <meta property="og:title" content={`${brandName} - Best Online Shopping in Central India`} />
    <meta property="og:description" content={`Shop at ${brandName} for best deals in Indore, Ujjain, Bhopal with cash on delivery & online payments. AI-powered recommendations for you!`} />
    <meta property="og:url" content="https://e-commerce-nu-nine.vercel.app" />
    
    {/* Twitter */}
    <meta name="twitter:title" content={`${brandName} - Central India's Favorite Online Store`} />
    <meta name="twitter:description" content={`Affordable shopping in Indore, Ujjain, Bhopal with COD & online payments. AI-powered recommendations for best deals!`} />
    
    {/* Common meta tags */}
    {Object.entries(commonMetaTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
    ))}
</Head>
      <main className="flex-grow">
        <HeroSection />
        <FeaturedItems />
        <BestDeals />
        <DiscountOffers />
      </main>
    </div>
  );
}
