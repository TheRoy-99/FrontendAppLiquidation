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
import {
    alertError,
    confirmLogoutAlert,
} from "../../utils/alerts";
import { getInitials } from "../../utils/helpers";
import SidebarAdmin from "./components/SidebarAdmin";
import UsuariosPanel from "./components/UsuariosPanel";
import RecibosPanel from "./components/RecibosPanel";
import ReportesPanel from "./components/ReportesPanel";
import PerfilAdmin from "./components/PerfilAdmin";
import ChangePasswordForm from "./components/ChangePasswordForm";
import {
    getAllUsers,
    getAllReceipts,
    getReportesGenerales,
} from "../../services/adminService";
import { PANELS } from "./constants";
import type { DashboardMetrics } from "./interfaces";
import ConfigPanel from "./components/ConfigPanel";

export default function DashboardAdmin() {
    const { user, logout } = useAuth();
    const [nombre, setNombre] = useState("");
    const [activePanel, setActivePanel] = useState<string>(PANELS.INICIO);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [metrics, setMetrics] = useState<DashboardMetrics>({
        usuarios: 0,
        recibos: 0,
        reportes: 0,
    });
    const [loading, setLoading] = useState(true);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user && !nombre) {
            setNombre(
                user.nombreCompleto || user.email?.split("@")[0] || "Administrador"
            );
        }
    }, [user, nombre]);

    // Cargar métricas iniciales
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                setLoading(true);
                const [users, receipts, reportes] = await Promise.all([
                    getAllUsers(),
                    getAllReceipts(),
                    getReportesGenerales(),
                ]);
                setMetrics({
                    usuarios: users.length,
                    recibos: receipts.length,
                    reportes: reportes.total || reportes.length || 0,
                });
            } catch (err) {
                alertError("Error cargando métricas");
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    // Cerrar menú si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        const confirmed = await confirmLogoutAlert("¿Deseas cerrar sesión?");
        if (confirmed) logout();
    };

    const initials = getInitials(nombre);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidebarAdmin
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex justify-between items-center relative">
                    <div className="flex items-center gap-3">
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
                            <p className="text-xs text-gray-500 capitalize">
                                {user?.role?.toLowerCase()}
                            </p>
                        </div>

                        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold shadow">
                            {initials}
                        </div>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-md hover:bg-gray-100 transition"
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
                                        setActivePanel(PANELS.PERFIL);
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
                <main className="grow w-full max-w-4xl mx-auto px-4 sm:px-8 py-10 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 transition-all">
                        {loading ? (
                            <p className="text-center text-gray-500 py-10">
                                Cargando métricas...
                            </p>
                        ) : (
                            <>
                                {activePanel === PANELS.INICIO && (
                                    <>
                                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                            Panel del Administrador
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            Aquí podrás registrar usuarios, revisar recibos y acceder a
                                            reportes.
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                                            <div className="bg-blue-50 p-4 rounded-xl shadow text-center">
                                                <p className="text-sm text-gray-600">
                                                    Usuarios registrados
                                                </p>
                                                <h3 className="text-2xl font-bold text-blue-700">
                                                    {metrics.usuarios}
                                                </h3>
                                            </div>
                                            <div className="bg-green-50 p-4 rounded-xl shadow text-center">
                                                <p className="text-sm text-gray-600">
                                                    Recibos procesados
                                                </p>
                                                <h3 className="text-2xl font-bold text-green-700">
                                                    {metrics.recibos}
                                                </h3>
                                            </div>
                                            <div className="bg-yellow-50 p-4 rounded-xl shadow text-center">
                                                <p className="text-sm text-gray-600">
                                                    Reportes generados
                                                </p>
                                                <h3 className="text-2xl font-bold text-yellow-700">
                                                    {metrics.reportes}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <button
                                                onClick={() => setActivePanel(PANELS.USUARIOS)}
                                                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 active:scale-95 transition-all"
                                            >
                                                <FiUserPlus size={20} /> Registrar usuario
                                            </button>
                                            <button
                                                onClick={() => setActivePanel(PANELS.RECIBOS)}
                                                className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 active:scale-95 transition-all"
                                            >
                                                <FiFileText size={20} /> Ver recibos
                                            </button>
                                            <button
                                                onClick={() => setActivePanel(PANELS.REPORTES)}
                                                className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 rounded-xl shadow hover:bg-gray-300 active:scale-95 transition-all"
                                            >
                                                <FiBarChart2 size={20} /> Ver reportes
                                            </button>
                                        </div>
                                    </>
                                )}

                                {activePanel === PANELS.USUARIOS && (
                                    <UsuariosPanel onBack={() => setActivePanel(PANELS.INICIO)} />
                                )}
                                {activePanel === PANELS.RECIBOS && (
                                    <RecibosPanel onBack={() => setActivePanel(PANELS.INICIO)} />
                                )}
                                {activePanel === PANELS.REPORTES && (
                                    <ReportesPanel onBack={() => setActivePanel(PANELS.INICIO)} />
                                )}
                                {activePanel === PANELS.PERFIL && (
                                    <PerfilAdmin
                                        onBack={() => setActivePanel(PANELS.INICIO)}
                                        setActivePanel={setActivePanel}
                                    />
                                )}
                                {activePanel === PANELS.PASSWORD && (
                                    <ChangePasswordForm
                                        onBack={() => setActivePanel(PANELS.CONFIG)}
                                    />
                                )}

                                {activePanel === PANELS.CONFIG && (
                                    <ConfigPanel onBack={() => setActivePanel(PANELS.INICIO)} />
                                )}

                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
