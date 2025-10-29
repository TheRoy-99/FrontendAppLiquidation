// src/pages/user/components/ConfigUser.tsx
import { confirmAlert, alertInfo, alertSuccess } from "../../../utils/alerts";
import { useState } from "react";

interface ConfigUserProps {
    onBack: () => void;
    user?: any;
}

export default function ConfigUser({ onBack }: ConfigUserProps) {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    const [language, setLanguage] = useState(localStorage.getItem("language") || "es");

    const handleThemeChange = () => {
        alertInfo("Función de cambio de tema próximamente disponible.");
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
        alertInfo("Cambio de idioma disponible próximamente.");
    };

    const handleCacheClear = async () => {
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
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Configuración general
            </h2>
            <p className="text-sm text-gray-500 mb-8">
                Personaliza la apariencia y las preferencias de tu cuenta.
            </p>

            <div className="space-y-10 divide-y divide-gray-200">
                {/* Apariencia */}
                <section className="pt-0">
                    <h3 className="text-md font-semibold text-gray-700 mb-3">Apariencia</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700">Tema del panel</span>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            onClick={handleThemeChange}
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
                            value={language}
                            onChange={handleLanguageChange}
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
                            onClick={() =>
                                alertInfo("Función de respaldo próximamente.")
                            }
                            className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                        >
                            Generar respaldo de datos
                        </button>

                        <button
                            onClick={handleCacheClear}
                            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                        >
                            Limpiar caché local
                        </button>
                    </div>
                </section>

                {/* Volver */}
                <div className="pt-8 text-center">
                    <button
                    onClick={onBack}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                >
                    Volver al panel
                </button>
                </div>
            </div>
        </div>
    );
}
