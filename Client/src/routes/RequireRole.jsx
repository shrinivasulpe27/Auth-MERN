import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RequireRole({ allowed }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace/>;
  return allowed.includes(user.role) ? <Outlet/> : <Navigate to="/unauthorized" replace/>;
}
