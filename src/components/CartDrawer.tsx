import React, { useState } from "react";
import { CartItem } from "../types";
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, Tag, Ticket, Sparkles, Check, AlertCircle } from "lucide-react";
import { validateCoupon } from "../data/couponsData";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  isUserRegistered: boolean;
  appliedCouponCode: string;
  onApplyCouponCode: (code: string) => void;
  onRemoveCouponCode: () => void;
  onOpenCouponsModal: () => void;
  onOpenRegisterModal: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isUserRegistered,
  appliedCouponCode,
  onApplyCouponCode,
  onRemoveCouponCode,
  onOpenCouponsModal,
  onOpenRegisterModal,
}) => {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);

  // Validate applied coupon if any
  const couponResult = appliedCouponCode
    ? validateCoupon(appliedCouponCode, subtotal, isUserRegistered)
    : null;

  const discountAmount = couponResult && couponResult.isValid ? couponResult.discountAmount : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + tax;

  const handleApplyInput = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const res = validateCoupon(couponInput.trim(), subtotal, isUserRegistered);
    if (!res.isValid) {
      setCouponError(res.message);
    } else {
      onApplyCouponCode(couponInput.trim().toUpperCase());
      setCouponInput("");
      setCouponError(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#050505] border-l border-[#1a1a1a] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 bg-[#0f0f0f] border-b border-[#1a1a1a] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c2a47a]" />
              <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
                YOUR GOURMET ORDER ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#888888] hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-12 h-12 text-[#333333] mx-auto mb-3" />
                <p className="text-[#888888] text-sm">Your cart is currently empty.</p>
                <p className="text-[#666666] text-xs mt-1">Explore our menu and add your favorite creations!</p>
              </div>
            ) : (
              items.map((item) => {
                const key = item.cartItemId || item.id;
                return (
                  <div
                    key={key}
                    className="bg-[#0f0f0f] border border-[#1a1a1a] rounded p-4 flex gap-4 items-center justify-between"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded object-cover bg-black/40"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-['Bebas_Neue'] text-lg text-white truncate leading-tight">
                        {item.product.name}
                      </h4>
                      {item.customizations?.bread && (
                        <p className="text-[10px] text-[#888888] font-mono">
                          Bun: {item.customizations.bread.name}
                        </p>
                      )}
                      <p className="font-mono text-sm text-[#c2a47a] mt-1 font-bold">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(key)}
                        className="text-[#666666] hover:text-[#E63946] transition p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-[#050505] border border-[#1a1a1a] px-2 py-0.5 rounded">
                        <button
                          onClick={() => onUpdateQuantity(key, -1)}
                          className="text-[#888888] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs text-white font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(key, 1)}
                          className="text-[#888888] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Coupons */}
          {items.length > 0 && (
            <div className="p-6 bg-[#0f0f0f] border-t border-[#1a1a1a] space-y-3 font-mono">
              {/* Coupon Section */}
              <div className="p-3 bg-[#050505] border border-[#1a1a1a] rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#c2a47a] font-bold flex items-center gap-1.5 uppercase">
                    <Tag className="w-3.5 h-3.5" /> Coupon Code
                  </span>
                  <button
                    type="button"
                    onClick={onOpenCouponsModal}
                    className="text-[11px] text-[#888888] hover:text-[#c2a47a] underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ticket className="w-3 h-3" /> View All Coupons
                  </button>
                </div>

                {appliedCouponCode && couponResult?.isValid ? (
                  <div className="p-2 bg-[#10b981]/10 border border-[#10b981]/30 rounded flex items-center justify-between text-xs text-[#10b981]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <div>
                        <strong className="block font-bold uppercase">{appliedCouponCode} APPLIED</strong>
                        <span className="text-[10px] text-[#10b981]/80">
                          {couponResult.coupon?.discountPercentage}% OFF (-${discountAmount.toFixed(2)})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={onRemoveCouponCode}
                      className="text-xs text-[#888888] hover:text-white p-1"
                      title="Remove Coupon"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : appliedCouponCode && !couponResult?.isValid ? (
                  <div className="p-2.5 bg-[#e63946]/10 border border-[#e63946]/40 rounded text-xs text-[#e63946] space-y-1.5 font-mono">
                    <div className="flex items-center justify-between">
                      <strong className="font-bold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {appliedCouponCode} INACTIVE
                      </strong>
                      <button
                        onClick={onRemoveCouponCode}
                        className="text-[11px] underline text-[#888888] hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-[11px] text-[#e63946]/90 leading-tight">
                      {couponResult?.message}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleApplyInput} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME5, REGISTER10, FEAST250"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError(null);
                      }}
                      className="flex-1 bg-[#0f0f0f] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs px-2.5 py-1.5 rounded uppercase focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded bg-[#c2a47a] text-[#050505] font-bold text-xs hover:brightness-110 transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && (
                  <div className="p-2 bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] text-[11px] rounded flex items-start gap-1.5 leading-tight">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{couponError}</span>
                  </div>
                )}

                {!isUserRegistered && (
                  <button
                    onClick={onOpenRegisterModal}
                    className="w-full text-center text-[10px] text-[#c2a47a] hover:underline flex items-center justify-center gap-1 pt-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" /> Register now to unlock member coupons up to 50% OFF!
                  </button>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="flex justify-between text-xs text-[#888888]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-xs text-[#10b981] font-bold">
                  <span>Coupon Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-xs text-[#888888]">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-white font-bold pt-2 border-t border-[#1a1a1a]">
                <span>Total</span>
                <span className="text-[#c2a47a]">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-sans font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer shadow"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
