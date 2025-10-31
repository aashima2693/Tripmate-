import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context object
export const StoreContext = createContext();

// 2. Create the Provider component
// This component will wrap the whole application (usually in App.jsx or main.jsx)
export const StoreProvider = ({ children }) => {
    // Example State: Authentication and User Details
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    
    // Example State: Cart or Application-specific data (e.g., loan status)
    const [cartCount, setCartCount] = useState(0);
    
    // Example function to manage login/logout
    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        // In a real app, you'd handle tokens and API calls here
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        // Clear tokens/session data
    };

    // The value object contains all data and functions you want to expose
    const contextValue = {
        isLoggedIn,
        user,
        cartCount,
        login,
        logout,
        setCartCount,
        // ... add any other global state or actions here
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};