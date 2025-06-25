import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({children, userId}) => {

    const [wishList, setWishList] = useState([]);

    // load from localstorage

    useEffect(()=>{
        if(userId)
        {
            const stored = localStorage.getItem(`wishlist-${userId}`);
            setWishList(stored? JSON.parse(stored) : []);
        }
        else
        {
            setWishList([]);
        }
    }, [userId]);

    // Save to localStorage
    useEffect(() => {
        if (userId) {
        localStorage.setItem(`wishlist-${userId}`, JSON.stringify(wishList));
        }
    }, [wishList, userId]);

    const addToWishList = (product) => {
        setWishList((prev)=>
            prev.find((p)=> p.id === product.id) ? prev : [...prev, product]
        )
    }

    const removeFromWishlist = (productId) =>{
        setWishList((prev) => prev.filter((p) => p.id !== productId));
    }

    const isInWishlist = (productId) => {
    return wishList.some((item) => item.id === productId);
    };

    return(
        <WishlistContext.Provider value={{wishList, addToWishList, removeFromWishlist, isInWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}