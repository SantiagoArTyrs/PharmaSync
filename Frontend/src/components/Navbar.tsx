// src/components/Navbar.tsx
import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      
      {/* Logo */}
      <div className="text-2xl font-bold">
        PharmaSync
      </div>

      {/* Menú central */}
      <ul className="flex space-x-8 text-sm font-medium">
        <li><a href="/dashboard" className="hover:text-blue-200">Inicio</a></li>
        <li><a href="/interacciones" className="hover:text-blue-200">Interacciones</a></li>
        <li><a href="/preguntas" className="hover:text-blue-200">Preguntas</a></li>
        <li><a href="/perfil" className="hover:text-blue-200">Perfil</a></li>
      </ul>

      {/* Chat + Cerrar sesión */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded hover:bg-blue-500">
          <FiMessageSquare size={22} />
        </button>
        <button
          onClick={handleLogout}
          className="text-sm hover:underline"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
