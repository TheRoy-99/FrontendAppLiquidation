import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor ingresa email y contraseña");
      return;
    }
    console.log("🔑 Login con:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-full text-2xl">
            🔑
          </div>
          <h2 className="text-2xl font-bold mt-4 text-gray-800">Iniciar Sesión</h2>
          <p className="text-gray-500 text-sm">Accede a tu cuenta</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="usuario@ejemplo.com"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="flex justify-between text-sm mt-4">
          <Link to="/forgot-password" className="text-primary hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
          <Link to="/register" className="text-primary hover:underline">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
