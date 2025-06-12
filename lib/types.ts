export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: Category;
  subcategory: string;
  compatibility?: string[];
  features?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isLatest?: boolean;

}

export type Category =
  | "chargers"
  | "cables"
  | "audio"
  | "protection"
  | "accessories"
  | "adapters"
  | "gaming"
  | "mobile"
  | "sim"
  | "powerbanks";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CategoryInfo {
  name: string;
  slug: Category;
  description: string;
  image: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}


export interface LocationData {
  address: string;
  lat: number;
  lon: number;
  type?: 'current' | 'search' | 'saved';
  label?: string;
  id?: string;
}

export interface FormLocationData {
  receiverName?: string;
  receiverPhone?: string;
  addressType?: string;
  area?: string;
  completeAddress?: string;
  sector?: string;
  landmark?: string;
  pincode?: string;
}

export interface LocationSearchProps {
  onLocationSelected: (location: LocationData) => void;
  currentLocation?: LocationData | null;
}

export interface OrderResponse {
  id: string;
  txnId: string;
  orderKey: string;
  userId: string;
  amount: number;
  status: string;
  productInfo: any[]; // Replace with actual type if known
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    firstName: string;
    email: string;
    phone?: string | null;
  };
}