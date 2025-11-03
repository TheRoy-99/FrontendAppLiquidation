
// Nombres de paneles
export const PANELS = {
    INICIO: 'inicio',
    USUARIOS: 'usuarios',
    RECIBOS: 'recibos',
    REPORTES: 'reportes',
    CONFIG: 'config',
    PERFIL: 'perfil',
    PASSWORD: 'password',
} as const;

// Colores por estado
export const STATUS_COLORS = {
    APROBADO: 'bg-green-100 text-green-700 border border-green-300',
    RECHAZADO: 'bg-red-100 text-red-700 border border-red-300',
    PENDIENTE: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
} as const;

// Roles
export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
} as const;

// Mensajes comunes
export const MESSAGES = {
    ERROR_FETCH: 'Error al cargar los datos',
    SUCCESS_SAVE: 'Guardado correctamente',
    CONFIRM_DELETE: '¿Eliminar este registro?',
    LOADING: 'Cargando datos...',
};
