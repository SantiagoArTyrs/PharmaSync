import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Crear cuenta 📝</h2>
        <form className="space-y-5">
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition"
          >
            Registrarse
          </button>
        </form>
        <p className="text-sm text-center mt-5 text-gray-600">
          ¿Ya tienes cuenta? <Link to="/" className="text-green-600 hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
