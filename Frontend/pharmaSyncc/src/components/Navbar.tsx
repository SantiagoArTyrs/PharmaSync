// src/components/Navbar.tsx
import React from 'react';
import { FiMessageSquare } from 'react-icons/fi'; // icono de chat

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-2xl font-semibold">
        PharmaSync
      </div>

      {/* Links */}
      <ul className="flex space-x-8">
        <li>
          <a href="/" className="hover:text-blue-200">Inicio</a>
        </li>
        <li>
          <a href="/interacciones" className="hover:text-blue-200">Interacciones</a>
        </li>
        <li>
          <a href="/preguntas" className="hover:text-blue-200">Preguntas</a>
        </li>
        <li>
          <a href="/perfil" className="hover:text-blue-200">Perfil</a>
        </li>
      </ul>

      {/* Icono de chat */}
      <button className="p-2 rounded hover:bg-blue-500">
        <FiMessageSquare size={24} />
      </button>
    </nav>
  );
};

export default Navbar;
