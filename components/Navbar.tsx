"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import "./GooeyNav.css"; // Ensure you created this file

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  // --- Gooey Logic ---
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  // Helper: Create particles on click
  const spawnParticles = (rect: DOMRect) => {
    if (!particleContainerRef.current) return;
    
    // Center of the clicked item relative to the nav container
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create 12 particles
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("span");
      particle.classList.add("particle");
      
      // Random mechanics
      const angle = Math.random() * Math.PI * 2;
      const velocity = 20 + Math.random() * 40; // Distance traveled
      const size = 4 + Math.random() * 4;
      const duration = 400 + Math.random() * 200;
      const colorVar = Math.floor(Math.random() * 4) + 1; // pick color 1-4
      
      // Set CSS Variables for this specific particle
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.setProperty("--end-x", `${Math.cos(angle) * velocity}px`);
      particle.style.setProperty("--end-y", `${Math.sin(angle) * velocity}px`);
      particle.style.setProperty("--time", `${duration}ms`);
      particle.style.setProperty("--color", `var(--color-${colorVar})`);

      // Add inner span for clean scaling
      const inner = document.createElement("span");
      particle.appendChild(inner);
      
      particleContainerRef.current.appendChild(particle);

      // Cleanup
      setTimeout(() => {
        particle.remove();
      }, duration);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    // Only move the pill, don't trigger click/particles logic yet
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
    // Optional: Hide pill when leaving the UL, or snap back to activeIndex
    if (!pillRef.current) return;
    if (activeIndex === null) {
      pillRef.current.classList.remove("active");
    } else if (navRef.current) {
        // Snap back to active item
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
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-20">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold shadow-sm">M</div>
          <span className="font-bold text-xl text-[#1E293B] tracking-tight">MetaMetric</span>
        </Link>

        {/* GOOEY NAV CONTAINER */}
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
                  <Link href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* The Floating Pill */}
              <span ref={pillRef} className="effect" />
            </ul>
          </nav>
          {/* Particle Layer (Fixed relative to window/body prevents overflow issues) */}
          <div ref={particleContainerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden" />
        </div>

        {/* Auth Actions */}
        <div className="flex items-center space-x-6 z-20">
          <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-[#1E293B] transition-colors">
            Log in
          </Link>
          <Link 
            href="/signup?role=owner" 
            className="hidden sm:inline-flex text-sm font-semibold bg-[#2563EB] text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Start Free Trial
          </Link>
        </div>
        
      </div>
    </nav>
  );
}
