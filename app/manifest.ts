import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Joe Grand — Hardware Hacking, Electronics & Security",
    short_name: "Joe Grand",
    description: "Projects, videos, hardware hacking research, training, and the Kingpin Badge Lab.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0b",
    theme_color: "#f7d330",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}
