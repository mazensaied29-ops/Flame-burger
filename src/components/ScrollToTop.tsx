import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (totalScroll > 0) {
        const progress = (currentScroll / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG Circle Calculations
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md border border-[#c2a47a]/40 text-[#c2a47a] hover:text-white hover:bg-[#141414] hover:border-[#c2a47a] shadow-2xl transition-all duration-300 group cursor-pointer flex items-center justify-center"
          title="Back to Top"
          aria-label="Scroll back to top"
        >
          {/* Circular Scroll Progress SVG */}
          <svg className="w-12 h-12 absolute -inset-0.5 transform -rotate-90 pointer-events-none" viewBox="0 0 52 52">
            <circle
              cx="26"
              cy="26"
              r={radius}
              className="text-[#1a1a1a]"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="26"
              cy="26"
              r={radius}
              className="text-[#c2a47a] transition-all duration-150"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Arrow Icon */}
          <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-1 transition duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
