// types/global.d.ts
export {};

declare global {
  interface TProduct {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category?: string;
    featured?: boolean;
    isNew?: boolean;
    onSale?: boolean;
    rating: string;
    reviewCount: number;
    originalPrice: string | null;
  }
}
