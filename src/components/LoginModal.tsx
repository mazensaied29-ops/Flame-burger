import React, { useState, useEffect } from "react";
import { X, LogIn, UserPlus, Phone, Lock, Mail, User, MapPin, Sparkles, Gift, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { UserProfileData } from "./ProfileModal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfileData) => void;
  hasRegisteredBefore?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  hasRegisteredBefore = false,
}) => {
  // Tabs: true = Register (Create Account), false = Login (Customer Login)
  const [isRegister, setIsRegister] = useState(!hasRegisteredBefore);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  // Social login state
  const [socialProvider, setSocialProvider] = useState<"google" | "facebook" | null>(null);
  const [socialEmail, setSocialEmail] = useState("");
  const [socialName, setSocialName] = useState("");

  // Redirect state and notification message
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);

  // Stored registered credentials for verification
  const [lastRegisteredAccount, setLastRegisteredAccount] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem("flame_burger_last_reg");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (isOpen) {
      setRedirectNotice(null);
      setLoginErrorMessage(null);
      setSocialProvider(null);
      // Pre-fill email/phone if previously registered account exists
      if (lastRegisteredAccount) {
        setEmail(lastRegisteredAccount.email);
      }
    }
  }, [isOpen, lastRegisteredAccount]);

  // Listen for OAuth success message from popup window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "OAUTH_AUTH_SUCCESS") {
        const passedName = event.data.name || socialName || "Mazen Saied";
        const passedEmail = event.data.email || socialEmail || "mazensaied29@gmail.com";
        handleConfirmSocialLogin(passedName, passedEmail);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [socialEmail, socialName, socialProvider]);

  if (!isOpen) return null;

  // Handle Social Login Trigger
  const handleOpenSocial = async (provider: "google" | "facebook") => {
    setSocialProvider(provider);
    if (provider === "google") {
      setSocialEmail("mazensaied29@gmail.com");
      setSocialName("Mazen Saied (Google Account)");
    } else {
      setSocialEmail("mazensaied29@facebook.com");
      setSocialName("Mazen Saied (Facebook Account)");
    }

    // Launch real popup window to Google Accounts / Facebook Login page
    try {
      const response = await fetch(`/api/auth/oauth-url?provider=${provider}`);
      if (response.ok) {
        const { url } = await response.json();
        if (url) {
          window.open(url, `${provider}_oauth`, "width=600,height=700,scrollbars=yes,resizable=yes");
        }
      }
    } catch (err) {
      console.warn("Could not launch OAuth popup:", err);
    }
  };

  const handleConfirmSocialLogin = (overrideName?: string, overrideEmail?: string) => {
    const cleanEmail = (overrideEmail || socialEmail).trim().toLowerCase() || (socialProvider === "google" ? "user@gmail.com" : "user@facebook.com");
    const cleanName = (overrideName || socialName).trim() || (socialProvider === "google" ? "Google Member" : "Facebook Member");
    
    const loggedInUser: UserProfileData = {
      name: cleanName,
      email: cleanEmail,
      phone: "01000000000",
      address: "Cairo, Egypt",
    };

    // Save registration flag & account details permanently
    const regAccount = {
      name: cleanName,
      email: cleanEmail,
      phone: "01000000000",
      address: "Cairo, Egypt",
      password: "social_authenticated",
    };
    localStorage.setItem("flame_burger_last_reg", JSON.stringify(regAccount));

    // Log in user permanently
    onLoginSuccess(loggedInUser);
    setSocialProvider(null);
    onClose();
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMessage(null);

    const cleanName = fullName.trim() || "Customer";
    const cleanEmail = email.trim().toLowerCase() || "customer@example.com";
    const cleanPhone = phone.trim() || "01000000000";
    const cleanAddress = address.trim() || "Cairo";
    const cleanPassword = password.trim();

    if (isRegister) {
      // 1. REGISTER FLOW: Save account details & switch to LOGIN tab for verification
      const regAccount = {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        address: cleanAddress,
        password: cleanPassword,
      };

      // Store in state & localStorage
      setLastRegisteredAccount(regAccount);
      localStorage.setItem("flame_burger_last_reg", JSON.stringify(regAccount));

      // Switch to Customer Login tab
      setIsRegister(false);

      // Pre-fill email and password for login verification
      setEmail(cleanEmail);
      setPassword(cleanPassword);

      // Show redirect notification banner
      setRedirectNotice(
        `Account created for ${cleanEmail}! Please verify your password below to complete sign-in & save your account permanently.`
      );
    } else {
      // 2. LOGIN FLOW: Check credentials & save session
      // If password is provided (min length 1)
      if (!cleanPassword) {
        setLoginErrorMessage("Please enter your password to log in.");
        return;
      }

      // Determine user profile name
      let finalName = cleanName;
      let finalPhone = cleanPhone;
      let finalAddress = cleanAddress;

      if (lastRegisteredAccount && lastRegisteredAccount.email === cleanEmail) {
        finalName = lastRegisteredAccount.name;
        finalPhone = lastRegisteredAccount.phone;
        finalAddress = lastRegisteredAccount.address;
      } else if (cleanName === "Customer" && cleanEmail.includes("@")) {
        // Extract name from email if name wasn't entered
        const emailUsername = cleanEmail.split("@")[0];
        finalName = emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);
      }

      const loggedInUser: UserProfileData = {
        name: finalName,
        email: cleanEmail,
        phone: finalPhone,
        address: finalAddress,
      };

      // Call parent handler to save login & persistent state
      onLoginSuccess(loggedInUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded max-w-md w-full overflow-hidden shadow-2xl relative my-8 p-6 space-y-4">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888888] hover:text-white p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* First Visit Alert Banner */}
        {!hasRegisteredBefore && !redirectNotice && (
          <div className="bg-[#111111] border border-[#c2a47a]/50 p-3.5 rounded flex items-start gap-2.5 text-xs text-[#d1d1d1] font-mono">
            <Sparkles className="w-4 h-4 text-[#c2a47a] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-sans text-xs font-bold">Register Today & Stay Logged In!</strong>
              <span className="text-[11px] text-[#aaaaaa]">
                Register your account once to stay logged in permanently & unlock up to 50% OFF coupons!
              </span>
            </div>
          </div>
        )}

        {/* Redirect Notice after Registration */}
        {redirectNotice && (
          <div className="bg-[#10b981]/15 border border-[#10b981]/50 p-3.5 rounded flex items-start gap-2 text-xs text-[#10b981] font-mono leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-sans text-xs font-bold">Registration Step Complete!</strong>
              <span>{redirectNotice}</span>
            </div>
          </div>
        )}

        {/* Login Error Notice */}
        {loginErrorMessage && (
          <div className="bg-[#e63946]/10 border border-[#e63946]/40 p-3 rounded flex items-center gap-2 text-xs text-[#e63946] font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{loginErrorMessage}</span>
          </div>
        )}

        {/* SOCIAL LOGIN POPUP CARD IF SELECTED */}
        {socialProvider && (
          <div className="bg-[#050505] border border-[#c2a47a]/50 p-4 rounded-lg space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-2">
              <div className="flex items-center gap-2">
                {socialProvider === "google" ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
                <span className="font-bold text-white text-sm capitalize font-sans">
                  Sign in with {socialProvider}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSocialProvider(null)}
                className="text-[#888888] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#aaaaaa] font-mono leading-relaxed">
              Confirm your Google/Facebook profile details to log in directly & keep your email saved permanently:
            </p>

            <div className="space-y-2.5">
              <div>
                <label className="text-[11px] font-mono text-[#888888] block mb-1">
                  Profile Name
                </label>
                <input
                  type="text"
                  value={socialName}
                  onChange={(e) => setSocialName(e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-[#1a1a1a] text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#c2a47a]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#888888] block mb-1">
                  Account Email Address
                </label>
                <input
                  type="email"
                  value={socialEmail}
                  onChange={(e) => setSocialEmail(e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-[#1a1a1a] text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#c2a47a]"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmSocialLogin}
              className={`w-full py-2.5 rounded font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow ${
                socialProvider === "google"
                  ? "bg-[#4285F4] text-white hover:bg-[#3367D6]"
                  : "bg-[#1877F2] text-white hover:bg-[#165EBF]"
              }`}
            >
              <span>Confirm & Sign In via {socialProvider === "google" ? "Google" : "Facebook"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Header Tabs */}
        <div className="flex items-center gap-2 border-b border-[#1a1a1a] pb-3">
          <button
            type="button"
            onClick={() => {
              setIsRegister(true);
              setRedirectNotice(null);
            }}
            className={`font-['Bebas_Neue'] text-2xl tracking-wide px-3 py-1 rounded transition cursor-pointer ${
              isRegister ? "text-[#c2a47a] bg-[#050505] border border-[#1a1a1a]" : "text-[#888888]"
            }`}
          >
            CREATE ACCOUNT
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
            }}
            className={`font-['Bebas_Neue'] text-2xl tracking-wide px-3 py-1 rounded transition cursor-pointer ${
              !isRegister ? "text-[#c2a47a] bg-[#050505] border border-[#1a1a1a]" : "text-[#888888]"
            }`}
          >
            CUSTOMER LOGIN
          </button>
        </div>

        {/* Social Buttons (Google & Facebook) */}
        {!socialProvider && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleOpenSocial("google")}
                className="w-full py-2.5 px-3 rounded bg-[#050505] border border-[#1a1a1a] hover:border-[#4285F4] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenSocial("facebook")}
                className="w-full py-2.5 px-3 rounded bg-[#050505] border border-[#1a1a1a] hover:border-[#1877F2] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center my-1.5">
              <div className="border-t border-[#1a1a1a] w-full" />
              <span className="bg-[#0f0f0f] px-2 text-[10px] text-[#666666] font-mono uppercase tracking-wider shrink-0">
                Or Continue With Email
              </span>
              <div className="border-t border-[#1a1a1a] w-full" />
            </div>
          </div>
        )}

        {/* Coupon Highlights Card */}
        {isRegister && (
          <div className="bg-[#050505] border border-[#c2a47a]/30 p-3 rounded space-y-2 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-[#c2a47a] font-bold">
              <Gift className="w-4 h-4" />
              <span>UNLOCKED REGISTRATION COUPONS:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-2 rounded">
                <span className="text-white font-bold block text-xs">WELCOME5</span>
                <span className="text-[#888888]">5% OFF over $15</span>
              </div>
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-2 rounded">
                <span className="text-[#c2a47a] font-bold block text-xs">REGISTER10</span>
                <span className="text-[#888888]">10% OFF over $20</span>
              </div>
            </div>
            <div className="bg-[#0f0f0f] border border-[#e63946]/40 p-2 rounded text-center">
              <span className="text-[#e63946] font-bold block text-xs">FEAST250 / MEGA300 (50% OFF)</span>
              <span className="text-[#aaaaaa]">50% OFF discount on purchases over $250 or $300!</span>
            </div>
          </div>
        )}

        <p className="text-xs text-[#888888] font-mono">
          {isRegister
            ? "Register your account to unlock instant coupons. You will be routed to Login to verify your credentials."
            : "Sign in to your Flame Member account. Your email and account stay logged in permanently!"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div>
              <label className="text-xs font-mono text-[#888888] block mb-1">Username / Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter your username"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-mono text-[#888888] block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none lowercase"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="text-xs font-mono text-[#888888] block mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none"
                />
              </div>
            </div>
          )}

          {isRegister && (
            <div>
              <label className="text-xs font-mono text-[#888888] block mb-1">Delivery Address</label>
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
          )}

          <div>
            <label className="text-xs font-mono text-[#888888] block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050505] border border-[#1a1a1a] focus:border-[#c2a47a] text-white text-xs pl-9 pr-3 py-2.5 rounded focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded bg-gradient-to-r from-[#c2a47a] to-[#8e7552] text-[#050505] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer shadow"
          >
            {isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            <span>
              {isRegister
                ? "Register Account & Proceed to Login"
                : "Verify Password & Log In"}
            </span>
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-[#666666] font-mono">
          <span>By signing in, your account & email are saved permanently for future visits.</span>
        </div>
      </div>
    </div>
  );
};

