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

    //Esperar a que el user se cargue del localStorage (no cortar de inmediato)
    if (user === null && token) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-600">
                Cargando sesión...
            </div>
        );
    }

    //Sin usuario ni token -> login
    if (!user || !token) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    //Validar token
    let decoded: any = null;
    try {
        decoded = jwtDecode(token);
        if (!decoded?.exp || !decoded?.sub) {
            localStorage.clear();
            return <Navigate to="/login" replace />;
        }
    } catch {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    //Verificar rol
    const userRole = user?.role;
    if (role && userRole !== role) {
        return userRole === "ADMIN" ? (
            <Navigate to="/admin/dashboard" replace />
        ) : (
            <Navigate to="/user/dashboard" replace />
        );
    }

    //Todo bien
    return children;
}
