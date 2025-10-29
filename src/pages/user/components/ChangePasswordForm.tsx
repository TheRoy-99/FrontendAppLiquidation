import { useState } from "react";
import { alertError, alertSuccess } from "../../../utils/alerts";
import { authService } from "../../../services/authService";

interface ChangePasswordUserProps {
    onBack: () => void;
}

export default function ChangePasswordUser({ onBack }: ChangePasswordUserProps) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword)
            return alertError("Las contraseñas no coinciden");

        if (newPassword.length < 6)
            return alertError("La nueva contraseña debe tener al menos 6 caracteres");

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            await authService.changePassword(oldPassword, newPassword, token);
            alertSuccess("Contraseña actualizada correctamente");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            onBack();
        } catch (err: any) {
            alertError("Error al cambiar la contraseña", err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Cambiar contraseña
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Contraseña actual</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 placeholder-gray-400"
                            placeholder="Ingresa tu contraseña actual"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Nueva contraseña</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 placeholder-gray-400"
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Confirmar nueva contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 placeholder-gray-400"
                            placeholder="Repite la nueva contraseña"
                            required
                        />
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded-lg text-white transition ${loading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Guardando..." : "Guardar cambios"}
                        </button>

                        <button
                            type="button"
                            onClick={onBack}
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}
