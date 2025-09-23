import { useState } from "react";
import { authService } from "../services/authService";
import { alertSuccess, alertError, alertInfo } from "../utils/alerts";

export function useAuth() {
    const [loading, setLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await authService.login({ email, password });
            localStorage.setItem("token", res.data.access_token);
            alertSuccess("Bienvenido 🚀", "Inicio de sesión exitoso");
            return res.data;
        } catch (error: any) {
            alertError("Error", error.response?.data?.message || "Credenciales inválidas");
            throw error;
        } finally {
            setLoading(false);
        }
    };

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
            alertSuccess("Registro exitoso", "Ya puedes iniciar sesión");
            return true;
        } catch (error: any) {
            alertError("Error", error.response?.data?.message || "No se pudo registrar");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const recover = async (email: string) => {
        setLoading(true);
        try {
            await authService.recover(email);
            alertSuccess("Correo enviado 📩", "Revisa tu bandeja de entrada");
            return true;
        } catch (error: any) {
            alertError("Error", error.response?.data?.message || "No se pudo enviar el correo");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token: string, newPassword: string) => {
        setLoading(true);
        try {
            await authService.resetPassword({ token, newPassword });
            alertSuccess("Contraseña actualizada 🔒", "Ya puedes iniciar sesión");
            return true;
        } catch (error: any) {
            alertError("Error", error.response?.data?.message || "No se pudo cambiar la contraseña");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        alertInfo("Sesión cerrada", "Has cerrado sesión correctamente");
    };

    return { login, register, recover, resetPassword, logout, loading };
}
