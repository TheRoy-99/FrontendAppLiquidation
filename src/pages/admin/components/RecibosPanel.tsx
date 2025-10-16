import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import {
    getAllReceipts,
    updateReceiptStatus,
    deleteReceipt
} from '../../../services/adminService'
import {
    alertSuccess,
    alertError,
    confirmDeleteAlert,
    confirmApproveAlert,
    confirmRejectAlert
} from '../../../utils/alerts'
import {
    FiCheckCircle,
    FiXCircle,
    FiTrash,
    FiEye,
    FiX,
    FiDownload,
    FiLock
} from 'react-icons/fi'

interface RecibosPanelProps {
    onBack?: () => void
}

interface FilePreview {
    url: string
    type: 'pdf' | 'image'
}

export default function RecibosPanel({ onBack }: RecibosPanelProps) {
    const [receipts, setReceipts] = useState<any[]>([])
    const [previewData, setPreviewData] = useState<FilePreview | null>(null)
    const [isLoadingPreview, setIsLoadingPreview] = useState(false)

    // Cargar recibos al iniciar
    const fetchReceipts = async () => {
        try {
            const data = await getAllReceipts()
            setReceipts(data)
        } catch {
            alertError('Error cargando recibos')
        }
    }

    useEffect(() => {
        fetchReceipts()
    }, [])

    // Validar si puede cambiar de estado
    const canChangeStatus = (currentStatus: string) => {
        if (currentStatus !== 'PENDIENTE') {
            alertError(`No se puede cambiar el estado de un recibo ${currentStatus}`)
            return false
        }
        return true
    }

    // Aprobar o rechazar recibo
    const handleAction = async (
        id: number,
        estado: string,
        currentStatus: string
    ) => {
        if (!canChangeStatus(currentStatus)) return

        const actionText = estado === 'APROBADO' ? 'aprobar' : 'rechazar'
        const confirmed =
            estado === 'APROBADO'
                ? await confirmApproveAlert(
                    '¿Aprobar este recibo?',
                    'Esta acción creará una liquidación y no se puede revertir.'
                )
                : await confirmRejectAlert(
                    '¿Rechazar este recibo?',
                    'Esta acción no se puede revertir.'
                )

        if (!confirmed) return

        try {
            await updateReceiptStatus(id, estado)
            alertSuccess(`Recibo ${actionText}do correctamente`)
            setReceipts(prev => prev.map(r => (r.id === id ? { ...r, estado } : r)))
        } catch (error: any) {
            console.error('Error al actualizar estado:', error)
            alertError(
                error?.response?.data?.message || 'No se pudo actualizar el estado'
            )
        }
    }

    // Eliminar recibo
    const handleDelete = async (id: number, estado: string) => {
        const message =
            estado === 'APROBADO'
                ? 'Este recibo está APROBADO. ¿Seguro que deseas eliminarlo?'
                : '¿Eliminar este recibo?'
        const detail =
            estado === 'APROBADO'
                ? 'También se eliminará la liquidación asociada. Esta acción no se puede deshacer.'
                : 'Esta acción no se puede deshacer.'

        const confirmed = await confirmDeleteAlert(message, detail)
        if (!confirmed) return

        try {
            await deleteReceipt(id)
            alertSuccess('Recibo eliminado correctamente')
            setReceipts(prev => prev.filter(r => r.id !== id))
        } catch (error: any) {
            console.error('Error al eliminar:', error)
            alertError(
                error?.response?.data?.message || 'Error al eliminar el recibo'
            )
        }
    }

    // Detectar tipo de archivo
    const detectFileType = (url: string): FilePreview => {
        if (!url) return { url: '', type: 'image' }
        const cleanUrl = url.split('?')[0].toLowerCase()
        const isPdf = cleanUrl.endsWith('.pdf') || cleanUrl.includes('/raw/upload/')
        let finalUrl = url
        if (isPdf && url.includes('/image/upload/')) {
            finalUrl = url.replace('/image/upload/', '/raw/upload/')
        }
        return { url: finalUrl, type: isPdf ? 'pdf' : 'image' }
    }

    // Previsualizar archivo
    const handleViewFile = (url: string) => {
        if (!url) {
            alertError('No hay archivo disponible para este recibo')
            return
        }
        setIsLoadingPreview(true)
        const fileData = detectFileType(url)
        setPreviewData(fileData)
        setIsLoadingPreview(false)
    }

    const closePreview = () => setPreviewData(null)
    const handleDownload = () => {
        if (previewData?.url) window.open(previewData.url, '_blank')
    }

    // Estilos de estado
    const getStatusBadge = (estado: string) => {
        const styles = {
            APROBADO: 'bg-green-100 text-green-700 border border-green-300',
            RECHAZADO: 'bg-red-100 text-red-700 border border-red-300',
            PENDIENTE: 'bg-yellow-100 text-yellow-700 border border-yellow-300'
        }
        return styles[estado as keyof typeof styles] || styles.PENDIENTE
    }

    return (
        <div className='space-y-6 relative'>
            {/* Encabezado */}
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-lg font-semibold text-gray-800'>
                        Gestión de Recibos
                    </h2>
                    <p className='text-sm text-gray-500 mt-1'>
                        Solo puedes aprobar o rechazar recibos{' '}
                        <span className='font-semibold text-yellow-600'>PENDIENTES</span>
                    </p>
                </div>
                {onBack && (
                    <button
                        onClick={onBack}
                        className='flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline'
                    >
                        Volver al panel
                    </button>
                )}
            </div>

            {/* Tabla (desktop) */}
            <div className='hidden sm:block overflow-x-auto rounded-lg border border-gray-200 bg-white'>
                <table className='min-w-full text-sm text-gray-700'>
                    <thead className='bg-gray-100 text-gray-800 font-semibold'>
                        <tr>
                            <th className='p-3 text-left'>Usuario</th>
                            <th className='p-3 text-left'>Servicio</th>
                            <th className='p-3 text-left'>Monto</th>
                            <th className='p-3 text-left'>Archivo</th>
                            <th className='p-3 text-left'>Estado</th>
                            <th className='p-3 text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.length === 0 ? (
                            <tr>
                                <td colSpan={6} className='p-8 text-center text-gray-500'>
                                    No hay recibos registrados
                                </td>
                            </tr>
                        ) : (
                            receipts.map(r => {
                                const isPending = r.estado === 'PENDIENTE'
                                return (
                                    <tr
                                        key={r.id}
                                        className='border-t hover:bg-gray-50 transition-colors'
                                    >
                                        <td className='p-3 whitespace-nowrap'>
                                            {r.usuario?.nombreCompleto || '—'}
                                        </td>
                                        <td className='p-3 whitespace-nowrap'>{r.servicio}</td>
                                        <td className='p-3 whitespace-nowrap font-medium'>
                                            ${r.monto.toLocaleString()}
                                        </td>
                                        <td className='p-3'>
                                            <button
                                                onClick={() => handleViewFile(r.archivoUrl)}
                                                className='flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors'
                                            >
                                                <FiEye /> Ver
                                            </button>
                                        </td>
                                        <td className='p-3 whitespace-nowrap'>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                                    r.estado
                                                )}`}
                                            >
                                                {r.estado}
                                            </span>
                                        </td>
                                        <td className='p-3'>
                                            <div className='flex gap-2 justify-center items-center'>
                                                {/* Aprobar */}
                                                <button
                                                    onClick={() =>
                                                        handleAction(r.id, 'APROBADO', r.estado)
                                                    }
                                                    disabled={!isPending}
                                                    className={`p-2 rounded-lg transition-all ${isPending
                                                        ? 'text-green-600 hover:bg-green-50 hover:scale-110'
                                                        : 'text-gray-300 cursor-not-allowed'
                                                        }`}
                                                    title={
                                                        isPending
                                                            ? 'Aprobar recibo'
                                                            : 'Solo se pueden aprobar recibos pendientes'
                                                    }
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
                                                        handleAction(r.id, 'RECHAZADO', r.estado)
                                                    }
                                                    disabled={!isPending}
                                                    className={`p-2 rounded-lg transition-all ${isPending
                                                        ? 'text-yellow-600 hover:bg-yellow-50 hover:scale-110'
                                                        : 'text-gray-300 cursor-not-allowed'
                                                        }`}
                                                    title={
                                                        isPending
                                                            ? 'Rechazar recibo'
                                                            : 'Solo se pueden rechazar recibos pendientes'
                                                    }
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
                                                    className='p-2 rounded-lg text-red-600 hover:bg-red-50 hover:scale-110 transition-all'
                                                    title='Eliminar recibo (elimina de BD y Cloudinary)'
                                                >
                                                    <FiTrash size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Versión móvil */}
            <div className='sm:hidden space-y-4'>
                {receipts.length === 0 ? (
                    <div className='text-center py-8 text-gray-500 bg-white rounded-xl border shadow-sm'>
                        No hay recibos registrados
                    </div>
                ) : (
                    receipts.map(r => {
                        const isPending = r.estado === 'PENDIENTE'
                        return (
                            <div
                                key={r.id}
                                className='border border-gray-200 rounded-2xl p-4 bg-white shadow-sm'
                            >
                                <div className='flex justify-between items-center mb-2'>
                                    <p className='font-semibold text-gray-800 text-base'>
                                        {r.usuario?.nombreCompleto}
                                    </p>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                                            r.estado
                                        )}`}
                                    >
                                        {r.estado}
                                    </span>
                                </div>

                                <p className='text-sm text-gray-600'>{r.servicio}</p>
                                <p className='text-sm text-gray-600 font-medium mb-3'>
                                    Monto: ${r.monto.toLocaleString()}
                                </p>

                                <button
                                    onClick={() => handleViewFile(r.archivoUrl)}
                                    className='flex items-center gap-1 text-blue-600 text-sm font-semibold mb-3'
                                >
                                    <FiEye /> Ver archivo
                                </button>

                                <div className='grid grid-cols-3 gap-2 mt-2'>
                                    <button
                                        onClick={() => handleAction(r.id, 'APROBADO', r.estado)}
                                        disabled={!isPending}
                                        className={`flex items-center justify-center gap-1 text-sm font-medium rounded-lg py-2 ${isPending
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <FiCheckCircle /> Aprobar
                                    </button>
                                    <button
                                        onClick={() => handleAction(r.id, 'RECHAZADO', r.estado)}
                                        disabled={!isPending}
                                        className={`flex items-center justify-center gap-1 text-sm font-medium rounded-lg py-2 ${isPending
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <FiXCircle /> Rechazar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(r.id, r.estado)}
                                        className='flex items-center justify-center gap-1 text-sm font-medium rounded-lg py-2 bg-red-100 text-red-700'
                                    >
                                        <FiTrash /> Eliminar
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            {/* Modal de previsualización */}
            {previewData && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={closePreview}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[95vh] flex flex-col"
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
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

            {/* Loading */}
            {isLoadingPreview && (
                <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-40'>
                    <div className='bg-white rounded-lg p-6 shadow-xl text-center'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
                        <p className='mt-4 text-gray-600'>Cargando archivo...</p>
                    </div>
                </div>
            )}
        </div>
    )
}
