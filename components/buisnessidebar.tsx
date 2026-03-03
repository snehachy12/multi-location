"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Package, 
  Calendar,
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  // Define navigation items to map through
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Customers", href: "/dashboard/customers", icon: Users },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  ];

  return (
    <aside className="w-64 bg-navy-900 text-white flex flex-col hidden lg:flex h-screen sticky top-0 border-r border-slate-800 shrink-0">
      
      {/* --- LOGO AREA --- */}
      <div className="h-20 px-6 flex items-center gap-3 font-bold text-xl tracking-wide border-b border-slate-800/50">
        <div className="grid grid-cols-2 gap-0.5 w-6">
          <div className="h-2 w-2 bg-white rounded-sm"></div>
          <div className="h-2 w-2 bg-brand-blue rounded-sm shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
          <div className="h-2 w-2 bg-brand-blue rounded-sm shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
          <div className="h-2 w-2 bg-white rounded-sm"></div>
        </div>
        MetaMetric
      </div>
      
      {/* --- MAIN NAVIGATION --- */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20 font-semibold' 
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
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            pathname === '/dashboard/settings'
              ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20 font-semibold' 
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