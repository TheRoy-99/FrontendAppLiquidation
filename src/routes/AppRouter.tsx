import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Principal from "../pages/Principal";
import Chatbot from "../pages/ChatBot";
import { ProtectedRoute } from "../components/ProtectedRoute";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import DashboardUser from "../pages/user/DashboardUser";
import { useAuth } from "../hooks/useAuth";

export function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing pública */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "ADMIN" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/user/dashboard" replace />
              )
            ) : (
              <Principal />
            )
          }
        />

        {/* Chatbot informativo */}
        <Route path="/chatbot" element={<Chatbot />} />

        {/* Login */}
        <Route path="/login" element={<LoginWrapper />} />

        {/* Dashboard USER */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="USER">
              <DashboardUser />
            </ProtectedRoute>
          }
        />

        {/* Dashboard ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Wrapper para Login con navegación al recover
function LoginWrapper() {
  const navigate = useNavigate();
  return <Login onForgotPassword={() => navigate("/recover")} />;
}
