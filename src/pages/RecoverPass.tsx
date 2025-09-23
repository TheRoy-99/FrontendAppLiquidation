import { useState } from "react";
import logo from "../assets/logo2.png";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth";

interface RecoverPassProps {
  onBackToLogin: () => void;
}

export default function RecoverPass({ onBackToLogin }: RecoverPassProps) {
  const [email, setEmail] = useState("");
  const { recover, loading } = useAuth();

  const handleRecover = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    recover(email);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mt-4 text-gray-800 text-center">
            Recuperar contraseña
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Ingresa tu correo y te enviaremos un enlace
          </p>
        </div>

        <form onSubmit={handleRecover} className="space-y-4">
          <InputField
            label="Correo"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition font-medium text-sm"
          >
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onBackToLogin}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
}
