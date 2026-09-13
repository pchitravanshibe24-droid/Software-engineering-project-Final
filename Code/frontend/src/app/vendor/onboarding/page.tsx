"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VendorOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    shopName: "", category: "", address: "", city: "", pincode: "", phone: "", description: "",
    ownerName: "", email: "", ownerPhone: "",
    openingTime: "09:00", closingTime: "21:00", deliveryAvailable: true
  });

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
      return;
    }
    
    // Final submit
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/vendor/dashboard");
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-24 h-24 bg-vendor-green rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-vendor-dark mb-4 text-center">
          Your shop is ready for VendorFlow!
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-vendor-dark/60 text-lg text-center max-w-md">
          Redirecting you to your new dashboard...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vendor-gray/30 flex flex-col">
      <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
        <Link href="/" className="flex items-center text-xl font-bold tracking-tight">
          <span className="text-vendor-green">Vendor</span>
          <span className="text-vendor-dark">Flow</span>
        </Link>
        <div className="text-sm font-medium text-vendor-dark/60">
          Step {step} of 4
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          
          <div className="flex p-8 pb-0 gap-2 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-vendor-green' : 'bg-gray-100'}`} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="mb-8">
                      <div className="w-12 h-12 bg-vendor-green/10 rounded-xl flex items-center justify-center mb-4">
                        <Store className="w-6 h-6 text-vendor-green" />
                      </div>
                      <h2 className="text-2xl font-bold text-vendor-dark">Bring Your Shop Online</h2>
                      <p className="text-vendor-dark/60">Let's start with your basic shop details.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-vendor-dark/70 mb-1">Shop Name</label>
                        <input required type="text" value={formData.shopName} onChange={e => setFormData({...formData, shopName: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green" placeholder="e.g. Sharma General Store" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-vendor-dark/70 mb-1">Category</label>
                          <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green bg-white">
                            <option value="">Select Category</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Medicines">Medicines</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-vendor-dark/70 mb-1">Shop Phone</label>
                          <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green" placeholder="e.g. 9876543210" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-vendor-dark/70 mb-1">Complete Address</label>
                        <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green" placeholder="Street, Area" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-vendor-dark">Owner Details</h2>
                      <p className="text-vendor-dark/60">Who is running the business?</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-vendor-dark/70 mb-1">Full Name</label>
                        <input required type="text" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-vendor-dark/70 mb-1">Email Address</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-vendor-dark/70 mb-1">Personal Phone</label>
                        <input required type="tel" value={formData.ownerPhone} onChange={e => setFormData({...formData, ownerPhone: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-vendor-dark">Operations</h2>
                      <p className="text-vendor-dark/60">When is your shop open for business?</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-vendor-dark/70 mb-1">Opening Time</label>
                        <input required type="time" value={formData.openingTime} onChange={e => setFormData({...formData, openingTime: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-vendor-dark/70 mb-1">Closing Time</label>
                        <input required type="time" value={formData.closingTime} onChange={e => setFormData({...formData, closingTime: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-vendor-green" />
                      </div>
                    </div>
                    <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                      <div>
                        <p className="font-medium text-vendor-dark">Home Delivery</p>
                        <p className="text-sm text-vendor-dark/60">Do you offer home delivery in your area?</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={formData.deliveryAvailable} onChange={e => setFormData({...formData, deliveryAvailable: e.target.checked})} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vendor-green"></div>
                      </label>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-vendor-dark">Review Details</h2>
                      <p className="text-vendor-dark/60">Make sure everything looks good.</p>
                    </div>
                    <div className="bg-vendor-gray/30 p-6 rounded-2xl space-y-4 text-sm">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-vendor-dark/60">Shop Name</span>
                        <span className="font-medium text-vendor-dark">{formData.shopName || "-"}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-vendor-dark/60">Category</span>
                        <span className="font-medium text-vendor-dark">{formData.category || "-"}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-vendor-dark/60">Address</span>
                        <span className="font-medium text-vendor-dark text-right max-w-[200px] truncate">{formData.address || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-vendor-dark/60">Timings</span>
                        <span className="font-medium text-vendor-dark">{formData.openingTime} - {formData.closingTime}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 mt-12">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="px-6 py-4 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 text-vendor-dark transition-colors">
                  Back
                </button>
              )}
              <button type="submit" className="flex-1 bg-vendor-green hover:bg-vendor-green/90 text-white py-4 rounded-xl font-bold transition-all shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-1 flex items-center justify-center">
                {step < 4 ? (
                  <>Continue <ChevronRight className="w-5 h-5 ml-2" /></>
                ) : (
                  "Submit & Create Shop"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

