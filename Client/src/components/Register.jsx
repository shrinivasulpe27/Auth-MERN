import React, { useState } from 'react';
import { register as apiRegister } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Student', // default role
  });
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await apiRegister(form); // sends role as well
      setDone(true);
    } catch (e) {
      setError(e?.response?.data?.error || 'Register failed');
    } finally {
      setPending(false);
    }
  };

  if (token) return <Navigate to="/" replace />;
  if (done) return <Navigate to="/login" replace />;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 shadow rounded space-y-4 w-96 mx-auto"
    >
      <h2 className="text-2xl font-bold">Register</h2>
      <input
        name="username"
        type="text"
        placeholder="Username"
        className="input"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="input"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input"
        onChange={handleChange}
        required
      />

      {/* ✅ Role Selection */}
      <select
        name="role"
        className="input"
        value={form.role}
        onChange={handleChange}
        required
      >
        <option value="Student">Student</option>
        <option value="Admin">Admin</option>
      </select>

      <button
        disabled={pending}
        className="bg-blue-600 text-white py-2 px-4 rounded w-full disabled:opacity-50"
      >
        {pending ? 'Please wait…' : 'Register'}
      </button>

      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
