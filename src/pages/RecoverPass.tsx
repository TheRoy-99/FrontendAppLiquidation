import { useState } from "react";
import logo from "../assets/logo2.png";
import axios from "axios";

export default function RecoverPass() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("📧 Enviando correo de recuperación a:", email);

     await axios.post("/auth/recover", { email });

    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <h2 className="text-xl font-bold mt-4 text-gray-800 text-center">
            Recuperar Contraseña
          </h2>
          <p className="text-gray-500 text-sm text-center px-2">
            Ingresa tu email para recibir un enlace de recuperación
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email registrado
              </label>
              <input
                type="email"
                placeholder="usuario@ejemplo.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Enviar enlace
            </button>
          </form>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-blue-700 text-sm">
              📩 Si tu correo está registrado, recibirás un enlace para recuperar tu contraseña.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
