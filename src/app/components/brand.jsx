'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShop } from '../shopContext'
import { useNavigate } from 'react-router-dom'
/* 
const brands = [
  { id: 1, name: 'Nike', category: 'Sportswear', image: './brand/nike.jpg' },
  { id: 2, name: 'Apple', category: 'Technology', image: './brand/apple.jpg' },
  { id: 3, name: 'Zara', category: 'Fashion', image: './brand/zara.jpg' },
  { id: 4, name: 'Samsung', category: 'Technology', image: './brand/samsung.jpg' },
  { id: 5, name: 'Adidas', category: 'Sportswear', image: './brand/adidas.jpg' },
  { id: 6, name: 'H&M', category: 'Fashion', image: './brand/h&m.jpg' },
  { id: 7, name: 'Sony', category: 'Technology', image: './brand/sony.jpg' },
  { id: 8, name: 'Puma', category: 'Sportswear', image: './brand/puma.jpg' },
  { id: 9, name: 'Microsoft', category: 'Technology', image: './brand/microsoft.jpg' },
  { id: 10, name: 'Uniqlo', category: 'Fashion', image: './brand/uniqlo.jpg' },
  { id: 11, name: 'Under Armour', category: 'Sportswear', image: './brand/underarmour.jpg' },
  { id: 12, name: 'Google', category: 'Technology', image: './brand/google.jpg' },
  { id: 13, name: 'Gucci', category: 'Luxury', image: './brand/gucci.jpg' },
  { id: 14, name: 'Amazon', category: 'E-commerce', image: './brand/amazon.jpg' },
  { id: 15, name: 'Tesla', category: 'Automotive', image: './brand/tesla.jpg' },
  { id: 16, name: 'Lululemon', category: 'Sportswear', image: './brand/lululemon.jpg' },
  { id: 17, name: 'Louis Vuitton', category: 'Luxury', image: './brand/louisvuitton.jpg' },
  { id: 18, name: 'Netflix', category: 'Entertainment', image: './brand/netflix.jpg' },
  { id: 19, name: 'Coca-Cola', category: 'Beverages', image: './brand/cocacola.jpg' },
  { id: 20, name: 'Disney', category: 'Entertainment', image: './brand/disney.jpg' },
]
 */
//const categories = ['All', ...new Set(brands.map(brand => brand.category))]

export default function BrandsPage() {
  const {setBrand,brands, categories} = useShop();
  const [filter, setFilter] = useState('All')
  const [filteredBrands, setFilteredBrands] = useState(brands)
  useEffect(() => {
    setFilteredBrands(
      filter === 'All'
        ? brands
        : brands.filter(brand => brand.category === filter)
    )
  }, [filter])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="  py-10">
        <div className="container mx-auto px-4">
            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl font-bold text-center mb-12 text-gray-900"
                              >
                                Explore Our Brands
                              </motion.h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map(category => (
            <FilterButton 
              key={category.name} 
              category={category.name} 
              activeFilter={filter} 
              setFilter={setFilter} 
            />
          ))}
        </motion.div>
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredBrands.map(brand => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}

//import Image from 'next/image'
 function BrandCard({ brand }) {
  const navigate = useNavigate()
const {setBrand} = useShop();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2"
      onClick={()=>{setBrand(brand.name); navigate('/products')}}
    >
      <div className="relative h-64 overflow-hidden group">
         <img
          src={brand.image}
          alt={brand.name}
          layout="fill"
          className="transition-transform duration-300 group-hover:scale-110"
        /> 
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">{brand.category}</span>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{brand.name}</h2>
        <p className="text-blue-600 font-medium">{brand.category}</p>
      </div>
    </motion.div>
  )
}

 function FilterButton({ category, activeFilter, setFilter }) {
  const isActive = category === activeFilter

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setFilter(category)}
      className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white text-gray-800 hover:bg-gray-100 hover:shadow'
      }`}
    >
      {category}
    </motion.button>
  )
}

