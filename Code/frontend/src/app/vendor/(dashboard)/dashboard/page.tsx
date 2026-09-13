"use client";

import { vendorStats } from "@/data/mockData";
import { Package, ShoppingBag, Users, DollarSign, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function VendorDashboard() {
  const statCards = [
    { title: "Total Products", value: vendorStats.totalProducts, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Orders Today", value: vendorStats.ordersToday, icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Revenue", value: `₹${vendorStats.revenue}`, icon: DollarSign, color: "text-vendor-green", bg: "bg-green-50" },
    { title: "Customers", value: vendorStats.customers, icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-vendor-dark mb-2">Welcome back, Sharma General Store!</h1>
          <p className="text-vendor-dark/60">Here is what's happening with your shop today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="font-bold text-vendor-dark">{vendorStats.rating}</span>
          <span className="text-sm text-vendor-dark/50">Shop Rating</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.title}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-vendor-dark/60 font-medium">{stat.title}</h3>
            </div>
            <p className="text-3xl font-bold text-vendor-dark">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Orders could go here */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-vendor-dark mb-6">Recent Orders</h2>
          <div className="space-y-4">
            <div className="text-center py-10 text-vendor-dark/50">
              <p>View the orders tab to manage your orders.</p>
            </div>
          </div>
        </div>
        <div className="bg-vendor-dark rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Need help?</h2>
            <p className="text-white/70 mb-6 text-sm">Contact VendorFlow support for any assistance with your shop.</p>
            <button className="bg-vendor-green hover:bg-vendor-green/90 px-6 py-2 rounded-xl text-sm font-bold transition-colors">
              Contact Support
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-vendor-green/20 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  );
}

