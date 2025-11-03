import { useState, useEffect } from "react";
import {
    alertInfo,
    alertSuccess,
} from "../../../utils/alerts";
import { FiMoon, FiSun, FiBell, FiDatabase, FiRefreshCcw } from "react-icons/fi";

interface ConfigPanelProps {
    onBack: () => void;
}

export default function ConfigPanel({ onBack }: ConfigPanelProps) {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [notifySuccess, setNotifySuccess] = useState(true);
    const [notifyReports, setNotifyReports] = useState(true);
    const [language, setLanguage] = useState("es");

    useEffect(() => {
        setTheme((localStorage.getItem("theme") as "light" | "dark") || "light");
        setNotifySuccess(localStorage.getItem("notifySuccess") !== "off");
        setNotifyReports(localStorage.getItem("notifyReports") !== "off");
        setLanguage(localStorage.getItem("lang") || "es");
    }, []);

    const handleThemeToggle = () => {
        alertInfo("🌙 Esta función estará disponible pronto");
    };

    const handlePreferenceChange = (
        key: string,
        value: string | boolean,
        label: string
    ) => {
        localStorage.setItem(
            key,
            typeof value === "boolean" ? (value ? "on" : "off") : value
        );
        alertSuccess(`Preferencia "${label}" actualizada`);
    };

    const handleClearCache = async () => {
        localStorage.clear();
        alertSuccess("Caché limpiada correctamente");
    };

    const handleBackup = async () => {
        alertInfo("Función de respaldo estará disponible pronto");
    };

    return (
        <div className="space-y-10 max-w-lg mx-auto divide-y divide-gray-200">
            {/* Apariencia */}
            <section className="pt-0">
                <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FiMoon /> Apariencia
                </h3>
                <div className="flex items-center justify-between">
                    <span className="text-gray-700">Tema del panel</span>
                    <button
                        onClick={handleThemeToggle}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        {theme === "light" ? <FiMoon /> : <FiSun />}
                        {theme === "light" ? "Modo oscuro" : "Modo claro"}
                    </button>
                </div>
            </section>

            {/* Notificaciones */}
            <section className="pt-6">
                <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FiBell /> Notificaciones
                </h3>
                <div className="space-y-3">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="accent-blue-600"
                            checked={notifySuccess}
                            onChange={(e) => {
                                setNotifySuccess(e.target.checked);
                                handlePreferenceChange("notifySuccess", e.target.checked, "Alertas de éxito y error");
                            }}
                        />
                        <span className="text-gray-700">Mostrar alertas de éxito y error</span>
                    </label>

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="accent-blue-600"
                            checked={notifyReports}
                            onChange={(e) => {
                                setNotifyReports(e.target.checked);
                                handlePreferenceChange("notifyReports", e.target.checked, "Alertas de reportes");
                            }}
                        />
                        <span className="text-gray-700">Alertarme sobre nuevos reportes</span>
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
                        onChange={() => alertInfo("Cambio de idioma disponible pronto")}
                    >
                        <option value="es">Español</option>
                        <option value="en">Inglés</option>
                    </select>
                </div>
            </section>

            {/* Sistema */}
            <section className="pt-6">
                <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FiDatabase /> Sistema
                </h3>
                <div className="space-y-3">
                    <button
                        onClick={handleBackup}
                        className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                    >
                        <FiDatabase /> Generar respaldo de datos
                    </button>

                    <button
                        onClick={handleClearCache}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        <FiRefreshCcw /> Limpiar caché local
                    </button>
                </div>
            </section>

            {/* Volver */}
            <div className="pt-8 text-center">
                <button
                    onClick={onBack}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 mx-auto"
                >
                Volver al panel
                </button>
            </div>
        </div>
    );
}
