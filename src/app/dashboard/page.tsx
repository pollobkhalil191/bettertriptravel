// pages/dashboard.tsx
"use client"; // Mark this file as a client component
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export interface User {
  id: string;

  email: string;

  firstName: string; // added firstName property

  // other properties
}

const DashboardPage: React.FC = () => {
  const { user, token, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      // Redirect to login page if not authenticated
      window.location.href = "/login";
    }
  }, [token]);

  return (
    <div className="p-8">
      {user ? (
        <>
          <h2 className="text-3xl font-bold mb-4">
            Welcome, {user.firstName}!
          </h2>
          <button
            onClick={logout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DashboardPage;
