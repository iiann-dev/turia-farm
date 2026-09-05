import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/studio/*", "/_next", "/api/*"],
    },
    sitemap: "https://turia-farm.vercel.app/sitemap.xml",
  };
}
