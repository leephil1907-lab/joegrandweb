import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lab: { bg: "#0B0F0C", panel: "#121814", green: "#00E676", cyan: "#22D3EE", amber: "#FFB300" },
        ink: "#0B0F0C",
        panel: "#121814",
        line: "#26332A",
        body: "#E8F5E9",
        muted: "#8B9B8E",
        accent: "#00E676",
        "accent-alt": "#22D3EE",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
