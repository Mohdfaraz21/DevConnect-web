/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        devconnect: {
          primary: "#5b21b6", // indigo-700
          "primary-focus": "#4c1d95",
          secondary: "#ec4899", // pink-500
          "secondary-focus": "#db2777",
          accent: "#374151", // gray-700
          neutral: "#0f172a",
          "base-100": "#0b1220",
          info: "#3b82f6",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      "dark",
    ],
  },
};
