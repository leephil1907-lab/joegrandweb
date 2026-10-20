import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { lab: { bg: "#0B0F0C", panel: "#121814", green: "#00E676", cyan: "#22D3EE", amber: "#FFB300" } } } },
  plugins: [],
};
export default config;
