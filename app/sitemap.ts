import type { MetadataRoute } from "next";

const baseUrl = "https://joegrandweb.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/videos", "/training", "/pricing", "/community", "/contact", "/badge-lab", "/privacy", "/terms"];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
