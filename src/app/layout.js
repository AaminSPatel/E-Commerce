import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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

export const metadata = {
  title: "Iqra-Ecom - Best Online Shopping Destination for Fashion, Electronics & More",
  description: "Iqra-Ecom is your one-stop online shopping destination for fashion, electronics, home decor, beauty products, and more. Discover a wide range of high-quality products at unbeatable prices with fast delivery and secure payment options. Shop now and experience seamless eCommerce with exclusive deals, discounts, and seasonal offers!",

  keywords: [
    "Iqra-Ecom",
    "online shopping",
    "buy electronics online",
    "best fashion store",
    "affordable home decor",
    "beauty products online",
    "discount deals on eCommerce",
    "fast delivery shopping",
    "secure online payments",
    "best eCommerce platform",
    "top-rated shopping website",
    "shop online for latest trends",
    "Iqra Ecom store",
    "free shipping eCommerce",
    "trendy fashion collections",
    "electronics store online",
  ],

  openGraph: {
    title: "Iqra-Ecom - Your Ultimate Online Shopping Destination",
    description:
      "Find the best deals on fashion, electronics, home decor, and beauty products. Iqra-Ecom offers high-quality products with secure payments and fast delivery. Shop now and save more!",
    url: "https://e-commerce-nu-nine.vercel.app",
    type: "website",
    images: [
      {
        url: "https://e-commerce-nu-nine.vercel.app/image.jpg",
        width: 1200,
        height: 630,
        alt: "Iqra-Ecom - Best Online Shopping Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@IqraEcom",
    title: "Iqra-Ecom - Best Online Shopping Deals",
    description:
      "Shop the latest trends in fashion, electronics, and home decor at Iqra-Ecom. Get exclusive discounts, fast shipping, and secure payments.",
    images: ["https://e-commerce-nu-nine.vercel.app/image.jpg"],
  },

  robots: "index, follow",
  author: "Iqra-Ecom Team",
  canonical: "https://e-commerce-nu-nine.vercel.app",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <ShopContextProvider>
        <Header/>
        {children} 
        <Footer/>
      </ShopContextProvider>
      </body>
    </html>
  );
}
