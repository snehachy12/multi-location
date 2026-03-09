"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, animate, useInView } from "framer-motion";
import Lenis from "lenis";
import {
  Building2,
  MapPin,
  TrendingUp,
  Eye,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Package,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Home/Hero";
import SmoothCursor from "@/components/SmoothCursor";

// Stat hover colors as explicit values (avoids Tailwind purge of dynamic classes)
const STAT_HOVER_COLORS = ['#2563EB', '#D97706', '#16A34A'];

const siteConfig = {
  stats: [
    { label: "Revenue Tracked", prefix: "$", value: 12, suffix: "M+", icon: BarChart3, color: "text-brand-blue", bg: "bg-blue-50", progress: 82 },
    { label: "Anomaly Detection", prefix: "< ", value: 5, suffix: "s", icon: Zap, color: "text-status-warning", bg: "bg-yellow-50", progress: 96 },
    { label: "System Uptime", prefix: "", value: 99.99, suffix: "%", icon: TrendingUp, color: "text-status-success", bg: "bg-green-50", progress: 100 },
  ],
};

const features = [
  {
    icon: TrendingUp,
    color: "text-status-warning",
    bg: "bg-status-warning/10",
    title: "Predictive AI Anomaly Detection",
    description: "Stop guessing. Our engine automatically calculates 3-month moving averages and instantly flags any revenue anomalies that deviate more than 15%.",
    tag: "AI-Powered",
  },
  {
    icon: Eye,
    color: "text-status-critical",
    bg: "bg-status-critical/10",
    title: "5-Second Worst-Location Visibility",
    description: "We strictly limit the color red. If you see a red alert on your dashboard, it means a location requires immediate executive attention.",
    tag: "Real-time",
  },
  {
    icon: Zap,
    color: "text-status-success",
    bg: "bg-status-success/10",
    title: "Smart Inventory Redistribution",
    description: "Instead of just warning about low stock, MetaMetric identifies surplus inventory at neighboring branches and suggests immediate redistribution.",
    tag: "Automated",
  },
];

export default function AnimatedEnterprisePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-bg-main text-navy-800 font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">

      {/* Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <SmoothCursor />
      <Navbar />
      <Hero />

      {/* ================================================================
          STATS SECTION
      ================================================================ */}
      <section className="py-28 z-10 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.stats.map((stat, i) => (
              <StatCounter key={i} stat={stat} index={i} />
            ))}
          </div>
          {/* Soft divider */}
          <div className="mt-20 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
      </section>

      {/* ================================================================
          ROLE-BASED BENEFITS
      ================================================================ */}
      <section id="solutions" className="py-16 z-10 relative bg-bg-main scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-[11px] font-bold uppercase tracking-widest mb-4">Solutions</span>
            <h2 className="text-3xl font-extrabold text-navy-800 mb-3 tracking-tight">
              Built for both sides of the business
            </h2>
            <p className="text-slate-500 font-medium text-base max-w-md mx-auto">
              Secure, role-specific portals ensure focus and clarity for every stakeholder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner Card */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="p-3.5 bg-blue-50 text-brand-blue rounded-xl group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <Building2 size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-navy-800">Business Owners</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Full network visibility</p>
                </div>
              </div>
              <ul className="space-y-4 text-slate-600 font-medium">
                {[
                  "Compare performance across all locations.",
                  "AI-powered revenue forecasting.",
                  "Cross-branch inventory balancing.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="text-brand-blue shrink-0 mt-0.5" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup?role=owner"
                className="mt-8 flex items-center gap-2 text-brand-blue text-sm font-bold group-hover:underline"
              >
                Start as Owner <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Manager Card */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all group"
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="p-3.5 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-slate-700 group-hover:text-white transition-colors">
                  <MapPin size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-navy-800">Location Managers</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Branch-level focus</p>
                </div>
              </div>
              <ul className="space-y-4 text-slate-600 font-medium">
                {[
                  "View branch-specific performance securely.",
                  "Monitor local staff coverage.",
                  "Receive immediate operational alerts.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="text-slate-400 shrink-0 mt-0.5" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/login?role=manager"
                className="mt-8 flex items-center gap-2 text-slate-500 text-sm font-bold hover:text-navy-800 transition-colors"
              >
                Log in as Manager <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FEATURES SECTION — with animated timeline
      ================================================================ */}
      <section id="features" className="py-28 px-6 max-w-5xl mx-auto z-10 relative scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Sticky left */}
          <div className="sticky top-32 h-fit">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-[11px] font-bold uppercase tracking-widest mb-5">Features</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight text-navy-800 leading-tight">
              Executive<br />Intelligence.
            </h2>
            <p className="text-slate-500 text-base font-medium leading-relaxed mb-8">
              Standard POS systems give you raw data. We give you processed intelligence built specifically for managing 3 to 5 locations simultaneously.
            </p>
            <Link
              href="/signup?role=owner"
              className="inline-flex items-center gap-2 bg-navy-800 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors"
            >
              See it live <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right scrolling features with timeline line */}
          <div className="relative space-y-8">
            {/* Vertical line */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-brand-blue/40 via-brand-purple/30 to-transparent" />

            {features.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PRICING SECTION
      ================================================================ */}
      <section id="pricing" className="py-28 border-t border-slate-200 bg-white z-10 relative scroll-mt-24">
        <div className="max-w-lg mx-auto px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/8 text-brand-blue text-[11px] font-bold uppercase tracking-widest mb-5">Pricing</span>
          <h2 className="text-3xl font-extrabold text-navy-800 mb-3">Straightforward Licensing</h2>
          <p className="text-slate-500 font-medium mb-10 text-base">
            One simple tier designed exclusively for multi-location operators.
          </p>

          <motion.div
            whileHover={{ y: -6, boxShadow: "0 24px 48px -12px rgba(37,99,235,0.18)" }}
            className="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-left transition-all overflow-hidden"
          >
            {/* Most Popular ribbon */}
            <div className="absolute top-5 right-5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-blue text-white text-[10px] font-bold uppercase tracking-widest">
                ⭐ Most Popular
              </span>
            </div>

            {/* Price header */}
            <div className="border-b border-slate-100 pb-6 mb-6 text-center">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Pro Plan</div>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-extrabold text-navy-800">$199</span>
                <span className="text-base text-slate-500 font-bold">/mo</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">Billed annually · Covers up to 5 locations</div>
            </div>

            {/* Feature checklist */}
            <ul className="space-y-3 mb-8">
              {[
                { icon: BarChart3, text: "Cross-location analytics dashboard" },
                { icon: Zap, text: "AI anomaly detection (< 5 seconds)" },
                { icon: Package, text: "Smart inventory redistribution" },
                { icon: Building2, text: "Up to 5 branch locations" },
                { icon: Eye, text: "Role-based access (owner + managers)" },
                { icon: TrendingUp, text: "Revenue forecasting & targets" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <div className="p-1 bg-blue-50 rounded-md">
                    <Icon size={14} className="text-brand-blue" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            <Link
              href="/signup?plan=pro"
              className="flex items-center justify-center w-full gap-2 bg-brand-blue text-white py-4 rounded-xl font-bold text-base hover:bg-brand-blue-dark transition-all hover:-translate-y-0.5 shadow-[0_6px_20px_rgba(37,99,235,0.3)]"
            >
              Start 14-Day Free Trial <ArrowRight size={18} />
            </Link>
            <p className="text-center text-[11px] text-slate-400 mt-3 font-medium">No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          FOOTER CTA — Radial glow + particles
      ================================================================ */}
      <FooterCTA />
    </div>
  );
}

// ================================================================
// SUB-COMPONENTS
// ================================================================

function StatCounter({ stat, index }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Icon = stat.icon;

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, stat.value, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate(value) {
          setCount(stat.value % 1 !== 0 ? Number(value.toFixed(2)) : Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
    >
      <div className={`inline-flex p-2.5 ${stat.bg} ${stat.color} rounded-xl mb-5`}>
        <Icon size={20} />
      </div>
      <div
        className="text-4xl md:text-5xl font-extrabold mb-2 text-navy-800 transition-colors duration-500 tabular-nums group-hover:text-[var(--stat-color)]"
        style={{ ['--stat-color' as string]: STAT_HOVER_COLORS[index] }}
      >
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{stat.label}</div>
      {/* Animated progress bar */}
      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${stat.progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 + index * 0.1 }}
          className="h-full bg-gradient-to-r from-brand-blue to-brand-purple rounded-full"
        />
      </div>
    </motion.div>
  );
}

function FeatureCard({ feature, index }: any) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-16 group"
    >
      {/* Timeline dot */}
      <div className={`absolute left-0 top-5 w-12 h-12 flex items-center justify-center rounded-xl ${feature.bg} ${feature.color} shadow-sm group-hover:scale-110 transition-transform`}>
        <Icon size={22} />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
            {feature.tag}
          </span>
        </div>
        <h3 className="text-lg font-extrabold mb-2 text-navy-800 tracking-tight">{feature.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.description}</p>
      </div>
    </motion.div>
  );
}

function FooterCTA() {
  return (
    <footer className="relative py-32 text-center px-6 overflow-hidden z-10 bg-navy-900">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-brand-blue/20 blur-[120px] rounded-full" />
      </div>
      {/* Animated dot particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-blue/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-2xl mx-auto z-10">
        <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-blue-300 text-[11px] font-bold uppercase tracking-widest mb-6">
          Get Started Today
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Ready to manage multiple locations without adding more management layers?
        </h2>
        <p className="text-slate-400 font-medium mb-10 text-base">
          Join hundreds of multi-location operators who use MetaMetric to stay in control.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup?role=owner"
            className="relative inline-flex items-center justify-center gap-2 bg-brand-blue text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-brand-blue-dark transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(37,99,235,0.4)]"
          >
            Start Free Trial <ArrowRight size={18} />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center justify-center gap-2 border border-white/15 text-slate-300 px-10 py-4 rounded-xl font-bold text-base hover:bg-white/5 transition-colors"
          >
            See Features
          </Link>
        </div>
        <p className="text-xs text-slate-500 mt-6 font-medium">No credit card required · 14-day free trial · Cancel anytime</p>
      </div>
    </footer>
  );
}