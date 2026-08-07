import React from "react";
import { Flame, ShieldCheck, Clock, Award, Sparkles, ChefHat } from "lucide-react";
import { motion } from "motion/react";

export const WhyUs: React.FC = () => {
  const features = [
    {
      icon: <Flame className="w-8 h-8 text-[#E63946]" />,
      title: "600°F Charcoal Flame",
      desc: "Every patty is seared over open oakwood charcoal at 600°F for authentic flame crust & intense smoky aroma.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />,
      title: "100% Certified Angus",
      desc: "Only premium grain-fed Angus beef ground fresh daily. Never frozen, zero additives, pure meat excellence.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#E63946]" />,
      title: "Fresh Baked Brioche",
      desc: "Pillowy buttery brioche buns baked in-house twice daily to ensure melt-in-your-mouth perfection.",
    },
    {
      icon: <Award className="w-8 h-8 text-[#D4AF37]" />,
      title: "Secret House Sauces",
      desc: "Our master sauces are slow-cooked in small batches using imported spices & secret family recipes.",
    },
    {
      icon: <ChefHat className="w-8 h-8 text-[#E63946]" />,
      title: "Award-Winning Chefs",
      desc: "Crafted by Michelin-trained culinary directors obsessed with temperature precision and flavor balance.",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#D4AF37]" />,
      title: "30-Min Fast Delivery",
      desc: "Delivered in custom thermal-vented boxes ensuring your burger arrives sizzling hot and fries ultra crispy.",
    },
  ];

  return (
    <section className="py-20 bg-[#050505] border-b border-[#1a1a1a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#c2a47a] text-xs font-bold font-mono uppercase tracking-widest block mb-2">
            PASSION FOR PERFECTION
          </span>
          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-6xl text-white tracking-wide">
            WHY FLAME BURGER TASTES BETTER
          </h2>
          <p className="text-[#888888] text-sm mt-3 leading-relaxed">
            We don't do fast food shortcuts. We combine artisanal culinary standards with high-heat flame grilling to redefine the burger experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#c2a47a] p-8 rounded transition-all duration-300 hover:-translate-y-1 group shadow-lg"
            >
              <div className="w-12 h-12 rounded bg-[#050505] border border-[#1a1a1a] group-hover:border-[#c2a47a] flex items-center justify-center mb-6 transition">
                {item.icon}
              </div>
              <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide group-hover:text-[#c2a47a] transition mb-2">
                {item.title}
              </h3>
              <p className="text-[#888888] text-xs leading-relaxed font-sans">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
