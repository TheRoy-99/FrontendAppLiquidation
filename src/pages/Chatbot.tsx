import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<
    { content: string; isBot: boolean }[]
  >([
    {
      content:
        "¡Hola! 👋 Soy el asistente virtual de App Liquidation. Estoy aquí para ayudarte con información sobre nuestro programa de apoyo para misioneros.",
      isBot: true,
    },
  ]);
  const [showOptions, setShowOptions] = useState(true);

  const addMessage = (content: string, isBot = true) => {
    setMessages((prev) => [...prev, { content, isBot }]);
  };

  const resetChat = () => {
    setMessages([
      {
        content:
          "¡Hola! 👋 Soy el asistente virtual de App Liquidation. Estoy aquí para ayudarte con información sobre nuestro programa de apoyo para misioneros.",
        isBot: true,
      },
    ]);
    setShowOptions(true);
  };

  const handleOption = (option: string) => {
    setShowOptions(false);
    addMessage(option, false);

    setTimeout(() => {
      switch (option) {
        case "¿De qué trata App Liquidation?":
          addMessage(
            `
            📱 <strong>App Liquidation es un programa de apoyo financiero para misioneros.</strong><br/>
            Nuestro objetivo es ayudar a los misioneros en Medellín con bonificaciones económicas para el pago de sus servicios públicos.<br/>
            🏛️ Respaldado por: Corporación Universitaria Adventista (UNAC)<br/>
            📍 Ubicación: Medellín, Barrio La Castellana
          `,
            true
          );
          break;

        case "Necesito ayuda / Contacto":
          addMessage(
            `
            📞 <strong>Información de contacto:</strong><br/>
            👩‍💼 Martha Patricia Tobías Ramos - Coordinadora de Nómina<br/>
            📧 <a href="mailto:Nomina@unac.edu.co" class="underline text-blue-600">Nomina@unac.edu.co</a><br/>
            📱 +57 (604) 480 55 90 ext 201
          `,
            true
          );
          break;

        case "¿Cómo funciona el proceso?":
          addMessage(
            `
            🔄 <strong>Proceso paso a paso:</strong><br/>
            1️⃣ Inicia sesión con tu cuenta.<br/>
            2️⃣ Sube la foto de tu recibo.<br/>
            3️⃣ Nuestro equipo revisa la información.<br/>
            4️⃣ Recibes la bonificación si es aprobada.<br/>
            ⏱️ Tiempo promedio: 2-3 días hábiles.
          `,
            true
          );
          break;

        case "Requisitos para aplicar":
          addMessage(
            `
            📋 <strong>Requisitos:</strong><br/>
            ✅ Ser misionero activo registrado en UNAC.<br/>
            ✅ Residir en Medellín.<br/>
            ✅ Factura de servicios públicos a tu nombre.<br/>
            ✅ Foto clara y legible del recibo.<br/>
            ⚠️ Importante: Solo se aceptan facturas de agua, luz, gas, internet.
          `,
            true
          );
          break;

        default:
          addMessage("Opción no válida.", true);
      }
    }, 1200);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-500">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AL</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                App Liquidation
              </h1>
              <p className="text-sm text-gray-600">Asistente Virtual</p>
            </div>
          </div>

          {/* 🔙 Botón Regresar */}
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            🔙 Regresar
          </button>
        </div>
      </header>

      {/* Chat */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="chat-container p-6 space-y-4 h-[600px] overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message flex items-start space-x-3 ${
                  msg.isBot ? "" : "justify-end"
                }`}
              >
                {msg.isBot ? (
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      🤖
                    </div>
                    <div
                      className="bg-gray-100 rounded-lg p-4 max-w-md"
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                  </div>
                ) : (
                  <div className="bg-blue-600 text-white rounded-lg p-4 max-w-md">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}

            {showOptions && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-2">
                  ¿En qué puedo ayudarte hoy?
                </p>
                {[
                  "¿De qué trata App Liquidation?",
                  "Necesito ayuda / Contacto",
                  "¿Cómo funciona el proceso?",
                  "Requisitos para aplicar",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOption(opt)}
                    className="w-full text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-3"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="border-t bg-gray-50 p-4 flex items-center space-x-3">
            <button
              onClick={resetChat}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              🔄 Reiniciar
            </button>
            <div className="flex-1 bg-white rounded-lg border border-gray-300 px-4 py-2 text-gray-500">
              Selecciona una opción arriba para continuar...
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
