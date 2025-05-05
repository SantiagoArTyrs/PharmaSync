import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('user', email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Bienvenido de nuevo 👋</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="text-sm text-center mt-5 text-gray-600 space-y-2">
          <p>
            ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate</Link>
          </p>
          <p>
            ¿Olvidaste tu contraseña? <Link to="/recover" className="text-blue-600 hover:underline">Recupérala</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
