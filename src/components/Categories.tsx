import React from "react";
import { CategoryId } from "../types";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface CategoriesProps {
  onSelectCategory: (categoryId: CategoryId) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const categoriesList = [
    {
      id: "premium-burgers" as CategoryId,
      name: "Prime Burger",
      count: "5 Items",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      badge: "Signature",
    },
    {
      id: "smash-burgers" as CategoryId,
      name: "Smash Burger",
      count: "6 Items",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
      badge: "Crispy Edges",
    },
    {
      id: "chicken-burgers" as CategoryId,
      name: "Chicken",
      count: "5 Items",
      image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
      badge: "Buttermilk",
    },
    {
      id: "hot-dogs" as CategoryId,
      name: "Hot Dog",
      count: "3 Items",
      image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80",
      badge: "Texas Style",
    },
    {
      id: "milkshakes" as CategoryId,
      name: "Milkshake",
      count: "4 Items",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      badge: "Creamy",
    },
    {
      id: "combos" as CategoryId,
      name: "Family Combo",
      count: "4 Items",
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",
      badge: "Best Value",
    },
  ];

  return (
    <section className="py-16 bg-[#050505] border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10"
        >
          <div>
            <span className="text-[#c2a47a] text-xs font-bold font-mono uppercase tracking-widest block mb-1">
              OUR TOP CATEGORIES
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wide">
              SOMETHING FOR EVERYONE
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory("all")}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#c2a47a] hover:text-white uppercase tracking-wider transition cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categoriesList.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#c2a47a] rounded overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="relative h-36 w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent" />
                <span className="absolute top-2 left-2 bg-[#050505]/90 backdrop-blur-md border border-[#1a1a1a] text-[#c2a47a] text-[10px] font-mono px-2 py-0.5 rounded">
                  {cat.badge}
                </span>
              </div>
              <div className="p-3 text-center">
                <h3 className="font-['Bebas_Neue'] text-xl text-white tracking-wide group-hover:text-[#c2a47a] transition leading-tight">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-[#666666] font-mono block">
                  {cat.count}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
