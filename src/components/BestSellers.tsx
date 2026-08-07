import React from "react";
import { Product } from "../types";
import { Star, Flame, Plus, Eye, Flame as SpicyIcon } from "lucide-react";
import { motion } from "motion/react";

interface BestSellersProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 bg-[#050505] border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <span className="text-[#c2a47a] text-xs font-bold font-mono uppercase tracking-widest block mb-1">
              BEST SELLERS
            </span>
            <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wide">
              OUR MOST POPULAR CREATIONS
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="bg-[#0f0f0f] border border-[#1a1a1a] text-[#d1d1d1] text-xs px-3 py-1.5 rounded font-mono">
              ★ 4.9 Average Customer Score
            </span>
          </div>
        </motion.div>

        {/* Best Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#c2a47a] rounded overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative">
                {/* Image */}
                <div className="h-56 w-full overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-[#c2a47a] text-[#050505] text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow">
                    BEST SELLER
                  </span>
                  {item.spicyLevel > 0 && (
                    <span className="bg-[#050505]/90 backdrop-blur-md text-[#E63946] border border-[#E63946]/40 text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                      <SpicyIcon className="w-3 h-3 fill-current" /> Spicy
                    </span>
                  )}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-[#050505]/90 backdrop-blur-md border border-[#1a1a1a] text-white text-xs px-2.5 py-1 rounded flex items-center gap-1 font-mono font-bold">
                  <Star className="w-3.5 h-3.5 text-[#c2a47a] fill-current" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#888888] mb-1 font-mono">
                    <span className="uppercase tracking-wider font-semibold text-[#c2a47a]">
                      {item.categoryName}
                    </span>
                    <span>{item.calories} kcal</span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(item)}
                    className="font-['Bebas_Neue'] text-2xl text-white tracking-wide hover:text-[#c2a47a] transition cursor-pointer mb-2 leading-tight"
                  >
                    {item.name}
                  </h3>

                  <p className="text-[#888888] text-xs line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Price & Actions */}
                <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-between">
                  <div>
                    {item.oldPrice && (
                      <span className="text-xs text-[#666666] line-through mr-1.5 font-mono">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="font-['Bebas_Neue'] text-2xl text-white font-mono">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(item)}
                      className="p-2 rounded bg-[#050505] border border-[#1a1a1a] hover:border-[#c2a47a] text-[#888888] hover:text-white transition cursor-pointer"
                      title="Quick View & Customize"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-3 py-1.5 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer hover:brightness-110"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
