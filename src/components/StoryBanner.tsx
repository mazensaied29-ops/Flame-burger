import React, { useState } from "react";
import { Flame, Sparkles, Tag, ArrowRight, X, Heart, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";

interface Story {
  id: string;
  title: string;
  badge: string;
  image: string;
  headline: string;
  description: string;
  discountText: string;
  productId?: string;
}

interface StoryBannerProps {
  onSelectProductById: (productId: string) => void;
  onExploreOffers: () => void;
}

export const StoryBanner: React.FC<StoryBannerProps> = ({
  onSelectProductById,
  onExploreOffers,
}) => {
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: "s1",
      title: "Charcoal Craft",
      badge: "THE STORY",
      image: "/src/assets/images/hero_burger_banner_1786047905126.jpg",
      headline: "600°F Oakwood Fire Secret",
      description: "Every patty is hand-formed 100% Angus beef flame-grilled over real charcoal embers at 600°F to lock in rich smoky juices and create an irresistible caramelized crust.",
      discountText: "Try The Ultimate Flame Burger",
      productId: "fb-01",
    },
    {
      id: "s2",
      title: "Smash Craze",
      badge: "50% OFF DEAL",
      image: "/src/assets/images/best_seller_smash_1786047935192.jpg",
      headline: "Buy 1 Get 1 at 50% OFF",
      description: "Order our famous Original Smash Monster with triple smashed razor-thin patties & molten American cheese, and get the 2nd one half price!",
      discountText: "Claim 50% Off Deal",
      productId: "fb-02",
    },
    {
      id: "s3",
      title: "Nasr City Feast",
      badge: "FAMILY COMBO",
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&w=800&q=80",
      headline: "Flame Family Combo Deal $29.99",
      description: "4 Gourmet Burgers + 4 Large Golden Fries + 4 Ice Cold Drinks + 6 Crispy Chicken Nuggets + 2 House Sauces. Perfect for family gathering in Nasr City!",
      discountText: "Order Family Feast $29.99",
      productId: "fb-19",
    },
    {
      id: "s4",
      title: "Free Shake",
      badge: "DAILY PROMO",
      image: "/src/assets/images/chicken_deluxe_1786048083508.jpg",
      headline: "Free Luxury Shake with Crispy Chicken",
      description: "Buy any Crispy Chicken Deluxe or Premium Burger and get a complimentary Luxury Oreo Crunch Shake for a limited time!",
      discountText: "Claim Free Shake Promo",
      productId: "fb-03",
    },
    {
      id: "s5",
      title: "Loaded Fries",
      badge: "HOT SIDE",
      image: "/src/assets/images/loaded_fries_1786048098030.jpg",
      headline: "Cheesy Bacon Loaded Fries",
      description: "Hot crispy fries drenched in liquid cheddar, crispy beef bacon crumbles & sliced jalapeños. The ultimate companion to your burger!",
      discountText: "Add Loaded Fries $6.99",
      productId: "fb-10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#0a0a0a] border-b border-[#1a1a1a] py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c2a47a] animate-ping" />
            <span className="text-[#c2a47a] text-xs font-mono font-bold uppercase tracking-widest">
              BURGER STORIES & DAILY OFFERS
            </span>
          </div>
          <button
            onClick={onExploreOffers}
            className="text-xs font-bold text-[#c2a47a] hover:text-white uppercase tracking-wider flex items-center gap-1 font-mono cursor-pointer"
          >
            <span>View All Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stories Horizontal Avatars / Cards */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onClick={() => setActiveStory(story)}
              className="flex flex-col items-center gap-2 cursor-pointer group shrink-0"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2px] bg-gradient-to-tr from-[#c2a47a] via-[#8e7552] to-[#c2a47a] group-hover:scale-105 transition duration-300 shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#050505] relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
                </div>
              </div>
              <span className="text-xs font-mono text-white group-hover:text-[#c2a47a] transition font-bold text-center">
                {story.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Popup View */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0f0f0f] border border-[#1a1a1a] rounded max-w-lg w-full overflow-hidden shadow-2xl relative"
            >
              {/* Close */}
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/70 border border-[#1a1a1a] text-white flex items-center justify-center hover:bg-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Story Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={activeStory.image}
                  alt={activeStory.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/40" />

                <span className="absolute top-4 left-4 bg-[#c2a47a] text-[#050505] text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  {activeStory.badge}
                </span>
              </div>

              {/* Story Details */}
              <div className="p-6 space-y-4">
                <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide leading-tight">
                  {activeStory.headline}
                </h3>
                <p className="text-xs text-[#d1d1d1] leading-relaxed font-sans">
                  {activeStory.description}
                </p>

                <button
                  onClick={() => {
                    if (activeStory.productId) {
                      onSelectProductById(activeStory.productId);
                    }
                    setActiveStory(null);
                  }}
                  className="w-full py-3 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer shadow"
                >
                  <Tag className="w-4 h-4" />
                  <span>{activeStory.discountText}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
