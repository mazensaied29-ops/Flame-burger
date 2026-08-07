import React, { useState } from "react";
import { X, User, Mail, Phone, MapPin, Award, LogOut, Check, Save, Ticket, Tag } from "lucide-react";

export interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfileData;
  onUpdateUser: (updated: UserProfileData) => void;
  onLogout: () => void;
  onOpenCoupons?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onLogout,
  onOpenCoupons,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email.toLowerCase());
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded max-w-md w-full overflow-hidden shadow-2xl relative my-8 p-6 space-y-5">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888888] hover:text-white p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#1a1a1a] pb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c2a47a] to-[#8e7552] flex items-center justify-center text-[#050505] font-bold text-xl font-mono">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="text-[#c2a47a] text-[10px] font-mono font-bold uppercase tracking-widest block">
              FLAME VIP MEMBER
            </span>
            <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide leading-tight">
              {user.name}
            </h2>
            <p className="text-xs text-[#888888] font-mono">{user.email.toLowerCase()}</p>
          </div>
        </div>

        {/* Status Badge & Unlocked Member Coupons */}
        <div className="space-y-2">
          <div className="bg-[#050505] border border-[#1a1a1a] p-3 rounded flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#c2a47a]">
              <Award className="w-4 h-4" />
              <span className="font-bold">Gold Tier Rewards</span>
            </div>
            <span className="text-white bg-[#111111] px-2 py-0.5 rounded border border-[#1f1f1f]">
              450 Flame Points
            </span>
          </div>

          {onOpenCoupons && (
            <button
              onClick={() => {
                onClose();
                onOpenCoupons();
              }}
              className="w-full bg-[#110e08] border border-[#c2a47a]/50 hover:border-[#c2a47a] p-3 rounded flex items-center justify-between text-xs font-mono text-[#c2a47a] cursor-pointer transition"
            >
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                <span className="font-bold">My Unlocked Member Coupons</span>
              </div>
              <span className="bg-[#c2a47a] text-[#050505] px-2 py-0.5 rounded text-[10px] font-bold">
                View All
              </span>
            </button>
          )}
        </div>

        {/* Form to Edit Details */}
        <form onSubmit={handleSave} className="space-y-3.5">
          <div>
            <label className="text-[11px] font-mono text-[#888888] block mb-1">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#888888] block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none font-sans lowercase"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#888888] block mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#888888] block mb-1">Delivery Address (Nasr City / Cairo)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none font-sans"
              />
            </div>
          </div>

          {isSaved && (
            <div className="bg-[#10b981]/10 border border-[#10b981]/40 text-[#10b981] p-2.5 rounded text-xs flex items-center gap-2 font-mono">
              <Check className="w-4 h-4" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="py-2.5 px-4 rounded bg-[#1a0f0f] border border-[#e63946]/40 text-[#e63946] font-bold text-xs uppercase tracking-wider hover:bg-[#e63946] hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
