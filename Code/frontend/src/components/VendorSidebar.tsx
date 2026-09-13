"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Users, BarChart, Store, Settings, LogOut } from "lucide-react";

export default function VendorSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
    { name: "My Products", href: "/vendor/products", icon: Package },
    { name: "Orders", href: "/vendor/orders", icon: ShoppingBag },
    { name: "Customers", href: "/vendor/customers", icon: Users },
    { name: "Analytics", href: "/vendor/analytics", icon: BarChart },
    { name: "Shop Profile", href: "/vendor/shop", icon: Store },
    { name: "Settings", href: "/vendor/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-vendor-dark text-white min-h-screen flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/" className="flex items-center text-xl font-bold tracking-tight">
          <span className="text-vendor-green">Vendor</span>
          <span className="text-white">Flow</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-vendor-green text-white font-medium shadow-md shadow-vendor-green/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-red-500/10 transition-all">
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
}

