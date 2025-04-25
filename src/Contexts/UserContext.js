import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    // Retrieve the login state from localStorage on initialization
    const savedState = localStorage.getItem('userLoggedIn');
    return savedState === 'true'; // Convert string to boolean
  });

  useEffect(() => {
    // Save the login state to localStorage whenever it changes
    localStorage.setItem('userLoggedIn', userLoggedIn);
  }, [userLoggedIn]);

  return (
    <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};