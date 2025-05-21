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
  isLatest? :boolean;

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