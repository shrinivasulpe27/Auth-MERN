import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login    = body => api.post('/auth/login', body).then(r => r.data);      // {token, user}
export const register = body => api.post('/auth/register', body).then(r => r.data);    // {message}
export const me       = ()   => api.get('/auth/me').then(r => r.data);                // {user}
