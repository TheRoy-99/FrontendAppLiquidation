import { useState } from "react";
import logo from "../assets/logo2.png";
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
      onSwitchToLogin(); // Cambia al login después de registro exitoso
    }
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

        {/* Register Form */}
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
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition font-medium text-sm"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes cuenta?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}