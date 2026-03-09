"use client";

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
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// ================================================================
// MOCK DATA
// ================================================================
const networkData = [
  { name: 'Mon', downtown: 4200, uptown: 3100, westside: 2800 },
  { name: 'Tue', downtown: 3800, uptown: 2900, westside: 2600 },
  { name: 'Wed', downtown: 4500, uptown: 3400, westside: 3100 },
  { name: 'Thu', downtown: 4800, uptown: 3600, westside: 2400 },
  { name: 'Fri', downtown: 5600, uptown: 4800, westside: 3900 },
  { name: 'Sat', downtown: 6200, uptown: 5100, westside: 4200 },
  { name: 'Sun', downtown: 5800, uptown: 4900, westside: 4000 },
];

const branchPerformance = [
  { name: 'Downtown', revenue: 34900, target: 30000, labor: 8200 },
  { name: 'Uptown', revenue: 27800, target: 28000, labor: 7100 },
  { name: 'Westside', revenue: 23000, target: 25000, labor: 6800 },
];

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
          </div>
        </div>

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
    </div>
  );
}

// ================================================================
// SUB-COMPONENTS
// ================================================================

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
      </div>
    </div>
  );
}

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
      </div>
    </div>
  );
}

function OrdersByTimeMatrix() {
  const days = Array.from({ length: 27 }, (_, i) => i + 1);
  const times = ['6am', '10am', '12pm', '2pm', '4pm', '6pm'];
  const [hovered, setHovered] = useState<{ day: number; time: string; density: number } | null>(null);

  const getOrderDensity = (day: number, timeIdx: number) => {
    const centerDay = 14;
    const centerTime = 3;
    const distance = Math.abs(day - centerDay) + Math.abs(timeIdx - centerTime);
    if (distance === 0) return 4;
    if (distance === 1) return 3;
    if (distance === 2) return 2;
    if (Math.abs(day - centerDay) <= 4 && Math.abs(timeIdx - centerTime) <= 2) return 1;
    return 0;
  };

  const orderLabels = ['None', 'Low', 'Medium', 'High', 'Peak'];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-navy-900 text-base">Network Peak Traffic</h3>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">Aggregated order volume</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-400 mr-1">Low</span>
          {[0, 1, 2, 3].map((l) => (
            <div key={l} className={`rounded-full ${['w-1.5 h-1.5 bg-blue-50', 'w-2 h-2 bg-blue-200', 'w-2.5 h-2.5 bg-blue-400', 'w-3 h-3 bg-brand-blue'][l]}`} />
          ))}
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
      )}

      <div className="flex-1 flex w-full">
        <div className="flex flex-col justify-between pr-2 py-1 text-[9px] font-bold text-slate-400">
          {times.map(t => <span key={t} className="h-5 flex items-center">{t}</span>)}
        </div>
        <div className="flex-1 pl-2 flex flex-col overflow-hidden">
          <div className="flex-1 grid grid-rows-6 gap-y-1">
            {times.map((time, timeIdx) => (
              <div key={timeIdx} className="grid grid-cols-[repeat(27,minmax(0,1fr))] gap-x-0.5 items-center justify-items-center">
                {days.map(day => {
                  const density = getOrderDensity(day, timeIdx);
                  const styles = {
                    0: "w-2 h-2 bg-slate-50",
                    1: "w-2.5 h-2.5 bg-blue-100",
                    2: "w-3 h-3 bg-blue-300",
                    3: "w-3.5 h-3.5 bg-blue-500",
                    4: "w-4 h-4 bg-brand-blue shadow-sm shadow-blue-500/40",
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
          <div className="grid grid-cols-[repeat(27,minmax(0,1fr))] gap-x-0.5 mt-2 text-[9px] text-slate-400 font-bold justify-items-center">
            {days.map(day => <span key={day}>{day % 3 === 1 ? day : ''}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}