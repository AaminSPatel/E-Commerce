"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useShop } from "../shopContext";
import Image from "next/image";
import Head from "next/head";
import { brandName } from "../layout";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
const {path,brandName,brandImage,commonMetaTags,} = useShop()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${path}contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
      >
        <Send className="mr-2" size={20} />
        Send Message
      </motion.button>
    </motion.form>
  );
};

const ContactInfo = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-white p-8 rounded-lg shadow-md"
  >
    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
    <div className="space-y-4">
      <div className="flex items-center">
        <Mail className="text-blue-600 mr-4" size={24} />
        <span>locomail112@gmail.com</span>
      </div>
      <div className="flex items-center">
        <Phone className="text-blue-600 mr-4" size={24} />
        <span>+91 77470 74810</span>
      </div>
      <div className="flex items-center">
        <MapPin className="text-blue-600 mr-4" size={24} />
        <span>112 {brandName}, Ujjain, MP</span>
      </div>
    </div>
    <div className="mt-8 w-full h-60 object-cover rounded-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58688.52668488091!2d75.79722045!3d23.16899865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39637469de00ff23%3A0x7f82abdf7899d412!2z4KSJ4KSc4KWN4KSc4KWI4KSoLCDgpK7gpKfgpY3gpK8g4KSq4KWN4KSw4KSm4KWH4KS2!5e0!3m2!1shi!2sin!4v1736629009274!5m2!1shi!2sin"
        width="100%"
        height="250"
        style={{"border":0}}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </motion.div>
);

const ContactPage = () => {
  const {brandName,brandImage,commonMetaTags,} = useShop()

  return (
    <div className="min-h-screen  text-gray-900 bg-gray-100 pb-12 px-4 sm:px-6 lg:px-8">
      <Head>
    <title>{`Contact Us | ${brandName} Customer Support - Indore, Ujjain, Bhopal`}</title>
    <meta name="description" content={`Contact ${brandName} customer support for queries related to orders, products or services in Indore, Ujjain, Bhopal, Dewas, Dhar. We're available 24/7.`} />
    <meta name="keywords" content={`${brandName} contact, customer care Indore, Ujjain support, Bhopal ecommerce help, Dewas shopping queries, Dhar online store contact, return policy, refund process, order tracking, Madhya Pradesh shopping support`} />
    
    <link rel="canonical" href="https://e-commerce-nu-nine.vercel.app/contact" />
    
    {/* Open Graph / Facebook */}
    <meta property="og:title" content={`Contact ${brandName} - Central India Customer Support`} />
    <meta property="og:description" content={`Get help with your orders, products or services in Indore, Ujjain, Bhopal. Our support team is available 24/7.`} />
    <meta property="og:url" content="https://e-commerce-nu-nine.vercel.app/contact" />
    
    {/* Twitter */}
    <meta name="twitter:title" content={`${brandName} Customer Support - We're Here to Help`} />
    <meta name="twitter:description" content={`Contact us for any queries about shopping in Indore, Ujjain or Bhopal. COD, returns and order support available.`} />
    
    {/* Common meta tags */}
    {Object.entries(commonMetaTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
    ))}
</Head>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="py-6"
        >
          <Image
        height={200}
        width={200}
            src="/bg/bg5.jpg"
            alt="Company Team"
            className="w-full sm:h-72 md:h-96  object-cover  rounded-lg shadow-md"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl hidden font-bold text-center mb-12 text-gray-800"
        >
          Contact Us
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
