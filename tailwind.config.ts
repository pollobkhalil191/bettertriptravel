import type { Config } from "tailwindcss";
import daisyui from "daisyui";  // Import daisyui using ES module syntax

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
        primary: 'var(--primary-color)', // Add primary color
        secondary: 'var(--secondary-color)', // Add secondary color
      },
      fontFamily: {
        sans: ['Poppins'],
        body: ['Roboto'],
      },
    },
  },
  plugins: [daisyui],  // Use imported daisyui here
};

export default config;
