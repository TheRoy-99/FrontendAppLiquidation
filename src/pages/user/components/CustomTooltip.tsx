export default function CustomTooltip({ active, payload, label, activeChart }: any) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                <p className="font-semibold text-gray-800">{label}</p>
                <p className="text-sm text-gray-600">
                    {activeChart === "monto"
                        ? `Total: $${data.montoTotal.toLocaleString()}`
                        : `Recibos: ${data.cantidad}`}
                </p>
                <p className="text-xs text-gray-500">
                    Servicios: {data.servicios.join(", ")}
                </p>
            </div>
        );
    }
    return null;
}
