import HeroIllustration from "../../assets/personas.png";

export default function HeroSection() {
    return (
        <section
            id="inicio"
            className="relative bg-gradient-to-br from-[#1976d2] via-[#1565c0] to-[#0d47a1] text-white overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
        >
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Texto */}
                <div className="text-center md:text-left space-y-8">
                    <span className="bg-blue-500/30 backdrop-blur-sm text-secondary px-4 py-2 rounded-full text-sm font-semibold border border-white/30 mb-4 inline-block">
                        Sigue creciendo en tu misión
                    </span>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                        Apoyo Financiero para{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                            Misioneros
                        </span>
                    </h2>

                    <p className="text-lg text-blue-100 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
                        Recibe bonificaciones para pagar tus servicios públicos en Medellín.
                        Un programa de apoyo de la Corporación Universitaria Adventista.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <a
                            href="/login"
                            className="group bg-white text-[#1976d2] px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Acceder a mi cuenta
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </span>
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                        {[
                            { value: "500+", label: "Misioneros apoyados" },
                            { value: "100%", label: "Digital y seguro" },
                            { value: "24/7", label: "Soporte continuo" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-bold text-yellow-300">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-blue-200">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Imagen decorativa */}
                <div className="flex justify-center md:justify-end relative">
                    <img
                        src={HeroIllustration}
                        alt="Ilustración de apoyo a misioneros"
                        className="w-[380px] md:w-[480px] lg:w-[520px] drop-shadow-2xl select-none"
                    />
                </div>
            </div>

            {/* Onda inferior corregida */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg
                    className="relative block w-[calc(100%+30px)] h-[80px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
               82.38-16.57,168.19-17.81,250.45-.39,
               70.19,14.46,136.75,42.51,207,57.54,
               75.7,16,155.19,17.5,230.35,0V120H0V27.35
               A600.21,600.21,0,0,0,321.39,56.44Z"
                        fill="#f9fafb"
                    ></path>
                </svg>
            </div>
        </section>
    );
}
