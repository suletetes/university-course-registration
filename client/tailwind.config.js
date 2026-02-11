/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        ink: {
          900: "#0b0f1a",
          700: "#2a2f3a",
        },
        accent: {
          500: "#2d6cdf",
          400: "#4b8bff",
          300: "#7fb2ff",
        },
        sun: {
          500: "#f59e0b",
          400: "#fbbf24",
        },
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.18)",
      },
    },
  },
  plugins: [],
}
