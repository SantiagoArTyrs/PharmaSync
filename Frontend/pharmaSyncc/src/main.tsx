// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App'; // Tu dashboard
import Login from './pages/Login';
import Register from './pages/Register';
import Recover from './pages/Recover';

const isAuthenticated = () => {
  return !!localStorage.getItem('user'); // Simulación simple de login
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/dashboard" element={isAuthenticated() ? <App /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
