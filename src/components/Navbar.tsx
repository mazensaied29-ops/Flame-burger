import React, { useState } from "react";
import {
  Flame,
  ShoppingBag,
  Sparkles,
  MapPin,
  Calendar,
  LogIn,
  User,
  Menu as MenuIcon,
  X,
  PhoneCall,
  Ticket,
} from "lucide-react";
import { UserProfileData } from "./ProfileModal";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  cartCount: number;
  userProfile: UserProfileData | null;
  onOpenCart: () => void;
  onOpenAI: () => void;
  onOpenLogin: () => void;
  onOpenProfile: () => void;
  onOpenReservation: () => void;
  onOpenCoupons: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  userProfile,
  onOpenCart,
  onOpenAI,
  onOpenLogin,
  onOpenProfile,
  onOpenReservation,
  onOpenCoupons,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Nasr City Flagship");

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "about", label: "Our Story" },
    { id: "locations", label: "Nasr City Location" },
    { id: "deals", label: "Special Deals" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "menu") {
      setTimeout(() => {
        const el = document.getElementById("full-menu");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    } else if (id === "deals") {
      setTimeout(() => {
        const el = document.getElementById("special-deals");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/95 backdrop-blur-md border-b border-[#1a1a1a] transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-[#080808] border-b border-[#1a1a1a] text-[#d1d1d1] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 mx-auto font-mono">
          <span className="bg-[#111111] border border-[#1f1f1f] text-[#c2a47a] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            <PhoneCall className="w-3 h-3 text-[#c2a47a]" /> 01223029669
          </span>
          <span>Order via WhatsApp directly to 01223029669!</span>
        </div>
        <div className="flex items-center gap-3 ml-auto text-[11px] text-[#888888]">
          <button
            onClick={onOpenCoupons}
            className="flex items-center gap-1 px-2 py-0.5 bg-[#c2a47a]/15 border border-[#c2a47a]/40 rounded text-[10px] text-[#c2a47a] font-mono font-bold hover:bg-[#c2a47a] hover:text-[#050505] transition cursor-pointer"
          >
            <Ticket className="w-3 h-3" /> Coupons (Up to 50% OFF)
          </button>

          <span className="hidden md:flex items-center gap-1.5 px-2 py-0.5 bg-[#0f0f0f] border border-[#1a1a1a] rounded text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[#10b981]">WHATSAPP OPEN</span>
          </span>

          {userProfile ? (
            <button
              onClick={onOpenProfile}
              className="hover:text-[#c2a47a] transition flex items-center gap-1.5 cursor-pointer text-[#c2a47a] font-mono font-bold bg-[#0f0f0f] border border-[#1a1a1a] px-2.5 py-0.5 rounded"
            >
              <User className="w-3.5 h-3.5 text-[#c2a47a]" />
              <span>{userProfile.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="hover:text-[#c2a47a] transition flex items-center gap-1 cursor-pointer text-white font-mono font-bold"
            >
              <LogIn className="w-3.5 h-3.5 text-[#c2a47a]" />
              Login / Register
            </button>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 bg-gradient-to-br from-[#c2a47a] to-[#8e7552] rounded-md flex items-center justify-center shadow-lg group-hover:scale-105 transition duration-300">
            <Flame className="w-6 h-6 text-[#050505] fill-current" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-[#050505]" />
          </div>
          <div>
            <span className="font-['Bebas_Neue'] text-3xl tracking-wider text-white block leading-none group-hover:text-[#c2a47a] transition">
              FLAME<span className="text-[#c2a47a]">BURGER</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] text-[#8e7552] uppercase font-semibold block -mt-1 font-mono">
              NASR CITY • CAIRO
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-medium transition duration-200 relative py-1 cursor-pointer ${
                activeTab === link.id
                  ? "text-[#c2a47a] font-semibold"
                  : "text-[#888888] hover:text-white"
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#c2a47a] rounded-full shadow-sm animate-fadeIn" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          {/* Branch Location Dropdown */}
          <div className="hidden xl:flex items-center gap-1.5 bg-[#0f0f0f] border border-[#1a1a1a] px-3 py-1.5 rounded text-xs text-[#888888]">
            <MapPin className="w-3.5 h-3.5 text-[#c2a47a]" />
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-transparent text-[#d1d1d1] font-medium focus:outline-none cursor-pointer"
            >
              <option value="Nasr City Flagship" className="bg-[#0f0f0f]">Nasr City (Abbas El Akkad)</option>
              <option value="Heliopolis Korba" className="bg-[#0f0f0f]">Heliopolis Korba</option>
              <option value="Maadi Road 9" className="bg-[#0f0f0f]">Maadi Road 9</option>
            </select>
          </div>

          {/* Coupons Modal Button */}
          <button
            onClick={onOpenCoupons}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#110e08] border border-[#c2a47a]/50 text-[#c2a47a] text-xs font-mono font-bold hover:bg-[#c2a47a] hover:text-[#050505] transition cursor-pointer shadow"
            title="View Coupons"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Coupons</span>
          </button>

          {/* AI Chef Concierge Trigger */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0f0f0f] border border-[#1a1a1a] text-[#c2a47a] text-xs font-medium hover:border-[#c2a47a]/50 transition cursor-pointer"
            title="Ask Flame AI Chef"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c2a47a]" />
            <span className="hidden sm:inline">AI Concierge</span>
          </button>

          {/* Table Reservation CTA */}
          <button
            onClick={onOpenReservation}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#c2a47a] text-white text-xs font-medium transition cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#c2a47a]" />
            <span>Book Table</span>
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#c2a47a] text-white transition cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#d1d1d1]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#c2a47a] text-[#050505] text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#050505]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Order Now Button */}
          <button
            onClick={() => handleNavClick("menu")}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-semibold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition duration-200 cursor-pointer shadow-sm"
          >
            Order Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded bg-[#0f0f0f] border border-[#1a1a1a] text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080808] border-b border-[#1a1a1a] px-6 py-4 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left py-2 text-base font-medium ${
                activeTab === link.id ? "text-[#c2a47a]" : "text-[#888888]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#1a1a1a] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenCoupons();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded bg-[#110e08] border border-[#c2a47a]/50 text-[#c2a47a] text-sm font-mono font-bold flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" /> View Coupon Codes (Up to 50% OFF)
            </button>
            <button
              onClick={() => {
                onOpenReservation();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded bg-[#0f0f0f] border border-[#1a1a1a] text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#c2a47a]" /> Book Table
            </button>
            <button
              onClick={() => handleNavClick("menu")}
              className="w-full py-2.5 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] text-sm font-semibold text-center uppercase tracking-wider"
            >
              Order Online Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
