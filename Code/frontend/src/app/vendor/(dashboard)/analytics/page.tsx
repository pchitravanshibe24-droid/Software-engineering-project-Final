"use client";

import { motion } from "framer-motion";
import { vendorStats } from "@/data/mockData";

export default function VendorAnalytics() {
  const weeklyData = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 900 },
    { day: "Wed", sales: 1500 },
    { day: "Thu", sales: 2100 },
    { day: "Fri", sales: 1800 },
    { day: "Sat", sales: 3200 },
    { day: "Sun", sales: 2800 },
  ];
  
  const maxSales = Math.max(...weeklyData.map(d => d.sales));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-vendor-dark">Analytics</h1>
        <p className="text-vendor-dark/60 mt-1">Overview of your shop's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-vendor-dark/60 font-medium mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-vendor-green">₹{vendorStats.revenue}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-vendor-dark/60 font-medium mb-1">Total Orders</h3>
          <p className="text-3xl font-bold text-vendor-dark">{vendorStats.ordersToday}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-vendor-dark/60 font-medium mb-1">New Customers</h3>
          <p className="text-3xl font-bold text-vendor-dark">12</p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-vendor-dark mb-8">Weekly Sales</h2>
        
        <div className="flex items-end justify-between h-64 gap-2">
          {weeklyData.map((data, i) => {
            const height = (data.sales / maxSales) * 100;
            return (
              <div key={data.day} className="flex flex-col items-center flex-1 group">
                <div className="opacity-0 group-hover:opacity-100 text-xs font-bold text-vendor-green mb-2 transition-opacity">
                  ₹{data.sales}
                </div>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="w-full max-w-[40px] bg-vendor-green/20 rounded-t-lg group-hover:bg-vendor-green transition-colors relative"
                />
                <div className="text-xs font-medium text-vendor-dark/50 mt-4 border-t border-gray-100 pt-2 w-full text-center">
                  {data.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

