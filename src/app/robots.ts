import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/lib/site";

// Next.js turns this file into /robots.txt automatically.
export default function robots(): MetadataRoute.Robots {
  // Until a real domain is configured (and on Vercel previews), ask crawlers to stay away.
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
