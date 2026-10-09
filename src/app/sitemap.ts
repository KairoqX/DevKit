import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { toolPath, tools } from "@/lib/tools";

// Next.js turns this file into /sitemap.xml automatically.
// It lists only real pages. Fragment links such as /#tools are not separate pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...tools.map(toolPath),
    "/about",
    "/privacy",
    // The contact page only has content once an email address is configured.
    ...(siteConfig.contactEmail ? ["/contact"] : []),
  ];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" || path.startsWith("/tools") ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path.startsWith("/tools") ? 0.8 : 0.3,
  }));
}
