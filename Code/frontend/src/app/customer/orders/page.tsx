"use client";

import { useAppContext } from "@/context/AppContext";
import { Package, Clock, CheckCircle2, Truck, XCircle, ChevronRight } from "lucide-react";
import { OrderStatus } from "@/types";
import { mockShops } from "@/data/mockData";
import { motion } from "framer-motion";

const StatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case 'Pending':
    case 'Confirmed':
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case 'Preparing':
    case 'Ready':
      return <Package className="w-5 h-5 text-blue-500" />;
    case 'Out for Delivery':
      return <Truck className="w-5 h-5 text-vendor-green" />;
    case 'Delivered':
      return <CheckCircle2 className="w-5 h-5 text-vendor-green" />;
    case 'Cancelled':
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Clock className="w-5 h-5 text-gray-400" />;
  }
};

const StatusColor = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case 'Pending':
    case 'Confirmed':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'Preparing':
    case 'Ready':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Out for Delivery':
    case 'Delivered':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'Cancelled':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export default function CustomerOrders() {
  const { orders } = useAppContext();
  // Filter only customer orders (assuming mock customer c1)
  const customerOrders = orders.filter(o => o.customerId === "c1");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-vendor-dark mb-8">My Orders</h1>
      
      {customerOrders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <Package className="w-16 h-16 text-vendor-dark/20 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-vendor-dark mb-2">No orders yet</h2>
          <p className="text-vendor-dark/50">You haven't placed any orders.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {customerOrders.map((order, i) => {
            const shop = mockShops.find(s => s.id === order.shopId);
            const date = new Date(order.date).toLocaleDateString('en-US', {
              day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={order.id} 
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-50">
                  <div>
                    <p className="text-sm text-vendor-dark/50 mb-1">Order #{order.id} • {date}</p>
                    <h3 className="font-bold text-lg text-vendor-dark">{shop?.name || 'Local Shop'}</h3>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium w-fit ${StatusColor({ status: order.status })}`}>
                    <StatusIcon status={order.status} />
                    {order.status}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-vendor-dark mb-2">Items:</p>
                    <p className="text-sm text-vendor-dark/70 line-clamp-2">
                      {order.items.map(item => `${item.quantity}x ${item.product.name}`).join(', ')}
                    </p>
                  </div>
                  
                  <div className="flex items-end justify-between md:flex-col md:items-end">
                    <div className="text-left md:text-right">
                      <p className="text-sm text-vendor-dark/50 mb-1">Total Amount</p>
                      <p className="font-bold text-xl text-vendor-dark">₹{order.total}</p>
                    </div>
                    <div className="text-vendor-green flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

