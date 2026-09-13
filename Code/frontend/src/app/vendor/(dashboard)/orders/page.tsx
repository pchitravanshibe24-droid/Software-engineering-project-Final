"use client";

import { useAppContext } from "@/context/AppContext";
import { OrderStatus } from "@/types";
import { useState } from "react";
import { Package, Clock, CheckCircle2, Truck, XCircle } from "lucide-react";

export default function VendorOrders() {
  const { orders, updateOrderStatus } = useAppContext();
  // Filter for shop 's1' (mock)
  const shopOrders = orders.filter(o => o.shopId === 's1');

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Preparing': return 'bg-indigo-100 text-indigo-800';
      case 'Ready': return 'bg-purple-100 text-purple-800';
      case 'Out for Delivery': return 'bg-orange-100 text-orange-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-vendor-dark">Order Management</h1>
        <p className="text-vendor-dark/60 mt-1">Manage and update customer orders.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-sm text-vendor-dark/50">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {shopOrders.map(order => (
                <tr key={order.id} className="border-t border-gray-50">
                  <td className="p-4 font-bold text-sm text-vendor-dark">{order.id}</td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-vendor-dark">{order.deliveryAddress.name}</p>
                    <p className="text-xs text-vendor-dark/50">{order.deliveryAddress.phone}</p>
                  </td>
                  <td className="p-4 text-sm text-vendor-dark/70 max-w-[200px] truncate">
                    {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                  </td>
                  <td className="p-4 text-sm font-bold text-vendor-dark">₹{order.total}</td>
                  <td className="p-4">
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full outline-none appearance-none cursor-pointer border-r-8 border-transparent ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Ready">Ready</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-sm text-vendor-dark/60">
                    {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}
                  </td>
                </tr>
              ))}
              {shopOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-vendor-dark/50">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

