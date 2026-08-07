import React, { useState } from "react";
import { X, Tag, Ticket, Copy, Check, Sparkles, UserPlus, ShieldCheck, Percent, ArrowRight, AlertCircle } from "lucide-react";
import { COUPONS, Coupon, validateCoupon } from "../data/couponsData";

interface CouponsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUserRegistered: boolean;
  onOpenRegister: () => void;
  onApplyCouponCode: (code: string) => void;
  currentSubtotal?: number;
}

export const CouponsModal: React.FC<CouponsModalProps> = ({
  isOpen,
  onClose,
  isUserRegistered,
  onOpenRegister,
  onApplyCouponCode,
  currentSubtotal = 0,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApply = (code: string) => {
    setModalError(null);
    const res = validateCoupon(code, currentSubtotal, isUserRegistered);
    if (!res.isValid) {
      setModalError(res.message);
    } else {
      onApplyCouponCode(code);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded max-w-2xl w-full overflow-hidden shadow-2xl relative my-8 p-6 space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888888] hover:text-white p-1 cursor-pointer transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#1a1a1a] pb-4">
          <div className="w-12 h-12 rounded bg-[#c2a47a]/15 border border-[#c2a47a]/40 flex items-center justify-center text-[#c2a47a]">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#c2a47a] text-[10px] font-mono font-bold uppercase tracking-widest bg-[#c2a47a]/10 px-2 py-0.5 rounded border border-[#c2a47a]/30">
                EXCLUSIVE SAVINGS
              </span>
              {isUserRegistered && (
                <span className="text-[#10b981] text-[10px] font-mono font-bold uppercase tracking-widest bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Member Unlocked
                </span>
              )}
            </div>
            <h2 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide leading-tight mt-1">
              FLAME BURGER COUPON CODES
            </h2>
            <p className="text-xs text-[#888888] font-mono">
              Register an account on the website to activate discounts across the entire menu!
            </p>
          </div>
        </div>

        {/* Registration Prompt Banner if not registered */}
        {!isUserRegistered && (
          <div className="bg-gradient-to-r from-[#1a1309] to-[#0f0d08] border border-[#c2a47a]/60 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#d1d1d1] font-mono shadow-md">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#c2a47a] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-sans text-sm font-bold">
                  🎁 Email Registration Required for Coupons!
                </strong>
                <span className="text-[#a0a0a0] text-xs">
                  Create your free account to activate codes like WELCOME5 (5% off $15+), REGISTER10 (10% off $20+), FLAME25 (25% off $100+), or FEAST250 (50% off $250+)!
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="px-4 py-2 rounded bg-[#c2a47a] text-[#050505] font-bold text-xs font-sans tracking-wide hover:brightness-110 transition shrink-0 flex items-center gap-1.5 cursor-pointer shadow"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Account</span>
            </button>
          </div>
        )}

        {/* Modal Error Message */}
        {modalError && (
          <div className="p-3 bg-[#e63946]/10 border border-[#e63946]/40 text-[#e63946] text-xs rounded-lg flex items-start gap-2 leading-relaxed font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#e63946]" />
            <div className="flex-1">
              <strong className="block font-bold">COUPON CANNOT BE ACTIVATED:</strong>
              <span>{modalError}</span>
            </div>
          </div>
        )}

        {/* Coupons List */}
        <div className="space-y-3 max-h-[48vh] overflow-y-auto pr-1">
          {COUPONS.map((coupon) => {
            const isUnlocked = isUserRegistered;
            const meetsMinAmount = currentSubtotal >= coupon.minOrderAmount;

            return (
              <div
                key={coupon.code}
                className={`p-4 rounded border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  coupon.isPopular
                    ? "bg-[#110e08] border-[#c2a47a]/50 hover:border-[#c2a47a]"
                    : "bg-[#050505] border-[#1a1a1a] hover:border-[#333333]"
                }`}
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-base font-extrabold text-white tracking-widest bg-[#151515] px-2.5 py-0.5 rounded border border-[#2a2a2a] flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-[#c2a47a]" />
                      {coupon.code}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#c2a47a] bg-[#c2a47a]/15 px-2 py-0.5 rounded border border-[#c2a47a]/30">
                      {coupon.badge}
                    </span>
                    {coupon.isPopular && (
                      <span className="text-[10px] font-mono text-[#e63946] bg-[#e63946]/15 px-2 py-0.5 rounded border border-[#e63946]/30 font-bold">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#d1d1d1] font-sans pt-1">{coupon.description}</p>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#888888]">
                    <span>
                      Required Price: <strong className={meetsMinAmount ? "text-[#10b981]" : "text-[#c2a47a]"}>${coupon.minOrderAmount}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      {isUserRegistered ? (
                        <span className="text-[#10b981]">✓ Account Registered</span>
                      ) : (
                        <span className="text-[#e63946]">🔒 Registration Required</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="p-2 rounded bg-[#111111] border border-[#222222] text-[#888888] hover:text-white transition cursor-pointer flex items-center gap-1 text-xs font-mono"
                    title="Copy Code"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10b981]" />
                        <span className="text-[#10b981]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleApply(coupon.code)}
                    className={`px-3 py-2 rounded transition font-mono font-bold text-xs flex items-center gap-1 cursor-pointer ${
                      meetsMinAmount && isUnlocked
                        ? "bg-[#c2a47a] text-[#050505] hover:brightness-110 shadow"
                        : "bg-[#c2a47a]/15 border border-[#c2a47a]/40 text-[#c2a47a] hover:bg-[#c2a47a]/30"
                    }`}
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-[#050505] border border-[#1a1a1a] rounded text-[11px] text-[#888888] font-mono text-center">
          💡 <strong>Strict Policy:</strong> Coupon codes require a registered account and only work when the cart subtotal meets the exact required price threshold.
        </div>
      </div>
    </div>
  );
};
