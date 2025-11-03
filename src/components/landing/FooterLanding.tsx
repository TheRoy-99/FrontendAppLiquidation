export default function FooterLanding() {
    return (
        <footer id="contacto" className="bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Marca */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center space-x-3 group">
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-xl">SL</span>
                            </div>
                            <div>
                                <h5 className="text-2xl font-bold">Sistema de Liquidación</h5>
                                <p className="text-blue-300 text-sm">Programa UNAC</p>
                            </div>
                        </div>
                        <p className="text-blue-200 leading-relaxed max-w-md">
                            Apoyo financiero para misioneros en Medellín, respaldado por la Corporación Universitaria Adventista (UNAC).
                        </p>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h6 className="text-lg font-bold mb-4 text-white">Contacto</h6>
                        <ul className="space-y-3 text-blue-200">
                            <li className="flex items-center gap-2 hover:text-white transition-colors">
                                <span>📍</span>
                                <span>UNAC Medellín, Colombia</span>
                            </li>
                            <li className="flex items-center gap-2 hover:text-white transition-colors">
                                <span>📧</span>
                                <span>royman12351@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-2 hover:text-white transition-colors">
                                <span>📞</span>
                                <span>+57 (4) 123-4567</span>
                            </li>
                        </ul>
                    </div>

                    {/* Enlaces */}
                    <div>
                        <h6 className="text-lg font-bold mb-4 text-white">Enlaces</h6>
                        <ul className="space-y-3 text-blue-200">
                            {["Iniciar Sesión", "Términos y Condiciones", "Política de Privacidad"].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors transform hover:translate-x-1 inline-block"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-blue-700/30 pt-8 text-center">
                    <p className="text-blue-300">
                        © 2025 App Liquidation - UNAC. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
