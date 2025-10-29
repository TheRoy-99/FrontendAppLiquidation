import { useState, useRef, useEffect } from "react";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import { confirmLogoutAlert } from "../../../utils/alerts";

export default function HeaderUser({ setIsOpen, user, logout, setActivePanel }: any) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const nombre = user?.nombreCompleto || "Usuario";
    const rol = user?.role?.toLowerCase() || "empleado";

    const initials = nombre
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

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

    return (
        <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex justify-between items-center relative">
            <div className="flex items-center gap-3">
                {/* Botón menú móvil */}
                <button
                    onClick={() => setIsOpen(true)}
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
                    <p className="text-xs text-gray-500 capitalize">{rol}</p>
                </div>

                {/* Avatar */}
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold shadow">
                    {initials}
                </div>

                {/* Menú desplegable */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded-md hover:bg-gray-100 transition"
                    aria-label="Abrir menú de usuario"
                >
                    <FiMenu
                        size={20}
                        className={`text-gray-700 transition-transform duration-200 ${
                            menuOpen ? "rotate-90 text-blue-600" : ""
                        }`}
                    />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 top-12 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20">
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
    );
}
