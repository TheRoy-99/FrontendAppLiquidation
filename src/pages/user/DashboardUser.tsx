import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import UserLayout from "./components/UserLayout";
import RecibosPanel from "./components/RecibosPanel";
import ResumenPanel from "./components/ResumenPanel";
import PerfilUser from "./components/PerfilUser";
import ConfigUser from "./components/ConfigUser";
import ChangePasswordUser from "./components/ChangePasswordForm"; // ✅ nuevo componente

export default function DashboardUser() {
    const { user, logout } = useAuth();
    const [activePanel, setActivePanel] = useState("inicio");

    const handleBackClick = (fromPanel?: string) => {
        if (fromPanel === "config") {
            setActivePanel("perfil");
        } else {
            setActivePanel("inicio");
        }
    };

    const renderPanel = () => {
        switch (activePanel) {
            case "inicio":
                return <RecibosPanel />;

            case "resumen":
                return <ResumenPanel />;

            case "perfil":
                return (
                    <PerfilUser
                        onBack={() => handleBackClick()}
                        setActivePanel={setActivePanel}
                        user={user}
                    />
                );

            case "config":
                return (
                    <ConfigUser
                        onBack={() => handleBackClick("config")}
                        user={user}
                    />
                );

            // ✅ Panel de cambio de contraseña
            case "password":
                return (
                    <ChangePasswordUser onBack={() => setActivePanel("perfil")} />
                );

            default:
                return <RecibosPanel />;
        }
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] dark:bg-[#121212] transition-colors duration-300">
            <UserLayout
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                logout={logout}
                user={user}
            >
                {/* Contenido principal */}
                <div className="px-4 sm:px-6 md:px-8 py-6 text-[var(--color-text)] dark:text-gray-100">
                    {renderPanel()}
                </div>
            </UserLayout>
        </div>
    );
}
