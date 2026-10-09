// The one place that holds site-wide settings.
// The production domain is set here. To use a different domain later, set the
// NEXT_PUBLIC_SITE_URL environment variable (see .env.example); it overrides this default.

const DEFAULT_URL = "https://vexiqora.vercel.app";

export const siteConfig = {
  name: "Vexiqora",
  tagline: "Free Online Developer Tools",
  // Title of the homepage. Other pages use "<Page title> — Vexiqora".
  homeTitle: "Vexiqora — Free Online Developer Tools",
  titleSeparator: " — ",
  description:
    "Free online developer tools for formatting JSON, comparing text, encoding Base64, and counting words.",

  // Production URL, without a trailing slash. Everything else is built from this.
  url: (process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_URL).replace(/\/+$/, ""),

  // Only fill these in with real values. Nothing is shown or output while they are empty.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "",
  socialProfiles: [] as string[], // for example: ["https://github.com/your-name/vexiqora"]
  twitterHandle: "", // for example: "@yourhandle"
  // Optional: the verification code Google Search Console gives you for the "HTML tag" method.
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",

  // The social-sharing image lives in /public.
  ogImage: {
    path: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Vexiqora: free online developer tools that run in your browser",
  },
};

/** Builds a full URL from a path such as "/tools/base64". */
export function absoluteUrl(path = "/"): string {
  // The homepage keeps its trailing slash so it matches the canonical URL Next.js generates.
  return `${siteConfig.url}${path}`;
}

/**
 * Whether search engines should be allowed to index this deployment.
 * Vercel "Preview" deployments (test copies of your site) are kept out of search results,
 * so they never compete with the real site.
 */
export const isIndexable = process.env.VERCEL_ENV !== "preview";
