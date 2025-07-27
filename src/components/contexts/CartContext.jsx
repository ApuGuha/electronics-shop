import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, userId }) => {
  const storageKey = userId ? `cart_${userId}` : "guest_cart";

  // Load cart from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.size === item.size
      );

      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (id, color, size) => {
    setCartItems((prev) =>
      prev.filter(
        (i) => i.id !== id || i.color !== color || i.size !== size
      )
    );
  };

  const updateQuantity = (id, color, size, quantity) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && i.color === color && i.size === size
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
