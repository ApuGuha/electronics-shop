import { createContext, useContext, useState } from "react";
// import { useCart } from "./CartContext";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({children}) => {
    
    // const { setCartItems } = useCart();
    const [user, setUser] = useState(()=>{
        const stored = localStorage.getItem('loggedInUser');
        return stored ? JSON.parse(stored) : null;
    });

    const register = (name,email,password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.find((u) => u.email === email);
        if(userExists) throw new Error('User already exists');

        const newUser = {name, email, password};
        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));
        // setUser(newUser);
        // localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    }

    const login = (email,password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const matched = users.find((u) => u.email === email && u.password === password);
        if(!matched) throw new Error('Invalid email or password');

        setUser(matched);
        localStorage.setItem('loggedInUser', JSON.stringify(matched));
        // Check if guest cart exists
        const guestCart = JSON.parse(localStorage.getItem("cart"));

        if (guestCart && guestCart.length > 0) {
            localStorage.setItem(`cart-${user.email}`, JSON.stringify(guestCart));

            // Optional: remove guest cart
            localStorage.removeItem("cart");
            // setCartItems(guestCart);
        }
        else {
            const existing = JSON.parse(localStorage.getItem(`cart-${user.email}`)) || [];
            // setCartItems(existing);
        }
    }

    const logout = () =>{
        setUser(null);
        localStorage.removeItem('loggedInUser');
    }

    return(
        <AuthContext.Provider value={{user, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}