/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        joya: {
          yellow: "#FFD400",
          black: "#15191F",
          bg0: "#FFFFFF",
          bg1: "#F6F7F9",
          bg2: "#FFFFFF",
        },
      },
      boxShadow: {
        card: "0 12px 30px rgba(21,25,31,0.12), 0 2px 10px rgba(21,25,31,0.06)",
        glow: "0 0 0 1px rgba(255,212,0,0.35), 0 16px 40px rgba(255,212,0,0.20)",
      },
      borderRadius: {
        xl2: "1.5rem",
        xl3: "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
