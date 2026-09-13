"use client";

import { useState } from "react";
import { mockProducts } from "@/data/mockData";
import { Product } from "@/types";
import { Plus, Search, Edit, Trash2, CheckCircle2, X } from "lucide-react";

export default function VendorProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts.filter(p => p.shopId === 's1'));
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-vendor-dark">My Products</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-vendor-green hover:bg-vendor-green/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-vendor-green text-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-sm text-vendor-dark/50">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-vendor-dark text-sm">{product.name}</p>
                        <p className="text-xs text-vendor-dark/50">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-vendor-dark/70">{product.category}</td>
                  <td className="p-4 text-sm font-medium">₹{product.price}</td>
                  <td className="p-4 text-sm">{product.stock}</td>
                  <td className="p-4">
                    {product.stock > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-vendor-green">
                        <CheckCircle2 className="w-3 h-3" /> In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-600">
                        <X className="w-3 h-3" /> Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-vendor-dark/50 hover:text-vendor-green transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-vendor-dark/50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-vendor-dark/50">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal (Simple placeholder for functionality) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-vendor-dark">Add New Product</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-vendor-dark/50 hover:text-vendor-dark"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6">
              <p className="text-vendor-dark/60 mb-6">Fill in the details to list a new product in your shop.</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <input placeholder="Product Name" className="border rounded-xl px-4 py-2 col-span-2 outline-none focus:border-vendor-green" />
                <input placeholder="Category" className="border rounded-xl px-4 py-2 outline-none focus:border-vendor-green" />
                <input placeholder="Price (₹)" type="number" className="border rounded-xl px-4 py-2 outline-none focus:border-vendor-green" />
                <input placeholder="Stock Quantity" type="number" className="border rounded-xl px-4 py-2 outline-none focus:border-vendor-green" />
                <input placeholder="SKU" className="border rounded-xl px-4 py-2 outline-none focus:border-vendor-green" />
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 rounded-xl text-vendor-dark bg-gray-100 hover:bg-gray-200 font-medium">Cancel</button>
                <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 rounded-xl text-white bg-vendor-green hover:bg-vendor-green/90 font-bold">Save Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

