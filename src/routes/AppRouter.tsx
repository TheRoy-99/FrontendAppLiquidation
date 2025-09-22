import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Login />} />

        {/* Ruta de prueba opcional */}
        <Route path="/test" element={<h1 className="text-2xl">Bienvenido 🚀</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
