import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
    FiUserPlus,
    FiFileText,
    FiBarChart2,
    FiLogOut,
    FiUser,
    FiMenu,
} from "react-icons/fi";
import { alertError, alertInfo, alertSuccess, confirmAlert, confirmLogoutAlert } from "../../utils/alerts";
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
import PerfilAdmin from "./components/PerfilAdmin";
import api from "../../services/api";

export default function DashboardAdmin() {
    const { user, logout } = useAuth();
    const [nombre, setNombre] = useState("");
    const [activePanel, setActivePanel] = useState("inicio");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // métricas
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [totalRecibos, setTotalRecibos] = useState(0);
    const [totalReportes, setTotalReportes] = useState(0);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (user && !nombre) {
            setNombre(user.nombreCompleto || user.email?.split("@")[0] || "Administrador");
        }
    }, [user, nombre]);

    // cargar métricas
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

    // cerrar menú si se hace clic fuera
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
            {/* Sidebar responsive */}
            <SidebarAdmin
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            {/* Contenedor principal */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header superior */}
                <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex justify-between items-center relative">
                    <div className="flex items-center gap-3">
                        {/* Botón menú móvil */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
                            aria-label="Abrir menú lateral"
                        >
                            <FiMenu className="text-gray-700" size={22} />
                        </button>

                        <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                            Servicios Públicos
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 relative" ref={menuRef}>
                        <div className="text-right hidden sm:block">
                            <h2 className="text-sm font-semibold text-gray-800">{nombre}</h2>
                            <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
                        </div>

                        {/* Avatar */}
                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold shadow">
                            {initials}
                        </div>

                        {/* Menú superior */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-md hover:bg-gray-100 transition"
                            aria-label="Abrir menú de usuario"
                        >
                            <FiMenu
                                size={20}
                                className={`text-gray-700 transition-transform duration-200 ${menuOpen ? "rotate-90 text-blue-600" : ""
                                    }`}
                            />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20">
                                <button
                                    onClick={() => {
                                        setActivePanel("perfil");
                                        setMenuOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                                >
                                    <FiUser className="mr-2" /> Ver perfil
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
                        {activePanel === "inicio" && (
                            <>
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                    Panel del Administrador
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Aquí podrás registrar usuarios, revisar recibos y acceder a reportes.
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
                                    Configuración general
                                </h2>
                                <p className="text-sm text-gray-500 mb-8">
                                    Personaliza la apariencia y las preferencias de tu cuenta.
                                </p>

                                <div className="space-y-10 max-w-lg mx-auto divide-y divide-gray-200">
                                    {/* Apariencia */}
                                    <section className="pt-0">
                                        <h3 className="text-md font-semibold text-gray-700 mb-3">Apariencia</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700">Tema del panel</span>
                                            <button
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                                onClick={() =>
                                                    alertInfo("Función de cambio de tema próximamente disponible.")
                                                }
                                            >
                                                Cambiar tema
                                            </button>
                                        </div>
                                    </section>

                                    {/* Notificaciones */}
                                    <section className="pt-6">
                                        <h3 className="text-md font-semibold text-gray-700 mb-3">
                                            Notificaciones
                                        </h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="accent-blue-600"
                                                    defaultChecked
                                                    onChange={(e) =>
                                                        localStorage.setItem(
                                                            "notifySuccess",
                                                            e.target.checked ? "on" : "off"
                                                        )
                                                    }
                                                />
                                                <span className="text-gray-700">
                                                    Mostrar alertas de éxito y error
                                                </span>
                                            </label>

                                            <label className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="accent-blue-600"
                                                    defaultChecked
                                                    onChange={(e) =>
                                                        localStorage.setItem(
                                                            "notifyReports",
                                                            e.target.checked ? "on" : "off"
                                                        )
                                                    }
                                                />
                                                <span className="text-gray-700">
                                                    Alertarme sobre nuevos reportes
                                                </span>
                                            </label>
                                        </div>
                                    </section>

                                    {/* Idioma */}
                                    <section className="pt-6">
                                        <h3 className="text-md font-semibold text-gray-700 mb-3">
                                            Idioma y región
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700">Idioma de la interfaz</span>
                                            <select
                                                className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                                                defaultValue="es"
                                                onChange={() =>
                                                    alertInfo("Cambio de idioma disponible próximamente.")
                                                }
                                            >
                                                <option value="es">Español</option>
                                                <option value="en">Inglés</option>
                                            </select>
                                        </div>
                                    </section>

                                    {/* Sistema */}
                                    <section className="pt-6">
                                        <h3 className="text-md font-semibold text-gray-700 mb-3">
                                            Opciones del sistema
                                        </h3>
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => alertInfo("Función de respaldo próximamente.")}
                                                className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                                            >
                                                Generar respaldo de datos
                                            </button>

                                            <button
                                                onClick={async () => {
                                                    const confirmed = await confirmAlert(
                                                        "¿Limpiar caché local?",
                                                        "Esto eliminará las preferencias guardadas, pero mantendrá tu sesión activa.",
                                                        "Sí, limpiar",
                                                        "Cancelar"
                                                    );
                                                    if (confirmed) {
                                                        const token = localStorage.getItem("token");
                                                        const user = localStorage.getItem("user");
                                                        localStorage.clear();
                                                        if (token) localStorage.setItem("token", token);
                                                        if (user) localStorage.setItem("user", user);
                                                        alertSuccess("Caché limpiada correctamente");
                                                    }
                                                }}
                                                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                                            >
                                                Limpiar caché local
                                            </button>
                                        </div>
                                    </section>

                                    {/* Volver */}
                                    <div className="pt-8 text-center">
                                        <button
                                            onClick={() => setActivePanel("inicio")}
                                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                                        >
                                            Volver al panel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}




                        {activePanel === "perfil" && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Mi Perfil</h2>
                                <PerfilAdmin
                                    onBack={() => setActivePanel("inicio")}
                                    setActivePanel={setActivePanel}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
