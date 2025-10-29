import { useState, useEffect } from "react";
import { authService } from "../services/authService";
import {
    alertLoginSuccess,
    alertError,
    alertInfo,
    alertSuccess,
} from "../utils/alerts";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);

    //Recuperar sesión al recargar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    //Login con alerta de bienvenida mejorada
    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await authService.login({ email, password });
            const { access_token } = res.data;

            //Decodificamos el token JWT
            const decoded: any = jwtDecode(access_token);

            const userData = {
                id: decoded.sub,
                email: decoded.email,
                role: decoded.role,
                nombreCompleto: decoded.nombreCompleto || null, // por si el backend lo incluye
            };

            //Guardar datos locales
            localStorage.setItem("token", access_token);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            // Alerta visual de bienvenida (SweetAlert2)
            alertLoginSuccess(userData.nombreCompleto || userData.email?.split("@")[0]);

            //Redirección por rol
            setTimeout(() => {
                if (userData.role === "ADMIN") {
                    window.location.href = "/admin/dashboard";
                } else {
                    window.location.href = "/user/dashboard";
                }
            }, 500); // Espera breve para que la alerta se vea completa

            return userData;
        } catch (error: any) {
            alertError("Error de inicio de sesión", error.response?.data?.message || "Credenciales inválidas");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //Logout con confirmación de alerta tipo modal
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);

        // Mostrar alerta de cierre (ya tienes confirmLogoutAlert en tus dashboards)
        alertInfo("Sesión cerrada", "Has cerrado sesión correctamente");

        setTimeout(() => {
            window.location.href = "/login";
        }, 500);
    };

    //Registro con alertas SweetAlert2
    const register = async (
        nombre: string,
        email: string,
        telefono: string,
        password: string,
        confirmPassword: string
    ) => {
        if (password !== confirmPassword) {
            alertError("Error", "Las contraseñas no coinciden");
            return false;
        }

        setLoading(true);
        try {
            const res = await authService.register({
                nombreCompleto: nombre,
                email,
                telefono,
                password,
            });

            alertSuccess("Registro exitoso", "Usuario registrado correctamente");
            return true;
        } catch (error: any) {
            alertError("Error", error.response?.data?.message || "No se pudo registrar el usuario");
            return false;
        } finally {
            setLoading(false);
        }
    };

    //Recuperar contraseña
    const recover = async (email: string) => {
        setLoading(true);
        try {
            await authService.recover(email);
            alertSuccess("Correo enviado", "Revisa tu bandeja de entrada para restablecer tu contraseña.");
            return true;
        } catch (error: any) {
            alertError("Error", error.response?.data?.message || "No se pudo enviar el correo de recuperación.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { user, login, logout, register, recover, loading };
}
