import { useState } from "react";
import {
    FiHome,
    FiUsers,
    FiFileText,
    FiBarChart2,
    FiSettings,
    FiX,
} from "react-icons/fi";

interface SidebarAdminProps {
    activePanel: string;
    setActivePanel: (panel: string) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function SidebarAdmin({
    activePanel,
    setActivePanel,
    isOpen,
    setIsOpen,
}: SidebarAdminProps) {
    const handleNav = (panel: string) => {
        setActivePanel(panel);
        setIsOpen(false);
    };

    return (
        <>
            {/* 🔹 Sidebar para escritorio */}
            <aside className="hidden md:flex w-56 bg-white border-r border-gray-200 flex-col py-6 px-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-6 px-2">
                    Panel Admin
                </h2>

                <nav className="flex-1 flex flex-col gap-1">
                    {[
                        { key: "inicio", icon: <FiHome />, label: "Inicio" },
                        { key: "usuarios", icon: <FiUsers />, label: "Usuarios" },
                        { key: "recibos", icon: <FiFileText />, label: "Recibos" },
                        { key: "reportes", icon: <FiBarChart2 />, label: "Reportes" },
                        { key: "config", icon: <FiSettings />, label: "Configuración" },
                    ].map((item) => (
                        <button
                            key={item.key}
                            onClick={() => handleNav(item.key)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${activePanel === item.key
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto text-center border-t pt-4 text-xs text-gray-400">
                    © {new Date().getFullYear()} Servicios Públicos
                </div>
            </aside>

            {/* 🔹 Drawer lateral para móvil */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Fondo oscuro difuminado */}
                    <div
                        className="flex-1 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel lateral */}
                    <div className="w-64 bg-white h-full shadow-2xl p-5 flex flex-col animate-slideInRight">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Panel Admin
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-600 hover:text-gray-800 transition"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        <nav className="flex-1 flex flex-col gap-1">
                            {[
                                { key: "inicio", icon: <FiHome />, label: "Inicio" },
                                { key: "usuarios", icon: <FiUsers />, label: "Usuarios" },
                                { key: "recibos", icon: <FiFileText />, label: "Recibos" },
                                { key: "reportes", icon: <FiBarChart2 />, label: "Reportes" },
                                { key: "config", icon: <FiSettings />, label: "Configuración" },
                            ].map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => handleNav(item.key)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${activePanel === item.key
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {item.icon} {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-auto text-center border-t pt-4 text-xs text-gray-400">
                            © {new Date().getFullYear()} Servicios Públicos
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
