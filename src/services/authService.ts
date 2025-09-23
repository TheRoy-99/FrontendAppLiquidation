import { api } from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  nombreCompleto: string;
  email: string;
  telefono: string;
  password: string;
}

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export const authService = {
  login: (data: LoginPayload) => api.post("/auth/login", data),
  register: (data: RegisterPayload) => api.post("/auth/register", data),
  recover: (email: string) => api.post("/auth/recover", { email }),
  resetPassword: (data: ResetPasswordPayload) =>
    api.post("/auth/reset-password", data),
};
