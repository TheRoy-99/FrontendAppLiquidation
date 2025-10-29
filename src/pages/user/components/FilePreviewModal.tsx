import React from "react";

interface FilePreviewModalProps {
    fileUrl: string | null;
    onClose: () => void;
}

export default function FilePreviewModal({ fileUrl, onClose }: FilePreviewModalProps) {
    if (!fileUrl) return null;

    const ext = fileUrl.split(".").pop()?.toLowerCase() || "";
    const isImage = ["jpg", "jpeg", "png", "webp"].includes(ext);
    const isPDF = ext === "pdf";

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-4xl relative shadow-2xl overflow-hidden">
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                    aria-label="Cerrar vista previa"
                >
                    ✕
                </button>

                {/* Contenido principal */}
                <div className="p-4 md:p-6">
                    {isImage ? (
                        <img
                            src={fileUrl}
                            alt="Vista previa"
                            className="max-h-[75vh] w-full object-contain rounded-lg"
                        />
                    ) : isPDF ? (
                        <embed
                            src={`${fileUrl}#zoom=100&toolbar=0`}
                            type="application/pdf"
                            className="w-full h-[80vh] rounded-lg border"
                        />
                    ) : (
                        <p className="text-center text-gray-600 py-10">
                            No se puede previsualizar este tipo de archivo.
                        </p>
                    )}
                </div>

                {/* Botón inferior */}
                <div className="border-t bg-gray-50 flex justify-center py-3">
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Abrir en pestaña nueva
                    </a>
                </div>
            </div>
        </div>
    );
}
