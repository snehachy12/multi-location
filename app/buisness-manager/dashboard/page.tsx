"use client";

<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ChevronDown,
  MapPin,
  AlertTriangle,
  ArrowRightLeft,
  Store,
  Bell,
  CheckCircle2,
  X,
  Calendar,
  Clock,
  Download,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, LineChart, Line,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
=======
import React, { useState } from 'react';


import Sidebar from '@/components/buisnessidebar'; 

import { 
  TrendingUp, TrendingDown, Search, ChevronDown, MapPin, AlertTriangle, 
  ArrowRightLeft, Store, Sparkles, PlusCircle, CalendarClock, MessageSquare, 
  Download, Smile, ShoppingBag // <-- ShoppingBag is fixed here
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

<<<<<<< HEAD
// ================================================================
// MOCK DATA
// ================================================================
=======
// --- MOCK DATA ---
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
const networkData = [
  { name: 'Mon', downtown: 4200, uptown: 3100, westside: 2800 },
  { name: 'Tue', downtown: 3800, uptown: 2900, westside: 2600 },
  { name: 'Wed', downtown: 4500, uptown: 3400, westside: 3100 },
<<<<<<< HEAD
  { name: 'Thu', downtown: 4800, uptown: 3600, westside: 2400 },
=======
  { name: 'Thu', downtown: 4800, uptown: 3600, westside: 2400 }, 
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
  { name: 'Fri', downtown: 5600, uptown: 4800, westside: 3900 },
  { name: 'Sat', downtown: 6200, uptown: 5100, westside: 4200 },
  { name: 'Sun', downtown: 5800, uptown: 4900, westside: 4000 },
];

const branchPerformance = [
  { name: 'Downtown', revenue: 34900, target: 30000 },
  { name: 'Uptown', revenue: 27800, target: 28000 },
  { name: 'Westside', revenue: 23000, target: 25000 },
];

<<<<<<< HEAD
// Mini sparkline data per KPI card
const revenueSparkline = [82, 91, 88, 95, 101, 97, 110];
const branchSparkline = [34, 36, 33, 35, 38, 37, 40];
const ticketSparkline = [39, 41, 40, 42, 41, 43, 42.5];

const notifications = [
  { id: 1, type: 'critical', title: 'Westside Anomaly', body: 'Revenue -18% below 3-month average.', time: '2m ago', read: false },
  { id: 2, type: 'warning', title: 'Uptown: High Labor', body: 'Labor ratio exceeded 28% of revenue.', time: '14m ago', read: false },
  { id: 3, type: 'success', title: 'Downtown Target Met', body: 'Downtown exceeded monthly target by 15%.', time: '1h ago', read: true },
  { id: 4, type: 'info', title: 'Inventory Redistributed', body: 'Auto-redistribution from Westside → Uptown complete.', time: '3h ago', read: true },
];

// ================================================================
// TOAST SYSTEM
// ================================================================
type ToastType = { id: number; text: string; type: 'success' | 'info' | 'error' };

function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const addToast = (text: string, type: ToastType['type'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };
  return { toasts, addToast };
}

// ================================================================
// MAIN DASHBOARD
// ================================================================
export default function BusinessOwnerDashboard() {
=======
const revenueBreakdown = [
  { name: 'Food', value: 45000 },
  { name: 'Beverages', value: 25000 },
  { name: 'Add-ons', value: 15700 },
];
const PIE_COLORS = ['#2563EB', '#60A5FA', '#DBEAFE'];

export default function CompleteBusinessOwnerDashboard() {
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
  const [timeframe, setTimeframe] = useState('This Week');
  const [notifOpen, setNotifOpen] = useState(false);
  const [toastList, setToastList] = useState<ToastType[]>([]);
  const [currentTime, setCurrentTime] = useState('');

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const addToast = (text: string, type: ToastType['type'] = 'success') => {
    const id = Date.now();
    setToastList(prev => [...prev, { id, text, type }]);
    setTimeout(() => setToastList(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
<<<<<<< HEAD
    <div className="relative w-full max-w-[1600px] mx-auto space-y-6 p-5 md:p-8 lg:p-10">

      {/* ---- EXECUTIVE HEADER ---- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-xl font-black text-navy-900 tracking-tight">Network Overview</h1>
            <span className="bg-brand-blue/10 text-brand-blue px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-widest">
              Owner Portal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-500 font-medium">
              Managing <strong className="text-navy-900">3 active locations</strong>
              <span className="text-status-warning ml-2 inline-flex items-center gap-1">
                <AlertTriangle size={12} /> 1 anomaly detected
              </span>
            </p>
          </div>
        </div>

        {/* Right: clock + controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Live clock */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
            <Clock size={14} className="text-slate-400" />
            <div className="text-xs font-bold text-navy-900 tabular-nums">{currentTime}</div>
            <div className="h-3 w-px bg-slate-200 mx-1" />
            <Calendar size={13} className="text-slate-400" />
            <div className="text-xs font-semibold text-slate-500">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          {/* Timeframe */}
          <div className="relative">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-navy-900 hover:bg-slate-100 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-brand-blue/20"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <Bell size={17} className="text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-status-critical text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <span className="font-bold text-sm text-navy-900 flex items-center gap-2">
                      <Sparkles size={14} className="text-brand-blue" /> Alerts
                      {unreadCount > 0 && (
                        <span className="bg-status-critical text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount} new</span>
                      )}
                    </span>
                    <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={15} />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <NotifItem key={n.id} notif={n} />
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-slate-100">
                    <button className="text-xs font-bold text-brand-blue hover:underline">Mark all as read</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Generate Report */}
          <button
            onClick={() => addToast('Report generated and ready to download!', 'success')}
            className="flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-black transition-colors"
          >
            <Download size={15} /> Generate Report
          </button>
        </div>
      </div>

      {/* ---- KPI CARDS ---- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        {/* Total Revenue — dark featured card */}
        <div className="md:col-span-2 bg-gradient-to-br from-navy-900 to-navy-800 p-6 rounded-2xl border border-slate-800 shadow-lg text-white relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-brand-blue/30 rounded-full blur-3xl group-hover:bg-brand-blue/45 transition-colors" />
          <div className="absolute -left-4 -bottom-4 w-28 h-28 bg-brand-purple/20 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-widest">Total Network Revenue</p>
                <h2 className="text-4xl font-black tracking-tight">$85,700</h2>
                <p className="text-xs text-slate-300 mt-1.5 flex items-center gap-1">
                  <TrendingUp size={13} className="text-status-success" />
                  <span className="text-status-success font-bold">+12.5%</span> vs last week
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Store size={22} className="text-white" />
              </div>
            </div>
            {/* Sparkline */}
            <div className="h-14 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueSparkline.map((v, i) => ({ v, i }))}>
                  <Line type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <KpiCard
          title="Top Performing Branch"
          value="Downtown"
          subtext="$34,900 · 40% of total"
          trend="+15%"
          positive
          sparkData={branchSparkline}
          icon={<TrendingUp size={18} className="text-status-success" />}
        />
        <KpiCard
          title="Avg. Ticket Size"
          value="$42.50"
          subtext="+2.1% across network"
          trend="+2.1%"
          positive
          sparkData={ticketSparkline}
          icon={<TrendingUp size={18} className="text-brand-blue" />}
        />
      </div>

      {/* ---- MAIN CHARTS ROW ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Cross-branch area chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-navy-900 text-base">Revenue Across Locations</h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">Daily performance — {timeframe}</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-blue inline-block" />Downtown</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-navy-700 inline-block" />Uptown</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-purple inline-block" />Westside</span>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={networkData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradDowntown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradUptown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#334155" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#334155" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradWestside" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', fontWeight: 600, fontSize: '12px' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, undefined]}
                />
                <Area type="monotone" name="Downtown" dataKey="downtown" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#gradDowntown)" />
                <Area type="monotone" name="Uptown" dataKey="uptown" stroke="#334155" strokeWidth={2} fillOpacity={1} fill="url(#gradUptown)" />
                <Area type="monotone" name="Westside" dataKey="westside" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 3" fillOpacity={1} fill="url(#gradWestside)" />
              </AreaChart>
            </ResponsiveContainer>
=======
    // We set up a flex container for the whole screen
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* 2. WE RENDER THE SIDEBAR HERE */}
      <Sidebar />

      {/* 3. MAIN DASHBOARD CONTENT SCROLLS NEXT TO IT */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-[1600px] mx-auto p-6 md:p-8 lg:p-10 space-y-8">
          
          {/* AI INSIGHT BANNER */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-4 px-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><Sparkles size={20} className="text-blue-100" /></div>
              <div>
                <h4 className="font-bold text-sm tracking-wide text-blue-50">AI System Alert</h4>
                <p className="text-sm text-blue-100">Westside branch is pacing 18% below target. Recommending targeted weekend promotion.</p>
              </div>
            </div>
            <button className="whitespace-nowrap px-4 py-2 bg-white text-blue-700 font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
              Review Recommendation
            </button>
          </div>

          {/* EXECUTIVE HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Network Overview</h1>
                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-blue-200">
                  Owner Portal
                </span>
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Managing <strong className="text-slate-900">3 active locations</strong> across the city.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
              <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-black transition-colors flex items-center gap-2">
                <Download size={16} /> Generate Report
              </button>
            </div>
          </div>

          {/* PRIMARY METRICS (KPIs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Network Revenue" value="$85,700.00" trend="+12.5%" isUp={true} subtext="vs last week" icon={<Store size={20} className="text-blue-600"/>} highlight />
            <StatCard title="Top Performing Branch" value="Downtown" trend="+4.2%" isUp={true} subtext="$34,900 (40% of total)" icon={<TrendingUp size={20} className="text-green-600"/>} />
            <StatCard title="Avg. Ticket Size" value="$42.50" trend="+2.1%" isUp={true} subtext="across all networks" icon={<ShoppingBag size={20} className="text-purple-600"/>} />
            <StatCard title="Customer Satisfaction" value="4.8/5.0" trend="-0.1" isUp={false} subtext="Based on 432 reviews" icon={<Smile size={20} className="text-amber-500"/>} />
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
          </div>

          {/* ROW 1: MAIN ANALYTICS & INSIGHTS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Revenue Area Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Revenue Across Locations</h3>
                  <p className="text-xs text-slate-500 mt-1">Comparing daily performance trends</p>
                </div>
              </div>
              <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={networkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradDowntown" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gradUptown" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0F172A" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} tickFormatter={(val) => `$${val/1000}k`} />
                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600 }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 600, paddingTop: '20px' }} />
                    <Area type="monotone" name="Downtown" dataKey="downtown" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#gradDowntown)" />
                    <Area type="monotone" name="Uptown" dataKey="uptown" stroke="#0F172A" strokeWidth={2} fillOpacity={1} fill="url(#gradUptown)" />
                    <Area type="monotone" name="Westside" dataKey="westside" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Smart Insights & Quick Actions Stack */}
            <div className="lg:col-span-1 space-y-6 flex flex-col">
              {/* Smart Insights */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex-1 border border-slate-800">
                 <div className="flex items-center gap-2 mb-6">
                   <Sparkles size={20} className="text-blue-400" />
                   <h3 className="font-bold text-lg">Smart Insights</h3>
                 </div>
                 <ul className="space-y-4">
                   <InsightItem text="Downtown is outperforming targets by 16%." color="text-green-400" />
                   <InsightItem text="Westside revenue dipped unexpectedly on Thursday." color="text-red-400" />
                   <InsightItem text="Peak network traffic is consistently between 12pm - 2pm." color="text-blue-400" />
                   <InsightItem text="Suggesting inventory transfer from Uptown to Westside." color="text-purple-400" />
                 </ul>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={<PlusCircle size={18}/>} label="Add Promo" />
                    <ActionButton icon={<CalendarClock size={18}/>} label="Schedule" />
                    <ActionButton icon={<MessageSquare size={18}/>} label="Message Mgr" />
                    <ActionButton icon={<ArrowRightLeft size={18}/>} label="Transfer Inv" />
                 </div>
              </div>
            </div>
          </div>

          {/* ROW 2: BAR, PIE, AND HEALTH */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Target vs Actual */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[380px] flex flex-col">
               <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 text-lg">Revenue vs Target</h3>
              </div>
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} tickFormatter={(val) => `$${val/1000}k`} />
                    <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600 }}/>
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '10px' }} />
                    <Bar name="Actual" dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={28} />
                    <Bar name="Target" dataKey="target" fill="#CBD5E1" radius={[4, 4, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Breakdown Donut */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[380px] flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-900 text-lg">Revenue Breakdown</h3>
              </div>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 600 }} formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600 }}/>
                  </PieChart>
                </ResponsiveContainer>
                {/* Donut Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-8">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</span>
                  <span className="text-xl font-black text-slate-900">$85.7k</span>
                </div>
              </div>
            </div>

            {/* Branch Health Panel */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[380px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 text-lg">Branch Health</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded-md border border-slate-200">Live Status</span>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <BranchHealthItem name="Downtown" status="optimal" metric="+15% to target" alert="Operating optimally" />
                <BranchHealthItem name="Uptown" status="warning" metric="-2% to target" alert="High labor cost detected" />
                <BranchHealthItem name="Westside" status="critical" metric="-18% to target" alert="Low revenue / Inventory surplus" />
              </div>
            </div>

          </div>

          {/* ROW 3: HEATMAP */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[380px] flex flex-col">
            <OrdersByTimeMatrix />
          </div>

        </div>
<<<<<<< HEAD

        {/* Branch Health Widget */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-navy-900 text-base">Branch Health</h3>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-green-50 text-status-success px-2 py-1 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse inline-block" /> Live
            </span>
          </div>

          <div className="space-y-3 flex-1">
            <BranchHealthItem name="Downtown" manager="Sarah J." status="optimal" metric="+15% to target" />
            <BranchHealthItem name="Uptown" manager="Mike T." status="warning" metric="-2% to target" alert="High labor ratio" />
            <BranchHealthItem name="Westside" manager="Emma R." status="critical" metric="-18% to target" alert="Inventory surplus flagged" />
          </div>

          <button
            onClick={() => addToast('Inventory redistribution initiated — Westside → Uptown', 'info')}
            className="w-full mt-5 py-3 bg-blue-50 text-brand-blue rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowRightLeft size={15} /> Auto-Redistribute Inventory
          </button>
        </div>
      </div>

      {/* ---- SECONDARY CHARTS ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Bar — Revenue vs Target */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[360px] flex flex-col">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="font-bold text-navy-900 text-base">Revenue vs Target</h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">By location — {timeframe}</p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchPerformance} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontWeight: 600, fontSize: '12px' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, undefined]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '8px' }} />
                <Bar name="Actual Revenue" dataKey="revenue" fill="var(--color-brand-blue)" radius={[5, 5, 0, 0]} barSize={28} />
                <Bar name="Target Goal" dataKey="target" fill="#E2E8F0" radius={[5, 5, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[360px] flex flex-col">
          <OrdersByTimeMatrix />
        </div>
      </div>

      {/* ---- TOAST NOTIFICATIONS ---- */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none">
        <AnimatePresence>
          {toastList.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-navy-900 text-white text-sm font-semibold min-w-[260px] max-w-[360px] shadow-xl border border-white/8"
              style={{ borderLeft: `3px solid ${t.type === 'success' ? '#16A34A' : t.type === 'error' ? '#DC2626' : '#2563EB'}` }}
            >
              {t.type === 'success' ? <CheckCircle2 size={16} className="text-status-success shrink-0" />
                : t.type === 'error' ? <AlertTriangle size={16} className="text-status-critical shrink-0" />
                  : <Bell size={16} className="text-brand-blue-light shrink-0" />}
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
=======
      </main>
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
    </div>
  );
}

// ================================================================
// SUB-COMPONENTS
// ================================================================

<<<<<<< HEAD
function KpiCard({ title, value, subtext, trend, positive, icon, sparkData }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-100 transition-all group">
      <div className="flex justify-between items-start mb-3">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{title}</p>
        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">{icon}</div>
      </div>
      <div>
        <h2 className="text-2xl font-black text-navy-900 tracking-tight">{value}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${positive ? 'bg-green-50 text-status-success' : 'bg-red-50 text-status-critical'}`}>
            {positive ? <TrendingUp size={10} className="inline mr-0.5" /> : <TrendingDown size={10} className="inline mr-0.5" />}
            {trend}
          </span>
          <p className="text-xs text-slate-400 font-medium">{subtext}</p>
        </div>
      </div>
      {/* Sparkline */}
      <div className="h-10 w-full mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData.map((v: number, i: number) => ({ v, i }))}>
            <Line type="monotone" dataKey="v" stroke={positive ? '#16A34A' : '#DC2626'} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
=======
function StatCard({ title, value, trend, isUp, subtext, icon, highlight = false }: any) {
  return (
    <div className={`p-6 rounded-2xl border shadow-sm flex flex-col justify-center transition-shadow hover:shadow-md ${highlight ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <p className={`text-sm font-bold ${highlight ? 'text-slate-300' : 'text-slate-500'}`}>{title}</p>
        <div className={`p-2 rounded-xl ${highlight ? 'bg-white/10 backdrop-blur-sm' : 'bg-slate-50 border border-slate-100'}`}>{icon}</div>
      </div>
      <h2 className={`text-3xl font-black tracking-tight ${highlight ? 'text-white' : 'text-slate-900'}`}>{value}</h2>
      <div className="flex items-center gap-2 mt-3">
        <span className={`flex items-center text-[11px] font-bold px-2 py-1 rounded-md ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isUp ? <TrendingUp size={12} strokeWidth={3} className="mr-1"/> : <TrendingDown size={12} strokeWidth={3} className="mr-1"/>}
          {trend}
        </span>
        <span className={`text-[11px] font-medium ${highlight ? 'text-slate-400' : 'text-slate-400'}`}>{subtext}</span>
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
      </div>
    </div>
  );
}

<<<<<<< HEAD
function BranchHealthItem({ name, manager, status, metric, alert }: {
  name: string; manager: string; status: 'optimal' | 'warning' | 'critical'; metric: string; alert?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const statusConfig = {
    optimal: { color: 'bg-green-50 text-status-success', dot: 'bg-status-success', border: 'border-green-100', bg: 'bg-green-50/40' },
    warning: { color: 'bg-yellow-50 text-status-warning', dot: 'bg-status-warning', border: 'border-yellow-100', bg: 'bg-yellow-50/40' },
    critical: { color: 'bg-red-50 text-status-critical', dot: 'bg-status-critical', border: 'border-red-200', bg: 'bg-red-50/40' },
  };

  const miniData = {
    optimal: [20, 22, 24, 23, 26, 28, 29],
    warning: [22, 21, 20, 19, 21, 20, 22],
    critical: [28, 25, 22, 20, 17, 15, 14],
  }[status];

  const config = statusConfig[status];

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`p-4 rounded-xl border ${config.border} cursor-pointer transition-all hover:shadow-sm`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
          <h4 className="font-bold text-sm text-navy-900">{name}</h4>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${config.color}`}>{metric}</span>
      </div>
      <div className="flex justify-between items-end mt-1.5">
        <p className="text-xs text-slate-400 flex items-center gap-1 font-medium">
          <MapPin size={11} /> {manager}
        </p>
        {alert && (
          <span className="text-[10px] font-bold text-status-critical flex items-center gap-1">
            <AlertTriangle size={10} /> {alert}
          </span>
        )}
      </div>

      {/* Hover-expand mini bar chart */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 52, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden mt-2"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={miniData.map((v, i) => ({ v, d: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i] }))} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                <Bar dataKey="v" fill={status === 'optimal' ? '#16A34A' : status === 'warning' ? '#D97706' : '#DC2626'} radius={[2, 2, 0, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotifItem({ notif }: { notif: typeof notifications[0] }) {
  const colors = {
    critical: 'bg-red-50 text-status-critical',
    warning: 'bg-yellow-50 text-status-warning',
    success: 'bg-green-50 text-status-success',
    info: 'bg-blue-50 text-brand-blue',
  };
  return (
    <div className={`px-4 py-3 hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.read ? 'bg-brand-blue' : 'bg-slate-200'}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-navy-900 truncate">{notif.title}</span>
            <span className="text-[10px] text-slate-400 font-medium shrink-0">{notif.time}</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-relaxed">{notif.body}</p>
        </div>
=======
function InsightItem({ text, color }: { text: string, color: string }) {
  return (
    <li className="flex items-start gap-3 text-sm font-medium text-slate-300 leading-snug">
      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${color}`}></div>
      {text}
    </li>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all group">
      <div className="text-slate-500 group-hover:text-blue-600 transition-colors">{icon}</div>
      <span className="text-xs font-bold">{label}</span>
    </button>
  );
}

function BranchHealthItem({ name, status, metric, alert }: { name: string, status: 'optimal' | 'warning' | 'critical', metric: string, alert: string }) {
  const config = {
    optimal: { color: 'text-green-700 bg-green-100', dot: 'bg-green-500', border: 'border-green-100 bg-white' },
    warning: { color: 'text-amber-700 bg-amber-100', dot: 'bg-amber-500', border: 'border-amber-100 bg-amber-50/30' },
    critical: { color: 'text-red-700 bg-red-100', dot: 'bg-red-500', border: 'border-red-200 bg-red-50/50' },
  }[status];

  return (
    <div className={`p-4 rounded-xl border ${config.border} transition-colors group cursor-pointer relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.dot} ${status === 'critical' ? 'animate-pulse' : ''}`}></div>
          <h4 className="font-bold text-sm text-slate-900">{name}</h4>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase ${config.color}`}>{metric}</span>
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
      </div>
      <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
        {status === 'optimal' ? <Store size={12}/> : <AlertTriangle size={12} className={status === 'critical' ? 'text-red-500' : 'text-amber-500'}/>} 
        {alert}
      </p>
    </div>
  );
}

function OrdersByTimeMatrix() {
  const days = Array.from({ length: 27 }, (_, i) => i + 1);
  const times = ['6am', '10am', '12pm', '2pm', '4pm', '6pm'];
  const [hovered, setHovered] = useState<{ day: number; time: string; density: number } | null>(null);

  const getOrderDensity = (day: number, timeIdx: number) => {
    const distance = Math.abs(day - 14) + Math.abs(timeIdx - 3);
    if (distance === 0) return 4;
    if (distance === 1) return 3;
    if (distance === 2) return 2;
<<<<<<< HEAD
    if (Math.abs(day - centerDay) <= 4 && Math.abs(timeIdx - centerTime) <= 2) return 1;
    return 0;
=======
    if (Math.abs(day - 14) <= 4 && Math.abs(timeIdx - 3) <= 2) return 1;
    return 0; 
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
  };

  const orderLabels = ['None', 'Low', 'Medium', 'High', 'Peak'];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
<<<<<<< HEAD
          <h3 className="font-bold text-navy-900 text-base">Network Peak Traffic</h3>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">Aggregated order volume</p>
=======
          <h3 className="font-bold text-slate-900 text-lg">Network Peak Traffic</h3>
          <p className="text-xs text-slate-500 mt-1">Aggregated order volume across all branches</p>
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 mr-1">Low</span>
<<<<<<< HEAD
          {[0, 1, 2, 3].map((l) => (
            <div key={l} className={`rounded-full ${['w-1.5 h-1.5 bg-blue-50', 'w-2 h-2 bg-blue-200', 'w-2.5 h-2.5 bg-blue-400', 'w-3 h-3 bg-brand-blue'][l]}`} />
          ))}
=======
          <div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>
          <div className="w-2 h-2 rounded-full bg-blue-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
          <span className="text-[10px] font-bold text-slate-400 ml-1">High</span>
        </div>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div className="mb-2 text-[11px] font-bold text-navy-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 inline-flex items-center gap-2">
          📅 Day {hovered.day} · {hovered.time}
          <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${hovered.density === 0 ? 'bg-slate-100 text-slate-500'
              : hovered.density === 1 ? 'bg-blue-50 text-blue-400'
                : hovered.density === 2 ? 'bg-blue-100 text-blue-600'
                  : hovered.density === 3 ? 'bg-blue-200 text-blue-800'
                    : 'bg-brand-blue text-white'
            }`}>
            {orderLabels[hovered.density]}
          </span>
        </div>
<<<<<<< HEAD
      )}

      <div className="flex-1 flex w-full">
        <div className="flex flex-col justify-between pr-2 py-1 text-[9px] font-bold text-slate-400">
          {times.map(t => <span key={t} className="h-5 flex items-center">{t}</span>)}
        </div>
        <div className="flex-1 pl-2 flex flex-col overflow-hidden">
=======
        <div className="flex-1 pl-3 flex flex-col overflow-hidden">
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
          <div className="flex-1 grid grid-rows-6 gap-y-1">
            {times.map((time, timeIdx) => (
              <div key={timeIdx} className="grid grid-cols-[repeat(27,minmax(0,1fr))] gap-x-0.5 items-center justify-items-center">
                {days.map(day => {
                  const density = getOrderDensity(day, timeIdx);
                  const styles = {
                    0: "w-2 h-2 bg-slate-50",
<<<<<<< HEAD
                    1: "w-2.5 h-2.5 bg-blue-100",
                    2: "w-3 h-3 bg-blue-300",
                    3: "w-3.5 h-3.5 bg-blue-500",
                    4: "w-4 h-4 bg-brand-blue shadow-sm shadow-blue-500/40",
=======
                    1: "w-3 h-3 bg-blue-100",
                    2: "w-3.5 h-3.5 bg-blue-300",
                    3: "w-4 h-4 bg-blue-500",
                    4: "w-5 h-5 bg-blue-600 shadow-sm shadow-blue-500/40"
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
                  }[density] || "w-2 h-2 bg-slate-50";
                  return (
                    <div
                      key={`${day}-${timeIdx}`}
                      className="flex items-center justify-center w-5 h-5 group relative"
                      onMouseEnter={() => setHovered({ day, time, density })}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className={`rounded-full transition-all duration-200 group-hover:scale-125 cursor-crosshair ${styles}`} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
<<<<<<< HEAD
          <div className="grid grid-cols-[repeat(27,minmax(0,1fr))] gap-x-0.5 mt-2 text-[9px] text-slate-400 font-bold justify-items-center">
            {days.map(day => <span key={day}>{day % 3 === 1 ? day : ''}</span>)}
=======
          <div className="grid grid-cols-[repeat(27,minmax(0,1fr))] gap-x-0.5 mt-3 text-[9px] text-slate-400 font-bold justify-items-center">
            {days.map(day => <span key={day}>{day % 2 !== 0 ? day : ''}</span>)}
>>>>>>> 1e47b723d07880b8051ab19bacff02667763abe5
          </div>
        </div>
      </div>
    </>
  );
}