import {
    FiHome,
    FiUser,
    FiUserPlus,
    FiFileText,
    FiBarChart2,
    FiSettings,
    FiChevronLeft,
    FiChevronRight,
    FiLogOut,
} from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { confirmLogoutAlert } from "../../../utils/alerts";

interface SidebarProps {
    activePanel: string;
    setActivePanel: (panel: string) => void;
}

export default function SidebarAdmin({ activePanel, setActivePanel }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuth();

    const menuItems = [
        { id: "inicio", label: "Inicio", icon: <FiHome /> },
        { id: "perfil", label: "Perfil", icon: <FiUser /> }, // 👈 nuevo
        { id: "usuarios", label: "Usuarios", icon: <FiUserPlus /> },
        { id: "recibos", label: "Recibos", icon: <FiFileText /> },
        { id: "reportes", label: "Reportes", icon: <FiBarChart2 /> },
        { id: "config", label: "Configuración", icon: <FiSettings /> },
    ];

    const handleLogout = async () => {
        const confirmed = await confirmLogoutAlert("¿Cerrar sesión?");
        if (confirmed) logout();
    };

    return (
        <aside
            className={`hidden lg:flex flex-col justify-between ${collapsed ? "w-20" : "w-60"
                } bg-white border-r border-gray-200 py-6 px-4 shadow-sm transition-all duration-300`}
        >
            {/* Parte superior */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    {!collapsed && (
                        <h2 className="text-lg font-semibold text-gray-700">Panel Admin</h2>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 rounded hover:bg-gray-100 transition"
                    >
                        {collapsed ? (
                            <FiChevronRight className="text-gray-600" />
                        ) : (
                            <FiChevronLeft className="text-gray-600" />
                        )}
                    </button>
                </div>

                {/* Menú principal */}
                <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActivePanel(item.id)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition
              ${activePanel === item.id
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {item.icon}
                            {!collapsed && item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Parte inferior: botón de logout */}
            <div className="mt-8">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium text-red-600 hover:bg-red-50 transition"
                >
                    <FiLogOut />
                    {!collapsed && "Cerrar sesión"}
                </button>
            </div>
        </aside>
    );
}
