import { FiHome, FiFileText, FiBarChart2, FiSettings, FiX } from "react-icons/fi";

interface SidebarUserProps {
    activePanel: string;
    setActivePanel: (panel: string) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    logout: () => void;
}

export default function SidebarUser({
    activePanel,
    setActivePanel,
    isOpen,
    setIsOpen,
    logout,
}: SidebarUserProps) {
    const handleNav = (panel: string) => {
        setActivePanel(panel);
        setIsOpen(false);
    };

    return (
        <>
            {/* 🔹 Sidebar escritorio */}
            <aside className="hidden md:flex w-56 bg-white border-r border-gray-200 flex-col py-6 px-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-6 px-2">
                    Panel Usuario
                </h2>

                <nav className="flex-1 flex flex-col gap-1">
                    {[
                        { key: "inicio", icon: <FiHome />, label: "Inicio" },
                        { key: "resumen", icon: <FiBarChart2 />, label: "Resumen" },
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

                <button
                    onClick={logout}
                    className="mt-auto flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 rounded-md px-3 py-2 transition"
                >
                    <FiFileText size={15} /> Cerrar sesión
                </button>

                <div className="mt-4 text-center border-t pt-4 text-xs text-gray-400">
                    © {new Date().getFullYear()} Servicios Públicos
                </div>
            </aside>

            {/*Drawer móvil */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Fondo oscuro */}
                    <div
                        className="flex-1 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel lateral */}
                    <div className="w-64 bg-white h-full shadow-2xl p-5 flex flex-col animate-slideInRight">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Panel Usuario
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
                                { key: "resumen", icon: <FiBarChart2 />, label: "Resumen" },
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

                        <button
                            onClick={logout}
                            className="mt-auto flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 rounded-md px-3 py-2 transition"
                        >
                            <FiFileText size={15} /> Cerrar sesión
                        </button>

                        <div className="mt-4 text-center border-t pt-4 text-xs text-gray-400">
                            © {new Date().getFullYear()} Servicios Públicos
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
