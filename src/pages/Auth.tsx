import { useState } from "react";
import logo from "../assets/logo2.png";
import InputField from "../components/InputField";

enum AuthTab {
  LOGIN = "login",
  REGISTER = "register",
}

export default function Auth() {
  const [activeTab, setActiveTab] = useState<AuthTab>(AuthTab.LOGIN);

  // Estado Login
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Estado Register
  const [registerData, setRegisterData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login con:", loginData);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("📝 Registro con:", registerData);
  };

  const goToForgotPassword = () => {
    console.log("🔄 Ir a recuperar contraseña");
    // Aquí navegarías a la página de recuperar contraseña
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

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab(AuthTab.LOGIN)}
            className={`flex-1 py-2 text-sm font-medium transition ${
              activeTab === AuthTab.LOGIN
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setActiveTab(AuthTab.REGISTER)}
            className={`flex-1 py-2 text-sm font-medium transition ${
              activeTab === AuthTab.REGISTER
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Formularios */}
        {activeTab === AuthTab.LOGIN && (
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

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={goToForgotPassword}
                  className="text-xs text-blue-600 hover:text-blue-700 transition"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition font-medium text-sm"
            >
              Iniciar Sesión
            </button>

            <div className="bg-gray-50 rounded-md p-3 text-xs text-center text-gray-600">
              <span className="font-medium">Demo:</span> admin@demo.com / usuario@demo.com <br />
              <span className="font-medium">Contraseña:</span> demo1234
            </div>
          </form>
        )}

        {activeTab === AuthTab.REGISTER && (
          <form onSubmit={handleRegister} className="space-y-4">
            <InputField
              label="Nombre completo"
              type="text"
              placeholder="Juan Pérez"
              value={registerData.nombre}
              onChange={(e) =>
                setRegisterData({ ...registerData, nombre: e.target.value })
              }
            />
            <InputField
              label="Email"
              type="email"
              placeholder="usuario@ejemplo.com"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <InputField
              label="Teléfono"
              type="tel"
              placeholder="3001234567"
              value={registerData.telefono}
              onChange={(e) =>
                setRegisterData({ ...registerData, telefono: e.target.value })
              }
            />
            <InputField
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <InputField
              label="Confirmar contraseña"
              type="password"
              placeholder="••••••••"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition font-medium text-sm"
            >
              Registrarse
            </button>

            <p className="text-xs text-gray-500 text-center">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => setActiveTab(AuthTab.LOGIN)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Inicia sesión aquí
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
