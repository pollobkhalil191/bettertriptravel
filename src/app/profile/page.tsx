"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  interface user {
    business_name: string;
    email: string;
    phone: string;
    birthday: string;
    bio: string;
    address: string;
    city: string;
    country: string;
    zip_code: string;
  }

  const [user, setUser] = useState<user | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false); // State for toggling edit mode
  const [updatedUserInfo, setUpdatedUserInfo] = useState<user | null>(null); // For storing updated values
  const router = useRouter(); // Router for navigation

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://btt.triumphdigital.co.th/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 1 && response.data.data) {
          setUser(response.data.data);
          setUpdatedUserInfo(response.data.data); // Initialize the updated user info state
        } else {
          setError("Failed to fetch user information.");
        }
      } catch {
        setError("Failed to fetch user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("You are already logged out.");
      router.push("/login");
      return;
    }

    try {
      await axios.post(
        "https://btt.triumphdigital.co.th/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove token from localStorage
      localStorage.removeItem("access_token");

      // Redirect to login page
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUserInfo((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token || !updatedUserInfo) {
      alert("Unable to save changes. Please try again.");
      return;
    }

    try {
      console.log("Sending request with token:", token); // Log token before sending request
      console.log("Updated User Info:", updatedUserInfo); // Log the payload

      const response = await axios.post(
        "https://btt.triumphdigital.co.th/api/auth/me",
        updatedUserInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response); // Log the response for debugging

      if (response.data.status === 1) {
        setUser(updatedUserInfo); // Update displayed user info
        setIsEditing(false); // Switch back to view mode
        alert("Profile updated successfully.");
      } else {
        alert(`Failed to update profile. Status: ${response.data.status}`);
      }
    } catch (err: any) {
      console.error("Error updating profile:", err.response || err); // Log the full error for debugging
      alert("Error updating profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg text-gray-700">No user data available.</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Profile</h2>
          <p className="mt-2 text-sm text-blue-200">
            Welcome, {user.business_name}
          </p>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="block py-2 px-6 font-gt-easti font-light text-sm hover:bg-blue-800 rounded-md"
              >
                Overview
              </a>
            </li>
            <li>
              <button
                onClick={handleEditToggle}
                className="block py-2 px-6 font-gt-easti font-light text-sm hover:bg-blue-800 rounded-md"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </li>
            <li>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full text-left block py-2 px-6 font-gt-easti font-light text-sm hover:bg-blue-800 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            User Information
          </h2>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <label className="text-sm text-gray-500">Business Name</label>
                  <input
                    type="text"
                    name="business_name"
                    value={user.business_name}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 text-lg border rounded-lg"
                  />
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 text-lg border rounded-lg"
                  />
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <label className="text-sm text-gray-500">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 text-lg border rounded-lg"
                  />
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <label className="text-sm text-gray-500">Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    value={user.birthday}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 text-lg border rounded-lg"
                  />
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <label className="text-sm text-gray-500">Bio</label>
                  <input
                    type="text"
                    name="bio"
                    value={user.bio}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 text-lg border rounded-lg"
                  />
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <label className="text-sm text-gray-500">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 text-lg border rounded-lg"
                  />
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <label className="text-sm text-gray-500">City</label>
                  <input
                    type="text"
                    name="city"
                    value={user.city}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 text-lg border rounded-lg"
                  />
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <label className="text-sm text-gray-500">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={user.country}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 text-lg border rounded-lg"
                  />
                </div>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <label className="text-sm text-gray-500">Zip Code</label>
                  <input
                    type="text"
                    name="zip_code"
                    value={user.zip_code}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 text-lg border rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Business Name</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.business_name}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.email}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.phone}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Birthday</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.birthday}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Bio</p>
                <p className="text-lg font-medium text-gray-900">{user.bio}</p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.address}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">City</p>
                <p className="text-lg font-medium text-gray-900">{user.city}</p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Country</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.country}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Zip Code</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.zip_code}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
