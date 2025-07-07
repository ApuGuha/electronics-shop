import { createContext, useContext, useState, useEffect, useRef } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const didLoadFromStorage = useRef(false); // flag to avoid early saving

  // Load cart from localStorage
  useEffect(() => {
    let loadedCart = [];

    try {
      if (userId) {
        const guestCart = JSON.parse(localStorage.getItem("cart"));
        const userCart = JSON.parse(localStorage.getItem(`cart-${userId}`));

        if (guestCart?.length > 0 && (!userCart || userCart.length === 0)) {
          localStorage.setItem(`cart-${userId}`, JSON.stringify(guestCart));
          localStorage.removeItem("cart");
          loadedCart = guestCart;
        } else {
          loadedCart = userCart || [];
        }
      } else {
        loadedCart = JSON.parse(localStorage.getItem("cart")) || [];
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }

    setCartItems(loadedCart);
    didLoadFromStorage.current = true;
    setLoading(false); // ✅ ready to render
  }, [userId]);

  // Save cart to localStorage
  useEffect(() => {
    if (!didLoadFromStorage.current) return;
    const key = userId ? `cart-${userId}` : "cart";
    try {
      localStorage.setItem(key, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems, userId]);

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
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity:
            Number(updatedItems[existingIndex].quantity) +
            Number(product.quantity),
        };
        return updatedItems;
      } else {
        return [...prev, { ...product, quantity: Number(product.quantity) }];
      }
    });
  };

  const removeFromCart = (productId, color, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === productId &&
            item.color === color &&
            item.size === size
          )
      )
    );
  };

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
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
