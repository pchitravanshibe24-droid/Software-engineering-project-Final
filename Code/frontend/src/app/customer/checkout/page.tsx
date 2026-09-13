"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Order } from "@/types";

export default function CheckoutPage() {
  const { cart, clearCart, addOrder } = useAppContext();
  const router = useRouter();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "Rahul Kumar",
    phone: "9876500001",
    address: "House 42, Model Town",
    city: "Patiala",
    pincode: "147001"
  });

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) return;

    // Group items by shop to create separate orders if necessary, but for MVP we assume all from same shop or create one order
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: "c1", // Mock customer ID
      shopId: cart[0].product.shopId, // Using first product's shop for MVP
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      status: "Pending",
      date: new Date().toISOString(),
      deliveryAddress: formData
    };

    addOrder(newOrder);
    setIsSuccess(true);
    clearCart();
    
    setTimeout(() => {
      router.push("/customer/orders");
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 bg-vendor-green rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-vendor-dark mb-4 text-center"
        >
          Order Placed Successfully!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-vendor-dark/60 text-lg text-center max-w-md"
        >
          Thank you for supporting a local business. ❤️ <br/>
          Redirecting to your orders...
        </motion.p>
      </div>
    );
  }

  if (cart.length === 0) {
    router.push("/customer");
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-vendor-dark mb-8">Checkout</h1>
      
      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
        {/* Delivery Details */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-vendor-dark mb-6">Delivery Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-vendor-dark/70">Full Name</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-vendor-dark/70">Phone Number</label>
                <input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green transition-colors"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-vendor-dark/70">Complete Address</label>
                <input 
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-vendor-dark/70">City</label>
                <input 
                  required
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-vendor-dark/70">Pincode</label>
                <input 
                  required
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-vendor-dark mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <div className="flex gap-2 text-vendor-dark">
                    <span className="font-medium text-vendor-green">{item.quantity}x</span>
                    <span className="line-clamp-1">{item.product.name}</span>
                  </div>
                  <span className="font-medium">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm text-vendor-dark/70 mb-6 pb-6 border-y border-gray-100 pt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-vendor-dark">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-medium text-vendor-dark">₹{deliveryFee}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-vendor-dark text-lg">Total</span>
              <span className="text-2xl font-bold text-vendor-green">₹{total}</span>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-vendor-green hover:bg-vendor-green/90 text-white py-4 rounded-xl font-bold transition-all shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-1"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

