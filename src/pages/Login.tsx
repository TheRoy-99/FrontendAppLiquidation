import { useState } from "react";
import logo from "../assets/logo2.png";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth";

interface LoginProps {
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export default function Login({ onSwitchToRegister, onForgotPassword }: LoginProps) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { login, loading } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(loginData.email, loginData.password);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-sm sm:max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mt-4 text-gray-800 text-center">
            App Liquidation
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Sistema de liquidación de ayudas
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <InputField
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition font-medium text-sm"
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <button
            onClick={onForgotPassword}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Switch to Register */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ¿No tienes cuenta?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
