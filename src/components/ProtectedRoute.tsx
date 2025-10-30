import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react/jsx-runtime";

interface ProtectedRouteProps {
    children: JSX.Element;
    role?: "ADMIN" | "USER";
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    // No hay usuario ni token -> fuera
    if (!user || !token) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    // Validar estructura del token
    let decoded: any = null;
    try {
        decoded = jwtDecode(token);
        if (!decoded?.exp || !decoded?.sub) {
            if (import.meta.env.MODE === "development") {
                console.warn("Token sin estructura válida");
            }
            localStorage.clear();
            return <Navigate to="/login" replace />;
        }
    } catch (error) {
        if (import.meta.env.MODE === "development") {
            console.warn("Token inválido:", error);
        }
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    //Verificar expiración del token
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
        if (import.meta.env.MODE === "development") {
            console.warn("Token expirado");
        }
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    //Validar rol si aplica
    const userRole = user?.role;
    if (role && userRole !== role) {
        if (import.meta.env.MODE === "development") {
            console.warn("Acceso denegado: rol incorrecto");
        }
        return userRole === "ADMIN" ? (
            <Navigate to="/admin/dashboard" replace />
        ) : (
            <Navigate to="/user/dashboard" replace />
        );
    }

    //Todo correcto: permitir acceso
    return children;
}
