import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username}!</h1>
      <p className="text-lg text-gray-700">You are logged in as <strong>{user?.role}</strong>.</p>

      {/* Example conditional content */}
      {user?.role === 'Admin' && (
        <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded">
          <p className="text-blue-800">You have access to the admin dashboard.</p>
        </div>
      )}
    </div>
  );
}
