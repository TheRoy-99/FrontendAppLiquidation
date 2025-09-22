import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import RecoverPass from "../pages/RecoverPass";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* endpoints */}
        <Route path="/login" element={<Auth />} />
        <Route path="/recover" element={<RecoverPass />} />

        {/* Ruta de prueba opcional */}
        <Route path="/test" element={<h1 className="text-2xl">Bienvenido 🚀</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
