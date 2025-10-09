import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
    FiUser,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiUpload,
    FiEye,
    FiCheckCircle,
    FiClock,
    FiXCircle,
} from "react-icons/fi";
import api from "../../services/api";
import { confirmLogoutAlert } from "../../utils/alerts";

interface Receipt {
    id: string;
    servicio: string;
    mes: string;
    monto: number;
    estado: "APROBADO" | "PENDIENTE" | "RECHAZADO";
    fechaSubida: string;
}

export default function DashboardUser() {
    const { user, logout } = useAuth();
    const [nombre, setNombre] = useState("");
    const [recibos, setRecibos] = useState<Receipt[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Cargar nombre y recibos
    useEffect(() => {
        if (user) {
            const nombreUsuario = user.nombreCompleto || user.email?.split("@")[0] || "Usuario";
            setNombre(nombreUsuario);
            fetchRecibos();
        }
    }, [user]);

    const fetchRecibos = async () => {
        try {
            const res = await api.get("/receipts/me");
            const data = res.data.sort(
                (a: any, b: any) => new Date(b.fechaSubida).getTime() - new Date(a.fechaSubida).getTime()
            );
            setRecibos(data);
        } catch (err) {
            console.error("Error cargando recibos:", err);
        }
    };

    // Confirmación de logout con SweetAlert2
    const handleLogout = async () => {
        const confirmed = await confirmLogoutAlert();
        if (confirmed) logout();
    };

    // Cerrar menú al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const initials =
        nombre
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) || "U";

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center relative">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Servicios Públicos</h1>

                {/* Usuario */}
                <div className="flex items-center gap-3" ref={menuRef}>
                    <div className="text-right hidden sm:block">
                        <h2 className="text-sm font-semibold text-gray-800">Bienvenido, {nombre}</h2>
                        <p className="text-xs text-gray-500">Empleado</p>
                    </div>

                    {/* Avatar */}
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold shadow">
                        {initials}
                    </div>

                    {/* Icono de menú */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 rounded-md hover:bg-gray-100 transition"
                    >
                        <FiMenu
                            className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${menuOpen ? "rotate-90 text-blue-600" : ""
                                }`}
                        />
                    </button>

                    {/* Menú desplegable */}
                    {menuOpen && (
                        <div className="absolute right-0 top-14 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                                <FiUser className="mr-2" /> Perfil
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                                <FiSettings className="mr-2" /> Configuración
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition"
                            >
                                <FiLogOut className="mr-2" /> Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Contenido */}
            <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
                {/* Encabezado de recibos */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4 sm:gap-0">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
                        Mis Recibos
                    </h2>

                    <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 active:scale-95 transition-all w-full sm:w-auto">
                        <FiUpload className="text-lg" /> Subir Recibo
                    </button>


                </div>

                {/* Lista de recibos */}
                <div className="space-y-4">
                    {recibos.map((r) => (
                        <div
                            key={r.id}
                            className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between"
                        >
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {r.servicio} • {r.mes}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Subido: {new Date(r.fechaSubida).toLocaleDateString()}
                                </p>
                                <p className="text-xl font-bold text-gray-900 mt-1">
                                    ${r.monto.toLocaleString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 mt-4 sm:mt-0">
                                <span
                                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${r.estado === "APROBADO"
                                        ? "bg-green-100 text-green-700"
                                        : r.estado === "PENDIENTE"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {r.estado === "APROBADO" && <FiCheckCircle />}
                                    {r.estado === "PENDIENTE" && <FiClock />}
                                    {r.estado === "RECHAZADO" && <FiXCircle />}
                                    {r.estado.charAt(0) + r.estado.slice(1).toLowerCase()}
                                </span>

                                <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg transition">
                                    <FiEye /> Ver detalles
                                </button>
                            </div>
                        </div>
                    ))}

                    {recibos.length === 0 && (
                        <p className="text-gray-500 text-center py-10">
                            No tienes recibos cargados aún.
                        </p>
                    )}
                </div>
                {/* Botón flotante (solo visible en móvil) */}
                <button
                    className="sm:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 active:scale-95 transition-all duration-300"
                    aria-label="Subir Recibo"
                >
                    <FiUpload className="text-2xl" />
                </button>

            </main>
        </div>
    );
}
