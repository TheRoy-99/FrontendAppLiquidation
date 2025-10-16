import Swal from "sweetalert2";

//Config base global (debe ir primero)
const baseConfig: any = {
  confirmButtonColor: "#1976d2", // azul primario
  width: window.innerWidth < 640 ? "90vw" : "400px", // móvil vs desktop
  customClass: {
    popup: "swal-popup",
    title: "swal-title",
    htmlContainer: "swal-text",
    confirmButton: "swal-button",
  },
  background: "#ffffff",
};

// Alerta de bienvenida (centrada)
export const alertWelcome = (nombre: string) => {
  Swal.fire({
    ...baseConfig,
    toast: false,
    position: "center",
    icon: "success",
    title: `¡Bienvenido, ${nombre}!`,
    text: "Inicio de sesión exitoso.",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#ffffff",
  });
};

// Variante tipo toast (por si la quieres más liviana)
export const alertWelcomeToast = (nombre: string) => {
  Swal.fire({
    ...baseConfig,
    toast: true,
    position: "top-end",
    icon: "success",
    title: `¡Bienvenido, ${nombre}!`,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#ffffff",
  });
};

// Éxito genérico
export const alertSuccess = (title: string, text?: string) => {
  Swal.fire({
    ...baseConfig,
    icon: "success",
    title,
    text,
  });
};

// Error genérico
export const alertError = (title: string, text?: string) => {
  Swal.fire({
    ...baseConfig,
    icon: "error",
    title,
    text,
    confirmButtonColor: "#e53935", // rojo
  });
};

// Información
export const alertInfo = (title: string, text?: string) => {
  Swal.fire({
    ...baseConfig,
    icon: "info",
    title,
    text,
  });
};

// Advertencia genérica
export const alertWarning = (title: string, text?: string) => {
  Swal.fire({
    ...baseConfig,
    icon: "warning",
    title,
    text,
    confirmButtonColor: "#f6c23e",
  });
};

//Confirmación genérica (acepta título y texto personalizados)
export const confirmAlert = async (
  title: string,
  text?: string,
  confirmButtonText: string = "Confirmar",
  cancelButtonText: string = "Cancelar"
): Promise<boolean> => {
  const result = await Swal.fire({
    ...baseConfig,
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: "#1976d2",
    cancelButtonColor: "#6c757d",
    reverseButtons: true,
  });

  return result.isConfirmed;
};

//Confirmación específica para eliminar
export const confirmDeleteAlert = async (
  message: string = "¿Eliminar este elemento?",
  detail?: string
): Promise<boolean> => {
  const result = await Swal.fire({
    ...baseConfig,
    title: message,
    text: detail || "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#e53935", // rojo para eliminar
    cancelButtonColor: "#6c757d",
    reverseButtons: true,
    iconColor: "#e53935",
  });

  return result.isConfirmed;
};

//CORREGIDO: Confirmación de logout (ahora solo para cerrar sesión)
export const confirmLogoutAlert = async (p0: string): Promise<boolean> => {
  const result = await Swal.fire({
    ...baseConfig,
    title: "¿Cerrar sesión?",
    text: "Tu sesión actual se cerrará y deberás volver a iniciar.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#1976d2",
    cancelButtonColor: "#6c757d",
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    await Swal.fire({
      ...baseConfig,
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión correctamente.",
      timer: 1800,
      showConfirmButton: false,
    });
    return true;
  }

  return false;
};

//NUEVO: Confirmación específica para aprobar
export const confirmApproveAlert = async (
  message: string = "¿Aprobar este recibo?",
  detail?: string
): Promise<boolean> => {
  const result = await Swal.fire({
    ...baseConfig,
    title: message,
    text: detail || "Esta acción no se puede revertir.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, aprobar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#28a745", // verde para aprobar
    cancelButtonColor: "#6c757d",
    reverseButtons: true,
    iconColor: "#28a745",
  });

  return result.isConfirmed;
};

//NUEVO: Confirmación específica para rechazar
export const confirmRejectAlert = async (
  message: string = "¿Rechazar este recibo?",
  detail?: string
): Promise<boolean> => {
  const result = await Swal.fire({
    ...baseConfig,
    title: message,
    text: detail || "Esta acción no se puede revertir.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, rechazar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#ffc107", // amarillo/naranja para rechazar
    cancelButtonColor: "#6c757d",
    reverseButtons: true,
    iconColor: "#ffc107",
  });

  return result.isConfirmed;
};

// Alerta específica para inicio de sesión exitoso
export const alertLoginSuccess = (nombre?: string) => {
  Swal.fire({
    ...baseConfig,
    icon: "success",
    title: `¡Bienvenido${nombre ? `, ${nombre}` : ""}!`,
    text: "Inicio de sesión exitoso.",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

//Alerta de carga (loading)
export const alertLoading = (message: string = "Procesando...") => {
  Swal.fire({
    ...baseConfig,
    title: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

//Cerrar alerta de carga
export const closeAlert = () => {
  Swal.close();
};