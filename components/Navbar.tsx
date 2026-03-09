"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  // Scroll-aware shadow/blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const spawnParticles = (rect: DOMRect) => {
    if (!particleContainerRef.current) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("span");
      particle.classList.add("particle");
      const angle = Math.random() * Math.PI * 2;
      const velocity = 20 + Math.random() * 40;
      const size = 4 + Math.random() * 4;
      const duration = 400 + Math.random() * 200;
      const colorVar = Math.floor(Math.random() * 4) + 1;
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.setProperty("--end-x", `${Math.cos(angle) * velocity}px`);
      particle.style.setProperty("--end-y", `${Math.sin(angle) * velocity}px`);
      particle.style.setProperty("--time", `${duration}ms`);
      particle.style.setProperty("--color", `var(--color-${colorVar})`);
      const inner = document.createElement("span");
      particle.appendChild(inner);
      particleContainerRef.current.appendChild(particle);
      setTimeout(() => particle.remove(), duration);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    if (!pillRef.current || !navRef.current) return;
    const target = e.currentTarget;
    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = target.getBoundingClientRect();
    pillRef.current.style.width = `${itemRect.width}px`;
    pillRef.current.style.height = `${itemRect.height}px`;
    pillRef.current.style.transform = `translate(${itemRect.left - navRect.left}px, ${itemRect.top - navRect.top}px)`;
    pillRef.current.classList.add("active");
  };

  const handleMouseLeave = () => {
    if (!pillRef.current) return;
    if (activeIndex === null) {
      pillRef.current.classList.remove("active");
    } else if (navRef.current) {
      const activeItem = navRef.current.children[activeIndex] as HTMLElement;
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      pillRef.current.style.width = `${itemRect.width}px`;
      pillRef.current.style.height = `${itemRect.height}px`;
      pillRef.current.style.transform = `translate(${itemRect.left - navRect.left}px, ${itemRect.top - navRect.top}px)`;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    setActiveIndex(index);
    const rect = e.currentTarget.getBoundingClientRect();
    spawnParticles(rect);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            : "bg-white/80 backdrop-blur-md border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 h-16 flex justify-between items-center gap-4">

          {/* ---- Logo ---- */}
          <Link href="/" className="flex items-center gap-2.5 z-20 group shrink-0">
            {/* Grid-of-4-dots logo matching sidebar */}
            <div className="relative w-8 h-8 grid grid-cols-2 gap-[3px] p-1.5 bg-navy-900 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
              <div className="rounded-[2px] bg-white"></div>
              <div className="rounded-[2px] bg-brand-blue shadow-[0_0_6px_rgba(37,99,235,0.7)]"></div>
              <div className="rounded-[2px] bg-brand-blue shadow-[0_0_6px_rgba(37,99,235,0.7)]"></div>
              <div className="rounded-[2px] bg-white"></div>
            </div>
            <span className="font-extrabold text-lg text-navy-900 tracking-tight leading-none">
              Meta<span className="text-brand-blue">Metric</span>
            </span>
          </Link>

          {/* ---- Desktop Gooey Nav ---- */}
          <div className="hidden md:block relative gooey-nav-container">
            <nav>
              <ul ref={navRef} onMouseLeave={handleMouseLeave}>
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={activeIndex === index ? "active" : ""}
                    onMouseEnter={(e) => handleMouseEnter(e, index)}
                    onClick={(e) => handleClick(e, index)}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <span ref={pillRef} className="effect" />
              </ul>
            </nav>
            <div ref={particleContainerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden" />
          </div>

          {/* ---- Desktop Auth Actions ---- */}
          <div className="hidden md:flex items-center gap-4 z-20">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-500 hover:text-navy-900 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup?role=owner"
              className="relative inline-flex text-sm font-bold bg-brand-blue text-white px-5 py-2.5 rounded-xl hover:bg-brand-blue-dark transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-[0_6px_16px_rgba(37,99,235,0.35)]"
            >
              Start Free Trial
            </Link>
          </div>

          {/* ---- Mobile Hamburger ---- */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden z-20 p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ---- Mobile Slide-in Drawer ---- */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl flex flex-col ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <div className="w-7 h-7 grid grid-cols-2 gap-[2px] p-1 bg-navy-900 rounded-md">
              <div className="rounded-[2px] bg-white"></div>
              <div className="rounded-[2px] bg-brand-blue"></div>
              <div className="rounded-[2px] bg-brand-blue"></div>
              <div className="rounded-[2px] bg-white"></div>
            </div>
            <span className="font-extrabold text-base text-navy-900">
              Meta<span className="text-brand-blue">Metric</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-4 py-3 rounded-xl text-slate-700 font-semibold text-[15px] hover:bg-blue-50 hover:text-brand-blue transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer Auth */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup?role=owner"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors shadow-sm"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </>
  );
}
