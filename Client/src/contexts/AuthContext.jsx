import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,   setUser]   = useState(() => JSON.parse(localStorage.getItem('user')));
  const [token,  setToken]  = useState(() => localStorage.getItem('token'));
  const [loading,setLoading]= useState(true);

  /* ---------- helpers ---------- */
  const handleLogin  = async (creds) => {
    const { token, user } = await authApi.login(creds);
    localStorage.setItem('token', token);
    localStorage.setItem('user',  JSON.stringify(user));
    setToken(token); setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null); setUser(null);
  };

  /* ---------- fetch user on first load (if token exists) ---------- */
  useEffect(() => {
    if (!token) { setLoading(false); return; }
    authApi.me()
      .then(({ user }) => setUser(user))
      .catch(() => handleLogout())   // token invalid
      .finally(() => setLoading(false));
  }, [token]);

  const value = { user, token, loading, login:handleLogin, logout:handleLogout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
