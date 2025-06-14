import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { token, loading } = useAuth();
  if (loading) return null;         // or spinner
  return token ? <Outlet/> : <Navigate to="/login" replace/>;
}
