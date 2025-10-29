import { useEffect, useState } from "react";
import api from "../../../services/api";
import { alertError } from "../../../utils/alerts";
import { FiMail, FiPhone, FiEdit2, FiLock, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";

export default function PerfilUser({
    onBack,
    setActivePanel,
}: {
    onBack: () => void;
    setActivePanel?: (panel: string) => void;
    user?: any; 
}) {
    const [perfil, setPerfil] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token no encontrado");

                const res = await api.get("/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPerfil(res.data);
            } catch (err: any) {
                alertError("Error al cargar el perfil", err.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPerfil();
    }, []);

    if (loading)
        return <p className="text-gray-600 text-center mt-6">Cargando perfil...</p>;

    if (!perfil)
        return (
            <p className="text-gray-600 text-center mt-6">
                No se pudo obtener la información del usuario.
            </p>
        );

    const initials =
        perfil.nombreCompleto
            ?.split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) || "U";

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-transparent">
            <div className="bg-white shadow-md rounded-2xl p-10 w-full max-w-md text-center">
                <h1 className="text-lg font-semibold text-gray-800 mb-6">
                    Mi Perfil
                </h1>

                {/* Avatar */}
                <div className="relative w-28 h-28 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500 flex items-center justify-center text-3xl font-bold text-blue-600">
                        {initials}
                    </div>
                </div>

                {/* Info principal */}
                <h2 className="text-2xl font-semibold text-gray-800">
                    {perfil.nombreCompleto || "Usuario sin nombre"}
                </h2>
                <p className="text-gray-500 uppercase text-sm tracking-wide mb-8">
                    {perfil.role === "USER" ? "Usuario" : perfil.role}
                </p>

                {/* Datos */}
                <div className="space-y-3 text-left mb-8">
                    <p className="flex items-center gap-3 text-gray-700">
                        <FiMail className="text-blue-600 text-lg" />
                        <span>
                            <strong>Correo:</strong> {perfil.email}
                        </span>
                    </p>
                    <p className="flex items-center gap-3 text-gray-700">
                        <FiPhone className="text-purple-600 text-lg" />
                        <span>
                            <strong>Teléfono:</strong> {perfil.telefono || "No registrado"}
                        </span>
                    </p>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                    <button
                        onClick={() => setActivePanel && setActivePanel("config")}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <FiEdit2 /> Cambiar Preferencias
                    </button>
                    <button
                        onClick={() => setActivePanel && setActivePanel("password")}
                        className="flex items-center gap-2 bg-gray-100 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        <FiLock /> Cambiar contraseña
                    </button>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2 rounded-lg hover:bg-red-100 transition"
                    >
                        <FiLogOut /> Cerrar sesión
                    </button>
                </div>

                <button
                    onClick={onBack}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                >
                    Volver al panel
                </button>
            </div>
        </div>
    );
}