"use client";

import { useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate 
} from "framer-motion";

export default function SmoothCursor() {
  // 1. Motion Values (Raw Mouse Position)
  // We use -100 initially to hide the cursor off-screen until moved
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Physics Configuration (The "Smooth" Feel)
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3. Global Event Listener
  // Using 'window' ensures the cursor works even if you hover over fixed elements (like Navbar)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 4. Dynamic Gradient Template
  // This updates directly on the GPU without triggering React re-renders
  const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(37, 99, 235, 0.10), transparent 40%)`;

  return (
    <motion.div 
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{ background }}
    />
  );
}