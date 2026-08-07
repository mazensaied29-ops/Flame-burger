import React, { useState } from "react";
import { CartItem } from "../types";
import { X, Send, ShoppingBag, MapPin, User, Phone, FileText, CreditCard, CheckCircle2, Tag, Percent } from "lucide-react";
import { validateCoupon } from "../data/couponsData";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
  isUserRegistered: boolean;
  appliedCouponCode: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  isUserRegistered,
  appliedCouponCode,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const couponResult = appliedCouponCode
    ? validateCoupon(appliedCouponCode, subtotal, isUserRegistered)
    : null;
  const discountAmount = couponResult && couponResult.isValid ? couponResult.discountAmount : 0;
  const deliveryFee = 2.50;
  const total = Math.max(0, subtotal - discountAmount) + deliveryFee;

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in your Name, Phone Number, and Delivery Address.");
      return;
    }

    // Format WhatsApp message
    let message = `*🔥 NEW ORDER - FLAME BURGER NASR CITY 🔥*\n`;
    message += `----------------------------------------\n`;
    message += `👤 *Customer Name:* ${name.trim()}\n`;
    message += `📱 *Phone:* ${phone.trim()}\n`;
    message += `📍 *Delivery Address:* ${address.trim()}\n`;
    message += `💳 *Payment Method:* ${paymentMethod}\n`;
    if (notes.trim()) {
      message += `📝 *Special Notes:* ${notes.trim()}\n`;
    }
    message += `----------------------------------------\n`;
    message += `🛒 *ORDER ITEMS:*\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}* x${item.quantity} - $${item.totalPrice.toFixed(2)}\n`;
      if (item.customizations?.bread) {
        message += `   • Bun: ${item.customizations.bread.name}\n`;
      }
      if (item.customizations?.extraPatties && item.customizations.extraPatties.length > 0) {
        message += `   • Extras: ${item.customizations.extraPatties.map((p) => p.name).join(", ")}\n`;
      }
      if (item.customizations?.cheeses && item.customizations.cheeses.length > 0) {
        message += `   • Cheese: ${item.customizations.cheeses.map((c) => c.name).join(", ")}\n`;
      }
    });

    message += `----------------------------------------\n`;
    message += `💵 *Subtotal:* $${subtotal.toFixed(2)}\n`;
    if (discountAmount > 0 && appliedCouponCode) {
      message += `🏷️ *Coupon Discount (${appliedCouponCode.toUpperCase()}):* -$${discountAmount.toFixed(2)}\n`;
    }
    message += `🛵 *Delivery (Nasr City):* $${deliveryFee.toFixed(2)}\n`;
    message += `💰 *TOTAL AMOUNT:* $${total.toFixed(2)}\n`;
    message += `----------------------------------------\n`;
    message += `Thank you for choosing Flame Burger Nasr City!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201223029669?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Success callback
    onOrderSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded max-w-xl w-full overflow-hidden shadow-2xl relative my-8">
        {/* Header */}
        <div className="p-5 bg-[#050505] border-b border-[#1a1a1a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#c2a47a]/20 border border-[#c2a47a] flex items-center justify-center">
              <Send className="w-4 h-4 text-[#c2a47a]" />
            </div>
            <div>
              <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
                WHATSAPP CHECKOUT (NASR CITY)
              </h2>
              <p className="text-[10px] text-[#888888] font-mono">
                Direct Order Hotline: 01223029669
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#888888] hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSendToWhatsApp} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Order Brief */}
          <div className="bg-[#050505] p-3.5 rounded border border-[#1a1a1a] space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between text-[#888888]">
              <span>Items Count: <strong className="text-white">{items.reduce((a,b)=>a+b.quantity,0)}</strong></span>
              <span>Subtotal: ${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && appliedCouponCode && (
              <div className="flex items-center justify-between text-[#10b981] font-bold">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Coupon ({appliedCouponCode})
                </span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-1.5 border-t border-[#1a1a1a] text-sm font-bold">
              <span className="text-white">Final Total (with delivery):</span>
              <span className="text-[#c2a47a] text-base">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-mono text-[#c2a47a] font-bold block mb-1 uppercase">
                1. Customer Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#c2a47a] font-bold block mb-1 uppercase">
                2. Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#c2a47a] font-bold block mb-1 uppercase">
                3. Delivery Address *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#c2a47a] font-bold block mb-1 uppercase">
                4. Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Cash on Delivery", "Vodafone Cash", "Credit Card"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-3 rounded border text-xs font-mono transition text-center cursor-pointer ${
                      paymentMethod === method
                        ? "bg-[#c2a47a]/20 border-[#c2a47a] text-white font-bold"
                        : "bg-[#050505] border-[#1a1a1a] text-[#888888] hover:text-white"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#888888] block mb-1 uppercase">
                5. Delivery Notes (Optional)
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-[#666666] absolute left-3 top-3" />
                <textarea
                  rows={2}
                  placeholder="e.g. Ring the bell, extra garlic dip please..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#10b981]/10 border border-[#10b981]/30 rounded flex items-center gap-2 text-xs text-[#10b981] font-mono">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Clicking below will launch WhatsApp with your formatted order to 01223029669.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>Send Order via WhatsApp (01223029669)</span>
          </button>
        </form>
      </div>
    </div>
  );
};
