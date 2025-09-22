export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",     // Azul primario
        secondary: "#43a047",   // Verde secundario
        background: "#f5f5f5",  // Gris claro
        error: "#e53935",       // Rojo error
        text: "#212121",        // Negro texto
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
