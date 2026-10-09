import type { Metadata } from "next";
import { siteConfig } from "./site";

interface PageMeta {
  /** Page title without the site name, such as "Text Diff Checker". */
  title: string;
  description: string;
  /** The page's path, such as "/tools/base64". Used for the canonical URL. */
  path: string;
}

export function pageTitle(title: string, path: string): string {
  return path === "/" ? siteConfig.homeTitle : `${title}${siteConfig.titleSeparator}${siteConfig.name}`;
}

/** Builds title, description, canonical URL, Open Graph and Twitter tags in one go. */
export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const fullTitle = pageTitle(title, path);
  const image = { url: siteConfig.ogImage.path, width: siteConfig.ogImage.width, height: siteConfig.ogImage.height, alt: siteConfig.ogImage.alt };
  return {
    // "absolute" stops the layout's title template from adding the site name a second time.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
      ...(siteConfig.twitterHandle ? { site: siteConfig.twitterHandle } : {}),
    },
  };
}
