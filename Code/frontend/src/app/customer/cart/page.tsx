"use client";

import { useAppContext } from "@/context/AppContext";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useAppContext();

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-vendor-gray rounded-full flex items-center justify-center mx-auto mb-6">
          <Trash2 className="w-10 h-10 text-vendor-dark/20" />
        </div>
        <h2 className="text-2xl font-bold text-vendor-dark mb-4">Your cart is empty</h2>
        <p className="text-vendor-dark/60 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          href="/customer" 
          className="bg-vendor-green hover:bg-vendor-green/90 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-vendor-dark mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={item.product.id} 
              className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 items-center shadow-sm"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-vendor-dark truncate">{item.product.name}</h3>
                <p className="text-sm text-vendor-dark/50 mb-2">₹{item.product.price} / unit</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-vendor-gray/50 rounded-lg overflow-hidden h-8 w-fit">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-full flex items-center justify-center hover:bg-black/5 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-full flex items-center justify-center hover:bg-black/5 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <span className="font-bold text-lg">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.product.id)}
                className="w-10 h-10 flex flex-shrink-0 items-center justify-center text-red-500 hover:bg-red-50 rounded-xl transition-colors ml-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-vendor-dark mb-6">Order Summary</h2>
            
            <div className="space-y-3 text-sm text-vendor-dark/70 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span className="font-medium text-vendor-dark">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-medium text-vendor-dark">₹{deliveryFee}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-vendor-dark">Total</span>
              <span className="text-2xl font-bold text-vendor-green">₹{total}</span>
            </div>
            
            <Link 
              href="/customer/checkout"
              className="w-full bg-vendor-green hover:bg-vendor-green/90 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center group"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

