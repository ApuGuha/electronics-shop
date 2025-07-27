import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children, userId }) => {
  const storageKey = userId ? `wishlist_${userId}` : "guest_wishlist";

  const [wishList, setWishList] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishList));
  }, [wishList, storageKey]);

  // Reset wishlist when userId changes (e.g., login/logout)
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    setWishList(stored ? JSON.parse(stored) : []);
  }, [storageKey]);

  const addToWishList = (product) => {
    setWishList((prev) =>
      prev.find((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (productId) => {
    setWishList((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishList.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishList, addToWishList, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
