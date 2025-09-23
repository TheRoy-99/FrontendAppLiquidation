import { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo2.png";
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
        <div className="min-h-screen bg-gray-100 px-4 py-8 flex items-center justify-center">
            <div className="w-full max-w-sm sm:max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mt-4 text-gray-800 text-center">
                        Nueva Contraseña
                    </h2>
                    <p className="text-gray-500 text-sm text-center">
                        Ingresa tu nueva contraseña para continuar
                    </p>
                </div>

                {/* Reset Form */}
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <InputField
                        label="Nueva contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputField
                        label="Confirmar contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-green-700 transition font-medium text-sm"
                    >
                        {loading ? "Cambiando..." : "Actualizar Contraseña"}
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
