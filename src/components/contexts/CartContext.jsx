import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children, userId}) => {

    const [cartItems, setCartItems] = useState([]);

    // load from localstorage

    useEffect(()=>{
        if(userId)
        {
            const stored = localStorage.getItem(`cart-${userId}`);
            setCartItems(stored? JSON.parse(stored) : []);
        }
        else
        {
            setCartItems([]);
        }
    }, [userId]);

    // Save to localStorage
    useEffect(() => {
        if (userId) {
        localStorage.setItem(`cart-${userId}`, JSON.stringify(cartItems));
        }
    }, [cartItems, userId]);

    const addToCart = (product) => {
        setCartItems((prev)=>{
            const exisisting = prev.find((item) => item.id === product.id);
            if(exisisting)
            {
                return prev.map((item)=> item.id === product.id ?{...item, quantity: item.quantity +1}  : item);
            }

            return [...prev, {...product, quantity: 1}];
        })
    }

    const removeFromCart = (productId) =>{
        setCartItems((prev) => prev.filter((p)=> p.id !== productId));
    }

    const updatequantity = (productId, quantity) => {
        setCartItems((prev) => prev.map((item)=> item.id === productId ? {...item, quantity} : item))
    }

    const clearCart = () =>{
        setCartItems([]);
    }

    return(
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, updatequantity, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

