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
  ArrowRight
} from "lucide-react";

// --- IMPORTED COMPONENTS ---
import Navbar from "@/components/Navbar";
import Hero from "@/components/Home/Hero";
import SmoothCursor from "@/components/SmoothCursor"; 

// --- Configuration ---
const siteConfig = {
  stats: [
    { label: "Revenue Tracked", prefix: "$", value: 12, suffix: "M+" },
    { label: "Anomaly Detection", prefix: "< ", value: 5, suffix: "s" },
    { label: "System Uptime", prefix: "", value: 99.99, suffix: "%" },
  ],
};

export default function AnimatedEnterprisePage() {
  // --- MODERN LENIS SMOOTH SCROLL ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
      
      {/* --- 1. DITHER NOISE OVERLAY --- */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* --- 2. SMOOTH PHYSICS CURSOR (Decoupled) --- */}
      <SmoothCursor />

      {/* --- 3. MAIN CONTENT --- */}
      <Navbar />
      <Hero />

      {/* --- ANIMATED STATISTICS --- */}
      <section className="py-24 z-10 relative">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-slate-200 pb-24">
          {siteConfig.stats.map((stat, i) => (
            <StatCounter key={i} stat={stat} />
          ))}
        </div>
      </section>

      {/* --- ROLE-BASED BENEFITS --- */}
      <section id="solutions" className="py-12 z-10 relative bg-bg-main scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-navy-800 mb-4 tracking-tight">Built for both sides of the business</h2>
            <p className="text-slate-500 font-medium text-lg">Secure, role-specific portals ensure focus and clarity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-all">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="p-4 bg-blue-50 text-brand-blue rounded-xl"><Building2 size={28} /></div>
                <h3 className="text-2xl font-bold text-navy-800">Business Owners</h3>
              </div>
              <ul className="space-y-5 text-slate-600 font-medium">
                <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-blue shrink-0 mt-0.5" size={20} /> Compare performance across all locations.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-blue shrink-0 mt-0.5" size={20} /> AI-powered revenue forecasting.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-blue shrink-0 mt-0.5" size={20} /> Cross-branch inventory balancing.</li>
              </ul>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-all">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="p-4 bg-slate-100 text-slate-600 rounded-xl"><MapPin size={28} /></div>
                <h3 className="text-2xl font-bold text-navy-800">Location Managers</h3>
              </div>
              <ul className="space-y-5 text-slate-600 font-medium">
                <li className="flex items-start gap-3"><CheckCircle2 className="text-slate-400 shrink-0 mt-0.5" size={20} /> View branch-specific performance securely.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-slate-400 shrink-0 mt-0.5" size={20} /> Monitor local staff coverage.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-slate-400 shrink-0 mt-0.5" size={20} /> Receive immediate operational alerts.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-32 px-6 max-w-6xl mx-auto z-10 relative scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="sticky top-32 h-fit">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-navy-800">Executive <br/>Intelligence.</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Standard POS systems give you raw data. We give you processed intelligence built specifically for managing 3 to 5 locations simultaneously.
            </p>
          </div>
          <div className="space-y-16">
            <Step 
              icon={TrendingUp} color="text-status-warning" bg="bg-status-warning/10"
              title="Predictive AI Anomaly Detection" 
              description="Stop guessing. Our engine automatically calculates 3-month moving averages and instantly flags any revenue anomalies that deviate more than 15%." 
            />
            <Step 
              icon={Eye} color="text-status-critical" bg="bg-status-critical/10"
              title="5-Second Worst-Location Visibility" 
              description="We strictly limit the color red. If you see a red alert on your dashboard, it means a location requires immediate executive attention." 
            />
            <Step 
              icon={Zap} color="text-status-success" bg="bg-status-success/10"
              title="Smart Inventory Redistribution" 
              description="Instead of just warning about low stock, MetaMetric identifies surplus inventory at neighboring branches and suggests immediate redistribution." 
            />
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-24 border-t border-slate-200 bg-white z-10 relative scroll-mt-24">
        <div className="max-w-md mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-navy-800 mb-4">Straightforward Licensing</h2>
          <p className="text-slate-500 font-medium mb-10">One simple tier designed exclusively for multi-location operators.</p>
          
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 text-left transition-all"
          >
            <div className="border-b border-slate-100 pb-8 mb-8 text-center">
              <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Pro Plan</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-6xl font-extrabold text-navy-800">$199</span>
                <span className="text-lg text-slate-500 font-bold">/mo</span>
              </div>
              <div className="text-sm text-slate-500 mt-4 font-medium">Billed annually. Covers up to 5 locations.</div>
            </div>
            <Link href="/signup?plan=pro" className="flex items-center justify-center w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-sm">
              Start 14-Day Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <footer className="relative py-32 bg-navy-800 text-center px-6 overflow-hidden z-10">
        <div className="absolute inset-0 bg-brand-blue/10 mix-blend-overlay"></div>
        <div className="relative max-w-2xl mx-auto z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-10 leading-tight tracking-tight">
            Ready to manage multiple locations without adding more management layers?
          </h2>
          <Link 
            href="/signup?role=owner" 
            className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all hover:-translate-y-1 shadow-2xl"
          >
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </div>
      </footer>
    </div>
  );
}

// --- ANIMATED SUB-COMPONENTS ---

function StatCounter({ stat }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, stat.value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setCount(stat.value % 1 !== 0 ? Number(value.toFixed(2)) : Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, stat.value]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl md:text-6xl font-extrabold mb-4 text-navy-800 group-hover:text-brand-blue transition-colors duration-500">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
    </div>
  );
}

function Step({ icon: Icon, title, description, color, bg }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="p-10 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`inline-flex p-4 rounded-2xl ${bg} ${color} mb-6`}>
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-extrabold mb-4 text-navy-800 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-lg leading-relaxed font-medium">{description}</p>
    </motion.div>
  );
}