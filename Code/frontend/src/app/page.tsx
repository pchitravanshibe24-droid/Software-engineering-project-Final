"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5 seconds splash screen
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center text-5xl md:text-7xl font-bold tracking-tight mb-4">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-vendor-green"
              >
                Vendor
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-vendor-dark"
              >
                Flow
              </motion.span>
            </div>
            
            <motion.div 
              className="h-1 bg-vendor-green rounded-full mt-2"
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-vendor-dark/70 mt-6 text-lg font-medium"
            >
              Empowering Local. Connecting Communities.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="role-selection"
            className="flex flex-col items-center justify-center w-full max-w-4xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-vendor-dark mb-3">
                Welcome to <span className="text-vendor-green">Vendor</span>Flow
              </h1>
              <p className="text-vendor-dark/60 text-lg">Choose how you want to continue</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 w-full">
              {/* Customer Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/customer")}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(22,163,74,0.1)] transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-vendor-green/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vendor-green transition-colors">
                  <ShoppingBag className="w-7 h-7 text-vendor-green group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-vendor-dark mb-3">I'm a Customer</h2>
                <p className="text-vendor-dark/60 mb-8 leading-relaxed">
                  Discover local shops, explore products and support businesses near you.
                </p>
                <div className="flex items-center text-vendor-green font-semibold group-hover:translate-x-2 transition-transform">
                  Continue as Customer <span className="ml-2">→</span>
                </div>
              </motion.div>

              {/* Vendor Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/vendor/onboarding")}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(22,163,74,0.1)] transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-vendor-dark/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vendor-dark transition-colors">
                  <Store className="w-7 h-7 text-vendor-dark group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-vendor-dark mb-3">I'm a Vendor</h2>
                <p className="text-vendor-dark/60 mb-8 leading-relaxed">
                  Bring your shop online, list your products and reach more local customers.
                </p>
                <div className="flex items-center text-vendor-dark font-semibold group-hover:translate-x-2 transition-transform">
                  Continue as Vendor <span className="ml-2">→</span>
                </div>
              </motion.div>
            </div>

            <p className="text-vendor-dark/40 font-medium mt-16 text-sm tracking-wide uppercase">
              Local today. Stronger tomorrow.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
