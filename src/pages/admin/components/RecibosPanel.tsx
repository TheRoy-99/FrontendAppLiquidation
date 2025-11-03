import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    getAllReceipts,
    updateReceiptStatus,
    deleteReceipt,
} from "../../../services/adminService";
import {
    alertSuccess,
    alertError,
    confirmDeleteAlert,
    confirmApproveAlert,
    confirmRejectAlert,
} from "../../../utils/alerts";
import {
    FiCheckCircle,
    FiXCircle,
    FiTrash,
    FiEye,
    FiX,
    FiDownload,
    FiLock,
} from "react-icons/fi";
import type { Receipt } from "../interfaces";
import { STATUS_COLORS } from "../constants";

interface RecibosPanelProps {
    onBack?: () => void;
}

interface FilePreview {
    url: string;
    type: "pdf" | "image";
}

export default function RecibosPanel({ onBack }: RecibosPanelProps) {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [previewData, setPreviewData] = useState<FilePreview | null>(null);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchReceipts = async () => {
        try {
            setLoading(true);
            const data = await getAllReceipts();
            setReceipts(data);
        } catch {
            alertError("Error cargando recibos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReceipts();
    }, []);

    const canChangeStatus = (estado: string): boolean => {
        if (estado !== "PENDIENTE") {
            alertError(`No se puede cambiar el estado de un recibo ${estado}`);
            return false;
        }
        return true;
    };

    const handleAction = async (
        id: number,
        estado: "APROBADO" | "RECHAZADO",
        currentStatus: string
    ) => {
        if (!canChangeStatus(currentStatus)) return;

        const confirmed =
            estado === "APROBADO"
                ? await confirmApproveAlert(
                    "¿Aprobar este recibo?",
                    "Esta acción creará una liquidación y no se puede revertir."
                )
                : await confirmRejectAlert(
                    "¿Rechazar este recibo?",
                    "Esta acción no se puede revertir."
                );

        if (!confirmed) return;

        try {
            await updateReceiptStatus(id, estado);
            alertSuccess(`Recibo ${estado.toLowerCase()} correctamente`);
            setReceipts((prev) =>
                prev.map((r) => (r.id === id ? { ...r, estado } : r))
            );
        } catch {
            alertError("No se pudo actualizar el estado");
        }
    };

    const handleDelete = async (id: number, estado: string) => {
        const confirmed = await confirmDeleteAlert(
            estado === "APROBADO"
                ? "Este recibo está APROBADO. ¿Seguro que deseas eliminarlo?"
                : "¿Eliminar este recibo?",
            "Esta acción no se puede deshacer."
        );
        if (!confirmed) return;

        try {
            await deleteReceipt(id);
            alertSuccess("Recibo eliminado correctamente");
            setReceipts((prev) => prev.filter((r) => r.id !== id));
        } catch {
            alertError("Error al eliminar el recibo");
        }
    };

    const detectFileType = (url: string): FilePreview => {
        if (!url) return { url: "", type: "image" };
        const cleanUrl = url.split("?")[0].toLowerCase();
        const isPdf = cleanUrl.endsWith(".pdf") || cleanUrl.includes("/raw/upload/");
        const finalUrl = isPdf
            ? url.replace("/image/upload/", "/raw/upload/")
            : url;
        return { url: finalUrl, type: isPdf ? "pdf" : "image" };
    };

    const handleViewFile = (url: string) => {
        if (!url) {
            alertError("No hay archivo disponible para este recibo");
            return;
        }
        setIsLoadingPreview(true);
        setPreviewData(detectFileType(url));
        setIsLoadingPreview(false);
    };

    const closePreview = () => setPreviewData(null);
    const handleDownload = () => {
        if (previewData?.url) window.open(previewData.url, "_blank");
    };

    return (
        <div className="space-y-6 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Gestión de Recibos
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Solo puedes aprobar o rechazar recibos{" "}
                        <span className="font-semibold text-yellow-600">PENDIENTES</span>
                    </p>
                </div>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
                    >
                        Volver al panel
                    </button>
                )}
            </div>

            {loading ? (
                <p className="text-center text-gray-500 py-10">Cargando recibos...</p>
            ) : receipts.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                    No hay recibos registrados
                </p>
            ) : (
                <>
                    {/* Tabla desktop */}
                    <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200 bg-white">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-gray-100 text-gray-800 font-semibold">
                                <tr>
                                    <th className="p-3 text-left">Usuario</th>
                                    <th className="p-3 text-left">Servicio</th>
                                    <th className="p-3 text-left">Monto</th>
                                    <th className="p-3 text-left">Archivo</th>
                                    <th className="p-3 text-left">Estado</th>
                                    <th className="p-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {receipts.map((r) => {
                                    const isPending = r.estado === "PENDIENTE";
                                    return (
                                        <tr
                                            key={r.id}
                                            className="border-t hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="p-3 whitespace-nowrap">
                                                {r.usuario?.nombreCompleto || "—"}
                                            </td>
                                            <td className="p-3 whitespace-nowrap">{r.servicio}</td>
                                            <td className="p-3 whitespace-nowrap font-medium">
                                                ${r.monto.toLocaleString()}
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    onClick={() => handleViewFile(r.archivoUrl)}
                                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    <FiEye /> Ver
                                                </button>
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[r.estado as keyof typeof STATUS_COLORS]
                                                        }`}
                                                >
                                                    {r.estado}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex gap-2 justify-center items-center">
                                                    {/* Aprobar */}
                                                    <button
                                                        onClick={() =>
                                                            handleAction(r.id, "APROBADO", r.estado)
                                                        }
                                                        disabled={!isPending}
                                                        className={`p-2 rounded-lg transition-all ${isPending
                                                                ? "text-green-600 hover:bg-green-50 hover:scale-110"
                                                                : "text-gray-300 cursor-not-allowed"
                                                            }`}
                                                        title="Aprobar recibo"
                                                    >
                                                        {isPending ? (
                                                            <FiCheckCircle size={20} />
                                                        ) : (
                                                            <FiLock size={20} />
                                                        )}
                                                    </button>

                                                    {/* Rechazar */}
                                                    <button
                                                        onClick={() =>
                                                            handleAction(r.id, "RECHAZADO", r.estado)
                                                        }
                                                        disabled={!isPending}
                                                        className={`p-2 rounded-lg transition-all ${isPending
                                                                ? "text-yellow-600 hover:bg-yellow-50 hover:scale-110"
                                                                : "text-gray-300 cursor-not-allowed"
                                                            }`}
                                                        title="Rechazar recibo"
                                                    >
                                                        {isPending ? (
                                                            <FiXCircle size={20} />
                                                        ) : (
                                                            <FiLock size={20} />
                                                        )}
                                                    </button>

                                                    {/* Eliminar */}
                                                    <button
                                                        onClick={() => handleDelete(r.id, r.estado)}
                                                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 hover:scale-110 transition-all"
                                                        title="Eliminar recibo"
                                                    >
                                                        <FiTrash size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Modal previsualización */}
            {previewData && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={closePreview}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[95vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <FiEye /> Vista previa del recibo
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                                >
                                    <FiDownload size={18} /> Descargar
                                </button>
                                <button
                                    onClick={closePreview}
                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FiX size={22} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto p-4 bg-gray-50">
                            {previewData.type === "pdf" ? (
                                <iframe
                                    src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(
                                        previewData.url
                                    )}`}
                                    title="Vista previa del recibo"
                                    className="w-full h-[80vh] rounded-lg border-0"
                                />
                            ) : (
                                <div className="flex items-center justify-center min-h-[75vh] bg-white rounded-lg p-4">
                                    <img
                                        src={previewData.url}
                                        alt="Recibo"
                                        className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
                                        onError={() => alertError("No se pudo cargar la imagen.")}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
                            Haz clic fuera para cerrar
                        </div>
                    </motion.div>
                </div>
            )}

            {isLoadingPreview && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
                    <div className="bg-white rounded-lg p-6 shadow-xl text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Cargando archivo...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
