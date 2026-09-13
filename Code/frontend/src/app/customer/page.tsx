"use client";

import { useState } from "react";
import { mockCategories, mockShops } from "@/data/mockData";
import { Search, MapPin, Star, Clock, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CustomerHome() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-vendor-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-12"
      >
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Shop Local. <br />
            <span className="text-vendor-green">Support Real People.</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-lg">
            Discover trusted local shops and get the products you need from businesses around you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, shops or categories..." 
                className="w-full bg-white/10 border border-white/20 focus:border-vendor-green rounded-full py-3 pl-12 pr-4 text-white placeholder:text-gray-400 outline-none transition-all backdrop-blur-sm"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <button className="bg-vendor-green hover:bg-vendor-green/90 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center justify-center whitespace-nowrap">
              Explore Shops <span className="ml-2">→</span>
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-vendor-green/20 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
      </motion.div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-vendor-dark mb-6">Shop by Category</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
          {mockCategories.map((category) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={category.id}
              className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:border-vendor-green group-hover:shadow-md transition-all">
                {/* Rendering icon name as text since we can't dynamically import lucide icons easily without a map, using generic for now or mapping */}
                <span className="text-vendor-dark group-hover:text-vendor-green font-medium text-2xl">
                  {category.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-vendor-dark/80">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Nearby Shops */}
      <div>
        <h2 className="text-2xl font-bold text-vendor-dark mb-6">Popular Shops Near You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockShops.map((shop, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={shop.id}
            >
              <Link href={`/customer/shop/${shop.id}`} className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all group">
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={shop.image} 
                    alt={shop.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {!shop.isOpen && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Closed</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-vendor-dark line-clamp-1 group-hover:text-vendor-green transition-colors">{shop.name}</h3>
                    <div className="flex items-center bg-green-50 text-vendor-green px-2 py-1 rounded text-xs font-bold">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {shop.rating}
                    </div>
                  </div>
                  <p className="text-sm text-vendor-dark/60 mb-4">{shop.category}</p>
                  
                  <div className="flex items-center justify-between text-xs text-vendor-dark/60 border-t border-gray-50 pt-4">
                    <div className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {shop.distance} km
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {shop.openingTime} - {shop.closingTime}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

