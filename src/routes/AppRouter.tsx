import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import RecoverPass from "../pages/RecoverPass";
import ResetPassword from "../pages/ResetPassword"; // 👈 nuevo
import Login from "../pages/Login";
import Register from "../pages/Register";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginWrapper />} />

        {/* Register */}
        <Route path="/register" element={<RegisterWrapper />} />

        {/* Recover Password */}
        <Route path="/recover" element={<RecoverPassWrapper />} />

        {/* Reset Password */}
        <Route path="/reset-password" element={<ResetPasswordWrapper />} />

        {/* Ruta de prueba opcional */}
        <Route path="/test" element={<h1 className="text-2xl">Bienvenido 🚀</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

// Wrapper para Login
function LoginWrapper() {
  const navigate = useNavigate();
  return (
    <Login
      onSwitchToRegister={() => navigate("/register")}
      onForgotPassword={() => navigate("/recover")}
    />
  );
}

// Wrapper para Register
function RegisterWrapper() {
  const navigate = useNavigate();
  return <Register onSwitchToLogin={() => navigate("/login")} />;
}

// Wrapper para Recover Password
function RecoverPassWrapper() {
  const navigate = useNavigate();
  return <RecoverPass onBackToLogin={() => navigate("/login")} />;
}

// Wrapper para Reset Password
function ResetPasswordWrapper() {
  const navigate = useNavigate();
  return <ResetPassword onBackToLogin={() => navigate("/login")} />;
}
