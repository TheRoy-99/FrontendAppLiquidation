export default function StepsSection() {
    const steps = [
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            title: "Logéate en tu cuenta",
            description: "Inicia sesión con tu cuenta de misionero para acceder al sistema de bonificaciones.",
            bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
            textColor: "text-blue-600",
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            ),
            title: "Sube tu recibo",
            description: "Adjunta una imagen clara de tu factura de servicios públicos desde la plataforma.",
            bgColor: "bg-gradient-to-br from-indigo-100 to-indigo-200",
            textColor: "text-indigo-600",
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Recibe tu apoyo",
            description: "Una vez validado tu recibo, obtendrás la bonificación correspondiente a tu solicitud.",
            bgColor: "bg-gradient-to-br from-green-100 to-green-200",
            textColor: "text-green-600",
        },
    ];

    return (
        <section
            id="como-funciona"
            className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
        >
            {/* Capa difuminada superior para eliminar línea blanca */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white/90 to-white blur-[1px] pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
                        ¿Cómo funciona?
                    </h3>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Un proceso simple y transparente en tres pasos
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl"
                        >
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                {index + 1}
                            </div>

                            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                                <div
                                    className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                                >
                                    <div className={step.textColor}>{step.icon}</div>
                                </div>
                            </div>

                            <h4 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                                {step.title}
                            </h4>
                            <p className="text-gray-600 text-center leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
