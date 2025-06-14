import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded text-center space-y-4">
        <h1 className="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
        <p className="text-gray-700">You do not have permission to access this page.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
