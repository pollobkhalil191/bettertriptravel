
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define a type for the user object based on your API response
interface User {
  id: number;
  name: string;
  email: string;
  // Add other fields as per your API response
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://btt.triumphdigital.co.th/api/auth/login', {
        email,
        password,
        device_name: 'Desktop',
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user); // Make sure the user response is correctly typed
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://btt.triumphdigital.co.th/api/auth/register', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user); // Ensure this is typed correctly
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://btt.triumphdigital.co.th/api/auth/change-password',
        { old_password: oldPassword, new_password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('https://btt.triumphdigital.co.th/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data); // Ensure this response is typed correctly
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, changePassword, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
