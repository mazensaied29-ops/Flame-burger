import React, { useState, useMemo } from "react";
import { Product, CategoryId } from "../types";
import { Search, SlidersHorizontal, Flame, Star, Plus, Eye, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MenuSectionProps {
  products: Product[];
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpicy, setFilterSpicy] = useState<boolean>(false);
  const [filterVeg, setFilterVeg] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");

  const categories = [
    { id: "all" as CategoryId, label: "All Items" },
    { id: "premium-burgers" as CategoryId, label: "Prime Burger" },
    { id: "smash-burgers" as CategoryId, label: "Smash Burger" },
    { id: "chicken-burgers" as CategoryId, label: "Chicken" },
    { id: "hot-dogs" as CategoryId, label: "Hot Dog" },
    { id: "milkshakes" as CategoryId, label: "Milkshake" },
    { id: "combos" as CategoryId, label: "Family Combo" },
    { id: "sides" as CategoryId, label: "Sides & Fries" },
    { id: "drinks" as CategoryId, label: "Drinks" },
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== "all") {
          if (selectedCategory === "best-sellers") {
            if (!p.isBestSeller) return false;
          } else if (p.category !== selectedCategory) {
            return false;
          }
        }
        // Search Filter
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Spicy Filter
        if (filterSpicy && p.spicyLevel === 0) return false;
        // Vegetarian Filter
        if (filterVeg && !p.isVegetarian) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // Default featured
      });
  }, [products, selectedCategory, searchQuery, filterSpicy, filterVeg, sortBy]);

  return (
    <section id="full-menu" className="py-16 bg-[#050505] border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-[#c2a47a] text-xs font-bold font-mono uppercase tracking-widest block mb-1">
            EXPLORE OUR MENU
          </span>
          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-6xl text-white tracking-wide">
            CRAFTED TO SATISFY EVERY CRAVING
          </h2>
        </motion.div>

        {/* Search & Quick Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0f0f0f] border border-[#1a1a1a] p-4 rounded mb-8 flex flex-col lg:flex-row items-center justify-between gap-4"
        >
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search burgers, sides, milkshakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-10 pr-4 py-3 rounded focus:outline-none transition font-sans"
            />
          </div>

          {/* Toggle Switches & Sort */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            <button
              onClick={() => setFilterSpicy(!filterSpicy)}
              className={`px-3 py-2 rounded border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer font-mono ${
                filterSpicy
                  ? "bg-[#c2a47a]/20 border-[#c2a47a] text-[#c2a47a]"
                  : "bg-[#050505] border-[#1a1a1a] text-[#888888] hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Spicy Only</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#050505] border border-[#1a1a1a] text-[#d1d1d1] text-xs px-3 py-2 rounded focus:outline-none cursor-pointer font-mono"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap transition duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] shadow"
                  : "bg-[#0f0f0f] border border-[#1a1a1a] text-[#888888] hover:text-white hover:border-[#c2a47a]/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#0f0f0f] rounded border border-[#1a1a1a]">
            <p className="text-[#888888] text-sm font-medium">No menu items match your search or filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterSpicy(false);
                setFilterVeg(false);
                onSelectCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] text-xs font-bold rounded uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  key={item.id}
                  className="group bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#c2a47a] rounded overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative h-48 w-full overflow-hidden bg-black/40">
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
                      <div className="absolute top-2.5 right-2.5 bg-[#050505]/90 backdrop-blur-md border border-[#1a1a1a] text-white text-xs px-2 py-0.5 rounded flex items-center gap-1 font-mono font-bold">
                        <Star className="w-3 h-3 text-[#c2a47a] fill-current" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between text-[11px] text-[#888888] mb-1 font-mono">
                        <span className="uppercase font-bold text-[#c2a47a] tracking-wider">
                          {item.categoryName}
                        </span>
                        <span>{item.calories} kcal</span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(item)}
                        className="font-['Bebas_Neue'] text-2xl text-white tracking-wide hover:text-[#c2a47a] transition cursor-pointer mb-1 leading-tight"
                      >
                        {item.name}
                      </h3>

                      <p className="text-[#888888] text-xs line-clamp-2 leading-relaxed mb-3 font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 pt-0 border-t border-[#1a1a1a] flex items-center justify-between mt-auto">
                    <div>
                      {item.oldPrice && (
                        <span className="text-xs text-[#666666] line-through mr-1 font-mono">
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
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-3 py-1.5 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-bold text-xs uppercase tracking-wider transition flex items-center gap-1 cursor-pointer hover:brightness-110"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
