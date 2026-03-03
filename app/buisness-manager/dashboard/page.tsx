"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  ChevronDown,
  MapPin,
  AlertTriangle,
  ArrowRightLeft,
  Store
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// --- MULTI-LOCATION MOCK DATA ---
const networkData = [
  { name: 'Mon', downtown: 4200, uptown: 3100, westside: 2800 },
  { name: 'Tue', downtown: 3800, uptown: 2900, westside: 2600 },
  { name: 'Wed', downtown: 4500, uptown: 3400, westside: 3100 },
  { name: 'Thu', downtown: 4800, uptown: 3600, westside: 2400 }, // Westside dip (anomaly)
  { name: 'Fri', downtown: 5600, uptown: 4800, westside: 3900 },
  { name: 'Sat', downtown: 6200, uptown: 5100, westside: 4200 },
  { name: 'Sun', downtown: 5800, uptown: 4900, westside: 4000 },
];

const branchPerformance = [
  { name: 'Downtown', revenue: 34900, target: 30000, labor: 8200 },
  { name: 'Uptown', revenue: 27800, target: 28000, labor: 7100 },
  { name: 'Westside', revenue: 23000, target: 25000, labor: 6800 },
];

export default function BusinessOwnerDashboard() {
  const [timeframe, setTimeframe] = useState('This Week');

  return (
 <div className="w-full max-w-[1600px] mx-auto space-y-8 p-6 md:p-10 lg:p-12">
      
      {/* --- EXECUTIVE HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-black text-navy-900 tracking-tight">Network Overview</h1>
            <span className="bg-brand-blue/10 text-brand-blue px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">
              Owner Portal
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Managing <strong className="text-navy-900">3 active locations</strong>. 
            <span className="text-status-warning ml-1 flex items-center inline-flex gap-1">
              <AlertTriangle size={14} /> 1 anomaly detected.
            </span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-navy-900 hover:bg-slate-100 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-brand-blue/20"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
          <button className="px-5 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-black transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* --- NETWORK KPI CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Aggregate Revenue */}
        <div className="md:col-span-2 bg-gradient-to-br from-navy-900 to-navy-800 p-6 rounded-2xl border border-slate-800 shadow-lg text-white relative overflow-hidden group">
           <div className="absolute -right-10 -top-10 w-48 h-48 bg-brand-blue/30 rounded-full blur-3xl group-hover:bg-brand-blue/40 transition-colors"></div>
           <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-semibold mb-1">Total Network Revenue</p>
              <h2 className="text-4xl font-black tracking-tight">$85,700.00</h2>
              <p className="text-xs text-slate-300 mt-2 flex items-center gap-1">
                <TrendingUp size={14} className="text-status-success" /> 
                <span className="text-status-success font-bold">+12.5%</span> vs last week
              </p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Store size={24} className="text-white" />
            </div>
           </div>
        </div>
        
        <StatCard 
          title="Top Performing Branch" 
          value="Downtown" 
          subtext="$34,900 (40% of total)" 
          icon={<TrendingUp size={20} className="text-status-success" />} 
        />
        <StatCard 
          title="Avg. Ticket Size" 
          value="$42.50" 
          subtext="+2.1% across network" 
          icon={<TrendingUp size={20} className="text-brand-blue" />} 
        />
      </div>

      {/* --- MAIN CHARTS ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Cross-Branch Comparison (Area Chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-navy-900">Revenue Across Locations</h3>
              <p className="text-xs text-slate-500 mt-1">Comparing daily performance</p>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={networkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradDowntown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradUptown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E293B" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1E293B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 500}} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600, fontSize: '12px' }} 
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '20px' }} />
                <Area type="monotone" name="Downtown" dataKey="downtown" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#gradDowntown)" />
                <Area type="monotone" name="Uptown" dataKey="uptown" stroke="#1E293B" strokeWidth={2} fillOpacity={1} fill="url(#gradUptown)" />
                <Area type="monotone" name="Westside" dataKey="westside" stroke="#94A3B8" strokeWidth={2} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. 5-Second Worst-Location Visibility (Alert Widget) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-navy-900">Branch Health</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded-md">Live</span>
          </div>
          
          <div className="space-y-4 flex-1">
            <BranchHealthItem 
              name="Downtown" 
              manager="Sarah J." 
              status="optimal" 
              metric="+15% to target" 
            />
            <BranchHealthItem 
              name="Uptown" 
              manager="Mike T." 
              status="warning" 
              metric="-2% to target" 
              alert="High labor ratio"
            />
            {/* The "Worst Location" feature from the landing page */}
            <BranchHealthItem 
              name="Westside" 
              manager="Emma R." 
              status="critical" 
              metric="-18% to target" 
              alert="Inventory surplus flagged"
            />
          </div>

          <button className="w-full mt-6 py-3 bg-blue-50 text-brand-blue rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
            <ArrowRightLeft size={16} /> Auto-Redistribute Inventory
          </button>
        </div>
      </div>

      {/* --- SECONDARY CHARTS ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 3. Branch Target vs Actual (Bar Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[380px] flex flex-col">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-navy-900">Revenue vs Target by Location</h3>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 500}} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 600 }}/>
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '10px' }} />
                <Bar name="Actual Revenue" dataKey="revenue" fill="var(--color-brand-blue)" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar name="Target Goal" dataKey="target" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Network Traffic (Custom Heatmap) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[380px] flex flex-col">
          <OrdersByTimeMatrix />
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ title, value, subtext, icon }: { title: string, value: string, subtext: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm text-slate-500 font-bold">{title}</p>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <h2 className="text-3xl font-black text-navy-900 tracking-tight">{value}</h2>
      <p className="text-xs text-slate-400 mt-2 font-medium">{subtext}</p>
    </div>
  );
}

function BranchHealthItem({ name, manager, status, metric, alert }: { name: string, manager: string, status: 'optimal' | 'warning' | 'critical', metric: string, alert?: string }) {
  
  const statusConfig = {
    optimal: { color: 'bg-green-50 text-status-success', dot: 'bg-status-success', border: 'border-green-100' },
    warning: { color: 'bg-yellow-50 text-status-warning', dot: 'bg-status-warning', border: 'border-yellow-100' },
    critical: { color: 'bg-red-50 text-status-critical', dot: 'bg-status-critical', border: 'border-red-200 bg-red-50/30' },
  };

  const config = statusConfig[status];

  return (
    <div className={`p-4 rounded-xl border ${config.border} transition-colors group cursor-pointer relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></div>
          <h4 className="font-bold text-sm text-navy-900">{name}</h4>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase ${config.color}`}>
          {metric}
        </span>
      </div>
      <div className="flex justify-between items-end mt-2">
         <p className="text-xs text-slate-500 flex items-center gap-1">
           <MapPin size={12}/> Mgr: {manager}
         </p>
         {alert && (
           <span className="text-[10px] font-bold text-status-critical flex items-center gap-1">
             <AlertTriangle size={10} /> {alert}
           </span>
         )}
      </div>
    </div>
  );
}

// Custom Heatmap Matrix for Network Traffic
function OrdersByTimeMatrix() {
  const days = Array.from({ length: 27 }, (_, i) => i + 1);
  const times = ['6am', '10am', '12pm', '2pm', '4pm', '6pm'];

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

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-navy-900">Network Peak Traffic</h3>
          <p className="text-xs text-slate-500 mt-1">Aggregated order volume</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 opacity-80">
          <span className="text-[10px] font-bold text-slate-400 mr-1">Low</span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-50"></div>
          <div className="w-2 h-2 rounded-full bg-blue-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
          <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
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
                    4: "w-5 h-5 bg-brand-blue shadow-sm shadow-blue-500/40"
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
            {days.map(day => (
              <span key={day}>{day % 2 !== 0 ? day : ''}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}