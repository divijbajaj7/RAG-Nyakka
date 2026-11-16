export type ProductCategory = 'beauty' | 'skincare' | 'personal_care';

export interface ShadeVariant {
  name: string;
  colorHex: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  skinType?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  subtitle: string;
  category: ProductCategory;
  collections: string[]; // e.g. ['best-sellers', 'editor-picks', 'trending']
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number; // e.g. 4.8
  reviewCount: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  image: string;
  badge?: string; // unboxed text indicator e.g. "Best Seller" or "Nykaa Choice"
  description: string;
  sizeOrVolume: string;
  shades?: ShadeVariant[];
  selectedShade?: string;
  keyIngredients: string[];
  benefits: string[];
  reviews: ReviewItem[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
}
