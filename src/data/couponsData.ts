export interface Coupon {
  code: string;
  discountPercentage: number;
  minOrderAmount: number;
  description: string;
  requiresRegistration: boolean;
  badge: string;
  isPopular?: boolean;
}

export const COUPONS: Coupon[] = [
  {
    code: "WELCOME5",
    discountPercentage: 5,
    minOrderAmount: 15,
    description: "5% OFF for registered members on purchases over $15",
    requiresRegistration: true,
    badge: "5% OFF ($15+)",
    isPopular: true,
  },
  {
    code: "REGISTER10",
    discountPercentage: 10,
    minOrderAmount: 20,
    description: "10% OFF for registered members on purchases over $20",
    requiresRegistration: true,
    badge: "10% OFF ($20+)",
    isPopular: true,
  },
  {
    code: "MEMBER15",
    discountPercentage: 15,
    minOrderAmount: 40,
    description: "15% OFF for registered members on purchases over $40",
    requiresRegistration: true,
    badge: "15% OFF ($40+)",
  },
  {
    code: "FLAME20",
    discountPercentage: 20,
    minOrderAmount: 70,
    description: "20% OFF registered reward for orders over $70",
    requiresRegistration: true,
    badge: "20% OFF ($70+)",
  },
  {
    code: "FLAME25",
    discountPercentage: 25,
    minOrderAmount: 100,
    description: "25% OFF (highest standard value) on orders over $100",
    requiresRegistration: true,
    badge: "25% OFF ($100+)",
    isPopular: true,
  },
  {
    code: "FEAST250",
    discountPercentage: 50,
    minOrderAmount: 250,
    description: "50% OFF Mega discount on purchases over $250",
    requiresRegistration: true,
    badge: "50% OFF ($250+)",
    isPopular: true,
  },
  {
    code: "MEGA300",
    discountPercentage: 50,
    minOrderAmount: 300,
    description: "50% OFF Ultimate Feast discount on purchases over $300",
    requiresRegistration: true,
    badge: "50% OFF ($300+)",
  },
];

export function validateCoupon(
  code: string,
  subtotal: number,
  isUserRegistered: boolean
): { isValid: boolean; message: string; coupon?: Coupon; discountAmount: number } {
  const cleanCode = code.trim().toUpperCase();
  const coupon = COUPONS.find((c) => c.code === cleanCode);

  if (!coupon) {
    return {
      isValid: false,
      message: `Invalid coupon code "${code}". Please check available codes.`,
      discountAmount: 0,
    };
  }

  // 1. MUST be registered on the website (email provided)
  if (!isUserRegistered) {
    return {
      isValid: false,
      message: `Coupon "${coupon.code}" cannot be activated without an account. Please register with your email address on the website first!`,
      coupon,
      discountAmount: 0,
    };
  }

  // 2. MUST meet the strict price tier for this specific coupon code
  if (subtotal < coupon.minOrderAmount) {
    const diff = (coupon.minOrderAmount - subtotal).toFixed(2);
    return {
      isValid: false,
      message: `Coupon "${coupon.code}" (${coupon.discountPercentage}% OFF) cannot be applied for a $${subtotal.toFixed(
        2
      )} order! It strictly requires a minimum subtotal of $${coupon.minOrderAmount.toFixed(
        2
      )}. Add $${diff} more to unlock.`,
      coupon,
      discountAmount: 0,
    };
  }

  const discountAmount = (subtotal * coupon.discountPercentage) / 100;
  return {
    isValid: true,
    message: `Coupon "${coupon.code}" applied! You save ${coupon.discountPercentage}% ($${discountAmount.toFixed(
      2
    )}).`,
    coupon,
    discountAmount,
  };
}
