import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { JSX } from "react/jsx-runtime";

interface ProtectedRouteProps {
    children: JSX.Element;
    role?: "ADMIN" | "USER";
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // Si no hay token o no hay datos, fuera
    if (!token || !storedUser) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    let decoded: any = null;
    try {
        decoded = jwtDecode(token);
    } catch (error) {
        console.warn("Token inválido:", error);
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    //Si el token expiró
    const now = Date.now() / 1000; // segundos
    if (decoded.exp && decoded.exp < now) {
        console.warn("Token expirado");
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    const user = JSON.parse(storedUser);
    const userRole = user?.role;

    //Si se pasa un rol requerido, validar
    if (role && userRole !== role) {
        console.warn("Acceso denegado: rol incorrecto");
        return userRole === "ADMIN" ? (
            <Navigate to="/admin/dashboard" replace />
        ) : (
            <Navigate to="/user/dashboard" replace />
        );
    }

    //Si todo está bien, mostrar el contenido protegido
    return children;
}
