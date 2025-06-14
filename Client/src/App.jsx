import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login      from './components/Login';
import Register   from './components/Register';
import Protected  from './routes/ProtectedRoute';
import RequireRole from './routes/RequireRole';

import Home        from './pages/Home';          // make simple component
import AdminPanel  from './pages/AdminPanel';
import Unauthorized from './pages/Unauthorized';


export default function App() {
  return (
    <Router>
     
      <Navbar/>
      <Routes>
        <Route path="/login"    element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>

        {/* Protected block */}
        <Route element={<Protected/>}>
          <Route path="/" element={<Home/>}/>
          {/* Role-gated */}
          <Route element={<RequireRole allowed={['Admin']}/>}>
            <Route path="/admin" element={<AdminPanel/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
