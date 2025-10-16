import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
    FiUser,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiUserPlus,
    FiFileText,
    FiBarChart2,
} from "react-icons/fi";
import { alertError, alertSuccess, confirmLogoutAlert } from "../../utils/alerts";
import UsuariosPanel from "./components/UsuariosPanel";
import RecibosPanel from "./components/RecibosPanel";
import ReportesPanel from "./components/ReportesPanel";
import SidebarAdmin from "./components/SidebarAdmin";
import {
    getAllUsers,
    getAllReceipts,
    getReportesGenerales,
} from "../../services/adminService";
import ChangePasswordForm from "./components/ChangePasswordForm";
import api from "../../services/api";
import PerfilAdmin from "./components/PerfilAdmin";

export default function DashboardAdmin() {
    const { user, logout } = useAuth();
    const [nombre, setNombre] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [activePanel, setActivePanel] = useState("inicio");
    const menuRef = useRef<HTMLDivElement>(null);

    // métricas
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [totalRecibos, setTotalRecibos] = useState(0);
    const [totalReportes, setTotalReportes] = useState(0);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (user && !nombre) {
            setNombre(
                user.nombreCompleto || user.email?.split("@")[0] || "Administrador"
            );
        }
    }, [user, nombre]);

    // Cargar métricas
    useEffect(() => {
        async function fetchData() {
            try {
                const users = await getAllUsers();
                const receipts = await getAllReceipts();
                const reportes = await getReportesGenerales();
                setTotalUsuarios(users.length);
                setTotalRecibos(receipts.length);
                setTotalReportes(reportes.total || reportes.length || 0);
            } catch (err) {
                console.error("Error cargando métricas:", err);
            }
        }
        fetchData();
    }, []);

    const handleLogout = async () => {
        const confirmed = await confirmLogoutAlert("¿Deseas cerrar sesión?");
        if (confirmed) logout();
    };

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
            .slice(0, 2) || "A";

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar solo visible en escritorio */}
            <SidebarAdmin activePanel={activePanel} setActivePanel={setActivePanel} />

            {/* Contenedor principal */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center relative">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Servicios Públicos
                    </h1>

                    <div className="flex items-center gap-3" ref={menuRef}>
                        <div className="text-right hidden sm:block">
                            <h2 className="text-sm font-semibold text-gray-800">{nombre}</h2>
                            <p className="text-xs text-gray-500">Administrador</p>
                        </div>

                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold shadow">
                            {initials}
                        </div>

                        {/* Menú móvil */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-md hover:bg-gray-100 transition lg:hidden"
                        >
                            <FiMenu
                                className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${menuOpen ? "rotate-90 text-blue-600" : ""
                                    }`}
                            />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 top-14 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                                <button
                                    onClick={() => {
                                        setActivePanel("perfil");
                                        setMenuOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                                >
                                    <FiUser className="mr-2" /> Perfil
                                </button>

                                <button
                                    onClick={() => {
                                        setActivePanel("config");
                                        setMenuOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                                >
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

                {/* Contenido dinámico */}
                <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-8 py-10 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 transition-all">
                        {/* Panel principal */}
                        {activePanel === "inicio" && (
                            <>
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                    Panel del Administrador
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Aquí podrás registrar usuarios, revisar recibos y acceder a
                                    reportes.
                                </p>

                                {/* Métricas */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-blue-50 p-4 rounded-xl shadow text-center">
                                        <p className="text-sm text-gray-600">Usuarios registrados</p>
                                        <h3 className="text-2xl font-bold text-blue-700">
                                            {totalUsuarios}
                                        </h3>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl shadow text-center">
                                        <p className="text-sm text-gray-600">Recibos procesados</p>
                                        <h3 className="text-2xl font-bold text-green-700">
                                            {totalRecibos}
                                        </h3>
                                    </div>
                                    <div className="bg-yellow-50 p-4 rounded-xl shadow text-center">
                                        <p className="text-sm text-gray-600">Reportes generados</p>
                                        <h3 className="text-2xl font-bold text-yellow-700">
                                            {totalReportes}
                                        </h3>
                                    </div>
                                </div>

                                {/* Accesos rápidos */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => setActivePanel("usuarios")}
                                        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 active:scale-95 transition-all"
                                    >
                                        <FiUserPlus size={20} /> Registrar usuario
                                    </button>
                                    <button
                                        onClick={() => setActivePanel("recibos")}
                                        className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 active:scale-95 transition-all"
                                    >
                                        <FiFileText size={20} /> Ver recibos
                                    </button>
                                    <button
                                        onClick={() => setActivePanel("reportes")}
                                        className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 rounded-xl shadow hover:bg-gray-300 active:scale-95 transition-all"
                                    >
                                        <FiBarChart2 size={20} /> Ver reportes
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Paneles dinámicos */}
                        {activePanel === "usuarios" && (
                            <UsuariosPanel onBack={() => setActivePanel("inicio")} />
                        )}
                        {activePanel === "recibos" && (
                            <RecibosPanel onBack={() => setActivePanel("inicio")} />
                        )}
                        {activePanel === "reportes" && (
                            <ReportesPanel onBack={() => setActivePanel("inicio")} />
                        )}
                        {activePanel === "password" && (
                            <ChangePasswordForm onBack={() => setActivePanel("config")} />
                        )}
                        {activePanel === "config" && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Información personal
                                </h2>
                                <p className="text-sm text-gray-500 mb-6">
                                    Aquí puedes actualizar tu nombre y número de teléfono asociados a tu cuenta.
                                </p>

                                {/* Estado local para mostrar confirmación visual */}
                                {saved && (
                                    <p className="text-green-600 text-sm mb-4">
                                        ✔ Cambios guardados correctamente.
                                    </p>
                                )}

                                {/* Formulario para actualizar datos */}
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();

                                        const nombreCompleto = (e.currentTarget.elements.namedItem("nombreCompleto") as HTMLInputElement).value;
                                        const telefono = (e.currentTarget.elements.namedItem("telefono") as HTMLInputElement).value;

                                        try {
                                            const token = localStorage.getItem("token");
                                            if (!token) throw new Error("No se encontró token");

                                            await api.patch(
                                                "/users/me",
                                                { nombreCompleto, telefono },
                                                { headers: { Authorization: `Bearer ${token}` } }
                                            );

                                            alertSuccess("Datos actualizados correctamente");
                                            setSaved(true);
                                            setTimeout(() => setSaved(false), 3000);
                                        } catch (err: any) {
                                            console.error(err);
                                            alertError(
                                                "Error al actualizar los datos",
                                                err.response?.data?.message
                                            );
                                        }
                                    }}
                                    className="space-y-4 max-w-lg mx-auto"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre completo
                                        </label>
                                        <input
                                            type="text"
                                            name="nombreCompleto"
                                            placeholder="Ej. Roy Martínez"
                                            defaultValue={user?.nombreCompleto || ""}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Teléfono
                                        </label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            placeholder="Ej. 3124567890"
                                            defaultValue={user?.telefono || ""}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Actualizar información
                                    </button>
                                </form>

                                {/* Bloque de seguridad */}
                                <div className="mt-10 border-t pt-6 max-w-lg mx-auto">
                                    <h3 className="text-md font-semibold text-gray-700 mb-3">
                                        Seguridad
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Puedes cambiar tu contraseña en cualquier momento.
                                    </p>
                                    <button
                                        onClick={() => setActivePanel("password")}
                                        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                                    >
                                        Cambiar contraseña
                                    </button>
                                </div>

                                <div className="mt-8 max-w-lg mx-auto">
                                    <button
                                        onClick={() => setActivePanel("inicio")}
                                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                                    >
                                        Volver al panel
                                    </button>
                                </div>
                            </div>
                        )}



                        {/* Panel PERFIL */}
                        {activePanel === "perfil" && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Mi Perfil</h2>

                                {/* Estado local para datos */}
                                <PerfilAdmin onBack={() => setActivePanel("inicio")} />
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
