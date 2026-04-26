import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bark: "#2C1F0E",
        moss: "#3D4A2E",
        sage: "#7A8C6A",
        dusk: "#8B7355",
        parchment: "#F2EDE3",
        fog: "#E8E2D8",
        sky: "#C4BDAF",
        ember: "#C4622A",
        cream: "#FAF7F2",
      },
    },
  },
  plugins: [],
} satisfies Config;
