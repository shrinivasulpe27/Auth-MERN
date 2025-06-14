import React,{useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [form,setForm] = useState({email:'',password:''});
  const { token, login } = useAuth();
  const [error,setError] = useState(null);
  const [pending,setPending]=useState(false);

  const handleChange=e=>setForm({...form,[e.target.name]:e.target.value});
  const handleSubmit=async e=>{
    e.preventDefault();
    setError(null); setPending(true);
    try      { await login(form); }
    catch(e) { setError(e?.response?.data?.error || 'Login failed'); }
    finally  { setPending(false); }
  };

  if (token) return <Navigate to="/" replace/>;
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded space-y-4 w-96 mx-auto">
      <h2 className="text-2xl font-bold">Login</h2>
      <input name="email"    type="email"    placeholder="Email"    className="input" onChange={handleChange} required/>
      <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} required/>
      <button disabled={pending} className="bg-green-600 text-white py-2 px-4 rounded w-full disabled:opacity-50">
        {pending ? 'Please wait…' : 'Login'}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
