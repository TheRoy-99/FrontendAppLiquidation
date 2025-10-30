import { useState, useEffect, useRef } from "react";
import { RiRobotFill } from "react-icons/ri";
import { HiX, HiChevronRight } from "react-icons/hi";

export default function ChatModal({ onClose }: { onClose: () => void }) {
    const [messages, setMessages] = useState([
        { content: "¡Hola! 👋 Soy el asistente virtual de App Liquidation.", isBot: true },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showOptions, setShowOptions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const options = [
        "¿De qué trata App Liquidation?",
        "Necesito ayuda / Contacto",
        "¿Cómo funciona el proceso?",
        "Requisitos para aplicar",
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const addMessage = (content: string, isBot = true) => {
        setMessages((prev) => [...prev, { content, isBot }]);
    };

    const handleOptionClick = (opt: string) => {
        setInputValue(opt);
        setShowOptions(false);
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        addMessage(inputValue, false);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            switch (inputValue) {
                case "¿De qué trata App Liquidation?":
                    addMessage(
                        "App Liquidation apoya a misioneros de Medellín con bonificaciones económicas para el pago de servicios públicos. Está respaldado por la Corporación Universitaria Adventista (UNAC)."
                    );
                    break;
                case "Necesito ayuda / Contacto":
                    addMessage(
                        "Puedes comunicarte con: Martha Patricia Tobías Ramos (Coordinadora de Nómina). Email: Nomina@unac.edu.co 📞 +57 (604) 480 55 90 ext 201"
                    );
                    break;
                case "¿Cómo funciona el proceso?":
                    addMessage(
                        "1️⃣ Inicia sesión con tu cuenta.\n2️⃣ Sube tu recibo.\n3️⃣ Nuestro equipo revisa la información.\n4️⃣ Recibes la bonificación si es aprobada."
                    );
                    break;
                case "Requisitos para aplicar":
                    addMessage(
                        "✅ Ser misionero activo registrado en UNAC.\n✅ Residir en Medellín.\n✅ Factura de servicios a tu nombre.\n✅ Foto clara y legible del recibo."
                    );
                    break;
                default:
                    addMessage("No reconozco esa opción 🤔");
            }

            setShowOptions(true);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 flex justify-end items-end p-6 z-50">
            {/* Fondo */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

            {/* Contenedor */}
            <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl w-full max-w-sm h-[75vh] flex flex-col animate-slideInRight overflow-hidden z-10">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <RiRobotFill className="w-5 h-5" />
                        </div>
                        <h2 className="font-semibold text-sm">Asistente Virtual</h2>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition">
                        <HiX className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                            <div
                                className={`p-3 rounded-2xl shadow-sm max-w-[80%] whitespace-pre-line ${msg.isBot
                                        ? "bg-white text-gray-800 border border-gray-100"
                                        : "bg-blue-600 text-white rounded-tr-none"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-center gap-1 text-gray-400">
                            <span className="animate-bounce">•</span>
                            <span className="animate-bounce delay-150">•</span>
                            <span className="animate-bounce delay-300">•</span>
                        </div>
                    )}

                    {/* Opciones */}
                    {showOptions && !isTyping && (
                        <div className="grid gap-2 mt-3">
                            {options.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleOptionClick(opt)}
                                    className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-gray-700 px-3 py-2 rounded-lg border border-blue-100 hover:border-blue-300 text-sm transition-all"
                                >
                                    <HiChevronRight className="text-blue-500" />
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Selecciona una opción..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 bg-white rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className={`px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all ${inputValue
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}
