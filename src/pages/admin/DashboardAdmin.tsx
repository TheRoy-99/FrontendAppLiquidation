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
import { confirmLogoutAlert } from "../../utils/alerts";

export default function DashboardAdmin() {
    const { user, logout } = useAuth();
    const [nombre, setNombre] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user) {
            setNombre(user.nombreCompleto || user.email?.split("@")[0] || "Administrador");
        }
    }, [user]);

    const handleLogout = async () => {
        const confirmed = await confirmLogoutAlert();
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
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center relative">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Servicios Públicos</h1>

                <div className="flex items-center gap-3" ref={menuRef}>
                    <div className="text-right hidden sm:block">
                        <h2
                            className={`text-sm font-semibold text-gray-800 transition-opacity duration-500 ${nombre ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            {nombre}
                        </h2>
                        <p className="text-xs text-gray-500">Administrador</p>
                    </div>

                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold shadow">
                        {initials}
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 rounded-md hover:bg-gray-100 transition"
                    >
                        <FiMenu
                            className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${menuOpen ? "rotate-90 text-blue-600" : ""
                                }`}
                        />
                    </button>

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
            <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-8 py-10">
                <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        Panel del Administrador
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Aquí podrás registrar usuarios, revisar recibos y acceder a reportes.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 active:scale-95 transition-all">
                            <FiUserPlus size={20} /> Registrar usuario
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 active:scale-95 transition-all">
                            <FiFileText size={20} /> Ver recibos
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 rounded-xl shadow hover:bg-gray-300 active:scale-95 transition-all">
                            <FiBarChart2 size={20} /> Ver reportes
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
