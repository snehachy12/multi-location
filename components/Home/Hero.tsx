"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowRight, TrendingUp, AlertCircle, Package, Zap, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-44 pb-28 px-6 bg-navy-800 text-white rounded-b-[3rem] shadow-2xl overflow-hidden z-10">

      {/* ---- Layered Background Glows ---- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-brand-blue/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-brand-purple/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-[10%] w-48 h-48 bg-brand-blue/10 blur-[80px] rounded-full pointer-events-none" />

      {/* ---- Grid Dot Pattern overlay ---- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* ---- Eyebrow Badge ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-blue-200 text-[11px] font-bold tracking-[0.12em] uppercase mb-8 backdrop-blur-sm"
        >
          <Sparkles size={12} className="text-brand-blue-light" />
          Enterprise-Grade Multi-Location Intelligence
        </motion.div>

        {/* ---- Headline ---- */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-7 leading-[1.08]">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400">
            Operational clarity
          </span>
          <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue-light via-slate-200 to-brand-purple-light">
            {" "}for multi-location businesses.
          </span>
        </h1>

        {/* ---- Subheadline ---- */}
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Centralize management, monitor inventory, and optimize staff coverage<br className="hidden md:block" />
          across 3–5 branches from a single, intelligent dashboard.
        </p>

        {/* ---- CTA Buttons ---- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary — Pulse Ring */}
          <div className="relative group">
            {/* Animated pulse ring */}
            <span className="absolute inset-0 rounded-xl bg-brand-blue/50 blur-md scale-105 group-hover:scale-110 transition-transform duration-500 animate-pulse" />
            <Link
              href="/signup?role=owner"
              className="relative flex items-center justify-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-brand-blue-dark transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(37,99,235,0.4)] z-10"
            >
              I&apos;m a Business Owner <ArrowRight size={17} />
            </Link>
          </div>

          {/* Secondary */}
          <Link
            href="/login?role=manager"
            className="flex items-center justify-center gap-2 bg-white/5 border border-white/12 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
          >
            I&apos;m a Location Manager
          </Link>
        </div>

        {/* ---- Trust chips ---- */}
        <div className="flex items-center justify-center flex-wrap gap-6 mt-10">
          {[
            { icon: "🔒", text: "SOC 2 Compliant" },
            { icon: "⚡", text: "5-second anomaly detection" },
            { icon: "📍", text: "Up to 5 locations" },
          ].map((chip) => (
            <span key={chip.text} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
              <span>{chip.icon}</span> {chip.text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ---- Animated Floating Dashboard Mockup ---- */}
      <div className="relative h-[340px] md:h-[420px] w-full mt-20 flex justify-center max-w-5xl mx-auto z-10">
        {/* Central beam */}
        <div className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-brand-blue/50 to-transparent shadow-[0_0_30px_rgba(37,99,235,0.5)]" />

        {/* Left widgets — hide on very small screens */}
        <div className="hidden sm:block">
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
            x="-380px" y="160px"
            label="Downtown Anomaly"
            value="Flagged"
            delay={0.4}
          />
          <FloatingWidget
            icon={Package}
            color="text-status-warning"
            bg="bg-status-warning/10"
            x="-200px" y="270px"
            label="North Hills Stock"
            value="Low"
            delay={0.8}
          />
        </div>

        {/* Right — AI Forecast widget */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute right-0 top-1/4 text-left bg-white/8 border border-white/10 p-6 rounded-2xl w-72 md:w-80 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-brand-blue/20 rounded-lg">
              <Zap size={18} className="text-brand-blue-light" />
            </div>
            <span className="font-bold text-white uppercase text-[10px] tracking-widest">AI Forecast Engine</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mb-1.5">
                <span>Revenue Model</span>
                <span className="text-status-success">100%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: "circOut" }}
                  viewport={{ once: true }}
                  className="h-full bg-brand-blue shadow-[0_0_15px_rgba(37,99,235,0.6)] rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mb-1.5">
                <span>Inventory Sync</span>
                <span className="text-status-warning">73%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "73%" }}
                  transition={{ duration: 1.8, ease: "circOut", delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-full bg-status-warning rounded-full"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-300 font-medium pt-1 border-t border-white/10">
              Q3 projections generated across 3 branches.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingWidget({ icon: Icon, x, y, label, value, delay, color, bg }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ opacity: { duration: 0.6, delay }, scale: { duration: 0.4, delay } }}
      style={{
        left: `calc(50% + ${x})`,
        top: y,
        animation: `float ${4 + delay}s ease-in-out ${delay}s infinite`,
      }}
      className="absolute bg-white/8 border border-white/12 p-4 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-4 cursor-default"
    >
      <div className={`p-2.5 rounded-lg ${bg} ${color}`}>
        <Icon size={18} />
      </div>
      <div className="text-left">
        <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">{label}</div>
        <div className="text-sm font-extrabold text-white">{value}</div>
      </div>
    </motion.div>
  );
}