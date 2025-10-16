import { useState } from "react";
import { alertError, alertSuccess } from "../../../utils/alerts";
import { authService } from "../../../services/authService";

export default function ChangePasswordForm({ onBack }: { onBack: () => void }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword)
            return alertError("Las contraseñas no coinciden");

        try {
            const token = localStorage.getItem("token");
            await authService.changePassword(oldPassword, newPassword, token);
            alertSuccess("Contraseña actualizada correctamente");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            onBack();
        } catch (err: any) {
            alertError("Error al cambiar la contraseña", err.response?.data?.message);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Cambiar contraseña</h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="text-sm text-gray-600">Contraseña actual</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full border rounded-md p-2 mt-1"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600">Nueva contraseña</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border rounded-md p-2 mt-1"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600">Confirmar nueva contraseña</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border rounded-md p-2 mt-1"
                        required
                    />
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Guardar cambios
                    </button>
                    <button
                        type="button"
                        onClick={onBack}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
