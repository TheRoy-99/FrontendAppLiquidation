import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
    <Routes>
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

      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/login" element={<LoginWrapper />} />

      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute role="USER">
            <DashboardUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function LoginWrapper() {
  const navigate = useNavigate();
  return <Login onForgotPassword={() => navigate("/recover")} />;
}
