import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';

const Recover = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">Recuperar contraseña 🔐</h2>
        <form className="space-y-5">
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg transition"
          >
            Enviar enlace
          </button>
        </form>
        <p className="text-sm text-center mt-5 text-gray-600">
          <Link to="/" className="text-purple-600 hover:underline">Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
};

export default Recover;
