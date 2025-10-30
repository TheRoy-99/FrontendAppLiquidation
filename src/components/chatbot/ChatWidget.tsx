import { useState } from "react";
import { RiRobotFill } from "react-icons/ri";
import ChatModal from "../chatbot/ChatModal";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Botón flotante */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all duration-300"
                aria-label="Abrir asistente virtual"
            >
                <RiRobotFill className="w-6 h-6" />
            </button>

            {/* Modal */}
            {open && <ChatModal onClose={() => setOpen(false)} />}
        </>
    );
}
