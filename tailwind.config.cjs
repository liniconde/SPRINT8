/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textGray: "#4A4A4A", // Define un color gris para los textos
      },
      backgroundImage: {
        "gradient-custom": "linear-gradient(to right, #ece9e6, #ffffff)", // Ajusta esto según el gradiente que quieras
      },
      fontFamily: {
        title: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
