import { useState } from "react";
import { FiMail } from "react-icons/fi";
import InputField from "../components/InputField";
import logo from "../assets/LogoIglesia.png";
import { useAuth } from "../hooks/useAuth";

interface RecoverPassProps {
  onBackToLogin: () => void;
}

export default function RecoverPass({ onBackToLogin }: RecoverPassProps) {
  const [email, setEmail] = useState("");
  const { recover, loading } = useAuth();

  const handleRecover = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    await recover(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] flex items-center justify-center px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8 transition-transform hover:-translate-y-1 duration-300">

        {/* Header con logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo de la aplicación" className="w-24 h-24 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-primary text-center">
            Recuperar contraseña
          </h2>
          <p className="text-gray-500 text-sm text-center mt-1">
            Ingresa tu correo y te enviaremos un enlace
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleRecover} className="space-y-4">
          <InputField
            label="Correo"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<FiMail size={18} />}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-lg transition-all duration-300 text-white py-2.5 rounded-md font-medium text-sm"
          >
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        {/* Volver */}
        <div className="mt-4 text-center">
          <button
            onClick={onBackToLogin}
            className="text-primary hover:text-blue-800 text-sm font-medium"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
}
