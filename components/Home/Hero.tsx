"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowRight, TrendingUp, AlertCircle, Package, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-48 pb-32 px-6 bg-navy-800 text-white rounded-b-[3rem] shadow-2xl overflow-hidden z-10">
      
      {/* 1. Theme-Linked Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-blue-200 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-sm">
          <Shield size={14} /> Enterprise Grade Analytics
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 leading-[1.1]">
          Operational clarity <br className="hidden md:block" /> for multi-location businesses.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Centralize management, monitor inventory, and optimize staff coverage across 3–5 branches from a single, intelligent dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          {/* 2. Theme-Linked Primary Button */}
          <Link 
            href="/signup?role=owner" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue/90 transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
          >
            I'm a Business Owner <ArrowRight size={18} />
          </Link>
          
          <Link 
            href="/login?role=manager" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            I'm a Location Manager
          </Link>
        </div>
      </motion.div>

      {/* --- ANIMATED FLOATING DASHBOARD MOCKUP --- */}
      <div className="relative h-[400px] w-full mt-24 flex justify-center max-w-5xl mx-auto z-10">
        {/* 3. Theme-Linked Central Beam */}
        <div className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-brand-blue/50 to-transparent shadow-[0_0_30px_rgba(37,99,235,0.5)]"></div>
        
        {/* 4. Widgets using Semantic Status Colors */}
        <FloatingWidget 
          icon={TrendingUp} 
          color="text-status-success" 
          bg="bg-status-success/10" 
          x="-260px" y="20px" 
          label="Westside Revenue" 
          value="+15.2%" 
          delay={0} 
        />
        <FloatingWidget 
          icon={AlertCircle} 
          color="text-status-critical" 
          bg="bg-status-critical/10" 
          x="-400px" y="160px" 
          label="Downtown Anomaly" 
          value="Flagged" 
          delay={0.5} 
        />
        <FloatingWidget 
          icon={Package} 
          color="text-status-warning" 
          bg="bg-status-warning/10" 
          x="-200px" y="280px" 
          label="North Hills Stock" 
          value="Low" 
          delay={1} 
        />
        
        <motion.div 
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="absolute right-0 top-1/4 text-left bg-white/10 border border-white/10 p-6 rounded-2xl w-80 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <Zap size={20} className="text-brand-blue" /> 
            <span className="font-bold text-white uppercase text-xs tracking-widest">AI Forecast Engine</span>
          </div>
          <div className="space-y-4">
             <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, ease: "circOut" }}
                  // 5. Theme-Linked Progress Bar
                  className="h-full bg-brand-blue shadow-[0_0_15px_rgba(37,99,235,0.6)]" 
                />
             </div>
             <p className="text-sm text-slate-300 font-medium">3-month moving averages calculated. Projections generated for Q3.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Sub-component (Kept local as requested)
function FloatingWidget({ icon: Icon, x, y, label, value, delay, color, bg }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{ opacity: { duration: 1, delay }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay } }}
      className="absolute bg-white/10 border border-white/10 p-4 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-4 cursor-default"
      style={{ left: `calc(50% + ${x})`, top: y }}
    >
      {/* 6. Dynamic Status Color Injection */}
      <div className={`p-2 rounded-lg ${bg} ${color}`}><Icon size={20} /></div>
      <div className="text-left">
        <div className="text-[10px] uppercase tracking-widest text-slate-300 font-bold mb-0.5">{label}</div>
        <div className="text-sm font-extrabold text-white">{value}</div>
      </div>
    </motion.div>
  );
}