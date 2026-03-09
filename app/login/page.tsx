"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Shield, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "owner"; // Default to owner
  const isManager = role === "manager";

  return (
    <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-24 bg-white relative z-10">
      <div className="max-w-[400px] w-full mx-auto space-y-8">

        {/* Header */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
            <div className="relative w-8 h-8 grid grid-cols-2 gap-[3px] p-1.5 bg-navy-900 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
              <div className="rounded-[2px] bg-white"></div>
              <div className="rounded-[2px] bg-brand-blue shadow-[0_0_6px_rgba(37,99,235,0.7)]"></div>
              <div className="rounded-[2px] bg-brand-blue shadow-[0_0_6px_rgba(37,99,235,0.7)]"></div>
              <div className="rounded-[2px] bg-white"></div>
            </div>
            <span className="font-bold text-xl text-navy-800 tracking-tight">MetaMetric</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-navy-800 tracking-tight mb-2">
            Welcome back.
          </h1>
          <p className="text-slate-500 font-medium">
            Log in to the <span className="text-navy-800 font-bold">{isManager ? "Location Portal" : "Executive Dashboard"}</span>.
          </p>
        </div>

        {/* Role Switcher (Optional UX Helper) */}
        <div className="p-1 bg-navy-50 rounded-lg flex text-sm font-semibold border border-slate-200">
          <Link
            href="/login?role=owner"
            className={`flex-1 py-2 text-center rounded-md transition-all ${!isManager ? "bg-white text-navy-800 shadow-sm" : "text-slate-500 hover:text-navy-800"}`}
          >
            Owner
          </Link>
          <Link
            href="/login?role=manager"
            className={`flex-1 py-2 text-center rounded-md transition-all ${isManager ? "bg-white text-navy-800 shadow-sm" : "text-slate-500 hover:text-navy-800"}`}
          >
            Manager
          </Link>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500" htmlFor="email">
              Work Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-3 bg-navy-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-navy-900 font-medium placeholder:text-slate-400"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500" htmlFor="password">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs font-bold text-brand-blue hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-3 bg-navy-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-navy-900 font-medium placeholder:text-slate-400"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white py-3.5 rounded-xl font-bold hover:bg-brand-blue/90 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.15)] hover:shadow-[0_10px_20px_rgba(37,99,235,0.25)] hover:-translate-y-0.5"
          >
            Secure Login <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 font-medium">
          Don't have an account?{" "}
          <Link href={`/signup?role=${role}`} className="text-brand-blue font-bold hover:underline">
            Start Free Trial
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-brand-blue selection:text-white">

      <Suspense>
        <LoginForm />
      </Suspense>

      {/* Right Side: Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 relative flex-col justify-center p-24 overflow-hidden">
        {/* Background Texture/Glow */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-lg"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-blue-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
            <Shield size={14} /> SOC2 Certified Security
          </div>

          <h2 className="text-4xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            "MetaMetric gave us the visibility we needed to scale from 5 to 50 locations."
          </h2>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-white">JD</div>
            <div>
              <div className="text-white font-bold">James Dupont</div>
              <div className="text-slate-400 text-sm font-medium">COO, Roaster Chains Inc.</div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}