import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import daisyui from "daisyui"; // Import daisyui using ESM syntax
import lineClamp from "@tailwindcss/line-clamp"; // Import the line-clamp plugin

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // Add GT Easti to the fontFamily theme
        'gt-easti': ['"GT Easti"', 'sans-serif'],
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
          fontColor: "#9598A4",
          secondary: "#9598A4",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "light",
      "dark",
    ] as const,
  },
};

export default config;
