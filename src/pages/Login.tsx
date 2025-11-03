import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LogoIglesiaa.png";
import logoBlanco from "../assets/LogoIglesia.png";
import { useAuth } from "../hooks/useAuth";
import { FiLock, FiMail } from "react-icons/fi";


interface LoginProps {
  onForgotPassword: () => void;
}


export default function Login({ onForgotPassword }: LoginProps) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { login, loading } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else if (user.role === "USER") navigate("/user/dashboard");
    }
  }, [navigate]);


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) return;


    try {
      const userData = await login(loginData.email, loginData.password);


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
    <div className="min-h-screen bg-linear-to-br from-[#2563eb] via-[#1e40af] to-[#1e3a8a] flex items-center justify-center px-4 py-6 sm:py-8">

      {/*CONTENEDOR PRINCIPAL - RECTÁNGULO*/}
      <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] sm:min-h-[600px]">

          {/*LADO IZQUIERDO - LOGO Y BIENVENIDA (AZUL)
              Oculto en móvil para mejor experiencia*/}
          <div className="hidden lg:flex bg-linear-to-br from-[#2563eb] via-[#1e40af] to-[#1e3a8a] flex-col items-center justify-center text-white p-12">

            {/* Logo simple - Solo la imagen PNG */}
            <div className="mb-8">
              <img
                src={logo}
                alt="Logo de la aplicación"
                className="w-56 h-56 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Texto de bienvenida */}
            <div className="text-center space-y-3 max-w-sm">
              <h1 className="text-5xl font-bold text-[#ffff] drop-shadow-lg">
                Bienvenido
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Accede al sistema de gestión con tus credenciales registradas.
              </p>
            </div>
          </div>


          {/*LADO DERECHO - PANEL DE LOGIN*/}
          <div className="bg-white flex flex-col justify-center p-6 sm:p-8 lg:p-12">

            {/* 🔹 Logo ARRIBA visible en móvil */}
            <div className="lg:hidden flex justify-center mb-8">
              <img
                src={logoBlanco}
                alt="Logo de la aplicación"
                className="w-32 h-32 object-contain"
              />
            </div>


            {/* Header del formulario */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1976d2] mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-gray-500 text-sm">
                Por favor, ingresa tus credenciales para continuar.
              </p>
            </div>


            {/* Formulario */}
            <form onSubmit={handleLogin} className="space-y-6">

              {/* Campo de Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full px-4 pr-12 py-3.5 border border-gray-300 rounded-lg 
                             focus:border-[#1976d2] focus:ring-2 focus:ring-[#1976d2]/20 
                             outline-none transition-all duration-200
                             bg-gray-50 hover:bg-white
                             text-gray-700 placeholder-gray-400"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-300">
                    <FiMail size={20} />
                  </div>
                </div>
              </div>


              {/* Campo de Contraseña */}
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full px-4 pr-12 py-3.5 border border-gray-300 rounded-lg 
                             focus:border-[#1976d2] focus:ring-2 focus:ring-[#1976d2]/20 
                             outline-none transition-all duration-200
                             bg-gray-50 hover:bg-white
                             text-gray-700 placeholder-gray-400"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-300">
                    <FiLock size={20} />
                  </div>
                </div>
              </div>


              {/* Botón de Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1976d2] hover:bg-[#1565c0] 
                         text-white font-semibold py-4 rounded-lg 
                         shadow-lg hover:shadow-xl 
                         transform hover:-translate-y-0.5 active:translate-y-0 
                         transition-all duration-200 
                         disabled:opacity-70 disabled:cursor-not-allowed 
                         disabled:transform-none
                         focus:outline-none focus:ring-4 focus:ring-[#1976d2]/30"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </form>


            {/* Link de Olvidaste tu contraseña */}
            <div className="mt-6 text-center">
              <button
                onClick={onForgotPassword}
                className="text-[#1976d2] hover:text-[#1565c0] text-sm font-medium 
                         transition-colors duration-200
                         hover:underline focus:outline-none"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>


            {/* Footer decorativo */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-xs text-gray-500">
                Sistema de Liquidación © 2025
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
