import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {user?.role === 'Admin' && <Link to="/admin" className="hover:underline">Admin</Link>}
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          <span className="italic">Hello, {user.username}</span>
          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
        </div>
      ) : (
        <div className="space-x-2">
          <Link to="/login"    className="underline">Login</Link>
          <Link to="/register" className="underline">Register</Link>
        </div>
      )}
    </nav>
  );
}
