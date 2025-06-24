import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({children}) => {

    const [wishList, setWishList] = useState([]);

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