import api from "./api";

export const getAllReceipts = async () => {
    const res = await api.get("/receipts/all");
    return res.data;
};

export const updateReceiptStatus = async (id: number, estado: string) => {
    const res = await api.patch(`/receipts/${id}`, { estado });
    return res.data;
};

export const deleteReceipt = async (id: number) => {
    const res = await api.delete(`/receipts/${id}`);
    return res.data;
};

export const getAllUsers = async () => {
    const res = await api.get("/users/all");
    return res.data;
};

export const registerUser = async (data: any) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};

export const deleteUser = async (id: number) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
};

export const changeUserRole = async (id: number, role: string) => {
    const res = await api.patch(`/users/${id}/role`, { role });
    return res.data;
};


export const getReportesGenerales = async () => {
    const res = await api.get("/reportes/general");
    return res.data;
};

export const getReportesPorServicio = async () => {
    const res = await api.get("/reportes/por-servicio");
    return res.data;
};

export const getReportesPorMes = async () => {
    const res = await api.get("/reportes/por-mes");
    return res.data;
};

export const getAuditorias = async () => {
    const res = await api.get("/auditorias/all");
    return res.data;
};

