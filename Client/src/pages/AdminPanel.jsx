import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminPanel() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="text-lg text-gray-700 mb-4">Welcome, {user?.username}!</p>

      <div className="space-y-2">
        <div className="p-4 bg-green-100 rounded border border-green-300">
          <p className="text-green-800">Manage Users</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded border border-yellow-300">
          <p className="text-yellow-800">View System Logs</p>
        </div>
        <div className="p-4 bg-red-100 rounded border border-red-300">
          <p className="text-red-800">Access Settings</p>
        </div>
      </div>
    </div>
  );
}
