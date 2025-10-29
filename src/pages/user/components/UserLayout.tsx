// src/pages/user/components/UserLayout.tsx
import { useState } from "react";
import SidebarUser from "./SidebarUser";
import HeaderUser from "./HeaderUser";

export default function UserLayout({ children, activePanel, setActivePanel, logout, user }: any) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#f9fafb] text-[var(--color-text)]">
            {/* Sidebar */}
            <SidebarUser
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                logout={logout}
            />

            {/* Contenedor principal */}
            <div className="flex-1 flex flex-col">
                {/*AQUI: pasa setActivePanel al HeaderUser */}
                <HeaderUser 
                    setIsOpen={setIsOpen} 
                    user={user} 
                    logout={logout} 
                    setActivePanel={setActivePanel}
                />
                
                <main className="flex-1 p-8 bg-[#f9fafb] overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
