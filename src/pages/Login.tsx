import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LogoIglesia.png";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth";
import { FiLock, FiMail } from "react-icons/fi";

interface LoginProps {
  onForgotPassword: () => void;
}

export default function Login({ onForgotPassword }: LoginProps) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  //Si el usuario ya tiene sesión, redirigir automáticamente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else if (user.role === "USER") navigate("/user/dashboard");
    }
  }, [navigate]);

  // Manejo de inicio de sesión
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) return;

    try {
      const userData = await login(loginData.email, loginData.password);

      //Redirección según rol
      if (userData?.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (userData?.role === "USER") {
        navigate("/user/dashboard");
      }
    } catch (error) {
      // Ya se maneja con alertError desde useAuth
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] flex items-center justify-center px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8 transition-transform hover:-translate-y-1 duration-300">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Logo de la aplicación"
            className="w-24 h-24 object-contain"
          />
          <h2 className="text-xl sm:text-2xl font-bold mt-4 text-primary text-center">
            App de Liquidación
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Sistema de liquidación de recibos públicos
          </p>
        </div>

        {/* Formulario de login */}
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="usuario@gmail.com"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            icon={<FiMail size={18} />}
          />
          <InputField
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            icon={<FiLock size={18} />}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-lg transition-all duration-300 text-white py-2.5 rounded-md font-medium text-sm"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <button
            onClick={onForgotPassword}
            className="text-primary hover:text-blue-800 text-sm font-medium"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}
