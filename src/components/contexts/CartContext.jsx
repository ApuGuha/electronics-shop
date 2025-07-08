import { createContext, useContext, useState, useEffect, useRef } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, userId }) => {
  console.log(userId);
  const [cartItems, setCartItems] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const didLoad = useRef(false);
  const previousUserId = useRef(userId);

  // 🧠 Load cart data
  const loadCart = (currentUserId) => {
    try {
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      
      if (currentUserId) {
        // User is logged in
        const userCart = JSON.parse(localStorage.getItem(`cart-${currentUserId}`)) || [];
        
        if (guestCart.length > 0 && userCart.length === 0) {
          // Migrate guest cart to user cart
          localStorage.setItem(`cart-${currentUserId}`, JSON.stringify(guestCart));
          localStorage.removeItem("cart");
          setCartItems(guestCart);
        } else {
          // Load existing user cart
          setCartItems(userCart);
        }
      } else {
        // Guest user or userId not yet determined
        setCartItems(guestCart);
      }

      didLoad.current = true;
      setHasLoaded(true);
    } catch (err) {
      console.error("❌ Failed to load cart:", err);
      setHasLoaded(true); // Set loaded even on error to prevent infinite loading
    }
  };

  // 🧠 Load cart on mount and when userId changes
  useEffect(() => {
    // Always load cart, even if userId is undefined (treat as guest)
    loadCart(userId);
    previousUserId.current = userId;
  }, [userId]);

  // Handle migration when user logs in (userId changes from null to actual value)
  useEffect(() => {
    if (previousUserId.current === null && userId && didLoad.current) {
      // User just logged in, migrate cart if needed
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      const userCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
      
      if (guestCart.length > 0 && userCart.length === 0) {
        localStorage.setItem(`cart-${userId}`, JSON.stringify(guestCart));
        localStorage.removeItem("cart");
        setCartItems(guestCart);
      } else if (userCart.length > 0) {
        setCartItems(userCart);
      }
    }
    previousUserId.current = userId;
  }, [userId]);

  // 🔄 Save cart after it's been loaded
  useEffect(() => {
    if (!didLoad.current) return;
    
    const key = userId ? `cart-${userId}` : "cart";
    try {
      localStorage.setItem(key, JSON.stringify(cartItems));
    } catch (err) {
      console.error("❌ Failed to save cart:", err);
    }
  }, [cartItems, userId]);

  // ➕ Add
  const addToCart = (product) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += Number(product.quantity);
        return updated;
      }

      return [...prev, { ...product, quantity: Number(product.quantity) }];
    });
  };

  // ❌ Remove
  const removeFromCart = (id, color, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  // 🔄 Update
  const updateQuantity = (id, color, size, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    );
  };

  // 🧹 Clear
  const clearCart = () => {
    setCartItems([]);
    const key = userId ? `cart-${userId}` : "cart";
    localStorage.removeItem(key);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading: !hasLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};