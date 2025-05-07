// types/global.d.ts
export {};

declare global {
  interface TCartItem {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
    quantity?: number;
  }
}
