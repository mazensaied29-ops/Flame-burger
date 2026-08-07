import React, { useState } from "react";
import { Flame, Star, Award, Users, Play, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOrderNow, onOpenAI }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#050505] pt-8 pb-16 lg:py-24 border-b border-[#1a1a1a]">
      {/* Background Lighting Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c2a47a]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8e7552]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f0f0f] border border-[#1a1a1a] text-xs font-semibold text-[#d1d1d1]"
            >
              <span className="w-2 h-2 rounded-full bg-[#c2a47a] animate-ping" />
              <span className="text-[#c2a47a] tracking-widest uppercase font-mono text-[11px]">FLAME GOURMET</span>
              <span className="text-[#4a4a4a]">•</span>
              <span className="text-[#888888]">Artisanal Charcoal Sear</span>
            </motion.div>

            {/* Massive Display Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-['Bebas_Neue'] text-6xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[0.9] uppercase"
            >
              THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#d1d1d1] to-[#888888]">
                ULTIMATE
              </span>{" "}
              <br />
              <span className="text-[#c2a47a] relative inline-block drop-shadow-[0_0_20px_rgba(194,164,122,0.3)]">
                BURGER
              </span>{" "}
              <br />
              EXPERIENCE
            </motion.h1>

            {/* Subheadline Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base sm:text-lg text-[#888888] max-w-2xl leading-relaxed font-sans"
            >
              Experience handcrafted gourmet burgers prepared daily using <strong className="text-white">100% certified Angus beef</strong>, freshly baked brioche buns, house-made signature sauces, and authentic open flame grilling.
            </motion.p>

            {/* Key Quality Chips */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 text-xs text-[#d1d1d1] pt-1"
            >
              <span className="flex items-center gap-1.5 bg-[#0f0f0f] px-3 py-1.5 rounded border border-[#1a1a1a]">
                <CheckCircle2 className="w-4 h-4 text-[#c2a47a]" /> 100% Angus Beef
              </span>
              <span className="flex items-center gap-1.5 bg-[#0f0f0f] px-3 py-1.5 rounded border border-[#1a1a1a]">
                <CheckCircle2 className="w-4 h-4 text-[#c2a47a]" /> Daily Fresh Brioche
              </span>
              <span className="flex items-center gap-1.5 bg-[#0f0f0f] px-3 py-1.5 rounded border border-[#1a1a1a]">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" /> Real Charcoal Flame
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={onOrderNow}
                className="px-8 py-3.5 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreMenu}
                className="px-7 py-3.5 rounded bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#c2a47a] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                Explore Menu
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="p-3.5 rounded bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#c2a47a] text-[#888888] hover:text-white transition flex items-center gap-2 text-xs font-semibold cursor-pointer"
                title="Watch Flame Burger Story"
              >
                <div className="w-5 h-5 rounded-full bg-[#c2a47a]/20 text-[#c2a47a] flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span className="hidden sm:inline">Watch Story</span>
              </button>
            </motion.div>

            {/* Live Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-8 border-t border-[#1a1a1a] grid grid-cols-3 gap-6 max-w-lg"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#c2a47a]" />
                  <span className="font-['Bebas_Neue'] text-3xl text-white tracking-wider font-mono">10K+</span>
                </div>
                <p className="text-xs text-[#666666] mt-0.5 uppercase tracking-wider text-[11px]">Happy Customers</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#c2a47a] fill-current" />
                  <span className="font-['Bebas_Neue'] text-3xl text-white tracking-wider font-mono">4.9★</span>
                </div>
                <p className="text-xs text-[#666666] mt-0.5 uppercase tracking-wider text-[11px]">Customer Rating</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#c2a47a]" />
                  <span className="font-['Bebas_Neue'] text-3xl text-white tracking-wider font-mono">15+</span>
                </div>
                <p className="text-xs text-[#666666] mt-0.5 uppercase tracking-wider text-[11px]">Awards Won</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Ultra Realistic Generated Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c2a47a] via-[#8e7552] to-[#c2a47a] rounded-xl blur-sm opacity-25 group-hover:opacity-50 transition duration-500" />

              {/* Main Image Container */}
              <div className="relative rounded-lg overflow-hidden border border-[#1a1a1a] bg-[#0f0f0f] shadow-2xl">
                <img
                  src="/src/assets/images/hero_burger_banner_1786047905126.jpg"
                  alt="The Ultimate Flame Burger"
                  className="w-full h-[460px] sm:h-[520px] object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 right-4 bg-[#050505]/90 backdrop-blur-md border border-[#1a1a1a] px-3.5 py-2 rounded flex items-center gap-2 shadow-xl">
                  <Flame className="w-4 h-4 text-[#c2a47a]" />
                  <div>
                    <span className="text-[10px] text-[#666666] uppercase font-mono block leading-none">SEARING TEMP</span>
                    <span className="text-xs font-mono font-bold text-white leading-none">600°F Charcoal Flame</span>
                  </div>
                </div>

                {/* Floating Bottom Card: Chef Recommendation */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0f0f0f]/95 backdrop-blur-md border border-[#1a1a1a] p-4 rounded flex items-center justify-between shadow-2xl">
                  <div>
                    <div className="flex items-center gap-1 text-[#c2a47a] text-xs font-bold mb-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="uppercase tracking-wider font-mono text-[10px]">Flagship Creation</span>
                    </div>
                    <h4 className="text-white font-semibold text-sm">The Ultimate Flame Burger</h4>
                    <p className="text-[#888888] text-xs">Double Angus • Cheddar • Smoked Bacon</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#666666] line-through block font-mono">$16.99</span>
                    <span className="font-['Bebas_Neue'] text-2xl text-[#c2a47a] leading-none">$13.99</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Story Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg max-w-3xl w-full p-6 relative">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-[#888888] hover:text-white text-lg font-bold"
            >
              ✕
            </button>
            <h3 className="font-['Bebas_Neue'] text-3xl text-white mb-1">The Flame Burger Heritage</h3>
            <p className="text-xs text-[#888888] mb-4">Watch how we flame grill 100% certified Angus beef every single day.</p>
            <div className="relative aspect-video rounded overflow-hidden bg-[#050505] flex items-center justify-center border border-[#1a1a1a]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                alt="Flame Grilling Kitchen"
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute flex flex-col items-center gap-2 text-center p-6 bg-[#050505]/80 rounded border border-[#1a1a1a]">
                <Flame className="w-10 h-10 text-[#c2a47a]" />
                <span className="text-white font-semibold text-base">Fire Up Your Taste</span>
                <span className="text-xs text-[#888888]">Flame-grilled over oakwood at 600°F</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
