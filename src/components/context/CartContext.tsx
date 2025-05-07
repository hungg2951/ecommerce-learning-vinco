"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Swal from "sweetalert2";

interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearCart: () => void;
  decrease: (id: number) => void;
  inscrease: (id: number) => void;
  remove: (id: number) => void;
  countItemCart: () => number;
  getTotalPrice: () => number;
  cartItems: TCartItem[];
  addToCart: (payload: TCartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (payload: TCartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === payload.id);
      if (existing) {
        return prev.map((i) =>
          i.id === payload.id
            ? { ...i, quantity: i.quantity! + payload.quantity! }
            : i
        );
      }
      return [...prev, payload];
    });
  };

  const decrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity! - 1) }
          : item
      )
    );
  };

  const inscrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity! + 1 } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total: number, item: TCartItem) => {
      return total + parseFloat(item.price) * item.quantity!;
    }, 0);
  };

  const remove = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const clearCart = () => setCartItems([]);

  const countItemCart = () => {
    return cartItems.reduce((count, item) => count + item.quantity!, 0);
  };

  const value = {
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    cartItems,
    addToCart,
    countItemCart,
    inscrease,
    decrease,
    remove,
    clearCart,
    getTotalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
