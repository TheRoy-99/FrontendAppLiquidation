

/** Genera las iniciales a partir del nombre completo */
export const getInitials = (nombre?: string): string => {
    if (!nombre) return 'A';
    return nombre
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

/** Simula un pequeño delay (útil para loading states fake) */
export const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

/** Verifica si dos contraseñas coinciden */
export const passwordsMatch = (a: string, b: string): boolean => a === b;

/** Formatea número a moneda local */
export const formatCurrency = (value: number): string =>
    `$${value.toLocaleString('es-AR')}`;
