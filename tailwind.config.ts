import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import daisyui from "daisyui"; // Import daisyui using ESM syntax
import lineClamp from "@tailwindcss/line-clamp"; // Import the line-clamp plugin

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    daisyui, // Use daisyui plugin
    lineClamp, // Use line-clamp plugin
    function (api: PluginAPI) {
      const { addUtilities } = api;
      addUtilities({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none" /* Internet Explorer 10+ */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Chrome, Safari, and Opera */,
          },
        },
      });
    },
  ],
  daisyui: {
    themes: [
      {
        betterTrip: {
          primary: "#001C3F",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "light",
      "Dark",
    ] as const,
  },
};

export default config;
