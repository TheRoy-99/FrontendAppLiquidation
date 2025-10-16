import { useEffect, useState } from "react";
import api from "../../../services/api";
import { alertError } from "../../../utils/alerts";
import { FiMail, FiPhone } from "react-icons/fi";

export default function PerfilAdmin({ onBack }: { onBack: () => void }) {
    const [perfil, setPerfil] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
            .slice(0, 2) || "A";

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-white rounded-xl shadow p-8 max-w-md w-full">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                    {initials}
                </div>

                <h2 className="text-xl font-semibold text-gray-800">
                    {perfil.nombreCompleto || "Usuario sin nombre"}
                </h2>
                <p className="text-gray-500 uppercase text-sm mb-6">{perfil.role}</p>

                <div className="space-y-3 text-left bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="flex items-center gap-2 text-gray-700">
                        <FiMail className="text-blue-600" />
                        <strong>Correo:</strong> {perfil.email}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                        <FiPhone className="text-purple-600" />
                        <strong>Teléfono:</strong> {perfil.telefono || "No registrado"}
                    </p>
                </div>

                <button
                    onClick={onBack}
                    className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Volver al panel
                </button>
            </div>
        </div>
    );
}
