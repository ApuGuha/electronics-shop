import { createContext, useContext, useState } from "react";



const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({children}) => {
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

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const matched = users.find((u) => u.email === email && u.password === password);
        if (!matched) throw new Error('Invalid email or password');

        setUser(matched);
        localStorage.setItem('loggedInUser', JSON.stringify(matched));
    };

    const logout = () =>{
        if (user?.email) {
            localStorage.removeItem(`cart_${user.email}`);
            localStorage.removeItem(`wishlist_${user.email}`);
        }
        localStorage.removeItem('redirectAfterLogin'); // reset here
        setUser(null);
        localStorage.removeItem('loggedInUser');

    }

    return(
        <AuthContext.Provider value={{user, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}