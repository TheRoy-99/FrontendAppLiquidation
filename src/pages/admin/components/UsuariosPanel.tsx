import { useEffect, useState } from "react";
import {
    getAllUsers,
    registerUser,
    deleteUser,
    changeUserRole,
} from "../../../services/adminService";
import {
    alertSuccess,
    alertError,
    confirmDeleteAlert,
    confirmApproveAlert,
} from "../../../utils/alerts";
import {
    FiTrash,
    FiUserPlus,
    FiUserCheck,
    FiMail,
    FiPhone,
    FiUser,
    FiLock,
    FiEye,
    FiEyeOff,
    FiX,
} from "react-icons/fi";

export default function UsuariosPanel({ onBack }: { onBack?: () => void }) {
    const [users, setUsers] = useState<any[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombreCompleto: "",
        email: "",
        telefono: "",
        password: "",
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch {
            alertError("Error al cargar los usuarios");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alertSuccess("Usuario registrado correctamente");
            setFormData({ nombreCompleto: "", email: "", telefono: "", password: "" });
            setIsModalOpen(false);
            fetchUsers();
        } catch {
            alertError("No se pudo registrar el usuario");
        }
    };

    const handleDelete = async (id: number, role: string) => {
        if (role === "ADMIN") {
            alertError("No puedes eliminar a un administrador desde aquí");
            return;
        }
        const confirmed = await confirmDeleteAlert(
            "¿Eliminar este usuario?",
            "Esta acción no se puede deshacer."
        );
        if (!confirmed) return;

        try {
            await deleteUser(id);
            alertSuccess("Usuario eliminado correctamente");
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch {
            alertError("No se pudo eliminar el usuario");
        }
    };

    const handleChangeRole = async (id: number, currentRole: string) => {
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

        const confirmed = await confirmApproveAlert(
            `¿Cambiar rol a ${newRole}?`,
            `El usuario pasará a ser ${newRole}.`
        );
        if (!confirmed) return;

        try {
            await changeUserRole(id, newRole);
            alertSuccess(`Rol cambiado a ${newRole}`);
            setUsers((prev) =>
                prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
            );
        } catch {
            alertError("No se pudo cambiar el rol del usuario");
        }
    };

    return (
        <div className="space-y-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                    Gestión de Usuarios
                </h2>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="text-blue-600 text-sm font-medium hover:underline"
                    >
                        Volver al panel
                    </button>
                )}
            </div>

            {/* Botón abrir modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium shadow"
            >
                <FiUserPlus /> Registrar Usuario
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Fondo desenfocado */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Contenedor del modal */}
                    <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 w-full max-w-md mx-4 animate-fadeIn">
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition"
                        >
                            <FiX size={20} />
                        </button>

                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FiUserPlus className="text-blue-600" /> Registrar nuevo usuario
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <FiUser className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="nombreCompleto"
                                    placeholder="Nombre completo"
                                    value={formData.nombreCompleto}
                                    onChange={handleChange}
                                    required
                                    className="pl-9 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 bg-white/60 backdrop-blur-sm"
                                />
                            </div>

                            <div className="relative">
                                <FiMail className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="pl-9 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 bg-white/60 backdrop-blur-sm"
                                />
                            </div>

                            <div className="relative">
                                <FiPhone className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    className="pl-9 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 bg-white/60 backdrop-blur-sm"
                                />
                            </div>

                            <div className="relative">
                                <FiLock className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="pl-9 pr-10 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 bg-white/60 backdrop-blur-sm"
                                />
                                <button
                                    type="button"
                                    onMouseDown={() => setShowPassword(true)}
                                    onMouseUp={() => setShowPassword(false)}
                                    onMouseLeave={() => setShowPassword(false)}
                                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition w-full flex items-center justify-center gap-2 font-medium shadow-lg"
                            >
                                <FiUserPlus /> Registrar
                            </button>
                        </form>
                    </div>
                </div>
            )}


            {/* Lista de usuarios */}
            <div className="space-y-3">
                {users.map((u) => (
                    <div
                        key={u.id}
                        className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition"
                    >
                        <div>
                            <p className="font-semibold text-gray-800 text-base">
                                {u.nombreCompleto}
                            </p>
                            <p className="text-sm text-gray-600 break-all">{u.email}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-3 sm:mt-0">
                            <span
                                className={`px-3 py-1 text-xs font-semibold rounded-full ${u.role === "ADMIN"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {u.role}
                            </span>

                            <button
                                onClick={() => handleChangeRole(u.id, u.role)}
                                className={`p-2 rounded-lg transition-all ${u.role === "ADMIN"
                                    ? "text-green-600 hover:bg-green-50"
                                    : "text-blue-600 hover:bg-blue-50"
                                    }`}
                                title={
                                    u.role === "ADMIN"
                                        ? "Revertir a usuario normal"
                                        : "Convertir en administrador"
                                }
                            >
                                {u.role === "ADMIN" ? (
                                    <FiUserCheck size={18} />
                                ) : (
                                    <FiUserPlus size={18} />
                                )}
                            </button>

                            <button
                                onClick={() => handleDelete(u.id, u.role)}
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                                title="Eliminar usuario"
                            >
                                <FiTrash size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
