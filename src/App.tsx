import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StoryBanner } from "./components/StoryBanner";
import { DealsSection } from "./components/DealsSection";
import { Categories } from "./components/Categories";
import { BestSellers } from "./components/BestSellers";
import { MenuSection } from "./components/MenuSection";
import { WhyUs } from "./components/WhyUs";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { ReservationModal } from "./components/ReservationModal";
import { LoginModal } from "./components/LoginModal";
import { ProfileModal, UserProfileData } from "./components/ProfileModal";
import { CouponsModal } from "./components/CouponsModal";
import { ScrollToTop } from "./components/ScrollToTop";
import { MENU_PRODUCTS } from "./data/menuData";
import { Product, CategoryId, CartItem, SelectedCustomizations } from "./types";
import { Sparkles, X, Check, MapPin, Clock, Phone } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCouponsOpen, setIsCouponsOpen] = useState(false);

  // Initialize Persistent User Profile from localStorage
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(() => {
    try {
      const saved = localStorage.getItem("flame_burger_user_session");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Initialize Registration Flag from localStorage
  const [hasRegisteredBefore, setHasRegisteredBefore] = useState<boolean>(() => {
    try {
      return localStorage.getItem("flame_burger_registered") === "true";
    } catch {
      return false;
    }
  });

  const [appliedCouponCode, setAppliedCouponCode] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const isUserRegistered = userProfile !== null;

  // Auto-open Login / Register Modal for new / unauthenticated visitors
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("flame_burger_user_session");
      if (!savedUser) {
        // Pop up the login/register modal so new visitors sign up or log in
        const timer = setTimeout(() => {
          setIsLoginOpen(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsLoginOpen(true);
    }
  }, []);

  // Save Login Success & Persistent Storage
  const handleLoginSuccess = (userData: UserProfileData) => {
    setUserProfile(userData);
    setHasRegisteredBefore(true);
    try {
      localStorage.setItem("flame_burger_user_session", JSON.stringify(userData));
      localStorage.setItem("flame_burger_registered", "true");
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
    showToast(`Welcome back ${userData.name}! Account & email logged in permanently.`);
  };

  // Update Profile Details in LocalStorage
  const handleUpdateUser = (updatedData: UserProfileData) => {
    setUserProfile(updatedData);
    try {
      localStorage.setItem("flame_burger_user_session", JSON.stringify(updatedData));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
    showToast("Your account details & email have been updated.");
  };

  // Logout Handler
  const handleLogout = () => {
    setUserProfile(null);
    setIsProfileOpen(false);
    setAppliedCouponCode("");
    try {
      localStorage.removeItem("flame_burger_user_session");
    } catch (e) {
      console.error("Failed to remove session", e);
    }
    showToast("Logged out successfully.");
  };

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Quick Add To Cart
  const handleAddToCart = (product: Product) => {
    const id = `${product.id}-${Date.now()}`;
    const newItem: CartItem = {
      id,
      cartItemId: id,
      product,
      quantity: 1,
      totalPrice: product.price,
    };
    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added "${product.name}" to your order`);
  };

  // Custom Add To Cart
  const handleAddToCartCustom = (
    product: Product,
    quantity: number,
    customizations: SelectedCustomizations,
    totalPrice: number
  ) => {
    const id = `${product.id}-${Date.now()}`;
    const newItem: CartItem = {
      id,
      cartItemId: id,
      product,
      quantity,
      customizations,
      totalPrice,
    };
    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added ${quantity}x "${product.name}" to your order`);
  };

  // Select Product By ID
  const handleSelectProductById = (productId: string) => {
    const target = MENU_PRODUCTS.find((p) => p.id === productId);
    if (target) {
      setSelectedProduct(target);
    }
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          const key = item.cartItemId || item.id;
          if (key === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const unitPrice = item.totalPrice / item.quantity;
            return {
              ...item,
              quantity: newQty,
              totalPrice: unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Item
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => (item.cartItemId || item.id) !== cartItemId)
    );
  };

  // Handle Category Select
  const handleCategorySelect = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveTab("menu");
    setTimeout(() => {
      const menuEl = document.getElementById("full-menu");
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Apply Coupon Code
  const handleApplyCouponCode = (code: string) => {
    setAppliedCouponCode(code.toUpperCase());
    showToast(`Coupon "${code.toUpperCase()}" applied to your order!`);
  };

  // Remove Coupon Code
  const handleRemoveCouponCode = () => {
    setAppliedCouponCode("");
    showToast("Coupon removed from your order.");
  };

  // AI Concierge Recommendation Handler
  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const query = aiQuery.toLowerCase();
    if (query.includes("spicy") || query.includes("hot") || query.includes("fire")) {
      setAiResponse(
        "I recommend our Jalapeño Inferno Smash or Crispy Chicken Deluxe paired with our Loaded Flame Fries for an exceptional spicy kick!"
      );
    } else if (query.includes("cheese") || query.includes("cheesy")) {
      setAiResponse(
        "You will love the Classic Cheese Volcano or Original Smash Monster loaded with triple melted cheese and liquid cheddar sauce!"
      );
    } else if (query.includes("sweet") || query.includes("shake") || query.includes("dessert")) {
      setAiResponse(
        "Try our Luxury Oreo Crunch Shake alongside a warm Molten Chocolate Lava Cake for the ultimate sweet indulgence."
      );
    } else {
      setAiResponse(
        "Our Chef's Top Pick for you is The Ultimate Flame Burger — double flame-grilled Angus beef seared over real oakwood charcoal with aged cheddar and beef bacon!"
      );
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-[#d1d1d1] font-sans selection:bg-[#c2a47a] selection:text-[#050505]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f0f0f] border border-[#c2a47a] text-white px-4 py-3 rounded shadow-2xl flex items-center gap-2 animate-fadeIn font-mono text-xs max-w-md">
          <Check className="w-4 h-4 text-[#c2a47a] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        userProfile={userProfile}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAI={() => setShowAiModal(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCoupons={() => setIsCouponsOpen(true)}
      />

      {/* Main Section Routing */}
      {activeTab === "home" && (
        <>
          <Hero
            onOrderNow={() => {
              setActiveTab("menu");
              const menuEl = document.getElementById("full-menu");
              if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
            }}
            onExploreMenu={() => {
              setActiveTab("menu");
              const menuEl = document.getElementById("full-menu");
              if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
            }}
            onOpenAI={() => setShowAiModal(true)}
          />

          {/* Stories & Offers Banner */}
          <StoryBanner
            onSelectProductById={handleSelectProductById}
            onExploreOffers={() => {
              setActiveTab("deals");
              const dealsEl = document.getElementById("special-deals");
              if (dealsEl) dealsEl.scrollIntoView({ behavior: "smooth" });
            }}
          />

          <Categories onSelectCategory={handleCategorySelect} />

          <BestSellers
            products={MENU_PRODUCTS}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onAddToCart={handleAddToCart}
          />

          <WhyUs />
        </>
      )}

      {/* Special Deals Tab or Section */}
      {(activeTab === "deals" || activeTab === "home") && (
        <DealsSection
          products={MENU_PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          onOpenCoupons={() => setIsCouponsOpen(true)}
          onOpenRegister={() => setIsLoginOpen(true)}
        />
      )}

      {/* Full Menu View */}
      {(activeTab === "menu" || activeTab === "home") && (
        <MenuSection
          products={MENU_PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Story / About Section */}
      {activeTab === "about" && (
        <section className="py-20 bg-[#050505] border-b border-[#1a1a1a]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-[#c2a47a] text-xs font-mono font-bold uppercase tracking-widest block mb-2">
              OUR HERITAGE
            </span>
            <h1 className="font-['Bebas_Neue'] text-5xl text-white tracking-wide mb-6">
              THE ART OF REAL CHARCOAL FLAME
            </h1>
            <p className="text-[#888888] text-sm leading-relaxed mb-6 font-sans">
              Founded with an uncompromising passion for culinary perfection, Flame Burger uses 100% grain-fed Angus beef ground fresh every morning. We flame-grill over genuine oakwood charcoal at 600°F to seal in intense smoky juices while creating an incredible caramelized crust.
            </p>
            <p className="text-[#888888] text-sm leading-relaxed font-sans">
              Every bun is baked in-house twice daily, every sauce slow-cooked in artisanal small batches, and every bite crafted to elevate classic burger culture into an exquisite luxury dining experience right here in <strong className="text-white">Nasr City, Cairo</strong>.
            </p>
          </div>
        </section>
      )}

      {/* Locations Section - NASR CITY */}
      {activeTab === "locations" && (
        <section className="py-20 bg-[#050505] border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[#c2a47a] text-xs font-mono font-bold uppercase tracking-widest block mb-1">
                OUR FLAGSHIP BOUTIQUE
              </span>
              <h2 className="font-[#Bebas_Neue] text-4xl sm:text-5xl text-white tracking-wide">
                FLAME BURGER NASR CITY, CAIRO
              </h2>
              <p className="text-xs text-[#888888] mt-2 font-mono">
                Direct Hotline & WhatsApp: 01223029669 | Reservations: mazensaied29@gmail.com
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Nasr City Flagship", address: "Building 14, Abbas El Akkad St, Nasr City, Cairo", hours: "11:00 AM - 03:00 AM Daily", phone: "01223029669" },
                { name: "Heliopolis Korba", address: "Baghdad Street, Korba, Heliopolis, Cairo", hours: "11:30 AM - 02:00 AM", phone: "01223029669" },
                { name: "Maadi Road 9", address: "Street 9, Maadi, Cairo", hours: "12:00 PM - 02:00 AM", phone: "01223029669" },
              ].map((loc, idx) => (
                <div key={idx} className="bg-[#0f0f0f] border border-[#1a1a1a] p-6 rounded space-y-3 shadow-lg">
                  <h3 className="font-['Bebas_Neue'] text-2xl text-white">{loc.name}</h3>
                  <p className="text-xs text-[#888888] flex items-center gap-2"><MapPin className="w-4 h-4 text-[#c2a47a] shrink-0" /> {loc.address}</p>
                  <p className="text-xs text-[#888888] flex items-center gap-2"><Clock className="w-4 h-4 text-[#c2a47a] shrink-0" /> {loc.hours}</p>
                  <p className="text-xs text-[#888888] flex items-center gap-2"><Phone className="w-4 h-4 text-[#c2a47a] shrink-0" /> {loc.phone}</p>

                  <a
                    href={`https://wa.me/201223029669?text=${encodeURIComponent(`Hello Flame Burger ${loc.name}, I would like to order/inquire.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#25D366] text-white font-bold text-[11px] uppercase tracking-wider"
                  >
                    <span>Contact via WhatsApp</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-[#1a1a1a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-['Bebas_Neue'] text-2xl tracking-wide text-white block">
              FLAME<span className="text-[#c2a47a]">BURGER</span> NASR CITY
            </span>
            <p className="text-xs text-[#666666] font-mono mt-1">
              © {new Date().getFullYear()} Flame Burger Cairo. Hotline: 01223029669 | Email: mazensaied29@gmail.com
            </p>
          </div>
          <div className="flex gap-6 text-xs text-[#888888] font-mono">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Careers</span>
            <span>Contact Us</span>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCartCustom={handleAddToCartCustom}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        isUserRegistered={isUserRegistered}
        appliedCouponCode={appliedCouponCode}
        onApplyCouponCode={handleApplyCouponCode}
        onRemoveCouponCode={handleRemoveCouponCode}
        onOpenCouponsModal={() => setIsCouponsOpen(true)}
        onOpenRegisterModal={() => setIsLoginOpen(true)}
      />

      {/* WhatsApp Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          showToast("Order sent via WhatsApp! We will confirm your delivery shortly.");
          setCartItems([]);
          setAppliedCouponCode("");
        }}
        isUserRegistered={isUserRegistered}
        appliedCouponCode={appliedCouponCode}
      />

      {/* Coupons Modal */}
      <CouponsModal
        isOpen={isCouponsOpen}
        onClose={() => setIsCouponsOpen(false)}
        isUserRegistered={isUserRegistered}
        subtotal={subtotalAmount}
        appliedCouponCode={appliedCouponCode}
        onApplyCoupon={(code) => {
          handleApplyCouponCode(code);
          setIsCouponsOpen(false);
          setIsCartOpen(true);
        }}
        onOpenRegister={() => {
          setIsCouponsOpen(false);
          setIsLoginOpen(true);
        }}
      />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* Customer Login / Register Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        hasRegisteredBefore={hasRegisteredBefore}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* User Profile Modal */}
      {userProfile && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={userProfile}
          onUpdateUser={handleUpdateUser}
          onLogout={handleLogout}
          onOpenCoupons={() => setIsCouponsOpen(true)}
        />
      )}

      {/* AI Concierge Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded max-w-lg w-full p-6 relative space-y-4">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 text-[#888888] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-[#c2a47a]">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-['Bebas_Neue'] text-2xl text-white">FLAME AI CHEF CONCIERGE</h3>
            </div>
            <p className="text-xs text-[#888888]">
              Tell our AI Chef what flavor profile or craving you have, and get a tailored recommendation instantly!
            </p>
            <form onSubmit={handleAskAi} className="space-y-3">
              <input
                type="text"
                placeholder="e.g. I want something spicy with cheese and bacon..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs p-3 rounded focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer"
              >
                Ask AI Chef
              </button>
            </form>

            {aiResponse && (
              <div className="bg-[#050505] border border-[#1a1a1a] p-4 rounded text-xs text-[#d1d1d1] font-mono leading-relaxed">
                {aiResponse}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Scroll Progress & Back to Top Control */}
      <ScrollToTop />
    </div>
  );
}
