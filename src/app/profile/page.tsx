// src/app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null); // Store user info
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserInfo = async () => {
        const token = localStorage.getItem('access_token');
        console.log('Token:', token); // Log token to check if it's correct

        if (!token) {
        setError('User not authenticated.');
        setLoading(false);
        return;
        }

        try {
            const response = await axios.get('https://btt.triumphdigital.co.th/api/auth/me', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log('API Response:', response); // Log full response
          
            if (response.data.status === 1 && response.data.data) {
              setUser(response.data.data);
            } else {
              setError('Failed to fetch user information.11');
            }
          } catch (err: any) {
            console.error('Error fetching user data:', err); // Log any errors
            setError('Failed to fetch user information.22');
          } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

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
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">Dashboard</h1>
      <div className="space-y-4">
        <p><strong>Business Name:</strong> {user.business_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Birthday:</strong> {user.birthday}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Address 2:</strong> {user.address2}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <p><strong>Zip Code:</strong> {user.zip_code}</p>
      </div>
    </div>
  );
};

export default Dashboard;

