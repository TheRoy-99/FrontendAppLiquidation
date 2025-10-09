import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import logo from "../assets/LogoIglesia.png";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth";

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export default function Register({ onSwitchToLogin }: RegisterProps) {
  const [registerData, setRegisterData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  const { register, loading } = useAuth();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ok = await register(
      registerData.nombre,
      registerData.email,
      registerData.telefono,
      registerData.password,
      registerData.confirmPassword
    );

    if (ok) {
      setRegisterData({
        nombre: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
      });
      onSwitchToLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8 transition-transform hover:-translate-y-1 duration-300">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo de la aplicación" className="w-24 h-24 object-contain" />
          <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-primary text-center">
            Registro de usuario
          </h2>
          <p className="text-gray-500 text-sm text-center mt-1">
            Ingresa tus datos para crear una cuenta
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleRegister} className="space-y-4">
          <InputField
            label="Nombre completo"
            type="text"
            placeholder="Juan Pérez"
            value={registerData.nombre}
            onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })}
            icon={<FiUser size={18} />}
          />
          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="usuario@gmail.com"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            icon={<FiMail size={18} />}
          />
          <InputField
            label="Teléfono"
            type="tel"
            placeholder="3001234567"
            value={registerData.telefono}
            onChange={(e) => setRegisterData({ ...registerData, telefono: e.target.value })}
            icon={<FiPhone size={18} />}
          />
          <InputField
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            icon={<FiLock size={18} />}
          />
          <InputField
            label="Confirmar contraseña"
            type="password"
            placeholder="••••••••"
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            icon={<FiLock size={18} />}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-300 text-white py-2.5 rounded-md transition-all duration-300 font-medium text-sm shadow-md"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {/* Volver al login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes cuenta?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-primary hover:text-blue-800 font-medium"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
