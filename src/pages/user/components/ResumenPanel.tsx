import { useState, useEffect } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import api from "../../../services/api";

export default function ResumenPanel() {
    const [recibos, setRecibos] = useState<any[]>([]);
    const [activeChart, setActiveChart] = useState<"monto" | "cantidad">("monto");

    useEffect(() => {
        (async () => {
            const res = await api.get("/receipts/me");
            setRecibos(res.data);
        })();
    }, []);

    const datosGrafico = () => {
        const meses: Record<string, any> = {};
        recibos.forEach((r) => {
            if (!meses[r.mes]) meses[r.mes] = { mes: r.mes, montoTotal: 0, cantidad: 0 };
            meses[r.mes].montoTotal += r.monto;
            meses[r.mes].cantidad++;
        });
        return Object.values(meses);
    };

    if (!recibos.length) return <p className="text-gray-500">Sin datos para mostrar.</p>;

    return (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl font-semibold text-[var(--color-text)] flex items-center gap-2">
                    <FiBarChart2 className="text-[var(--color-primary)]" /> Resumen Mensual
                </h2>
                <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                        onClick={() => setActiveChart("monto")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeChart === "monto"
                                ? "bg-[var(--color-primary)] text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        Por Monto
                    </button>
                    <button
                        onClick={() => setActiveChart("cantidad")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeChart === "cantidad"
                                ? "bg-[var(--color-primary)] text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        Por Cantidad
                    </button>
                </div>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datosGrafico()}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={activeChart === "monto" ? "montoTotal" : "cantidad"} radius={[4, 4, 0, 0]}>
                            {datosGrafico().map((_, i) => (
                                <Cell key={i} fill={activeChart === "monto" ? "var(--color-primary)" : "var(--color-secondary)"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
