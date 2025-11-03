import { useState, useEffect } from "react";

export default function HeaderLanding() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-in-out ${scrolled
                ? "bg-white/90 backdrop-blur-xl shadow-lg"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-5">
                {/* Logo */}
                <div className="flex items-center space-x-3 group">
                    <div className="w-11 h-11 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">SL</span>
                    </div>
                    <div>
                        <h1
                            className={`text-xl font-bold transition-colors duration-300 ${scrolled ? "text-gray-900" : "text-white"
                                }`}
                        >
                            Sistema de Liquidación
                        </h1>
                        <p
                            className={`text-xs transition-colors duration-300 ${scrolled ? "text-gray-600" : "text-blue-100"
                                }`}
                        >
                            para ayuda de servicios públicos para empleados de
                            obra

                        </p>
                    </div>
                </div>

                {/* Navegación desktop */}
                <nav className="hidden md:flex items-center space-x-8">
                    {[
                        { label: "Inicio", href: "#inicio" },
                        { label: "¿Cómo funciona?", href: "#como-funciona" },
                        { label: "Contacto", href: "#contacto" },
                    ].map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`font-medium transition-all duration-300 hover:scale-105 ${scrolled
                                ? "text-gray-700 hover:text-blue-600"
                                : "text-white hover:text-blue-200"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}

                    <a
                        href="/login"
                        className={`font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${scrolled
                            ? "bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                            : "bg-white text-blue-600 hover:bg-blue-50"
                            }`}
                    >
                        Iniciar sesión
                    </a>
                </nav>

                {/* Botón menú móvil */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-blue-600/20 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${scrolled ? "text-blue-600" : "text-white"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
