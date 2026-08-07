import React, { useState } from "react";
import { X, Calendar, Clock, Users, Mail, Phone, User, MessageSquare, CheckCircle2, Send } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState("2 Guests");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleBooking = (method: "email" | "whatsapp") => {
    if (!name.trim() || !phone.trim() || !date) {
      alert("Please enter your Name, Phone Number, and Reservation Date.");
      return;
    }

    const bookingDetails = `
*🍽️ NEW TABLE RESERVATION - FLAME BURGER NASR CITY*
----------------------------------------
👤 *Name:* ${name.trim()}
📱 *Phone:* ${phone.trim()}
👥 *Guests:* ${guests}
📅 *Date:* ${date}
⏰ *Time:* ${time}
📍 *Location:* Nasr City Boutique, Cairo
📝 *Notes:* ${notes.trim() || "None"}
----------------------------------------
Destination Email: mazensaied29@gmail.com
Hotline: 01223029669
`.trim();

    if (method === "email") {
      const mailtoUrl = `mailto:mazensaied29@gmail.com?subject=${encodeURIComponent(
        `Table Booking: ${name.trim()} - Nasr City`
      )}&body=${encodeURIComponent(bookingDetails)}`;
      window.open(mailtoUrl, "_blank");
    } else {
      const whatsappUrl = `https://wa.me/201223029669?text=${encodeURIComponent(
        bookingDetails
      )}`;
      window.open(whatsappUrl, "_blank");
    }

    onSuccess(`Table reservation sent! Details sent to mazensaied29@gmail.com & 01223029669.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded max-w-lg w-full overflow-hidden shadow-2xl relative my-8">
        {/* Header */}
        <div className="p-5 bg-[#050505] border-b border-[#1a1a1a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#c2a47a]" />
            <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">
              RESERVE A TABLE (NASR CITY)
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-[#888888] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-4">
          <div className="p-3 bg-[#050505] border border-[#1a1a1a] rounded text-xs text-[#888888] font-mono leading-relaxed">
            Reservations are processed directly via <strong className="text-white">mazensaied29@gmail.com</strong> and WhatsApp <strong className="text-white">01223029669</strong>.
          </div>

          <div>
            <label className="text-xs font-mono text-[#c2a47a] font-bold block mb-1">
              Username *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-[#c2a47a] font-bold block mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="e.g. 01XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-[#888888] block mb-1">Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#050505] border border-[#1a1a1a] text-white text-xs p-2.5 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-[#888888] block mb-1">Time *</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#050505] border border-[#1a1a1a] text-white text-xs p-2.5 rounded focus:outline-none"
              >
                <option value="13:00">1:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="21:00">9:00 PM</option>
                <option value="23:00">11:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-[#888888] block mb-1">Party Size</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-[#050505] border border-[#1a1a1a] text-white text-xs p-2.5 rounded focus:outline-none"
            >
              <option value="1 Guest">1 Guest</option>
              <option value="2 Guests">2 Guests</option>
              <option value="4 Guests">4 Guests</option>
              <option value="6 Guests">6 Guests</option>
              <option value="8+ VIP Table">8+ VIP Table</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-[#888888] block mb-1">Special Occasion / Request</label>
            <textarea
              rows={2}
              placeholder="e.g. Birthday celebration, outdoor terrace seating..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#050505] border border-[#1a1a1a] text-white text-xs p-2.5 rounded focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleBooking("whatsapp")}
              className="py-3 rounded bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:brightness-110 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp (01223029669)</span>
            </button>

            <button
              type="button"
              onClick={() => handleBooking("email")}
              className="py-3 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:brightness-110 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Booking</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
