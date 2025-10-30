import Succes from "../../assets/financiero.svg";
export default function BackedByUnac() {
    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                {/* Texto institucional */}
                <div className="space-y-6">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        Respaldo institucional
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mt-4">
                        Respaldado por UNAC
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Este programa es una iniciativa de la Corporación Universitaria Adventista en Medellín,
                        comprometida con el bienestar de nuestros misioneros y su labor en la comunidad.
                    </p>

                    <ul className="space-y-4">
                        {[
                            "Proceso 100% digital y seguro",
                            "Apoyo directo para servicios públicos",
                            "Seguimiento en tiempo real",
                        ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3 group">
                                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-gray-700 font-medium text-lg">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="pt-6">
                        <a
                            href="/login"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                        >
                            Comenzar ahora
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Imagen decorativa */}
                <div className="flex justify-center md:justify-end relative">
                    <img
                        src={Succes}
                        alt="Ilustración de apoyo a misioneros"
                        className="w-[380px] md:w-[480px] lg:w-[520px] drop-shadow-2xl select-none"
                    />
                </div>
            </div>
        </section>
    );
}
