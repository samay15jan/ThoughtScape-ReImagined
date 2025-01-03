import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import Landing from './Pages/Landing.jsx';
import Auth from './Pages/Auth.jsx';
import Dashboard from './Pages/Dashboard.jsx';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // const userLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
    // setLoggedIn(userLoggedIn);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Landing />} />
        <Route path="/Auth" element={isLoggedIn ? <Navigate to="/" /> : <Auth />} />

        {/* Catch-all route to redirect unauthorized access to Auth */}
        <Route path="*" element={<Navigate to={isLoggedIn ? '/' : '/Auth'} />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
