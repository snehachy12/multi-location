"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Building2, User, Mail, Lock, CheckCircle2 } from "lucide-react";

function SignupForm() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "owner";

  return (
    <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-24 bg-white relative z-10">
      <div className="max-w-[480px] w-full mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-brand-blue/90 transition-colors">M</div>
            <span className="font-bold text-xl text-navy-800 tracking-tight">MetaMetric</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-navy-800 tracking-tight mb-2">
            Start your free trial.
          </h1>
          <p className="text-slate-500 font-medium">
            Join 5,000+ teams managing multi-location operations.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
               <label className="text-xs font-bold uppercase tracking-widest text-slate-500">First Name</label>
               <input type="text" className="w-full px-4 py-3 bg-navy-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all text-navy-900 font-medium" placeholder="Jane" />
            </div>
            <div className="space-y-1.5">
               <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Last Name</label>
               <input type="text" className="w-full px-4 py-3 bg-navy-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all text-navy-900 font-medium" placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 text-slate-400" size={18} />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-navy-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all text-navy-900 font-medium placeholder:text-slate-400" placeholder="Acme Inc." />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input type="email" className="w-full pl-10 pr-4 py-3 bg-navy-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all text-navy-900 font-medium placeholder:text-slate-400" placeholder="name@company.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input type="password" className="w-full pl-10 pr-4 py-3 bg-navy-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none transition-all text-navy-900 font-medium placeholder:text-slate-400" placeholder="••••••••" />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white py-3.5 rounded-xl font-bold hover:bg-brand-blue/90 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.15)] hover:shadow-[0_10px_20px_rgba(37,99,235,0.25)] hover:-translate-y-0.5"
            >
              Create Account <ArrowRight size={18} />
            </button>
            <p className="text-xs text-slate-400 mt-4 text-center">
              By joining, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
            </p>
          </div>
        </form>

        <p className="text-center text-sm text-slate-500 font-medium border-t border-slate-100 pt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-blue font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-brand-blue selection:text-white">
      
      <Suspense>
        <SignupForm />
      </Suspense>

      {/* Right Side: Features Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 relative flex-col justify-center p-24 overflow-hidden">
        {/* Background Texture/Glow */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-lg"
        >
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-8 tracking-tight">
            Executive intelligence for your branches.
          </h2>

          <div className="space-y-6">
            <FeatureItem text="Anomaly detection flagging 15%+ deviations." />
            <FeatureItem text="Automated inventory redistribution logic." />
            <FeatureItem text="Secure role-based access for managers." />
            <FeatureItem text="99.99% Uptime SLA for critical operations." />
          </div>
        </motion.div>
      </div>

    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 text-slate-300 font-medium text-lg">
      <div className="p-1 bg-brand-blue/20 rounded-full">
        <CheckCircle2 className="text-brand-blue" size={20} />
      </div>
      <span>{text}</span>
    </div>
  );
}