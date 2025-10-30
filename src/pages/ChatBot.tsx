import { useState, useEffect, useRef } from "react";
import {
    HiSparkles,
    HiPhone,
    HiRefresh,
    HiPaperAirplane,
    HiCheckCircle,
    HiExclamationCircle,
    HiArrowLeft,
    HiChevronRight,
    HiClock,
    HiLocationMarker,
    HiMail,
    HiOfficeBuilding,
} from "react-icons/hi";
import { RiRobotFill } from "react-icons/ri";
import { MdSmartphone, MdSupportAgent } from "react-icons/md";
import { FaClipboardList, FaRecycle } from "react-icons/fa";
import type { JSX } from "react/jsx-runtime";

export default function Chatbot() {
    const [messages, setMessages] = useState<
        { content: string | JSX.Element; isBot: boolean }[]
    >([
        {
            content: (
                <div className="space-y-2">
                    <p className="font-semibold text-lg">¡Hola!</p>
                    <p>
                        Soy el asistente virtual de App Liquidation. Estoy aquí para
                        ayudarte con información sobre nuestro programa de apoyo para
                        misioneros.
                    </p>
                </div>
            ),
            isBot: true,
        },
    ]);

    const [showOptions, setShowOptions] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const addMessage = (content: string | JSX.Element, isBot = true) => {
        setMessages((prev) => [...prev, { content, isBot }]);
    };

    const resetChat = () => {
        setMessages([
            {
                content: (
                    <div className="space-y-2">
                        <p className="font-semibold text-lg">¡Hola!</p>
                        <p>
                            Soy el asistente virtual de App Liquidation. Estoy aquí para
                            ayudarte con información sobre nuestro programa de apoyo para
                            misioneros.
                        </p>
                    </div>
                ),
                isBot: true,
            },
        ]);
        setShowOptions(true);
    };

    const handleOption = (option: string) => {
        setShowOptions(false);
        addMessage(option, false);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            switch (option) {
                case "¿De qué trata App Liquidation?":
                    addMessage(
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-base md:text-lg">
                                <MdSmartphone className="text-2xl md:text-3xl flex-shrink-0" />
                                <span>App Liquidation - Apoyo a Misioneros</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                Nuestro objetivo es ayudar a los misioneros en Medellín con
                                bonificaciones económicas para el pago de sus servicios
                                públicos.
                            </p>
                            <div className="bg-blue-50 rounded-lg p-3 md:p-4 border-l-4 border-blue-500 space-y-2">
                                <div className="flex items-start gap-2 text-sm md:text-base">
                                    <HiOfficeBuilding className="text-blue-600 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700">
                                        <strong>Respaldado por:</strong> Corporación Universitaria
                                        Adventista (UNAC)
                                    </p>
                                </div>
                                <div className="flex items-start gap-2 text-sm md:text-base">
                                    <HiLocationMarker className="text-blue-600 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700">
                                        <strong>Ubicación:</strong> Medellín, Barrio La Castellana
                                    </p>
                                </div>
                            </div>
                        </div>,
                        true
                    );
                    break;

                case "Necesito ayuda / Contacto":
                    addMessage(
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-base md:text-lg">
                                <HiPhone className="text-2xl md:text-3xl flex-shrink-0" />
                                <span>Información de Contacto</span>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 md:p-4 space-y-3">
                                <div className="flex items-start gap-3">
                                    <MdSupportAgent className="text-3xl md:text-4xl text-blue-600 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm md:text-base">
                                            Martha Patricia Tobías Ramos
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-600">
                                            Coordinadora de Nómina
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-blue-200 pt-3 space-y-2">
                                    <div className="flex items-start gap-2 text-sm md:text-base">
                                        <HiMail className="text-xl text-blue-600 mt-0.5 flex-shrink-0" />
                                        <a
                                            href="mailto:Nomina@unac.edu.co"
                                            className="text-blue-600 hover:text-blue-700 font-medium underline break-all"
                                        >
                                            Nomina@unac.edu.co
                                        </a>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm md:text-base">
                                        <HiPhone className="text-xl text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">
                                            +57 (604) 480 55 90 ext 201
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>,
                        true
                    );
                    break;

                case "¿Cómo funciona el proceso?":
                    addMessage(
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-base md:text-lg">
                                <FaRecycle className="text-2xl md:text-3xl flex-shrink-0" />
                                <span>Proceso Paso a Paso</span>
                            </div>
                            <div className="space-y-2 md:space-y-3">
                                {[
                                    { step: 1, text: "Inicia sesión con tu cuenta", color: "blue" },
                                    { step: 2, text: "Sube la foto de tu recibo", color: "indigo" },
                                    {
                                        step: 3,
                                        text: "Nuestro equipo revisa la información",
                                        color: "purple",
                                    },
                                    {
                                        step: 4,
                                        text: "Recibes la bonificación si es aprobada",
                                        color: "green",
                                    },
                                ].map(({ step, text, color }) => (
                                    <div
                                        key={step}
                                        className={`flex items-start gap-2 md:gap-3 bg-${color}-50 rounded-lg p-2 md:p-3`}
                                    >
                                        <div
                                            className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-${color}-600 rounded-full flex items-center justify-center text-white text-sm md:text-base font-bold`}
                                        >
                                            {step}
                                        </div>
                                        <p className="text-gray-700 pt-0.5 md:pt-1 text-sm md:text-base">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-3">
                                <div className="flex items-start gap-2 text-sm md:text-base">
                                    <HiClock className="text-yellow-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-gray-700">
                                        <strong>Tiempo promedio:</strong> 2-3 días hábiles
                                    </p>
                                </div>
                            </div>
                        </div>,
                        true
                    );
                    break;

                case "Requisitos para aplicar":
                    addMessage(
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-base md:text-lg">
                                <FaClipboardList className="text-2xl md:text-3xl flex-shrink-0" />
                                <span>Requisitos Necesarios</span>
                            </div>
                            <div className="space-y-2">
                                {[
                                    "Ser misionero activo registrado en UNAC",
                                    "Residir en Medellín",
                                    "Factura de servicios públicos a tu nombre",
                                    "Foto clara y legible del recibo",
                                ].map((req, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-2 md:gap-3 bg-green-50 rounded-lg p-2 md:p-3 border-l-4 border-green-500"
                                    >
                                        <HiCheckCircle className="text-green-600 text-xl md:text-2xl flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700 text-sm md:text-base">{req}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-3">
                                <div className="flex items-start gap-2 text-sm md:text-base">
                                    <HiExclamationCircle className="text-orange-600 text-xl flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-700">
                                        <strong>Importante:</strong> Solo se aceptan facturas de
                                        agua, luz, gas e internet
                                    </p>
                                </div>
                            </div>
                        </div>,
                        true
                    );
                    break;

                default:
                    addMessage("Opción no válida.", true);
            }

            setTimeout(() => setShowOptions(true), 500);
        }, 1500);
    };

    const optionButtons = [
        {
            text: "¿De qué trata App Liquidation?",
            icon: <MdSmartphone className="text-xl md:text-2xl" />,
        },
        {
            text: "Necesito ayuda / Contacto",
            icon: <HiPhone className="text-xl md:text-2xl" />,
        },
        {
            text: "¿Cómo funciona el proceso?",
            icon: <FaRecycle className="text-xl md:text-2xl" />,
        },
        {
            text: "Requisitos para aplicar",
            icon: <FaClipboardList className="text-xl md:text-2xl" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 animate-slideInRight">
            {/* Header con glassmorphism */}
            <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-blue-100 sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500">
                <div className="max-w-4xl mx-auto px-4 py-5 flex justify-between items-center">
                    <div className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-xl">AL</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">App Liquidation</h1>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-sm text-gray-600">Asistente Virtual</p>
                            </div>
                        </div>
                    </div>

                    <a
                        href="/"
                        className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        <HiArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                        Regresar
                    </a>
                </div>
            </header>

            {/* Chat container principal */}
            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-slideInRight">
                    {/* Chat Messages */}
                    <div className="p-6 space-y-4 h-[600px] overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex items-start space-x-3 ${msg.isBot ? "" : "justify-end"}`}
                            >
                                {msg.isBot ? (
                                    <div className="flex space-x-3 max-w-2xl">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-xl shadow-lg flex-shrink-0">
                                            <RiRobotFill className="text-white" />
                                        </div>
                                        <div className="bg-white rounded-2xl rounded-tl-none p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                            {msg.content}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-none p-4 max-w-md shadow-lg">
                                        {msg.content}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Indicador de escritura */}
                        {isTyping && (
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                                    <RiRobotFill className="text-white" />
                                </div>
                                <div className="bg-white rounded-2xl rounded-tl-none p-5 shadow-md border border-gray-100">
                                    <div className="flex space-x-2">
                                        {[0, 150, 300].map((delay) => (
                                            <div
                                                key={delay}
                                                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                                style={{ animationDelay: `${delay}ms` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Opciones */}
                        {showOptions && !isTyping && (
                            <div className="space-y-3 animate-fade-in">
                                <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                                    <HiSparkles className="w-5 h-5 text-blue-600" />
                                    ¿En qué puedo ayudarte hoy?
                                </div>
                                <div className="grid gap-3">
                                    {optionButtons.map((opt) => (
                                        <button
                                            key={opt.text}
                                            onClick={() => handleOption(opt.text)}
                                            className="group w-full text-left bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all transform hover:scale-105 hover:shadow-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-blue-600">{opt.icon}</span>
                                                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                                    {opt.text}
                                                </span>
                                                <HiChevronRight className="w-5 h-5 ml-auto text-blue-600 transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 p-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={resetChat}
                                className="group flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all border border-gray-200"
                            >
                                <HiRefresh className="w-5 h-5 text-blue-600 transform group-hover:rotate-180 transition-transform duration-500" />
                                Reiniciar
                            </button>

                            <div className="flex-1 bg-white rounded-xl border-2 border-gray-200 px-5 py-3 text-gray-500 shadow-sm">
                                Selecciona una opción para continuar...
                            </div>

                            <button
                                disabled
                                className="opacity-60 cursor-not-allowed bg-gradient-to-r from-blue-600 to-blue-700 text-white px-7 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2"
                            >
                                Enviar
                                <HiPaperAirplane className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer info */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <HiSparkles className="inline w-4 h-4 text-blue-600 mr-1" />
                    Selecciona una opción para obtener información detallada
                </div>
            </div>
        </div>
    );
}
