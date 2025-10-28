import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import Login from "../pages/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import DashboardUser from "../pages/user/DashboardUser";

export function AppRouter() {
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    user = stored ? JSON.parse(stored) : null;
  } catch {
    user = null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección inicial */}
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
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Login */}
        <Route path="/login" element={<LoginWrapper />} />

        {/* USER Dashboard */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="USER">
              <DashboardUser />
            </ProtectedRoute>
          }
        />

        {/* ADMIN Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Wrapper para Login
function LoginWrapper() {
  return <Login onForgotPassword={() => {}} />; // deshabilitado
}
