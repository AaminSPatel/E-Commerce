import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { ShopContextProvider } from "./shopContext";
import Header from './components/Header'
import Footer from './components/Footer'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
//https://e-commerce-nu-nine.vercel.app

// metadataConfig.js
export const brandName = "Dealify"; // Define your brand name once
export const brandImage = "/logo.jpg"; // Define your brand image once

export const metadataConfig = {
  home: {
    title: `${brandName} - Best Online Shopping in Indore, Ujjain, Bhopal | Affordable Prices`,
    description: `Shop at ${brandName} - Central India's favorite online marketplace with cash on delivery & online payments. Discover AI-recommended products in Indore, Ujjain, Dewas, Dhar, Bhopal at best prices.`,
    keywords: `online shopping Indore, ecommerce Ujjain, best deals Bhopal, cash on delivery Dewas, affordable shopping Dhar, AI product recommendations, Madhya Pradesh shopping, central India ecommerce, best prices online, COD shopping, digital payment options, ${brandName}`,
    path: "/home"
  },
  products: {
    title: `All Products | ${brandName} - Best Collection in Indore, Ujjain, Bhopal`,
    description: `Browse thousands of products at ${brandName} - Central India's largest collection. Best prices in Indore, Ujjain, Dewas, Dhar, Bhopal with COD & online payment options.`,
    keywords: `${brandName} products, online store Indore, shopping Ujjain, ecommerce Bhopal, Dewas marketplace, Dhar shopping, all categories, fashion, electronics, home appliances, groceries, beauty products, Madhya Pradesh shopping`,
    path: "/products"
  },
  productDetails: (productName, productCategory) => ({
    title: `${productName} | Buy Now at Best Price | ${brandName}`,
    description: `Buy ${productName} at best price in Indore, Ujjain, Bhopal. Available with cash on delivery & online payment options. Free shipping in Madhya Pradesh.`,
    keywords: `${productName}, buy online Indore, price in Ujjain, COD in Bhopal, Dewas delivery, Dhar shopping, ${productCategory}, best deal, discount offer, ${brandName} product`,
    path: "/productDetails"
  }),
  cart: {
    title: `Your Shopping Cart | ${brandName}`,
    description: `Review items in your cart at ${brandName}. Secure checkout with cash on delivery & online payment options available in Indore, Ujjain, Bhopal, Dewas, Dhar.`,
    keywords: `${brandName} cart, shopping bag, checkout Indore, COD Ujjain, online payment Bhopal, Dewas delivery, Dhar shopping, Madhya Pradesh ecommerce`,
    path: "/cart"
  },
  favorite: {
    title: `Your Wishlist | ${brandName}`,
    description: `Your saved items at ${brandName}. Create wishlists and get notified when prices drop for products in Indore, Ujjain, Bhopal, Dewas, Dhar.`,
    keywords: `${brandName} wishlist, saved items, favorite products, price alerts, shopping list Indore, Ujjain, Bhopal, Dewas, Dhar`,
    path: "/favorite"
  },
  profile: {
    title: `Your Account | ${brandName}`,
    description: `Manage your ${brandName} account, orders, addresses and preferences for shopping in Indore, Ujjain, Bhopal, Dewas, Dhar.`,
    keywords: `${brandName} account, order history, manage address, profile settings, Indore shopping account, Ujjain, Bhopal, Dewas, Dhar`,
    path: "/profile"
  },
  auth: {
    title: `Login/Signup | ${brandName} - Secure Account Access`,
    description: `Secure login/signup for your ${brandName} account. Shop safely in Indore, Ujjain, Bhopal, Dewas, Dhar with our protected payment gateway and AI recommendations.`,
    keywords: `${brandName} login, create account, secure shopping Indore, Ujjain signup, Bhopal ecommerce account, Dewas online store, Dhar shopping login, password recovery, OTP verification, Madhya Pradesh shopping account`,
    path: "/auth"
  },
  contact: {
    title: `Contact Us | ${brandName} Customer Support - Indore, Ujjain, Bhopal`,
    description: `Contact ${brandName} customer support for queries related to orders, products or services in Indore, Ujjain, Bhopal, Dewas, Dhar. We're available 24/7.`,
    keywords: `${brandName} contact, customer care Indore, Ujjain support, Bhopal ecommerce help, Dewas shopping queries, Dhar online store contact, return policy, refund process, order tracking, Madhya Pradesh shopping support`,
    path: "/contact"
  },
  order: {
    title: `Your Orders | ${brandName} Purchase History`,
    description: `View your order history and track current orders from ${brandName}. Manage deliveries in Indore, Ujjain, Bhopal, Dewas, Dhar with our AI-powered tracking system.`,
    keywords: `${brandName} orders, purchase history Indore, Ujjain order tracking, Bhopal delivery status, Dewas shopping history, Dhar online orders, return items, invoice download, order details, Madhya Pradesh shopping records`,
    path: "/order"
  }
};

// Usage examples:

// For regular pages:
const homeMetadata = metadataConfig.home;

// For dynamic pages (product details):
const productName = "Smartphone X";
const productCategory = "Electronics";
const productDetailsMetadata = metadataConfig.productDetails(productName, productCategory);


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <ShopContextProvider>
        <Header/>
        {children} 
        <Analytics />
        <Footer/>
      </ShopContextProvider>
      </body>
    </html>
  );
}
