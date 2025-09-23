import Swal from "sweetalert2";

// Config base para todas las alertas
const baseConfig: any = {
  confirmButtonColor: "#1976d2", // azul primario
  width: window.innerWidth < 640 ? "90vw" : "400px", // móvil vs desktop
  customClass: {
    popup: "swal-popup",
    title: "swal-title",
    htmlContainer: "swal-text",
    confirmButton: "swal-button",
  },
};

export const alertSuccess = (title: string, text?: string) => {
  Swal.fire({
    ...baseConfig,
    icon: "success",
    title,
    text,
  });
};

export const alertError = (title: string, text?: string) => {
  Swal.fire({
    ...baseConfig,
    icon: "error",
    title,
    text,
    confirmButtonColor: "#e53935", // rojo
  });
};

export const alertInfo = (title: string, text?: string) => {
  Swal.fire({
    ...baseConfig,
    icon: "info",
    title,
    text,
  });
};
