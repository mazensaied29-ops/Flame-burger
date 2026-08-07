import React from "react";
import { Tag, Sparkles, Plus, Ticket, ShieldCheck, UserPlus, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Product } from "../types";
import { COUPONS } from "../data/couponsData";

interface DealsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenCoupons?: () => void;
  onOpenRegister?: () => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenCoupons,
  onOpenRegister,
}) => {
  // Deals selection
  const deals = products.filter((p) => p.oldPrice || p.category === "combos" || p.isBestSeller);

  return (
    <section id="special-deals" className="py-16 bg-[#050505] border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-[#c2a47a] text-xs font-mono font-bold uppercase tracking-widest block mb-1">
            SPECIAL DEALS & PROMOTIONS (NASR CITY)
          </span>
          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wide">
            EXCLUSIVE OFFERS & MEMBER COUPON CODES
          </h2>
          <p className="text-[#888888] text-xs mt-2">
            Enjoy handcrafted gourmet burgers, family feast combos, and exclusive discount codes up to 50% OFF!
          </p>
        </motion.div>

        {/* Member Coupon Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-r from-[#110e08] via-[#1a140b] to-[#0a0805] border border-[#c2a47a]/50 rounded-xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c2a47a]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-[#c2a47a]/15 px-3 py-1 rounded-full border border-[#c2a47a]/30 text-[#c2a47a] text-xs font-mono font-bold">
                <Ticket className="w-4 h-4" /> MEMBER REGISTRATION PERKS
              </div>
              <h3 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wide">
                UNLOCK INSTANT COUPON DISCOUNTS UP TO 50% OFF
              </h3>
              <p className="text-xs text-[#aaaaaa] font-mono leading-relaxed">
                Register a free account to activate member coupons: 5% off $15+ (<code className="text-white">WELCOME5</code>), 10% off $20+ (<code className="text-[#c2a47a]">REGISTER10</code>), 25% off $100+ (<code className="text-[#c2a47a]">FLAME25</code>), or 50% off $250+ / $300+ (<code className="text-[#e63946]">FEAST250</code>)!
              </p>
            </div>

            {/* Quick Coupon Codes List Pill */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {COUPONS.slice(0, 4).map((c) => (
                <div key={c.code} className="bg-[#050505]/90 border border-[#2a2a2a] px-3 py-2 rounded text-center font-mono">
                  <span className="text-[#c2a47a] text-xs font-bold block">{c.code}</span>
                  <span className="text-[10px] text-[#888888]">{c.badge}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              {onOpenRegister && (
                <button
                  onClick={onOpenRegister}
                  className="px-4 py-2.5 rounded bg-[#c2a47a] text-[#050505] font-sans font-bold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register Free</span>
                </button>
              )}
              {onOpenCoupons && (
                <button
                  onClick={onOpenCoupons}
                  className="px-4 py-2.5 rounded bg-[#0f0f0f] border border-[#c2a47a]/50 text-[#c2a47a] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#c2a47a] hover:text-[#050505] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Tag className="w-4 h-4" />
                  <span>All Coupons</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((item, index) => {
            const savings = item.oldPrice ? (item.oldPrice - item.price).toFixed(2) : null;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#c2a47a] rounded overflow-hidden flex flex-col justify-between transition duration-300 group shadow-lg"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/30" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {item.oldPrice && (
                      <span className="bg-[#E63946] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow">
                        SAVE ${savings}
                      </span>
                    )}
                    <span className="bg-[#c2a47a] text-[#050505] text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      SPECIAL DEAL
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#c2a47a] uppercase font-bold tracking-wider block mb-1">
                      {item.categoryName}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(item)}
                      className="font-['Bebas_Neue'] text-2xl text-white tracking-wide hover:text-[#c2a47a] transition cursor-pointer leading-tight"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#888888] line-clamp-2 mt-1 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

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

                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-3.5 py-2 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer hover:brightness-110 shadow"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Claim Deal</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
