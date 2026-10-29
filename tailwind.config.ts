import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EDF7EA",
          100: "#D3EBCC",
          500: "#339933",
          700: "#237A32",
          800: "#195D26",
          900: "#12441C",
        },
        accent: { 100: "#EDF3FF", 600: "#3366CC", 800: "#244FA8" },
        sun: { 200: "#FFF7D9", 400: "#F5B800", 800: "#8A4B12" },
        danger: { 100: "#F8E8E6", 700: "#8C2F2F" },
        peach: { 100: "#FFF0E8", 500: "#FF6633" },
        ink: {
          900: "#17324D",
          700: "#2C4760",
          500: "#526477",
          300: "#B8C4CF",
          200: "#DCE3E8",
          100: "#F0F4F8",
        },
        surface: { DEFAULT: "#FFFDF7", raised: "#FFFFFF", muted: "#F6F3EA" },
        focus: "#244FA8",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", '"Nunito Sans"', "sans-serif"],
        sans: ["var(--font-nunito)", '"Segoe UI"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
