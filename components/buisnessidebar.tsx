"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Package,
  Calendar,
  LogOut,
  ChevronDown,
  MapPin,
  Check,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// ---- Location data ----
const locations = [
  { id: 'all', name: 'All Locations', badge: '3', color: 'bg-brand-blue' },
  { id: 'downtown', name: 'Downtown', badge: '●', color: 'bg-status-success' },
  { id: 'uptown', name: 'Uptown', badge: '●', color: 'bg-status-warning' },
  { id: 'westside', name: 'Westside', badge: '●', color: 'bg-status-critical' },
];

const navItems = [
  { name: "Dashboard", href: "/buisness-manager/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/buisness-manager/analytics", icon: BarChart3 },
  { name: "Customers", href: "/buisness-manager/customers", icon: Users },
  { name: "Products", href: "/buisness-manager/products", icon: Package },
  { name: "Schedule", href: "/buisness-manager/schedule", icon: Calendar },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <aside className="w-64 bg-navy-900 text-white flex flex-col hidden lg:flex h-screen sticky top-0 border-r border-slate-800/60 shrink-0">

      {/* ---- LOGO ---- */}
      <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-800/50">
        <div className="grid grid-cols-2 gap-[3px] w-7 h-7 p-1.5 bg-white/5 rounded-lg border border-white/8">
          <div className="rounded-[2px] bg-white" />
          <div className="rounded-[2px] bg-brand-blue shadow-[0_0_6px_rgba(37,99,235,0.8)]" />
          <div className="rounded-[2px] bg-brand-blue shadow-[0_0_6px_rgba(37,99,235,0.8)]" />
          <div className="rounded-[2px] bg-white" />
        </div>
        <span className="font-extrabold text-base tracking-tight">
          Meta<span className="text-brand-blue">Metric</span>
        </span>
      </div>

      {/* ---- LOCATION SWITCHER ---- */}
      <div className="px-4 pt-5 pb-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">Viewing</p>
        <div className="relative">
          <button
            onClick={() => setLocationOpen(!locationOpen)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full ${selectedLocation.color}`} />
              <span className="text-sm font-semibold text-white">{selectedLocation.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {selectedLocation.id === 'all' && (
                <span className="text-[10px] font-bold bg-brand-blue/30 text-blue-300 px-1.5 py-0.5 rounded-md">{selectedLocation.badge}</span>
              )}
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${locationOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <AnimatePresence>
            {locationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-12 bg-navy-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => { setSelectedLocation(loc); setLocationOpen(false); }}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-white/5 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${loc.color}`} />
                      <span className="text-sm font-medium text-slate-200">{loc.name}</span>
                    </div>
                    {selectedLocation.id === loc.id && (
                      <Check size={13} className="text-brand-blue" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ---- MAIN NAV ---- */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-2 pt-1">Navigation</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                  ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20 font-semibold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white font-medium'
                }`}
            >
              <Icon
                size={18}
                className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'} transition-colors`}
              />
              <span className="text-sm">{item.name}</span>
              {item.name === 'Dashboard' && (
                <span className="ml-auto text-[9px] font-bold bg-status-critical/20 text-status-critical px-1.5 py-0.5 rounded-md">1</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ---- BOTTOM ---- */}
      <div className="p-3 border-t border-slate-800/50 space-y-0.5">
        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white text-xs font-bold shrink-0">
            JD
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-white truncate">John Doe</div>
            <div className="text-[10px] text-slate-500 font-medium truncate">Business Owner</div>
          </div>
        </div>

        <Link
          href="/buisness-manager/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${pathname === '/buisness-manager/settings'
              ? 'bg-brand-blue text-white font-semibold'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white font-medium'
            }`}
        >
          <Settings size={18} className="group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-sm">Settings</span>
        </Link>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 font-medium transition-colors group">
          <LogOut size={18} />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}

// ---- MOBILE BOTTOM TAB BAR ----
// Export a separate component for use in the dashboard layout
export function MobileTabBar() {
  const pathname = usePathname();
  const tabs = [
    { name: "Overview", href: "/buisness-manager/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/buisness-manager/analytics", icon: BarChart3 },
    { name: "Location", href: "/buisness-manager/map", icon: MapPin },
    { name: "Products", href: "/buisness-manager/products", icon: Package },
    { name: "Settings", href: "/buisness-manager/settings", icon: Settings },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 flex items-center justify-around px-2 pb-safe"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)', paddingTop: '8px' }}
    >
      {tabs.map(({ name, href, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href);
        return (
          <Link
            key={name}
            href={href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${isActive ? 'text-brand-blue' : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-blue-50' : ''}`}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span className="text-[10px] font-bold">{name}</span>
          </Link>
        );
      })}
    </nav>
  );
}