import { useEffect, useState } from "react";
import {
    getReportesGenerales,
    getReportesPorServicio,
    getReportesPorMes,
} from "../../../services/adminService";
import { alertError } from "../../../utils/alerts";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";
import type {
    ReporteGeneral,
    ReportePorMes,
    ReportePorServicio,
} from "../interfaces";
import { formatCurrency } from "../../../utils/helpers";

interface ReportesPanelProps {
    onBack?: () => void;
}

export default function ReportesPanel({ onBack }: ReportesPanelProps) {
    const [data, setData] = useState<ReporteGeneral | null>(null);
    const [porServicio, setPorServicio] = useState<ReportePorServicio[]>([]);
    const [porMes, setPorMes] = useState<ReportePorMes[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReportes = async () => {
        try {
            setLoading(true);
            const [general, servicio, mes] = await Promise.all([
                getReportesGenerales(),
                getReportesPorServicio(),
                getReportesPorMes(),
            ]);
            setData(general);
            setPorServicio(servicio);
            setPorMes(mes);
        } catch {
            alertError("Error cargando reportes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportes();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center py-10 text-gray-500">
                Cargando reportes...
            </div>
        );

    if (!data)
        return (
            <div className="flex justify-center items-center py-10 text-gray-500">
                No se encontraron reportes.
            </div>
        );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                    Reportes Generales
                </h2>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
                    >
                        Volver al panel
                    </button>
                )}
            </div>

            {/* Resumen general */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Total de Recibos</p>
                    <h3 className="text-2xl font-bold text-blue-700">
                        {data.totalRecibos}
                    </h3>
                </div>

                <div className="bg-green-50 p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Aprobados</p>
                    <h3 className="text-2xl font-bold text-green-700">{data.aprobados}</h3>
                </div>

                <div className="bg-red-50 p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Rechazados</p>
                    <h3 className="text-2xl font-bold text-red-700">{data.rechazados}</h3>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Total Subsidios</p>
                    <h3 className="text-2xl font-bold text-yellow-700">
                        {formatCurrency(data.totalSubsidios)}
                    </h3>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Total Liquidados</p>
                    <h3 className="text-2xl font-bold text-indigo-700">
                        {formatCurrency(data.totalLiquidados || 0)}
                    </h3>
                </div>
            </div>

            {/* Gráfico por servicio */}
            <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-gray-700 font-semibold mb-3">
                    Recibos por servicio (Aprobados / Rechazados)
                </h3>
                {porServicio.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={porServicio}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="servicio" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="aprobados" fill="#22c55e" name="Aprobados" />
                            <Bar dataKey="rechazados" fill="#ef4444" name="Rechazados" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-400 text-sm text-center py-10">
                        No hay datos por servicio disponibles.
                    </p>
                )}
            </div>

            {/* Gráfico por mes */}
            <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-gray-700 font-semibold mb-3">
                    Subsidios otorgados por mes
                </h3>
                {porMes.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={porMes}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="totalSubsidio"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                name="Subsidio total"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-400 text-sm text-center py-10">
                        No hay datos mensuales disponibles.
                    </p>
                )}
            </div>
        </div>
    );
}
