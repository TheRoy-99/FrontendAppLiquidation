import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import logo from "../assets/LogoIglesia.png";
import InputField from "../components/InputField";
import { authService } from "../services/authService";
import { alertError, alertSuccess } from "../utils/alerts";

interface ResetPasswordProps {
    onBackToLogin: () => void;
}

export default function ResetPassword({ onBackToLogin }: ResetPasswordProps) {
    const { token } = useParams<{ token: string }>();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alertError("Error", "Las contraseñas no coinciden");
            return;
        }
        if (newPassword.length < 8) {
            alertError("Error", "La contraseña debe tener al menos 8 caracteres");
            return;
        }

        setLoading(true);
        try {
            await authService.resetPassword({
                token: token || "",
                newPassword,
            });
            alertSuccess("¡Éxito!", "Tu contraseña ha sido cambiada");
            onBackToLogin();
        } catch (error: any) {
            alertError("Error", error.response?.data?.message || "Error al cambiar la contraseña");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] flex items-center justify-center px-4">
            <div className="w-full max-w-sm sm:max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8 transition-transform hover:-translate-y-1 duration-300">
                {/* Header con logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Logo de la aplicación" className="w-24 h-24 object-contain" />
                    <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-primary text-center">
                        Nueva contraseña
                    </h2>
                    <p className="text-gray-500 text-sm text-center mt-1">
                        Ingresa y confirma tu nueva contraseña
                    </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <InputField
                        label="Nueva contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        icon={<FiLock size={18} />}
                    />
                    <InputField
                        label="Confirmar contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        icon={<FiCheckCircle size={18} />}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-300 text-white py-2.5 rounded-md transition-all duration-300 font-medium text-sm shadow-md"
                    >
                        {loading ? "Cambiando..." : "Actualizar contraseña"}
                    </button>
                </form>

                <div className="mt-6 text-center">
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
