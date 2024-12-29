// src/app/change-password/page.tsx
'use client';

import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { changePassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(oldPassword, newPassword);
      alert('Password changed successfully');
    } catch (error) {
      alert('Failed to change password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            className="w-full p-2 border border-gray-300 rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full p-2 border border-gray-300 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
