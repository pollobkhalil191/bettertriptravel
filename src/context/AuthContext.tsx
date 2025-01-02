// context/AuthContext.tsx

"use client"; // Mark this file as a client component

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../app/types/user"; // Import the User type

interface AuthContextType {
  user: User | null; // Use the specific User type
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Set the User or null
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (userData: { user: User; token: string }) => void; // Login function now expects userData with the correct type
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Use User type for state
  const [token, setToken] = useState<string | null>(null);

  const login = (userData: { user: User; token: string }) => {
    setUser(userData.user); // Set the user with the expected type
    setToken(userData.token); // Set the token
  };

  const logout = () => {
    setUser(null); // Clear user data
    setToken(null); // Clear token
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
