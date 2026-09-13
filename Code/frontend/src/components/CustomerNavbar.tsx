"use client";

import Link from "next/link";
import { Search, MapPin, ShoppingCart, User, Package } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function CustomerNavbar() {
  const { cart } = useAppContext();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/customer" className="flex items-center text-xl font-bold tracking-tight">
          <span className="text-vendor-green">Vendor</span>
          <span className="text-vendor-dark">Flow</span>
        </Link>

        {/* Location & Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8 items-center gap-4">
          <div className="flex items-center text-sm text-vendor-dark/70 hover:text-vendor-dark cursor-pointer transition-colors whitespace-nowrap">
            <MapPin className="w-4 h-4 mr-1 text-vendor-green" />
            Patiala, Punjab
          </div>
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search for products, shops or categories..." 
              className="w-full bg-vendor-gray/50 border border-transparent focus:border-vendor-green focus:bg-white rounded-full py-2 pl-10 pr-4 text-sm outline-none transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-vendor-dark">
          <Link href="/customer/orders" className="flex flex-col items-center hover:text-vendor-green transition-colors">
            <Package className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium hidden sm:block">Orders</span>
          </Link>
          
          <Link href="/customer/cart" className="flex flex-col items-center hover:text-vendor-green transition-colors relative">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-vendor-green text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 font-medium hidden sm:block">Cart</span>
          </Link>
          
          <div className="flex flex-col items-center hover:text-vendor-green transition-colors cursor-pointer">
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium hidden sm:block">Profile</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

