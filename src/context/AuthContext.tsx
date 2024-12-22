"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type User = {
  email: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isModalOpen: boolean; // Add modal state here
  openModal: () => void; // Function to open modal
  closeModal: () => void; // Function to close modal
};

type AxiosError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const router = useRouter();

  useEffect(() => {
    // Check for existing token in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setUser({ email: "", token }); // Populate user based on token
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.get(
        `https://btt.triumphdigital.co.th/api/auth/login?email=${email}&password=${password}&device_name=Desktop`
      );

      const token = response.data.token;
      setUser({ email, token });
      localStorage.setItem("authToken", token);

      // Redirect to the home page or dashboard
      router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Login failed:", axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || "Login failed.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  // Modal control functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AuthContext.Provider value={{ user, login, logout, isModalOpen, openModal, closeModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
