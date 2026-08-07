export type CategoryId =
  | "all"
  | "best-sellers"
  | "classic-burgers"
  | "premium-burgers"
  | "smash-burgers"
  | "chicken-burgers"
  | "hot-dogs"
  | "loaded-fries"
  | "sides"
  | "desserts"
  | "milkshakes"
  | "drinks"
  | "combos";

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  categoryName: string;
  price: number;
  oldPrice?: number;
  description: string;
  longDescription: string;
  image: string;
  rating: number;
  reviewCount: number;
  calories: number;
  proteinGrams: number;
  prepTimeMins: number;
  spicyLevel: 0 | 1 | 2 | 3; // 0 = none, 1 = mild, 2 = medium, 3 = hot
  isBestSeller?: boolean;
  isNew?: boolean;
  isVegetarian?: boolean;
  ingredients: string[];
  allergens: string[];
  options?: {
    breads?: CustomizationOption[];
    extraPatty?: CustomizationOption[];
    cheeses?: CustomizationOption[];
    sauces?: CustomizationOption[];
    sides?: CustomizationOption[];
    drinks?: CustomizationOption[];
  };
}

export interface SelectedCustomizations {
  bread?: CustomizationOption;
  extraPatty?: CustomizationOption[];
  cheeses?: CustomizationOption[];
  sauces?: CustomizationOption[];
  side?: CustomizationOption;
  drink?: CustomizationOption;
  specialInstructions?: string;
}

export interface CartItem {
  id: string;
  cartItemId?: string;
  product: Product;
  quantity: number;
  customizations?: SelectedCustomizations;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  deliveryType: "delivery" | "pickup";
  paymentMethod: "card" | "applepay" | "googlepay" | "cash";
  status: "Received" | "Preparing" | "Flame Grilling" | "Packaging" | "Out For Delivery" | "Delivered";
  estimatedTime: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  branch: string;
  date: string;
  time: string;
  guests: number;
  seating: "indoor" | "outdoor" | "vip";
  occasion?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  specialRequests?: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  createdAt: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  status: "Open Now" | "Closing Soon" | "Closed";
  hasDriveThru: boolean;
  hasOutdoorSeating: boolean;
  deliveryRadiusKm: number;
  rating: number;
  coordinates: { lat: number; lng: number };
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  productName?: string;
  verified: boolean;
  likes: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export interface ActiveView {
  page: "home" | "menu" | "about" | "locations" | "gallery" | "deals" | "blog" | "loyalty";
}
