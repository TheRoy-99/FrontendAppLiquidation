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
    timer: 3000, // ⏱️ ahora dura 3 segundos
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

// Confirmación de logout
export const confirmLogoutAlert = async (): Promise<boolean> => {
  const result = await Swal.fire({
    ...baseConfig,
    title: "¿Cerrar sesión?",
    text: "Tu sesión actual se cerrará y deberás volver a iniciar.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#1976d2",
    cancelButtonColor: "#e53935",
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    await Swal.fire({
      ...baseConfig,
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión correctamente.",
      timer: 1800, // un poquito más larga
      showConfirmButton: false,
    });
    return true;
  }

  return false;
};

// Alerta específica para inicio de sesión exitoso (idéntica a alertWelcome)
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
