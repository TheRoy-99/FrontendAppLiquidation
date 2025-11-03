// interfaces.ts
// Tipos globales para el panel administrativo

export interface User {
    id: number;
    nombreCompleto: string;
    email: string;
    telefono?: string;
    role: 'ADMIN' | 'USER';
}

export interface Receipt {
    id: number;
    usuario: User;
    servicio: string;
    monto: number;
    archivoUrl: string;
    estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
    fechaCreacion?: string;
}

export interface ReporteGeneral {
    totalRecibos: number;
    aprobados: number;
    rechazados: number;
    totalSubsidios: number;
    totalLiquidados?: number;
}

export interface ReportePorServicio {
    servicio: string;
    aprobados: number;
    rechazados: number;
}

export interface ReportePorMes {
    mes: string;
    totalSubsidio: number;
}

export interface Perfil {
    id: number;
    nombreCompleto: string;
    email: string;
    telefono?: string;
    role: 'ADMIN' | 'USER';
}

export interface DashboardMetrics {
    usuarios: number;
    recibos: number;
    reportes: number;
}
