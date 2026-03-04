"use client";

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
} from 'recharts';

// --- MOCK DATA ---
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
  { name: 'Downtown', revenue: 34900, target: 30000 },
  { name: 'Uptown', revenue: 27800, target: 28000 },
  { name: 'Westside', revenue: 23000, target: 25000 },
];

const revenueBreakdown = [
  { name: 'Food', value: 45000 },
  { name: 'Beverages', value: 25000 },
  { name: 'Add-ons', value: 15700 },
];
const PIE_COLORS = ['#2563EB', '#60A5FA', '#DBEAFE'];

export default function CompleteBusinessOwnerDashboard() {
  const [timeframe, setTimeframe] = useState('This Week');

  return (
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
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

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
      </div>
    </div>
  );
}

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

  const getOrderDensity = (day: number, timeIdx: number) => {
    const distance = Math.abs(day - 14) + Math.abs(timeIdx - 3);
    if (distance === 0) return 4;
    if (distance === 1) return 3;
    if (distance === 2) return 2;
    if (Math.abs(day - 14) <= 4 && Math.abs(timeIdx - 3) <= 2) return 1;
    return 0; 
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Network Peak Traffic</h3>
          <p className="text-xs text-slate-500 mt-1">Aggregated order volume across all branches</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 opacity-80">
          <span className="text-[10px] font-bold text-slate-400 mr-1">Low</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-100"></div>
          <div className="w-2 h-2 rounded-full bg-blue-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <span className="text-[10px] font-bold text-slate-400 ml-1">High</span>
        </div>
      </div>

      <div className="flex-1 flex w-full">
        <div className="flex flex-col justify-between pr-3 py-2 border-r border-slate-100 text-[10px] font-bold text-slate-400">
          {times.map(time => <span key={time} className="h-5 flex items-center">{time}</span>)}
        </div>
        <div className="flex-1 pl-3 flex flex-col overflow-hidden">
          <div className="flex-1 grid grid-rows-6 gap-y-1">
            {times.map((_, timeIdx) => (
              <div key={timeIdx} className="grid grid-cols-[repeat(27,minmax(0,1fr))] gap-x-0.5 items-center justify-items-center">
                {days.map(day => {
                  const density = getOrderDensity(day, timeIdx);
                  const styles = {
                    0: "w-2 h-2 bg-slate-50",
                    1: "w-3 h-3 bg-blue-100",
                    2: "w-3.5 h-3.5 bg-blue-300",
                    3: "w-4 h-4 bg-blue-500",
                    4: "w-5 h-5 bg-blue-600 shadow-sm shadow-blue-500/40"
                  }[density] || "w-2 h-2 bg-slate-50";

                  return (
                    <div key={`${day}-${timeIdx}`} className="flex items-center justify-center w-5 h-5 group relative">
                      <div className={`rounded-full transition-all duration-300 group-hover:scale-125 cursor-crosshair ${styles}`}></div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[repeat(27,minmax(0,1fr))] gap-x-0.5 mt-3 text-[9px] text-slate-400 font-bold justify-items-center">
            {days.map(day => <span key={day}>{day % 2 !== 0 ? day : ''}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}