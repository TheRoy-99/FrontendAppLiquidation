
export default function Principal() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AL</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                App Liquidation
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#inicio"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Inicio
              </a>
              <a
                href="#como-funciona"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                ¿Cómo funciona?
              </a>
              <a
                href="#contacto"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contacto
              </a>
              <a
                href="./login"
                className="btn-primary text-white px-6 py-2 rounded-lg font-medium"
              >
                Iniciar Sesión
              </a>
            </nav>
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Apoyo Financiero para{" "}
            <span className="text-blue-600">Misioneros</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Recibe bonificaciones para pagar tus servicios públicos en Medellín.
            Un programa de apoyo de la Corporación Universitaria Adventista
            (UNAC).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="./login"
              className="btn-primary text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center hover:bg-blue-50"
            >
              Acceder a mi cuenta
            </a>
            <a className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors" href="./chatbot"> 
              Ver más información 
              </a>
           
          </div>
        </div>
      </section>

      {/* Separador */}
      <div className="h-1 bg-blue-500"></div>

      {/* Cómo Funciona */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona?
            </h3>
            <p className="text-xl text-gray-600">
              Proceso simple y seguro en 3 pasos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 
                    7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                1. Regístrate
              </h4>
              <p className="text-gray-600 text-center">
                Inicia sesión con tu cuenta de misionero para acceder al sistema
                de bonificaciones.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 
                    001.664-.89l.812-1.22A2 2 0 
                    0110.07 4h3.86a2 2 0 
                    011.664.89l.812 1.22A2 2 0 
                    0018.07 7H19a2 2 0 
                    012 2v9a2 2 0 
                    01-2 2H5a2 2 0 
                    01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                2. Sube tu recibo
              </h4>
              <p className="text-gray-600 text-center">
                Toma una foto clara de tu factura de servicios públicos y súbela
                a la plataforma.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 
                    0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                3. Recibe tu apoyo
              </h4>
              <p className="text-gray-600 text-center">
                Una vez aprobada tu solicitud, recibirás la bonificación para
                cubrir tus gastos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Separador */}
      <div className="h-1 bg-blue-500"></div>

      {/* Información UNAC */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Respaldado por UNAC
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Este programa es una iniciativa de la Corporación Universitaria
                Adventista en Medellín, comprometida con el bienestar de
                nuestros misioneros y su labor en la comunidad.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Proceso 100% digital y seguro
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Apoyo directo para servicios públicos
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Seguimiento en tiempo real
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">UNAC</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Corporación Universitaria Adventista
                </h4>
                <p className="text-gray-600 mb-4">Medellín, Colombia</p>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Comprometidos con el servicio misionero desde 1937
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-white border-t-2 border-blue-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AL</span>
                </div>
                <h5 className="text-xl font-bold text-gray-900">
                  App Liquidation
                </h5>
              </div>
              <p className="text-gray-600">
                Apoyo financiero para misioneros en Medellín, respaldado por
                UNAC.
              </p>
            </div>
            <div>
              <h6 className="text-lg font-semibold text-gray-900 mb-4">
                Contacto
              </h6>
              <div className="space-y-2 text-gray-600">
                <p>📍 UNAC Medellín</p>
                <p>📧 apoyo@appliquidation.com</p>
                <p>📞 +57 (4) 123-4567</p>
              </div>
            </div>
            <div>
              <h6 className="text-lg font-semibold text-gray-900 mb-4">
                Enlaces
              </h6>
              <div className="space-y-2">
                <a
                  href="./login"
                  className="block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Iniciar Sesión
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Términos y Condiciones
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Política de Privacidad
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">
              &copy; 2024 App Liquidation - UNAC. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
