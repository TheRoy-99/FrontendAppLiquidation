import { useState, useEffect, useRef } from "react";
import {
    FiUpload,
    FiEye,
    FiDownload,
    FiFile,
    FiCheckCircle,
    FiClock,
    FiXCircle,
    FiCamera,
} from "react-icons/fi";
import api from "../../../services/api";
import Swal from "sweetalert2";
import FilePreviewModal from "./FilePreviewModal";

interface Receipt {
    id: string;
    servicio: string;
    mes: string;
    monto: number;
    estado: "APROBADO" | "PENDIENTE" | "RECHAZADO";
    fechaSubida: string;
    archivoUrl: string;
}

export default function RecibosPanel() {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
    const [recibos, setRecibos] = useState<Receipt[]>([]);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        servicio: "",
        mes: "",
        monto: "",
        file: null as File | null,
    });
    const [subiendo, setSubiendo] = useState(false);

    // Estados para cámara con manejo seguro
    const [showCamera, setShowCamera] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [cameraReady, setCameraReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        fetchRecibos();
    }, []);

    // Manejo seguro de cámara con cleanup
    useEffect(() => {
        if (showCamera && videoRef.current && !stream) {
            startCamera();
        } else if (!showCamera && stream) {
            // Cleanup al cerrar cámara
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setCameraReady(false);
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }

        return () => {
            // Cleanup global al desmontar componente
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
        };
    }, [showCamera, stream]);

    // Verificar si video está listo para capturar
    useEffect(() => {
        if (videoRef.current && videoRef.current.videoWidth > 0) {
            setCameraReady(true);
        }
    }, [showCamera]);

    const startCamera = async () => {
        try {
            // Verificar soporte de cámara
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("Cámara no soportada en este navegador");
            }

            // Preferir cámara trasera en móviles
            const constraints = {
                video: {
                    facingMode: 'environment' as const,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play().catch(err => {
                    console.warn("Error al reproducir video:", err);
                });
                setStream(mediaStream);
            }
        } catch (err: any) {
            console.error("Error al iniciar cámara:", err);
            let errorMessage = "No se puede acceder a la cámara.";

            if (err.name === 'NotAllowedError') {
                errorMessage = "Permisos de cámara denegados. Habilita los permisos e intenta de nuevo.";
            } else if (err.name === 'NotFoundError') {
                errorMessage = "No se encontró cámara en el dispositivo.";
            } else if (err.name === 'NotSupportedError') {
                errorMessage = "Cámara no soportada.";
            }

            Swal.fire({
                title: "Sin acceso a cámara",
                text: errorMessage,
                icon: "info",
                footer: "Puedes usar el selector de archivos en su lugar"
            });
            setShowCamera(false);
            setForm(prev => ({ ...prev, file: null }));
        }
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas || !stream || !cameraReady) {
            Swal.fire("Error", "La cámara no está lista. Intenta de nuevo.", "error");
            return;
        }

        if (video.videoWidth === 0 || video.videoHeight === 0) {
            Swal.fire("Espera un momento", "La cámara está cargando. Intenta capturar de nuevo.", "warning");
            return;
        }

        try {
            // Configurar canvas con dimensiones del video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Dibujar imagen del video en canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convertir canvas a Blob y luego a File
                canvas.toBlob((blob) => {
                    if (blob) {
                        const fileName = `recibo_${new Date().getTime()}.jpg`;
                        const file = new File([blob], fileName, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });

                        // Actualizar form con el archivo capturado
                        setForm(prev => ({
                            ...prev,
                            file,
                            servicio: prev.servicio || '',
                            mes: prev.mes || '',
                            monto: prev.monto || ''
                        }));

                        // Cerrar cámara
                        setShowCamera(false);

                        // Mostrar confirmación
                        Swal.fire({
                            title: "Foto capturada",
                            text: `Imagen "${fileName}" lista para subir`,
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        });
                    } else {
                        throw new Error("No se pudo generar la imagen");
                    }
                }, 'image/jpeg', 0.8); // 80% calidad para balancear tamaño
            }
        } catch (error) {
            console.error("Error al capturar foto:", error);
            Swal.fire("Error", "No se pudo capturar la imagen. Intenta de nuevo.", "error");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowCamera(false);
        setForm({ servicio: "", mes: "", monto: "", file: null });
        // Cleanup de stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    const fetchRecibos = async () => {
        try {
            const res = await api.get("/receipts/me");
            const data = res.data.sort(
                (a: any, b: any) =>
                    new Date(b.fechaSubida).getTime() - new Date(a.fechaSubida).getTime()
            );
            setRecibos(data || []);
        } catch (error) {
            console.error("Error al cargar recibos:", error);
            setRecibos([]);
            Swal.fire("Error", "No se pudieron cargar los recibos.", "error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files && files[0]) {
            const file = files[0];
            // Validación inmediata del archivo seleccionado
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                Swal.fire("Archivo no válido", "Solo se permiten PDF o imágenes (JPG/PNG).", "warning");
                return;
            }
            // Límite de tamaño: 10MB
            if (file.size > 10 * 1024 * 1024) {
                Swal.fire("Archivo muy grande", "El archivo no debe superar 10MB.", "warning");
                return;
            }
            setForm((prev) => ({
                ...prev,
                [name]: file
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación completa de campos
        if (!form.servicio.trim() || !form.mes.trim() || !form.monto || !form.file) {
            Swal.fire("Campos incompletos", "Completa todos los campos requeridos.", "warning");
            return;
        }

        if (isNaN(Number(form.monto)) || Number(form.monto) <= 0) {
            Swal.fire("Monto inválido", "Ingresa un monto válido mayor a 0.", "warning");
            return;
        }

        // Validación final de archivo
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(form.file.type)) {
            Swal.fire("Archivo inválido", "Solo se permiten PDF o imágenes (JPG/PNG).", "warning");
            return;
        }

        const formData = new FormData();
        formData.append("servicio", form.servicio.trim());
        formData.append("mes", form.mes.trim());
        formData.append("monto", form.monto);
        formData.append("file", form.file);

        try {
            setSubiendo(true);
            const response = await api.post("/receipts/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                timeout: 30000 // 30 segundos timeout
            });

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: "¡Éxito!",
                    text: "Recibo subido correctamente.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });

                handleCloseModal();
                await fetchRecibos(); // Refrescar lista
                setForm({ servicio: "", mes: "", monto: "", file: null });
            }
        } catch (err: any) {
            console.error("Error al subir archivo:", err);
            let errorMessage = "No se pudo subir el archivo.";

            if (err.response?.status === 413) {
                errorMessage = "Archivo demasiado grande. Intenta con un archivo más pequeño.";
            } else if (err.response?.status === 400) {
                errorMessage = "Datos inválidos. Verifica la información ingresada.";
            } else if (err.code === 'ECONNABORTED') {
                errorMessage = "Tiempo de espera agotado. Intenta de nuevo.";
            }

            Swal.fire("Error", errorMessage, "error");
        } finally {
            setSubiendo(false);
        }
    };

    const handleDownload = async (url: string, nombre: string) => {
        try {
            if (!url) {
                Swal.fire("Error", "No hay archivo disponible para descargar.", "error");
                return;
            }

            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = nombre || "recibo.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "No se pudo descargar el archivo.", "error");
        }
    };


    // Cálculos para tarjetas de resumen
    const totalAprobado = recibos
        .filter((r) => r.estado === "APROBADO")
        .reduce((acc, r) => acc + r.monto, 0);

    const pendientesCount = recibos.filter((r) => r.estado === "PENDIENTE").length;

    const promedio = recibos.length > 0
        ? Math.round(recibos.reduce((acc, r) => acc + r.monto, 0) / recibos.length)
        : 0;

    return (
        <div className="pb-6">
            {/* Header del panel */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
                <h1 className="text-2xl font-semibold text-[var(--color-text)] flex items-center gap-2">
                    <FiFile className="text-[var(--color-primary)]" /> Mis Recibos
                </h1>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 active:scale-95 transition w-full sm:w-auto"
                >
                    <FiUpload className="text-lg" />
                    Subir Recibo
                </button>
            </div>

            {/* Tarjetas de resumen - ESQUEMA BLANCO ORIGINAL */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500 p-4 hover:shadow-md transition">
                    <h3 className="text-sm text-gray-600">Total Aprobado</h3>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                        ${totalAprobado.toLocaleString()}
                    </p>
                    <span className="text-sm text-gray-500">
                        En recibos aprobados
                    </span>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-orange-500 p-4 hover:shadow-md transition">
                    <h3 className="text-sm text-gray-600">Recibos Pendientes</h3>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                        {pendientesCount}
                    </p>
                    <span className="text-sm text-gray-500">
                        Esperando aprobación
                    </span>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-500 p-4 hover:shadow-md transition">
                    <h3 className="text-sm text-gray-600">Promedio por Recibo</h3>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                        ${promedio.toLocaleString()}
                    </p>
                    <span className="text-sm text-gray-500">
                        Valor promedio
                    </span>
                </div>
            </div>

            {/* Lista de recibos - ESQUEMA BLANCO ORIGINAL */}
            <div className="space-y-4">
                {recibos.length > 0 ? (
                    recibos.map((r) => (
                        <div
                            key={r.id}
                            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition hover:shadow-md"
                        >
                            {/* Información del recibo */}
                            <div className="flex-1 min-w-[180px]">
                                <h3 className="font-semibold text-gray-900">
                                    {r.servicio} • {r.mes}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Subido: {new Date(r.fechaSubida).toLocaleDateString('es-ES')}
                                </p>
                                <p className="text-xl font-bold text-gray-900 mt-1">
                                    ${r.monto.toLocaleString()}
                                </p>
                            </div>

                            {/* Estado y acciones */}
                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-start sm:justify-end gap-2 w-full sm:w-auto">
                                {/* Badge de estado */}
                                <span
                                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${r.estado === "APROBADO"
                                        ? "bg-green-100 text-green-700"
                                        : r.estado === "PENDIENTE"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {r.estado === "APROBADO" && <FiCheckCircle className="text-xs" />}
                                    {r.estado === "PENDIENTE" && <FiClock className="text-xs" />}
                                    {r.estado === "RECHAZADO" && <FiXCircle className="text-xs" />}
                                    {r.estado.charAt(0) + r.estado.slice(1).toLowerCase()}
                                </span>

                                {/* Botón ver archivo */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedFileUrl(r.archivoUrl)}
                                    className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg transition whitespace-nowrap w-full sm:w-auto"
                                >
                                    <FiEye className="text-sm" /> Ver archivo
                                </button>


                                {/* Botón descargar */}
                                <button
                                    onClick={() => handleDownload(r.archivoUrl, `${r.servicio}_${r.mes}.pdf`)}
                                    className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg transition whitespace-nowrap w-full sm:w-auto"
                                >
                                    <FiDownload className="text-sm" /> Descargar
                                </button>

                            </div>s
                        </div>
                    ))
                ) : (
                    <div className="bg-white text-gray-500 text-center py-16 rounded-xl border border-gray-200">
                        <FiFile className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No tienes recibos</h3>
                        <p className="text-sm">Sube tu primer recibo usando el botón de arriba</p>
                    </div>
                )}
            </div>

            {/* Modal de subida - ESQUEMA BLANCO ORIGINAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center px-4 sm:px-0 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                            <FiUpload className="text-[var(--color-primary)]" />
                            Subir nuevo recibo
                        </h2>

                        <form onSubmit={handleUpload} className="space-y-4">
                            {/* Campo Servicio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Servicio *
                                </label>
                                <input
                                    type="text"
                                    name="servicio"
                                    value={form.servicio}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ej: Agua, Luz, Gas, Internet"
                                    required
                                />
                            </div>

                            {/* Campo Mes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mes/Año *
                                </label>
                                <input
                                    type="text"
                                    name="mes"
                                    value={form.mes}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ej: Octubre 2025"
                                    required
                                />
                            </div>

                            {/* Campo Monto */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Monto *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        name="monto"
                                        value={form.monto}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-8 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Sección de Archivo con opciones */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Archivo (PDF o Foto) *
                                </label>

                                {showCamera ? (
                                    // Vista de cámara
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className="w-full rounded-lg bg-black object-cover aspect-video"
                                                onLoadedMetadata={() => setCameraReady(true)}
                                                onError={(e) => {
                                                    console.error("Error en video:", e);
                                                    Swal.fire("Error de cámara", "No se puede mostrar la cámara.", "error");
                                                    setShowCamera(false);
                                                }}
                                            />
                                            {!cameraReady && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                                    <div className="text-white text-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                                                        <p className="text-sm">Cargando cámara...</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <canvas
                                            ref={canvasRef}
                                            className="hidden"
                                            aria-hidden="true"
                                        />

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={capturePhoto}
                                                disabled={!cameraReady}
                                                className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                                            >
                                                <FiCamera className="text-lg" />
                                                {cameraReady ? "Capturar" : "Cargando..."}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowCamera(false);
                                                    if (stream) {
                                                        stream.getTracks().forEach(track => track.stop());
                                                        setStream(null);
                                                    }
                                                }}
                                                className="flex-1 bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
                                            >
                                                <FiXCircle className="text-lg" />
                                                Cancelar
                                            </button>
                                        </div>

                                        <p className="text-xs text-gray-500 text-center">
                                            Asegúrate de que el recibo esté bien iluminado y legible
                                        </p>
                                    </div>
                                ) : (
                                    // Selector de archivos
                                    <div className="space-y-3">
                                        <label
                                            htmlFor="file-upload"
                                            className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${form.file
                                                ? 'border-green-300 bg-green-50'
                                                : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                                                }`}
                                        >
                                            <FiFile className="text-2xl" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {form.file ? form.file.name : "Seleccionar archivo"}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {form.file
                                                        ? `PDF o Imagen (${(form.file.size / 1024 / 1024).toFixed(2)} MB)`
                                                        : "PDF, JPG, PNG hasta 10MB"
                                                    }
                                                </p>
                                            </div>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                name="file"
                                                accept="application/pdf,image/jpeg,image/jpg,image/png"
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                        </label>

                                        {/* Botón para activar cámara */}
                                        <button
                                            type="button"
                                            onClick={() => setShowCamera(true)}
                                            disabled={!!form.file} // Deshabilitar si ya hay archivo
                                            className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 py-3 border border-blue-200 rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FiCamera className="text-lg" />
                                            {form.file ? "Cambiar por foto con cámara" : "O tomar foto con cámara"}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Botones de acción */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    disabled={subiendo}
                                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 w-full sm:w-auto transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={subiendo || !form.file || !form.servicio || !form.mes || !form.monto}
                                    className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm w-full sm:w-auto transition"
                                >
                                    {subiendo ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Subiendo...
                                        </>
                                    ) : (
                                        "Subir Recibo"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <FilePreviewModal
                fileUrl={selectedFileUrl}
                onClose={() => setSelectedFileUrl(null)}
            />

        </div>

    );
}
