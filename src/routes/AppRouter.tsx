import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeRoy from "../pages/HomeRoy";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomeRoy />} />

        {/* Ruta de prueba opcional */}
        <Route path="/test" element={<h1 className="text-2xl">Bienvenido 🚀</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
