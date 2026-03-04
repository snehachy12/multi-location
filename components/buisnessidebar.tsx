"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  GitBranch, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  // Define the new S-Tier navigation items
  const navItems = [
    { name: "Dashboard", href: "/buisness-manager/dashboard", icon: LayoutDashboard },
    { name: "Branches", href: "/buisness-manager/dashboard/branches", icon: GitBranch },
    { name: "Orders", href: "/buisness-manager/dashboard/orders", icon: ShoppingBag },
    { name: "Inventory", href: "/buisness-manager/dashboard/inventory", icon: Package },
    { name: "Staff", href: "/buisness-manager/dashboard/staff", icon: Users },
    { name: "Analytics", href: "/buisness-manager/dashboard/analytics", icon: BarChart3 },
    { name: "Reports", href: "/buisness-manager/dashboard/reports", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col hidden lg:flex h-screen sticky top-0 border-r border-slate-800 shrink-0 z-20">
      
      {/* --- LOGO AREA --- */}
      <div className="h-20 px-6 flex items-center gap-3 font-bold text-xl tracking-wide border-b border-slate-800">
        <div className="grid grid-cols-2 gap-0.5 w-6">
          <div className="h-2 w-2 bg-white rounded-sm"></div>
          <div className="h-2 w-2 bg-blue-500 rounded-sm"></div>
          <div className="h-2 w-2 bg-blue-500 rounded-sm"></div>
          <div className="h-2 w-2 bg-white rounded-sm"></div>
        </div>
        MetaMetric
      </div>
      
      {/* --- MAIN NAVIGATION --- */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          // Check if the current URL matches the link to highlight it
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50 font-semibold' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white font-medium'
              }`}
            >
              <Icon 
                size={20} 
                className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors`} 
              />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* --- BOTTOM ACTIONS --- */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link 
          href="/buisness-manager/dashboard/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            pathname === '/buisness-manager/dashboard/settings'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50 font-semibold' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white font-medium'
          }`}
        >
          <Settings size={20} className="group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-sm">Settings</span>
        </Link>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 font-medium transition-colors group">
          <LogOut size={20} />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}