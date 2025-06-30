import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, userId }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load from localStorage
  useEffect(() => {
    if (userId) {
      const stored = localStorage.getItem(`cart-${userId}`);
      setCartItems(stored ? JSON.parse(stored) : []);
    } else {
      const userStored = localStorage.getItem('cart');
      setCartItems(userStored ? JSON.parse(userStored) : []);
    }
  }, [userId]);

  // Save to localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cart-${userId}`, JSON.stringify(cartItems));
    }
    else
    {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  // Add to cart logic
  const addToCart = (product) => {
  setCartItems((prev) => {
    const existingIndex = prev.findIndex(
      (item) =>
        item.id === product.id &&
        item.color === product.color &&
        item.size === product.size
    );

    if (existingIndex !== -1) {
      const updatedItems = [...prev];

      // Make sure both values are numbers!
      const existingQty = Number(updatedItems[existingIndex].quantity);
      const incomingQty = Number(product.quantity);

      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: existingQty + incomingQty,
      };

      return updatedItems;
    } else {
      // Defensive copy with correct quantity
      return [...prev, { ...product, quantity: Number(product.quantity) }];
    }
  });
};


  // ✅ Remove based on id + color + size
  const removeFromCart = (productId, color, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === productId && item.color === color && item.size === size)
      )
    );
  };

  // ✅ Update quantity based on id + color + size
  const updateQuantity = (productId, color, size, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
