"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { mockShops, mockProducts } from "@/data/mockData";
import { MapPin, Star, Clock, ShoppingCart, Plus, Minus, Search } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

export default function ShopPage() {
  const params = useParams();
  const shopId = params.id as string;
  const { cart, addToCart, removeFromCart, updateQuantity } = useAppContext();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const shop = mockShops.find(s => s.id === shopId);
  const shopProducts = mockProducts.filter(p => p.shopId === shopId);
  
  const categories = ["All", ...Array.from(new Set(shopProducts.map(p => p.category)))];
  
  const filteredProducts = shopProducts.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!shop) return <div className="p-8 text-center">Shop not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Shop Header */}
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm mb-8">
        <div className="h-48 md:h-64 overflow-hidden relative">
          <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{shop.name}</h1>
            <p className="opacity-90 flex items-center mb-3">
              <MapPin className="w-4 h-4 mr-1" /> {shop.address}, {shop.city}
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" /> {shop.rating} Rating
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center">
                <Clock className="w-4 h-4 mr-1" /> {shop.openingTime} - {shop.closingTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 sticky top-16 bg-vendor-gray/30 z-40 py-4 backdrop-blur-md">
        <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? "bg-vendor-dark text-white" 
                  : "bg-white text-vendor-dark/70 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 focus:border-vendor-green rounded-full py-2 pl-10 pr-4 text-sm outline-none transition-all shadow-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.map(product => {
          const cartItem = cart.find(item => item.product.id === product.id);
          const quantity = cartItem?.quantity || 0;

          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-50 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                    Sale
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col">
                <p className="text-xs text-vendor-dark/50 mb-1">{product.category}</p>
                <h3 className="font-bold text-vendor-dark text-sm mb-2 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-lg">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">₹{product.originalPrice}</span>
                    )}
                  </div>
                  
                  {quantity > 0 ? (
                    <div className="flex items-center bg-vendor-green text-white rounded-lg overflow-hidden h-8">
                      <button 
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-full flex items-center justify-center hover:bg-black/10 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{quantity}</span>
                      <button 
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-full flex items-center justify-center hover:bg-black/10 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-vendor-gray/50 hover:bg-vendor-green hover:text-white text-vendor-dark w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-vendor-dark/50">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}

// Need to import ShoppingBag manually as I didn't earlier
import { ShoppingBag } from "lucide-react";

