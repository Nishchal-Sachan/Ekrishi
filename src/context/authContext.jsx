import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // Check localStorage for user data or initialize as null
    const [currUser, setCurrUser] = useState(
        () => JSON.parse(localStorage.getItem("user")) || null
    );

    // Function to update current user
    const updateUser = (data) => {
        setCurrUser(data);
    };

    // Function to log out the user
    const logout = () => {
        setCurrUser(null);
        localStorage.removeItem("user"); // Clear user from localStorage
    };

    useEffect(() => {
        // Store user data in localStorage whenever it changes
        if (currUser) {
            localStorage.setItem("user", JSON.stringify(currUser));
        } else {
            localStorage.removeItem("user"); // Clear user from localStorage when logged out
        }
    }, [currUser]);

    // Extract token if it exists in the currUser
    const token = currUser?.token || null;

    return (
        <AuthContext.Provider value={{ currUser, updateUser, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};
