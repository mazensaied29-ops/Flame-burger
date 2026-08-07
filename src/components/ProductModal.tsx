import React, { useState } from "react";
import { Product, SelectedCustomizations, CustomizationOption } from "../types";
import { X, Star, Flame, Check, Plus, Minus, ShoppingBag } from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCartCustom: (product: Product, quantity: number, customizations: SelectedCustomizations, totalPrice: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCartCustom,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedBread, setSelectedBread] = useState<CustomizationOption | undefined>(
    product.options?.breads?.[0]
  );
  const [selectedPatties, setSelectedPatties] = useState<CustomizationOption[]>([]);
  const [selectedCheeses, setSelectedCheeses] = useState<CustomizationOption[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<CustomizationOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Calculate unit price based on customizations
  const calculateUnitPrice = () => {
    let base = product.price;
    if (selectedBread) base += selectedBread.price;
    selectedPatties.forEach((p) => (base += p.price));
    selectedCheeses.forEach((c) => (base += c.price));
    selectedSauces.forEach((s) => (base += s.price));
    return base;
  };

  const unitPrice = calculateUnitPrice();
  const totalPrice = unitPrice * quantity;

  const toggleOption = (
    option: CustomizationOption,
    list: CustomizationOption[],
    setList: React.Dispatch<React.SetStateAction<CustomizationOption[]>>
  ) => {
    if (list.some((item) => item.id === option.id)) {
      setList(list.filter((item) => item.id !== option.id));
    } else {
      setList([...list, option]);
    }
  };

  const handleAdd = () => {
    const customizations: SelectedCustomizations = {
      bread: selectedBread,
      extraPatty: selectedPatties,
      cheeses: selectedCheeses,
      sauces: selectedSauces,
      specialInstructions,
    };
    onAddToCartCustom(product, quantity, customizations, totalPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded bg-[#050505]/90 border border-[#1a1a1a] text-[#888888] hover:text-white flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/50" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-[#c2a47a] text-xs font-mono font-bold uppercase tracking-wider block mb-1">
                {product.categoryName}
              </span>
              <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-white tracking-wide">
                {product.name}
              </h2>
            </div>
            <div className="bg-[#050505]/90 backdrop-blur-md border border-[#1a1a1a] text-white px-3 py-1.5 rounded font-mono font-bold text-xs flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#c2a47a] fill-current" />
              <span>{product.rating} ({product.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description & Macro Bar */}
          <div>
            <p className="text-[#d1d1d1] text-xs sm:text-sm leading-relaxed mb-4">
              {product.longDescription || product.description}
            </p>

            <div className="grid grid-cols-3 gap-3 bg-[#050505] p-3 rounded border border-[#1a1a1a] text-center text-xs font-mono">
              <div>
                <span className="text-[#666666] text-[10px] uppercase font-bold block">Calories</span>
                <span className="text-white font-bold">{product.calories} kcal</span>
              </div>
              <div>
                <span className="text-[#666666] text-[10px] uppercase font-bold block">Protein</span>
                <span className="text-white font-bold">{product.proteinGrams}g</span>
              </div>
              <div>
                <span className="text-[#666666] text-[10px] uppercase font-bold block">Prep Time</span>
                <span className="text-white font-bold">{product.prepTimeMins} mins</span>
              </div>
            </div>
          </div>

          {/* Customization: Bread Choice */}
          {product.options?.breads && product.options.breads.length > 0 && (
            <div>
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-[#c2a47a] block mb-2">
                1. Choose Artisanal Bun
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {product.options.breads.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBread(b)}
                    className={`p-3 rounded border text-xs text-left font-medium flex items-center justify-between transition cursor-pointer ${
                      selectedBread?.id === b.id
                        ? "bg-[#c2a47a]/20 border-[#c2a47a] text-white"
                        : "bg-[#050505] border-[#1a1a1a] text-[#888888] hover:text-white"
                    }`}
                  >
                    <span>{b.name}</span>
                    {b.price > 0 && <span className="text-[#c2a47a] font-mono">+${b.price.toFixed(2)}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customization: Extra Patty & Meats */}
          {product.options?.extraPatty && product.options.extraPatty.length > 0 && (
            <div>
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-[#c2a47a] block mb-2">
                2. Add Extra Angus Meat / Bacon
              </label>
              <div className="space-y-2">
                {product.options.extraPatty.map((p) => {
                  const isSelected = selectedPatties.some((item) => item.id === p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleOption(p, selectedPatties, setSelectedPatties)}
                      className={`p-3 rounded border text-xs font-medium flex items-center justify-between cursor-pointer transition ${
                        isSelected
                          ? "bg-[#c2a47a]/20 border-[#c2a47a] text-white"
                          : "bg-[#050505] border-[#1a1a1a] text-[#888888] hover:text-white"
                      }`}
                    >
                      <span>{p.name}</span>
                      <span className="text-[#c2a47a] font-mono font-bold">+${p.price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customization: Extra Cheeses */}
          {product.options?.cheeses && product.options.cheeses.length > 0 && (
            <div>
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-[#c2a47a] block mb-2">
                3. Extra Gourmet Cheese
              </label>
              <div className="space-y-2">
                {product.options.cheeses.map((c) => {
                  const isSelected = selectedCheeses.some((item) => item.id === c.id);
                  return (
                    <div
                      key={c.id}
                      onClick={() => toggleOption(c, selectedCheeses, setSelectedCheeses)}
                      className={`p-3 rounded border text-xs font-medium flex items-center justify-between cursor-pointer transition ${
                        isSelected
                          ? "bg-[#c2a47a]/20 border-[#c2a47a] text-white"
                          : "bg-[#050505] border-[#1a1a1a] text-[#888888] hover:text-white"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[#c2a47a] font-mono font-bold">+${c.price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#d1d1d1] block mb-1.5 font-mono">
              Special Preparation Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Extra sauce on side, no pickles..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs p-3 rounded focus:outline-none font-sans"
            />
          </div>
        </div>

        {/* Modal Footer: Quantity & Add */}
        <div className="p-6 bg-[#050505] border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-[#0f0f0f] border border-[#1a1a1a] px-3 py-1.5 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-[#888888] hover:text-white transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-white font-mono font-bold text-sm w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-[#888888] hover:text-white transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="w-full sm:w-auto px-8 py-3 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 shadow"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add To Cart • ${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
